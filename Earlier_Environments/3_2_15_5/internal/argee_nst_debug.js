
var ARGEE_nst_debug=(function()
{ 

var globals=null;
var compiled_program_len;
var compiled_program_DataView;



var process=ARGEE_nst_process;
var parse=ARGEE_nst_parse;
var gen=ARGEE_nst_code_gen;
var prog_start_offset;

var findVarElem=ARGEE_nst_process.findVarElem;
var findFunctBlock=ARGEE_nst_process.findFunctBlock;
var stopCompilation=ARGEE_nst_parse.stopCompilation;
var ELEM=ARGEE_nst_parse.ELEM;
var token_types=ARGEE_nst_parse.token_types;
var VAR_REF=process.VAR_REF;
var breakpoints_on_lines=[];


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}	


function debug()
{
	GOM.setObjNum("GOTO_LINE",0,-1);
	DEB_elem_tree=[];
	curr_prog_trace=[];
	pause_trace=0;
	DEB_elem_tree=DEB_CreateAstGlobMemoryMap(globals.list[0],[],0);
	addStatusDescrToDeb();
	add_OtherDescrToDeb();
	DEB_ReorgVarDispTree(DEB_elem_tree);
	if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.ARGEE)
	{
		ARGEE_elem_descr.renderProg();
	}
	adjustMenuScreen(1);

	var_div.innerHTML="<center><h2> Runtime Status </h2></center><div class=\"css-treeview\"><ul><div id=\"vars_inner\"></div></ul></div>"	
	var var_div_inner=window.document.getElementById("vars_inner");

	var_div_inner.innerHTML=renderDebugTree(DEB_elem_tree);
	

	var tmp=1;
	//DEB_ClearCodeHighlights();
/*	var res_inner=window.document.getElementById("comp_res_id");
	res_inner.innerHTML="Program Size: "+compiled_program_len+" bytes";
	*/
	//showAssemly();
	prog_compiled=true;
}

function getGlobals()
{
	return globals;
}



function prepareDebElems(glob)
{
	globals=glob;
	
	DEB_func_memory_map=[];
	asm_addr_to_ast=[];
	DEB_breakpoints=[];
	new_break_hit=true;
	DEB_Exception=false;
	DEB_prev_vars=null;
	DEB_elem_tree_id_cnt=0;
	DEB_elem_tree=[];
	DEB_auto_update_var_list=[];
	
	//clearCurrHighlights();
	compiled_program_len=ARGEE_nst_code_gen.GetCompiledProgLen();
	compiled_program_DataView=ARGEE_nst_code_gen.GetCompiledDataview();
	fillAsmToAST_Mapping(globals);
	createUniqueLineActionList();
	DEB_ConvertToNST_Breakpoints();
	createUserBreakPointList();
	createPatchedCode(DEB_breakpoints,null,CMD.SET_CLEAR);
	prog_start_offset=process.getProgStartOffset();
}

function RunProg(glob)
{
	prepareDebElems(glob);
	GOM.addAjaxAction(ARGEE_misc_transf_func.UploadProg);
	
}

function TestProg()
{
	
	ARGEE_elem_descr.setDebugMode(true);
	debug();
	if (prog_compiled==true)
	{
		GOM.autoRefreshStart(downloadProgElements);
	}
}

function StopDebug()
{
	prog_compiled=false;
	GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
	ARGEE_elem_descr.setDebugMode(false);
}
	


var asm_addr_to_ast=[];

function fillAsmToAST_Mapping(ast)
{
	var i;
	if (ast.asm_begin!=undefined)
	{
		asm_addr_to_ast[asm_addr_to_ast.length]=ast;
	}
	if (ast.list==undefined)
	{
	}
	else
	{
		for(i=0;i<ast.list.length;i++)
		{
			fillAsmToAST_Mapping(ast.list[i]);
		}
	}
}

var DEB_patch_list_for_line_actions=[];

function createUniqueLineActionList()
{
	var i,j,curr;
	var tmp_map=asm_addr_to_ast.slice(0);
	DEB_patch_list_for_line_actions=[];
	for(i=0;i<tmp_map.length;i++)
	{
		DEB_patch_list_for_line_actions[DEB_patch_list_for_line_actions.length]=tmp_map[i];
		var found=true;
		while(found)
		{
			found=false;
			for(j=0;j<tmp_map.length;j++)
			{
				if (i!=j)
				{
					if (tmp_map[i].line_num==tmp_map[j].line_num)
					{
						tmp_map.splice(j,1);
						found=true;
						break;
					}
				}
			}
		}
	}
}

function findAstByAddr(addr)
{
	var i;
	for(i=0;i<asm_addr_to_ast.length;i++)
	{
		if ((asm_addr_to_ast[i].asm_begin<=addr)&&(asm_addr_to_ast[i].asm_end>=addr))
		{
			return 	asm_addr_to_ast[i];
		}
	}
}

function findAstByLine(line)
{
	var i;
	for(i=0;i<asm_addr_to_ast.length;i++)
	{
		if (asm_addr_to_ast[i].line_num==line)
		{
			return asm_addr_to_ast[i];
		}
	}
	return null;
}

//var patched_debug_code;
//var debug_restore_elem;


// start_addr==null -> no changes to the patch list
function createPatchedCode(patch_addr_list,start_addr,cmd)
{
	var i,offset;
	var dv_patched_debug_code;
	var curr_position_break=new ArrayBuffer(4);
	var dv_curr_position_break=new DataView(curr_position_break);
	
	GOM.setObjArr("ARGEE_PATCHED_CODE_STORAGE",0,GOM.getObjArr("ARGEE_RUN_CODE",0));
	var dv_patched_debug_code=GOM.getValDataView("ARGEE_PATCHED_CODE_STORAGE",0);
	var dv_curr_code=GOM.getValDataView("ARGEE_RUN_CODE",0);
	var breakpoint_jmp_addr=GEN.getBreakpointJmpAddr();
	var conv_tmp=new ArrayBuffer(4);
	var conv_tmp_dv=new DataView(conv_tmp);


	
	if (start_addr!=null)
	{
		dv_curr_position_break.setUint32(0,dv_patched_debug_code.getUint32(start_addr,true),true);
	}
	
	
	for(i=0;i<patch_addr_list.length;i++)
	{
		var rel_jmp=breakpoint_jmp_addr-patch_addr_list[i].asm_begin;
		rel_jmp-=4;
		conv_tmp_dv.setInt32(0,rel_jmp,true);
		var conv;
		conv=conv_tmp_dv.getUint32(0,true);
		conv>>=1;
		var S=0,tmp;
		if (rel_jmp<0)
		{
			S=1;
		}
		tmp=(conv&0x7ff)|(0x1f<<11)|(((conv>>11)&0x3ff)<<16)|(S<<26)|(0xf<<28);

		var data=[];
		var pos=patch_addr_list[i].asm_begin;
		data[0]=(tmp>>0)&0xff;
		data[1]=(tmp>>8)&0xff;
		data[2]=(tmp>>16)&0xff;
		data[3]=(tmp>>24)&0xff;
		if (start_addr!=patch_addr_list[i].asm_begin)
		{
			dv_patched_debug_code.setUint8(pos+2,data[0]);
			dv_patched_debug_code.setUint8(pos+3,data[1]);
			dv_patched_debug_code.setUint8(pos+0,data[2]);
			dv_patched_debug_code.setUint8(pos+1,data[3]);
		}
		else
		{
			dv_curr_position_break.setUint8(2,data[0]);
			dv_curr_position_break.setUint8(3,data[1]);
			dv_curr_position_break.setUint8(0,data[2]);
			dv_curr_position_break.setUint8(1,data[3]);
		}
			
	}
	
	{
		
		debug_restore_elem=new ArrayBuffer(7);
		var debug_restore_elem_dv=new DataView(debug_restore_elem);
		offset=0;
		debug_restore_elem_dv.setUint8(offset,cmd);offset++;
		if (start_addr!=null)
		{
			var replaced_code=dv_curr_position_break.getUint32(0,true);
			debug_restore_elem_dv.setUint16(offset,start_addr,true);offset+=2
			debug_restore_elem_dv.setUint32(offset,replaced_code,true);offset+=4;
		}
		else
		{
			debug_restore_elem_dv.setUint16(offset,0,true);offset+=2;
			debug_restore_elem_dv.setUint32(offset,0,true);offset+=4;
		}
		GOM.setObjArr("ARGEE_BREAKPOINT_UPLOAD_START",0,debug_restore_elem);	
	}
}	

		
function shiftArr(arr,pos_start,pos_end)
{
	var i;
	for(i=pos_start;i<(pos_end-1);i++)
	{
		arr[i]=arr[i+1];
	}
	arr.splice(pos_end-1,1);
}

var invocation = new XMLHttpRequest();
var url_prefix="http://192.168.1.253";


var prog_loaded=false;









var DEB_func_memory_map=[];



function DEB_FindFuncByAddr(addr)
{
	var i;
	for(i=0;i<DEB_func_memory_map.length;i++)
	{
		if (DEB_func_memory_map[i].offset==addr)
		{
			return DEB_func_memory_map[i];
		}
	}
	return null;
}

function DEB_FindFuncGlobAddr(ast)
{
	var i;
	for(i=0;i<DEB_func_memory_map.length;i++)
	{
		if (DEB_func_memory_map[i].list[DEB_func_memory_map[i].list.length-1]==ast)
		{
			return DEB_func_memory_map[i].offset;
		}
	}
}	

var DEB_elem_tree=[];
var DEB_elem_tree_id_cnt=0;	

var DEB_TYPE=
{
	POINTER:0,
	ARRAY:1,
	BLOCK:2,
	REG:3,
	COMB_REG:4,
	ARR_DESCR:5,
	BLOCK_IO:6,
	TRACE:7,
}

function DEB_VarChanged(offset,dv1,dv2,num_bytes)
{
	var i;
	var changed=false;
	for(i=0;i<num_bytes;i++)
	{
		if (dv1.getUint8(offset+i)!=dv2.getUint8(offset+i))
		{
			changed=true;
			break;
		}
	}
	return changed;
}

var elem_disp_type=
{
	INT:0,
	HEX:1,
	FLOAT:2,
};

function renderRegElem(elem,str1,dv_curr,dv_prev,run)
{
	var tmp_str;
	var i;
	var dv_curr=GOM.getValDataView(elem.obj,elem.inst);
	var dv_prev=GOM.getPrevDataView(elem.obj,elem.inst);
	var editable=false;
	var editable_offset,editable_length,editable_type;
	

	//tmp_str="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ";
	tmp_str="";
	if (elem.type==DEB_TYPE.ARR_DESCR)
	{
		tmp_str+="<td colspan=\"2\">";
		tmp_str+="Array: length="+dv_curr.getUint16(elem.offset,true)+",elem_size="+dv_curr.getUint16(elem.offset+2,true);
		tmp_str+="</td>"
	}
	else
	{
		tmp_str+="<td width=\"1px\" style=\"white-space: nowrap;\">";
		if (elem.index!=undefined)
		{
			tmp_str+="<b>["+elem.index+"]</b>";
			//tmp_str+="<u>["+elem.index+"]</u>";
		}
		else
		{
			tmp_str+="<u>"+elem.name+"</u>";
		}
		tmp_str+=" : </td><td>";
		var str_len;
		var elem_start=elem.offset;
		var changed;
		if (elem.sub_type=="CHAR")
		{
			str_len=dv_curr.getUint16(elem.offset,true);
			elem_start=elem.offset+4;
		}
		var str="";
		if (elem.sub_type=="CHAR")
		{
			changed=DEB_VarChanged(elem_start,dv_curr,dv_prev,str_len);
			
			for(i=0;i<str_len;i++)
			{
				if (dv_curr.getUint8(elem_start+i)==0)
				{
					break;
				}
				str+=String.fromCharCode(dv_curr.getUint8(elem_start+i));
			}
		}
		else if ((elem.sub_type=="INT")||(elem.sub_type=="RETAIN_INT"))
		{
			// these could be IO mapped elements
			if (elem.obj_bit_size!=undefined)
			{
				var val_curr=GetArrValue(dv_curr,elem.obj_bit_offset,elem.obj_bit_size);
				var val_prev=GetArrValue(dv_prev,elem.obj_bit_offset,elem.obj_bit_size);
				changed=false;
				if (val_curr!=val_prev)
				{
					changed=true;
				}
				str+=val_curr;
				editable_offset=elem.obj_bit_offset;
				editable_length=elem.obj_bit_size;
			}
			else
			{
				changed=DEB_VarChanged(elem_start,dv_curr,dv_prev,4);
				str+=dv_curr.getInt32(elem_start,true);
				editable_offset=elem_start*8;
				editable_length=32;

			}
			editable_type=elem_disp_type.INT;
			editable=true;
		}
		else if ((elem.sub_type=="REAL")||(elem.sub_type=="RETAIN_REAL"))
		{
			changed=DEB_VarChanged(elem_start,dv_curr,dv_prev,4);
			str+=dv_curr.getFloat32(elem_start,true);
			editable=true;
			editable_offset=elem_start*8;
			editable_length=32;
			editable_type=elem_disp_type.FLOAT;
			
		}
		else if (elem.sub_type=="STATE")
		{
			changed=DEB_VarChanged(elem_start,dv_curr,dv_prev,4);
			var val=dv_curr.getInt32(elem_start,true);
			var list=PROCESS.getEnumList();
			str+=list[val];
			editable=false;
		}
		else if (elem.sub_type=="TIMER")
		{
			var ref=dv_curr.getUint32(elem_start,true);
			var ctrl=dv_curr.getUint32(elem_start+4,true);
			var type_offset=26;
			var done_offset=24;
			str+="done: "+((ctrl>>done_offset)&1);
			if (((ctrl>>type_offset)&1)==0)
			{
				// timer
				if ((((ctrl>>done_offset)&1)==0)&&(ctrl&0xffffff)!=0)
				{
					var curr_timer=GOM.getValDataView("ARGEE_CURR_TIMER_TICK",0).getUint32(0,true);
					var curr_val=curr_timer-ref;
					if (curr_val<(ctrl&0xffffff))
					{
						str+=" time:"+curr_val;
						changed=true;
					}
				}
			}
			else
			{
				// counter;
				var ref=dv_curr.getInt32(elem_start,true);
				str+=" count:"+ref;
				changed=true;
			}
			
			
		}
		else
		{
			changed=DEB_VarChanged(elem_start,dv_curr,dv_prev,elem.obj_size);
			str+="0x";
			for(i=elem.obj_size-1;i>=0;i--)
			{
				str+=pad((dv_curr.getUint8(elem_start+i)).toString(16),2);
			}
			editable=true;
			editable_offset=elem_start*8;
			editable_length=elem.obj_size*8;
			editable_type=elem_disp_type.HEX;

		}
		
		if ((changed==true))
		{
			tmp_str+="<span style=\"background-color:Gold\">";
		}
		
		if ((editable==true)&&(stopDebRetrieval==true)&&(elem.non_editable!=true)&&
		    (
			  (elem.obj=="ARGEE_GET_PROG_VARS")||
			  ((SIM.getSimMode()==true)&&((elem.obj=="ARGEE_IO_INP")||(elem.obj=="ARGEE_IO_DIAG")||(elem.obj=="SPECIAL_REG")||(elem.obj=="ARGEE_GET_PLC_INP")))
			)
			
		   )
		{
			var str2="<input  type=\"text\" style=\"position:relative;opacity:100;\" value=\""+str+"\" data-elem_obj=\""+elem.obj+"\" data-elem_inst=\""+elem.inst+"\" data-elem_offset=\""+ editable_offset+"\" data-elem_len=\""+editable_length+"\" data-elem_disp_type=\""+editable_type+"\" onblur=\"DEB.MOD_Update(this)\">";
			str=str2;
		}
		tmp_str+=str;
		/*
		if ((changed==true))
		{
			tmp_str+="</span>";
		}
		*/
		tmp_str+="</td>"
	}
	return str1+tmp_str;
}

var DEB_auto_update_var_list=[];

function DEB_ClearVarFuncHighlights()
{
	var i;
	for(i=0;i<DEB_func_memory_map.length;i++)
	{
		var elm=document.getElementById("func_var_id_"+DEB_func_memory_map[i].id);
		if (elm!=undefined)
		{
			elm.style.backgroundColor="inherit";
			elm.innerHTML=elm.dataset.name;
		}
		
	}
}


function DEB_UpdateTraceElems(trace)
{
	var i;
	DEB_ClearVarFuncHighlights();
	for(i=0;i<trace.length;i++)
	{
		var elm=document.getElementById("func_var_id_"+trace[i].func.id);
		elm.style.backgroundColor=trace_autocolors[i];
		elm.innerHTML=elm.dataset.name+" - ["+i+"]";
	}
}

function DEB_UpdateVars(run)
{
	var i,j;
	for(i=0;i<DEB_auto_update_var_list.length;i++)
	{
		var elem=DEB_auto_update_var_list[i];
		var elem_render;
		var str="";
		if (elem.type==DEB_TYPE.COMB_REG)	
		{
			elem_render=window.document.getElementById("auto_update_div_"+elem.sub_arr[0].id);
			str="<table style=\"border-spacing:0px;\">";
			for(j=0;j<elem.sub_arr.length;j++)
			{
				str+="<tr >";
				str=renderRegElem(elem.sub_arr[j],str,run);
				str+="</tr>";
			}
			str+="</table>";
		}
		else
		{
			elem_render=window.document.getElementById("auto_update_div_"+elem.id);
			//border=\"1\" style=\"border-collapse:collapse;\"
			str="<table style=\"border-spacing:0px;\" ><tr >";
			str=renderRegElem(elem,str,run);
			str+="</tr></table>";
		}
		elem_render.innerHTML=str;
	}
}

function renderDebugTree(elem)
{
	var str="";
	var i;
	
	
	if (elem.length!=undefined)
	{
		// first call
		for(i=0;i<elem.length;i++)
		{
			str+=renderDebugTree(elem[i]);
		}
	}
	else if ((elem.type==DEB_TYPE.REG)||(elem.type==DEB_TYPE.ARR_DESCR)||(elem.type==DEB_TYPE.ARR_DESCR)||(elem.type==DEB_TYPE.POINTER))
	{
		str+="<li><div id=\"auto_update_div_"+elem.id+"\"></div>";
		DEB_auto_update_var_list[DEB_auto_update_var_list.length]=elem;
		str+="</li>";
	}
	else if (elem.type==DEB_TYPE.COMB_REG)
	{
		
		str+="<li><div id=\"auto_update_div_"+elem.sub_arr[0].id+"\"></div>";
		DEB_auto_update_var_list[DEB_auto_update_var_list.length]=elem;
		str+="</li>";
	}
	else
	{
		if ((elem.type==DEB_TYPE.BLOCK)&&(elem.index!=undefined))
		{
			//str+="<li><input type=\"checkbox\" checked=\"checked\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b>["+elem.index+"]</b></label><ul>"
			str+="<li><input type=\"checkbox\"  id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b>["+elem.index+"]</b></label><ul>"
		}
		else if (elem.type==DEB_TYPE.BLOCK)
		{
			if ((elem.ast!=undefined)&&(elem.ast.segm_type==PARSE.token_types.VAR_TASK))
			{
				
				if (elem.name.localeCompare(default_task_name.toUpperCase())==0)
				{
					
					str+="<li><input type=\"checkbox\" checked=\"checked\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b style=\"background-color:"+task_color_in_vars+";\"> - </b><b><a  href='#' onclick='DEB.DEB_ShowFuncPos(event,"+elem.offset+")' data-name=\""+default_task_replace_type+"\" id=\"func_var_id_"+elem.id+"\">"+default_task_replace_type+"</a></b></label><ul>"
				}
				else
				{
					str+="<li><input type=\"checkbox\" checked=\"checked\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b style=\"background-color:"+task_color_in_vars+";\"> - </b><b><a  href='#' onclick='DEB.DEB_ShowFuncPos(event,"+elem.offset+")' data-name=\""+elem.name+"("+elem.sub_type+")"+"\" id=\"func_var_id_"+elem.id+"\">"+elem.name+"("+elem.sub_type+")"+"</a></b></label><ul>"
				}
				
			}
			else
			{
				str+="<li><input type=\"checkbox\" checked=\"checked\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b><a href='#' onclick='DEB.DEB_ShowFuncPos(event,"+elem.offset+")' data-name=\""+elem.name+"("+elem.sub_type+")"+"\" id=\"func_var_id_"+elem.id+"\">"+elem.name+"("+elem.sub_type+")"+"</a></b></label><ul>"
			}
		}
		else if (elem.type==DEB_TYPE.TRACE)
		{
			str+="<li><input type=\"checkbox\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b style=\"color:#FF5733;\">"+elem.name+"</b></label><ul><div id=\"trace_div\"><button onclick=\"DEB.TRACE_PauseResume()\"> Pause/Resume</button><button onclick=\"DEB.TRACE_Clear()\">Clear Trace </button><div id=\"trace_update_div\"></div>  </div>";
		}
		else
		{
			//str+="<li><input type=\"checkbox\" checked=\"checked\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b>"+elem.name+"</b></label><ul>"
			str+="<li><input type=\"checkbox\" id=\"item_deb_"+elem.id+"\" /><label for=\"item_deb_"+elem.id+"\"><b>"+elem.name+"</b></label><ul>"
		}
		if ((elem.sub_arr!=undefined)&&(elem.sub_arr!=null))
		{
			for(i=0;i<elem.sub_arr.length;i++)
			{
				str+=renderDebugTree(elem.sub_arr[i]);
			}
		}
		str+="</ul></li>";
	}
	return str;
}

function handleSubArray(arr)
{
	var i,j;
	for(i=0;i<arr.length;i++)
	{
		if ((arr[i].type==DEB_TYPE.REG)||(arr[i].type==DEB_TYPE.ARR_DESCR)||(arr[i].type==DEB_TYPE.POINTER))
		{
			for(j=i+1;(j<arr.length)&&((arr[j].type==DEB_TYPE.REG)||(arr[j].type==DEB_TYPE.ARR_DESCR)||(arr[j].type==DEB_TYPE.POINTER));j++)
			{
			}
			if (i!=(j-1))
			{
				var_sub_arr=arr.slice(i,j);
				arr[i]={type:DEB_TYPE.COMB_REG,sub_arr:var_sub_arr};
				arr.splice(i+1,j-i-1);
			}
		}
		else
		{
			DEB_ReorgVarDispTree(arr[i]);
		}
	}		
}

function DEB_ReorgVarDispTree(elem)
{
	var i;
	if (elem.length!=undefined)
	{
		// first element
		handleSubArray(elem);
	}
	if (elem.sub_arr!=undefined)
	{
		handleSubArray(elem.sub_arr);
	}
}

function addStatusDescrToDeb()
{
	var obj;
	obj={name:"PLC_CONNECTED",type:DEB_TYPE.REG,sub_type:"INT",obj_bit_size:1,offset:-1, obj_bit_offset:0,id:DEB_elem_tree_id_cnt,obj:"SPECIAL_REG",inst:0};DEB_elem_tree_id_cnt++;
	DEB_elem_tree.splice(0,0,obj);
	obj={name:"PROG_CYCLE_TIME",type:DEB_TYPE.REG,sub_type:"INT",obj_bit_size:8,offset:-1, obj_bit_offset:24,id:DEB_elem_tree_id_cnt,obj:"SPECIAL_REG",inst:0,non_editable:true};DEB_elem_tree_id_cnt++;
	DEB_elem_tree.splice(0,0,obj);

}

function add_OtherDescrToDeb()
{
	var i,j,k;
	var io_list=[];
	var block_sub_arr;
	var curr=0;
	
	
	
	for(i=0;i<IO_ids.length;i++)
	{
		var slice_index=findIndex(IO_ids[i]);
		for(j=0;j<slices[slice_index].sections.length;j++)
		{
			block_sub_arr=[];
			
			if ((j==sect_type.param)||(slices[slice_index].sections[j].objects.length==0))
			{
				continue;
			}
	
			if (i==0)
			{
				io_list[curr]={name:"Local IO: "+SIM.getSlotName(0,true),type:DEB_TYPE.BLOCK_IO,id:DEB_elem_tree_id_cnt,offset:-1,obj:"ARGEE_IO_DIAG",inst:i};DEB_elem_tree_id_cnt++;
			}
			else
			{
				io_list[curr]={name:"Local IO: "+SIM.getSlotName(i,true)+"  - "+sect_names[j],offset:-1,type:DEB_TYPE.BLOCK_IO,id:DEB_elem_tree_id_cnt,obj:ObjSectMap[j],inst:i};DEB_elem_tree_id_cnt++;				
			}
			for(k=0;k<slices[slice_index].sections[j].objects.length;k++)
			{
				var obj=slices[slice_index].sections[j].objects[k];
				if (i==0)
				{
					obj_name="ARGEE_IO_DIAG";
				}
				else
				{
					obj_name=ObjSectMap[j];
				}
					
					
				block_sub_arr[k]={name:obj.name,type:DEB_TYPE.REG,sub_type:"INT",obj_bit_size:obj.length,offset:-1, obj_bit_offset:obj.offset,id:DEB_elem_tree_id_cnt,obj:obj_name,inst:i};DEB_elem_tree_id_cnt++;
			}
			io_list[curr].sub_arr=block_sub_arr;
			curr++;
		}
	}
	io_list[curr]={name:"PLC_TO_ARGEE",type:DEB_TYPE.ARRAY,offset:-1,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PLC_INP",inst:0};DEB_elem_tree_id_cnt++;	
	block_sub_arr=[];
	for(i=0;i<128;i++)
	{
		block_sub_arr[i]={index:i,type:DEB_TYPE.REG,sub_type:"WORD",obj_size:2, offset:2*i,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PLC_INP",inst:0};DEB_elem_tree_id_cnt++;
	}
	io_list[curr].sub_arr=block_sub_arr;
	curr++;
	
	io_list[curr]={name:"ARGEE_TO_PLC",type:DEB_TYPE.ARRAY,offset:-1,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PLC_OUTP",inst:0};DEB_elem_tree_id_cnt++;	
	block_sub_arr=[];
	for(i=0;i<128;i++)
	{
		block_sub_arr[i]={index:i,type:DEB_TYPE.REG,sub_type:"WORD",obj_size:2, offset:2*i,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PLC_OUTP",inst:0};DEB_elem_tree_id_cnt++;
	}
	io_list[curr].sub_arr=block_sub_arr;
	curr++;
	var start=DEB_elem_tree.length;
	for(i=0;i<io_list.length;i++)
	{
		DEB_elem_tree[DEB_elem_tree.length]=io_list[i];
	}
	DEB_elem_tree.splice(0,0,{name:"TRACE",type:DEB_TYPE.TRACE,offset:-1,obj_size:2, id:DEB_elem_tree_id_cnt});DEB_elem_tree_id_cnt++;
}

// need to create a list of function_blocks/nested block addresses
function DEB_CreateAstGlobMemoryMap(elem,ast_prefix_list,act_offset)
{
	function addToList(list,elem,prefix_list,offset,id)
	{
		var tmp=prefix_list.slice(0);
		tmp.splice(tmp.length,0,elem)
		var i;
		var str="";
		for(i=0;i<tmp.length;i++)
		{
			if (i!=0)
			{
				str+=".";
			}
			if (tmp[i].type==undefined)
			{
				str+=tmp[i];
			}
			else
			{
				str+=tmp[i].name+"("+tmp[i].type.link.name+")";
			}
		}
		list[list.length]={list:tmp,name:str,offset:offset,id:id};
	}
	
	var i;
	var elem_arr=[];

	if (elem.enum_type==ELEM.VAR_SEGM)
	{
		for(i=0;i<elem.list.length;i++)
		{
			var elem1;
			elem1=DEB_CreateAstGlobMemoryMap(elem.list[i],ast_prefix_list,act_offset);
			if (elem1!=null)
			{
				elem_arr[elem_arr.length]=elem1;
			}
		}
		if (elem_arr.length!=0)
		{
			return elem_arr;
		}
		return null;

	}
	
	var pointer,num_elems,simp_type_index;
	var segm_type=elem.segm_link.type;
	var data_type=elem.type.data;
	var data_elem_size=elem.type.link.var_size;
	if (segm_type==token_types.VAR_INOUT)
	{
		pointer=true;
	}
	else
	{
		pointer=false;
	}
	if (elem.type.type==ELEM.VAR_REG)
	{
		num_elems=1;
	}
	else
	{
		num_elems=elem.type.range_end-elem.type.range_start+1;
	}
	
	if ((elem.debug_hide==true)||(elem.ctrl_elem==true)||(pointer==true)||(elem.type.data=="BIT"))
	{
		return null;
	}
	
	if (pointer==true)
	{
		elem_arr[0]={ast:elem,name:elem.name,type:DEB_TYPE.POINTER,obj_size:data_elem_size,sub_type:data_type,offset:act_offset+elem.offset,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
		return elem_arr[0]; // address will appear in the actual function location
		//addToList(elem,ast_prefix_list,act_offset+elem.offset);
	}
	simp_type_index=process.isSimpleType(data_type);
	if (data_type=="CHAR") // string
	{
		elem_arr[0]={ast:elem,name:elem.name,type:DEB_TYPE.REG,obj_size:data_elem_size,sub_type:data_type,offset:act_offset+elem.offset,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
		return elem_arr[0]; // address will appear in the actual function location
	}


	if (elem.type.type!=ELEM.VAR_REG)
	{
		// array;
		var sub_arr=[];
		var arr_offset=0;
		elem_arr[0]={ast:elem,name:elem.name,type:DEB_TYPE.ARRAY,obj_size:data_elem_size,sub_type:data_type,offset:act_offset+elem.offset,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
		
		if (elem.type.no_length!=true)
		{
			arr_offset=4;
			sub_arr[sub_arr.length]={type:DEB_TYPE.ARR_DESCR,obj_size:data_elem_size,offset:act_offset+elem.offset,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
		}
		
		for(i=0;i<num_elems;i++)
		{
			var elem1;
			if (simp_type_index==-1)
			{
				elem1={ast:elem,name:elem.name,index:i,type:DEB_TYPE.BLOCK,obj_size:data_elem_size,sub_type:data_type,offset:arr_offset+act_offset+elem.offset+i*elem.type.link.var_size,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
				var tmp_arr=ast_prefix_list.slice(0);
				tmp_arr.splice(tmp_arr.length,0,i);
				addToList(DEB_func_memory_map,elem,tmp_arr,arr_offset+act_offset+elem.offset+i*elem.type.link.var_size,DEB_elem_tree_id_cnt-1);
				tmp_arr.splice(tmp_arr.length,0,elem);
				var sub_sub=DEB_CreateAstGlobMemoryMap(elem.type.link.list[0],tmp_arr,arr_offset+act_offset+elem.offset+i*elem.type.link.var_size);
				elem1.sub_arr=sub_sub;

			}
			else
			{
				elem1={ast:elem,name:elem.name,index:i,type:DEB_TYPE.REG,obj_size:data_elem_size,sub_type:data_type,offset:arr_offset+act_offset+elem.offset+i*elem.type.link.var_size,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
			}
			if (elem1!=null)
			{
				sub_arr[sub_arr.length]=elem1;
			}
		}
		elem_arr[0].sub_arr=sub_arr;
		return elem_arr[0];
	}
	else
	{
		var elem1;
		if (simp_type_index==-1)
		{
			elem1={ast:elem,name:elem.name,type:DEB_TYPE.BLOCK,obj_size:data_elem_size,sub_type:data_type,offset:act_offset+elem.offset,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
			var tmp_arr=ast_prefix_list.slice(0);
			addToList(DEB_func_memory_map,elem,ast_prefix_list,act_offset+elem.offset,DEB_elem_tree_id_cnt-1);
			tmp_arr.splice(tmp_arr.length,0,elem);
			var sub_sub=DEB_CreateAstGlobMemoryMap(elem.type.link.list[0],tmp_arr,act_offset+elem.offset);
			elem1.sub_arr=sub_sub;
		}
		else
		{
			elem1={ast:elem,name:elem.name,type:DEB_TYPE.REG,obj_size:data_elem_size,sub_type:data_type,offset:act_offset+elem.offset,id:DEB_elem_tree_id_cnt,obj:"ARGEE_GET_PROG_VARS",inst:0};DEB_elem_tree_id_cnt++;
		}
		if (elem1!=null)
		{
			return elem1;
		}
	}
}
var prog_storage_start_addr;
function DEB_getCurrTask()
{
	var dv=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
	var addr=dv.getUint32(gen.GetCurrTaskFP_Offset(),true);
	addr=addr-prog_storage_start_addr;
	var task=DEB_FindFuncByAddr(addr);
	return task.list[0];
}

function findTraceByAddr(addr,trace)
{
	var i;
	for(i=0;i<trace.length;i++)
	{
		if (trace[i].func.offset==addr)
		{
			return i;
		}
	}
	return -1;
}

function DEB_getLineNumFromPC(addr)
{
	var ast=findAstByAddr(addr);
	if (ast==null)
	{
		ast=GEN.findAddrInAsmElements(addr);
	}
	if (ast==null)
	{
		return -1;
	}
	return ast.line_num;
}


function DEB_getAST_FromAddr(addr)
{
	var ast=findAstByAddr(addr);
	if (ast==null)
	{
		ast=GEN.findAddrInAsmElements(addr);
	}
	return ast;
}

var CMD=
{
	BREAK_ALL:0,
	SET_CLEAR:1,
	CONTINUE:2,
	STEP:3,
}

function DEB_ConvertToNST_Breakpoints()
{
	var i,k;
	breakpoints_on_lines=[];
	var arr=GOM.getObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0);
	for(k in arr)
	{
		i=parseInt(k);
		if (arr[i]==true)
		{
			var nst_line=PARSE.getNST_Prog_Line_From_ARGEE(i);
			breakpoints_on_lines[nst_line+1]=true; // +1 to make it compatible with line ordering in NST view
		}
	}
}

function checkBreakpointLine(line)
{
	if (breakpoints_on_lines[line]==true)
	{
		return true;
	}
	return false;	
}

function setBreakpointLine(line,val)
{
	breakpoints_on_lines[line]=val;
}

function getBreakpointLines()
{
	return breakpoints_on_lines;
}

function createUserBreakPointList()
{
	var i;
	DEB_breakpoints=[];
	for(i=0;i<breakpoints_on_lines.length;i++)
	{
		if (breakpoints_on_lines[i]==true)
		{
			var ast=findAstByLine(i-1);
			if (ast==null)
			{
				//highlightLine(i-1,"inherit");
				breakpoints_on_lines[i]=false;
			}
			else
			{
				DEB_breakpoints[DEB_breakpoints.length]=ast;
			}
		}
	}
}	


function DEB_getTaskWaitLines(list)
{
	var i;
	var dv=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
	var task_addrs=GEN.getTaskAddrs();
	for(i=0;i<task_addrs.length;i++)
	{
		var ast=DEB_getAST_FromAddr(dv.getUint32(task_addrs[i]+0,true)-prog_storage_start_addr);
		if ((ast==null)||(ast.enum_type!=ELEM.WAIT_UNTIL))
		{
			list[i]=-1;
		}
		else
		{
			list[i]=ast.line_num;
		}
	}
}

function DEB_getStackTraceFromTask(task)
{
	var curr_fp_ret,curr_pc_ret;
	var dv=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
	var addr=dv.getUint32(task.offset,true);
	var task_fp=task.offset;

	curr_fp_ret=dv.getUint32(task.offset+4,true)-prog_storage_start_addr;
	curr_pc_ret=dv.getUint32(task.offset+0,true)-prog_storage_start_addr;
	var trace=[];
	while(1)
	{
		var func=DEB_FindFuncByAddr(curr_fp_ret);
		trace[trace.length]={func:func,pc:curr_pc_ret};
		if ((func.list.length==1)&&(func.list[0].offset==task.offset))
		{
			break;
		}
		curr_pc_ret=dv.getUint32(curr_fp_ret+0,true)-prog_storage_start_addr-2;
		curr_fp_ret=dv.getUint32(curr_fp_ret+4,true)-prog_storage_start_addr;
		
	}
	return trace;
}

var act_cmd=-1

function* uploadNewBreakpoints_imp()
{
	
	var res=yield* TRANSF.Login();
	if (res==false)
	{
		return;
	}

	
	DEB_curr_trace_level=0;
	console.log("create patched code "+(new Date()).getTime());
	if (act_cmd==CMD.BREAK_ALL)
	{
		createPatchedCode(DEB_patch_list_for_line_actions,null,act_cmd); 
	}
	else if (act_cmd==CMD.SET_CLEAR)
	{
		createUserBreakPointList();
		createPatchedCode(DEB_breakpoints,null,act_cmd); 
	}
	else
	{
		var task=DEB_getCurrTask();
		var dv=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
		var curr_fp_ret,curr_pc_ret;
		var addr=dv.getUint32(task.offset,true);
		var task_fp=task.offset;
		var start_addr=null;
		curr_fp_ret=dv.getUint32(task.offset+4,true)-prog_storage_start_addr;
		curr_pc_ret=dv.getUint32(task.offset+0,true)-prog_storage_start_addr;

		start_addr=curr_pc_ret;
		start_addr&=0xfffffffe;
		
		createUserBreakPointList();
		if (act_cmd==CMD.STEP)
		{
			createPatchedCode(DEB_patch_list_for_line_actions,start_addr,act_cmd);
		}
		else if (act_cmd==CMD.CONTINUE)
		{
			createPatchedCode(DEB_breakpoints,start_addr,act_cmd);
		}
	}
	
	if ((act_cmd==CMD.CONTINUE)||(act_cmd==CMD.STEP)||(act_cmd==CMD.BREAK_ALL))
	{
		new_break_hit=true;
		GOM.syncObjPrev("ARGEE_GET_PROG_VARS",0);
		GOM.syncObjPrev("ARGEE_IO_INP",0);
		GOM.syncObjPrev("ARGEE_IO_OUTP",0);
		GOM.syncObjPrev("ARGEE_IO_DIAG",0);
		GOM.syncObjPrev("ARGEE_GET_PLC_INP",0);
		GOM.syncObjPrev("ARGEE_GET_PLC_OUTP",0);
		DEB_ClearVarFuncHighlights();
	}
	console.log("upload breakpoints "+(new Date()).getTime() );
	yield* GOM.objectExchange("ARGEE_BREAKPOINT_UPLOAD_START",0,"WRITE",false);	
	var upload_offset_list=[[GOM.getObjNum("ARGEE_CTRL_VAR_SEGM_SIZE",0),GOM.getObjArr("ARGEE_RUN_CODE",0).byteLength-GOM.getObjNum("ARGEE_CTRL_VAR_SEGM_SIZE",0)]];
	yield* GOM.objectExchange("ARGEE_PATCHED_CODE_STORAGE",0,"WRITE_WITH_OFFSET",false,upload_offset_list);
	GOM.setObjArr("ARGEE_BREAKPOINT_UPLOAD_FINILIZE",0,new ArrayBuffer(1));
	yield* GOM.objectExchange("ARGEE_BREAKPOINT_UPLOAD_FINILIZE",0,"WRITE",false);	
	GOM.finAjaxAction();
	console.log("Breakpoints loaded.. starte autorefresh "+(new Date()).getTime());
	setCompilerMessage(false,false,"Exchange	 finished");
	GOM.autoRefreshStart(downloadProgElements);
}

function launchBreakPointCMD(cmd)
{
	console.log("br_l "+GOM.getObjNum("DEV_RUN",0)+" "+cmd);
	if (prog_compiled==true)
	{
		if  (
				((GOM.getObjNum("DEV_RUN",0)!=0)&&
				 ((cmd==CMD.SET_CLEAR)||(cmd==CMD.BREAK_ALL)))
				 ||
				 ((GOM.getObjNum("DEV_RUN",0)==0)&&
				 ((cmd==CMD.STEP)||(cmd==CMD.CONTINUE)))
			)
				 
		{
			GOM.autoRefreshStop();
			act_cmd=cmd;
			GOM.addAjaxAction(uploadNewBreakpoints_imp);	
		}
		else if (GOM.isAutoRefreshStopped())
		{ 
			GOM.autoRefreshStart(downloadProgElements);
		}
	}
}		


function BREAK_setClear() {launchBreakPointCMD(CMD.SET_CLEAR)}
function BREAK_halt() {launchBreakPointCMD(CMD.BREAK_ALL)}
function BREAK_step() {launchBreakPointCMD(CMD.STEP)}
function BREAK_continue() {launchBreakPointCMD(CMD.CONTINUE)}

function TRACE_PauseResume()
{
	pause_trace=(pause_trace+1)%2;
}
var trace_clear=false;
var clear_trace_compare_to=0;
function TRACE_Clear()
{
	clear_trace_compare_to=0;
	if (curr_prog_trace.length>0)
	{
		clear_trace_compare_to=curr_prog_trace[curr_prog_trace.length-1].int_time;
	}
	curr_prog_trace=[];
	trace_clear=true;
}

var curr_prog_trace=[];
var pause_trace=0;
function extractProgTrace()
{
	var dv=GOM.getValDataView("ARGEE_GET_PROG_VARS",0)
	var prog_trace_offset=GOM.getObjNum("PROG_TRACE_TBL_SEG_OFFSET_OBJ",0);
	var i;
	var curr=prog_trace_offset;
	var traces=[];
	
	/*var def_first_timestamp=-1;
	var rollover_addition==((0xffffffff)+1)<<8;
	var compare_timestamp;
	if (curr_prog_trace.length==0)
	{
		compare_timestamp=def_first_timestamp;
	}
	else
	{
		compare_timestamp=curr_prog_trace[curr_prog_trace.length-1].int_time;
	}*/

	var copy_from=0;
	var compare_to=0;
	if (curr_prog_trace.length>0)
	{
		compare_to=curr_prog_trace[curr_prog_trace.length-1].int_time;
	}
	if (trace_clear==true)
	{
		compare_to=clear_trace_compare_to;
	}
	
	
	var prev_ind=max_prog_traces-1;
	var curr_ptr=dv.getUint16(curr,true);curr+=4;
	// linearize based on the write pointer position
	for(i=0;i<max_prog_traces;i++)
	{
		curr=prog_trace_offset+curr_ptr*12+4;
		var ent={};
		ent.time=dv.getUint32(curr,true);curr+=4;
		ent.id=dv.getUint8(curr);curr++;
		ent.int_time=(ent.time<<8)|ent.id;
		var line=0;
		line<<=8;line|=dv.getUint8(curr+2);
		line<<=8;line|=dv.getUint8(curr+1);
		line<<=8;line|=dv.getUint8(curr+0);
		curr+=3;
		ent.line=line;
		ent.data=dv.getUint32(curr,true);curr+=4;
		if (ent.int_time==compare_to)
		{
			copy_from=i+1;
		}
		traces[i]=ent;
		curr_ptr=(curr_ptr+1)%max_prog_traces;
	}
	for(i=copy_from;i<max_prog_traces;i++)
	{
		
		curr_prog_trace[curr_prog_trace.length]=traces[i];
	}
	if (curr_prog_trace.length>0)
	{
		trace_clear=false;
	}
	var tbl="";
	var cnt=0;
	tbl="<table border=\"1\" style=\"-moz-user-select: all;			-webkit-user-select: all;user-select: all;\"><tr><td>Time</td><td>line</td><td>data</td></tr>";

	var mode=GOM.getObjNum("ARGEE_PROJ_TYPE",0);

	
	for(cnt=0,i=curr_prog_trace.length-1;i>=0;i--,cnt++)
	{
		if (cnt==100)
		{
			break;
		}
		var line=curr_prog_trace[i].line;
		var str=GEN.findTraceStr(line);
		if (mode==ENV.ARGEE)
		{
			line=PARSE.getARGEE_Prog_Line_From_NST(line);
		}
		
		tbl+="<tr style=\"background-color:"+trace_autocolors[line%trace_autocolors.length]+";\"><td>"+curr_prog_trace[i].time+"</td><td>"+line+"</td><td>"+str+":"+curr_prog_trace[i].data+"</td></tr>";	
	}
	tbl+="</table>";
	var elem_id=window.document.getElementById("trace_update_div");
	if (pause_trace==0)
	{
		elem_id.innerHTML=tbl;
	}

}

var stopDebRetrieval=false;

function* downloadProgElements()
{
	// extract OIDs
    
	yield* GOM.objectExchange("ARGEE_GET_PROG_VARS",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_IO_INP",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_IO_OUTP",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_IO_DIAG",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_GET_PLC_INP",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_GET_PLC_OUTP",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_BASE_MEM_ADDR",0,"UID_TO_OID",true);
	yield* GOM.objectExchange("ARGEE_CURR_TIMER_TICK",0,"UID_TO_OID",true);
	
	var mode=GOM.getObjNum("ARGEE_PROJ_TYPE",0);
	
	
	// read out appropriate vars/IO/PLC objects
	var obj_list=["ARGEE_GET_PROG_VARS","ARGEE_IO_INP","ARGEE_IO_OUTP","ARGEE_IO_DIAG","ARGEE_GET_PLC_INP","ARGEE_GET_PLC_OUTP","ARGEE_BASE_MEM_ADDR","ARGEE_CURR_TIMER_TICK"];
	yield* GOM.objectExchange(obj_list,0,"MULT_INST_READ",true);
	//GOM.setObjNum("ARGEE_CLEAR_INSTR_TRACE",0,1);
	//yield* GOM.objectExchange("ARGEE_CLEAR_INSTR_TRACE",0,"WRITE",false);	

	if (GOM.getValDataView("ARGEE_GET_PROG_VARS",0).buffer.byteLength==0)
	{
		setCompilerMessage(false,true,"Project not running!");
		return;
	}
	else
	{
		//setCompilerMessage(false,true,"");
	}
	
	
	prog_storage_start_addr=GOM.getObjNum("ARGEE_BASE_MEM_ADDR",0);
	var special_seg_addr=PROCESS.getSpecialSegAddr();
	var prog_status_info=GOM.getValDataView("ARGEE_GET_PROG_VARS",0).getUint32(special_seg_addr,true);
	var special_reg_buf=new ArrayBuffer(4);
	var special_reg_dv=new DataView(special_reg_buf);
	special_reg_dv.setUint32(0,prog_status_info,true);
	GOM.setObjArr("SPECIAL_REG",0,special_reg_buf);
	GOM.syncObjPrev("SPECIAL_REG",0);
	var run=((((prog_status_info>>1)&1)==1)?0:1);
	var exception=((((prog_status_info>>2)&1)==1)?1:0);
	var task_trace=DEB_getStackTraceFromTask(DEB_getCurrTask());
	var task_trace_level=Math.min(DEB_curr_trace_level,task_trace.length-1);
	var inst_trace_offset=GEN.getInstrTraceOffset().offset;
	var val_dv=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
	var num_trace_elems=(val_dv.getUint16(inst_trace_offset+0,true))/4;
	var i,j;
	var inst_trace_buf=[];
	var line_num;
	for(i=0;i<num_trace_elems;i++)
	{
		var lg=val_dv.getUint32(inst_trace_offset+4+i*4,true);
		if (lg!=0)
		{
			var jk=1;
		}
		for(j=0;j<32;j++)
		{
			
			if ((lg&(1<<j))!=0)
			{
				line_num=i*32+j;
				if (mode==ENV.ARGEE)
				{
					var argee_line=PARSE.getARGEE_Prog_Line_From_NST(line_num);
					if (argee_line!=-1)
					{
						inst_trace_buf[inst_trace_buf.length]=argee_line;
					}
				}
			}
		}
	}
	GOM.setObjArr("INSTR_TRACE",0,inst_trace_buf);
	var wait_lines=[];
	if (run==1)
	{
		DEB_getTaskWaitLines(wait_lines);
		if (mode==ENV.ARGEE)
		{
			for(i=0;i<wait_lines.length;i++)
			{
				var argee_line=PARSE.getARGEE_Prog_Line_From_NST(wait_lines[i]);
				if (argee_line!=-1)
				{
					wait_lines[i]=argee_line;
				}
				else
				{
					wait_lines[i]=-1;
				}
			}
		}
	}
	GOM.setObjArr("WAIT_TRACE",0,wait_lines);
	
	GOM.setObjNum("DEV_RUN",0,run);
	GOM.setObjNum("DEV_EXCEPTION",0,exception);
	GOM.setObjNum("DBG_TASK_TRACE_LEVEL",0,task_trace_level);
	GOM.setObjNum("DBG_TASK_TRACE",0,task_trace);
	
	if (mode==ENV.ARGEE)
	{
		DESCR.refreshCodeInDebug();
	}
	else if (mode==ENV.NST)
	{
		NST.refreshCodeInDebug();
	}
	
	if ((run==false)&&(new_break_hit==true))
	{
		new_break_hit=false;
		DEB_UpdateTraceElems(task_trace);
		//var pc=trace[task_trace_level].pc;
		//var nst_line=DEB_getLineNumFromPC(pc);
		//var argee_line=PARSE.getARGEE_Prog_Line_From_NST(nst_line);
		// call editor specific highlight function
		//DESCR.highlightLine(argee_line);
		//redrawCodeAreaWithBreakpoints(DEB_getLineNumFromPC(pc));
	}
	
	DEB_UpdateVars(true);
	extractProgTrace();
	if (run==true)
	{
		GOM.syncObjPrev("ARGEE_GET_PROG_VARS",0);
		GOM.syncObjPrev("ARGEE_IO_INP",0);
		GOM.syncObjPrev("ARGEE_IO_OUTP",0);
		GOM.syncObjPrev("ARGEE_IO_DIAG",0);
		GOM.syncObjPrev("ARGEE_GET_PLC_INP",0);
		GOM.syncObjPrev("ARGEE_GET_PLC_OUTP",0);
		GOM.syncObjPrev("SPECIAL_REG",0);
	}
	if (stopDebRetrieval==true)
	{
		    abort_ajax=true;
			GOM.autoRefreshStop();
			GOM.setObjArr("ARGEE_ARGEE_STORAGE",0,GOM.getObjArr("ARGEE_GET_PROG_VARS",0));
			if (SIM.getSimMode()==true)
			{
				GOM.setObjArr("SPECIAL_REG_SUBM_MIRR",0,GOM.getObjArr("SPECIAL_REG",0));
				GOM.setObjArr("ARGEE_GET_PLC_INP_SUBM_MIRR",0,GOM.getObjArr("ARGEE_GET_PLC_INP",0));
				for(i=0;i<IO_ids.length;i++)
				{
					GOM.setObjArr("ARGEE_IO_INP_SUBM_MIRR",i,GOM.getObjArr("ARGEE_IO_INP",i));
					GOM.setObjArr("ARGEE_IO_DIAG_SUBM_MIRR",i,GOM.getObjArr("ARGEE_IO_DIAG",i));
				}
			}
			
			console.log("stop debug extraction");
	}
}


	
	
	




var DEB_last_trace;
var DEB_curr_trace_level=0;
var DEB_Exception=false;
var DEB_prev_vars_dv;


var prog_running=false;
var prog_compiled=false;


var DEB_prev_vars;


var var_disp_html;



var trace_autocolors=
[
	//"#66FF00", // bright green,
	"#D1D0CE", // plainer green
	"Aqua",
	"Aquamarine",
	"Gold",
	"DarkTurquoise",
	"DarkSeaGreen",
	"#CC6600",
	"LimeGreen",
	"Lime",
	"LightSeaGreen",
];



var new_break_hit=false;




var DEB_breakpoints=[];
var DEB_breakpoints_added=false;




			
function DEB_ShowFuncPos(event,func_offset)
{
	var elem=event.target;
	var str;
	var argee_line;
	if (elem.innerText==undefined)
	{
		str=elem.textContent;
	}
	else
	{
		str=elem.innerText;
	}
	var substr=str.split(" - [");
	var func=DEB_FindFuncByAddr(func_offset);
	var act_line=func.list[func.list.length-1].type.link.line_num;
	GOM.setObjNum("GOTO_LINE",0,act_line);
	
	if (substr.length!=1)
	{
		DEB_curr_trace_level=parseInt(substr[1]);
		new_break_hit=true;
		GOM.setObjNum("GOTO_LINE",0,-2);
		return;
	}
	
	//var func=DEB_FindFuncByAddr(func_offset);
	//var act_line=func.list[func.list.length-1].type.link.line_num;
	
}



function MOD_Vars()
{
	submit_obj_list=[];
	stopDebRetrieval=true;
	GOM.addAjaxAction(downloadProgElements);	
}

var subm_meta_list=[];

function getSubmMeta()
{
	return subm_meta_list;
}

function* submitVarMods()
{
	var i,inst;
	
	var res=yield* TRANSF.Login();
	if (res==false)
	{
		return;
	}
	
	for(i=0;i<subm_meta_list.length;i++)
	{
		var obj=subm_meta_list[i].obj;
		for(inst in subm_meta_list[i].element_lists)
		{
			var jk=1;
			var num_inst=num(inst);
			yield* GOM.objectExchange(obj,num_inst,"WRITE_WITH_OFFSET",false,subm_meta_list[i].element_lists[num_inst]);
		}
	}
	GOM.finAjaxAction();
	GOM.autoRefreshStart(downloadProgElements);	
}

function getSubmMetaList(lists,name,inst)
{
	var i;
	var obj_list=null;
	for(i=0;i<lists.length;i++)
	{
		if (lists[i].obj==name)
		{
			obj_list=lists[i];
			break;
		}
	}
	if (obj_list==null)
	{
		lists[lists.length]={obj:name,element_lists:[]};
		obj_list=lists[lists.length-1];
	}
	if (obj_list.element_lists[inst]==undefined)
	{
		obj_list.element_lists[inst]=[];
	}
	return obj_list.element_lists[inst];
}	

function MOD_Finish()
{
	var dv;
	stopDebRetrieval=false;
	var i;
	var list_num;
	for(i=0;i<submit_obj_list.length;i++)
	{
		var obj=submit_obj_list[i].obj_name;
		switch(submit_obj_list[i].obj_name)
		{
			case "ARGEE_GET_PROG_VARS": obj="ARGEE_ARGEE_STORAGE";  break;
			case "SPECIAL_REG"        : obj="SPECIAL_REG_SUBM_MIRR"; break;
			case "ARGEE_GET_PLC_INP"  : obj="ARGEE_GET_PLC_INP_SUBM_MIRR"; break;
			case "ARGEE_IO_INP"       : obj="ARGEE_IO_INP_SUBM_MIRR"; break;
			case "ARGEE_IO_DIAG"      : obj="ARGEE_IO_DIAG_SUBM_MIRR"; break;
		}
		submit_obj_list[i].redir_obj=obj;
		dv=GOM.getValDataView(obj,submit_obj_list[i].obj_inst);
		switch(submit_obj_list[i].obj_disp_type)
		{
			case elem_disp_type.INT:
					SetArrValue(dv,submit_obj_list[i].obj_offset,submit_obj_list[i].obj_len,parseInt(submit_obj_list[i].obj_new_val));
					break;
			case elem_disp_type.HEX:
					switch(submit_obj_list[i].obj_len)
					{
						case 8:dv.setUint8(submit_obj_list[i].obj_offset/8,parseInt(submit_obj_list[i].obj_new_val,16)); break;
						case 16:dv.setUint16(submit_obj_list[i].obj_offset/8,parseInt(submit_obj_list[i].obj_new_val,16),true); break;
						case 32:dv.setUint32(submit_obj_list[i].obj_offset/8,parseInt(submit_obj_list[i].obj_new_val,16),true); break;
					}
					break;
			case elem_disp_type.FLOAT:
					dv.setFloat32(submit_obj_list[i].obj_offset/8,parseFloat(submit_obj_list[i].obj_new_val,16),true); break;
		}
	}
	subm_meta_list=[];
	// for now only "ARGEE_ARGEE_STORAGE" is used -> to be extended with simulation
	for(i=0;i<submit_obj_list.length;i++)
	{
		if ((submit_obj_list[i].obj_len%8)!=0)
		{
			submit_obj_list[i].obj_len=(submit_obj_list[i].obj_len/8)|0;
			submit_obj_list[i].obj_len=(submit_obj_list[i].obj_len+1)*8;
		}
		var list=getSubmMetaList(subm_meta_list,submit_obj_list[i].redir_obj,submit_obj_list[i].obj_inst);
		list[list.length]=[(submit_obj_list[i].obj_offset/8)|0,(submit_obj_list[i].obj_len/8)|0];		
	}
	GOM.addAjaxAction(submitVarMods);	
}

var submit_obj_list=[];

function MOD_Update(elem)
{
	var obj_name=elem.dataset.elem_obj;
	var obj_inst=parseInt(elem.dataset.elem_inst);
	var obj_offset=parseInt(elem.dataset.elem_offset);
	var obj_len=parseInt(elem.dataset.elem_len);
	var obj_disp_type=parseInt(elem.dataset.elem_disp_type);
	elem.style.background="lightgreen";
	submit_obj_list[submit_obj_list.length]=
	{
		obj_name:obj_name,
		obj_inst:obj_inst,
		obj_offset:obj_offset,
		obj_len:obj_len,
		obj_new_val:elem.value,
		obj_disp_type:obj_disp_type,	
	}
}

return {
	RunProg:RunProg,
	TestProg:TestProg,
	StopDebug:StopDebug,
	getGlobals:getGlobals,
	DEB_getLineNumFromPC:DEB_getLineNumFromPC,
	DEB_ConvertToNST_Breakpoints:DEB_ConvertToNST_Breakpoints,
	BREAK_setClear:BREAK_setClear,
	BREAK_halt:BREAK_halt,
	BREAK_step:BREAK_step,
	BREAK_continue:BREAK_continue,
	DEB_ShowFuncPos:DEB_ShowFuncPos,
	checkBreakpointLine:checkBreakpointLine,
	setBreakpointLine:setBreakpointLine,
	prepareDebElems:prepareDebElems,
	getBreakpointLines:getBreakpointLines,
	MOD_Vars:MOD_Vars,
	MOD_Finish:MOD_Finish,
	MOD_Update:MOD_Update,
	getSubmMeta:getSubmMeta,
	TRACE_Clear:TRACE_Clear,
	TRACE_PauseResume:TRACE_PauseResume,
}
}());
var DEB=ARGEE_nst_debug;

var ObjSectMap=["ARGEE_IO_INP","ARGEE_IO_OUTP","ARGEE_IO_DIAG","ARGEE_IO_PARAM",];
