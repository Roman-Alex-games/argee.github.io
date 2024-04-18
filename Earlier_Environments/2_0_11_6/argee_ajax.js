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


// timer based task
function ajaxTimerTask()
{
	var now = (new Date()).getTime();
	//console.log("AjaxTimer at: "+now);
	if ((activeAjaxAction==null)&&(ajax_actions_queue.length>0))
	{
		activeAjaxAction=ajax_actions_queue[0];
		ajax_actions_queue.splice(0,1);
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
				activeAjaxAction=null;
					
				eraseProject();
				runProject();
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



function sendSubmitList_imp()
{
	//if(invocation)
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
		var arr=new ArrayBuffer(3+9*len);
		var dataView=new DataView(arr);
		var i,j;
		dataView.setUint8(0,6); // code = submit variable list
		dataView.setUint16(1,9*len,true); // length of request =len
		for(i=0;i<len;i++)
		{
			for(j=0;j<5;j++)
			{
				dataView.setUint8(3+9*i+j,submit_var_list[i].enc[j]);
			}
			dataView.setUint32(3+(9*i)+5,submit_var_list[i].val,true);
		}
        invocation.send(arr);
    }
}

function sendSubmitList()
{
	StartLogin(sendSubmitList_imp);
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
					setCompilerMessage(false,false,"<b>Code loaded into the station</b>: <b>Loadable size:</b> " +bytecode_size + " bytes (<b>out of </b> "+max_loadable_prog_size+" bytes). <b>Total Project size:</b>"+prog_code.length +" bytes(<b>out of </b> "+max_total_size+" bytes). ");
				}
				else
				{
					if (first_sim_compilation==false)
					{
						setCompilerMessage(false,true,"Empty project loaded - <b>Boot project stopped!!!!</b>");				
					}
				}
				skip_param_download=false;
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


function getVarsAjax()
{
	var inv = invocation;
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

function getIO_PLC_VarsAjax()
{
	var inv = invocation;
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
					if (debug_var_submit_mode==false)
					{
						redrawVars(false,false);
						if (DBG_savedScrollTop!=-1)
						{
							var_div.scrollTop=DBG_savedScrollTop;
							DBG_savedScrollTop=-1;
						}							
						
					}
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


function Download_ARGEE_KernelVersion()
{
	var inv = invocation;
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
	var inv = invocation;
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


function OBJ_GEN_UID(base,offset)
{
	return (base<<16)|offset;
}

var UID_WEBSERVER_BASE = 54;    
var UID_ARGEE_BASE = 73;    
var UID_DHCPCL_BASE=6;

var IODB_GET_ENTRY_OBJ = OBJ_GEN_UID(UID_WEBSERVER_BASE,5);
var IODB_GET_MOD_NAME_OBJ = OBJ_GEN_UID(UID_WEBSERVER_BASE,6);
var IODB_GET_NUM_ENTRIES_OBJ = OBJ_GEN_UID(UID_WEBSERVER_BASE,4);
var ARGEE_GET_SUB_IDS_OBJ = OBJ_GEN_UID(UID_ARGEE_BASE,10);
var ARGEE_UID = OBJ_GEN_UID(UID_ARGEE_BASE,0);
var ARGEE_CHECK_PASSWORD = OBJ_GEN_UID(UID_ARGEE_BASE,9);
var DHCPCL_DEVICE_NAME = OBJ_GEN_UID(UID_DHCPCL_BASE,3);

var ex_type=
{
	NUM32_ARR:0,
	STR:1,
	DATAVIEW:2,
	IODB_ENT:3,
};

var download_result;
var download_gen;

function* objectExchange(uid,inst,type,silent)
{
	var inv = invocation;
	var now = (new Date()).getTime();
	var dataView;
	var len;
	var i;
	var arr;
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	inv.onreadystatechange=DownloadDatapoints;
	var arr=new ArrayBuffer(15);
	var dataView=new DataView(arr);
	var i;
	var offset=0;
	dataView.setUint8(offset,8); offset++; // code = GOM Access
	dataView.setUint16(offset,12,true);  offset+=2; // length of request =12
	dataView.setUint32(offset,0,true); offset+=4; // read request
	dataView.setUint32(offset,uid,true); offset+=4; 
	dataView.setUint32(offset,inst,true); offset+=4; 
	inv.timeout=1000;
	inv.ontimeout = function ()
	{
		prog_div.style.visibility = 'visible';
		prog_div.innerHTML="<h1>Can not connect to the device: "+url_prefix+"</h1>"; 
		return;
	}

	inv.send(arr);
	if (silent==false)
	{
		setCompilerMessage(false,false,"<b>Please wait ....</b> Exchanging object "+uid.toString(16)+":"+inst);
	}
	inv.onreadystatechange=function()
	{
		if ((this.readyState==4)&&(this.status==200))
		{
			download_gen.next();
		}
	}
	
	yield 1;
	arr=inv.response; // arrayBuffer;
	dataView=new DataView(arr);
	len=dataView.getUint32(0,true);
	switch(type)
	{
		case ex_type.NUM32_ARR:
			var arr1=[];
			for(i=0;i<(len/4);i++)
			{
				arr1[i]=dataView.getUint32(4*i+4,true);
			}
			download_result=arr1;
			break;
		case ex_type.STR:
			var str="";
			for(i=0;i<len;i++)
			{
				if (dataView.getUint8(i+4)==0)
				{
					break;
				}
				str+=String.fromCharCode(dataView.getUint8(i+4));
			}
			download_result=str;
			break;
		case ex_type.DATAVIEW:
			download_result=new DataView(arr,4,len-4);
			break;
		case ex_type.IODB_ENT:
			var ret_obj={};
			var offset;
			offset=4+3;
			ret_obj.dataPointCategory="";
			for(i=0;i<dataView.getUint8(4);i++)
			{
				ret_obj.dataPointCategory+=String.fromCharCode(dataView.getUint8(offset));offset++;
			}
			ret_obj.channelUnit="";
			for(i=0;i<dataView.getUint8(5);i++)
			{
				ret_obj.channelUnit+=String.fromCharCode(dataView.getUint8(offset));offset++;
			}
			ret_obj.dataPointName="";
			for(i=0;i<dataView.getUint8(6);i++)
			{
				ret_obj.dataPointName+=String.fromCharCode(dataView.getUint8(offset));offset++;
			}
			ret_obj.bitOffset=dataView.getUint8(offset);offset++;
			ret_obj.bitLen=dataView.getUint8(offset);offset++;
			ret_obj.bitIncremental=dataView.getUint8(offset);offset++;
			ret_obj.channelNumStart=dataView.getUint8(offset);offset++;
			ret_obj.channelNumEnd=dataView.getUint8(offset);offset++;
			download_result=ret_obj;
			
			

			
	}
}

function* objectRemoteSet(uid,inst,type,val,silent)
{
	var inv = invocation;
	var now = (new Date()).getTime();
	var dataView;
	var len;
	var i;
	var arr;
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	inv.onreadystatechange=DownloadDatapoints;
	var arr=new ArrayBuffer(256);
	var dataView=new DataView(arr);
	var i;
	var offset=0;
	dataView.setUint8(offset,8); offset++; // code = GOM Access
	dataView.setUint16(offset,12,true);  offset+=2; // length of request =12
	dataView.setUint32(offset,1,true); offset+=4; // write request
	dataView.setUint32(offset,uid,true); offset+=4; 
	dataView.setUint32(offset,inst,true); offset+=4;
	
	switch(type)
	{
		case ex_type.NUM32_ARR:
			dataView.setUint16(1,val.length*4+12,true);
			dataView.setUint32(offset,val.length*4,true);offset+=4;
			for(i=0;i<val.length;i++)
			{
				dataView.setUint32(offset,val[i],true);offset+=4;
			}
			break;
		case ex_type.STR:
			dataView.setUint16(1,val.length+12,true);
			dataView.setUint32(offset,val.length,true);offset+=4;
			for(i=0;i<val.length;i++)
			{
				dataView.setUint32(offset,val.charCodeAt(i),true);offset+=1;
			}
			break;
	}
	if (silent==false)
	{
		setCompilerMessage(false,false,"Exchanging object "+uid.toString(16)+":"+inst);
	}
	
	inv.send(arr);
	inv.onreadystatechange=function()
	{
		if ((this.readyState==4)&&(this.status==200))
		{
			download_gen.next();
		}
	}
	inv.timeout=1000;
	inv.ontimeout = function ()
	{
		prog_div.style.visibility = 'visible';
		prog_div.innerHTML="<h1>Can not connect to the device: "+url_prefix+"</h1>"; 
		return;
	}
	yield 1;
}


var sect_type=
{
	input:0,
	output:1,
	diag:2,
	param:3
};



var downld_sects=
 [ {name:"Input",val:2, type: sect_type.input},{name:"Diagnostics",val:1,type:sect_type.diag},{name:"Output",val:3,type:sect_type.output}];

function checkModIdDownload(id)
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

}	

function remapGwBit(slot,sect,bit)
{
	if ((slot==0)&&(downld_sects[sect].type==sect_type.diag))
	{
		var curr_byte=Math.floor(bit/8);
		var curr_bit=bit%8;
		if (curr_byte==0)
		{
			curr_byte=1;
		}
		else
		{
			curr_byte=0;
		}
		return (curr_byte*8)+curr_bit;
	}
	return bit;
}
		
	

function* DownloadDatapoints()
{
	var i,j,k,l;
	var tmp;
	var arr;
	var dataView;
	var len
	var tmp_arr;
	
	var now = (new Date()).getTime();

	
	
	/*yield* objectExchange(BEP_IODB_GET_MOD_NAME_OBJ,0,ex_type.STR);
	console.log(download_result);*/
	yield* objectExchange(ARGEE_GET_SUB_IDS_OBJ,0,ex_type.NUM32_ARR,false);
	//console.log(download_result);
	var num_slots=download_result[0];
	var id_list=clone(download_result.slice(1));
	
	
	for(i=0;i<num_slots;i++)
	{
		var slice_obj={};
		if (checkModIdDownload(id_list[i])==true)
		{
			continue;
		}
		// check if this slice already appears in the database
		yield* objectExchange(IODB_GET_MOD_NAME_OBJ,i,ex_type.STR,false);
		//console.log(download_result);
		slice_obj.name=clone(download_result);
		slice_obj.id=id_list[i];
		slice_obj.sections=[];
		for(j=0;j<downld_sects.length;j++)
		{
			var inst=(downld_sects[j].val<<8)|i;
			yield* objectExchange(IODB_GET_NUM_ENTRIES_OBJ,inst,ex_type.NUM32_ARR,false);
			var num_points=download_result[0];
			var curr_sect;
			var curr_obj;
			if (num_points>0)
			{
				curr_sect=slice_obj.sections.length;
				slice_obj.sections[curr_sect]={type:downld_sects[j].type,objects:[]};
			}
			//console.log("Section "+downld_sects[j].name+" "+num_points+":");
			var downloaded_datapoints=[];
			for(k=0;k<num_points;k++)
			{
				var inst=(k<<16)|(downld_sects[j].val<<8)|i;
				yield* objectExchange(IODB_GET_ENTRY_OBJ,inst,ex_type.IODB_ENT,false);
				downloaded_datapoints[k]=clone(download_result);
			}
			// first add all single channel datapoints
			var num_channels;
			for(k=0;k<num_points;k++)
			{
				download_result=downloaded_datapoints[k];
				if (download_result.channelNumStart==download_result.channelNumEnd)
				{
					curr_obj=slice_obj.sections[curr_sect].objects.length;
					slice_obj.sections[curr_sect].objects[curr_obj]=
						   {name:convertString(/*download_result.dataPointCategory+" "+*/download_result.dataPointName),
						    offset:remapGwBit(i,j,download_result.bitOffset),
							length: download_result.bitLen,
						    signed:false};
				}
				else
				{
					num_channels=(download_result.channelNumEnd-download_result.channelNumStart+1);
				}
			}
			// add all datapoints of channels sorted by channel number
			for(l=0;l<num_channels;l++)
			{
				for(k=0;k<num_points;k++)
				{
					download_result=downloaded_datapoints[k];
					if (download_result.channelNumStart!=download_result.channelNumEnd)
					{
						curr_obj=slice_obj.sections[curr_sect].objects.length;
						slice_obj.sections[curr_sect].objects[curr_obj]=
						   {name:convertString(/*download_result.dataPointCategory+" "+*/download_result.dataPointName+" "+(download_result.channelNumStart+l)),
						    offset:remapGwBit(i,j,download_result.bitOffset+l*download_result.bitIncremental),
							length: download_result.bitLen,
						    signed:false};
					}
				}
			}
		}
		slices[slices.length]=clone(slice_obj);
	}
	DownloadStationConfig1();
}

function DownloadStationConfig()
{
	download_gen=DownloadDatapoints();
	download_gen.next();
}

//var ARGEE_CHECK_PASSWORD=0x00490009;

var invokeAfterLogin=null;
var entered_pass="password";

function* Login_imp()
{
	
	yield* objectRemoteSet(ARGEE_CHECK_PASSWORD,0,ex_type.STR,entered_pass,true);
	yield* objectExchange(ARGEE_CHECK_PASSWORD,0,ex_type.NUM32_ARR,true);
	while(download_result[0]==0)
	{
		entered_pass=prompt("Please enter password", "");
		if (entered_pass==null)
		{
			entered_pass="password";
			return;
		}
		yield* objectRemoteSet(ARGEE_CHECK_PASSWORD,0,ex_type.STR,entered_pass,true);
		yield* objectExchange(ARGEE_CHECK_PASSWORD,0,ex_type.NUM32_ARR,true);
	}
	//Download_ARGEE_KernelVersion();
	invokeAfterLogin();
}

function StartLogin(func)
{
	download_gen=Login_imp();
	invokeAfterLogin=func;
	download_gen.next();
}


function DownloadStationConfig1()
{
	var inv = invocation;
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
			
			
			
            
			
            if (empty_project_detected==true)
            {
                if (hmi_only_mode==true)
                {
                    var var_div1,nav;
                    var_div1=document.getElementById("vars");
                    nav=document.getElementById("navigation");
                    
               		nav.style.height="0em";
                    nav.style.display="none";
                    prog_div.style.width="99%"
                    prog_div.style.left="5px";
                    prog_div.style.right="99%";
                    prog_div.style.top="0em";
                    var_div1.style.top="0em";
                    var_div1.style.display="none";

                    
                	prog_div.style.visibility = 'hidden';
                    var_div1.style.visibility = 'hidden';	
                    men_div.style.visibility = 'hidden';
                    nav.style.visibility = 'hidden';
                    prog_div.style.visibility = 'visible';
                    prog_div.innerHTML="<h1>No Project/HMI screens on device: "+url_prefix+"</h1>"; 
                    activeAjaxAction=null;
                    return;
                }
                else
                {
					initProj(true);
                    renderMenu("Flowchart");			
                    showFlowchart();
                }
            }
			else
            {
                if (hmi_only_mode==true)
                {
                    if (screens.length>0)
                    {
                        renderMenu("HMI");
                        DrawHMIScreenList();
                    }
                    else
                    {
                        var var_div1,nav;
                        var_div1=document.getElementById("vars");
                        nav=document.getElementById("navigation");
                        
                        nav.style.height="0em";
                        nav.style.display="none";
                        prog_div.style.width="99%"
                        prog_div.style.left="5px";
                        prog_div.style.right="99%";
                        prog_div.style.top="0em";
                        var_div1.style.top="0em";
                        var_div1.style.display="none";

                        
                        prog_div.style.visibility = 'hidden';
                        var_div1.style.visibility = 'hidden';	
                        men_div.style.visibility = 'hidden';
                        nav.style.visibility = 'hidden';
                        prog_div.style.visibility = 'visible';
                        prog_div.innerHTML="<h1>No HMI screens on device: "+url_prefix+"</h1>"; 
                        activeAjaxAction=null;
                        return;
                    }
                        
                }
                else
                {
                    if (invokeCompilation==false)
                    {
                        if (editor=="flowchart")
                        {	
                            renderMenu("Flowchart");			
                            showFlowchart();
                        }
                        else
                        {
                            redrawVars(true,false);
                            refreshProg(true);
                        }
                    }
                    else
                    {
                        compileProject1(false,true);
                    }
                }
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

function DownloadProg()
{
	var inv = invocation;
	var now = (new Date()).getTime();
	
	eraseProject();
	//initProj(true); // clear the project
	
	inv.open('POST', url_prefix+'/pg', true);
	inv.responseType = 'arraybuffer';
	inv.timeout=1000;
    inv.ontimeout = function ()
	{
		setCompilerMessage(false,true,"<u><b>Failure to Load the project!!!</b></u>");
		activeAjaxAction=null;
		return;
	}
	inv.onreadystatechange=function()
	{
		var i;
		var now = (new Date()).getTime();
		//console.log("at "+now+" Get AJAX "+this.readyState+" "+this.status+" "+this.responseText.length);
		//addToLog(var now = (new Date()).getTime(););
		if ((this.readyState==4)&&(this.status==200))
		{
			var arr=this.response; // arrayBuffer;
            if (arr.byteLength>0)
            {
                empty_project_detected=false;
                parseARGEE_File(arr,false);
            }
            else
            {
                empty_project_detected=true;
            }
			
			activeAjaxAction=null;
			var now = (new Date()).getTime();
            if (arr.byteLength>0)
            {
                compileProject1(true,true);
            }
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


var invokeCompilation=false;

function compileProject_imp()
{
	invokeCompilation=true;
    empty_project_detected=false;
	if (skip_param_download==true)
	{
		compileProject1(false,true);
	}
	else
	{
		DownloadStationConfig();
	}
	return true;
}

function compileProject()
{
	StartLogin(compileProject_imp);
}

// no need to execute download configuration - assume that Run is already executed
function compileProjectWihtoutSource_imp()
{
    compileProject1(false,false);
}

function compileProjectWihtoutSource()
{
	StartLogin(compileProjectWihtoutSource_imp);
}
