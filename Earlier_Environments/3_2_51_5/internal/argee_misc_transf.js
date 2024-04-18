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
 *  DESCRIPTION: AJAX functions used in ARGEE/Flowchart 
 *
 *******************************************************************************/

var ARGEE_misc_transf_func=(function()
{ 

var update_status_gen; 

 
function* updateStatus(message)
{
	setCompilerMessage(false,false,message);
	setTimeout(GOM.advanceGen,0);
	yield 1;
}

function DlgShow(pg,ip)
{
	var outp;	
	// Change the message.
	var Msg = document.getElementById("Overlay");
	Msg.style.borderColor="#99CC00";
	var Msg = document.getElementById("DlgContent");
	outp="";
	if (pg==0)
	{	
		outp+="<center><fieldset><legend>HMI Mode</legend><table>";
	}
	else
	{
		outp+="<center><fieldset><legend>Program Mode</legend><table>";
	}

	if ((pg==1)&&(argee_interscan_delay<ARGEE_default_interscan_delay))
	{
		outp+="<tr>";
		outp+="<td>";
		outp+="<b>Interscan Period too small ("+argee_interscan_delay+ "ms) please confirm to proceed</b><input type=\"checkbox\" id=\"interscan_confirm\">";
		outp+="</td>";
		outp+="</tr>";
	}


	outp+="<tr>";
	outp+="<td>";
	outp+="<center>ARGEE Device IP Address:</center>";
	outp+="</td>";
	outp+="</tr><tr>";
	outp+="<td>";

	
	if (pg==1)
	{
		outp+="<center><input type=\"text\" id=\"ip_addr_prompt\" value=\""+ip+"\" onkeydown=\"return TRANSF.onKeyDown(event,this)\" ></center>";
	}
	  
	outp+="</td>";
	outp+="</tr><tr>";
	outp+="<td>";
	if (pg==0)
	{		  
		outp+="<input type=\"button\"  style=\"width:100%;\" value=\"Enter HMI Mode\"  onclick=\"TRANSF.DlgHide('HMI')\" />";
	}
	else if (pg==1)
	{
		outp+="<input type=\"button\" style=\"width:100%;\"  value=\"Enter Program Mode\"  onclick=\"TRANSF.DlgHide('Program')\" />";
	}
	outp+="</td>";
	outp+="</tr>";
	outp+="</table></fieldset>";
	if (pg!=0)	
	{
		outp+="<br><fieldset><br><legend>Simulation Mode</legend><table>";
		outp+="<tr>";
		outp+="</tr>"
		outp+="<tr>";
		outp+="<td colspan=\"3\">";
		outp+="<center><input type=\"button\" style=\"width:100%;\"  value=\"Enter Simulation Mode\"  onclick=\"TRANSF.DlgHide('Simulation')\" /></center>";
		outp+="</td>";
		outp+="</tr>"
		outp+="</table><br></fieldset>";
	}

	Msg.innerHTML=outp;
	// Display the dialog box.
	var Dlg = document.getElementById("Overlay");
	Dlg.style.visibility = "visible";
	
	var Dlg = document.getElementById("grayout");
	Dlg.style.visibility = "visible";
}


var ip;

function DlgHide(Result)
{
	
  // Display the result onscreen.
  var inp = document.getElementById("ip_addr_prompt");
  if (Result=='Program')
  {
	  var interscan_confirm=document.getElementById("interscan_confirm");
	  if (interscan_confirm!=null)
	  {
		  if (interscan_confirm.checked==false)
		  {
			  alert("Confirm interscan period to proceed!");
			  location.reload();
			  return;
		  }
	  }
	  ip=inp.value;
	  selectLocalStoragePlaceholder(ip);
	  GOM.setObjNum("IP_ADDRESS",0,GOM.convStringToArr(ip));
	  setLocalStorage("def_ip",ip);
	  
	  GOM.addAjaxAction(startEnvConn);
	  //continuePreInit1(1,inp.value);
  }
  else if (Result=='HMI')
  {
	  continuePreInit(0,inp.value);
  }
  else
  {
	  var sim_gen_show;
	  // select simulation localStorage
	  selectLocalStoragePlaceholder(null);
	  sim_gen_show=SIM.getSimGen();
	  sim_gen_show.next();
	  GOM.setObjNum("IP_ADDRESS",0,GOM.convStringToArr("Simulation"));
	  
  }
  // Hide the dialog box.
  var Dlg = document.getElementById("Overlay");
  Dlg.style.visibility = "hidden";
  
  	var Dlg = document.getElementById("grayout");
	Dlg.style.visibility = "hidden";

  
}
 
 
var pass_dlg;

function PasswordDlgShow()
{
	var outp;	
	// Change the message.
	var Msg = document.getElementById("Overlay_pass");
	Msg.style.borderColor="#99CC00";
	var Msg = document.getElementById("DlgContent1");
	outp="<center><h3> Enter Password: </h3></center>";
	outp+="<br><center><input type=\"password\" id=\"password_prompt_id\"  style=\"width:50%;\" /></center>";
	outp+="<br><center><input type=\"button\"  style=\"width:50%;\" value=\"submit\"  onclick=\"TRANSF.PasswordDlgHide()\" /></center>";
	Msg.innerHTML=outp;
	// Display the dialog box.
	var Dlg = document.getElementById("Overlay_pass");
	Dlg.style.visibility = "visible";
	
	var Dlg = document.getElementById("grayout");
	Dlg.style.visibility = "visible";
}



function PasswordDlgHide()
{
  var pass = document.getElementById("password_prompt_id");
  curr_password=pass.value;
  // Hide the dialog box.
  var Dlg = document.getElementById("Overlay_pass");
  Dlg.style.visibility = "hidden";
  
  var Dlg = document.getElementById("grayout");
  Dlg.style.visibility = "hidden";
  GOM.advanceGen();
}


function* passwordGet()
{
	PasswordDlgShow();
	yield 1;
}
 
var curr_password="password";
 
function* Login()
{
	while(1)
	{
		
		yield* GOM.objectExchange("MULTPC_FIELDBUS_CONNECTED",0,"READ",true);
		yield* GOM.objectExchange("ARGEE_BOOT_PROJ_ENABLED",0,"READ",true);
		
		if ((GOM.getObjNum("ARGEE_BOOT_PROJ_ENABLED",0)==0)&&(GOM.getObjNum("MULTPC_FIELDBUS_CONNECTED",0)==1))
		{
			alert("Can not login into ARGEE because device is already running a PLC connection.\nDisconnect the PLC from the device to login into ARGEE");
			return false;
		}

		
		GOM.setObjArr("ARGEE_CHECK_PASSWORD",0,GOM.convStringToArr(curr_password));
		yield* GOM.objectExchange("ARGEE_CHECK_PASSWORD",0,"WRITE",true);	
		yield* GOM.objectExchange("ARGEE_CHECK_PASSWORD",0,"READ",true);
		var val=new Uint8Array(GOM.getObjArr("ARGEE_CHECK_PASSWORD",0));
		if (val[0]==0)
		{
			yield* passwordGet();
			continue;
		}
		break;
	}
	return true;
}

function setupWindowEnvironment()
{
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
	if ( location.hash == '#no-back' ) 
	{
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
			
			
		  if ( history_api ) history.pushState(null, '', '#stay')
		  else location.hash = '#stay'
		}
	  }
    }
	
	
	computer_interface=true;


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
	
	//<div valign=\"top\" id=\"drop_target\"><i>Drop to import</i></div>
	
	//nav_div.innerHTML="<div style=\"display: inline;\"><div id=\"nav_prj_name\"></div><div id=\"nav_dev\"></div></div><div id=\"nav_inner\"></div><div style=\"text-align: center;\" id=\"comp_res_id\"></div><div align=\"right\" id=\"checksum\"></div>";
	var str="";
	str="<table cellspacing='0' cellpadding='0' border='0' id=\"nav_table\" style=\"width:100%;table-layout:fixed;border-collapse: collapse;\">";

	str+="<tr style=\"height:21px;width:100%;background-color:#ffcc00;\" ><td><div style='overflow:hidden;text-wrap:none;white-space:nowrap;left:30px;font-size:14px;font-family:Helvetica;'></div></td><td colspan=\"2\"> <div style=\"height:21px;width:100%;background-color:#ffcc00;\" id=\"turck_logo\"><img style='float:right;' src=\"common/turck_logo_5.PNG\"></td></tr>";
	//str+="<tr style=\"background-color:#e5e5e5;\"><td><div id=\"nav_prj_name\"></div></td><td></td><td><div id=\"nav_dev\"></div></td></tr><tr id=\"status_row\" style=\"background-color:#e5e5e5;\"><td></td><td id=\"status_cell\" valign=\"top\"><div style=\"text-align: center;\" id=\"comp_res_id\"></div></td><td><div align=\"right\" id=\"checksum\"></div></td></tr>";
	//str+="<tr style=\"background-color:#e5e5e5;\" ><td colspan=\"3\"><div id=\"nav_inner\"></div><br><hr style=\"margin:0px;\"></td></tr>";
	
	
	//str+="<tr style=\"background-color:#e5e5e5;margin:0px;padding:0px;\" ><td colspan=\"3\" style='margin:0px;padding-top:1px;'><div style='margin:0px;padding:0px;' id=\"nav_inner\"></div></td></tr>";
	
	str+="<tr style=\"background: linear-gradient(0deg, #e5e5e5 20%, #f5f5f5 100%);margin:0px;padding:0px;\" ><td colspan=\"3\" style='margin:0px;padding-top:1px;'><div style='margin:0px;padding:0px;' id=\"nav_inner\"></div></td></tr>";
	
	
	str+="<tr ><td><div id=\"nav_prj_name\"></div></td><td></td><td><div id=\"nav_dev\"></div></td></tr>";
	str+="<tr><td colspan='3'><div id=\"status_elem\" style='width:100%;margin:0px;padding:0px;'></div></td></tr>";
	str+="<tr><td colspan=\"3\"><hr style=\"margin:0px;\"></td></tr>";
	str+="</table>";
	nav_div.innerHTML=str;
	/*device_name_div=this.document.getElementById("nav_dev");
	device_name_div.style.fontSize="16px";	
	device_name_div.style.color="#003300";
	device_name_div.style.opacity="0.7";
	device_name_div.style.textAlign="right";
	device_name_div.style.overflow="hidden";
	device_name_div.style.whiteSpace="nowrap";
	//css("p#nav_dev","margin: 0em; display: inline-block; font-size:14px;   text-decoration:none; top:0px;  padding:0px 0.4em 0px 0.4em; color:black;  float:left;text-align:center;  border-left:1px solid red; border-right:1px solid red;");
	//device_name_div.innerHTML="<b>"+real_DeviceName+"</b>&nbsp&nbsp (<b>"+requested_ip+"</b>)";
	device_name_div.innerHTML="<b>"+GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0))+"</b>&nbsp&nbsp (<b>"+GOM.arrToString(GOM.getObjArr("IP_ADDRESS",0))+"</b>) <b>"+GOM.arrToString(GOM.getObjArr("SAPI_APP_VER_STRING",0))+"</b>";	
	//device_name_div.innerHTML="<b>"+GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0))+"</b>&nbsp&nbsp (<b>"+GOM.arrToString(GOM.getObjArr("IP_ADDRESS",0))+"</b>)";	


	prj_name_div=this.document.getElementById("nav_prj_name");
	prj_name_div.style.fontSize="16px";	
	prj_name_div.style.color="#003300";
	prj_name_div.style.opacity="0.7";
	prj_name_div.style.paddingLeft="1em";
	prj_name_div.style.paddingTop="0.2em";
	prj_name_div.style.textAlign="left";
	prj_name_div.style.overflow="hidden";
	prj_name_div.style.whiteSpace="nowrap";
*/
	
	
	
    
	
	/*<ul id=\"nav_list\">"+
						   "<li><a href=\"#\"><b>Home</b></a></li>"+
						   "<li><a href=\"#\"><b>About Us</b></a></li>"+
							"<li><a href=\"#\"><b>Services</b></a></li>"+
						   "<li><a href=\"#\"><b>Products</b></a></li>"+
						   "<li><a href=\"#\"><b>Contact</b></a></li></ul>";
							*/

	
	//this.frames[1].frames[2].document.getElementById("status_div").innerHTML="<fieldset ><legend>Status</legend><textarea  style=\"width:100%;height:100%;\"  id=\"compiled\"></textarea></fieldset>";

	//padding:0.3em 0.4em 0.3em 0.4em;
	/*comp_res=this.document.getElementById("comp_res_id");
	comp_res.style.overflow="hidden";
	comp_res.style.whiteSpace="nowrap";
	*/
	
	DESCR.initDragAndDrop();
	
	renderMenu("show_pro_menu_only");
	
}

function getIP()
{
	return ip;
}

function setIP(ip_passed)
{
	ip=ip_passed;
}


function* startEnvConn()
{
	var loc_db_cache;
	var i,j;

	
	
	GOM.setDestinationURL("http://"+ip);

	yield* GOM.objectExchange("ARGEE_COMP_VER",1,"READ",true);
	if (ARGEE_InvokeProperEnvironment(GOM.getObjNum("ARGEE_COMP_VER",1),ip)==false)
	{
		return;
	}
	var res=yield* Login();
	if (res==false)
	{
		return;
	}

	
	GOM.setObjNum("ARGEE_PROJ_CHECKSUM",0,0);

	yield* GOM.objectExchange("ARGEE_DEV_NAME",0,"READ",true);
	yield* GOM.objectExchange("SAPI_APP_VER_STRING",0,"READ",true);
	
	GOM.setObjArr("ARGEE_PROJ_DEV_NAME",0,GOM.getObjArr("ARGEE_DEV_NAME",0));
	GOM.setObjNum("ARGEE_KERN_VER_VERIFY",0,GOM.getObjNum("ARGEE_COMP_VER",1));
	GOM.setObjNum("ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0,ARGEE_Environment_Version);

	GOM.setObjArr("ARGEE_PROJ_APP_VER_STRING",0,GOM.getObjArr("SAPI_APP_VER_STRING",0));

	IO_ids=[];
	
	setupWindowEnvironment();
	abort_ajax=false;
	// Download station config and datapoints	
	yield* GOM.objectExchange("MULTPC_ORDER_NUM",0,"READ",false);
	
	GOM.setObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0,GOM.getObjNum("MULTPC_ORDER_NUM",0));
	var gw_order_num=GOM.getObjNum("MULTPC_ORDER_NUM",0);

	
	yield* GOM.objectExchange("ARGEE_GET_SUB_IDS_OBJ",0,"READ",false);
	console.log("Obj download started at at: "+(new Date()).getTime());
	
	submods=GOM.getValDataView("ARGEE_GET_SUB_IDS_OBJ",0);
	var num_mods=submods.getUint32(0,true);
	
	GOM.setObjArr("MODULE_LIST_ARRAY",0,GOM.getObjArr("ARGEE_GET_SUB_IDS_OBJ",0).slice(0,4+num_mods*4));
	
	if (SIM.getSimMode()==false)
	{
		SIM.fillSimSlots(submods);
	}
	
	var id_list=[];
	slices=[];
	for(i=0;i<num_mods;i++)
	{
		
		//yield* updateStatus("Downloading Datapoints of slot "+i);
	
		
		id_list[i]=submods.getUint32(4*i+4,true);
		if (i==0)
		{
			if ((id_list[i]==0x01500021)||(id_list[i]==0x01500027))
			{
				GEN.setARM7_Mode(true);
			}
			else
			{
				GEN.setARM7_Mode(false);
			}
		}
		var slice_obj={};
		slice_obj=SIM.simDB_constructSliceObj(i,id_list[i],gw_order_num,GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0)));
		slices[slices.length]=slice_obj;
	}
	for(i=0;i<num_mods;i++)
	{
		IO_ids[i]=id_list[i];
	}
	
	SIM.setup_slot_names(GOM.getObjNum("MULTPC_ORDER_NUM",0));
	
	// create default parameters
	for(i=0;i<slices.length;i++)
	{
		IO_CONF.createDefaultParamInit(i);
	}
	
	yield* updateStatus("Downloading ARGEE File...");
	if (GOM.getObjNum("ARGEE_BOOT_PROJ_ENABLED",0)!=0)
	{
		yield* GOM.objectExchange(null,0,"READ_ARGEE_FILE",false);
	}
	GOM.setObjNum("ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0,ARGEE_Environment_Version);
	


	if (ip!=undefined)
	{
		document.title = "ARGEE on "+GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0)) +"("+ip+")"; 
	}
	else
	{
		document.title = "ARGEE on "+GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0)) +"(Simulation)"; 
	}
			

	var load_locally=false;
	prog_view=true;
	if ((getLocalStorage("prog_code")!=undefined)||(getLocalStorage("params")!=undefined))
	{
		var r=confirm("Project not saved - load from localStorage");
		if (r==true)
		{
			load_locally=true;
		}
		else
		{
			var r=confirm("This step will erase the previously saved project. Are you sure you want to proceed?");
			if (r==false)
			{
				return;
			}
		}
			
	}
	var proj_without_source=false;
	if (load_locally==false)
	{
		if ((GOM.getObjNum("ARGEE_BOOT_PROJ_ENABLED",0)==0)&&(SIM.getSimMode()==false))
		{
			FLOW.initProj(true);
			if (GOM.getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
			{
				var title="";
				GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
			}
			if (SIM.getSimMode()==false)
			{
				FLOW.showFlowchart();
				renderMenu("show_flow_menu_only");
			}
			else
			{
				SIM.createEmptyARGEE_Proj();
				adjustMenuScreen(1);
				ARGEE_elem_descr.renderInCompactMode();
				renderMenu("show_pro_menu_only");
			}
		}
		else
		{
			if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.FLOWCHART)
			{
				FLOW.importFlowchart();
				if (GOM.getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
				{
					var title="";
					GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
				}
					
				FLOW.showFlowchart();
				renderMenu("show_flow_menu_only");
			}
			else
			{
				adjustMenuScreen(1);
				var str=GOM.arrToString(GOM.getObjArrCompressed("ARGEE_SOURCE_CODE",0));
				if (str.length==0)
				{
					proj_without_source=true;
					// project without source
					FLOW.initProj(true);
					var title="";
					GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
					FLOW.showFlowchart();
					renderMenu("show_flow_menu_only");
				}
				else
				{
					IMP.import_proj(str,false,false,false);	
					if (GOM.getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
					{
						var title="";
						GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
					}
					DESCR.renderDefaultView(true);
					renderMenu("show_pro_menu_only");
				}
			}
		}
	}
	else
	{
		GOM.loadProjFromLocalStorage();
	}
	
	updateProjectName();
	console.log("Obj download finished at at: "+(new Date()).getTime());
	//setCompilerMessage(false,false,"Program Loaded");
	GOM.finAjaxAction();
	if (proj_without_source==true)
	{
		prog_div.innerHTML = '<h1>Project without the source code is loaded into the device<br>Erase it via the web server to be able to load new ARGEE programs!!!!</h1>';
		var_div1.innerHTML = '';	
		men_div.innerHTML = '';	
		nav.innerHTML = '';
		nav.style.visibility='hidden';
		//setCompilerMessage(false,true,"Project without the source code is loaded into the device!!!!");
	}

	
}

function findDeviceName(id)
{
	var i;
	for (i=0;i<slices.length;i++)
	{
		if (slices[i].id==id)
		{
			return slices[i].name;
		}
	}
	return "";
}

var prj_obj_list=
[
	["ARGEE_KERN_VER_VERIFY",0],
	["ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0],
	["ARGEE_PROJ_DEV_ORDER_NUM",0],
	["ARGEE_PROJ_DEV_NAME",0],
	["ARGEE_PROJ_APP_VER_STRING",0],
	["MODULE_LIST_ARRAY",0],
	["ARGEE_CTRL_PREEMPT_POINT_OFFSET",0],
	["ARGEE_CTRL_SAVE_LR_OFFSET",0],
	["ARGEE_CTRL_SAVE_SP_OFFSET",0],
	["ARGEE_CTRL_CURR_TASK_OFFSET",0],
	["ARGEE_CTRL_FUNCT_TBL_OFFSET",0],
	["ARGEE_CTRL_FUNCT_TBL_LEN_OFFSET",0],
	["ARGEE_CTRL_IO_MAP_OFFSET",0],
	["ARGEE_CTRL_INSTR_TRACE_OFFSET",0],
	["PROG_TRACE_TBL_SEG_OFFSET_OBJ",0],	
	["ARGEE_CTRL_DIRECT_ASM_CALL_SEGM_OFFSET",0],
	["ARGEE_CTRL_INTERCYCLE_TIME",0],
	["ARGEE_CTRL_VAR_SEGM_SIZE",0],
	["ARGEE_CTRL_LR_CALLER_OFFSET",0],
	["ARGEE_CTRL_FP_CALLER_OFFSET",0],
	["ARGEE_PROJ_TYPE",0],
	["ARGEE_PROJ_TITLE",0],
	["ARGEE_PROJ_NV_CHECKSUM",0],
	["ARGEE_PROJ_CHECKSUM",0],
	["ARGEE_BOOT_PROJ_ENABLED",0],
	["ARGEE_SOURCE_CODE",0],
];

	
function* UploadProg()
{
	var i;
	function isEmptyBreakpointList(arr)
	{
		var i;
		for(i in arr)
		{
			if (arr[i]==true)
			{
				return false;
			}
		}
		return true;
	}

	var res=yield* Login();
	if (res==false)
	{
		return;
	}
	

	var prj_obj_list_curr=fastClone(prj_obj_list);	

	
	for(i=0;i<slices.length;i++)
	{
		var arr=GOM.getObjArr("ARGEE_IO_PARAM",i);
		if ((arr!=undefined)&&(arr.byteLength>0))
		{
			prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_IO_PARAM",i];	
		}
	}


	
	if (hmi_present==true)
	{
		prj_obj_list_curr[prj_obj_list_curr.length]=["HMI_SOURCE_CODE",0];		
	}
	

	if (isEmptyBreakpointList(GOM.getObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0))==true)
	{
		prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_RUN_CODE",0];
	}
	else
	{
		if (confirm("Bootable project containing breakpoints!")==false)
		{
			GOM.finAjaxAction();
			return;
		}
		prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_PATCHED_CODE_STORAGE",0];
	}
	
	
	yield* GOM.objectExchange("ARGEE_BOOT_PROJ_ENABLED",0,"READ",true);
	
	var prev_boot_proj_state=GOM.getObjNum("ARGEE_BOOT_PROJ_ENABLED",0);
	
	GOM.setObjNum("ARGEE_KERN_VER_VERIFY",0,GOM.getObjNum("ARGEE_COMP_VER",1));
	GOM.setObjNum("ARGEE_BOOT_PROJ_ENABLED",0,1);
//	SIM.preprocessProjFile(GOM.createProjFile(prj_obj_list_curr));
	
	var prj_file;
	prj_file=GOM.createProjFile(prj_obj_list_curr);
	if ((prj_file==null)||((prj_file.byteLength)>=(256*1024)))
	{
		setCompilerMessage(false,true,"Error: Project file doesn't fit into allocated space of "+(256*1024)+" bytes");					
		GOM.finAjaxAction();
		return;
	}
	yield* GOM.objectExchange(prj_file,0,"STORE_ARGEE_FILE",false);

	setCompilerMessage(false,false,"Loadable code size <b>"+(GOM.getObjArr("ARGEE_RUN_CODE",0).byteLength)+" bytes</b>(out of "+findCodeSizeLimit(GOM.getObjNum("MULTPC_ORDER_NUM",0))+" bytes) Project size: <b>"+GOM.getLastProjFileSize()+" bytes</b> (out of 262144 bytes)");

	
	if (prev_boot_proj_state==false)
	{
		setCompilerMessage(false,false,"Project loaded into an empty device. Wait for 20 seconds before switching to Debug");
	}
	
	
	
	GOM.finAjaxAction();
	//deteleLocalStorageKey("prog_code");
	eraseProject();
	
	if (project_without_source_started==true)
	{
		FLOW.initProj(true);
		var title="";
		GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
		FLOW.showFlowchart();
		renderMenu("show_flow_menu_only");
	}
	else
	{
		if (prev_boot_proj_state==true)
		{
			if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.FLOWCHART)
			{
				renderMenu("debug_flow");
			}
			else if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.ARGEE)
			{
				switch_to_test_without_compile=true;
				renderMenu("debug_pro");
			}
			else
			{
				switch_to_test_without_compile=true;
				renderMenu("debug_pro");
			}
		}
	}
}


function* StopProj()
{
	
	var res=yield* Login();
	if (res==false)
	{
		return;
	}

	
	GOM.setObjNum("ARGEE_BOOT_PROJ_ENABLED",0,0);
	var obj_list=
	[
		["ARGEE_BOOT_PROJ_ENABLED",0],
	];
	
	
	var proj=GOM.createProjFile(obj_list);
	if (SIM.getSimMode()==true)
	{
		proj=SIM.createEmptyARGEE_Proj();
	}
	yield* GOM.objectExchange(proj,0,"STORE_ARGEE_FILE",false);
	setCompilerMessage(false,false,"<b>Empty project -> runtime stopped</b>");
	GOM.finAjaxAction();
	deteleLocalStorageKey("prog_code");
}
	
	



 
 


var run_mode_types=
{
	NO_DEBUG:0,
	REG_DEBUG:1,
	FLOW_DEBUG:2,
	DEBUG_IN_PROG:0,
};
	
	

var argee_run_mode=run_mode_types.NO_DEBUG;


var sect_type=
{
	input:0,
	output:1,
	diag:2,
	param:3
};




/*function checkModIdDownload(id)
{
	var i;
	for(i=0;i<slices.length;i++)
	{
		if (slices[i].id==id)
		{
			return true;
		}
	}
	return false;

}*/	

function onKeyDown(event,elem)
{
	if (event.keyCode == 13)
	{
		TRANSF.DlgHide('Program') 
		return false;
	}
	else if (event.keyCode==121)
	{
		// F10
		if (confirm("Do you really want to cler localStorage?")==true)
		{
			localStorage.clear()
		}
		return false;
	}
	return true;
}
	
		

return {
	DlgShow:DlgShow,
	DlgHide:DlgHide,
	PasswordDlgHide:PasswordDlgHide,
	Login:Login,
	UploadProg:UploadProg,
	StopProj:StopProj,
	prj_obj_list:prj_obj_list,
	getIP:getIP,
	startEnvConn:startEnvConn,
	onKeyDown:onKeyDown,
	setIP:setIP,
}
}());

var TRANSF=ARGEE_misc_transf_func;