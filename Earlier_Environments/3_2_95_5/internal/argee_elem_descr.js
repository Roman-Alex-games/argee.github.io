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

 
 
var default_task_type="Default_Task_1" 
var default_task_name="default__task__1"
var default_task_replace_type="MainTask"

var task_color_in_code="#d9d9d9";
var function_block_color="#fafafa"
var task_color_in_debug="Chartreuse";
var task_color_in_vars="Chartreuse";


//
var hide_str="<i><font style=\"color:inherit;\">(hidden)</font></i>"
var hide_str="<i><font style=\"color:inherit;\">(hidden)</font></i>"
 
var ARGEE_elem_descr=(function()
{ 


var event=
{
	ADD_ABOVE:0,
	ADD_BELOW:1,
	DEL:2,
	CHANGE:3,
	CUT:4,
	COPY:5,
	PASTE_ABOVE:6,
	PASTE_BELOW:7,
	DBL_CLICK:8,
	ADD_INIT:9,
	EDIT_INIT:10,
	REMOVE_MODULE:11,
	PASTE_BLOCK:12,
	CUT_BLOCK:13,
	COMMENT_OUT:14,
	UNCOMMENT:15,
	COMMENT_VAR:16,
	FORCE_NON_ZERO_RENDER_ABOVE:17,
	EXPORT_MODULE:18,
	IMPORT_MODULE:19,
   PASTE_INTO:20,
};

var prog_var_types_enum=["Number","Floating","String","Byte","WORD","Timer/Counter","State/Enum","Retain Number", "Retain Float","DefaultTask"];


function getStringTypeInd()
{
	return 2;
}

//var prog_var_types_enum=["INT","REAL","CHAR","BYTE","WORD","DWORD","TIMER","STATE","RETAIN_INT","RETAIN_REAL","MainTask"];

//var prog_type_colors=["#FFF8DC","Aqua","#FFFC28"/*"#ededed"*/,"#8FBC8F","Aquamarine","Chartreuse", "#E9967A","Gold"];

/*function getVarTypesEnum()
{
	return prog_var_types_enum;
}
*/
function isTypeEnum(field)
{
	if (field.enum_elems==prog_var_types_enum)
	{
		return true;
	}
	return false;
}

var mask_indexes_in_func=[7,8]; // don't allow selection of retain variables in functions

var mask_indexes_in_func_without_float=[1,7,8]; 
var mask_indexes_in_globals_without_float=[1,8];

//var module_color="#00bfff"
var module_color="fff2ff"

var prog_type_colors=["#FFF8DC","#FFEEAC","#F2DB7E","#F8C783","#E1b268","#F29136", "#E9967A","#E9968A","#E9969A","Gold"];
// color-less types (For Nick)
//var prog_type_colors=["inherit","inherit","inherit","inherit","inherit","inherit","inherit","inherit","inherit","inherit","Gold"];


//var alias_var_types=["Alias","Remap Byte","Remap Word","Remap DWord"];

function getProgTypeInd(type_str)
{
	return prog_var_types_enum.indexOf(type_str);
}

var func_block_type=["Regular","Task"];
//var func_block_type_colors=["#FFF8DC","Chartreuse"];
var func_block_type_colors=["white",task_color_in_debug];

var fixed_var_types_enum=prog_var_types_enum.length-1;

//var complex_var_types_enum=["MainTask"];

var plc_dir_enum=["ARGEE->PLC","PLC->ARGEE"];
var signed_enum= ["Unsigned","Signed"];

var m2m_dir_enum=["Read","Write"];

var arr_num_elems=
[
	"-------",
	"Array 2 elem","Array 3 elem","Array 4 elem","Array 5 elem",
	"Array 6 elem","Array 7 elem","Array 8 elem","Array 9 elem",
	"Array 10 elem","Array 11 elem","Array 12 elem","Array 13 elem","Array 14 elem",
	"Array 15 elem","Array 16 elem","Array 17 elem","Array 18 elem","Array 19 elem",
	"Array 20 elem","Array 21 elem","Array 22 elem","Array 23 elem","Array 24 elem",
	"Array 25 elem","Array 26 elem","Array 27 elem","Array 28 elem","Array 29 elem",
	"Array 30 elem","Array 31 elem","Array 32 elem","Array 33 elem","Array 34 elem",
	"Array 35 elem","Array 36 elem","Array 37 elem","Array 38 elem","Array 39 elem",
	
];


var arr_num_elems_colors=
[
	"inherit",
	"lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen","lightgreen",
	"lightgreen","lightgreen","lightgreen","lightgreen","lightgreen",
	
];

var func_block_var_segm=["VARIABLE","ARGUMENT"];
var func_block_var_segm_color=["inherit","lightgreen"];


var block_types=
{
	assign:0,
	do_while:1,
	if_then:2,
	else_if:3,		
	else_done:4,
	func_call:5,
	func_block_call:6,
	// comment can be added on top of any element
	ladder_condition:7,
	wait_until:8,
	ladder_assign:9,
	ladder_coil:10,
	ladder_timer_on:11,
	ladder_count_up:12,
	ladder_count_down:13,
	ladder_timer_start:14,
	ladder_timer_off:15,
	ladder_reset_counter:16,
	trace:17,
	add_block:18,
	funct_block_def:19,
	funct_def:20,
	funct_if_then:21,
	funct_else_if:22,
	funct_else_done:23,
	comment:24,
	// variable elements
	device:25,
	module:26,
	reg_var:27,
	alias_var:28,
	funct_block_var:29,
	funct_block_elem_var:30,
	funct_var:31,
	funct_elem_var:32,
	enum_var:33,
	enum_var_elem:34,
	mbudp_var:35,
	root:36,
	prog_vars:37,
	alias_vars:38,
	init_elem_var:39,
	func_block_assign:40,
	ladder_trace:42,
	for_loop:43,
	ladder_func_block_call:44,
	module_def:45,
	module_def_inner:45,
	// HMI elements
	hmi_screen:70,
	hmi_section:71,
	hmi_disp_num:72,
	hmi_disp_range:73,
	//hmi_disp_string:74,
	//hmi_disp_hex:75,
	hmi_enter_num:76,
	hmi_enter_state:77,
	hmi_button:78,
	hmi_screens:79,
	hmi:80,
	hmi_special:81,
	function_block_group:82,
	function_block_group_def:83,
	ladder_comment:84,
	comment_var:85,
	hmi_screen_color:86,
	hmi_screen_list:87,
	hmi_grid_screen:88,
	//hmi_grid:89,
	hmi_grid_row:90, // if the row properties are the same and the number of columns (including colspans) is the same as previous rows -> create a single table
	hmi_grid_section:91,
	hmi_grid_elem:92,

	
	
	
	local_io_var:100,
	local_io_slot:101,
	local_io_sect:102, 
	local_io_elem:103, 
	
	comb_glob_vars:120,
	comb_hmi_image_vars:121,
	comb_state_vars:130,

	
	
	
	hmi_image:135,
	hmi_image_group:136,
	
	
	func_group:200,
	func_group_elem:201,
	
	conv_if:537,
	conv_if_then:538,
	conv_else_if:539,
	conv_else:540,
	conv_func_block_assign_first:541,
	conv_func_block_assign_others:542,
	conv_func_block_var:543,
	conv_func_block_var_in_out:544,
	conv_enum_first_elem:545,
	conv_enum_other_elem:546,
	conv_task_func_block:547,
	conv_reg_func_block:548,
	conv_func_block_var_in:549,
	init_block:600,
	init_block_first_elem_simp:601,	
	init_block_first_elem:602,
	init_block_other_elem:603,
	conv_enum_first_elem_with_const:604,
	conv_enum_other_elem_with_const:605,
	init_block_simp:606,
};

var block_types_with_breakspoints=
[
    block_types.assign,
	block_types.func_block_call,
	block_types.ladder_func_block_call,
	block_types.wait_until,
	block_types.ladder_assign,
	block_types.ladder_coil,
	block_types.ladder_timer_on,
	block_types.ladder_count_up,
	block_types.ladder_count_down,
	block_types.ladder_timer_start,
	block_types.ladder_timer_off,
	block_types.ladder_reset_counter,
	block_types.trace,
];
	
	
	
	

var screens=
{
	var_scr:0,
	prog_scr:1,
};
	
	
	
	var reg_func_actions=
	[
		block_types.assign,
		block_types.funct_if_then,
		block_types.funct_else_if,
		block_types.funct_else_done,
		block_types.comment,
		block_types.trace,
	];

	var reg_block_actions_with_cond=
	[
		block_types.ladder_condition,
		block_types.assign,
		block_types.do_while,
		block_types.for_loop,
		block_types.if_then,
		block_types.else_if,
		block_types.else_done,
		block_types.func_block_call,
		block_types.comment,
		block_types.trace,
		block_types.wait_until,
	];
	
	var reg_block_actions=
	[
		block_types.assign,
		block_types.do_while,
		block_types.for_loop,
		block_types.if_then,
		block_types.else_if,
		block_types.else_done,
		block_types.func_block_call,
		block_types.comment,
		block_types.trace,
		block_types.wait_until,
	];
	var cond_block_actions=
	[	
		block_types.ladder_assign,
		block_types.ladder_timer_start,
		block_types.ladder_coil,
		block_types.ladder_timer_on,
		block_types.ladder_timer_off,
		block_types.ladder_trace,
		block_types.ladder_comment,
		block_types.ladder_count_up,
		block_types.ladder_count_down,
		block_types.ladder_reset_counter,
		block_types.ladder_func_block_call,
		
		
		/*block_types.ladder_count_up,
		block_types.ladder_count_down,
		block_types.ladder_timer_start,
		block_types.ladder_timer_off,
		block_types.ladder_reset_counter,
		*/
		
	];


	var var_blocks=
	[
		block_types.reg_var,
		block_types.alias_var,
	];	
	
	var prog_elem_blocks=
	[
		block_types.funct_block_var,
		block_types.enum_var,
		//block_types.function_block_group,
	];



	var hmi_sect_elem_blocks=
	[
		
		block_types.hmi_disp_num,  // displays number,hex, string, array
		block_types.hmi_disp_range,
		//block_types.hmi_disp_hex, // displays numbers and arrays
		block_types.hmi_enter_num,  // accepts arrays, number decimal,hex
		block_types.hmi_enter_state,
		block_types.hmi_button,
		block_types.comment,
	];

	
	var module_blocks=
	[
		block_types.funct_block_var,
	];

	var root_blocks=
	[
		block_types.device,
		block_types.module,
	];
	

var block_descr=
[		
    // Variable blocks
	{
		title:"Program Variables",
		type:block_types.prog_vars,
		color:"#f2f2f2",
		collapsable:true,
		//centered_title:true,
		screens:[screens.var_scr], 
		extra_creation:[block_types.reg_var],
		refresh_screens:[screens.var_scr], 
		AddButtonText:"Add Variable",
		nested_blocks:[block_types.reg_var],
		hidden_blocks:[block_types.comment_var],
	},
	
	
	{ 
		title:"VarInit", 
		type:block_types.init_elem_var,
		color:"Aqua",
		screens:[], 
		refresh_screens:[screens.var_scr], 
		fields:
		[
				{field_name:"Name",type:field_types.str_num},
				{field_name:"Value",type:field_types.str_num},
		],
	},

	{ 
		title:"Comment Var", 
		type:block_types.comment_var,
		color:"Aqua",
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr], 
		fields:
		[
				{field_name:"Value",type:field_types.str_num,width:99,render_textarea:true},
		],
	},

	
	
	{ 
		title:"Program Variable", 
		type:block_types.reg_var,
		color:"Aqua",
		render_init:true,
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr], 
		fields:
		[
				{field_name:"Name",width:15,type:field_types.str_num,init_inject:true},
				{field_name:"Type",type:field_types.enumeration_special,enum_elems:prog_var_types_enum,refresh_on_change:true},
				{field_name:"# of Array Elements",width:3,type:field_types.str_num,empty_on_zero:true,refresh_on_change:true,render_above:true,help_string:"<I>(Clear field to disable array)</i>"},
		],
	},

	{
		title:"Alias Variables",
		type:block_types.alias_vars,
		color:"#d9d9d9",
		collapsable:true,
		//centered_title:true,
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr], 
		extra_creation:[block_types.alias_var],
		AddButtonText:"Add Variable",
		nested_blocks:[block_types.alias_var],
		hidden_blocks:[block_types.comment_var],
	},	
	{
		title:"Alias Variable", 
		type:block_types.alias_var,
		color:"Gold",
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr], 
	 	fields:
    	[
						{field_name:"Name",type:field_types.str_num},
						{field_name:"IO Point",type:field_types.str_num,width:30,io_point_display:true},
						//{field_name:"Type",type:field_types.enumeration,enum_elems:alias_var_types},
						//{field_name:"Elements",type:field_types.enumeration,enum_elems:arr_num_elems},
						//{field_name:"Signed",type:field_types.enumeration,enum_elems:signed_enum},
		],
					
	},
	
	
	{
		title:"HMI", 
		type:block_types.hmi,
		color:"#FF8DC",
		screens:[], 
		refresh_screens:[], 
		extra_creation:[block_types.hmi_screens],
		nested_blocks:[block_types.hmi_screens],
	},	
	
	{
		title:"HMI Screens", 
		type:block_types.hmi_screens,
		color:"#FF8DC",
		collapsable:true,
		default_collapse:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		nested_blocks:[block_types.hmi_screen,block_types.hmi_grid_screen,block_types.hmi_image_group,block_types.comment,],
		AddButtonText:"Add Screen",
	},

	{
		title:"HMI Image <br> Group", 
		type:block_types.hmi_image_group,
		color:"#FF9DC",
		screens:[screens.prog_scr], 
		collapsable:true,
		default_collapse:true,
		refresh_screens:[screens.prog_scr], 
		AddButtonText:"Add Image",
	 	nested_blocks:[block_types.hmi_image,block_types.comment]
	},
	
	
	{
		title:"HMI Image", 
		type:block_types.hmi_image,
		color:"#FF9DC",
		image_handler:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
	},

	
	
	{
		title:"HMI Screen", 
		type:block_types.hmi_screen,
		color:"#FF9DC",
		screens:[screens.prog_scr], 
		collapsable:true,
		default_collapse:true,
		refresh_screens:[screens.prog_scr], 
		fields:
    	[
			{field_name:"Name",type:field_types.str_num,automatic_var_replacement:false},
		],
		AddButtonText:"Add Section",
	 	nested_blocks:[block_types.hmi_section,block_types.comment,]
	},
	
	{
		title:"HMI Grid <br> Screen", 
		type:block_types.hmi_grid_screen,
		color:"e4f7e4",//"#FF8ee",
		screens:[screens.prog_scr], 
		//dont_render_border:true,
		collapsable:true,
		default_collapse:true,
		refresh_screens:[screens.prog_scr], 
		refresh_on_change_prefix:true,
		hmi_func_array:"hmi_grid_screen_funcs",
		fields:
    	[
			// such as "name,rounded edges, background color,"
			// arguments: title, width, rounded_corners,background_color
			{field_name:"Properties",type:field_types.str_num,default_val:"SCREEN_PROP(\"Screen Title\",90,false,\"transparent\")"},
		],
		AddButtonText:"Add Row",
	 	nested_blocks:[block_types.hmi_grid_row,block_types.comment,]
	},

	{
		title:"Grid Row", 
		type:block_types.hmi_grid_row,
		color:"FFDFC",
		//small_height:true,
		collapsable:true,
		hmi_func_array:"hmi_grid_row_funcs",
		fields:
    	[
			// such as "name,rounded edges, background color,"
			// arguments: title, width, rounded_corners,background_color
			{field_name:"Properties",type:field_types.str_num,default_val:"ROW_PROP(\"transparent\")"},
		],
		screens:[screens.prog_scr], 
		//dont_render_border:true,
		refresh_screens:[screens.prog_scr], 
		AddButtonText:"Add Section",
		nested_blocks:[block_types.hmi_grid_section,block_types.comment,]
	},
	
	{
		title:"Grid Cell", 
		type:block_types.hmi_grid_section,
		color:"fbf1fe",//"FCFD0F",
		screens:[screens.prog_scr], 
		refresh_on_change_prefix:true,
		collapsable:true,
		refresh_screens:[screens.prog_scr], 
		//dont_render_border:true,
		hmi_func_array:"hmi_grid_sect_funcs",
		fields:
    	[
			{field_name:"Properties",type:field_types.str_num,default_val:"CELL_PROP(1,1)"},
		],
		nested_blocks:[block_types.hmi_grid_elem,block_types.comment,],
		AddButtonText:"Add Element",
	},
	
	{
		title:"Grid Element", 
		type:block_types.hmi_grid_elem,
		color:"#dd92dd",//"FC0FFD",
		render_text_area:true,
		dont_render_border:true,
		refresh_on_change_prefix:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		hmi_func_array:"hmi_grid_elem_funcs",
		fields:
    	[
			{field_name:"Properties",type:field_types.str_num,default_val:""},
		],
	},

	{
		title:"Section", 
		type:block_types.hmi_section,
		color:"FFfDC",
		screens:[screens.prog_scr], 
		collapsable:true,
		refresh_screens:[screens.prog_scr], 
		fields:
    	[
			{field_name:"Name",type:field_types.str_num,automatic_var_replacement:false},
		],
		AddButtonText:"Add Section Element",
		nested_blocks:hmi_sect_elem_blocks
	},
	{
		title:"Display Number/<br>State/String", 
		type:block_types.hmi_disp_num,
		color:"#e1a268",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		hmi_func_array:"hmi_disp_num_funcs",
		fields:
    	[
			{field_name:"Title",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"Variable",type:field_types.str_num},
			{field_name:"Units",type:field_types.str_num,automatic_var_replacement:false},
		],
	},
	{
		title:"Display Number<br> With Valid Range", 
		type:block_types.hmi_disp_range,
		color:"aFfDC",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		hmi_func_array:"hmi_finc_disp_val_range",
		fields:
    	[
			{field_name:"Title",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"Variable",type:field_types.str_num},
			{field_name:"Units",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"Min Valid Value",type:field_types.str_num},
			{field_name:"Max Valid Value",type:field_types.str_num},
/*			{field_name:"Min Value",type:field_types.str_num},
			{field_name:"Max Value",type:field_types.str_num},
			{field_name:"Min Green",type:field_types.str_num},
			{field_name:"Max Green",type:field_types.str_num},
			{field_name:"Min Yellow",type:field_types.str_num},
			{field_name:"Max Yellow",type:field_types.str_num},
			{field_name:"Min Red",type:field_types.str_num},
			{field_name:"Max Red",type:field_types.str_num},*/
		],
	},
	{
		title:"Screen List", 
		type:block_types.hmi_screen_list,
		color:"#a2e168",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		hmi_func_array:"hmi_disp_screens",
		fields:
    	[
			{field_name:"HTML Prefix",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"HTML Suffix",type:field_types.str_num,automatic_var_replacement:false},
		],
	},
	
	
	{
		title:"Enter Number/String", 
		type:block_types.hmi_enter_num,
		color:"aFaaC",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		hmi_func_array:"hmi_disp_num_funcs",
		fields:
    	[
			{field_name:"Title",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"Variable",type:field_types.str_num},
			{field_name:"Units",type:field_types.str_num,automatic_var_replacement:false},
		],
	},
	{
		title:"Enter State", 
		type:block_types.hmi_enter_state,
		color:"aFaaC",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr],
		fields:
    	[
			{field_name:"Title",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"Variable",type:field_types.str_num},
			{field_name:"Start State",type:field_types.str_num},
			{field_name:"End State",type:field_types.str_num},
		],
	},
	
	{
		title:"Submit Action", 
		type:block_types.hmi_button,
		color:"#a1a268",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
    	[
			{field_name:"Title",type:field_types.str_num,automatic_var_replacement:false},
			{field_name:"Variable",type:field_types.str_num},
		],
	},
	
	{
		title:"Function Block Elements",  
		type:block_types.funct_block_elem_var,
		color:"Tan",
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr,screens.prog_scr], 
		fields:
		[
			{field_name:"Name",type:field_types.str_num,width:15},
			{field_name:"Type",type:field_types.enumeration_special,enum_elems:prog_var_types_enum,refresh_on_change:true,mask:mask_indexes_in_func},
			{field_name:"Segment",type:field_types.enumeration,enum_elems:func_block_var_segm,refresh_on_change:true,},
			{field_name:"# of Array Elements",width:3,type:field_types.str_num,refresh_on_change:true,empty_on_zero:true,render_above:true,help_string:"<I>(Clear field to disable array)</i>",funct_arg_test:true},
		],
	},					 
	{
		title:"Function Block", 
		type:block_types.funct_block_var, 
		color:function_block_color,		
		collapsable:true,
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr,screens.prog_scr], 
		extra_creation:[block_types.funct_block_def,block_types.funct_block_elem_var],
		custom_event_handle:functBlockMod,
		fields:
		[
			{field_name:"Name",type:field_types.str_num,refresh_on_change:true,default_val:"Function_Block_Name"},
			{field_name:"Type",type:field_types.enumeration,enum_elems:func_block_type,refresh_on_change:true,},
		],
		AddButtonText:"Add Element",
		// if only one is available - no need to provide a select element next to "add" button
		// this way we can unify program renderer and var renderer
		nested_blocks:[block_types.funct_block_elem_var],
		hidden_blocks:[block_types.comment_var],
	},

	{
		title:"Function Block Group", 
		type:block_types.function_block_group, 
		color:module_color,		
		collapsable:true,
		draw_plus_minus:false,
		no_add_button:true,
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr,screens.prog_scr], 
		extra_creation:[block_types.function_block_group_def],
		fields:
		[
			{field_name:"Name",type:field_types.str_num,refresh_on_change:true,default_val:"Function Group",width:20,},
		],
		nested_blocks:[block_types.comment],// dummy element -> not really used for rendering
	},
	
	{
		title:"Function Block Def",
		type:block_types.function_block_group_def,
		color:module_color,
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[/*screens.var_scr,*/screens.prog_scr], 
		nested_blocks:[block_types.comment]
	},
	
	
	
	
	{
		title:"States", 
		type:block_types.enum_var, 
		color:"#d6d6d6",
		collapsable:true,
		//centered_title:true,
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr], 
		extra_creation:[block_types.enum_var_elem],
		AddButtonText:"Add Element",
		nested_blocks:[block_types.enum_var_elem],
		hidden_blocks:[block_types.comment_var],
	},

	{
		title:"Elements", 
		type:block_types.enum_var_elem, 
		color:"Azure",		
		screens:[screens.var_scr], 
		refresh_screens:[screens.var_scr], 
		fields:
		[
			{field_name:"Name",type:field_types.str_num},
			{field_name:"Const",width:5,type:field_types.str_num,refresh_on_change:true,green_on_non_empty:true,render_above:true,help_string:"<I>(Clear field to disable a constant)</i>"},
		],
	},
	
	// Program blocks
	{
		title:"Comment",
		type:block_types.comment,
		font_color:"#F50000",
		render_text_area:true,
		//color:"Azure",
		//color:"#f9f906",
		color:"yellow",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		// for elements containing a single field - don't display "field name" in front of it 
		fields:
		[
			{type:field_types.str_num,automatic_var_replacement:false},
		],
	},
	
	{
		title:"Comment",
		type:block_types.ladder_comment,
		font_color:"#F50000",
		render_text_area:true,
		//color:"Azure",
		//color:"#f9f906",
		color:"yellow",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		// for elements containing a single field - don't display "field name" in front of it 
		fields:
		[
			{type:field_types.str_num,automatic_var_replacement:false},
		],
	},
	
	{
		title:"Assignment",
		type:block_types.assign,
		color:"Aqua",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Destination",default_val:""},
			{type:field_types.str_num,field_name:"Expression",default_val:""}
		],
	},
	
	{
		title:"Trace",
		type:block_types.trace,
		color:"#FFA07A",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Prefix String",default_val:"",automatic_var_replacement:false},
			{type:field_types.str_num,field_name:"Expression",default_val:""}
		],
	},
	{
		title:"Trace",
		type:block_types.ladder_trace,
		color:"#FFA07A",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Prefix String",default_val:"",automatic_var_replacement:false},
			{type:field_types.str_num,field_name:"Expression",default_val:""}
		],
	},

	
	{
		title:"Wait Until",
		type:block_types.wait_until,
		//color:"#FFFC28",
		color:"#ecec13",
		render_text_area:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num},
		],
	},
	
	{
		title:"While",
		type:block_types.do_while,
		//color:"#9966FF",
		color: "#e0ccff",
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num},
		],
		nested_blocks:reg_block_actions,
	},

	{
		title:"For",
		type:block_types.for_loop,
		//color:"#9966EE",
		color: "#e0cddd",
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Iterator Variable"},
			{type:field_types.str_num,field_name:"Start Value",default_val:"0"},
			{type:field_types.str_num,field_name:"To Value",default_val:"0"}
		],
		nested_blocks:reg_block_actions,
	},


	{
		title:"If",
		type:block_types.if_then,
		color:"#7FFFD4",
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num},
		],
		nested_blocks:reg_block_actions,
	},	
	{
		title:"Else If",
		type:block_types.else_if,
		color:"#bfff80",
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num},
		],
		nested_blocks:reg_block_actions,
	},	
	
	{
		title:"Else",
		type:block_types.else_done,
		//color:"Aquamarine",
		color:"#dfff80",
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		nested_blocks:reg_block_actions,
	},	
	
	
	{
		title:"Condition",
		type:block_types.ladder_condition,
		color:"Tan",
		collapsable:true,
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num},
		],
		nested_blocks:cond_block_actions,
	},
	{
		type:block_types.ladder_assign,
		title:"Assignment",
		color:"Aqua",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Destination",default_val:""},
			{type:field_types.str_num,field_name:"Expression",default_val:""}
		],
	},
	{
		type:block_types.ladder_coil,
		title:"Coil",
		color:"Gold",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Coil",default_val:""},
		],
	},
	{
		type:block_types.ladder_timer_on,
		title:"Timer On",
		color:"DarkTurquoise",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Timer",default_val:""},
			{type:field_types.str_num,field_name:"Expires(ms)",default_val:"1000"}
		],
	},
	{
		type:block_types.ladder_count_up,
		title:"Count Up",
		color:"LimeGreen",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Counter",default_val:""},
			{type:field_types.str_num,field_name:"Preset",default_val:"1000"}
		],
	},
	
	{
		type:block_types.ladder_count_down,
		title:"Count Down",
		color:"Lime",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Counter",default_val:""},
			{type:field_types.str_num,field_name:"Preset",default_val:"1000"}
		],
	},
	{
		type:block_types.ladder_timer_off,
		title:"Timer Off",
		color:"DarkSeaGreen",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Timer",default_val:""},
			{type:field_types.str_num,field_name:"Expires(ms)",default_val:"1000"}
		],
	},
	{
		type:block_types.ladder_timer_start,
		title:"Timer Start",
		color:"Aquamarine",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Timer",default_val:""},
			{type:field_types.str_num,field_name:"Expires(ms)",default_val:"1000"}
		],
	},
	
	{
		type:block_types.ladder_reset_counter,
		title:"Reset Counter",
		color:"LightSeaGreen",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		fields:
		[
			{type:field_types.str_num,field_name:"Counter",default_val:""},
		],
	},
	
	
	{
		title:"Call",
		type:block_types.func_block_call,
		//color:"#ffbf00",
		color:"#fff8dc",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		refresh_on_change_prefix:true,
		fields:
		[
			{type:field_types.str_num},
		],
	},

	{
		title:"Call",
		type:block_types.ladder_func_block_call,
		//color:"#ffbf00",
		color:"#fff8dc",
		screens:[screens.prog_scr], 
		refresh_screens:[screens.prog_scr], 
		refresh_on_change_prefix:true,
		fields:
		[
			{type:field_types.str_num},
		],
	},


	{
		//title:"",
		heading:"Device Variables",
		type:block_types.device,
		screens:[screens.var_scr], 
		no_add_button:true,
		refresh_screens:[screens.var_scr], 
		extra_creation:[block_types.prog_vars,block_types.alias_vars],
		nested_blocks:var_blocks,
		AddButtonText:"Add",
	},

	{
		//title:"",
		heading:"HMI Variables",
		type:block_types.hmi_special,
		screens:[], 
		no_add_button:true,
		refresh_screens:[], 
		extra_creation:[block_types.hmi],
		nested_blocks:[block_types.hmi],
		AddButtonText:"Add",
	},

	
	
	{
		//title:"",
		type:block_types.root,
		screens:[screens.var_scr], 
		extra_creation:[block_types.device,block_types.module,block_types.hmi_special],
		refresh_screens:[screens.var_scr], 
		nested_blocks:root_blocks,
		AddButtonText:"Add Library",
		AddButtonBlockType:block_types.module,
	},
	{
		//title:"",
		type:block_types.module,
		collapsable:true,
		color:"#FFBFFF",
		heading:"Program Elements",
		title:"Library",
		screens:[screens.var_scr], 
		extra_creation:[block_types.module_def],
		refresh_screens:[screens.var_scr,screens.prog_scr], 
		fields:
		[
				{field_name:"",type:field_types.str_num,width:20,refresh_on_change:true,default_val:"New_Library"},
				{field_name:"<b>Version :&nbsp&nbsp</b>",type:field_types.str_num,width:5,default_val:"1.0"},
		],
		custom_event_handle:moduleMod,
		displayFieldNames:true,
		nested_blocks:prog_elem_blocks,
		AddButtonText:"Add",
		delete_from_clipboard_after_paste:true,
	},

	{
		title:"Module Def",
		type:block_types.module_def,
		collapsable:true,
		color:"#FFBFFF",
		extra_creation:[block_types.module_def_inner],
		screens:[screens.prog_scr], 
		refresh_screens:[/*screens.var_scr,*/screens.prog_scr], 
		//nested_blocks:[]
	},



	{
		title:"",
		screens:[screens.var_scr,screens.prog_scr], 
		refresh_screens:[screens.var_scr,screens.prog_scr], 
		type:block_types.add_block
	},
	{
		title:"Function Block",
		type:block_types.funct_block_def,
		color:"Gold",
		screens:[screens.prog_scr], 
		refresh_screens:[/*screens.var_scr,*/screens.prog_scr], 
		nested_blocks:reg_block_actions_with_cond
	},

	{
		title:"conv_func_block_var",
		type:block_types.conv_func_block_var,
		color:"",
		no_add_button:true,
		screens:[], 
		refresh_screens:[], 
		nested_blocks:[block_types.funct_block_elem_var]
	},
	
	// Local IO representation
	{
		//title:"",
		type:block_types.local_io_var,
		heading:"",
		screens:[], 
		refresh_screens:[], 
		nested_blocks:[block_types.local_io_slot],
		AddButtonText:"",
	},
	{
		//title:"",
		type:block_types.local_io_slot,
		heading:"",
		screens:[], 
		refresh_screens:[], 
		fields:
		[
			{num:field_types.str_num},
			{mod_name:field_types.str_num},
			{mod_id:field_types.str_num},
		],
		nested_blocks:[block_types.local_io_sect],
		AddButtonText:"",
	},

	{
		//title:"",
		type:block_types.local_io_sect,
		heading:"",
		screens:[], 
		refresh_screens:[], 
		fields:
		[
			{name:field_types.str_num},
		],
		nested_blocks:[block_types.local_io_elem],
		AddButtonText:"",
	},

	{
		//title:"",
		type:block_types.local_io_elem,
		heading:"",
		screens:[], 
		refresh_screens:[], 
		fields:
		[
			{name:field_types.str_num},
			{bit_offset:field_types.str_num},
			{bit_len:field_types.str_num},
		],
	},
	
	// Combined global/PLC vars
	{
		//title:"",
		type:block_types.comb_glob_vars,
		heading:"",
		screens:[], 
		refresh_screens:[], 
		nested_blocks:[block_types.reg_var,block_types.alias_var],
		AddButtonText:"",
	},
	
	// Combined enumerations
	{
		//title:"",
		type:block_types.comb_state_vars,
		heading:"",
		screens:[], 
		refresh_screens:[], 
		nested_blocks:[block_types.enum_var_elem],
		AddButtonText:"",
	},

	
];


	var proj_elems=[];

	var descr_lookup=[];
	
	function createFunctionBlockHelpString(name,ind,add_names)
	{
		var ptr=findFunctBlock(name);
		func_block_pointers[ind]=ptr;
		var i,j;
		var str="";
		if (add_names==true)
		{
			str+=ptr.values[0];
		}
		str+="(";
		for(i=0,j=0;i<ptr.sub_elems.length;i++)
		{
			if (
			     (ptr.sub_elems[i].type==block_types.funct_block_elem_var)&&
				  (parseInt(ptr.sub_elems[i].values[2])>0)
			    )
			{
				if (j>0)
				{
					str+=",";
				}
				j++;
				if (add_names==true)
				{
					str+=ptr.sub_elems[i].values[0];
				}
			}
		}
		str+=")";
		return str;
	}
	
	var func_block_help_strings=[];
	var func_block_barebone_strings=[];
	var func_block_pointers=[];
	var glob_var_ptrs;
	
	function createFuncBlockHelpStringCache()
	{
		var i;
		func_block_help_strings=[];
		func_block_barebone_strings=[];
		glob_var_ptr=getElemFromIndex(glob_var_index);
		for(i=fixed_var_types_enum;i<prog_var_types_enum.length;i++)
		{
			func_block_help_strings[i]=createFunctionBlockHelpString(prog_var_types_enum[i],i,true);
			func_block_barebone_strings[i]=createFunctionBlockHelpString(prog_var_types_enum[i],i,false);
		}
	}
	
	function getFunctBlockBareboneString(ind)
	{
		return func_block_barebone_strings[ind];
	}
		
	
	// precaching uppercase of all the fields of all function blocks shoudl help
	// reduce computational streign
	function findLastType(elem_list,parent_func_blk_ptr,ind)
	{
		var i,j;
		for(i=0;i<parent_func_blk_ptr.sub_elems.length;i++)
		{
			if ((parent_func_blk_ptr.sub_elems[i].type==block_types.funct_block_elem_var)&&
			     parent_func_blk_ptr.sub_elems[i].values[0].toUpperCase()==elem_list[ind].toUpperCase())
			{
				if (elem_list.length==(ind+1))
				{
					return parent_func_blk_ptr.sub_elems[i].values[1];
				}
				else
				{
					if (prog_var_types_enum.indexOf(parent_func_blk_ptr.sub_elems[i].values[1])==-1)
					{
						return null;
					}
					return findLastType(elem_list,func_block_pointers[prog_var_types_enum.indexOf(parent_func_blk_ptr.sub_elems[i].values[1])],ind+1);
				}
			}
		}
		// not a local element.
		if (ind==0)
		{
			for(i=0;i<glob_var_ptr.sub_elems.length;i++)
			{
				if ((prog_var_types_enum.indexOf(glob_var_ptr.sub_elems[i].values[1])>=fixed_var_types_enum)&&
					 glob_var_ptr.sub_elems[i].values[0].toUpperCase()==elem_list[ind].toUpperCase())
				{
					if (elem_list.length==(ind+1))
					{
						return glob_var_ptr.sub_elems[i].values[1];
					}
					else
					{
						if (prog_var_types_enum.indexOf(prog_var_types_enum.indexOf(glob_var_ptr.sub_elems[i].values[1]))==-1)
						{
							return null;
						}
						return findLastType(elem_list,func_block_pointers[prog_var_types_enum.indexOf(glob_var_ptr.sub_elems[i].values[1])],ind+1);
					}
				}
			}		
		}
		return	null;	
	}
	
	function findFunctBlock(name)
	{
		var i;
		for(i=0;i<proj_elems.sub_elems.length;i++)
		{
			if (proj_elems.sub_elems[i].type==block_types.module)
			{
				var funct=findFunctBlockInModule(proj_elems.sub_elems[i],name);
				if (funct!=null)
				{
					return funct;
				}
			}
		}
		return null;
	}
	
	function getFunctionBlockIndex(name)
	{
		var i,j
		for(i=0;i<proj_elems.sub_elems.length;i++)
		{
			if (proj_elems.sub_elems[i].type==block_types.module)
			{
				for(j=0;j<proj_elems.sub_elems[i].sub_elems.length;j++)
				{
					if (proj_elems.sub_elems[i].sub_elems[j].values[0]==name)
					{
						return [i,j];
					}
				}
			}
		}
		return null;
	}
	
	function findFunctBlockInModule(mod,name)
	{
		var i;
		for(i=0;i<mod.sub_elems.length;i++)
		{
			if ((mod.sub_elems[i].type==block_types.funct_block_var)&&(mod.sub_elems[i].values[0].localeCompare(name)==0))
			{
				return mod.sub_elems[i];
			}
		}
	}
	
	
	function findSubElem(elem,sub_elem_name)
	{
		var i;
		for(i=0;i<elem.sub_elems.length;i++)
		{
			if ((elem.sub_elems[i].type==block_types.reg_var)||(elem.sub_elems[i].type==block_types.funct_block_elem_var))
			{
				if (elem.sub_elems[i].values[0].localeCompare(sub_elem_name)==0)
				{
					return findFunctBlock(elem.sub_elems[i].values[1]);
				}
			}
		}
		return null;
	}
	
	var SYM_A=0x41
	var SYM_Z=0x5a
	var SYM_a=0x61
	var SYM_z=0x7a
	var SYM_UNDERSCORE=0x5f
	var SYM_0=0x30
	var SYM_9=0x39
	var SYM_DBL_QUOTE=0x22
	var SYM_DOT=0x2e
	
	
	function performReplacementsInString(str,toSearch,toReplace)
	{
		var i,pos;
		var new_str="";
		var new_str_pos;
		pos=0;
		new_str_pos=0;
		while(pos<str.length)
		{
			var ch=str.charCodeAt(pos);
			// variable always starts with alphanumeric character
			if (((ch>=SYM_A)&&(ch<=SYM_Z))||
			    ((ch>=SYM_a)&&(ch<=SYM_z))
				)
			{
				var str_start=pos;
				pos++;
				for(;pos<str.length;)
				{
					var ch=str.charCodeAt(pos);
					if (((ch>=SYM_A)&&(ch<=SYM_Z))||// capitals
						((ch>=SYM_a)&&(ch<=SYM_z))||// low case
						((ch>=SYM_0)&&(ch<=SYM_9))|| //numbers
						(ch==SYM_UNDERSCORE))// underscore
						{
							pos++;
						}
						else
						{
							break;
						}
				}
				var substr=str.slice(str_start,pos);
				if (((str_start>0)&&(str.charCodeAt(str_start-1)==SYM_DOT))||(substr!=toSearch))
				{
					// element of a structure or not a match
					new_str+=substr;
					new_str_pos+=substr.length;
				}
				else
				{
					// replace
					new_str+=toReplace;
					new_str_pos+=toReplace.length;
				}
			}
			else if (ch==SYM_DBL_QUOTE) //"
			{
				var str_start=pos;
				// skip until the next "\"" character
				pos++;
				for(;pos<str.length;pos++)
				{
					if (str.charCodeAt(pos)==SYM_DBL_QUOTE) //"
					{
						pos++;
						break;
					}
				}
				var substr=str.slice(str_start,pos);
				new_str+=substr;
				new_str_pos+=substr.length;
			}
			else
			{
				new_str+=str.charAt(pos);
				new_str_pos++;
				pos++;
			}
		}
		return new_str;
	}
	
	function replaceProgVars(elem,toSearch,toReplace)
	{
		var i,j;
		var descr=findBlockDescr(elem.type);
		for (i=0;i<elem.values.length;i++)
		{
			if ((descr.fields==undefined)||((descr.fields[i].automatic_var_replacement!=undefined)&&(descr.fields[i].automatic_var_replacement==false)))
			{
				continue;
			}
				
			if (typeof elem.values[i] === 'string')
			{
				var pos=0;
				var res=1;
				var str=elem.values[i];
				var new_str=performReplacementsInString(str,toSearch,toReplace);
				elem.values[i]=new_str;
			}
		}
		if (elem.sub_elems!=undefined)
		{
			for(i=0;i<elem.sub_elems.length;i++)
			{
				
				replaceProgVars(elem.sub_elems[i],toSearch,toReplace);
			}
		}
	}
	
	function setCommentedState_inner(elem,val)
	{
		var i;
		
		elem.commented=val;
		if (elem.sub_elems!=undefined)
		{
			for (i=0;i<elem.sub_elems.length;i++)
			{
				setCommentedState_inner(elem.sub_elems[i],val);
			}
		}
	}
	
	function eliminateDuplicateAddButtons(elem)
	{
		var i,j;
		var updated_list;
		
		if (elem.sub_elems!=undefined)
		{
			updated_list=[];
			for (i=0;i<elem.sub_elems.length;i++)
			{
				if (elem.sub_elems[i].sub_elems!=undefined)
				{
					eliminateDuplicateAddButtons(elem.sub_elems[i]);
					updated_list[updated_list.length]=elem.sub_elems[i];
				}
				
				else if (elem.sub_elems[i].type==block_types.add_block)
				{
					updated_list[updated_list.length]=elem.sub_elems[i];
					while (((i+1)<(elem.sub_elems.length))&&(elem.sub_elems[i+1].type==block_types.add_block))
					{
						i=i+1;
					}
					if (((i+1)<(elem.sub_elems.length))&&(elem.sub_elems[i+1].type==block_types.reg_var)&&(elem.sub_elems[i+1].values[0]==default_task_name))
					{
						updated_list.splice(updated_list.length-1,1);
					}
				}
				else
				{
					updated_list[updated_list.length]=elem.sub_elems[i];
				}
			}
			elem.sub_elems=updated_list;
		}
	}
	
	/*function eliminateAddButtons(elem)
	{
		var i;
		var updated_list;
		
		if (elem.sub_elems!=undefined)
		{
			updated_list=[];
			for (i=0;i<elem.sub_elems.length;i++)
			{
				if (elem.sub_elems[i].sub_elems!=undefined)
				{
					eliminateAddButtons(elem.sub_elems[i]);
					updated_list[updated_list.length]=elem.sub_elems[i];
				}
				
				else if (elem.sub_elems[i].type==block_types.add_block)
				{
					i++;
				}
				else
				{
					updated_list[updated_list.length]=elem.sub_elems[i];
				}
			}
			elem.sub_elems=updated_list;
		}
	}*/
	
	
	function setCommentedState(elem,val)
	{
		var i;
		if ((elem.type==block_types.if_then)||(elem.type==block_types.else_if)||(elem.type==block_types.else_done)||(elem.type==block_types.add_block))
		{
			elem.commented=0;
			if (elem.sub_elems!=undefined)
			{
				for (i=0;i<elem.sub_elems.length;i++)
				{
					setCommentedState(elem.sub_elems[i],val);
				}
			}
		}
		else
		{
			elem.commented=val;
			if (elem.sub_elems!=undefined)
			{
				for (i=0;i<elem.sub_elems.length;i++)
				{
					if (val==1)
					{
						setCommentedState_inner(elem.sub_elems[i],2); // all inner elements are set to "commented+1"
					}
					else
					{
						setCommentedState_inner(elem.sub_elems[i],0); 
					}
				}
			}
		}
	}


	function checkVarNameAgainstGlobals(new_val)
	{
		var i,j
		createGlobAndEnumLists();
		for(i=0;i<combined_glob_io_alias_vars.sub_elems.length;i++)
		{
			if ((combined_glob_io_alias_vars.sub_elems[i].values.length>0)&&(combined_glob_io_alias_vars.sub_elems[i].values[0].toUpperCase()==new_val.toUpperCase()))
			{
				alert("Duplicate variable name");
				return false;
			}
		}
		for(i=0;i<combined_enumerations.sub_elems.length;i++)
		{
			if ((combined_enumerations.sub_elems[i].values.length>0)&&(combined_enumerations.sub_elems[i].values[0].toUpperCase()==new_val.toUpperCase()))
			{
				alert("Overlap with enumeration");
				return false;
			}
		}
		return true;
	}
	
	function checkIfVarChangeValid(parent,act_elem,new_val)
	{
		var i,j;
		if (act_elem.values[0].toUpperCase()==new_val.toUpperCase())
		{
			return true;
		}
		if (stringCompatibleWithVariables(new_val)==false)
		{
			return -1;
		}
		// check if new_val doesn't conflict with any built-in functions
		if (PROCESS.findBuiltInFunc(new_val.toUpperCase())!=null)
		{
			alert("Conflict between a variable name and a built-in function name");			
			return false;
		}
		if (act_elem.type==block_types.funct_block_var)
		{
			for(i=0;i<prog_var_types_enum.length;i++)
			{
				if (prog_var_types_enum[i].toUpperCase()==new_val.toUpperCase())
				{
					alert("Function block with the same name already exists");
					return false;
				}
			}
		}
		else if (act_elem.type==block_types.funct_block_elem_var)
		{
			for(i=0;i<parent.sub_elems.length;i++)
			{
				if ((parent.sub_elems[i].type==block_types.funct_block_elem_var)&&
				    (parent.sub_elems[i].values[0].toUpperCase()==new_val.toUpperCase()))
					{
						alert("Duplicate variable name within the function block");
						return false;
					}
			}
			if (checkVarNameAgainstGlobals(new_val)==false)
			{
				return false;
			}
		}
		else 
		{
			if (checkVarNameAgainstGlobals(new_val)==false)
			{
				return false;
			}
			// check against all function blocks to see if no member variables 
			// have the same name
			for(i=0;i<proj_elems.sub_elems.length;i++)
			{
				if (proj_elems.sub_elems[i].type==block_types.module)
				{
					var mod=proj_elems.sub_elems[i];
					for(j=0;j<mod.sub_elems.length;j++)
					{
						if (mod.sub_elems[j].type==block_types.funct_block_var)
						{
							var k;
							var elem_list=mod.sub_elems[j].sub_elems;
							for(k=0;k<elem_list.length;k++)
							{
								if  (elem_list[k].type==block_types.funct_block_elem_var)
								{
									if (elem_list[k].values[0].toUpperCase()==new_val.toUpperCase())
									{
										alert(" Same variable name found in function block "+mod.sub_elems[j].values[0]);	
										return false;
									}
								}
							}
						}
					}
				}
			}

			
			for(i=0;i<parent.sub_elems.length;i++)
			{
				if ((parent.sub_elems[i].type==block_types.funct_block_elem_var)&&
				    (parent.sub_elems[i].values[0].toUpperCase()==new_val.toUpperCase()))
					{
						alert("Duplicate variable name within the function block");
						return false;
					}
			}
			
			
			createGlobAndEnumLists();
			for(i=0;i<combined_glob_io_alias_vars.sub_elems.length;i++)
			{
				if ((combined_glob_io_alias_vars.sub_elems[i].values.length>0)&&(combined_glob_io_alias_vars.sub_elems[i].values[0].toUpperCase()==new_val.toUpperCase()))
				{
					alert("Duplicate variable name");
					return false;
				}
			}
			for(i=0;i<combined_enumerations.sub_elems.length;i++)
			{
				if ((combined_enumerations.sub_elems[i].values.length>0)&&(combined_enumerations.sub_elems[i].values[0].toUpperCase()==new_val.toUpperCase()))
				{
					alert("Overlap with enumeration");
					return false;
				}
			}
		}
		return true;
	}
	
	function changeVarName(parent,act_elem,new_val)
	{
		if (act_elem.type==block_types.funct_block_elem_var)
		{
			//var func_block_name=parent.values[0];
			replaceProgVars(parent.sub_elems[0],act_elem.values[0],new_val);	
		}
		if ((act_elem.type==block_types.reg_var)||(act_elem.type==block_types.alias_var)||
		    (act_elem.type==block_types.enum_var_elem))
		{
			var i,j,k;
			// go through all function blocks. Check if a variable with the same name exists -> skip this function block, otherwise - perform replacements in that function block
			for(i=0;i<proj_elems.sub_elems.length;i++)
			{
				if (proj_elems.sub_elems[i].type==block_types.module)
				{
					for(j=0;j<proj_elems.sub_elems[i].sub_elems.length;j++)
					{
						
						if (proj_elems.sub_elems[i].sub_elems[j].type==block_types.funct_block_var)
						{
							var func=proj_elems.sub_elems[i].sub_elems[j];
							var variable_overlap=false;
							for(k=0;k<func.sub_elems.length;k++)
							{
								if ((func.sub_elems[k].type==block_types.funct_block_elem_var)&&
								    (func.sub_elems[k].values[0]==act_elem.values[0]))
								{
									variable_overlap=true;
									break;
								}
							}
							if (variable_overlap==false)
							{
								replaceProgVars(func.sub_elems[0],act_elem.values[0],new_val);	
							}
						}
					}
				}
			}
			// perform replacements in HMI screens			
         if (proj_elems.sub_elems[proj_elems.sub_elems.length-2].type==block_types.hmi_special)
         {
            replaceProgVars(proj_elems.sub_elems[proj_elems.sub_elems.length-2],act_elem.values[0],new_val);	
         }
		}
	}
	
	
	function getFuncBlockType(index,name)
	{
		var i;
		var name_arr=name.split(".");
		for(i=0;i<name_arr.length;i++)
		{
			var pos;
			if ((pos=name_arr[i].indexOf('['))>=0)
			{
				name_arr[i]=name_arr[i].substr(0,pos);
			}
		}
		var loc_block=getElemFromIndex(index);
		var curr_ind=0;
		var curr=findSubElem(loc_block,name_arr[curr_ind]);
		if (curr==null)
		{
			loc_block=getElemFromIndex([0,0]);
			curr=findSubElem(loc_block,name_arr[curr_ind]);
			if (curr==null)
			{
				return null;
			}
		}
		for(i=1;i<name_arr.length;i++)
		{
			curr=findSubElem(curr,name_arr[curr_ind]);
			if (curr==null)
			{
				return null;
			}
		}
		return curr;
	}
	
		
	
	var glob_var_index=[0,0];
	
	function indexToDotString(index)
	{
		var i;
		var str="";
		str+=index[0];
		for(i=1;i<index.length;i++)
		{
			str+="."+index[i];
		}
		return str;
	}
	
	function getVarElemAndLineFromIndex(index)
	{
		var elem_name="";
		var elem_num="";
		if (index.length<2)
		{
			return [elem_name,index[0]];
		}
		if (index[0]==0)
		{
			var elm_descr=findBlockDescr(getElemFromIndex(index.slice(0,2)).type);
			elem_name=elm_descr.title;
			if (index.length>2)
			{
				elem_num=indexToDotString(index.slice(2));
			}
			else
			{
				elem_num+=index[1];
			}
		}
		else
		{
			var real_elem=getElemFromIndex(index.slice(0,2));
			var elm_descr=findBlockDescr(real_elem.type);
			elem_num+=(index[1]);
			elem_name=elm_descr.title+" "+elem_num;
			var type=getElemFromIndex(index).type;
			if (type==block_types.comment_var)
			{
				if (real_elem.type==block_types.funct_block_var)
				{
					elem_name+=" - "+real_elem.values[0]; 
					elem_num=(index[2]-1)+"";
				}
				else
				{    // enum
					elem_num=index[2]+"";
				}
			}
			else
			{
				switch(type)
				{
					case block_types.function_block_group: break;
					case block_types.funct_block_var: elem_name+=" - "+real_elem.values[0]; break;
					case block_types.funct_block_elem_var:  elem_name+=" - "+real_elem.values[0]; elem_num=(index[2]-1)+""; break;
					
					case block_types.enum_var: break;
					case block_types.enum_var_elem: elem_num=index[2]+""; break;
				}
			}
		}			 
		return [elem_name,elem_num];		
		
	}
			
	
    
	function preProcessBlockSeqDescr()
	{
		var i,j,k;
		for(i=0;i<block_descr.length;i++)
		{
			if (block_descr[i].nested_blocks!=undefined)
			{
				block_descr[i].nested_blocks_exp=[];
				for(j=0;j<block_descr[i].nested_blocks.length;j++)
				{
					block_descr[i].nested_blocks_exp[j]=findBlockDescr_slow(block_descr[i].nested_blocks[j]);
				}
			}
		}
		for(i=0;i<block_descr.length;i++)
		{
			descr_lookup[block_descr[i].type]=block_descr[i];
		}
	}

	function getParentArr(index)
	{
		var i;
		var elem=proj_elems;
		for(i=0;i<(index.length-1);i++)
		{
			elem=elem.sub_elems[index[i]];
		}
		return elem;
	}

	function getElemFromIndex(index)
	{
		var i;
		var elem=proj_elems;
		for(i=0;i<(index.length);i++)
		{
			elem=elem.sub_elems[index[i]];
		}
		return elem;
	}

	function getID_FromIndex(index)
	{
		var i;
		var id=""+(index[0]);
		for(i=1;i<index.length;i++)
		{
			id+="_"+(index[i]);
		}
		return id;
	}

	function findBlockDescr_slow(type)
	{
		var i;
		for(i=0;i<block_descr.length;i++)
		{
			if (block_descr[i].type==type)
			{
				return block_descr[i];
			}
		}
		return null;
	}

	function findBlockDescr(type)
	{
		return descr_lookup[type];
	}
	
	
	function createNewElem(descr)
	{
		var obj={};
		var i;
		obj.values=[];
		obj.type=descr.type;
		if (descr.type==block_types.root)
		{
			// any import or recreation of the object tree -> clear breakpoint list.
			if (print_mode==false)
			{
				GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
			}
		}
		if (descr.fields!=undefined)
		{
			for(i=0;i<descr.fields.length;i++)
			{
				if (descr.fields[i].type==field_types.str_num)
				{
					if (descr.fields[i].default_val!=undefined)
					{
						obj.values[i]=descr.fields[i].default_val;
					}
					else
					{
						obj.values[i]="";
					}
				}
				if (descr.fields[i].type==field_types.enumeration)
				{
					obj.values[i]=0;
				}
				if (descr.fields[i].type==field_types.enumeration_special)
				{
					obj.values[i]=prog_var_types_enum[0];
				}
			}
		}
		if (obj.type==block_types.init_elem_var)
		{
			obj.editable=true;
		}
		if ((descr.nested_blocks!=undefined))
		{
			obj.sub_elems=[];
			if (descr.extra_creation!=undefined)
			{
				for(i=0;i<descr.extra_creation.length;i++)
				{
					obj.sub_elems[obj.sub_elems.length]=createNewElem(findBlockDescr(descr.extra_creation[i]));
				}
			}
			if (descr.no_add_button==undefined)
			{
				obj.sub_elems[obj.sub_elems.length]=createNewElem(findBlockDescr(block_types.add_block));
			}
		}
		return obj;
	}
	
	var basic_mode=true;
	
	function setBasicMode(engaged)
	{
		basic_mode=engaged;
		proj_elems.basic_mode=basic_mode;
		//setLocalStorage("prog_code",JSON.stringify(proj_elems));
	}
	
	function getBasicMode()
	{
		return basic_mode;
	}
	
	function generateAddButtonBlock(elem,index)
	{
		var str=""
		var selected="";
		var i,j;
		var parent=getParentArr(index);
		var type_in_select="0";
		var func_block_task=false;
		var is_func_block=false;
		
		if ((parent.type==block_types.root)&&(index[0]==(parent.sub_elems.length-1)))
		{
			// add Last button to "add module" preceeded with  horizontal line
			str+="<hr>";
		}
		
		if (index.length>3)
		{
			var func_block_test=getParentArr(index.slice(0,3));
			if (func_block_test.type==block_types.funct_block_var)
			{
				is_func_block=true;
				if (num(func_block_test.values[1])==1)
				{
					func_block_task=true;
				}
			}
		}
		var button_text="";
		if ((descr_lookup[parent.type].nested_blocks.length>1)&&(descr_lookup[parent.type].AddButtonBlockType==undefined))
		{
			var num_elems_to_show=descr_lookup[parent.type].nested_blocks_exp.length;
			if ((is_func_block==true)&&(func_block_task==true)&&(basic_mode==true))
			{
				if (descr_lookup[parent.type].nested_blocks==reg_block_actions_with_cond)
				{
					num_elems_to_show=1; // only show condition element;
					button_text="Add Condition";
				}
			}
			else if ((is_func_block==true)&&(basic_mode==true))
			{
				if (descr_lookup[parent.type].nested_blocks==reg_block_actions_with_cond)
				{
					num_elems_to_show=reg_block_actions_with_cond.length-1; // exclude wait_until
				}
				else if (descr_lookup[parent.type].nested_blocks==reg_block_actions)
				{
					num_elems_to_show=reg_block_actions.length-1; // exclude wait_until
				}
			}
			if (num_elems_to_show>1)
			{
				str+="<select id=\"add_block_select_"+getID_FromIndex(index)+"\">";
				var prev_block_type=descr_lookup[parent.type].nested_blocks[0];
				var add_btn_pos=index[index.length-1];
				if (add_btn_pos>0)
				{
					prev_block_type=parent.sub_elems[add_btn_pos-1].type;
				}
				
				
				for(i=0;i<num_elems_to_show;i++)
				{
					if (prev_block_type==descr_lookup[parent.type].nested_blocks[i])
					{
						selected="selected";
					}
					else
					{
						selected="";
					}
					str+="<option "+selected+" value=\""+descr_lookup[parent.type].nested_blocks_exp[i].type+"\">"+descr_lookup[parent.type].nested_blocks_exp[i].title+"</option>";
				}
				str+="</select>";
				type_in_select="1";
			}
		}
		if (button_text!="")
		{
			str+="<button data-type_in_select=\""+type_in_select+"\" data-elem_index=\""+JSON.stringify(index)+"\" onclick=\"ARGEE_elem_descr.handleEvent("+event.ADD_ABOVE+",this);\">"+button_text+"</Button>";			
		}
		else
		{
			if (descr_lookup[parent.type].AddButtonText!=undefined)
			{
				str+="<button data-type_in_select=\""+type_in_select+"\" data-elem_index=\""+JSON.stringify(index)+"\" onclick=\"ARGEE_elem_descr.handleEvent("+event.ADD_ABOVE+",this);\">"+descr_lookup[parent.type].AddButtonText+"</Button>";			
			}
			else
			{
				str+="<button data-type_in_select=\""+type_in_select+"\" data-elem_index=\""+JSON.stringify(index)+"\" onclick=\"ARGEE_elem_descr.handleEvent("+event.ADD_ABOVE+",this);\">Add Block</Button>";
			}
		}
		
		
		if ((parent.type==block_types.root)&&(index[0]==(parent.sub_elems.length-1)))
		{
			// add "import library" after the last "add Library" button
			str+="<br><br><h3>Import Library:</h3><input type=\"file\" accept=\".st\" id=\"files\"  onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple />";
		}
		return str;
	}
	
	function VarRenderElemField(elem,field_num,index,fixed,special_background,after_render_above)
	{
		var str="";
		var i;
		var descr=descr_lookup[elem.type]
		var fields=descr.fields;
		var disabled="";
		
		if (elem.fixed_special==true)
		{
			disabled=" disabled ";
		}
		
		if 	((fields[field_num].type==field_types.enumeration)&&(fields[field_num].enum_elems==func_block_type)&&(basic_mode==true))
		{
			// in basic mode function block type is not rendered
			return str;
		}
		
		if (print_mode==true)
		{
			if (fields[field_num].type==field_types.enumeration)
			{
				str=fields[field_num].enum_elems[elem.values[field_num]];
			}
			else
			{
				if ((fields[field_num].empty_on_zero==true)&&(elem.values[field_num]==0))
				{
					str="";
				}
				if ((fields[field_num].render_above==true)&&(fields[field_num].funct_arg_test==true)
					&&(num(elem.values[2])==1))
				{
					str="arr_arg";	
				}
				else
				{
					str=elem.values[field_num];
				}
			}
			return str;
		}
		
		if (fields[field_num].type==field_types.str_num)
		{
			
			var color="inherit"
			var font_weight="inherit";
			if (special_background==true)
			{
				color="Blue";
				font_weight="bold";
			}

			var key_down_event="";
			if (fields[field_num].io_point_display==true)
			{
				key_down_event="data-elem_force_io_disp=\"true\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\"";
			}
			if (fields[field_num].param_point_display==true)
			{
				key_down_event="data-elem_force_param_disp=\"true\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\"";
			}
			if (fields[field_num].param_value_display==true)
			{
				key_down_event="data-elem_force_param_value_disp=\"true\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\"";
			}
			if (fields[field_num].init_inject==true)
			{
				key_down_event="data-elem_init_inject=\"true\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\"";
			}
			
			
			if (fixed==false)
			{
				var val=elem.values[field_num];
				var bg_color=""
				if (fields[field_num].empty_on_zero==true)
				{
					if (elem.values[field_num]==0)
					{
						val=""
					}
					else
					{
						bg_color="background-color :lightgreen;"
						val=elem.values[field_num];	
					}
				}
				if (fields[field_num].green_on_non_empty==true)
				{
					var bg_color=""
					if (elem.values[field_num].length>0)
					{
						bg_color="background-color :lightgreen;"
					}
				}
				
				
				if ((fields[field_num].render_above==true)&&(fields[field_num].funct_arg_test==true)
					&&(num(elem.values[2])==1))
				{
					val="arr_arg";	
               disabled=" disabled ";
				}
				


				var focus_designator="";
				if ((elem.focus==true)&&(field_num==0))
				{
					delete elem.focus;
					focus_designator=" data-elem_focus=\"true\" ";
				}
					
				if (fields[field_num].render_textarea!=undefined)
				{
					var rows=(val.split(/\r\n|\r|\n/).length);
					color="red";
					str+="<textarea  onkeyup=\"ARGEE_elem_descr.textAreaAdjust(this)\" rows=\""+rows+"\" "+key_down_event+focus_designator+"  style=\""+bg_color+"font-weight:"+font_weight+";color:"+color+";width:"+fields[field_num].width+"%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(index)+"\" data-elem_field=\""+field_num+"\">"+escapeHTML(val)+"</textarea>";
				}
				else
				{
					if ((after_render_above==true)&&(field_num==0))
					{
						//bg_color="background-color :chartreuse;";
						bg_color="background-color :#D8D8D8;"; 
						//font_weight="bold";
					}
					if (fields[field_num].width!=undefined)
					{
						str+="<input "+disabled+key_down_event+focus_designator+"  style=\""+bg_color+"font-weight:"+font_weight+";color:"+color+";width:"+fields[field_num].width+"em\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(index)+"\" data-elem_field=\""+field_num+"\" value=\""+escapeHTML(val)+"\">";
					}
					else
					{
						str+="<input "+disabled+key_down_event+focus_designator+" style=\""+bg_color+"font-weight:"+font_weight+";color:"+color+";\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(index)+"\" data-elem_field=\""+field_num+"\" value=\""+escapeHTML(val)+"\">";									
					}
				}
			}
			else
			{
				str+=elem.values[field_num];
			}
		}
		else if (fields[field_num].type==field_types.enumeration_special)
		{
			var color;
			var forced_redraw=false;
			disabled="";

			/*if (elem.values[0]=="connect")
			{
				var jk=1;
			}*/
			
			if (fixed==true)
			{
				disabled="disabled";
			}
			//style=\"background-color:red;\"
			var sel_index=fields[field_num].enum_elems.indexOf(elem.values[field_num]);
			if (sel_index==-1)
			{
				color="red";
			}
			else
			{
				if (fields[field_num].enum_elems==prog_var_types_enum)
				{
					// determine the color
					if (sel_index<fixed_var_types_enum)
					{
						color=prog_type_colors[sel_index];
					}
					else
					{
						color=prog_type_colors[fixed_var_types_enum];
					}
					forced_redraw=true;
				}
			}
			str+="<select "+disabled+" style=\"background-color:"+color+";\"   onchange=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" data-enum_forced_redraw=\""+forced_redraw+"\" data-elem_type=\"enum\" data-elem_index=\""+JSON.stringify(index)+"\" data-elem_field=\""+field_num+"\">";
			for(i=0;i<fields[field_num].enum_elems.length;i++)
			{
				var selected="";
				var opt_disabled="";
				var opt_name=fields[field_num].enum_elems[i];
				
				if (((fields[field_num].type==field_types.enumeration_special)&&(opt_name.localeCompare(default_task_type)==0))
					||
				    ((fields[field_num].type==field_types.enumeration_special)&&(GEN.getARM7_Mode()==true)&&((i==1)||(i==9)))
					||
				   ((fields[field_num].mask!=undefined)&&(fields[field_num].mask.indexOf(i)!=-1)))
				{
					opt_disabled=" disabled ";
					opt_name="-----";
				}
				if (i==sel_index)
				{
					selected="selected";
				}
				str+="<option style=\"background-color:white;\"  value=\""+i+"\" "+selected+opt_disabled+" >"+opt_name+"</option>";
			}
			str+="</select>";
			
		}
		else if (fields[field_num].type==field_types.enumeration)
		{
			var color;
			var forced_redraw=false;
			disabled="";
			
			if (fixed==true)
			{
				disabled="disabled";
			}
			if (fields[field_num].enum_elems==func_block_type)
			{
				// determine the color
				var sel_index=elem.values[field_num];
				color=func_block_type_colors[sel_index];
				forced_redraw=true;
			}
			else if (fields[field_num].enum_elems==arr_num_elems)
			{
				var sel_index=elem.values[field_num];
				color=arr_num_elems_colors[sel_index];
				forced_redraw=true;
			}
			else if (fields[field_num].enum_elems==func_block_var_segm)
			{
				var sel_index=elem.values[field_num];
				color=func_block_var_segm_color[sel_index];
				forced_redraw=true;
			}		
			else
			{
				color="inherit";
			}
			
			//onclick=\"ARGEE_elem_descr.exp_enum(this);\"
			str+="<select "+disabled+" style=\"background-color:"+color+";\"   onchange=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" data-enum_forced_redraw=\""+forced_redraw+"\" data-elem_type=\"enum\" data-elem_index=\""+JSON.stringify(index)+"\" data-elem_field=\""+field_num+"\">";
			for(i=0;i<fields[field_num].enum_elems.length;i++)
			{
				var selected="";
				var opt_disabled="";
				var opt_name=fields[field_num].enum_elems[i];
				if (((fields[field_num].type==field_types.enumeration_special)&&(opt_name.localeCompare(default_task_type)==0))
					||
				   ((fields[field_num].mask!=undefined)&&(fields[field_num].mask.indexOf(i)!=-1)))
				{
					opt_disabled=" disabled ";
					opt_name="-----";
				}
				if (i==elem.values[field_num])
				{
					selected="selected";
				}
				str+="<option style=\"background-color:white;\"  value=\""+i+"\" "+selected+opt_disabled+" >"+opt_name+"</option>";
			}
			str+="</select>";
			
		}
		/*
		else if (fields[field_num].type==field_types.actions_add_delete)
		{
			str+="<button data-elem_index=\""+JSON.stringify(index)+"\"  onclick=\"addAboveElem(this)\">Add Above</button>"
			str+="<button data-elem_index=\""+JSON.stringify(index)+"\"  onclick=\"ARGEE_var_edit.onDeleteElem(this)\">Delete</button>"			
		}
		else if (fields[field_num].type==field_types.actions_add_delete_init)
		{
			str+="<button data-elem_index=\""+JSON.stringify(index)+"\"  onclick=\"addAboveElem(this)\">Add Above</button>"
			str+="<button data-elem_index=\""+JSON.stringify(index)+"\"  onclick=\"ARGEE_var_edit.onDeleteElem(this)\">Delete</button>";
			if (elem.values[1]>3)
			{
				str+="<button data-elem_index=\""+JSON.stringify(index)+"\"  onclick=\"InitElem(this)\">Init</button>";
			}	
		}*/
		return str;
	}

	var pre_render_buf=[];
	var first_elem_render=true;
	
	function renderEditVars_imp(elem,index,parent)
	{
		var str="";
		var i,found; 
		var first_module=false;
		var descr=descr_lookup[elem.type];
		if (elem==parent)
		{
			first_elem_render=true;
		}
		found=false;

			
		if (descr.screens.indexOf(screens.var_scr)!=-1)
		{
			if (elem.type==block_types.function_block_group)
			{
				elem.hidden_sub=false;
			}
			
			
			if ((elem.type==block_types.add_block)&&(descr_lookup[parent.type].screens.indexOf(screens.var_scr)!=-1))
			{
				if ((print_mode==false)&&(hide_add_buttons==false))
				{
					if (parent.type==block_types.module)
					{
						str+="<br>"+generateAddButtonBlock(elem,index)+"<br>";
					}
					else
					{
						str+="<tr><td colspan=\"100%\">"+generateAddButtonBlock(elem,index)+"</td></tr>";
					}
				}
			}
			else if ((elem.type==block_types.module)||((descr.render_init!=true)&&(elem.sub_elems!=undefined)&&(descr.nested_blocks.length==1)))
			{
				if ((elem.type==block_types.module)&&(index[0]==1))
				{
					str+="<br><hr align=\"left\" style=\"width:80%\"><br>";
					/*elem.fixed_special=true;
					elem.values[0]="Local Program";
					elem.values[1]="1";*/
					elem.hidden_sub=true;
					found=false;
				}
				
				else if ((elem.type==block_types.funct_block_var)&&(elem.values[0].localeCompare(default_task_type)==0))
				{
					// don't render default task function block definition
				}
				else
				{
					
					

					if (elem.type==block_types.alias_vars)
					{
						str+="<br><hr align=\"left\" style=\"width:80%\"><br>";
						// horizontal line before the alias section		
						//str+="<tr><td style=\"border-top: 1px solid transparent;border-left: 1px solid transparent;border-right: 1px solid transparent;\" colspan=\"100%\"><br><hr><br></td></tr>";
					}	
					
					// if the first visible element (1) of the module is not function block group -> draw horizontal line
					/*if ((index.length==2)&&(index[0]==1)&&(index[1]==1)&&(elem.type!=block_types.function_block_group))
					{
						str+="<br><hr align=\"left\" style=\"width:80%\"><br>";
						//str+="<tr><td style=\"border-top: 1px solid transparent;border-left: 1px solid transparent;border-right: 1px solid transparent;\" colspan=\"100%\"><br><hr><br></td></tr>";
					}*/
					if (elem.type==block_types.module)
					{
						if (index[0]==1)
						{
							// first module is handled in the following way:
							// 1) non clickable "number" element
							// 2) always expanded
							// 3) non editable fixed name and version
							elem.fixed_special=true;
							elem.values[0]="Local Program";
							elem.values[1]="1";
							elem.hidden_sub=true;
						}
						str+="<br><hr align=\"left\" style=\"width:80%\"><br>";
					}

					

					
							
					
					
				
					/*if (elem.type==block_types.function_block_group)
					{
						str+="<br><hr align=\"left\" style=\"width:80%\"><br>";
						//str+="<tr><td style=\"border-top: 1px solid transparent;border-left: 1px solid transparent;border-right: 1px solid transparent;\" colspan=\"100%\"><br><hr><br></td></tr>";
					}*/
					
					str+="<table border=\"1\" style=\"border-collapse:collapse;\">";
					
					str+="<tr>";
					
					show_hide_str="&nbsp&nbsp&nbsp&nbsp";
					if ((descr.collapsable!=undefined)&&
					   (descr.draw_plus_minus!=false)&& // undefined is OK
					   (elem.fixed_special!=true)) // undefined is OK
					{
						var ind1=index.slice(0);
						show_hide_str="&nbsp&nbsp<a href='#' data-elem_index='"+JSON.stringify(ind1)+"' onclick=\"ARGEE_elem_descr.showHideElem(this)\">+</a>";
					}
						

					var elem_var_vis_descr=getVarElemAndLineFromIndex(index);

					
					if (elem.fixed_special==true)
					{
						str+="<td style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>";
					}
					else
					{
						str+="<td data-elem_index='"+JSON.stringify(index)+"' ondblclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);\"  style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"><a id=\"elem_line_id_"+getID_FromIndex(index)+"\" href='#' data-elem_index='"+JSON.stringify(index)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\"><b>"+(elem_var_vis_descr[1])+"</b></a>"+show_hide_str+"</td>";
					}
					elem.vis_elem_type=0;
					elem.index=clone(index);
					elem.vis_elem_item=curr_var_elem_cnt;
					
					curr_var_elem_cnt++;
					str+="<td bgcolor=\""+descr.color+"\" colspan=\"100%\">"
					if (descr.centered_title==true)
					{
						str+="<center>";
					}
					else
					{
						str+="&nbsp";
					}						
						
					/*if ((elem.type==block_types.function_block_group)||
					    (elem.type==block_types.funct_block_var)||
						(elem.type==block_types.enum_var))
					{
						str+="&nbsp&nbsp&nbsp&nbsp";
					}
					*/

					
						
						if (descr.fields!=undefined)
						{
							if (elem.hidden_sub==false)
							{
								str+="<font size=\"2\"><a href='#' data-elem_index='"+JSON.stringify(index)+"' onclick=\"ARGEE_elem_descr.gotoFuncBlock(this)\"><b>"+descr.title+"</b></a><b>&nbsp:&nbsp&nbsp</b></font>"
							}
							else
							{
								str+="<font size=\"2\"><a href='#' data-elem_index='"+JSON.stringify(index)+"' onclick=\"ARGEE_elem_descr.gotoFuncBlock(this)\"><b>"+descr.title+"</b></a><b>&nbsp:&nbsp&nbsp</b></font>"								
								//str+="<font size=\"4\"><a href='#' data-elem_index='"+JSON.stringify(index)+"' onclick=\"ARGEE_elem_descr.gotoFuncBlock(this)\"><b>"+descr.title+"</b></a><b>&nbsp:&nbsp&nbsp</b></font>"
							}
							//str+="</tr><tr><td></td><td bgcolor=\"yellow\" colspan=\"100%\">"
							//str+="<font size=\"4\"><b> : </b></font>"
							//str+="<center>"
							for(i=0;i<descr.fields.length;i++)
							{
								if (descr.displayFieldNames==true)
								{
									str+=descr.fields[i].field_name;
								}

								str+=VarRenderElemField(elem,i,index,false,true,false)+"&nbsp&nbsp&nbsp";
							}
							if ((elem.hidden_sub==false)&&(elem.type!=block_types.function_block_group))
							{
								str+=hide_str;
							}
							
							//str+="</center>"
						}
						else
						{
							if (elem.hidden_sub==false)
							{
								if (elem.type==block_types.enum_var)
								{
									// find the first enum element
									var j;
									var found=false;
									for(j=0;j<elem.sub_elems.length;j++)
									{
										if (elem.sub_elems[j].type==block_types.enum_var_elem)
										{
											found=true;
											break;
										}
									}
									if (found==true)
									{										
										str+="<font size=\"2\"><b>"+descr.title+" </b> ..."+elem.sub_elems[j].values[0]+"... "+hide_str+"</font>"
									}
									else
									{
										str+="<font size=\"2\"><b>"+descr.title+" </b> "+hide_str+"</font>";
									}
								}
								else
								{
									str+="<font size=\"2\"><b>"+descr.title+" </b> "+hide_str+"</font>"
								}
							}
							else
							{
								//str+="<font size=\"4\"><b>"+descr.title+"</b></font>"
								str+="<font size=\"2\"><b>"+descr.title+"</b></font>"
							}
						}
					if (descr.centered_title==true)
					{
						str+="</center>";
					}
					str+="</td></tr>";
					//if ((descr.fields!=undefined)&&(elem.hidden_sub==true))
					if ((elem.hidden_sub==true)&&(elem.type!=block_types.module))
					{
						str+="<tr><td colspan=\"100%\"><font size=\"1\">&nbsp</font></td></tr>";
					}
					if (elem.type!=block_types.function_block_group)
					{
						var descr_nested=descr_lookup[descr.nested_blocks[0]];
						var tmp_str="";
						if (elem.type!=block_types.module)
						{
							tmp_str+="<tr><th></th>"
							for(i=0;i<descr_nested.fields.length;i++)
							{
								if (descr_nested.fields[i].render_above!=true)
								{
									tmp_str+="<th>"+descr_nested.fields[i].field_name+"</th>";
								}
							}
							tmp_str+="</tr>";
						}
						if (elem.type==block_types.module)
						{
							tmp_str+="<tr><td colspan=\"100%\" style=\"padding-left:10px;border-color:transparent;\">";
							tmp_str+="<hr align=\"left\" style=\"width:80%\">";

						}
						for(i=0;i<elem.sub_elems.length;i++)
						{
							var tmp=index.slice(0);
							tmp.splice(tmp.length,0,i);
							tmp_str+=renderEditVars_imp(elem.sub_elems[i],tmp,elem);
						}
						if (elem.type==block_types.module)
						{
							tmp_str+="</td></tr>";
						}

						if (elem.hidden_sub!=false)
						{
							str+=tmp_str;
						}
					}
					str+="</table>";
				}
				if (!((elem.type==block_types.module)&&(index[0]==1)))
				{
					found=true;
				}
			}
			
			else if ((elem.sub_elems==undefined)||(descr.render_init==true))
			{
				if (elem.sub_elems!=undefined)
				{
					var num_elems=1;
					var compl_data_type=false;
					
					/*if (elem.hidden_sub==true)
					{
						var tmp=index.slice(0);
						tmp.splice(tmp.length,0,0);
						str+="<tr>";
						//str+="<td style=\"font-size:95%;\" data-elem_index='"+JSON.stringify(tmp)+"' style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"><a id=\"elem_line_id_"+getID_FromIndex(tmp)+"\" href='#' data-elem_index='"+JSON.stringify(tmp)+"' onclick=\"ARGEE_elem_descr.showHideElem(this)\">+</a></td>"
						str+="<td colspan=\"100%\"> hidden </td>"
						//str+="<td> hidden </td>"
						str+="</tr>";
					}
					else*/
					{
						if (elem.type==block_types.reg_var)
						{
							num_elems=num(elem.values[2])+1;
							if (num(getProgTypeInd(elem.values[1]))>(fixed_var_types_enum-1))
							{
								compl_data_type=true;
							}
						}
						
						
						if ((compl_data_type==true)||((num_elems>1)&&(num(getProgTypeInd(elem.values[1]))!=getStringTypeInd())))
						{
							// render init elements
							for(i=0;i<elem.sub_elems.length;i++)
							{
								var tmp=index.slice(0);
								tmp.splice(tmp.length,0,i);
								
								var elem_var_vis_descr=getVarElemAndLineFromIndex(tmp);
								
								str+="<tr>";
								str+="<td style=\"font-size:95%;border-bottom: 1px solid transparent;\" data-elem_index='"+JSON.stringify(tmp)+"' ondblclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);\"  style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\">&nbsp&nbsp<a id=\"elem_line_id_"+getID_FromIndex(tmp)+"\" href='#' data-elem_index='"+JSON.stringify(tmp)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\">"+(elem_var_vis_descr[1])+"</a></td>"
								elem.sub_elems[i].vis_elem_type=0;
								elem.sub_elems[i].index=clone(tmp);
								elem.sub_elems[i].vis_elem_item=curr_var_elem_cnt;
								
								curr_var_elem_cnt++;
								field_num=0;
								var field1;

								var focus_designator="";
								if ((elem.sub_elems[i].focus==true)&&(field_num==0))
								{
									delete elem.sub_elems[i].focus;
									focus_designator=" data-elem_focus=\"true\" ";
								}
				
								if (compl_data_type==true)
								{
								   field1="<input "+focus_designator+" style=\"font-size:95%;\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" data-glob_index=\""+JSON.stringify(index)+"\" data-loc_index=\""+JSON.stringify(index)+"\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(tmp)+"\" data-elem_field=\""+field_num+"\" value=\""+escapeHTML(elem.sub_elems[i].values[field_num])+"\">";																
								}
								else
								{
									if (elem.sub_elems[i].values[field_num].length==0)
									{
										elem.sub_elems[i].values[field_num]="[]";
									}
									field1="<input "+focus_designator+" style=\"font-size:95%;\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(tmp)+"\" data-elem_field=\""+field_num+"\" value=\""+escapeHTML(elem.sub_elems[i].values[field_num])+"\">";																
								}
									
								field_num=1;	
								if (elem.sub_elems[i].editable==true)
								{
									if ((elem.values[1].toUpperCase()=="STRING")&&(elem.sub_elems[i].values[field_num].length==0))
									{
										elem.sub_elems[i].values[field_num]="\"\"";
									}
								}								
								var field2="<input style=\"font-size:95%;\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(tmp)+"\" data-elem_field=\""+field_num+"\" value=\""+escapeHTML(elem.sub_elems[i].values[field_num])+"\">";																
								
								if (elem.sub_elems[i].editable==true)
								{
									str+="<td style=\"font-size:95%;border-bottom: 1px solid transparent;\" colspan=\"100%\"><b> INIT "/*+elem.values[0]*/+" </b>:  "+field1+"="+field2+" </td>";
								}
								else
								{
									str+="<td data-elem_edit_index=\""+JSON.stringify(tmp)+"\" style=\"font-size:95%;border-bottom: 1px solid transparent;\" colspan=\"100%\"><b> INIT "/*+elem.values[0]*/+" </b>:  "+elem.sub_elems[i].values[0]+"="+elem.sub_elems[i].values[1]+" </td>";
								}
									
								str+="</tr>"
							}
						}
						else if (elem.sub_elems.length>0)
						{
							var tmp=index.slice(0);
							tmp.splice(tmp.length,0,0);
							
							var elem_var_vis_descr=getVarElemAndLineFromIndex(tmp);
							
							str+="<tr>";
							str+="<td  style=\"font-size:95%;border-bottom: 1px solid transparent;\" data-elem_init_ind='"+1+"' data-elem_index='"+JSON.stringify(tmp)+"' style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\">&nbsp&nbsp<a id=\"elem_line_id_"+getID_FromIndex(tmp)+"\" href='#' data-elem_index='"+JSON.stringify(tmp)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\">"+(elem_var_vis_descr[1])+"</a></td>"
							elem.sub_elems[0].vis_elem_type=0;
							elem.sub_elems[0].index=clone(tmp);
							elem.sub_elems[0].vis_elem_item=curr_var_elem_cnt;
							
							curr_var_elem_cnt++;
							field_num=1;
							
							var focus_designator="";
							if ((elem.sub_elems[0].focus==true)&&(field_num==1))
							{
								delete elem.sub_elems[0].focus;
								focus_designator=" data-elem_focus=\"true\" ";
							}
							
							i=0;
							if (elem.sub_elems[0].editable==true)
							{
								if ((elem.values[1].toUpperCase()=="STRING")&&(elem.sub_elems[0].values[field_num].length==0))
								{
									elem.sub_elems[0].values[field_num]="\"\"";
								}
							}
							
							var field2="<input "+focus_designator+" style=\"font-size:95%;\" onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this)\" type=\"text\" data-elem_type=\"str\" data-elem_index=\""+JSON.stringify(tmp)+"\" data-elem_field=\""+field_num+"\" value=\""+escapeHTML(elem.sub_elems[0].values[field_num])+"\">";
							if (elem.sub_elems[0].editable==true)
							{
								
								str+="<td style=\"font-size:95%;border-bottom: 1px solid transparent;\" colspan=\"100%\"> <b>INIT  "/*+elem.values[0]*/+" </b>:  "+field2+" </td>";
							}
							else
							{
								str+="<td data-elem_edit_index=\""+JSON.stringify(tmp)+"\" style=\"font-size:95%;border-bottom: 1px solid transparent;\" colspan=\"100%\"> <b>INIT  "/*+elem.values[0]*/+" </b>:  "+elem.sub_elems[0].values[field_num]+" </td>";
							}
							str+="</tr>"
						}
					}
						
				}
				
				if (descr.fields!=undefined)
				{
					var color="white";
					if (elem.values[0].localeCompare(default_task_name)!=0)
					{
						var render_above_criteria_met=false;
						// check all fields which are rendered above
						for(i=0;i<descr.fields.length;i++)
						{
							if (descr.fields[i].render_above==true)
							{
								if (((descr.fields[i].green_on_non_empty==true)&&(elem.values[i]!=""))||
								   ((descr.fields[i].empty_on_zero==true)&&((num(elem.values[i])!=0)&&(elem.values[i]!=""))))
								   {
										str+="<tr><td style=\"border-bottom: 1px solid transparent;\" ></td><td style=\"border-bottom: 1px solid transparent;\" colspan=\"100%\">"+descr.fields[i].field_name+":&nbsp&nbsp"+VarRenderElemField(elem,i,index,false,false,false)+"&nbsp&nbsp"+descr.fields[i].help_string+"</td></tr>"
										render_above_criteria_met=true;
								   }
							}
						}
						// regular field rendering
						
						
						str+="<tr>";
						if ((descr.fields.length>1)&&(descr.fields[1].type==field_types.enumeration_special)&&(descr.fields[1].enum_elems==prog_var_types_enum))
						{
							block=findFunctBlock(elem.values[1]);
							if ((block!=null)&&(num(block.values[1])!=0))
							{
								color=task_color_in_vars;
							}
						}
						
						var show_hide_str="";
						var elem_var_vis_descr=getVarElemAndLineFromIndex(index);
						
						//str+="<td style=\"background-color:"+color+";\" data-elem_index='"+JSON.stringify(index)+"' ondblclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);\"  style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"><a id=\"elem_line_id_"+getID_FromIndex(index)+"\" href='#' data-elem_index='"+JSON.stringify(index)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\">"+(curr_var_elem_cnt)+"</a>"+show_hide_str+"</td>"
						str+="<td bgcolor=\""+color+"\" data-elem_index='"+JSON.stringify(index)+"' ondblclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);\"  style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\">&nbsp&nbsp<a id=\"elem_line_id_"+getID_FromIndex(index)+"\" href='#' data-elem_index='"+JSON.stringify(index)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\">"+(elem_var_vis_descr[1])+"</a>"+show_hide_str+"</td>"					
						elem.vis_elem_type=0;
						elem.index=clone(index);
						elem.vis_elem_item=curr_var_elem_cnt;
						
						curr_var_elem_cnt++;
						for(i=0;i<descr.fields.length;i++)
						{
							if (elem.type==block_types.comment_var)
							{
								str+="<td style=\"background-color:yellow;\" colspan=\"100%\"><table style=\"width:100%;\"><tr style=\"width:100%;\"><td>Comment:</td><td style=\"width:100%;\">"+VarRenderElemField(elem,i,index,false,false,false)+"</td></tr></table></td>"
							}
							else
							{
								if (descr.fields[i].render_above!=true)
								{
									str+="<td>"+VarRenderElemField(elem,i,index,false,false,render_above_criteria_met)+"</td>"
								}
							}
						}
						str+="</tr>";
					}
				}
			}
		}
		
		if ((found==false)&&(elem.sub_elems!=undefined))
		{
			for(i=0;i<elem.sub_elems.length;i++)
			{
				var tmp=index.slice(0);
				tmp.splice(tmp.length,0,i);
				
				str+=renderEditVars_imp(elem.sub_elems[i],tmp,elem);
				/*
				// All members of the function block group are expanded/contracted together. A member is an element which appears between 2 function block groups
				if ((elem.sub_elems[i].type==block_types.function_block_group)
					&&(elem.sub_elems[i].hidden_sub==false)
					)
				{
					var jk1=1;
					i++;
					for(;i<elem.sub_elems.length;i++)	
					{
						// hide all except for function block groups
						if (elem.sub_elems[i].type==block_types.function_block_group)
						{
							str+=renderEditVars_imp(elem.sub_elems[i],tmp,elem);
							if (elem.sub_elems[i].hidden_sub!=false)
							{
								// if function block group is expanded - stop hiding
								break;
							}
						}
					}
					
				}*/

				
			}
		}
		
		return str;
	}
	
	
	var trigger_glob_refresh=false;

	function handleElemOp(parent,type,index,op,val,elem_field)
	{
		//var elem_descr=descr_lookup[type];
		var last_index_elem=index[index.length-1];
		var elem;
		if (op==event.ADD_ABOVE)
		{
			if ((type==block_types.module)&&(parent.sub_elems[last_index_elem-1].type==block_types.hmi_special))
			{
				elem=createNewElem(descr_lookup[type]);
				parent.sub_elems.splice(last_index_elem-1,0,elem);
			}
			else
			{
				elem=createNewElem(descr_lookup[type]);
				parent.sub_elems.splice(last_index_elem,0,elem);
			}
				
			if (descr_lookup[type].custom_event_handle!=undefined){descr_lookup[type].custom_event_handle(op,null,elem,null,null);}
			
		}
		if (op==event.ADD_BELOW)
		{
			elem=createNewElem(descr_lookup[type]);
			parent.sub_elems.splice(last_index_elem+1,0,elem);
			if (descr_lookup[type].custom_event_handle!=undefined){descr_lookup[type].custom_event_handle(op,null,elem,null,null);}
			
		}
		if (op==event.DEL)
		{
			elem=parent.sub_elems[last_index_elem];
			parent.sub_elems.splice(last_index_elem,1);
			if (descr_lookup[elem.type].custom_event_handle!=undefined){descr_lookup[elem.type].custom_event_handle(op,null,elem,null,null);}
			
		}
		if (op==event.CHANGE)
		{
			elem=parent.sub_elems[last_index_elem];
			
         
         
			if (((elem.values[elem_field]!=val)&&(elem_field==0)&&
			    ((elem.type==block_types.funct_block_elem_var)||
				 (elem.type==block_types.funct_block_var)||
				 (elem.type==block_types.function_block_group)||
				 (elem.type==block_types.reg_var)||
				 (elem.type==block_types.alias_var)||
				 (elem.type==block_types.module)||
				 (elem.type==block_types.enum_var_elem)
				 ))||
				 ((elem.values[elem_field]!=val)&&(elem_field==1)&&(elem.type==block_types.alias_var))||
				 ((elem.values[elem_field]!=val)&&(elem_field==1)&&(elem.type==block_types.module))
				 )
				 
			{
				trigger_glob_refresh=true;
				if (val.length==0)
				{
					alert("Empty variables are not allowed");
					return elem;
				}
				var res;
				if ((elem_field==1)&&(elem.type==block_types.module))
				{
					if (isVersionString(val)==false)
					{
						return elem;
					}
				}
				else if ((res=checkIfVarChangeValid(parent,elem,val))==-1)
				{
					if ((elem_field==1)&&(elem.type==block_types.alias_var))
					{
						if (stringCompatibleWithAliasVariables(val)==false)
						{
							alert("Invalid alias name");
							return elem;
						}
					}
					else
					{
						return elem;
					}
				}
				else if (res==false)
				{
					return elem;
				}
			}
         
         // when a new field is added and the name is recorded, the global refresh is unnessesary since there are no such variables to be renamed
         if ((elem_field==0)&&(elem.values[elem_field]!=val)&&(elem.values[elem_field].length==0)&&
            ((elem.type==block_types.reg_var)||(elem.type==block_types.funct_block_elem_var)))
         {
            trigger_glob_refresh=false;
         }
			
			
			
			// XOR function - easier this way
			if (((op==event.CHANGE)&&(elem.values[elem_field]!=val))||((op!=event.CHANGE)))
			{
				
				if (descr_lookup[elem.type].custom_event_handle!=undefined){descr_lookup[elem.type].custom_event_handle(op,parseInt(elem_field),elem,val,elem.values[elem_field]);}
			}
			
			if ((elem.values[elem_field]!=val)&&(descr_lookup[elem.type].fields[elem_field].refresh_on_change==true))
			{
				forced_refresh=true;
			}
			if ((elem.values[elem_field]!=val)&&(elem_field==0)&&
			    ((elem.type==block_types.funct_block_elem_var)||
				 (elem.type==block_types.funct_block_var)||
				 (elem.type==block_types.function_block_group)||
				 (elem.type==block_types.reg_var)||
				 (elem.type==block_types.alias_var)||
				 (elem.type==block_types.enum_var_elem)
				 ))
			{
				changeVarName(parent,elem,val);
			}
			
			if (descr_lookup[elem.type].fields[elem_field].type==field_types.enumeration_special)
			{
				elem.values[elem_field]=descr_lookup[elem.type].fields[elem_field].enum_elems[num(val)];
			}
			else
			{
				elem.values[elem_field]=val;
			}
		}
		return elem;
	}
	

	var redraw_list=[{scr:screens.var_scr,func:renderEditVars},{scr:screens.prog_scr,func:renderProg}];
	
	var clipboard_buffer=[];	
	var last_clip_element_type=-1;
	var forced_refresh=false;
	
	
	
	function autoAdjustTypesAfterOp(elem,new_val_arr,old_val_arr,change)
	{
		var i;
		if (descr_lookup[elem.type].fields!=undefined)
		{
			for(i=0;i<descr_lookup[elem.type].fields.length;i++)
			{
				if ((descr_lookup[elem.type].fields[i].type==field_types.enumeration_special)&&
				    (descr_lookup[elem.type].fields[i].enum_elems==prog_var_types_enum))
				{
					if (change==true)
					{
						var old_ind=old_val_arr.indexOf(elem.values[i]);
						elem.values[i]=new_val_arr[old_ind];
					}
					else
					{
						// TODO
					}
				}
			}
		}
		if (elem.sub_elems!=undefined)
		{
			for(i=0;i<elem.sub_elems.length;i++)
			{
				autoAdjustTypesAfterOp(elem.sub_elems[i],new_val_arr,old_val_arr,change)
			}
		}
	}

	// when cutting/pasting modules -> we need to propagate operations to individual function blocks contained in this module
	function moduleMod(act_event,field,elem,new_val,old_value)
	{
		for(var i=0;i<elem.sub_elems.length;i++)
		{
			if (elem.sub_elems[i].type==block_types.funct_block_var)
			{
				if ((act_event==event.PASTE_ABOVE)||
				    (act_event==event.PASTE_BELOW)||
					(act_event==event.DEL)||
					(act_event==event.CUT)
				   )
				{
					functBlockMod(act_event,0,elem.sub_elems[i],0,0);
				}
			}
		}
	}	
	
	function functBlockMod(act_event,field,elem,new_val,old_value)
	{
		var new_prog_type_enums=clone(prog_var_types_enum);
		if ((act_event==event.ADD_ABOVE)||(act_event==event.ADD_ABOVE)||
		    (act_event==event.PASTE_ABOVE)||(act_event==event.PASTE_BELOW))
		{
			new_prog_type_enums[new_prog_type_enums.length]=elem.values[0];
		}
		if ((act_event==event.DEL)||(act_event==event.CUT))
		{
			// find element with this name
			var ind=new_prog_type_enums.indexOf(elem.values[0]);
			if (ind!=(new_prog_type_enums.length-1))
			{
				new_prog_type_enums[ind]=new_prog_type_enums[new_prog_type_enums.length-1]
			}
			new_prog_type_enums.splice(new_prog_type_enums.length-1,1);
		}
		if (act_event==event.CHANGE)
		{
			var ind=new_prog_type_enums.indexOf(old_value);
			new_prog_type_enums[ind]=new_val;
		}
		if (act_event!=event.CHANGE)
		{
			autoAdjustTypesAfterOp(proj_elems,new_prog_type_enums,prog_var_types_enum,false);
		}
		else
		{
			autoAdjustTypesAfterOp(proj_elems,new_prog_type_enums,prog_var_types_enum,true);
		}
		forced_refresh=true;
		setNewTypeEnum(new_prog_type_enums);
		proj_elems.prog_var_types_enum=prog_var_types_enum;
	}
	
	var undo_restore_point=null;
	var MAX_UNDO_POINTS=32;
	
	function refillArray(arr_old,arr_new)
	{
		var i;
		arr_old.length=0;
		for(i in arr_new)
		{
			arr_old[i]=arr_new[i];
		}
		
	}
	
	function performUndo()
	{
		if ((curr_undo_pos>0)&&(undo_points[curr_undo_pos-1]!=undefined))
		{
			curr_undo_pos--;
			var elem=undo_points[curr_undo_pos];
			proj_elems.sub_elems=fastClone(elem[0]);
			refillArray(func_block_help_strings,fastClone(elem[1]));
			refillArray(func_block_barebone_strings,fastClone(elem[2]));
			refillArray(func_block_pointers,fastClone(elem[3]));
			refillArray(prog_var_types_enum,fastClone(elem[4]));
			refillArray(hmi_image_variables,fastClone(elem[5]));
			refillArray(proj_elems.prog_var_types_enum,fastClone(elem[6]));
			setLocalStorage("prog_code",JSON.stringify(proj_elems));
			renderCombined(true);
		}
	}
	
	var undo_points=[];
	var curr_undo_pos;
	var last_active_undo;


	function getUndoPoints()
	{
		return [undo_points,curr_undo_pos,last_active_undo]
	}
	
	function addUndo()
	{
		/*if (curr_undo_pos<30)
		{
			curr_undo_pos++;
		}*/
		curr_undo_pos++;
		undo_points[curr_undo_pos]=[fastClone(proj_elems.sub_elems),
		                            fastClone(func_block_help_strings),
									fastClone(func_block_barebone_strings),
									fastClone(func_block_pointers),
									fastClone(prog_var_types_enum),
									fastClone(hmi_image_variables),
									fastClone(prog_var_types_enum),
									];
									
		last_active_undo=curr_undo_pos;
		var i,num_undo,earliest_undo;
		
		earliest_undo=0;
		for(i=curr_undo_pos,num_undo=0;i>=0;i--,num_undo++)
		{
			if (undo_points[i]==undefined)
			{
				break;
			}
			earliest_undo=i;
		}
		if (num_undo>MAX_UNDO_POINTS)
		{
			delete undo_points[earliest_undo];
		}
			
		
	}
	function performRedo()
	{
		if (curr_undo_pos<last_active_undo)
		{
			curr_undo_pos++;
			var elem=undo_points[curr_undo_pos];
			proj_elems.sub_elems=fastClone(elem[0]);
			refillArray(func_block_help_strings,fastClone(elem[1]));
			refillArray(func_block_barebone_strings,fastClone(elem[2]));
			refillArray(func_block_pointers,fastClone(elem[3]));
			refillArray(prog_var_types_enum,fastClone(elem[4]));
			refillArray(hmi_image_variables,fastClone(elem[5]));
			refillArray(proj_elems.prog_var_types_enum,fastClone(elem[6]));
			setLocalStorage("prog_code",JSON.stringify(proj_elems));
			renderCombined(true);
		}
	}
	
	
	function addToCllipboard(act_elem)
	{
		clipboard_buffer[act_elem.type]=clone(act_elem);
		last_clip_element_type=act_elem.type;	
	}
	
	
	function findNameInParent(parent,search_str)
	{
		var i;
		for(i=0;i<parent.sub_elems.length;i++)
		{
			if (parent.sub_elems[i].values[0]==search_str)
			{
				return true;
			}
		}
		return false;
	}
	
	var adaptable_elements=
	[
		block_types.ladder_assign,block_types.assign,
		block_types.ladder_trace,block_types.trace,
		block_types.ladder_func_block_call,block_types.func_block_call,
	];
	
	// tries to allow copying elements from conditions to ifs and the other way around
	function adaptElementsBeforePaste(parent_to_type, list)
	{
		var i,j;
		var cmp_offset;
		var repl_offset;
		var parent_from_type=-1;
		for(i=0;i<list.length;i++)
		{
			if (cond_block_actions.indexOf(list[i].type)!=-1)
			{
				parent_from_type=block_types.ladder_condition;
				break;
			}
		}
		
		if ((parent_from_type==block_types.ladder_condition)&&(parent_to_type!=block_types.ladder_condition))
		{
			cmp_offset=0;
			repl_offset=1;
		}
		else if ((parent_from_type!=block_types.ladder_condition)&&(parent_to_type==block_types.ladder_condition))
		{
			cmp_offset=1;
			repl_offset=0;
		}
		else
		{
			// no adaptation nessesary
			return;
		}
			
		// check if adaptation is possible	
		for(i=0;i<list.length;i++)
		{
			var found=false;
			for(j=0;j<(adaptable_elements.length)/2;j++)
			{
				if (adaptable_elements[2*j+cmp_offset]==list[i].type)
				{
					found=true;
					break;
				}
			}
			if (found==false)
			{
				return; // no adaptation is possible
			}
		}
		// perform adaptation
		for(i=0;i<list.length;i++)
		{
			var found=false;
			for(j=0;j<(adaptable_elements.length)/2;j++)
			{
				if (adaptable_elements[2*j+cmp_offset]==list[i].type)
				{
					list[i].type=adaptable_elements[2*j+repl_offset];
					break;
				}
			}
		}
	}
	
	function handleEvent(act_event,elem)
	{
		var i,j;
		var index=JSON.parse(elem.dataset.elem_index);
		var elem_field=elem.dataset.elem_field;
		var val=parseInt(elem.value);
		var type=val;
		var parent=getParentArr(index);
		var last_index_elem=index[index.length-1];
		var act_elem=parent.sub_elems[last_index_elem];
		forced_refresh=false;

		var elem_with_focus=document.activeElement
		if (((elem_with_focus.tagName.toUpperCase()=="INPUT")||(elem_with_focus.tagName.toUpperCase()=="TEXTAREA"))&&(act_event!=event.CHANGE))
		{
			// onblur delayed -> force onblur
			handleEvent(event.CHANGE,elem_with_focus);
		}
			

		
		
		trigger_glob_refresh=false;
		clearErrorLine(); // clear Error line
		
		
		if (ARGEE_elem_dlg.getContextMenuDisplayed()==true)
		{
			clearBlockSelection();
			return;
		}
		
		if (elem.dataset.type_in_select=="1")
		{
			var id_str="add_block_select_"+getID_FromIndex(index);
			var sel=document.getElementById(id_str);
			type=parseInt(sel.value);
		}
		else if (elem.dataset.type_in_select=="0")
		{
			if (descr_lookup[parent.type].AddButtonBlockType!=undefined)
			{
				type=descr_lookup[parent.type].AddButtonBlockType;
			}
			else
			{
				type=descr_lookup[parent.type].nested_blocks[0];
			}
			
		}

		
		switch(act_event)
		{
			case event.FORCE_NON_ZERO_RENDER_ABOVE:
				var act_elem_descr=descr_lookup[act_elem.type];
				for(i=0;i<act_elem_descr.fields.length;i++)
				{
					if (act_elem_descr.fields[i].render_above==true)
					{
						if ((act_elem_descr.fields[i].empty_on_zero==true)&&((act_elem.values[i]=="")||(num(act_elem.values[i])==0)))
						{
							act_elem.values[i]=2;
						}
						else
						{
							act_elem.values[i]="0";
						}
					}
				}
			
				forced_refresh=true;
				break;
			case event.REMOVE_MODULE:
				var conf=confirm("Pressing \"OK\" will remove the function blocks and enums that are part of the function block group");
				if (conf==true)
				{
					handleElemOp(parent,0,index,event.DEL,0,0);
					for(i=last_index_elem;i<parent.sub_elems.length;)
					{
						if (parent.sub_elems[i].type==block_types.function_block_group)
						{
							break;
						}
						var ind1=fastClone(index);
						ind1[ind1.length-1]=i;
						// type,val,elem_field doesn't matter
						handleElemOp(parent,0,ind1,event.DEL,0,0);
					}
				}
				break;
			case event.EDIT_INIT:
				if (act_elem.editable==false)
				{
					act_elem.editable=true;
					act_elem.focus=true;
				}
				else
				{
					act_elem.editable=false;
				}
				
				break;
				
			case event.ADD_INIT:
				if (act_elem.sub_elems==undefined)
				{
					act_elem.sub_elems=[];
				}
				if ((prog_var_types_enum.indexOf(act_elem.values[1])<fixed_var_types_enum)&&(act_elem.values[2]==0)&&(act_elem.sub_elems.length==1))
				{
					act_elem.sub_elems[0].editable=true;
				}
				else
				{
					act_elem.sub_elems.splice(0,0,createNewElem(findBlockDescr(block_types.init_elem_var)));
				}
				act_elem.sub_elems[0].focus=true;
				forced_refresh=true;
			
			    break;
			case event.COMMENT_VAR:				
				parent.sub_elems.splice(last_index_elem,0,createNewElem(findBlockDescr(block_types.comment_var))); 
				forced_refresh=true;
				break;
			case event.CHANGE:
				val=elem.value;
				restorePrevCompilerMessage();
				if ((act_elem.editable!=undefined)&&(elem_field==1))
				{
					act_elem.editable=false;
					forced_refresh=true;
				}
				/*if (descr_lookup[act_elem.type].refresh_on_change==true)
				{
					forced_refresh=true;
				}*/
				if (descr_lookup[act_elem.type].refresh_on_change_prefix==true)
				{
					// find the first "(" symbol
					var act_str_pos=act_elem.values[0].indexOf("(");
					if (act_str_pos==-1)
					{
						act_str_pos=act_elem.values[0].length;
					}
					var new_str_pos=val.indexOf("(");
					if (new_str_pos==-1)
					{
						new_str_pos=val.length;
					}
					if ((act_str_pos!=new_str_pos)||
					   (act_elem.values[0].substr(0,act_str_pos)!=val.substr(0,new_str_pos)))
					{
						forced_refresh=true;
					}
				}
				
				if ((descr_lookup[act_elem.type].render_init==true)&&(elem_field==1))
				{
					delete act_elem.sub_elems;
					forced_refresh=true;
				}
				if ((act_elem.type==block_types.reg_var)&&
				    (elem_field==1)&&(act_elem.values[1]!="String")&&
					(prog_var_types_enum[num(val)]=="String")&&(act_elem.values[2]==0))
				{
					act_elem.values[2]=32;
					forced_refresh=true;
				}
				if ((act_elem.type==block_types.funct_block_elem_var)&&
				    (elem_field==1)&&(act_elem.values[1]!="String")&&
					(prog_var_types_enum[num(val)]=="String")&&(act_elem.values[3]==0))
				{
					act_elem.values[3]=32;
					forced_refresh=true;
				}
				
				
			case event.DEL:
			case event.ADD_ABOVE:
			case event.ADD_BELOW:
				 var add_another_button=false;
				 var another_button_type=0;
			     if (act_elem.type==block_types.add_block)
				 {
					 
					 /*if ((act_elem.selected!=undefined)&&(type!=act_elem.selected)&&(descr_lookup[type].screens.indexOf(screens.var_scr)!=-1))
					 {
						 add_another_button=true;
						 another_button_type=act_elem.selected;
					 }*/
					 act_elem.selected=type;
				 }
				 handleElemOp(parent,type,index,act_event,val,elem_field);
				 /*if (add_another_button==true)
				 {
					 var el=handleElemOp(parent,block_types.add_block,index,event.ADD_ABOVE,val,elem_field);
					 el.selected=another_button_type;
				 }*/
					 
				 break;
			case event.DBL_CLICK:
			{
				 if ((act_elem.type==block_types.prog_vars)||(act_elem.type==block_types.alias_vars))
				 {
					 clearBlockSelection();
					 return;
				 }
					 
				 // add remove add_block
				 if (act_elem.type==block_types.init_elem_var)
				 {
					 handleElemOp(parent,act_elem.type,index,event.ADD_ABOVE,val,elem_field);
					 //forced_refresh=true;
					 //redraw_list[screens.var_scr].func();
				 }
				 /*else  if (index[index.length-1]==0)
				 {
					 break;
				 }*/
				 else
				 {
					 if (index[index.length-1]==0)
					 {
						handleElemOp(parent,block_types.add_block,index,event.ADD_ABOVE,val,elem_field);  
					 }
					 else
					 {
						 index[index.length-1]=index[index.length-1]-1;
						 last_index_elem=index[index.length-1];
						 if (parent.sub_elems[last_index_elem].type==block_types.add_block)
						 {
							 handleElemOp(parent,type,index,event.DEL,val,elem_field);
						 }
						 else
						 {
							 handleElemOp(parent,block_types.add_block,index,event.ADD_BELOW,val,elem_field);
						 }
					 }
				 }
				 break;
			}
			case event.COMMENT_OUT:
				 setCommentedState(act_elem,1);
				 break;
			case event.UNCOMMENT:
				 setCommentedState(act_elem,0);
				 break;				 
			case event.CUT:
			     handleElemOp(parent,type,index,event.DEL,val,elem_field);
				 clearBlockSelectedElements();
			case event.COPY:
				 clipboard_buffer[act_elem.type]=clone(act_elem);
				 last_clip_element_type=act_elem.type;
				 clearBlockSelectedElements();
				 break;
         case event.PASTE_INTO:
				 
				 if (block_selected_elements.length>1)
				 {
					var cloned_elements=fastClone(block_selected_elements); 
					adaptElementsBeforePaste(act_elem.type,cloned_elements);
					var first_elem=cloned_elements[0]; 
					if ((descr_lookup[act_elem.type].nested_blocks.indexOf(first_elem.type)!=-1)||
				     ((descr_lookup[act_elem.type].hidden_blocks!=undefined)&&(descr_lookup[act_elem.type].hidden_blocks.indexOf(first_elem.type)!=-1)))
					 {
						for(i=0;i<cloned_elements.length;i++)
						{
							act_elem.sub_elems.splice(0+i,0,cloned_elements[i]); 
						} 
					 }
				 }
				 else
				 {
                var elem_to_paste;
					 elem_to_paste=fastClone(clipboard_buffer[last_clip_element_type]);
					 if (elem_to_paste==undefined)
					 {
						 return false;
					 }
					 adaptElementsBeforePaste(act_elem.type,[elem_to_paste]);
					 if (descr_lookup[elem_to_paste.type].delete_from_clipboard_after_paste==true)
					 {
						 clipboard_buffer.splice(last_clip_element_type,1);
					 }
					 last_clip_element_type=elem_to_paste.type; // after adaptaion
					 
					 if ((descr_lookup[act_elem.type].nested_blocks.indexOf(last_clip_element_type)!=-1)||
						 ((descr_lookup[act_elem.type].hidden_blocks!=undefined)&&(descr_lookup[act_elem.type].hidden_blocks.indexOf(last_clip_element_type)!=-1)))
					 
					 {
						act_elem.sub_elems.splice(0,0,elem_to_paste);
						if (descr_lookup[elem_to_paste.type].custom_event_handle!=undefined){descr_lookup[elem_to_paste.type].custom_event_handle(act_event,null,elem_to_paste,null,null);}
					 }
				 }
				 break;
			case event.PASTE_ABOVE:
				 
				 if (block_selected_elements.length>1)
				 {
					var cloned_elements=fastClone(block_selected_elements); 
					adaptElementsBeforePaste(parent.type,cloned_elements);
					var first_elem=cloned_elements[0]; 
					if ((descr_lookup[parent.type].nested_blocks.indexOf(first_elem.type)!=-1)||
				     ((descr_lookup[parent.type].hidden_blocks!=undefined)&&(descr_lookup[parent.type].hidden_blocks.indexOf(first_elem.type)!=-1)))
					 {
						for(i=0;i<cloned_elements.length;i++)
						{
							parent.sub_elems.splice(last_index_elem+i,0,cloned_elements[i]); 
						} 
					 }
				 }
				 else
				 {
					 act_elem=fastClone(clipboard_buffer[last_clip_element_type]);
					 if (act_elem==undefined)
					 {
						 return false;
					 }
					 adaptElementsBeforePaste(parent.type,[act_elem]);
					 if (descr_lookup[act_elem.type].delete_from_clipboard_after_paste==true)
					 {
						 clipboard_buffer.splice(last_clip_element_type,1);
					 }
					 last_clip_element_type=act_elem.type; // after adaptaion
					 
					 if ((descr_lookup[parent.type].nested_blocks.indexOf(last_clip_element_type)!=-1)||
						 ((descr_lookup[parent.type].hidden_blocks!=undefined)&&(descr_lookup[parent.type].hidden_blocks.indexOf(last_clip_element_type)!=-1)))
					 
					 {
						 if (act_elem.type==block_types.funct_block_var)
						 {
							 while (DESCR.findFunctBlock(act_elem.values[0])!=null)
							 {
								act_elem.values[0]=act_elem.values[0]+"_1";
							 }
						 }
						 if ((act_elem.type==block_types.enum_var_elem)||(act_elem.type==block_types.funct_block_elem_var)||
							(act_elem.type==block_types.reg_var)||
							(act_elem.type==block_types.alias_var))
							{
								while (findNameInParent(parent,act_elem.values[0])==true)
								{
									act_elem.values[0]=act_elem.values[0]+"_1";
								}
							}
						parent.sub_elems.splice(last_index_elem,0,act_elem);
						if (descr_lookup[act_elem.type].custom_event_handle!=undefined){descr_lookup[act_elem.type].custom_event_handle(act_event,null,act_elem,null,null);}
					 }
				 }
				 break;
			case event.PASTE_BELOW:
			     
				 if (block_selected_elements.length>1)
				 {
					var cloned_elements=fastClone(block_selected_elements); 
					adaptElementsBeforePaste(parent.type,cloned_elements);
					var first_elem=cloned_elements[0]; 
					if ((descr_lookup[parent.type].nested_blocks.indexOf(first_elem.type)!=-1)||
				     ((descr_lookup[parent.type].hidden_blocks!=undefined)&&(descr_lookup[parent.type].hidden_blocks.indexOf(first_elem.type)!=-1)))
					 {
						for(i=0;i<cloned_elements.length;i++)
						{
							parent.sub_elems.splice(last_index_elem+1,0,cloned_elements[cloned_elements.length-1-i]);
						}
					 }
				 }
				 else
				 {
					 act_elem=fastClone(clipboard_buffer[last_clip_element_type]);
					 if (act_elem==undefined)
					 {
						 return false;
					 }
					 if (descr_lookup[act_elem.type].delete_from_clipboard_after_paste==true)
					 {
						 clipboard_buffer.splice(last_clip_element_type,1);
					 }
					 adaptElementsBeforePaste(parent.type,[act_elem]);
					 last_clip_element_type=act_elem.type;
					 if (descr_lookup[parent.type].nested_blocks.indexOf(last_clip_element_type)!=-1)
					 {
						 if (act_elem.type==block_types.funct_block_var)
						 {
							 while (DESCR.findFunctBlock(act_elem.values[0])!=null)
							 {
								act_elem.values[0]=act_elem.values[0]+"_1";
							 }
						 }
						 if ((act_elem.type==block_types.enum_var_elem)||(act_elem.type==block_types.funct_block_elem_var)||
							(act_elem.type==block_types.reg_var))
							{
								while (findNameInParent(parent,act_elem.values[0])==true)
								{
									act_elem.values[0]=act_elem.values[0]+"_1";
								}
							}
	 
						parent.sub_elems.splice(last_index_elem+1,0,act_elem);
						if (descr_lookup[act_elem.type].custom_event_handle!=undefined){descr_lookup[act_elem.type].custom_event_handle(act_event,null,act_elem,null,null);}
					 }
				 }
				 break;
			case event.TOGGLE_BREAKPOINT:
				/*if (act_elem.breakpoint_state==true)
				{
					act_elem.breakpoint_state=false;
				}
				else
				{
					act_elem.breakpoint_state=true;
				}*/
				var arr=GOM.getObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0);
				if (arr==undefined)
				{
					arr=[];
				}
				if (arr[act_elem.vis_elem_item]==true)
				{
					arr[act_elem.vis_elem_item]=false;
				}
				else
				{
					arr[act_elem.vis_elem_item]=true;
				}
				GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,arr);
				updateBreakPointList();
				if (debug_mode==true)
				{
					DEB.DEB_ConvertToNST_Breakpoints();
					DEB.BREAK_setClear();
				}
				break;
			case event.EXPORT_MODULE:
				var st_code=PRECOMP.preCompileElem(act_elem,0);
				var imgDLHelper = document.getElementById('imgdlhelper_1');
				var blob = new Blob([st_code], { type: 'text/plain;charset=utf-8' }); //new way
				var blobUrl = URL.createObjectURL(blob);
				imgDLHelper.download=convertString(act_elem.values[0])+"_V"+convertString(act_elem.values[1])+".st";

				imgDLHelper.href=blobUrl;
				imgDLHelper.click();
				break;
		}
		if (act_event!=event.TOGGLE_BREAKPOINT)
		{
			// any change in the code -> breakpoint list is invalidated
			GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
		}
		var descr=descr_lookup[act_elem.type];
		if (((act_event!=event.COPY)&&(act_event!=event.CHANGE))||(forced_refresh==true)||(trigger_glob_refresh==true))
		{
			eliminateDuplicateAddButtons(proj_elems);
			if (trigger_glob_refresh==true)
			{
				redraw_list[screens.prog_scr].func();
				redraw_list[screens.var_scr].func();
			}
			else if (
			    (act_elem.type==block_types.add_block)&&
			    (descr_lookup[parent.type].refresh_screens!=undefined)&&
				(descr_lookup[parent.type].refresh_screens.length==1)&&
				(descr_lookup[parent.type].refresh_screens[0]==screens.prog_scr)
			   )
			{
				redraw_list[screens.prog_scr].func();
			}
			else
			{
				if (descr.refresh_screens!=undefined)
				{
					for(i=0;i<descr.refresh_screens.length;i++)
					{
						redraw_list[descr.refresh_screens[i]].func();
					}
				}
			}
			var force_focus=document.querySelectorAll('[data-elem_focus=\"true\"]');
			if ((force_focus!=null)&&(force_focus.length==1))
			{
				force_focus[0].focus();
			}
		}
		proj_elems.editor=ENV.ARGEE;
		if (debug_mode==false)
		{
			proj_elems.prog_var_types_enum=fastClone(prog_var_types_enum);
			setLocalStorage("prog_code",JSON.stringify(proj_elems));
		}
		clearBlockSelection();
		
		/*if (descr_lookup[parent.type].screens.indexOf(screens.var_scr)==-1)*/
		{
			addUndo();
		}

	}
	
	var curr_img_sel_element;
	
	function onImportImg(e)
	{
		var hj=curr_img_sel_element;
		
		var index=JSON.parse(curr_img_sel_element.dataset.elem_index);
		var parent=getParentArr(index);
		var last_index_elem=index[index.length-1];
		var act_elem=parent.sub_elems[last_index_elem];

		var name=curr_img_sel_element.files[0].name.split(".");
		act_elem.values[0]=name[0];
		act_elem.values[1]=e.target.result;
		setLocalStorage("prog_code",JSON.stringify(proj_elems));
		renderProg();
	}

	
	function handleImageFileSelect(evt)
	{
		var files = evt.files; // FileList object
		curr_img_sel_element=evt;
		for (var i = 0, f; f = files[i]; i++) {

		  var reader = new FileReader();

		  // Closure to capture the file information.
		  reader.onload = (function(theFile) {
			return onImportImg;
		  })(f);

		  // Read in the image file as a data URL.
		  reader.readAsDataURL(f);
		}
		
		
	}
	
	var keyMenuTargElement;
	
	function actOnKeyDown(event_curr,elem)
	{
		var n = (window.Event) ? event_curr.which : event_curr.keyCode;
		keyMenuTargElement=elem;
		if (event_curr.ctrlKey==true)
		{
			switch(n)
			{
				case 73: ARGEE_elem_dlg.showContextMenu(ARGEE_elem_dlg.event.LIO); return false; // I
				case 76: ARGEE_elem_dlg.showContextMenu(ARGEE_elem_dlg.event.LOC); return false; // L
				case 81: 
				{
					
					var actElem=window.document.activeElement;
					var actElemBlock=DESCR.getElemFromIndex(JSON.parse(actElem.dataset.elem_index))
					var descr=descr_lookup[actElemBlock.type];
					if (actElem.dataset.elem_init_inject=="true")
					{
						handleEvent(event.ADD_INIT,actElem);
						var jk=1;
						return false;
					}
					else
					{
						ARGEE_elem_dlg.showContextMenu(ARGEE_elem_dlg.event.GLOB); return false; // Q
					}
				}
				case 83: ARGEE_elem_dlg.showContextMenu(ARGEE_elem_dlg.event.ENUM); return false; // S
				case 70: ARGEE_elem_dlg.showContextMenu(ARGEE_elem_dlg.event.FUNC); return false; // F
			}
			
		}

		
		return true;
	}

	var curr_prog_line=0;
	var curr_func_block_ptr;
	var comment_mode=false;

	var hmi_image_variables=[];
	
	function preRenderProg(elem,index,parent,funct_block_index)
	{
		var i,j;
		var str="";
		var curr_funct_block_index=funct_block_index;
		var rw=true;
		
		
		if ((debug_mode==true)||(print_mode==true))
		{
			rw=false;
		}
		
		if ((debug_mode==true)&&(elem.type==block_types.hmi)&&(comment_mode==false))
		{
			return;
		}
		
		var descr=descr_lookup[elem.type];
		if (descr.type==block_types.funct_block_var)
		{
			curr_funct_block_index=clone(index);
		}
		
		if (descr.screens.indexOf(screens.prog_scr)!=-1)
		{
			if (((descr.type==block_types.add_block)&&(descr_lookup[parent.type].screens.indexOf(screens.prog_scr)==-1))||
			    ((descr.type==block_types.add_block)&&(hide_add_buttons==true)))
			{
				
			}
			else
			{
				
				if (descr.type==block_types.funct_block_def)
				{
					curr_func_block_ptr=parent;
					if (parseInt(parent.values[1])!=0)
					{
						str=parent.values[0];
					}
					else
					{
						var str_ind=prog_var_types_enum.indexOf(parent.values[0]);
						str=func_block_help_strings[str_ind];
					}
				}
				else if ((descr.type==block_types.function_block_group_def)||(descr.type==block_types.module_def))
				{
					if (parseInt(parent.values[1])!=0)
					{
						str=parent.values[0];
					}
					else
					{
						str="";
					}
				}
				else if (elem.sub_elems!=undefined)
				{
					if (descr.fields!=undefined)
					{
						if ((descr.fields.length==1)&&(descr.fields[0].render_name==undefined))
						{
							if ((rw==true)&&(elem.expanded!=false))
							{
								var vals=escapeHTML(elem.values[0])
								var rows=(elem.values[0].split(/\r\n|\r|\n/).length);
								var tmp_str1;
								tmp_str1="<textarea onkeyup=\"ARGEE_elem_descr.textAreaAdjust(this)\" rows=\""+rows+"\"  onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\"0\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" >"+vals+"</textarea>";
								
								if ((elem.values[0].length!=0)&&((elem.type==block_types.hmi_grid_screen)||
								                                 (elem.type==block_types.hmi_grid_section)||
																 (elem.type==block_types.hmi_grid_row)||
																 (elem.type==block_types.hmi_grid_elem)))
								{
									var tmp_str=elem.values[0].split("(");
									var func_descr;
									var str_help="";
									var hmi_functions_group_list=DESCR[descr.hmi_func_array];
									var help_str=findHmiFuncDescr(hmi_functions_group_list,tmp_str[0])
									if (help_str!=null)
									{
										str="<table style=\"width:100%\">";
										str+="<tr>";
										str+="<td style=\"white-space: nowrap;width:1px\"><b>Help:</b></td>";
										str+="<td>"+escapeHTML(help_str)+"</td>";
										str+="<tr>";
										str+="<td style=\"white-space: nowrap;width:1px\"><b>&nbsp&nbsp&nbsp&nbsp&nbsp</b></td>";
										str+="<td>"+tmp_str1;
										str+="</td></tr></table>";
									}
									else
									{
										str=tmp_str1;
									}
								}
								else
								{
									str=tmp_str1;
								}
								
								
							}
							else
							{
								str=escapeHTML(elem.values[0]);
							}
						}
						else
						{
							str="<table style=\"width:100%\">";
							for(j=0;j<descr.fields.length;j++)
							{
								str+="<tr>";
								str+="<td style=\"white-space: nowrap;width:1px\"><b>"+descr.fields[j].field_name+":</b></td>";
								
								if ((rw==true)&&(elem.expanded!=false))
								{
									str+="<td><input onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" type=\"text\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\""+j+"\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" value=\""+escapeHTML(elem.values[j])+"\"></td>";
								}
								else
								{
									str+="<td>"+escapeHTML(elem.values[j])+"</td>";
								}
								str+="</tr>";
							}
							str+="</table>"
						}
					}
					else
					{
						str="";
					}
				}
				else
				{
					if (descr.fields==undefined)
					{
						if (descr.image_handler==true)
						{
							if (elem.values[0]==undefined)
							{
								str="<input type=\"file\" data-elem_index=\""+JSON.stringify(index)+"\"  onchange=\"DESCR.handleImageFileSelect(this);return false;\" name=\"files[]\" multiple />" 
							}
							else
							{
								// hmi_image_variables are repopulated on every refresh cycle -> to be used in Ctrl-I dialog on HMI
								hmi_image_variables[hmi_image_variables.length]=elem.values[0]
								
								str="<table>"
								str+="<tr><td><b>VarName:</b>"+elem.values[0]+"</tr></tr>";
								str+="<tr><td><img height=\"100px\" src=\""+elem.values[1]+"\"></td></tr>";
								str+="</table>";
							}
							
						}
						
					}
					else if ((descr.fields.length==1)&&(descr.fields[0].render_name==undefined))
					{
						str="";
						var color="inherit";
						if (descr.font_color!=undefined)
						{
							color=descr.font_color;
						}
						if (descr.render_text_area==true)
						{
							if ((rw==true)&&(elem.expanded!=false))
							{
								var vals=escapeHTML(elem.values[0])
								var rows=(elem.values[0].split(/\r\n|\r|\n/).length);
								if (vals=="")
								{
									var jk=1;
								}
								
								var tmp_str1;
								tmp_str1="<textarea onkeyup=\"ARGEE_elem_descr.textAreaAdjust(this)\" rows=\""+rows+"\"   onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" style=\"width:100%;color:"+color+";\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\"0\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" >"+escapeHTML(elem.values[0])+"</textarea>";
								if ((elem.values[0].length!=0)&&((elem.type==block_types.hmi_grid_screen)||
								                                 (elem.type==block_types.hmi_grid_section)||
																 (elem.type==block_types.hmi_grid_row)||
																 (elem.type==block_types.hmi_grid_elem)))
								{
									var tmp_str=elem.values[0].split("(");
									var func_descr;
									var str_help="";
									var hmi_functions_group_list=DESCR[descr.hmi_func_array];
									var help_str=findHmiFuncDescr(hmi_functions_group_list,tmp_str[0])
									if (help_str!=null)
									{
										str+="<table style=\"width:100%\">";
										str+="<tr>";
										str+="<td style=\"white-space: nowrap;width:1px\"><b>Help:</b></td>";
										str+="<td>"+escapeHTML(help_str)+"</td>";
										str+="<tr>";
										str+="<td style=\"white-space: nowrap;width:1px\"><b>&nbsp&nbsp&nbsp&nbsp&nbsp</b></td>";
										str+="<td>"+tmp_str1;
										str+="</td></tr></table>";
									}
									else
									{
										str+=tmp_str1;
									}
										
								}
								else
								{
									str+=tmp_str1;
								}
								
									
							}
							else
							{
								str+=escapeHTML(elem.values[0]);
							}
						}
						else
						{
							if ((rw==true)&&(elem.expanded!=false))
							{
								if ((elem.values[0].length!=0)&&((elem.type==block_types.func_block_call)||((elem.type==block_types.ladder_func_block_call))))
								{
									var tmp_str=elem.values[0].split("(");
									var func_descr;
									var str_help="";
									if ((tmp_str.length>0)&&((func_descr=findFunctionDescription(tmp_str[0]))!=null))
									{
										str_help=escapeHTML(func_descr);
									}
									if (str_help=="")
									{
										tmp_str=tmp_str[0].split(" ");
										tmp_str=tmp_str[0].split(".");
										var type=findLastType(tmp_str,curr_func_block_ptr,0);
										
										if (type!=null)
										{
											var str_ind=prog_var_types_enum.indexOf(type);
											str_help=func_block_help_strings[str_ind];
										}
									}
									
									if (str_help!="")
									{
										str="<table style=\"width:100%\">";
										str+="<tr>";
										str+="<td style=\"white-space: nowrap;width:1px\"><b>Help:</b></td>";
										str+="<td>"+escapeHTML(str_help)+"</td>";
										str+="<tr>";
										str+="<td style=\"white-space: nowrap;width:1px\"><b>&nbsp&nbsp&nbsp&nbsp&nbsp</b></td>";
										str+="<td><input onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" type=\"text\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\"0\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" value=\""+escapeHTML(elem.values[0])+"\">";
										str+="</td></tr></table>";
									}
									else
									{
										str+="<input onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" type=\"text\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\"0\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" value=\""+escapeHTML(elem.values[0])+"\">";
									}
									
								}
								
								else
								{
									str+="<input onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" type=\"text\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\"0\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" value=\""+escapeHTML(elem.values[0])+"\">";
								}
							}
							else
							{
								str+=escapeHTML(elem.values[0]);
							}
						}
					}
					else
					{
						str="<table style=\"width:100%\">";
						for(j=0;j<descr.fields.length;j++)
						{
							str+="<tr>";
							str+="<td style=\"white-space: nowrap;width:1px\"><b>"+descr.fields[j].field_name+":</b></td>";
							
							if (descr.fields[j].loc_index_parent==true)
							{
								// find the type of the function block
								var func_block_type_elem=getFuncBlockType(curr_funct_block_index,parent.values[0]);
								var loc_index=[];
								if (func_block_type_elem!=null)
								{
									loc_index=getFunctionBlockIndex(func_block_type_elem.values[0]);
								}
								if ((rw==true)&&(elem.expanded!=false))
								{
									str+="<td><input onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" type=\"text\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\""+j+"\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(loc_index)+"\" data-loc_index=\""+JSON.stringify(loc_index)+"\" value=\""+escapeHTML(elem.values[j])+"\"></td>";
								}
								else
								{
									str+="<td>"+escapeHTML(elem.values[j])+"</td>";
								}
									
							}
							else
							{
								if ((rw==true)&&(elem.expanded!=false))
								{
									str+="<td><input onkeydown=\"return ARGEE_elem_descr.actOnKeyDown(event,this);\" type=\"text\" style=\"width:100%\" onblur=\"ARGEE_elem_descr.handleEvent("+event.CHANGE+",this);\" data-elem_field=\""+j+"\" data-elem_index=\""+JSON.stringify(index)+"\" data-glob_index=\""+JSON.stringify(glob_var_index)+"\" data-loc_index=\""+JSON.stringify(curr_funct_block_index)+"\" value=\""+escapeHTML(elem.values[j])+"\"></td>";
								}
								else
								{
									str+="<td>"+escapeHTML(elem.values[j])+"</td>";
								}
							}
							str+="</tr>";
						}
						str+="</table>"
					}
				}
				if (descr.type==block_types.add_block)
				{
					if (rw==true)
					{
						pre_render_buf[pre_render_buf.length]={elem:elem,descr:descr,index:index,str:str,render_border:false};
					}
				}
				else
				{
					var render_border;
					if (
					     (((elem.sub_elems!=undefined)||(descr.render_text_area==true))&&(descr.dont_render_border!=true))||
						 (descr.type==block_types.module_def)
					   )
					{
						render_border=true;
					}
					else
					{
						render_border=false;
					}
					if ((descr.type==block_types.module_def)&&(index[0]==1))
					{
						var jk=1;
					}
					else if ((descr.type==block_types.funct_block_def)||(descr.type==block_types.funct_def)||(descr.type==block_types.hmi_screens)||(descr.type==block_types.function_block_group_def)||(descr.type==block_types.module_def))
					{

						pre_render_buf[pre_render_buf.length]={elem:elem,descr:descr,index:index,str:str,render_border:render_border};
					}
					else
					{
						pre_render_buf[pre_render_buf.length]={elem:elem,descr:descr,index:index,str:str,render_border:render_border,line:curr_prog_line};
						pre_render_buf[pre_render_buf.length-1].elem.vis_elem_type=1;
						pre_render_buf[pre_render_buf.length-1].elem.index=clone(index);
						pre_render_buf[pre_render_buf.length-1].elem.vis_elem_item=pre_render_buf[pre_render_buf.length-1].line;
						curr_prog_line++;
					}
				}
			}
		}
		

			var act_pre_rend_elem;
			if ((elem.sub_elems!=undefined))
			{
				if ((debug_mode==true)&&(elem.type==block_types.funct_block_def))
				{
					var funct_block_name=parent.values[0];
					var ast=GEN.getFinalAST();
					var found=false;
					for(i=0;i<ast.list[1].list.length;i++)
					{
						if (ast.list[1].list[i].name.toUpperCase()==funct_block_name.toUpperCase())
						{
							found=true;
							break;
						}
					}
					if (found==false)
					{
						elem.expanded=false;
						act_pre_rend_elem=pre_render_buf[pre_render_buf.length-1];
						act_pre_rend_elem.dont_display=true;
					}
					var jk=1;
				}
				
					
				if (elem.expanded==false)
				{
					act_pre_rend_elem=pre_render_buf[pre_render_buf.length-1];
					act_pre_rend_elem.start_hiding_at=pre_render_buf.length-1;
				}
				for(i=0;i<elem.sub_elems.length;i++)
				{
					var tmp=index.slice(0);
					tmp.splice(tmp.length,0,i);
					if ((elem.sub_elems[i].commented==1)&&(debug_mode==false))
					{
						debug_mode=true;
						comment_mode=true;
						preRenderProg(elem.sub_elems[i],tmp,elem,curr_funct_block_index,rw);
						debug_mode=false;
						comment_mode=false;
					}
					else
					{
						preRenderProg(elem.sub_elems[i],tmp,elem,curr_funct_block_index,rw);
					}

				}
				if (elem.expanded==false)
				{
					act_pre_rend_elem.end_hiding_at=pre_render_buf.length-1;
				}

			}
		
	}
	
	function saveElemContents(elem)
	{
		var index=JSON.parse(elem.dataset.elem_index);
		var sub_elem=parseInt(elem.dataset.elem_field);
		var elem_datastruct=getElemFromIndex(index);
		var val=elem.value;
		elem_datastruct.values[sub_elem]=val;
		return elem_datastruct;
	}

	var num_code_lines;
	
	function postRenderProg()
	{
		var str="";
		var i,j;
		var fixed_offset=-3;
		var prev_block_i=-1;
		var act_funct_block_var_index=[];
		str+="<table style=\"border-collapse:collapse;width:96%\" border=\"1\">"
		str+="<tr><td style=\"width:10px;border-left: 1px solid transparent;border-top: 1px solid transparent;border-right: 0px solid transparent;\"></td><td style=\"width:10px;border-left: 1px solid transparent;border-top: 1px solid transparent;border-right: 0px solid transparent;\"></td><td colspan=\"100%\" style=\"border-left: 1px solid transparent;border-top: 1px solid transparent;border-right: 0px solid transparent;\"></td></tr>";
		for(i=0;i<pre_render_buf.length;i++)
		{
			
			if (pre_render_buf[i].dont_display==true)
			{
				i=pre_render_buf[i].end_hiding_at;
				continue;
			}

			str+="<tr>"
			if (((pre_render_buf[i].descr.type==block_types.funct_block_def)||(pre_render_buf[i].descr.type==block_types.hmi_screens)||(pre_render_buf[i].descr.type==block_types.function_block_group_def)||(pre_render_buf[i].descr.type==block_types.module_def)))
			{
				if (i>0)
				{
					if ((prev_block_i!=-1)&&
					    (
					     (pre_render_buf[prev_block_i].elem.expanded==false)||
					     (pre_render_buf[prev_block_i].descr.nested_blocks==undefined)
					    )
					   )
					{
						str+="<td colspan=\"1\" height=\"30px\" width=\"10px\" style=\"border-left: 1px solid transparent;border-top: 1px solid black;border-right: 0px solid transparent;border-bottom: 1px solid black;\" ><hr style=\"border-width:1px;\"></td>";
					}
					else
					{
						str+="<td colspan=\"1\" height=\"30px\" width=\"10px\" style=\"border-left: 1px solid transparent;border-top: 1px solid transparent;border-right: 0px solid transparent;\" ><hr style=\"border-width:1px;\"></td>";
					}
					str+="<td colspan=\"100%\" height=\"30px\" width=\"10px\" style=\"border-left: 0px solid transparent;border-top: 1px solid black;border-right: 1px solid transparent;\" ><hr style=\"border-width:1px;\"></td>";
					str+="</tr><tr>";
				}
				prev_block_i=i;
			}
			
			if (i<(pre_render_buf.length-1))
			{
				if (pre_render_buf[i].index.length<pre_render_buf[i+1].index.length)
				{
					if ((pre_render_buf[i].index.length+fixed_offset)>0)
					{
						if (
						    (pre_render_buf[i].descr.type==block_types.funct_block_def)||
							(pre_render_buf[i].descr.type==block_types.hmi_screens)||
							(pre_render_buf[i].descr.type==block_types.function_block_group_def)||
							(pre_render_buf[i].descr.type==block_types.module_def)
							)
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" ></td>";
						}
						else
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" colspan=\""+(pre_render_buf[i].index.length+fixed_offset)+"\"></td>";
						}
					}
				}
				else
				{
					if ((pre_render_buf[i+1].index.length+fixed_offset)>0)
					{
						if ((pre_render_buf[i].descr.type==block_types.funct_block_def)||
						    (pre_render_buf[i].descr.type==block_types.hmi_screens)||
							(pre_render_buf[i].descr.type==block_types.function_block_group_def)||
							(pre_render_buf[i].descr.type==block_types.module_def)
							)
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" ></td>";
						}
						else
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" colspan=\""+(pre_render_buf[i+1].index.length+fixed_offset)+"\"></td>";
						}
					}
					if ((pre_render_buf[i].index.length-pre_render_buf[i+1].index.length)>0)
					{
						if (((pre_render_buf[i+1].descr.type==block_types.funct_block_def)||
						    (pre_render_buf[i+1].descr.type==block_types.hmi_screens)||
							(pre_render_buf[i+1].descr.type==block_types.function_block_group_def)
							))
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" colspan=\""+(pre_render_buf[i].index.length-pre_render_buf[i+1].index.length)+"\"></td>";
						}
						else if (pre_render_buf[i+1].descr.type==block_types.module_def)
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" colspan=\""+(pre_render_buf[i].index.length-pre_render_buf[i+1].index.length-1)+"\"></td>";
							
						}
						else
						{
							str+="<td width=\"10px\" style=\"border-bottom: 1px solid black;border-left: 1px solid transparent;\" colspan=\""+(pre_render_buf[i].index.length-pre_render_buf[i+1].index.length)+"\"></td>";
						}
					}
				}
			}
			else
			{
				if ((pre_render_buf[i].index.length+fixed_offset)>0)
				{
					str+="<td style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" colspan=\""+(pre_render_buf[i].index.length+fixed_offset)+"\"></td>";
				}
				else
				{
					//str+="<td style=\"border-bottom: 1px solid transparent;border-left: 1px solid transparent;\" ></td>";
				}
			}
			if (pre_render_buf[i].descr.type==block_types.funct_block_def)
			{
				act_funct_block_var_index=pre_render_buf[i].index.slice(0,pre_render_buf[i].index.length-2);
				var contracted="";
				var exp_contr="<a id=\"func_block_id_"+getID_FromIndex(pre_render_buf[i].index)+"\" data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' href='#' onclick=\"ARGEE_elem_descr.exp_contract(this)\">+</a>"
				if (pre_render_buf[i].elem.expanded==false)
				{
					contracted=" "+hide_str;
				}
				var func_block=findFunctBlock(pre_render_buf[i].str);
				if ((func_block!=null)&&(num(func_block.values[1])==1))
				{
					if (pre_render_buf[i].str.localeCompare(default_task_type)==0)
					{
						pre_render_buf[i].str=default_task_replace_type;
					}
					str+="<td bgcolor=\""+task_color_in_code+"\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Task - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				}
				else
				{
					str+="<td bgcolor=\""+function_block_color+"\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Function Block - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				}
				
			}
			else if (pre_render_buf[i].descr.type==block_types.function_block_group_def)
			{
				var contracted="";
				var exp_contr="<a id=\"func_block_id_"+getID_FromIndex(pre_render_buf[i].index)+"\" data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' href='#' onclick=\"ARGEE_elem_descr.exp_contract(this)\">+</a>"
				if (pre_render_buf[i].elem.expanded==false)
				{
					contracted=" "+hide_str;
				}
				str+="<td bgcolor=\""+module_color+"\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Function Block Group - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				/*var func_block=findFunctBlock(pre_render_buf[i].str);
				if ((func_block!=null)&&(num(func_block.values[1])==1))
				{
					if (pre_render_buf[i].str.localeCompare(default_task_type)==0)
					{
						pre_render_buf[i].str=default_task_replace_type;
					}
					str+="<td bgcolor=\""+task_color_in_code+"\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Task - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				}
				else
				{
					str+="<td bgcolor=\"#FFF8C6\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Function Block - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				}*/
				
			}
			else if (pre_render_buf[i].descr.type==block_types.module_def)
			{
				var contracted="";
				var exp_contr="<a id=\"func_block_id_"+getID_FromIndex(pre_render_buf[i].index)+"\" data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' href='#' onclick=\"ARGEE_elem_descr.exp_contract(this)\">+</a>"
				if (pre_render_buf[i].elem.expanded==false)
				{
					contracted=" "+hide_str;
				}
				str+="<td bgcolor=\""+pre_render_buf[i].descr.color+"\" colspan=\"100%\">&nbsp&nbsp&nbsp Library - <b>"+pre_render_buf[i].str+"</b>  </td>";
				/*var func_block=findFunctBlock(pre_render_buf[i].str);
				if ((func_block!=null)&&(num(func_block.values[1])==1))
				{
					if (pre_render_buf[i].str.localeCompare(default_task_type)==0)
					{
						pre_render_buf[i].str=default_task_replace_type;
					}
					str+="<td bgcolor=\""+task_color_in_code+"\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Task - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				}
				else
				{
					str+="<td bgcolor=\"#FFF8C6\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp Function Block - <b>"+pre_render_buf[i].str+"</b> "+contracted+" </td>";
				}*/
				
			}
			else if (pre_render_buf[i].descr.type==block_types.hmi_screens)
			{
				var contracted="";
				var exp_contr="<a data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' href='#' onclick=\"ARGEE_elem_descr.exp_contract(this)\">+</a>"
				if (pre_render_buf[i].elem.expanded==false)
				{
					contracted=" "+hide_str;
				}
				str+="<td bgcolor=\"#FFF8C6\" colspan=\"100%\">"+exp_contr+"&nbsp&nbsp&nbsp<i> HMI Screens </i> "+contracted+" </td>";
			}
			else if (pre_render_buf[i].descr.type==block_types.funct_def)
			{
				str+="<td bgcolor=\"aqua\" colspan=\"100%\">Function - "+pre_render_buf[i].str+" </td>";
			}
			else if (pre_render_buf[i].descr.type==block_types.add_block)
			{
				//str+="<td colspan=\"100%\">&nbsp<br>&nbsp&nbsp"
				str+="<td style=\"padding: 10px;\" colspan=\"100%\">"
				str+=generateAddButtonBlock(pre_render_buf[i].elem,pre_render_buf[i].index);
				str+="</td>"
				//str+="<br>&nbsp</td>"
			}
			else
			{
				pre_render_buf[i].elem.vis_elem_type=1;
				pre_render_buf[i].elem.index=clone(pre_render_buf[i].index);
				pre_render_buf[i].elem.vis_elem_item=pre_render_buf[i].line;
				var line=pre_render_buf[i].elem.vis_elem_item;
				var disp_line=indexToDotString(pre_render_buf[i].index.slice(3));//
				var data_sub_exist=0;
				if (pre_render_buf[i].elem.sub_elems!=undefined)
				{
					data_sub_exist=1;
				}
				var backgr_color="inherit";
				var first_col_color=pre_render_buf[i].descr.color;
				if ((pre_render_buf[i].elem.commented==1)||(pre_render_buf[i].elem.commented==2))
				{
					first_col_color=backgr_color="grey";
					
				}
				
				var contracted="";
				var exp_contr="";
				
				
				if (pre_render_buf[i].descr.collapsable==true)
				{
					exp_contr="&nbsp&nbsp<a id=\"func_block_id_"+getID_FromIndex(pre_render_buf[i].index)+"\" data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' href='#' onclick=\"ARGEE_elem_descr.exp_contract(this)\">+</a>"
					if (pre_render_buf[i].elem.expanded==false)
					{
						contracted="<br> "+hide_str;
					}
				}
				
				if ((pre_render_buf[i].descr.fields==undefined)&&(pre_render_buf[i].descr.small_height==true))
				{
					// smaller height
					str+="<td id=\"prog_elem_1_"+line+"\" data-elem_type='"+(pre_render_buf[i].elem.type)+"' data-sub_exist='"+data_sub_exist+"' data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' ondblclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);\"  style=\"background-color:"+backgr_color+";height:1.5em;white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"><a id=\"elem_line_id_"+getID_FromIndex(pre_render_buf[i].index)+"\" href='#' data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\">"+disp_line+"</a></td>";
				}
				else
				{
					str+="<td id=\"prog_elem_1_"+line+"\" data-elem_type='"+(pre_render_buf[i].elem.type)+"' data-sub_exist='"+data_sub_exist+"' data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' ondblclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);\"  style=\"background-color:"+backgr_color+";height:3.5em;white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"><a id=\"elem_line_id_"+getID_FromIndex(pre_render_buf[i].index)+"\" href='#' data-elem_index='"+JSON.stringify(pre_render_buf[i].index)+"' onclick=\"ARGEE_elem_descr.blockMenu(this)\">"+disp_line+"</a>"+exp_contr+"</td>";
				}
				
				
				if (pre_render_buf[i].render_border==true)
				{
					//str+="<td style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\" bgcolor=\""+pre_render_buf[i].descr.color+"\">"+pre_render_buf[i].descr.title+"</td>";
					str+="<td id=\"prog_elem_2_"+line+"\" style=\"border-right: 1px solid transparent;white-space: nowrap; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\" bgcolor=\""+first_col_color+"\">"+pre_render_buf[i].descr.title+contracted+"</td>";
					str+="<td id=\"prog_elem_3_"+line+"\" valign=\"middle\" style=\"padding-bottom:5px;padding-top:8px;padding-left:5px;padding-right:10px;\" colspan=\"100%\" bgcolor=\""+pre_render_buf[i].descr.color+"\" >"
				}
				else
				{
					str+="<td id=\"prog_elem_2_"+line+"\" style=\"white-space: nowrap;border: 1px solid black; white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\" bgcolor=\""+first_col_color+"\">"+pre_render_buf[i].descr.title+contracted+"</td>";
					str+="<td id=\"prog_elem_3_"+line+"\" style=\"padding:5px;\" colspan=\"100%\">"
				}
				str+=pre_render_buf[i].str;
				str+="</td>";
				
			}
			str+="</tr>";
			
			if (pre_render_buf[i].elem.expanded==false)
			{
				i=pre_render_buf[i].end_hiding_at;
			}
		}
		str+="</table>"
		num_code_lines=curr_prog_line+1;
		return str;
	}
	

	function showBlockMenu(id,index)
	{
			var elem=id;
			var tmp21=findPos(elem);
			var elem_datastruct=getElemFromIndex(index);
			
			var tbl="<table align=\"center\">"
			//var vert_offset=10;
			var vert_offset=0;
			
			if (debug_mode==false)			
			{
				
				
				if ((elem_datastruct.type==block_types.prog_vars)||(elem_datastruct.type==block_types.alias_vars)||(elem_datastruct.commented==2))
				{
					tbl+="<tr><td><font color=\"Yellow\"> No Actions Available </font></td></tr>";
				}
				else if (elem_datastruct.commented==1)
				{
					tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.UNCOMMENT+",this);hideCondMenu();\">Uncomment</button></td></tr>";	
				}
				else
				{
					if ((elem_datastruct.type==block_types.reg_var)||
					    (elem_datastruct.type==block_types.funct_block_elem_var))
					{
						tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.FORCE_NON_ZERO_RENDER_ABOVE+",this);hideCondMenu();\">Make it Array</button></td></tr>";	
					}
					if (elem_datastruct.type==block_types.enum_var_elem)
					{
						tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.FORCE_NON_ZERO_RENDER_ABOVE+",this);hideCondMenu();\">Make it a Constant</button></td></tr>";	
					}		
					
					if ((elem_datastruct.type!=block_types.init_elem_var)&&(elem_datastruct.type!=block_types.module))
					{
						tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.COPY+",this);hideCondMenu();\">Copy</button></td></tr>";	
					}
					tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.CUT+",this);hideCondMenu();\">Cut</button></td></tr>";
					if (elem_datastruct.type!=block_types.init_elem_var)
					{
						tbl+="<tr>"+
							  "<td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.PASTE_ABOVE+",this);hideCondMenu();\">Paste Above</button></td>"+
							  "</tr>";
						tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.PASTE_BELOW+",this);hideCondMenu();\">Paste Below</button></td></tr>";
						
						if (descr_lookup[elem_datastruct.type].screens.indexOf(screens.var_scr)==-1)
						{
                     if (descr_lookup[elem_datastruct.type].nested_blocks!=undefined)
                     {
                        tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.PASTE_INTO+",this);hideCondMenu();\">Paste Into</button></td></tr>";
                     }
							tbl+="<tr><td><hr></td></tr>";
							tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.COMMENT_OUT+",this);hideCondMenu();\">Comment Out</button></td></tr>";
							tbl+="<tr><td><hr></td></tr>";
						}
                  
						
						tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.DBL_CLICK+",this);hideCondMenu();\">Toggle Add Button</button></td></tr>";
					}
					
					if (elem_datastruct.type==block_types.init_elem_var)
					{
						tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.EDIT_INIT+",this);hideCondMenu();\">Toggle Edit</button></td></tr>";		
					}
					
					 if (descr_lookup[elem_datastruct.type].render_init==true)
					 {
						 if (elem_datastruct.values[1]!="Timer/Counter")
						 {
							tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.ADD_INIT+",this);hideCondMenu();\">Init</button></td></tr>";
						 }
					 }
					if (elem_datastruct.type==block_types.function_block_group)
					{
						 tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.REMOVE_MODULE+",this);hideCondMenu();\">Remove Function Blocks</button></td></tr>";
					}
					if (elem_datastruct.type==block_types.module)
					{
						tbl+="<tr><td>";
						tbl+="<a id=\"imgdlhelper_1\" style=\"display:none;\"  download=\"test.txt\" href=\"\">&nbsp;</a><br>";
						tbl+="<button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.EXPORT_MODULE+",this);hideCondMenu();\">Export Library</button>";
						tbl+="</td></tr>";	
					}
				}
				if (descr_lookup[elem_datastruct.type].screens.indexOf(screens.var_scr)!=-1)
				{
					if ((elem_datastruct.type==block_types.reg_var)||(elem_datastruct.type==block_types.alias_var)||(elem_datastruct.type==block_types.enum_var_elem)||(elem_datastruct.type==block_types.funct_block_elem_var))
					tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.COMMENT_VAR+",this);hideCondMenu();\">Comment</button></td></tr>";
				}
					
				
			}
			
			if (descr_lookup[elem_datastruct.type].screens.indexOf(screens.var_scr)==-1)
			{
				if ((elem_datastruct.commented!=2)&&(elem_datastruct.commented!=1)&&(block_types_with_breakspoints.indexOf(elem_datastruct.type)>=0))
				{
					//vert_offset-=22;
					tbl+="<tr><td><button  data-elem_index=\""+JSON.stringify(index)+"\"  style=\"width:100%;\" type=\"button\"  onclick=\"ARGEE_elem_descr.handleEvent("+event.TOGGLE_BREAKPOINT+",this);hideCondMenu();\">Toggle Breakpoint</button></td></tr>";			
				}
				else
				{
					if (debug_mode==true)
					{
						tbl+="<tr><td><font color=\"Yellow\"> No Actions Available </font></td></tr>";
					}
					else
					{
						//vert_offset-=8;
					}
				}
				if (debug_mode==true)
				{
					//vert_offset=25;
				}
				
			}
			
			
		   tbl+="</table>"
			/*if ((descr_lookup[elem_datastruct.type].screens.indexOf(screens.var_scr)!=-1)||(elem_datastruct.type==block_types.init_elem_var))
			{
				if (descr_lookup[elem_datastruct.type].render_init==true)
				{
					vert_offset=-15;
				}
				else if (elem_datastruct.type==block_types.init_elem_var)
				{
					vert_offset=15;
				}
				else
				{
					vert_offset=-5;
				}
			}*/
			var act_menu;
			act_menu=window.document.getElementById("act_menu");
			act_menu.innerHTML=tbl;
			act_menu.style.display="block";
		   act_menu.style.position="absolute";
		    vert_offset=act_menu.clientHeight/(-4.16);
			act_menu.style.left=tmp21[1]+id.offsetWidth+10+"px";
			act_menu.style.top=tmp21[0]/*-id.offsetTop*/+vert_offset+"px";
			act_menu.style.zIndex="100";
			return false;
	}
	

	function showHideElem(elem)
	{
		var index=JSON.parse(elem.dataset.elem_index);
		var elem_datastruct=getElemFromIndex(index);
		var expand=false;
		if ((elem_datastruct.hidden_sub==undefined)||(elem_datastruct.hidden_sub==true))
		{
			elem_datastruct.hidden_sub=false;
		}
		else
		{
			expand=true;
			elem_datastruct.hidden_sub=true;
		}
		renderEditVars();
		if (expand==true)
		{
			/*var id_var_str="elem_line_id_"+getID_FromIndex(index);
			id_elem=document.getElementById(id_var_str);
			if (id_elem!=null)
			{
				id_elem.scrollIntoView(true);
			}*/
		}
		
	}
	
	function blockMenu(elem)
	{
		var index=JSON.parse(elem.dataset.elem_index);
		var id_str="elem_line_id_"+getID_FromIndex(index);
		var link_elem=document.getElementById(id_str);
		showBlockMenu(link_elem,index);
		//var parent=getParentArr(index);
		
	}
	
	var lastErrLine=[];
	
	function findTD_Elem(list)
	{
		var i;
		for(i=0;i<list.length;i++)
		{
			if (list[i].nodeName=="TD")
			{
				return list[i];
			}
		}
		
	}
	
	function showErrorLine(index,type)
	{
		var i;
		if (type==1)
		{
			var elem=getElemFromIndex(index.slice(0,2));
			var exp_el=elem;
			for(i=2;i<index.length;i++)
			{
				exp_el.sub_elems[index[i]].expanded=true;
				exp_el=exp_el.sub_elems[index[i]];
			}
			//elem.sub_elems[0].expanded=true;
			renderProg();
			var act_elem=getElemFromIndex(index);
			var act_elem_line=act_elem.vis_elem_item;
			lastErrLine=[act_elem.vis_elem_type,act_elem.vis_elem_item];
			var id_str="elem_line_id_"+getID_FromIndex(index);
			var link_elem=document.getElementById(id_str);
			link_elem.scrollIntoView();
			for(i=1;i<5;i++)
			{
				id_str="prog_elem_"+i+"_"+act_elem_line;
				var id_elem=document.getElementById(id_str);
				if (id_elem!=null)
				{
					id_elem.bgColor="red";
				}
			}
		}
		else
		{
			if (index.length>2)
			{
				if ((index[0]==0)&&(index[1]==0))
				{
				}
				else
				{
					var upper=getElemFromIndex(index.slice(0,2));
					/*if (upper.type==block_types.funct_block_var)
					{
						upper.expanded=true;
					}
					else*/
					{
						upper.hidden_sub=true;
					}
					renderEditVars();
				}
			}
			var elem=getElemFromIndex(index);
			lastErrLine=[elem.vis_elem_type,elem.vis_elem_item,index];
			var actElem=findTD_Elem(document.querySelectorAll('[data-elem_index=\''+JSON.stringify(index)+'\']'));
			actElem.bgColor="red";
			var parent=actElem.parentNode;
			parent.bgColor="red";
			parent.scrollIntoView();
		}
	}
	
	function clearErrorLine()
	{
		var i;
		if (lastErrLine[0]!=undefined)
		{
			if (lastErrLine[0]==1)
			{
				line=lastErrLine[1];
				for(i=1;i<5;i++)
				{
					id_str="prog_elem_"+i+"_"+line;
					var id_elem=document.getElementById(id_str);
					if (id_elem!=null)
					{
						id_elem.bgColor=orig_line_colors[line][i-1];
					}
				}
			}
			else
			{
				var actElem=findTD_Elem(document.querySelectorAll('[data-elem_index=\''+JSON.stringify(lastErrLine[2])+'\']'));
				actElem.bgColor="white";
				var parent=actElem.parentNode;
				parent.bgColor="white";
			}
			lastErrLine=[];
		}
	}


	function exp_contract(elem)
	{
		var index=JSON.parse(elem.dataset.elem_index);
		var elem_datastruct=getElemFromIndex(index);
		
		if ((elem_datastruct.expanded==true)||(elem_datastruct.expanded==undefined))
		{
			elem_datastruct.expanded=false;
		}
		else
		{
			elem_datastruct.expanded=true;
		}
		proj_elems.editor=ENV.ARGEE;
		/*if (debug_mode==false)
		{
			setLocalStorage("prog_code",JSON.stringify(proj_elems));
		}*/
		renderProg();
	}	
	
	var curr_var_elem_cnt=1;
	var REND_MODE=
	{
		COMPACT:0,
		EXPANDED:1,
	};
	var rend_mode=REND_MODE.COMPACT;
   var keyboard_shortcuts_expanded_1=false;
	
	function copyCollapseExpand(elem,restore)
	{
		var i;
      
      if (elem==proj_elems)
		{
			if (restore==true)
			{
				keyboard_shortcuts_expanded=keyboard_shortcuts_expanded_1;
			}
			else
			{
				keyboard_shortcuts_expanded_1=keyboard_shortcuts_expanded;
			}
		}
      
		if (descr_lookup[elem.type].collapsable==true)
		{
			if (descr_lookup[elem.type].screens.indexOf(screens.var_scr)!=-1)
			{
				var ind;
				if ((elem.type==block_types.funct_block_var)&&(elem.values[1]==1))
				{
					ind=getFunctionBlockIndex(elem.values[0]);
				}
				if ((elem.type==block_types.funct_block_var)&&(elem.values[1]==1)&&(ind[0]==1))
				{
					// only user tasks are expanded by default
					if ((restore==false)&&(elem.expanded!=undefined))
					{
						elem.expanded_1=elem.expanded;
					}
					else if ((restore==true)&&(elem.expanded_1!=undefined))
					{
						elem.expanded=elem.expanded_1;
					}
				}
				else
				{
					if ((restore==false)&&(elem.hidden_sub!=undefined))
					{
						elem.hidden_sub_1=elem.hidden_sub;
					}
					else if ((restore==true)&&(elem.hidden_sub_1!=undefined))
					{
						elem.hidden_sub=elem.hidden_sub_1;
					}
				}
			}
		}
		if (descr_lookup[elem.type].screens.indexOf(screens.prog_scr)!=-1)
		{
			if ((elem.type==block_types.funct_block_def)||
			   (elem.type==block_types.hmi_screens)||
			   (elem.type==block_types.function_block_group_def)||
			   (descr_lookup[elem.type].collapsable==true)
			   )
		    {
					if ((restore==false)&&(elem.expanded!=undefined))
					{
						elem.expanded_1=elem.expanded;
					}
					else if ((restore==true)&&(elem.expanded_1!=undefined))
					{
						elem.expanded=elem.expanded_1;
					}
			}
		}
			
		
		if (elem.sub_elems!=undefined)
		{
			for(i=0;i<elem.sub_elems.length;i++)
			{
				copyCollapseExpand(elem.sub_elems[i],restore)
			}
		}
		
		
	}

	var COLEXP=
	{
		collapse_default:1,
		collapse_top_level:2,
		expand:3,
	};
	
	function handleCollapseExpand(elem,parent,new_val,prog_only)
	{
		var i,j;
		if (elem==proj_elems)
		{
			if (new_val==COLEXP.expand)
			{
				keyboard_shortcuts_expanded=true;
			}
			else
			{
				keyboard_shortcuts_expanded=false;
			}
		}
				
				
			
		if ((descr_lookup[elem.type].collapsable==true)&&(prog_only==false))
		{
			if (descr_lookup[elem.type].screens.indexOf(screens.var_scr)!=-1)
			{
				
				var ind;
				if ((elem.type==block_types.funct_block_var)&&(elem.values[1]==1))
				{
					ind=getFunctionBlockIndex(elem.values[0]);
				}
				
				
				if (elem.type==block_types.prog_vars)
				{
					elem.expanded=true;
				}
				else if (elem.type==block_types.alias_vars)
				{
					elem.expanded=true;
				}
				else if ((elem.type==block_types.funct_block_var)&&(elem.values[1]==1)&&(ind[0]==1)&&(new_val!=COLEXP.collapse_top_level))
				{
					// only user tasks are expanded by default
					elem.expanded=true;
				}
				else if (elem.type==block_types.function_block_group_def)
				{
				}
				else if (elem.type==block_types.module_def)
				{
					elem.expanded=true;
				}

				else
				{
					if ((new_val==COLEXP.collapse_default)||(new_val==COLEXP.collapse_top_level))
					{
						elem.hidden_sub=false;
					}
					else
					{
						elem.hidden_sub=true;
					}
				}
			}
		}
		if (descr_lookup[elem.type].screens.indexOf(screens.prog_scr)!=-1)
		{
			
			if ((elem.type==block_types.funct_block_def)||
			   (elem.type==block_types.hmi_screens)||
			   (elem.type==block_types.function_block_group_def)||
			   (elem.type==block_types.module_def)||
			   (descr_lookup[elem.type].collapsable==true)
			   )
		    {
				
					var ind;
					if ((elem.type==block_types.funct_block_def)&&(parent.values[1]==1))
					{
						ind=getFunctionBlockIndex(parent.values[0]);
					}				
				
					if ((elem.type==block_types.funct_block_def)&&(parent.values[1]==1)&&(ind[0]==1)&&(new_val!=COLEXP.collapse_top_level))
					{
						// only user tasks are expanded by default
						elem.expanded=true;
					}
					else if (elem.type==block_types.function_block_group_def)
					{
						elem.expanded=false;
					}
					else
					{
						if (descr_lookup[elem.type].collapsable==true)
						{
							if (descr_lookup[elem.type].default_collapse==true)
							{
								
								elem.expanded=false;
							}
							else
							{
								if ((new_val==COLEXP.collapse_top_level)&&
								    (
									  (elem.type!=block_types.module_def)
									)
								   )
								{
									var leaf=true;
									
									for(j=0;j<elem.sub_elems.length;j++)
									{
										if (elem.sub_elems[j].sub_elems!=undefined)
										{
											leaf=false;
											break;
										}
									}
									if (leaf==true)
									{
										elem.expanded=false;
									}
									else
									{
										elem.expanded=true;
									}
								}
								else
								{
									elem.expanded=true;
								}
							}
						}
						else
						{
							if ((new_val==COLEXP.collapse_default)||(new_val==COLEXP.collapse_top_level))
							{
								elem.expanded=false;
							}
							else
							{
								elem.expanded=true;
							}
						}
					}
			}
		}
			
		
		if (elem.sub_elems!=undefined)
		{
			for(i=0;i<elem.sub_elems.length;i++)
			{
				handleCollapseExpand(elem.sub_elems[i],elem,new_val,prog_only)
			}
		}
		
	}
	
	
	function setRendMode(mode)
	{
		if (mode==0)
		{
			rend_mode=REND_MODE.COMPACT;
			handleCollapseExpand(proj_elems,proj_elems,COLEXP.collapse_default,false);
		}
		else
		{
			rend_mode=REND_MODE.EXPANDED;
			handleCollapseExpand(proj_elems,proj_elems,COLEXP.expand,false);
		}
		renderCombined(true);
	}
		
	
	function renderEditVars()
	{
		curr_var_elem_cnt=1;
		pre_render_buf=[];
		//preRenderEditVars(proj_elems,[],null);
		//var_div.innerHTML="<h1>&nbsp&nbsp&nbsp&nbsp<u>Variables and Program elements</u></h1>"+postRenderEditVars();
		var mode_str="";
		if (rend_mode==REND_MODE.EXPANDED)
		{
			mode_str="Compact";
		}
		else
		{
			mode_str="Expanded";
		}
		var_div.innerHTML="<h1>&nbsp&nbsp&nbsp&nbspVariables and Definitions </h1><br><br>"+renderEditVars_imp(proj_elems,[],proj_elems)+"<br><br>";
	}
	var orig_line_colors=[];
	var cnt_rend=0;
	var keyboard_shortcuts_expanded=false;
	
	
	function showHideKeybShortcuts()
	{
		if (keyboard_shortcuts_expanded==true)
		{
			keyboard_shortcuts_expanded=false;
		}
		else
		{
			keyboard_shortcuts_expanded=true;
		}
		renderCombined(true);
	}
		
	
	
	function renderProg()
	{
		var i,j;
		orig_line_colors=[];
		pre_render_buf=[];
		curr_prog_line=0;
		createFuncBlockHelpStringCache();
		//console.log("prog_rend"+cnt_rend);cnt_rend++;
		hmi_image_variables=[];
		preRenderProg(proj_elems,[],null,null);
		prog_div.innerHTML="<h1>&nbsp&nbsp&nbsp&nbspARGEE Program</h1>"
		if (debug_mode==false)
		{
			var show_hide_str="<a href='#' onclick=\"ARGEE_elem_descr.showHideKeybShortcuts()\">+</a>&nbsp&nbsp";
			if (keyboard_shortcuts_expanded==true)
			{
				prog_div.innerHTML+=show_hide_str+"Keyboard shortcuts: <br>Press Ctrl-q for list of program variables<br>"+
								"Press Ctrl-l for list of function block variables<br>"+
								"Press Ctrl-i for list of I/O variables<br>"+
									  "Press Ctrl-f for list of built-in functions<br>"+
									  "Press Ctrl-s for list of State Names<br>"+
									  "<br>Press Ctrl-\"down arrow\" collapse all elements which are collapsed by default, Ctrl -\"left/right arrow\" to adjust the size of variables panel<br>"+
									  "<br>Block select program statements by clicking on the \"number area\" and dragging mouse down and selecting 2 or more statements. "+
									  "Once the block is selected, Ctrl-x can be used to cut statements, Ctrl-c to copy statements, Ctrl-d to comment out statements, Ctrl-Shift-d to uncomment statements. <br>";
			}
			else
			{
				prog_div.innerHTML+=show_hide_str+"Keyboard shortcuts <i>(hidden)</i>";
			}
		}

		
		
		prog_div.innerHTML+="<br><div id=\"first_prog_line\"></div>"+postRenderProg()+"<br><br>";
		if (scroll_prop!=-1)
		{
			prog_div.scrollTop=((prog_div.scrollHeight*scroll_prop)|0);
			scroll_prop=-1;
		}
		prev_dbg_line=-1;
		updateBreakPointList();
		for(i=0;i<num_code_lines;i++)
		{
			orig_line_colors[i]=[];
			for(j=1;j<4;j++)
			{
				var id_str="prog_elem_"+j+"_"+i;
				var id_elem=document.getElementById(id_str);
				if (id_elem!=null)
				{
					orig_line_colors[i][j-1]=id_elem.bgColor;
				}
			}
		}
	}
	/*function renderProgDeb()
	{
		pre_render_buf=[];
		preRenderProg(proj_elems,[],null,null,false);
		prog_div.innerHTML="<h1>&nbsp&nbsp&nbsp&nbsp<u>ARGEE Program</u></h1><br>"+postRenderProg();
	}*/
	

	var gen=null;
	var timer=null;
	function advanceGen()
	{
		gen.next();
	}
	function* wait(ms)
	{
		if (timer!=null)
		{
			window.clearTimeout(timer);
		}
		timer=window.setTimeout(advanceGen,ms);
		yield 1;
		window.clearTimeout(timer);
	}
	
	var first_time=true;
	function renderCombined(dontAdjustTextareas)
	{
		
		GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.ARGEE);
		renderEditVars();
		renderProg();
		if (first_time==true)
		{
			prog_view=true;
			first_time=false;
		}
		

	}

	var local_io_datapoints;
	var combined_glob_io_alias_vars;
	var combined_enumerations;
	var hmi_image_variables_enum;
	var function_list_datapoints;
	var hmi_func_datapoints;
	
	
	function getCustElemDatabases(create)
	{
		if (create==true)
		{
			var elem=keyMenuTargElement;
			createDynamicDatapoints();
		}
		return {func:function_list_datapoints,local:local_io_datapoints,glob:combined_glob_io_alias_vars,enums:combined_enumerations,hmi_funcs:hmi_func_datapoints,hmi_vars:hmi_image_variables_enum};
	}

	var debug_mode=false;
	var scroll_prop=-1;
	
	function setDebugMode(debug)
	{
		var top=prog_div.scrollTop;
		var height=prog_div.scrollHeight;
		scroll_to_elem_after_debug=false;
		if (debug==false)
		{
			copyCollapseExpand(proj_elems,true);
			scroll_prop=top/height;
			
			if ((debug==false)&&(lastDebugClickedElem!=null))
			{
				var index=lastDebugClickedElem.slice(0,2);	
				var var_def=getElemFromIndex(index);
				var func_index=index.slice(0);
				func_index[func_index.length]=0;
				var func_def=getElemFromIndex(func_index);
				var_def.hidden_sub=true;
				func_def.expanded=true;	
			}
		}
		else if (debug_mode==false)
		{
			copyCollapseExpand(proj_elems,false);
			handleCollapseExpand(proj_elems,proj_elems,COLEXP.expand,false); 
			keyboard_shortcuts_expanded=false;
			lastDebugClickedElem=null;
		}
		debug_mode=debug;
	}
	
	function findFunctionDescription(funcName)
	{
		var i,j;
		var funcUpper=funcName.toUpperCase();
		for(i=0;i<function_group_list.length;i++)
		{
			for(j=0;j<function_group_list[i].elements.length;j++)
			{
				var name=function_group_list[i].elements[j][0].split("(");
				if ((name.length>1)&&(funcUpper.localeCompare(name[0])==0))
				{
					return function_group_list[i].elements[j][0];
				}
			}
		}
		return null;
	}
	
	function findHmiFuncDescr(arr,funcName)
	{
		var i,j;
		var funcUpper=funcName.toUpperCase();
		for(j=0;j<arr.length;j++)
		{
			var name=arr[j][0].split("(");
			if ((name.length>1)&&(funcUpper.localeCompare(name[0])==0))
			{
				if (arr[j][2]!=undefined)
				{
					// special description for the help string
					return arr[j][2];
				}
				// default
				return arr[j][0];
			}
		}
		return null;
		
	}
	
	var hmi_disp_num_funcs=
	[
		["HEX(var)","HEX()"],
	];
	
	var hmi_finc_disp_val_range=
	[
		["Hex(var)","Hex()"],
	];
	
	
	var hmi_disp_screen_color=
	[
	];

	var hmi_disp_screens=
	[
	];

	
	var hmi_grid_screen_funcs=
	[
		["SCREEN_PROP(Title,width_in_percent_of_screen,enable_rounded_edges,background_color)","SCREEN_PROP(\"Title\",90,false,\"transparent\")"]
	];
	
	var hmi_grid_row_funcs=
	[
		["ROW_PROP(background_color)","ROW_PROP(\"transparent\")"]	
	
	]

	var hmi_grid_sect_funcs=
	[
		["CELL_PROP(column_span,border_style)","CELL_PROP(1,1)"]
	];

	var hmi_grid_elem_funcs=
	[
		["DISPLAY_VALUE(Title,var,units_string,color,size,background_color)","DISPLAY_VALUE(\"Title\",var_name,\"unit\",\"black\",3,\"transparent\")"],
		["ENTER_VALUE(Title,var,units_string,color,size,background_color)","ENTER_VALUE(\"Title\",var_name,\"unit\",\"black\",3,\"transparent\")"],
		["BUTTON(Title,var,color,size,background_color)","BUTTON(\"Title\",var_name,\"black\",3,\"transparent\")"],		
		["STATIC_TEXT(Text,color,size,background_color)","STATIC_TEXT(\"Text\",\"black\",3,\"transparent\")"],
		["SCREEN_LIST(Title,title_font_size,title_color)",  "SCREEN_LIST(\"Screens\",5,\"black\")"],		
		["STATIC_GRAPHICS(image_file_variable,background_color,default_zoom)","STATIC_GRAPHICS(,\"transparent\",100)"],
		["MULTI_STATE_DISPLAY_STRING(Title,var,size,title_color,title_background_color,	value1,......)",  "MULTI_STATE_DISPLAY_STRING(\"Title\",var_name,3,\"black\",\"transparent\",\n0,\"Value 1 string\",\"black\",\"green\")",
		 "MULTI_STATE_DISPLAY_STRING(Title,var,size,title_color,title_background_color,	value1,color1,background1,.......)"],
		["MULTI_STATE_DISPLAY_GRAPHICS(Title,var,title_size,title_color,title_background_color,image_zoom_level,value1,......)",  "MULTI_STATE_DISPLAY_GRAPHICS(\"Title\",var_name,3,\"black\",\"transparent\",100,\n0,,\"transparent\")",
		  "MULTI_STATE_DISPLAY_GRAPHICS(Title,var,title_size,title_color,title_background_color,image_zoom_level,value1,image1,background1...)"],
		["DROPDOWN_LIST(Title,var,size,title_color,background_color,value1,text1,value2,text2......)",  "DROPDOWN_LIST(\"Title\",var_name,3,\"black\",\"transparent\",0,\"Value 1 string\")"],
		["DISPLAY_VALUE_WITH_HEALTH(Title,title_color,size,var,units_string,health_var)","DISPLAY_VALUE_WITH_HEALTH(\"Title\",\"black\",3,var_name,\"unit\",health_var_name)"],
		["LINK(Title_var,value_var,background_color_var,size)","LINK(title_var_name,value_var_name,background_color_var_name,3)"],
		["LOAD_FROM_FILE(Title,req_chunk_size_var,start_pos_var,req_var,exchange_arr_var,file_size_var,title_color,title_size)","LOAD_FROM_FILE(\"Title\",req_chunk_size_var_name,start_pos_var_name,req_var_name,exchange_arr_var_name,file_size_var_name,\"transparent\",3)"],
		["STORE_TO_FILE(Title,req_chunk_size_var,start_pos_var,req_var,exchange_arr_var,title_color,title_size)","STORE_TO_FILE(\"Title\",req_chunk_size_var_name,start_pos_var_name,req_var_name,exchange_arr_var_name,\"transparent\",3)"],		
	];

	
	var function_group_list=
	[
		{group:"String/Arrays", 
				elements:[
							["STR_LEN(str)","STR_LEN()"],
							["STR_LEFT(source_str,num_elems,dest_str)","STR_LEFT(,,)"],
							["STR_RIGHT(source_str,num_elems,dest_str)","STR_RIGHT(,,)"],
							["STR_MID(source_str,start_pos,end_pos,dest_str)","STR_MID(,,,)"],
							["STR_COPY(source_str,dest_str)","STR_COPY(,)"],
							["STR_CAT(source_str,dest_str) - dest_str:=dest_str+source_str","STR_CAT(,)"],
							["STR_COMPARE(str1,str2) - return true if equal","STR_COMPARE(,)"],
							["STR_TO_INT(source_str,base) - Returns a number","STR_TO_INT(,)"],
							["INT_TO_STR(number,dest_str,base)","INT_TO_STR(,,)"],
							["ARRAY_INIT(dest_array,offset,val1,val2,.....)","ARRAY_INIT(,,,,)"],
						 ]
		},
		{group:"Timer", 
				elements:[
							["START_TIMER(Timer,expiration_time)","START_TIMER(,)"],
							["EXPIRED(Timer) - returns True if timer expired","EXPIRED()"],
							["COUNT(Timer) - returns the number of ms since the timer started","COUNT()"],
						 ]
		},
		{group:"Counter", 
				elements:[
							["EXPIRED(Counter) - returns True if Counter expired","EXPIRED()"],
							["COUNT(Counter) - returns the current count","COUNT()"],
						 ]
		},
		
		{group:"Math", 
				elements:[
							["+","+"],
							["-","-"],
							["*","*"],
							["/","/"],
							["% - Modulo","%"],
							["abs(number)","abs()"],
							["min(num1,num2)","min(,)"],
							["max(num1,num2)","max(,)"],
						 ]
		},
		{group:"Brackets", 
				elements:[
							["()","()"],
						 ]
		},
		{group:"Boolean Logic", 
				elements:[
							["& - Boolean AND","&"],
							["| - Boolean OR","|"],
							["! - Boolean NOT","!"],
						 ]
		},
		{group:"Compare", 
				elements:[
							[">",">"],
							["<","<"],
							[">=",">="],
							["<=","<="],
							["=","="],
							["<>","<>"],
						 ]
		},
		{group:"Trigger", 
				elements:[
							["F_COS(value,storage_location) - true if Change of state","F_COS(,)"],
							["R_TRIG(value,storage_location) - true if Rising edge","R_TRIG(,)"],
							["F_TRIG(value,storage_location) - true if Falling edge","F_TRIG(,)"],
						 ]
		},
		{group:"Bit Operations", 
				elements:[
							["GET_BITS(curr_val,offset,length) - return bitfield","GET_BITS(,,)"],
							["SET_BITS(curr_val,offset,length,bitfield) - return curr_val with injected bitfield","SET_BITS(,,,)"],
						 ]
		},
		{group:"Advanced IO/PLC Array/Int Operations - could overlap with mapped IO", 
				elements:[
							["GET_IO_INP_INT(slot,bit_io_offset,bit_length)","GET_IO_INP_INT(,,)"],
							["SET_IO_OUTP_INT(slot,bit_io_offset,bit_length,int_value)","SET_IO_OUTP_INT(,,,)"],
							["SET_IO_PARAM_INT(slot,bit_io_offset,bit_length,int_value)","SET_IO_PARAM_INT(,,,)"],
							["GET_IO_PARAM_INT(slot,bit_io_offset,bit_length)","SET_IO_PARAM_INT(,,)"],
							["GET_IO_DIAG_INT(slot,bit_io_offset,bit_length)","GET_IO_DIAG_INT(,,)"],
							["GET_IO_INP_ARR(slot,dest_arr,dst_arr_offset,byte_io_offset,byte_length)","GET_IO_INP_ARR(,,,,)"],
							["SET_IO_OUTP_ARR(slot,src_arr,src_arr_offset,byte_io_offset,byte_length)","SET_IO_OUTP_ARR(,,,,)"],
							["GET_IO_DIAG_ARR(slot,dest_arr,dst_arr_offset,byte_io_offset,byte_length)","GET_IO_DIAG_ARR(,,,,)"],
							["GET_PLC_INP_ARR(dest_arr,byte_plc_offset,byte_length)","GET_PLC_INP_ARR(,,)"],
							["SET_PLC_OUTP_ARR(src_arr,byte_plc_offset,byte_length)","SET_PLC_OUTP_ARR(,,)"],
							["WRITE_DS(stream_id,array,msg_len)","WRITE_DS(,,)"],
							["READ_DS(stream_id,array,received_len)","READ_DS(,,)"],
						 ]
		},
		{group:"Protocol Conversion - Endianess", 
				elements:[
							["LE_GET_16BIT(arr,offset) -  returns extracted value","LE_GET_16BIT(,)"],
							["BE_GET_16BIT(arr,offset) -  returns extracted value","BE_GET_16BIT(,)"],
							["LE_GET_32BIT(arr,offset) -  returns extracted value","LE_GET_32BIT(,)"],
							["BE_GET_32BIT(arr,offset) -  returns extracted value","BE_GET_32BIT(,)"],
							["LE_SET_16BIT(arr,offset,val) -  sets value in the array offset","LE_SET_16BIT(,,)"],							
							["BE_SET_16BIT(arr,offset,val) -  sets value in the array offset","BE_SET_16BIT(,,)"],
							["LE_SET_32BIT(arr,offset,val) -  sets value in the array offset","LE_SET_32BIT(,,)"],
							["BE_SET_32BIT(arr,offset,val) -  sets value in the array offset","BE_SET_32BIT(,,)"],
						 ]
		},
	];
	
	
	function createGlobAndEnumLists()
	{
		var i,ii,iii,name;
		// create combined global/PLC variables
		combined_glob_io_alias_vars=createNewElem(findBlockDescr(block_types.comb_glob_vars));
		var source=getElemFromIndex([0,0]);
		for(i=0;i<source.sub_elems.length;i++)
		{
			if ((source.sub_elems[i].type==block_types.reg_var)&&(source.sub_elems[i].values[0].localeCompare(default_task_name)==0))
			{
			}
			else
			{
				combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=source.sub_elems[i];
			}
		}
		source=getElemFromIndex([0,1]);
		for(i=0;i<source.sub_elems.length;i++)
		{
			combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=source.sub_elems[i];
		}
		
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=createNewElem(findBlockDescr(block_types.enum_var_elem));	
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length-1].values[0]="PLC_CONNECTED";
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=createNewElem(findBlockDescr(block_types.enum_var_elem));			
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length-1].values[0]="PROG_CYCLE_TIME";
				

		
		// create combined enumeration
		combined_enumerations=createNewElem(findBlockDescr(block_types.comb_state_vars));
		{
			var source=getElemFromIndex([1]);
			for(i=0;i<source.sub_elems.length;i++)
			{
				if (source.sub_elems[i].type==block_types.enum_var)
				{
					for(j=0;j<source.sub_elems[i].sub_elems.length;j++)
					{
						combined_enumerations.sub_elems[combined_enumerations.sub_elems.length]=source.sub_elems[i].sub_elems[j];
					}
				}
			}
		}
		
		
	}
	
	function findParamDatapointDescr(name_to_compare)
	{
		var i,ii,iii,name;
		// IO Variables
		for(i=0;i<IO_ids.length;i++)
		{
			var slice_index=findIndex(IO_ids[i]);
			//for(ii=0;ii<slices[slice_index].sections.length;ii++)
			ii=sect_type.param;
			{
				//if (slices[slice_index].sections[ii].type==sect_type.param)
				{
					for(iii=0;iii<slices[slice_index].sections[ii].objects.length;iii++)
					{
						name="IO_"+SIM.getSlotName(i,true)+"_"+sect_names[ii]+"_"+slices[slice_index].sections[ii].objects[iii].name;
						if (name_to_compare.toUpperCase().localeCompare(name.toUpperCase())==0)
						{
							return {slot:i,sect:ii,obj:iii};
						}
					}
				}
			}
		}
		return null;
	}
	
	function createDynamicDatapoints()
	{
		var i,j,k,slot;
		
		
		function_list_datapoints=createNewElem(findBlockDescr(block_types.local_io_var));
		for(i=0;i<function_group_list.length;i++)
		{
			function_list_datapoints.sub_elems[i]=createNewElem(findBlockDescr(block_types.local_io_slot));
			function_list_datapoints.sub_elems[i].values[0]=function_group_list[i].group;
			for(j=0;j<function_group_list[i].elements.length;j++)
			{
				function_list_datapoints.sub_elems[i].sub_elems[j]=createNewElem(findBlockDescr(block_types.local_io_elem));	
				function_list_datapoints.sub_elems[i].sub_elems[j].values[0]=function_group_list[i].elements[j][0];
				function_list_datapoints.sub_elems[i].sub_elems[j].values[4]=function_group_list[i].elements[j][1];
			}
		}
		
		
		local_io_datapoints=createNewElem(findBlockDescr(block_types.local_io_var));
		var local_io_param_only=false;
		

		for(i=0;i<IO_ids.length;i++)
		{
			var slice_index=findIndex(IO_ids[i]);
			local_io_datapoints.sub_elems[i]=createNewElem(findBlockDescr(block_types.local_io_slot));
			// slot number
			local_io_datapoints.sub_elems[i].values[0]=SIM.getSlotName(i,true);
			local_io_datapoints.sub_elems[i].values[1]=slices[slice_index].name;
			local_io_datapoints.sub_elems[i].values[2]=slices[slice_index].id;
			
			for(j=0;j<slices[slice_index].sections.length;j++)
			{
				if ((((j!=sect_type.param)&&(local_io_param_only==false))||
				      ((j==sect_type.param)&&(local_io_param_only==true)))&&(slices[slice_index].sections[j].objects.length>0))
				{
					var latest_segm=local_io_datapoints.sub_elems[i].sub_elems.length;
					local_io_datapoints.sub_elems[i].sub_elems[latest_segm]=createNewElem(findBlockDescr(block_types.local_io_sect));	
					local_io_datapoints.sub_elems[i].sub_elems[latest_segm].values[0]=sect_names[j];
					for(k=0;k<slices[slice_index].sections[j].objects.length;k++)
					{
						local_io_datapoints.sub_elems[i].sub_elems[latest_segm].sub_elems[k]=createNewElem(findBlockDescr(block_types.local_io_elem));
						local_io_datapoints.sub_elems[i].sub_elems[latest_segm].sub_elems[k].values[0]=slices[slice_index].sections[j].objects[k].name;
						local_io_datapoints.sub_elems[i].sub_elems[latest_segm].sub_elems[k].values[1]=slices[slice_index].sections[j].objects[k].offset;
						local_io_datapoints.sub_elems[i].sub_elems[latest_segm].sub_elems[k].values[2]=slices[slice_index].sections[j].objects[k].length;
					}
				}
			}
		}
		if (local_io_param_only==false)
		{
			for(j=0;j<2;j++,i++)
			{
				// Add PLC datapoints
				local_io_datapoints.sub_elems[i]=createNewElem(findBlockDescr(block_types.local_io_slot));
				// slot number
				if (j==0)
				{
					local_io_datapoints.sub_elems[i].values[0]="ARGEE_TO_PLC";
				}
				else
				{
					local_io_datapoints.sub_elems[i].values[0]="PLC_TO_ARGEE";
				}
				local_io_datapoints.sub_elems[i].values[1]="";
				local_io_datapoints.sub_elems[i].values[2]=0;
				
				for(k=0;k<240;k++)
				{
					local_io_datapoints.sub_elems[i].sub_elems[k]=createNewElem(findBlockDescr(block_types.local_io_elem));
					local_io_datapoints.sub_elems[i].sub_elems[k].values[0]="Word"+k;
					local_io_datapoints.sub_elems[i].sub_elems[k].values[1]=0;
					local_io_datapoints.sub_elems[i].sub_elems[k].values[2]=0;
				}
			}
		}

		
		
		
		// create combined global/PLC variables
		combined_glob_io_alias_vars=createNewElem(findBlockDescr(block_types.comb_glob_vars));
		var source=getElemFromIndex([0,0]);
		for(i=0;i<source.sub_elems.length;i++)
		{
			if ((source.sub_elems[i].type==block_types.reg_var)&&(source.sub_elems[i].values[0].localeCompare(default_task_name)==0))
			{
			}
			else
			{
				combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=source.sub_elems[i];
			}
		}
		var source=getElemFromIndex([0,1]);
		for(i=0;i<source.sub_elems.length;i++)
		{
			combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=source.sub_elems[i];
		}
		
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=createNewElem(findBlockDescr(block_types.enum_var_elem));	
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length-1].values[0]="PLC_CONNECTED";
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length]=createNewElem(findBlockDescr(block_types.enum_var_elem));			
		combined_glob_io_alias_vars.sub_elems[combined_glob_io_alias_vars.sub_elems.length-1].values[0]="PROG_CYCLE_TIME";
				

		var actElemBlock=DESCR.getElemFromIndex(JSON.parse(keyMenuTargElement.dataset.elem_index))
		var descr=descr_lookup[actElemBlock.type];
		if (descr.hmi_func_array!=undefined)
		{
			hmi_func_datapoints=createNewElem(findBlockDescr(block_types.comb_state_vars));
			var hmi_functions_group_list=DESCR[descr.hmi_func_array];
			for(i=0;i<hmi_functions_group_list.length;i++)
			{
				hmi_func_datapoints.sub_elems[i]=createNewElem(findBlockDescr(block_types.local_io_elem));
				hmi_func_datapoints.sub_elems[i].values[0]=hmi_functions_group_list[i][0];	
				hmi_func_datapoints.sub_elems[i].values[4]=hmi_functions_group_list[i][1];	
			}
			hmi_image_variables_enum=createNewElem(findBlockDescr(block_types.comb_state_vars));
			{
				for(i=0;i<hmi_image_variables.length;i++)
				{
					hmi_image_variables_enum.sub_elems[i]=createNewElem(findBlockDescr(block_types.local_io_elem));
				
					hmi_image_variables_enum.sub_elems[i].values[0]="\""+hmi_image_variables[i]+"\"";
					hmi_image_variables_enum.sub_elems[i].values[4]="\""+hmi_image_variables[i]+"\"";
				}
			}
		}
		else
		{
			hmi_func_datapoints=null;
			hmi_image_variables_enum=null;
		}
		
		
		// create combined enumeration
		combined_enumerations=createNewElem(findBlockDescr(block_types.comb_state_vars));
		if (keyMenuTargElement.dataset.elem_force_param_value_disp=="true")
		{
			var elem=keyMenuTargElement;
			var index=JSON.parse(elem.dataset.elem_index);
			var parent=getParentArr(index);
			var last_index_elem=index[index.length-1];
			var act_elem=parent.sub_elems[last_index_elem];
			var struct=findParamDatapointDescr(act_elem.values[0]);
			var obj=slices[struct.slot].sections[struct.sect].objects[struct.obj];
			if (obj.enumList!=undefined)
			{
				for(j=0;j<obj.enumList.length;j++)
				{
					combined_enumerations.sub_elems[combined_enumerations.sub_elems.length]=createNewElem(findBlockDescr(block_types.enum_var_elem));
					combined_enumerations.sub_elems[combined_enumerations.sub_elems.length-1].values[0]=obj.enumList[j].str;
				}
			}
		}
		else
		{
			for (k=0;k<proj_elems.sub_elems.length;k++)
			{
				if (proj_elems.sub_elems[k].type==block_types.module)
				{
					var source=proj_elems.sub_elems[k];
					for(i=0;i<source.sub_elems.length;i++)
					{
						if (source.sub_elems[i].type==block_types.enum_var)
						{
							for(j=0;j<source.sub_elems[i].sub_elems.length;j++)
							{
								combined_enumerations.sub_elems[combined_enumerations.sub_elems.length]=source.sub_elems[i].sub_elems[j];
							}
						}
					}
				}
			}
		}
	}
	

	// initialize
	function init()
	{
		proj_elems=createNewElem(findBlockDescr(block_types.root));
		proj_elems.sub_elems[0]=createNewElem(findBlockDescr(block_types.device));
		// program variable initialization
		proj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(0,0,createNewElem(findBlockDescr(block_types.reg_var)));
		proj_elems.sub_elems[0].sub_elems[0].sub_elems[0].values[0]="reg1";
		proj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(0,0,createNewElem(findBlockDescr(block_types.reg_var)));
		proj_elems.sub_elems[0].sub_elems[0].sub_elems[0].values[0]="reg2";
		
		proj_elems.sub_elems[0].sub_elems[0].sub_elems.splice(0,0,createNewElem(findBlockDescr(block_types.reg_var)));
		proj_elems.sub_elems[0].sub_elems[0].sub_elems[0].values[0]="main_task";
		proj_elems.sub_elems[0].sub_elems[0].sub_elems[0].values[1]=7;
		
		

		
		proj_elems.sub_elems[1].sub_elems.splice(0,0,createNewElem(findBlockDescr(block_types.funct_block_var)));
		proj_elems.sub_elems[1].sub_elems[0].values[0]="MainTask"
		proj_elems.sub_elems[1].sub_elems[0].sub_elems[1].values[1]=5;
		proj_elems.sub_elems[1].sub_elems[0].sub_elems[1].values[0]="tm1";
		proj_elems.sub_elems[1].sub_elems[0].sub_elems.splice(1,0,createNewElem(findBlockDescr(block_types.funct_block_elem_var)));
		proj_elems.sub_elems[1].sub_elems[0].sub_elems[1].values[1]=5;
		proj_elems.sub_elems[1].sub_elems[0].sub_elems[1].values[0]="tm2";
		proj_elems.sub_elems[1].sub_elems[0].sub_elems.splice(1,0,createNewElem(findBlockDescr(block_types.funct_block_elem_var)));
		proj_elems.sub_elems[1].sub_elems[0].sub_elems[1].values[1]=5;
		proj_elems.sub_elems[1].sub_elems[0].sub_elems[1].values[0]="cnt1";
		
		
		
		
	}


	function updateHiddenTypes()
	{

	}	
	
	/*function exp_enum(elem)
	{
		var temp=1;
		elem.size=10;
		
	}*/
	
	function renderInCompactMode()
	{
		handleCollapseExpand(proj_elems,proj_elems,COLEXP.collapse_default,false); 
		renderCombined(true);
	}
	
	function gotoFuncBlock(elem)
	{
		var index=JSON.parse(elem.dataset.elem_index);
		rend_mode=REND_MODE.COMPACT;
		var prev_elem_pos=getOffset(elem,var_div).top;
		var curr_elem_pos;
		if (rend_mode==REND_MODE.COMPACT)
		{
			
			handleCollapseExpand(proj_elems,proj_elems,COLEXP.collapse_default,true); 
			// expand only the specific function block variables as well as function block code
			var var_def=getElemFromIndex(index);
			var func_index=index.slice(0);
			func_index[func_index.length]=0;
			var func_def=getElemFromIndex(func_index);
			var_def.hidden_sub=true;
			func_def.expanded=true;
			renderCombined(true);
			
			
			/*var id_var_str="elem_line_id_"+getID_FromIndex(index);
			id_elem=document.getElementById(id_var_str);
			if (id_elem!=null)
			{
				curr_elem_pos=getOffset(id_elem,var_div).top;
				var elem_pos_diff=curr_elem_pos-prev_elem_pos;
				console.log("positions:"+curr_elem_pos+"  " + prev_elem_pos+ "diff="+elem_pos_diff+" scrollTop="+var_div.scrollTop);
				if (Math.abs(elem_pos_diff)>5)
				{
					var_div.scrollTop+=elem_pos_diff;
				}
			}*/
			
		}
		
			
		index[index.length]=0;
		var id=getID_FromIndex(index);
		var id_str="func_block_id_"+id;
		id_elem=document.getElementById(id_str);
		if (id_elem!=null)
		{
			id_elem.scrollIntoView(true);
			prog_div.scrollTop-=10;
		}
	}

	function replaceFuncCallWithFuncBlockCall(elem)
	{
		if (elem.type==block_types.func_call)
		{
			elem.type=block_types.func_block_call;
		}
		if (elem.sub_elems!=undefined)
		{
			var i;
			for(i=0;i<elem.sub_elems.length;i++)
			{
				replaceFuncCallWithFuncBlockCall(elem.sub_elems[i]);
			}
		}
	}
		
	
	function loadLocal()
	{
		var new_proj_elems=JSON.parse(getLocalStorage("prog_code"));
		replaceFuncCallWithFuncBlockCall(new_proj_elems);
		eliminateDuplicateAddButtons(new_proj_elems);
		proj_elems.sub_elems=new_proj_elems.sub_elems;
		
		prog_var_types_enum.splice(0,prog_var_types_enum.length);
		var compl_types=new_proj_elems.prog_var_types_enum;
		for(i=0;i<compl_types.length;i++)
		{
			prog_var_types_enum.splice(prog_var_types_enum.length,0,compl_types[i]);
		}
		if (new_proj_elems.basic_mode==false)
		{
			setBasicMode(false);
		}
		
	}
	
		
	function updateBreakPointList()
	{
		var i;
		var arr=GOM.getObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0);
		if (arr==undefined)
		{
			return;
		}
		for(i in arr)
		{
			var id_str="prog_elem_1_"+i;
			var id_elem=document.getElementById(id_str);
			if (id_elem==null)
			{
				continue;
			}
			if (arr[i]==true)
			{
				//id_elem.bgColor="red";
				id_elem.style.backgroundColor="red"
			}
			else		
			{
				//id_elem.bgColor="white";
				id_elem.style.backgroundColor="inherit"
			}
		}
	}
	var debug_iter=0;
	var prev_dbg_line=-1;
	
	var exception_descr=
	[
"ARGEE_EXCEPTION_OUT_OF_BOUNDS_ACCESS                 ",
"ARGEE_EXCEPTION_BYTE_ARRAY_TOO_SMALL_FOR_ARP         ",
"ARGEE_EXCEPTION_BYTE_ARRAY_TOO_SMALL_FOR_RESPONSE    ",
"ARGEE_EXCEPTION_DIFFERENT_BYTE_ARRAY_PASSED          ",
"ARGEE_EXCEPTION_RECEIVE_BUFFER_TOO_SMALL             ",
"ARGEE_EXCEPTION_NUM_ARR_LESS_THAN_12_BYTES           ",
"ARGEE_EXCEPTION_BYTE_ARRAY_TOO_SMALL                 ",
"ARGEE_EXCEPTION_CURR_SLAVE_LARGER_THAN_NUM_SLAVES    ",
"ARGEE_EXCEPTION_OT_SIZE_BIGGER_THAN_BYTE_ARR         ",
"ARGEE_EXCEPTION_TO_SIZE_BIGGER_THAN_LONG_ARR         ",
"ARGEE_EXCEPTION_BYTE_ARR_LESS_THAN_TOTAL_INP_OUTP    ",
"ARGEE_EXCEPTION_STRLEN_CANT_FIND_STR_TERMINATOR      ",
"ARGEE_EXCEPTION_ACCESS_BEYOND_SOURCE_ARR             ",
"ARGEE_EXCEPTION_ACCESS_BEYOND_DST_ARR                ",
"ARGEE_EXCEPTION_PREMATURE_SRC_STR_TERMINATOR         ",
"ARGEE_EXCEPTION_NUMBER_STRING_TOO_LARGE              ",
"ARGEE_EXCEPTION_STRING_TOO_SMALL                     ",
"ARGEE_EXCEPTION_INVALID_IO_SLOT                      ",
"ARGEE_EXCEPTION_INVALID_OFFSET_OR_SIZE_OR_SLOT       ",
"ARGEE_EXCEPTION_NUM_ARR_LESS_THAN_20_BYTES           ",
	]
	
	function refreshCodeInDebug()
	{
		var i;
		var line_bg_color=fastClone(orig_line_colors);
		var inst_trace_lines=GOM.getObjArr("INSTR_TRACE",0);
		var wait_trace=GOM.getObjArr("WAIT_TRACE",0);
		// check if a line has a trace element highlighting it
		for(i=0;i<inst_trace_lines.length;i++)
		{
			if (line_bg_color[inst_trace_lines[i]]==undefined)
			{
				continue;
			}
			if (inst_trace_lines[i]>=0)
			{
				if ((debug_iter%2)==0)
				{
					line_bg_color[inst_trace_lines[i]][1]="#90fe00";
				}
				else
				{
					line_bg_color[inst_trace_lines[i]][1]="#90ee90";
				}
				
				line_bg_color[inst_trace_lines[i]][2]="Chartreuse";
			}
		}
		
		
		for(i=0;i<wait_trace.length;i++)
		{
			if (line_bg_color[wait_trace[i]]==undefined)
			{
				continue;
			}
			if (wait_trace[i]>=0)
			{
				if ((debug_iter%2)==0)
				{
					//line_bg_color[wait_trace[i]][1]="#f2d00d";
					line_bg_color[wait_trace[i]][1]="#e6e600";
				}
				else
				{
					line_bg_color[wait_trace[i]][1]="#ccb533";
				}
				
				line_bg_color[wait_trace[i]][2]="#ecec13";
			}
		}

		if (GOM.getObjNum("GOTO_LINE",0)!=-1)
		{
			if (GOM.getObjNum("GOTO_LINE",0)==-2)
			{
				prev_dbg_line=-1;
				GOM.setObjNum("GOTO_LINE",0,-1);
			}
			else
			{
				var nst_line=GOM.getObjNum("GOTO_LINE",0);
				var argee_line=PARSE.getARGEE_Prog_Line_From_NST(nst_line);
				var id_str;
				if (argee_line>4)
				{
					id_str="prog_elem_1_"+(argee_line-4);
				}
				else
				{
					id_str="first_prog_line"
					//id_str="prog_elem_1_"+(argee_line);
				}
				var id_elem=document.getElementById(id_str);
				if (id_elem!=null)
				{
					console.log("new position "+(new Date()).getTime());
					id_elem.scrollIntoView();
				}
				//
				GOM.setObjNum("GOTO_LINE",0,-1);
			}
		}	
		
		debug_iter++;
		if (GOM.getObjNum("DEV_RUN",0)==0)
		{
			var task_trace_level=GOM.getObjNum("DBG_TASK_TRACE_LEVEL",0);

			var task_trace=GOM.getObjNum("DBG_TASK_TRACE",0);
			
			var pc=task_trace[task_trace_level].pc;
			var nst_line=DEB.DEB_getLineNumFromPC(pc);
			if (nst_line>=0)
			{
				var argee_line=PARSE.getARGEE_Prog_Line_From_NST(nst_line);
				line_bg_color[argee_line][2]="red";
				if ((debug_iter%2)==0)
				{
					line_bg_color[argee_line][1]="red";
				}
				else
				{
					if (GOM.getObjNum("DEV_EXCEPTION",0)==1)
					{
						setCompilerMessage(false,true,"Exception detected in the Program item: "+ (argee_line)+" Exception:  "+exception_descr[GOM.getObjNum("DEV_EXCEPTION_NUM",0)]);
						line_bg_color[argee_line][1]="black";
					}
					else
					{
						line_bg_color[argee_line][1]="pink";
					}
				}
				if (prev_dbg_line!=argee_line)
				{
					var id_str;
					if (argee_line>4)
					{
						id_str="prog_elem_1_"+(argee_line-4);
					}
					else
					{
						id_str="prog_elem_1_"+(argee_line);
					}
					var id_elem=document.getElementById(id_str);
					if (id_elem!=null)
					{
						console.log("new position "+(new Date()).getTime());
						id_elem.scrollIntoView();
					}
					prev_dbg_line=argee_line;
				}
			}
		}
		else
		{
			prev_dbg_line=-1;
		}
		for(i=0;i<num_code_lines;i++)
		{
			for(j=0;j<3;j++)
			{
				var id_str="prog_elem_"+(j+1)+"_"+i;
				var id_elem=document.getElementById(id_str);
				if (id_elem!=null)
				{
					/*if ((j==0)&&((id_elem.dataset.elem_type==block_types.func_block_call)||(id_elem.dataset.elem_type==block_types.ladder_func_block_call)))
					{
						break;
					}*/
					if ((j==0)&&((id_elem.dataset.sub_exist==1)||(id_elem.dataset.elem_type==block_types.wait_until))&&((id_elem.dataset.elem_type!=block_types.func_block_call)||(id_elem.dataset.elem_type!=block_types.ladder_func_block_call))&&(line_bg_color[i][1]==orig_line_colors[i][1]))
					{
						line_bg_color[i][1]="lightgrey";
						line_bg_color[i][2]="lightgrey";
					}
					id_elem.bgColor=line_bg_color[i][j];
				}
			}
		}
	}
	function setNewTypeEnum(enum_types)
	{
		var i;
		prog_var_types_enum.splice(0,prog_var_types_enum.length);
		for(i=0;i<enum_types.length;i++)
		{
			prog_var_types_enum[i]=enum_types[i];
		}
		proj_elems.prog_var_types_enum=prog_var_types_enum;
	}
	function getTypeEnum()
	{
		return prog_var_types_enum;
	}
	
	var print_mode=false;

	var helpWindow=null;

	function setPrintMode(mode)	
	{
		print_mode=mode;
	}
		

	
	function delayedScrollTo(elem_id)
	{
		if ((helpWindow!=null)&&(helpWindow.closed==false))
		{
			var elem=helpWindow.window.document.getElementById(elem_id);
			elem.scrollIntoView();
		}
	}
	
	function dispPrintPreview_imp(show_print_prev,scroll_to_id,proj_preview,gom,slices_arr)
	{
		var prog;
		var new_window=false;
		
		
		

		if ((helpWindow==null)||(helpWindow.closed==true)||(proj_preview==true))
		{
         copyCollapseExpand(proj_elems,false);
			IO_CONF.setRW_RenderMode(false);
			var i;
			var device_info="<h1>Device Info:</h1><h2><b>"+gom.arrToString(gom.getObjArr("ARGEE_DEV_NAME",0))+"</b>&nbsp&nbsp (<b>"+gom.arrToString(gom.getObjArr("IP_ADDRESS",0))+"</b>) <b>"+gom.arrToString(gom.getObjArr("SAPI_APP_VER_STRING",0))+"</b></h2>";
			device_info+="<h2>Project Title:"+gom.arrToString(gom.getObjArr("ARGEE_PROJ_TITLE",0))+"</h2><br><br>";
			var win_title=gom.arrToString(gom.getObjArr("ARGEE_PROJ_TITLE",0))+" On "+gom.arrToString(gom.getObjArr("ARGEE_DEV_NAME",0));

			var params="<h1>&nbsp&nbsp&nbsp&nbsp<u>Non-Default Parameters</u></h1><br>";
			for(i=1;i<slices_arr.length;i++)
			{
				var curr_slot_params=IO_CONF.BEP_RenderParams(i,slices_arr,gom);
				if (curr_slot_params!="")
				{
					params+="<br><br>"
				}
				params+=curr_slot_params;
			}
			print_mode=true;
			curr_var_elem_cnt=1;
			pre_render_buf=[];
			handleCollapseExpand(proj_elems,proj_elems,COLEXP.expand,false);
			var var_rend="<h1>&nbsp&nbsp&nbsp&nbsp<u>Variables and Definitions</u></h1><br>"+renderEditVars_imp(proj_elems,[],proj_elems);
			new_window=true;
			orig_line_colors=[];
			pre_render_buf=[];
			curr_prog_line=0;
			createFuncBlockHelpStringCache();
			//console.log("prog_rend"+cnt_rend);cnt_rend++;
			
			preRenderProg(proj_elems,[],null,null);
			prog="<DIV style=\"page-break-after:always\"></DIV><h1>&nbsp&nbsp&nbsp&nbsp<u>ARGEE Program</u></h1><br><div id=\"first_prog_line\"></div>"+postRenderProg();

			var printWindow;
			if (proj_preview==false)
			{
				printWindow = window.open('', '', 'height=400,width=800');
						printWindow.document.write('<html><head><title>'+win_title+'</title>');
						printWindow.document.write('<style>  body { font-size: 75%; }</style></head><body >');
						printWindow.document.write(device_info);
						printWindow.document.write(params);
						printWindow.document.write(var_rend);
						printWindow.document.write(prog);
						printWindow.document.write('</body></html>');
						printWindow.document.close();
				if (show_print_prev==false)
				{				
					var links = printWindow.window.document.getElementsByTagName("a");
					for(var i=0;i<links.length;i++)
					{
						links[i].removeAttribute('href');
					}
				}
				if (show_print_prev==true)
				{
					printWindow.print();
				}
				helpWindow=printWindow;
			}
			else
			{
				var html="<html><head><title>"+win_title+"</title><style>  body { font-size: 75%; }</style></head><body >"+device_info+params+var_rend+prog+"</body></html>";
				return html;
			}
				
			copyCollapseExpand(proj_elems,true);		
			print_mode=false;		

		}
		if (scroll_to_id!=null)
		{
			if (new_window==true)
			{
				setTimeout(delayedScrollTo,100,scroll_to_id);
			}
			else
			{
				delayedScrollTo(scroll_to_id);
			}
		}
	}
	
	

	
	function dispPrintPreview()
	{
		dispPrintPreview_imp(true,null,false,GOM,slices);
	}	

	
	function textAreaAdjust(elem)
	{
		var rows=(elem.value.split(/\r\n|\r|\n/).length);
		/*if ((elem.scrollHeight > elem.offsetHeight)&&(elem.value.charAt(elem.value.length-1)!='\n'))
		{
			elem.value+="\n";
			rows++;
		}*/		
		elem.rows=rows;
	}	


	
	function renderDefaultView(changeToCompact)
	{
		initDragAndDrop();
		if (changeToCompact==true)
		{
			renderInCompactMode()
		}
		else
		{
			renderCombined(true);
		}
		curr_undo_pos=-1;
		last_active_undo=-1;
		undo_points=[];
		addUndo();
		if (lastDebugClickedElem!=null)
		{
			lastDebugClickedElem=null;
			var id_elem=document.getElementById(lastDebugClickedElemId);
			if (id_elem!=null)
			{
				id_elem.scrollIntoView(true);
				// these are relative to the viewport
				var top = lastDebugClickedViewportPos.top;
				prog_div.scrollTop-=top;
			}
		}
	}
			
	

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Block selection mouse hook - Begin
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	var selection_in_prog=false

	var curr_selection_arr=[];
	var block_selected_elements=[];
	var block_selected_first_index=null;

	function clearBlockSelection()
	{
		curr_selection_arr=[];
		
	}
	
	function clearBlockSelectedElements()
	{
		block_selected_elements=[];
	}
		

	function updateTDs(ind1,ind2,color)
	{
		var first_index=ind1;
		var last_elem=ind2;
		var curr=clone(first_index);
		
		if (ind1[ind1.length-1]==ind2[ind2.length-1])
		{
			return;
		}
		
		var break_point_list=GOM.getObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0);
		for(i=first_index[first_index.length-1];i<=last_elem[last_elem.length-1];i++)
		{
			curr[curr.length-1]=i;
			var td_elem=DESCR.findTD_Elem(document.querySelectorAll('[data-elem_index=\''+JSON.stringify(curr)+'\']'));
			if (td_elem!=null)
			{
				var elem_id_arr=td_elem.id.split("prog_elem_1_");
				if (color=="inherit")
				{
					var curr_elem=getElemFromIndex(curr);
					if ((curr_elem.commented==1)||(curr_elem.commented==2))
					{
						td_elem.style.backgroundColor="grey";
					}
					else if ((elem_id_arr.length==2)&&(break_point_list[num(elem_id_arr[1])]==true))
					{
						td_elem.style.backgroundColor="red";
					}
					else
					{
						td_elem.style.backgroundColor="inherit";
					}
				}
				else
				{
					td_elem.style.backgroundColor=color;
				}
				
			}
		}
		
	}

	function updateSelectionColor(color)
	{
		var i;
		if (curr_selection_arr.length==2)
		{
			var first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var last_elem=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			updateTDs(first_index,last_elem,color);
		}
	}

	var mouse_down=false;
	var elementMouseIsOver;
	var lastDebugClickedElem=null;
	var lastDebugClickedElemId;
	var lastDebugClickedViewportPos;
	
	document.onmousedown=function(evt)
	{
		/*if (prog_view==false)
		{
			return true;
		}*/
		var x = evt.clientX, y = evt.clientY;
		elementMouseIsOver = document.elementFromPoint(x, y);
		if (debug_mode==true)
		{
			if ((elementMouseIsOver.dataset.elem_index!=undefined)&&(elementMouseIsOver.dataset.elem_type!=undefined)&&(elementMouseIsOver.nodeName=="TD"))
			{
				lastDebugClickedElem=JSON.parse(elementMouseIsOver.dataset.elem_index);			
				lastDebugClickedElemId=elementMouseIsOver.id;
				
				lastDebugClickedViewportPos = elementMouseIsOver.getBoundingClientRect();
				
				//var elm=DESCR.getElemFromIndex(lastDebugClickedElem)
			}
		}
		if (elementMouseIsOver==null)
		{
			return true;
		}
		if ((prog_view!=true)||(elementMouseIsOver.dataset==undefined))
		{
			return true;
		}
		
		// check if there is an active element we are typing in
		
		updateSelectionColor("inherit");
		mouse_down=true;
		
		if (elementMouseIsOver.dataset.elem_edit_index!=undefined)
		{
			//var act_elem=JSON.parse(elementMouseIsOver.dataset.elem_edit_index);
			//var elem=DESCR.getElemFromIndex(act_elem);
			elementMouseIsOver.dataset.elem_index=elementMouseIsOver.dataset.elem_edit_index;
			handleEvent(event.EDIT_INIT,elementMouseIsOver);
			return false;
		}
		else if ((elementMouseIsOver.dataset.elem_index!=undefined)&&(elementMouseIsOver.dataset.elem_type!=undefined)&&(elementMouseIsOver.nodeName=="TD"))
		{
			//if (evt.ctrlKey==true)
			{
				if (document.activeElement!=null)
				{
					document.activeElement.blur();
				}
				updateSelectionColor("inherit");
				clearBlockSelection();
				curr_selection_arr[0]=elementMouseIsOver;
				curr_selection_arr[1]=elementMouseIsOver;
				selection_in_prog=true;
				//block_selected_elements=[]; // new selection
				//block_selected_first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);;
				document.addEventListener("mousemove",selectionMouseMove,false);
				//console.log("Elem pressed "+elementMouseIsOver.dataset.elem_index);
				//curr_selection_arr[curr_selection_arr.length]=elementMouseIsOver;
				updateSelectionColor("lightgreen");
			}
			return false;
		}
			
		
		return true;
	}
	function selectionMouseMove(evt)
	{
		if (selection_in_prog==false)
		{
			return true;
		}
		var x = evt.clientX, y = evt.clientY,
		elementMouseIsOver = document.elementFromPoint(x, y);
		if (elementMouseIsOver==null)
		{
			return;
		}
		if ((elementMouseIsOver.dataset.elem_index!=undefined)&&(elementMouseIsOver.dataset.elem_type!=undefined)&&(elementMouseIsOver.nodeName=="TD"))
		{
			var index_first=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var index_last=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			var index_curr=JSON.parse(elementMouseIsOver.dataset.elem_index);
			if (index_curr.length!=index_first.length)
			{
				//console.log("Elem index length wrong");
				return false;
			}
			if (arrayCmp(index_last,index_curr,0,index_last.length-1)==false)
			{
				//console.log("Elem different function block");
				// different function block element
				return false;
			}
			if (index_first[index_first.length-1]>index_curr[index_curr.length-1])
			{
				//console.log("smaller than first elem");
				// can't select beyond the first element
				return false;
			}
			if (index_last[index_last.length-1]!=index_curr[index_curr.length-1])
			{
				if (index_last[index_last.length-1]>=index_curr[index_curr.length-1])
				{
					updateTDs(index_curr,index_last,"inherit");
				}
				curr_selection_arr[1]=elementMouseIsOver;
				updateSelectionColor("lightgreen");
				//console.log("Elem added "+elementMouseIsOver.dataset.elem_index);
				return false;
			}
		}
		return false;
	}

	function getCurrSelectedBlocks()
	{
		var block_elements=[];
		if (curr_selection_arr.length>=2)
		{
			var first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var last_index=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			for(i=0,j=first_index[first_index.length-1];j<=last_index[last_index.length-1];i++,j++)
			{
				first_index[first_index.length-1]=j;
				block_elements[i]=fastClone(DESCR.getElemFromIndex(first_index));
			}
		}
		return block_elements;
	}
	
	
	document.onmouseup=function(evt)
	{
		mouse_down=false;
		if (selection_in_prog==true)
		{
			//updateSelectionColor("inherit");
			document.removeEventListener("mousemove",selectionMouseMove,true);
			
/*			var first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var last_index=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			for(i=0,j=first_index[first_index.length-1];j<=last_index[last_index.length-1];i++,j++)
			{
				first_index[first_index.length-1]=j;
				block_cut_elements[i]=block_selected_elements[i]=fastClone(DESCR.getElemFromIndex(first_index));
			}
			if (first_index[first_index.length-1]==last_index[last_index.length-1])
			{
				// only one element is selected -> same as copy
				DESCR.addToCllipboard(block_selected_elements[0]);
				
			}
			*/
		}
		selection_in_prog=false;
		return true;
	}
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Block selection mouse hook - End
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	var hide_add_buttons=false;


	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Drag and Drop hooks - Begin
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	function initDragAndDrop()
	{
		/*
		//var drop_div="navigation";
		var drop_div="prog";
		var nav_div=window.document.getElementById(drop_div);
		//var background_saved="inherit";
		var drop_import_str_heading="<div style=\"background:lightgreen;margin:20px;-moz-border-radius: 15px; border-radius: 15px;bottom:0px;height:80%;\"><center><h1>Drop project to import</h1></center></div>";

		var drop_preview_str_heading="<div style=\"background:lightgreen;margin:20px;-moz-border-radius: 15px; border-radius: 15px;bottom:0px;height:80%;\"><center><h1>Drop project to preview</h1></center></div>";
		
		
		nav_div.ondragover=function(e)
		{
			if ((prog_view==true)&&(e.dataTransfer.files.length>0))
			{
				var file_extension=e.dataTransfer.files[0].name.split(".");
				if ((file_extension[file_extension.length-1].toUpperCase()!="ARG")&&
				   (file_extension[file_extension.length-1].toUpperCase()!="ARGL")&&
				   (file_extension[file_extension.length-1].toUpperCase()!=="ARG3"))
				{
					return true;
				}					

				//console.log("dragover");
				if ((nav_div.innerHTML!=drop_import_str_heading)&&(nav_div.innerHTML!=drop_preview_str_heading))
				{
					drag_saved_segm=nav_div.innerHTML;
					if (e.ctrlKey==true)
					{
						nav_div.innerHTML=drop_preview_str_heading;
					}
					else
					{						
						nav_div.innerHTML=drop_import_str_heading;
					}
				}
				
				e.stopPropagation();
				e.preventDefault();
			}
		};
		
		nav_div.ondragenter=function(e)
		{
			if ((prog_view==true)&&(e.dataTransfer.files.length>0))
			{
				var file_extension=e.dataTransfer.files[0].name.split(".");
				if ((file_extension[file_extension.length-1].toUpperCase()!="ARG")&&
				   (file_extension[file_extension.length-1].toUpperCase()!="ARGL")&&
				   (file_extension[file_extension.length-1].toUpperCase()!=="ARG3"))
				{
					return true;
				}					
				
				if ((nav_div.innerHTML!=drop_import_str_heading)&&(nav_div.innerHTML!=drop_preview_str_heading)&&(e.dataTransfer.files.length>0))
				{
					drag_saved_segm=nav_div.innerHTML;
					if (e.ctrlKey==true)
					{
						nav_div.innerHTML=drop_preview_str_heading;
					}
					else
					{						
						nav_div.innerHTML=drop_import_str_heading;
					}

				}
				e.stopPropagation();
				e.preventDefault();
			}
		};
		nav_div.ondragleave=function(e)
		{
			if ((prog_view==true)&&(e.dataTransfer.files.length>0))
			{
				var file_extension=e.dataTransfer.files[0].name.split(".");
				if ((file_extension[file_extension.length-1].toUpperCase()!="ARG")&&
				   (file_extension[file_extension.length-1].toUpperCase()!="ARGL")&&
				   (file_extension[file_extension.length-1].toUpperCase()!=="ARG3"))
				{
					return true;
				}					

				
				
				nav_div.innerHTML=drag_saved_segm;
				nav_div.style.background="inherit";
				e.stopPropagation();
				e.preventDefault();
			}
		};
		
		
		nav_div.ondrop=function(e) 
		{
			if ((prog_view==true)&&(e.dataTransfer.files.length>0))
			{
				var file_extension=e.dataTransfer.files[0].name.split(".");
				if ((file_extension[file_extension.length-1].toUpperCase()!="ARG")&&
				   (file_extension[file_extension.length-1].toUpperCase()!="ARGL")&&
				   (file_extension[file_extension.length-1].toUpperCase()!=="ARG3"))
				{
					return true;
				}					

				
				
				if (e.ctrlKey==true)
				{
					
					proj_preview_window = window.open('', '', 'height=400,width=800');
					
				}

				nav_div.innerHTML=drag_saved_segm;
				e.stopPropagation();
				e.preventDefault();
				
				var files = e.dataTransfer.files; // Array of all files
				globalFileHandle=files[0];
				for (var i = 0, f; f = files[i]; i++) 
				{

				  var reader = new FileReader();

				  // Closure to capture the file information.
				  reader.onload = (function(theFile) 
				  {
					  if (e.ctrlKey==true)
					  {
						console.log("drop in preview mode1");
						return loadProjInPreview;   
					  }
					  else
					  {
						return onImportProj;
					  }
				  })(f);

				  // Read in the image file as a data URL.
				  reader.readAsArrayBuffer(f);
				}
			}
		};
		*/
	}
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Drag and Drop hooks - End
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Global keyboard hook - Begin
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	document.onkeydown = function(evt) 
	{
		evt = evt || window.event;
		
		if ((prog_view==true)&&(mouse_down==true)&&(evt.ctrlKey==true)&&(selection_in_prog==false))
		{
			if (elementMouseIsOver==null)
			{
			}
			else ((elementMouseIsOver.dataset.elem_index!=undefined)&&(elementMouseIsOver.dataset.elem_type!=undefined)&&(elementMouseIsOver.nodeName=="TD"))
			{
				// control key is pushed too late 
				updateSelectionColor("inherit");
				clearBlockSelection();
				curr_selection_arr[0]=elementMouseIsOver;
				curr_selection_arr[1]=elementMouseIsOver;
				selection_in_prog=true;
				//block_selected_elements=[]; // new selection
				//block_selected_first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);;

				document.addEventListener("mousemove",selectionMouseMove,false);
				//console.log("Elem pressed "+elementMouseIsOver.dataset.elem_index);
				//curr_selection_arr[curr_selection_arr.length]=elementMouseIsOver;
				updateSelectionColor("lightgreen");
				return false;
			}
		}
        if ((prog_view==true)&&(evt.keyCode == 13))
        {
            var elem=document.activeElement;
            var jk=1;
            if ((((document.activeElement.tagName.toUpperCase()=="INPUT")&&(document.activeElement.type=="text"))||
                  ((document.activeElement.tagName.toUpperCase()=="TEXTAREA")&&(document.activeElement.type=="textarea")))
                  )
            {
                  var curr_elem=getElemFromIndex(JSON.parse(document.activeElement.dataset.elem_index));
                  if (curr_elem.vis_elem_type==0)
                  {
                      document.activeElement.blur();
                      return false;
                  }
            }
        }
            

		if ((evt.ctrlKey==true)&&(evt.keyCode == 40))
		{
			// "ctrl" + "down arrow"
			if (evt.shiftKey==true)
			{
				// collapse all except top level
				handleCollapseExpand(proj_elems,proj_elems,COLEXP.collapse_top_level,false); 
			}
			else
			{
				// collapse all - default
				handleCollapseExpand(proj_elems,proj_elems,COLEXP.collapse_default,false); 
			}
			renderCombined(true);
			return false;
		}
		
		if ((evt.ctrlKey==true)&&(evt.keyCode == 39))
		{
			if (prog_view==false)
			{
				return false;
			}
			// ctrl ->
			// increase variable section
			if (left_col_width<70)
			{
				left_col_width++;
				localStorage.ARGEE3_var_width=left_col_width;
				adjustMenuScreen(1);
			}
		}
		if ((evt.ctrlKey==true)&&(evt.keyCode == 37))
		{
			if (prog_view==false)
			{
				return false;
			}
			// ctrl <-
			// increase variable section
			if (left_col_width>30)
			{
				left_col_width--;
				localStorage.ARGEE3_var_width=left_col_width;
				adjustMenuScreen(1);
			}
		}
		
		if ((evt.keyCode == 112)||(evt.keyCode == 113))
		{ // F1 or F2
			if (prog_view==false)
			{
				return false;
			}
			var sel_text=window.getSelection().toString();
			var ind=DESCR.getFunctionBlockIndex(sel_text);
			if (ind==null)
			{
				if (evt.keyCode == 112)
				{
					//F1
					HelpDlgShow();
				}
				else
				{
					//F2
					DESCR.dispPrintPreview_imp(false,null,false,GOM,slices)
				}
			}
			else
			{
				ind[ind.length]=0;
				var id=DESCR.getID_FromIndex(ind);
				var id_str="func_block_id_"+id;
				DESCR.dispPrintPreview_imp(false,id_str,false,GOM,slices)
			}
				
			return false;
		}
		if (evt.keyCode == 114)
		{
			// F3 pressed
			
			var i,j,k,l;
			var page="";
			var sect_names=["Input","Output","Diagnostics","Parameters"];
			//var sect_colors=["Aqua","#FFEEAC","#0FF8DC","#F29136"];
			var sect_colors=["Aqua","#FFEEAC","#dd92dd","#F29136"];
			for(i=0;i<slices.length;i++)
			{
				var name=SIM.getSlotName(i);
				page+="<h2>Slot "+i+" - "+name+"</h2>";
				for(j=0;j<4;j++)
				{
					if (slices[i].sections[j].objects.length>0)
					{
						page+="<h3><div style=\"width:fit-content;background-color:"+sect_colors[j]+";\">"+sect_names[j]+"</div></h3>";
						page+="<table border='1'>"
						page+="<tr><td>&nbspName</td><td>Bit Offset</td><td>Bit Length</td><td>Enum Values</td></tr>";
						for(k=0;k<slices[i].sections[j].objects.length;k++)
						{
							page+="<tr>";
							page+="<td>&nbsp"+slices[i].sections[j].objects[k].name+"&nbsp</td>";
							page+="<td>&nbsp"+slices[i].sections[j].objects[k].offset+"</td><td>&nbsp"+slices[i].sections[j].objects[k].length+"</td>";
							page+="<td>";
							if (slices[i].sections[j].objects[k].enumList!=undefined)
							{
								for(l=0;l<slices[i].sections[j].objects[k].enumLen;l++)
								{
									page+="&nbsp"+slices[i].sections[j].objects[k].enumList[l].val+" - "+slices[i].sections[j].objects[k].enumList[l].str+"<br>";
								}
							}
							page+="</td>"
							page+="</tr>";
						}
						page+="</table>";
					}
				}
			}
			var printWindow1 = window.open('', '', 'height=400,width=800');
					printWindow1.document.write('<html><head><title> IO Description </title>');
					printWindow1.document.write('<style>  body { font-size: 75%; }</style></head><body >');
					printWindow1.document.write(page);
					printWindow1.document.write('</body></html>');
					printWindow1.document.close();
			
			return false;
			var jk=1;				
				
		}
		if ((evt.ctrlKey==true)&&(evt.keyCode == 90))
		{
			// ctrl-z // undo
			if (prog_view==false)
			{
				return true;
			}
			var elementDOM = evt.target;
			if ((elementDOM.nodeName=="INPUT")||(elementDOM.nodeName=="TEXTAREA"))
			{
				return true;
			}
			else
			{
				performUndo();
				return false;
			}
		}
		if ((evt.ctrlKey==true)&&(evt.keyCode == 188))
		{
			// ctrl-< 
			// hide all add buttons
			hide_add_buttons=true;
			renderCombined(true);
		}
		if ((evt.ctrlKey==true)&&(evt.keyCode == 190))
		{
			// ctrl-> 
			// show all add buttons
			hide_add_buttons=false;
			renderCombined(true);
		}
		
		if ((evt.ctrlKey==true)&&(evt.keyCode == 89))
		{
			// ctrl-y // redo
			if (prog_view==false)
			{
				return true;
			}
			var elementDOM = evt.target;
			if ((elementDOM.nodeName=="INPUT")||(elementDOM.nodeName=="TEXTAREA"))
			{
				return true;
			}
			else
			{
				performRedo();
				return false;
			}
		}
		if ((evt.ctrlKey==true)&&((evt.keyCode == 88)||(evt.keyCode == 67)))
		{
			// ctrl-x ,ctrl-c
			var ctrl_c=false;
			var block_sel=getCurrSelectedBlocks();
			if ((prog_view==false)||(block_sel.length==0))
			{
				return true;
			}
			if (evt.keyCode == 67)
			{
				ctrl_c=true;
			}
	
			var block_selected_first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			updateSelectionColor("inherit");
			document.removeEventListener("mousemove",selectionMouseMove,true);
			var parent=getParentArr(block_selected_first_index);
			var last_index_elem=block_selected_first_index[block_selected_first_index.length-1];
			var first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var last_index=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			block_cut_elements=[];
			block_selected_elements=[];
			for(i=0,j=first_index[first_index.length-1];j<=last_index[last_index.length-1];i++,j++)
			{
				first_index[first_index.length-1]=j;
				block_selected_elements[i]=fastClone(DESCR.getElemFromIndex(first_index));
				if (ctrl_c==false)
				{
					block_cut_elements[i]=block_selected_elements[i];
				}
			}
			if (ctrl_c==false)
			{
				parent.sub_elems.splice(last_index_elem,block_selected_elements.length);
			}
			block_selected_first_index=null;
			if (ctrl_c==false)
			{
				// clear breakpoint list
				GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
				redraw_list[screens.prog_scr].func();
				addUndo();
			}
			return false;
		}
		/*
		if ((evt.ctrlKey==true)&&(evt.keyCode == 86))
		{
			// ctrl-v
			var block_sel=getCurrSelectedBlocks();
			if ((prog_view==false)||(block_sel.length==0))
			{
				return true;
			}
			// clear breakpoint list
			GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
			addUndo();
			var block_selected_first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			selection_in_prog=false;
			updateSelectionColor("inherit");
			document.removeEventListener("mousemove",selectionMouseMove,true);
			var parent=getParentArr(block_selected_first_index);
			var last_index_elem=block_selected_first_index[block_selected_first_index.length-1];
			var cloned_elements=fastClone(block_selected_elements);
			var first_elem=cloned_elements[0];
			var act_elem=getElemFromIndex(block_selected_first_index);
			if ((descr_lookup[act_elem.type].nested_blocks==undefined)||(act_elem.type==block_types.ladder_condition))
			{
				// paste above
				if (descr_lookup[parent.type].nested_blocks.indexOf(first_elem.type)!=-1)
				{
					for(i=0;i<cloned_elements.length;i++)
					{
						parent.sub_elems.splice(last_index_elem+i,0,cloned_elements[i]); 
					}
				}
			}
			else
			{
				// paste only if empty block
				if (descr_lookup[act_elem.type].nested_blocks.indexOf(first_elem.type)!=-1)
				{
					for(i=0;i<cloned_elements.length;i++)
					{
						act_elem.sub_elems.splice(0+i,0,cloned_elements[i]); 
					}
				}
			}
			block_selected_first_index=null;
			redraw_list[screens.prog_scr].func();
			return false;
		}
		*/
		if ((evt.ctrlKey==true)&&(evt.shiftKey==false)&&(evt.keyCode == 68))
		{
			// ctrl-d  // comment-out block
			var block_sel=getCurrSelectedBlocks();
			if ((prog_view==false)||(block_sel.length==0))
			{
				return true;
			}
			// clear breakpoint list
			GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
			//addUndo();
			selection_in_prog=false;
			//updateSelectionColor("inherit");
			var block_selected_first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			document.removeEventListener("mousemove",selectionMouseMove,true);
			var parent=getParentArr(block_selected_first_index);
			var last_index_elem=block_selected_first_index[block_selected_first_index.length-1];
			var first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var last_index=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			block_cut_elements=[];
			for(i=0,j=first_index[first_index.length-1];j<=last_index[last_index.length-1];i++,j++)
			{
				first_index[first_index.length-1]=j;
				setCommentedState(getElemFromIndex(first_index),1);
			}
			block_selected_first_index=null;
			redraw_list[screens.prog_scr].func();
			addUndo();
			return false;
		}
		if ((evt.ctrlKey==true)&&(evt.shiftKey==true)&&(evt.keyCode == 68))
		{
			// ctrl-shift-d  // uncomment block
			var block_sel=getCurrSelectedBlocks();
			if ((prog_view==false)||(block_sel.length==0))
			{
				return true;
			}
			// clear breakpoint list
			GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
			selection_in_prog=false;
			//updateSelectionColor("inherit");
			document.removeEventListener("mousemove",selectionMouseMove,true);
			var block_selected_first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			
			var parent=getParentArr(block_selected_first_index);
			var last_index_elem=block_selected_first_index[block_selected_first_index.length-1];
			var first_index=JSON.parse(curr_selection_arr[0].dataset.elem_index);
			var last_index=JSON.parse(curr_selection_arr[1].dataset.elem_index);
			block_cut_elements=[];
			for(i=0,j=first_index[first_index.length-1];j<=last_index[last_index.length-1];i++,j++)
			{
				first_index[first_index.length-1]=j;
				setCommentedState(getElemFromIndex(first_index),0);
			}
			block_selected_first_index=null;
			redraw_list[screens.prog_scr].func();
			addUndo();
			return false;
		}
		
		
	};
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Global keyboard hook - END
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




	

preProcessBlockSeqDescr();
init();
	/*if (localStorage.prog_code!=undefined)
	{
		proj_elems=JSON.parse(localStorage.prog_code);
		var new_prog_vars=proj_elems.prog_var_types_enum;;
		if (new_prog_vars!=undefined)
		{
			for(i=0;i<new_prog_vars.length;i++)
			{
				prog_var_types_enum[i]=new_prog_vars[i];
			}
		}
	}*/
	
return {
	renderCombined:renderCombined,
	handleEvent:handleEvent,
	proj_elems:proj_elems,
	actOnKeyDown:actOnKeyDown,
	blockMenu:blockMenu,
	block_descr:block_descr,
	block_types:block_types,
	descr_lookup:descr_lookup,
	createNewElem:createNewElem,
	findBlockDescr:findBlockDescr,
	descr_lookup:descr_lookup,
	prog_var_types_enum:prog_var_types_enum,
	getElemFromIndex:getElemFromIndex,
	fixed_var_types_enum:fixed_var_types_enum,
	findFunctBlock:findFunctBlock,
	createDynamicDatapoints:createDynamicDatapoints,
	getCustElemDatabases:getCustElemDatabases,
	exp_contract:exp_contract,
	showHideElem:showHideElem,
	renderProg:renderProg,
	setDebugMode:setDebugMode,
	getProgTypeInd:getProgTypeInd,
	loadLocal:loadLocal,
	refreshCodeInDebug:refreshCodeInDebug,
	isTypeEnum:isTypeEnum,
	gotoFuncBlock:gotoFuncBlock,
	setNewTypeEnum:setNewTypeEnum,
	getStringTypeInd:getStringTypeInd,
	setRendMode:setRendMode,
	findParamDatapointDescr:findParamDatapointDescr,
	//getVarTypesEnum:getVarTypesEnum,
	//exp_enum:exp_enum,
	dispPrintPreview:dispPrintPreview,
	findLastType:findLastType,
	textAreaAdjust:textAreaAdjust,
	renderInCompactMode:renderInCompactMode,
	getFunctBlockBareboneString:getFunctBlockBareboneString,
	createGlobAndEnumLists:createGlobAndEnumLists,
	getTypeEnum:getTypeEnum,
	indexToDotString:indexToDotString,
	showErrorLine:showErrorLine,
	getVarElemAndLineFromIndex:getVarElemAndLineFromIndex,
	hmi_disp_num_funcs:hmi_disp_num_funcs,
	hmi_finc_disp_val_range:hmi_finc_disp_val_range,
	hmi_disp_screen_color:hmi_disp_screen_color,
	hmi_disp_screens:hmi_disp_screens,
	dispPrintPreview_imp:dispPrintPreview_imp,
	getFunctionBlockIndex:getFunctionBlockIndex,
	getID_FromIndex:getID_FromIndex,
	findTD_Elem:findTD_Elem,
	addToCllipboard:addToCllipboard,
	initDragAndDrop:initDragAndDrop,
	clearBlockSelection:clearBlockSelection,
	setCommentedState:setCommentedState,
	setPrintMode:setPrintMode,
	setBasicMode:setBasicMode,
	getBasicMode:getBasicMode,
	getUndoPoints:getUndoPoints,	
	renderDefaultView:renderDefaultView,
	hmi_grid_screen_funcs:hmi_grid_screen_funcs,
	hmi_grid_sect_funcs:hmi_grid_sect_funcs,
	hmi_grid_elem_funcs:hmi_grid_elem_funcs,
	hmi_grid_row_funcs:hmi_grid_row_funcs,
	handleImageFileSelect:handleImageFileSelect,
	showHideKeybShortcuts:showHideKeybShortcuts,
}
}());
	
var DESCR=ARGEE_elem_descr; 
 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

