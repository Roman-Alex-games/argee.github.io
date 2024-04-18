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
 *  DESCRIPTION: Converter from GUI to ST. Takes the GUI datastructure of ARGEE PRO
 *               as an input and generates ST code that is used by the compiler.
 *
 *******************************************************************************/

var ARGEE_pre_comp=(function()
{ 

var str="";

var pre_comp_buf=[];
var descr_lookup=ARGEE_elem_descr.descr_lookup;


var remap_types=["INT","REAL","CHAR","BYTE","WORD","TIMER","STATE","RETAIN_INT","RETAIN_REAL"]

function substType(obj)
{
	
	if ((obj.values!=undefined)&&(obj.rel_type!=undefined)&&((descr_lookup[obj.rel_type].fields!=undefined)))
	{		
		var i;
		var fields=descr_lookup[obj.rel_type].fields;
		for(i=0;i<fields.length;i++)
		{
			if ((fields[i].type==field_types.enumeration_special)&&(DESCR.isTypeEnum(fields[i])))
			{
				var ind=DESCR.getProgTypeInd(obj.values[i]);
				if (ind<remap_types.length)
				{
					obj.values[i]=remap_types[ind];
				}
				else
				{
					obj.values[i]=obj.values[i];
				}
			}
		}
	}
}

function findNextMeaningfulElement(list,start)
{
	var i;
	for(i=start;i<list.length;i++)
	{
		if ((list[i].type==block_types.add_block)||(list[i].type==block_types.comment_var))
		{
			continue;
		}
		break;
	}
	if (i==list.length)
	{
		return null;
	}
	return 	list[i];	
}

function createPreParseTree(elem,index,parent)
{
	var prop,i;
	var obj={};
	var tmp=[];
	
	
	for(prop in elem)
	{
		if (prop!="sub_elems")
		{
			if (elem.type==block_types.comment_var)
			{
				if (parent.type==block_types.alias_vars)
				{
					elem.values[1]="1";
				}
				else if (parent.type==block_types.prog_vars)
				{
					elem.values[1]="0";
				}
				var jk=1;
			}
			obj[prop]=fastClone(elem[prop]);
		}
		else
		{
			obj.sub_elems=[];
			if (elem.type==block_types.comment_var)
			{
				var jk=1;
			}
			if ((elem.type==block_types.reg_var)&&(elem.sub_elems.length>0))
			{
				var obj1=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.module))
				if (elem.sub_elems[0].values[0].length==0)
				{
					obj1.values=fastClone(elem.sub_elems[0].values);
					obj1.type=block_types.init_block_simp;
				}
				else
				{
					obj1.type=block_types.init_block;
					for(i=0;i<elem.sub_elems.length;i++)
					{
						obj1.sub_elems[i]=fastClone(elem.sub_elems[i]);
						if ((i==0)&&(elem.sub_elems[i].values[0].length==0))
						{
							obj1.sub_elems[i].type=block_types.init_block_first_elem_simp;
						}
						else if (i==0)
						{
							obj1.sub_elems[i].type=block_types.init_block_first_elem;
						}
						else
						{
							obj1.sub_elems[i].type=block_types.init_block_other_elem;
						}
					}
				}
				obj.sub_elems[0]=obj1;
				
			}	
			else if (elem.type==block_types.enum_var)
			{
				var first_enum_elem=true;
				var j;
				j=0;
				for(i=0;i<elem.sub_elems.length;i++)
				{
					if ((elem.sub_elems[i].type!=block_types.enum_var_elem)&&(elem.sub_elems[i].type!=block_types.comment_var))
					{
						continue;
					}
					tmp=index.slice(0);
					tmp.splice(tmp.length,0,i);
					obj.sub_elems[j]=fastClone(createPreParseTree(elem.sub_elems[i],tmp,elem));
					if (elem.sub_elems[i].type==block_types.comment_var)
					{
						obj.sub_elems[j].values[1]="4";
					}
					if (elem.sub_elems[i].type==block_types.enum_var_elem)
					{
						
						if (first_enum_elem==true)
						{
							first_enum_elem=false;
							if (elem.sub_elems[i].values[1].length!=0)
							{
								obj.sub_elems[j].type=block_types.conv_enum_first_elem_with_const;
							}
							else
							{	
								obj.sub_elems[j].type=block_types.conv_enum_first_elem;
							}
						}
						else
						{
							if (elem.sub_elems[i].values[1].length!=0)
							{
								obj.sub_elems[j].type=block_types.conv_enum_other_elem_with_const;
							}
							else
							{	
								obj.sub_elems[j].type=block_types.conv_enum_other_elem;
							}
						}
					}
					j++;
				}
			}
			else if (elem.type==block_types.funct_block_var)
			{
				// elem 0 is always the "code" element
				tmp=index.slice(0);
				tmp.splice(tmp.length,0,0);
				if (obj.values[1]>0)
				{
					obj.type=block_types.conv_task_func_block; 
				}
				else
				{
					obj.type=block_types.conv_reg_func_block;
				}
				// create argument list
				var j;
				var arg_list="";
				for(j=0;j<elem.sub_elems.length;j++)
				{
					if ((elem.sub_elems[j].type==block_types.funct_block_elem_var)&&(num(elem.sub_elems[j].values[2])>0))
					{
						if (arg_list.length>0)
						{
							arg_list+=",";
						}
						arg_list+=elem.sub_elems[j].values[0];
					}
				}
				obj.values[2]=arg_list;
					
				
				
				obj.sub_elems[2]=fastClone(createPreParseTree(elem.sub_elems[0],tmp,elem));
				obj.sub_elems[2].index=fastClone(tmp);
				obj.sub_elems[2].rel_type=elem.sub_elems[0].type;
				obj.sub_elems[0]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.conv_func_block_var))
				obj.sub_elems[1]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.conv_func_block_var))				
				obj.sub_elems[1].type=block_types.conv_func_block_var_in;
				for(i=1;i<elem.sub_elems.length;i++)
				{
					tmp=index.slice(0);
					tmp.splice(tmp.length,0,i);
					if (elem.sub_elems[i].type==block_types.add_block)
					{
						continue;
					}
					if (elem.sub_elems[i].type==block_types.comment_var)
					{
						// bind the comment to the same segment as the next variable.
						// if it is the last element -> it is part of "regular" variables
						var type=0;
						var next_elem=findNextMeaningfulElement(elem.sub_elems,i);
						if (next_elem!=null)
						{
							type=num(next_elem.values[2]);
						}
						if (type==0)
						{
							elem.sub_elems[i].values[1]="2";
						}
						else
						{
							elem.sub_elems[i].values[1]="3";
						}
						obj.sub_elems[type].sub_elems[obj.sub_elems[type].sub_elems.length]=fastClone(elem.sub_elems[i]);
						obj.sub_elems[type].sub_elems[obj.sub_elems[type].sub_elems.length-1].index=fastClone(tmp);				
					}
					else
					{
						var type=num(elem.sub_elems[i].values[2]);
						obj.sub_elems[type].sub_elems[obj.sub_elems[type].sub_elems.length]=fastClone(elem.sub_elems[i]);
						obj.sub_elems[type].sub_elems[obj.sub_elems[type].sub_elems.length-1].index=fastClone(tmp);				
						obj.sub_elems[type].sub_elems[obj.sub_elems[type].sub_elems.length-1].rel_type=elem.sub_elems[i].type;
						substType(obj.sub_elems[type].sub_elems[obj.sub_elems[type].sub_elems.length-1]);
					}
				}
			}
			else if ((elem.type==block_types.func_block_call)||(elem.type==block_types.ladder_func_block_call))
			{
				// substitute assigns within function_block_call for easier processing
				for(i=0;i<elem.sub_elems.length;i++)
				{
					tmp=index.slice(0);
					tmp.splice(tmp.length,0,i);
					obj.sub_elems[obj.sub_elems.length]=fastClone(createPreParseTree(elem.sub_elems[i],tmp,elem));
					if (obj.sub_elems[obj.sub_elems.length-1].type==block_types.func_block_assign)
					{
						if (i==0)
						{
							obj.sub_elems[obj.sub_elems.length-1].type=block_types.conv_func_block_assign_first;
						}
						else
						{
							obj.sub_elems[obj.sub_elems.length-1].type=block_types.conv_func_block_assign_others;
						}
					}
					obj.sub_elems[obj.sub_elems.length-1].index=fastClone(tmp);
				}
			}
			else
			{
				// substitute if_then_else for easier processing
				for(i=0;i<elem.sub_elems.length;i++)
				{
					if (elem.sub_elems[i].type==block_types.if_then)
					{
						var curr=obj.sub_elems.length;
						obj.sub_elems[curr]={type:block_types.conv_if,sub_elems:[],index:fastClone(tmp)};
						tmp=index.slice(0);
						tmp.splice(tmp.length,0,i);
						var sub_obj=createPreParseTree(elem.sub_elems[i],tmp,elem);
						sub_obj.type=block_types.conv_if_then;
						obj.sub_elems[curr].sub_elems[obj.sub_elems[curr].sub_elems.length]=fastClone(sub_obj);
						obj.sub_elems[curr].sub_elems[obj.sub_elems[curr].sub_elems.length-1].index=fastClone(tmp);
						i++;
						for(;i<elem.sub_elems.length;i++)
						{
							if (elem.sub_elems[i].type==block_types.else_if)
							{
								tmp=index.slice(0);
								tmp.splice(tmp.length,0,i);
								sub_obj=createPreParseTree(elem.sub_elems[i],tmp,elem);
								sub_obj.type=block_types.conv_else_if;
								obj.sub_elems[curr].sub_elems[obj.sub_elems[curr].sub_elems.length]=fastClone(sub_obj);
								obj.sub_elems[curr].sub_elems[obj.sub_elems[curr].sub_elems.length-1].index=fastClone(tmp);
							}
							else if (elem.sub_elems[i].type==block_types.add_block)
							{
								
							}
							else
							{
								break;
							}
						}
						if ((i<elem.sub_elems.length)&&(elem.sub_elems[i].type==block_types.else_done))
						{
							tmp=index.slice(0);
							tmp.splice(tmp.length,0,i);
							sub_obj=createPreParseTree(elem.sub_elems[i],tmp,elem);
							sub_obj.type=block_types.conv_else;
							obj.sub_elems[curr].sub_elems[obj.sub_elems[curr].sub_elems.length]=fastClone(sub_obj);
							obj.sub_elems[curr].sub_elems[obj.sub_elems[curr].sub_elems.length-1].index=fastClone(tmp);
							i++;
						}
						if (i<elem.sub_elems.length)
						{
							i--;
						}
					}
					else if (elem.sub_elems[i].type==block_types.else_if)
					{
						tmp=index.slice(0);
						tmp.splice(tmp.length,0,i);
						if (prog_view==true)
                        {                            
                            setCompilerMessage(false,true,"Error: \"Elseif without If\"");
                            DESCR.showErrorLine(tmp,elem.sub_elems[i].vis_elem_type);
                        }
						throw "1";
						return null;
					}
					else if (elem.sub_elems[i].type==block_types.else_done)
					{
						tmp=index.slice(0);
						tmp.splice(tmp.length,0,i);
						if (prog_view==true)
                        {                            
                            setCompilerMessage(false,true,"Error: \"Else without If\"");
                            DESCR.showErrorLine(tmp,elem.sub_elems[i].vis_elem_type);
                        }
						throw "1";
						
						return null;
					}
					else
					{
						tmp=index.slice(0);
						tmp.splice(tmp.length,0,i);
						obj.sub_elems[obj.sub_elems.length]=fastClone(createPreParseTree(elem.sub_elems[i],tmp,elem));
						obj.sub_elems[obj.sub_elems.length-1].index=fastClone(tmp);
						obj.sub_elems[obj.sub_elems.length-1].rel_type=elem.sub_elems[i].type;
						substType(obj.sub_elems[obj.sub_elems.length-1]);
					}
				}
			}
		}
	}
	return obj;
}


var block_types=ARGEE_elem_descr.block_types;

var conv_rules=
[
	{type:block_types.assign,arr:[[0,":=",1,";"],[]]},
	{type:block_types.func_block_assign,arr:[[0,":=",1,";"],[]]},
	
	{type:block_types.do_while,arr:[["WHILE (",0,")DO"],["END_WHILE"]]},
	{type:block_types.conv_if,arr:[[],["END_IF"]]},
	{type:block_types.conv_if_then,arr:[["IF (",0,") THEN"],[]]},
	{type:block_types.conv_else_if,arr:[["ELSIF (",0,")"],[]]},
	{type:block_types.conv_else,arr:[["ELSE"],[]]},
	{type:block_types.func_call,arr:[[0,";"],[]]},
	{type:block_types.ladder_func_block_call,arr:[["CONDITIONAL_EXEC_BEGIN IF (GET_RUNG_TRUE(0)=1) THEN ",0,"; END_IF "],["CONDITIONAL_EXEC_END"]]},
	{type:block_types.func_block_call,arr:[[0,";"],[]]},

	{type:block_types.init_block,arr:[[":=("],[")"]]},
	{type:block_types.init_block_simp,arr:[[":=",1],[]]},
	{type:block_types.init_block_first_elem_simp,arr:[[1],[]]},
	{type:block_types.init_block_first_elem,arr:[[0,":=",1],[]]},
	{type:block_types.init_block_other_elem,arr:[[",",0,":=",1],[]]},
	{type:block_types.wait_until,arr:[["WAIT_UNTIL(",0,");"],[]]},
	
	{type:block_types.conv_func_block_assign_first,arr:[[0,":=",1],[]]},
	{type:block_types.conv_func_block_assign_others,arr:[[",",0,":=",1],[]]},
	// vars
	{type:block_types.device,arr:[["VAR"],["END_VAR"]]},
	{type:block_types.for_loop,arr:[["FOR ",0,":=",1," TO ",2," DO"],["END_FOR"]]},
	
	/*{type:block_types.alias_var,match_enum_elem:2,format_switch_cond_value:3,switch_threshold:0,
		arr:[
		     [0," :ALIAS	AT ",1,";"],[],
			 [0," :BYTE AT ",1,";"],[],
			 [0," :WORD AT ",1,";"],[],
			 [0," :DWORD AT ",1,";"],[],
			 
			 [0," :ALIAS	AT ",1,";"],[],
			 [0," :ARRAY[0..",3,"] OF BYTE AT ",1,";"],[],
			 [0," :ARRAY[0..",3,"] OF WORD AT ",1,";"],[],
			 [0," :ARRAY[0..",3,"] OF DWORD AT ",1,";"],[],
			 
			]
	},*/
	{type:block_types.alias_var,arr:[[0,":ALIAS	AT ",1,";"],[]]},
	
	{type:block_types.reg_var, second_format_adder:-1,format_switch_cond_value:2,switch_threshold:0,arr:[[0,":",1],[";"],[0,": ARRAY [0..",2,"] OF ",1],[";"]]},
	//{type:block_types.plc_var,format_switch_cond_value:3,switch_threshold:0,arr:[[0,": WORD AT PLC:",1,":",2,";"],[],[0,": ARRAY [0..",3,"] OF WORD AT PLC:",1,":",2,";"],[]]},
	{type:block_types.enum_var,arr:[["ENUM "],["END_ENUM"]]},	
	{type:block_types.conv_enum_first_elem,arr:[[0],[]]},	
	{type:block_types.conv_enum_other_elem,arr:[[",",0],[]]},	
	
	{type:block_types.conv_enum_first_elem_with_const,arr:[[0,":",1],[]]},	
	{type:block_types.conv_enum_other_elem_with_const,arr:[[",",0,":",1],[]]},	

	{type:block_types.module,arr:[["LIBRARY (\"",0,"\",\"",1,"\");"],[]]},	
	
	{type:block_types.conv_func_block_var,arr:[["VAR"],["END_VAR"]]},	
	{type:block_types.conv_func_block_var_in_out,arr:[["VAR_INOUT"],["END_VAR"]]},
	{type:block_types.conv_func_block_var_in,arr:[["VAR_INPUT"],["END_VAR"]]},	
	
	{type:block_types.funct_block_elem_var, second_format_adder:-1,format_switch_cond_value:3,switch_threshold:0,arr:[[0,":",1,";"],[],[0,": ARRAY [0..",3,"] OF ",1,";"],[]]},
	{type:block_types.conv_task_func_block,arr:[["TASK ",0,"()"],["END_TASK"]]},	
	{type:block_types.function_block_group,arr:[["FUNCTION_BLOCK_GROUP ",0," VAR END_VAR"],["END_FUNCTION_BLOCK_GROUP"]]},		
	{type:block_types.conv_reg_func_block,arr:[["FUNCTION_BLOCK ",0,"(",2,")"],["END_FUNCTION_BLOCK"]]},	
	{type:block_types.ladder_condition,arr:[["ladder_condition(",0,");"],[]]},	
	{type:block_types.ladder_assign,arr:[["ladder_assign (",0,",",1,");"],[]]},
	{type:block_types.ladder_coil,arr:[["ladder_coil (",0,");"],[]]},
	{type:block_types.ladder_timer_on,arr:[["ladder_timer_on (",0,",",1,");"],[]]},
	{type:block_types.ladder_count_up,arr:[["ladder_count_up (",0,",",1,");"],[]]},
	{type:block_types.ladder_timer_off,arr:[["ladder_timer_off (",0,",",1,");"],[]]},
	{type:block_types.ladder_count_down,arr:[["ladder_count_down (",0,",",1,");"],[]]},
	{type:block_types.ladder_reset_counter,arr:[["ladder_count_reset (",0,");"],[]]},
	{type:block_types.ladder_timer_start,arr:[["ladder_timer_start (",0,",",1,");"],[]]},
	{type:block_types.trace,arr:[["trace (\"",0,"\",",1," );"],[]]},
	{type:block_types.ladder_trace,arr:[["ladder_trace (\"",0,"\",",1," );"],[]]},
	
	
	{type:block_types.hmi_screens,arr:[["HMI_BEGIN"],["END_HMI"]]},

	{type:block_types.hmi_image_group,arr:[["HMI_IMAGE_GROUP "],["END_HMI_IMAGE_GROUP"]]},	
	{type:block_types.hmi_image,arr:[["HMI_IMAGE(\"",0,"\",\"",1,"\");"],[]]},

	{type:block_types.hmi_screen,arr:[["HMI_SCREEN \"",0,"\""],["END_HMI_SCREEN"]]},
		
	{type:block_types.hmi_grid_screen,arr:[["HMI_GRID_SCREEN ",0,";"],["END_HMI_GRID_SCREEN"]]},
	{type:block_types.hmi_grid_row,arr:[["HMI_GRID_ROW ",0,";"],["END_HMI_GRID_ROW"]]},
	{type:block_types.hmi_grid_section,arr:[["HMI_GRID_SECTION ",0,";"],["END_HMI_GRID_SECTION"]]},
	{type:block_types.hmi_grid_elem,arr:[[0,";"],[]]},

	
	
	{type:block_types.hmi_section,arr:[["HMI_SECTION \"",0,"\""],["END_HMI_SECTION"]]},
	{type:block_types.hmi_disp_num,arr:[["hmi_disp_num( \"",0,"\",",1,",\"",2,"\");"],[]]},
	{type:block_types.hmi_disp_range,arr:[["hmi_disp_range( \"",0,"\",",1,",\"",2,"\",",3,",",4,");"],[]]},
	{type:block_types.hmi_disp_hex,arr:[["hmi_disp_hex( \"",0,"\",",1,");"],[]]},
	{type:block_types.hmi_enter_num,arr:[["hmi_enter_num( \"",0,"\",",1,",\"",2,"\");"],[]]},
	{type:block_types.hmi_enter_state,arr:[["hmi_enter_state( \"",0,"\",",1,",",2,",",3,");"],[]]},
	{type:block_types.hmi_button,arr:[["hmi_button( \"",0,"\",",1,");"],[]]},
	{type:block_types.hmi_screen_color,arr:[["hmi_screen_color(",0,");"],[]]},
	{type:block_types.hmi_screen_list,arr:[["hmi_screen_list( \"",0,"\",\"",1,"\");"],[]]},
	
	{type:block_types.comment,arr:[["COMMENT(\"",0,"\");"],[]]},
	{type:block_types.comment_var,arr:[["COMMENT(\"",0,"\",",1,");"],[]]},
	{type:block_types.ladder_comment,arr:[["LADDER_COMMENT(\"",0,"\");"],[]]},
];

var rule_lookup=[];

function createRuleLookup()
{
	var i;
	for(i=0;i<conv_rules.length;i++)
	{
		rule_lookup[conv_rules[i].type]=conv_rules[i];
	}
}

function handleElemConv(elem,start,indent,mode)
{
	var rule,i;
	var str="";
	
	
	if ((rule=rule_lookup[elem.type])!=undefined)
	{
		var format;
		if (rule.match_enum_elem!=undefined)
		{
			var start_offset=0;
			if (rule.format_switch_cond_value!=undefined)
			{
				if (num(elem.values[rule.format_switch_cond_value])>rule.switch_threshold)
				{
					start_offset=rule.arr.length/2;
				}
				
			}
			if (start==false)
			{
				format=rule.arr[start_offset+(num(elem.values[rule.match_enum_elem])*2)+1];
			}
			else
			{
				format=rule.arr[start_offset+num(elem.values[rule.match_enum_elem])*2];
			}
		}
		else if (rule.format_switch_cond_value!=undefined)
		{
			if (start==false)
			{
				format=rule.arr[1];
				if (num(elem.values[rule.format_switch_cond_value])>rule.switch_threshold)
				{
					format=rule.arr[3];
					if (rule.second_format_adder!=undefined)
					{
						var nm=num(elem.values[rule.format_switch_cond_value])+rule.second_format_adder;
						elem.values[rule.format_switch_cond_value]=nm.toString();
					}
				}
			}
			else
			{
				format=rule.arr[0];
				if (num(elem.values[rule.format_switch_cond_value])>rule.switch_threshold)
				{
					format=rule.arr[2];
					if (rule.second_format_adder!=undefined)
					{
						var nm=num(elem.values[rule.format_switch_cond_value])+rule.second_format_adder;
						elem.values[rule.format_switch_cond_value]=nm.toString();
					}

				}
			}
		}	
		else
		{
			format=rule.arr[1];
			if (start==1)
			{
				format=rule.arr[0]
			}
		}
		
		
		

		
		if (format.length>0)
		{
			str+=createIndent(indent);
		}
		
		if ((format.length>0)&&(mode>0))
		{
			//if (elem.index!=undefined)
			{
				if (elem.vis_elem_type!=undefined)
				{
					str+="{["+elem.vis_elem_type+","+elem.vis_elem_item+","+JSON.stringify(elem.index)+"]}";
				}
			}
		}
		
		//interpret the rule and create str
		for(i=0;i<format.length;i++)
		{
			if (typeof format[i] === 'string')
			{
				str+=format[i];
			}
			else
			{
				if ((elem.type==block_types.comment)||(elem.type==block_types.ladder_comment)||(elem.type==block_types.comment_var))
				{
					str+=encodeURI(elem.values[format[i]]);
				}
				else
				{
					str+=elem.values[format[i]];
				}
			}
		}
		
		
	}
	return str;
}


function createIndent(indent)
{
	var i;
	var str="\n";
	for(i=0;i<indent;i++)
	{
		str+=" ";
	}
	return str;
}
	

function handleElem(elem,indent,mode)
{
	var str="";
	var i;
	if (elem.commented==1)
	{
		str+="  \r\nCOMMENT_BEGIN\r\n";
	}
	str+=handleElemConv(elem,true,indent,mode);
	if (elem.sub_elems!=undefined)
	{
		for(i=0;i<elem.sub_elems.length;i++)
		{
			str+=handleElem(elem.sub_elems[i],indent+1,mode);
		}
	}
	str+=handleElemConv(elem,false,indent,mode);
	if (elem.commented==1)
	{
		str+="\r\nCOMMENT_END\r\n";
	}

	return str;
}

function preCompile(mode)
{
	return preCompileElem(ARGEE_elem_descr.proj_elems,mode);
}


function preCompileElem(elem,mode)
{
	var new_tree,str;
	try
	{
		new_tree=createPreParseTree(elem,[],elem);
		str=handleElem(new_tree,0,mode);
	}
	catch (e)
	{
		return null;
	}
	if (debug_console==true)
	{
		console.log(str);
	}
	return str;
}

createRuleLookup();

return {
	preCompile:preCompile,
	preCompileElem:preCompileElem,
}
}());
	
var PRECOMP=ARGEE_pre_comp; 
	
 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

