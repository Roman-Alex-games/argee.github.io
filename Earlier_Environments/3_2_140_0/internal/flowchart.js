/********************************************************************************
 *
 * Copyright (c) 2013 by TUSA
 *
 ********************************************************************************
 *
 *  Initial Author       : Hermann Schwagmann, Jim Hennessy, Roman Glistvain
 *  Maintainers          : Roman Glistvain
 *
 *
 ********************************************************************************
 *
 *  DESCRIPTION: Flowchart Renderer. Renders the flowchart interface in both 
 *               editor and debug mode.
 *
 *******************************************************************************/

var ARGEE_Flowchart=(function()
{ 

function saveFlowchart()
{
	flowchart.editor=ENV.FLOWCHART;
	setLocalStorage("prog_code",JSON.stringify(flowchart));
}

function importFlowchart()
{
	flowchart=JSON.parse(GOM.arrToString(GOM.getObjArrCompressed("ARGEE_SOURCE_CODE",0)));
}

function loadFlowchart()
{
	if (getLocalStorage("prog_code")!=undefined)
	{
		flowchart=JSON.parse(getLocalStorage("prog_code"));
	}
}



function connect(div1, div2, color, thickness,confine) {
	//console.log("getOff1");
    var off1 = getOffset(div1,confine);
	//console.log("getOff2");
    var off2 = getOffset(div2,confine);
    // middle right
    var x1 = off1.left + off1.width;
    var y1 = off1.top + (off1.height/2);
    // middle right
    var x2 = off2.left;
    var y2 = off2.top + (off2.height/2);
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute;  left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //
    //alert(htmlLine);
	//console.log("line_start");
    confine.innerHTML += htmlLine; 
	//console.log("line_end");
}

//




var elem_type=
{
	_inp:0,
	_op:1,
	_outp:2,
};

var data_type=
{
	_bool:0,
	_int:1,
	_ton:2,
	_reset:3,
	_ctu:4,
	_any:5,
	_no_type:6,
};


// Analog inputs will only have a single level of logic. Only comparison operations with constants are allowed.
// ouptputs can't be function blocks -> only boolean variables.

	
var flowchart_funcs=
[
   {ind:0,op:"Pass Through",sym:"#1",num_arg:1,max_level:2,inp_type:data_type._any},
	{ind:1,op:"AND",sym:"(#1&#2)",num_arg:2,max_level:2,inp_type:data_type._bool},
	{ind:2,op:"OR",sym:"(#1|#2)",num_arg:2,max_level:2,inp_type:data_type._bool},
	{ind:3,op:"NOT",sym:"(!#1)",num_arg:1,max_level:2,inp_type:data_type._bool},
	{ind:4,op:"AND of 3 Inputs",sym:"((#1&#2)&#3)",num_arg:3,max_level:2,inp_type:data_type._bool},
];

var flowchart_inputs=[];
var flowchart_outputs=[];

var max_constants=2;
var last_act_rung=0;

function countLeaves(elem)
{
	if (elem.type==elem_type._inp)
	{
		return 1;
	}
	var num=0,i;
	for(i=0;i<elem.inputs.length;i++)
	{
		num+=countLeaves(elem.inputs[i]);
	}
	return num;
}

function computeTableCol(rung,elem,col,parent)
{
	var leaves=countLeaves(elem);
	var act_pos;
	if (rung.table_data[col]==undefined)
	{
		rung.table_data[col]=[{last_elem_index:1}]; // column elem 0 is always reserved
		rung.table_data[col][1]={start:1,span:leaves,elem:elem,parent:parent}; // first element
		act_pos=1;
	}
	else
	{
	   var last=rung.table_data[col][0].last_elem_index;
		var last_elem=rung.table_data[col][last];
		rung.table_data[col][last_elem.start+last_elem.span]={start:last_elem.start+last_elem.span,span:leaves,elem:elem,parent:parent};
		rung.table_data[col][0]={last_elem_index:last_elem.start+last_elem.span};
		act_pos=last_elem.start+last_elem.span;
	}
	if (elem.type!=elem_type._inp)
	{
		var i;
		for(i=0;i<elem.inputs.length;i++)
		{
			computeTableCol(rung,elem.inputs[i],col-1,{col:col,row:act_pos});
		}
	}		
}

/*
	if ((rung_num%2)==0)
	{
		outp+="<select disabled style=\"background-color: #00FF00;color:#000000;\"  onchange=\"onFuncChange("+rung_num+","+col+","+row+");\">"
	}
	else
	{
		outp+="<select disabled style=\"color:#000000;\"  onchange=\"onFuncChange("+rung_num+","+col+","+row+");\">"
	}
	*/


function renderRungListBox(elem,rung_num, col,row,debug)
{
	var outp="";
	var i;
	var current_cnt;
	var bg_color;
	var disabled;
	var val;
	var id="";
	var dataElem=null;
	
	disabled="";
	if (debug==true)
	{
		disabled="disabled";
		val=false;
		if (elem.type==elem_type._inp)
		{
			val=getElemCurrValue(flowchart_inputs[elem.val]);
			dataElem={type:elem_type._inp,ref_elem_num:elem.val};
		}
		if (elem.type==elem_type._outp)
		{
			val=getElemCurrValue(flowchart_outputs[elem.val]);		
			dataElem={type:elem_type._outp,ref_elem_num:elem.val};
			if ((flowchart_outputs[elem.val].elem_type==data_type._ton)||(flowchart_outputs[elem.val].elem_type==data_type._ctu))
			{
				val=getTimerCnt_Done(flowchart_outputs[elem.val]);
				if (val==1)
				{
					val=true;
				}
				else
				{
					val=false;
				}
				
				//console.log("timer state "+getTimerCnt_Count(flowchart_outputs[elem.val])+" "+getTimerCnt_Done(flowchart_outputs[elem.val]));
			}
		}
		if (val==true)
		{
			bg_color="background-color: #00FF00;";
		}
		else
		{
			bg_color="background-color: #FFFFFF;";
		}
	}
	if (dataElem==null)
	{
		outp+="<select "+disabled+" style=\""+bg_color+"color:#000000;\"   onchange=\"FLOW.onFuncChange("+rung_num+","+col+","+row+");\">"
	}
	else
	{
		if (elem.type==elem_type._inp)
		{
			outp+="<select onmousedown=\"FLOW.onSimClick("+elem.val+");return false;\"     data-flowch_main_elem='true' data-flowch_update='"+JSON.stringify(dataElem)+"' "+ "style=\""+bg_color+"color:#000000;\"   onchange=\"FLOW.onFuncChange("+rung_num+","+col+","+row+");\">"
			
		}
		else
		{
			outp+="<select  "+disabled+" data-flowch_main_elem='true' data-flowch_update='"+JSON.stringify(dataElem)+"' "+ "style=\""+bg_color+"color:#000000;\"   onchange=\"FLOW.onFuncChange("+rung_num+","+col+","+row+");\">"
			
		}
	}
		
		
	
	if (elem.type==elem_type._inp)
	{
		for(i=0;i<flowchart_inputs.length;i++)
		{
			if (i==elem.val)
			{
				outp+="<option value=\""+i+"\"selected >"+flowchart_inputs[i].name+"</option>";
			}
			else
			{
				outp+="<option value=\""+i+"\" >"+flowchart_inputs[i].name+"</option>";
			}
		}
	}
	else if (elem.type==elem_type._op)
	{
		for(i=0;i<flowchart_funcs.length;i++)
		{
			if (col>flowchart_funcs[i].max_level)
			{
				continue;
			}
			if (i==elem.val)
			{
				outp+="<option value=\""+i+"\" selected >"+flowchart_funcs[i].op+"</option>";
			}
			else
			{
				outp+="<option value=\""+i+"\" >"+flowchart_funcs[i].op+"</option>";
			}
		}
	}
	else
	{
		for(i=0;i<flowchart_outputs.length;i++)
		{
			if (i==elem.val)
			{
				if ((debug==true)&&
				    ((flowchart_outputs[i].elem_type==data_type._ton)||(flowchart_outputs[i].elem_type==data_type._ctu))
				    )
				{
					var units="ms";
					if (flowchart_outputs[i].elem_type==data_type._ctu)
					{
						units="";
					}
					current_cnt=getTimerCnt_Count(flowchart_outputs[i]);
					outp+="<option value=\""+i+"\" selected >"+flowchart_outputs[i].name+" : "+current_cnt+units+"</option>";
				}
				else
				{
					outp+="<option value=\""+i+"\" selected >"+flowchart_outputs[i].name+"</option>";
				}
			}
			else
			{
				if ((debug==true)&&
				    ((flowchart_outputs[i].elem_type==data_type._ton)||(flowchart_outputs[i].elem_type==data_type._ctu))
				    )
				{
					/*var units="ms";
					if (flowchart_outputs[i].elem_type==data_type._ctu)
					{
						units="";
					}
				
					current_cnt=getTimerCnt_Count(flowchart_outputs[i]);
					outp+="<option value=\""+i+"\"  >"+flowchart_outputs[i].name+" : "+current_cnt+units+"</option>";*/
				}
				else
				{
					outp+="<option value=\""+i+"\"  >"+flowchart_outputs[i].name+"</option>";
				}
			}
		}
	}
	if (elem.type==elem_type._inp)
	{
		flowch_inp_num++;
	}
	if (elem.type==elem_type._outp)
	{
		flowch_outp_num++;
	}
	outp+="</select>"
	return outp;
}

function connectRungDivs(rung_num,elem)
{
	var i,j;
	var rung=flowchart.rungs[rung_num];
	var leaves=rung.leaves;
	for(i=0;i<leaves;i++)
	{
		for(j=0;j<3;j++)
		{
			if (rung.table_data[j+1][i+1]!=undefined)
			{
				if (rung.table_data[j+1][i+1].parent!=null)
				{
					connect(document.getElementById("elem_"+rung_num+"_"+(j+1)+"_"+(i+1)),document.getElementById("elem_"+rung_num+"_"+(rung.table_data[j+1][i+1].parent.col)+"_"+(rung.table_data[j+1][i+1].parent.row)),"blue",2,elem);
				}
			}
		}
	}
	for(i=0;i<rung.actions.length;i++)
	{
		connect(document.getElementById("elem_"+rung_num+"_"+(3)+"_"+(1)),document.getElementById("outp_"+rung_num+"_"+(i)),"red",2,elem);
	}
}




function generateConditionElement(cond_elem)
{
	var i;
	var final_str="";
	
	if (cond_elem.type==elem_type._inp)
	{
		// this is an input
		return flowchart_inputs[cond_elem.val].act_data;
	}
	final_str=flowchart_funcs[cond_elem.val].sym;
	for(i=0;i<cond_elem.inputs.length;i++)
	{
		var elem=generateConditionElement(cond_elem.inputs[i]);
		var repl_elem="#"+(i+1);
		final_str=final_str.replace(repl_elem,elem);
	}
	for(i=0;i<max_constants;i++)
	{
		var repl_elem="#c"+(i+1);
		final_str=final_str.replace(repl_elem,flowchart.constants[i]);
	}
	return final_str;
}


var proc_ast;

var mod_str=
"VAR\r\n" +
"   default__task__1:Default_Task_1\r\n" +
"   ;\r\n" +
" END_VAR\r\n" +
"  TASK Default_Task_1()\r\n" +
"   VAR\r\n" +
"   END_VAR\r\n" +
"   VAR_INPUT\r\n" +
"   END_VAR\r\n" +
"   VAR_INOUT\r\n" +
"   END_VAR\r\n" +
"  END_TASK\r\n" +
"   HMI_BEGIN\r\n" +
"   END_HMI\r\n";

function generateARGEE_Code(upload)
{
	// generate variables
	var block_types=DESCR.block_types;
	var createNewElem=DESCR.createNewElem;
	var findBlockDescr=DESCR.findBlockDescr;

	DESCR.setBasicMode(true);
	
	var prj_elems=createNewElem(findBlockDescr(block_types.root))
	prj_elems.sub_elems[0].sub_elems[1].sub_elems.splice(0,1);
	prj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(0,1);
	prj_elems.sub_elems[0].sub_elems[1].hidden_sub=false;
	prj_elems.sub_elems[2].sub_elems[0].sub_elems[0].expanded=false;
	var reg_vars=prj_elems.sub_elems[0].sub_elems[0].sub_elems;

	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]=default_task_name;
	reg_vars[reg_vars.length-2].values[1]=default_task_type;
	reg_vars[reg_vars.length-2].values[2]=0;
	
	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]="reg1"
	reg_vars[reg_vars.length-2].values[1]="Number";
	reg_vars[reg_vars.length-2].values[2]=0;
	


	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]="reg2"
	reg_vars[reg_vars.length-2].values[1]="Number";
	reg_vars[reg_vars.length-2].values[2]=0;

	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]="tm1"
	reg_vars[reg_vars.length-2].values[1]="Timer/Counter";
	reg_vars[reg_vars.length-2].values[2]=0;

	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]="tm2"
	reg_vars[reg_vars.length-2].values[1]="Timer/Counter";
	reg_vars[reg_vars.length-2].values[2]=0;

	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]="cnt1"
	reg_vars[reg_vars.length-2].values[1]="Timer/Counter";
	reg_vars[reg_vars.length-2].values[2]=0;

	reg_vars.splice(reg_vars.length-1,0,createNewElem(findBlockDescr(block_types.reg_var)));
	reg_vars[reg_vars.length-2].values[0]="cnt2"
	reg_vars[reg_vars.length-2].values[1]="Timer/Counter";
	reg_vars[reg_vars.length-2].values[2]=0;

	
	var func_blocks=prj_elems.sub_elems[1].sub_elems;
	func_blocks.splice(func_blocks.length-1,0,createNewElem(findBlockDescr(block_types.funct_block_var)));
	func_blocks[1].values[0]=default_task_type;
	func_blocks[1].values[1]=1;
	var code_elem=func_blocks[1].sub_elems[0].sub_elems;
	func_blocks[1].sub_elems.splice(1,1);
	DESCR.prog_var_types_enum.splice(DESCR.fixed_var_types_enum,DESCR.prog_var_types_enum.length-DESCR.fixed_var_types_enum);
	DESCR.prog_var_types_enum[DESCR.prog_var_types_enum.length]=default_task_type;
	
	
	
	
	//
	// generate Rung code
	var i,j;
	var num_rungs=0;
	//cond_db=[];
	for(i=0;i<flowchart.rungs.length;i++,num_rungs++)
	{
		if (flowchart.rungs[i].actions.length==1)
		{
			// empty rung
			continue;
		}
		code_elem.splice(code_elem.length-1,0,createNewElem(findBlockDescr(block_types.ladder_condition)));
		cond=code_elem[code_elem.length-2];
		cond.values[0]=generateConditionElement(flowchart.rungs[i].condition);
		var act_list=cond.sub_elems;
		for(j=0;j<(flowchart.rungs[i].actions.length-1);j++)
		{
			
			switch(flowchart_outputs[flowchart.rungs[i].actions[j].val].elem_type)
			{
				case data_type._ton:
					act_list.splice(act_list.length-1,0,createNewElem(findBlockDescr(block_types.ladder_timer_on)));
					act_list[act_list.length-2].values[0]="tm"+flowchart_outputs[flowchart.rungs[i].actions[j].val].act_data;
					act_list[act_list.length-2].values[1]=""+flowchart.timer_exp[flowchart_outputs[flowchart.rungs[i].actions[j].val].act_data-1];
					break;
				case data_type._ctu:
					act_list.splice(act_list.length-1,0,createNewElem(findBlockDescr(block_types.ladder_count_up)));
					act_list[act_list.length-2].values[0]="cnt"+flowchart_outputs[flowchart.rungs[i].actions[j].val].act_data;
					act_list[act_list.length-2].values[1]=""+flowchart.counter_preset[flowchart_outputs[flowchart.rungs[i].actions[j].val].act_data-1];
					break;
				case data_type._reset:
					act_list.splice(act_list.length-1,0,createNewElem(findBlockDescr(block_types.ladder_reset_counter)));
					act_list[act_list.length-2].values[0]="cnt"+flowchart_outputs[flowchart.rungs[i].actions[j].val].act_data;
					break;
				default:
					// coil
					act_list.splice(act_list.length-1,0,createNewElem(findBlockDescr(block_types.ladder_coil)));
					act_list[act_list.length-2].values[0]=flowchart_outputs[flowchart.rungs[i].actions[j].val].act_data;
					break;
			}
		}
	}
    
	ARGEE_elem_descr.proj_elems.sub_elems=prj_elems.sub_elems;
	//IMP.import_proj(mod_str,false,true,false);
	var st;
	st=ARGEE_pre_comp.preCompile(0);
	GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(JSON.stringify(flowchart)));
	var glob=ARGEE_nst_parse.parse(st,true);
	if (glob!=null)
	{
		proc_ast=ARGEE_nst_process.process(glob);
		if (proc_ast.empty_proj==true)
		{
			if (upload==true)
			{
				GOM.addAjaxAction(ARGEE_misc_transf_func.StopProj);
			}
			return;					
		}
		if (ARGEE_nst_code_gen.generate(proc_ast)==true)
		{
			FLOW_AST=proc_ast;
			if (upload==true)
			{
				ARGEE_nst_debug.RunProg(proc_ast);
			}
		}
	}
	var sect,i;
	for(sect=0;sect<2;sect++)
	{
		var fl_elem;
		if (sect==0)
		{
			fl_elem=flowchart_inputs;
		}
		else
		{
			fl_elem=flowchart_outputs;
		}
		for(i=0;i<fl_elem.length;i++)
		{
			if (fl_elem[i].var_name!=undefined)
			{
				var elem=PROCESS.findVarElem(proc_ast,fl_elem[i].var_name.toUpperCase());
				if (elem!=null)
				{
					fl_elem[i].addr=elem.offset;
				}
			}
		}
	}
}

var flowch_inp_num;
var flowch_outp_num;

function renderRung(rung_num,elem,debug)
{
	var rung=flowchart.rungs[rung_num];
	var leaves=rung.leaves;
	var outp="",i,j;
	flowch_inp_num=0;
	flowch_outp_num=0;
	//console.log("renderRung");
	outp+="<div id=\"rung_"+rung_num+"\"><table>"
	for(i=0;i<leaves;i++)
	{
		outp+="<tr>";
		for(j=0;j<3;j++)
		{
			if (rung.table_data[j+1][i+1]!=undefined)
			{
				outp+="<td style=\"padding:15px;\" rowspan=\""+(rung.table_data[j+1][i+1].span)+"\"><div  id=\"elem_"+rung_num+"_"+(j+1)+"_"+(i+1)+"\">";
				outp+=renderRungListBox(rung.table_data[j+1][i+1].elem,rung_num,j,i,debug);
				outp+="</div></td>";
			}
		}
		if (i==0)
		{
			outp+="<td style=\"padding:15px;\" rowspan=\""+leaves+"\">";
			// render outputs
			for(j=0;j<rung.actions.length;j++)
			{
					outp+="<div  id=\"outp_"+rung_num+"_"+j+"\">";
					outp+=renderRungListBox(rung.actions[j],rung_num,4,j,debug);
					outp+="</div>";
			}
			outp+="</td>";
		}
		
		
		outp+="</tr>";
	}
	
	outp+="</table></div>";
	elem.innerHTML+=outp;
	connectRungDivs( rung_num,elem);
}

function fillIO_Inputs()
{
	var i,j,k;
	
	for(i=0;i<IO_ids.length;i++)
	{
		var ind=findIndex(IO_ids[i]);
		for(j=0;j<slices[ind].sections.length;j++)
		{
			if ((j==sect_type.input)||(j==sect_type.diag))
			{
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					if (slices[ind].sections[j].objects[k].length==1)
					{
						// all bit objects are mapped
						flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Slot "+i+"."+slices[ind].sections[j].objects[k].name,elem_type:data_type._bool,act_data:"IO_Slot"+i+"_"+sect_names[j]+"_"+convertString(slices[ind].sections[j].objects[k].name),var_type:var_type.io,add_info:[i,j,k]};
					}
				}
			}
		}
	}
}

function fillIO_Outputs()
{
	var i,j,k;
	
	for(i=0;i<IO_ids.length;i++)
	{
		var ind=findIndex(IO_ids[i]);
		//for(j=0;j<slices[ind].sections.length;j++)
		j=sect_type.output;
		{
			//if (j==sect_type.output)
			{
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					if (slices[ind].sections[j].objects[k].length==1)
					{
						// all bit objects are mapped
						flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"Slot "+i+"."+slices[ind].sections[j].objects[k].name,elem_type:data_type._bool,act_data:"IO_Slot"+i+"_"+sect_names[j]+"_"+convertString(slices[ind].sections[j].objects[k].name),var_type:var_type.io,add_info:[i,j,k]};
					}
				}
			}
		}
	}
}

function getTimerCnt_Count(elem)
{
	var tmp;
	var dt=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
	var curr_timer=GOM.getValDataView("ARGEE_CURR_TIMER_TICK",0).getUint32(0,true);
	if (elem.elem_type==data_type._ctu)
	{
		tmp=dt.getInt32(elem.addr,true);
	}
	else
	{
		var ref=dt.getUint32(elem.addr,true);
		var ctrl=dt.getUint32(elem.addr+4,true);
		var exp=ctrl&0xffffff;
		var done=(ctrl>>24)&1;
		if (done==1)
		{
			tmp=exp;
		}
		else if (exp==0)
		{
			tmp=0;
		}
		else 
		{
			tmp=curr_timer-ref;
		}			
	}
	return tmp;
}

function getTimerCnt_Done(elem)
{
	var tmp;
	var dt=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);
	var val=dt.getUint32(elem.addr+4,true);
	var done=(val>>24)&1;
	return done;
}


function getElemCurrValue(elem)
{
	var val;
	if (elem.var_type!=undefined)
	{
		switch(elem.var_type)
		{
			case var_type.prog:
				  var dt=GOM.getValDataView("ARGEE_GET_PROG_VARS",0);	
                  switch(elem.sub_type)
                  {
                      case var_prg.integer:
						   val=dt.getUint32(elem.addr,true);
						   return val;
                      case var_prg.timer:
						   return getTimerCnt_Done(elem);
                  }
                  break;
			case var_type.io:
				  var ind=findIndex(IO_ids[elem.add_info[0]]);
				  var i,sect;
				  val=0;
				  //for(i=0;i<slices[ind].sections.length;i++)
				  {
					  
					  //if (slices[ind].sections[i].type==elem.add_info[1])
					  {
						   var obj=slices[ind].sections[elem.add_info[1]].objects[elem.add_info[2]];
						  
							if (elem.add_info[0]==0)
							{
								var dt=GOM.getValDataView("ARGEE_IO_DIAG",elem.add_info[0]);
								val=GetGWArrValue(dt,obj.offset,obj.length);
							}
							else
							{
								var dt=GOM.getValDataView(ObjSectMap[elem.add_info[1]],elem.add_info[0]);
								val=GetArrValue(dt,obj.offset,obj.length);
							}
					  }
				  }
			      return val;
			case var_type.plc:
					var plc_dt_inp=new DataView(plc_io_db[plc_sects.input].buffer);
					var plc_dt_outp=new DataView(plc_io_db[plc_sects.output].buffer);
					switch(var_db[var_type.plc].var_list[elem.add_info[0]].section)
					{
						case 0:
							dt=plc_dt_inp;
							break;
						case 1:
							dt=plc_dt_outp;
							break;
					}
					if (var_db[var_type.plc].var_list[elem.add_info[0]].size==0)
					{
						// whole word
						val=dt.getUint16((parseInt(var_db[var_type.plc].var_list[elem.add_info[0]].word_index))*2,true);
					}
					else
					{
						val=dt.getUint16((parseInt(var_db[var_type.plc].var_list[elem.add_info[0]].word_index))*2,true);
						val=(val>>parseInt(var_db[var_type.plc].var_list[elem.add_info[0]].bit_offset))&1;
					}
					return val;
		}
	}
}

function fillInputs()
{
	flowchart_inputs=[];
	fillIO_Inputs();
	flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Timer 1 expired",elem_type:data_type._bool,act_data:"expired(tm1)",var_type:var_type.prog,sub_type:var_prg.timer,add_info:[2],var_name:"tm1"};
	flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Timer 2 expired",elem_type:data_type._bool,act_data:"expired(tm2)",var_type:var_type.prog,sub_type:var_prg.timer,add_info:[3],var_name:"tm2"};
	flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Counter 1 expired",elem_type:data_type._bool,act_data:"expired(cnt1)",var_type:var_type.prog,sub_type:var_prg.timer,add_info:[4],var_name:"cnt1"};
	flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Counter 2 expired",elem_type:data_type._bool,act_data:"expired(cnt2)",var_type:var_type.prog,sub_type:var_prg.timer,add_info:[5],var_name:"cnt2"};
	

	flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Internal Reg 1",elem_type:data_type._bool,act_data:"reg1",var_type:var_type.prog,sub_type:var_prg.integer,add_info:[0],var_name:"reg1"};
	flowchart_inputs[flowchart_inputs.length]={type:elem_type._inp,name:"Internal Reg 2",elem_type:data_type._bool,act_data:"reg2",var_type:var_type.prog,sub_type:var_prg.integer,add_info:[1],var_name:"reg2"};
	
	
	
}


function fillOutputs()
{
	flowchart_outputs=[];
   flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"No Action",elem_type:data_type.no_act,act_data:""};
	fillIO_Outputs();
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"TON Timer 1",elem_type:data_type._ton,act_data:1,var_name:"tm1"};
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"TON Timer 2",elem_type:data_type._ton,act_data:2,var_name:"tm2"};
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"CTU Counter 1",elem_type:data_type._ctu,act_data:1,var_name:"cnt1"};
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"CTU Counter 2",elem_type:data_type._ctu,act_data:2,var_name:"cnt2"};
	
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"RESET Counter 1",elem_type:data_type._reset,act_data:1};
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"RESET Counter 2",elem_type:data_type._reset,act_data:2};

	
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"Internal Reg 1",elem_type:data_type._bool,act_data:"reg1",var_type:var_type.prog,add_info:[0],var_name:"reg1"};
	flowchart_outputs[flowchart_outputs.length]={type:elem_type._outp,name:"Internal Reg 2",elem_type:data_type._bool,act_data:"reg2",var_type:var_type.prog,add_info:[1],var_name:"reg2"};
}

var empty_rung={
				condition:{
				   type:elem_type._op,
				   val:0,
	            inputs:
					  [
					     { type:elem_type._op,
						    val:0, 
							 inputs:
						    [
							   { type:elem_type._inp,
								  val:0,
                        },
							 ]
						  }
						]
				 },
			actions:
			[
			  {type:elem_type._outp,
				val:0},
			]
		};


/*function addRung()
{
	rungs[

}*/	


function cleanEmptyRungs()
{
	var i;
	for(i=0;i<flowchart.rungs.length;i++)
	{
		if (flowchart.rungs[i].actions.length==1)
		{
			flowchart.rungs.splice(i,1);
			i=-1;
			continue;
		}
	}
	renderRungs(flowchart.rungs.length-1,false);
}

function deleteAllRungs()
{
	var i;
	flowchart.rungs.splice(0,flowchart.rungs.length);
	renderRungs(flowchart.rungs.length-1,false);
}

function createEmptyRung()
{
	var elm=clone(empty_rung);
	elm.leaves=countLeaves(elm.condition);
	elm.table_data=[];
	computeTableCol(elm,elm.condition,3,null);
	return elm;
}

function addEmptyRungs()
{
	var i;
	for(i=0;i<4;i++)
	{
		flowchart.rungs[flowchart.rungs.length]=createEmptyRung();
	}
	renderRungs(flowchart.rungs.length-1,false);
}

function is_int(value){ 
   for (i = 0 ; i < value.length ; i++) 
   { 
      if ((value.charAt(i) < '0') || (value.charAt(i) > '9')) return false; 
   } 
   if (value.length==0)
   {
       alert("Empty field");
	   return false;
   }
   var num=parseFloat(value);
   if (num>(60*60*1000))   
   {
	   alert("Value out of range 1..3600000");
	   return false;
   }
   return true; 
}

function elemNumChange(elem,arr,ind)
{
	var val=elem.value;
	if (is_int(val)==true)
	{
        // taken from http://stackoverflow.com/questions/2523779/javascript-eval-function-returning-octal-value
	    // remove leading zeros to avoid octal conversion
		var str=arr+"["+ind+"]="+val.replace(/\b0(\d+)\b/g, '$1')+";";
		eval(str);
		saveFlowchart();
	}
	else
	{
		alert("Invalid value "+val+" - Reverting to the old value");
	}
	renderRungs(last_act_rung,false);
}

function renderRungs(act_rung,debug)
{
	var i;
	var elem_rend=document.getElementById("prog");
	var tbl="";
	//console.log("renderRungs");
	elem_rend.innerHTML="<div id=\"upper\"></div><div id=\"lower\"  style=\" position: fixed; top: 12em; bottom:0px; overflow-y:auto; -webkit-overflow-scrolling: touch;\"></div>";

	var top_elem=document.getElementById("upper");
	
	var lower_elem=document.getElementById("lower");
   var disabled="";
   if (debug==true)
   {
      disabled=" disabled ";
   }
	
	tbl+="<table>";
	for(i=0;i<2;i++)
	{
		tbl+="<tr>";
/*		tbl+="<td>";
		tbl+="const "+i+": "+"<input type=\"text\" value=\""+flowchart.constants[i]+"\" onchange=\"elemNumChange(this,'constants',"+i+")\">";
		tbl+="</td>";*/
		tbl+="<td>";
		tbl+="Timer "+(i+1)+" Expiration (in milliseconds): "+"<input type=\"text\""+disabled+" value=\""+flowchart.timer_exp[i]+"\" onchange=\"FLOW.elemNumChange(this,'flowchart.timer_exp',"+i+")\">";
		tbl+="</td>";
		tbl+="<td>";
		tbl+="Counter "+(i+1)+" - Count From 0 To: "+"<input type=\"text\""+disabled+" value=\""+flowchart.counter_preset[i]+"\" onchange=\"FLOW.elemNumChange(this,'flowchart.counter_preset',"+i+")\">";
		tbl+="</td>";
		tbl+="</tr>";
	}
	tbl+="</table>";
	top_elem.innerHTML=tbl;
	lower_elem.innerHTML="";	
	for(i=0;i<flowchart.rungs.length;i++)
	{
		
		renderRung(i,lower_elem,debug);
		
	}
	
	if (debug==false)
	{
		
		//lower_elem.innerHTML+="<button onclick=\"generateARGEE_Code(true);\">Generate Code</button>";
		lower_elem.innerHTML+="<button onclick=\"FLOW.cleanEmptyRungs();\">Clean Empty Rungs</button>";
		lower_elem.innerHTML+="<button onclick=\"FLOW.addEmptyRungs();\">Add Empty Rungs</button>";
		lower_elem.innerHTML+="<button onclick=\"FLOW.deleteAllRungs();\">Delete All Rungs</button>";
		
	}
	
	if (act_rung>=0)
	{
		var el = document.getElementById("rung_"+act_rung);
		el.scrollIntoView(true);
	}
	
}

var start_flowchart_test=false;

function* downloadProgElements()
{
	// extract OIDs 
	console.log("start exchange");
	yield* GOM.objectExchange("ARGEE_GET_PROG_VARS",0,"UID_TO_OID",false);
	yield* GOM.objectExchange("ARGEE_IO_INP",0,"UID_TO_OID",false);
	yield* GOM.objectExchange("ARGEE_IO_OUTP",0,"UID_TO_OID",false);
	yield* GOM.objectExchange("ARGEE_IO_DIAG",0,"UID_TO_OID",false);
	yield* GOM.objectExchange("ARGEE_GET_PLC_INP",0,"UID_TO_OID",false);
	yield* GOM.objectExchange("ARGEE_GET_PLC_OUTP",0,"UID_TO_OID",false);
	yield* GOM.objectExchange("ARGEE_CURR_TIMER_TICK",0,"UID_TO_OID",false);
	
	// read out appropriate vars/IO/PLC objects
	var obj_list=["ARGEE_GET_PROG_VARS","ARGEE_IO_INP","ARGEE_IO_OUTP","ARGEE_IO_DIAG","ARGEE_GET_PLC_INP","ARGEE_GET_PLC_OUTP","ARGEE_CURR_TIMER_TICK"];
	yield* GOM.objectExchange(obj_list,0,"MULT_INST_READ",false);
	console.log("end exchange");

	console.log("update vars");
	if (start_flowchart_test==true)
	{
      if (SIM.getSimMode()==true)
      {
         var i;
         for(i=0;i<IO_ids.length;i++)
         {
            GOM.setObjArr("ARGEE_IO_INP_SUBM_MIRR",i,GOM.getObjArr("ARGEE_IO_INP",i));
            GOM.setObjArr("ARGEE_IO_DIAG_SUBM_MIRR",i,GOM.getObjArr("ARGEE_IO_DIAG",i));
         }

         
      }

		debugFlowchart();
		start_flowchart_test=false;
	}
	else
	{
		debugUpdateFlowchart();
	}
	//DEB_UpdateVars(true);
}

var flow_last_submission=[];

function* flowSimSubmVarMods()
{
   var res=yield* TRANSF.Login();
	if (res==false)
	{
		return;
	}
   yield* GOM.objectExchange(flow_last_submission[0],flow_last_submission[1],"WRITE_WITH_OFFSET",false,[[flow_last_submission[2],flow_last_submission[3]]]);
   GOM.finAjaxAction();

   
}

function onSimClick(inp_elem)
{
   var elem=flowchart_inputs[inp_elem];
   if (elem.var_type==var_type.io)
   {
         //var ind=findIndex(IO_ids[elem.add_info[0]]);
         var i,sect;
			var val=0;
         var obj_name="ARGEE_IO_INP_SUBM_MIRR";
         if (elem.add_info[1]==2)
         {
            obj_name="ARGEE_IO_DIAG_SUBM_MIRR";
         }
         var subm_obj={};
         subm_obj.redir_obj=obj_name;
         dv=GOM.getValDataView(obj_name,elem.add_info[0]);
         var offset,len;
         var ref_obj=slices[elem.add_info[0]].sections[elem.add_info[1]].objects[elem.add_info[2]];
         var curr_val=GetArrValue(dv,ref_obj.offset,ref_obj.length);
         if (curr_val==0)
         {
            curr_val=1;
         }
         else
         {
            curr_val=0;
         }
         SetArrValue(dv,ref_obj.offset,ref_obj.length,curr_val);
         flow_last_submission[0]=obj_name;
         flow_last_submission[1]=elem.add_info[0];
         flow_last_submission[2]=(ref_obj.offset/8)|0;
         flow_last_submission[3]=1; // always 1 byte is submitted
         GOM.addAjaxAction(flowSimSubmVarMods);
   }
	var jk=1;	
	return false;
}

function debugUpdateFlowchart()
{
	var upd_elem_list=document.querySelectorAll('[data-flowch_main_elem=\'true\']');
	var jk=1;
	var i;
	for(i=0;i<upd_elem_list.length;i++)
	{
		var val=false;
		var bg_color="";
		var sel=upd_elem_list[i].selectedIndex;
		var elem=JSON.parse(upd_elem_list[i].dataset.flowch_update);

		
		
		if (elem.type==elem_type._inp)
		{
			val=getElemCurrValue(flowchart_inputs[elem.ref_elem_num]);
		}
		if (elem.type==elem_type._outp)
		{
			val=getElemCurrValue(flowchart_outputs[elem.ref_elem_num]);		
			if ((flowchart_outputs[elem.ref_elem_num].elem_type==data_type._ton)||(flowchart_outputs[elem.ref_elem_num].elem_type==data_type._ctu))
			{
				val=getTimerCnt_Done(flowchart_outputs[elem.ref_elem_num]);
				if (val==1)
				{
					val=true;
				}
				else
				{
					val=false;
				}
            var current_cnt;
            var units="ms";
				if (flowchart_outputs[elem.ref_elem_num].elem_type==data_type._ctu)
				{
					units="";
				}
				current_cnt=getTimerCnt_Count(flowchart_outputs[elem.ref_elem_num]);
				upd_elem_list[i].options[upd_elem_list[i].selectedIndex].innerHTML=flowchart_outputs[elem.ref_elem_num].name+" : "+current_cnt+units;
				//console.log("timer state "+getTimerCnt_Count(flowchart_outputs[elem.val])+" "+getTimerCnt_Done(flowchart_outputs[elem.val]));
			}
		}
		if (val==true)
		{
         if ((elem.type==elem_type._inp)||(elem.type==elem_type._outp))
         {
            upd_elem_list[i].style.backgroundColor="#00FF00";
         }
		}
		else
		{
         upd_elem_list[i].style.backgroundColor="#FFFFFF";
		}
		
		//upd_elem_list[i].options[upd_elem_list[i].selectedIndex].innerHTML="Test "+i;
	}
}

function runFlowchart()
{
	showFlowchart();
	monitoring_mode=false;

	generateARGEE_Code(true);
	//argee_run_mode=run_mode_types.FLOW_DEBUG;
	return true;
}

function testFlowchart()
{
	start_flowchart_test=true;
	GOM.autoRefreshStart(downloadProgElements);
	
/*	generateARGEE_Code(false);
	allocVars();
	if (monitoring_mode==false)
	{
		getVars();
	}
	debugMode=true;
	monitoring_mode=true;
	flowchart_debug_mode=true;
	//CodeDebugView();
	return true;*/
}

function convertToArgee()
{
	var ret=confirm("You will not be able to switch back to the Flowchart view.\nClick \"OK\" to Proceed");
    if (ret==false)	
	{
		return false;
	}


	generateARGEE_Code(false);
	editor="regular";
	flowchart={constants:[0,0],timer_exp:[0,0],counter_preset:[0,0],rungs:[]};
	adjustMenuScreen(1);
	DESCR.renderInCompactMode();
	renderMenu("show_pro_menu_only");
	return true;
}
	
function recomputeTable()
{
	var i;
	var rung;
	for(i=0;i<flowchart.rungs.length;i++)
	{
		rung=flowchart.rungs[i];
		rung.table_data=[];
		computeTableCol(rung,rung.condition,3,null);
		rung.leaves=countLeaves(rung.condition);
	}
}		

function showFlowchart()
{
	monitoring_mode=false;
	var vars_div=document.getElementById("vars");
	var empty_flowchart=false;
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";
	
	GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.FLOWCHART);	
	fillInputs();
	fillOutputs();
	
	// if flowchart is empty - add dummy rungs
	if (flowchart.rungs.length==0)
	{
		empty_flowchart=true;
		addEmptyRungs();	
	}
	recomputeTable();
	if (empty_flowchart==false)
	{
		renderRungs(0,false);
	}
}
function debugFlowchart()
{
	monitoring_mode=true;
	recomputeTable();
	renderRungs(0,true);
}


function addElemChild(elem)
{
	if (elem.inputs[0].type==elem_type._inp)
	{
		elem.inputs[elem.inputs.length]={ type:elem_type._inp, val:0};
	}
	else
	{
		elem.inputs[elem.inputs.length]={ type:elem_type._op,
						    val:0, 
							 inputs:
						    [
							   { type:elem_type._inp,
								  val:0,
                        },
							 ]
						  };
	}
}



function onFuncChange(rung_num,elem_col,elem_row)
{
	
	var val=parseInt(window.document.activeElement.value);
	var elem_rend=document.getElementById("prog");
	var rung=flowchart.rungs[rung_num];
	last_act_rung=rung_num;
	
	if (elem_col==4)
	{
	   if (val!=rung.actions[elem_row].val)
		{
			if (val==0)
			{
				if (rung.actions.length>0)
				{
					rung.actions.splice(elem_row,1);
				}
			}
			else
			{
				if (rung.actions[elem_row].val==0)
				{
					rung.actions[rung.actions.length]={type:elem_type._outp,val:0};
				}
				rung.actions[elem_row].val=val;
			}
		}
	}
	else
	{
		
		
		
		var elem=rung.table_data[elem_col+1][elem_row+1];
		var i;
		if ((elem.elem.type==elem_type._op)&&(elem.elem.val!=val))
		{
			if (flowchart_funcs[val].num_arg>flowchart_funcs[elem.elem.val].num_arg)
			{
				for(i=flowchart_funcs[elem.elem.val].num_arg;i<flowchart_funcs[val].num_arg;i++)
				{
					addElemChild(rung.table_data[elem_col+1][elem_row+1].elem);
					
				}
			}
			if (flowchart_funcs[val].num_arg<flowchart_funcs[elem.elem.val].num_arg)
			{
				for(i=flowchart_funcs[elem.elem.val].num_arg;i>flowchart_funcs[val].num_arg;i--)
				{
					rung.table_data[elem_col+1][elem_row+1].elem.inputs.splice(rung.table_data[elem_col+1][elem_row+1].elem.inputs.length-1,1);
				}
			}
		}
		
		rung.table_data=[];
		computeTableCol(rung,rung.condition,3,null);
		rung.leaves=countLeaves(rung.condition);
		elem=rung.table_data[elem_col+1][elem_row+1];
		elem.elem.val=val;
		
	}
	saveFlowchart();
	renderRungs(last_act_rung,false);
}

// return the actions array based on the inputs
function retriveActions(parent)
{
	var rules=[];
	var i;

	if (parent.type==elem_type._op)
	{
		for(i=0;i<flowchart_funcs.length;i++)
		{
			if (flowchart_funcs[i].max_level>1)
			{
				rules[rules.length]=flowchart_funcs[i];
			}				
		}
		return rules;
	}
	else
	{
		for(i=0;i<flowchart_funcs.length;i++)
		{
			if ((parent.elem_type==flowchart_funcs[i].inp_type)||(flowchart_funcs[i].inp_type==data_type._any))
			{
				rules[rules.length]=flowchart_funcs[i];
			}
		}
	}
}

function initProj()
{
	flowchart={constants:[0,0],timer_exp:[0,0],counter_preset:[0,0],rungs:[]};
	flowchart.editor=ENV.FLOWCHART;
}


		
return {
	showFlowchart:showFlowchart,
	convertToArgee:convertToArgee,
	runFlowchart:runFlowchart,
	testFlowchart:testFlowchart,
	onFuncChange:onFuncChange,
	elemNumChange:elemNumChange,
	loadFlowchart:loadFlowchart,
	importFlowchart:importFlowchart,
	generateARGEE_Code:generateARGEE_Code,
	addEmptyRungs:addEmptyRungs,
	cleanEmptyRungs:cleanEmptyRungs,
	deleteAllRungs:deleteAllRungs,
	onSimClick:onSimClick,	
	initProj:initProj,
   flowSimSubmVarMods:flowSimSubmVarMods,
}
}());

var FLOW=ARGEE_Flowchart;							 
var FLOW_AST;

