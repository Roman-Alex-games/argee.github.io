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
 *  DESCRIPTION: ARGEE GOM representation. This file contains data structures as
 *               well as object descriptions for GOM objects. It also contains AJAX
 *               code required to transfer objects and project files to the firmware.
 *
 *******************************************************************************/

var TYPE={NUM:0,ARR:1,JS_ARR:2};
 
 
var field_types=
{
	enumeration:0,
	var_list:1,
	str_num:2,
	fixed:3,
	str_num_var:4, // field which exposes variable context menu extension
	str_text_area:5,
	num:6,
	state_enum:7,
	actions_add_delete:8,
	actions_add_delete_init:9,
	enumeration_special:10, // instead of enumerated value -> it stores the actual enumerated string 
};
 
 

 
function GOM_inst(shadow_gom)
{ 

var UID_WEBSERVER_BASE = 54;    
var UID_ARGEE_BASE = 73;    
var UID_DHCPCL_BASE=6;
var UID_MULTPC_BASE=0x1b;
var UID_SAPI_APP_BASE=0x1c;	
var UID_MB_SERVER_BASE=39

/*
var  ARGEE_BOOT_PROJ_ENABLED=2;
var  ARGEE_GET_SUB_IDS_OBJ=10;
var  ARGEE_KERN_VER_VERIFY=18;
var  ARGEE_ENV_VER=19;
var  ARGEE_PROJ_CHECKSUM=20;
var  ARGEE_CTRL_PREEMPT_POINT_OFFSET=21;
var  ARGEE_CTRL_SAVE_LR_OFFSET=22;
var  ARGEE_CTRL_SAVE_SP_OFFSET=23;
var  ARGEE_CTRL_CURR_TASK_OFFSET=24;
var  ARGEE_CTRL_FUNCT_TBL_OFFSET=25;
var  ARGEE_CTRL_FUNCT_TBL_LEN_OFFSET=26;
var  ARGEE_CTRL_IO_MAP_OFFSET=27;
var  ARGEE_CTRL_IO_MAP_LEN=28;
var  ARGEE_CTRL_VAR_SEGM_SIZE=29;
var  ARGEE_RUN_CODE=30;
var  ARGEE_SOURCE_CODE=31;
var  ARGEE_GET_PROG_VARS=32;
var  ARGEE_IO_INP=33;
var  ARGEE_IO_OUTP=34;
var  ARGEE_IO_DIAG=35;
var  ARGEE_IO_PARAM=36;
var  ARGEE_GET_PLC_INP=37;
var  ARGEE_GET_PLC_OUTP=38;
*/




var obj_def=
[

	{UID_BASE:UID_DHCPCL_BASE,
		sub_obj:
		[
			{name:"ARGEE_DEV_NAME",off:3,type:TYPE.ARR,num_inst:1,val:[]},
		]
	},

	{UID_BASE:UID_MULTPC_BASE,
		sub_obj:
		[
			{name:"MULTPC_ORDER_NUM",off:0x16,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"MULTPC_FIELDBUS_CONNECTED",off:38,type:TYPE.NUM,num_inst:1,val:[]},
		]
	},
	{UID_BASE:UID_MB_SERVER_BASE,
		sub_obj:
		[
			{name:"MBS_CONNECTION_TIMEOUT",off:60,type:TYPE.NUM,num_inst:1,val:[]},
		]
	},
   

	{UID_BASE:UID_SAPI_APP_BASE,
		sub_obj:
		[
			{name:"SAPI_APP_VER_STRING",off:3,type:TYPE.ARR,num_inst:1,val:[]},
		]
	},

	{UID_BASE:UID_WEBSERVER_BASE,
		sub_obj:
		[
			{name:"IODB_GET_ENTRY_OBJ",off:5,type:TYPE.ARR,num_inst:0xffffffff,val:[]},
			{name:"IODB_GET_MOD_NAME_OBJ",off:6,type:TYPE.ARR,num_inst:0xffffffff,val:[]},
			{name:"IODB_GET_NUM_ENTRIES_OBJ",off:4,type:TYPE.NUM,num_inst:0xffffffff,val:[]},
			{name:"IODB_GET_ENTRY_ENUM_ELEMS_OBJ",off:8,type:TYPE.ARR,num_inst:0xffffffff,val:[]},			
		]
	},
	

	{UID_BASE:UID_ARGEE_BASE,
		sub_obj:
		[
			{name:"ARGEE_COMP_VER",off:0,type:TYPE.NUM,num_inst:2,val:[]},
			{name:"ARGEE_BOOT_PROJ_ENABLED",off:2,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_GET_SUB_IDS_OBJ",off:10,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_CHECK_PASSWORD",off:9,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_PROJ_TITLE",off:17,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_INTERSCAN_DELAY",off:19,type:TYPE.NUM,num_inst:1,val:[]},
			// only available in get_all_inst command
			//{name:"ARGEE_IO_TARGET_ID",off:39,type:TYPE.NUM,num_inst:100,val:[]},
			
			{name:"ARGEE_KERN_VER_VERIFY",off:118,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_ENV_VER",off:119,type:TYPE.NUM,num_inst:1,val:[],ignore_in_device:true},
			{name:"ARGEE_PROJ_NV_CHECKSUM",off:120,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_PREEMPT_POINT_OFFSET",off:121,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_SAVE_LR_OFFSET",off:122,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_SAVE_SP_OFFSET",off:123,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_CURR_TASK_OFFSET",off:124,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_FUNCT_TBL_OFFSET",off:125,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_FUNCT_TBL_LEN_OFFSET",off:126,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_IO_MAP_OFFSET",off:127,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_INSTR_TRACE_OFFSET",off:128,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_VAR_SEGM_SIZE",off:129,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_RUN_CODE",off:130,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_SOURCE_CODE",off:131,type:TYPE.ARR,num_inst:1,val:[],ignore_in_device:true},
			{name:"ARGEE_GET_PROG_VARS",off:132,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_IO_INP",off:133,type:TYPE.ARR,num_inst:100,val:[]},
			{name:"ARGEE_IO_INP_SUBM_MIRR",off:65536+133,type:TYPE.ARR,num_inst:100,val:[]},
			{name:"ARGEE_IO_OUTP",off:134,type:TYPE.ARR,num_inst:100,val:[]},
			{name:"ARGEE_IO_DIAG",off:135,type:TYPE.ARR,num_inst:100,val:[]},
			{name:"ARGEE_IO_DIAG_SUBM_MIRR",off:65536+135,type:TYPE.ARR,num_inst:100,val:[]},
			{name:"ARGEE_IO_PARAM",off:136,type:TYPE.ARR,num_inst:100,val:[]},
			{name:"ARGEE_GET_PLC_INP",off:137,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_GET_PLC_INP_SUBM_MIRR",off:65536+137,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_GET_PLC_OUTP",off:138,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_IO_TARG_MOD_ID",off:139,type:TYPE.NUM,num_inst:256,val:[]},
			{name:"ARGEE_BASE_MEM_ADDR",off:140,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CLEAR_INSTR_TRACE",off:141,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_PROJ_TYPE",off:142,type:TYPE.NUM,num_inst:1,val:[],ignore_in_device:true},
			{name:"ARGEE_CTRL_LR_CALLER_OFFSET",off:143,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_FP_CALLER_OFFSET",off:144,type:TYPE.NUM,num_inst:1,val:[]},
			// use invalid UID offset >16 bit to avoid having internal objects but still exchangable with the device having same UID
			{name:"ARGEE_ARGEE_STORAGE",off:65536+132,type:TYPE.ARR,num_inst:1,val:[]}, // special object which is a mirror object of ARGEE_GET_PROG_VARS -> used to store the intermediate values in the HMI
			{name:"ARGEE_CURR_TIMER_TICK",off:145,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_PATCHED_CODE_STORAGE",off:(65536*2)+130,type:TYPE.ARR,num_inst:1,val:[]}, // special object which is a mirror object of ARGEE_GET_PROG_VARS -> used to store the breakpoint patched code			
			{name:"ARGEE_BREAKPOINT_UPLOAD_START",off:146,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"ARGEE_BREAKPOINT_UPLOAD_FINILIZE",off:147,type:TYPE.ARR,num_inst:1,val:[]},			
			{name:"ARGEE_CTRL_DIRECT_ASM_CALL_SEGM_OFFSET",off:148,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_CTRL_INTERCYCLE_TIME",off:149,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"ARGEE_PROJ_DEV_NAME",off:150,type:TYPE.ARR,num_inst:1,val:[],ignore_in_device:true},
			{name:"ARGEE_PROJ_DEV_EXPECTED_ENV_REV",off:151,type:TYPE.NUM,num_inst:1,val:[],ignore_in_device:true},
			{name:"ARGEE_PROJ_DEV_ORDER_NUM",off:152,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"NST_ARGEE_BREAKPOINT_ITEM_LIST",off:0,type:TYPE.JS_ARR,num_inst:1,val:[]},	
			{name:"DBG_TASK_TRACE_LEVEL",off:0,type:TYPE.NUM,num_inst:1,val:[]},	
			{name:"DBG_TASK_TRACE",off:0,type:TYPE.JS_ARR,num_inst:1,val:[]},	
			{name:"DEV_RUN",off:0,type:TYPE.NUM,num_inst:1,val:[]},	
			{name:"DEV_EXCEPTION",off:0,type:TYPE.NUM,num_inst:1,val:[]},	
			{name:"INSTR_TRACE",off:0,type:TYPE.JS_ARR,num_inst:1,val:[]},
			{name:"WAIT_TRACE",off:0,type:TYPE.JS_ARR,num_inst:1,val:[]},
			{name:"IP_ADDRESS",off:0,type:TYPE.ARR,num_inst:1,val:[]},
			{name:"GOTO_LINE",off:0,type:TYPE.NUM,num_inst:1,val:[]},	
			{name:"SPECIAL_REG",off:0,type:TYPE.ARR,num_inst:1,val:[]},	
			{name:"SPECIAL_REG_SUBM_MIRR",off:6000,type:TYPE.ARR,num_inst:1,val:[]},	
			{name:"PROG_TRACE_TBL_SEG_OFFSET_OBJ",off:154,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"PROG_HIGH_SPEED_LOADABLE_SEG_OFFSET_OBJ",off:163,type:TYPE.NUM,num_inst:1,val:[]},
			{name:"HMI_SOURCE_CODE",off:7000,type:TYPE.ARR,num_inst:1,val:[],ignore_in_device:true},	
			{name:"MODULE_LIST_ARRAY",off:7001,type:TYPE.ARR,num_inst:1,val:[],ignore_in_device:true},	
			{name:"ARGEE_PROJ_APP_VER_STRING",off:7002,type:TYPE.ARR,num_inst:1,val:[],ignore_in_device:true},	
			{name:"ARGEE_PROJ_CHECKSUM",off:7003,type:TYPE.NUM,num_inst:1,val:[],ignore_in_device:true},
			{name:"DEV_EXCEPTION_NUM",off:0,type:TYPE.NUM,num_inst:1,val:[]},	
		]
	}
]	
var url;
function setDestinationURL(targetURL)
{
	url=targetURL;
}

function getValDataView(obj_str,inst)
{
	var id=objEnum[obj_str];
	return objDb[id].elem.val_dv[inst];	
}

function getPrevDataView(obj_str,inst)
{
	var id=objEnum[obj_str];
	return objDb[id].elem.prev_dv[inst];	
}


function clearDVs()
{
	for(i in objDb)
	{
		if (objDb[i].elem.val_dv!=undefined)
		{
			//delete objDb[i].elem.val_dv;
			delete objDb[i].elem.prev_dv;
			delete objDb[i].elem.prev_val;
		}
	}
}

function findObj(uid)
{
	var i,j;
	var uid_real=uid>>>16;
	var uid_off=uid&0xffff;
	for(i=0;i<obj_def.length;i++)
	{
		if (obj_def[i].UID_BASE==uid_real)
		{
			for(j=0;j<obj_def[i].sub_obj.length;j++)
			{
				if (obj_def[i].sub_obj[j].off==uid_off)
				{
					return objEnum[obj_def[i].sub_obj[j].name];
				}
			}
		}
	}
	return 0xffffffff;
}


function getObjNameStr(uid)
{
	var i,j;
	var uid_real=uid>>>16;
	var uid_off=uid&0xffff;
	for(i=0;i<obj_def.length;i++)
	{
		if (obj_def[i].UID_BASE==uid_real)
		{
			for(j=0;j<obj_def[i].sub_obj.length;j++)
			{
				if (obj_def[i].sub_obj[j].off==uid_off)
				{
					return obj_def[i].sub_obj[j].name;
				}
			}
		}
	}
	return null;
	
}

var objDb=[];

var objEnum={};

function getObjEnum()
{
	return objEnum;
}


function convertJsonToGOM(json_obj_list)
{
   var i;
   for(i=0;i<json_obj_list.length;i++)
   {
      var oid=objEnum[json_obj_list[i].name];
		if (objDb[oid].elem.type==TYPE.NUM)
		{
			objDb[oid].elem.val[json_obj_list[i].inst]=json_obj_list[i].val;
		}
		else
		{
         var len1=json_obj_list[i].val.length;
         var arr1 = Object.values(json_obj_list[i].val);
         var arr=new Uint8Array(arr1);
			objDb[oid].elem.val[json_obj_list[i].inst]=arr.buffer;
			syncDV(oid,json_obj_list[i].inst);
		}
   }
}

function convertToJSObj(gom_obj_list)
{
   var i;
   var obj_list=[];
   for(i=0;i<gom_obj_list.length;i++)
   {
      var name=gom_obj_list[i][0];
      var inst=gom_obj_list[i][1];
      var oid=objEnum[name];
      var ptr=objDb[oid].elem.val[inst];
      if (objDb[oid].elem.type==TYPE.NUM)
      {
         len=4;
      }
      else
      {
         len=ptr.byteLength;
      }
      obj_list[obj_list.length]={name:name,inst:inst,type:objDb[oid].elem.type};
      if (objDb[oid].elem.type==TYPE.NUM)
      {
         obj_list[obj_list.length-1].val=ptr;
      }
      else
      {
         obj_list[obj_list.length-1].val=new Uint8Array(ptr);
      }
   }
   return obj_list;
}

function addObjToFrame(dv,offset,obj_str,inst)
{
	var curr;
	var oid=objEnum[obj_str];
	var uid=(objDb[oid].base.UID_BASE<<16|(objDb[oid].elem.off&0xffff));
	var len,i;
	var ptr=objDb[oid].elem.val[inst];
	if (objDb[oid].elem.type==TYPE.NUM)
	{
		len=4;
	}
	else
	{
		len=ptr.byteLength;
	}
	
	if ((len+offset)>=max_proj_size)
	{
		return -1;
	}
	
	var ignore_in_firmware;
	if (objDb[oid].elem.ignore_in_device==true)
	{
		ignore_in_firmware=true;
	}
	else
	{
		ignore_in_firmware=false;
	}
	curr=offset;
	dv.setUint32(curr,uid,true);curr+=4;
	dv.setUint32(curr,inst,true);curr+=4;
	var len_with_flags=len|(ignore_in_firmware<<24);
	dv.setUint32(curr,len_with_flags,true);curr+=4;
	if (objDb[oid].elem.type==TYPE.NUM)
	{
		dv.setUint32(curr,ptr,true);
		curr+=4;
	}
	else
	{
		var map=new Uint8Array(ptr);
		for(i=0;i<len;i++)
		{
			dv.setUint8(curr,map[i]);
			curr++;
		}
	}
	return curr;
}

function constructObjDb()
{
	var i,j;
	var enum_list;
	var last_obj_elem=0;
	objEnum={};
	
	for(i=0;i<obj_def.length;i++)
	{
		var base=obj_def[i].base;
		for(j=0;j<obj_def[i].sub_obj.length;j++)
		{
			objEnum[obj_def[i].sub_obj[j].name]=last_obj_elem;
			objDb[last_obj_elem]={elem:obj_def[i].sub_obj[j],base:obj_def[i]};
			last_obj_elem++;
		}
	}
}	

function setObjNum(id_str,inst,val)
{
	var id=objEnum[id_str];
	objDb[id].elem.val[inst]=val;
}

function getObjByName(id_str)
{
	var id=objEnum[id_str];
	return objDb[id];
}
function getObjByOID(oid)
{
	return objDb[oid];
}
	
	

function syncDV(oid,inst)
{
	if (objDb[oid].elem.val_dv==undefined)
	{
		objDb[oid].elem.val_dv=[];
	}
	objDb[oid].elem.val_dv[inst]=new DataView(objDb[oid].elem.val[inst]);
	if ((objDb[oid].elem.prev_val==undefined)||(objDb[oid].elem.prev_val[inst]==undefined))
	{
		copyCurrToPrev(oid,inst);
	}
}

function setObjArrCompressed(id_str,inst,arr)
{
	var compr=pako.deflate(new Uint8Array(arr),{level:9});
	setObjArr(id_str,inst,compr.buffer);
}

// Array elements are always typed arrays
function setObjArr(id_str,inst,arr)
{
	var i;
	var id=objEnum[id_str];
	if (objDb[id].elem.type==TYPE.JS_ARR)
	{
		objDb[id].elem.val[inst]=fastClone(arr);
	}
	else
	{
		objDb[id].elem.val[inst]=arr.slice(0);
		if (objDb[id].elem.val_dv==undefined)
		{
			objDb[id].elem.val_dv=[];
		}
		objDb[id].elem.val_dv[inst]=new DataView(objDb[id].elem.val[inst]);
	}
}

function setObjArrAtOffset(id_str,inst,offset,arr,len)
{
	var i;
	var id=objEnum[id_str];
	var arr1=new Uint8Array(arr);
	for(i=0;i<len;i++)
	{
		objDb[id].elem.val_dv[inst].setUint8(offset+i,arr1[i]);
	}
}

function getObjNum(id_str,inst)
{
	var id=objEnum[id_str];
	return objDb[id].elem.val[inst];
}

function getObjArrCompressed(id_str,inst)
{
	var obj=getObjArr(id_str,inst);
	var arr;
	try
	{
		arr=pako.inflate(new Uint8Array(obj))
	}
	catch(e)
	{
		arr=new Uint8Array(obj);
	}
	return arr.buffer;
}

function getObjArr(id_str,inst)
{
	var id=objEnum[id_str];
	return objDb[id].elem.val[inst];
}

// assume we only use this function for array objects
function copyCurrToPrev(id,inst)
{
	if (objDb[id].elem.prev_val==undefined)
	{
		objDb[id].elem.prev_val=[];
	}
	objDb[id].elem.prev_val[inst]=objDb[id].elem.val[inst].slice(0);
	if (objDb[id].elem.prev_dv==undefined)
	{
		objDb[id].elem.prev_dv=[];
	}
	objDb[id].elem.prev_dv[inst]=new DataView(objDb[id].elem.prev_val[inst]);
}

function getObjPrev(id_str,inst)
{
	var id=objEnum[id_str];
	if (objDb[id].elem.prev_val==undefined)
	{
		copyCurrToPrev(id,inst);
	}
}

function getObjType(id_str)
{
	var id=objEnum[id_str];
	return objDb[id].elem.type;
}

function syncObjPrev(id_str,inst)
{
	var id=objEnum[id_str];
	copyCurrToPrev(id,inst);
}

function convStringToArr(str)
{
	var i;
	var arr=new Uint8Array(str.length+1);
	for(i=0;i<str.length;i++)
	{
		arr[i]=str.charCodeAt(i);
	}
	arr[arr.length]=0; // null terminate
	return arr.buffer;
}

function convUnicodeStringToArr(str)
{
	var enc=new TextEncoder();
	var arr=enc.encode(str);
	var arr_null_term=new Uint8Array(arr.byteLength+1);
	arr_null_term.set(arr.slice(0));
	arr_null_term[arr_null_term.byteLength-1]=0;
	return arr_null_term.buffer;
}

function convArrToUnicodeString(arr)
{
	var dec=new TextDecoder("utf-8");
	var str=dec.decode(arr);
	// check the last byte. if it is 0-> remove it.
	if (str.charCodeAt(str.length-1)==0)
	{
		return str.slice(0,str.length-1);
	}
	return str;
}



function convArrBufToArr(arrBuf,len)
{
	return arrBuf.slice(0,len);
}

function convArrBufToArr8(arrBuf)
{
	var i;
	var res=[];
	var arr_buf=new Uint8Array(arrBuf);
	for(i=0;i<arr_buf.byteLength;i++)
	{
		res[i]=arr_buf[i];
	}
	return res;
}



function convArr8ToArrBuf(arr8)
{
	var i;
	var arr_buf=new Uint8Array(arr8.length);
	for(i=0;i<arr8.length;i++)
	{
		arr_buf[i]=arr8[i];
	}
	return arr_buf.buffer;
}


function convArrBuftoArr32(arrBuf)
{
	var i;
	var res=[];
	var arr_buf=new Uint32Array(arrBuf);
	for(i=0;i<ToInt32(arrBuf.byteLength/4);i++)
	{
		res[i]=arr_buf[i];
	}
	return res;
}

function convArr32ToArrBuf(arr32)
{
	var i;
	var arr_buf=new Uint32Array(arr32.length);
	for(i=0;i<arr32.length;i++)
	{
		arr_buf[i]=arr32[i];
	}
	return arr_buf.buffer;
}




function arrToString(arr)
{
	var i;
	var map=new Uint8Array(arr);
	var str="";
	for(i=0;i<arr.byteLength;i++)
	{
		if (map[i]==0)
		{
			break;
		}
		str+=String.fromCharCode(map[i]);
	}
	return str;
}
	

/* AJAX code */
var download_gen;

var gom_op=
{
	READ:0,
	WRITE:1,
	MULT_INST_READ:2,
	WRITE_WITH_OFFSET:3,
	//READ_WITH_OFFSET:4,
	UID_TO_OID:5,
	STORE_ARGEE_FILE:6,
	READ_ARGEE_FILE:7,
	GOM_HDLR_CMD_EXT_WRITE_WITH_OFFSET:10,
	GOM_HDLR_CMD_READ_BATCH:15,
};

var max_proj_size=256*1024;

var tmp_arr=new ArrayBuffer(256*1024);

function startObjExchangeFunc(func)
{
	//console.log("new obj exchange");
	abort_ajax=false;
	download_gen=func();
	download_gen.next();	
}

function advanceGen()
{
	download_gen.next();
}

var curr_ajax=null;
var last_sent_arr;
var lastProjFileSize;

function getLastProjFileSize()
{
	return lastProjFileSize;
}

function loadProjFromLocalStorage()
{
	IO_CONF.loadParams();
	loadProjTitleFromLocalStorage();
	var prj=JSON.parse(getLocalStorage("prog_code"));
	//loadProjTitleFromLocalStorage();
	if (getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
	{
		var title="";
		setObjArr("ARGEE_PROJ_TITLE",0,convStringToArr(title));
	}
	if (prj==null)
	{
		FLOW.initProj(true);
		FLOW.showFlowchart();
		renderMenu("show_flow_menu_only");
	}
	else if (prj.constants!=undefined)
	{
		FLOW.loadFlowchart();
		FLOW.showFlowchart();
		renderMenu("show_flow_menu_only");
	}
	else if (prj.editor==ENV.ARGEE)
	{
		DESCR.loadLocal();
		adjustMenuScreen(1);
		DESCR.renderDefaultView(true)
		renderMenu("show_pro_menu_only");

	}
	else
	{
		NST.showLocal();
		renderMenu("show_pro_menu_only");

	}
}

function createPartialExport(dv)
{
		var params=getLocalStorage("params");
		var prj_title=getLocalStorage("title");
		var code=getLocalStorage("prog_code");
		var comb_proj={params:params,prj_title:prj_title,code:code};
		var comb_proj_str=JSON.stringify(comb_proj);
		dv.setUint32(0,0x30fffff1,true);//magic_num
		dv.setUint32(4,comb_proj_str.length,true);
		var i;
		
		for(i=0;i<comb_proj_str.length;i++)
		{
			dv.setUint8(8+i,comb_proj_str.charCodeAt(i));
		}
		return 8+comb_proj_str.length;
}


function loadPartialFile(dv)
{
	var i;
	str=""
	var len=dv.getUint32(4,true);
	for(i=0;i<len;i++)
	{
		str+=String.fromCharCode(dv.getUint8(8+i));
	}
	var obj=JSON.parse(str);
	if (obj.params!=null) setLocalStorage("params",obj.params);
	if (obj.title!=null) setLocalStorage("title",obj.prj_title);
	setLocalStorage("prog_code",obj.code);
	loadProjFromLocalStorage();
}

function createProjFile(obj_str)
{
	// obj_str contains the list of objects and instances
	var tmp_buf=new ArrayBuffer(1024*1024); // large temp buffer		
	var dv=new DataView(tmp_buf);
	var curr=12;
	var num_obj=0;
	var file_size=0;
	var checksum_pos=-1;
	if (obj_str==null)
	{
		curr=createPartialExport(dv);
	}
	else
	{
		setObjNum("ARGEE_PROJ_CHECKSUM",0,0);
		for(i=0;i<obj_str.length;i++)
		{
			var obj_name=obj_str[i][0];
			var obj_inst=obj_str[i][1];
            var obj_len;
			if (obj_name=="ARGEE_PROJ_CHECKSUM")
			{
				checksum_pos=curr+12; // 12 byte offset to account for UID,INST,LEN_FLAG
			}
            if (debug_console==true)
            {
                console.log("adding object "+obj_name+" inst "+obj_inst+" curr_offset "+curr);
            }
            obj_len=curr;
			curr=addObjToFrame(dv,curr,obj_name,obj_inst);num_obj++;
            obj_len=curr-obj_len;
            if (debug_console==true)
            {
                console.log("obj len "+obj_len);
            }
            
			if (curr==-1)
			{
				return null;
			}
		}
		dv.setUint32(0,0x30ffffff,true);//magic_num
		dv.setUint32(4,curr-12,true); // file size
		dv.setUint16(8,num_obj,true);
		dv.setUint16(10,PROCESS.isRT_Enabled(),true); // currently one bit 0 is used
		var checksum=0;
		if (checksum_pos!=-1)
		{
			for(i=0;i<curr;i++)
			{
				checksum+=dv.getUint8(i);
			}
			dv.setUint32(checksum_pos,checksum,true);
			setObjNum("ARGEE_PROJ_CHECKSUM",0,checksum);
		}
	}
	var new_buf=tmp_buf.slice(0,curr);
	lastProjFileSize=new_buf.byteLength;
	
	return new_buf;	
}

function parseARGEE2(dataView)
{
	var i,j;
	var scanlist_size_offset=16;
	var param_size_offset=20;
	var bin_code_size_offset=28;
	var source_code_size_offset=32;
	var second_header_pos_offset=56;
	var header_size=68;
	var scanlist_size=dataView.getUint32(scanlist_size_offset,true);
	var param_size=dataView.getUint32(param_size_offset,true);
	var bin_code_size=dataView.getUint32(bin_code_size_offset,true);
	var source_code_size=dataView.getUint32(source_code_size_offset,true);
	var second_header_pos=dataView.getUint32(second_header_pos_offset,true);
	var gom_size=dataView.getUint16(second_header_pos+2,true)+4;
	var source_code_offset=header_size+scanlist_size+param_size+gom_size+bin_code_size;
	var text="";
	var scanlist=[];
	var scanlist_offset=header_size;
	
	var kern_ver, env_ver, firware_ver,checksum;
	
	setObjNum("ARGEE_KERN_VER_VERIFY",0,dataView.getUint32(0,true));
	setObjNum("ARGEE_ENV_VER",0,dataView.getUint32(4,true));
   setObjNum("ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0,dataView.getUint32(4,true));
	setObjNum("ARGEE_PROJ_CHECKSUM",0,dataView.getUint32(8,true));
	
	var third_header_offset_addr=52;
	var third_header_offset_pos=dataView.getUint32(third_header_offset_addr,true);
	var order_num=0;
	var firmware_rev=0;
	if (third_header_offset_pos!=0)
	{
		order_num=dataView.getUint32(third_header_offset_pos,true);
		firmware_rev=dataView.getUint32(third_header_offset_pos+4,true);
	}
	setObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0,order_num);
	setObjArr("ARGEE_PROJ_APP_VER_STRING",0,convStringToArr("V"+num2dot(firmware_rev)));
	

	
	
	scanlist[0]=(scanlist_size/4);
	for(i=0;i<(scanlist_size/4);i++)
	{
		scanlist[i+1]=dataView.getUint32(scanlist_offset+4*i,true);		
	}
	var arr=new Uint32Array(scanlist.length);
	for(i=0;i<scanlist.length;i++)
	{
		arr[i]=scanlist[i];
	}
	setObjArr("MODULE_LIST_ARRAY",0,arr.buffer);
		
	var params=[];
	var params_offset=header_size+scanlist_size;
	var curr_offset=params_offset;
	for(i=0;i<(scanlist_size/4);i++)
	{
		var size=dataView.getUint8(curr_offset);curr_offset++;
		params[i]=new Uint8Array(size);
		for(j=0;j<size;j++)
		{
			params[i][j]=dataView.getUint8(curr_offset);curr_offset++;
		}
		setObjArr("ARGEE_IO_PARAM",i,params[i].buffer);
	}
	
	for(i=0;i<source_code_size;i++)
	{
		if (dataView.getUint8(source_code_offset+i)==0)
		{
			break;
		}
		text+=String.fromCharCode(dataView.getUint8(source_code_offset+i));
	}
	var conv=IMP.convertARGEE2_Proj(text);
	setObjArrCompressed("ARGEE_SOURCE_CODE",0,convUnicodeStringToArr(conv.prog_text));
	setObjArr("ARGEE_PROJ_TITLE",0,convStringToArr(conv.proj_title));
	setObjNum("ARGEE_PROJ_TYPE",0,ENV.ARGEE);
}

var proj_rt_state=0;
function getProjRT_State()
{
	return proj_rt_state;
}
function loadProjFile(arr,module,only_proper_files)
{
	var dataView=new DataView(arr);
	var magic_num=dataView.getUint32(0,true);
	var i;
	
	if ((only_proper_files==true)&&(magic_num!=0x30ffffff))
	{
		return false;
	}
	if (magic_num==0x30fffff1)
	{
		// loading project which doesn't compile
		var_div=document.getElementById("vars");
		prog_div.style.width=(100-left_col_width)+"%";
		var_div.style.width=(left_col_width-1)+"%";
		prog_div.style.left=left_col_width+"%";
		var_div.style.left="5px";
		var_div.style.right=left_col_width+"%";
		var_div.style.display="block";
		loadPartialFile(dataView);
		return "partial";
	}
	if (magic_num!=0x30ffffff)
	{
		if ((magic_num&0xff000000)==0x02000000)
		{
			parseARGEE2(dataView);
			return true;
		}
		return false;
	}
	offset=8;
	var num_objs=dataView.getUint16(offset,true);offset+=4;
	for(i=0;i<num_objs;i++)
	{
		var uid=dataView.getUint32(offset,true);offset+=4;
		var inst=dataView.getUint32(offset,true);offset+=4;
		var len_and_flags=dataView.getUint32(offset,true);offset+=4;
		// ignore flags
		var obj_len=len_and_flags&0xffffff;
		var oid=findObj(uid);
		var data;
		if (objDb[oid].elem.type==TYPE.NUM)
		{
			data=dataView.getUint32(offset,true);offset+=4;
			if (module==false)
			{
				objDb[oid].elem.val[inst]=data;
			}
		}
		else
		{
			data=arr.slice(offset,offset+obj_len);offset+=obj_len;
			if ((module==false)||(objDb[oid].elem.name=="ARGEE_SOURCE_CODE"))
			{
				setObjArr(objDb[oid].elem.name,inst,data);
				}
		}
	}
	return true;
}

var first_time_send=true;
var first_trans_clone;

var simple_request_time=-1;

function setSimpleRequestTime(tm)
{
	simple_request_time=tm;
}

// exchange syncs data with the local object database in JS
function* objectExchange(obj_str,inst,op,silent,offs,len) // offset/length used for read/write with offset
{
   if (typeof window === 'undefined') 
   {
      curr_ajax= new XMLHttpRequest();
   }
   else
   {
      if (SIM.getSimMode()==true)
      {
         curr_ajax=SIM.getSimAjaxObj();
      }
      else
      {
         curr_ajax= new XMLHttpRequest();
      }
   }
	var inv=curr_ajax;
	var now = (new Date()).getTime();
	var dataView;
	var len;
	var i,j;
	var arr;
	inv.open('POST', url+'/pg', true);
	inv.responseType = 'arraybuffer';
	var arr=tmp_arr;
	var dataView=new DataView(arr);
	var i;
	var offset=0;
	var oid=0;;
	var uid=0;;
	dataView.setUint8(offset,8); offset++; // code = GOM Access
							     offset+=2; // skip request length for now;
	var op_id=gom_op[op];
    dataView.setUint32(offset,op_id,true);offset+=4; // Operation
	if (op_id==gom_op.STORE_ARGEE_FILE)
	{
		// obj_str contains arrayBuffer for the project ->createProjFile needs to be called first
		dataView.setUint32(offset,obj_str.byteLength,true);offset+=4;
		var tmp_arr1=new Uint8Array(obj_str);
		for(i=0;i<obj_str.byteLength;i++)
		{
			dataView.setUint8(offset,tmp_arr1[i]);offset++;
		}
	}
	else if (op_id==gom_op.WRITE_WITH_OFFSET)
	{
		oid=objEnum[obj_str];
		uid=(objDb[oid].base.UID_BASE<<16|(objDb[oid].elem.off&0xffff));
		dataView.setUint32(offset,uid,true);offset+=4;
		dataView.setUint32(offset,inst,true);offset+=4;
		// offs -> contain tuples [offset(16 bit, len (16 bit)]
		dataView.setUint32(offset,offs.length,true);offset+=4;
		var dv_obj=objDb[oid].elem.val_dv[inst];
		for(i=0;i<offs.length;i++)
		{
			dataView.setUint16(offset,offs[i][0],true);offset+=2;
			dataView.setUint16(offset,offs[i][1],true);offset+=2;
			for(j=0;j<offs[i][1];j++)
			{
				dataView.setUint8(offset,dv_obj.getUint8(offs[i][0]+j));offset+=1;
			}
		}
	}
	else if ((op_id==gom_op.READ)||(op_id==gom_op.WRITE)
	   )
	{
		oid=objEnum[obj_str];
		uid=(objDb[oid].base.UID_BASE<<16|(objDb[oid].elem.off&0xffff));
		dataView.setUint32(offset,uid,true);offset+=4;
		dataView.setUint32(offset,inst,true);offset+=4;
		if (op_id==gom_op.WRITE)
		{
			if (objDb[oid].elem.type==TYPE.NUM)
			{
				dataView.setUint32(offset,4,true);offset+=4; //length
				dataView.setUint32(offset,objDb[oid].elem.val[inst],true);offset+=4; 
			}
			else
			{
				dataView.setUint32(offset,objDb[oid].elem.val[inst].byteLength,true);offset+=4; //length
				var map=new Uint8Array(objDb[oid].elem.val[inst]);
				for(i=0;i<objDb[oid].elem.val[inst].byteLength;i++)
				{
					dataView.setUint8(offset,map[i],true);offset+=1; 
				}
			}
		}
	}
	else if (op_id==gom_op.MULT_INST_READ)
	{
		//obj_str -> contains a list of objects to transfer 
		dataView.setUint32(offset,obj_str.length,true);offset+=4; //length
		for(i=0;i<obj_str.length;i++)
		{
			var oid=objEnum[obj_str[i]];
			objDb[oid].elem.remote_oid;
			dataView.setUint32(offset,objDb[oid].elem.remote_oid,true);offset+=4; 
		}
	}
	else if (op_id==gom_op.UID_TO_OID)
	{
		oid=objEnum[obj_str];
		if (objDb[oid].elem.remote_oid!=undefined)
		{
			return;
		}
		uid=(objDb[oid].base.UID_BASE<<16|(objDb[oid].elem.off&0xffff));
		dataView.setUint32(offset,uid,true);offset+=4;
	}
	
	dataView.setUint16(1,offset&0xffff,true); // length of request => current offset
	var arr=tmp_arr.slice(0,offset);
	
	if (op_id==gom_op.STORE_ARGEE_FILE)
	{
		//console.log("create on_progress callback");
		startFileUploadProgressUpdate();
	}
	
	if (op_id==gom_op.READ_ARGEE_FILE)
	{
		if (simple_request_time==-1)
		{
			inv.timeout=10000;
		}
		else
		{
			inv.timeout=1024*simple_request_time;
		}
		console.log("Load file timeout="+inv.timeout);
	}
	else if (op_id==gom_op.STORE_ARGEE_FILE)
	{
		if (simple_request_time==-1)
		{
	      inv.timeout=4000+(offset/10)|0;
		}
		else
		{
		   inv.timeout=600*simple_request_time+((offset/10)*simple_request_time);
      }
      console.log("Store file timeout="+inv.timeout);
	}
	else
	{
	    if (simple_request_time==-1)
		{
	      inv.timeout=4000;
		}
		else
		{
		   inv.timeout=600*simple_request_time;
		}
		//console.log("Simple Request timeout="+inv.timeout);
	}
	inv.ontimeout = function ()
	{
		if (op_id==gom_op.STORE_ARGEE_FILE)
		{
			stopFileUploadProgressUpdate();
		}
		prog_div.style.visibility = 'visible';
		prog_div.innerHTML="<h1>Can not connect to the device: "+url+"</h1>"; 
		return;
	}

	inv.onreadystatechange=function()
	{
		if ((this.readyState==4)&&(this.status==200))
		{

			if (op_id==gom_op.STORE_ARGEE_FILE)
			{
				stopFileUploadProgressUpdate();
			}
			if (abort_ajax==true)
			{
				console.log("AJAX Aborted");
				abort_ajax=false;
				return;
			}
			download_gen.next();
		}
		else if (this.readyState==4)
		{
         if (abort_ajax==false)
         {
            if (setCompilerMessage(false,true,"<b>Transmission failed</b>")==false)
            {
               prog_div.style.visibility = 'visible';
               prog_div.innerHTML="<h1>Communication failure with device: "+url+"</h1>"; 
            }
         }
			stopFileUploadProgressUpdate();
		}
			
	}

	/*if ((op_id==gom_op.STORE_ARGEE_FILE)&&(first_time_send==true))
	{
		first_time_send=false;
		first_trans_clone=arr.slice(0);
	}
	else if (op_id==gom_op.STORE_ARGEE_FILE)
	{
		if (arr.byteLength!=first_trans_clone.byteLength)
		{
			alert("error in length");
		}
		var a1=new Uint8Array(arr);
		var a2=new Uint8Array(first_trans_clone);
		for(i=0;i<arr.byteLength;i++)
		{
			if (a1[i]!=a2[i])
			{
				alert("error in array "+i);
				return;
			}
		}
		
	}*/
	last_sent_arr=arr;
	inv.send(arr);
	if (silent==false)
	{
		//setCompilerMessage(false,false,"<b>Please wait ....</b> Exchanging object "+uid.toString(16)+":"+inst);
	}

   if (typeof window === 'undefined') 
   {
      
   }
   else
   {
      
      if (SIM.getSimMode()==true)
      {
         SIM.simExchTrig();
      }
   }
	
	yield 1;
	arr=inv.response; // arrayBuffer;
	dataView=new DataView(arr);
	offset=0;
   
	if (op_id==gom_op.READ)
	{
		var len1=dataView.getUint32(offset,true);offset+=4;
		if (objDb[oid].elem.type==TYPE.NUM)
		{
			objDb[oid].elem.val[inst]=dataView.getUint32(offset,4,true);
		}
		else
		{
			objDb[oid].elem.val[inst]=arr.slice(4);
			syncDV(oid,inst);
		}
	}
	else if (op_id==gom_op.UID_TO_OID)
	{
		objDb[oid].elem.remote_oid=dataView.getUint32(0,true);
		//console.log("Remote OID "+obj_str+"="+objDb[oid].elem.remote_oid);
	}
	else if (op_id==gom_op.MULT_INST_READ)
	{
		for(i=0;i<obj_str.length;i++)
		{
			var oid=objEnum[obj_str[i]];
			offset+=4; // skip OID
			var num_inst=dataView.getUint32(offset,true);offset+=4;
			for(j=0;j<num_inst;j++)
			{
				var inst_len=dataView.getUint32(offset,true);offset+=4;
				var val;
				if (objDb[oid].elem.type==TYPE.NUM)
				{
					val=dataView.getUint32(offset,true);offset+=4;
				}
				else
				{
					val=arr.slice(offset,offset+inst_len);offset+=inst_len;
				}
				objDb[oid].elem.val[j]=val;
				if (objDb[oid].elem.type!=TYPE.NUM)
				{
					syncDV(oid,j);
				}
			}
		}
	}
	else if (op_id==gom_op.READ_ARGEE_FILE)
	{
		// Do I need to store the specific objects that are present in the project file?
		// read header
		if (arr.byteLength<12)
		{
			return;
		}
		var magic_num=dataView.getUint32(0,true);
		if (magic_num!=0x30ffffff)
		{
			if ((magic_num&0xff000000)==0x02000000)
			{
				parseARGEE2(dataView);
				return;
			}
			return;
		}
		offset=8;
		proj_rt_state=0;

		var num_objs=dataView.getUint16(offset,true);offset+=2;
		var flags=dataView.getUint16(10,true);offset+=2; // currently one bit 0 is used
		if ((flags&1)!=0)
		{
			proj_rt_state=1;
		}

		for(i=0;i<num_objs;i++)
		{
			var uid=dataView.getUint32(offset,true);offset+=4;
			var inst=dataView.getUint32(offset,true);offset+=4;
			var len_and_flags=dataView.getUint32(offset,true);offset+=4;
			// ignore flags
			var obj_len=len_and_flags&0xffffff;
			var oid=findObj(uid);
			var data;
			if (objDb[oid].elem.type==TYPE.NUM)
			{
				data=dataView.getUint32(offset,true);offset+=4;
				objDb[oid].elem.val[inst]=data;
			}
			else
			{
				data=arr.slice(offset,offset+obj_len);offset+=obj_len;
				setObjArr(objDb[oid].elem.name,inst,data);
			}
		}
	}
}	
		

var ajax_actions_queue=[];
var activeAjaxAction=null;
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
	/*if (activeAjaxAction==null)
	{
		stopAjaxTimer();
		setInterval(ajaxTimerTask,1);
	}*/
}

function finAjaxAction()
{
	activeAjaxAction=null;
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
		startObjExchangeFunc(activeAjaxAction);
	}
}

function clearAjaxQueue()
{
	activeAjaxAction=null;
	ajax_actions_queue=[];
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!  AUTO-REFRESH Handling !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var auto_refresh_in_progress=false;
var auto_refreshcallback=null;
var refresh_timer_id=null;

var file_upload_timer=null;
var number_of_dots=0;

function fileUploadProgress()
{
	stopFileUploadProgressUpdate();
	var str="";
	var i;
	for(i=0;i<number_of_dots;i++)
	{
		str+=".";
	}
	setCompilerMessage(false,false,"<b>Project file uploading "+str+"</b>");
	number_of_dots++;
	file_upload_timer=setTimeout(fileUploadProgress,100);
}

function stopFileUploadProgressUpdate()
{
	if (file_upload_timer!=null)
	{
		clearTimeout(file_upload_timer);	
	}
	file_upload_timer=null;
}

function startFileUploadProgressUpdate()
{
	number_of_dots=0;
	file_upload_timer=setTimeout(fileUploadProgress,0);
}

function triggerAutoRefresh()
{
	addAjaxAction(autoRefreshWrapper);	
}

function autoRefreshStart(func)
{
	auto_refreshcallback=func;
	refresh_timer_id=setInterval(triggerAutoRefresh,100);
}

function* autoRefreshWrapper()
{
	if (refresh_timer_id!=null)
	{
		clearInterval(refresh_timer_id);
		refresh_timer_id=null;
	}
	//console.log("Auto Refresh Callback started");
	yield* auto_refreshcallback();
	//console.log("Auto Refresh Callback ended");
	finAjaxAction();
	refresh_timer_id=setInterval(triggerAutoRefresh,100);
}
	
function autoRefreshStop()
{
	if (refresh_timer_id!=null)
	{
		console.log("Stopping refresh timer");
		clearInterval(refresh_timer_id);
		refresh_timer_id=null;
	}
	clearAjaxQueue();
	if (curr_ajax!=null)
	{		
		curr_ajax.abort();
	}
}

function isAutoRefreshStopped()
{
	if (refresh_timer_id!=null)
	{
		return false;
	}
	return true;
}


function storeEnv(type)
{
	setLocalStorage("editor",JSON.stringify(type));
}

function loadEnv()
{
	if (getLocalStorage("editor")!=undefined)
	{
		return JSON.parse(getLocalStorage("editor"));
	}
	else
	{
		return ENV.FLOWCHART;
	}
}
		
constructObjDb();
if (shadow_gom==false)
{
	startAjaxTimer();
}


return {
	obj_def:obj_def,
	getObjNum:getObjNum,
	arrToString:arrToString,
	convArrBufToArr:convArrBufToArr,
	convStringToArr:convStringToArr,
	getObjArr:getObjArr,
	setObjArr:setObjArr,
	setObjNum:setObjNum,
	findObj:findObj,
	getObjEnum:getObjEnum,
	addObjToFrame:addObjToFrame,
	TYPE:TYPE,
	objectExchange:objectExchange,
	startObjExchangeFunc:startObjExchangeFunc,
	getValDataView:getValDataView,
	getPrevDataView:getPrevDataView,
	advanceGen:advanceGen,
	setDestinationURL:setDestinationURL,
	addAjaxAction:addAjaxAction,
	finAjaxAction:finAjaxAction,
	clearAjaxQueue:clearAjaxQueue,
	setObjArrAtOffset:setObjArrAtOffset,
	autoRefreshStop:autoRefreshStop,
	autoRefreshStart:autoRefreshStart,
	storeEnv:storeEnv,
	loadEnv:loadEnv,
	syncObjPrev:syncObjPrev,
	isAutoRefreshStopped:isAutoRefreshStopped,
	createProjFile:createProjFile,
	loadProjFile:loadProjFile,
	clearDVs:clearDVs,
	getLastProjFileSize:getLastProjFileSize,
	loadProjFromLocalStorage:loadProjFromLocalStorage,
	getObjNameStr:getObjNameStr,
	getObjType:getObjType,
	getObjByName:getObjByName,
	getObjByOID:getObjByOID,
	gom_op:gom_op,
	convArr8ToArrBuf:convArr8ToArrBuf,
	convArrBufToArr8:convArrBufToArr8,
	setObjArrCompressed:setObjArrCompressed,
	getObjArrCompressed:getObjArrCompressed,
	convArrBuftoArr32:convArrBuftoArr32,
	convArr32ToArrBuf:convArr32ToArrBuf,
   convertToJSObj:convertToJSObj,
   convertJsonToGOM:convertJsonToGOM,
   convUnicodeStringToArr:convUnicodeStringToArr,
   convArrToUnicodeString:convArrToUnicodeString,
   getProjRT_State:getProjRT_State,
   setSimpleRequestTime:setSimpleRequestTime,
}
}


var ARGEE_obj_db=GOM_inst(false);
	
var GOM=ARGEE_obj_db;






 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

