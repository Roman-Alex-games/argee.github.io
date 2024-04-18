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
 *  DESCRIPTION: Pop-up dialog. This file handles the display and selection of 
 *               elements out of the pop-up dialog initiated by ctrl-q/i/l/s/f
 *
 *******************************************************************************/

var ARGEE_elem_dlg=(function()
{ 

var act_obj_list=[];
var contextMenuDisplayed=false;
var act_event;

var act_sel_range;
var image_selection_event=false;

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
	act_sel_range=[pos+val.length,pos+val.length];
	elem.setSelectionRange(pos+val.length,pos+val.length,0);
	// need to decode element ID and call appropriate onChange function
	var elem_type=elem.id;
	var type=act_elem_type;
	//console.log(type);
	
}



var act_func_descr;

function createStringOutOfObjects()
{
	var loc_str="";
	if ((act_event==event_type.LIO)&&(image_selection_event==false))
	{
		loc_str+="IO";
	}
	if (act_event==event_type.FUNC)
	{
		var act=act_obj_list[act_obj_list.length-1];
		if ((act.values!=undefined)&&(act.values[4]!=undefined))
		{
			act_func_descr=act.values[0]
			return act.values[4];
		}
		act_func_descr=null;
		return "";
	}
	for(i=0;i<act_obj_list.length;i++)
	{
		var act=act_obj_list[i];
		var descr=getElemDescr(act);
		if (descr==null)
		{
			continue;
		}
		if ((i==0)&&(descr.num_elems>1))
		{
			var ind=num(DESCR.getProgTypeInd(act.values[1]));
			if (ind!=DESCR.getStringTypeInd())
			{
				loc_str+="[]";
			}
		}
		if (i>0)
		{
			if (loc_str.length>0)
			{
				if (act_event==event_type.LIO)
				{
					loc_str+="_";
				}
				else
				{
					loc_str+=".";
				}
			}
			loc_str+=act.values[0];
			if (descr.num_elems>0)
			{
				var ind=num(DESCR.getProgTypeInd(act.values[1]));
				if (ind!=DESCR.getStringTypeInd())
				{
					loc_str+="[]";
				}
			}
		}
	}
	return loc_str;
}




var block_types=ARGEE_elem_descr.block_types;
var prog_var_types_enum=ARGEE_elem_descr.prog_var_types_enum;
var fixed_var_types_enum=ARGEE_elem_descr.fixed_var_types_enum;

function ContextMenuOnKeyDown(e)
{
	var jk=e;
	var n = (window.Event) ? e.which : e.keyCode;
	var p=window.document.getElementById('cont_menu_sel1');
	var elem_num=p.selectedIndex-1;
	
	if (n==39)
	{
		if (elem_num<0)
		{
			return;
		}
		// right arrow -> go into the object
		if (act_nav_list[elem_num].forward!=true)
		{
			return;
		}
		act_obj_list[act_obj_list.length]=act_nav_list[elem_num].elem;
		populateSelectList();
	}
	if (n==37) 
	{
		if (act_obj_list.length<=1)
		{
			return;
		}
		// left arrow -> go back
		act_obj_list.splice(act_obj_list.length-1,1);
		populateSelectList();
	}
	if (n==13) // enter
	{
		if (elem_num<0)
		{
			return;
		}
		if (act_nav_list[elem_num].type==0xffffff)
		{
			return false;
		}
		act_obj_list[act_obj_list.length]=act_nav_list[elem_num].elem;
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

function changeContextMenu()
{
	val=createStringOutOfObjects();
	var actElem=actElem2_123;
	var descr_lookup=ARGEE_elem_descr.descr_lookup;
	if ((actElemPos==0)&&((actElemBlock.type==block_types.func_block_call)||(actElemBlock.type==block_types.ladder_func_block_call)))
	{
		if (act_obj_list[act_obj_list.length-1].values.length>1)
		{
			var func_block_ind=DESCR.getProgTypeInd(act_obj_list[act_obj_list.length-1].values[1]);
			if (func_block_ind!=-1)
			{
				var str=DESCR.getFunctBlockBareboneString(func_block_ind);
				val+=str;
			}
		}
	}

	hideContextMenu();
	insert_val_prog_scr1(val,actElem,actElemPos,actElemType);
	if ((act_event==event_type.FUNC)&&(act_func_descr!=null))
	{
		savePrevCompilerMessage();
		setCompilerMessage(false,false,"<font size=\"2.5em\"  style=\"font-family:courier;\"  color=\"blue\"><b>"+act_func_descr+"</b></font>");
	}
	if ((actElem.dataset!=undefined)&&(actElem.dataset.elem_index!=undefined))
	{
		var orig_index=actElem.dataset.elem_index;
		var index=JSON.parse(orig_index);
		var elem_datastruct=DESCR.getElemFromIndex(index);
		var elem_descr=descr_lookup[elem_datastruct.type];
		if (elem_descr.refresh_on_change_prefix==true)
		{
			var prev_val=elem_datastruct.values[0];
			var new_val=actElem.value;
			var curr_func_block_index=index.slice(0,2);
			var curr_func_block_ptr=DESCR.getElemFromIndex(curr_func_block_index);
			var redraw=false;
			// function check
			var arr_old=prev_val.split("(");
			var arr_new=new_val.split("(");
			if ((arr_old.length<2)&&(arr_new.length>=2))
			{
				// function check
				redraw=true;
			}
			else if ((arr_old.length>1)&&(arr_new.length>1))
			{
				// function check
				if (arr_new[0].toUpperCase().localeCompare(arr_old[0].toUpperCase())!=0)
				{
					redraw=true;
				}
			}
			else
			{
				// function block check
				var tmp_str=prev_val.split("(");
				tmp_str=tmp_str[0].split(" ");
				tmp_str=tmp_str[0].split(".");
				var prev_type=DESCR.findLastType(tmp_str,curr_func_block_ptr,0);
				tmp_str=new_val.split("(");
				tmp_str=tmp_str[0].split(" ");
				tmp_str=tmp_str[0].split(".");
				var new_type=DESCR.findLastType(tmp_str,curr_func_block_ptr,0);
				if ((prev_type==null)&&(new_type!=null))
				{
					redraw=true;
				}
				if ((prev_type!=null)&&(new_type!=null))
				{
					if (prev_type.toUpperCase().localeCompare(new_type.toUpperCase())!=0)
					{
						redraw=true;
					}
				}
			}
			if (redraw==true)
			{
				
				if (document.activeElement!=null)
				{
					document.activeElement.blur();
				}

				
				console.log("redraw_init");
				elem_datastruct.values[0]=new_val;
				DESCR.renderProg();
				actElem=document.querySelectorAll('[data-elem_index=\''+orig_index+'\']');
				actElem=actElem[2];
				
				actElem.setSelectionRange(act_sel_range[0],act_sel_range[1],0);
			}
		}
	}
	actElem.focus();
}

function click_ContextMenu(e)
{
	p=window.document.getElementById('cont_menu_sel1');
	val=p.options[p.selectedIndex].value;
	var elem_num=p.selectedIndex-1;
	var option_offset_width=p.options[p.selectedIndex].offsetWidth;
	// since the text is fixed width -> we can detect the exact position of arrows vs variable name text
	var pos_first_char=(act_elem_first_varname_char/act_elem_max_chars)*p.options[p.selectedIndex].offsetWidth;
	var pos_last_char=(act_elem_last_varname_char/act_elem_max_chars)*p.options[p.selectedIndex].offsetWidth;
	if (e.offsetX<pos_first_char)
	{
		if (act_obj_list.length<=1)
		{
			return;
		}
		// left arrow -> go back
		act_obj_list.splice(act_obj_list.length-1,1);
		populateSelectList();
	}
	else if (e.offsetX<pos_last_char)
	{
		if (elem_num<0)
		{
			return;
		}
		if (act_nav_list[elem_num].type==0xffffff)
		{
			return false;
		}
		act_obj_list[act_obj_list.length]=act_nav_list[elem_num].elem;
		changeContextMenu();
		hideContextMenu();
		return false;
	}
	else
	{
		if (elem_num<0)
		{
			return;
		}
		// right arrow -> go into the object
		if (act_nav_list[elem_num].forward!=true)
		{
			return;
		}
		act_obj_list[act_obj_list.length]=act_nav_list[elem_num].elem;
		populateSelectList();
	}
	p.selectedIndex=-1;
}


var actElem,actElemPos,actElemType;
var event_type=
{
	GLOB:0, // includes both global and PLC vars
	LOC:1,
	LIO:2, // local_io
	ENUM:3,
	FUNC:4,
};

var event_type_strings=["Global","Local","IO","ENUM","Function"];
var actElemBlock;
function showContextMenu(event)
{
	var p,i;
	var body;
	var sel_var_list;
	var event_indexes=[];
	
	contextMenuDisplayed=true;
	
	
	block_types=ARGEE_elem_descr.block_types;
	prog_var_types_enum=DESCR.prog_var_types_enum;
	fixed_var_types_enum=ARGEE_elem_descr.fixed_var_types_enum;

	act_obj_list=[];
	
	
	actElem=window.document.activeElement;
	actElemBlock=DESCR.getElemFromIndex(JSON.parse(actElem.dataset.elem_index))
	actElem2_123=actElem;
	actElemPos=window.document.activeElement.selectionStart;
	if ((actElem.dataset.elem_force_io_disp!=undefined)||(actElem.dataset.elem_force_param_disp!=undefined))
	{
		event=event_type.LIO;
	}
	else if (actElem.dataset.glob_index==undefined)
	{
		event=event_type.ENUM;
	}
	else
	{
		event_indexes[event_type.GLOB]=JSON.parse(actElem.dataset.glob_index);
		event_indexes[event_type.LOC]=JSON.parse(actElem.dataset.loc_index);
	}
	var cust_dbs=ARGEE_elem_descr.getCustElemDatabases(true);

	var elem;	
	
	if ((event==event_type.GLOB)&&(actElem.dataset.glob_index.localeCompare(actElem.dataset.loc_index)==0))
	{
		event=event_type.LOC;
	}
	
	
	act_event=event;
	
	if (event==event_type.LOC)
	{
		elem=ARGEE_elem_descr.getElemFromIndex(event_indexes[event]);
	}
	else
	{
		switch(event)
		{
			case event_type.GLOB:
				elem=cust_dbs.glob;
				break;
			case event_type.LIO:
				if (cust_dbs.hmi_vars!=null)
				{
					image_selection_event=true;
					elem=cust_dbs.hmi_vars;
				}
				else
				{
					image_selection_event=false;
					elem=cust_dbs.local;
				}
				break;
			case event_type.ENUM:
				elem=cust_dbs.enums;
				break;
			case event_type.FUNC:
				if (cust_dbs.hmi_funcs!=null)
				{
					if ((parseInt(actElem.dataset.elem_field)==1)||(actElemBlock.values.length==1))
					{
						elem=cust_dbs.hmi_funcs;
					}
					else
					{
						return;
					}
				}
				else
				{
					elem=cust_dbs.func;
				}
				break;
		}
	}

	
	
	
	
	//var x = (window.innerWidth / 2) - (cont_menu_div.offsetWidth / 2);
   //var y = (window.offsetHeight / 2) - (cont_menu_div.offsetHeight / 2);        
	
	
	//cont_menu_div.style.left=mouseX+window.document.body.scrollLeft;
	//cont_menu_div.style.top=mouseY+window.document.body.scrollTop;
   //cont_menu_div.style.left=x+window.document.body.scrollLeft;
	//cont_menu_div.style.top=y+window.document.body.scrollTop;

	grayOut(window.document,true);

	
	
	body=window.document.getElementsByTagName('body');
	//body[0].bgColor="grey";
	
	// render select box based on the form element
	
	cont_menu_div.style.zIndex=100;

	cont_menu_div.style.display="block";
   cont_menu_div.style.position="fixed";
	sel_var_list="";
    var found=false;
		cont_menu_div.innerHTML="<select size=\"20\"  id=\"cont_menu_sel1\" onclick=\"SEL_DLG.click_ContextMenu(event)\" ><option></option></select>";

		
	act_obj_list[act_obj_list.length]=elem;	
    populateSelectList(0,elem);
	
	
	

	
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
	p.onblur=hideContextMenu;
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

function getContextMenuDisplayed()
{
	return contextMenuDisplayed;
	
}



function hideContextMenu()
{
	cont_menu_div.style.display="none";
	grayOut(window.document,false);
	contextMenuDisplayed=false;
	actElem2=actElem;
	actElem.focus();
}



function getElemDescr(elem)
{
	var type=0;
	var num_elems=0;
	var ref=false;
	
	switch(elem.type)
	{
		case block_types.local_io_slot:
		case block_types.local_io_sect:
			type=0xffffff;
		case block_types.local_io_elem:
		case block_types.enum_var_elem:
		    break;
			
		case block_types.reg_var:
			type=num(DESCR.getProgTypeInd(elem.values[1]));
			num_elems=num(elem.values[2]);
			break;
		case block_types.alias_var:
			type=0;
			num_elems=elem.values[3];
			break;
		case block_types.funct_block_elem_var:
			type=num(DESCR.getProgTypeInd(elem.values[1]));
			num_elems=num(elem.values[3]);
			//ref=num(elem.values[2]);
			break;
		default:
			return null;
	}
	return {type:type,num_elems:num_elems,ref:ref};
}

var act_nav_list=[];

var act_elem_max_chars;
var act_elem_first_varname_char;
var act_elem_last_varname_char;


function populateSelectList()
{
	var i,j;
	var output="";
	var obj_ind;
	var type="";
	var elem_str="";
	var ind_so_far=new Array();
	var p=window.document.getElementById('cont_menu_sel1');
	var fixed_act_elem_chars;
	
	//delete p.options;
	
	//p.options=new Array();
	p.options.length=0;
	p.selectedIndex=1;
	
	// force fixed width font for element list
	p.style.fontFamily="monospace";
	var descr_lookup=ARGEE_elem_descr.descr_lookup;
	
	var elem_ptr=act_obj_list[act_obj_list.length-1];
	
	if ((descr_lookup[elem_ptr.type].render_init==true)||(elem_ptr.sub_elems==undefined))
	{
		var descr=getElemDescr(elem_ptr);
		elem_ptr=ARGEE_elem_descr.findFunctBlock(prog_var_types_enum[descr.type]);
	}
	
	// first element is disabled with index=65536
	
	var tmp=event_type_strings[act_event]+": "+createStringOutOfObjects();
	if ((act_event==event_type.LIO)&&(image_selection_event==true))
	{
		tmp="Image selection:";
	}
	fixed_act_elem_chars=tmp.length;
	p.options[p.options.length]=new Option(tmp," "+65536);
	p.options[p.options.length-1].disabled=true;
	
	//act_obj_list[act_obj_list.length]={elem_ptr:elem_ptr,elem_num:elem_num,num_elems:descr.num_elems};
	act_nav_list=[];
	/*
	if (act_obj_list.length>1)
	{
		elem_str="    Back to ";
		for(i=0;i<act_obj_list.length-1;i++)
		{
			elem_str+=act_obj_list[i].values[0]+".";
		}
		act_nav_list[act_nav_list.length]={str:elem_str,back:true,ref:false,num_elems:0};
		p.options[p.options.length]=new Option(act_nav_list[act_nav_list.length-1].str," "+0);
	}
	*/
	
	// first pass -> collect the array of strings
	var str_arr_name=[];
	var str_arr_type=[];
	var fwd_arr_elem=[];
	var largest_str_name=0;
	var largest_str_type=0;
	var num_opt_elems=0;
	for(i=0;i<elem_ptr.sub_elems.length;i++)
	{
		var sub=elem_ptr.sub_elems[i];
		descr=getElemDescr(sub);
		if (descr==null)
		{
			continue;
		}
		descr.elem=sub;
		descr.str=sub.values[0];
		str_arr_name[str_arr_name.length]=descr.str;
		if (descr.type>prog_var_types_enum.length)
		{
			if (sub.values[1]!=undefined)
			{
				str_arr_type[str_arr_type.length]="   ("+sub.values[1]+") ";
			}
			else
			{
				str_arr_type[str_arr_type.length]="    ";
			}
		}
		else
		{
			if ((act_event==event_type.FUNC)||((act_event==event_type.LIO)&&(image_selection_event==true)))
			{
				str_arr_type[str_arr_type.length]="  "
			}
			else
			{
				str_arr_type[str_arr_type.length]="   ("+prog_var_types_enum[descr.type]+") ";
			}
		}
		if (descr.num_elems>0)
		{
			str_arr_type[str_arr_type.length-1]+="[]";
		}
		if ((descr.ref==true)&&(act_obj_list.length==1))
		{
			fwd_arr_elem[act_nav_list.length]=true;
			descr.forward=true;
		}
		else if (descr.ref==true)
		{
		}
		else if (descr.type>(ARGEE_elem_descr.fixed_var_types_enum-1))
		{
			fwd_arr_elem[act_nav_list.length]=true;
			descr.forward=true;
		}

		
		if (str_arr_name[str_arr_name.length-1].length>largest_str_name)
		{
			largest_str_name=str_arr_name[str_arr_name.length-1].length;
		}
		if (str_arr_type[str_arr_type.length-1].length>largest_str_type)
		{
			largest_str_type=str_arr_type[str_arr_type.length-1].length;
		}
		act_nav_list[act_nav_list.length]=descr;
	}
	
	var fixed_width=largest_str_type+largest_str_name;
	act_elem_first_varname_char=0;

	if (act_obj_list.length>1)
	{
		// left arrow
		fixed_width+=4;
		act_elem_first_varname_char=4;

	}
	if (fwd_arr_elem.length>0)
	{
		// right arrow
		fixed_width+=4;
	}
	if (fixed_width<fixed_act_elem_chars)
	{
		fixed_width=fixed_act_elem_chars;
	}
	act_elem_max_chars=fixed_width;
	if (fwd_arr_elem.length>0)
	{
		act_elem_last_varname_char=act_elem_max_chars-1-4;
	}
	else
	{
		act_elem_last_varname_char=act_elem_max_chars-1;
	}
	
	
	for(i=0;i<act_nav_list.length;i++)
	{
		var fin_str="";
		if (act_obj_list.length>1)
		{
			fin_str="<-  ";
		}
		fin_str+=str_arr_name[i];
		for(j=str_arr_name[i].length;j<largest_str_name;j++)
		{
			fin_str+=" ";
		}
		fin_str+=str_arr_type[i];
		for(j=str_arr_type[i].length;j<largest_str_type;j++)
		{
			fin_str+=" ";
		}
		for(j=fin_str.length;j<(fixed_width-4);j++)
		{
			fin_str+=" ";
		}
		if (fwd_arr_elem[i]==true)
		{
			fin_str+="  ->";
		}
		unescape(fin_str.replace(/ /g, "%A0"))
		p.options[p.options.length]=new Option(unescape(fin_str.replace(/ /g, "%A0"))," "+i);
		//p.options[p.options.length-1].innerHTML=fin_str;
	}
	p.selectedIndex=1;
}

	

return {
	showContextMenu:showContextMenu,
	event:event_type,
	getContextMenuDisplayed:getContextMenuDisplayed,
	click_ContextMenu:click_ContextMenu,

}
}());
	
var SEL_DLG=ARGEE_elem_dlg; 
var actElem2_123; 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

