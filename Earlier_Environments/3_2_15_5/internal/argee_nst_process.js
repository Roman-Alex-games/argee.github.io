
var ARGEE_nst_process=(function()
{ 

var ELEM=ARGEE_nst_parse.ELEM;
var token_types=ARGEE_nst_parse.token_types;
var stopCompilation=ARGEE_nst_parse.stopCompilation;
var simpleTypes=["INT","REAL","WORD","BYTE","TIMER","BIT","CHAR","STATE","RETAIN_INT","RETAIN_REAL"];	
var numericTypes=["INT","REAL","WORD","BYTE","STATE","RETAIN_INT","RETAIN_REAL"];
var simpleTypeSizesInBytes=[4,4,2,1,8,4,1,4,4];
var simpleTypeLinks=
[
    {var_size:4,cdt:false,visited:true}, //INT
	{var_size:4,cdt:false,visited:true}, //REAL
	{var_size:2,cdt:false,visited:true}, //WORD
	{var_size:1,cdt:false,visited:true}, //BYTE
	{var_size:8,cdt:true,visited:true},  //TIMER
	{var_size:4,cdt:false,visited:true},  //BIT
	{var_size:1,cdt:false,visited:true},  //CHAR
	{var_size:4,cdt:false,visited:true},  //STATE
	{var_size:4,cdt:false,visited:true,retain:true},  //RETAIN_INT
	{var_size:4,cdt:false,visited:true,retain:true},  //RETAIN_REAL
];

function isSimpleType(name)
{
	var i;
	return simpleTypes.indexOf(name);
/*	for(i=0;i<simpleTypes.length;i++)
	{
		if (simpleTypes[i]==name)
		{
			return i;
		}
	}*/
	return -1;
}

// & -> pointer to a single element
// @ -> pointer to array

var built_in_funcs=
[
	{name:"START_TIMER",arg_types:["TIMER","INT",null,null],func_num:0  ,ret_type:"INT"},
	{name:"COUNT",arg_types:["TIMER",null,null,null],func_num:1     ,ret_type:"INT"},
	{name:"STR_LEN",arg_types:["@CHAR",null,null,null],func_num:2       ,ret_type:"INT"},
	{name:"STR_LEFT",arg_types:["@CHAR","INT","@CHAR",null],func_num:3  ,ret_type:"INT"},
	{name:"STR_RIGHT",arg_types:["@CHAR","INT","@CHAR",null],func_num:4 ,ret_type:"INT"},
	{name:"STR_MID",arg_types:["@CHAR","INT","INT","@CHAR"],func_num:5  ,ret_type:"INT"},
	{name:"STR_COPY",arg_types:["@CHAR","@CHAR",null,null],func_num:6   ,ret_type:"INT"},
	{name:"STR_CAT",arg_types:["@CHAR","@CHAR",null,null],func_num:7    ,ret_type:"INT"},
	{name:"STR_TO_INT",arg_types:["@CHAR","INT",null,null],func_num:8   ,ret_type:"INT"},
	{name:"INT_TO_STR",arg_types:["INT","@CHAR","INT",null],func_num:9  ,ret_type:"INT"},
	
	{name:"LADDER_CONDITION",arg_types:["INT",null,null,null],func_num:10       ,ret_type:"INT"},
	{name:"LADDER_COIL",arg_types:["&INT",null,null,null],func_num:11       ,ret_type:"INT"},
	{name:"LADDER_ASSIGN",arg_types:["&INT","INT","INT",null],func_num:12       ,ret_type:"INT"},
	//{name:"LADDER_ASSIGN",arg_types:["&INT","STATE","INT",null],func_num:12       ,ret_type:"INT"},
	{name:"LADDER_TIMER_ON",arg_types:["TIMER","INT",null,null],func_num:13       ,ret_type:"INT"},
	{name:"LADDER_TIMER_OFF",arg_types:["TIMER","INT",null,null],func_num:14       ,ret_type:"INT"},
	{name:"LADDER_TIMER_START",arg_types:["TIMER","INT",null,null],func_num:15       ,ret_type:"INT"},
	{name:"LADDER_COUNT_RESET",arg_types:["TIMER",null,null,null],func_num:16       ,ret_type:"INT"},
	{name:"EXPIRED",arg_types:["TIMER",null,null,null],func_num:17       ,ret_type:"INT"},
	{name:"LADDER_COUNT_UP",arg_types:["TIMER","INT",null,null],func_num:18       ,ret_type:"INT"},
	{name:"LADDER_COUNT_DOWN",arg_types:["TIMER","INT",null,null],func_num:19       ,ret_type:"INT"},
	
	{name:"F_COS",arg_types:["INT","&INT",null,null],func_num:20       ,ret_type:"INT"},
	{name:"R_TRIG",arg_types:["INT","&INT",null,null],func_num:21       ,ret_type:"INT"},
	{name:"F_TRIG",arg_types:["INT","&INT",null,null],func_num:22       ,ret_type:"INT"},
	
	{name:"GET_BITS",arg_types:["INT","INT","INT",null],func_num:23       ,ret_type:"INT"},
	{name:"SET_BITS",arg_types:["INT","INT","INT","INT"],func_num:24       ,ret_type:"INT"},
	
	{name:"GET_IO_INP_ARR",arg_types:["INT","&BYTE","INT","INT","INT"],func_num:25       ,ret_type:"INT",pack_to:3},
	{name:"SET_IO_OUTP_ARR",arg_types:["INT","&BYTE","INT","INT","INT"],func_num:26       ,ret_type:"INT",pack_to:3},
	{name:"GET_IO_DIAG_ARR",arg_types:["INT","&BYTE","INT","INT","INT"],func_num:27       ,ret_type:"INT",pack_to:3},

	{name:"LE_GET_16BIT",arg_types:["@BYTE","INT",null,null],func_num:28       ,ret_type:"INT"},
	{name:"BE_GET_16BIT",arg_types:["@BYTE","INT",null,null],func_num:29       ,ret_type:"INT"},
	{name:"LE_GET_32BIT",arg_types:["@BYTE","INT",null,null],func_num:30       ,ret_type:"INT"},
	{name:"BE_GET_32BIT",arg_types:["@BYTE","INT",null,null],func_num:31       ,ret_type:"INT"},

	{name:"LE_SET_16BIT",arg_types:["@BYTE","INT","INT",null],func_num:32       ,ret_type:"INT"},
	{name:"BE_SET_16BIT",arg_types:["@BYTE","INT","INT",null],func_num:33       ,ret_type:"INT"},
	{name:"LE_SET_32BIT",arg_types:["@BYTE","INT","INT",null],func_num:34       ,ret_type:"INT"},
	{name:"BE_SET_32BIT",arg_types:["@BYTE","INT","INT",null],func_num:35       ,ret_type:"INT"},

	{name:"GET_PLC_INP_ARR",arg_types: ["@BYTE","INT","INT",null],func_num:36       ,ret_type:"INT"},
	{name:"SET_PLC_OUTP_ARR",arg_types:["@BYTE","INT","INT",null],func_num:37       ,ret_type:"INT"},
	
	{name:"MIN",arg_types:["INT","INT",null,null],func_num:38       ,ret_type:"INT"},
	{name:"MAX",arg_types:["INT","INT",null,null],func_num:39       ,ret_type:"INT"},
	{name:"ABS",arg_types:["INT",null,null,null],func_num:40       ,ret_type:"INT"},

	{name:"STR_COMPARE",arg_types:["@CHAR","@CHAR",null,null],func_num:42   ,ret_type:"INT"},

	{name:"GET_IO_DIAG_INT",arg_types:["INT","INT","INT",null],func_num:43       ,ret_type:"INT"},
	{name:"GET_IO_INP_INT",arg_types: ["INT","INT","INT",null],func_num:44       ,ret_type:"INT"},
	{name:"SET_IO_OUTP_INT",arg_types:["INT","INT","INT","INT"],func_num:45       ,ret_type:"INT"},
	
	{name:"WRITE_DS",arg_types:["INT","@BYTE","INT",null],func_num:46       ,ret_type:"INT"},
	{name:"READ_DS",arg_types:["INT","@BYTE","&INT",null],func_num:47       ,ret_type:"INT"},

	{name:"TRACE",arg_types:["INT","INT",null,null],func_num:48       ,ret_type:"INT"},
	{name:"LADDER_TRACE",arg_types:["INT","INT",null,null],func_num:49       ,ret_type:"INT"},

	{name:"SET_IO_PARAM_INT",arg_types:["INT","INT","INT","INT"],func_num:50       ,ret_type:"INT"},
	{name:"ARRAY_INIT",arg_types:["@BYTE","INT","@INT",null],func_num:51       ,ret_type:"INT"},
	{name:"GET_RUNG_TRUE",arg_types:["INT",null,null,null],func_num:52       ,ret_type:"INT"},
	{name:"SIGN_EXTEND_16",arg_types:["INT",null,null,null],func_num:53       ,ret_type:"INT"},
	
/*	{name:"INT_TO_FLOAT",arg_types:["INT",null,null,null],func_num:10   ,ret_type:"REAL"},
	{name:"SIN",arg_types:["REAL",null,null,null],func_num:11   ,ret_type:"REAL"},
	{name:"POW",arg_types:["REAL","REAL",null,null],func_num:12   ,ret_type:"REAL"},
	{name:"FLOAT_TO_INT",arg_types:["REAL",null,null,null],func_num:13   ,ret_type:"INT"},*/
	
];

// substituted inside code generation
var special_func=
[
	{name:"LADDER_COIL",arg_types:["&INT","INT","INT",null],func_num:11       ,ret_type:"INT"},
	{name:"LADDER_ASSIGN",arg_types:["&INT","INT","INT","INT"],func_num:12       ,ret_type:"INT"},
];

function findBuiltInSpecialFunc(name)
{
	var i;
	for(i=0;i<special_func.length;i++)
	{
		if (special_func[i].name==name)
		{
			return special_func[i];
		}
	}
	return null;
}
				

function findBuiltInFunc(name)
{
	var i;
	for(i=0;i<built_in_funcs.length;i++)
	{
		if (built_in_funcs[i].name==name)
		{
			return built_in_funcs[i];
		}
	}
	return null;
}	


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!  Preprocess begin !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var enum_list=[];
var enum_vals=[];
var alias_list_names=[];
var alias_list_objs=[];
var hmi_elem_cnt=0;

function addToEnumList(val,const_val)
{
	enum_list[enum_list.length]=val;
	if (const_val!=undefined)
	{
		enum_vals[enum_list.length-1]=const_val;
	}
}

function replaceForWithWhile(elem)
{
	var i;
	if (elem.list!=undefined)
	{
		for(i=0;i<elem.list.length;i++)
		{
			if (elem.list[i].enum_type==ELEM.FOR_LOOP)
			{
				// for loop element is replaced with "statement_list"
				var init=new Object();
				PARSE.setObjType(init,"ASSIGN",ELEM.ASSIGN);
				init.list=[];
				init.list[0]=elem.list[i].list[0];
				init.list[1]=elem.list[i].list[1];
				init.line_num=elem.list[i].line_num;
				
				var inner_while=elem.list[i];
				var inner_while_cond=new Object();
				PARSE.setObjType(inner_while_cond,"EXPR",ELEM.EXPR);
				inner_while_cond.list=[];
				inner_while_cond.list[0]=elem.list[i].list[0];
				inner_while_cond.list[1]={enum_type:ELEM.OP,str_type:"<=",data:token_types.LESS_EQ};
				inner_while_cond.list[2]=elem.list[i].list[2];
				inner_while_cond.line_num=elem.list[i].line_num;
				
				
				var inner_while_statements=elem.list[i].list[3];
				var last_statement=new Object();
				PARSE.setObjType(last_statement,"ASSIGN",ELEM.ASSIGN);
				last_statement.line_num=elem.list[i].line_num;
				last_statement.list=[];
				last_statement.list[0]=elem.list[i].list[0];
				var expr=new Object();
				PARSE.setObjType(expr,"EXPR",ELEM.EXPR);
				expr.list=[];
				expr.list[0]=elem.list[i].list[0];
				expr.list[1]={enum_type:ELEM.OP,str_type:"+",data:token_types.PLUS};
				expr.list[2]={enum_type:ELEM.CONST,data:"1"};
				expr.line_num=elem.list[i].line_num;
				last_statement.list[1]=expr;
				inner_while_statements.list[inner_while_statements.list.length]=last_statement;
				var saved_line=elem.list[i].line_num;
				PARSE.setObjType(inner_while,"WHILE",ELEM.WHILE);
				inner_while.list[0]=inner_while_cond;
				inner_while.list[1]=inner_while_statements;
				inner_while.line_num=saved_line;
				elem.list[i].list.splice(2,2); 
				var repl_elem=new Object();
				PARSE.setObjType(repl_elem,"STATEMENT_LIST",ELEM.STATEMENT_LIST);
				repl_elem.line_num=elem.list[i].line_num;
				repl_elem.list=[];
				repl_elem.list[0]=init;
				repl_elem.list[1]=inner_while;
				elem.list[i]=repl_elem;
			}
			replaceForWithWhile(elem.list[i]);
		}
	}
}


function replaceLadderFunctionBlockCalls(elem)
{

	var i;
	if (elem.enum_type==ELEM.LADDER_FUNC_BLOCK_CALL)
	{
		elem.enum_type=elem.list[0].enum_type;
		elem.list[0].list[1].disable_trace=true;
		elem.list=elem.list[0].list;
		
	}
	else
	{
		if (elem.list!=undefined)
		{
			for(i=0;i<elem.list.length;i++)
			{
				replaceLadderFunctionBlockCalls(elem.list[i]);
			}		
		}
	}
}



function constructHMI_Map(elem,const_only)
{
	var outp;
	var i;
	
	if (elem.enum_type==ELEM.EXPR_VAR)
	{
		if (const_only==true)
		{
			stopCompilation("Can not have variables in the position element",elem);
		}
		var offset=elem.ref_addr;	
		if (elem.offset_list.length!=0)
		{
			offset+=elem.offset_list[0].offset;
		}
		var is_array=(elem.last_type.range_start!=undefined);
		var num_elems=1;
		if (is_array==true)
		{
			if (elem.list[elem.list.length-1].enum_type==ELEM.EXPR_VAR_ARR_IND)
			{
				is_array=false;
			}
			else
			{
				num_elems=elem.last_type.range_end;
			}
		}
		outp={type:"VAR",sub_type:elem.last_type.data, size:elem.last_type.link.var_size,offset:offset,is_array:is_array,num_elems:num_elems};
		return outp;
	}
	else if (elem.enum_type==ELEM.CONST_STR)
	{
		outp={type:"CONST_STR",name:elem.data};
		return outp;
	}
	else if ((elem.enum_type==ELEM.CONST_INT)||(elem.enum_type==ELEM.CONST))
	{
		outp={type:"CONST_INT",name:elem.data};
		return outp;
	}
	else if (elem.list!=undefined)
	{
		outp={type:elem.str_type};
		
		if (elem.enum_type==ELEM.HMI)
		{
			outp.proj_title=GOM.arrToString(GOM.getObjArr("ARGEE_PROJ_TITLE",0));
			outp.enum_list=PROCESS.getEnumList();
			hmi_elem_cnt=0;
			// project title
			// enum list
			
		}
		if (elem.enum_type==ELEM.FUNC_NO_RETURN)
		{
			outp.elem_id=hmi_elem_cnt;
			hmi_elem_cnt++;
		}
		


		if (elem.data!=undefined)
		{
			outp.name=elem.data;
		}
		else
		{
			outp.name=decodeURI(elem.name);
		}
		outp.list=[];
	}
	if ((elem.enum_type==ELEM.EXPR)&&(elem.list.length==2)&&((elem.list[1].enum_type==ELEM.CONST)||(elem.list[1].enum_type==ELEM.CONST_INT)))
	{
		outp={type:"CONST_INT",name:elem.elem_string};
		return outp;
	}
	for(i=0;i<elem.list.length;i++)
	{
		outp.list[i]=constructHMI_Map(elem.list[i],const_only);
	}
	if (elem.extra_elements!=undefined)
	{
		outp.extra_elements=elem.extra_elements;
	}
	return outp;
}


function getEnumVal(id)
{
	return enum_list[id];
}

function getEnumList()
{
	return enum_list;
}

var const_int_arr=[];

function getConstIntArrName(arr)
{
	var i,j;
	for(i=0;i<const_int_arr.length;i++)
	{
		if (JSON.stringify(const_int_arr[i].val)==JSON.stringify(arr))
		{
			return const_int_arr[i].name;
		}
	}
	var len=const_int_arr.length;
	const_int_arr[len]={name:"___CONST_INT_ARR_"+len,val:arr};
	return const_int_arr[len].name;
}	

function separateFunctionsAndFunctionBlocks(ast,curr_funct_block,globals)
{
	var i;
	var func_ptr=findBuiltInFunc(ast.data);
	if (func_ptr!=null)
	{
		ast.func_descr=func_ptr;
		if (ast.data.toUpperCase()=="ARRAY_INIT")
		{
			// convert arguments 2..K to an array and replace all of them with array pointer
			var init_arr=[];
			if (ast.list.length<3)
			{
				stopCompilation("Invalid number of arguments for \"ARRAY_INIT\"",ast);
			}
			for(i=2;i<ast.list.length;i++)
			{
				if (ast.list[i].enum_type!=ELEM.CONST)
				{
					stopCompilation("Non constant array initializer argument "+i+" for \"ARRAY_INIT\"",ast);
				}
				init_arr[i-2]=num(ast.list[i].data)
			}
			ast.list.splice(2,ast.list.length-2);
			var obj=new Object();
			PARSE.setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
			obj.list=[];
			var obj1=new Object();
			obj.list[0]=obj1;
			PARSE.setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
			obj1.data=getConstIntArrName(init_arr);
			ast.list[2]=obj;
		}
	}
	else
	{
		var tmp_str=ast.data.split(".");
		var tp=curr_funct_block;
		for(i=0;i<tmp_str.length;i++)
		{
			var ptr=findVarElem(tp.list[0],tmp_str[i].toUpperCase());
			if ((ptr==null)&&(i==0))
			{
				// check if this is a global variable
				ptr=findVarElem(globals.list[0],tmp_str[0].toUpperCase());
			}
			if (ptr==null)
			{
				stopCompilation("Not a valid function/function_block",ast);
			}
			var tp=findFunctionBlock(globals,ptr.type.data);
			if (tp==null)
			{
				stopCompilation("Not a valid function/function_block",ast);
			}
		}
		// tp points to the function block.
		arg_list=[];
		//fillArgList(tp);
		for(i=0;i<tp.arg_list.list.length;i++)
		{
			arg_list[i]=tp.arg_list.list[i];
		}
		if (arg_list.length!=ast.list.length)
		{
			stopCompilation("Invalid number of arguments to function block",ast);
		}
		var line_num=ast.line_num;
		/*var funct_block_var=new Object();
		ARGEE_nst_parse.setObjType(funct_block_var,"EXPR_VAR",ELEM.EXPR_VAR);*/
		funct_block_var=ast.func_ptr;
		//funct_block_var.list=[];
		funct_block_var.line_num=line_num;
		/*for(i=0;i<tmp_str.length;i++)
		{
			funct_block_var.list[i]=new Object();
			ARGEE_nst_parse.setObjType(funct_block_var.list[i],"EXPR_VAR",ELEM.EXPR_VAR);
			funct_block_var.list[i].line_num=line_num;
			funct_block_var.list[i].data=tmp_str[i];
		}*/
		var obj2=new Object();
		ARGEE_nst_parse.setObjType(obj2,"FUNC_BLOCK_ARG_LIST",ELEM.FUNC_BLOCK_ARG_LIST);
		obj2.line_num=line_num;
		obj2.list=[];
		for(i=0;i<arg_list.length;i++)
		{
			var obj=new Object();
			ARGEE_nst_parse.setObjType(obj,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
			obj.line_num=line_num;
			obj.list=[];
			
			var obj1=new Object();
			ARGEE_nst_parse.setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
			obj1.line_num=line_num;
			obj1.list=[];
			obj1.list[0]=new Object();
			ARGEE_nst_parse.setObjType(obj1.list[0],"EXPR_VAR",ELEM.EXPR_VAR);
			obj1.list[0].line_num=line_num;
			obj1.list[0].data=arg_list[i];

			
			
			/*var obj1=fastClone(funct_block_var);
			var last=obj1.list.length;
			obj1.list[last]=new Object();
			ARGEE_nst_parse.setObjType(obj1.list[last],"EXPR_VAR",ELEM.EXPR_VAR);
			obj1.list[last].line_num=line_num;
			obj1.list[last].data=arg_list[i];*/
			obj.list[0]=obj1;
			obj.list[1]=ast.list[i];
			obj2.list[i]=obj;
		}
		ast.list[0]=funct_block_var;
		ast.list[1]=obj2;
		ARGEE_nst_parse.setObjType(ast,"FUNC_BLOCK_CALL",ELEM.FUNC_BLOCK_CALL);
		ast.line_num=line_num;
	}
}

function preProcessEnumsFuncs(ast,curr_funct_block)
{
	var i;
	if ((ast.enum_type==ELEM.FUNCT_BLOCK)||(ast.enum_type==ELEM.TASK))
	{
		curr_funct_block=ast;
	}
	if (ast.enum_type==ELEM.ENUM_ELEM)
	{
		addToEnumList(ast.name.toUpperCase(),ast.const_val);
	}
	if ((ast.enum_type==ELEM.VAR_REG)&&(ast.type.mapped_elem!=undefined))
	{
		alias_list_names[alias_list_names.length]=ast.name;
		alias_list_objs[alias_list_objs.length]=ast.type.mapped_elem;
	}
	if ((ast.enum_type==ELEM.FUNC)||(ast.enum_type==ELEM.FUNC_NO_RETURN))
	{
		separateFunctionsAndFunctionBlocks(ast,curr_funct_block,globals);
	}
		
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			if (ast.list[i]!=undefined)
			{				
				preProcessEnumsFuncs(ast.list[i],curr_funct_block);
				if ((ast.list[i].enum_type==ELEM.ENUM_OBJ)||
					((ast.list[i].enum_type==ELEM.VAR_REG)&&(ast.list[i].type.mapped_elem!=undefined)))
				{
					ast.list.splice(i,1);
					i=i-1;
				}
			}
		}
	}
}

var bool_enum=["FALSE","TRUE"];

function eliminateEnumVars(ast,all_preproc)
{
	var i;
	if ((ast.enum_type==ELEM.EXPR_VAR)&&(ast.list!=undefined)&&(ast.list.length==1)&&(ast.list[0].enum_type==ELEM.EXPR_VAR))
	{
		var bool_index=bool_enum.indexOf(ast.list[0].data);
		if (bool_index!=-1)
		{
			ARGEE_nst_parse.setObjType(ast,"CONST",ELEM.CONST,true);
			ast.data=bool_index;
			delete ast.list;
			return;
		
		}
		else
		{
			var enum_id=enum_list.indexOf(ast.list[0].data);
			if (enum_id!=-1)
			{
				ARGEE_nst_parse.setObjType(ast,"CONST",ELEM.CONST,true);
				if (enum_vals[enum_id]!=undefined)
				{
					ast.data=enum_vals[enum_id];
				}
				else
				{
					ast.data=enum_id;
				}
				delete ast.list;
				return;
			}
			enum_id=alias_list_names.indexOf(ast.list[0].data);
			if (enum_id!=-1)
			{
				ast.list=clone(alias_list_objs[enum_id].list);
				return;
			}
		}
		
	}
	if ((ast.type!=undefined)&&(ast.type.initialize_data!=undefined))
	{
		for(i=0;i<ast.type.initialize_data.length;i++)
		{
			eliminateEnumVars(ast.type.initialize_data[i],false);
		}
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			eliminateEnumVars(ast.list[i],true);
		}
	}
}


function eliminateCommentsInVars(ast)
{
	var i;
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;)
		{
			if (ast.list[i].enum_type==ELEM.COMMENT_VAR)
			{
				ast.list.splice(i,1);
			}
			else
			{
				i++;
			}				
		}
		for(i=0;i<ast.list.length;i++)
		{
			eliminateCommentsInVars(ast.list[i]);
		}
	}
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!  Preprocess end !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!  Mapped Var Handling begin !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


var MAP_VAR=
{
	IO:0,
	PLC:1,
	RETAIN:2,
	SPECIAL:3, // covers PLC_Connected&Cycle time
};

var mapped_var_desc=
[
	{type:MAP_VAR.IO, descr:["type(IO)","slot","sect","offset(in longs)","len (in longs)","dest_addr"]},
	{type:MAP_VAR.PLC, descr:["type(PLC)","direction","index(in shorts)","num_elems","dest_addr"]},
	{type:MAP_VAR.RETAIN, descr:["type(RETAIN)","addr_in_retain_mem(in longs)","num_elems","dest_addr"]},
	{type:MAP_VAR.SPECIAL, descr:["type(SPECIAL)","offset","len_in_bits","dest_addr"]},
];

var mapped_special_vars_def_names=[];
var mapped_special_vars_def_objs=[];
var retain_var_curr_addr=0;


function MAPPED_processVarSegm(ast)
{
	var num_elems=1;
	/*if ((ast.type!=undefined)&&(ast.type.mapped_elem!=undefined))
	{
		if (ast.type.type==ELEM.VAR_ARR)
		{
			num_elems=ast.type.range_end-ast.type.range_start+1;
		}
		ast.plc_len=2*num_elems;
		mapped_special_vars_def_names[mapped_special_vars_def_names.length]=ast.name;
		mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:ast,type:MAP_VAR.PLC,num_elems:num_elems};
		
	}
	else*/ if ((ast.type!=undefined)&&((ast.type.data=="RETAIN_INT")||(ast.type.data=="RETAIN_REAL")))
	{
		mapped_special_vars_def_names[mapped_special_vars_def_names.length]=ast.name;
		ast.retain_offset=retain_var_curr_addr;
		
		if (ast.type.type==ELEM.VAR_ARR)
		{
			num_elems=ast.type.range_end-ast.type.range_start+1;
		}
		retain_var_curr_addr+=num_elems;
		ast.retain_len=4*num_elems;
		ast.mapping_elem={fixed_path:[MAP_VAR.RETAIN],long_offset:ast.retain_offset,long_len:num_elems,num_elems:num_elems};
		mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:ast,type:MAP_VAR.RETAIN,num_elems:num_elems};
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			MAPPED_processVarSegm(ast.list[i]);
		}
	}
}

var IO_OBJ_TYPE={SECT:0,OBJ:1};


function MAPPED_addIOVarSegms()
{
	var i,ii,iii,name,special_name;
	// IO Variables
	for(i=0;i<IO_ids.length;i++)
	{
		var slice_index=findIndex(IO_ids[i]);
		for(ii=0;ii<slices[slice_index].sections.length;ii++)
		{
			name="IO_"+"Slot"+i+"_"+sect_names[ii];
			mapped_special_vars_def_names[mapped_special_vars_def_names.length]=name.toUpperCase();
			mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.IO,descr:[MAP_VAR.IO,i,ii,0,0],num_elems:1};
			for(iii=0;iii<slices[slice_index].sections[ii].objects.length;iii++)
			{
				name="IO_"+"Slot"+i+"_"+sect_names[ii]+"_"+slices[slice_index].sections[ii].objects[iii].name;
				mapped_special_vars_def_names[mapped_special_vars_def_names.length]=name.toUpperCase();
				mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.IO,descr:[MAP_VAR.IO,i,ii,slices[slice_index].sections[ii].objects[iii].offset,slices[slice_index].sections[ii].objects[iii].length],num_elems:1};
			}
			special_name=SIM.getSlotName(i,true);
			if (special_name!=("Slot"+i))
			{
				name="IO_"+special_name+"_"+sect_names[ii];
				mapped_special_vars_def_names[mapped_special_vars_def_names.length]=name.toUpperCase();
				mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.IO,descr:[MAP_VAR.IO,i,ii,0,0],num_elems:1};
				for(iii=0;iii<slices[slice_index].sections[ii].objects.length;iii++)
				{
					name="IO_"+special_name+"_"+sect_names[ii]+"_"+slices[slice_index].sections[ii].objects[iii].name;
					mapped_special_vars_def_names[mapped_special_vars_def_names.length]=name.toUpperCase();
					mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.IO,descr:[MAP_VAR.IO,i,ii,slices[slice_index].sections[ii].objects[iii].offset,slices[slice_index].sections[ii].objects[iii].length],num_elems:1};
				}
			}
			
			
		}
	}
	// PLC variables
	for(i=0;i<2;i++)
	{
		var str;
		if (i==0)
		{
			str="IO_ARGEE_TO_PLC_WORD";
		}
		else
		{
			str="IO_PLC_TO_ARGEE_WORD";
		}
		for(ii=0;ii<128;ii++)
		{
			mapped_special_vars_def_names[mapped_special_vars_def_names.length]=str+ii;
			mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.PLC,descr:[MAP_VAR.PLC,i,ii],num_elems:1};
		}
	}
	
	// Other special variables
	mapped_special_vars_def_names[mapped_special_vars_def_names.length]="PLC_CONNECTED";
	mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.SPECIAL,descr:[MAP_VAR.SPECIAL,0,1],num_elems:1};	
	mapped_special_vars_def_names[mapped_special_vars_def_names.length]="PROG_RUNNING";
	mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.SPECIAL,descr:[MAP_VAR.SPECIAL,1,1],num_elems:1};	
	mapped_special_vars_def_names[mapped_special_vars_def_names.length]="EXCEPTION_DETECTED";
	mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.SPECIAL,descr:[MAP_VAR.SPECIAL,2,1],num_elems:1};	
	mapped_special_vars_def_names[mapped_special_vars_def_names.length]="PROG_CYCLE_TIME";
	mapped_special_vars_def_objs[mapped_special_vars_def_objs.length]={elem:null,type:MAP_VAR.SPECIAL,descr:[MAP_VAR.SPECIAL,24,8],num_elems:1};	
}
	


// assume that global variables are unique - can not be masked in function vars -> if a variable name appears in the function
// which matches a global variable - it is assumed to be a global variable.

function addMappedVar(elem)
{
	mapped_var_list[mapped_var_list.length]=elem;
}


function extractAllcomplexVarElements(ast)
{
	var i;
	if ((ast.enum_type==ELEM.EXPR_VAR)&&(ast.list!=undefined)&&(ast.list[0].enum_type==ELEM.EXPR_VAR))
	{
		var ind=mapped_special_vars_def_names.indexOf(ast.list[0].data);
		if ((ast.list.length>1)&&(ast.list[1].enum_type==ELEM.EXPR_VAR_OFFSET))
		{
			// offset/length notation
			offset=ast.list[1].offset;
			bit_len=ast.list[1].len;
			ast.bit_offset=offset;
			ast.bit_len=bit_len;
		}
		if (ind!=-1)
		{
			addMappedVar({elem:ast,ind:ind});
		}
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			extractAllcomplexVarElements(ast.list[i]);
		}
	}
}

function MAPPED_getObjDescr(map_obj)
{
	var sub_obj=mapped_special_vars_def_objs[map_obj.ind];
	var abs_path_str="";
	var rel_offset,rel_len,descr_fixed,elem_len; 
	var num_elems=1;
	if (sub_obj.type==MAP_VAR.RETAIN)
	{
		abs_path_str="RETAIN";
		rel_offset=sub_obj.elem.retain_offset*32;
		rel_len=sub_obj.elem.retain_len*8;
		num_elems=(sub_obj.elem.retain_len/4)|0;
		descr_fixed=[MAP_VAR.RETAIN];
	}
	if (sub_obj.type==MAP_VAR.PLC)
	{
		abs_path_str="PLC_"+sub_obj.descr[1];
		rel_offset=num(sub_obj.descr[2])*16;
		rel_len=1*16;
		
		descr_fixed=[MAP_VAR.PLC,sub_obj.descr[1]];
	}
	if (sub_obj.type==MAP_VAR.IO)
	{
		abs_path_str="IO_"+sub_obj.descr[1]+"_"+sub_obj.descr[2];
		rel_offset=sub_obj.descr[3];
		rel_len=sub_obj.descr[4];
		descr_fixed=[MAP_VAR.IO,sub_obj.descr[1],sub_obj.descr[2]];
	}
	if (sub_obj.type==MAP_VAR.SPECIAL)
	{
		abs_path_str="SPECIAL";
		rel_offset=sub_obj.descr[1];
		rel_len=sub_obj.descr[2];
		descr_fixed=[MAP_VAR.SPECIAL];
	}
	return {name:abs_path_str,descr:descr_fixed,offset:rel_offset,len:rel_len,num_elems:num_elems};
}

var real_mapped_vars_segm=[];
var real_mapped_vars_descr=[];

function createLongMappedVars()
{
	var i;
	for(i=0;i<mapped_var_list.length;i++)
	{
		var obj_descr=MAPPED_getObjDescr(mapped_var_list[i]);
		if (obj_descr.descr[0]==MAP_VAR.RETAIN)
		{
			
			continue;
		}
		var act_offset=obj_descr.offset;
		var act_len=obj_descr.len;
		if (mapped_var_list[i].elem.bit_offset!=undefined)
		{
			act_offset+=mapped_var_list[i].elem.bit_offset;
			act_len=mapped_var_list[i].elem.bit_len;
		}
		var long_offset=ToInt32(act_offset/32);
		var tmp=ToInt32(act_len/32);
		var long_len=tmp;
		if ((tmp*32)!=act_len)
		{
			long_len++;
		}
			
		var desired_name=obj_descr.name+"_"+long_offset;
		var elem_length=4;
		if (obj_descr.num_elems>1)
		{
			desired_name+="_ARR";
			
		}
		var ind=real_mapped_vars_segm.indexOf(desired_name);
		if (ind==-1)
		{
			real_mapped_vars_segm[real_mapped_vars_segm.length]=desired_name;
			real_mapped_vars_descr[real_mapped_vars_descr.length]={fixed_path:obj_descr.descr,long_offset:long_offset,long_len:long_len,num_elems:obj_descr.num_elems};
			ind=real_mapped_vars_segm.length-1;
		}
		// modify the name to point to the correct variable
		mapped_var_list[i].elem.list[0].data=desired_name;
		mapped_var_list[i].elem.list[0].bit_offset=act_offset-long_offset*32;
		mapped_var_list[i].elem.list[0].bit_len=act_len;
		
		mapped_var_list[i].elem.map_var_index=ind;
	}
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!   End Mapped Var Handling  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var globals;



function findVarElem(ast,name)
{
	var i;
	if ((ast.enum_type==ELEM.VAR_REG)||(ast.enum_type==ELEM.VAR_ARR))
	{
		// check the variable name
		if (ast.name.toUpperCase()==name)
		{
			return ast;
		}
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			var res=findVarElem(ast.list[i],name);
			if (res!=null)
			{
				return res;
			}
		}
	}
	return null;
}

var arg_list=[];

/*function fillArgList(ast)
{
	var i;
	if (((ast.enum_type==ELEM.VAR_REG)||(ast.enum_type==ELEM.VAR_ARR))&&((ast.segm_link.type==token_types.VAR_INPUT)||(ast.segm_link.type==token_types.VAR_INOUT)))
	{
		arg_list[arg_list.length]=ast;
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			fillArgList(ast.list[i]);
		}
	}
	return;
	
	
}*/

function verifyFuncBlocks(ast)
{
	var i,j,k;
	for(k=0;k<ast.list[1].list.length;k++)
	{
		if (ast.list[1].list[k].enum_type==ELEM.FUNCT_BLOCK)
		{
			// check if all the function block arguments are listed in Input/in_out variables
			var fb=ast.list[1].list[k];
			for(i=0;i<fb.arg_list.list.length;i++)
			{
				var count=0;
				var found=false;
				for(j=0;j<fb.list[0].list.length;j++)
				{
					if ((fb.list[0].list[j].segm_type==token_types.VAR_INPUT)||(fb.list[0].list[j].segm_type==token_types.VAR_INOUT))
					{
						count++;
						if (fb.arg_list.list[i].toUpperCase()==fb.list[0].list[j].name.toUpperCase())
						{
							found=true;
							if (i!=0)
							{
								break;
							}
						}
					}
				}
				if ((i==0)&&(fb.arg_list.list.length!=count))
				{
					stopCompilation("Mismatch in number of parameters",fb);
				}
				if (found!=true)
				{
					stopCompilation("Missing parameter \""+fb.list[0].list[i]+"\"",fb);
				}
			}
		}
	}
}
		
	

// Main entry function
function process(ast)
{
	var i;
	var num_tasks_without_code=0;
	var num_tasks=0
	
	try
	{
		// Perform AST-to-AST source level transformations	
		GOM.clearDVs();
		alias_list_names=[];
		alias_list_objs=[];
		enum_list=[];
		globals=ast;

		replaceLadderFunctionBlockCalls(ast);
		replaceForWithWhile(ast);
		
		preProcessEnumsFuncs(ast);
		eliminateEnumVars(ast);
		eliminateEnumVars(ast.hmi);

		
		// start adding mapped variables and linking data structures
			
		retain_var_curr_addr=0;
		mapped_special_vars_def_names=[];
		mapped_special_vars_def_objs=[];
		mapped_var_list=[];
		

		MAPPED_addIOVarSegms();
		MAPPED_processVarSegm(ast);
		
		real_mapped_vars_segm=[];
		real_mapped_vars_descr=[];

		// Special variables segment is always mapped
		real_mapped_vars_segm[real_mapped_vars_segm.length]="SPECIAL_0";
		real_mapped_vars_descr[real_mapped_vars_descr.length]={fixed_path:[MAP_VAR.SPECIAL,0,1],long_offset:0,long_len:1,num_elems:1};

		
		/*var ind=mapped_special_vars_def_names.indexOf("PROG_RUNNING");
		addMappedVar({elem:null,ind:ind});*/
		extractAllcomplexVarElements(ast);
		createLongMappedVars();
		
		globals=ast;
		
		
		linkParent(globals);
		collapseVarSegmLists(globals);
		eliminateCommentsInVars(globals);
		verifyFuncBlocks(globals);
		
		
		
		appendReservedElements();
		
		reArrangeVariablesDueToAlignment(globals);

		
		// mark task variables appropriately
		for(i=0;i<globals.list[0].list.length;i++)
		{
			var elem_type=globals.list[0].list[i].type.data;
			var type=findFunctionBlock(globals,elem_type);
			if ((type!=null)&&(type.task_function_block==true))
			{
				globals.list[0].list[i].segm_type=token_types.VAR_TASK;
				if (type.list[1].list.length<4) // standard task prologue without code
				{
					num_tasks_without_code++;
				}
				num_tasks++;
			}
		}
		
		if ((num_tasks==1)&&(num_tasks_without_code==1))
		{
			// clean project -> stop boot project
			//GOM.addAjaxAction(ARGEE_misc_transf_func.StopProj);
			return {empty_proj:true};
		}

		appendFixedFunctionBlockVarsElements();
		extendFuncBlockAssignmentVars(globals);
		checkVarDuplicates(globals);
		globals=eliminateConstantTrees(obj);
		globals=eliminateNegativeExpressiionStart(globals);
		checkFuncBlockNameConflicts();
		calcFunctBlockVarSizesAndOffsets(globals,0);
		linkElements(globals,globals);
		linkElements(globals,globals.hmi); // link HMI elements	
		modifyTaskFunctions(globals);
		eliminateUnvisited(0);
		eliminateUnvisited(1);
		groupAndAllocMappedVars(globals);
		allocateGlobalVars();
		computeVarSizes(globals);
		var_calc_hmi=true;
		computeVarSizes(globals.hmi);
		var_calc_hmi=false;
		
			
		prepareFP_Ast(globals);

			
			
		//displayAST_Elem(0,globals,false);
		//printAST();
		//	DEB_elem_tree=DEB_CreateAstGlobMemoryMap(globals.list[0],[],0);
		//	DEB_ReorgVarDispTree(DEB_elem_tree);
			
		var reduced=flattenAndValidateExpressions(globals);
		createInitializerList(reduced);

		if (debug_console==true)
		{
			console.log("-----------------------After Process---------------------------");
			parse.quickPrintAST(reduced);
		}
		globals=reduced;
	}
	catch(e)
	{
		PARSE.setErrMsg(e);
		console.log("Error: "+(e.err_msg) + " in the program on line: "+ (parse.getTokenStartLine()+1));
		//var res_inner=this.document.getElementById("comp_res_id");
		//res_inner.innerHTML="Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1);
		return null;
	}

	
	return reduced;
}

function getProcessedAst()
{
	return globals;
}


function collapseVarSegmLists(ast)
{
	var i,j;
	
	if (ast.enum_type==ELEM.VAR_SEGM_LIST)
	{
		var new_list=[];
		for(i=0;i<ast.list.length;i++)
		{
			for(j=0;j<ast.list[i].list.length;j++)
			{
				
				if (ast.list[i].type==token_types.VAR_INPUT)
				{
					if (ast.list[i].list[j].enum_type==ELEM.COMMENT_VAR)
					{
						ast.list[i].list[j].segm_type=ast.list[i].type;
					}
					else if ((isSimpleType(ast.list[i].list[j].type.data)==-1)||(ast.list[i].list[j].type.range_start!=undefined))
					{
						ast.list[i].list[j].segm_type=token_types.VAR_INOUT;
						ast.list[i].list[j].segm_link={type:token_types.VAR_INOUT};

					}
					else
					{
						ast.list[i].list[j].segm_type=token_types.VAR_INPUT;
					}
				}
				else
				{
					ast.list[i].list[j].segm_type=ast.list[i].type;
				}
				new_list[new_list.length]=ast.list[i].list[j];
			}
		}
		ast.list=new_list;
		ARGEE_nst_parse.setObjType(ast,"VAR_SEGM",ELEM.VAR_SEGM);
	}
	else
	{
		if (ast.list==undefined)
		{
		}
		else
		{
			for(i=0;i<ast.list.length;i++)
			{
				collapseVarSegmLists(ast.list[i]);
			}
		}
	}
}









var parse=ARGEE_nst_parse;


function createToFloatAST_Branch(ast)
{
	var obj=new Object();
	var i;
	parse.setObjType(obj,"TO_FLAT",ELEM.TO_FLOAT);
	obj.list=[ast];
	obj.fp=true;
	return obj;
}

function createToIntAST_Branch(ast)
{
	var obj=new Object();
	var i;
	parse.setObjType(obj,"TO_INT",ELEM.TO_INT);
	obj.list=[ast];
	return obj;
}

// returns value 0 -> op to change to, 1 -> if the result is FP or not
function changeToFP_Op(op)
{
	switch(op)
	{
		case token_types.PLUS: return         [token_types.F_ADD,          true];
		case token_types.MINUS: return        [token_types.F_SUB,          true];
		case token_types.MULT: return         [token_types.F_MULT,         true];
		case token_types.DIV: return          [token_types.F_DIV,          true];
		case token_types.EQ: return           [token_types.F_EQ,           false];
		case token_types.LESS_EQ: return      [token_types.F_LESS_EQ,      false];
		case token_types.NOT_EQ: return       [token_types.F_NOT_EQ,       false];
		case token_types.LESS: return         [token_types.F_LESS,         false];
		case token_types.BIGGER: return       [token_types.F_BIGGER,       false];
		case token_types.BIGGER_OR_EQ: return [token_types.F_BIGGER_OR_EQ, false];
	}
}

function prepareFP_Ast(ast)
{
	var i;
	if (ast.enum_type==ELEM.EXPR_VAR)
	{
		if ((ast.last_type.data=="REAL")||(ast.last_type.data=="RETAIN_REAL"))
		{
			if (GEN.getARM7_Mode()==true)
			{
				stopCompilation("This device doesn't support floating point functionality",ast);
			}
			ast.fp=true;
			ast.fp_convert=false;
		}
	}
	else if ((ast.enum_type==ELEM.ASSIGN)||
	   (ast.enum_type==ELEM.FUNC_BLOCK_VAR_ASSIGN))
	{
		for(i=0;i<ast.list.length;i++)
		{
			ast.list[i]=prepareFP_Ast(ast.list[i]);
		}
		if ((ast.list[0].fp==true)&&(ast.list[1].fp!=true))
		{
			ast.list[1]=createToFloatAST_Branch(ast.list[1]);
		}
		else if ((ast.list[0].fp!=true)&&(ast.list[1].fp==true))
		{
			ast.list[1]=createToIntAST_Branch(ast.list[1]);
		}
	}
	else if ((ast.enum_type==ELEM.FUNC)||(ast.enum_type==ELEM.FUNC_NO_RETURN))
	{
		var descr=ast.func_descr;
		if (ast.func_descr==null)
		{
			stopCompilation("Not a valid function",ast);
		}
		if (ast.func_descr.name=="LADDER_ASSIGN")
		{
			// ladder_assign can be hacked to store FP numbers
			// we use the fact that it blindly stores the 32 bit number into a destination 32 bit memory location and the 
			// floating point numbers are just values that are moved to "R0" after the expression evaluation.
			for(i=0;i<ast.list.length;i++)
			{
				ast.list[i]=prepareFP_Ast(ast.list[i]);
			}
			if ((ast.list[0].fp==true)&&(ast.list[1].fp!=true))
			{
				ast.list[1]=createToFloatAST_Branch(ast.list[1]);
			}
			else if ((ast.list[0].fp!=true)&&(ast.list[1].fp==true))
			{
				ast.list[1]=createToIntAST_Branch(ast.list[1]);
			} 
		}
		else
		{
			for(i=0;i<ast.list.length;i++)
			{
				ast.list[i]=prepareFP_Ast(ast.list[i]);
				if ((ast.list[i].fp==true)&&(descr.arg_types[i]!="REAL"))
				{
					ast.list[i]=createToIntAST_Branch(ast.list[i]);
				}
				else if ((ast.list[i].fp!=true)&&(descr.arg_types[i]=="REAL"))
				{
					ast.list[i]=createToFloatAST_Branch(ast.list[i]);
				}
			}
		}
	}
	else if (ast.enum_type==ELEM.EXPR)
	{
		var fp_found=false;
		for(i=0;i<ast.list.length;i++)
		{
			if (ast.list[i].enum_type!=ELEM.OP)
			{
				ast.list[i]=prepareFP_Ast(ast.list[i]);
				if (ast.list[i].fp!=undefined)
				{
					fp_found=true;
				}
			}
		}
		if (fp_found)
		{
			// convert all operands to FP
			for(i=0;i<ast.list.length;i++)
			{
				if (ast.list[i].enum_type!=ELEM.OP)
				{
					if (ast.list[i].fp==undefined)
					{
						ast.list[i]=createToFloatAST_Branch(ast.list[i]);
					}
				}
			}
			var result_floating_point=true;
			// modify operations to FP
			for(i=0;i<ast.list.length;i++)
			{
				if (ast.list[i].enum_type==ELEM.OP)
				{
					var res=changeToFP_Op(ast.list[i].data);
					if (res[1]==false)
					{
						result_floating_point=false;
					}
					ast.list[i].data=res[0];
					ast.list[i].str_type=parse.getOpName(ast.list[i].data);
				}
			}
			if (GEN.getARM7_Mode()==true)
			{
				stopCompilation("This device doesn't support floating point functionality",ast);
			}
			if (result_floating_point==false)
			{
				if (ast.fp!=undefined)
				{
					delete ast.fp;
				}

			}
			else
			{
				ast.fp=true;
			}
				
		}
	}
	else
	{
		if (ast.list==undefined)
		{
		}
		else
		{
			for(i=0;i<ast.list.length;i++)
			{
				ast.list[i]=prepareFP_Ast(ast.list[i]);
			}
		}
	}
	return ast;
}

// expressions should always starts with operand and not an operator. In case the first element is an operator (likely "-"). Add "0" as the first element of the expression
function eliminateNegativeExpressiionStart(ast)
{
	var i;
	var curr_value=0;
	var final_ast={},tmp_ast;
	if (ast.enum_type==ELEM.EXPR)
	{
		if ((ast.list[0].enum_type==ELEM.OP)&&(ast.list[0].data!=token_types.NOT))
		{
			i=0;
			final_ast.enum_type=ELEM.CONST;
			final_ast.data="0";
			final_ast.type_str="CONST";
			ast.list.splice(0,0,final_ast);
		}
	}
	if (ast.list==undefined)
	{
	}
	else
	{
		for(i=0;i<ast.list.length;i++)
		{
			ast.list[i]=eliminateNegativeExpressiionStart(ast.list[i]);
		}
	}
	return ast;
}

function execConstOp(op,arg1,arg2)
{
	switch(op)
	{
		case token_types.PLUS:return arg1+arg2;
		case token_types.MINUS:return arg1-arg2;
		case token_types.LESS:if (arg1<arg2){return 1;}else{return 0;}
		case token_types.LESS_EQ:if (arg1<=arg2){return 1;}else{return 0;}
		case token_types.NOT_EQ:if (arg1!=arg2){return 1;}else{return 0;}
		case token_types.EQ:if (arg1==arg2){return 1;}else{return 0;}
		case token_types.BIGGER:if (arg1>arg2){return 1;}else{return 0;}
		case token_types.BIGGER_OR_EQ:if (arg1>=arg2){return 1;}else{return 0;}
		case token_types.DIV:return (arg1/arg2)|0;
		case token_types.MULT:return (arg1*arg2);
		case token_types.AND:if ((arg1==1)&&(arg2==1)){return 1;}else{return 0;}
		case token_types.NOT:if (arg2==1){return 0;}else{return 1;}
		case token_types.OR:if ((arg1==1)||(arg2==1)){return 1;}else{return 0;}
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



function eliminateConstantTrees(ast)
{
	var i;
	var curr_value=0;
	var final_ast={},tmp_ast;
	if (ast.enum_type==ELEM.EXPR)
	{
		i=0;
		// find the first operation
		if (ast.list[0].enum_type==ELEM.OP)
		{
			tmp_ast=eliminateConstantTrees(ast.list[1]); 
			if (tmp_ast.enum_type==ELEM.CONST)
			{
				curr_value=execConstOp(ast.list[0].data,0,parseInt(tmp_ast.data));
				final_ast.enum_type=ELEM.CONST;
				final_ast.data=""+curr_value;
				final_ast.type_str="CONST";
				ast.list[0]=final_ast;
				shiftArr(ast.list,1,ast.list.length);
				i=1;
			}
			else
			{
				ast.list[1]=tmp_ast;
				i=2;
			}
		}
		else
		{
			ast.list[0]=eliminateConstantTrees(ast.list[0]); 
			i=1;
		}
		while(1)
		{
			if (i>=ast.list.length)
			{
				break;
			}
			if (ast.list[i].enum_type!=ELEM.OP)
			{
				stopCompilation("Not an operation",ast.list[i]);
			}
			tmp_ast=eliminateConstantTrees(ast.list[i+1]); 
			ast.list[i+1]=tmp_ast;
			if ((ast.list[i+1].enum_type==ELEM.CONST)&&(ast.list[i-1].enum_type==ELEM.CONST))
			{
				curr_value=execConstOp(ast.list[i].data,
				                      parseInt(ast.list[i-1].data),
									  parseInt(ast.list[i+1].data));
				final_ast.enum_type=ELEM.CONST;
				final_ast.data=""+curr_value;
				final_ast.type_str="CONST";
				ast.list[i-1]=final_ast;					  
				shiftArr(ast.list,i,ast.list.length);
				shiftArr(ast.list,i,ast.list.length);
			}
			else
			{
				i+=2;
			}
		}
		if (ast.list.length==1)
		{
			return ast.list[0];
		}
		else
		{
			return ast;
		}
	}
	else
	{
		if (ast.list==undefined)
		{
		}
		else
		{
			for(i=0;i<ast.list.length;i++)
			{
				ast.list[i]=eliminateConstantTrees(ast.list[i]);
			}
		}
		return ast;
	}
}



function varRearrangeCompareFunc(a,b)
{
	var type_ind_a=isSimpleType(a.type.data);
	var type_ind_b=isSimpleType(b.type.data);
	// data structures should be in the end
	if ((type_ind_a==-1)&&(type_ind_b!=-1))
	{
		return -1;
	}
	if ((type_ind_b==-1)&&(type_ind_a!=-1))
	{
		return 1;
	}
	
	// second allocate arrays (always integer number of 4 bytes)
	if ((a.type.range_start!=undefined)&&(b.type.range_start==undefined))
	{
		return 1;
	}
	if ((b.type.range_start!=undefined)&&(a.type.range_start==undefined))
	{
		return -1;
	}
	
	// deal with all other data types (4 byte data types appear first)
	if (simpleTypeSizesInBytes[type_ind_a]>simpleTypeSizesInBytes[type_ind_b])
	{
		return 1;
	}
	if (simpleTypeSizesInBytes[type_ind_a]<simpleTypeSizesInBytes[type_ind_b])
	{
		return -1;
	}
	// perform variable name comparison for equal variables
	if (a.name>b.name)
	{
		return -1;
	}
	if (a.name<b.name)
	{
		return 1;
	}
	
	return 0;
}

function reArrangeVariablesDueToAlignment(ast)
{
	var i;
	ast.list[0].list.sort(varRearrangeCompareFunc).reverse();
	for(i=0;i<ast.list[1].list.length;i++)
	{
		ast.list[1].list[i].list[0].list.sort(varRearrangeCompareFunc).reverse();	
	}
}

function linkParent(ast)
{
	var i;
	if (ast.list==undefined)
	{
	}
	else
	{
		for(i=0;i<ast.list.length;i++)
		{
			ast.list[i].parent_node=ast;
			linkParent(ast.list[i]);
		}
	}
	
}

function checkVarDuplicates(ast)
{
	var i,j;
	if (ast.enum_type==ELEM.VAR_SEGM)
	{
		for(i=0;i<ast.list.length;i++)
		{
			for(j=0;j<ast.list.length;j++)
			{
				if ((i!=j)&&(ast.list[i].name==ast.list[j].name))
				{
					stopCompilation("Duplicate variable name",ast.list[i]);
				}
			}
		}
	}
	else
	{
		if (ast.list==undefined)
		{
		}
		else
		{
			for(i=0;i<ast.list.length;i++)
			{
				checkVarDuplicates(ast.list[i]);
			}
		}
	}
	
}

function findFunctionBlock(globals,name)
{
	var i;
	for(i=0;i<globals.list[1].list.length;i++)
	{
		
		if (((globals.list[1].list[i].enum_type==ELEM.FUNCT_BLOCK)||(globals.list[1].list[i].enum_type==ELEM.TASK))&&(globals.list[1].list[i].name.toUpperCase()==name.toUpperCase()))
		{
			return 	globals.list[1].list[i];
		}
	}
	return null;
}

// remove some function overhead and change that to a task overhead
function modifyTaskFunctions(globals)
{
	var i,j;
	for(i=0;i<globals.list[0].list.length;i++)
	{
		if (globals.list[0].list[i].segm_type==token_types.VAR_TASK)
		{
			var task=globals.list[0].list[i].type.link;
			if (task.task_modified!=undefined)
			{
				// we already processed that code
				continue;
			}
			task.task_modified=1;
			task.list[1].list.splice(task.list[1].list.length-1,1); // delete RETURN statement
			task.list[1].list.splice(1,1); // delete PREEMPTION_POINT statement
			var obj=new Object();
			parse.setObjType(obj,"STATEMENT_LIST",ELEM.STATEMENT_LIST);
			obj.list=[];
			for(j=1;j<task.list[1].list.length;j++)
			{
				obj.list[j-1]=task.list[1].list[j];
			}
			// add forced context switch
			var obj1=new Object();
			parse.setObjType(obj1,"ELEM_CONTEXT_SWITCH",ELEM.ELEM_CONTEXT_SWITCH);
			obj.list[obj.list.length]=obj1;
			
			// remove the newly created list from the task.list[1]
			task.list[1].list.splice(1);
			
			// add encapsulate the new statement list into "while(1)
			obj1=new Object();
			obj1.disable_trace=true;
			parse.setObjType(obj1,"WHILE",ELEM.WHILE);
			var obj2=new Object();
			parse.setObjType(obj2,"EXPR",ELEM.EXPR);
			var obj3=new Object();
			parse.setObjType(obj3,"CONST",ELEM.CONST);
			obj3.data="1";
			obj2.list=[obj3];
			obj1.list=[obj2];
			obj1.list[1]=obj;
			task.list[1].list[1]=obj1;
		}
	}
}

// convert function block var calls to regular var calls
function extendFuncBlockAssignmentVars(ast)
{
	var i,j;
	if (ast.enum_type==ELEM.FUNC_BLOCK_CALL)
	{
		for(i=0;i<ast.list[1].list.length;i++)
		{
			for(j=0;j<ast.list[0].list.length;j++)
			{
				ast.list[1].list[i].list[0].list.splice(j,0,ast.list[0].list[j]);
			}
		}
	}
	if (ast.list!=undefined)
	{
		for(i=0;i<ast.list.length;i++)
		{
			extendFuncBlockAssignmentVars(ast.list[i]);
		}
	}
}

var IO_SECT=
{
	INPUT:0,
	OUTPUT:1,
	DIAG:2,
	PARAM:3,
};

var mapped_var_list=[];

function mapped_var_compare(a,b)
{
	if (a.name=="MAPPING_TABLE")
	{
		return 1;
	}
	if (b.name=="MAPPING_TABLE")
	{
		return -1;
	}
	
	if ((a.mapping_elem==undefined)&&(b.mapping_elem!=undefined))
	{
		return 1;
	}
	if ((a.mapping_elem!=undefined)&&(b.mapping_elem==undefined))
	{
		return -1;
	}
	if ((a.mapping_elem==undefined)&&(b.mapping_elem==undefined))
	{
		if ((a.debug_hide==undefined)&&(b.debug_hide!=undefined))
		{
			return -1;
		}
		if ((a.debug_hide!=undefined)&&(b.debug_hide==undefined))
		{
			return 1;
		}
		var ret=varRearrangeCompareFunc(a,b);	
		if (ret==-1)
		{
			return 1;
		}
		else if (ret==1)
		{
			return -1;
		}
		return 0;
	}
	
	if (a.mapping_elem.fixed_path[0]<b.mapping_elem.fixed_path[0])
	{
		return -1;
	}
	if (a.mapping_elem.fixed_path[0]>b.mapping_elem.fixed_path[0])
	{
		return 1;
	}
	if (a.mapping_elem.fixed_path[0]==b.mapping_elem.fixed_path[0])
	{
		if ((a.mapping_elem.fixed_path.length>1)&&(a.mapping_elem.fixed_path[1]>b.mapping_elem.fixed_path[1]))
		{
			return -1;
		}
		else if ((a.mapping_elem.fixed_path.length>1)&&(a.mapping_elem.fixed_path[1]<b.mapping_elem.fixed_path[1]))
		{
			return 1;
		}
		else if ((a.mapping_elem.fixed_path.length>2)&&(a.mapping_elem.fixed_path[2]>b.mapping_elem.fixed_path[2]))
		{
			return -1;
		}
		else if ((a.mapping_elem.fixed_path.length>2)&&(a.mapping_elem.fixed_path[2]<b.mapping_elem.fixed_path[2]))
		{
			return 1;
		}
		else if (a.mapping_elem.long_offset<b.mapping_elem.long_offset)
		{
			return -1;
		}
		else if (a.mapping_elem.long_offset>b.mapping_elem.long_offset)
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	
}	

var mapped_ranges=[];	
	

function groupAndAllocMappedVars(ast)
{
	
	ast.list[0].list.sort(mapped_var_compare);
}


function appendReservedElements()
{
	var obj1;
		// Fixed elements -> rarely used in the user code
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   // Preemption point
	obj1.name="PREEMPT_ARGEE";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);

	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   // curr_task gets initialized to first_task. When the program starts it knows what is the first task -> no need to store it independently
	obj1.name="CURR_TASK";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.abs_addr=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;	
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);
	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   // Pointer to the function table
	obj1.name="PTR_TO_FUNCT_TBL";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);

	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   // number elements in the function table
	obj1.name="FUNCT_TBL_LEN";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);
	
	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="SAVE_FP_CALLER";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);

	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="SAVE_LR_CALLER";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);
	
	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="SAVE_SP";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);
	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="SAVE_LR";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_REG,data:"INT"};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);

	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="INSTR_TRACE_TBL";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	//obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:(nst_inst_trace_buf/4)-1, data:"INT"};
	obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:4+nst_inst_trace_buf-1, data:"BYTE",no_length:true};
	obj1.ctrl_elem=true;
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);

		
	
}


function appendFixedFunctionBlockVarsElements()
{
	var i;
	var obj1;
	var cnt=0;
	
	// append fixed elements to global variables


	


	var const_elems=parse.getConstElems();
	
	var const_num=const_elems[0];	
	var const_strings=const_elems[1];

	// addIO Mapped variables
	for(i=0;i<real_mapped_vars_segm.length;i++)
	{
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   // number elements in the function table
		obj1.name=real_mapped_vars_segm[i];
		obj1.segm_type=token_types.VAR;
		obj1.visited=true;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_REG,data:"INT"};
		obj1.debug_hide=true;
		obj1.mapping_elem=real_mapped_vars_descr[i];
		//real_mapped_vars_descr[i].var_elem=obj1;
		globals.list[0].list.splice(globals.list[0].list.length,0,obj1);
	}
	
	
	// add const floats/numbers
	for(i=0;i<const_num.length;i++)
	{
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
		obj1.name=const_num[i].name;
		obj1.segm_type=token_types.VAR;
		obj1.debug_hide=true;
		obj1.visited=true;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_REG, data:"REAL"};
		
		
		var obj_init=new Object();
		parse.setObjType(obj_init,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
		obj_init.list=[];
		var obj3=new Object();
		parse.setObjType(obj3,"EXPR_VAR",ELEM.EXPR_VAR);
		obj3.list=[]
			
		var obj2=new Object;
		parse.setObjType(obj2,"CONST_INT",ELEM.CONST_INT);
		obj2.data=const_num[i].val;

		
		obj_init.list[0]=obj3;
		obj_init.list[1]=obj2;
		obj1.type.initialize_data=[];
		obj1.type.initialize_data[0]=obj_init;
		obj1.debug_hide=true;		
		globals.list[0].list.splice(globals.list[0].list.length,0,obj1);		
	}
	

	// add constant strings
	for(i=0;i<const_strings.length;i++)
	{
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
		obj1.name=const_strings[i].name;
		obj1.segm_type=token_types.VAR;
		obj1.visited=true;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:const_strings[i].val.length, data:"CHAR"};
		
		
		var obj_init=new Object();
		parse.setObjType(obj_init,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
		obj_init.list=[];
		var obj3=new Object();
		parse.setObjType(obj3,"EXPR_VAR",ELEM.EXPR_VAR);
		obj3.list=[]
			
		var obj2=new Object;
		parse.setObjType(obj2,"CONST_STR",ELEM.CONST_STR);
		obj2.data=const_strings[i].val;

		
		obj_init.list[0]=obj3;
		obj_init.list[1]=obj2;
		obj1.type.initialize_data=[];
		obj1.type.initialize_data[0]=obj_init;
		obj1.debug_hide=true;
		globals.list[0].list.splice(globals.list[0].list.length,0,obj1);		
	}

	
	// add constant byte_arrays
	for(i=0;i<const_int_arr.length;i++)
	{
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
		obj1.name=const_int_arr[i].name;
		obj1.segm_type=token_types.VAR;
		obj1.visited=true;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:const_int_arr[i].val.length-1, data:"INT"};
		
		
		var obj_init=new Object();
		parse.setObjType(obj_init,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
		obj_init.list=[];
		var obj3=new Object();
		parse.setObjType(obj3,"EXPR_VAR",ELEM.EXPR_VAR);
		obj3.list=[]
			
		var obj2=new Object;
		parse.setObjType(obj2,"CONST_INT_ARR",ELEM.CONST_INT_ARR);
		obj2.data=const_int_arr[i].val;

		
		obj_init.list[0]=obj3;
		obj_init.list[1]=obj2;
		obj1.type.initialize_data=[];
		obj1.type.initialize_data[0]=obj_init;
		obj1.debug_hide=true;
		globals.list[0].list.splice(globals.list[0].list.length,0,obj1);		
	}

	
	for(i=0;i<globals.list[1].list.length;i++)
	{
		cnt=0;	
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);
		obj1.name="PC_RET";
		obj1.abs_addr=true;
		obj1.segm_type=token_types.VAR;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_REG,data:"INT"};
		obj1.visited=true;
		obj1.debug_hide=true;
		globals.list[1].list[i].list[0].list.splice(cnt,0,obj1);cnt++;
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);
		obj1.name="FP_RET";
		obj1.abs_addr=true;
		
		obj1.segm_type=token_types.VAR;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_REG,data:"INT"};
		obj1.visited=true;
		obj1.debug_hide=true;
		globals.list[1].list[i].list[0].list.splice(cnt,0,obj1);cnt++;
		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);
		obj1.name="NEXT_TASK";
		obj1.abs_addr=true;
		obj1.segm_type=token_types.VAR;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_REG,data:"INT"};
		obj1.visited=true;
		obj1.debug_hide=true;
		globals.list[1].list[i].list[0].list.splice(cnt,0,obj1);cnt++;

		obj1=new Object();
		parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);
		obj1.name="FLAGS";
		obj1.abs_addr=true;
		obj1.segm_type=token_types.VAR;
		obj1.segm_link={type:token_types.VAR};
		obj1.type={type:ELEM.VAR_REG,data:"INT"};
		obj1.visited=true;
		obj1.debug_hide=true;
		globals.list[1].list[i].list[0].list.splice(cnt,0,obj1);cnt++;
	}
	
	
	// Fixed elements -> rarely used in the user code

	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="PROG_TRACE_TBL";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:(4+12*max_prog_traces)-1, data:"BYTE",no_length:true};
	obj1.debug_hide=true;	
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);
	
	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="DIRECT_ASM_CALLS";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:99, data:"BYTE",no_length:true};
	obj1.debug_hide=true;	
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);

	
	obj1=new Object();
	parse.setObjType(obj1,"VAR_REG",ELEM.VAR_REG);   
	obj1.name="MAPPING_TABLE";
	obj1.segm_type=token_types.VAR;
	obj1.visited=true;
	obj1.segm_link={type:token_types.VAR};
	obj1.type={type:ELEM.VAR_ARR,range_start:0,range_end:100, data:"BYTE",no_length:true};
	obj1.debug_hide=true;	
	globals.list[0].list.splice(globals.list[0].list.length,0,obj1);



	
	
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  END   of Parser !!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// find function blocks which are used.
function markVisited(ast)
{
	ast.visited=true;
	
	
}



function findFunctBlock(name)
{
	var i;
	for(i=0;i<globals.list[1].list.length;i++)
	{
		if (globals.list[1].list[i].name==name.toUpperCase())
		{
			return globals.list[1].list[i];
		}
	}
	return null;
}

// checks for collisions between global variables and variables of a function block
function checkFuncBlockNameConflicts()
{
	var i,j;
	var ast=globals;
	for(i=0;i<ast.list[1].list.length;i++)
	{
		for(j=0;j<ast.list[1].list.length;j++)
		{
			if ((i!=j)&&(ast.list[1].list[i].name==ast.list[1].list[j].name))
			{
				stopCompilation("Function block Name collision "+ast.list[1].list[i].name,ast.list[1].list[i]);
			}
		}
	}
}

/*function linkElements(ast)
{
	var i;
	var tasks=findTasks(ast);
	for(i=0;i<tasks.length;i++)
	{
		var task=tasks[i];
		task.visited=true;
		
		var assoc_func_block=findFinctBlock(ast,task.type.name);
		task.link=assoc_func_block;
		if (assoc_func_block.visited==false)
		{
			assoc_func_block.visited=true;
			linkFunctBlock(ast,assoc_func_block)
		}
	}
}*/

// Bits are combined together and mapped into words


function findVarSegmVar(var_segm,var_name)
{
	var i;
	var res;
	if (var_segm.list==undefined)
	{
		if (var_segm.name==var_name)
		{
			return var_segm;
		}
	}
	else
	{
		for(i=0;i<var_segm.list.length;i++)
		{
			res=findVarSegmVar(var_segm.list[i],var_name);
			if (res!=null)
			{
				return res;
			}
		}
	}
	return null;
}


function setVarSize(elem)
{
	var num_elems,name,pointer;
	var segm_type=elem.segm_link.type;
	var simp_type_index;
	
	name=elem.type.data;
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
		// for now input/output variables can only be simple types and not arrays
		if ((segm_type==token_types.VAR_INPUT)||(segm_type==token_types.VAR_OUTPUT))
		{
			stopCompilation("Input or Output variables can not be arrays",elem);
		}
		// array variable
		num_elems=elem.type.range_end-elem.type.range_start+1;
	}
	//elem.offset=offset;
	if ((simp_type_index=isSimpleType(name))!=-1)
	{
		if (pointer==true)
		{
			elem.size=4;
		}
		else
		{
			if ((elem.type.range_end!=undefined)&&(elem.type.no_length!=true))
			{
				var act_block_size=(simpleTypeLinks[simp_type_index].var_size*num_elems)+4;
				var div=(act_block_size/4)|0;
				if ((div*4)!=act_block_size)
				{
					div++;
				}
				elem.size=div*4;
			}
			else
			{
				elem.size=simpleTypeLinks[simp_type_index].var_size*num_elems;
			}
		}
		elem.type.link=simpleTypeLinks[simp_type_index]
	}
	else
	{
		// for now input/output variables can only be simple types
		// InpOut variables can be pointers
		if ((segm_type==token_types.VAR_INPUT)||(segm_type==token_types.VAR_OUTPUT))
		{
			stopCompilation("Input or Output variables can not be data structures",elem);
		}

		
		var block=findFunctBlock(name);
		if (block==null)
		{
			stopCompilation("Function_Block "+name+" undefined",elem);
		}
		elem.type.link=block;
		if (block.calc_start==undefined)
		{
			calcFunctBlockVarSizesAndOffsets(block,0);
		}
		else if ((block.calc_start==true)&&(block.calc_end==false))
		{
			stopCompilation("recursive definition",elem);
		}
			
		if (pointer==true)
		{
			elem.size=4;
		}
		else
		{
			// array block always has 4 byte info element in the beginning - length of the array in number of elements
			// it also is padded with some bytes to keep the size multiple of 4
			if (elem.type.range_end!=undefined)
			{
				var act_block_size=(block.var_size*num_elems)+4;
				var div=(act_block_size/4)|0;
				if ((div*4)!=act_block_size)
				{
					div++;
				}
				elem.size=div*4;
			}
			else
			{
				elem.size=block.var_size*num_elems;
			}
		}
	}
	elem.is_pointer=pointer;
}

// Main program can also be treated as a function block because the list structure for the variables is the same.
function calcFunctBlockVarSizesAndOffsets(functBlock,curr_elem_offset)
{
	var i,j;
	if (functBlock.calc_start!=undefined)
	{
		if ((functBlock.calc_start==true)&&(functBlock.calc_end==false))
		{
			// recursive definition
			stopCompilation("recursive definition",functBlock);
		}
		if ((functBlock.calc_start==true)&&(functBlock.calc_end==true))
		{
			// no need to do anything because sizes/offsets are already calculated
			return;
		}
	}
	functBlock.calc_start=true;
	functBlock.calc_end=false;
	
	for(i=0;i<functBlock.list[0].list.length;i++)
	{
		functBlock.list[0].list[i].link=functBlock;
		setVarSize(functBlock.list[0].list[i]);
		if (((curr_elem_offset%4)!=0)&&(functBlock.list[0].list[i].size>=4))
		{
			curr_elem_offset=(((curr_elem_offset/4)|0)+1)*4;
		}
		else if (((curr_elem_offset%2)!=0)&&(functBlock.list[0].list[i].size>=2))
		{
			curr_elem_offset=(((curr_elem_offset/2)|0)+1)*2;
		}
		functBlock.list[0].list[i].offset=curr_elem_offset;
		curr_elem_offset+=functBlock.list[0].list[i].size;
	}
	
	var aligned_size=(curr_elem_offset/4)|0;
	if ((aligned_size*4)!=curr_elem_offset)
	{
		aligned_size++;
	}
	
	functBlock.var_size=aligned_size*4;
	functBlock.calc_end=true;
}


var RESTRICT=
{
	REQ_RD:0,
	REQ_WR:1,
}


function eliminateUnvisited(type)
{
	var i;
	
	while(1)
	{
		var elim=false;	
		for(i=0;i<globals.list[type].list.length;i++)
		{
			if (globals.list[type].list[i].visited==undefined)
			{
				elim=true;
				globals.list[type].list.splice(i,1);
				break;
			}
		}
		if (elim==false)
		{
			break;
		}
	}
}

var VAR_REF=
{
	LOCAL:0,
	GLOBAL:1,
	POINTER:2, // pointer area is indicated by var_inout
	/*IO_BIT_PTR:4,*/
};

function linkVar(act_funct_block,func_block,elem,pos)
{
	var next_pos;
	
	
	if (elem.list[pos].enum_type==ELEM.EXPR_VAR_OFFSET)
	{
		return;
	}
	
	next_pos=pos+1;
	var var_name;

	var_name=elem.list[pos].data;
/*	if (var_name=="WAIT")
	{
		var jk=1;
	}
	*/
	var var_obj=findVarSegmVar(func_block.list[0],var_name);
	if (pos==0)
	{
		elem.var_ref_type=VAR_REF.LOCAL;
	}
		
	
	if ((var_obj==null)&&(pos==0))
	{
		var_obj=findVarSegmVar(globals.list[0],var_name);
		if (pos==0)
		{
			elem.var_ref_type=VAR_REF.GLOBAL;
		}
	}
	if (var_obj==null)
	{
		stopCompilation("Can't find variable \""+var_name+"\"",elem.list[pos]);
	}
	
	if (
	    ((var_obj.type.link.visited==undefined)||(var_obj.type.link.visited==false))&&
	    (var_obj.type.link.list.length>1)) 
	{
		// link referenced function block
		linkElements(var_obj.type.link,var_obj.type.link);
	}	
	
	if ((pos==0)&&(var_obj.is_pointer==true))
	{
		elem.var_ref_type=VAR_REF.POINTER;
	}
	elem.last_type=var_obj.type;
	elem.list[pos].link=var_obj;
	var_obj.visited=true;
	if (var_obj.type.link!=undefined)
	{
		var_obj.type.link.visited=true;
	}
	
	if ((elem.list.length>(pos+1))&&(elem.list[pos+1].enum_type==ELEM.EXPR_VAR_ARR_IND))
	{
		linkElements(act_funct_block,elem.list[pos+1].list[0]);
		next_pos++;
	}			
	if (elem.list.length>next_pos)
	{
		linkVar(act_funct_block,var_obj.type.link,elem,next_pos);
	}
	
	if (next_pos==(elem.list.length))
	{
		// once all the elements are linked - check if there are no in_out variables after the first one
		var i;
		var ref_elements=[];
		for(i=0;i<elem.list.length;i++)
		{
			if ((elem.list[i].link!=undefined)&&(elem.list[i].link.is_pointer==true))
			{
				ref_elements[i]=true;
			}
		}
		if ((ref_elements[elem.list.length-1]==true)&&(elem.list.length==2)&&(elem.parent_node.list[0]==elem)&&(elem.parent_node.enum_type==ELEM.FUNC_BLOCK_VAR_ASSIGN))
		{
		}
		else
		{
			for(i=1;i<elem.list.length;i++)
			{
				if ((elem.list[i].link!=undefined)&&(elem.list[i].link.is_pointer==true))
				{
					stopCompilation("Can not operate on nested var_inout - they should be used to assign VAR_INOUT function block elements only",elem.list[i]);
				}
			}
		}
	}
	
}



function linkElements(funct_block,elem)
{
	var i;
	switch(elem.enum_type)
	{
		case ELEM.PROGRAM:
		{
			for(i=0;i<globals.list[0].list.length;i++)
			{
				var gvar=globals.list[0].list[i];
				if (gvar.segm_type==token_types.VAR_TASK)
				{
					gvar.visited=true;
					var func_block=findFunctBlock(gvar.type.data);
					gvar.link=func_block;
					if (func_block.visited!=true)
					{
						linkElements(func_block,func_block);
					}
				}
			}
			break;
		}
		case ELEM.TASK:
		case ELEM.FUNCT_BLOCK:
		{
			funct_block.visited=true;
			for(i=0;i<elem.list[0].list.length;i++)
			{
				var var_obj=elem.list[0].list[i];
				if (
					((var_obj.type.link.visited==undefined)||(var_obj.type.link.visited==false))&&(var_obj.type.link.list!=undefined)&&	
					(var_obj.type.link.list.length>1)
					) 
				{
					// link referenced function block
					linkElements(var_obj.type.link,var_obj.type.link);
				}	
			}

			
			for(i=0;i<elem.list[1].list.length;i++)
			{
				linkElements(funct_block,elem.list[1].list[i]);
			}
			break;
		}
		case ELEM.EXPR_VAR:
		{
			linkVar(funct_block,funct_block,elem,0);
			break;	
		}
		case ELEM.FUNC_BLOCK_CALL:
		   // check if elem is part of funct_block variable list
		   // MainTask can treat global variables as its own
		   var i,found;
		   var task_vars=globals.list[0].list;
		   if (funct_block.name.toUpperCase()!="DEFAULT_TASK_1")
		   {
			   task_vars=funct_block.list[0].list;
		   }
		   found=false;
		   for(i=0;i<task_vars.length;i++)
		   {
			   if (task_vars[i].name.toUpperCase()==elem.data.toUpperCase())
			   {
				   found=true;
				   break;
			   }
		   }
		   if (found==false)
		   {
			   stopCompilation("Invoking a function block "+(elem.data) +" without creating an instance of it in "+funct_block.name,elem);
		   }
		   var jk1=1;
		default:
			if (elem.list!=undefined)
			{
				for(i=0;i<elem.list.length;i++)
				{
					linkElements(funct_block,elem.list[i]);
				}
			}
			break;
	}	
}	

var var_calc_hmi=false;

function computeVarSizes(elem)
{
	var i;
	if (elem.enum_type==ELEM.EXPR_VAR)
	{
		var i;
		elem.ref_addr=elem.list[0].link.offset;
		elem.offset_list=[];
		
		var offset_c=0;
		for(i=1;i<elem.list.length;i++)
		{
			if (elem.list[i].enum_type==ELEM.EXPR_VAR)
			{
				offset_c+=elem.list[i].link.offset;
			}
			else if (elem.list[i].enum_type==ELEM.EXPR_VAR_ARR_IND)
			{
				
				computeVarSizes(elem.list[i].list[0]);
				// check after constant tree elimination -> the index is not a constant
				var elem_tree=eliminateConstantTrees(elem.list[i].list[0]);
				var num=elem.list[i].list[0];
				if  ((elem_tree.enum_type==ELEM.CONST)&&(var_calc_hmi==true))
				{
					num=parseInt(elem_tree.data);
					if ((num>elem.list[i-1].link.type.range_end)||(elem<0))
					{
						stopCompilation("Index \""+num+"\" is outside array bounds",elem.list[i-1]);
					}
					offset_c+=4+elem.list[i-1].link.type.link.var_size*(num);
				}
				else
				{
					if (var_calc_hmi==true)
					{
						stopCompilation("can not address vairable array index in HMI",elem.list[i]);
					}
					elem.offset_list[elem.offset_list.length]={offset:offset_c};
					elem.offset_list[elem.offset_list.length]={size:elem.list[i-1].link.type.link.var_size,num:num,max:elem.list[i-1].link.type.range_end};
					offset_c=0;
				}
			}
		}
		if (offset_c!=0)
		{
			elem.offset_list[elem.offset_list.length]={offset:offset_c};
		}
		if (elem.list[0].bit_offset!=undefined)
		{
			elem.offset_list[elem.offset_list.length]={bit_offset:elem.list[0].bit_offset,bit_len:elem.list[0].bit_len};			
		}
		/*if (elem.list[elem.list.length-1].enum_type==ELEM.EXPR_VAR_OFFSET)
		{
			elem.offset_list[elem.offset_list.length]={bit_offset:elem.list[elem.list.length-1].offset,bit_len:elem.list[elem.list.length-1].len};
		}*/
	}
	else
	{
		if (elem.list!=undefined)
		{
			for(i=0;i<elem.list.length;i++)
			{
				computeVarSizes(elem.list[i]);
			}
		}
	}
}


var constant_seg_pos=0;
var var_seg_pos=0;
var constants=[];



function findNumConstant(val)
{
	var i;
	for(i=0;i<constants.length;i++)
	{
		if (constants[i].val==val)
		{
			return constants[i];
		}
	}
	constants[constants.length]={val:val,offset:constant_seg_pos};
	constant_seg_pos+=4;
	return constants[constants.length-1];
}


var prog_start_offset=0;	

function encodeMapSegm(descr_arr)
{
	var i;
	var enc_val=0;
	for(i=0;i<descr_arr.length;i++)
	{
		enc_val<<=8;
		enc_val|=descr_arr[i]&0xff;
	}
	// pad to 4 bytes
	for(;i<4;i++)
	{
		enc_val<<=8;
	}
	return enc_val;
}

var map_data_start;

function compareMappedRangeElements(a,b)
{
	if (a.segm<b.segm)
	{
		return -1;
	}
	if (a.segm>b.segm)
	{
		return 1;
	}
	return 0;
}

var mapped_initializer=[];
var special_seg_addr;

function getSpecialSegAddr()
{
	return special_seg_addr;
}

function allocateGlobalVars()
{
	var i,j;
	var offset=0,curr;
	
	mapped_ranges=[];
	mapped_initializer=[];
	
	for(i=0;i<globals.list[0].list.length;i++)
	{

		if ((globals.list[0].list[i].size>=4)&&((offset%4)!=0))
		{
			var off_div=(offset/4)|0;
			offset=(off_div+1)*4;
		}
		else if ((globals.list[0].list[i].size>=2)&&((offset%2)!=0))
		{
			var off_div=(offset/2)|0;
			offset=(off_div+1)*2;
		}
		
		globals.list[0].list[i].offset=offset;
		
		
		
		if (globals.list[0].list[i].mapping_elem!=undefined)
		{
			if (globals.list[0].list[i].mapping_elem.fixed_path[0]==MAP_VAR.SPECIAL)
			{
				special_seg_addr=offset;
			}
			mapped_ranges[mapped_ranges.length]=
			{
				 segm:encodeMapSegm(globals.list[0].list[i].mapping_elem.fixed_path),
				 dst_long_offset:offset/4,
				 src_long_offset:globals.list[0].list[i].mapping_elem.long_offset,
				 src_byte_len:globals.list[0].list[i].mapping_elem.long_len*4,
			}
		}
		offset+=globals.list[0].list[i].size;
		
	}
	
	var new_mapped_ranges=[];
	// compress mapped ranges
	for(i=0;i<mapped_ranges.length;i++)
	{
		var start_range_ind=i;
		var end_range_ind=i;
		var curr_offset=mapped_ranges[start_range_ind].src_long_offset+mapped_ranges[start_range_ind].src_byte_len;
		for(j=i+1;j<mapped_ranges.length;j++,end_range_ind++)
		{
			if ((mapped_ranges[start_range_ind].segm==mapped_ranges[j].segm)&&(mapped_ranges[j].src_long_offset==curr_offset))
			{
				curr_offset=curr_offset+mapped_ranges[j].src_byte_len;
			}
			else
			{
				break;
			}
			
		}
		new_mapped_ranges[new_mapped_ranges.length]=clone(mapped_ranges[i]);
		new_mapped_ranges[new_mapped_ranges.length-1].src_byte_len=curr_offset-mapped_ranges[start_range_ind].src_long_offset;
		if (start_range_ind!=end_range_ind)
		{
			i=end_range_ind;
		}
	}
	mapped_ranges=clone(new_mapped_ranges);
	mapped_ranges.sort(compareMappedRangeElements);
	
	// segment mapped ranges
	var new_mapped_ranges=[];
	for(i=0;i<mapped_ranges.length;i++)
	{
		var start_range_ind=i;
		var end_range_ind=i;
		var curr_segm=mapped_ranges[start_range_ind].segm;
		for(j=i+1;j<mapped_ranges.length;j++,end_range_ind++)
		{
			if (mapped_ranges[start_range_ind].segm==mapped_ranges[j].segm)
			{
			}
			else
			{
				break;
			}
			
		}
		new_mapped_ranges[new_mapped_ranges.length]={};
		new_mapped_ranges[new_mapped_ranges.length-1].segm=curr_segm;
		new_mapped_ranges[new_mapped_ranges.length-1].elem_arr=[];
		var elem_arr_shortcut=new_mapped_ranges[new_mapped_ranges.length-1].elem_arr;
		for(j=start_range_ind;j<=end_range_ind;j++)
		{
			elem_arr_shortcut[elem_arr_shortcut.length]=clone(mapped_ranges[j]);
		}
		if (start_range_ind!=end_range_ind)
		{
			i=end_range_ind;
		}
	}
	
	curr=0;
	mapped_initializer[curr]=new_mapped_ranges.length;curr++; // element 0->#of unique segments
	for(i=0;i<new_mapped_ranges.length;i++)
	{
		appendNumToArrLE(mapped_initializer,curr,new_mapped_ranges[i].segm,4);curr+=4;
		mapped_initializer[curr]=new_mapped_ranges[i].elem_arr.length;curr++;
		for(j=0;j<new_mapped_ranges[i].elem_arr.length;j++)
		{
			mapped_initializer[curr]=new_mapped_ranges[i].elem_arr[j].dst_long_offset;curr++;
			mapped_initializer[curr]=new_mapped_ranges[i].elem_arr[j].src_long_offset;curr++;
			mapped_initializer[curr]=new_mapped_ranges[i].elem_arr[j].src_byte_len;curr++;
		}
	}
	var map_tbl=findVarElem(globals,"MAPPING_TABLE");
	var prev_size=map_tbl.type.range_end+1;
	map_tbl.type.range_end=mapped_initializer.length-1;
	map_tbl.size=mapped_initializer.length;
	offset-=prev_size;
	offset+=map_tbl.size;
	// create initializer element 
	var mapped_initArrayBuffer=new Uint8Array(mapped_initializer);
	map_tbl.initialize=mapped_initArrayBuffer.buffer;
	GOM.setObjNum("ARGEE_CTRL_IO_MAP_OFFSET",0,map_tbl.offset);
	
	var instr_trace=findVarElem(globals,"INSTR_TRACE_TBL");
	GOM.setObjNum("ARGEE_CTRL_INSTR_TRACE_OFFSET",0,instr_trace.offset);

	var prog_trace=findVarElem(globals,"PROG_TRACE_TBL");
	GOM.setObjNum("PROG_TRACE_TBL_SEG_OFFSET_OBJ",0,prog_trace.offset);
//GOM.setObjNum("PROG_TRACE_TBL_SEG_OFFSET_OBJ",0,0);
	
	
	var dir_asm_calls=findVarElem(globals,"DIRECT_ASM_CALLS");
	GOM.setObjNum("ARGEE_CTRL_DIRECT_ASM_CALL_SEGM_OFFSET",0,dir_asm_calls.offset);
	GOM.setObjNum("ARGEE_CTRL_INTERCYCLE_TIME",0,argee_interscan_delay);

	
	/*constant_seg_pos=offset;
	allocateConstants(globals);*/
	
	// make sure it is 4 byte aligned
	var aligned_offset=(offset/4)|0;
	if ((aligned_offset*4)!=offset)
	{
		aligned_offset++;
	}
	
	

	
	prog_start_offset=aligned_offset*4;
	GOM.setObjNum("ARGEE_CTRL_VAR_SEGM_SIZE",0,prog_start_offset);
}

function getProgStartOffset()
{
	return prog_start_offset;
}

function flattenAndValidateExpressions(ast)
{
	var i;
	if(ast.list==undefined)
	{
		return ast;
	}
	if ((ast.enum_type==ELEM.EXPR)&&(ast.list.length==1))
	{
		return flattenAndValidateExpressions(ast.list[0]);
	}
	else
	{
		for(i=0;i<ast.list.length;i++)
		{
			if ((ast.enum_type==ELEM.EXPR)&&(ast.list[i].enum_type==ELEM.EXPR_VAR))
			{
				if ((ast.list.length>1)&&(ast.list[i].enum_type==ELEM.EXPR_VAR)&&(((ast.list[i].last_type.range_start!=undefined)&&(ast.list[i].list[ast.list[i].list.length-1].enum_type!=ELEM.EXPR_VAR_ARR_IND))||
					(numericTypes.indexOf(ast.list[i].last_type.data)==-1)))
				{
					stopCompilation("Expression element is a pointer or structure",ast.list[i]);
				}
			}
			ast.list[i]=flattenAndValidateExpressions(ast.list[i]);
		}
		return ast;
	}
}

var initializerList=[];
function applyInitializers(dv)
{
	for(i=0;i<initializerList.length;i++)
	{
		switch(initializerList[i].type.link.var_size)
		{
			case 1:
				dv.setUint8(initializerList[i].offset,initializerList[i].val);
				break;
			case 2:
				dv.setUint16(initializerList[i].offset,initializerList[i].val,true);
				break;
			case 4:
				dv.setUint32(initializerList[i].offset,initializerList[i].val,true);
				break;
		}
	}
}

function arraySizeInitialize(ast,init_offset)
{
	var i,j;
	for(i=0;i<ast.list[0].list.length;i++)
	{
		if (ast.list[0].list[i].segm_type==token_types.VAR_INOUT)
		{
			continue;
		}
		
		if ((ast.list[0].list[i].type.range_end!=undefined)&&(ast.list[0].list[i].type.no_length!=true))
		{
			initializerList[initializerList.length]={offset:init_offset+ast.list[0].list[i].offset,
				                                         type:{link:simpleTypeLinks[0]},
														 val:((ast.list[0].list[i].type.range_end+1)*ast.list[0].list[i].type.link.var_size)|((ast.list[0].list[i].type.link.var_size)<<16)};
			if (isSimpleType(ast.list[0].list[i].type.data)==-1)
			{
				// process child elements
				for(j=0;j<ast.list[0].list[i].type.range_end+1;j++)
				{
					arraySizeInitialize(ast.list[0].list[i].type.link,init_offset+ast.list[0].list[i].offset+4+ast.list[0].list[i].type.link.var_size*j);
				}
			}
		}
		else
		{
			if (isSimpleType(ast.list[0].list[i].type.data)==-1)
			{				
				arraySizeInitialize(ast.list[0].list[i].type.link,init_offset+ast.list[0].list[i].offset);				
			}
		}
	}
	
}

function createInitializerList(ast)
{
	var i,j,k;
	initializerList=[];
	arraySizeInitialize(ast,0);
	for(i=0;i<ast.list[0].list.length;i++)
	{
		if (ast.list[0].list[i].type.initialize_data!=undefined)
		{
			// initializers exist:
			for(j=0;j<ast.list[0].list[i].type.initialize_data.length;j++)
			{
				var obj=new Object();
				parse.setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
				obj.data=ast.list[0].list[i].name;
				ast.list[0].list[i].type.initialize_data[j].list[0].list.splice(0,0,obj);
				ast.list[0].list[i].type.initialize_data[j].list[1]=eliminateConstantTrees(ast.list[0].list[i].type.initialize_data[j].list[1]);
				if ((ast.list[0].list[i].type.initialize_data[j].list[1].enum_type!=ELEM.CONST)&&(ast.list[0].list[i].type.initialize_data[j].list[1].enum_type!=ELEM.CONST_STR)&&(ast.list[0].list[i].type.initialize_data[j].list[1].enum_type!=ELEM.CONST_INT)&&(ast.list[0].list[i].type.initialize_data[j].list[1].enum_type!=ELEM.CONST_INT_ARR))
				{
					stopCompilation("Initializer value is not a constant or enumeration",ast.list[0].list[i].type.initialize_data[j].list[1]);
				}
					
				ast.list[0].list[i].type.initialize_data[j].list[0]=eliminateConstantTrees(ast.list[0].list[i].type.initialize_data[j].list[0]);
				linkVar(ast,ast,ast.list[0].list[i].type.initialize_data[j].list[0],0);
				computeVarSizes(ast.list[0].list[i].type.initialize_data[j].list[0]);
				// at this point offset-list should have one element and the second item should be a constant.
				var offset;
				offset=ast.list[0].list[i].type.initialize_data[j].list[0].ref_addr;
				for(k=0;k<ast.list[0].list[i].type.initialize_data[j].list[0].offset_list.length;k++)
				{
					if (ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].offset==undefined)
					{
						if (ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].num.enum_type!=ELEM.CONST)
						{
							stopCompilation("array index in the initializer not a constant",ast.list[0].list[i]);
						}
						var	index=parseInt(ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].num.data);
						if (index>ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].max)
						{
							stopCompilation("array index out of bounds in the initializer",ast.list[0].list[i]);	
						}
						offset+=4+
						          parseInt(ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].num.data)*
						          ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].size;
					}
					else
					{
						offset+=ast.list[0].list[i].type.initialize_data[j].list[0].offset_list[k].offset;
					}
					
				}
				
				if (ast.list[0].list[i].type.initialize_data[j].list[1].enum_type==ELEM.CONST_INT_ARR)
				{
					if ((ast.list[0].list[i].type.initialize_data[j].list[0].last_type.range_end)<(ast.list[0].list[i].type.initialize_data[j].list[1].data.length-1))
					{
						stopCompilation("Initialized array too long", ast.list[0].list[i].type.initialize_data[j].list[0]);
					}
					for(k=0;k<ast.list[0].list[i].type.initialize_data[j].list[1].data.length;k++)
					{
						initializerList[initializerList.length]={offset:4+offset+4*k,
															 type:ast.list[0].list[i].type.initialize_data[j].list[0].last_type,
															 val:ast.list[0].list[i].type.initialize_data[j].list[1].data[k]};
					}
				}
				else if (ast.list[0].list[i].type.initialize_data[j].list[1].enum_type==ELEM.CONST_STR)
				{
					if (ast.list[0].list[i].type.initialize_data[j].list[0].last_type.range_end<(ast.list[0].list[i].type.initialize_data[j].list[1].data.length))
					{
						stopCompilation("Initialized String too long", ast.list[0].list[i].type.initialize_data[j].list[0]);
					}
					for(k=0;k<ast.list[0].list[i].type.initialize_data[j].list[1].data.length;k++)
					{
						initializerList[initializerList.length]={offset:4+offset+k,
															 type:ast.list[0].list[i].type.initialize_data[j].list[0].last_type,
															 val:ast.list[0].list[i].type.initialize_data[j].list[1].data.charCodeAt(k)};
					}
					// null terminate
					initializerList[initializerList.length]={offset:4+offset+k,
															 type:ast.list[0].list[i].type.initialize_data[j].list[0].last_type,
															 val:0};
				}
				else
				{
					var val=parseInt(ast.list[0].list[i].type.initialize_data[j].list[1].data);
					initializerList[initializerList.length]={offset:offset,
															 type:ast.list[0].list[i].type.initialize_data[j].list[0].last_type,
															 val:val};
				}
				
			}
		}
	}
}



/*
function allocateConstants(elem)
{
	var i;
	if (elem.enum_type==ELEM.CONST)
	{
		elem.link=findNumConstant(parseInt(elem.data));
	}
	else
	{
		if (elem.list!=undefined)
		{
			for(i=0;i<elem.list.length;i++)
			{
				allocateConstants(elem.list[i]);
			}
		}
	}
}
*/



return {
	collapseVarSegmLists:collapseVarSegmLists,
	isSimpleType:isSimpleType,
	preProcessEnumsFuncs:preProcessEnumsFuncs,
	eliminateEnumVars:eliminateEnumVars,
	mapped_var_list:mapped_var_list,
	extractAllcomplexVarElements:extractAllcomplexVarElements,
	process:process,
	findVarElem:findVarElem,
	findFunctBlock:findFunctBlock,
	getProcessedAst:getProcessedAst,
	getProgStartOffset:getProgStartOffset,
	VAR_REF:VAR_REF,
	applyInitializers:applyInitializers,
	findBuiltInSpecialFunc:findBuiltInSpecialFunc,
	getSpecialSegAddr:getSpecialSegAddr,
	separateFunctionsAndFunctionBlocks:separateFunctionsAndFunctionBlocks,
	findBuiltInFunc:findBuiltInFunc,
	getEnumVal:getEnumVal,
	getEnumList:getEnumList,
	constructHMI_Map:constructHMI_Map,
	eliminateCommentsInVars:eliminateCommentsInVars,
}
}());

var PROCESS=ARGEE_nst_process;