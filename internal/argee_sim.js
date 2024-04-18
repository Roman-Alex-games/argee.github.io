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
 *  DESCRIPTION: ARGEE Simulator. This file provides an interface to simulation.
 *               Which consists of AJAX simulation, IO Database handling and the
 *               actual simulation task.  The run-time code for the actual simulation
 *               is inside a.out.js which is a compilation of ARGEE firmware components
 *               using emscripten compiler
 * 
 *******************************************************************************/

var ARGEE_sim=(function()
{ 

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
	 name:"TBEN-LL-8IOL",
	 order_num:100003910,	
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
	 name:"TBEN-LH-8IOL",
	 order_num:100002195,	
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
	 name:"TBEC-LL-8IOL",
	 order_num:100004614,	
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
     name:"TBEN-L4-8IOLA",
	 order_num:100028459,	
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
	 "",
	 ""
	 ],
	},

{
     name:"TBEN-LL-8IOLA",
	 order_num:100029880,	
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
	 ],
	},

	{
	 name:"ATLAS-SF-S2-4IOL",
	 order_num:100016672,	
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
	 ],
	},
	{
	 name:"TBEN-LL-4RMC-4DIP-4DXP_SSI",
	 order_num:100011084,	
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
	 ],
	},
	
	{
	 name:"TBEN-LL-4RMC-4DIP-4DXP",
	 order_num:100018352,	
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
	 ],
	},
	

	{
	 name:"DPP-1452453 ISC CAM",
	 order_num:100023211,	
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
	 ],
	},

	{
	 name:"DPP-1452453 ISC CAM",
	 order_num:1452453,	
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
	 ],
	},

   
	{
	 name:"FEN20-4IOL",
	 order_num:6814140,	
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
	 ],
	},
   
	{
	 name:"TBEN-S2-4AI",
	 order_num:6814025,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 1",              
	 " 2",  
	 " 3",  
	 "",  
	 "",
	 ],
	},
	{
	 name:"TBEN-S2-4AO",
	 order_num:6814028,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 1",              
	 " 2",  
	 " 3",  
	 "",  
	 "",
	 ],
	},
	
	{
	 name:"TBEN-S2-2COM-4DXP",
	 order_num:6814031,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0 0",              
	 " 0 1",              
	 " 0 2",  
	 " 0 3",  
	 " 0 4",  
	 " 0 5",  
	 " 0 6",
	 " 0 7",
	 " 1",              
	 " 1 0",              
	 " 1 1",              
	 " 1 2",  
	 " 1 3",  
	 " 1 4",  
	 " 1 5",  
	 " 1 6",
	 " 1 7",
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 	 
	 ],
	},
	{
	 name:"TBEN-S2-2COM-4DXP",
	 order_num:100001465,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0 0",              
	 " 0 1",              
	 " 0 2",  
	 " 0 3",  
	 " 0 4",  
	 " 0 5",  
	 " 0 6",
	 " 0 7",
	 " 1",              
	 " 1 0",              
	 " 1 1",              
	 " 1 2",  
	 " 1 3",  
	 " 1 4",  
	 " 1 5",  
	 " 1 6",
	 " 1 7",
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 	 
	 ],
	},
	
	{
	 name:"TBEN-S2-2RFID-4DXP",
	 order_num:6814029,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0",              
	 " 0",              
	 " 1",  
	 " 1",  
	 " 1",  
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 ],
	},	
   
	{
	 name:"TBEN-S2-2RFID-4DXP/C64",
	 order_num:100025153,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0",              
	 " 0",              
	 " 1",  
	 " 1",  
	 " 1",  
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 "",  	 
	 ],
	},	
	{
	 name:"TBEN-L5-4RFID-8DXP",
	 order_num:100000836,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0",              
	 " 0",              
	 " 1",  
	 " 1",  
	 " 1",  
	 " 2",  
	 " 2",  
	 " 2",  
	 " 3",  
	 " 3",  
	 " 3",  
	 "",  	     
	 "",  	 
	 "",  	 
	 
    " 8",  	 
	 " 9",  	 
	 " 10",  	 
	 " 11",  	 
    " 12",  	 
	 " 13",  	 
	 " 14",  	 
	 " 15",  	 

	 
    "",  	 
	 "",  	 
	 ],
	},	


	{
	 name:"TBEN-L4-4RFID-8DXP",
	 order_num:100002462,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0",              
	 " 0",              
	 " 1",  
	 " 1",  
	 " 1",  
	 " 2",  
	 " 2",  
	 " 2",  
	 " 3",  
	 " 3",  
	 " 3",  
	 "",  	     
	 "",  	 
	 "",  	 
	 
    " 8",  	 
	 " 9",  	 
	 " 10",  	 
	 " 11",  	 
    " 12",  	 
	 " 13",  	 
	 " 14",  	 
	 " 15",  	 

	 
    "",  	 
	 "",  	 
	 ],
	},	
   
	{
	 name:"TBEN-LL-4RFID-8DXP",
	 order_num:100002463,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 " 0",              
	 " 0",              
	 " 0",              
	 " 1",  
	 " 1",  
	 " 1",  
	 " 2",  
	 " 2",  
	 " 2",  
	 " 3",  
	 " 3",  
	 " 3",  
	 "",  	     
	 "",  	 
	 "",  	 
	 
    " 8",  	 
	 " 9",  	 
	 " 10",  	 
	 " 11",  	 
    " 12",  	 
	 " 13",  	 
	 " 14",  	 
	 " 15",  	 

	 
    "",  	 
	 "",  	 
	 ],
	},	
   
   
	{
	 name:"TBEN-S1-8DXP",
	 order_num:6814023,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
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
	 ],
	},
   
	{
	 name:"TBEN-S2-8DXP-CSMHS01",
	 order_num:100034918,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
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
	 ],
	},


	{
	 name:"TBEN-S1-4DXP",
	 order_num:100006468,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
	 "",
	 "",
	 " 4",              
	 " 5",              
	 " 6",  
	 " 7",  
	 "",
	 ],
	},
   
	{
	 name:"I/O Hub 8-PS",
	 order_num:100017238,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
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
	 ],
	},
   
	{
	 name:"YL-G3-8",
	 order_num:100028485,	
	 slot_name_suffixes:
	 [
	 "",                                         
	 "",              
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
	var slice_index=findIndex(IO_ids[slot]);
	if (slot_suffix_selected_device==-1)
	{
		if (conv==true)
		{
			return "Slot"+slot;
		}
		else
		{
			return slices[slice_index].name;
		}
	}
	if (slot==0)
	{
		tmp=slices[slice_index].name+" GW";
	}
	else
	{
		tmp=slices[slice_index].name+device_slot_suffixes[slot_suffix_selected_device].slot_name_suffixes[slot];
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



var sim_mode=false;



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
	{name:"TBEN-L1",id:0x01510028,diags:tben_l14_gw_diags},
	{name:"TBEN-L5",id:0x01550028,diags:tben_l14_gw_diags},
	{name:"TBEN-L4",id:0x01540028,diags:tben_l14_gw_diags},

	{name:"TBEN-L5",id:0x01560028,diags:tben_l14_gw_diags},
	{name:"TBEN-L4",id:0x01500028,diags:tben_l14_gw_diags},
	{name:"TBEN-L5",id:0x01530028,diags:tben_l14_gw_diags},
	{name:"TBEN-L4",id:0x01520028,diags:tben_l14_gw_diags},
	{name:"TBEN-LL",id:0x01590028,diags:tben_l14_gw_diags},
	{name:"TBEN-LL-8IOL",id:0x01580028,diags:tben_l14_gw_diags},
    {name:"TBEC-LL-8IOL", id:0x01400060,diags:tben_l14_gw_diags},
	{name:"TBEN-L4-8IOLA",id:0x015B0028,diags:tben_l14_gw_diags},
    {name:"TBEN-LL-8IOLA",id:0x015C0028,diags:tben_l14_gw_diags},
	
	
	{name:"TBEN-LL-4RFID",id:0x01510028,diags:tben_l14_gw_diags},

	
	{name:"BLCEN",id:0x01500021,diags:blcen_gw_diags},
	{name:"TBEN-S",id:0x01500029,diags:blcen_gw_diags},
	{name:"TBEN-AF",id:0x03500029,diags:blcen_gw_diags},
    {name:"TBEN-LL-4RMC_SSI",id:0x04520028,diags:blcen_gw_diags},
	{name:"TBEN-LL-4RMC",id:0x01520028,diags:blcen_gw_diags},
	{name:"DPP-X",id:0x05500029,diags:blcen_gw_diags},
	{name:"YL",id:0x07500029,diags:blcen_gw_diags},
	
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


var BLCEN_order_num_to_XionID_table=
[
21469440	,6827181,
38246656	,6827192,
71801088	,6827191,
22426368	,6827203,
22425600	,6827204,
22429696	,6827205,
22496256	,6827208,
24737536	,6827225,
24763648	,6827238,
561630208	,6827305,
39273472	,6827310,
26978560	,6827224,
1100716288	,6827312,
1115293952	,6827333,
561608448	,6827324,
1115131904	,6827368,
561682176	,6827364,
1107308544	,6827206,
1644183552	,6827207,
1143997184	,6827210,
1098354688	,6827222,
25925888	,6827223,
1644168192	,6827277,
1648362496	,6827209,
592801792	,6827176,
1160774400	,6827308,
1090531328	,6827171,
576024576	,6827175,
559378432	,6827177,
559247360	,6827178,
570951424	,6827179,
554174208	,6827180,
1127219968	,6827174,
1631585280	,6827172,
1627406336	,6827170,
1093665536	,6827173,
1083947776	,6827386,
];

function BLCEN_FindXionID(order_num)
{
	var i;
	for(i=0;i<(BLCEN_order_num_to_XionID_table.length/2);i++)
	{
		if (BLCEN_order_num_to_XionID_table[2*i+1]==order_num)
		{
			return BLCEN_order_num_to_XionID_table[2*i];
		}
	}
}


//var compl_sim_dev_db=
/*var sim_devices=
[
	{name:"TBEN-S2-4AI",slice_list:[0x01500029,524674,524674,524674,524674,17825792,0x80000],order_num:6814025},	
	{name:"TBEN-S2-4AO",slice_list:[0x01500029,8578,8578,8578,8578,1048576,0x80000],order_num:6814028},
	{name:"TBEN-S2-4IOL",slice_list:[0x01500029,1057026,4793090,4793090,4793090,4793090,2359296,6553600,0x80000],order_num:6814024},
	{name:"TBEN-S2-2COM-4DXP",slice_list:[0x01500029,1598082,
	                                      4260352,4260352,4260352,4260352,4260352,4260352,4260352,4260352,
										  1598082,
										  4260352,4260352,4260352,4260352,4260352,4260352,4260352,4260352,
									71827456,21495808,532610,50855936,128,128,128,128,0x80000],order_num:6814031},
	{name:"TBEN-S2-2RFID-4DXP",slice_list:[0x01500029,4261011,8650880,135296,4261011,8650880,135296,6815744,
											532610,50855936,128,128,128,128,0x80000],order_num:6814029},
	{name:"BLCEN-8PBLT",slice_list:[0x01500021,532608],order_num:6811493},
	{name:"TBEN-L4-8IOL",slice_list:[0x01540028,34611460,
									 4793090,4793090,4793090,4793090,4793090,4793090,4793090,4793090,
									 3670016,6553600,8960,0x80000],order_num:6814082},

	{name:"TBEN-L5-8IOL",slice_list:[0x01550028,34611460,
									 4793090,4793090,4793090,4793090,4793090,4793090,4793090,4793090,
									 3670016,6553600,8960,0x80000],order_num:6814017},
									 
	{name:"TBEN-S1-4DIP-4DOP",slice_list:[0x01500029,1079194368,151519232,17309696,2105474,33554560,33554560,33554560,0x0,0x0,0x0,0x2082102,0x80000],order_num:6814021},										 
	{name:"TBEN-S1-8DIP",slice_list:[0x01500029,1612726272,101187584,34086912,2105474,
	33554560,33554560,33554560,33554560,33554560,33554560,33554560,0x80000],order_num:6814020},										 
	
	{name:"TBEN-S1-8DIP-D",slice_list:[0x01500029,1614823424,117964800,34086912,2105474,
	33554560,33554560,33554560,33554560,33554560,33554560,33554560,0x80000],order_num:6814034},										 
	{name:"TBEN-S1-8DOP",slice_list:[0x01500029,1616118784,134742016,
	0,0,0,0,34087170,0,0,0,34087170,0x80000],order_num:6814022},										 
	
	{name:"TBEN-S1-8DXP",slice_list:[0x01500029,1616200704,168296448,34086912,2105474,33554560,33554560,
	17309954,33554560,33554560,33554560,17309954,0x80000],order_num:6814023},		
	
	{name:"TBEN-S2-4DIP-4DOP",slice_list:[0x01500029,34087042,235405312,17309696,2105474,33554560,33554560,33554560,
	34087170,8448,0x80000],order_num:6814074},										 
	
	{name:"TBEN-S2-8DIP",slice_list:[0x01500029,524418,185073664,34086912,2105474,
	33554560,33554560,33554560,33554560,33554560,33554560,33554560,16785664,0x80000],order_num:6814073},										 
	
	{name:"TBEN-S2-8DOP",slice_list:[0x01500029,8322,218628096,0,0,0,0,34087170,0,0,0,34087170,33562880,0x80000],order_num:6814075},										 
	{name:"TBEN-S2-8DXP",slice_list:[0x01500029,17309826,252182528,34086912,2105474,33554560,33554560,
	17309954,33554560,33554560,33554560,17309954,8448,0x80000],order_num:6814076},										 

	{name:"FEN20-4DIP-4DXP",slice_list:[0x01500127,1096172288],order_num:6931090},										 
	{name:"FEN20-4DIN-4DXN",slice_list:[0x01500127,1112949504 ],order_num:6814129 },										 
	{name:"FEN20-16DXP",slice_list:[0x01500127,2171163904 ],order_num:6931089 },										 

	
	{name:"TBEN-L4-16DIP",    slice_list:[0x01540028,2219593728],order_num:6814009},										 
	{name:"TBEN-L4-8DIP-8DOP",slice_list:[0x01540028,1700480000],order_num:6814010},										 
	{name:"TBEN-L4-16DOP",    slice_list:[0x01540028,2238121216],order_num:6814011},										 
	{name:"TBEN-L4-16DXP",    slice_list:[0x01540028,2221757696],order_num:6814012},										 
	{name:"TBEN-L4-16DIN",    slice_list:[0x01540028,2186039296],order_num:6814061},										 
	{name:"TBEN-L4-8DIN-8DON",slice_list:[0x01540028,1650148352],order_num:6814062},										 
	{name:"TBEN-L4-16DON",    slice_list:[0x01540028,2187789568],order_num:6814063},										 
	{name:"TBEN-L4-16DXN",    slice_list:[0x01540028,2188203264],order_num:6814064},										 
	{name:"TBEN-L5-16DIP",    slice_list:[0x01550028,2219593728],order_num:6814085},										 
	{name:"TBEN-L5-8DIP-8DOP",slice_list:[0x01550028,1700480000],order_num:6814086},										 
	{name:"TBEN-L5-16DOP",    slice_list:[0x01550028,2238121216],order_num:6814087},										 	
	{name:"TBEN-L5-16DXP",    slice_list:[0x01550028,2221757696],order_num:6814088},
	
	{name:"BLCEN-2M12MT-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827305)],order_num:6811450},
	{name:"BLCEN-4M12MT-4AI4AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827312) ],order_num:6811451},	
	{name:"BLCEN-4M12MT-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827310) ],order_num:6811452},
	{name:"BLCEN-4M12LT-2RFID-S-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827305),BLCEN_FindXionID(6827305)],order_num:6811453},	
	{name:"BLCEN-6M12LT-2RFID-S-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827305),BLCEN_FindXionID(6827310)],order_num:6811454},
	{name:"BLCEN-8M12LT-4AI4AO-VI-4AI4AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827312),BLCEN_FindXionID(6827312)],order_num:6811455},	
	{name:"BLCEN-4M12LT-2AI-PT-2AI-PT",    slice_list:[0x01500021,BLCEN_FindXionID(6827177),BLCEN_FindXionID(6827177)],order_num:6811456},
	{name:"BLCEN-8M12LT-4AI-VI-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827222)],order_num:6811458},	
	{name:"BLCEN-16M8LT-8XSG-P-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827310),BLCEN_FindXionID(6827310)],order_num:6811459},
	{name:"BLCEN-1M12MT-1SSI",    slice_list:[0x01500021,BLCEN_FindXionID(6827191) ],order_num:6811460},	
	{name:"BLCEN-1M12MT-1RS232",    slice_list:[0x01500021,BLCEN_FindXionID(6827181) ],order_num:6811461},
	{name:"BLCEN-1M12MT-1RS485-422",    slice_list:[0x01500021,BLCEN_FindXionID(6827192) ],order_num:6811462},	
	{name:"BLCEN-3M12LT-1RS232-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827181),BLCEN_FindXionID(6827305)],order_num:6811463},
	{name:"BLCEN-2M12MT-2AI-PT",    slice_list:[0x01500021,BLCEN_FindXionID(6827177) ],order_num:6811464},	
	{name:"BLCEN-2M12MT-2AI-TC",    slice_list:[0x01500021,BLCEN_FindXionID(6827178) ],order_num:6811465},
	{name:"BLCEN-4M12MT-4AI-TC",    slice_list:[0x01500021,BLCEN_FindXionID(6827368) ],order_num:6811467},	
	{name:"BLCEN-4M12MT-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827222) ],order_num:6811468},
	{name:"BLCEN-8M12LT-4AI-VI-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827310)],order_num:6811469},	
	{name:"BLCEN-4M12MT-8DO-0.5A-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827172) ],order_num:6811470},
	{name:"BLCEN-8M12LT-8DI-N-8DO-0.5A-N",    slice_list:[0x01500021,BLCEN_FindXionID(6827207),BLCEN_FindXionID(6827209)],order_num:6811473},	
	{name:"BLCEN-8M12LT-4AI-TC-4AI-TC",    slice_list:[0x01500021,BLCEN_FindXionID(6827368),BLCEN_FindXionID(6827368)],order_num:6811478},
	{name:"BLCEN-1M12MT-1CNT-ENC",    slice_list:[0x01500021,BLCEN_FindXionID(6827224) ],order_num:6811479},	
	{name:"BLCEN-5M12LT-1CNT-ENC-8DI-PD",    slice_list:[0x01500021,BLCEN_FindXionID(6827224),BLCEN_FindXionID(6827205)],order_num:6811480},
	{name:"BLCEN-6M12LT-2AO-I-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827179),BLCEN_FindXionID(6827310)],order_num:6811481},	
	{name:"BLCEN-6M12LT-4AI-VI-2AO-I",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827179)],order_num:6811482},
	{name:"BLCEN-16M8LT-8DI-P-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170),BLCEN_FindXionID(6827170)],order_num:6811483},	
	{name:"BLCEN-2M12MT-2RFID-A",    slice_list:[0x01500021,BLCEN_FindXionID(6827225) ],order_num:6811484},
	{name:"BLCEN-4M12VMT-8XSG-PD",    slice_list:[0x01500021,BLCEN_FindXionID(6827208) ],order_num:6811485},	
	{name:"BLCEN-4M12VMT-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827222) ],order_num:6811486},
	{name:"BLCEN-4M12VMH-4DO-2A-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827174) ],order_num:6811487},	
	{name:"BLCEN-8M12LT-8XSG-P-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827310),BLCEN_FindXionID(6827310)],order_num:6811488},
	{name:"BLCEN-4M12LT-2AO-I-2AO-I",    slice_list:[0x01500021,BLCEN_FindXionID(6827179),BLCEN_FindXionID(6827179)],order_num:6811489},	
	{name:"BLCEN-8M12LT-8DI-N-8DI-N",    slice_list:[0x01500021,BLCEN_FindXionID(6827207),BLCEN_FindXionID(6827207)],order_num:6811490},
	{name:"BLCEN-8M12LT-4AI4AO-VI-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827312),BLCEN_FindXionID(6827310)],order_num:6811491},	
	{name:"BLCEN-6M12LT-4AI-VI-2AI-PT",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827177)],order_num:6811492},
	{name:"BLCEN-4M12MT-2AI2AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827324) ],order_num:6811494},	
	{name:"BLCEN-4M12LT-2RFID-A-2RFID-A",    slice_list:[0x01500021,BLCEN_FindXionID(6827225),BLCEN_FindXionID(6827225)],order_num:6811496},
	{name:"BLCEN-4M12VMT-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170) ],order_num:6811497},	
	{name:"BLCEN-8M12VLT-4DI-P-4DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827171),BLCEN_FindXionID(6827171)],order_num:6811498},
	{name:"BLCEN-4M12MT-4IOL",    slice_list:[0x01500021,BLCEN_FindXionID(6827386) ],order_num:6811499},	
	{name:"BLCEN-8M12LT-4IOL-4IOL",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827386)],order_num:6811500},
	{name:"BLCEN-6M12LT-4IOL-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827305)],order_num:6811501},	
	{name:"BLCEN-8M12LT-4IOL-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827310)],order_num:6811502},
	{name:"BLCEN-8M12LT-4IOL-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827222)],order_num:6811503},	
	{name:"BLCEN-8M12LT-4IOL-4AI4AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827312)],order_num:6811504},
	{name:"BLCEN-8M12LT-8DI-P-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170),BLCEN_FindXionID(6827170)],order_num:6811506},	
	{name:"BLCEN-8M12LT-4AI-VI-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827170)],order_num:6811507},
	{name:"BLCEN-6M12LT-2RFID-S-8DO-0.5A-N",    slice_list:[0x01500021,BLCEN_FindXionID(6827305),BLCEN_FindXionID(6827209)],order_num:6811508},	
	{name:"BLCEN-5M12LT-1RS232-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827181),BLCEN_FindXionID(6827310)],order_num:6811509},
	{name:"BLCEN-8M12VLT-8DI-P-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170),BLCEN_FindXionID(6827170)],order_num:6811510},	
	{name:"BLCEN-2M12MT-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827305) ],order_num:6811450},
	{name:"BLCEN-4M12MT-4AI4AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827312) ],order_num:6811451},	
	{name:"BLCEN-4M12MT-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827310) ],order_num:6811452},
	{name:"BLCEN-4M12LT-2RFID-S-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827305),BLCEN_FindXionID(6827305)],order_num:6811453},	
	{name:"BLCEN-6M12LT-2RFID-S-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827305),BLCEN_FindXionID(6827310)],order_num:6811454},
	{name:"BLCEN-8M12LT-4AI4AO-VI-4AI4AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827312),BLCEN_FindXionID(6827312)],order_num:6811455},	
	{name:"BLCEN-4M12LT-2AI-PT-2AI-PT",    slice_list:[0x01500021,BLCEN_FindXionID(6827177),BLCEN_FindXionID(6827177)],order_num:6811456},	
	{name:"BLCEN-8M12LT-4AI-VI-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827222)],order_num:6811458},	
	{name:"BLCEN-16M8LT-8XSG-P-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827310),BLCEN_FindXionID(6827310)],order_num:6811459},	
	{name:"BLCEN-1M12MT-1SSI",    slice_list:[0x01500021,BLCEN_FindXionID(6827191) ],order_num:6811460},	
	{name:"BLCEN-1M12MT-1RS232",    slice_list:[0x01500021,BLCEN_FindXionID(6827181) ],order_num:6811461},	
	{name:"BLCEN-1M12MT-1RS485-422",    slice_list:[0x01500021,BLCEN_FindXionID(6827192) ],order_num:6811462},	
	{name:"BLCEN-3M12LT-1RS232-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827181),BLCEN_FindXionID(6827305)],order_num:6811463},		
	{name:"BLCEN-2M12MT-2AI-PT",    slice_list:[0x01500021,BLCEN_FindXionID(6827177) ],order_num:6811464},	
	{name:"BLCEN-2M12MT-2AI-TC",    slice_list:[0x01500021,BLCEN_FindXionID(6827178) ],order_num:6811465},
	{name:"BLCEN-4M12MT-4AI-TC",    slice_list:[0x01500021,BLCEN_FindXionID(6827368) ],order_num:6811467},	
	{name:"BLCEN-4M12MT-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827222) ],order_num:6811468},
	{name:"BLCEN-8M12LT-4AI-VI-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827310)],order_num:6811469},	
	{name:"BLCEN-4M12MT-8DO-0.5A-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827172) ],order_num:6811470},
	{name:"BLCEN-8M12LT-8DI-N-8DO-0.5A-N",    slice_list:[0x01500021,BLCEN_FindXionID(6827207),BLCEN_FindXionID(6827209)],order_num:6811473},	
	{name:"BLCEN-8M12LT-4AI-TC-4AI-TC",    slice_list:[0x01500021,BLCEN_FindXionID(6827368),BLCEN_FindXionID(6827368)],order_num:6811478},
	{name:"BLCEN-1M12MT-1CNT-ENC",    slice_list:[0x01500021,BLCEN_FindXionID(6827224) ],order_num:6811479},	
	{name:"BLCEN-5M12LT-1CNT-ENC-8DI-PD",    slice_list:[0x01500021,BLCEN_FindXionID(6827224),BLCEN_FindXionID(6827205)],order_num:6811480},
	{name:"BLCEN-6M12LT-2AO-I-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827179),BLCEN_FindXionID(6827310)],order_num:6811481},	
	{name:"BLCEN-6M12LT-4AI-VI-2AO-I",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827179)],order_num:6811482},
	{name:"BLCEN-16M8LT-8DI-P-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170),BLCEN_FindXionID(6827170)],order_num:6811483},	
	{name:"BLCEN-2M12MT-2RFID-A",    slice_list:[0x01500021,BLCEN_FindXionID(6827225) ],order_num:6811484},
	{name:"BLCEN-4M12VMT-8XSG-PD",    slice_list:[0x01500021,BLCEN_FindXionID(6827208) ],order_num:6811485},	
	{name:"BLCEN-4M12VMT-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827222) ],order_num:6811486},
	{name:"BLCEN-4M12VMH-4DO-2A-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827174) ],order_num:6811487},	
	{name:"BLCEN-8M12LT-8XSG-P-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827310),BLCEN_FindXionID(6827310)],order_num:6811488},
	{name:"BLCEN-4M12LT-2AO-I-2AO-I",    slice_list:[0x01500021,BLCEN_FindXionID(6827179),BLCEN_FindXionID(6827179)],order_num:6811489},	
	{name:"BLCEN-8M12LT-8DI-N-8DI-N",    slice_list:[0x01500021,BLCEN_FindXionID(6827207),BLCEN_FindXionID(6827207)],order_num:6811490},
	{name:"BLCEN-8M12LT-4AI4AO-VI-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827312),BLCEN_FindXionID(6827310)],order_num:6811491},	
	{name:"BLCEN-6M12LT-4AI-VI-2AI-PT",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827177)],order_num:6811492},
	{name:"BLCEN-4M12MT-2AI2AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827324) ],order_num:6811494},	
	{name:"BLCEN-4M12LT-2RFID-A-2RFID-A",    slice_list:[0x01500021,BLCEN_FindXionID(6827225),BLCEN_FindXionID(6827225)],order_num:6811496},
	{name:"BLCEN-4M12VMT-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170) ],order_num:6811497},	
	{name:"BLCEN-8M12VLT-4DI-P-4DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827171),BLCEN_FindXionID(6827171)],order_num:6811498},	
	{name:"BLCEN-4M12MT-4IOL",    slice_list:[0x01500021,BLCEN_FindXionID(6827386) ],order_num:6811499},	
	{name:"BLCEN-8M12LT-4IOL-4IOL",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827386)],order_num:6811500},	
	{name:"BLCEN-6M12LT-4IOL-2RFID-S",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827305)],order_num:6811501},	
	{name:"BLCEN-8M12LT-4IOL-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827310)],order_num:6811502},	
	{name:"BLCEN-8M12LT-4IOL-4AI-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827222)],order_num:6811503},	
	{name:"BLCEN-8M12LT-4IOL-4AI4AO-VI",    slice_list:[0x01500021,BLCEN_FindXionID(6827386),BLCEN_FindXionID(6827312)],order_num:6811504},		
	{name:"BLCEN-8M12LT-8DI-P-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170),BLCEN_FindXionID(6827170)],order_num:6811506},	
	{name:"BLCEN-8M12LT-4AI-VI-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827222),BLCEN_FindXionID(6827170)],order_num:6811507},
	{name:"BLCEN-6M12LT-2RFID-S-8DO-0.5A-N",    slice_list:[0x01500021,BLCEN_FindXionID(6827305),BLCEN_FindXionID(6827209)],order_num:6811508},	
	{name:"BLCEN-5M12LT-1RS232-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827181),BLCEN_FindXionID(6827310)],order_num:6811509},
	{name:"BLCEN-8M12VLT-8DI-P-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170),BLCEN_FindXionID(6827170)],order_num:6811510},	
	{name:"BLCEN-4M12MT-8DI-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827170)],order_num:6811512},	
	{name:"BLCEN-8M12LT-8DI-PD-8DI-PD",    slice_list:[0x01500021,BLCEN_FindXionID(6827205),BLCEN_FindXionID(6827205)],order_num:6811513},	
	{name:"BLCEN-8M12LT-4AO-V-8XSG-P",    slice_list:[0x01500021,BLCEN_FindXionID(6827333),BLCEN_FindXionID(6827310)],order_num:6811514},
];	
*/
/*var sim_popular_device_name_list=
[
	"TBEN-L5-16DXP","TBEN-L4-16DXP","BLCEN-6M12LT-2RFID-S-8XSG-P","TBEN-S1-8DXP","TBEN-L4-8IOL","TBEN-L5-8IOL","FEN20-16DXP","FEN20-4DIP-4DXP"
];

function findSimDevice(name)
{
	var i;
	for(i=0;i<sim_devices.length;i++)
	{
		if (sim_devices[i].name==name)
		{
			return sim_devices[i];
		}
	}
	return null;
}

var sim_device_list_menu=[];
function createSimDevList()
{
	var i;
	sim_device_list_menu=[];
	for(i=0;i<sim_popular_device_name_list.length;i++)
	{
		//var ent=findSimDevice(sim_popular_device_name_list[i]);
		sim_device_list_menu[sim_device_list_menu.length]=[" Popular - "+sim_popular_device_name_list[i],sim_popular_device_name_list[i]];
	}
	for(i=0;i<sim_devices.length;i++)
	{
		if (sim_popular_device_name_list.indexOf(sim_devices[i].name)==-1)
		{
			sim_device_list_menu[sim_device_list_menu.length]=[sim_devices[i].name,sim_devices[i].name];
		}
	}
}
*/



	//{name:"DPP-1452453 ISC CAM",slice_list:[0x01500029,1057026,4793090,4793090,4793090,4793090,2359296,6553600,0x80000],order_num:1452453},

var sim_devices=
[
	{name:"TBEN-L5-16DXP",slice_list:[0x01550028,0x846D5500],order_num:6814008},	
	{name:"TBEN-L4-16DXP",slice_list:[0x01540028,0x846D5500],order_num:6814012},		
	{name:"TBEN-L5-8DIP-8DOP",slice_list:[0x01550028,0x655B4400],order_num:6814006},
	{name:"TBEN-L4-8DIP-8DOP",slice_list:[0x01540028,0x655B4400],order_num:6814010},
   
	{name:"BLCEN-4M12MT-4AI4AO-VI",slice_list:[0x01500021,0x419B9900],order_num:6811451},	
	{name:"BLCEN-8M12LT-4AI4AO-VI-4AI4AO-VI",slice_list:[0x01500021,0x419B9900,0x419B9900],order_num:6811455},

	{name:"BLCEN-8M12LT-4AO-V-8XSG-P",slice_list:[0x01500021,0x427A0900,39273472],order_num:6811491},	


	
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

	{name:"TBEN-L4-8IOL",slice_list:[22282280, 34611460, 4793090, 4793090, 4793090, 4793090, 4793090, 4793090, 4793090, 4793090, 3670016, 6553600, 8960, 524288],order_num:6814082},
	{name:"TBEN-L5-8IOL",slice_list:[0x01550028,34611460,
									 4793090,4793090,4793090,4793090,4793090,4793090,4793090,4793090,
									 3670016,6553600,8960,0x80000],order_num:6814017},
	{name:"TBEN-S2-4IOL",slice_list:[0x01500029,1057026,4793090,4793090,4793090,4793090,2359296,6553600,0x80000],order_num:6814024},
   


	{name:"FEN20-16DXP",slice_list:[0x01500027,0x81695500],order_num:6931089},
	{name:"FEN20-4DIP-4DXP",slice_list:[0x01500127,0x41564300],order_num:6931090},
	{name:"TBEN-L1-16DXP",slice_list:[0x01510028,0x816D5500],order_num:6814008},
	
	
	{name:"TBEN-LL-4RMC-4DIP-4DXP",slice_list:[72483112, 50864516, 19178434, 19178434, 19178434, 19178434, 202375168, 436731904],order_num:100011084},


	
]


var act_sim_dev={};


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
		                 {sect_name:"Param",num_elems:0,max_size:0,datapoints:[]},
						 {sect_name:"Diag",num_elems:0,max_size:16,datapoints:[]},
						 {sect_name:"Input",num_elems:0,max_size:0,datapoints:[]},
						 {sect_name:"Output",num_elems:0,max_size:0,datapoints:[]},
						];
		// rework diagnostics section;
		var num_diags=0;
		for(j=0;j<16;j++)
		{
			if (GW_list[i].diags[j].length>0)
			{				
				arr[i].sections[1].datapoints[num_diags]={};
				arr[i].sections[1].datapoints[num_diags].name=GW_list[i].diags[j];
				arr[i].sections[1].datapoints[num_diags].category="GW";
				arr[i].sections[1].datapoints[num_diags].chan_unit="";
				// endian swap
				if (j>=8)
				{
					arr[i].sections[1].datapoints[num_diags].bitOffset=j-8;
				}
				else
				{
					arr[i].sections[1].datapoints[num_diags].bitOffset=j+8;
				}
				arr[i].sections[1].datapoints[num_diags].bitLen=1;
				arr[i].sections[1].datapoints[num_diags].bitIncremental=0;
				arr[i].sections[1].datapoints[num_diags].channelNumStart=0;
				arr[i].sections[1].datapoints[num_diags].channelNumEnd=0;				
				num_diags++;
			}
		}
		arr[i].sections[1].num_elems=num_diags;
	}
	return arr;	
}

var sim_slices_specified=[];

var special_slice_ids=[0x41564328,0x42564328,0x816D5528]


function sim_FindSliceObj(id)
{
	var i;
	// direct comparison
	for(i=0;i<sim_slices_db.length;i++)
	{
		if (sim_slices_db[i].mod_id==id)
		{
			return sim_slices_db[i];
		}
	}
	if (special_slice_ids.indexOf(id)!=-1)
	{
		// clear out last byte and compare
		for(i=0;i<sim_slices_db.length;i++)
		{
			if ((sim_slices_db[i].mod_id&0xffffff00)==(id&0xffffff00))
			{
				return sim_slices_db[i];
			}
		}
	}
	
	var fake_obj={mod_name:"",mod_id:0,sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		max_size:0,
		datapoints:[]
	},
	{
		sect_name:"Diag",
		num_elems:0,
		max_size:0,
		datapoints:[]
	},
	{
		sect_name:"Input",
		num_elems:0,
		max_size:0,
		datapoints:[]
	},
	{
		sect_name:"Output",
		num_elems:0,
		max_size:0,
		datapoints:[]
	},
	

	]};
	return fake_obj;
}

function createImportedProj()
{
	var i;
	GOM.setObjNum("ARGEE_BOOT_PROJ_ENABLED",0,0);
	var obj_list=
	[
		["ARGEE_PROJ_DEV_ORDER_NUM",0],
		["ARGEE_PROJ_DEV_NAME",0],
		["MODULE_LIST_ARRAY",0],
		["ARGEE_PROJ_TYPE",0],
		["ARGEE_PROJ_TITLE",0],
		["ARGEE_PROJ_CHECKSUM",0],
		["ARGEE_PROJ_NV_CHECKSUM",0],
		["ARGEE_BOOT_PROJ_ENABLED",0],
		["ARGEE_SOURCE_CODE",0],
	];
	
	
	for(i=0;i<slices.length;i++)
	{
		var arr=GOM.getObjArr("ARGEE_IO_PARAM",i);
		if (arr!=undefined)
		{
			obj_list[obj_list.length]=["ARGEE_IO_PARAM",i];	
		}
	}

	
	var proj=GOM.createProjFile(obj_list);
	if (proj==null)
	{
		return;
	}
	var arr=[];
	var i;
	var uarr=new Uint8Array(proj);
	
	for(i=0;i<proj.byteLength;i++)
	{
		arr[i]=uarr[i];
	}
	setLocalStorage("simCode",JSON.stringify(arr));
	return proj;
}

function createEmptyARGEE_Proj()
{
	var i;
	// assume GOM already contains modulelist/order_num/device_name
	IO=[];
	FLOW.initProj();
	FLOW.generateARGEE_Code(false);

	GOM.setObjNum("ARGEE_BOOT_PROJ_ENABLED",0,0);
	GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(""));
	GOM.setObjNum("ARGEE_PROJ_CHECKSUM",0,0);
	// populate the device entries

	// create default parameters
	for(i=0;i<slices.length;i++)
	{
		IO_CONF.createDefaultParamInit(i);
	}

	if (default_pro_mode==true)
	{
		deteleLocalStorageKey("prog_code");
		GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.ARGEE);
		FLOW.convertToArgee_imp(false);
		
	}
	else
	{
		GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.FLOWCHART);
	}
	return createImportedProj();		
}

function simDevChanged(sel)
{
	//sim_InitDeviceStruct(elem.selectedIndex);
	eraseProject();
	var slice_list=[];
	slices=[];
	slice_list[0]=sim_devices[sel].slice_list.length;
	IO_ids=[];
	for(i=0;i<sim_devices[sel].slice_list.length;i++)
	{
		IO_ids[i]=sim_devices[sel].slice_list[i];
		slice_list[i+1]=sim_devices[sel].slice_list[i]
		var slice_obj={};
		slice_obj=SIM.simDB_constructSliceObj(i,sim_devices[sel].slice_list[i],sim_devices[sel].order_num,sim_devices[sel].name);
		slices[slices.length]=slice_obj;
	}
	GOM.setObjArr("MODULE_LIST_ARRAY",0,GOM.convArr32ToArrBuf(slice_list));
	GOM.setObjArr("ARGEE_PROJ_DEV_NAME",0,GOM.convStringToArr(sim_devices[sel].name));
	GOM.setObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0,sim_devices[sel].order_num);
	for(i=0;i<slices.length;i++)
	{
		IO_CONF.createDefaultParamInit(i);
	}
	
	createEmptyARGEE_Proj();
	return true;
}


function selectSimDevice()
{
	var sel=window.document.getElementById("SimDeviceSelection");
	if (sel.selectedIndex>=sim_devices.length)
	{
		return;
	}
	// set GOM specific elements for the simulation
	simDevChanged(sel.selectedIndex);
	sim_gen.next();
}


function sim_RenderDeviceSelection()
{
	var i;
	var selected=false;
	var html="<center><h2>Select Device to Simulate</h2><br><select id=\"SimDeviceSelection\">";
	for(i=0;i<sim_devices.length;i++)
	{
		if (sim_devices[i].name==act_sim_dev.name)
		{
			html+="<option selected >"+sim_devices[i].name+"</option>";
			selected=true;
		}
		else
		{
			html+="<option>"+sim_devices[i].name+"</option>";
		}
	}
	if (selected==false)
	{
		html+="<option selected > Invalid Device (please change) </option>";
	}
	html+="</select><br><button onclick=\"SIM.selectSimDevice();\">Simulate</button></center>"
	return html;
}

function sim_InitDeviceStruct()
{

	sim_slices_db=sim_slices_db.concat(modules_BLCEN);
   sim_slices_db=sim_slices_db.concat(modules_BLCEN_8PBLT);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_L);
	sim_slices_db=sim_slices_db.concat(modules_FEN20);
   sim_slices_db=sim_slices_db.concat(modules_FEN20_4IOL);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S1);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_Lx_8IOL);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_2COM);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_2RFID);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_2RFID_C64);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_4IOL);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_4AI);   
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_4AO);   
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_DIG);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_L1_dig);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_L_4RFID);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_4RMC);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_4RMC_SSI);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_L_01);
    sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_DIG);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_8IOL);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LX_8IOLA);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_8IOLA);
   sim_slices_db=sim_slices_db.concat(modules_TBEC_8IOL);
   
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_4RFID);
   
	sim_slices_db=sim_slices_db.concat(sim_BuildGwArray());
	
}
var sim_remap_sections=[3,2,0,1];

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


function simSetObjRdVal(name,inst,val)
{
	var obj=GOM.getObjByName(name);
	if (obj.elem.sim_val==undefined)
	{
		obj.elem.sim_val=[];
	}		
	obj.elem.sim_val[inst]=val;
}

function simSetObjFunc(obj_name,func_name,func)
{
	var obj=GOM.getObjByName(obj_name);
	obj.elem[func_name]=func;
}

var simProjArrBuf;

// used by the non-simulator code to use simulator database to extract IO datapoints
function fillSimSlots(slotsDV)
{
	var i;
	var offset=0;
	var num_slots=slotsDV.getUint32(0,true);
	for(i=0;i<num_slots;i++)
	{
		var id=slotsDV.getUint32(4+i*4,true);
		var obj=sim_FindSliceObj(id);
		sim_slices_specified[i]=clone(obj);
		sim_slices_specified[i].offsets=[];
		sim_slices_specified[i].sizes=[];
		for(j=0;j<obj.sections.length;j++)
		{
			sim_slices_specified[i].offsets[sim_remap_sections[j]]=offset;
			sim_slices_specified[i].sizes[sim_remap_sections[j]]=obj.sections[j].max_size;
			offset+=obj.sections[j].max_size;
		}
	}
	
}



function simDevInit()
{
	var i;
	var gom=GOM_inst(true);
	var arr=JSON.parse(getLocalStorage("simCode"));
	if (arr==null)
	{
		//deteleLocalStorageKey("simCode");
		//window.location=window.location;
		return;
	}
	var arr_buf=gom.convArr8ToArrBuf(arr);

	gom.loadProjFile(arr_buf,false,true);
	
	act_sim_dev={};
	act_sim_dev.slice_list=gom.convArrBuftoArr32(gom.getObjArr("MODULE_LIST_ARRAY",0)).slice(1);
	act_sim_dev.name=gom.arrToString(gom.getObjArr("ARGEE_PROJ_DEV_NAME",0));
	act_sim_dev.order_num=gom.getObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0);

	
	
	var i,j;
	sim_slices_specified=[];
	

	var offset=0;

	var arr=new Uint32Array(act_sim_dev.slice_list.length+1);
	arr[0]=act_sim_dev.slice_list.length;
	for(i=0;i<act_sim_dev.slice_list.length;i++)
	{
		var obj=sim_FindSliceObj(act_sim_dev.slice_list[i]);
		sim_slices_specified[i]=clone(obj);
		sim_slices_specified[i].offsets=[];
		sim_slices_specified[i].sizes=[];
		arr[i+1]=act_sim_dev.slice_list[i];
		for(j=0;j<obj.sections.length;j++)
		{
			sim_slices_specified[i].offsets[sim_remap_sections[j]]=offset;
			
			//var len=sim_findSectSize(obj.sections[sim_remap_sections[j]]);
			_setupSectSize(i,sim_remap_sections[j],obj.sections[j].max_size);
			sim_slices_specified[i].sizes[sim_remap_sections[j]]=obj.sections[j].max_size;
			offset+=obj.sections[j].max_size;
		}
	}
	simSetObjRdVal("MULTPC_ORDER_NUM",0,act_sim_dev.order_num);
	simSetObjRdVal("ARGEE_DEV_NAME",0,GOM.convStringToArr(act_sim_dev.name));
	simSetObjRdVal("MULTPC_FIELDBUS_CONNECTED",0,0);
	simSetObjRdVal("SAPI_APP_VER_STRING",0,GOM.convStringToArr("V1.2.3.4"));
	
	simSetObjRdVal("ARGEE_COMP_VER",1,exp_ARGEE_Kernel_Version);
	simSetObjRdVal("ARGEE_BOOT_PROJ_ENABLED",0,1);
	simSetObjRdVal("ARGEE_GET_SUB_IDS_OBJ",0,arr.buffer);
	arr=new Uint8Array(1);
	arr[0]=1;
	simSetObjRdVal("ARGEE_CHECK_PASSWORD",0,arr.buffer);
	simProjArrBuf=arr_buf;
	
}

function copyArrToSimObj(obj_name,inst,ptr,len)
{
	var obj=GOM.getObjByName(obj_name);
	var buf1=Module.HEAP8;
	var val=buf1.buffer.slice(ptr,ptr+len);
	if (obj.elem.sim_arr_val==undefined)
	{
		obj.elem.sim_arr_val=[];
	}		
	obj.elem.sim_arr_val[inst]=val;
}

function copyNumToSimObj(obj_name,inst,val)
{
	var obj=GOM.getObjByName(obj_name);
	if (obj.elem.sim_num_val==undefined)
	{
		obj.elem.sim_num_val=[];
	}		
	obj.elem.sim_num_val[inst]=val;
}


var obj_to_sect_map=["ARGEE_IO_INP","ARGEE_IO_OUTP","ARGEE_IO_DIAG","ARGEE_IO_PARAM"];

function updateFromSim()
{
	var i,j;
	var ptr;
	for(i=0;i<sim_slices_specified.length;i++)
	{
		for(j=0;j<sim_slices_specified[i].sections.length;j++)
		{
			ptr=_getIOPtr(i,j);
			copyArrToSimObj(obj_to_sect_map[j],i,ptr,sim_slices_specified[i].sizes[j]);
		}
	}
	// copy PLC objs
	ptr=_getPLCPtr(0);
	copyArrToSimObj("ARGEE_GET_PLC_INP",0,ptr,480);
	ptr=_getPLCPtr(1);
	copyArrToSimObj("ARGEE_GET_PLC_OUTP",0,ptr,480)
	ptr=_getProgBuf();
	copyArrToSimObj("ARGEE_GET_PROG_VARS",0,ptr,GOM.getObjNum("ARGEE_CTRL_VAR_SEGM_SIZE",0));
	copyNumToSimObj("ARGEE_BASE_MEM_ADDR",0,ptr);
	copyNumToSimObj("ARGEE_CURR_TIMER_TICK",0,_OS_getIntTick());
}


var sim_gen;

function getSimGen()
{
	sim_gen=simInit();
	return sim_gen;
}

var ajaxScanTimer;

function simExchTrig()
{
	ajaxScanTimer=setTimeout(sim_AjaxExchangeTask,0);
}

// if simulation in progress -> invoke  exchange task after every scan cycle.
// if not -> invoke it every 20ms

function sim_AjaxExchangeTask()
{
	clearTimeout(ajaxScanTimer);	
	sim_AjaxObj.process_req();
}

function GOM_CreateRespArr(len)
{
	resp_data=new ArrayBuffer(4+len);
	var dt=new DataView(resp_data);
	dt.setUint32(0,len,true);
	var dt=new DataView(resp_data,4);
	return dt;
}




function simDB_getMod(slot,mod_id,order_num,dev_name)
{
	var mod_name=null;
	var selector=null;
	var i;
	if (slot==0)
	{
		/*for(i=0;i<sim_devices.length;i++)
		{
			if (sim_devices[i].order_num==order_num)
			{
				mod_name=sim_devices[i].name;
				break;
			}
		}
		if (mod_name==NULL*/
		mod_name=dev_name;
		selector=sim_FindSliceObj(mod_id);
	}
	else
	{
		selector=sim_FindSliceObj(mod_id);
		mod_name=selector.mod_name;
	}
	return {mod_name:mod_name,selector:selector};
}

function remapGwBit(slot,sect,bit)
{
	if ((slot==0)&&(sect==sect_type.diag))
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

// remap sections to make it look nice
var remap_sections=[3,2,0,1];

function simDB_constructSliceObj(slot,id,gw_order_num,dev_name)
{
	var res=simDB_getMod(slot,id,gw_order_num,dev_name);
	var i,j,k,l;
	var slice_obj={};
	slice_obj.name=res.mod_name;
	slice_obj.id=id;
	slice_obj.sections=[];
	for(i=0;i<4;i++)
	{
		var num_points=res.selector.sections[i].datapoints.length;
		slice_obj.sections[remap_sections[i]]={objects:[]};
		// first add all single channel datapoints
		var num_channels;
		var multi_channel=false;
		var sorted_channels=true;
		var chan_start=-1;
		var chan_end=-2;
		var curr_obj;
		for(k=0;k<num_points;k++)
		{
			var download_result=res.selector.sections[i].datapoints[k];
			if ((download_result.enumLen!=0)&&(remap_sections[i]==sect_type.param))
			{
				var enum_offset=0;
				download_result.enumList=[];
				for(j=0;j<download_result.enumLen;j++)
				{
					download_result.enumList[j]={};
					download_result.enumList[j].str=escapeHTML(download_result.enumValues[2*j+1]);
					download_result.enumList[j].val=download_result.enumValues[2*j];
				}
			}
			download_result.dataPointName=download_result.name;
			if (download_result.channelNumStart==download_result.channelNumEnd)
			{
				curr_obj=slice_obj.sections[remap_sections[i]].objects.length;
				if (download_result.chan_unit!="")
				{
					download_result.dataPointName+="_"+download_result.channelNumStart;
				}
				slice_obj.sections[remap_sections[i]].objects[curr_obj]=
					   {name:convertString(/*download_result.dataPointCategory+" "+*/download_result.dataPointName),
						offset:remapGwBit(slot,i,download_result.bitOffset),
						length: download_result.bitLen,
						signed:false,
						dataType:download_result.dataType,
						enumLen:download_result.enumLen,
						defaultValue:download_result.defaultValue,
						enumList:clone(download_result.enumList),
						channel:-1,
						};
			}
			else
			{
				multi_channel=true;
				if (chan_start==-1)
				{
					chan_start=download_result.channelNumStart;
					chan_end=download_result.channelNumEnd;
					num_channels=(download_result.channelNumEnd-download_result.channelNumStart+1);
				}
				else
				{
					if ((sorted_channels==true)&&(chan_start==download_result.channelNumStart)&&(chan_end==download_result.channelNumEnd))
					{
					}
					else
					{
						sorted_channels=false;
					}
					num_channels=(download_result.channelNumEnd-download_result.channelNumStart+1);
				}
			}
		}
		
		if (multi_channel==true)
		{
			if (sorted_channels==true)
			{
				// add all datapoints of channels sorted by channel number
				for(l=0;l<num_channels;l++)
				{
					for(k=0;k<num_points;k++)
					{
						download_result=res.selector.sections[i].datapoints[k];
						if (download_result.channelNumStart!=download_result.channelNumEnd)
						{
							curr_obj=slice_obj.sections[remap_sections[i]].objects.length;
							slice_obj.sections[remap_sections[i]].objects[curr_obj]=
							   {name:convertString(/*download_result.dataPointCategory+" "+*/download_result.dataPointName+" "+(download_result.channelNumStart+l)),
								offset:remapGwBit(slot,i,download_result.bitOffset+l*download_result.bitIncremental),
								length: download_result.bitLen,
								signed:false,
								dataType:download_result.dataType,
								enumLen:download_result.enumLen,
								defaultValue:download_result.defaultValue,
								enumList:clone(download_result.enumList),
								channel:(download_result.channelNumStart+l),
								};
						}
					}
				}
			}
			else
			{
				for(k=0;k<num_points;k++)
				{
					download_result=res.selector.sections[i].datapoints[k];
					if (download_result.channelNumStart!=download_result.channelNumEnd)
					{
						var num_channels=(download_result.channelNumEnd-download_result.channelNumStart+1);
						for(l=0;l<num_channels;l++)
						{
							curr_obj=slice_obj.sections[remap_sections[i]].objects.length;
							slice_obj.sections[remap_sections[i]].objects[curr_obj]=
							   {name:convertString(/*download_result.dataPointCategory+" "+*/download_result.dataPointName+" "+(download_result.channelNumStart+l)),
								//offset:remapGwBit(i,j,download_result.bitOffset+l*download_result.bitIncremental),
								offset:remapGwBit(slot,i,download_result.bitOffset+l*download_result.bitIncremental),
								length: download_result.bitLen,
								signed:false,
								dataType:download_result.dataType,
								enumLen:download_result.enumLen,
								defaultValue:download_result.defaultValue,
								enumList:clone(download_result.enumList),
								channel:-1,									
								};
						}
					}
				}
			}
		}
	}
	return slice_obj;
}	

	


var DEBG_CMD_BREAK_ALL=0;
var	DEBG_CMD_SET_CLR_BREAKPOINTS=1;
var	DEBG_CMD_CONTINUE=2;
var	DEBG_CMD_STEP=3;

var prev_sim_stopped=false;
var break_cmd=-1;

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

	abort:function(a,b,c)
	{
		this.req_pending=false;
		
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
			var gom_code=dt.getUint32(offset,true);offset+=4;
			this.response=new ArrayBuffer(0);
			switch(gom_code)
			{
				case GOM.gom_op.UID_TO_OID:
				{
					var uid=dt.getUint32(offset,true);
					this.response=new ArrayBuffer(4);
					var tmp=new Uint32Array(this.response);
					tmp[0]=GOM.findObj(uid);
					break;
				}
				case GOM.gom_op.READ_ARGEE_FILE:
				{
					this.response=simProjArrBuf;
					break;
				}
				case GOM.gom_op.MULT_INST_READ:
				{
					updateFromSim();
					var num_obj=dt.getUint32(offset,true);offset+=4;
					var i,j;
					var obj_oids=[];
					for(i=0;i<num_obj;i++)
					{
						obj_oids[i]=dt.getUint32(offset,true);offset+=4;
					}
					var resp=new ArrayBuffer(100000);
					var dt1=new DataView(resp);
					offset=0;
					for(i=0;i<num_obj;i++)
					{
						var obj=GOM.getObjByOID(obj_oids[i]);
						dt1.setUint32(offset,obj_oids[i],true);offset+=4;
						if (obj.elem.sim_num_val!=undefined)
						{
							dt1.setUint32(offset,obj.elem.sim_num_val.length,true);offset+=4;
							for(j=0;j<obj.elem.sim_num_val.length;j++)
							{
								dt1.setUint32(offset,4,true);offset+=4;
								dt1.setUint32(offset,obj.elem.sim_num_val[j],true);offset+=4;
							}
						}
						else if (obj.elem.sim_arr_val!=undefined)
						{
							dt1.setUint32(offset,obj.elem.sim_arr_val.length,true);offset+=4;
							for(j=0;j<obj.elem.sim_arr_val.length;j++)
							{
								dt1.setUint32(offset,obj.elem.sim_arr_val[j].byteLength,true);offset+=4;
								var tm1=new Uint8Array(obj.elem.sim_arr_val[j]);
								var k;
								for(k=0;k<obj.elem.sim_arr_val[j].byteLength;k++)
								{
									dt1.setUint8(offset,tm1[k]);offset+=1;
								}
							}
						}		
					}
					this.response=resp.slice(0,offset);
					break;
				}
				case GOM.gom_op.STORE_ARGEE_FILE:
				{
					sys_time=1000;
					_setSystemTime(sys_time&0xffffffff);

					simProjArrBuf=this.act_req.slice(offset+4);
					var arr8=GOM.convArrBufToArr8(simProjArrBuf);
					setLocalStorage("simCode",JSON.stringify(arr8));
					SIM.preprocessProjFile(simProjArrBuf);
					
					break;
					
				}
				case GOM.gom_op.WRITE_WITH_OFFSET:
				{
					var tmp=_getTmpBuf();
					writeArrayToMemory(new Uint8Array(this.act_req.slice(offset)),tmp);
					_writeObjWithOffsets(tmp);
					break;
				}
				case GOM.gom_op.GOM_HDLR_CMD_EXT_WRITE_WITH_OFFSET:
				{
					var tmp=_getTmpBuf();
					writeArrayToMemory(new Uint8Array(this.act_req.slice(offset)),tmp);
					_writeObjWithOffsetsExt(tmp);
					break;
				}
				case GOM.gom_op.GOM_HDLR_CMD_READ_BATCH:
				{
					   var MAX_OBJ_BATCH_TRANSF=16;	
					   var cnt = dt.getUint32(offset,true);offset+=4;
					   if (cnt > MAX_OBJ_BATCH_TRANSF)
					   {
						   break;
					   }
					   this.response=new ArrayBuffer(2*cnt);
					   break;
				}

				
				case GOM.gom_op.READ:
				case GOM.gom_op.WRITE:
				{
					var uid=dt.getUint32(offset,true);offset+=4;
					var inst=dt.getUint32(offset,true);offset+=4;
					var oid=GOM.findObj(uid);
					var obj=GOM.getObjByOID(oid);
					var ln1;
					if (gom_code==GOM.gom_op.WRITE)
					{
						ln1=dt.getUint32(offset,true);offset+=4;
					}
					if ((gom_code==GOM.gom_op.READ)&&(obj.elem.name=="ARGEE_GET_PROG_VARS"))
					{
						updateFromSim();
					}
					
					if ((gom_code==GOM.gom_op.WRITE)&&(obj.elem.name=="ARGEE_BREAKPOINT_UPLOAD_START"))
					{
						prev_sim_stopped=sim_stopped;
						sim_stopped=true;
						resumeSim(); // force the simulator to truly stop
						break_cmd=dt.getUint8(offset);offset++;
						var break_pos,break_data;
						break_pos=dt.getUint16(offset,true);offset+=2;
						break_data=dt.getUint32(offset,true);offset+=4;
						if ((break_cmd==DEBG_CMD_CONTINUE)||(break_cmd==DEBG_CMD_STEP))
						{
							_setupBreakpointReplacement(break_pos,break_data,1); // preemption point enable
						}
						else
						{
							_setupBreakpointReplacement(break_pos,break_data,0);
						}
						_updateStatusRegs(boolToInt(sim_stopped),boolToInt(exception_detected));
					}
					else if ((gom_code==GOM.gom_op.WRITE)&&(obj.elem.name=="ARGEE_BREAKPOINT_UPLOAD_FINILIZE"))
					{
						if ((break_cmd==DEBG_CMD_CONTINUE)||(break_cmd==DEBG_CMD_STEP)||(break_cmd==DEBG_CMD_BREAK_ALL))
						{
							if (exception_detected==false)
						   {
							   sim_stopped=false;
						   }
						}
						else if (break_cmd==DEBG_CMD_SET_CLR_BREAKPOINTS)
						{
							if (prev_sim_stopped==false)
							{
								sim_stopped=false;
							}
						}
						_updateStatusRegs(boolToInt(sim_stopped),boolToInt(exception_detected));
						if (sim_stopped==false)
						{
							sim_gen=runSim();
							sim_gen.next();
						}
					} 
					if ((gom_code==GOM.gom_op.READ)&&(obj.elem.sim_val!=undefined))
					{
						
						if (obj.elem.type==TYPE.NUM)
						{
							var arr=new Uint32Array(2);
							arr[0]=4;
							arr[1]=obj.elem.sim_val[inst];
							this.response=arr.buffer;
						}
						else
						{
							var i;
							this.response=new ArrayBuffer(4+obj.elem.sim_val[inst].byteLength);
							var dt1=new DataView(this.response);
							dt1.setUint32(0,obj.elem.sim_val[inst].byteLength,true);
							var map=new Uint8Array(obj.elem.sim_val[inst]);
							for(i=0;i<map.byteLength;i++)
							{
								dt1.setUint8(4+i,map[i]);
							}
						}	
					}
					else if ((gom_code==GOM.gom_op.READ)&&(obj.elem.sim_arr_val!=undefined))
					{
							var i;
							var resp=new ArrayBuffer(100000);
							var dt1=new DataView(resp);
							offset=0;
							dt1.setUint32(offset,obj.elem.sim_arr_val[0].byteLength,true);offset+=4;
							var tm1=new Uint8Array(obj.elem.sim_arr_val[0]);
							var k;
							for(k=0;k<obj.elem.sim_arr_val[0].byteLength;k++)
							{
								dt1.setUint8(offset,tm1[k]);offset+=1;
							}
							this.response=resp.slice(0,offset);
					}
					else if ((gom_code==GOM.gom_op.READ)&&(obj.elem.cust_get!=undefined))
					{
						this.response=obj.elem.cust_get(inst);
					}
					break;
				}
			}
			this.readyState=4;
			this.status=200;
			this.req_pending=false;
			this.onreadystatechange();
		}
	}
};

function getSimMode()
{
   if (typeof window === 'undefined') 
   {
      // nodejs
      return true;
   }
	return sim_mode;
}

function getSimAjaxObj()
{
	return sim_AjaxObj;
}

var sim_gom;


function* simInit()
{
	sim_gom==GOM_inst(true);
	sim_mode=true;
	if (getLocalStorage("simCode")==undefined)
	{
		prog_div=this.document.getElementById("prog");
		cont_menu_div=this.document.getElementById("cont_menu");
		men_div=this.document.getElementById("sup_men");
		var_div1=this.document.getElementById("vars");
		nav=this.document.getElementById("navigation");
		
		
		prog_div.style.visibility = 'hidden';
		var_div1.style.visibility = 'hidden';	
		men_div.style.visibility = 'hidden';
		nav.style.visibility = 'hidden';

		
		prog_div.style.visibility = 'visible';
		prog_div.style.width="99%";
		prog_div.innerHTML=sim_RenderDeviceSelection();
		yield 1;
	}
	simDevInit();
	//invocation = sim_AjaxObj;
	GOM.addAjaxAction(TRANSF.startEnvConn);
}




var sim_gen;
var tm1=null;
function resumeSim()
{
	clearTimeout(tm1)
	sim_gen.next();
}
function* wait(ms)
{
	if (tm1!=null)
	{
		clearTimeout(tm1)
	}
	tm1=setTimeout(resumeSim,ms);
	yield 1;
}



function preprocessProjFile(arr)
{
	var i;
	/*_MOV_VAL(5,0x435);
	var tmp=_GET_VAL(5);*/
	
	
	var tmp=_getTmpBuf();
	var prog_ptr=_getProgBuf();
	writeArrayToMemory(new Uint8Array(arr),tmp);
	if (GEN.getARM7_Mode()==true)
	{
		_setArm7Mode(1);
	}
	else
	{
		_setArm7Mode(0);
	}
	if (_processProjFile(tmp)==0)
	{
		sim_stopped=true;
		return;
	}
	/*_ARGEE_sim_PrepExecNST();
	var ret=0;
	while(ret==0)
	{
		ret=_ARGEE_simExec();
	}
	console.log("reg1 value:"+Module.getValue(prog_ptr+152,'i32'));
	_ARGEE_sim_PrepExecNST();
	ret=0;
	while(ret==0)
	{
		ret=_ARGEE_simExec();
	}
	console.log("reg1 value:"+Module.getValue(prog_ptr+152,'i32'));
	*/
	sim_stopped=false;
	prev_sim_stopped=false;
	exception_detected=false;
	break_cmd=-1;
	sim_gen=runSim();
	sim_gen.next();
}

function getCurrTime()
{
	var d=new Date();
	return d.getTime();
}

var sim_stopped=false;
var exception_detected=false;
function setSimStopped(stop)
{
	sim_stopped=stop;
	resumeSim(); // force the simulator to truly stop
}

var sys_time=1000;


function* runSim()
{
	var ret;
	var cnt=0;
	while(sim_stopped==false)
	{
		
		_ARGEE_sim_PrepExecNST();
		ret=0;
		_updateStatusRegs(boolToInt(sim_stopped),boolToInt(exception_detected));
		_setSystemTime(sys_time&0xffffffff);
		var start_scan_time_snapshot=getCurrTime();
		//console.log("PC="+_GET_VAL(15);
		cnt=1;
		while(ret==0)
		{
			if ((getCurrTime()-start_scan_time_snapshot)>1)
			{
				start_scan_time_snapshot=getCurrTime();
				
				//console.log("times: "+start_scan_time_snapshot+" "+getCurrTime());
				//console.log("PC="+_GET_VAL(15);
				_setNST_Preempt();
			}
			ret=_ARGEE_simExec();
			/*cnt++;
			if ((cnt%1000)==0)
			{
				_setNST_Preempt();
				//
				//yield* wait(1);
			}*/
		}
		if (ret==-3)
		{
			// breakpoint
			sim_stopped=true;
			_updateStatusRegs(boolToInt(sim_stopped),boolToInt(exception_detected));
			return;
		}
		else if (ret==-2)
		{
			// exception
			exception_detected=true;
			sim_stopped=true;
			_updateStatusRegs(boolToInt(sim_stopped),boolToInt(exception_detected));
			return;
		}
		else
		{
			sys_time+=5;
			_setSystemTime(sys_time&0xffffffff);
			yield* wait(5);
		}
	}
}


return {
	preprocessProjFile:preprocessProjFile,
	getSimGen:getSimGen,
	selectSimDevice:selectSimDevice,
	getSimMode:getSimMode,
	getSimAjaxObj:getSimAjaxObj,
	setSimStopped:setSimStopped,
	simExchTrig:simExchTrig,
	fillSimSlots:fillSimSlots,
	sim_InitDeviceStruct:sim_InitDeviceStruct,
	setup_slot_names:setup_slot_names,
	findConvSlotNum:findConvSlotNum,
	getSlotName:getSlotName,
	createEmptyARGEE_Proj:createEmptyARGEE_Proj,
	simDB_constructSliceObj:simDB_constructSliceObj,
	createImportedProj:createImportedProj,
}
}());

var SIM=ARGEE_sim;

/**** End of file ****/
