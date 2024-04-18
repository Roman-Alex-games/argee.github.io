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
var act_nav_level=null;


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
		if (act_nav_level.list[elem_num].list.length==0)
		{
			return;
		}
		act_nav_level=act_nav_level.list[elem_num];
		populateSelectList();
	}
	if (n==37) 
	{
		
		if (act_nav_level.parent==null)
		{
			return;
		}
		// left arrow -> go back
		act_nav_level=act_nav_level.parent;
		populateSelectList();
	}
	if (n==13) // enter
	{
		if (elem_num<0)
		{
			return;
		}
		if (act_nav_level.list[elem_num].insert_str==undefined)
		{
			return false;
		}
		act_nav_level=act_nav_level.list[elem_num];
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

var enter_pressed=false;

function changeContextMenu()
{
	val=act_nav_level.insert_str;
	var actElem=actElem2_123;
	var descr_lookup=ARGEE_elem_descr.descr_lookup;
	enter_pressed=true;
	hideContextMenu();
	if (act_nav_level.exec_func!=undefined)
	{
		DESCR[act_nav_level.exec_func](act_nav_level);
		return;
	}
	if ((actElem.dataset!=undefined)&&(actElem.dataset.elem_index!=undefined))
	{
		var orig_index=actElem.dataset.elem_index;
		var index=JSON.parse(orig_index);
		var elem_datastruct=DESCR.getElemFromIndex(index);
		
		
		if ((actElemPos==0)&&((elem_datastruct.type==block_types.func_block_call)||(elem_datastruct.type==block_types.ladder_func_block_call)))
		{
			// Function blocks (not Functions/Procedures) require argument list when
			// inserted as a first element of CALL block
			if (DESCR.getProgTypeInd(act_nav_level.act_type)!=-1)
			{
				var str=DESCR.getFunctBlockBareboneString(DESCR.getProgTypeInd(act_nav_level.act_type));
				val+=str;
			}
		}
	}

	
	insert_val_prog_scr1(val,actElem,actElemPos,actElemType);
	if ((act_nav_level.display_help_at_top!=undefined))
	{
		savePrevCompilerMessage();
		setCompilerMessage(false,false,"<font size=\"2.5em\"  style=\"font-family:courier;\"  color=\"blue\"><b>"+act_nav_level.name+"</b></font>");
	}
	if ((actElem.dataset!=undefined)&&(actElem.dataset.elem_index!=undefined))
	{
		var orig_index=actElem.dataset.elem_index;
		var index=JSON.parse(orig_index);
		var elem_datastruct=DESCR.getElemFromIndex(index);
		var elem_descr=descr_lookup[elem_datastruct.type];
		if  (elem_descr.refresh_on_change_prefix==true)
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
				if ((elem_descr.type==block_types.hmi_block)||(elem_descr.type==block_types.hmi_block_screen))
				{
					actElem=actElem[3];
				}
				else
				{
					actElem=actElem[2];
				}
				
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
	var pos_first_char=(act_nav_level.act_elem_first_varname_char/act_nav_level.act_elem_max_chars)*p.options[p.selectedIndex].offsetWidth;
	var pos_last_char=(act_nav_level.act_elem_last_varname_char/act_nav_level.act_elem_max_chars)*p.options[p.selectedIndex].offsetWidth;
	if (e.offsetX<pos_first_char)
	{
		if (act_nav_level.parent==null)
		{
			return;
		}
		// left arrow -> go back
		act_nav_level=act_nav_level.parent;
		populateSelectList();
	}
	else if (e.offsetX<pos_last_char)
	{
		if (elem_num<0)
		{
			return;
		}
		if (act_nav_level.list[elem_num].insert_str==undefined)
		{
			return false;
		}
		act_nav_level=act_nav_level.list[elem_num];
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
		if (act_nav_level.list[elem_num].list.length==0)
		{
			return;
		}
		act_nav_level=act_nav_level.list[elem_num];
		populateSelectList();
	}
	p.selectedIndex=-1;
}


var actElem,actElemPos,actElemType;
var actElemBlock;
var actContextMenuSaveNavPath=false;
function showContextMenu(event)
{
	var p,i;
	var body;
	var sel_var_list;
	var event_indexes=[];
	
	contextMenuDisplayed=true;
	enter_pressed=false
	
	block_types=ARGEE_elem_descr.block_types;
	prog_var_types_enum=DESCR.prog_var_types_enum;
	fixed_var_types_enum=ARGEE_elem_descr.fixed_var_types_enum;

	act_obj_list=[];
	actContextMenuSaveNavPath=false;
	if ((event==DESCR.event_type.GLOB)&&(DESCR.getExpertMode()==true))
	{
		actContextMenuSaveNavPath=true;
		event=DESCR.event_type.GLOB; // switch to GLOB
	}
	act_nav_level=DESCR.createAllDatapoints(event);
	var last_menu=navigateToLast();
	if (last_menu!=null)
	{
		act_nav_level=last_menu;
	}
	
	actElem=window.document.activeElement;
	actElemBlock=DESCR.getElemFromIndex(JSON.parse(actElem.dataset.elem_index))
	actElem2_123=actElem;
	actElemPos=window.document.activeElement.selectionStart;

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

		
    populateSelectList();
	
	
	

	
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

var last_nav_path=[];


function navigateToLast()
{
	var i,j;
	var curr_act_level=act_nav_level;
	if (last_nav_path.length<=0)
	{
		return null;
	}
		
	if (last_nav_path[last_nav_path.length-1]!=act_nav_level.title)
	{
		return null;
	}
	for(i=last_nav_path.length-2;i>=0;i--)
	{
		var found=false;
		for(j=0;j<curr_act_level.list.length;j++)
		{
			if (curr_act_level.list[j].title==last_nav_path[i])
			{
				found=true;
				curr_act_level=curr_act_level.list[j];
				break;
			}
		}
		if (found==false)
		{
			return null;
		}
	}
	return curr_act_level;
}

function hideContextMenu()
{
	var curr_ptr=act_nav_level;
	cont_menu_div.style.display="none";
	if (actContextMenuSaveNavPath==true)
	{
		last_nav_path=[];
		if (enter_pressed==true)
		{
			//last_nav_path[0]=curr_ptr.title;
		}
		else
		{
			if (curr_ptr.list.length>0)
			{
				last_nav_path[0]=curr_ptr.title;
			}
		}
		while(curr_ptr.parent!=null)
		{
			curr_ptr=curr_ptr.parent;
			last_nav_path[last_nav_path.length]=curr_ptr.title;
		}
	}
	
	grayOut(window.document,false);
	contextMenuDisplayed=false;
	actElem2=actElem;
	actElem.focus();
}


function populateSelectList()
{
	var i,j;
	var output="";
	var obj_ind;
	var type="";
	var elem_str="";
	var ind_so_far=new Array();
	var p=window.document.getElementById('cont_menu_sel1');
	
	//delete p.options;
	
	//p.options=new Array();
	p.options.length=0;
	p.selectedIndex=1;
	
	// force fixed width font for element list
	p.style.fontFamily="monospace";
	var str1="   "+act_nav_level.title+"   ";
	p.options[p.options.length]=new Option(unescape(str1.replace(/ /g, "%A0"))," "+65536);
	p.options[p.options.length-1].disabled=true;
	
	
	
	
	
	for(i=0;i<act_nav_level.list.length;i++)
	{
		var fin_str=act_nav_level.list[i].display_str;
		unescape(fin_str.replace(/ /g, "%A0"))
		p.options[p.options.length]=new Option(unescape(fin_str.replace(/ /g, "%A0"))," "+i);
		//p.options[p.options.length-1].innerHTML=fin_str;
	}
	p.selectedIndex=1;
}

	

return {
	showContextMenu:showContextMenu,
	getContextMenuDisplayed:getContextMenuDisplayed,
	click_ContextMenu:click_ContextMenu,

}
}());
	
var SEL_DLG=ARGEE_elem_dlg; 
var actElem2_123; 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

