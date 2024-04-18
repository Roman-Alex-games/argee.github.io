/********************************************************************************
 *
 * Copyright (c) 2013 by TUSA
 *
 ********************************************************************************
 *
 *  Author    : Roman Glistvain
 *
 *
 ********************************************************************************
 *
 *  DESCRIPTION: Programmable Environment ARGEE (Standalone)
 *
 *******************************************************************************/

var ARGEE_Environment_Version=0x01030900;
var exp_ARGEE_Kernel_Version= 0x01030000 


var real_ARGEE_Kernel_Version;
var real_DeviceName=""; 

//var url_prefix="http://192.16.1.200";
//var url_prefix="http://192.168.1.247";
var url_prefix="";

/*var log_data="<br>";

function addToLog(str)
{
	log_data=log_data+str+"<br>";
}
*/
function saveLocal()
{
	localStorage.cond_db=JSON.stringify(cond_db);
	localStorage.var_db=JSON.stringify(var_db);
	localStorage.screens=JSON.stringify(screens);
	localStorage.labels=JSON.stringify(labels);
	localStorage.flowchart=JSON.stringify(flowchart);
	localStorage.editor=JSON.stringify(editor);
}

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
	else
	{
		nav.style.height="6em";
		nav.style.display="block";
		prog_div.style.top="6em";
		vars_div.style.top="6em";
		
		if (side_by_side==true)
		{
		
			var_div=this.document.getElementById("vars");
			prog_div.style.width=(100-left_col_width)+"%";
			var_div.style.width=(left_col_width-1)+"%";
			prog_div.style.left=left_col_width+"%";
			var_div.style.left="5px";
			var_div.style.right=left_col_width+"%";
			vars_div.style.display="block";
		}
	}
}
		
function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
}		
		

var invocation = new XMLHttpRequest();
var url = url_prefix+'/prog';
var body;

var frag_size=32;

var toTrans;
var curr_frag;


var ajax_actions_queue=[];
var activeAjaxAction=null;

var ajax_vars_loaded=false;


function addAjaxAction(fn)
{
	var i;
	for(i=0;i<ajax_actions_queue.length;i++)
	{
		if (ajax_actions_queue[i]==fn)
		{
			//console.log("Already present in the queue "+ fn);
			return;
		}
	}
	ajax_actions_queue[ajax_actions_queue.length]=fn;	
}

var tx_terminator=0;

// timer based task
function ajaxTimerTask()
{
	var now = (new Date()).getTime();
	//console.log("AjaxTimer at: "+now);
	if ((activeAjaxAction==null)&&(ajax_actions_queue.length>0))
	{
		activeAjaxAction=ajax_actions_queue[0];
		ajax_actions_queue.splice(0,1);
		tx_terminator=0;
		activeAjaxAction();
	}
}

var ajaxTimer;

function startAjaxTimer()
{
	ajaxTimer=setInterval(ajaxTimerTask,100);
}

function stopAjaxTimer()
{
	clearInterval(ajaxTimer);	
}

function UploadProg()
{
	 if(invocation)
    {
      invocation.open('POST', url_prefix+'/pg', true);
		invocation.onreadystatechange=function()
		{
			console.log("upload stat "+invocation.readyState+" "+invocation.status);
			if ((invocation.readyState==4)&&(invocation.status==200))
			{
				UploadProgText();
			}
		} 
		var len=prog_code.length;
		var arr=new ArrayBuffer(3+len);
		var dataView=new DataView(arr);
		var i;
		dataView.setUint8(0,2); // code = upload proc code
		dataView.setUint16(1,len,true); // length of request =len
		for(i=0;i<len;i++)
		{
			dataView.setUint8(3+i,prog_code[i]);
		}
      invocation.send(arr);
		invocation.timeout=4000;
		invocation.ontimeout = function ()
		{
				setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
				activeAjaxAction=null;
				return;
		}
		invocation.onerror=function()
		{
				setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
				activeAjaxAction=null;
				return;
		}
    }
}



function UploadProgText()
{
    if(invocation)
    {
      invocation.open('POST', url_prefix+'/pg', true);
		invocation.onreadystatechange=function()
		{
			if ((invocation.readyState==4)&&(invocation.status==200))
			{
			
				comp_res.innerHTML="Status: Uploaded";
				activeAjaxAction=null;
					
				eraseProject();
				runProject();
				return;
			}
		} 
		
		var len=combined_prj_byte_arr.length;
		var arr=new ArrayBuffer(3+len);
		var dataView=new DataView(arr);
		var i;
		dataView.setUint8(0,3); // code = upload proc test
		dataView.setUint16(1,len,true); // length of request =len
		for(i=0;i<len;i++)
		{
			dataView.setUint8(3+i,combined_prj_byte_arr[i]);
		}
      invocation.send(arr);
		invocation.timeout=4000;
		invocation.ontimeout = function ()
		{
				setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
				activeAjaxAction=null;
				return;
		}
		invocation.onerror=function()
		{
				setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
				activeAjaxAction=null;
				return;
		}
    }
}

var submit_var_list=[];
var curr_subm_var=0;

function sendSubmitList()
{
	if(invocation)
    {
      invocation.open('POST', url_prefix+'/pg', true);
		invocation.onreadystatechange=function()
		{
			if ((invocation.readyState==4)&&(invocation.status==200))
			{
				activeAjaxAction=null;
				return;
			}
		} 
		
		var len=submit_var_list.length;
		var arr=new ArrayBuffer(3+8*len);
		var dataView=new DataView(arr);
		var i;
		dataView.setUint8(0,6); // code = submit variable list
		dataView.setUint16(1,8*len,true); // length of request =len
		for(i=0;i<len;i++)
		{
			dataView.setUint32(3+8*i,submit_var_list[i].addr,true);
			dataView.setUint32(3+(8*i)+4,submit_var_list[i].val,true);
		}
      invocation.send(arr);
    }
}

function execRun()
{
  if(invocation)
    {
      invocation.open('POST', url_prefix+'/pg', true);
		invocation.onreadystatechange=function()
		{
			if ((invocation.readyState==4)&&(invocation.status==200))
			{
				if (cond_db!=0)
				{
					setCompilerMessage(false,false,"<b>Code loaded into the station</b>: <b>ByteCode size:</b> " +prog_code.length + " bytes (<b>out of</b> 4kb).<b>Code Text size:</b> "+combined_prj_str.length+" bytes (<b>out of </b> 32kb). <b>Variable segment size:</b> "+max_var_addr +" bytes(<b>out of </b> 1kb). ");
				}
				else
				{
					setCompilerMessage(false,true,"Empty project loaded - <b>Boot project stopped!!!!</b>");				
				}
				activeAjaxAction=null;
				return;
			}
		}
		comp_res.innerHTML="";
		var arr=new ArrayBuffer(3);
		var dataView=new DataView(arr);
		var i;
		dataView.setUint8(0,5); // code
		dataView.setUint16(1,0,true); // length
		invocation.send(arr);
		invocation.timeout=4000;
		invocation.ontimeout = function ()
		{
				setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
				activeAjaxAction=null;
				return;
		}
		invocation.onerror=function()
		{
				setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
				activeAjaxAction=null;
				return;
		}
    }
}

var var_value_db=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var debugMode=false;
var num_var_iter=0;

var rungs_status=new Array();

function getVarsAjax()
{
	var inv = new XMLHttpRequest();
	var now = (new Date()).getTime();
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	inv.onreadystatechange=function()
	{
		var i;
		var now = (new Date()).getTime();
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		//addToLog("at "+now+" getVarsAjax "+this.readyState+" "+this.status+" "+this.responseText.length);
		if ((this.readyState==4)&&(this.status==200))
		{
			
			if (monitoring_mode==false)
			{
				num_var_iter=0;
				activeAjaxAction=null;
				return;
			}
			var arr=this.response; // arrayBuffer;
			var dataView=new DataView(arr);
			
			if (arr.byteLength==0)
			{
				// no executable code
				num_var_iter=0;
				activeAjaxAction=null;
				setCompilerMessage(false,true,"Error:  <b>  Code is not loaded or the program is empty</b> --- <b>Test can not be performed!!!!</b>");
				return;
			}
			
            for(i=0;i<20;i++)
            {
                var data=dataView.getUint8(i);
                for(j=0;j<8;j++)
                {
                    if ((data&(1<<j))!=0)
                    {
                        rungs_status[8*i+j]=true;
                    }
                    else
                    {
                        rungs_status[8*i+j]=false;
                    }
                }
            }
			
			for (var i = 20, len = arr.byteLength; i < len; i+=4) 
			{
				var_value_db[(i-20)/4]=dataView.getUint32(i,true);
			}
			
			getIO_PLC_VarsAjax();
			return;
		}
	}
	//comp_res.innerHTML="";
	var arr=new ArrayBuffer(3);
	var dataView=new DataView(arr);
	var i;
	dataView.setUint8(0,4); // code 
	dataView.setUint16(1,0,true); // length of request =0
	inv.send(arr);

}

var local_io_db_sects=
{
	input:0,
	output:1,
	diag:3,
}

var plc_sects=
{
	input:0,
	output:1,
}


var local_io_db=[];
var plc_io_db=[];


function getIO_PLC_VarsAjax()
{
	var inv = new XMLHttpRequest();
	var now = (new Date()).getTime();
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	inv.onreadystatechange=function()
	{
		var i,j,k;
		var now = (new Date()).getTime();
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		//addToLog("at "+now+" getVarsAjax "+this.readyState+" "+this.status+" "+this.responseText.length);
		if ((this.readyState==4)&&(this.status==200))
		{
			
			if (monitoring_mode==false)
			{
				num_var_iter=0;
				activeAjaxAction=null;
				return;
			}
			
			var arr=this.response; // arrayBuffer;
			var dataView=new DataView(arr);
			
			
			var offset=0;
			var num_slices=dataView.getUint8(offset);
			offset++;
			for(i=0;i<num_slices;i++)
			{
				local_io_db[i]=new Array();	
				for(j=0;j<3;j++)
				{
					var num_bytes;
					
					num_bytes=dataView.getUint8(offset); offset++;
					local_io_db[i][j]=new Uint8Array(num_bytes);
					for(k=0;k<num_bytes;k++)
					{
						local_io_db[i][j][k]=dataView.getUint8(offset); offset++;
					}
				}
			}
			// update PLC database
			
			for(i=0;i<2;i++)
			{
				plc_io_db[i]=new Uint16Array(128);
				for(j=0;j<128;j++)
				{
					plc_io_db[i][j]=dataView.getUint16(offset,true); offset+=2;
				}
			}
			
			ajax_vars_loaded=true;
			activeAjaxAction=null;
			if (debugMode==true)
			{
				if (flowchart_debug_mode==true)
				{
					comp_res.innerHTML="";
					debugFlowchart();
				}
				else
				{
					comp_res.innerHTML="";				
					redrawVars(false);
                    refreshProg(false);
				}
			}
			else
			{
				HMI_redrawCurrentScreen();
				HMI_redrawScreenList();
			}
			var now = (new Date()).getTime();
			//console.log("getVarsAjax at: "+now);
			num_var_iter++;

			myTimer=setInterval(refreshTimer,100);
			return;
		}
	}
	//comp_res.innerHTML="";
	var arr=new ArrayBuffer(3);
	var dataView=new DataView(arr);
	var i;
	dataView.setUint8(0,7); // code 
	dataView.setUint16(1,0,true); // length of request =0
	inv.send(arr);

}

function getVersionString(num)
{
	var str="";
	var i;
	str+=getRev(num,3);
	for(i=2;i>=0;i--)
	{
		str+=".";
		str+=getRev(num,i);
	}
	return str;
}


var stationConfig=[];
var stationIO_Config=[];

function ToInteger(x) 
{
        x = Number(x);
        return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function modulo(a, b) 
{
   return a - Math.floor(a/b)*b;
}
function ToUint32(x) 
{
   return modulo(ToInteger(x), Math.pow(2, 32));
}

function getRev(num,byte_num)
{
	var shift=byte_num*8;;
	var rev=(num>>shift)&0xff;
	return rev;
}

/*var obj_list=
[ {obj_id:0,inst:
*/

function Download_ARGEE_KernelVersion()
{
	var inv = new XMLHttpRequest();
	var now = (new Date()).getTime();
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	//console.log("at "+now+" Variable Get triggered");
	inv.timeout=1000;
	inv.ontimeout = function ()
	{
		prog_div.style.visibility = 'visible';
		prog_div.innerHTML="<h1>Can not connect to the device: "+url_prefix+"</h1>"; 
		return;
	}
	inv.onreadystatechange=function()
	{
		var i,j;
		var tmp;
		var now = (new Date()).getTime();
		//addToLog("at "+now+" DownloadStationConfig "+this.readyState+" "+this.status+" "+this.responseText.length);
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		if ((this.readyState==4)&&(this.status==200))
		{
		
			var arr=this.response; // arrayBuffer;
			var dataView=new DataView(arr);
			var version=dataView.getUint32(4,true);
			real_ARGEE_Kernel_Version=version;
			activeAjaxAction=null;
			var now = (new Date()).getTime();
			if ((version&0xffff0000)!=exp_ARGEE_Kernel_Version)
			{
				prog_div.style.visibility = 'visible';
					
				prog_div.innerHTML="<h1>Incompatible ARGEE Kernel Version "+ getVersionString(version)+" with the environment version "+getVersionString(ARGEE_Environment_Version)+"<br> Try a different environment version or upgrade the ARGEE firmware in the device.</h1>"; 
			}
			else
			{
				//continueInit();
				Download_DeviceName();
			}
			//console.log("getVarsAjax at: "+now);
			return;
		}
	}
	var arr=new ArrayBuffer(15);
	var dataView=new DataView(arr);
	var i;
	var offset=0;
	dataView.setUint8(offset,8); offset++; // code = GOM Access
	dataView.setUint16(offset,12,true);  offset+=2; // length of request =12
	dataView.setUint32(offset,0,true); offset+=4; // read request
	dataView.setUint32(offset,0x00490000,true); offset+=4; // ARGEE UID
	dataView.setUint32(offset,1,true); offset+=4; // ARGEE Inst
	
	inv.send(arr);
}



function Download_DeviceName()
{
	var inv = new XMLHttpRequest();
	var now = (new Date()).getTime();
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	//console.log("at "+now+" Variable Get triggered");
	inv.onreadystatechange=function()
	{
		var i,j;
		var tmp;
		var now = (new Date()).getTime();
		//addToLog("at "+now+" DownloadStationConfig "+this.readyState+" "+this.status+" "+this.responseText.length);
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		if ((this.readyState==4)&&(this.status==200))
		{
		
			var arr=this.response; // arrayBuffer;
			var dataView=new DataView(arr);
			var len=dataView.getUint32(0,true);
			for(i=0;i<len;i++)
			{
				if (dataView.getUint8(i+4)==0)
				{
					break;
				}
				real_DeviceName+=String.fromCharCode(dataView.getUint8(i+4));
			}
			document.title = "ARGEE on "+real_DeviceName +"("+requested_ip+")"; 
			continueInit();
			//console.log("getVarsAjax at: "+now);
			return;
		}
	}
	var arr=new ArrayBuffer(15);
	var dataView=new DataView(arr);
	var i;
	var offset=0;
	dataView.setUint8(offset,8); offset++; // code = GOM Access
	dataView.setUint16(offset,12,true);  offset+=2; // length of request =12
	dataView.setUint32(offset,0,true); offset+=4; // read request
	dataView.setUint32(offset,0x00060003,true); offset+=4; //  UID DHCPCL_DEVICE_NAME
	dataView.setUint32(offset,0,true); offset+=4; // DHCPCL_DEVICE_NAME Inst
	
	inv.send(arr);
}


function DownloadStationConfig()
{
	var inv = new XMLHttpRequest();
	var now = (new Date()).getTime();
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	inv.timeout=1000;
	inv.ontimeout = function ()
	{
		setCompilerMessage(false,true,"<u><b>Failure to Run the code!!!</b></u>");
		activeAjaxAction=null;
		return;
	}
	
	//console.log("at "+now+" Variable Get triggered");
	inv.onreadystatechange=function()
	{
		var i,j;
		var tmp;
		var now = (new Date()).getTime();
		//addToLog("at "+now+" DownloadStationConfig "+this.readyState+" "+this.status+" "+this.responseText.length);
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		if ((this.readyState==4)&&(this.status==200))
		{
		
			var arr=this.response; // arrayBuffer;
			var dataView=new DataView(arr);
			var len=dataView.getUint32(0,true);
			var offset=4;
			for(var i=0;i<len;i++)
			{
				stationConfig[i]=dataView.getUint32(i*4+4,true);
				offset+=4;
			}
			for(i=0;i<(len);i++)
			{
				for(j=0;j<slices.length;j++)
				{
					if (slices[j].id==stationConfig[i])
					{
						IO[i]=slices[j].name;
						break;
					}
				}
			}
			stationIO_Config[0]=[];
			for(i=1;i<len;i++)
			{
				tmp=dataView.getUint32(offset,true);
				offset+=4;
				stationIO_Config[i]=new Array();
				for(j=0;j<tmp;j++)
				{
					stationIO_Config[i][j]=dataView.getUint8(offset+j);
				}
				offset+=tmp;
			}
			
			if (invokeCompilation==false)
			{
				if (editor=="flowchart")
				{	
					renderMenu("Flowchart");			
					showFlowchart();
				}
				else
				{
					setupLabelPointers();	
					redrawVars(true);
					refreshProg(true);
					updateContextMenu();
				}
			}
			else
			{
				compileProject1(false);
			}

			
			activeAjaxAction=null;
			var now = (new Date()).getTime();
			//console.log("getVarsAjax at: "+now);
			return;
		}
	}
	comp_res.innerHTML="";
	var arr=new ArrayBuffer(3);
	var dataView=new DataView(arr);
	var i;
	dataView.setUint8(0,1); // code = download station config=0
	dataView.setUint16(1,0,true); // length of request =0
	inv.send(arr);
}


function DownloadProgText()
{
	var inv = new XMLHttpRequest();
	var now = (new Date()).getTime();
	//inv.open('POST', url_prefix+'/get_prog_text', true);
	inv.open('POST', url_prefix+'/pg', true);
	//inv.setRequestHeader('Host', "");
	//inv.setRequestHeader('Connection', "");
	//inv.overrideMimeType('text/plain; charset=x-user-defined');
	//console.log("at "+now+" Variable Get triggered");
	inv.onreadystatechange=function()
	{
		var i;
		var now = (new Date()).getTime();
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		//addToLog(var now = (new Date()).getTime(););
		if ((this.readyState==4)&&(this.status==200))
		{
			var binStr = this.responseText;
			var arr=[];
			
			
			comp_res.innerHTML="Status: Downloaded.";
			
			/*for(i=0;i<var_value_db.length;i++)
			{
				comp_res.innerHTML+=var_value_db[i]+",";
			}*/
			//invocation.abort();
			//console.log("at "+now+" Get AJAX transfer complete");

			if (binStr.length==0)	
			{
				// nothing loaded
				initProj(true);
			}
			else
			{
				combined_prj=JSON.parse(binStr);
				cond_db=combined_prj.cond;	
				var_db=combined_prj.vars;
				screens=combined_prj.scr;
				labels=combined_prj.labels;
				flowchart=combined_prj.flowchart;
				editor=combined_prj.editor;
			}
			
			activeAjaxAction=null;
			var now = (new Date()).getTime();
			DownloadStationConfig();
			//console.log("getVarsAjax at: "+now);
			return;
		}
	}
	comp_res.innerHTML="";
	var arr=new ArrayBuffer(3);
	var dataView=new DataView(arr);
	var i;
	dataView.setUint8(0,0); // code = download program text=0
	dataView.setUint16(1,0,true); // length of request =0
	/*for(i=3;i<23;i++)
	{
		dataView.setUint8(i,i);
	}*/
	inv.send(arr);
}


//function submitNewVarValue

function insert_val_prog_scr1(val, elem,select_start,act_elem_type)
{
	var content=elem.value;
	var pos=select_start;
	var str=new String(content);
	var str1=str.slice(0,pos);
	var str2=str.slice(pos,str.length);
	var tp,cnd_num,act_num,act_elem_num;
	elem.value=new String().concat(str1,val,str2);
	elem.setSelectionRange(pos+val.length,pos+val.length,0);
	// need to decode element ID and call appropriate onChange function
	var elem_type=elem.id;
	var type=act_elem_type;
	//console.log(type);
	
	if (type==expr_types.cond)
	{
		tp=0;
		cnd_num=parseInt(elem_type.substr(4));
		changeCondElem(elem_type,cnd_num);
	}
	else if (type==expr_types.act)
	{
		tp=1;
		var ind,ind1;
		var mod=elem_type;
		var substr;
		var extr;
		// cnd_num
		ind=mod.search("_");
		substr=mod.slice(ind+1);
		ind1=substr.search("_");
		substr=mod.slice(ind+1,ind+1+ind1);
		cnd_num=parseInt(substr);
		mod=mod.slice(ind+1+ind1);
		// get act num
		ind=mod.search("_");
		substr=mod.slice(ind+1);
		ind1=substr.search("_");
		substr=mod.slice(ind+1,ind+1+ind1);
		act_num=parseInt(substr);
		mod=mod.slice(ind+1+ind1+1);
		// get elem_num
		act_elem_num=parseInt(mod);
		changeActionElem(elem_type,cnd_num,act_num,act_elem_num);
	}
	else if (type==expr_types.transfer_var)
	{
		var outp=extractNumbersFromID(elem_type);
		varChange(elem_type,var_type.m2m,outp[0],2,outp[1]); // elem= var_list
	}
	else if ((type==expr_types.hmi_var)||(type==expr_types.hmi_expr))
	{
		var outp=extractNumbersFromID(elem_type);
		changeSectElem(elem_type,outp[0],outp[1],outp[2],outp[3],outp[4]);
	}
}


function insert_val_prog_scr(val)
{
	var content=this.document.activeElement.value;
	var pos=this.document.activeElement.selectionStart;
	var str=new String(content);
	var str1=str.slice(0,pos);
	var str2=str.slice(pos,str.length);
	var tp,cnd_num,act_num,act_elem_num;
	this.document.activeElement.value=new String().concat(str1,val,str2);
	this.document.activeElement.setSelectionRange(pos+val.length,pos+val.length,0);
	// need to decode element ID and call appropriate onChange function
	var elem_type=this.document.activeElement.id;
	var type=elem_type.substr(0,3);
	if (type=="cnd")
	{
		tp=0;
		cnd_num=parseInt(elem_type.substr(4));
		changeCondElem(elem_type,cnd_num);
	}
	else
	{
		tp=1;
		var ind,ind1;
		var mod=elem_type;
		var substr;
		var extr;
		// cnd_num
		ind=mod.search("_");
		substr=mod.slice(ind+1);
		ind1=substr.search("_");
		substr=mod.slice(ind+1,ind+1+ind1);
		cnd_num=parseInt(substr);
		mod=mod.slice(ind+1+ind1);
		// get act num
		ind=mod.search("_");
		substr=mod.slice(ind+1);
		ind1=substr.search("_");
		substr=mod.slice(ind+1,ind+1+ind1);
		act_num=parseInt(substr);
		mod=mod.slice(ind+1+ind1+1);
		// get elem_num
		act_elem_num=parseInt(mod);
		changeActionElem(elem_type,cnd_num,act_num,act_elem_num);
	}
}

function extractNumbersFromID(id)
{
	var s1,s2,s3,str;
	var outp=[];
	str=id;
	while(1)
	{
		s1=str.search("_");
		s2=str.slice(s1+1);
		s3=s2.search("_");
		if (s3!=-1)
		{
			s2=str.slice(s1+1,s1+1+s3);
			outp[outp.length]=parseInt(s2);
			str=str.slice(s1+1+s3);
		}
		else
		{
			outp[outp.length]=parseInt(s2);	
			break;
		}
	}
	return outp;
}

function insert_val_hmi_screen(val)
{
	var content=this.document.activeElement.value;
	var pos=this.document.activeElement.selectionStart;
	var str=new String(content);
	var str1=str.slice(0,pos);
	var str2=str.slice(pos,str.length);
	var tp,cnd_num,act_num,act_elem_num;
	this.document.activeElement.value=new String().concat(str1,val,str2);
	this.document.activeElement.setSelectionRange(pos+val.length,pos+val.length,0);
	// need to decode element ID and call appropriate onChange function
	var elem_type=this.document.activeElement.id;
	var outp=extractNumbersFromID(elem_type);
	changeSectElem(elem_type,outp[0],outp[1],outp[2],outp[3],outp[4]);
}

function insert_val_transfer_var(val)
{
	var content=this.document.activeElement.value;
	var pos=this.document.activeElement.selectionStart;
	var str=new String(content);
	var str1=str.slice(0,pos);
	var str2=str.slice(pos,str.length);
	var tp,cnd_num,act_num,act_elem_num;
	this.document.activeElement.value=new String().concat(str1,val,str2);
	this.document.activeElement.setSelectionRange(pos+val.length,pos+val.length,0);
	// need to decode element ID and call appropriate onChange function
	var elem_type=this.document.activeElement.id;
	var outp=extractNumbersFromID(elem_type);
	varChange(elem_type,var_type.m2m,outp[0],2,outp[1]); // elem= var_list
}


var sect_type=
{
	input:0,
	output:1,
	diag:2,
	param:3
};



var sect_names=["Input","Output","Diagnostics","Parameters"];

var slices=
[
	{name:"8XSG-PD",
	 id: 0x1574400,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false}
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false}
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Short circuit channel 0", offset:0, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:1, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:2, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:4, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:5, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:6, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:7, length:1, signed :false}
		 ]
	    }
	 ]
	},
	{name:"8XSG-P",
	 id: 0x2574400,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false}
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false}
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Short circuit channel 0", offset:0, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:1, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:2, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:4, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:5, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:6, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:7, length:1, signed :false}
		 ]
	    }
	 ]
	},
	{name:"16XSG",
	 id: 0x80695500,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
			{name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false},
			{name:"channel 8", offset:8, length:1, signed :false},
			{name:"channel 9", offset:9, length:1, signed :false},
			{name:"channel 10", offset:10, length:1, signed :false},
			{name:"channel 11", offset:11, length:1, signed :false},
			{name:"channel 12", offset:12, length:1, signed :false},
			{name:"channel 13", offset:13, length:1, signed :false},
			{name:"channel 14", offset:14, length:1, signed :false},
			{name:"channel 15", offset:15, length:1, signed :false}
			
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false},
			{name:"channel 8", offset:8, length:1, signed :false},
			{name:"channel 9", offset:9, length:1, signed :false},
			{name:"channel 10", offset:10, length:1, signed :false},
			{name:"channel 11", offset:11, length:1, signed :false},
			{name:"channel 12", offset:12, length:1, signed :false},
			{name:"channel 13", offset:13, length:1, signed :false},
			{name:"channel 14", offset:14, length:1, signed :false},
			{name:"channel 15", offset:15, length:1, signed :false}
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 0-1", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 2-3", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 4-5", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 6-7", offset:3, length:1, signed :false},
			{name:"Error sensor Channels 8-9", offset:4, length:1, signed :false},
			{name:"Error sensor Channels 10-11", offset:5, length:1, signed :false},
			{name:"Error sensor Channels 12-13", offset:6, length:1, signed :false},
			{name:"Error sensor Channels 14-15", offset:7, length:1, signed :false},
		   {name:"Short circuit channel 0", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:15, length:1, signed :false},
			{name:"Short circuit channel 8", offset:16, length:1, signed :false},
			{name:"Short circuit channel 9", offset:17, length:1, signed :false},
			{name:"Short circuit channel 10", offset:18, length:1, signed :false},
			{name:"Short circuit channel 11", offset:19, length:1, signed :false},
			{name:"Short circuit channel 12", offset:20, length:1, signed :false},
			{name:"Short circuit channel 13", offset:21, length:1, signed :false},
			{name:"Short circuit channel 14", offset:22, length:1, signed :false},
			{name:"Short circuit channel 15", offset:23, length:1, signed :false}

		 ]
	    }
	 ]
	},

	{name:"16DXP",
	 id: 0x81695500,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
			{name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
			{name:"channel 9", offset:8, length:1, signed :false},
			{name:"channel 10", offset:9, length:1, signed :false},
			{name:"channel 11", offset:10, length:1, signed :false},
			{name:"channel 12", offset:11, length:1, signed :false},
			{name:"channel 13", offset:12, length:1, signed :false},
			{name:"channel 14", offset:13, length:1, signed :false},
			{name:"channel 15", offset:14, length:1, signed :false},
			{name:"channel 16", offset:15, length:1, signed :false}
			
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
			{name:"channel 9", offset:8, length:1, signed :false},
			{name:"channel 10", offset:9, length:1, signed :false},
			{name:"channel 11", offset:10, length:1, signed :false},
			{name:"channel 12", offset:11, length:1, signed :false},
			{name:"channel 13", offset:12, length:1, signed :false},
			{name:"channel 14", offset:13, length:1, signed :false},
			{name:"channel 15", offset:14, length:1, signed :false},
			{name:"channel 16", offset:15, length:1, signed :false}
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 1-2", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 3-4", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 5-6", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 7-8", offset:3, length:1, signed :false},
			{name:"Error sensor Channels 9-10", offset:4, length:1, signed :false},
			{name:"Error sensor Channels 11-12", offset:5, length:1, signed :false},
			{name:"Error sensor Channels 13-14", offset:6, length:1, signed :false},
			{name:"Error sensor Channels 15-16", offset:7, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 8", offset:15, length:1, signed :false},
			{name:"Short circuit channel 9", offset:16, length:1, signed :false},
			{name:"Short circuit channel 10", offset:17, length:1, signed :false},
			{name:"Short circuit channel 11", offset:18, length:1, signed :false},
			{name:"Short circuit channel 12", offset:19, length:1, signed :false},
			{name:"Short circuit channel 13", offset:20, length:1, signed :false},
			{name:"Short circuit channel 14", offset:21, length:1, signed :false},
			{name:"Short circuit channel 15", offset:22, length:1, signed :false},
			{name:"Short circuit channel 16", offset:23, length:1, signed :false}

		 ]
	    }
	 ]
	},
	
	
	// TBEN
	{name:"16DXP",
	 id: 0x816D5528,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
			{name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
			{name:"channel 9", offset:8, length:1, signed :false},
			{name:"channel 10", offset:9, length:1, signed :false},
			{name:"channel 11", offset:10, length:1, signed :false},
			{name:"channel 12", offset:11, length:1, signed :false},
			{name:"channel 13", offset:12, length:1, signed :false},
			{name:"channel 14", offset:13, length:1, signed :false},
			{name:"channel 15", offset:14, length:1, signed :false},
			{name:"channel 16", offset:15, length:1, signed :false}
			
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
			{name:"channel 9", offset:8, length:1, signed :false},
			{name:"channel 10", offset:9, length:1, signed :false},
			{name:"channel 11", offset:10, length:1, signed :false},
			{name:"channel 12", offset:11, length:1, signed :false},
			{name:"channel 13", offset:12, length:1, signed :false},
			{name:"channel 14", offset:13, length:1, signed :false},
			{name:"channel 15", offset:14, length:1, signed :false},
			{name:"channel 16", offset:15, length:1, signed :false}
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 1-2", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 3-4", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 5-6", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 7-8", offset:3, length:1, signed :false},
			{name:"Error sensor Channels 9-10", offset:4, length:1, signed :false},
			{name:"Error sensor Channels 11-12", offset:5, length:1, signed :false},
			{name:"Error sensor Channels 13-14", offset:6, length:1, signed :false},
			{name:"Error sensor Channels 15-16", offset:7, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 8", offset:15, length:1, signed :false},
			{name:"Short circuit channel 9", offset:16, length:1, signed :false},
			{name:"Short circuit channel 10", offset:17, length:1, signed :false},
			{name:"Short circuit channel 11", offset:18, length:1, signed :false},
			{name:"Short circuit channel 12", offset:19, length:1, signed :false},
			{name:"Short circuit channel 13", offset:20, length:1, signed :false},
			{name:"Short circuit channel 14", offset:21, length:1, signed :false},
			{name:"Short circuit channel 15", offset:22, length:1, signed :false},
			{name:"Short circuit channel 16", offset:23, length:1, signed :false}

		 ]
	    }
	 ]
	},
	
	{name:"IOM88",
	 id: 0x60574400,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
			{name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false},
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false},
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 0-1", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 2-3", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 4-5", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 6-7", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 0", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:15, length:1, signed :false},
		 ]
	    }
	 ]
	},

	{name:"8DIP-8DOP",
	 id: 0x615B4428,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
			{name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 9", offset:0, length:1, signed :false},
		   {name:"channel 10", offset:1, length:1, signed :false},
		   {name:"channel 11", offset:2, length:1, signed :false},
		   {name:"channel 12", offset:3, length:1, signed :false},
		   {name:"channel 13", offset:4, length:1, signed :false},
		   {name:"channel 14", offset:5, length:1, signed :false},
		   {name:"channel 15", offset:6, length:1, signed :false},
		   {name:"channel 16", offset:7, length:1, signed :false},
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 1-2", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 3-4", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 5-6", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 7-8", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 9", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 10", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 11", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 12", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 13", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 14", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 15", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 16", offset:15, length:1, signed :false},
		 ]
	    }
	 ]
	},
	
	{name:"4DIP-4DXP",
	 id: 0x41564328,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
			{name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Vout1 overcurrent", offset:0, length:1, signed :false},
		   {name:"Output signal overcurrent channel 1", offset:8, length:1, signed :false},
		   {name:"Output signal overcurrent channel 2", offset:9, length:1, signed :false},
		   {name:"Output signal overcurrent channel 3", offset:10, length:1, signed :false},
		   {name:"Output signal overcurrent channel 4", offset:11, length:1, signed :false},
		   {name:"Output signal overcurrent channel 5", offset:12, length:1, signed :false},
		   {name:"Output signal overcurrent channel 6", offset:13, length:1, signed :false},
		   {name:"Output signal overcurrent channel 7", offset:14, length:1, signed :false},
		   {name:"Output signal overcurrent channel 8", offset:15, length:1, signed :false},
		 ]
	    }
	 ]
	},
	

	
	{name:"OM16",
	 id: 0x80670500,
	 sections:
	 [
	 
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false},
			{name:"channel 8", offset:8, length:1, signed :false},
			{name:"channel 9", offset:9, length:1, signed :false},
			{name:"channel 10", offset:10, length:1, signed :false},
			{name:"channel 11", offset:11, length:1, signed :false},
			{name:"channel 12", offset:12, length:1, signed :false},
			{name:"channel 13", offset:13, length:1, signed :false},
			{name:"channel 14", offset:14, length:1, signed :false},
			{name:"channel 15", offset:15, length:1, signed :false}
		 ]
     },
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Short circuit channel 0", offset:0, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:1, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:2, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:4, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:5, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:6, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:7, length:1, signed :false},
		   {name:"Short circuit channel 8", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 9", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 10", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 11", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 12", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 13", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 14", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 15", offset:15, length:1, signed :false},
		 ]
	    }
	 ]
	},
	{name:"16DOP",
	 id: 0x81670528,
	 sections:
	 [
	 
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
			{name:"channel 9", offset:8, length:1, signed :false},
			{name:"channel 10", offset:9, length:1, signed :false},
			{name:"channel 11", offset:10, length:1, signed :false},
			{name:"channel 12", offset:11, length:1, signed :false},
			{name:"channel 13", offset:12, length:1, signed :false},
			{name:"channel 14", offset:13, length:1, signed :false},
			{name:"channel 15", offset:14, length:1, signed :false},
			{name:"channel 16", offset:15, length:1, signed :false}
		 ]
     },
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Short circuit channel 1", offset:0, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:1, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:2, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:4, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:5, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:6, length:1, signed :false},
		   {name:"Short circuit channel 8", offset:7, length:1, signed :false},
		   {name:"Short circuit channel 9", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 10", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 11", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 12", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 13", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 14", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 15", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 16", offset:15, length:1, signed :false},
		 ]
	    }
	 ]
	},
	
	{name:"IM16",
	 id: 0x80475000,
	 sections:
	 [
	 
		{type:sect_type.input,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 0", offset:0, length:1, signed :false},
		   {name:"channel 1", offset:1, length:1, signed :false},
		   {name:"channel 2", offset:2, length:1, signed :false},
		   {name:"channel 3", offset:3, length:1, signed :false},
		   {name:"channel 4", offset:4, length:1, signed :false},
		   {name:"channel 5", offset:5, length:1, signed :false},
		   {name:"channel 6", offset:6, length:1, signed :false},
		   {name:"channel 7", offset:7, length:1, signed :false},
			{name:"channel 8", offset:8, length:1, signed :false},
			{name:"channel 9", offset:9, length:1, signed :false},
			{name:"channel 10", offset:10, length:1, signed :false},
			{name:"channel 11", offset:11, length:1, signed :false},
			{name:"channel 12", offset:12, length:1, signed :false},
			{name:"channel 13", offset:13, length:1, signed :false},
			{name:"channel 14", offset:14, length:1, signed :false},
			{name:"channel 15", offset:15, length:1, signed :false}
		 ]
     },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 0-1", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 2-3", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 4-5", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 6-7", offset:3, length:1, signed :false},
			{name:"Error sensor Channels 8-9", offset:4, length:1, signed :false},
			{name:"Error sensor Channels 10-11", offset:5, length:1, signed :false},
			{name:"Error sensor Channels 12-13", offset:6, length:1, signed :false},
			{name:"Error sensor Channels 14-15", offset:7, length:1, signed :false},
		 ]
	    }
	 ]
	},	

	{name:"16DIP",
	 id: 0x814C5028,
	 sections:
	 [
	 
		{type:sect_type.input,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:16, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false},
			{name:"channel 9", offset:8, length:1, signed :false},
			{name:"channel 10", offset:9, length:1, signed :false},
			{name:"channel 11", offset:10, length:1, signed :false},
			{name:"channel 12", offset:11, length:1, signed :false},
			{name:"channel 13", offset:12, length:1, signed :false},
			{name:"channel 14", offset:13, length:1, signed :false},
			{name:"channel 15", offset:14, length:1, signed :false},
			{name:"channel 16", offset:15, length:1, signed :false}
		 ]
     },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 1-2", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 3-4", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 5-6", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 7-8", offset:3, length:1, signed :false},
			{name:"Error sensor Channels 9-10", offset:4, length:1, signed :false},
			{name:"Error sensor Channels 11-12", offset:5, length:1, signed :false},
			{name:"Error sensor Channels 13-14", offset:6, length:1, signed :false},
			{name:"Error sensor Channels 15-16", offset:7, length:1, signed :false},
		 ]
	    }
	 ]
	},	

	{name:"2RFID-S",
	 id: 0x2179CC00,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
		   {name:"channel 1 Tag Fully Read", offset:1, length:1, signed :false},
			{name:"channel 1 Tag Present", offset:2, length:1, signed :false},
			{name:"channel 1 Transceived On", offset:3, length:1, signed :false},
			{name:"channel 1 Trasceiver connected", offset:4, length:1, signed :false},
			{name:"channel 1 Error", offset:5, length:1, signed :false},
			{name:"channel 1 Busy", offset:6, length:1, signed :false},
			{name:"channel 1 Done", offset:7, length:1, signed :false},
			{name:"channel 1 Error Code", offset:8, length:16, signed :false},
			{name:"channel 1 Data_word_1", offset:32, length:16, signed :false},
			{name:"channel 1 Data_word_2", offset:48, length:16, signed :false},
			{name:"channel 1 Data_word_3", offset:64, length:16, signed :false},
			{name:"channel 1 Data_word_4", offset:80, length:16, signed :false},
			
		   {name:"channel 2 Tag Fully Read", offset:12*8+1, length:1, signed :false},
			{name:"channel 2 Tag Present", offset:12*8+2, length:1, signed :false},
			{name:"channel 2 Transceived On", offset:12*8+3, length:1, signed :false},
			{name:"channel 2 Trasceiver connected", offset:12*8+4, length:1, signed :false},
			{name:"channel 2 Error", offset:12*8+5, length:1, signed :false},
			{name:"channel 2 Busy", offset:12*8+6, length:1, signed :false},
			{name:"channel 2 Done", offset:12*8+7, length:1, signed :false},
			{name:"channel 2 Error Code", offset:12*8+8, length:16, signed :false},
			{name:"channel 2 Data_word_1", offset:12*8+32, length:16, signed :false},
			{name:"channel 2 Data_word_2", offset:12*8+48, length:16, signed :false},
			{name:"channel 2 Data_word_3", offset:12*8+64, length:16, signed :false},
			{name:"channel 2 Data_word_4", offset:12*8+80, length:16, signed :false},
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 1 Reset", offset:0, length:1, signed :false},
			{name:"channel 1 Transceiver info", offset:1, length:1, signed :false},
			{name:"channel 1 Tag info", offset:2, length:1, signed :false},
			{name:"channel 1 Write", offset:3, length:1, signed :false},
			{name:"channel 1 Read", offset:4, length:1, signed :false},
			{name:"channel 1 Tag ID", offset:5, length:1, signed :false},
			{name:"channel 1 Next", offset:6, length:1, signed :false},
			{name:"channel 1 Transceiver ON", offset:7, length:1, signed :false},
			{name:"channel 1 Number of bytes", offset:8, length:3, signed :false},
			{name:"channel 1 Address", offset:16, length:16, signed :false},
			{name:"channel 1 Data_word_1", offset:32, length:16, signed :false},
			{name:"channel 1 Data_word_2", offset:48, length:16, signed :false},
			{name:"channel 1 Data_word_3", offset:64, length:16, signed :false},
			{name:"channel 1 Data_word_4", offset:80, length:16, signed :false},

		   {name:"channel 2 Reset", offset:12*8+0, length:1, signed :false},
			{name:"channel 2 Transceiver info", offset:12*8+1, length:1, signed :false},
			{name:"channel 2 Tag info", offset:12*8+2, length:1, signed :false},
			{name:"channel 2 Write", offset:12*8+3, length:1, signed :false},
			{name:"channel 2 Read", offset:12*8+4, length:1, signed :false},
			{name:"channel 2 Tag ID", offset:12*8+5, length:1, signed :false},
			{name:"channel 2 Next", offset:12*8+6, length:1, signed :false},
			{name:"channel 2 Transceiver ON", offset:12*8+7, length:1, signed :false},
			{name:"channel 2 Number of bytes", offset:12*8+8, length:3, signed :false},
			{name:"channel 2 Address", offset:12*8+16, length:16, signed :false},
			{name:"channel 2 Data_word_1", offset:12*8+32, length:16, signed :false},
			{name:"channel 2 Data_word_2", offset:12*8+48, length:16, signed :false},
			{name:"channel 2 Data_word_3", offset:12*8+64, length:16, signed :false},
			{name:"channel 2 Data_word_4", offset:12*8+80, length:16, signed :false},

			
		 ]
	    },
		{type:sect_type.diag,
		 objects:
		 [
			{name:"Error sensor Channels 0-1", offset:0, length:1, signed :false},
			{name:"Error sensor Channels 2-3", offset:1, length:1, signed :false},
			{name:"Error sensor Channels 4-5", offset:2, length:1, signed :false},
			{name:"Error sensor Channels 6-7", offset:3, length:1, signed :false},
		   {name:"Short circuit channel 0", offset:8, length:1, signed :false},
		   {name:"Short circuit channel 1", offset:9, length:1, signed :false},
		   {name:"Short circuit channel 2", offset:10, length:1, signed :false},
		   {name:"Short circuit channel 3", offset:11, length:1, signed :false},
		   {name:"Short circuit channel 4", offset:12, length:1, signed :false},
		   {name:"Short circuit channel 5", offset:13, length:1, signed :false},
		   {name:"Short circuit channel 6", offset:14, length:1, signed :false},
		   {name:"Short circuit channel 7", offset:15, length:1, signed :false},
		 ]
	    }
	 ]
	},
	
	
	{name:"2AO-V",
	 id: 0x21080700,
	 sections:
	 [
	 
   	{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:16, signed :true},
		   {name:"channel 2", offset:16, length:16, signed :true},
		 ]
     }
	 ]
	},	

	{name:"2AO-I",
	 id: 0x22080700,
	 sections:
	 [
	 
   	{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:16, signed :true},
		   {name:"channel 2", offset:16, length:16, signed :true},
		 ]
     }
	 ]
	},	
    
    {name:"4AO-V",
	 id: 0x427A0900,
	 sections:
	 [
	 
   	{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:16, signed :true},
		   {name:"channel 2", offset:16, length:16, signed :true},
           {name:"channel 3", offset:32, length:16, signed :true},
           {name:"channel 4", offset:48, length:16, signed :true},
		 ]
     }
	 ]
	},	
    
    
	{name:"2AI-V",
	 id: 0x23557000,
	 sections:
	 [
	 
		{type:sect_type.input,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:16, signed :true},
		   {name:"channel 2", offset:16, length:16, signed :true},
		 ]
     }
	 ]
	},

	{name:"8DI-24VDC-N",
	 id: 0x62004000,
	 sections:
	 [
	 
		{type:sect_type.input,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :true},
			{name:"channel 1", offset:1, length:1, signed :true},
			{name:"channel 2", offset:2, length:1, signed :true},
			{name:"channel 3", offset:3, length:1, signed :true},
			{name:"channel 4", offset:4, length:1, signed :true},
			{name:"channel 5", offset:5, length:1, signed :true},
			{name:"channel 6", offset:6, length:1, signed :true},
			{name:"channel 7", offset:7, length:1, signed :true},
		 ]
     }
	 ]
	},	

	{name:"8DO-24VDC-P",
	 id: 0x61400400,
	 sections:
	 [
	 
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :true},
			{name:"channel 1", offset:1, length:1, signed :true},
			{name:"channel 2", offset:2, length:1, signed :true},
			{name:"channel 3", offset:3, length:1, signed :true},
			{name:"channel 4", offset:4, length:1, signed :true},
			{name:"channel 5", offset:5, length:1, signed :true},
			{name:"channel 6", offset:6, length:1, signed :true},
			{name:"channel 7", offset:7, length:1, signed :true},
		 ]
     }
	 ]
	},	

	{name:"8DO-24VDC-N",
	 id: 0x62400400,
	 sections:
	 [
	 
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:1, signed :true},
			{name:"channel 1", offset:1, length:1, signed :true},
			{name:"channel 2", offset:2, length:1, signed :true},
			{name:"channel 3", offset:3, length:1, signed :true},
			{name:"channel 4", offset:4, length:1, signed :true},
			{name:"channel 5", offset:5, length:1, signed :true},
			{name:"channel 6", offset:6, length:1, signed :true},
			{name:"channel 7", offset:7, length:1, signed :true},
		 ]
     }
	 ]
	},	

	
	{name:"4AI-TC",
	 id: 0x42779000,
	 sections:
	 [
	 
		{type:sect_type.input,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:16, signed :true},
		   {name:"channel 1", offset:16, length:16, signed :true},
			{name:"channel 2", offset:32, length:16, signed :true},
			{name:"channel 3", offset:48, length:16, signed :true},
		 ]
     },
	  {type:sect_type.diag,
		 objects:
		 [
			{name:"Channel 0  Measurement value range error ", offset:0, length:1, signed :false},
			{name:"Channel 0  Open circuit ", offset:1, length:1, signed :false},
			{name:"Channel 0  No PT1000 sensor ", offset:2, length:1, signed :false},
			{name:"Channel 0-1  Common mode voltage out of range", offset:3, length:1, signed :false},
			
			{name:"Channel 1  Measurement value range error ", offset:8, length:1, signed :false},
			{name:"Channel 1  Open circuit ", offset:9, length:1, signed :false},
			{name:"Channel 1  No PT1000 sensor ", offset:10, length:1, signed :false},
			{name:"Channel 0-1  Common mode voltage out of range", offset:11, length:1, signed :false},

			{name:"Channel 2  Measurement value range error ", offset:16, length:1, signed :false},
			{name:"Channel 2  Open circuit ", offset:17, length:1, signed :false},
			{name:"Channel 2  No PT1000 sensor ", offset:18, length:1, signed :false},
			{name:"Channel 2-3  Common mode voltage out of range", offset:19, length:1, signed :false},

			{name:"Channel 3  Measurement value range error ", offset:24, length:1, signed :false},
			{name:"Channel 3  Open circuit ", offset:25, length:1, signed :false},
			{name:"Channel 3  No PT1000 sensor ", offset:26, length:1, signed :false},
			{name:"Channel 2-3  Common mode voltage out of range", offset:27, length:1, signed :false},
		 ]
	    }
	 ]
	},	
    
	{name:"4AI-VI",
	 id: 0x41779000,
	 sections:
	 [
	 
		{type:sect_type.input,
		 objects:
		 [
		   {name:"channel 0", offset:0, length:16, signed :true},
		   {name:"channel 1", offset:16, length:16, signed :true},
			{name:"channel 2", offset:32, length:16, signed :true},
			{name:"channel 3", offset:48, length:16, signed :true},
		 ]
     },
	  {type:sect_type.diag,
		 objects:
		 [
			{name:"Channel 0  Measurement value range error ", offset:0, length:1, signed :false},
			{name:"Channel 1  Measurement value range error ", offset:8, length:1, signed :false},
			{name:"Channel 2  Measurement value range error ", offset:16, length:1, signed :false},
			{name:"Channel 3  Measurement value range error ", offset:24, length:1, signed :false},
		 ]
	    }
	 ]
	},	
    
    
    {name:"4DIP-4DOP",
	 id: 0x40533300,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
   		   {name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"Combined Word", offset:0, length:8, signed :false},
		   {name:"channel 5", offset:0, length:1, signed :false},
		   {name:"channel 6", offset:1, length:1, signed :false},
		   {name:"channel 7", offset:2, length:1, signed :false},
		   {name:"channel 8", offset:3, length:1, signed :false},
		 ]
	    },
	 ]
	},
    
    {name:"8DIP",
	 id: 0x60204000,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false}
		 ]
	    },
	 ]
	},
	
    {name:"8DOP",
	 id: 0x60540400,
	 sections:
	 [
	    
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false}
		 ]
	    },
	 ]
	},
    {name:"8DXP",
	 id: 0x60554400,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false}
		 ]
	    },
		{type:sect_type.output,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false}
		 ]
	    },
	 ]
	},
    {name:"8DIP-D",
	 id: 0x60404000,
	 sections:
	 [
	    {type:sect_type.input,
		 objects:
		 [
		   {name:"channel 1", offset:0, length:1, signed :false},
		   {name:"channel 2", offset:1, length:1, signed :false},
		   {name:"channel 3", offset:2, length:1, signed :false},
		   {name:"channel 4", offset:3, length:1, signed :false},
		   {name:"channel 5", offset:4, length:1, signed :false},
		   {name:"channel 6", offset:5, length:1, signed :false},
		   {name:"channel 7", offset:6, length:1, signed :false},
		   {name:"channel 8", offset:7, length:1, signed :false}
		 ]
	    },
	 ]
	},
	
	{name:"FGEN Station 5 Pin",
	 id: 0x01510022,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	    }
	 ]
	},
	{name:"FGEN Station 4 Pin",
	 id: 0x01500022,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	    }
	 ]
	},

{name:"FEN20-Med",
	 id: 0x01500027,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	    }
	 ]
	},
	
	{name:"TBEN Station 5 Pin",
	 id: 0x01510028,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	    }
	 ]
	},
	{name:"TBEN Station 4 Pin",
	 id: 0x01500028,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	   }
	 ]
	},

	{name:"TBEN-S Station",
	 id: 0x01500029,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	   }
	 ]
	},
    
    
	{name:"FEN20-4DIP-4DXP",
	 id: 0x01500127,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	   }
	 ]
	},
	
	
	{name:"BL67-GW",
	 id: 0x0150001F,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	    }
	 ]
	},
	{name:"BLCEN",
	 id: 0x01500021,
	 sections:
	 [
		{type:sect_type.diag,
		 objects:
		 [
		   {name:"Diagnostics", offset:8, length:1, signed :false},
		   {name:"UL Low", offset:15, length:1, signed :false},
		   {name:"UB Low", offset:1, length:1, signed :false}
		 ]
	    }
	 ]
	}
	
	
];


function convertString(str)
{
	var tmp;
	tmp=str.replace(/-/g,"_");
	tmp=tmp.replace(/ /g,"_");
	return tmp;
}

// this can be used for simulation
var transfered_vars=new Array(1000);	


var IO=[];//["FGEN Station 5 Pin","16XSG"];
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

			
			


var var_type=
{
	prog:0,
	timer:1,
	counter:2,
	plc:3,
	m2m:4,
	io:5
};

var var_db_names=["Program Variables","Timer/Counter Variables","","PLC Variables"];

var var_db=
[
	{type:var_type.prog, name:"Program Variables", var_list:new Array()},
	{type:var_type.timer, name:"Timer&Counter Variables", var_list:new Array()},
	{type:var_type.counter,name:"",  var_list:new Array()},
	{type:var_type.plc,name:"PLC Variables", var_list:new Array()},
];			

var var_db_template=
[
	{type:var_type.prog, name:"Program Variables", var_list:new Array()},
	{type:var_type.timer, name:"Timer&Counter Variables", var_list:new Array()},
	{type:var_type.counter,name:"",  var_list:new Array()},
	{type:var_type.plc,name:"PLC Variables", var_list:new Array()},
];			


var labels=[];
var editor="regular";

var var_templates=
[
	{name:""},
	{name:""},// timer - one shot vs infinitely running is specified in the timer period
	{name:""},// counter up/down is specified in the instruction
	{name:"",section:0,word_index:0, bit_offset:0, size:0,signed:0},
]

var field_types=
{
	enumeration:0,
	var_list:1,
	str_num:2,
	fixed:3,
	str_num_var:4, // field which exposes variable context menu extension
	str_text_area:5
};

var msg_id_enum=new Array();

var type_desc=
[
	{type:var_type.prog,elems:
		[{name:"name",field_name:"Name",field_size:10,type:field_types.str_num,elem_name_prefix:"prog_var_name"}]
	},
	{type:var_type.timer,elems:
		[{name:"name",field_name:"Name",field_size:10,type:field_types.str_num,elem_name_prefix:"timer_var_name"}]
	},
	{type:var_type.counter,elems:
		[{name:"name",field_name:"Name",field_size:10,type:field_types.str_num,elem_name_prefix:"counter_var_name"}]
	},
	{type:var_type.plc,elems:
		[
		 {name:"name",field_name:"Name",field_size:10,type:field_types.str_num,elem_name_prefix:"plc_var_name"},
		 {name:"section",field_name:"Direction",field_size:6,type:field_types.enumeration,elem_name_prefix:"plc_var_section",enum_elems:["ARGEE->PLC","PLC->ARGEE"]},
		 {name:"word_index",field_name:"Word index",field_size:3,type:field_types.str_num,elem_name_prefix:"plc_var_word_index"},
		 {name:"bit_offset",field_name:"Bit offset",field_size:1,type:field_types.enumeration,elem_name_prefix:"plc_var_bit_offset",enum_elems:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]},
		 {name:"size",field_name:"Size",field_size:2,type:field_types.enumeration,elem_name_prefix:"plc_var_size",enum_elems:["Word (16 bit)","Bool (1 bit)"]},
		 {name:"signed",field_name:"Signed",field_size:2,type:field_types.enumeration,elem_name_prefix:"plc_var_signed",enum_elems:["unsigned","signed"]}
		]
	}
]

/*function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, var len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}	*/

function clone(src) {
  function mixin(dest, source, copyFunc) {
    var name, s, i, empty = {};
    for(name in source){
      // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
      // inherited from Object.prototype.   For example, if dest has a custom toString() method,
      // don't overwrite it with the toString() method that source inherited from Object.prototype
      s = source[name];
      if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
        dest[name] = copyFunc ? copyFunc(s) : s;
      }
    }
    return dest;
  }

  if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
    // null, undefined, any non-object, or function
    return src;  // anything
  }
  if(src.nodeType && "cloneNode" in src){
    // DOM Node
    return src.cloneNode(true); // Node
  }
  if(src instanceof Date){
    // Date
    return new Date(src.getTime());  // Date
  }
  if(src instanceof RegExp){
    // RegExp
    return new RegExp(src);   // RegExp
  }
  var r, i, l;
  if(src instanceof Array){
    // array
    r = [];
    for(i = 0, l = src.length; i < l; ++i){
      if(i in src){
        r.push(clone(src[i]));
      }
    }
    // we don't clone functions for performance reasons
    //    }else if(d.isFunction(src)){
    //      // function
    //      r = function(){ return src.apply(this, arguments); };
  }else{
    // generic objects
    r = src.constructor ? new src.constructor() : {};
  }
  return mixin(r, src, clone);

}

function addVar(type)
{
	var i,j;
	var id;
	var elem;
	var_db[type].var_list[var_db[type].var_list.length]=clone(var_templates[type]);
	saveLocal();
	redrawVars(true);
}			


function renderVar(type,varNum,output,rw)
{
	var i,j,to_render_del;
	output="";
	to_render_del=true;

	if (rw==true)
	{
		output+="<TR>";
		for(i=0;i<type_desc[type].elems.length;i++)
		{
			switch(type_desc[type].elems[i].type)
			{
				case field_types.str_num:
					  output+="<TD>";
					  output+="<input type=\"email\" autocorrect=\"off\" autocapitalize=\"off\" autocomplete=\"off\" size=\""+type_desc[type].elems[i].field_size+"\" value=\""+var_db[type].var_list[varNum][type_desc[type].elems[i].name]+"\" id=\""+type_desc[type].elems[i].elem_name_prefix+"_"+varNum+
					              "\"  onfocus=\"onVarFocusEnter(this.id,"+type+","+varNum+","+i+",0)\" onblur=\"onVarFocusExit(this.id,"+type+","+varNum+","+i+",0)\">";
					  output+="</TD>";
					  break;
				case field_types.enumeration:
					  output+="<TD>";
					  output+="<select id=\""+type_desc[type].elems[i].elem_name_prefix+"_"+varNum+"\" onblur=\"varChange(this.id,"+type+","+varNum+","+i+",0)\">";
					  
					  for(j=0;j<type_desc[type].elems[i].enum_elems.length;j++)
					  {
							if (var_db[type].var_list[varNum][type_desc[type].elems[i].name]==j)
							{
								output+="<option value="+j+" selected>"+type_desc[type].elems[i].enum_elems[j]+"</option>";
							}
							else
							{
								output+="<option value="+j+">"+type_desc[type].elems[i].enum_elems[j]+"</option>";
							}
						}
						output+="</select>";
						output+="</TD>";
					  break;
				case field_types.var_list:
						for(j=0;j<var_db[type].var_list[varNum].var_list.length;j++)
						{
							output+="<TD>";
							if (computer_interface==false)
							{
								output+="<input type=\"text\" onfocus=\"return showEditBox(this,"+expr_types.transfer_var+","+varNum+","+j+",0,0);\"  value=\""+var_db[type].var_list[varNum].var_list[j].name+"\" id=\""+type_desc[type].elems[i].elem_name_prefix+"_"+varNum+"_"+j+"\" onblur=\"varChange(this.id,"+type+","+varNum+","+i+","+j+")\">";
							}
							else
							{
								output+="<input type=\"text\" onkeydown=\"return actOnKeyDown(event,"+expr_types.transfer_var+");\"   value=\""+var_db[type].var_list[varNum].var_list[j].name+"\" id=\""+type_desc[type].elems[i].elem_name_prefix+"_"+varNum+"_"+j+"\" onblur=\"varChange(this.id,"+type+","+varNum+","+i+","+j+")\">";
							}
							output+="<br><button onclick=\"delTransVar("+type+","+varNum+","+j+");\">Delete Transfer Variable</button>";
							output+="</TD>";
						}
						output+="<TD>";
						output+="<button onclick=\"addTransVar("+type+","+varNum+");\">Add Transfer Variable</button>";
						output+="</TD>";
						break;
			}
		}
		output+="<TD>";
		if (type!=var_type.m2m)
		{
			output+="<button onclick=\"delVar("+type+","+varNum+");\">Delete Variable</button>";
		}
		else
		{
			output+="<button onclick=\"delVar("+type+","+varNum+");\">Delete Message</button>";
		}
		output+="</TD>";
		output+="</TR>";
		updateContextMenu();
	}
	else
	{
		switch(type)
		{
			case var_type.prog:
				output+="<TR>";
				output+="<TD bgcolor=lightgrey>Name</TD>";
				output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>"+"<TD style=\"width:17em;\">Value: "+getVarValue(type,varNum+2,0)+"</TD>";	
				output+="</TR>";
				break;
			case var_type.timer:
				
			
			   var tmp=getVarValue(type,varNum,0);
				var done=(tmp>>8)&1;
				var counter=(tmp>>9)&1;
				var engaged=tmp&1;
				var timer_type=(tmp>>16)&0xffff;
				var exp_time=getVarValue(type,varNum,1);
				var curr_time=getVarValue(type,varNum,3);
				if (counter==1)
				{
					var b = new ArrayBuffer(4);
					var u = new Uint32Array(b);
					var i = new Int32Array(b);
					var curr_time_tmp;
					u[0]=curr_time;
					curr_time_tmp=i[0];
					output+="<TR>";
					output+="<TD bgcolor=lightgrey>Name</TD>";
					output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>"+"<TD>Done: "+done+"</TD>"+"<TD>Count Preset: "+exp_time+"</TD>"+"<TD >Current Count: "+curr_time_tmp+"</TD>";	
					output+="</TR>";
				}
				else
				{
					output+="<TR>";
					output+="<TD bgcolor=lightgrey>Name</TD>";
					output+="<TD bgcolor=#E6E6E6>"+var_db[type].var_list[varNum].name+"</TD>"+"<TD>Done: "+done+"</TD>"+"<TD>Engaged: "+engaged+"</TD>"+"<TD>Type: "+timer_type+"</TD>"+"<TD>Expiration Time: "+exp_time+"</TD>"+"<TD >Timer tick: "+curr_time+"</TD>";	
					output+="</TR>";
				}
				break;
		}
	}
	return output;
}

var curr_var_name;
var new_var_name;

function onVarFocusEnter(id,type,varNum,elem)
{
	var elem1=this.document.getElementById(id);
	if (elem==0)
	{
		// we only handle "name" elements
		curr_var_name=elem1.value;
	}

}

function onVarFocusExit(id,type,varNum,elem)
{
	var i,j,k;
	var elem1=this.document.getElementById(id);
	
	if (type==var_type.m2m)
	{
		return;
	}
	
	if (elem==0)
	{
		new_var_name=elem1.value;
		
		// check if any other variable has the same name
		for(i=0;i<var_db.length;i++)
		{	
			for(j=0;j<var_db[i].var_list.length;j++)
			{
				if ((var_db[i].var_list[j].name==new_var_name)&&(new_var_name.length!=0))
				{
					if (((i==type)&&(j!=varNum))||
					     (i!=type))
					{
						alert("Variable name conflict\n Variable name erased");
						elem1.value="";
						varChange(id,type,varNum,elem,0);
						return;
					}
				}
			}
		}
					
		
		
		
		if ((new_var_name!=curr_var_name)&&(curr_var_name.length!=0)&&(new_var_name.length!=0))
		{
			var r=confirm("Do you want to change instances of variable \""+curr_var_name+"\" to \""+new_var_name+"\" everywhere in the program ?");
			if (r==true)
			{
				varChange(id,type,varNum,elem,0);
				var reg=new RegExp("\\b"+curr_var_name+"\\b","g");
				for(i=0;i<cond_db.length;i++)
				{				
					cond_db[i].condition=cond_db[i].condition.replace(reg,new_var_name);
					for(j=0;j<cond_db[i].actions.length;j++)
					{
						if (cond_db[i].actions[j].act_type==act_types.assignment)
						{
							cond_db[i].actions[j].dst=cond_db[i].actions[j].dst.replace(reg,new_var_name);
							cond_db[i].actions[j].src=cond_db[i].actions[j].src.replace(reg,new_var_name);
						}
						if (cond_db[i].actions[j].act_type==act_types.coil)
						{
							cond_db[i].actions[j].coil=cond_db[i].actions[j].coil.replace(reg,new_var_name);
						}
						if (
						    (cond_db[i].actions[j].act_type==act_types.timer_start)||
							 (cond_db[i].actions[j].act_type==act_types.ton)||
							 (cond_db[i].actions[j].act_type==act_types.toff)
							)
						
						{
							cond_db[i].actions[j].timer=cond_db[i].actions[j].timer.replace(reg,new_var_name);
							cond_db[i].actions[j].timer_expiration_time=cond_db[i].actions[j].timer_expiration_time.replace(reg,new_var_name);
						}
						if (
						    (cond_db[i].actions[j].act_type==act_types.ctu)||
						    (cond_db[i].actions[j].act_type==act_types.ctd)
							)
						{
							cond_db[i].actions[j].counter=cond_db[i].actions[j].counter.replace(reg,new_var_name);
							cond_db[i].actions[j].preset=cond_db[i].actions[j].preset.replace(reg,new_var_name);
						}
						if (cond_db[i].actions[j].act_type==act_types.cnt_res)
						{
							cond_db[i].actions[j].counter=cond_db[i].actions[j].counter.replace(reg,new_var_name);
						}
						
						
					}
				}
				// HMI screens need to be updated as well
				for(i=0;i<screens.length;i++)
				{
					for(j=0;j<screens[i].rows.length;j++)
					{
						for(k=0;k<screens[i].rows[j][0].sect_elems.length;k++)
						{
							var obj=screens[i].rows[j][0].sect_elems[k];
							
							if ((obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.button))
							{
								screens[i].rows[j][0].sect_elems[k].Destination=screens[i].rows[j][0].sect_elems[k].Destination.replace(reg,new_var_name);
							}
							if ((obj.type==sect_elem_type.status_ruler)||(obj.type==sect_elem_type.status))
							{
								screens[i].rows[j][0].sect_elems[k].Expression=screens[i].rows[j][0].sect_elems[k].Expression.replace(reg,new_var_name);
							}
						}
					}
				}
				
				saveLocal();
				refreshProg(true);
				updateContextMenu();
			}
			else
			{
				elem1.value=curr_var_name;
				varChange(id,type,varNum,elem,0);
			}
		}
		else
		{
			varChange(id,type,varNum,elem,0);
		}
	}
	else
	{
		varChange(id,type,varNum,elem,0);
	}
}


function varChange(id,type,num,elem,sub_elem)
{
	var elem1=this.document.getElementById(id);
	
	if (contextMenuDisplayed==true)
	{
		return true;
	}
	
	if (type_desc[type].elems[elem].type==field_types.var_list)
	{
		var_db[type].var_list[num].var_list[sub_elem].name=elem1.value;	
	}
	else
	{
		if (type_desc[type].elems[elem].type==field_types.str_num)
		{
			var_db[type].var_list[num][type_desc[type].elems[elem].name]=elem1.value;
		}
		else
		{
			var_db[type].var_list[num][type_desc[type].elems[elem].name]=parseInt(elem1.value);
		}
	}
	saveLocal();
	updateContextMenu();
}

function delVar(type,num)
{
	var id;
	var elem;
	var_db[type].var_list.splice(num,1);
	saveLocal();
	redrawVars(true);
	
	// add focus
	if ((num-1)>0)
	{
		id=type_desc[type].elems[0].elem_name_prefix+"_"+(num-1);
		elem=this.document.getElementById(id);	
		elem.focus();
	}
}


function addTransVar(type,num)
{
	var id;
	var elem;
	var_db[type].var_list[num].var_list[var_db[type].var_list[num].var_list.length]={name:""};
	saveLocal();
	redrawVars(true);
	id=type_desc[type].elems[2].elem_name_prefix+"_"+num+"_"+(var_db[type].var_list[num].var_list.length-1);
	elem=this.document.getElementById(id);	
	elem.focus();

}

function delTransVar(type,num,trans_var_num)
{
	var_db[type].var_list[num].var_list.splice(trans_var_num,1);
	saveLocal();
	redrawVars(true);
}

var_display=false;

function GetArrValue(dt, offset, len)
{
   var val=0;
   var byte_num=(offset/8) >> 0;
   var bit_num=offset%8;
   if ((len%8)==0)
   {
      switch(len)
      {
         case 8:
            val=dt.getUint8(byte_num,true);
            break;
         case 16:
            val=dt.getUint16(byte_num,true);
            break;
         case 32:
            val=dt.getUint32(byte_num,true);
            break;
      }
      return val;
   }
   else
   {
		val=dt.getUint8(byte_num);
      return ((val>>bit_num)&(0xff>>(8-len)));
   }
}

function GetGWArrValue(dt, offset, len)
{
   var val=0;
	val=dt.getUint16(0,true);
   return ((val>>offset)&(0xff>>(8-len)));
}


function redrawVars(rw)
{
	var i,j;
	var outp,tbl;

	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	
	
	var_div.innerHTML="";
	
	
	for(i=0;i<var_db.length;i++)
	{
		if (var_db_names[i]=="")
		{
			continue;
		}
		
		if ((i!=0)&&(i!=1)&&(rw==false))
		{
			continue;
		}

		
		var_div.innerHTML+="<H2>"+var_db_names[i]+"</h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
		if	(rw==true)
		{		
			if (var_db[i].var_list.length!=0)
			{
				tbl+="<TR>";
				// render field names
				for(j=0;j<type_desc[i].elems.length;j++)
				{
					if (type_desc[i].elems[j].type==field_types.var_list)
					{
					}
					else
					{
						tbl+="<TD bgcolor=lightgrey>";
						tbl+=type_desc[i].elems[j].field_name;
						tbl+="</TD>";
					}
				}
				// add actions field	
				tbl+="<TD bgcolor=lightgrey>";
				tbl+="Actions";
				tbl+="</TD>";
				tbl+="<TR>";
			}
			
		}
		
		if ((i==0)&&(rw==false))
		{
			outp="<TR>";
			outp+="<TD bgcolor=lightgrey>Name</TD>";
			outp+="<TD bgcolor=#E6E6E6>PLC_Connected"+"</TD>"+"<TD>Value: "+getVarValue(0,0,0)+"</TD>";	
			outp+="</TR>";
			outp+="<TR>";
			outp+="<TD bgcolor=lightgrey>Name</TD>";
			outp+="<TD bgcolor=#E6E6E6>PROG_cycleTime"+"</TD>"+"<TD>Value: "+getVarValue(0,1,0)+"</TD>";	
			outp+="</TR>";
			
			tbl+=outp;
		}
		
		for(j=0;j<var_db[i].var_list.length;j++)
		{
			outp="";
			outp=renderVar(i,j,outp,rw);
			tbl+=outp;
		}
		tbl+="</table>";
		if (rw==true)
		{
			if (i!=var_type.m2m)
			{
				var_div.innerHTML+=tbl+"<button type=\"button\" onclick=\"addVar("+i+");\">Add Variable</button>";
			}
			else
			{
				var_div.innerHTML+=tbl+"<button type=\"button\" onclick=\"addVar("+i+");\">Add Message</button><br><br><br>";
			}
		}
		else
		{
			var_div.innerHTML+=tbl;
		}
	}
	
	if ((rw==false)&&(ajax_vars_loaded==true))
	{
		// add IO and PLC variable data
		// first PLC variables
		var_div.innerHTML+="<H2> PLC Variables </h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
		var plc_dt_inp=new DataView(plc_io_db[plc_sects.input].buffer);
		var plc_dt_outp=new DataView(plc_io_db[plc_sects.output].buffer);
		for(i=0;i<var_db[var_type.plc].var_list.length;i++)
		{
			tbl+="<TR>";
			tbl+="<TD bgcolor=#E6E6E6>"+var_db[var_type.plc].var_list[i].name+"</TD>";
			var dt;
			switch(var_db[var_type.plc].var_list[i].section)
			{
				case 0:
					dt=plc_dt_inp;
					break;
				case 1:
					dt=plc_dt_outp;
					break;
			}
			var val;
			if (var_db[var_type.plc].var_list[i].size==0)
			{
				// whole word
				val=dt.getUint16((parseInt(var_db[var_type.plc].var_list[i].word_index))*2,true);
			}
			else
			{
				val=dt.getUint16((parseInt(var_db[var_type.plc].var_list[i].word_index))*2,true);
				val=(val>>parseInt(var_db[var_type.plc].var_list[i].bit_offset))&1;
			}
			tbl+="<TD>"+val+"</TD>";	
			tbl+="</TR>";
		}
		tbl+="</table>";
		var_div.innerHTML+=tbl;
		// handle IO sections
		var_div.innerHTML+="<H2> Local IO </h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
		for(i=0;i<local_io_db.length;i++)
		{
			var ind=findIndex(IO[i]);
			for(j=0;j<slices[ind].sections.length;j++)
			{
				tbl+="<tr><TD colspan=\"2\" bgcolor=lightgrey><b> Slot "+i+":"+slices[ind].name+" "+sect_names[slices[ind].sections[j].type]+"</b> </TD></tr>";
				var dt=new DataView(local_io_db[i][slices[ind].sections[j].type].buffer);
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					tbl+="<TR>";
					tbl+="<TD bgcolor=#E6E6E6>"+slices[ind].sections[j].objects[k].name+"</TD>";
					if (i==0)
					{
						var val=GetGWArrValue(dt,slices[ind].sections[j].objects[k].offset,slices[ind].sections[j].objects[k].length);
					}
					else
					{
						var val=GetArrValue(dt,slices[ind].sections[j].objects[k].offset,slices[ind].sections[j].objects[k].length);
					}
					tbl+="<TD >"+val+"</TD>";
					tbl+="</TR>";
				}
			}
		}
		tbl+="</table>";
		var_div.innerHTML+=tbl;
	}
}


function findIndex(str)
{
	var i;
	for(i=0;i<slices.length;i++)
	{
		if (slices[i].name==str)
		{
			return i;
		}
	}
}

var basic_operations_menu=
[
	{group:"Arithmetic",ops:["+","-","*","/","%","abs( )","min( )","max( )"]},
	{group:"Brackets",ops:["( )"]},
	{group:"Compare",ops:[">",">=","<","<=","=","<>","F_COS"]},
	{group:"Logic",ops:["&","|","!"]}
];

var advances_operations_menu=
[
	{group:"Timer/Counter",ops:["expired( )","count( )"]},
];
	
var var_io_list;
var var_pg_lists=[];

function updateContextMenu()
{
	var i,j,k,ind;
	var outp;
	var outp1;
	var outp2;
	var sel_menu;
	
	sel_menu="";
	var_io_list="";
	/*sel_menu+="<select  id=\"cont_menu_sel1\" onblur=\"hideContextMenu();\" onchange=\"changeContextMenu()\">";
	*/
	
	
	
	sel_menu+="<select size=\"10\"  id=\"cont_menu_sel1\" onclick=\"changeContextMenu()\" onblur=\"hideContextMenu();\" >";
	//var_io_list+="<select>";
	sel_menu+="<option>Select Variable</option>";
	
	sel_menu+="<optgroup label=\"IO\"></optgroup>";
	for(i=0;i<IO.length;i++)
	{
		sel_menu+="<optgroup label=\"&nbsp Slot"+i+" ("+IO[i]+")\"></optgroup>";
		var_io_list+="<optgroup label=\"&nbsp Slot"+i+" ("+IO[i]+")\"></optgroup>";
		ind=findIndex(IO[i]);
		for(j=0;j<slices[ind].sections.length;j++)
		{
			sel_menu+="<optgroup label=\"&nbsp&nbsp "+sect_names[slices[ind].sections[j].type]+"\"></optgroup>";
			var_io_list+="<optgroup label=\"&nbsp&nbsp "+sect_names[slices[ind].sections[j].type]+"\"></optgroup>";
			for(k=0;k<slices[ind].sections[j].objects.length;k++)
			{
				sel_menu+="<option value=\'IO.Slot"+i+"."+sect_names[slices[ind].sections[j].type]+"."+convertString(slices[ind].sections[j].objects[k].name)+"\'>&nbsp&nbsp&nbsp "+slices[ind].sections[j].objects[k].name+"</option>";
				var_io_list+="<option value=\'IO.Slot"+i+"."+sect_names[slices[ind].sections[j].type]+"."+convertString(slices[ind].sections[j].objects[k].name)+"\'>&nbsp&nbsp&nbsp "+slices[ind].sections[j].objects[k].name+"</option>";
			}
		}
	}
	
	var_pg_lists=new Array();
	for(i=0;i<var_db.length;i++)
	{
		if (var_db_names[i]=="")
		{
			continue;
		}
		var_pg_lists[i]=new String();
		if (var_db[i].var_list.length!=0)
		{
			sel_menu+="<optgroup label=\" "+var_db_names[i]+"\"></optgroup>";
			var_pg_lists[i]+="<optgroup label=\" "+var_db_names[i]+"\"></optgroup>";
			for(j=0;j<var_db[i].var_list.length;j++)
			{
				sel_menu+="<option value=\'"+var_db[i].var_list[j].name+"\'>&nbsp "+var_db[i].var_list[j].name+"</option>";
				var_pg_lists[i]+="<option value=\'"+var_db[i].var_list[j].name+"\'>&nbsp "+var_db[i].var_list[j].name+"</option>";
			}
		}
	}
	sel_menu+="<optgroup label=\" "+"PLC Status"+"\"></optgroup>";
	sel_menu+="<option value=\'"+"PLC"+"."+"connected"+"\'>&nbsp "+"Connection Status"+"</option>";
	
	var_pg_lists[0]+="<optgroup label=\" "+"PLC Status"+"\"></optgroup>";
	var_pg_lists[0]+="<option value=\'"+"PLC"+"."+"connected"+"\'>&nbsp "+"Connection Status"+"</option>";
	
	sel_menu+="<optgroup label=\" "+"Prog Status"+"\"></optgroup>";
	sel_menu+="<option value=\'"+"PROG"+"."+"cycleTime"+"\'>&nbsp "+"Cycle Time"+"</option>";
	
	var_pg_lists[0]+="<optgroup label=\" "+"Prog Status"+"\"></optgroup>";
	var_pg_lists[0]+="<option value=\'"+"PROG"+"."+"cycleTime"+"\'>&nbsp "+"Cycle Time"+"</option>";
		
	
	
	
	sel_menu+="</select>";
	//cont_menu_div.innerHTML=sel_menu;
	

	
	


	



	
	outp="<menu type=\"context\" id=\"supermenu\">";
	outp1="<menu type=\"context\" id=\"supermenu_prog_vars\">";
	outp2="<menu type=\"context\" id=\"supermenu_prog_vars\">";
	
		outp+="<menu label=\"I/O\">"
		for(i=0;i<IO.length;i++)
		{
			// slot loop
			outp+="<menu label=\"Slot "+i+" ("+IO[i]+")\">"
			ind=findIndex(IO[i]);
			for(j=0;j<slices[ind].sections.length;j++)
			{
				outp+="<menu label=\""+sect_names[slices[ind].sections[j].type]+"\">";
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					// one way to avoid complex text conversions is to maintain 2 expressions - one in a readable text format, the other one 
					// with function calls such as GET_IO(slot,section, bit_offset, bit_len)
					outp+="<menuitem label=\""+slices[ind].sections[j].objects[k].name+ "\" onclick=\"insert_val_prog_scr(\'IO.Slot"+i+"."+sect_names[slices[ind].sections[j].type]+"."+convertString(slices[ind].sections[j].objects[k].name)+"\')\"></menuitem>";
				}
				outp+="</menu>";
			}
			outp+="</menu>";
		}
		outp+="</menu>";
		
		

		for(i=0;i<var_db.length;i++)
		{
			if (var_db_names[i]=="")
			{
				continue;
			}
			if (var_db[i].var_list.length!=0)
			{
				outp+="<menu label=\""+var_db_names[i]+"\">";
				if (i==0)
				{
					outp1+="<menu label=\""+var_db_names[i]+"\">";
					outp2+="<menu label=\""+var_db_names[i]+"\">";
				}
				for(j=0;j<var_db[i].var_list.length;j++)
				{
					outp+="<menuitem label=\" "+var_db[i].var_list[j].name+ "\" onclick=\"insert_val_prog_scr(\'"+var_db[i].var_list[j].name+"\')\"></menuitem>";
					if (i==0)
					{					
						outp1+="<menuitem label=\" "+var_db[i].var_list[j].name+ "\" onclick=\"insert_val_hmi_screen(\'"+var_db[i].var_list[j].name+"\')\"></menuitem>";
						outp2+="<menuitem label=\" "+var_db[i].var_list[j].name+ "\" onclick=\"insert_val_transfer_var(\'"+var_db[i].var_list[j].name+"\')\"></menuitem>";
					}
				}
				outp+="</menu>";
				if (i==0)
				{
					outp1+="</menu>";
					outp2+="</menu>";
				}
			}
		}
		
		outp+="<menu label=\"PLC Status\">"
		outp+="<menuitem label=\" "+"Connection Status"+ "\" onclick=\"insert_val_prog_scr(\'"+"PLC"+"."+"connected"+"\')\"></menuitem>";
		
		outp+="</menu>";
		
		outp1+="<menu label=\"PLC Status\">"
		outp1+="<menuitem label=\" "+"Connection Status"+ "\" onclick=\"insert_val_hmi_screen(\'"+"PLC"+"."+"connected"+"\')\"></menuitem>";

//		outp2+="<menu label=\"PLC Status\">"
//		outp2+="<menuitem label=\" "+"Connection Status"+ "\" onclick=\"insert_val_hmi_screen(\'"+"PLC"+"."+"connected"+"\')\"></menuitem>";

		
		outp1+="</menu>";
//		outp2+="</menu>";
		
		// add operation menus
		outp+="<menu label=\"Operations\">"
		outp1+="<menu label=\"Operations\">"
			for(i=0;i<basic_operations_menu.length;i++)
			{
				outp+="<menu label=\""+basic_operations_menu[i].group+"\">";
				outp1+="<menu label=\""+basic_operations_menu[i].group+"\">";
				for(j=0;j<basic_operations_menu[i].ops.length;j++)
				{
					outp+="<menuitem label=\" "+basic_operations_menu[i].ops[j]+ "\" onclick=\"insert_val_prog_scr(\'"+basic_operations_menu[i].ops[j]+"\')\"></menuitem>";
					outp1+="<menuitem label=\" "+basic_operations_menu[i].ops[j]+ "\" onclick=\"insert_val_hmi_screen(\'"+basic_operations_menu[i].ops[j]+"\')\"></menuitem>";
				}
				outp+="</menu>";
				outp1+="</menu>";
			}
			
			for(i=0;i<advances_operations_menu.length;i++)
			{
				outp+="<menu label=\""+advances_operations_menu[i].group+"\">";
				for(j=0;j<advances_operations_menu[i].ops.length;j++)
				{
					outp+="<menuitem label=\" "+advances_operations_menu[i].ops[j]+ "\" onclick=\"insert_val_prog_scr(\'"+advances_operations_menu[i].ops[j]+"\')\"></menuitem>";
				}
				outp+="</menu>";
			}
			
		outp+="</menu>";
		outp1+="</menu>";

	outp+="</menu>";
	outp1+="</menu>";
	men_div.innerHTML=outp+outp1;
	var_context_menu_div.innerHTML=outp2;
	//return outp;
}


var cond_db=new Array();


var act_types=
{
	assignment:0,
	timer_start:1,
	coil:2,
	ton:3,
	toff:4,
	send_m2m:5,
	comment:7,
	ctu:8,
	ctd:9,
	cnt_res:10
};
	
	


var act_desc=
[
	{name:"Assignment",
	 color:"Aqua",
	 template:{dst:"",src:""},
	 field_list:
	 [
		{name:"dst",field_size:10,type:field_types.str_num,display_name:"Destination"},
		{name:"src",field_size:10,type:field_types.str_num,display_name:"Expression"}
	 ]
	},
	{name:"Timer start",
	 color: "Aquamarine ",
	 template:{timer:"",timer_expiration_time:"1000"},
	 field_list:
	 [
		{name:"timer",field_size:10,type:field_types.str_num,display_name:"Timer"},
		{name:"timer_expiration_time",field_size:10,type:field_types.str_num,display_name:"Expires (ms)"}
	 ]
	},
	{name:"Coil",
	 color: "Gold ",
	 template:{coil:""},
	 field_list:
	 [
		{name:"coil",field_size:10,type:field_types.str_num,display_name:"Coil"}
	 ]
	},
	{name:"Timer On",
	 color: "DarkTurquoise ",
	 template:{timer:"",timer_expiration_time:"1000"},
	 field_list:
	 [
		{name:"timer",field_size:10,type:field_types.str_num,display_name:"Timer"},
		{name:"timer_expiration_time",field_size:10,type:field_types.str_num,display_name:"Expires (ms)"}
	 ]
	},
	{name:"Timer Off",
	 color: "DarkSeaGreen ",
	 template:{timer:"",timer_expiration_time:"1000"},
	 field_list:
	 [
		{name:"timer",field_size:10,type:field_types.str_num,display_name:"Timer"},
		{name:"timer_expiration_time",field_size:10,type:field_types.str_num,display_name:"Expires (ms)"}
	 ]
	},
	{name:"",
	 color: "#F2F2F2",
	 template:{Message_ID:""},
	 field_list:
	 [
		{name:"Message_ID",field_size:3,type:field_types.str_num,display_name:"Message ID"}
	 ]
	},
	{name:"",
	 color: "#F2F2F2",
	 template:{Message:""},
	 field_list:
	 [
		{name:"Message",field_size:30,type:field_types.str_num,display_name:"Message"}
	 ]
	},
	{name:"Comment",
	 color: "#F2F2F2",
	 template:{Comment:""},
	 field_list:
	 [
		{name:"Comment",field_size:30,type:field_types.str_text_area,display_name:"Comment"}
	 ]
	},
	{name:"Count Up",
	 color: "LimeGreen  ",
	 template:{counter:"",preset:"1000"},
	 field_list:
	 [
		{name:"counter",field_size:10,type:field_types.str_num,display_name:"Counter"},
		{name:"preset",field_size:10,type:field_types.str_num,display_name:"Preset"}
	 ]
	},
	{name:"Count Down",
	 color: "Lime  ",
	 template:{counter:"",preset:"1000"},
	 field_list:
	 [
		{name:"counter",field_size:10,type:field_types.str_num,display_name:"Counter"},
		{name:"preset",field_size:10,type:field_types.str_num,display_name:"Preset"}
	 ]
	},
	
	{name:"Reset Counter",
	 color: "LightSeaGreen  ",
	 template:{counter:""},
	 field_list:
	 [
		{name:"counter",field_size:10,type:field_types.str_num,display_name:"Counter"},
	 ]
	}
	
];			


function addCond()
{
	cond_db[cond_db.length]={condition:"",actions:new Array()};
	updateLabels();
	saveLocal();
	refreshProg(true);
}

var condClipboard=null;
var labelClipboard=null;
var actionClipboard=null;

function condCopy(cond_num)
{
	labelClipboard=null;
	condClipboard=cond_db[cond_num];
	
	var i;	
	for(i=0;i<labels.length;i++)
	{
		if (labels[i].cond==cond_num)
		{
			labelClipboard=labels[i];
			break;
		}
	}
}


function condCut(cond_num)
{
	labelClipboard=null;
	condClipboard=cond_db[cond_num];
	
	var i;	
	for(i=0;i<labels.length;i++)
	{
		if (labels[i].cond==cond_num)
		{
			labelClipboard=labels[i];
			break;
		}
	}
	delCond(cond_num);
}

function moveLabelsBelow(cond)
{
    for(i=0;i<labels.length;i++)
	{
		if (labels[i].cond>=cond)
		{
			labels[i].cond++;
		}
	}

}

function condPasteAbove(cond_num)
{
	var tmp;
	if (condClipboard==null)
	{
		return;
	}
    moveLabelsBelow(cond_num);
	if (cond_num==0)
	{
		cond_db.splice(0,0,{condition:condClipboard.condition,actions:clone(condClipboard.actions)});
		if (labelClipboard!=null)
		{
			labels[labels.length]={cond:0,title:labelClipboard.title};
		}
	
	}
	else
	{
		cond_db.splice(cond_num,0,{condition:condClipboard.condition,actions:clone(condClipboard.actions)});
		if (labelClipboard!=null)
		{
			labels[labels.length]={cond:cond_num,title:labelClipboard.title};
		}
	}
	//condClipboard=null;
	//labelClipboard=null;
	
	setupLabelPointers();
	saveLocal();
	refreshProg(true);
}


function condPasteBelow(cond_num)
{
	var tmp;
	if (condClipboard==null)
	{
		return;
	}
	
    moveLabelsBelow(cond_num+1);
    
	len=cond_db.length;
	if (cond_num==(cond_db.length-1))
	{
		cond_db.splice(len,0,{condition:condClipboard.condition,actions:clone(condClipboard.actions)});
		if (labelClipboard!=null)
		{
			labels[labels.length]={cond:len,title:labelClipboard.title};
		}
	}
	else
	{
		cond_db.splice(cond_num+1,0,{condition:condClipboard.condition,actions:clone(condClipboard.actions)});
		if (labelClipboard!=null)
		{
			labels[labels.length]={cond:cond_num+1,title:labelClipboard.title};
		}
	}
	
	
	//condClipboard=null;
	//labelClipboard=null;
	
	setupLabelPointers();
	saveLocal();
	refreshProg(true);
}


/*function condMoveUp(cond_num)
{
	var tmp;
	if (cond_num==0)
	{
		return;
	}
	else
	{
		tmp=cond_db[cond_num-1];
		cond_db[cond_num-1]=cond_db[cond_num];
		cond_db[cond_num]=tmp;
		updateLabels();
		saveLocal();
		refreshProg(true);
	}
}
*/

function condAddAbove(cond_num)
{
	var tmp;
    moveLabelsBelow(cond_num);
	if (cond_num==0)
	{
		cond_db.splice(0,0,{condition:"",actions:new Array()});
	}
	else
	{
		cond_db.splice(cond_num,0,{condition:"",actions:new Array()});
	}
	updateLabels();
	
	saveLocal();
	refreshProg(true);
}

function condAddBelow(cond_num)
{
	var tmp;
	var len;
	len=cond_db.length;
    moveLabelsBelow(cond_num+1);
	if (cond_num==(cond_db.length-1))
	{
		cond_db.splice(len,0,{condition:"",actions:new Array()});
	}
	else
	{
		cond_db.splice(cond_num+1,0,{condition:"",actions:new Array()});
	}
	updateLabels();
	
	saveLocal();
	refreshProg(true);
}

/*function condMoveDown(cond_num)
{
	if (cond_num==(cond_db.length-1))
	{
		return;
	}
	else
	{
		tmp=cond_db[cond_num+1];
		cond_db[cond_num+1]=cond_db[cond_num];
		cond_db[cond_num]=tmp;
		updateLabels();
		saveLocal();
		refreshProg(true);
	}
}
*/



function delCond(con_num)
{
	delLabel(con_num);
	cond_db.splice(con_num,1);
	updateLabels();
	saveLocal();
	refreshProg(true);
}


function actionCut(cond_num,act_num)
{
	actionClipboard=cond_db[cond_num].actions[act_num];
	delAction(cond_num,act_num);
}

function actionCopy(cond_num,act_num)
{
	actionClipboard=cond_db[cond_num].actions[act_num];
}


function actionPasteAbove(cond_num,act_num)
{
	if (actionClipboard==null)
	{
		return;
	}
	cond_db[cond_num].actions.splice(act_num,0,clone(actionClipboard));
	saveLocal();
	refreshProg(true);
}

function actionPasteBelow(cond_num,act_num)
{
	if (actionClipboard==null)
	{
		return;
	}

	cond_db[cond_num].actions.splice(act_num+1,0,clone(actionClipboard));
	saveLocal();
	refreshProg(true);
}


function delAction(cond_num,act_num)
{
	cond_db[cond_num].actions.splice(act_num,1);
	
	saveLocal();
	refreshProg(true);
}

function addAction(cond_num,actTypeId)
{
	var elem=this.document.getElementById(actTypeId);
	var tmp=parseInt(elem.value);
	var ind=cond_db[cond_num].actions.length;
	
	cond_db[cond_num].actions[ind]=clone(act_desc[tmp].template);
	cond_db[cond_num].actions[ind].act_type=tmp;
	saveLocal();
	refreshProg(true);
}


/*function actMoveUp(cond_num,act_num)
{
	if (act_num==0)
	{
		return;
	}
	else
	{
		tmp=cond_db[cond_num].actions[act_num-1];
		cond_db[cond_num].actions[act_num-1]=cond_db[cond_num].actions[act_num];
		cond_db[cond_num].actions[act_num]=tmp;
		saveLocal();
		refreshProg(true);
	}
}
*/




/*function actMoveDown(cond_num,act_num)
{
	if (act_num==(cond_db[cond_num].actions.length-1))
	{
		return;
	}
	else
	{
		tmp=cond_db[cond_num].actions[act_num+1];
		cond_db[cond_num].actions[act_num+1]=cond_db[cond_num].actions[act_num];
		cond_db[cond_num].actions[act_num]=tmp;
		saveLocal();
		refreshProg(true);
	}
}
*/

var labelPointers=[];
function setupLabelPointers()
{
	var i;
	for(i=0;i<labels.length;i++)
	{
		labelPointers[i]=cond_db[labels[i].cond];
	}
}

// link labels to conditions
function updateLabels()
{
	var i,j;
	for(i=0;i<labels.length;i++)
	{
		for(j=0;j<cond_db.length;j++)
		{
			if (labelPointers[i]==cond_db[j])
			{
				labels[i].cond=j;
			}
		}
	}
}

function addLabelAbove(cond_num)
{
	labels[labels.length]={cond:cond_num,title:""};
	setupLabelPointers();
	refreshProg(true);
}

function delLabel(cond_num)
{
	var i;	
	for(i=0;i<labels.length;i++)
	{
		if (labels[i].cond==cond_num)
		{
			labels.splice(i,1);
			labelPointers.splice(i,1);
			saveLocal();
			refreshProg(true);
			break;
		}
	}
}

function changeLabel(id,cond_num)
{
	var i;
	var pos;
	var elem=this.document.getElementById(id);
	for(i=0;i<labels.length;i++)
	{
		if (labels[i].cond==cond_num)
		{
			pos=i;
			break;
		}
	}
	labels[pos].title=elem.value;
	saveLocal();
}



function changeCondElem(id,cond_num)
{
	var elem=this.document.getElementById(id);
	cond_db[cond_num].condition=elem.value;
	saveLocal();
}

function changeActionElem(id,cond_num,act_num,act_field)
{
	var elem=this.document.getElementById(id);
	var act_type=cond_db[cond_num].actions[act_num].act_type;
	if ((act_desc[act_type].field_list[act_field].type==field_types.str_num)||(act_desc[act_type].field_list[act_field].type==field_types.str_text_area))
	{
		cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=elem.value;		
	}
	else
	{
		cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=parseInt(elem.value);
	}
	saveLocal();
}

var actElem;
var actElemPos;
var actElemType;
var actSel;

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

function ContextMenuOnKeyDown(e)
{
	var jk=e;
	var n = (window.Event) ? e.which : e.keyCode;
	if (n==13) // enter
	{
		jk=actSel;
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

var contextMenuDisplayed=false;

function showContextMenu(event,elem_type)
{
	var p;
	var body;
	var sel_var_list;
	
	
	if ((event==2)&&((elem_type==expr_types.transfer_var)||(	elem_type==expr_types.hmi_var)))
	{
		return;	
	}
	
	grayOut(window.document,true);
	contextMenuDisplayed=true;
	
	actElem=this.document.activeElement;
	actElemPos=this.document.activeElement.selectionStart;
	actElemType=elem_type;


	
	
	
	//var x = (window.innerWidth / 2) - (cont_menu_div.offsetWidth / 2);
   //var y = (window.offsetHeight / 2) - (cont_menu_div.offsetHeight / 2);        
	
	
	//cont_menu_div.style.left=mouseX+window.document.body.scrollLeft;
	//cont_menu_div.style.top=mouseY+window.document.body.scrollTop;
   //cont_menu_div.style.left=x+window.document.body.scrollLeft;
	//cont_menu_div.style.top=y+window.document.body.scrollTop;


	
	
	body=window.document.getElementsByTagName('body');
	//body[0].bgColor="grey";
	
	// render select box based on the form element
	
	cont_menu_div.style.zIndex=100;

	cont_menu_div.style.display="block";
   cont_menu_div.style.position="fixed";
	sel_var_list="";

	if (event==0)  // prog vars
	{
		if ((elem_type==expr_types.cond)||(elem_type==expr_types.act))
		{	
			sel_var_list=genVarDest("@",(1<<var_type.prog)|(1<<var_type.plc)|(1<<var_type.timer));
		}
		if ((elem_type==expr_types.transfer_var)||(	elem_type==expr_types.hmi_var)||(elem_type==expr_types.hmi_expr))
		{
			sel_var_list=genVarDest("@",(1<<var_type.prog));
		}
	}
	else if (event==1)  // IO vars
	{
		if ((elem_type==expr_types.cond)||(elem_type==expr_types.act))
		{	
			sel_var_list=genVarDest("@",(1<<var_type.io));
		}
	}
	else  // functions
	{
		// basic functions
		sel_var_list= "<option disabled value=\"\"></option>"+
		               "<optgroup label=\"Math\">"+
								"<option value=\"+\">+</option>"+
								"<option value=\"-\">-</option>"+								
								"<option value=\"*\">*</option>"+
								"<option value=\"/\">/</option>"+
								"<option value=\"%\">% - Modulo</option>"+
								"<option value=\"abs()\">abs()</option>"+
								"<option value=\"min(,)\">min(,)</option>"+
								"<option value=\"max(,)\">max(,)</option>"+
                     "</optgroup>"+
							"<optgroup label=\"Brackets\">"+
								"<option value=\"()\">()</option>"+
							"</optgroup>"+
							"<optgroup label=\"Boolean Logic\">"+
								"<option value=\"&\">&     Boolean AND</option>"+
								"<option value=\"|\">|     Boolean OR</option>"+
								"<option value=\"!\">!     Boolean NOT</option>"+
							"</optgroup>"+
							"<optgroup label=\"Compare\">"+
								"<option value=\">\">></option>"+
								"<option value=\">=\">>=</option>"+
								"<option value=\"<\"><</option>"+
								"<option value=\"<=\"><=</option>"+
								"<option value=\"=\">=    Equal</option>"+								
								"<option value=\"<>\"><>    Not Equal </option>";
		if ((elem_type==expr_types.cond)||(elem_type==expr_types.act))
		{
			sel_var_list+="<option value=\"F_COS(,)\">F_COS(,)  Change of State&nbsp&nbsp</option>"+
							"</optgroup>"+
							"<optgroup label=\"Timer/Counter\">"+
								"<option value=\"count()\">count()</option>"+
								"<option value=\"expired()\">expired()</option>";
		}
		sel_var_list+="</optgroup>";
	
	}
	
	
	
	cont_menu_div.innerHTML="<select size=\"20\"  id=\"cont_menu_sel1\" onclick=\"changeContextMenu()\" onblur=\"hideContextMenu();\" >"+sel_var_list+"</select>";
	
	
	
	p=window.document.getElementById('cont_menu_sel1');
	//console.log(actElem);
	//console.log(actElemPos);
	//p.focus();
	
	actSel=p;
	
	p.onkeydown=ContextMenuOnKeyDown;
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

function hideContextMenu()
{
	cont_menu_div.style.display="none";
	grayOut(window.document,false);
	contextMenuDisplayed=false;
	actElem.focus();
}


function changeContextMenu()
{
	var p;
	var val;
	p=window.document.getElementById('cont_menu_sel1');
	val=p.options[p.selectedIndex].value;
	p.selectedIndex=0;
	hideContextMenu();
	
	insert_val_prog_scr1(val,actElem,actElemPos,actElemType);
	actElem.focus();
	
	
}


function actOnKeyDown(event,event_type)
{
	var n = (window.Event) ? event.which : event.keyCode;
	if ((event.ctrlKey==true)&&(n==81)) // ctrl-Q
	{	
		showContextMenu(0,event_type);
		return false;
	}
	if ((event.ctrlKey==true)&&(n==73)) // ctrl - I
	{
		showContextMenu(1,event_type);
		return false;
	}
	if ((event.ctrlKey==true)&&(n==70)) // ctrl - f
	{
		showContextMenu(2,event_type);
		return false;
	}
	
	return true;
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

function renderAction(cond_num,act_num,largest_act,rw)
{
	var outp="";
	var i,j;
	var color;
	var act_type=cond_db[cond_num].actions[act_num].act_type;
	
	if (rw==true)
	{
		var funcInvStr="showCondMenu(this,"+floatMenuType.action+","				+cond_num+","+act_num+");";
		outp+="<tr><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+act_num+".</a>";
		
	
	}
	else
	{
		outp+="<tr ><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\" >"+act_num+".";
	}
	outp+="</td>";
	
	color=act_desc[act_type].color;
	outp+="<td style=\"white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"  bgcolor="+color+">"+act_desc[act_type].name+"</td>";
   //outp+="<TD style=\"padding-bottom:12px; padding-top:7px; \" ><table style=\"width:100%;\">";
	outp+="<TD style=\"padding-bottom:5px; padding-top:5px; \" ><table style=\"width:100%;\">";
	
	for(i=0;i<act_desc[act_type].field_list.length;i++)
	{
		outp+="<TR><TD width=\"1px\"><B>";				
		outp+=act_desc[act_type].field_list[i].display_name+":";
		outp+="</B></TD><TD>";				
		
		if (act_desc[act_type].field_list[i].type==field_types.str_num)
		{
			//size=\""+act_desc[act_type].field_list[i].field_size+"\"
			if (rw==true)
			{
				if (computer_interface==false)
				{
					outp+="<input type=\"text\" style=\"width:100%;\"   onfocus=\"return showEditBox(this,"+expr_types.act+","+cond_num+","+act_num+","+i+",0);\"   value=\""+escapeHTML(cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name])+"\" id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
				}
				else
				{
					outp+="<input type=\"text\" style=\"width:100%;\"  onkeydown=\"return actOnKeyDown(event,"+expr_types.act+");\"    value=\""+escapeHTML(cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name])+"\" id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
				}

				
				/*outp+="<input type=\"text\" style=\"width:100%;\" contextmenu=\"supermenu\" value=\""+cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]+"\" id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onchange=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
				*/
			}
			else
			{
				outp+=cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name];
			}
				
		}
		else if (act_desc[act_type].field_list[i].type==field_types.str_text_area)
		{
			if (rw==true)
			{
				outp+="<textarea type=\"text\" style=\"width:100%;\"   id=\"act_"+cond_num+"_"+act_num+"_"+i+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">"+cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]+"</textarea>";
			}
			else
			{
				outp+=cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name];
			}
		}
		else
		{
			// enumeration
			if (rw==true)
			{
				outp+="<select id=\"act_"+cond_num+"_"+act_num+"_"+i+"_"+"\" onblur=\"changeActionElem(this.id,"+cond_num+","+act_num+","+i+")\">";
				for(j=0;j<act_desc[act_type].field_list[i].enum_elems.length;j++)
				{
					if (cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]==j)
					{
						outp+="<option value=\""+j+"\" selected>"+act_desc[act_type].field_list[i].enum_elems[j]+"</option>";
					}
					else
					{
						outp+="<option value=\""+j+"\">"+act_desc[act_type].field_list[i].enum_elems[j]+"</option>";
					}
				}
				outp+="</select>";
			}
			else
			{
				outp+=act_desc[act_type].field_list[i].enum_elems[cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]];
			}
		}
		outp+="</td></TR>";
	}
	
	outp+="</table></TD>";
/*	
	if (rw==true)
	{
		//outp+="<td width=300 bgcolor=#EFEFFB>";
		outp+="<td style=\"padding-bottom:20px;\" width=240  bgcolor=#EFEFFB>";
		outp+="<br>";
		outp+="<button  onclick=\"delAction("+cond_num+","+act_num+");\">Delete Action</button>";
		outp+="<button  onclick=\"actMoveUp("+cond_num+","+act_num+");\">Move Up</button>";
		outp+="<button  onclick=\"actMoveDown("+cond_num+","+act_num+");\">Move Down</button>";
		outp+="</td>";
	};
	*/
	
	outp+="</tr>";
	return outp;
}

// from http://stackoverflow.com/questions/442404/dynamically-retrieve-the-position-x-y-of-an-html-element
/*function findPos(obj) {
 var obj2 = obj;
 var curtop = 0;
 var curleft = 0;
 if (document.getElementById || document.all) {
  do  {
   curleft += obj.offsetLeft-obj.scrollLeft;
   curtop += obj.offsetTop-obj.scrollTop;
   obj = obj.offsetParent;
   obj2 = obj2.parentNode;
   while (obj2!=obj) {
    curleft -= obj2.scrollLeft;
    curtop -= obj2.scrollTop;
    obj2 = obj2.parentNode;
   }
  } while (obj.offsetParent)
 } else if (document.layers) {
  curtop += obj.y;
  curleft += obj.x;
 }
 return [curtop, curleft];
}   // end of findPos()
*/

// from http://vishalsays.wordpress.com/2007/12/21/finding-elements-top-and-left-using-javascript/
/*function findPos(elm)
{
	var x, y = 0;

	//set x to elm�s offsetLeft
	x = elm.offsetLeft;


	//set y to elm�s offsetTop
	y = elm.offsetTop;

	

	//set elm to its offsetParent
	elm = elm.offsetParent;


	//use while loop to check if elm is null
	// if not then add current elm�s offsetLeft to x
	//offsetTop to y and set elm to its offsetParent

	while(elm != null)
	{

	x = parseInt(x) + parseInt(elm.offsetLeft);
	y = parseInt(y) + parseInt(elm.offsetTop);
	y+=elm.scrollTop;
	elm = elm.offsetParent;
	}

	
	//here is interesting thing
	//it return Object with two properties
	//Top and Left

	return [y,x];
}*/

//http://www.kirupa.com/html5/get_element_position_using_javascript.htm
function findPos(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return [yPosition-20,xPosition];
}



function testMenuButton(id)
{
	var test=2;
	hideCondMenu();
}


var floatMenuType=
{
	action:0,
	condition:1,
	hmi_screen_list:2,
	hmi_section:3,
	hmi_sect_elem:4
};

function showCondMenu(id,type,var1,var2)
{
	var elem=id;
	var tmp21=findPos(elem);
	var tmp=23;
	var tbl="<table align=\"center\">"
	
	
	
	if (type==floatMenuType.condition)
	{
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condAddBelow("+var1+");hideCondMenu();\">Add Condition Below</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condAddAbove("+var1+");hideCondMenu();\">Add Condition Above</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"addLabelAbove("+var1+");hideCondMenu();\">Add Label Above</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condCopy("+var1+");hideCondMenu();\">Copy</button></td></tr>"		
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condCut("+var1+");hideCondMenu();\">Cut</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condPasteAbove("+var1+");hideCondMenu();\">Paste Above</button></td></tr>"
		tbl+="<tr><td><button style=\"width:100%;\"  type=\"button\"  onclick=\"condPasteBelow("+var1+");hideCondMenu();\">Paste Below</button></td></tr>"
	}
	else if (type==floatMenuType.action)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionCopy("+var1+","+var2+");hideCondMenu();\">Copy</button></td></tr>";	
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionCut("+var1+","+var2+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionPasteAbove("+var1+","+var2+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"actionPasteBelow("+var1+","+var2+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	else if (type==floatMenuType.hmi_screen_list)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListCopy("+var1+");hideCondMenu();\">Copy</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListCut("+var1+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListPasteAbove("+var1+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiScrListPasteBelow("+var1+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	else if (type==floatMenuType.hmi_section)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectCopy("+var1+");hideCondMenu();\">Copy</button></td></tr>";	
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectCut("+var1+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectPasteAbove("+var1+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectPasteBelow("+var1+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	else if (type==floatMenuType.hmi_sect_elem)
	{
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemCopy("+var1+","+var2+");hideCondMenu();\">Copy</button></td></tr>";	
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemCut("+var1+","+var2+");hideCondMenu();\">Cut</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemPasteAbove("+var1+","+var2+");hideCondMenu();\">Paste Above</button></td></tr>";
		tbl+="<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"hmiSectElemPasteBelow("+var1+","+var2+");hideCondMenu();\">Paste Below</button></td></tr>";
	}
	
	
	
   tbl+="</table>"
	
	var act_menu;
	act_menu=window.document.getElementById("act_menu");
	act_menu.innerHTML=tbl;
	act_menu.style.display="block";
   act_menu.style.position="absolute";
	act_menu.style.left=tmp21[1]+id.offsetWidth+10+"px";
	act_menu.style.top=tmp21[0]+"px";
	act_menu.style.zIndex="100";
	return false;
}


function hideCondMenu()
{
	var act_menu=window.document.getElementById("act_menu");
	act_menu.style.display="none";
}

var symbols_in_onscr_keyboard="1234567890+-*/!%&|<>=()";

// from http://stackoverflow.com/questions/8985805/orientation-change-in-android-using-javascript
function is_landscape()
{
    var uagent = navigator.userAgent.toLowerCase();
	 if (window.orientation==undefined)
	 {
		return false;
	 }
    if (( window.orientation==90 )||( window.orientation==-90 ))
    {
        return true;
    }
    else 
    {
        return false;
    }
    
}


var edit_box_pos=0;
var edit_box_str="";
var edit_box_args=[];
var edit_box_rendered=false;
var edit_box_only_var;

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

var expr_types=
{
	cond:0,
	act:1,
	act_var:2,
	act_timer:3,
	transfer_var:4,
	hmi_expr:5,
	hmi_var:6
};

function handleEditBoxDone(update)
{
		// update the database
		if (edit_box_args[0]==expr_types.cond)
		{
			var cond_num=edit_box_args[1];
			if (update==true)
			{
				cond_db[cond_num].condition=edit_box_str;
			}
			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawVars(true);
			refreshProg(true);
			prog_div.scrollTop=edit_box_args[5];
			return;
		}
		if ((edit_box_args[0]==expr_types.act)||(edit_box_args[0]==expr_types.act_var)||(edit_box_args[0]==expr_types.act_timer))
		{
			var cond_num=edit_box_args[1];
			var act_num=edit_box_args[2];
			var act_field=edit_box_args[3];
			var act_type=cond_db[cond_num].actions[act_num].act_type;
			if (update==true)
			{			
				if ((act_desc[act_type].field_list[act_field].type==field_types.str_num)||(act_desc[act_type].field_list[act_field].type==field_types.str_text_area))
				{
					cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=edit_box_str;		
				}
				else
				{
					cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[act_field].name]=parseInt(edit_box_str);
				}
			}

			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawVars(true);
			refreshProg(true);
			prog_div.scrollTop=edit_box_args[5];
			return;
		}
		if (edit_box_args[0]==expr_types.transfer_var)
		{
			if (update==true)
			{
				var_db[var_type.m2m].var_list[edit_box_args[1]].var_list[edit_box_args[2]].name=edit_box_str;
			}
			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawVars(true);
			refreshProg(true);
			return;
		}
		if ((edit_box_args[0]==expr_types.hmi_expr)||(edit_box_args[0]==expr_types.hmi_var))
		{
			var type=screens[edit_box_args[1]].rows[edit_box_args[2]][0].sect_elems[edit_box_args[3]].type;	
			var elem=screens[edit_box_args[1]].rows[edit_box_args[2]][0].sect_elems[edit_box_args[3]];			
			if (update==true)
			{
				elem[section_elem_defs[type].elem_list[edit_box_args[4]].elem_name]=edit_box_str;
			}
			edit_box_rendered=false;
			adjustMenuScreen(1);
			saveLocal();
			redrawScreenList();
			refreshCurrScreen();
			return;
		}
}

var buttonTimer;
var lastButton=null;

function buttonTimerTask()
{
	onEditBoxButtonClick(null,lastButton);

}

function startButtonTimer(btn)
{
	if (lastButton==null)
	{
		lastButton=btn;
		buttonTimer=setInterval(buttonTimerTask,100);
	}
}

function stopButtonTimer()
{
	lastButton=null;
	clearInterval(buttonTimer);	
}


function onEditBoxButtonClick(event,btn)
{
	var text_ar=document.getElementById("edit_box");
	var edit_box_str_with_cursor;
	
	if (event!=null)
	{
		event.preventDefault();
	}
	
	if (btn.innerHTML=='done.')  // return 
	{
		handleEditBoxDone(true);
	}
	else if (btn.innerHTML=='\u2190') // left arrow
	{
		startButtonTimer(btn);
		if (edit_box_pos>0)
		{
			edit_box_pos--;
		}
	}
	else if (btn.innerHTML=='\u2192') // right arrow
	{
		startButtonTimer(btn);
		if (edit_box_pos<edit_box_str.length)
		{
			edit_box_pos++;
		}
	}
	else if (btn.innerHTML=='del') // delete
	{
		startButtonTimer(btn);
		if (edit_box_pos>0)
		{
			edit_box_pos--;
			edit_box_str=edit_box_str.splice(edit_box_pos,1,"");
		}
	}
	else if (btn.innerHTML=='true') // special symbol
	{
		edit_box_str=edit_box_str.splice(edit_box_pos,0,btn.innerHTML);
		edit_box_pos+=4;
	}
	else if (btn.innerHTML=='false') // special symbol
	{
		edit_box_str=edit_box_str.splice(edit_box_pos,0,btn.innerHTML);
		edit_box_pos+=5;
	}

	else
	{
		// remap some characters
		var chr=btn.innerHTML;
		if (chr=="&lt;")
		{
			chr="<";
		}
		else if (chr=="&gt;")
		{
			chr=">";
		}
		else if (chr=="&amp;")
		{
			chr="&";
		}
		edit_box_str=edit_box_str.splice(edit_box_pos,0,chr);
		edit_box_pos++;
		
	}
	
	if (edit_box_pos>=edit_box_str.length)
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,0,"_");
	}
	else
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,1,"<u>"+edit_box_str.charAt(edit_box_pos)+"</u>");
	}
		
	text_ar.innerHTML=edit_box_str_with_cursor;
	
	return false;
}

function editBoxSelect(el)
{
	var val=el.options[el.selectedIndex].value;
	var text_ar=document.getElementById("edit_box");
	var edit_box_str_with_cursor;
	var i;
	
	if (edit_box_only_var==true)
	{
		edit_box_str=val;
		edit_box_pos=val.length;
		handleEditBoxDone(true);
	}
	
	
	// inser the selected function name at the cursor position
	edit_box_str=edit_box_str.splice(edit_box_pos,0,val);
	edit_box_pos+=val.length;
	
	if (edit_box_pos>=edit_box_str.length)
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,0,"_");
	}
	else
	{
		edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,1,"<u>"+edit_box_str.charAt(edit_box_pos)+"</u>");
	}
		
	text_ar.innerHTML=edit_box_str_with_cursor;
	
	
	// find disabled item and assign the index to it;
	el.selectedIndex=0;
}

//padding:0.3em;

function hideAddressBar(){
  if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
  {
    document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
  }
  window.scrollTo(1,1);
}



function genVarDest(selected, var_types_bitmask)
{
	var i,j,k,ind;
	var list="";
	for(i=0;i<var_db.length;i++)
	{
		if ((var_types_bitmask&(1<<i))!=0)
		{
			// PLC connected is not part of this list since it is for destination variables only (maybe also for transfer variables)
			if (i==0)
			{
				// add fixed variables
				list+="<optgroup label=\" Status Variables \"></optgroup>";
				list+="<option value=\'"+"PLC.connected"+"\'>&nbsp PLC.connected</option>";
				list+="<option value=\'"+"PROG.cycleTime"+"\'>&nbsp PROG.cycleTime</option>";
			}
			if (var_db[i].var_list.length>0)
			{
				list+="<optgroup label=\" "+var_db_names[i]+"\"></optgroup>";
			}
			
			for(j=0;j<var_db[i].var_list.length;j++)
			{
				if (selected==var_db[i].var_list[j].name)
				{
					list+="<option value=\'"+var_db[i].var_list[j].name+"\' selected>&nbsp "+var_db[i].var_list[j].name
					+"</option>";
				}
				else
				{
					list+="<option value=\'"+var_db[i].var_list[j].name+"\'>&nbsp "+var_db[i].var_list[j].name
					+"</option>";
				}
			}
		}
	}
	if ((var_types_bitmask&(1<<var_type.io))!=0)
	{
		list+="<optgroup label=\"IO\"></optgroup>";
		for(i=0;i<IO.length;i++)
		{
			list+="<optgroup label=\"&nbsp Slot"+i+" ("+IO[i]+")\"></optgroup>";
			ind=findIndex(IO[i]);
			for(j=0;j<slices[ind].sections.length;j++)
			{
				list+="<optgroup label=\"&nbsp&nbsp "+sect_names[slices[ind].sections[j].type]+"\"></optgroup>";
				for(k=0;k<slices[ind].sections[j].objects.length;k++)
				{
					list+="<option value=\'IO.Slot"+i+"."+sect_names[slices[ind].sections[j].type]+"."+convertString(slices[ind].sections[j].objects[k].name)+"\'>&nbsp&nbsp&nbsp "+slices[ind].sections[j].objects[k].name+"</option>";
				}
			}
		}
	}
	return list;
}
	
 window.onorientationchange = function()
 {
   redrawEditBox();
 };	
	
function redrawEditBox()
{
	var pos;
	var i,j;
	var num_in_row;
	var button_class="\"larger_button1\"";

	var elm;
	var sel_var_list;
	var only_var;

	
	if (edit_box_rendered==false)
	{
		return;
	}
	var outp="";
	prog_div.innerHTML="";

	outp+="<div id=\"edit_box\" style=\"position:absolute;top:0.4em;font-family:monospace;overflow-x:auto;  font-size:20px; font-weight:bold; width:98%;  border-radius:2px; white-space: nowrap;    border: solid 1px #ccc;     padding:0.1em;     background-color: #f5f5f5;    box-shadow: inset 0 2px 3px rgba(0,0,0,0.2); \"><u>&nbsp</u> </div>";

	
	edit_box_only_var=false;
	if (edit_box_args[0]==expr_types.act_var)	
	{
		sel_var_list=genVarDest("@",(1<<var_type.prog)|(1<<var_type.plc));
		edit_box_only_var=true;
	}
	
	if (edit_box_args[0]==expr_types.act_timer)	
	{
		sel_var_list=genVarDest("@",(1<<var_type.timer));
		edit_box_only_var=true;
	}
	
	if ((edit_box_args[0]==expr_types.cond)||(edit_box_args[0]==expr_types.act))
	{	
		sel_var_list=genVarDest("@",(1<<var_type.prog)|(1<<var_type.plc)|(1<<var_type.timer));
	}
	

	if ((edit_box_args[0]==expr_types.transfer_var)||(	edit_box_args[0]==expr_types.hmi_var))
	{
		sel_var_list=genVarDest("@",(1<<var_type.prog));
		edit_box_only_var=true;
	}
	
	if (edit_box_args[0]==expr_types.hmi_expr)
	{	
		sel_var_list=genVarDest("@",(1<<var_type.prog));
	}
	
	
	
	outp+="<div style=\"position:absolute;top:3.5em;height:3em;width:98%;\">";

	
	var sel_func_code="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>Functions</option>"+
						  
						  "<optgroup label=\"Math\">"+
								"<option value=\"abs\">abs</option>"+
								"<option value=\"min\">min</option>"+
								"<option value=\"max\">max</option>"+
                     "</optgroup>"+
							"<optgroup label=\"Change Of State\">"+
								"<option value=\"F_COS\">F_COS</option>"+
							"</optgroup>"+
							"<optgroup label=\"Timer/Counter\">"+
								"<option value=\"count\">count</option>"+
								"<option value=\"expired\">expired</option>"+
							"</optgroup>"+
							""+
						 "</select>";


	var sel_func_hmi="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>Functions</option>"+
						  
						  "<optgroup label=\"Math\">"+
								"<option value=\"abs\">abs</option>"+
								"<option value=\"min\">min</option>"+
								"<option value=\"max\">max</option>"+
                     "</optgroup>"+
							""+
						 "</select>";
						 
		
	
	var sel_vars="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>Variables</option>"+sel_var_list+"<option disabled ></option><option disabled ></option><option disabled ></option>"+
						 "</select>";

	var sel_IO="<select onchange=\"editBoxSelect(this)\" class=\"but_select larger_button0\"><option disabled selected>I/O</option>"+var_io_list+""+
						 "</select>";
	

	if (edit_box_only_var==false)
	{
		if (edit_box_args[0]!=expr_types.hmi_expr)
		{
			outp+=sel_func_code;
		}
		else
		{
			outp+=sel_func_hmi;
		}
	}
	outp+=sel_vars;
	if ((edit_box_args[0]!=expr_types.act_timer)&&
	    (edit_box_args[0]!=expr_types.transfer_var)&&
		 (edit_box_args[0]!=expr_types.hmi_expr)&&
		 (edit_box_args[0]!=expr_types.hmi_var))
	{
		outp+=sel_IO;
	}
	
	if (edit_box_only_var==true)
	{
		outp+="<br><br><button onmousedown=\"onEditBoxButtonClick(event,this);\" class="+button_class+">done.</button>"; // return button
	}
	
	outp+="</div>";
	
	
	if (edit_box_only_var==false)
	{
		outp+="<div style=\"position:absolute; top:6.5em;bottom:0px; width:98%; \">";
		pos=0;
		if (is_landscape()==true)
		{
		
			outp+="<table cellspacing=\"0\"  cellpadding=\"0\" border=\"0\" style=\"border-spacing:0px; width:100%; height:100%;border-collapse:collapse;  \" >";	
			num_in_row=10;
			
			outp+="<tr>";
			outp+="<TD colspan=\"2\">";
			outp+="<button id=\"left_arrow\" ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2190</button>"; // left arrow
			outp+="</TD>";
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">del</button>"; // delete button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="<TD colspan=\"1\">";
			outp+="<button onmousedown=\"onEditBoxButtonClick(event,this);\" class="+button_class+">done.</button>"; // return button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2192</button>"; // right arrow
			outp+="</TD>";
			
			outp+="</tr>";
			
			//outp+="<tr><td>&nbsp</td></tr>";
		}
		else
		{
			outp+="<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\" border-spacing:0px;width:100%; height:100%;border-collapse:collapse;  \" >";	
			num_in_row=5;
			
			outp+="<tr>";
			outp+="<TD colspan=\"2\">";
			outp+="<button id=\"left_arrow\" ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2190</button>"; // left arrow
			outp+="</TD>";
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">\u2192</button>"; // right arrow
			outp+="</TD>";

			outp+="</tr>";
			
			//outp+="<tr><td>&nbsp</td></tr>";
			
			outp+="<TD colspan=\"2\">";
			outp+="<button ontouchend=\"stopButtonTimer();\" ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+">del</button>"; // delete button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="<TD colspan=\"2\">";
			outp+="<button onmousedown=\"onEditBoxButtonClick(event,this);\" class="+button_class+">done.</button>"; // return button
			outp+="</TD>";
			
			outp+="<TD></TD>";

			outp+="</tr>";

			
			//outp+="<tr><td>&nbsp</td></tr>";

		}
		
					 
		
		for(i=0;;i++)
		{
			outp+="<tr>";
			for(j=0;j<num_in_row;j++)
			{
				
				if (pos>=symbols_in_onscr_keyboard.length)
				{
					break;
				}
				outp+="<td style=\"padding:0; width:"+100/num_in_row+"%;\">";
				outp+="<button ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+" >"+symbols_in_onscr_keyboard[pos]+"</button>";
				pos++;
				outp+="</td>";
				
			}

			if (pos>=symbols_in_onscr_keyboard.length)
			{
				// add true & false
				outp+="<td style=\"padding:0; width:"+100/num_in_row+"%;\">";
				outp+="<button ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+" >true</button>";
				outp+="</td>";
				outp+="<td style=\"padding:0; width:"+100/num_in_row+"%;\">";
				outp+="<button ontouchstart=\"onEditBoxButtonClick(event,this);\" class="+button_class+" >false</button>";
				outp+="</td>";

			
				outp+="</tr>";
				break;
			}
			outp+="</tr>";
			//outp+="<br><br>";
		}
		outp+="</table>";
		
		outp+="</div>";
	}
	
	
	
	
	prog_div.innerHTML=outp;
	
	var text_ar=document.getElementById("edit_box");
	edit_box_pos=edit_box_str.length;
	edit_box_str_with_cursor=edit_box_str.splice(edit_box_pos,0,"_");
	text_ar.innerHTML=edit_box_str_with_cursor;
}

function showEditBox(id,type,arg1,arg2,arg3,arg4)
{
	var i;
	id.blur();
	// increase the prog_div to 100% width of the screen.
	edit_box_rendered=true;
	adjustMenuScreen(-1);

	//margin-top:1em; 
	
	
	edit_box_str=id.value;
	// preprocess the string and remove any newline characters
	//edit_box_str=edit_box_str.replace(/(\r\n|\n|\r)/gm,"");
	
	
	
	// if the destination is variable - only display the variable list
	if (type==expr_types.act)
	{
		// recalculate the type if the action item=0 (target)
		if (arg3==0)
		{
			var cond_num=arg1;
			var act_num=arg2;
			var act_type=cond_db[cond_num].actions[act_num].act_type;
			// first field is always a destination variable;
			if ((act_type==act_types.timer_start)||(act_type==act_types.ton)||(act_type==act_types.toff)||(act_type==act_types.ctu)||(act_type==act_types.ctd))
			{
				type=expr_types.act_timer;
			}
			else
			{
				type=expr_types.act_var;
			}
		}
	}
	

	if ((type==expr_types.cond)||(type==expr_types.act)||(type==expr_types.act_var)||(type==expr_types.act_timer))
	{
		edit_box_args=[type,arg1,arg2,arg3,arg4,prog_div.scrollTop];
	}
	else
	{
		edit_box_args=[type,arg1,arg2,arg3,arg4,0];
	}
	
	redrawEditBox();

	return false;
}

function refreshProg(rw)
{
	var i,j,outp,tbl,k;
	var largest_act;
	prog_div.innerHTML="<h2> ARGEE Program </h2><br>";


	
	
	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	
	
	if ((computer_interface==true)&&(rw==true))
	{
		prog_div.innerHTML+="Keyboard shortcuts: <br>Press Ctrl-q for list of program variables<br>"+
		                    "Press Ctrl-i for list of I/O variables<br>"+
								  "Press Ctrl-f for list of operations<br>"+
								  "These shortcuts work to enter variables and expressions in all the screens<br><br>"+
								  "In order to configure the IO of the station, follow the <a target=\"_blank\" href=\""+url_prefix+"\"> Link</a><br><br>";
								  
   }
	
	//style=\"height: 100%;\"
	tbl="<table width=\"100%\" style=\"border-collapse:collapse;\" border=\"1\">";
	/*tbl+="<tr height=\"20\" style=\"width:100%;\"><td width=\"5\" bgcolor=lightgrey>Condition<br> Number</td><td bgcolor=lightgrey>Condition Data</td></tr>";*/
	for(i=0;i<cond_db.length;i++)
	{
		//tbl+="<tr height=\"20\" style=\"width:100%;\"><td bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=#E6E6E6>";
		//tbl+="<tr height=\"20\" style=\"width:100%;\"><td bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=LightPink   >";
		for(j=0;j<labels.length;j++)
		{
			if (labels[j].cond==i)
			{
				tbl+="<tr height=\"40\" style=\"width:100%;\"><td bgcolor=\"yellow\" rowspan=\"1\" colspan=\"2\">";
				if (rw==true)
				{
				//color: #ff0000;
					tbl+="<input type=\"text\" value=\""+labels[j].title+"\" id=\"label_"+i+"\" style=\"width:100%;font-family: Verdna; font-style:italic; font-weight:bold;  font-size: 12px; color: Red   ;\" onblur=\"changeLabel(this.id,"+i+")\">";
					tbl+="<br><button style=\"float: left;\" onclick=\"delLabel("+i+");\">Delete Label</button>";
				}
				else
				{
					tbl+="<div style=\"width:100%;font-family: Verdna; font-style:italic; font-weight:bold;  font-size: 12px; color: Red   ;\">"+labels[j].title+"</div>";
				}
				tbl+="</td></tr>";
				
			}
		}
		
		if (rw==true)
		{
			var funcInvStr="showCondMenu(this,"+floatMenuType.condition+","				+i+","+0+");";
		   //id=\"cond_"+i+"\"
			tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\" bgcolor=#CECEF6 rowspan=\"3\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+i+".</a></td><td bgcolor=Tan   >";
		}
		else
		{
            //tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=Tan   >";        
            if (rungs_status[i]==true)
            {
                //
                tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=#99FF33   >";                
            }
            else
            {
                tbl+="<tr style=\"width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td><td bgcolor=#E8E8E8    >";                            
            
            }
		}
		if (rw==true)
		{
			tbl+="<fieldset><legend>Condition</legend>";
			if (computer_interface==false)
			{ 
				tbl+="<textarea style=\"width:100%;\" rows=\"2\"  id=\"cnd_"+i+"\"  onfocus=\"return showEditBox(this,"+expr_types.cond+","+i+",0,0,0);\" onblur=\"changeCondElem(this.id,"+i+")\">"+escapeHTML(cond_db[i].condition)+"</textarea><br>";
			}
			else
			{
				tbl+="<textarea onkeydown=\"return actOnKeyDown(event,"+expr_types.cond+");\" style=\"width:100%;\" rows=\"2\"  id=\"cnd_"+i+"\"   onblur=\"changeCondElem(this.id,"+i+")\">"+escapeHTML(cond_db[i].condition)+"</textarea><br>";
			}
			tbl+="</fieldset>";
		}
		else
		{
			tbl+="<fieldset><legend>Condition</legend>";
			tbl+=escapeHTML(cond_db[i].condition);
			tbl+="</fieldset>";
		}
		tbl+="</td></tr>"
		tbl+="<tr><td>"
		if (cond_db[i].actions.length!=0)
		{
			largest_act=0;
			for(j=0;j<cond_db[i].actions.length;j++)
			{
				if(act_desc[cond_db[i].actions[j].act_type].field_list.length>largest_act)
				{
					largest_act=act_desc[cond_db[i].actions[j].act_type].field_list.length;
				}
			}
		
			//style=\"height: 100%;\"
			tbl+="<fieldset><legend>Actions</legend>";
			tbl+="<table width=\"100%\" style=\"border-collapse:collapse;\"  border=\"1\">";	
			for(j=0;j<cond_db[i].actions.length;j++)
			{
				tbl+=renderAction(i,j,largest_act,rw);
			}
			tbl+="</fieldset>";
			tbl+="</table>";
		}
		tbl+="</td></tr>";
		
		if (rw==true)
		{
			tbl+="<tr style=\"height:50px\"><td>";
			outp="<select id=\"prog__act_sel_"+i+"\">";
			for(j=0;j<act_desc.length;j++)
			{
				if (act_desc[j].name!="")
				{
					outp+="<option value=\""+j+"\">"+act_desc[j].name+"</option>";
				}
			}
			outp+="</select>";
			tbl+=outp;
			tbl+="<button onclick=\"addAction("+i+",\'prog__act_sel_"+i+"\');\">Add Action</button><br>";
			tbl+="</td></tr>";
		}
		else
		{
			/*tbl+="<tr style=\"height:50px\"><td>";
			tbl+="</td></tr>";
			*/
			tbl+="<tr style=\"height:20px\"></tr>";
			
		}
	}
	tbl+="</table>";
	if (rw==true)
	{
		prog_div.innerHTML+=tbl+"<br>"+add_cond_str+"<br><br><br>";
	}
	else
	{
		prog_div.innerHTML+=tbl;
	}
}
			
var add_cond_str="<button type=\"button\" onclick=\"addCond();\">Add Condition</button>";

function eraseProject()
{
	var localSettrings=localStorage.settings;
	var ip=localStorage.def_ip;
	localStorage.clear();
	localStorage.settings=localSettrings;
	localStorage.def_ip=ip;
	
}

function initProj(flowch)
{
	var_db=clone(var_db_template);
	cond_db=[];
	screens=[];
	labels=[];
	flowchart={constants:[0,0],timer_exp:[0,0],counter_preset:[0,0],rungs:[]};
	if (flowch==true)
	{
		editor="flowchart";	
	}
	else
	{
		editor="regular";
	}

}

function clearProject()
{
	var i;
	var r=confirm("Erase Project?");
	if (r==true)
	{
		initProj(true);
		showFlowchart();
		renderMenu("Flowchart");
		/*
	
		initProj(false);
		eraseProject();
		adjustMenuScreen(1);
		var_display=false;
		monitoring_mode=false;
		redrawVars(true);
		refreshProg(true);
		updateContextMenu();
		renderMenu("Initial");
		*/
	}
	return true;
}

function loadLastSavedProject()
{
	var_db=JSON.parse(localStorage.var_db);
	cond_db=JSON.parse(localStorage.cond_db);
	screens=JSON.parse(localStorage.screens);
	labels=JSON.parse(localStorage.labels);
	flowchart=JSON.parse(localStorage.flowchart);
	editor=JSON.parse(localStorage.editor);
	setupLabelPointers();	
	redrawVars(true);
	refreshProg(true);
	updateContextMenu();
}

var flowchart_debug_mode=false;

function canDebug()
{
	if ((localStorage.editor!=undefined)||(cond_db.length==0))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function CodeDebugView()
{
	if (canDebug()==false)
	{
		setCompilerMessage(false,true,"Project is not running - can not test");
		return false;
	}
	adjustMenuScreen(1);
	ajax_vars_loaded=false;
	var_display=false;
	allocVars();
	refreshProg(false);
	redrawVars(false);
	if (monitoring_mode==false)
	{
		getVars();
	}
	debugMode=true;
	flowchart_debug_mode=false;
	monitoring_mode=true;
	return true;
}


function VarDebugView()
{
	if (canDebug()==false)
	{
		setCompilerMessage(false,true,"Project is not running - can not test");
		return false;
	}

	adjustMenuScreen(1);
	ajax_vars_loaded=false;
	var_display=true;
	allocVars();
	refreshProg(false);
	redrawVars(false);
	if (monitoring_mode==false)
	{
		getVars();
	}
	debugMode=true;
	flowchart_debug_mode=false;
	monitoring_mode=true;
	return true;
}


function ProgView()
{
	adjustMenuScreen(1);

	var_display=false;
	refreshProg(true);
	redrawVars(true);
	monitoring_mode=false;
	comp_res.innerHTML="";
	return true;
}


function VarView()
{
	adjustMenuScreen(1);

	var_display=true;
	redrawVars(true);
	monitoring_mode=false;
	comp_res.innerHTML="";
	return true;
}
	

var comp_res;
var comp_prog;


var ops=
{
	push:0,
	mult:3,
	div:4,
	sum:5,
	substruct:6,
	mod:7,
	abs:8,
	expired:9,
	count:10,
	received:11,
	sent:12,
	and:13,
	not:14,
	or:15,
	less:16,
	greater:17,
	greater_or_eq:18,
	less_or_eq:19,
	equal:20,
	not_equal:21,
	assign:22,
	start_timer:23,
	stop_timer:24,
	start_counter:25,
	stop_counter:26,
	send_msg:27,
	accpt_rcv_msg:28,
	branch_if_not_eq:29,
	end_of_prog:30,
	comment:31,
	min:32,
	max:33,
	COS:34,
	coil:35,
	ton:36,
	toff:37,
	cnt_ctu:38,
	cnt_ctd:39,
	cnt_res:40
};


var op_desc=
[
	{name:"*",op:ops.mult},
	{name:"/",op:ops.div},
	{name:"+",op:ops.sum},
	{name:"-",op:ops.substruct},
	{name:"%",op:ops.mod},
	{name:"abs",op:ops.abs},
	{name:"expired",op:ops.expired},
	{name:"count",op:ops.count},
	{name:"received",op:ops.received},
	{name:"sent",op:ops.sent},
	{name:"&",op:ops.and},
	{name:"!",op:ops.not},
	{name:"|",op:ops.or},
	{name:"<",op:ops.less},
	{name:">",op:ops.greater},
	{name:">=",op:ops.greater_or_eq},
	{name:"<=",op:ops.less_or_eq},
	{name:"<>",op:ops.not_equal},
	{name:"min",op:ops.min},
	{name:"max",op:ops.max},
	{name:"=",op:ops.equal},
	{name:"F_COS",op:ops.COS}
];


var var_addrs=new Array();	
var var_descr=new Array();
var max_var_addr=0;

function allocVars()
{
	var i,j,pass;
	var curr_addr,addr_incr;
	// create variable mapping segment where each variable in the project is assigned a specific address in the variable segment
	
	for(pass=0;pass<1;pass++)
	{

		var_db[2].var_list=[];
		
		

		var_addrs=[];
		curr_addr=0;

		
		for(i=0;i<var_db.length;i++)
		{
			switch(var_db[i].type)
			{
				case var_type.prog: addr_incr=4; 
					// variable 0 is always the PLC status
					var_descr[0]={start_addr:curr_addr,num_vars:2};

					var_addrs[0]={name:"PLC.connected",addr:curr_addr,type:var_type.prog};
					curr_addr+=4;
					var_addrs[1]={name:"PROG.cycleTime",addr:curr_addr,type:var_type.prog};
					curr_addr+=4;
					break;
				case var_type.timer: addr_incr=16; 	break; // fields: timer type, end count, done, current count
				case var_type.counter: addr_incr=12; break; // replace counter variables with COS variables -> COS variables are implicit
															// cos fields contain: linked variable and state (5,6 bytes=> 8 bytes), prev_state - 4 bytes
				case var_type.plc: addr_incr=20; break; // fields: section, byte_offset, bit offset, num_bits, signed
				case var_type.m2m: addr_incr=44; break; // fields: msg_id, status(tx/rx), number of bound variables, variable addrs
			}
			
			if (var_db[i].type!=var_type.prog)
			{
				var_descr[var_db[i].type]={start_addr:curr_addr,num_vars:0};
			}
			var_descr[var_db[i].type].num_vars+=var_db[i].var_list.length;
				
			
			for(j=0;j<var_db[i].var_list.length;j++)
			{
				var_addrs[var_addrs.length]={name:convertString(var_db[i].var_list[j].name),addr:curr_addr,type:i};
				curr_addr+=addr_incr;
			}
		}
	}
	max_var_addr=curr_addr;
}

function getVarValue(type,var_num,off)
{
	var addr_inc;
	var offset=0;
	switch(var_db[type].type)
	{
		case var_type.prog: addr_incr=1; break;
		case var_type.timer: addr_incr=4; 	break; // fields: timer type, end count, done, current count
		case var_type.counter: addr_incr=4; break; // fields: counter type, end count, done, current count
		case var_type.plc: addr_incr=5; break; // fields: section, byte_offset, bit offset, num_bits, signed
		case var_type.m2m: addr_incr=11; break; // fields: msg_id, status(tx/rx), number of bound variables, variable addrs
	}
	offset=(var_descr[var_db[type].type].start_addr/4);
	offset+=var_num*addr_incr+off;
	return var_value_db[offset];
}

var var_type_a=
{
	error:0,
	regular:1,
	io:2,
	const_num:3
};

function findVariable(varb,error_list)
{
	// check if the variable is IO variable
	var i,j;
	var subs1;
	var pos;
	var arr=varb.split(".");
	
	//error_list=[];
	if (arr.length==0)
	{
		error_list[error_list.length]="no such variable: "+postFix[i];
		return {var_type:var_type_a.error}; 
	}
	if (arr[0]=="IO")
	{
		var slot,section,var_name;
		var slot_n, sect_n, var_elem,sect_pos,obj_pos; 
		var subs2;
		
		if (arr.length!=4)
		{
			error_list[error_list.length]="IO Variable not formated correctly: "+varb;
			return {var_type:var_type_a.error}; 
		}
		
		slot=arr[1].slice(4);
		slot_n=parseInt(slot);
		section=arr[2];
		sect_n=-1;
		for(j=0;j<sect_names.length;j++)
		{
			if (section==sect_names[j])
			{
				sect_n=j;
				break;
			}
		}
		if (sect_n==-1)
		{
			error_list[error_list.length]="no such IO section: "+section;
			return {var_type:var_type_a.error}; 
		}
		var_name=arr[3];
		if (!((slot_n>=0)&&(slot_n<IO.length)))
		{
			error_list[error_list.length]="no such Slot: "+slot_n;
			return {var_type:var_type_a.error}; 
		}
		var slice_index=findIndex(IO[slot_n]);
		sect_pos=-1;
		for(j=0;j<slices[slice_index].sections.length;j++)
		{
			if (slices[slice_index].sections[j].type==sect_n)
			{
				sect_pos=j;
				break;
			}
		}
		if (sect_pos==-1)
		{
			// alert("no such section in the slot
			error_list[error_list.length]="no such section "+ "\""+section+"\" in Slot "+slot_n;
			return {var_type:var_type_a.error}; 
		}
		obj_pos=-1;
		for(j=0;j<slices[slice_index].sections[sect_pos].objects.length;j++)
		{
			if (convertString(slices[slice_index].sections[sect_pos].objects[j].name)==var_name)
			{
				obj_pos=j;
				break;
			}
		}
		if (obj_pos==-1)
		{
			error_list[error_list.length]="no such IO Object "+"\""+var_name+"\" in slot "+ slot_n+ "section " +section;
			return {var_type:var_type_a.error}; 
		}
		return {var_type:var_type_a.io,io_data:[slot_n,
														    sect_n,
															 slices[slice_index].sections[sect_pos].objects[obj_pos].offset, 
		                                        slices[slice_index].sections[sect_pos].objects[obj_pos].length,
															 slices[slice_index].sections[sect_pos].objects[obj_pos].signed
															 ]};
	}
	else
	{	
		var addr=-1;
		var act_var_type=0;
		
		
		
		// normal variable
		for(j=0;j<var_addrs.length;j++)
		{
			if (var_addrs[j].name==varb)
			{
				addr=var_addrs[j].addr;
				act_var_type=var_addrs[j].type;
				break;
			}
		}
		if (addr==-1)
		{
			//alert("no such variable
			error_list[error_list.length]="no such variable: "+varb; 
			return {var_type:var_type_a.error}; 
		}
		return {var_type:var_type_a.regular,reg_var_type:act_var_type,addr:addr};
	}
}


function encodeElem(var_p,var_enc)
{
	var elem;
	if (var_p.var_type==var_type_a.const_num)
	{
		elem=var_p.num;
		var_enc[0]=3<<6;
	}
	else if (var_p.var_type==var_type_a.io)
	{
		elem=(var_p.io_data[0]<<24)|(var_p.io_data[1]<<22)|(var_p.io_data[2]<<8)|(var_p.io_data[3]<<0);
		var bin_conv;
		if (var_p.io_data[4]==false)
		{
			bin_conv=0;
		}
		else
		{
			bin_conv=1;
		}	
		var_enc[0]=(2<<6)|(bin_conv);
	}
	else if (var_p.var_type==var_type_a.regular)
	{
		elem=var_p.addr;
		var_enc[0]=(1<<6)|var_p.reg_var_type;
	}
	var_enc[1]=(elem>>24)&0xff;
	var_enc[2]=(elem>>16)&0xff;
	var_enc[3]=(elem>>8)&0xff;
	var_enc[4]=(elem>>0)&0xff;
}

function copyArrInto(dst_arr, src_arr)
{
	var i,dst_arr_index;
	dst_arr_index=dst_arr.length;
	for(i=dst_arr_index;i<(dst_arr_index+src_arr.length);i++)
	{
		dst_arr[i]=src_arr[i-dst_arr_index];
	}
}




function toHex(num)
{
	if (num.toString(16).length==1)
	{
		return '0'+num.toString(16).toUpperCase();
	}
	else
	{
		return num.toString(16).toUpperCase();
	}
}

function parseExpression(expr, comp_prog,error_list)
{
	var exp=new Expression("");
	var postFix;
	var i,j,found;
	var cond,elem_n;
	var prev_var_type;
	var tmp=[];
	
	exp.Reset();
	exp.Expression(expr);
	try
	{
		//exp.Parse();
		exp.Evaluate(false);
	}
	catch(e)
	{
		error_list[error_list.length]=e;	
		return;
	}
	postFix=exp.getPostFix();
	
	
	
	for(i=0;i<postFix.length;i++)
	{
	
		if (postFix[i]==ARG_TERMINAL)
		{
			continue;
		}
		
	
		if (postFix[i]==false)
		{
			postFix[i]=0;
		}
		else if (postFix[i]==true)
		{
			postFix[i]=1;
		}
		

		if (typeof(postFix[i])=="number")
		{
			var_p={var_type:var_type_a.const_num,num:postFix[i]};
			tmp=[];
			comp_prog[comp_prog.length]=ops.push;
			encodeElem(var_p,tmp);
			copyArrInto(comp_prog,tmp);
		}
		else
		{
			found=false;
			// check if the operation is function
			for(j=0;j<op_desc.length;j++)
			{
				if (op_desc[j].name==postFix[i])
				{
					// check if the function is applied on the right object
					if ((op_desc[j].op==ops.expired)||(op_desc[j].op==ops.count))
					{
						var var_p=findVariable(postFix[i-1],error_list);
						if (!((var_p.var_type==var_type_a.regular)&&((var_p.reg_var_type==var_type.timer)||(var_p.reg_var_type==var_type.counter))))
						{
							error_list[error_list.length]="Wrong Variable data type of "+postFix[i-1]+". It should be of type counter or timer";	
							return;
						}
					}
					comp_prog[comp_prog.length]=op_desc[j].op;
					found=true;
					break;
				}
			}
			if (found==false)
			{
				// it is a variable
				
				var var_p=findVariable(postFix[i],error_list);
				var tmp=[];
				comp_prog[comp_prog.length]=ops.push;
				if (var_p.var_type==var_type_a.error)
				{
					return;
				}
				else if (var_p.var_type==var_type_a.io)
				{
					encodeElem(var_p,tmp);
				}
				else if (var_p.var_type==var_type_a.regular)
				{
					encodeElem(var_p,tmp);
				}
				copyArrInto(comp_prog,tmp);
			}
		}
	}
}


var cond_code=[];
var prog_code=[];

function runProject()
{
	addAjaxAction(execRun);
}

var monitoring_mode=false;

function refreshTimer()
{
	clearInterval(myTimer);
	addAjaxAction(getVarsAjax);
}

var myTimer;
// executed by timer and updates the values of local variables, counters .....
function getVars()
{
	var now = (new Date()).getTime();
	//console.log("getVars at: "+now);
	monitoring_mode=true;
	myTimer=setInterval(refreshTimer,1000);	
}

function stopGetVars()
{
	monitoring_mode=false;
	clearInterval(myTimer);
}

var combined_prj;
var combined_prj_byte_arr;
var combined_prj_str;

var invokeCompilation=false;

function compileProject()
{
	invokeCompilation=true;
	DownloadStationConfig();
	return true;
}

var loc_compile_res=false;

function setCompilerMessage(without_upload,error,string)
{
	if (without_upload==false)
	{
		if (error==true)
		{
			comp_res.innerHTML="<font color=\"#F00000\">"+string+"</font>";
		}
		else
		{
			comp_res.innerHTML=string;
		}
	}
}

function setCompilerErrorInCondition(without_upload,cond,act,error_list)
{
	setCompilerMessage(without_upload,true,"Compilation Status: <b>Error in Condition <u>"+cond+"</u> Action <u>"+act+"</u>.</b> Details: <b>"+error_list+"</b>");
}

function appendNumToArr(arr,val)
{
	arr[arr.length]=(val>>24)&0xff;
	arr[arr.length]=(val>>16)&0xff;
	arr[arr.length]=(val>>8)&0xff;
	arr[arr.length]=(val>>0)&0xff;
}

function compileProject1(without_upload)
{

	var postFix,tmp;
	var i,j,k,l,found;
	var error_list,elem_n;
	
	allocVars();
	error_list=[];
	
	if (without_upload==true)
	{
		loc_compile_res=false;
	}
	
	// check if 2 variables have the same name
	for(i=0;i<var_addrs.length;i++)
	{
		for(j=i+1;j<var_addrs.length;j++)
		{
			if ((var_addrs[j].name==var_addrs[i].name)&&(var_addrs[j].type!=var_type.m2m))
			{
				setCompilerMessage(without_upload,true,"Compilation Status: <b>Duplicate variable: "+var_addrs[j].name+"</b>");
				return; 
			}
		}
	}
		
	for(i=0;i<op_desc.length;i++)
	{
		for(j=0;j<var_addrs.length;j++)
		{
			if (var_addrs[j].name==op_desc[i].name)
			{
				setCompilerMessage(without_upload,true,"Compilation Status: <b> Conflict between variable and function: "+var_addrs[j].name+"<b>");
			}
		}
	}

	
	
	
	for(i=0;i<cond_db.length;i++)
	{
		cond_code[i]={condition:[],actions:[]};
		parseExpression(cond_db[i].condition,cond_code[i].condition,error_list);
		if (error_list.length!=0)
		{
			setCompilerMessage(without_upload,true,"Compilation Status: <b> Error in Condition "+i+".<b> Details: <b>"+error_list+"</b>");
			return;
		}
		for(j=0;j<cond_db[i].actions.length;j++)
		{		
		   
			if (cond_db[i].actions[j].act_type==act_types.assignment) // assignment
			{
				var var_to;
				var eval_expr=[];
				tmp=[];
				var_to=findVariable(cond_db[i].actions[j].dst,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
					return;
				}
				parseExpression(cond_db[i].actions[j].src,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
					return;
				}
				cond_code[i].actions[j]=clone(eval_expr);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				encodeElem(var_to,tmp);
				copyArrInto(cond_code[i].actions[j],tmp);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.assign;
			}
			if (cond_db[i].actions[j].act_type==act_types.coil) 
			{
				var var_to;
				tmp=[];
				var_to=findVariable(cond_db[i].actions[j].coil,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
					return;
				}
				cond_code[i].actions[j]=[];
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				encodeElem(var_to,tmp);
				copyArrInto(cond_code[i].actions[j],tmp);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.coil;
			}
			if (cond_db[i].actions[j].act_type==act_types.cnt_res) 
			{
				var var_to;
				tmp=[];
				var_to=findVariable(cond_db[i].actions[j].counter,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
					return;
				}
				cond_code[i].actions[j]=[];
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				encodeElem(var_to,tmp);
				copyArrInto(cond_code[i].actions[j],tmp);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.cnt_res;
			}
			
			if (
			    (cond_db[i].actions[j].act_type==act_types.ctu)|| // counter
				 (cond_db[i].actions[j].act_type==act_types.ctd)
				)
			
			{
				var counter=[],var_p;
				var eval_expr=[],tmp;
				var_p=findVariable(cond_db[i].actions[j].counter,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
					return;
				}
				encodeElem(var_p,counter);
				
				parseExpression(cond_db[i].actions[j].preset,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);
					return;
				}
				
				cond_code[i].actions[j]=[];
				tmp=[];
				tmp=clone(eval_expr);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				copyArrInto(cond_code[i].actions[j],counter);
				copyArrInto(cond_code[i].actions[j],tmp);
				if (cond_db[i].actions[j].act_type==act_types.ctu)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.cnt_ctu;
				}
				else if (cond_db[i].actions[j].act_type==act_types.ctd)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.cnt_ctd;
				}
			}
			
			
			if (
			    (cond_db[i].actions[j].act_type==act_types.timer_start)|| // Timer start
				 (cond_db[i].actions[j].act_type==act_types.ton)||
				 (cond_db[i].actions[j].act_type==act_types.toff)
				)
			
			{
				var timer=[],timer_type=[],timer_expiration_time=[],var_p;
				var eval_expr=[],tmp;
				var_p=findVariable(cond_db[i].actions[j].timer,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);				
					return;
				}
				encodeElem(var_p,timer);
				
				parseExpression(cond_db[i].actions[j].timer_expiration_time,eval_expr,error_list);
				if (error_list.length!=0)
				{
					setCompilerErrorInCondition(without_upload,i,j,error_list);								
					return;
				}
				

				var_p={var_type:var_type_a.const_num,num:0};
				encodeElem(var_p,timer_type);

				
				cond_code[i].actions[j]=[];
				tmp=[];
				tmp=clone(eval_expr);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				copyArrInto(cond_code[i].actions[j],timer);
				cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.push;
				copyArrInto(cond_code[i].actions[j],timer_type);
				copyArrInto(cond_code[i].actions[j],tmp);
				if (cond_db[i].actions[j].act_type==act_types.timer_start)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.start_timer;
				}
				else if (cond_db[i].actions[j].act_type==act_types.ton)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.ton;
				}
				else if (cond_db[i].actions[j].act_type==act_types.toff)
				{
					cond_code[i].actions[j][cond_code[i].actions[j].length]=ops.toff;
				}
			}
			
			if (cond_db[i].actions[j].act_type==act_types.comment)
			{
				cond_code[i].actions[j]=[];
			}
		}
	}
	
	prog_code=[];

	// Kernel Version
	prog_code[prog_code.length]=(real_ARGEE_Kernel_Version>>0)&0xff;
	prog_code[prog_code.length]=(real_ARGEE_Kernel_Version>>8)&0xff;
	prog_code[prog_code.length]=(real_ARGEE_Kernel_Version>>16)&0xff;
	prog_code[prog_code.length]=(real_ARGEE_Kernel_Version>>24)&0xff;

	// Environment Version
	prog_code[prog_code.length]=(ARGEE_Environment_Version>>0)&0xff;
	prog_code[prog_code.length]=(ARGEE_Environment_Version>>8)&0xff;
	prog_code[prog_code.length]=(ARGEE_Environment_Version>>16)&0xff;
	prog_code[prog_code.length]=(ARGEE_Environment_Version>>24)&0xff;
	
	
	// load the station configuration
	prog_code[prog_code.length]=stationConfig.length;
	// save slice IDs
	for(i=0;i<stationConfig.length;i++)
	{
		prog_code[prog_code.length]=(stationConfig[i]>>0)&0xff;
		prog_code[prog_code.length]=(stationConfig[i]>>8)&0xff;
		prog_code[prog_code.length]=(stationConfig[i]>>16)&0xff;
		prog_code[prog_code.length]=(stationConfig[i]>>24)&0xff;
	}
	// save Slice params and size
	for(i=0;i<stationConfig.length;i++)
	{
		prog_code[prog_code.length]=(stationIO_Config[i].length)&0xff;
		for(j=0;j<stationIO_Config[i].length;j++)
		{
			prog_code[prog_code.length]=(stationIO_Config[i][j])&0xff;
		}
	}
	
	
	
	// 
	// create variable descriptions - fixed header containing list of variable sections
	prog_code[prog_code.length]=var_descr.length;
	
	for(i=0;i<var_descr.length;i++)
	{
		prog_code[prog_code.length]=(var_descr[i].start_addr>>8)&0xff;
		prog_code[prog_code.length]=(var_descr[i].start_addr>>0)&0xff;

		prog_code[prog_code.length]=(var_descr[i].num_vars>>8)&0xff;
		prog_code[prog_code.length]=(var_descr[i].num_vars>>0)&0xff;
	}
	


	
	
	// copy variable configuration for all PLC variables
	for(i=0;i<var_db[var_type.plc].var_list.length;i++)
	{
		var byte_ind,bit_ind,bit_size;
		var_p={var_type:var_type_a.const_num,num:0};
		
		
		var_p.num=var_db[var_type.plc].var_list[i]["section"];
		appendNumToArr(prog_code,var_p.num);

		byte_ind=parseInt(var_db[var_type.plc].var_list[i]["word_index"])*2;
		bit_ind=var_db[var_type.plc].var_list[i]["bit_offset"];
		bit_size=var_db[var_type.plc].var_list[i]["size"];
		if (bit_ind>7)
		{
			bit_ind-=8;
			byte_ind+=1;
		}
		
		if ((bit_size==0)&&(bit_ind!=0))
		{
			setCompilerMessage(without_upload,true,"Compilation Status: <b> Error in PLC Variable \""+(var_db[var_type.plc].var_list[i].name)+"\".<b> Details: <b> Non zero bit offset for Word variable </b>");
			return;
		}
		
		if (bit_size==0)
		{
			bit_size=16;
		}
		else
		{
			bit_size=1;
		}
		appendNumToArr(prog_code,byte_ind);
		appendNumToArr(prog_code,bit_ind);
		appendNumToArr(prog_code,bit_size);
		var_p.num=var_db[var_type.plc].var_list[i]["signed"];
		appendNumToArr(prog_code,var_p.num);
	}

	
	
	for(i=0;i<screens.length;i++)
	{
		for(j=0;j<screens[i].rows.length;j++)
		{
			for(k=0;k<screens[i].rows[j].length;k++)
			{
				for(l=0;l<screens[i].rows[j][k].sect_elems.length;l++)
				{
					var obj=screens[i].rows[j][k].sect_elems[l];
					if ((obj.type==sect_elem_type.variable)||(obj.type==sect_elem_type.button))
					{
						var var_p=findVariable(screens[i].rows[j][k].sect_elems[l].Destination,error_list);
						if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
						{						
						}
						else
						{
							setCompilerMessage(without_upload,true,
							                      "HMI screen: <b>\""+screens[i].name +"\"</b>"+
									              "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
												  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
												  "Unknown variable: <b>\""+ screens[i].rows[j][k].sect_elems[l].Destination+"\"</b>"
											   );
							return;
						}
					}
					if ((obj.type==sect_elem_type.status)||(obj.type==sect_elem_type.status_ruler))
					{
						eval_error=0;
						var val=evaluateExpression(screens[i].rows[j][k].sect_elems[l].Expression,true);
						if (eval_error==1)
						{
							setCompilerMessage(without_upload,true,
							                      "HMI screen: <b>\""+screens[i].name +"\"</b>"+
									              "Section: <b>\""+screens[i].rows[j][k].name+"\"</b>"+
												  "Element: <b>\""+screens[i].rows[j][k].sect_elems[l].Name+"\"</b>"+
												  "Error in Expression: <b>\""+ escapeHTML(screens[i].rows[j][k].sect_elems[l].Expression)+"\" </b>"+
												  "Details: <b>"+val+"</b>"
												  );
							return;
						}
					}
				}
			}
		}
	}
					
					
	
	// create program code by inserting conditional goto statements
	var act_len;
	var var_p;
	for(i=0;i<cond_db.length;i++)
	{
		// compute length of all actions combined
		act_len=0;
		for(j=0;j<cond_db[i].actions.length;j++)
		{
			act_len+=cond_code[i].actions[j].length;
		}
		tmp=[];
		copyArrInto(prog_code,cond_code[i].condition);
		var_p={var_type:var_type_a.const_num,num:act_len};
		encodeElem(var_p,tmp);
		prog_code[prog_code.length]=ops.push;
		copyArrInto(prog_code,tmp);
		prog_code[prog_code.length]=ops.branch_if_not_eq;
		for(j=0;j<cond_db[i].actions.length;j++)
		{
			copyArrInto(prog_code,cond_code[i].actions[j]);
		}
	}
	prog_code[prog_code.length]=ops.end_of_prog;
	//comp_res.innerHTML=prog_code;
	//callOtherDomain();
	
	var str="";
	for(i=0;i<prog_code.length;i++)
	{
		str+=toHex(prog_code[i]);
	}
	// pad str to match frag_size

	combined_prj={vars:var_db,cond:cond_db,scr:screens,labels:labels,flowchart:flowchart,editor:editor};
	combined_prj_str=JSON.stringify(combined_prj);
	combined_prj_byte_arr=[];
	// convert the json string into bytestring used for transfers
	// each character is converted into 2 character value
	for(i=0;i<combined_prj_str.length;i++)
	{
		combined_prj_byte_arr[i]=combined_prj_str.charCodeAt(i);
	}
	combined_prj_str="";
	for(i=0;i<combined_prj_byte_arr.length;i++)
	{
		combined_prj_str+=toHex(combined_prj_byte_arr[i]);
	}
	combined_prj_str+=toHex(0);
	toTrans=str;
	curr_frag=0;
	
	if (prog_code.length>=4*1024)
	{
		setCompilerMessage(without_upload,true,"Compilation Status: <b>Bytecode size >4 kb</b>");
		return;
	}
	if (combined_prj_str.length>=32*1024)
	{
		setCompilerMessage(without_upload,true,"Compilation Status: <b>Program Text + HMI Screens >32 kb</b>");
		return;
	}
	if (max_var_addr>=1024)
	{
		setCompilerMessage(without_upload,true,"Compilation Status: <b>Variables >1 kb</b>");	
		return;
	}

	setCompilerMessage(without_upload,false,"<b>Compilation Successfull! Loading program into the station ...</b>");	
	
	
	if (without_upload==false) addAjaxAction(UploadProg);
	
	if (without_upload==true)
	{
		loc_compile_res=true;
	}		
	
	
	
}

function Import()
{
	var elem=this.document.getElementById('imp_id');
	combined_prj=JSON.parse(elem.value);
	cond_db=combined_prj.cond;	
	var_db=combined_prj.vars;
	screens=combined_prj.scr;
	labels=combined_prj.labels;
	editor=combined_prj.editor;
	flowchart=combined_prj.flowchart;
	saveLocal();
	
	adjustMenuScreen(1);
	var_display=false;
	refreshProg(true);
	redrawVars(true);
	updateContextMenu();
}

function handleFileSelect(evt) 
{
    var files = evt.files; // FileList object
 	 
    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
			 //var elem=window.document.getElementById('imp_id');
			 //elem.value=e.target.result;
			   combined_prj_str="";
				var j;
				/*for(j=0;;j++)
				{
					var code=e.target.result.charCodeAt(32*1024+j);
					combined_prj_str+=e.target.result
					*/
				var dataView=new DataView(e.target.result);	
				if ((dataView.getUint32(4,true)!=ARGEE_Environment_Version)||
				    (dataView.getUint32(0,true)!=real_ARGEE_Kernel_Version))
				{
					//
					var r = confirm("The imported file may not be compatible with this device or environment\n Click OK to proceed.");					
					if (r != true) 
					{
						return;
					}
				}
				// check the device composition in the fiel and in the device
				var stat=true;
				if (stationConfig.length!=dataView.getUint8(8))
				{
					stat=false;
				}
				else
				{
					for(j=0;j<stationConfig.length;j++)
					{
						if (stationConfig[j]!=dataView.getUint32(9+4*j,true))
						{
							stat=false;
							break;
						}
					}
				}
				if (stat==false)
				{
					var r = confirm("The station configuration in the imported file doesn't match the connected station\n Click OK to proceed.");					
					if (r != true) 
					{
						return;
					}
				}
				
				
				
				for(j=0;;j++)
				{
					var code=dataView.getUint8(32*1024+4+j);
					if (code==0)
					{
						break;
					}
					combined_prj_str+=String.fromCharCode(code);
				}
			   combined_prj=JSON.parse(combined_prj_str);
				cond_db=combined_prj.cond;	
				var_db=combined_prj.vars;
				screens=combined_prj.scr;
				labels=combined_prj.labels;
			   editor=combined_prj.editor;			
				flowchart=combined_prj.flowchart;				
				saveLocal();
				if (editor=="flowchart")
				{	
					renderMenu("Flowchart");			
					showFlowchart();
				}
				else
				{
					adjustMenuScreen(1);
					var_display=false;
					
					
					redrawVars(true);
					refreshProg(true);
					updateContextMenu();
					
					renderMenu("Initial");
				}
				
        };
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


function savePrjCode()
{
   var imgDLHelper = document.getElementById('imgdlhelper');
	var filename=document.getElementById('save_as_file_name');
	imgDLHelper.download=filename.value+".arg";
	var dat;
	var i;
	compileProject1(true);
	var tmp = new Uint8Array(64*1024);
   for (i = prog_code.length; i >= 0; i -= 1) 
	{
      tmp[i] = prog_code[i] & 0xFF;
   }
	tmp[32*1024+3]=(combined_prj_byte_arr.length>>24)&0xff
	tmp[32*1024+2]=(combined_prj_byte_arr.length>>16)&0xff
	tmp[32*1024+1]=(combined_prj_byte_arr.length>>8)&0xff
	tmp[32*1024+0]=(combined_prj_byte_arr.length>>0)&0xff
	for(i=0;i<combined_prj_byte_arr.length;i++)
	{
		tmp[32*1024+4+i]=combined_prj_byte_arr[i]
	}
	dat = uint8ToBase64(tmp);
	
	blob = new Blob([tmp], { type: 'application/octet-stream;base64' }); //new way
	var blobUrl = URL.createObjectURL(blob);
	
	imgDLHelper.href=blobUrl;
	imgDLHelper.click();
}

function saveBootProject()
{
	var elem=window.document.getElementById('save_as_file_name');
	var tmp="http://"+location.host+"/"+elem.value+".arg";
	window.location=tmp;
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
		tbl+="<td align=\"right\"><b>Environment Verion:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp"+getVersionString(ARGEE_Environment_Version)+"&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";		

	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>ARGEE Kernel Verion:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp"+getVersionString(real_ARGEE_Kernel_Version)+"&nbsp&nbsp&nbsp&nbsp</td>";
   tbl+="</tr>";
	
	tbl+="<tr>";
		tbl+="<td align=\"right\"><b>Download link to the latest version of the environment:&nbsp&nbsp&nbsp&nbsp</b></td>";
		tbl+="<td>&nbsp&nbsp&nbsp&nbsp<a target=\"_blank\" href=\"http://www.turck.us/assets/networks/argee/pg1.html\">Click Here</a>&nbsp&nbsp&nbsp&nbsp</td>";
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



	combined_prj={vars:var_db,cond:cond_db,scr:screens,labels:labels,editor:editor,flowchart:flowchart};
	combined_prj_str=JSON.stringify(combined_prj);
	prog_div.innerHTML="";
	prog_div.innerHTML+="<textarea type=\"text\" rows=\"20\" style=\"width:98%;\"  id=\"imp_id\">"+combined_prj_str+"</textarea>";
	prog_div.innerHTML+="<button onclick=\"Import();\">Import Text Above</button>";

	prog_div.innerHTML+="<br><br><br>";
	prog_div.innerHTML+="<h1> Import</h1><br>";
	prog_div.innerHTML+="<input type=\"file\" id=\"files\"  onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple /><br>";

	//prog_div.innerHTML+="<input type=\"file\" id=\"files\" style=\"display:none\" onchange=\"handleFileSelect(this);return false;\" name=\"files[]\" multiple />";
	prog_div.innerHTML+="<br><br><br>";	
	prog_div.innerHTML+="<h1> Export</h1><br>";
	prog_div.innerHTML+="<a id=\"imgdlhelper\" style=\"display:none;\"  download=\"test.txt\" href=\"\">&nbsp;</a><br>";
	prog_div.innerHTML+="Project Name: <input type=\"text\" size=\"10\" id=\"save_as_file_name\">";
	prog_div.innerHTML+="<button onclick=\"savePrjCode();\">Save Project</button>";
	return true;	
	
}


var screens=[];


// variables that can be used in HMI screens are only program variables (this limits the number of functions that can be used in expressions and reduces 
// the complexity/memory requirements needed to transfer IO/other variable infos).
var screen_def=
[
	{elem_name:"name",type:field_types.str_num,elem_name_prefix:"screen_name"},
	{elem_name:"var_list",type:field_types.var_list}
];

var section_def=
[
	{elem_name:"name",type:field_types.str_num,elem_name_prefix:"screen_sect_name"},
	{elem_name:"var_list",type:field_types.var_list}
];

// button -> add output or status variable (button (RW), Status(RO), Variable(RW), 
var sect_elem_type=
{
	button:0,
	status:1,
	status_ruler:2,
	variable:3
};


var sect_elem_type_strings=
[
	{name:"button", type: sect_elem_type.button},
	{name:"status number", type: sect_elem_type.status},
	{name:"status with valid range", type: sect_elem_type.status_ruler},
	{name:"variable", type: sect_elem_type.variable}
];	



var access_type_def=
{
	rw:0,
	ro:1
};


// next_in_line is a field of each of the elements to generate a tree of connections
// this way elements can be placed next to each other 
var section_elem_defs=
[
	{elem_type:sect_elem_type.button, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Destination",type:field_types.str_num_var,elem_name_prefix:"screenSectElemDest"} // target variable
		]
	},		
	{elem_type:sect_elem_type.status, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Expression",type:field_types.str_num_var,elem_name_prefix:"screenSectElemExpr"},
			{elem_name:"Units",type:field_types.str_num,elem_name_prefix:"screenSectElemUnits"}
		]
	},		
	{elem_type:sect_elem_type.status_ruler, elem_list: // this is done by special HTML5 element
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Expression",type:field_types.str_num_var,elem_name_prefix:"screenSectElemExpr"},
			{elem_name:"Units",type:field_types.str_num,elem_name_prefix:"screenSectElemUnits"},
			{elem_name:"NormalRangleMin",type:field_types.str_num,elem_name_prefix:"screenSectElemNormRngMin"},
			{elem_name:"NormalRangleMax",type:field_types.str_num,elem_name_prefix:"screenSectElemNormRngMax"}
		]
	},
	{elem_type:sect_elem_type.variable, elem_list:
		[
			{elem_name:"Name",type:field_types.str_num,elem_name_prefix:"screenSectElemName"},
			{elem_name:"Destination",type:field_types.str_num_var,elem_name_prefix:"screenSectElemDest"}, // target variable 		
			{elem_name:"Units",type:field_types.str_num,elem_name_prefix:"screenSectElemUnits"}
		]
	}
];

function createSectElem(type)
{
	var i;
	var elem={Name:""};
	for(i=0;i<section_elem_defs[type].elem_list.length;i++)
	{
		elem[section_elem_defs[type].elem_list[i].elem_name]="";
	}
	elem.type=type;
	return elem;
}




function screenNameChange(id,num)
{
	var elem=this.document.getElementById(id);
	screens[num].name=elem.value;
	saveLocal();
}

function AddScreen()
{
	screens[screens.length]={name:"",rows:[]};
	saveLocal();
	redrawScreenList();
}

var hmiScrClipboard=null;

function hmiScrListCut(screen_num)
{
	hmiScrClipboard=screens[screen_num];
	screens.splice(screen_num,1);
	saveLocal();
	redrawScreenList();
}

function hmiScrListCopy(screen_num)
{
	hmiScrClipboard=screens[screen_num];
}

function hmiScrListPasteAbove(screen_num)
{
	if (hmiScrClipboard==null)
	{
		return;
	}
	
	screens.splice(screen_num,0,hmiScrClipboard);
	saveLocal();
	redrawScreenList();
}

function hmiScrListPasteBelow(screen_num)
{
	var len;
	if (hmiScrClipboard==null)
	{
		return;
	}
	screens.splice(screen_num+1,0,clone(hmiScrClipboard));
	saveLocal();
	redrawScreenList();
}


/*function MoveScreenUp(screen_num)
{
	var tmp;
	if (screen_num>0)
	{
		tmp=screens[screen_num-1];
		screens[screen_num-1]=screens[screen_num];
		screens[screen_num]=tmp;
	}
	saveLocal();
	redrawScreenList();
}

function MoveScreenDown(screen_num)
{
	var tmp;
	if (screen_num<(screens.length-1))
	{
		tmp=screens[screen_num+1];
		screens[screen_num+1]=screens[screen_num];
		screens[screen_num]=tmp;
	}
	saveLocal();
	redrawScreenList();
}
*/

function DeleteScreen(screen_num)
{
	screens.splice(screen_num,1);
	saveLocal();
	redrawScreenList();
}

function EditScreen(scr)
{
	curr_screen=scr;
	var_display=false;
	refreshCurrScreen();
}



function ViewScreen(scr)
{
	curr_screen=scr;
	var_display=false;
	var outp="";
	prog_div.innerHTML=renderScreen(outp,curr_screen,false);
}	

function renderScreenList(outp,edit)
{
	var i,j,k,l;

	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	
	outp="";
	//outp+="<fieldset style=\"background:#E2E2E2; padding-bottom: 30px;\">";
	outp+="<H2>"+"Screens"+"</h2><br>"
	outp+="<table border=\"1\">";
	for(i=0;i<screens.length;i++)
	{
		outp+="<TR >";	
		   //outp+="<TD >Name</TD>";
			//outp+="<TD bgcolor=#E6E6E6>";
			if (edit==true)
			{
					var funcInvStr="showCondMenu(this,"+floatMenuType.hmi_screen_list+","				+i+","+0+");";
				outp+="<td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+i+".</a></td>";
			}
			
			outp+="<TD >";
				if (edit==true)
				{				
					outp+="<input type=\"text\" size=\""+10+"\" value=\""+screens[i].name+"\" id=\""+"screen_name"+"_"+i+"\" onblur=\"screenNameChange(this.id,"+i+")\">";
				}
				else
				{
					outp+="<div style=\"padding:1em\" id=\"hmi_screen_"+i+"\">";
					outp+="<A href=\"javascript:ViewScreen("+i+");\">"+screens[i].name+"</A>";
					outp+="</div>"
				}
			if (edit==true)
			{
				outp+="</TD>";				
				outp+="<TD>";
					outp+="<button type=\"button\" onclick=\"EditScreen("+i+");\">Edit</button>";
				outp+="</TD>";						
			}
		outp+="</TR>";
	}
	outp+="</table>";
	if (edit==true)
	{
		outp+="<button type=\"button\" onclick=\"AddScreen();\">Add Screen</button><br><br><br>";
	}
	//outp+="</fieldset>"
	return outp;	
}

function redrawScreenList()
{
	var outp;
	adjustMenuScreen(1);
	
	var_display=true;
	var_div.innerHTML=renderScreenList(outp,true);
	monitoring_mode=false;
	if (side_by_side==true)
	{
		if (screens.length>0)
		{
			EditScreen(0);
		}
		else
		{
			prog_div.innerHTML="";
		}
	}
	return true;

	
}

var interf_types=
{
	computer:0,
	smartphone:1,
	tablet:2
};


function applyInterface()
{
	var elem=this.document.getElementById("interface_type");
	var elem1=this.document.getElementById("left_col_width");
	localStorage.settings=JSON.stringify([parseInt(elem.value),parseInt(elem1.value),1]); // last argument -> 1 -> to reload the project without asking the user to load from the device or not.
	// if the project is not saved - it automatically loads from the computer.
	/*if (elem.value==interf_types.smartphone)
	{
		side_by_side=false;
	}
	else if (elem.value==interf_types.tablet)
	{
		side_by_side=true;
		left_col_width=parseInt(elem1.value);
	}*/
	// don't execute testFrame(); directly - rather do the redirection -> window=
	history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
	var locationObj = window.location;
	window.location = locationObj;
}

function renderSettings()
{
	var vars_div=document.getElementById("vars");
	var outp;
	var settings;
	var_display=false;	
	
	if (localStorage.settings!=undefined)
	{
		settings=JSON.parse(localStorage.settings);
	}
	else
	{
		settings=[0,40,0];
	}
	prog_div.style.width="99%"
	prog_div.style.left="5px";
	prog_div.style.right="99%";
	vars_div.style.display="none";
	
	//prog_div.innerHTML="Log:"+log_data;
	prog_div.innerHTML="";
	
	
	prog_div.innerHTML+="<h1> Settings</h1><br>";
	outp="";
	outp+="<table><tr>"
	outp+="<td>Interface:</td>"; 
	outp+="<td><select id=\"interface_type\">";
	if (settings[0]==interf_types.computer)
	{
		outp+="<option selected value=\""+interf_types.computer+"\">computer</option>";
	}
	else
	{
		outp+="<option value=\""+interf_types.computer+"\">computer</option>";
	}
	
	if (settings[0]==interf_types.smartphone)
	{
		outp+="<option selected value=\""+interf_types.smartphone+"\">smartphone</option>";
	}
	else
	{
		outp+="<option value=\""+interf_types.smartphone+"\">smartphone</option>";
	}
	
	
	if (settings[0]==interf_types.tablet)
	{
		outp+="<option selected value=\""+interf_types.tablet+"\">tablet</option>";
	}
	else
	{
		outp+="<option value=\""+interf_types.tablet+"\">tablet</option>";
	}
	outp+="</select></td></tr>";
	
	outp+="<tr>"
	outp+="<td>left column width in % <br> (for tablet and Computer interfces only):</td>"; 
	outp+="<td><input type=\"text\" id=\"left_col_width\" value=\""+settings[1]+"\"> </td></tr>";
	
	outp+="<tr>";
	outp+="<td colspan=\"2\"><button onclick=\"applyInterface()\">Apply</button></td></tr></table>";
	
	prog_div.innerHTML+=outp;
	
	return true;	

}

function DrawHMIScreenList()
{
	var outp;

	if (canDebug()==false)
	{
		setCompilerMessage(false,true,"Project is not running - can not test");
		return false;
	}

	
	adjustMenuScreen(1);

	
	var_display=true;
	if (screens.length>0)
	{
		var_div.innerHTML=renderScreenList(outp,false);
		num_var_iter=0;
		debugMode=false;
		allocVars();
		if (monitoring_mode==false)
		{
			addAjaxAction(getVarsAjax);
		}
		if (side_by_side==true)
		{
			ViewScreen(0);
		}
		monitoring_mode=true;
	}
	else
	{
		setCompilerMessage(false,true,"<b>HMI screens are not defined!!!</b>");				
		return false;
	}
	return true;
}

var curr_screen=-1;

function AddSection(scr,row)
{
	if (row==0xffff)
	{
		var elem=screens[scr].rows.length;
		screens[scr].rows[elem]=[];
		screens[scr].rows[elem][0]={name:"",sect_elems:[]};
	}
	else
	{
		screens[scr].rows[row][screens[scr].rows[row].length]={name:"",sect_elems:[]};
	}
	saveLocal();
	refreshCurrScreen();
}

var hmiSectClipboard=null;

function hmiSectCut(sect)
{
	hmiSectClipboard=screens[curr_screen].rows[sect][0];
	DelSection(curr_screen,sect,0);
}

function hmiSectCopy(sect)
{
	hmiSectClipboard=screens[curr_screen].rows[sect][0];
}


function hmiSectPasteAbove(sect)
{
	if (hmiSectClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows.splice(sect,0,arr);
	saveLocal();
	refreshCurrScreen();
}

function hmiSectPasteBelow(sect)
{
	if (hmiSectClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows.splice(sect+1,0,arr);
	saveLocal();
	refreshCurrScreen();
}





function DelSection(scr,row,sect)
{
	screens[scr].rows[row].splice(sect,1);
	if (screens[scr].rows[row].length==0)
	{
		screens[scr].rows.splice(row,1);
	}
	saveLocal();
	refreshCurrScreen();
}


function MoveUpSection(scr,row,sect)
{
	if ((row>0)&&(sect<screens[scr].rows[row-1].length))
	{
		var tmp=screens[scr].rows[row-1][sect];
		screens[scr].rows[row-1][sect]=screens[scr].rows[row][sect];
		screens[scr].rows[row][sect]=tmp;
	}
	saveLocal();
	refreshCurrScreen();
}

function MoveDownSection(scr,row,sect)
{
	if ((row<(screens[scr].rows.length-1))&&(sect<screens[scr].rows[row+1].length))
	{
		var tmp=screens[scr].rows[row+1][sect];
		screens[scr].rows[row+1][sect]=screens[scr].rows[row][sect];
		screens[scr].rows[row][sect]=tmp;
	}
	saveLocal();
	refreshCurrScreen();
}


function screenSectionNameChange(id,scr,row,sect)
{
	var elem=this.document.getElementById(id);
	screens[scr].rows[row][sect].name=elem.value;
	saveLocal();
}

function addScrSectElem(id,scr,row,sect)
{
	var elem=this.document.getElementById(id);
	var num=parseInt(elem.value);
	var to_clone=createSectElem(num);


	var elem_num=screens[scr].rows[row][sect].sect_elems.length;
	screens[scr].rows[row][sect].sect_elems[elem_num]=[];
	screens[scr].rows[row][sect].sect_elems[elem_num]=clone(to_clone);
	saveLocal();
	refreshCurrScreen();
}


var hmiElemClipboard=null;

function hmiSectElemCut(sect,elem)
{
	hmiElemClipboard=screens[curr_screen].rows[sect][0].sect_elems[elem];
	DeleteSectElem(curr_screen,sect,0,elem);
}

function hmiSectElemCopy(sect,elem)
{
	hmiElemClipboard=screens[curr_screen].rows[sect][0].sect_elems[elem];
}

function hmiSectElemPasteAbove(sect,elem)
{
	if (hmiElemClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows[sect][0].sect_elems.splice(elem,0,clone(hmiElemClipboard));
	saveLocal();
	refreshCurrScreen();
}

function hmiSectElemPasteBelow(sect,elem)
{
	if (hmiElemClipboard==null)
	{
		return;
	}
	var arr=new Array(clone(hmiSectClipboard));
	screens[curr_screen].rows[sect][0].sect_elems.splice(elem+1,0,clone(hmiElemClipboard));
	saveLocal();
	refreshCurrScreen();
}


function renderAddElemButton(scr,row,sect)
{
	var outp="";
	outp+="<select id=\"scr_row_sect_add_elem_"+scr+"_"+row+"_"+sect+"\">";
	for(j=0;j<sect_elem_type_strings.length;j++)
	{
		outp+="<option value=\""+j+"\">"+sect_elem_type_strings[j].name+"</option>";
	}
	outp+="</select>";
	outp+="<button type=\"button\" onclick=\"addScrSectElem(\'"+"scr_row_sect_add_elem_"+scr+"_"+row+"_"+sect+"\',"+scr+","+row+","+sect+");\">Add New Element</button>";
	return outp;	
}

function DeleteSectElem(scr,row,sect,sect_elem)
{
	screens[scr].rows[row][sect].sect_elems.splice(sect_elem,1);
	saveLocal();
	refreshCurrScreen();
}


function MoveUpSectElem(scr,row,sect,sect_elem)
{

	if (sect_elem>0)
	{
		var tmp=screens[scr].rows[row][sect].sect_elems[sect_elem-1];
		screens[scr].rows[row][sect].sect_elems[sect_elem-1]=screens[scr].rows[row][sect].sect_elems[sect_elem];
		screens[scr].rows[row][sect].sect_elems[sect_elem]=tmp;
	}
	saveLocal();
	refreshCurrScreen();
}

function MoveDownSectElem(scr,row,sect,sect_elem)
{

	if (sect_elem<(screens[scr].rows[row][sect].sect_elems.length-1))
	{
		var tmp=screens[scr].rows[row][sect].sect_elems[sect_elem+1];
		screens[scr].rows[row][sect].sect_elems[sect_elem+1]=screens[scr].rows[row][sect].sect_elems[sect_elem];
		screens[scr].rows[row][sect].sect_elems[sect_elem]=tmp;
	}
	saveLocal();
	refreshCurrScreen();
}


function changeSectElem(id,scr,row,sect,sect_elem,elem_num)
{
	var elem=this.document.getElementById(id);
	screens[scr].rows[row][sect].sect_elems[sect_elem][section_elem_defs[screens[scr].rows[row][sect].sect_elems[sect_elem].type].elem_list[elem_num].elem_name]=elem.value;
	saveLocal();
}

var eval_error=0;

function evaluateExpression(expr,rw)
{
	var exp = new Expression("");
	var postFix;
	var i;
	var error_list=[];
	var var_p;
	var res;
	exp.Reset();
	exp.Expression(expr);
	exp.Parse();
	postFix=exp.getPostFix();
	for(i=0;i<postFix.length;i++)
	{
		if (typeof(postFix[i])=="string")
		{
			//if (postFix[i].search(".")!=-1)
			{
				var_p=findVariable(postFix[i],error_list);
				if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
				{
					if (rw==false)
					{
						exp.AddVariable(postFix[i],var_value_db[var_p.addr/4]);
					}
					else
					{
						exp.AddVariable(postFix[i],1);
					}
				}
			}
		}
	}
	try
	{
		res=exp.Evaluate(true);
	}
	catch(e)
	{
		eval_error=1;
		res=e;
	}
	return res;
}

function HMI_redrawScreenList()
{
	var i,j,k,l;
	var found_out_of_range;
	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	for(i=0;i<screens.length;i++)
	{
		found_out_of_range=false;
		var elem=this.document.getElementById("hmi_screen_"+i);
		for(j=0;j<screens[i].rows.length;j++) // rows
		{
			for(k=0;k<screens[i].rows[j].length;k++)  // sections
			{
				for(l=0;l<screens[i].rows[j][k].sect_elems.length;l++) // section elements
				{
					var obj=screens[i].rows[j][k].sect_elems[l];
					if (obj.type==sect_elem_type.status_ruler)
					{
						var val=evaluateExpression(screens[i].rows[j][k].sect_elems[l].Expression,false);
						
						if ((val>=screens[i].rows[j][k].sect_elems[l].NormalRangleMin)&&
							 (val<=screens[i].rows[j][k].sect_elems[l].NormalRangleMax))
						{
							
						}
						else
						{
							found_out_of_range=true;
						}
					}
				}
			}
		}
		if (found_out_of_range==true)
		{
			elem.style.backgroundColor='red';
		}
		else
		{
			elem.style.backgroundColor='lightgreen';
		}
	}
}

function HMI_redrawCurrentScreen()
{
	var i,j,k;
	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	for(i=0;i<screens[curr_screen].rows.length;i++) // rows
	{
		for(j=0;j<screens[curr_screen].rows[i].length;j++)  // sections
		{
			for(k=0;k<screens[curr_screen].rows[i][j].sect_elems.length;k++) // section elements
			{
				var obj=screens[curr_screen].rows[i][j].sect_elems[k];
				if ((obj.type==sect_elem_type.variable)&&(num_var_iter==0))
				{
					var var_p=findVariable(screens[curr_screen].rows[i][j].sect_elems[k].Destination);
					if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
					{
						var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
						elem.value=var_value_db[var_p.addr/4];
					}
				}
				if (obj.type==sect_elem_type.status)
				{
					var val=evaluateExpression(screens[curr_screen].rows[i][j].sect_elems[k].Expression,false);
					
					var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
					elem.innerHTML=val;
				}
				if (obj.type==sect_elem_type.status_ruler)
				{
					var val=evaluateExpression(screens[curr_screen].rows[i][j].sect_elems[k].Expression,false);
					var elem=this.document.getElementById("elem_"+curr_screen+"_"+i+"_"+j+"_"+k);
					if ((val>=screens[curr_screen].rows[i][j].sect_elems[k].NormalRangleMin)&&
						(val<=screens[curr_screen].rows[i][j].sect_elems[k].NormalRangleMax))
						{
							elem.parentNode.style.backgroundColor='lightgreen';
						}
						else
						{
							elem.parentNode.style.backgroundColor='red';
						}
					elem.innerHTML=val;
				}
			}
		}
	}
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//  I need HMI screen validation during the compilation of the project so that it will give an error if a screen has more than one button but there are variables in sections
//  without buttons
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



function encodeNum(num)
{
	var arr=[];
	arr[0]=(num>>24)&0xff;
	arr[1]=(num>>16)&0xff;
	arr[2]=(num>>8)&0xff;
	arr[3]=(num>>0)&0xff;
	var str=toHex(arr[0])+toHex(arr[1])+toHex(arr[2])+toHex(arr[3]);
	return str;
}

function ScreenPressedButton(scr,row,sect)
{
	var i,j,k;
	var num_buttons=0;
	// assume only one button per page
	// check if there are more then 1 button in this page
	submit_var_list=[];
	curr_subm_var=0;
	for(i=0;i<screens[scr].rows.length;i++)
	{
		for(j=0;j<screens[scr].rows[i].length;j++)
		{
			for(k=0;k<screens[scr].rows[i][j].sect_elems.length;k++)
			{
				var obj=screens[scr].rows[i][j].sect_elems[k];
				if (obj.type==sect_elem_type.button)
				{
					num_buttons++;
				}
			}
		}
	}
	
	if (num_buttons>1)
	{	
		// submit a specific section
		for(k=0;k<screens[scr].rows[row][sect].sect_elems.length;k++)
		{
				var obj=screens[scr].rows[row][sect].sect_elems[k];
				if ((obj.type==sect_elem_type.button)||(obj.type==sect_elem_type.variable))
				{
					if (obj.type==sect_elem_type.variable)
					{
					
						var var_p=findVariable(screens[scr].rows[row][sect].sect_elems[k].Destination);
						if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
						{
							var elem=this.document.getElementById("elem_"+scr+"_"+row+"_"+sect+"_"+k);
							var val=elem.value;
							submit_var_list[submit_var_list.length]={addr:var_p.addr,val:val};
						}
					}
					if (obj.type==sect_elem_type.button)
					{
						var var_p=findVariable(screens[scr].rows[row][sect].sect_elems[k].Destination);
						if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
						{
							submit_var_list[submit_var_list.length]={addr:var_p.addr,val:1};
						}
					}
				}
			
		}
	}
	else
	{
		// submit all the variable elements of the screen
		for(i=0;i<screens[scr].rows.length;i++)
		{
			for(j=0;j<screens[scr].rows[i].length;j++)
			{
				for(k=0;k<screens[scr].rows[i][j].sect_elems.length;k++)
				{
					var obj=screens[scr].rows[i][j].sect_elems[k];
					if ((obj.type==sect_elem_type.button)||(obj.type==sect_elem_type.variable))
					{
						if (obj.type==sect_elem_type.variable)
						{
						
							var var_p=findVariable(screens[scr].rows[i][j].sect_elems[k].Destination);
							if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
							{
								var elem=this.document.getElementById("elem_"+scr+"_"+i+"_"+j+"_"+k);
								var val=elem.value;
								submit_var_list[submit_var_list.length]={addr:var_p.addr,val:val};
							}
						}
						if (obj.type==sect_elem_type.button)
						{
							var var_p=findVariable(screens[scr].rows[i][j].sect_elems[k].Destination);
							if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
							{
								submit_var_list[submit_var_list.length]={addr:var_p.addr,val:1};
							}
						}
					}
				}
			}
		}
	}
	addAjaxAction(sendSubmitList);
}

function renderSectElem(scr_num,row,sect,sect_elem,rw)
{
	var type=screens[scr_num].rows[row][sect].sect_elems[sect_elem].type;
	var i;
	var outp="";
	var elem=screens[scr_num].rows[row][sect].sect_elems[sect_elem];
	// render each element in its own table
	
	if (rw==true)
	{
		var funcInvStr="showCondMenu(this,"+floatMenuType.hmi_sect_elem+","				+row+","+sect_elem+");";
		outp+="<table>";
		outp+="<TR style=\"height:0.5em;\"></TR>";
		outp+="<TR style=\"border: 1px solid black;\">";
		outp+="<td  bgcolor=#CECEF6 width=\"1px\"  style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\" rowspan=\""+(section_elem_defs[type].elem_list.length+1)+"\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+sect_elem+".</a></td>";

		
		outp+="<TD  bgcolor=Chocolate>Element type:</TD><TD  bgcolor=#F2F2F2>"+sect_elem_type_strings[type].name+"</TD></TR>";
		for(i=0;i<section_elem_defs[type].elem_list.length;i++)
		{
			outp+="<TR style=\"border: 1px solid black;\">";
			
			outp+="<TD bgcolor=#E6E6E6>"+section_elem_defs[type].elem_list[i].elem_name+"</TD>";
			switch(section_elem_defs[type].elem_list[i].type)
			{
				case field_types.str_num:
						outp+="<TD>";
							outp+="<input type=\"text\" size=\""+40+"\" value=\""+elem[section_elem_defs[type].elem_list[i].elem_name]+"\" id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onblur=\"changeSectElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\">";
						outp+="</TD>";
						break;
				case field_types.str_num_var:
						var sect_type;
				      if  ((type==sect_elem_type.status)||(type==sect_elem_type.status_ruler))
						{
							sect_type=expr_types.hmi_expr;
						}
						else
						{
							sect_type=expr_types.hmi_var;
						}
							
						outp+="<TD>";
						if (computer_interface==false)
						{
							outp+="<input type=\"text\" onfocus=\"return showEditBox(this,"+sect_type+","+scr_num+","+row+","+sect_elem+","+i+");\"  size=\""+40+"\" value=\""+escapeHTML(elem[section_elem_defs[type].elem_list[i].elem_name])+"\" id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onblur=\"changeSectElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\">";
						}
						else
						{
							outp+="<input type=\"text\" onkeydown=\"return actOnKeyDown(event,"+sect_type+");\"   size=\""+40+"\" value=\""+escapeHTML(elem[section_elem_defs[type].elem_list[i].elem_name])+"\" id=\""+"screenSectionElem"+"_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"_"+i+"\" onblur=\"changeSectElem(this.id,"+scr_num+","+row+","+sect+","+sect_elem+","+i+")\">";
						}
						
						outp+="</TD>";
						break;
					  
			}
			outp+="</TR>";
		}
		/*outp+="<TR style=\"border: 1px solid black;\">"
			outp+="<TD colspan=\"2\">";
				outp+="<button type=\"button\" onclick=\"DeleteSectElem("+scr_num+","+row+","+sect+","+sect_elem+");\">Delete Element</button>";	
				outp+="<button type=\"button\" onclick=\"MoveUpSectElem("+scr_num+","+row+","+sect+","+sect_elem+");\">Move Up</button>";	
				outp+="<button type=\"button\" onclick=\"MoveDownSectElem("+scr_num+","+row+","+sect+","+sect_elem+");\">Move Down</button>";	
				

			outp+="</TD>";
		outp+="</TR>"*/
		outp+="</table>"
	}
	else
	{	
		outp+="<TR>";
		switch(type)
		{
			
			case sect_elem_type.button:
				outp+="<TD colspan=2 style=\"border: 1px solid black;\">";
				outp+="<center>";
				outp+="<button type=\"button\" onclick=\"ScreenPressedButton("+scr_num+","+row+","+sect+","+sect_elem+");\">"+screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name+"</button>";
				outp+="</center>";
				outp+="</td>"
				break;
			case sect_elem_type.status:
				var val=evaluateExpression(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Expression,false);
				outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
				outp+="</TD>"
				outp+="<TD  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				outp+="<div style=\"float: left;\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">"+val+"</div>&nbsp&nbsp";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Units;
				outp+="</TD>"
				break;
			case sect_elem_type.status_ruler:
				var val=evaluateExpression(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Expression,false);
				outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
				outp+="</TD>"
				if ((val>=screens[scr_num].rows[row][sect].sect_elems[sect_elem].NormalRangleMin)&&
				    (val<=screens[scr_num].rows[row][sect].sect_elems[sect_elem].NormalRangleMax))
				{
					outp+="<TD bgcolor=lightgreen  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				}
				else
				{
					outp+="<TD bgcolor=red  style=\"padding-left:0.5em; width:11em;border: 1px solid black;\">";
				}
				outp+="<div style=\"float: left;\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">"+val+"</div>&nbsp&nbsp";
				outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Units;
				outp+="</TD>"
				break;
			case sect_elem_type.variable:
				var var_p=findVariable(screens[scr_num].rows[row][sect].sect_elems[sect_elem].Destination);
				if ((var_p.var_type==var_type_a.regular)&&(var_p.reg_var_type==var_type.prog))
				{
				
					outp+="<TD bgcolor=lightgrey style=\"padding-right:1em; border: 1px solid black;\">";
					outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Name;
					outp+="</TD>"
					outp+="<TD  style=\"padding-left:0.5em; border: 1px solid black;\">";
					outp+="<input type=\"text\" size=\""+10+"\" value=\""+var_value_db[var_p.addr/4]+"\" id=\"elem_"+scr_num+"_"+row+"_"+sect+"_"+sect_elem+"\">&nbsp&nbsp";
					outp+=screens[scr_num].rows[row][sect].sect_elems[sect_elem].Units;
					outp+="</TD>"
				}
				break;
		}
		outp+="</TR>";
	}
	return outp;
}

function renderScreenView(outp,scr_num)
{
	var i,j,k;

	//style=\"background:FFFFCC; \"
	outp="";
	outp+="<center><table style=\"width:33%; border-collapse:collapse; \">";
	outp+="<TR><TD><center>";
	
	//outp+="<fieldset style=\"padding:20px; background:#FFFFcc;\" >";
	outp+="<fieldset style=\"padding:20px; background:#F2F2F2;\" >";
	outp+="<H2>"+screens[scr_num].name+"</h2><br>"
	outp+="<table style=\"border-collapse:collapse;\">";   
	for(i=0;i<screens[scr_num].rows.length;i++)
	{
		
		//outp+="<TR style=\"border: 1px solid black;\">";	
		//outp+="<TR>";	
		j=0;
		//for(j=0;j<screens[scr_num].rows[i].length;j++)
		{
			//outp+="<TD>";
			//#CCFFFF
			outp+="<TR style=\"height:2em;\"></TR>";
			outp+="<TR style=\"height:2em;\"><TD colspan=\"2\"><b>"+screens[scr_num].rows[i][j].name+"</B></TD></TR>";
			//outp+="<fieldset style=\"background:#FFCC00;\"><legend ><B>"+screens[scr_num].rows[i][j].name+"</B></legend>";
			//outp+="<fieldset style=\"background:lightgrey;\"><legend  ><B>"+screens[scr_num].rows[i][j].name+"</B></legend>";
			//outp+="<table style=\"border-collapse:collapse;\">";   
				for(k=0;k<screens[scr_num].rows[i][j].sect_elems.length;k++)
				{
					//outp+="<TR style=\"border: 1px solid black;\">";	
					outp+=renderSectElem(scr_num,i,j,k,false);
					//outp+="</TR>";	
				}
			//outp+="</table>";
			//outp+="</fieldset>"
			//outp+="</TD>";	
			//outp+="<TD style=\"width:20px;\">";
			//outp+="</TD>";
		}
		//outp+="</TR>";	
		
		//outp+="<br><br>";	
	}
	outp+="</table>";
	outp+="</fieldset>";
	outp+="</center></TD></TR></table></center>";
	return outp;


}

function renderScreen(outp,scr_num,edit)
{
	var i,j,k;

	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	
	if (edit==false)
	{	
		return renderScreenView(outp,scr_num);
	}
	
	outp="";
	outp+="<center>";
	outp+="<table style=\"width:33%; border-collapse:collapse; \">";
	outp+="<TR><TD><center>";
	//outp+="<fieldset style=\"background:#E2E2E2; \">";
	outp+="<H2>"+screens[scr_num].name+"</h2><br>"
	
	outp+="<table style=\"border-collapse:collapse;\">";   
	
	for(i=0;i<screens[scr_num].rows.length;i++)
	{
		outp+="<TR style=\"height:20px;\">";
		outp+="</TR>";
		//outp+="<TR style=\"border-top:1px solid black; border-left:1px solid black; border-right: 1px solid black;\">";	
		outp+="<TR style=\"border:1px solid black;\">";	
		//for(j=0;j<screens[scr_num].rows[i].length;j++)
		j=0;
		{
					var funcInvStr="showCondMenu(this,"+floatMenuType.hmi_section+","				+i+","+0+");";
		outp+="<td rowspan=\"3\" bgcolor=#CECEF6 width=\"1px\"  style=\"border-right: 1px solid black;padding-left:5px; padding-right:5px;\"><a   href=\"javascript:"+funcInvStr+"\" onclick=\"return "+funcInvStr+"\">"+i+".</a></td>";
					outp+="<TD bgcolor=#CECEF6 style=\" padding-left:5px;  vertical-align: top;\">Section Name: </TD>";
					outp+="<TD bgcolor=#CECEF6 style=\" padding-right:5px; \">";
					//padding-right:5px;border-right: 1px solid black; vertical-align: top; 
					outp+="<input type=\"text\" size=\""+20+"\" value=\""+screens[scr_num].rows[i][j].name+"\" id=\""+"screen_section_name"+"_"+scr_num+"_"+i+"_"+j+"\" onblur=\"screenSectionNameChange(this.id,"+scr_num+","+i+","+j+")\">";
					outp+="</TD>"
					outp+="</TR>";
					/*outp+="<TR style=\"border-bottom:1px solid black; border-left:1px solid black; border-right: 1px solid black;\" >";	
					outp+="<TD colspan=\"3\" bgcolor=#CECEF6 style=\" vertical-align: top;\">";
					outp+="<br><button type=\"button\" onclick=\"DelSection("+scr_num+","+i+","+j+");\">Delete Section</button>";
					outp+="<button type=\"button\" onclick=\"MoveUpSection("+scr_num+","+i+","+j+");\">Move Up</button>";

					outp+="<button type=\"button\" onclick=\"MoveDownSection("+scr_num+","+i+","+j+");\">Move Down</button>";
					outp+="</TD>";	
				outp+="</TR>";*/
				outp+="<TR style=\"border: 1px solid black;\">";
				outp+="<TD bgcolor=#F6E3CE colspan=\"2\">";
				
				for(k=0;k<screens[scr_num].rows[i][j].sect_elems.length;k++)
				{
					outp+=renderSectElem(scr_num,i,j,k,edit);
				}
				outp+="</td></tr>"
				outp+="<TR style=\"border: 1px solid black;\">";
				outp+="<TD bgcolor=#F6E3CE colspan=\"2\">";
				outp+=renderAddElemButton(scr_num,i,j);
				outp+="</TD>";	
				outp+="</TR>";
			// add section button on each row
			/*outp+="<TD style=\"width:20px;\">";
			outp+="</TD>";
			*/
		}
		/*outp+="<TD bgcolor=#F6E3CE >";
		outp+="<button type=\"button\" onclick=\"AddSection("+scr_num+","+i+");\">Add Section</button>";
		outp+="</TD>";		
		*/
	}
	outp+="</table>";
	
	outp+="<br><br><button type=\"button\" onclick=\"AddSection("+scr_num+","+(0xffff)+");\">Add Section</button><br><br><br>";
	//outp+="</fieldset>";
	
	outp+="</center></TD></TR>";
	outp+="</table></center>";
	
	
	return outp;
}

function hmiEdit()
{
	redrawScreenList();
	if (screens.length>0)
	{
		EditScreen(0);
	}
	else
	{
		prog_div.innerHTML="";
	}
}

var mode_selection=
{
	prog_view:0,
	debug_view:1,
	hmi_editor:2,
	hmi_view:3
};

function mode_select(mode)
{
	return false;
}


/*var view_tabs=
[
	{name:"Program View",renderFunc:ProgView,sub_elems:
			[
				{name:"New Project",renderFunc:clearProject},
				{name:"Edit Code",renderFunc:ProgView},
				{name:"Edit HMI Screens",renderFunc:hmiEdit},
				{name:"Import/Export project into Text file ",renderFunc:ImpExp}
			]
	},
	{name:"Debug View",renderFunc:DebugView,sub_elems:[]},
	{name:"HMI View",renderFunc:DrawHMIScreenList,sub_elems:[]}
];
*/	


function refreshCurrScreen()
{
	if ((var_display==true)&&(side_by_side==false))
	{
		return;
	}
	var outp="";
	prog_div.innerHTML=renderScreen(outp,curr_screen,true);
}

var cont_menu_div;
var nav_div;


//var_display=false;

// no render function - last rendered screen is preserved
// the first time the main menu is loaded - it shows the help screen.
var menu_system=
[
	{name:"Project",linked_elems:["<I>Edit Code</I>","Import/Export","<I>New Project</I>","Settings"],renderFunc:ImpExp},
	{name:"Import/Export",linked_elems:["<I>Edit Code</I>"], tablet_elems:["<I>Edit Code</I>"], renderFunc:ImpExp},
	{name:"Import/Export ",linked_elems:["<I>Edit</I>"], tablet_elems:["<I>Edit</I>"],renderFunc:ImpExp},
	{name:"Settings",renderFunc:renderSettings},
	{name:"Initial Settings",linked_elems:["Settings"],renderFunc:renderSettings},
	{name:"<I>New Project</I>",renderFunc:clearProject},
	{name:"Code",linked_elems:["<I>Edit Code</I>","<I>Test <I>"],renderFunc:ProgView},
	{name:"Initial",linked_elems:["Edit Vars","<I>Run </I>","Edit HMI","About "], tablet_elems:["<I>Run </I>","<I>Test </I>","Edit HMI","View HMI","Project","About "]},
	{name:"<I>Edit Code</I>",linked_elems:["Edit Vars","<I>Run </I>","Edit HMI","About "], tablet_elems:["<I>Run </I>","<I>Test </I>","Edit HMI","View HMI","Project","About "], renderFunc:ProgView},
	{name:"Edit Vars",linked_elems:["<I>Edit Code</I>","<I>Run </I>"], renderFunc:VarView},
	{name:"<I>Test </I>",linked_elems:["Debug Vars","View HMI"],tablet_elems:["<I>Edit Code</I>","View HMI"], renderFunc:CodeDebugView},
	{name:"Debug Vars",linked_elems:["<I>Test <I>","View HMI"], renderFunc:VarDebugView},
	{name:"<I>Run </I>", renderFunc:compileProject},
	{name:"HMI",linked_elems:["Edit HMI","View HMI"], renderFunc:DrawHMIScreenList},
	{name:"View HMI",linked_elems:["View Screen List"], tablet_elems:["<I>Edit Code</I>","Edit HMI"], renderFunc:DrawHMIScreenList},
	{name:"View Screen List", renderFunc:DrawHMIScreenList},
	{name:"Edit HMI",linked_elems:["Edit Screen List","<I>Run </I>"], tablet_elems:["<I>Edit Code</I>","View HMI","<I>Run </I>"], renderFunc:redrawScreenList},
	{name:"Edit Screen List", renderFunc:redrawScreenList},
	{name:"Flowchart_init",linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], tablet_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"]},
	{name:"Flowchart",linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], tablet_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], renderFunc:showFlowchart},
	{name:"Convert to ARGEE", renderFunc:convertToArgee},
	{name:"About", tablet_elems:["<I>Edit</I>"],  renderFunc:aboutPage},
	{name:"About ", tablet_elems:["<I>Edit Code</I>"], renderFunc:aboutPage},
	{name:"<I>Run</I>", renderFunc:runFlowchart},
	{name:"<I>Test</I>", linked_elems:["<I>Edit</I>"], tablet_elems:["<I>Edit</I>"],renderFunc:testFlowchart},
	{name:"<I>Edit</I>", linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"], linked_elems:["<I>Run</I>","<I>Test</I>","Import/Export ","<I>New Project</I>","Convert to ARGEE","About"],renderFunc:showFlowchart},
];


function doNothing()
{


}

function renderMenu(level_name)
{
	var i,j;
	var elem;
	elem=this.document.getElementById("nav_inner");
	
	for(i=0;i<menu_system.length;i++)
	{
		if (menu_system[i].name==level_name)
		{
			if (menu_system[i].renderFunc!=undefined)
			{
				if (menu_system[i].renderFunc()==false)
				{
					return;
				}
			}
			if ((side_by_side==true)&&(menu_system[i].tablet_elems!=undefined))
			{
				var nav="";
				// render submenu
				nav+="<ul id=\"nav_list\">";
				//nav+="<li><p>"+real_DeviceName+"&nbsp<b><u>Menu:</u></b></p></li>";

				
				for(j=0;j<menu_system[i].tablet_elems.length;j++)
				{
					   var func=" renderMenu(\'"+menu_system[i].tablet_elems[j]+"\');"
						nav+="<li><a href=\"javascript:"+func+"\" onclick=\"return"+func+" \"><b>"+menu_system[i].tablet_elems[j]+"</b></li>";
				}
				nav+="</ul>";
				elem.innerHTML=nav;
			}
			else if (menu_system[i].linked_elems!=undefined)
			{
				var nav="";
				// render submenu
				nav+="<ul id=\"nav_list\">";
				//nav+="<li><p>"+real_DeviceName+"&nbsp<b><u>Menu:</u></b></p></li>";
				for(j=0;j<menu_system[i].linked_elems.length;j++)
				{
					   var func=" renderMenu(\'"+menu_system[i].linked_elems[j]+"\');"
						nav+="<li><a href=\"javascript:"+func+"\" onclick=\"return"+func+" \"><b>"+menu_system[i].linked_elems[j]+"</b></li>";
				}
				nav+="</ul>";
				elem.innerHTML=nav;
			}
		}
	}
	return false;
}
	
//var side_by_side=false;
var side_by_side=true;
var left_col_width=33;
var computer_interface=false;


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

function continueInit()
{


	var outp;
	var settings;
	var first_time_setup;
	var var_div1,nav;
	var i;
	
	
	//var newdiv=.document.createElement("div");
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
if ( location.hash == '#no-back' ) {
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
		
		if (edit_box_rendered==true) 
		{
			handleEditBoxDone(false);
		}
		
      if ( history_api ) history.pushState(null, '', '#stay')
      else location.hash = '#stay'
    }
  }
}
	
	
	if (localStorage.settings!=undefined)
	{
		first_time_setup=false;
		settings=JSON.parse(localStorage.settings);
		if (settings[2]==1)
		{
			var set=clone(settings);
			set[2]=0;
			localStorage.settings=JSON.stringify(set);
		}
		if (settings[0]==interf_types.smartphone)
		{
			side_by_side=false;
			left_col_width=0;
		}
		else
		{
			side_by_side=true;
			left_col_width=settings[1];
		}
	}
	else
	{
		settings=[0,40,0];
		//localStorage.settings=JSON.stringify(settings);
		first_time_setup=true;
	}
	
	
	computer_interface=false;
	if (settings[0]==interf_types.computer)
	{
		computer_interface=true;
	}


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
	
	
	
	nav_div.innerHTML="<div id=\"nav_dev\"></div><div id=\"nav_inner\"></div><div style=\"text-align: center;\" id=\"comp_res_id\"></div>";
	
	device_name_div=this.document.getElementById("nav_dev");
	device_name_div.style.fontSize="16px";	
	device_name_div.style.color="#003300";
	device_name_div.style.opacity="0.7";
	device_name_div.style.paddingRight="1em";
	device_name_div.style.paddingTop="0.2em";
	device_name_div.style.textAlign="right";
	
	//css("p#nav_dev","margin: 0em; display: inline-block; font-size:14px;   text-decoration:none; top:0px;  padding:0px 0.4em 0px 0.4em; color:black;  float:left;text-align:center;  border-left:1px solid red; border-right:1px solid red;");
	device_name_div.innerHTML="<b>"+real_DeviceName+"</b>&nbsp&nbsp (<b>"+requested_ip+"</b>)";
	
	
	if (first_time_setup==false)
	{
		renderMenu("Initial");
	}
	else
	{
		renderMenu("Initial Settings");
	}

	
	/*<ul id=\"nav_list\">"+
						   "<li><a href=\"#\"><b>Home</b></a></li>"+
						   "<li><a href=\"#\"><b>About Us</b></a></li>"+
							"<li><a href=\"#\"><b>Services</b></a></li>"+
						   "<li><a href=\"#\"><b>Products</b></a></li>"+
						   "<li><a href=\"#\"><b>Contact</b></a></li></ul>";
							*/

	
	//this.frames[1].frames[2].document.getElementById("status_div").innerHTML="<fieldset ><legend>Status</legend><textarea  style=\"width:100%;height:100%;\"  id=\"compiled\"></textarea></fieldset>";

	//padding:0.3em 0.4em 0.3em 0.4em;
	comp_res=this.document.getElementById("comp_res_id");
	
	

	if (first_time_setup==true)
	{
		return;
	}

	
	startAjaxTimer();	



	
	redrawVars();
	
	men_div.innerHTML="";
	prog_div.innerHTML="<h2> ARGEE Program </h2><br>"+add_cond_str;

	
	
	
	
	if ((localStorage.var_db!=undefined)&&(localStorage.cond_db!=undefined)&&(localStorage.screens!=undefined))
	{
		if (settings[2]==1)
		{
			loadLastSavedProject();
			DownloadStationConfig();
		}
		else
		{
			var r=confirm("Project not saved - load from localStorage");
			if (r==true)
			{
				comp_res.innerHTML="Download status:Loaded from localStorage";
				loadLastSavedProject();
				DownloadStationConfig();
			}
			else
			{
				DownloadProgText();	
			}
		}
	}
	else
	{
		DownloadProgText();	
	}


}


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
	
			
function testFrame()
{

	var outp;
	var settings;
	var first_time_setup;
	var var_div1,nav;
	var i;

	invokeCompilation=false;	
	
	if ((getDipatchingEnvironmentLocation()!=null)&&(localStorage.redirectIP==undefined))
	{
		window.location=getDipatchingEnvironmentLocation();
		return;
	}

	
	for (i=0;i<100;i++)
   {
      msg_id_enum[i]=i.toString();
   }



	
	
	
	//var newdiv=.document.createElement("div");
	prog_div=this.document.getElementById("prog");
	cont_menu_div=this.document.getElementById("cont_menu");
	men_div=this.document.getElementById("sup_men");
	var_div1=this.document.getElementById("vars");
	nav=this.document.getElementById("navigation");
	
	
	prog_div.style.visibility = 'hidden';
	var_div1.style.visibility = 'hidden';	
	men_div.style.visibility = 'hidden';
	nav.style.visibility = 'hidden';
	var def_ip="192.168.1.200";
	if ((localStorage.def_ip!=undefined)&&(localStorage.def_ip!=null)&&(localStorage.def_ip!=""))
	{
		def_ip=localStorage.def_ip;
	}
	
	var ip;
	if (localStorage.redirectIP!=undefined)
	{
		ip=localStorage.redirectIP;
		delete localStorage.redirectIP;
		localStorage.def_ip=ip;
		requested_ip=ip;
		url_prefix="http://"+ip;
		Download_ARGEE_KernelVersion();
		return;
	}

	
	
	ip=prompt("Enter ARGEE Device IP Address",def_ip);
	
   if ((ip==null)||(ip==""))	
	{
		prog_div.innerHTML="<h1>IP Address not entered</h1>";
		return;
	}
	localStorage.def_ip=ip;
	requested_ip=ip;
	url_prefix="http://"+ip;
	Download_ARGEE_KernelVersion();
}

/* <frameset cols="20%,80%">
<frame name="Configuration" src="vars.html">
<frame name="Main" src="frameset_main.html">


</frameset>
*/

