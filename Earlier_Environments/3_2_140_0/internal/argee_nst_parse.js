/********************************************************************************
 *
 * Copyright (c) 2016 by TUSA
 *
 ********************************************************************************
 *
 *  Initial Author       : Roman Glistvain
 *  Maintainers          : Roman Glistvain
 *
 *
 ********************************************************************************
 *
 *  DESCRIPTION: ARGEE Parser. Tokenizes the ST source code and generates AST
 *               out of it. 
 *
 *******************************************************************************/

 
 var ARGEE_nst_parse=(function()
{ 

var globals;
// for connecting ARGEE view errors to NST compiled errors
var argee_to_nst_line_mapping=[];

function addArgeeLineMapping(str,line)
{
	var arr=JSON.parse(str);
	var vis_elem_type=arr[0];
	var vis_elem_item=arr[1];
	var index=arr[2];
	argee_to_nst_line_mapping[line]={vis_elem_type:vis_elem_type,vis_elem_item:vis_elem_item,index:index};
}

function getNST_Prog_Line_From_ARGEE(item_num)
{
	var i,k;
	for(k in argee_to_nst_line_mapping)
	{
		i=parseInt(k);
		if ((argee_to_nst_line_mapping[i].vis_elem_type==1)&&
		    (argee_to_nst_line_mapping[i].vis_elem_item==item_num))
			{
				return i;
			}
	}
	return -1;
}

function getARGEE_Prog_Line_From_NST(line)
{
	if (argee_to_nst_line_mapping[line]!=undefined)
	{
		if (argee_to_nst_line_mapping[line].vis_elem_type==0)
		{
			var curr_line=line+1;
			while(curr_line<argee_to_nst_line_mapping.length)
			{
				if ((argee_to_nst_line_mapping[curr_line]!=undefined)&&(argee_to_nst_line_mapping[curr_line].vis_elem_type==1))
				{
					break;
				}
				curr_line++;
			}
			if (argee_to_nst_line_mapping[curr_line]==undefined)
			{
				return -1;
			}
			else
			{
				return argee_to_nst_line_mapping[curr_line].vis_elem_item
			}
		}
		return argee_to_nst_line_mapping[line].vis_elem_item
	}
	return -1;
}

function getARGEE_ElemIndexFromARGEE_Line(argee_type,argee_line)
{
	var i,k;
	for(k in argee_to_nst_line_mapping)
	{
		i=parseInt(k);
		if ((argee_to_nst_line_mapping[i].vis_elem_type==argee_type)&&
		    (argee_to_nst_line_mapping[i].vis_elem_item==argee_line))
			{
				return argee_to_nst_line_mapping[i].index;
			}
	}
	return -1;
}



/*var enum_list=[];

function addToEnumList(val)
{
	enum_list[enum_list.length]=val;
}
*/

function getStandaloneCompilerRemappingInfo(line_in_st)
{
   var mapped_argee_elem=argee_to_nst_line_mapping[line_in_st];
   var file_name=mapped_argee_elem.vis_elem_type;
   var line_num=mapped_argee_elem.vis_elem_item;
   return {file_name:file_name,line_num:line_num};
}
      
   

function setErrMsg(e)
{
	var mapped_argee_elem=argee_to_nst_line_mapping[token_start_line];
	if (mapped_argee_elem==undefined)
	{
		mapped_argee_elem=argee_to_nst_line_mapping[token_start_line-1];
	}
	if (mapped_argee_elem!=undefined)
	{
      if (typeof window === 'undefined') 
      {
         // standalone ST compiler
         var file_name=mapped_argee_elem.vis_elem_type;
         var line_num=mapped_argee_elem.vis_elem_item;
         setCompilerMessage(false,true,"Error: "+(e.err_msg)+" File : \""+file_name+"\" Line number:"+line_num);
      }
      else
      {         
         var err_item_index=getARGEE_ElemIndexFromARGEE_Line(mapped_argee_elem.vis_elem_type,mapped_argee_elem.vis_elem_item);
         if (mapped_argee_elem.vis_elem_type==0)
         {
            var elem_descr=DESCR.getVarElemAndLineFromIndex(err_item_index);
            if (elem_descr[1].length>0)
            {
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Variable Definition:  "+(elem_descr[0])+" . "+(elem_descr[1])+"</b>");
            }
            else
            {
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Variable Definition:  "+(elem_descr[0])+"</b>");
            }
         }
         else
         {
            
            var last_part=DESCR.indexToDotString(err_item_index.slice(3));
            var elem=DESCR.getElemFromIndex(err_item_index.slice(0,2));
            var func_block_name;
            if (elem.type==DESCR.block_types.hmi)
            {
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Program</b> HMI element: <b>"+ (last_part)+"</b>");
            }
            else
            {
               func_block_name=DESCR.getElemFromIndex(err_item_index.slice(0,2)).values[0];
               if (func_block_name==default_task_type)
               {
                  func_block_name=default_task_replace_type;
               }
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Program</b> Function Block: <b>"+func_block_name+"</b> element: <b>"+ (last_part)+"</b>");
            }
         }
         DESCR.showErrorLine(err_item_index,mapped_argee_elem.vis_elem_type);
      }

	}
	else
	{
		setCompilerMessage(false,true,"Error: "+(e.err_msg)+" ST Line number:"+token_start_line);
	}
}

var indiv_expr_mode=false;

	
function parseIndivExpression(str,mode)
{
	argee_to_nst_line_mapping=[];
    str=str.replace(/\r\n/g,"\n");
    str=str.replace(/\r/g," ");
	file=str.split("\n");
	enum_list=[];
	curr_char_pos=-1;
	curr_line=0;
	indiv_expr_mode=true;
	tokens_capitalized=mode;
	expr_nesting=0;
	try
	{
		getNextChar();
		getNextToken();
		obj=parseExpression();
		globals=obj;
	}
	catch(e)
	{
		setErrMsg(e);
      if (debug_console==true)
      {
         console.log("Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1));
      }
		tokens_capitalized=true;
		return null;
	}
	tokens_capitalized=true;
	return globals;
}
	

function parse(str,mode)
{
	argee_to_nst_line_mapping=[];
    str=str.replace(/\r\n/g,"\n");
    str=str.replace(/\r/g," ");

	file=str.split("\n");
	enum_list=[];
	curr_char_pos=-1;
	curr_line=0;
	indiv_expr_mode=false;
	tokens_capitalized=mode;
	expr_nesting=0;
   token_start_line=0;
   var_mode_assignment=false;
   const_strings=[];
   const_num=[];

	try
	{
		getNextChar();
		getNextToken();
		obj=parseProgram();
		globals=obj;
	}
	catch(e)
	{
		setErrMsg(e);
      if (debug_console==true)
      {
         console.log("Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1));
      }
		//var res_inner=this.document.getElementById("comp_res_id");
		//res_inner.innerHTML="Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1);
		tokens_capitalized=true;
		return null;
	}
	tokens_capitalized=true;
	return globals;
	//quickPrintAST(globals);
}

var token_types=
{
	COMMA:100+0,
	COLUMN:100+1,
	SEMICOL:100+2,
	LEFT_SQ_BRACKET:100+3,
	RIGHT_SQ_BRACKET:100+4,
	COMMENT_LINE:100+5,
	LEFT_ROUND_BRACKET:100+6,
	RIGHT_ROUND_BRACKET:100+7,
	ASSIGNMENT:100+8,
	PLUS:100+9,
	MINUS:100+10,
	RANGE:100+11,
	DOT:100+12,
	LESS_EQ:100+13,
	NOT_EQ:100+14,
	LESS:100+15,
	BIGGER:100+16,
	BIGGER_OR_EQ:100+17,
	//DIVIDE:100+18,
	MULT:100+19,
	EQ:100+20,

	/*DIV_SYM:100+11,
	MOD_SYM:100+12,
	*/
	

	IDENT:200,
	INT_CONST:201,
	STR_CONST:202,
	FLOAT_CONST:203,
	HEX_CONST:204,
	
	// fixed tokens
	//PROGRAM:300+0,
	//END_PROGRAM:300+1,
	FUNCTION_BLOCK:300+2,
	END_FUNCTION_BLOCK:300+3,
	VAR:300+4,
	END_VAR:300+5,
	VAR_INPUT:300+6,
	VAR_OUTPUT:300+7,
	VAR_INOUT:300+8,
	

	// PLC VARs are defined as regular variables of a type sructure which is initialized at compile time.
	// The special structure defines the PLC variable and its elements
	// PLC variables are: ARGEE_TO_PLC_BIT,ARGEE_TO_PLC_WORD,PLC_TO_ARGEE_BIT,PLC_TO_ARGEE_WORD,
	
	IF:300+10,
	THEN:300+11,
	ELSE:300+12,
	ELSIF:300+13,
	END_IF:300+14,
	WHILE:300+15,
	DO:300+16,
	END_WHILE:300+17,
	ARRAY:300+18,
	OF:300+19,
	AND:300+20,
	OR:300+21,
	NOT:300+22,
	DIV:300+23,
	VAR_TASK:300+24,
	VAR_RETAIN:300+25,
	WAIT_UNTIL:300+26,
	STRING:300+27,
	MOD:300+28,
	FOR_LOOP:300+29,
	END_FOR:300+30,
	TO:300+31,
	CONDITIONAL_EXEC_BEGIN:300+32,
	CONDITIONAL_EXEC_END:300+33,
	// floating point internal tokens
	F_ADD:400+1,
	F_MULT:400+2,
	F_DIV:400+3,
	F_SUB:400+4,
	F_LESS_EQ:     400+13,
	F_NOT_EQ:      400+14,
	F_LESS:        400+15,
	F_BIGGER:      400+16,
	F_BIGGER_OR_EQ:400+17,
	F_MULT:        400+19,
	F_EQ:          400+20,
	//F_NEG:         400+21, // do I need this?
	
	TASK_BEGIN: 500+0,
	END_TASK:500+1,
	
	
	JSON_INPUT:500+2,
	ENUM_BEGIN:600+0,
	ENUM_END:600+1,
	FUNCTION_BLOCK_GROUP_BEGIN:600+2,
	FUNCTION_BLOCK_GROUP_END:600+3,
	MODULE:600+4,
	
	
	HMI_BEGIN:700+0,
	END_HMI:700+1,
	HMI_SCREEN_BEGIN:700+2,
	END_HMI_SCREEN:700+3,
	HMI_SECTION_BEGIN:700+4,
	END_HMI_SECTION:700+5,
	HMI_GRID_SCREEN:700+14,
	END_HMI_GRID_SCREEN:700+15,
	HMI_GRID_ROW:700+16,
	END_HMI_GRID_ROW:700+17,
	HMI_GRID_SECTION:700+18,
	END_HMI_GRID_SECTION:700+19,
	HMI_IMAGE_GROUP:700+20,
	END_HMI_IMAGE_GROUP:700+21,	

	
	COMMENT_BEGIN:800+0,
	COMMENT_END:800+1,
	
	
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  Start of Tokenizer  !!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var keyword_elements=
[

	{elem:token_types.AND,sym:"&"},
	{elem:token_types.OR,sym:"|"},
	{elem:token_types.NOT,sym:"!"},
	{elem:token_types.MOD,sym:"%"},
	{elem:token_types.AND,sym:"AND"},
	{elem:token_types.OR,sym:"OR"},
	{elem:token_types.NOT,sym:"NOT"},
	{elem:token_types.MOD,sym:"MOD"},

	/*{elem:token_types.PROGRAM,sym:"PROGRAM"},
	{elem:token_types.END_PROGRAM,sym:"END_PROGRAM"},*/
	{elem:token_types.FUNCTION_BLOCK,sym:"FUNCTION_BLOCK"},
	{elem:token_types.END_FUNCTION_BLOCK,sym:"END_FUNCTION_BLOCK"},
	{elem:token_types.VAR,sym:"VAR"},
	{elem:token_types.END_VAR,sym:"END_VAR"},
	{elem:token_types.VAR_INPUT,sym:"VAR_INPUT"},
	{elem:token_types.VAR_OUTPUT,sym:"VAR_OUTPUT"},
	{elem:token_types.VAR_INOUT,sym:"VAR_INOUT"},
	{elem:token_types.VAR_TASK,sym:"VAR_TASK"},
	{elem:token_types.VAR_RETAIN,sym:"VAR_RETAIN"},
	{elem:token_types.IF,sym:"IF"},
	{elem:token_types.THEN,sym:"THEN"},
	{elem:token_types.ELSE,sym:"ELSE"},
	{elem:token_types.ELSIF,sym:"ELSIF"},
	{elem:token_types.END_IF,sym:"END_IF"},
	{elem:token_types.WHILE,sym:"WHILE"},
	{elem:token_types.DO,sym:"DO"},
	{elem:token_types.END_WHILE,sym:"END_WHILE"},
	{elem:token_types.ARRAY,sym:"ARRAY"},
	{elem:token_types.OF,sym:"OF"},
	{elem:token_types.WAIT_UNTIL,sym:"WAIT_UNTIL"},
	{elem:token_types.STRING,sym:"STRING"},
// all other token symbols	
	{elem:token_types.COMMA,sym:","},
	{elem:token_types.COLUMN,sym:":"},
	{elem:token_types.SEMICOL,sym:";"},
	{elem:token_types.LEFT_SQ_BRACKET,sym:"["},
	{elem:token_types.RIGHT_SQ_BRACKET,sym:"]"},
	{elem:token_types.COMMENT_LINE,sym:"//"},
	{elem:token_types.LEFT_ROUND_BRACKET,sym:"("},
	{elem:token_types.RIGHT_ROUND_BRACKET,sym:")"},
	{elem:token_types.ASSIGNMENT,sym:":="},
	{elem:token_types.IDENT,sym:"Identifier"},
	{elem:token_types.INT_CONST,sym:"Integer Constant"},
	{elem:token_types.STR_CONST,sym:"String Constant"},
	{elem:token_types.FLOAT_CONST,sym:"Real Constant"},
	
	

	
	
	{elem:token_types.PLUS,sym:"+"},
	{elem:token_types.MINUS,sym:"-"},
	{elem:token_types.DIV,sym:"/"},
	{elem:token_types.DIV,sym:"DIV"},
	{elem:token_types.MULT,sym:"*"},
	{elem:token_types.EQ,sym:"="},
	{elem:token_types.LESS_EQ,sym:"<="},
	{elem:token_types.NOT_EQ,sym:"<>"},
	{elem:token_types.LESS,sym:"<"},
	{elem:token_types.BIGGER,sym:">"},
	{elem:token_types.BIGGER_OR_EQ,sym:">="},

	{elem:token_types.F_ADD,sym:" _f+"},
	{elem:token_types.F_SUB,sym:" _f-"},
	{elem:token_types.F_DIV,sym:" _f/"},
	{elem:token_types.F_MULT,sym:" _f*"},
	{elem:token_types.F_EQ,sym:" _f="},
	{elem:token_types.F_LESS_EQ,sym:" _f<="},
	{elem:token_types.F_NOT_EQ,sym:" _f<>"},
	{elem:token_types.F_LESS,sym:" _f<"},
	{elem:token_types.F_BIGGER,sym:" _f>"},
	{elem:token_types.F_BIGGER_OR_EQ,sym:" _f>="},

	{elem:token_types.JSON_INPUT,sym:"JSON_INPUT"},
	{elem:token_types.ENUM_BEGIN,sym:"ENUM"},
	{elem:token_types.ENUM_END,sym:"END_ENUM"},

	{elem:token_types.FUNCTION_BLOCK_GROUP_BEGIN,sym:"FUNCTION_BLOCK_GROUP"},
	{elem:token_types.FUNCTION_BLOCK_GROUP_END,sym:"END_FUNCTION_BLOCK_GROUP"},
	{elem:token_types.MODULE,sym:"LIBRARY"},
	{elem:token_types.MODULE,sym:"MODULE"},

	
	{elem:token_types.TASK_BEGIN,sym:"TASK"},
	{elem:token_types.END_TASK,sym:"END_TASK"},

	{elem:token_types.HMI_BEGIN,sym:"HMI_BEGIN"},
	{elem:token_types.END_HMI,sym:"END_HMI"},
	{elem:token_types.HMI_SCREEN_BEGIN,sym:"HMI_SCREEN"},
	{elem:token_types.END_HMI_SCREEN,sym:"END_HMI_SCREEN"},
	{elem:token_types.HMI_SECTION_BEGIN,sym:"HMI_SECTION"},
	{elem:token_types.END_HMI_SECTION,sym:"END_HMI_SECTION"},
	
	
	{elem:token_types.HMI_GRID_SCREEN,sym:"HMI_GRID_SCREEN"},
	{elem:token_types.END_HMI_GRID_SCREEN,sym:"END_HMI_GRID_SCREEN"},
	{elem:token_types.HMI_GRID_ROW,sym:"HMI_GRID_ROW"},
	{elem:token_types.END_HMI_GRID_ROW,sym:"END_HMI_GRID_ROW"},
	{elem:token_types.HMI_GRID_SECTION,sym:"HMI_GRID_SECTION"},
	{elem:token_types.END_HMI_GRID_SECTION,sym:"END_HMI_GRID_SECTION"},
	{elem:token_types.HMI_IMAGE_GROUP,sym:"HMI_IMAGE_GROUP"},
	{elem:token_types.END_HMI_IMAGE_GROUP,sym:"END_HMI_IMAGE_GROUP"},
	
	
	{elem:token_types.COMMENT_BEGIN,sym:"COMMENT_BEGIN"},
	{elem:token_types.COMMENT_END,sym:"COMMENT_END"},
	{elem:token_types.FOR_LOOP,sym:"FOR"},
	{elem:token_types.END_FOR,sym:"END_FOR"},
	{elem:token_types.TO,sym:"TO"},

	
	
	
	{elem:token_types.CONDITIONAL_EXEC_BEGIN,sym:"CONDITIONAL_EXEC_BEGIN"},
	{elem:token_types.CONDITIONAL_EXEC_END,sym:"CONDITIONAL_EXEC_END"},
	
];

function findKeywordIndex(str)
{
	var i;
	for(i=0;i<keyword_elements.length;i++)
	{
		if (str.toUpperCase()==keyword_elements[i].sym)
		{
			return i;
		}
	}
	return -1;
}

function getOpName(op)
{
	var i;
	for(i=0;i<keyword_elements.length;i++)
	{
		if (keyword_elements[i].elem==op)
		{
			return keyword_elements[i].sym+ " ";
		}
	}
}


var next_char;
var next_token;
var next_token_suppliment;



var file=[];
var curr_char_pos;
var curr_line;

/*var exceptions=
{
	END_OF_FILE:-1,
	INVALID_TOKEN:1,
	ERROR:2,
	NOT_YET:3,
};
*/


function UserException(err_msg)
{
	this.err_msg=err_msg;
}

function getTokenStartLine()
{
	return token_start_line;
}

function stopCompilation(err_msg,elem)
{
	if (elem!=undefined)
	{
		token_start_line=elem.line_num;
	}
	/*else
	{
		token_start_line--;
	}*/
	throw new UserException(err_msg);
}

var save_curr_line;
var save_curr_char_pos;

function saveParsePoint()
{
	save_curr_line=curr_line;
	save_curr_char_pos=curr_char_pos;
}

function restoreParsePoint()
{
	curr_line=save_curr_line;
	curr_char_pos=save_curr_char_pos;
}

// Ideas for the tokenizer and parser are taken from https://github.com/dincho/mini-pascal-compiler/commits/master
function getNextChar(pass_eol)
{
	if ((curr_char_pos+1)>file[curr_line].length)
	{
		curr_line++;
		curr_char_pos=0;
	}
	else
	{
		curr_char_pos++;
	}
	if (curr_char_pos>=file[curr_line].length)
	{
		// mark end of line with space
		if (curr_line==(file.length-1))
		{
			
			next_char=-1;
			return;
			//stopCompilation(exceptions.END_OF_FILE);
		}
		else if (pass_eol!=undefined)
		{
			next_char='\n';
			return;
		}
		next_char=' ';
		return;
	}
	if (curr_line>=file.length)
	{
		next_char=-1;
		return;
		//stopCompilation(exceptions.END_OF_FILE);
	}
	next_char=file[curr_line].charAt(curr_char_pos);
}

function lookupNextSameLine()
{
	if ((curr_char_pos+1)>=file[curr_line].length)
	{
		return ' ';
	}
	else
	{
		return file[curr_line].charAt(curr_char_pos+1);
	}
}

var token_start_line=0;

var tokens_capitalized=true;
function setParseCapitalization(mode)
{
	tokens_capitalized=mode;
}

function parseIdentOrKeyword()
{
	var token_string="";
	var ind;
	
	while(1)
	{
		if (((next_char>='a')&&(next_char<='z'))||
	        ((next_char>='A')&&(next_char<='Z'))||
			((next_char>='0')&&(next_char<='9'))||
			(next_char=='_')
			)
		{
			
			token_string+=next_char;
			getNextChar();
		}
		else
		{
			break;
		}
	}
	if (tokens_capitalized==true)
	{
		token_string=token_string.toUpperCase();
	}
	if ((ind=findKeywordIndex(token_string))==-1)
	{
		next_token=token_types.IDENT;
		next_token_suppliment=token_string;
	}
	else
	{
		next_token=keyword_elements[ind].elem;
	}
}

function parseFloatOrInt()
{
	var state=0;
	var stop=false;
	var save_token_str;
	var num_start=curr_char_pos;
    var token_string=""; 
	var prev_char="";
	var pos_cnt=0;
	
	while(stop==false)
	{
		switch(state)
		{
			case 0:
				// whole number
				if ((next_char>='0')&&(next_char<='9'))
				{
					prev_char=next_char;
					saveParsePoint();
					getNextChar();
					pos_cnt++;
				}
				else if (next_char=='x')
				{
					if ((pos_cnt==1)&&(prev_char=='0'))
					{
						saveParsePoint();
						getNextChar();
						state=16;
						break;
					}
					else
					{
						stop=true;
						break;
					}
				}
				else if (next_char=='.')
				{
					
					save_token_str=token_string;
					getNextChar();
					if ((next_char>='0')&&(next_char<='9'))
					{
						saveParsePoint();
						getNextChar();
					}
					else
					{
						stop=true;
						break;
					}
					state=1;
					break;
				}
				else
				{
					stop=true;
					break;
				}
				break;
			case 1:
			    // decimal
				if ((next_char>='0')&&(next_char<='9'))
				{
					saveParsePoint();
					getNextChar();
				}
				else if (next_char=='e')
				{
					getNextChar();
					if ((next_char=='+')||(next_char=='-'))
					{
						getNextChar();
					}
					else if ((next_char>='0')&&(next_char<='9'))
					{
						saveParsePoint();
						getNextChar();
					}
					else
					{
						stop=true;
						break;
					}
					state=2;
					break;
				}
				else
				{
					stop=true;
					break;
				}
				break;
			case 2:
				if ((next_char>='0')&&(next_char<='9'))
				{
					saveParsePoint();
					getNextChar();
				}
				else
				{
					stop=true;
					break;
				}
				break;
			case 16:
				if (((next_char>='0')&&(next_char<='9'))||
				    ((next_char>='A')&&(next_char<='F'))||	
					((next_char>='a')&&(next_char<='f')))
				{
					saveParsePoint();
					getNextChar();
				}
				else
				{
					stop=true;
					break;
				}
		}
	}
	restoreParsePoint();
	token_string="";
	for(i=num_start;i<=curr_char_pos;i++)
	{
		token_string+=file[curr_line].charAt(i);
	}
	getNextChar();
	if (state==0)
	{
		next_token=token_types.INT_CONST;
	}
	else if (state==16)
	{
		var num=parseInt(token_string,16);
		next_token=token_types.HEX_CONST;
		token_string=num.toString();
	}
	else
	{
		next_token=token_types.FLOAT_CONST;
	}
	next_token_suppliment=token_string;
}

/*function parseNumber()
{
	var token_string="";
	var fp=false;
	while(1)
	{
		if ((next_char>='0')&&(next_char<='9'))
		{
			token_string+=next_char;
			getNextChar();
		}
		else if (next_char=='.')
		{
			fp=true;
			token_string+=next_char;
			getNextChar();
		}
		else if (next_char=='e')
		{
			fp=true;
			token_string+=next_char;
			getNextChar();
			// add +,- or char
			token_string+=next_char;
			getNextChar();
		}
		else
		{
			break;
		}
	}
	if (fp==true)
	{
		next_token=token_types.FLOAT_CONST;
	}
	else
	{	
		next_token=token_types.INT_CONST;
	}
	next_token_suppliment=token_string;
}*/	


function parseString(multi_line)
{
	var token_string="";
	var pass_eol=undefined;
	if (multi_line==true)
	{
		pass_eol=true;
	}
	getNextChar(pass_eol);
	var start_str_line=curr_line;
	while(1)
	{
		if ((start_str_line!=curr_line)&&(multi_line==false))
		{
			stopCompilation("Can not have multi-line strings");
		}
		if (next_char=='\\')
		{
			getNextChar(pass_eol);
			token_string+='\\';
			token_string+=next_char;
		}
		else if (next_char=='\"')
		{
			getNextChar(pass_eol);
			break;
		}
		else
		{
			token_string+=next_char;
		}
		getNextChar(pass_eol);
	}
	next_token=token_types.STR_CONST;
	next_token_suppliment=token_string;
}

var token_start_line;
var token_start_pos;
var token_real_start_line;
var token_real_start_pos;

function getNextToken()
{
	token_start_line=curr_line;
	token_start_pos=curr_char_pos;
	while(1)
	{
		if ((next_char!=' ')&&(next_char!='\t'))
		{
			break;
		}
		getNextChar();
	}
	if (next_char==-1)
	{
		// end of file
		next_token=-1;
		return;
	}
	token_real_start_line=curr_line;
	token_real_start_pos=curr_char_pos;
	if (next_char=='/')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;


		getNextChar();
		if (next_char=='/')
		{
			// skip the rest of the line
			curr_line++;
			curr_char_pos=0;
			next_char=file[curr_line].charAt(curr_char_pos);
			getNextToken();
		}
		else
		{
			next_token=token_types.DIV;
		}
		return;
	}
	if (next_char=='{')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		getNextChar();
		next_token_suppliment="";
		while (next_char!='}')
		{
			next_token_suppliment+=next_char;
			getNextChar();
		}
		getNextChar();
		addArgeeLineMapping(next_token_suppliment,curr_line);
		getNextToken();
		return;
	}
	if (next_char=='(')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		getNextChar();
		if (next_char=='*')
		{
			// comment skipping mode;
			while(1)
			{
				getNextChar();
				if ((next_char=='*')&&(lookupNextSameLine()==')'))
				{
					getNextChar();
					getNextChar();
					break;
				}
			}
			// comment skipped
			getNextToken();
		}
		else
		{
			next_token=token_types.LEFT_ROUND_BRACKET;
		}
		return;
	}
	else if (((next_char>='a')&&(next_char<='z'))||
	    ((next_char>='A')&&(next_char<='Z'))
		/*||(next_char='_')*/)
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;
		

		parseIdentOrKeyword();
		return;
	}
	else if ((next_char>='0')&&(next_char<='9'))
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		parseFloatOrInt();
		return;
	}
	else if (next_char=='\"')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		parseString(false);
		return;
	}
	else if (next_char==':')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be : or :=
		getNextChar();
		if (next_char!='=')
		{
			next_token=token_types.COLUMN;
		}
		else
		{
			next_token=token_types.ASSIGNMENT;
			getNextChar();
		}
		return;
	}
	else if (next_char=='.')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be . or ..
		getNextChar();
		if (next_char!='.')
		{
			next_token=token_types.DOT;
		}
		else
		{
			next_token=token_types.RANGE;
			getNextChar();
		}
		return;
	}
	else if (next_char=='<')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be < or <= or <>
		getNextChar();
		if (next_char=='=')
		{
			next_token=token_types.LESS_EQ;
			getNextChar();
		}
		else if (next_char=='>')
		{
			next_token=token_types.NOT_EQ;	
			getNextChar();
		}
		else
		{
			next_token=token_types.LESS;
		}
		return;
	}		
	else if (next_char=='>')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be > or >=
		getNextChar();
		if (next_char=='=')
		{
			next_token=token_types.BIGGER_OR_EQ;
			getNextChar();
		}
		else
		{
			next_token=token_types.BIGGER;
		}
		return;
	}		
	else
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		switch(next_char)
		{
			case '&':next_token=token_types.AND; break;
			case '|':next_token=token_types.OR; break;
			case '!':next_token=token_types.NOT; break;
			case '%':next_token=token_types.MOD; break;


		
			case '+':next_token=token_types.PLUS; break;
			case '-':next_token=token_types.MINUS; break;
			//case '/':next_token=token_types.DIV; break;
			case '*':next_token=token_types.MULT; break;
			case ';':next_token=token_types.SEMICOL; break;
			case ',':next_token=token_types.COMMA; break;
			case '=':next_token=token_types.EQ; break;
			//case '(':next_token=token_types.LEFT_ROUND_BRACKET; break;
			case ')':next_token=token_types.RIGHT_ROUND_BRACKET; break;
			case '[':next_token=token_types.LEFT_SQ_BRACKET; break;
			case ']':next_token=token_types.RIGHT_SQ_BRACKET; break;
			// default: run function which throws and exception
		}
		getNextChar();
		return;
	}
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  End of Tokenizer  !!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  Start of Parser !!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/*
	   <expression>		::=	 <AND_expression> 
	   <AND_expression>     ::= <OR_expression> { AND <OR_expression>}
	   <OR_expression>     ::= <REL_expression> { OR <REL_expression>}
	   <REL_expression>		::=	 <simple_expression> |
	                             <simple_expression> <relation operator> <simple_expression>
       <simple_expression>	::=	<sign><term> { <operator plus><term> }
       <term>			::=	<factor> { <operator multiply><factor> }
       <factor>			::=	<variable>
       					| <constant>
       					| ( <expression> )
       					| NOT <factor>
       <relation operator>		::=	= | <> | < | <= | >= | >
       <sign>			::=	+ | - | <empty>
       <operator plus>		::=	+ | - 
       <operator multiply>	::=	* | DIV 
       <variable>		::=	<simple variable>
       					| <index variable>
       <index variable>		::=	<variable array> 	[ <expression> ]
       <variable array>		::=	<simple variable>
       <simple variable>	::=	<identifier of variable>
       <identifier of variable>	::=	<identifier>
*/


var ELEM=
{
	EXPR:0,
	CONST:1,
	EXPR_VAR:2,
	EXPR_IDENT:3,
	EXPR_VAR_ARR_IND:4,
	FUNC:5,
	FUNC_ARGS:6,
	FUNCT_BLOCK:7,
	FUNC_BLOCK_CALL:8,
	OP:9,
	PROGRAM:10,
	FUCT_BLOCK_LIST:13,
	VAR_SEGM:14,
	STATEMENT_LIST:15,
	IF:16,
	WHILE:17,
	VAR_REG:18,
	VAR_ARR:19,
	ASSIGN:20,
	FUNC_BLOCK_NAME:21,
	FUNC_BLOCK_ARG_LIST:22,
	FUNC_BLOCK_VAR_ASSIGN:23,
	VAR_SEGM_LIST:24,
	EXPR_VAR_OFFSET:25,
	WAIT_UNTIL:26,
	ELEM_PREEMPTION_POINT:27,
	ELEM_RETURN:28,
	ELEM_FUNC_BLOCK_PROLOGUE:29,
	ELEM_CONTEXT_SWITCH:30,
	CONST_STR:31,
	TO_FLOAT:32,
	TO_INT:33,
	CONST_INT:34,
	FUNC_NO_RETURN:35,
	TASK:36,
	ENUM_ELEM:37,
	ENUM_OBJ:38,
	HMI:39,
	HMI_SCREEN:40,
	HMI_SECTION:41,
	COMMENT:42,
	TRACE:43,
	LADDER_TRACE:44,
	FUNCTION_BLOCK_GROUP:45,
	LADDER_COMMENT:46,
	COMMENT_BLOCK:47,
	COMMENT_VAR:48,
	CONST_INT_ARR:49,
	FOR_LOOP:50,
	LADDER_FUNC_BLOCK_CALL:51,

	HMI_GRID_SCREEN:56,
	HMI_GRID_ROW:57,
	HMI_GRID_SECTION:58,
	HMI_IMAGE_GROUP:58,
	MODULE:59,
	
}

function setObjType(obj,str,enm,dont_reset_line_counter)
{
	obj.str_type=str;
	obj.enum_type=enm;
	if (dont_reset_line_counter!=true)
	{
		obj.line_num=token_start_line;
	}
}

function extractExpression(pos_arr)
{
	var i,j;
	var str="";
	var in_comment=false; 
	for(i=pos_arr[0];i<=pos_arr[2];i++)
	{
		var start_str_pos=0;
		var end_str_pos=file[i].length;
		if (i==pos_arr[0])
		{
			start_str_pos=pos_arr[1];
			if (pos_arr[0]==pos_arr[2])
			{
				end_str_pos=pos_arr[3];
			}
		}
		else if (i==pos_arr[2])
		{
			end_str_pos=pos_arr[3];
		}
		in_comment=false;
		for(j=start_str_pos;j<end_str_pos;j++)
		{
			if (file[i].charAt(j)=='{')
			{
				in_comment=true;
			}
			else if (in_comment==false)
			{
				str+=file[i].charAt(j);
			}
			else if (file[i].charAt(j)=='}')
			{
				in_comment=false;
			}
		}
		if (i<pos_arr[2])
		{
			str+="\r\n";
		}
	}
	return str;
	//console.log(str);
}
var expr_nesting=0;
function parseExpression()
{
	var expr;
	var obj=new Object();
	var start_expr_line=token_start_line;
	var start_expr_pos=token_start_pos;
	expr_nesting++;
	expr=parseAND_Expression();
	/*if (
	     (next_token==token_types.EQ)||
		 (next_token==token_types.NOT_EQ)||
		 (next_token==token_types.LESS)||
		 (next_token==token_types.LESS_EQ)||
		 (next_token==token_types.BIGGER)||
		 (next_token==token_types.BIGGER_OR_EQ)
	   )
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		obj.list[0]=expr;
		obj.list[1]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token},
		getNextToken();
		expr=parseSimpleExpression();
		obj.list[2]=expr;
		obj.elem_pos_in_text=[start_expr_line,start_expr_pos,token_real_start_line,token_real_start_pos];
		obj.elem_string=extractExpression(obj.elem_pos_in_text);
		obj.expr_nesting=expr_nesting;
		expr_nesting--;
		return obj;
		
	}
	else*/
	{
		expr.elem_pos_in_text=[start_expr_line,start_expr_pos,token_real_start_line,token_real_start_pos];
		if (expr.elem_pos_in_text[0]!=expr.elem_pos_in_text[2])
		{
			var jk=1;
		}
      if ((expr.list!=undefined)&&(expr.list.length==1)&&(expr.list[0].const_type!=undefined)&&
         (expr.list[0].const_type==CONST_TYPE.STR))
      {
            expr.elem_string=expr.list[0].const_val;
      }
      else
      {
         expr.elem_string=extractExpression(expr.elem_pos_in_text);
      }
		expr.expr_nesting=expr_nesting;
		expr_nesting--;
		return expr;
	}
}

function parseAND_Expression()
{
	var obj=new Object();
	var i;
	var or_expr=parseOR_Expression();
	if (next_token==token_types.AND)
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=or_expr;i++
		while (next_token==token_types.AND)
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			or_expr=parseOR_Expression();
			obj.list[i]=or_expr;i++;
		}
		return obj;
	}
	else
	{
		return or_expr;
	}
}

function parseOR_Expression()
{
	var obj=new Object();
	var i;
	var rel_expr=parseREL_Expression();
	if (next_token==token_types.OR)
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=rel_expr;i++
		while (next_token==token_types.OR)
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			rel_expr=parseREL_Expression();
			obj.list[i]=rel_expr;i++;
		}
		return obj;
	}
	else
	{
		return rel_expr;
	}
}


function parseREL_Expression()
{
	var obj=new Object();
	var i;
	var rel_expr=parseSimpleExpression();
	if (
		 (next_token==token_types.EQ)||
		 (next_token==token_types.NOT_EQ)||
		 (next_token==token_types.LESS)||
		 (next_token==token_types.LESS_EQ)||
		 (next_token==token_types.BIGGER)||
		 (next_token==token_types.BIGGER_OR_EQ)
	   )
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=rel_expr;i++
		obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
		getNextToken();	
		rel_expr=parseSimpleExpression();
		obj.list[i]=rel_expr;i++;
		return obj;
	}
	else
	{
		return rel_expr;
	}
}


function parseSimpleExpression()
{
	var obj=new Object();
	var term;
	var compound=false;
	var i;
	
	if ((next_token==token_types.PLUS)||(next_token==token_types.MINUS)||(next_token==token_types.NOT))
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[0]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
		compound=true;
		getNextToken();	
	}
	term=parseTerm();
	if ((next_token==token_types.PLUS)||(next_token==token_types.MINUS))
	{
		if (compound==false)
		{
			setObjType(obj,"EXPR",ELEM.EXPR);
			obj.list=[];
			i=0;
		}
		obj.list[i]=term;i++
		
		while ((next_token==token_types.PLUS)||(next_token==token_types.MINUS))
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			term=parseTerm();
			obj.list[i]=term;i++;
		}
		return obj;
	}
	else
	{
		if (compound==false)
		{
			return term;
		}
		else
		{
			obj.list[i]=term;i++
			return obj;
		}
	}
}

function parseTerm()
{
	var obj=new Object();
	var i;
	var factor;
	factor=parseFactor();
	if ((next_token==token_types.MULT)||(next_token==token_types.DIV)||(next_token==token_types.MOD))
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=factor;i++;
		
		while ((next_token==token_types.MULT)||(next_token==token_types.DIV)||(next_token==token_types.MOD))
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			factor=parseFactor();
			obj.list[i]=factor;i++;
		}
		return obj;
	}
	else
	{
		return factor;
	}
}



function parseFactor()
{
	var obj=new Object();
	var i;
	if (next_token==token_types.IDENT)
	{
		var v=parseVariableOrFunction(null,false,true);
		/*obj.type="variable or function";
		obj.data=v;*/
		return v;
	}
	if (next_token==token_types.STR_CONST)
	{
		var v=parseConstStrVar();
		return v;	
	}
	if (next_token==token_types.FLOAT_CONST)
	{
		var v=parseConstFloatVar();
		return v;	
	}
    
	if ((next_token==token_types.INT_CONST)||(next_token==token_types.HEX_CONST))
	{
		// Handle ...
		setObjType(obj,"CONST",ELEM.CONST);
		obj.data=next_token_suppliment;

		if (next_token==token_types.HEX_CONST)
		{
			obj.hex=true;
		}
		getNextToken();	
		return obj;
	}
	if ((next_token==token_types.MINUS)||(next_token==token_types.PLUS))
    {
        setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		obj.list[0]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};
		getNextToken();	
        obj.list[1]=parseFactor();
        return obj;
    }
	if (next_token==token_types.LEFT_ROUND_BRACKET)
	{
		var expr;
		getNextToken();	
		expr=parseExpression();
		/*obj.type="nested expression";
		obj.data=expr;
		match(token_types.RIGHT_ROUND_BRACKET);
		return obj;
		*/
		match(token_types.RIGHT_ROUND_BRACKET);
		return expr;
	}
	if (next_token==token_types.NOT)
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
		getNextToken();	
		obj.list[i]=parseFactor();
		return obj;
	}
	else
	{
		if (next_token==token_types.RIGHT_ROUND_BRACKET)
		{
			stopCompilation("Empty expression is not allowed");
		}
		else
		{
			stopCompilation("Invalid token '"+getOpName(next_token)+"'");
		}
	}
}

function getConstStringName(str)
{
	var i;
	for(i=0;i<const_strings.length;i++)
	{
		if (const_strings[i].val==str)
		{
			return const_strings[i].name;
		}
	}
	var len=const_strings.length;
	const_strings[len]={name:"___CONST_STR_"+len,val:str};
	return const_strings[len].name;
}	


var var_mode_assignment=false;
var CONST_TYPE=
{
	STR:0,
	NUM:1,
};

function parseConstStrVar()
{
	var obj=new Object();
	var i;
	setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
	obj.list=[];
	i=0;
	var obj1=new Object();
	if (var_mode_assignment==true)
	{
		setObjType(obj1,"CONST_STR",ELEM.CONST_STR);
		obj1.data=next_token_suppliment;
		getNextToken();	
		return obj1;
	}
	else
	{
		var obj1=new Object();
		setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
		obj1.data=getConstStringName(next_token_suppliment);
		obj1.const_type=CONST_TYPE.STR;
		obj1.const_val="\""+next_token_suppliment+"\"";
		obj1.const_elem=true;
		obj.list[i]=obj1;
		
		
		getNextToken();	
	}
	return obj;
}


function getConstFloatName(str)
{
	var arr=new ArrayBuffer(4);
	var dt=new DataView(arr);
	dt.setFloat32(0,parseFloat(str),true);
	var num=dt.getUint32(0,true);
	
	for(i=0;i<const_num.length;i++)
	{
		if (const_num[i].val==num)
		{
			return const_num[i].name;
		}
	}
	var len=const_num.length;
	const_num[len]={name:"___CONST_NUM_"+len,val:num};
	return const_num[len].name;
	
}

function parseConstFloatVar()
{
	var obj=new Object();
	var i;
	setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
	obj.list=[];
	i=0;
	var obj1=new Object();
	if (var_mode_assignment==true)
	{
		stopCompilation("Can not have statically assigned floating point variables");
	}
	else
	{
		var obj1=new Object();
		setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
		obj1.data=getConstFloatName(next_token_suppliment);
		obj1.const_type=CONST_TYPE.NUM;
		obj1.const_val=next_token_suppliment;
		obj1.const_elem=true;
		obj.list[i]=obj1;
		getNextToken();	
	}
	return obj;
}


function createConstElem(val,isFloat)
{
	var obj=new Object();
	setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
	i=0;
	var obj1=new Object();
	
	if (isFloat==true)
	{
		obj.list=[];

		var obj1=new Object();
		setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
		obj1.data=getConstFloatName(val);
		obj.list[i]=obj1;
	}
	else
	{
		setObjType(obj,"CONST",ELEM.CONST);
		obj.data=val;
	}
	return obj;
}


function parseVarPart()
{
	var obj=new Object();
	var i;
	setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
	obj.list=[];
	i=0;
	while(1)
	{
		if (next_token==token_types.IDENT)
		{
			var obj1=new Object();
			setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
			obj1.data=next_token_suppliment;
			obj.list[i]=obj1;
			getNextToken();	
			i++;
		}
		else if (next_token==token_types.INT_CONST)
		{
			var obj1=new Object();
			// only one element after the dot -> bit position
			setObjType(obj1,"EXPR_VAR_OFFSET",ELEM.EXPR_VAR_OFFSET);
			obj.list[i]=obj1;
			if ((i!=1)&&(indiv_expr_mode==false))
			{
				stopCompilation("variable offset can only be applied to non/array mapped variables");
			}
			i++;
			
			obj1.offset=parseInt(next_token_suppliment);
			obj1.len=1;
			getNextToken();
			/*if (next_token==token_types.DOT)
			{
				getNextToken();
				if (next_token==token_types.INT_CONST)
				{
					obj1.len=parseInt(next_token_suppliment);
				}
				else
				{
					stopCompilation("Not an integer constant: "+next_token_suppliment);
				}
				getNextToken();
				break;
			}*/
			
			if (indiv_expr_mode==true)
			{
				// multiple "."s are possible
				continue;
			}

			break;
		}
		else if (next_token==token_types.FLOAT_CONST)
		{
			var obj1=new Object();
			var split_arr=next_token_suppliment.split(".");
			// 2 elements -> bit and len are both present
			setObjType(obj1,"EXPR_VAR_OFFSET",ELEM.EXPR_VAR_OFFSET);
			obj.list[i]=obj1;
			if ((i!=1)&&(indiv_expr_mode==false))
			{
				stopCompilation("variable offset can only be applied to non/array mapped variables");
			}
			i++;
			
			obj1.offset=parseInt(split_arr[0]);
			obj1.len=parseInt(split_arr[1]);
			getNextToken();
			if (indiv_expr_mode==true)
			{
				// multiple "."s are possible
				continue;
			}
			break;
		}
		else if (next_token==token_types.LEFT_SQ_BRACKET)
		{
			getNextToken();	
			var obj1=new Object();
			setObjType(obj1,"EXPR_VAR_ARR_IND",ELEM.EXPR_VAR_ARR_IND);
			obj1.list=[];
			obj1.list[0]=parseExpression();
			obj.list[i]=obj1;
			match(token_types.RIGHT_SQ_BRACKET);
			i++;
		}
		else if (next_token==token_types.DOT)
		{
			getNextToken();
		}
		else
		{			
			break;
		}
		
	}
	//obj=ARGEE_nst_process.postProcessVar(obj);
	/*if (obj.list.length==1)
	{
		return obj.list[0];
	}*/
	return obj;
}


function parseVariableOrFunction(var_part1,statement,no_arg_count_check)
{
	var obj=new Object();
	var var_part;
	if (var_part1==null)
	{
		var_part=parseVarPart();
	}
	else
	{
		var_part=var_part1;
	}
	if (next_token==token_types.LEFT_ROUND_BRACKET)
	{
		// built in function
		if ((var_part.list!=undefined)&&(var_part.list.length>1))
		{
			// function calls always start with a simple ident -> not array or structure
			stopCompilation("invalid function name");
		}
		if (statement==true)
		{
			setObjType(obj,"FUNC_NO_RETURN",ELEM.FUNC_NO_RETURN); // functions always have arguments -> they don't work on global variables - always on inputs			
		}
		else
		{
			setObjType(obj,"FUNC",ELEM.FUNC); // functions always have arguments -> they don't work on global variables - always on inputs
		}
		getNextToken();
		obj.data=var_part.list[0].data;
		/*obj.func_descr=findBuiltInFunc(obj.data);
		if (obj.ret_type=="REAL")
		{
			obj.fp=true;
		}
		if (obj.func_descr==null)
		{
			stopCompilation("unknown function");
		}*/
		obj.list=[];

		var obj1=new Object();
		setObjType(obj1,"FUNC_ARGS",ELEM.FUNC_ARGS);
		obj1.list=[];
		var expr=parseExpression();
		var i=0;
		obj1.list[i]=expr;i++;
		while(next_token==token_types.COMMA)
		{
			getNextToken();
			expr=parseExpression();
			obj1.list[i]=expr;i++;
		}
		match(token_types.RIGHT_ROUND_BRACKET);
		//obj.list[0]=obj1;
		obj.list=obj1.list;
		/*if ((obj.list.length>4)&&(no_arg_count_check==false))
		{
			// can't pass more than 4 arguments for now
			stopCompilation("Can not pass more than 4 parameters to a function");
		}*/
		return obj;
	}
	else
	{
		return var_part;
	}
}


function match(tok)
{
	if (next_token!=tok)
	{
		//stopCompilation("'"+getOpName(tok)+"' is missing");
		stopCompilation("Invalid token'"+getOpName(next_token)+"'");
	}
	getNextToken();	
}

var const_strings=[];
var const_num=[];

function getConstElems()
{
	return [const_num,const_strings];
}

function skipHMI_Comments()
{
   while(next_token==token_types.COMMENT_BEGIN)
   {
      while(next_token!=token_types.COMMENT_END)
      {
         getNextToken();
      }
      getNextToken();
   }
}

function parseProgram()
{
	var i,j;
	var obj=new Object();
	var obj_globals=new Object();
	var obj_funct_blocks=new Object();
	var obj_enum_blocks=new Object();
	obj.list=[];
	const_strings=[];
	const_num=[];
	setObjType(obj,"PROGRAM",ELEM.PROGRAM);
	setObjType(obj_globals,"VAR_SEGM_LIST",ELEM.VAR_SEGM_LIST);
	setObjType(obj_funct_blocks,"FUCT_BLOCK_LIST",ELEM.FUCT_BLOCK_LIST);
	obj_globals.list=[];
	obj_funct_blocks.list=[];
	obj.list=[obj_globals,obj_funct_blocks];
	i=0;
	j=0;
	while(1)
	{
		if ((next_token==token_types.VAR)||
		   (next_token==token_types.VAR_TASK))
		{
			var segm_type=next_token;
			obj_globals.list[j]=parseVarSegm(true);j++;
		}
		else if (next_token==token_types.FUNCTION_BLOCK)
		{
			getNextToken();
			obj_funct_blocks.list[i]=parseFunctionBlock(false);i++;
		}
		else if (next_token==token_types.TASK_BEGIN)
		{
			getNextToken();
			obj_funct_blocks.list[i]=parseFunctionBlock(true);
			obj_funct_blocks.list[i].task_function_block=true;
			i++;
		}
		else if (next_token==token_types.FUNCTION_BLOCK_GROUP_BEGIN)
		{
			getNextToken();
			obj_funct_blocks.list[i]=parseFunctionBlockGroup();i++;
		}
		else if (next_token==token_types.MODULE)
		{
			getNextToken();
			obj_funct_blocks.list[i]=parseModule();i++;
		}
		else if (next_token==token_types.ENUM_BEGIN)
		{
			var obj_enum=new Object();
			setObjType(obj_enum,"ENUM_OBJ",ELEM.ENUM_OBJ);
			obj_enum.list=[];
			var first_time=true;
			while (next_token!=token_types.ENUM_END)
			{
				if (first_time==true)
				{
					getNextToken();
					first_time=false;
				}
				if (next_token==token_types.COMMA)
				{
					getNextToken();
					continue;
				}
				if (next_token!=token_types.IDENT)
				{
					stopCompilation("Invalid enumeration definition");
				}
				//addToEnumList(next_token_suppliment);
				var enum_elem=new Object();
				setObjType(enum_elem,"ENUM_ELEM",ELEM.ENUM_ELEM);
				enum_elem.name=clone(next_token_suppliment);
				obj_enum.list[obj_enum.list.length]=enum_elem;
				getNextToken();
				if (next_token==token_types.COLUMN)
				{
					getNextToken();
					if ((next_token!=token_types.INT_CONST)&&(next_token!=token_types.HEX_CONST))
					{
						stopCompilation("Invalid enumeration definition");
					}
					enum_elem.const_val=next_token_suppliment;
					if (next_token==token_types.HEX_CONST)
					{
						enum_elem.hex=true;
					}
					getNextToken();
				}
				else if (next_token==token_types.LEFT_ROUND_BRACKET)
				{
					if (enum_elem.name.toUpperCase()!="COMMENT")
					{
						stopCompilation("invalid function in enumeration list",enum_elem);
					}
					setObjType(enum_elem,"COMMENT_VAR",ELEM.COMMENT_VAR);
					delete enum_elem.name;
					parseString(true);
					enum_elem.data=next_token_suppliment;
					match(token_types.STR_CONST);
					match(token_types.COMMA);
					enum_elem.comment_type=num(next_token_suppliment);
					getNextToken();
					match(token_types.RIGHT_ROUND_BRACKET);
					if (next_token==token_types.SEMICOL)
					{
						getNextToken();
						continue;
					}
					else
					{
						stopCompilation("invalid function in enumeration list",enum_elem);
					}
				}
				if (next_token==token_types.ENUM_END)
				{
					getNextToken();
					break;
				}
			}
			obj_funct_blocks.list[i]=obj_enum;i++;
			
		}
		else if (next_token==token_types.HMI_BEGIN)
		{
			var obj_hmi=new Object();
			setObjType(obj_hmi,"HMI",ELEM.HMI);
			obj_hmi.list=[];
			var_mode_assignment=true;
			getNextToken();
         skipHMI_Comments();
			while (next_token!=token_types.END_HMI)
			{
				var screen;
				screen=undefined;
            skipHMI_Comments();
				if (next_token==token_types.HMI_SCREEN_BEGIN)
				{
					screen=new Object();
					setObjType(screen,"HMI_SCREEN",ELEM.HMI_SCREEN);
					getNextToken(); // switch to name
					screen.name=clone(next_token_suppliment);
					screen.list=[];
					getNextToken();
					
					while(next_token!=token_types.END_HMI_SCREEN)
					{
						var section;
                  skipHMI_Comments();
						if ((next_token==token_types.IDENT)&&(next_token_suppliment.toUpperCase()=="COMMENT"))
						{
							section=parseVariableOrFunction(null,true,true);
							if (next_token!=token_types.SEMICOL)
							{
								stopCompilation("Invalid token in HMI definition");
							}
							screen.list[screen.list.length]=section;							
							getNextToken(); 
							continue;
						}
                  skipHMI_Comments();
						if (next_token!=token_types.HMI_SECTION_BEGIN)
						{
							stopCompilation("Invalid token in HMI definition");
						}
						section=new Object();
						setObjType(section,"HMI_SECTION",ELEM.HMI_SECTION);
						getNextToken(); // switch to name
						section.name=clone(next_token_suppliment);
						section.list=[];
						getNextToken(); 
						var real_elements=0;
						while (next_token!=token_types.END_HMI_SECTION)
						{
                     skipHMI_Comments();
                     var obj_func=parseVariableOrFunction(null,true,true);
                     section.list[section.list.length]=obj_func;
                     match(token_types.SEMICOL);
                     real_elements++;
                     skipHMI_Comments();
						}
						getNextToken(); 
                  skipHMI_Comments();
						screen.list[screen.list.length]=section;
						if (real_elements==0)
						{
							stopCompilation("Empty sections are not allowed",section);
						}
					}
					if (screen.list.length==0)
					{
						stopCompilation("Empty screens are not allowed",screen);
					}
				}
				else if (next_token==token_types.HMI_IMAGE_GROUP)
				{
					hmi_image_group=new Object();
					setObjType(hmi_image_group,"HMI_IMAGE_GROUP",ELEM.HMI_IMAGE_GROUP);

					if (obj_hmi.images==undefined)
					{
						obj_hmi.images=[];
					}
					getNextToken();
               skipHMI_Comments();
					while (next_token!=token_types.END_HMI_IMAGE_GROUP)
					{
                  skipHMI_Comments();
						var obj_func=parseVariableOrFunction(null,true,true);
						obj_hmi.images[obj_hmi.images.length]=obj_func;
						match(token_types.SEMICOL);
                  skipHMI_Comments();
					}
					if (obj_hmi.images.length==0)
					{
						stopCompilation("no images in the HMI IMAGE GROUP ",hmi_image_group);
					}
				}
				else if (next_token==token_types.HMI_GRID_SCREEN)
				{
					screen=new Object();
					setObjType(screen,"HMI_GRID_SCREEN",ELEM.HMI_GRID_SCREEN);
					getNextToken(); // switch to name
					skipHMI_Comments();
					screen.expr=parseExpression();
					if (screen.expr.elem_string.charAt(0)==' ')
					{
						screen.expr.elem_string=screen.expr.elem_string.slice(1);
					}
					screen.list=[];
					match(token_types.SEMICOL);
					skipHMI_Comments();
					while(next_token!=token_types.END_HMI_GRID_SCREEN)
					{
						var row;
						
						if ((next_token==token_types.IDENT)&&(next_token_suppliment.toUpperCase()=="COMMENT"))
						{
							row=parseVariableOrFunction(null,true,true);
							if (next_token!=token_types.SEMICOL)
							{
								stopCompilation("Invalid token in HMI definition");
							}
							screen.list[screen.list.length]=row;							
							getNextToken(); 
							continue;
						}
						skipHMI_Comments();
						
						if (next_token!=token_types.HMI_GRID_ROW)
						{
							stopCompilation("Invalid token in HMI definition");
						}
						row=new Object();
						setObjType(row,"HMI_GRID_ROW",ELEM.HMI_GRID_ROW);
						getNextToken(); // switch to name
						if (next_token==token_types.SEMICOL)
						{
							getNextToken(); // switch to name
						}
						else
						{
							row.expr=parseExpression();
							match(token_types.SEMICOL);
						}						
						skipHMI_Comments();
						row.list=[];
						while(next_token!=token_types.END_HMI_GRID_ROW)
						{
							var section;
							
							if ((next_token==token_types.IDENT)&&(next_token_suppliment.toUpperCase()=="COMMENT"))
							{
								section=parseVariableOrFunction(null,true,true);
								if (next_token!=token_types.SEMICOL)
								{
									stopCompilation("Invalid token in HMI definition");
								}
								row.list[row.list.length]=section;							
								getNextToken(); 
								continue;
							}
							skipHMI_Comments();
							if (next_token!=token_types.HMI_GRID_SECTION)
							{
								stopCompilation("Invalid token in HMI definition");
							}
							section=new Object();
							setObjType(section,"HMI_GRID_SECTION",ELEM.HMI_GRID_SECTION);
							getNextToken(); // switch to name
							section.expr=parseExpression();
							if (section.expr.elem_string.charAt(0)==' ')
							{
								section.expr.elem_string=section.expr.elem_string.slice(1);
							}

							match(token_types.SEMICOL);
                     skipHMI_Comments();
							section.list=[];
							while (next_token!=token_types.END_HMI_GRID_SECTION)
							{
                        skipHMI_Comments();
								var obj_func=parseExpression();//parseVariableOrFunction(null,true,true);
								setObjType(obj_func,"FUNC_NO_RETURN",ELEM.FUNC_NO_RETURN); // force func_no_return
								section.list[section.list.length]=obj_func;
								match(token_types.SEMICOL);
                        skipHMI_Comments();
							}
							row.list[row.list.length]=section;
							getNextToken(); 
                     skipHMI_Comments();
						}
						if (row.list.length==0)
						{
							stopCompilation("Empty rows are not allowed",row);
						}

						
						getNextToken(); 
                  skipHMI_Comments();
						screen.list[screen.list.length]=row;
					}
					
					
					if (screen.list.length==0)
					{
						stopCompilation("Empty screens are not allowed",screen);
					}
					
				}
				else if ((next_token==token_types.IDENT)&&(next_token_suppliment.toUpperCase()=="COMMENT"))
				{
					screen=parseVariableOrFunction(null,true,true);
					if (next_token!=token_types.SEMICOL)
					{
						stopCompilation("Invalid token in HMI definition");
					}
				}
				else
				{
					stopCompilation("Invalid token in HMI definition");
				}	
				getNextToken();
				if (screen!=undefined)
				{
					obj_hmi.list[obj_hmi.list.length]=screen;
				}
            skipHMI_Comments();
			}
			var_mode_assignment=false;
			obj.hmi=obj_hmi;
			getNextToken(); 
		}
		
		else if (next_token==-1)
		{
			break;
		}
		else
		{
			stopCompilation("Invalid token in the program (not a variable or function block)");
		}
	}
	return obj;
}


function parseVarSegments()
{
	var obj=new Object();
	var i;
	setObjType(obj,"VAR_SEGM_LIST",ELEM.VAR_SEGM_LIST);
	obj.list=[];
	obj.type=null;
	i=0;
	while((next_token==token_types.VAR_INPUT)||
		(next_token==token_types.VAR_OUTPUT)||
		(next_token==token_types.VAR_INOUT)||
		(next_token==token_types.VAR)||
		(next_token==token_types.VAR_TASK)||
		(next_token==token_types.VAR_RETAIN))
	{
		obj.list[i]=parseVarSegm(false);i++;		
	}
	/*if (obj.list.length==1)
	{
		return obj.list[0];
	}*/
	return obj;
}

function parseFunctionBlockGroup()
{
	var obj=new Object();
	var i;
	if (next_token==token_types.IDENT)
	{
		setObjType(obj,"FUNCTION_BLOCK_GROUP",ELEM.FUNCTION_BLOCK_GROUP);
		obj.name=next_token_suppliment;
		getNextToken();	
	}
	else
	{
		stopCompilation("Identifier expected");
	}
	obj.list=[];
	obj.list[0]=parseVarSegments();
	obj.list[1]=parseStatements(true,true);
	
	if (next_token!=token_types.FUNCTION_BLOCK_GROUP_END)
	{
		stopCompilation("Invalid token");
	}
	getNextToken();	
	return obj;
}

function parseModule()
{
	var obj=new Object();
	var i;
	match(token_types.LEFT_ROUND_BRACKET);
	if (next_token!=token_types.STR_CONST)
	{
		stopCompilation("string expected");
	}
	setObjType(obj,"MODULE",ELEM.MODULE);
	obj.name=next_token_suppliment;
	getNextToken();	
	match(token_types.COMMA);
	if (next_token!=token_types.STR_CONST)
	{
		stopCompilation("string expected");
	}
	obj.version=next_token_suppliment;
	getNextToken();	
	match(token_types.RIGHT_ROUND_BRACKET);
	match(token_types.SEMICOL);
	return obj;
}



function parseFunctionBlock(isTask)
{
	var obj=new Object();
	var obj1=new Object();
	var i;
	if (next_token==token_types.IDENT)
	{
		if (isTask==true)
		{
			setObjType(obj,"TASK",ELEM.TASK);
		}
		else
		{
			setObjType(obj,"FUNCT_BLOCK",ELEM.FUNCT_BLOCK);
		}
			
		obj.name=next_token_suppliment;
		getNextToken();	
		match(token_types.LEFT_ROUND_BRACKET);
	}
	else
	{
		stopCompilation("Identifier expected");
	}
	obj.list=[];
	var obj1=new Object();
	setObjType(obj1,"FUNC_ARGS",ELEM.FUNC_ARGS);
	obj1.list=[];
	while(next_token==token_types.IDENT)
	{
		obj1.list[obj1.list.length]=next_token_suppliment;
		getNextToken();	
		if (next_token==token_types.COMMA)
		{
			getNextToken();
		}
		else
		{
			break;
		}
	}
	match(token_types.RIGHT_ROUND_BRACKET);
	obj.arg_list=obj1;
		
	obj.list[0]=parseVarSegments();
	
	
	if (((isTask==false)&&(next_token!=token_types.END_FUNCTION_BLOCK))||
	   ((isTask==true)&&(next_token!=token_types.END_TASK)))
	{
		obj.list[1]=parseStatements(true,true);
	}
	else if (((isTask==false)&&(next_token==token_types.END_FUNCTION_BLOCK))||
	   ((isTask==true)&&(next_token==token_types.END_TASK)))
	   {
	   }
	else
	{
		stopCompilation("Invalid token");
	}
	if (((isTask==false)&&(next_token==token_types.END_FUNCTION_BLOCK))||
	   ((isTask==true)&&(next_token==token_types.END_TASK)))
	{
		if ((isTask==true)&&(obj.list.length<2))
		{
			// create an empty wrapper for the code of the task
			//stopCompilation("Task without code");
			obj.list[1]=createDummyTask();
			var jk=1;
		}
	}
	else
	{
		stopCompilation("Invalid token");
	}
	getNextToken();
	if (obj.list.length==1)
	{
		obj.UDT=true;
	}
	return obj;
}


function parseVarSegm(global)
{
	var i,j;
	var obj=new Object();
	var obj1;
	setObjType(obj,"VAR_SEGM",ELEM.VAR_SEGM);
	i=0;
	obj.list=[];
	obj.type=next_token;
	if (obj.type==token_types.VAR_INOUT)
	{
		obj.type=token_types.VAR_INPUT;
	}
	getNextToken();	
	while(next_token!=token_types.END_VAR)
	{
		var start=i;
		obj1=new Object();
		setObjType(obj1,"VAR_REG",ELEM.VAR_REG);
		if (next_token==token_types.IDENT)
		{
			obj1.name=next_token_suppliment;
			// var identifier
			getNextToken();	
		}
		else
		{
			stopCompilation("Invalid variable name",obj1);
		}
		if (next_token==token_types.LEFT_ROUND_BRACKET)
		{
			// comment
			if (next_token_suppliment.toUpperCase()!="COMMENT")
			{
				stopCompilation("Non comment function in variable segment",obj1);
			}
			setObjType(obj1,"COMMENT_VAR",ELEM.COMMENT_VAR);
			parseString(true);
			obj1.data=next_token_suppliment;
			match(token_types.STR_CONST);
			match(token_types.COMMA);
			obj1.comment_type=num(next_token_suppliment);
			getNextToken();
			match(token_types.RIGHT_ROUND_BRACKET);
			match(token_types.SEMICOL);
			obj.list[i]=obj1;
			i++;
			continue;
		}
		obj.list[i]=obj1;
		while (next_token==token_types.COMMA)
		{
			obj1=new Object();
			getNextToken();	
			if (next_token!=token_types.IDENT)
			{
				stopCompilation("Identifier expected");
			}
			i++;
			setObjType(obj1,"VAR_REG",ELEM.VAR_REG);
			obj1.name=next_token_suppliment;
			obj.list[i]=obj1;
			getNextToken();
		}
		i++;
		match(token_types.COLUMN);
		var obj2=parseVarType(global,obj.type);
		
		if (global==true)
		{
			// could be followed by the initialization value
			
		}
		
		for(j=start;j<i;j++)
		{
			obj.list[j].type=clone(obj2);
			obj.list[j].segm_link=obj;
			if (obj2.type!=ELEM.VAR_REG)
			{
				setObjType(obj.list[j],"VAR_ARR",ELEM.VAR_ARR);
			}
			if (global==true)
			{
				
			}
		}
		match(token_types.SEMICOL);
	}
	getNextToken();	
	return obj;
}


function parseVarType(global,segm_type)
{
	var act_obj_type={};
	if (next_token==token_types.IDENT)
	{
		// simple type
		var name=next_token_suppliment;
		getNextToken();
		if (name.toUpperCase().localeCompare("CHAR")==0)
		{
			stopCompilation("Size of the string is not defined!");
		}
		act_obj_type={type:ELEM.VAR_REG,data:name};
	}
	else if (next_token==token_types.STRING)
	{
		getNextToken();
		if ((next_token!=token_types.LEFT_ROUND_BRACKET))
		{
			if (segm_type!=token_types.VAR_INOUT)
			{
				stopCompilation("string pointers can only be used in VAR_IN_OUT");
			}
			act_obj_type={type:ELEM.VAR_ARR,range_start:0,range_end:0,data:"CHAR"};
		}
		else
		{
			match(token_types.LEFT_ROUND_BRACKET);
			if (next_token!=token_types.INT_CONST)
			{
				stopCompilation("Invalid integer size of string");
			}
			var str_size=parseInt(next_token_suppliment);
			getNextToken();
			match(token_types.RIGHT_ROUND_BRACKET);
			// generate an array definition (array of char)
			act_obj_type={type:ELEM.VAR_ARR,range_start:0,range_end:str_size,data:"CHAR"};
		}
	}
	else if (next_token==token_types.ARRAY)
	{
		match(token_types.ARRAY);
		match(token_types.LEFT_SQ_BRACKET);
		var range_start,range_end;
		var type_arr;
		if (next_token==token_types.INT_CONST)
		{
		    range_start=parseInt(next_token_suppliment);
			if (range_start!=0)
			{
				stopCompilation("Array range should always start with element 0");
			}
		}
		getNextToken();
		match(token_types.RANGE);
		if (next_token==token_types.INT_CONST)
		{
			range_end=parseInt(next_token_suppliment);
		}
		getNextToken();
		match(token_types.RIGHT_SQ_BRACKET);
		match(token_types.OF);
		if (next_token==token_types.IDENT)
		{
			type_arr=next_token_suppliment;
		}
		getNextToken();
		act_obj_type={type:ELEM.VAR_ARR,range_start:range_start,range_end:range_end,data:type_arr};
	}
	else
	{
		stopCompilation("Expect Identifier or Array");
	}
	
	if ((next_token==token_types.IDENT)&&(next_token_suppliment.toUpperCase()=="AT"))
	{
		
	}
	else
	{
		// check if we are dealing with a bit type -> if so -> stop
		if (act_obj_type.data.toUpperCase()=="BIT")
		{
			stopCompilation("BIT data type should be mapped to IO");
		}
	}
		
	
	// next element can be either mapping or initialization. mapped elements can not be initialized statically
	if ((next_token==token_types.IDENT)&&(next_token_suppliment.toUpperCase()=="AT"))
	{
		if (global==false)
		{
			stopCompilation("Mapped variables should be global");
		}
		
		
		getNextToken();
		act_obj_type.mapped_elem=parseVarPart();
		if (act_obj_type.mapped_elem.list.length==0)
		{
			stopCompilation("Alias destination not specified");
		}
/*
		var offset_list=[];
		var curr_offset=0;
		offset_list[curr_offset]=next_token_suppliment;curr_offset++;
		getNextToken();
		while(next_token==token_types.COLUMN)
		{
			getNextToken();
			offset_list[curr_offset]=next_token_suppliment;curr_offset++;
			getNextToken();
		}
		act_obj_type.mapped_elem=offset_list;*/
	}
	else if (next_token==token_types.ASSIGNMENT)
	{
		
		if (global==false)
		{
			stopCompilation("Static assignments can only be done to global variables");
		}
		getNextToken();
		act_obj_type.initialize_data=[];
		var curr_init_elem=0;
		if (act_obj_type.data=="REAL")
		{
			stopCompilation("Can not statically assign floating point variables");
		}
		if (((act_obj_type.type==ELEM.VAR_ARR)&&(act_obj_type.data=="CHAR"))||
		   ((act_obj_type.type==ELEM.VAR_REG)&&(ARGEE_nst_process.isSimpleType(act_obj_type.data)>=0)))
		{
			
			var obj=new Object();
			setObjType(obj,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
			obj.list=[];
			var obj1;
			var_mode_assignment=true; // hack for handling strings without generating new global variables
			var obj1=parseExpression();
			var_mode_assignment=false;				
			var obj2=new Object();
			setObjType(obj2,"EXPR_VAR",ELEM.EXPR_VAR);
			obj2.list=[]
			obj.list[0]=obj2;
			obj.list[1]=obj1;
			act_obj_type.initialize_data[0]=obj;
		}
		else if (next_token==token_types.LEFT_ROUND_BRACKET)
		{
			// list of assignment statements
			getNextToken();
			while(1)
			{
				var obj=new Object();
				setObjType(obj,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
				obj.list=[];
				obj.list[0]=parseVarPart();
				
				match(token_types.ASSIGNMENT);
				var_mode_assignment=true; // hack for handling strings without generating new global variables
				obj.list[1]=parseExpression();
				var_mode_assignment=false;
				act_obj_type.initialize_data[curr_init_elem]=obj;curr_init_elem++;
				if (next_token==token_types.COMMA)
				{
					getNextToken();
					continue;
				}
				if (next_token==token_types.RIGHT_ROUND_BRACKET)
				{
					getNextToken();
					break;
				}
			}
		}
		else
		{
			stopCompilation("Invalid assignment "+next_token);
		}
	}
	return act_obj_type;
	
}

function createDummyTask()
{
	var obj=new Object();
	var obj1;
	setObjType(obj,"STATEMENT_LIST",ELEM.STATEMENT_LIST);
	obj.list=[];
	var i=0;
	// this is a function block -> inject header
	obj1=new Object();
	setObjType(obj1,"ELEM_FUNC_BLOCK_PROLOGUE",ELEM.ELEM_FUNC_BLOCK_PROLOGUE);
	obj.list[i]=obj1;i++;
	obj1=new Object();
	setObjType(obj1,"ELEM_PREEMPTION_POINT",ELEM.ELEM_PREEMPTION_POINT);
	obj.list[i]=obj1;i++;
	obj1=new Object();
	setObjType(obj1,"ELEM_RETURN",ELEM.ELEM_RETURN);
	obj.list[i]=obj1;i++;
	return obj;
}

// we only support assignment, function block call, IF, WHILE,
// type specifies the statement block we are expecting (and the "end identifier")
function parseStatements(inject_preemption,inject_return)
{
	var obj=new Object();
	var obj1;
	setObjType(obj,"STATEMENT_LIST",ELEM.STATEMENT_LIST);
	obj.list=[];
	var i=0;
	if (inject_return==true)
	{
		// this is a function block -> inject header
		obj1=new Object();
		setObjType(obj1,"ELEM_FUNC_BLOCK_PROLOGUE",ELEM.ELEM_FUNC_BLOCK_PROLOGUE);
		obj.list[i]=obj1;i++;
	}
	if (inject_preemption==true)
	{
		obj1=new Object();
		setObjType(obj1,"ELEM_PREEMPTION_POINT",ELEM.ELEM_PREEMPTION_POINT);
		obj.list[i]=obj1;i++;
	}
	
	while(1)
	{
		
		if (next_token==token_types.IDENT)
		{
			var var_elem=parseVarPart();
			// could be function block or assignment;
			
			if (next_token==token_types.ASSIGNMENT)
			{
				obj1=new Object();
				setObjType(obj1,"ASSIGN",ELEM.ASSIGN);
				obj1.list=[];
				obj1.list[0]=var_elem;
				getNextToken();	
				obj1.list[1]=parseExpression();
				match(token_types.SEMICOL);
				obj.list[i]=obj1;
			}
			else if (next_token==token_types.LEFT_ROUND_BRACKET)
			{
				if (var_elem.list[0].data.toUpperCase()=="COMMENT")
				{
					obj1=new Object();
					setObjType(obj1,"COMMENT",ELEM.COMMENT);
					parseString(true);
					obj1.data=next_token_suppliment;
					match(token_types.STR_CONST);
					match(token_types.RIGHT_ROUND_BRACKET);
					match(token_types.SEMICOL);
					obj.list[i]=obj1;
				}
				else if (var_elem.list[0].data.toUpperCase()=="LADDER_COMMENT")
				{
					obj1=new Object();
					setObjType(obj1,"LADDER_COMMENT",ELEM.LADDER_COMMENT);
					parseString(true);
					obj1.data=next_token_suppliment;
					match(token_types.STR_CONST);
					match(token_types.RIGHT_ROUND_BRACKET);
					match(token_types.SEMICOL);
					obj.list[i]=obj1;
				}
				
				else if ((var_elem.list[0].data.toUpperCase()=="TRACE")||
				         (var_elem.list[0].data.toUpperCase()=="LADDER_TRACE"))    
				{
					var elem_type;
					var elem_str_type;
					if (var_elem.list[0].data.toUpperCase()=="TRACE")
					{
						elem_type=ELEM.TRACE;
						elem_str_type="TRACE";
					}
					else
					{
						elem_type=ELEM.LADDER_TRACE;
						elem_str_type="LADDER_TRACE";
					}
					obj1=new Object();
					setObjType(obj1,elem_str_type,elem_type);
					parseString(true);
					obj1.data=next_token_suppliment;
					match(token_types.STR_CONST);
					match(token_types.COMMA);
					obj1.list=[];
					obj1.list[0]=parseExpression();
					var obj2=new Object();
					setObjType(obj2,"CONST",ELEM.CONST);
					obj2.data=token_start_line;
					obj1.list[1]=obj2;
					match(token_types.RIGHT_ROUND_BRACKET);
					match(token_types.SEMICOL);
					obj.list[i]=obj1;
				}
				else
				{
				
				// this could be a function call or function_block call
					obj1=new Object();
					setObjType(obj1,"FUNC_NO_RETURN",ELEM.FUNC_NO_RETURN);
					var j=0;
					obj1.list=[];
					obj1.list[0]=var_elem;
					var obj2=new Object();
					setObjType(obj2,"FUNC_ARGS",ELEM.FUNC_ARGS);
					getNextToken();	
					obj2.list=[];
					if (next_token!=token_types.RIGHT_ROUND_BRACKET)
					{
						while(1)
						{
							obj2.list[j]=parseAssignFunctBlockCall();
							j++;
								
							if (next_token!=token_types.COMMA)
							{
								break;
							}
							getNextToken();	
						}
					}
					
					obj1.data=var_elem.list[0].data;
					obj1.func_ptr=var_elem;
					obj1.list=obj2.list;
					/*{
						var m=0;
						var str="";
						for(m=0;m<var_elem.list.length;m++)
						{
							if (m>0)
							{
								str+=".";
							}
							str+=var_elem.list[m].data;
						}
						obj1.data=str;
						obj1.list=obj2.list;
					}*/
					obj.list[i]=obj1;
					match(token_types.RIGHT_ROUND_BRACKET);
					match(token_types.SEMICOL);
				}
			}
			else
			{
				stopCompilation("Invalid token in operation");
			}
		}
		else if (next_token==token_types.CONDITIONAL_EXEC_BEGIN)
		{	
			obj1=new Object();
			setObjType(obj1,"LADDER_FUNC_BLOCK_CALL",ELEM.LADDER_FUNC_BLOCK_CALL);
			obj1.list=[];
			getNextToken();	
			obj1.list[0]=parseStatements(true,false);
			match(token_types.CONDITIONAL_EXEC_END);
			obj.list[i]=obj1;
		}

		else if (next_token==token_types.WAIT_UNTIL)
		{
			obj1=new Object();
			setObjType(obj1,"WAIT_UNTIL",ELEM.WAIT_UNTIL);
			obj1.list=[];
			getNextToken();
			match(token_types.LEFT_ROUND_BRACKET);
			obj1.list[0]=parseExpression();
			match(token_types.RIGHT_ROUND_BRACKET);
			match(token_types.SEMICOL);
			obj.list[i]=obj1;
		}
		else if (next_token==token_types.IF)
		{
			obj1=new Object();
			var j;
			setObjType(obj1,"IF",ELEM.IF);
			getNextToken();	
			j=0;
			obj1.list=[];
			match(token_types.LEFT_ROUND_BRACKET);
			obj1.list[j]=parseExpression();j++;
			match(token_types.RIGHT_ROUND_BRACKET);
			match(token_types.THEN);
			obj1.list[j]=parseStatements(false,false);j++;
			while(next_token==token_types.ELSIF)
			{
				getNextToken();	
				match(token_types.LEFT_ROUND_BRACKET);
				obj1.list[j]=parseExpression(false,false);j++;
                if (obj1.list[j-1].enum_type==ELEM.CONST)
                {
                    stopCompilation("Can not have constant else if");
                }
				match(token_types.RIGHT_ROUND_BRACKET);
				obj1.list[j]=parseStatements(false,false);j++;
			}
			if (next_token==token_types.ELSE)
			{
				var obj2=new Object();
				setObjType(obj2,"CONST",ELEM.CONST);
				obj2.data="1";
				// this needs to be done here to properly calculate the line of the "ELSE" statement
				getNextToken();	
				
				obj1.list[j]=obj2;j++;
				obj1.list[j]=parseStatements(false,false);j++;
			}
			match(token_types.END_IF);
			obj.list[i]=obj1;
		}
		else if (next_token==token_types.WHILE)
		{
			obj1=new Object();
			setObjType(obj1,"WHILE",ELEM.WHILE);
			getNextToken();	
			obj1.list=[];
			match(token_types.LEFT_ROUND_BRACKET);
			obj1.list[0]=parseExpression();
			match(token_types.RIGHT_ROUND_BRACKET);
			match(token_types.DO);
			obj1.list[1]=parseStatements(true,false);
			if (obj1.list[1].list.length==1)
			{
				// preemption point only -> likely empty loop
				stopCompilation("Empty loop detected");
			}
			match(token_types.END_WHILE);
			obj.list[i]=obj1;
		}
		else if (next_token==token_types.FOR_LOOP)
		{
			obj1=new Object();
			setObjType(obj1,"FOR_LOOP",ELEM.FOR_LOOP);
			obj1.list=[];
			getNextToken();	
			if (next_token!=token_types.IDENT)
			{
				stopCompilation("Invalid syntax of For loop");
			}
			var var_elem=parseVarPart();
			if (var_elem.list.length!=1)
			{
				stopCompilation("Invalid syntax of For loop");
			}
			obj1.list[0]=var_elem;
			match(token_types.ASSIGNMENT);
			// from
			obj1.list[1]=parseExpression();
			match(token_types.TO);
			// to
			obj1.list[2]=parseExpression();
			match(token_types.DO);
			obj1.list[3]=parseStatements(true,false);
			match(token_types.END_FOR);
			obj.list[i]=obj1;
		}
		else if (next_token==token_types.COMMENT_BEGIN)
		{
			obj1=new Object();
			setObjType(obj1,"COMMENT_BLOCK",ELEM.COMMENT_BLOCK);
			obj1.list=[];
			getNextToken();
			obj1.list[0]=parseStatements(false,false);;			
			match(token_types.COMMENT_END);
			obj.list[i]=obj1;
		}
		else
		{
			break;
		}
		i++;
	}
	
	if (inject_return==true)
	{
		obj1=new Object();
		setObjType(obj1,"ELEM_RETURN",ELEM.ELEM_RETURN);
		obj.list[i]=obj1;i++;
	}
	
	return obj;
}

function parseAssignFunctBlockCall()
{
	var obj=new Object();
	setObjType(obj,"FUNC_BLOCK_VAR_ASSIGN",ELEM.FUNC_BLOCK_VAR_ASSIGN);
	obj.list=[];
	obj.list[0]=parseExpression();
	if ((next_token==token_types.COMMA)||(next_token==token_types.RIGHT_ROUND_BRACKET))
	{
		return obj.list[0];	
	}
	else
	{
		stopCompilation("Invalid function/function_block syntax");
	}
}	


var ast_disp_output=[];
var curr_ast_disp_line=0;



function addIndentSpaces(indent_level)
{
	var i;
	ast_disp_output[curr_ast_disp_line]="";
	for(i=0;i<indent_level;i++)
	{
		ast_disp_output[curr_ast_disp_line]+="|"; // use "|" instead of space because chrome debugger doesn't show the right number of spaces
	}
}


function printAST()
{
	var i;
	for(i=0;i<ast_disp_output.length;i++)
	{
		console.log(ast_disp_output[i].replace(/\|/g," ")); // replace the "|" with spaces when printing to screen
	}
}

function printASTToStr()
{
	var i;
	var str="";
	for(i=0;i<ast_disp_output.length;i++)
	{
		str+=ast_disp_output[i].replace(/\|/g," ")+"\n"; // replace the "|" with spaces when printing to screen
	}
	return  str;
}


var DISP_AST_OPT=
{
	DEBUG_INFO:0,
	REG_INFO:1,
};

function quickPrintAST(ast)
{
	ast_disp_output=[];
	curr_ast_disp_line=0;
	addIndentSpaces(0);
	displayAST_Elem(0,ast,DISP_AST_OPT.DEBUG_INFO);
	printAST();
}

function quickPrintASTtoStr(ast)
{
	ast_disp_output=[];
	curr_ast_disp_line=0;
	addIndentSpaces(0);
	displayAST_Elem(0,ast,DISP_AST_OPT.DEBUG_INFO);
	return printASTToStr();
}

function getStringFromAST(ast)
{
	ast_disp_output=[];
	curr_ast_disp_line=0;
	addIndentSpaces(0);
	displayAST_Elem(0,ast,DISP_AST_OPT.REG_INFO);
	//console.log(ast_disp_output);
	return ast_disp_output[0];
}

function displayAST_Elem(indent_level,ast,option)
{
	var i,j;
	if ((ast.expr_nesting!=undefined)&&(ast.expr_nesting==1))
	{
		if (ast.enum_type==ELEM.CONST_STR)
		{
			
			if (ast.data=="%")
			{
				// hack
				ast_disp_output[curr_ast_disp_line]+="%";
			}
			else
			{
				ast_disp_output[curr_ast_disp_line]+=decodeURI(ast.data);
			}
		}
		else
		{
			ast_disp_output[curr_ast_disp_line]+=ast.elem_string.trim();
		}
		return;
	}
	switch(ast.enum_type)
	{
		case ELEM.TO_FLOAT:
		    ast_disp_output[curr_ast_disp_line]+="TO_FLOAT(";
		    displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=")";
			break;
		case ELEM.TO_INT:
		    ast_disp_output[curr_ast_disp_line]+="TO_INT(";
		    displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=")";
			break;
			
			
		case ELEM.ELEM_FUNC_BLOCK_PROLOGUE:
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="FUNCTION_BLOCK_PROLOGUE";
			curr_ast_disp_line++;
			break;
		case ELEM.ELEM_CONTEXT_SWITCH:
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="ELEM_CONTEXT_SWITCH";
			curr_ast_disp_line++;
			break;
		case ELEM.WAIT_UNTIL:
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="WAIT(";
			displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=")";
			curr_ast_disp_line++;
			break;
		case ELEM.ELEM_PREEMPTION_POINT:
			addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="PREEMPTION";curr_ast_disp_line++;
			break;
		case ELEM.ELEM_RETURN:
			addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="RETURN";curr_ast_disp_line++;
			break;
		case ELEM.VAR_SEGM:
			if (ast.type!=null)
			{
				addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="Variables "+getOpName(ast.type);curr_ast_disp_line++;
			}
			for(i=0;i<ast.list.length;i++)
			{
				displayAST_Elem(indent_level+1,ast.list[i],option);
			}
			if (ast.type!=null)
			{
				addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="END "+getOpName(ast.type);curr_ast_disp_line++;				
			}
			break;
		case ELEM.OP:
			ast_disp_output[curr_ast_disp_line]+=" "+ast.str_type+" ";
			break;
		case ELEM.VAR_REG:
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+=ast.name+":"+ast.type.data;
			if (option==DISP_AST_OPT.DEBUG_INFO)
			{
				ast_disp_output[curr_ast_disp_line]+="{offset:"+ast.offset+" size:"+ast.size+"}";	
			}
			curr_ast_disp_line++;
			break;
		case ELEM.VAR_ARR:
			addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+=ast.name+": ARRAY["+ast.type.range_start+".."+ast.type.range_end+"]  OF "+ast.type.data;
			if (option==DISP_AST_OPT.DEBUG_INFO)
			{
				ast_disp_output[curr_ast_disp_line]+="{offset:"+ast.offset+" size:"+ast.size+"}";	
			}
			curr_ast_disp_line++;
			break;
		case ELEM.TASK:			
		case ELEM.FUNCT_BLOCK:
			 if (ast.enum_type==ELEM.TASK)
			 {
				addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="TASK "+ast.name;curr_ast_disp_line++;
			 }
			 else
			 {
				addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="FUNCTION_BLOCK "+ast.name;curr_ast_disp_line++;				 
			 }
			 displayAST_Elem(indent_level+1,ast.list[0],option);
			 if (ast.list.length>1)
			 {
				 addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="STATEMENTS";curr_ast_disp_line++;
				 displayAST_Elem(indent_level+1,ast.list[1],option);
			 }
			 if (ast.enum_type==ELEM.TASK)
			 {
				addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="END_TASK "+ast.name;curr_ast_disp_line++;
			 }
			 else
			 {
				addIndentSpaces(indent_level);ast_disp_output[curr_ast_disp_line]+="END_FUNCTION_BLOCK "+ast.name;curr_ast_disp_line++;
			 }
			 break;
		case ELEM.CONST:
		
			var nm=num(ast.data);
			if (ast.hex!=undefined)
			{
				ast_disp_output[curr_ast_disp_line]+="0x"+nm.toString(16);	
			}
			else
			{
				ast_disp_output[curr_ast_disp_line]+=ast.data;
			}
			break;
		case ELEM.EXPR:
			ast_disp_output[curr_ast_disp_line]+="(";
			for(i=0;i<ast.list.length;i++)
			{
				displayAST_Elem(indent_level,ast.list[i],option);
			}
			ast_disp_output[curr_ast_disp_line]+=")";
			break;
			
		case ELEM.EXPR_VAR:
			if (option==DISP_AST_OPT.DEBUG_INFO)
			{
				ast_disp_output[curr_ast_disp_line]+="{ref_type:"+ast.var_ref_type+", ref_addr: " + ast.ref_addr +" ";
				for(i=0;i<ast.offset_list.length;i++)
				{
					if (ast.offset_list[i].offset!=undefined)
					{
						ast_disp_output[curr_ast_disp_line]+=ast.offset_list[i].offset+"+";
					}
					else if (ast.offset_list[i].bit_offset!=undefined)
					{
						ast_disp_output[curr_ast_disp_line]+="!!"+ast.offset_list[i].bit_offset+","+ast.offset_list[i].bit_len+"!!";
					}
					else
					{
						ast_disp_output[curr_ast_disp_line]+=ast.offset_list[i].size+"*";
						displayAST_Elem(indent_level,ast.offset_list[i].num,option);
						ast_disp_output[curr_ast_disp_line]+="+";
					}
				}
				ast_disp_output[curr_ast_disp_line]+="}";
			}
			for(i=0;i<ast.list.length;i++)
			{
				if (ast.list[i].enum_type==ELEM.EXPR_VAR_OFFSET)
				{
					ast_disp_output[curr_ast_disp_line]+="."+ast.list[i].offset+"."+ast.list[i].len+" ";
				}
				else if (ast.list[i].enum_type==ELEM.EXPR_VAR)
				{
					if (ast.list[i].const_elem==true)
					{
						ast_disp_output[curr_ast_disp_line]+=ast.list[i].const_val;
					}
					else
					{
						if (i!=0)
						{
							ast_disp_output[curr_ast_disp_line]+=".";
						}
						ast_disp_output[curr_ast_disp_line]+=ast.list[i].data;
						if (option==DISP_AST_OPT.DEBUG_INFO)
						{
							ast_disp_output[curr_ast_disp_line]+="{"+ast.list[i].link.offset+","+ast.list[i].link.size+"} ";
						}
					}
				}
				else
				{
					ast_disp_output[curr_ast_disp_line]+="[";	
					displayAST_Elem(indent_level,ast.list[i].list[0],option);
					ast_disp_output[curr_ast_disp_line]+="]";	
				}
			}
			break;
			
		case ELEM.ASSIGN:
			addIndentSpaces(indent_level);
			displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=":=";
			displayAST_Elem(indent_level,ast.list[1],option);
			ast_disp_output[curr_ast_disp_line]+=";";
			curr_ast_disp_line++;
			break;
		case ELEM.FUNC_BLOCK_ARG_LIST:
			for(i=0;i<ast.list.length;i++)
			{
				displayAST_Elem(indent_level,ast.list[i].list[0],option);
				ast_disp_output[curr_ast_disp_line]+=":=";
				displayAST_Elem(indent_level,ast.list[i].list[1],option);
				ast_disp_output[curr_ast_disp_line]+=",";
			}
			break;
		case ELEM.FUNC:
		case ELEM.FUNC_NO_RETURN:
		
			
			if ((ast.func_ptr!=undefined)&&(ast.func_ptr.list!=undefined)&&(ast.func_ptr.list.length>1))
			{
				// function blocks that are arrays -> need to add an index
				displayAST_Elem(indent_level,ast.func_ptr,option);
			}
			else
			{
				ast_disp_output[curr_ast_disp_line]+=ast.data;
			}
			ast_disp_output[curr_ast_disp_line]+="(";
			for(i=0;i<ast.list.length;i++)
			{
				if (i>0)
				{
					ast_disp_output[curr_ast_disp_line]+=",";
				}
				displayAST_Elem(indent_level,ast.list[i],option);
			}
			ast_disp_output[curr_ast_disp_line]+=")";
			break;
		case ELEM.FUNC_BLOCK_CALL:
			addIndentSpaces(indent_level);
			displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+="(";
			displayAST_Elem(indent_level,ast.list[1],option);
			ast_disp_output[curr_ast_disp_line]+=");";
			curr_ast_disp_line++;
			break;
		case ELEM.IF:
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="IF";curr_ast_disp_line++;
			for(i=0;i<ast.list.length;i+=2)
			{
				addIndentSpaces(indent_level+1);
				displayAST_Elem(indent_level+1,ast.list[i],option);curr_ast_disp_line++;
				displayAST_Elem(indent_level+2,ast.list[i+1],option); // statements will autoincrement curr_ast_disp_line
			}
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="END_IF";curr_ast_disp_line++;
			break;
		case ELEM.WHILE:
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="WHILE(";
			displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=") DO";curr_ast_disp_line++;
			displayAST_Elem(indent_level+1,ast.list[1],option);
			addIndentSpaces(indent_level);
			ast_disp_output[curr_ast_disp_line]+="END_WHILE";curr_ast_disp_line++;
			break;
		case ELEM.CONST_STR:
			ast_disp_output[curr_ast_disp_line]+="\""+ast.data+"\"";
			break;
		case ELEM.COMMENT:
			ast_disp_output[curr_ast_disp_line]+="COMMENT(\""+ast.data+"\");";
			break;
		case ELEM.LADDER_COMMENT:
			ast_disp_output[curr_ast_disp_line]+="LADDER_COMMENT(\""+ast.data+"\");";
			break;
		case ELEM.TRACE:
			ast_disp_output[curr_ast_disp_line]+="TRACE(\""+ast.data+"\",";
			displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=");";
			break;
		case ELEM.LADDER_TRACE:
			ast_disp_output[curr_ast_disp_line]+="LADDER_TRACE(\""+ast.data+"\",";
			displayAST_Elem(indent_level,ast.list[0],option);
			ast_disp_output[curr_ast_disp_line]+=");";
			break;
			
		default:
			for(i=0;i<ast.list.length;i++)
			{
				displayAST_Elem(indent_level,ast.list[i],option);
			}
	}
}


return {
	parse:parse,	
	setObjType:setObjType,
	globals:globals,
	ELEM:ELEM,
	token_types:token_types,
	getStringFromAST:getStringFromAST,
	setParseCapitalization:setParseCapitalization,
	getConstElems:getConstElems,
	quickPrintAST:quickPrintAST,
	getOpName:getOpName,
	stopCompilation:stopCompilation,
	getTokenStartLine:getTokenStartLine,
	setErrMsg:setErrMsg,
	getNST_Prog_Line_From_ARGEE:getNST_Prog_Line_From_ARGEE,
	getARGEE_Prog_Line_From_NST:getARGEE_Prog_Line_From_NST,
	getARGEE_ElemIndexFromARGEE_Line:getARGEE_ElemIndexFromARGEE_Line,
	parseIndivExpression:parseIndivExpression,
	extractExpression:extractExpression,
   getStandaloneCompilerRemappingInfo:getStandaloneCompilerRemappingInfo,
}

}());
var PARSE=ARGEE_nst_parse;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
