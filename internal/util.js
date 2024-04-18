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
 *  DESCRIPTION: Various utility  functions (e.g "check if a string represents a 
 *               variable name", "convert from javascript number to an integer").
 *
 *******************************************************************************/

//from http://javascript.about.com/library/blipconvert.htm
function dot2num(dot) 
{
    var d = dot.split('.');
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

function num2dot(num) 
{
    var d = num%256;
    for (var i = 3; i > 0; i--) 
    { 
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}

function arrayCmp(arr1,arr2,offset,len)
{
	var i;
	for(i=0;i<len;i++)
	{
		if (arr1[i+offset]!=arr2[i+offset])
		{
			return false;
		}
	}
	return true;
	
}

function isVersionString(s)
{
	var i;
	// only acceptible characters are numbers and dots
	i=0;
	if ((s.charCodeAt(i)<0x30)||(s.charCodeAt(i)>0x39))
	{
		return false;
	}
	i++
	for(;i<(s.length-1);i++)
	{
		if (((s.charCodeAt(i)<0x30)||(s.charCodeAt(i)>0x39))&&(s.charCodeAt(i)!=0x2e))
		{
			return false;
		}
	}
	if ((s.charCodeAt(i)<0x30)||(s.charCodeAt(i)>0x39))
	{
		return false;
	}
	return true;
}

function stringCompatibleWithVariables(s) 
{
   
  if (/^[a-z0-9_]+$/i.test(s)==false)
  {
	return false;
  }
  var code=s.charCodeAt(0);
  if (((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || (code==95))
  {
	return true;
  }
  else
  {
	return false;
  }
}


function stringCompatibleWithAliasVariables(s) 
{
   
  if (/^[a-z0-9_\.]+[\s]*$/i.test(s)==false)
  {
	return false;
  }
  var code=s.charCodeAt(0);
  if (((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)  || (code==95)) )
  {
	return true;
  }
  else
  {
	return false;
  }
}


function escapeHTML (unsafe_str) 
{
	if (typeof unsafe_str === 'string')
	{
		return unsafe_str
		  .replace(/&/g, '&amp;')
		  .replace(/</g, '&lt;')
		  .replace(/>/g, '&gt;')
		  .replace(/\"/g, '&quot;')
		  .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
	}
	else
	{
		return unsafe_str;
	}
}		

function ToInteger(x) 
{
        x = Number(x);
        return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function num(el)
{
	if (typeof el === 'string')
	{
		return parseInt(el);
	}
	return el;
}


function modulo(a, b) 
{
   return a - Math.floor(a/b)*b;
}
function ToUint32(x) 
{
   return modulo(ToInteger(x), Math.pow(2, 32));
}


function getVersionString(num)
{
	var str="";
	var i;
	str+=getRev(num,3);
	for(i=2;i>=0;i--)
	{
		str+=".";
		str+=getRev(num,i);
	}
	return str;
}

function getRev(num,byte_num)
{
	var shift=byte_num*8;;
	var rev=(num>>>shift)&0xff;
	return rev;
}

	
	
function convertString(str)
{
	var tmp;
	tmp=str.replace(/-/g,"_");
	tmp=tmp.replace(/\//g,"_");
	tmp=tmp.replace(/ /g,"_");
	tmp=tmp.replace(/\./g,"_");
	tmp=tmp.replace(/\:/g,"_");
	tmp=tmp.replace(/\\/g,"_");
	tmp=tmp.replace(/\(/g,"_");
	tmp=tmp.replace(/\)/g,"_");
	tmp=tmp.replace(/\+/g,"_plus_");
	tmp=tmp.replace(/\%/g,"_");
	return tmp;
}

function clone(src) {
  function mixin(dest, source, copyFunc) {
    var name, s, i, empty = {};
    for(name in source){
      // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
      // inherited from Object.prototype.   For example, if dest has a custom toString() method,
      // don't overwrite it with the toString() method that source inherited from Object.prototype
      s = source[name];
      if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
        dest[name] = copyFunc ? copyFunc(s) : s;
      }
    }
    return dest;
  }

  if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
    // null, undefined, any non-object, or function
    return src;  // anything
  }
  if(src.nodeType && "cloneNode" in src){
    // DOM Node
    return src.cloneNode(true); // Node
  }
  if(src instanceof Date){
    // Date
    return new Date(src.getTime());  // Date
  }
  if(src instanceof RegExp){
    // RegExp
    return new RegExp(src);   // RegExp
  }
  var r, i, l;
  if(src instanceof Array){
    // array
    r = [];
    for(i = 0, l = src.length; i < l; ++i){
      if(i in src){
        r.push(clone(src[i]));
      }
    }
    // we don't clone functions for performance reasons
    //    }else if(d.isFunction(src)){
    //      // function
    //      r = function(){ return src.apply(this, arguments); };
  }else{
    // generic objects
    r = src.constructor ? new src.constructor() : {};
  }
  return mixin(r, src, clone);

}
	
	
function GetArrValue(dt, offset, len)
{
   var val=0;
   var byte_num=(offset/8) >>> 0;
   var bit_num=offset%8;
   if ((bit_num==0)&&((len==8)||(len==16)||(len==32)))
   {
      switch(len)
      {
         case 8:
            val=dt.getUint8(byte_num,true);
            break;
         case 16:
            val=dt.getUint16(byte_num,true);
            break;
         case 32:
            val=dt.getUint32(byte_num,true);
            break;
      }
      return val;
   }
   else
   {
	  if ((bit_num+len)>8)
	  {
		val=dt.getUint32(byte_num,true);
		return ((val>>>bit_num)&(0xffffffff>>>(32-len)));
	  }
	  else
	  {
		val=dt.getUint8(byte_num);
		return ((val>>>bit_num)&(0xff>>>(8-len)));
	  }
      
   }
}


function SetArrValue(dt,offset,len,val)
{
  var byte_num=(offset/8) >>> 0;
  var bit_num=offset%8;
  if ((bit_num==0)&&((len==8)||(len==16)||(len==32)))
  {
	 switch(len)
	 {
		case 8:
		   dt.setUint8(byte_num,val,true);
		   break;
		case 16:
		   dt.setInt16(byte_num,val,true);	
		   break;
		case 32:
		   dt.setInt32(byte_num,val,true);
		   break;
	 }
  }
  else
  {
	  if ((bit_num+len)>8)
	  {
		 var curr=dt.getUint32(byte_num,true);
		 curr&=~((0xffffffff>>>(32-len))<<bit_num);
		 curr|=(val&(0xffffffff>>>(32-len)))<<bit_num;
		 dt.setUint32(byte_num,curr,true);
	  }
	  else
	  {
		 var curr=dt.getUint8(byte_num,true);
		 curr&=~((0xff>>>(8-len))<<bit_num);
		 curr|=(val&(0xff>>>(8-len)))<<bit_num;
		 dt.setUint8(byte_num,curr,true);
	  }
	  
  }
}

function GetGWArrValue(dt, offset, len)
{
   var val=0;
	val=dt.getUint16(0,true);
   return ((val>>>offset)&(0xff>>(8-len)));
}
	
	
function ToInt32(x) {
    return x | 0;
}
	
	

function toHex(num)
{
	if (num.toString(16).length==1)
	{
		return '0'+num.toString(16).toUpperCase();
	}
	else
	{
		return num.toString(16).toUpperCase();
	}
}
	
	
function copyStringToDt(dt,offset,str)
{
	var i;
	for(i=0;i<str.length;i++)
	{
		dt.setUint8(offset+i,str.charCodeAt(i));
	}
	return 0;
}

var prev_compiler_message=null;

function savePrevCompilerMessage()
{
	if (prev_compiler_message==null)
	{
		var status_div=document.getElementById("status_elem");
		prev_compiler_message=status_div.innerHTML;
	}
}

function restorePrevCompilerMessage()
{
	if (prev_compiler_message!=null)
	{
		var status_div=document.getElementById("status_elem");
		status_div.innerHTML=prev_compiler_message;
		prev_compiler_message=null;
	}
}

function setCompilerMessage(without_upload,error,string)
{
	var status_div=document.getElementById("status_elem");
	if (status_div==null)
	{
		return false;
	}
	var msg="";

	if (without_upload==false)
	{
		if (error==true)
		{
			msg="<font style='font-size:15px;' color=\"#F00000\"><b>"+string+"</b></font>";
		}
		else
		{
			msg=string;
		}
	}
	
	status_div.innerHTML="<table cellspacing='0' cellpadding='0' border='0' style='width:100%;font-size:15px;'><tr><td>"+msg+"</td></tr></table>";
	return true;
	
	
}

function clearCompilerMessage()
{
	
	var status_div=document.getElementById("status_elem");
	if (status_div==null)
	{
		return false;
	}
	var tbl="<table cellspacing='0' cellpadding='0' border='0' style='width:100%'><tr>";
	if (GOM.getObjArr("ARGEE_PROJ_TITLE",0)==undefined)
	{
		tbl+="<td style='text-align:left;font-size:15px;'><div style='padding-left:20px;'>Project Title: </div></td>";
	}
	else
	{
		tbl+="<td style='text-align:left;font-size:15px;'><div style='padding-left:20px;'>Project Title: <b>"+(GOM.arrToString(GOM.getObjArr("ARGEE_PROJ_TITLE",0)))+"</b></div></td>"
	}
	tbl+="<td style='text-align:right;font-size:15px;'><b>"+GOM.arrToString(GOM.getObjArr("ARGEE_DEV_NAME",0))+"</b>&nbsp&nbsp (<b>"+GOM.arrToString(GOM.getObjArr("IP_ADDRESS",0))+"</b>) <b style='padding-right:20px;'>"+GOM.arrToString(GOM.getObjArr("SAPI_APP_VER_STRING",0))+"</b></td>";	
	tbl+="</tr></table>";
	status_div.innerHTML=tbl;
	return true;
	
	
}

function appendNumToArr(arr,val)
{
	arr[arr.length]=(val>>>24)&0xff;
	arr[arr.length]=(val>>>16)&0xff;
	arr[arr.length]=(val>>>8)&0xff;
	arr[arr.length]=(val>>>0)&0xff;
}


function appendNumToArrLE(arr,offset,num,num_bytes)
{
    switch(num_bytes)
    {
        case 4:
           arr[offset+2]=(num>>>16)&0xff;
           arr[offset+3]=(num>>>24)&0xff;
        case 2:
           arr[offset+1]=(num>>>8)&0xff;
        case 1:
           arr[offset]=(num>>>0)&0xff;
    }
}

function fastClone(obj)
{
	if ((obj==undefined)||(obj==null))
	{
		return obj;
	}
	return JSON.parse(JSON.stringify(obj));
}


function arrayBuffertoRegArr(buf)
{
	
	var tmp=[];
	if (buf!=undefined)
	{
		var map=new Uint8Array(buf);
		for(var i=0;i<buf.byteLength;i++)
		{
			tmp[i]=map[i];
		}
	}
	return tmp;
}

function regArrayToArrayBuffer(arr)
{
	var arr_buf=new Uint8Array(arr.length);
	for(var i=0;i<arr.length;i++)
	{
		arr_buf[i]=arr[i];
	}
	return arr_buf.buffer;
}

function boolToInt(a)
{
	if (a==true)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
		
/**
* JSONfn - javascript (both node.js and browser) plugin to stringify,
*          parse and clone objects with Functions, Regexp and Date.
*
* Version - 1.1.0
* Copyright (c) Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/jsonfn/
*
* Licensed under the MIT license ( http://www.opensource.org/licenses/mit-license.php )
*
*   USAGE:
*     browser:
*         JSONfn.stringify(obj);
*         JSONfn.parse(str[, date2obj]);
*         JSONfn.clone(obj[, date2obj]);
*
*     nodejs:
*       var JSONfn = require('path/to/json-fn');
*       JSONfn.stringify(obj);
*       JSONfn.parse(str[, date2obj]);
*       JSONfn.clone(obj[, date2obj]);
*
*
*     @obj      -  Object;
*     @str      -  String, which is returned by JSONfn.stringify() function;
*     @date2obj - Boolean (optional); if true, date string in ISO8061 format
*                 is converted into a Date object; otherwise, it is left as a String.
*/

(function (exports) {
"use strict";

  exports.stringify = function (obj) {

    return JSON.stringify(obj, function (key, value) {
      var fnBody;
      if (value instanceof Function || typeof value == 'function') {


        fnBody = value.toString();

        if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
          return '_NuFrRa_' + fnBody;
        }
        return fnBody;
      }
      if (value instanceof RegExp) {
        return '_PxEgEr_' + value;
      }
      return value;
    });
  };

  exports.parse = function (str, date2obj) {

    var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

    return JSON.parse(str, function (key, value) {
      var prefix;

      if (typeof value != 'string') {
        return value;
      }
      if (value.length < 8) {
        return value;
      }

      prefix = value.substring(0, 8);

      if (iso8061 && value.match(iso8061)) {
        return new Date(value);
      }
      if (prefix === 'function') {
        return eval('(' + value + ')');
      }
      if (prefix === '_PxEgEr_') {
        return eval(value.slice(8));
      }
      if (prefix === '_NuFrRa_') {
        return eval(value.slice(8));
      }

      return value;
    });
  };

  exports.clone = function (obj, date2obj) {
    return exports.parse(exports.stringify(obj), date2obj);
  };

}(typeof exports === 'undefined' ? (window.JSONfn = {}) : exports));


function objToString(obj)
{
	var str="";
	for(i in obj)
	{
		if (typeof obj[i] === 'object')
		{
			str+=objToString(obj[i]);
		}
		else if (typeof obj[i]=== 'function')
		{
			str+=i+":"+obj[i].toString()+",";
		}
		else if (typeof obj[i]=== 'number')
		{
			str+="var "+i+"="+obj[i].toString()+";";
		}
		else if (typeof obj[i]=== 'string')
		{
			str+="var "+i+"=\""+obj[i].toString()+"\";";
		}
		str+="\r\n";
	}
	return str;
}


function getOffset( el ,confine ) {
    var _x = 0;
    var _y = 0;
    var _w = el.offsetWidth|0;
    var _h = el.offsetHeight|0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
		  if (el==confine)
		  {
			  break;
		  }
    }
    return { top: _y, left: _x, width: _w, height: _h };
}
