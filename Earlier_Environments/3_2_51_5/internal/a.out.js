// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = (typeof Module !== 'undefined' ? Module : null) || {};

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_WEB = typeof window === 'object';
// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) {
    var ret = Module['read'](filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  if (!Module['thisProgram']) {
    if (process['argv'].length > 1) {
      Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
    } else {
      Module['thisProgram'] = 'unknown-program';
    }
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    var data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WORKER) {
    Module['load'] = importScripts;
  }

  if (typeof Module['setWindowTitle'] === 'undefined') {
    Module['setWindowTitle'] = function(title) { document.title = title };
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
if (!Module['thisProgram']) {
  Module['thisProgram'] = './this.program';
}

// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in: 
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at: 
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  setTempRet0: function (value) {
    tempRet0 = value;
  },
  getTempRet0: function () {
    return tempRet0;
  },
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  STACK_ALIGN: 16,
  prepVararg: function (ptr, type) {
    if (type === 'double' || type === 'i64') {
      // move so the load is aligned
      if (ptr & 7) {
        assert((ptr & 7) === 4);
        ptr += 4;
      }
    } else {
      assert((ptr & 3) === 0);
    }
    return ptr;
  },
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      assert(sig.length == 1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[sig]) {
      Runtime.funcWrappers[sig] = {};
    }
    var sigCache = Runtime.funcWrappers[sig];
    if (!sigCache[func]) {
      sigCache[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return sigCache[func];
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+15)&-16);(assert((((STACKTOP|0) < (STACK_MAX|0))|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+15)&-16); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0),size))|0;DYNAMICTOP = (((DYNAMICTOP)+15)&-16); if (DYNAMICTOP >= TOTAL_MEMORY) { var success = enlargeMemory(); if (!success) { DYNAMICTOP = ret;  return 0; } }; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 16))*(quantum ? quantum : 16); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}



Module["Runtime"] = Runtime;



//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  if (!func) {
    try {
      func = eval('_' + ident); // explicit lookup
    } catch(e) {}
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

var cwrap, ccall;
(function(){
  var JSfuncs = {
    // Helpers for cwrap -- it can't refer to Runtime directly because it might
    // be renamed by closure, instead it calls JSfuncs['stackSave'].body to find
    // out what the minified function name is.
    'stackSave': function() {
      Runtime.stackSave()
    },
    'stackRestore': function() {
      Runtime.stackRestore()
    },
    // type conversion from js to c
    'arrayToC' : function(arr) {
      var ret = Runtime.stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
    'stringToC' : function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        ret = Runtime.stackAlloc((str.length << 2) + 1);
        writeStringToMemory(str, ret);
      }
      return ret;
    }
  };
  // For fast lookup of conversion functions
  var toC = {'string' : JSfuncs['stringToC'], 'array' : JSfuncs['arrayToC']};

  // C calling interface. 
  ccall = function ccallFunc(ident, returnType, argTypes, args, opts) {
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    assert(returnType !== 'array', 'Return type should not be "array".');
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = Runtime.stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    if ((!opts || !opts.async) && typeof EmterpreterAsync === 'object') {
      assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling ccall');
    }
    if (opts && opts.async) assert(!returnType, 'async ccalls cannot return values');
    if (returnType === 'string') ret = Pointer_stringify(ret);
    if (stack !== 0) {
      if (opts && opts.async) {
        EmterpreterAsync.asyncFinalizers.push(function() {
          Runtime.stackRestore(stack);
        });
        return;
      }
      Runtime.stackRestore(stack);
    }
    return ret;
  }

  var sourceRegex = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
  function parseJSFunc(jsfunc) {
    // Match the body and the return value of a javascript function source
    var parsed = jsfunc.toString().match(sourceRegex).slice(1);
    return {arguments : parsed[0], body : parsed[1], returnValue: parsed[2]}
  }
  var JSsource = {};
  for (var fun in JSfuncs) {
    if (JSfuncs.hasOwnProperty(fun)) {
      // Elements of toCsource are arrays of three items:
      // the code, and the return value
      JSsource[fun] = parseJSFunc(JSfuncs[fun]);
    }
  }

  
  cwrap = function cwrap(ident, returnType, argTypes) {
    argTypes = argTypes || [];
    var cfunc = getCFunc(ident);
    // When the function takes numbers and returns a number, we can just return
    // the original function
    var numericArgs = argTypes.every(function(type){ return type === 'number'});
    var numericRet = (returnType !== 'string');
    if ( numericRet && numericArgs) {
      return cfunc;
    }
    // Creation of the arguments list (["$1","$2",...,"$nargs"])
    var argNames = argTypes.map(function(x,i){return '$'+i});
    var funcstr = "(function(" + argNames.join(',') + ") {";
    var nargs = argTypes.length;
    if (!numericArgs) {
      // Generate the code needed to convert the arguments from javascript
      // values to pointers
      funcstr += 'var stack = ' + JSsource['stackSave'].body + ';';
      for (var i = 0; i < nargs; i++) {
        var arg = argNames[i], type = argTypes[i];
        if (type === 'number') continue;
        var convertCode = JSsource[type + 'ToC']; // [code, return]
        funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';';
        funcstr += convertCode.body + ';';
        funcstr += arg + '=' + convertCode.returnValue + ';';
      }
    }

    // When the code is compressed, the name of cfunc is not literally 'cfunc' anymore
    var cfuncname = parseJSFunc(function(){return cfunc}).returnValue;
    // Call the function
    funcstr += 'var ret = ' + cfuncname + '(' + argNames.join(',') + ');';
    if (!numericRet) { // Return type can only by 'string' or 'number'
      // Convert the result to a string
      var strgfy = parseJSFunc(function(){return Pointer_stringify}).returnValue;
      funcstr += 'ret = ' + strgfy + '(ret);';
    }
    funcstr += "if (typeof EmterpreterAsync === 'object') { assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling cwrap') }";
    if (!numericArgs) {
      // If we had a stack, restore it
      funcstr += JSsource['stackRestore'].body.replace('()', '(stack)') + ';';
    }
    funcstr += 'return ret})';
    return eval(funcstr);
  };
})();
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;

function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module["setValue"] = setValue;


function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module["getValue"] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
Module["ALLOC_STACK"] = ALLOC_STACK;
Module["ALLOC_STATIC"] = ALLOC_STATIC;
Module["ALLOC_DYNAMIC"] = ALLOC_DYNAMIC;
Module["ALLOC_NONE"] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module["allocate"] = allocate;

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!staticSealed) return Runtime.staticAlloc(size);
  if ((typeof _sbrk !== 'undefined' && !_sbrk.called) || !runtimeInitialized) return Runtime.dynamicAlloc(size);
  return _malloc(size);
}
Module["getMemory"] = getMemory;

function Pointer_stringify(ptr, /* optional */ length) {
  if (length === 0 || !ptr) return '';
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = 0;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    hasUtf |= t;
    if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (hasUtf < 128) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  return Module['UTF8ToString'](ptr);
}
Module["Pointer_stringify"] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAP8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}
Module["AsciiToString"] = AsciiToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}
Module["stringToAscii"] = stringToAscii;

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

function UTF8ArrayToString(u8Array, idx) {
  var u0, u1, u2, u3, u4, u5;

  var str = '';
  while (1) {
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    u0 = u8Array[idx++];
    if (!u0) return str;
    if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
    u1 = u8Array[idx++] & 63;
    if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
    u2 = u8Array[idx++] & 63;
    if ((u0 & 0xF0) == 0xE0) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
    } else {
      u3 = u8Array[idx++] & 63;
      if ((u0 & 0xF8) == 0xF0) {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
      } else {
        u4 = u8Array[idx++] & 63;
        if ((u0 & 0xFC) == 0xF8) {
          u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
        } else {
          u5 = u8Array[idx++] & 63;
          u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
        }
      }
    }
    if (u0 < 0x10000) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    }
  }
}
Module["UTF8ArrayToString"] = UTF8ArrayToString;

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function UTF8ToString(ptr) {
  return UTF8ArrayToString(HEAPU8,ptr);
}
Module["UTF8ToString"] = UTF8ToString;

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null 
//                    terminator, i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x1FFFFF) {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x3FFFFFF) {
      if (outIdx + 4 >= endIdx) break;
      outU8Array[outIdx++] = 0xF8 | (u >> 24);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 5 >= endIdx) break;
      outU8Array[outIdx++] = 0xFC | (u >> 30);
      outU8Array[outIdx++] = 0x80 | ((u >> 24) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}
Module["stringToUTF8Array"] = stringToUTF8Array;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}
Module["stringToUTF8"] = stringToUTF8;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      ++len;
    } else if (u <= 0x7FF) {
      len += 2;
    } else if (u <= 0xFFFF) {
      len += 3;
    } else if (u <= 0x1FFFFF) {
      len += 4;
    } else if (u <= 0x3FFFFFF) {
      len += 5;
    } else {
      len += 6;
    }
  }
  return len;
}
Module["lengthBytesUTF8"] = lengthBytesUTF8;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module["UTF16ToString"] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null 
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}
Module["stringToUTF16"] = stringToUTF16;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}
Module["lengthBytesUTF16"] = lengthBytesUTF16;

function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module["UTF32ToString"] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null 
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}
Module["stringToUTF32"] = stringToUTF32;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}
Module["lengthBytesUTF32"] = lengthBytesUTF32;

function demangle(func) {
  var hasLibcxxabi = !!Module['___cxa_demangle'];
  if (hasLibcxxabi) {
    try {
      var buf = _malloc(func.length);
      writeStringToMemory(func.substr(1), buf);
      var status = _malloc(4);
      var ret = Module['___cxa_demangle'](buf, 0, 0, status);
      if (getValue(status, 'i32') === 0 && ret) {
        return Pointer_stringify(ret);
      }
      // otherwise, libcxxabi failed, we can try ours which may return a partial result
    } catch(e) {
      // failure when using libcxxabi, we can try ours which may return a partial result
    } finally {
      if (buf) _free(buf);
      if (status) _free(status);
      if (ret) _free(ret);
    }
  }
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    if (rawList) {
      if (ret) {
        list.push(ret + '?');
      }
      return list;
    } else {
      return ret + flushList();
    }
  }
  var parsed = func;
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    parsed = parse();
  } catch(e) {
    parsed += '?';
  }
  if (parsed.indexOf('?') >= 0 && !hasLibcxxabi) {
    Runtime.warnOnce('warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  }
  return parsed;
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  return demangleAll(jsStackTrace());
}
Module["stackTrace"] = stackTrace;

// Memory management

var PAGE_SIZE = 4096;

function alignMemoryPage(x) {
  if (x % 4096 > 0) {
    x += (4096 - (x % 4096));
  }
  return x;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk


function abortOnCannotGrowMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
}

function enlargeMemory() {
  abortOnCannotGrowMemory();
}


var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 1048576;

var totalMemory = 64*1024;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be compliant with the asm.js spec (and given that TOTAL_STACK=' + TOTAL_STACK + ')');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer;



buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);


// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['buffer'] = buffer;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module["addOnPreRun"] = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module["addOnInit"] = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module["addOnPreMain"] = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module["addOnExit"] = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module["addOnPostRun"] = addOnPostRun;

// Tools


function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}
Module["intArrayFromString"] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module["intArrayToString"] = intArrayToString;

function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))>>0)]=chr;
    i = i + 1;
  }
}
Module["writeStringToMemory"] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[((buffer++)>>0)]=array[i];
  }
}
Module["writeArrayToMemory"] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}
Module["writeAsciiToMemory"] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}


// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


if (!Math['clz32']) Math['clz32'] = function(x) {
  x = x >>> 0;
  for (var i = 0; i < 32; i++) {
    if (x & (1 << (31 - i))) return i;
  }
  return 32;
};
Math.clz32 = Math['clz32']

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;
var Math_clz32 = Math.clz32;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module["addRunDependency"] = addRunDependency;

function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module["removeRunDependency"] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data



var memoryInitializer = null;



// === Body ===

var ASM_CONSTS = [];




STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 1184656;
  /* global initializers */  __ATINIT__.push();
  

/* memory initializer */ allocate([], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);
/* memory initializer */ allocate([8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,15,18,0,2,0,73,0,164,12,10,0,0,0,0,0,0,0,0,0,152,15,18,0,121,0,73,0,166,12,10,0,0,0,0,0,0,0,0,0,184,15,18,0,122,0,73,0,168,12,10,0,0,0,0,0,0,0,0,0,210,15,18,0,123,0,73,0,170,12,10,0,0,0,0,0,0,0,0,0,236,15,18,0,124,0,73,0,172,12,10,0,0,0,0,0,0,0,0,0,8,16,18,0,125,0,73,0,174,12,10,0,0,0,0,0,0,0,0,0,36,16,18,0,126,0,73,0,176,12,10,0,0,0,0,0,0,0,0,0,68,16,18,0,127,0,73,0,178,12,10,0,0,0,0,0,0,0,0,0,93,16,18,0,128,0,73,0,180,12,10,0,0,0,0,0,0,0,0,0,123,16,18,0,129,0,73,0,182,12,10,0,0,0,0,0,0,0,0,0,148,16,18,0,143,0,73,0,184,12,10,0,0,0,0,0,0,0,0,0,176,16,18,0,144,0,73,0,186,12,10,0,0,0,0,0,0,0,0,0,204,16,18,0,154,0,73,0,188,12,10,0,0,0,0,0,0,0,0,0,234,16,18,0,148,0,73,0,190,12,10,0,0,0,0,0,0,0,0,0,17,17,18,0,130,0,73,0,0,0,0,0,1,0,0,0,2,0,0,0,32,17,18,0,132,0,73,0,0,0,0,0,0,0,0,0,2,0,0,0,52,17,18,0,133,0,73,0,0,0,0,0,0,0,0,0,3,0,0,0,65,17,18,0,135,0,73,0,0,0,0,0,0,0,0,0,4,0,0,0,79,17,18,0,137,0,73,0,0,0,0,0,0,0,0,0,5,0,0,0,97,17,18,0,112,23,73,0,0,0,0,0,0,0,0,0,6,0,0,0,128,13,10,0,128,14,10,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,11,0,0,0,12,0,0,0,13,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,23,0,0,0,24,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,37,0,0,0,38,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,46,0,0,0,47,0,0,0,0,0,0,0,48,0,0,0,49,0,0,0,50,0,0,0,51,0,0,0,52,0,0,0,53,0,0,0,54,0,0,0,55,0,0,0,56,0,0,0,57,0,0,0,58,0,0,0,59,0,0,0,60,0,0,0,0,255,255,255,1,255,255,255,2,255,255,255,3,255,255,255,4,255,255,255,5,255,255,255,6,255,255,255,7,255,255,255,8,255,255,255,9,255,255,255,10,255,255,255,11,255,255,255,12,255,255,255,13,255,255,255,14,255,255,255,15,255,255,255,16,255,255,255,17,255,255,255,18,255,255,255,19,255,255,255,20,255,255,255,21,255,255,255,22,255,255,255,23,255,255,255,24,255,255,255,25,255,255,255,26,255,255,255,27,255,255,255,28,255,255,255,29,255,255,255,30,255,255,255,31,255,255,255,32,255,255,255,33,255,255,255,34,255,255,255,35,255,255,255,36,255,255,255,37,255,255,255,38,255,255,255,39,255,255,255,40,255,255,255,41,255,255,255,42,255,255,255,43,255,255,255,44,255,255,255,45,255,255,255,46,255,255,255,47,255,255,255,48,255,255,255,49,255,255,255,50,255,255,255,51,255,255,255,52,255,255,255,53,255,255,255,54,255,255,255,2,0,0,0,1,0,0,0,1,0,0,0,3,0,0,0,3,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,1,0,0,0,3,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,2,0,0,0,2,0,0,0,1,0,0,0,3,0,0,0,2,0,0,0,3,0,0,0,3,0,0,0,4,0,0,0,3,0,0,0,3,0,0,0,2,0,0,0,2,0,0,0,4,0,0,0,3,0,0,0,1,0,0,0,1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,61,0,0,0,62,0,0,0,63,0,0,0,64,0,0,0,65,0,0,0,65,0,0,0,2,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,14,0,0,0,15,0,0,0,14,0,0,0,14,0,0,0,13,0,0,0,4,0,0,0,0,0,0,0,252,255,255,255,248,255,255,255,244,255,255,255,240,255,255,255], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE+524288);
/* memory initializer */ allocate([65,82,71,69,69,95,66,79,79,84,95,80,82,79,74,95,69,78,65,66,76,69,68,0,65,82,71,69,69,95,67,84,82,76,95,80,82,69,69,77,80,84,95,80,79,73,78,84,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,83,65,86,69,95,76,82,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,83,65,86,69,95,83,80,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,67,85,82,82,95,84,65,83,75,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,70,85,78,67,84,95,84,66,76,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,70,85,78,67,84,95,84,66,76,95,76,69,78,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,73,79,95,77,65,80,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,73,78,83,84,82,95,84,82,65,67,69,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,86,65,82,95,83,69,71,77,95,83,73,90,69,0,65,82,71,69,69,95,67,84,82,76,95,76,82,95,67,65,76,76,69,82,95,79,70,70,83,69,84,0,65,82,71,69,69,95,67,84,82,76,95,70,80,95,67,65,76,76,69,82,95,79,70,70,83,69,84,0,80,82,79,71,95,84,82,65,67,69,95,84,66,76,95,83,69,71,95,79,70,70,83,69,84,95,79,66,74,0,65,82,71,69,69,95,67,84,82,76,95,68,73,82,69,67,84,95,65,83,77,95,67,65,76,76,95,83,69,71,77,95,79,70,70,83,69,84,0,65,82,71,69,69,95,82,85,78,95,67,79,68,69,0,65,82,71,69,69,95,71,69,84,95,80,82,79,71,95,86,65,82,83,0,65,82,71,69,69,95,73,79,95,73,78,80,0,65,82,71,69,69,95,73,79,95,68,73,65,71,0,65,82,71,69,69,95,71,69,84,95,80,76,67,95,73,78,80,0,83,80,69,67,73,65,76,95,82,69,71,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,255,255,255,255,255,255,255,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,255,255,255,255,255,255,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,1,2,4,7,3,6,5,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE+1183608);





/* no memory initializer */
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}

// {{PRE_LIBRARY}}


   
  Module["_i64Subtract"] = _i64Subtract;

  
  function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[((Module['___errno_location']())>>2)]=value;
      else Module.printErr('failed to set errno from JS');
      return value;
    }
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 85: return totalMemory / PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 79:
          return 0;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: {
          if (typeof navigator === 'object') return navigator['hardwareConcurrency'] || 1;
          return 1;
        }
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

   
  Module["_memset"] = _memset;

   
  Module["_bitshift64Lshr"] = _bitshift64Lshr;

   
  Module["_bitshift64Shl"] = _bitshift64Shl;

  function _abort() {
      Module['abort']();
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

   
  Module["_i64Add"] = _i64Add;

  var _fabs=Math_abs;

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) {
        var success = self.alloc(bytes);
        if (!success) return -1 >>> 0; // sbrk failure code
      }
      return ret;  // Previous break location.
    }

  var _floor=Math_floor;

  var _sqrt=Math_sqrt;

  var _abs=Math_abs;

  
  var PATH=undefined;
  
  
  function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        console.error('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (mode == 0 /*EM_TIMING_SETTIMEOUT*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          setTimeout(Browser.mainLoop.runner, value); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1 /*EM_TIMING_RAF*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2 /*EM_TIMING_SETIMMEDIATE*/) {
        if (!window['setImmediate']) {
          // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
          var setImmediates = [];
          var emscriptenMainLoopMessageId = '__emcc';
          function Browser_setImmediate_messageHandler(event) {
            if (event.source === window && event.data === emscriptenMainLoopMessageId) {
              event.stopPropagation();
              setImmediates.shift()();
            }
          }
          window.addEventListener("message", Browser_setImmediate_messageHandler, true);
          window['setImmediate'] = function Browser_emulated_setImmediate(func) {
            setImmediates.push(func);
            window.postMessage(emscriptenMainLoopMessageId, "*");
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          window['setImmediate'](Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    }function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
      Module['noExitRuntime'] = true;
  
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = func;
      Browser.mainLoop.arg = arg;
  
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1/*EM_TIMING_RAF*/ && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          Module.printErr('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(function() {
          if (typeof arg !== 'undefined') {
            Runtime.dynCall('vi', func, [arg]);
          } else {
            Runtime.dynCall('v', func);
          }
        });
  
        // catch pauses from the main loop itself
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL === 'object' && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0/*EM_TIMING_SETTIMEOUT*/, 1000.0 / fps);
        else _emscripten_set_main_loop_timing(1/*EM_TIMING_RAF*/, 1); // Do rAF by rendering each frame (no decimating)
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function () {
          Browser.mainLoop.scheduler = null;
          Browser.mainLoop.currentlyRunningMainloop++; // Incrementing this signals the previous main loop that it's now become old, and it must return.
        },resume:function () {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true /* do not set timing and call scheduler, we will do it on the next lines */);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },runIter:function (func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          try {
            func();
          } catch (e) {
            if (e instanceof ExitStatus) {
              return;
            } else {
              if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
              throw e;
            }
          }
          if (Module['postMainLoop']) Module['postMainLoop']();
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
          
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      function(){};
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   function(){}; // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", function(ev) {
              if (!Browser.pointerLock && canvas.requestPointerLock) {
                canvas.requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          contextHandle = GL.createContext(canvas, contextAttributes);
          if (contextHandle) {
            ctx = GL.getContext(contextHandle).GLctx;
          }
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx === 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas, vrDevice) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        Browser.vrDevice = vrDevice;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        if (typeof Browser.vrDevice === 'undefined') Browser.vrDevice = null;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
  
        if (vrDevice) {
          canvasContainer.requestFullScreen({ vrDisplay: vrDevice });
        } else {
          canvasContainer.requestFullScreen();
        }
      },nextRAF:0,fakeRequestAnimationFrame:function (func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          Browser.fakeRequestAnimationFrame(func);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           Browser.fakeRequestAnimationFrame;
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:function () {
        Browser.allowAsyncCallbacks = false;
      },resumeAsyncCallbacks:function () { // marks future callbacks as ok to execute, and synchronously runs any remaining ones right now
        Browser.allowAsyncCallbacks = true;
        if (Browser.queuedAsyncCallbacks.length > 0) {
          var callbacks = Browser.queuedAsyncCallbacks;
          Browser.queuedAsyncCallbacks = [];
          callbacks.forEach(function(func) {
            func();
          });
        }
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } else {
            Browser.queuedAsyncCallbacks.push(func);
          }
        });
      },safeSetTimeout:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setTimeout(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } else {
            Browser.queuedAsyncCallbacks.push(func);
          }
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setInterval(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } // drop it on the floor otherwise, next interval will kick in
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll': 
            delta = event.detail;
            break;
          case 'mousewheel': 
            delta = event.wheelDelta;
            break;
          case 'wheel': 
            delta = event['deltaY'];
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
            
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              if (!last) last = coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            } 
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:function () {
        var handle = Browser.nextWgetRequestHandle;
        Browser.nextWgetRequestHandle++;
        return handle;
      }};

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  function _pthread_self() {
      //FIXME: assumes only a single thread
      return 0;
    }
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) { Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
  Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) { return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes) }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + TOTAL_STACK;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);


function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_i(x) { Module["printErr"]("Invalid function pointer called with signature 'i'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_vii(x) { Module["printErr"]("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_ii(x) { Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_iiiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_iii(x) { Module["printErr"]("Invalid function pointer called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_i(index) {
  try {
    return Module["dynCall_i"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };

Module.asmLibraryArg = { "abort": abort, "assert": assert, "nullFunc_iiii": nullFunc_iiii, "nullFunc_i": nullFunc_i, "nullFunc_vii": nullFunc_vii, "nullFunc_ii": nullFunc_ii, "nullFunc_iiiii": nullFunc_iiiii, "nullFunc_iii": nullFunc_iii, "invoke_iiii": invoke_iiii, "invoke_i": invoke_i, "invoke_vii": invoke_vii, "invoke_ii": invoke_ii, "invoke_iiiii": invoke_iiiii, "invoke_iii": invoke_iii, "_fabs": _fabs, "_floor": _floor, "_sysconf": _sysconf, "_pthread_self": _pthread_self, "_abort": _abort, "___setErrNo": ___setErrNo, "_sbrk": _sbrk, "_time": _time, "_abs": _abs, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_sqrt": _sqrt, "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing, "_emscripten_set_main_loop": _emscripten_set_main_loop, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8 };
// EMSCRIPTEN_START_ASM
var asm = (function(global, env, buffer) {
  'almost asm';
  
  
  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);


  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var cttz_i8=env.cttz_i8|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = global.NaN, inf = global.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;

  var tempRet0 = 0;
  var tempRet1 = 0;
  var tempRet2 = 0;
  var tempRet3 = 0;
  var tempRet4 = 0;
  var tempRet5 = 0;
  var tempRet6 = 0;
  var tempRet7 = 0;
  var tempRet8 = 0;
  var tempRet9 = 0;
  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var Math_min=global.Math.min;
  var Math_clz32=global.Math.clz32;
  var abort=env.abort;
  var assert=env.assert;
  var nullFunc_iiii=env.nullFunc_iiii;
  var nullFunc_i=env.nullFunc_i;
  var nullFunc_vii=env.nullFunc_vii;
  var nullFunc_ii=env.nullFunc_ii;
  var nullFunc_iiiii=env.nullFunc_iiiii;
  var nullFunc_iii=env.nullFunc_iii;
  var invoke_iiii=env.invoke_iiii;
  var invoke_i=env.invoke_i;
  var invoke_vii=env.invoke_vii;
  var invoke_ii=env.invoke_ii;
  var invoke_iiiii=env.invoke_iiiii;
  var invoke_iii=env.invoke_iii;
  var _fabs=env._fabs;
  var _floor=env._floor;
  var _sysconf=env._sysconf;
  var _pthread_self=env._pthread_self;
  var _abort=env._abort;
  var ___setErrNo=env.___setErrNo;
  var _sbrk=env._sbrk;
  var _time=env._time;
  var _abs=env._abs;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _sqrt=env._sqrt;
  var _emscripten_set_main_loop_timing=env._emscripten_set_main_loop_timing;
  var _emscripten_set_main_loop=env._emscripten_set_main_loop;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS
function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;
if ((STACKTOP|0) >= (STACK_MAX|0)) abort();

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function establishStackSpace(stackBase, stackMax) {
  stackBase = stackBase|0;
  stackMax = stackMax|0;
  STACKTOP = stackBase;
  STACK_MAX = stackMax;
}

function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}
function copyTempFloat(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
  HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
  HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
  HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
}
function copyTempDouble(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
  HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
  HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
  HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
  HEAP8[tempDoublePtr+4>>0] = HEAP8[ptr+4>>0];
  HEAP8[tempDoublePtr+5>>0] = HEAP8[ptr+5>>0];
  HEAP8[tempDoublePtr+6>>0] = HEAP8[ptr+6>>0];
  HEAP8[tempDoublePtr+7>>0] = HEAP8[ptr+7>>0];
}

function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}
function getTempRet0() {
  return tempRet0|0;
}

function _LE_UINT32_SET($destination,$integer) {
 $destination = $destination|0;
 $integer = $integer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $destination;
 $1 = $integer;
 $2 = $1;
 $3 = $2 >>> 0;
 $4 = $3&255;
 $5 = $0;
 HEAP8[$5>>0] = $4;
 $6 = $1;
 $7 = $6 >>> 8;
 $8 = $7&255;
 $9 = $0;
 $10 = ((($9)) + 1|0);
 HEAP8[$10>>0] = $8;
 $11 = $1;
 $12 = $11 >>> 16;
 $13 = $12&255;
 $14 = $0;
 $15 = ((($14)) + 2|0);
 HEAP8[$15>>0] = $13;
 $16 = $1;
 $17 = $16 >>> 24;
 $18 = $17&255;
 $19 = $0;
 $20 = ((($19)) + 3|0);
 HEAP8[$20>>0] = $18;
 STACKTOP = sp;return;
}
function _LE_UINT32_GET($source) {
 $source = $source|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $source;
 $1 = $0;
 $2 = HEAP8[$1>>0]|0;
 $3 = $2&255;
 $4 = $3 << 0;
 $5 = $0;
 $6 = ((($5)) + 1|0);
 $7 = HEAP8[$6>>0]|0;
 $8 = $7&255;
 $9 = $8 << 8;
 $10 = (($4) + ($9))|0;
 $11 = $0;
 $12 = ((($11)) + 2|0);
 $13 = HEAP8[$12>>0]|0;
 $14 = $13&255;
 $15 = $14 << 16;
 $16 = (($10) + ($15))|0;
 $17 = $0;
 $18 = ((($17)) + 3|0);
 $19 = HEAP8[$18>>0]|0;
 $20 = $19&255;
 $21 = $20 << 24;
 $22 = (($16) + ($21))|0;
 STACKTOP = sp;return ($22|0);
}
function _LE_UINT24_SET($destination,$integer) {
 $destination = $destination|0;
 $integer = $integer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $destination;
 $1 = $integer;
 $2 = $1;
 $3 = $2 >>> 0;
 $4 = $3&255;
 $5 = $0;
 HEAP8[$5>>0] = $4;
 $6 = $1;
 $7 = $6 >>> 8;
 $8 = $7&255;
 $9 = $0;
 $10 = ((($9)) + 1|0);
 HEAP8[$10>>0] = $8;
 $11 = $1;
 $12 = $11 >>> 16;
 $13 = $12&255;
 $14 = $0;
 $15 = ((($14)) + 2|0);
 HEAP8[$15>>0] = $13;
 STACKTOP = sp;return;
}
function _LE_UINT24_GET($source) {
 $source = $source|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $source;
 $1 = $0;
 $2 = HEAP8[$1>>0]|0;
 $3 = $2&255;
 $4 = $3 << 0;
 $5 = $0;
 $6 = ((($5)) + 1|0);
 $7 = HEAP8[$6>>0]|0;
 $8 = $7&255;
 $9 = $8 << 8;
 $10 = (($4) + ($9))|0;
 $11 = $0;
 $12 = ((($11)) + 2|0);
 $13 = HEAP8[$12>>0]|0;
 $14 = $13&255;
 $15 = $14 << 16;
 $16 = (($10) + ($15))|0;
 STACKTOP = sp;return ($16|0);
}
function _LE_UINT16_SET($destination,$integer) {
 $destination = $destination|0;
 $integer = $integer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $destination;
 $1 = $integer;
 $2 = $1;
 $3 = $2&65535;
 $4 = $3 >> 0;
 $5 = $4&255;
 $6 = $0;
 HEAP8[$6>>0] = $5;
 $7 = $1;
 $8 = $7&65535;
 $9 = $8 >> 8;
 $10 = $9&255;
 $11 = $0;
 $12 = ((($11)) + 1|0);
 HEAP8[$12>>0] = $10;
 STACKTOP = sp;return;
}
function _LE_UINT16_GET($source) {
 $source = $source|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $source;
 $1 = $0;
 $2 = HEAP8[$1>>0]|0;
 $3 = $2&255;
 $4 = $3&65535;
 $5 = $4 << 0;
 $6 = $0;
 $7 = ((($6)) + 1|0);
 $8 = HEAP8[$7>>0]|0;
 $9 = $8&255;
 $10 = $9&65535;
 $11 = $10 << 8;
 $12 = (($5) + ($11))|0;
 $13 = $12&65535;
 STACKTOP = sp;return ($13|0);
}
function _BE_UINT32_SET($destination,$integer) {
 $destination = $destination|0;
 $integer = $integer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $destination;
 $1 = $integer;
 $2 = $1;
 $3 = $2 >>> 24;
 $4 = $3&255;
 $5 = $0;
 HEAP8[$5>>0] = $4;
 $6 = $1;
 $7 = $6 >>> 16;
 $8 = $7&255;
 $9 = $0;
 $10 = ((($9)) + 1|0);
 HEAP8[$10>>0] = $8;
 $11 = $1;
 $12 = $11 >>> 8;
 $13 = $12&255;
 $14 = $0;
 $15 = ((($14)) + 2|0);
 HEAP8[$15>>0] = $13;
 $16 = $1;
 $17 = $16 >>> 0;
 $18 = $17&255;
 $19 = $0;
 $20 = ((($19)) + 3|0);
 HEAP8[$20>>0] = $18;
 STACKTOP = sp;return;
}
function _BE_UINT32_GET($source) {
 $source = $source|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $source;
 $1 = $0;
 $2 = HEAP8[$1>>0]|0;
 $3 = $2&255;
 $4 = $3 << 24;
 $5 = $0;
 $6 = ((($5)) + 1|0);
 $7 = HEAP8[$6>>0]|0;
 $8 = $7&255;
 $9 = $8 << 16;
 $10 = (($4) + ($9))|0;
 $11 = $0;
 $12 = ((($11)) + 2|0);
 $13 = HEAP8[$12>>0]|0;
 $14 = $13&255;
 $15 = $14 << 8;
 $16 = (($10) + ($15))|0;
 $17 = $0;
 $18 = ((($17)) + 3|0);
 $19 = HEAP8[$18>>0]|0;
 $20 = $19&255;
 $21 = $20 << 0;
 $22 = (($16) + ($21))|0;
 STACKTOP = sp;return ($22|0);
}
function _BE_UINT16_SET($destination,$integer) {
 $destination = $destination|0;
 $integer = $integer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $destination;
 $1 = $integer;
 $2 = $1;
 $3 = $2&65535;
 $4 = $3 >> 8;
 $5 = $4&255;
 $6 = $0;
 HEAP8[$6>>0] = $5;
 $7 = $1;
 $8 = $7&65535;
 $9 = $8 >> 0;
 $10 = $9&255;
 $11 = $0;
 $12 = ((($11)) + 1|0);
 HEAP8[$12>>0] = $10;
 STACKTOP = sp;return;
}
function _BE_UINT16_GET($source) {
 $source = $source|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $source;
 $1 = $0;
 $2 = HEAP8[$1>>0]|0;
 $3 = $2&255;
 $4 = $3&65535;
 $5 = $4 << 8;
 $6 = $0;
 $7 = ((($6)) + 1|0);
 $8 = HEAP8[$7>>0]|0;
 $9 = $8&255;
 $10 = $9&65535;
 $11 = $10 << 0;
 $12 = (($5) + ($11))|0;
 $13 = $12&65535;
 STACKTOP = sp;return ($13|0);
}
function _ARR_Obj_LE_Get($ptr,$offset,$len) {
 $ptr = $ptr|0;
 $offset = $offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $bit = 0, $byte = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ptr;
 $2 = $offset;
 $3 = $len;
 $val = 0;
 $4 = $2;
 $5 = (($4|0) / 8)&-1;
 $byte = $5;
 $6 = $2;
 $7 = (($6|0) % 8)&-1;
 $bit = $7;
 $8 = $3;
 $9 = (($8|0) % 8)&-1;
 $10 = ($9|0)==(0);
 if (!($10)) {
  $31 = $byte;
  $32 = $1;
  $33 = (($32) + ($31)|0);
  $34 = HEAP8[$33>>0]|0;
  $35 = $34&255;
  $36 = $bit;
  $37 = $35 >> $36;
  $38 = $3;
  $39 = (8 - ($38))|0;
  $40 = 255 >> $39;
  $41 = $37 & $40;
  $0 = $41;
  $42 = $0;
  STACKTOP = sp;return ($42|0);
 }
 $11 = $3;
 switch ($11|0) {
 case 8:  {
  $12 = $byte;
  $13 = $1;
  $14 = (($13) + ($12)|0);
  $15 = HEAP8[$14>>0]|0;
  $16 = $15&255;
  $val = $16;
  break;
 }
 case 16:  {
  $17 = $byte;
  $18 = $1;
  $19 = (($18) + ($17)|0);
  $20 = (_LE_UINT16_GET($19)|0);
  $21 = $20&65535;
  $val = $21;
  break;
 }
 case 24:  {
  $22 = $byte;
  $23 = $1;
  $24 = (($23) + ($22)|0);
  $25 = (_LE_UINT24_GET($24)|0);
  $val = $25;
  break;
 }
 case 32:  {
  $26 = $byte;
  $27 = $1;
  $28 = (($27) + ($26)|0);
  $29 = (_LE_UINT32_GET($28)|0);
  $val = $29;
  break;
 }
 default: {
 }
 }
 $30 = $val;
 $0 = $30;
 $42 = $0;
 STACKTOP = sp;return ($42|0);
}
function _ARR_Obj_LE_Set($ptr,$offset,$len,$val) {
 $ptr = $ptr|0;
 $offset = $offset|0;
 $len = $len|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $bit = 0, $byte = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ptr;
 $1 = $offset;
 $2 = $len;
 $3 = $val;
 $4 = $1;
 $5 = $4&65535;
 $6 = (($5|0) / 8)&-1;
 $byte = $6;
 $7 = $1;
 $8 = $7&65535;
 $9 = (($8|0) % 8)&-1;
 $bit = $9;
 $10 = $2;
 $11 = $10&65535;
 $12 = (($11|0) % 8)&-1;
 $13 = ($12|0)==(0);
 $14 = $2;
 $15 = $14&65535;
 if (!($13)) {
  $34 = (8 - ($15))|0;
  $35 = 255 >> $34;
  $36 = $bit;
  $37 = $35 << $36;
  $38 = $37 ^ -1;
  $39 = $byte;
  $40 = $0;
  $41 = (($40) + ($39)|0);
  $42 = HEAP8[$41>>0]|0;
  $43 = $42&255;
  $44 = $43 & $38;
  $45 = $44&255;
  HEAP8[$41>>0] = $45;
  $46 = $3;
  $47 = $2;
  $48 = $47&65535;
  $49 = (8 - ($48))|0;
  $50 = 255 >> $49;
  $51 = $46 & $50;
  $52 = $bit;
  $53 = $51 << $52;
  $54 = $byte;
  $55 = $0;
  $56 = (($55) + ($54)|0);
  $57 = HEAP8[$56>>0]|0;
  $58 = $57&255;
  $59 = $58 | $53;
  $60 = $59&255;
  HEAP8[$56>>0] = $60;
  STACKTOP = sp;return;
 }
 switch ($15|0) {
 case 8:  {
  $16 = $3;
  $17 = $16&255;
  $18 = $byte;
  $19 = $0;
  $20 = (($19) + ($18)|0);
  HEAP8[$20>>0] = $17;
  STACKTOP = sp;return;
  break;
 }
 case 16:  {
  $21 = $byte;
  $22 = $0;
  $23 = (($22) + ($21)|0);
  $24 = $3;
  $25 = $24&65535;
  _LE_UINT16_SET($23,$25);
  STACKTOP = sp;return;
  break;
 }
 case 24:  {
  $26 = $byte;
  $27 = $0;
  $28 = (($27) + ($26)|0);
  $29 = $3;
  _LE_UINT24_SET($28,$29);
  STACKTOP = sp;return;
  break;
 }
 case 32:  {
  $30 = $byte;
  $31 = $0;
  $32 = (($31) + ($30)|0);
  $33 = $3;
  _LE_UINT32_SET($32,$33);
  STACKTOP = sp;return;
  break;
 }
 default: {
  STACKTOP = sp;return;
 }
 }
}
function _ARGEE_WriteDS($stream_num,$arr,$len) {
 $stream_num = $stream_num|0;
 $arr = $arr|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $stream_num;
 $2 = $arr;
 $3 = $len;
 $4 = $0;
 STACKTOP = sp;return ($4|0);
}
function _ARGEE_ReadDS($stream_num,$arr,$len) {
 $stream_num = $stream_num|0;
 $arr = $arr|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $stream_num;
 $2 = $arr;
 $3 = $len;
 $4 = $0;
 STACKTOP = sp;return ($4|0);
}
function _clearSimMem() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $i = 0;
 while(1) {
  $0 = $i;
  $1 = ($0|0)<(64);
  if (!($1)) {
   break;
  }
  $2 = $i;
  $3 = (527010 + (($2*2056)|0)|0);
  _memset(($3|0),0,512)|0;
  $4 = $i;
  $5 = (527010 + (($4*2056)|0)|0);
  $6 = ((($5)) + 512|0);
  _memset(($6|0),0,512)|0;
  $7 = $i;
  $8 = (527010 + (($7*2056)|0)|0);
  $9 = ((($8)) + 1024|0);
  _memset(($9|0),0,512)|0;
  $10 = $i;
  $11 = (527010 + (($10*2056)|0)|0);
  $12 = ((($11)) + 1536|0);
  _memset(($12|0),0,512)|0;
  $13 = $i;
  $14 = (($13) + 1)|0;
  $i = $14;
 }
 _memset((658816|0),0,256)|0;
 _memset((659072|0),0,256)|0;
 HEAP32[524300>>2] = 0;
 STACKTOP = sp;return;
}
function _setupSectSize($slot,$sect,$bit_size) {
 $slot = $slot|0;
 $sect = $sect|0;
 $bit_size = $bit_size|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $3 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $slot;
 $1 = $sect;
 $2 = $bit_size;
 $3 = $0;
 $4 = (($3) + 1)|0;
 HEAP32[524304>>2] = $4;
 $5 = $1;
 switch ($5|0) {
 case 0:  {
  $6 = $2;
  $7 = $6&65535;
  $8 = $0;
  $9 = (527010 + (($8*2056)|0)|0);
  $10 = ((($9)) + 2048|0);
  HEAP16[$10>>1] = $7;
  STACKTOP = sp;return;
  break;
 }
 case 1:  {
  $11 = $2;
  $12 = $11&65535;
  $13 = $0;
  $14 = (527010 + (($13*2056)|0)|0);
  $15 = ((($14)) + 2050|0);
  HEAP16[$15>>1] = $12;
  STACKTOP = sp;return;
  break;
 }
 case 2:  {
  $16 = $2;
  $17 = $16&65535;
  $18 = $0;
  $19 = (527010 + (($18*2056)|0)|0);
  $20 = ((($19)) + 2052|0);
  HEAP16[$20>>1] = $17;
  STACKTOP = sp;return;
  break;
 }
 case 3:  {
  $21 = $2;
  $22 = $21&65535;
  $23 = $0;
  $24 = (527010 + (($23*2056)|0)|0);
  $25 = ((($24)) + 2054|0);
  HEAP16[$25>>1] = $22;
  STACKTOP = sp;return;
  break;
 }
 default: {
  STACKTOP = sp;return;
 }
 }
}
function _getIOPtr($slot,$sect) {
 $slot = $slot|0;
 $sect = $sect|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $sect;
 $3 = $2;
 switch ($3|0) {
 case 0:  {
  $4 = $1;
  $5 = (527010 + (($4*2056)|0)|0);
  $0 = $5;
  break;
 }
 case 1:  {
  $6 = $1;
  $7 = (527010 + (($6*2056)|0)|0);
  $8 = ((($7)) + 512|0);
  $0 = $8;
  break;
 }
 case 2:  {
  $9 = $1;
  $10 = (527010 + (($9*2056)|0)|0);
  $11 = ((($10)) + 1024|0);
  $0 = $11;
  break;
 }
 case 3:  {
  $12 = $1;
  $13 = (527010 + (($12*2056)|0)|0);
  $14 = ((($13)) + 1536|0);
  $0 = $14;
  break;
 }
 default: {
 }
 }
 $15 = $0;
 STACKTOP = sp;return ($15|0);
}
function _getPLCPtr($sect) {
 $sect = $sect|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $sect;
 $2 = $1;
 switch ($2|0) {
 case 0:  {
  $0 = 659072;
  break;
 }
 case 1:  {
  $0 = 658816;
  break;
 }
 default: {
 }
 }
 $3 = $0;
 STACKTOP = sp;return ($3|0);
}
function _OS_getIntTick() {
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[524308>>2]|0;
 return ($0|0);
}
function _setArm7Mode($arm7) {
 $arm7 = $arm7|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $arm7;
 $1 = $0;
 HEAP32[524312>>2] = $1;
 STACKTOP = sp;return;
}
function _getTmpBuf() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (659328|0);
}
function _getProgBuf() {
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[524296>>2]|0;
 return ($0|0);
}
function _getCodePtr($inst) {
 $inst = $inst|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $inst;
 $1 = (_getProgBuf()|0);
 STACKTOP = sp;return ($1|0);
}
function _getIO_InpPtr($inst) {
 $inst = $inst|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $inst;
 $1 = $0;
 $2 = (_getIOPtr($1,0)|0);
 STACKTOP = sp;return ($2|0);
}
function _getIO_DiagPtr($inst) {
 $inst = $inst|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $inst;
 $1 = $0;
 $2 = (_getIOPtr($1,2)|0);
 STACKTOP = sp;return ($2|0);
}
function _getPLC_InpPtr($inst) {
 $inst = $inst|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $inst;
 $1 = (_getPLCPtr(0)|0);
 STACKTOP = sp;return ($1|0);
}
function _getSpecialReg($inst) {
 $inst = $inst|0;
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $inst;
 STACKTOP = sp;return (524300|0);
}
function _startProg($prog,$len) {
 $prog = $prog|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $7 = 0, $8 = 0, $9 = 0, $addr = 0, $curr_task_ptr = 0, $tmp_addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $prog;
 $1 = $len;
 $2 = $0;
 $3 = $1;
 _memcpy((8|0),($2|0),($3|0))|0;
 $4 = HEAP16[658608>>1]|0;
 $5 = $4&65535;
 $6 = (($5|0) / 4)&-1;
 $7 = (8 + ($6<<2)|0);
 HEAP32[$7>>2] = 55;
 $8 = HEAP16[658606>>1]|0;
 $9 = $8&65535;
 $10 = (($9|0) / 4)&-1;
 $11 = (8 + ($10<<2)|0);
 HEAP32[$11>>2] = (524944);
 $12 = HEAP16[658604>>1]|0;
 $13 = $12&65535;
 $14 = HEAP32[524296>>2]|0;
 $15 = (($14) + ($13)|0);
 $16 = (_LE_UINT32_GET($15)|0);
 $addr = $16;
 $17 = $addr;
 $18 = HEAP32[524296>>2]|0;
 $19 = (($18) + ($17)|0);
 $curr_task_ptr = $19;
 HEAP32[525388>>2] = $19;
 $20 = HEAP16[658604>>1]|0;
 $21 = $20&65535;
 $22 = HEAP32[524296>>2]|0;
 $23 = (($22) + ($21)|0);
 $24 = $curr_task_ptr;
 $25 = $24;
 _LE_UINT32_SET($23,$25);
 while(1) {
  $26 = $curr_task_ptr;
  $27 = (_LE_UINT32_GET($26)|0);
  $tmp_addr = $27;
  $28 = $curr_task_ptr;
  $29 = $tmp_addr;
  $30 = HEAP32[524296>>2]|0;
  $31 = (($30) + ($29)|0);
  $32 = ((($31)) + 1|0);
  $33 = $32;
  _LE_UINT32_SET($28,$33);
  $34 = $curr_task_ptr;
  $35 = ((($34)) + 4|0);
  $36 = (_LE_UINT32_GET($35)|0);
  $tmp_addr = $36;
  $37 = $curr_task_ptr;
  $38 = ((($37)) + 4|0);
  $39 = $tmp_addr;
  $40 = HEAP32[524296>>2]|0;
  $41 = (($40) + ($39)|0);
  $42 = $41;
  _LE_UINT32_SET($38,$42);
  $43 = $curr_task_ptr;
  $44 = ((($43)) + 8|0);
  $45 = (_LE_UINT32_GET($44)|0);
  $tmp_addr = $45;
  $46 = $curr_task_ptr;
  $47 = ((($46)) + 8|0);
  $48 = $tmp_addr;
  $49 = HEAP32[524296>>2]|0;
  $50 = (($49) + ($48)|0);
  $51 = $50;
  _LE_UINT32_SET($47,$51);
  $52 = $tmp_addr;
  $53 = HEAP32[524296>>2]|0;
  $54 = (($53) + ($52)|0);
  $curr_task_ptr = $54;
  $55 = HEAP32[525388>>2]|0;
  $56 = $curr_task_ptr;
  $57 = ($55|0)==($56|0);
  if ($57) {
   break;
  }
 }
 _syncIO(3);
 _syncIO(2);
 $58 = HEAP16[658598>>1]|0;
 $59 = $58&65535;
 $60 = (($59|0) / 4)&-1;
 $61 = (8 + ($60<<2)|0);
 HEAP32[$61>>2] = 0;
 $62 = HEAP32[524312>>2]|0;
 $63 = ($62|0)==(1);
 if (!($63)) {
  STACKTOP = sp;return;
 }
 (_createRedirFuncInterf()|0);
 STACKTOP = sp;return;
}
function _findObj($uid) {
 $uid = $uid|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $uid;
 $i = 0;
 while(1) {
  $2 = $i;
  $3 = ($2>>>0)<(20);
  if (!($3)) {
   label = 6;
   break;
  }
  $4 = $i;
  $5 = (524316 + (($4*20)|0)|0);
  $6 = ((($5)) + 4|0);
  $7 = HEAP32[$6>>2]|0;
  $8 = $1;
  $9 = ($7|0)==($8|0);
  $10 = $i;
  if ($9) {
   label = 4;
   break;
  }
  $12 = (($10) + 1)|0;
  $i = $12;
 }
 if ((label|0) == 4) {
  $11 = (524316 + (($10*20)|0)|0);
  $0 = $11;
  $13 = $0;
  STACKTOP = sp;return ($13|0);
 }
 else if ((label|0) == 6) {
  $0 = 0;
  $13 = $0;
  STACKTOP = sp;return ($13|0);
 }
 return (0)|0;
}
function _writeObjWithOffsets($ptr) {
 $ptr = $ptr|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $addr = 0, $ent = 0, $i = 0;
 var $inst = 0, $ln1 = 0, $ln2 = 0, $offset = 0, $ptr_dst = 0, $uid = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ptr;
 $offset = 0;
 $1 = $offset;
 $2 = $0;
 $3 = (($2) + ($1)|0);
 $4 = (_LE_UINT32_GET($3)|0);
 $uid = $4;
 $5 = $offset;
 $6 = (($5) + 4)|0;
 $offset = $6;
 $7 = $uid;
 $8 = (_findObj($7)|0);
 $ent = $8;
 $9 = $ent;
 $10 = ($9|0)==(0|0);
 if ($10) {
  STACKTOP = sp;return;
 }
 $11 = $offset;
 $12 = $0;
 $13 = (($12) + ($11)|0);
 $14 = (_LE_UINT32_GET($13)|0);
 $inst = $14;
 $15 = $offset;
 $16 = (($15) + 4)|0;
 $offset = $16;
 $17 = $offset;
 $18 = $0;
 $19 = (($18) + ($17)|0);
 $20 = (_LE_UINT32_GET($19)|0);
 $ln1 = $20;
 $21 = $offset;
 $22 = (($21) + 4)|0;
 $offset = $22;
 $23 = $ent;
 $24 = ((($23)) + 16|0);
 $25 = HEAP32[$24>>2]|0;
 $26 = $inst;
 $27 = (FUNCTION_TABLE_ii[$25 & 127]($26)|0);
 $ptr_dst = $27;
 $i = 0;
 while(1) {
  $28 = $i;
  $29 = $ln1;
  $30 = ($28>>>0)<($29>>>0);
  if (!($30)) {
   break;
  }
  $31 = $offset;
  $32 = $0;
  $33 = (($32) + ($31)|0);
  $34 = (_LE_UINT16_GET($33)|0);
  $35 = $34&65535;
  $addr = $35;
  $36 = $offset;
  $37 = (($36) + 2)|0;
  $offset = $37;
  $38 = $offset;
  $39 = $0;
  $40 = (($39) + ($38)|0);
  $41 = (_LE_UINT16_GET($40)|0);
  $42 = $41&65535;
  $ln2 = $42;
  $43 = $offset;
  $44 = (($43) + 2)|0;
  $offset = $44;
  $45 = $addr;
  $46 = $ptr_dst;
  $47 = (($46) + ($45)|0);
  $48 = $offset;
  $49 = $0;
  $50 = (($49) + ($48)|0);
  $51 = $ln2;
  _memcpy(($47|0),($50|0),($51|0))|0;
  $52 = $ln2;
  $53 = $offset;
  $54 = (($53) + ($52))|0;
  $offset = $54;
  $55 = $i;
  $56 = (($55) + 1)|0;
  $i = $56;
 }
 STACKTOP = sp;return;
}
function _setNST_Preempt() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP16[658598>>1]|0;
 $1 = $0&65535;
 $2 = (($1|0) / 4)&-1;
 $3 = (8 + ($2<<2)|0);
 HEAP32[$3>>2] = 1;
 return;
}
function _setSystemTime($time) {
 $time = $time|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $time;
 $1 = $0;
 HEAP32[524308>>2] = $1;
 STACKTOP = sp;return;
}
function _processProjFile($ptr) {
 $ptr = $ptr|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $8 = 0, $9 = 0, $curr = 0, $ent = 0, $file_size = 0, $i = 0, $inst = 0, $len = 0, $len_with_flags = 0, $num_objs = 0, $uid = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ptr;
 $curr = 4;
 _clearSimMem();
 $1 = $curr;
 $2 = $0;
 $3 = (($2) + ($1)|0);
 $4 = (_LE_UINT32_GET($3)|0);
 $file_size = $4;
 $5 = $curr;
 $6 = (($5) + 4)|0;
 $curr = $6;
 $7 = $curr;
 $8 = $0;
 $9 = (($8) + ($7)|0);
 $10 = (_LE_UINT16_GET($9)|0);
 $11 = $10&65535;
 $num_objs = $11;
 $12 = $curr;
 $13 = (($12) + 2)|0;
 $curr = $13;
 $curr = 12;
 $i = 0;
 while(1) {
  $14 = $i;
  $15 = $num_objs;
  $16 = ($14|0)<($15|0);
  if (!($16)) {
   break;
  }
  $17 = $curr;
  $18 = $0;
  $19 = (($18) + ($17)|0);
  $20 = (_LE_UINT32_GET($19)|0);
  $uid = $20;
  $21 = $curr;
  $22 = (($21) + 4)|0;
  $curr = $22;
  $23 = $curr;
  $24 = $0;
  $25 = (($24) + ($23)|0);
  $26 = (_LE_UINT32_GET($25)|0);
  $inst = $26;
  $27 = $curr;
  $28 = (($27) + 4)|0;
  $curr = $28;
  $29 = $curr;
  $30 = $0;
  $31 = (($30) + ($29)|0);
  $32 = (_LE_UINT32_GET($31)|0);
  $len_with_flags = $32;
  $33 = $curr;
  $34 = (($33) + 4)|0;
  $curr = $34;
  $35 = $len_with_flags;
  $36 = $35 & 16777215;
  $len = $36;
  $37 = $uid;
  $38 = (_findObj($37)|0);
  $ent = $38;
  $39 = $ent;
  $40 = ($39|0)==(0|0);
  if ($40) {
   $41 = $len;
   $42 = $curr;
   $43 = (($42) + ($41))|0;
   $curr = $43;
  } else {
   $44 = $ent;
   $45 = ((($44)) + 8|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = ($46|0)!=(0|0);
   if ($47) {
    $48 = $curr;
    $49 = $0;
    $50 = (($49) + ($48)|0);
    $51 = (_LE_UINT32_GET($50)|0);
    $52 = $51&65535;
    $53 = $ent;
    $54 = ((($53)) + 8|0);
    $55 = HEAP32[$54>>2]|0;
    HEAP16[$55>>1] = $52;
   } else {
    $56 = $ent;
    $57 = ((($56)) + 12|0);
    $58 = HEAP32[$57>>2]|0;
    $59 = $curr;
    $60 = $0;
    $61 = (($60) + ($59)|0);
    $62 = $len;
    FUNCTION_TABLE_vii[$58 & 1]($61,$62);
   }
   $63 = $len;
   $64 = $curr;
   $65 = (($64) + ($63))|0;
   $curr = $65;
  }
  $66 = $i;
  $67 = (($66) + 1)|0;
  $i = $67;
 }
 $68 = HEAP16[658596>>1]|0;
 $69 = $68&65535;
 STACKTOP = sp;return ($69|0);
}
function _itoa_sb($val,$buf,$bufLen,$base,$align) {
 $val = $val|0;
 $buf = $buf|0;
 $bufLen = $bufLen|0;
 $base = $base|0;
 $align = $align|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $8 = 0, $9 = 0, $i = 0, $k = 0, $tmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val;
 $1 = $buf;
 $2 = $bufLen;
 $3 = $base;
 $4 = $align;
 $i = 0;
 $k = 0;
 $5 = $2;
 $6 = $5&255;
 $7 = (($6) - 1)|0;
 $8 = $7&255;
 $i = $8;
 while(1) {
  $9 = $0;
  $10 = $3;
  $11 = $10&255;
  $12 = (($9>>>0) % ($11>>>0))&-1;
  $13 = (1184109 + ($12)|0);
  $14 = HEAP8[$13>>0]|0;
  $15 = $i;
  $16 = $15 << 24 >> 24;
  $17 = $1;
  $18 = (($17) + ($16)|0);
  HEAP8[$18>>0] = $14;
  $19 = $3;
  $20 = $19&255;
  $21 = $0;
  $22 = (($21>>>0) / ($20>>>0))&-1;
  $0 = $22;
  $23 = $k;
  $24 = (($23) + 1)<<24>>24;
  $k = $24;
  $25 = $0;
  $26 = ($25|0)!=(0);
  if (!($26)) {
   break;
  }
  $27 = $i;
  $28 = (($27) + -1)<<24>>24;
  $i = $28;
  $29 = $28 << 24 >> 24;
  $30 = ($29|0)>=(0);
  if (!($30)) {
   break;
  }
 }
 $31 = $4;
 $32 = $31&255;
 $33 = ($32|0)!=(0);
 if (!($33)) {
  STACKTOP = sp;return;
 }
 $i = 0;
 while(1) {
  $34 = $i;
  $35 = $34 << 24 >> 24;
  $36 = $k;
  $37 = $36 << 24 >> 24;
  $38 = ($35|0)<($37|0);
  if (!($38)) {
   break;
  }
  $39 = $i;
  $40 = $39 << 24 >> 24;
  $41 = $1;
  $42 = (($41) + ($40)|0);
  $43 = HEAP8[$42>>0]|0;
  $tmp = $43;
  $44 = $2;
  $45 = $44&255;
  $46 = $k;
  $47 = $46 << 24 >> 24;
  $48 = (($45) - ($47))|0;
  $49 = $i;
  $50 = $49 << 24 >> 24;
  $51 = (($48) + ($50))|0;
  $52 = $1;
  $53 = (($52) + ($51)|0);
  $54 = HEAP8[$53>>0]|0;
  $55 = $i;
  $56 = $55 << 24 >> 24;
  $57 = $1;
  $58 = (($57) + ($56)|0);
  HEAP8[$58>>0] = $54;
  $59 = $tmp;
  $60 = $2;
  $61 = $60&255;
  $62 = $k;
  $63 = $62 << 24 >> 24;
  $64 = (($61) - ($63))|0;
  $65 = $i;
  $66 = $65 << 24 >> 24;
  $67 = (($64) + ($66))|0;
  $68 = $1;
  $69 = (($68) + ($67)|0);
  HEAP8[$69>>0] = $59;
  $70 = $i;
  $71 = (($70) + 1)<<24>>24;
  $i = $71;
 }
 STACKTOP = sp;return;
}
function _str_len($arr) {
 $arr = $arr|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_str = 0, $arr_len = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $1;
 $3 = HEAP32[$2>>2]|0;
 $4 = $3 & 65535;
 $5 = $4&65535;
 $arr_len = $5;
 $6 = $1;
 $7 = ((($6)) + 4|0);
 $act_str = $7;
 $i = 0;
 while(1) {
  $8 = $i;
  $9 = $arr_len;
  $10 = $9&65535;
  $11 = ($8|0)<($10|0);
  if (!($11)) {
   label = 6;
   break;
  }
  $12 = $i;
  $13 = $act_str;
  $14 = (($13) + ($12)|0);
  $15 = HEAP8[$14>>0]|0;
  $16 = $15&255;
  $17 = ($16|0)==(0);
  $18 = $i;
  if ($17) {
   label = 4;
   break;
  }
  $19 = (($18) + 1)|0;
  $i = $19;
 }
 if ((label|0) == 4) {
  $0 = $18;
  $23 = $0;
  STACKTOP = sp;return ($23|0);
 }
 else if ((label|0) == 6) {
  $20 = HEAP32[524296>>2]|0;
  $21 = $20;
  $22 = (_ARGEE_sim_ARGEE_returnErr_imp($21,0)|0);
  $0 = $22;
  $23 = $0;
  STACKTOP = sp;return ($23|0);
 }
 return (0)|0;
}
function _ARGEE_sim_ARGEE_returnErr_imp($prog_text,$regs) {
 $prog_text = $prog_text|0;
 $regs = $regs|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $prog_text;
 $1 = $regs;
 $2 = $0;
 $3 = HEAP16[658618>>1]|0;
 $4 = $3&65535;
 $5 = (($2) + ($4))|0;
 $6 = $5;
 $7 = (_LE_UINT32_GET($6)|0);
 _MOV_VAL(4,$7);
 $8 = $0;
 $9 = HEAP16[658616>>1]|0;
 $10 = $9&65535;
 $11 = (($8) + ($10))|0;
 $12 = $11;
 $13 = (_LE_UINT32_GET($12)|0);
 _MOV_VAL(7,$13);
 _MOV_VAL(0,2);
 _MOV_VAL(15,-1);
 STACKTOP = sp;return 2;
}
function _str_left($src,$num_elems,$dst) {
 $src = $src|0;
 $num_elems = $num_elems|0;
 $dst = $dst|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_dst = 0, $act_src = 0, $dst_len = 0;
 var $i = 0, $j = 0, $src_len = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $num_elems;
 $3 = $dst;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $src_len = $7;
 $8 = $3;
 $9 = HEAP32[$8>>2]|0;
 $10 = $9 & 65535;
 $11 = $10&65535;
 $dst_len = $11;
 $12 = $1;
 $13 = ((($12)) + 4|0);
 $act_src = $13;
 $14 = $3;
 $15 = ((($14)) + 4|0);
 $act_dst = $15;
 $i = 0;
 $j = 0;
 while(1) {
  $16 = $i;
  $17 = $2;
  $18 = ($16|0)<($17|0);
  if (!($18)) {
   label = 10;
   break;
  }
  $19 = $i;
  $20 = $src_len;
  $21 = $20&65535;
  $22 = ($19|0)>=($21|0);
  if ($22) {
   label = 4;
   break;
  }
  $26 = $j;
  $27 = $dst_len;
  $28 = $27&65535;
  $29 = ($26|0)>=($28|0);
  if ($29) {
   label = 6;
   break;
  }
  $33 = $i;
  $34 = $act_src;
  $35 = (($34) + ($33)|0);
  $36 = HEAP8[$35>>0]|0;
  $37 = $36&255;
  $38 = ($37|0)==(0);
  if ($38) {
   label = 8;
   break;
  }
  $42 = $i;
  $43 = $act_src;
  $44 = (($43) + ($42)|0);
  $45 = HEAP8[$44>>0]|0;
  $46 = $j;
  $47 = $act_dst;
  $48 = (($47) + ($46)|0);
  HEAP8[$48>>0] = $45;
  $49 = $i;
  $50 = (($49) + 1)|0;
  $i = $50;
  $51 = $j;
  $52 = (($51) + 1)|0;
  $j = $52;
 }
 if ((label|0) == 4) {
  $23 = HEAP32[524296>>2]|0;
  $24 = $23;
  $25 = (_ARGEE_sim_ARGEE_returnErr_imp($24,0)|0);
  $0 = $25;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 else if ((label|0) == 6) {
  $30 = HEAP32[524296>>2]|0;
  $31 = $30;
  $32 = (_ARGEE_sim_ARGEE_returnErr_imp($31,0)|0);
  $0 = $32;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 else if ((label|0) == 8) {
  $39 = HEAP32[524296>>2]|0;
  $40 = $39;
  $41 = (_ARGEE_sim_ARGEE_returnErr_imp($40,0)|0);
  $0 = $41;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 else if ((label|0) == 10) {
  $53 = $j;
  $54 = $act_dst;
  $55 = (($54) + ($53)|0);
  HEAP8[$55>>0] = 0;
  $0 = 0;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 return (0)|0;
}
function _str_right($src,$num_elems,$dst) {
 $src = $src|0;
 $num_elems = $num_elems|0;
 $dst = $dst|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $7 = 0;
 var $8 = 0, $9 = 0, $act_dst = 0, $act_src = 0, $dst_len = 0, $i = 0, $j = 0, $src_act_len = 0, $src_len = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $num_elems;
 $3 = $dst;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $src_len = $7;
 $8 = $3;
 $9 = HEAP32[$8>>2]|0;
 $10 = $9 & 65535;
 $11 = $10&65535;
 $dst_len = $11;
 $12 = $1;
 $13 = ((($12)) + 4|0);
 $act_src = $13;
 $14 = $3;
 $15 = ((($14)) + 4|0);
 $act_dst = $15;
 $16 = $1;
 $17 = (_str_len($16)|0);
 $src_act_len = $17;
 $18 = $src_act_len;
 $19 = $2;
 $20 = (($18) - ($19))|0;
 $i = $20;
 $j = 0;
 while(1) {
  $21 = $i;
  $22 = $src_act_len;
  $23 = ($21|0)<($22|0);
  if (!($23)) {
   label = 10;
   break;
  }
  $24 = $i;
  $25 = $src_len;
  $26 = $25&65535;
  $27 = ($24|0)>=($26|0);
  if ($27) {
   label = 4;
   break;
  }
  $31 = $j;
  $32 = $dst_len;
  $33 = $32&65535;
  $34 = ($31|0)>=($33|0);
  if ($34) {
   label = 6;
   break;
  }
  $38 = $i;
  $39 = $act_src;
  $40 = (($39) + ($38)|0);
  $41 = HEAP8[$40>>0]|0;
  $42 = $41&255;
  $43 = ($42|0)==(0);
  if ($43) {
   label = 8;
   break;
  }
  $47 = $i;
  $48 = $act_src;
  $49 = (($48) + ($47)|0);
  $50 = HEAP8[$49>>0]|0;
  $51 = $j;
  $52 = $act_dst;
  $53 = (($52) + ($51)|0);
  HEAP8[$53>>0] = $50;
  $54 = $i;
  $55 = (($54) + 1)|0;
  $i = $55;
  $56 = $j;
  $57 = (($56) + 1)|0;
  $j = $57;
 }
 if ((label|0) == 4) {
  $28 = HEAP32[524296>>2]|0;
  $29 = $28;
  $30 = (_ARGEE_sim_ARGEE_returnErr_imp($29,0)|0);
  $0 = $30;
  $61 = $0;
  STACKTOP = sp;return ($61|0);
 }
 else if ((label|0) == 6) {
  $35 = HEAP32[524296>>2]|0;
  $36 = $35;
  $37 = (_ARGEE_sim_ARGEE_returnErr_imp($36,0)|0);
  $0 = $37;
  $61 = $0;
  STACKTOP = sp;return ($61|0);
 }
 else if ((label|0) == 8) {
  $44 = HEAP32[524296>>2]|0;
  $45 = $44;
  $46 = (_ARGEE_sim_ARGEE_returnErr_imp($45,0)|0);
  $0 = $46;
  $61 = $0;
  STACKTOP = sp;return ($61|0);
 }
 else if ((label|0) == 10) {
  $58 = $j;
  $59 = $act_dst;
  $60 = (($59) + ($58)|0);
  HEAP8[$60>>0] = 0;
  $0 = 0;
  $61 = $0;
  STACKTOP = sp;return ($61|0);
 }
 return (0)|0;
}
function _str_mid($src,$start_pos,$end_pos,$dst) {
 $src = $src|0;
 $start_pos = $start_pos|0;
 $end_pos = $end_pos|0;
 $dst = $dst|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_dst = 0;
 var $act_src = 0, $dst_len = 0, $i = 0, $j = 0, $src_len = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $start_pos;
 $3 = $end_pos;
 $4 = $dst;
 $5 = $1;
 $6 = HEAP32[$5>>2]|0;
 $7 = $6 & 65535;
 $8 = $7&65535;
 $src_len = $8;
 $9 = $4;
 $10 = HEAP32[$9>>2]|0;
 $11 = $10 & 65535;
 $12 = $11&65535;
 $dst_len = $12;
 $13 = $1;
 $14 = ((($13)) + 4|0);
 $act_src = $14;
 $15 = $4;
 $16 = ((($15)) + 4|0);
 $act_dst = $16;
 $17 = $2;
 $i = $17;
 $j = 0;
 while(1) {
  $18 = $i;
  $19 = $3;
  $20 = ($18|0)<($19|0);
  if (!($20)) {
   label = 10;
   break;
  }
  $21 = $i;
  $22 = $src_len;
  $23 = $22&65535;
  $24 = ($21|0)>=($23|0);
  if ($24) {
   label = 4;
   break;
  }
  $28 = $j;
  $29 = $dst_len;
  $30 = $29&65535;
  $31 = ($28|0)>=($30|0);
  if ($31) {
   label = 6;
   break;
  }
  $35 = $i;
  $36 = $act_src;
  $37 = (($36) + ($35)|0);
  $38 = HEAP8[$37>>0]|0;
  $39 = $38&255;
  $40 = ($39|0)==(0);
  if ($40) {
   label = 8;
   break;
  }
  $44 = $i;
  $45 = $act_src;
  $46 = (($45) + ($44)|0);
  $47 = HEAP8[$46>>0]|0;
  $48 = $j;
  $49 = $act_dst;
  $50 = (($49) + ($48)|0);
  HEAP8[$50>>0] = $47;
  $51 = $i;
  $52 = (($51) + 1)|0;
  $i = $52;
  $53 = $j;
  $54 = (($53) + 1)|0;
  $j = $54;
 }
 if ((label|0) == 4) {
  $25 = HEAP32[524296>>2]|0;
  $26 = $25;
  $27 = (_ARGEE_sim_ARGEE_returnErr_imp($26,0)|0);
  $0 = $27;
  $58 = $0;
  STACKTOP = sp;return ($58|0);
 }
 else if ((label|0) == 6) {
  $32 = HEAP32[524296>>2]|0;
  $33 = $32;
  $34 = (_ARGEE_sim_ARGEE_returnErr_imp($33,0)|0);
  $0 = $34;
  $58 = $0;
  STACKTOP = sp;return ($58|0);
 }
 else if ((label|0) == 8) {
  $41 = HEAP32[524296>>2]|0;
  $42 = $41;
  $43 = (_ARGEE_sim_ARGEE_returnErr_imp($42,0)|0);
  $0 = $43;
  $58 = $0;
  STACKTOP = sp;return ($58|0);
 }
 else if ((label|0) == 10) {
  $55 = $j;
  $56 = $act_dst;
  $57 = (($56) + ($55)|0);
  HEAP8[$57>>0] = 0;
  $0 = 0;
  $58 = $0;
  STACKTOP = sp;return ($58|0);
 }
 return (0)|0;
}
function _str_copy($src,$dst) {
 $src = $src|0;
 $dst = $dst|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_dst = 0, $act_src = 0, $dst_len = 0, $i = 0, $j = 0, $src_len = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $dst;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $src_len = $6;
 $7 = $2;
 $8 = HEAP32[$7>>2]|0;
 $9 = $8 & 65535;
 $10 = $9&65535;
 $dst_len = $10;
 $11 = $1;
 $12 = ((($11)) + 4|0);
 $act_src = $12;
 $13 = $2;
 $14 = ((($13)) + 4|0);
 $act_dst = $14;
 $i = 0;
 $j = 0;
 while(1) {
  $15 = $i;
  $16 = $src_len;
  $17 = $16&65535;
  $18 = ($15|0)<($17|0);
  if (!($18)) {
   label = 9;
   break;
  }
  $19 = $i;
  $20 = $src_len;
  $21 = $20&65535;
  $22 = ($19|0)>=($21|0);
  if ($22) {
   label = 4;
   break;
  }
  $26 = $j;
  $27 = $dst_len;
  $28 = $27&65535;
  $29 = ($26|0)>=($28|0);
  if ($29) {
   label = 6;
   break;
  }
  $33 = $i;
  $34 = $act_src;
  $35 = (($34) + ($33)|0);
  $36 = HEAP8[$35>>0]|0;
  $37 = $36&255;
  $38 = ($37|0)==(0);
  if ($38) {
   label = 9;
   break;
  }
  $39 = $i;
  $40 = $act_src;
  $41 = (($40) + ($39)|0);
  $42 = HEAP8[$41>>0]|0;
  $43 = $j;
  $44 = $act_dst;
  $45 = (($44) + ($43)|0);
  HEAP8[$45>>0] = $42;
  $46 = $i;
  $47 = (($46) + 1)|0;
  $i = $47;
  $48 = $j;
  $49 = (($48) + 1)|0;
  $j = $49;
 }
 if ((label|0) == 4) {
  $23 = HEAP32[524296>>2]|0;
  $24 = $23;
  $25 = (_ARGEE_sim_ARGEE_returnErr_imp($24,0)|0);
  $0 = $25;
  $53 = $0;
  STACKTOP = sp;return ($53|0);
 }
 else if ((label|0) == 6) {
  $30 = HEAP32[524296>>2]|0;
  $31 = $30;
  $32 = (_ARGEE_sim_ARGEE_returnErr_imp($31,0)|0);
  $0 = $32;
  $53 = $0;
  STACKTOP = sp;return ($53|0);
 }
 else if ((label|0) == 9) {
  $50 = $j;
  $51 = $act_dst;
  $52 = (($51) + ($50)|0);
  HEAP8[$52>>0] = 0;
  $0 = 0;
  $53 = $0;
  STACKTOP = sp;return ($53|0);
 }
 return (0)|0;
}
function _str_concat($src,$dst) {
 $src = $src|0;
 $dst = $dst|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_dst = 0, $act_src = 0, $dst_act_len = 0;
 var $dst_len = 0, $i = 0, $j = 0, $src_len = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $dst;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $src_len = $6;
 $7 = $2;
 $8 = HEAP32[$7>>2]|0;
 $9 = $8 & 65535;
 $10 = $9&65535;
 $dst_len = $10;
 $11 = $1;
 $12 = ((($11)) + 4|0);
 $act_src = $12;
 $13 = $2;
 $14 = ((($13)) + 4|0);
 $act_dst = $14;
 $15 = $2;
 $16 = (_str_len($15)|0);
 $dst_act_len = $16;
 $i = 0;
 $17 = $dst_act_len;
 $j = $17;
 while(1) {
  $18 = $i;
  $19 = $src_len;
  $20 = $19&65535;
  $21 = ($18|0)<($20|0);
  if (!($21)) {
   label = 9;
   break;
  }
  $22 = $i;
  $23 = $src_len;
  $24 = $23&65535;
  $25 = ($22|0)>=($24|0);
  if ($25) {
   label = 4;
   break;
  }
  $29 = $j;
  $30 = $dst_len;
  $31 = $30&65535;
  $32 = ($29|0)>=($31|0);
  if ($32) {
   label = 6;
   break;
  }
  $36 = $i;
  $37 = $act_src;
  $38 = (($37) + ($36)|0);
  $39 = HEAP8[$38>>0]|0;
  $40 = $39&255;
  $41 = ($40|0)==(0);
  if ($41) {
   label = 9;
   break;
  }
  $42 = $i;
  $43 = $act_src;
  $44 = (($43) + ($42)|0);
  $45 = HEAP8[$44>>0]|0;
  $46 = $j;
  $47 = $act_dst;
  $48 = (($47) + ($46)|0);
  HEAP8[$48>>0] = $45;
  $49 = $i;
  $50 = (($49) + 1)|0;
  $i = $50;
  $51 = $j;
  $52 = (($51) + 1)|0;
  $j = $52;
 }
 if ((label|0) == 4) {
  $26 = HEAP32[524296>>2]|0;
  $27 = $26;
  $28 = (_ARGEE_sim_ARGEE_returnErr_imp($27,0)|0);
  $0 = $28;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 else if ((label|0) == 6) {
  $33 = HEAP32[524296>>2]|0;
  $34 = $33;
  $35 = (_ARGEE_sim_ARGEE_returnErr_imp($34,0)|0);
  $0 = $35;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 else if ((label|0) == 9) {
  $53 = $j;
  $54 = $act_dst;
  $55 = (($54) + ($53)|0);
  HEAP8[$55>>0] = 0;
  $0 = 0;
  $56 = $0;
  STACKTOP = sp;return ($56|0);
 }
 return (0)|0;
}
function _str_compare($src,$dst) {
 $src = $src|0;
 $dst = $dst|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_dst = 0, $act_src = 0, $dst_act_len = 0, $dst_len = 0, $i = 0, $src_act_len = 0, $src_len = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $dst;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $src_len = $6;
 $7 = $2;
 $8 = HEAP32[$7>>2]|0;
 $9 = $8 & 65535;
 $10 = $9&65535;
 $dst_len = $10;
 $11 = $1;
 $12 = ((($11)) + 4|0);
 $act_src = $12;
 $13 = $2;
 $14 = ((($13)) + 4|0);
 $act_dst = $14;
 $15 = $2;
 $16 = (_str_len($15)|0);
 $dst_act_len = $16;
 $17 = $1;
 $18 = (_str_len($17)|0);
 $src_act_len = $18;
 $19 = $dst_act_len;
 $20 = $src_act_len;
 $21 = ($19|0)!=($20|0);
 if ($21) {
  $0 = 0;
  $45 = $0;
  STACKTOP = sp;return ($45|0);
 }
 $i = 0;
 while(1) {
  $22 = $i;
  $23 = $src_act_len;
  $24 = ($22|0)<($23|0);
  if (!($24)) {
   label = 10;
   break;
  }
  $25 = $i;
  $26 = $src_len;
  $27 = $26&65535;
  $28 = ($25|0)>=($27|0);
  if ($28) {
   label = 6;
   break;
  }
  $32 = $i;
  $33 = $act_src;
  $34 = (($33) + ($32)|0);
  $35 = HEAP8[$34>>0]|0;
  $36 = $35&255;
  $37 = $i;
  $38 = $act_dst;
  $39 = (($38) + ($37)|0);
  $40 = HEAP8[$39>>0]|0;
  $41 = $40&255;
  $42 = ($36|0)!=($41|0);
  if ($42) {
   label = 8;
   break;
  }
  $43 = $i;
  $44 = (($43) + 1)|0;
  $i = $44;
 }
 if ((label|0) == 6) {
  $29 = HEAP32[524296>>2]|0;
  $30 = $29;
  $31 = (_ARGEE_sim_ARGEE_returnErr_imp($30,0)|0);
  $0 = $31;
  $45 = $0;
  STACKTOP = sp;return ($45|0);
 }
 else if ((label|0) == 8) {
  $0 = 0;
  $45 = $0;
  STACKTOP = sp;return ($45|0);
 }
 else if ((label|0) == 10) {
  $0 = 1;
  $45 = $0;
  STACKTOP = sp;return ($45|0);
 }
 return (0)|0;
}
function _str_to_int($src,$base) {
 $src = $src|0;
 $base = $base|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_src = 0, $len = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $src;
 $2 = $base;
 $3 = $1;
 $4 = ((($3)) + 4|0);
 $act_src = $4;
 $5 = $1;
 $6 = (_str_len($5)|0);
 $len = $6;
 $7 = $1;
 $8 = (_str_len($7)|0);
 $9 = ($8|0)>=(256);
 if ($9) {
  $10 = HEAP32[524296>>2]|0;
  $11 = $10;
  $12 = (_ARGEE_sim_ARGEE_returnErr_imp($11,0)|0);
  $0 = $12;
  $16 = $0;
  STACKTOP = sp;return ($16|0);
 } else {
  $13 = $act_src;
  $14 = $2;
  $15 = (_strtol($13,0,$14)|0);
  $0 = $15;
  $16 = $0;
  STACKTOP = sp;return ($16|0);
 }
 return (0)|0;
}
function _int_to_str($val,$dst,$base) {
 $val = $val|0;
 $dst = $dst|0;
 $base = $base|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $act_dst = 0, $dst_len = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $val;
 $2 = $dst;
 $3 = $base;
 $4 = $2;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $dst_len = $7;
 $8 = $2;
 $9 = ((($8)) + 4|0);
 $act_dst = $9;
 dest=1184126; stop=dest+30|0; do { HEAP8[dest>>0]=0|0; dest=dest+1|0; } while ((dest|0) < (stop|0));
 $10 = $1;
 $11 = $3;
 $12 = $11&255;
 _itoa_sb($10,1184126,30,$12,1);
 $13 = (_strlen(1184126)|0);
 $14 = $dst_len;
 $15 = $14&65535;
 $16 = ($13>>>0)>($15>>>0);
 if ($16) {
  $17 = HEAP32[524296>>2]|0;
  $18 = $17;
  $19 = (_ARGEE_sim_ARGEE_returnErr_imp($18,0)|0);
  $0 = $19;
  $24 = $0;
  STACKTOP = sp;return ($24|0);
 } else {
  $20 = $act_dst;
  $21 = $dst_len;
  $22 = $21&65535;
  _memset(($20|0),0,($22|0))|0;
  $23 = $act_dst;
  (_strcpy($23,1184126)|0);
  $0 = 0;
  $24 = $0;
  STACKTOP = sp;return ($24|0);
 }
 return (0)|0;
}
function _getRungTrue() {
 var $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $flags = 0, $fp_addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = HEAP32[524296>>2]|0;
 $1 = HEAP16[658618>>1]|0;
 $2 = $1&65535;
 $3 = (($0) + ($2)|0);
 $4 = (_LE_UINT32_GET($3)|0);
 $fp_addr = $4;
 $5 = $fp_addr;
 $6 = (($5) + 12)|0;
 $7 = $6;
 $8 = (_LE_UINT32_GET($7)|0);
 $flags = $8;
 $9 = $flags;
 $10 = $9 & 1;
 STACKTOP = sp;return ($10|0);
}
function _getRungTrueFunc($dummy) {
 $dummy = $dummy|0;
 var $0 = 0, $1 = 0, $2 = 0, $state = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $dummy;
 $1 = (_getRungTrue()|0);
 $state = $1;
 $2 = $state;
 STACKTOP = sp;return ($2|0);
}
function _ladder_condition($cond) {
 $cond = $cond|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $fp_addr = 0, $prev = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $cond;
 $1 = HEAP32[524296>>2]|0;
 $2 = HEAP16[658618>>1]|0;
 $3 = $2&65535;
 $4 = (($1) + ($3)|0);
 $5 = (_LE_UINT32_GET($4)|0);
 $fp_addr = $5;
 $6 = $fp_addr;
 $7 = (($6) + 12)|0;
 $8 = $7;
 $ptr = $8;
 $9 = $ptr;
 $10 = (_LE_UINT32_GET($9)|0);
 $prev = $10;
 $11 = $0;
 $12 = $11 & 1;
 $13 = ($12|0)==(0);
 $14 = $prev;
 if ($13) {
  $15 = $14 & -2;
  $prev = $15;
  $16 = $ptr;
  $17 = $prev;
  _LE_UINT32_SET($16,$17);
  STACKTOP = sp;return 0;
 } else {
  $18 = $14 | 1;
  $prev = $18;
  $19 = $ptr;
  $20 = $prev;
  _LE_UINT32_SET($19,$20);
  STACKTOP = sp;return 0;
 }
 return (0)|0;
}
function _ladder_coil($var_addr,$bit_offset,$bit_len) {
 $var_addr = $var_addr|0;
 $bit_offset = $bit_offset|0;
 $bit_len = $bit_len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $var_addr;
 $1 = $bit_offset;
 $2 = $bit_len;
 $3 = (_getRungTrue()|0);
 $4 = ($3|0)==(1);
 $5 = $1;
 $6 = 1 << $5;
 if ($4) {
  $7 = $0;
  $8 = HEAP32[$7>>2]|0;
  $9 = $8 | $6;
  HEAP32[$7>>2] = $9;
  STACKTOP = sp;return 0;
 } else {
  $10 = $6 ^ -1;
  $11 = $0;
  $12 = HEAP32[$11>>2]|0;
  $13 = $12 & $10;
  HEAP32[$11>>2] = $13;
  STACKTOP = sp;return 0;
 }
 return (0)|0;
}
function _ladder_assign($var_addr,$val,$bit_offset,$bit_len) {
 $var_addr = $var_addr|0;
 $val = $val|0;
 $bit_offset = $bit_offset|0;
 $bit_len = $bit_len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ptr = 0, $ptr1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $var_addr;
 $1 = $val;
 $2 = $bit_offset;
 $3 = $bit_len;
 $4 = (_getRungTrue()|0);
 $5 = ($4|0)==(1);
 if (!($5)) {
  STACKTOP = sp;return 0;
 }
 $6 = $3;
 $7 = ($6|0)==(33);
 if ($7) {
  $8 = $0;
  $9 = $8;
  $10 = $9;
  $ptr = $10;
  $11 = $1;
  $12 = $11&255;
  $13 = $ptr;
  HEAP8[$13>>0] = $12;
  STACKTOP = sp;return 0;
 }
 $14 = $3;
 $15 = ($14|0)==(34);
 if ($15) {
  $16 = $0;
  $17 = $16;
  $18 = $17;
  $ptr1 = $18;
  $19 = $1;
  $20 = $19&65535;
  $21 = $ptr1;
  HEAP16[$21>>1] = $20;
  STACKTOP = sp;return 0;
 }
 $22 = $3;
 $23 = ($22|0)!=(32);
 if ($23) {
  $24 = $3;
  $25 = 1 << $24;
  $26 = (($25) - 1)|0;
  $27 = $2;
  $28 = $26 << $27;
  $29 = $28 ^ -1;
  $30 = $0;
  $31 = HEAP32[$30>>2]|0;
  $32 = $31 & $29;
  HEAP32[$30>>2] = $32;
  $33 = $1;
  $34 = $3;
  $35 = 1 << $34;
  $36 = (($35) - 1)|0;
  $37 = $33 & $36;
  $38 = $2;
  $39 = $37 << $38;
  $40 = $0;
  $41 = HEAP32[$40>>2]|0;
  $42 = $41 | $39;
  HEAP32[$40>>2] = $42;
  STACKTOP = sp;return 0;
 } else {
  $43 = $1;
  $44 = $0;
  HEAP32[$44>>2] = $43;
  STACKTOP = sp;return 0;
 }
 return (0)|0;
}
function _ladder_timer_on($timer,$exp) {
 $timer = $timer|0;
 $exp = $exp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $ctrl = 0, $curr_int_tick = 0, $preset = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $timer;
 $2 = $exp;
 $3 = $1;
 $ref = $3;
 $4 = $1;
 $5 = ((($4)) + 4|0);
 $ctrl = $5;
 $6 = $ctrl;
 $7 = HEAP32[$6>>2]|0;
 $8 = $7 & -67108865;
 HEAP32[$6>>2] = $8;
 $9 = $ctrl;
 $10 = HEAP32[$9>>2]|0;
 HEAP32[$9>>2] = $10;
 $11 = $ctrl;
 $12 = HEAP32[$11>>2]|0;
 $13 = $12 & -268435457;
 HEAP32[$11>>2] = $13;
 $14 = $ctrl;
 $15 = HEAP32[$14>>2]|0;
 HEAP32[$14>>2] = $15;
 $16 = $ctrl;
 $17 = HEAP32[$16>>2]|0;
 $18 = $17 >>> 25;
 $19 = $18 & 1;
 $20 = ($19|0)==(0);
 if ($20) {
  $21 = (_getRungTrue()|0);
  $22 = ($21|0)==(1);
  if ($22) {
   $23 = (_OS_getIntTick()|0);
   $24 = $ref;
   HEAP32[$24>>2] = $23;
   $25 = $ctrl;
   $26 = HEAP32[$25>>2]|0;
   $27 = $26 & -16777216;
   HEAP32[$25>>2] = $27;
   $28 = $2;
   $29 = $28 & 16777215;
   $30 = $29 << 0;
   $31 = $ctrl;
   $32 = HEAP32[$31>>2]|0;
   $33 = $32 | $30;
   HEAP32[$31>>2] = $33;
  } else {
   label = 4;
  }
 } else {
  label = 4;
 }
 do {
  if ((label|0) == 4) {
   $34 = $ctrl;
   $35 = HEAP32[$34>>2]|0;
   $36 = $35 >>> 25;
   $37 = $36 & 1;
   $38 = ($37|0)==(1);
   if ($38) {
    $39 = (_getRungTrue()|0);
    $40 = ($39|0)==(0);
    if ($40) {
     $41 = $ctrl;
     $42 = HEAP32[$41>>2]|0;
     $43 = $42 & -16777217;
     HEAP32[$41>>2] = $43;
     $44 = $ctrl;
     $45 = HEAP32[$44>>2]|0;
     HEAP32[$44>>2] = $45;
     $46 = $ctrl;
     $47 = HEAP32[$46>>2]|0;
     $48 = $47 & -16777216;
     HEAP32[$46>>2] = $48;
     $49 = $ctrl;
     $50 = HEAP32[$49>>2]|0;
     HEAP32[$49>>2] = $50;
     break;
    }
   }
   $51 = $ctrl;
   $52 = HEAP32[$51>>2]|0;
   $53 = $52 >>> 25;
   $54 = $53 & 1;
   $55 = ($54|0)==(1);
   if ($55) {
    $56 = (_getRungTrue()|0);
    $57 = ($56|0)==(1);
    if ($57) {
     $58 = $ctrl;
     $59 = HEAP32[$58>>2]|0;
     $60 = $59 >>> 24;
     $61 = $60 & 1;
     $62 = ($61|0)==(0);
     if ($62) {
      $63 = (_OS_getIntTick()|0);
      $curr_int_tick = $63;
      $64 = $ctrl;
      $65 = HEAP32[$64>>2]|0;
      $66 = $65 >>> 0;
      $67 = $66 & 16777215;
      $preset = $67;
      $68 = $ref;
      $69 = HEAP32[$68>>2]|0;
      $70 = $preset;
      $71 = (($69) + ($70))|0;
      $72 = $curr_int_tick;
      $73 = ($71>>>0)<($72>>>0);
      if ($73) {
       $74 = $ctrl;
       $75 = HEAP32[$74>>2]|0;
       $76 = $75 & -16777217;
       HEAP32[$74>>2] = $76;
       $77 = $ctrl;
       $78 = HEAP32[$77>>2]|0;
       $79 = $78 | 16777216;
       HEAP32[$77>>2] = $79;
      }
     }
    }
   }
  }
 } while(0);
 $80 = $ctrl;
 $81 = HEAP32[$80>>2]|0;
 $82 = $81 & -33554433;
 HEAP32[$80>>2] = $82;
 $83 = (_getRungTrue()|0);
 $84 = $83 & 1;
 $85 = $84 << 25;
 $86 = $ctrl;
 $87 = HEAP32[$86>>2]|0;
 $88 = $87 | $85;
 HEAP32[$86>>2] = $88;
 $89 = $0;
 STACKTOP = sp;return ($89|0);
}
function _ladder_timer_off($timer,$exp) {
 $timer = $timer|0;
 $exp = $exp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $9 = 0, $ctrl = 0, $curr_int_tick = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $timer;
 $2 = $exp;
 $3 = $1;
 $ref = $3;
 $4 = $1;
 $5 = ((($4)) + 4|0);
 $ctrl = $5;
 $6 = $ctrl;
 $7 = HEAP32[$6>>2]|0;
 $8 = $7 & -67108865;
 HEAP32[$6>>2] = $8;
 $9 = $ctrl;
 $10 = HEAP32[$9>>2]|0;
 HEAP32[$9>>2] = $10;
 $11 = $ctrl;
 $12 = HEAP32[$11>>2]|0;
 $13 = $12 & -268435457;
 HEAP32[$11>>2] = $13;
 $14 = $ctrl;
 $15 = HEAP32[$14>>2]|0;
 HEAP32[$14>>2] = $15;
 $16 = $ctrl;
 $17 = HEAP32[$16>>2]|0;
 $18 = $17 >>> 0;
 $19 = $18 & 16777215;
 $20 = ($19|0)==(0);
 if ($20) {
  $21 = (_getRungTrue()|0);
  $22 = ($21|0)==(0);
  if ($22) {
   $23 = (_OS_getIntTick()|0);
   $24 = $ref;
   HEAP32[$24>>2] = $23;
   $25 = $ctrl;
   $26 = HEAP32[$25>>2]|0;
   $27 = $26 & -16777217;
   HEAP32[$25>>2] = $27;
   $28 = $ctrl;
   $29 = HEAP32[$28>>2]|0;
   HEAP32[$28>>2] = $29;
   $30 = $ctrl;
   $31 = HEAP32[$30>>2]|0;
   $32 = $31 & -16777216;
   HEAP32[$30>>2] = $32;
   $33 = $2;
   $34 = $33 & 16777215;
   $35 = $34 << 0;
   $36 = $ctrl;
   $37 = HEAP32[$36>>2]|0;
   $38 = $37 | $35;
   HEAP32[$36>>2] = $38;
  } else {
   label = 4;
  }
 } else {
  label = 4;
 }
 do {
  if ((label|0) == 4) {
   $39 = (_getRungTrue()|0);
   $40 = ($39|0)==(1);
   $41 = $ctrl;
   $42 = HEAP32[$41>>2]|0;
   if ($40) {
    $43 = $42 & -16777217;
    HEAP32[$41>>2] = $43;
    $44 = $ctrl;
    $45 = HEAP32[$44>>2]|0;
    HEAP32[$44>>2] = $45;
    $46 = $ctrl;
    $47 = HEAP32[$46>>2]|0;
    $48 = $47 & -16777216;
    HEAP32[$46>>2] = $48;
    $49 = $ctrl;
    $50 = HEAP32[$49>>2]|0;
    HEAP32[$49>>2] = $50;
    break;
   }
   $51 = $42 >>> 0;
   $52 = $51 & 16777215;
   $53 = ($52|0)!=(0);
   if ($53) {
    $54 = (_getRungTrue()|0);
    $55 = ($54|0)==(0);
    if ($55) {
     $56 = $ctrl;
     $57 = HEAP32[$56>>2]|0;
     $58 = $57 >>> 24;
     $59 = $58 & 1;
     $60 = ($59|0)==(0);
     if ($60) {
      $61 = (_OS_getIntTick()|0);
      $curr_int_tick = $61;
      $62 = $ref;
      $63 = HEAP32[$62>>2]|0;
      $64 = $ctrl;
      $65 = HEAP32[$64>>2]|0;
      $66 = $65 >>> 0;
      $67 = $66 & 16777215;
      $68 = (($63) + ($67))|0;
      $69 = $curr_int_tick;
      $70 = ($68>>>0)<($69>>>0);
      if ($70) {
       $71 = $ctrl;
       $72 = HEAP32[$71>>2]|0;
       $73 = $72 & -16777217;
       HEAP32[$71>>2] = $73;
       $74 = $ctrl;
       $75 = HEAP32[$74>>2]|0;
       $76 = $75 | 16777216;
       HEAP32[$74>>2] = $76;
      }
     }
    }
   }
  }
 } while(0);
 $77 = $ctrl;
 $78 = HEAP32[$77>>2]|0;
 $79 = $78 & -33554433;
 HEAP32[$77>>2] = $79;
 $80 = (_getRungTrue()|0);
 $81 = $80 & 1;
 $82 = $81 << 25;
 $83 = $ctrl;
 $84 = HEAP32[$83>>2]|0;
 $85 = $84 | $82;
 HEAP32[$83>>2] = $85;
 $86 = $0;
 STACKTOP = sp;return ($86|0);
}
function _ladder_timer_start($timer,$exp) {
 $timer = $timer|0;
 $exp = $exp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $8 = 0, $9 = 0, $ctrl = 0, $curr_int_tick = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $timer;
 $2 = $exp;
 $3 = $1;
 $ref = $3;
 $4 = $1;
 $5 = ((($4)) + 4|0);
 $ctrl = $5;
 $6 = $ctrl;
 $7 = HEAP32[$6>>2]|0;
 $8 = $7 & -67108865;
 HEAP32[$6>>2] = $8;
 $9 = $ctrl;
 $10 = HEAP32[$9>>2]|0;
 HEAP32[$9>>2] = $10;
 $11 = $ctrl;
 $12 = HEAP32[$11>>2]|0;
 $13 = $12 & -268435457;
 HEAP32[$11>>2] = $13;
 $14 = $ctrl;
 $15 = HEAP32[$14>>2]|0;
 $16 = $15 | 268435456;
 HEAP32[$14>>2] = $16;
 $17 = (_getRungTrue()|0);
 $18 = ($17|0)==(1);
 if ($18) {
  $19 = (_OS_getIntTick()|0);
  $20 = $ref;
  HEAP32[$20>>2] = $19;
  $21 = $ctrl;
  $22 = HEAP32[$21>>2]|0;
  $23 = $22 & -16777217;
  HEAP32[$21>>2] = $23;
  $24 = $ctrl;
  $25 = HEAP32[$24>>2]|0;
  HEAP32[$24>>2] = $25;
  $26 = $ctrl;
  $27 = HEAP32[$26>>2]|0;
  $28 = $27 & -16777216;
  HEAP32[$26>>2] = $28;
  $29 = $2;
  $30 = $29 & 16777215;
  $31 = $30 << 0;
  $32 = $ctrl;
  $33 = HEAP32[$32>>2]|0;
  $34 = $33 | $31;
  HEAP32[$32>>2] = $34;
 } else {
  $35 = $ctrl;
  $36 = HEAP32[$35>>2]|0;
  $37 = $36 >>> 0;
  $38 = $37 & 16777215;
  $39 = ($38|0)!=(0);
  if ($39) {
   $40 = $ctrl;
   $41 = HEAP32[$40>>2]|0;
   $42 = $41 >>> 24;
   $43 = $42 & 1;
   $44 = ($43|0)==(0);
   if ($44) {
    $45 = (_OS_getIntTick()|0);
    $curr_int_tick = $45;
    $46 = $ref;
    $47 = HEAP32[$46>>2]|0;
    $48 = $ctrl;
    $49 = HEAP32[$48>>2]|0;
    $50 = $49 >>> 0;
    $51 = $50 & 16777215;
    $52 = (($47) + ($51))|0;
    $53 = $curr_int_tick;
    $54 = ($52>>>0)<($53>>>0);
    if ($54) {
     $55 = $ctrl;
     $56 = HEAP32[$55>>2]|0;
     $57 = $56 & -16777217;
     HEAP32[$55>>2] = $57;
     $58 = $ctrl;
     $59 = HEAP32[$58>>2]|0;
     $60 = $59 | 16777216;
     HEAP32[$58>>2] = $60;
    }
   }
  }
 }
 $61 = $ctrl;
 $62 = HEAP32[$61>>2]|0;
 $63 = $62 & -33554433;
 HEAP32[$61>>2] = $63;
 $64 = (_getRungTrue()|0);
 $65 = $64 & 1;
 $66 = $65 << 25;
 $67 = $ctrl;
 $68 = HEAP32[$67>>2]|0;
 $69 = $68 | $66;
 HEAP32[$67>>2] = $69;
 $70 = $0;
 STACKTOP = sp;return ($70|0);
}
function _startTimer($timer,$exp) {
 $timer = $timer|0;
 $exp = $exp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ctrl = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $timer;
 $1 = $exp;
 $2 = $0;
 $ref = $2;
 $3 = $0;
 $4 = ((($3)) + 4|0);
 $ctrl = $4;
 $5 = $ctrl;
 $6 = HEAP32[$5>>2]|0;
 $7 = $6 & -67108865;
 HEAP32[$5>>2] = $7;
 $8 = $ctrl;
 $9 = HEAP32[$8>>2]|0;
 HEAP32[$8>>2] = $9;
 $10 = $ctrl;
 $11 = HEAP32[$10>>2]|0;
 $12 = $11 & -16777217;
 HEAP32[$10>>2] = $12;
 $13 = $ctrl;
 $14 = HEAP32[$13>>2]|0;
 HEAP32[$13>>2] = $14;
 $15 = $ctrl;
 $16 = HEAP32[$15>>2]|0;
 $17 = $16 & -268435457;
 HEAP32[$15>>2] = $17;
 $18 = $ctrl;
 $19 = HEAP32[$18>>2]|0;
 $20 = $19 | 268435456;
 HEAP32[$18>>2] = $20;
 $21 = $ctrl;
 $22 = HEAP32[$21>>2]|0;
 $23 = $22 & -16777216;
 HEAP32[$21>>2] = $23;
 $24 = $1;
 $25 = $24 & 16777215;
 $26 = $25 << 0;
 $27 = $ctrl;
 $28 = HEAP32[$27>>2]|0;
 $29 = $28 | $26;
 HEAP32[$27>>2] = $29;
 $30 = (_OS_getIntTick()|0);
 $31 = $ref;
 HEAP32[$31>>2] = $30;
 STACKTOP = sp;return 0;
}
function _timerCount($timer) {
 $timer = $timer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ctrl = 0, $curr_int_tick = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $timer;
 $2 = $1;
 $ref = $2;
 $3 = $1;
 $4 = ((($3)) + 4|0);
 $ctrl = $4;
 $5 = $ctrl;
 $6 = HEAP32[$5>>2]|0;
 $7 = $6 >>> 26;
 $8 = $7 & 1;
 $9 = ($8|0)==(0);
 if (!($9)) {
  $45 = $ref;
  $46 = HEAP32[$45>>2]|0;
  $0 = $46;
  $47 = $0;
  STACKTOP = sp;return ($47|0);
 }
 $10 = $ctrl;
 $11 = HEAP32[$10>>2]|0;
 $12 = $11 >>> 28;
 $13 = $12 & 1;
 $14 = ($13|0)==(1);
 if ($14) {
  $15 = $ctrl;
  $16 = HEAP32[$15>>2]|0;
  $17 = $16 >>> 24;
  $18 = $17 & 1;
  $19 = ($18|0)==(0);
  if ($19) {
   $20 = $ctrl;
   $21 = HEAP32[$20>>2]|0;
   $22 = $21 >>> 0;
   $23 = $22 & 16777215;
   $24 = ($23|0)!=(0);
   if ($24) {
    $25 = (_OS_getIntTick()|0);
    $curr_int_tick = $25;
    $26 = $ref;
    $27 = HEAP32[$26>>2]|0;
    $28 = $ctrl;
    $29 = HEAP32[$28>>2]|0;
    $30 = $29 >>> 0;
    $31 = $30 & 16777215;
    $32 = (($27) + ($31))|0;
    $33 = $curr_int_tick;
    $34 = ($32>>>0)<($33>>>0);
    if ($34) {
     $35 = $ctrl;
     $36 = HEAP32[$35>>2]|0;
     $37 = $36 & -16777217;
     HEAP32[$35>>2] = $37;
     $38 = $ctrl;
     $39 = HEAP32[$38>>2]|0;
     $40 = $39 | 16777216;
     HEAP32[$38>>2] = $40;
    }
   }
  }
 }
 $41 = (_OS_getIntTick()|0);
 $42 = $ref;
 $43 = HEAP32[$42>>2]|0;
 $44 = (($41) - ($43))|0;
 $0 = $44;
 $47 = $0;
 STACKTOP = sp;return ($47|0);
}
function _ladder_counter_reset($counter) {
 $counter = $counter|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ctrl = 0, $ref = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $counter;
 $1 = $0;
 $ref = $1;
 $2 = $0;
 $3 = ((($2)) + 4|0);
 $ctrl = $3;
 $4 = (_getRungTrue()|0);
 $5 = ($4|0)==(1);
 if (!($5)) {
  STACKTOP = sp;return 0;
 }
 $6 = $ref;
 HEAP32[$6>>2] = 0;
 $7 = $ctrl;
 $8 = HEAP32[$7>>2]|0;
 $9 = $8 & -16777217;
 HEAP32[$7>>2] = $9;
 $10 = $ctrl;
 $11 = HEAP32[$10>>2]|0;
 HEAP32[$10>>2] = $11;
 $12 = $ctrl;
 $13 = HEAP32[$12>>2]|0;
 $14 = $13 & -16777216;
 HEAP32[$12>>2] = $14;
 $15 = $ctrl;
 $16 = HEAP32[$15>>2]|0;
 HEAP32[$15>>2] = $16;
 STACKTOP = sp;return 0;
}
function _tm_cnt_expired($timer) {
 $timer = $timer|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ctrl = 0, $curr_int_tick = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $timer;
 $2 = $1;
 $ref = $2;
 $3 = $1;
 $4 = ((($3)) + 4|0);
 $ctrl = $4;
 $5 = $ctrl;
 $6 = HEAP32[$5>>2]|0;
 $7 = $6 >>> 26;
 $8 = $7 & 1;
 $9 = ($8|0)==(0);
 $10 = $ctrl;
 $11 = HEAP32[$10>>2]|0;
 if (!($9)) {
  $45 = $11 >>> 24;
  $46 = $45 & 1;
  $0 = $46;
  $47 = $0;
  STACKTOP = sp;return ($47|0);
 }
 $12 = $11 >>> 28;
 $13 = $12 & 1;
 $14 = ($13|0)==(1);
 if ($14) {
  $15 = $ctrl;
  $16 = HEAP32[$15>>2]|0;
  $17 = $16 >>> 24;
  $18 = $17 & 1;
  $19 = ($18|0)==(0);
  if ($19) {
   $20 = $ctrl;
   $21 = HEAP32[$20>>2]|0;
   $22 = $21 >>> 0;
   $23 = $22 & 16777215;
   $24 = ($23|0)!=(0);
   if ($24) {
    $25 = (_OS_getIntTick()|0);
    $curr_int_tick = $25;
    $26 = $ref;
    $27 = HEAP32[$26>>2]|0;
    $28 = $ctrl;
    $29 = HEAP32[$28>>2]|0;
    $30 = $29 >>> 0;
    $31 = $30 & 16777215;
    $32 = (($27) + ($31))|0;
    $33 = $curr_int_tick;
    $34 = ($32>>>0)<($33>>>0);
    if ($34) {
     $35 = $ctrl;
     $36 = HEAP32[$35>>2]|0;
     $37 = $36 & -16777217;
     HEAP32[$35>>2] = $37;
     $38 = $ctrl;
     $39 = HEAP32[$38>>2]|0;
     $40 = $39 | 16777216;
     HEAP32[$38>>2] = $40;
    }
   }
  }
 }
 $41 = $ctrl;
 $42 = HEAP32[$41>>2]|0;
 $43 = $42 >>> 24;
 $44 = $43 & 1;
 $0 = $44;
 $47 = $0;
 STACKTOP = sp;return ($47|0);
}
function _ladder_count_up($counter,$exp) {
 $counter = $counter|0;
 $exp = $exp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $ctrl = 0, $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $counter;
 $2 = $exp;
 $3 = $1;
 $ref = $3;
 $4 = $1;
 $5 = ((($4)) + 4|0);
 $ctrl = $5;
 $6 = $ctrl;
 $7 = HEAP32[$6>>2]|0;
 $8 = $7 & -67108865;
 HEAP32[$6>>2] = $8;
 $9 = $ctrl;
 $10 = HEAP32[$9>>2]|0;
 $11 = $10 | 67108864;
 HEAP32[$9>>2] = $11;
 $12 = $ctrl;
 $13 = HEAP32[$12>>2]|0;
 $14 = $13 >>> 25;
 $15 = $14 & 1;
 $16 = ($15|0)==(0);
 if ($16) {
  $17 = (_getRungTrue()|0);
  $18 = ($17|0)==(1);
  if ($18) {
   $19 = $ref;
   $20 = HEAP32[$19>>2]|0;
   $21 = (($20) + 1)|0;
   $22 = $ref;
   HEAP32[$22>>2] = $21;
   $23 = $ctrl;
   $24 = HEAP32[$23>>2]|0;
   $25 = $24 & -16777216;
   HEAP32[$23>>2] = $25;
   $26 = $2;
   $27 = $26 & 16777215;
   $28 = $27 << 0;
   $29 = $ctrl;
   $30 = HEAP32[$29>>2]|0;
   $31 = $30 | $28;
   HEAP32[$29>>2] = $31;
   $32 = $ctrl;
   $33 = HEAP32[$32>>2]|0;
   $34 = $33 >>> 24;
   $35 = $34 & 1;
   $36 = ($35|0)==(0);
   if ($36) {
    $37 = $ref;
    $38 = HEAP32[$37>>2]|0;
    $39 = $ctrl;
    $40 = HEAP32[$39>>2]|0;
    $41 = $40 >>> 0;
    $42 = $41 & 16777215;
    $43 = ($38>>>0)>=($42>>>0);
    if ($43) {
     $44 = $ctrl;
     $45 = HEAP32[$44>>2]|0;
     $46 = $45 & -16777217;
     HEAP32[$44>>2] = $46;
     $47 = $ctrl;
     $48 = HEAP32[$47>>2]|0;
     $49 = $48 | 16777216;
     HEAP32[$47>>2] = $49;
    }
   }
  }
 }
 $50 = $ctrl;
 $51 = HEAP32[$50>>2]|0;
 $52 = $51 & -33554433;
 HEAP32[$50>>2] = $52;
 $53 = (_getRungTrue()|0);
 $54 = $53 & 1;
 $55 = $54 << 25;
 $56 = $ctrl;
 $57 = HEAP32[$56>>2]|0;
 $58 = $57 | $55;
 HEAP32[$56>>2] = $58;
 $59 = $0;
 STACKTOP = sp;return ($59|0);
}
function _ladder_count_down($counter,$exp) {
 $counter = $counter|0;
 $exp = $exp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ctrl = 0, $exp_int = 0;
 var $ref = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $counter;
 $2 = $exp;
 $3 = $1;
 $ref = $3;
 $4 = $1;
 $5 = ((($4)) + 4|0);
 $ctrl = $5;
 $6 = $ctrl;
 $7 = HEAP32[$6>>2]|0;
 $8 = $7 & -67108865;
 HEAP32[$6>>2] = $8;
 $9 = $ctrl;
 $10 = HEAP32[$9>>2]|0;
 $11 = $10 | 67108864;
 HEAP32[$9>>2] = $11;
 $12 = $ctrl;
 $13 = HEAP32[$12>>2]|0;
 $14 = $13 >>> 27;
 $15 = $14 & 1;
 $16 = ($15|0)==(0);
 if ($16) {
  $17 = (_getRungTrue()|0);
  $18 = ($17|0)==(1);
  if ($18) {
   $19 = $ref;
   $20 = HEAP32[$19>>2]|0;
   $21 = (($20) - 1)|0;
   $22 = $ref;
   HEAP32[$22>>2] = $21;
   $23 = $ctrl;
   $24 = HEAP32[$23>>2]|0;
   $25 = $24 & -16777216;
   HEAP32[$23>>2] = $25;
   $26 = $2;
   $27 = $26 & 16777215;
   $28 = $27 << 0;
   $29 = $ctrl;
   $30 = HEAP32[$29>>2]|0;
   $31 = $30 | $28;
   HEAP32[$29>>2] = $31;
   $32 = $ctrl;
   $33 = HEAP32[$32>>2]|0;
   $34 = $33 >>> 24;
   $35 = $34 & 1;
   $36 = ($35|0)==(0);
   if ($36) {
    $37 = $2;
    $exp_int = $37;
    $38 = $ref;
    $39 = HEAP32[$38>>2]|0;
    $40 = $exp_int;
    $41 = ($39|0)<=($40|0);
    if ($41) {
     $42 = $ctrl;
     $43 = HEAP32[$42>>2]|0;
     $44 = $43 & -16777217;
     HEAP32[$42>>2] = $44;
     $45 = $ctrl;
     $46 = HEAP32[$45>>2]|0;
     $47 = $46 | 16777216;
     HEAP32[$45>>2] = $47;
    }
   }
  }
 }
 $48 = $ctrl;
 $49 = HEAP32[$48>>2]|0;
 $50 = $49 & -134217729;
 HEAP32[$48>>2] = $50;
 $51 = (_getRungTrue()|0);
 $52 = $51 & 1;
 $53 = $52 << 27;
 $54 = $ctrl;
 $55 = HEAP32[$54>>2]|0;
 $56 = $55 | $53;
 HEAP32[$54>>2] = $56;
 $57 = $0;
 STACKTOP = sp;return ($57|0);
}
function _nst_F_COS($val,$prev) {
 $val = $val|0;
 $prev = $prev|0;
 var $$ = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $stat = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val;
 $1 = $prev;
 $stat = 0;
 $2 = $0;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = ($2|0)!=($4|0);
 $$ = $5 ? 1 : 0;
 $stat = $$;
 $6 = $0;
 $7 = $1;
 HEAP32[$7>>2] = $6;
 $8 = $stat;
 STACKTOP = sp;return ($8|0);
}
function _nst_R_TRIG($val,$prev) {
 $val = $val|0;
 $prev = $prev|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $val;
 $2 = $prev;
 $3 = $1;
 $4 = $2;
 $5 = (_nst_F_COS($3,$4)|0);
 $6 = ($5|0)==(1);
 $7 = $1;
 $8 = ($7|0)==(1);
 $or$cond = $6 & $8;
 if ($or$cond) {
  $0 = 1;
 } else {
  $0 = 0;
 }
 $9 = $0;
 STACKTOP = sp;return ($9|0);
}
function _nst_F_TRIG($val,$prev) {
 $val = $val|0;
 $prev = $prev|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $val;
 $2 = $prev;
 $3 = $1;
 $4 = $2;
 $5 = (_nst_F_COS($3,$4)|0);
 $6 = ($5|0)==(1);
 $7 = $1;
 $8 = ($7|0)==(0);
 $or$cond = $6 & $8;
 if ($or$cond) {
  $0 = 1;
 } else {
  $0 = 0;
 }
 $9 = $0;
 STACKTOP = sp;return ($9|0);
}
function _nst_extract_bits($val,$offset,$len) {
 $val = $val|0;
 $offset = $offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val;
 $1 = $offset;
 $2 = $len;
 $3 = $0;
 $4 = $1;
 $5 = $3 >>> $4;
 $6 = $2;
 $7 = 1 << $6;
 $8 = (($7) - 1)|0;
 $9 = $5 & $8;
 STACKTOP = sp;return ($9|0);
}
function _nst_set_bits($val_curr,$offset,$len,$val_to_set) {
 $val_curr = $val_curr|0;
 $offset = $offset|0;
 $len = $len|0;
 $val_to_set = $val_to_set|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $mask = 0, $tmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val_curr;
 $1 = $offset;
 $2 = $len;
 $3 = $val_to_set;
 $4 = $0;
 $tmp = $4;
 $5 = $2;
 $6 = 1 << $5;
 $7 = (($6) - 1)|0;
 $8 = $7 ^ -1;
 $mask = $8;
 $9 = $mask;
 $10 = $1;
 $11 = $9 << $10;
 $12 = $mask;
 $13 = $1;
 $14 = (32 - ($13))|0;
 $15 = $12 >>> $14;
 $16 = $11 | $15;
 $mask = $16;
 $17 = $mask;
 $18 = $tmp;
 $19 = $18 & $17;
 $tmp = $19;
 $20 = $3;
 $21 = $2;
 $22 = 1 << $21;
 $23 = (($22) - 1)|0;
 $24 = $20 & $23;
 $25 = $1;
 $26 = $24 << $25;
 $27 = $tmp;
 $28 = $27 | $26;
 $tmp = $28;
 $29 = $tmp;
 STACKTOP = sp;return ($29|0);
}
function _updateStatusRegs($stop_prog,$exception_detected) {
 $stop_prog = $stop_prog|0;
 $exception_detected = $exception_detected|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $plc_connected = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $stop_prog;
 $1 = $exception_detected;
 $2 = HEAP32[524300>>2]|0;
 $3 = $2 & 1;
 $plc_connected = $3;
 $4 = $0;
 $5 = $4 << 1;
 $6 = 83886080 | $5;
 $7 = $1;
 $8 = $7 << 2;
 $9 = $6 | $8;
 $10 = $plc_connected;
 $11 = $10 << 0;
 $12 = $9 | $11;
 HEAP32[524300>>2] = $12;
 _syncIO(0);
 STACKTOP = sp;return;
}
function _syncIO($sync_type) {
 $sync_type = $sync_type|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0;
 var $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0;
 var $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0;
 var $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0;
 var $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $data_dir = 0, $i = 0, $j = 0, $long_dst = 0, $long_src = 0;
 var $num_bytes = 0, $num_map_elem = 0, $num_segm = 0, $offset = 0, $or$cond = 0, $or$cond11 = 0, $or$cond3 = 0, $or$cond5 = 0, $or$cond7 = 0, $or$cond9 = 0, $ptr = 0, $segm = 0, $segm_ptr = 0, $segm_tp = 0, $size = 0, $tmp1 = 0, $tmp2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $data_dir = sp + 44|0;
 $size = sp + 36|0;
 $0 = $sync_type;
 $1 = HEAP16[658610>>1]|0;
 $2 = $1&65535;
 $3 = HEAP32[524296>>2]|0;
 $4 = (($3) + ($2)|0);
 $ptr = $4;
 $offset = 0;
 $5 = $0;
 $6 = ($5|0)==(2);
 if ($6) {
  _memset((658624|0),-1,192)|0;
  HEAP16[527008>>1] = -1;
 }
 $7 = $offset;
 $8 = $ptr;
 $9 = (($8) + ($7)|0);
 $10 = HEAP8[$9>>0]|0;
 $11 = $10&255;
 $num_segm = $11;
 $12 = $offset;
 $13 = (($12) + 1)|0;
 $offset = $13;
 $i = 0;
 while(1) {
  $14 = $i;
  $15 = $num_segm;
  $16 = ($14>>>0)<($15>>>0);
  if (!($16)) {
   break;
  }
  $17 = $offset;
  $18 = $ptr;
  $19 = (($18) + ($17)|0);
  $20 = (_LE_UINT32_GET($19)|0);
  $segm = $20;
  $21 = $offset;
  $22 = (($21) + 4)|0;
  $offset = $22;
  $23 = $offset;
  $24 = $ptr;
  $25 = (($24) + ($23)|0);
  $26 = HEAP8[$25>>0]|0;
  $27 = $26&255;
  $num_map_elem = $27;
  $28 = $offset;
  $29 = (($28) + 1)|0;
  $offset = $29;
  $30 = $segm;
  $31 = (_getSegmentPointer($30,$data_dir,$size)|0);
  $segm_ptr = $31;
  $32 = $0;
  $33 = ($32|0)==(2);
  if ($33) {
   $34 = $segm;
   $35 = $34&255;
   $segm_tp = $35;
   $36 = $segm;
   $37 = $36 >>> 24;
   $38 = $37 & 255;
   $39 = $38&255;
   $segm_tp = $39;
   $40 = $segm;
   $41 = $40 >>> 16;
   $42 = $41 & 255;
   $43 = $42&255;
   $tmp1 = $43;
   $44 = $segm;
   $45 = $44 >>> 8;
   $46 = $45 & 255;
   $47 = $46&255;
   $tmp2 = $47;
   $48 = $segm_tp;
   $49 = $48&255;
   $50 = ($49|0)==(1);
   if ($50) {
    $51 = $tmp1;
    $52 = $51&255;
    $53 = ($52|0)==(0);
    if ($53) {
     $54 = $offset;
     $55 = $num_map_elem;
     $56 = $55 << 10;
     $57 = $54 | $56;
     $58 = $57&65535;
     HEAP16[527008>>1] = $58;
    }
   }
  }
  $59 = $0;
  $60 = ($59|0)==(2);
  if ($60) {
   $61 = HEAP8[1184388>>0]|0;
   $62 = $61&255;
   $63 = ($62|0)!=(255);
   if ($63) {
    $64 = $offset;
    $65 = $num_map_elem;
    $66 = $65 << 10;
    $67 = $64 | $66;
    $68 = $67&65535;
    $69 = HEAP8[1184388>>0]|0;
    $70 = $69&255;
    $71 = ($70*3)|0;
    $72 = HEAP8[1184389>>0]|0;
    $73 = $72&255;
    $74 = (($71) + ($73))|0;
    $75 = (658624 + ($74<<1)|0);
    HEAP16[$75>>1] = $68;
   }
  }
  $j = 0;
  while(1) {
   $76 = $j;
   $77 = $num_map_elem;
   $78 = ($76>>>0)<($77>>>0);
   if (!($78)) {
    break;
   }
   $79 = $offset;
   $80 = $ptr;
   $81 = (($80) + ($79)|0);
   $82 = HEAP8[$81>>0]|0;
   $long_dst = $82;
   $83 = $offset;
   $84 = (($83) + 1)|0;
   $offset = $84;
   $85 = $offset;
   $86 = $ptr;
   $87 = (($86) + ($85)|0);
   $88 = HEAP8[$87>>0]|0;
   $long_src = $88;
   $89 = $offset;
   $90 = (($89) + 1)|0;
   $offset = $90;
   $91 = $offset;
   $92 = $ptr;
   $93 = (($92) + ($91)|0);
   $94 = HEAP8[$93>>0]|0;
   $num_bytes = $94;
   $95 = $offset;
   $96 = (($95) + 1)|0;
   $offset = $96;
   $97 = HEAP8[$data_dir>>0]|0;
   $98 = $97&255;
   $99 = ($98|0)==(1);
   $100 = $0;
   $101 = ($100|0)==(1);
   $or$cond = $99 & $101;
   do {
    if ($or$cond) {
     $102 = $long_src;
     $103 = $102&255;
     $104 = $103<<2;
     $105 = $segm_ptr;
     $106 = (($105) + ($104)|0);
     $107 = $long_dst;
     $108 = $107&255;
     $109 = (8 + ($108<<2)|0);
     $110 = $num_bytes;
     $111 = $110&255;
     $112 = HEAP16[$size>>1]|0;
     $113 = $112&65535;
     $114 = $long_src;
     $115 = $114&255;
     $116 = $115<<2;
     $117 = (($113) - ($116))|0;
     $118 = ($111|0)<($117|0);
     if ($118) {
      $119 = $num_bytes;
      $120 = $119&255;
      $127 = $120;
     } else {
      $121 = HEAP16[$size>>1]|0;
      $122 = $121&65535;
      $123 = $long_src;
      $124 = $123&255;
      $125 = $124<<2;
      $126 = (($122) - ($125))|0;
      $127 = $126;
     }
     _memcpy(($106|0),($109|0),($127|0))|0;
    } else {
     $128 = HEAP8[$data_dir>>0]|0;
     $129 = $128&255;
     $130 = ($129|0)==(0);
     $131 = $0;
     $132 = ($131|0)==(0);
     $or$cond3 = $130 & $132;
     if ($or$cond3) {
      $133 = $long_dst;
      $134 = $133&255;
      $135 = (8 + ($134<<2)|0);
      $136 = $long_src;
      $137 = $136&255;
      $138 = $137<<2;
      $139 = $segm_ptr;
      $140 = (($139) + ($138)|0);
      $141 = $num_bytes;
      $142 = $141&255;
      $143 = HEAP16[$size>>1]|0;
      $144 = $143&65535;
      $145 = $long_src;
      $146 = $145&255;
      $147 = $146<<2;
      $148 = (($144) - ($147))|0;
      $149 = ($142|0)<($148|0);
      if ($149) {
       $150 = $num_bytes;
       $151 = $150&255;
       $158 = $151;
      } else {
       $152 = HEAP16[$size>>1]|0;
       $153 = $152&65535;
       $154 = $long_src;
       $155 = $154&255;
       $156 = $155<<2;
       $157 = (($153) - ($156))|0;
       $158 = $157;
      }
      _memcpy(($135|0),($140|0),($158|0))|0;
      break;
     }
     $159 = HEAP8[$data_dir>>0]|0;
     $160 = $159&255;
     $161 = ($160|0)==(2);
     $162 = $0;
     $163 = ($162|0)==(1);
     $or$cond5 = $161 & $163;
     if ($or$cond5) {
      $164 = $segm_ptr;
      $165 = ($164|0)!=(0|0);
      if (!($165)) {
       break;
      }
      $166 = $long_src;
      $167 = $166&255;
      $168 = $167<<2;
      $169 = $segm_ptr;
      $170 = (($169) + ($168)|0);
      $171 = $long_dst;
      $172 = $171&255;
      $173 = (8 + ($172<<2)|0);
      $174 = $num_bytes;
      $175 = $174&255;
      $176 = (($175|0) / 4)&-1;
      (_compare_and_copy($170,$173,$176)|0);
      break;
     }
     $177 = HEAP8[$data_dir>>0]|0;
     $178 = $177&255;
     $179 = ($178|0)==(2);
     $180 = $0;
     $181 = ($180|0)==(3);
     $or$cond7 = $179 & $181;
     if ($or$cond7) {
      $182 = $segm_ptr;
      $183 = ($182|0)!=(0|0);
      if (!($183)) {
       break;
      }
      $184 = $long_src;
      $185 = $184&255;
      $186 = $185<<2;
      $187 = $segm_ptr;
      $188 = (($187) + ($186)|0);
      $189 = $long_dst;
      $190 = $189&255;
      $191 = (8 + ($190<<2)|0);
      $192 = $num_bytes;
      $193 = $192&255;
      _memcpy(($188|0),($191|0),($193|0))|0;
      break;
     } else {
      $194 = HEAP8[$data_dir>>0]|0;
      $195 = $194&255;
      $196 = ($195|0)==(2);
      $197 = $0;
      $198 = ($197|0)==(2);
      $or$cond9 = $196 & $198;
      $199 = $segm_ptr;
      $200 = ($199|0)!=(0|0);
      $or$cond11 = $or$cond9 & $200;
      if (!($or$cond11)) {
       break;
      }
      $201 = $long_dst;
      $202 = $201&255;
      $203 = (8 + ($202<<2)|0);
      $204 = $long_src;
      $205 = $204&255;
      $206 = $205<<2;
      $207 = $segm_ptr;
      $208 = (($207) + ($206)|0);
      $209 = $num_bytes;
      $210 = $209&255;
      _memcpy(($203|0),($208|0),($210|0))|0;
      break;
     }
    }
   } while(0);
   $211 = $j;
   $212 = (($211) + 1)|0;
   $j = $212;
  }
  $213 = $i;
  $214 = (($213) + 1)|0;
  $i = $214;
 }
 STACKTOP = sp;return;
}
function _getSegmentPointer($segm,$dir,$size) {
 $segm = $segm|0;
 $dir = $dir|0;
 $size = $size|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $ptr = 0;
 var $segm_tp = 0, $tmp1 = 0, $tmp2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $segm;
 $1 = $dir;
 $2 = $size;
 $3 = $0;
 $4 = $3 >>> 24;
 $5 = $4 & 255;
 $6 = $5&255;
 $segm_tp = $6;
 $7 = $0;
 $8 = $7 >>> 16;
 $9 = $8 & 255;
 $10 = $9&255;
 $tmp1 = $10;
 $11 = $0;
 $12 = $11 >>> 8;
 $13 = $12 & 255;
 $14 = $13&255;
 $tmp2 = $14;
 HEAP8[1184388>>0] = -1;
 $15 = $segm_tp;
 $16 = $15&255;
 switch ($16|0) {
 case 0:  {
  $17 = $tmp1;
  HEAP8[1184388>>0] = $17;
  $18 = $tmp2;
  HEAP8[1184389>>0] = $18;
  $19 = $tmp2;
  $20 = $19&255;
  switch ($20|0) {
  case 0:  {
   $21 = $tmp1;
   $22 = $21&255;
   $23 = (527010 + (($22*2056)|0)|0);
   $ptr = $23;
   $24 = $tmp1;
   $25 = $24&255;
   $26 = (527010 + (($25*2056)|0)|0);
   $27 = ((($26)) + 2048|0);
   $28 = HEAP16[$27>>1]|0;
   $29 = $28&65535;
   $30 = (($29) + 7)|0;
   $31 = (($30|0) / 8)&-1;
   $32 = $31&65535;
   $33 = $2;
   HEAP16[$33>>1] = $32;
   break;
  }
  case 1:  {
   $34 = $tmp1;
   $35 = $34&255;
   $36 = (527010 + (($35*2056)|0)|0);
   $37 = ((($36)) + 512|0);
   $ptr = $37;
   $38 = $tmp1;
   $39 = $38&255;
   $40 = (527010 + (($39*2056)|0)|0);
   $41 = ((($40)) + 2050|0);
   $42 = HEAP16[$41>>1]|0;
   $43 = $42&65535;
   $44 = (($43) + 7)|0;
   $45 = (($44|0) / 8)&-1;
   $46 = $45&65535;
   $47 = $2;
   HEAP16[$47>>1] = $46;
   break;
  }
  case 2:  {
   $48 = $tmp1;
   $49 = $48&255;
   $50 = (527010 + (($49*2056)|0)|0);
   $51 = ((($50)) + 1024|0);
   $ptr = $51;
   $52 = $tmp1;
   $53 = $52&255;
   $54 = (527010 + (($53*2056)|0)|0);
   $55 = ((($54)) + 2052|0);
   $56 = HEAP16[$55>>1]|0;
   $57 = $56&65535;
   $58 = (($57) + 7)|0;
   $59 = (($58|0) / 8)&-1;
   $60 = $59&65535;
   $61 = $2;
   HEAP16[$61>>1] = $60;
   break;
  }
  case 3:  {
   $62 = $tmp1;
   $63 = $62&255;
   $64 = (527010 + (($63*2056)|0)|0);
   $65 = ((($64)) + 1536|0);
   $ptr = $65;
   $66 = $tmp1;
   $67 = $66&255;
   $68 = (527010 + (($67*2056)|0)|0);
   $69 = ((($68)) + 2054|0);
   $70 = HEAP16[$69>>1]|0;
   $71 = $70&65535;
   $72 = (($71) + 7)|0;
   $73 = (($72|0) / 8)&-1;
   $74 = $73&65535;
   $75 = $2;
   HEAP16[$75>>1] = $74;
   break;
  }
  default: {
  }
  }
  $76 = $tmp2;
  $77 = $76&255;
  $78 = (1184382 + ($77)|0);
  $79 = HEAP8[$78>>0]|0;
  $80 = $1;
  HEAP8[$80>>0] = $79;
  $98 = $ptr;
  STACKTOP = sp;return ($98|0);
  break;
 }
 case 1:  {
  $81 = $tmp1;
  $82 = $81&255;
  $83 = (524716 + ($82<<2)|0);
  $84 = HEAP32[$83>>2]|0;
  $ptr = $84;
  $85 = $2;
  HEAP16[$85>>1] = 256;
  $86 = $tmp1;
  $87 = $86&255;
  $88 = (1184386 + ($87)|0);
  $89 = HEAP8[$88>>0]|0;
  $90 = $1;
  HEAP8[$90>>0] = $89;
  $98 = $ptr;
  STACKTOP = sp;return ($98|0);
  break;
 }
 case 2:  {
  $ptr = 525824;
  $91 = $ptr;
  $92 = ((($91)) + 8|0);
  $ptr = $92;
  $93 = $2;
  HEAP16[$93>>1] = 256;
  $94 = $1;
  HEAP8[$94>>0] = 2;
  $98 = $ptr;
  STACKTOP = sp;return ($98|0);
  break;
 }
 case 3:  {
  $ptr = 524300;
  $95 = $2;
  HEAP16[$95>>1] = 4;
  $96 = $1;
  HEAP8[$96>>0] = 0;
  $98 = $ptr;
  STACKTOP = sp;return ($98|0);
  break;
 }
 default: {
  $97 = $2;
  HEAP16[$97>>1] = 0;
  $ptr = 0;
  $98 = $ptr;
  STACKTOP = sp;return ($98|0);
 }
 }
 return (0)|0;
}
function _compare_and_copy($dst,$src,$num_elems) {
 $dst = $dst|0;
 $src = $src|0;
 $num_elems = $num_elems|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $3 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $dst;
 $2 = $src;
 $3 = $num_elems;
 $i = 0;
 while(1) {
  $4 = $i;
  $5 = $3;
  $6 = ($4|0)<($5|0);
  if (!($6)) {
   label = 6;
   break;
  }
  $7 = $i;
  $8 = $1;
  $9 = (($8) + ($7<<2)|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = $i;
  $12 = $2;
  $13 = (($12) + ($11<<2)|0);
  $14 = HEAP32[$13>>2]|0;
  $15 = ($10|0)!=($14|0);
  $16 = $i;
  if ($15) {
   label = 4;
   break;
  }
  $24 = (($16) + 1)|0;
  $i = $24;
 }
 if ((label|0) == 4) {
  $17 = $1;
  $18 = (($17) + ($16<<2)|0);
  $19 = $i;
  $20 = $2;
  $21 = (($20) + ($19<<2)|0);
  $22 = $3;
  $23 = $22<<2;
  _memcpy(($18|0),($21|0),($23|0))|0;
  $0 = 0;
  $25 = $0;
  STACKTOP = sp;return ($25|0);
 }
 else if ((label|0) == 6) {
  $0 = 1;
  $25 = $0;
  STACKTOP = sp;return ($25|0);
 }
 return (0)|0;
}
function _nst_InpArrGet($slot,$arr,$comb_offset,$len) {
 $slot = $slot|0;
 $arr = $arr|0;
 $comb_offset = $comb_offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $8 = 0, $9 = 0, $arr_offset = 0, $arr_ptr = 0, $arr_size = 0, $io_offset = 0, $ptr = 0;
 var $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $arr;
 $3 = $comb_offset;
 $4 = $len;
 $5 = $3;
 $6 = $5 >>> 16;
 $7 = $6 & 65535;
 $8 = $7&65535;
 $arr_offset = $8;
 $9 = $3;
 $10 = $9 >>> 0;
 $11 = $10 & 65535;
 $12 = $11&65535;
 $io_offset = $12;
 $13 = $2;
 $14 = HEAP32[$13>>2]|0;
 $15 = $14 & 65535;
 $16 = $15&65535;
 $arr_size = $16;
 $17 = $2;
 $18 = ((($17)) + 4|0);
 $arr_ptr = $18;
 $19 = $arr_offset;
 $20 = $19&65535;
 $21 = $4;
 $22 = (($20) + ($21))|0;
 $23 = $arr_size;
 $24 = $23&65535;
 $25 = ($22|0)>($24|0);
 if ($25) {
  $26 = HEAP32[524296>>2]|0;
  $27 = $26;
  $28 = (_ARGEE_sim_ARGEE_returnErr_imp($27,0)|0);
  $0 = $28;
  $74 = $0;
  STACKTOP = sp;return ($74|0);
 }
 $29 = $1;
 $30 = HEAP32[524304>>2]|0;
 $31 = ($29|0)<($30|0);
 if (!($31)) {
  $71 = HEAP32[524296>>2]|0;
  $72 = $71;
  $73 = (_ARGEE_sim_ARGEE_returnErr_imp($72,0)|0);
  $0 = $73;
  $74 = $0;
  STACKTOP = sp;return ($74|0);
 }
 $32 = $1;
 $33 = (527010 + (($32*2056)|0)|0);
 $ptr = $33;
 $34 = $1;
 $35 = (527010 + (($34*2056)|0)|0);
 $36 = ((($35)) + 2048|0);
 $37 = HEAP16[$36>>1]|0;
 $size_in_bits = $37;
 $38 = $size_in_bits;
 $39 = $38&65535;
 $40 = (($39) + 7)|0;
 $41 = $40 >> 3;
 $42 = $41&65535;
 $size_in_bytes = $42;
 $43 = $io_offset;
 $44 = $43&65535;
 $45 = $size_in_bytes;
 $46 = $45 << 16 >> 16;
 $47 = (($46) - ($44))|0;
 $48 = $47&65535;
 $size_in_bytes = $48;
 $49 = $size_in_bytes;
 $50 = $49 << 16 >> 16;
 $51 = ($50|0)<(0);
 if ($51) {
  $52 = HEAP32[524296>>2]|0;
  $53 = $52;
  $54 = (_ARGEE_sim_ARGEE_returnErr_imp($53,0)|0);
  $0 = $54;
  $74 = $0;
  STACKTOP = sp;return ($74|0);
 } else {
  $55 = $arr_offset;
  $56 = $55&65535;
  $57 = $arr_ptr;
  $58 = (($57) + ($56)|0);
  $59 = $io_offset;
  $60 = $59&65535;
  $61 = $ptr;
  $62 = (($61) + ($60)|0);
  $63 = $4;
  $64 = $size_in_bytes;
  $65 = $64 << 16 >> 16;
  $66 = ($63|0)<($65|0);
  $67 = $4;
  $68 = $size_in_bytes;
  $69 = $68 << 16 >> 16;
  $70 = $66 ? $67 : $69;
  _memcpy(($58|0),($62|0),($70|0))|0;
  $0 = 0;
  $74 = $0;
  STACKTOP = sp;return ($74|0);
 }
 return (0)|0;
}
function _nst_OutpArrSet($slot,$arr,$comb_offset,$len) {
 $slot = $slot|0;
 $arr = $arr|0;
 $comb_offset = $comb_offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $arr_offset = 0, $arr_ptr = 0, $arr_size = 0, $io_offset = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $arr;
 $3 = $comb_offset;
 $4 = $len;
 $5 = $3;
 $6 = $5 >>> 16;
 $7 = $6 & 65535;
 $8 = $7&65535;
 $arr_offset = $8;
 $9 = $3;
 $10 = $9 >>> 0;
 $11 = $10 & 65535;
 $12 = $11&65535;
 $io_offset = $12;
 $13 = $2;
 $14 = HEAP32[$13>>2]|0;
 $15 = $14 & 65535;
 $16 = $15&65535;
 $arr_size = $16;
 $17 = $2;
 $18 = ((($17)) + 4|0);
 $arr_ptr = $18;
 $19 = $arr_offset;
 $20 = $19&65535;
 $21 = $4;
 $22 = (($20) + ($21))|0;
 $23 = $arr_size;
 $24 = $23&65535;
 $25 = ($22|0)>($24|0);
 if ($25) {
  $26 = HEAP32[524296>>2]|0;
  $27 = $26;
  $28 = (_ARGEE_sim_ARGEE_returnErr_imp($27,0)|0);
  $0 = $28;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 }
 $29 = $1;
 $30 = HEAP32[524304>>2]|0;
 $31 = ($29|0)<($30|0);
 if (!($31)) {
  $45 = HEAP32[524296>>2]|0;
  $46 = $45;
  $47 = (_ARGEE_sim_ARGEE_returnErr_imp($46,0)|0);
  $0 = $47;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 }
 $32 = $1;
 $33 = $io_offset;
 $34 = $33&65535;
 $35 = $4;
 $36 = $arr_ptr;
 $37 = $arr_offset;
 $38 = $37&65535;
 $39 = $4;
 $40 = (_setARGEE_VarArr($32,$34,$35,$36,$38,$39)|0);
 $41 = ($40|0)==(-1);
 if ($41) {
  $42 = HEAP32[524296>>2]|0;
  $43 = $42;
  $44 = (_ARGEE_sim_ARGEE_returnErr_imp($43,0)|0);
  $0 = $44;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 } else {
  $0 = 0;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 }
 return (0)|0;
}
function _setARGEE_VarArr($slot,$io_offset,$byte_len,$arr_ptr,$arr_offset,$len) {
 $slot = $slot|0;
 $io_offset = $io_offset|0;
 $byte_len = $byte_len|0;
 $arr_ptr = $arr_ptr|0;
 $arr_offset = $arr_offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $14 = 0, $15 = 0, $16 = 0;
 var $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0;
 var $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0;
 var $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0;
 var $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0;
 var $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $argee_var_addr = 0, $argee_var_addr_final = 0, $curr_io_elem_enc = 0, $curr_io_elem_ptr = 0, $curr_io_offset = 0, $i2 = 0, $io_arr_offset = 0, $io_offset_long = 0, $io_start = 0;
 var $io_var_addr = 0, $long_offset = 0, $map_start = 0, $num_bytes = 0, $num_intersect_bytes = 0, $num_io_elems = 0, $ptr = 0, $ptr1 = 0, $sect = 0, $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 96|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $io_start = sp + 16|0;
 $map_start = sp + 12|0;
 $num_intersect_bytes = sp + 8|0;
 $1 = $slot;
 $2 = $io_offset;
 $3 = $byte_len;
 $4 = $arr_ptr;
 $5 = $arr_offset;
 $6 = $len;
 $7 = $1;
 $8 = HEAP32[524304>>2]|0;
 $9 = ($7|0)>=($8|0);
 if ($9) {
  $0 = -1;
  $130 = $0;
  STACKTOP = sp;return ($130|0);
 }
 $10 = $2;
 $11 = (($10|0) / 4)&-1;
 $long_offset = $11;
 $12 = $1;
 $13 = (527010 + (($12*2056)|0)|0);
 $14 = ((($13)) + 512|0);
 $ptr = $14;
 $15 = $1;
 $16 = (527010 + (($15*2056)|0)|0);
 $17 = ((($16)) + 2050|0);
 $18 = HEAP16[$17>>1]|0;
 $size_in_bits = $18;
 $19 = $size_in_bits;
 $20 = $19&65535;
 $21 = (($20) + 7)|0;
 $22 = $21 >> 3;
 $23 = $22&65535;
 $size_in_bytes = $23;
 $24 = $2;
 $25 = $size_in_bytes;
 $26 = $25&65535;
 $27 = (($26) - ($24))|0;
 $28 = $27&65535;
 $size_in_bytes = $28;
 $29 = $size_in_bytes;
 $30 = $29&65535;
 $31 = ($30|0)<(0);
 if ($31) {
  $0 = -1;
  $130 = $0;
  STACKTOP = sp;return ($130|0);
 }
 $32 = $2;
 $33 = $ptr;
 $34 = (($33) + ($32)|0);
 $35 = $5;
 $36 = $4;
 $37 = (($36) + ($35)|0);
 $38 = $6;
 $39 = $size_in_bytes;
 $40 = $39&65535;
 $41 = ($38|0)<($40|0);
 $42 = $6;
 $43 = $size_in_bytes;
 $44 = $43&65535;
 $45 = $41 ? $42 : $44;
 _memcpy(($34|0),($37|0),($45|0))|0;
 $sect = 1;
 $46 = $1;
 $47 = ($46*3)|0;
 $48 = $sect;
 $49 = (($47) + ($48))|0;
 $50 = (658624 + ($49<<1)|0);
 $51 = HEAP16[$50>>1]|0;
 $curr_io_elem_enc = $51;
 $52 = HEAP16[658610>>1]|0;
 $53 = $52&65535;
 $54 = HEAP32[524296>>2]|0;
 $55 = (($54) + ($53)|0);
 $ptr1 = $55;
 $56 = $curr_io_elem_enc;
 $57 = $56&65535;
 $58 = $57 & 1023;
 $59 = $58&65535;
 $curr_io_elem_ptr = $59;
 $60 = $curr_io_elem_enc;
 $61 = $60&65535;
 $62 = $61 >> 10;
 $63 = $62 & 63;
 $64 = $63&255;
 $num_io_elems = $64;
 $65 = $2;
 $66 = (($65|0) / 4)&-1;
 $io_offset_long = $66;
 $67 = $2;
 $curr_io_offset = $67;
 $68 = $curr_io_elem_enc;
 $69 = $68&65535;
 $70 = ($69|0)==(65535);
 if ($70) {
  $0 = 0;
  $130 = $0;
  STACKTOP = sp;return ($130|0);
 }
 $i2 = 0;
 while(1) {
  $71 = $i2;
  $72 = $num_io_elems;
  $73 = $72&255;
  $74 = ($71|0)<($73|0);
  if (!($74)) {
   break;
  }
  $75 = $curr_io_elem_ptr;
  $76 = $75&65535;
  $77 = $ptr1;
  $78 = (($77) + ($76)|0);
  $79 = HEAP8[$78>>0]|0;
  $argee_var_addr = $79;
  $80 = $curr_io_elem_ptr;
  $81 = (($80) + 1)<<16>>16;
  $curr_io_elem_ptr = $81;
  $82 = $curr_io_elem_ptr;
  $83 = $82&65535;
  $84 = $ptr1;
  $85 = (($84) + ($83)|0);
  $86 = HEAP8[$85>>0]|0;
  $io_var_addr = $86;
  $87 = $curr_io_elem_ptr;
  $88 = (($87) + 1)<<16>>16;
  $curr_io_elem_ptr = $88;
  $89 = $curr_io_elem_ptr;
  $90 = $89&65535;
  $91 = $ptr1;
  $92 = (($91) + ($90)|0);
  $93 = HEAP8[$92>>0]|0;
  $num_bytes = $93;
  $94 = $curr_io_elem_ptr;
  $95 = (($94) + 1)<<16>>16;
  $curr_io_elem_ptr = $95;
  $96 = $2;
  $97 = $2;
  $98 = $3;
  $99 = (($97) + ($98))|0;
  $100 = $io_var_addr;
  $101 = $100&255;
  $102 = $101<<2;
  $103 = $io_var_addr;
  $104 = $103&255;
  $105 = $104<<2;
  $106 = $num_bytes;
  $107 = $106&255;
  $108 = (($105) + ($107))|0;
  $109 = (_IO_IntersectCalc($96,$99,$102,$108,$io_start,$map_start,$num_intersect_bytes)|0);
  $110 = ($109|0)==(1);
  if ($110) {
   $111 = HEAP32[$io_start>>2]|0;
   $112 = $io_var_addr;
   $113 = $112&255;
   $114 = $113<<2;
   $115 = (($111) - ($114))|0;
   $116 = $argee_var_addr;
   $117 = $116&255;
   $118 = $117<<2;
   $119 = (($115) + ($118))|0;
   $argee_var_addr_final = $119;
   $120 = HEAP32[$io_start>>2]|0;
   $121 = $2;
   $122 = (($120) - ($121))|0;
   $io_arr_offset = $122;
   $123 = $argee_var_addr_final;
   $124 = HEAP32[524296>>2]|0;
   $125 = (($124) + ($123)|0);
   $126 = $4;
   $127 = HEAP32[$num_intersect_bytes>>2]|0;
   _memcpy(($125|0),($126|0),($127|0))|0;
  }
  $128 = $i2;
  $129 = (($128) + 1)|0;
  $i2 = $129;
 }
 $0 = 0;
 $130 = $0;
 STACKTOP = sp;return ($130|0);
}
function _nst_DiagArrGet($slot,$arr,$comb_offset,$len) {
 $slot = $slot|0;
 $arr = $arr|0;
 $comb_offset = $comb_offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $8 = 0, $9 = 0, $arr_offset = 0, $arr_ptr = 0, $arr_size = 0, $io_offset = 0;
 var $ptr = 0, $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $arr;
 $3 = $comb_offset;
 $4 = $len;
 $5 = $3;
 $6 = $5 >>> 16;
 $7 = $6 & 65535;
 $8 = $7&65535;
 $arr_offset = $8;
 $9 = $3;
 $10 = $9 >>> 0;
 $11 = $10 & 65535;
 $12 = $11&65535;
 $io_offset = $12;
 $13 = $2;
 $14 = HEAP32[$13>>2]|0;
 $15 = $14 & 65535;
 $16 = $15&65535;
 $arr_size = $16;
 $17 = $2;
 $18 = ((($17)) + 4|0);
 $arr_ptr = $18;
 $19 = $arr_offset;
 $20 = $19&65535;
 $21 = $4;
 $22 = (($20) + ($21))|0;
 $23 = $arr_size;
 $24 = $23&65535;
 $25 = ($22|0)>($24|0);
 if ($25) {
  $26 = HEAP32[524296>>2]|0;
  $27 = $26;
  $28 = (_ARGEE_sim_ARGEE_returnErr_imp($27,0)|0);
  $0 = $28;
  $75 = $0;
  STACKTOP = sp;return ($75|0);
 }
 $29 = $1;
 $30 = HEAP32[524304>>2]|0;
 $31 = ($29|0)<($30|0);
 if (!($31)) {
  $72 = HEAP32[524296>>2]|0;
  $73 = $72;
  $74 = (_ARGEE_sim_ARGEE_returnErr_imp($73,0)|0);
  $0 = $74;
  $75 = $0;
  STACKTOP = sp;return ($75|0);
 }
 $32 = $1;
 $33 = (527010 + (($32*2056)|0)|0);
 $34 = ((($33)) + 1024|0);
 $ptr = $34;
 $35 = $1;
 $36 = (527010 + (($35*2056)|0)|0);
 $37 = ((($36)) + 2052|0);
 $38 = HEAP16[$37>>1]|0;
 $size_in_bits = $38;
 $39 = $size_in_bits;
 $40 = $39&65535;
 $41 = (($40) + 7)|0;
 $42 = $41 >> 3;
 $43 = $42&65535;
 $size_in_bytes = $43;
 $44 = $io_offset;
 $45 = $44&65535;
 $46 = $size_in_bytes;
 $47 = $46&65535;
 $48 = (($47) - ($45))|0;
 $49 = $48&65535;
 $size_in_bytes = $49;
 $50 = $size_in_bytes;
 $51 = $50&65535;
 $52 = ($51|0)<(0);
 if ($52) {
  $53 = HEAP32[524296>>2]|0;
  $54 = $53;
  $55 = (_ARGEE_sim_ARGEE_returnErr_imp($54,0)|0);
  $0 = $55;
  $75 = $0;
  STACKTOP = sp;return ($75|0);
 } else {
  $56 = $arr_offset;
  $57 = $56&65535;
  $58 = $arr_ptr;
  $59 = (($58) + ($57)|0);
  $60 = $io_offset;
  $61 = $60&65535;
  $62 = $ptr;
  $63 = (($62) + ($61)|0);
  $64 = $4;
  $65 = $size_in_bytes;
  $66 = $65&65535;
  $67 = ($64|0)<($66|0);
  $68 = $4;
  $69 = $size_in_bytes;
  $70 = $69&65535;
  $71 = $67 ? $68 : $70;
  _memcpy(($59|0),($63|0),($71|0))|0;
  $0 = 0;
  $75 = $0;
  STACKTOP = sp;return ($75|0);
 }
 return (0)|0;
}
function _nst_DiagIntGet($slot,$offset,$num_bits) {
 $slot = $slot|0;
 $offset = $offset|0;
 $num_bits = $num_bits|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ptr = 0, $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $offset;
 $3 = $num_bits;
 $4 = $1;
 $5 = HEAP32[524304>>2]|0;
 $6 = ($4|0)<($5|0);
 if (!($6)) {
  $0 = 0;
  $29 = $0;
  STACKTOP = sp;return ($29|0);
 }
 $7 = $1;
 $8 = (527010 + (($7*2056)|0)|0);
 $9 = ((($8)) + 1024|0);
 $ptr = $9;
 $10 = $1;
 $11 = (527010 + (($10*2056)|0)|0);
 $12 = ((($11)) + 2052|0);
 $13 = HEAP16[$12>>1]|0;
 $size_in_bits = $13;
 $14 = $size_in_bits;
 $15 = $14&65535;
 $16 = (($15) + 7)|0;
 $17 = $16 >> 3;
 $18 = $17&65535;
 $size_in_bytes = $18;
 $19 = $2;
 $20 = $3;
 $21 = (($19) + ($20))|0;
 $22 = $size_in_bits;
 $23 = $22&65535;
 $24 = ($21|0)>($23|0);
 if ($24) {
  $0 = 0;
  $29 = $0;
  STACKTOP = sp;return ($29|0);
 } else {
  $25 = $ptr;
  $26 = $2;
  $27 = $3;
  $28 = (_ARR_Obj_LE_Get($25,$26,$27)|0);
  $0 = $28;
  $29 = $0;
  STACKTOP = sp;return ($29|0);
 }
 return (0)|0;
}
function _nst_InpIntGet($slot,$offset,$num_bits) {
 $slot = $slot|0;
 $offset = $offset|0;
 $num_bits = $num_bits|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ptr = 0, $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $offset;
 $3 = $num_bits;
 $4 = $1;
 $5 = HEAP32[524304>>2]|0;
 $6 = ($4|0)<($5|0);
 if (!($6)) {
  $0 = 0;
  $28 = $0;
  STACKTOP = sp;return ($28|0);
 }
 $7 = $1;
 $8 = (527010 + (($7*2056)|0)|0);
 $ptr = $8;
 $9 = $1;
 $10 = (527010 + (($9*2056)|0)|0);
 $11 = ((($10)) + 2048|0);
 $12 = HEAP16[$11>>1]|0;
 $size_in_bits = $12;
 $13 = $size_in_bits;
 $14 = $13&65535;
 $15 = (($14) + 7)|0;
 $16 = $15 >> 3;
 $17 = $16&65535;
 $size_in_bytes = $17;
 $18 = $2;
 $19 = $3;
 $20 = (($18) + ($19))|0;
 $21 = $size_in_bits;
 $22 = $21&65535;
 $23 = ($20|0)>($22|0);
 if ($23) {
  $0 = 0;
  $28 = $0;
  STACKTOP = sp;return ($28|0);
 } else {
  $24 = $ptr;
  $25 = $2;
  $26 = $3;
  $27 = (_ARR_Obj_LE_Get($24,$25,$26)|0);
  $0 = $27;
  $28 = $0;
  STACKTOP = sp;return ($28|0);
 }
 return (0)|0;
}
function _nst_OutpIntSet($slot,$offset,$num_bits,$val) {
 $slot = $slot|0;
 $offset = $offset|0;
 $num_bits = $num_bits|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $offset;
 $3 = $num_bits;
 $4 = $val;
 $5 = $1;
 $6 = $2;
 $7 = $3;
 $8 = $4;
 $9 = (_setARGEE_VarInt($5,$6,$7,$8)|0);
 $10 = ($9|0)==(-1);
 if ($10) {
  $11 = HEAP32[524296>>2]|0;
  $12 = $11;
  $13 = (_ARGEE_sim_ARGEE_returnErr_imp($12,0)|0);
  $0 = $13;
  $14 = $0;
  STACKTOP = sp;return ($14|0);
 } else {
  $0 = 0;
  $14 = $0;
  STACKTOP = sp;return ($14|0);
 }
 return (0)|0;
}
function _setARGEE_VarInt($slot,$bit_offset,$bit_len,$val) {
 $slot = $slot|0;
 $bit_offset = $bit_offset|0;
 $bit_len = $bit_len|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ARGEE_var = 0, $long_offset = 0, $offset_inside_long = 0, $ptr = 0, $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $bit_offset;
 $3 = $bit_len;
 $4 = $val;
 $5 = $2;
 $6 = (($5|0) / 32)&-1;
 $long_offset = $6;
 $7 = $1;
 $8 = $long_offset;
 $9 = (_findIoIntersect($7,1,$8)|0);
 $ARGEE_var = $9;
 $10 = $ARGEE_var;
 $11 = ($10|0)!=(-1);
 if ($11) {
  $12 = $2;
  $13 = (($12|0) % 32)&-1;
  $offset_inside_long = $13;
  $14 = $ARGEE_var;
  $15 = (8 + ($14<<2)|0);
  $16 = $offset_inside_long;
  $17 = $16&65535;
  $18 = $3;
  $19 = $18&65535;
  $20 = $4;
  _ARR_Obj_LE_Set($15,$17,$19,$20);
 }
 $21 = $1;
 $22 = HEAP32[524304>>2]|0;
 $23 = ($21|0)<($22|0);
 if (!($23)) {
  $0 = -1;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 }
 $24 = $1;
 $25 = (527010 + (($24*2056)|0)|0);
 $26 = ((($25)) + 512|0);
 $ptr = $26;
 $27 = $1;
 $28 = (527010 + (($27*2056)|0)|0);
 $29 = ((($28)) + 2050|0);
 $30 = HEAP16[$29>>1]|0;
 $size_in_bits = $30;
 $31 = $size_in_bits;
 $32 = $31&65535;
 $33 = (($32) + 7)|0;
 $34 = $33 >> 3;
 $35 = $34&65535;
 $size_in_bytes = $35;
 $36 = $2;
 $37 = $3;
 $38 = (($36) + ($37))|0;
 $39 = $size_in_bits;
 $40 = $39&65535;
 $41 = ($38|0)>($40|0);
 if ($41) {
  $0 = -1;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 } else {
  $42 = $ptr;
  $43 = $2;
  $44 = $43&65535;
  $45 = $3;
  $46 = $45&65535;
  $47 = $4;
  _ARR_Obj_LE_Set($42,$44,$46,$47);
  $0 = 0;
  $48 = $0;
  STACKTOP = sp;return ($48|0);
 }
 return (0)|0;
}
function _nst_ParamIntSet($slot,$bit_offset,$bit_len,$val) {
 $slot = $slot|0;
 $bit_offset = $bit_offset|0;
 $bit_len = $bit_len|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ptr = 0, $size_in_bits = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $bit_offset;
 $3 = $bit_len;
 $4 = $val;
 $5 = $1;
 $6 = HEAP32[524304>>2]|0;
 $7 = ($5|0)<($6|0);
 if (!($7)) {
  $32 = $0;
  STACKTOP = sp;return ($32|0);
 }
 $8 = $1;
 $9 = (527010 + (($8*2056)|0)|0);
 $10 = ((($9)) + 1536|0);
 $ptr = $10;
 $11 = $1;
 $12 = (527010 + (($11*2056)|0)|0);
 $13 = ((($12)) + 2054|0);
 $14 = HEAP16[$13>>1]|0;
 $size_in_bits = $14;
 $15 = $size_in_bits;
 $16 = $15&65535;
 $17 = (($16) + 7)|0;
 $18 = $17 >> 3;
 $19 = $18&65535;
 $size_in_bytes = $19;
 $20 = $2;
 $21 = $3;
 $22 = (($20) + ($21))|0;
 $23 = $size_in_bits;
 $24 = $23&65535;
 $25 = ($22|0)>($24|0);
 if ($25) {
  $0 = -1;
  $32 = $0;
  STACKTOP = sp;return ($32|0);
 } else {
  $26 = $ptr;
  $27 = $2;
  $28 = $27&65535;
  $29 = $3;
  $30 = $29&65535;
  $31 = $4;
  _ARR_Obj_LE_Set($26,$28,$30,$31);
  $0 = 0;
  $32 = $0;
  STACKTOP = sp;return ($32|0);
 }
 return (0)|0;
}
function _nst_LE_UINT16_GET($arr,$offset) {
 $arr = $arr|0;
 $offset = $offset|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $arr_size = $6;
 $7 = $1;
 $8 = ((($7)) + 4|0);
 $ptr = $8;
 $9 = $arr_size;
 $10 = $9&65535;
 $11 = $2;
 $12 = (($11) + 2)|0;
 $13 = ($10|0)<($12|0);
 if ($13) {
  $14 = HEAP32[524296>>2]|0;
  $15 = $14;
  $16 = (_ARGEE_sim_ARGEE_returnErr_imp($15,0)|0);
  $0 = $16;
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 } else {
  $17 = $2;
  $18 = $ptr;
  $19 = (($18) + ($17)|0);
  $20 = (_LE_UINT16_GET($19)|0);
  $21 = $20&65535;
  $0 = $21;
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 }
 return (0)|0;
}
function _nst_BE_UINT16_GET($arr,$offset) {
 $arr = $arr|0;
 $offset = $offset|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $arr_size = $6;
 $7 = $1;
 $8 = ((($7)) + 4|0);
 $ptr = $8;
 $9 = $arr_size;
 $10 = $9&65535;
 $11 = $2;
 $12 = (($11) + 2)|0;
 $13 = ($10|0)<($12|0);
 if ($13) {
  $14 = HEAP32[524296>>2]|0;
  $15 = $14;
  $16 = (_ARGEE_sim_ARGEE_returnErr_imp($15,0)|0);
  $0 = $16;
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 } else {
  $17 = $2;
  $18 = $ptr;
  $19 = (($18) + ($17)|0);
  $20 = (_BE_UINT16_GET($19)|0);
  $21 = $20&65535;
  $0 = $21;
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 }
 return (0)|0;
}
function _nst_LE_UINT32_GET($arr,$offset) {
 $arr = $arr|0;
 $offset = $offset|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $arr_size = $6;
 $7 = $1;
 $8 = ((($7)) + 4|0);
 $ptr = $8;
 $9 = $arr_size;
 $10 = $9&65535;
 $11 = $2;
 $12 = (($11) + 4)|0;
 $13 = ($10|0)<($12|0);
 if ($13) {
  $14 = HEAP32[524296>>2]|0;
  $15 = $14;
  $16 = (_ARGEE_sim_ARGEE_returnErr_imp($15,0)|0);
  $0 = $16;
  $21 = $0;
  STACKTOP = sp;return ($21|0);
 } else {
  $17 = $2;
  $18 = $ptr;
  $19 = (($18) + ($17)|0);
  $20 = (_LE_UINT32_GET($19)|0);
  $0 = $20;
  $21 = $0;
  STACKTOP = sp;return ($21|0);
 }
 return (0)|0;
}
function _nst_BE_UINT32_GET($arr,$offset) {
 $arr = $arr|0;
 $offset = $offset|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $1;
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 65535;
 $6 = $5&65535;
 $arr_size = $6;
 $7 = $1;
 $8 = ((($7)) + 4|0);
 $ptr = $8;
 $9 = $arr_size;
 $10 = $9&65535;
 $11 = $2;
 $12 = (($11) + 4)|0;
 $13 = ($10|0)<($12|0);
 if ($13) {
  $14 = HEAP32[524296>>2]|0;
  $15 = $14;
  $16 = (_ARGEE_sim_ARGEE_returnErr_imp($15,0)|0);
  $0 = $16;
  $21 = $0;
  STACKTOP = sp;return ($21|0);
 } else {
  $17 = $2;
  $18 = $ptr;
  $19 = (($18) + ($17)|0);
  $20 = (_BE_UINT32_GET($19)|0);
  $0 = $20;
  $21 = $0;
  STACKTOP = sp;return ($21|0);
 }
 return (0)|0;
}
function _nst_LE_UINT16_SET($arr,$offset,$val) {
 $arr = $arr|0;
 $offset = $offset|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $val;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $arr_size = $7;
 $8 = $1;
 $9 = ((($8)) + 4|0);
 $ptr = $9;
 $10 = $arr_size;
 $11 = $10&65535;
 $12 = $2;
 $13 = (($12) + 2)|0;
 $14 = ($11|0)<($13|0);
 if ($14) {
  $15 = HEAP32[524296>>2]|0;
  $16 = $15;
  $17 = (_ARGEE_sim_ARGEE_returnErr_imp($16,0)|0);
  $0 = $17;
  $23 = $0;
  STACKTOP = sp;return ($23|0);
 } else {
  $18 = $2;
  $19 = $ptr;
  $20 = (($19) + ($18)|0);
  $21 = $3;
  $22 = $21&65535;
  _LE_UINT16_SET($20,$22);
  $23 = $0;
  STACKTOP = sp;return ($23|0);
 }
 return (0)|0;
}
function _nst_BE_UINT16_SET($arr,$offset,$val) {
 $arr = $arr|0;
 $offset = $offset|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $val;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $arr_size = $7;
 $8 = $1;
 $9 = ((($8)) + 4|0);
 $ptr = $9;
 $10 = $arr_size;
 $11 = $10&65535;
 $12 = $2;
 $13 = (($12) + 2)|0;
 $14 = ($11|0)<($13|0);
 if ($14) {
  $15 = HEAP32[524296>>2]|0;
  $16 = $15;
  $17 = (_ARGEE_sim_ARGEE_returnErr_imp($16,0)|0);
  $0 = $17;
  $23 = $0;
  STACKTOP = sp;return ($23|0);
 } else {
  $18 = $2;
  $19 = $ptr;
  $20 = (($19) + ($18)|0);
  $21 = $3;
  $22 = $21&65535;
  _BE_UINT16_SET($20,$22);
  $23 = $0;
  STACKTOP = sp;return ($23|0);
 }
 return (0)|0;
}
function _nst_LE_UINT32_SET($arr,$offset,$val) {
 $arr = $arr|0;
 $offset = $offset|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $val;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $arr_size = $7;
 $8 = $1;
 $9 = ((($8)) + 4|0);
 $ptr = $9;
 $10 = $arr_size;
 $11 = $10&65535;
 $12 = $2;
 $13 = (($12) + 4)|0;
 $14 = ($11|0)<($13|0);
 if ($14) {
  $15 = HEAP32[524296>>2]|0;
  $16 = $15;
  $17 = (_ARGEE_sim_ARGEE_returnErr_imp($16,0)|0);
  $0 = $17;
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 } else {
  $18 = $2;
  $19 = $ptr;
  $20 = (($19) + ($18)|0);
  $21 = $3;
  _LE_UINT32_SET($20,$21);
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 }
 return (0)|0;
}
function _nst_BE_UINT32_SET($arr,$offset,$val) {
 $arr = $arr|0;
 $offset = $offset|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $val;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $arr_size = $7;
 $8 = $1;
 $9 = ((($8)) + 4|0);
 $ptr = $9;
 $10 = $arr_size;
 $11 = $10&65535;
 $12 = $2;
 $13 = (($12) + 4)|0;
 $14 = ($11|0)<($13|0);
 if ($14) {
  $15 = HEAP32[524296>>2]|0;
  $16 = $15;
  $17 = (_ARGEE_sim_ARGEE_returnErr_imp($16,0)|0);
  $0 = $17;
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 } else {
  $18 = $2;
  $19 = $ptr;
  $20 = (($19) + ($18)|0);
  $21 = $3;
  _BE_UINT32_SET($20,$21);
  $22 = $0;
  STACKTOP = sp;return ($22|0);
 }
 return (0)|0;
}
function _nst_PLCInpGet($arr,$offset,$len) {
 $arr = $arr|0;
 $offset = $offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $len;
 $ptr = 659072;
 $size_in_bytes = 256;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $arr_size = $7;
 $8 = $size_in_bytes;
 $9 = $8&65535;
 $10 = $2;
 $11 = ($9|0)<($10|0);
 if (!($11)) {
  $12 = $size_in_bytes;
  $13 = $12&65535;
  $14 = $2;
  $15 = (($13) - ($14))|0;
  $16 = $3;
  $17 = ($15|0)<($16|0);
  if (!($17)) {
   $18 = $arr_size;
   $19 = $18&65535;
   $20 = $3;
   $21 = ($19|0)<($20|0);
   if (!($21)) {
    $25 = $2;
    $26 = $size_in_bytes;
    $27 = $26&65535;
    $28 = (($27) - ($25))|0;
    $29 = $28&65535;
    $size_in_bytes = $29;
    $30 = $1;
    $31 = ((($30)) + 4|0);
    $32 = $2;
    $33 = $ptr;
    $34 = (($33) + ($32)|0);
    $35 = $3;
    $36 = $size_in_bytes;
    $37 = $36&65535;
    $38 = ($35|0)<($37|0);
    $39 = $3;
    $40 = $size_in_bytes;
    $41 = $40&65535;
    $42 = $38 ? $39 : $41;
    _memcpy(($31|0),($34|0),($42|0))|0;
    $0 = 0;
    $43 = $0;
    STACKTOP = sp;return ($43|0);
   }
  }
 }
 $22 = HEAP32[524296>>2]|0;
 $23 = $22;
 $24 = (_ARGEE_sim_ARGEE_returnErr_imp($23,0)|0);
 $0 = $24;
 $43 = $0;
 STACKTOP = sp;return ($43|0);
}
function _nst_PLCOutpSet($arr,$offset,$len) {
 $arr = $arr|0;
 $offset = $offset|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $arr_size = 0, $ptr = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $arr;
 $2 = $offset;
 $3 = $len;
 $ptr = 658816;
 $size_in_bytes = 256;
 $4 = $1;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $arr_size = $7;
 $8 = $size_in_bytes;
 $9 = $8&65535;
 $10 = $2;
 $11 = ($9|0)<($10|0);
 if (!($11)) {
  $12 = $size_in_bytes;
  $13 = $12&65535;
  $14 = $2;
  $15 = (($13) - ($14))|0;
  $16 = $3;
  $17 = ($15|0)<($16|0);
  if (!($17)) {
   $18 = $arr_size;
   $19 = $18&65535;
   $20 = $3;
   $21 = ($19|0)<($20|0);
   if (!($21)) {
    $25 = $2;
    $26 = $size_in_bytes;
    $27 = $26&65535;
    $28 = (($27) - ($25))|0;
    $29 = $28&65535;
    $size_in_bytes = $29;
    $30 = $2;
    $31 = $3;
    $32 = $1;
    $33 = ((($32)) + 4|0);
    (_setARGEE_PLC_VarArr($30,$31,$33,0)|0);
    $0 = 0;
    $34 = $0;
    STACKTOP = sp;return ($34|0);
   }
  }
 }
 $22 = HEAP32[524296>>2]|0;
 $23 = $22;
 $24 = (_ARGEE_sim_ARGEE_returnErr_imp($23,0)|0);
 $0 = $24;
 $34 = $0;
 STACKTOP = sp;return ($34|0);
}
function _setARGEE_PLC_VarArr($io_offset,$byte_len,$arr_ptr,$arr_offset) {
 $io_offset = $io_offset|0;
 $byte_len = $byte_len|0;
 $arr_ptr = $arr_ptr|0;
 $arr_offset = $arr_offset|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0;
 var $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0;
 var $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $argee_var_addr = 0, $argee_var_addr_final = 0, $curr_io_elem_enc = 0, $curr_io_elem_ptr = 0, $i = 0, $io_arr_offset = 0, $io_start = 0, $io_var_addr = 0, $len = 0, $long_offset = 0, $map_start = 0, $num_bytes = 0, $num_intersect_bytes = 0;
 var $num_io_elems = 0, $ptr = 0, $ptr1 = 0, $size_in_bytes = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $io_start = sp + 16|0;
 $map_start = sp + 12|0;
 $num_intersect_bytes = sp + 8|0;
 $1 = $io_offset;
 $2 = $byte_len;
 $3 = $arr_ptr;
 $4 = $arr_offset;
 $5 = $1;
 $6 = (($5|0) / 4)&-1;
 $long_offset = $6;
 $7 = $2;
 $len = $7;
 $ptr = 658816;
 $size_in_bytes = 256;
 $8 = $1;
 $9 = $size_in_bytes;
 $10 = $9&65535;
 $11 = (($10) - ($8))|0;
 $12 = $11&65535;
 $size_in_bytes = $12;
 $13 = $size_in_bytes;
 $14 = $13&65535;
 $15 = ($14|0)<(0);
 if ($15) {
  $0 = -1;
  $106 = $0;
  STACKTOP = sp;return ($106|0);
 }
 $16 = $1;
 $17 = $ptr;
 $18 = (($17) + ($16)|0);
 $19 = $4;
 $20 = $3;
 $21 = (($20) + ($19)|0);
 $22 = $len;
 $23 = $size_in_bytes;
 $24 = $23&65535;
 $25 = ($22|0)<($24|0);
 $26 = $len;
 $27 = $size_in_bytes;
 $28 = $27&65535;
 $29 = $25 ? $26 : $28;
 _memcpy(($18|0),($21|0),($29|0))|0;
 $30 = HEAP16[527008>>1]|0;
 $curr_io_elem_enc = $30;
 $31 = HEAP16[658610>>1]|0;
 $32 = $31&65535;
 $33 = HEAP32[524296>>2]|0;
 $34 = (($33) + ($32)|0);
 $ptr1 = $34;
 $35 = $curr_io_elem_enc;
 $36 = $35&65535;
 $37 = $36 & 1023;
 $38 = $37&65535;
 $curr_io_elem_ptr = $38;
 $39 = $curr_io_elem_enc;
 $40 = $39&65535;
 $41 = $40 >> 10;
 $42 = $41 & 63;
 $43 = $42&255;
 $num_io_elems = $43;
 $44 = $curr_io_elem_enc;
 $45 = $44&65535;
 $46 = ($45|0)==(65535);
 if ($46) {
  $0 = -1;
  $106 = $0;
  STACKTOP = sp;return ($106|0);
 }
 $i = 0;
 while(1) {
  $47 = $i;
  $48 = $num_io_elems;
  $49 = $48&255;
  $50 = ($47|0)<($49|0);
  if (!($50)) {
   break;
  }
  $51 = $curr_io_elem_ptr;
  $52 = $51&65535;
  $53 = $ptr1;
  $54 = (($53) + ($52)|0);
  $55 = HEAP8[$54>>0]|0;
  $argee_var_addr = $55;
  $56 = $curr_io_elem_ptr;
  $57 = (($56) + 1)<<16>>16;
  $curr_io_elem_ptr = $57;
  $58 = $curr_io_elem_ptr;
  $59 = $58&65535;
  $60 = $ptr1;
  $61 = (($60) + ($59)|0);
  $62 = HEAP8[$61>>0]|0;
  $io_var_addr = $62;
  $63 = $curr_io_elem_ptr;
  $64 = (($63) + 1)<<16>>16;
  $curr_io_elem_ptr = $64;
  $65 = $curr_io_elem_ptr;
  $66 = $65&65535;
  $67 = $ptr1;
  $68 = (($67) + ($66)|0);
  $69 = HEAP8[$68>>0]|0;
  $num_bytes = $69;
  $70 = $curr_io_elem_ptr;
  $71 = (($70) + 1)<<16>>16;
  $curr_io_elem_ptr = $71;
  $72 = $1;
  $73 = $1;
  $74 = $2;
  $75 = (($73) + ($74))|0;
  $76 = $io_var_addr;
  $77 = $76&255;
  $78 = $77<<2;
  $79 = $io_var_addr;
  $80 = $79&255;
  $81 = $80<<2;
  $82 = $num_bytes;
  $83 = $82&255;
  $84 = (($81) + ($83))|0;
  $85 = (_IO_IntersectCalc($72,$75,$78,$84,$io_start,$map_start,$num_intersect_bytes)|0);
  $86 = ($85|0)==(1);
  if ($86) {
   $87 = HEAP32[$io_start>>2]|0;
   $88 = $io_var_addr;
   $89 = $88&255;
   $90 = $89<<2;
   $91 = (($87) - ($90))|0;
   $92 = $argee_var_addr;
   $93 = $92&255;
   $94 = $93<<2;
   $95 = (($91) + ($94))|0;
   $argee_var_addr_final = $95;
   $96 = HEAP32[$io_start>>2]|0;
   $97 = $1;
   $98 = (($96) - ($97))|0;
   $io_arr_offset = $98;
   $99 = $argee_var_addr_final;
   $100 = HEAP32[524296>>2]|0;
   $101 = (($100) + ($99)|0);
   $102 = $3;
   $103 = HEAP32[$num_intersect_bytes>>2]|0;
   _memcpy(($101|0),($102|0),($103|0))|0;
  }
  $104 = $i;
  $105 = (($104) + 1)|0;
  $i = $105;
 }
 $0 = 0;
 $106 = $0;
 STACKTOP = sp;return ($106|0);
}
function _nst_min($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $a;
 $1 = $b;
 $2 = $0;
 $3 = $1;
 $4 = ($2|0)<($3|0);
 $5 = $0;
 $6 = $1;
 $7 = $4 ? $5 : $6;
 STACKTOP = sp;return ($7|0);
}
function _nst_max($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $a;
 $1 = $b;
 $2 = $0;
 $3 = $1;
 $4 = ($2|0)>($3|0);
 $5 = $0;
 $6 = $1;
 $7 = $4 ? $5 : $6;
 STACKTOP = sp;return ($7|0);
}
function _nst_abs($a) {
 $a = $a|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $a;
 $1 = $0;
 $2 = ($1|0)<(0);
 $3 = $0;
 $4 = (0 - ($3))|0;
 $5 = $2 ? $4 : $3;
 STACKTOP = sp;return ($5|0);
}
function _nst_trace($data,$line_num) {
 $data = $data|0;
 $line_num = $line_num|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $8 = 0, $9 = 0, $curr_id = 0, $curr_ptr = 0, $curr_tick = 0, $real_offset = 0, $trace_arr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $data;
 $2 = $line_num;
 $3 = HEAP16[658620>>1]|0;
 $4 = $3&65535;
 $5 = (($4|0) / 4)&-1;
 $6 = (8 + ($5<<2)|0);
 $trace_arr = $6;
 $7 = $trace_arr;
 $8 = (_LE_UINT16_GET($7)|0);
 $curr_ptr = $8;
 $9 = $trace_arr;
 $10 = ((($9)) + 2|0);
 $11 = (_LE_UINT16_GET($10)|0);
 $curr_id = $11;
 $12 = $curr_ptr;
 $13 = $12&65535;
 $14 = ($13*12)|0;
 $15 = (4 + ($14))|0;
 $16 = $15&65535;
 $real_offset = $16;
 $17 = (_OS_getIntTick()|0);
 $curr_tick = $17;
 $18 = $real_offset;
 $19 = $18&65535;
 $20 = $trace_arr;
 $21 = (($20) + ($19)|0);
 $22 = $curr_tick;
 _LE_UINT32_SET($21,$22);
 $23 = $real_offset;
 $24 = $23&65535;
 $25 = (($24) + 4)|0;
 $26 = $25&65535;
 $real_offset = $26;
 $27 = $curr_id;
 $28 = $27&255;
 $29 = $real_offset;
 $30 = $29&65535;
 $31 = $trace_arr;
 $32 = (($31) + ($30)|0);
 HEAP8[$32>>0] = $28;
 $33 = $real_offset;
 $34 = $33&65535;
 $35 = (($34) + 1)|0;
 $36 = $35&65535;
 $real_offset = $36;
 $37 = $real_offset;
 $38 = $37&65535;
 $39 = $trace_arr;
 $40 = (($39) + ($38)|0);
 $41 = $2;
 _LE_UINT24_SET($40,$41);
 $42 = $real_offset;
 $43 = $42&65535;
 $44 = (($43) + 3)|0;
 $45 = $44&65535;
 $real_offset = $45;
 $46 = $real_offset;
 $47 = $46&65535;
 $48 = $trace_arr;
 $49 = (($48) + ($47)|0);
 $50 = $1;
 _LE_UINT32_SET($49,$50);
 $51 = $real_offset;
 $52 = $51&65535;
 $53 = (($52) + 4)|0;
 $54 = $53&65535;
 $real_offset = $54;
 $55 = $curr_id;
 $56 = $55&65535;
 $57 = (($56) + 1)|0;
 $58 = $57 & 255;
 $59 = $58&65535;
 $curr_id = $59;
 $60 = $curr_ptr;
 $61 = $60&65535;
 $62 = (($61) + 1)|0;
 $63 = (($62|0) % 50)&-1;
 $64 = $63&65535;
 $curr_ptr = $64;
 $65 = $trace_arr;
 $66 = $curr_ptr;
 _LE_UINT16_SET($65,$66);
 $67 = $trace_arr;
 $68 = ((($67)) + 2|0);
 $69 = $curr_id;
 _LE_UINT16_SET($68,$69);
 $70 = $0;
 STACKTOP = sp;return ($70|0);
}
function _nst_ladder_trace($data,$line_num) {
 $data = $data|0;
 $line_num = $line_num|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $data;
 $2 = $line_num;
 $3 = (_getRungTrue()|0);
 $4 = ($3|0)==(1);
 if ($4) {
  $5 = $1;
  $6 = $2;
  (_nst_trace($5,$6)|0);
 }
 $7 = $0;
 STACKTOP = sp;return ($7|0);
}
function _nst_sign_extend16($val) {
 $val = $val|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $res = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val;
 $res = 0;
 $1 = $0;
 $2 = $1 & 65535;
 $res = $2;
 $3 = $0;
 $4 = $3 & 32768;
 $5 = ($4|0)!=(0);
 if ($5) {
  $6 = $res;
  $7 = $6 | -65536;
  $res = $7;
 }
 $8 = $res;
 STACKTOP = sp;return ($8|0);
}
function _nst_array_init($dst,$offset,$src) {
 $dst = $dst|0;
 $offset = $offset|0;
 $src = $src|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $9 = 0, $act_dst = 0, $act_src = 0, $curr = 0, $dst_len = 0, $i = 0, $num_bytes_in_element = 0, $num_dst_elements = 0, $num_source_elements = 0, $num_src_bytes_in_element = 0, $src_len = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $dst;
 $2 = $offset;
 $3 = $src;
 $4 = $3;
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 65535;
 $7 = $6&65535;
 $src_len = $7;
 $8 = $1;
 $9 = HEAP32[$8>>2]|0;
 $10 = $9 & 65535;
 $11 = $10&65535;
 $dst_len = $11;
 $12 = $1;
 $13 = HEAP32[$12>>2]|0;
 $14 = $13 >>> 16;
 $15 = $14 & 65535;
 $16 = $15&65535;
 $num_bytes_in_element = $16;
 $17 = $3;
 $18 = HEAP32[$17>>2]|0;
 $19 = $18 >>> 16;
 $20 = $19 & 65535;
 $21 = $20&65535;
 $num_src_bytes_in_element = $21;
 $22 = $3;
 $23 = ((($22)) + 4|0);
 $act_src = $23;
 $24 = $1;
 $25 = ((($24)) + 4|0);
 $act_dst = $25;
 $26 = $src_len;
 $27 = $26&65535;
 $28 = $num_src_bytes_in_element;
 $29 = $28&65535;
 $30 = (($27|0) / ($29|0))&-1;
 $num_source_elements = $30;
 $31 = $dst_len;
 $32 = $31&65535;
 $33 = $num_bytes_in_element;
 $34 = $33&65535;
 $35 = (($32|0) / ($34|0))&-1;
 $num_dst_elements = $35;
 $36 = $3;
 $37 = ((($36)) + 4|0);
 $curr = $37;
 $38 = $num_source_elements;
 $39 = $2;
 $40 = (($38) + ($39))|0;
 $41 = $num_dst_elements;
 $42 = ($40>>>0)>($41>>>0);
 if ($42) {
  $43 = HEAP32[524296>>2]|0;
  $44 = $43;
  $45 = (_ARGEE_sim_ARGEE_returnErr_imp($44,0)|0);
  $0 = $45;
  $81 = $0;
  STACKTOP = sp;return ($81|0);
 }
 $i = 0;
 while(1) {
  $46 = $i;
  $47 = $num_source_elements;
  $48 = ($46>>>0)<($47>>>0);
  if (!($48)) {
   break;
  }
  $49 = $i;
  $50 = $act_src;
  $51 = (($50) + ($49<<2)|0);
  $52 = (_LE_UINT32_GET($51)|0);
  $val = $52;
  $53 = $num_bytes_in_element;
  $54 = $53&65535;
  switch ($54|0) {
  case 1:  {
   $55 = $val;
   $56 = $55&255;
   $57 = $2;
   $58 = $i;
   $59 = (($57) + ($58))|0;
   $60 = $act_dst;
   $61 = (($60) + ($59)|0);
   HEAP8[$61>>0] = $56;
   break;
  }
  case 2:  {
   $62 = $act_dst;
   $63 = $i;
   $64 = $63<<1;
   $65 = (($62) + ($64)|0);
   $66 = $2;
   $67 = $66<<1;
   $68 = (($65) + ($67)|0);
   $69 = $val;
   $70 = $69&65535;
   _LE_UINT16_SET($68,$70);
   break;
  }
  case 4:  {
   $71 = $act_dst;
   $72 = $i;
   $73 = $72<<2;
   $74 = (($71) + ($73)|0);
   $75 = $2;
   $76 = $75<<2;
   $77 = (($74) + ($76)|0);
   $78 = $val;
   _LE_UINT32_SET($77,$78);
   break;
  }
  default: {
  }
  }
  $79 = $i;
  $80 = (($79) + 1)|0;
  $i = $80;
 }
 $0 = 1;
 $81 = $0;
 STACKTOP = sp;return ($81|0);
}
function _if_then_else($cond,$then_expr,$else_expr) {
 $cond = $cond|0;
 $then_expr = $then_expr|0;
 $else_expr = $else_expr|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $cond;
 $2 = $then_expr;
 $3 = $else_expr;
 $4 = $1;
 $5 = ($4|0)==(1);
 if ($5) {
  $6 = $2;
  $0 = $6;
 } else {
  $7 = $3;
  $0 = $7;
 }
 $8 = $0;
 STACKTOP = sp;return ($8|0);
}
function _invoke_built_in_func($func_num) {
 $func_num = $func_num|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ret_val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $func_num;
 $2 = $1;
 $3 = (524724 + ($2<<2)|0);
 $4 = HEAP32[$3>>2]|0;
 HEAP32[525384>>2] = $4;
 $5 = $1;
 $6 = (525164 + ($5<<2)|0);
 $7 = HEAP32[$6>>2]|0;
 switch ($7|0) {
 case 0:  {
  $8 = HEAP32[525384>>2]|0;
  $9 = (FUNCTION_TABLE_i[$8 & 127]()|0);
  $ret_val = $9;
  break;
 }
 case 1:  {
  $10 = HEAP32[525384>>2]|0;
  $11 = (_GET_VAL(0)|0);
  $12 = (FUNCTION_TABLE_ii[$10 & 127]($11)|0);
  $ret_val = $12;
  break;
 }
 case 2:  {
  $13 = HEAP32[525384>>2]|0;
  $14 = (_GET_VAL(0)|0);
  $15 = (_GET_VAL(1)|0);
  $16 = (FUNCTION_TABLE_iii[$13 & 63]($14,$15)|0);
  $ret_val = $16;
  break;
 }
 case 3:  {
  $17 = HEAP32[525384>>2]|0;
  $18 = (_GET_VAL(0)|0);
  $19 = (_GET_VAL(1)|0);
  $20 = (_GET_VAL(2)|0);
  $21 = (FUNCTION_TABLE_iiii[$17 & 63]($18,$19,$20)|0);
  $ret_val = $21;
  break;
 }
 case 4:  {
  $22 = HEAP32[525384>>2]|0;
  $23 = (_GET_VAL(0)|0);
  $24 = (_GET_VAL(1)|0);
  $25 = (_GET_VAL(2)|0);
  $26 = (_GET_VAL(3)|0);
  $27 = (FUNCTION_TABLE_iiiii[$22 & 63]($23,$24,$25,$26)|0);
  $ret_val = $27;
  break;
 }
 default: {
 }
 }
 $28 = $ret_val;
 _MOV_VAL(0,$28);
 $29 = $0;
 STACKTOP = sp;return ($29|0);
}
function _GET_VAL($reg) {
 $reg = $reg|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $reg;
 $1 = $0;
 $2 = (525492 + ($1<<2)|0);
 $3 = HEAP32[$2>>2]|0;
 STACKTOP = sp;return ($3|0);
}
function _MOV_VAL($reg,$val) {
 $reg = $reg|0;
 $val = $val|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $reg;
 $1 = $val;
 $2 = $1;
 $3 = $0;
 $4 = (525492 + ($3<<2)|0);
 HEAP32[$4>>2] = $2;
 STACKTOP = sp;return;
}
function _setupBreakpointReplacement($pos,$data,$setup_preemption) {
 $pos = $pos|0;
 $data = $data|0;
 $setup_preemption = $setup_preemption|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $pos;
 $1 = $data;
 $2 = $setup_preemption;
 $3 = $0;
 $4 = $3&65535;
 HEAP16[658594>>1] = $4;
 $5 = $1;
 HEAP32[525392>>2] = $5;
 $6 = $2;
 $7 = ($6|0)==(1);
 if (!($7)) {
  STACKTOP = sp;return;
 }
 $8 = HEAP16[658598>>1]|0;
 $9 = $8&65535;
 $10 = (($9|0) / 4)&-1;
 $11 = (8 + ($10<<2)|0);
 HEAP32[$11>>2] = 1;
 STACKTOP = sp;return;
}
function _int_div($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $a;
 $2 = $b;
 $3 = $2;
 $4 = ($3|0)==(0);
 if ($4) {
  $0 = 0;
  $11 = $0;
  STACKTOP = sp;return ($11|0);
 } else {
  $5 = $1;
  $6 = $2;
  $7 = (($5|0) / ($6|0))&-1;
  _MOV_VAL(0,$7);
  $8 = $1;
  $9 = $2;
  $10 = (($8|0) / ($9|0))&-1;
  $0 = $10;
  $11 = $0;
  STACKTOP = sp;return ($11|0);
 }
 return (0)|0;
}
function _int_mod($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $a;
 $2 = $b;
 $3 = $2;
 $4 = ($3|0)==(0);
 if ($4) {
  $0 = 0;
  $11 = $0;
  STACKTOP = sp;return ($11|0);
 } else {
  $5 = $1;
  $6 = $2;
  $7 = (($5|0) % ($6|0))&-1;
  _MOV_VAL(0,$7);
  $8 = $1;
  $9 = $2;
  $10 = (($8|0) % ($9|0))&-1;
  $0 = $10;
  $11 = $0;
  STACKTOP = sp;return ($11|0);
 }
 return (0)|0;
}
function _bitmask_insert_impl($r0,$lr) {
 $r0 = $r0|0;
 $lr = $lr|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $bit_len = 0, $bit_offset = 0, $lr_cont = 0, $offset = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $r0;
 $2 = $lr;
 $3 = $2;
 $4 = (($3) - 1)|0;
 $5 = $4;
 $6 = HEAP32[$5>>2]|0;
 $lr_cont = $6;
 $7 = $lr_cont;
 $8 = $7 >>> 16;
 $9 = $8 & 65535;
 $offset = $9;
 $10 = $lr_cont;
 $11 = $10 >>> 8;
 $12 = $11 & 255;
 $bit_offset = $12;
 $13 = $lr_cont;
 $14 = $13 & 255;
 $bit_len = $14;
 $15 = $offset;
 $16 = (($15>>>0) / 4)&-1;
 $17 = (8 + ($16<<2)|0);
 $18 = HEAP32[$17>>2]|0;
 $val = $18;
 $19 = $val;
 $20 = $1;
 $21 = $bit_offset;
 $22 = $bit_len;
 $23 = (_bf_merge($19,$20,$21,$22)|0);
 $val = $23;
 $24 = $val;
 $25 = $offset;
 $26 = (($25>>>0) / 4)&-1;
 $27 = (8 + ($26<<2)|0);
 HEAP32[$27>>2] = $24;
 $28 = $0;
 STACKTOP = sp;return ($28|0);
}
function _bf_merge($y,$x,$shift,$len) {
 $y = $y|0;
 $x = $x|0;
 $shift = $shift|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $mask = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $y;
 $1 = $x;
 $2 = $shift;
 $3 = $len;
 $4 = $3;
 $5 = 1 << $4;
 $6 = (($5) - 1)|0;
 $mask = $6;
 $7 = $0;
 $8 = $mask;
 $9 = $2;
 $10 = $8 << $9;
 $11 = $10 ^ -1;
 $12 = $7 & $11;
 $13 = $1;
 $14 = $mask;
 $15 = $13 & $14;
 $16 = $2;
 $17 = $15 << $16;
 $18 = $12 | $17;
 STACKTOP = sp;return ($18|0);
}
function _bitmask_insert($r0) {
 $r0 = $r0|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $r0;
 $2 = (_GET_STACK_ELEM(12)|0);
 $val = $2;
 $3 = $val;
 _MOV_VAL(2,$3);
 $4 = $val;
 _MOV_VAL(1,$4);
 $5 = $val;
 $6 = (($5) + 4)|0;
 $val = $6;
 $7 = $val;
 _SET_STACK_ELEM(12,$7);
 $8 = $1;
 $9 = $val;
 $10 = (($9) - 4)|0;
 (_bitmask_insert_impl($8,$10)|0);
 $11 = $0;
 STACKTOP = sp;return ($11|0);
}
function _GET_STACK_ELEM($offset) {
 $offset = $offset|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $offset;
 $1 = HEAP32[(525544)>>2]|0;
 $2 = $0;
 $3 = (($1) + ($2))|0;
 $4 = $3;
 $5 = HEAP32[$4>>2]|0;
 STACKTOP = sp;return ($5|0);
}
function _SET_STACK_ELEM($offset,$elem) {
 $offset = $offset|0;
 $elem = $elem|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $offset;
 $1 = $elem;
 $2 = $1;
 $3 = HEAP32[(525544)>>2]|0;
 $4 = $0;
 $5 = (($3) + ($4))|0;
 $6 = $5;
 HEAP32[$6>>2] = $2;
 STACKTOP = sp;return;
}
function _bitmask_extract_impl_r0($lr) {
 $lr = $lr|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $bit_len = 0, $bit_offset = 0, $lr_cont = 0, $offset = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $lr;
 $1 = $0;
 $2 = (($1) - 1)|0;
 $3 = $2;
 $4 = HEAP32[$3>>2]|0;
 $lr_cont = $4;
 $5 = $lr_cont;
 $6 = $5 >>> 16;
 $7 = $6 & 65535;
 $offset = $7;
 $8 = $lr_cont;
 $9 = $8 >>> 8;
 $10 = $9 & 255;
 $bit_offset = $10;
 $11 = $lr_cont;
 $12 = $11 & 255;
 $bit_len = $12;
 $13 = $offset;
 $14 = (($13>>>0) / 4)&-1;
 $15 = (8 + ($14<<2)|0);
 $16 = HEAP32[$15>>2]|0;
 $val = $16;
 $17 = $val;
 $18 = $bit_offset;
 $19 = $bit_len;
 $20 = (_bf_get($17,$18,$19)|0);
 $val = $20;
 $21 = $val;
 _MOV_VAL(0,$21);
 $22 = $val;
 STACKTOP = sp;return ($22|0);
}
function _bf_get($y,$shift,$len) {
 $y = $y|0;
 $shift = $shift|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $y;
 $1 = $shift;
 $2 = $len;
 $3 = $0;
 $4 = $1;
 $5 = $3 >>> $4;
 $6 = $2;
 $7 = 1 << $6;
 $8 = (($7) - 1)|0;
 $9 = $5 & $8;
 STACKTOP = sp;return ($9|0);
}
function _bitmask_extract_r0() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = (_GET_STACK_ELEM(12)|0);
 $val = $1;
 $2 = $val;
 _MOV_VAL(2,$2);
 $3 = $val;
 _MOV_VAL(1,$3);
 $4 = $val;
 $5 = (($4) + 4)|0;
 $val = $5;
 $6 = $val;
 _SET_STACK_ELEM(12,$6);
 $7 = $val;
 $8 = (($7) - 4)|0;
 (_bitmask_extract_impl_r0($8)|0);
 $9 = $0;
 STACKTOP = sp;return ($9|0);
}
function _instr_trace_impl($r0,$lr) {
 $r0 = $r0|0;
 $lr = $lr|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $bit = 0, $lg = 0, $line_num = 0, $line_num_ptr = 0, $ptr = 0, $ptr_lg = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $r0;
 $1 = $lr;
 $2 = $0;
 $3 = $2 & 1;
 $4 = ($3|0)==(1);
 if (!($4)) {
  STACKTOP = sp;return;
 }
 $5 = $1;
 $6 = (($5) - 1)|0;
 $line_num_ptr = $6;
 $7 = $line_num_ptr;
 $8 = $7;
 $9 = HEAP16[$8>>1]|0;
 $line_num = $9;
 $10 = HEAP16[658612>>1]|0;
 $11 = $10&65535;
 $12 = HEAP32[524296>>2]|0;
 $13 = (($12) + ($11)|0);
 $ptr = $13;
 $14 = HEAP16[658612>>1]|0;
 $15 = $14&65535;
 $16 = HEAP32[524296>>2]|0;
 $17 = (($16) + ($15)|0);
 $ptr_lg = $17;
 $18 = $line_num;
 $19 = $18&65535;
 $20 = (($19|0) / 32)&-1;
 $lg = $20;
 $21 = $line_num;
 $22 = $21&65535;
 $23 = (($22|0) % 32)&-1;
 $bit = $23;
 $24 = $bit;
 $25 = 1 << $24;
 $26 = $lg;
 $27 = (1 + ($26))|0;
 $28 = $ptr_lg;
 $29 = (($28) + ($27<<2)|0);
 $30 = HEAP32[$29>>2]|0;
 $31 = $30 | $25;
 HEAP32[$29>>2] = $31;
 STACKTOP = sp;return;
}
function _instr_trace($r0) {
 $r0 = $r0|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $r0;
 $2 = (_GET_STACK_ELEM(16)|0);
 $val = $2;
 $3 = $val;
 _MOV_VAL(2,$3);
 $4 = $val;
 _MOV_VAL(1,$4);
 $5 = $val;
 $6 = (($5) + 2)|0;
 $val = $6;
 $7 = $val;
 _SET_STACK_ELEM(16,$7);
 $8 = $1;
 $9 = $val;
 $10 = (($9) - 2)|0;
 _instr_trace_impl($8,$10);
 $11 = $0;
 STACKTOP = sp;return ($11|0);
}
function _invokeBuiltInAsmCall($num) {
 $num = $num|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $r0 = 0, $r1 = 0, $r2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $num;
 $2 = $1;
 $3 = (525396 + ($2<<2)|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = $4;
 HEAP32[525384>>2] = $5;
 $6 = $1;
 $7 = (525420 + ($6<<2)|0);
 $8 = HEAP32[$7>>2]|0;
 switch ($8|0) {
 case 3:  {
  $9 = (_GET_VAL(2)|0);
  $r2 = $9;
  label = 3;
  break;
 }
 case 2:  {
  label = 3;
  break;
 }
 case 1:  {
  label = 4;
  break;
 }
 default: {
 }
 }
 if ((label|0) == 3) {
  $10 = (_GET_VAL(1)|0);
  $r1 = $10;
  label = 4;
 }
 if ((label|0) == 4) {
  $11 = (_GET_VAL(0)|0);
  $r0 = $11;
 }
 $12 = $1;
 $13 = (525420 + ($12<<2)|0);
 $14 = HEAP32[$13>>2]|0;
 switch ($14|0) {
 case 3:  {
  $15 = HEAP32[525384>>2]|0;
  $16 = $r0;
  $17 = $r1;
  $18 = $r2;
  $19 = (FUNCTION_TABLE_iiii[$15 & 63]($16,$17,$18)|0);
  $0 = $19;
  break;
 }
 case 2:  {
  $20 = HEAP32[525384>>2]|0;
  $21 = $r0;
  $22 = $r1;
  $23 = (FUNCTION_TABLE_iii[$20 & 63]($21,$22)|0);
  $0 = $23;
  break;
 }
 case 1:  {
  $24 = HEAP32[525384>>2]|0;
  $25 = $r0;
  $26 = (FUNCTION_TABLE_ii[$24 & 127]($25)|0);
  $0 = $26;
  break;
 }
 case 0:  {
  $27 = HEAP32[525384>>2]|0;
  $28 = (FUNCTION_TABLE_i[$27 & 127]()|0);
  $0 = $28;
  break;
 }
 default: {
 }
 }
 $29 = $0;
 STACKTOP = sp;return ($29|0);
}
function _createRedirFuncInterf() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $9 = 0;
 var $addr_delta = 0, $i = 0, $ptr = 0, $start_offset_prog = 0, $u_addr_delta = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = HEAP32[524296>>2]|0;
 $2 = HEAP16[658622>>1]|0;
 $3 = $2&65535;
 $4 = (($1) + ($3)|0);
 $ptr = $4;
 $5 = $ptr;
 $6 = $5;
 $start_offset_prog = $6;
 $i = 0;
 while(1) {
  $7 = $i;
  $8 = ($7>>>0)<(6);
  if (!($8)) {
   break;
  }
  $9 = $ptr;
  $10 = $i;
  $11 = (525444 + ($10<<2)|0);
  $12 = HEAP32[$11>>2]|0;
  $13 = 46336 | $12;
  $14 = $13&65535;
  _LE_UINT16_SET($9,$14);
  $15 = $ptr;
  $16 = ((($15)) + 2|0);
  $ptr = $16;
  $17 = $start_offset_prog;
  $18 = (($17) + 2)|0;
  $start_offset_prog = $18;
  $19 = $ptr;
  _LE_UINT16_SET($19,18034);
  $20 = $ptr;
  $21 = ((($20)) + 2|0);
  $ptr = $21;
  $22 = $start_offset_prog;
  $23 = (($22) + 2)|0;
  $start_offset_prog = $23;
  $24 = $i;
  $25 = (525468 + ($24<<2)|0);
  $26 = HEAP32[$25>>2]|0;
  $27 = $ptr;
  $28 = $27;
  $29 = (($28) + 4)|0;
  $30 = (($26) - ($29))|0;
  $addr_delta = $30;
  $31 = $addr_delta;
  $u_addr_delta = $31;
  $32 = $u_addr_delta;
  $33 = $32 >>> 1;
  $u_addr_delta = $33;
  $34 = $ptr;
  $35 = $u_addr_delta;
  $36 = $35 >>> 11;
  $37 = $36 & 2047;
  $38 = 61440 | $37;
  $39 = $38&65535;
  _LE_UINT16_SET($34,$39);
  $40 = $ptr;
  $41 = ((($40)) + 2|0);
  $ptr = $41;
  $42 = $start_offset_prog;
  $43 = (($42) + 2)|0;
  $start_offset_prog = $43;
  $44 = $ptr;
  $45 = $u_addr_delta;
  $46 = $45 >>> 0;
  $47 = $46 & 2047;
  $48 = 63488 | $47;
  $49 = $48&65535;
  _LE_UINT16_SET($44,$49);
  $50 = $ptr;
  $51 = ((($50)) + 2|0);
  $ptr = $51;
  $52 = $start_offset_prog;
  $53 = (($52) + 2)|0;
  $start_offset_prog = $53;
  $54 = $i;
  $55 = (525444 + ($54<<2)|0);
  $56 = HEAP32[$55>>2]|0;
  $57 = ($56|0)==(13);
  $58 = $ptr;
  if ($57) {
   _LE_UINT16_SET($58,17921);
   $59 = $ptr;
   $60 = ((($59)) + 2|0);
   $ptr = $60;
   $61 = $start_offset_prog;
   $62 = (($61) + 2)|0;
   $start_offset_prog = $62;
  } else {
   _LE_UINT16_SET($58,17920);
   $63 = $ptr;
   $64 = ((($63)) + 2|0);
   $ptr = $64;
   $65 = $start_offset_prog;
   $66 = (($65) + 2)|0;
   $start_offset_prog = $66;
  }
  $67 = $ptr;
  $68 = $i;
  $69 = (525444 + ($68<<2)|0);
  $70 = HEAP32[$69>>2]|0;
  $71 = 48384 | $70;
  $72 = $71&65535;
  _LE_UINT16_SET($67,$72);
  $73 = $ptr;
  $74 = ((($73)) + 2|0);
  $ptr = $74;
  $75 = $start_offset_prog;
  $76 = (($75) + 2)|0;
  $start_offset_prog = $76;
  $77 = $i;
  $78 = (($77) + 1)|0;
  $i = $78;
 }
 $79 = $0;
 STACKTOP = sp;return ($79|0);
}
function _getCPU_Regs() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (525492|0);
}
function _POP_ELEM() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = HEAP32[(525544)>>2]|0;
 $addr = $0;
 $1 = HEAP32[(525544)>>2]|0;
 $2 = (($1) + 4)|0;
 HEAP32[(525544)>>2] = $2;
 $3 = $addr;
 $4 = $3;
 $5 = HEAP32[$4>>2]|0;
 STACKTOP = sp;return ($5|0);
}
function _PUSH_ELEM($elem) {
 $elem = $elem|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $elem;
 $1 = HEAP32[(525544)>>2]|0;
 $addr = $1;
 $2 = $0;
 $3 = $addr;
 $4 = $3;
 HEAP32[$4>>2] = $2;
 $5 = HEAP32[(525544)>>2]|0;
 $6 = (($5) - 4)|0;
 HEAP32[(525544)>>2] = $6;
 STACKTOP = sp;return;
}
function _clearInstrTrace() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ptr = 0, $size = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = HEAP16[658612>>1]|0;
 $1 = $0&65535;
 $2 = HEAP32[524296>>2]|0;
 $3 = (($2) + ($1)|0);
 $ptr = $3;
 $4 = $ptr;
 $5 = (_LE_UINT16_GET($4)|0);
 $6 = $5&65535;
 $size = $6;
 $7 = $ptr;
 $8 = ((($7)) + 4|0);
 $9 = $size;
 _memset(($8|0),0,($9|0))|0;
 $10 = $ptr;
 $11 = ((($10)) + 2|0);
 _LE_UINT16_SET($11,0);
 STACKTOP = sp;return;
}
function _ARGEE_sim_PrepExecNST() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $fp = 0, $or$cond = 0, $pc = 0, $ret_vals = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $ret_vals = sp + 8|0;
 $0 = HEAP32[525556>>2]|0;
 $1 = ($0|0)==(0);
 $2 = HEAP32[525556>>2]|0;
 $3 = ($2|0)>(5);
 $or$cond = $1 | $3;
 if ($or$cond) {
  _clearInstrTrace();
 }
 $4 = HEAP16[658604>>1]|0;
 $5 = $4&65535;
 $6 = HEAP32[524296>>2]|0;
 $7 = (($6) + ($5)|0);
 $8 = (_LE_UINT32_GET($7)|0);
 $fp = $8;
 $9 = $fp;
 $10 = $9;
 $11 = (_LE_UINT32_GET($10)|0);
 $pc = $11;
 $12 = HEAP16[658598>>1]|0;
 $13 = $12&65535;
 $14 = (($13|0) / 4)&-1;
 $15 = (8 + ($14<<2)|0);
 HEAP32[$15>>2] = 0;
 $16 = $fp;
 $17 = (($16) + 4)|0;
 $18 = $17;
 $19 = (_LE_UINT32_GET($18)|0);
 $fp = $19;
 $20 = HEAP16[658594>>1]|0;
 $21 = $20&65535;
 $22 = ($21|0)!=(0);
 if ($22) {
  $23 = HEAP16[658598>>1]|0;
  $24 = $23&65535;
  $25 = (($24|0) / 4)&-1;
  $26 = (8 + ($25<<2)|0);
  HEAP32[$26>>2] = 1;
 }
 $27 = HEAP16[658600>>1]|0;
 $28 = $27&65535;
 $29 = HEAP32[524296>>2]|0;
 $30 = $29;
 $31 = (($28) + ($30))|0;
 HEAP32[$ret_vals>>2] = $31;
 $32 = HEAP16[658602>>1]|0;
 $33 = $32&65535;
 $34 = HEAP32[524296>>2]|0;
 $35 = $34;
 $36 = (($33) + ($35))|0;
 $37 = ((($ret_vals)) + 4|0);
 HEAP32[$37>>2] = $36;
 $38 = HEAP32[524296>>2]|0;
 $39 = HEAP16[658600>>1]|0;
 $40 = $39&65535;
 $41 = (($38) + ($40)|0);
 _LE_UINT32_SET($41,-1);
 $42 = HEAP32[524296>>2]|0;
 $43 = HEAP16[658602>>1]|0;
 $44 = $43&65535;
 $45 = (($42) + ($44)|0);
 _LE_UINT32_SET($45,-1);
 $46 = $fp;
 _MOV_VAL(4,$46);
 $47 = HEAP32[524296>>2]|0;
 $48 = $47;
 _MOV_VAL(11,$48);
 $49 = HEAP32[524296>>2]|0;
 $50 = $49;
 _MOV_VAL(3,$50);
 $51 = $pc;
 _MOV_VAL(15,$51);
 _MOV_VAL(13,((525812)));
 _MOV_VAL(14,-1);
 STACKTOP = sp;return;
}
function _ARGEE_simExec() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $8 = 0, $9 = 0, $fp = 0, $next_task = 0, $ret = 0;
 var $ret_vals = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $ret_vals = sp + 12|0;
 $1 = (_disas_thumb_insn()|0);
 $ret = $1;
 $2 = $ret;
 $3 = ($2|0)==(-1);
 if (!($3)) {
  $75 = $ret;
  $0 = $75;
  $76 = $0;
  STACKTOP = sp;return ($76|0);
 }
 $4 = (_GET_VAL(0)|0);
 HEAP32[$ret_vals>>2] = $4;
 $5 = (_GET_VAL(4)|0);
 $6 = ((($ret_vals)) + 4|0);
 HEAP32[$6>>2] = $5;
 $7 = (_GET_VAL(7)|0);
 $8 = ((($ret_vals)) + 8|0);
 HEAP32[$8>>2] = $7;
 $9 = HEAP16[658604>>1]|0;
 $10 = $9&65535;
 $11 = HEAP32[524296>>2]|0;
 $12 = (($11) + ($10)|0);
 $13 = (_LE_UINT32_GET($12)|0);
 $fp = $13;
 $14 = HEAP32[$ret_vals>>2]|0;
 $15 = ($14|0)==(0);
 if ($15) {
  label = 5;
 } else {
  $16 = HEAP32[$ret_vals>>2]|0;
  $17 = ($16|0)==(2);
  if ($17) {
   label = 5;
  } else {
   $18 = HEAP32[$ret_vals>>2]|0;
   $19 = ($18|0)==(3);
   if ($19) {
    label = 5;
   }
  }
 }
 if ((label|0) == 5) {
  $20 = ((($ret_vals)) + 8|0);
  $21 = HEAP32[$20>>2]|0;
  $22 = (($21) - 4)|0;
  HEAP32[$20>>2] = $22;
 }
 $23 = $fp;
 $24 = $23;
 $25 = ((($ret_vals)) + 8|0);
 $26 = HEAP32[$25>>2]|0;
 $27 = $26 | 1;
 _LE_UINT32_SET($24,$27);
 $28 = $fp;
 $29 = (($28) + 4)|0;
 $30 = $29;
 $31 = ((($ret_vals)) + 4|0);
 $32 = HEAP32[$31>>2]|0;
 _LE_UINT32_SET($30,$32);
 $33 = HEAP32[$ret_vals>>2]|0;
 $34 = ($33|0)==(0);
 if (!($34)) {
  $35 = HEAP32[$ret_vals>>2]|0;
  $36 = ($35|0)==(8);
  if (!($36)) {
   $59 = HEAP32[$ret_vals>>2]|0;
   $60 = ($59|0)==(1);
   if (!($60)) {
    $73 = HEAP32[$ret_vals>>2]|0;
    $74 = ($73|0)==(2);
    if ($74) {
     $0 = -2;
     $76 = $0;
     STACKTOP = sp;return ($76|0);
    } else {
     $0 = -3;
     $76 = $0;
     STACKTOP = sp;return ($76|0);
    }
   }
   $61 = HEAP16[658594>>1]|0;
   $62 = $61&65535;
   $63 = ($62|0)!=(0);
   if ($63) {
    $64 = HEAP16[658594>>1]|0;
    $65 = $64&65535;
    $66 = HEAP32[524296>>2]|0;
    $67 = (($66) + ($65)|0);
    $68 = HEAP32[525392>>2]|0;
    _LE_UINT32_SET($67,$68);
    HEAP16[658594>>1] = 0;
   }
   $69 = HEAP32[525556>>2]|0;
   $70 = ($69|0)<(20);
   if (!($70)) {
    HEAP32[525556>>2] = 5;
   }
   $71 = HEAP32[525556>>2]|0;
   $72 = (($71) + 1)|0;
   HEAP32[525556>>2] = $72;
   $0 = -1;
   $76 = $0;
   STACKTOP = sp;return ($76|0);
  }
 }
 $37 = HEAP16[658594>>1]|0;
 $38 = $37&65535;
 $39 = ($38|0)!=(0);
 if ($39) {
  $40 = HEAP16[658594>>1]|0;
  $41 = $40&65535;
  $42 = HEAP32[524296>>2]|0;
  $43 = (($42) + ($41)|0);
  $44 = HEAP32[525392>>2]|0;
  _LE_UINT32_SET($43,$44);
  HEAP16[658594>>1] = 0;
 }
 $45 = $fp;
 $46 = (($45) + 8)|0;
 $47 = $46;
 $48 = (_LE_UINT32_GET($47)|0);
 $49 = $48;
 $next_task = $49;
 $50 = HEAP16[658604>>1]|0;
 $51 = $50&65535;
 $52 = HEAP32[524296>>2]|0;
 $53 = (($52) + ($51)|0);
 $54 = $next_task;
 $55 = $54;
 _LE_UINT32_SET($53,$55);
 $56 = $next_task;
 $57 = HEAP32[525388>>2]|0;
 $58 = ($56|0)==($57|0);
 if ($58) {
  _syncIO(1);
 }
 HEAP32[525556>>2] = 0;
 $0 = -1;
 $76 = $0;
 STACKTOP = sp;return ($76|0);
}
function _exec_cmp($val1,$val2) {
 $val1 = $val1|0;
 $val2 = $val2|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $res = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val1;
 $1 = $val2;
 $2 = $0;
 $3 = $1;
 $4 = (($2) - ($3))|0;
 $res = $4;
 HEAP32[525816>>2] = 0;
 $5 = $res;
 $6 = ($5|0)<(0);
 do {
  if ($6) {
   $7 = HEAP32[525816>>2]|0;
   $8 = $7 | 19;
   HEAP32[525816>>2] = $8;
  } else {
   $9 = $res;
   $10 = ($9|0)==(0);
   $11 = HEAP32[525816>>2]|0;
   if ($10) {
    $12 = $11 | 42;
    HEAP32[525816>>2] = $12;
    break;
   } else {
    $13 = $11 | 28;
    HEAP32[525816>>2] = $13;
    break;
   }
  }
 } while(0);
 $14 = $res;
 STACKTOP = sp;return ($14|0);
}
function _f_exec_cmp($val1,$val2) {
 $val1 = +$val1;
 $val2 = +$val2;
 var $0 = 0.0, $1 = 0.0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0.0, $2 = 0.0, $3 = 0.0, $4 = 0.0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0, $9 = 0.0, $res = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $val1;
 $1 = $val2;
 $2 = $0;
 $3 = $1;
 $4 = $2 - $3;
 $res = $4;
 HEAP32[525816>>2] = 0;
 $5 = $res;
 $6 = $5 < 0.0;
 do {
  if ($6) {
   $7 = HEAP32[525816>>2]|0;
   $8 = $7 | 19;
   HEAP32[525816>>2] = $8;
  } else {
   $9 = $res;
   $10 = $9 == 0.0;
   $11 = HEAP32[525816>>2]|0;
   if ($10) {
    $12 = $11 | 42;
    HEAP32[525816>>2] = $12;
    break;
   } else {
    $13 = $11 | 28;
    HEAP32[525816>>2] = $13;
    break;
   }
  }
 } while(0);
 $14 = $res;
 STACKTOP = sp;return (+$14);
}
function _disas_thumb_insn() {
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0;
 var $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0;
 var $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0;
 var $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0;
 var $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0;
 var $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0;
 var $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0;
 var $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0;
 var $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0;
 var $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0;
 var $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0;
 var $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0;
 var $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0;
 var $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0;
 var $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0;
 var $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0;
 var $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0;
 var $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $addr = 0, $cond = 0, $i = 0, $insn = 0, $offset = 0, $op = 0, $or$cond = 0, $or$cond3 = 0, $or$cond5 = 0, $prev_reg_val = 0, $rd = 0, $rm = 0, $rn = 0, $shift = 0;
 var $tmp = 0, $tmp2 = 0, $val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = HEAP32[(525552)>>2]|0;
 $2 = $1 & -2;
 $3 = $2;
 $4 = (_LE_UINT16_GET($3)|0);
 $5 = $4&65535;
 $insn = $5;
 $6 = HEAP32[(525552)>>2]|0;
 $7 = (($6) + 2)|0;
 HEAP32[(525552)>>2] = $7;
 $8 = HEAP32[525820>>2]|0;
 $9 = ($8|0)==(1);
 if ($9) {
  $10 = HEAP32[(525552)>>2]|0;
  $11 = (($10) + 2)|0;
  HEAP32[(525552)>>2] = $11;
  HEAP32[525820>>2] = 0;
 }
 $12 = $insn;
 $13 = $12 >>> 12;
 L4: do {
  switch ($13|0) {
  case 1: case 0:  {
   $14 = $insn;
   $15 = $14 & 7;
   $rd = $15;
   $16 = $insn;
   $17 = $16 >>> 11;
   $18 = $17 & 3;
   $op = $18;
   $19 = $op;
   $20 = ($19|0)==(3);
   $21 = $insn;
   $22 = $21 >>> 3;
   $23 = $22 & 7;
   if (!($20)) {
    $rm = $23;
    $47 = $insn;
    $48 = $47 >>> 6;
    $49 = $48 & 31;
    $shift = $49;
    $50 = $rm;
    $51 = (525492 + ($50<<2)|0);
    $52 = HEAP32[$51>>2]|0;
    $tmp = $52;
    $53 = $op;
    $54 = ($53|0)==(1);
    $55 = $shift;
    $56 = $tmp;
    if ($54) {
     $57 = $56 >> $55;
     $tmp = $57;
    } else {
     $58 = $56 << $55;
     $tmp = $58;
    }
    $59 = $insn;
    $60 = $59 & 7;
    $rd = $60;
    $61 = $tmp;
    $62 = $rd;
    $63 = (525492 + ($62<<2)|0);
    HEAP32[$63>>2] = $61;
    break L4;
   }
   $rn = $23;
   $24 = $rn;
   $25 = (525492 + ($24<<2)|0);
   $26 = HEAP32[$25>>2]|0;
   $tmp = $26;
   $27 = $insn;
   $28 = $27 & 1024;
   $29 = ($28|0)!=(0);
   $30 = $insn;
   $31 = $30 >>> 6;
   $32 = $31 & 7;
   if ($29) {
    $tmp2 = $32;
   } else {
    $rm = $32;
    $33 = $rm;
    $34 = (525492 + ($33<<2)|0);
    $35 = HEAP32[$34>>2]|0;
    $tmp2 = $35;
   }
   $36 = $insn;
   $37 = $36 & 512;
   $38 = ($37|0)!=(0);
   $39 = $tmp;
   $40 = $tmp2;
   if ($38) {
    $41 = (($39) - ($40))|0;
    $42 = $rd;
    $43 = (525492 + ($42<<2)|0);
    HEAP32[$43>>2] = $41;
    break L4;
   } else {
    $44 = (($39) + ($40))|0;
    $45 = $rd;
    $46 = (525492 + ($45<<2)|0);
    HEAP32[$46>>2] = $44;
    break L4;
   }
   break;
  }
  case 3: case 2:  {
   $64 = $insn;
   $65 = $64 >>> 11;
   $66 = $65 & 3;
   $op = $66;
   $67 = $insn;
   $68 = $67 >>> 8;
   $69 = $68 & 7;
   $rd = $69;
   $70 = $op;
   $71 = ($70|0)==(0);
   if ($71) {
    $72 = $insn;
    $73 = $72 & 255;
    $tmp = $73;
    $74 = $tmp;
    $75 = $rd;
    $76 = (525492 + ($75<<2)|0);
    HEAP32[$76>>2] = $74;
    break L4;
   }
   $77 = $rd;
   $78 = (525492 + ($77<<2)|0);
   $79 = HEAP32[$78>>2]|0;
   $tmp = $79;
   $80 = $insn;
   $81 = $80 & 255;
   $tmp2 = $81;
   $82 = $op;
   switch ($82|0) {
   case 1:  {
    $83 = $tmp;
    $84 = $tmp2;
    $85 = (_exec_cmp($83,$84)|0);
    $tmp = $85;
    break L4;
    break;
   }
   case 2:  {
    $86 = $tmp;
    $87 = $tmp2;
    $88 = (($86) + ($87))|0;
    $89 = $rd;
    $90 = (525492 + ($89<<2)|0);
    HEAP32[$90>>2] = $88;
    break L4;
    break;
   }
   case 3:  {
    $91 = $tmp;
    $92 = $tmp2;
    $93 = (($91) - ($92))|0;
    $94 = $rd;
    $95 = (525492 + ($94<<2)|0);
    HEAP32[$95>>2] = $93;
    break L4;
    break;
   }
   default: {
    break L4;
   }
   }
   break;
  }
  case 4:  {
   $96 = $insn;
   $97 = $96 & 2048;
   $98 = ($97|0)!=(0);
   $99 = $insn;
   if ($98) {
    $100 = $99 >>> 8;
    $101 = $100 & 7;
    $rd = $101;
    $102 = HEAP32[(525552)>>2]|0;
    $103 = (($102) + 2)|0;
    $104 = $insn;
    $105 = $104 & 255;
    $106 = $105<<2;
    $107 = (($103) + ($106))|0;
    $val = $107;
    $108 = $val;
    $109 = $108 & -4;
    $val = $109;
    $110 = $val;
    $addr = $110;
    $111 = $addr;
    $112 = $111;
    $113 = HEAP32[$112>>2]|0;
    $tmp = $113;
    $114 = $tmp;
    $115 = $rd;
    $116 = (525492 + ($115<<2)|0);
    HEAP32[$116>>2] = $114;
    break L4;
   }
   $117 = $99 & 1024;
   $118 = ($117|0)!=(0);
   $119 = $insn;
   $120 = $119 & 7;
   if ($118) {
    $121 = $insn;
    $122 = $121 >>> 4;
    $123 = $122 & 8;
    $124 = $120 | $123;
    $rd = $124;
    $125 = $insn;
    $126 = $125 >>> 3;
    $127 = $126 & 15;
    $rm = $127;
    $128 = $insn;
    $129 = $128 >>> 8;
    $130 = $129 & 3;
    $op = $130;
    $131 = $op;
    switch ($131|0) {
    case 0:  {
     $132 = $rd;
     $133 = (525492 + ($132<<2)|0);
     $134 = HEAP32[$133>>2]|0;
     $135 = $rm;
     $136 = (525492 + ($135<<2)|0);
     $137 = HEAP32[$136>>2]|0;
     $138 = (($134) + ($137))|0;
     $139 = $rd;
     $140 = (525492 + ($139<<2)|0);
     HEAP32[$140>>2] = $138;
     break L4;
     break;
    }
    case 1:  {
     $141 = $rd;
     $142 = (525492 + ($141<<2)|0);
     $143 = HEAP32[$142>>2]|0;
     $144 = $rm;
     $145 = (525492 + ($144<<2)|0);
     $146 = HEAP32[$145>>2]|0;
     (_exec_cmp($143,$146)|0);
     $0 = 0;
     $625 = $0;
     STACKTOP = sp;return ($625|0);
     break;
    }
    case 2:  {
     $147 = $rd;
     $148 = (525492 + ($147<<2)|0);
     $149 = HEAP32[$148>>2]|0;
     $prev_reg_val = $149;
     $150 = $rm;
     $151 = ($150|0)==(15);
     $152 = $rm;
     $153 = (525492 + ($152<<2)|0);
     $154 = HEAP32[$153>>2]|0;
     if ($151) {
      $155 = (($154) + 2)|0;
      $156 = $rd;
      $157 = (525492 + ($156<<2)|0);
      HEAP32[$157>>2] = $155;
     } else {
      $158 = $rd;
      $159 = (525492 + ($158<<2)|0);
      HEAP32[$159>>2] = $154;
     }
     $160 = $rd;
     $161 = ($160|0)==(15);
     if (!($161)) {
      break L4;
     }
     $162 = $rd;
     $163 = (525492 + ($162<<2)|0);
     $164 = HEAP32[$163>>2]|0;
     $165 = ($164|0)==(-1);
     if (!($165)) {
      break L4;
     }
     $0 = -1;
     $625 = $0;
     STACKTOP = sp;return ($625|0);
     break;
    }
    case 3:  {
     $166 = $rm;
     $167 = (525492 + ($166<<2)|0);
     $168 = HEAP32[$167>>2]|0;
     $tmp = $168;
     $169 = $insn;
     $170 = $169 & 128;
     $171 = ($170|0)!=(0);
     if ($171) {
      $172 = HEAP32[(525552)>>2]|0;
      $173 = $172 | 1;
      HEAP32[(525548)>>2] = $173;
     }
     $174 = $tmp;
     $175 = $174 & -256;
     $176 = ($175|0)!=(-256);
     $177 = $tmp;
     if ($176) {
      HEAP32[(525552)>>2] = $177;
      break L4;
     }
     $178 = $177 & 255;
     (_invoke_built_in_func($178)|0);
     $179 = HEAP32[(525552)>>2]|0;
     $180 = ($179|0)==(-1);
     if (!($180)) {
      break L4;
     }
     $0 = -1;
     $625 = $0;
     STACKTOP = sp;return ($625|0);
     break;
    }
    default: {
     break L4;
    }
    }
   }
   $rd = $120;
   $181 = $insn;
   $182 = $181 >>> 3;
   $183 = $182 & 7;
   $rm = $183;
   $184 = $insn;
   $185 = $184 >>> 6;
   $186 = $185 & 15;
   $op = $186;
   $187 = $op;
   $188 = ($187|0)==(2);
   $189 = $op;
   $190 = ($189|0)==(3);
   $or$cond = $188 | $190;
   $191 = $op;
   $192 = ($191|0)==(4);
   $or$cond3 = $or$cond | $192;
   $193 = $op;
   $194 = ($193|0)==(7);
   $or$cond5 = $or$cond3 | $194;
   if ($or$cond5) {
    $195 = $rm;
    $val = $195;
    $196 = $rd;
    $rm = $196;
    $197 = $val;
    $rd = $197;
    $val = 1;
   } else {
    $val = 0;
   }
   $198 = $op;
   $199 = ($198|0)==(9);
   if ($199) {
    $tmp = 0;
   } else {
    $200 = $op;
    $201 = ($200|0)!=(15);
    if ($201) {
     $202 = $rd;
     $203 = (525492 + ($202<<2)|0);
     $204 = HEAP32[$203>>2]|0;
     $tmp = $204;
    }
   }
   $205 = $rm;
   $206 = (525492 + ($205<<2)|0);
   $207 = HEAP32[$206>>2]|0;
   $tmp2 = $207;
   $208 = $op;
   do {
    switch ($208|0) {
    case 0:  {
     $209 = $tmp;
     $210 = $tmp2;
     $211 = $209 & $210;
     $tmp = $211;
     break;
    }
    case 1:  {
     $212 = $tmp;
     $213 = $tmp2;
     $214 = $212 ^ $213;
     $tmp = $214;
     break;
    }
    case 2:  {
     $215 = $tmp2;
     $216 = $tmp;
     $217 = $215 << $216;
     $tmp2 = $217;
     break;
    }
    case 3:  {
     $218 = $tmp2;
     $219 = $tmp;
     $220 = $218 >> $219;
     $tmp2 = $220;
     break;
    }
    case 15:  {
     $236 = $tmp2;
     $237 = $236 ^ -1;
     $tmp2 = $237;
     $val = 1;
     $238 = $rd;
     $rm = $238;
     break;
    }
    case 14:  {
     $232 = $tmp;
     $233 = $tmp2;
     $234 = $233 ^ -1;
     $235 = $232 & $234;
     $tmp = $235;
     break;
    }
    case 13:  {
     $229 = $tmp;
     $230 = $tmp2;
     $231 = Math_imul($229, $230)|0;
     $tmp = $231;
     break;
    }
    case 12:  {
     $226 = $tmp;
     $227 = $tmp2;
     $228 = $226 | $227;
     $tmp = $228;
     break;
    }
    case 10:  {
     $223 = $tmp;
     $224 = $tmp2;
     $225 = (_exec_cmp($223,$224)|0);
     $tmp = $225;
     $0 = 0;
     $625 = $0;
     STACKTOP = sp;return ($625|0);
     break;
    }
    case 9:  {
     $221 = $tmp2;
     $222 = (0 - ($221))|0;
     $tmp = $222;
     break;
    }
    default: {
    }
    }
   } while(0);
   $239 = $rd;
   $240 = ($239|0)!=(16);
   if ($240) {
    $241 = $val;
    $242 = ($241|0)!=(0);
    if ($242) {
     $243 = $tmp2;
     $244 = $rm;
     $245 = (525492 + ($244<<2)|0);
     HEAP32[$245>>2] = $243;
     break L4;
    } else {
     $246 = $tmp;
     $247 = $rd;
     $248 = (525492 + ($247<<2)|0);
     HEAP32[$248>>2] = $246;
     break L4;
    }
   }
   break;
  }
  case 5:  {
   $249 = $insn;
   $250 = $249 & 7;
   $rd = $250;
   $251 = $insn;
   $252 = $251 >>> 3;
   $253 = $252 & 7;
   $rn = $253;
   $254 = $insn;
   $255 = $254 >>> 6;
   $256 = $255 & 7;
   $rm = $256;
   $257 = $insn;
   $258 = $257 >>> 9;
   $259 = $258 & 7;
   $op = $259;
   $260 = $rn;
   $261 = (525492 + ($260<<2)|0);
   $262 = HEAP32[$261>>2]|0;
   $addr = $262;
   $263 = $rm;
   $264 = (525492 + ($263<<2)|0);
   $265 = HEAP32[$264>>2]|0;
   $tmp = $265;
   $266 = $addr;
   $267 = $tmp;
   $268 = (($266) + ($267))|0;
   $addr = $268;
   $269 = $op;
   $270 = ($269>>>0)<(3);
   if ($270) {
    $271 = $rd;
    $272 = (525492 + ($271<<2)|0);
    $273 = HEAP32[$272>>2]|0;
    $tmp = $273;
   } else {
    $tmp = 0;
   }
   $274 = $op;
   switch ($274|0) {
   case 0:  {
    $275 = $tmp;
    $276 = $addr;
    $277 = $276;
    HEAP32[$277>>2] = $275;
    break;
   }
   case 1:  {
    $278 = $tmp;
    $279 = $278&65535;
    $280 = $addr;
    $281 = $280;
    HEAP16[$281>>1] = $279;
    break;
   }
   case 2:  {
    $282 = $tmp;
    $283 = $282&255;
    $284 = $addr;
    $285 = $284;
    HEAP8[$285>>0] = $283;
    break;
   }
   case 3:  {
    $286 = $addr;
    $287 = $286;
    $288 = HEAP8[$287>>0]|0;
    $289 = $288 << 24 >> 24;
    $tmp = $289;
    break;
   }
   case 4:  {
    $290 = $addr;
    $291 = $290;
    $292 = HEAP32[$291>>2]|0;
    $tmp = $292;
    break;
   }
   case 5:  {
    $293 = $addr;
    $294 = $293;
    $295 = HEAP16[$294>>1]|0;
    $296 = $295&65535;
    $tmp = $296;
    break;
   }
   case 6:  {
    $297 = $addr;
    $298 = $297;
    $299 = HEAP8[$298>>0]|0;
    $300 = $299&255;
    $tmp = $300;
    break;
   }
   case 7:  {
    $301 = $addr;
    $302 = $301;
    $303 = HEAP16[$302>>1]|0;
    $304 = $303 << 16 >> 16;
    $tmp = $304;
    break;
   }
   default: {
   }
   }
   $305 = $op;
   $306 = ($305>>>0)>=(3);
   if ($306) {
    $307 = $tmp;
    $308 = $rd;
    $309 = (525492 + ($308<<2)|0);
    HEAP32[$309>>2] = $307;
   }
   break;
  }
  case 6:  {
   $310 = $insn;
   $311 = $310 & 7;
   $rd = $311;
   $312 = $insn;
   $313 = $312 >>> 3;
   $314 = $313 & 7;
   $rn = $314;
   $315 = $rn;
   $316 = (525492 + ($315<<2)|0);
   $317 = HEAP32[$316>>2]|0;
   $addr = $317;
   $318 = $insn;
   $319 = $318 >>> 4;
   $320 = $319 & 124;
   $val = $320;
   $321 = $addr;
   $322 = $val;
   $323 = (($321) + ($322))|0;
   $addr = $323;
   $324 = $insn;
   $325 = $324 & 2048;
   $326 = ($325|0)!=(0);
   if ($326) {
    $327 = $addr;
    $328 = $327;
    $329 = HEAP32[$328>>2]|0;
    $tmp = $329;
    $330 = $tmp;
    $331 = $rd;
    $332 = (525492 + ($331<<2)|0);
    HEAP32[$332>>2] = $330;
    break L4;
   } else {
    $333 = $rd;
    $334 = (525492 + ($333<<2)|0);
    $335 = HEAP32[$334>>2]|0;
    $tmp = $335;
    $336 = $tmp;
    $337 = $addr;
    $338 = $337;
    HEAP32[$338>>2] = $336;
    break L4;
   }
   break;
  }
  case 7:  {
   $339 = $insn;
   $340 = $339 & 7;
   $rd = $340;
   $341 = $insn;
   $342 = $341 >>> 3;
   $343 = $342 & 7;
   $rn = $343;
   $344 = $rn;
   $345 = (525492 + ($344<<2)|0);
   $346 = HEAP32[$345>>2]|0;
   $addr = $346;
   $347 = $insn;
   $348 = $347 >>> 6;
   $349 = $348 & 31;
   $val = $349;
   $350 = $addr;
   $351 = $val;
   $352 = (($350) + ($351))|0;
   $addr = $352;
   $353 = $insn;
   $354 = $353 & 2048;
   $355 = ($354|0)!=(0);
   if ($355) {
    $356 = $addr;
    $357 = $356;
    $358 = HEAP8[$357>>0]|0;
    $359 = $358&255;
    $tmp = $359;
    $360 = $tmp;
    $361 = $rd;
    $362 = (525492 + ($361<<2)|0);
    HEAP32[$362>>2] = $360;
    break L4;
   } else {
    $363 = $rd;
    $364 = (525492 + ($363<<2)|0);
    $365 = HEAP32[$364>>2]|0;
    $tmp = $365;
    $366 = $tmp;
    $367 = $366&255;
    $368 = $addr;
    $369 = $368;
    HEAP8[$369>>0] = $367;
    break L4;
   }
   break;
  }
  case 8:  {
   $370 = $insn;
   $371 = $370 & 7;
   $rd = $371;
   $372 = $insn;
   $373 = $372 >>> 3;
   $374 = $373 & 7;
   $rn = $374;
   $375 = $rn;
   $376 = (525492 + ($375<<2)|0);
   $377 = HEAP32[$376>>2]|0;
   $addr = $377;
   $378 = $insn;
   $379 = $378 >>> 5;
   $380 = $379 & 62;
   $val = $380;
   $381 = $addr;
   $382 = $val;
   $383 = (($381) + ($382))|0;
   $addr = $383;
   $384 = $insn;
   $385 = $384 & 2048;
   $386 = ($385|0)!=(0);
   if ($386) {
    $387 = $addr;
    $388 = $387;
    $389 = HEAP16[$388>>1]|0;
    $390 = $389&65535;
    $tmp = $390;
    $391 = $tmp;
    $392 = $rd;
    $393 = (525492 + ($392<<2)|0);
    HEAP32[$393>>2] = $391;
    break L4;
   } else {
    $394 = $rd;
    $395 = (525492 + ($394<<2)|0);
    $396 = HEAP32[$395>>2]|0;
    $tmp = $396;
    $397 = $tmp;
    $398 = $397&65535;
    $399 = $addr;
    $400 = $399;
    HEAP16[$400>>1] = $398;
    break L4;
   }
   break;
  }
  case 15:  {
   (_disas_thumb2_insn()|0);
   break;
  }
  case 14:  {
   $612 = $insn;
   $613 = $612 & 2048;
   $614 = ($613|0)!=(0);
   if ($614) {
    (_disas_thumb2_insn()|0);
    break L4;
   } else {
    $615 = HEAP32[(525552)>>2]|0;
    $val = $615;
    $616 = $insn;
    $617 = $616 << 21;
    $618 = $617 >> 21;
    $offset = $618;
    $619 = $offset;
    $620 = $619 << 1;
    $621 = (($620) + 2)|0;
    $622 = $val;
    $623 = (($622) + ($621))|0;
    $val = $623;
    $624 = $val;
    HEAP32[(525552)>>2] = $624;
    break L4;
   }
   break;
  }
  case 11:  {
   $401 = $insn;
   $402 = $401 >>> 8;
   $403 = $402 & 15;
   $op = $403;
   $404 = $op;
   switch ($404|0) {
   case 6: case 10: case 14: case 0:  {
    break L4;
    break;
   }
   case 2:  {
    $405 = $insn;
    $406 = $405 & 7;
    $rd = $406;
    $407 = $insn;
    $408 = $407 >>> 3;
    $409 = $408 & 7;
    $rm = $409;
    $410 = $rm;
    $411 = (525492 + ($410<<2)|0);
    $412 = HEAP32[$411>>2]|0;
    $tmp = $412;
    $413 = $insn;
    $414 = $413 >>> 6;
    $415 = $414 & 3;
    switch ($415|0) {
    case 0:  {
     $416 = $tmp;
     $417 = $416 & 32768;
     $418 = ($417|0)!=(0);
     if ($418) {
      $419 = $tmp;
      $420 = $419 | -65536;
      $tmp = $420;
     }
     break;
    }
    case 1:  {
     $421 = $tmp;
     $422 = $421 & 128;
     $423 = ($422|0)!=(0);
     if ($423) {
      $424 = $tmp;
      $425 = $424 | -256;
      $tmp = $425;
     }
     break;
    }
    case 2:  {
     $426 = $tmp;
     $427 = $426 & 65535;
     $tmp = $427;
     break;
    }
    case 3:  {
     $428 = $tmp;
     $429 = $428 & 255;
     $tmp = $429;
     break;
    }
    default: {
    }
    }
    $430 = $tmp;
    $431 = $rd;
    $432 = (525492 + ($431<<2)|0);
    HEAP32[$432>>2] = $430;
    break L4;
    break;
   }
   case 13: case 12: case 5: case 4:  {
    $433 = HEAP32[(525544)>>2]|0;
    $addr = $433;
    $434 = $insn;
    $435 = $434 & 256;
    $436 = ($435|0)!=(0);
    if ($436) {
     $offset = 4;
    } else {
     $offset = 0;
    }
    $i = 0;
    while(1) {
     $437 = $i;
     $438 = ($437|0)<(8);
     $439 = $insn;
     if (!($438)) {
      break;
     }
     $440 = $i;
     $441 = 1 << $440;
     $442 = $439 & $441;
     $443 = ($442|0)!=(0);
     if ($443) {
      $444 = $offset;
      $445 = (($444) + 4)|0;
      $offset = $445;
     }
     $446 = $i;
     $447 = (($446) + 1)|0;
     $i = $447;
    }
    $448 = $439 & 2048;
    $449 = ($448|0)==(0);
    if ($449) {
     $450 = $addr;
     $451 = $offset;
     $452 = (($450) - ($451))|0;
     $addr = $452;
    }
    $i = 0;
    while(1) {
     $453 = $i;
     $454 = ($453|0)<(8);
     $455 = $insn;
     if (!($454)) {
      break;
     }
     $456 = $i;
     $457 = 1 << $456;
     $458 = $455 & $457;
     $459 = ($458|0)!=(0);
     if ($459) {
      $460 = $insn;
      $461 = $460 & 2048;
      $462 = ($461|0)!=(0);
      if ($462) {
       $463 = $addr;
       $464 = $463;
       $465 = HEAP32[$464>>2]|0;
       $tmp = $465;
       $466 = $tmp;
       $467 = $i;
       $468 = (525492 + ($467<<2)|0);
       HEAP32[$468>>2] = $466;
      } else {
       $469 = $i;
       $470 = (525492 + ($469<<2)|0);
       $471 = HEAP32[$470>>2]|0;
       $tmp = $471;
       $472 = $tmp;
       $473 = $addr;
       $474 = $473;
       HEAP32[$474>>2] = $472;
      }
      $475 = $addr;
      $476 = (($475) + 4)|0;
      $addr = $476;
     }
     $477 = $i;
     $478 = (($477) + 1)|0;
     $i = $478;
    }
    $479 = $455 & 256;
    $480 = ($479|0)!=(0);
    if ($480) {
     $481 = $insn;
     $482 = $481 & 2048;
     $483 = ($482|0)!=(0);
     if ($483) {
      $484 = $addr;
      $485 = $484;
      $486 = HEAP32[$485>>2]|0;
      $tmp = $486;
     } else {
      $487 = HEAP32[(525548)>>2]|0;
      $488 = $addr;
      $489 = $488;
      HEAP32[$489>>2] = $487;
     }
     $490 = $addr;
     $491 = (($490) + 4)|0;
     $addr = $491;
    }
    $492 = $insn;
    $493 = $492 & 2048;
    $494 = ($493|0)==(0);
    if ($494) {
     $495 = $addr;
     $496 = $offset;
     $497 = (($495) - ($496))|0;
     $addr = $497;
    }
    $498 = $addr;
    HEAP32[(525544)>>2] = $498;
    $499 = $insn;
    $500 = $499 & 2304;
    $501 = ($500|0)==(2304);
    if (!($501)) {
     break L4;
    }
    $502 = $tmp;
    HEAP32[(525552)>>2] = $502;
    break L4;
    break;
   }
   case 11: case 9: case 3: case 1:  {
    $503 = $insn;
    $504 = $503 & 7;
    $rm = $504;
    $505 = $rm;
    $506 = (525492 + ($505<<2)|0);
    $507 = HEAP32[$506>>2]|0;
    $tmp = $507;
    $508 = $insn;
    $509 = $508 & 248;
    $510 = $509 >>> 2;
    $511 = $insn;
    $512 = $511 & 512;
    $513 = $512 >>> 3;
    $514 = $510 | $513;
    $offset = $514;
    $515 = HEAP32[(525552)>>2]|0;
    $516 = (($515) + 2)|0;
    $val = $516;
    $517 = $offset;
    $518 = $val;
    $519 = (($518) + ($517))|0;
    $val = $519;
    $520 = $insn;
    $521 = $520 & 2048;
    $522 = ($521|0)!=(0);
    if ($522) {
     $523 = $tmp;
     $524 = $523 & 1;
     $525 = ($524|0)==(1);
     if (!($525)) {
      label = 122;
     }
    } else {
     label = 122;
    }
    if ((label|0) == 122) {
     $526 = $insn;
     $527 = $526 & 2048;
     $528 = ($527|0)==(0);
     if (!($528)) {
      break L4;
     }
     $529 = $tmp;
     $530 = $529 & 1;
     $531 = ($530|0)==(0);
     if (!($531)) {
      break L4;
     }
    }
    $532 = $val;
    HEAP32[(525552)>>2] = $532;
    break L4;
    break;
   }
   case 15:  {
    $533 = $insn;
    $534 = $533 & 15;
    $535 = ($534|0)==(0);
    if ($535) {
     break L4;
    }
    $536 = $insn;
    $537 = $536 >>> 4;
    $538 = $537 & 15;
    switch ($538|0) {
    case 13:  {
     $539 = HEAP32[525816>>2]|0;
     $540 = $539 & 4;
     $541 = ($540|0)!=(0);
     if ($541) {
      $542 = HEAP32[(525552)>>2]|0;
      $543 = (($542) + 2)|0;
      HEAP32[(525552)>>2] = $543;
      break L4;
     } else {
      HEAP32[525820>>2] = 1;
      break L4;
     }
     break;
    }
    case 11:  {
     $544 = HEAP32[525816>>2]|0;
     $545 = $544 & 8;
     $546 = ($545|0)!=(0);
     if ($546) {
      $547 = HEAP32[(525552)>>2]|0;
      $548 = (($547) + 2)|0;
      HEAP32[(525552)>>2] = $548;
      break L4;
     } else {
      HEAP32[525820>>2] = 1;
      break L4;
     }
     break;
    }
    case 10:  {
     $549 = HEAP32[525816>>2]|0;
     $550 = $549 & 1;
     $551 = ($550|0)!=(0);
     if ($551) {
      $552 = HEAP32[(525552)>>2]|0;
      $553 = (($552) + 2)|0;
      HEAP32[(525552)>>2] = $553;
      break L4;
     } else {
      HEAP32[525820>>2] = 1;
      break L4;
     }
     break;
    }
    case 12:  {
     $554 = HEAP32[525816>>2]|0;
     $555 = $554 & 2;
     $556 = ($555|0)!=(0);
     if ($556) {
      $557 = HEAP32[(525552)>>2]|0;
      $558 = (($557) + 2)|0;
      HEAP32[(525552)>>2] = $558;
      break L4;
     } else {
      HEAP32[525820>>2] = 1;
      break L4;
     }
     break;
    }
    case 1:  {
     $559 = HEAP32[525816>>2]|0;
     $560 = $559 & 32;
     $561 = ($560|0)!=(0);
     if ($561) {
      $562 = HEAP32[(525552)>>2]|0;
      $563 = (($562) + 2)|0;
      HEAP32[(525552)>>2] = $563;
      break L4;
     } else {
      HEAP32[525820>>2] = 1;
      break L4;
     }
     break;
    }
    case 0:  {
     $564 = HEAP32[525816>>2]|0;
     $565 = $564 & 16;
     $566 = ($565|0)!=(0);
     if ($566) {
      $567 = HEAP32[(525552)>>2]|0;
      $568 = (($567) + 2)|0;
      HEAP32[(525552)>>2] = $568;
      break L4;
     } else {
      HEAP32[525820>>2] = 1;
      break L4;
     }
     break;
    }
    default: {
     break L4;
    }
    }
    break;
   }
   default: {
    while(1) {
    }
   }
   }
   break;
  }
  case 13:  {
   $569 = $insn;
   $570 = $569 >>> 8;
   $571 = $570 & 15;
   $cond = $571;
   $572 = HEAP32[(525552)>>2]|0;
   $573 = (($572) + 2)|0;
   $val = $573;
   $574 = $insn;
   $575 = $574 << 24;
   $576 = $575 >> 24;
   $offset = $576;
   $577 = $offset;
   $578 = $577 << 1;
   $579 = $val;
   $580 = (($579) + ($578))|0;
   $val = $580;
   $581 = $cond;
   $582 = ($581|0)==(11);
   if ($582) {
    $583 = HEAP32[525816>>2]|0;
    $584 = $583 & 1;
    $585 = ($584|0)!=(0);
    if (!($585)) {
     label = 148;
    }
   } else {
    label = 148;
   }
   do {
    if ((label|0) == 148) {
     $586 = $cond;
     $587 = ($586|0)==(13);
     if ($587) {
      $588 = HEAP32[525816>>2]|0;
      $589 = $588 & 2;
      $590 = ($589|0)!=(0);
      if ($590) {
       break;
      }
     }
     $591 = $cond;
     $592 = ($591|0)==(12);
     if ($592) {
      $593 = HEAP32[525816>>2]|0;
      $594 = $593 & 4;
      $595 = ($594|0)!=(0);
      if ($595) {
       break;
      }
     }
     $596 = $cond;
     $597 = ($596|0)==(10);
     if ($597) {
      $598 = HEAP32[525816>>2]|0;
      $599 = $598 & 8;
      $600 = ($599|0)!=(0);
      if ($600) {
       break;
      }
     }
     $601 = $cond;
     $602 = ($601|0)==(1);
     if ($602) {
      $603 = HEAP32[525816>>2]|0;
      $604 = $603 & 16;
      $605 = ($604|0)!=(0);
      if ($605) {
       break;
      }
     }
     $606 = $cond;
     $607 = ($606|0)==(0);
     if (!($607)) {
      break L4;
     }
     $608 = HEAP32[525816>>2]|0;
     $609 = $608 & 32;
     $610 = ($609|0)!=(0);
     if (!($610)) {
      break L4;
     }
    }
   } while(0);
   $611 = $val;
   HEAP32[(525552)>>2] = $611;
   break;
  }
  default: {
  }
  }
 } while(0);
 $0 = 0;
 $625 = $0;
 STACKTOP = sp;return ($625|0);
}
function _IO_IntersectCalc($IOStart,$IOEnd,$MapStart,$MapEnd,$io_start_offset,$map_start_offset,$num_bytes) {
 $IOStart = $IOStart|0;
 $IOEnd = $IOEnd|0;
 $MapStart = $MapStart|0;
 $MapEnd = $MapEnd|0;
 $io_start_offset = $io_start_offset|0;
 $map_start_offset = $map_start_offset|0;
 $num_bytes = $num_bytes|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $IOStart;
 $2 = $IOEnd;
 $3 = $MapStart;
 $4 = $MapEnd;
 $5 = $io_start_offset;
 $6 = $map_start_offset;
 $7 = $num_bytes;
 $8 = $1;
 $9 = $3;
 $10 = ($8|0)>=($9|0);
 if ($10) {
  $11 = $2;
  $12 = $4;
  $13 = ($11|0)<=($12|0);
  if ($13) {
   $14 = $1;
   $15 = $5;
   HEAP32[$15>>2] = $14;
   $16 = $2;
   $17 = $1;
   $18 = (($16) - ($17))|0;
   $19 = $7;
   HEAP32[$19>>2] = $18;
   $20 = $1;
   $21 = $3;
   $22 = (($20) - ($21))|0;
   $23 = $6;
   HEAP32[$23>>2] = $22;
   $0 = 1;
   $80 = $0;
   STACKTOP = sp;return ($80|0);
  }
 }
 $24 = $3;
 $25 = $1;
 $26 = ($24|0)>=($25|0);
 if ($26) {
  $27 = $4;
  $28 = $2;
  $29 = ($27|0)<=($28|0);
  if ($29) {
   $30 = $3;
   $31 = $1;
   $32 = (($30) - ($31))|0;
   $33 = $5;
   HEAP32[$33>>2] = $32;
   $34 = $4;
   $35 = $3;
   $36 = (($34) - ($35))|0;
   $37 = $7;
   HEAP32[$37>>2] = $36;
   $38 = $1;
   $39 = $3;
   $40 = (($38) - ($39))|0;
   $41 = $6;
   HEAP32[$41>>2] = $40;
   $0 = 1;
   $80 = $0;
   STACKTOP = sp;return ($80|0);
  }
 }
 $42 = $1;
 $43 = $3;
 $44 = ($42|0)<=($43|0);
 if ($44) {
  $45 = $2;
  $46 = $3;
  $47 = ($45|0)>($46|0);
  if ($47) {
   $48 = $4;
   $49 = $2;
   $50 = ($48|0)>=($49|0);
   if ($50) {
    $51 = $3;
    $52 = $1;
    $53 = (($51) - ($52))|0;
    $54 = $5;
    HEAP32[$54>>2] = $53;
    $55 = $2;
    $56 = $3;
    $57 = (($55) - ($56))|0;
    $58 = $7;
    HEAP32[$58>>2] = $57;
    $59 = $3;
    $60 = $6;
    HEAP32[$60>>2] = $59;
    $0 = 1;
    $80 = $0;
    STACKTOP = sp;return ($80|0);
   }
  }
 }
 $61 = $3;
 $62 = $1;
 $63 = ($61|0)<=($62|0);
 if ($63) {
  $64 = $4;
  $65 = $1;
  $66 = ($64|0)>($65|0);
  if ($66) {
   $67 = $2;
   $68 = $4;
   $69 = ($67|0)>=($68|0);
   if ($69) {
    $70 = $1;
    $71 = $5;
    HEAP32[$71>>2] = $70;
    $72 = $4;
    $73 = $1;
    $74 = (($72) - ($73))|0;
    $75 = $7;
    HEAP32[$75>>2] = $74;
    $76 = $1;
    $77 = $3;
    $78 = (($76) - ($77))|0;
    $79 = $6;
    HEAP32[$79>>2] = $78;
    $0 = 1;
    $80 = $0;
    STACKTOP = sp;return ($80|0);
   }
  }
 }
 $0 = 0;
 $80 = $0;
 STACKTOP = sp;return ($80|0);
}
function _findIoIntersect($slot,$sect,$io_offset_long) {
 $slot = $slot|0;
 $sect = $sect|0;
 $io_offset_long = $io_offset_long|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $8 = 0, $9 = 0, $argee_var_addr = 0, $curr_io_elem_enc = 0, $curr_io_elem_ptr = 0, $i = 0, $io_var_addr = 0, $num_bytes = 0;
 var $num_io_elems = 0, $offset_in_block = 0, $ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $slot;
 $2 = $sect;
 $3 = $io_offset_long;
 $4 = $1;
 $5 = ($4*3)|0;
 $6 = $2;
 $7 = (($5) + ($6))|0;
 $8 = (658624 + ($7<<1)|0);
 $9 = HEAP16[$8>>1]|0;
 $curr_io_elem_enc = $9;
 $10 = HEAP16[658610>>1]|0;
 $11 = $10&65535;
 $12 = HEAP32[524296>>2]|0;
 $13 = (($12) + ($11)|0);
 $ptr = $13;
 $14 = $curr_io_elem_enc;
 $15 = $14&65535;
 $16 = $15 & 1023;
 $17 = $16&65535;
 $curr_io_elem_ptr = $17;
 $18 = $curr_io_elem_enc;
 $19 = $18&65535;
 $20 = $19 >> 10;
 $21 = $20 & 63;
 $22 = $21&255;
 $num_io_elems = $22;
 $23 = $curr_io_elem_enc;
 $24 = $23&65535;
 $25 = ($24|0)==(65535);
 if ($25) {
  $0 = -1;
  $73 = $0;
  STACKTOP = sp;return ($73|0);
 }
 $i = 0;
 while(1) {
  $26 = $i;
  $27 = $num_io_elems;
  $28 = $27&255;
  $29 = ($26|0)<($28|0);
  if (!($29)) {
   label = 9;
   break;
  }
  $30 = $curr_io_elem_ptr;
  $31 = $30&65535;
  $32 = $ptr;
  $33 = (($32) + ($31)|0);
  $34 = HEAP8[$33>>0]|0;
  $argee_var_addr = $34;
  $35 = $curr_io_elem_ptr;
  $36 = (($35) + 1)<<16>>16;
  $curr_io_elem_ptr = $36;
  $37 = $curr_io_elem_ptr;
  $38 = $37&65535;
  $39 = $ptr;
  $40 = (($39) + ($38)|0);
  $41 = HEAP8[$40>>0]|0;
  $io_var_addr = $41;
  $42 = $curr_io_elem_ptr;
  $43 = (($42) + 1)<<16>>16;
  $curr_io_elem_ptr = $43;
  $44 = $curr_io_elem_ptr;
  $45 = $44&65535;
  $46 = $ptr;
  $47 = (($46) + ($45)|0);
  $48 = HEAP8[$47>>0]|0;
  $num_bytes = $48;
  $49 = $curr_io_elem_ptr;
  $50 = (($49) + 1)<<16>>16;
  $curr_io_elem_ptr = $50;
  $51 = $3;
  $52 = $io_var_addr;
  $53 = $52&255;
  $54 = ($51|0)>=($53|0);
  if ($54) {
   $55 = $3;
   $56 = $io_var_addr;
   $57 = $56&255;
   $58 = $num_bytes;
   $59 = $58&255;
   $60 = (($59|0) / 4)&-1;
   $61 = (($57) + ($60))|0;
   $62 = ($55|0)<($61|0);
   if ($62) {
    label = 7;
    break;
   }
  }
  $71 = $i;
  $72 = (($71) + 1)|0;
  $i = $72;
 }
 if ((label|0) == 7) {
  $63 = $3;
  $64 = $io_var_addr;
  $65 = $64&255;
  $66 = (($63) - ($65))|0;
  $offset_in_block = $66;
  $67 = $argee_var_addr;
  $68 = $67&255;
  $69 = $offset_in_block;
  $70 = (($68) + ($69))|0;
  $0 = $70;
  $73 = $0;
  STACKTOP = sp;return ($73|0);
 }
 else if ((label|0) == 9) {
  $0 = -1;
  $73 = $0;
  STACKTOP = sp;return ($73|0);
 }
 return (0)|0;
}
function _disas_thumb2_insn() {
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0;
 var $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0;
 var $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0;
 var $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0;
 var $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0;
 var $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0;
 var $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0;
 var $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $addr = 0, $cond = 0, $cond1 = 0, $imm = 0, $insn = 0, $mask = 0, $num = 0, $offset = 0, $op = 0, $postinc = 0, $rd = 0, $redir = 0, $rm = 0, $rn = 0, $rs = 0, $shift = 0, $shifter_out1 = 0, $shiftop = 0, $tmp = 0, $tmp2 = 0;
 var $writeback = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = HEAP32[(525552)>>2]|0;
 $1 = (($0) - 2)|0;
 $2 = $1 & -2;
 $3 = $2;
 $4 = (_LE_UINT16_GET($3)|0);
 $5 = $4&65535;
 $6 = $5 << 16;
 $7 = HEAP32[(525552)>>2]|0;
 $8 = $7 & -2;
 $9 = $8;
 $10 = (_LE_UINT16_GET($9)|0);
 $11 = $10&65535;
 $12 = $6 | $11;
 $insn = $12;
 $13 = HEAP32[(525552)>>2]|0;
 $14 = (($13) + 2)|0;
 HEAP32[(525552)>>2] = $14;
 $15 = $insn;
 $16 = $15 >>> 16;
 $17 = $16 & 15;
 $rn = $17;
 $18 = $insn;
 $19 = $18 >>> 12;
 $20 = $19 & 15;
 $rs = $20;
 $21 = $insn;
 $22 = $21 >>> 8;
 $23 = $22 & 15;
 $rd = $23;
 $24 = $insn;
 $25 = $24 & 15;
 $rm = $25;
 $26 = $insn;
 $27 = $26 >>> 25;
 $28 = $27 & 15;
 switch ($28|0) {
 case 3: case 2: case 1: case 0:  {
  while(1) {
  }
  break;
 }
 case 4:  {
  while(1) {
  }
  break;
 }
 case 5:  {
  $29 = $insn;
  $30 = $29 >>> 21;
  $31 = $30 & 15;
  $op = $31;
  $32 = $rn;
  $33 = (525492 + ($32<<2)|0);
  $34 = HEAP32[$33>>2]|0;
  $tmp = $34;
  $35 = $rm;
  $36 = (525492 + ($35<<2)|0);
  $37 = HEAP32[$36>>2]|0;
  $tmp2 = $37;
  $38 = $insn;
  $39 = $38 >>> 4;
  $40 = $39 & 3;
  $shiftop = $40;
  $41 = $insn;
  $42 = $41 >>> 6;
  $43 = $42 & 3;
  $44 = $insn;
  $45 = $44 >>> 10;
  $46 = $45 & 28;
  $47 = $43 | $46;
  $shift = $47;
  $48 = $op;
  $49 = $tmp;
  $50 = $tmp2;
  $51 = $rd;
  (_gen_thumb2_data_op($48,$49,$50,$51)|0);
  STACKTOP = sp;return 0;
  break;
 }
 case 13:  {
  $52 = $insn;
  $53 = $52 >>> 22;
  $54 = $53 & 6;
  $55 = $insn;
  $56 = $55 >>> 7;
  $57 = $56 & 1;
  $58 = $54 | $57;
  $op = $58;
  $59 = $op;
  $60 = ($59|0)<(4);
  if ($60) {
   $61 = $insn;
   $62 = $61 & 61440;
   $63 = ($62|0)!=(61440);
   if ($63) {
    while(1) {
    }
   }
  }
  $64 = $op;
  switch ($64|0) {
  case 6: case 7:  {
   $96 = $insn;
   $97 = $96 >>> 4;
   $98 = $97 & 15;
   $99 = $insn;
   $100 = $99 >>> 16;
   $101 = $100 & 112;
   $102 = $98 | $101;
   $op = $102;
   $103 = $rn;
   $104 = (525492 + ($103<<2)|0);
   $105 = HEAP32[$104>>2]|0;
   $tmp = $105;
   $106 = $rm;
   $107 = (525492 + ($106<<2)|0);
   $108 = HEAP32[$107>>2]|0;
   $tmp2 = $108;
   $109 = $op;
   $110 = $109 & 80;
   $111 = ($110|0)==(16);
   if (!($111)) {
    while(1) {
    }
   }
   $112 = $tmp;
   $113 = $tmp2;
   $114 = (($112|0) / ($113|0))&-1;
   $tmp = $114;
   $115 = $tmp;
   $116 = $rd;
   $117 = (525492 + ($116<<2)|0);
   HEAP32[$117>>2] = $115;
   STACKTOP = sp;return 0;
   break;
  }
  case 4: case 5:  {
   $65 = $insn;
   $66 = $65 >>> 4;
   $67 = $66 & 15;
   $op = $67;
   $68 = $rn;
   $69 = (525492 + ($68<<2)|0);
   $70 = HEAP32[$69>>2]|0;
   $tmp = $70;
   $71 = $rm;
   $72 = (525492 + ($71<<2)|0);
   $73 = HEAP32[$72>>2]|0;
   $tmp2 = $73;
   $74 = $insn;
   $75 = $74 >>> 20;
   $76 = $75 & 7;
   $cond1 = ($76|0)==(0);
   do {
    if ($cond1) {
     $77 = $tmp;
     $78 = $tmp2;
     $79 = Math_imul($77, $78)|0;
     $tmp = $79;
     $80 = $rs;
     $81 = ($80|0)!=(15);
     if ($81) {
      $82 = $rs;
      $83 = (525492 + ($82<<2)|0);
      $84 = HEAP32[$83>>2]|0;
      $tmp2 = $84;
      $85 = $op;
      $86 = ($85|0)!=(0);
      if ($86) {
       $87 = $tmp2;
       $88 = $tmp;
       $89 = (($87) - ($88))|0;
       $tmp = $89;
       break;
      } else {
       $90 = $tmp;
       $91 = $tmp2;
       $92 = (($90) + ($91))|0;
       $tmp = $92;
       break;
      }
     }
    }
   } while(0);
   $93 = $tmp;
   $94 = $rd;
   $95 = (525492 + ($94<<2)|0);
   HEAP32[$95>>2] = $93;
   STACKTOP = sp;return 0;
   break;
  }
  default: {
   STACKTOP = sp;return 0;
  }
  }
  break;
 }
 case 15: case 14: case 7: case 6:  {
  $118 = $insn;
  $119 = $118 >>> 8;
  $120 = $119 & 14;
  $121 = ($120|0)==(10);
  if (!($121)) {
   while(1) {
   }
  }
  $122 = $insn;
  $123 = (_disas_vfp_insn($122)|0);
  $124 = ($123|0)!=(0);
  if ($124) {
   while(1) {
   }
  } else {
   STACKTOP = sp;return 0;
  }
  break;
 }
 case 11: case 10: case 9: case 8:  {
  $125 = $insn;
  $126 = $125 & 32768;
  $127 = ($126|0)!=(0);
  $128 = $insn;
  if ($127) {
   $129 = $128 & 20480;
   $130 = ($129|0)!=(0);
   $131 = $insn;
   if (!($130)) {
    STACKTOP = sp;return 0;
   }
   $132 = $131 << 5;
   $133 = $132 >> 9;
   $134 = $133 & -4096;
   $offset = $134;
   $135 = $insn;
   $136 = $135 & 2047;
   $137 = $136 << 1;
   $138 = $offset;
   $139 = $138 | $137;
   $offset = $139;
   $140 = $insn;
   $141 = $140 ^ -1;
   $142 = $141 & 8192;
   $143 = $142 << 10;
   $144 = $offset;
   $145 = $144 ^ $143;
   $offset = $145;
   $146 = $insn;
   $147 = $146 ^ -1;
   $148 = $147 & 2048;
   $149 = $148 << 11;
   $150 = $offset;
   $151 = $150 ^ $149;
   $offset = $151;
   $152 = $insn;
   $153 = $152 & 16384;
   $154 = ($153|0)!=(0);
   if ($154) {
    $155 = HEAP32[(525552)>>2]|0;
    $156 = $155 | 1;
    HEAP32[(525548)>>2] = $156;
   }
   $157 = HEAP32[(525552)>>2]|0;
   $158 = $offset;
   $159 = (($158) + ($157))|0;
   $offset = $159;
   $160 = $insn;
   $161 = $160 & 4096;
   $162 = ($161|0)!=(0);
   $163 = $offset;
   if (!($162)) {
    $177 = $163 & -3;
    $offset = $177;
    $178 = $offset;
    HEAP32[(525552)>>2] = $178;
    STACKTOP = sp;return 0;
   }
   $164 = HEAP32[524296>>2]|0;
   $165 = $164;
   $166 = ($163|0)<($165|0);
   $167 = $offset;
   if ($166) {
    $168 = HEAP32[524296>>2]|0;
    $169 = $168;
    $170 = (($167) - ($169))|0;
    $redir = $170;
    $171 = $redir;
    $172 = (Math_abs(($171|0))|0);
    $173 = (($172) + 1)|0;
    $174 = (($173|0) / 4)&-1;
    $175 = (($174) - 1)|0;
    $num = $175;
    $176 = $num;
    (_invokeBuiltInAsmCall($176)|0);
    STACKTOP = sp;return 0;
   } else {
    HEAP32[(525552)>>2] = $167;
    STACKTOP = sp;return 0;
   }
  }
  $179 = $128 & 33554432;
  $180 = ($179|0)!=(0);
  if (!($180)) {
   $shifter_out1 = 0;
   $320 = $insn;
   $321 = $320 & 67108864;
   $322 = $321 >>> 23;
   $323 = $insn;
   $324 = $323 & 28672;
   $325 = $324 >>> 12;
   $326 = $322 | $325;
   $shift = $326;
   $327 = $insn;
   $328 = $327 & 255;
   $imm = $328;
   $329 = $imm;
   $tmp2 = $329;
   $330 = $insn;
   $331 = $330 >>> 16;
   $332 = $331 & 15;
   $rn = $332;
   $333 = $rn;
   $334 = (525492 + ($333<<2)|0);
   $335 = HEAP32[$334>>2]|0;
   $tmp = $335;
   $336 = $insn;
   $337 = $336 >>> 21;
   $338 = $337 & 15;
   $op = $338;
   $339 = $op;
   $340 = $tmp;
   $341 = $tmp2;
   $342 = $rd;
   (_gen_thumb2_data_op($339,$340,$341,$342)|0);
   STACKTOP = sp;return 0;
  }
  $181 = $insn;
  $182 = $181 & 16777216;
  $183 = ($182|0)!=(0);
  $184 = $insn;
  if (!($183)) {
   $275 = $184 & 67108864;
   $276 = $275 >>> 15;
   $277 = $insn;
   $278 = $277 & 28672;
   $279 = $278 >>> 4;
   $280 = $276 | $279;
   $281 = $insn;
   $282 = $281 & 255;
   $283 = $280 | $282;
   $imm = $283;
   $284 = $insn;
   $285 = $284 & 4194304;
   $286 = ($285|0)!=(0);
   do {
    if ($286) {
     $287 = $insn;
     $288 = $287 >>> 4;
     $289 = $288 & 61440;
     $290 = $imm;
     $291 = $290 | $289;
     $imm = $291;
     $292 = $insn;
     $293 = $292 & 8388608;
     $294 = ($293|0)!=(0);
     if ($294) {
      $295 = $rd;
      $296 = (525492 + ($295<<2)|0);
      $297 = HEAP32[$296>>2]|0;
      $tmp = $297;
      $298 = $tmp;
      $299 = $298 & 65535;
      $tmp = $299;
      $300 = $imm;
      $301 = $300 << 16;
      $302 = $tmp;
      $303 = $302 | $301;
      $tmp = $303;
      break;
     } else {
      $304 = $imm;
      $tmp = $304;
      break;
     }
    } else {
     $305 = $rn;
     $306 = ($305|0)==(15);
     if (!($306)) {
      $307 = $rn;
      $308 = (525492 + ($307<<2)|0);
      $309 = HEAP32[$308>>2]|0;
      $tmp = $309;
      $310 = $insn;
      $311 = $310 & 8388608;
      $312 = ($311|0)!=(0);
      $313 = $tmp;
      $314 = $imm;
      if ($312) {
       $315 = (($313) - ($314))|0;
       $tmp = $315;
       break;
      } else {
       $316 = (($313) + ($314))|0;
       $tmp = $316;
       break;
      }
     }
    }
   } while(0);
   $317 = $tmp;
   $318 = $rd;
   $319 = (525492 + ($318<<2)|0);
   HEAP32[$319>>2] = $317;
   STACKTOP = sp;return 0;
  }
  $185 = $184 & 1048576;
  $186 = ($185|0)!=(0);
  if ($186) {
   while(1) {
   }
  }
  $187 = $insn;
  $188 = $187 >>> 21;
  $189 = $188 & 7;
  $op = $189;
  $190 = $insn;
  $191 = $190 & 31;
  $imm = $191;
  $192 = $insn;
  $193 = $192 >>> 6;
  $194 = $193 & 3;
  $195 = $insn;
  $196 = $195 >>> 10;
  $197 = $196 & 28;
  $198 = $194 | $197;
  $shift = $198;
  $199 = $rn;
  $200 = ($199|0)==(15);
  if ($200) {
   $tmp = 0;
  } else {
   $201 = $rn;
   $202 = (525492 + ($201<<2)|0);
   $203 = HEAP32[$202>>2]|0;
   $tmp = $203;
  }
  $204 = $op;
  switch ($204|0) {
  case 2:  {
   $205 = $imm;
   $206 = (($205) + 1)|0;
   $imm = $206;
   $207 = $shift;
   $208 = $imm;
   $209 = (($207) + ($208))|0;
   $210 = ($209>>>0)>(32);
   if ($210) {
    while(1) {
    }
   }
   $211 = $imm;
   $212 = ($211>>>0)<(32);
   if ($212) {
    $213 = $tmp;
    $214 = $shift;
    $215 = $213 >> $214;
    $216 = $imm;
    $217 = 1 << $216;
    $218 = (($217) - 1)|0;
    $219 = $215 & $218;
    $tmp = $219;
   }
   break;
  }
  case 6:  {
   $220 = $imm;
   $221 = (($220) + 1)|0;
   $imm = $221;
   $222 = $shift;
   $223 = $imm;
   $224 = (($222) + ($223))|0;
   $225 = ($224>>>0)>(32);
   if ($225) {
    while(1) {
    }
   }
   $226 = $imm;
   $227 = ($226>>>0)<(32);
   if ($227) {
    $228 = $tmp;
    $229 = $shift;
    $230 = $228 >> $229;
    $231 = $imm;
    $232 = 1 << $231;
    $233 = (($232) - 1)|0;
    $234 = $230 & $233;
    $tmp = $234;
   }
   break;
  }
  case 3:  {
   $235 = $imm;
   $236 = $shift;
   $237 = ($235>>>0)<($236>>>0);
   if ($237) {
    while(1) {
    }
   }
   $238 = $imm;
   $239 = (($238) + 1)|0;
   $240 = $shift;
   $241 = (($239) - ($240))|0;
   $imm = $241;
   $242 = $imm;
   $243 = ($242|0)!=(32);
   if ($243) {
    $244 = $rd;
    $245 = (525492 + ($244<<2)|0);
    $246 = HEAP32[$245>>2]|0;
    $tmp2 = $246;
    $247 = $imm;
    $248 = 1 << $247;
    $249 = (($248) - 1)|0;
    $250 = $249 ^ -1;
    $mask = $250;
    $251 = $mask;
    $252 = $shift;
    $253 = $251 << $252;
    $254 = $mask;
    $255 = $shift;
    $256 = (32 - ($255))|0;
    $257 = $254 >>> $256;
    $258 = $253 | $257;
    $mask = $258;
    $259 = $mask;
    $260 = $tmp2;
    $261 = $260 & $259;
    $tmp2 = $261;
    $262 = $tmp;
    $263 = $imm;
    $264 = 1 << $263;
    $265 = (($264) - 1)|0;
    $266 = $262 & $265;
    $267 = $shift;
    $268 = $266 << $267;
    $269 = $tmp2;
    $270 = $269 | $268;
    $tmp2 = $270;
    $271 = $tmp2;
    $tmp = $271;
   }
   break;
  }
  case 7:  {
   while(1) {
   }
   break;
  }
  default: {
  }
  }
  $272 = $tmp;
  $273 = $rd;
  $274 = (525492 + ($273<<2)|0);
  HEAP32[$274>>2] = $272;
  STACKTOP = sp;return 0;
  break;
 }
 case 12:  {
  $postinc = 0;
  $writeback = 0;
  $343 = $insn;
  $344 = $343 & 17825792;
  $345 = ($344|0)==(16777216);
  if ($345) {
   while(1) {
   }
  }
  $346 = $insn;
  $347 = $346 >>> 21;
  $348 = $347 & 3;
  $349 = $insn;
  $350 = $349 >>> 22;
  $351 = $350 & 4;
  $352 = $348 | $351;
  $op = $352;
  $353 = $rn;
  $354 = (525492 + ($353<<2)|0);
  $355 = HEAP32[$354>>2]|0;
  $addr = $355;
  $356 = $insn;
  $357 = $356 & 8388608;
  $358 = ($357|0)!=(0);
  $359 = $insn;
  do {
   if ($358) {
    $360 = $359 & 4095;
    $imm = $360;
    $361 = $addr;
    $362 = $imm;
    $363 = (($361) + ($362))|0;
    $addr = $363;
   } else {
    $364 = $359 & 255;
    $imm = $364;
    $365 = $insn;
    $366 = $365 >>> 8;
    $367 = $366 & 15;
    $cond = ($367|0)==(0);
    if (!($cond)) {
     while(1) {
     }
    }
    $368 = $insn;
    $369 = $368 >>> 4;
    $370 = $369 & 15;
    $shift = $370;
    $371 = $shift;
    $372 = ($371>>>0)>(3);
    if ($372) {
     while(1) {
     }
    } else {
     $373 = $rm;
     $374 = (525492 + ($373<<2)|0);
     $375 = HEAP32[$374>>2]|0;
     $tmp = $375;
     $376 = $addr;
     $377 = $tmp;
     $378 = (($376) + ($377))|0;
     $addr = $378;
     break;
    }
   }
  } while(0);
  $379 = $insn;
  $380 = $379 & 1048576;
  $381 = ($380|0)!=(0);
  if (!($381)) {
   $405 = $rs;
   $406 = (525492 + ($405<<2)|0);
   $407 = HEAP32[$406>>2]|0;
   $tmp = $407;
   $408 = $op;
   switch ($408|0) {
   case 0:  {
    $409 = $tmp;
    $410 = $409&255;
    $411 = $addr;
    $412 = $411;
    HEAP8[$412>>0] = $410;
    STACKTOP = sp;return 0;
    break;
   }
   case 1:  {
    $413 = $tmp;
    $414 = $413&65535;
    $415 = $addr;
    $416 = $415;
    HEAP16[$416>>1] = $414;
    STACKTOP = sp;return 0;
    break;
   }
   case 2:  {
    $417 = $tmp;
    $418 = $addr;
    $419 = $418;
    HEAP32[$419>>2] = $417;
    STACKTOP = sp;return 0;
    break;
   }
   default: {
    while(1) {
    }
   }
   }
  }
  $tmp = 0;
  $382 = $op;
  switch ($382|0) {
  case 0:  {
   $383 = $addr;
   $384 = $383;
   $385 = HEAP8[$384>>0]|0;
   $386 = $385&255;
   $tmp = $386;
   break;
  }
  case 4:  {
   $387 = $addr;
   $388 = $387;
   $389 = HEAP8[$388>>0]|0;
   $390 = $389 << 24 >> 24;
   $tmp = $390;
   break;
  }
  case 1:  {
   $391 = $addr;
   $392 = $391;
   $393 = HEAP16[$392>>1]|0;
   $394 = $393&65535;
   $tmp = $394;
   break;
  }
  case 5:  {
   $395 = $addr;
   $396 = $395;
   $397 = HEAP16[$396>>1]|0;
   $398 = $397 << 16 >> 16;
   $tmp = $398;
   break;
  }
  case 2:  {
   $399 = $addr;
   $400 = $399;
   $401 = HEAP32[$400>>2]|0;
   $tmp = $401;
   break;
  }
  default: {
   while(1) {
   }
  }
  }
  $402 = $tmp;
  $403 = $rs;
  $404 = (525492 + ($403<<2)|0);
  HEAP32[$404>>2] = $402;
  STACKTOP = sp;return 0;
  break;
 }
 default: {
  while(1) {
  }
 }
 }
 return (0)|0;
}
function _gen_thumb2_data_op($op,$t0,$t1,$dest) {
 $op = $op|0;
 $t0 = $t0|0;
 $t1 = $t1|0;
 $dest = $dest|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $logic_cc = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $op;
 $1 = $t0;
 $2 = $t1;
 $3 = $dest;
 $logic_cc = 0;
 $4 = $0;
 do {
  switch ($4|0) {
  case 0:  {
   $5 = $1;
   $6 = $2;
   $7 = $5 & $6;
   $8 = $3;
   $9 = (525492 + ($8<<2)|0);
   HEAP32[$9>>2] = $7;
   STACKTOP = sp;return 0;
   break;
  }
  case 1:  {
   while(1) {
   }
   break;
  }
  case 2:  {
   $10 = $1;
   $11 = $2;
   $12 = $10 | $11;
   $13 = $3;
   $14 = (525492 + ($13<<2)|0);
   HEAP32[$14>>2] = $12;
   STACKTOP = sp;return 0;
   break;
  }
  case 3:  {
   while(1) {
   }
   break;
  }
  case 4:  {
   while(1) {
   }
   break;
  }
  case 8:  {
   $15 = $1;
   $16 = $2;
   $17 = (($15) + ($16))|0;
   $18 = $3;
   $19 = (525492 + ($18<<2)|0);
   HEAP32[$19>>2] = $17;
   STACKTOP = sp;return 0;
   break;
  }
  case 10:  {
   while(1) {
   }
   break;
  }
  case 11:  {
   while(1) {
   }
   break;
  }
  case 13:  {
   $20 = $1;
   $21 = $2;
   $22 = (($20) - ($21))|0;
   $23 = $3;
   $24 = (525492 + ($23<<2)|0);
   HEAP32[$24>>2] = $22;
   STACKTOP = sp;return 0;
   break;
  }
  case 14:  {
   while(1) {
   }
   break;
  }
  default: {
   while(1) {
   }
  }
  }
 } while(0);
 return (0)|0;
}
function _disas_vfp_insn($insn) {
 $insn = $insn|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0.0, $101 = 0, $102 = 0, $103 = 0.0, $104 = 0, $105 = 0.0, $106 = 0, $107 = 0, $108 = 0.0, $109 = 0, $11 = 0, $110 = 0.0, $111 = 0.0, $112 = 0.0, $113 = 0.0, $114 = 0.0, $115 = 0.0;
 var $116 = 0.0, $117 = 0.0, $118 = 0.0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0.0, $124 = 0.0, $125 = 0.0, $126 = 0, $127 = 0.0, $128 = 0.0, $129 = 0.0, $13 = 0, $130 = 0.0, $131 = 0.0, $132 = 0.0, $133 = 0.0;
 var $134 = 0.0, $135 = 0.0, $136 = 0.0, $137 = 0.0, $138 = 0.0, $139 = 0.0, $14 = 0, $140 = 0.0, $141 = 0.0, $142 = 0.0, $143 = 0.0, $144 = 0.0, $145 = 0.0, $146 = 0.0, $147 = 0.0, $148 = 0.0, $149 = 0.0, $15 = 0, $150 = 0.0, $151 = 0.0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0.0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0.0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0;
 var $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0;
 var $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0;
 var $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0.0, $253 = 0.0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0;
 var $260 = 0, $261 = 0, $262 = 0.0, $263 = 0.0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0;
 var $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $3 = 0, $30 = 0, $31 = 0;
 var $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0;
 var $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0;
 var $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0;
 var $87 = 0, $88 = 0.0, $89 = 0, $9 = 0, $90 = 0, $91 = 0.0, $92 = 0, $93 = 0, $94 = 0.0, $95 = 0, $96 = 0, $97 = 0.0, $98 = 0, $99 = 0, $F0 = 0, $F1 = 0.0, $addr = 0, $bank_mask = 0, $delta_d = 0, $delta_m = 0;
 var $dp = 0, $i = 0, $n = 0, $offset = 0, $op = 0, $or$cond = 0, $or$cond11 = 0, $or$cond13 = 0, $or$cond3 = 0, $or$cond5 = 0, $or$cond7 = 0, $rd = 0, $rm = 0, $rn = 0, $tmp = 0, $tmp1 = 0, $veclen = 0, $w = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $F0 = sp + 12|0;
 $tmp1 = sp + 4|0;
 $1 = $insn;
 $2 = $1;
 $3 = $2 & 3840;
 $4 = ($3|0)==(2816);
 $5 = $4&1;
 $dp = $5;
 $6 = $1;
 $7 = $6 >>> 24;
 $8 = $7 & 15;
 L1: do {
  switch ($8|0) {
  case 14:  {
   $9 = $1;
   $10 = $9 & 16;
   $11 = ($10|0)!=(0);
   $12 = $1;
   if ($11) {
    $13 = $12 >>> 12;
    $14 = $13 & 15;
    $rd = $14;
    $15 = $dp;
    $16 = ($15|0)!=(0);
    if ($16) {
     while(1) {
     }
    }
    $17 = $1;
    $18 = $17 >>> 15;
    $19 = $18 & 30;
    $20 = $1;
    $21 = $20 >>> 7;
    $22 = $21 & 1;
    $23 = $19 | $22;
    $rn = $23;
    $24 = $1;
    $25 = $24 & 1048576;
    $26 = ($25|0)!=(0);
    $27 = $rd;
    if (!($26)) {
     $35 = (525492 + ($27<<2)|0);
     $36 = HEAP32[$35>>2]|0;
     $tmp = $36;
     $37 = $rd;
     $38 = (525492 + ($37<<2)|0);
     $39 = +HEAPF32[$38>>2];
     $40 = $rn;
     $41 = (526336 + ($40<<2)|0);
     HEAPF32[$41>>2] = $39;
     break L1;
    }
    $28 = ($27|0)!=(15);
    if (!($28)) {
     break L1;
    }
    $29 = $rn;
    $30 = (526336 + ($29<<2)|0);
    $31 = HEAP32[$30>>2]|0;
    $tmp = $31;
    $32 = $tmp;
    $33 = $rd;
    $34 = (525492 + ($33<<2)|0);
    HEAP32[$34>>2] = $32;
    break L1;
   }
   $42 = $12 >>> 20;
   $43 = $42 & 8;
   $44 = $1;
   $45 = $44 >>> 19;
   $46 = $45 & 6;
   $47 = $43 | $46;
   $48 = $1;
   $49 = $48 >>> 6;
   $50 = $49 & 1;
   $51 = $47 | $50;
   $op = $51;
   $52 = $1;
   $53 = $52 >>> 15;
   $54 = $53 & 30;
   $55 = $1;
   $56 = $55 >>> 7;
   $57 = $56 & 1;
   $58 = $54 | $57;
   $rn = $58;
   $59 = $op;
   $60 = ($59|0)==(15);
   $61 = $rn;
   $62 = ($61|0)==(15);
   $or$cond = $60 & $62;
   $63 = $1;
   do {
    if ($or$cond) {
     $64 = $63 & 4194304;
     $65 = ($64|0)!=(0);
     if (!($65)) {
      $66 = $1;
      $67 = $66 >>> 12;
      $68 = $67 & 15;
      $rd = $68;
      break;
     }
     $0 = 1;
     $293 = $0;
     STACKTOP = sp;return ($293|0);
    } else {
     $69 = $63 >>> 11;
     $70 = $69 & 30;
     $71 = $1;
     $72 = $71 >>> 22;
     $73 = $72 & 1;
     $74 = $70 | $73;
     $rd = $74;
    }
   } while(0);
   $75 = $1;
   $76 = $75 << 1;
   $77 = $76 & 30;
   $78 = $1;
   $79 = $78 >>> 5;
   $80 = $79 & 1;
   $81 = $77 | $80;
   $rm = $81;
   $veclen = 0;
   $delta_m = 0;
   $delta_d = 0;
   $bank_mask = 0;
   $82 = $op;
   $83 = ($82|0)==(15);
   $84 = $rn;
   L24: do {
    if ($83) {
     switch ($84|0) {
     case 17: case 16:  {
      $85 = $rm;
      $86 = (526336 + ($85<<2)|0);
      $87 = HEAP32[$86>>2]|0;
      $88 = (+($87|0));
      $F1 = $88;
      break L24;
      break;
     }
     case 9: case 8:  {
      $89 = $rd;
      $90 = (526336 + ($89<<2)|0);
      $91 = +HEAPF32[$90>>2];
      HEAPF32[$F0>>2] = $91;
      $92 = $rm;
      $93 = (526336 + ($92<<2)|0);
      $94 = +HEAPF32[$93>>2];
      $F1 = $94;
      break L24;
      break;
     }
     case 11: case 10:  {
      $95 = $rd;
      $96 = (526336 + ($95<<2)|0);
      $97 = +HEAPF32[$96>>2];
      HEAPF32[$F0>>2] = $97;
      $F1 = 0.0;
      break L24;
      break;
     }
     case 31: case 30: case 29: case 28: case 23: case 22: case 21: case 20:  {
      $98 = $rd;
      $99 = (526336 + ($98<<2)|0);
      $100 = +HEAPF32[$99>>2];
      HEAPF32[$F0>>2] = $100;
      break L24;
      break;
     }
     default: {
      $101 = $rm;
      $102 = (526336 + ($101<<2)|0);
      $103 = +HEAPF32[$102>>2];
      HEAPF32[$F0>>2] = $103;
      break L24;
     }
     }
    } else {
     $104 = (526336 + ($84<<2)|0);
     $105 = +HEAPF32[$104>>2];
     HEAPF32[$F0>>2] = $105;
     $106 = $rm;
     $107 = (526336 + ($106<<2)|0);
     $108 = +HEAPF32[$107>>2];
     $F1 = $108;
    }
   } while(0);
   L33: while(1) {
    $109 = $op;
    L35: do {
     switch ($109|0) {
     case 4:  {
      $110 = +HEAPF32[$F0>>2];
      $111 = $F1;
      $112 = $110 * $111;
      HEAPF32[$F0>>2] = $112;
      break;
     }
     case 5:  {
      $113 = +HEAPF32[$F0>>2];
      $114 = $F1;
      $115 = $113 * $114;
      $116 = -$115;
      HEAPF32[$F0>>2] = $116;
      break;
     }
     case 6:  {
      $117 = +HEAPF32[$F0>>2];
      $118 = $F1;
      $119 = $117 + $118;
      HEAPF32[$F0>>2] = $119;
      break;
     }
     case 7:  {
      $120 = +HEAPF32[$F0>>2];
      $121 = $F1;
      $122 = $120 - $121;
      HEAPF32[$F0>>2] = $122;
      break;
     }
     case 8:  {
      $123 = +HEAPF32[$F0>>2];
      $124 = $F1;
      $125 = $123 / $124;
      HEAPF32[$F0>>2] = $125;
      break;
     }
     case 15: case 14:  {
      $126 = $rn;
      switch ($126|0) {
      case 31: case 30: case 29: case 28: case 25: case 24: case 23: case 22: case 21: case 20: case 16: case 15: case 14: case 13: case 12: case 11: case 10: case 7: case 6: case 5: case 4: case 0:  {
       break L35;
       break;
      }
      case 1:  {
       $127 = +HEAPF32[$F0>>2];
       $128 = $127;
       $129 = (+Math_abs((+$128)));
       $130 = $129;
       HEAPF32[$F0>>2] = $130;
       break L35;
       break;
      }
      case 2:  {
       $131 = +HEAPF32[$F0>>2];
       $132 = -$131;
       HEAPF32[$F0>>2] = $132;
       break L35;
       break;
      }
      case 3:  {
       $133 = +HEAPF32[$F0>>2];
       $134 = $133;
       $135 = (+Math_sqrt((+$134)));
       $136 = $135;
       HEAPF32[$F0>>2] = $136;
       break L35;
       break;
      }
      case 8:  {
       $137 = +HEAPF32[$F0>>2];
       $138 = $F1;
       (+_f_exec_cmp($137,$138));
       break L35;
       break;
      }
      case 9:  {
       $139 = +HEAPF32[$F0>>2];
       $140 = $F1;
       (+_f_exec_cmp($139,$140));
       break L35;
       break;
      }
      case 17:  {
       $141 = $F1;
       $142 = $141;
       $143 = $142 + 0.0;
       $144 = $143;
       HEAPF32[$F0>>2] = $144;
       break L35;
       break;
      }
      case 26:  {
       $145 = $F1;
       $146 = $145;
       $147 = (+Math_floor((+$146)));
       $148 = $147;
       HEAPF32[$F0>>2] = $148;
       break L35;
       break;
      }
      case 27:  {
       $149 = +HEAPF32[$F0>>2];
       $150 = $149;
       $151 = (+Math_floor((+$150)));
       $152 = (~~(($151)));
       HEAP32[$tmp1>>2] = $152;
       ;HEAP32[$F0>>2]=HEAP32[$tmp1>>2]|0;
       break L35;
       break;
      }
      default: {
       label = 37;
       break L33;
      }
      }
      break;
     }
     default: {
      label = 38;
      break L33;
     }
     }
    } while(0);
    $153 = $op;
    $154 = ($153|0)==(15);
    $155 = $rn;
    $156 = ($155>>>0)>=(8);
    $or$cond3 = $154 & $156;
    $157 = $rn;
    $158 = ($157>>>0)<=(11);
    $or$cond5 = $or$cond3 & $158;
    L52: do {
     if (!($or$cond5)) {
      $159 = $op;
      $160 = ($159|0)==(15);
      $161 = $dp;
      $162 = ($161|0)!=(0);
      $or$cond7 = $160 & $162;
      do {
       if ($or$cond7) {
        $163 = $rn;
        $164 = $163 & 28;
        $165 = ($164|0)==(24);
        if (!($165)) {
         $166 = $rn;
         $167 = $166 & 30;
         $168 = ($167|0)==(6);
         if (!($168)) {
          break;
         }
        }
        $169 = +HEAPF32[$F0>>2];
        $170 = $rd;
        $171 = (526336 + ($170<<2)|0);
        HEAPF32[$171>>2] = $169;
        break L52;
       }
      } while(0);
      $172 = +HEAPF32[$F0>>2];
      $173 = $rd;
      $174 = (526336 + ($173<<2)|0);
      HEAPF32[$174>>2] = $172;
     }
    } while(0);
    $175 = $veclen;
    $176 = ($175|0)==(0);
    if ($176) {
     break L1;
    }
   }
   if ((label|0) == 37) {
    while(1) {
     label = 0;
     label = 37;
    }
   }
   else if ((label|0) == 38) {
    while(1) {
     label = 0;
     label = 38;
    }
   }
   break;
  }
  case 13: case 12:  {
   $177 = $1;
   $178 = $177 & 65011712;
   $179 = ($178|0)==(4194304);
   if (!($179)) {
    $180 = $1;
    $181 = $180 >>> 16;
    $182 = $181 & 15;
    $rn = $182;
    $183 = $dp;
    $184 = ($183|0)!=(0);
    $185 = $1;
    do {
     if ($184) {
      $186 = $185 & 4194304;
      $187 = ($186|0)!=(0);
      if (!($187)) {
       $188 = $1;
       $189 = $188 >>> 12;
       $190 = $189 & 15;
       $rd = $190;
       break;
      }
      $0 = 1;
      $293 = $0;
      STACKTOP = sp;return ($293|0);
     } else {
      $191 = $185 >>> 11;
      $192 = $191 & 30;
      $193 = $1;
      $194 = $193 >>> 22;
      $195 = $194 & 1;
      $196 = $192 | $195;
      $rd = $196;
     }
    } while(0);
    $197 = $1;
    $198 = $197 & 18874368;
    $199 = ($198|0)==(16777216);
    if (!($199)) {
     $200 = $1;
     $201 = $200 & 2097152;
     $w = $201;
     $202 = $dp;
     $203 = ($202|0)!=(0);
     $204 = $1;
     if ($203) {
      $205 = $204 >>> 1;
      $206 = $205 & 127;
      $n = $206;
     } else {
      $207 = $204 & 255;
      $n = $207;
     }
     $208 = $w;
     $209 = ($208|0)!=(0);
     if ($209) {
      $210 = $1;
      $211 = $210 >>> 23;
      $212 = $1;
      $213 = $212 >>> 24;
      $214 = $211 ^ $213;
      $215 = $214 & 1;
      $216 = ($215|0)!=(0);
      if (!($216)) {
       while(1) {
       }
      }
     }
     $217 = $n;
     $218 = ($217|0)==(0);
     if (!($218)) {
      $219 = $rd;
      $220 = $n;
      $221 = (($219) + ($220))|0;
      $222 = ($221>>>0)>(32);
      if (!($222)) {
       $223 = $dp;
       $224 = ($223|0)!=(0);
       $225 = $n;
       $226 = ($225>>>0)>(16);
       $or$cond11 = $224 & $226;
       if (!($or$cond11)) {
        $227 = $rn;
        $228 = ($227|0)==(15);
        $229 = $w;
        $230 = ($229|0)!=(0);
        $or$cond13 = $228 & $230;
        if ($or$cond13) {
         while(1) {
         }
        }
        $231 = $rn;
        $232 = (525492 + ($231<<2)|0);
        $233 = HEAP32[$232>>2]|0;
        $addr = $233;
        $234 = $1;
        $235 = $234 & 16777216;
        $236 = ($235|0)!=(0);
        if ($236) {
         $237 = $addr;
         $238 = $1;
         $239 = $238 & 255;
         $240 = $239 << 2;
         $241 = (($237) - ($240))|0;
         $addr = $241;
        }
        $242 = $dp;
        $243 = ($242|0)!=(0);
        if ($243) {
         $offset = 8;
        } else {
         $offset = 4;
        }
        $i = 0;
        while(1) {
         $244 = $i;
         $245 = $n;
         $246 = ($244>>>0)<($245>>>0);
         if (!($246)) {
          break;
         }
         $247 = $1;
         $248 = $247 & 1048576;
         $249 = ($248|0)!=(0);
         if ($249) {
          $250 = $addr;
          $251 = $250;
          $252 = +HEAPF32[$251>>2];
          HEAPF32[$F0>>2] = $252;
          $253 = +HEAPF32[$F0>>2];
          $254 = $rd;
          $255 = $i;
          $256 = (($254) + ($255))|0;
          $257 = (526336 + ($256<<2)|0);
          HEAPF32[$257>>2] = $253;
         } else {
          $258 = $rd;
          $259 = $i;
          $260 = (($258) + ($259))|0;
          $261 = (526336 + ($260<<2)|0);
          $262 = +HEAPF32[$261>>2];
          HEAPF32[$F0>>2] = $262;
          $263 = +HEAPF32[$F0>>2];
          $264 = $addr;
          $265 = $264;
          HEAPF32[$265>>2] = $263;
         }
         $266 = $addr;
         $267 = $offset;
         $268 = (($266) + ($267))|0;
         $addr = $268;
         $269 = $i;
         $270 = (($269) + 1)|0;
         $i = $270;
        }
        $271 = $w;
        $272 = ($271|0)!=(0);
        if (!($272)) {
         break L1;
        }
        $273 = $1;
        $274 = $273 & 16777216;
        $275 = ($274|0)!=(0);
        do {
         if ($275) {
          $276 = $offset;
          $277 = (0 - ($276))|0;
          $278 = $n;
          $279 = Math_imul($277, $278)|0;
          $offset = $279;
         } else {
          $280 = $dp;
          $281 = ($280|0)!=(0);
          if ($281) {
           $282 = $1;
           $283 = $282 & 1;
           $284 = ($283|0)!=(0);
           if ($284) {
            $offset = 4;
            break;
           }
          }
          $offset = 0;
         }
        } while(0);
        $285 = $offset;
        $286 = ($285|0)!=(0);
        if ($286) {
         $287 = $addr;
         $288 = $offset;
         $289 = (($287) + ($288))|0;
         $addr = $289;
        }
        $290 = $addr;
        $291 = $rn;
        $292 = (525492 + ($291<<2)|0);
        HEAP32[$292>>2] = $290;
        break L1;
       }
      }
     }
     while(1) {
     }
    }
   }
   break;
  }
  default: {
   while(1) {
   }
  }
  }
 } while(0);
 $0 = 0;
 $293 = $0;
 STACKTOP = sp;return ($293|0);
}
function _isspace($c) {
 $c = $c|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($c|0)==(32);
 $1 = (($c) + -9)|0;
 $2 = ($1>>>0)<(5);
 $3 = $0 | $2;
 $4 = $3&1;
 return ($4|0);
}
function ___errno_location() {
 var $$0 = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[526464>>2]|0;
 $1 = ($0|0)==(0|0);
 if ($1) {
  $$0 = 526508;
 } else {
  $2 = (_pthread_self()|0);
  $3 = ((($2)) + 60|0);
  $4 = HEAP32[$3>>2]|0;
  $$0 = $4;
 }
 return ($$0|0);
}
function ___intscan($f,$base,$pok,$0,$1) {
 $f = $f|0;
 $base = $base|0;
 $pok = $pok|0;
 $0 = $0|0;
 $1 = $1|0;
 var $$1 = 0, $$122 = 0, $$123 = 0, $$base21 = 0, $$lcssa = 0, $$lcssa130 = 0, $$lcssa131 = 0, $$lcssa132 = 0, $$lcssa133 = 0, $$lcssa134 = 0, $$lcssa135 = 0, $$sum = 0, $$sum14 = 0, $$sum1445 = 0, $$sum15 = 0, $$sum16 = 0, $$sum17 = 0, $$sum18 = 0, $$sum1865 = 0, $$sum19 = 0;
 var $$sum20 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0;
 var $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0;
 var $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0;
 var $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0;
 var $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0;
 var $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0;
 var $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0;
 var $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0;
 var $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0;
 var $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0;
 var $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $3 = 0, $30 = 0;
 var $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0;
 var $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0;
 var $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0;
 var $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $c$0 = 0, $c$1 = 0, $c$124 = 0, $c$2$be = 0, $c$2$be$lcssa = 0;
 var $c$2$lcssa = 0, $c$3$be = 0, $c$3$lcssa = 0, $c$371 = 0, $c$4$be = 0, $c$4$be$lcssa = 0, $c$4$lcssa = 0, $c$5$be = 0, $c$6$be = 0, $c$6$be$lcssa = 0, $c$6$lcssa = 0, $c$7$be = 0, $c$753 = 0, $c$8 = 0, $c$9$be = 0, $neg$0 = 0, $neg$0$ = 0, $neg$1 = 0, $or$cond = 0, $or$cond12 = 0;
 var $or$cond40 = 0, $or$cond5 = 0, $or$cond7 = 0, $x$082 = 0, $x$146 = 0, $x$266 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($base>>>0)>(36);
 L1: do {
  if ($2) {
   $5 = (___errno_location()|0);
   HEAP32[$5>>2] = 22;
   $286 = 0;$287 = 0;
  } else {
   $3 = ((($f)) + 4|0);
   $4 = ((($f)) + 100|0);
   while(1) {
    $6 = HEAP32[$3>>2]|0;
    $7 = HEAP32[$4>>2]|0;
    $8 = ($6>>>0)<($7>>>0);
    if ($8) {
     $9 = ((($6)) + 1|0);
     HEAP32[$3>>2] = $9;
     $10 = HEAP8[$6>>0]|0;
     $11 = $10&255;
     $13 = $11;
    } else {
     $12 = (___shgetc($f)|0);
     $13 = $12;
    }
    $14 = (_isspace($13)|0);
    $15 = ($14|0)==(0);
    if ($15) {
     $$lcssa135 = $13;
     break;
    }
   }
   $16 = ($$lcssa135|0)==(45);
   L11: do {
    switch ($$lcssa135|0) {
    case 43: case 45:  {
     $17 = $16 << 31 >> 31;
     $18 = HEAP32[$3>>2]|0;
     $19 = HEAP32[$4>>2]|0;
     $20 = ($18>>>0)<($19>>>0);
     if ($20) {
      $21 = ((($18)) + 1|0);
      HEAP32[$3>>2] = $21;
      $22 = HEAP8[$18>>0]|0;
      $23 = $22&255;
      $c$0 = $23;$neg$0 = $17;
      break L11;
     } else {
      $24 = (___shgetc($f)|0);
      $c$0 = $24;$neg$0 = $17;
      break L11;
     }
     break;
    }
    default: {
     $c$0 = $$lcssa135;$neg$0 = 0;
    }
    }
   } while(0);
   $25 = ($base|0)==(0);
   $26 = $base & -17;
   $27 = ($26|0)==(0);
   $28 = ($c$0|0)==(48);
   $or$cond5 = $27 & $28;
   do {
    if ($or$cond5) {
     $29 = HEAP32[$3>>2]|0;
     $30 = HEAP32[$4>>2]|0;
     $31 = ($29>>>0)<($30>>>0);
     if ($31) {
      $32 = ((($29)) + 1|0);
      HEAP32[$3>>2] = $32;
      $33 = HEAP8[$29>>0]|0;
      $34 = $33&255;
      $37 = $34;
     } else {
      $35 = (___shgetc($f)|0);
      $37 = $35;
     }
     $36 = $37 | 32;
     $38 = ($36|0)==(120);
     if (!($38)) {
      if ($25) {
       $$123 = 8;$c$124 = $37;
       label = 46;
       break;
      } else {
       $$1 = $base;$c$1 = $37;
       label = 32;
       break;
      }
     }
     $39 = HEAP32[$3>>2]|0;
     $40 = HEAP32[$4>>2]|0;
     $41 = ($39>>>0)<($40>>>0);
     if ($41) {
      $42 = ((($39)) + 1|0);
      HEAP32[$3>>2] = $42;
      $43 = HEAP8[$39>>0]|0;
      $44 = $43&255;
      $46 = $44;
     } else {
      $45 = (___shgetc($f)|0);
      $46 = $45;
     }
     $$sum20 = (($46) + 1)|0;
     $47 = (1184390 + ($$sum20)|0);
     $48 = HEAP8[$47>>0]|0;
     $49 = ($48&255)>(15);
     if ($49) {
      $50 = HEAP32[$4>>2]|0;
      $51 = ($50|0)==(0|0);
      if (!($51)) {
       $52 = HEAP32[$3>>2]|0;
       $53 = ((($52)) + -1|0);
       HEAP32[$3>>2] = $53;
      }
      $54 = ($pok|0)==(0);
      if ($54) {
       ___shlim($f,0);
       $286 = 0;$287 = 0;
       break L1;
      }
      if ($51) {
       $286 = 0;$287 = 0;
       break L1;
      }
      $55 = HEAP32[$3>>2]|0;
      $56 = ((($55)) + -1|0);
      HEAP32[$3>>2] = $56;
      $286 = 0;$287 = 0;
      break L1;
     } else {
      $$123 = 16;$c$124 = $46;
      label = 46;
     }
    } else {
     $$base21 = $25 ? 10 : $base;
     $$sum = (($c$0) + 1)|0;
     $57 = (1184390 + ($$sum)|0);
     $58 = HEAP8[$57>>0]|0;
     $59 = $58&255;
     $60 = ($59>>>0)<($$base21>>>0);
     if ($60) {
      $$1 = $$base21;$c$1 = $c$0;
      label = 32;
     } else {
      $61 = HEAP32[$4>>2]|0;
      $62 = ($61|0)==(0|0);
      if (!($62)) {
       $63 = HEAP32[$3>>2]|0;
       $64 = ((($63)) + -1|0);
       HEAP32[$3>>2] = $64;
      }
      ___shlim($f,0);
      $65 = (___errno_location()|0);
      HEAP32[$65>>2] = 22;
      $286 = 0;$287 = 0;
      break L1;
     }
    }
   } while(0);
   if ((label|0) == 32) {
    $66 = ($$1|0)==(10);
    if ($66) {
     $67 = (($c$1) + -48)|0;
     $68 = ($67>>>0)<(10);
     if ($68) {
      $71 = $67;$x$082 = 0;
      while(1) {
       $69 = ($x$082*10)|0;
       $70 = (($69) + ($71))|0;
       $72 = HEAP32[$3>>2]|0;
       $73 = HEAP32[$4>>2]|0;
       $74 = ($72>>>0)<($73>>>0);
       if ($74) {
        $75 = ((($72)) + 1|0);
        HEAP32[$3>>2] = $75;
        $76 = HEAP8[$72>>0]|0;
        $77 = $76&255;
        $c$2$be = $77;
       } else {
        $78 = (___shgetc($f)|0);
        $c$2$be = $78;
       }
       $79 = (($c$2$be) + -48)|0;
       $80 = ($79>>>0)<(10);
       $81 = ($70>>>0)<(429496729);
       $82 = $80 & $81;
       if ($82) {
        $71 = $79;$x$082 = $70;
       } else {
        $$lcssa134 = $70;$c$2$be$lcssa = $c$2$be;
        break;
       }
      }
      $288 = $$lcssa134;$289 = 0;$c$2$lcssa = $c$2$be$lcssa;
     } else {
      $288 = 0;$289 = 0;$c$2$lcssa = $c$1;
     }
     $83 = (($c$2$lcssa) + -48)|0;
     $84 = ($83>>>0)<(10);
     if ($84) {
      $85 = $288;$86 = $289;$89 = $83;$c$371 = $c$2$lcssa;
      while(1) {
       $87 = (___muldi3(($85|0),($86|0),10,0)|0);
       $88 = tempRet0;
       $90 = ($89|0)<(0);
       $91 = $90 << 31 >> 31;
       $92 = $89 ^ -1;
       $93 = $91 ^ -1;
       $94 = ($88>>>0)>($93>>>0);
       $95 = ($87>>>0)>($92>>>0);
       $96 = ($88|0)==($93|0);
       $97 = $96 & $95;
       $98 = $94 | $97;
       if ($98) {
        $$lcssa = $89;$290 = $85;$291 = $86;$c$3$lcssa = $c$371;
        break;
       }
       $99 = (_i64Add(($87|0),($88|0),($89|0),($91|0))|0);
       $100 = tempRet0;
       $101 = HEAP32[$3>>2]|0;
       $102 = HEAP32[$4>>2]|0;
       $103 = ($101>>>0)<($102>>>0);
       if ($103) {
        $104 = ((($101)) + 1|0);
        HEAP32[$3>>2] = $104;
        $105 = HEAP8[$101>>0]|0;
        $106 = $105&255;
        $c$3$be = $106;
       } else {
        $107 = (___shgetc($f)|0);
        $c$3$be = $107;
       }
       $108 = (($c$3$be) + -48)|0;
       $109 = ($108>>>0)<(10);
       $110 = ($100>>>0)<(429496729);
       $111 = ($99>>>0)<(2576980378);
       $112 = ($100|0)==(429496729);
       $113 = $112 & $111;
       $114 = $110 | $113;
       $or$cond7 = $109 & $114;
       if ($or$cond7) {
        $85 = $99;$86 = $100;$89 = $108;$c$371 = $c$3$be;
       } else {
        $$lcssa = $108;$290 = $99;$291 = $100;$c$3$lcssa = $c$3$be;
        break;
       }
      }
      $115 = ($$lcssa>>>0)>(9);
      if ($115) {
       $259 = $291;$261 = $290;$neg$1 = $neg$0;
      } else {
       $$122 = 10;$292 = $290;$293 = $291;$c$8 = $c$3$lcssa;
       label = 72;
      }
     } else {
      $259 = $289;$261 = $288;$neg$1 = $neg$0;
     }
    } else {
     $$123 = $$1;$c$124 = $c$1;
     label = 46;
    }
   }
   L63: do {
    if ((label|0) == 46) {
     $116 = (($$123) + -1)|0;
     $117 = $116 & $$123;
     $118 = ($117|0)==(0);
     if ($118) {
      $123 = ($$123*23)|0;
      $124 = $123 >>> 5;
      $125 = $124 & 7;
      $126 = (1184647 + ($125)|0);
      $127 = HEAP8[$126>>0]|0;
      $128 = $127 << 24 >> 24;
      $$sum1445 = (($c$124) + 1)|0;
      $129 = (1184390 + ($$sum1445)|0);
      $130 = HEAP8[$129>>0]|0;
      $131 = $130&255;
      $132 = ($131>>>0)<($$123>>>0);
      if ($132) {
       $135 = $131;$x$146 = 0;
       while(1) {
        $133 = $x$146 << $128;
        $134 = $135 | $133;
        $136 = HEAP32[$3>>2]|0;
        $137 = HEAP32[$4>>2]|0;
        $138 = ($136>>>0)<($137>>>0);
        if ($138) {
         $139 = ((($136)) + 1|0);
         HEAP32[$3>>2] = $139;
         $140 = HEAP8[$136>>0]|0;
         $141 = $140&255;
         $c$4$be = $141;
        } else {
         $142 = (___shgetc($f)|0);
         $c$4$be = $142;
        }
        $$sum14 = (($c$4$be) + 1)|0;
        $143 = (1184390 + ($$sum14)|0);
        $144 = HEAP8[$143>>0]|0;
        $145 = $144&255;
        $146 = ($145>>>0)<($$123>>>0);
        $147 = ($134>>>0)<(134217728);
        $148 = $147 & $146;
        if ($148) {
         $135 = $145;$x$146 = $134;
        } else {
         $$lcssa130 = $134;$$lcssa131 = $144;$c$4$be$lcssa = $c$4$be;
         break;
        }
       }
       $152 = $$lcssa131;$154 = 0;$156 = $$lcssa130;$c$4$lcssa = $c$4$be$lcssa;
      } else {
       $152 = $130;$154 = 0;$156 = 0;$c$4$lcssa = $c$124;
      }
      $149 = (_bitshift64Lshr(-1,-1,($128|0))|0);
      $150 = tempRet0;
      $151 = $152&255;
      $153 = ($151>>>0)>=($$123>>>0);
      $155 = ($154>>>0)>($150>>>0);
      $157 = ($156>>>0)>($149>>>0);
      $158 = ($154|0)==($150|0);
      $159 = $158 & $157;
      $160 = $155 | $159;
      $or$cond40 = $153 | $160;
      if ($or$cond40) {
       $$122 = $$123;$292 = $156;$293 = $154;$c$8 = $c$4$lcssa;
       label = 72;
       break;
      } else {
       $161 = $156;$162 = $154;$166 = $152;
      }
      while(1) {
       $163 = (_bitshift64Shl(($161|0),($162|0),($128|0))|0);
       $164 = tempRet0;
       $165 = $166&255;
       $167 = $165 | $163;
       $168 = HEAP32[$3>>2]|0;
       $169 = HEAP32[$4>>2]|0;
       $170 = ($168>>>0)<($169>>>0);
       if ($170) {
        $171 = ((($168)) + 1|0);
        HEAP32[$3>>2] = $171;
        $172 = HEAP8[$168>>0]|0;
        $173 = $172&255;
        $c$5$be = $173;
       } else {
        $174 = (___shgetc($f)|0);
        $c$5$be = $174;
       }
       $$sum15 = (($c$5$be) + 1)|0;
       $175 = (1184390 + ($$sum15)|0);
       $176 = HEAP8[$175>>0]|0;
       $177 = $176&255;
       $178 = ($177>>>0)>=($$123>>>0);
       $179 = ($164>>>0)>($150>>>0);
       $180 = ($167>>>0)>($149>>>0);
       $181 = ($164|0)==($150|0);
       $182 = $181 & $180;
       $183 = $179 | $182;
       $or$cond = $178 | $183;
       if ($or$cond) {
        $$122 = $$123;$292 = $167;$293 = $164;$c$8 = $c$5$be;
        label = 72;
        break L63;
       } else {
        $161 = $167;$162 = $164;$166 = $176;
       }
      }
     }
     $$sum1865 = (($c$124) + 1)|0;
     $119 = (1184390 + ($$sum1865)|0);
     $120 = HEAP8[$119>>0]|0;
     $121 = $120&255;
     $122 = ($121>>>0)<($$123>>>0);
     if ($122) {
      $186 = $121;$x$266 = 0;
      while(1) {
       $184 = Math_imul($x$266, $$123)|0;
       $185 = (($186) + ($184))|0;
       $187 = HEAP32[$3>>2]|0;
       $188 = HEAP32[$4>>2]|0;
       $189 = ($187>>>0)<($188>>>0);
       if ($189) {
        $190 = ((($187)) + 1|0);
        HEAP32[$3>>2] = $190;
        $191 = HEAP8[$187>>0]|0;
        $192 = $191&255;
        $c$6$be = $192;
       } else {
        $193 = (___shgetc($f)|0);
        $c$6$be = $193;
       }
       $$sum18 = (($c$6$be) + 1)|0;
       $194 = (1184390 + ($$sum18)|0);
       $195 = HEAP8[$194>>0]|0;
       $196 = $195&255;
       $197 = ($196>>>0)<($$123>>>0);
       $198 = ($185>>>0)<(119304647);
       $199 = $198 & $197;
       if ($199) {
        $186 = $196;$x$266 = $185;
       } else {
        $$lcssa132 = $185;$$lcssa133 = $195;$c$6$be$lcssa = $c$6$be;
        break;
       }
      }
      $201 = $$lcssa133;$294 = $$lcssa132;$295 = 0;$c$6$lcssa = $c$6$be$lcssa;
     } else {
      $201 = $120;$294 = 0;$295 = 0;$c$6$lcssa = $c$124;
     }
     $200 = $201&255;
     $202 = ($200>>>0)<($$123>>>0);
     if ($202) {
      $203 = (___udivdi3(-1,-1,($$123|0),0)|0);
      $204 = tempRet0;
      $205 = $295;$207 = $294;$215 = $201;$c$753 = $c$6$lcssa;
      while(1) {
       $206 = ($205>>>0)>($204>>>0);
       $208 = ($207>>>0)>($203>>>0);
       $209 = ($205|0)==($204|0);
       $210 = $209 & $208;
       $211 = $206 | $210;
       if ($211) {
        $$122 = $$123;$292 = $207;$293 = $205;$c$8 = $c$753;
        label = 72;
        break L63;
       }
       $212 = (___muldi3(($207|0),($205|0),($$123|0),0)|0);
       $213 = tempRet0;
       $214 = $215&255;
       $216 = $214 ^ -1;
       $217 = ($213>>>0)>(4294967295);
       $218 = ($212>>>0)>($216>>>0);
       $219 = ($213|0)==(-1);
       $220 = $219 & $218;
       $221 = $217 | $220;
       if ($221) {
        $$122 = $$123;$292 = $207;$293 = $205;$c$8 = $c$753;
        label = 72;
        break L63;
       }
       $222 = (_i64Add(($214|0),0,($212|0),($213|0))|0);
       $223 = tempRet0;
       $224 = HEAP32[$3>>2]|0;
       $225 = HEAP32[$4>>2]|0;
       $226 = ($224>>>0)<($225>>>0);
       if ($226) {
        $227 = ((($224)) + 1|0);
        HEAP32[$3>>2] = $227;
        $228 = HEAP8[$224>>0]|0;
        $229 = $228&255;
        $c$7$be = $229;
       } else {
        $230 = (___shgetc($f)|0);
        $c$7$be = $230;
       }
       $$sum19 = (($c$7$be) + 1)|0;
       $231 = (1184390 + ($$sum19)|0);
       $232 = HEAP8[$231>>0]|0;
       $233 = $232&255;
       $234 = ($233>>>0)<($$123>>>0);
       if ($234) {
        $205 = $223;$207 = $222;$215 = $232;$c$753 = $c$7$be;
       } else {
        $$122 = $$123;$292 = $222;$293 = $223;$c$8 = $c$7$be;
        label = 72;
        break;
       }
      }
     } else {
      $$122 = $$123;$292 = $294;$293 = $295;$c$8 = $c$6$lcssa;
      label = 72;
     }
    }
   } while(0);
   if ((label|0) == 72) {
    $$sum16 = (($c$8) + 1)|0;
    $235 = (1184390 + ($$sum16)|0);
    $236 = HEAP8[$235>>0]|0;
    $237 = $236&255;
    $238 = ($237>>>0)<($$122>>>0);
    if ($238) {
     while(1) {
      $239 = HEAP32[$3>>2]|0;
      $240 = HEAP32[$4>>2]|0;
      $241 = ($239>>>0)<($240>>>0);
      if ($241) {
       $242 = ((($239)) + 1|0);
       HEAP32[$3>>2] = $242;
       $243 = HEAP8[$239>>0]|0;
       $244 = $243&255;
       $c$9$be = $244;
      } else {
       $245 = (___shgetc($f)|0);
       $c$9$be = $245;
      }
      $$sum17 = (($c$9$be) + 1)|0;
      $246 = (1184390 + ($$sum17)|0);
      $247 = HEAP8[$246>>0]|0;
      $248 = $247&255;
      $249 = ($248>>>0)<($$122>>>0);
      if (!($249)) {
       break;
      }
     }
     $250 = (___errno_location()|0);
     HEAP32[$250>>2] = 34;
     $251 = $0 & 1;
     $252 = ($251|0)==(0);
     $253 = (0)==(0);
     $254 = $252 & $253;
     $neg$0$ = $254 ? $neg$0 : 0;
     $259 = $1;$261 = $0;$neg$1 = $neg$0$;
    } else {
     $259 = $293;$261 = $292;$neg$1 = $neg$0;
    }
   }
   $255 = HEAP32[$4>>2]|0;
   $256 = ($255|0)==(0|0);
   if (!($256)) {
    $257 = HEAP32[$3>>2]|0;
    $258 = ((($257)) + -1|0);
    HEAP32[$3>>2] = $258;
   }
   $260 = ($259>>>0)<($1>>>0);
   $262 = ($261>>>0)<($0>>>0);
   $263 = ($259|0)==($1|0);
   $264 = $263 & $262;
   $265 = $260 | $264;
   if (!($265)) {
    $266 = $0 & 1;
    $267 = ($266|0)!=(0);
    $268 = (0)!=(0);
    $269 = $267 | $268;
    $270 = ($neg$1|0)!=(0);
    $or$cond12 = $269 | $270;
    if (!($or$cond12)) {
     $271 = (___errno_location()|0);
     HEAP32[$271>>2] = 34;
     $272 = (_i64Add(($0|0),($1|0),-1,-1)|0);
     $273 = tempRet0;
     $286 = $273;$287 = $272;
     break;
    }
    $274 = ($259>>>0)>($1>>>0);
    $275 = ($261>>>0)>($0>>>0);
    $276 = ($259|0)==($1|0);
    $277 = $276 & $275;
    $278 = $274 | $277;
    if ($278) {
     $279 = (___errno_location()|0);
     HEAP32[$279>>2] = 34;
     $286 = $1;$287 = $0;
     break;
    }
   }
   $280 = ($neg$1|0)<(0);
   $281 = $280 << 31 >> 31;
   $282 = $261 ^ $neg$1;
   $283 = $259 ^ $281;
   $284 = (_i64Subtract(($282|0),($283|0),($neg$1|0),($281|0))|0);
   $285 = tempRet0;
   $286 = $285;$287 = $284;
  }
 } while(0);
 tempRet0 = ($286);
 return ($287|0);
}
function ___shlim($f,$lim) {
 $f = $f|0;
 $lim = $lim|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 104|0);
 HEAP32[$0>>2] = $lim;
 $1 = ((($f)) + 8|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($f)) + 4|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = $2;
 $6 = $4;
 $7 = (($5) - ($6))|0;
 $8 = ((($f)) + 108|0);
 HEAP32[$8>>2] = $7;
 $9 = ($lim|0)!=(0);
 $10 = ($7|0)>($lim|0);
 $or$cond = $9 & $10;
 if ($or$cond) {
  $11 = (($4) + ($lim)|0);
  $12 = ((($f)) + 100|0);
  HEAP32[$12>>2] = $11;
 } else {
  $13 = ((($f)) + 100|0);
  HEAP32[$13>>2] = $5;
 }
 return;
}
function ___shgetc($f) {
 $f = $f|0;
 var $$0 = 0, $$phi$trans$insert = 0, $$phi$trans$insert3 = 0, $$pre = 0, $$pre4 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0;
 var $40 = 0, $41 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 104|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0);
 if ($2) {
  label = 3;
 } else {
  $3 = ((($f)) + 108|0);
  $4 = HEAP32[$3>>2]|0;
  $5 = ($4|0)<($1|0);
  if ($5) {
   label = 3;
  } else {
   label = 4;
  }
 }
 if ((label|0) == 3) {
  $6 = (___uflow($f)|0);
  $7 = ($6|0)<(0);
  if ($7) {
   label = 4;
  } else {
   $9 = HEAP32[$0>>2]|0;
   $10 = ($9|0)==(0);
   $$phi$trans$insert = ((($f)) + 8|0);
   if ($10) {
    $$pre = HEAP32[$$phi$trans$insert>>2]|0;
    $11 = $$pre;
    $26 = $$pre;$41 = $11;
    label = 9;
   } else {
    $12 = HEAP32[$$phi$trans$insert>>2]|0;
    $13 = ((($f)) + 4|0);
    $14 = HEAP32[$13>>2]|0;
    $15 = $12;
    $16 = $14;
    $17 = (($15) - ($16))|0;
    $18 = ((($f)) + 108|0);
    $19 = HEAP32[$18>>2]|0;
    $20 = (($9) - ($19))|0;
    $21 = (($20) + -1)|0;
    $22 = ($17|0)>($21|0);
    if ($22) {
     $23 = (($14) + ($21)|0);
     $24 = ((($f)) + 100|0);
     HEAP32[$24>>2] = $23;
     $27 = $12;
    } else {
     $26 = $15;$41 = $12;
     label = 9;
    }
   }
   if ((label|0) == 9) {
    $25 = ((($f)) + 100|0);
    HEAP32[$25>>2] = $26;
    $27 = $41;
   }
   $28 = ($27|0)==(0|0);
   $$phi$trans$insert3 = ((($f)) + 4|0);
   $$pre4 = HEAP32[$$phi$trans$insert3>>2]|0;
   if (!($28)) {
    $29 = $27;
    $30 = $$pre4;
    $31 = ((($f)) + 108|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = (($29) + 1)|0;
    $34 = (($33) - ($30))|0;
    $35 = (($34) + ($32))|0;
    HEAP32[$31>>2] = $35;
   }
   $36 = ((($$pre4)) + -1|0);
   $37 = HEAP8[$36>>0]|0;
   $38 = $37&255;
   $39 = ($38|0)==($6|0);
   if ($39) {
    $$0 = $6;
   } else {
    $40 = $6&255;
    HEAP8[$36>>0] = $40;
    $$0 = $6;
   }
  }
 }
 if ((label|0) == 4) {
  $8 = ((($f)) + 100|0);
  HEAP32[$8>>2] = 0;
  $$0 = -1;
 }
 return ($$0|0);
}
function ___toread($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 74|0);
 $1 = HEAP8[$0>>0]|0;
 $2 = $1 << 24 >> 24;
 $3 = (($2) + 255)|0;
 $4 = $3 | $2;
 $5 = $4&255;
 HEAP8[$0>>0] = $5;
 $6 = ((($f)) + 20|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ((($f)) + 44|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = ($7>>>0)>($9>>>0);
 if ($10) {
  $11 = ((($f)) + 36|0);
  $12 = HEAP32[$11>>2]|0;
  (FUNCTION_TABLE_iiii[$12 & 63]($f,0,0)|0);
 }
 $13 = ((($f)) + 16|0);
 HEAP32[$13>>2] = 0;
 $14 = ((($f)) + 28|0);
 HEAP32[$14>>2] = 0;
 HEAP32[$6>>2] = 0;
 $15 = HEAP32[$f>>2]|0;
 $16 = $15 & 20;
 $17 = ($16|0)==(0);
 if ($17) {
  $21 = HEAP32[$8>>2]|0;
  $22 = ((($f)) + 8|0);
  HEAP32[$22>>2] = $21;
  $23 = ((($f)) + 4|0);
  HEAP32[$23>>2] = $21;
  $$0 = 0;
 } else {
  $18 = $15 & 4;
  $19 = ($18|0)==(0);
  if ($19) {
   $$0 = -1;
  } else {
   $20 = $15 | 32;
   HEAP32[$f>>2] = $20;
   $$0 = -1;
  }
 }
 return ($$0|0);
}
function ___uflow($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $c = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $c = sp;
 $0 = ((($f)) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 if ($2) {
  $3 = (___toread($f)|0);
  $4 = ($3|0)==(0);
  if ($4) {
   label = 3;
  } else {
   $$0 = -1;
  }
 } else {
  label = 3;
 }
 if ((label|0) == 3) {
  $5 = ((($f)) + 32|0);
  $6 = HEAP32[$5>>2]|0;
  $7 = (FUNCTION_TABLE_iiii[$6 & 63]($f,$c,1)|0);
  $8 = ($7|0)==(1);
  if ($8) {
   $9 = HEAP8[$c>>0]|0;
   $10 = $9&255;
   $$0 = $10;
  } else {
   $$0 = -1;
  }
 }
 STACKTOP = sp;return ($$0|0);
}
function _strtol($s,$p,$base) {
 $s = $s|0;
 $p = $p|0;
 $base = $base|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_strtox555($s,$p,$base,-2147483648,0)|0);
 $1 = tempRet0;
 return ($0|0);
}
function ___stpcpy($d,$s) {
 $d = $d|0;
 $s = $s|0;
 var $$0$lcssa = 0, $$01$lcssa = 0, $$0115 = 0, $$016 = 0, $$03 = 0, $$1$ph = 0, $$12$ph = 0, $$128 = 0, $$19 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0;
 var $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $wd$0$lcssa = 0, $wd$010 = 0, $ws$0$lcssa = 0, $ws$011 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $s;
 $1 = $d;
 $2 = $0 ^ $1;
 $3 = $2 & 3;
 $4 = ($3|0)==(0);
 L1: do {
  if ($4) {
   $5 = $0 & 3;
   $6 = ($5|0)==(0);
   if ($6) {
    $$0$lcssa = $s;$$01$lcssa = $d;
   } else {
    $$0115 = $d;$$016 = $s;
    while(1) {
     $7 = HEAP8[$$016>>0]|0;
     HEAP8[$$0115>>0] = $7;
     $8 = ($7<<24>>24)==(0);
     if ($8) {
      $$03 = $$0115;
      break L1;
     }
     $9 = ((($$016)) + 1|0);
     $10 = ((($$0115)) + 1|0);
     $11 = $9;
     $12 = $11 & 3;
     $13 = ($12|0)==(0);
     if ($13) {
      $$0$lcssa = $9;$$01$lcssa = $10;
      break;
     } else {
      $$0115 = $10;$$016 = $9;
     }
    }
   }
   $14 = HEAP32[$$0$lcssa>>2]|0;
   $15 = (($14) + -16843009)|0;
   $16 = $14 & -2139062144;
   $17 = $16 ^ -2139062144;
   $18 = $17 & $15;
   $19 = ($18|0)==(0);
   if ($19) {
    $22 = $14;$wd$010 = $$01$lcssa;$ws$011 = $$0$lcssa;
    while(1) {
     $20 = ((($ws$011)) + 4|0);
     $21 = ((($wd$010)) + 4|0);
     HEAP32[$wd$010>>2] = $22;
     $23 = HEAP32[$20>>2]|0;
     $24 = (($23) + -16843009)|0;
     $25 = $23 & -2139062144;
     $26 = $25 ^ -2139062144;
     $27 = $26 & $24;
     $28 = ($27|0)==(0);
     if ($28) {
      $22 = $23;$wd$010 = $21;$ws$011 = $20;
     } else {
      $wd$0$lcssa = $21;$ws$0$lcssa = $20;
      break;
     }
    }
   } else {
    $wd$0$lcssa = $$01$lcssa;$ws$0$lcssa = $$0$lcssa;
   }
   $$1$ph = $ws$0$lcssa;$$12$ph = $wd$0$lcssa;
   label = 8;
  } else {
   $$1$ph = $s;$$12$ph = $d;
   label = 8;
  }
 } while(0);
 if ((label|0) == 8) {
  $29 = HEAP8[$$1$ph>>0]|0;
  HEAP8[$$12$ph>>0] = $29;
  $30 = ($29<<24>>24)==(0);
  if ($30) {
   $$03 = $$12$ph;
  } else {
   $$128 = $$12$ph;$$19 = $$1$ph;
   while(1) {
    $31 = ((($$19)) + 1|0);
    $32 = ((($$128)) + 1|0);
    $33 = HEAP8[$31>>0]|0;
    HEAP8[$32>>0] = $33;
    $34 = ($33<<24>>24)==(0);
    if ($34) {
     $$03 = $32;
     break;
    } else {
     $$128 = $32;$$19 = $31;
    }
   }
  }
 }
 return ($$03|0);
}
function _strcpy($dest,$src) {
 $dest = $dest|0;
 $src = $src|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 (___stpcpy($dest,$src)|0);
 return ($dest|0);
}
function _strlen($s) {
 $s = $s|0;
 var $$0 = 0, $$01$lcssa = 0, $$014 = 0, $$1$lcssa = 0, $$lcssa20 = 0, $$pn = 0, $$pn15 = 0, $$pre = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0;
 var $2 = 0, $20 = 0, $21 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $w$0 = 0, $w$0$lcssa = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $s;
 $1 = $0 & 3;
 $2 = ($1|0)==(0);
 L1: do {
  if ($2) {
   $$01$lcssa = $s;
   label = 4;
  } else {
   $$014 = $s;$21 = $0;
   while(1) {
    $3 = HEAP8[$$014>>0]|0;
    $4 = ($3<<24>>24)==(0);
    if ($4) {
     $$pn = $21;
     break L1;
    }
    $5 = ((($$014)) + 1|0);
    $6 = $5;
    $7 = $6 & 3;
    $8 = ($7|0)==(0);
    if ($8) {
     $$01$lcssa = $5;
     label = 4;
     break;
    } else {
     $$014 = $5;$21 = $6;
    }
   }
  }
 } while(0);
 if ((label|0) == 4) {
  $w$0 = $$01$lcssa;
  while(1) {
   $9 = HEAP32[$w$0>>2]|0;
   $10 = (($9) + -16843009)|0;
   $11 = $9 & -2139062144;
   $12 = $11 ^ -2139062144;
   $13 = $12 & $10;
   $14 = ($13|0)==(0);
   $15 = ((($w$0)) + 4|0);
   if ($14) {
    $w$0 = $15;
   } else {
    $$lcssa20 = $9;$w$0$lcssa = $w$0;
    break;
   }
  }
  $16 = $$lcssa20&255;
  $17 = ($16<<24>>24)==(0);
  if ($17) {
   $$1$lcssa = $w$0$lcssa;
  } else {
   $$pn15 = $w$0$lcssa;
   while(1) {
    $18 = ((($$pn15)) + 1|0);
    $$pre = HEAP8[$18>>0]|0;
    $19 = ($$pre<<24>>24)==(0);
    if ($19) {
     $$1$lcssa = $18;
     break;
    } else {
     $$pn15 = $18;
    }
   }
  }
  $20 = $$1$lcssa;
  $$pn = $20;
 }
 $$0 = (($$pn) - ($0))|0;
 return ($$0|0);
}
function _strtox555($s,$p,$base,$0,$1) {
 $s = $s|0;
 $p = $p|0;
 $base = $base|0;
 $0 = $0|0;
 $1 = $1|0;
 var $$sink = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $f = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $f = sp;
 HEAP32[$f>>2] = 0;
 $2 = ((($f)) + 4|0);
 HEAP32[$2>>2] = $s;
 $3 = ((($f)) + 44|0);
 HEAP32[$3>>2] = $s;
 $4 = ($s|0)<(0|0);
 $5 = ((($s)) + 2147483647|0);
 $$sink = $4 ? (-1) : $5;
 $6 = ((($f)) + 8|0);
 HEAP32[$6>>2] = $$sink;
 $7 = ((($f)) + 76|0);
 HEAP32[$7>>2] = -1;
 ___shlim($f,0);
 $8 = (___intscan($f,$base,1,$0,$1)|0);
 $9 = tempRet0;
 $10 = ($p|0)==(0|0);
 if (!($10)) {
  $11 = ((($f)) + 108|0);
  $12 = HEAP32[$11>>2]|0;
  $13 = HEAP32[$2>>2]|0;
  $14 = HEAP32[$6>>2]|0;
  $15 = $13;
  $16 = $14;
  $17 = (($15) + ($12))|0;
  $18 = (($17) - ($16))|0;
  $19 = (($s) + ($18)|0);
  HEAP32[$p>>2] = $19;
 }
 tempRet0 = ($9);
 STACKTOP = sp;return ($8|0);
}
function _malloc($bytes) {
 $bytes = $bytes|0;
 var $$3$i = 0, $$lcssa = 0, $$lcssa211 = 0, $$lcssa215 = 0, $$lcssa216 = 0, $$lcssa217 = 0, $$lcssa219 = 0, $$lcssa222 = 0, $$lcssa224 = 0, $$lcssa226 = 0, $$lcssa228 = 0, $$lcssa230 = 0, $$lcssa232 = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i22$i = 0, $$pre$i25 = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i23$iZ2D = 0;
 var $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre105 = 0, $$pre106 = 0, $$pre14$i$i = 0, $$pre43$i = 0, $$pre56$i$i = 0, $$pre57$i$i = 0, $$pre8$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0, $$sum$i$i = 0, $$sum$i$i$i = 0, $$sum$i13$i = 0, $$sum$i14$i = 0, $$sum$i17$i = 0, $$sum$i19$i = 0;
 var $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i15$i = 0, $$sum1$i20$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum11$i = 0, $$sum11$i$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0;
 var $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum121$i = 0, $$sum122$i = 0, $$sum123$i = 0, $$sum124$i = 0, $$sum125$i = 0, $$sum13$i = 0, $$sum13$i$i = 0, $$sum14$i$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0;
 var $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i16$i = 0, $$sum2$i18$i = 0, $$sum2$i21$i = 0, $$sum20$i$i = 0, $$sum21$i$i = 0, $$sum22$i$i = 0, $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i27 = 0;
 var $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0, $$sum4$i$i = 0, $$sum4$i28 = 0, $$sum40$i$i = 0, $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0;
 var $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0;
 var $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0;
 var $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0;
 var $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0;
 var $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0;
 var $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0;
 var $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0;
 var $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0;
 var $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0;
 var $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0;
 var $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0;
 var $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0;
 var $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0;
 var $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0;
 var $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0;
 var $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0;
 var $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0;
 var $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0;
 var $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0;
 var $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0;
 var $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0;
 var $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0;
 var $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0;
 var $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0;
 var $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0;
 var $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0;
 var $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0;
 var $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0;
 var $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0;
 var $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0;
 var $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0;
 var $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0;
 var $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0;
 var $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0;
 var $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0;
 var $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0;
 var $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0;
 var $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0;
 var $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0;
 var $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0;
 var $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0;
 var $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0;
 var $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0;
 var $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0;
 var $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0;
 var $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0;
 var $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0;
 var $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0;
 var $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0;
 var $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0;
 var $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0;
 var $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0;
 var $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0;
 var $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0;
 var $F5$0$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$029$i = 0, $K2$07$i$i = 0, $K8$051$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i$i$lcssa = 0, $R$0$i$lcssa = 0, $R$0$i18 = 0, $R$0$i18$lcssa = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i$i$lcssa = 0, $RP$0$i$lcssa = 0;
 var $RP$0$i17 = 0, $RP$0$i17$lcssa = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i25$i = 0, $T$028$i = 0, $T$028$i$lcssa = 0, $T$050$i$i = 0, $T$050$i$i$lcssa = 0, $T$06$i$i = 0, $T$06$i$i$lcssa = 0, $br$0$ph$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0;
 var $not$$i = 0, $not$$i$i = 0, $not$$i26$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i30 = 0, $or$cond1$i = 0, $or$cond19$i = 0, $or$cond2$i = 0, $or$cond3$i = 0, $or$cond5$i = 0, $or$cond57$i = 0, $or$cond6$i = 0, $or$cond8$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i$lcssa = 0, $rsize$0$i15 = 0, $rsize$1$i = 0;
 var $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$331$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$084$i = 0, $sp$084$i$lcssa = 0, $sp$183$i = 0, $sp$183$i$lcssa = 0, $ssize$0$$i = 0, $ssize$0$i = 0, $ssize$1$ph$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0;
 var $t$2$v$3$i = 0, $t$230$i = 0, $tbase$255$i = 0, $tsize$0$ph$i = 0, $tsize$0323944$i = 0, $tsize$1$i = 0, $tsize$254$i = 0, $v$0$i = 0, $v$0$i$lcssa = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0, $v$3$ph$i = 0, $v$332$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($bytes>>>0)<(245);
 do {
  if ($0) {
   $1 = ($bytes>>>0)<(11);
   $2 = (($bytes) + 11)|0;
   $3 = $2 & -8;
   $4 = $1 ? 16 : $3;
   $5 = $4 >>> 3;
   $6 = HEAP32[526512>>2]|0;
   $7 = $6 >>> $5;
   $8 = $7 & 3;
   $9 = ($8|0)==(0);
   if (!($9)) {
    $10 = $7 & 1;
    $11 = $10 ^ 1;
    $12 = (($11) + ($5))|0;
    $13 = $12 << 1;
    $14 = (526552 + ($13<<2)|0);
    $$sum10 = (($13) + 2)|0;
    $15 = (526552 + ($$sum10<<2)|0);
    $16 = HEAP32[$15>>2]|0;
    $17 = ((($16)) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ($14|0)==($18|0);
    do {
     if ($19) {
      $20 = 1 << $12;
      $21 = $20 ^ -1;
      $22 = $6 & $21;
      HEAP32[526512>>2] = $22;
     } else {
      $23 = HEAP32[(526528)>>2]|0;
      $24 = ($18>>>0)<($23>>>0);
      if ($24) {
       _abort();
       // unreachable;
      }
      $25 = ((($18)) + 12|0);
      $26 = HEAP32[$25>>2]|0;
      $27 = ($26|0)==($16|0);
      if ($27) {
       HEAP32[$25>>2] = $14;
       HEAP32[$15>>2] = $18;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $28 = $12 << 3;
    $29 = $28 | 3;
    $30 = ((($16)) + 4|0);
    HEAP32[$30>>2] = $29;
    $$sum1112 = $28 | 4;
    $31 = (($16) + ($$sum1112)|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = $32 | 1;
    HEAP32[$31>>2] = $33;
    $mem$0 = $17;
    return ($mem$0|0);
   }
   $34 = HEAP32[(526520)>>2]|0;
   $35 = ($4>>>0)>($34>>>0);
   if ($35) {
    $36 = ($7|0)==(0);
    if (!($36)) {
     $37 = $7 << $5;
     $38 = 2 << $5;
     $39 = (0 - ($38))|0;
     $40 = $38 | $39;
     $41 = $37 & $40;
     $42 = (0 - ($41))|0;
     $43 = $41 & $42;
     $44 = (($43) + -1)|0;
     $45 = $44 >>> 12;
     $46 = $45 & 16;
     $47 = $44 >>> $46;
     $48 = $47 >>> 5;
     $49 = $48 & 8;
     $50 = $49 | $46;
     $51 = $47 >>> $49;
     $52 = $51 >>> 2;
     $53 = $52 & 4;
     $54 = $50 | $53;
     $55 = $51 >>> $53;
     $56 = $55 >>> 1;
     $57 = $56 & 2;
     $58 = $54 | $57;
     $59 = $55 >>> $57;
     $60 = $59 >>> 1;
     $61 = $60 & 1;
     $62 = $58 | $61;
     $63 = $59 >>> $61;
     $64 = (($62) + ($63))|0;
     $65 = $64 << 1;
     $66 = (526552 + ($65<<2)|0);
     $$sum4 = (($65) + 2)|0;
     $67 = (526552 + ($$sum4<<2)|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = ((($68)) + 8|0);
     $70 = HEAP32[$69>>2]|0;
     $71 = ($66|0)==($70|0);
     do {
      if ($71) {
       $72 = 1 << $64;
       $73 = $72 ^ -1;
       $74 = $6 & $73;
       HEAP32[526512>>2] = $74;
       $88 = $34;
      } else {
       $75 = HEAP32[(526528)>>2]|0;
       $76 = ($70>>>0)<($75>>>0);
       if ($76) {
        _abort();
        // unreachable;
       }
       $77 = ((($70)) + 12|0);
       $78 = HEAP32[$77>>2]|0;
       $79 = ($78|0)==($68|0);
       if ($79) {
        HEAP32[$77>>2] = $66;
        HEAP32[$67>>2] = $70;
        $$pre = HEAP32[(526520)>>2]|0;
        $88 = $$pre;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $80 = $64 << 3;
     $81 = (($80) - ($4))|0;
     $82 = $4 | 3;
     $83 = ((($68)) + 4|0);
     HEAP32[$83>>2] = $82;
     $84 = (($68) + ($4)|0);
     $85 = $81 | 1;
     $$sum56 = $4 | 4;
     $86 = (($68) + ($$sum56)|0);
     HEAP32[$86>>2] = $85;
     $87 = (($68) + ($80)|0);
     HEAP32[$87>>2] = $81;
     $89 = ($88|0)==(0);
     if (!($89)) {
      $90 = HEAP32[(526532)>>2]|0;
      $91 = $88 >>> 3;
      $92 = $91 << 1;
      $93 = (526552 + ($92<<2)|0);
      $94 = HEAP32[526512>>2]|0;
      $95 = 1 << $91;
      $96 = $94 & $95;
      $97 = ($96|0)==(0);
      if ($97) {
       $98 = $94 | $95;
       HEAP32[526512>>2] = $98;
       $$pre105 = (($92) + 2)|0;
       $$pre106 = (526552 + ($$pre105<<2)|0);
       $$pre$phiZ2D = $$pre106;$F4$0 = $93;
      } else {
       $$sum9 = (($92) + 2)|0;
       $99 = (526552 + ($$sum9<<2)|0);
       $100 = HEAP32[$99>>2]|0;
       $101 = HEAP32[(526528)>>2]|0;
       $102 = ($100>>>0)<($101>>>0);
       if ($102) {
        _abort();
        // unreachable;
       } else {
        $$pre$phiZ2D = $99;$F4$0 = $100;
       }
      }
      HEAP32[$$pre$phiZ2D>>2] = $90;
      $103 = ((($F4$0)) + 12|0);
      HEAP32[$103>>2] = $90;
      $104 = ((($90)) + 8|0);
      HEAP32[$104>>2] = $F4$0;
      $105 = ((($90)) + 12|0);
      HEAP32[$105>>2] = $93;
     }
     HEAP32[(526520)>>2] = $81;
     HEAP32[(526532)>>2] = $84;
     $mem$0 = $69;
     return ($mem$0|0);
    }
    $106 = HEAP32[(526516)>>2]|0;
    $107 = ($106|0)==(0);
    if ($107) {
     $nb$0 = $4;
    } else {
     $108 = (0 - ($106))|0;
     $109 = $106 & $108;
     $110 = (($109) + -1)|0;
     $111 = $110 >>> 12;
     $112 = $111 & 16;
     $113 = $110 >>> $112;
     $114 = $113 >>> 5;
     $115 = $114 & 8;
     $116 = $115 | $112;
     $117 = $113 >>> $115;
     $118 = $117 >>> 2;
     $119 = $118 & 4;
     $120 = $116 | $119;
     $121 = $117 >>> $119;
     $122 = $121 >>> 1;
     $123 = $122 & 2;
     $124 = $120 | $123;
     $125 = $121 >>> $123;
     $126 = $125 >>> 1;
     $127 = $126 & 1;
     $128 = $124 | $127;
     $129 = $125 >>> $127;
     $130 = (($128) + ($129))|0;
     $131 = (526816 + ($130<<2)|0);
     $132 = HEAP32[$131>>2]|0;
     $133 = ((($132)) + 4|0);
     $134 = HEAP32[$133>>2]|0;
     $135 = $134 & -8;
     $136 = (($135) - ($4))|0;
     $rsize$0$i = $136;$t$0$i = $132;$v$0$i = $132;
     while(1) {
      $137 = ((($t$0$i)) + 16|0);
      $138 = HEAP32[$137>>2]|0;
      $139 = ($138|0)==(0|0);
      if ($139) {
       $140 = ((($t$0$i)) + 20|0);
       $141 = HEAP32[$140>>2]|0;
       $142 = ($141|0)==(0|0);
       if ($142) {
        $rsize$0$i$lcssa = $rsize$0$i;$v$0$i$lcssa = $v$0$i;
        break;
       } else {
        $144 = $141;
       }
      } else {
       $144 = $138;
      }
      $143 = ((($144)) + 4|0);
      $145 = HEAP32[$143>>2]|0;
      $146 = $145 & -8;
      $147 = (($146) - ($4))|0;
      $148 = ($147>>>0)<($rsize$0$i>>>0);
      $$rsize$0$i = $148 ? $147 : $rsize$0$i;
      $$v$0$i = $148 ? $144 : $v$0$i;
      $rsize$0$i = $$rsize$0$i;$t$0$i = $144;$v$0$i = $$v$0$i;
     }
     $149 = HEAP32[(526528)>>2]|0;
     $150 = ($v$0$i$lcssa>>>0)<($149>>>0);
     if ($150) {
      _abort();
      // unreachable;
     }
     $151 = (($v$0$i$lcssa) + ($4)|0);
     $152 = ($v$0$i$lcssa>>>0)<($151>>>0);
     if (!($152)) {
      _abort();
      // unreachable;
     }
     $153 = ((($v$0$i$lcssa)) + 24|0);
     $154 = HEAP32[$153>>2]|0;
     $155 = ((($v$0$i$lcssa)) + 12|0);
     $156 = HEAP32[$155>>2]|0;
     $157 = ($156|0)==($v$0$i$lcssa|0);
     do {
      if ($157) {
       $167 = ((($v$0$i$lcssa)) + 20|0);
       $168 = HEAP32[$167>>2]|0;
       $169 = ($168|0)==(0|0);
       if ($169) {
        $170 = ((($v$0$i$lcssa)) + 16|0);
        $171 = HEAP32[$170>>2]|0;
        $172 = ($171|0)==(0|0);
        if ($172) {
         $R$1$i = 0;
         break;
        } else {
         $R$0$i = $171;$RP$0$i = $170;
        }
       } else {
        $R$0$i = $168;$RP$0$i = $167;
       }
       while(1) {
        $173 = ((($R$0$i)) + 20|0);
        $174 = HEAP32[$173>>2]|0;
        $175 = ($174|0)==(0|0);
        if (!($175)) {
         $R$0$i = $174;$RP$0$i = $173;
         continue;
        }
        $176 = ((($R$0$i)) + 16|0);
        $177 = HEAP32[$176>>2]|0;
        $178 = ($177|0)==(0|0);
        if ($178) {
         $R$0$i$lcssa = $R$0$i;$RP$0$i$lcssa = $RP$0$i;
         break;
        } else {
         $R$0$i = $177;$RP$0$i = $176;
        }
       }
       $179 = ($RP$0$i$lcssa>>>0)<($149>>>0);
       if ($179) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$RP$0$i$lcssa>>2] = 0;
        $R$1$i = $R$0$i$lcssa;
        break;
       }
      } else {
       $158 = ((($v$0$i$lcssa)) + 8|0);
       $159 = HEAP32[$158>>2]|0;
       $160 = ($159>>>0)<($149>>>0);
       if ($160) {
        _abort();
        // unreachable;
       }
       $161 = ((($159)) + 12|0);
       $162 = HEAP32[$161>>2]|0;
       $163 = ($162|0)==($v$0$i$lcssa|0);
       if (!($163)) {
        _abort();
        // unreachable;
       }
       $164 = ((($156)) + 8|0);
       $165 = HEAP32[$164>>2]|0;
       $166 = ($165|0)==($v$0$i$lcssa|0);
       if ($166) {
        HEAP32[$161>>2] = $156;
        HEAP32[$164>>2] = $159;
        $R$1$i = $156;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $180 = ($154|0)==(0|0);
     do {
      if (!($180)) {
       $181 = ((($v$0$i$lcssa)) + 28|0);
       $182 = HEAP32[$181>>2]|0;
       $183 = (526816 + ($182<<2)|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($v$0$i$lcssa|0)==($184|0);
       if ($185) {
        HEAP32[$183>>2] = $R$1$i;
        $cond$i = ($R$1$i|0)==(0|0);
        if ($cond$i) {
         $186 = 1 << $182;
         $187 = $186 ^ -1;
         $188 = HEAP32[(526516)>>2]|0;
         $189 = $188 & $187;
         HEAP32[(526516)>>2] = $189;
         break;
        }
       } else {
        $190 = HEAP32[(526528)>>2]|0;
        $191 = ($154>>>0)<($190>>>0);
        if ($191) {
         _abort();
         // unreachable;
        }
        $192 = ((($154)) + 16|0);
        $193 = HEAP32[$192>>2]|0;
        $194 = ($193|0)==($v$0$i$lcssa|0);
        if ($194) {
         HEAP32[$192>>2] = $R$1$i;
        } else {
         $195 = ((($154)) + 20|0);
         HEAP32[$195>>2] = $R$1$i;
        }
        $196 = ($R$1$i|0)==(0|0);
        if ($196) {
         break;
        }
       }
       $197 = HEAP32[(526528)>>2]|0;
       $198 = ($R$1$i>>>0)<($197>>>0);
       if ($198) {
        _abort();
        // unreachable;
       }
       $199 = ((($R$1$i)) + 24|0);
       HEAP32[$199>>2] = $154;
       $200 = ((($v$0$i$lcssa)) + 16|0);
       $201 = HEAP32[$200>>2]|0;
       $202 = ($201|0)==(0|0);
       do {
        if (!($202)) {
         $203 = ($201>>>0)<($197>>>0);
         if ($203) {
          _abort();
          // unreachable;
         } else {
          $204 = ((($R$1$i)) + 16|0);
          HEAP32[$204>>2] = $201;
          $205 = ((($201)) + 24|0);
          HEAP32[$205>>2] = $R$1$i;
          break;
         }
        }
       } while(0);
       $206 = ((($v$0$i$lcssa)) + 20|0);
       $207 = HEAP32[$206>>2]|0;
       $208 = ($207|0)==(0|0);
       if (!($208)) {
        $209 = HEAP32[(526528)>>2]|0;
        $210 = ($207>>>0)<($209>>>0);
        if ($210) {
         _abort();
         // unreachable;
        } else {
         $211 = ((($R$1$i)) + 20|0);
         HEAP32[$211>>2] = $207;
         $212 = ((($207)) + 24|0);
         HEAP32[$212>>2] = $R$1$i;
         break;
        }
       }
      }
     } while(0);
     $213 = ($rsize$0$i$lcssa>>>0)<(16);
     if ($213) {
      $214 = (($rsize$0$i$lcssa) + ($4))|0;
      $215 = $214 | 3;
      $216 = ((($v$0$i$lcssa)) + 4|0);
      HEAP32[$216>>2] = $215;
      $$sum4$i = (($214) + 4)|0;
      $217 = (($v$0$i$lcssa) + ($$sum4$i)|0);
      $218 = HEAP32[$217>>2]|0;
      $219 = $218 | 1;
      HEAP32[$217>>2] = $219;
     } else {
      $220 = $4 | 3;
      $221 = ((($v$0$i$lcssa)) + 4|0);
      HEAP32[$221>>2] = $220;
      $222 = $rsize$0$i$lcssa | 1;
      $$sum$i35 = $4 | 4;
      $223 = (($v$0$i$lcssa) + ($$sum$i35)|0);
      HEAP32[$223>>2] = $222;
      $$sum1$i = (($rsize$0$i$lcssa) + ($4))|0;
      $224 = (($v$0$i$lcssa) + ($$sum1$i)|0);
      HEAP32[$224>>2] = $rsize$0$i$lcssa;
      $225 = HEAP32[(526520)>>2]|0;
      $226 = ($225|0)==(0);
      if (!($226)) {
       $227 = HEAP32[(526532)>>2]|0;
       $228 = $225 >>> 3;
       $229 = $228 << 1;
       $230 = (526552 + ($229<<2)|0);
       $231 = HEAP32[526512>>2]|0;
       $232 = 1 << $228;
       $233 = $231 & $232;
       $234 = ($233|0)==(0);
       if ($234) {
        $235 = $231 | $232;
        HEAP32[526512>>2] = $235;
        $$pre$i = (($229) + 2)|0;
        $$pre8$i = (526552 + ($$pre$i<<2)|0);
        $$pre$phi$iZ2D = $$pre8$i;$F1$0$i = $230;
       } else {
        $$sum3$i = (($229) + 2)|0;
        $236 = (526552 + ($$sum3$i<<2)|0);
        $237 = HEAP32[$236>>2]|0;
        $238 = HEAP32[(526528)>>2]|0;
        $239 = ($237>>>0)<($238>>>0);
        if ($239) {
         _abort();
         // unreachable;
        } else {
         $$pre$phi$iZ2D = $236;$F1$0$i = $237;
        }
       }
       HEAP32[$$pre$phi$iZ2D>>2] = $227;
       $240 = ((($F1$0$i)) + 12|0);
       HEAP32[$240>>2] = $227;
       $241 = ((($227)) + 8|0);
       HEAP32[$241>>2] = $F1$0$i;
       $242 = ((($227)) + 12|0);
       HEAP32[$242>>2] = $230;
      }
      HEAP32[(526520)>>2] = $rsize$0$i$lcssa;
      HEAP32[(526532)>>2] = $151;
     }
     $243 = ((($v$0$i$lcssa)) + 8|0);
     $mem$0 = $243;
     return ($mem$0|0);
    }
   } else {
    $nb$0 = $4;
   }
  } else {
   $244 = ($bytes>>>0)>(4294967231);
   if ($244) {
    $nb$0 = -1;
   } else {
    $245 = (($bytes) + 11)|0;
    $246 = $245 & -8;
    $247 = HEAP32[(526516)>>2]|0;
    $248 = ($247|0)==(0);
    if ($248) {
     $nb$0 = $246;
    } else {
     $249 = (0 - ($246))|0;
     $250 = $245 >>> 8;
     $251 = ($250|0)==(0);
     if ($251) {
      $idx$0$i = 0;
     } else {
      $252 = ($246>>>0)>(16777215);
      if ($252) {
       $idx$0$i = 31;
      } else {
       $253 = (($250) + 1048320)|0;
       $254 = $253 >>> 16;
       $255 = $254 & 8;
       $256 = $250 << $255;
       $257 = (($256) + 520192)|0;
       $258 = $257 >>> 16;
       $259 = $258 & 4;
       $260 = $259 | $255;
       $261 = $256 << $259;
       $262 = (($261) + 245760)|0;
       $263 = $262 >>> 16;
       $264 = $263 & 2;
       $265 = $260 | $264;
       $266 = (14 - ($265))|0;
       $267 = $261 << $264;
       $268 = $267 >>> 15;
       $269 = (($266) + ($268))|0;
       $270 = $269 << 1;
       $271 = (($269) + 7)|0;
       $272 = $246 >>> $271;
       $273 = $272 & 1;
       $274 = $273 | $270;
       $idx$0$i = $274;
      }
     }
     $275 = (526816 + ($idx$0$i<<2)|0);
     $276 = HEAP32[$275>>2]|0;
     $277 = ($276|0)==(0|0);
     L123: do {
      if ($277) {
       $rsize$2$i = $249;$t$1$i = 0;$v$2$i = 0;
       label = 86;
      } else {
       $278 = ($idx$0$i|0)==(31);
       $279 = $idx$0$i >>> 1;
       $280 = (25 - ($279))|0;
       $281 = $278 ? 0 : $280;
       $282 = $246 << $281;
       $rsize$0$i15 = $249;$rst$0$i = 0;$sizebits$0$i = $282;$t$0$i14 = $276;$v$0$i16 = 0;
       while(1) {
        $283 = ((($t$0$i14)) + 4|0);
        $284 = HEAP32[$283>>2]|0;
        $285 = $284 & -8;
        $286 = (($285) - ($246))|0;
        $287 = ($286>>>0)<($rsize$0$i15>>>0);
        if ($287) {
         $288 = ($285|0)==($246|0);
         if ($288) {
          $rsize$331$i = $286;$t$230$i = $t$0$i14;$v$332$i = $t$0$i14;
          label = 90;
          break L123;
         } else {
          $rsize$1$i = $286;$v$1$i = $t$0$i14;
         }
        } else {
         $rsize$1$i = $rsize$0$i15;$v$1$i = $v$0$i16;
        }
        $289 = ((($t$0$i14)) + 20|0);
        $290 = HEAP32[$289>>2]|0;
        $291 = $sizebits$0$i >>> 31;
        $292 = (((($t$0$i14)) + 16|0) + ($291<<2)|0);
        $293 = HEAP32[$292>>2]|0;
        $294 = ($290|0)==(0|0);
        $295 = ($290|0)==($293|0);
        $or$cond19$i = $294 | $295;
        $rst$1$i = $or$cond19$i ? $rst$0$i : $290;
        $296 = ($293|0)==(0|0);
        $297 = $sizebits$0$i << 1;
        if ($296) {
         $rsize$2$i = $rsize$1$i;$t$1$i = $rst$1$i;$v$2$i = $v$1$i;
         label = 86;
         break;
        } else {
         $rsize$0$i15 = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $297;$t$0$i14 = $293;$v$0$i16 = $v$1$i;
        }
       }
      }
     } while(0);
     if ((label|0) == 86) {
      $298 = ($t$1$i|0)==(0|0);
      $299 = ($v$2$i|0)==(0|0);
      $or$cond$i = $298 & $299;
      if ($or$cond$i) {
       $300 = 2 << $idx$0$i;
       $301 = (0 - ($300))|0;
       $302 = $300 | $301;
       $303 = $247 & $302;
       $304 = ($303|0)==(0);
       if ($304) {
        $nb$0 = $246;
        break;
       }
       $305 = (0 - ($303))|0;
       $306 = $303 & $305;
       $307 = (($306) + -1)|0;
       $308 = $307 >>> 12;
       $309 = $308 & 16;
       $310 = $307 >>> $309;
       $311 = $310 >>> 5;
       $312 = $311 & 8;
       $313 = $312 | $309;
       $314 = $310 >>> $312;
       $315 = $314 >>> 2;
       $316 = $315 & 4;
       $317 = $313 | $316;
       $318 = $314 >>> $316;
       $319 = $318 >>> 1;
       $320 = $319 & 2;
       $321 = $317 | $320;
       $322 = $318 >>> $320;
       $323 = $322 >>> 1;
       $324 = $323 & 1;
       $325 = $321 | $324;
       $326 = $322 >>> $324;
       $327 = (($325) + ($326))|0;
       $328 = (526816 + ($327<<2)|0);
       $329 = HEAP32[$328>>2]|0;
       $t$2$ph$i = $329;$v$3$ph$i = 0;
      } else {
       $t$2$ph$i = $t$1$i;$v$3$ph$i = $v$2$i;
      }
      $330 = ($t$2$ph$i|0)==(0|0);
      if ($330) {
       $rsize$3$lcssa$i = $rsize$2$i;$v$3$lcssa$i = $v$3$ph$i;
      } else {
       $rsize$331$i = $rsize$2$i;$t$230$i = $t$2$ph$i;$v$332$i = $v$3$ph$i;
       label = 90;
      }
     }
     if ((label|0) == 90) {
      while(1) {
       label = 0;
       $331 = ((($t$230$i)) + 4|0);
       $332 = HEAP32[$331>>2]|0;
       $333 = $332 & -8;
       $334 = (($333) - ($246))|0;
       $335 = ($334>>>0)<($rsize$331$i>>>0);
       $$rsize$3$i = $335 ? $334 : $rsize$331$i;
       $t$2$v$3$i = $335 ? $t$230$i : $v$332$i;
       $336 = ((($t$230$i)) + 16|0);
       $337 = HEAP32[$336>>2]|0;
       $338 = ($337|0)==(0|0);
       if (!($338)) {
        $rsize$331$i = $$rsize$3$i;$t$230$i = $337;$v$332$i = $t$2$v$3$i;
        label = 90;
        continue;
       }
       $339 = ((($t$230$i)) + 20|0);
       $340 = HEAP32[$339>>2]|0;
       $341 = ($340|0)==(0|0);
       if ($341) {
        $rsize$3$lcssa$i = $$rsize$3$i;$v$3$lcssa$i = $t$2$v$3$i;
        break;
       } else {
        $rsize$331$i = $$rsize$3$i;$t$230$i = $340;$v$332$i = $t$2$v$3$i;
        label = 90;
       }
      }
     }
     $342 = ($v$3$lcssa$i|0)==(0|0);
     if ($342) {
      $nb$0 = $246;
     } else {
      $343 = HEAP32[(526520)>>2]|0;
      $344 = (($343) - ($246))|0;
      $345 = ($rsize$3$lcssa$i>>>0)<($344>>>0);
      if ($345) {
       $346 = HEAP32[(526528)>>2]|0;
       $347 = ($v$3$lcssa$i>>>0)<($346>>>0);
       if ($347) {
        _abort();
        // unreachable;
       }
       $348 = (($v$3$lcssa$i) + ($246)|0);
       $349 = ($v$3$lcssa$i>>>0)<($348>>>0);
       if (!($349)) {
        _abort();
        // unreachable;
       }
       $350 = ((($v$3$lcssa$i)) + 24|0);
       $351 = HEAP32[$350>>2]|0;
       $352 = ((($v$3$lcssa$i)) + 12|0);
       $353 = HEAP32[$352>>2]|0;
       $354 = ($353|0)==($v$3$lcssa$i|0);
       do {
        if ($354) {
         $364 = ((($v$3$lcssa$i)) + 20|0);
         $365 = HEAP32[$364>>2]|0;
         $366 = ($365|0)==(0|0);
         if ($366) {
          $367 = ((($v$3$lcssa$i)) + 16|0);
          $368 = HEAP32[$367>>2]|0;
          $369 = ($368|0)==(0|0);
          if ($369) {
           $R$1$i20 = 0;
           break;
          } else {
           $R$0$i18 = $368;$RP$0$i17 = $367;
          }
         } else {
          $R$0$i18 = $365;$RP$0$i17 = $364;
         }
         while(1) {
          $370 = ((($R$0$i18)) + 20|0);
          $371 = HEAP32[$370>>2]|0;
          $372 = ($371|0)==(0|0);
          if (!($372)) {
           $R$0$i18 = $371;$RP$0$i17 = $370;
           continue;
          }
          $373 = ((($R$0$i18)) + 16|0);
          $374 = HEAP32[$373>>2]|0;
          $375 = ($374|0)==(0|0);
          if ($375) {
           $R$0$i18$lcssa = $R$0$i18;$RP$0$i17$lcssa = $RP$0$i17;
           break;
          } else {
           $R$0$i18 = $374;$RP$0$i17 = $373;
          }
         }
         $376 = ($RP$0$i17$lcssa>>>0)<($346>>>0);
         if ($376) {
          _abort();
          // unreachable;
         } else {
          HEAP32[$RP$0$i17$lcssa>>2] = 0;
          $R$1$i20 = $R$0$i18$lcssa;
          break;
         }
        } else {
         $355 = ((($v$3$lcssa$i)) + 8|0);
         $356 = HEAP32[$355>>2]|0;
         $357 = ($356>>>0)<($346>>>0);
         if ($357) {
          _abort();
          // unreachable;
         }
         $358 = ((($356)) + 12|0);
         $359 = HEAP32[$358>>2]|0;
         $360 = ($359|0)==($v$3$lcssa$i|0);
         if (!($360)) {
          _abort();
          // unreachable;
         }
         $361 = ((($353)) + 8|0);
         $362 = HEAP32[$361>>2]|0;
         $363 = ($362|0)==($v$3$lcssa$i|0);
         if ($363) {
          HEAP32[$358>>2] = $353;
          HEAP32[$361>>2] = $356;
          $R$1$i20 = $353;
          break;
         } else {
          _abort();
          // unreachable;
         }
        }
       } while(0);
       $377 = ($351|0)==(0|0);
       do {
        if (!($377)) {
         $378 = ((($v$3$lcssa$i)) + 28|0);
         $379 = HEAP32[$378>>2]|0;
         $380 = (526816 + ($379<<2)|0);
         $381 = HEAP32[$380>>2]|0;
         $382 = ($v$3$lcssa$i|0)==($381|0);
         if ($382) {
          HEAP32[$380>>2] = $R$1$i20;
          $cond$i21 = ($R$1$i20|0)==(0|0);
          if ($cond$i21) {
           $383 = 1 << $379;
           $384 = $383 ^ -1;
           $385 = HEAP32[(526516)>>2]|0;
           $386 = $385 & $384;
           HEAP32[(526516)>>2] = $386;
           break;
          }
         } else {
          $387 = HEAP32[(526528)>>2]|0;
          $388 = ($351>>>0)<($387>>>0);
          if ($388) {
           _abort();
           // unreachable;
          }
          $389 = ((($351)) + 16|0);
          $390 = HEAP32[$389>>2]|0;
          $391 = ($390|0)==($v$3$lcssa$i|0);
          if ($391) {
           HEAP32[$389>>2] = $R$1$i20;
          } else {
           $392 = ((($351)) + 20|0);
           HEAP32[$392>>2] = $R$1$i20;
          }
          $393 = ($R$1$i20|0)==(0|0);
          if ($393) {
           break;
          }
         }
         $394 = HEAP32[(526528)>>2]|0;
         $395 = ($R$1$i20>>>0)<($394>>>0);
         if ($395) {
          _abort();
          // unreachable;
         }
         $396 = ((($R$1$i20)) + 24|0);
         HEAP32[$396>>2] = $351;
         $397 = ((($v$3$lcssa$i)) + 16|0);
         $398 = HEAP32[$397>>2]|0;
         $399 = ($398|0)==(0|0);
         do {
          if (!($399)) {
           $400 = ($398>>>0)<($394>>>0);
           if ($400) {
            _abort();
            // unreachable;
           } else {
            $401 = ((($R$1$i20)) + 16|0);
            HEAP32[$401>>2] = $398;
            $402 = ((($398)) + 24|0);
            HEAP32[$402>>2] = $R$1$i20;
            break;
           }
          }
         } while(0);
         $403 = ((($v$3$lcssa$i)) + 20|0);
         $404 = HEAP32[$403>>2]|0;
         $405 = ($404|0)==(0|0);
         if (!($405)) {
          $406 = HEAP32[(526528)>>2]|0;
          $407 = ($404>>>0)<($406>>>0);
          if ($407) {
           _abort();
           // unreachable;
          } else {
           $408 = ((($R$1$i20)) + 20|0);
           HEAP32[$408>>2] = $404;
           $409 = ((($404)) + 24|0);
           HEAP32[$409>>2] = $R$1$i20;
           break;
          }
         }
        }
       } while(0);
       $410 = ($rsize$3$lcssa$i>>>0)<(16);
       L199: do {
        if ($410) {
         $411 = (($rsize$3$lcssa$i) + ($246))|0;
         $412 = $411 | 3;
         $413 = ((($v$3$lcssa$i)) + 4|0);
         HEAP32[$413>>2] = $412;
         $$sum18$i = (($411) + 4)|0;
         $414 = (($v$3$lcssa$i) + ($$sum18$i)|0);
         $415 = HEAP32[$414>>2]|0;
         $416 = $415 | 1;
         HEAP32[$414>>2] = $416;
        } else {
         $417 = $246 | 3;
         $418 = ((($v$3$lcssa$i)) + 4|0);
         HEAP32[$418>>2] = $417;
         $419 = $rsize$3$lcssa$i | 1;
         $$sum$i2334 = $246 | 4;
         $420 = (($v$3$lcssa$i) + ($$sum$i2334)|0);
         HEAP32[$420>>2] = $419;
         $$sum1$i24 = (($rsize$3$lcssa$i) + ($246))|0;
         $421 = (($v$3$lcssa$i) + ($$sum1$i24)|0);
         HEAP32[$421>>2] = $rsize$3$lcssa$i;
         $422 = $rsize$3$lcssa$i >>> 3;
         $423 = ($rsize$3$lcssa$i>>>0)<(256);
         if ($423) {
          $424 = $422 << 1;
          $425 = (526552 + ($424<<2)|0);
          $426 = HEAP32[526512>>2]|0;
          $427 = 1 << $422;
          $428 = $426 & $427;
          $429 = ($428|0)==(0);
          if ($429) {
           $430 = $426 | $427;
           HEAP32[526512>>2] = $430;
           $$pre$i25 = (($424) + 2)|0;
           $$pre43$i = (526552 + ($$pre$i25<<2)|0);
           $$pre$phi$i26Z2D = $$pre43$i;$F5$0$i = $425;
          } else {
           $$sum17$i = (($424) + 2)|0;
           $431 = (526552 + ($$sum17$i<<2)|0);
           $432 = HEAP32[$431>>2]|0;
           $433 = HEAP32[(526528)>>2]|0;
           $434 = ($432>>>0)<($433>>>0);
           if ($434) {
            _abort();
            // unreachable;
           } else {
            $$pre$phi$i26Z2D = $431;$F5$0$i = $432;
           }
          }
          HEAP32[$$pre$phi$i26Z2D>>2] = $348;
          $435 = ((($F5$0$i)) + 12|0);
          HEAP32[$435>>2] = $348;
          $$sum15$i = (($246) + 8)|0;
          $436 = (($v$3$lcssa$i) + ($$sum15$i)|0);
          HEAP32[$436>>2] = $F5$0$i;
          $$sum16$i = (($246) + 12)|0;
          $437 = (($v$3$lcssa$i) + ($$sum16$i)|0);
          HEAP32[$437>>2] = $425;
          break;
         }
         $438 = $rsize$3$lcssa$i >>> 8;
         $439 = ($438|0)==(0);
         if ($439) {
          $I7$0$i = 0;
         } else {
          $440 = ($rsize$3$lcssa$i>>>0)>(16777215);
          if ($440) {
           $I7$0$i = 31;
          } else {
           $441 = (($438) + 1048320)|0;
           $442 = $441 >>> 16;
           $443 = $442 & 8;
           $444 = $438 << $443;
           $445 = (($444) + 520192)|0;
           $446 = $445 >>> 16;
           $447 = $446 & 4;
           $448 = $447 | $443;
           $449 = $444 << $447;
           $450 = (($449) + 245760)|0;
           $451 = $450 >>> 16;
           $452 = $451 & 2;
           $453 = $448 | $452;
           $454 = (14 - ($453))|0;
           $455 = $449 << $452;
           $456 = $455 >>> 15;
           $457 = (($454) + ($456))|0;
           $458 = $457 << 1;
           $459 = (($457) + 7)|0;
           $460 = $rsize$3$lcssa$i >>> $459;
           $461 = $460 & 1;
           $462 = $461 | $458;
           $I7$0$i = $462;
          }
         }
         $463 = (526816 + ($I7$0$i<<2)|0);
         $$sum2$i = (($246) + 28)|0;
         $464 = (($v$3$lcssa$i) + ($$sum2$i)|0);
         HEAP32[$464>>2] = $I7$0$i;
         $$sum3$i27 = (($246) + 16)|0;
         $465 = (($v$3$lcssa$i) + ($$sum3$i27)|0);
         $$sum4$i28 = (($246) + 20)|0;
         $466 = (($v$3$lcssa$i) + ($$sum4$i28)|0);
         HEAP32[$466>>2] = 0;
         HEAP32[$465>>2] = 0;
         $467 = HEAP32[(526516)>>2]|0;
         $468 = 1 << $I7$0$i;
         $469 = $467 & $468;
         $470 = ($469|0)==(0);
         if ($470) {
          $471 = $467 | $468;
          HEAP32[(526516)>>2] = $471;
          HEAP32[$463>>2] = $348;
          $$sum5$i = (($246) + 24)|0;
          $472 = (($v$3$lcssa$i) + ($$sum5$i)|0);
          HEAP32[$472>>2] = $463;
          $$sum6$i = (($246) + 12)|0;
          $473 = (($v$3$lcssa$i) + ($$sum6$i)|0);
          HEAP32[$473>>2] = $348;
          $$sum7$i = (($246) + 8)|0;
          $474 = (($v$3$lcssa$i) + ($$sum7$i)|0);
          HEAP32[$474>>2] = $348;
          break;
         }
         $475 = HEAP32[$463>>2]|0;
         $476 = ((($475)) + 4|0);
         $477 = HEAP32[$476>>2]|0;
         $478 = $477 & -8;
         $479 = ($478|0)==($rsize$3$lcssa$i|0);
         L217: do {
          if ($479) {
           $T$0$lcssa$i = $475;
          } else {
           $480 = ($I7$0$i|0)==(31);
           $481 = $I7$0$i >>> 1;
           $482 = (25 - ($481))|0;
           $483 = $480 ? 0 : $482;
           $484 = $rsize$3$lcssa$i << $483;
           $K12$029$i = $484;$T$028$i = $475;
           while(1) {
            $491 = $K12$029$i >>> 31;
            $492 = (((($T$028$i)) + 16|0) + ($491<<2)|0);
            $487 = HEAP32[$492>>2]|0;
            $493 = ($487|0)==(0|0);
            if ($493) {
             $$lcssa232 = $492;$T$028$i$lcssa = $T$028$i;
             break;
            }
            $485 = $K12$029$i << 1;
            $486 = ((($487)) + 4|0);
            $488 = HEAP32[$486>>2]|0;
            $489 = $488 & -8;
            $490 = ($489|0)==($rsize$3$lcssa$i|0);
            if ($490) {
             $T$0$lcssa$i = $487;
             break L217;
            } else {
             $K12$029$i = $485;$T$028$i = $487;
            }
           }
           $494 = HEAP32[(526528)>>2]|0;
           $495 = ($$lcssa232>>>0)<($494>>>0);
           if ($495) {
            _abort();
            // unreachable;
           } else {
            HEAP32[$$lcssa232>>2] = $348;
            $$sum11$i = (($246) + 24)|0;
            $496 = (($v$3$lcssa$i) + ($$sum11$i)|0);
            HEAP32[$496>>2] = $T$028$i$lcssa;
            $$sum12$i = (($246) + 12)|0;
            $497 = (($v$3$lcssa$i) + ($$sum12$i)|0);
            HEAP32[$497>>2] = $348;
            $$sum13$i = (($246) + 8)|0;
            $498 = (($v$3$lcssa$i) + ($$sum13$i)|0);
            HEAP32[$498>>2] = $348;
            break L199;
           }
          }
         } while(0);
         $499 = ((($T$0$lcssa$i)) + 8|0);
         $500 = HEAP32[$499>>2]|0;
         $501 = HEAP32[(526528)>>2]|0;
         $502 = ($500>>>0)>=($501>>>0);
         $not$$i = ($T$0$lcssa$i>>>0)>=($501>>>0);
         $503 = $502 & $not$$i;
         if ($503) {
          $504 = ((($500)) + 12|0);
          HEAP32[$504>>2] = $348;
          HEAP32[$499>>2] = $348;
          $$sum8$i = (($246) + 8)|0;
          $505 = (($v$3$lcssa$i) + ($$sum8$i)|0);
          HEAP32[$505>>2] = $500;
          $$sum9$i = (($246) + 12)|0;
          $506 = (($v$3$lcssa$i) + ($$sum9$i)|0);
          HEAP32[$506>>2] = $T$0$lcssa$i;
          $$sum10$i = (($246) + 24)|0;
          $507 = (($v$3$lcssa$i) + ($$sum10$i)|0);
          HEAP32[$507>>2] = 0;
          break;
         } else {
          _abort();
          // unreachable;
         }
        }
       } while(0);
       $508 = ((($v$3$lcssa$i)) + 8|0);
       $mem$0 = $508;
       return ($mem$0|0);
      } else {
       $nb$0 = $246;
      }
     }
    }
   }
  }
 } while(0);
 $509 = HEAP32[(526520)>>2]|0;
 $510 = ($509>>>0)<($nb$0>>>0);
 if (!($510)) {
  $511 = (($509) - ($nb$0))|0;
  $512 = HEAP32[(526532)>>2]|0;
  $513 = ($511>>>0)>(15);
  if ($513) {
   $514 = (($512) + ($nb$0)|0);
   HEAP32[(526532)>>2] = $514;
   HEAP32[(526520)>>2] = $511;
   $515 = $511 | 1;
   $$sum2 = (($nb$0) + 4)|0;
   $516 = (($512) + ($$sum2)|0);
   HEAP32[$516>>2] = $515;
   $517 = (($512) + ($509)|0);
   HEAP32[$517>>2] = $511;
   $518 = $nb$0 | 3;
   $519 = ((($512)) + 4|0);
   HEAP32[$519>>2] = $518;
  } else {
   HEAP32[(526520)>>2] = 0;
   HEAP32[(526532)>>2] = 0;
   $520 = $509 | 3;
   $521 = ((($512)) + 4|0);
   HEAP32[$521>>2] = $520;
   $$sum1 = (($509) + 4)|0;
   $522 = (($512) + ($$sum1)|0);
   $523 = HEAP32[$522>>2]|0;
   $524 = $523 | 1;
   HEAP32[$522>>2] = $524;
  }
  $525 = ((($512)) + 8|0);
  $mem$0 = $525;
  return ($mem$0|0);
 }
 $526 = HEAP32[(526524)>>2]|0;
 $527 = ($526>>>0)>($nb$0>>>0);
 if ($527) {
  $528 = (($526) - ($nb$0))|0;
  HEAP32[(526524)>>2] = $528;
  $529 = HEAP32[(526536)>>2]|0;
  $530 = (($529) + ($nb$0)|0);
  HEAP32[(526536)>>2] = $530;
  $531 = $528 | 1;
  $$sum = (($nb$0) + 4)|0;
  $532 = (($529) + ($$sum)|0);
  HEAP32[$532>>2] = $531;
  $533 = $nb$0 | 3;
  $534 = ((($529)) + 4|0);
  HEAP32[$534>>2] = $533;
  $535 = ((($529)) + 8|0);
  $mem$0 = $535;
  return ($mem$0|0);
 }
 $536 = HEAP32[526984>>2]|0;
 $537 = ($536|0)==(0);
 do {
  if ($537) {
   $538 = (_sysconf(30)|0);
   $539 = (($538) + -1)|0;
   $540 = $539 & $538;
   $541 = ($540|0)==(0);
   if ($541) {
    HEAP32[(526992)>>2] = $538;
    HEAP32[(526988)>>2] = $538;
    HEAP32[(526996)>>2] = -1;
    HEAP32[(527000)>>2] = -1;
    HEAP32[(527004)>>2] = 0;
    HEAP32[(526956)>>2] = 0;
    $542 = (_time((0|0))|0);
    $543 = $542 & -16;
    $544 = $543 ^ 1431655768;
    HEAP32[526984>>2] = $544;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $545 = (($nb$0) + 48)|0;
 $546 = HEAP32[(526992)>>2]|0;
 $547 = (($nb$0) + 47)|0;
 $548 = (($546) + ($547))|0;
 $549 = (0 - ($546))|0;
 $550 = $548 & $549;
 $551 = ($550>>>0)>($nb$0>>>0);
 if (!($551)) {
  $mem$0 = 0;
  return ($mem$0|0);
 }
 $552 = HEAP32[(526952)>>2]|0;
 $553 = ($552|0)==(0);
 if (!($553)) {
  $554 = HEAP32[(526944)>>2]|0;
  $555 = (($554) + ($550))|0;
  $556 = ($555>>>0)<=($554>>>0);
  $557 = ($555>>>0)>($552>>>0);
  $or$cond1$i = $556 | $557;
  if ($or$cond1$i) {
   $mem$0 = 0;
   return ($mem$0|0);
  }
 }
 $558 = HEAP32[(526956)>>2]|0;
 $559 = $558 & 4;
 $560 = ($559|0)==(0);
 L258: do {
  if ($560) {
   $561 = HEAP32[(526536)>>2]|0;
   $562 = ($561|0)==(0|0);
   L260: do {
    if ($562) {
     label = 174;
    } else {
     $sp$0$i$i = (526960);
     while(1) {
      $563 = HEAP32[$sp$0$i$i>>2]|0;
      $564 = ($563>>>0)>($561>>>0);
      if (!($564)) {
       $565 = ((($sp$0$i$i)) + 4|0);
       $566 = HEAP32[$565>>2]|0;
       $567 = (($563) + ($566)|0);
       $568 = ($567>>>0)>($561>>>0);
       if ($568) {
        $$lcssa228 = $sp$0$i$i;$$lcssa230 = $565;
        break;
       }
      }
      $569 = ((($sp$0$i$i)) + 8|0);
      $570 = HEAP32[$569>>2]|0;
      $571 = ($570|0)==(0|0);
      if ($571) {
       label = 174;
       break L260;
      } else {
       $sp$0$i$i = $570;
      }
     }
     $594 = HEAP32[(526524)>>2]|0;
     $595 = (($548) - ($594))|0;
     $596 = $595 & $549;
     $597 = ($596>>>0)<(2147483647);
     if ($597) {
      $598 = (_sbrk(($596|0))|0);
      $599 = HEAP32[$$lcssa228>>2]|0;
      $600 = HEAP32[$$lcssa230>>2]|0;
      $601 = (($599) + ($600)|0);
      $602 = ($598|0)==($601|0);
      $$3$i = $602 ? $596 : 0;
      if ($602) {
       $603 = ($598|0)==((-1)|0);
       if ($603) {
        $tsize$0323944$i = $$3$i;
       } else {
        $tbase$255$i = $598;$tsize$254$i = $$3$i;
        label = 194;
        break L258;
       }
      } else {
       $br$0$ph$i = $598;$ssize$1$ph$i = $596;$tsize$0$ph$i = $$3$i;
       label = 184;
      }
     } else {
      $tsize$0323944$i = 0;
     }
    }
   } while(0);
   do {
    if ((label|0) == 174) {
     $572 = (_sbrk(0)|0);
     $573 = ($572|0)==((-1)|0);
     if ($573) {
      $tsize$0323944$i = 0;
     } else {
      $574 = $572;
      $575 = HEAP32[(526988)>>2]|0;
      $576 = (($575) + -1)|0;
      $577 = $576 & $574;
      $578 = ($577|0)==(0);
      if ($578) {
       $ssize$0$i = $550;
      } else {
       $579 = (($576) + ($574))|0;
       $580 = (0 - ($575))|0;
       $581 = $579 & $580;
       $582 = (($550) - ($574))|0;
       $583 = (($582) + ($581))|0;
       $ssize$0$i = $583;
      }
      $584 = HEAP32[(526944)>>2]|0;
      $585 = (($584) + ($ssize$0$i))|0;
      $586 = ($ssize$0$i>>>0)>($nb$0>>>0);
      $587 = ($ssize$0$i>>>0)<(2147483647);
      $or$cond$i30 = $586 & $587;
      if ($or$cond$i30) {
       $588 = HEAP32[(526952)>>2]|0;
       $589 = ($588|0)==(0);
       if (!($589)) {
        $590 = ($585>>>0)<=($584>>>0);
        $591 = ($585>>>0)>($588>>>0);
        $or$cond2$i = $590 | $591;
        if ($or$cond2$i) {
         $tsize$0323944$i = 0;
         break;
        }
       }
       $592 = (_sbrk(($ssize$0$i|0))|0);
       $593 = ($592|0)==($572|0);
       $ssize$0$$i = $593 ? $ssize$0$i : 0;
       if ($593) {
        $tbase$255$i = $572;$tsize$254$i = $ssize$0$$i;
        label = 194;
        break L258;
       } else {
        $br$0$ph$i = $592;$ssize$1$ph$i = $ssize$0$i;$tsize$0$ph$i = $ssize$0$$i;
        label = 184;
       }
      } else {
       $tsize$0323944$i = 0;
      }
     }
    }
   } while(0);
   L280: do {
    if ((label|0) == 184) {
     $604 = (0 - ($ssize$1$ph$i))|0;
     $605 = ($br$0$ph$i|0)!=((-1)|0);
     $606 = ($ssize$1$ph$i>>>0)<(2147483647);
     $or$cond5$i = $606 & $605;
     $607 = ($545>>>0)>($ssize$1$ph$i>>>0);
     $or$cond6$i = $607 & $or$cond5$i;
     do {
      if ($or$cond6$i) {
       $608 = HEAP32[(526992)>>2]|0;
       $609 = (($547) - ($ssize$1$ph$i))|0;
       $610 = (($609) + ($608))|0;
       $611 = (0 - ($608))|0;
       $612 = $610 & $611;
       $613 = ($612>>>0)<(2147483647);
       if ($613) {
        $614 = (_sbrk(($612|0))|0);
        $615 = ($614|0)==((-1)|0);
        if ($615) {
         (_sbrk(($604|0))|0);
         $tsize$0323944$i = $tsize$0$ph$i;
         break L280;
        } else {
         $616 = (($612) + ($ssize$1$ph$i))|0;
         $ssize$2$i = $616;
         break;
        }
       } else {
        $ssize$2$i = $ssize$1$ph$i;
       }
      } else {
       $ssize$2$i = $ssize$1$ph$i;
      }
     } while(0);
     $617 = ($br$0$ph$i|0)==((-1)|0);
     if ($617) {
      $tsize$0323944$i = $tsize$0$ph$i;
     } else {
      $tbase$255$i = $br$0$ph$i;$tsize$254$i = $ssize$2$i;
      label = 194;
      break L258;
     }
    }
   } while(0);
   $618 = HEAP32[(526956)>>2]|0;
   $619 = $618 | 4;
   HEAP32[(526956)>>2] = $619;
   $tsize$1$i = $tsize$0323944$i;
   label = 191;
  } else {
   $tsize$1$i = 0;
   label = 191;
  }
 } while(0);
 if ((label|0) == 191) {
  $620 = ($550>>>0)<(2147483647);
  if ($620) {
   $621 = (_sbrk(($550|0))|0);
   $622 = (_sbrk(0)|0);
   $623 = ($621|0)!=((-1)|0);
   $624 = ($622|0)!=((-1)|0);
   $or$cond3$i = $623 & $624;
   $625 = ($621>>>0)<($622>>>0);
   $or$cond8$i = $625 & $or$cond3$i;
   if ($or$cond8$i) {
    $626 = $622;
    $627 = $621;
    $628 = (($626) - ($627))|0;
    $629 = (($nb$0) + 40)|0;
    $630 = ($628>>>0)>($629>>>0);
    $$tsize$1$i = $630 ? $628 : $tsize$1$i;
    if ($630) {
     $tbase$255$i = $621;$tsize$254$i = $$tsize$1$i;
     label = 194;
    }
   }
  }
 }
 if ((label|0) == 194) {
  $631 = HEAP32[(526944)>>2]|0;
  $632 = (($631) + ($tsize$254$i))|0;
  HEAP32[(526944)>>2] = $632;
  $633 = HEAP32[(526948)>>2]|0;
  $634 = ($632>>>0)>($633>>>0);
  if ($634) {
   HEAP32[(526948)>>2] = $632;
  }
  $635 = HEAP32[(526536)>>2]|0;
  $636 = ($635|0)==(0|0);
  L299: do {
   if ($636) {
    $637 = HEAP32[(526528)>>2]|0;
    $638 = ($637|0)==(0|0);
    $639 = ($tbase$255$i>>>0)<($637>>>0);
    $or$cond9$i = $638 | $639;
    if ($or$cond9$i) {
     HEAP32[(526528)>>2] = $tbase$255$i;
    }
    HEAP32[(526960)>>2] = $tbase$255$i;
    HEAP32[(526964)>>2] = $tsize$254$i;
    HEAP32[(526972)>>2] = 0;
    $640 = HEAP32[526984>>2]|0;
    HEAP32[(526548)>>2] = $640;
    HEAP32[(526544)>>2] = -1;
    $i$02$i$i = 0;
    while(1) {
     $641 = $i$02$i$i << 1;
     $642 = (526552 + ($641<<2)|0);
     $$sum$i$i = (($641) + 3)|0;
     $643 = (526552 + ($$sum$i$i<<2)|0);
     HEAP32[$643>>2] = $642;
     $$sum1$i$i = (($641) + 2)|0;
     $644 = (526552 + ($$sum1$i$i<<2)|0);
     HEAP32[$644>>2] = $642;
     $645 = (($i$02$i$i) + 1)|0;
     $exitcond$i$i = ($645|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $i$02$i$i = $645;
     }
    }
    $646 = (($tsize$254$i) + -40)|0;
    $647 = ((($tbase$255$i)) + 8|0);
    $648 = $647;
    $649 = $648 & 7;
    $650 = ($649|0)==(0);
    $651 = (0 - ($648))|0;
    $652 = $651 & 7;
    $653 = $650 ? 0 : $652;
    $654 = (($tbase$255$i) + ($653)|0);
    $655 = (($646) - ($653))|0;
    HEAP32[(526536)>>2] = $654;
    HEAP32[(526524)>>2] = $655;
    $656 = $655 | 1;
    $$sum$i13$i = (($653) + 4)|0;
    $657 = (($tbase$255$i) + ($$sum$i13$i)|0);
    HEAP32[$657>>2] = $656;
    $$sum2$i$i = (($tsize$254$i) + -36)|0;
    $658 = (($tbase$255$i) + ($$sum2$i$i)|0);
    HEAP32[$658>>2] = 40;
    $659 = HEAP32[(527000)>>2]|0;
    HEAP32[(526540)>>2] = $659;
   } else {
    $sp$084$i = (526960);
    while(1) {
     $660 = HEAP32[$sp$084$i>>2]|0;
     $661 = ((($sp$084$i)) + 4|0);
     $662 = HEAP32[$661>>2]|0;
     $663 = (($660) + ($662)|0);
     $664 = ($tbase$255$i|0)==($663|0);
     if ($664) {
      $$lcssa222 = $660;$$lcssa224 = $661;$$lcssa226 = $662;$sp$084$i$lcssa = $sp$084$i;
      label = 204;
      break;
     }
     $665 = ((($sp$084$i)) + 8|0);
     $666 = HEAP32[$665>>2]|0;
     $667 = ($666|0)==(0|0);
     if ($667) {
      break;
     } else {
      $sp$084$i = $666;
     }
    }
    if ((label|0) == 204) {
     $668 = ((($sp$084$i$lcssa)) + 12|0);
     $669 = HEAP32[$668>>2]|0;
     $670 = $669 & 8;
     $671 = ($670|0)==(0);
     if ($671) {
      $672 = ($635>>>0)>=($$lcssa222>>>0);
      $673 = ($635>>>0)<($tbase$255$i>>>0);
      $or$cond57$i = $673 & $672;
      if ($or$cond57$i) {
       $674 = (($$lcssa226) + ($tsize$254$i))|0;
       HEAP32[$$lcssa224>>2] = $674;
       $675 = HEAP32[(526524)>>2]|0;
       $676 = (($675) + ($tsize$254$i))|0;
       $677 = ((($635)) + 8|0);
       $678 = $677;
       $679 = $678 & 7;
       $680 = ($679|0)==(0);
       $681 = (0 - ($678))|0;
       $682 = $681 & 7;
       $683 = $680 ? 0 : $682;
       $684 = (($635) + ($683)|0);
       $685 = (($676) - ($683))|0;
       HEAP32[(526536)>>2] = $684;
       HEAP32[(526524)>>2] = $685;
       $686 = $685 | 1;
       $$sum$i17$i = (($683) + 4)|0;
       $687 = (($635) + ($$sum$i17$i)|0);
       HEAP32[$687>>2] = $686;
       $$sum2$i18$i = (($676) + 4)|0;
       $688 = (($635) + ($$sum2$i18$i)|0);
       HEAP32[$688>>2] = 40;
       $689 = HEAP32[(527000)>>2]|0;
       HEAP32[(526540)>>2] = $689;
       break;
      }
     }
    }
    $690 = HEAP32[(526528)>>2]|0;
    $691 = ($tbase$255$i>>>0)<($690>>>0);
    if ($691) {
     HEAP32[(526528)>>2] = $tbase$255$i;
     $755 = $tbase$255$i;
    } else {
     $755 = $690;
    }
    $692 = (($tbase$255$i) + ($tsize$254$i)|0);
    $sp$183$i = (526960);
    while(1) {
     $693 = HEAP32[$sp$183$i>>2]|0;
     $694 = ($693|0)==($692|0);
     if ($694) {
      $$lcssa219 = $sp$183$i;$sp$183$i$lcssa = $sp$183$i;
      label = 212;
      break;
     }
     $695 = ((($sp$183$i)) + 8|0);
     $696 = HEAP32[$695>>2]|0;
     $697 = ($696|0)==(0|0);
     if ($697) {
      $sp$0$i$i$i = (526960);
      break;
     } else {
      $sp$183$i = $696;
     }
    }
    if ((label|0) == 212) {
     $698 = ((($sp$183$i$lcssa)) + 12|0);
     $699 = HEAP32[$698>>2]|0;
     $700 = $699 & 8;
     $701 = ($700|0)==(0);
     if ($701) {
      HEAP32[$$lcssa219>>2] = $tbase$255$i;
      $702 = ((($sp$183$i$lcssa)) + 4|0);
      $703 = HEAP32[$702>>2]|0;
      $704 = (($703) + ($tsize$254$i))|0;
      HEAP32[$702>>2] = $704;
      $705 = ((($tbase$255$i)) + 8|0);
      $706 = $705;
      $707 = $706 & 7;
      $708 = ($707|0)==(0);
      $709 = (0 - ($706))|0;
      $710 = $709 & 7;
      $711 = $708 ? 0 : $710;
      $712 = (($tbase$255$i) + ($711)|0);
      $$sum112$i = (($tsize$254$i) + 8)|0;
      $713 = (($tbase$255$i) + ($$sum112$i)|0);
      $714 = $713;
      $715 = $714 & 7;
      $716 = ($715|0)==(0);
      $717 = (0 - ($714))|0;
      $718 = $717 & 7;
      $719 = $716 ? 0 : $718;
      $$sum113$i = (($719) + ($tsize$254$i))|0;
      $720 = (($tbase$255$i) + ($$sum113$i)|0);
      $721 = $720;
      $722 = $712;
      $723 = (($721) - ($722))|0;
      $$sum$i19$i = (($711) + ($nb$0))|0;
      $724 = (($tbase$255$i) + ($$sum$i19$i)|0);
      $725 = (($723) - ($nb$0))|0;
      $726 = $nb$0 | 3;
      $$sum1$i20$i = (($711) + 4)|0;
      $727 = (($tbase$255$i) + ($$sum1$i20$i)|0);
      HEAP32[$727>>2] = $726;
      $728 = ($720|0)==($635|0);
      L324: do {
       if ($728) {
        $729 = HEAP32[(526524)>>2]|0;
        $730 = (($729) + ($725))|0;
        HEAP32[(526524)>>2] = $730;
        HEAP32[(526536)>>2] = $724;
        $731 = $730 | 1;
        $$sum42$i$i = (($$sum$i19$i) + 4)|0;
        $732 = (($tbase$255$i) + ($$sum42$i$i)|0);
        HEAP32[$732>>2] = $731;
       } else {
        $733 = HEAP32[(526532)>>2]|0;
        $734 = ($720|0)==($733|0);
        if ($734) {
         $735 = HEAP32[(526520)>>2]|0;
         $736 = (($735) + ($725))|0;
         HEAP32[(526520)>>2] = $736;
         HEAP32[(526532)>>2] = $724;
         $737 = $736 | 1;
         $$sum40$i$i = (($$sum$i19$i) + 4)|0;
         $738 = (($tbase$255$i) + ($$sum40$i$i)|0);
         HEAP32[$738>>2] = $737;
         $$sum41$i$i = (($736) + ($$sum$i19$i))|0;
         $739 = (($tbase$255$i) + ($$sum41$i$i)|0);
         HEAP32[$739>>2] = $736;
         break;
        }
        $$sum2$i21$i = (($tsize$254$i) + 4)|0;
        $$sum114$i = (($$sum2$i21$i) + ($719))|0;
        $740 = (($tbase$255$i) + ($$sum114$i)|0);
        $741 = HEAP32[$740>>2]|0;
        $742 = $741 & 3;
        $743 = ($742|0)==(1);
        if ($743) {
         $744 = $741 & -8;
         $745 = $741 >>> 3;
         $746 = ($741>>>0)<(256);
         L332: do {
          if ($746) {
           $$sum3738$i$i = $719 | 8;
           $$sum124$i = (($$sum3738$i$i) + ($tsize$254$i))|0;
           $747 = (($tbase$255$i) + ($$sum124$i)|0);
           $748 = HEAP32[$747>>2]|0;
           $$sum39$i$i = (($tsize$254$i) + 12)|0;
           $$sum125$i = (($$sum39$i$i) + ($719))|0;
           $749 = (($tbase$255$i) + ($$sum125$i)|0);
           $750 = HEAP32[$749>>2]|0;
           $751 = $745 << 1;
           $752 = (526552 + ($751<<2)|0);
           $753 = ($748|0)==($752|0);
           do {
            if (!($753)) {
             $754 = ($748>>>0)<($755>>>0);
             if ($754) {
              _abort();
              // unreachable;
             }
             $756 = ((($748)) + 12|0);
             $757 = HEAP32[$756>>2]|0;
             $758 = ($757|0)==($720|0);
             if ($758) {
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $759 = ($750|0)==($748|0);
           if ($759) {
            $760 = 1 << $745;
            $761 = $760 ^ -1;
            $762 = HEAP32[526512>>2]|0;
            $763 = $762 & $761;
            HEAP32[526512>>2] = $763;
            break;
           }
           $764 = ($750|0)==($752|0);
           do {
            if ($764) {
             $$pre57$i$i = ((($750)) + 8|0);
             $$pre$phi58$i$iZ2D = $$pre57$i$i;
            } else {
             $765 = ($750>>>0)<($755>>>0);
             if ($765) {
              _abort();
              // unreachable;
             }
             $766 = ((($750)) + 8|0);
             $767 = HEAP32[$766>>2]|0;
             $768 = ($767|0)==($720|0);
             if ($768) {
              $$pre$phi58$i$iZ2D = $766;
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $769 = ((($748)) + 12|0);
           HEAP32[$769>>2] = $750;
           HEAP32[$$pre$phi58$i$iZ2D>>2] = $748;
          } else {
           $$sum34$i$i = $719 | 24;
           $$sum115$i = (($$sum34$i$i) + ($tsize$254$i))|0;
           $770 = (($tbase$255$i) + ($$sum115$i)|0);
           $771 = HEAP32[$770>>2]|0;
           $$sum5$i$i = (($tsize$254$i) + 12)|0;
           $$sum116$i = (($$sum5$i$i) + ($719))|0;
           $772 = (($tbase$255$i) + ($$sum116$i)|0);
           $773 = HEAP32[$772>>2]|0;
           $774 = ($773|0)==($720|0);
           do {
            if ($774) {
             $$sum67$i$i = $719 | 16;
             $$sum122$i = (($$sum2$i21$i) + ($$sum67$i$i))|0;
             $784 = (($tbase$255$i) + ($$sum122$i)|0);
             $785 = HEAP32[$784>>2]|0;
             $786 = ($785|0)==(0|0);
             if ($786) {
              $$sum123$i = (($$sum67$i$i) + ($tsize$254$i))|0;
              $787 = (($tbase$255$i) + ($$sum123$i)|0);
              $788 = HEAP32[$787>>2]|0;
              $789 = ($788|0)==(0|0);
              if ($789) {
               $R$1$i$i = 0;
               break;
              } else {
               $R$0$i$i = $788;$RP$0$i$i = $787;
              }
             } else {
              $R$0$i$i = $785;$RP$0$i$i = $784;
             }
             while(1) {
              $790 = ((($R$0$i$i)) + 20|0);
              $791 = HEAP32[$790>>2]|0;
              $792 = ($791|0)==(0|0);
              if (!($792)) {
               $R$0$i$i = $791;$RP$0$i$i = $790;
               continue;
              }
              $793 = ((($R$0$i$i)) + 16|0);
              $794 = HEAP32[$793>>2]|0;
              $795 = ($794|0)==(0|0);
              if ($795) {
               $R$0$i$i$lcssa = $R$0$i$i;$RP$0$i$i$lcssa = $RP$0$i$i;
               break;
              } else {
               $R$0$i$i = $794;$RP$0$i$i = $793;
              }
             }
             $796 = ($RP$0$i$i$lcssa>>>0)<($755>>>0);
             if ($796) {
              _abort();
              // unreachable;
             } else {
              HEAP32[$RP$0$i$i$lcssa>>2] = 0;
              $R$1$i$i = $R$0$i$i$lcssa;
              break;
             }
            } else {
             $$sum3536$i$i = $719 | 8;
             $$sum117$i = (($$sum3536$i$i) + ($tsize$254$i))|0;
             $775 = (($tbase$255$i) + ($$sum117$i)|0);
             $776 = HEAP32[$775>>2]|0;
             $777 = ($776>>>0)<($755>>>0);
             if ($777) {
              _abort();
              // unreachable;
             }
             $778 = ((($776)) + 12|0);
             $779 = HEAP32[$778>>2]|0;
             $780 = ($779|0)==($720|0);
             if (!($780)) {
              _abort();
              // unreachable;
             }
             $781 = ((($773)) + 8|0);
             $782 = HEAP32[$781>>2]|0;
             $783 = ($782|0)==($720|0);
             if ($783) {
              HEAP32[$778>>2] = $773;
              HEAP32[$781>>2] = $776;
              $R$1$i$i = $773;
              break;
             } else {
              _abort();
              // unreachable;
             }
            }
           } while(0);
           $797 = ($771|0)==(0|0);
           if ($797) {
            break;
           }
           $$sum30$i$i = (($tsize$254$i) + 28)|0;
           $$sum118$i = (($$sum30$i$i) + ($719))|0;
           $798 = (($tbase$255$i) + ($$sum118$i)|0);
           $799 = HEAP32[$798>>2]|0;
           $800 = (526816 + ($799<<2)|0);
           $801 = HEAP32[$800>>2]|0;
           $802 = ($720|0)==($801|0);
           do {
            if ($802) {
             HEAP32[$800>>2] = $R$1$i$i;
             $cond$i$i = ($R$1$i$i|0)==(0|0);
             if (!($cond$i$i)) {
              break;
             }
             $803 = 1 << $799;
             $804 = $803 ^ -1;
             $805 = HEAP32[(526516)>>2]|0;
             $806 = $805 & $804;
             HEAP32[(526516)>>2] = $806;
             break L332;
            } else {
             $807 = HEAP32[(526528)>>2]|0;
             $808 = ($771>>>0)<($807>>>0);
             if ($808) {
              _abort();
              // unreachable;
             }
             $809 = ((($771)) + 16|0);
             $810 = HEAP32[$809>>2]|0;
             $811 = ($810|0)==($720|0);
             if ($811) {
              HEAP32[$809>>2] = $R$1$i$i;
             } else {
              $812 = ((($771)) + 20|0);
              HEAP32[$812>>2] = $R$1$i$i;
             }
             $813 = ($R$1$i$i|0)==(0|0);
             if ($813) {
              break L332;
             }
            }
           } while(0);
           $814 = HEAP32[(526528)>>2]|0;
           $815 = ($R$1$i$i>>>0)<($814>>>0);
           if ($815) {
            _abort();
            // unreachable;
           }
           $816 = ((($R$1$i$i)) + 24|0);
           HEAP32[$816>>2] = $771;
           $$sum3132$i$i = $719 | 16;
           $$sum119$i = (($$sum3132$i$i) + ($tsize$254$i))|0;
           $817 = (($tbase$255$i) + ($$sum119$i)|0);
           $818 = HEAP32[$817>>2]|0;
           $819 = ($818|0)==(0|0);
           do {
            if (!($819)) {
             $820 = ($818>>>0)<($814>>>0);
             if ($820) {
              _abort();
              // unreachable;
             } else {
              $821 = ((($R$1$i$i)) + 16|0);
              HEAP32[$821>>2] = $818;
              $822 = ((($818)) + 24|0);
              HEAP32[$822>>2] = $R$1$i$i;
              break;
             }
            }
           } while(0);
           $$sum120$i = (($$sum2$i21$i) + ($$sum3132$i$i))|0;
           $823 = (($tbase$255$i) + ($$sum120$i)|0);
           $824 = HEAP32[$823>>2]|0;
           $825 = ($824|0)==(0|0);
           if ($825) {
            break;
           }
           $826 = HEAP32[(526528)>>2]|0;
           $827 = ($824>>>0)<($826>>>0);
           if ($827) {
            _abort();
            // unreachable;
           } else {
            $828 = ((($R$1$i$i)) + 20|0);
            HEAP32[$828>>2] = $824;
            $829 = ((($824)) + 24|0);
            HEAP32[$829>>2] = $R$1$i$i;
            break;
           }
          }
         } while(0);
         $$sum9$i$i = $744 | $719;
         $$sum121$i = (($$sum9$i$i) + ($tsize$254$i))|0;
         $830 = (($tbase$255$i) + ($$sum121$i)|0);
         $831 = (($744) + ($725))|0;
         $oldfirst$0$i$i = $830;$qsize$0$i$i = $831;
        } else {
         $oldfirst$0$i$i = $720;$qsize$0$i$i = $725;
        }
        $832 = ((($oldfirst$0$i$i)) + 4|0);
        $833 = HEAP32[$832>>2]|0;
        $834 = $833 & -2;
        HEAP32[$832>>2] = $834;
        $835 = $qsize$0$i$i | 1;
        $$sum10$i$i = (($$sum$i19$i) + 4)|0;
        $836 = (($tbase$255$i) + ($$sum10$i$i)|0);
        HEAP32[$836>>2] = $835;
        $$sum11$i$i = (($qsize$0$i$i) + ($$sum$i19$i))|0;
        $837 = (($tbase$255$i) + ($$sum11$i$i)|0);
        HEAP32[$837>>2] = $qsize$0$i$i;
        $838 = $qsize$0$i$i >>> 3;
        $839 = ($qsize$0$i$i>>>0)<(256);
        if ($839) {
         $840 = $838 << 1;
         $841 = (526552 + ($840<<2)|0);
         $842 = HEAP32[526512>>2]|0;
         $843 = 1 << $838;
         $844 = $842 & $843;
         $845 = ($844|0)==(0);
         do {
          if ($845) {
           $846 = $842 | $843;
           HEAP32[526512>>2] = $846;
           $$pre$i22$i = (($840) + 2)|0;
           $$pre56$i$i = (526552 + ($$pre$i22$i<<2)|0);
           $$pre$phi$i23$iZ2D = $$pre56$i$i;$F4$0$i$i = $841;
          } else {
           $$sum29$i$i = (($840) + 2)|0;
           $847 = (526552 + ($$sum29$i$i<<2)|0);
           $848 = HEAP32[$847>>2]|0;
           $849 = HEAP32[(526528)>>2]|0;
           $850 = ($848>>>0)<($849>>>0);
           if (!($850)) {
            $$pre$phi$i23$iZ2D = $847;$F4$0$i$i = $848;
            break;
           }
           _abort();
           // unreachable;
          }
         } while(0);
         HEAP32[$$pre$phi$i23$iZ2D>>2] = $724;
         $851 = ((($F4$0$i$i)) + 12|0);
         HEAP32[$851>>2] = $724;
         $$sum27$i$i = (($$sum$i19$i) + 8)|0;
         $852 = (($tbase$255$i) + ($$sum27$i$i)|0);
         HEAP32[$852>>2] = $F4$0$i$i;
         $$sum28$i$i = (($$sum$i19$i) + 12)|0;
         $853 = (($tbase$255$i) + ($$sum28$i$i)|0);
         HEAP32[$853>>2] = $841;
         break;
        }
        $854 = $qsize$0$i$i >>> 8;
        $855 = ($854|0)==(0);
        do {
         if ($855) {
          $I7$0$i$i = 0;
         } else {
          $856 = ($qsize$0$i$i>>>0)>(16777215);
          if ($856) {
           $I7$0$i$i = 31;
           break;
          }
          $857 = (($854) + 1048320)|0;
          $858 = $857 >>> 16;
          $859 = $858 & 8;
          $860 = $854 << $859;
          $861 = (($860) + 520192)|0;
          $862 = $861 >>> 16;
          $863 = $862 & 4;
          $864 = $863 | $859;
          $865 = $860 << $863;
          $866 = (($865) + 245760)|0;
          $867 = $866 >>> 16;
          $868 = $867 & 2;
          $869 = $864 | $868;
          $870 = (14 - ($869))|0;
          $871 = $865 << $868;
          $872 = $871 >>> 15;
          $873 = (($870) + ($872))|0;
          $874 = $873 << 1;
          $875 = (($873) + 7)|0;
          $876 = $qsize$0$i$i >>> $875;
          $877 = $876 & 1;
          $878 = $877 | $874;
          $I7$0$i$i = $878;
         }
        } while(0);
        $879 = (526816 + ($I7$0$i$i<<2)|0);
        $$sum12$i$i = (($$sum$i19$i) + 28)|0;
        $880 = (($tbase$255$i) + ($$sum12$i$i)|0);
        HEAP32[$880>>2] = $I7$0$i$i;
        $$sum13$i$i = (($$sum$i19$i) + 16)|0;
        $881 = (($tbase$255$i) + ($$sum13$i$i)|0);
        $$sum14$i$i = (($$sum$i19$i) + 20)|0;
        $882 = (($tbase$255$i) + ($$sum14$i$i)|0);
        HEAP32[$882>>2] = 0;
        HEAP32[$881>>2] = 0;
        $883 = HEAP32[(526516)>>2]|0;
        $884 = 1 << $I7$0$i$i;
        $885 = $883 & $884;
        $886 = ($885|0)==(0);
        if ($886) {
         $887 = $883 | $884;
         HEAP32[(526516)>>2] = $887;
         HEAP32[$879>>2] = $724;
         $$sum15$i$i = (($$sum$i19$i) + 24)|0;
         $888 = (($tbase$255$i) + ($$sum15$i$i)|0);
         HEAP32[$888>>2] = $879;
         $$sum16$i$i = (($$sum$i19$i) + 12)|0;
         $889 = (($tbase$255$i) + ($$sum16$i$i)|0);
         HEAP32[$889>>2] = $724;
         $$sum17$i$i = (($$sum$i19$i) + 8)|0;
         $890 = (($tbase$255$i) + ($$sum17$i$i)|0);
         HEAP32[$890>>2] = $724;
         break;
        }
        $891 = HEAP32[$879>>2]|0;
        $892 = ((($891)) + 4|0);
        $893 = HEAP32[$892>>2]|0;
        $894 = $893 & -8;
        $895 = ($894|0)==($qsize$0$i$i|0);
        L418: do {
         if ($895) {
          $T$0$lcssa$i25$i = $891;
         } else {
          $896 = ($I7$0$i$i|0)==(31);
          $897 = $I7$0$i$i >>> 1;
          $898 = (25 - ($897))|0;
          $899 = $896 ? 0 : $898;
          $900 = $qsize$0$i$i << $899;
          $K8$051$i$i = $900;$T$050$i$i = $891;
          while(1) {
           $907 = $K8$051$i$i >>> 31;
           $908 = (((($T$050$i$i)) + 16|0) + ($907<<2)|0);
           $903 = HEAP32[$908>>2]|0;
           $909 = ($903|0)==(0|0);
           if ($909) {
            $$lcssa = $908;$T$050$i$i$lcssa = $T$050$i$i;
            break;
           }
           $901 = $K8$051$i$i << 1;
           $902 = ((($903)) + 4|0);
           $904 = HEAP32[$902>>2]|0;
           $905 = $904 & -8;
           $906 = ($905|0)==($qsize$0$i$i|0);
           if ($906) {
            $T$0$lcssa$i25$i = $903;
            break L418;
           } else {
            $K8$051$i$i = $901;$T$050$i$i = $903;
           }
          }
          $910 = HEAP32[(526528)>>2]|0;
          $911 = ($$lcssa>>>0)<($910>>>0);
          if ($911) {
           _abort();
           // unreachable;
          } else {
           HEAP32[$$lcssa>>2] = $724;
           $$sum23$i$i = (($$sum$i19$i) + 24)|0;
           $912 = (($tbase$255$i) + ($$sum23$i$i)|0);
           HEAP32[$912>>2] = $T$050$i$i$lcssa;
           $$sum24$i$i = (($$sum$i19$i) + 12)|0;
           $913 = (($tbase$255$i) + ($$sum24$i$i)|0);
           HEAP32[$913>>2] = $724;
           $$sum25$i$i = (($$sum$i19$i) + 8)|0;
           $914 = (($tbase$255$i) + ($$sum25$i$i)|0);
           HEAP32[$914>>2] = $724;
           break L324;
          }
         }
        } while(0);
        $915 = ((($T$0$lcssa$i25$i)) + 8|0);
        $916 = HEAP32[$915>>2]|0;
        $917 = HEAP32[(526528)>>2]|0;
        $918 = ($916>>>0)>=($917>>>0);
        $not$$i26$i = ($T$0$lcssa$i25$i>>>0)>=($917>>>0);
        $919 = $918 & $not$$i26$i;
        if ($919) {
         $920 = ((($916)) + 12|0);
         HEAP32[$920>>2] = $724;
         HEAP32[$915>>2] = $724;
         $$sum20$i$i = (($$sum$i19$i) + 8)|0;
         $921 = (($tbase$255$i) + ($$sum20$i$i)|0);
         HEAP32[$921>>2] = $916;
         $$sum21$i$i = (($$sum$i19$i) + 12)|0;
         $922 = (($tbase$255$i) + ($$sum21$i$i)|0);
         HEAP32[$922>>2] = $T$0$lcssa$i25$i;
         $$sum22$i$i = (($$sum$i19$i) + 24)|0;
         $923 = (($tbase$255$i) + ($$sum22$i$i)|0);
         HEAP32[$923>>2] = 0;
         break;
        } else {
         _abort();
         // unreachable;
        }
       }
      } while(0);
      $$sum1819$i$i = $711 | 8;
      $924 = (($tbase$255$i) + ($$sum1819$i$i)|0);
      $mem$0 = $924;
      return ($mem$0|0);
     } else {
      $sp$0$i$i$i = (526960);
     }
    }
    while(1) {
     $925 = HEAP32[$sp$0$i$i$i>>2]|0;
     $926 = ($925>>>0)>($635>>>0);
     if (!($926)) {
      $927 = ((($sp$0$i$i$i)) + 4|0);
      $928 = HEAP32[$927>>2]|0;
      $929 = (($925) + ($928)|0);
      $930 = ($929>>>0)>($635>>>0);
      if ($930) {
       $$lcssa215 = $925;$$lcssa216 = $928;$$lcssa217 = $929;
       break;
      }
     }
     $931 = ((($sp$0$i$i$i)) + 8|0);
     $932 = HEAP32[$931>>2]|0;
     $sp$0$i$i$i = $932;
    }
    $$sum$i14$i = (($$lcssa216) + -47)|0;
    $$sum1$i15$i = (($$lcssa216) + -39)|0;
    $933 = (($$lcssa215) + ($$sum1$i15$i)|0);
    $934 = $933;
    $935 = $934 & 7;
    $936 = ($935|0)==(0);
    $937 = (0 - ($934))|0;
    $938 = $937 & 7;
    $939 = $936 ? 0 : $938;
    $$sum2$i16$i = (($$sum$i14$i) + ($939))|0;
    $940 = (($$lcssa215) + ($$sum2$i16$i)|0);
    $941 = ((($635)) + 16|0);
    $942 = ($940>>>0)<($941>>>0);
    $943 = $942 ? $635 : $940;
    $944 = ((($943)) + 8|0);
    $945 = (($tsize$254$i) + -40)|0;
    $946 = ((($tbase$255$i)) + 8|0);
    $947 = $946;
    $948 = $947 & 7;
    $949 = ($948|0)==(0);
    $950 = (0 - ($947))|0;
    $951 = $950 & 7;
    $952 = $949 ? 0 : $951;
    $953 = (($tbase$255$i) + ($952)|0);
    $954 = (($945) - ($952))|0;
    HEAP32[(526536)>>2] = $953;
    HEAP32[(526524)>>2] = $954;
    $955 = $954 | 1;
    $$sum$i$i$i = (($952) + 4)|0;
    $956 = (($tbase$255$i) + ($$sum$i$i$i)|0);
    HEAP32[$956>>2] = $955;
    $$sum2$i$i$i = (($tsize$254$i) + -36)|0;
    $957 = (($tbase$255$i) + ($$sum2$i$i$i)|0);
    HEAP32[$957>>2] = 40;
    $958 = HEAP32[(527000)>>2]|0;
    HEAP32[(526540)>>2] = $958;
    $959 = ((($943)) + 4|0);
    HEAP32[$959>>2] = 27;
    ;HEAP32[$944>>2]=HEAP32[(526960)>>2]|0;HEAP32[$944+4>>2]=HEAP32[(526960)+4>>2]|0;HEAP32[$944+8>>2]=HEAP32[(526960)+8>>2]|0;HEAP32[$944+12>>2]=HEAP32[(526960)+12>>2]|0;
    HEAP32[(526960)>>2] = $tbase$255$i;
    HEAP32[(526964)>>2] = $tsize$254$i;
    HEAP32[(526972)>>2] = 0;
    HEAP32[(526968)>>2] = $944;
    $960 = ((($943)) + 28|0);
    HEAP32[$960>>2] = 7;
    $961 = ((($943)) + 32|0);
    $962 = ($961>>>0)<($$lcssa217>>>0);
    if ($962) {
     $964 = $960;
     while(1) {
      $963 = ((($964)) + 4|0);
      HEAP32[$963>>2] = 7;
      $965 = ((($964)) + 8|0);
      $966 = ($965>>>0)<($$lcssa217>>>0);
      if ($966) {
       $964 = $963;
      } else {
       break;
      }
     }
    }
    $967 = ($943|0)==($635|0);
    if (!($967)) {
     $968 = $943;
     $969 = $635;
     $970 = (($968) - ($969))|0;
     $971 = HEAP32[$959>>2]|0;
     $972 = $971 & -2;
     HEAP32[$959>>2] = $972;
     $973 = $970 | 1;
     $974 = ((($635)) + 4|0);
     HEAP32[$974>>2] = $973;
     HEAP32[$943>>2] = $970;
     $975 = $970 >>> 3;
     $976 = ($970>>>0)<(256);
     if ($976) {
      $977 = $975 << 1;
      $978 = (526552 + ($977<<2)|0);
      $979 = HEAP32[526512>>2]|0;
      $980 = 1 << $975;
      $981 = $979 & $980;
      $982 = ($981|0)==(0);
      if ($982) {
       $983 = $979 | $980;
       HEAP32[526512>>2] = $983;
       $$pre$i$i = (($977) + 2)|0;
       $$pre14$i$i = (526552 + ($$pre$i$i<<2)|0);
       $$pre$phi$i$iZ2D = $$pre14$i$i;$F$0$i$i = $978;
      } else {
       $$sum4$i$i = (($977) + 2)|0;
       $984 = (526552 + ($$sum4$i$i<<2)|0);
       $985 = HEAP32[$984>>2]|0;
       $986 = HEAP32[(526528)>>2]|0;
       $987 = ($985>>>0)<($986>>>0);
       if ($987) {
        _abort();
        // unreachable;
       } else {
        $$pre$phi$i$iZ2D = $984;$F$0$i$i = $985;
       }
      }
      HEAP32[$$pre$phi$i$iZ2D>>2] = $635;
      $988 = ((($F$0$i$i)) + 12|0);
      HEAP32[$988>>2] = $635;
      $989 = ((($635)) + 8|0);
      HEAP32[$989>>2] = $F$0$i$i;
      $990 = ((($635)) + 12|0);
      HEAP32[$990>>2] = $978;
      break;
     }
     $991 = $970 >>> 8;
     $992 = ($991|0)==(0);
     if ($992) {
      $I1$0$i$i = 0;
     } else {
      $993 = ($970>>>0)>(16777215);
      if ($993) {
       $I1$0$i$i = 31;
      } else {
       $994 = (($991) + 1048320)|0;
       $995 = $994 >>> 16;
       $996 = $995 & 8;
       $997 = $991 << $996;
       $998 = (($997) + 520192)|0;
       $999 = $998 >>> 16;
       $1000 = $999 & 4;
       $1001 = $1000 | $996;
       $1002 = $997 << $1000;
       $1003 = (($1002) + 245760)|0;
       $1004 = $1003 >>> 16;
       $1005 = $1004 & 2;
       $1006 = $1001 | $1005;
       $1007 = (14 - ($1006))|0;
       $1008 = $1002 << $1005;
       $1009 = $1008 >>> 15;
       $1010 = (($1007) + ($1009))|0;
       $1011 = $1010 << 1;
       $1012 = (($1010) + 7)|0;
       $1013 = $970 >>> $1012;
       $1014 = $1013 & 1;
       $1015 = $1014 | $1011;
       $I1$0$i$i = $1015;
      }
     }
     $1016 = (526816 + ($I1$0$i$i<<2)|0);
     $1017 = ((($635)) + 28|0);
     HEAP32[$1017>>2] = $I1$0$i$i;
     $1018 = ((($635)) + 20|0);
     HEAP32[$1018>>2] = 0;
     HEAP32[$941>>2] = 0;
     $1019 = HEAP32[(526516)>>2]|0;
     $1020 = 1 << $I1$0$i$i;
     $1021 = $1019 & $1020;
     $1022 = ($1021|0)==(0);
     if ($1022) {
      $1023 = $1019 | $1020;
      HEAP32[(526516)>>2] = $1023;
      HEAP32[$1016>>2] = $635;
      $1024 = ((($635)) + 24|0);
      HEAP32[$1024>>2] = $1016;
      $1025 = ((($635)) + 12|0);
      HEAP32[$1025>>2] = $635;
      $1026 = ((($635)) + 8|0);
      HEAP32[$1026>>2] = $635;
      break;
     }
     $1027 = HEAP32[$1016>>2]|0;
     $1028 = ((($1027)) + 4|0);
     $1029 = HEAP32[$1028>>2]|0;
     $1030 = $1029 & -8;
     $1031 = ($1030|0)==($970|0);
     L459: do {
      if ($1031) {
       $T$0$lcssa$i$i = $1027;
      } else {
       $1032 = ($I1$0$i$i|0)==(31);
       $1033 = $I1$0$i$i >>> 1;
       $1034 = (25 - ($1033))|0;
       $1035 = $1032 ? 0 : $1034;
       $1036 = $970 << $1035;
       $K2$07$i$i = $1036;$T$06$i$i = $1027;
       while(1) {
        $1043 = $K2$07$i$i >>> 31;
        $1044 = (((($T$06$i$i)) + 16|0) + ($1043<<2)|0);
        $1039 = HEAP32[$1044>>2]|0;
        $1045 = ($1039|0)==(0|0);
        if ($1045) {
         $$lcssa211 = $1044;$T$06$i$i$lcssa = $T$06$i$i;
         break;
        }
        $1037 = $K2$07$i$i << 1;
        $1038 = ((($1039)) + 4|0);
        $1040 = HEAP32[$1038>>2]|0;
        $1041 = $1040 & -8;
        $1042 = ($1041|0)==($970|0);
        if ($1042) {
         $T$0$lcssa$i$i = $1039;
         break L459;
        } else {
         $K2$07$i$i = $1037;$T$06$i$i = $1039;
        }
       }
       $1046 = HEAP32[(526528)>>2]|0;
       $1047 = ($$lcssa211>>>0)<($1046>>>0);
       if ($1047) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$$lcssa211>>2] = $635;
        $1048 = ((($635)) + 24|0);
        HEAP32[$1048>>2] = $T$06$i$i$lcssa;
        $1049 = ((($635)) + 12|0);
        HEAP32[$1049>>2] = $635;
        $1050 = ((($635)) + 8|0);
        HEAP32[$1050>>2] = $635;
        break L299;
       }
      }
     } while(0);
     $1051 = ((($T$0$lcssa$i$i)) + 8|0);
     $1052 = HEAP32[$1051>>2]|0;
     $1053 = HEAP32[(526528)>>2]|0;
     $1054 = ($1052>>>0)>=($1053>>>0);
     $not$$i$i = ($T$0$lcssa$i$i>>>0)>=($1053>>>0);
     $1055 = $1054 & $not$$i$i;
     if ($1055) {
      $1056 = ((($1052)) + 12|0);
      HEAP32[$1056>>2] = $635;
      HEAP32[$1051>>2] = $635;
      $1057 = ((($635)) + 8|0);
      HEAP32[$1057>>2] = $1052;
      $1058 = ((($635)) + 12|0);
      HEAP32[$1058>>2] = $T$0$lcssa$i$i;
      $1059 = ((($635)) + 24|0);
      HEAP32[$1059>>2] = 0;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   }
  } while(0);
  $1060 = HEAP32[(526524)>>2]|0;
  $1061 = ($1060>>>0)>($nb$0>>>0);
  if ($1061) {
   $1062 = (($1060) - ($nb$0))|0;
   HEAP32[(526524)>>2] = $1062;
   $1063 = HEAP32[(526536)>>2]|0;
   $1064 = (($1063) + ($nb$0)|0);
   HEAP32[(526536)>>2] = $1064;
   $1065 = $1062 | 1;
   $$sum$i32 = (($nb$0) + 4)|0;
   $1066 = (($1063) + ($$sum$i32)|0);
   HEAP32[$1066>>2] = $1065;
   $1067 = $nb$0 | 3;
   $1068 = ((($1063)) + 4|0);
   HEAP32[$1068>>2] = $1067;
   $1069 = ((($1063)) + 8|0);
   $mem$0 = $1069;
   return ($mem$0|0);
  }
 }
 $1070 = (___errno_location()|0);
 HEAP32[$1070>>2] = 12;
 $mem$0 = 0;
 return ($mem$0|0);
}
function _free($mem) {
 $mem = $mem|0;
 var $$lcssa = 0, $$pre = 0, $$pre$phi59Z2D = 0, $$pre$phi61Z2D = 0, $$pre$phiZ2D = 0, $$pre57 = 0, $$pre58 = 0, $$pre60 = 0, $$sum = 0, $$sum11 = 0, $$sum12 = 0, $$sum13 = 0, $$sum14 = 0, $$sum1718 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum24 = 0;
 var $$sum25 = 0, $$sum26 = 0, $$sum27 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0;
 var $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0;
 var $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0;
 var $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0;
 var $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0;
 var $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0;
 var $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0;
 var $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0;
 var $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0;
 var $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0;
 var $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0;
 var $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0;
 var $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0;
 var $321 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0;
 var $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0;
 var $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0;
 var $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $K19$052 = 0, $R$0 = 0, $R$0$lcssa = 0, $R$1 = 0;
 var $R7$0 = 0, $R7$0$lcssa = 0, $R7$1 = 0, $RP$0 = 0, $RP$0$lcssa = 0, $RP9$0 = 0, $RP9$0$lcssa = 0, $T$0$lcssa = 0, $T$051 = 0, $T$051$lcssa = 0, $cond = 0, $cond47 = 0, $not$ = 0, $p$0 = 0, $psize$0 = 0, $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($mem|0)==(0|0);
 if ($0) {
  return;
 }
 $1 = ((($mem)) + -8|0);
 $2 = HEAP32[(526528)>>2]|0;
 $3 = ($1>>>0)<($2>>>0);
 if ($3) {
  _abort();
  // unreachable;
 }
 $4 = ((($mem)) + -4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 3;
 $7 = ($6|0)==(1);
 if ($7) {
  _abort();
  // unreachable;
 }
 $8 = $5 & -8;
 $$sum = (($8) + -8)|0;
 $9 = (($mem) + ($$sum)|0);
 $10 = $5 & 1;
 $11 = ($10|0)==(0);
 do {
  if ($11) {
   $12 = HEAP32[$1>>2]|0;
   $13 = ($6|0)==(0);
   if ($13) {
    return;
   }
   $$sum2 = (-8 - ($12))|0;
   $14 = (($mem) + ($$sum2)|0);
   $15 = (($12) + ($8))|0;
   $16 = ($14>>>0)<($2>>>0);
   if ($16) {
    _abort();
    // unreachable;
   }
   $17 = HEAP32[(526532)>>2]|0;
   $18 = ($14|0)==($17|0);
   if ($18) {
    $$sum3 = (($8) + -4)|0;
    $103 = (($mem) + ($$sum3)|0);
    $104 = HEAP32[$103>>2]|0;
    $105 = $104 & 3;
    $106 = ($105|0)==(3);
    if (!($106)) {
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    HEAP32[(526520)>>2] = $15;
    $107 = $104 & -2;
    HEAP32[$103>>2] = $107;
    $108 = $15 | 1;
    $$sum20 = (($$sum2) + 4)|0;
    $109 = (($mem) + ($$sum20)|0);
    HEAP32[$109>>2] = $108;
    HEAP32[$9>>2] = $15;
    return;
   }
   $19 = $12 >>> 3;
   $20 = ($12>>>0)<(256);
   if ($20) {
    $$sum30 = (($$sum2) + 8)|0;
    $21 = (($mem) + ($$sum30)|0);
    $22 = HEAP32[$21>>2]|0;
    $$sum31 = (($$sum2) + 12)|0;
    $23 = (($mem) + ($$sum31)|0);
    $24 = HEAP32[$23>>2]|0;
    $25 = $19 << 1;
    $26 = (526552 + ($25<<2)|0);
    $27 = ($22|0)==($26|0);
    if (!($27)) {
     $28 = ($22>>>0)<($2>>>0);
     if ($28) {
      _abort();
      // unreachable;
     }
     $29 = ((($22)) + 12|0);
     $30 = HEAP32[$29>>2]|0;
     $31 = ($30|0)==($14|0);
     if (!($31)) {
      _abort();
      // unreachable;
     }
    }
    $32 = ($24|0)==($22|0);
    if ($32) {
     $33 = 1 << $19;
     $34 = $33 ^ -1;
     $35 = HEAP32[526512>>2]|0;
     $36 = $35 & $34;
     HEAP32[526512>>2] = $36;
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    $37 = ($24|0)==($26|0);
    if ($37) {
     $$pre60 = ((($24)) + 8|0);
     $$pre$phi61Z2D = $$pre60;
    } else {
     $38 = ($24>>>0)<($2>>>0);
     if ($38) {
      _abort();
      // unreachable;
     }
     $39 = ((($24)) + 8|0);
     $40 = HEAP32[$39>>2]|0;
     $41 = ($40|0)==($14|0);
     if ($41) {
      $$pre$phi61Z2D = $39;
     } else {
      _abort();
      // unreachable;
     }
    }
    $42 = ((($22)) + 12|0);
    HEAP32[$42>>2] = $24;
    HEAP32[$$pre$phi61Z2D>>2] = $22;
    $p$0 = $14;$psize$0 = $15;
    break;
   }
   $$sum22 = (($$sum2) + 24)|0;
   $43 = (($mem) + ($$sum22)|0);
   $44 = HEAP32[$43>>2]|0;
   $$sum23 = (($$sum2) + 12)|0;
   $45 = (($mem) + ($$sum23)|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = ($46|0)==($14|0);
   do {
    if ($47) {
     $$sum25 = (($$sum2) + 20)|0;
     $57 = (($mem) + ($$sum25)|0);
     $58 = HEAP32[$57>>2]|0;
     $59 = ($58|0)==(0|0);
     if ($59) {
      $$sum24 = (($$sum2) + 16)|0;
      $60 = (($mem) + ($$sum24)|0);
      $61 = HEAP32[$60>>2]|0;
      $62 = ($61|0)==(0|0);
      if ($62) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $61;$RP$0 = $60;
      }
     } else {
      $R$0 = $58;$RP$0 = $57;
     }
     while(1) {
      $63 = ((($R$0)) + 20|0);
      $64 = HEAP32[$63>>2]|0;
      $65 = ($64|0)==(0|0);
      if (!($65)) {
       $R$0 = $64;$RP$0 = $63;
       continue;
      }
      $66 = ((($R$0)) + 16|0);
      $67 = HEAP32[$66>>2]|0;
      $68 = ($67|0)==(0|0);
      if ($68) {
       $R$0$lcssa = $R$0;$RP$0$lcssa = $RP$0;
       break;
      } else {
       $R$0 = $67;$RP$0 = $66;
      }
     }
     $69 = ($RP$0$lcssa>>>0)<($2>>>0);
     if ($69) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0$lcssa>>2] = 0;
      $R$1 = $R$0$lcssa;
      break;
     }
    } else {
     $$sum29 = (($$sum2) + 8)|0;
     $48 = (($mem) + ($$sum29)|0);
     $49 = HEAP32[$48>>2]|0;
     $50 = ($49>>>0)<($2>>>0);
     if ($50) {
      _abort();
      // unreachable;
     }
     $51 = ((($49)) + 12|0);
     $52 = HEAP32[$51>>2]|0;
     $53 = ($52|0)==($14|0);
     if (!($53)) {
      _abort();
      // unreachable;
     }
     $54 = ((($46)) + 8|0);
     $55 = HEAP32[$54>>2]|0;
     $56 = ($55|0)==($14|0);
     if ($56) {
      HEAP32[$51>>2] = $46;
      HEAP32[$54>>2] = $49;
      $R$1 = $46;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $70 = ($44|0)==(0|0);
   if ($70) {
    $p$0 = $14;$psize$0 = $15;
   } else {
    $$sum26 = (($$sum2) + 28)|0;
    $71 = (($mem) + ($$sum26)|0);
    $72 = HEAP32[$71>>2]|0;
    $73 = (526816 + ($72<<2)|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($14|0)==($74|0);
    if ($75) {
     HEAP32[$73>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $76 = 1 << $72;
      $77 = $76 ^ -1;
      $78 = HEAP32[(526516)>>2]|0;
      $79 = $78 & $77;
      HEAP32[(526516)>>2] = $79;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    } else {
     $80 = HEAP32[(526528)>>2]|0;
     $81 = ($44>>>0)<($80>>>0);
     if ($81) {
      _abort();
      // unreachable;
     }
     $82 = ((($44)) + 16|0);
     $83 = HEAP32[$82>>2]|0;
     $84 = ($83|0)==($14|0);
     if ($84) {
      HEAP32[$82>>2] = $R$1;
     } else {
      $85 = ((($44)) + 20|0);
      HEAP32[$85>>2] = $R$1;
     }
     $86 = ($R$1|0)==(0|0);
     if ($86) {
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
    $87 = HEAP32[(526528)>>2]|0;
    $88 = ($R$1>>>0)<($87>>>0);
    if ($88) {
     _abort();
     // unreachable;
    }
    $89 = ((($R$1)) + 24|0);
    HEAP32[$89>>2] = $44;
    $$sum27 = (($$sum2) + 16)|0;
    $90 = (($mem) + ($$sum27)|0);
    $91 = HEAP32[$90>>2]|0;
    $92 = ($91|0)==(0|0);
    do {
     if (!($92)) {
      $93 = ($91>>>0)<($87>>>0);
      if ($93) {
       _abort();
       // unreachable;
      } else {
       $94 = ((($R$1)) + 16|0);
       HEAP32[$94>>2] = $91;
       $95 = ((($91)) + 24|0);
       HEAP32[$95>>2] = $R$1;
       break;
      }
     }
    } while(0);
    $$sum28 = (($$sum2) + 20)|0;
    $96 = (($mem) + ($$sum28)|0);
    $97 = HEAP32[$96>>2]|0;
    $98 = ($97|0)==(0|0);
    if ($98) {
     $p$0 = $14;$psize$0 = $15;
    } else {
     $99 = HEAP32[(526528)>>2]|0;
     $100 = ($97>>>0)<($99>>>0);
     if ($100) {
      _abort();
      // unreachable;
     } else {
      $101 = ((($R$1)) + 20|0);
      HEAP32[$101>>2] = $97;
      $102 = ((($97)) + 24|0);
      HEAP32[$102>>2] = $R$1;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
   }
  } else {
   $p$0 = $1;$psize$0 = $8;
  }
 } while(0);
 $110 = ($p$0>>>0)<($9>>>0);
 if (!($110)) {
  _abort();
  // unreachable;
 }
 $$sum19 = (($8) + -4)|0;
 $111 = (($mem) + ($$sum19)|0);
 $112 = HEAP32[$111>>2]|0;
 $113 = $112 & 1;
 $114 = ($113|0)==(0);
 if ($114) {
  _abort();
  // unreachable;
 }
 $115 = $112 & 2;
 $116 = ($115|0)==(0);
 if ($116) {
  $117 = HEAP32[(526536)>>2]|0;
  $118 = ($9|0)==($117|0);
  if ($118) {
   $119 = HEAP32[(526524)>>2]|0;
   $120 = (($119) + ($psize$0))|0;
   HEAP32[(526524)>>2] = $120;
   HEAP32[(526536)>>2] = $p$0;
   $121 = $120 | 1;
   $122 = ((($p$0)) + 4|0);
   HEAP32[$122>>2] = $121;
   $123 = HEAP32[(526532)>>2]|0;
   $124 = ($p$0|0)==($123|0);
   if (!($124)) {
    return;
   }
   HEAP32[(526532)>>2] = 0;
   HEAP32[(526520)>>2] = 0;
   return;
  }
  $125 = HEAP32[(526532)>>2]|0;
  $126 = ($9|0)==($125|0);
  if ($126) {
   $127 = HEAP32[(526520)>>2]|0;
   $128 = (($127) + ($psize$0))|0;
   HEAP32[(526520)>>2] = $128;
   HEAP32[(526532)>>2] = $p$0;
   $129 = $128 | 1;
   $130 = ((($p$0)) + 4|0);
   HEAP32[$130>>2] = $129;
   $131 = (($p$0) + ($128)|0);
   HEAP32[$131>>2] = $128;
   return;
  }
  $132 = $112 & -8;
  $133 = (($132) + ($psize$0))|0;
  $134 = $112 >>> 3;
  $135 = ($112>>>0)<(256);
  do {
   if ($135) {
    $136 = (($mem) + ($8)|0);
    $137 = HEAP32[$136>>2]|0;
    $$sum1718 = $8 | 4;
    $138 = (($mem) + ($$sum1718)|0);
    $139 = HEAP32[$138>>2]|0;
    $140 = $134 << 1;
    $141 = (526552 + ($140<<2)|0);
    $142 = ($137|0)==($141|0);
    if (!($142)) {
     $143 = HEAP32[(526528)>>2]|0;
     $144 = ($137>>>0)<($143>>>0);
     if ($144) {
      _abort();
      // unreachable;
     }
     $145 = ((($137)) + 12|0);
     $146 = HEAP32[$145>>2]|0;
     $147 = ($146|0)==($9|0);
     if (!($147)) {
      _abort();
      // unreachable;
     }
    }
    $148 = ($139|0)==($137|0);
    if ($148) {
     $149 = 1 << $134;
     $150 = $149 ^ -1;
     $151 = HEAP32[526512>>2]|0;
     $152 = $151 & $150;
     HEAP32[526512>>2] = $152;
     break;
    }
    $153 = ($139|0)==($141|0);
    if ($153) {
     $$pre58 = ((($139)) + 8|0);
     $$pre$phi59Z2D = $$pre58;
    } else {
     $154 = HEAP32[(526528)>>2]|0;
     $155 = ($139>>>0)<($154>>>0);
     if ($155) {
      _abort();
      // unreachable;
     }
     $156 = ((($139)) + 8|0);
     $157 = HEAP32[$156>>2]|0;
     $158 = ($157|0)==($9|0);
     if ($158) {
      $$pre$phi59Z2D = $156;
     } else {
      _abort();
      // unreachable;
     }
    }
    $159 = ((($137)) + 12|0);
    HEAP32[$159>>2] = $139;
    HEAP32[$$pre$phi59Z2D>>2] = $137;
   } else {
    $$sum5 = (($8) + 16)|0;
    $160 = (($mem) + ($$sum5)|0);
    $161 = HEAP32[$160>>2]|0;
    $$sum67 = $8 | 4;
    $162 = (($mem) + ($$sum67)|0);
    $163 = HEAP32[$162>>2]|0;
    $164 = ($163|0)==($9|0);
    do {
     if ($164) {
      $$sum9 = (($8) + 12)|0;
      $175 = (($mem) + ($$sum9)|0);
      $176 = HEAP32[$175>>2]|0;
      $177 = ($176|0)==(0|0);
      if ($177) {
       $$sum8 = (($8) + 8)|0;
       $178 = (($mem) + ($$sum8)|0);
       $179 = HEAP32[$178>>2]|0;
       $180 = ($179|0)==(0|0);
       if ($180) {
        $R7$1 = 0;
        break;
       } else {
        $R7$0 = $179;$RP9$0 = $178;
       }
      } else {
       $R7$0 = $176;$RP9$0 = $175;
      }
      while(1) {
       $181 = ((($R7$0)) + 20|0);
       $182 = HEAP32[$181>>2]|0;
       $183 = ($182|0)==(0|0);
       if (!($183)) {
        $R7$0 = $182;$RP9$0 = $181;
        continue;
       }
       $184 = ((($R7$0)) + 16|0);
       $185 = HEAP32[$184>>2]|0;
       $186 = ($185|0)==(0|0);
       if ($186) {
        $R7$0$lcssa = $R7$0;$RP9$0$lcssa = $RP9$0;
        break;
       } else {
        $R7$0 = $185;$RP9$0 = $184;
       }
      }
      $187 = HEAP32[(526528)>>2]|0;
      $188 = ($RP9$0$lcssa>>>0)<($187>>>0);
      if ($188) {
       _abort();
       // unreachable;
      } else {
       HEAP32[$RP9$0$lcssa>>2] = 0;
       $R7$1 = $R7$0$lcssa;
       break;
      }
     } else {
      $165 = (($mem) + ($8)|0);
      $166 = HEAP32[$165>>2]|0;
      $167 = HEAP32[(526528)>>2]|0;
      $168 = ($166>>>0)<($167>>>0);
      if ($168) {
       _abort();
       // unreachable;
      }
      $169 = ((($166)) + 12|0);
      $170 = HEAP32[$169>>2]|0;
      $171 = ($170|0)==($9|0);
      if (!($171)) {
       _abort();
       // unreachable;
      }
      $172 = ((($163)) + 8|0);
      $173 = HEAP32[$172>>2]|0;
      $174 = ($173|0)==($9|0);
      if ($174) {
       HEAP32[$169>>2] = $163;
       HEAP32[$172>>2] = $166;
       $R7$1 = $163;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $189 = ($161|0)==(0|0);
    if (!($189)) {
     $$sum12 = (($8) + 20)|0;
     $190 = (($mem) + ($$sum12)|0);
     $191 = HEAP32[$190>>2]|0;
     $192 = (526816 + ($191<<2)|0);
     $193 = HEAP32[$192>>2]|0;
     $194 = ($9|0)==($193|0);
     if ($194) {
      HEAP32[$192>>2] = $R7$1;
      $cond47 = ($R7$1|0)==(0|0);
      if ($cond47) {
       $195 = 1 << $191;
       $196 = $195 ^ -1;
       $197 = HEAP32[(526516)>>2]|0;
       $198 = $197 & $196;
       HEAP32[(526516)>>2] = $198;
       break;
      }
     } else {
      $199 = HEAP32[(526528)>>2]|0;
      $200 = ($161>>>0)<($199>>>0);
      if ($200) {
       _abort();
       // unreachable;
      }
      $201 = ((($161)) + 16|0);
      $202 = HEAP32[$201>>2]|0;
      $203 = ($202|0)==($9|0);
      if ($203) {
       HEAP32[$201>>2] = $R7$1;
      } else {
       $204 = ((($161)) + 20|0);
       HEAP32[$204>>2] = $R7$1;
      }
      $205 = ($R7$1|0)==(0|0);
      if ($205) {
       break;
      }
     }
     $206 = HEAP32[(526528)>>2]|0;
     $207 = ($R7$1>>>0)<($206>>>0);
     if ($207) {
      _abort();
      // unreachable;
     }
     $208 = ((($R7$1)) + 24|0);
     HEAP32[$208>>2] = $161;
     $$sum13 = (($8) + 8)|0;
     $209 = (($mem) + ($$sum13)|0);
     $210 = HEAP32[$209>>2]|0;
     $211 = ($210|0)==(0|0);
     do {
      if (!($211)) {
       $212 = ($210>>>0)<($206>>>0);
       if ($212) {
        _abort();
        // unreachable;
       } else {
        $213 = ((($R7$1)) + 16|0);
        HEAP32[$213>>2] = $210;
        $214 = ((($210)) + 24|0);
        HEAP32[$214>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum14 = (($8) + 12)|0;
     $215 = (($mem) + ($$sum14)|0);
     $216 = HEAP32[$215>>2]|0;
     $217 = ($216|0)==(0|0);
     if (!($217)) {
      $218 = HEAP32[(526528)>>2]|0;
      $219 = ($216>>>0)<($218>>>0);
      if ($219) {
       _abort();
       // unreachable;
      } else {
       $220 = ((($R7$1)) + 20|0);
       HEAP32[$220>>2] = $216;
       $221 = ((($216)) + 24|0);
       HEAP32[$221>>2] = $R7$1;
       break;
      }
     }
    }
   }
  } while(0);
  $222 = $133 | 1;
  $223 = ((($p$0)) + 4|0);
  HEAP32[$223>>2] = $222;
  $224 = (($p$0) + ($133)|0);
  HEAP32[$224>>2] = $133;
  $225 = HEAP32[(526532)>>2]|0;
  $226 = ($p$0|0)==($225|0);
  if ($226) {
   HEAP32[(526520)>>2] = $133;
   return;
  } else {
   $psize$1 = $133;
  }
 } else {
  $227 = $112 & -2;
  HEAP32[$111>>2] = $227;
  $228 = $psize$0 | 1;
  $229 = ((($p$0)) + 4|0);
  HEAP32[$229>>2] = $228;
  $230 = (($p$0) + ($psize$0)|0);
  HEAP32[$230>>2] = $psize$0;
  $psize$1 = $psize$0;
 }
 $231 = $psize$1 >>> 3;
 $232 = ($psize$1>>>0)<(256);
 if ($232) {
  $233 = $231 << 1;
  $234 = (526552 + ($233<<2)|0);
  $235 = HEAP32[526512>>2]|0;
  $236 = 1 << $231;
  $237 = $235 & $236;
  $238 = ($237|0)==(0);
  if ($238) {
   $239 = $235 | $236;
   HEAP32[526512>>2] = $239;
   $$pre = (($233) + 2)|0;
   $$pre57 = (526552 + ($$pre<<2)|0);
   $$pre$phiZ2D = $$pre57;$F16$0 = $234;
  } else {
   $$sum11 = (($233) + 2)|0;
   $240 = (526552 + ($$sum11<<2)|0);
   $241 = HEAP32[$240>>2]|0;
   $242 = HEAP32[(526528)>>2]|0;
   $243 = ($241>>>0)<($242>>>0);
   if ($243) {
    _abort();
    // unreachable;
   } else {
    $$pre$phiZ2D = $240;$F16$0 = $241;
   }
  }
  HEAP32[$$pre$phiZ2D>>2] = $p$0;
  $244 = ((($F16$0)) + 12|0);
  HEAP32[$244>>2] = $p$0;
  $245 = ((($p$0)) + 8|0);
  HEAP32[$245>>2] = $F16$0;
  $246 = ((($p$0)) + 12|0);
  HEAP32[$246>>2] = $234;
  return;
 }
 $247 = $psize$1 >>> 8;
 $248 = ($247|0)==(0);
 if ($248) {
  $I18$0 = 0;
 } else {
  $249 = ($psize$1>>>0)>(16777215);
  if ($249) {
   $I18$0 = 31;
  } else {
   $250 = (($247) + 1048320)|0;
   $251 = $250 >>> 16;
   $252 = $251 & 8;
   $253 = $247 << $252;
   $254 = (($253) + 520192)|0;
   $255 = $254 >>> 16;
   $256 = $255 & 4;
   $257 = $256 | $252;
   $258 = $253 << $256;
   $259 = (($258) + 245760)|0;
   $260 = $259 >>> 16;
   $261 = $260 & 2;
   $262 = $257 | $261;
   $263 = (14 - ($262))|0;
   $264 = $258 << $261;
   $265 = $264 >>> 15;
   $266 = (($263) + ($265))|0;
   $267 = $266 << 1;
   $268 = (($266) + 7)|0;
   $269 = $psize$1 >>> $268;
   $270 = $269 & 1;
   $271 = $270 | $267;
   $I18$0 = $271;
  }
 }
 $272 = (526816 + ($I18$0<<2)|0);
 $273 = ((($p$0)) + 28|0);
 HEAP32[$273>>2] = $I18$0;
 $274 = ((($p$0)) + 16|0);
 $275 = ((($p$0)) + 20|0);
 HEAP32[$275>>2] = 0;
 HEAP32[$274>>2] = 0;
 $276 = HEAP32[(526516)>>2]|0;
 $277 = 1 << $I18$0;
 $278 = $276 & $277;
 $279 = ($278|0)==(0);
 L199: do {
  if ($279) {
   $280 = $276 | $277;
   HEAP32[(526516)>>2] = $280;
   HEAP32[$272>>2] = $p$0;
   $281 = ((($p$0)) + 24|0);
   HEAP32[$281>>2] = $272;
   $282 = ((($p$0)) + 12|0);
   HEAP32[$282>>2] = $p$0;
   $283 = ((($p$0)) + 8|0);
   HEAP32[$283>>2] = $p$0;
  } else {
   $284 = HEAP32[$272>>2]|0;
   $285 = ((($284)) + 4|0);
   $286 = HEAP32[$285>>2]|0;
   $287 = $286 & -8;
   $288 = ($287|0)==($psize$1|0);
   L202: do {
    if ($288) {
     $T$0$lcssa = $284;
    } else {
     $289 = ($I18$0|0)==(31);
     $290 = $I18$0 >>> 1;
     $291 = (25 - ($290))|0;
     $292 = $289 ? 0 : $291;
     $293 = $psize$1 << $292;
     $K19$052 = $293;$T$051 = $284;
     while(1) {
      $300 = $K19$052 >>> 31;
      $301 = (((($T$051)) + 16|0) + ($300<<2)|0);
      $296 = HEAP32[$301>>2]|0;
      $302 = ($296|0)==(0|0);
      if ($302) {
       $$lcssa = $301;$T$051$lcssa = $T$051;
       break;
      }
      $294 = $K19$052 << 1;
      $295 = ((($296)) + 4|0);
      $297 = HEAP32[$295>>2]|0;
      $298 = $297 & -8;
      $299 = ($298|0)==($psize$1|0);
      if ($299) {
       $T$0$lcssa = $296;
       break L202;
      } else {
       $K19$052 = $294;$T$051 = $296;
      }
     }
     $303 = HEAP32[(526528)>>2]|0;
     $304 = ($$lcssa>>>0)<($303>>>0);
     if ($304) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$$lcssa>>2] = $p$0;
      $305 = ((($p$0)) + 24|0);
      HEAP32[$305>>2] = $T$051$lcssa;
      $306 = ((($p$0)) + 12|0);
      HEAP32[$306>>2] = $p$0;
      $307 = ((($p$0)) + 8|0);
      HEAP32[$307>>2] = $p$0;
      break L199;
     }
    }
   } while(0);
   $308 = ((($T$0$lcssa)) + 8|0);
   $309 = HEAP32[$308>>2]|0;
   $310 = HEAP32[(526528)>>2]|0;
   $311 = ($309>>>0)>=($310>>>0);
   $not$ = ($T$0$lcssa>>>0)>=($310>>>0);
   $312 = $311 & $not$;
   if ($312) {
    $313 = ((($309)) + 12|0);
    HEAP32[$313>>2] = $p$0;
    HEAP32[$308>>2] = $p$0;
    $314 = ((($p$0)) + 8|0);
    HEAP32[$314>>2] = $309;
    $315 = ((($p$0)) + 12|0);
    HEAP32[$315>>2] = $T$0$lcssa;
    $316 = ((($p$0)) + 24|0);
    HEAP32[$316>>2] = 0;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $317 = HEAP32[(526544)>>2]|0;
 $318 = (($317) + -1)|0;
 HEAP32[(526544)>>2] = $318;
 $319 = ($318|0)==(0);
 if ($319) {
  $sp$0$in$i = (526968);
 } else {
  return;
 }
 while(1) {
  $sp$0$i = HEAP32[$sp$0$in$i>>2]|0;
  $320 = ($sp$0$i|0)==(0|0);
  $321 = ((($sp$0$i)) + 8|0);
  if ($320) {
   break;
  } else {
   $sp$0$in$i = $321;
  }
 }
 HEAP32[(526544)>>2] = -1;
 return;
}
function runPostSets() {
}
function _i64Subtract(a, b, c, d) {
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a - c)>>>0;
    h = (b - d)>>>0;
    h = (b - d - (((c>>>0) > (a>>>0))|0))>>>0; // Borrow one from high word to low word on underflow.
    return ((tempRet0 = h,l|0)|0);
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
    stop = (ptr + num)|0;
    if ((num|0) >= 20) {
      // This is unaligned, but quite large, so work hard to get to aligned settings
      value = value & 0xff;
      unaligned = ptr & 3;
      value4 = value | (value << 8) | (value << 16) | (value << 24);
      stop4 = stop & ~3;
      if (unaligned) {
        unaligned = (ptr + 4 - unaligned)|0;
        while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
          HEAP8[((ptr)>>0)]=value;
          ptr = (ptr+1)|0;
        }
      }
      while ((ptr|0) < (stop4|0)) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    while ((ptr|0) < (stop|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (ptr-num)|0;
}
function _bitshift64Lshr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >>> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = 0;
    return (high >>> (bits - 32))|0;
}
function _bitshift64Shl(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = (high << bits) | ((low&(ander << (32 - bits))) >>> (32 - bits));
      return low << bits;
    }
    tempRet0 = low << (bits - 32);
    return 0;
}
function _memcpy(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if ((num|0) >= 4096) return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    ret = dest|0;
    if ((dest&3) == (src&3)) {
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      while ((num|0) >= 4) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
        num = (num-4)|0;
      }
    }
    while ((num|0) > 0) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
      num = (num-1)|0;
    }
    return ret|0;
}
function _i64Add(a, b, c, d) {
    /*
      x = a + b*2^32
      y = c + d*2^32
      result = l + h*2^32
    */
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a + c)>>>0;
    h = (b + d + (((l>>>0) < (a>>>0))|0))>>>0; // Add carry from low word to high word on overflow.
    return ((tempRet0 = h,l|0)|0);
}
function _bitshift64Ashr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = (high|0) < 0 ? -1 : 0;
    return (high >> (bits - 32))|0;
  }
function _llvm_cttz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((cttz_i8)+(x & 0xff))>>0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 8)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 16)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((cttz_i8)+(x >>> 24))>>0)])|0) + 24)|0;
  }

// ======== compiled code from system/lib/compiler-rt , see readme therein
function ___muldsi3($a, $b) {
  $a = $a | 0;
  $b = $b | 0;
  var $1 = 0, $2 = 0, $3 = 0, $6 = 0, $8 = 0, $11 = 0, $12 = 0;
  $1 = $a & 65535;
  $2 = $b & 65535;
  $3 = Math_imul($2, $1) | 0;
  $6 = $a >>> 16;
  $8 = ($3 >>> 16) + (Math_imul($2, $6) | 0) | 0;
  $11 = $b >>> 16;
  $12 = Math_imul($11, $1) | 0;
  return (tempRet0 = (($8 >>> 16) + (Math_imul($11, $6) | 0) | 0) + ((($8 & 65535) + $12 | 0) >>> 16) | 0, 0 | ($8 + $12 << 16 | $3 & 65535)) | 0;
}
function ___divdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $7$0 = 0, $7$1 = 0, $8$0 = 0, $10$0 = 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  $7$0 = $2$0 ^ $1$0;
  $7$1 = $2$1 ^ $1$1;
  $8$0 = ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, 0) | 0;
  $10$0 = _i64Subtract($8$0 ^ $7$0, tempRet0 ^ $7$1, $7$0, $7$1) | 0;
  return $10$0 | 0;
}
function ___remdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $10$0 = 0, $10$1 = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 16 | 0;
  $rem = __stackBase__ | 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, $rem) | 0;
  $10$0 = _i64Subtract(HEAP32[$rem >> 2] ^ $1$0, HEAP32[$rem + 4 >> 2] ^ $1$1, $1$0, $1$1) | 0;
  $10$1 = tempRet0;
  STACKTOP = __stackBase__;
  return (tempRet0 = $10$1, $10$0) | 0;
}
function ___muldi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $x_sroa_0_0_extract_trunc = 0, $y_sroa_0_0_extract_trunc = 0, $1$0 = 0, $1$1 = 0, $2 = 0;
  $x_sroa_0_0_extract_trunc = $a$0;
  $y_sroa_0_0_extract_trunc = $b$0;
  $1$0 = ___muldsi3($x_sroa_0_0_extract_trunc, $y_sroa_0_0_extract_trunc) | 0;
  $1$1 = tempRet0;
  $2 = Math_imul($a$1, $y_sroa_0_0_extract_trunc) | 0;
  return (tempRet0 = ((Math_imul($b$1, $x_sroa_0_0_extract_trunc) | 0) + $2 | 0) + $1$1 | $1$1 & 0, 0 | $1$0 & -1) | 0;
}
function ___udivdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0;
  $1$0 = ___udivmoddi4($a$0, $a$1, $b$0, $b$1, 0) | 0;
  return $1$0 | 0;
}
function ___uremdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 16 | 0;
  $rem = __stackBase__ | 0;
  ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) | 0;
  STACKTOP = __stackBase__;
  return (tempRet0 = HEAP32[$rem + 4 >> 2] | 0, HEAP32[$rem >> 2] | 0) | 0;
}
function ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  $rem = $rem | 0;
  var $n_sroa_0_0_extract_trunc = 0, $n_sroa_1_4_extract_shift$0 = 0, $n_sroa_1_4_extract_trunc = 0, $d_sroa_0_0_extract_trunc = 0, $d_sroa_1_4_extract_shift$0 = 0, $d_sroa_1_4_extract_trunc = 0, $4 = 0, $17 = 0, $37 = 0, $49 = 0, $51 = 0, $57 = 0, $58 = 0, $66 = 0, $78 = 0, $86 = 0, $88 = 0, $89 = 0, $91 = 0, $92 = 0, $95 = 0, $105 = 0, $117 = 0, $119 = 0, $125 = 0, $126 = 0, $130 = 0, $q_sroa_1_1_ph = 0, $q_sroa_0_1_ph = 0, $r_sroa_1_1_ph = 0, $r_sroa_0_1_ph = 0, $sr_1_ph = 0, $d_sroa_0_0_insert_insert99$0 = 0, $d_sroa_0_0_insert_insert99$1 = 0, $137$0 = 0, $137$1 = 0, $carry_0203 = 0, $sr_1202 = 0, $r_sroa_0_1201 = 0, $r_sroa_1_1200 = 0, $q_sroa_0_1199 = 0, $q_sroa_1_1198 = 0, $147 = 0, $149 = 0, $r_sroa_0_0_insert_insert42$0 = 0, $r_sroa_0_0_insert_insert42$1 = 0, $150$1 = 0, $151$0 = 0, $152 = 0, $154$0 = 0, $r_sroa_0_0_extract_trunc = 0, $r_sroa_1_4_extract_trunc = 0, $155 = 0, $carry_0_lcssa$0 = 0, $carry_0_lcssa$1 = 0, $r_sroa_0_1_lcssa = 0, $r_sroa_1_1_lcssa = 0, $q_sroa_0_1_lcssa = 0, $q_sroa_1_1_lcssa = 0, $q_sroa_0_0_insert_ext75$0 = 0, $q_sroa_0_0_insert_ext75$1 = 0, $q_sroa_0_0_insert_insert77$1 = 0, $_0$0 = 0, $_0$1 = 0;
  $n_sroa_0_0_extract_trunc = $a$0;
  $n_sroa_1_4_extract_shift$0 = $a$1;
  $n_sroa_1_4_extract_trunc = $n_sroa_1_4_extract_shift$0;
  $d_sroa_0_0_extract_trunc = $b$0;
  $d_sroa_1_4_extract_shift$0 = $b$1;
  $d_sroa_1_4_extract_trunc = $d_sroa_1_4_extract_shift$0;
  if (($n_sroa_1_4_extract_trunc | 0) == 0) {
    $4 = ($rem | 0) != 0;
    if (($d_sroa_1_4_extract_trunc | 0) == 0) {
      if ($4) {
        HEAP32[$rem >> 2] = ($n_sroa_0_0_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
        HEAP32[$rem + 4 >> 2] = 0;
      }
      $_0$1 = 0;
      $_0$0 = ($n_sroa_0_0_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$4) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    }
  }
  $17 = ($d_sroa_1_4_extract_trunc | 0) == 0;
  do {
    if (($d_sroa_0_0_extract_trunc | 0) == 0) {
      if ($17) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
          HEAP32[$rem + 4 >> 2] = 0;
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      if (($n_sroa_0_0_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0;
          HEAP32[$rem + 4 >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_1_4_extract_trunc >>> 0);
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_1_4_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $37 = $d_sroa_1_4_extract_trunc - 1 | 0;
      if (($37 & $d_sroa_1_4_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0 | $a$0 & -1;
          HEAP32[$rem + 4 >> 2] = $37 & $n_sroa_1_4_extract_trunc | $a$1 & 0;
        }
        $_0$1 = 0;
        $_0$0 = $n_sroa_1_4_extract_trunc >>> ((_llvm_cttz_i32($d_sroa_1_4_extract_trunc | 0) | 0) >>> 0);
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $49 = Math_clz32($d_sroa_1_4_extract_trunc | 0) | 0;
      $51 = $49 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
      if ($51 >>> 0 <= 30) {
        $57 = $51 + 1 | 0;
        $58 = 31 - $51 | 0;
        $sr_1_ph = $57;
        $r_sroa_0_1_ph = $n_sroa_1_4_extract_trunc << $58 | $n_sroa_0_0_extract_trunc >>> ($57 >>> 0);
        $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($57 >>> 0);
        $q_sroa_0_1_ph = 0;
        $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $58;
        break;
      }
      if (($rem | 0) == 0) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = 0 | $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$17) {
        $117 = Math_clz32($d_sroa_1_4_extract_trunc | 0) | 0;
        $119 = $117 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        if ($119 >>> 0 <= 31) {
          $125 = $119 + 1 | 0;
          $126 = 31 - $119 | 0;
          $130 = $119 - 31 >> 31;
          $sr_1_ph = $125;
          $r_sroa_0_1_ph = $n_sroa_0_0_extract_trunc >>> ($125 >>> 0) & $130 | $n_sroa_1_4_extract_trunc << $126;
          $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($125 >>> 0) & $130;
          $q_sroa_0_1_ph = 0;
          $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $126;
          break;
        }
        if (($rem | 0) == 0) {
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        HEAP32[$rem >> 2] = 0 | $a$0 & -1;
        HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $66 = $d_sroa_0_0_extract_trunc - 1 | 0;
      if (($66 & $d_sroa_0_0_extract_trunc | 0) != 0) {
        $86 = (Math_clz32($d_sroa_0_0_extract_trunc | 0) | 0) + 33 | 0;
        $88 = $86 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        $89 = 64 - $88 | 0;
        $91 = 32 - $88 | 0;
        $92 = $91 >> 31;
        $95 = $88 - 32 | 0;
        $105 = $95 >> 31;
        $sr_1_ph = $88;
        $r_sroa_0_1_ph = $91 - 1 >> 31 & $n_sroa_1_4_extract_trunc >>> ($95 >>> 0) | ($n_sroa_1_4_extract_trunc << $91 | $n_sroa_0_0_extract_trunc >>> ($88 >>> 0)) & $105;
        $r_sroa_1_1_ph = $105 & $n_sroa_1_4_extract_trunc >>> ($88 >>> 0);
        $q_sroa_0_1_ph = $n_sroa_0_0_extract_trunc << $89 & $92;
        $q_sroa_1_1_ph = ($n_sroa_1_4_extract_trunc << $89 | $n_sroa_0_0_extract_trunc >>> ($95 >>> 0)) & $92 | $n_sroa_0_0_extract_trunc << $91 & $88 - 33 >> 31;
        break;
      }
      if (($rem | 0) != 0) {
        HEAP32[$rem >> 2] = $66 & $n_sroa_0_0_extract_trunc;
        HEAP32[$rem + 4 >> 2] = 0;
      }
      if (($d_sroa_0_0_extract_trunc | 0) == 1) {
        $_0$1 = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$0 = 0 | $a$0 & -1;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      } else {
        $78 = _llvm_cttz_i32($d_sroa_0_0_extract_trunc | 0) | 0;
        $_0$1 = 0 | $n_sroa_1_4_extract_trunc >>> ($78 >>> 0);
        $_0$0 = $n_sroa_1_4_extract_trunc << 32 - $78 | $n_sroa_0_0_extract_trunc >>> ($78 >>> 0) | 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
    }
  } while (0);
  if (($sr_1_ph | 0) == 0) {
    $q_sroa_1_1_lcssa = $q_sroa_1_1_ph;
    $q_sroa_0_1_lcssa = $q_sroa_0_1_ph;
    $r_sroa_1_1_lcssa = $r_sroa_1_1_ph;
    $r_sroa_0_1_lcssa = $r_sroa_0_1_ph;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = 0;
  } else {
    $d_sroa_0_0_insert_insert99$0 = 0 | $b$0 & -1;
    $d_sroa_0_0_insert_insert99$1 = $d_sroa_1_4_extract_shift$0 | $b$1 & 0;
    $137$0 = _i64Add($d_sroa_0_0_insert_insert99$0 | 0, $d_sroa_0_0_insert_insert99$1 | 0, -1, -1) | 0;
    $137$1 = tempRet0;
    $q_sroa_1_1198 = $q_sroa_1_1_ph;
    $q_sroa_0_1199 = $q_sroa_0_1_ph;
    $r_sroa_1_1200 = $r_sroa_1_1_ph;
    $r_sroa_0_1201 = $r_sroa_0_1_ph;
    $sr_1202 = $sr_1_ph;
    $carry_0203 = 0;
    while (1) {
      $147 = $q_sroa_0_1199 >>> 31 | $q_sroa_1_1198 << 1;
      $149 = $carry_0203 | $q_sroa_0_1199 << 1;
      $r_sroa_0_0_insert_insert42$0 = 0 | ($r_sroa_0_1201 << 1 | $q_sroa_1_1198 >>> 31);
      $r_sroa_0_0_insert_insert42$1 = $r_sroa_0_1201 >>> 31 | $r_sroa_1_1200 << 1 | 0;
      _i64Subtract($137$0, $137$1, $r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1) | 0;
      $150$1 = tempRet0;
      $151$0 = $150$1 >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1;
      $152 = $151$0 & 1;
      $154$0 = _i64Subtract($r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1, $151$0 & $d_sroa_0_0_insert_insert99$0, ((($150$1 | 0) < 0 ? -1 : 0) >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1) & $d_sroa_0_0_insert_insert99$1) | 0;
      $r_sroa_0_0_extract_trunc = $154$0;
      $r_sroa_1_4_extract_trunc = tempRet0;
      $155 = $sr_1202 - 1 | 0;
      if (($155 | 0) == 0) {
        break;
      } else {
        $q_sroa_1_1198 = $147;
        $q_sroa_0_1199 = $149;
        $r_sroa_1_1200 = $r_sroa_1_4_extract_trunc;
        $r_sroa_0_1201 = $r_sroa_0_0_extract_trunc;
        $sr_1202 = $155;
        $carry_0203 = $152;
      }
    }
    $q_sroa_1_1_lcssa = $147;
    $q_sroa_0_1_lcssa = $149;
    $r_sroa_1_1_lcssa = $r_sroa_1_4_extract_trunc;
    $r_sroa_0_1_lcssa = $r_sroa_0_0_extract_trunc;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = $152;
  }
  $q_sroa_0_0_insert_ext75$0 = $q_sroa_0_1_lcssa;
  $q_sroa_0_0_insert_ext75$1 = 0;
  $q_sroa_0_0_insert_insert77$1 = $q_sroa_1_1_lcssa | $q_sroa_0_0_insert_ext75$1;
  if (($rem | 0) != 0) {
    HEAP32[$rem >> 2] = 0 | $r_sroa_0_1_lcssa;
    HEAP32[$rem + 4 >> 2] = $r_sroa_1_1_lcssa | 0;
  }
  $_0$1 = (0 | $q_sroa_0_0_insert_ext75$0) >>> 31 | $q_sroa_0_0_insert_insert77$1 << 1 | ($q_sroa_0_0_insert_ext75$1 << 1 | $q_sroa_0_0_insert_ext75$0 >>> 31) & 0 | $carry_0_lcssa$1;
  $_0$0 = ($q_sroa_0_0_insert_ext75$0 << 1 | 0 >>> 31) & -2 | $carry_0_lcssa$0;
  return (tempRet0 = $_0$1, $_0$0) | 0;
}
// =======================================================================



  
function dynCall_iiii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  return FUNCTION_TABLE_iiii[index&63](a1|0,a2|0,a3|0)|0;
}


function dynCall_i(index) {
  index = index|0;
  
  return FUNCTION_TABLE_i[index&127]()|0;
}


function dynCall_vii(index,a1,a2) {
  index = index|0;
  a1=a1|0; a2=a2|0;
  FUNCTION_TABLE_vii[index&1](a1|0,a2|0);
}


function dynCall_ii(index,a1) {
  index = index|0;
  a1=a1|0;
  return FUNCTION_TABLE_ii[index&127](a1|0)|0;
}


function dynCall_iiiii(index,a1,a2,a3,a4) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0;
  return FUNCTION_TABLE_iiiii[index&63](a1|0,a2|0,a3|0,a4|0)|0;
}


function dynCall_iii(index,a1,a2) {
  index = index|0;
  a1=a1|0; a2=a2|0;
  return FUNCTION_TABLE_iii[index&63](a1|0,a2|0)|0;
}

function b0(p0,p1,p2) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(0);return 0;
}
function b1() {
 ; nullFunc_i(1);return 0;
}
function b2(p0,p1) {
 p0 = p0|0;p1 = p1|0; nullFunc_vii(2);
}
function b3(p0) {
 p0 = p0|0; nullFunc_ii(3);return 0;
}
function b4(p0,p1,p2,p3) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0; nullFunc_iiiii(4);return 0;
}
function b5(p0,p1) {
 p0 = p0|0;p1 = p1|0; nullFunc_iii(5);return 0;
}

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_iiii = [b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,_str_left,_str_right,b0,b0,b0,b0,_int_to_str,b0,_ladder_coil,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0
,b0,_nst_extract_bits,b0,b0,b0,b0,b0,b0,b0,b0,_nst_LE_UINT16_SET,_nst_BE_UINT16_SET,_nst_LE_UINT32_SET,_nst_BE_UINT32_SET,_nst_PLCInpGet,_nst_PLCOutpSet,b0,b0,b0,b0,_nst_DiagIntGet,_nst_InpIntGet,b0,_ARGEE_WriteDS,_ARGEE_ReadDS,b0,b0,b0,_nst_array_init,b0
,b0,_if_then_else,b0,b0,b0];
var FUNCTION_TABLE_i = [b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,_bitmask_extract_r0,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1];
var FUNCTION_TABLE_vii = [b2,_startProg];
var FUNCTION_TABLE_ii = [b3,b3,_getCodePtr,_getIO_InpPtr,_getIO_DiagPtr,_getPLC_InpPtr,_getSpecialReg,b3,_timerCount,_str_len,b3,b3,b3,b3,b3,b3,b3,_ladder_condition,b3,b3,b3,b3,b3,_ladder_counter_reset,_tm_cnt_expired,b3,b3,b3,b3
,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,_nst_abs,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,_getRungTrueFunc
,_nst_sign_extend16,b3,b3,b3,_instr_trace,_bitmask_insert,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3
,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3
,b3,b3,b3,b3,b3,b3,b3,b3,b3];
var FUNCTION_TABLE_iiiii = [b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,_str_mid,b4,b4,b4,b4,b4,b4,_ladder_assign,b4,b4,b4,b4,b4,b4,b4,b4,b4
,b4,b4,_nst_set_bits,_nst_InpArrGet,_nst_OutpArrSet,_nst_DiagArrGet,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,_nst_OutpIntSet,b4,b4,b4,b4,_nst_ParamIntSet,b4,b4
,b4,b4,b4,b4,b4];
var FUNCTION_TABLE_iii = [b5,b5,b5,b5,b5,b5,b5,_startTimer,b5,b5,b5,b5,b5,_str_copy,_str_concat,_str_to_int,b5,b5,b5,b5,_ladder_timer_on,_ladder_timer_off,_ladder_timer_start,b5,b5,_ladder_count_up,_ladder_count_down,_nst_F_COS,_nst_R_TRIG
,_nst_F_TRIG,b5,b5,b5,b5,b5,_nst_LE_UINT16_GET,_nst_BE_UINT16_GET,_nst_LE_UINT32_GET,_nst_BE_UINT32_GET,b5,b5,b5,b5,b5,b5,_nst_min,_nst_max,b5,_str_compare,b5,b5,b5,b5,b5,_nst_trace,_nst_ladder_trace,b5,b5,b5
,b5,b5,_int_div,_int_mod,b5];

  return { _setArm7Mode: _setArm7Mode, _setNST_Preempt: _setNST_Preempt, _ARGEE_simExec: _ARGEE_simExec, _bitshift64Lshr: _bitshift64Lshr, _getProgBuf: _getProgBuf, _memset: _memset, _setupSectSize: _setupSectSize, _OS_getIntTick: _OS_getIntTick, _memcpy: _memcpy, _getPLCPtr: _getPLCPtr, _POP_ELEM: _POP_ELEM, _bitshift64Shl: _bitshift64Shl, _setSystemTime: _setSystemTime, _i64Subtract: _i64Subtract, _processProjFile: _processProjFile, _updateStatusRegs: _updateStatusRegs, _getCPU_Regs: _getCPU_Regs, _i64Add: _i64Add, _GET_VAL: _GET_VAL, _getTmpBuf: _getTmpBuf, _free: _free, _writeObjWithOffsets: _writeObjWithOffsets, _getIOPtr: _getIOPtr, _MOV_VAL: _MOV_VAL, _GET_STACK_ELEM: _GET_STACK_ELEM, _SET_STACK_ELEM: _SET_STACK_ELEM, _malloc: _malloc, _PUSH_ELEM: _PUSH_ELEM, _disas_thumb_insn: _disas_thumb_insn, _ARGEE_sim_PrepExecNST: _ARGEE_sim_PrepExecNST, _setupBreakpointReplacement: _setupBreakpointReplacement, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_iiii: dynCall_iiii, dynCall_i: dynCall_i, dynCall_vii: dynCall_vii, dynCall_ii: dynCall_ii, dynCall_iiiii: dynCall_iiiii, dynCall_iii: dynCall_iii };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);
var real__setArm7Mode = asm["_setArm7Mode"]; asm["_setArm7Mode"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__setArm7Mode.apply(null, arguments);
};

var real__setNST_Preempt = asm["_setNST_Preempt"]; asm["_setNST_Preempt"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__setNST_Preempt.apply(null, arguments);
};

var real__ARGEE_simExec = asm["_ARGEE_simExec"]; asm["_ARGEE_simExec"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__ARGEE_simExec.apply(null, arguments);
};

var real__bitshift64Lshr = asm["_bitshift64Lshr"]; asm["_bitshift64Lshr"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__bitshift64Lshr.apply(null, arguments);
};

var real__bitshift64Shl = asm["_bitshift64Shl"]; asm["_bitshift64Shl"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__bitshift64Shl.apply(null, arguments);
};

var real__setupSectSize = asm["_setupSectSize"]; asm["_setupSectSize"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__setupSectSize.apply(null, arguments);
};

var real__OS_getIntTick = asm["_OS_getIntTick"]; asm["_OS_getIntTick"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__OS_getIntTick.apply(null, arguments);
};

var real__getPLCPtr = asm["_getPLCPtr"]; asm["_getPLCPtr"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__getPLCPtr.apply(null, arguments);
};

var real__POP_ELEM = asm["_POP_ELEM"]; asm["_POP_ELEM"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__POP_ELEM.apply(null, arguments);
};

var real__getProgBuf = asm["_getProgBuf"]; asm["_getProgBuf"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__getProgBuf.apply(null, arguments);
};

var real__setSystemTime = asm["_setSystemTime"]; asm["_setSystemTime"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__setSystemTime.apply(null, arguments);
};

var real__i64Subtract = asm["_i64Subtract"]; asm["_i64Subtract"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__i64Subtract.apply(null, arguments);
};

var real__processProjFile = asm["_processProjFile"]; asm["_processProjFile"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__processProjFile.apply(null, arguments);
};

var real__updateStatusRegs = asm["_updateStatusRegs"]; asm["_updateStatusRegs"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__updateStatusRegs.apply(null, arguments);
};

var real__getTmpBuf = asm["_getTmpBuf"]; asm["_getTmpBuf"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__getTmpBuf.apply(null, arguments);
};

var real__i64Add = asm["_i64Add"]; asm["_i64Add"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__i64Add.apply(null, arguments);
};

var real__GET_VAL = asm["_GET_VAL"]; asm["_GET_VAL"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__GET_VAL.apply(null, arguments);
};

var real__getCPU_Regs = asm["_getCPU_Regs"]; asm["_getCPU_Regs"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__getCPU_Regs.apply(null, arguments);
};

var real__free = asm["_free"]; asm["_free"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__free.apply(null, arguments);
};

var real__writeObjWithOffsets = asm["_writeObjWithOffsets"]; asm["_writeObjWithOffsets"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__writeObjWithOffsets.apply(null, arguments);
};

var real__getIOPtr = asm["_getIOPtr"]; asm["_getIOPtr"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__getIOPtr.apply(null, arguments);
};

var real__MOV_VAL = asm["_MOV_VAL"]; asm["_MOV_VAL"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__MOV_VAL.apply(null, arguments);
};

var real__GET_STACK_ELEM = asm["_GET_STACK_ELEM"]; asm["_GET_STACK_ELEM"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__GET_STACK_ELEM.apply(null, arguments);
};

var real__SET_STACK_ELEM = asm["_SET_STACK_ELEM"]; asm["_SET_STACK_ELEM"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__SET_STACK_ELEM.apply(null, arguments);
};

var real__malloc = asm["_malloc"]; asm["_malloc"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__malloc.apply(null, arguments);
};

var real__PUSH_ELEM = asm["_PUSH_ELEM"]; asm["_PUSH_ELEM"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__PUSH_ELEM.apply(null, arguments);
};

var real__disas_thumb_insn = asm["_disas_thumb_insn"]; asm["_disas_thumb_insn"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__disas_thumb_insn.apply(null, arguments);
};

var real__ARGEE_sim_PrepExecNST = asm["_ARGEE_sim_PrepExecNST"]; asm["_ARGEE_sim_PrepExecNST"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__ARGEE_sim_PrepExecNST.apply(null, arguments);
};

var real__setupBreakpointReplacement = asm["_setupBreakpointReplacement"]; asm["_setupBreakpointReplacement"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__setupBreakpointReplacement.apply(null, arguments);
};
var _setArm7Mode = Module["_setArm7Mode"] = asm["_setArm7Mode"];
var _setNST_Preempt = Module["_setNST_Preempt"] = asm["_setNST_Preempt"];
var _ARGEE_simExec = Module["_ARGEE_simExec"] = asm["_ARGEE_simExec"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var _memset = Module["_memset"] = asm["_memset"];
var _setupSectSize = Module["_setupSectSize"] = asm["_setupSectSize"];
var _OS_getIntTick = Module["_OS_getIntTick"] = asm["_OS_getIntTick"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _getPLCPtr = Module["_getPLCPtr"] = asm["_getPLCPtr"];
var _POP_ELEM = Module["_POP_ELEM"] = asm["_POP_ELEM"];
var _getProgBuf = Module["_getProgBuf"] = asm["_getProgBuf"];
var _setSystemTime = Module["_setSystemTime"] = asm["_setSystemTime"];
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _processProjFile = Module["_processProjFile"] = asm["_processProjFile"];
var _updateStatusRegs = Module["_updateStatusRegs"] = asm["_updateStatusRegs"];
var _getTmpBuf = Module["_getTmpBuf"] = asm["_getTmpBuf"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _GET_VAL = Module["_GET_VAL"] = asm["_GET_VAL"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var _getCPU_Regs = Module["_getCPU_Regs"] = asm["_getCPU_Regs"];
var _free = Module["_free"] = asm["_free"];
var _writeObjWithOffsets = Module["_writeObjWithOffsets"] = asm["_writeObjWithOffsets"];
var _getIOPtr = Module["_getIOPtr"] = asm["_getIOPtr"];
var _MOV_VAL = Module["_MOV_VAL"] = asm["_MOV_VAL"];
var _GET_STACK_ELEM = Module["_GET_STACK_ELEM"] = asm["_GET_STACK_ELEM"];
var _SET_STACK_ELEM = Module["_SET_STACK_ELEM"] = asm["_SET_STACK_ELEM"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _PUSH_ELEM = Module["_PUSH_ELEM"] = asm["_PUSH_ELEM"];
var _disas_thumb_insn = Module["_disas_thumb_insn"] = asm["_disas_thumb_insn"];
var _ARGEE_sim_PrepExecNST = Module["_ARGEE_sim_PrepExecNST"] = asm["_ARGEE_sim_PrepExecNST"];
var _setupBreakpointReplacement = Module["_setupBreakpointReplacement"] = asm["_setupBreakpointReplacement"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_i = Module["dynCall_i"] = asm["dynCall_i"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
;

Runtime.stackAlloc = asm['stackAlloc'];
Runtime.stackSave = asm['stackSave'];
Runtime.stackRestore = asm['stackRestore'];
Runtime.establishStackSpace = asm['establishStackSpace'];

Runtime.setTempRet0 = asm['setTempRet0'];
Runtime.getTempRet0 = asm['getTempRet0'];



// === Auto-generated postamble setup entry stuff ===


function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun']) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString(Module['thisProgram']), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);


  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return; 

    ensureInitRuntime();

    preMain();

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (Module['_main'] && shouldRunNow) Module['callMain'](args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status, implicit) {
  if (implicit && Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') implicitly called by end of main(), but noExitRuntime, so not exiting the runtime (you can use emscripten_force_exit, if you want to force a true shutdown)');
    return;
  }

  if (Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') called, but noExitRuntime, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)');
  } else {

    ABORT = true;
    EXITSTATUS = status;
    STACKTOP = initialStackTop;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  if (ENVIRONMENT_IS_NODE) {
    // Work around a node.js bug where stdout buffer is not flushed at process exit:
    // Instead of process.exit() directly, wait for stdout flush event.
    // See https://github.com/joyent/node/issues/1669 and https://github.com/kripken/emscripten/issues/2582
    // Workaround is based on https://github.com/RReverser/acorn/commit/50ab143cecc9ed71a2d66f78b4aec3bb2e9844f6
    process['stdout']['once']('drain', function () {
      process['exit'](status);
    });
    console.log(' '); // Make sure to print something to force the drain event to occur, in case the stdout buffer was empty.
    // Work around another node bug where sometimes 'drain' is never fired - make another effort
    // to emit the exit status, after a significant delay (if node hasn't fired drain by then, give up)
    setTimeout(function() {
      process['exit'](status);
    }, 500);
  } else
  if (ENVIRONMENT_IS_SHELL && typeof quit === 'function') {
    quit(status);
  }
  // if we reach here, we must throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

var abortDecorators = [];

function abort(what) {
  if (what !== undefined) {
    Module.print(what);
    Module.printErr(what);
    what = JSON.stringify(what)
  } else {
    what = '';
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';

  var output = 'abort(' + what + ') at ' + stackTrace() + extra;
  if (abortDecorators) {
    abortDecorators.forEach(function(decorator) {
      output = decorator(output, what);
    });
  }
  throw output;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}



