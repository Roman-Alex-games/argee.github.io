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
 *  DESCRIPTION: Programmable Environment ARGEE (Standalone)
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

function stringCompatibleWithVariables(s) 
{
   
  if (/^[a-z0-9_]+$/i.test(s)==false)
  {
	return false;
  }
  var code=s.charCodeAt(0);
  if (((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)))
  {
	return true;
  }
  else
  {
	return false;
  }
}


function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
}		

function ToInteger(x) 
{
        x = Number(x);
        return x < 0 ? Math.ceil(x) : Math.floor(x);
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
	var rev=(num>>shift)&0xff;
	return rev;
}

	
	
function convertString(str)
{
	var tmp;
	tmp=str.replace(/-/g,"_");
	tmp=str.replace(/\//g,"_");
	tmp=tmp.replace(/ /g,"_");
	tmp=tmp.replace(/\./g,"_");
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
   var byte_num=(offset/8) >> 0;
   var bit_num=offset%8;
   if ((len%8)==0)
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
		val=dt.getUint8(byte_num);
      return ((val>>bit_num)&(0xff>>(8-len)));
   }
}


function SetArrValue(dt,offset,len,val)
{
  var byte_num=(offset/8) >> 0;
  var bit_num=offset%8;
  if ((len%8)==0)
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
	 var curr=dt.getUint8(byte_num,true);
	 curr&=~((0xff>>(8-len))<<bit_num);
	 curr|=(val&(0xff>>(8-len)))<<bit_num;
	 dt.setUint8(byte_num,curr,true);
  }
}

function GetGWArrValue(dt, offset, len)
{
   var val=0;
	val=dt.getUint16(0,true);
   return ((val>>offset)&(0xff>>(8-len)));
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

