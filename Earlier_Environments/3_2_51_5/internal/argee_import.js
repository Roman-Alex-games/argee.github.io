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
 *  DESCRIPTION: Editor
 *
 *******************************************************************************/

var ARGEE_import=(function()
{ 

var base_types=["INT","REAL","CHAR","BYTE","WORD","TIMER","STATE","RETAIN_INT","RETAIN_REAL"];
var compl_types=[];
var updated_type_enum;
var ELEM=ARGEE_nst_parse.ELEM;
var token_types=ARGEE_nst_parse.token_types;
var global_vars;
var block_types=ARGEE_elem_descr.block_types;

function extractFunctionBlockNames(prj)
{
	var i;
	for(i=0;i<prj.list[1].list.length;i++)
	{
		if ((prj.list[1].list[i].enum_type==ELEM.FUNCT_BLOCK)||(prj.list[1].list[i].enum_type==ELEM.TASK))
		{
			compl_types[compl_types.length]=prj.list[1].list[i].name;
		}
	}
}


function convertType(type)
{
	var elem=base_types.indexOf(type);
	if (elem==-1)
	{
		var elem=updated_type_enum.indexOf(type);
		if (elem!=-1)
		{
			return elem;
		}
	}
	else
	{
		return elem;
	}
	return -1;
}

function preProcessVars(var_segm)
{
	var var_list=[];
	var i;
	for(i=0;i<var_segm.list.length;i++)
	{
		var_list[var_list.length]={};
		var curr=var_list.length-1;
		var_list[curr].name=var_segm.list[i].name;
		if (var_segm.list[i].enum_type==ELEM.COMMENT_VAR)
		{
			var_list[curr].comment=decodeURI(var_segm.list[i].data);
			var_list[curr].comment_type=var_segm.list[i].comment_type;
			continue;
		}
		if (var_segm.list[i].enum_type==ELEM.VAR_REG)	
		{
			var_list[curr].num_elems=0;
		}
		else
		{
			var_list[curr].num_elems=var_segm.list[i].type.range_end-var_segm.list[i].type.range_start+1;
		}
		var_list[curr].type_ind=convertType(var_segm.list[i].type.data);
		var_list[curr].var_type=0;
		if (var_segm.list[i].segm_type==token_types.VAR_INPUT)
		{
			var_list[curr].var_type=1; // argument
		}
		
		if (var_segm.list[i].segm_type==token_types.VAR_INOUT)
		{
			var_list[curr].var_type=1; // pointer - still considered argument
		}
		if (var_segm.list[i].type.mapped_elem!=undefined)
		{
			// this is a PLC variable
			var_list[curr].alias=ARGEE_nst_parse.getStringFromAST(var_segm.list[i].type.mapped_elem)
		}
		if (var_segm.list[i].type.initialize_data!=undefined)
		{
			var_list[curr].init_data=[];
			for(j=0;j<var_segm.list[i].type.initialize_data.length;j++)
			{
				var val_str=ARGEE_nst_parse.getStringFromAST(var_segm.list[i].type.initialize_data[j].list[1]);
				if (var_segm.list[i].type.initialize_data[j].list[1].enum_type==ELEM.CONST_STR)
				{
					val_str="\""+val_str+"\"";
				}
				var_list[curr].init_data[j]=[ARGEE_nst_parse.getStringFromAST(var_segm.list[i].type.initialize_data[j].list[0]),val_str];
			}
		}
	}
	return var_list;
}


function createCodeSegment(argee_seg,ast,parent_ast,index_ast)
{
	var i;
	var complex_mode=false;
	
	if (ast.enum_type==ELEM.IF)
	{
		if (function_block_task==true) {complex_mode=true;}
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.if_then));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
		createCodeSegment(argee_seg.sub_elems[argee_seg.sub_elems.length-1],ast.list[1],ast,0);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
			  (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
			   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
			  );

		for(i=2;i<ast.list.length;i+=2)
		{
			if (ast.list[i].enum_type==ELEM.CONST)
			{
				argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.else_done));
				argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);

				createCodeSegment(argee_seg.sub_elems[argee_seg.sub_elems.length-1],ast.list[i+1],ast,i);
				argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
				              (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
							   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
							  );
			}
			else
			{
				argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.else_if));
				argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);
				argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i]);
				createCodeSegment(argee_seg.sub_elems[argee_seg.sub_elems.length-1],ast.list[i+1],ast,i);
				argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
					  (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
					   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
					  );
						
			}
		}
	}
	else if (ast.enum_type==ELEM.COMMENT_BLOCK)
	{
		createCodeSegment(argee_seg,ast.list[0],ast,0);
		DESCR.setCommentedState(argee_seg.sub_elems[argee_seg.sub_elems.length-1],1);
		var jk=1;
	}
	else if (ast.enum_type==ELEM.WHILE)
	{
		if (function_block_task==true) {complex_mode=true;}
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.do_while));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
		createCodeSegment(argee_seg.sub_elems[argee_seg.sub_elems.length-1],ast.list[1]);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
			  (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
			   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
			  );
	}
	else if (ast.enum_type==ELEM.FOR_LOOP)
	{
		if (function_block_task==true) {complex_mode=true;}
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.for_loop));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[1]);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[2]=ARGEE_nst_parse.getStringFromAST(ast.list[2]);
		createCodeSegment(argee_seg.sub_elems[argee_seg.sub_elems.length-1],ast.list[3]);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
			  (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
			   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
			  );
	}
	
	else if ((ast.enum_type==ELEM.ASSIGN)||(ast.enum_type==ELEM.FUNC_BLOCK_VAR_ASSIGN))
	{
		if (function_block_task==true) {complex_mode=true;}
		if (parent_ast.enum_type==ELEM.FUNC_BLOCK_ARG_LIST)
		{
			argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.func_block_assign));
		}
		else
		{
			argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.assign));
		}
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[1]);
	}
	else if (ast.enum_type==ELEM.COMMENT)
	{
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=decodeURI(ast.data);
	}
	else if (ast.enum_type==ELEM.TRACE)
	{
		if (function_block_task==true) {complex_mode=true;}
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.trace));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ast.data;
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
	}
	
	else if ((ast.enum_type==ELEM.FUNC)||(ast.enum_type==ELEM.FUNC_NO_RETURN))
	{
		if (function_block_task==true) {complex_mode=true;}
		var str=ARGEE_nst_parse.getStringFromAST(ast);
		ast.enum_type=ELEM.FUNC_BLOCK_CALL;
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.func_block_call));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=str;
	}
	else if (ast.enum_type==ELEM.WAIT_UNTIL)
	{
		if (function_block_task==true) {complex_mode=true;}
		DESCR.setBasicMode(false);
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.wait_until));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
	}
	/*else if (ast.enum_type==ELEM.FUNC_BLOCK_CALL)
	{
		argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.func_block_call));
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[0]);
		createCodeSegment(argee_seg.sub_elems[argee_seg.sub_elems.length-1],ast.list[1],ast,0);
		argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
			  (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
			   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
			  );

	}*/
	else
	{
		if (ast.list!=undefined)
		{
			for(i=0;i<ast.list.length;i++)
			{
				if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_CONDITION"))
				{
					argee_seg.sub_elems[argee_seg.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_condition));
					argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice(0,1);
					if (ast.list[i].list[0]!=undefined)
					{
						argee_seg.sub_elems[argee_seg.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
					}
					i++;
					var curr_elem=argee_seg.sub_elems[argee_seg.sub_elems.length-1];
					for(;i<ast.list.length;i++)
					{
						
						var prev_ast;
						var commented=false;
						// comment block -> meta handling
						prev_ast=ast.list[i];
						if (ast.list[i].enum_type==ELEM.COMMENT_BLOCK)
						{
							ast.list[i]=prev_ast.list[0].list[0];
							commented=true;
						}
						
						if (ast.list[i].enum_type==ELEM.LADDER_COMMENT)
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_comment));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=decodeURI(ast.list[i].data);
						}
						else if (ast.list[i].enum_type==ELEM.LADDER_FUNC_BLOCK_CALL)
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_func_block_call));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0].list[1].list[1].list[0]);
						}
						else if (ast.list[i].enum_type==ELEM.LADDER_TRACE)
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_trace));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ast.list[i].data;
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_ASSIGN"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_assign));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[1]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_TIMER_ON"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_timer_on));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[1]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_TIMER_OFF"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_timer_off));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[1]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_COUNT_UP"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_count_up));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[1]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_COUNT_DOWN"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_count_down));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[1]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_COUNT_RESET"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_reset_counter));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_TIMER_START"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_timer_start));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[1]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[1]);
						}
						else if ((ast.list[i].enum_type==ELEM.FUNC_NO_RETURN)&&(ast.list[i].data.toUpperCase()=="LADDER_COIL"))
						{
							curr_elem.sub_elems[curr_elem.sub_elems.length]=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.ladder_coil));
							curr_elem.sub_elems[curr_elem.sub_elems.length-1].values[0]=ARGEE_nst_parse.getStringFromAST(ast.list[i].list[0]);
						}
						else
						{
							ast.list[i]=prev_ast;
							break;
						}
						if (commented==true)
						{
							ast.list[i]=prev_ast;
							DESCR.setCommentedState(curr_elem.sub_elems[curr_elem.sub_elems.length-1],1);
						}
		
					}
					if (i<ast.list.length)
					{
						i--;
					}
					argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.splice
						  (argee_seg.sub_elems[argee_seg.sub_elems.length-1].sub_elems.length,0,
						   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
						  );
					
				}
				else
				{
					createCodeSegment(argee_seg,ast.list[i],ast,i);	
				}
			}
		}
	}
	if (complex_mode==true)
	{
		DESCR.setBasicMode(false);
	}
}

var hmi_elem_map=
[
	["hmi_disp_num",block_types.hmi_disp_num],
	["hmi_disp_range",block_types.hmi_disp_range],
	["hmi_enter_num",block_types.hmi_enter_num],
	["hmi_button",block_types.hmi_button],
	["hmi_disp_hex",block_types.hmi_disp_hex],
	["hmi_enter_state",block_types.hmi_enter_state],
	["hmi_screen_color",block_types.hmi_screen_color],
	["hmi_screen_list",block_types.hmi_screen_list],
	["hmi_grid_elem_enter",block_types.hmi_grid_elem_enter,true],
	["hmi_grid_elem_show",block_types.hmi_grid_elem_show,true],
];

function findHMIKeyword(str)
{
	var i;
	for(i=0;i<hmi_elem_map.length;i++)
	{
		if (hmi_elem_map[i][0].toUpperCase()==str.toUpperCase())	
		{
			return hmi_elem_map[i][1];
		}
	}
	return -1;
}

/*
function pre_createObjTree(

var conv_rules=
[
	{
	*/
	
function reorderFunctBlockVars(ast)
{
	var i,j;
	var new_list_reg=[];
	var new_list_args=[];
	var last_reg_var;
	for(i=0;i<ast.list[0].list.length;i++)
	{
		if ((ast.list[0].list[i].segm_type==token_types.VAR_INPUT)||(ast.list[0].list[i].segm_type==token_types.VAR_INOUT))
		{
			new_list_args[new_list_args.length]=ast.list[0].list[i];
		}
		else
		{
			new_list_reg[new_list_reg.length]=ast.list[0].list[i];
		}
	}
	var perfect_match=true;
	for(i=0;i<new_list_args.length;i++)
	{
		if (ast.arg_list.list[i].toUpperCase()!=new_list_args[i].name.toUpperCase())
		{
			perfect_match=false;
			break;
		}
	}
	if (perfect_match==true)
	{
		// new approach with comments
		ast.list[0].list=[];
		for(i=0;i<new_list_args.length;i++)
		{
			ast.list[0].list[ast.list[0].list.length]=new_list_args[i];
		}
		

		
		for(i=0;i<new_list_reg.length;i++)
		{
			ast.list[0].list[ast.list[0].list.length]=new_list_reg[i];
		}
		
	}
	else
	{
		// check the list or arguments vs list specified
		for(i=0;i<ast.arg_list.list.length;i++)
		{
			for(j=0;j<ast.list[0].list.length;j++)
			{
				if (ast.arg_list.list[i].toUpperCase()==ast.list[0].list[j].name.toUpperCase())
				{
					// swap
					var tmp=ast.list[0].list[i];
					ast.list[0].list[i]=ast.list[0].list[j];
					ast.list[0].list[j]=tmp;
				}
			}
		}
	}
}	

/*function splitFunctionsAndFunctionBlockCalls(ast,prev_block,glob)
{
	var i;
	var curr_FuncBlock=prev_block;
	if ((ast.enum_type==ELEM.FUNCT_BLOCK)||(ast.enum_type==ELEM.TASK))
	{
		curr_FuncBlock=ast;
	}
	if (ast.enum_type==ELEM.FUNC_NO_RETURN)
	{
		ARGEE_nst_process.separateFunctionsAndFunctionBlocks(ast,curr_FuncBlock,glob);		
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			splitFunctionsAndFunctionBlockCalls(ast.list[i],curr_FuncBlock,glob);
		}
	}
}*/

function findSameElement(name,dbs)
{
	var i,j;
	for(i=0;i<dbs.glob.sub_elems.length;i++)
	{
		if (dbs.glob.sub_elems[i].values[0]==name)
		{
			return dbs.glob.sub_elems[i];
		}
	}
	for(i=0;i<dbs.enums.sub_elems.length;i++)
	{
		if (dbs.enums.sub_elems[i].values[0]==name)
		{
			return dbs.enums.sub_elems[i];
		}
	}
	return null;
}

var function_block_task;	

function import_proj(text,storeLocally,module,preview_mode)
{
	var i,ii,iii,iiii,iiiii,iiiiii;
	var prj=ARGEE_nst_parse.parse(text,false);
	if (prj==null)
	{
		return null;
	}
	//splitFunctionsAndFunctionBlockCalls(prj,null,prj);

	DESCR.setBasicMode(true);
	ARGEE_nst_process.collapseVarSegmLists(prj);
	for(i=0;i<prj.list[1].list.length;i++)
	{
		if (prj.list[1].list[i].enum_type==ELEM.FUNCT_BLOCK)
		{
			reorderFunctBlockVars(prj.list[1].list[i]);
		}
	}
	
	compl_types=[];
	extractFunctionBlockNames(prj);
	
	var prj_elems=ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.root))
	prj_elems.sub_elems[0].sub_elems[1].sub_elems.splice(0,1); // delete first alias var
	prj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(0,1);
	// handle Global/Alias vars
	
	if (module==true)
	{
		jk=1;
		DESCR.createGlobAndEnumLists();
		var cust_dbs=DESCR.getCustElemDatabases(false);
		// first function block is skipped because it is always the MainTask
		compl_types.splice(0,1);
		for(i=0;i<compl_types.length;i++)
		{
			if (DESCR.findFunctBlock(compl_types[i])!=null)
			{
				alert("Can't import library, Function block \""+ compl_types[i]+" \" is already in the project");
				return null;
			}
		}
		// check for any conflicts in enumerations
		for(i=0;i<prj.list[1].list.length;i++)
		{
			if (prj.list[1].list[i].enum_type==ELEM.ENUM_OBJ)
			{
				for(ii=0;ii<prj.list[1].list[i].list.length;ii++)
				{
					var res=findSameElement(prj.list[1].list[i].list[ii].name,cust_dbs);
					if (res!=null)
					{
						alert("Can't import library, conflict with enumerated element \""+prj.list[1].list[i].list[ii].name+"\"");
						return null;
					}
				}
			}
		}
		for(i=0;i<prj.list[0].list.length;i++)
		{
			if (prj.list[0].list[i].name.toUpperCase()=="DEFAULT__TASK__1")
			{
				continue;
			}
			var res=findSameElement(prj.list[0].list[i].name,cust_dbs);
			if (res!=null)
			{
				//if (res.values[1].toUpperCase!=prj.list[0].list[i].type.data.toUpperCase())
				{
					alert("Can't import library, conflict with global variable element \""+prj.list[0].list[i].name+"\"");
					return null;
				}
			}
		}
		
	}

	
	if (module==false)
	{
		updated_type_enum=ARGEE_elem_descr.prog_var_types_enum.slice(0);
		updated_type_enum.splice(base_types.length,updated_type_enum.length-base_types.length);
		for(i=0;i<base_types.length;i++)
		{
			updated_type_enum[i]=DESCR.prog_var_types_enum[i];
		}
	}
	else
	{
		updated_type_enum=fastClone(DESCR.getTypeEnum());
	}

	for(i=0;i<compl_types.length;i++)
	{
		updated_type_enum.splice(updated_type_enum.length,0,compl_types[i]);
	}
	

	var lst=preProcessVars(prj.list[0]);

	
	for(i=0;i<lst.length;i++)
	{
		if (lst[i].alias!=undefined)
		{
			if (module==false)
			{
				// Alias var
				prj_elems.sub_elems[0].sub_elems[1].sub_elems.splice(prj_elems.sub_elems[0].sub_elems[1].sub_elems.length-1,
																	 0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.alias_var)));
				prj_elems.sub_elems[0].sub_elems[1].sub_elems[prj_elems.sub_elems[0].sub_elems[1].sub_elems.length-2].values[0]=lst[i].name;													 
				prj_elems.sub_elems[0].sub_elems[1].sub_elems[prj_elems.sub_elems[0].sub_elems[1].sub_elems.length-2].values[1]=lst[i].alias;			
			}
		}
		else if (lst[i].comment!=undefined)
		{
			if (lst[i].comment_type==1)
			{
				// alias var
				prj_elems.sub_elems[0].sub_elems[1].sub_elems.splice(prj_elems.sub_elems[0].sub_elems[1].sub_elems.length-1,
																	 0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment_var)));
				prj_elems.sub_elems[0].sub_elems[1].sub_elems[prj_elems.sub_elems[0].sub_elems[1].sub_elems.length-2].values[0]=lst[i].comment;
			}
			else
			{
				// prog_var
				prj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-1,
																	 0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment_var)));
				prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].values[0]=lst[i].comment;
			}
		}
		else
		{
			// regular var
			prj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-1,
			                                                     0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.reg_var)));
			prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].values[0]=lst[i].name;													 
			prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].values[1]=updated_type_enum[lst[i].type_ind];			
			prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].values[2]=lst[i].num_elems;
			if (lst[i].init_data!=undefined)
			{
				prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].sub_elems=[];
				for(ii=0;ii<lst[i].init_data.length;ii++)
				{
					prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].sub_elems[ii]=
					                                                ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.init_elem_var));
					prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].sub_elems[ii].values[0]=lst[i].init_data[ii][0];
					prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].sub_elems[ii].values[1]=lst[i].init_data[ii][1];					
					prj_elems.sub_elems[0].sub_elems[0].sub_elems[prj_elems.sub_elems[0].sub_elems[0].sub_elems.length-2].sub_elems[ii].editable=false;
				}
			}
		}
	}
	
	// if alias_var length==1 -> collapse
	if (prj_elems.sub_elems[0].sub_elems[1].sub_elems.length==1)
	{
		prj_elems.sub_elems[0].sub_elems[1].hidden_sub=false;
	}
	
	// handle function blocks
	for(i=0;i<prj.list[1].list.length;i++)
	{
		if (prj.list[1].list[i].enum_type==ELEM.ENUM_OBJ)
		{
			prj_elems.sub_elems[1].sub_elems.splice(prj_elems.sub_elems[1].sub_elems.length-1,0,
			                                           ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.enum_var)));
			var curr=prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2];
			curr.sub_elems.splice(0,1);
			for(ii=0;ii<prj.list[1].list[i].list.length;ii++)
			{
				if (prj.list[1].list[i].list[ii].enum_type==ELEM.COMMENT_VAR)
				{
					curr.sub_elems.splice(ii,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment_var)));
					curr.sub_elems[ii].values[0]=decodeURI(prj.list[1].list[i].list[ii].data);
				}
				else
				{
					curr.sub_elems.splice(ii,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.enum_var_elem)));
					curr.sub_elems[ii].values[0]=prj.list[1].list[i].list[ii].name;
					if (prj.list[1].list[i].list[ii].const_val!=undefined)
					{
						if (prj.list[1].list[i].list[ii].hex!=undefined)
						{
							curr.sub_elems[ii].values[1]="0x"+num(prj.list[1].list[i].list[ii].const_val).toString(16);
						}
						else
						{
							curr.sub_elems[ii].values[1]=prj.list[1].list[i].list[ii].const_val;
						}
					}
					else
					{
						curr.sub_elems[ii].values[1]="";
					}
				}
			}		
		}
		
		else if ((prj.list[1].list[i].enum_type==ELEM.FUNCT_BLOCK)||
		         (prj.list[1].list[i].enum_type==ELEM.TASK)||
				 (prj.list[1].list[i].enum_type==ELEM.FUNCTION_BLOCK_GROUP)
				 )
		{
			if (prj.list[1].list[i].enum_type==ELEM.FUNCTION_BLOCK_GROUP)
			{
				prj_elems.sub_elems[1].sub_elems.splice(prj_elems.sub_elems[1].sub_elems.length-1,0,
			                                           ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.function_block_group)));
				
			}
			else
			{
				prj_elems.sub_elems[1].sub_elems.splice(prj_elems.sub_elems[1].sub_elems.length-1,0,
			                                           ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.funct_block_var)));
			}
			
													   
			prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].values[0]=prj.list[1].list[i].name;
			if (prj.list[1].list[i].enum_type==ELEM.TASK)
			{
				if (prj.list[1].list[i].name.toUpperCase()!="DEFAULT_TASK_1")
				{
					DESCR.setBasicMode(false);
				}
				prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].values[1]=1;	
			}
			else if (prj.list[1].list[i].enum_type==ELEM.FUNCT_BLOCK)
			{
				prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].values[1]=0;	
			}
			if (prj.list[1].list[i].list[1]!=undefined)
			{
				prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].sub_elems[0].sub_elems.splice(0,1);
				if (prj.list[1].list[i].task_function_block==true)
				{
					function_block_task=true;
				}
				else
				{
					function_block_task=false;
				}
				createCodeSegment(prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].sub_elems[0],prj.list[1].list[i].list[1]);
				prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].sub_elems[0].sub_elems.splice
				              (prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].sub_elems[0].sub_elems.length,0,
							   ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.add_block))
							  );
			}
			if (prj.list[1].list[i].enum_type!=ELEM.FUNCTION_BLOCK_GROUP)
			{
				var lst=preProcessVars(prj.list[1].list[i].list[0]);
				prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].
										   sub_elems.splice(1,1);
				var curr_var_list=prj_elems.sub_elems[1].sub_elems[prj_elems.sub_elems[1].sub_elems.length-2].sub_elems;						   
				for(ii=0;ii<prj.list[1].list[i].list[0].list.length;ii++)
				{
					if (lst[ii].comment!=undefined)
					{
						// function block comments
						curr_var_list.splice(curr_var_list.length-1,
																			 0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment_var)));
						curr_var_list[curr_var_list.length-2].values[0]=lst[ii].comment;
					}
					else
					{
						curr_var_list.splice(curr_var_list.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.funct_block_elem_var)));
						curr_var_list[curr_var_list.length-2].values[0]=lst[ii].name;
						curr_var_list[curr_var_list.length-2].values[1]=updated_type_enum[lst[ii].type_ind];
						curr_var_list[curr_var_list.length-2].values[2]=lst[ii].var_type;
						curr_var_list[curr_var_list.length-2].values[3]=lst[ii].num_elems;
					}
				}
			}
			
		}
	}
	
	if (module==false)
	{
		if (prj.hmi!=undefined)
		{
			
			// first create the images group
			
			var curr_screen_list=prj_elems.sub_elems[2].sub_elems[0].sub_elems[0].sub_elems;

			if (prj.hmi.images!=undefined)
			{
				curr_screen_list.splice(curr_screen_list.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_image_group)));
				var curr_image_group=curr_screen_list[curr_screen_list.length-2];
				for(i=0;i<prj.hmi.images.length;i++)
				{
					if (prj.hmi.images[i].data=="COMMENT")
					{
						curr_image_group.sub_elems.splice(curr_image_group.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));	
					}
					else
					{
						curr_image_group.sub_elems.splice(curr_image_group.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_image)));
					}
					var act_img=curr_image_group.sub_elems[curr_image_group.sub_elems.length-2];
					if (prj.hmi.images[i].data=="COMMENT")
					{
						act_img.values[0]=decodeURI(prj.hmi.images[i].list[0].data);
					}
					else
					{
						act_img.values[0]=prj.hmi.images[i].list[0].data;
						act_img.values[1]=prj.hmi.images[i].list[1].data;
					}
				}
			}

			for(i=0;i<prj.hmi.list.length;i++)
			{
				
				if (prj.hmi.list[i].enum_type==ELEM.HMI_SCREEN)
				{
					curr_screen_list.splice(curr_screen_list.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_screen)));
					var act_screen=curr_screen_list[curr_screen_list.length-2];
					act_screen.values[0]=prj.hmi.list[i].name;
					var sect_list=prj.hmi.list[i].list
					for(ii=0;ii<sect_list.length;ii++)
					{
						
						if (sect_list[ii].data=="COMMENT")
						{
							act_screen.sub_elems.splice(act_screen.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));
							var act_sect=act_screen.sub_elems[act_screen.sub_elems.length-2]
							act_sect.values[0]=decodeURI(sect_list[ii].list[0].data);
							continue;
						}
						
						
						act_screen.sub_elems.splice(act_screen.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_section)));
						var act_sect=act_screen.sub_elems[act_screen.sub_elems.length-2]
						act_sect.values[0]=sect_list[ii].name;
						var act_elem_list=sect_list[ii].list;
						for(iii=0;iii<act_elem_list.length;iii++)
						{
							
							if (act_elem_list[iii].data=="COMMENT")
							{
								act_sect.sub_elems.splice(act_sect.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));
								var act_block=act_sect.sub_elems[act_sect.sub_elems.length-2];
								act_block.values[0]=decodeURI(act_elem_list[iii].list[0].data);
								continue;
							}
							
							
							var block=findHMIKeyword(act_elem_list[iii].data);
							act_sect.sub_elems.splice(act_sect.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block)));
							var act_block=act_sect.sub_elems[act_sect.sub_elems.length-2];
							var act_func=act_elem_list[iii].list;
							for(iiii=0;iiii<act_func.length;iiii++)
							{
								if ((act_func[iiii].data!=undefined)&&(act_func[iiii].enum_type!=ELEM.FUNC)&&(act_func[iiii].enum_type!=ELEM.CONST_STR))
								{
									act_block.values[iiii]=act_func[iiii].data;
								}
								else
								{
									act_block.values[iiii]=ARGEE_nst_parse.getStringFromAST(act_func[iiii]);
								}
							}
						}
					}
				}
				
				else if (prj.hmi.list[i].enum_type==ELEM.HMI_GRID_SCREEN)
				{
					curr_screen_list.splice(curr_screen_list.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_grid_screen)));
					var act_screen=curr_screen_list[curr_screen_list.length-2];
					
					act_screen.values[0]=prj.hmi.list[i].expr.elem_string;
					var row_list=prj.hmi.list[i].list
					for(ii=0;ii<row_list.length;ii++)
					{
						if (row_list[ii].data=="COMMENT")
						{
							act_screen.sub_elems.splice(act_screen.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));
							var act_sect=act_screen.sub_elems[act_screen.sub_elems.length-2]
							act_sect.values[0]=decodeURI(row_list[ii].list[0].data);
							continue;
						}
						
						act_screen.sub_elems.splice(act_screen.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_grid_row)));
						var act_row=act_screen.sub_elems[act_screen.sub_elems.length-2]
						if (row_list[ii].expr!=undefined)
						{
							act_row.values[0]=row_list[ii].expr.elem_string;
						}
						
						var act_sect_list=row_list[ii].list;
						for(iii=0;iii<act_sect_list.length;iii++)
						{
							
							if (act_sect_list[iii].data=="COMMENT")
							{
								act_row.sub_elems.splice(act_row.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));
								var act_sect=act_row.sub_elems[act_row.sub_elems.length-2];
								act_sect.values[0]=decodeURI(act_sect_list[iii].list[0].data);
								continue;
							}
							
							
							act_row.sub_elems.splice(act_row.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_grid_section)));
							var act_sect=act_row.sub_elems[act_row.sub_elems.length-2];
							var act_elem_list=act_sect_list[iii].list;
							act_sect.values[0]=act_sect_list[iii].expr.elem_string;
							for(iiii=0;iiii<act_elem_list.length;iiii++)
							{
								if (act_elem_list[iiii].data=="COMMENT")
								{
									act_sect.sub_elems.splice(act_sect.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));
								}
								else
								{
									act_sect.sub_elems.splice(act_sect.sub_elems.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.hmi_grid_elem)));
								}
								var act_block=act_sect.sub_elems[act_sect.sub_elems.length-2];
								if (act_elem_list[iiii].data=="COMMENT")
								{
									act_block.values[0]=decodeURI(act_elem_list[iiii].list[0].data);
								}
								else
								{
									act_block.values[0]=act_elem_list[iiii].elem_string;
								}
							}
						}
					}
				}
				else if (prj.hmi.list[i].data=="COMMENT")
				{
					curr_screen_list.splice(curr_screen_list.length-1,0,ARGEE_elem_descr.createNewElem(ARGEE_elem_descr.findBlockDescr(block_types.comment)));
					var act_screen=curr_screen_list[curr_screen_list.length-2];
					act_screen.values[0]=decodeURI(prj.hmi.list[i].list[0].data);
				}
			}
		}
	}
	
	if (prj_elems.sub_elems[2].sub_elems[0].sub_elems[0].sub_elems.length==1)
	{
		prj_elems.sub_elems[2].sub_elems[0].sub_elems[0].expanded=false;
	}
	
	
	DESCR.setNewTypeEnum(updated_type_enum);

	
	
	/*ARGEE_elem_descr.prog_var_types_enum.splice(base_types.length,ARGEE_elem_descr.prog_var_types_enum.length-base_types.length);
	for(i=0;i<compl_types.length;i++)
	{
		ARGEE_elem_descr.prog_var_types_enum.splice(ARGEE_elem_descr.prog_var_types_enum.length,0,compl_types[i]);
	}
	ARGEE_elem_descr.proj_elems.prog_var_types_enum=ARGEE_elem_descr.prog_var_types_enum;
	
	*/
	
	if (module==false)
	{
		ARGEE_elem_descr.proj_elems.sub_elems=prj_elems.sub_elems;
	}
	else
	{
		// append global variables
		for(i=0;i<prj_elems.sub_elems[0].sub_elems[0].sub_elems.length;i++)
		{
			var elm=prj_elems.sub_elems[0].sub_elems[0].sub_elems[i];
			if (elm.type!=block_types.reg_var)
			{
				continue;
			}
			if (elm.values[0].toUpperCase()=="DEFAULT__TASK__1")
			{
				continue;
			}
			else
			{
				ARGEE_elem_descr.proj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(ARGEE_elem_descr.proj_elems.sub_elems[0].sub_elems[0].sub_elems.length-1,0,elm);
			}
		}
		// append function_block definitions
		for(i=0;i<prj_elems.sub_elems[1].sub_elems.length;i++)
		{
			var elm=prj_elems.sub_elems[1].sub_elems[i];
			if ((elm.type==block_types.funct_block_var)&&(elm.values[0].toUpperCase()=="DEFAULT_TASK_1"))
			{
				continue;
			}
			if ((elm.type!=block_types.funct_block_var)&&(elm.type!=block_types.enum_var)&&
			    (elm.type!=block_types.function_block_group))
			{
				continue;
			}

			ARGEE_elem_descr.proj_elems.sub_elems[1].sub_elems.splice(ARGEE_elem_descr.proj_elems.sub_elems[1].sub_elems.length-1,0,elm);
		}
	}

	if (preview_mode==false)
	{
		GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
		ARGEE_elem_descr.proj_elems.editor=ENV.ARGEE;
	}
	
	if (storeLocally==true)
	{
		setLocalStorage("prog_code",JSON.stringify(ARGEE_elem_descr.proj_elems));
	}
	//ARGEE_elem_descr.proj_elems.splice(0,ARGEE_elem_descr.proj_elems.length-1);
	//ARGEE_elem_descr.proj_elems.splice(0,0,prj_elems);
	return prj_elems;
}


//======================================================================================================================
// ARGEE 2 import code
//======================================================================================================================


function convertExprToARGEE3(parsed_expr)
{
	var i;
	switch(parsed_expr.enum_type)
	{
		case ELEM.EXPR:
			var str="";
			str+="(";
			for(i=0;i<parsed_expr.list.length;i++)
			{
				str+=convertExprToARGEE3(parsed_expr.list[i]);
			}
			str+=")";
			return str;
		case ELEM.EXPR_VAR:
			if (parsed_expr.list!=undefined)
			{
				var str="";
				// IO datapoint
				for(i=0;i<parsed_expr.list.length;i++)
				{
					if (parsed_expr.list[i].enum_type==ELEM.EXPR_VAR)
					{
						if (parsed_expr.list[i].data.toUpperCase()=="S")
						{
							str="sign_extend_16("+str+")";
						}
						else
						{
							if (i!=0)
							{
								str+="_";
							}
							str+=parsed_expr.list[i].data;
						}
					}
					else if (parsed_expr.list[i].enum_type==ELEM.EXPR_VAR_OFFSET)
					{
						str+="."+parsed_expr.list[i].offset+"."+parsed_expr.list[i].len;						
					}
				}
				return str;
			}
			else
			{
				return parsed_expr.data;
			}
		case ELEM.CONST:
			var nm=num(parsed_expr.data);
			if (parsed_expr.hex!=undefined)
			{
				return "0x"+nm.toString(16);	
			}
			else
			{
				return parsed_expr.data;
			}
		case ELEM.OP:
			return parsed_expr.str_type;
		case ELEM.FUNC:
			var str="";
			str=parsed_expr.data+"(";
			for(i=0;i<parsed_expr.list.length;i++)
			{
				if (i!=0)
				{
					str+=",";
				}
				str+=convertExprToARGEE3(parsed_expr.list[i]);
			}
			str+=")";
			return str;
	}
}


var act_conv_table=
[
	{name:"Assignment",string_fields:[],output:["ladder_assign(",{field:"dst"},",",{field:"src"},");"]},
	{name:"Start Timer",string_fields:[],output:["ladder_timer_start(",{field:"timer"},",",{field:"timer_expiration_time"},");"]},
	{name:"Coil",string_fields:[],output:["ladder_coil(",{field:"coil"},");"]},
	{name:"Timer On",string_fields:[],output:["ladder_timer_on(",{field:"timer"},",",{field:"timer_expiration_time"},");"]},
	{name:"Timer Off",string_fields:[],output:["ladder_timer_off(",{field:"timer"},",",{field:"timer_expiration_time"},");"]},
	
	{name:"Trace",string_fields:["string"],output:["ladder_trace(\"",{field:"string"},"\",",{field:"exp"},");"]},
	{},
	{name:"Comment",string_fields:["Comment"],output:["LADDER_COMMENT(\"",{field:"Comment"},"\");"]},
	{name:"Count Up",string_fields:[],output:["ladder_count_up(",{field:"counter"},",",{field:"preset"},");"]},
	{name:"Count Down",string_fields:[],output:["ladder_count_down(",{field:"counter"},",",{field:"preset"},");"]},
	{name:"Reset Counter",string_fields:[],output:["LADDER_COUNT_RESET(",{field:"counter"},");"]},
];

var sect_elem_type=
{
	button:0,
	status:1,
	status_ruler:2,
	variable:3,
	enumeration:4,	
    disp_string:5,
    edit_string:6,
	hex_num:7,
	edit_hex_num:8,
};

var hmi_conv_table=
[
	{name:"Button",string_fields:["Name"],output:["hmi_button(\"",{field:"Name"},"\",",{field:"Destination"},");"]},
	{name:"Display Number",string_fields:["Name","Units"],output:["hmi_disp_num(\"",{field:"Name"},"\",",{field:"Expression"},",\"",{field:"Units"},"\");"]},
	{name:"Display Range",string_fields:["Name","Units"],output:["hmi_disp_range(\"",{field:"Name"},"\",valid_range(",{field:"Expression"},"),\"",{field:"Units"},"\",0,0,",{field:"NormalRangleMin"},",",{field:"NormalRangleMax"},",0,0,0,0);"]},
	{name:"Enter Number",string_fields:["Name","Units"],output:["hmi_enter_num(\"",{field:"Name"},"\",",{field:"Destination"},",\"",{field:"Units"},"\");"]},
	{name:"Enter State",string_fields:["Name"],output:["hmi_enter_state(\"",{field:"Name"},"\",",{field:"Destination"},",",{field:"StartValue"},",",{field:"EndValue"},");"]},
	{name:"Display Hex",string_fields:["Name"],output:["hmi_disp_num(\"",{field:"Name"},"\"hex(,",{field:"Expression"},"));"]},
	{name:"Enter Hex",string_fields:["Name"],output:["hmi_enter_num(\"",{field:"Name"},"\",hex(",{field:"Destination"},"));"]},
];
	
function convertElem(elem,conv_table)
{
	var type=elem.act_type;
	var i;
	var act_descr=conv_table[type];
	for(i=0;i<act_descr.string_fields.length;i++)
	{
		elem[act_descr.string_fields[i]]=encodeURI(elem[act_descr.string_fields[i]]);
	}
	var out="";
	for(i=0;i<act_descr.output.length;i++)
	{
		if (typeof act_descr.output[i] == "string")
		{
			out+=act_descr.output[i];
		}
		else
		{
			if (act_descr.string_fields.indexOf(act_descr.output[i].field)!=-1)
			{
				out+=elem[act_descr.output[i].field];
			}
			else
			{
				if (typeof elem[act_descr.output[i].field] === 'string')
				{
					var res=PARSE.parseIndivExpression(elem[act_descr.output[i].field],false);
					var str=convertExprToARGEE3(res);
					out+=str;
				}
				else
				{
					out+=elem[act_descr.output[i].field];
				}
			}
		}
	}
	return out;
}



function convertARGEE2_Proj(text)
{
	var proj_db=JSON.parse(text);
	var output_text="VAR";
	var i,j,k;
	var var_db=proj_db.var_db;
	var repl_vars=[];

	DESCR.setBasicMode(true);	
	// process Program vars
	var prog_vars=[];
	var var_list=var_db[0].var_list;
	for(i=0;i<var_list.length;i++)
	{
		if (var_list[i].fixed!=undefined)
		{
			continue;
		}
		else
		{
			prog_vars[prog_vars.length]={name:var_list[i].name,type:var_list[i].type};
			if (var_list[i].init_arr!=undefined)
			{
				var val=0;
				var j;
				for(j=3;j>=0;j--)
				{
					val=val<<8;
					val|=var_list[i].init_arr[j];
				}
				prog_vars[prog_vars.length-1].init_val=val;
			}
		}
	}
	// process PLC vars
	var plc_vars=[];
	var var_list=var_db[1].var_list;
	for(i=0;i<var_list.length;i++)
	{
		var size;
		if (var_list[i].size==0)
		{
			size=16;
		}
		else
		{
			size=1;
		}
		plc_vars[plc_vars.length]={name:var_list[i].name,bit_offset:var_list[i].bit_offset,section:var_list[i].section,size:size,word_index:parseInt(var_list[i].word_index)};
	}
	// process enum variables
	var enum_vars=[];
	var var_list=var_db[2].var_list;
	for(i=0;i<var_list.length;i++)
	{
		enum_vars[enum_vars.length]={name:var_list[i].name};
	}
	
	// go through the HMI section and look for expressions instead of variables. These needs to be converted into number variables in the program code. This can be isolated using "Expression" field.
	var hmi=proj_db.scr;
	for(i=0;i<hmi.length;i++)
	{
		var scr=hmi[i];
		for(j=0;j<scr.rows.length;j++)
		{
			var sect_elems=scr.rows[j][0].sect_elems;
			for(k=0;k<sect_elems.length;k++)
			{
				var elm=sect_elems[k];
				if (elm.Expression!=undefined)
				{
					var res=PARSE.parseIndivExpression(elm.Expression,false);
					if (res.enum_type==ELEM.EXPR)
					{
						var curr_repl_var=repl_vars.length;
						var var_name="repl_var__for_HMI___"+curr_repl_var;
						repl_vars[repl_vars.length]={name:var_name,expr:convertExprToARGEE3(res)};
						elm.Expression=var_name;
						prog_vars[prog_vars.length]={name:var_name,type:0};
					}
				}
				elm.act_type=elm.type; // make it similar to actions to use the same conversion function
			}
			//for(k=0;k<sect_list.
	//var hmi=
		}
	}
	var prog_str="";
	prog_str+="VAR\r\n";
	var var_types=["INT","TIMER","STATE","RETAIN_INT"];
	for(i=0;i<prog_vars.length;i++)
	{
		prog_str+=prog_vars[i].name+":"+var_types[prog_vars[i].type];
		if (prog_vars[i].init_val!=undefined)
		{
			prog_str+=":=";
			if (var_types[prog_vars[i].type]=="STATE")
			{
				prog_str+=enum_vars[prog_vars[i].init_val].name;
			}
			else
			{
				prog_str+=prog_vars[i].init_val;
			}
		}
		prog_str+=";\r\n";
	}
	prog_str+="default__task__1:Default_Task_1;\r\n"
	for(i=0;i<plc_vars.length;i++)
	{
		prog_str+=plc_vars[i].name+":ALIAS AT ";
		if (plc_vars[i].section==0)
		{
			prog_str+="IO_ARGEE_TO_PLC_Word";
		}
		else
		{
			prog_str+="IO_PLC_TO_ARGEE_Word";
		}
		prog_str+=plc_vars[i].word_index;
		prog_str+="."+plc_vars[i].bit_offset+"."+plc_vars[i].size;
		prog_str+=";\r\n";
	}
	
	
	prog_str+="END_VAR\r\n";
	
	

	prog_str+="TASK Default_Task_1()\r\nVAR\r\nEND_VAR\r\nVAR_INPUT\r\nEND_VAR\r\n";
	// handle conditions/actions
	for(i=0;i<proj_db.cond_db.length;i++)
	{
		var cond=proj_db.cond_db[i].condition;
		if (i==14)
		{
			var jk=1;
		}
		var res=PARSE.parseIndivExpression(cond,false);
		var str=convertExprToARGEE3(res);
		if (proj_db.cond_db[i].label!=undefined)
		{
			prog_str+="COMMENT(\""+encodeURI(proj_db.cond_db[i].label)+"\");\r\n";
		}
		prog_str+="ladder_condition("+str+");\r\n";
		for(j=0;j<proj_db.cond_db[i].actions.length;j++)
		{
			var act=proj_db.cond_db[i].actions[j];
			str=convertElem(act,act_conv_table);
			prog_str+=str+"\r\n";
		}
	}
	for(i=0;i<repl_vars.length;i++)
	{
		prog_str+=repl_vars[i].name+":="+repl_vars[i].expr+";";
	}
	prog_str+="END_TASK\r\n";
	if (enum_vars.length>0)
	{
		prog_str+="ENUM\r\n";
		for(i=0;i<enum_vars.length;i++)
		{
			if (i!=0)
			{
				prog_str+=",";
			}
			prog_str+=enum_vars[i].name;
			prog_str+="\r\n";
		}
		prog_str+="END_ENUM\r\n";
	}
	prog_str+="HMI_BEGIN\r\n";
	for(i=0;i<hmi.length;i++)
	{
		var scr=hmi[i];
		prog_str+="HMI_SCREEN \""+scr.name+"\"\r\n";
		for(j=0;j<scr.rows.length;j++)
		{
			var sect_elems=scr.rows[j][0].sect_elems;
			prog_str+="HMI_SECTION \""+scr.rows[j][0].name+"\"\r\n";
			for(k=0;k<sect_elems.length;k++)
			{
				var elm=sect_elems[k];
				str=convertElem(elm,hmi_conv_table);
				prog_str+=str+"\r\n";
			}
			prog_str+="END_HMI_SECTION"+"\r\n";
			//for(k=0;k<sect_list.
	//var hmi=
		}
		prog_str+="END_HMI_SCREEN"+"\r\n";
	}
	prog_str+="END_HMI"+"\r\n";
	return {prog_text:prog_str,proj_title:proj_db.misc.projectName};
}

function testConverter()
{
	//convertARGEE2_Proj(example_code1);
}
	


return {
	import_proj:import_proj,
	testConverter:testConverter,
	convertARGEE2_Proj:convertARGEE2_Proj,
}
}());
	
var IMP=ARGEE_import;
 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

