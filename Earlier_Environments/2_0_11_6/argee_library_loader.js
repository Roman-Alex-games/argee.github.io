/********************************************************************************
 *
 * Copyright (c) 2013 by TUSA
 *
 ********************************************************************************
 *
 *  Initial Author       : Roman Glistvain
 *  Maintainers          : Roman Glistvain
 *
 *
 ********************************************************************************
 *
 *  DESCRIPTION: C Library loader for ARGEE
 *
 *******************************************************************************/

//var func_string=["Number","Array"];

var start_op_code=60;

var start_code_addr;
var code_data;

var lastFuncSearched;

function LD_FindFuncEntry(name)
{
    var i;
    for(i=0;i<lib_struct.funcs.length;i++)
    {
        if (lib_struct.funcs[i].name.toUpperCase()==name.toUpperCase())
        {
            lastFuncSearched=lib_struct.funcs[i];
            return lib_struct.funcs[i];
        }
    }
    return null;
}

var start_udt_type=3;

function LD_ArgTypeToString(type)
{
   return lib_struct.udts[type-start_udt_type].struct_name;
}

function LD_IsUDTType(type)
{
    if (type>=start_udt_type)
    {
        return true;
    }
    return false;
}

function LD_UDT_Field(udt,name)
{
    var i;
    for(i=0;i<udt.elem.length;i++)
    {
        if (udt.elem[i].name==name)
        {
            return udt.elem[i];
        }
    }
    return null;
}

function LD_GetUDT(type)
{
    return lib_struct.udts[type-start_udt_type];
}

function LD_GetFunctionCount()
{
    return lib_struct.funcs.length;
}

function LD_GetFuncEntry(num)   
{
    return lib_struct.funcs[num];
}

var LD_compl_record;

function LD_prepareCodeArr(arr, index)
{
    var i;
    for(i=0;i<lib_code.length;i++)
    {
        arr[i+index]=lib_code[i]
    }
}

var lib_init_address=0;

var lib_code=[];

function storeLibCodeToLocalStorage()
{
    localStorage.libraryCode=JSON.stringify(lib_code);
}

function restoreLibCodeFromLocalStorage()
{
    lib_code=JSON.parse(localStorage.libraryCode);
}

var lib_struct_template=
{
    LibInit:0xffffffff,
    LibUnload:0xffffffff,
    loadable_size:0,
    num_funcs:0,
    funcs:[],
    num_udts:0,
    udts:[],
};

var lib_struct;

function getString(dataView,offset)
{
    var i;
    var str="";
    var len=dataView.getUint32(offset,true);
    for(i=0;i<len;i++)
    {
        str+=String.fromCharCode(dataView.getUint8(offset+4+i));
    }
    return {len:len,str:str};
}

var const_list=[];

function generateConstList()
{
    var i,j,k;
    const_list=[];
    for(i=0;i<lib_struct.num_funcs;i++)
    {
        for(j=0;j<lib_struct.funcs[i].num_args;j++)
        {
            for(k=0;k<lib_struct.funcs[i].args[j].num_const_enums;k++)
            {
                
                const_list[const_list.length]={str:lib_struct.funcs[i].args[j].const_enum[k].str,
                                               val:lib_struct.funcs[i].args[j].const_enum[k].val};
            }
        }
    }
}

    
function parseLibFile(arr)
{
    var curr_offset=0;
    var i,j,k;
    
    var dataView=new DataView(arr);	 
    lib_struct=clone(lib_struct_template);
    
    var magic_num;
    var gw_id;
    
    magic_num=dataView.getUint32(curr_offset,true); curr_offset+=4;
    gw_id=dataView.getUint32(curr_offset,true); curr_offset+=4;
    if (magic_num!=0xdeadbeef)
    {
        return false;
    }
    
    if (gw_id!=stationConfig[0])
    {
        return false;
    }
    
    lib_struct.LibInit=dataView.getUint32(curr_offset,true); curr_offset+=4;
    lib_struct.LibUnload=dataView.getUint32(curr_offset,true); curr_offset+=4;
    
    
    lib_struct.loadable_size=dataView.getUint32(curr_offset,true); curr_offset+=4;
    lib_struct.num_funcs=dataView.getUint32(curr_offset,true); curr_offset+=4;
    for(i=0;i<lib_struct.num_funcs;i++)
    {
        lib_struct.funcs[i]={};    
        var func_name=getString(dataView,curr_offset);curr_offset+=func_name.len+4;
        lib_struct.funcs[i].name=func_name.str;
        lib_struct.funcs[i].rel_addr=dataView.getUint32(curr_offset,true); curr_offset+=4;
        lib_struct.funcs[i].type=dataView.getUint32(curr_offset,true); curr_offset+=4;
        lib_struct.funcs[i].num_args=dataView.getUint32(curr_offset,true); curr_offset+=4;
        // Address - 18 bit - covers 256 kb (more than enough for the next few years)
        // # arguments -> 4 bits
        // opcode format - 10bin (top bits)
        // VM doesn't care if it is function or a procedure. The calling convention is identical and dummy value is placed in the stack in case
        // of a procedure call.
        // total 3 bytes for the opcode vs 1 byte for a regual ARGEE opcode.
        // With this - we don't need a symbol list table in the VM as everything known abotu the symbol is encoded in the opcode
        // arguments are always passed as references (even constants - VM creates memory placeholders for them and passes a refernce)
        // we can even pass some IO/PLC variables as long as the occupy a certain number of bytes
        lib_struct.funcs[i].op_code=((lib_struct.funcs[i].rel_addr)&0x3FFFFF)|(lib_struct.funcs[i].num_args<<18)|(0x2<<22);
        lib_struct.funcs[i].args=[];
        for(j=0;j<lib_struct.funcs[i].num_args;j++)
        {
            var tmp;
            lib_struct.funcs[i].args[j]={};
            tmp=getString(dataView,curr_offset);curr_offset+=tmp.len+4;
            lib_struct.funcs[i].args[j].type=tmp.str;
            tmp=getString(dataView,curr_offset);curr_offset+=tmp.len+4;
            
            lib_struct.funcs[i].args[j].name=tmp.str;
            lib_struct.funcs[i].args[j].num_const_enums=dataView.getUint32(curr_offset,true); curr_offset+=4;
            
            lib_struct.funcs[i].args[j].const_enum=[];
            for(k=0;k<lib_struct.funcs[i].args[j].num_const_enums;k++)
            {
                tmp=getString(dataView,curr_offset);curr_offset+=tmp.len+4;
                var val;
                val=dataView.getUint32(curr_offset,true); curr_offset+=4;                
                lib_struct.funcs[i].args[j].const_enum[k]={str:tmp.str,val:val};
            }
        }
    }
    lib_struct.num_udts=dataView.getUint32(curr_offset,true); curr_offset+=4;
    for(i=0;i<lib_struct.num_udts;i++)
    {
        var tmp;
        lib_struct.udts[i]={};    
        tmp=getString(dataView,curr_offset);curr_offset+=tmp.len+4;
        lib_struct.udts[i].struct_name=tmp.str;
        lib_struct.udts[i].size=dataView.getUint32(curr_offset,true); curr_offset+=4;
        tmp=getString(dataView,curr_offset);curr_offset+=tmp.len+4;
        if (tmp.len>0)
        {
            lib_struct.udts[i].init_js=tmp.str;
        }
        
        lib_struct.udts[i].num_elems=dataView.getUint32(curr_offset,true); curr_offset+=4;
        lib_struct.udts[i].elem=[];
        for(j=0;j<lib_struct.udts[i].num_elems;j++)
        {
            lib_struct.udts[i].elem[j]={};
            tmp=getString(dataView,curr_offset);curr_offset+=tmp.len+4;
            lib_struct.udts[i].elem[j].name=tmp.str;
            lib_struct.udts[i].elem[j].type=dataView.getUint32(curr_offset,true); curr_offset+=4;
            lib_struct.udts[i].elem[j].num_arr_elems=dataView.getUint32(curr_offset,true); curr_offset+=4;
            lib_struct.udts[i].elem[j].offset=dataView.getUint32(curr_offset,true); curr_offset+=4;
            lib_struct.udts[i].elem[j].visible=dataView.getUint32(curr_offset,true); curr_offset+=4;
        }
    }
    lib_code=[];
    for(i=0;i<lib_struct.loadable_size;i++)
    {
        lib_code[i]=dataView.getUint8(curr_offset); curr_offset+=1;
    }
    return true;
}

function LD_GetFunctionHelpString(str)
{
    var sub_str=str.split("(");
    var fin_str="";
    var i,j;
    for(i=0;i<lib_struct.funcs.length;i++)
    {
        if (lib_struct.funcs[i].name==sub_str[0])
        {
            fin_str+=lib_struct.funcs[i].name+"   (";
            for(j=0;j<lib_struct.funcs[i].args.length;j++)
            {
                
                if (lib_struct.funcs[i].args[j].num_const_enums>0)
                {
                    fin_str+="(ENUM)";
                }
                else
                {
                    fin_str+="("+lib_struct.funcs[i].args[j].type+")";
                }
                
                
                fin_str+=lib_struct.funcs[i].args[j].name;
                if (j!=(lib_struct.funcs[i].args.length-1))
                {
                    fin_str+=" , ";
                }
            }
            fin_str+=")";
            return fin_str;
        }
    }
    return null;
}

var udt_field_type=
{
    field_type_val:0,
    field_type_c_arr:1,
    field_type_n_arr:2,
    field_type_str:3,
};

function LD_getElemValString(type,num,elem,udt)
{
    var val_str="";
    var i;
    if (udt.elem[elem].type==udt_field_type.field_type_val)
    {
        val_str+=getVarValue(type,num,udt.elem[elem].offset/4);
    }
    else if (udt.elem[elem].type==udt_field_type.field_type_n_arr)
    {
        for(i=0;i<udt.elem[elem].num_arr_elems;i++)
        {
            val_str+=getVarValue(type,num,udt.elem[elem].offset/4+i)+",";
        }
    }
    else if (udt.elem[elem].type==udt_field_type.field_type_c_arr)
    {
        for(i=0;i<udt.elem[elem].num_arr_elems;i++)
        {
            val_str+=getVarValueByteOffset(type,num,udt.elem[elem].offset+i)+",";
        }
    }
    else if (udt.elem[elem].type==udt_field_type.field_type_str)
    {
        for(i=0;i<udt.elem[elem].num_arr_elems;i++)
        {
            var val=getVarValueByteOffset(type,num,udt.elem[elem].offset+i);
            if (val==0)
            {
                break;
            }
            val_str+=String.fromCharCode(val);
        }
    }
    return val_str;
}


function loadProgVars()
{
    var i;
    prog_var_types_enum=clone(prog_var_types_enum_template);
    prog_var_size_in_bytes=clone(prog_var_size_in_bytes_template);
    prog_var_types=clone(prog_var_types_template);
    prog_var_types=clone(prog_var_types_template);
    prog_var_init_funcs=clone(prog_var_init_func_template);

    for(i=0;i<lib_struct.udts.length;i++)
    {
        prog_var_types_enum[start_udt_type+i]=lib_struct.udts[i].struct_name;
        prog_var_size_in_bytes[start_udt_type+i]=lib_struct.udts[i].size;
        prog_var_types[start_udt_type+i]=start_udt_type+i;
        prog_var_init_funcs[start_udt_type+i]=null;
        if (lib_struct.udts[i].init_js!=undefined)
        {
            prog_var_init_funcs[start_udt_type+i]=lib_struct.udts[i].init_js;
        }
    }
    type_desc[0].elems[1].enum_elems=prog_var_types_enum;
    generateConstList();
}

function handleLibImport(evt) 
{
    var files = evt.files; // FileList object
 	 
    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
			 //var elem=window.document.getElementById('imp_id');
			 //elem.value=e.target.result;
             var data = {
                // Create a view
                data: Array.apply(null, new Uint8Array(e.target.result)),
                contentType: 'x-an-example'
             };
             
             var prev_prog_types=clone(prog_var_types_enum);
             
             
             if (parseLibFile(new Uint8Array(data.data).buffer)==false)
             {
                alert("Invalid file or incompatible with the station\n");
                return;
             }
             //localStorage.library=JSON.stringify(lib_struct);
             //loadProgVars();
             //saveLocal();
             LD_SaveLib();
             loadProgVars();
             
             // remap existing types
             var remap_table=[];
             var j,k;
             for(j=0;j<prev_prog_types.length;j++)
             {
                remap_table[j]=0;    
                for(k=0;k<prog_var_types_enum.length;k++)
                {
                    if (prog_var_types_enum[k]==prev_prog_types[j])
                    {
                        remap_table[j]=k;
                    }
                }
            }
            for(j=0;j<var_db[0].var_list.length;j++)
            {
                var_db[0].var_list[j].type=remap_table[var_db[0].var_list[j].type];
            }
            LD_SaveLib();
            saveLocal();
             
             
             adjustMenuScreen(1);
			 var_display=false;
			 redrawVars(true);
			 refreshProg(true);
			 renderMenu("Initial");

        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsArrayBuffer(f);
    }
}

/*
function LD_LoadLibDesc()
{
    if ((localStorage.libraryDesc!=undefined)&&(localStorage.libraryDesc!="undefined"))
    {
        lib_struct=JSON.parse(localStorage.libraryDesc);
    }
}
*/
function LD_SaveLib()
{
    localStorage.libraryDesc=JSON.stringify(lib_struct);
    localStorage.libraryCode=JSON.stringify(lib_code);
    //loadProgVars();
}

function LD_Init()
{
    lib_struct=clone(lib_struct_template);
    if ((localStorage.libraryCode!=undefined)&&(localStorage.libraryCode!="undefined"))
    {
        lib_code=JSON.parse(localStorage.libraryCode);
        lib_struct=JSON.parse(localStorage.libraryDesc);
        loadProgVars();
    }
}

function LD_ClearLib()
{
    lib_struct=clone(lib_struct_template);
    lib_code=[];
    loadProgVars();
}
    

