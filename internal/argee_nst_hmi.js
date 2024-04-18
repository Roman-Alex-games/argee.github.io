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
 *  DESCRIPTION: ARGEE HMI Renderer. This file contains functions that render HMI.
 *               This file is copied into the ARGEE project to provide standalone  
 *               HMI Renderer.
 *
 *******************************************************************************/






var standalone_hmi=
{
	td_preview:function(evt,elem)
	{
		if (standalone_hmi.preview_mode==true)
		{
			var msg={msg_type:1,line_num:parseInt(elem.dataset.line_num)};
			window.parent.postMessage(JSON.stringify(msg), "*");
			evt.stopPropagation();
			return false;
			
		}
		return true;
	},
	setPreviewMode:function()
	{
		this.preview_mode=true;
	},
	
	libVersion:function()
	{
		return 2;
	},
	
	enumerateLeafElements:function(func,elem)
	{
		if (typeof elem != 'object')
		{
			return;
		}
		if (elem.type=="FUNC_NO_RETURN")
		{
			func(elem);
		}
		else if (elem.list!=undefined)
		{
			var i;
			for(i=0;i<elem.list.length;i++)
			{
				this.enumerateLeafElements(func,elem.list[i]);
			}
		}
	},

		
	
	preProcessLeafs:function(obj)
	{
		var l;
		var rend=-1,expr_var=-1;
		
		for(l=0;l<this.rend_types.length;l++)
		{
			if (this.rend_types[l].name.localeCompare(obj.name)==0)
			{
				rend=l;
				break;
			}
		}
		var var_func="NONE";
		var var_descr=null;
		if (obj.list[this.rend_types[rend].var_elem]!=undefined)
		{
			if (obj.list[this.rend_types[rend].var_elem].type=="FUNC")
			{
				var_func=obj.list[this.rend_types[rend].var_elem].name;
				var_descr=obj.list[this.rend_types[rend].var_elem].list[0];
			}
			else
			{
				var_descr=obj.list[this.rend_types[rend].var_elem];
			}
			/*if (this.rend_types[rend].file_op==true)
			{
				this.state_elems[obj.elem_id]={file_size:0,req_chunk_size:0,start_pos:0,req:0,file_ready:0,exchange_arr:[]};
			}*/
		}
		obj.rend=rend;
		obj.var_func=var_func;
		obj.var_descr=var_descr;
	},
	
	preProcess:function()
	{
	    var bound_func=this.preProcessLeafs.bind(this);
		this.enumerateLeafElements(bound_func,this.hmi_elems);
		
		this.preProcesBlockObjects(this.hmi_elems);
		
	},
	setHMI_Elems:function(hmi)
	{
		this.hmi_elems=hmi;
		this.preProcess();		
	},
	setURL:function(url)
	{
		var url_split=url.split("/");
		//host -> 3rd string
		this.url="http://"+url_split[2];
	},
	renderButton:function(elem)
	{
		var str="";
		str+="<center>";
		if (elem.var_func=="NONE")
		{
			if (this.file_submit_button==true)
			{
				elem.file_submit_button=true;
				elem.file_ref_obj=this.file_ref_obj;
				elem.file_ref_obj_dir=this.file_ref_obj_dir;
			}
			this.editable_elements_for_curr_button=this.editable_elements_for_curr_button.concat(this.globalEditFieldList);
			this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=[elem.var_descr.offset,this.getObjSize(elem.var_descr),elem.var_descr.bit_offset,elem.var_descr.bit_len];
			str+="<button style=\""+this.simp_font_100_str+"\" onclick=\"standalone_hmi.onElemEdit(this)\""+
					"data-elem_editable_elements=\""+JSON.stringify(this.editable_elements_for_curr_button)+"\" data-elem_obj='"+JSON.stringify(elem)+"' >"+elem.list[0].name+"</button>";
			this.editable_elements_for_curr_button=[];
			this.file_submit_button=false;
			
		}
		else
		{
			str+="<button style=\""+this.simp_font_100_str+"\" onclick=\"standalone_hmi.onElemEdit(this)\""+
					" data-elem_obj='"+JSON.stringify(elem)+"' >"+elem.list[0].name+"</button>";
		}
		str+="</center>";
		return str;
	},
	renderLink:function(elem)
	{
		var str="";
		var link_name=this.getVarValue(elem.list[0],false);
		var link_bg_color=this.getVarValue(elem.list[2],false);
		str+="<center>";
		this.editable_elements_for_curr_button=[];
		this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=[elem.list[1].offset,this.getObjSize(elem.list[1]),elem.list[1].bit_offset,elem.list[1].bit_len];
		str+="<a id='link_id_"+elem.elem_id+"' href='#' style=\""+this.simp_font_100_str+"\" onclick=\"standalone_hmi.onElemEdit(this)\""+
					"data-elem_editable_elements=\""+JSON.stringify(this.editable_elements_for_curr_button)+"\" data-elem_obj='"+JSON.stringify(elem)+"' >"+link_name+"</a>";
		this.editable_elements_for_curr_button=[];
		this.links[this.links.length]=elem;
		str+="</center>";
		return str;
		
	},
	renderFileUpload:function(elem)
	{
		var str="";
		str+="<center>";
		str+="<input type=\"file\" id=\"files_id_"+elem.elem_id+"\"  onchange=\"standalone_hmi.handleFileSelect(this);return false;\" name=\"files[]\" multiple data-elem_obj='"+JSON.stringify(elem)+"' /><br>";
		str+="</center>";
		this.file_submit_button=true;
	    this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=
	            [elem.list[5].offset,this.getObjSize(elem.list[5]),-1,-1];  // file_size
	    this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=
	            [elem.list[3].offset,this.getObjSize(elem.list[3]),-1,-1]; // req_resp
		this.file_ref_obj=elem;
		this.file_ref_obj_dir=0; // upload
		return str;
	},
	handleFileInput:function(evt)
	{
		standalone_hmi.ref_exchange_arr=[];
		standalone_hmi.ref_obj=JSON.parse(evt.dataset.elem_obj);
		standalone_hmi.ref_download_filename=evt.value;
		var jk=1;
	},
	renderFileDownload:function(elem)
	{
		var str="";
		str+="<center>";
		str+="<input onchange=\"standalone_hmi.handleFileInput(this);return false;\" data-elem_obj='"+JSON.stringify(elem)+"' /><br>";
		str+="</center>";
		this.file_submit_button=true;
	    this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=
	            [elem.list[3].offset,this.getObjSize(elem.list[3]),-1,-1];
		this.file_ref_obj=elem;
		this.file_ref_obj_dir=1; // download
		return str;
	},
	
	onReadFile:function(e)
	{
	   var res=e.target.result;
	   var uArr=new Uint8Array(res);
	   var i;
	   standalone_hmi.ref_exchange_arr=[];
	   
	   for(i=0;i<res.byteLength;i++)
	   {
		   standalone_hmi.ref_exchange_arr[i]=uArr[i];
	   }
	   standalone_hmi.setVarValue(standalone_hmi.ref_obj.list[5],res.byteLength);
	},
	
	handleFileSelect:function(evt)
	{
		if (standalone_hmi.file_op_in_progress==true)
		{
			alert("only one file operation is allowed at one time");
			return;
		}
		var files = evt.files; // FileList object
		standalone_hmi.ref_obj=JSON.parse(evt.dataset.elem_obj);
		 
		for (var i = 0, f; f = files[i]; i++) {

		  var reader = new FileReader();

		  reader.onload = (function(theFile) 
		  {
			   return standalone_hmi.onReadFile;
		  })(f);
		  reader.readAsArrayBuffer(f);
		}
	},
	
	swap:function(arr,ind1,ind2)
	{
		var tmp=arr[ind1];
		arr[ind1]=arr[ind2];
		arr[ind2]=tmp;
	},
	
	handleButton:function(elem_dom,obj)
	{
		if (this.file_op_in_progress==true)
		{
			alert("Can not submit until the file operation is complete!");
			return;
		}
		
		if (obj.var_func=="NONE")
		{
			if (obj.file_submit_button==true)
			{
				if (obj.file_ref_obj_dir==0) // upload
				{
					if (this.ref_exchange_arr.length==0)
					{
						alert("Can't upload an empty file");
						return;
					}
				}
				this.ref_obj_dir=obj.file_ref_obj_dir;
			    this.ref_num=2;
				this.ref_filename=standalone_hmi.ref_download_filename;
				this.file_op_in_progress=true;
				this.setVarValue(this.file_ref_obj.list[3],7);
			}
			this.setVarValue(obj.var_descr,"1");
			var elems_in_button=JSON.parse(elem_dom.dataset.elem_editable_elements);
			this.AjaxAdd("SET",elems_in_button);
		}
		else if (obj.var_func=="CSV")
		{
			var args=obj.list[1].list;
			if (args.length<4)
			{
				// not enough arguments
				return;
			}
			if (args[1].type!="CONST_INT")
			{
				// timer period not defined
				return;
			}	
			var timestamp=this.getVarValue(args[0],false);
			var poll_period=parseInt(args[1].name);
			var i,j,k;
			var arrs=[];
			
			for(i=2;i<args.length;i++)
			{
				arrs[i-2]=this.getVarValue(args[i],false);
			}
			for(i=0;i<(arrs.length-1);i++)
			{
				if (arrs[i].length!=arrs[i+1].length)
				{
					return; // all arrays have to have the same length
				}
			}
			// sort arrays according to the timestamp
			
			for(i=0;i<arrs[0].length;i++)
			{
				var smallest_ind=i;
				for(j=i+1;j<arrs[0].length;j++)
				{
					if (parseInt(arrs[0][j])<parseInt(arrs[0][smallest_ind]))
					{
						smallest_ind=j;
					}
				}
				for(j=0;j<arrs.length;j++)
				{
					this.swap(arrs[j],i,smallest_ind);
				}
			}
			// current time in the timer -> "timestamp" var.
			// convert timestamps to PC time
			for(i=0;i<arrs[0].length;i++)
			{
				var tm=parseInt(arrs[0][i]);
				var diff=(tm-timestamp)*parseInt(args[1].name);
				var ms=new Date().getTime();
				var date=new Date(ms+diff).toString();
				arrs[0][i]=date;
			}
			var str="";
			// generate an output array
			for(j=0;j<arrs[0].length;j++)
			{
				str+=arrs[0][j];
				for(i=1;i<arrs.length;i++)
				{
					str+=",";
					str+=arrs[i][j];
				}
				str+="\n";
			}
			var imgDLHelper = document.getElementById('imgdlhelper');
			imgDLHelper.download=obj.list[0].name+".csv";
			var unt8arr=new Uint8Array(str.length);
			for(i=0;i<str.length;i++)
			{
				unt8arr[i]=str.charCodeAt(i);
			}
			blob = new Blob([unt8arr], { type: 'application/octet-stream;base64' }); 
			var blobUrl = URL.createObjectURL(blob);
			
			imgDLHelper.href=blobUrl;
			imgDLHelper.click();
		}
	},
	handleLink:function(elem_dom,obj)
	{
		if (this.file_op_in_progress==true)
		{
			alert("Can not submit until the file operation is complete!");
			return;
		}
		this.setVarValue(obj.list[1],"1");
		var elems_in_button=JSON.parse(elem_dom.dataset.elem_editable_elements);
		this.AjaxAdd("SET",elems_in_button);
		
	},
	pad:function(n, width, z) 
	{
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},	
	renderDisp:function(elem)
	{
		var val=this.getVarValue(elem.var_descr,false);
		var var_type="INT";
		if (typeof val === 'string')
		{
			var_type="STRING";
		}
		if (Array.isArray(val))
		{
         var i;
         if (elem.var_descr.sub_type=="BYTE")
         {
            // byte arrays are displayed as strings
            var str="";
            for(i=0;i<val.length;i++)
            {
               if (val[i]==0)
               {
                  break;
               }
               else
               {
                  str+=String.fromCharCode(val[i]);
               }
            }
            if (str.length==0)
            {
               str="&nbsp&nbsp";
            }
            return str;
         }
         else
         {
            var str="["+0+"]="+val[0];
            for(i=1;i<val.length;i++)
            {
               str+="<br>"+"["+i+"]="+val[i];
            }
            return str;	
         }
		}
		else
		{
			switch(elem.var_func)
			{
				case "NONE":
					 if (elem.subtype!="GRID")
					 {
						if (elem.var_descr.sub_type=="STATE")
						{
							if (this.hmi_elems.enum_list[val]!=undefined)
							{
								return this.hmi_elems.enum_list[val]+"";
							}
							else
							{
								return val+"";
							}
						}					
						return val+" "+elem.list[2].name;
					 }
					 else
					 {
						 return val;
					 }
				case "HEX":
				{
					var str="";
					var arr_buf=new ArrayBuffer(4);
					var dv=new DataView(arr_buf);
					dv.setInt32(0,val,false);
					var len=elem.var_descr.size;
					var start_offset=0;
					switch(len)
					{
						case 2: start_offset=2; break;
						case 1: start_offset=3; break;
					}
					var i;
					for(i=0;i<len;i++)
					{
						if (i!=0)
						{
							str+=" ";
						}
						var hex_val=dv.getUint8(start_offset+i);
						str+=this.pad(hex_val.toString(16),2);
					}
					if (elem.subtype!="GRID")
					{
						str+=" "+elem.list[2].name;
					}
					return str;
				}
			}
		}
		
	},
	renderEditNum:function(elem)
	{
		var val_str;
		var val=this.getVarValue(elem.var_descr,true);
		var var_type="INT";
      var type="type=\"text\"";
		if (typeof val === 'string')
		{
			var_type="STRING";
		}
		switch(elem.var_func)
		{
			case "NONE":	
				 val_str=val;
				 break;
         case "PASSWORD":
             type="type=\"password\"";
             break;
			case "HEX":
			{
				var val_str="";
				var arr_buf=new ArrayBuffer(4);
				var dv=new DataView(arr_buf);
				dv.setInt32(0,val,false);
				var len=elem.var_descr.size;
				var start_offset=0;
				switch(len)
				{
					case 2: start_offset=2; break;
					case 1: start_offset=3; break;
				}

				var i;
				for(i=0;i<len;i++)
				{
					if (i!=0)
					{
						val_str+=" ";
					}
					var hex_val=dv.getUint8(start_offset+i);
					val_str+=this.pad(hex_val.toString(16),2);
				}
				break;
			}
		}
		//this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=[elem.var_descr.offset,this.getObjSize(elem.var_descr)];
		var str="";
		var align="text-align:left;";
		if (elem.subtype!="GRID")
		{
			str+="<table><tr><td>"
		}

		if (var_type=="INT")
		{
				align="text-align:right;box-sizing:border-box;padding-right:2px;";
		}
			
		str+="<input "+type+" style=\"width:100%;"+this.simp_font_100_str+align+"\" onblur=\"standalone_hmi.onElemEdit(this)\" data-elem_obj='"+JSON.stringify(elem)+"' value=\""+val_str+"\" >";
		if (elem.subtype!="GRID")
		{			
			str+="</td><td>"+elem.list[2].name+"</td></tr></table>";
		}
		return str;
			
		
	},
	handleEnterNum:function(elem_dom,obj)
	{
		var val=elem_dom.value;
		var arr=val.split(" ");
		var i;
		
		if 	((obj.var_descr.sub_type=="CHAR")&&(obj.var_descr.is_array==true))
		{
			this.setVarValue(obj.var_descr,val)
		}
		else
		{
			var val_num=0;
			for(i=0;i<arr.length;i++)
			{
				val_num<<=8;
				if (obj.var_func=="HEX")
				{
					val_num|=parseInt(arr[i],16);
				}
                else if ((obj.var_descr.sub_type=="REAL")||(obj.var_descr.sub_type=="RETAIN_REAL"))
                {
                    val_num=parseFloat(arr[i]);
                }
				else
				{
					val_num|=parseInt(arr[i]);
				}
			}
			this.setVarValue(obj.var_descr,val_num.toString());
		}
	},
	renderEditState:function(elem)
	{
		var val=this.getVarValue(elem.var_descr,true);
		//this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=[elem.var_descr.offset,this.getObjSize(elem.var_descr)];
		var low_enum=elem.list[2].name;
		var high_enum=elem.list[3].name;
		var str="<select style=\""+this.simp_font_100_str+"\" data-elem_obj='"+JSON.stringify(elem)+"' onchange=\"standalone_hmi.onElemEdit(this)\">";
		var i;
		for(i=low_enum;i<=high_enum;i++)
		{
			var selected="";
			if (i==val)
			{
				selected="selected";
			}
			str+="<option "+selected+" value=\""+i+"\">"+(this.hmi_elems.enum_list[i])+"</option>";
		}
		str+="</select></td>";
		return str;
	},
	handleEnterState:function(elem_dom,obj)
	{
		var val=elem_dom.value;
		this.setVarValue(obj.var_descr,val.toString());
	},
	renderDispRange:function(elem)
	{
		// updates this.background_color_of_active_element -> used to calculate the background color of different screens;
		var val=this.getVarValue(elem.var_descr,false);
		// for now only Green min/max are covered. anything outside is red
		var low_green=elem.list[3].name;
		var high_green=elem.list[4].name;
		var str="";
		if ((val>=low_green)&&(val<=high_green))
		{
			this.background_color_of_active_element=0;
			str="<div style=\"background-color:lightgreen\">";
		}
		else
		{
			this.background_color_of_active_element=2;
			str="<div style=\"background-color:red\">";
		}
		str+=val+" "+elem.list[2].name+"</div>";
		return str;
	},
	renderScreenList:function(elem)
	{
		var rend="";
		rend+="<table style=\""+this.simp_font_200_str+"\" border=\"1\"><tr>";
		var i;
		for(i=0;i<this.hmi_elems.list.length;i++)
		{
			var additional_screen_prop_prefix="";
			var additional_screen_prop_suffix="";
			if (i==this.active_screen)
			{
				additional_screen_prop_prefix="<b><i>"
				additional_screen_prop_suffix="</i></b>";
			}
			var name;
			if (this.hmi_elems.list[i].type=="BLOCK")
			{
				name=this.hmi_elems.list[i].func.args[0].name;
			}
			else
			{
				name=this.hmi_elems.list[i].name;
			}
			rend+="<td id=\"hmi_screen_"+i+"\">"+additional_screen_prop_prefix+"<a href='#' onclick=\"standalone_hmi.clickHMI_Link("+i+")\">"+name+"</a>"+additional_screen_prop_suffix+"</td>";
			this.screen_background_color[i]=0;
		}
		rend+="</tr></table>"
		this.inner_screenlist_present=true;
		return rend;
	},
	
	getImageStr:function(name,background,zoom)
	{
		var i;
		if (this.hmi_elems.images==undefined)
		{
			return null;
		}
		for (i=0;this.hmi_elems.images.length;i++)
		{
			if (this.hmi_elems.images[i].list[0].name==name)
			{
				return "<center><img style=\"max-width:100%;max-height:100%;width:"+zoom+"%;background-color:"+background+";\" src=\""+this.hmi_elems.images[i].list[1].name+"\"><center>";
			}
		}
		return null;
		
	},
	
	renderGraphics:function(elem)
	{
		return this.getImageStr(elem.list[0].name,"transparent",elem.list[1].name);
	},
	
	
	notifStateColor:function(color)
	{
		this.background_color_of_active_element=0;
		if ((color.toLowerCase()=="yellow")||(color.toLowerCase()=="orange")||(color.toLowerCase()=="gold"))
		{
			this.background_color_of_active_element=1;						
		}
		if (color.toLowerCase()=="red")
		{
			this.background_color_of_active_element=2;						
		}
		
	},
	
	renderMultStateGraphics:function(elem)
	{
		var val=this.getVarValue(elem.var_descr,false);
		var zoom_level=elem.list[1].name;
		var i;
		var num_vals=((elem.list.length-2)/3)|0;
		for(i=0;i<num_vals;i++)
		{
			var cmp_val=parseInt(elem.list[2+0+i*3].name);
			var image_name=elem.list[2+1+i*3].name;
			var image_bgr=elem.list[2+2+i*3].name;
			if (val==cmp_val)
			{
				this.notifStateColor(image_bgr);
				var td_elem=window.document.getElementById("td_id_"+elem.elem_id);
				if (td_elem!=null)
				{
					td_elem.style.backgroundColor=image_bgr;
				}
				
				return this.getImageStr(image_name,"transparent",zoom_level);
			}
		}
		return null;
		
	},
	
	renderMultStateShow:function(elem)
	{
		var val=this.getVarValue(elem.var_descr,false);
		var i;
		var num_vals=((elem.list.length-2)/4)|0;
		for(i=0;i<num_vals;i++)
		{
			var cmp_val=parseInt(elem.list[2+0+i*4].name);
			var text_to_disp=(elem.list[2+1+i*4].name);
			var text_color=(elem.list[2+2+i*4].name);
			var text_bg_color=(elem.list[2+3+i*4].name);
			if (val==cmp_val)
			{
				this.notifStateColor(text_bg_color);
				var td_elem=window.document.getElementById("td_id_"+elem.elem_id);
				if (td_elem!=null)
				{
					td_elem.style.backgroundColor=text_bg_color;
				}
				return "<font style='font-size="+elem.list[1].name+"vw;' color='"+text_color+"'>"+text_to_disp+"</font>";
			}
		}
		return "";	
	},
	
	
	
	
	renderDropDown:function(elem)
	{
		var val=this.getVarValue(elem.var_descr,true);
		//this.editable_elements_for_curr_button[this.editable_elements_for_curr_button.length]=[elem.var_descr.offset,this.getObjSize(elem.var_descr)];
		var num_vals=((elem.list.length-1)/2)|0;
		
		var str="<select style=\"width:100%; "+this.simp_font_100_str+"\" data-elem_obj='"+JSON.stringify(elem)+"' onchange=\"standalone_hmi.onElemEdit(this)\">";
		var i;
		for(i=0;i<num_vals;i++)
		{
			var inner_val=parseInt(elem.list[1+0+i*2].name);
			var disp_name=elem.list[1+1+i*2].name;
			var selected="";
			if (inner_val==val)
			{
				selected="selected";
			}
			str+="<option "+selected+" value=\""+inner_val+"\">"+disp_name+"</option>";
		}
		str+="</select></td>";
		return str;
	},
	handleDropDown:function(elem_dom,obj)
	{
		var val=parseInt(elem_dom.value);
		this.setVarValue(obj.var_descr,val.toString());
	},
	
		
	renderVarWithHealth:function(elem)
	{
		var var_val=this.getVarValue(elem.list[0],false);
		var health_val=this.getVarValue(elem.list[2],false);
		var bg_color="lightgreen";
		var fg_color="black";
		switch(health_val)
		{
			case 1:bg_color="yellow";fg_color="black";break;
			case 2:bg_color="red";fg_color="white";break;
			case -1:bg_color="transparent";fg_color="black";break;
		}
		var str="<table><tr><td><font color='"+fg_color+"'>"+var_val+"</font></td><td><font color='"+fg_color+"'>"+elem.list[1].name+"</font></td></tr></table>";
		this.notifStateColor(bg_color);
		var td_elem=window.document.getElementById("td_id_"+elem.elem_id);
		if (td_elem!=null)
		{
			td_elem.style.backgroundColor=bg_color;
		}
		return str;
	},
	
	
	
	
	
	
	
	
	onResize:function()
	{
		if (standalone_hmi.preview_mode==true)
		{
	
			return;
		}
		var fixed_div=window.document.getElementById("hmi_screens");
		var flex_div=window.document.getElementById("hmi_active_screen");
		if ((flex_div!=null)&&(fixed_div!=null))
		{
			//flex_div.style.width=fixed_div.clientWidth+"px";
			flex_div.style.width="100%"
		}
	},
	

	addVarModif:function(offset,size,bit_offset,bit_len)
	{
		var i;
		for(i=0;i<this.submit_req_list.length;i++)
		{
			if (
			     (this.submit_req_list[i][0]==offset)&&
				 (this.submit_req_list[i][1]==size)&&
				 (this.submit_req_list[i][2]==bit_offset)&&
				 (this.submit_req_list[i][3]==bit_len)
			   )
			{
				return;	
			}
		}
		var pos=this.submit_req_list.length;
		this.submit_req_list[pos]=[];
		this.submit_req_list[pos][0]=offset;
		this.submit_req_list[pos][1]=size;
		this.submit_req_list[pos][2]=bit_offset;
		this.submit_req_list[pos][3]=bit_len;
	},
	clearVarModifList:function()
	{
		this.submit_req_list=[];
	},

	// object global variables
	initObj:function()
	{
		this.AJAX_STATE=
		{
		AJAX_STATE_STOP:0,
		AJAX_STATE_RUN:1,
		};
		
		this.HMI_EVENTS=
		{
			EVT_INIT_START:0,
			EVT_INIT_END:1,
			EVT_REDRAW_START:2,
			EVT_REDRAW_END:3,
			EVT_STATUS_UPDATE_START:4,
			EVT_STATUS_UPDATE_END:5,
			EVT_POLL:6,
		};	

		if (typeof abort_ajax!== "undefined")
		{
			abort_ajax=false;
		}

		this.hmi_tmp_arr=new ArrayBuffer(1024*64);
		this.submit_arr=new ArrayBuffer(1024*64);
		this.poll_arr=null;
		this.ajax_batch_get=[];
		this.MAX_BATCH_SIZE=16;
		this.ajaxStateRequest=this.AJAX_STATE.RUN;
		this.ajaxCurrState=this.AJAX_STATE.RUN;
		this.ARGEE_PROG_VARS_UID=(73<<16)|132;
		this.ARGEE_CHECK_PASSWORD_UID=(73<<16)|9;
		this.timer=null;
		this.timer_stopped=false;
		this.setSubmitted=false;
		this.exchange_in_prog=false;
		this.ajax_queue=[];
		this.curr_ajax=null;
		this.cnt=0;
		this.preview_mode=false;
		this.curr_user=0;
		this.screen_change=true;
		this.screen_change_trigger=true;
		this.auto_update_list=[];
		this.globalEditFieldList=[];
		this.edit_list=[];
		this.editable_elements_for_curr_button=[];
		this.file_submit_button=false;
		this.active_screen=0;
		this.new_screen_request=0;
		this.hmi_elems=null;
		this.screen_background_color=[];
		this.background_color_of_active_element;
		this.before_first_draw=true;
		this.oid_of_argee_vars=-1;
		this.file_op_in_progress=false;
		this.password="password";
		this.submit_cnt=0;
		this.submission_state=true;
		this.submit_req_list=[];
		this.timeout_val=5000;

		
		this.ref_exchange_arr=[];
		this.state_elems=[];
      if (typeof window === 'undefined') 
      {
            this.simp_font_100_str="font-size: 100%;";
            this.simp_font_150_str="font-size: 100%;";
            this.simp_font_200_str="font-size: 125%;";
            this.scr_width="width:50%;"
      }
      else
      {
         window.addEventListener("resize", standalone_hmi.onResize);
         if (typeof window.orientation !== 'undefined')
         {
            this.simp_font_100_str="font-size: 100%;";
            this.simp_font_150_str="font-size: 150%;";
            this.simp_font_200_str="font-size: 200%;";
            this.scr_width="width:100%;"
         }
         else if (typeof SIM == "undefined")
         {
            this.simp_font_100_str="font-size: 100%;";
            this.simp_font_150_str="font-size: 100%;";
            this.simp_font_200_str="font-size: 125%;";
            this.scr_width="width:50%;"
         }
         else
         {
            /*this.simp_font_100_str="";
            this.simp_font_150_str="";
            this.simp_font_200_str="";
            */
            this.simp_font_100_str="font-size: 100%;";
            this.simp_font_150_str="font-size: 100%;";
            this.simp_font_200_str="font-size: 125%;";
            
            this.scr_width="width:50%;"
         }
      }

		
		

		
		var rend_types=
		[
			{name:"HMI_DISP_NUM",format:[0,[1,2]],auto_refresh:1,render:this.renderDisp.bind(this),handle_inp:null,var_elem:1},
			{name:"HMI_DISP_RANGE",format:[0,[1,2]],auto_refresh:1,auto_background:[1,[3,4],["lightgreen","red"]],render:this.renderDispRange.bind(this),handle_inp:null,var_elem:1},
			{name:"HMI_ENTER_NUM",format:[0,[1,2]],render:this.renderEditNum.bind(this),handle_inp:this.handleEnterNum.bind(this),var_elem:1},
			{name:"HMI_BUTTON",format:[[0,1]],render:this.renderButton.bind(this),handle_inp:this.handleButton.bind(this),var_elem:1,dont_render_name:true},
			{name:"HMI_ENTER_STATE",format:[0,[1,2,3]],render:this.renderEditState.bind(this),handle_inp:this.handleEnterState.bind(this),var_elem:1},
			{name:"HMI_SCREEN_LIST",format:[0,[1,2,3]],render:this.renderScreenList.bind(this),handle_inp:null,var_elem:1,dont_render_name:true,},
			{name:"HMI_GRID_ENTER",format:[0,[1,2]],render:this.renderEditNum.bind(this),handle_inp:this.handleEnterNum.bind(this),var_elem:0},
			{name:"HMI_GRID_SHOW",format:[0,[1,2]],auto_refresh:1,render:this.renderDisp.bind(this),handle_inp:null,var_elem:0},
			{name:"HMI_GRID_BUTTON",format:[[0,1]],render:this.renderButton.bind(this),handle_inp:this.handleButton.bind(this),var_elem:1,dont_render_name:true},
			{name:"HMI_GRAPHICS",format:[0,[1,2]],render:this.renderGraphics.bind(this),handle_inp:null,var_elem:0},
			{name:"HMI_MULTI_STATE_GRAPHICS",format:[0,[1,2]],auto_refresh:1,render:this.renderMultStateGraphics.bind(this),handle_inp:null,var_elem:0},
			{name:"HMI_MULTI_STATE_SHOW",format:[0,[1,2]],auto_refresh:1,render:this.renderMultStateShow.bind(this),handle_inp:null,var_elem:0},
			{name:"HMI_MULTI_STATE_ENTER",format:[0,[1,2]],render:this.renderDropDown.bind(this),handle_inp:this.handleDropDown.bind(this),var_elem:0},
			{name:"HMI_DISPLAY_VALUE_WITH_HEALTH",format:[0,[1,2]],auto_refresh:1,render:this.renderVarWithHealth.bind(this),handle_inp:null,var_elem:0},			
			{name:"HMI_GRID_LINK",format:[0,[1,2]],render:this.renderLink.bind(this),handle_inp:this.handleLink.bind(this),var_elem:0},						
			{name:"HMI_GRID_LOAD_FROM_FILE",format:[0,[1,2]],render:this.renderFileUpload.bind(this),handle_inp:this.renderFileUpload.bind(this),var_elem:0,file_op:true},									
			{name:"HMI_GRID_STORE_TO_FILE",format:[0,[1,2]],render:this.renderFileDownload.bind(this),handle_inp:this.renderFileDownload.bind(this),var_elem:0,file_op:true},												

		];
		this.rend_types=rend_types;
	},
	PasswordDlgShow:function()
	{
		var outp;	
		// Change the message.
		var Msg = window.document.getElementById("Overlay_pass");
		Msg.style.borderColor="#99CC00";
		var Msg = window.document.getElementById("DlgContent1");
		outp="<center><h3> Enter Password: </h3></center>";
		outp+="<br><center><input type=\"password\" id=\"password_prompt_id\"  style=\"width:50%;\" /></center>";
		outp+="<br><center><input type=\"button\"  style=\"width:50%;\" value=\"Submit\"  onclick=\"standalone_hmi.PasswordDlgHide(true)\" /></center>";
		outp+="<br><center><input type=\"button\"  style=\"width:50%;\" value=\"Cancel\"  onclick=\"standalone_hmi.PasswordDlgHide(false)\" /></center>";
		Msg.innerHTML=outp;
		// Display the dialog box.
		var Dlg = window.document.getElementById("Overlay_pass");
		Dlg.style.visibility = "visible";
		
		var Dlg = window.document.getElementById("grayout");
		Dlg.style.visibility = "visible";
	},
	PasswordDlgHide:function(send)
	{
	  var pass = window.document.getElementById("password_prompt_id");
	  standalone_hmi.password=pass.value;
	  // Hide the dialog box.
	  var Dlg = window.document.getElementById("Overlay_pass");
	  Dlg.style.visibility = "hidden";
	  
	  var Dlg = window.document.getElementById("grayout");
	  Dlg.style.visibility = "hidden";
	  if (send==true)
	  {
		standalone_hmi.internal_transfer_type="SUBMIT_PASSWORD";
		standalone_hmi.hmiAjaxExchange_exec();
	  }
	  else
	  {
		standalone_hmi.timer_func();
	  }
		  
	},
	set_timer_state:function(enabled)
	{
		if (enabled==true)
		{
			this.timer_stopped=false;
		}
		else
		{
			this.timer_stopped=true;
		}
	},
	set_submission_state:function(enabled)
	{
		this.submission_state=enabled;
	},
	timer_func:function()
	{
		if (standalone_hmi.preview_mode==true)
		{
			standalone_hmi.prog_div=window.document.getElementById("prog");
			standalone_hmi.poll_arr=new ArrayBuffer(64*1024);
			if (this.screen_change==true)
			{
				standalone_hmi.active_screen=standalone_hmi.new_screen_request;	
			}
			standalone_hmi.drawHMI();
		}
		else
		{
			var queue_size=	standalone_hmi.ajax_queue.length;
			window.clearTimeout(this.timer);
			//console.log("timer exec");
			if (this.timer_stopped==false)
			{
				if (queue_size==0)
				{
					//console.log("adding Ajax from Timer");
					this.ajax_batch_get=[];
					var i;
					for(i=0;i<this.hmi_elems.list.length;i++)
					{
						if (this.hmi_elems.list[i].type=="BLOCK")
						{
							this.renderChain(this.HMI_EVENTS.EVT_POLL,this.hmi_elems.list[i]);
						}
					}
					this.AjaxFinalizeBatch();
					this.AjaxAdd("GET",null);
				}
			}
	
		}
	},
	set_AjaxState:function(state)
	{
		this.ajaxStateRequest=state;
	},
	AjaxAddBatchPoll:function(offs)
	{
		this.ajax_batch_get[this.ajax_batch_get.length]=offs;
	},
	AjaxFinalizeBatch:function()
	{
		var i;
		var curr_batch_cnt=0;
		var curr_batch={elems:[]};
		for (i=0;i<this.ajax_batch_get.length;i++)
		{
			if (curr_batch_cnt>=this.MAX_BATCH_SIZE)
			{
				this.AjaxAdd("GET_BATCH",curr_batch);
				curr_batch_cnt=0;
				curr_batch.elems=[];
			}
			if (curr_batch_cnt<this.MAX_BATCH_SIZE)
			{
				curr_batch.elems[curr_batch_cnt]=this.ajax_batch_get[i];
				curr_batch_cnt++;
			}
		}
		if (curr_batch_cnt>0)
		{
			// last batch
			this.AjaxAdd("GET_BATCH",curr_batch);
		}
	},
	
	AjaxAdd:function(type,offs)
	{
		if (standalone_hmi.preview_mode==true)
		{
			return;
		}
		var queue_size=	standalone_hmi.ajax_queue.length;
	standalone_hmi.ajax_queue[standalone_hmi.ajax_queue.length]=JSON.parse(JSON.stringify([type,offs]));
		if (queue_size==0)
		{
			window.clearTimeout(this.timer);
			standalone_hmi.internal_transfer_type="NONE";
			standalone_hmi.hmiAjaxExchange_exec();
		}
	},
	getCurrUser:function()
	{
		return this.curr_user;
	},
	AjaxComplete:function()
	{
		if (typeof abort_ajax!== "undefined")
		{
			if (abort_ajax==true)
			{
				return;
			}
		}

	
		
		//console.log("Ajax _intermid finished");
		standalone_hmi.ajax_queue.splice(0,1);
		if (standalone_hmi.ajax_queue.length==0)
		{
			
			//console.log("ajax complete, timer= "+standalone_hmi.timer_interval);
			standalone_hmi.timer=setTimeout(standalone_hmi.timer_func.bind(standalone_hmi),standalone_hmi.timer_interval);
			return;
		}

		standalone_hmi.internal_transfer_type="NONE";
		//console.log("continue exchange");
		standalone_hmi.hmiAjaxExchange_exec();
	},
	
	// AJAX queue always operates on the elem "0". Once the transfer is complete - it is deleted and next elem becomes "0".
	hmiAjaxExchange_exec:function()
	{
		var type,offs;
		var EXCH_TYPE=
		{
			GET_PROG_VARS:0,
			GET_GOM:1,
			SET_PROG_VARS:2,
			SET_GOM:3,
			GET_GOM_BATCH:4,
		};
		
		if (this.ajaxCurrState!=this.ajaxStateRequest)
		{
			this.ajaxCurrState=this.ajaxStateRequest;
			if (this.ajaxCurrState==this.AJAX_STATE.AJAX_STATE_STOP)
			{
				return;
			}
		}
		var queue_elem_0= standalone_hmi.ajax_queue[0];
		
		if (standalone_hmi.internal_transfer_type=="NONE")
		{
			type=queue_elem_0[0];
			offs=queue_elem_0[1];
			//console.log("ajax invoked with "+type+" "+JSON.stringify(offs));
		}
		else
		{
			type=standalone_hmi.internal_transfer_type;
			//console.log("ajax1 invoked with "+type);
		}
				
		this.curr_exchange_type={};
		
		this.exchange_in_prog=true;
		if ((typeof SIM == "undefined")||(SIM.getSimMode()==false))
		{
			this.curr_ajax= new XMLHttpRequest();
		}
		else
		{
			this.curr_ajax=SIM.getSimAjaxObj();
		}
		var dataView;
		this.curr_ajax.open('POST', this.url+'/pg', true);
		this.curr_ajax.responseType = 'arraybuffer';
		var arr=this.hmi_tmp_arr;
		var dataView=new DataView(arr);
		var i,j;
		var offset=0;
		var inv=this.curr_ajax;
		var op=0;
		var instance=this;
		var internal_type=type;
		
		dataView.setUint8(offset,8); offset++; // code = GOM Access
		offset+=2; // skip request length for now;
		
        standalone_hmi.gom_elem_in_transf=null;
		
		if (type=="GET")
		{
			if (offs==null)
			{
				this.curr_exchange_type=EXCH_TYPE.GET_PROG_VARS;
				if (this.oid_of_argee_vars==-1)
				{
					internal_type="UID_TO_OID";
					op=5;
					dataView.setUint32(offset,op,true);offset+=4; // Operation
					dataView.setUint32(offset,this.ARGEE_PROG_VARS_UID,true);offset+=4;
				}
				else
				{
					// multi-instance-read op
					internal_type="MULTI_INST_READ";
					op=2;
					dataView.setUint32(offset,op,true);offset+=4; // Operation
					dataView.setUint32(offset,1,true);offset+=4; //length
					dataView.setUint32(offset,this.oid_of_argee_vars,true);offset+=4; //OID
				}
			}
			else
			{
				if (offs.uid==65540)
				{
					var jk=1;
				}
				this.curr_exchange_type=EXCH_TYPE.GET_GOM;
				internal_type="GOM_READ "+offs.uid;
				standalone_hmi.gom_elem_in_transf=standalone_hmi.findElemInAllScreens(offs.id);
				op=0;
				dataView.setUint32(offset,op,true);offset+=4; // Operation
				dataView.setUint32(offset,offs.uid,true);offset+=4; // UID
				dataView.setUint32(offset,offs.inst,true);offset+=4; // INST
			}
		}
		else
		{
			if (type=="GET_BATCH")
			{
				this.curr_exchange_type=EXCH_TYPE.GET_GOM_BATCH;
				internal_type="GOM_GET_BATCH";

				op=15; //READ Batch
				dataView.setUint32(offset,op,true);offset+=4; // Operation

				var b_elems=offs.elems;
				dataView.setUint32(offset,b_elems.length,true);offset+=4; // CNT
				
				for(i=0;i<b_elems.length;i++)
				{
					dataView.setUint32(offset,b_elems[i].uid,true);offset+=4; 
					dataView.setUint32(offset,b_elems[i].inst,true);offset+=4; 
				}
			}
			if (type=="SET")
			{
				this.submit_list=JSON.parse(JSON.stringify(offs));
				var curr_time=new Date();
				window.clearTimeout(this.timer);
				if ((this.setSubmitted==false)||((curr_time-this.lastPasswordSubmitTime)>6000))
				{
					type="SUBMIT_PASSWORD";
				}
				else
				{
					type="WRITE_VAR_DATA";
				}
					
			}
			if (type=="SUBMIT_PASSWORD")
			{
				op=1; //WRITE
				dataView.setUint32(offset,op,true);offset+=4; // Operation
				dataView.setUint32(offset,this.ARGEE_CHECK_PASSWORD_UID,true);offset+=4; // UID
				dataView.setUint32(offset,0,true);offset+=4; // INST
				dataView.setUint32(offset,this.password.length,true);offset+=4; //length
				for(i=0;i<this.password.length;i++)
				{
					dataView.setUint8(offset,this.password.charCodeAt(i),true);offset+=1; 
				}
				//console.log("submitting password:"+this.password);
			}
			
			else if (type=="READ_AUTH_STATUS")
			{
				op=0; // READ
				dataView.setUint32(offset,op,true);offset+=4; // Operation
				dataView.setUint32(offset,this.ARGEE_CHECK_PASSWORD_UID,true);offset+=4; // UID
				dataView.setUint32(offset,0,true);offset+=4; // INST
			}
			else if (type=="WRITE_VAR_DATA")
			{
				if (this.submit_list.cmd==undefined)
				{
					this.curr_exchange_type=EXCH_TYPE.SET_PROG_VARS;
					if (standalone_hmi.submission_state==true)
					{
						op=10; // EXT_WRITE_WITH_OFFSET
						dataView.setUint32(offset,op,true);offset+=4; // Operation
						dataView.setUint32(offset,this.ARGEE_PROG_VARS_UID,true);offset+=4; //UID
						dataView.setUint32(offset,0,true);offset+=4; // INST
						dataView.setUint32(offset,this.submit_list.length,true);offset+=4; // LEN
						var dv_obj=new DataView(this.submit_arr);
						for(i=0;i<this.submit_list.length;i++)
						{
							dataView.setUint32(offset,this.submit_list[i][0],true);offset+=4;
							dataView.setUint16(offset,this.submit_list[i][1],true);offset+=2;
							dataView.setUint8(offset,this.submit_list[i][2]);offset+=1;
							dataView.setUint8(offset,this.submit_list[i][3]);offset+=1;
							for(j=0;j<this.submit_list[i][1];j++)
							{
								dataView.setUint8(offset,dv_obj.getUint8(this.submit_list[i][0]+j));offset+=1;
							}
						}
					}
					else
					{
						return;
					}
				}
				else
				{
					if (this.submit_list.cmd=="SET")
					{
						offs=queue_elem_0[1];
						this.curr_exchange_type=EXCH_TYPE.SET_GOM;
						standalone_hmi.gom_elem_in_transf=standalone_hmi.findElemInAllScreens(offs.id);

						// write data 
						op=1;
						dataView.setUint32(offset,op,true);offset+=4; // Operation
						dataView.setUint32(offset,this.submit_list.uid,true);offset+=4; // UID
						dataView.setUint32(offset,this.submit_list.inst,true);offset+=4; // INST
						dataView.setUint32(offset,this.submit_list.data.length,true);offset+=4; //length
						for(i=0;i<this.submit_list.data.length;i++)
						{
							dataView.setUint8(offset,this.submit_list.data[i],true);offset+=1; 
						}
					}
					else
					{
						console.log("should not be here!!!");
					}
						
						
				}
			}
			internal_type=type;
			// write with offsets
		}
		//console.log("HMI Exchange type "+type+" len "+offset);
		dataView.setUint16(1,offset&0xffff,true); // length of request => current offset
		arr=this.hmi_tmp_arr.slice(0,offset);
	
		instance.retransmit_arr=arr.slice(0);
		instance.retransmit_cnt=0;
		instance.ajax=inv;
		inv.timeout=instance.timeout_val;
		/*inv.onerror=function()
		{
			if ((standalone_hmi.curr_exchange_type==EXCH_TYPE.SET_GOM)||
			    (standalone_hmi.curr_exchange_type==EXCH_TYPE.GET_GOM))
			{
				instance.ajax.abort();
				instance.exchange_in_prog=false;
				standalone_hmi.gom_elem_in_transf.resp_func(false,0);
			}
		}*/
		
		inv.ontimeout = function ()
		{
			if ((standalone_hmi.curr_exchange_type==EXCH_TYPE.SET_GOM)||
			    (standalone_hmi.curr_exchange_type==EXCH_TYPE.GET_GOM))
			{
				instance.ajax.abort();
				console.log("timeout1");
				instance.exchange_in_prog=false;
				standalone_hmi.gom_elem_in_transf.resp_func(false,0);
				standalone_hmi.AjaxComplete();
			}
			else
			{
				if (instance.retransmit_cnt<20)
				{
					console.log("retransmission "+instance.retransmit_cnt);
					return;
				}		
				instance.retransmit_cnt=30;
				instance.prog_div=window.document.getElementById("prog");
				instance.prog_div.style.visibility = 'visible';
				instance.prog_div.innerHTML="<h1>Can not connect to the device: "+instance.url+"</h1>"; 
			}
			
			return;
		}.bind(this);
		inv.onreadystatechange=function()
		{
			if ((this.readyState==4)&&(this.status==0))
			{
				if ((standalone_hmi.curr_exchange_type==EXCH_TYPE.SET_GOM)||
					(standalone_hmi.curr_exchange_type==EXCH_TYPE.GET_GOM))
				{
					instance.ajax.abort();
					console.log("timeout2");
					standalone_hmi.gom_elem_in_transf.resp_func(false,0);
					instance.exchange_in_prog=false;
					standalone_hmi.AjaxComplete();
				}
				else
				{
					if (instance.retransmit_cnt<20)
					{
						var state_func=instance.curr_ajax.onreadystatechange;
						var timeout_func=instance.curr_ajax.ontimeout
						console.log("retransmission1 "+instance.retransmit_cnt);
						instance.curr_ajax.abort();
						
						instance.curr_ajax= new XMLHttpRequest();
						inv=instance.curr_ajax;
						instance.curr_ajax.open('POST', instance.url+'/pg', true);
						instance.curr_ajax.responseType = 'arraybuffer';
						instance.curr_ajax.timeout=instance.timeout_val;
						instance.curr_ajax.onreadystatechange=state_func;
						instance.curr_ajax.ontimeout=timeout_func;
						
						instance.retransmit_cnt++;
						instance.curr_ajax.send(instance.retransmit_arr);
					}
					else
					{
						instance.retransmit_cnt=30;
						instance.prog_div=window.document.getElementById("prog");
						instance.prog_div.style.visibility = 'visible';
						instance.prog_div.innerHTML="<h1>Can not connect to the device: "+instance.url+"</h1>"; 
						instance.exchange_in_prog=false;
					}
				}
				return;
			}
				
			if ((this.readyState==4)&&(this.status==200))
			{
				instance.exchange_in_prog=false;
				//console.log("Exchange Internal type="+internal_type);
				//console.log("Exchange type1="+standalone_hmi.curr_exchange_type);			
				var hmi_screens=window.document.getElementById("hmi_present_27041978");
				// we can check if we are on a specific screen or not by the presense of a specific div. This only applies to testing in the PG environment since in standalone HMI this page is always going to be there (otherwise we change the page location).
				//console.log("Processed "+internal_type);
				if (internal_type=="SUBMIT_PASSWORD")
				{
					standalone_hmi.internal_transfer_type="READ_AUTH_STATUS";
					instance.hmiAjaxExchange_exec();
					return;
				}
				if (internal_type=="READ_AUTH_STATUS")
				{
					var arr=inv.response; // arrayBuffer;
					dataView=new DataView(arr);
					var offset=4; // skip len 
					var res=dataView.getUint8(offset);
					standalone_hmi.curr_user=res;
					console.log("Read Auth Stat "+res);
					if (res>0)
					{
						
						instance.setSubmitted=true;
						instance.lastPasswordSubmitTime=new Date();
						standalone_hmi.internal_transfer_type="WRITE_VAR_DATA";
						instance.hmiAjaxExchange_exec()
						return;
					}
					else
					{
						var cmd_type=queue_elem_0[0];
						var cmd_args=queue_elem_0[1];
						if (cmd_args.id!=undefined)
						{
							var target_obj=standalone_hmi.findElemInAllScreens(cmd_args.id);
							target_obj.resp_func(false,0);
							standalone_hmi.AjaxComplete();							
							return;
						}
						else
						{
							instance.PasswordDlgShow();
						}
					}
				}

				if (internal_type=="UID_TO_OID")
				{
					var arr=inv.response; // arrayBuffer;
					dataView=new DataView(arr);
					instance.oid_of_argee_vars=dataView.getUint32(0,true);
					standalone_hmi.internal_transfer_type="NONE";
					console.log("UID_TO_OID resolved");
					instance.hmiAjaxExchange_exec()
					return;
				}
				
				
				




				if ((standalone_hmi.curr_exchange_type==EXCH_TYPE.SET_GOM)||
					(standalone_hmi.curr_exchange_type==EXCH_TYPE.GET_GOM))
				{
					standalone_hmi.gom_elem_in_transf.resp_func(true,inv.response);
					standalone_hmi.AjaxComplete();
					return;
				}
				
				
				if ((standalone_hmi.curr_exchange_type==EXCH_TYPE.GET_GOM_BATCH))
				{
					var elems=queue_elem_0[1].elems;
					var cnt=elems.length;
					var i,len;
					var dv=new DataView(inv.response);
					var offset=0;
					for(i=0;i<cnt;i++)
					{
						len=dv.getUint16(offset,true);offset+=2;
						var j;
						var obj_data=new Uint8Array(4+len);
						for(j=0;j<len;j++)
						{
							obj_data[j+4]=dv.getUint8(offset+j);
						}
						offset+=len;
						var transf_elem=standalone_hmi.findElemInAllScreens(elems[i].id);
						transf_elem.resp_func(true,obj_data.buffer);
					}
					standalone_hmi.AjaxComplete();
					return;
				}
				
                if ((instance.before_first_draw==true)||((hmi_screens!=null)&&(standalone_hmi.curr_exchange_type==EXCH_TYPE.GET_PROG_VARS)))
				{
					var arr=inv.response; // arrayBuffer;
					dataView=new DataView(arr);
					instance.prog_div=window.document.getElementById("prog");
					var offset=4; // skip OID 
					offset+=4; // skip num_inst 
					var len1=dataView.getUint32(offset,true);offset+=4; // inst length
					instance.poll_arr=arr.slice(offset);
					instance.before_first_draw=false;
					
					
					
					if (instance.hmi_elems.active_screen_offset!=undefined)
					{
						var descr={offset:instance.hmi_elems.active_screen_offset,
						           sub_type:"CHAR",is_array:true};								   
						var act_scr=instance.getVarValue(descr,false);
						if (instance.hmi_elems.list[instance.active_screen].name!=act_scr)
						{
							var acr_scr_ind;
							var found=false;
							for(acr_scr_ind=0;acr_scr_ind<instance.hmi_elems.list.length;acr_scr_ind++)
							{
								if (instance.hmi_elems.list[acr_scr_ind].name==act_scr)
								{
									found=true;
									break;
								}
							}
							if (found==true)
							{
								instance.screen_change=true;
								instance.new_screen_request=acr_scr_ind;
							}
						}
					}
					
					if (instance.screen_change==true)
					{
						
						instance.screen_change=false;
						instance.active_screen=instance.new_screen_request;
						instance.submit_arr=instance.poll_arr.slice(0);
						instance.drawHMI();
						console.log("screen change");
						standalone_hmi.timer_interval=0;
						standalone_hmi.AjaxComplete();
						return;
					}
					else
					{
						// update screen data
						instance.redrawHMI();
					}
					
					if (standalone_hmi.file_op_in_progress==true)
					{
						// check if the request is switched to "2" -> it means that the program
						// processed the value and it is ready to perform data transfers
						if (instance.getVarValue(standalone_hmi.ref_obj.list[3],false)==standalone_hmi.ref_num)
						{
							var chunk_size=instance.getVarValue(standalone_hmi.ref_obj.list[1],false);
							var chunk_offset=instance.getVarValue(standalone_hmi.ref_obj.list[2],false);

							if (instance.ref_obj_dir==0)// upload
							{
								var arr=standalone_hmi.ref_exchange_arr.slice(chunk_offset,chunk_offset+chunk_size);
								standalone_hmi.setVarValue(standalone_hmi.ref_obj.list[4],arr); //
							}
							else
							{
								var arr=standalone_hmi.getVarValue(standalone_hmi.ref_obj.list[4],false);
								var i;
								for(i=chunk_offset;i<(chunk_offset+chunk_size);i++)
								{
									standalone_hmi.ref_exchange_arr[i]=arr[i-chunk_offset];
								}
							}
							standalone_hmi.setVarValue(standalone_hmi.ref_obj.list[3],standalone_hmi.ref_num+2); // new data ready
							
							//console.log("sending "+chunk_offset+" ref_num "+(standalone_hmi.ref_num+2));
							if (standalone_hmi.ref_num==2) // increment ref_num -> toggling scheme
							{
								standalone_hmi.ref_num=3;
							}
							else
							{
								standalone_hmi.ref_num=2;
							}
							
							if (instance.ref_obj_dir==0)// upload
							{
								standalone_hmi.AjaxAdd("SET",
								   [
										
										[standalone_hmi.ref_obj.list[4].offset,standalone_hmi.getObjSize(standalone_hmi.ref_obj.list[4]),-1,-1],
										[standalone_hmi.ref_obj.list[3].offset,standalone_hmi.getObjSize(standalone_hmi.ref_obj.list[3]),-1,-1],
								   ]
								);
							}
							else   // download
							{
								standalone_hmi.AjaxAdd("SET",
								   [
										
										[standalone_hmi.ref_obj.list[3].offset,standalone_hmi.getObjSize(standalone_hmi.ref_obj.list[3]),-1,-1],
								   ]
								);
							}
							standalone_hmi.AjaxComplete();
							return;							
						}
						// client is done working with the file
						if ((instance.getVarValue(standalone_hmi.ref_obj.list[3],false)==10)&&
						    (instance.getVarValue(standalone_hmi.ref_obj.list[3],true)!=7))
						{
							standalone_hmi.file_op_in_progress=false;
							if (instance.ref_obj_dir==1)// download
							{
								// create a file containing "ref_exchange_arr"
								var imgDLHelper = window.document.getElementById('imgdlhelper');
								imgDLHelper.download=instance.ref_filename;
								var unt8arr=new Uint8Array(instance.ref_exchange_arr.length);
								for(i=0;i<instance.ref_exchange_arr.length;i++)
								{
									unt8arr[i]=instance.ref_exchange_arr[i];
								}
								blob = new Blob([unt8arr], { type: 'application/octet-stream;base64' }); 
								var blobUrl = URL.createObjectURL(blob);
								
								imgDLHelper.href=blobUrl;
								imgDLHelper.click();
							}
						}
						
					}
					//console.log("ajax complete1");
					
					// schedule_next_exchange					
					if (standalone_hmi.file_op_in_progress==true)
					{
						//console.log("set timer 3");
						standalone_hmi.timer_interval=20;
					}
					else
					{
						//instance.timer=setTimeout(instance.timer_func.bind(instance),500);
						if (instance.timer_stopped==false)
						{
							//console.log("set timer 4");
							standalone_hmi.timer_interval=500;
						}
					}						
				}
				else if (internal_type=="WRITE_VAR_DATA")
				{
					if (instance.timer_stopped==false)
					{
						//console.log("set timer 5");
						standalone_hmi.timer_interval=0;
					}
					standalone_hmi.submit_cnt++;
				}
				else
				{
					//console.log("Switch screen - stop timer");
				}
				standalone_hmi.AjaxComplete();
			}
			
		}
		//console.log("ajax transmitted "+internal_type);
		inv.send(arr);
		
		
		if ((typeof SIM != "undefined")&&(SIM.getSimMode()==true))
		{
			SIM.simExchTrig();
		}

		
	},
	getBitField:function(descr,val)
	{
		if ((descr.bit_offset==undefined)||(descr.bit_offset==-1))
		{
			return val;
		}
		else
		{
			var type=descr.sub_type;
			var mask=0xffffffff>>>(32-descr.bit_len);
			return (val>>>descr.bit_offset)&mask;
		}
	},
	
	getVarValue:function(descr,editable) //(addr,type,isArray,editable)
	{
		var dv;
		var obj_arr;
		var addr=descr.offset;
		var type=descr.sub_type;
		var isArray=descr.is_array;
		var i;

		if (editable==false)
		{
			dv=new DataView(this.poll_arr);
			obj_arr=this.poll_arr;
			
		}
		else
		{
			dv=new DataView(this.submit_arr);
			obj_arr=this.submit_arr;
		}
		if ((isArray==true)&&
		    (
			  (type=="WORD")||
			  (type=="RETAIN_INT")||
			  (type=="STATE")||
			  (type=="INT")||
			  (type=="BYTE")||
			  (type=="RETAIN_REAL")||
			  (type=="REAL")))
		{
			var hex_disp=false;
			var float_disp=false;
			var num_bytes=4;
			switch(type)
			{
				case "WORD":hex_disp=true;num_bytes=2;break;
				case "BYTE":hex_disp=true;num_bytes=1;break;
				case "STATE":
				case "INT":
				case "RETAIN_INT":	num_bytes=4;break;
				case "REAL":
				case "RETAIN_REAL":	num_bytes=4;float_disp=true;break;				
			}
			var arr_len=dv.getUint16(addr,true);
			var num_elems=arr_len/num_bytes;
			var offset=addr+4;
			var res_arr=[];
			for(i=0;i<num_elems;i++)
			{
				if (float_disp==true)
				{
					res_arr[i]=dv.getFloat32(offset,true).toString();
				}
				else if (hex_disp==true)
				{
					switch(num_bytes)
					{
						case 2:res_arr[i]="0x"+this.pad(dv.getUint16(offset,true).toString(16),2);break;
						case 1:res_arr[i]="0x"+dv.getUint8(offset).toString(16);break;
					}
				}
				else
				{
					res_arr[i]=dv.getInt32(offset,true).toString();
				}
				offset+=num_bytes;
			}
			return res_arr;
		}
		else
		{			
			switch(type)
			{
				case "WORD": return this.getBitField(descr,dv.getUint16(addr,true));
				case "RETAIN_INT":
				case "STATE":
				case "INT": return this.getBitField(descr,dv.getInt32(addr,true));
				case "BYTE": return this.getBitField(descr,dv.getUint8(addr));
				case "RETAIN_REAL":
				case "REAL": return dv.getFloat32(addr,true);
				case "CHAR": 
							if (isArray==true)
							{
								var arr_len=dv.getUint16(addr,true);
								var sub_arr=obj_arr.slice(addr+4,addr+4+arr_len-1);
								return this.arrToString(sub_arr);
							}
							return String.fromCharCode(dv.getUint8(addr));
			}
		}
		return 0;
	},
	convStringToArr:function (str)
	{
		var i;
		var arr=new Uint8Array(str.length+1);
		for(i=0;i<str.length;i++)
		{
			arr[i]=str.charCodeAt(i);
		}
		arr[arr.length]=0; // null terminate
		return arr.buffer;
	},
	arrToString:function (arr)
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
	},
	setObjArrAtOffset:function(arr_obj,offset,arr,len,descr)
	{
		var i;
		var val_dv=new DataView(arr_obj);
		if (descr.bit_offset==-1)
		{
			
			var arr1=new Uint8Array(arr);
			for(i=0;i<len;i++)
			{
				val_dv.setUint8(offset+i,arr1[i]);
			}
		}
		else
		{
			var src_data=new DataView(arr);
			switch(descr.size)
			{
				case 1: 
					var val=src_data.getUint8(0);
					var mask=0xff>>>(8-descr.bit_len);
					val=val&mask;
					var data_at_dest=val_dv.getUint8(offset);
					var mask1=mask<<descr.bit_offset;
					data_at_dest&=~mask1;
					data_at_dest|=val<<descr.bit_offset;
					val_dv.setUint8(offset,data_at_dest);
					break;
				case 2:
					var val=src_data.getUint16(0,true);
					var mask=0xffff>>>(16-descr.bit_len);
					val=val&mask;
					var data_at_dest=val_dv.getUint16(offset,true);
					var mask1=mask<<descr.bit_offset;
					data_at_dest&=~mask1;
					data_at_dest|=val<<descr.bit_offset;
					val_dv.setUint16(offset,data_at_dest,true);
					break;
				case 4:
					var val=src_data.getUint32(0,true);
					var mask=0xffffffff>>>(32-descr.bit_len);
					val=val&mask;
					var data_at_dest=val_dv.getUint32(offset,true);
					var mask1=mask<<descr.bit_offset;
					data_at_dest&=~mask1;
					data_at_dest|=val<<descr.bit_offset;
					val_dv.setUint32(offset,data_at_dest,true);
					break;
			}
		}
	},
	getObjSize:function(descr)
	{
		if (descr.is_array==false)
		{
			return descr.size;
		}
		else
		{
			return descr.size*descr.num_elems+4;
		}
	},
	setVarValue:function(descr,val)//(addr,type,isArray,value)
	{
		var arr_tmp=new ArrayBuffer(64);
		var arr_tmp_dv=new DataView(arr_tmp);
		var dv=new DataView(this.submit_arr);
		var len;
		var value;
		var addr=descr.offset;
		var type=descr.sub_type;
		var isArray=descr.is_array;
		
		if (type=="CHAR")
		{
			value=val;
		}
        else if ((type=="REAL")||(type=="RETAIN_REAL"))
        {
            value=parseFloat(val);
        }
		else
		{
			value=parseInt(val);
		}
		
		switch(type)
		{
			case "WORD": len=2;	arr_tmp_dv.setUint16(0,value,true); break;
			case "RETAIN_INT":
			case "STATE":
			case "INT": len=4;	arr_tmp_dv.setInt32(0,value,true); break;
			case "RETAIN_REAL":
			case "REAL": len=4;	arr_tmp_dv.setFloat32(0,value,true); break;
			case "BYTE": 
						 if (isArray==true)
						 {
							 var arr_len=dv.getUint16(addr,true);
							 if (arr_len<value.length)
							 {
								 alert("array too large");
								 return;
							 }
							 var arr=new Uint8Array(val.length);
							 var i;
							 for(i=0;i<val.length;i++)
							 {
								 arr[i]=val[i];
							 }
							 this.setObjArrAtOffset(this.submit_arr,addr+4,arr,arr.byteLength,descr);
							 return;
						 }					 
						 else
						 {
							len=1;	
							arr_tmp_dv.setUint8(0,value); 
							break;
						 }
			case "CHAR": 
						 if (isArray==true)
						 {
							 var arr_len=dv.getUint16(addr,true);
							 if (arr_len<value.length)
							 {
								 alert("String too large");
								 return;
							 }
							 var arr=this.convStringToArr(value);
							 this.setObjArrAtOffset(this.submit_arr,addr+4,arr,arr.byteLength,descr);
							 return;
						 }
						 len=1;
						 arr_tmp_dv.setUint8(0,value.charCodeAt(0)); 
						 break;
		}
		this.setObjArrAtOffset(this.submit_arr,addr,arr_tmp,len,descr);
	},
	getPrePostHTML:function(elem)
	{
		var ret_arr=["",""];
		var i;
		for(i=0;i<elem.extra_elements.length;i++)
		{
			ret_arr[i]=elem.extra_elements[i];
		}
		return ret_arr;
		
	},
	
	checkForScreensElement:function(obj)
	{
		if (this.rend_types[obj.rend].name=="HMI_SCREEN_LIST")
		{
			this.inner_screenlist_present=true;
		}
		if ((this.rend_types[obj.rend].name=="HMI_GRID_LINK")&&(this.preview_mode==false))
		{
			this.inner_screenlist_present=true;
		}
	},
	
	compileGlobalEditFieldList:function(elem)
	{
		
		if (
			(this.rend_types[elem.rend].name=="HMI_GRID_ENTER")||
			(this.rend_types[elem.rend].name=="HMI_MULTI_STATE_ENTER")||
			(this.rend_types[elem.rend].name=="HMI_ENTER_NUM")||
			(this.rend_types[elem.rend].name=="HMI_ENTER_STATE"))
		{
			this.globalEditFieldList[this.globalEditFieldList.length]=[elem.var_descr.offset,this.getObjSize(elem.var_descr),elem.var_descr.bit_offset,elem.var_descr.bit_len];
		}
	},
	
	// on initial invocation or on screen change 
	drawHMI:function()
	{
		this.editable_elements_for_curr_button=[];
		var rend="";
		var i,j,k;
		
		var scr=this.hmi_elems.list[this.active_screen];
		if (scr.type=="BLOCK")
		{
			var fixed="<div id=\"hmi_present_27041978\" style=\"    visibility: hidden; position: absolute; top: -9999px;\"></div>"
			var block_screen_cont=this.renderChain(this.HMI_EVENTS.EVT_INIT_START,scr);
			this.prog_div.innerHTML=fixed+block_screen_cont;
			//console.log("cont="+block_screen_cont);
			this.prog_div.style.overflowX="hidden";
			this.onResize();
			return;
		}			
		
		
		var bound_func=this.checkForScreensElement.bind(this);
		this.inner_screenlist_present=false;
		this.enumerateLeafElements(bound_func,this.hmi_elems.list[this.active_screen]);
		
		this.globalEditFieldList=[];
		bound_func=this.compileGlobalEditFieldList.bind(this);
		this.enumerateLeafElements(bound_func,this.hmi_elems.list[this.active_screen]);
		var height_str="";
		this.links=[];

		
		//this.prog_div.innerHTML="<table style=\"width:100%;height:100%\"><tr><td valign=\"top\" width=\"30%\" style=\"border-right: solid;border-right-color: brown\" ><div id=\"hmi_screens\" ></div></td><td width=\"70%\" height=\"100%\" valign=\"top\"><div id=\"hmi_active_screen\"></div></td></tr></table>";
		this.prog_div.innerHTML="<a id=\"imgdlhelper\" style=\"display:none;\"  download=\"test.txt\" href=\"\">&nbsp;</a>";
		this.prog_div.innerHTML+="<div id=\"hmi_present_27041978\" style=\"    visibility: hidden; position: absolute; top: -9999px;\"></div>"
		this.prog_div.style.overflowX="hidden";
		
		if (typeof SIM != "undefined")
		{
			this.prog_div.style.fontFamily=hmi_font_family;
		}
		
		var screens_div;
		if (this.inner_screenlist_present==false)
		{
			if (standalone_hmi.preview_mode==true)
			{
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\"background-color:white;width:100%;\"></div><div style=\"overflow-y:auto;overflow-x:hidden;"+height_str+" -webkit-overflow-scrolling: touch;\" id=\"hmi_active_screen\"></div>";
			}
			else if (typeof SIM != "undefined")
			{
				//this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\"background-color:white;top:7.2em;width:100%;\"></div><div style=\"top:10.7em;"+height_str+" -webkit-overflow-scrolling: touch;transform:scale(0.9);\" id=\"hmi_active_screen\"></div>";
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\"background-color:white;top:7.2em;width:100%;\"></div><div style=\""+height_str+" -webkit-overflow-scrolling: touch;\" id=\"hmi_active_screen\"></div>";
			}
			else if (typeof window.orientation !== 'undefined')
			{
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\""+this.simp_font_150_str+"background-color:white;top:0em;position: fixed; z-index: 5555;width:100%;\"></div><div style=\""+this.simp_font_150_str+height_str+"position: fixed;top:12em;z-index: 999;overflow-y:auto;overflow-x:hidden; -webkit-overflow-scrolling: touch;width:100%;\" id=\"hmi_active_screen\"></div>";
			}	
			else
			{
				height_str="height:100%;";
				//this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\""+this.simp_font_150_str+"background-color:white;top:0em;position: fixed; z-index: 5555;width:100%;\"></div><div style=\""+this.simp_font_150_str+height_str+"position: relative;top:12.8em;z-index: 999;overflow-y:auto;overflow-x:hidden; -webkit-overflow-scrolling: touch;\" id=\"hmi_active_screen\"></div>";
				//this.prog_div.style.overflow="hidden";
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\""+this.simp_font_150_str+"background-color:white;top:0em;width:100%;\"></div><div style=\""+this.simp_font_150_str+height_str+"top:12.8em; -webkit-overflow-scrolling: touch;\" id=\"hmi_active_screen\"></div>";
				this.prog_div.style.overflow="inherit";
				
			}
			screens_div=window.document.getElementById("hmi_screens");
		}
		else
		{
			if (standalone_hmi.preview_mode==true)
			{
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\"background-color:white;width:100%;\"></div><div style=\"overflow-y:auto;overflow-x:hidden;"+height_str+" -webkit-overflow-scrolling: touch;\" id=\"hmi_active_screen\"></div>";
			}
			else if (typeof SIM != "undefined")
			{
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\"background-color:white;top:7.2em;position: fixed; z-index: 5555;width:100%;\"></div><div style=\"position: relative;top:1em;z-index: 999;overflow-y:auto;overflow-x:hidden;"+height_str+" -webkit-overflow-scrolling: touch;width:100%;\" id=\"hmi_active_screen\"></div>";
			}
			else if (typeof window.orientation !== 'undefined')
			{
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\""+this.simp_font_150_str+"background-color:white;top:0em;position: fixed; z-index: 5555;width:100%;\"></div><div style=\""+this.simp_font_150_str+height_str+"position: relative;top:0em;z-index: 999;overflow-y:auto; -webkit-overflow-scrolling: touch;width:100%;\" id=\"hmi_active_screen\"></div>";
			}	
			else
			{
				this.prog_div.innerHTML+="<div  id=\"hmi_screens\" style=\""+this.simp_font_150_str+"background-color:white;top:0em;position: fixed; z-index: 5555;width:100%;\"></div><div style=\""+this.simp_font_150_str+height_str+"position: relative;top:0em;z-index: 999;overflow-y:auto;overflow-x:hidden; -webkit-overflow-scrolling: touch;width:100%;\" id=\"hmi_active_screen\"></div>";
			}
		}
		
		if (scr.type=="HMI_GRID_SCREEN")
		{
			rend="";
			for(i=0;i<scr.list.length;i++)
			{
				var elem=scr.list[i];
				if (typeof elem ==='string')
				{
					rend+=elem;
				}
				else
				{
					var rend_type=elem.rend;
					var elem_html=this.rend_types[rend_type].render(elem);
					rend+="<div id=\"elem_id_"+elem.elem_id+"\">"+elem_html+"</div>";
				}
					
			}
			
		}
		else
		{
			rend="<center><div style=\""+this.scr_width+"\"><fieldset style=\"padding:1em;background:#f7f6f6;\">";
			rend+="<center><h1>"+scr.name+"</h1><br><br></center>"
			rend+="<center><table style=\""+this.scr_width+"border-collapse:collapse;"+this.simp_font_200_str+"\" border=\"1\" >";
			for(i=0;i<scr.list.length;i++)
			{
				rend+="<tr><td colspan=\"2\" style=\"border-top: 1px solid transparent;border-left: 1px solid transparent;border-right: 1px solid transparent;\"><b>"+scr.list[i].name+"</b></td></tr>";
				var sect_elem_list=scr.list[i].list
				for(ii=0;ii<sect_elem_list.length;ii++)
				{
					rend+=this.renderElement(sect_elem_list[ii],i,ii);
				}
				if (i<(scr.list.length-1))
				{
					rend+="<tr><td style=\"height:5em;border-left: 1px solid transparent;border-right: 1px solid transparent;\" colspan=\"2\"></td></tr>";
				}
			}
			rend+="</table></center>";	
			rend+="</fieldset></div></center>";
		}
		var act_screen_div=window.document.getElementById("hmi_active_screen");
		act_screen_div.innerHTML=rend;
		
		
		rend="";
		var test_str="";
		if ((typeof SIM!="undefined")&&(SIM.getSimMode()==false))
		{
			test_str="To test the page on the device <a href=\""+(this.url+"/hmi.html")+"\">(click here)</a>";
			setCompilerMessage(false,false,test_str);
		}
		if (this.inner_screenlist_present==false)
		{
			rend+="<center><div style=\""+this.scr_width+"\"><fieldset style=\"padding:1em;background:#fff8a2;\">";
			if (this.hmi_elems.proj_title.length!=0)
			{
				rend+="<center><h1>Screens for "+(this.hmi_elems.proj_title)+"</h1>";
			}
			else
			{
				
				rend+="<center><h1>Screens </h1>";
			}
			rend+="<table style=\""+this.simp_font_200_str+"\" border=\"1\"><tr>";
			for(i=0;i<this.hmi_elems.list.length;i++)
			{
				if (this.hmi_elems.list[i].type=="BLOCK")
				{
					name=this.hmi_elems.list[i].func.args[0].name;
				}
				else
				{
					name=this.hmi_elems.list[i].name;
				}
				
				rend+="<td id=\"hmi_screen_"+i+"\"><a href='#' onclick=\"standalone_hmi.clickHMI_Link("+i+")\">"+name+"</a></td>";
				this.screen_background_color[i]=0;
			}
			rend+="</tr></table></center>"
			rend+="</fieldset></div></center>";
			screens_div.innerHTML=rend;
		}
		
		this.onResize();
	},
	
	redrawHMI_ScreenElem:function(elem)
	{
		if (this.rend_types[elem.rend].auto_refresh==1)
		{
			this.background_color_of_active_element=0;
			var str=this.rend_types[elem.rend].render(elem);
			if (this.background_color_of_active_element!=0)
			{
				if (this.background_color_of_active_element>this.screen_background_color[this.curr_hmi_screen_redraw])
				{
					this.screen_background_color[this.curr_hmi_screen_redraw]=this.background_color_of_active_element;
				}
			}
			if ((this.active_screen==this.curr_hmi_screen_redraw)&&(this.rend_types[elem.rend].dont_display!=true))
			{
				var elem_dom=window.document.getElementById("elem_id_"+elem.elem_id);
				var str=this.rend_types[elem.rend].render(elem);
				elem_dom.innerHTML=str;
			}
		}
	},
	
	redrawHMI:function()
	{
		var scr=this.hmi_elems.list[this.active_screen];
		var i,j,k;
		for(i=0;i<this.hmi_elems.list.length;i++)
		{
			if (this.hmi_elems.list[i].type=="BLOCK")
			{
				this.renderChain(this.HMI_EVENTS.EVT_STATUS_UPDATE_START,this.hmi_elems.list[i]);
			}
			else
			{
				this.curr_hmi_screen_redraw=i;
				var bound_func=this.redrawHMI_ScreenElem.bind(this);
				this.enumerateLeafElements(bound_func,this.hmi_elems.list[i]);
			}
		}
		if (scr.type=="BLOCK")
		{
			this.renderChain(this.HMI_EVENTS.EVT_REDRAW_START,scr);
			return;
		}


		for(i=0;i<this.screen_background_color.length;i++)
		{
			var elem_dom=window.document.getElementById("hmi_screen_"+i);
			if (elem_dom!=null)
			{
				switch(this.screen_background_color[i])
				{
					case 0:elem_dom.style.backgroundColor="lightgreen"; break;
					case 1:elem_dom.style.backgroundColor="yellow"; break;
					case 2:elem_dom.style.backgroundColor="red"; break;
				}
			}
			this.screen_background_color[i]=0;
		}


		
		for(i=0;i<this.links.length;i++)
		{
			// only handle links on the active screen
			var elem=this.links[i];
			var link_name=this.getVarValue(elem.list[0],false);
			var link_bg_color=this.getVarValue(elem.list[2],false);
			var elem_dom=window.document.getElementById("link_id_"+elem.elem_id);
			if (elem_dom.innerText!=link_name)
			{
				elem_dom.innerText=link_name;
			}
			var td_elem=window.document.getElementById("td_id_"+elem.elem_id);
			if (td_elem!=null)
			{
				if (td_elem.style.backgroundColor!=link_bg_color)
				{
					td_elem.style.backgroundColor=link_bg_color;
				}
			}
			var jk=1;
		}
		
		
	},
	clickHMI_Link:function(link)
	{
		this.new_screen_request=link;
		this.screen_change=true;
		console.log("Screen chanre requested to "+link);
		//this.screen_change_trigger=true;
		this.timer_func();
	},
	
	renderElement:function(obj,sect,sect_elem)
	{
		var rend=obj.rend;
		var str="";
		var num_cols=this.rend_types[rend].format.length;
		
		
		
		str+="<tr>";
		var elem_html=this.rend_types[rend].render(obj);
		
		if (num_cols==2)
		{
			if ((sect_elem%2)!=0)
			{
				str+="<td style=\"width:50%\" bgcolor=\"#e6e6e6\">"+obj.list[0].name+"</td>";
			}
			else
			{
				str+="<td style=\"width:50%\" bgcolor=\"lightgrey\">"+obj.list[0].name+"</td>";
			}
			str+="<td style=\"width:50%\"><div id=\"elem_id_"+obj.elem_id+"\">"+elem_html+"</div></td>"
		}
		else
		{
			str+="<td colspan=\"2\" style=\"width:100%\"><div id=\"elem_id_"+obj.elem_id+"\">"+elem_html+"</div></td>";
		}
		str+="</tr>";
		return str;	
	},
	onElemEdit:function (elem)
	{
		var val=elem.value;
		var obj=JSON.parse(elem.dataset.elem_obj);
		this.rend_types[obj.rend].handle_inp(elem,obj);
	},
		
	// on initial invocation or on screen change 
/*	drawHMI:function()
	{
		var redraw=true;
		// need to differentiate between draw and redraw
		if (this.screen_change==true)
		{
			this.screen_change=false;
			this.prog_div.innerHTML=this.renderChain(HMI_EVENTS.EVT_INIT_START,this.curr_block);
			this.prog_div.style.overflowX="hidden";
			this.onResize();
		}
		else
		{
			this.renderChain(HMI_EVENTS.EVT_REDRAW_START,this.curr_block);
		}			
		},
	*/
	renderChain:function(evt,elem)
	{
		var out="";
		if (elem.type=="FUNC")
		{
			out+=elem.func_ptr(evt,elem);
		}
		else if (elem.type=="BLOCK")
		{
			var i;
			out+=elem.func.func_ptr(evt,elem.func);
			for(i=0;i<elem.list.length;i++)
			{
				out+=this.renderChain(evt,elem.list[i]);
			}
			out+=elem.func.func_ptr(evt+1,elem.func);
		}
		return out;
	},	
	
	preProcessBlock:function(elem)
	{
		if (elem.type=="BLOCK")
		{
			elem.func.id="hmi_elem_"+this.curr_id;
			elem.func.num_id=this.curr_id;
			elem.func.func_ptr=standalone_hmi_custom_renderers[elem.func.name];
			elem.func.parent=elem;
			this.curr_id++;
			var i;
			for(i=0;i<elem.list.length;i++)
			{
				elem.list[i].parent=elem;
				this.preProcessBlock(elem.list[i]);
			}
		}
		else
		{
			elem.id="hmi_elem_"+this.curr_id;
			elem.num_id=this.curr_id;
			elem.func_ptr=standalone_hmi_custom_renderers[elem.name];
			this.curr_id++;
		}

	},
	
	preProcesBlockObjects:function(elems)
	{
	  var i;
	  this.curr_id=0;
      this.curr_block=null;
	  this.block_change=true;		
      this.active_block=0;
	  this.new_block_request=0;		

		
		for(i=0;i<elems.list.length;i++)
		{
			if (elems.list[i].type=="BLOCK")
			{
				this.preProcessBlock(elems.list[i]);
			}
		}			
	},
	findElemById:function(elem,id_num)
	{
		var res=null;
		var i;
		if (elem.type=="FUNC")
		{
			if (elem.num_id==id_num)
			{
				return elem;
			}
			return null;
		}
		else if (elem.type=="BLOCK")
		{
			if ((res=this.findElemById(elem.func,id_num))!=null)
			{
				return res;
			}
			for(i=0;i<elem.list.length;i++)
			{
				if ((res=this.findElemById(elem.list[i],id_num))!=null)
				{
					return res;
				}
			}
		}
		return res;
	},
	findElemInAllScreens:function(id_num)
	{
		var i;
		for(i=0;i<this.hmi_elems.list.length;i++)
		{
			if (this.hmi_elems.list[i].type=="BLOCK")
			{
				var res=this.findElemById(this.hmi_elems.list[i],id_num);
				if (res!=null)
				{
					return res;
				}
			}
		}
		return null;
	},


};




var standalone_hmi_custom_renderers=
{
	
};

