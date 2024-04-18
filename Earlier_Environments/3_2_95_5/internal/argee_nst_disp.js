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
 *  DESCRIPTION: Editor
 *
 *******************************************************************************/

var ARGEE_nst_disp=(function()
{ 
	function saveLocal()
	{
		var code=extractCode("prog_text");
		setLocalStorage("prog_code",JSON.stringify({editor:ENV.NST,code:code}));
	}	
	function showLocal()
	{
		adjustMenuScreen(0);
		renderMenu("ST_Initial");
		var code=JSON.parse(getLocalStorage("prog_code")).code;
		var st=escapeHTML(code);

			prog_div.innerHTML="<code ondblclick=\"NST.onDoubleClick(event)\" onkeydown=\"NST.testKeyDown(event)\" onkeydown=\"NST.testKeyUp(event)\"  style=\"font-size:120%;\"  id=\"prog_text\" >"+st+"</code>";
			LRTEditor.initialize(
					document.getElementsByTagName('code')[0],
					['MinimalPlugin', 'UndoPlugin', 'HighlightPlugin'],
					{
						highlightCallback: function(el)
						{ 
							sh_highlightElement(el, sh_languages['pascal']);
							saveLocal();
						},
					}
				);
			GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.NST)
		
	}
	function Show()
	{
		var st;
		GOM.setObjArr("NST_ARGEE_BREAKPOINT_ITEM_LIST",0,[]);
		
		if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)==ENV.NST)
		{
			st=extractCode("prog_text");
		}
		else
		{
			st=ARGEE_pre_comp.preCompile(1);
		}
		var glob=ARGEE_nst_parse.parse(st,true);
		if (glob!=null)
		{
			if (GOM.getObjNum("ARGEE_PROJ_TYPE",0)!=ENV.NST)
			{
				st=ARGEE_pre_comp.preCompile(0);
				glob=ARGEE_nst_parse.parse(st,true);
			}
			clearCompilerMessage();
			adjustMenuScreen(0);
			st=escapeHTML(st);

			prog_div.innerHTML="<code ondblclick=\"NST.onDoubleClick(event)\" onkeydown=\"NST.testKeyDown(event)\" onkeydown=\"NST.testKeyUp(event)\"  style=\"font-size:120%;\"  id=\"prog_text\" >"+st+"</code>";
			LRTEditor.initialize(
					document.getElementsByTagName('code')[0],
					['MinimalPlugin', 'UndoPlugin', 'HighlightPlugin'],
					{
						highlightCallback: function(el)
						{ 
							sh_highlightElement(el, sh_languages['pascal']);
							saveLocal();
						},
					}
				);
			GOM.setObjNum("ARGEE_PROJ_TYPE",0,ENV.NST)
			saveLocal();
		}
		else
		{
			return false;
		}
	}
	
	function extractCode(elem_id)
	{
		var elem=document.getElementById(elem_id);
		var str;
		if (elem.innerText==undefined)
		{
			str=elem.textContent;
		}
		else
		{
			str=elem.innerText;
		}
		return str;
	}

	function Save()
	{
		prog_code.editor=ENV.NST;
	}
	function Load()
	{
		
	}
	
	function ARGEE_View()
	{
		var code=extractCode("prog_text");
		ARGEE_import.import_proj(code,true,false,false);
		return ProgView();
	}
	function Run()
	{
		var st=extractCode("prog_text");
		GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(st));
		var glob=ARGEE_nst_parse.parse(st,true);
		if (glob!=null)
		{
			var proc_ast=ARGEE_nst_process.process(glob);
			if ((proc_ast==null)||(proc_ast.empty_proj==true))
			{
				return;
			}
			if (ARGEE_nst_code_gen.generate(proc_ast)==true)
			{
				ARGEE_nst_debug.RunProg(proc_ast);
				adjustMenuScreen(1);
			}
			
		}
	}
	var num_lines_in_file;
	function Test()
	{
		if (getLocalStorage("prog_code")==undefined)
		{
			var div_elem=getLineChildNodes();
			num_lines_in_file=div_elem.childNodes.length;
			st=extractCode("prog_text");
			if (st!=null)
			{
				GOM.setObjArrCompressed("ARGEE_SOURCE_CODE",0,GOM.convStringToArr(st));
				var glob=ARGEE_nst_parse.parse(st,true);
				if (glob!=null)
				{
					var proc_ast=ARGEE_nst_process.process(glob);
					if ((proc_ast==null)||(proc_ast.empty_proj==true))
					{
						return;
					}
					if (ARGEE_nst_code_gen.generate(proc_ast)==true)
					{
						ARGEE_nst_debug.prepareDebElems(proc_ast);
						ARGEE_nst_debug.TestProg();
					}
				}
			}
		}
	}

	
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function findLine()
{
	var sel = window.getSelection();
	var range;
    if (sel.rangeCount) 
	{
      range = sel.getRangeAt(0);
	}  
	var el=range.commonAncestorContainer;
	var curr=el;
	while(curr.className!="line")
	{
		curr=curr.parentNode;
	}
	var curr_line=0;
	while(curr.className=="line")
	{
		curr=curr.previousSibling;
		curr_line++;
		if (curr==null)
		{
			break;
		}
	}
	return curr_line;
}

function getLineChildNodes()
{
	var div_elem=this.document.getElementById("prog_text").childNodes[0];
	if (div_elem.className=="firefox-bug116083")
	{
		return div_elem.childNodes[0];
	}
	return div_elem;
}

function highlightLine(num,color)
{
	var div_elem=getLineChildNodes();
	var line_elem=div_elem.childNodes[num];
	line_elem.style.backgroundColor=color;
}

	var prev_dbg_line=-1;
	var break_cnt=0;
	function refreshCodeInDebug()
	{
		var i;
		var line_bg_color=[];
		var breakpoints_on_lines=DEB.getBreakpointLines();
		for(i=0;i<breakpoints_on_lines.length;i++)
		{
			if (breakpoints_on_lines[i]==true)
			{
				line_bg_color[i-1]="#C19A6B";
			}
		}
		
		
		if (GOM.getObjNum("DEV_RUN",0)==0)
		{
			var task_trace_level=GOM.getObjNum("DBG_TASK_TRACE_LEVEL",0);
			var task_trace=GOM.getObjNum("DBG_TASK_TRACE",0);
			
			var pc=task_trace[task_trace_level].pc;
			var nst_line=DEB.DEB_getLineNumFromPC(pc);
			if (nst_line>=0)
			{
				if (GOM.getObjNum("DEV_EXCEPTION",0)==0)
				{
					line_bg_color[nst_line]="lightgreen";
					if ((break_cnt%2)==0)
					{
						line_bg_color[nst_line]="red";
					}
				}
				else
				{
					setCompilerMessage(false,true,"Exception detected in the Program line: "+ (nst_line));
					line_bg_color[nst_line]="#999999";
					if ((break_cnt%2)==0)
					{
						line_bg_color[nst_line]="black";
					}
				}
				
				break_cnt++;
				
				if (prev_dbg_line!=nst_line)
				{
					var div_elem=getLineChildNodes();
					var line_elem;
					
					if (nst_line<=10)
					{
						line_elem=div_elem.childNodes[nst_line];
					}
					else
					{
						line_elem=div_elem.childNodes[nst_line-10];
					}
					line_elem.scrollIntoView(true);
					prev_dbg_line=nst_line;
				}
				
			}
		}
		else
		{
			prev_dbg_line=-1;
		}

		for(i=1;i<(num_lines_in_file-1);i++)
		{
			if (line_bg_color[i]!=undefined)
			{
				highlightLine(i,line_bg_color[i]);
			}
			else
			{
				highlightLine(i,"inherit");
			}
		}
	}


function testKeyDown(event)
{
	var n = (window.Event) ? event.which : event.keyCode;

	if ((event.ctrlKey==true)&&(n==66)) // ctrl-B
	{	
	    event.preventDefault();
		var lineNum=findLine();
		var changed=false;
		if (breakpoints_on_lines[lineNum]==true)
		{
			breakpoints_on_lines[lineNum]=false;
			highlightLine(lineNum-1,"inherit");
			DEB_breakpoints_added=true;
		}
		else
		{
			breakpoints_on_lines[lineNum]=true;
			highlightLine(lineNum-1,"#C19A6B");
			DEB_breakpoints_added=true;
		}
		if (prog_compiled==true)
		{
			uploadNewBreakPoints(CMD.SET_CLEAR);
		}
		return false;
	}
}


function testKeyUp(event)
{
	var n = (window.Event) ? event.which : event.keyCode;
	if (event.ctrlKey==true)
	{
		if (
		     (n==66) || //Ctrl-B
			 (n==69) || //Ctrl-E
			 (n==83) || //Ctrl-S
			 (n==71)  //Ctrl-G
		   )
		{
			event.preventDefault();
			return false;
		}
	}
}

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}

function onDoubleClick(event)
{
	if (event.offsetX>=event.target.offsetLeft)
	{
		return;
	}

	clearSelection();
	event.preventDefault();

	
	var el=event.target;
	var curr=el;
	while(curr.className!="line")
	{
		curr=curr.parentNode;
		if (curr==null)
		{
			return;
		}
	}


	var curr_line=0;
	while(curr.className=="line")
	{
		curr=curr.previousSibling;
		curr_line++;
		if (curr==null)
		{
			break;
		}
	}
	
	if (DEB.checkBreakpointLine(curr_line)==true)
	{
		DEB.setBreakpointLine(curr_line,false);
		highlightLine(curr_line-1,"inherit");
	}
	else
	{
		DEB.setBreakpointLine(curr_line,true);
		highlightLine(curr_line-1,"#C19A6B");
	}
	DEB.BREAK_setClear();
}

function docKeyDown(event) 
{
	var n = (window.Event) ? event.which : event.keyCode;
	
	
	
	if (event.ctrlKey==true)
	{
		if (
		     (n==66) || //Ctrl-B
			 (n==69) || //Ctrl-E
			 (n==83) || //Ctrl-S
			 (n==71) || //Ctrl-G
			 (n==38) || //Ctrl-Up
			 (n==40)  //Ctrl-Down
		   )
		{
			DEB_ClearCodeHighlights();
			event.preventDefault();
			if (prog_compiled==false)
			{
				return false;
			}
		}
	}
	
	if ((event.ctrlKey==true)&&(n==38)) // ctrl-UP
	{	
		if ((prog_compiled==true)&&(prog_running==false))
		{
			if (DEB_curr_trace_level<DEB_last_trace.length)
			{
				new_break_hit=true;
				DEB_curr_trace_level=Math.min(DEB_curr_trace_level+1,DEB_last_trace.length-1);
			}
		}
	}
			
	if ((event.ctrlKey==true)&&(n==40)) // ctrl-Down
	{	
		if ((prog_compiled==true)&&(prog_running==false))
		{
			if (DEB_curr_trace_level>0)
			{
				new_break_hit=true;
				DEB_curr_trace_level=Math.max(DEB_curr_trace_level-1,0);
			}
		}
	}
	
	
	if ((event.ctrlKey==true)&&(n==69)) // ctrl-E
	{	
		if ((prog_compiled==true)&&(prog_running==true))
		{
			DEB_curr_trace_level=0;
			uploadNewBreakPoints(CMD.BREAK_ALL);
		}
		return false;
	}
	if ((event.ctrlKey==true)&&(n==83)) // ctrl-S
	{	
		if ((prog_compiled==true)&&(prog_running==false))
		{
			DEB_curr_trace_level=0;
			uploadNewBreakPoints(CMD.STEP);
		}
		return false;
	}
	if ((event.ctrlKey==true)&&(n==71)) // ctrl-G
	{	
		if ((prog_compiled==true)&&(prog_running==false))
		{
			clearCurrHighlights();
			DEB_curr_trace_level=0;
			uploadNewBreakPoints(CMD.CONTINUE);
		}
		return false;
	}
}




return {
	Show:Show,
	Run:Run,
	Test:Test,
	ARGEE_View:ARGEE_View,
	docKeyDown:docKeyDown,
	onDoubleClick:onDoubleClick,
	testKeyUp:testKeyUp,
	testKeyDown:testKeyDown,
	showLocal:showLocal,
	refreshCodeInDebug:refreshCodeInDebug,
}
}());
	
var NST=ARGEE_nst_disp;
 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// END: Initialization code
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

