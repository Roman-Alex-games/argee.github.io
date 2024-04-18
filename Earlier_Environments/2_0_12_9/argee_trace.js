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
 *  DESCRIPTION: Trace for ARGEE 
 *
 *******************************************************************************/

var record_non_argee_traces=false; 
 
var trace_data=[];
var trace_data_wr_ptr=0;
var trace_num_elems=0;
var trace_prev_timestamp=0;
var trace_compl_timestamp=0;


var trace_db=[];
var trace_curr_color_assigned=0;

var trace_autocolors=
[
	"#66FF00", // bright green,
	"#66FF99", // plainer green
	"Aqua",
	"Aquamarine",
	"Gold",
	"DarkTurquoise",
	"DarkSeaGreen",
	"#CC6600",
	"LimeGreen",
	"Lime",
	"LightSeaGreen",
];



function TRACE_Clear()
{
	trace_num_elems=0;
	trace_data_wr_ptr=0;
	trace_data=[];
	trace_db=[];
	trace_curr_color_assigned=0;
	trace_prev_timestamp=0;
	trace_copl_timestamp=0;
}

function TRACE_AddDbEnt(cond,act,disp_type,dispString)
{
	var last=trace_db.length;
	trace_db[last]={};
	trace_db[last].cond=cond;
	trace_db[last].act=act;
	trace_db[last].disp_type=disp_type;
	trace_db[last].dispString=dispString;
	trace_db[last].color=trace_autocolors[trace_curr_color_assigned]; 
	trace_curr_color_assigned=(trace_curr_color_assigned+1)%trace_autocolors.length;
}

function TRACE_FindDbEnt(cond,act)
{
	var i;
	for(i=0;i<trace_db.length;i++)
	{
		if ((trace_db[i].cond==cond)&&(trace_db[i].act==act))
		{
			return i;
		}
	}
	return -1;
}


var max_traces=4096;

function TRACE_Add(dt,offset,num_bytes)
{
	var i;
	var curr_offset;
	var num_elems=num_bytes/8;
	curr_offset=offset;
	for(i=0;i<num_elems;i++)
	{
		var obj={};
		var type;
		
		var record=false;
		obj.cond_num=dt.getUint8(curr_offset);curr_offset++;
		type=dt.getUint8(curr_offset);
		if ((type&0x80)!=0)
		{
			record=true;
		}
		if (record_non_argee_traces==true)
		{
			record=true;
		}
			
		obj.act_num=type;curr_offset++;
		obj.timestamp=dt.getUint16(curr_offset,true);curr_offset+=2;
		
		if (trace_prev_timestamp>obj.timestamp)
		{
			trace_compl_timestamp+=(65536-trace_prev_timestamp)+obj.timestamp;
		}
		else
		{
			trace_compl_timestamp+=obj.timestamp-trace_prev_timestamp;
		}
		trace_prev_timestamp=obj.timestamp;
		obj.timestamp=trace_compl_timestamp;
		
		
		obj.data=dt.getUint32(curr_offset,true);curr_offset+=4;
		if (record==true)
		{
			trace_data[trace_data_wr_ptr]=clone(obj);
			trace_data_wr_ptr=(trace_data_wr_ptr+1)%max_traces;
			trace_num_elems=Math.min(trace_num_elems+1,max_traces);
		}
	}
}

function TRACE_findStart(elems_to_show)
{
	if ((trace_data_wr_ptr-elems_to_show)>=0)
	{
		return trace_data_wr_ptr-elems_to_show;
	}
	else
	{
		return max_traces-(elems_to_show-trace_data_wr_ptr);
	}
}

function displayInBase(dec,base)
{
    if(dec >= 0) {
        return dec.toString(base);
    }
    else {
        /* Here you could represent the number in 2s compliment but this is not what 
           JS uses as its not sure how many bits are in your number range. There are 
           some suggestions http://stackoverflow.com/questions/10936600/javascript-decimal-to-binary-64-bit 
        */
        return (~dec).toString(base);
    }
}

var TRACE_dispOpt=
{
	unsigned:0,
	signed:1,
	hex:2,
	bin:3,
}

function TRACE_formatValue(data,opt)
{
	if (opt==TRACE_dispOpt.signed)
	{
		var arr=new Uint32Array(1);
		arr[0]=data;
		var dt=new DataView(arr.buffer);
		return dt.getInt32(0,true)+"";
	}
	if (opt==TRACE_dispOpt.hex)
	{
		return displayInBase(data,16);
	}
	if (opt==TRACE_dispOpt.bin)
	{
		return displayInBase(data,2);
	}
	return data+"";
}

function showTrace_imp(full)
{
	var outp;
	var elems_to_show;
	var start_trace,i,j;
	if ((var_display==false)&&(side_by_side==false))
	{
		return;
	}
	
	if (full==false)
	{
		// only show the last up to 100
		elems_to_show=Math.min(100,trace_num_elems);
	}
	else
	{
		// otherwise show all traces (max 65K)
		elems_to_show=trace_num_elems;
	}

	start_trace=TRACE_findStart(elems_to_show);
	var end_elem;
	if (trace_data_wr_ptr==0)
	{
		end_elem=max_traces-1;
	}
	else
	{
		end_elem=trace_data_wr_ptr-1;
	}

	// 	
	
	
	outp="<p> </p>";	
	outp+="<table>";
	outp+="<TR style=\"border: 1px solid black;\">";
	outp+="<td  bgcolor=#CCFF33 colspan=\"5\" style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\"><center><h4>Trace Data:</h4></center></td></tr>";
	
	if (elems_to_show>0)
	{
		for(i=0,j=end_elem;i<elems_to_show;i++)
		{
			outp+="<TR style=\"border: 1px solid black;\">";
			if ((trace_data[j].act_num&0x80)!=0)
			{
				outp+="<td bgcolor=lightgrey style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">"+j+"</td>";
				outp+="<td bgcolor=#F8F8F8 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">time:"+ (trace_data[j].timestamp) +"</td>";						
				outp+="<td bgcolor=#E6E6E6 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">cond:"+ (trace_data[j].cond_num) +"</td>";
				outp+="<td bgcolor=#E6E6E6 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">act:"+ (trace_data[j].act_num&0x7F) +"</td>";

				var db_ind=TRACE_FindDbEnt(trace_data[j].cond_num,trace_data[j].act_num&0x7f);
				if (db_ind!=-1)
				{
					outp+="<td bgcolor=\""+trace_db[db_ind].color+"\" style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">"+trace_db[db_ind].dispString+":"+ TRACE_formatValue(trace_data[j].data,trace_db[db_ind].disp_type) +"</td>";			
				}
				else
				{
					outp+="<td bgcolor=#E6E6E6 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">value:"+ (trace_data[j].data) +"</td>";			
				}
			}
			else
			{
				outp+="<td bgcolor=lightgrey style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">"+j+"</td>";
				outp+="<td bgcolor=#F8F8F8 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">time:"+ (trace_data[j].timestamp) +"</td>";						
				outp+="<td bgcolor=#E6E6E6 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">File:"+ (trace_data[j].cond_num) +"</td>";
				outp+="<td bgcolor=#E6E6E6 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">type:"+ (trace_data[j].act_num) +"</td>";
				outp+="<td bgcolor=#E6E6E6 style=\"border: 1px solid black;padding-left:5px; padding-right:5px;\">value:"+ (trace_data[j].data) +"</td>";			
			}
			if (j==0)
			{
				j=max_traces-1;
			}
			else
			{
				j=j-1;
			}
				
			outp+="</TR>";
		}
	}
	outp+="</table>";

	
	var_div.innerHTML=outp;
}
