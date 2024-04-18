/********************************************************************************
 *
 * Copyright (c) 2013 by TUSA
 *
 ********************************************************************************
 *
 *  Initial Author       : Pao Yang, Roman Glistvain
 *  Maintainers          : Roman Glistvain
 *
 *
 ********************************************************************************
 *
 *  DESCRIPTION: Editor
 *
 *******************************************************************************/

var IO_Config = (function ()
{
	var rw_render_mode=false;
	function setRW_RenderMode(rw_render)
	{
		rw_render_mode=rw_render;
	}

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

	
	function loadParams()
	{
		var localSt_Elems=[];
		var str=getLocalStorage("params");
		if ((str==undefined)||(str==null))
		{
			return;
		}
		var res=JSON.parse(str);
		for(var i=0;i<slices.length;i++)
		{
			var arr=regArrayToArrayBuffer(res[i]);
			var arr_obj=GOM.getObjArr("ARGEE_IO_PARAM",i);
			if (arr_obj!=undefined)
			{
				if (arr_obj.byteLength==arr.byteLength)
				{
					GOM.setObjArr("ARGEE_IO_PARAM",i,arr);
				}
			}
		}
	}
	
	function saveToLocalStorage()
	{
		var elems=[];
		for(var i=0;i<slices.length;i++)
		{
			var arr=GOM.getObjArr("ARGEE_IO_PARAM",i);
			elems[i]=arrayBuffertoRegArr(arr);
		}
		var str=JSON.stringify(elems);
		setLocalStorage("params",str);
	}

	function renderParamConfigScreen()
	{
		setRW_RenderMode(true);
		BEP_RenderSlavesMenu();
		BEP_RenderParams(1,slices,GOM);

	}

	function BEP_GetObjectFormIdStr(slotNum, bitOffset, bitLen, dataType, prefix, suffix)
	{
		var GOM_OID = 1;
		var retStr = " id=\"" + prefix + slotNum + "|" + bitOffset + "|" + bitLen + "|" + dataType + suffix + "\"";
		return retStr;
	}

	//*********************************************************************************
	// Render the BEP slaves navigation menu
	//*********************************************************************************
	function BEP_RenderSlavesMenu()
	{
		var HTMLContent = "";
		var slotNum;
		var chanNumOffset;


		HTMLContent += "<h3><ul>"
		// loop through module list per device
		for (var j = 0; j < slices.length; j++)
		{
			// do we need to display this module on the web?
			var special_name=SIM.getSlotName(j,true);
			HTMLContent += "<li>";
			if (special_name==("Slot"+j))
			{
				HTMLContent += "<a href=\"\" onclick=\"IO_CONF.BEP_RenderParams(" + j + ",slices,GOM);return false;\">Slot " + j + "  -  " + slices[j].name + "</a>";
			}
			else
			{
				HTMLContent += "<a href=\"\" onclick=\"IO_CONF.BEP_RenderParams(" + j + ",slices,GOM);return false;\">"+ special_name + "</a>";
			}
			HTMLContent += "</li>";
		}
		HTMLContent += "</ul></h3>"
		window.document.getElementById('vars').innerHTML = HTMLContent;
	}

	var IODBDataType =
	{
		INT : 0,
		ENUM : 1,
		BITMAP : 2
	};

	var act_datapoint;
	
	//*********************************************************************************
	// Render BEP's slave module data points
	//*********************************************************************************
	function BEP_RenderParams(slot,slices,gom)
	{
		var HTMLContent = "";
		var slotNum;
		var moduleID;
		var param_sect = sect_type.param;


		// get information from hash
		slotNum = slot;
		var dv = gom.getValDataView("ARGEE_IO_PARAM", slotNum);

		/*for (var i = 0; i < slices[slot].sections.length; i++)
		{
			if (slices[slot].sections[i].type == sect_type.param)
			{
				param_sect = i;
				break;
			}
		}
*/
		if (slices[slot].sections[param_sect].objects.length == 0)
		{
			if (rw_render_mode==true)
			{
				window.document.getElementById('prog').innerHTML = "<h1>No Parameters in this slot!</h1>";
			}
			return HTMLContent;
		}

		// render I/O data's header table
		if (rw_render_mode==true)
		{
			HTMLContent += "<form name=\"GOMDataForm\" id=\"GOMDataForm\"\">";
		}
		HTMLContent += "<table class=\"sect_data_tbl\"><tbody>";
		var special_name=SIM.getSlotName(slotNum,true);
		var header_size="h2";
		if (rw_render_mode==false)
		{
			header_size="h4";
		}
		if (special_name==("Slot"+slotNum))
		{
			
			HTMLContent += "<tr><td class=\"headerText\"><"+header_size+">" + " Slot " + slotNum + " > " + slices[slot].name+" Parameters</"+header_size+">";
		}
		else
		{
			HTMLContent += "<tr><td class=\"headerText\"><"+header_size+">" + special_name +" Parameters</"+header_size+">";
		}
		HTMLContent += "<hr width=\"100%\" align=\"left\" /></td></tr>";
		HTMLContent += "<tr><td><table class=\"sect_data_tbl\" style=\"border:0px solid; width:1%;\"></tbody>";

		// loop through all data-points and render only data-points that are associated to the current loop's channel number.
		// remember, channel -1 means global data-point
		var channel_change_detected=true;
		var prev_channel=-1;
		for (var j = 0; j < slices[slot].sections[param_sect].objects.length; j++)
		{
			/*if (slices[slot].sections[param_sect].objects[j].channel==-1)
			{
				channel_change_detected=true;
			}
			else */if (slices[slot].sections[param_sect].objects[j].channel!=prev_channel)
			{
				prev_channel=slices[slot].sections[param_sect].objects[j].channel;
				channel_change_detected=true;
			}
			else
			{
				channel_change_detected=false;
			}
			if (channel_change_detected==true)
			{
				//HTMLContent += "<tr><td colspan=\"2\" style=\"border-top:1px solid #000000; height:0%; padding-top:4px;\"></td></tr>";
				if (rw_render_mode==true)
				{
					HTMLContent += "<tr><td colspan=\"2\"><font size=\"2\">&nbsp</font></td></tr>";
				}
			}

			act_datapoint=slices[slot].sections[param_sect].objects[j];

			// render data-point for the current loop's channel number
			if (slices[slot].sections[param_sect].objects[j].dataType == IODBDataType.INT)
			{
				HTMLContent += BEP_RenderIntObject(slotNum, param_sect, slices[slot].sections[param_sect].objects[j].offset, slices[slot].sections[param_sect].objects[j].length, slices[slot].sections[param_sect].objects[j].name,dv);
			}
			else if (slices[slot].sections[param_sect].objects[j].dataType == IODBDataType.ENUM)
			{
				HTMLContent += BEP_RenderEnumObject(slotNum, param_sect, slices[slot].sections[param_sect].objects[j].offset, slices[slot].sections[param_sect].objects[j].length, slices[slot].sections[param_sect].objects[j].name,slices[slot].sections[param_sect].objects[j].enumList,dv);
			}
			else if (slices[slot].sections[param_sect].objects[j].dataType == IODBDataType.BITMAP)
			{
				if (slices[slot].sections[param_sect].objects[j].length == 1)
				{
					HTMLContent += BEP_RenderBitmapObject(slotNum, param_sect, slices[slot].sections[param_sect].objects[j].offset, slices[slot].sections[param_sect].objects[j].name,dv);
				}
			}
		}

		//HTMLContent += "<tr><td colspan=\"2\" style=\"border-bottom:1px solid #000000; height:0%;\"></td></tr>";
		// render I/O data's footer table
		HTMLContent += "</tbody></table></td></tr>";
		HTMLContent += "</tbody></table>"
		if (rw_render_mode==true)
		{
			HTMLContent += "</form>";
		}

		// render new HTML contents
		if (rw_render_mode==true)
		{
			window.document.getElementById('prog').innerHTML = HTMLContent;
		}
		return HTMLContent;
	}

	//*********************************************************************************
	// Render integer data object type
	//*********************************************************************************
	function BEP_RenderIntObject(slotNum, dataSect, bitOffset, bitLen, dataPointName,dv)
	{
		var objDataValue;
		var objDataByteLen;
		var objName = "";
		var HTMLContent = "";

		// get data view of the raw data of the data section

		// determine byte length of the integer for validation purpose
		if (bitLen <= 8)
		{
			objDataByteLen = 1;
		}
		else if (bitLen <= 16)
		{
			objDataByteLen = 2;
		}
		else if (bitLen <= 24)
		{
			objDataByteLen = 3;
		}
		else
		{
			objDataByteLen = 4;
		}

		// get object's integer value
		objDataValue = ToInteger(GetArrValue(dv, bitOffset, bitLen));
		if (rw_render_mode==false)
		{
			// only show non-default objects in print preview
			if (act_datapoint.defaultValue==objDataValue)
			{
				return HTMLContent;
			}
		}
		
		var disabled="";
		if (rw_render_mode==false)
		{
			disabled="disabled";
		}

		// get object's name
		objName += dataPointName;

		// Render the object's name
		HTMLContent += "<tr><td class=\"first_column\">" + objName + "</td><td class=\"noWrapValignTop\">";

		// Render the object's value
		HTMLContent += "<input  "+disabled+"  type=\"text\"" + BEP_GetObjectFormIdStr(slotNum, bitOffset, bitLen, IODBDataType.INT, "", "") + " value=\"" + objDataValue + "\" data-elem_len=\"" + objDataByteLen + "\""+
		"onblur=\"IO_CONF.handleChange(this)\""+
		 "/>";

		// close table row
		HTMLContent += "</td></tr>";

		// return HTML string
		return HTMLContent;
	}

	//*********************************************************************************
	// Render ENUM data object type
	//*********************************************************************************
	function BEP_RenderEnumObject(slotNum, dataSect, bitOffset, bitLen, dataPointName, enumList,dv)
	{
		var objDataValue;
		var objName = "";
		var HTMLContent = "";

		// get data view of the raw data of the data section

		// get object's integer value
		objDataValue = ToInteger(GetArrValue(dv, bitOffset, bitLen));

		
		if (rw_render_mode==false)
		{
			// only show non-default objects in print preview
			if (act_datapoint.defaultValue==objDataValue)
			{
				return HTMLContent;
			}
		}

		
		// get the selected ENUM index
		var enumSelectedIndex = 0;
		for (var i = 0; i < enumList.length; i++)
		{
			if (enumList[i].val == objDataValue)
			{
				enumSelectedIndex = i;
				break;
			}
		}

		// get object's name
		objName += dataPointName;
		
		var disabled="";
		if (rw_render_mode==false)
		{
			disabled="disabled";
		}

		// Render the object's name
		HTMLContent += "<tr><td class=\"first_column\">" + objName + "</td><td class=\"noWrapValignTop\">";

		// Render the object's value
			HTMLContent += "<SELECT  "+disabled+" " + BEP_GetObjectFormIdStr(slotNum,  bitOffset, bitLen, IODBDataType.ENUM, "", "") + 
			"onchange=\"IO_CONF.handleChange(this)\""+
			">";
			for (var i = 0; i < enumList.length; i++)
			{
				HTMLContent += "<OPTION VALUE=\"";
				if (enumList[i].val == -1)
				{
					HTMLContent += i;
				}
				else
				{
					HTMLContent += enumList[i].val;
				}
				HTMLContent += "\"";

				if (i == enumSelectedIndex)
				{
					HTMLContent += " SELECTED";
				}
				HTMLContent += ">" + enumList[i].str + "</OPTION>";
			}
			HTMLContent += "</SELECT>";

		// close table row
		HTMLContent += "</td></tr>";

		// return HTML string
		return HTMLContent;
	}

	//*********************************************************************************
	// Render BITMAP data object type
	//*********************************************************************************
	function BEP_RenderBitmapObject(slotNum, dataSect, bitOffset, dataPointName,dv)
	{
		var objDataValue;
		var objName = "";
		var HTMLContent = "";

		// get data view of the raw data of the data section
		

		// get object's integer value
		objDataValue = ToInteger(GetArrValue(dv, bitOffset, 1));

		if (rw_render_mode==false)
		{
			// only show non-default objects in print preview
			if (act_datapoint.defaultValue==objDataValue)
			{
				return HTMLContent;
			}
		}
		
		// get object's name
		objName += dataPointName;

		// Render the object's name
		HTMLContent += "<tr><td class=\"first_column\">" + objName + "</td><td class=\"noWrapValignTop\">";

		var disabled="";
		if (rw_render_mode==false)
		{
			disabled="disabled";
		}
		
		// Render the object's value
		HTMLContent += "<input "+disabled+" type=\"checkbox\"" + BEP_GetObjectFormIdStr(slotNum,  bitOffset, 1, IODBDataType.BITMAP, "", "") +
		"onchange=\"IO_CONF.handleChange(this)\"";
		if (objDataValue == 1)
		{
			HTMLContent += " checked=\"checked\"";
		}
		
		HTMLContent += "/>";

		// close table row
		HTMLContent += "</td></tr>";

		// return HTML string
		return HTMLContent;
	}

	//*********************************************************************************
	// Validate form object
	//*********************************************************************************
	function handleChange()
	{
		var formElems = document.getElementById('GOMDataForm').elements;

		/*/
		 / Test - display all form elements
		var HTMLContent = "";
		for (var i = 0; i < formElems.length; i++)
		{
			var arrList = formElems[i].id.split("|");
			if ((formElems[i].id.substring(0, 1) != "_") && (arrList.length == 6))
			{
				HTMLContent += "<b>Type:</b>" + formElems[i].type + "&nbsp&nbsp";
				HTMLContent += "<b>ID:</b>" + formElems[i].id + "&nbsp;&nbsp;";
				HTMLContent += "<b>Value:</b><i>" + formElems[i].value + "</i>&nbsp;&nbsp;";
				HTMLContent += "<BR>";
			}
		}
		document.getElementById('mainBodyContent').innerHTML = HTMLContent;
		//*/


		// validate and modify IO data
		var dv = undefined;
		var slotNum;
		var dataSect;
		var bitOffset;
		var bitLen;
		var dataType;
		for (var i = 0; i < formElems.length; i++)
		{
			var arrList = formElems[i].id.split("|");
			if ((formElems[i].id.substring(0, 1) != "_") && (arrList.length == 4))
			{
				// retrieve info
				slotNum = parseInt(arrList[0]);
				bitOffset = parseInt(arrList[1]);
				bitLen = parseInt(arrList[2]);
				dataType = parseInt(arrList[3]);

				// get a data-view object of the module's data section
				if (dv == undefined)
				{
					dv = GOM.getValDataView("ARGEE_IO_PARAM", slotNum);
				}

				var val=parseInt(formElems[i].value);
				// validate data
				if (dataType == IODBDataType.BITMAP)
				{
					if (formElems[i].checked)
					{
						val=1;
					}
					else
					{
						val=0;
					}
				}

				// modify data
				SetArrValue(dv, bitOffset, bitLen, val);
			}
		}

		// commit IO data changes
		saveToLocalStorage();

		return false;
	}

	return{
		renderParamConfigScreen : renderParamConfigScreen,
		BEP_RenderParams : BEP_RenderParams,
		handleChange:handleChange,
		loadParams:loadParams,
		createDefaultParamInit:createDefaultParamInit,
		setRW_RenderMode:setRW_RenderMode,
	}
}());

var IO_CONF = IO_Config;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
