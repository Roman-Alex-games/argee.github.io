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
 *  DESCRIPTION: Print library for ARGEE 
 *
 *******************************************************************************/
function printSingleVar(type,varNum,output)
{
	var i,j,to_render_del;
	output="";
	to_render_del=true;

	output+="<TR>";
	for(i=0;i<type_desc[type].elems.length;i++)
	{
		switch(type_desc[type].elems[i].type)
		{
			case field_types.num:
			case field_types.str_num:
				  output+="<TD  style=\"padding-left:5px; padding-right:5px;vertical-align: top;\" >";
				  output+=var_db[type].var_list[varNum][type_desc[type].elems[i].name];
				  output+="</TD>";
				  break;
			case field_types.enumeration:
				  output+="<TD style=\"padding-left:5px; padding-right:5px;vertical-align: top;\" >";
				  output+=type_desc[type].elems[i].enum_elems[var_db[type].var_list[varNum][type_desc[type].elems[i].name]];
			      output+="</TD>";
				  break;
		}
		
		
	}
	if (type==0)
	{
		output+="<TD style=\"padding-left:5px; padding-right:5px;\" nowrap>";
		if (var_db[type].var_list[varNum].fixed==undefined)
		{
			if ((type==0)&&(prog_var_init_funcs[var_db[type].var_list[varNum].type]!=null)&&(var_db[type].var_list[varNum].init_arr!=undefined))
			{
				
				window[ "eval" ].call( window, prog_var_init_funcs[var_db[0].var_list[varNum].type]);
				if (initDisplayValue!=null)
				{
					try
					{
						var val=initDisplayValue(varNum);
						output+=val;
					}
					catch(e)
					{
					}
				}
			}
		}
		output+="</TD>";
	}
	output+="</TR>";
	return output;
}


function printVariables()
{
	var i,j;
	var outp,tbl;
	var glob_outp="";
	for(i=0;i<var_db.length;i++)
	{
		if ((var_db_names[i]=="")||(var_db[i].var_list.length==0))
		{
			continue;
		}
		glob_outp+="<H2>"+var_db_names[i]+"</h2><br>";
		tbl="<table border=\"1\" style=\"border-collapse:collapse;\" >";
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
						tbl+="<TD style=\"padding-left:5px; padding-right:5px;\" bgcolor=lightgrey><B><i>";
						tbl+=type_desc[i].elems[j].field_name;
						tbl+="</i></B></TD>";
					}
				}
				if (i==0)
				{
					tbl+="<TD style=\"padding-left:5px; padding-right:5px;\" bgcolor=lightgrey><B><i>Init Value</i></B></TD>";
				}
				tbl+="<TR>";
			}
			
		}
		
		for(j=0;j<var_db[i].var_list.length;j++)
		{
			outp="";
			outp=printSingleVar(i,j,outp);
			tbl+=outp;
		}
		tbl+="</table>";
		glob_outp+=tbl;
	}
	return glob_outp;
	
}

function printAction(cond_num,act_num,largest_act)
{
	var outp="";
	var i,j;
	var color;
	var act_type=cond_db[cond_num].actions[act_num].act_type;
	
	outp+="<tr ><td width=\"1px\"  style=\"padding-left:5px; padding-right:5px;\" >"+act_num+".";
	outp+="</td>";
	
	color=act_desc[act_type].color;
	outp+="<td style=\"white-space: nowrap;padding-left:5px; padding-right:15px;\" width=\"1px\"  bgcolor="+color+">"+act_desc[act_type].name+"</td>";
    outp+="<TD style=\"padding-bottom:5px; padding-top:5px; \" ><table style=\"font-size:100%;width:100%;\">";
	
	for(i=0;i<act_desc[act_type].field_list.length;i++)
	{
		outp+="<TR><TD width=\"1px\"><b>";				
		outp+=act_desc[act_type].field_list[i].display_name+":";
		outp+="</b></TD><TD>";				
		
		if (act_desc[act_type].field_list[i].type==field_types.str_num)
		{
			//size=\""+act_desc[act_type].field_list[i].field_size+"\"
            if ((act_desc[act_type].field_list[i].editable!=undefined)&&(act_desc[act_type].field_list[i].editable==false))
            {
                // non-editable field
                outp+="<div style=\"  background-color: #CCFF66; \">" +cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name] +"</div>";
            }
            else
            {
                outp+=cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name];
            }
		}
		else if (act_desc[act_type].field_list[i].type==field_types.str_text_area)
		{
			outp+=cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name];
		}
		else
		{
			// enumeration
			outp+=act_desc[act_type].field_list[i].enum_elems[cond_db[cond_num].actions[act_num][act_desc[act_type].field_list[i].name]];
		}
		outp+="</td></TR>";
	}
	
	outp+="</table></TD>";
	
	outp+="</tr>";
	return outp;
}

function isOverflowed(element){
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

var scroll_page_offset=500;

function printProgText()
{
	var i,j,outp,tbl,k;
	var compl_tbl;
	var act_page_height=0;
	var hidden_div=this.document.getElementById("Overlay");
	var max_height;
	var first_time=true;
	
	// compute cm to px conversion;
	hidden_div.innerHTML="<div id=\"page_hidden_\" style=\"position: absolute; top : -1000cm; left : -1000cm; height : 1000cm; width : 1000cm;\"></div>";
	var page_div=this.document.getElementById("page_hidden_");
	var px_per_cm = page_div.scrollHeight / 1000;
	
	hidden_div.innerHTML="<div id=\"page_hidden_\" class=page></div>";
	page_div=this.document.getElementById("page_hidden_");

	compl_tbl="";
	compl_tbl+="<DIV style=\"page-break-after:always\"></DIV>"
	page_div.innerHTML="";
	max_height=(24*px_per_cm)|0;
	for(i=0;i<cond_db.length;i++)
	{
		
		if (first_time==true)
		{
			tbl="<br><br><h2> Program Code </h2><br>";
			first_time=false;
		}
		else
		{
			tbl="";
		}
		tbl+="<table width=\"100%\" style=\"font-size:100%;border-collapse:collapse;\" border=\"0\">";

		
	    //tbl+="<tr style=\" width:100%;\"><td width=\"2px\"  style=\"border: 1px solid grey;;padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"2\">"+i+".</td><td bgcolor=#E8E8E8    >";                            
		if (cond_db[i].label!=undefined)
		{
			tbl+="<tr style=\" width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td>";
			tbl+="<td bgcolor=\"yellow\" rowspan=\"1\" colspan=\"2\"><fieldset><legend><b><i>Label</i></b></legend>";
			tbl+="<div style=\"width:100%;font-family: Verdna; font-style:italic; font-weight:bold;  font-size: 12px; color: Black   ;\">"+cond_db[i].label+"</div></fieldset>";
			tbl+="</td></tr><tr>";
		}		
		else
		{
			tbl+="<tr style=\" width:100%;\"><td width=\"1px\"  style=\"padding-left:10px; padding-right:10px;\" bgcolor=#CECEF6 rowspan=\"3\">"+i+".</td>";
		}
		tbl+="<td bgcolor=#E8E8E8    >";                            		
		tbl+="<fieldset><legend><b><i>Condition :"+i+"</i></b></legend>";
		tbl+=escapeHTML(cond_db[i].condition);
		tbl+="</fieldset>";
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
			tbl+="<fieldset><legend><b><i>Actions</i></b></legend>";
			tbl+="<table width=\"100%\" style=\"font-size:100%;border-collapse:collapse;\"  border=\"1\">";	
			for(j=0;j<cond_db[i].actions.length;j++)
			{
				tbl+=printAction(i,j,largest_act);
			}
			tbl+="</table>";
			tbl+="</fieldset>";
			
		}
		tbl+="</td></tr>";
		tbl+="<tr style=\"height:20px\"></tr>";
		tbl+="</table>";
		page_div.innerHTML+=tbl;
		if (page_div.scrollHeight>max_height)
		{
			compl_tbl+="<DIV style=\"page-break-after:always\"></DIV>"
			page_div.innerHTML=tbl;
			var jk=1;
			jk=2;
		}
		compl_tbl+=tbl;
	}
//	    min-height: 25.7cm;

	return compl_tbl;
}
/*
@page {
    size: A4;
    margin: 0;
}
@media print {
    .page {
        margin: 0;
        border: initial;
        border-radius: initial;
        width: initial;
        min-height: initial;
        box-shadow: initial;
        background: initial;
        page-break-after: always;
    }
}
*/

function dispPrintPreview()
{
	var program_name=prompt("Enter The name of the program");
	var prog=printProgText();
	var vars=printVariables();
	var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>'+program_name+'</title>');
            //printWindow.document.write('<style>  body { font-size: 75%; } .but_select {    -moz-appearance:none;    -webkit-appearance:none;	 padding:0;    color:black; font:12px sans-serif; -webkit-border-radius: 8px;     -moz-border-radius: 8px;    border-radius: 8px;background: #E7E7E7 -webkit-gradient( linear, 0% 0%, 0% 100%, from(rgba(255,255,255,.4)),to(rgba(0,0,0,0)));background: #E7E7E7 -moz-linear-gradient( top, rgba(255,255,255,.4), rgba(0,0,0,0));} button:hover {background: #FFFAFA -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(255,255,255,.55)), to(rgba(0CSS relative positioning,0,0,0)));background: #FFFAFA -moz-linear-gradient( top, rgba(255,255,255,.55), rgba(0,0,0,0));}  table { page-break-inside:auto }   tr    { page-break-inside:avoid; page-break-after:auto }</style></head><body >');
			printWindow.document.write('<style>  body { font-size: 75%; }</style></head><body >');
			printWindow.document.write("<br><center><h1> Program: "+program_name+"<br>Device: "+ real_DeviceName+ "("+dev_OrderNumber+")"+"</h1></center><br>");
			printWindow.document.write(vars);
            printWindow.document.write(prog);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
}	


