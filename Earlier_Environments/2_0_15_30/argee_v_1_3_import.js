var ver_1_3_import=function()
{


var mod_descr=[];

function findSection(mod,type)
{
	var i;
	for(i=0;i<mod.sections.length;i++)
	{
		if (mod.sections[i].type==type)
		{
			return mod.sections[i];
		}
	}
	return null;
}

function findModList(list)
{
	var i,j;
	mod_descr=[];
	for(i=0;i<list.length;i++)
	{
		for(j=0;j<old_slice_descr.length;j++)
		{
			if (((i==0)&&(list[i]==old_slice_descr[j].id))||
			((list[i]&0xffffff00)==(old_slice_descr[j].id&0xffffff00)))
			{
				mod_descr[i]=old_slice_descr[j];
			}
		}
	}
}


function updateMatchingDatapointName(datapoint_old,mod_new_sect)
{
	var i;
	for(i=0;i<mod_new_sect.length;i++)
	{
		if ((mod_new_sect[i].offset==datapoint_old.offset)&&(mod_new_sect[i].length==datapoint_old.length))
		{
			datapoint_old.new_string=convertString(mod_new_sect[i].name);
			return true;
		}
		else if ((mod_new_sect[i].offset==datapoint_old.offset)&&(mod_new_sect[i].length!=datapoint_old.length))
		{
			if ((mod_new_sect[i].length==8)&&(datapoint_old.length==16))
			{
				datapoint_old.new_string=convertString(mod_new_sect[i].name)+".0.16";				
				return true;
			}
			else
			{
				//alert("no matching datapoint found for "+datapoint_old.name);
				return false;
			}
		}
	}
	return false;
	//alert("no matching datapoint found for "+datapoint_old.name);
}



function replaceProjText(text,mod_db,mod_list)
{
	var i,j,k,l;
	var str;
	str=text;
	findModList(mod_list);
	for(i=0;i<mod_descr.length;i++)
	{
		for(j=0;j<mod_descr[i].sections.length;j++)
		{
			var new_sect;
			if (i==0)
			{
				new_sect=mod_db[i].sections[0];
			}
			else
			{
				new_sect=findSection(mod_db[i],mod_descr[i].sections[j].type);
			}
			
			for(k=0;k<mod_descr[i].sections[j].objects.length;k++)
			{
				if (updateMatchingDatapointName(mod_descr[i].sections[j].objects[k],new_sect.objects)==true)
				{
					var old_str="IO.Slot"+i+"."+sect_names[mod_descr[i].sections[j].type]+"."+convertString(mod_descr[i].sections[j].objects[k].name);
					var new_str="IO.Slot"+i+"."+sect_names[mod_descr[i].sections[j].type]+"."+mod_descr[i].sections[j].objects[k].new_string;
					var res=str.split(old_str);
					var str=res[0];
					for(l=1;l<res.length;l++)
					{
						var code=res[l].charAt(0);
						if (!(code > 47 && code < 58) && // numeric (0-9)
							!(code > 64 && code < 91) && // upper alpha (A-Z)
							!(code > 96 && code < 123) && // lower alpha (a-z)
							!(code=='_'))
						{ 
							str+=new_str+res[l];
    					}
						else
						{
							str+=old_str+res[l];
						}
					}
				}
			}
		}
	}
	return str;
}

function parseFileFormat(arr)
{
	var dataView=new DataView(arr);	
	var stat=true;
	var offset=8;
	var conf_len=dataView.getUint8(offset);offset++;
	var scanlist=[];
	var i,j;
	var combined_prj_str="";
	
	for(j=0;j<conf_len;j++)
	{
			scanlist[j]=dataView.getUint32(offset,true);offset+=4;
	}
	
	findModList(scanlist);
	for(i=0;i<conf_len;i++)
	{
			if (((i==0)&&(scanlist[i]==slices[i].id))||
				((scanlist[i]&0xffffff00)==(slices[i].id&0xffffff00)))
			{
			}
			else
			{
				alert("Incompatible module in slot "+i+" expected: \""+mod_descr[i].name+"\" actual: \""+slices[i].name+"\" ");
				return null;
			}
	}
			
	
	var params=[];
	for(i=0;i<conf_len;i++)
	{
		var param_len=dataView.getUint8(offset);offset++;
		params[i]=[];
		for(j=0;j<param_len;j++)
		{
			params[i][j]=dataView.getUint8(offset);offset++;
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
	combined_prj_str=replaceProjText(combined_prj_str,slices,scanlist);
	
	combined_prj=JSON.parse(combined_prj_str);
	combined_prj.var_db=[];
	combined_prj.var_db[0]={type:0,name:"Program Variables",
	                        var_list:[
							           {name:"PLC_connected",type:0,fixed:true},
									   {name:"PROG_cycle_time",type:0,fixed:true},
									 ]
						   };
	for(i=0;i<combined_prj.vars[0].var_list.length;i++)
	{
		combined_prj.var_db[0].var_list[combined_prj.var_db[0].var_list.length]={name:combined_prj.vars[0].var_list[i].name,type:0};	
	}
	for(i=0;i<combined_prj.vars[1].var_list.length;i++)
	{
		combined_prj.var_db[0].var_list[combined_prj.var_db[0].var_list.length]={name:combined_prj.vars[1].var_list[i].name,type:1};	
	}
	combined_prj.var_db[1]={type:1,name:"PLC Variables",
	                        var_list:[
									 ]
						   };
	for(i=0;i<combined_prj.vars[3].var_list.length;i++)
	{
		combined_prj.var_db[1].var_list[combined_prj.var_db[1].var_list.length]=combined_prj.vars[3].var_list[i];	
	}
	combined_prj.var_db[2]={type:6,name:"States",
	                        var_list:[
									 ]
						   };
	combined_prj.cond_db=combined_prj.cond;	
	combined_prj.misc={projectName:""};
	combined_prj.library_desc={LibInit:0xffffffff,LibUnload:0xffffffff,loadable_size:0,num_funcs:0,funcs:[],num_udts:0,udts:[]};
    
	return combined_prj;
						   
	
	
	
	
	// modify var_db
}


var old_slice_descr=
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


return  {parseFileFormat:parseFileFormat};


}();