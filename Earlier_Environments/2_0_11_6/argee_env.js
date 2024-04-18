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
 *  DESCRIPTION: Programmable Environment ARGEE
 *
 *******************************************************************************/

 
var ARGEE_Environment_Version=0x02000B06;
var exp_ARGEE_Kernel_Version= 0x02030000; 


var real_ARGEE_Kernel_Version;
var real_DeviceName=""; 

/*var max_loadable_prog_size=(32*1024);
var max_total_size=(256*1024);
*/

var max_loadable_prog_size=(6*1024);
var max_total_size=(256*1024);

//var url_prefix="http://192.16.1.200";
//var url_prefix="http://192.168.1.247";
var url_prefix="";

var lib_supported=false;


/*var log_data="<br>";

function addToLog(str)
{
	log_data=log_data+str+"<br>";
}
*/
function saveLocal()
{
	localStorage.cond_db=JSON.stringify(cond_db);
	localStorage.var_db=JSON.stringify(var_db);
	localStorage.screens=JSON.stringify(screens);
	localStorage.flowchart=JSON.stringify(flowchart);
	localStorage.editor=JSON.stringify(editor);
    if (localStorage.libraryDesc==undefined)
    {
        LD_SaveLib();
    }
}

function adjustMenuScreen(adj)
{
	var nav=document.getElementById("navigation");
	var prog_div=document.getElementById("prog");
	var vars_div=document.getElementById("vars");

	if (adj<0)
	{
		nav.style.height="0em";
		nav.style.display="none";
		prog_div.style.width="99%"
		prog_div.style.left="5px";
		prog_div.style.right="99%";
		prog_div.style.top="0em";
		vars_div.style.top="0em";
		vars_div.style.display="none";
		
	}
	else
	{
		nav.style.height="6em";
		nav.style.display="block";
		prog_div.style.top="6em";
		vars_div.style.top="6em";
		
		if (side_by_side==true)
		{
		
			var_div=this.document.getElementById("vars");
			prog_div.style.width=(100-left_col_width)+"%";
			var_div.style.width=(left_col_width-1)+"%";
			prog_div.style.left=left_col_width+"%";
			var_div.style.left="5px";
			var_div.style.right=left_col_width+"%";
			vars_div.style.display="block";
		}
	}
}
		
	

var invocation = new XMLHttpRequest();
var url = url_prefix+'/prog';
var body;

var frag_size=32;

var toTrans;
var curr_frag;


var var_value_db=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var bytecode_size=0;
var submit_var_list=[];
var curr_subm_var=0;


var debugMode=false;
var num_var_iter=0;

var rungs_status=new Array();


var local_io_db_sects=
{
	input:0,
	output:1,
	diag:3,
}

var plc_sects=
{
	input:0,
	output:1,
}


var local_io_db=[];
var plc_io_db=[];





var stationConfig=[];
var stationIO_Config=[];





/*var obj_list=
[ {obj_id:0,inst:
*/


var skip_param_download=false;



function parseARGEE_File(arr,check_gw_id)
{
    var dataView=new DataView(arr);
    var i;        
    var env=dataView.getUint32(1*4,true);
	
	if ((env&0xffff0000)!=(ARGEE_Environment_Version&0xffff0000))
	{
		setCompilerMessage(false,true,"Incompatible project - created with environment version "+getVersionString(env));
		alert("Incompatible project - created with environment version "+getVersionString(env));
		return false;
	}
	
    var header_size=48+(5*4);
    var text_len=dataView.getUint32(8*4,true);
    var lio_scanlist_len=dataView.getUint32(4*4,true);
    var lio_param_seg_len=dataView.getUint32(5*4,true);
    var lib_len=dataView.getUint32(6*4,true);
    var ARGEE_code_len=dataView.getUint32(7*4,true);
    var text_offset=header_size+lio_scanlist_len+lio_param_seg_len+
                    lib_len+ARGEE_code_len;
    
    var lib_offset=header_size+lio_scanlist_len+lio_param_seg_len;
    var binStr='';
    
	// load program text and descriptors
    for(i=0;i<text_len;i++)
    {
        if (dataView.getUint8(text_offset+i)==0)
        {
            break;
        }
        binStr+=String.fromCharCode(dataView.getUint8(text_offset+i));
    }
	var comb=JSON.parse(binStr);
	if ((comb.editor!="regular")&&(sim_mode==true))
	{
		setCompilerMessage(false,true,"Simulation is not supported for flowchart projects");
		alert("Simulation is not supported for flowchart projects");
		return false;
	}
	
	
	
		
    
	if (check_gw_id==true)
	{
		
		
		
		
		var scan_list_len_offset=4*4;
		var param_seg_len_offset=5*4;
		var stationConfig_tmp=[];
		
		
		var scanlist_len=dataView.getUint32(scan_list_len_offset,true);	
		scanlist_len/=4;
		var param_seg_len=dataView.getUint32(param_seg_len_offset,true);	
		var offset=header_size;
		stationConfig_tmp=[];
		for(i=0;i<scanlist_len;i++)
		{
			stationConfig_tmp[i]=dataView.getUint32(offset,true);offset+=4;
		}
		
		if (sim_mode==true)
		{
			var j;
			var found_ind=-1;
			// find the GW ID in the simulation profile
			for(i=0;i<sim_devices.length;i++)
			{
				if (sim_devices[i].slice_list.length!=stationConfig_tmp.length)
				{
					continue;
				}
				var match=true;
				for(j=0;j<sim_devices[i].slice_list.length;j++)
				{
					
					if (SIM_CompareModuleIDs(j,stationConfig_tmp[0],sim_devices[i].slice_list[j],stationConfig_tmp[j])==false)
					{
						match=false;
						break;
					}
				}
				if (match==true)
				{
					found_ind=i;
					break;
				}
			}
			if (found_ind!=-1)
			{
				combined_prj=JSON.parse(binStr);
				cond_db=combined_prj.cond_db;	
				var_db=combined_prj.var_db;
				screens=combined_prj.scr;
				flowchart=combined_prj.flowchart;
				editor=combined_prj.editor;
				lib_struct=combined_prj.library_desc;
				loadProgVars();
				saveLocal();
				localStorage.simDevSelect=found_ind;
				localStorage.firstSimImport=true;
				window.location.reload();
				return false;
			}
			else
			{
				alert("Can not Simulate device in the project");
				setCompilerMessage(false,true,"Can not Simulate device in the project");
				return false;
			}
		}
		
		
		// check if the same as real station config
		if (JSON.stringify(stationConfig)!=JSON.stringify(stationConfig_tmp))
		{
			
			if (comb.editor=="regular")
			{
				var r = confirm("The imported file may not be compatible with this device\n It could cause a crash of the device\n Click OK to proceed at your own risk.");					
				if (r != true) 
				{
					return false;
				}
			}
			else
			{
				setCompilerMessage(false,true,"Can not load flowchart project from incompatible station");
				alert("Can not load flowchart project from incompatible station");
				return false;
			}
		}
		else
		{
			var end=offset+param_seg_len;
			var mod=0;
			for(;offset<end;mod++)
			{
				var len1=dataView.getUint8(offset);offset++;
				if (len1==0)
				{
					continue;
				}
				stationIO_Config[mod]=[];
				for(i=0;i<len1;i++)
				{
					stationIO_Config[mod][i]=dataView.getUint8(offset);offset++;
				}
			}
			// compare scanlist
			skip_param_download=true;
		}
	}
    
    
    
    // load library binary
    for(i=0;i<lib_len;i++)
    {
        lib_code[i]=dataView.getUint8(lib_offset+i);
    }
    
    
    comp_res.innerHTML="Status: Downloaded.";
    
    if (binStr.length==0)	
    {
        // nothing loaded
        initProj(true);
    }
    else
    {
        combined_prj=JSON.parse(binStr);
        cond_db=combined_prj.cond_db;	
        var_db=combined_prj.var_db;
        screens=combined_prj.scr;
        flowchart=combined_prj.flowchart;
        editor=combined_prj.editor;
        lib_struct=combined_prj.library_desc;
        loadProgVars();
    }
	return true;
}

var empty_project_detected=false;


function insert_val_prog_scr1(val, elem,select_start,act_elem_type)
{
	var content=elem.value;
	var pos=select_start;
	var str=new String(content);
	var str1=str.slice(0,pos);
	var str2=str.slice(pos,str.length);
	var tp,cnd_num,act_num,act_elem_num;
    var prev_len=content.length;
	elem.value=new String().concat(str1,val,str2);
	elem.setSelectionRange(pos+val.length,pos+val.length,0);
	// need to decode element ID and call appropriate onChange function
	var elem_type=elem.id;
	var type=act_elem_type;
	//console.log(type);
	
	if (type==expr_types.cond)
	{
		tp=0;
		cnd_num=parseInt(elem_type.substr(4));
		changeCondElem(elem_type,cnd_num);
	}
	else if (type==expr_types.act)
	{
		tp=1;
		var ind,ind1;
		var mod=elem_type;
		var substr;
		var extr;
		// cnd_num
		ind=mod.search("_");
		substr=mod.slice(ind+1);
		ind1=substr.search("_");
		substr=mod.slice(ind+1,ind+1+ind1);
		cnd_num=parseInt(substr);
		mod=mod.slice(ind+1+ind1);
		// get act num
		ind=mod.search("_");
		substr=mod.slice(ind+1);
		ind1=substr.search("_");
		substr=mod.slice(ind+1,ind+1+ind1);
		act_num=parseInt(substr);
		mod=mod.slice(ind+1+ind1+1);
		// get elem_num
		act_elem_num=parseInt(mod);
		changeActionElem(elem_type,cnd_num,act_num,act_elem_num);
        
        if (prev_len==0)
        {
            var act_type=cond_db[cnd_num].actions[act_num].act_type;
            if (act_type==act_types.call)
            {
                cond_db[cnd_num].actions[act_num].help=LD_GetFunctionHelpString(val);
                refreshProg(true);
            }
        }
        
	}
	else if ((type==expr_types.hmi_var)||(type==expr_types.hmi_expr))
	{
		var outp=extractNumbersFromID(elem_type);
		changeSectElem(elem_type,outp[0],outp[1],outp[2],outp[3],outp[4]);
	}
}



function extractNumbersFromID(id)
{
	var s1,s2,s3,str;
	var outp=[];
	str=id;
	while(1)
	{
		s1=str.search("_");
		s2=str.slice(s1+1);
		s3=s2.search("_");
		if (s3!=-1)
		{
			s2=str.slice(s1+1,s1+1+s3);
			outp[outp.length]=parseInt(s2);
			str=str.slice(s1+1+s3);
		}
		else
		{
			outp[outp.length]=parseInt(s2);	
			break;
		}
	}
	return outp;
}






var sect_names=["Input","Output","Diagnostics","Parameters"];

var slices=[];


// this can be used for simulation
var transfered_vars=new Array(1000);	


var IO=[];//["FGEN Station 5 Pin","16XSG"];
//80695500
//80670500
//80670500


//var men_style="<link rel=\"stylesheet\" type=\"text/css\" href=\"men.css\">";
var men_style="";

					  
var var_div;
var prog_div;
var men_div;
var buttons_div;
var tabs_div;
var var_context_menu_div;

var menu_str="";

			
			


var var_type=
{
	prog:0,
	plc:1,
	state_names:2,
//	m2m:4,
	io:5,
    state:6,

};

    
    
var var_prg=
{
    integer:0,
    timer:1,
    state:2,
}


var var_db_names=["Program Variables","PLC Variables","State Names"];

var var_db=
[
	{type:var_type.prog, name:"Program Variables", var_list:new Array()},
	{type:var_type.plc,name:"PLC Variables", var_list:new Array()},
    {type:var_type.state,name:"States", var_list:new Array()},
];			

var var_db_template=
[
	{type:var_type.prog, name:"Program Variables", var_list:[{name:"PLC_connected",type:var_prg.integer,fixed:true},
                                                             {name:"PROG_cycle_time",type:var_prg.integer,fixed:true}]},
	{type:var_type.plc,name:"PLC Variables", var_list:new Array()},
    {type:var_type.state,name:"States", var_list:new Array()},
];			

var var_db_template_func=
[
	{type:var_type.prog, name:"Program Variables", var_list:[]},
	{type:var_type.plc,name:"PLC Variables", var_list:new Array()},
    {type:var_type.state,name:"States", var_list:new Array()},
];				


var editor="regular";

var var_templates=
[
	{name:"",type:0},
	{name:"",section:0,word_index:0, bit_offset:0, size:0,signed:0},
    {name:""},
]

var field_types=
{
	enumeration:0,
	var_list:1,
	str_num:2,
	fixed:3,
	str_num_var:4, // field which exposes variable context menu extension
	str_text_area:5,
	num:6,
	state_enum:7,
};

var msg_id_enum=new Array();


var int_init_string = "function renderInitCustom(prog_var_num,div_elem_id)\n{\n    if (var_db[0].var_list[prog_var_num].init_arr==undefined)\n    {\n        var_db[0].var_list[prog_var_num].init_arr=[0,0,0,0];\n    }\n    var charArr=new Uint8Array(var_db[0].var_list[prog_var_num].init_arr);\n    \n    var datView=new DataView(charArr.buffer);\n    var div_elem=document.getElementById(div_elem_id);\n    div_elem.innerHTML=\"<input type=\\\"email\\\" autocorrect=\\\"off\\\" autocapitalize=\\\"off\\\" autocomplete=\\\"off\\\" size=\\\"\"+15+\"\\\" value=\\\"\"+datView.getInt32(0,true)+\"\\\" id=\\\"init_int_var\\\">\";\n}\n\nfunction applyInitCustom(prog_var_num)\n{\n    var i;\n    var elem=document.getElementById(\"init_int_var\");\n    var arr=new Uint8Array(4);\n    var datView=new DataView(arr.buffer);\n    datView.setUint32(0,parseInt(elem.value),true);\n    for(i=0;i<4;i++)\n    {\n        var_db[0].var_list[prog_var_num].init_arr[i]=datView.getUint8(i);\n    }\n    \n}\n\nfunction initDisplayValue(prog_var_num)\n{\n    var charArr=new Uint8Array(var_db[0].var_list[prog_var_num].init_arr);\n    var datView=new DataView(charArr.buffer);\n    return \"init:\"+datView.getInt32(0,true);\n}    \n";
var state_enum_init_string="function renderInitCustom(prog_var_num,div_elem_id)\n{\n    if (var_db[0].var_list[prog_var_num].init_arr==undefined)\n    {\n        var_db[0].var_list[prog_var_num].init_arr=[0,0,0,0];\n    }\n    var charArr=new Uint8Array(var_db[0].var_list[prog_var_num].init_arr);\n    \n    var datView=new DataView(charArr.buffer);\n    var div_elem=document.getElementById(div_elem_id);\n    var val=datView.getUint32(0,true);\n    var res=\"\";\n    var i;\n    res+=\"<select id=\\\"state_init_val\\\">\";\n    for(i=0;i<var_db[2].var_list.length;i++)\n    {\n        if (i==val)\n        {\n            res+=\"<option selected>\";\n        }\n        else\n        {\n            res+=\"<option>\";\n        }\n        res+=var_db[2].var_list[i].name+\"<\/option>\";\n    }\n    res+=\"<\/select>\";\n    div_elem.innerHTML=res;\n}\n\nfunction applyInitCustom(prog_var_num)\n{\n    var i;\n    var elem=document.getElementById(\"state_init_val\");\n    var arr=new Uint8Array(4);\n    var datView=new DataView(arr.buffer);\n    datView.setUint32(0,elem.selectedIndex,true);\n    for(i=0;i<4;i++)\n    {\n        var_db[0].var_list[prog_var_num].init_arr[i]=datView.getUint8(i);\n    }\n}    \n\n\nfunction initDisplayValue(prog_var_num)\n{\n    var charArr=new Uint8Array(var_db[0].var_list[prog_var_num].init_arr);\n    var datView=new DataView(charArr.buffer);\n    return \"init:\"+var_db[2].var_list[datView.getUint32(0,true)].name;\n}    ";

var prog_var_types_enum_template=        ["Integer",        "Timer/Counter", "State"]
var prog_var_size_in_bytes_template=[4,                 16, 4];
var prog_var_types_template=        [var_prg.integer,   var_prg.timer,var_prg.state];
var prog_var_init_func_template=    [int_init_string, null,  state_enum_init_string];

// maybe have another element - showCurrDefaultValue - to display the data segment value.
// could be cusom to be extended to floating point, IP ....

var prog_var_types_enum=clone(prog_var_types_enum_template);
var prog_var_size_in_bytes=clone(prog_var_size_in_bytes_template);
var prog_var_types=clone(prog_var_types_template);
var prog_var_init_funcs=clone(prog_var_init_func_template);

var plc_var_type=50;
var const_str_var_type=52;
function varProgType(enum_val)
{
    return prog_var_types[enum_val];
}
function varProgSizeInBytes(enum_val)
{
    return prog_var_size_in_bytes[enum_val];
}
var user_progvar_offset=2; // numbr of reserved progam variables (PROG_cycle_time, PROG_cycle_time)
var type_desc=
[
	{type:var_type.prog,elems:
		[
            {name:"name",field_name:"Name",field_size:20,type:field_types.str_num,elem_name_prefix:"prog_var_name"},
            {name:"type",field_name:"Type",field_size:6,type:field_types.enumeration,elem_name_prefix:"prog_var_type",enum_elems:prog_var_types_enum},
        ]
	},
	{type:var_type.plc,elems:
		[
		 {name:"name",field_name:"Name",field_size:20,type:field_types.str_num,elem_name_prefix:"plc_var_name"},
		 {name:"section",field_name:"Direction",field_size:6,type:field_types.enumeration,elem_name_prefix:"plc_var_section",enum_elems:["ARGEE->PLC","PLC->ARGEE"]},
		 {name:"word_index",field_name:"Word index",field_size:3,type:field_types.num,elem_name_prefix:"plc_var_word_index"},
		 {name:"bit_offset",field_name:"Bit offset",field_size:1,type:field_types.enumeration,elem_name_prefix:"plc_var_bit_offset",enum_elems:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]},
		 {name:"size",field_name:"Size",field_size:2,type:field_types.enumeration,elem_name_prefix:"plc_var_size",enum_elems:["Word (16 bit)","Bool (1 bit)"]},
		 {name:"signed",field_name:"Signed",field_size:2,type:field_types.enumeration,elem_name_prefix:"plc_var_signed",enum_elems:["unsigned","signed"]}
		]
	},
    {type:var_type.state,elems:
		[
            {name:"name",field_name:"Name",field_size:20,type:field_types.str_num,elem_name_prefix:"state_var_name"},
        ]
	},
]

function DBG_HandleStateVarChange(elem,num)
{
	var val=elem.selectedIndex;
	var subm_list_len=submit_var_list.length;
	var var_p=findVariable(var_db[var_type.prog].var_list[num].name);
	var enc=[];
	encodeElem(var_p,enc);
	submit_var_list[submit_var_list.length]={enc:enc,val:val};
}

function DBG_HandleIntVarChange(elem,name)
{
	var val=parseInt(elem.value);
	var subm_list_len=submit_var_list.length;
	var var_p=findVariable(name);
	console.log(JSON.stringify(var_p));
	var enc=[];
	encodeElem(var_p,enc);
	submit_var_list[submit_var_list.length]={enc:enc,val:val};

}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor/Debugger - Variable editing/rendering/cut/paste functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function addVar(type)
{
	var i,j;
	var id;
	var elem;
	var_db[type].var_list[var_db[type].var_list.length]=clone(var_templates[type]);
	saveLocal();
	redrawVars(true,false);
}			

var debug_var_submit_mode=false;

function renderVar(type,varNum,output,rw,debug_rw)
{
	var i,j,to_render_del;
	output="";
	to_render_del=true;

	if (rw==true)
	{
		output+="<TR>";
		for(i=0;i<type_desc[type].elems.length;i++)
		{
			switch(type_desc[type].elems[i].type)
			{
				case field_types.num:
				case field_types.str_num:
					  output+="<TD style=\"vertical-align: top;\" >";
                      
                      if (var_db[type].var_list[varNum].fixed==undefined)
                      {
                        output+="<input type=\"email\" autocorrect=\"off\" autocapitalize=\"off\" autocomplete=\"off\" size=\""+type_desc[type].elems[i].field_size+"\" value=\""+var_db[type].var_list[varNum][type_desc[type].elems[i].name]+"\" id=\""+type_desc[type].elems[i].elem_name_prefix+"_"+varNum+
					              "\"  onfocus=\"onVarFocusEnter(this.id,"+type+","+varNum+","+i+",0)\" onblur=\"onVarFocusExit(this.id,"+type+","+varNum+","+i+",0)\">";

                      }
                      else
                      {
                        output+=var_db[type].var_list[varNum][type_desc[type].elems[i].name];
                      }
					  output+="</TD>";
					  break;
				case field_types.enumeration:
					  output+="<TD style=\"vertical-align: top;\" >";
                      if (var_db[type].var_list[varNum].fixed==undefined)
                      {
                          output+="<select id=\""+type_desc[type].elems[i].elem_name_prefix+"_"+varNum+"\" onchange=\"varChange(this.id,"+type+","+varNum+","+i+",0)\">";
                          
                          for(j=0;j<type_desc[type].elems[i].enum_elems.length;j++)
                          {
                                if (var_db[type].var_list[varNum][type_desc[type].elems[i].name]==j)
                                {
                                    output+="<option value="+j+" selected>"+type_desc[type].elems[i].enum_elems[j]+"</option>";
                                }
                                else
                                {
                                    output+="<option value="+j+">"+type_desc[type].elems[i].enum_elems[j]+"</option>";
                                }
                            }
                            output+="</select>";
                       }
                       else
                       {
                          output+=type_desc[type].elems[i].enum_elems[var_db[type].var_list[varNum][type_desc[type].elems[i].name]];
                       }						
					   output+="</TD>";
					  break;
			}
		}
        
		output+="<TD nowrap>";
        if (var_db[type].var_list[varNum].fixed==undefined)
        {
            if ((type==0)&&(prog_var_init_funcs[var_db[type].var_list[varNum].type]!=null)&&(var_db[type].var_list[varNum].init_arr!=undefined))
            {
                
                window[ "eval" ].call( window, prog_var_init_funcs[var_db[0].var_list[varNum].type]);
                if (initDisplayValue!=null)
                {
                    try
                    {
                        var val=initDisplayValue(varNum);
                        output+="<center>"+val+"</center>";
                    }
                    catch(e)
                    {
                    }
                }
            }
            output+="<button onclick=\"delVar("+type+","+varNum+");\">Delete</button>";
            output+="<button onclick=\"addVarAbove("+type+","+varNum+");\">Add Above</button>";
            if (type==0)
            {
                var style="";
                if (var_db[type].var_list[varNum].init_arr==undefined)
                {
                    style="color:black;";
                }
                else
                {
                    style="color:#FF6600;";
                }
                if (prog_var_init_funcs[var_db[type].var_list[varNum].type]!=null)
                {
                    output+="<button style=\""+style+"\" onclick=\"initVar("+varNum+");\">Init</button>";
                }
            }
        }
		output+="</TD>";
		output+="</TR>";
	}
	else
	{
		switch(type)
		{
			case var_type.prog:
				output+="<TR>";
                var type1=varProgType(var_db[type].var_list[varNum].type);
                switch(type1)
                {
                    case var_prg.state:
						output+="<TD bgcolor=lightgrey>Name</TD>";
						output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD><TD style=\"width:9em;\">Value: ";
						var val1=getVarValue(type,varNum,0);
					    if (debug_rw==false)
						{
							if (val1<var_db[2].var_list.length)
							{
								output+=var_db[2].var_list[val1].name;	
							}
							else
							{
								output+=val1;	
							}
						}
						else
						{
							var m;
							var html="<select onchange=\"DBG_HandleStateVarChange(this,"+varNum+");\">";
							for(m=0;m<var_db[2].var_list.length;m++)
							{
								if (val1==m)
								{
									html+="<option selected>"+var_db[2].var_list[m].name+"</option>";
								}
								else
								{
									html+="<option>"+var_db[2].var_list[m].name+"</option>";
								}
							}
							html+="</select>";
							output+=html;
						}
						output+="</TD>";
                        break;

                    case var_prg.integer:
						output+="<TD bgcolor=lightgrey>Name</TD>";
						var val=ToInt32(getVarValue(type,varNum,0));
		                output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>"+"<TD style=\"width:9em;\">Value:";
						if ((debug_rw==true)&&((sim_mode==true)||(varNum>=user_progvar_offset)))
						{
							output+="<input type=\"text\" style=\"width:4em;\" onblur=\"DBG_HandleIntVarChange(this,'"+var_db[type].var_list[varNum].name+"');\" value=\""+val+"\">";

						}
						else
						{
							output+=val;							
						}
						output+="</TD>";	
						break;
					case var_prg.timer:
                        var tmp=getVarValue(type,varNum,0);
                        var done=(tmp>>8)&1;
                        var counter=(tmp>>9)&1;
                        var engaged=tmp&1;
                        var exp_time=getVarValue(type,varNum,1);
                        var curr_time=getVarValue(type,varNum,3);
                        if (counter==1)
                        {
                            var b = new ArrayBuffer(4);
                            var u = new Uint32Array(b);
                            var i = new Int32Array(b);
                            var curr_time_tmp;
                            u[0]=curr_time;
                            curr_time_tmp=i[0];
							if (exp_time>2147483647)
							{
								exp_time=0xffffffff+1-exp_time;
								exp_time*=-1;
							}
                            output+="<TD bgcolor=lightgrey>Name</TD>";
                            output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>"+"<TD>Done: "+done+"</TD>"+"<TD>Count Preset: "+exp_time+"</TD>"+"<TD >Current Count: "+curr_time_tmp+"</TD>";	
                        }
                        else
                        {
                            output+="<TD bgcolor=lightgrey>Name</TD>";
                            output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>"+"<TD>Done: "+done+"</TD>"+"<TD>Engaged: "+engaged+"</TD>"+"<TD>Expiration Time: "+exp_time+"</TD>"+"<TD >Timer tick: "+curr_time+"</TD>";	
                        }
                                
                        output+="</TR>";
                        break;
                    default:
                        // this is a UDT
                        var udt=LD_GetUDT(type1);
                        output+="<TD bgcolor=lightgrey>Name</TD>";
                        output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>";
                        if (udt.elem.length==1)
                        {
                            // only one element to be displayed -no need to show the element internal name
                            output+="<TD>Value: "+LD_getElemValString(type,varNum,0,udt)+"</TD>"; 
                        }
                        else
                        {
                            output+="<TD><table>";
                            for(i=0;i<udt.elem.length;i++)
                            {
                                output+="<tr><td>"+udt.elem[i].name+" : "+LD_getElemValString(type,varNum,i,udt)+"</td></tr>";  
                            }
                            output+="</TD></table>";
                        }
                        output+="</TR>";
                        break;
				}
				break;
		}
	}
	return output;
}

var curr_var_name;
var new_var_name;

function onVarFocusEnter(id,type,varNum,elem)
{
	var elem1=this.document.getElementById(id);
	if (elem==0)
	{
		// we only handle "name" elements
		curr_var_name=elem1.value;
	}

}

function onVarFocusExit(id,type,varNum,elem)
{
	var i,j,k;
	var elem1=this.document.getElementById(id);
	
	
	if (elem==0)
	{
		new_var_name=elem1.value;
		
		// check if the new name contains whitespace
		if (stringCompatibleWithVariables(new_var_name)==false)
		{
			alert("Variable name doesn't start with letter or contains special characters or whitespace\n Old variable name restored");
			elem1.value=curr_var_name;
			varChange(id,type,varNum,elem,0);
			return;
		}
		
		
		
		// check if any other variable has the same name
		for(i=0;i<var_db.length;i++)
		{	
			for(j=0;j<var_db[i].var_list.length;j++)
			{
				if ((var_db[i].var_list[j].name==new_var_name)&&(new_var_name.length!=0))
				{
					if (((i==type)&&(j!=varNum))||
					     (i!=type))
					{
						alert("Variable name conflict\n Old variable name restored");
						elem1.value=curr_var_name;
						varChange(id,type,varNum,elem,0);
						return;
					}
				}
			}
		}
		
		if (new_var_name==curr_var_name)
		{
			return;
		}
		
		
		
		if ((new_var_name!=curr_var_name)&&(curr_var_name.length!=0)&&(new_var_name.length!=0))
		{
			var r=confirm("Do you want to change instances of variable \""+curr_var_name+"\" to \""+new_var_name+"\" everywhere in the program ?");
			if (r==true)
			{
				varChange(id,type,varNum,elem,0);
				var reg=new RegExp("\\b"+curr_var_name+"\\b","g");
				for(i=0;i<cond_db.length;i++)
				{				
					cond_db[i].condition=cond_db[i].condition.replace(reg,new_var_name);
					for(j=0;j<cond_db[i].actions.length;j++)
					{
						if (cond_db[i].actions[j].act_type==act_types.assignment)
						{
							cond_db[i].actions[j].dst=cond_db[i].actions[j].dst.replace(reg,new_var_name);
							cond_db[i].actions[j].src=cond_db[i].actions[j].src.replace(reg,new_var_name);
						}
						if (cond_db[i].actions[j].act_type==act_types.coil)
						{
							cond_db[i].actions[j].coil=cond_db[i].actions[j].coil.replace(reg,new_var_name);
						}
						if (
						    (cond_db[i].actions[j].act_type==act_types.timer_start)||
							 (cond_db[i].actions[j].act_type==act_types.ton)||
							 (cond_db[i].actions[j].act_type==act_types.toff)
							)
						
						{
							cond_db[i].actions[j].timer=cond_db[i].actions[j].timer.replace(reg,new_var_name);
							cond_db[i].actions[j].timer_expiration_time=cond_db[i].actions[j].timer_expiration_time.replace(reg,new_var_name);
						}
						if (
						    (cond_db[i].actions[j].act_type==act_types.ctu)||
						    (cond_db[i].actions[j].act_type==act_types.ctd)
							)
						{
							cond_db[i].actions[j].counter=cond_db[i].actions[j].counter.replace(reg,new_var_name);
							cond_db[i].actions[j].preset=cond_db[i].actions[j].preset.replace(reg,new_var_name);
						}
						if (cond_db[i].actions[j].act_type==act_types.cnt_res)
						{
							cond_db[i].actions[j].counter=cond_db[i].actions[j].counter.replace(reg,new_var_name);
						}
						
						
					}
				}
				// HMI screens need to be updated as well
				for(i=0;i<screens.length;i++)
				{
					for(j=0;j<screens[i].rows.length;j++)
					{
						for(k=0;k<screens[i].rows[j][0].sect_elems.length;k++)
						{
							var obj=screens[i].rows[j][0].sect_elems[k];
							
							if ((obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.button)||(obj.type==sect_elem_type.enumeration))
							{
								screens[i].rows[j][0].sect_elems[k].Destination=screens[i].rows[j][0].sect_elems[k].Destination.replace(reg,new_var_name);
							}
							if ((obj.type==sect_elem_type.status_ruler)||(obj.type==sect_elem_type.status))
							{
								screens[i].rows[j][0].sect_elems[k].Expression=screens[i].rows[j][0].sect_elems[k].Expression.replace(reg,new_var_name);
							}
						}
					}
				}
				
				saveLocal();
				refreshProg(true);
				redrawVars(true,false);
			}
			else
			{
				elem1.value=curr_var_name;
				varChange(id,type,varNum,elem,0);
			}
		}
		else
		{
			varChange(id,type,varNum,elem,0);
		}
	}
	else
	{
		varChange(id,type,varNum,elem,0);
	}
    //return true;
}


function varChange(id,type,num,elem,sub_elem)
{
	var elem1=this.document.getElementById(id);
	
	if (contextMenuDisplayed==true)
	{
		return true;
	}

    if ((type_desc[type].elems[elem].type==field_types.enumeration)&&(type==0))
    {
        delete var_db[type].var_list[num].init_arr;
    }
	
	if (type_desc[type].elems[elem].type==field_types.var_list)
	{
		var_db[type].var_list[num].var_list[sub_elem].name=elem1.value;	
	}
	else
	{
		if (type_desc[type].elems[elem].type==field_types.str_num)
		{
			var_db[type].var_list[num][type_desc[type].elems[elem].name]=elem1.value;
		}
		else
		{
			if (isNaN(parseInt(elem1.value)))
			{
				var_db[type].var_list[num][type_desc[type].elems[elem].name]=0;
				elem1.value=0;
			}
			else
			{
				var_db[type].var_list[num][type_desc[type].elems[elem].name]=parseInt(elem1.value);
			}
		}
	}
	saveLocal();
    if (type_desc[type].elems[elem].type==field_types.enumeration)
    {
        redrawVars(true,false);
    }
}

function addVarAbove(type,num)
{
    var id,i,j,k,l;
	var elem;
	
	if (type==var_type.state_names)
	{
		// check if there is a variable that uses that state for initialization.
		for(i=0;i<var_db[var_type.prog].var_list.length;i++)
		{
			if ((var_db[var_type.prog].var_list[i].type==var_prg.state)&&
			    (var_db[var_type.prog].var_list[i].init_arr!=undefined))
			{
				var uint_arr=new Uint8Array(var_db[var_type.prog].var_list[i].init_arr);
				var dt=new DataView(uint_arr.buffer);
				var val=dt.getUint32(0,true);
				if (val>=num)
				{
					// change it to the next one.
					dt.setUint32(0,val+1,true);
					for(j=0;j<4;j++)
					{
						var_db[var_type.prog].var_list[i].init_arr[j]=uint_arr[j];
					}
				}
			}
		}
		// need to check enumerations in HMI setup screens
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
						if (obj.type==sect_elem_type.enumeration)
						{
							if (obj.StartValue>=num)
							{
								obj.StartValue++;
							}
							if (obj.EndValue>=num)
							{
								obj.StartValue++;
							}
						}
					}
				}
			}
		}
	}
	
	var_db[type].var_list.splice(num,0,clone(var_templates[type]));
	saveLocal();
	redrawVars(true,false);

}

function returnToCode(type)
{
    if (type==1)
    {
        saveLocal();
    }
    else
    {
        if (curr_var_init_before==false)
        {
            delete(var_db[0].var_list[curr_init_var].init_arr);
        }
    }
	adjustMenuScreen(1);
	var_display=false;
	refreshProg(true);
	redrawVars(true,false);
    renderMenu("<I>Edit Code</I>");
}

function applyInit(num)
{
    //eval(prog_var_init_funcs[var_db[0].var_list[num].type]);
    applyInitCustom(num);
    returnToCode(1);
    
}

var curr_init_var=-1;
var curr_var_init_before=false;

function runApplyInit()
{
    applyInit(curr_init_var);
}

var DBG_savedScrollTop=-1;

function modifyVars()
{
	debug_var_submit_mode=true;
	DBG_savedScrollTop=var_div.scrollTop;
	submit_var_list=[];
	redrawVars(false,true);
}

function finishVarModif()
{
	debug_var_submit_mode=false;
	CodeDebugView();	
	addAjaxAction(sendSubmitList);
}

function initVar(num)
{
    var vars_div=document.getElementById("vars");
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";
    renderMenu("init_scr");
    curr_init_var=num;
    if (var_db[0].var_list[num].init_arr==undefined)
    {
        curr_var_init_before=false;
    }
    else
    {
        curr_var_init_before=true;
    }
    prog_div.innerHTML="";
    prog_div.innerHTML+="<div style=\"height:20%;width:100%;overflow-y:scroll;\"><br><br><br><h2>"+var_db[0].var_list[num].name+"</h2><br><button onclick=\"applyInit("+num+");\">Apply</button><button onclick=\"returnToCode(0);\">Cancel</button><br><br><br></div><div id=\"custom_render\" style=\"width: 100%; height:80%; overflow-y:scroll;\" ></div>";
    
    //prog_div.innerHTML+="<div style=\"position: fixed; bottom: 0; width: 100%;\"></div>";

    // Make a global eval call.
    //http://stackoverflow.com/questions/7922073/why-write-window-eval-call-window-data
    window[ "eval" ].call( window, prog_var_init_funcs[var_db[0].var_list[num].type])
    renderInitCustom(num,"custom_render");
    
    var cust_init_div=document.getElementById("custom_render");
    cust_init_div.innerHTML+="<br><br><br><button onclick=\"applyInit("+num+");\">Apply</button><button onclick=\"returnToCode(0);\">Cancel</button><br><br><br>";
    
}


function delVar(type,num)
{
	var id,i,j,k,l;
	var elem;
	
	if (type==var_type.state_names)
	{
		// check if there are any variables which are initialized to that state....
		// check if there is a variable that uses that state for initialization.
		for(i=0;i<var_db[var_type.prog].var_list.length;i++)
		{
			if ((var_db[var_type.prog].var_list[i].type==var_prg.state)&&
			    (var_db[var_type.prog].var_list[i].init_arr!=undefined))
			{
				var uint_arr=new Uint8Array(var_db[var_type.prog].var_list[i].init_arr);
				var dt=new DataView(uint_arr.buffer);
				var val=dt.getUint32(0,true);
				if (val==num)
				{
					alert("Variable \""+var_db[var_type.prog].var_list[i].name+"\" is initialized to this state"+
					      "\nPlease change the initialization prior to deleting this state.");
					return;	  
				}
			}
		}
		// need to check enumerations in HMI setup screens
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
						if (obj.type==sect_elem_type.enumeration)
						{
							if ((obj.StartValue==num)||(obj.EndValue==num))
							{
								alert("HMI screen: \""+screens[i].name +"\"\n"+
													  "Section: \""+screens[i].rows[j][k].name+"\"\n"+
													  "Element: \""+screens[i].rows[j][k].sect_elems[l].Name+"\" \nUses this state"+
													  "\nPlease change the initialization prior to deleting this state.");
					            return;	  
							}
						}
					}
				}
			}
		}
		
		
		
		
		
		// check if there is a variable that uses that state for initialization.
		for(i=0;i<var_db[var_type.prog].var_list.length;i++)
		{
			if ((var_db[var_type.prog].var_list[i].type==var_prg.state)&&
			    (var_db[var_type.prog].var_list[i].init_arr!=undefined))
			{
				var uint_arr=new Uint8Array(var_db[var_type.prog].var_list[i].init_arr);
				var dt=new DataView(uint_arr.buffer);
				var val=dt.getUint32(0,true);
				if (val>num)
				{
					// change it to the next one.
					dt.setUint32(0,val-1,true);
					for(j=0;j<4;j++)
					{
						var_db[var_type.prog].var_list[i].init_arr[j]=uint_arr[j];
					}
				}
			}
		}
		// need to check enumerations in HMI setup screens
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
						if (obj.type==sect_elem_type.enumeration)
						{
							if (obj.StartValue>num)
							{
								obj.StartValue--;
							}
							if (obj.EndValue>num)
							{
								obj.StartValue--;
							}
						}
					}
				}
			}
		}
	}
	
	
	var_db[type].var_list.splice(num,1);
	saveLocal();
	redrawVars(true,false);

    if ((type==0)&&((num-1)<2))
    {
        return;
    }
	
	// add focus
	if ((num-1)>0)
	{
		id=type_desc[type].elems[0].elem_name_prefix+"_"+(num-1);
		elem=this.document.getElementById(id);	
		elem.focus();
	}
}



var_display=false;



function redrawVars(rw,debug_rw)
{
	var i,j;
	var outp,tbl;

	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	
	
	var_div.innerHTML="";
	
	
	for(i=0;i<var_db.length;i++)
	{
		if (var_db_names[i]=="")
		{
			continue;
		}
		
		if ((i!=0)&&(rw==false))
		{
			continue;
		}

		
		var_div.innerHTML+="<H2>"+var_db_names[i]+"</h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
		if	(rw==true)
		{		
			if (var_db[i].var_list.length!=0)
			{
				tbl+="<TR>";
				// render field names
				for(j=0;j<type_desc[i].elems.length;j++)
				{
					if (type_desc[i].elems[j].type==field_types.var_list)
					{
					}
					else
					{
						tbl+="<TD bgcolor=lightgrey>";
						tbl+=type_desc[i].elems[j].field_name;
						tbl+="</TD>";
					}
				}
				// add actions field	
				tbl+="<TD bgcolor=lightgrey>";
				tbl+="Actions";
				tbl+="</TD>";
				tbl+="<TR>";
			}
			
		}
		
		for(j=0;j<var_db[i].var_list.length;j++)
		{
			outp="";
			outp=renderVar(i,j,outp,rw,debug_rw);
			tbl+=outp;
		}
		tbl+="</table>";
		if (rw==true)
		{
			if (var_db[i].type==var_type.state)
			{
				var_div.innerHTML+=tbl+"<button type=\"button\" onclick=\"addVar("+i+");\">Add State</button>";
			}
			else
			{
				var_div.innerHTML+=tbl+"<button type=\"button\" onclick=\"addVar("+i+");\">Add Variable</button>";
			}
		}
		else
		{
			var_div.innerHTML+=tbl;
		}
	}
	
	if ((rw==false)&&(ajax_vars_loaded==true))
	{
		// add IO and PLC variable data
		// first PLC variables
		var_div.innerHTML+="<H2> PLC Variables </h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
		var plc_dt_inp=new DataView(plc_io_db[plc_sects.input].buffer);
		var plc_dt_outp=new DataView(plc_io_db[plc_sects.output].buffer);
		for(i=0;i<var_db[var_type.plc].var_list.length;i++)
		{
			tbl+="<TR>";
			tbl+="<TD bgcolor=#E6E6E6>"+var_db[var_type.plc].var_list[i].name+"</TD>";
			var dt;
			switch(var_db[var_type.plc].var_list[i].section)
			{
				case 0:
					dt=plc_dt_inp;
					break;
				case 1:
					dt=plc_dt_outp;
					break;
			}
			var val;
			if (var_db[var_type.plc].var_list[i].size==0)
			{
				// whole word
				val=dt.getUint16((parseInt(var_db[var_type.plc].var_list[i].word_index))*2,true);
			}
			else
			{
				val=dt.getUint16((parseInt(var_db[var_type.plc].var_list[i].word_index))*2,true);
				val=(val>>parseInt(var_db[var_type.plc].var_list[i].bit_offset))&1;
			}
			if ((sim_mode==true)&&(debug_rw==true)&&(var_db[var_type.plc].var_list[i].section==0))
			{
				tbl+="<TD><input type=\"text\" style=\"width:4em;\" onblur=\"DBG_HandleIntVarChange(this,'"+var_db[var_type.plc].var_list[i].name+"');\" value=\""+val+"\"></TD>";
			}
			else
			{
				tbl+="<TD>"+val+"</TD>";	
			}
			tbl+="</TR>";
		}
		tbl+="</table>";
		var_div.innerHTML+=tbl;
		// handle IO sections
		var_div.innerHTML+="<H2> Local IO </h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
		for(i=0;i<local_io_db.length;i++)
		{
			var ind=findIndex(IO[i]);
			for(j=0;j<slices[ind].sections.length;j++)
			{
				tbl+="<tr><TD colspan=\"2\" bgcolor=lightgrey><b> Slot "+i+":"+slices[ind].name+" "+sect_names[slices[ind].sections[j].type]+"</b> </TD></tr>";
				var dt=new DataView(local_io_db[i][slices[ind].sections[j].type].buffer);
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					tbl+="<TR>";
					tbl+="<TD bgcolor=#E6E6E6>"+slices[ind].sections[j].objects[k].name+"</TD>";
					if (i==0)
					{
						var val=GetGWArrValue(dt,slices[ind].sections[j].objects[k].offset,slices[ind].sections[j].objects[k].length);
					}
					else
					{
						var val=GetArrValue(dt,slices[ind].sections[j].objects[k].offset,slices[ind].sections[j].objects[k].length);
					}
					if ((sim_mode==true)&&(debug_rw==true)&&((slices[ind].sections[j].type==sect_type.input)||(slices[ind].sections[j].type==sect_type.diag)))
					{
						var var_name="IO.Slot"+i+"."+sect_names[slices[ind].sections[j].type]+"."+convertString(slices[ind].sections[j].objects[k].name);
						tbl+="<TD ><input type=\"text\" style=\"width:2em;\" onblur=\"DBG_HandleIntVarChange(this,'"+var_name+"');\" value=\""+val+"\"></TD>";
					}
					else
					{
						tbl+="<TD >"+val+"</TD>";	
					}
					tbl+="</TR>";
				}
			}
		}
		tbl+="</table>";
		var_div.innerHTML+=tbl;
	}
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Editor/Debugger - Variable editing/rendering/cut/paste functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function findIndex(str)
{
	var i;
	for(i=0;i<slices.length;i++)
	{
		if (slices[i].name==str)
		{
			return i;
		}
	}
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor/Debugger - Condition/Action editing/rendering/cut/paste functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



var basic_operations_menu=
[
	{group:"Arithmetic",ops:["+","-","*","/","%","abs( )","min( )","max( )"]},
	{group:"Brackets",ops:["( )"]},
	{group:"Compare",ops:[">",">=","<","<=","=","<>","F_COS"]},
	{group:"Logic",ops:["&","|","!"]}
];

var advances_operations_menu=
[
	{group:"Timer/Counter",ops:["expired( )","count( )"]},
];
	



var cond_db=new Array();


var act_types=
{
	assignment:0,
	timer_start:1,
	coil:2,
	ton:3,
	toff:4,
	send_m2m:5,
	comment:7,
	ctu:8,
	ctd:9,
	cnt_res:10,
    call:11,    
};
	
	


var act_desc=
[
	{name:"Assignment",
	 color:"Aqua",
	 template:{dst:"",src:""},
	 field_list:
	 [
		{name:"dst",field_size:10,type:field_types.str_num,display_name:"Destination"},
		{name:"src",field_size:10,type:field_types.str_num,display_name:"Expression"}
	 ]
	},
	{name:"Timer start",
	 color: "Aquamarine ",
	 template:{timer:"",timer_expiration_time:"1000"},
	 field_list:
	 [
		{name:"timer",field_size:10,type:field_types.str_num,display_name:"Timer"},
		{name:"timer_expiration_time",field_size:10,type:field_types.str_num,display_name:"Expires (ms)"}
	 ]
	},
	{name:"Coil",
	 color: "Gold ",
	 template:{coil:""},
	 field_list:
	 [
		{name:"coil",field_size:10,type:field_types.str_num,display_name:"Coil"}
	 ]
	},
	{name:"Timer On",
	 color: "DarkTurquoise ",
	 template:{timer:"",timer_expiration_time:"1000"},
	 field_list:
	 [
		{name:"timer",field_size:10,type:field_types.str_num,display_name:"Timer"},
		{name:"timer_expiration_time",field_size:10,type:field_types.str_num,display_name:"Expires (ms)"}
	 ]
	},
	{name:"Timer Off",
	 color: "DarkSeaGreen ",
	 template:{timer:"",timer_expiration_time:"1000"},
	 field_list:
	 [
		{name:"timer",field_size:10,type:field_types.str_num,display_name:"Timer"},
		{name:"timer_expiration_time",field_size:10,type:field_types.str_num,display_name:"Expires (ms)"}
	 ]
	},
	{name:"",
	 color: "#F2F2F2",
	 template:{Message_ID:""},
	 field_list:
	 [
		{name:"Message_ID",field_size:3,type:field_types.str_num,display_name:"Message ID"}
	 ]
	},
	{name:"",
	 color: "#F2F2F2",
	 template:{Message:""},
	 field_list:
	 [
		{name:"Message",field_size:30,type:field_types.str_num,display_name:"Message"}
	 ]
	},
	{name:"Comment",
	 color: "#F2F2F2",
	 template:{Comment:""},
	 field_list:
	 [
		{name:"Comment",field_size:30,type:field_types.str_text_area,display_name:"Comment"}
	 ]
	},
	{name:"Count Up",
	 color: "LimeGreen  ",
	 template:{counter:"",preset:"1000"},
	 field_list:
	 [
		{name:"counter",field_size:10,type:field_types.str_num,display_name:"Counter"},
		{name:"preset",field_size:10,type:field_types.str_num,display_name:"Preset"}
	 ]
	},
	{name:"Count Down",
	 color: "Lime  ",
	 template:{counter:"",preset:"1000"},
	 field_list:
	 [
		{name:"counter",field_size:10,type:field_types.str_num,display_name:"Counter"},
		{name:"preset",field_size:10,type:field_types.str_num,display_name:"Preset"}
	 ]
	},
	
	{name:"Reset Counter",
	 color: "LightSeaGreen  ",
	 template:{counter:""},
	 field_list:
	 [
		{name:"counter",field_size:10,type:field_types.str_num,display_name:"Counter"},
	 ]
	},
/*	
    */
];			


function addCond()
{
	cond_db[cond_db.length]={condition:"",actions:new Array()};
	saveLocal();
	refreshProg(true);
}

var condClipboard=null;
//var labelClipboard=null;
var actionClipboard=null;

function condCopy(cond_num)
{
	condClipboard=cond_db[cond_num];
}


function condCut(cond_num)
{
	condClipboard=cond_db[cond_num];
	delCond(cond_num);
}

function condPasteAbove(cond_num)
{
	var tmp;
	if (condClipboard==null)
	{
		return;
	}
	if (cond_num==0)
	{
		cond_db.splice(0,0,clone(condClipboard));
	
	}
	else
	{
		cond_db.splice(cond_num,0,clone(condClipboard));
	}
	//condClipboard=null;
	
	saveLocal();
	refreshProg(true);
}


function condPasteBelow(cond_num)
{
	var tmp;
	if (condClipboard==null)
	{
		return;
	}
	
	len=cond_db.length;
	if (cond_num==(cond_db.length-1))
	{
		cond_db.splice(len,0,clone(condClipboard));
	}
	else
	{
		cond_db.splice(cond_num+1,0,clone(condClipboard));
	}
	
	
	//condClipboard=null;
	
	saveLocal();
	refreshProg(true);
}



function condAddAbove(cond_num)
{
	var tmp;
	if (cond_num==0)
	{
		cond_db.splice(0,0,{condition:"",actions:new Array()});
	}
	else
	{
		cond_db.splice(cond_num,0,{condition:"",actions:new Array()});
	}
	
	saveLocal();
	refreshProg(true);
}

function condAddBelow(cond_num)
{
	var tmp;
	var len;
	len=cond_db.length;
	if (cond_num==(cond_db.length-1))
	{
		cond_db.splice(len,0,{condition:"",actions:new Array()});
	}
	else
	{
		cond_db.splice(cond_num+1,0,{condition:"",actions:new Array()});
	}
	
	saveLocal();
	refreshProg(true);
}




function delCond(con_num)
{
	cond_db.splice(con_num,1);
	saveLocal();
	refreshProg(true);
}


function actionCut(cond_num,act_num)
{
	actionClipboard=cond_db[cond_num].actions[act_num];
	delAction(cond_num,act_num);
}

function actionCopy(cond_num,act_num)
{
	actionClipboard=cond_db[cond_num].actions[act_num];
}


function actionPasteAbove(cond_num,act_num)
{
	if (actionClipboard==null)
	{
		return;
	}
	cond_db[cond_num].actions.splice(act_num,0,clone(actionClipboard));
	saveLocal();
	refreshProg(true);
}

function actionPasteBelow(cond_num,act_num)
{
	if (actionClipboard==null)
	{
		return;
	}

	cond_db[cond_num].actions.splice(act_num+1,0,clone(actionClipboard));
	saveLocal();
	refreshProg(true);
}


function delAction(cond_num,act_num)
{
	cond_db[cond_num].actions.splice(act_num,1);
	
	saveLocal();
	refreshProg(true);
}

function addAction(cond_num,actTypeId)
{
	var elem=this.document.getElementById(actTypeId);
	var tmp=parseInt(elem.value);
	var ind=cond_db[cond_num].actions.length;
	
	cond_db[cond_num].actions[ind]=clone(act_desc[tmp].template);
	cond_db[cond_num].actions[ind].act_type=tmp;
	saveLocal();
	refreshProg(true);
}




function addLabelAbove(cond_num)
{
	cond_db[cond_num].label="";
	refreshProg(true);
}

function delLabel(cond_num)
{
	var i;
	if (cond_db[cond_num].label!=undefined)
	{
		delete cond_db[cond_num].label;
		saveLocal();
        refreshProg(true);
    }
}

function changeLabel(id,cond_num)
{
	var i;
	var pos;
	var elem=this.document.getElementById(id);
	cond_db[cond_num].label=elem.value;
	saveLocal();
}



function changeCondElem(id,cond_num)
{
	var elem=this.document.getElementById(id);
	if (cond_db[cond_num].condition!=elem.value)
	{
		cond_db[cond_num].condition=elem.value;
		saveLocal();
	}
}

function changeActionElem(id,cond_num,act_num,act_field)
{
	var elem=this.document.getElementById(id);
	var act_type=cond_db[cond_num].actions[act_num].act_type;
	if ((act_desc[act_type].field_list[act_field].type==field_types.str_num)||(act_desc[act_type].field_list[act_field].type==field_types.str_text_area))
	{
		if (cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]!=elem.value)
		{
			cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=elem.value;		
			saveLocal();
		}
	}
	else
	{
		if (cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]!=parseInt(elem.value))
		{
			cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=parseInt(elem.value);
			saveLocal();
		}
	}
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Editor/Debugger - Variable editing/rendering/cut/paste functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor/HMI - Keyboard Shortcuts (Ctrl-q/s/f/i) pop-up menu functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var actElem;
var actElemPos;
var actElemType;
var actSel;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Taken from  http://www.hunlock.com/blogs/Snippets:_Howto_Grey-Out_The_Screen
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function grayOut(doc, vis, options) {
  // Pass true to gray out screen, false to ungray
  // options are optional.  This is a JSON object with the following (optional) properties
  // opacity:0-100         // Lower number = less grayout higher = more of a blackout 
  // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
  // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
  // grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
  // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
  // in any order.  Pass only the properties you need to set.
  var options = options || {}; 
  var zindex = options.zindex || 50;
  var opacity = options.opacity || 70;
  var opaque = (opacity / 100);
  var bgcolor = options.bgcolor || '#000000';
  var dark=doc.getElementById('darkenScreenObject');
  if (!dark) {
    // The dark layer doesn't exist, it's never been created.  So we'll
    // create it here and apply some basic styles.
    // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
    var tbody = doc.getElementsByTagName("body")[0];
    var tnode = doc.createElement('div');           // Create the layer.
        tnode.style.position='fixed';                 // Position absolutely
        tnode.style.top='0px';                           // In the top
        tnode.style.left='0px';                          // Left corner of the page
        tnode.style.overflow='hidden';                   // Try to avoid making scroll bars            
        tnode.style.display='none';                      // Start out Hidden
        tnode.id='darkenScreenObject';                   // Name it so we can find it later
    tbody.appendChild(tnode);                            // Add it to the web page
    dark=doc.getElementById('darkenScreenObject');  // Get the object.
  }
  if (vis) {
    // Calculate the page width and height 
/*    if( doc.body && ( doc.body.scrollWidth || doc.body.scrollHeight ) ) {
        var pageWidth = doc.body.scrollWidth+'px';
        var pageHeight = doc.body.scrollHeight+'px';
    } else if( doc.body.offsetWidth ) {
      var pageWidth = doc.body.offsetWidth+'px';
      var pageHeight = doc.body.offsetHeight+'px';
    } else {
	 */
       var pageWidth='100%';
       var pageHeight='100%';
    //}   
    //set the shader to cover the entire page and make it visible.
    dark.style.opacity=opaque;                      
    dark.style.MozOpacity=opaque;                   
    dark.style.filter='alpha(opacity='+opacity+')'; 
    dark.style.zIndex=zindex;        
    dark.style.backgroundColor=bgcolor;  
    dark.style.width= pageWidth;
    dark.style.height= pageHeight;
    dark.style.display='block';				 
  } else {
     dark.style.display='none';
  }
}

function ContextMenuOnKeyDown(e)
{
	var jk=e;
	var n = (window.Event) ? e.which : e.keyCode;
	if (n==13) // enter
	{
		jk=actSel;
		changeContextMenu();
		hideContextMenu();
		return false;
	}
	if (n==27) // esc
	{
		hideContextMenu();
		return false;
	}
}

var contextMenuDisplayed=false;


function findActArgNum(str,pos)
{
    var i;
    var substr_count=0;
    var arg_count=0;
    var bracket_count=0;
    for(i=0;i<pos;i++)
    {
        if ((substr_count==0)&&(str.charAt(i)=="'"))
        {
            substr_count++;
        }
        if ((substr_count==1)&&(str.charAt(i)=="'"))
        {
            substr_count--;
        }
        if (str.charAt(i)=="(")
        {
            bracket_count++;
        }
        if (str.charAt(i)==")")
        {
            bracket_count--;
        }
        if ((substr_count==0)&&(bracket_count==1)&&(str.charAt(i)==","))
        {
            arg_count++;
        }
    }
    if (bracket_count>0)
    {
        return arg_count;
    }
    return -1;
}


function showContextMenu(event,elem_type)
{
	var p,i;
	var body;
	var sel_var_list;
	
	
	if ((event==2)&&(	elem_type==expr_types.hmi_var))
	{
		return;	
	}
	
	grayOut(window.document,true);
	contextMenuDisplayed=true;
	
	actElem=this.document.activeElement;
	actElemPos=this.document.activeElement.selectionStart;
	actElemType=elem_type;


	
	
	
	//var x = (window.innerWidth / 2) - (cont_menu_div.offsetWidth / 2);
   //var y = (window.offsetHeight / 2) - (cont_menu_div.offsetHeight / 2);        
	
	
	//cont_menu_div.style.left=mouseX+window.document.body.scrollLeft;
	//cont_menu_div.style.top=mouseY+window.document.body.scrollTop;
   //cont_menu_div.style.left=x+window.document.body.scrollLeft;
	//cont_menu_div.style.top=y+window.document.body.scrollTop;


	
	
	body=window.document.getElementsByTagName('body');
	//body[0].bgColor="grey";
	
	// render select box based on the form element
	
	cont_menu_div.style.zIndex=100;

	cont_menu_div.style.display="block";
   cont_menu_div.style.position="fixed";
	sel_var_list="";
    var found=false;

    if (event==3)
    {
        if (elem_type==expr_types.act)
        {
            var act=extractNumbersFromID(actElem.id);
            var act_elem=cond_db[act[0]].actions[act[1]];
            if (act_elem.act_type==act_types.call)
            {
                
                var arg_count=findActArgNum(act_elem.procedure,actElemPos);
                var proc_name=act_elem.procedure.split("(");
                var func_name=proc_name[0].replace(/ /g, '');
                var func_ent=LD_FindFuncEntry(func_name);
                if ((func_ent!=null)&&(arg_count<func_ent.args.length))
                {
                    if ((arg_count>0)&&(func_ent.args[arg_count].num_const_enums>0))
                    {
                        found=true;
                        for(i=0;i<func_ent.args[arg_count].num_const_enums;i++)
                        {
                            sel_var_list+="<option value=\'"+func_ent.args[arg_count].const_enum[i].str+"\'>&nbsp "+func_ent.args[arg_count].const_enum[i].str
                            +"</option>";
                        }
                    }
                }
            }
        }
        
        if (found==false)
        {
			sel_var_list= "<optgroup label=\"State Names\">";
            for(i=0;i<var_db[2].var_list.length;i++)
            {
                sel_var_list+="<option value=\'"+var_db[2].var_list[i].name+"\'>&nbsp "+
                             var_db[2].var_list[i].name+"</option>";
            }
        }
        found=true;

        
    }
    



    if (found==true)
    {    
    }
	else if (event==0)  // prog vars
	{
		if ((elem_type==expr_types.cond)||(elem_type==expr_types.act))
		{	
			sel_var_list=genVarDest("@",(1<<var_type.prog)|(1<<var_type.plc)|(1<<var_type.timer));
		}
		if ((	elem_type==expr_types.hmi_var)||(elem_type==expr_types.hmi_expr))
		{
			sel_var_list=genVarDest("@",(1<<var_type.prog));
		}
	}
	else if (event==1)  // IO vars
	{
		if ((elem_type==expr_types.cond)||(elem_type==expr_types.act))
		{	
			sel_var_list=genVarDest("@",(1<<var_type.io));
		}
	}

	else  // functions
	{
		// basic functions
		sel_var_list= "<option disabled value=\"\"></option>"+
		               "<optgroup label=\"Math\">"+
								"<option value=\"+\">+</option>"+
								"<option value=\"-\">-</option>"+								
								"<option value=\"*\">*</option>"+
								"<option value=\"/\">/</option>"+
								"<option value=\"%\">% - Modulo</option>"+
								"<option value=\"abs()\">abs()</option>"+
								"<option value=\"min(,)\">min(,)</option>"+
								"<option value=\"max(,)\">max(,)</option>"+
                     "</optgroup>"+
							"<optgroup label=\"Brackets\">"+
								"<option value=\"()\">()</option>"+
							"</optgroup>"+
							"<optgroup label=\"Boolean Logic\">"+
								"<option value=\"&\">&     Boolean AND</option>"+
								"<option value=\"|\">|     Boolean OR</option>"+
								"<option value=\"!\">!     Boolean NOT</option>"+
							"</optgroup>"+
							"<optgroup label=\"Compare\">"+
								"<option value=\">\">></option>"+
								"<option value=\">=\">>=</option>"+
								"<option value=\"<\"><</option>"+
								"<option value=\"<=\"><=</option>"+
								"<option value=\"=\">=    Equal</option>"+								
								"<option value=\"<>\"><>    Not Equal </option>";
		if ((elem_type==expr_types.cond)||(elem_type==expr_types.act))
		{
                    
            var sub_group=0;
            var sub_lists=0;
            
			sel_var_list+="<option value=\"F_COS(,)\">F_COS(,)  Change of State&nbsp&nbsp</option>"+
							"</optgroup>"+
							"<optgroup label=\"Timer/Counter\">"+
								"<option value=\"count()\">count()</option>"+
								"<option value=\"expired()\">expired()</option>";
                            "</optgroup>"
             
            for(sub_group=0;sub_group<2;sub_group++)
            {
                var sub_list="";
                
                for(i=0;i<LD_GetFunctionCount();i++)
                {
                    var ent=LD_GetFuncEntry(i);
                    if (((ent.type==1)&&(sub_group==1))||
                       (((ent.type==0)||(ent.type==2))&&(sub_group==0)))
                    {
                        var j;
                        var comma_str="";
                        for(j=0;j<(ent.args.length-1);j++)
                        {
                            comma_str+=",";
                        }
                        sub_list+="<option value=\""+ent.name+"("+comma_str+")\">"+LD_GetFunctionHelpString(ent.name)+"</option>";
                    }
		        }
                if (sub_list.length!=0)
                {
                    if (sub_group==0)
                    {
                        sel_var_list+="<optgroup label=\"Library Procedures\">"+sub_list+"</optgroup>";
                    }
                    else
                    {
                        sel_var_list+="<optgroup label=\"Library Functions\">"+sub_list+"</optgroup>";
                    }
                }
            }
            sel_var_list+="<optgroup>";
		}
		sel_var_list+="</optgroup>";
	}
	
	
	
	cont_menu_div.innerHTML="<select size=\"20\"  id=\"cont_menu_sel1\" onclick=\"changeContextMenu()\" onblur=\"hideContextMenu();\" >"+sel_var_list+"</select>";
	
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	p=window.document.getElementById('cont_menu_sel1');
	//console.log(actElem);
	//console.log(actElemPos);
	//p.focus();


	var top_space=(h-cont_menu_div.clientHeight)/2;
	var prop=(top_space/h)*100;
	cont_menu_div.style.top=prop+"%";
	
	actSel=p;
	
	p.onkeydown=ContextMenuOnKeyDown;
	p.focus();
	//p.style.display='block';
	//p.style.height='auto';
	//p.style.position="absolute";
	//p.style.bottom=0; 
	//p.size = 10;
	//p.show();

	
	
//	var y = ((body[0].clientHeight  - cont_menu_div.clientHeight) / 2)+window.document.body.scrollTop+"px";
//	var x = ((body[0].clientWidth - cont_menu_div.clientWidth) / 2)+window.document.body.scrollLeft+"px";
	
	
	//var y = ((body[0].clientHeight  - cont_menu_div.clientHeight) / 2)+"px";
	//var x = ((body[0].clientWidth - cont_menu_div.clientWidth) / 2)+"px";
	
	
	//cont_menu_div.style.left="50%";
	//cont_menu_div.style.top="50%";
   //cont_menu_div.style.left=x;
	//cont_menu_div.style.top=y;

}

function hideContextMenu()
{
	cont_menu_div.style.display="none";
	grayOut(window.document,false);
	contextMenuDisplayed=false;
	actElem.focus();
}


function changeContextMenu()
{
	var p;
	var val;
	p=window.document.getElementById('cont_menu_sel1');
	val=p.options[p.selectedIndex].value;
	p.selectedIndex=0;
	hideContextMenu();
	
	insert_val_prog_scr1(val,actElem,actElemPos,actElemType);
	actElem.focus();
	
	
}


function actOnKeyDown(event,event_type)
{
	var n = (window.Event) ? event.which : event.keyCode;
	if ((event.ctrlKey==true)&&(n==81)) // ctrl-Q
	{	
		showContextMenu(0,event_type);
		return false;
	}
	if ((event.ctrlKey==true)&&(n==73)) // ctrl - I
	{
		showContextMenu(1,event_type);
		return false;
	}
	if ((event.ctrlKey==true)&&(n==70)) // ctrl - f
	{
		showContextMenu(2,event_type);
		return false;
	}
    if ((event.ctrlKey==true)&&(n==83)) // ctrl - s
	{
		showContextMenu(3,event_type);
		return false;
	}
	
	return true;
}

// Find first ancestor of el with tagName
// or undefined if not found
function upTo(el, match_parent_id) {

  var t = el.parentNode;
  match_parent_id = match_parent_id.toLowerCase();

  while (t) 
  {

    if (t.id && t.id.toLowerCase() == match_parent_id) {
      return t;
    }
	 t=t.parentNode;
  }

  // Many DOM methods return null if they don't 
  // find the element they are searching for
  // It would be OK to omit the following and just
  // return undefined
  return null;
}

function mouseDownHandler(event)
{
	var ev=event;
	//var now = (new Date()).getTime();
	var act_menu=window.document.getElementById("act_menu");
	//addToLog("at "+now+" mouseDownHandler "+ev.target.id+" "+act_menu.style.display);
	//addToLog("at "+now+" mouseDownHandler1 "+ev.target.id+" "+upTo(ev.target,"act_menu"));
	
	if (act_menu.style.display=="none")
	{
		return true;
	}
	
	if (upTo(ev.target,"act_menu")!=null)
	{
		//
		return true;
	}
	
	
	if (ev.target.id!="act_menu")
	{
		//addToLog("at "+now+" mouseDownHandler2 ");
		hideCondMenu();
		return false;
	}	
	return true;
}

function genVarDest(selected, var_types_bitmask)
{
	var i,j,k,ind;
	var list="";
	for(i=0;i<var_db.length;i++)
	{
		if ((var_types_bitmask&(1<<i))!=0)
		{
			// PLC connected is not part of this list since it is for destination variables only (maybe also for transfer variables)
			if (i==0)
			{
				// add fixed variables
				list+="<optgroup label=\" Status Variables \"></optgroup>";
				list+="<option value=\'"+"PLC_connected"+"\'>&nbsp PLC_connected</option>";
				list+="<option value=\'"+"PROG_cycle_time"+"\'>&nbsp PROG_cycle_time</option>";
			}
			if (var_db[i].var_list.length>0)
			{
				list+="<optgroup label=\" "+var_db_names[i]+"\"></optgroup>";
			}
			
			for(j=0;j<var_db[i].var_list.length;j++)
			{
				/*if (selected==var_db[i].var_list[j].name)
				{
					list+="<option value=\'"+var_db[i].var_list[j].name+"\' selected>&nbsp "+var_db[i].var_list[j].name
					+"</option>";
				}
				else*/
				{
					list+="<option value=\'"+var_db[i].var_list[j].name+"\'>&nbsp "+var_db[i].var_list[j].name
					+"</option>";
                    if (LD_IsUDTType(var_db[i].var_list[j].type))
                    {
                        var udt=LD_GetUDT(var_db[i].var_list[j].type);
                        if (udt.elem.length>1)
                        {
                            for(k=0;k<udt.elem.length;k++)
                            {
                                list+="<option value=\'"+var_db[i].var_list[j].name+"."+udt.elem[k].name+"\'>&nbsp "+var_db[i].var_list[j].name+"."+udt.elem[k].name
                                +"</option>";
                            }
                        }
                            
                    }
                    
				}
			}
		}
	}
	if ((var_types_bitmask&(1<<var_type.io))!=0)
	{
		list+="<optgroup label=\"IO\"></optgroup>";
		for(i=0;i<IO.length;i++)
		{
			list+="<optgroup label=\"&nbsp Slot"+i+" ("+IO[i]+")\"></optgroup>";
			ind=findIndex(IO[i]);
			for(j=0;j<slices[ind].sections.length;j++)
			{
				list+="<optgroup label=\"&nbsp&nbsp "+sect_names[slices[ind].sections[j].type]+"\"></optgroup>";
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					list+="<option value=\'IO.Slot"+i+"."+sect_names[slices[ind].sections[j].type]+"."+convertString(slices[ind].sections[j].objects[k].name)+"\'>&nbsp&nbsp&nbsp "+slices[ind].sections[j].objects[k].name+"</option>";
				}
			}
		}
	}
	return list;
}



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Editor/HMI - Keyboard Shortcuts (Ctrl-q/s/f/i) pop-up menu functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor - Condition/Action menu functions (when clicking on the number next to condition or action functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// from http://stackoverflow.com/questions/442404/dynamically-retrieve-the-position-x-y-of-an-html-element
/*function findPos(obj) {
 var obj2 = obj;
 var curtop = 0;
 var curleft = 0;
 if (document.getElementById || document.all) {
  do  {
   curleft += obj.offsetLeft-obj.scrollLeft;
   curtop += obj.offsetTop-obj.scrollTop;
   obj = obj.offsetParent;
   obj2 = obj2.parentNode;
   while (obj2!=obj) {
    curleft -= obj2.scrollLeft;
    curtop -= obj2.scrollTop;
    obj2 = obj2.parentNode;
   }
  } while (obj.offsetParent)
 } else if (document.layers) {
  curtop += obj.y;
  curleft += obj.x;
 }
 return [curtop, curleft];
}   // end of findPos()
*/

// from http://vishalsays.wordpress.com/2007/12/21/finding-elements-top-and-left-using-javascript/
/*function findPos(elm)
{
	var x, y = 0;

	//set x to elm’s offsetLeft
	x = elm.offsetLeft;


	//set y to elm’s offsetTop
	y = elm.offsetTop;

	

	//set elm to its offsetParent
	elm = elm.offsetParent;


	//use while loop to check if elm is null
	// if not then add current elm’s offsetLeft to x
	//offsetTop to y and set elm to its offsetParent

	while(elm != null)
	{

	x = parseInt(x) + parseInt(elm.offsetLeft);
	y = parseInt(y) + parseInt(elm.offsetTop);
	y+=elm.scrollTop;
	elm = elm.offsetParent;
	}

	
	//here is interesting thing
	//it return Object with two properties
	//Top and Left

	return [y,x];
}*/

//http://www.kirupa.com/html5/get_element_position_using_javascript.htm
function findPos(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return [yPosition-20,xPosition];
}



function testMenuButton(id)
{
	var test=2;
	hideCondMenu();
}


var floatMenuType=
{
	action:0,
	condition:1,
	hmi_screen_list:2,
	hmi_section:3,
	hmi_sect_elem:4
};

function showCondMenu(id,type,var1,var2)
{
	var elem=id;
	var tmp21=findPos(elem);
	var tmp=23;
	var tbl="<table align=\"center\">"
	
	
	
	if (type==floatMenuType.condition)
	{
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condAddBelow("+var1+");hideCondMenu();\">Add Condition Below</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condAddAbove("+var1+");hideCondMenu();\">Add Condition Above</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"addLabelAbove("+var1+");hideCondMenu();\">Add Label</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condCopy("+var1+");hideCondMenu();\">Copy</button></td></tr>"		
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condCut("+var1+");hideCondMenu();\">Cut</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condPasteAbove("+var1+");hideCondMenu();\">Paste Above</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condPasteBelow("+var1+");hideCondMenu();\">Paste Below</button></td></tr>"
	}
	else if (type==floatMenuType.action)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionCopy("+var1+","+var2+");hideCondMenu();\">Copy</button></td></tr>";	
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionCut("+var1+","+var2+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionPasteAbove("+var1+","+var2+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionPasteBelow("+var1+","+var2+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	else if (type==floatMenuType.hmi_screen_list)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListCopy("+var1+");hideCondMenu();\">Copy</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListCut("+var1+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListPasteAbove("+var1+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListPasteBelow("+var1+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	else if (type==floatMenuType.hmi_section)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectCopy("+var1+");hideCondMenu();\">Copy</button></td></tr>";	
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectCut("+var1+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectPasteAbove("+var1+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectPasteBelow("+var1+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	else if (type==floatMenuType.hmi_sect_elem)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemCopy("+var1+","+var2+");hideCondMenu();\">Copy</button></td></tr>";	
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemCut("+var1+","+var2+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemPasteAbove("+var1+","+var2+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemPasteBelow("+var1+","+var2+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	
	
	
   tbl+="</table>"
	
	var act_menu;
	act_menu=window.document.getElementById("act_menu");
	act_menu.innerHTML=tbl;
	act_menu.style.display="block";
   act_menu.style.position="absolute";
	act_menu.style.left=tmp21[1]+id.offsetWidth+10+"px";
	act_menu.style.top=tmp21[0]+"px";
	act_menu.style.zIndex="100";
	return false;
}


function hideCondMenu()
{
	var act_menu=window.document.getElementById("act_menu");
	act_menu.style.display="none";
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Editor - Condition/Action menu functions (when clicking on the number next to condition or action functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//        THIS IS CURRENTLY UNSUPPORTED
// BEGIN: Editor/HMI - Mobile View Edit box for conditions/actions functions.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var symbols_in_onscr_keyboard="1234567890+-*/!%&|<>=()";

// from http://stackoverflow.com/questions/8985805/orientation-change-in-android-using-javascript
function is_landscape()
{
    var uagent = navigator.userAgent.toLowerCase();
	 if (window.orientation==undefined)
	 {
		return false;
	 }
    if (( window.orientation==90 )||( window.orientation==-90 ))
    {
        return true;
    }
    else 
    {
        return false;
    }
    
}



var edit_box_pos=0;
var edit_box_str="";
var edit_box_args=[];
var edit_box_rendered=false;
var edit_box_only_var;

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

var expr_types=
{
	cond:0,
	act:1,
	act_var:2,
	act_timer:3,
	hmi_expr:5,
	hmi_var:6
};

function handleEditBoxDone(update)
{
		// update the database
		if (edit_box_args[0]==expr_types.cond)
		{
			var cond_num=edit_box_args[1];
			if (update==true)
			{
				cond_db[cond_num].condition=edit_box_str;
			}
			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawVars(true,false);
			refreshProg(true);
			prog_div.scrollTop=edit_box_args[5];
			return;
		}
		if ((edit_box_args[0]==expr_types.act)||(edit_box_args[0]==expr_types.act_var)||(edit_box_args[0]==expr_types.act_timer))
		{
			var cond_num=edit_box_args[1];
			var act_num=edit_box_args[2];
			var act_field=edit_box_args[3];
			var act_type=cond_db[cond_num].actions[act_num].act_type;
			if (update==true)
			{			
				if ((act_desc[act_type].field_list[act_field].type==field_types.str_num)||(act_desc[act_type].field_list[act_field].type==field_types.str_text_area))
				{
					cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=edit_box_str;		
				}
				else
				{
					cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=parseInt(edit_box_str);
				}
			}

			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawVars(true,false);
			refreshProg(true);
			prog_div.scrollTop=edit_box_args[5];
			return;
		}
		if ((edit_box_args[0]==expr_types.hmi_expr)||(edit_box_args[0]==expr_types.hmi_var))
		{
			var type=screens[edit_box_args[1]].rows[edit_box_args[2]][0].sect_elems[edit_box_args[3]].type;	
			var elem=screens[edit_box_args[1]].rows[edit_box_args[2]][0].sect_elems[edit_box_args[3]];			
			if (update==true)
			{
				elem[section_elem_defs[type].elem_list[edit_box_args[4]].elem_name]=edit_box_str;
			}
			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawScreenList();
			refreshCurrScreen();
			return;
		}
}

var buttonTimer;
var lastButton=null;

function buttonTimerTask()
{
	onEditBoxButtonClick(null,lastButton);

}

function startButtonTimer(btn)
{
	if (lastButton==null)
	{
		lastButton=btn;
		buttonTimer=setInterval(buttonTimerTask,100);
	}
}

function stopButtonTimer()
{
	lastButton=null;
	clearInterval(buttonTimer);	
}


function onEditBoxButtonClick(event,btn)
{
	var text_ar=document.getElementById("edit_box");
	var edit_box_str_with_cursor;
	
	if (event!=null)
	{
		event.preventDefault();
	}
	
	if (btn.innerHTML=='done.')  // return 
	{
		handleEditBoxDone(true);
	}
	else if (btn.innerHTML=='\u2190') // left arrow
	{
		startButtonTimer(btn);
		if (edit_box_pos>0)
		{
			edit_box_pos--;
		}
	}
	else if (btn.innerHTML=='\u2192') // right arrow
	{
		startButtonTimer(btn);
		if (edit_box_pos<edit_box_str.length)
		{
			edit_box_pos++;
		}
	}
	else if (btn.innerHTML=='del') // delete
	{
		startButtonTimer(btn);
		if (edit_box_pos>0)
		{
			edit_box_pos--;
			edit_box_str=edit_box_str.splice(edit_box_pos,1,"");
		}
	}
	else if (btn.innerHTML=='true') // special symbol
	{
		edit_box_str=edit_box_str.splice(edit_box_pos,0,btn.innerHTML);
		edit_box_pos+=4;
	}
	else if (btn.innerHTML=='false') // special symbol
	{
		edit_box_str=edit_box_str.splice(edit_box_pos,0,btn.innerHTML);
		edit_box_pos+=5;
	}

	else
	{
		// remap some characters
		var chr=btn.innerHTML;
		if (chr=="&lt;")
		{
			chr="<";
		}
		else if (chr=="&gt;")
		{
			chr=">";
		}
		else if (chr=="&amp;")
		{
			chr="&";
		}
		edit_box_str=edit_box_str.splice(edit_box_pos,0,chr);
		edit_box_pos++;
		
	}
	
	if (edit_box_pos>=edit_box_str.length)
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,0,"_");
	}
	else
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,1,"<u>"+edit_box_str.charAt(edit_box_pos)+"</u>");
	}
		
	text_ar.innerHTML=edit_box_str_with_cursor;
	
	return false;
}

function editBoxSelect(el)
{
	var val=el.options[el.selectedIndex].value;
	var text_ar=document.getElementById("edit_box");
	var edit_box_str_with_cursor;
	var i;
	
	if (edit_box_only_var==true)
	{
		edit_box_str=val;
		edit_box_pos=val.length;
		handleEditBoxDone(true);
	}
	
	
	// inser the selected function name at the cursor position
	edit_box_str=edit_box_str.splice(edit_box_pos,0,val);
	edit_box_pos+=val.length;
	
	if (edit_box_pos>=edit_box_str.length)
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,0,"_");
	}
	else
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,1,"<u>"+edit_box_str.charAt(edit_box_pos)+"</u>");
	}
		
	text_ar.innerHTML=edit_box_str_with_cursor;
	
	
	// find disabled item and assign the index to it;
	el.selectedIndex=0;
}

//padding:0.3em;

function hideAddressBar(){
  if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
  {
    document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
  }
  window.scrollTo(1,1);
}



	
 window.onorientationchange = function()
 {
   redrawEditBox();
 };	
	
function redrawEditBox()
{
	var pos;
	var i,j;
	var num_in_row;
	var button_class="\"larger_button1\"";

	var elm;
	var sel_var_list;
	var only_var;

	
	if (edit_box_rendered==false)
	{
		return;
	}
	var outp="";
	prog_div.innerHTML="";

	outp+="<div id=\"edit_box\" style=\"position:absolute;top:0.4em;font-family:monospace;overflow-x:auto;  font-size:20px; font-weight:bold; width:98%;  border-radius:2px; white-space: nowrap;    border: solid 1px #ccc;     padding:0.1em;     background-color: #f5f5f5;    box-shadow: inset 0 2px 3px rgba(0,0,0,0.2); \"><u>&nbsp</u> </div>";

	
	edit_box_only_var=false;
	if (edit_box_args[0]==expr_types.act_var)	
	{
		sel_var_list=genVarDest("@",(1<<var_type.prog)|(1<<var_type.plc));
		edit_box_only_var=true;
	}
	
	if (edit_box_args[0]==expr_types.act_timer)	
	{
		sel_var_list=genVarDest("@",(1<<var_type.timer));
		edit_box_only_var=true;
	}
	
	if ((edit_box_args[0]==expr_types.cond)||(edit_box_args[0]==expr_types.act))
	{	
		sel_var_list=genVarDest("@",(1<<var_type.prog)|(1<<var_type.plc)|(1<<var_type.timer));
	}
	

	if (	edit_box_args[0]==expr_types.hmi_var)
	{
		sel_var_list=genVarDest("@",(1<<var_type.prog));
		edit_box_only_var=true;
	}
	
	if (edit_box_args[0]==expr_types.hmi_expr)
	{	
		sel_var_list=genVarDest("@",(1<<var_type.prog));
	}
	
	
	
	outp+="<div style=\"position:absolute;top:3.5em;height:3em;width:98%;\">";

	
	var sel_func_code="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>Functions</option>"+
						  
						  "<optgroup label=\"Math\">"+
								"<option value=\"abs\">abs</option>"+
								"<option value=\"min\">min</option>"+
								"<option value=\"max\">max</option>"+
                     "</optgroup>"+
							"<optgroup label=\"Change Of State\">"+
								"<option value=\"F_COS\">F_COS</option>"+
							"</optgroup>"+
							"<optgroup label=\"Timer/Counter\">"+
								"<option value=\"count\">count</option>"+
								"<option value=\"expired\">expired</option>"+
							"</optgroup>"+
							""+
						 "</select>";


	var sel_func_hmi="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>Functions</option>"+
						  
						  "<optgroup label=\"Math\">"+
								"<option value=\"abs\">abs</option>"+
								"<option value=\"min\">min</option>"+
								"<option value=\"max\">max</option>"+
                     "</optgroup>"+
							""+
						 "</select>";
						 
		
	
	var sel_vars="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>Variables</option>"+sel_var_list+"<option disabled ></option><option disabled ></option><option disabled ></option>"+
						 "</select>";

	var sel_IO="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>I/O</option>"+
						 "</select>";
	

	if (edit_box_only_var==false)
	{
		if (edit_box_args[0]!=expr_types.hmi_expr)
		{
			outp+=sel_func_code;
		}
		else
		{
			outp+=sel_func_hmi;
		}
	}
	outp+=sel_vars;
	if ((edit_box_args[0]!=expr_types.act_timer)&&
		 (edit_box_args[0]!=expr_types.hmi_expr)&&
		 (edit_box_args[0]!=expr_types.hmi_var))
	{
		outp+=sel_IO;
	}
	
	if (edit_box_only_var==true)
	{
		outp+="<br><br><button onmousedown=\"onEditBoxButtonClick(event,this);\" class="+button_class+">done.</button>"; // return button
	}
	
	outp+="</div>";
	
	
	if (edit_box_only_var==false)
	{
		outp+="<div style=\"position:absolute; top:6.5em;bottom:0px; width:98%; \">";
		pos=0;
		if (is_landscape()==true)
		{
		
			outp+="<table cellspacing=\"0\"  cellpadding=\"0\" border=\"0\" style=\"border-spacing:0px; width:100%; height:100%;border-collapse:collapse;  \" >";	
			num_in_row=10;
			
			outp+="<tr>";
			outp+="<TD colspan=\"2\">";
			outp+="<button id=\"left_arrow\" ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2190</button>"; // left arrow
			outp+="</TD>";
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">del</button>"; // delete button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="<TD colspan=\"1\">";
			outp+="<button onmousedown=\"onEditBoxButtonClick(event,this);\" class="+button_class+">done.</button>"; // return button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2192</button>"; // right arrow
			outp+="</TD>";
			
			outp+="</tr>";
			
			//outp+="<tr><td>&nbsp</td></tr>";
		}
		else
		{
			outp+="<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\" border-spacing:0px;width:100%; height:100%;border-collapse:collapse;  \" >";	
			num_in_row=5;
			
			outp+="<tr>";
			outp+="<TD colspan=\"2\">";
			outp+="<button id=\"left_arrow\" ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2190</button>"; // left arrow
			outp+="</TD>";
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2192</button>"; // right arrow
			outp+="</TD>";

			outp+="</tr>";
			
			//outp+="<tr><td>&nbsp</td></tr>";
			
			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">del</button>"; // delete button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button onmousedown=\"onEditBoxButtonClick(event,this);\" class="+button_class+">done.</button>"; // return button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="</tr>";

			
			//outp+="<tr><td>&nbsp</td></tr>";

		}
		
					 
		
		for(i=0;;i++)
		{
			outp+="<tr>";
			for(j=0;j<num_in_row;j++)
			{
				
				if (pos>=symbols_in_onscr_keyboard.length)
				{
					break;
				}
				outp+="<td style=\"padding:0; width:"+100/num_in_row+"%;\">";
				outp+="<button ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+" >"+symbols_in_onscr_keyboard[pos]+"</button>";
				pos++;
				outp+="</td>";
				
			}

			if (pos>=symbols_in_onscr_keyboard.length)
			{
				// add true & false
				outp+="<td style=\"padding:0; width:"+100/num_in_row+"%;\">";
				outp+="<button ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+" >true</button>";
				outp+="</td>";
				outp+="<td style=\"padding:0; width:"+100/num_in_row+"%;\">";
				outp+="<button ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+" >false</button>";
				outp+="</td>";

			
				outp+="</tr>";
				break;
			}
			outp+="</tr>";
			//outp+="<br><br>";
		}
		outp+="</table>";
		
		outp+="</div>";
	}
	
	
	
	
	prog_div.innerHTML=outp;
	
	var text_ar=document.getElementById("edit_box");
	edit_box_pos=edit_box_str.length;
	edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,0,"_");
	text_ar.innerHTML=edit_box_str_with_cursor;
}

function showEditBox(id,type,arg1,arg2,arg3,arg4)
{
	var i;
	id.blur();
	// increase the prog_div to 100% width of the screen.
	edit_box_rendered=true;
	adjustMenuScreen(-1);

	//margin-top:1em; 
	
	
	edit_box_str=id.value;
	// preprocess the string and remove any newline characters
	//edit_box_str=edit_box_str.replace(/(\r\n|\n|\r)/gm,"");
	
	
	
	// if the destination is variable - only display the variable list
	if (type==expr_types.act)
	{
		// recalculate the type if the action item=0 (target)
		if (arg3==0)
		{
			var cond_num=arg1;
			var act_num=arg2;
			var act_type=cond_db[cond_num].actions[act_num].act_type;
			// first field is always a destination variable;
			if ((act_type==act_types.timer_start)||(act_type==act_types.ton)||(act_type==act_types.toff)||(act_type==act_types.ctu)||(act_type==act_types.ctd))
			{
				type=expr_types.act_timer;
			}
			else
			{
				type=expr_types.act_var;
			}
		}
	}
	

	if ((type==expr_types.cond)||(type==expr_types.act)||(type==expr_types.act_var)||(type==expr_types.act_timer))
	{
		edit_box_args=[type,arg1,arg2,arg3,arg4,prog_div.scrollTop];
	}
	else
	{
		edit_box_args=[type,arg1,arg2,arg3,arg4,0];
	}
	
	redrawEditBox();

	return false;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//        THIS IS CURRENTLY UNSUPPORTED
// END: Editor/HMI - Mobile View Edit box for conditions/actions functions.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor/Debugger - Render conditions/actions.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function renderAction(cond_num,act_num,largest_act,rw)
{
	var outp="";
	var i,j;
	var color;
	var act_type=cond_db[cond_num].actions[act_num].act_type;
	
	if (rw==true)
	{
		var funcInvStr="showCondMenu(this,"+floatMenuType.action+","				+cond_num+","+act_num+");";
		outp+="<tr><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+act_num+".</a>";
		
	
	}
	else
	{
		outp+="<tr ><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\" >"+act_num+".";
	}
	outp+="</td>";
	
	color=act_desc[act_type].color;
	outp+="<td style=\"white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"  bgcolor="+color+">"+act_desc[act_type].name+"</td>";
   //outp+="<TD style=\"padding-bottom:12px; padding-top:7px; \" ><table style=\"width:100%;\">";
        outp+="<TD style=\"padding-bottom:5px; padding-top:5px; \" ><table style=\"width:100%;\">";
	
	for(i=0;i<act_desc[act_type].field_list.length;i++)
	{
		outp+="<TR><TD width=\"1px\"><B>";				
		outp+=act_desc[act_type].field_list[i].display_name+":";
		outp+="</B></TD><TD>";				
		
		if (act_desc[act_type].field_list[i].type==field_types.str_num)
		{
			//size=\""+act_desc[act_type].field_list[i].field_size+"\"
            if ((act_desc[act_type].field_list[i].editable!=undefined)&&(act_desc[act_type].field_list[i].editable==false))
            {
                // non-editable field
                outp+="<div style=\"  background-color: #CCFF66; \">" +cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name] +"</div>";
            }
            else
            {
                if (rw==true)
                {
                    if (computer_interface==false)
                    {
                        outp+="<input type=\"text\" style=\"width:100%;\"   onfocus=\"return showEditBox(this,"+expr_types.act+","+cond_num+","+act_num+","+i+",0);\"   value=\""+escapeHTML(cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name])+"\" id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
                    }
                    else
                    {
                        outp+="<input type=\"text\" style=\"width:100%;\"  onkeydown=\"return actOnKeyDown(event,"+expr_types.act+");\"    value=\""+escapeHTML(cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name])+"\" id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
                    }
                }
                else
                {
                    outp+=cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name];
                }
            }
		}
		else if (act_desc[act_type].field_list[i].type==field_types.str_text_area)
		{
			if (rw==true)
			{
				outp+="<textarea type=\"text\" style=\"width:100%;\"   id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">"+cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]+"</textarea>";
			}
			else
			{
				outp+=cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name];
			}
		}
		else
		{
			// enumeration
			if (rw==true)
			{
				outp+="<select id=\"act_"+cond_num+"_"+act_num+"_"+i+"_"+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
				for(j=0;j<act_desc[act_type].field_list[i].enum_elems.length;j++)
				{
					if (cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]==j)
					{
						outp+="<option value=\""+j+"\" selected>"+act_desc[act_type].field_list[i].enum_elems[j]+"</option>";
					}
					else
					{
						outp+="<option value=\""+j+"\">"+act_desc[act_type].field_list[i].enum_elems[j]+"</option>";
					}
				}
				outp+="</select>";
			}
			else
			{
				outp+=act_desc[act_type].field_list[i].enum_elems[cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]];
			}
		}
		outp+="</td></TR>";
	}
	
	outp+="</table></TD>";
/*	
	if (rw==true)
	{
		//outp+="<td width=300 bgcolor=#EFEFFB>";
		outp+="<td style=\"padding-bottom:20px;\" width=240  bgcolor=#EFEFFB>";
		outp+="<br>";
		outp+="<button  onclick=\"delAction("+cond_num+","+act_num+");\">Delete Action</button>";
		outp+="<button  onclick=\"actMoveUp("+cond_num+","+act_num+");\">Move Up</button>";
		outp+="<button  onclick=\"actMoveDown("+cond_num+","+act_num+");\">Move Down</button>";
		outp+="</td>";
	};
	*/
	
	outp+="</tr>";
	return outp;
}




function refreshProg(rw)
{
	var i,j,outp,tbl,k;
	var largest_act;
	prog_div.innerHTML="<h2> ARGEE Program </h2><br>";


	
	
	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	
	
	if ((computer_interface==true)&&(rw==true))
	{
		prog_div.innerHTML+="Keyboard shortcuts: <br>Press Ctrl-q for list of program variables<br>"+
		                    "Press Ctrl-i for list of I/O variables<br>"+
								  "Press Ctrl-f for list of operations<br>"+
                                  "Press Ctrl-s for list of State Names<br>"+
								  "These shortcuts work to enter variables and expressions in all the screens<br><br>"+
								  "In order to configure the IO of the station, follow the <a target=\"_blank\" href=\""+url_prefix+"\"> Link</a><br><br>";
								  
   }
	
	//style=\"height: 100%;\"
	tbl="<table width=\"100%\" style=\"border-collapse:collapse;\" border=\"1\">";
	/*tbl+="<tr height=\"20\" style=\"width:100%;\"><td width=\"5\" bgcolor=lightgrey>Condition<br> Number</td><td bgcolor=lightgrey>Condition Data</td></tr>";*/
	for(i=0;i<cond_db.length;i++)
	{
		//tbl+="<tr height=\"20\" style=\"width:100%;\"><td bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=#E6E6E6>";
		//tbl+="<tr height=\"20\" style=\"width:100%;\"><td bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=LightPink   >";
		if (cond_db[i].label!=undefined)
		{
            //tbl+="<tr height=\"40\" style=\"width:100%;\"><td rowspan=\"1\" colspan=\"2\"></td></tr>";
			tbl+="<tr height=\"40\" style=\"width:100%;\"><td bgcolor=\"yellow\" rowspan=\"1\" colspan=\"2\">";
			if (rw==true)
			{
			//color: #ff0000;
				tbl+="<input type=\"text\" value=\""+cond_db[i].label+"\" id=\"label_"+i+"\" style=\"width:100%;font-family: Verdna; font-style:italic; font-weight:bold;  font-size: 12px; color: Red   ;\" onblur=\"changeLabel(this.id,"+i+")\">";
				tbl+="<br><button style=\"float: left;\" onclick=\"delLabel("+i+");\">Delete Label</button>";
			}
			else
			{
				tbl+="<div style=\"width:100%;font-family: Verdna; font-style:italic; font-weight:bold;  font-size: 12px; color: Red   ;\">"+cond_db[i].label+"</div>";
			}
			tbl+="</td></tr>";
		}
		
		if (rw==true)
		{
			var funcInvStr="showCondMenu(this,"+floatMenuType.condition+","				+i+","+0+");";
		   //id=\"cond_"+i+"\"
			tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\" bgcolor=#CECEF6 rowspan=\"3\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+i+".</a></td><td bgcolor=Tan   >";
		}
		else
		{
            //tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=Tan   >";        
            if (rungs_status[i]==true)
            {
                //
                tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=#99FF33   >";                
            }
            else
            {
                tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=#E8E8E8    >";                            
            
            }
		}
		if (rw==true)
		{
			tbl+="<fieldset><legend>Condition</legend>";
			if (computer_interface==false)
			{ 
				tbl+="<textarea style=\"width:100%;\" rows=\"2\"  id=\"cnd_"+i+"\"  onfocus=\"return showEditBox(this,"+expr_types.cond+","+i+",0,0,0);\" onblur=\"changeCondElem(this.id,"+i+")\">"+escapeHTML(cond_db[i].condition)+"</textarea><br>";
			}
			else
			{
				tbl+="<textarea onkeydown=\"return actOnKeyDown(event,"+expr_types.cond+");\" style=\"width:100%;\" rows=\"2\"  id=\"cnd_"+i+"\"   onblur=\"changeCondElem(this.id,"+i+")\">"+escapeHTML(cond_db[i].condition)+"</textarea><br>";
			}
			tbl+="</fieldset>";
		}
		else
		{
			tbl+="<fieldset><legend>Condition</legend>";
			tbl+=escapeHTML(cond_db[i].condition);
			tbl+="</fieldset>";
		}
		tbl+="</td></tr>"
		tbl+="<tr><td>"
		if (cond_db[i].actions.length!=0)
		{
			largest_act=0;
			for(j=0;j<cond_db[i].actions.length;j++)
			{
				if(act_desc[cond_db[i].actions[j].act_type].field_list.length>largest_act)
				{
					largest_act=act_desc[cond_db[i].actions[j].act_type].field_list.length;
				}
			}
		
			//style=\"height: 100%;\"
			tbl+="<fieldset><legend>Actions</legend>";
			tbl+="<table width=\"100%\" style=\"border-collapse:collapse;\"  border=\"1\">";	
			for(j=0;j<cond_db[i].actions.length;j++)
			{
				tbl+=renderAction(i,j,largest_act,rw);
			}
			tbl+="</fieldset>";
			tbl+="</table>";
		}
		tbl+="</td></tr>";
		
		if (rw==true)
		{
			tbl+="<tr style=\"height:50px\"><td>";
			outp="<select id=\"prog__act_sel_"+i+"\">";
			for(j=0;j<act_desc.length;j++)
			{
				if (act_desc[j].name!="")
				{
					outp+="<option value=\""+j+"\">"+act_desc[j].name+"</option>";
				}
			}
			outp+="</select>";
			tbl+=outp;
			tbl+="<button onclick=\"addAction("+i+",\'prog__act_sel_"+i+"\');\">Add Action</button><br>";
			tbl+="</td></tr>";
		}
		else
		{
			/*tbl+="<tr style=\"height:50px\"><td>";
			tbl+="</td></tr>";
			*/
			tbl+="<tr style=\"height:20px\"></tr>";
			
		}
	}
	tbl+="</table>";
	if (rw==true)
	{
		prog_div.innerHTML+=tbl+"<br>"+add_cond_str+"<br><br><br>";
	}
	else
	{
		prog_div.innerHTML+=tbl;
	}
}

var add_cond_str="<button type=\"button\" onclick=\"addCond();\">Add Condition</button>";

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor/Debugger - Render conditions/actions.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Some Top level menu/utility functions for project management
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function eraseProject()
{
	var localSettrings=localStorage.settings;
	var ip=localStorage.def_ip;
	var loc_config;
	var loc_code;
	if (sim_mode==true)
	{
		loc_config=localStorage.simDevSelect;
		loc_code=localStorage.simCode;
	}
    //var library=localStorage.library;
	localStorage.clear();
	localStorage.settings=localSettrings;
	localStorage.def_ip=ip;
	if (sim_mode==true)	
	{
		localStorage.simDevSelect=loc_config;
		if (loc_code!=undefined)
		{
			localStorage.simCode=loc_code;
		}
	}
    //localStorage.library=library;
}

function initProj(flowch)
{
	var_db=clone(var_db_template);
	cond_db=[];
	screens=[];
	comp_res.innerHTML="";
	flowchart={constants:[0,0],timer_exp:[0,0],counter_preset:[0,0],rungs:[]};
    LD_ClearLib();

	if (flowch==true)
	{
		editor="flowchart";	
	}
	else
	{
		editor="regular";
	}

}

function clearProject()
{
	var i;
	var r=confirm("Erase Project?");
	if (r==true)
	{
		if (sim_mode==true)
		{
			//if (localStorage.simDevSelect!=undefined)
			{
				delete localStorage.simDevSelect;
				delete localStorage.simCode;
				initProj(true);
				window.location.reload();
				return;
			}
		}
		initProj(true);
		showFlowchart();
		renderMenu("Flowchart");
		/*
	
		initProj(false);
		eraseProject();
		adjustMenuScreen(1);
		var_display=false;
		monitoring_mode=false;
		redrawVars(true);
		refreshProg(true);
		renderMenu("Initial");
		*/
	}
	return true;
}

function loadLastSavedProject()
{
	var_db=JSON.parse(localStorage.var_db);
	cond_db=JSON.parse(localStorage.cond_db);
	screens=JSON.parse(localStorage.screens);
	flowchart=JSON.parse(localStorage.flowchart);
	editor=JSON.parse(localStorage.editor);
    LD_Init();
	redrawVars(true,false);
	refreshProg(true);
}

var flowchart_debug_mode=false;

function canDebug()
{
	if ((localStorage.editor!=undefined)||(cond_db.length==0))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function CodeDebugView()
{
	if (canDebug()==false)
	{
		setCompilerMessage(false,true,"Project is not running - can not test");
		return false;
	}
	adjustMenuScreen(1);
	ajax_vars_loaded=false;
	var_display=false;
	refreshProg(false);
	redrawVars(false,false);
	if (monitoring_mode==false)
	{
		getVars();
	}
	debugMode=true;
	flowchart_debug_mode=false;
	monitoring_mode=true;
	return true;
}


function VarDebugView()
{
	if (canDebug()==false)
	{
		setCompilerMessage(false,true,"Project is not running - can not test");
		return false;
	}

	adjustMenuScreen(1);
	ajax_vars_loaded=false;
	var_display=true;
	//allocVars();
	refreshProg(false);
	redrawVars(false,false);
	if (monitoring_mode==false)
	{
		getVars();
	}
	debugMode=true;
	flowchart_debug_mode=false;
	monitoring_mode=true;
	return true;
}


function ProgView()
{
	adjustMenuScreen(1);

	var_display=false;
	refreshProg(true);
	redrawVars(true,false);
	monitoring_mode=false;
	comp_res.innerHTML="";
	return true;
}


function VarView()
{
	adjustMenuScreen(1);

	var_display=true;
	redrawVars(true,false);
	monitoring_mode=false;
	comp_res.innerHTML="";
	return true;
}

	

function Import()
{
	var elem=this.document.getElementById('imp_id');
	combined_prj=JSON.parse(elem.value);
	cond_db=combined_prj.cond_db;	
	var_db=combined_prj.var_db;
	screens=combined_prj.scr;
	editor=combined_prj.editor;
	flowchart=combined_prj.flowchart;
    lib_struct=combined_prj.library_desc;
    LD_SaveLib();
    loadProgVars();
	saveLocal();
	
	adjustMenuScreen(1);
	var_display=false;
	refreshProg(true);
	redrawVars(true,false);
}

function handleFileSelect(evt) 
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
			   combined_prj_str="";
				var j,stat;
				/*for(j=0;;j++)
				{
					var code=e.target.result.charCodeAt(32*1024+j);
					combined_prj_str+=e.target.result
					*/
                stat=parseARGEE_File(e.target.result,true);   
                
                
/*                
				var dataView=new DataView(e.target.result);	
				if ((dataView.getUint32(4,true)!=ARGEE_Environment_Version)||
				    (dataView.getUint32(0,true)!=real_ARGEE_Kernel_Version))
				{
					//
					var r = confirm("The imported file may not be compatible with this device or environment\n Click OK to proceed.");					
					if (r != true) 
					{
						return;
					}
				}
				// check the device composition in the fiel and in the device
				var stat=true;
				if (stationConfig.length!=dataView.getUint8(8))
				{
					stat=false;
				}
				else
				{
					for(j=0;j<stationConfig.length;j++)
					{
						if (stationConfig[j]!=dataView.getUint32(9+4*j,true))
						{
							stat=false;
							break;
						}
					}
				}
				if (stat==false)
				{
					var r = confirm("The station configuration in the imported file doesn't match the connected station\n Click OK to proceed.");					
					if (r != true) 
					{
						return;
					}
				}
				
				
				
				for(j=0;;j++)
				{
					var code=dataView.getUint8(32*1024+4+j);
					if (code==0)
					{
						break;
					}
					combined_prj_str+=String.fromCharCode(code);
				}
			   combined_prj=JSON.parse(combined_prj_str);
				cond_db=combined_prj.cond;	
				var_db=combined_prj.vars;
				screens=combined_prj.scr;
			   editor=combined_prj.editor;			
				flowchart=combined_prj.flowchart;				
                */
				if (stat==true)
				{
					saveLocal();
					if (editor=="flowchart")
					{	
						renderMenu("Flowchart");			
						showFlowchart();
					}
					else
					{
						adjustMenuScreen(1);
						var_display=false;
						
						
						redrawVars(true,false);
						refreshProg(true);
						
						renderMenu("Initial");
					}
				}
				
				
				
				
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsArrayBuffer(f);
    }
}


function doTrick() {
    window.document.getElementById('files').click();    
}


// taken from https://github.com/beatgammit/toDataURL/blob/master/src/download.js
var lookup = [
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
                'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                'w', 'x', 'y', 'z', '0', '1', '2', '3',
                '4', '5', '6', '7', '8', '9', '+', '/'
        ];

        function uint8ToBase64(uint8) {
                var i,
                        extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
                        output = "",
                        temp, length;

                function tripletToBase64 (num) {
                        return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
                };

                // go through the array every three bytes, we'll deal with trailing stuff later
                for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
                        output += tripletToBase64(temp);
                }

                // pad the end with zeros, but make sure to not forget the extra bytes
                switch (extraBytes) {
                        case 1:
                                temp = uint8[uint8.length - 1];
                                output += lookup[temp >> 2];
                                output += lookup[(temp << 4) & 0x3F];
                                output += '==';
                                break;
                        case 2:
                                temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
                                output += lookup[temp >> 10];
                                output += lookup[(temp >> 4) & 0x3F];
                                output += lookup[(temp << 2) & 0x3F];
                                output += '=';
                                break;
                }

                return output;
        }


function savePrjCode(with_source)
{
   var imgDLHelper = document.getElementById('imgdlhelper');
	var filename=document.getElementById('save_as_file_name');
	imgDLHelper.download=filename.value+".arg";
	var dat;
	var i;
	compileProject1(true,with_source);
	if (loc_compile_res==false)
	{
		setCompilerMessage(false,true,"Error in the project.. Please compile first!");
		alert("Error !!!!.\nExport can not be performed.\nMake sure project compiles without errors\n");
		return;
	}
	var tmp = new Uint8Array(prog_code.length);
    for (i = prog_code.length; i >= 0; i -= 1) 
	{
      tmp[i] = prog_code[i] & 0xFF;
    }
	dat = uint8ToBase64(tmp);
	
	blob = new Blob([tmp], { type: 'application/octet-stream;base64' }); //new way
	var blobUrl = URL.createObjectURL(blob);
	
	imgDLHelper.href=blobUrl;
	imgDLHelper.click();
}


function aboutPage()
{
	var vars_div=document.getElementById("vars");
	var tbl;
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";
	
	tbl="<center><br><br><h2>Versions and Links:</h2><h3><br><table border=\"2\">";
	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>Environment Version:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp"+getVersionString(ARGEE_Environment_Version)+"&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";		

	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>ARGEE Kernel Version:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp"+getVersionString(real_ARGEE_Kernel_Version)+"&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";
	
	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>Download link to the latest version of the environment:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp<a target=\"_blank\" href=\"http://www.turck.us/assets/networks/argee/pg1.html\">Click Here</a>&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";

	
	tbl+="</table></h3></center>";	

	prog_div.innerHTML=tbl;
	return true;
}


function ImpExp()
{
	var vars_div=document.getElementById("vars");
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";



	combined_prj={var_db:var_db,cond_db:cond_db,scr:screens,editor:editor,flowchart:flowchart,library_desc:lib_struct};
	combined_prj_str=JSON.stringify(combined_prj);
	prog_div.innerHTML="";
	prog_div.innerHTML+="<textarea type=\"text\" rows=\"20\" style=\"width:98%;\"  id=\"imp_id\">"+combined_prj_str+"</textarea>";
	prog_div.innerHTML+="<button onclick=\"Import();\">Import Text Above</button>";

	prog_div.innerHTML+="<br><br><br>";
	prog_div.innerHTML+="<h1> Import Program</h1><br>";
	prog_div.innerHTML+="<input type=\"file\" accept=\".arg\" id=\"files\"  onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple /><br>";

    if (lib_supported==true)
    {
        prog_div.innerHTML+="<br><br><br>";
        prog_div.innerHTML+="<h1>Import Library</h1><br>";
        prog_div.innerHTML+="<input type=\"file\" accept=\".alb\"  id=\"files\"  onchange=\"handleLibImport(this);return false;\" name=\"files[]\" multiple /><br>";
    }
	//prog_div.innerHTML+="<input type=\"file\" id=\"files\" style=\"display:none\" onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple />";
	prog_div.innerHTML+="<br><br><br>";	
	prog_div.innerHTML+="<h1> Export Program</h1><br>";
	prog_div.innerHTML+="<a id=\"imgdlhelper\" style=\"display:none;\"  download=\"test.txt\" href=\"\">&nbsp;</a><br>";
	prog_div.innerHTML+="Project Name: <input type=\"text\" size=\"10\" id=\"save_as_file_name\">";
	prog_div.innerHTML+="<button onclick=\"savePrjCode(true);\">Save Project With Source</button><p><br><br></p>";
/*    
    prog_div.innerHTML+="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<button onclick=\"savePrjCode(false);\">Save Project <b><u>Without</u></b> Source Code</button>";
*/    
	return true;	
	
}


var interf_types=
{
	computer:0,
	smartphone:1,
	tablet:2
};


function applyInterface()
{
	//var elem=this.document.getElementById("interface_type");
	var elem1=this.document.getElementById("left_col_width");
	//localStorage.settings=JSON.stringify([parseInt(elem.value),parseInt(elem1.value),1]); // last argument -> 1 -> to reload the project without asking the user to load from the device or not.
    localStorage.settings=JSON.stringify([interf_types.computer,parseInt(elem1.value),1]); // last argument -> 1 -> to reload the project without asking the user to load from the device or not.
	// if the project is not saved - it automatically loads from the computer.
	/*if (elem.value==interf_types.smartphone)
	{
		side_by_side=false;
	}
	else if (elem.value==interf_types.tablet)
	{
		side_by_side=true;
		left_col_width=parseInt(elem1.value);
	}*/
	// don't execute testFrame(); directly - rather do the redirection -> window=
	history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
	var locationObj = window.location;
	window.location = locationObj;
}

function renderSettings()
{
	var vars_div=document.getElementById("vars");
	var outp;
	var settings;
	var_display=false;	
	
	if (localStorage.settings!=undefined)
	{
		settings=JSON.parse(localStorage.settings);
	}
	else
	{
		settings=[0,40,0];
	}
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";
	
	//prog_div.innerHTML="Log:"+log_data;
	prog_div.innerHTML="";
	
	
	prog_div.innerHTML+="<h1> Settings</h1><br>";
	outp="";
	outp+="<table><tr>"
	outp+="<td>left column width in % <br> (for tablet and Computer interfces only):</td>"; 
	outp+="<td><input type=\"text\" id=\"left_col_width\" value=\""+settings[1]+"\"> </td></tr>";
	
	outp+="<tr>";
	outp+="<td colspan=\"2\"><button onclick=\"applyInterface()\">Apply</button></td></tr></table>";
	
	prog_div.innerHTML+=outp;
	
	return true;	

}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Some Top level menu/utility functions for project management
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: HMI Edit/Rendering functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



var screens=[];


// variables that can be used in HMI screens are only program variables (this limits the number of functions that can be used in expressions and reduces 
// the complexity/memory requirements needed to transfer IO/other variable infos).
var screen_def=
[
	{elem_name:"name",type:field_types.str_num,elem_name_prefix:"screen_name"},
	{elem_name:"var_list",type:field_types.var_list}
];

var section_def=
[
	{elem_name:"name",type:field_types.str_num,elem_name_prefix:"screen_sect_name"},
	{elem_name:"var_list",type:field_types.var_list}
];

// button -> add output or status variable (button (RW), Status(RO), Variable(RW), 
var sect_elem_type=
{
	button:0,
	status:1,
	status_ruler:2,
	variable:3,
	enumeration:4,	
    disp_string:5,
    edit_string:6,
};


var sect_elem_type_strings=
[
	{name:"Button", type: sect_elem_type.button,lib_req:false},
	{name:"Display number or state", type: sect_elem_type.status,lib_req:false},
	{name:"Display number with valid range", type: sect_elem_type.status_ruler,lib_req:false},
	{name:"Enter number", type: sect_elem_type.variable,lib_req:false},
	{name:"Enter state", type: sect_elem_type.enumeration,lib_req:false},
    {name:"Display String", type: sect_elem_type.disp_string,lib_req:true},
    {name:"Edit String", type: sect_elem_type.edit_string,lib_req:true},
];	



var access_type_def=
{
	rw:0,
	ro:1
};

function isInt(n){
        return Number(n)===n && n%1===0;
}

// next_in_line is a field of each of the elements to generate a tree of connections
// this way elements can be placed next to each other 
var section_elem_defs=
[
	{elem_type:sect_elem_type.button, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Destination",type:field_types.str_num_var,elem_name_prefix:"screenSectElemDest",disp_name:"Destination Variable"} // target variable
		]
	},		
	{elem_type:sect_elem_type.status, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Expression",type:field_types.str_num_var,elem_name_prefix:"screenSectElemExpr"},
			{elem_name:"Units",type:field_types.str_num,elem_name_prefix:"screenSectElemUnits"}
		]
	},		
	{elem_type:sect_elem_type.status_ruler, elem_list: // this is done by special HTML5 element
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Expression",type:field_types.str_num_var,elem_name_prefix:"screenSectElemExpr"},
			{elem_name:"Units",type:field_types.str_num,elem_name_prefix:"screenSectElemUnits"},
			{elem_name:"NormalRangleMin",type:field_types.num,elem_name_prefix:"screenSectElemNormRngMin"},
			{elem_name:"NormalRangleMax",type:field_types.num,elem_name_prefix:"screenSectElemNormRngMax"}
		]
	},
	{elem_type:sect_elem_type.variable, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Destination",type:field_types.str_num_var,elem_name_prefix:"screenSectElemDest", disp_name:"Destination Variable"}, // target variable 		
			{elem_name:"Units",type:field_types.str_num,elem_name_prefix:"screenSectElemUnits"}
		]
	},
	{elem_type:sect_elem_type.enumeration, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Destination",type:field_types.str_num_var,elem_name_prefix:"screenSectElemDest", disp_name:"Destination Variable"}, // target variable 					
			{elem_name:"StartValue",type:field_types.state_enum,elem_name_prefix:"screenSectElemStartValue"},
			{elem_name:"EndValue",type:field_types.state_enum,elem_name_prefix:"screenSectElemEndValue"},			
		]
	},	

	{elem_type:sect_elem_type.disp_string, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"VarName",type:field_types.str_num_var,elem_name_prefix:"screenSectElemExpr"},
		]
	},    
	{elem_type:sect_elem_type.edit_string, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"VarName",type:field_types.str_num_var,elem_name_prefix:"screenSectElemExpr"},
		]
	},    
];

function createSectElem(type)
{
	var i;
	var elem={Name:""};
	for(i=0;i<section_elem_defs[type].elem_list.length;i++)
	{
		if ((section_elem_defs[type].elem_list[i].type==field_types.num)||(section_elem_defs[type].elem_list[i].type==field_types.state_enum))
		{
			elem[section_elem_defs[type].elem_list[i].elem_name]=0;
		}
		else
		{
			elem[section_elem_defs[type].elem_list[i].elem_name]="";
		}
	}
	elem.type=type;
	return elem;
}




function screenNameChange(id,num)
{
	var elem=this.document.getElementById(id);
	screens[num].name=elem.value;
	saveLocal();
}

function AddScreen()
{
	screens[screens.length]={name:"",rows:[]};
	saveLocal();
	redrawScreenList();
}

var hmiScrClipboard=null;

function hmiScrListCut(screen_num)
{
	hmiScrClipboard=screens[screen_num];
	screens.splice(screen_num,1);
	saveLocal();
	redrawScreenList();
}

function hmiScrListCopy(screen_num)
{
	hmiScrClipboard=screens[screen_num];
}

function hmiScrListPasteAbove(screen_num)
{
	if (hmiScrClipboard==null)
	{
		return;
	}
	
	screens.splice(screen_num,0,hmiScrClipboard);
	saveLocal();
	redrawScreenList();
}

function hmiScrListPasteBelow(screen_num)
{
	var len;
	if (hmiScrClipboard==null)
	{
		return;
	}
	screens.splice(screen_num+1,0,clone(hmiScrClipboard));
	saveLocal();
	redrawScreenList();
}




function DeleteScreen(screen_num)
{
	screens.splice(screen_num,1);
	saveLocal();
	redrawScreenList();
}

function EditScreen(scr)
{
	curr_screen=scr;
	var_display=false;
	refreshCurrScreen();
}



function ViewScreen(scr)
{
	curr_screen=scr;
	var_display=false;
	var outp="";
	prog_div.innerHTML=renderScreen(outp,curr_screen,false);
}	

function renderScreenList(outp,edit)
{
	var i,j,k,l;

	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	
	outp="";
	//outp+="<fieldset style=\"background:#E2E2E2; padding-bottom: 30px;\">";
	outp+="<H2>"+"Screens"+"</h2><br>"
	outp+="<table border=\"1\">";
	for(i=0;i<screens.length;i++)
	{
		outp+="<TR >";	
		   //outp+="<TD >Name</TD>";
			//outp+="<TD bgcolor=#E6E6E6>";
			if (edit==true)
			{
					var funcInvStr="showCondMenu(this,"+floatMenuType.hmi_screen_list+","				+i+","+0+");";
				outp+="<td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+i+".</a></td>";
			}
			
			outp+="<TD >";
				if (edit==true)
				{				
					outp+="<input type=\"text\" size=\""+10+"\" value=\""+screens[i].name+"\" id=\""+"screen_name"+"_"+i+"\" onblur=\"screenNameChange(this.id,"+i+")\">";
				}
				else
				{
					outp+="<div style=\"padding:1em\" id=\"hmi_screen_"+i+"\">";
					outp+="<A href=\"javascript:ViewScreen("+i+");\">"+screens[i].name+"</A>";
					outp+="</div>"
				}
			if (edit==true)
			{
				outp+="</TD>";				
				outp+="<TD>";
					outp+="<button type=\"button\" onclick=\"EditScreen("+i+");\">Edit</button>";
				outp+="</TD>";						
			}
		outp+="</TR>";
	}
	outp+="</table>";
	if (edit==true)
	{
		outp+="<button type=\"button\" onclick=\"AddScreen();\">Add Screen</button><br><br><br>";
	}
	//outp+="</fieldset>"
	return outp;	
}

function redrawScreenList()
{
	var outp;
	adjustMenuScreen(1);
	
	var_display=true;
	var_div.innerHTML=renderScreenList(outp,true);
	monitoring_mode=false;
	if (side_by_side==true)
	{
		if (screens.length>0)
		{
			EditScreen(0);
		}
		else
		{
			prog_div.innerHTML="";
		}
	}
	return true;

	
}


function DrawHMIScreenList()
{
	var outp;

	if (canDebug()==false)
	{
		setCompilerMessage(false,true,"Project is not running - can not test");
		return false;
	}

	
	adjustMenuScreen(1);

	
	var_display=true;
	if (screens.length>0)
	{
		var_div.innerHTML=renderScreenList(outp,false);
		num_var_iter=0;
		debugMode=false;
		//allocVars();
		if (monitoring_mode==false)
		{
			addAjaxAction(getVarsAjax);
		}
		if (side_by_side==true)
		{
			ViewScreen(0);
		}
		monitoring_mode=true;
	}
	else
	{
		setCompilerMessage(false,true,"<b>HMI screens are not defined!!!</b>");				
		return false;
	}
	return true;
}

var curr_screen=-1;

function AddSection(scr,row)
{
	if (row==0xffff)
	{
		var elem=screens[scr].rows.length;
		screens[scr].rows[elem]=[];
		screens[scr].rows[elem][0]={name:"",sect_elems:[]};
	}
	else
	{
		screens[scr].rows[row][screens[scr].rows[row].length]={name:"",sect_elems:[]};
	}
	saveLocal();
	refreshCurrScreen();
}

var hmiSectClipboard=null;

function hmiSectCut(sect)
{
	hmiSectClipboard=screens[curr_screen].rows[sect][0];
	DelSection(curr_screen,sect,0);
}

function hmiSectCopy(sect)
{
	hmiSectClipboard=screens[curr_screen].rows[sect][0];
}


function hmiSectPasteAbove(sect)
{
	if (hmiSectClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows.splice(sect,0,arr);
	saveLocal();
	refreshCurrScreen();
}

function hmiSectPasteBelow(sect)
{
	if (hmiSectClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows.splice(sect+1,0,arr);
	saveLocal();
	refreshCurrScreen();
}





function DelSection(scr,row,sect)
{
	screens[scr].rows[row].splice(sect,1);
	if (screens[scr].rows[row].length==0)
	{
		screens[scr].rows.splice(row,1);
	}
	saveLocal();
	refreshCurrScreen();
}



function screenSectionNameChange(id,scr,row,sect)
{
	var elem=this.document.getElementById(id);
	screens[scr].rows[row][sect].name=elem.value;
	saveLocal();
}

function addScrSectElem(id,scr,row,sect)
{
	var elem=this.document.getElementById(id);
	var num=parseInt(elem.value);
	var to_clone=createSectElem(num);


	var elem_num=screens[scr].rows[row][sect].sect_elems.length;
	screens[scr].rows[row][sect].sect_elems[elem_num]=[];
	screens[scr].rows[row][sect].sect_elems[elem_num]=clone(to_clone);
	saveLocal();
	refreshCurrScreen();
}


var hmiElemClipboard=null;

function hmiSectElemCut(sect,elem)
{
	hmiElemClipboard=screens[curr_screen].rows[sect][0].sect_elems[elem];
	DeleteSectElem(curr_screen,sect,0,elem);
}

function hmiSectElemCopy(sect,elem)
{
	hmiElemClipboard=screens[curr_screen].rows[sect][0].sect_elems[elem];
}

function hmiSectElemPasteAbove(sect,elem)
{
	if (hmiElemClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows[sect][0].sect_elems.splice(elem,0,clone(hmiElemClipboard));
	saveLocal();
	refreshCurrScreen();
}

function hmiSectElemPasteBelow(sect,elem)
{
	if (hmiElemClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows[sect][0].sect_elems.splice(elem+1,0,clone(hmiElemClipboard));
	saveLocal();
	refreshCurrScreen();
}


function renderAddElemButton(scr,row,sect)
{
	var outp="";
	outp+="<select id=\"scr_row_sect_add_elem_"+scr+"_"+row+"_"+sect+"\">";
	for(j=0;j<sect_elem_type_strings.length;j++)
	{
		if ((sect_elem_type_strings[j].lib_req==false)||((sect_elem_type_strings[j].lib_req==true)&&(lib_supported==true)))
		{
			outp+="<option value=\""+j+"\">"+sect_elem_type_strings[j].name+"</option>";
		}
	}
	outp+="</select>";
	outp+="<button type=\"button\" onclick=\"addScrSectElem(\'"+"scr_row_sect_add_elem_"+scr+"_"+row+"_"+sect+"\',"+scr+","+row+","+sect+");\">Add New Element</button>";
	return outp;	
}

function DeleteSectElem(scr,row,sect,sect_elem)
{
	screens[scr].rows[row][sect].sect_elems.splice(sect_elem,1);
	saveLocal();
	refreshCurrScreen();
}


function MoveUpSectElem(scr,row,sect,sect_elem)
{

	if (sect_elem>0)
	{
		var tmp=screens[scr].rows[row][sect].sect_elems[sect_elem-1];
		screens[scr].rows[row][sect].sect_elems[sect_elem-1]=screens[scr].rows[row][sect].sect_elems[sect_elem];
		screens[scr].rows[row][sect].sect_elems[sect_elem]=tmp;
	}
	saveLocal();
	refreshCurrScreen();
}

function MoveDownSectElem(scr,row,sect,sect_elem)
{

	if (sect_elem<(screens[scr].rows[row][sect].sect_elems.length-1))
	{
		var tmp=screens[scr].rows[row][sect].sect_elems[sect_elem+1];
		screens[scr].rows[row][sect].sect_elems[sect_elem+1]=screens[scr].rows[row][sect].sect_elems[sect_elem];
		screens[scr].rows[row][sect].sect_elems[sect_elem]=tmp;
	}
	saveLocal();
	refreshCurrScreen();
}


function changeSectElem(id,scr,row,sect,sect_elem,elem_num)
{
	var elem=this.document.getElementById(id);
	screens[scr].rows[row][sect].sect_elems[sect_elem][section_elem_defs[screens[scr].rows[row][sect].sect_elems[sect_elem].type].elem_list[elem_num].elem_name]=elem.value;
	saveLocal();
}

function changeSectSelElem(id,scr,row,sect,sect_elem,elem_num)
{
	var elem=this.document.getElementById(id);
	screens[scr].rows[row][sect].sect_elems[sect_elem][section_elem_defs[screens[scr].rows[row][sect].sect_elems[sect_elem].type].elem_list[elem_num].elem_name]=elem.selectedIndex;
	saveLocal();
	
}

function HMI_redrawScreenList()
{
	var i,j,k,l;
	var found_out_of_range;
	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	for(i=0;i<screens.length;i++)
	{
		found_out_of_range=false;
		var elem=this.document.getElementById("hmi_screen_"+i);
		for(j=0;j<screens[i].rows.length;j++) // rows
		{
			for(k=0;k<screens[i].rows[j].length;k++)  // sections
			{
				for(l=0;l<screens[i].rows[j][k].sect_elems.length;l++) // section elements
				{
					var obj=screens[i].rows[j][k].sect_elems[l];
					if (obj.type==sect_elem_type.status_ruler)
					{
						var val=evaluateExpression(screens[i].rows[j][k].sect_elems[l].Expression,false);
						
						if ((val>=screens[i].rows[j][k].sect_elems[l].NormalRangleMin)&&
							 (val<=screens[i].rows[j][k].sect_elems[l].NormalRangleMax))
						{
							
						}
						else
						{
							found_out_of_range=true;
						}
					}
				}
			}
		}
		if (found_out_of_range==true)
		{
			elem.style.backgroundColor='red';
		}
		else
		{
			elem.style.backgroundColor='lightgreen';
		}
	}
}

function HMI_redrawCurrentScreen()
{
	var i,j,k;
	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	for(i=0;i<screens[curr_screen].rows.length;i++) // rows
	{
		for(j=0;j<screens[curr_screen].rows[i].length;j++)  // sections
		{
			for(k=0;k<screens[curr_screen].rows[i][j].sect_elems.length;k++) // section elements
			{
				var obj=screens[curr_screen].rows[i][j].sect_elems[k];
				if ((obj.type==sect_elem_type.variable)&&(num_var_iter==0))
				{
					var var_p=findVariable(screens[curr_screen].rows[i][j].sect_elems[k].Destination);
					if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
					{
						var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
						elem.value=ToInt32(var_value_db[var_p.addr/4]);
					}
				}
				if ((obj.type==sect_elem_type.enumeration)&&(num_var_iter==0))
				{
					var var_p=findVariable(screens[curr_screen].rows[i][j].sect_elems[k].Destination);
					if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.state))
					{
						var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
						var l;
						elem.selectedIndex=ToInt32(var_value_db[var_p.addr/4]-screens[curr_screen].rows[i][j].sect_elems[k].StartValue);
					}
				}
				if (obj.type==sect_elem_type.status)
				{
					// check if the expression is a single variable - then we can render integer vs state variable
					var var_p=findVariable(screens[curr_screen].rows[i][j].sect_elems[k].Expression,error_list);
					var error_list=[];
					var val;
					val=evaluateExpression(screens[curr_screen].rows[i][j].sect_elems[k].Expression,false);
					if ((var_p.error==undefined)&&(var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.state))
					{
						if (val<var_db[2].var_list.length)
						{
							val=var_db[2].var_list[val].name;
							
						}
					}
					var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
					elem.innerHTML=val;
				}
				if (obj.type==sect_elem_type.status_ruler)
				{
					var val=evaluateExpression(screens[curr_screen].rows[i][j].sect_elems[k].Expression,false);
					var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
					if ((val>=screens[curr_screen].rows[i][j].sect_elems[k].NormalRangleMin)&&
						(val<=screens[curr_screen].rows[i][j].sect_elems[k].NormalRangleMax))
						{
							elem.parentNode.style.backgroundColor='lightgreen';
						}
						else
						{
							elem.parentNode.style.backgroundColor='red';
						}
					elem.innerHTML=val;
				}

                if (obj.type==sect_elem_type.disp_string)
                {
                    var err_list="";
      				var var_p=findVariable(screens[curr_screen].rows[i][j].sect_elems[k].VarName,err_list);
                    var l;
                    var offset=var_p.addr/4;
                    var str="";
                    var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
                    for(l=0;;l++)
                    {
                        var lg=Math.floor(l/4);
                        var bt=l%4;
                        var val=var_value_db[offset+lg];
                        val=(val>>((bt)*8))&0xff;
                        if (val==0)
                        {
                            break;
                        }
                        str+=String.fromCharCode(val);
                    }
                    elem.innerHTML=str;

                
                }
                if ((obj.type==sect_elem_type.edit_string)&&(num_var_iter==0))
                {
                    var err_list="";
      				var var_p=findVariable(screens[curr_screen].rows[i][j].sect_elems[k].VarName,err_list);
                    var l;
                    var offset=var_p.addr/4;
                    var str="";
                    var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
                    for(l=0;;l++)
                    {
                        var lg=Math.floor(l/4);
                        var bt=l%4;
                        var val=var_value_db[offset+lg];
                        val=(val>>((bt)*8))&0xff;
                        if (val==0)
                        {
                            break;
                        }
                        str+=String.fromCharCode(val);
                    }
                    elem.innerHTML=str;

                
                } 
			}
		}
	}
}


function ScreenPressedButton(scr,row,sect)
{
	var i,j,k;
	var num_buttons=0;
	// assume only one button per page
	// check if there are more then 1 button in this page
	submit_var_list=[];
	curr_subm_var=0;
	for(i=0;i<screens[scr].rows.length;i++)
	{
		for(j=0;j<screens[scr].rows[i].length;j++)
		{
			for(k=0;k<screens[scr].rows[i][j].sect_elems.length;k++)
			{
				var obj=screens[scr].rows[i][j].sect_elems[k];
				if (obj.type==sect_elem_type.button)
				{
					num_buttons++;
				}
			}
		}
	}
	
	if (num_buttons>1)
	{	
		// submit a specific section
		for(k=0;k<screens[scr].rows[row][sect].sect_elems.length;k++)
		{
				var obj=screens[scr].rows[row][sect].sect_elems[k];
				if ((obj.type==sect_elem_type.button)||(obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.edit_string)||(obj.type==sect_elem_type.enumeration))
				{
					if (obj.type==sect_elem_type.variable)
					{
					
						var var_p=findVariable(screens[scr].rows[row][sect].sect_elems[k].Destination);
						if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
						{
							var elem=this.document.getElementById("elem_"+scr+"_"+row+"_"+sect+"_"+k);
							var val=elem.value;
							var enc=[];
							encodeElem(var_p,enc);
							submit_var_list[submit_var_list.length]={enc:enc,val:val};
						}
					}
					if (obj.type==sect_elem_type.enumeration)
					{
						var var_p=findVariable(screens[scr].rows[row][sect].sect_elems[k].Destination);
						if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.state))
						{
							var elem=this.document.getElementById("elem_"+scr+"_"+row+"_"+sect+"_"+k);
							var val=elem.selectedIndex+screens[scr].rows[row][sect].sect_elems[k].StartValue;
							var enc=[];
							encodeElem(var_p,enc);
							submit_var_list[submit_var_list.length]={enc:enc,val:val};
						}
						
					}
					if (obj.type==sect_elem_type.button)
					{
						var var_p=findVariable(screens[scr].rows[row][sect].sect_elems[k].Destination);
						if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
						{
							var enc=[];
							encodeElem(var_p,enc);
							submit_var_list[submit_var_list.length]={enc:enc,val:1};
						}
					}
					if (obj.type==sect_elem_type.edit_string)
					{
						var var_p=findVariable(screens[scr].rows[row][sect].sect_elems[k].VarName);
						{
                            var elem=this.document.getElementById("elem_"+scr+"_"+row+"_"+sect+"_"+k);
							var val=elem.value;
                            var char_arr=[];
                            var long_arr=[];
                            var l;
                            for(l=0;l<val.length;l++)
                            {
                                char_arr[l]=val.charCodeAt(l);
                            }
                            char_arr[char_arr.length]=0;
                            var aligned_len=alignedLen(char_arr.length,4);
                            for(l=0;l<(aligned_len/4);l++)
                            {
                               long_arr[l]=(char_arr[4*l+0]<<0)|
                                               (char_arr[4*l+1]<<8)|
                                               (char_arr[4*l+2]<<16)|
                                               (char_arr[4*l+3]<<24);
								var enc=[];
								encodeElem(var_p,enc);
                                submit_var_list[submit_var_list.length]={enc:enc,val:long_arr[l]};
                            }
						}
					}
				}
			
		}
	}
	else
	{
		// submit all the variable elements of the screen
		for(i=0;i<screens[scr].rows.length;i++)
		{
			for(j=0;j<screens[scr].rows[i].length;j++)
			{
				for(k=0;k<screens[scr].rows[i][j].sect_elems.length;k++)
				{
					var obj=screens[scr].rows[i][j].sect_elems[k];
					if ((obj.type==sect_elem_type.button)||(obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.edit_string)||(obj.type==sect_elem_type.enumeration))
					{
						if (obj.type==sect_elem_type.variable)
						{
						
							var var_p=findVariable(screens[scr].rows[i][j].sect_elems[k].Destination);
							if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
							{
								var elem=this.document.getElementById("elem_"+scr+"_"+i+"_"+j+"_"+k);
								var val=elem.value;
								var enc=[];
								encodeElem(var_p,enc);
								submit_var_list[submit_var_list.length]={enc:enc,val:val};
							}
						}
						if (obj.type==sect_elem_type.enumeration)
						{
							var var_p=findVariable(screens[scr].rows[i][j].sect_elems[k].Destination);
							if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.state))
							{
								var elem=this.document.getElementById("elem_"+scr+"_"+i+"_"+j+"_"+k);
								var val=elem.selectedIndex+screens[scr].rows[i][j].sect_elems[k].StartValue;
								var enc=[];
								encodeElem(var_p,enc);
								submit_var_list[submit_var_list.length]={enc:enc,val:val};
							}
						}
						if (obj.type==sect_elem_type.button)
						{
							var var_p=findVariable(screens[scr].rows[i][j].sect_elems[k].Destination);
							if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
							{
								var enc=[];
								encodeElem(var_p,enc);
								submit_var_list[submit_var_list.length]={enc:enc,val:1};
							}
						}
                        if (obj.type==sect_elem_type.edit_string)
                        {
                            var var_p=findVariable(screens[scr].rows[i][j].sect_elems[k].VarName);
                            {
                                var elem=this.document.getElementById("elem_"+scr+"_"+i+"_"+j+"_"+k);
                                var val=elem.value;
                                var char_arr=[];
                                var long_arr=[];
                                var l;
                                for(l=0;l<val.length;l++)
                                {
                                    char_arr[l]=val.charCodeAt(l);
                                }
                                char_arr[char_arr.length]=0;
                                var aligned_len=alignedLen(char_arr.length,4);
                                for(l=0;l<(aligned_len/4);l++)
                                {
								   long_arr[l]=(char_arr[4*l+0]<<0)|
												   (char_arr[4*l+1]<<8)|
												   (char_arr[4*l+2]<<16)|
												   (char_arr[4*l+3]<<24);
									var enc=[];
									encodeElem(var_p,enc);
									submit_var_list[submit_var_list.length]={enc:enc,val:long_arr[l]};											   
                                }
                            }
                        }
                        
					}
				}
			}
		}
	}
	addAjaxAction(sendSubmitList);
}

function renderSectElem(scr_num,row,sect,sect_elem,rw)
{
	var type=screens[scr_num].rows[row][sect].sect_elems[sect_elem].type;
	var i;
	var outp="";
	var elem=screens[scr_num].rows[row][sect].sect_elems[sect_elem];
	// render each element in its own table
	
	if (rw==true)
	{
		var funcInvStr="showCondMenu(this,"+floatMenuType.hmi_sect_elem+","				+row+","+sect_elem+");";
		outp+="<table>";
		outp+="<TR style=\"height:0.5em;\"></TR>";
		outp+="<TR style=\"border: 1px solid black;\">";
		outp+="<td  bgcolor=#CECEF6 width=\"1px\"  style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\" rowspan=\""+(section_elem_defs[type].elem_list.length+1)+"\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+sect_elem+".</a></td>";

		
		outp+="<TD  bgcolor=Chocolate>Element type:</TD><TD  bgcolor=#F2F2F2>"+sect_elem_type_strings[type].name+"</TD></TR>";
		for(i=0;i<section_elem_defs[type].elem_list.length;i++)
		{
			outp+="<TR style=\"border: 1px solid black;\">";
			
			if (section_elem_defs[type].elem_list[i].disp_name!=undefined)
			{
				outp+="<TD bgcolor=#E6E6E6>"+section_elem_defs[type].elem_list[i].disp_name+"</TD>";
			}
			else
			{
				outp+="<TD bgcolor=#E6E6E6>"+section_elem_defs[type].elem_list[i].elem_name+"</TD>";
			}
			switch(section_elem_defs[type].elem_list[i].type)
			{
				case field_types.num:
				case field_types.str_num:
						outp+="<TD>";
							outp+="<input type=\"text\" size=\""+40+"\" value=\""+elem[section_elem_defs[type].elem_list[i].elem_name]+"\" id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onblur=\"changeSectElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\">";
						outp+="</TD>";
						break;
				case field_types.str_num_var:
						var sect_type;
				      if  ((type==sect_elem_type.status)||(type==sect_elem_type.status_ruler))
						{
							sect_type=expr_types.hmi_expr;
						}
						else
						{
							sect_type=expr_types.hmi_var;
						}
							
						outp+="<TD>";
						if (computer_interface==false)
						{
							outp+="<input type=\"text\" onfocus=\"return showEditBox(this,"+sect_type+","+scr_num+","+row+","+sect_elem+","+i+");\"  size=\""+40+"\" value=\""+escapeHTML(elem[section_elem_defs[type].elem_list[i].elem_name])+"\" id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onblur=\"changeSectElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\">";
						}
						else
						{
							outp+="<input type=\"text\" onkeydown=\"return actOnKeyDown(event,"+sect_type+");\"   size=\""+40+"\" value=\""+escapeHTML(elem[section_elem_defs[type].elem_list[i].elem_name])+"\" id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onblur=\"changeSectElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\">";
						}
						
						outp+="</TD>";
						break;
				case field_types.state_enum:
					    outp+="<TD>";
						var j,val;
						outp+="<select id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onchange=\"changeSectSelElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\"  >";
						val=elem[section_elem_defs[type].elem_list[i].elem_name];
						for(j=0;j<var_db[2].var_list.length;j++)
						{
							if (j==val)
							{
								outp+="<option selected>"+var_db[2].var_list[j].name;
							}
							else
							{
								outp+="<option>"+var_db[2].var_list[j].name;
							}
						}
						outp+="</select></td>";
						break;
						
					  
			}
			outp+="</TR>";
		}
		/*outp+="<TR style=\"border: 1px solid black;\">"
			outp+="<TD colspan=\"2\">";
				outp+="<button type=\"button\" onclick=\"DeleteSectElem("+scr_num+","+row+","+sect+","+sect_elem+");\">Delete Element</button>";	
				outp+="<button type=\"button\" onclick=\"MoveUpSectElem("+scr_num+","+row+","+sect+","+sect_elem+");\">Move Up</button>";	
				outp+="<button type=\"button\" onclick=\"MoveDownSectElem("+scr_num+","+row+","+sect+","+sect_elem+");\">Move Down</button>";	
				

			outp+="</TD>";
		outp+="</TR>"*/
		outp+="</table>"
	}
	else
	{	
		outp+="<TR>";
		switch(type)
		{
			
			case sect_elem_type.button:
				outp+="<TD colspan=2 style=\"border: 1px solid black;\">";
				outp+="<center>";
				outp+="<button type=\"button\" onclick=\"ScreenPressedButton("+scr_num+","+row+","+sect+","+sect_elem+");\">"+screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name+"</button>";
				outp+="</center>";
				outp+="</td>"
				break;
			case sect_elem_type.status:
				var val=evaluateExpression(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Expression,false);
				outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
				outp+="</TD>"
				outp+="<TD  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				outp+="<div style=\"float: left;\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">"+val+"</div>&nbsp&nbsp";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Units;
				outp+="</TD>"
				break;
			case sect_elem_type.status_ruler:
				var val=evaluateExpression(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Expression,false);
				outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
				outp+="</TD>"
				if ((val>=screens[scr_num].rows[row][sect].sect_elems[sect_elem].NormalRangleMin)&&
				    (val<=screens[scr_num].rows[row][sect].sect_elems[sect_elem].NormalRangleMax))
				{
					outp+="<TD bgcolor=lightgreen  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				}
				else
				{
					outp+="<TD bgcolor=red  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				}
				outp+="<div style=\"float: left;\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">"+val+"</div>&nbsp&nbsp";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Units;
				outp+="</TD>"
				break;
			case sect_elem_type.variable:
				var var_p=findVariable(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Destination);
				if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.integer))
				{
				
					outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
					outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
					outp+="</TD>"
					outp+="<TD  style=\"padding-left:0.5em; border: 1px solid black;\">";
					outp+="<input type=\"text\" size=\""+10+"\" value=\""+var_value_db[var_p.addr/4]+"\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">&nbsp&nbsp";
					outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Units;
					outp+="</TD>"
				}
				break;
			case sect_elem_type.enumeration:
				var var_p=findVariable(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Destination);
				
				if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_prg.state))
				{
					var val;
					outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
					outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
					outp+="</TD>"
					outp+="<TD  style=\"padding-left:0.5em; border: 1px solid black;\">";
			
					outp+="<select id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\" >";
					val=var_value_db[var_p.addr/4];
					for(j=screens[scr_num].rows[row][sect].sect_elems[sect_elem].StartValue;j<=screens[scr_num].rows[row][sect].sect_elems[sect_elem].EndValue;j++)
					{
						if (j==val)
						{
							outp+="<option selected>"+var_db[2].var_list[j].name;
						}
						else
						{
							outp+="<option>"+var_db[2].var_list[j].name;
						}
					}
					outp+="</select></td>";
				}
				break;
				
            case sect_elem_type.disp_string:
                var err_list="";
				var var_p=findVariable(screens[scr_num].rows[row][sect].sect_elems[sect_elem].VarName,err_list);
                var i;
                var offset=var_p.addr/4;
                var str="";
                for(i=0;;i++)
                {
                    var lg=Math.floor(i/4);
                    var bt=i%4;
                    var val=var_value_db[offset+lg];
                    val=(val>>((bt)*8))&0xff;
                    if (val==0)
                    {
                        break;
                    }
                    str+=String.fromCharCode(val);
                }
                    
				outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
				outp+="</TD>"
				outp+="<TD  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				outp+="<div style=\"float: left;\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">"+str+"</div>&nbsp&nbsp";
				outp+="</TD>"
				break;
            case sect_elem_type.edit_string:
                var err_list="";
				var var_p=findVariable(screens[scr_num].rows[row][sect].sect_elems[sect_elem].VarName,err_list);
                var i;
                var offset=var_p.addr/4;
                var str="";
                for(i=0;;i++)
                {
                    var lg=Math.floor(i/4);
                    var bt=i%4;
                    var val=var_value_db[offset+lg];
                    val=(val>>((bt)*8))&0xff;
                    if (val==0)
                    {
                        break;
                    }
                    str+=String.fromCharCode(val);
                }
                    
				outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
				outp+="</TD>"
				outp+="<TD  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
                outp+="<input type=\"text\" size=\""+10+"\" value=\""+str+"\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">&nbsp&nbsp";
				outp+="</TD>"
				break;                
		}
		outp+="</TR>";
	}
	return outp;
}

function renderScreenView(outp,scr_num)
{
	var i,j,k;

	//style=\"background:FFFFCC; \"
	outp="";
	outp+="<center><table style=\"width:33%; border-collapse:collapse; \">";
	outp+="<TR><TD><center>";
	
	//outp+="<fieldset style=\"padding:20px; background:#FFFFcc;\" >";
	outp+="<fieldset style=\"padding:20px; background:#F2F2F2;\" >";
	outp+="<H2>"+screens[scr_num].name+"</h2><br>"
	outp+="<table style=\"border-collapse:collapse;\">";   
	for(i=0;i<screens[scr_num].rows.length;i++)
	{
		
		//outp+="<TR style=\"border: 1px solid black;\">";	
		//outp+="<TR>";	
		j=0;
		//for(j=0;j<screens[scr_num].rows[i].length;j++)
		{
			//outp+="<TD>";
			//#CCFFFF
			outp+="<TR style=\"height:2em;\"></TR>";
			outp+="<TR style=\"height:2em;\"><TD colspan=\"2\"><b>"+screens[scr_num].rows[i][j].name+"</B></TD></TR>";
			//outp+="<fieldset style=\"background:#FFCC00;\"><legend ><B>"+screens[scr_num].rows[i][j].name+"</B></legend>";
			//outp+="<fieldset style=\"background:lightgrey;\"><legend  ><B>"+screens[scr_num].rows[i][j].name+"</B></legend>";
			//outp+="<table style=\"border-collapse:collapse;\">";   
				for(k=0;k<screens[scr_num].rows[i][j].sect_elems.length;k++)
				{
					//outp+="<TR style=\"border: 1px solid black;\">";	
					outp+=renderSectElem(scr_num,i,j,k,false);
					//outp+="</TR>";	
				}
			//outp+="</table>";
			//outp+="</fieldset>"
			//outp+="</TD>";	
			//outp+="<TD style=\"width:20px;\">";
			//outp+="</TD>";
		}
		//outp+="</TR>";	
		
		//outp+="<br><br>";	
	}
	outp+="</table>";
	outp+="</fieldset>";
	outp+="</center></TD></TR></table></center>";
	return outp;


}

function renderScreen(outp,scr_num,edit)
{
	var i,j,k;

	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	
	if (edit==false)
	{	
		return renderScreenView(outp,scr_num);
	}
	
	outp="";
	outp+="<center>";
	outp+="<table style=\"width:33%; border-collapse:collapse; \">";
	outp+="<TR><TD><center>";
	//outp+="<fieldset style=\"background:#E2E2E2; \">";
	outp+="<H2>"+screens[scr_num].name+"</h2><br>"
	
	outp+="<table style=\"border-collapse:collapse;\">";   
	
	for(i=0;i<screens[scr_num].rows.length;i++)
	{
		outp+="<TR style=\"height:20px;\">";
		outp+="</TR>";
		//outp+="<TR style=\"border-top:1px solid black; border-left:1px solid black; border-right: 1px solid black;\">";	
		outp+="<TR style=\"border:1px solid black;\">";	
		//for(j=0;j<screens[scr_num].rows[i].length;j++)
		j=0;
		{
					var funcInvStr="showCondMenu(this,"+floatMenuType.hmi_section+","				+i+","+0+");";
		outp+="<td rowspan=\"3\" bgcolor=#CECEF6 width=\"1px\"  style=\"border-right: 1px solid black;padding-left:5px; padding-right:5px;\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+i+".</a></td>";
					outp+="<TD bgcolor=#CECEF6 style=\" padding-left:5px;  vertical-align: top;\">Section Name: </TD>";
					outp+="<TD bgcolor=#CECEF6 style=\" padding-right:5px; \">";
					//padding-right:5px;border-right: 1px solid black; vertical-align: top; 
					outp+="<input type=\"text\" size=\""+20+"\" value=\""+screens[scr_num].rows[i][j].name+"\" id=\""+"screen_section_name"+"_"+scr_num+"_"+i+"_"+j+"\" onblur=\"screenSectionNameChange(this.id,"+scr_num+","+i+","+j+")\">";
					outp+="</TD>"
					outp+="</TR>";
					/*outp+="<TR style=\"border-bottom:1px solid black; border-left:1px solid black; border-right: 1px solid black;\" >";	
					outp+="<TD colspan=\"3\" bgcolor=#CECEF6 style=\" vertical-align: top;\">";
					outp+="<br><button type=\"button\" onclick=\"DelSection("+scr_num+","+i+","+j+");\">Delete Section</button>";
					outp+="<button type=\"button\" onclick=\"MoveUpSection("+scr_num+","+i+","+j+");\">Move Up</button>";

					outp+="<button type=\"button\" onclick=\"MoveDownSection("+scr_num+","+i+","+j+");\">Move Down</button>";
					outp+="</TD>";	
				outp+="</TR>";*/
				outp+="<TR style=\"border: 1px solid black;\">";
				outp+="<TD bgcolor=#F6E3CE colspan=\"2\">";
				
				for(k=0;k<screens[scr_num].rows[i][j].sect_elems.length;k++)
				{
					outp+=renderSectElem(scr_num,i,j,k,edit);
				}
				outp+="</td></tr>"
				outp+="<TR style=\"border: 1px solid black;\">";
				outp+="<TD bgcolor=#F6E3CE colspan=\"2\">";
				outp+=renderAddElemButton(scr_num,i,j);
				outp+="</TD>";	
				outp+="</TR>";
			// add section button on each row
			/*outp+="<TD style=\"width:20px;\">";
			outp+="</TD>";
			*/
		}
		/*outp+="<TD bgcolor=#F6E3CE >";
		outp+="<button type=\"button\" onclick=\"AddSection("+scr_num+","+i+");\">Add Section</button>";
		outp+="</TD>";		
		*/
	}
	outp+="</table>";
	
	outp+="<br><br><button type=\"button\" onclick=\"AddSection("+scr_num+","+(0xffff)+");\">Add Section</button><br><br><br>";
	//outp+="</fieldset>";
	
	outp+="</center></TD></TR>";
	outp+="</table></center>";
	
	
	return outp;
}

function hmiEdit()
{
	redrawScreenList();
	if (screens.length>0)
	{
		EditScreen(0);
	}
	else
	{
		prog_div.innerHTML="";
	}
}

var mode_selection=
{
	prog_view:0,
	debug_view:1,
	hmi_editor:2,
	hmi_view:3
};

function mode_select(mode)
{
	return false;
}


/*var view_tabs=
[
	{name:"Program View",renderFunc:ProgView,sub_elems:
			[
				{name:"New Project",renderFunc:clearProject},
				{name:"Edit Code",renderFunc:ProgView},
				{name:"Edit HMI Screens",renderFunc:hmiEdit},
				{name:"Import/Export project into Text file ",renderFunc:ImpExp}
			]
	},
	{name:"Debug View",renderFunc:DebugView,sub_elems:[]},
	{name:"HMI View",renderFunc:DrawHMIScreenList,sub_elems:[]}
];
*/	


function refreshCurrScreen()
{
	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	var outp="";
	prog_div.innerHTML=renderScreen(outp,curr_screen,true);
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: HMI Edit/Rendering functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


var cont_menu_div;
var nav_div;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Top level menu structure and rendering functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//var_display=false;

// no render function - last rendered screen is preserved
// the first time the main menu is loaded - it shows the help screen.
var menu_system=
[
	{name:"Project",linked_elems:["<I>Edit Code</I>","Import/Export","<I>New Project</I>","Settings","<I>Run Without Source</I>"],renderFunc:ImpExp},
	{name:"Import/Export",linked_elems:["<I>Edit Code</I>"], tablet_elems:["<I>Edit Code</I>"], renderFunc:ImpExp},
	{name:"Import/Export ",linked_elems:["<I>Edit</I>"], tablet_elems:["<I>Edit</I>"],renderFunc:ImpExp},
	{name:"Settings",renderFunc:renderSettings},
	{name:"Initial Settings",linked_elems:["Settings"],renderFunc:renderSettings},
	{name:"<I>New Project</I>",renderFunc:clearProject},
	{name:"Code",linked_elems:["<I>Edit Code</I>","<I>Test <I>"],renderFunc:ProgView},
	{name:"Initial",linked_elems:["Edit Vars","<I>Run </I>","Edit HMI","About "], tablet_elems:["<I>Run </I>","<I>Test </I>","Edit HMI","View HMI","Project","About "]},
	{name:"<I>Edit Code</I>",linked_elems:["Edit Vars","<I>Run </I>","Edit HMI","About "], tablet_elems:["<I>Run </I>","<I>Test </I>","Edit HMI","View HMI","Project","About "], renderFunc:ProgView},
	{name:"Edit Vars",linked_elems:["<I>Edit Code</I>","<I>Run </I>"], renderFunc:VarView},
	{name:"<I>Test </I>",linked_elems:["Debug Vars","View HMI"],tablet_elems:["<I>Edit Code</I>","View HMI","<I>Modify Variables</I>"], renderFunc:CodeDebugView},
	{name:"Debug Vars",linked_elems:["<I>Test <I>","View HMI"], renderFunc:VarDebugView},
	{name:"<I>Run </I>", renderFunc:compileProject},
    {name:"<I>Run Without Source</I>", renderFunc:compileProjectWihtoutSource},
	{name:"HMI",linked_elems:["Edit HMI","View HMI"], renderFunc:DrawHMIScreenList},
	{name:"View HMI",linked_elems:["View Screen List"], tablet_elems:["<I>Edit Code</I>","Edit HMI"], renderFunc:DrawHMIScreenList},
    {name:"HMI",linked_elems:["View Screen List"], tablet_elems:["HMI"], renderFunc:DrawHMIScreenList},
	{name:"View Screen List", renderFunc:DrawHMIScreenList},
	{name:"Edit HMI",linked_elems:["Edit Screen List","<I>Run </I>"], tablet_elems:["<I>Edit Code</I>","View HMI","<I>Run </I>"], renderFunc:redrawScreenList},
	{name:"Edit Screen List", renderFunc:redrawScreenList},
	{name:"Flowchart_init",linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], tablet_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"]},
	{name:"Flowchart",linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], tablet_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], renderFunc:showFlowchart},
	{name:"Convert to ARGEE", renderFunc:convertToArgee},
	{name:"About", tablet_elems:["<I>Edit</I>"],  renderFunc:aboutPage},
	{name:"About ", tablet_elems:["<I>Edit Code</I>"], renderFunc:aboutPage},
	{name:"<I>Run</I>", renderFunc:runFlowchart},
	{name:"<I>Test</I>", linked_elems:["<I>Edit</I>"], tablet_elems:["<I>Edit</I>"],renderFunc:testFlowchart},
	{name:"<I>Edit</I>", linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"],renderFunc:showFlowchart},
	{name:"init_scr", tablet_elems:["<I>Apply and Back to Code</I>"]},    
    {name:"<I>Apply and Back to Code</I>", renderFunc:runApplyInit},
	{name:"<I>Modify Variables</I>",tablet_elems:["<I>Finish Modifications</I>"], renderFunc:modifyVars},
	{name:"<I>Finish Modifications</I>",tablet_elems:["<I>Edit Code</I>","View HMI","<I>Modify Variables</I>"], renderFunc:finishVarModif},
];


function doNothing()
{


}

function renderMenu(level_name)
{
	var i,j;
	var elem;
	elem=this.document.getElementById("nav_inner");
	
    
	for(i=0;i<menu_system.length;i++)
	{
		if (menu_system[i].name==level_name)
		{
			if (menu_system[i].renderFunc!=undefined)
			{
				if (menu_system[i].renderFunc()==false)
				{
					return;
				}
			}
			if ((side_by_side==true)&&(menu_system[i].tablet_elems!=undefined))
			{
				var nav="";
				// render submenu
				nav+="<ul id=\"nav_list\">";
				//nav+="<li><p>"+real_DeviceName+"&nbsp<b><u>Menu:</u></b></p></li>";

				
				for(j=0;j<menu_system[i].tablet_elems.length;j++)
				{
					   var func=" renderMenu(\'"+menu_system[i].tablet_elems[j]+"\');"
						nav+="<li><a href=\"javascript:"+func+"\" onclick=\"return"+func+" \"><b>"+menu_system[i].tablet_elems[j]+"</b></li>";
				}
				nav+="</ul>";
				elem.innerHTML=nav;
			}
			else if (menu_system[i].linked_elems!=undefined)
			{
				var nav="";
				// render submenu
				nav+="<ul id=\"nav_list\">";
				//nav+="<li><p>"+real_DeviceName+"&nbsp<b><u>Menu:</u></b></p></li>";
				for(j=0;j<menu_system[i].linked_elems.length;j++)
				{
					   var func=" renderMenu(\'"+menu_system[i].linked_elems[j]+"\');"
						nav+="<li><a href=\"javascript:"+func+"\" onclick=\"return"+func+" \"><b>"+menu_system[i].linked_elems[j]+"</b></li>";
				}
				nav+="</ul>";
				elem.innerHTML=nav;
			}
		}
	}
	return false;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Top level menu structure and rendering functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	
//var side_by_side=false;
var side_by_side=true;
var left_col_width=33;
var computer_interface=false;


//http://stackoverflow.com/questions/566203/changing-css-values-with-javascript
function css(selector, property, value) 
{
    for (var i=0; i<document.styleSheets.length;i++) {//Loop through all styles
        //Try add rule
        try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
        } catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
    }
}

var requested_ip="";
var device_name_div;
var first_sim_compilation=false;

function continueInit()
{


	var outp;
	var settings;
	var first_time_setup;
	var var_div1,nav;
	var i;
	
	
	//var newdiv=.document.createElement("div");
	prog_div=this.document.getElementById("prog");
	cont_menu_div=this.document.getElementById("cont_menu");
	men_div=this.document.getElementById("sup_men");
	var_div1=this.document.getElementById("vars");
	nav=this.document.getElementById("navigation");
	
	
	prog_div.style.visibility = 'visible';
	var_div1.style.visibility = 'visible';	
	men_div.style.visibility = 'visible';	
	nav.style.visibility = 'visible';
	
	location.hash='#no-back';
	
	
	var history_api = false;//typeof history.pushState !== 'undefined'

// The previous page asks that it not be returned to
if ( location.hash == '#no-back' ) {
  // Push "#no-back" onto the history, making it the most recent "page"
  if ( history_api ) history.pushState(null, '', '#stay')
  else location.hash = '#stay'

  // When the back button is pressed, it will harmlessly change the url
  // hash from "#stay" to "#no-back", which triggers this function
  window.onhashchange = function() {
    // User tried to go back; warn user, rinse and repeat
    if ( location.hash == '#no-back' ) {
      //alert("You shall not pass!")
		var act_menu=window.document.getElementById("act_menu");
		if (act_menu.style.display!="none")
		{
			hideCondMenu();
		}
		
		if (edit_box_rendered==true) 
		{
			handleEditBoxDone(false);
		}
		
      if ( history_api ) history.pushState(null, '', '#stay')
      else location.hash = '#stay'
    }
  }
}
	
	
	if ((localStorage.settings!=undefined)&&(localStorage.settings!="undefined"))
	{
		first_time_setup=false;
		settings=JSON.parse(localStorage.settings);
        settings[0]=interf_types.computer;
		if (settings[2]==1)
		{
			var set=clone(settings);
			set[2]=0;
			localStorage.settings=JSON.stringify(set);
		}
		if (settings[0]==interf_types.smartphone)
		{
			side_by_side=false;
			left_col_width=0;
		}
		else
		{
			side_by_side=true;
			left_col_width=settings[1];
		}
	}
	else
	{
		settings=[0,40,0];
		localStorage.settings=JSON.stringify(settings);
		first_time_setup=true;
	}
	
	
	computer_interface=false;
	if (settings[0]==interf_types.computer)
	{
		computer_interface=true;
	}


	if (computer_interface==false)
	{
		document.body.ontouchend=mouseDownHandler;
	}
	else
	{
		document.body.onmousedown=mouseDownHandler;
	}
	
	
	if (side_by_side==false)
	{
		var_div=prog_div;
		prog_div.style.width="99%"
		prog_div.style.left="5px";
		prog_div.style.right="99%";
		this.document.getElementById("vars").style.display="none";
		css("ul#nav_list li a",	"font-size","14px");
	}
	else
	{
		var_div=this.document.getElementById("vars");
		prog_div.style.width=(100-left_col_width)+"%";
		var_div.style.width=(left_col_width-1)+"%";
		prog_div.style.left=left_col_width+"%";
		var_div.style.left="5px";
		var_div.style.right=left_col_width+"%";
	}
		
		
		
		
	var_context_menu_div=this.document.getElementById("vars_context_menu");
	nav_div=this.document.getElementById("navigation");
	
	
	
	nav_div.innerHTML="<div id=\"nav_dev\"></div><div id=\"nav_inner\"></div><div style=\"text-align: center;\" id=\"comp_res_id\"></div>";
	
	device_name_div=this.document.getElementById("nav_dev");
	device_name_div.style.fontSize="16px";	
	device_name_div.style.color="#003300";
	device_name_div.style.opacity="0.7";
	device_name_div.style.paddingRight="1em";
	device_name_div.style.paddingTop="0.2em";
	device_name_div.style.textAlign="right";
	
	//css("p#nav_dev","margin: 0em; display: inline-block; font-size:14px;   text-decoration:none; top:0px;  padding:0px 0.4em 0px 0.4em; color:black;  float:left;text-align:center;  border-left:1px solid red; border-right:1px solid red;");
	device_name_div.innerHTML="<b>"+real_DeviceName+"</b>&nbsp&nbsp (<b>"+requested_ip+"</b>)";
	
	
        
    
	if (first_time_setup==false)
	{
	    if (hmi_only_mode==true)
		{
			renderMenu("HMI_Initial");
		}
		else
		{
			renderMenu("Initial");
		}
	}
	else
	{
		renderMenu("Initial Settings");
	}

	
	/*<ul id=\"nav_list\">"+
						   "<li><a href=\"#\"><b>Home</b></a></li>"+
						   "<li><a href=\"#\"><b>About Us</b></a></li>"+
							"<li><a href=\"#\"><b>Services</b></a></li>"+
						   "<li><a href=\"#\"><b>Products</b></a></li>"+
						   "<li><a href=\"#\"><b>Contact</b></a></li></ul>";
							*/

	
	//this.frames[1].frames[2].document.getElementById("status_div").innerHTML="<fieldset ><legend>Status</legend><textarea  style=\"width:100%;height:100%;\"  id=\"compiled\"></textarea></fieldset>";

	//padding:0.3em 0.4em 0.3em 0.4em;
	comp_res=this.document.getElementById("comp_res_id");
	
	

	if (first_time_setup==true)
	{
		return;
	}

    
        

	
	startAjaxTimer();	


    if (hmi_only_mode==false)
    {
        redrawVars(true,false);
        
        men_div.innerHTML="";
        prog_div.innerHTML="<h2> ARGEE Program </h2><br>"+add_cond_str;
    }

    
    
    if (hmi_only_mode==true)
    {
		if ((localStorage.var_db!=undefined)&&(localStorage.cond_db!=undefined)&&(localStorage.screens!=undefined))
		{
			var r=confirm("Project not saved - If you press \"OK\" all changes will be erased!\n Press \"OK\" to continue");
            if (r==true)
            {
                DownloadProg();	
            }
			else
			{
				return;
			}
		}
		else
		{
			DownloadProg();	
		}
        
    }
	else
    {
        if ((localStorage.var_db!=undefined)&&(localStorage.cond_db!=undefined)&&(localStorage.screens!=undefined))
        {
            if (settings[2]==1)
            {
                loadLastSavedProject();
                
                DownloadStationConfig();
                
            }
            else
            {
				if ((localStorage.firstSimStart!=undefined)&&(localStorage.firstSimStart=="true"))
				{
					delete localStorage.firstSimStart;
					loadLastSavedProject();
					DownloadStationConfig();					
					first_sim_compilation=true;
					compileProject(false,true);
				}
				else if ((localStorage.firstSimImport!=undefined)&&(localStorage.firstSimImport=="true"))
				{
					loadLastSavedProject();
					DownloadStationConfig();					
				}
				else
				{
					var r=confirm("Project not saved - load from localStorage");
					if (r==true)
					{
						comp_res.innerHTML="Download status:Loaded from localStorage";
						loadLastSavedProject();
						DownloadStationConfig();
					}
					else
					{
						DownloadProg();	
					}
				}
            }
        }
        else
        {
            DownloadProg();	
        }
    }
}


var hmi_only_mode=false;
var sim_mode=false;

function getDipatchingEnvironmentLocation()
{
	var str=window.location.toString();
	str=str.split("/Earlier_Environments/");
	if (str.length!=1)
	{
		str[0]=str[0]+"/Start ARGEE Programming Environment.html";
		return str[0];
	}
	return null;
}
			
function testFrame(pg)
{

	var outp;
	var settings;
	var first_time_setup;
	var var_div1,nav;
	var i;

	invokeCompilation=false;	

	if ((pg==1)&&(getDipatchingEnvironmentLocation()!=null)&&(localStorage.redirectIP==undefined))
	{
		window.location=getDipatchingEnvironmentLocation();
		return;
	}

	
	for (i=0;i<100;i++)
   {
      msg_id_enum[i]=i.toString();
   }


   if (lib_supported==true)
   {
        max_loadable_prog_size=32*1024;
        act_desc[act_desc.length]=
            {name:"Invoke Procedure",
                 color: "#F2F2F2  ",
                 template:{help:"",procedure:""},
                 field_list:
                 [
                    {name:"help",field_size:10,type:field_types.str_num,display_name:"Help",editable:false},
                    {name:"procedure",field_size:10,type:field_types.str_num,display_name:"Procedure"},
                 ]
                };
    }
   

	
	
	
	//var newdiv=.document.createElement("div");
	prog_div=this.document.getElementById("prog");
	cont_menu_div=this.document.getElementById("cont_menu");
	men_div=this.document.getElementById("sup_men");
	var_div1=this.document.getElementById("vars");
	nav=this.document.getElementById("navigation");
	
	
	prog_div.style.visibility = 'hidden';
	var_div1.style.visibility = 'hidden';	
	men_div.style.visibility = 'hidden';
	nav.style.visibility = 'hidden';
	var def_ip="192.168.1.200";
	

	
	if ((localStorage.def_ip!=undefined)&&(localStorage.def_ip!=null)&&(localStorage.def_ip!=""))
	{
		def_ip=localStorage.def_ip;
	}
	
	
	var ip=def_ip;	
	
	if (localStorage.redirectIP!=undefined)
	{
		ip=localStorage.redirectIP;
		delete localStorage.redirectIP;
	}
	else
	{
		if (pg!=2)
		{
			ip=prompt("Enter ARGEE Device IP Address",def_ip);
		}
	}
	
	if ((ip==null)||(ip==""))	
	{
		prog_div.innerHTML="<h1>IP Address not entered</h1>";
		return;
	}
	localStorage.def_ip=ip;
	requested_ip=ip;
	url_prefix="http://"+ip;
    lib_struct=clone(lib_struct_template);
    
    
    if (pg==0)
    {
        hmi_only_mode=true;
    }

	
	
	if (pg==2)
	{
		if (localStorage.simDevSelect==undefined)
		{
			prog_div.style.visibility = 'visible';
			prog_div.style.width="99%";
			prog_div.innerHTML=sim_RenderDeviceSelection();
			return;
		}
		else
		{
			simDevInit();
		}
		sim_mode=true;
		invocation = sim_AjaxObj;
		sim_startAjax();
	}
	//else
	{
		
		if (hmi_only_mode==true)
		{
			Download_ARGEE_KernelVersion();
		}
		else
		{
			StartLogin(Download_ARGEE_KernelVersion);
		}
	}
	
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
