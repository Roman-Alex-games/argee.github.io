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
 *  DESCRIPTION: Programmable Environment ARGEE
 *
 *******************************************************************************/

 
var ARGEE_Environment_Version=0x03023305
var exp_ARGEE_Kernel_Version= 0x03040100; 
var ARGEE_default_interscan_delay=2; //ms
var debug_console=true;
var switch_to_test_without_compile=false;
var prog_view=false;

var generic_device_code_limit=25*1024;
var device_code_limits=
[
	{order_num:6814017,code_size:42*1024},
	{order_num:6814082,code_size:42*1024},
];

function findCodeSizeLimit(order_num)
{
	var i;
	// sam7 ->25KB, STM32-> 42 KB
	if ((slices[0].id==0x01500021)||(slices[0].id==0x01500027))
	{
		return  25*1024;
	}
	else
	{
		return 42*1024;
	}
}

var kernel_version_matrix=
[
	{kernel:0x02020000,env_path:"Earlier_Environments/2_0_8_8/Start ARGEE Programming Environment.html"},
	{kernel:0x02030000,env_path:"Earlier_Environments/2_0_11_6/Start ARGEE Programming Environment.html"},
	{kernel:0x02040000,env_path:"Earlier_Environments/2_0_12_9/Start ARGEE Programming Environment.html"},
	{kernel:0x02060000,env_path:"Earlier_Environments/2_0_15_30/Start ARGEE Programming Environment.html"},
	{kernel:0x02070000,env_path:"Earlier_Environments/2_0_26_0/Start ARGEE Programming Environment.html"},
	{kernel:0x03030000,env_path:"Earlier_Environments/3_2_15_5/Start ARGEE Programming Environment.html"},
	{kernel:0x01030000,env_path:"Earlier_Environments/1_3_9_0/Start ARGEE Programming Environment.html"},
];


function findPathBasedOnKernelVer(version)
{
	var i;
	var ver=version&0xffff0000;
	for(i=0;i<kernel_version_matrix.length;i++)
	{
		if (kernel_version_matrix[i].kernel==ver)
		{
			return kernel_version_matrix[i].env_path;
		}
	}
	return null;
}	
	


function ARGEE_InvokeProperEnvironment(version,ip)
{
	if ((version&0xffff0000)!=(exp_ARGEE_Kernel_Version&0xffff0000))
	{
		var str=window.location.toString();
		var arr=str.split("Start ARGEE Programming Environment.html");
		var env_path=findPathBasedOnKernelVer(version);
		if (env_path==null)
		{
			prog_div.style.visibility = 'visible';
			prog_div.innerHTML="<h1>Incompatible ARGEE Kernel Version "+ getVersionString(version)+". No Compatible environment found in this distribution.</h1>"; 
			return false;
		}
		else
		{
			if ((sessionStorage.prevCompatibleEnvironment!=undefined)&&
			    (sessionStorage.prevCompatibleEnvironment==env_path))
			{
				// Use session storage to avoid popup dialog after every reload of an incompatible environment.
				// session storage survives reloads
				localStorage.redirectIP=ip;
				window.location=arr[0]+env_path;
				return true;
			}
			else
			{
				if (confirm("The kernel in the device is not compatible with the latest environment.\nDo you want to launch a compatible environment?")==true)
				{
					sessionStorage.prevCompatibleEnvironment=env_path;
					localStorage.redirectIP=ip;
					window.location=arr[0]+env_path;
					return true;
					
				}
				else
				{
					return false;
				}
				
			}
		}
	}
	if (window.location.href.toUpperCase().search("Earlier_Environments".toUpperCase())==-1)
	{
		delete sessionStorage.prevCompatibleEnvironment;
	}
	return true;
}




var ENV=
{
	FLOWCHART:0,
	ARGEE:1,
	NST:2,
};

// rempa sect_type based on IO database
var sect_type=
{
	param:3,
	diag:2,
	input:0,
	output:1,
};

var var_type=
{
	prog:0,
	plc:1,
	state_names:2,
//	m2m:4,
	io:5,
    state:6,

};

var var_prg=
{
    integer:0,
    timer:1,
    state:2,
	retain:3,
};


var real_ARGEE_Kernel_Version;
var real_DeviceName=""; 


// taken from http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


function findIndex(id)
{
	var i;
	for(i=0;i<slices.length;i++)
	{
		if (slices[i].id==id)
		{
			return i;
		}
	}
}

//


function mouseDownHandler(event)
{
	var ev=event;
	//var now = (new Date()).getTime();
	var act_menu=window.document.getElementById("act_menu");
	//addToLog("at "+now+" mouseDownHandler "+ev.target.id+" "+act_menu.style.display);
	//addToLog("at "+now+" mouseDownHandler1 "+ev.target.id+" "+upTo(ev.target,"act_menu"));
	
	if (act_menu.style.display=="none")
	{
		return true;
	}
	
	if (upTo(ev.target,"act_menu")!=null)
	{
		//
		return true;
	}
	
	
	if (ev.target.id!="act_menu")
	{
		//addToLog("at "+now+" mouseDownHandler2 ");
		hideCondMenu();
		return false;
	}	
	return true;
}

function hideCondMenu()
{
	var act_menu=window.document.getElementById("act_menu");
	act_menu.style.display="none";
	act_menu.innerHTML="";
}

/*var max_loadable_prog_size=(32*1024);
var max_total_size=(256*1024);
*/

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

	
	if (pg==0)
	{
		outp+="<input type=\"text\" id=\"ip_addr_prompt\" value=\""+ip+"\" onkeydown=\"if (event.keyCode == 13) DlgHide('HMI')\" >";
	}
	else if (pg==1)
	{
		outp+="<center><input type=\"text\" id=\"ip_addr_prompt\" value=\""+ip+"\" onkeydown=\"if (event.keyCode == 13) DlgHide('Program')\" ></center>";
	}
	  
	outp+="</td>";
	outp+="</tr><tr>";
	outp+="<td>";
	if (pg==0)
	{		  
		outp+="<input type=\"button\"  style=\"width:100%;\" value=\"Enter HMI Mode\"  onclick=\"DlgHide('HMI')\" />";
	}
	else if (pg==1)
	{
		outp+="<input type=\"button\" style=\"width:100%;\"  value=\"Enter Program Mode\"  onclick=\"DlgHide('Program')\" />";
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
		outp+="<center><input type=\"button\" style=\"width:100%;\"  value=\"Enter Simulation Mode\"  onclick=\"DlgHide('Simulation')\" /></center>";
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
	  continuePreInit1(1,inp.value);
  }
  else if (Result=='HMI')
  {
	  continuePreInit(0,inp.value);
  }
  else
  {
	  continuePreInit(2,null);
  }
  // Hide the dialog box.
  var Dlg = document.getElementById("Overlay");
  Dlg.style.visibility = "hidden";
  
  	var Dlg = document.getElementById("grayout");
	Dlg.style.visibility = "hidden";

  
}


function HelpDlgShow()
{
	var outp;	
	// Change the message.
	var Msg = document.getElementById("Overlay_help");
	Msg.style.borderColor="#99CC00";
	var Msg = document.getElementById("DlgContent2");
	outp="<center><h3> Help Screen: </h3></center><table><tr><td align=\"left\">";
	outp+="Keyboard shortcuts: <br>Press Ctrl-q for list of program variables<br>"+
						    "Press Ctrl-l for list of function block variables<br>"+
		                    "Press Ctrl-i for list of I/O variables<br>"+
								  "Press Ctrl-f for list of built-in functions<br>"+
                                  "Press Ctrl-s for list of State Names<br>"+
								  "<br>Press Ctrl-\"down arrow\" collapse all elements which are collapsed by default, Ctrl -\"left/right arrow\" to adjust the size of variables panel<br>"+
								  "<br>Block select program statements by clicking on the \"number area\" and dragging mouse down and selecting 2 or more statements. "+
								  "Once the block is selected, Ctrl-x can be used to cut statements, Ctrl-c to copy statements, Ctrl-d to comment out statements, Ctrl-Shift-d to uncomment statements. <br>";

	outp+="</td></tr><tr><td>";
	outp+="<br><input type=\"button\"  style=\"width:100%;\" value=\"Close\"  onclick=\"HelpDlgHide()\" />";
	outp+="</td></tr></table>";
	Msg.innerHTML=outp;
	// Display the dialog box.
	var Dlg = document.getElementById("Overlay_help");
	Dlg.style.visibility = "visible";
	
	var Dlg = document.getElementById("grayout");
	Dlg.style.visibility = "visible";
}

function HelpDlgHide()
{
	
  // Hide the dialog box.
  var Dlg = document.getElementById("Overlay_help");
  Dlg.style.visibility = "hidden";
  
  var Dlg = document.getElementById("grayout");
  Dlg.style.visibility = "hidden";

  
}


var max_localStorage_placeholders=5;
var selected_localStorage_placeholder=0;

var all_registered_keys=
[
	"cond_db",
	"var_db",
	"screens",
	"flowchart",
	"editor",
	"libraryCode",
	"libraryDesc",
	"importedProjectKernelVersion",
	"importedProjectEnvVersion",
	"importedProjectOrderNum",
	"importedProjectFirmwareRev",
	"importedProjectChecksum",
	"importedParameters",
	"def_ip",
	"simCode",
	"lastSavedTime",
	"misc",
	"prog_code",
	"IODB",
	"params",
	"title",
];



// to get to the appropriate indexed element -> use _INDEX_ prefix concatenated with the element_name
function getLocalStorageIndexed(index,element_name)
{
	var key="_ARG3_"+index+"_"+element_name;
	return localStorage.getItem(key);
}

function setLocalStorageIndexed(index,element_name,value)
{
	var key="_ARG3_"+index+"_"+element_name;
	return localStorage.setItem(key,value);
}

function deleteLocalStorageKeyIndexed(index,element_name)
{
	var key="_ARG3_"+index+"_"+element_name;
	if (localStorage.getItem(key)!=undefined)
	{
		localStorage.removeItem(key);
	}
}


function deteleLocalStorageKey(element_name)
{
	deleteLocalStorageKeyIndexed(selected_localStorage_placeholder,element_name);
}

function clearLocalStorage()
{
	var i;
	for(i=0;i<all_registered_keys.length;i++)
	{
		deteleLocalStorageKey(all_registered_keys[i]);
	}
	saveLastUpdate();
}


function getLocalStorage(element_name)
{
	return getLocalStorageIndexed(selected_localStorage_placeholder,element_name);
}

function setLocalStorage(element_name,value)
{
	
    if (element_name.localeCompare("lastSavedTime")!=0)
	{
		saveLastUpdate();
		return setLocalStorageIndexed(selected_localStorage_placeholder,element_name,value);
	}
	else
	{
		return setLocalStorageIndexed(selected_localStorage_placeholder,element_name,value);
	}
}

function getLocalStorageIndexedTimestamp(index)
{
	if ((getLocalStorageIndexed(index,"lastSavedTime")==undefined)||(getLocalStorageIndexed(index,"lastSavedTime")=="undefined"))
	{
		return "0";
	}
	else
	{
		return getLocalStorageIndexed(index,"lastSavedTime");
	}
	
}

function findLatestSavedPlaceholderBesidesSimulation()
{
	var i;
	var latest=0;
	for(i=0;i<(max_localStorage_placeholders-1);i++)
	{
		if (parseInt(getLocalStorageIndexedTimestamp(i))>parseInt(getLocalStorageIndexedTimestamp(latest)))
		{
			latest=i;
		}
	}
	return latest;
}

function findObsoletePlaceholder()
{
	var i;
	var earliest=0;
	for(i=0;i<(max_localStorage_placeholders-1);i++)
	{
		if (parseInt(getLocalStorageIndexedTimestamp(i))<parseInt(getLocalStorageIndexedTimestamp(earliest)))
		{
			earliest=i;
		}
	}
	return earliest;
}

function saveLastUpdate()
{
	setLocalStorage("lastSavedTime",(new Date().getTime()/1000)|0);
}

function getLocalStorageLatestIP()
{
	var lat=findLatestSavedPlaceholderBesidesSimulation();
	if (getLocalStorageIndexed(lat,"def_ip")==undefined)
	{
		return "";
	}
	else
	{
		return getLocalStorageIndexed(lat,"def_ip");
	}
}


function selectLocalStoragePlaceholder(ip)
{
	var i;
	if (ip==null)
	{
		// simulation
		selected_localStorage_placeholder=max_localStorage_placeholders-1;
	}
	else
	{
		// search if we can find the element with the appropriate IP
		for(i=0;i<(max_localStorage_placeholders-1);i++)
		{
			if (getLocalStorageIndexed(i,"def_ip")==ip)
			{
				console.log("selectLocalStoragePlaceholder: placedholder="+i+" based on IP");
				selected_localStorage_placeholder=i;
				return;
			}			
		}
		// if the IP storage is not found -> search for the one with the earliest timestamp
		selected_localStorage_placeholder=findObsoletePlaceholder();
		console.log("selectLocalStoragePlaceholder: found old entry "+selected_localStorage_placeholder);
		return
	}
	return;	
}


var top_pos="7.1em";

function adjustMenuScreen(adj)
{
	var nav=document.getElementById("navigation");
	var prog_div=document.getElementById("prog");
	var vars_div=document.getElementById("vars");

	if (adj<0)
	{
		nav.style.height="0em";
		nav.style.display="none";
		prog_div.style.width="99%"
		prog_div.style.left="5px";
		prog_div.style.right="99%";
		prog_div.style.top="0em";
		vars_div.style.top="0em";
		vars_div.style.display="none";
		
	}
	else if (adj==0)
	{
		prog_div.style.width="99%"
		prog_div.style.left="5px";
		prog_div.style.right="99%";
		vars_div.style.display="none";
	}
	else
	{
		nav.style.height=top_pos;
		nav.style.display="block";
		prog_div.style.top=top_pos;
		vars_div.style.top=top_pos;
		
		if (side_by_side==true)
		{
		
			var_div=this.document.getElementById("vars");
			prog_div.style.width=(100-left_col_width)+"%";
			var_div.style.width=(left_col_width-1)+"%";
			prog_div.style.left=(left_col_width-1)+"%";
			var_div.style.left="5px";
			var_div.style.right=left_col_width+"%";
			vars_div.style.display="block";
		}
	}
}
		
	

var body;



var stationConfig=[];
var stationIO_Config=[];

var sect_names=["Input","Output","Diagnostics","Parameters"];

var slices=[];

var IO_ids=[];//["FGEN Station 5 Pin","16XSG"];
//80695500
//80670500
//80670500


//var men_style="<link rel=\"stylesheet\" type=\"text/css\" href=\"men.css\">";
var men_style="";

					  
var var_div;
var prog_div;
var men_div;
var buttons_div;
var tabs_div;
var var_context_menu_div;

var menu_str="";

			
			





// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Taken from  http://www.hunlock.com/blogs/Snippets:_Howto_Grey-Out_The_Screen
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function grayOut(doc, vis, options) {
  // Pass true to gray out screen, false to ungray
  // options are optional.  This is a JSON object with the following (optional) properties
  // opacity:0-100         // Lower number = less grayout higher = more of a blackout 
  // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
  // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
  // grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
  // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
  // in any order.  Pass only the properties you need to set.
  var options = options || {}; 
  var zindex = options.zindex || 50;
  var opacity = options.opacity || 70;
  var opaque = (opacity / 100);
  var bgcolor = options.bgcolor || '#000000';
  var dark=doc.getElementById('darkenScreenObject');
  if (!dark) {
    // The dark layer doesn't exist, it's never been created.  So we'll
    // create it here and apply some basic styles.
    // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
    var tbody = doc.getElementsByTagName("body")[0];
    var tnode = doc.createElement('div');           // Create the layer.
        tnode.style.position='fixed';                 // Position absolutely
        tnode.style.top='0px';                           // In the top
        tnode.style.left='0px';                          // Left corner of the page
        tnode.style.overflow='hidden';                   // Try to avoid making scroll bars            
        tnode.style.display='none';                      // Start out Hidden
        tnode.id='darkenScreenObject';                   // Name it so we can find it later
    tbody.appendChild(tnode);                            // Add it to the web page
    dark=doc.getElementById('darkenScreenObject');  // Get the object.
  }
  if (vis) {
    // Calculate the page width and height 
/*    if( doc.body && ( doc.body.scrollWidth || doc.body.scrollHeight ) ) {
        var pageWidth = doc.body.scrollWidth+'px';
        var pageHeight = doc.body.scrollHeight+'px';
    } else if( doc.body.offsetWidth ) {
      var pageWidth = doc.body.offsetWidth+'px';
      var pageHeight = doc.body.offsetHeight+'px';
    } else {
	 */
       var pageWidth='100%';
       var pageHeight='100%';
    //}   
    //set the shader to cover the entire page and make it visible.
    dark.style.opacity=opaque;                      
    dark.style.MozOpacity=opaque;                   
    dark.style.filter='alpha(opacity='+opacity+')'; 
    dark.style.zIndex=zindex;        
    dark.style.backgroundColor=bgcolor;  
    dark.style.width= pageWidth;
    dark.style.height= pageHeight;
    dark.style.display='block';				 
  } else {
     dark.style.display='none';
  }
}
// Find first ancestor of el with tagName
// or undefined if not found
function upTo(el, match_parent_id) {

  var t = el.parentNode;
  match_parent_id = match_parent_id.toLowerCase();

  while (t) 
  {

    if (t.id && t.id.toLowerCase() == match_parent_id) {
      return t;
    }
	 t=t.parentNode;
  }

  // Many DOM methods return null if they don't 
  // find the element they are searching for
  // It would be OK to omit the following and just
  // return undefined
  return null;
}


//http://www.kirupa.com/html5/get_element_position_using_javascript.htm
function findPos(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return [yPosition,xPosition];
}





		


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Editor/Debugger - Render conditions/actions.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Some Top level menu/utility functions for project management
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function eraseProject()
{
	var sim_mode=SIM.getSimMode();
	var loc_config;
	var loc_code;
	if (sim_mode==true)
	{
		loc_code=getLocalStorage("simCode");
	}

	var ip=getLocalStorage("def_ip");
	clearLocalStorage();
	setLocalStorage("def_ip",ip);
	if (sim_mode==true)	
	{
		if ((loc_code!=null)&&(loc_code!=undefined))
		{
			setLocalStorage("simCode",loc_code);
		}
	}

    //localStorage.library=library;
}



function clearProject()
{
	var i;
	var r=confirm("Erase Project?");
	if (r==true)
	{
		var sim_mode=SIM.getSimMode();
		if (sim_mode==true)
		{
			SIM.setSimStopped(true);
			//if (localStorage.simDevSelect!=undefined)
			{
				deteleLocalStorageKey("simCode");
				var ip=getLocalStorage("def_ip");
				clearLocalStorage();
				setLocalStorage("def_ip",ip);
				sim_gen_show=SIM.getSimGen();
				sim_gen_show.next();
				return;
			}
		}
		
		
		eraseProject();
		GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(""));
		FLOW.initProj(true);
		// create default parameters
		for(i=0;i<slices.length;i++)
		{
			IO_CONF.createDefaultParamInit(i);
		}
		FLOW.showFlowchart();
		renderMenu("show_flow_menu_only");
	}
	return true;
}


function ProgView()
{
	prog_view=true;
	
/*	
	adjustMenuScreen(1);

	var_display=false;
	refreshProg(true);
	redrawVars(true,false);
	monitoring_mode=false;
	*/
	clearCompilerMessage();
	adjustMenuScreen(1);
	ARGEE_nst_debug.StopDebug();
	//DESCR.renderInCompactMode();
	DESCR.renderDefaultView(false);
	return true;
}

var proj_preview_html;
var proj_preview_window;


function loadProjInPreview(e)
{
	combined_prj_str="";
	var j,stat;
	var filename=globalFileHandle.name.split(/(\\|\/)/g).pop();
	var extensions=filename.split(".");
	var html_bad_file="<html><head><title></title><style>  body { font-size: 75%; }</style></head><body ><h1> Can not preview this project</h1></body></html>";
	if (extensions[extensions.length-1].toUpperCase()=="ARG")
	{
		module=false;
	}
	else if (extensions[extensions.length-1].toUpperCase()=="ARGL")
	{
		module=true;
		proj_preview_window.document.write(html_bad_file);
		proj_preview_window.document.close();
		return;
	}
	else
	{
		proj_preview_window.document.write(html_bad_file);
		proj_preview_window.document.close();
		return;
	}
	var gom2=GOM_inst(true);
	var stat=gom2.loadProjFile(e.target.result,module,true);
	if (stat==false)
	{
		proj_preview_window.document.write(html_bad_file);
		proj_preview_window.document.close();
		return;
	}
	if (gom2.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.FLOWCHART)
	{
		proj_preview_window.document.write(html_bad_file);
		proj_preview_window.document.close();
		return;
	}
	//SIM.simDB_setCustomDev(
	console.log("order in sim: "+gom2.getObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0)+" Sim env ver "+gom2.getObjNum("ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0).toString(16)+" device name: "+gom2.arrToString(gom2.getObjArr("ARGEE_PROJ_DEV_NAME",0))); 
	
	gom2.setObjArr("ARGEE_DEV_NAME",0,gom2.getObjArr("ARGEE_PROJ_DEV_NAME",0));
	gom2.setObjNum("IP_ADDRESS",0,gom2.convStringToArr("Preview"));
	gom2.setObjNum("SAPI_APP_VER_STRING",0,gom2.getObjArr("ARGEE_PROJ_APP_VER_STRING",0));
	
	
	
	if (gom2.getObjArr("MODULE_LIST_ARRAY",0)==undefined)
	{
		proj_preview_window.document.write(html_bad_file);
		proj_preview_window.document.close();
		return;
	}
	
	// save dataview
	var var_types=DESCR.getTypeEnum().slice(0);
	var descr_copy=JSON.stringify(DESCR.proj_elems.sub_elems);
	var basic_mode_copy=DESCR.getBasicMode();
	var io_ids_backup=IO_ids.slice(0);
	var prev_order_num=GOM.getObjNum("MULTPC_ORDER_NUM",0);
	var slices_backup=slices.slice(0);
	DESCR.setPrintMode(true);
	
	var submods=gom2.getValDataView("MODULE_LIST_ARRAY",0);
	var num_mods=submods.getUint32(0,true);
	
	var slices_arr=[];
	var gw_order_num=gom2.getObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0);
	IO_ids=[];
	for(i=0;i<num_mods;i++)
	{
		var slice_obj=SIM.simDB_constructSliceObj(i,submods.getUint32(4*i+4,true),gw_order_num);
		IO_ids[i]=submods.getUint32(4*i+4,true);
		slices_arr[slices_arr.length]=slice_obj;
		//console.log("slot "+i+ " id=0x"+(submods.getUint32(4*i+4,true)).toString(16));
		//var res=IO_CONF.BEP_RenderParams(i,slices_arr,gom2);
		//console.log("params="+res);
	}
	slices=slices_arr;
	SIM.setup_slot_names(gw_order_num);
	var str=gom2.arrToString(gom2.getObjArrCompressed("ARGEE_SOURCE_CODE",0));
	IMP.import_proj(str,false,false,true);
	proj_preview_html=DESCR.dispPrintPreview_imp(false,null,true,gom2,slices_arr);
	// assume that the preview window is opened from before.
	proj_preview_window.document.write(proj_preview_html);
	proj_preview_window.document.close();
	var links = proj_preview_window.window.document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++)
	{
		links[i].removeAttribute('href');
	}
	slices=slices_backup;
	IO_ids=io_ids_backup.slice(0);
	SIM.setup_slot_names(prev_order_num);
	DESCR.setPrintMode(false);
	DESCR.setNewTypeEnum(var_types);
	DESCR.proj_elems.sub_elems=JSON.parse(descr_copy);
	DESCR.setBasicMode(basic_mode_copy);
}

function createImportString(gom)
{
	var str="Imported project created on:";
	if (gom.getObjArr("ARGEE_PROJ_DEV_NAME",0)!=undefined)
	{
		str+=gom.arrToString(GOM.getObjArr("ARGEE_PROJ_DEV_NAME",0));
	}
	else
	{
		str+=gom.getObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0);
	}
	str+=" Using environment V"+num2dot(gom.getObjNum("ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0));
	return str;
}


function syncImportFileToGOM(gom_imp,sim_mode,import_prog_text_only,sim_force_param_import)
{
	var i;
	
	if (sim_mode==true)
	{
		var slice_list=gom_imp.convArrBuftoArr32(gom_imp.getObjArr("MODULE_LIST_ARRAY",0)).slice(1);
		slices=[];
		IO_ids=[];
		for(i=0;i<slice_list.length;i++)
		{
			IO_ids[i]=slice_list[i];
			var slice_obj={};
			slice_obj=SIM.simDB_constructSliceObj(i,slice_list[i],gom_imp.getObjArr("ARGEE_PROJ_DEV_NAME",0));
			slices[slices.length]=slice_obj;
		}
		GOM.setObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0,gom_imp.getObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0));
		GOM.setObjArr("ARGEE_PROJ_DEV_NAME",0,gom_imp.getObjArr("ARGEE_PROJ_DEV_NAME",0));
		GOM.setObjArr("MODULE_LIST_ARRAY",0,gom_imp.getObjArr("MODULE_LIST_ARRAY",0));
	}
	if (gom_imp.getObjNum("ARGEE_PROJ_TYPE",0)!=undefined)
	{
		GOM.setObjNum("ARGEE_PROJ_TYPE",0,gom_imp.getObjNum("ARGEE_PROJ_TYPE",0));
	}
	if (gom_imp.getObjNum("ARGEE_PROJ_TITLE",0)!=undefined)
	{
		GOM.setObjArr("ARGEE_PROJ_TITLE",0,gom_imp.getObjArr("ARGEE_PROJ_TITLE",0));
	}
	if (gom_imp.getObjNum("ARGEE_PROJ_CHECKSUM",0)!=undefined)
	{
		GOM.setObjNum("ARGEE_PROJ_CHECKSUM",0,gom_imp.getObjNum("ARGEE_PROJ_CHECKSUM",0));
	}
	if (gom_imp.getObjArr("ARGEE_SOURCE_CODE",0)!=undefined)
	{
		GOM.setObjArr("ARGEE_SOURCE_CODE",0,gom_imp.getObjArr("ARGEE_SOURCE_CODE",0));
	}
	if ((import_prog_text_only==false)||(sim_force_param_import==true))
	{
		for(i=0;i<slices.length;i++)
		{
			var arr=gom_imp.getObjArr("ARGEE_IO_PARAM",i);
			if (arr!=undefined)
			{
				GOM.setObjArr("ARGEE_IO_PARAM",i,arr);
			}
		}
	}
}	

function onImportProj(e)
{
	// Render thumbnail.
	//var elem=window.document.getElementById('imp_id');
	//elem.value=e.target.result;
	combined_prj_str="";
	var i,j,stat;
	var filename=globalFileHandle.name.split(/(\\|\/)/g).pop();
	var extensions=filename.split(".");
	var import_prog_text_only=false;
	// simulation hack 
	var sim_force_param_import=false;

	
	if (extensions[extensions.length-1].toUpperCase()=="ARG")
	{
		var r=confirm("This operation will overwrite the existing project\n\n Do you want to continue?\n\n");
		if (r!=true)
		{
			return;
		}
		eraseProject();
		module=false;
	}
	else if (extensions[extensions.length-1].toUpperCase()=="ARGL")
	{
		import_prog_text_only=true;
		module=true;
	}
	else
	{
		alert("Invalid file");
		return;
	}
	/*for(j=0;;j++)
				{
					var code=e.target.result.charCodeAt(32*1024+j);
					combined_prj_str+=e.target.result
					*/
	
	var gom2=GOM_inst(true);
	var stat=gom2.loadProjFile(e.target.result,module,false);
	if (stat=="partial")
	{
		return;
	}
	if (stat==false)
	{
		alert("Unable to parse project file");
		return;
	}
	// Perform validations
	var source_code_str=gom2.arrToString(gom2.getObjArrCompressed("ARGEE_SOURCE_CODE",0));
	if (source_code_str.length==0)
	{
		alert("Import failed\n Can not import a project without a source code");
		return;
	}
	if (module==false)
	{
		var device_name_present=false;
		var module_list_present=false;
		var mod_list=gom2.getObjArr("MODULE_LIST_ARRAY",0);
		if ((mod_list!=undefined)&&(mod_list.byteLength>0))
		{
			module_list_present=true;
			// update module list array to cut off unused space
			var submods=gom2.getValDataView("MODULE_LIST_ARRAY",0);
			var num_mods=submods.getUint32(0,true);
			gom2.setObjArr("MODULE_LIST_ARRAY",0,gom2.getObjArr("MODULE_LIST_ARRAY",0).slice(0,4+num_mods*4));
		}
		var dev_name=gom2.getObjArr("ARGEE_PROJ_DEV_NAME",0)
		
		if ((dev_name!=undefined)&&(dev_name.byteLength>0))
		{
			device_name_present=true;
		}
		if (gom2.getObjNum("ARGEE_KERN_VER_VERIFY",0)&0xffff0000>GOM.getObjNum("ARGEE_COMP_VER",1)&0xffff0000)
		{
			alert("This Kernel is too old for this project file: "+gom2.getObjNum("ARGEE_KERN_VER_VERIFY",0).toString(16)+","+GOM.getObjNum("ARGEE_COMP_VER",1).toString(16)+"\nImport failed");
			return;
		}
		
		if ((SIM.getSimMode()==true)&&(gom2.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.FLOWCHART))
		{
			alert("Can not import flowchart projects into simulation");
			return;
		}
	
		
		if (GOM.getObjNum("MULTPC_ORDER_NUM",0)!=gom2.getObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0))
		{
			if ((SIM.getSimMode()==true)&&(device_name_present==true)&&(module_list_present==true))
			{
				
			}
			else
			{
				var prj_dev_name=gom2.arrToString(GOM.getObjArr("ARGEE_PROJ_DEV_NAME",0));
				if (confirm("Importing potantially incompatible project (created for device "+prj_dev_name+" (will only import program text) - please press OK to continue")==false)
				{
					return;		
				}
				import_prog_text_only=true;
			}
		}
		else
		{
			if (SIM.getSimMode()==true)
			{
				// if the same simulator device -> no need to recreate the simulation
				import_prog_text_only=true;
				sim_force_param_import=true;
			}
		}
		if ((SIM.getSimMode()==true)&&(import_prog_text_only==false))
		{
			// change simulation
			var str=createImportString(gom2);
			syncImportFileToGOM(gom2,true,import_prog_text_only,sim_force_param_import);
			SIM.createImportedProj();
			sim_gen_show=SIM.getSimGen();
			sim_gen_show.next();
			return;
		}
	}
	
	// import should only update source code and parameters(if the device is identical). If a simulation is invoked -> import should reload the simulation with appropriate device
	syncImportFileToGOM(gom2,false,import_prog_text_only,sim_force_param_import);
	

	
	if (stat==true)
	{
		var_div=document.getElementById("vars");
		prog_div.style.width=(100-left_col_width)+"%";
		var_div.style.width=(left_col_width-1)+"%";
		prog_div.style.left=left_col_width+"%";
		var_div.style.left="5px";
		var_div.style.right=left_col_width+"%";
		var_div.style.display="block";
		
		if (module==false)
		{
			var str=createImportString(gom2);
			// Copy title,checksum,parameters,code from gom2 to GOM.
			if (import_prog_text_only==false)
			{
				for(i=0;i<slices.length;i++)
				{
					GOM.setObjArr("ARGEE_IO_PARAM",i,gom2.getObjArr("ARGEE_IO_PARAM",i));	
				}
			}
			GOM.setObjArr("ARGEE_PROJ_TITLE",0,gom2.getObjArr("ARGEE_PROJ_TITLE",0));
			GOM.setObjNum("ARGEE_PROJ_CHECKSUM",0,gom2.getObjNum("ARGEE_PROJ_CHECKSUM",0));
			
			
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
				IMP.import_proj(source_code_str,true,false,false);	
				if (GOM.getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
				{
					var title="";
					GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
				}
				ARGEE_elem_descr.renderDefaultView(true);
				renderMenu("show_pro_menu_only");
			}
		}
		else
		{
			IMP.import_proj(source_code_str,true,true,false);
			ARGEE_elem_descr.renderDefaultView(true);
			renderMenu("show_pro_menu_only");
		}
	}
	
	
	


}	


function handleFileSelect(evt) 
{
    var files = evt.files; // FileList object
	globalFileHandle=files[0];
 	 
    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return onImportProj;
      })(f);

      // Read in the image file as a data URL.
      reader.readAsArrayBuffer(f);
    }
}


function doTrick() {
    window.document.getElementById('files').click();    
}


// taken from https://github.com/beatgammit/toDataURL/blob/master/src/download.js
var lookup = [
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
                'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                'w', 'x', 'y', 'z', '0', '1', '2', '3',
                '4', '5', '6', '7', '8', '9', '+', '/'
        ];

        function uint8ToBase64(uint8) {
                var i,
                        extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
                        output = "",
                        temp, length;

                function tripletToBase64 (num) {
                        return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
                };

                // go through the array every three bytes, we'll deal with trailing stuff later
                for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
                        output += tripletToBase64(temp);
                }

                // pad the end with zeros, but make sure to not forget the extra bytes
                switch (extraBytes) {
                        case 1:
                                temp = uint8[uint8.length - 1];
                                output += lookup[temp >> 2];
                                output += lookup[(temp << 4) & 0x3F];
                                output += '==';
                                break;
                        case 2:
                                temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
                                output += lookup[temp >> 10];
                                output += lookup[(temp >> 4) & 0x3F];
                                output += lookup[(temp << 2) & 0x3F];
                                output += '=';
                                break;
                }

                return output;
        }
		
var interm_proc_ast;		
// return <0 is compilation fails, 0 if it is an empty project, >0 if the project has executable code
function generateCodeForExport()
{
	var st=ARGEE_pre_comp.preCompile(0);
	GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(st));
	var glob=ARGEE_nst_parse.parse(st,true);
	if (glob==null)
	{
		//setCompilerMessage(false,true,"Error in the project.. Please compile first!");
		//alert("Error !!!!.\nExport can not be performed.\nMake sure project compiles without errors\n");
		return -1;
	}
	else
	{
		var proc_ast=ARGEE_nst_process.process(glob);
		if ((proc_ast==null)/*||(proc_ast.empty_proj==true)*/)
		{
			//setCompilerMessage(false,true,"Error in the project.. Please compile first!");
			//alert("Error !!!!.\nExport can not be performed.\nMake sure project compiles without errors\n");
			return -1;
		}
		if (proc_ast.empty_proj==true)
		{
			return 0
		}
		if (ARGEE_nst_code_gen.generate(proc_ast)!=true)
		{
			//setCompilerMessage(false,true,"Error in the project.. Please compile first!");
			//alert("Error !!!!.\nExport can not be performed.\nMake sure project compiles without errors\n");
			return -1;
		}
		interm_proc_ast=proc_ast;
		
		
	}
	return 1;
}	
		

function savePrjCode(type,source_present)
{
   var imgDLHelper = document.getElementById('imgdlhelper');
	var filename=document.getElementById('save_as_file_name');
	
		if ((source_present==false)&&(confirm("You are about the save the project without the source code!!!\n\n Click \"OK\" to proceed")==false))
		{
			return;
		}

	
	if (type==0)
	{
		// project
		imgDLHelper.download=filename.value+".arg";
	}
	else if (type==1)
	{
		// library
		imgDLHelper.download=filename.value+".argl";
	}
	var dat;
	var i;
	
	if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.ARGEE)
	{
	}
	else
	{
		FLOW.generateARGEE_Code(true);
	}
	var res=generateCodeForExport()
	var dat;
	
	if (source_present==false)
	{

		GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(""));
	}

	
	if (res<0)
	{
		alert("Project contains errors - saving as is");
		dat=GOM.createProjFile(null);
	}
	else
	{
			
		
		var prj_obj_list_curr=fastClone(TRANSF.prj_obj_list);	

		for(i=0;i<slices.length;i++)
		{
			var arr=GOM.getObjArr("ARGEE_IO_PARAM",i);
			if (arr!=undefined)
			{
				prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_IO_PARAM",i];	
			}
		}

		if (res>0)
		{
			prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_RUN_CODE",0];
		}
		
		dat=GOM.createProjFile(prj_obj_list_curr);
		if (dat==null)
		{
			alert("Project is too large - reduce the source code/images before saving..");
			return;
		}
	}
	
	var tmp = new Uint8Array(dat);
	dat = uint8ToBase64(tmp);
	
	blob = new Blob([tmp], { type: 'application/octet-stream;base64' }); //new way
	var blobUrl = URL.createObjectURL(blob);
	
	imgDLHelper.href=blobUrl;
	imgDLHelper.click();
}


function aboutPage()
{
	var vars_div=document.getElementById("vars");
	var tbl;
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";
	
	tbl="<center><br><br><h2>Versions and Links:</h2><h3><br><table border=\"2\">";
	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>Environment Version:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp"+getVersionString(ARGEE_Environment_Version)+"&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";		

	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>ARGEE Kernel Version:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp"+getVersionString(GOM.getObjNum("ARGEE_COMP_VER",1))+"&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";
	
	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>Download link to the latest version of the environment:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp<a target=\"_blank\" href=\"http://www.turck.us/assets/networks/argee/Start ARGEE Programming Environment.html\">Click Here</a>&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";

	
	tbl+="</table></h3></center>";	

	prog_div.innerHTML=tbl;
	return true;
}


function ImpExp()
{
	var vars_div=document.getElementById("vars");
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";

	//IMP.testConverter();

	if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.ARGEE)
	{
	}
	else
	{
		FLOW.generateARGEE_Code(false);
	}
	prog_div.innerHTML="";
	var st=ARGEE_pre_comp.preCompile(0);
	prog_div.innerHTML+="<br><h2>ST View:</h2><br><textarea type=\"text\" rows=\"10\" style=\"width:95%;\"  id=\"imp_id\">"+st+"</textarea>";
	prog_div.innerHTML+="<button onclick=\"Import();\">Import Text Above</button>";
	


	prog_div.innerHTML+="<br><br><br>";
	prog_div.innerHTML+="<h1> Open Project/Library</h1><br>";
	prog_div.innerHTML+="<input type=\"file\" accept=\".arg*\" id=\"files\"  onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple /><br>";


	//prog_div.innerHTML+="<input type=\"file\" id=\"files\" style=\"display:none\" onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple />";
	prog_div.innerHTML+="<br><br><br>";	
	prog_div.innerHTML+="<h1> Save Project/Library</h1><br>";
	prog_div.innerHTML+="<a id=\"imgdlhelper\" style=\"display:none;\"  download=\"test.txt\" href=\"\">&nbsp;</a><br>";
	prog_div.innerHTML+="Project Name: <input type=\"text\" size=\"10\" id=\"save_as_file_name\"><br><br>";
	prog_div.innerHTML+="<button onclick=\"savePrjCode(0,true);\">Save Project With Source Code</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	prog_div.innerHTML+="<button onclick=\"savePrjCode(1,true);\">Save Library</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	prog_div.innerHTML+="<button onclick=\"savePrjCode(0,false);\">Save Project <b><u>Without</u></b> Source Code</button>";
    
    
	return true;	
	
}


var interf_types=
{
	computer:0,
	smartphone:1,
	tablet:2
};





// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Some Top level menu/utility functions for project management
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!








function loadProjTitleFromLocalStorage()
{
	var localSt_Elems=[];
	var str=getLocalStorage("title");
	if ((str==undefined)||(str==null))
	{
		return;
	}
	GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(str));
}

function saveProjTitleToLocalStorage()
{
	var str=GOM.arrToString(GOM.getObjArr("ARGEE_PROJ_TITLE",0))
	setLocalStorage("title",str);
}

function updateProjectName()
{
	clearCompilerMessage();
/*	if (GOM.getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
	{
		prj_name_div.innerHTML="Project Title:";
		return;
	}
	
	//checksum_div.innerHTML="Checksum : <b>0x"+(GOM.getObjNum("ARGEE_PROJ_CHECKSUM",0).toString(16))+"</b>";	
	prj_name_div.innerHTML="Project Title: <b>"+(GOM.arrToString(GOM.getObjArr("ARGEE_PROJ_TITLE",0)))+"</b>";
	*/
}

var hmi_present=false;


function runARGEE_imp(source_present)
{
	var st;
	//setCompilerMessage(false,false,"Compiling Project");

	//argee_run_mode=run_mode_types.REG_DEBUG;
	//compileProject();
	prog_view=true;
	st=ARGEE_pre_comp.preCompile(1);
	hmi_present=false;
	if (st!=null)
	{
		GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(st));
		var glob=ARGEE_nst_parse.parse(st,true);
		if (glob!=null)
		{
			var proc_ast=ARGEE_nst_process.process(glob);
			if ((proc_ast==null)||(proc_ast.empty_proj==true))
			{
				if (proc_ast!=null)
				{
					if (glob.list[1].list.length>1)
					{
						alert("Can not upload an empty project. It contains function blocks");
					}
					else
					{
						GOM.addAjaxAction(ARGEE_misc_transf_func.StopProj);
					}
				}
				return;
			}
			standalone_hmi.initObj();
			var hmi={list:[]};
			try
			{
				hmi=PROCESS.constructHMI_Map(proc_ast.hmi,false);
			}
			catch(e)
			{
				PARSE.setErrMsg(e);
				console.log("Error: "+(e.err_msg) + " in the program on line: "+ (PARSE.getTokenStartLine()+1));
				//var res_inner=this.document.getElementById("comp_res_id");
				//res_inner.innerHTML="Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1);
				return;
			}
			var special_var=PROCESS.findVarElem(proc_ast,"ACTIVE_HMI_SCREEN");
			if ((special_var!=null)&&(special_var.type.data=="CHAR")&&(special_var.type.range_end!=undefined))
			{
				hmi.active_screen_offset=special_var.offset;
			}
			standalone_hmi.setHMI_Elems(hmi);
			
			var css_str="#Overlay_pass\r\n" +
						"{\r\n" +
						"  visibility: hidden;\r\n" +
						"  position: absolute;\r\n" +
						"    top: 50%;\r\n" +
						"    left: 50%;\r\n" +
						"    width:20em;\r\n" +
						"    height:15em;\r\n" +
						"    margin-top: -2em; /*set to a negative number 1/2 of your height*/\r\n" +
						"    margin-left: -5em; /*set to a negative number 1/2 of your width*/	\r\n" +
						"  text-align:center;\r\n" +
						"  border: solid;\r\n" +
						"  background-color: #F0F0F0;\r\n" +
						"  z-index: 9999;\r\n" +
						"}\r\n" +
						"fieldset { -moz-border-radius:10px;  border-radius: 10px;  -webkit-border-radius: 10px; }\r\n"+
						"body { font-size: 75%;font-family:'"+hmi_font_family+"'; }\r\n"+
						"table {font-size: 100%;}\r\n"+
						"#grayout {\r\n" +
						"    position: fixed;\r\n" +
						"    top: 0px;\r\n" +
						"    left: 0px;\r\n" +
						"    width: 100%;\r\n" +
						"    height: 100%;\r\n" +
						"    z-index: 8888;\r\n" +
						"    visibility: hidden;\r\n" +
						"    background-color: #000;\r\n" +
						"    filter: alpha(opacity = 55);\r\n" +
						"    opacity:.50;\r\n" +
						"}\r\n";
			
			var html_output="<html><head><style>"+css_str+"</style><script> var standalone_hmi={"+standalone_hmi_text+"};"+
			"var hmi_str='"+escape(JSON.stringify(hmi))+"';hmi_global=JSON.parse(unescape(hmi_str));"+
			"</script></head><body onload=\"standalone_hmi.initObj();standalone_hmi.setHMI_Elems(hmi_global);standalone_hmi.setURL(window.location.href);standalone_hmi.timer_func();\"><div id=\"grayout\"></div><div id=\"Overlay_pass\"><p id=\"DlgContent1\"></p></div><div id=\"prog\"></div></body></html>";
			if (proc_ast.hmi.list.length>0)
			{
				hmi_present=true;
				/*var zip = new JSZip();
				zip.file("hmi.html",html_output);
				var arr=zip.generate({type:"uint8array",compression:"DEFLATE",compressionOptions:{level:6}});*/
				//var pako=require('pako');
				var arr=pako.deflate(html_output,{gzip:true,level:9});
				GOM.setObjArr("HMI_SOURCE_CODE",0,arr.buffer);
			}
			if ((SIM==undefined)||(SIM.getSimMode()==false))
			{
				standalone_hmi.setURL("http://"+(TRANSF.getIP()));
			}
			
			//eval(hmi);
			if (ARGEE_nst_code_gen.generate(proc_ast)==true)
			{
				if ((GOM.getObjArr("ARGEE_RUN_CODE",0).byteLength)>=findCodeSizeLimit(GOM.getObjNum("MULTPC_ORDER_NUM",0)))
				{
					setCompilerMessage(false,true,"Error: Code doesn't fit into allocated space: program requires "+(GOM.getObjArr("ARGEE_RUN_CODE",0).byteLength) + " bytes, availbale space: "+(findCodeSizeLimit(GOM.getObjNum("MULTPC_ORDER_NUM",0)))+" bytes");					
					return;
				}
				if (source_present==false)
				{
					GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(""));
				}
				ARGEE_nst_debug.RunProg(proc_ast);
			}
		}
	}
}

function runARGEE()
{
	return runARGEE_imp(true);
}

var project_without_source_started=false;

function runARGEE_without_source()
{
	if (confirm("You are about the overwrite the project in the device without the source code!!!\n Click \"OK\" to proceed")==true)
	{
		project_without_source_started=true;
		runARGEE_imp(false);
	}
}

function setAdvancedEditingMode()
{
	DESCR.setBasicMode(false);
	renderMenu("show_pro");
}

function ARGEE_HMI()
{
	//ARGEE_nst_hmi.renderInit(ARGEE_nst_debug.getGlobals());
	//standalone_hmi.initObj();
	var st=ARGEE_pre_comp.preCompile(0);
	var res=generateCodeForExport()
	if (res<0)
	{
		alert("Project contains errors");
		return false;
	}
	standalone_hmi.initObj();
	var hmi={list:[]};
	try
	{
		hmi=PROCESS.constructHMI_Map(interm_proc_ast.hmi,false);
	}
	catch(e)
	{
		PARSE.setErrMsg(e);
		console.log("Error: "+(e.err_msg) + " in the program on line: "+ (PARSE.getTokenStartLine()+1));
		//var res_inner=this.document.getElementById("comp_res_id");
		//res_inner.innerHTML="Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1);
		return;
	}

	if (hmi.list.length==0)
	{
		setCompilerMessage(false,true,"<b>HMI screens are not defined!!!</b>");
		return false;
	}
	var special_var=PROCESS.findVarElem(interm_proc_ast,"ACTIVE_HMI_SCREEN");
	if ((special_var!=null)&&(special_var.type.data=="CHAR")&&(special_var.type.range_end!=undefined))
	{
		hmi.active_screen_offset=special_var.offset;
	}
	standalone_hmi.setHMI_Elems(hmi);
	if ((SIM==undefined)||(SIM.getSimMode()==false))
	{
		standalone_hmi.setURL("http://"+(TRANSF.getIP()));
	}
	prog_div.innerHTML="";
	adjustMenuScreen(0);
	standalone_hmi.timer_func();
}

function setProjectName()
{
	prog_view=true;
	var title=prompt("Set Project Title",GOM.arrToString(GOM.getObjArr("ARGEE_PROJ_TITLE",0)));
	if (title!=null)
	{
		GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(title));
		saveProjTitleToLocalStorage();
	}
	
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: HMI Edit/Rendering functions 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


var cont_menu_div;
var nav_div;
var checksum_div;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Top level menu structure and rendering functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function ARGEE_Debug()
{
	var proc_ast;
	if (getLocalStorage("prog_code")==undefined)
	{
		if (switch_to_test_without_compile==true)
		{
			switch_to_test_without_compile=false;
			proc_ast=GEN.getFinalAST();
			ARGEE_nst_debug.prepareDebElems(proc_ast);
			ARGEE_nst_debug.TestProg();
		}
		else
		{
			st=ARGEE_pre_comp.preCompile(1);
			if (st!=null)
			{
				GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(st));
				var glob=ARGEE_nst_parse.parse(st,true);
				if (glob!=null)
				{
					var proc_ast=ARGEE_nst_process.process(glob);
					if ((proc_ast==null)||(proc_ast.empty_proj==true))
					{
						setCompilerMessage(false,true,"Recompile code");
						return false;
					}
					if (ARGEE_nst_code_gen.generate(proc_ast)==true)
					{
						ARGEE_nst_debug.prepareDebElems(proc_ast);
						ARGEE_nst_debug.TestProg();
					}
					else
					{
						setCompilerMessage(false,true,"Recompile code");
						return false;
					}
				}
				else
				{
					setCompilerMessage(false,true,"Recompile code");
					return false;
				}
			}
		}
	}
	else
	{
		setCompilerMessage(false,true,"Recompile code");
		return false;
	}
	return true;
	
}

function expandedView()
{
	prog_view=true;
	DESCR.setRendMode(1);
}

function compactView()
{
	DESCR.setRendMode(0);
}


//var_display=false;

// no render function - last rendered screen is preserved
// the first time the main menu is loaded - it shows the help screen.
var menu_system=
[
	{id:"project_pro",title:"Project",icon:"project.png",linked_ids:["show_pro","new_proj","run_without_source","advanced_mode_pro"],renderFunc:ImpExp,updateProjNameOnTransition:true},
	{id:"open_save_flow",title:"Open/Save As",icon:"project.png",linked_ids:["show_flow"], renderFunc:ImpExp,updateProjNameOnTransition:true,},
	{id:"new_proj",title:"New Project",icon:"new_file.png",renderFunc:clearProject,updateProjNameOnTransition:true,},
	{id:"show_pro",title:"Edit Code",icon:"edit_code.png",linked_ids:["run_pro","debug_pro","print_pro","io_config","hmi","project_pro","set_title","about_pro"],renderFunc:ProgView,updateProjNameOnTransition:true,updateProgViewOnTransition:true,},
	{id:"show_pro_menu_only",title:"Edit Code",icon:"edit_code.png",linked_ids:["run_pro","debug_pro","print_pro","io_config","hmi","project_pro","set_title","about_pro"],updateProjNameOnTransition:true,updateProgViewOnTransition:true,},
	{id:"debug_pro",title:"Debug",icon:"debug.png",linked_ids:["show_pro","hmi","halt","step","continue","modif_vars"], renderFunc:ARGEE_Debug,updateProjNameOnTransition:false,},
	{id:"modif_vars",title:"Modify Vars",icon:"modify_vars.png",linked_ids:["finish_var_modif"], renderFunc:DEB.MOD_Vars,updateProjNameOnTransition:true,},
	{id:"finish_var_modif",title:"Finish Modifications",icon:"finish_modif_vars.png",linked_ids:["show_pro","hmi","halt","step","continue","modif_vars"], renderFunc:DEB.MOD_Finish,updateProjNameOnTransition:true,},
	{id:"run_pro",title:"Run", icon:"run.png",renderFunc:runARGEE,updateProjNameOnTransition:false,},
	{id:"run_without_source",title:"Run Without Source",icon:"run_without_source.png", renderFunc:runARGEE_without_source,updateProjNameOnTransition:true,},
	{id:"advanced_mode_pro",title:"ARGEE PRO Advanced Mode",icon:"advanced_mode.png", renderFunc:setAdvancedEditingMode,updateProjNameOnTransition:true,},
	{id:"print_pro",title:"Print",icon:"print.png", renderFunc:DESCR.dispPrintPreview,updateProjNameOnTransition:true,},
	{id:"set_title",title:"Set Title",icon:"title.png", renderFunc:setProjectName,updateProjNameOnTransition:true,},
	{id:"halt",title:"Halt",icon:"halt.png", renderFunc:DEB.BREAK_halt,updateProjNameOnTransition:false,},
	{id:"step",title:"Step",icon:"step.png", renderFunc:DEB.BREAK_step,updateProjNameOnTransition:false,},
	{id:"continue",title:"Continue",icon:"resume.png", renderFunc:DEB.BREAK_continue,updateProjNameOnTransition:false,},
	{id:"hmi",title:"HMI",icon:"hmi.png",linked_ids:["show_pro","debug_pro"], renderFunc:ARGEE_HMI,updateProjNameOnTransition:true,},
	{id:"show_flow",title:"Flowchart",icon:"edit_code.png",linked_ids:["run_flow","debug_flow","open_save_flow","new_proj","convert_to_argee_pro","set_title","about_flow"], renderFunc:FLOW.showFlowchart,updateProjNameOnTransition:true,},
	{id:"show_flow_menu_only",title:"Flowchart",icon:"edit_code.png",linked_ids:["run_flow","debug_flow","open_save_flow","new_proj","convert_to_argee_pro","set_title","about_flow"],updateProjNameOnTransition:true,},
	{id:"convert_to_argee_pro",title:"Convert to ARGEE PRO",icon:"argee_pro.png", renderFunc:FLOW.convertToArgee,updateProjNameOnTransition:true,},
	{id:"about_pro",title:"About",icon:"about.png", linked_ids:["show_pro"],  renderFunc:aboutPage,updateProjNameOnTransition:true,},
	{id:"about_flow",title:"About", icon:"about.png",tablelinked_idst_elems:["show_flow"], renderFunc:aboutPage,updateProjNameOnTransition:true,},
	{id:"io_config",title:"IO Config", icon:"io_settings.png",linked_ids:["show_pro"], renderFunc:IO_CONF.renderParamConfigScreen,updateProjNameOnTransition:true,},
	{id:"run_flow",title:"Run", icon:"run.png",renderFunc:FLOW.runFlowchart,updateProjNameOnTransition:true,},
	{id:"debug_flow",title:"Debug", icon:"debug.png",linked_ids:["show_flow"],renderFunc:FLOW.testFlowchart,updateProjNameOnTransition:true,},
];


function preProcessMenu()
{
	var i,j,k;
	
	for(i=0;i<menu_system.length;i++)
	{
		if (menu_system[i].linked_ids!=undefined)
		{
			menu_system[i].linked_id_num=[];
			for(j=0;j<menu_system[i].linked_ids.length;j++)
			{
				var ind=-1;
				for(k=0;k<menu_system.length;k++)
				{
					if (menu_system[i].linked_ids[j]==menu_system[k].id)
					{
						ind=k;
						break;
					}
				}
				if (ind==-1)
				{
					alert("error in the menu stturcture");
				}
				menu_system[i].linked_id_num[j]=ind;
			}
		}
	}
}



function Import()
{
	
	

	var code=window.document.getElementById("imp_id").value;
	var basic_mode_copy=DESCR.getBasicMode();
	var ret=ARGEE_import.import_proj(code,true,false,false);
	if (ret!=null)
	{
		/*var glob=ARGEE_nst_parse.parse(code);
		ARGEE_nst_process.collapseVarSegmLists(glob);
		ARGEE_nst_parse.getStringFromAST(glob);
		*/
		adjustMenuScreen(1);
		clearCompilerMessage();
		ARGEE_nst_debug.StopDebug();
		DESCR.renderDefaultView(true);
		renderMenu("show_pro");
		return true;
	}
	else
	{
		DESCR.setBasicMode(basic_mode_copy);
		return false;
	}
}

function NST_View()
{
	var st;
	
	adjustMenuScreen(0);
	

	
	st=ARGEE_pre_comp.preCompile(0);
	var glob=ARGEE_nst_parse.parse(st,true);
	if (glob!=null)
	{
		st=escapeHTML(st);

		prog_div.innerHTML="<code  style=\"font-size:120%;\"  id=\"prog_text\" >"+st+"</code>";
		LRTEditor.initialize(
				document.getElementsByTagName('code')[0],
				['MinimalPlugin', 'UndoPlugin', 'HighlightPlugin'],
				{
					highlightCallback: function(el)
					{ 
						sh_highlightElement(el, sh_languages['pascal']);
						//saveLocal();
					},
				}
			);


	}
	//var res=ARGEE_nst_parse.globals
	
}

function doNothing()
{


}

var abort_ajax=false;

var icon_size="25px";

function renderMenu(id_name,dont_run_render_func)
{
	var i,j;
	var elem;
	elem=this.document.getElementById("nav_inner");
	
    abort_ajax=true;
	GOM.autoRefreshStop();
	console.log("switch menu");
	//if (id_name!="show_pro_menu_only")
	{
		prog_view=false;
	}
	var prog_div=document.getElementById("prog");
	if (prog_div!=null)
	{
		prog_div.style.fontFamily=font_family;
	}
	DESCR.clearBlockSelection();
	
	for(i=0;i<menu_system.length;i++)
	{
		if (menu_system[i].id==id_name)
		{
			if (menu_system[i].renderFunc!=undefined)
			{
				if (menu_system[i].renderFunc()==false)
				{
					return false;
				}
			}
			if ((menu_system[i].updateProgViewOnTransition!=undefined)&&(menu_system[i].updateProgViewOnTransition==true))
			{
				prog_view=true;
			}
			if ((side_by_side==true)&&(menu_system[i].linked_ids!=undefined))
			{
				var nav="";
				// render submenu
				nav+="<table cellspacing='0' cellpadding='0' border='0' table style='border-spacing: 0px;padding:0;margin:0;'><tr>";
				//nav+="<ul id=\"nav_list\">";
				//nav+="<li><p>"+real_DeviceName+"&nbsp<b><u>Menu:</u></b></p></li>";
				for(j=0;j<menu_system[i].linked_ids.length;j++)
				{
					   var func=" renderMenu(\'"+menu_system[i].linked_ids[j]+"\');"
						nav+="<td style='padding-left:40px;'>"
						nav+="<a style='padding:0;margin:0;' href=\"javascript:"+func+"\" onclick=\"return"+func+" \">";
						nav+="<div><table cellspacing='0' cellpadding='0' border='0' style='border-spacing: 0px;padding:0;margin:0;'><tr><td style='padding:0;margin:0;'>"
						
						//nav+="<b>"+menu_system[menu_system[i].linked_id_num[j]].title+"</b>"
						if (sessionStorage.prevCompatibleEnvironment!=undefined)
						{
							nav+="<div style='height:"+icon_size+";'><img src='../../common/"+menu_system[menu_system[i].linked_id_num[j]].icon+"' style='height:"+icon_size+";padding:0;margin:0;'></div>"
						}
						else
						{
							nav+="<div style='height:"+icon_size+";'><img src='common/"+menu_system[menu_system[i].linked_id_num[j]].icon+"' style='height:"+icon_size+";padding:0;margin:0;'></div>"
						}

						nav+="</td></tr>"
						nav+="<tr><td><font style='font-size:100%;padding:0;margin:0;color:black;' >"+menu_system[menu_system[i].linked_id_num[j]].title+"</font></td></tr>";
						nav+="</table>";
						nav+="</div></a>"

						nav+="</td>";
				}
				//nav+="</ul>";
				nav+="</tr></table>";
				elem.innerHTML=nav;
			}
			if (menu_system[i].updateProjNameOnTransition==true)
			{
				updateProjectName();
			}
		}
	}
		
	return false;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Top level menu structure and rendering functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEGIN: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	
//var side_by_side=false;
var side_by_side=true;
var computer_interface=true;


//http://stackoverflow.com/questions/566203/changing-css-values-with-javascript
function css(selector, property, value) 
{
    for (var i=0; i<document.styleSheets.length;i++) {//Loop through all styles
        //Try add rule
        try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
        } catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
    }
}

var requested_ip="";
var device_name_div;
var prj_name_div;
var first_sim_compilation=false;

var sim_ResetAfterNewProj=false;
var sim_ResetAfterImport=false;




var hmi_only_mode=false;
var sim_mode=false;

var standalone_hmi_text;


var prev_var_width=-1;

/*
// need a task whcih periodically checks the width of the "vars" div
function varWidthObserverTask()
{
	if  (prog_view==true)
	{
		var_div1=this.document.getElementById("vars");
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var curr_width=var_div1.offsetWidth;
		var proportion=((curr_width/w)*100);
		var jk=1;
		if ((prev_var_width==-1)||(proportion!=prev_var_width))
		{
			if ((prev_var_width!=-1)&&((proportion<prev_var_width)&&(Math.abs(proportion-prev_var_width)<2)))
			{
				
			}
			else
			{
				left_col_width=proportion;
				adjustMenuScreen(1);
				prev_var_width=proportion;
			}
		}
	}
	else
	{
		prev_var_width=-1;
	}
	
	
}

*/


var page_str="<div id=\"grayout\"> </div>" +
"<div id=\"Overlay_pass\"><p id=\"DlgContent1\"></p></div>" +
"<div id=\"Overlay_help\"><p id=\"DlgContent2\"></p></div>" +
"<div id=\"Overlay\">" +
"  <div>" +
"   <p id=\"DlgContent\">ARGEE Environment</p>" +
"  </div>" +
"</div>" +
"<div id=\"sup_men\"></div><div id=\"vars_context_menu\"></div><div id=\"cont_menu\" style=\"display: none; position: fixed; top: 50%; left:45%; \"></div><div id=\"act_menu\" class=\"box-shadow2 arrow_box\" style=\"display: none; \"></div><div  id=\"navigation\"></div><div id=\"vars\"  style=\"border-right: 2px solid green; position: fixed; top: "+top_pos+"; bottom:0px; overflow-y:auto; -webkit-overflow-scrolling: touch; \"></div><div id=\"prog\" style=\" position: fixed;padding-left:1%; top: "+top_pos+"; bottom:0px; overflow-y:auto; -webkit-overflow-scrolling: touch;\"></div>";


var stored_var_width;
var var_width_val;

function getDipatchingEnvironmentLocation()
{
	var str=window.location.toString();
	str=str.split("/Earlier_Environments/");
	if (str.length!=1)
	{
		str[0]=str[0]+"/Start ARGEE Programming Environment.html";
		return str[0];
	}
	return null;
}
	
			
function testFrame(pg)
{

	var outp;
	var var_div1,nav;
	var i;

	
	if ((getDipatchingEnvironmentLocation()!=null)&&(localStorage.redirectIP==undefined))
	{
		window.location=getDipatchingEnvironmentLocation();
		return;
	}
	
	
	preProcessMenu();
	SIM.sim_InitDeviceStruct();


	document.body.innerHTML=page_str;
	document.body.style.fontFamily=font_family;

	
	invokeCompilation=false;	
	standalone_hmi_text=objToString(standalone_hmi);
	standalone_hmi.initObj();

	//setInterval(varWidthObserverTask,100);

   if (show_warning_on_close==true)
   {
	   window.onbeforeunload = function() 
	   {
		//all you can do is provide a message..
		  return "Do you really want to close the browser?";
	   }
   }

	
	
	
	//var newdiv=.document.createElement("div");
	prog_div=this.document.getElementById("prog");
	cont_menu_div=this.document.getElementById("cont_menu");
	men_div=this.document.getElementById("sup_men");
	var_div1=this.document.getElementById("vars");
	nav=this.document.getElementById("navigation");
	
	stored_var_width=localStorage.ARGEE3_var_width;
	if (stored_var_width!=undefined)
	{
		var_width_val=parseInt(stored_var_width);
		left_col_width=var_width_val;
	}
	
	
	prog_div.style.visibility = 'hidden';
	var_div1.style.visibility = 'hidden';	
	men_div.style.visibility = 'hidden';
	nav.style.visibility = 'hidden';
	var def_ip="192.168.1.200";
	var lat_ip=getLocalStorageLatestIP();
	if (lat_ip!="")
	{
		def_ip=lat_ip;
	}
	
	
	var ip=def_ip;	
	
	if (localStorage.redirectIP!=undefined)
	{
		ip=localStorage.redirectIP;
		delete localStorage.redirectIP;
		selectLocalStoragePlaceholder(ip);
		GOM.setObjNum("IP_ADDRESS",0,GOM.convStringToArr(ip));
		setLocalStorage("def_ip",ip);
		TRANSF.setIP(ip);
		  
		GOM.addAjaxAction(TRANSF.startEnvConn);
		return;
	}
	
	ARGEE_misc_transf_func.DlgShow(pg,ip);
}

/*loadjscssfile("argee_prog_edit.js", "js");
loadjscssfile("argee_var_edit.js", "js");
loadjscssfile("argee_clipboard.js", "js");*/
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
