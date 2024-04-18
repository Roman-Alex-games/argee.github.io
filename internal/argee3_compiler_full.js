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
 *  DESCRIPTION: Common configuration variables for the ARGEE IDE
 *
 *******************************************************************************/

/*require('./argee_nst_parse.js');
ARGEE_nst_parse=PARSE;
require('./argee_nst_process.js');
ARGEE_nst_process=PROCESS;
require('./argee_obj_db.js');
require('./argee_nst_code_gen.js');
require('./util.js');
var delf=require('../common/pako_deflate.min.js');
var infl=require('../common/pako_inflate.min.js');
var pako=require('../common/pako.min.js');
*/

var debug_style="\r\n\t\t.css-treeview ul,\r\n\t\t.css-treeview li\r\n\t\t{\r\n\t\t\tpadding: 0;\r\n\t\t\tmargin: 0;\r\n\t\t\tlist-style: none;\r\n\t\t}\r\n\r\n\t\t.css-treeview input\r\n\t\t{\r\n\t\t\tposition: absolute;\r\n\t\t\topacity: 0;\r\n\t\t}\r\n\r\n\t\t.css-treeview\r\n\t\t{\r\n\t\t\tfont: normal;\r\n\t\t\t-moz-user-select: none;\r\n\t\t\t-webkit-user-select: none;\r\n\t\t\tuser-select: none;\r\n\t\t}\r\n\r\n\t\t.css-treeview a\r\n\t\t{\r\n\t\t\tcolor: #00f;\r\n\t\t\ttext-decoration: none;\r\n\t\t}\r\n\r\n\t\t.css-treeview a:hover\r\n\t\t{\r\n\t\t\ttext-decoration: underline;\r\n\t\t}\r\n\r\n\t\t.css-treeview input + label + ul\r\n\t\t{\r\n\t\t\tmargin: 0 0 0 22px;\r\n\t\t}\r\n\r\n\t\t.css-treeview input ~ ul\r\n\t\t{\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\r\n\t\t.css-treeview label,\r\n\t\t.css-treeview label::before\r\n\t\t{\r\n\t\t\tcursor: pointer;\r\n\t\t}\r\n\r\n\t\t.css-treeview input:disabled + label\r\n\t\t{\r\n\t\t\tcursor: default;\r\n\t\t\topacity: .6;\r\n\t\t}\r\n\r\n\t\t.css-treeview input:checked:not(:disabled) ~ ul\r\n\t\t{\r\n\t\t\tdisplay: block;\r\n\t\t}\r\n\r\n\t\t.css-treeview label,\r\n\t\t.css-treeview label::before\r\n\t\t{\r\n\t\t\tbackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAACgCAYAAAAFOewUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAApxJREFUeNrslM1u00AQgGdthyalFFOK+ClIIKQKyqUVQvTEE3DmAhLwAhU8QZoH4A2Q2gMSFace4MCtJ8SPBFwAkRuiHKpA6sRN/Lu7zG5i14kctaUqRGhGXnu9O/Pt7MzsMiklvF+9t2kWTDvyIrAsA0aKRRi1T0C/hJ4LUbt5/8rNpWVlp8RSr9J40b48fxFaTQ9+ft8EZ6MJYb0Ok+dnYGpmPgXwKIAvLx8vYXc5GdMAQJgQEkpjRTh36TS2U+DWW/D17WuYgm8pwJyY1npZsZKOxImOV1I/h4+O6vEg5GCZBpgmA6hX8wHKUHDRBXQYicQ4rlc3Tf0VMs8DHBS864F2YFspjgUYjKX/Az3gsdQd2eeBHwmdGWXHcgBGSkZXOXohcEXebRoQcAgjqediNY+AVyu3Z3sAKqfKoGMsewBeEIOPgQxxPJIjcGH6qtL/0AdADzKGnuuD+2tLK7Q8DhHHbOBW+KEzcHLuYc82MkEUekLiwuvVH+guQBQzOG4XdAb8EOcRcqQvDkY2iCLuxECJ43JobMXoutqGgDa2T7UqLKwt9KRyuxKVByqVXXqIoCCUCAqhUOioTWC7G4TQEOD0APy2/7G2Xpu1J4+lxeQ4TXBbITDpoVelRN/BVFbwu5oMMJUBhoXy5tmdRcMwymP2OLQaLjx9/vnBo6V3K6izATmSnMa0Dq7ferIohJhr1p01zrlz49rZF4OMs8JkX23vVQzYp+wbYGV/KpXKjvspl8tsIKCrMNAYFxj2GKS5ZWxg4ewKsJfaGMIY5KXqPz8LBBj6+yDvVP79+yDp/9F9oIx3OisHWwe7Oal0HxCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgwD8E/BZgAP0qhKj3rXO7AAAAAElFTkSuQmCC) no-repeat;\r\n\t\t}\r\n\r\n\t\t.css-treeview label,\r\n\t\t.css-treeview a,\r\n\t\t.css-treeview label::before\r\n\t\t{\r\n\t\t\tdisplay: inline-block;\r\n\t\t\theight: 16px;\r\n\t\t\tline-height: 16px;,\r\n\t\t\tvertical-align: middle;\r\n\t\t}\r\n\r\n\t\t.css-treeview label\r\n\t\t{\r\n\t\t\tbackground-position: 18px 0;\r\n\t\t}\r\n\r\n\t\t.css-treeview label::before\r\n\t\t{\r\n\t\t\tcontent: \"\";\r\n\t\t\twidth: 16px;\r\n\t\t\tmargin: 0 22px 0 0;\r\n\t\t\tvertical-align: middle;\r\n\t\t\tbackground-position: 0 -32px;\r\n\t\t}\r\n\r\n\t\t.css-treeview input:checked + label::before\r\n\t\t{\r\n\t\t\tbackground-position: 0 -16px;\r\n\t\t}\r\n\r\n\t\t/* webkit adjacent element selector bugfix */\r\n\t\t@media screen and (-webkit-min-device-pixel-ratio:0)\r\n\t\t{\r\n\t\t\t.css-treeview \r\n\t\t\t{\r\n\t\t\t\t-webkit-animation: webkit-adjacent-element-selector-bugfix infinite 1s;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t@-webkit-keyframes webkit-adjacent-element-selector-bugfix \r\n\t\t\t{\r\n\t\t\t\tfrom \r\n\t\t\t\t{ \r\n\t\t\t\t\tpadding: 0;\r\n\t\t\t\t} \r\n\t\t\t\tto \r\n\t\t\t\t{ \r\n\t\t\t\t\tpadding: 0;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n"


var ENV=
{
FLOWCHART:0,
ARGEE:1,
NST:2,
};

var prog_view=false;

var fs;
if (typeof window ==='undefined')
{
   var fs = require('fs');
   var zlib = require('zlib');
   var Path = require('path');
}
else
{
   fs=null;
}

var device_descr=
[
	{name:"TBEN-L5-16DXP",sw_rev:"V1.2.3.4",slice_list:[0x01550028,0x846D5500],order_num:6814008},	
	{name:"TBEN-L4-16DXP",sw_rev:"V1.2.3.4",slice_list:[0x01540028,0x846D5500],order_num:6814012},		
	{name:"TBEN-L5-8DIP-8DOP",sw_rev:"V1.2.3.4",slice_list:[0x01550028,0x655B4400],order_num:6814006},
	{name:"TBEN-L4-8DIP-8DOP",sw_rev:"V1.2.3.4",slice_list:[0x01540028,0x655B4400],order_num:6814010},
	{name:"TBEN-S1-4DIP-4DOP",sw_rev:"V1.2.3.4",slice_list:[0x1500029
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
	{name:"TBEN-S1-8DXP",sw_rev:"V1.2.3.4",slice_list:[0x1500029
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

	{name:"TBEN-L4-8IOL",sw_rev:"V1.2.3.4",slice_list:[22282280, 34611460, 4793090, 4793090, 4793090, 4793090, 4793090, 4793090, 4793090, 4793090, 3670016, 6553600, 8960, 524288],order_num:6814082},
	{name:"TBEN-L5-8IOL",sw_rev:"V1.2.3.4",slice_list:[0x01550028,34611460,
									 4793090,4793090,4793090,4793090,4793090,4793090,4793090,4793090,
									 3670016,6553600,8960,0x80000],order_num:6814017},
	{name:"TBEN-S2-4IOL",sw_rev:"V1.2.3.4",slice_list:[0x01500029,1057026,4793090,4793090,4793090,4793090,2359296,6553600,0x80000],order_num:6814024},
   
	{name:"TBEN-S2-2RFID-4DXP",sw_rev:"V1.2.3.4",slice_list:[0x01500029,4261011,8650880,135296,4261011,8650880,135296,6815744,
											524288,50855936,128,128,128,128,0x80000],order_num:6814029},

	{name:"FEN20-16DXP",sw_rev:"V1.2.3.4",slice_list:[0x01500027,0x81695500],order_num:6931089},
	{name:"FEN20-4DIP-4DXP",sw_rev:"V1.2.3.4",slice_list:[0x01500127,0x41564300],order_num:6931090},
];

function createDefaultParamInit(slot)
	{
		var i,j;
		var obj=new Uint8Array(1024);
		var dt=new DataView(obj.buffer);
		var len;
		var max_obj_len_in_bits=0;
		//for(i=0;i<slices[slot].sections.length;i++)
		{
			// Handle parameters
			i=sect_type.param;
			{
				for(j=0;j<slices[slot].sections[i].objects.length;j++)
				{
					var bit_offset=slices[slot].sections[i].objects[j].offset;
					var bit_len=slices[slot].sections[i].objects[j].length;
					var default_val=slices[slot].sections[i].objects[j].defaultValue;
					if (max_obj_len_in_bits<(bit_offset+bit_len))
					{
						max_obj_len_in_bits=bit_offset+bit_len;
					}
					SetArrValue(dt,bit_offset,bit_len,default_val);
				}
				GOM.setObjArr("ARGEE_IO_PARAM",slot,obj.buffer.slice(0,((max_obj_len_in_bits+7)/8)|0));
			}
		}
	}


var order_num;
var st;
var output_file;
var proj_name;
var compiled_ast;
var source_present=0;

var command_line_compiler=1; 

var document={};

function* inBrowserDebug()
{
   var submods;
   var i;
   SIM.sim_InitDeviceStruct();
   GOM.setDestinationURL("http://"+target_ip);
   // read out slice list
   yield* GOM.objectExchange("ARGEE_DEV_NAME",0,"READ",true);
   yield* GOM.objectExchange("SAPI_APP_VER_STRING",0,"READ",true);
   yield* GOM.objectExchange("ARGEE_COMP_VER",1,"READ",true); 
   yield* GOM.objectExchange("MULTPC_ORDER_NUM",0,"READ",true); 
   yield* GOM.objectExchange("ARGEE_GET_SUB_IDS_OBJ",0,"READ",true); 

   submods=GOM.getValDataView("ARGEE_GET_SUB_IDS_OBJ",0);
   var gw_order_num=GOM.getObjNum("MULTPC_ORDER_NUM",0);
   
   var num_mods=submods.getUint32(0,true);
   for(i=1;i<num_mods;i++)
   {
      yield* GOM.objectExchange("ARGEE_IO_PARAM",i,"READ",true);
   }
   var gom_objs=
   [
      ["ARGEE_DEV_NAME",0],
      ["SAPI_APP_VER_STRING",0],
      ["ARGEE_COMP_VER",1],
      ["MULTPC_ORDER_NUM",0],
      ["ARGEE_GET_SUB_IDS_OBJ",0],
   ];
   for(i=1;i<num_mods;i++)
   {
      gom_objs[gom_objs.length]=["ARGEE_IO_PARAM",i];
   }
   
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
      var slice_obj={};
      slice_obj=SIM.simDB_constructSliceObj(i,id_list[i],gw_order_num,GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0)));
      slices[slices.length]=slice_obj;
   }
   for(i=0;i<num_mods;i++)
   {
      IO_ids[i]=id_list[i];
   }
   
   SIM.setup_slot_names(GOM.getObjNum("MULTPC_ORDER_NUM",0));

   var proj_file=runARGEE_imp(unescape(source_code),gw_order_num);
   if (proj_file!=undefined)
   {
      DEB.prepareDebElems(compiled_ast);
      //var deb_gen=DEB.debugGenToString();
      GOM.finAjaxAction();
      DEB.debugStandalone();
   }
   
   
   // assume default password when using command line compiler/debugger.
   var jk=1;
}   

const deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


function* TestAJAX()
{
   try
   {
      var json_file=process.argv[2];
      var json=JSON.parse(fs.readFileSync(json_file));
      var submods;
	  var build_dir_name="build_and_debug";
      var i;

	  if (json.build_dir!=undefined)
	  {
		  build_dir_name=json.build_dir;
	  }
      if (!fs.existsSync(build_dir_name)) fs.mkdirSync(build_dir_name); 
      SIM.sim_InitDeviceStruct();

	  //deleteFolderRecursive("build_and_debug");


	  if ((json.ip==undefined)&&(json.selected_device!=undefined))
	  {
		{
			var found=false;
			// find device
			for(i=0;i<device_descr.length;i++)
			{
				if (device_descr[i].name==json.selected_device)
				{
					GOM.setObjArr("SAPI_APP_VER_STRING",0,GOM.convStringToArr(device_descr[i].sw_rev));

					GOM.setObjArr("ARGEE_DEV_NAME",0,GOM.convStringToArr(device_descr[i].name));
					GOM.setObjNum("ARGEE_COMP_VER",0,exp_ARGEE_Kernel_Version);
					GOM.setObjNum("MULTPC_ORDER_NUM",0,device_descr[i].order_num);
					var uint32Arr=new Uint32Array(device_descr[i].slice_list.length+1);
					var j;
					uint32Arr[0]=device_descr[i].slice_list.length;
					for(j=0;j<device_descr[i].slice_list.length;j++)
					{
						uint32Arr[j+1]=device_descr[i].slice_list[j];
					}
					GOM.setObjArr("ARGEE_GET_SUB_IDS_OBJ",0,uint32Arr.buffer);
					var jk1=1;
					found=true;
					break;
				}
			}
			if (found==false)
			{
			  console.error("can not find device  "+json.selected_device);
			  return;
			}
		}
	  }
	  else
	  {
            
		  GOM.setDestinationURL("http://"+json.ip);
		  
		  if (fs.existsSync("./"+build_dir_name+"/"+"iodb.json"))
		  {
			 var iodb_json=JSON.parse(fs.readFileSync("./"+build_dir_name+"/"+"iodb.json"));
			 var jk1=1;
			 GOM.convertJsonToGOM(iodb_json);
		  }
		  else
		  {
			 // read out slice list
			 yield* GOM.objectExchange("ARGEE_DEV_NAME",0,"READ",true);
			 yield* GOM.objectExchange("SAPI_APP_VER_STRING",0,"READ",true);
			 yield* GOM.objectExchange("ARGEE_COMP_VER",1,"READ",true); 
			 yield* GOM.objectExchange("MULTPC_ORDER_NUM",0,"READ",true); 
			 yield* GOM.objectExchange("ARGEE_GET_SUB_IDS_OBJ",0,"READ",true); 


			 

			 submods=GOM.getValDataView("ARGEE_GET_SUB_IDS_OBJ",0);
			 var gw_order_num=GOM.getObjNum("MULTPC_ORDER_NUM",0);
			 
			 var num_mods=submods.getUint32(0,true);
			 for(i=1;i<num_mods;i++)
			 {
				yield* GOM.objectExchange("ARGEE_IO_PARAM",i,"READ",true);
			 }
			 var gom_objs=
			 [
				["ARGEE_DEV_NAME",0],
				["SAPI_APP_VER_STRING",0],
				["ARGEE_COMP_VER",1],
				["MULTPC_ORDER_NUM",0],
				["ARGEE_GET_SUB_IDS_OBJ",0],
			 ];
			 for(i=1;i<num_mods;i++)
			 {
				gom_objs[gom_objs.length]=["ARGEE_IO_PARAM",i];
			 }
			 var js_obj=GOM.convertToJSObj(gom_objs);
			 var json_rep=JSON.stringify(js_obj,null,2);
			 fs.writeFileSync("./"+build_dir_name+"/"+"iodb.json",json_rep);
			 var jk1=1;
		  }
	  }
      
      
      
      
      submods=GOM.getValDataView("ARGEE_GET_SUB_IDS_OBJ",0);
      var num_mods=submods.getUint32(0,true);
      
	  GOM.setObjArr("ARGEE_PROJ_DEV_NAME",0,GOM.getObjArr("ARGEE_DEV_NAME",0));
	  GOM.setObjArr("ARGEE_PROJ_APP_VER_STRING",0,GOM.getObjArr("SAPI_APP_VER_STRING",0));
		 
	  
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
         var slice_obj={};
         slice_obj=SIM.simDB_constructSliceObj(i,id_list[i],gw_order_num,GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0)));
         slices[slices.length]=slice_obj;
	 	  if ((json.ip==undefined)&&(json.selected_device!=undefined))
		  {
			  // create default parameters
			  createDefaultParamInit(i);
			  
		  }

      }
	  
	  
	  
      for(i=0;i<num_mods;i++)
      {
         IO_ids[i]=id_list[i];
      }
	  
	  
      
      SIM.setup_slot_names(GOM.getObjNum("MULTPC_ORDER_NUM",0));
      
      
      
      
      
      
      
      
      proj_name=json.prj_name;
	  source_present=json.source_present;
      order_num=GOM.getObjNum("MULTPC_ORDER_NUM",0);
      output_file=proj_name+".arg";
      st="";

      var out_arr="";
      for(i=0;i<json.argee_source_files.length;i++)
      {
		 var file_name_split=json.argee_source_files[i].split("/");
		 // furst remove directories
		 if (file_name_split.length>0)
		 {
			file_name_split=file_name_split[file_name_split.length-1].split(".");
			file_name_split=file_name_split[0].split("_");
		 }
		 // check if this is not a TOKO library
		 var toko_lib=false;
		 
		 var j;
		 for(j=0;j<file_name_split.length;j++)
		 {
			if ((file_name_split[j]=="V1")&&((file_name_split.length-j)==5))
			{
				toko_lib=true;
			}
		 }
		 
		 var jk=1;
         try 
		 {
		  if (fs.existsSync(json.argee_source_files[i])) {
			//file exists
		  }
		  else
		  {
			  console.error("can not open file "+json.argee_source_files[i]);
			  return;
		  }
		 } 
		 catch(err) 
		 {
		  console.error("can not open file "+json.argee_source_files[i]);
		  return;
		 }
         st=fs.readFileSync(json.argee_source_files[i]);
		 if (toko_lib==false)
		 {
			 var curr_line=1;
			 out_arr+="{[\""+json.argee_source_files[i]+"\","+curr_line+"]}";
			 for(j=0;j<st.length;j++)
			 {
				out_arr+=String.fromCharCode(st[j]);
				if (st[j]==0xa)
				{
				   curr_line++;
				   out_arr+="{[\""+json.argee_source_files[i]+"\","+curr_line+"]}";
				}
			 }
		 }
		 else
		 {
			out_arr+=st;
		 }
         out_arr+="\n";
		 
      }
	  if (json.hmi_files!=undefined)
	  {
		 for(i=0;i<json.hmi_files.length;i++)
		 {
			try 
			 {
			  if (fs.existsSync(json.hmi_files[i])) {
				//file exists
			  }
			  else
			  {
				  console.error("can not open file "+json.hmi_files[i]);
				  return;
			  }
			 } 
			 catch(err) 
			 {
			  console.error("can not open file "+json.hmi_files[i]);
			  return;
			 }
            st=fs.readFileSync(json.hmi_files[i]); 
		    out_arr+=st;
		    out_arr+="\n";
		 }
	  }
         
      var proj_file=runARGEE_imp(out_arr,order_num);
      if (proj_file!=undefined)
      {
         fs.writeFileSync("./"+build_dir_name+"/"+output_file,new Uint8Array(proj_file));
		 fs.writeFileSync("./"+build_dir_name+"/before_preproc.st",new Uint8Array(GOM.convStringToArr(out_arr)));
		 fs.writeFileSync("./"+build_dir_name+"/after_preproc.st",new Uint8Array(GOM.convStringToArr(PARSE.getProprocessedInput())));
		 if (PARSE.getTestJsHTML()!=null)
		 {
		    fs.writeFileSync("./"+build_dir_name+"/js_test.html",new Uint8Array(GOM.convStringToArr(PARSE.getTestJsHTML())));
		 }
         
         
         var js_file=process.argv[1];
         var js_file_contents=fs.readFileSync(js_file,"utf8");
         var jk1=1;
         var source_code="var proj_name=\""+proj_name+"\"\n"+"var target_ip=\""+json.ip+"\";\nvar source_code=\""+escape(out_arr)+"\";";
         var js_file=source_code+"\n"+js_file_contents+"\n";
         fs.writeFileSync("./"+build_dir_name+"/"+"tmp2.js",js_file,"utf8");
         
         
         
         /*var res="<html><head><style>"+debug_style+"</style><script>"+source_code+"\n"+js_file_contents+"\n"+"</script></head>"+"<body onload=\"startProg()\"><div id=\"vars\"></div></body></html>";*/
         var res="<html><head><style>"+debug_style+"</style><script type=\"text/javascript\" src=\"tmp2.js\"></script></head>"+"<body onload=\"startProg()\"><div id=\"vars\"></div></body></html>";
		 if (json.ip!=undefined)
		 {
			 GOM.setObjArr("ARGEE_CHECK_PASSWORD",0,GOM.convStringToArr("password"));
			 yield* GOM.objectExchange("ARGEE_CHECK_PASSWORD",0,"WRITE",true);	
			 yield* GOM.objectExchange("ARGEE_CHECK_PASSWORD",0,"READ",true);
			 var val=new Uint8Array(GOM.getObjArr("ARGEE_CHECK_PASSWORD",0));
			 if (val[0]==0)
			 {
				console.log("Wrong Password!");
				process.exit(0);
			 }
			 yield* GOM.objectExchange(proj_file,0,"STORE_ARGEE_FILE",false);
		 }
		 else
		 {
			 console.log("Project not uploaded - stored offline");
		 }

         var io_map=genIOMap();
         fs.writeFileSync("./"+build_dir_name+"/"+"ip_map.html",io_map,"utf8"); 

         
         
         fs.writeFileSync("./"+build_dir_name+"/"+"debug.html",res,"utf8");
         console.log("Project file created successfully!");
      }
      GOM.finAjaxAction();
      process.exit(0);
   }
   catch(e)
   {
      console.log("improperly formated JSON project file");
   }
/*   
   */
	GOM.finAjaxAction();
}

 
function startProg()
{ 
   var i,j;
   /*console.log("test"); 
   for(i=0;i<process.argv.length;i++)
   {
      console.log("arg "+i+":"+process.argv[i]);
   }*/

   if (typeof window === 'undefined')
   {
      
   }
   else
   {
      GOM.addAjaxAction(inBrowserDebug);
      return;
   }
   
   GOM.addAjaxAction(TestAJAX);
   return;
}
 
var nst_inst_trace_buf=128; // bytes (has to be a power of 2)
var max_prog_traces=50;


var ARGEE_Environment_Version=0x03029605
var exp_ARGEE_Kernel_Version= 0x03070000; 
var ARGEE_default_interscan_delay=2; //ms
var debug_console=false;

/*var ARGEE_elem_descr=(function()
{ 
 var hmi_elems_var_mapping=
   [
      {name:"DISPLAY_VALUE",var_list:[1]},
      {name:"HMI_DISP_NUM",var_list:[1]},
      {name:"HMI_DISP_RANGE",var_list:[1]},
      {name:"HMI_ENTER_NUM",var_list:[1]},
      {name:"HMI_BUTTON",var_list:[1]},
      {name:"HMI_ENTER_STATE",var_list:[1]},
      {name:"ENTER_VALUE",var_list:[1]},
      {name:"BUTTON",var_list:[1]},
      {name:"MULTI_STATE_DISPLAY_STRING",var_list:[1]},
      {name:"MULTI_STATE_DISPLAY_GRAPHICS",var_list:[1]},
      {name:"DROPDOWN_LIST",var_list:[1]},
      {name:"DISPLAY_VALUE_WITH_HEALTH",var_list:[3,5]},
      {name:"LINK",var_list:[0,1,2]},
      {name:"LOAD_FROM_FILE",var_list:[1,2,3,4,5]},
      {name:"STORE_TO_FILE",var_list:[1,2,3,4]},
   ];

return {
	hmi_elems_var_mapping:hmi_elems_var_mapping,
}
}());


	
var DESCR=ARGEE_elem_descr; */
   
var prj_obj_list=
[
	["ARGEE_KERN_VER_VERIFY",0],
	["ARGEE_PROJ_DEV_EXPECTED_ENV_REV",0],
	["ARGEE_PROJ_DEV_ORDER_NUM",0],
	["ARGEE_PROJ_DEV_NAME",0],
	["ARGEE_PROJ_APP_VER_STRING",0],
	["MODULE_LIST_ARRAY",0],
    ["MBS_CONNECTION_TIMEOUT",0],
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
];

var standalone_hmi_text;   
   
function runARGEE_imp(st,order_num)
{
    hmi_present=false;
    GOM.setObjNum("ARGEE_COMP_VER",1,exp_ARGEE_Kernel_Version);
    GOM.setObjNum("ARGEE_KERN_VER_VERIFY",0,GOM.getObjNum("ARGEE_COMP_VER",1));
    GOM.setObjNum("ARGEE_PROJ_DEV_ORDER_NUM",0,order_num);
    GOM.setObjNum("MULTPC_ORDER_NUM",0,order_num);
	GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.ARGEE);
    GOM.setObjNum("ARGEE_BOOT_PROJ_ENABLED",0,1);
    GOM.setObjArr("ARGEE_PROJ_TITLE",0,GOM.convStringToArr(proj_name));
	
	if (source_present==1)
	{
		var arr1=zlib.gzipSync(st,{level:9});
		GOM.setObjArr("ARGEE_SOURCE_CODE",0,arr1.buffer);
	}
	
    standalone_hmi_text=objToString(standalone_hmi);
    standalone_hmi.initObj();


    if (findCodeSizeLimit(order_num)==0)
    {
      console.log("Device doesn't exist");
      return;
    }                

    GEN.setARM7_Mode(isArm7(order_num));
    
    if (st!=null)
    {
        var glob=ARGEE_nst_parse.parseProject(st,true);
        if (glob!=null)
        {
            var proc_ast=ARGEE_nst_process.process(glob);
            if ((proc_ast==null)||(proc_ast.empty_proj==true))
            {
                //console.log("Error: "+(e.err_msg) + " in the program on line: "+ (PARSE.getTokenStartLine()+1));
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
			var standalone_hmi_renderers_text=objToString(standalone_hmi_custom_renderers);

            
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
			
			
			
			css_str+=`@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
  			
            
            var html_output="<html><head><style>"+css_str+"</style><script> var standalone_hmi={"+standalone_hmi_text+"}; var standalone_hmi_custom_renderers={"+standalone_hmi_renderers_text+"};"+ 
            "var hmi_str='"+escape(JSON.stringify(hmi))+"';hmi_global=JSON.parse(unescape(hmi_str));"+
            "</script></head><body onload=\"standalone_hmi.initObj();standalone_hmi.setHMI_Elems(hmi_global);standalone_hmi.setURL(window.location.href);standalone_hmi.timer_func();\"><div id=\"grayout\"></div><div id=\"Overlay_pass\"><p id=\"DlgContent1\"></p></div><div id=\"prog\"></div></body></html>";
            if ((proc_ast.hmi.list.length>0)&&(typeof window === 'undefined'))
            {
                hmi_present=true;
                /*var zip = new JSZip();
                zip.file("hmi.html",html_output);
                var arr=zip.generate({type:"uint8array",compression:"DEFLATE",compressionOptions:{level:6}});*/
                //var pako=require('pako');
                var arr=zlib.gzipSync(html_output,{level:9});
                GOM.setObjArr("HMI_SOURCE_CODE",0,arr.buffer);
            }
			
            standalone_hmi.setHMI_Elems(hmi);

			
            if ((SIM==undefined)||(SIM.getSimMode()==false))
            {
                standalone_hmi.setURL("http://"+(target_ip));
            }
            
            //eval(hmi);
            if (ARGEE_nst_code_gen.generate(proc_ast)==true)
            {
				
				
               
               if ((GOM.getObjArr("ARGEE_RUN_CODE",0).byteLength)>=findCodeSizeLimit(GOM.getObjNum("MULTPC_ORDER_NUM",0)))
               {
                    setCompilerMessage(false,true,"Error: Code doesn't fit into allocated space: program requires "+(GOM.getObjArr("ARGEE_RUN_CODE",0).byteLength) + " bytes, availbale space: "+(findCodeSizeLimit(GOM.getObjNum("MULTPC_ORDER_NUM",0)))+" bytes");					
                    return;
               }
			   
			   
			   
               var prj_obj_list_curr=fastClone(prj_obj_list);	


				if (source_present==1)
				{
					prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_SOURCE_CODE",0];
				}		


               if (hmi_present==true)
               {
                  prj_obj_list_curr[prj_obj_list_curr.length]=["HMI_SOURCE_CODE",0];		
               }
               prj_obj_list_curr[prj_obj_list_curr.length]=["ARGEE_RUN_CODE",0];
               var prj_file=GOM.createProjFile(prj_obj_list_curr);
               if ((prj_file==null)||((prj_file.byteLength)>=(256*1024)))
               {
                  setCompilerMessage(false,true,"Error: Project file doesn't fit into allocated space of "+(256*1024)+" bytes");					
                  return;
               }
               compiled_ast=proc_ast;
               return prj_file;
            }
        }
    }
}





/*********************************************************************************************/
/***********************************    Code Limit Database *********************************/
/*********************************************************************************************/
var code_limit_database=
[
{order_num:100001449,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-LH-16DIP                   "},
{order_num:100002195,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-LH-8IOL                    "},
{order_num:6814009  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-16DIP                   "},
{order_num:6814010  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-8DIP-8DOP               "},
{order_num:6814011  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-16DOP                   "},
{order_num:6814012  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-16DXP                   "},
{order_num:6814017  ,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-L5-8IOL                    "},
{order_num:6814020  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S1-8DIP                    "},
{order_num:6814021  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S1-4DIP-4DOP               "},
{order_num:6814022  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S1-8DOP                    "},
{order_num:6814023  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S1-8DXP                    "},
{order_num:100006468,max_bin_size:(42*1024),  arm7:false,       name:"TBEN-S1-4DXP                    "},
{order_num:6814024  ,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-S2-4IOL                    "},
{order_num:100016672,max_bin_size:(32*1024),  arm7:false,       name:"ATLAS-SF-S2-4IOL                "},
{order_num:6814025  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S2-4AI                     "},
{order_num:6814028  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S2-4AO                     "},
{order_num:6814029  ,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-S2-2RFID-4DXP              "},
{order_num:6814031  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S2-2COM-4DXP               "},
{order_num:6814034  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S1-8DIP-D                  "},
{order_num:6814061  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-16DIN                   "},
{order_num:6814063  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-16DON                   "},
{order_num:6814064  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L4-16DXN                   "},
{order_num:6814073  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S2-8DIP                    "},
{order_num:6814076  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-S2-8DXP                    "},
{order_num:6814082  ,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-L4-8IOL                    "},
{order_num:6814085  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L5-16DIP                   "},
{order_num:6814086  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L5-8DIP-8DOP               "},
{order_num:6814087  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L5-16DOP                   "},
{order_num:6814088  ,max_bin_size:(42*1024),  arm7:false,    	name:"TBEN-L5-16DXP                   "},
{order_num:100000836,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-L5-4RFID-8DXP              "},
{order_num:100002462,max_bin_size:(32*1024),  arm7:false,    	name:"TBEN-L4-4RFID-8DXP              "},
{order_num:6814128  ,max_bin_size:(42*1024),  arm7:false,    	name:"FEN20-4DIN-4DXN-DIN             "},
{order_num:6814129  ,max_bin_size:(42*1024),  arm7:false,    	name:"FEN20-4DIN-4DXN                 "},
{order_num:6931090  ,max_bin_size:(42*1024),  arm7:false,    	name:"FEN20-4DIP-4DXP                 "},
{order_num:6931092  ,max_bin_size:(42*1024),  arm7:false,    	name:"FEN20-4DIP-4DXP-DIN             "},
{order_num:6814135  ,max_bin_size:(42*1024),  arm7:false,    	name:"FEN20-2AX-4DXP                  "},
{order_num:6814140  ,max_bin_size:(32*1024),  arm7:false,    	name:"FEN20-4IOL                      "},
{order_num:6811493  ,max_bin_size:(42*1024),  arm7:false,    	name:"BLCEN-8PBLT                     "},
{order_num:6931089  ,max_bin_size:(25*1024),  arm7:true,    	name:"FEN20-16DXP                     "},
{order_num:6811450  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-2M12MT-2RFID-S            "},
{order_num:6811451  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-4AI4AO-VI          "},
{order_num:6811452  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-8XSG-P             "},
{order_num:6811453  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12LT-2RFID-S-2RFID-S    "},
{order_num:6811454  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-2RFID-S-8XSG-P     "},
{order_num:6811455  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI4AO-VI-4AI4AO-VI"},
{order_num:6811456  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12LT-2AI-PT-2AI-PT      "},
{order_num:6811458  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI-VI-4AI-VI      "},
{order_num:6811459  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-16M8LT-8XSG-P-8XSG-P      "},
{order_num:6811460  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-1M12MT-1SSI               "},
{order_num:6811461  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-1M12MT-1RS232             "},
{order_num:6811462  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-1M12MT-1RS485-422         "},
{order_num:6811463  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-3M12LT-1RS232-2RFID-S     "},
{order_num:6811464  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-2M12MT-2AI-PT             "},
{order_num:6811465  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-2M12MT-2AI-TC             "},
{order_num:6811467  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-4AI-TC             "},
{order_num:6811468  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-4AI-VI             "},
{order_num:6811469  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI-VI-8XSG-P      "},
{order_num:6811470  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-8DO-0.5A-P         "},
{order_num:6811473  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-8DI-N-8DO-0.5A-N   "},
{order_num:6811478  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI-TC-4AI-TC      "},
{order_num:6811479  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-1M12MT-1CNT-ENC           "},
{order_num:6811480  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-5M12LT-1CNT-ENC-8DI-PD    "},
{order_num:6811481  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-2AO-I-8XSG-P       "},
{order_num:6811482  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-4AI-VI-2AO-I       "},
{order_num:6811483  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-16M8LT-8DI-P-8DI-P        "},
{order_num:6811484  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-2M12MT-2RFID-A            "},
{order_num:6811485  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12VMT-8XSG-PD           "},
{order_num:6811486  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12VMT-4AI-VI            "},
{order_num:6811487  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12VMH-4DO-2A-P          "},
{order_num:6811488  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-8XSG-P-8XSG-P      "},
{order_num:6811489  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12LT-2AO-I-2AO-I        "},
{order_num:6811490  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-8DI-N-8DI-N        "},
{order_num:6811491  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI4AO-VI-8XSG-P   "},
{order_num:6811492  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-4AI-VI-2AI-PT      "},
{order_num:6811494  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-2AI2AO-VI          "},
{order_num:6811497  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12VMT-8DI-P             "},
{order_num:6811499  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-4IOL               "},
{order_num:6811500  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4IOL-4IOL          "},
{order_num:6811501  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-4IOL-2RFID-S       "},
{order_num:6811502  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4IOL-8XSG-P        "},
{order_num:6811503  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4IOL-4AI-VI        "},
{order_num:6811504  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4IOL-4AI4AO-VI     "},
{order_num:6811506  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-8DI-P-8DI-P        "},
{order_num:6811507  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI-VI-8DI-P       "},
{order_num:6811508  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-2RFID-S-8DO-0.5A-N "},
{order_num:6811509  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-5M12LT-1RS232-8XSG-P      "},
{order_num:6811512  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-8DI-P              "},
{order_num:6811513  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-8DI-PD-8DI-PD      "},
{order_num:6811514  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AO-V-8XSG-P       "},
{order_num:6811515  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-6M12LT-2AI-PT-8XSG-P      "},
{order_num:6811637  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4IOL-4IOL/CS30125  "},
{order_num:6811638  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI4AO-VI-4AI-VI   "},
{order_num:6811639  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-8M12LT-4AI-TC-4AI-VI      "},
{order_num:6811640  ,max_bin_size:(25*1024),  arm7:true,    	name:"BLCEN-4M12MT-4AO-V              "},
{order_num:7000086  ,max_bin_size:(1024*1024),arm7:true,   	    name:"TBEN-ARGEE-SIM                  "},
];


function findCodeSizeLimit(order_num)
{
    var i;
    for(i=0;i<code_limit_database.length;i++)
    {
        if (code_limit_database[i].order_num==order_num)
        {
            return code_limit_database[i].max_bin_size;
        }
    }
    return 0;
}

function isArm7(order_num)
{
   var i;
   for(i=0;i<code_limit_database.length;i++)
   {
        if (code_limit_database[i].order_num==order_num)
        {
            return code_limit_database[i].arm7;
        }
   }
   return 0;
}


// rempa sect_type based on IO database
var sect_type=
{
   param:3,
   diag:2,
   input:0,
   output:1,
};

var sect_names=["Input","Output","Diagnostics","Parameters"];

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


function genIOMap()
{
   
   var i,j,k,l;
   var page="";
   //var sect_colors=["Aqua","#FFEEAC","#0FF8DC","#F29136"];
   //var sect_names=["Input","Output","Diagnostics","Parameters"];
   var sect_colors=["Aqua","#FFEEAC","#dd92dd","#F29136"];
   page="<html><head><title> IO Description </title><style>  body { font-size: 75%; }</style></head><body >"
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
   page+="</body></html>"
   return page;
}
	
var modules_BLCEN=
[{
	mod_name:"1RS232",
	mod_id:0x1479900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:9,
		datapoints:
		[
		{
			name:"Data rate",
			category:"RS232",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:12,
			defaultValue:6,
			enumValues:
				[
				1,
				"300 bps",
				2,
				"600 bps",
				3,
				"1200 bps",
				4,
				"2400 bps",
				5,
				"4800 bps",
				6,
				"9600 bps",
				7,
				"14.4 kbps",
				8,
				"19.2 kbps",
				9,
				"28.8 kbps",
				10,
				"38.4 kbps",
				11,
				"57.6 kbps",
				12,
				"115.2 kbps",
				],
		},
		{
			name:"Extended status/control mode",
			category:"RS232",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"RS232",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Stop bits",
			category:"RS232",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"1 bit",
				1,
				"2 bit",
				],
		},
		{
			name:"XON character",
			category:"RS232",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:17,
			enumValues:
				[
				],
		},
		{
			name:"XOFF character",
			category:"RS232",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:19,
			enumValues:
				[
				],
		},
		{
			name:"Parity bit",
			category:"RS232",
			chan_unit:"",
			bitOffset:9,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:1,
			enumValues:
				[
				0,
				"none",
				1,
				"odd",
				2,
				"even",
				],
		},
		{
			name:"Data bits",
			category:"RS232",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"7 bit",
				1,
				"8 bit",
				],
		},
		{
			name:"Data flow control",
			category:"RS232",
			chan_unit:"",
			bitOffset:12,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"none",
				1,
				"XON/XOFF",
				2,
				"RTS/CTS",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Parameterization error",
			category:"RS232",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"RS232",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data flow control error",
			category:"RS232",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Frame error",
			category:"RS232",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer overflow",
			category:"RS232",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:8,
		datapoints:
		[
		{
			name:"Status byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In1 / Diagnostic byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In2",
			category:"RS232",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In3",
			category:"RS232",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In4",
			category:"RS232",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In5",
			category:"RS232",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In6",
			category:"RS232",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In7",
			category:"RS232",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:8,
		datapoints:
		[
		{
			name:"Control byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out1 /ext. control byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out2",
			category:"RS232",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out3",
			category:"RS232",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out4",
			category:"RS232",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out5",
			category:"RS232",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out6",
			category:"RS232",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out7",
			category:"RS232",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"1RS485/422",
	mod_id:0x2479900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:10,
		datapoints:
		[
		{
			name:"Data rate",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:12,
			defaultValue:6,
			enumValues:
				[
				1,
				"300 bps",
				2,
				"600 bps",
				3,
				"1200 bps",
				4,
				"2400 bps",
				5,
				"4800 bps",
				6,
				"9600 bps",
				7,
				"14.4 kbps",
				8,
				"19.2 kbps",
				9,
				"28.8 kbps",
				10,
				"38.4 kbps",
				11,
				"57.6 kbps",
				12,
				"115.2 kbps",
				],
		},
		{
			name:"Extended status/control mode",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Stop bits",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"1 bit",
				1,
				"2 bit",
				],
		},
		{
			name:"XON character",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:17,
			enumValues:
				[
				],
		},
		{
			name:"XOFF character",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:19,
			enumValues:
				[
				],
		},
		{
			name:"Parity bit",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:9,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:1,
			enumValues:
				[
				0,
				"none",
				1,
				"odd",
				2,
				"even",
				],
		},
		{
			name:"Data bits",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"7 bit",
				1,
				"8 bit",
				],
		},
		{
			name:"Data flow control",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"none",
				1,
				"XON/XOFF",
				],
		},
		{
			name:"RS422/RS485",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"RS422",
				1,
				"RS485",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Parameterization error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data flow control error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Frame error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer overflow",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:8,
		datapoints:
		[
		{
			name:"Status byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In1 / Diagnostic byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In2",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In3",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In4",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In5",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In6",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"In7",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:8,
		datapoints:
		[
		{
			name:"Control byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out1 /ext. control byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out2",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out3",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out4",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out5",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out6",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Out7",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"1SSI",
	mod_id:0x4479900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Sensor idle data signal test",
			category:"SSI",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"yes",
				1,
				"no",
				],
		},
		{
			name:"Invalid bits (LSB)",
			category:"SSI",
			chan_unit:"",
			bitOffset:8,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:16,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				8,
				"8",
				9,
				"9",
				10,
				"10",
				11,
				"11",
				12,
				"12",
				13,
				"13",
				14,
				"14",
				15,
				"15",
				],
		},
		{
			name:"Invalid bits (MSB)",
			category:"SSI",
			chan_unit:"",
			bitOffset:12,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:8,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				],
		},
		{
			name:"Data rate",
			category:"SSI",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:8,
			defaultValue:1,
			enumValues:
				[
				0,
				"1000 kbps",
				1,
				"500.0 kbps",
				2,
				"250.0 kbps",
				3,
				"125.0 kbps",
				4,
				"100.0 kbps",
				5,
				"83.0 kbps",
				6,
				"71.0 kbps",
				7,
				"62.5 kbps",
				],
		},
		{
			name:"Data frame bits",
			category:"SSI",
			chan_unit:"",
			bitOffset:24,
			bitLen:6,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:32,
			defaultValue:25,
			enumValues:
				[
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				8,
				"8",
				9,
				"9",
				10,
				"10",
				11,
				"11",
				12,
				"12",
				13,
				"13",
				14,
				"14",
				15,
				"15",
				16,
				"16",
				17,
				"17",
				18,
				"18",
				19,
				"19",
				20,
				"20",
				21,
				"21",
				22,
				"22",
				23,
				"23",
				24,
				"24",
				25,
				"25",
				26,
				"26",
				27,
				"27",
				28,
				"28",
				29,
				"29",
				30,
				"30",
				31,
				"31",
				32,
				"32",
				],
		},
		{
			name:"Data format",
			category:"SSI",
			chan_unit:"",
			bitOffset:31,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"binary coded",
				1,
				"GRAY coded",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"SSI group diagnostics",
			category:"SSI",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"SSI",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overflow",
			category:"SSI",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Underflow",
			category:"SSI",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration error",
			category:"SSI",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:5,
	},
	{
		sect_name:"Input",
		num_elems:24,
		datapoints:
		[
		{
			name:"ERR_SSI",
			category:"SSI",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_OFLW",
			category:"SSI",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_UFLW",
			category:"SSI",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"ERR_PARA",
			category:"SSI",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_STOP",
			category:"SSI",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"FLAG_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"REL_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"FLAG_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"REL_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_DN",
			category:"SSI",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"STS_UP",
			category:"SSI",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"SSI_DIAG1",
			category:"SSI",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"SSI_DIAG2",
			category:"SSI",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"SSI_DIAG3",
			category:"SSI",
			chan_unit:"",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"SSI_DIAG4",
			category:"SSI",
			chan_unit:"",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"REG_WR_AKN",
			category:"SSI",
			chan_unit:"",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"REG_WR_ACEPT",
			category:"SSI",
			chan_unit:"",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"REG_RD status byte",
			category:"SSI",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_RD_DATA 0",
			category:"SSI",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_RD_DATA 1",
			category:"SSI",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_RD_DATA 2",
			category:"SSI",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_RD_DATA 3",
			category:"SSI",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:11,
		datapoints:
		[
		{
			name:"STOP",
			category:"SSI",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"EN_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"CLR_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"EN_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"CLR_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"REG_WR control byte",
			category:"SSI",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_RD control byte",
			category:"SSI",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_WR_DATA 0",
			category:"SSI",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_WR_DATA 1",
			category:"SSI",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_WR_DATA 2",
			category:"SSI",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_WR_DATA 3",
			category:"SSI",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"4DI4DO-PD",
	mod_id:0x1563300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:20,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"4DI-PD",
	mod_id:0x1563000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate wire break monit. gr.",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:18,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:10,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"8DI-PD",
	mod_id:0x1564000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate wire break monit. gr.",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:20,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"8XSG-PD",
	mod_id:0x1574400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"2RFID-A",
	mod_id:0x1797700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:3,
			defaultValue:1,
			enumValues:
				[
				1,
				"normal access",
				2,
				"fast access",
				3,
				"multi-tag (anticollision)",
				],
		},
		{
			name:"UHF frequency band",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"band 1",
				1,
				"band 2",
				2,
				"band 3",
				3,
				"band 4",
				],
		},
		{
			name:"UHF transmission power level",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:8,
			defaultValue:0,
			enumValues:
				[
				0,
				"level 1",
				1,
				"level 2",
				2,
				"level 3",
				3,
				"level 4",
				4,
				"level 5",
				5,
				"level 6",
				6,
				"level 7",
				7,
				"application specific",
				],
		},
		{
			name:"Tag type",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:7,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:21,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic detection",
				1,
				"1:Philips I-CODE SLI SL2",
				2,
				"2:Fujitsu MB89R118",
				3,
				"3:TI Tag-it HF-I Plus",
				4,
				"4:Infineon SRF55V02P",
				5,
				"5:Philips I-CODE SLI S",
				6,
				"6:Fujitsu MB89R119",
				7,
				"7:TI Tag-it HF-I",
				8,
				"8:Infineon SRF55V10P",
				9,
				"9:Turck TW-R50-K8",
				10,
				"10:Melexis MLX90129",
				11,
				"11:NXP I-CODE SLI L",
				12,
				"12:Fujitsu MB89R112",
				13,
				"13:EM4233SLIC",
				14,
				"14:reserved",
				15,
				"15:reserved",
				16,
				"16:reserved",
				17,
				"17:reserved",
				18,
				"18:reserved",
				19,
				"19:reserved",
				20,
				"20:reserved",
				],
		},
		{
			name:"Bypass time",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Parameter set",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:1,
			defaultValue:1,
			enumValues:
				[
				1,
				"extended",
				],
		},
		],
	max_size:72,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transc. param. not supported",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module parameter invalid",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware failure transceiver",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transc. power supply error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:43,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2RFID-C",
	mod_id:0x179DD00,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Ident current overload",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transceiver hardware error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transc. power supply error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:27,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2RFID-S",
	mod_id:0x2179CC00,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:7,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				1,
				"normal access",
				2,
				"fast access",
				],
		},
		{
			name:"UHF frequency band",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"band 1",
				1,
				"band 2",
				2,
				"band 3",
				3,
				"band 4",
				],
		},
		{
			name:"UHF transmission power level",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:8,
			defaultValue:0,
			enumValues:
				[
				0,
				"level 1",
				1,
				"level 2",
				2,
				"level 3",
				3,
				"level 4",
				4,
				"level 5",
				5,
				"level 6",
				6,
				"level 7",
				7,
				"application specific",
				],
		},
		{
			name:"Tag type",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:7,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:21,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic detection",
				1,
				"1:Philips I-CODE SLI SL2",
				2,
				"2:Fujitsu MB89R118",
				3,
				"3:TI Tag-it HF-I Plus",
				4,
				"4:Infineon SRF55V02P",
				5,
				"5:Philips I-CODE SLI S",
				6,
				"6:Fujitsu MB89R119",
				7,
				"7:TI Tag-it HF-I",
				8,
				"8:Infineon SRF55V10P",
				9,
				"9:Turck TW-R50-K8",
				10,
				"10:Melexis MLX90129",
				11,
				"11:NXP I-CODE SLI L",
				12,
				"12:Fujitsu MB89R112",
				13,
				"13:EM4233SLIC",
				14,
				"14:reserved",
				15,
				"15:reserved",
				16,
				"16:reserved",
				17,
				"17:reserved",
				18,
				"18:reserved",
				19,
				"19:reserved",
				20,
				"20:reserved",
				],
		},
		{
			name:"Bypass time",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Data alignment",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:39,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"byte 1-2 / 13-14",
				1,
				"byte 2-3 / 14-15",
				],
		},
		{
			name:"Parameter set",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:1,
			defaultValue:1,
			enumValues:
				[
				1,
				"extended",
				],
		},
		],
	max_size:72,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transc. param. not supported",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module parameter invalid",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware failure transceiver",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transc. power supply error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:43,
	},
	{
		sect_name:"Input",
		num_elems:17,
		datapoints:
		[
		{
			name:"XCVR_DETUNED",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"transceiver range tuned",
				1,
				"transceiver range restricted",
				],
		},
		{
			name:"TFR",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"tag not fully read",
				1,
				"tag fully read",
				],
		},
		{
			name:"TP",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no target present",
				1,
				"target present",
				],
		},
		{
			name:"XCVR_ON",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"transceiver turned off",
				1,
				"transceiver turned on",
				],
		},
		{
			name:"XCVR_CON",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no transceiver connected",
				1,
				"transceiver connected",
				],
		},
		{
			name:"Error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no error, error code is not up to date",
				1,
				"error occurred within last command, see error code",
				],
		},
		{
			name:"Busy",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"last command finished",
				1,
				"command processing",
				],
		},
		{
			name:"Done",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"command processing or command flag not reset",
				1,
				"last command finished, system waits for new command",
				],
		},
		{
			name:"Error code",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 2",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 3",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 4",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:64,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 5",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 6",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:80,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read data 7",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:88,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:280,
	},
	{
		sect_name:"Output",
		num_elems:19,
		datapoints:
		[
		{
			name:"Reset",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no reset",
				1,
				"reset",
				],
		},
		{
			name:"XCVR Info",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"command off",
				1,
				"initiate command: read transceiver info",
				],
		},
		{
			name:"TAG Info",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"command off",
				1,
				"initiate command: read tag info",
				],
		},
		{
			name:"Write",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"command off",
				1,
				"initiate command: write data",
				],
		},
		{
			name:"Read",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"command off",
				1,
				"initiate command: read data",
				],
		},
		{
			name:"TAG ID",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"command off",
				1,
				"initiate command: read UID of tag",
				],
		},
		{
			name:"Next",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"next mode inactive",
				1,
				"next mode active",
				],
		},
		{
			name:"XCVR",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"turn off transceiver",
				1,
				"turn on transceiver",
				],
		},
		{
			name:"Byte count",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:3,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:8,
			defaultValue:0,
			enumValues:
				[
				0,
				"read / write 1 byte",
				1,
				"read / write 2 byte",
				2,
				"read / write 3 byte",
				3,
				"read / write 4 byte",
				4,
				"read / write 5 byte",
				5,
				"read / write 6 byte",
				6,
				"read / write 7 byte",
				7,
				"read / write 8 byte",
				],
		},
		{
			name:"Domain",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:2,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				],
		},
		{
			name:"Address",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 2",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 3",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 4",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:64,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 5",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 6",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:80,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write data 7",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:88,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:280,
	},
	]
},
{
	mod_name:"8XSG-P",
	mod_id:0x2574400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"1CNT/ENC",
	mod_id:0x19BA900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:17,
		datapoints:
		[
		{
			name:"Invert input A",
			category:"Counter",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert input B",
			category:"Counter",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert input Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Count direction",
			category:"Counter",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"up",
				1,
				"down",
				],
		},
		{
			name:"Signal evaluation (A,B)",
			category:"Counter",
			chan_unit:"",
			bitOffset:2,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"1 x: rising edge at A",
				1,
				"1 x: falling edge at A",
				2,
				"2 x: both edges at A",
				3,
				"4 x: both edges at A and B",
				],
		},
		{
			name:"Input filter (A,B)",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"500 kHz",
				1,
				"50 kHz",
				2,
				"5 kHz",
				],
		},
		{
			name:"Encoder signal",
			category:"Counter",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"push-pull-input",
				1,
				"RS422-input",
				],
		},
		{
			name:"Synchronization with Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"single",
				1,
				"periodical",
				],
		},
		{
			name:"Function DO3",
			category:"Counter",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"output",
				1,
				"encoder power supply",
				],
		},
		{
			name:"Function DI3",
			category:"Counter",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"input",
				1,
				"encoder GND",
				],
		},
		{
			name:"PullUp Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Measurement mode",
			category:"Counter",
			chan_unit:"",
			bitOffset:29,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"frequency measurement",
				1,
				"period duration measurement",
				],
		},
		{
			name:"Count mode",
			category:"Counter",
			chan_unit:"",
			bitOffset:28,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"encoder",
				1,
				"pulse and direction",
				],
		},
		{
			name:"Invert Gate",
			category:"Counter",
			chan_unit:"",
			bitOffset:27,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Gate function",
			category:"Counter",
			chan_unit:"",
			bitOffset:24,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:7,
			defaultValue:6,
			enumValues:
				[
				0,
				"counter permanently inactive",
				1,
				"DI 0 is HW gate",
				2,
				"DI 1 is HW gate",
				3,
				"DI 2 is HW gate",
				4,
				"DI 3 is HW gate",
				5,
				"Z is Gate",
				6,
				"SW gate",
				],
		},
		{
			name:"Threshold input A, B, Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:16,
			defaultValue:11,
			enumValues:
				[
				0,
				"1 V",
				1,
				"1.5 V",
				2,
				"2 V",
				3,
				"2.5 V",
				4,
				"3 V",
				5,
				"4 V",
				6,
				"5 V",
				7,
				"6 V",
				8,
				"7 V",
				9,
				"8 V",
				10,
				"9 V",
				11,
				"10 V",
				12,
				"12 V",
				13,
				"14 V",
				14,
				"16 V",
				15,
				"18 V",
				],
		},
		{
			name:"REG_AUX_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:112,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:48,
			enumValues:
				[
				],
		},
		],
	max_size:119,
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Overflow occurred",
			category:"Counter",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Underflow occurred",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Faulty/inconsistent param.",
			category:"Counter",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload DO 0",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload DO 1",
			category:"Counter",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload DO 2",
			category:"Counter",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload DO 3",
			category:"Counter",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:19,
		datapoints:
		[
		{
			name:"Digital In 0",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Digital In 1",
			category:"Counter",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Digital In 2",
			category:"Counter",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Digital In 3",
			category:"Counter",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Input Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Input B",
			category:"Counter",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Input A",
			category:"Counter",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Count direction",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"down",
				1,
				"up",
				],
		},
		{
			name:"SYNC_AKN",
			category:"Counter",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"encoder not synchronized",
				1,
				"encoder synchronized",
				],
		},
		{
			name:"ERR_PARA",
			category:"Counter",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"parameter data valid",
				1,
				"inconsistent parameter data",
				],
		},
		{
			name:"STS_UFLW",
			category:"Counter",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no underflow",
				1,
				"underflow occurred",
				],
		},
		{
			name:"STS_OFLW",
			category:"Counter",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no overflow",
				1,
				"overflow occurred",
				],
		},
		{
			name:"STS_ZC",
			category:"Counter",
			chan_unit:"",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no zero crossing",
				1,
				"zero crossing occurred",
				],
		},
		{
			name:"REG_WR_AKN",
			category:"Counter",
			chan_unit:"",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no change in register bank",
				1,
				"register bank updated",
				],
		},
		{
			name:"REG_WR_ACEPT",
			category:"Counter",
			chan_unit:"",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"REG_WR_ADR error",
				1,
				"REG_WR_ADR valid",
				],
		},
		{
			name:"REG_ACT_RD_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:24,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_RD_ABORT",
			category:"Counter",
			chan_unit:"",
			bitOffset:31,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"REG_RD_ADR valid",
				1,
				"REG_RD_ADR error",
				],
		},
		{
			name:"REG_RD_DATA",
			category:"Counter",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"AUX_RD_DATA",
			category:"Counter",
			chan_unit:"",
			bitOffset:64,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:96,
	},
	{
		sect_name:"Output",
		num_elems:11,
		datapoints:
		[
		{
			name:"Gate",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"counter inactive",
				1,
				"counter active",
				],
		},
		{
			name:"Digital Out 0",
			category:"Counter",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Digital Out 1",
			category:"Counter",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Digital Out 2",
			category:"Counter",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Digital Out 3",
			category:"Counter",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"RES_STS",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"inactive",
				1,
				"clear STS_OFLW and STS_UFLW",
				],
		},
		{
			name:"SYNC_REQ",
			category:"Counter",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no synchronization",
				1,
				"syncronization request",
				],
		},
		{
			name:"REG_WR_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:16,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_WR",
			category:"Counter",
			chan_unit:"",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"initial state",
				1,
				"write register",
				],
		},
		{
			name:"REG_RD_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:24,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"REG_WR_DATA",
			category:"Counter",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"4AI4AO-V/I",
	mod_id:0x419B9900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:13,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage -10...10 V standard",
				1,
				"voltage 0...10 V standard",
				2,
				"voltage -10...10 V NE43",
				3,
				"voltage 0...10 V NE43",
				4,
				"voltage -10...10 V extended range",
				5,
				"voltage 0...10 V extended range",
				8,
				"current 0...20 mA standard",
				9,
				"current 4...20 mA standard",
				10,
				"current 0...20 mA NE43",
				11,
				"current 4...20 mA NE43",
				12,
				"current 0...20 mA extended range",
				13,
				"current 4...20 mA extended range",
				15,
				"deactivate",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:7,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage -10...10 V standard",
				1,
				"voltage 0...10 V standard",
				2,
				"voltage -10...10 V NE43",
				3,
				"voltage 0...10 V NE43",
				4,
				"voltage -10...10 V extended range",
				5,
				"voltage 0...10 V extended range",
				15,
				"deactivate",
				],
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"substitute value",
				1,
				"keep current value",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:144,
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break (4-20 mA only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output value out of range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:79,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"4AO-V",
	mod_id:0x427A0900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:5,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:7,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage -10...10 V standard",
				1,
				"voltage 0...10 V standard",
				2,
				"voltage -10...10 V NE43",
				3,
				"voltage 0...10 V NE43",
				4,
				"voltage -10...10 V extended range",
				5,
				"voltage 0...10 V extended range",
				15,
				"deactivate",
				],
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:2,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"substitute value",
				1,
				"keep current value",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Output value out of range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:39,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"2AI2AO-V/I",
	mod_id:0x21797700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:13,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage -10...10 V standard",
				1,
				"voltage 0...10 V standard",
				2,
				"voltage -10...10 V NE43",
				3,
				"voltage 0...10 V NE43",
				4,
				"voltage -10...10 V extended range",
				5,
				"voltage 0...10 V extended range",
				8,
				"current 0...20 mA standard",
				9,
				"current 4...20 mA standard",
				10,
				"current 0...20 mA NE43",
				11,
				"current 4...20 mA NE43",
				12,
				"current 0...20 mA extended range",
				13,
				"current 4...20 mA extended range",
				15,
				"deactivate",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:7,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage -10...10 V standard",
				1,
				"voltage 0...10 V standard",
				2,
				"voltage -10...10 V NE43",
				3,
				"voltage 0...10 V NE43",
				4,
				"voltage -10...10 V extended range",
				5,
				"voltage 0...10 V extended range",
				15,
				"deactivate",
				],
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"substitute value",
				1,
				"keep current value",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:80,
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break (4-20 mA only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output value out of range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:47,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	]
},
{
	mod_name:"4AI-TC",
	mod_id:0x42779000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Thermocouple type",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:4,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:16,
			defaultValue:0,
			enumValues:
				[
				0,
				"type K -270...1370 C",
				1,
				"type B +100...1820 C",
				2,
				"type E -270...1000 C",
				3,
				"type J -210...1200 C",
				4,
				"type N -270...1300 C",
				5,
				"type R -50...1760 C",
				6,
				"type S -50...1540 C",
				7,
				"type T -270...400 C",
				8,
				"+/-50 mV",
				9,
				"+/-100 mV",
				10,
				"+/-500 mV",
				11,
				"+/-1000 mV",
				12,
				"type K -454...2498 F",
				13,
				"type J -346...2192 F",
				14,
				"type C 0...2320 C",
				15,
				"type G 0...2320 C",
				],
		},
		],
	max_size:36,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Thermocouple wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Cold junction compensation wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common mode voltage out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:39,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2RS485-A",
	mod_id:0x217A9700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:11,
		datapoints:
		[
		{
			name:"Data rate",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:8,
			defaultValue:6,
			enumValues:
				[
				5,
				"4800 bps",
				6,
				"9600 bps",
				7,
				"14.4 kbps",
				8,
				"19.2 kbps",
				9,
				"28.8 kbps",
				10,
				"38.4 kbps",
				11,
				"57.6 kbps",
				12,
				"115.2 kbps",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Timeout",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:8,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Stop bits",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"1 bit",
				1,
				"2 bit",
				],
		},
		{
			name:"Parity bit",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:2,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:3,
			defaultValue:1,
			enumValues:
				[
				0,
				"none",
				1,
				"odd",
				2,
				"even",
				],
		},
		{
			name:"Substitute char parity error",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Transmit buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:2,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:3,
			defaultValue:1,
			enumValues:
				[
				0,
				"process data controlled",
				1,
				"wait for complete frame",
				2,
				"send directly",
				],
		},
		{
			name:"Error frame buffering",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:2,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:3,
			defaultValue:2,
			enumValues:
				[
				0,
				"complete frame",
				1,
				"only header",
				2,
				"&lt;Null&gt;",
				],
		},
		{
			name:"Start string",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:4,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivate",
				1,
				"&lt;:&gt;",
				],
		},
		{
			name:"Stop string",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:4,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivate",
				1,
				"&lt;EOT&gt;",
				2,
				"&lt;Null&gt;",
				3,
				"&lt;CrLf&gt;",
				4,
				"&lt;Cr&gt;",
				5,
				"&lt;Lf&gt;",
				],
		},
		{
			name:"Frame lenght",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:16,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:128,
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parity error",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Timeout",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Tx buffer overflow",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Rx buffer overflow",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Invalid parameter",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:39,
	},
	{
		sect_name:"Input",
		num_elems:15,
		datapoints:
		[
		{
			name:"Timeout detected",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Def. no. of rec characters reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Stop string received",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"New diag. message available",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Flush Rx buffer acknowledge",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Flush Tx buffer acknowledge",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Channel reset acknowledge",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Acyclic parameter set activ.",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Busy",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Upper Tx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Lower Tx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Upper Rx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Lower Rx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Tx buffer empty",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Rx buffer empty",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		],
	max_size:79,
	},
	{
		sect_name:"Output",
		num_elems:5,
		datapoints:
		[
		{
			name:"Resend last frame",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Send Tx buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Flush Rx buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Flush Tx buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		{
			name:"Channel reset",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				],
		},
		],
	max_size:39,
	},
	]
},
{
	mod_name:"4DI-N",
	mod_id:0x42003000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"8DI-N",
	mod_id:0x62004000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"4DO-2A-N",
	mod_id:0x44300300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"4AI-V/I",
	mod_id:0x41779000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Measurement range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...10 V/0...20 mA",
				1,
				"-10...10 V/4...20 mA",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage",
				1,
				"current",
				],
		},
		{
			name:"Data representation",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"NE43",
				2,
				"extended range",
				],
		},
		],
	max_size:37,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Over-/underflow",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:34,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"1CVI",
	mod_id:0x18B9900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Guarding time [n*0.1s]",
			category:"Global",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:3,
			enumValues:
				[
				],
		},
		{
			name:"Life time factor",
			category:"Global",
			chan_unit:"",
			bitOffset:72,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:3,
			enumValues:
				[
				],
		},
		{
			name:"Data rate",
			category:"Global",
			chan_unit:"",
			bitOffset:80,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:8,
			defaultValue:4,
			enumValues:
				[
				0,
				"1000 kbps",
				1,
				"reserved",
				2,
				"500.0 kbps",
				3,
				"250.0 kbps",
				4,
				"125.0 kbps",
				5,
				"50.0 kbps",
				6,
				"20.0 kbps",
				7,
				"10.0 kbps",
				],
		},
		{
			name:"Activate terminating resistor",
			category:"Global",
			chan_unit:"",
			bitOffset:83,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate node",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate guarding",
			category:"Node",
			chan_unit:"node",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input data size",
			category:"Node",
			chan_unit:"node",
			bitOffset:2,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:8,
			defaultValue:0,
			enumValues:
				[
				0,
				"0 bit",
				1,
				"4 bit",
				2,
				"8 bit",
				3,
				"12 bit",
				4,
				"16 bit",
				5,
				"24 bit",
				6,
				"32 bit",
				7,
				"reserved",
				],
		},
		{
			name:"Output data size",
			category:"Node",
			chan_unit:"node",
			bitOffset:5,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:8,
			defaultValue:0,
			enumValues:
				[
				0,
				"0 bit",
				1,
				"4 bit",
				2,
				"8 bit",
				3,
				"12 bit",
				4,
				"16 bit",
				5,
				"24 bit",
				6,
				"32 bit",
				7,
				"reserved",
				],
		},
		],
	max_size:84,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Emergencies transmitted since module start",
			category:"Global",
			chan_unit:"",
			bitOffset:32,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Node address not within permissible range (1-8)",
			category:"Global",
			chan_unit:"",
			bitOffset:33,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VC",
			category:"Global",
			chan_unit:"",
			bitOffset:34,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VE",
			category:"Global",
			chan_unit:"",
			bitOffset:35,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Emergencies transmitted since module start",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Transmitted emergencies",
			category:"Node",
			chan_unit:"node",
			bitOffset:1,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Communication error transmitted since module start/Guard Time timeout",
			category:"Node",
			chan_unit:"node",
			bitOffset:2,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Communication error/Guard Time timeout",
			category:"Node",
			chan_unit:"node",
			bitOffset:3,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:36,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"In byte",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Out byte",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	]
},
{
	mod_name:"8DO-R-NO",
	mod_id:0x62000400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"8DO-0.5A-N",
	mod_id:0x62400400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"2AI-V",
	mod_id:0x23557000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Measurement range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...10 V",
				1,
				"-10...+10 V",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:19,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"4DO-4A-P",
	mod_id:0x45300300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"4DI-P",
	mod_id:0x41003000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2AI-I",
	mod_id:0x22557000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Measurement range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...20 mA",
				1,
				"4...20 mA",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:19,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:17,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2AI-PT",
	mod_id:0x21577000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Mains suppression",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"50 Hz",
				1,
				"60 Hz",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"RTD type",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:4,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:16,
			defaultValue:0,
			enumValues:
				[
				0,
				"PT100, -200...850 C",
				1,
				"PT100, -200...150 C",
				2,
				"NI100, -60...250 C",
				3,
				"NI100, -60...150 C",
				4,
				"PT200, -200...850 C",
				5,
				"PT200, -200...150 C",
				6,
				"PT500, -200...850 C",
				7,
				"PT500, -200...150 C",
				8,
				"PT1000, -200...850 C",
				9,
				"PT1000, -200...150 C",
				10,
				"NI1000, -60...250 C",
				11,
				"NI1000, -60...150 C",
				12,
				"resistance, 0...100 Ohm",
				13,
				"resistance, 0...200 Ohm",
				14,
				"resistance, 0...400 Ohm",
				15,
				"resistance, 0...1000 Ohm",
				],
		},
		{
			name:"Measurement mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"2-wire",
				1,
				"3-wire",
				],
		},
		],
	max_size:40,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:18,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2AI-TC",
	mod_id:0x21557000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:5,
		datapoints:
		[
		{
			name:"Mains suppression",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"50 Hz",
				1,
				"60 Hz",
				],
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Thermocouple type",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:4,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:12,
			defaultValue:0,
			enumValues:
				[
				0,
				"type K, -270...1370 C",
				1,
				"type B, +100...1820 C",
				2,
				"type E, -270...1000 C",
				3,
				"type J, -210...1200 C",
				4,
				"type N, -270...1300 C",
				5,
				"type R, -50...1760 C",
				6,
				"type S, -50...1540 C",
				7,
				"type T, -270...400 C",
				8,
				"+/-50 mV",
				9,
				"+/-100 mV",
				10,
				"+/-500 mV",
				11,
				"+/-1000 mV",
				],
		},
		],
	max_size:20,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Cold junct. comp. wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:18,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"2AO-I",
	mod_id:0x22080700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Output range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...20 mA",
				1,
				"4...20 mA",
				],
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Data representation",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:2,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"NE43",
				2,
				"extended range",
				],
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:2,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"substitute value",
				1,
				"keep current value",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:56,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	]
},
{
	mod_name:"2AO-V",
	mod_id:0x21080700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Output range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...10 V",
				1,
				"-10...+10 V",
				],
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"15 bit + sign",
				1,
				"12 bit (left-justified)",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:56,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:32,
	},
	]
},
{
	mod_name:"4DO-2A-P",
	mod_id:0x43300300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"8DO-0.5A-P",
	mod_id:0x61400400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"8DI-P",
	mod_id:0x61004000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"4DO-0.5A-P",
	mod_id:0x41300300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"4IOL",
	mod_id:0x409BBB00,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:5,
			defaultValue:0,
			enumValues:
				[
				0,
				"IO-Link without validation",
				2,
				"IO-Link with compatible device",
				3,
				"IO-Link with identical device",
				4,
				"DI (with parameter access)",
				8,
				"DI",
				],
		},
		{
			name:"Data storage mode",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:4,
			defaultValue:3,
			enumValues:
				[
				0,
				"activated",
				1,
				"overwrite",
				2,
				"read in",
				3,
				"deactivated, clear",
				],
		},
		{
			name:"Cycle time",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:104,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				8,
				"0.8 ms",
				16,
				"1.6 ms",
				24,
				"2.4 ms",
				32,
				"3.2 ms",
				40,
				"4.0 ms",
				48,
				"4.8 ms",
				56,
				"5.6 ms",
				64,
				"6.4 ms",
				66,
				"7.2 ms",
				68,
				"8.0 ms",
				70,
				"8.8 ms",
				72,
				"9.6 ms",
				74,
				"10.4 ms",
				76,
				"11.2 ms",
				78,
				"12.0 ms",
				80,
				"12.8 ms",
				82,
				"13.6 ms",
				84,
				"14.4 ms",
				86,
				"15.2 ms",
				88,
				"16.0 ms",
				90,
				"16.8 ms",
				92,
				"17.6 ms",
				94,
				"18.4 ms",
				96,
				"19.2 ms",
				98,
				"20.0 ms",
				100,
				"20.8 ms",
				102,
				"21.6 ms",
				104,
				"22.4 ms",
				106,
				"23.2 ms",
				108,
				"24.0 ms",
				110,
				"24.8 ms",
				112,
				"25.6 ms",
				114,
				"26.4 ms",
				116,
				"27.2 ms",
				118,
				"28.0 ms",
				120,
				"28.8 ms",
				122,
				"29.6 ms",
				124,
				"30.4 ms",
				126,
				"31.2 ms",
				128,
				"32.0 ms",
				129,
				"33.6 ms",
				130,
				"35.2 ms",
				131,
				"36.8 ms",
				132,
				"38.4 ms",
				133,
				"40.0 ms",
				134,
				"41.6 ms",
				135,
				"43.2 ms",
				136,
				"44.8 ms",
				137,
				"46.4 ms",
				138,
				"48.0 ms",
				139,
				"49.6 ms",
				140,
				"51.2 ms",
				141,
				"52.8 ms",
				142,
				"54.4 ms",
				143,
				"56.0 ms",
				144,
				"57.6 ms",
				145,
				"59.2 ms",
				146,
				"60.8 ms",
				147,
				"62.4 ms",
				148,
				"64.0 ms",
				149,
				"65.6 ms",
				150,
				"67.2 ms",
				151,
				"68.8 ms",
				152,
				"70.4 ms",
				153,
				"72.0 ms",
				154,
				"73.6 ms",
				155,
				"75.2 ms",
				156,
				"76.8 ms",
				157,
				"78.4 ms",
				158,
				"80.0 ms",
				159,
				"81.6 ms",
				160,
				"83.2 ms",
				161,
				"84.8 ms",
				162,
				"86.4 ms",
				163,
				"88.0 ms",
				164,
				"89.6 ms",
				165,
				"91.2 ms",
				166,
				"92.8 ms",
				167,
				"94.4 ms",
				168,
				"96.0 ms",
				169,
				"97.6 ms",
				170,
				"99.2 ms",
				171,
				"100.8 ms",
				172,
				"102.4 ms",
				173,
				"104.0 ms",
				174,
				"105.6 ms",
				175,
				"107.2 ms",
				176,
				"108.8 ms",
				177,
				"110.4 ms",
				178,
				"112.0 ms",
				179,
				"113.6 ms",
				180,
				"115.2 ms",
				181,
				"116.8 ms",
				182,
				"118.4 ms",
				183,
				"120.0 ms",
				184,
				"121.6 ms",
				185,
				"123.2 ms",
				186,
				"124.8 ms",
				187,
				"126.4 ms",
				188,
				"128.0 ms",
				189,
				"129.6 ms",
				190,
				"131.2 ms",
				191,
				"132.8 ms",
				],
		},
		{
			name:"Revision",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"V1.0",
				],
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"diagnostic generated",
				1,
				"no diagnostic generated",
				],
		},
		{
			name:"Deactivate diagnostics Ch0",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"no",
				1,
				"notifications",
				2,
				"notifications and warnings",
				3,
				"yes",
				],
		},
		{
			name:"Input data mapping",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap",
				],
		},
		{
			name:"Input data length",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:9,
			defaultValue:2,
			enumValues:
				[
				0,
				"0 byte",
				1,
				"1 byte",
				2,
				"2 byte",
				3,
				"4 byte",
				4,
				"6 byte",
				5,
				"8 byte",
				6,
				"10 byte",
				7,
				"12 byte",
				15,
				"14 byte",
				],
		},
		{
			name:"Output data mapping",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap",
				],
		},
		{
			name:"Output data length",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:9,
			defaultValue:2,
			enumValues:
				[
				0,
				"0 byte",
				1,
				"1 byte",
				2,
				"2 byte",
				3,
				"4 byte",
				4,
				"6 byte",
				5,
				"8 byte",
				6,
				"10 byte",
				7,
				"12 byte",
				15,
				"14 byte",
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:156,
	},
	{
		sect_name:"Diag",
		num_elems:16,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent XSG channel",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:79,
	},
	{
		sect_name:"Input",
		num_elems:11,
		datapoints:
		[
		{
			name:"Input data word 0",
			category:"Global",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 1",
			category:"Global",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 2",
			category:"Global",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 3",
			category:"Global",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 4",
			category:"Global",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 5",
			category:"Global",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 6",
			category:"Global",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Digital input",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input value valid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"XSG input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Overcurrent XSG",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:128,
	},
	{
		sect_name:"Output",
		num_elems:8,
		datapoints:
		[
		{
			name:"Output data word 0",
			category:"Global",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 1",
			category:"Global",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 2",
			category:"Global",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 3",
			category:"Global",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 4",
			category:"Global",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 5",
			category:"Global",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 6",
			category:"Global",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"XSG output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:128,
	},
	]
},
];
var modules_BLCEN_8PBLT=
[{
	mod_name:"8PBLT Basic",
	mod_id:0x82080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Input mode",
			category:"Button",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"toggle mode",
				1,
				"momentary",
				],
		},
		{
			name:"Indication",
			category:"LED",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"input value",
				1,
				"output value",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"input value",
			category:"Button",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"output value",
			category:"LED",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_FEN20=
[{
	mod_name:"16-DXP",
	mod_id:0x81695500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent on sensor group",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"16DIP",
	mod_id:0x814C5000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch9/10",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"4DIP-DXP",
	mod_id:0x41564300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:20,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent on sensor group",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"4DIN-DXN",
	mod_id:0x42564300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:20,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent on sensor group",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
];
var modules_FEN20_4IOL=
[{
	mod_name:"Basic",
	mod_id:0x4082082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 Ch0",
			category:"IOL",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch1",
			category:"IOL",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch2",
			category:"IOL",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch3",
			category:"IOL",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0x2240000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:20,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 Ch0",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch1",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch2",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch3",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:25,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:26,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:27,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:29,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:30,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:31,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:95,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Events",
	mod_id:0x640000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Port",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Qualifier",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:0,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Event code",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:528,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Port",
	mod_id:0x3492302,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:7,
			defaultValue:0,
			enumValues:
				[
				0,
				"IO-Link without validation",
				1,
				"IO-Link with family compatible device",
				2,
				"IO-Link with compatible device",
				3,
				"IO-Link with identical device",
				4,
				"DI (with parameter access)",
				8,
				"DI",
				9,
				"DX",
				],
		},
		{
			name:"Data storage mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:3,
			enumValues:
				[
				0,
				"activated",
				1,
				"overwrite",
				2,
				"read in",
				3,
				"deactivated, clear",
				],
		},
		{
			name:"Cycle time",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:91,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				16,
				"1.6 ms",
				24,
				"2.4 ms",
				32,
				"3.2 ms",
				40,
				"4.0 ms",
				48,
				"4.8 ms",
				56,
				"5.6 ms",
				64,
				"6.4 ms",
				66,
				"7.2 ms",
				68,
				"8.0 ms",
				70,
				"8.8 ms",
				72,
				"9.6 ms",
				74,
				"10.4 ms",
				76,
				"11.2 ms",
				78,
				"12.0 ms",
				80,
				"12.8 ms",
				84,
				"14.4 ms",
				88,
				"16.0 ms",
				92,
				"17.6 ms",
				96,
				"19.2 ms",
				100,
				"20.8 ms",
				104,
				"22.4 ms",
				108,
				"24.0 ms",
				112,
				"25.6 ms",
				116,
				"27.2 ms",
				120,
				"28.8 ms",
				124,
				"30.4 ms",
				128,
				"32.0 ms",
				129,
				"33.6 ms",
				130,
				"35.2 ms",
				131,
				"36.8 ms",
				132,
				"38.4 ms",
				133,
				"40.0 ms",
				134,
				"41.6 ms",
				135,
				"43.2 ms",
				136,
				"44.8 ms",
				137,
				"46.4 ms",
				138,
				"48.0 ms",
				139,
				"49.6 ms",
				140,
				"51.2 ms",
				141,
				"52.8 ms",
				142,
				"54.4 ms",
				143,
				"56.0 ms",
				144,
				"57.6 ms",
				145,
				"59.2 ms",
				146,
				"60.8 ms",
				147,
				"62.4 ms",
				148,
				"64.0 ms",
				149,
				"65.6 ms",
				150,
				"67.2 ms",
				151,
				"68.8 ms",
				152,
				"70.4 ms",
				153,
				"72.0 ms",
				154,
				"73.6 ms",
				155,
				"75.2 ms",
				156,
				"76.8 ms",
				157,
				"78.4 ms",
				158,
				"80.0 ms",
				159,
				"81.6 ms",
				160,
				"83.2 ms",
				161,
				"84.8 ms",
				162,
				"86.4 ms",
				163,
				"88.0 ms",
				164,
				"89.6 ms",
				165,
				"91.2 ms",
				166,
				"92.8 ms",
				167,
				"94.4 ms",
				168,
				"96.0 ms",
				169,
				"97.6 ms",
				170,
				"99.2 ms",
				171,
				"100.8 ms",
				172,
				"102.4 ms",
				173,
				"104.0 ms",
				174,
				"105.6 ms",
				175,
				"107.2 ms",
				176,
				"108.8 ms",
				177,
				"110.4 ms",
				178,
				"112.0 ms",
				179,
				"113.6 ms",
				180,
				"115.2 ms",
				181,
				"116.8 ms",
				182,
				"118.4 ms",
				183,
				"120.0 ms",
				184,
				"121.6 ms",
				185,
				"123.2 ms",
				186,
				"124.8 ms",
				187,
				"126.4 ms",
				188,
				"128.0 ms",
				189,
				"129.6 ms",
				190,
				"131.2 ms",
				191,
				"132.8 ms",
				],
		},
		{
			name:"Revision",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"V1.0",
				],
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Device parametrization via GSD",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"inactive",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"diagnostic generated",
				1,
				"no diagnostic generated",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:18,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"no",
				1,
				"notifications",
				2,
				"notifications and warnings",
				3,
				"yes",
				],
		},
		{
			name:"Input data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:20,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap all",
				],
		},
		{
			name:"Output data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:22,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap all",
				],
		},
		{
			name:"Vendor ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Device ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:112,
	},
	{
		sect_name:"Diag",
		num_elems:15,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Input data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Output",
		num_elems:16,
		datapoints:
		[
		{
			name:"Output data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x13080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"ARGEE program active",
			category:"Module state",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x4002100,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin3 (Ch0)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin5 (Ch1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin7 (Ch2)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin9 (Ch3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:26,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin3 (Ch0)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin5 (Ch1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin7 (Ch2)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin9 (Ch3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
];
var modules_TBEN_L=
[{
	mod_name:"16DIN",
	mod_id:0x824C5000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"16DON",
	mod_id:0x82670500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"16DXN",
	mod_id:0x826D5500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:200,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"8DIN-8DON",
	mod_id:0x625B4400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"16DIP",
	mod_id:0x844C5000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"16DOP",
	mod_id:0x85670500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"16DXP",
	mod_id:0x846D5500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:200,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"8DIP-8DOP",
	mod_id:0x655B4400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
];
var modules_TBEN_L_01=
[{
	mod_name:"8DIP-8DOP-01",
	mod_id:0x665B4400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"16DOP-01",
	mod_id:0x86670500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"8DIP-8DOP-01",
	mod_id:0x635B4428,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:9,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:9,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:9,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"16DOP-01",
	mod_id:0x83670528,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
];
var modules_TBEN_L1_dig=
[{
	mod_name:"16DIP",
	mod_id:0x814C5000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch1/2",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch3/4",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch5/6",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch7/8",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch9/10",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch11/12",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch13/14",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch15/16",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"16DOP",
	mod_id:0x81670500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch1/2",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch3/4",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch5/6",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch7/8",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch9/10",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch11/12",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch13/14",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch15/16",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"16DXP",
	mod_id:0x816D5500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:200,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch1/2",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch3/4",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch5/6",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch7/8",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch9/10",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch11/12",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch13/14",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch15/16",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"8DIP-8DOP",
	mod_id:0x615B4400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:9,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch1/2",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch3/4",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch5/6",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch7/8",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch9/10",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch11/12",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch13/14",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch15/16",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:9,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:9,
			channelNumEnd:16,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
];
var modules_TBEN_Lx_8IOL=
[{
	mod_name:"Basic",
	mod_id:0x2102104,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Diag",
		num_elems:4,
		datapoints:
		[
		{
			name:"Output overcurrent",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:20,
		datapoints:
		[
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:26,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:30,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:31,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0x380000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:136,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C4 (Ch8)",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 C4 (Ch9)",
			category:"Global",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C5 (Ch10)",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 C5 (Ch11)",
			category:"Global",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C6 (Ch12)",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 C6 (Ch13)",
			category:"Global",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C7 (Ch14)",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 C7 (Ch15)",
			category:"Global",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:34,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:98,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:50,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:114,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:66,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:130,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:82,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:146,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:35,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:99,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:51,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:115,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:67,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:131,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:83,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:147,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:101,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:53,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:117,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:69,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:133,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:85,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:149,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:100,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:52,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:116,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:68,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:132,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:84,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:148,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:102,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:54,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:118,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:70,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:134,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:86,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:150,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:103,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:55,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:119,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:71,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:135,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:87,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:151,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:104,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:120,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:136,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:88,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:152,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:41,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:105,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:57,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:121,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:73,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:137,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:89,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:153,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:42,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:106,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:58,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:122,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:74,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:138,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:90,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:154,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:43,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:107,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:59,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:123,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:75,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:139,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:91,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:155,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:44,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:108,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:60,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:124,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:76,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:140,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:92,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:156,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:45,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:109,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:61,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:125,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:77,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:141,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:93,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:157,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:46,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:110,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:62,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:126,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:78,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:142,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:94,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:158,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:47,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:111,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:63,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:127,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:79,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:143,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:95,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:159,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:33,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:97,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:49,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:113,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:65,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:129,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:81,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:145,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:160,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Events",
	mod_id:0x640000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Port",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Qualifier",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:0,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Event code",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:528,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Port",
	mod_id:0x492302,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"IO-Link without validation",
				1,
				"IO-Link with family compatible device",
				2,
				"IO-Link with compatible device",
				3,
				"IO-Link with identical device",
				4,
				"DI (with parameter access)",
				8,
				"DI",
				],
		},
		{
			name:"Data storage mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:3,
			enumValues:
				[
				0,
				"activated",
				1,
				"overwrite",
				2,
				"read in",
				3,
				"deactivated, clear",
				],
		},
		{
			name:"Cycle time",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:84,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				16,
				"1.6 ms",
				32,
				"3.2 ms",
				48,
				"4.8 ms",
				64,
				"6.4 ms",
				68,
				"8.0 ms",
				72,
				"9.6 ms",
				76,
				"11.2 ms",
				80,
				"12.8 ms",
				84,
				"14.4 ms",
				88,
				"16.0 ms",
				92,
				"17.6 ms",
				96,
				"19.2 ms",
				100,
				"20.8 ms",
				104,
				"22.4 ms",
				108,
				"24.0 ms",
				112,
				"25.6 ms",
				116,
				"27.2 ms",
				120,
				"28.8 ms",
				124,
				"30.4 ms",
				128,
				"32.0 ms",
				129,
				"33.6 ms",
				130,
				"35.2 ms",
				131,
				"36.8 ms",
				132,
				"38.4 ms",
				133,
				"40.0 ms",
				134,
				"41.6 ms",
				135,
				"43.2 ms",
				136,
				"44.8 ms",
				137,
				"46.4 ms",
				138,
				"48.0 ms",
				139,
				"49.6 ms",
				140,
				"51.2 ms",
				141,
				"52.8 ms",
				142,
				"54.4 ms",
				143,
				"56.0 ms",
				144,
				"57.6 ms",
				145,
				"59.2 ms",
				146,
				"60.8 ms",
				147,
				"62.4 ms",
				148,
				"64.0 ms",
				149,
				"65.6 ms",
				150,
				"67.2 ms",
				151,
				"68.8 ms",
				152,
				"70.4 ms",
				153,
				"72.0 ms",
				154,
				"73.6 ms",
				155,
				"75.2 ms",
				156,
				"76.8 ms",
				157,
				"78.4 ms",
				158,
				"80.0 ms",
				159,
				"81.6 ms",
				160,
				"83.2 ms",
				161,
				"84.8 ms",
				162,
				"86.4 ms",
				163,
				"88.0 ms",
				164,
				"89.6 ms",
				165,
				"91.2 ms",
				166,
				"92.8 ms",
				167,
				"94.4 ms",
				168,
				"96.0 ms",
				169,
				"97.6 ms",
				170,
				"99.2 ms",
				171,
				"100.8 ms",
				172,
				"102.4 ms",
				173,
				"104.0 ms",
				174,
				"105.6 ms",
				175,
				"107.2 ms",
				176,
				"108.8 ms",
				177,
				"110.4 ms",
				178,
				"112.0 ms",
				179,
				"113.6 ms",
				180,
				"115.2 ms",
				181,
				"116.8 ms",
				182,
				"118.4 ms",
				183,
				"120.0 ms",
				184,
				"121.6 ms",
				185,
				"123.2 ms",
				186,
				"124.8 ms",
				187,
				"126.4 ms",
				188,
				"128.0 ms",
				189,
				"129.6 ms",
				190,
				"131.2 ms",
				191,
				"132.8 ms",
				],
		},
		{
			name:"Revision",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"V1.0",
				],
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Device parametrization via GSD",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"inactive",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"diagnostic generated",
				1,
				"no diagnostic generated",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:18,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"no",
				1,
				"notifications",
				2,
				"notifications and warnings",
				3,
				"yes",
				],
		},
		{
			name:"Input data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:20,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap",
				],
		},
		{
			name:"Output data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:22,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap",
				],
		},
		{
			name:"Vendor ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Device ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:112,
	},
	{
		sect_name:"Diag",
		num_elems:15,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Input data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Output",
		num_elems:16,
		datapoints:
		[
		{
			name:"Output data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x2300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C4 (Ch8)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:32,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 C4 (Ch9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:96,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C5 (Ch10)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:40,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 C5 (Ch11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:104,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C6 (Ch12)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:48,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 C6 (Ch13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:112,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C7 (Ch14)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:56,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 C7 (Ch15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:120,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:122,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:12,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C4 (Ch8)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 C4 (Ch9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C5 (Ch10)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 C5 (Ch11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C6 (Ch12)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 C6 (Ch13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C7 (Ch14)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 C7 (Ch15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
];
var modules_TBEN_S1=
[{
	mod_name:"Basic",
	mod_id:0x40533300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x9080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Input Latch Ch0-3",
	mod_id:0x1082000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch input",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch reset",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x202082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				4,
				"counter",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Counter value",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Counter frequency (Hz)",
			category:"Input values",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Status",
			category:"Input values",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:56,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Counter reset",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"not active",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x2000080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x2082102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"PWM Output",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				2,
				"PWM out",
				],
		},
		],
	max_size:7,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Diagnostics",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Duty cycle %",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x60204000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:2,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x6080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:2,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Input Latch Ch0-7",
	mod_id:0x2082000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch input",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch reset",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x60540400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x8080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x60554400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0xA080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4-7",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x1082102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				2,
				"PWM out",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Diagnostics",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Duty cycle %",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x60404000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x7080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x6082082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch2-3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x17080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch2-3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_S2_2COM=
[{
	mod_name:"COM",
	mod_id:0x186282,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:14,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"COM",
			chan_unit:"",
			bitOffset:0,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"RS485",
				1,
				"RS232",
				2,
				"MB-Client 485",
				3,
				"MB-Client 232",
				],
		},
		{
			name:"Swap A/B Line",
			category:"COM",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Data rate",
			category:"COM",
			chan_unit:"",
			bitOffset:4,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:10,
			defaultValue:6,
			enumValues:
				[
				4,
				"2400 Bit/s",
				5,
				"4800 Bit/s",
				6,
				"9600 Bit/s",
				7,
				"14.4 kBit/s",
				8,
				"19.2 kBit/s",
				9,
				"28.8 kBit/s",
				10,
				"38.4 kBit/s",
				11,
				"57.6 kBit/s",
				12,
				"115.2 kBit/s",
				13,
				"230.4 kBit/s",
				],
		},
		{
			name:"Character format",
			category:"COM",
			chan_unit:"",
			bitOffset:8,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:2,
			enumValues:
				[
				0,
				"7O",
				1,
				"7E",
				2,
				"8N",
				3,
				"8O",
				4,
				"8E",
				],
		},
		{
			name:"Stop bits",
			category:"COM",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"1 bit",
				1,
				"2 bit",
				],
		},
		{
			name:"EOF detection",
			category:"COM",
			chan_unit:"",
			bitOffset:12,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"character timeout",
				1,
				"1 end delimiter",
				2,
				"2 end delimiter",
				3,
				"framelength",
				],
		},
		{
			name:"Termination active",
			category:"COM",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"yes",
				1,
				"no",
				],
		},
		{
			name:"Biasing active",
			category:"COM",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"yes",
				1,
				"no",
				],
		},
		{
			name:"Power supply VAUX1",
			category:"COM",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"0V(High-Z)",
				1,
				"V1(24VDC)",
				2,
				"+5VDC",
				],
		},
		{
			name:"Character timeout",
			category:"COM",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:100,
			enumValues:
				[
				],
		},
		{
			name:"Response timeout",
			category:"COM",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:2000,
			enumValues:
				[
				],
		},
		{
			name:"1st end delimiter",
			category:"COM",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:3,
			enumValues:
				[
				],
		},
		{
			name:"2nd end delimiter",
			category:"COM",
			chan_unit:"",
			bitOffset:72,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"MB-Server cycle time (*1ms)",
			category:"COM",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:96,
	},
	{
		sect_name:"Diag",
		num_elems:11,
		datapoints:
		[
		{
			name:"Hardware error",
			category:"COM",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"COM",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"COM",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 0",
			category:"COM",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 1",
			category:"COM",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 2",
			category:"COM",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 3",
			category:"COM",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 4",
			category:"COM",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 5",
			category:"COM",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 6",
			category:"COM",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 7",
			category:"COM",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:10,
		datapoints:
		[
		{
			name:"Transmitter ready",
			category:"COM",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Receive complete",
			category:"COM",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Frame error",
			category:"COM",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"parity/format error",
			category:"COM",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Buffer overflow",
			category:"COM",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Timeout",
			category:"COM",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Invalid TX length",
			category:"COM",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Invalid RX length",
			category:"COM",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"received frame length",
			category:"COM",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"MB-Server cycle time (*1ms)",
			category:"COM",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:48,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"transmit",
			category:"COM",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"receive",
			category:"COM",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"transmitter frame length",
			category:"COM",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"receiver frame length",
			category:"COM",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:40,
	},
	]
},
{
	mod_name:"RS Data/SCB",
	mod_id:0x410200,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:7,
		datapoints:
		[
		{
			name:"Server address",
			category:"SCB",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:1,
			enumValues:
				[
				],
		},
		{
			name:"Number reg. read access",
			category:"SCB",
			chan_unit:"",
			bitOffset:8,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:13,
			defaultValue:1,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				8,
				"8",
				9,
				"9",
				10,
				"10",
				11,
				"11",
				12,
				"12",
				],
		},
		{
			name:"Number reg. write access",
			category:"SCB",
			chan_unit:"",
			bitOffset:12,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:13,
			defaultValue:1,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				8,
				"8",
				9,
				"9",
				10,
				"10",
				11,
				"11",
				12,
				"12",
				],
		},
		{
			name:"Read access",
			category:"SCB",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				3,
				"read holding registers (FC 3)",
				4,
				"read input register (FC 4)",
				23,
				"read/write multiple registers (FC 23)",
				],
		},
		{
			name:"Write access",
			category:"SCB",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				6,
				"write single register (FC 6)",
				16,
				"write multiple registers (FC 16)",
				23,
				"read/write multiple registers (FC 23)",
				],
		},
		{
			name:"Start address for read access",
			category:"SCB",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Start address for write access",
			category:"SCB",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:64,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:12,
		datapoints:
		[
		{
			name:"Input register 0",
			category:"SCB",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 1",
			category:"SCB",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 2",
			category:"SCB",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 3",
			category:"SCB",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 4",
			category:"SCB",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 5",
			category:"SCB",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 6",
			category:"SCB",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 7",
			category:"SCB",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 8",
			category:"SCB",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 9",
			category:"SCB",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 10",
			category:"SCB",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input register 11",
			category:"SCB",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:192,
	},
	{
		sect_name:"Output",
		num_elems:12,
		datapoints:
		[
		{
			name:"Output register 0",
			category:"SCB",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 1",
			category:"SCB",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 2",
			category:"SCB",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 3",
			category:"SCB",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 4",
			category:"SCB",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 5",
			category:"SCB",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 6",
			category:"SCB",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 7",
			category:"SCB",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 8",
			category:"SCB",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 9",
			category:"SCB",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 10",
			category:"SCB",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output register 11",
			category:"SCB",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:192,
	},
	]
},
{
	mod_name:"MB-Server Timing",
	mod_id:0x1480000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:8,
		datapoints:
		[
		{
			name:"COM  MB-Server Timing (*1ms) 0",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 1",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 2",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 3",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 4",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:64,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 5",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:80,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 6",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:96,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 7",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:112,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:368,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"MB-Server Status",
	mod_id:0x4480000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:14,
		datapoints:
		[
		{
			name:"exception code",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"read error",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"write error",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"parity/format error",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"MODBUS timeout",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Valid read config.",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Valid write conig.",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"exception code",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:128,
			bitLen:4,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"read error",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:132,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"write error",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:133,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"parity/format error",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:134,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"MODBUS timeout",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:135,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Valid read config.",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:140,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Valid write conig.",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:141,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:269,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"COM diagnostics",
	mod_id:0x3100000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:11,
		datapoints:
		[
		{
			name:"Hardware error",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 0",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 1",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 2",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 3",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 4",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 5",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 6",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 7",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:47,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"DXP",
	mod_id:0x82082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"DXP diagnostics",
	mod_id:0x3080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 CH4/5",
			category:"DXP",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 CH6/7",
			category:"DXP",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Output overcurrent",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. DXP functions",
	mod_id:0x80,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"input filter",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_S2_2RFID=
[{
	mod_name:"DXP",
	mod_id:0x82082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"DXP",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"DXP",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"DXP diagnostics",
	mod_id:0x3080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"DXP",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"DXP",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. DXP functions",
	mod_id:0x80,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"input filter",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID diagnostics",
	mod_id:0x680000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF Read/write head address  detuned",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:36,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head address",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:37,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Read/write head address  reports error",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:38,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Expected read/write head address  not connected",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:39,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:295,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:294,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:293,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:292,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF Read/write head address  detuned",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:324,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head address",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:325,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Read/write head address  reports error",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:326,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Expected read/write head address  not connected",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:327,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:583,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID read data",
	mod_id:0x840080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Length of read data",
			category:"RFID read data",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:128,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input buffer",
			category:"Byte",
			chan_unit:"byte",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:127,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:1024,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID write data",
	mod_id:0x21080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Length of write data",
			category:"RFID write data",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:128,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output buffer",
			category:"Byte",
			chan_unit:"byte",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:127,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:1024,
	},
	]
},
{
	mod_name:"RFID control/status",
	mod_id:0x410493,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:15,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:1,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"HF compact",
				2,
				"HF extended",
				3,
				"HF bus mode",
				4,
				"UHF compact",
				5,
				"UHF extended",
				],
		},
		{
			name:"HF: Select Tag type",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:19,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic tag detection HF (1 to 4)",
				1,
				"1: Philips I-CODE SLI SL2",
				2,
				"2: Fujitsu MB89R118",
				3,
				"3: TI Tag-it HF-I Plus",
				4,
				"4: Infineon SRF55V02P",
				5,
				"5: Philips I-CODE SLI S",
				6,
				"6: Fujitsu MB89R119",
				7,
				"7: TI Tag-it HF-I",
				8,
				"8: Infineon SRF55V10P",
				11,
				"11: NXP I-CODE SLI L",
				12,
				"12: Fujitsu MB89R112",
				13,
				"13: EM4233SLIC",
				14,
				"14: reserved",
				15,
				"15: reserved",
				16,
				"16: reserved",
				17,
				"17: reserved",
				18,
				"18: reserved",
				19,
				"19: reserved",
				20,
				"20: reserved",
				],
		},
		{
			name:"HF: Bypass time (*1ms)",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:200,
			enumValues:
				[
				],
		},
		{
			name:"HF: Multitag",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF: Heart beat read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Termination active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"yes",
				1,
				"no",
				],
		},
		{
			name:"HF: Autotuning read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate HF detuned diagnostic",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:47,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF: Idle mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:0,
			enumValues:
				[
				0,
				"UID",
				1,
				"8 bytes user memory",
				2,
				"UID + 8 bytes user memory",
				3,
				"UID + 64 bytes user memory",
				4,
				"deactivated",
				],
		},
		{
			name:"Command retries at failure",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:2,
			enumValues:
				[
				],
		},
		{
			name:"HF: Command in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:72,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				1,
				"Inventory",
				2,
				"Read",
				3,
				"Tag info",
				4,
				"Write",
				],
		},
		{
			name:"HF: Length in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:8,
			enumValues:
				[
				],
		},
		{
			name:"HF: Address in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Activate read-write-head",
			category:"Head",
			chan_unit:"head",
			bitOffset:224,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF Read/write head address  detuned",
			category:"Head",
			chan_unit:"head",
			bitOffset:36,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameter not supported by read/write head address",
			category:"Head",
			chan_unit:"head",
			bitOffset:37,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Read/write head address  reports error",
			category:"Head",
			chan_unit:"head",
			bitOffset:38,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Expected read/write head address  not connected",
			category:"Head",
			chan_unit:"head",
			bitOffset:39,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:295,
	},
	{
		sect_name:"Input",
		num_elems:14,
		datapoints:
		[
		{
			name:"Response code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:65,
			defaultValue:0,
			enumValues:
				[
				0,
				"0x0000 Idle",
				1,
				"0x0001 Inventory",
				2,
				"0x0002 Read",
				4,
				"0x0004 Write",
				8,
				"0x0008 Write and Verify",
				16,
				"0x0010 Continuous Mode",
				17,
				"0x0011 Get data from buffer (Continuous Mode)",
				32,
				"0x0020 UHF Continuous Presence Sensing Mode",
				64,
				"0x0040 HF Read/write head off",
				65,
				"0x0041 Read/write head identification",
				80,
				"0x0050 Tag info",
				96,
				"0x0060 Direct read/write head command",
				128,
				"0x0080 Tune HF Read/write head",
				256,
				"0x0100 Set read/write head password",
				257,
				"0x0101 Reset read/write head password",
				258,
				"0x0102 Set tag password",
				259,
				"0x0103 Set tag protection",
				260,
				"0x0104 Get HF tag protection status",
				261,
				"0x0105 Set perma lock",
				512,
				"0x0200 Kill UHF tag",
				4096,
				"0x1000 Restore settings UHF read/write head",
				4097,
				"0x1001 Backup settings UHF read/write head",
				16385,
				"0x4001 Error - Inventory",
				16386,
				"0x4002 Error - Read",
				16388,
				"0x4004 Error - Write",
				16392,
				"0x4008 Error - Write and Verify",
				16400,
				"0x4010 Error - Continuous Mode",
				16401,
				"0x4011 Error - Get data from buffer (Continuous Mode)",
				16416,
				"0x4020 Error - UHF Continuous Presence Sensing Mode",
				16448,
				"0x4040 Error - HF Read/write head off",
				16449,
				"0x4041 Error - Read/write head identification",
				16464,
				"0x4050 Error - Tag info",
				16480,
				"0x4060 Error - Direct read/write head command",
				16512,
				"0x4080 Error - Tune HF Read/write head",
				16640,
				"0x4100 Error - Set read/write head password",
				16641,
				"0x4101 Error - Reset read/write head password",
				16642,
				"0x4102 Error - Set tag password",
				16643,
				"0x4103 Error - Set tag protection",
				16644,
				"0x4104 Error - Get HF tag protection status",
				16645,
				"0x4105 Error - Set perma lock",
				16896,
				"0x4200 Error - Kill UHF tag",
				20480,
				"0x5000 Error - Restore settings UHF read/write head",
				20481,
				"0x5001 Error - Backup settings UHF read/write head",
				32768,
				"0x8000 Busy - Reset",
				32769,
				"0x8001 Busy - Inventory",
				32770,
				"0x8002 Busy - Read",
				32772,
				"0x8004 Busy - Write",
				32776,
				"0x8008 Busy - Write and Verify",
				32784,
				"0x8010 Busy - Continuous Mode",
				32785,
				"0x8011 Busy - Get data from buffer (Continuous Mode)",
				32800,
				"0x8020 Busy - UHF Continuous Presence Sensing Mode",
				32832,
				"0x8040 Busy - HF Read/write head off",
				32833,
				"0x8041 Busy - Read/write head identification",
				32848,
				"0x8050 Busy - Tag info",
				32864,
				"0x8060 Busy - Direct read/write head command",
				32896,
				"0x8080 Busy - Tune HF Read/write head",
				33024,
				"0x8100 Busy - Set read/write head password",
				33025,
				"0x8101 Busy - Reset read/write head password",
				33026,
				"0x8102 Busy - Set tag password",
				33027,
				"0x8103 Busy - Set tag protection",
				33028,
				"0x8104 Busy - Get HF tag protection status",
				33029,
				"0x8105 Busy - Set perma lock",
				33280,
				"0x8200 Busy - Kill UHF tag",
				36864,
				"0x9000 Busy - Restore settings UHF read/write head",
				36865,
				"0x9001 Busy - Backup settings UHF read/write head",
				],
		},
		{
			name:"Tag present (address )",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:32,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Loop counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"HF Read/write head address  detuned",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head address",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Read/write head address  reports error",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Expected read/write head address  not connected",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Length",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Error code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Tag counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Data (Bytes) available",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:112,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:120,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Tag present at R/W-head",
			category:"Head",
			chan_unit:"head",
			bitOffset:160,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:192,
	},
	{
		sect_name:"Output",
		num_elems:10,
		datapoints:
		[
		{
			name:"Command code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:23,
			defaultValue:0,
			enumValues:
				[
				0,
				"0x0000 Idle",
				1,
				"0x0001 Inventory",
				2,
				"0x0002 Read",
				4,
				"0x0004 Write",
				8,
				"0x0008 Write and Verify",
				16,
				"0x0010 Continuous Mode",
				17,
				"0x0011 Get data from buffer (Continuous Mode)",
				32,
				"0x0020 UHF Continuous Presence Sensing Mode",
				64,
				"0x0040 HF Read/write head off",
				65,
				"0x0041 Read/write head identification",
				80,
				"0x0050 Tag info",
				96,
				"0x0060 Direct read/write head command",
				128,
				"0x0080 Tune HF Read/write head",
				256,
				"0x0100 Set read/write head password",
				257,
				"0x0101 Reset read/write head password",
				258,
				"0x0102 Set tag password",
				259,
				"0x0103 Set tag protection",
				260,
				"0x0104 Get HF tag protection status",
				261,
				"0x0105 Set perma lock",
				512,
				"0x0200 Kill UHF tag",
				4096,
				"0x1000 Restore settings UHF read/write head",
				4097,
				"0x1001 Backup settings UHF read/write head",
				32768,
				"0x8000 Reset",
				],
		},
		{
			name:"Loop counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"UHF: Memory area",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"Kill password",
				1,
				"EPC",
				2,
				"TID",
				3,
				"User memory",
				4,
				"Access password",
				5,
				"PC (EPC length)",
				],
		},
		{
			name:"Start address for read access",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Length",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Length of UID/EPC",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read/write head address",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:160,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Command timeout",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:112,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:120,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	]
},
];
var modules_TBEN_S2_4AI=
[{
	mod_name:"Analog input",
	mod_id:0x80182,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:17,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"",
			bitOffset:4,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:0,
			enumValues:
				[
				0,
				"thermocouple",
				1,
				"voltage",
				2,
				"current",
				3,
				"resistance",
				4,
				"RTD",
				],
		},
		{
			name:"Thermocouple type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:44,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:10,
			defaultValue:0,
			enumValues:
				[
				0,
				"type K, -270...1370 C, -454...2498 F",
				1,
				"type B, +100...1820 C, 212...3308 F",
				2,
				"type E, -270...1000 C, -454...1832 F",
				3,
				"type J, -210...1200 C, -346...2192 F",
				4,
				"type N, -270...1300 C, -454...2372 F",
				5,
				"type R, -50...1768 C, -58...3214 F",
				6,
				"type S, -50...1768 C, -58...3214 F",
				7,
				"type T, -270...400 C, -454...752 F",
				8,
				"type C, 0...2315 C, 32...4199 F",
				9,
				"type G, 0...2315 C, 32...4199 F",
				],
		},
		{
			name:"Thermocouple cold junc. config.",
			category:"Analog In",
			chan_unit:"",
			bitOffset:40,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"PT1000",
				1,
				"PT100",
				2,
				"cold junction from channel 1",
				3,
				"none",
				],
		},
		{
			name:"Voltage range",
			category:"Analog In",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:9,
			defaultValue:0,
			enumValues:
				[
				0,
				"-10...10 V",
				1,
				"0...10 V",
				2,
				"2...10 V",
				3,
				"0...5 V",
				4,
				"1...5 V",
				5,
				"-1...1 V",
				6,
				"-500...500 mV",
				7,
				"-100...100 mV",
				8,
				"-50...50 mV",
				],
		},
		{
			name:"Voltage wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:20,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"differential",
				1,
				"single ended",
				2,
				"differential without ground",
				],
		},
		{
			name:"Current range",
			category:"Analog In",
			chan_unit:"",
			bitOffset:22,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"4...20 mA",
				1,
				"0...20 mA",
				2,
				"-20...20 mA",
				],
		},
		{
			name:"Current wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"differential",
				1,
				"single ended",
				2,
				"differential without ground",
				],
		},
		{
			name:"Resistance range",
			category:"Analog In",
			chan_unit:"",
			bitOffset:28,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...100 Ohm",
				1,
				"0...400 Ohm",
				2,
				"0...2000 Ohm",
				3,
				"0...4000 Ohm",
				],
		},
		{
			name:"Resistance wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:26,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"2-wire",
				1,
				"3-wire",
				2,
				"4-wire",
				],
		},
		{
			name:"RTD type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:12,
			defaultValue:0,
			enumValues:
				[
				0,
				"PT100, -200...850 C, -328...1562 F",
				1,
				"PT100, -200...150 C, -328...302 F",
				2,
				"NI100, -60...250 C, -76...482 F",
				3,
				"NI100, -60...150 C, -76...302 F",
				4,
				"PT200, -200...850 C, -328...1562 F",
				5,
				"PT200, -200...150 C, -328...302 F",
				6,
				"PT500, -200...850 C, -328...1562 F",
				7,
				"PT500, -200...150 C, -328...302 F",
				8,
				"PT1000, -200...850 C, -328...1562 F",
				9,
				"PT1000, -200...150 C, -328...302 F",
				10,
				"NI1000, -60...250 C, -76...482 F",
				11,
				"NI1000, -60...150 C, -76...302 F",
				],
		},
		{
			name:"RTD wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:30,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"2-wire",
				1,
				"3-wire",
				2,
				"4-wire",
				],
		},
		{
			name:"Data representation",
			category:"Analog In",
			chan_unit:"",
			bitOffset:10,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"NE43",
				2,
				"extended range",
				],
		},
		{
			name:"Temperature unit",
			category:"Analog In",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"Celsius",
				1,
				"Fahrenheit",
				],
		},
		{
			name:"Input averaging filter",
			category:"Analog In",
			chan_unit:"",
			bitOffset:12,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"smooth",
				2,
				"fast",
				3,
				"off",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Mains suppression",
			category:"Analog In",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"50 Hz",
				2,
				"60 Hz",
				],
		},
		],
	max_size:48,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Upper limit value exceeded",
			category:"Analog In",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"Analog In",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overflow",
			category:"Analog In",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Underflow",
			category:"Analog In",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Cold junction error",
			category:"Analog In",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent (RTD only)",
			category:"Analog In",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"Analog In",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Analog In",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Analog input diag",
	mod_id:0x1100000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:8,
		datapoints:
		[
		{
			name:"Upper limit value exceeded",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overflow",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Underflow",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Cold junction compensation wire break",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent (RTD only)",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:39,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_S2_4AO=
[{
	mod_name:"Analog output",
	mod_id:0x2182,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:9,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:4,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage",
				1,
				"current",
				],
		},
		{
			name:"Current range",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...20 mA",
				1,
				"4...20 mA",
				],
		},
		{
			name:"Voltage range",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:20,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:0,
			enumValues:
				[
				0,
				"-10...+10 V",
				1,
				"0...10 V",
				2,
				"2...10 V",
				3,
				"0...5 V",
				4,
				"1...5 V",
				],
		},
		{
			name:"Data representation",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:10,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"NE43",
				2,
				"extended range",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output recovery mode",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"manual",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output on fieldbus error",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:0,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"default value",
				1,
				"substitute value",
				2,
				"keep current value",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:48,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overload",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:2,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"Analog output diag",
	mod_id:0x100000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overload",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wire break",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:33,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_S2_4IOL=
[{
	mod_name:"Basic",
	mod_id:0x102102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Diag",
		num_elems:4,
		datapoints:
		[
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:12,
		datapoints:
		[
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:23,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"IO-Link Port",
	mod_id:0x492302,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"IO-Link without validation",
				1,
				"IO-Link with family compatible device",
				2,
				"IO-Link with compatible device",
				3,
				"IO-Link with identical device",
				4,
				"DI (with parameter access)",
				8,
				"DI",
				],
		},
		{
			name:"Data storage mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:3,
			enumValues:
				[
				0,
				"activated",
				1,
				"overwrite",
				2,
				"read in",
				3,
				"deactivated, clear",
				],
		},
		{
			name:"Cycle time",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:84,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				16,
				"1.6 ms",
				32,
				"3.2 ms",
				48,
				"4.8 ms",
				64,
				"6.4 ms",
				68,
				"8.0 ms",
				72,
				"9.6 ms",
				76,
				"11.2 ms",
				80,
				"12.8 ms",
				84,
				"14.4 ms",
				88,
				"16.0 ms",
				92,
				"17.6 ms",
				96,
				"19.2 ms",
				100,
				"20.8 ms",
				104,
				"22.4 ms",
				108,
				"24.0 ms",
				112,
				"25.6 ms",
				116,
				"27.2 ms",
				120,
				"28.8 ms",
				124,
				"30.4 ms",
				128,
				"32.0 ms",
				129,
				"33.6 ms",
				130,
				"35.2 ms",
				131,
				"36.8 ms",
				132,
				"38.4 ms",
				133,
				"40.0 ms",
				134,
				"41.6 ms",
				135,
				"43.2 ms",
				136,
				"44.8 ms",
				137,
				"46.4 ms",
				138,
				"48.0 ms",
				139,
				"49.6 ms",
				140,
				"51.2 ms",
				141,
				"52.8 ms",
				142,
				"54.4 ms",
				143,
				"56.0 ms",
				144,
				"57.6 ms",
				145,
				"59.2 ms",
				146,
				"60.8 ms",
				147,
				"62.4 ms",
				148,
				"64.0 ms",
				149,
				"65.6 ms",
				150,
				"67.2 ms",
				151,
				"68.8 ms",
				152,
				"70.4 ms",
				153,
				"72.0 ms",
				154,
				"73.6 ms",
				155,
				"75.2 ms",
				156,
				"76.8 ms",
				157,
				"78.4 ms",
				158,
				"80.0 ms",
				159,
				"81.6 ms",
				160,
				"83.2 ms",
				161,
				"84.8 ms",
				162,
				"86.4 ms",
				163,
				"88.0 ms",
				164,
				"89.6 ms",
				165,
				"91.2 ms",
				166,
				"92.8 ms",
				167,
				"94.4 ms",
				168,
				"96.0 ms",
				169,
				"97.6 ms",
				170,
				"99.2 ms",
				171,
				"100.8 ms",
				172,
				"102.4 ms",
				173,
				"104.0 ms",
				174,
				"105.6 ms",
				175,
				"107.2 ms",
				176,
				"108.8 ms",
				177,
				"110.4 ms",
				178,
				"112.0 ms",
				179,
				"113.6 ms",
				180,
				"115.2 ms",
				181,
				"116.8 ms",
				182,
				"118.4 ms",
				183,
				"120.0 ms",
				184,
				"121.6 ms",
				185,
				"123.2 ms",
				186,
				"124.8 ms",
				187,
				"126.4 ms",
				188,
				"128.0 ms",
				189,
				"129.6 ms",
				190,
				"131.2 ms",
				191,
				"132.8 ms",
				],
		},
		{
			name:"Revision",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"V1.0",
				],
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Device parametrization via GSD",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"inactive",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"diagnostic generated",
				1,
				"no diagnostic generated",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:18,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"no",
				1,
				"notifications",
				2,
				"notifications and warnings",
				3,
				"yes",
				],
		},
		{
			name:"Input data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:20,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap",
				],
		},
		{
			name:"Output data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:22,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap",
				],
		},
		{
			name:"Vendor ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Device ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:112,
	},
	{
		sect_name:"Diag",
		num_elems:15,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Input data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Output",
		num_elems:16,
		datapoints:
		[
		{
			name:"Output data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0x240000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:64,
		datapoints:
		[
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:34,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:50,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:66,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:35,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:51,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:67,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:53,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:69,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:52,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:68,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:54,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:70,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:55,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:71,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:25,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:41,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:57,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:73,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:26,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:42,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:58,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:74,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:27,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:43,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:59,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:75,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:44,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:60,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:76,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:29,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:45,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:61,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:77,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:30,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:46,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:62,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:78,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:31,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:47,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:63,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:79,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:33,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:49,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:65,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:80,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Events",
	mod_id:0x640000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Port",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Qualifier",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:0,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Event code",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:528,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_S2_DIG=
[{
	mod_name:"Basic",
	mod_id:0x2082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0xD080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x202082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				4,
				"counter",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Counter value",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Counter frequency (Hz)",
			category:"Input values",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Status",
			category:"Input values",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:56,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Counter reset",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"not active",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x2082102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"PWM Output",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				2,
				"PWM out",
				],
		},
		],
	max_size:7,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Diagnostics",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Duty cycle %",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x2002100,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX2 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:26,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX2 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x1082082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0xF080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x2000080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x1082102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				2,
				"PWM out",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Diagnostics",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Duty cycle %",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Input Latch Ch0-7",
	mod_id:0x2082000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch input",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch reset",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x2100,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:26,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x80082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:4,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0xB080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:4,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x1002100,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:26,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 C0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 C3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x2082082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0xE080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 C0 (Ch0/1)",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 C1 (Ch2/3)",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C2 (Ch4/5)",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C3 (Ch6/7)",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Input Latch Ch0-3",
	mod_id:0x1082000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch input",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch reset",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
];
var modules_FEN20_4IOL=
[{
	mod_name:"Basic",
	mod_id:0x4082082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:4,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 Ch0",
			category:"IOL",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch1",
			category:"IOL",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch2",
			category:"IOL",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch3",
			category:"IOL",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:12,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0x2240000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:20,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 Ch0",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch1",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch2",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent supply VAUX1 Ch3",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:25,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:26,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:27,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:29,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:30,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:31,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:95,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Events",
	mod_id:0x640000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Port",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Qualifier",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:0,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Event code",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:528,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Port",
	mod_id:0x3492302,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:7,
			defaultValue:0,
			enumValues:
				[
				0,
				"IO-Link without validation",
				1,
				"IO-Link with family compatible device",
				2,
				"IO-Link with compatible device",
				3,
				"IO-Link with identical device",
				4,
				"DI (with parameter access)",
				8,
				"DI",
				9,
				"DX",
				],
		},
		{
			name:"Data storage mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:3,
			enumValues:
				[
				0,
				"activated",
				1,
				"overwrite",
				2,
				"read in",
				3,
				"deactivated, clear",
				],
		},
		{
			name:"Cycle time",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:91,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				16,
				"1.6 ms",
				24,
				"2.4 ms",
				32,
				"3.2 ms",
				40,
				"4.0 ms",
				48,
				"4.8 ms",
				56,
				"5.6 ms",
				64,
				"6.4 ms",
				66,
				"7.2 ms",
				68,
				"8.0 ms",
				70,
				"8.8 ms",
				72,
				"9.6 ms",
				74,
				"10.4 ms",
				76,
				"11.2 ms",
				78,
				"12.0 ms",
				80,
				"12.8 ms",
				84,
				"14.4 ms",
				88,
				"16.0 ms",
				92,
				"17.6 ms",
				96,
				"19.2 ms",
				100,
				"20.8 ms",
				104,
				"22.4 ms",
				108,
				"24.0 ms",
				112,
				"25.6 ms",
				116,
				"27.2 ms",
				120,
				"28.8 ms",
				124,
				"30.4 ms",
				128,
				"32.0 ms",
				129,
				"33.6 ms",
				130,
				"35.2 ms",
				131,
				"36.8 ms",
				132,
				"38.4 ms",
				133,
				"40.0 ms",
				134,
				"41.6 ms",
				135,
				"43.2 ms",
				136,
				"44.8 ms",
				137,
				"46.4 ms",
				138,
				"48.0 ms",
				139,
				"49.6 ms",
				140,
				"51.2 ms",
				141,
				"52.8 ms",
				142,
				"54.4 ms",
				143,
				"56.0 ms",
				144,
				"57.6 ms",
				145,
				"59.2 ms",
				146,
				"60.8 ms",
				147,
				"62.4 ms",
				148,
				"64.0 ms",
				149,
				"65.6 ms",
				150,
				"67.2 ms",
				151,
				"68.8 ms",
				152,
				"70.4 ms",
				153,
				"72.0 ms",
				154,
				"73.6 ms",
				155,
				"75.2 ms",
				156,
				"76.8 ms",
				157,
				"78.4 ms",
				158,
				"80.0 ms",
				159,
				"81.6 ms",
				160,
				"83.2 ms",
				161,
				"84.8 ms",
				162,
				"86.4 ms",
				163,
				"88.0 ms",
				164,
				"89.6 ms",
				165,
				"91.2 ms",
				166,
				"92.8 ms",
				167,
				"94.4 ms",
				168,
				"96.0 ms",
				169,
				"97.6 ms",
				170,
				"99.2 ms",
				171,
				"100.8 ms",
				172,
				"102.4 ms",
				173,
				"104.0 ms",
				174,
				"105.6 ms",
				175,
				"107.2 ms",
				176,
				"108.8 ms",
				177,
				"110.4 ms",
				178,
				"112.0 ms",
				179,
				"113.6 ms",
				180,
				"115.2 ms",
				181,
				"116.8 ms",
				182,
				"118.4 ms",
				183,
				"120.0 ms",
				184,
				"121.6 ms",
				185,
				"123.2 ms",
				186,
				"124.8 ms",
				187,
				"126.4 ms",
				188,
				"128.0 ms",
				189,
				"129.6 ms",
				190,
				"131.2 ms",
				191,
				"132.8 ms",
				],
		},
		{
			name:"Revision",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"V1.0",
				],
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Device parametrization via GSD",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"inactive",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"diagnostic generated",
				1,
				"no diagnostic generated",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:18,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"no",
				1,
				"notifications",
				2,
				"notifications and warnings",
				3,
				"yes",
				],
		},
		{
			name:"Input data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:20,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap all",
				],
		},
		{
			name:"Output data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:22,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap all",
				],
		},
		{
			name:"Vendor ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Device ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:112,
	},
	{
		sect_name:"Diag",
		num_elems:15,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Input data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Output",
		num_elems:16,
		datapoints:
		[
		{
			name:"Output data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x13080000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"ARGEE program active",
			category:"Module state",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x4002100,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin3 (Ch0)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin5 (Ch1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin7 (Ch2)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin9 (Ch3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:26,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX1 Pin3 (Ch0)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin5 (Ch1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin7 (Ch2)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin9 (Ch3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:4,
	},
	]
},
];
var modules_TBEN_L_4RFID=
[{
	mod_name:"DXP",
	mod_id:0x82104,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Pin1 C4 (Ch8/9)",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C5 (Ch10/11)",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C6 (Ch12/13)",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C7 (Ch14/15)",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0x7100000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Pin1 C4 (Ch8/9)",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C5 (Ch10/11)",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C6 (Ch12/13)",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 C7 (Ch14/15)",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x1002200,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX2 Pin1 C4 (Ch8/9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:32,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C5 (Ch10/11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:40,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C6 (Ch12/13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:48,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 C7 (Ch14/15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:56,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:58,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX2 Pin1 C4 (Ch8/9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C5 (Ch10/11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C6 (Ch12/13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 C7 (Ch14/15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"RFID diagnostics",
	mod_id:0x880000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:32,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:36,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:37,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:38,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:39,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:68,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:69,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:70,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:71,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:71,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:70,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:69,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:68,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:100,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:101,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:102,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:103,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:103,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:102,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:101,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:100,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:132,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:133,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:134,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:135,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:391,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID control/status",
	mod_id:0x410493,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:15,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:1,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"HF compact",
				2,
				"HF extended",
				3,
				"HF bus mode",
				4,
				"UHF compact",
				5,
				"UHF extended",
				],
		},
		{
			name:"HF: Select Tag type",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:27,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic tag detection HF",
				1,
				"1: NXP Icode SLIX",
				2,
				"2: Fujitsu MB89R118",
				3,
				"3: TI Tag-it HF-I Plus",
				4,
				"4: Infineon SRF55V02P",
				5,
				"5: NXP Icode SLIX-S",
				6,
				"6: Fujitsu MB89R119",
				7,
				"7: TI Tag-it HF-I",
				8,
				"8: Infineon SRF55V10P",
				11,
				"11: NXP Icode SLIX-L",
				12,
				"12: Fujitsu MB89R112",
				13,
				"13: EM4233SLIC",
				14,
				"14: NXP SLIX2",
				15,
				"15: TI Tag-it HFI Pro",
				16,
				"16: Turck Sensor Tag",
				17,
				"17: Infineon SRF55V02S",
				18,
				"18: Infineon SRF55V10S",
				19,
				"19: EM4233",
				20,
				"20: EM4237",
				21,
				"21: EM4237 SLIC",
				22,
				"22: EM4237 SLIX",
				23,
				"23: EM4033",
				24,
				"24: reserved",
				25,
				"25: reserved",
				26,
				"26: reserved",
				27,
				"27: reserved",
				28,
				"28: reserved",
				],
		},
		{
			name:"HF: Bypass time (*1ms)",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:200,
			enumValues:
				[
				],
		},
		{
			name:"HF: Multitag",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Heart beat read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Termination active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"yes",
				1,
				"no",
				],
		},
		{
			name:"HF: Autotuning read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate HF detuned diagnostic",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:47,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Command retries at failure",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:2,
			enumValues:
				[
				],
		},
		{
			name:"HF: Command in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:72,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				1,
				"Inventory",
				2,
				"Read",
				3,
				"Tag info",
				4,
				"Write",
				],
		},
		{
			name:"HF: Length in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:8,
			enumValues:
				[
				],
		},
		{
			name:"HF: Address in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"HF: Idle mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"UID",
				1,
				"8 bytes user memory",
				2,
				"UID + 8 bytes user memory",
				3,
				"UID + 64 bytes user memory",
				],
		},
		{
			name:"Activate read-write-head",
			category:"Head",
			chan_unit:"head",
			bitOffset:224,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:36,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:37,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:38,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:39,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:295,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Response code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:77,
			defaultValue:0,
			enumValues:
				[
				0,
				"0x0000 Idle",
				1,
				"0x0001 Inventory",
				2,
				"0x0002 Read",
				4,
				"0x0004 Write",
				8,
				"0x0008 Write and Verify",
				16,
				"0x0010 Continuous Mode",
				17,
				"0x0011 Get data from buffer (Continuous Mode)",
				18,
				"0x0012 Stop Continuous (Presence Sensing) Mode",
				32,
				"0x0020 UHF Continuous Presence Sensing Mode",
				64,
				"0x0040 HF Read/write head off",
				65,
				"0x0041 Read/write head identification",
				66,
				"0x0042 Get UHF read/write head status/error",
				80,
				"0x0050 Tag info",
				96,
				"0x0060 Direct read/write head command",
				112,
				"0x0070 Get HF read/write head address",
				113,
				"0x0071 Set HF read/write head address",
				128,
				"0x0080 Tune HF Read/write head",
				256,
				"0x0100 Set read/write head password",
				257,
				"0x0101 Reset read/write head password",
				258,
				"0x0102 Set tag password",
				259,
				"0x0103 Set tag protection",
				260,
				"0x0104 Get HF tag protection status",
				261,
				"0x0105 Set perma lock",
				512,
				"0x0200 Kill UHF tag",
				4096,
				"0x1000 Restore settings UHF read/write head",
				4097,
				"0x1001 Backup settings UHF read/write head",
				16385,
				"0x4001 Error - Inventory",
				16386,
				"0x4002 Error - Read",
				16388,
				"0x4004 Error - Write",
				16392,
				"0x4008 Error - Write and Verify",
				16400,
				"0x4010 Error - Continuous Mode",
				16401,
				"0x4011 Error - Get data from buffer (Continuous Mode)",
				16402,
				"0x4012 Error - Stop Continuous (Presence Sensing) Mode",
				16416,
				"0x4020 Error - UHF Continuous Presence Sensing Mode",
				16448,
				"0x4040 Error - HF Read/write head off",
				16449,
				"0x4041 Error - Read/write head identification",
				16450,
				"0x4042 Error - Get UHF read/write head status/error",
				16464,
				"0x4050 Error - Tag info",
				16480,
				"0x4060 Error - Direct read/write head command",
				16496,
				"0x4070 Error - Get HF read/write head address",
				16497,
				"0x4071 Error - Set HF read/write head address",
				16512,
				"0x4080 Error - Tune HF Read/write head",
				16640,
				"0x4100 Error - Set read/write head password",
				16641,
				"0x4101 Error - Reset read/write head password",
				16642,
				"0x4102 Error - Set tag password",
				16643,
				"0x4103 Error - Set tag protection",
				16644,
				"0x4104 Error - Get HF tag protection status",
				16645,
				"0x4105 Error - Set perma lock",
				16896,
				"0x4200 Error - Kill UHF tag",
				20480,
				"0x5000 Error - Restore settings UHF read/write head",
				20481,
				"0x5001 Error - Backup settings UHF read/write head",
				32768,
				"0x8000 Busy - Reset",
				32769,
				"0x8001 Busy - Inventory",
				32770,
				"0x8002 Busy - Read",
				32772,
				"0x8004 Busy - Write",
				32776,
				"0x8008 Busy - Write and Verify",
				32784,
				"0x8010 Busy - Continuous Mode",
				32785,
				"0x8011 Busy - Get data from buffer (Continuous Mode)",
				32786,
				"0x8012 Busy - Stop Continuous (Presence Sensing) Mode",
				32800,
				"0x8020 Busy - UHF Continuous Presence Sensing Mode",
				32832,
				"0x8040 Busy - HF Read/write head off",
				32833,
				"0x8041 Busy - Read/write head identification",
				32834,
				"0x8042 Busy - Get UHF read/write head status/error",
				32848,
				"0x8050 Busy - Tag info",
				32864,
				"0x8060 Busy - Direct read/write head command",
				32880,
				"0x8070 Busy - Get HF read/write head address",
				32881,
				"0x8071 Busy - Set HF read/write head address",
				32896,
				"0x8080 Busy - Tune HF Read/write head",
				33024,
				"0x8100 Busy - Set read/write head password",
				33025,
				"0x8101 Busy - Reset read/write head password",
				33026,
				"0x8102 Busy - Set tag password",
				33027,
				"0x8103 Busy - Set tag protection",
				33028,
				"0x8104 Busy - Get HF tag protection status",
				33029,
				"0x8105 Busy - Set perma lock",
				33280,
				"0x8200 Busy - Kill UHF tag",
				36864,
				"0x9000 Busy - Restore settings UHF read/write head",
				36865,
				"0x9001 Busy - Backup settings UHF read/write head",
				],
		},
		{
			name:"Tag present at r/w head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:32,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF r/w head switched on",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Continuous mode active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:41,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Loop counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Length",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Error code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:149,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				2049,
				"Write or read error",
				8192,
				"Kill command not successful",
				8704,
				"Automatic tuning active",
				8705,
				"Tuning failed",
				8706,
				"Antenna detuned",
				9472,
				"Password function of the tag not supported",
				9473,
				"Password function not supported by read/write head",
				10496,
				"Address outside of the block limits",
				10497,
				"Length outside of the block limits",
				32768,
				"Channel not active",
				32769,
				"Read/write head not connected",
				32770,
				"Memory full",
				32771,
				"Block size of the tag not supported",
				32772,
				"Length larger than the size of the read  fragment",
				32773,
				"Length larger than the size of the write fragment",
				32774,
				"Read/write head does not support bus mode",
				32775,
				"For addressing, only one read/write head may be connected.",
				33021,
				"-Bypass time- parameter outside of the permissible range",
				33022,
				"-Address- parameter in Continuous mode outside of the permissible range",
				33023,
				"No read/write head selected",
				33024,
				"Parameter undefined",
				33025,
				"-Operating mode- outside of the permissible range",
				33026,
				"-Tag type- parameter outside of the permissible range",
				33027,
				"-Operating mode- parameter in Continuous mode outside of the permissible range",
				33028,
				"-Length- parameter in Continuous mode outside of the permissible range",
				33029,
				"Size of the write fragment outside of the permissible range",
				33030,
				"Size of the read fragment outside of the permissible range",
				33280,
				"Command code unknown",
				33281,
				"Command not supported",
				33282,
				"Command not supported in HF applications",
				33283,
				"Command not supported in UHF applications",
				33284,
				"Command for multitag application with automatic tag detection not supported",
				33285,
				"Command for applications with automatic tag detection not supported",
				33286,
				"Command only supported for applications with automatic tag detection",
				33287,
				"Command not supported for multitag application",
				33288,
				"Command not supported in HF bus mode",
				33289,
				"-Length- parameter outside of the permissible range",
				33290,
				"Address outside of the permissible range",
				33291,
				"Length and address outside of the permissible range",
				33292,
				"No tag found",
				33293,
				"Timeout",
				33294,
				"Next command not supported in multitag mode",
				33295,
				"Length of the UID outside of the permissible range",
				33296,
				"Length outside of the tag specification",
				33297,
				"Address outside of the tag specification",
				33298,
				"Length and address outside of the tag specification",
				33299,
				"Memory area of the tag outside of the permissible range",
				33300,
				"Read/write head address outside of the permissible range",
				33301,
				"Value for timeout outside of the permissible range",
				33302,
				"Command not supported outside HF bus mode",
				33303,
				"Read/write head address invalid",
				33536,
				"Continuous mode command not activated",
				33537,
				"Grouping not supported in HF applications",
				33538,
				"Grouping not supported for read commands",
				33540,
				"Grouping not supported for write commands",
				33541,
				"-HF: Length in continuous mode- breaches block boundaries",
				33542,
				"-HF: Address in continuous mode- breaches block boundaries",
				33543,
				"-HF: Length in continuous mode- outside of the permissible range",
				45128,
				"Error when switching on the HF read/write head",
				45129,
				"Error when switching off the HF read/write head",
				45152,
				"Error with the advanced parameter setting of the HF read/write head",
				45153,
				"Error with the parameter setting of the HF read/write head",
				45154,
				"Read/write head error when executing an inventory command",
				45159,
				"Read/write head error when executing a lock block command",
				45160,
				"Read/write head error when executing a read multiple block command",
				45161,
				"Read/write head error when executing a write multiple block command",
				45162,
				"Error when reading the system information",
				45163,
				"Error when reading the protection status of the tags",
				45229,
				"Error when setting the HF read/write head address",
				45235,
				"Error when setting the tag password",
				45238,
				"Error when setting the write or read protection",
				45240,
				"Error when reading the protection status of the memory area on the tag",
				45245,
				"Error when setting the transfer rate",
				45251,
				"Error when setting the password in the read/write head",
				45274,
				"Error with the -Tag in detection range-",
				45280,
				"Error when reading the HF read/write head version",
				45281,
				"Error when reading the advanced read/write head version",
				45297,
				"Error with automatic read/write head tuning",
				45304,
				"Error when resetting a command in Continuous mode",
				45306,
				"Error when outputting the response code",
				45311,
				"Error when resetting the read/write head",
				49152,
				"Internal error (response of the read/write head too short)",
				49153,
				"Command not supported by read/write head version",
				53249,
				"Error when resetting the UHF read/write head",
				53250,
				"Error when reading the UHF read/write head version",
				53251,
				"Error when reading the read/write head version when a tag is in the detection range",
				53252,
				"Error when setting the UHF read/write head address",
				53257,
				"Error with the parameter setting of the UHF read/write head",
				53258,
				"Error setting the transfer speed and the operating mode of the UHF read/write head",
				53259,
				"Error when polling",
				53261,
				"Error when reading the device status",
				53262,
				"Error when resetting the internal status bit",
				53263,
				"Error when setting the read/write head outputs and/or LEDs",
				53265,
				"Error when reading the internal malfunctions",
				53268,
				"Diagnostics error",
				53270,
				"Error with the heartbeat message",
				53271,
				"Error when outputting the user settings",
				53275,
				"Error when emptying the message memory in Polling mode",
				53377,
				"Error when switching turning on/off UHF-carrier",
				53379,
				"Error when reading from a tag",
				53380,
				"Error when writing to a tag",
				53381,
				"Software trigger error",
				53384,
				"Error with a UHF tag function",
				53504,
				"Error with the Backup function",
				53505,
				"Error with the Backup function (required memory not available)",
				53506,
				"Error when restoring a backup",
				53507,
				"Error when restoring a backup (no backup present)",
				53508,
				"Error when restoring a backup (backup data damaged)",
				53509,
				"Error when restoring the default settings",
				53510,
				"Error with the tag function",
				61441,
				"ISO 15693 Error: Command not supported",
				61442,
				"ISO 15693 Error: Command not detected, e.g. incorrect input format",
				61443,
				"ISO 15693 Error: Command option not supported",
				61455,
				"ISO 15693 Error: Undefined error",
				61456,
				"ISO 15693 Error: Addressed memory area not available",
				61457,
				"ISO 15693 Error: Addressed memory area locked",
				61458,
				"ISO 15693 Error: Addressed memory area locked and not writable",
				61459,
				"ISO 15693 Error: Write operation not successful",
				61460,
				"ISO 15693 Error: Addressed memory area could not be locked",
				61697,
				"Error on air interface: CRC error",
				61698,
				"Error on air interface: Timeout",
				61699,
				"Error on air interface: HF tag error",
				61704,
				"Error on air interface: HF tag outside of the detection range, before all commands could be executed",
				61712,
				"Error on air interface: Tag does not have the expected UID/UII",
				61953,
				"HF read/write head faulty",
				61954,
				"HF read/write head: Error in command execution",
				61956,
				"HF read/write head: Transmission window, check syntax",
				61960,
				"Power supply of the HF read/write head too low",
				61962,
				"HF read/write head: Command code unknown",
				63520,
				"UHF read/write head: The command is not implemented in this device",
				63521,
				"UHF read/write head: Unspecified error",
				63522,
				"UHF read/write head: A valid password is expected before the command is accepted",
				63524,
				"UHF read/write head: No data could be read e.g. no valid Transponder",
				63525,
				"UHF read/write head: Write operation not possible e.g. Transponder is read only",
				63526,
				"UHF read/write head: Verify after write operation failed",
				63527,
				"UHF read/write head: Access to unknown address e.g. memory area out of range",
				63528,
				"UHF read/write head: The data that should be sent is not valid",
				63530,
				"UHF read/write head: The commands needs a long time to execute",
				63532,
				"UHF read/write head: The requested object is not in the persistent memory",
				63533,
				"UHF read/write head: The requested object is not in the volatile memory",
				63541,
				"UHF read/write head: The command is temporary not allowed",
				63542,
				"UHF read/write head: The Opcode is not valid for this type of configuration memory",
				63616,
				"UHF read/write head: No transponder in field",
				63617,
				"UHF read/write head: The EPC in the command does not fit to the EPC in the air interface",
				63618,
				"UHF read/write head: Wrong transponder type in the command",
				63619,
				"UHF read/write head: No success of writing on a block",
				65534,
				"Timeout on RS485",
				65535,
				"Command aborted",
				],
		},
		{
			name:"Tag counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Data (Bytes) available",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:112,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:120,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Tag present at r/w head",
			category:"Head",
			chan_unit:"head",
			bitOffset:160,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:192,
	},
	{
		sect_name:"Output",
		num_elems:10,
		datapoints:
		[
		{
			name:"Command code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:27,
			defaultValue:0,
			enumValues:
				[
				0,
				"0x0000 Idle",
				1,
				"0x0001 Inventory",
				2,
				"0x0002 Read",
				4,
				"0x0004 Write",
				8,
				"0x0008 Write and Verify",
				16,
				"0x0010 Continuous Mode",
				17,
				"0x0011 Get data from buffer (Continuous Mode)",
				18,
				"0x0012 Stop Continuous (Presence Sensing) Mode",
				32,
				"0x0020 UHF Continuous Presence Sensing Mode",
				64,
				"0x0040 HF Read/write head off",
				65,
				"0x0041 Read/write head identification",
				66,
				"0x0042 Get UHF read/write head status/error",
				80,
				"0x0050 Tag info",
				96,
				"0x0060 Direct read/write head command",
				112,
				"0x0070 Get HF read/write head address",
				113,
				"0x0071 Set HF read/write head address",
				128,
				"0x0080 Tune HF Read/write head",
				256,
				"0x0100 Set read/write head password",
				257,
				"0x0101 Reset read/write head password",
				258,
				"0x0102 Set tag password",
				259,
				"0x0103 Set tag protection",
				260,
				"0x0104 Get HF tag protection status",
				261,
				"0x0105 Set perma lock",
				512,
				"0x0200 Kill UHF tag",
				4096,
				"0x1000 Restore settings UHF read/write head",
				4097,
				"0x1001 Backup settings UHF read/write head",
				32768,
				"0x8000 Reset",
				],
		},
		{
			name:"Loop counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"UHF: Memory area",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"Kill password",
				1,
				"EPC",
				2,
				"TID",
				3,
				"User memory",
				4,
				"Access password",
				5,
				"PC (EPC length)",
				],
		},
		{
			name:"Start address",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Length",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Length of UID/EPC",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read/write head address",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:160,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Command timeout (*1ms)",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:112,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:120,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	]
},
{
	mod_name:"RFID read data",
	mod_id:0x840080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Length of read data",
			category:"RFID read data",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:16,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input buffer byte",
			category:"Byte",
			chan_unit:"byte",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:127,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:1024,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID write data",
	mod_id:0x21080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Length of write data",
			category:"RFID write data",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:16,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output buffer byte",
			category:"Byte",
			chan_unit:"byte",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:127,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:1024,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:6,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"ARGEE program active",
			category:"Module state",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. DXP functions",
	mod_id:0x80,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Extended digital mode",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"Input filter",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"Impulse stretch (*10ms)",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_LL_8IOL=
[{
	mod_name:"IO-Link Events",
	mod_id:0x640000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:3,
		datapoints:
		[
		{
			name:"Port",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Qualifier",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:0,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Event code",
			category:"IO-Link event",
			chan_unit:"event",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:1,
			channelNumEnd:16,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:528,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"IO-Link Port",
	mod_id:0x492302,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"IO-Link without validation",
				1,
				"IO-Link with family compatible device",
				2,
				"IO-Link with compatible device",
				3,
				"IO-Link with identical device",
				4,
				"DI (with parameter access)",
				8,
				"DI",
				],
		},
		{
			name:"Data storage mode",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:3,
			enumValues:
				[
				0,
				"activated",
				1,
				"overwrite",
				2,
				"read in",
				3,
				"deactivated, clear",
				],
		},
		{
			name:"Cycle time",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:92,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				16,
				"1.6 ms",
				24,
				"2.4 ms",
				32,
				"3.2 ms",
				40,
				"4.0 ms",
				48,
				"4.8 ms",
				56,
				"5.6 ms",
				64,
				"6.4 ms",
				66,
				"7.2 ms",
				68,
				"8.0 ms",
				70,
				"8.8 ms",
				72,
				"9.6 ms",
				74,
				"10.4 ms",
				76,
				"11.2 ms",
				78,
				"12.0 ms",
				80,
				"12.8 ms",
				84,
				"14.4 ms",
				88,
				"16.0 ms",
				92,
				"17.6 ms",
				96,
				"19.2 ms",
				100,
				"20.8 ms",
				104,
				"22.4 ms",
				108,
				"24.0 ms",
				112,
				"25.6 ms",
				116,
				"27.2 ms",
				120,
				"28.8 ms",
				124,
				"30.4 ms",
				128,
				"32.0 ms",
				129,
				"33.6 ms",
				130,
				"35.2 ms",
				131,
				"36.8 ms",
				132,
				"38.4 ms",
				133,
				"40.0 ms",
				134,
				"41.6 ms",
				135,
				"43.2 ms",
				136,
				"44.8 ms",
				137,
				"46.4 ms",
				138,
				"48.0 ms",
				139,
				"49.6 ms",
				140,
				"51.2 ms",
				141,
				"52.8 ms",
				142,
				"54.4 ms",
				143,
				"56.0 ms",
				144,
				"57.6 ms",
				145,
				"59.2 ms",
				146,
				"60.8 ms",
				147,
				"62.4 ms",
				148,
				"64.0 ms",
				149,
				"65.6 ms",
				150,
				"67.2 ms",
				151,
				"68.8 ms",
				152,
				"70.4 ms",
				153,
				"72.0 ms",
				154,
				"73.6 ms",
				155,
				"75.2 ms",
				156,
				"76.8 ms",
				157,
				"78.4 ms",
				158,
				"80.0 ms",
				159,
				"81.6 ms",
				160,
				"83.2 ms",
				161,
				"84.8 ms",
				162,
				"86.4 ms",
				163,
				"88.0 ms",
				164,
				"89.6 ms",
				165,
				"91.2 ms",
				166,
				"92.8 ms",
				167,
				"94.4 ms",
				168,
				"96.0 ms",
				169,
				"97.6 ms",
				170,
				"99.2 ms",
				171,
				"100.8 ms",
				172,
				"102.4 ms",
				173,
				"104.0 ms",
				174,
				"105.6 ms",
				175,
				"107.2 ms",
				176,
				"108.8 ms",
				177,
				"110.4 ms",
				178,
				"112.0 ms",
				179,
				"113.6 ms",
				180,
				"115.2 ms",
				181,
				"116.8 ms",
				182,
				"118.4 ms",
				183,
				"120.0 ms",
				184,
				"121.6 ms",
				185,
				"123.2 ms",
				186,
				"124.8 ms",
				187,
				"126.4 ms",
				188,
				"128.0 ms",
				189,
				"129.6 ms",
				190,
				"131.2 ms",
				191,
				"132.8 ms",
				255,
				"automatic, compatible",
				],
		},
		{
			name:"Revision",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic",
				1,
				"V1.0",
				],
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Device parametrization via GSD",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"inactive",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"diagnostic generated",
				1,
				"no diagnostic generated",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:18,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:2,
			enumValues:
				[
				0,
				"no",
				1,
				"notifications",
				2,
				"notifications and warnings",
				3,
				"yes",
				],
		},
		{
			name:"Input data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:20,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap all",
				],
		},
		{
			name:"Output data mapping",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:22,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				0,
				"direct",
				1,
				"swap 16 bit",
				2,
				"swap 32 bit",
				3,
				"swap all",
				],
		},
		{
			name:"Vendor ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Device ID",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:112,
	},
	{
		sect_name:"Diag",
		num_elems:15,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Input data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Input data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Output",
		num_elems:16,
		datapoints:
		[
		{
			name:"Output data word 0",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 1",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 2",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 3",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 4",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 5",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 6",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 7",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 8",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:128,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 9",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:144,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 10",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:160,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 11",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:176,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 12",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:192,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 13",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:208,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 14",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:224,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Output data word 15",
			category:"IO-Link port",
			chan_unit:"",
			bitOffset:240,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:256,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x3102104,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Diag",
		num_elems:16,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 X0 (Ch0/1)",
			category:"DXP",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X1 (Ch2/3)",
			category:"DXP",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X2 (Ch4/5)",
			category:"DXP",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X3 (Ch6/7)",
			category:"DXP",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X4 (Ch8)",
			category:"DXP",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X4 (Ch9)",
			category:"DXP",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X5 (Ch10)",
			category:"DXP",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X5 (Ch11)",
			category:"DXP",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X6 (Ch12)",
			category:"DXP",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X6 (Ch13)",
			category:"DXP",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X7 (Ch14)",
			category:"DXP",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X7 (Ch15)",
			category:"DXP",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:20,
		datapoints:
		[
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DI input",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:26,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Input values valid",
			category:"IOL",
			chan_unit:"Channel",
			bitOffset:30,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:31,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"DXP Output value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0x1380000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:136,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Pin1 X0 (Ch0/1)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X1 (Ch2/3)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X2 (Ch4/5)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X3 (Ch6/7)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X4 (Ch8)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X4 (Ch9)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X5 (Ch10)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X5 (Ch11)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X6 (Ch12)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X6 (Ch13)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Pin1 X7 (Ch14)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin2 X7 (Ch15)",
			category:"Groupe diagnosis",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:21,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:5,
			channelNumEnd:5,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"DXP channel",
			chan_unit:"Channel",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:7,
			channelNumEnd:7,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:34,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:98,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:50,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:114,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:66,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:130,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:82,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:146,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:35,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:99,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:51,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:115,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:67,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:131,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:83,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:147,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:101,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:53,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:117,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:69,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:133,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:85,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:149,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:100,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:52,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:116,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:68,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:132,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:84,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:148,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:102,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:54,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:118,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:70,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:134,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:86,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:150,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:103,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:55,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:119,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:71,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:135,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:87,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Out of spec. error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:151,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:104,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:120,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:136,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:88,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:152,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:41,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:105,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:57,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:121,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:73,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:137,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:89,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:153,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:42,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:106,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:58,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:122,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:74,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:138,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:90,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:154,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:43,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:107,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:59,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:123,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:75,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:139,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:91,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:155,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:44,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:108,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:60,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:124,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:76,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:140,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:92,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:156,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:45,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:109,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:61,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:125,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:77,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:141,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:93,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:157,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:46,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:110,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:62,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:126,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:78,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:142,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:94,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:158,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:47,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:111,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:63,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:127,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:79,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:143,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:95,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:159,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:33,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:97,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:8,
			channelNumEnd:8,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:49,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:113,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:10,
			channelNumEnd:10,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:65,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:4,
			channelNumEnd:4,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:129,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:12,
			channelNumEnd:12,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:81,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:6,
			channelNumEnd:6,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Port parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:145,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:14,
			channelNumEnd:14,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:160,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x1002300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 X0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:8,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:16,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:24,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X4 (Ch8)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:32,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 X4 (Ch9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:96,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X5 (Ch10)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:40,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 X5 (Ch11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:104,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X6 (Ch12)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:48,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 X6 (Ch13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:112,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX1 Pin1 X7 (Ch14)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:56,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin2 X7 (Ch15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:120,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:122,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:12,
		datapoints:
		[
		{
			name:"VAUX1 Pin1 X0 (Ch0/1)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X1 (Ch2/3)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X2 (Ch4/5)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X3 (Ch6/7)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X4 (Ch8)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 X4 (Ch9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X5 (Ch10)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 X5 (Ch11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X6 (Ch12)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 X6 (Ch13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX1 Pin1 X7 (Ch14)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin2 X7 (Ch15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:6,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"ARGEE program active",
			category:"Module state",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
var modules_TBEN_LL_4RFID=
[{
	mod_name:"DXP",
	mod_id:0x1082104,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:1,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Pin1 X4 (Ch8/9)",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 X5 (Ch10/11)",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 X6 (Ch12/13)",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 X7 (Ch14/15)",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"Diagnostics",
	mod_id:0xA100000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Pin1 X4 (Ch8/9)",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 X5 (Ch10/11)",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 X6 (Ch12/13)",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Pin1 X7 (Ch14/15)",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:32,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"VAUX control",
	mod_id:0x2002200,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX2 Pin1 X4 (Ch8/9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:32,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 X5 (Ch10/11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:40,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 X6 (Ch12/13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:48,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		{
			name:"VAUX2 Pin1 X7 (Ch14/15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:56,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"24 VDC",
				1,
				"switchable",
				2,
				"off",
				],
		},
		],
	max_size:58,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"VAUX2 Pin1 X4 (Ch8/9)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 X5 (Ch10/11)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 X6 (Ch12/13)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		{
			name:"VAUX2 Pin1 X7 (Ch14/15)",
			category:"VAUX control",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"RFID diagnostics",
	mod_id:0x880000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:32,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH0 diagnosis",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:36,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:37,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:38,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH0 head",
			chan_unit:"head",
			bitOffset:39,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:295,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:294,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:293,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH1 diagnosis",
			chan_unit:"",
			bitOffset:292,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:1,
			channelNumEnd:1,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:324,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:325,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:326,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH1 head",
			chan_unit:"head",
			bitOffset:327,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:583,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:582,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:581,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH2 diagnosis",
			chan_unit:"",
			bitOffset:580,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:2,
			channelNumEnd:2,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:612,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:613,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:614,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH2 head",
			chan_unit:"head",
			bitOffset:615,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Overcurrent supply VAUX1",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:871,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:870,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:869,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"CH3 diagnosis",
			chan_unit:"",
			bitOffset:868,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:3,
			channelNumEnd:3,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:900,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:901,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:902,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"CH3 head",
			chan_unit:"head",
			bitOffset:903,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:1159,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Ext. DXP functions",
	mod_id:0x80,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Extended digital mode",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"Input filter",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"Impulse stretch (*10ms)",
			category:"DXP extended",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID control/status",
	mod_id:0x410493,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:15,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:1,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"HF compact",
				2,
				"HF extended",
				3,
				"HF bus mode",
				4,
				"UHF compact",
				5,
				"UHF extended",
				],
		},
		{
			name:"HF: Select Tag type",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:27,
			defaultValue:0,
			enumValues:
				[
				0,
				"automatic tag detection HF",
				1,
				"1: NXP Icode SLIX",
				2,
				"2: Fujitsu MB89R118",
				3,
				"3: TI Tag-it HF-I Plus",
				4,
				"4: Infineon SRF55V02P",
				5,
				"5: NXP Icode SLIX-S",
				6,
				"6: Fujitsu MB89R119",
				7,
				"7: TI Tag-it HF-I",
				8,
				"8: Infineon SRF55V10P",
				11,
				"11: NXP Icode SLIX-L",
				12,
				"12: Fujitsu MB89R112",
				13,
				"13: EM4233SLIC",
				14,
				"14: NXP SLIX2",
				15,
				"15: TI Tag-it HFI Pro",
				16,
				"16: Turck Sensor Tag",
				17,
				"17: Infineon SRF55V02S",
				18,
				"18: Infineon SRF55V10S",
				19,
				"19: EM4233",
				20,
				"20: EM4237",
				21,
				"21: EM4237 SLIC",
				22,
				"22: EM4237 SLIX",
				23,
				"23: EM4033",
				24,
				"24: reserved",
				25,
				"25: reserved",
				26,
				"26: reserved",
				27,
				"27: reserved",
				28,
				"28: reserved",
				],
		},
		{
			name:"HF: Bypass time (*1ms)",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:200,
			enumValues:
				[
				],
		},
		{
			name:"HF: Multitag",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Heart beat read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Termination active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"yes",
				1,
				"no",
				],
		},
		{
			name:"HF: Autotuning read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate HF detuned diagnostic",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:47,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Command retries at failure",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:2,
			enumValues:
				[
				],
		},
		{
			name:"HF: Command in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:72,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:1,
			enumValues:
				[
				1,
				"Inventory",
				2,
				"Read",
				3,
				"Tag info",
				4,
				"Write",
				],
		},
		{
			name:"HF: Length in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:8,
			enumValues:
				[
				],
		},
		{
			name:"HF: Address in continuous mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"HF: Idle mode",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:0,
			enumValues:
				[
				0,
				"UID",
				1,
				"8 bytes user memory",
				2,
				"UID + 8 bytes user memory",
				3,
				"UID + 64 bytes user memory",
				4,
				"deactivated",
				],
		},
		{
			name:"Activate read-write-head",
			category:"Head",
			chan_unit:"head",
			bitOffset:224,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:256,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameterization error",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Configuration via DTM active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Buffer full",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:36,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:37,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:38,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"Head",
			chan_unit:"head",
			bitOffset:39,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:295,
	},
	{
		sect_name:"Input",
		num_elems:16,
		datapoints:
		[
		{
			name:"Response code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:77,
			defaultValue:0,
			enumValues:
				[
				0,
				"0x0000 Idle",
				1,
				"0x0001 Inventory",
				2,
				"0x0002 Read",
				4,
				"0x0004 Write",
				8,
				"0x0008 Write and Verify",
				16,
				"0x0010 Continuous Mode",
				17,
				"0x0011 Get data from buffer (Continuous Mode)",
				18,
				"0x0012 Stop Continuous (Presence Sensing) Mode",
				32,
				"0x0020 UHF Continuous Presence Sensing Mode",
				64,
				"0x0040 HF Read/write head off",
				65,
				"0x0041 Read/write head identification",
				66,
				"0x0042 Get UHF read/write head status/error",
				80,
				"0x0050 Tag info",
				96,
				"0x0060 Direct read/write head command",
				112,
				"0x0070 Get HF read/write head address",
				113,
				"0x0071 Set HF read/write head address",
				128,
				"0x0080 Tune HF Read/write head",
				256,
				"0x0100 Set read/write head password",
				257,
				"0x0101 Reset read/write head password",
				258,
				"0x0102 Set tag password",
				259,
				"0x0103 Set tag protection",
				260,
				"0x0104 Get HF tag protection status",
				261,
				"0x0105 Set perma lock",
				512,
				"0x0200 Kill UHF tag",
				4096,
				"0x1000 Restore settings UHF read/write head",
				4097,
				"0x1001 Backup settings UHF read/write head",
				16385,
				"0x4001 Error - Inventory",
				16386,
				"0x4002 Error - Read",
				16388,
				"0x4004 Error - Write",
				16392,
				"0x4008 Error - Write and Verify",
				16400,
				"0x4010 Error - Continuous Mode",
				16401,
				"0x4011 Error - Get data from buffer (Continuous Mode)",
				16402,
				"0x4012 Error - Stop Continuous (Presence Sensing) Mode",
				16416,
				"0x4020 Error - UHF Continuous Presence Sensing Mode",
				16448,
				"0x4040 Error - HF Read/write head off",
				16449,
				"0x4041 Error - Read/write head identification",
				16450,
				"0x4042 Error - Get UHF read/write head status/error",
				16464,
				"0x4050 Error - Tag info",
				16480,
				"0x4060 Error - Direct read/write head command",
				16496,
				"0x4070 Error - Get HF read/write head address",
				16497,
				"0x4071 Error - Set HF read/write head address",
				16512,
				"0x4080 Error - Tune HF Read/write head",
				16640,
				"0x4100 Error - Set read/write head password",
				16641,
				"0x4101 Error - Reset read/write head password",
				16642,
				"0x4102 Error - Set tag password",
				16643,
				"0x4103 Error - Set tag protection",
				16644,
				"0x4104 Error - Get HF tag protection status",
				16645,
				"0x4105 Error - Set perma lock",
				16896,
				"0x4200 Error - Kill UHF tag",
				20480,
				"0x5000 Error - Restore settings UHF read/write head",
				20481,
				"0x5001 Error - Backup settings UHF read/write head",
				32768,
				"0x8000 Busy - Reset",
				32769,
				"0x8001 Busy - Inventory",
				32770,
				"0x8002 Busy - Read",
				32772,
				"0x8004 Busy - Write",
				32776,
				"0x8008 Busy - Write and Verify",
				32784,
				"0x8010 Busy - Continuous Mode",
				32785,
				"0x8011 Busy - Get data from buffer (Continuous Mode)",
				32786,
				"0x8012 Busy - Stop Continuous (Presence Sensing) Mode",
				32800,
				"0x8020 Busy - UHF Continuous Presence Sensing Mode",
				32832,
				"0x8040 Busy - HF Read/write head off",
				32833,
				"0x8041 Busy - Read/write head identification",
				32834,
				"0x8042 Busy - Get UHF read/write head status/error",
				32848,
				"0x8050 Busy - Tag info",
				32864,
				"0x8060 Busy - Direct read/write head command",
				32880,
				"0x8070 Busy - Get HF read/write head address",
				32881,
				"0x8071 Busy - Set HF read/write head address",
				32896,
				"0x8080 Busy - Tune HF Read/write head",
				33024,
				"0x8100 Busy - Set read/write head password",
				33025,
				"0x8101 Busy - Reset read/write head password",
				33026,
				"0x8102 Busy - Set tag password",
				33027,
				"0x8103 Busy - Set tag protection",
				33028,
				"0x8104 Busy - Get HF tag protection status",
				33029,
				"0x8105 Busy - Set perma lock",
				33280,
				"0x8200 Busy - Kill UHF tag",
				36864,
				"0x9000 Busy - Restore settings UHF read/write head",
				36865,
				"0x9001 Busy - Backup settings UHF read/write head",
				],
		},
		{
			name:"Tag present at r/w head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:32,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"HF r/w head switched on",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:40,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Continuous mode active",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:41,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Loop counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Antenna detuned at HF read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:36,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Parameter not supported by read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:37,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Error reported by read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:38,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Not connected to read/write head",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:39,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Length",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Error code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:149,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				2049,
				"Write or read error",
				8192,
				"Kill command not successful",
				8704,
				"Automatic tuning active",
				8705,
				"Tuning failed",
				8706,
				"Antenna detuned",
				9472,
				"Password function of the tag not supported",
				9473,
				"Password function not supported by read/write head",
				10496,
				"Address outside of the block limits",
				10497,
				"Length outside of the block limits",
				32768,
				"Channel not active",
				32769,
				"Read/write head not connected",
				32770,
				"Memory full",
				32771,
				"Block size of the tag not supported",
				32772,
				"Length larger than the size of the read  fragment",
				32773,
				"Length larger than the size of the write fragment",
				32774,
				"Read/write head does not support bus mode",
				32775,
				"For addressing, only one read/write head may be connected.",
				33021,
				"-Bypass time- parameter outside of the permissible range",
				33022,
				"-Address- parameter in Continuous mode outside of the permissible range",
				33023,
				"No read/write head selected",
				33024,
				"Parameter undefined",
				33025,
				"-Operating mode- outside of the permissible range",
				33026,
				"-Tag type- parameter outside of the permissible range",
				33027,
				"-Operating mode- parameter in Continuous mode outside of the permissible range",
				33028,
				"-Length- parameter in Continuous mode outside of the permissible range",
				33029,
				"Size of the write fragment outside of the permissible range",
				33030,
				"Size of the read fragment outside of the permissible range",
				33280,
				"Command code unknown",
				33281,
				"Command not supported",
				33282,
				"Command not supported in HF applications",
				33283,
				"Command not supported in UHF applications",
				33284,
				"Command for multitag application with automatic tag detection not supported",
				33285,
				"Command for applications with automatic tag detection not supported",
				33286,
				"Command only supported for applications with automatic tag detection",
				33287,
				"Command not supported for multitag application",
				33288,
				"Command not supported in HF bus mode",
				33289,
				"-Length- parameter outside of the permissible range",
				33290,
				"Address outside of the permissible range",
				33291,
				"Length and address outside of the permissible range",
				33292,
				"No tag found",
				33293,
				"Timeout",
				33294,
				"Next command not supported in multitag mode",
				33295,
				"Length of the UID outside of the permissible range",
				33296,
				"Length outside of the tag specification",
				33297,
				"Address outside of the tag specification",
				33298,
				"Length and address outside of the tag specification",
				33299,
				"Memory area of the tag outside of the permissible range",
				33300,
				"Read/write head address outside of the permissible range",
				33301,
				"Value for timeout outside of the permissible range",
				33302,
				"Command not supported outside HF bus mode",
				33303,
				"Read/write head address invalid",
				33536,
				"Continuous mode command not activated",
				33537,
				"Grouping not supported in HF applications",
				33538,
				"Grouping not supported for read commands",
				33540,
				"Grouping not supported for write commands",
				33541,
				"-HF: Length in continuous mode- breaches block boundaries",
				33542,
				"-HF: Address in continuous mode- breaches block boundaries",
				33543,
				"-HF: Length in continuous mode- outside of the permissible range",
				45128,
				"Error when switching on the HF read/write head",
				45129,
				"Error when switching off the HF read/write head",
				45152,
				"Error with the advanced parameter setting of the HF read/write head",
				45153,
				"Error with the parameter setting of the HF read/write head",
				45154,
				"Read/write head error when executing an inventory command",
				45159,
				"Read/write head error when executing a lock block command",
				45160,
				"Read/write head error when executing a read multiple block command",
				45161,
				"Read/write head error when executing a write multiple block command",
				45162,
				"Error when reading the system information",
				45163,
				"Error when reading the protection status of the tags",
				45229,
				"Error when setting the HF read/write head address",
				45235,
				"Error when setting the tag password",
				45238,
				"Error when setting the write or read protection",
				45240,
				"Error when reading the protection status of the memory area on the tag",
				45245,
				"Error when setting the transfer rate",
				45251,
				"Error when setting the password in the read/write head",
				45274,
				"Error with the -Tag in detection range-",
				45280,
				"Error when reading the HF read/write head version",
				45281,
				"Error when reading the advanced read/write head version",
				45297,
				"Error with automatic read/write head tuning",
				45304,
				"Error when resetting a command in Continuous mode",
				45306,
				"Error when outputting the response code",
				45311,
				"Error when resetting the read/write head",
				49152,
				"Internal error (response of the read/write head too short)",
				49153,
				"Command not supported by read/write head version",
				53249,
				"Error when resetting the UHF read/write head",
				53250,
				"Error when reading the UHF read/write head version",
				53251,
				"Error when reading the read/write head version when a tag is in the detection range",
				53252,
				"Error when setting the UHF read/write head address",
				53257,
				"Error with the parameter setting of the UHF read/write head",
				53258,
				"Error setting the transfer speed and the operating mode of the UHF read/write head",
				53259,
				"Error when polling",
				53261,
				"Error when reading the device status",
				53262,
				"Error when resetting the internal status bit",
				53263,
				"Error when setting the read/write head outputs and/or LEDs",
				53265,
				"Error when reading the internal malfunctions",
				53268,
				"Diagnostics error",
				53270,
				"Error with the heartbeat message",
				53271,
				"Error when outputting the user settings",
				53275,
				"Error when emptying the message memory in Polling mode",
				53377,
				"Error when switching turning on/off UHF-carrier",
				53379,
				"Error when reading from a tag",
				53380,
				"Error when writing to a tag",
				53381,
				"Software trigger error",
				53384,
				"Error with a UHF tag function",
				53504,
				"Error with the Backup function",
				53505,
				"Error with the Backup function (required memory not available)",
				53506,
				"Error when restoring a backup",
				53507,
				"Error when restoring a backup (no backup present)",
				53508,
				"Error when restoring a backup (backup data damaged)",
				53509,
				"Error when restoring the default settings",
				53510,
				"Error with the tag function",
				61441,
				"ISO 15693 Error: Command not supported",
				61442,
				"ISO 15693 Error: Command not detected, e.g. incorrect input format",
				61443,
				"ISO 15693 Error: Command option not supported",
				61455,
				"ISO 15693 Error: Undefined error",
				61456,
				"ISO 15693 Error: Addressed memory area not available",
				61457,
				"ISO 15693 Error: Addressed memory area locked",
				61458,
				"ISO 15693 Error: Addressed memory area locked and not writable",
				61459,
				"ISO 15693 Error: Write operation not successful",
				61460,
				"ISO 15693 Error: Addressed memory area could not be locked",
				61697,
				"Error on air interface: CRC error",
				61698,
				"Error on air interface: Timeout",
				61699,
				"Error on air interface: HF tag error",
				61704,
				"Error on air interface: HF tag outside of the detection range, before all commands could be executed",
				61712,
				"Error on air interface: Tag does not have the expected UID/UII",
				61953,
				"HF read/write head faulty",
				61954,
				"HF read/write head: Error in command execution",
				61956,
				"HF read/write head: Transmission window, check syntax",
				61960,
				"Power supply of the HF read/write head too low",
				61962,
				"HF read/write head: Command code unknown",
				63520,
				"UHF read/write head: The command is not implemented in this device",
				63521,
				"UHF read/write head: Unspecified error",
				63522,
				"UHF read/write head: A valid password is expected before the command is accepted",
				63524,
				"UHF read/write head: No data could be read e.g. no valid Transponder",
				63525,
				"UHF read/write head: Write operation not possible e.g. Transponder is read only",
				63526,
				"UHF read/write head: Verify after write operation failed",
				63527,
				"UHF read/write head: Access to unknown address e.g. memory area out of range",
				63528,
				"UHF read/write head: The data that should be sent is not valid",
				63530,
				"UHF read/write head: The commands needs a long time to execute",
				63532,
				"UHF read/write head: The requested object is not in the persistent memory",
				63533,
				"UHF read/write head: The requested object is not in the volatile memory",
				63541,
				"UHF read/write head: The command is temporary not allowed",
				63542,
				"UHF read/write head: The Opcode is not valid for this type of configuration memory",
				63616,
				"UHF read/write head: No transponder in field",
				63617,
				"UHF read/write head: The EPC in the command does not fit to the EPC in the air interface",
				63618,
				"UHF read/write head: Wrong transponder type in the command",
				63619,
				"UHF read/write head: No success of writing on a block",
				65534,
				"Timeout on RS485",
				65535,
				"Command aborted",
				],
		},
		{
			name:"Tag counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Data (Bytes) available",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:112,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:120,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Tag present at r/w head",
			category:"Head",
			chan_unit:"head",
			bitOffset:160,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:32,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:192,
	},
	{
		sect_name:"Output",
		num_elems:10,
		datapoints:
		[
		{
			name:"Command code",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:27,
			defaultValue:0,
			enumValues:
				[
				0,
				"0x0000 Idle",
				1,
				"0x0001 Inventory",
				2,
				"0x0002 Read",
				4,
				"0x0004 Write",
				8,
				"0x0008 Write and Verify",
				16,
				"0x0010 Continuous Mode",
				17,
				"0x0011 Get data from buffer (Continuous Mode)",
				18,
				"0x0012 Stop Continuous (Presence Sensing) Mode",
				32,
				"0x0020 UHF Continuous Presence Sensing Mode",
				64,
				"0x0040 HF Read/write head off",
				65,
				"0x0041 Read/write head identification",
				66,
				"0x0042 Get UHF read/write head status/error",
				80,
				"0x0050 Tag info",
				96,
				"0x0060 Direct read/write head command",
				112,
				"0x0070 Get HF read/write head address",
				113,
				"0x0071 Set HF read/write head address",
				128,
				"0x0080 Tune HF Read/write head",
				256,
				"0x0100 Set read/write head password",
				257,
				"0x0101 Reset read/write head password",
				258,
				"0x0102 Set tag password",
				259,
				"0x0103 Set tag protection",
				260,
				"0x0104 Get HF tag protection status",
				261,
				"0x0105 Set perma lock",
				512,
				"0x0200 Kill UHF tag",
				4096,
				"0x1000 Restore settings UHF read/write head",
				4097,
				"0x1001 Backup settings UHF read/write head",
				32768,
				"0x8000 Reset",
				],
		},
		{
			name:"Loop counter",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"UHF: Memory area",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:6,
			defaultValue:0,
			enumValues:
				[
				0,
				"Kill password",
				1,
				"EPC",
				2,
				"TID",
				3,
				"User memory",
				4,
				"Access password",
				5,
				"PC (EPC length)",
				],
		},
		{
			name:"Start address",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Length",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Length of UID/EPC",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:80,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read/write head address",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:160,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Command timeout (*1ms)",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Read fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:112,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Write fragment No.",
			category:"RFID Module",
			chan_unit:"",
			bitOffset:120,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	]
},
{
	mod_name:"RFID read data",
	mod_id:0x840080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Length of read data",
			category:"RFID read data",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:16,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input buffer byte",
			category:"Byte",
			chan_unit:"byte",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:127,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:1024,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"RFID write data",
	mod_id:0x21080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Length of write data",
			category:"RFID write data",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:16,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output buffer byte",
			category:"Byte",
			chan_unit:"byte",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:127,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:1024,
	},
	]
},
{
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:6,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Undervoltage V2",
			category:"Module state",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Module diagnostics available",
			category:"Module state",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"ARGEE program active",
			category:"Module state",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:15,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
];
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
	{name:"TBEN-LL",id:0x01580028,diags:tben_l14_gw_diags},
	{name:"TBEN-LL-4RFID",id:0x01510128,diags:tben_l14_gw_diags},

	
	{name:"BLCEN",id:0x01500021,diags:blcen_gw_diags},
	{name:"TBEN-S",id:0x01500029,diags:blcen_gw_diags},
	{name:"TBEN-AF",id:0x03500029,diags:blcen_gw_diags},
	
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
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_4IOL);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_4AI);   
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_4AO);   
	sim_slices_db=sim_slices_db.concat(modules_TBEN_S2_DIG);
	sim_slices_db=sim_slices_db.concat(modules_TBEN_L1_dig);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_L_4RFID);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_L_01);
   sim_slices_db=sim_slices_db.concat(modules_TBEN_LL_8IOL);
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
// XHR2 library from NPM
if (typeof window ==='undefined')
{
   var http_lib=(function() 
   {
     var InvalidStateError, NetworkError, ProgressEvent, SecurityError, SyntaxError, XMLHttpRequest, XMLHttpRequestEventTarget, XMLHttpRequestUpload, http, https, os, url,
       extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
       hasProp = {}.hasOwnProperty;

     XMLHttpRequestEventTarget = (function() {
       function XMLHttpRequestEventTarget() {
         this.onloadstart = null;
         this.onprogress = null;
         this.onabort = null;
         this.onerror = null;
         this.onload = null;
         this.ontimeout = null;
         this.onloadend = null;
         this._listeners = {};
       }

       XMLHttpRequestEventTarget.prototype.onloadstart = null;

       XMLHttpRequestEventTarget.prototype.onprogress = null;

       XMLHttpRequestEventTarget.prototype.onabort = null;

       XMLHttpRequestEventTarget.prototype.onerror = null;

       XMLHttpRequestEventTarget.prototype.onload = null;

       XMLHttpRequestEventTarget.prototype.ontimeout = null;

       XMLHttpRequestEventTarget.prototype.onloadend = null;

       XMLHttpRequestEventTarget.prototype.addEventListener = function(eventType, listener) {
         var base;
         eventType = eventType.toLowerCase();
         (base = this._listeners)[eventType] || (base[eventType] = []);
         this._listeners[eventType].push(listener);
         return void 0;
       };

       XMLHttpRequestEventTarget.prototype.removeEventListener = function(eventType, listener) {
         var index;
         eventType = eventType.toLowerCase();
         if (this._listeners[eventType]) {
           index = this._listeners[eventType].indexOf(listener);
           if (index !== -1) {
             this._listeners[eventType].splice(index, 1);
           }
         }
         return void 0;
       };

       XMLHttpRequestEventTarget.prototype.dispatchEvent = function(event) {
         var eventType, j, len, listener, listeners;
         event.currentTarget = event.target = this;
         eventType = event.type;
         if (listeners = this._listeners[eventType]) {
           for (j = 0, len = listeners.length; j < len; j++) {
             listener = listeners[j];
             listener.call(this, event);
           }
         }
         if (listener = this["on" + eventType]) {
           listener.call(this, event);
         }
         return void 0;
       };

       return XMLHttpRequestEventTarget;

     })();

     http = require('http');

     https = require('https');

     os = require('os');

     url = require('url');

     XMLHttpRequest = (function(superClass) {
       extend(XMLHttpRequest, superClass);

       function XMLHttpRequest(options) {
         XMLHttpRequest.__super__.constructor.call(this);
         this.onreadystatechange = null;
         this._anonymous = options && options.anon;
         this.readyState = XMLHttpRequest.UNSENT;
         this.response = null;
         this.responseText = '';
         this.responseType = '';
         this.responseURL = '';
         this.status = 0;
         this.statusText = '';
         this.timeout = 0;
         this.upload = new XMLHttpRequestUpload(this);
         this._method = null;
         this._url = null;
         this._sync = false;
         this._headers = null;
         this._loweredHeaders = null;
         this._mimeOverride = null;
         this._request = null;
         this._response = null;
         this._responseParts = null;
         this._responseHeaders = null;
         this._aborting = null;
         this._error = null;
         this._loadedBytes = 0;
         this._totalBytes = 0;
         this._lengthComputable = false;
       }

       XMLHttpRequest.prototype.onreadystatechange = null;

       XMLHttpRequest.prototype.readyState = null;

       XMLHttpRequest.prototype.response = null;

       XMLHttpRequest.prototype.responseText = null;

       XMLHttpRequest.prototype.responseType = null;

       XMLHttpRequest.prototype.status = null;

       XMLHttpRequest.prototype.timeout = null;

       XMLHttpRequest.prototype.upload = null;

       XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
         var xhrUrl;
         method = method.toUpperCase();
         if (method in this._restrictedMethods) {
           throw new SecurityError("HTTP method " + method + " is not allowed in XHR");
         }
         xhrUrl = this._parseUrl(url);
         if (async === void 0) {
           async = true;
         }
         switch (this.readyState) {
           case XMLHttpRequest.UNSENT:
           case XMLHttpRequest.OPENED:
           case XMLHttpRequest.DONE:
             null;
             break;
           case XMLHttpRequest.HEADERS_RECEIVED:
           case XMLHttpRequest.LOADING:
             null;
         }
         this._method = method;
         this._url = xhrUrl;
         this._sync = !async;
         this._headers = {};
         this._loweredHeaders = {};
         this._mimeOverride = null;
         this._setReadyState(XMLHttpRequest.OPENED);
         this._request = null;
         this._response = null;
         this.status = 0;
         this.statusText = '';
         this._responseParts = [];
         this._responseHeaders = null;
         this._loadedBytes = 0;
         this._totalBytes = 0;
         this._lengthComputable = false;
         return void 0;
       };

       XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
         var loweredName;
         if (this.readyState !== XMLHttpRequest.OPENED) {
           throw new InvalidStateError("XHR readyState must be OPENED");
         }
         loweredName = name.toLowerCase();
         if (this._restrictedHeaders[loweredName] || /^sec\-/.test(loweredName) || /^proxy-/.test(loweredName)) {
           console.warn("Refused to set unsafe header \"" + name + "\"");
           return void 0;
         }
         value = value.toString();
         if (loweredName in this._loweredHeaders) {
           name = this._loweredHeaders[loweredName];
           this._headers[name] = this._headers[name] + ', ' + value;
         } else {
           this._loweredHeaders[loweredName] = name;
           this._headers[name] = value;
         }
         return void 0;
       };

       XMLHttpRequest.prototype.send = function(data) {
         if (this.readyState !== XMLHttpRequest.OPENED) {
           throw new InvalidStateError("XHR readyState must be OPENED");
         }
         if (this._request) {
           throw new InvalidStateError("send() already called");
         }
         switch (this._url.protocol) {
           case 'file:':
             this._sendFile(data);
             break;
           case 'http:':
           case 'https:':
             this._sendHttp(data);
             break;
           default:
             throw new NetworkError("Unsupported protocol " + this._url.protocol);
         }
         return void 0;
       };

       XMLHttpRequest.prototype.abort = function() {
         if (!this._request) {
           return;
         }
         this._request.abort();
         this._setError();
         this._dispatchProgress('abort');
         this._dispatchProgress('loadend');
         return void 0;
       };

       XMLHttpRequest.prototype.getResponseHeader = function(name) {
         var loweredName;
         if (!this._responseHeaders) {
           return null;
         }
         loweredName = name.toLowerCase();
         if (loweredName in this._responseHeaders) {
           return this._responseHeaders[loweredName];
         } else {
           return null;
         }
       };

       XMLHttpRequest.prototype.getAllResponseHeaders = function() {
         var lines, name, value;
         if (!this._responseHeaders) {
           return '';
         }
         lines = (function() {
           var ref, results;
           ref = this._responseHeaders;
           results = [];
           for (name in ref) {
             value = ref[name];
             results.push(name + ": " + value);
           }
           return results;
         }).call(this);
         return lines.join("\r\n");
       };

       XMLHttpRequest.prototype.overrideMimeType = function(newMimeType) {
         if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
           throw new InvalidStateError("overrideMimeType() not allowed in LOADING or DONE");
         }
         this._mimeOverride = newMimeType.toLowerCase();
         return void 0;
       };

       XMLHttpRequest.prototype.nodejsSet = function(options) {
         var baseUrl, parsedUrl;
         if ('httpAgent' in options) {
           this.nodejsHttpAgent = options.httpAgent;
         }
         if ('httpsAgent' in options) {
           this.nodejsHttpsAgent = options.httpsAgent;
         }
         if ('baseUrl' in options) {
           baseUrl = options.baseUrl;
           if (baseUrl !== null) {
             parsedUrl = url.parse(baseUrl, false, true);
             if (!parsedUrl.protocol) {
               throw new SyntaxError("baseUrl must be an absolute URL");
             }
           }
           this.nodejsBaseUrl = baseUrl;
         }
         return void 0;
       };

       XMLHttpRequest.nodejsSet = function(options) {
         XMLHttpRequest.prototype.nodejsSet(options);
         return void 0;
       };

       XMLHttpRequest.prototype.UNSENT = 0;

       XMLHttpRequest.UNSENT = 0;

       XMLHttpRequest.prototype.OPENED = 1;

       XMLHttpRequest.OPENED = 1;

       XMLHttpRequest.prototype.HEADERS_RECEIVED = 2;

       XMLHttpRequest.HEADERS_RECEIVED = 2;

       XMLHttpRequest.prototype.LOADING = 3;

       XMLHttpRequest.LOADING = 3;

       XMLHttpRequest.prototype.DONE = 4;

       XMLHttpRequest.DONE = 4;

       XMLHttpRequest.prototype.nodejsHttpAgent = http.globalAgent;

       XMLHttpRequest.prototype.nodejsHttpsAgent = https.globalAgent;

       XMLHttpRequest.prototype.nodejsBaseUrl = null;

       XMLHttpRequest.prototype._restrictedMethods = {
         CONNECT: true,
         TRACE: true,
         TRACK: true
       };

       XMLHttpRequest.prototype._restrictedHeaders = {
         'accept-charset': true,
         'accept-encoding': true,
         'access-control-request-headers': true,
         'access-control-request-method': true,
         connection: true,
         'content-length': true,
         cookie: true,
         cookie2: true,
         date: true,
         dnt: true,
         expect: true,
         host: true,
         'keep-alive': true,
         origin: true,
         referer: true,
         te: true,
         trailer: true,
         'transfer-encoding': true,
         upgrade: true,
         'user-agent': true,
         via: true
       };

       XMLHttpRequest.prototype._privateHeaders = {
         'set-cookie': true,
         'set-cookie2': true
       };

       XMLHttpRequest.prototype._userAgent = ("Mozilla/5.0 (" + (os.type()) + " " + (os.arch()) + ") ") + ("node.js/" + process.versions.node + " v8/" + process.versions.v8);

       XMLHttpRequest.prototype._setReadyState = function(newReadyState) {
         var event;
         this.readyState = newReadyState;
         event = new ProgressEvent('readystatechange');
         this.dispatchEvent(event);
         return void 0;
       };

       XMLHttpRequest.prototype._sendFile = function() {
         if (this._url.method !== 'GET') {
           throw new NetworkError('The file protocol only supports GET');
         }
         throw new Error("Protocol file: not implemented");
       };

       XMLHttpRequest.prototype._sendHttp = function(data) {
         if (this._sync) {
           throw new Error("Synchronous XHR processing not implemented");
         }
         if ((data != null) && (this._method === 'GET' || this._method === 'HEAD')) {
           console.warn("Discarding entity body for " + this._method + " requests");
           data = null;
         } else {
           data || (data = '');
         }
         this.upload._setData(data);
         this._finalizeHeaders();
         this._sendHxxpRequest();
         return void 0;
       };

       XMLHttpRequest.prototype._sendHxxpRequest = function() {
         var agent, hxxp, request;
         if (this._url.protocol === 'http:') {
           hxxp = http;
           agent = this.nodejsHttpAgent;
         } else {
           hxxp = https;
           agent = this.nodejsHttpsAgent;
         }
         request = hxxp.request({
           hostname: this._url.hostname,
           port: this._url.port,
           path: this._url.path,
           auth: this._url.auth,
           method: this._method,
           headers: this._headers,
           agent: agent
         });
         this._request = request;
         if (this.timeout) {
           request.setTimeout(this.timeout, (function(_this) {
             return function() {
               return _this._onHttpTimeout(request);
             };
           })(this));
         }
         request.on('response', (function(_this) {
           return function(response) {
             return _this._onHttpResponse(request, response);
           };
         })(this));
         request.on('error', (function(_this) {
           return function(error) {
             return _this._onHttpRequestError(request, error);
           };
         })(this));
         this.upload._startUpload(request);
         if (this._request === request) {
           this._dispatchProgress('loadstart');
         }
         return void 0;
       };

       XMLHttpRequest.prototype._finalizeHeaders = function() {
         this._headers['Connection'] = 'keep-alive';
         this._headers['Host'] = this._url.host;
         if (this._anonymous) {
           this._headers['Referer'] = 'about:blank';
         }
         this._headers['User-Agent'] = this._userAgent;
         this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
         return void 0;
       };

       XMLHttpRequest.prototype._onHttpResponse = function(request, response) {
         var lengthString;
         if (this._request !== request) {
           return;
         }
         switch (response.statusCode) {
           case 301:
           case 302:
           case 303:
           case 307:
           case 308:
             this._url = this._parseUrl(response.headers['location']);
             this._method = 'GET';
             if ('content-type' in this._loweredHeaders) {
               delete this._headers[this._loweredHeaders['content-type']];
               delete this._loweredHeaders['content-type'];
             }
             if ('Content-Type' in this._headers) {
               delete this._headers['Content-Type'];
             }
             delete this._headers['Content-Length'];
             this.upload._reset();
             this._finalizeHeaders();
             this._sendHxxpRequest();
             return;
         }
         this._response = response;
         this._response.on('data', (function(_this) {
           return function(data) {
             return _this._onHttpResponseData(response, data);
           };
         })(this));
         this._response.on('end', (function(_this) {
           return function() {
             return _this._onHttpResponseEnd(response);
           };
         })(this));
         this._response.on('close', (function(_this) {
           return function() {
             return _this._onHttpResponseClose(response);
           };
         })(this));
         this.responseURL = this._url.href.split('#')[0];
         this.status = this._response.statusCode;
         this.statusText = http.STATUS_CODES[this.status];
         this._parseResponseHeaders(response);
         if (lengthString = this._responseHeaders['content-length']) {
           this._totalBytes = parseInt(lengthString);
           this._lengthComputable = true;
         } else {
           this._lengthComputable = false;
         }
         return this._setReadyState(XMLHttpRequest.HEADERS_RECEIVED);
       };

       XMLHttpRequest.prototype._onHttpResponseData = function(response, data) {
         if (this._response !== response) {
           return;
         }
         this._responseParts.push(data);
         this._loadedBytes += data.length;
         if (this.readyState !== XMLHttpRequest.LOADING) {
           this._setReadyState(XMLHttpRequest.LOADING);
         }
         return this._dispatchProgress('progress');
       };

       XMLHttpRequest.prototype._onHttpResponseEnd = function(response) {
         if (this._response !== response) {
           return;
         }
         this._parseResponse();
         this._request = null;
         this._response = null;
         this._setReadyState(XMLHttpRequest.DONE);
         this._dispatchProgress('load');
         return this._dispatchProgress('loadend');
       };

       XMLHttpRequest.prototype._onHttpResponseClose = function(response) {
         var request;
         if (this._response !== response) {
           return;
         }
         request = this._request;
         this._setError();
         request.abort();
         this._setReadyState(XMLHttpRequest.DONE);
         this._dispatchProgress('error');
         return this._dispatchProgress('loadend');
       };

       XMLHttpRequest.prototype._onHttpTimeout = function(request) {
         if (this._request !== request) {
           return;
         }
         this._setError();
         request.abort();
         this._setReadyState(XMLHttpRequest.DONE);
         this._dispatchProgress('timeout');
         return this._dispatchProgress('loadend');
       };

       XMLHttpRequest.prototype._onHttpRequestError = function(request, error) {
         if (this._request !== request) {
           return;
         }
         this._setError();
         request.abort();
         this._setReadyState(XMLHttpRequest.DONE);
         this._dispatchProgress('error');
         return this._dispatchProgress('loadend');
       };

       XMLHttpRequest.prototype._dispatchProgress = function(eventType) {
         var event;
         event = new ProgressEvent(eventType);
         event.lengthComputable = this._lengthComputable;
         event.loaded = this._loadedBytes;
         event.total = this._totalBytes;
         this.dispatchEvent(event);
         return void 0;
       };

       XMLHttpRequest.prototype._setError = function() {
         this._request = null;
         this._response = null;
         this._responseHeaders = null;
         this._responseParts = null;
         return void 0;
       };

       XMLHttpRequest.prototype._parseUrl = function(urlString) {
         var absoluteUrlString, index, password, user, xhrUrl;
         if (this.nodejsBaseUrl === null) {
           absoluteUrlString = urlString;
         } else {
           absoluteUrlString = url.resolve(this.nodejsBaseUrl, urlString);
         }
         xhrUrl = url.parse(absoluteUrlString, false, true);
         xhrUrl.hash = null;
         if (xhrUrl.auth && ((typeof user !== "undefined" && user !== null) || (typeof password !== "undefined" && password !== null))) {
           index = xhrUrl.auth.indexOf(':');
           if (index === -1) {
             if (!user) {
               user = xhrUrl.auth;
             }
           } else {
             if (!user) {
               user = xhrUrl.substring(0, index);
             }
             if (!password) {
               password = xhrUrl.substring(index + 1);
             }
           }
         }
         if (user || password) {
           xhrUrl.auth = user + ":" + password;
         }
         return xhrUrl;
       };

       XMLHttpRequest.prototype._parseResponseHeaders = function(response) {
         var loweredName, name, ref, value;
         this._responseHeaders = {};
         ref = response.headers;
         for (name in ref) {
           value = ref[name];
           loweredName = name.toLowerCase();
           if (this._privateHeaders[loweredName]) {
             continue;
           }
           if (this._mimeOverride !== null && loweredName === 'content-type') {
             value = this._mimeOverride;
           }
           this._responseHeaders[loweredName] = value;
         }
         if (this._mimeOverride !== null && !('content-type' in this._responseHeaders)) {
           this._responseHeaders['content-type'] = this._mimeOverride;
         }
         return void 0;
       };

       XMLHttpRequest.prototype._parseResponse = function() {
         var arrayBuffer, buffer, i, j, jsonError, ref, view;
         if (Buffer.concat) {
           buffer = Buffer.concat(this._responseParts);
         } else {
           buffer = this._concatBuffers(this._responseParts);
         }
         this._responseParts = null;
         switch (this.responseType) {
           case 'text':
             this._parseTextResponse(buffer);
             break;
           case 'json':
             this.responseText = null;
             try {
               this.response = JSON.parse(buffer.toString('utf-8'));
             } catch (error1) {
               jsonError = error1;
               this.response = null;
             }
             break;
           case 'buffer':
             this.responseText = null;
             this.response = buffer;
             break;
           case 'arraybuffer':
             this.responseText = null;
             arrayBuffer = new ArrayBuffer(buffer.length);
             view = new Uint8Array(arrayBuffer);
             for (i = j = 0, ref = buffer.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
               view[i] = buffer[i];
             }
             this.response = arrayBuffer;
             break;
           default:
             this._parseTextResponse(buffer);
         }
         return void 0;
       };

       XMLHttpRequest.prototype._parseTextResponse = function(buffer) {
         var e;
         try {
           this.responseText = buffer.toString(this._parseResponseEncoding());
         } catch (error1) {
           e = error1;
           this.responseText = buffer.toString('binary');
         }
         this.response = this.responseText;
         return void 0;
       };

       XMLHttpRequest.prototype._parseResponseEncoding = function() {
         var contentType, encoding, match;
         encoding = null;
         if (contentType = this._responseHeaders['content-type']) {
           if (match = /\;\s*charset\=(.*)$/.exec(contentType)) {
             return match[1];
           }
         }
         return 'utf-8';
       };

       XMLHttpRequest.prototype._concatBuffers = function(buffers) {
         var buffer, j, k, len, len1, length, target;
         if (buffers.length === 0) {
           return new Buffer(0);
         }
         if (buffers.length === 1) {
           return buffers[0];
         }
         length = 0;
         for (j = 0, len = buffers.length; j < len; j++) {
           buffer = buffers[j];
           length += buffer.length;
         }
         target = new Buffer(length);
         length = 0;
         for (k = 0, len1 = buffers.length; k < len1; k++) {
           buffer = buffers[k];
           buffer.copy(target, length);
           length += buffer.length;
         }
         return target;
       };

       return XMLHttpRequest;

     })(XMLHttpRequestEventTarget);

     
     XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;

     SecurityError = (function(superClass) {
       extend(SecurityError, superClass);

       function SecurityError() {
         SecurityError.__super__.constructor.apply(this, arguments);
       }

       return SecurityError;

     })(Error);

     XMLHttpRequest.SecurityError = SecurityError;

     InvalidStateError = (function(superClass) {
       extend(InvalidStateError, superClass);

       function InvalidStateError() {
         InvalidStateError.__super__.constructor.apply(this, arguments);
       }

       return InvalidStateError;

     })(Error);

     InvalidStateError = (function(superClass) {
       extend(InvalidStateError, superClass);

       function InvalidStateError() {
         return InvalidStateError.__super__.constructor.apply(this, arguments);
       }

       return InvalidStateError;

     })(Error);

     XMLHttpRequest.InvalidStateError = InvalidStateError;

     NetworkError = (function(superClass) {
       extend(NetworkError, superClass);

       function NetworkError() {
         NetworkError.__super__.constructor.apply(this, arguments);
       }

       return NetworkError;

     })(Error);

     XMLHttpRequest.SyntaxError = SyntaxError;

     SyntaxError = (function(superClass) {
       extend(SyntaxError, superClass);

       function SyntaxError() {
         SyntaxError.__super__.constructor.apply(this, arguments);
       }

       return SyntaxError;

     })(Error);

     ProgressEvent = (function() {
       function ProgressEvent(type) {
         this.type = type;
         this.target = null;
         this.currentTarget = null;
         this.lengthComputable = false;
         this.loaded = 0;
         this.total = 0;
       }

       ProgressEvent.prototype.bubbles = false;

       ProgressEvent.prototype.cancelable = false;

       ProgressEvent.prototype.target = null;

       ProgressEvent.prototype.loaded = null;

       ProgressEvent.prototype.lengthComputable = null;

       ProgressEvent.prototype.total = null;

       return ProgressEvent;

     })();

     XMLHttpRequest.ProgressEvent = ProgressEvent;

     XMLHttpRequestUpload = (function(superClass) {
       extend(XMLHttpRequestUpload, superClass);

       function XMLHttpRequestUpload(request) {
         XMLHttpRequestUpload.__super__.constructor.call(this);
         this._request = request;
         this._reset();
       }

       XMLHttpRequestUpload.prototype._reset = function() {
         this._contentType = null;
         this._body = null;
         return void 0;
       };

       XMLHttpRequestUpload.prototype._setData = function(data) {
         var body, i, j, k, offset, ref, ref1, view;
         if (typeof data === 'undefined' || data === null) {
           return;
         }
         if (typeof data === 'string') {
           if (data.length !== 0) {
             this._contentType = 'text/plain;charset=UTF-8';
           }
           this._body = new Buffer(data, 'utf8');
         } else if (Buffer.isBuffer(data)) {
           this._body = data;
         } else if (data instanceof ArrayBuffer) {
           body = new Buffer(data.byteLength);
           view = new Uint8Array(data);
           for (i = j = 0, ref = data.byteLength; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
             body[i] = view[i];
           }
           this._body = body;
         } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
           body = new Buffer(data.byteLength);
           offset = data.byteOffset;
           view = new Uint8Array(data.buffer);
           for (i = k = 0, ref1 = data.byteLength; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
             body[i] = view[i + offset];
           }
           this._body = body;
         } else {
           throw new Error("Unsupported send() data " + data);
         }
         return void 0;
       };

       XMLHttpRequestUpload.prototype._finalizeHeaders = function(headers, loweredHeaders) {
         if (this._contentType) {
           if (!('content-type' in loweredHeaders)) {
             headers['Content-Type'] = this._contentType;
           }
         }
         if (this._body) {
           headers['Content-Length'] = this._body.length.toString();
         }
         return void 0;
       };

       XMLHttpRequestUpload.prototype._startUpload = function(request) {
         if (this._body) {
           request.write(this._body);
         }
         request.end();
         return void 0;
       };

       return XMLHttpRequestUpload;

     })(XMLHttpRequestEventTarget);

     XMLHttpRequest.XMLHttpRequestUpload = XMLHttpRequestUpload;
     
     return{
        XMLHttpRequest:XMLHttpRequest,
     }
   }()); 

   XMLHttpRequest=http_lib.XMLHttpRequest;
}
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
 *  DESCRIPTION: Common configuration variables for the ARGEE IDE
 *
 *******************************************************************************/

var argee_interscan_delay=2; // time in ms
var show_warning_on_close=false;
var nst_inst_trace_buf=128; // bytes (has to be a power of 2)
var max_prog_traces=50;
var left_col_width=35;
//var font_family='Times New Roman';
var font_family='Helvetica, "Helvetica Neue", Arial, sans-serif';
//var font_family='Arial';
var hmi_font_family='Arial';
var display_import_file_info=true;
var argee_modbus_tcp_connection_timeout=10; // time in sec 
var experimental_toggle_add_button_below=true;
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
 *  DESCRIPTION: ARGEE Parser. Tokenizes the ST source code and generates AST
 *               out of it. 
 *
 *******************************************************************************/
var st_preproc_inst; 


 var ARGEE_nst_parse=(function()
{ 

var globals;
// for connecting ARGEE view errors to NST compiled errors
var argee_to_nst_line_mapping=[];

function addArgeeLineMapping(str,line)
{
	var arr=JSON.parse(str);
	var vis_elem_type=arr[0];
	var vis_elem_item=arr[1];
	var index=arr[2];
	argee_to_nst_line_mapping[line]={vis_elem_type:vis_elem_type,vis_elem_item:vis_elem_item,index:index};
}

function getNST_Prog_Line_From_ARGEE(item_num)
{
	var i,k;
	for(k in argee_to_nst_line_mapping)
	{
		i=parseInt(k);
		if ((argee_to_nst_line_mapping[i].vis_elem_type==1)&&
		    (argee_to_nst_line_mapping[i].vis_elem_item==item_num))
			{
				return i;
			}
	}
	return -1;
}

function getARGEE_Prog_Line_From_NST(line)
{
	if (argee_to_nst_line_mapping[line]!=undefined)
	{
		if (argee_to_nst_line_mapping[line].vis_elem_type==0)
		{
			var curr_line=line+1;
			while(curr_line<argee_to_nst_line_mapping.length)
			{
				if ((argee_to_nst_line_mapping[curr_line]!=undefined)&&(argee_to_nst_line_mapping[curr_line].vis_elem_type==1))
				{
					break;
				}
				curr_line++;
			}
			if (argee_to_nst_line_mapping[curr_line]==undefined)
			{
				return -1;
			}
			else
			{
				return argee_to_nst_line_mapping[curr_line].vis_elem_item
			}
		}
		return argee_to_nst_line_mapping[line].vis_elem_item
	}
	return -1;
}

function getARGEE_ElemIndexFromARGEE_Line(argee_type,argee_line)
{
	var i,k;
	for(k in argee_to_nst_line_mapping)
	{
		i=parseInt(k);
		if ((argee_to_nst_line_mapping[i].vis_elem_type==argee_type)&&
		    (argee_to_nst_line_mapping[i].vis_elem_item==argee_line))
			{
				return argee_to_nst_line_mapping[i].index;
			}
	}
	return -1;
}



/*var enum_list=[];

function addToEnumList(val)
{
	enum_list[enum_list.length]=val;
}
*/

function getStandaloneCompilerRemappingInfo(line_in_st)
{
   var mapped_argee_elem=argee_to_nst_line_mapping[line_in_st];
   var file_name=mapped_argee_elem.vis_elem_type;
   var line_num=mapped_argee_elem.vis_elem_item;
   return {file_name:file_name,line_num:line_num};
}
      
function getElemIndexFromNST_Line(line)
{
	var mapped_argee_elem=argee_to_nst_line_mapping[line];
	var item_index=getARGEE_ElemIndexFromARGEE_Line(mapped_argee_elem.vis_elem_type,mapped_argee_elem.vis_elem_item);
	return item_index;
}   

function setErrMsg(e)
{
	var mapped_argee_elem=argee_to_nst_line_mapping[token_start_line];
	if (mapped_argee_elem==undefined)
	{
		mapped_argee_elem=argee_to_nst_line_mapping[token_start_line-1];
	}
	if (mapped_argee_elem!=undefined)
	{
      if (typeof window === 'undefined') 
      {
         // standalone ST compiler
         var file_name=mapped_argee_elem.vis_elem_type;
         var line_num=mapped_argee_elem.vis_elem_item;
         setCompilerMessage(false,true,"Error: "+(e.err_msg)+" File : \""+file_name+"\" Line number:"+line_num);
      }
      else
      {         
         var err_item_index=getARGEE_ElemIndexFromARGEE_Line(mapped_argee_elem.vis_elem_type,mapped_argee_elem.vis_elem_item);
         if (mapped_argee_elem.vis_elem_type==0)
         {
            var elem_descr=DESCR.getVarElemAndLineFromIndex(err_item_index);
            if (elem_descr[1].length>0)
            {
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Variable Definition:  "+(elem_descr[0])+" . "+(elem_descr[1])+"</b>");
            }
            else
            {
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Variable Definition:  "+(elem_descr[0])+"</b>");
            }
         }
         else
         {
            
            var last_part=DESCR.indexToDotString(err_item_index.slice(3));
            var elem=DESCR.getElemFromIndex(err_item_index.slice(0,2));
            var func_block_name;
            if (elem.type==DESCR.block_types.hmi)
            {
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Program</b> HMI element: <b>"+ (last_part)+"</b>");
            }
            else
            {
               func_block_name=DESCR.getElemFromIndex(err_item_index.slice(0,2)).values[0];
               if (func_block_name==default_task_type)
               {
                  func_block_name=default_task_replace_type;
               }
               setCompilerMessage(false,true,"Error: "+(e.err_msg) + " in the <b>Program</b> Function Block: <b>"+func_block_name+"</b> element: <b>"+ (last_part)+"</b>");
            }
         }
         DESCR.showErrorLine(err_item_index,mapped_argee_elem.vis_elem_type);
      }

	}
	else
	{
		setCompilerMessage(false,true,"Error: "+(e.err_msg)+" ST Line number:"+token_start_line);
	}
}

var indiv_expr_mode=false;

	
function parseIndivExpression(str,mode)
{
	argee_to_nst_line_mapping=[];
    str=str.replace(/\r\n/g,"\n");
    str=str.replace(/\r/g," ");
	file=str.split("\n");
	enum_list=[];
	curr_char_pos=-1;
	curr_line=0;
	indiv_expr_mode=true;
	tokens_capitalized=mode;
	expr_nesting=0;
	try
	{
		getNextChar();
		getNextToken();
		obj=parseExpression();
		globals=obj;
	}
	catch(e)
	{
		setErrMsg(e);
      if (debug_console==true)
      {
         console.log("Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1));
      }
		tokens_capitalized=true;
		return null;
	}
	tokens_capitalized=true;
	return globals;
}

var parse_pass;


function parseProjectOnePass(str,mode)
{
	var updated_str=str;
	st_preproc_inst=undefined;
	preproc_defines="";
	parse_pass=1;
	return parse_imp(str,mode);
	
	
}

var after_preprocessor=null;
var test_js_preproc_html=null;
function getProprocessedInput()
{
	return after_preprocessor;
}
function getTestJsHTML()
{
	return test_js_preproc_html;
}
	
function parseProject(str,mode)
{
	st_preproc_inst=undefined;
	preproc_defines="";
	parse_pass=1;
	after_preprocessor=str;
	test_js_preproc_html=null;
	if (parse_imp(str,mode)!=null)
	{
		if (preproc_defines.length>0)
		{
			var newScript;
			try 
			{
				if (hmi_debug_renderes==false)
				{
					standalone_hmi_custom_renderers={};
					standalone_hmi_custom_renderers.dummy_func=function(){};
				}
				var str1="function st_preproc(){"+preproc_defines+"}; st_preproc_inst=new st_preproc();";
				
				test_js_preproc_html="<html><head><script>\r\n"+str1+"\r\n</script></head><body><div id=\"test_id\"></div><script>\r\nvar test_data=st_preproc_inst.Run(\"HMI_BEGIN    END_HMI  \");\r\n var elem=document.getElementById(\"test_id\").innerText=test_data;\r\n</script></body></html>";
				
				if (typeof window === 'undefined') 
				{
					// nodeJS
					eval(str1);
					if (st_preproc_inst.Run!=undefined)
					{
						after_preprocessor=st_preproc_inst.Run(str);
					}
					
				}
				else
				{					
					var head = document.getElementsByTagName('head')[0];
					
					newScript = document.createElement("script");
					var inlineScript = document.createTextNode(str1);
					newScript.appendChild(inlineScript); 
					head.appendChild(newScript);
					if (st_preproc_inst.Run!=undefined)
					{
						after_preprocessor=st_preproc_inst.Run(str);
					}
				}
				//newScript.parentNode.removeChild( newScript );
			}
			catch (e) 
			{
				if (typeof window === 'undefined') 
				{
					// nodeJS
				}
				else
				{
					newScript.parentNode.removeChild( newScript );
				}
				if (e instanceof SyntaxError) 
				{
					alert(e.message);
				}
				setCompilerMessage(false,true,"Preprocessor Error: "+(e.message));
				return null;
			}
			//console.log(after_preprocessor);
		}
	}
	else
	{
		return null;
	}
	preproc_defines="";
	parse_pass=2;
	return parse_imp(after_preprocessor,mode);
}	

function parse_imp(str,mode)
{
	argee_to_nst_line_mapping=[];
    str=str.replace(/\r\n/g,"\n");
    str=str.replace(/\r/g," ");
	
    
	file=str.split("\n");
	enum_list=[];
	curr_char_pos=-1;
	curr_line=0;
	indiv_expr_mode=false;
	tokens_capitalized=mode;
	expr_nesting=0;
   token_start_line=0;
   var_mode_assignment=false;
   const_strings=[];
   const_num=[];

	try
	{
		getNextChar();
		getNextToken();
		obj=parseProgram();
		globals=obj;
	}
	catch(e)
	{
		setErrMsg(e);
      if (debug_console==true)
      {
         console.log("Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1));
      }
		//var res_inner=this.document.getElementById("comp_res_id");
		//res_inner.innerHTML="Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1);
		tokens_capitalized=true;
		return null;
	}
	tokens_capitalized=true;
	return globals;
	//quickPrintAST(globals);
}

var token_types=
{
	COMMA:100+0,
	COLUMN:100+1,
	SEMICOL:100+2,
	LEFT_SQ_BRACKET:100+3,
	RIGHT_SQ_BRACKET:100+4,
	COMMENT_LINE:100+5,
	LEFT_ROUND_BRACKET:100+6,
	RIGHT_ROUND_BRACKET:100+7,
	ASSIGNMENT:100+8,
	PLUS:100+9,
	MINUS:100+10,
	RANGE:100+11,
	DOT:100+12,
	LESS_EQ:100+13,
	NOT_EQ:100+14,
	LESS:100+15,
	BIGGER:100+16,
	BIGGER_OR_EQ:100+17,
	//DIVIDE:100+18,
	MULT:100+19,
	EQ:100+20,

	/*DIV_SYM:100+11,
	MOD_SYM:100+12,
	*/
	

	IDENT:200,
	INT_CONST:201,
	STR_CONST:202,
	FLOAT_CONST:203,
	HEX_CONST:204,
	
	// fixed tokens
	//PROGRAM:300+0,
	//END_PROGRAM:300+1,
	FUNCTION_BLOCK:300+2,
	END_FUNCTION_BLOCK:300+3,
	VAR:300+4,
	END_VAR:300+5,
	VAR_INPUT:300+6,
	VAR_OUTPUT:300+7,
	VAR_INOUT:300+8,
	

	// PLC VARs are defined as regular variables of a type sructure which is initialized at compile time.
	// The special structure defines the PLC variable and its elements
	// PLC variables are: ARGEE_TO_PLC_BIT,ARGEE_TO_PLC_WORD,PLC_TO_ARGEE_BIT,PLC_TO_ARGEE_WORD,
	
	IF:300+10,
	THEN:300+11,
	ELSE:300+12,
	ELSIF:300+13,
	END_IF:300+14,
	WHILE:300+15,
	DO:300+16,
	END_WHILE:300+17,
	ARRAY:300+18,
	OF:300+19,
	AND:300+20,
	OR:300+21,
	NOT:300+22,
	DIV:300+23,
	VAR_TASK:300+24,
	VAR_RETAIN:300+25,
	WAIT_UNTIL:300+26,
	STRING:300+27,
	MOD:300+28,
	FOR_LOOP:300+29,
	END_FOR:300+30,
	TO:300+31,
	CONDITIONAL_EXEC_BEGIN:300+32,
	CONDITIONAL_EXEC_END:300+33,
	VAR_MODULE:300+34,
	// floating point internal tokens
	F_ADD:400+1,
	F_MULT:400+2,
	F_DIV:400+3,
	F_SUB:400+4,
	F_LESS_EQ:     400+13,
	F_NOT_EQ:      400+14,
	F_LESS:        400+15,
	F_BIGGER:      400+16,
	F_BIGGER_OR_EQ:400+17,
	F_MULT:        400+19,
	F_EQ:          400+20,
	//F_NEG:         400+21, // do I need this?
	
	TASK_BEGIN: 500+0,
	END_TASK:500+1,

	
	
	JSON_INPUT:500+2,
	PREPROC_GEN:500+3,
	PREPROC_RUN:500+4,
	AUTO_START_TASK_BEGIN: 500+5,
	
	
	ENUM_BEGIN:600+0,
	ENUM_END:600+1,
	FUNCTION_BLOCK_GROUP_BEGIN:600+2,
	FUNCTION_BLOCK_GROUP_END:600+3,
	MODULE:600+4,
	
	BITFIELD_FUNCT_BLOCK:600+5,
	
	
	HMI_BEGIN:700+0,
	END_HMI:700+1,
	HMI_SCREEN_BEGIN:700+2,
	END_HMI_SCREEN:700+3,
	HMI_SECTION_BEGIN:700+4,
	END_HMI_SECTION:700+5,
	HMI_GRID_SCREEN:700+14,
	END_HMI_GRID_SCREEN:700+15,
	HMI_GRID_ROW:700+16,
	END_HMI_GRID_ROW:700+17,
	HMI_GRID_SECTION:700+18,
	END_HMI_GRID_SECTION:700+19,
	HMI_IMAGE_GROUP:700+20,
	END_HMI_IMAGE_GROUP:700+21,
	HMI_BLOCK:700+22,
	END_HMI_BLOCK:700+23,

	HMI_BLOCK_SCREEN:700+24,
	END_HMI_BLOCK_SCREEN:700+25,
	
	HMI_BLOCK_FUNCT_BLOCK:700+26,
	HMI_CONTROL_FUNCT_BLOCK:700+27,

	
	COMMENT_BEGIN:800+0,
	COMMENT_END:800+1,
	
	STRUCT_BEGIN:800+2,
	STRUCT_END:800+3,

	FUNCTION_BEGIN:800+4,
	FUNCTION_END:800+5,

	PROCEDURE_BEGIN:800+6,
	PROCEDURE_END:800+7,


};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  Start of Tokenizer  !!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var keyword_elements=
[

	{elem:token_types.AND,sym:"&"},
	{elem:token_types.OR,sym:"|"},
	{elem:token_types.NOT,sym:"!"},
	{elem:token_types.MOD,sym:"%"},
	{elem:token_types.AND,sym:"AND"},
	{elem:token_types.OR,sym:"OR"},
	{elem:token_types.NOT,sym:"NOT"},
	{elem:token_types.MOD,sym:"MOD"},

	/*{elem:token_types.PROGRAM,sym:"PROGRAM"},
	{elem:token_types.END_PROGRAM,sym:"END_PROGRAM"},*/
	{elem:token_types.FUNCTION_BLOCK,sym:"FUNCTION_BLOCK"},
	{elem:token_types.END_FUNCTION_BLOCK,sym:"END_FUNCTION_BLOCK"},
	{elem:token_types.VAR,sym:"VAR"},
	{elem:token_types.END_VAR,sym:"END_VAR"},
	{elem:token_types.VAR_INPUT,sym:"VAR_INPUT"},
	{elem:token_types.VAR_OUTPUT,sym:"VAR_OUTPUT"},
	{elem:token_types.VAR_INOUT,sym:"VAR_INOUT"},
	{elem:token_types.VAR_TASK,sym:"VAR_TASK"},
	{elem:token_types.VAR_MODULE,sym:"VAR_MODULE"},
	{elem:token_types.VAR_RETAIN,sym:"VAR_RETAIN"},
	{elem:token_types.IF,sym:"IF"},
	{elem:token_types.THEN,sym:"THEN"},
	{elem:token_types.ELSE,sym:"ELSE"},
	{elem:token_types.ELSIF,sym:"ELSIF"},
	{elem:token_types.END_IF,sym:"END_IF"},
	{elem:token_types.WHILE,sym:"WHILE"},
	{elem:token_types.DO,sym:"DO"},
	{elem:token_types.END_WHILE,sym:"END_WHILE"},
	{elem:token_types.ARRAY,sym:"ARRAY"},
	{elem:token_types.OF,sym:"OF"},
	{elem:token_types.WAIT_UNTIL,sym:"WAIT_UNTIL"},
	{elem:token_types.STRING,sym:"STRING"},
// all other token symbols	
	{elem:token_types.COMMA,sym:","},
	{elem:token_types.COLUMN,sym:":"},
	{elem:token_types.SEMICOL,sym:";"},
	{elem:token_types.LEFT_SQ_BRACKET,sym:"["},
	{elem:token_types.RIGHT_SQ_BRACKET,sym:"]"},
	{elem:token_types.COMMENT_LINE,sym:"//"},
	{elem:token_types.LEFT_ROUND_BRACKET,sym:"("},
	{elem:token_types.RIGHT_ROUND_BRACKET,sym:")"},
	{elem:token_types.ASSIGNMENT,sym:":="},
	{elem:token_types.IDENT,sym:"Identifier"},
	{elem:token_types.INT_CONST,sym:"Integer Constant"},
	{elem:token_types.STR_CONST,sym:"String Constant"},
	{elem:token_types.FLOAT_CONST,sym:"Real Constant"},
	
	

	
	
	{elem:token_types.PLUS,sym:"+"},
	{elem:token_types.MINUS,sym:"-"},
	{elem:token_types.DIV,sym:"/"},
	{elem:token_types.DIV,sym:"DIV"},
	{elem:token_types.MULT,sym:"*"},
	{elem:token_types.EQ,sym:"="},
	{elem:token_types.LESS_EQ,sym:"<="},
	{elem:token_types.NOT_EQ,sym:"<>"},
	{elem:token_types.LESS,sym:"<"},
	{elem:token_types.BIGGER,sym:">"},
	{elem:token_types.BIGGER_OR_EQ,sym:">="},

	{elem:token_types.F_ADD,sym:" _f+"},
	{elem:token_types.F_SUB,sym:" _f-"},
	{elem:token_types.F_DIV,sym:" _f/"},
	{elem:token_types.F_MULT,sym:" _f*"},
	{elem:token_types.F_EQ,sym:" _f="},
	{elem:token_types.F_LESS_EQ,sym:" _f<="},
	{elem:token_types.F_NOT_EQ,sym:" _f<>"},
	{elem:token_types.F_LESS,sym:" _f<"},
	{elem:token_types.F_BIGGER,sym:" _f>"},
	{elem:token_types.F_BIGGER_OR_EQ,sym:" _f>="},

	{elem:token_types.JSON_INPUT,sym:"JSON_INPUT"},
	{elem:token_types.ENUM_BEGIN,sym:"ENUM"},
	{elem:token_types.ENUM_END,sym:"END_ENUM"},

	{elem:token_types.FUNCTION_BLOCK_GROUP_BEGIN,sym:"FUNCTION_BLOCK_GROUP"},
	{elem:token_types.FUNCTION_BLOCK_GROUP_END,sym:"END_FUNCTION_BLOCK_GROUP"},
	{elem:token_types.MODULE,sym:"LIBRARY"},
	{elem:token_types.MODULE,sym:"MODULE"},

	
	{elem:token_types.TASK_BEGIN,sym:"TASK"},
	{elem:token_types.AUTO_START_TASK_BEGIN,sym:"AUTO_STARTING_TASK"},
	
	{elem:token_types.END_TASK,sym:"END_TASK"},

	{elem:token_types.HMI_BEGIN,sym:"HMI_BEGIN"},
	{elem:token_types.END_HMI,sym:"END_HMI"},
	{elem:token_types.HMI_SCREEN_BEGIN,sym:"HMI_SCREEN"},
	{elem:token_types.END_HMI_SCREEN,sym:"END_HMI_SCREEN"},
	{elem:token_types.HMI_SECTION_BEGIN,sym:"HMI_SECTION"},
	{elem:token_types.END_HMI_SECTION,sym:"END_HMI_SECTION"},
	
	
	{elem:token_types.HMI_GRID_SCREEN,sym:"HMI_GRID_SCREEN"},
	{elem:token_types.END_HMI_GRID_SCREEN,sym:"END_HMI_GRID_SCREEN"},
	{elem:token_types.HMI_GRID_ROW,sym:"HMI_GRID_ROW"},
	{elem:token_types.END_HMI_GRID_ROW,sym:"END_HMI_GRID_ROW"},
	{elem:token_types.HMI_GRID_SECTION,sym:"HMI_GRID_SECTION"},
	{elem:token_types.END_HMI_GRID_SECTION,sym:"END_HMI_GRID_SECTION"},
	{elem:token_types.HMI_IMAGE_GROUP,sym:"HMI_IMAGE_GROUP"},
	{elem:token_types.END_HMI_IMAGE_GROUP,sym:"END_HMI_IMAGE_GROUP"},
	{elem:token_types.HMI_BLOCK,sym:"HMI_BLOCK"},
	{elem:token_types.END_HMI_BLOCK,sym:"END_HMI_BLOCK"},

	{elem:token_types.HMI_BLOCK_SCREEN,sym:"HMI_BLOCK_SCREEN"},
	{elem:token_types.END_HMI_BLOCK_SCREEN,sym:"END_HMI_BLOCK_SCREEN"},
	
	
	{elem:token_types.COMMENT_BEGIN,sym:"COMMENT_BEGIN"},
	{elem:token_types.COMMENT_END,sym:"COMMENT_END"},
	{elem:token_types.FOR_LOOP,sym:"FOR"},
	{elem:token_types.END_FOR,sym:"END_FOR"},
	{elem:token_types.TO,sym:"TO"},



	
	
	
	{elem:token_types.CONDITIONAL_EXEC_BEGIN,sym:"CONDITIONAL_EXEC_BEGIN"},
	{elem:token_types.CONDITIONAL_EXEC_END,sym:"CONDITIONAL_EXEC_END"},


	{elem:token_types.HMI_BLOCK_FUNCT_BLOCK,sym:"HMI_BLOCK_FUNCT_BLOCK"},
	{elem:token_types.HMI_CONTROL_FUNCT_BLOCK,sym:"HMI_CONTROL_FUNCT_BLOCK"},
	{elem:token_types.BITFIELD_FUNCT_BLOCK,sym:"BITFIELD_FUNCT_BLOCK"},
	{elem:token_types.STRUCT_BEGIN,sym:"STRUCT"},
	{elem:token_types.STRUCT_END,sym:"END_STRUCT"},

	{elem:token_types.FUNCTION_BEGIN,sym:"FUNCTION"},
	{elem:token_types.FUNCTION_END,sym:"END_FUNCTION"},


	{elem:token_types.PROCEDURE_BEGIN,sym:"PROCEDURE"},
	{elem:token_types.PROCEDURE_END,sym:"END_PROCEDURE"},

];

function findKeywordIndex(str)
{
	var i;
	for(i=0;i<keyword_elements.length;i++)
	{
		if (str.toUpperCase()==keyword_elements[i].sym)
		{
			return i;
		}
	}
	return -1;
}

function getOpName(op)
{
	var i;
	for(i=0;i<keyword_elements.length;i++)
	{
		if (keyword_elements[i].elem==op)
		{
			return keyword_elements[i].sym+ " ";
		}
	}
}


var next_char;
var next_token;
var next_token_suppliment;
var next_token_non_capitalized;



var file=[];
var curr_char_pos;
var curr_line;

/*var exceptions=
{
	END_OF_FILE:-1,
	INVALID_TOKEN:1,
	ERROR:2,
	NOT_YET:3,
};
*/


function UserException(err_msg)
{
	this.err_msg=err_msg;
}

function getTokenStartLine()
{
	return token_start_line;
}

function stopCompilation(err_msg,elem)
{
	if (elem!=undefined)
	{
		token_start_line=elem.line_num;
	}
	/*else
	{
		token_start_line--;
	}*/
	throw new UserException(err_msg);
}

var save_curr_line;
var save_curr_char_pos;

function saveParsePoint()
{
	save_curr_line=curr_line;
	save_curr_char_pos=curr_char_pos;
}

function restoreParsePoint()
{
	curr_line=save_curr_line;
	curr_char_pos=save_curr_char_pos;
}

// Ideas for the tokenizer and parser are taken from https://github.com/dincho/mini-pascal-compiler/commits/master
function getNextChar(pass_eol)
{
	if ((curr_char_pos+1)>file[curr_line].length)
	{
		curr_line++;
		curr_char_pos=0;
	}
	else
	{
		curr_char_pos++;
	}
	if (curr_char_pos>=file[curr_line].length)
	{
		// mark end of line with space
		if (curr_line==(file.length-1))
		{
			
			next_char=-1;
			return;
			//stopCompilation(exceptions.END_OF_FILE);
		}
		else if (pass_eol!=undefined)
		{
			next_char='\n';
			return;
		}
		next_char=' ';
		return;
	}
	if (curr_line>=file.length)
	{
		next_char=-1;
		return;
		//stopCompilation(exceptions.END_OF_FILE);
	}
	next_char=file[curr_line].charAt(curr_char_pos);
}

function lookupNextSameLine()
{
	if ((curr_char_pos+1)>=file[curr_line].length)
	{
		return ' ';
	}
	else
	{
		return file[curr_line].charAt(curr_char_pos+1);
	}
}

var token_start_line=0;

var tokens_capitalized=true;
function setParseCapitalization(mode)
{
	tokens_capitalized=mode;
}

function parseIdentOrKeyword()
{
	var token_string="";
	var ind;
	
	while(1)
	{
		if (((next_char>='a')&&(next_char<='z'))||
	        ((next_char>='A')&&(next_char<='Z'))||
			((next_char>='0')&&(next_char<='9'))||
			(next_char=='_')
			)
		{
			
			token_string+=next_char;
			getNextChar();
		}
		else
		{
			break;
		}
	}
	if (tokens_capitalized==true)
	{
		next_token_non_capitalized=token_string;
		token_string=token_string.toUpperCase();
	}
	if ((ind=findKeywordIndex(token_string))==-1)
	{
		next_token=token_types.IDENT;
		next_token_suppliment=token_string;
	}
	else
	{
		next_token=keyword_elements[ind].elem;
	}
}

function parseFloatOrInt()
{
	var state=0;
	var stop=false;
	var save_token_str;
	var num_start=curr_char_pos;
    var token_string=""; 
	var prev_char="";
	var pos_cnt=0;
	
	while(stop==false)
	{
		switch(state)
		{
			case 0:
				// whole number
				if ((next_char>='0')&&(next_char<='9'))
				{
					prev_char=next_char;
					saveParsePoint();
					getNextChar();
					pos_cnt++;
				}
				else if (next_char=='x')
				{
					if ((pos_cnt==1)&&(prev_char=='0'))
					{
						saveParsePoint();
						getNextChar();
						state=16;
						break;
					}
					else
					{
						stop=true;
						break;
					}
				}
				else if (next_char=='.')
				{
					
					save_token_str=token_string;
					getNextChar();
					if ((next_char>='0')&&(next_char<='9'))
					{
						saveParsePoint();
						getNextChar();
					}
					else
					{
						stop=true;
						break;
					}
					state=1;
					break;
				}
				else
				{
					stop=true;
					break;
				}
				break;
			case 1:
			    // decimal
				if ((next_char>='0')&&(next_char<='9'))
				{
					saveParsePoint();
					getNextChar();
				}
				else if (next_char=='e')
				{
					getNextChar();
					if ((next_char=='+')||(next_char=='-'))
					{
						getNextChar();
					}
					else if ((next_char>='0')&&(next_char<='9'))
					{
						saveParsePoint();
						getNextChar();
					}
					else
					{
						stop=true;
						break;
					}
					state=2;
					break;
				}
				else
				{
					stop=true;
					break;
				}
				break;
			case 2:
				if ((next_char>='0')&&(next_char<='9'))
				{
					saveParsePoint();
					getNextChar();
				}
				else
				{
					stop=true;
					break;
				}
				break;
			case 16:
				if (((next_char>='0')&&(next_char<='9'))||
				    ((next_char>='A')&&(next_char<='F'))||	
					((next_char>='a')&&(next_char<='f')))
				{
					saveParsePoint();
					getNextChar();
				}
				else
				{
					stop=true;
					break;
				}
		}
	}
	restoreParsePoint();
	token_string="";
	for(i=num_start;i<=curr_char_pos;i++)
	{
		token_string+=file[curr_line].charAt(i);
	}
	getNextChar();
	if (state==0)
	{
		next_token=token_types.INT_CONST;
	}
	else if (state==16)
	{
		var num=parseInt(token_string,16);
		next_token=token_types.HEX_CONST;
		token_string=num.toString();
	}
	else
	{
		next_token=token_types.FLOAT_CONST;
	}
	next_token_suppliment=token_string;
}

/*function parseNumber()
{
	var token_string="";
	var fp=false;
	while(1)
	{
		if ((next_char>='0')&&(next_char<='9'))
		{
			token_string+=next_char;
			getNextChar();
		}
		else if (next_char=='.')
		{
			fp=true;
			token_string+=next_char;
			getNextChar();
		}
		else if (next_char=='e')
		{
			fp=true;
			token_string+=next_char;
			getNextChar();
			// add +,- or char
			token_string+=next_char;
			getNextChar();
		}
		else
		{
			break;
		}
	}
	if (fp==true)
	{
		next_token=token_types.FLOAT_CONST;
	}
	else
	{	
		next_token=token_types.INT_CONST;
	}
	next_token_suppliment=token_string;
}*/	


function parseString(multi_line)
{
	var token_string="";
	var pass_eol=undefined;
	if (multi_line==true)
	{
		pass_eol=true;
	}
	getNextChar(pass_eol);
	var start_str_line=curr_line;
	while(1)
	{
		if ((start_str_line!=curr_line)&&(multi_line==false))
		{
			stopCompilation("Can not have multi-line strings");
		}
		if (next_char=='\\')
		{
			getNextChar(pass_eol);
			token_string+='\\';
			token_string+=next_char;
		}
		else if (next_char=='\"')
		{
			getNextChar(pass_eol);
			break;
		}
		else
		{
			token_string+=next_char;
		}
		getNextChar(pass_eol);
	}
	next_token=token_types.STR_CONST;
	next_token_suppliment=token_string;
}

var token_start_line;
var token_start_pos;
var token_real_start_line;
var token_real_start_pos;
var preproc_defines;

function getNextToken()
{
	token_start_line=curr_line;
	token_start_pos=curr_char_pos;
	while(1)
	{
		if ((next_char!=' ')&&(next_char!='\t'))
		{
			break;
		}
		getNextChar();
	}
	if (next_char==-1)
	{
		// end of file
		next_token=-1;
		return;
	}
	token_real_start_line=curr_line;
	token_real_start_pos=curr_char_pos;
	if (next_char=='/')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;


		getNextChar();
		if (next_char=='/')
		{
			// skip the rest of the line
			curr_line++;
			curr_char_pos=0;
			next_char=file[curr_line].charAt(curr_char_pos);
			getNextToken();
		}
		else
		{
			next_token=token_types.DIV;
		}
		return;
	}
	if (next_char=='{')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		getNextChar();
		next_token_suppliment="";
		while (next_char!='}')
		{
			next_token_suppliment+=next_char;
			getNextChar();
		}
		getNextChar();
		addArgeeLineMapping(next_token_suppliment,curr_line);
		getNextToken();
		return;
	}
	if (next_char=="#")
	{
		// preprocessor
		var token_gen_preproc=false;
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		getNextChar();
		next_token_suppliment="";
		while (1)
		{
			next_token_suppliment+=next_char;
			getNextChar();
			if (next_char=='#')
			{
				getNextChar();
				if (next_char=='#')
				{
					break;
				}
				else
				{
					next_token_suppliment+"#";
				}
			}
		}
		
		var token_end_line=curr_line;
		var token_end_pos=curr_char_pos;
		var token_lines="";
		{
			var i;
			for(i=token_start_line+1;i<token_end_line;i++)
			{
				token_lines+=file[i]+"\r\n";
			}
		}
		next_token_suppliment=token_lines;
		
		
		/*if (next_token_suppliment.startsWith("GENERATE"))
		{
			token_gen_preproc=true;
			next_token_suppliment=next_token_suppliment.slice(8);
			preproc_defines+=next_token_suppliment;
		}*/
		// check if it is definition of preorcessor items or execution
		
		getNextChar();
		getNextToken();
		/*if (next_token==token_types.SEMICOL)
		{
			//remove last semicol after hash
			getNextToken();
		}
		if ((parse_pass==2)&&(token_gen_preproc==false))
		{
			eval(next_token_suppliment);
			var result_of_exec=st_preproc_inst.str_result;	
		}*/
		return;
	}
	if (next_char=='(')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		getNextChar();
		if (next_char=='*')
		{
			// comment skipping mode;
			while(1)
			{
				getNextChar();
				if ((next_char=='*')&&(lookupNextSameLine()==')'))
				{
					getNextChar();
					getNextChar();
					break;
				}
			}
			// comment skipped
			getNextToken();
		}
		else
		{
			next_token=token_types.LEFT_ROUND_BRACKET;
		}
		return;
	}
	else if (((next_char>='a')&&(next_char<='z'))||
	    ((next_char>='A')&&(next_char<='Z'))
		||(next_char=='_'))
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;
		

		parseIdentOrKeyword();
		return;
	}
	else if ((next_char>='0')&&(next_char<='9'))
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		parseFloatOrInt();
		return;
	}
	else if (next_char=='\"')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		parseString(false);
		return;
	}
	else if (next_char==':')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be : or :=
		getNextChar();
		if (next_char!='=')
		{
			next_token=token_types.COLUMN;
		}
		else
		{
			next_token=token_types.ASSIGNMENT;
			getNextChar();
		}
		return;
	}
	else if (next_char=='.')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be . or ..
		getNextChar();
		if (next_char!='.')
		{
			next_token=token_types.DOT;
		}
		else
		{
			next_token=token_types.RANGE;
			getNextChar();
		}
		return;
	}
	else if (next_char=='<')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be < or <= or <>
		getNextChar();
		if (next_char=='=')
		{
			next_token=token_types.LESS_EQ;
			getNextChar();
		}
		else if (next_char=='>')
		{
			next_token=token_types.NOT_EQ;	
			getNextChar();
		}
		else
		{
			next_token=token_types.LESS;
		}
		return;
	}		
	else if (next_char=='>')
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		// could be > or >=
		getNextChar();
		if (next_char=='=')
		{
			next_token=token_types.BIGGER_OR_EQ;
			getNextChar();
		}
		else
		{
			next_token=token_types.BIGGER;
		}
		return;
	}		
	else
	{
		token_start_line=curr_line;
		token_start_pos=curr_char_pos;

		
		switch(next_char)
		{
			case '&':next_token=token_types.AND; break;
			case '|':next_token=token_types.OR; break;
			case '!':next_token=token_types.NOT; break;
			case '%':next_token=token_types.MOD; break;


		
			case '+':next_token=token_types.PLUS; break;
			case '-':next_token=token_types.MINUS; break;
			//case '/':next_token=token_types.DIV; break;
			case '*':next_token=token_types.MULT; break;
			case ';':next_token=token_types.SEMICOL; break;
			case ',':next_token=token_types.COMMA; break;
			case '=':next_token=token_types.EQ; break;
			//case '(':next_token=token_types.LEFT_ROUND_BRACKET; break;
			case ')':next_token=token_types.RIGHT_ROUND_BRACKET; break;
			case '[':next_token=token_types.LEFT_SQ_BRACKET; break;
			case ']':next_token=token_types.RIGHT_SQ_BRACKET; break;
			// default: run function which throws and exception
		}
		getNextChar();
		return;
	}
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  End of Tokenizer  !!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!  Start of Parser !!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/*
	   <expression>		::=	 <AND_expression> 
	   <AND_expression>     ::= <OR_expression> { AND <OR_expression>}
	   <OR_expression>     ::= <REL_expression> { OR <REL_expression>}
	   <REL_expression>		::=	 <simple_expression> |
	                             <simple_expression> <relation operator> <simple_expression>
       <simple_expression>	::=	<sign><term> { <operator plus><term> }
       <term>			::=	<factor> { <operator multiply><factor> }
       <factor>			::=	<variable>
       					| <constant>
       					| ( <expression> )
       					| NOT <factor>
       <relation operator>		::=	= | <> | < | <= | >= | >
       <sign>			::=	+ | - | <empty>
       <operator plus>		::=	+ | - 
       <operator multiply>	::=	* | DIV 
       <variable>		::=	<simple variable>
       					| <index variable>
       <index variable>		::=	<variable array> 	[ <expression> ]
       <variable array>		::=	<simple variable>
       <simple variable>	::=	<identifier of variable>
       <identifier of variable>	::=	<identifier>
*/


var ELEM=
{
	EXPR:0,
	CONST:1,
	EXPR_VAR:2,
	EXPR_IDENT:3,
	EXPR_VAR_ARR_IND:4,
	FUNC:5,
	FUNC_ARGS:6,
	FUNCT_BLOCK:7,
	FUNC_BLOCK_CALL:8,
	OP:9,
	PROGRAM:10,
	FUCT_BLOCK_LIST:13,
	VAR_SEGM:14,
	STATEMENT_LIST:15,
	IF:16,
	WHILE:17,
	VAR_REG:18,
	VAR_ARR:19,
	ASSIGN:20,
	FUNC_BLOCK_NAME:21,
	FUNC_BLOCK_ARG_LIST:22,
	FUNC_BLOCK_VAR_ASSIGN:23,
	VAR_SEGM_LIST:24,
	EXPR_VAR_OFFSET:25,
	WAIT_UNTIL:26,
	ELEM_PREEMPTION_POINT:27,
	ELEM_RETURN:28,
	ELEM_FUNC_BLOCK_PROLOGUE:29,
	ELEM_CONTEXT_SWITCH:30,
	CONST_STR:31,
	TO_FLOAT:32,
	TO_INT:33,
	CONST_INT:34,
	FUNC_NO_RETURN:35,
	TASK:36,
	ENUM_ELEM:37,
	ENUM_OBJ:38,
	HMI:39,
	HMI_SCREEN:40,
	HMI_SECTION:41,
	COMMENT:42,
	TRACE:43,
	LADDER_TRACE:44,
	FUNCTION_BLOCK_GROUP:45,
	LADDER_COMMENT:46,
	COMMENT_BLOCK:47,
	COMMENT_VAR:48,
	CONST_INT_ARR:49,
	FOR_LOOP:50,
	LADDER_FUNC_BLOCK_CALL:51,

	HMI_GRID_SCREEN:56,
	HMI_GRID_ROW:57,
	HMI_GRID_SECTION:58,
	HMI_IMAGE_GROUP:58,
	MODULE:59,
	PREPROC_GEN:60,
	PREPROC_EXEC:61,
	HMI_BLOCK:62,	
	HMI_BLOCK_ELEMENTS:63,
	HMI_BLOCK_SCREEN:64,	
}

function setObjType(obj,str,enm,dont_reset_line_counter)
{
	obj.str_type=str;
	obj.enum_type=enm;
	if (dont_reset_line_counter!=true)
	{
		obj.line_num=token_start_line;
	}
}

function extractExpression(pos_arr,include_comments)
{
	var i,j;
	var str="";
	var in_comment=false; 
	for(i=pos_arr[0];i<=pos_arr[2];i++)
	{
		var start_str_pos=0;
		var end_str_pos=file[i].length;
		if (i==pos_arr[0])
		{
			start_str_pos=pos_arr[1];
			if (pos_arr[0]==pos_arr[2])
			{
				end_str_pos=pos_arr[3];
			}
		}
		else if (i==pos_arr[2])
		{
			end_str_pos=pos_arr[3];
		}
		in_comment=false;
		for(j=start_str_pos;j<end_str_pos;j++)
		{
			if ((file[i].charAt(j)=='{')&&(include_comments==false))
			{
				in_comment=true;
			}
			else if (in_comment==false)
			{
				str+=file[i].charAt(j);
			}
			else if (file[i].charAt(j)=='}')
			{
				in_comment=false;
			}
		}
		if (i<pos_arr[2])
		{
			str+="\r\n";
		}
	}
	return str;
	//console.log(str);
}
var expr_nesting=0;
function parseExpression()
{
	var expr;
	var obj=new Object();
	var start_expr_line=token_start_line;
	var start_expr_pos=token_start_pos;
	expr_nesting++;
	expr=parseAND_Expression();
	/*if (
	     (next_token==token_types.EQ)||
		 (next_token==token_types.NOT_EQ)||
		 (next_token==token_types.LESS)||
		 (next_token==token_types.LESS_EQ)||
		 (next_token==token_types.BIGGER)||
		 (next_token==token_types.BIGGER_OR_EQ)
	   )
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		obj.list[0]=expr;
		obj.list[1]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token},
		getNextToken();
		expr=parseSimpleExpression();
		obj.list[2]=expr;
		obj.elem_pos_in_text=[start_expr_line,start_expr_pos,token_real_start_line,token_real_start_pos];
		obj.elem_string=extractExpression(obj.elem_pos_in_text);
		obj.expr_nesting=expr_nesting;
		expr_nesting--;
		return obj;
		
	}
	else*/
	{
		expr.elem_pos_in_text=[start_expr_line,start_expr_pos,token_real_start_line,token_real_start_pos];
		if (expr.elem_pos_in_text[0]!=expr.elem_pos_in_text[2])
		{
			var jk=1;
		}
      if ((expr.list!=undefined)&&(expr.list.length==1)&&(expr.list[0].const_type!=undefined)&&
         (expr.list[0].const_type==CONST_TYPE.STR))
      {
            expr.elem_string=expr.list[0].const_val;
      }
      else
      {
         expr.elem_string=extractExpression(expr.elem_pos_in_text,false);
      }
		expr.expr_nesting=expr_nesting;
		expr_nesting--;
		return expr;
	}
}

function parseAND_Expression()
{
	var obj=new Object();
	var i;
	var or_expr=parseOR_Expression();
	if (next_token==token_types.AND)
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=or_expr;i++
		while (next_token==token_types.AND)
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			or_expr=parseOR_Expression();
			obj.list[i]=or_expr;i++;
		}
		return obj;
	}
	else
	{
		return or_expr;
	}
}

function parseOR_Expression()
{
	var obj=new Object();
	var i;
	var rel_expr=parseREL_Expression();
	if (next_token==token_types.OR)
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=rel_expr;i++
		while (next_token==token_types.OR)
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			rel_expr=parseREL_Expression();
			obj.list[i]=rel_expr;i++;
		}
		return obj;
	}
	else
	{
		return rel_expr;
	}
}


function parseREL_Expression()
{
	var obj=new Object();
	var i;
	var rel_expr=parseSimpleExpression();
	if (
		 (next_token==token_types.EQ)||
		 (next_token==token_types.NOT_EQ)||
		 (next_token==token_types.LESS)||
		 (next_token==token_types.LESS_EQ)||
		 (next_token==token_types.BIGGER)||
		 (next_token==token_types.BIGGER_OR_EQ)
	   )
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=rel_expr;i++
		obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
		getNextToken();	
		rel_expr=parseSimpleExpression();
		obj.list[i]=rel_expr;i++;
		return obj;
	}
	else
	{
		return rel_expr;
	}
}


function parseSimpleExpression()
{
	var obj=new Object();
	var term;
	var compound=false;
	var i;
	
	if ((next_token==token_types.PLUS)||(next_token==token_types.MINUS)||(next_token==token_types.NOT))
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[0]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
		compound=true;
		getNextToken();	
	}
	term=parseTerm();
	if ((next_token==token_types.PLUS)||(next_token==token_types.MINUS))
	{
		if (compound==false)
		{
			setObjType(obj,"EXPR",ELEM.EXPR);
			obj.list=[];
			i=0;
		}
		obj.list[i]=term;i++
		
		while ((next_token==token_types.PLUS)||(next_token==token_types.MINUS))
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			term=parseTerm();
			obj.list[i]=term;i++;
		}
		return obj;
	}
	else
	{
		if (compound==false)
		{
			return term;
		}
		else
		{
			obj.list[i]=term;i++
			return obj;
		}
	}
}

function parseTerm()
{
	var obj=new Object();
	var i;
	var factor;
	factor=parseFactor();
	if ((next_token==token_types.MULT)||(next_token==token_types.DIV)||(next_token==token_types.MOD))
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]=factor;i++;
		
		while ((next_token==token_types.MULT)||(next_token==token_types.DIV)||(next_token==token_types.MOD))
		{
			obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
			getNextToken();	
			factor=parseFactor();
			obj.list[i]=factor;i++;
		}
		return obj;
	}
	else
	{
		return factor;
	}
}



function parseFactor()
{
	var obj=new Object();
	var i;
	if (next_token==token_types.IDENT)
	{
		var v=parseVariableOrFunction(null,false,true);
		/*obj.type="variable or function";
		obj.data=v;*/
		return v;
	}
	if (next_token==token_types.STR_CONST)
	{
		var v=parseConstStrVar();
		return v;	
	}
	if (next_token==token_types.FLOAT_CONST)
	{
		var v=parseConstFloatVar();
		return v;	
	}
    
	if ((next_token==token_types.INT_CONST)||(next_token==token_types.HEX_CONST))
	{
		// Handle ...
		setObjType(obj,"CONST",ELEM.CONST);
		obj.data=next_token_suppliment;

		if (next_token==token_types.HEX_CONST)
		{
			obj.hex=true;
		}
		getNextToken();	
		return obj;
	}
	if ((next_token==token_types.MINUS)||(next_token==token_types.PLUS))
    {
        setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		obj.list[0]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};
		getNextToken();	
        obj.list[1]=parseFactor();
        return obj;
    }
	if (next_token==token_types.LEFT_ROUND_BRACKET)
	{
		var expr;
		getNextToken();	
		expr=parseExpression();
		/*obj.type="nested expression";
		obj.data=expr;
		match(token_types.RIGHT_ROUND_BRACKET);
		return obj;
		*/
		match(token_types.RIGHT_ROUND_BRACKET);
		return expr;
	}
	if (next_token==token_types.NOT)
	{
		setObjType(obj,"EXPR",ELEM.EXPR);
		obj.list=[];
		i=0;
		obj.list[i]={enum_type:ELEM.OP,str_type:getOpName(next_token),data:next_token};i++;
		getNextToken();	
		obj.list[i]=parseFactor();
		return obj;
	}
	else
	{
		if (next_token==token_types.RIGHT_ROUND_BRACKET)
		{
			stopCompilation("Empty expression is not allowed");
		}
		else
		{
			stopCompilation("Invalid token '"+getOpName(next_token)+"'");
		}
	}
}

function getConstStringName(str)
{
	var i;
	for(i=0;i<const_strings.length;i++)
	{
		if (const_strings[i].val==str)
		{
			return const_strings[i].name;
		}
	}
	var len=const_strings.length;
	const_strings[len]={name:"___CONST_STR_"+len,val:str};
	return const_strings[len].name;
}	


var var_mode_assignment=false;
var CONST_TYPE=
{
	STR:0,
	NUM:1,
};

function parseConstStrVar()
{
	var obj=new Object();
	var i;
	setObjType(obj,"EXPR_VAR",ELEM.EXPR_VAR);
	obj.list=[];
	i=0;
	var obj1=new Object();
	if (var_mode_assignment==true)
	{
		setObjType(obj1,"CONST_STR",ELEM.CONST_STR);
		obj1.data=next_token_suppliment;
		getNextToken();	
		return obj1;
	}
	else
	{
		var obj1=new Object();
		setObjType(obj1,"EXPR_VAR",ELEM.EXPR_VAR);
		obj1.data=getConstStringName(next_token_suppliment);
		obj1.const_type=CONST_TYPE.STR;
		obj1.const_val="\""+next_token_suppliment+"\"";
		obj1.const_elem=true;
		obj.list[i]=obj1;
		
		
		getNextToken();	
	}
	return obj;
}


function getConstFloatName(str)
{
	var arr=new ArrayBuffer(4);
	var dt=new DataView(arr);