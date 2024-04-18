var device_slot_suffixes=
[
	{
	 name:"TBEN-L5-8IOL",
	 order_num:6814017,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
	 " 1",              
	 " 2",              
	 " 3",  
	 " 4",  
	 " 5",  
	 " 6",  
	 " 7",
	 " 8",
	 "",
	 "",  
	 "",
	 ""
	 ],
	},
	{
	 name:"TBEN-L4-8IOL",
	 order_num:6814082,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
	 " 1",              
	 " 2",              
	 " 3",  
	 " 4",  
	 " 5",  
	 " 6",  
	 " 7",
	 " 8",
	 "",
	 "",  
	 "",
	 ""
	 ],
	},
	{
	 name:"TBEN-S2-4IOL",
	 order_num:6814024,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
	 " 1",              
	 " 2",              
	 " 3",  
	 " 4",  
	 "",  
	 "",  
	 "",
	 "",
	 "",
	 "",  
	 "",
	 ""
	 ],
	},
];

var device_converted_slot_names=[];

var slot_suffix_selected_device=-1;

function setup_slot_names(order_num)
{
	var i,j;
	slot_suffix_selected_device=-1;
	for(i=0;i<device_slot_suffixes.length;i++)
	{
		if (device_slot_suffixes[i].order_num==order_num)
		{
			slot_suffix_selected_device=i;
			for(j=0;j<device_slot_suffixes[slot_suffix_selected_device].slot_name_suffixes.length;j++)
			{
				device_converted_slot_names[j]=getSlotName(j,true);
			}
			return;
		}
	}
}

function findConvSlotNum(name)
{
	if (name.length>4)
	{
		if (name.slice(0,4)=="Slot")
		{
			var slot_str=name.slice(4);
			return parseInt(slot_str);
		}
	}
	if (slot_suffix_selected_device==-1)
	{
		return -1;
	}
	var ind=device_converted_slot_names.indexOf(name);
	return ind;
}


function getSlotName(slot,conv)
{
	var tmp;
	if (slot_suffix_selected_device==-1)
	{
		if (conv==true)
		{
			return "Slot"+slot;
		}
		else
		{
			return IO[slot];
		}
	}
	if (slot==0)
	{
		tmp=IO[slot]+" GW";
	}
	else
	{
		tmp=IO[slot]+device_slot_suffixes[slot_suffix_selected_device].slot_name_suffixes[slot];
	}
	if (conv==false)
	{
		return tmp; 
	}
	else
	{
		return convertString(tmp);
	}
}




var sim_slices_db=[];

var blcen_gw_diags=
["Module Diagnostics Available", 
                                        "", 
                                        "", 
                                        "Station Configuration Changed", 
                                        "", 
                                        "Overcurrent Isys", 
                                        "Overvoltage Field Supply V2", 
                                        "Undervoltage Field Supply V2", 
                                        "Overvoltage Field Supply V1", 
                                        "Undervoltage Field Supply V1", 
                                        "Modulebus Communication Lost", 
                                        "Modulebus Configuration Error", 
                                        "", 
                                        "", 
                                        "Force Mode Enabled", 
										""
];

var tben_l14_gw_diags=
["Module Diagnostics Available", 
                                        "", 
                                        "", 
                                        "Station Configuration Changed", 
                                        "", 
                                        "Overcurrent Isys", 
                                        "Overvoltage Field Supply V2", 
                                        "Undervoltage Field Supply V2", 
                                        "Overvoltage Field Supply V1", 
                                        "Undervoltage Field Supply V1", 
                                        "Modulebus Communication Lost", 
                                        "Modulebus Configuration Error", 
                                        "", 
                                        "", 
                                        "Force Mode Enabled", 
                                        ""
										];

										
										
var GW_list=
[
	{name:"TBEN-L5",id:0x01510028,diags:tben_l14_gw_diags},
	{name:"TBEN-L4",id:0x01500028,diags:tben_l14_gw_diags},
	{name:"BLCEN",id:0x01500021,diags:blcen_gw_diags},
	{name:"TBEN-S1",id:0x01500029,diags:blcen_gw_diags},
	{name:"FEN20-S",id:0x01500127,diags:blcen_gw_diags},
	{name:"FEN20-M",id:0x01500027,diags:blcen_gw_diags},
];

var SIM_ignore_lastbyte_modid_in_gw=["TBEN-L1","TBEN-L4","BLCEN","TBEN-S1","FEN20-S","FEN20-M"];
var SIM_ignore_lastbyte_modid_in_gw_list=[];

function SIM_CheckInArr(val,arr)
{
	var i;
	for(i=0;i<arr.length;i++)
	{
		if (arr[i]==val)
		{
			return true;
		}
	}
	return false;
}

function SIM_CompareModuleIDs(pos,gw_id,id1,id2)
{
	var i,j;
	if (SIM_ignore_lastbyte_modid_in_gw_list.length==0)
	{
		// first time
		for(j=0;j<SIM_ignore_lastbyte_modid_in_gw.length;j++)
		{
			for(i=0;i<GW_list.length;i++)
			{
				if (GW_list[i].name==SIM_ignore_lastbyte_modid_in_gw[j])
				{
					SIM_ignore_lastbyte_modid_in_gw_list[j]=GW_list[i].id;
				}
			}
		}
	}
	if ((pos==0)&&(id1!=id2))
	{
		return false;
	}
	if (SIM_CheckInArr(gw_id,SIM_ignore_lastbyte_modid_in_gw_list)==true)
	{
		if ((id1&0xffffff00)==(id2&0xffffff00))
		{
			return true;
		}
	}
	else if (id1==id2)
	{
		return true;
	}
	return false
}
	
	

function printModuleIDs()
{
	var i;
	for(i=0;i<IO_id.length;i++)
	{
		console.log(",0x"+IO_id[i].toString(16));
	}
}




var sim_devices=
[
	{name:"TBEN-L5-16DXP",slice_list:[0x01510028,0x846D5500],order_num:6814008},	
	{name:"TBEN-L4-16DXP",slice_list:[0x01500028,0x846D5500],order_num:6814012},		
	{name:"TBEN-L5-8DIP-8DOP",slice_list:[0x01510028,0x655B4400],order_num:6814006},
	{name:"TBEN-L4-8DIP-8DOP",slice_list:[0x01500028,0x655B4400],order_num:6814010},
	{name:"BLCEN-4M12MT-4AI4AO-VI",slice_list:[0x01500021,0x419B9900],order_num:6811451},	
	{name:"BLCEN-8M12LT-4AI4AO-VI-4AI4AO-VI",slice_list:[0x01500021,0x419B9900,0x419B9900],order_num:6811455},	
	{name:"BLCEN-8M12LT-4AI4AO-VI-8XSG-P",slice_list:[0x01500021,0x419B9900,39273472],order_num:6811491},	
	{name:"BLCEN-8M12LT-4AI-VI-8XSG-P",slice_list:[0x01500021,1098354688,39273472],order_num:6811469},
	{name:"BLCEN-16M8LT-8XSG-P-8XSG-P",slice_list:[0x01500021,39273472,39273472],order_num:6811459},
	{name:"BLCEN-8M12LT-8XSG-P-8XSG-P",slice_list:[0x01500021,39273472,39273472],order_num:6811488},
	{name:"BLCEN-6M12LT-2RFID-S-8XSG-P",slice_list:[0x01500021,0x2179CC00,39273472],order_num:6811454},
	{name:"BLCEN-4M12MT-8XSG-P",slice_list:[0x01500021,39273472],order_num:6811452},
	{name:"BLCEN-2M12MT-2RFID-S",slice_list:[0x01500021,0x2179CC00],order_num:6811450},
	{name:"BLCEN-8M12LT-4IOL-8XSG-P",slice_list:[0x01500021,0x409BBB00,39273472],order_num:6811502},	
	{name:"TBEN-S1-4DIP-4DOP",slice_list:[0x1500029
,0x40533300
,0x9080000
,0x1082000
,0x202082
,0x2000080
,0x2000080
,0x2000080
,0x0
,0x0
,0x0
,0x2082102
,0x80000],order_num:6814021},
	{name:"TBEN-S1-8DXP",slice_list:[0x1500029
,0x60554400
,0xa080000
,0x2082000
,0x202082
,0x2000080
,0x2000080
,0x1082102
,0x2000080
,0x2000080
,0x2000080
,0x1082102
,0x80000],order_num:6814023},
	{name:"FEN20-16DXP",slice_list:[0x01500027,0x81695500],order_num:6931089},
	{name:"FEN20-4DIP-4DXP",slice_list:[0x01500127,0x41564300],order_num:6931090},
]


function sim_BuildGwArray()
{
	var i,j;
	var arr=[];
	for(i=0;i<GW_list.length;i++)
	{
		arr[i]={};
		arr[i].mod_name=GW_list[i].name;
		arr[i].mod_id=GW_list[i].id;
		arr[i].sections=[
		                 {sect_name:"Param",num_elems:0,datapoints:[]},
						 {sect_name:"Diag",num_elems:0,datapoints:[]},
						 {sect_name:"Input",num_elems:0,datapoints:[]},
						 {sect_name:"Output",num_elems:0,datapoints:[]},
						];
		// rework diagnostics section;
		var num_diags=0;
		for(j=0;j<16;j++)
		{
			if (GW_list[i].diags[j].length>0)
			{				
				arr[i].sections[2].datapoints[num_diags]={};
				arr[i].sections[2].datapoints[num_diags].name=GW_list[i].diags[j];
				arr[i].sections[2].datapoints[num_diags].category="GW";
				arr[i].sections[2].datapoints[num_diags].chan_unit="";
				arr[i].sections[2].datapoints[num_diags].bitOffset=j;
				arr[i].sections[2].datapoints[num_diags].bitLen=1;
				arr[i].sections[2].datapoints[num_diags].bitIncremental=0;
				arr[i].sections[2].datapoints[num_diags].channelNumStart=0;
				arr[i].sections[2].datapoints[num_diags].channelNumEnd=0;				
				num_diags++;
			}
		}
		arr[i].sections[2].num_elems=num_diags;
	}
	return arr;	
}

var sim_slices_specified=[];


var sim_curr_selected_device=-1; 

function sim_FindSliceObj(id)
{
	var i;
	for(i=0;i<sim_slices_db.length;i++)
	{
		if (sim_slices_db[i].mod_id==id)
		{
			return sim_slices_db[i];
		}
	}
	var fake_obj={mod_name:"",mod_id:0,sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:[]
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:[]
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:[]
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:[]
	},
	

	]};
	return fake_obj;
}

var code_sub_array_offset=32*1024;
var sim_dev_mem=new Uint8Array(1024*384);		
var sim_io_mem_DataView=new DataView(sim_dev_mem.buffer,0);
var sim_plc_mem_DataView=new DataView(sim_dev_mem.buffer,9*1024);
var sim_prog_mem_DataView=new DataView(sim_dev_mem.buffer,1024*10);
var prog_code_arr=new Uint8Array(sim_dev_mem.buffer,code_sub_array_offset);
var prog_var_mirr=new Uint8Array(sim_dev_mem.buffer,1024*10);

var ajaxScanTimer;

var ReqType=
{
	get_prog:0,
	get_station_config:1,
	upload_prog:2,
	get_vars:4,
	run_prog:5,
	submit_var_list:6,
	get_io_and_plc_vars:7,
	GOM_access:8,
}

// objects to be supported (UIDs)
// ARGEE_CHECK_PASSWORD -> complex get/set functions
// ARGEE_GET_SUB_IDS_OBJ -> complex get function
// IODB_GET_MOD_NAME_OBJ -> complex get function
// IODB_GET_NUM_ENTRIES_OBJ
// IODB_GET_ENTRY_OBJ
// DHCPCL_DEVICE_NAME
// ARGEE UID

var sim_GOM_DB=
[
	{id:IODB_GET_ENTRY_OBJ,func_get:sim_IODB_GET_ENTRY_OBJ},
	{id:IODB_GET_MOD_NAME_OBJ,func_get:sim_IODB_GET_MOD_NAME_OBJ},
	{id:IODB_GET_NUM_ENTRIES_OBJ,func_get:sim_IODB_GET_NUM_ENTRIES_OBJ},
	{id:ARGEE_GET_SUB_IDS_OBJ,func_get:sim_ARGEE_GET_SUB_IDS_OBJ},
	{id:ARGEE_UID,func_get:sim_ARGEE_UID},
	{id:ARGEE_CHECK_PASSWORD,func_get:sim_ARGEE_CHECK_PASSWORD_get,func_set:sim_ARGEE_CHECK_PASSWORD_set},
	{id:DHCPCL_DEVICE_NAME,func_get:sim_DHCPCL_DEVICE_NAME},
	{id:MULTPC_ORDER_NUM,func_get:sim_MULTPC_ORDER_NUM},
	{id:SAPI_APP_VER_STRING,func_get:sim_SAPI_APP_VER_STRING},
	{id:ARGEE_BOOT_PROJ_ENABLED,func_get:sim_ARGEE_CHECK_PASSWORD_get},  // Return 1
	{id:MULTPC_FIELDBUS_CONNECTED,func_get:sim_ARGEE_CHECK_PASSWORD_get}, // Return 1
];
	
	
function sim_UploadProg(req_code,req_len,dt,offset)
{
	var i;
	var arr_obj=[];
	sim_StopProg();
	for(i=0;i<req_len;i++)
	{
		prog_code_arr[i]=dt.getUint8(offset+i);
		arr_obj[i]=prog_code_arr[i];
	}
	setLocalStorage("simCode",JSON.stringify(arr_obj));
	if (getLocalStorage("importedParameters")!=undefined)
	{
		deteleLocalStorageKey("importedParameters");
	}

}

function sim_RunProg(req_code,req_len,dt,offset)
{
	sim_loadProjFile(new DataView(sim_dev_mem.buffer,code_sub_array_offset));
}

function sim_GetVars(req_code,req_len,dt,offset)
{
	var i;
	var offset=0;
	resp_data=new ArrayBuffer(NUM_RUNG_STAT_BYTES+sim_reg_var_size);
	var dt=new DataView(resp_data);
	offset=0;
	for(i=0;i<NUM_RUNG_STAT_BYTES;i++)
	{
		dt.setUint8(offset,rung_status[i]);offset++;
	}
	for(i=0;i<sim_reg_var_size;i++)
	{
		dt.setUint8(offset,sim_prog_mem_DataView.getUint8(i));offset++;		
	}
}

function sim_GetIO_And_PLC_Vars(req_code,req_len,dt,offset)
{
	var i,j,k;
	var offset=0;
	var size=0;
	// IO sizes
	for(i=0;i<sim_slices_specified.length;i++)
	{
		size+=sim_slices_specified[i].sizes[sect_type.input]/8;
		size+=sim_slices_specified[i].sizes[sect_type.output]/8;
		size+=sim_slices_specified[i].sizes[sect_type.diag]/8;
	}
	// PLC sizes
	size+=512;
	// control information
	size+=1+sim_slices_specified.length*3;
	
	if ((flags_and_retain_addr&(1<<31))!=0)
	{
		size+=4+sim_curr_trace_pos*8;
	}
	
	
	resp_data=new ArrayBuffer(size);
	var dt=new DataView(resp_data);
	dt.setUint8(offset,sim_slices_specified.length);offset++;
	for(i=0;i<sim_slices_specified.length;i++)
	{
		var len;
		for(j=sect_type.input;j<sect_type.param;j++)
		{
			dt.setUint8(offset,sim_slices_specified[i].sizes[j]/8);offset++;
			for(k=0;k<(sim_slices_specified[i].sizes[j]/8);k++)
			{
				dt.setUint8(offset,sim_io_mem_DataView.getUint8(sim_slices_specified[i].offsets[j]/8+k));offset++;
			}
		}
	}
	// copy the PLC portion
	for(i=0;i<512;i++)
	{
		dt.setUint8(offset,sim_plc_mem_DataView.getUint8(i));offset++;
	}
	
	// transfer trace data if nessesary
	if ((flags_and_retain_addr&(1<<31))!=0)
	{
		dt.setUint32(offset,sim_curr_trace_pos*8,true);offset+=4;
		for(i=0;i<(sim_curr_trace_pos*8);i++)
		{
			dt.setUint8(offset,sim_trace_db_dataview.getUint8(i));offset++;
		}
		sim_TRACE_Clear();
	}
}

function sim_DownloadProg(req_code,req_len,dt,offset)
{
	var arr_obj=[];
	var i;
	if (getLocalStorage("simCode")!=undefined)
	{
		arr_obj=JSON.parse(getLocalStorage("simCode"));
	}
	
	resp_data=new ArrayBuffer(arr_obj.length);
	var tmp_dt=new DataView(resp_data);
	for(i=0;i<arr_obj.length;i++)
	{
		tmp_dt.setUint8(i,arr_obj[i]);
	}
}	

function sim_GetStationConfig(req_code,req_len,dt,offset)
{
	var i,j;
	var stored_params=[];
	
	if (getLocalStorage("importedParameters")!=undefined)
	{
		stored_params=JSON.parse(getLocalStorage("importedParameters"));
	}
	else if (getLocalStorage("simCode")!=undefined)
	{
		// extract params from the stored project
		var arr_obj=JSON.parse(getLocalStorage("simCode"));
		var tmp_arrBuf=new ArrayBuffer(arr_obj.length);
		var tmp_arr_dt=new DataView(tmp_arrBuf);
		for(i=0;i<arr_obj.length;i++)
		{
			tmp_arr_dt.setUint8(i,arr_obj[i]);
		}
		var header_size=48+(5*4);
		var param_seg_len_offset=5*4;
		var scan_list_len_offset=4*4;
		
		var scanlist_len=tmp_arr_dt.getUint32(scan_list_len_offset,true);
		var param_seg_len=tmp_arr_dt.getUint32(param_seg_len_offset,true);
		var offset=header_size+scanlist_len;
		for(i=0;i<param_seg_len;i++)
		{
			stored_params[i]=tmp_arr_dt.getUint8(offset);offset++;
		}
	}
	else
	{
		for(i=0;i<sim_slices_specified.length;i++)
		{
			stored_params[i]=0;
		}
	}
	
	// extend length bytes to 4 bytes LE
	var conv_params=[];
	var offset=1; // skip the GW which has 0 parameters - we only send parameter data of real slices
	for(i=1;i<sim_slices_specified.length;i++)
	{
		var num_bytes=stored_params[offset];offset++;
		appendNumToArrLE(conv_params,conv_params.length,num_bytes,4);
		for(j=0;j<num_bytes;j++)
		{
			conv_params[conv_params.length]=stored_params[offset];offset++;
		}
	}
			
	
	offset=0;
	resp_data=new ArrayBuffer(4+sim_slices_specified.length*4+conv_params.length);
	var tmp_dt=new DataView(resp_data);
	tmp_dt.setUint32(offset,sim_slices_specified.length,true);offset+=4;
	for(i=0;i<sim_slices_specified.length;i++)
	{
		tmp_dt.setUint32(offset,sim_slices_specified[i].mod_id,true);offset+=4;
	}
	
	for(i=0;i<conv_params.length;i++)
	{
		tmp_dt.setUint8(offset,conv_params[i],true);offset+=1;
	}
}

function sim_GOM_Access(req_code,req_len,dt,offset_passed)
{
	var offset=offset_passed;
	var req_type=dt.getUint32(offset,true);offset+=4;
	var req_UID=dt.getUint32(offset,true);offset+=4;
	var req_inst=dt.getUint32(offset,true);offset+=4;
	if (req_type==1)
	{
		var set_data_len=req_len-12;
		simSetObject(req_UID,req_inst,dt,offset,set_data_len);
		resp_data=null;
	}
	else
	{
		simGetObject(req_UID,req_inst);
	}
}


function sim_SubmitVarList(req_code,req_len,dt,offset)
{
	var i,j;
	var arr_obj=[];
	var num_vars=ToInt32(req_len/9);
	var data_addr=[];
	var val;
	for(i=0;i<num_vars;i++)
	{
		for(j=0;j<5;j++)
		{
			data_addr[j]=dt.getUint8(offset);offset++;
		}
		val=dt.getUint32(offset,true);offset+=4;
		decodeStackVal(data_addr,var_d[0]);
		setValue(var_d[0],val);
	}
}

var sim_ReqDb=[sim_DownloadProg,sim_GetStationConfig,sim_UploadProg,null,sim_GetVars,sim_RunProg,sim_SubmitVarList,sim_GetIO_And_PLC_Vars,sim_GOM_Access];

function GOM_CreateRespArr(len)
{
	resp_data=new ArrayBuffer(4+len);
	var dt=new DataView(resp_data);
	dt.setUint32(0,len,true);
	var dt=new DataView(resp_data,4);
	return dt;
}

function sim_ARGEE_CHECK_PASSWORD_set(inst,dt,offset,len)
{
}
function sim_ARGEE_CHECK_PASSWORD_get(inst)
{
	var tmp_dt=GOM_CreateRespArr(4);
	tmp_dt.setUint32(0,1,true);
}

function sim_ARGEE_GET_SUB_IDS_OBJ(inst)
{
	var i;
	var tmp_dt=GOM_CreateRespArr(4*sim_slices_specified.length+4);
	tmp_dt.setUint32(0,sim_slices_specified.length,true);
	for (i=0;i<sim_slices_specified.length;i++)
	{
		tmp_dt.setUint32(4+i*4,sim_slices_specified[i].mod_id,true);
	}
}

function sim_DHCPCL_DEVICE_NAME(inst)
{
	var i;
	var tmp_dt=GOM_CreateRespArr(sim_devices[sim_curr_selected_device].name.length);
	for(i=0;i<sim_devices[sim_curr_selected_device].name.length;i++)
	{
		tmp_dt.setUint8(i,sim_devices[sim_curr_selected_device].name.charCodeAt(i));
	}
}

function sim_ARGEE_UID(inst)
{
	var tmp_dt=GOM_CreateRespArr(4);
	tmp_dt.setUint32(0,0x02070000,true);
}

function sim_MULTPC_ORDER_NUM(inst)
{
	var tmp_dt=GOM_CreateRespArr(4);
	tmp_dt.setUint32(0,sim_devices[sim_curr_selected_device].order_num,true);
}

function sim_SAPI_APP_VER_STRING(inst)
{
	var i;
	var str="V1.2.3.4"
	var tmp_dt=GOM_CreateRespArr(str.length);
	for(i=0;i<str.length;i++)
	{
		tmp_dt.setUint8(i,str.charCodeAt(i));
	}
}


function sim_IODB_GET_MOD_NAME_OBJ(inst)
{
	var slot=inst&0xff;
	var i;
	var name;
	if (slot==0)
	{
		name=sim_devices[sim_curr_selected_device].name;
	}
	else
	{
		name=sim_slices_specified[slot].mod_name;
	}
	var tmp_dt=GOM_CreateRespArr(name.length);
	for(i=0;i<name.length;i++)
	{
		tmp_dt.setUint8(i,name.charCodeAt(i));
	}
}

function sim_IODB_GET_NUM_ENTRIES_OBJ(inst)
{
	var slot=(inst)&0xff;
    var sect=((inst)>>8)&0xff;
    var elem=((inst)>>16)&0xffff;
	var i;
	var tmp_dt=GOM_CreateRespArr(4);
	tmp_dt.setUint32(0,sim_slices_specified[slot].sections[sect].num_elems,true);
}


function sim_IODB_GET_ENTRY_OBJ(inst)
{
	var slot=(inst)&0xff;
    var sect=((inst)>>8)&0xff;
    var elem=((inst)>>16)&0xffff;
	var i;
	var offset=0;
	var tmp_dt=GOM_CreateRespArr(8+sim_slices_specified[slot].sections[sect].datapoints[elem].category.length+
	                            sim_slices_specified[slot].sections[sect].datapoints[elem].chan_unit.length+ 
								sim_slices_specified[slot].sections[sect].datapoints[elem].name.length);
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].category.length);offset++;
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].chan_unit.length);offset++;
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].name.length);offset++;
	copyStringToDt(tmp_dt,offset,sim_slices_specified[slot].sections[sect].datapoints[elem].category);
	offset+=sim_slices_specified[slot].sections[sect].datapoints[elem].category.length;
	copyStringToDt(tmp_dt,offset,sim_slices_specified[slot].sections[sect].datapoints[elem].chan_unit);
	offset+=sim_slices_specified[slot].sections[sect].datapoints[elem].chan_unit.length;
	copyStringToDt(tmp_dt,offset,sim_slices_specified[slot].sections[sect].datapoints[elem].name);
	offset+=sim_slices_specified[slot].sections[sect].datapoints[elem].name.length;
	
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].bitOffset); offset++;
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].bitLen); offset++;
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].bitIncremental); offset++;
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].channelNumStart); offset++;
	tmp_dt.setUint8(offset,sim_slices_specified[slot].sections[sect].datapoints[elem].channelNumEnd); offset++;
	
}

var resp_data;

function simSetObject(UID,inst,dt,offset,set_len)
{
	var i;
	for(i=0;i<sim_GOM_DB.length;i++)
	{
		if (sim_GOM_DB[i].id==UID)
		{
			sim_GOM_DB[i].func_set(inst,dt,offset,set_len)
			break;
		}
	}
}

function simGetObject(UID,inst,dt,offset,set_len)
{
	var i;
	for(i=0;i<sim_GOM_DB.length;i++)
	{
		if (sim_GOM_DB[i].id==UID)
		{
			sim_GOM_DB[i].func_get(inst)
			break;
		}
	}
}


			
var sim_AjaxObj=
{
	act_req:{},
	req_pending:false,
	readyState:0,
	status:0,
	response:{},
	open:function(a,b,c)
	{
		
		
	},
	send:function(req)
	{
		this.act_req=req.slice(0);
		this.req_pending=true;
	},
	process_req:function()
	{
		if (this.req_pending==true)
		{
			var dt=new DataView(this.act_req);
			var offset=0;
			var req_code=dt.getUint8(offset);offset++;
			var req_len=dt.getUint16(offset,true);offset+=2;
			sim_ReqDb[req_code](req_code,req_len,dt,offset);
			if (resp_data!=null)
			{
				this.response=resp_data.slice(0);
			}
			this.readyState=4;
			this.status=200;
			this.req_pending=false;
			this.onreadystatechange();
		}
	}
};

// if simulation in progress -> invoke  exchange task after every scan cycle.
// if not -> invoke it every 20ms

function sim_AjaxExchangeTask()
{
	clearInterval(ajaxScanTimer);	
	sim_AjaxObj.process_req();
	ajaxScanTimer=setInterval(sim_AjaxExchangeTask,20);
}
	

function sim_startAjax()
{
	ajaxScanTimer=setInterval(sim_AjaxExchangeTask,20);
}

// actual section order in the slice's "sections" array: Param,Diag,Input,Output
// In the code the assumed order:Inp,Outp,Diag,Param
var sim_remap_sections=[3,2,0,1];

function lenInBytes(bits)
{
	var trunk=(bits/8)|0;
	if ((trunk*8)!=bits)
	{
		return (trunk+1);
	}
	return trunk;
}

function sim_InitDeviceStruct(dev)
{
	var offset=0;

	sim_slices_db=sim_slices_db.concat(modules_BLC);
	sim_slices_db=sim_slices_db.concat(modules_TBEN);
	sim_slices_db=sim_slices_db.concat(modules_FEN20);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S1);
	sim_slices_db=sim_slices_db.concat(sim_BuildGwArray());
	
	var i,j;
	sim_slices_specified=[];
	if (sim_devices.length<=dev)
	{
		deteleLocalStorageKey("simDevSelect");
		location.reload();
		return;
	}
	for(i=0;i<sim_devices[dev].slice_list.length;i++)
	{
		var obj=sim_FindSliceObj(sim_devices[dev].slice_list[i]);
		sim_slices_specified[i]=clone(obj);
		sim_slices_specified[i].offsets=[];
		sim_slices_specified[i].sizes=[];
		for(j=0;j<obj.sections.length;j++)
		{
			sim_slices_specified[i].offsets[sim_remap_sections[j]]=offset;
			
			var len=sim_findSectSize(obj.sections[j]);
			sim_slices_specified[i].sizes[sim_remap_sections[j]]=len;
			offset+=len;
		}
	}
}

function simDevChanged(elem)
{
	//sim_InitDeviceStruct(elem.selectedIndex);
	eraseProject();
	setLocalStorage("simDevSelect",elem.selectedIndex);
	var_db=clone(var_db_template);
	cond_db=[];
	screens=[];
	flowchart={constants:[0,0],timer_exp:[0,0],counter_preset:[0,0],rungs:[]};
    LD_ClearLib();
	generateARGEE_Code(false);
	editor="regular";
	flowchart={constants:[0,0],timer_exp:[0,0],counter_preset:[0,0],rungs:[]};
	saveLocal();
	sim_ResetAfterNewProj=true;
	testFrame(2); // redraw simulation
}

function getMaxOffsetOfDatapoint(pnt)
{
	var num_chans=pnt.channelNumEnd-pnt.channelNumStart;
	return pnt.bitOffset+pnt.bitIncremental*num_chans+pnt.bitLen;
}

function sim_findSectSize(sect_obj)
{
	var i;
	if (sect_obj.datapoints.length==0)
	{
		return 0;
	}
	
	var max_ind=0;
	for(i=0;i<sect_obj.datapoints.length;i++)
	{
		if (getMaxOffsetOfDatapoint(sect_obj.datapoints[i])>getMaxOffsetOfDatapoint(sect_obj.datapoints[max_ind]))
		{
			max_ind=i;
		}
	}
	var len=getMaxOffsetOfDatapoint(sect_obj.datapoints[max_ind]);
	if ((ToInt32(len/8)*8)==len)
	{
		return len;
	}
	return (ToInt32(len/8)+1)*8;
}

function simDevInit()
{
	
	if (getLocalStorage("simDevSelect")!=undefined)
	{
		sim_curr_selected_device=parseInt(getLocalStorage("simDevSelect"));
		// Memory map of the simulated device
		// First block of 10kb -> IO memory
		// Second block of 10kb -> program memory (which includes program variables, PLC variables ....
		// Third block of 256 kb -> program code/source
		
		sim_InitDeviceStruct(sim_curr_selected_device);
	}
}

function selectSimDevice()
{
	var sel=this.document.getElementById("SimDeviceSelection");
	simDevChanged(sel);
}


function sim_RenderDeviceSelection()
{
	var i;
	var html="<center><h2>Select Device to Simulate</h2><br><select id=\"SimDeviceSelection\">";
	for(i=0;i<sim_devices.length;i++)
	{
		if (i==sim_curr_selected_device)
		{
			html+="<option selected >"+sim_devices[i].name+"</option>";
		}
		else
		{
			html+="<option>"+sim_devices[i].name+"</option>";
		}
	}
	if (sim_curr_selected_device==-1)
	{
		html+="<option selected > Invalid Device (please change) </option>";
	}
	html+="</select><br><button onclick=\"selectSimDevice();\">Simulate</button></center>"
	return html;
}

var MAX_STACK_DEPTH=30;

var curr_pc=0;

var stack_ptr=(MAX_STACK_DEPTH-1)*5;
var stack=new Uint8Array(MAX_STACK_DEPTH*5);

function stack_push(arr)
{
	if (stack_ptr>0)
	{
		stack_ptr-=5;
		stack.set(arr,stack_ptr);
	}
}

function stack_pop()
{
	var val=stack.subarray(stack_ptr,stack_ptr+5);
	stack_ptr+=5;
	return val;
}


function vm_push()
{
	curr_pc++;
	stack_push(sim_ARGEE_Code_Ram.subarray(curr_pc,curr_pc+5));
	curr_pc+=5;
}

function vm_pop()
{
	curr_pc+=1;
	stack_ptr+=5;
}

var VAR_TP=
{
	plc:0,
	prog:1,
	io:2,
	val:3,
};

var val_d=[0,0,0];

var var_d=[{type:VAR_TP.val,
            slot:0,sect:0,bit_offset:0,length:0,sign:0, // for io_var and plc_var
			sub_type:0,addr:0, // for prog var
			num:0, // for const
		   },
		   {type:VAR_TP.val,
            slot:0,sect:0,bit_offset:0,length:0,sign:0, // for io_var and plc_var
			sub_type:0,addr:0, // for prog var
			num:0, // for const
		   },
		   {type:VAR_TP.val,
            slot:0,sect:0,bit_offset:0,length:0,sign:0, // for io_var and plc_var
			sub_type:0,addr:0, // for prog var
			num:0, // for const
		   },
		  ];

function decodeStackVal(data,var_elem)
{
	var_elem.type=(data[0]>>6)&0x3;
	if (var_elem.type==VAR_TP.val)
	{
		var tmp=(data[1]<<24)|(data[2]<<16)|(data[3]<<8)|(data[4]<<0);
		var_elem.num=tmp;
	}
	if (var_elem.type==VAR_TP.prog)
	{   // UDT elements are also treated as variables.
		// If a UDT element is numeric - it is setup on an alignment boundary of the CPU
		// If a UDT element is array - alignment boundaries are not important - it is passed as is to a function
		var_elem.subtype=(data[0])&0x3f;
		var_elem.addr=(data[1]<<24)|(data[2]<<16)|(data[3]<<8)|(data[4]<<0);
	}
	else if (var_elem.type==VAR_TP.io)
	{
		var tmp=(data[1]<<24)|(data[2]<<16)|(data[3]<<8)|(data[4]<<0);
		var_elem.slot=(tmp>>24)&0xff;	
		var_elem.sect=(tmp>>22)&0x3;	
		var_elem.bit_offset=(tmp>>8)&0x3fff;	
		var_elem.length=(tmp>>0)&0xff;	
		var_elem.sign=data[0]&1;
	}
    else if (var_elem.type==VAR_TP.plc)
    {
        var tmp=(data[1]<<24)|(data[2]<<16)|(data[3]<<8)|(data[4]<<0);
		var_elem.sect=(tmp>>31)&0x1;	
        var_elem.sign=(tmp>>29)&0x1;	
        if (((tmp>>30)&0x1)==1)
        {
            var_elem.length=1;
        }
        else
        {
            var_elem.length=16;
        }
        var_elem.bit_offset=(((tmp>>0)&0xff)*16)+((tmp>>24)&0xf);	
		var_elem.slot=-1;
    }
}

function getSegmAddr(var_d)
{
	var sect_dataView;
	var offset;
	var len;
	var sign;
	if (var_d.type==VAR_TP.plc)
	{
		sect_dataView=sim_plc_mem_DataView;
		offset=256*var_d.sect*8+var_d.bit_offset;
		len=var_d.length;
		sign=var_d.sign;
	}
	else if (var_d.type==VAR_TP.io)
	{
		sect_dataView=sim_io_mem_DataView;
		offset=sim_slices_specified[var_d.slot].offsets[var_d.sect]+var_d.bit_offset;
		len=var_d.length;
		sign=var_d.sign;
	}
	else if (var_d.type==VAR_TP.prog)
	{
		sect_dataView=sim_prog_mem_DataView;
		offset=var_d.addr*8;
		len=32;
		sign=1;
	}
	return {view:sect_dataView,offset:offset,len:len,sign:sign};
}

function setValue(var_d,val)
{
	var segm_elem=getSegmAddr(var_d);
	SetArrValue(segm_elem.view,segm_elem.offset,segm_elem.len,val);
}

function getValue(var_d)
{
	var segm_elem=getSegmAddr(var_d);
	if (var_d.type==VAR_TP.val)
	{
		return var_d.num;
	}
	else
	{
		var val=GetArrValue(segm_elem.view,segm_elem.offset,segm_elem.len);;
		if ((var_d.type==VAR_TP.io)||(var_d.type==VAR_TP.plc))
		{
			if ((segm_elem.sign==1)&&(segm_elem.len>=8))
			{
				var sign_ext=0xffffffff>>(segm_elem.len);
				sign_ext=sign_ext<<(segm_elem.len);
				if ((val&(1<<(segm_elem.len-1)))!=0)
				{
					val|=sign_ext;
				}
			}
		}
		return val;
	}
}

var arr_rep=new Uint8Array(5);

function push_num(num)
{
	arr_rep[0]=(VAR_TP.val<<6)
	arr_rep[1]=(num>>24)&0xff;
	arr_rep[2]=(num>>16)&0xff;
	arr_rep[3]=(num>>8)&0xff;
	arr_rep[4]=(num>>0)&0xff;
	stack_push(arr_rep);
}

function get3Args()
{
	var i;
	for(i=0;i<3;i++)
	{
		var var_arr;
		var_arr=stack_pop();
		decodeStackVal(var_arr,var_d[i]);
		val_d[i]=getValue(var_d[i]);
	}
}


function get2Args()
{
	var i;
	for(i=0;i<2;i++)
	{
		var var_arr;
		var_arr=stack_pop();
		decodeStackVal(var_arr,var_d[i]);
		val_d[i]=getValue(var_d[i]);
	}
}

function get1Arg()
{
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	val_d[0]=getValue(var_d[0]);
}


function mult()
{
	get2Args();
	val_d[0]=val_d[0]*val_d[1];
	push_num(val_d[0]);
	curr_pc+=1;
}

function add()
{
	get2Args();
	val_d[0]=val_d[0]+val_d[1];
	push_num(val_d[0]);
	curr_pc+=1;
}

function sub()
{
	get2Args();
	val_d[0]=val_d[1]-val_d[0];
	push_num(val_d[0]);
	curr_pc+=1;
}

var stop_program=false;
var stop_reason="";

function div()
{
	get2Args();
	if (val_d[0]==0)
	{
		val_d[0]=0;
	}
	else
	{
		val_d[0]=(val_d[1]/val_d[0])|0;
	}
	push_num(val_d[0]);
	curr_pc+=1;
}

function mod()
{
	get2Args();
	if (val_d[0]==0)
	{
		val_d[0]=0;
	}
	else
	{
		val_d[0]=(val_d[1]%val_d[0]);
	}
	push_num(val_d[0]);
	curr_pc+=1;
}

function abs1()
{
	get1Arg();
	if (val_d[0]<0)
	{
		val_d[0]=-val_d[0];
	}
	push_num(val_d[0]);
	curr_pc+=1;
}

function and()
{
	get2Args();
	val_d[0]=val_d[0]&val_d[1];
	push_num(val_d[0]);
	curr_pc+=1;
}

function or()
{
	get2Args();
	val_d[0]=val_d[0]|val_d[1];
	push_num(val_d[0]);
	curr_pc+=1;
}

function not()
{
	get1Arg();
	if (val_d[0]==0)
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}
	push_num(val_d[0]);
	curr_pc+=1;
}

function less()
{
	get2Args();
	if (val_d[1]<val_d[0])
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}

	push_num(val_d[0]);
	curr_pc+=1;
}

function bigger()
{
	get2Args();
	if (val_d[1]>val_d[0])
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}

	push_num(val_d[0]);
	curr_pc+=1;
}

function bigger_or_eq()
{
	get2Args();
	if (val_d[1]>=val_d[0])
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}

	push_num(val_d[0]);
	curr_pc+=1;
}

function less_or_eq()
{
	get2Args();
	if (val_d[1]<=val_d[0])
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}

	push_num(val_d[0]);
	curr_pc+=1;
}

function eq()
{
	get2Args();
	if (val_d[1]==val_d[0])
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}

	push_num(val_d[0]);
	curr_pc+=1;
}

function not_eq()
{
	get2Args();
	if (val_d[1]!=val_d[0])
	{
		val_d[0]=1;
	}
	else
	{
		val_d[0]=0;
	}

	push_num(val_d[0]);
	curr_pc+=1;
}

var rung_true=false;

function assign()
{
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[1]);
	get1Arg();
	if (rung_true==true)
	{
	   setValue(var_d[1],val_d[0]);
	}
	curr_pc+=1;
}

function coil_op()
{
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[1]);
	if (rung_true==true)
	{
	   setValue(var_d[1],1);
	}
	else
	{
		setValue(var_d[1],0);
	}		
	curr_pc+=1;
}

var NUM_RUNG_STAT_BYTES=20;
var curr_rung_count=0;
var rung_status=new Uint8Array(NUM_RUNG_STAT_BYTES);

function branch_if_not_eq()
{
	var rung_pos_byte,rung_pos_bit;
	get2Args();
	rung_pos_byte=curr_rung_count>>3;
    rung_pos_bit=curr_rung_count&7;
	if (val_d[1]==1)
	{
		if (rung_pos_byte<NUM_RUNG_STAT_BYTES)
		{
			rung_status[rung_pos_byte]|=1<<rung_pos_bit;	
		}
		rung_true=true;
		curr_pc+=1;
	}
	else
	{
		if (rung_pos_byte<NUM_RUNG_STAT_BYTES)
        {
            rung_status[rung_pos_byte]&=~(1<<rung_pos_bit);
        }
        //printf("Branching out %d\n",pc);
        rung_true=false;
        curr_pc+=val_d[0]+1;
	}
	curr_rung_count++;
}


// Timer/Counter bits:
var TM_CNT_ENGAGED =0;
var TM_CNT_DONE =8;
var TM_CNT_COUNTER =9;
var TM_CNT_TRIGGERED_TIMER =10;


// first addr: bit 0 -> engaged=1, idle=0
// first addr: bit 8 -> done=1, not_done=0
// first addr: bit 9 -> counter=1, timer=0

function cnt_res_op()
{
	var counter_offset;
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;
	if (rung_true==true)
	{
	   sim_prog_mem_DataView.setUint32(counter_offset+0*4,(1<<TM_CNT_COUNTER)|(0<<TM_CNT_DONE),true);
   	   sim_prog_mem_DataView.setUint32(counter_offset+3*4,0,true);
	}
	curr_pc+=1;
}


function ctu_op()
{
	var counter_offset;
	
	get1Arg();
	var exp_cnt=val_d[0];
	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var counter_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	var counter_val=sim_prog_mem_DataView.getInt32(counter_offset+3*4,true);
	var prev_rung_val=sim_prog_mem_DataView.getUint8(counter_offset+2*4+1);
	
	sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_cnt,true);
	
	if (((counter_control>>TM_CNT_COUNTER)&1)==0)
	{
	  counter_control|=1<<TM_CNT_COUNTER;
	  prev_rung_val=rung_true;
	}
	if ((rung_true==true)&&(prev_rung_val==false)&&(((counter_control>>TM_CNT_DONE)&1)==0))
	{
	  counter_val=counter_val+1;
	  if (counter_val==exp_cnt)
	  {
		 counter_control|=1<<TM_CNT_DONE;
	  }

	}
	prev_rung_val=rung_true;
	curr_pc+=1;
	sim_prog_mem_DataView.setUint32(counter_offset+0*4,counter_control,true);
	sim_prog_mem_DataView.setInt32(counter_offset+3*4,counter_val,true);
	sim_prog_mem_DataView.setUint8(counter_offset+2*4+1,prev_rung_val);

}

function ctd_op()
{
	var counter_offset;
	
	get1Arg();
	
	var exp_cnt=val_d[0];
	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var counter_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	var counter_val=sim_prog_mem_DataView.getInt32(counter_offset+3*4,true);
	var prev_rung_val=sim_prog_mem_DataView.getUint8(counter_offset+2*4+0);
	
	sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_cnt,true);
	
	if (((counter_control>>TM_CNT_COUNTER)&1)==0)
	{
	  counter_control|=1<<TM_CNT_COUNTER;
	  prev_rung_val=rung_true;
	}
	if ((rung_true==true)&&(prev_rung_val==false)&&(((counter_control>>TM_CNT_DONE)&1)==0))
	{
	  counter_val=counter_val-1;
	  if (counter_val==exp_cnt)
	  {
		 counter_control|=1<<TM_CNT_DONE;
	  }

	}
	prev_rung_val=rung_true;
	curr_pc+=1;
	sim_prog_mem_DataView.setUint32(counter_offset+0*4,counter_control,true);
	sim_prog_mem_DataView.setInt32(counter_offset+3*4,counter_val,true);
	sim_prog_mem_DataView.setUint8(counter_offset+2*4+0,prev_rung_val);
}

function ton_op()
{
	var counter_offset;
	var update=false;
	
	get1Arg();
	
	var exp_time=val_d[0];
	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var timer_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	var timer_val=sim_prog_mem_DataView.getUint32(counter_offset+3*4,true);
	var timer_ref_point=sim_prog_mem_DataView.getUint32(counter_offset+2*4,true);
	if (((timer_control&(1<<TM_CNT_ENGAGED))==0)&&(((timer_control>>TM_CNT_DONE)&1)==0)&&(rung_true==true))
	{
		// timer not started &rung is true -> start the timer
		update=true;
		timer_control=(0<<TM_CNT_DONE)|(1<<TM_CNT_ENGAGED); 
		timer_ref_point=OS_Tick();  // reference point for the start of timer calculation
		timer_val=0; // curr_count;
	}
	else if ((((timer_control&(1<<TM_CNT_ENGAGED))!=0)||(((timer_control>>TM_CNT_DONE)&1)!=0))&&(rung_true==false))
	{
		update=true;
		// timer is running or expired and rung condition is false -> stop the timer
		timer_control=(0<<TM_CNT_DONE);
		exp_time=0;
		timer_val=0;
	}
	else if ((timer_control&(1<<TM_CNT_ENGAGED))!=0)
	{
		update=true;
		// timer is running
		timer_val=OS_GetTimeDiff(OS_Tick(),timer_ref_point);
		if (timer_val>=exp_time)
		{
			timer_val=exp_time
			timer_control=(1<<TM_CNT_DONE);
		}
	}
	
	if (update==true)
	{
		sim_prog_mem_DataView.setUint32(counter_offset+0*4,timer_control,true);
		sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_time,true);
		sim_prog_mem_DataView.setUint32(counter_offset+2*4,timer_ref_point,true);
		sim_prog_mem_DataView.setUint32(counter_offset+3*4,timer_val,true);
	}
	curr_pc+=1;
}


function toff_op()
{
	var counter_offset;
	var update=false;
	
	get1Arg();
	
	var exp_time=val_d[0];
	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var timer_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	var timer_val=sim_prog_mem_DataView.getUint32(counter_offset+3*4,true);
	var timer_ref_point=sim_prog_mem_DataView.getUint32(counter_offset+2*4,true);
	if (((timer_control&(1<<TM_CNT_ENGAGED))==0)&&(((timer_control>>TM_CNT_DONE)&1)==0)&&(rung_true==false))
	{
		// timer not started &rung is false -> start the timer
		update=true;
		timer_control=(0<<TM_CNT_DONE)|(1<<TM_CNT_ENGAGED); 
		timer_ref_point=OS_Tick();  // reference point for the start of timer calculation
		timer_val=0; // curr_count;
	}
	else if ((((timer_control&(1<<TM_CNT_ENGAGED))!=0)||(((timer_control>>TM_CNT_DONE)&1)!=0))&&(rung_true==true))
	{
		update=true;
		// timer is running or expired and rung condition is true -> stop the timer
		timer_control=(0<<TM_CNT_DONE);
		exp_time=0;
		timer_val=0;
	}
	else if ((timer_control&(1<<TM_CNT_ENGAGED))!=0)
	{
		update=true;
		// timer is running
		timer_val=OS_GetTimeDiff(OS_Tick(),timer_ref_point);
		if (timer_val>=exp_time)
		{
			timer_val=exp_time
			timer_control=(1<<TM_CNT_DONE);
		}
	}
	
	if (update==true)
	{
		sim_prog_mem_DataView.setUint32(counter_offset+0*4,timer_control,true);
		sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_time,true);
		sim_prog_mem_DataView.setUint32(counter_offset+2*4,timer_ref_point,true);
		sim_prog_mem_DataView.setUint32(counter_offset+3*4,timer_val,true);
	}
	curr_pc+=1;
}

function start_timer()
{
	var counter_offset;

	get1Arg();
	
	var exp_time=val_d[0];
	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var timer_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	var timer_val=sim_prog_mem_DataView.getUint32(counter_offset+3*4,true);
	var timer_ref_point=sim_prog_mem_DataView.getUint32(counter_offset+2*4,true);
	
	if (rung_true==true)
	{
		timer_control=(0<<TM_CNT_DONE)|(1<<TM_CNT_ENGAGED)|(1<<TM_CNT_TRIGGERED_TIMER); // 0-> done, 1-> started
		timer_ref_point=OS_Tick();  // reference point for the start of timer calculation		
		timer_val=0;		
		sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_time,true);
	}
	else
	{
		if (((timer_control&(1<<TM_CNT_ENGAGED))!=0)&&((timer_control&(1<<TM_CNT_TRIGGERED_TIMER))!=0))
		{
			exp_time=sim_prog_mem_DataView.getUint32(counter_offset+1*4,true);
	
			timer_val=OS_GetTimeDiff(OS_Tick(),timer_ref_point);
			if (timer_val>=exp_time)
			{
				timer_val=exp_time;
				timer_control=(1<<TM_CNT_DONE);
			}
		}
	}

	sim_prog_mem_DataView.setUint32(counter_offset+0*4,timer_control,true);
	
	sim_prog_mem_DataView.setUint32(counter_offset+2*4,timer_ref_point,true);
	sim_prog_mem_DataView.setUint32(counter_offset+3*4,timer_val,true);
	curr_pc+=1;
}

function expired()
{
	var counter_offset;

	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var timer_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	
	if (((timer_control>>TM_CNT_COUNTER)&1)==0)
	{
		var exp_time=sim_prog_mem_DataView.getUint32(counter_offset+1*4,true);
		var timer_val=sim_prog_mem_DataView.getUint32(counter_offset+3*4,true);
		var timer_ref_point=sim_prog_mem_DataView.getUint32(counter_offset+2*4,true);

		if (((timer_control&(1<<TM_CNT_ENGAGED))!=0)&&((timer_control&(1<<TM_CNT_TRIGGERED_TIMER))!=0))
		{
			timer_val=OS_GetTimeDiff(OS_Tick(),timer_ref_point);
			if (timer_val>=exp_time)
			{
				timer_val=exp_time;
				timer_control=(1<<TM_CNT_DONE);
			}
			sim_prog_mem_DataView.setUint32(counter_offset+0*4,timer_control,true);
			sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_time,true);
			sim_prog_mem_DataView.setUint32(counter_offset+2*4,timer_ref_point,true);
			sim_prog_mem_DataView.setUint32(counter_offset+3*4,timer_val,true);
		}
	}

	val_d[0]=(timer_control>>8)&1;
	push_num(val_d[0]);
	curr_pc+=1;
}

function count()
{
	var counter_offset;

	
	var var_arr;
	var_arr=stack_pop();
	decodeStackVal(var_arr,var_d[0]);
	counter_offset=var_d[0].addr;

	var timer_control=sim_prog_mem_DataView.getUint32(counter_offset+0*4,true);
	var timer_val=sim_prog_mem_DataView.getUint32(counter_offset+3*4,true);
	if (((timer_control>>TM_CNT_COUNTER)&1)==0)
	{
		var exp_time=sim_prog_mem_DataView.getUint32(counter_offset+1*4,true);
		
		var timer_ref_point=sim_prog_mem_DataView.getUint32(counter_offset+2*4,true);

		if (((timer_control&(1<<TM_CNT_ENGAGED))!=0)&&((timer_control&(1<<TM_CNT_TRIGGERED_TIMER))!=0))
		{
			timer_val=OS_GetTimeDiff(OS_Tick(),timer_ref_point);
			if (timer_val>=exp_time)
			{
				timer_val=exp_time;
				timer_control=(1<<TM_CNT_DONE);
			}
			sim_prog_mem_DataView.setUint32(counter_offset+0*4,timer_control,true);
			sim_prog_mem_DataView.setUint32(counter_offset+1*4,exp_time,true);
			sim_prog_mem_DataView.setUint32(counter_offset+2*4,timer_ref_point,true);
			sim_prog_mem_DataView.setUint32(counter_offset+3*4,timer_val,true);
		}
	}
	val_d[0]=timer_val;
	push_num(val_d[0]);
	curr_pc+=1;
}

function min_op()
{
	get2Args();
	if (val_d[0]>val_d[1])
	{
		push_num(val_d[1])
	}
	else
	{
		push_num(val_d[0])
	}
	curr_pc+=1;
}

function max_op()
{
	get2Args();
	if (val_d[0]>val_d[1])
	{
		push_num(val_d[0])
	}
	else
	{
		push_num(val_d[1])
	}
	curr_pc+=1;
}

function fcos_op()
{
	var tmp;
	get2Args();
	if (val_d[0]!=val_d[1])
	{
		tmp=1
	}
	else
	{
		tmp=0;
	}
	push_num(tmp);
	setValue(var_d[0],val_d[1]);
	curr_pc+=1;
}

function if_then_else_op()
{
   var tmp;
   get3Args();
   if (val_d[2]==1)
   {
	   tmp=val_d[1];
   }
   else
   {
	   tmp=val_d[0];
   }
   push_num(tmp);
   curr_pc+=1;
}



var sim_trace_db;
var sim_trace_db_dataview;
var sim_curr_trace_pos=0;

function sim_TRACE_Clear()
{
	sim_curr_trace_pos=0;
	sim_trace_db=new Uint32Array(1024);
	sim_trace_db_dataview=new DataView(sim_trace_db.buffer);
}

function sim_TRACE_Add(rung,act,data)
{
	if (sim_curr_trace_pos>400)
	{
		return;
	}
	sim_trace_db_dataview.setUint8((8*sim_curr_trace_pos)+0,rung);
	sim_trace_db_dataview.setUint8((8*sim_curr_trace_pos)+1,act|(1<<7));
	sim_trace_db_dataview.setUint16((8*sim_curr_trace_pos)+2,OS_Tick(),true);
	sim_trace_db_dataview.setUint32((8*sim_curr_trace_pos)+4,data,true);
	sim_curr_trace_pos++;
}
	
	
	


function trace_func()
{
	get2Args();
	if (rung_true==true)
	{
		sim_TRACE_Add(curr_rung_count-1,val_d[1],val_d[0]);
	}
	curr_pc+=1;
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// End for VM functions
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var vm_funcs=
[
	vm_push, //op_push=0,
	vm_pop,  //op_pop=1,
	null,
	mult, //op_mult=3,
	div, //op_div=4,
	add, //op_sum=5,
	sub, //op_substruct=6,
	mod, //op_mod=7,
	abs1, //op_abs=8,
	expired, //op_expired=9,
	count, //op_count=10,
	null, //op_received=11,
	null, //op_sent=12,
	and, //op_and=13,
	not, //op_not=14,
	or, //op_or=15,
	less, //op_less=16,
	bigger, //op_greater=17,
	bigger_or_eq, //op_greater_or_eq=18,
	less_or_eq, //op_less_or_eq=19,
	eq, //op_equal=20,
	not_eq, //op_not_equal=21,
	assign, //op_assign=22,
	start_timer, //op_start_timer=23,
	null, //op_stop_timer=24,
	null, //op_start_counter=25,
	null, //op_stop_counter=26,
	null, //op_send_msg=27,
	null, //op_accpt_rcv_msg=28,
	branch_if_not_eq,//op_branch_if_not_eq=29,
	null, //op_end_of_prog=30,
   null, //op_comment=31,
   min_op, //op_min=32,
   max_op, //op_max=33,
   fcos_op, //op_fcos=34,
   coil_op, // op_coil=35,
   ton_op, //op_ton=36,
   toff_op, // op_tof=37
   ctu_op, //op_ctu=38,
   ctd_op, //op_ctd=39,
   cnt_res_op, //op_cnt_res=40,
   trace_func, // trace_func=41,
   if_then_else_op, //op_if_then_else=42
];


var sim_LocalIO_Scanlist=[];
var sim_LocalIO_Params=[];
var sim_ARGEE_code_size;
var sim_prog_text_seg_len;
var sim_reg_var_offset;
var sim_reg_var_size;

var ARGEE_HEADER_SIZE=68;

var sim_ARGEE_code_offset;

var sim_ARGEE_Code_Ram;

var op_end_of_prog=30;

var sim_curr_tick=0;

function OS_Tick()
{
	return sim_curr_tick;
}

function OS_GetTimeDiff(tick_curr,tick_ref)
{
	return tick_curr-tick_ref;
}

function simInitScan()
{
	sim_prog_mem_DataView=new DataView(sim_ARGEE_Code_Ram.buffer,sim_reg_var_offset);
	// no need to warry about overflow - simulation is not going to run for more than 49 days
	sim_curr_tick=0;
	prog_stop=false;
	sim_scan=simRunScan();
	curr_pc=0;
	sim_TRACE_Clear();	
	sim_runARGEE();
	
}

var flags_and_retain_addr;
var sim_params=[];

function sim_loadProjFile(dt)
{
	var i;
	var local_io_scanlist_len;
	var local_io_param_seg_len;
	var curr_offset;
	var proj_kernel=dt.getUint32(0);
	sim_ARGEE_code_size=dt.getUint32(7*4,true);	
	sim_prog_text_seg_len=dt.getUint32(8*4,true);
	sim_reg_var_offset=dt.getUint16(9*4,true);
	sim_reg_var_size=dt.getUint16(9*4+2,true);
	local_io_scanlist_len=dt.getUint32(4*4,true);
	local_io_param_seg_len=dt.getUint32(5*4,true);
	flags_and_retain_addr=dt.getUint32(12*4,true);
	curr_offset=ARGEE_HEADER_SIZE;
	for(i=0;i<((local_io_scanlist_len/4)|0);i++)
	{
		sim_LocalIO_Scanlist[i]=dt.getUint32(curr_offset,true);curr_offset+=4;
	}
	curr_offset+=local_io_param_seg_len;// skip param segment
	
	var gom_segm_offset=dt.getUint32(14*4,true);
	var gom_segm_size=0;
	if (gom_segm_offset!=0)
	{
		var segm_size=dt.getUint16(gom_segm_offset+2,true);
		gom_segm_size=segm_size+4;
	}
	
	curr_offset+=gom_segm_size;
	
	
	sim_ARGEE_code_offset=curr_offset;
	sim_ARGEE_Code_Ram=new Uint8Array(sim_ARGEE_code_size);
	for(i=0;i<sim_ARGEE_code_size;i++)
	{
		sim_ARGEE_Code_Ram[i]=dt.getUint8(curr_offset);curr_offset++;
	}
	simInitScan();
}

function* simRunScan()
{
	var i;
	var num_instruct=0;
	curr_pc=0;
	for(;;)
	{
		if (sim_ARGEE_Code_Ram[curr_pc]==op_end_of_prog)
		{
			break;
		}
		if ((sim_ARGEE_Code_Ram[curr_pc]&0xc0)==0)
		{
			vm_funcs[sim_ARGEE_Code_Ram[curr_pc]]();
		}
		else
		{
			alert("Libraries not supported for now\n");
			yield -1;
		}
		num_instruct++;
		if ((num_instruct%100)==0)
		{
			yield 1;
		}
	}
	curr_rung_count=0;
	yield 0;
}


var sim_scan=simRunScan();
var sim_timer;

function sim_runARGEE()
{
	if (prog_stop==true)
	{
		return;
	}
	clearInterval(ajaxScanTimer);	
	sim_timer=setInterval(vmScanTimerFunc,5);
}

var prog_stop=false;
function sim_StopProg()
{
	clearInterval(sim_timer);
	sim_startAjax();
	prog_stop=true;
}

function vmScanTimerFunc()
{
	clearInterval(sim_timer);
	var val=sim_scan.next().value;
	if (val==0)
	{
		sim_AjaxObj.process_req();
		sim_curr_tick+=5;
		sim_scan=simRunScan();
	}
	else if (val==1)
	{
	}
	else
	{
		return;
	}
	sim_runARGEE();
}


/*
function* VM_Task()
{
	while(1)
	{
		comm_disabled=true;
		// run one scan. preempt every 100 instructions
		
		comm_disabled=false;
	}
}
*/

/* 

var io_sectionNames=["Input","Output","Diagnostics","Parameters"];		
		
var io_visible=[[[false],[false],[false],[false]],[[false],[false],[false],[false]],[[false],[false],[false],[false]]];

function sim_IO_UpdateView(e,type,prm1,prm2)
{
	e.preventDefault(); 
	if (io_visible[prm1][prm2]==true)
	{
		io_visible[prm1][prm2]=false;
	}
	else
	{
		io_visible[prm1][prm2]=true;
	}
	console.log("update io");
	prog_div.innerHTML=renderForceIOScreen();
}

function IO_setObjVal(slot,sect,offset,len,val)
{
	SetArrValue(sim_io_mem_DataView,sim_slices_specified[slot].offsets[sect]*8+offset,len,val);
}

function IO_getObjVal(slot,sect,offset,len)
{
	return GetArrValue(sim_io_mem_DataView,sim_slices_specified[slot].offsets[sect]*8+offset,len);
}


function io_checkbox_handle(elem,slot,sect,offset)
{
	IO_setObjVal(slot,sect,offset,1,elem.checked);
}

function io_num_handle(elem,slot,sect,offset,len)
{
	IO_setObjVal(slot,sect,offset,len,elem.value);
}

function renderSectIOPoint(slot,sect,obj)
{
	var html="<tr><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+obj.name+"</td>";
	var val=IO_getObjVal(slot,sect,obj.offset,obj.length);
	html+="<td>";
	if (obj.length==1)
	{
		var checked="";
		if (val==1)
		{
			checked="checked";
		}
		// checkbox
		html+="<input type=\"checkbox\" onclick=\"io_checkbox_handle(this,"+slot+","+sect+","+obj.offset+");\""+checked+">";
	}
	else
	{
		html+="<input type=\"text\" onblur=\"io_num_handle(this,"+slot+","+sect+","+obj.offset+","+obj.length+");\" value=\""+val+"\">";
	}
	html+="</td></tr>";
	return html;
}

// left hand side - slice list and sections, right hand side - io points of the selections slice/section combination
function renderForceIOScreen()
{
	var i,j,k;
	var slice_obj;
	var tbl="";
	
	tbl="<table>";
	for(i=0;i<sim_slices_specified.length;i++)
	{
		slice_obj=sim_slices_specified[i];
		tbl+="<tr><td colspan=\"2\">";
		tbl+="Slot "+i+": "+slice_obj.name;
		tbl+="</td></tr>";
		for(j=0;j<slice_obj.sections.length;j++)
		{
			if ((slice_obj.sections[j].type!=sect_type.input)&&(slice_obj.sections[j].type!=sect_type.diag))
			{
				continue;	
			}
			var func_toggle="sim_IO_UpdateView(event,1,"+i+","+slice_obj.sections[j].type+");"
			tbl+="<tr><td colspan=\"2\">";
			tbl+="&nbsp&nbsp&nbsp&nbsp<a href=\"javascript:"+func_toggle+"\" onclick=\"return "+func_toggle+"\">"+io_sectionNames[slice_obj.sections[j].type]+"</a>";
			tbl+="</td></tr>";
			if (io_visible[i][slice_obj.sections[j].type]==true)
			{
				tbl+="<tbody id=\"sect_"+i+"_"+(slice_obj.sections[j].type)+"\" style=\"display:inline;\">";
				//tbl+="<tbody id=\"sect_"+i+"_"+(slice_obj.sections[j].type)+"\" >";
			}
			else
			{
				tbl+="<tbody id=\"sect_"+i+"_"+(slice_obj.sections[j].type)+"\" style=\"display:none;\">";
			}
			for(k=0;k<slice_obj.sections[j].objects.length;k++)
			{
				var data=renderSectIOPoint(i,slice_obj.sections[j].type,slice_obj.sections[j].objects[k]);
				tbl+=data;
			}
			tbl+="</tbody>";
		}
	}
	tbl+="</table>";
	return tbl;
}

// just one screen listing all program variables (integer/state) as well plc variables (PLC->ARGEE section defined)
function renderForceVarScreen()
{
	
	
}

*/


