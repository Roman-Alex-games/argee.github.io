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
 *  DESCRIPTION: Compiler for ARGEE 
 *
 *******************************************************************************/
 
 
var comp_res;
var comp_prog;


var ops=
{
	push:0,
    pop:1,
	mult:3,
	div:4,
	sum:5,
	substruct:6,
	mod:7,
	abs:8,
	expired:9,
	count:10,
	received:11,
	sent:12,
	and:13,
	not:14,
	or:15,
	less:16,
	greater:17,
	greater_or_eq:18,
	less_or_eq:19,
	equal:20,
	not_equal:21,
	assign:22,
	start_timer:23,
	stop_timer:24,
	start_counter:25,
	stop_counter:26,
	send_msg:27,
	accpt_rcv_msg:28,
	branch_if_not_eq:29,
	end_of_prog:30,
	comment:31,
	min:32,
	max:33,
	COS:34,
	coil:35,
	ton:36,
	toff:37,
	cnt_ctu:38,
	cnt_ctd:39,
	cnt_res:40,
};


var op_desc=
[
	{name:"*",op:ops.mult},
	{name:"/",op:ops.div},
	{name:"+",op:ops.sum},
	{name:"-",op:ops.substruct},
	{name:"%",op:ops.mod},
	{name:"abs",op:ops.abs},
	{name:"expired",op:ops.expired},
	{name:"count",op:ops.count},
	{name:"received",op:ops.received},
	{name:"sent",op:ops.sent},
	{name:"&",op:ops.and},
	{name:"!",op:ops.not},
	{name:"|",op:ops.or},
	{name:"<",op:ops.less},
	{name:">",op:ops.greater},
	{name:">=",op:ops.greater_or_eq},
	{name:"<=",op:ops.less_or_eq},
	{name:"<>",op:ops.not_equal},
	{name:"min",op:ops.min},
	{name:"max",op:ops.max},
	{name:"=",op:ops.equal},
	{name:"F_COS",op:ops.COS},
];


var var_addrs=new Array();	
var var_descr=new Array();
var max_var_addr=0;

function getVarSize(db,type)
{
    if (db==var_type.prog)  
    {
        return varProgSizeInBytes(type);
    }
    else if (db==var_type.plc)
    {
        return 0;
    }
}

function getVarType(db,type)
{
    if (db==var_type.prog)  
    {
        return type;
    }
    else if (db==var_type.plc)
    {
        return plc_var_type;
    }
}

function typeToSize(type)
{
    if (type==plc_var_type)
    {
        return 0;
    }
    else
    {
        return varProgSizeInBytes(type);
    }
}

var const_strs=[];
var const_str_byte_array;
var const_str_addrs=[];
var const_seg_len;


// string is designated with characters "". It is possible to have 

function findStringEnd(str,start)
{
    var i;
    
    for(i=(start+1);i<str.length;i++)
    {
        if ((str.charAt(i)=="\'")&&(str.charAt(i-1)!="\\"))
        {
            return i;
        }
    }
    return -1;
}

function copyConstStr(str,start,end)
{
    var i;
    var const_s="";
    eval("const_s="+str.slice(start,end+1));
    for(i=0;i<const_strs.length;i++)
    {
        if (const_strs[i]==const_s)
        {
            return i;
        }
    }
    // add the string to the end of the array
    const_strs[const_strs.length]=const_s;
    return const_strs.length-1;
}

var cond_db_comp=[];

var unterminated_str_elem;

function handleProgElemConstStr(elem)
{
    while(elem.indexOf("\'")!=-1)
    {
        var start,end;
        var var_num;
        start=elem.indexOf("\'");
        end=findStringEnd(elem,start);
        if (end==-1)
        {
            unterminated_str_elem=elem;
            return null;
        }
        var_num=copyConstStr(elem,start,end);
        var sub_str_before=elem.slice(0,start);
        var sub_str_after=elem.slice(end+1);
        elem=sub_str_before+"___const_str_RGLISTVAIN_."+var_num+sub_str_after;
    }
    return elem;
    
}

function allocConstStrs()
{
    var i,j,k,l,m;
    
    
    const_strs=[];
    const_seg_len=0;
    const_str_addrs=[];
    
    cond_db_comp=clone(cond_db);
    for(j=0;j<cond_db_comp.length;j++)
    {
        cond_db_comp[j].condition=handleProgElemConstStr(cond_db_comp[j].condition);
        if (cond_db_comp[j].condition==null)
        {
            return null;
        }
        for(k=0;k<cond_db_comp[j].actions.length;k++)
        {
            var act_type=cond_db_comp[j].actions[k].act_type;
            if (act_type==act_types.comment)
            {
                continue;
            }
            for(l=0;l<act_desc[act_type].field_list.length;l++)
            {
                if ((act_desc[act_type].field_list[l].type==field_types.str_num)||(act_desc[act_type].field_list[l].type==field_types.str_text_area))        
                {
                    cond_db_comp[j].actions[k][act_desc[act_type].field_list[l].name]=handleProgElemConstStr(cond_db_comp[j].actions[k][act_desc[act_type].field_list[l].name]);
                    if (cond_db_comp[j].actions[k][act_desc[act_type].field_list[l].name]==null)
                    {
                        return null;
                    }
                }
            }
        }
    }

    
    const_seg_len=0;
    for(i=0;i<const_strs.length;i++)
    {
        const_str_addrs[i]=max_var_addr+const_seg_len;
        const_seg_len+=alignedLen(const_strs[i].length+1,4); // 0 terminated at the end
    }
    
    const_str_byte_array=new Uint8Array(const_seg_len);
    for(i=0;i<const_strs.length;i++)
    {
        for(j=0;j<const_strs[i].length;j++)
        {
           const_str_byte_array[const_str_addrs[i]-max_var_addr+j]=const_strs[i].charCodeAt(j);
        }
        const_str_byte_array[const_str_addrs[i]-max_var_addr+const_strs[i].length]=0;
    }
    return "";
}

function allocVars()
{
	var i,j,kpass;
	var curr_addr;
	// create variable mapping segment where each variable in the project is assigned a specific address in the variable segment
	
	var_addrs=[];
	curr_addr=0;
	

    

	
    for(i=0;i<2;i++)
    {
        var_descr[i]={start_addr:curr_addr,num_vars:0};
        var_descr[i].num_vars+=var_db[i].var_list.length;
        var type=0;
        for(k=0;k<var_db[i].var_list.length;k++)
        {
            if (var_db[i].type==var_type.prog)
            {
                type=var_db[i].var_list[k].type;
            }
            var end=var_addrs.length;
            var_addrs[end]={name:convertString(var_db[i].var_list[k].name),addr:curr_addr,type:getVarType(var_db[i].type,type)};
            if (var_db[i].var_list[k].init_arr!=undefined)
            {
                var_addrs[end].init_arr=clone(var_db[i].var_list[k].init_arr);
            }
            curr_addr+=getVarSize(var_db[i].type,type);
        }
    }
	max_var_addr=curr_addr;
    
    if (allocConstStrs()==null)
    {
        return null;
    }
    
    return "";
}

function getVarAddr(type,var_num)
{
   	var offset=0;
	var i;
	var full_name;
    full_name=var_db[type].var_list[var_num].name;
	for(i=0;i<var_addrs.length;i++)
	{
		if (var_addrs[i].name==full_name)
		{
			offset=var_addrs[i].addr/4;
			return offset;
		}
	}
	return 0;
}


function getVarValue(type,var_num,off)
{
	var offset=0;
	var i;
	var full_name;
	full_name=var_db[type].var_list[var_num].name;
	for(i=0;i<var_addrs.length;i++)
	{
		if (var_addrs[i].name==full_name)
		{
			offset=var_addrs[i].addr/4+off;
			return var_value_db[offset];
        }
	}
	return var_value_db[0];
}

function getVarValueByteOffset(type,var_num,off)
{
	var offset=0;
	var i;
	var full_name;
	full_name=var_db[type].var_list[var_num].name;
	for(i=0;i<var_addrs.length;i++)
	{
		if (var_addrs[i].name==full_name)
		{
			offset=var_addrs[i].addr/4;
            var lg=Math.floor(off/4);
            var bt=off%4;
            var val=var_value_db[offset+lg];
            val=(val>>((bt)*8))&0xff
			return val;
        }
	}
	return var_value_db[0];
}



var var_type_a=
{
	plc:0,
	regular:1,
	io:2,
	const_num:3,
};

function varElemByName(arg1,arg2)
{
    var i,j;
    var func_index=-1;
    var arg_reorder=[];
    var var_elem=null;
    var var_db_ptr;
    var_db_ptr=var_db;
    arg_reorder=[arg1,arg2];
    
    for(i=0;i<var_db_ptr[0].var_list.length;i++)
    {
        if (var_db_ptr[0].var_list[i].name==arg_reorder[0])
        {
            var_elem=var_db_ptr[0].var_list[i];
            break;
        }
    }
    
    if (var_elem==null)
    {
        return null;
    }
    
    if (arg_reorder[1]!=undefined)
    {
        if (LD_IsUDTType(var_elem.type))
        {
           var field=LD_UDT_Field(LD_GetUDT(var_elem.type),arg_reorder[1]);
           return {elem:var_elem,field:field};
        }
    }
    else
    {
        
        return {elem:var_elem};
    }
    return null;    
}

function findVariable(varb,error_list)
{
	// check if the variable is IO variable
	var i,j;
	var subs1;
	var pos;
	var arr=varb.split(".");
	
	//error_list=[];
	if (arr.length==0)
	{
		error_list[error_list.length]="no such variable: "+postFix[i];
		return {error:true}; 
	}
    if (arr[0]=="___const_str_RGLISTVAIN_") // need a prefix which doesn't intersect with any variable that user defines
    {
        // constant string
        var const_num=parseInt(arr[1]);
        return {var_type:var_type_a.regular,reg_var_type:const_str_var_type,addr:const_str_addrs[const_num]};
    }
	else if (arr[0]=="IO")
	{
		var slot,section,var_name;
		var slot_n, sect_n, var_elem,sect_pos,obj_pos; 
		var subs2;
		
		if (arr.length!=4)
		{
			error_list[error_list.length]="IO Variable not formated correctly: "+varb;
			return {error:true}; 
		}
		
		slot=arr[1].slice(4);
		slot_n=parseInt(slot);
		section=arr[2];
		sect_n=-1;
		for(j=0;j<sect_names.length;j++)
		{
			if (section==sect_names[j])
			{
				sect_n=j;
				break;
			}
		}
		if (sect_n==-1)
		{
			error_list[error_list.length]="no such IO section: "+section;
			return {error:true}; 
		}
		var_name=arr[3];
		if (!((slot_n>=0)&&(slot_n<IO.length)))
		{
			error_list[error_list.length]="no such Slot: "+slot_n;
			return {error:true}; 
		}
		var slice_index=findIndex(IO[slot_n]);
		sect_pos=-1;
		for(j=0;j<slices[slice_index].sections.length;j++)
		{
			if (slices[slice_index].sections[j].type==sect_n)
			{
				sect_pos=j;
				break;
			}
		}
		if (sect_pos==-1)
		{
			// alert("no such section in the slot
			error_list[error_list.length]="no such section "+ "\""+section+"\" in Slot "+slot_n;
			return {error:true}; 
		}
		obj_pos=-1;
		for(j=0;j<slices[slice_index].sections[sect_pos].objects.length;j++)
		{
			if (convertString(slices[slice_index].sections[sect_pos].objects[j].name)==var_name)
			{
				obj_pos=j;
				break;
			}
		}
		if (obj_pos==-1)
		{
			error_list[error_list.length]="no such IO Object "+"\""+var_name+"\" in slot "+ slot_n+ "section " +section;
			return {error:true}; 
		}
		return {var_type:var_type_a.io,io_data:[slot_n,
														    sect_n,
															 slices[slice_index].sections[sect_pos].objects[obj_pos].offset, 
		                                        slices[slice_index].sections[sect_pos].objects[obj_pos].length,
															 slices[slice_index].sections[sect_pos].objects[obj_pos].signed
															 ]};
	}
	else
	{	
		var addr=-1;
		var act_var_type=0;
		
        
        var elem=varElemByName(arr[0],arr[1]);          
        
        if (elem==null)
        {
            // check if this is a function constant 
            for(i=0;i<const_list.length;i++)
            {
                if (const_list[i].str==varb)
                {
                    return {var_type:var_type_a.const_num,num:const_list[i].val};
                }
            }
            // check if it is a user defined constant
            for(i=0;i<var_db[2].var_list.length;i++)
            {
                if (var_db[2].var_list[i].name==varb)
                {
                    return {var_type:var_type_a.const_num,num:i};
                }
            }
        
        
            // check if this is a PLC variable.
            for(i=0;i<var_db[1].var_list.length;i++)
            {
                if (var_db[1].var_list[i].name==varb)
                {
                    return {var_type:var_type_a.plc,plc_data:[
														    var_db[1].var_list[i].section,
                                                            var_db[1].var_list[i].word_index,
                                                            var_db[1].var_list[i].bit_offset,
                                                            var_db[1].var_list[i].size,
                                                            var_db[1].var_list[i].signed,
															 ]};
                }
            
            }
            // not a PLC variable -> no such variable
            error_list[error_list.length]="no such variable: "+varb; 
            return {error:true}; 
        }
        
        var new_str;
        new_str=elem.elem.name;
        
		
		// normal variable
		for(j=0;j<var_addrs.length;j++)
		{
			// compare either against a global or a local reference
			if (var_addrs[j].name==new_str)
			{
				addr=var_addrs[j].addr;
				act_var_type=var_addrs[j].type;
				break;
			}
		}
		if (addr==-1)
		{
			//alert("no such variable
			error_list[error_list.length]="no such variable: "+varb; 
			return {error:true}; 
		}
        if (elem.field!=undefined)
        {
            addr+=elem.field.offset;
        }
		return {var_type:var_type_a.regular,reg_var_type:act_var_type,addr:addr};
	}
}


function encodeElem(var_p,var_enc)
{
	var elem;
	if (var_p.var_type==var_type_a.const_num)
	{
		elem=var_p.num;
		var_enc[0]=3<<6;
	}
	else if (var_p.var_type==var_type_a.io)
	{
		elem=(var_p.io_data[0]<<24)|(var_p.io_data[1]<<22)|(var_p.io_data[2]<<8)|(var_p.io_data[3]<<0);
		var bin_conv;
		if (var_p.io_data[4]==false)
		{
			bin_conv=0;
		}
		else
		{
			bin_conv=1;
		}	
		var_enc[0]=(2<<6)|(bin_conv);
	}
    else if (var_p.var_type==var_type_a.plc)
    {
        elem=(var_p.plc_data[0]<<31)|(var_p.plc_data[1]<<0)|(var_p.plc_data[2]<<24)|(var_p.plc_data[3]<<30)|(var_p.plc_data[4]<<29);
        var_enc[0]=(0<<6);
    }
	else if (var_p.var_type==var_type_a.regular)
	{
		elem=var_p.addr;
		var_enc[0]=(1<<6)|var_p.reg_var_type;
	}
	var_enc[1]=(elem>>24)&0xff;
	var_enc[2]=(elem>>16)&0xff;
	var_enc[3]=(elem>>8)&0xff;
	var_enc[4]=(elem>>0)&0xff;
}

function copyArrInto(dst_arr, src_arr)
{
	var i,dst_arr_index;
	dst_arr_index=dst_arr.length;
	for(i=dst_arr_index;i<(dst_arr_index+src_arr.length);i++)
	{
		dst_arr[i]=src_arr[i-dst_arr_index];
	}
}




function parseExpression(expr, comp_prog,error_list)
{
	var exp=new Expression("");
	var postFix;
	var i,j,found;
	var cond,elem_n;
	var prev_var_type;
	var tmp=[];
	
	exp.Reset();
	exp.Expression(expr);
	try
	{
		//exp.Parse();
		exp.Evaluate(false);
	}
	catch(e)
	{
		error_list[error_list.length]=e;	
		return;
	}
	postFix=exp.getPostFix();
	
	
	
	for(i=0;i<postFix.length;i++)
	{
	
		if (postFix[i]==ARG_TERMINAL)
		{
			continue;
		}
		
	
		if (postFix[i]==false)
		{
			postFix[i]=0;
		}
		else if (postFix[i]==true)
		{
			postFix[i]=1;
		}
		

		if (typeof(postFix[i])=="number")
		{
			var_p={var_type:var_type_a.const_num,num:postFix[i]};
			tmp=[];
			comp_prog[comp_prog.length]=ops.push;
			encodeElem(var_p,tmp);
			copyArrInto(comp_prog,tmp);
		}
		else
		{
			found=false;
			// check if the operation is function
			for(j=0;j<op_desc.length;j++)
			{
				if (op_desc[j].name==postFix[i])
				{
					// check if the function is applied on the right object
					if ((op_desc[j].op==ops.expired)||(op_desc[j].op==ops.count))
					{
						var var_p=findVariable(postFix[i-1],error_list);
						if (!((var_p.var_type==var_type_a.regular)&&((varProgType(var_p.reg_var_type)==var_prg.timer))))
						{
							error_list[error_list.length]="Wrong Variable data type of "+postFix[i-1]+". It should be of type counter or timer";	
							return;
						}
					}
					comp_prog[comp_prog.length]=op_desc[j].op;
					found=true;
					break;
				}
			}
            
            if (found==false)
            {
                var ent=LD_FindFuncEntry(postFix[i]);
                if (ent!=null)
                {
                    found=true;
                    comp_prog[comp_prog.length]=((ent.op_code>>16)&0xff);
                    comp_prog[comp_prog.length]=((ent.op_code>>8)&0xff);
                    comp_prog[comp_prog.length]=((ent.op_code>>0)&0xff);
                }
            }
            
			if (found==false)
			{
				// it is a variable
				
				var var_p=findVariable(postFix[i],error_list);
				var tmp=[];
				comp_prog[comp_prog.length]=ops.push;
                if (var_p.error!=undefined)
				{
					return;
				}
				else
				{
					encodeElem(var_p,tmp);
				}
				copyArrInto(comp_prog,tmp);
			}
		}
	}
}


var cond_code=[];
var prog_code=[];



var combined_prj;
var combined_prj_byte_arr;
var combined_prj_str;


var loc_compile_res=false;

function setCompilerMessage(without_upload,error,string)
{
	if (without_upload==false)
	{
		if (error==true)
		{
			comp_res.innerHTML="<font color=\"#F00000\">"+string+"</font>";
		}
		else
		{
			comp_res.innerHTML=string;
		}
	}
}

function setCompilerErrorInCondition(without_upload,cond,act,error_list)
{
	setCompilerMessage(without_upload,true,"Compilation Status: <b>Error in Condition <u>"+cond+"</u> Action <u>"+act+"</u>.</b> Details: <b>"+error_list+"</b>");
}

function appendNumToArr(arr,val)
{
	arr[arr.length]=(val>>24)&0xff;
	arr[arr.length]=(val>>16)&0xff;
	arr[arr.length]=(val>>8)&0xff;
	arr[arr.length]=(val>>0)&0xff;
}


function appendNumToArrLE(arr,offset,num,num_bytes)
{
    switch(num_bytes)
    {
        case 4:
           arr[offset+2]=(num>>16)&0xff;
           arr[offset+3]=(num>>24)&0xff;
        case 2:
           arr[offset+1]=(num>>8)&0xff;
        case 1:
           arr[offset]=(num>>0)&0xff;
    }
}

function alignedLen(num,align_len)
{
    var div=Math.floor(num/align_len);
    if ((num%align_len)!=0)
    {
        return (div+1)*align_len;
    }
    return num;
}


var cond_db_clone=[];

function compileProject1(without_upload,upload_source)
{

	var postFix,tmp;
	var i,j,k,l,found;
	var error_list,elem_n;

	if (without_upload==true)
	{
		loc_compile_res=false;
	}
	
    // check for variable/function/const conflicts
    var all_vars=[];
    for(i=0;i<var_db.length;i++)
    {
        for(j=0;j<var_db[i].var_list.length;j++)
        {
            all_vars[all_vars.length]=var_db[i].var_list[j].name;
        }
    }
    // add library constants
    for(i=0;i<const_list.length;i++)
    {
        all_vars[all_vars.length]=const_list[i].str;
    }
    // add function names
    for(i=0;i<lib_struct.num_funcs;i++)
    {
        all_vars[all_vars.length]=lib_struct.funcs[i].name;
    }
    // add fixed names
    all_vars[all_vars.length]="PLC";
    all_vars[all_vars.length]="PROG";
    all_vars[all_vars.length]="IO";
    // run through all variables and check for conflicts
    for(i=0;i<all_vars.length;i++)
    {
        for(j=0;j<all_vars.length;j++)
        {
            if ((i!=j)&&(all_vars[i]==all_vars[j]))
            {
                setCompilerMessage(without_upload,true,"Compilation Status: Name Conflict:<b>  "+all_vars[i]+"</b>");
                return;
            }
        }
    }
    
	
	if (allocVars()==null)
    {
        setCompilerMessage(without_upload,true,"Compilation Status: <b>Unterminated string ? "+unterminated_str_elem+"</b>");
        return;
    }
	error_list=[];
	
	
	
	// check if 2 variables have the same name
	for(i=0;i<var_addrs.length;i++)
	{
		for(j=i+1;j<var_addrs.length;j++)
		{
			if ((var_addrs[j].name==var_addrs[i].name))
			{
				setCompilerMessage(without_upload,true,"Compilation Status: <b>Duplicate variable: "+var_addrs[j].name+"</b>");
				return; 
			}
		}
	}
		
	for(i=0;i<op_desc.length;i++)
	{
		for(j=0;j<var_addrs.length;j++)
		{
			if (var_addrs[j].name==op_desc[i].name)
			{
				setCompilerMessage(without_upload,true,"Compilation Status: <b> Conflict between variable and function: "+var_addrs[j].name+"<b>");
			}
		}
	}

    cond_db_clone=clone(cond_db);
    cond_db=cond_db_comp;
    cond_code=new Array();
	for(i=0;i<cond_db.length;i++)
	{
    	cond_code[i]={condition:[],actions:[]};
		parseExpression(cond_db[i].condition,cond_code[i].condition,error_list);
		if (error_list.length!=0)
		{
			setCompilerMessage(without_upload,true,"Compilation Status: <b> Error in Condition "+i+".<b> Details: <b>"+error_list+"</b>");
            cond_db=cond_db_clone;
            return;
		}
		for(j=0;j<cond_db[i].actions.length;j++)
		{		
		   
			if (cond_db[i].actions[j].act_type==act_types.assignment) // assignment
			{
				var var_to;
				var eval_expr=[];
				tmp=[];
				var_to=findVariable(cond_db[i].actions[j].dst,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
				parseExpression(cond_db[i].actions[j].src,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
				cond_code[i].actions[j]=clone(eval_expr);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				encodeElem(var_to,tmp);
				copyArrInto(cond_code[i].actions[j],tmp);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.assign;
			}
			if (cond_db[i].actions[j].act_type==act_types.coil) 
			{
				var var_to;
				tmp=[];
				var_to=findVariable(cond_db[i].actions[j].coil,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
				cond_code[i].actions[j]=[];
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				encodeElem(var_to,tmp);
				copyArrInto(cond_code[i].actions[j],tmp);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.coil;
			}
			if (cond_db[i].actions[j].act_type==act_types.cnt_res) 
			{
				var var_to;
				tmp=[];
				var_to=findVariable(cond_db[i].actions[j].counter,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
				cond_code[i].actions[j]=[];
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				encodeElem(var_to,tmp);
				copyArrInto(cond_code[i].actions[j],tmp);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.cnt_res;
			}
			
			if (
			    (cond_db[i].actions[j].act_type==act_types.ctu)|| // counter
				 (cond_db[i].actions[j].act_type==act_types.ctd)
				)
			
			{
				var counter=[],var_p;
				var eval_expr=[],tmp;
				var_p=findVariable(cond_db[i].actions[j].counter,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
				encodeElem(var_p,counter);
				
				parseExpression(cond_db[i].actions[j].preset,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
				
				cond_code[i].actions[j]=[];
				tmp=[];
				tmp=clone(eval_expr);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				copyArrInto(cond_code[i].actions[j],counter);
				copyArrInto(cond_code[i].actions[j],tmp);
				if (cond_db[i].actions[j].act_type==act_types.ctu)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.cnt_ctu;
				}
				else if (cond_db[i].actions[j].act_type==act_types.ctd)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.cnt_ctd;
				}
			}
			
			
			if (
			    (cond_db[i].actions[j].act_type==act_types.timer_start)|| // Timer start
				 (cond_db[i].actions[j].act_type==act_types.ton)||
				 (cond_db[i].actions[j].act_type==act_types.toff)
				)
			
			{
				var timer=[],timer_expiration_time=[],var_p;
				var eval_expr=[],tmp;
				var_p=findVariable(cond_db[i].actions[j].timer,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);				
                    cond_db=cond_db_clone;
					return;
				}
				encodeElem(var_p,timer);
				
				parseExpression(cond_db[i].actions[j].timer_expiration_time,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);								
                    cond_db=cond_db_clone;
					return;
				}
				


				
				cond_code[i].actions[j]=[];
				tmp=[];
				tmp=clone(eval_expr);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				copyArrInto(cond_code[i].actions[j],timer);
				copyArrInto(cond_code[i].actions[j],tmp);
				if (cond_db[i].actions[j].act_type==act_types.timer_start)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.start_timer;
				}
				else if (cond_db[i].actions[j].act_type==act_types.ton)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.ton;
				}
				else if (cond_db[i].actions[j].act_type==act_types.toff)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.toff;
				}
			}
			
			if (cond_db[i].actions[j].act_type==act_types.comment)
			{
				cond_code[i].actions[j]=[];
			}
			if (cond_db[i].actions[j].act_type==act_types.call)
			{
				var var_to;
				var eval_expr=[];
				tmp=[];
				
				parseExpression(cond_db[i].actions[j].procedure,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
                    cond_db=cond_db_clone;
					return;
				}
                cond_db[i].actions[j].last_func_searched=lastFuncSearched;
                cond_code[i].actions[j]=clone(eval_expr);
                cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.pop;
			}
		}
	}
	var start;
	prog_code=[];

	// Kernel Version
    appendNumToArrLE(prog_code,prog_code.length,exp_ARGEE_Kernel_Version,4);

	// Environment Version
    appendNumToArrLE(prog_code,prog_code.length,ARGEE_Environment_Version,4);
    
    // checksum -> will be filled in later on.
    appendNumToArrLE(prog_code,prog_code.length,0,4);

    // total_size (including the header -> will be filled in later on.
    appendNumToArrLE(prog_code,prog_code.length,0,4);
		
	// local_io_scanlist_len
    appendNumToArrLE(prog_code,prog_code.length,stationConfig.length*4,4);
	
    var param_size=0;
    var param_size_aligned=0;
    for(i=0;i<stationConfig.length;i++)
    {
        param_size+=1+stationIO_Config[i].length;
    }
    param_size_aligned=alignedLen(param_size,4);
	// local_io_param_seg_len
    appendNumToArrLE(prog_code,prog_code.length,param_size_aligned,4);
    
    // fill dummy data for the code
    appendNumToArrLE(prog_code,prog_code.length,lib_code.length,4); // lib size
    appendNumToArrLE(prog_code,prog_code.length,0,4); // ARGEE Code size
    appendNumToArrLE(prog_code,prog_code.length,0,4); // Prog source code size
    appendNumToArrLE(prog_code,prog_code.length,0,2); // reg_var offset
    appendNumToArrLE(prog_code,prog_code.length,0,2); // reg_var len
    appendNumToArrLE(prog_code,prog_code.length,lib_struct.LibInit,4); // lib func_load
    appendNumToArrLE(prog_code,prog_code.length,lib_struct.LibUnload,4); // lib func_unload
    // append the reserved fields 
    for(i=0;i<5;i++)
    {
        appendNumToArrLE(prog_code,prog_code.length,0,4);
    }
    
        
    
       
	// save slice IDs
	for(i=0;i<stationConfig.length;i++)
	{
		prog_code[prog_code.length]=(stationConfig[i]>>0)&0xff;
		prog_code[prog_code.length]=(stationConfig[i]>>8)&0xff;
		prog_code[prog_code.length]=(stationConfig[i]>>16)&0xff;
		prog_code[prog_code.length]=(stationConfig[i]>>24)&0xff;
	}
	
    
    // save Slice params and size
	for(i=0;i<stationConfig.length;i++)
	{
		prog_code[prog_code.length]=(stationIO_Config[i].length)&0xff;
		for(j=0;j<stationIO_Config[i].length;j++)
		{
			prog_code[prog_code.length]=(stationIO_Config[i][j])&0xff;
		}
	}
	// pad the param segment
    for(i=param_size;i<param_size_aligned;i++)
    {
       prog_code[prog_code.length]=0;
    }
    
    // save the library code segment
	var lib_start=prog_code.length;
	LD_prepareCodeArr(prog_code,lib_start);
	var lib_end=prog_code.length;

	var lib_aligned_size=alignedLen(prog_code.length-lib_start,4);
	
	start=prog_code.length;
    for(i=start;i<(lib_start+lib_aligned_size);i++)
    {
       prog_code[i]=0;
    } 
	
    
	
	var code_size_aligned=0;
    var code_start;
					
    code_start=prog_code.length;
					
	
	// create program code by inserting conditional goto statements
	var act_len;
	var var_p;
	for(i=0;i<cond_db.length;i++)
	{
		// compute length of all actions combined
        var side_effect_actions=0;
		act_len=0;
		for(j=0;j<cond_db[i].actions.length;j++)
		{
			act_len+=cond_code[i].actions[j].length;
            if (cond_db[i].actions[j].act_type==act_types.call)
            {
                if (cond_db[i].actions[j].last_func_searched.type==2)
                {
                    side_effect_actions++;
                }
            }
            else if ((cond_db[i].actions[j].act_type!=act_types.assignment)&&
                     (cond_db[i].actions[j].act_type!=act_types.comment)/*&&
                     (cond_db[i].actions[j].act_type!=act_types.timer_start)*/)
            {
                side_effect_actions++;
            }
		}
		tmp=[];
		copyArrInto(prog_code,cond_code[i].condition);
        if (side_effect_actions>0)
        {
            var_p={var_type:var_type_a.const_num,num:0};
        }
        else
        {
            var_p={var_type:var_type_a.const_num,num:act_len};
        }
		encodeElem(var_p,tmp);
		prog_code[prog_code.length]=ops.push;
		copyArrInto(prog_code,tmp);
		prog_code[prog_code.length]=ops.branch_if_not_eq;
		for(j=0;j<cond_db[i].actions.length;j++)
		{
			copyArrInto(prog_code,cond_code[i].actions[j]);
		}
	}
	prog_code[prog_code.length]=ops.end_of_prog;
	//comp_res.innerHTML=prog_code;
	//callOtherDomain();
    
    // pad the code segment
    code_size_aligned=alignedLen(prog_code.length-code_start,4);
    start=prog_code.length;
    for(i=start;i<(code_start+code_size_aligned);i++)
    {
       prog_code[i]=0;
    }       

    var var_seg_start=prog_code.length;
    // copy variable segment - only program and timer variables are counted    
    for(i=0;i<max_var_addr;i++)
    {
       prog_code[prog_code.length]=0;
    }
    // copy initialized variables
    for(i=0;i<var_addrs.length;i++)
    {
        if (var_addrs[i].init_arr!=undefined)
        {
            for(j=0;j<var_addrs[i].init_arr.length;j++)
            {
                prog_code[var_seg_start+var_addrs[i].addr+j]=var_addrs[i].init_arr[j];
            }
        }
    }    
    
    

	// copy the constant string segment;
	var const_seg_start=prog_code.length;
    // copy the data
    for(i=0;i<const_seg_len;i++)
    {
        prog_code[prog_code.length]=const_str_byte_array[i];
    }
	// pad constant string segment
	var const_seg_len_aligned=alignedLen(prog_code.length-const_seg_start,4);
    start=prog_code.length;
    for(i=start;i<(const_seg_start+const_seg_len_aligned);i++)
    {
       prog_code[i]=0;
    } 
    var code_end=prog_code.length;
    

	
	
	for(i=0;i<screens.length;i++)
	{
		for(j=0;j<screens[i].rows.length;j++)
		{
			for(k=0;k<screens[i].rows[j].length;k++)
			{
                var num_buttons=0;
				for(l=0;l<screens[i].rows[j][k].sect_elems.length;l++)
				{
					var obj=screens[i].rows[j][k].sect_elems[l];
                    if (obj.type==sect_elem_type.button)
                    {
                        num_buttons++;
                    }
                    if (num_buttons>1)
                    {
                            setCompilerMessage(without_upload,true,
							                      "HMI screen: <b>\""+screens[i].name +"\"</b>"+
									              "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
												  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
												  "Only one button per section is allowed"
											   );
                            cond_db=cond_db_clone;
							return;
                    
                    }
					if ((obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.button)||(obj.type==sect_elem_type.enumeration))
					{
						var var_p=findVariable(screens[i].rows[j][k].sect_elems[l].Destination,error_list);
						if (var_p.error==true)
						{
							setCompilerMessage(without_upload,true,
							                      "HMI screen: <b>\""+screens[i].name +"\"</b>"+
									              "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
												  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
												  "Unknown variable: <b>\""+ screens[i].rows[j][k].sect_elems[l].Destination+"\"</b>"
											   );
                            cond_db=cond_db_clone;                                               
							return;
						}
						else
						{
							if ((obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.button))
							{
								if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
								{						
								}
								else
								{
									setCompilerMessage(without_upload,true,
														  "HMI screen: <b>\""+screens[i].name +"\"</b>"+
														  "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
														  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
														  "Incompatible variable: <b>\""+ screens[i].rows[j][k].sect_elems[l].Destination+"\"</b>. The variable has to be a Program variable of type Integer"
													   );
									cond_db=cond_db_clone;                                               
									return;
								}
							}
							else
							{
								if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.state))
								{						
								}
								else
								{
									setCompilerMessage(without_upload,true,
														  "HMI screen: <b>\""+screens[i].name +"\"</b>"+
														  "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
														  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
														  "Incompatible variable: <b>\""+ screens[i].rows[j][k].sect_elems[l].Destination+"\"</b>. The variable has to be a Program variable of type State"
													   );
									cond_db=cond_db_clone;                                               
									return;
								}
							}
						}
					}
					if ((obj.type==sect_elem_type.status)||(obj.type==sect_elem_type.status_ruler))
					{
						eval_error=0;

						if (obj.type==sect_elem_type.status_ruler)
						{
							if ((isNaN(parseInt((screens[i].rows[j][k].sect_elems[l].NormalRangleMin))==true))||
							    (isNaN(parseInt((screens[i].rows[j][k].sect_elems[l].NormalRangleMax))==true))
								)
							{
								setCompilerMessage(without_upload,true,
													  "HMI screen: <b>\""+screens[i].name +"\"</b>"+
													  "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
													  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
													  "Minimum or Maximum value is not a number."
													  );
								cond_db=cond_db_clone;                                                  
								return;
							}
						}
						
						// check if the expression is just a variable
						var var_p=findVariable(screens[i].rows[j][k].sect_elems[l].Expression,error_list);
						if ((var_p.error==undefined)&&(var_p.var_type==var_type_a.regular))
						{
							if (var_p.reg_var_type==var_prg.timer)
							{
								setCompilerMessage(without_upload,true,
													  "HMI screen: <b>\""+screens[i].name +"\"</b>"+
													  "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
													  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
													  "Can't display timer variable: <b>\""+ screens[i].rows[j][k].sect_elems[l].Expression+"\" </b>"
													  );
								cond_db=cond_db_clone;                                                  
								return;
							}
							if ((var_p.reg_var_type==var_prg.state)&&(obj.type==sect_elem_type.status_ruler))
							{
								setCompilerMessage(without_upload,true,
													  "HMI screen: <b>\""+screens[i].name +"\"</b>"+
													  "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
													  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
													  "State variable can't be used in the \"status with valid range\" element. Variable : <b>\""+ screens[i].rows[j][k].sect_elems[l].Expression+"\" </b>"
													  );
								cond_db=cond_db_clone;                                                  
								return;
							}
						}
						else
						{
							var val=evaluateExpression(screens[i].rows[j][k].sect_elems[l].Expression,true);
							if (eval_error==1)
							{
								setCompilerMessage(without_upload,true,
													  "HMI screen: <b>\""+screens[i].name +"\"</b>"+
													  "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
													  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
													  "Error in Expression: <b>\""+ escapeHTML(screens[i].rows[j][k].sect_elems[l].Expression)+"\" </b>"+
													  "Details: <b>"+val+"</b>"
													  );
								cond_db=cond_db_clone;                                                  
								return;
							}
						}
					}
				}
			}
		}
	}
    // add
    
    
	
	var prog_text_start=prog_code.length;
    var prog_text_length;
	
	combined_prj={var_db:var_db,cond_db:cond_db_clone,scr:screens,flowchart:flowchart,editor:editor,library_desc:lib_struct};
	combined_prj_str=JSON.stringify(combined_prj);
	// convert the json string into bytestring used for transfers
	// each character is converted into 2 character value
    if (upload_source==true)
    {
        for(i=0;i<combined_prj_str.length;i++)
        {
            prog_code[prog_code.length]=combined_prj_str.charCodeAt(i);
        }
    }
    prog_text_length=prog_code.length-prog_text_start;
    
    var prog_text_aligned=alignedLen(prog_code.length-prog_text_start,4);
    start=prog_code.length;
    for(i=start;i<(prog_text_start+prog_text_aligned);i++)
    {
       prog_code[i]=0;
    }  
    
    appendNumToArrLE(prog_code,3*4,prog_code.length,4); // total_size
    appendNumToArrLE(prog_code,7*4,code_end-code_start,4); // ARGEE_code_size
    appendNumToArrLE(prog_code,8*4,prog_text_aligned,4); // prog_text_seg_len
    appendNumToArrLE(prog_code,9*4,code_size_aligned,2); // reg_var_offset
    appendNumToArrLE(prog_code,(9*4)+2,max_var_addr,2); // reg_var_size
    
    
    var checksum=0;
    // calculate the checksum
    for(i=0;i<prog_code.length;i++)
    {
        checksum=(checksum+prog_code[i])&0xffffffff;
    }
    appendNumToArrLE(prog_code,2*4,checksum,4); // prog_checksum
    if (lib_supported==false)
    {
        bytecode_size=(code_end-code_start);
    }
    else
    {
        bytecode_size=(code_end-code_start)+lib_aligned_size+256;
    }
	
	if (bytecode_size>=(max_loadable_prog_size))
	{
		setCompilerMessage(without_upload,true,"Compilation Status: <b>Loadable size > "+max_loadable_prog_size+" bytes </b>");
        cond_db=cond_db_clone;
		return;
	}
	if (prog_code.length>=max_total_size)
	{
		setCompilerMessage(without_upload,true,"Compilation Status: <b>Total project size > "+ max_total_size +" bytes</b>");
        cond_db=cond_db_clone;        
		return;
	}

	setCompilerMessage(without_upload,false,"<b>Compilation Successfull! Loading program into the station ...</b>");	
	
	
	if (without_upload==false) addAjaxAction(UploadProg);
	
	if (without_upload==true)
	{
		loc_compile_res=true;
	}		
	cond_db=cond_db_clone;
	
}

var eval_error=0;


// Evaluate expression - used only in HMI
function evaluateExpression(expr,rw)
{
	var exp = new Expression("");
	var postFix;
	var i;
	var error_list=[];
	var var_p;
	var res;
	exp.Reset();
	exp.Expression(expr);
	try
	{
		exp.Parse();
	}
	catch(e)
	{
		eval_error=1;
		res=e;
		return e;
	}
	postFix=exp.getPostFix();
	for(i=0;i<postFix.length;i++)
	{
		if (typeof(postFix[i])=="string")
		{
			//if (postFix[i].search(".")!=-1)
			{
				var_p=findVariable(postFix[i],error_list);
				//if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
				{
					if (rw==false)
					{
						exp.AddVariable(postFix[i],var_value_db[var_p.addr/4]);
					}
					else
					{
						exp.AddVariable(postFix[i],1);
					}
				}
			}
		}
	}
	try
	{
		res=exp.Evaluate(true);
	}
	catch(e)
	{
		eval_error=1;
		res=e;
	}
	return ToInt32(res);
}
