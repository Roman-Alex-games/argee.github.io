var Module = typeof Module !== "undefined" ? Module : {};

var moduleOverrides = {};

var key;

for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = function(status, toThrow) {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

ENVIRONMENT_IS_WEB = typeof window === "object";

ENVIRONMENT_IS_WORKER = typeof importScripts === "function";

ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

var nodeFS;

var nodePath;

if (ENVIRONMENT_IS_NODE) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = require("path").dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 read_ = function shell_read(filename, binary) {
  var ret = tryParseAsDataURI(filename);
  if (ret) {
   return binary ? ret : ret.toString();
  }
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  return nodeFS["readFileSync"](filename, binary ? null : "utf8");
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 if (typeof module !== "undefined") {
  module["exports"] = Module;
 }
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", abort);
 quit_ = function(status) {
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   var data = tryParseAsDataURI(f);
   if (data) {
    return intArrayToString(data);
   }
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  data = tryParseAsDataURI(f);
  if (data) {
   return data;
  }
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = function(status) {
   quit(status);
  };
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 {
  read_ = function shell_read(url) {
   try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
   } catch (err) {
    var data = tryParseAsDataURI(url);
    if (data) {
     return intArrayToString(data);
    }
    throw err;
   }
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = function readBinary(url) {
    try {
     var xhr = new XMLHttpRequest();
     xhr.open("GET", url, false);
     xhr.responseType = "arraybuffer";
     xhr.send(null);
     return new Uint8Array(xhr.response);
    } catch (err) {
     var data = tryParseAsDataURI(url);
     if (data) {
      return data;
     }
     throw err;
    }
   };
  }
  readAsync = function readAsync(url, onload, onerror) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = function xhr_onload() {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    var data = tryParseAsDataURI(url);
    if (data) {
     onload(data.buffer);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = function(title) {
  document.title = title;
 };
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime;

if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];

var WebAssembly = {
 Memory: function(opts) {
  this.buffer = new ArrayBuffer(opts["initial"] * 65536);
  this.grow = function(amount) {
   var ret = __growWasmMemory(amount);
   return ret;
  };
 },
 Table: function(opts) {
  var ret = new Array(opts["initial"]);
  ret.grow = function(by) {
   if (ret.length >= 77 + 0) {
    abort("Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.");
   }
   ret.push(null);
  };
  ret.set = function(i, func) {
   ret[i] = func;
  };
  ret.get = function(i) {
   return ret[i];
  };
  return ret;
 },
 Module: function(binary) {},
 Instance: function(module, info) {
  this.exports = (
// EMSCRIPTEN_START_ASM
function instantiate(asmLibraryArg, wasmMemory, wasmTable) {


  var scratchBuffer = new ArrayBuffer(16);
  var i32ScratchView = new Int32Array(scratchBuffer);
  var f32ScratchView = new Float32Array(scratchBuffer);
  var f64ScratchView = new Float64Array(scratchBuffer);
  
  function wasm2js_scratch_store_f32(value) {
    f32ScratchView[2] = value;
  }
      
  function wasm2js_scratch_load_i32(index) {
    return i32ScratchView[index];
  }
      
  function wasm2js_scratch_store_i32(index, value) {
    i32ScratchView[index] = value;
  }
      
  function wasm2js_scratch_load_f32() {
    return f32ScratchView[2];
  }
      
function asmFunc(global, env, buffer) {
 var memory = env.memory;
 var FUNCTION_TABLE = wasmTable;
 var HEAP8 = new global.Int8Array(buffer);
 var HEAP16 = new global.Int16Array(buffer);
 var HEAP32 = new global.Int32Array(buffer);
 var HEAPU8 = new global.Uint8Array(buffer);
 var HEAPU16 = new global.Uint16Array(buffer);
 var HEAPU32 = new global.Uint32Array(buffer);
 var HEAPF32 = new global.Float32Array(buffer);
 var HEAPF64 = new global.Float64Array(buffer);
 var Math_imul = global.Math.imul;
 var Math_fround = global.Math.fround;
 var Math_abs = global.Math.abs;
 var Math_clz32 = global.Math.clz32;
 var Math_min = global.Math.min;
 var Math_max = global.Math.max;
 var Math_floor = global.Math.floor;
 var Math_ceil = global.Math.ceil;
 var Math_sqrt = global.Math.sqrt;
 var abort = env.abort;
 var nan = global.NaN;
 var infinity = global.Infinity;
 var __wasi_fd_write = env.a;
 var emscripten_memcpy_big = env.b;
 var global$0 = 1208912;
 var i64toi32_i32$HIGH_BITS = 0;
 // EMSCRIPTEN_START_FUNCS
function disas_thumb2_insn() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = Math_fround(0), $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = Math_fround(0);
 $1 = HEAP32[296551];
 $0 = $1 + -2 & -2;
 $3 = HEAPU8[$0 | 0];
 $7 = HEAPU8[$0 + 1 | 0];
 $0 = $1 & -2;
 $2 = HEAPU8[$0 | 0];
 $0 = HEAPU8[$0 + 1 | 0];
 $11 = $1 + 2 | 0;
 HEAP32[296551] = $11;
 $12 = $2 | $0 << 8;
 $4 = $7 << 8 | $3;
 $10 = $4 << 16;
 $9 = $2 & 15;
 $6 = $0 & 15;
 $8 = $0 >>> 4 | 0;
 $1 = $3 & 15;
 label$1 : {
  label$2 : {
   label$3 : {
    label$4 : {
     label$5 : {
      label$6 : {
       switch (($7 >>> 1 & 15) - 4 | 0) {
       default:
        while (1) continue;
       case 0:
        while (1) continue;
       case 1:
        $0 = HEAP32[($9 << 2) + 1186144 >> 2];
        $1 = HEAP32[($1 << 2) + 1186144 >> 2];
        label$15 : {
         switch ($4 >>> 5 & 15) {
         case 1:
          while (1) continue;
         case 2:
          HEAP32[($6 << 2) + 1186144 >> 2] = $0 | $1;
          return;
         case 3:
          while (1) continue;
         case 4:
          while (1) continue;
         case 8:
          HEAP32[($6 << 2) + 1186144 >> 2] = $0 + $1;
          return;
         case 10:
          while (1) continue;
         case 11:
          while (1) continue;
         case 13:
          HEAP32[($6 << 2) + 1186144 >> 2] = $1 - $0;
          return;
         case 14:
          while (1) continue;
         case 0:
          break label$5;
         default:
          break label$15;
         }
        }
        while (1) continue;
       case 9:
        $4 = $4 >>> 6 & 6 | $2 >>> 7;
        if (!(($0 & 240) == 240 | $4 >>> 0 > 3)) {
         while (1) continue;
        }
        label$34 : {
         switch ($4 + -4 | 0) {
         case 0:
         case 1:
          $10 = ($6 << 2) + 1186144 | 0;
          $0 = HEAP32[($1 << 2) + 1186144 >> 2];
          $1 = $0;
          label$36 : {
           if ($3 & 112) {
            break label$36;
           }
           $0 = Math_imul($0, HEAP32[($9 << 2) + 1186144 >> 2]);
           $1 = $0;
           if (($8 | 0) == 15) {
            break label$36;
           }
           $3 = HEAP32[($8 << 2) + 1186144 >> 2];
           $1 = $3 - $0 | 0;
           if ($2 & 240) {
            break label$36;
           }
           $1 = $0 + $3 | 0;
          }
          HEAP32[$10 >> 2] = $1;
          return;
         case 2:
         case 3:
          break label$34;
         default:
          break label$4;
         }
        }
        if (($3 & 80) == 16) {
         $0 = ($6 << 2) + 1186144 | 0;
         $2 = HEAP32[($9 << 2) + 1186144 >> 2];
         $10 = 0;
         label$38 : {
          if (!$2) {
           break label$38;
          }
          $10 = HEAP32[($1 << 2) + 1186144 >> 2] / ($2 | 0) | 0;
         }
         HEAP32[$0 >> 2] = $10;
         return;
        }
        while (1) continue;
       case 2:
       case 3:
       case 10:
       case 11:
        if (($0 & 14) == 10) {
         label$41 : {
          label$42 : {
           label$43 : {
            label$44 : {
             label$45 : {
              switch (($7 & 15) + -12 | 0) {
              case 2:
               if ($2 & 16) {
                if (($6 | 0) == 11) {
                 while (1) continue;
                }
                $1 = $3 << 1 & 30 | $2 >>> 7;
                if ($3 & 16) {
                 if (($8 | 0) == 15) {
                  break label$4;
                 }
                 HEAP32[($8 << 2) + 1186144 >> 2] = HEAP32[($1 << 2) + 1187008 >> 2];
                 return;
                }
                HEAP32[($1 << 2) + 1187008 >> 2] = HEAP32[($8 << 2) + 1186144 >> 2];
                return;
               }
               $7 = $3 << 1 & 30;
               $4 = $7 | $2 >>> 7;
               $1 = $2 >>> 6 & 1 | ($3 >>> 4 & 8 | $3 >>> 3 & 6);
               $9 = ($4 | 0) == 15 & ($1 | 0) == 15;
               label$51 : {
                if (($9 | 0) == 1) {
                 if (!($3 & 64)) {
                  break label$51;
                 }
                 break label$44;
                }
                $8 = $0 >>> 3 & 30 | $3 >>> 6 & 1;
               }
               $0 = $2 << 1 & 30 | $2 >>> 5 & 1;
               label$53 : {
                label$54 : {
                 label$55 : {
                  label$56 : {
                   label$57 : {
                    label$58 : {
                     label$59 : {
                      if (($1 | 0) == 15) {
                       label$61 : {
                        switch ($4 + -8 | 0) {
                        case 0:
                        case 1:
                         $5 = HEAPF32[($0 << 2) + 1187008 >> 2];
                         $0 = HEAP32[($8 << 2) + 1187008 >> 2];
                         break label$58;
                        case 2:
                        case 3:
                         $0 = HEAP32[($8 << 2) + 1187008 >> 2];
                         break label$58;
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                         $0 = HEAP32[($8 << 2) + 1187008 >> 2];
                         break label$58;
                        case 8:
                        case 9:
                         break label$59;
                        default:
                         break label$61;
                        }
                       }
                       $0 = HEAP32[($0 << 2) + 1187008 >> 2];
                       break label$58;
                      }
                      $5 = HEAPF32[($0 << 2) + 1187008 >> 2];
                      $0 = ($4 << 2) + 1187008 | 0;
                      $14 = HEAPF32[$0 >> 2];
                      $0 = HEAP32[$0 >> 2];
                      label$65 : {
                       switch ($1 + -4 | 0) {
                       case 1:
                        $0 = (wasm2js_scratch_store_f32(Math_fround(Math_fround(-$5) * $14)), wasm2js_scratch_load_i32(2));
                        break label$53;
                       case 2:
                        $0 = (wasm2js_scratch_store_f32(Math_fround($5 + $14)), wasm2js_scratch_load_i32(2));
                        break label$53;
                       case 3:
                        $0 = (wasm2js_scratch_store_f32(Math_fround($14 - $5)), wasm2js_scratch_load_i32(2));
                        break label$53;
                       case 0:
                        break label$54;
                       case 10:
                        break label$58;
                       case 4:
                        break label$65;
                       default:
                        break label$57;
                       }
                      }
                      $0 = (wasm2js_scratch_store_f32(Math_fround($14 / $5)), wasm2js_scratch_load_i32(2));
                      break label$53;
                     }
                     $5 = Math_fround(HEAP32[($0 << 2) + 1187008 >> 2]);
                    }
                    label$69 : {
                     switch ($4 | 0) {
                     case 2:
                      $0 = $0 ^ -2147483648;
                      break label$55;
                     case 3:
                      $0 = (wasm2js_scratch_store_f32(Math_fround(Math_sqrt((wasm2js_scratch_store_i32(2, $0), wasm2js_scratch_load_f32())))), wasm2js_scratch_load_i32(2));
                      break label$55;
                     case 8:
                      HEAP32[296620] = 0;
                      $5 = Math_fround((wasm2js_scratch_store_i32(2, $0), wasm2js_scratch_load_f32()) - $5);
                      if (!($5 < Math_fround(0) ^ 1)) {
                       HEAP32[296620] = 19;
                       break label$55;
                      }
                      if ($5 == Math_fround(0)) {
                       HEAP32[296620] = 42;
                       break label$55;
                      }
                      HEAP32[296620] = 28;
                      break label$55;
                     case 9:
                      HEAP32[296620] = 0;
                      $5 = Math_fround((wasm2js_scratch_store_i32(2, $0), wasm2js_scratch_load_f32()) - $5);
                      if (!($5 < Math_fround(0) ^ 1)) {
                       HEAP32[296620] = 19;
                       break label$55;
                      }
                      if ($5 == Math_fround(0)) {
                       HEAP32[296620] = 42;
                       break label$55;
                      }
                      HEAP32[296620] = 28;
                      break label$55;
                     case 17:
                      $0 = (wasm2js_scratch_store_f32(Math_fround($5 + Math_fround(0))), wasm2js_scratch_load_i32(2));
                      break label$55;
                     case 26:
                      if (!($5 >= Math_fround(0) ^ 1)) {
                       $0 = (wasm2js_scratch_store_f32(Math_fround(Math_floor($5))), wasm2js_scratch_load_i32(2));
                       break label$55;
                      }
                      $0 = (wasm2js_scratch_store_f32(Math_fround(Math_ceil($5))), wasm2js_scratch_load_i32(2));
                      break label$55;
                     case 27:
                      $5 = (wasm2js_scratch_store_i32(2, $0), wasm2js_scratch_load_f32());
                      $13 = +$5;
                      $13 = $5 >= Math_fround(0) ? Math_floor($13) : Math_ceil($13);
                      if ($13 < 4294967296 & $13 >= 0) {
                       $0 = ~~$13 >>> 0;
                       break label$55;
                      }
                      $0 = 0;
                      break label$55;
                     case 0:
                     case 4:
                     case 5:
                     case 6:
                     case 7:
                     case 10:
                     case 11:
                     case 12:
                     case 13:
                     case 14:
                     case 15:
                     case 16:
                     case 20:
                     case 21:
                     case 22:
                     case 23:
                     case 24:
                     case 25:
                     case 28:
                     case 29:
                     case 30:
                     case 31:
                      break label$55;
                     case 1:
                      break label$56;
                     default:
                      break label$69;
                     }
                    }
                    while (1) continue;
                   }
                   while (1) continue;
                  }
                  $0 = $0 & 2147483647;
                 }
                 $3 = $10 & 917504;
                 if (($1 | 0) == 15 ? ($3 | 0) == 262144 : 0) {
                  break label$4;
                 }
                 if (!(($6 | 0) != 11 | ($1 | 0) != 15 | (($3 | 0) != 786432 ? ($7 | 0) != 6 : 0))) {
                  break label$2;
                 }
                 if (!$9) {
                  break label$53;
                 }
                 break label$2;
                }
                $0 = (wasm2js_scratch_store_f32(Math_fround($5 * $14)), wasm2js_scratch_load_i32(2));
               }
               break label$2;
              case 0:
              case 1:
               break label$45;
              default:
               break label$41;
              }
             }
             if (($4 & 992) == 64) {
              break label$4;
             }
             if (($6 | 0) != 11) {
              break label$43;
             }
             if (!($3 & 64)) {
              break label$42;
             }
            }
            while (1) continue;
           }
           $8 = $0 >>> 3 & 30 | $3 >>> 6 & 1;
          }
          if (($4 & 288) == 256) {
           break label$4;
          }
          $12 = $3 & 32;
          if (!(!$12 | ($7 & 1) != ($3 >>> 7 | 0))) {
           while (1) continue;
          }
          $0 = ($6 | 0) == 11;
          $9 = $2 >>> $0 | 0;
          if (!($8 + $9 >>> 0 < 33 ? !($9 >>> 0 > 16 & $0 | !$9) : 0)) {
           while (1) continue;
          }
          if (($3 & 47) == 47) {
           while (1) continue;
          }
          $4 = 0;
          $1 = ($1 << 2) + 1186144 | 0;
          $11 = $7 & 1;
          $0 = HEAP32[$1 >> 2] - (0 - $11 & $2 << 2) | 0;
          $7 = ($6 | 0) == 11 ? 8 : 4;
          label$94 : {
           if (!($3 & 16)) {
            while (1) {
             HEAP32[$0 >> 2] = HEAP32[($4 + $8 << 2) + 1187008 >> 2];
             $0 = $0 + $7 | 0;
             $4 = $4 + 1 | 0;
             if (($9 | 0) != ($4 | 0)) {
              continue;
             }
             break label$94;
            }
           }
           while (1) {
            HEAP32[($4 + $8 << 2) + 1187008 >> 2] = HEAP32[$0 >> 2];
            $0 = $0 + $7 | 0;
            $4 = $4 + 1 | 0;
            if (($9 | 0) != ($4 | 0)) {
             continue;
            }
            break;
           }
          }
          if (!$12) {
           break label$4;
          }
          HEAP32[$1 >> 2] = ($11 ? 0 - Math_imul($7, $9) | 0 : ($2 & ($6 | 0) == 11) << 2) + $0;
          return;
         }
         while (1) continue;
        }
        while (1) continue;
       case 4:
       case 5:
       case 6:
       case 7:
        if ($0 & 128) {
         if (!($0 & 80)) {
          break label$4;
         }
         $1 = ($12 | $10) ^ -1;
         $1 = $1 << 10 & 8388608 ^ ($12 << 1 & 4094 | $4 << 21 >> 9) ^ $1 << 11 & 4194304;
         if ($0 & 64) {
          HEAP32[296550] = $11 | 1;
         }
         $1 = $1 + $11 | 0;
         if ($0 & 16) {
          $0 = HEAP32[832];
          if (($1 | 0) < ($0 | 0)) {
           $1 = $1 - $0 | 0;
           $0 = $1 >> 31;
           $2 = ($0 ^ $0 + $1) + 1 & -4;
           $1 = HEAP32[$2 + 2396 >> 2];
           HEAP32[296532] = $1;
           label$106 : {
            label$107 : {
             label$108 : {
              label$109 : {
               $2 = HEAP32[$2 + 2428 >> 2];
               switch ($2 + -1 | 0) {
               case 0:
                break label$107;
               case 1:
                break label$108;
               case 2:
                break label$109;
               default:
                break label$106;
               }
              }
              $4 = HEAP32[296538];
             }
             $3 = HEAP32[296537];
            }
            $0 = HEAP32[296536];
           }
           label$110 : {
            switch ($2 | 0) {
            case 3:
             FUNCTION_TABLE[$1 | 0]($0, $3, $4) | 0;
             return;
            case 2:
             FUNCTION_TABLE[$1 | 0]($0, $3) | 0;
             return;
            case 1:
             FUNCTION_TABLE[$1 | 0]($0) | 0;
             return;
            case 0:
             break label$110;
            default:
             break label$4;
            }
           }
           FUNCTION_TABLE[$1 | 0]() | 0;
           return;
          }
          HEAP32[296551] = $1;
          return;
         }
         HEAP32[296551] = $1 & -3;
         return;
        }
        if ($7 & 2) {
         if ($7 & 1) {
          if ($3 & 16) {
           while (1) continue;
          }
          $4 = $0 >>> 2 & 28;
          $0 = 0;
          $0 = ($1 | 0) != 15 ? HEAP32[($1 << 2) + 1186144 >> 2] : $0;
          $1 = $4 | $2 >>> 6;
          $2 = $2 & 31;
          label$119 : {
           label$120 : {
            switch (($3 >>> 5 | 0) + -2 | 0) {
            case 0:
             if (($1 + $2 | 0) + 1 >>> 0 >= 33) {
              while (1) continue;
             }
             if (($2 | 0) == 31) {
              break label$119;
             }
             $0 = (2 << $2) + -1 & $0 >> $1;
             break label$119;
            case 4:
             if (($1 + $2 | 0) + 1 >>> 0 >= 33) {
              while (1) continue;
             }
             if (($2 | 0) == 31) {
              break label$119;
             }
             $0 = (2 << $2) + -1 & $0 >> $1;
             break label$119;
            case 1:
             break label$120;
            case 5:
             break label$3;
            default:
             break label$119;
            }
           }
           if ($2 >>> 0 < $1 >>> 0) {
            while (1) continue;
           }
           $3 = ($2 - $1 | 0) + 1 | 0;
           if (($3 | 0) == 32) {
            break label$119;
           }
           $3 = -1 << $3;
           $0 = HEAP32[($6 << 2) + 1186144 >> 2] & __wasm_rotl_i32($3, $1) | (($3 ^ -1) & $0) << $1;
          }
          break label$1;
         }
         $2 = $0 << 4 & 1792 | ($2 | $7 << 9 & 2048);
         label$129 : {
          if ($3 & 64) {
           $0 = $2 | $3 << 12 & 61440;
           if (!($3 & 128)) {
            break label$129;
           }
           $0 = HEAPU16[($6 << 2) + 1186144 >> 1] | $0 << 16;
           break label$129;
          }
          if (($1 | 0) == 15) {
           break label$129;
          }
          $1 = HEAP32[($1 << 2) + 1186144 >> 2];
          if ($3 & 128) {
           $0 = $1 - $2 | 0;
           break label$129;
          }
          $0 = $1 + $2 | 0;
         }
         break label$1;
        }
        $1 = HEAP32[($1 << 2) + 1186144 >> 2];
        label$132 : {
         switch ($4 >>> 5 & 15) {
         case 0:
          HEAP32[($6 << 2) + 1186144 >> 2] = $1 & $2;
          return;
         case 1:
          while (1) continue;
         case 2:
          HEAP32[($6 << 2) + 1186144 >> 2] = $1 | $2;
          return;
         case 3:
          while (1) continue;
         case 4:
          while (1) continue;
         case 8:
          HEAP32[($6 << 2) + 1186144 >> 2] = $1 + $2;
          return;
         case 10:
          while (1) continue;
         case 11:
          while (1) continue;
         case 13:
          HEAP32[($6 << 2) + 1186144 >> 2] = $1 - $2;
          return;
         case 14:
          while (1) continue;
         default:
          break label$132;
         }
        }
        while (1) continue;
       case 8:
        break label$6;
       }
      }
      if (($4 & 272) == 256) {
       while (1) continue;
      }
      $0 = HEAP32[($1 << 2) + 1186144 >> 2];
      if ($3 & 128) {
       $1 = $12 & 4095;
      } else {
       label$154 : {
        if (!$6) {
         if (!($2 & 192)) {
          break label$154;
         }
         while (1) continue;
        }
        while (1) continue;
       }
       $1 = HEAP32[($9 << 2) + 1186144 >> 2];
      }
      $2 = $7 << 2 & 4 | $3 >>> 5 & 3;
      $1 = $0 + $1 | 0;
      if ($3 & 16) {
       $0 = ($8 << 2) + 1186144 | 0;
       label$159 : {
        label$160 : {
         switch ($2 | 0) {
         case 4:
          $1 = HEAP8[$1 | 0];
          break label$159;
         case 1:
          $1 = HEAPU16[$1 >> 1];
          break label$159;
         case 5:
          $1 = HEAP16[$1 >> 1];
          break label$159;
         case 2:
          $1 = HEAP32[$1 >> 2];
          break label$159;
         default:
          while (1) continue;
         case 0:
          break label$160;
         }
        }
        $1 = HEAPU8[$1 | 0];
       }
       HEAP32[$0 >> 2] = $1;
       return;
      }
      $0 = HEAP32[($8 << 2) + 1186144 >> 2];
      label$167 : {
       switch ($2 | 0) {
       case 0:
        HEAP8[$1 | 0] = $0;
        return;
       case 1:
        HEAP16[$1 >> 1] = $0;
        return;
       case 2:
        HEAP32[$1 >> 2] = $0;
        return;
       default:
        break label$167;
       }
      }
      while (1) continue;
     }
     HEAP32[($6 << 2) + 1186144 >> 2] = $0 & $1;
    }
    return;
   }
   while (1) continue;
  }
  HEAP32[($8 << 2) + 1187008 >> 2] = $0;
  return;
 }
 HEAP32[($6 << 2) + 1186144 >> 2] = $0;
}
function printf_core($0, $1, $2, $3, $4) {
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0;
 $5 = global$0 - 80 | 0;
 global$0 = $5;
 HEAP32[$5 + 76 >> 2] = $1;
 $19 = $5 + 55 | 0;
 $16 = $5 + 56 | 0;
 $1 = 0;
 label$1 : {
  label$2 : while (1) {
   label$3 : {
    if (($13 | 0) < 0) {
     break label$3;
    }
    if (($1 | 0) > (2147483647 - $13 | 0)) {
     HEAP32[296784] = 61;
     $13 = -1;
     break label$3;
    }
    $13 = $1 + $13 | 0;
   }
   label$5 : {
    label$6 : {
     label$7 : {
      $8 = HEAP32[$5 + 76 >> 2];
      $1 = $8;
      $6 = HEAPU8[$1 | 0];
      if ($6) {
       while (1) {
        label$10 : {
         $6 = $6 & 255;
         label$11 : {
          if (!$6) {
           $6 = $1;
           break label$11;
          }
          if (($6 | 0) != 37) {
           break label$10;
          }
          $6 = $1;
          while (1) {
           if (HEAPU8[$1 + 1 | 0] != 37) {
            break label$11;
           }
           $7 = $1 + 2 | 0;
           HEAP32[$5 + 76 >> 2] = $7;
           $6 = $6 + 1 | 0;
           $9 = HEAPU8[$1 + 2 | 0];
           $1 = $7;
           if (($9 | 0) == 37) {
            continue;
           }
           break;
          }
         }
         $1 = $6 - $8 | 0;
         if ($0) {
          out($0, $8, $1);
         }
         if ($1) {
          continue label$2;
         }
         $6 = $5;
         $1 = HEAP32[$5 + 76 >> 2];
         label$15 : {
          if (!(HEAPU8[$1 + 2 | 0] != 36 | HEAP8[HEAP32[$5 + 76 >> 2] + 1 | 0] + -48 >>> 0 >= 10)) {
           $15 = HEAP8[$1 + 1 | 0] + -48 | 0;
           $17 = 1;
           $1 = $1 + 3 | 0;
           break label$15;
          }
          $15 = -1;
          $1 = $1 + 1 | 0;
         }
         HEAP32[$6 + 76 >> 2] = $1;
         $10 = 0;
         $14 = HEAP8[$1 | 0];
         $7 = $14 + -32 | 0;
         label$17 : {
          if ($7 >>> 0 > 31) {
           $6 = $1;
           break label$17;
          }
          $6 = $1;
          $7 = 1 << $7;
          if (!($7 & 75913)) {
           break label$17;
          }
          while (1) {
           $6 = $1 + 1 | 0;
           HEAP32[$5 + 76 >> 2] = $6;
           $10 = $7 | $10;
           $14 = HEAP8[$1 + 1 | 0];
           $7 = $14 + -32 | 0;
           if ($7 >>> 0 >= 32) {
            break label$17;
           }
           $1 = $6;
           $7 = 1 << $7;
           if ($7 & 75913) {
            continue;
           }
           break;
          }
         }
         label$20 : {
          if (($14 | 0) == 42) {
           $7 = $5;
           label$22 : {
            label$23 : {
             if (HEAP8[$6 + 1 | 0] + -48 >>> 0 >= 10) {
              break label$23;
             }
             $1 = HEAP32[$5 + 76 >> 2];
             if (HEAPU8[$1 + 2 | 0] != 36) {
              break label$23;
             }
             HEAP32[((HEAP8[$1 + 1 | 0] << 2) + $4 | 0) + -192 >> 2] = 10;
             $11 = HEAP32[((HEAP8[$1 + 1 | 0] << 3) + $3 | 0) + -384 >> 2];
             $17 = 1;
             $1 = $1 + 3 | 0;
             break label$22;
            }
            if ($17) {
             break label$7;
            }
            $17 = 0;
            $11 = 0;
            if ($0) {
             $1 = HEAP32[$2 >> 2];
             HEAP32[$2 >> 2] = $1 + 4;
             $11 = HEAP32[$1 >> 2];
            }
            $1 = HEAP32[$5 + 76 >> 2] + 1 | 0;
           }
           HEAP32[$7 + 76 >> 2] = $1;
           if (($11 | 0) > -1) {
            break label$20;
           }
           $11 = 0 - $11 | 0;
           $10 = $10 | 8192;
           break label$20;
          }
          $11 = getint($5 + 76 | 0);
          if (($11 | 0) < 0) {
           break label$7;
          }
          $1 = HEAP32[$5 + 76 >> 2];
         }
         $9 = -1;
         label$25 : {
          if (HEAPU8[$1 | 0] != 46) {
           break label$25;
          }
          if (HEAPU8[$1 + 1 | 0] == 42) {
           label$27 : {
            if (HEAP8[$1 + 2 | 0] + -48 >>> 0 >= 10) {
             break label$27;
            }
            $1 = HEAP32[$5 + 76 >> 2];
            if (HEAPU8[$1 + 3 | 0] != 36) {
             break label$27;
            }
            HEAP32[((HEAP8[$1 + 2 | 0] << 2) + $4 | 0) + -192 >> 2] = 10;
            $9 = HEAP32[((HEAP8[$1 + 2 | 0] << 3) + $3 | 0) + -384 >> 2];
            $1 = $1 + 4 | 0;
            HEAP32[$5 + 76 >> 2] = $1;
            break label$25;
           }
           if ($17) {
            break label$7;
           }
           if ($0) {
            $1 = HEAP32[$2 >> 2];
            HEAP32[$2 >> 2] = $1 + 4;
            $9 = HEAP32[$1 >> 2];
           } else {
            $9 = 0;
           }
           $1 = HEAP32[$5 + 76 >> 2] + 2 | 0;
           HEAP32[$5 + 76 >> 2] = $1;
           break label$25;
          }
          HEAP32[$5 + 76 >> 2] = $1 + 1;
          $9 = getint($5 + 76 | 0);
          $1 = HEAP32[$5 + 76 >> 2];
         }
         $6 = 0;
         while (1) {
          $18 = $6;
          $12 = -1;
          if (HEAP8[$1 | 0] + -65 >>> 0 > 57) {
           break label$1;
          }
          $14 = $1 + 1 | 0;
          HEAP32[$5 + 76 >> 2] = $14;
          $6 = HEAP8[$1 | 0];
          $1 = $14;
          $6 = HEAPU8[($6 + Math_imul($18, 58) | 0) + 2783 | 0];
          if ($6 + -1 >>> 0 < 8) {
           continue;
          }
          break;
         }
         label$31 : {
          label$32 : {
           if (($6 | 0) != 19) {
            if (!$6) {
             break label$1;
            }
            if (($15 | 0) >= 0) {
             HEAP32[($15 << 2) + $4 >> 2] = $6;
             $1 = ($15 << 3) + $3 | 0;
             $6 = HEAP32[$1 + 4 >> 2];
             HEAP32[$5 + 64 >> 2] = HEAP32[$1 >> 2];
             HEAP32[$5 + 68 >> 2] = $6;
             break label$32;
            }
            if (!$0) {
             break label$5;
            }
            pop_arg($5 - -64 | 0, $6, $2);
            $14 = HEAP32[$5 + 76 >> 2];
            break label$31;
           }
           if (($15 | 0) > -1) {
            break label$1;
           }
          }
          $1 = 0;
          if (!$0) {
           continue label$2;
          }
         }
         $7 = $10 & -65537;
         $6 = $10 & 8192 ? $7 : $10;
         $12 = 0;
         $15 = 2816;
         $10 = $16;
         label$35 : {
          label$36 : {
           label$37 : {
            label$38 : {
             label$39 : {
              label$40 : {
               label$41 : {
                label$42 : {
                 label$43 : {
                  label$44 : {
                   label$45 : {
                    label$46 : {
                     label$47 : {
                      label$48 : {
                       label$49 : {
                        label$50 : {
                         $1 = HEAP8[$14 + -1 | 0];
                         $1 = $18 ? ($1 & 15) == 3 ? $1 & -33 : $1 : $1;
                         switch ($1 + -88 | 0) {
                         case 11:
                          break label$35;
                         case 9:
                         case 13:
                         case 14:
                         case 15:
                          break label$36;
                         case 27:
                          break label$41;
                         case 12:
                         case 17:
                          break label$44;
                         case 23:
                          break label$45;
                         case 0:
                         case 32:
                          break label$46;
                         case 24:
                          break label$47;
                         case 22:
                          break label$48;
                         case 29:
                          break label$49;
                         case 1:
                         case 2:
                         case 3:
                         case 4:
                         case 5:
                         case 6:
                         case 7:
                         case 8:
                         case 10:
                         case 16:
                         case 18:
                         case 19:
                         case 20:
                         case 21:
                         case 25:
                         case 26:
                         case 28:
                         case 30:
                         case 31:
                          break label$6;
                         default:
                          break label$50;
                         }
                        }
                        label$51 : {
                         switch ($1 + -65 | 0) {
                         case 0:
                         case 4:
                         case 5:
                         case 6:
                          break label$36;
                         case 2:
                          break label$39;
                         case 1:
                         case 3:
                          break label$6;
                         default:
                          break label$51;
                         }
                        }
                        if (($1 | 0) == 83) {
                         break label$40;
                        }
                        break label$6;
                       }
                       $1 = HEAP32[$5 + 64 >> 2];
                       $8 = HEAP32[$5 + 68 >> 2];
                       $15 = 2816;
                       break label$43;
                      }
                      $1 = 0;
                      label$52 : {
                       switch ($18 & 255) {
                       case 0:
                        HEAP32[HEAP32[$5 + 64 >> 2] >> 2] = $13;
                        continue label$2;
                       case 1:
                        HEAP32[HEAP32[$5 + 64 >> 2] >> 2] = $13;
                        continue label$2;
                       case 2:
                        $6 = HEAP32[$5 + 64 >> 2];
                        HEAP32[$6 >> 2] = $13;
                        HEAP32[$6 + 4 >> 2] = $13 >> 31;
                        continue label$2;
                       case 3:
                        HEAP16[HEAP32[$5 + 64 >> 2] >> 1] = $13;
                        continue label$2;
                       case 4:
                        HEAP8[HEAP32[$5 + 64 >> 2]] = $13;
                        continue label$2;
                       case 6:
                        HEAP32[HEAP32[$5 + 64 >> 2] >> 2] = $13;
                        continue label$2;
                       case 7:
                        break label$52;
                       default:
                        continue label$2;
                       }
                      }
                      $6 = HEAP32[$5 + 64 >> 2];
                      HEAP32[$6 >> 2] = $13;
                      HEAP32[$6 + 4 >> 2] = $13 >> 31;
                      continue label$2;
                     }
                     $9 = $9 >>> 0 > 8 ? $9 : 8;
                     $6 = $6 | 8;
                     $1 = 120;
                    }
                    $8 = fmt_x(HEAP32[$5 + 64 >> 2], HEAP32[$5 + 68 >> 2], $16, $1 & 32);
                    if (!($6 & 8) | !(HEAP32[$5 + 64 >> 2] | HEAP32[$5 + 68 >> 2])) {
                     break label$42;
                    }
                    $15 = ($1 >>> 4 | 0) + 2816 | 0;
                    $12 = 2;
                    break label$42;
                   }
                   $8 = fmt_o(HEAP32[$5 + 64 >> 2], HEAP32[$5 + 68 >> 2], $16);
                   if (!($6 & 8)) {
                    break label$42;
                   }
                   $1 = $16 - $8 | 0;
                   $9 = ($9 | 0) > ($1 | 0) ? $9 : $1 + 1 | 0;
                   break label$42;
                  }
                  $7 = HEAP32[$5 + 68 >> 2];
                  $8 = $7;
                  $1 = HEAP32[$5 + 64 >> 2];
                  if (($7 | 0) < -1 ? 1 : ($7 | 0) <= -1) {
                   $8 = 0 - ($8 + (0 < $1 >>> 0) | 0) | 0;
                   $1 = 0 - $1 | 0;
                   HEAP32[$5 + 64 >> 2] = $1;
                   HEAP32[$5 + 68 >> 2] = $8;
                   $12 = 1;
                   $15 = 2816;
                   break label$43;
                  }
                  if ($6 & 2048) {
                   $12 = 1;
                   $15 = 2817;
                   break label$43;
                  }
                  $12 = $6 & 1;
                  $15 = $12 ? 2818 : 2816;
                 }
                 $8 = fmt_u($1, $8, $16);
                }
                $6 = ($9 | 0) > -1 ? $6 & -65537 : $6;
                $1 = HEAP32[$5 + 64 >> 2];
                $7 = HEAP32[$5 + 68 >> 2];
                if (!(!!($1 | $7) | $9)) {
                 $9 = 0;
                 $8 = $16;
                 break label$6;
                }
                $1 = !($1 | $7) + ($16 - $8 | 0) | 0;
                $9 = ($9 | 0) > ($1 | 0) ? $9 : $1;
                break label$6;
               }
               $1 = HEAP32[$5 + 64 >> 2];
               $8 = $1 ? $1 : 2826;
               $1 = memchr($8, $9);
               $10 = $1 ? $1 : $9 + $8 | 0;
               $6 = $7;
               $9 = $1 ? $1 - $8 | 0 : $9;
               break label$6;
              }
              $7 = HEAP32[$5 + 64 >> 2];
              if ($9) {
               break label$38;
              }
              $1 = 0;
              pad($0, 32, $11, 0, $6);
              break label$37;
             }
             HEAP32[$5 + 12 >> 2] = 0;
             HEAP32[$5 + 8 >> 2] = HEAP32[$5 + 64 >> 2];
             HEAP32[$5 + 64 >> 2] = $5 + 8;
             $9 = -1;
             $7 = $5 + 8 | 0;
            }
            $1 = 0;
            label$63 : {
             while (1) {
              $8 = HEAP32[$7 >> 2];
              if (!$8) {
               break label$63;
              }
              $8 = wctomb($5 + 4 | 0, $8);
              $10 = ($8 | 0) < 0;
              if (!($10 | $8 >>> 0 > $9 - $1 >>> 0)) {
               $7 = $7 + 4 | 0;
               $1 = $1 + $8 | 0;
               if ($9 >>> 0 > $1 >>> 0) {
                continue;
               }
               break label$63;
              }
              break;
             }
             $12 = -1;
             if ($10) {
              break label$1;
             }
            }
            pad($0, 32, $11, $1, $6);
            if (!$1) {
             $1 = 0;
             break label$37;
            }
            $14 = 0;
            $7 = HEAP32[$5 + 64 >> 2];
            while (1) {
             $8 = HEAP32[$7 >> 2];
             if (!$8) {
              break label$37;
             }
             $8 = wctomb($5 + 4 | 0, $8);
             $14 = $8 + $14 | 0;
             if (($14 | 0) > ($1 | 0)) {
              break label$37;
             }
             out($0, $5 + 4 | 0, $8);
             $7 = $7 + 4 | 0;
             if ($14 >>> 0 < $1 >>> 0) {
              continue;
             }
             break;
            }
           }
           pad($0, 32, $11, $1, $6 ^ 8192);
           $1 = ($11 | 0) > ($1 | 0) ? $11 : $1;
           continue label$2;
          }
          $1 = FUNCTION_TABLE[0]($0, HEAPF64[$5 + 64 >> 3], $11, $9, $6, $1) | 0;
          continue label$2;
         }
         HEAP8[$5 + 55 | 0] = HEAP32[$5 + 64 >> 2];
         $9 = 1;
         $8 = $19;
         $6 = $7;
         break label$6;
        }
        $7 = $1 + 1 | 0;
        HEAP32[$5 + 76 >> 2] = $7;
        $6 = HEAPU8[$1 + 1 | 0];
        $1 = $7;
        continue;
       }
      }
      $12 = $13;
      if ($0) {
       break label$1;
      }
      if (!$17) {
       break label$5;
      }
      $1 = 1;
      while (1) {
       $0 = HEAP32[($1 << 2) + $4 >> 2];
       if ($0) {
        pop_arg(($1 << 3) + $3 | 0, $0, $2);
        $12 = 1;
        $1 = $1 + 1 | 0;
        if (($1 | 0) != 10) {
         continue;
        }
        break label$1;
       }
       break;
      }
      $12 = 1;
      if ($1 >>> 0 >= 10) {
       break label$1;
      }
      while (1) {
       if (HEAP32[($1 << 2) + $4 >> 2]) {
        break label$7;
       }
       $1 = $1 + 1 | 0;
       if (($1 | 0) != 10) {
        continue;
       }
       break;
      }
      break label$1;
     }
     $12 = -1;
     break label$1;
    }
    $10 = $10 - $8 | 0;
    $9 = ($9 | 0) < ($10 | 0) ? $10 : $9;
    $7 = $9 + $12 | 0;
    $1 = ($11 | 0) < ($7 | 0) ? $7 : $11;
    pad($0, 32, $1, $7, $6);
    out($0, $15, $12);
    pad($0, 48, $1, $7, $6 ^ 65536);
    pad($0, 48, $9, $10, 0);
    out($0, $8, $10);
    pad($0, 32, $1, $7, $6 ^ 8192);
    continue;
   }
   break;
  }
  $12 = 0;
 }
 global$0 = $5 + 80 | 0;
 return $12;
}
function disas_thumb_insn() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0;
 $1 = HEAP32[296551];
 $2 = $1 & -2;
 $3 = HEAPU8[$2 | 0];
 $5 = HEAPU8[$2 + 1 | 0];
 $0 = $1 + 2 | 0;
 HEAP32[296551] = $0;
 if (HEAP32[296621] == 1) {
  $0 = $1 + 4 | 0;
  HEAP32[296551] = $0;
  HEAP32[296621] = 0;
 }
 $8 = $3 | $5 << 8;
 label$2 : {
  label$3 : {
   label$4 : {
    label$5 : {
     label$6 : {
      switch ($5 >>> 4 | 0) {
      case 0:
      case 1:
       $0 = $3 & 7;
       $2 = $3 >>> 3 & 7;
       $1 = $5 >>> 3 & 3;
       if (($1 | 0) == 3) {
        $1 = $8 >>> 6 & 7;
        $2 = HEAP32[($2 << 2) + 1186144 >> 2];
        $1 = $5 & 4 ? $1 : HEAP32[($1 << 2) + 1186144 >> 2];
        if ($5 & 2) {
         HEAP32[($0 << 2) + 1186144 >> 2] = $2 - $1;
         break label$4;
        }
        HEAP32[($0 << 2) + 1186144 >> 2] = $1 + $2;
        break label$4;
       }
       $9 = ($0 << 2) + 1186144 | 0;
       $0 = HEAP32[($2 << 2) + 1186144 >> 2];
       $2 = $8 >>> 6 & 31;
       HEAP32[$9 >> 2] = ($1 | 0) == 1 ? $0 >> $2 : $0 << $2;
       break label$4;
      case 2:
      case 3:
       $1 = (($5 & 7) << 2) + 1186144 | 0;
       $2 = $5 >>> 3 & 3;
       if (!$2) {
        HEAP32[$1 >> 2] = $3;
        break label$4;
       }
       $0 = HEAP32[$1 >> 2];
       label$20 : {
        switch ($2 + -1 | 0) {
        case 0:
         HEAP32[296620] = 0;
         $2 = $0 - $3 | 0;
         if (($2 | 0) <= -1) {
          HEAP32[296620] = 19;
          break label$4;
         }
         if (!$2) {
          HEAP32[296620] = 42;
          break label$4;
         }
         HEAP32[296620] = 28;
         break label$4;
        case 1:
         HEAP32[$1 >> 2] = $0 + $3;
         break label$4;
        case 2:
         break label$20;
        default:
         break label$4;
        }
       }
       HEAP32[$1 >> 2] = $0 - $3;
       break label$4;
      case 4:
       if ($5 & 8) {
        HEAP32[(($5 & 7) << 2) + 1186144 >> 2] = HEAP32[(($3 << 2 | 2) + $0 & -4) >> 2];
        break label$4;
       }
       $4 = $3 & 7;
       if ($5 & 4) {
        $7 = $3 >>> 3 & 15;
        $6 = $4 | $3 >>> 4 & 8;
        label$27 : {
         switch (($5 & 3) - 1 | 0) {
         default:
          $2 = ($6 << 2) + 1186144 | 0;
          HEAP32[$2 >> 2] = HEAP32[($7 << 2) + 1186144 >> 2] + HEAP32[$2 >> 2];
          break label$4;
         case 0:
          $0 = HEAP32[($7 << 2) + 1186144 >> 2];
          $2 = HEAP32[($6 << 2) + 1186144 >> 2];
          HEAP32[296620] = 0;
          $1 = $2 - $0 | 0;
          if (($1 | 0) <= -1) {
           HEAP32[296620] = 19;
           return 0;
          }
          break label$2;
         case 1:
          $2 = ($7 | 0) == 15 ? $0 + 2 | 0 : HEAP32[($7 << 2) + 1186144 >> 2];
          HEAP32[($6 << 2) + 1186144 >> 2] = $2;
          if (($6 | 0) != 15) {
           break label$4;
          }
          $1 = -1;
          if (($2 | 0) != -1) {
           break label$4;
          }
          break label$3;
         case 2:
          break label$27;
         }
        }
        $1 = HEAP32[($7 << 2) + 1186144 >> 2];
        if ($3 & 128) {
         HEAP32[296550] = $0 | 1;
        }
        if ($1 >>> 0 <= 4294967039) {
         HEAP32[296551] = $1;
         break label$4;
        }
        $2 = $1 << 2 & 1020;
        $0 = HEAP32[$2 + 1888 >> 2];
        HEAP32[296532] = $0;
        label$36 : {
         label$37 : {
          switch (HEAP32[$2 + 2144 >> 2]) {
          case 0:
           $1 = FUNCTION_TABLE[$0 | 0]() | 0;
           break label$36;
          case 1:
           $1 = FUNCTION_TABLE[$0 | 0](HEAP32[296536]) | 0;
           break label$36;
          case 2:
           $1 = FUNCTION_TABLE[$0 | 0](HEAP32[296536], HEAP32[296537]) | 0;
           break label$36;
          case 3:
           $1 = FUNCTION_TABLE[$0 | 0](HEAP32[296536], HEAP32[296537], HEAP32[296538]) | 0;
           break label$36;
          case 4:
           break label$37;
          default:
           break label$36;
          }
         }
         $1 = FUNCTION_TABLE[$0 | 0](HEAP32[296536], HEAP32[296537], HEAP32[296538], HEAP32[296539]) | 0;
        }
        HEAP32[296536] = $1;
        $1 = -1;
        if (HEAP32[296551] != -1) {
         break label$4;
        }
        break label$3;
       }
       $1 = $3 >>> 3 & 7;
       $7 = $8 >>> 6 & 15;
       $6 = $8 & 896;
       $0 = ($7 | 0) == 7 | (($6 | 0) == 128 | ($7 | 0) == 4);
       $2 = $0 ? $1 : $4;
       $1 = $0 ? $4 : $1;
       $4 = 0;
       label$42 : {
        switch ($7 + -9 | 0) {
        default:
         $4 = HEAP32[($2 << 2) + 1186144 >> 2];
         break;
        case 0:
        case 6:
         break label$42;
        }
       }
       $0 = HEAP32[($1 << 2) + 1186144 >> 2];
       label$44 : {
        label$45 : {
         label$46 : {
          label$47 : {
           label$48 : {
            switch ($7 | 0) {
            case 1:
             $4 = $0 ^ $4;
             break label$47;
            case 2:
             $0 = $0 << $4;
             break label$47;
            case 3:
             $0 = $0 >> $4;
             break label$47;
            case 9:
             $4 = 0 - $0 | 0;
             break label$47;
            case 10:
             HEAP32[296620] = 0;
             $1 = $4 - $0 | 0;
             if (($1 | 0) <= -1) {
              HEAP32[296620] = 19;
              return 0;
             }
             break label$2;
            case 12:
             $4 = $0 | $4;
             break label$47;
            case 13:
             $4 = Math_imul($0, $4);
             break label$47;
            case 14:
             $4 = ($0 ^ -1) & $4;
             break label$47;
            case 15:
             break label$46;
            case 0:
             break label$48;
            default:
             break label$47;
            }
           }
           $4 = $0 & $4;
          }
          if (($6 | 0) == 128) {
           break label$45;
          }
          switch ($7 + -4 | 0) {
          case 0:
          case 3:
           break label$45;
          default:
           break label$44;
          }
         }
         $0 = $0 ^ -1;
         $1 = $2;
        }
        HEAP32[($1 << 2) + 1186144 >> 2] = $0;
        break label$4;
       }
       HEAP32[($2 << 2) + 1186144 >> 2] = $4;
       break label$4;
      case 5:
       $6 = HEAP32[($3 >>> 1 & 28) + 1186144 >> 2];
       $2 = HEAP32[($8 >>> 4 & 28) + 1186144 >> 2];
       $4 = $3 & 7;
       $0 = 0;
       $1 = $5 >>> 1 & 7;
       if ($1 >>> 0 <= 2) {
        $0 = HEAP32[($4 << 2) + 1186144 >> 2];
       }
       $6 = $2 + $6 | 0;
       $2 = ($4 << 2) + 1186144 | 0;
       label$59 : {
        label$60 : {
         switch ($1 - 1 | 0) {
         default:
          HEAP32[$6 >> 2] = $0;
          break label$4;
         case 0:
          HEAP16[$6 >> 1] = $0;
          break label$4;
         case 1:
          HEAP8[$6 | 0] = $0;
          break label$4;
         case 2:
          $0 = HEAP8[$6 | 0];
          break label$59;
         case 3:
          $0 = HEAP32[$6 >> 2];
          break label$59;
         case 4:
          $0 = HEAPU16[$6 >> 1];
          break label$59;
         case 5:
          $0 = HEAPU8[$6 | 0];
          break label$59;
         case 6:
          break label$60;
         }
        }
        $0 = HEAP16[$6 >> 1];
       }
       HEAP32[$2 >> 2] = $0;
       break label$4;
      case 6:
       $0 = HEAP32[($3 >>> 1 & 28) + 1186144 >> 2] + ($8 >>> 4 & 124) | 0;
       $2 = $3 & 7;
       if ($5 & 8) {
        HEAP32[($2 << 2) + 1186144 >> 2] = HEAP32[$0 >> 2];
        break label$4;
       }
       HEAP32[$0 >> 2] = HEAP32[($2 << 2) + 1186144 >> 2];
       break label$4;
      case 7:
       $0 = HEAP32[($3 >>> 1 & 28) + 1186144 >> 2] + ($8 >>> 6 & 31) | 0;
       $2 = $3 & 7;
       if ($5 & 8) {
        HEAP32[($2 << 2) + 1186144 >> 2] = HEAPU8[$0 | 0];
        break label$4;
       }
       HEAP8[$0 | 0] = HEAP32[($2 << 2) + 1186144 >> 2];
       break label$4;
      case 8:
       $0 = HEAP32[($3 >>> 1 & 28) + 1186144 >> 2] + ($8 >>> 5 & 62) | 0;
       $2 = $3 & 7;
       if ($5 & 8) {
        HEAP32[($2 << 2) + 1186144 >> 2] = HEAPU16[$0 >> 1];
        break label$4;
       }
       HEAP16[$0 >> 1] = HEAP32[($2 << 2) + 1186144 >> 2];
       break label$4;
      case 11:
       label$71 : {
        switch ($5 & 15) {
        case 2:
         $0 = HEAP32[($3 >>> 1 & 28) + 1186144 >> 2];
         $2 = (($3 & 7) << 2) + 1186144 | 0;
         label$76 : {
          label$77 : {
           switch (($3 >>> 6 | 0) - 1 | 0) {
           default:
            $0 = $0 & 32768 ? $0 | -65536 : $0;
            break label$76;
           case 0:
            $0 = $0 & 128 ? $0 | -256 : $0;
            break label$76;
           case 1:
            $0 = $0 & 65535;
            break label$76;
           case 2:
            break label$77;
           }
          }
          $0 = $0 & 255;
         }
         HEAP32[$2 >> 2] = $0;
         break label$4;
        case 4:
        case 5:
        case 12:
        case 13:
         $10 = $5 & 1;
         $2 = $10 << 2;
         $11 = $3 & 1;
         $2 = $11 ? $2 + 4 | 0 : $2;
         $12 = $3 & 2;
         $2 = $12 ? $2 + 4 | 0 : $2;
         $13 = $3 & 4;
         $2 = $13 ? $2 + 4 | 0 : $2;
         $14 = $3 & 8;
         $2 = $14 ? $2 + 4 | 0 : $2;
         $9 = $3 & 16;
         $2 = $9 ? $2 + 4 | 0 : $2;
         $8 = $3 & 32;
         $2 = $8 ? $2 + 4 | 0 : $2;
         $7 = $3 & 64;
         $1 = $7 ? $2 + 4 | 0 : $2;
         $2 = $3 & 128;
         $4 = $5 & 8;
         $6 = $4 ? 0 : $2 ? $1 + 4 | 0 : $1;
         $0 = HEAP32[296549] - $6 | 0;
         label$81 : {
          label$82 : {
           label$83 : {
            label$84 : {
             label$85 : {
              if ($4) {
               if ($11) {
                break label$85;
               }
               break label$84;
              }
              if ($11) {
               $1 = HEAP32[296536];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($12) {
               $1 = HEAP32[296537];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($13) {
               $1 = HEAP32[296538];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($14) {
               $1 = HEAP32[296539];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($9) {
               $1 = HEAP32[296540];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($8) {
               $1 = HEAP32[296541];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($7) {
               $1 = HEAP32[296542];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              if ($2) {
               $1 = HEAP32[296543];
               HEAP32[$0 >> 2] = $1;
               $0 = $0 + 4 | 0;
              }
              $2 = $0;
              if (!$10) {
               break label$81;
              }
              if ($4) {
               break label$83;
              }
              HEAP32[$0 >> 2] = HEAP32[296550];
              break label$82;
             }
             $1 = HEAP32[$0 >> 2];
             HEAP32[296536] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($12) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296537] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($13) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296538] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($14) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296539] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($9) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296540] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($8) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296541] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($7) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296542] = $1;
             $0 = $0 + 4 | 0;
            }
            if ($2) {
             $1 = HEAP32[$0 >> 2];
             HEAP32[296543] = $1;
             $0 = $0 + 4 | 0;
            }
            $2 = $0;
            if (!$10) {
             break label$81;
            }
           }
           $1 = HEAP32[$0 >> 2];
          }
          $2 = $0 + 4 | 0;
         }
         HEAP32[296549] = $2 - $6;
         if (($5 & 9) != 9) {
          break label$4;
         }
         HEAP32[296551] = $1;
         break label$4;
        case 1:
        case 3:
        case 9:
        case 11:
         $1 = HEAP32[(($3 & 7) << 2) + 1186144 >> 2] & 1;
         $2 = $5 & 8;
         if ($1 & $2 >>> 3 ? 0 : $1 | $2) {
          break label$4;
         }
         HEAP32[296551] = (($5 << 5 & 64 | $3 >>> 2 & 62) + $0 | 0) + 2;
         break label$4;
        case 15:
         if (!($3 & 15)) {
          break label$4;
         }
         label$102 : {
          switch ($3 >>> 4 | 0) {
          case 13:
           if (HEAPU8[1186480] & 4) {
            HEAP32[296551] = $0 + 2;
            break label$4;
           }
           HEAP32[296621] = 1;
           break label$4;
          case 11:
           if (HEAPU8[1186480] & 8) {
            HEAP32[296551] = $0 + 2;
            break label$4;
           }
           HEAP32[296621] = 1;
           break label$4;
          case 10:
           if (HEAP8[1186480] & 1) {
            HEAP32[296551] = $0 + 2;
            break label$4;
           }
           HEAP32[296621] = 1;
           break label$4;
          case 12:
           if (HEAPU8[1186480] & 2) {
            HEAP32[296551] = $0 + 2;
            break label$4;
           }
           HEAP32[296621] = 1;
           break label$4;
          case 1:
           if (HEAPU8[1186480] & 32) {
            HEAP32[296551] = $0 + 2;
            break label$4;
           }
           HEAP32[296621] = 1;
           break label$4;
          case 0:
           break label$102;
          default:
           break label$4;
          }
         }
         if (HEAPU8[1186480] & 16) {
          HEAP32[296551] = $0 + 2;
          break label$4;
         }
         HEAP32[296621] = 1;
         break label$4;
        case 0:
        case 6:
        case 10:
        case 14:
         break label$4;
        default:
         break label$71;
        }
       }
       while (1) continue;
      case 13:
       label$115 : {
        label$116 : {
         switch ($5 & 15) {
         case 11:
          if (HEAP8[1186480] & 1) {
           break label$115;
          }
          break label$4;
         case 13:
          if (HEAPU8[1186480] & 2) {
           break label$115;
          }
          break label$4;
         case 12:
          if (HEAPU8[1186480] & 4) {
           break label$115;
          }
          break label$4;
         case 10:
          if (HEAPU8[1186480] & 8) {
           break label$115;
          }
          break label$4;
         case 1:
          if (HEAPU8[1186480] & 16) {
           break label$115;
          }
          break label$4;
         case 0:
          break label$116;
         default:
          break label$4;
         }
        }
        if (!(HEAPU8[1186480] & 32)) {
         break label$4;
        }
       }
       HEAP32[296551] = (($3 << 24 >> 23) + $0 | 0) + 2;
       break label$4;
      case 15:
       break label$5;
      case 14:
       break label$6;
      default:
       break label$4;
      }
     }
     if ($5 & 8) {
      break label$5;
     }
     HEAP32[296551] = (($8 << 21 >> 20) + $0 | 0) + 2;
     break label$4;
    }
    disas_thumb2_insn();
   }
   $1 = 0;
  }
  return $1 | 0;
 }
 if (!$1) {
  HEAP32[296620] = 42;
  return 0;
 }
 HEAP32[296620] = 28;
 return 0;
}
function __intscan($0, $1) {
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0;
 $9 = -2147483648;
 $10 = global$0 - 16 | 0;
 global$0 = $10;
 label$1 : {
  label$2 : {
   label$3 : {
    label$4 : {
     label$5 : {
      if ($1 >>> 0 <= 36) {
       while (1) {
        $2 = HEAP32[$0 + 4 >> 2];
        label$8 : {
         if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
          HEAP32[$0 + 4 >> 2] = $2 + 1;
          $2 = HEAPU8[$2 | 0];
          break label$8;
         }
         $2 = __shgetc($0);
        }
        if (($2 | 0) == 32 | $2 + -9 >>> 0 < 5) {
         continue;
        }
        break;
       }
       label$10 : {
        label$11 : {
         switch ($2 + -43 | 0) {
         case 0:
         case 2:
          break label$11;
         default:
          break label$10;
         }
        }
        $11 = ($2 | 0) == 45 ? -1 : 0;
        $2 = HEAP32[$0 + 4 >> 2];
        if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
         HEAP32[$0 + 4 >> 2] = $2 + 1;
         $2 = HEAPU8[$2 | 0];
         break label$10;
        }
        $2 = __shgetc($0);
       }
       label$13 : {
        if (!($1 & -17 | ($2 | 0) != 48)) {
         $2 = HEAP32[$0 + 4 >> 2];
         label$15 : {
          if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
           HEAP32[$0 + 4 >> 2] = $2 + 1;
           $2 = HEAPU8[$2 | 0];
           break label$15;
          }
          $2 = __shgetc($0);
         }
         if (($2 & -33) == 88) {
          $1 = HEAP32[$0 + 4 >> 2];
          label$18 : {
           if ($1 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
            HEAP32[$0 + 4 >> 2] = $1 + 1;
            $2 = HEAPU8[$1 | 0];
            break label$18;
           }
           $2 = __shgetc($0);
          }
          $1 = 16;
          if (HEAPU8[$2 + 2545 | 0] < 16) {
           break label$4;
          }
          if (!HEAP32[$0 + 104 >> 2]) {
           $9 = 0;
           break label$1;
          }
          $1 = HEAP32[$0 + 4 >> 2];
          HEAP32[$0 + 4 >> 2] = $1 + -1;
          HEAP32[$0 + 4 >> 2] = $1 + -2;
          $9 = 0;
          break label$1;
         }
         if ($1) {
          break label$13;
         }
         $1 = 8;
         break label$4;
        }
        $1 = $1 ? $1 : 10;
        if ($1 >>> 0 > HEAPU8[$2 + 2545 | 0]) {
         break label$13;
        }
        if (HEAP32[$0 + 104 >> 2]) {
         HEAP32[$0 + 4 >> 2] = HEAP32[$0 + 4 >> 2] + -1;
        }
        $9 = 0;
        HEAP32[$0 + 112 >> 2] = 0;
        HEAP32[$0 + 116 >> 2] = 0;
        $1 = HEAP32[$0 + 8 >> 2];
        $2 = $1 - HEAP32[$0 + 4 >> 2] | 0;
        HEAP32[$0 + 120 >> 2] = $2;
        HEAP32[$0 + 124 >> 2] = $2 >> 31;
        HEAP32[$0 + 104 >> 2] = $1;
        HEAP32[296784] = 28;
        break label$1;
       }
       if (($1 | 0) != 10) {
        break label$4;
       }
       $3 = $2 + -48 | 0;
       if ($3 >>> 0 <= 9) {
        $1 = 0;
        while (1) {
         $5 = Math_imul($1, 10);
         $1 = HEAP32[$0 + 4 >> 2];
         label$24 : {
          if ($1 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
           HEAP32[$0 + 4 >> 2] = $1 + 1;
           $2 = HEAPU8[$1 | 0];
           break label$24;
          }
          $2 = __shgetc($0);
         }
         $1 = $5 + $3 | 0;
         $3 = $2 + -48 | 0;
         if ($1 >>> 0 < 429496729 ? $3 >>> 0 <= 9 : 0) {
          continue;
         }
         break;
        }
        $4 = $1;
        $5 = 0;
       }
       if ($3 >>> 0 > 9) {
        break label$5;
       }
       $7 = __wasm_i64_mul($4, 0, 10);
       $6 = i64toi32_i32$HIGH_BITS;
       $1 = $3;
       while (1) {
        $2 = HEAP32[$0 + 4 >> 2];
        label$27 : {
         if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
          HEAP32[$0 + 4 >> 2] = $2 + 1;
          $2 = HEAPU8[$2 | 0];
          break label$27;
         }
         $2 = __shgetc($0);
        }
        $5 = $6;
        $4 = $1 + $7 | 0;
        if ($4 >>> 0 < $1 >>> 0) {
         $5 = $5 + 1 | 0;
        }
        $3 = $2 + -48 | 0;
        if (($5 | 0) == 429496729 & $4 >>> 0 >= 2576980378 | $5 >>> 0 > 429496729 | $3 >>> 0 > 9) {
         break label$5;
        }
        $7 = __wasm_i64_mul($4, $5, 10);
        $6 = i64toi32_i32$HIGH_BITS;
        $1 = $3;
        if (($6 | 0) == -1 & $7 >>> 0 <= ($1 ^ -1) >>> 0 | ($6 | 0) != -1) {
         continue;
        }
        break;
       }
       $1 = 10;
       break label$3;
      }
      HEAP32[296784] = 28;
      $9 = 0;
      break label$1;
     }
     $1 = 10;
     if ($3 >>> 0 <= 9) {
      break label$3;
     }
     break label$2;
    }
    if ($1 + -1 & $1) {
     $3 = HEAPU8[$2 + 2545 | 0];
     if ($1 >>> 0 > $3 >>> 0) {
      while (1) {
       $6 = Math_imul($1, $6) + $3 | 0;
       $7 = $6 >>> 0 <= 119304646;
       $4 = $1;
       $2 = HEAP32[$0 + 4 >> 2];
       label$32 : {
        if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
         HEAP32[$0 + 4 >> 2] = $2 + 1;
         $2 = HEAPU8[$2 | 0];
         break label$32;
        }
        $2 = __shgetc($0);
       }
       $3 = HEAPU8[$2 + 2545 | 0];
       if ($4 >>> 0 > $3 >>> 0 ? $7 : 0) {
        continue;
       }
       break;
      }
      $4 = $6;
     }
     if ($1 >>> 0 <= $3 >>> 0) {
      break label$3;
     }
     $6 = $1;
     while (1) {
      $8 = __wasm_i64_mul($4, $5, $6);
      $7 = i64toi32_i32$HIGH_BITS;
      $3 = $3 & 255;
      if (($7 | 0) == -1 & $8 >>> 0 > ($3 ^ -1) >>> 0) {
       break label$3;
      }
      $2 = HEAP32[$0 + 4 >> 2];
      label$35 : {
       if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
        HEAP32[$0 + 4 >> 2] = $2 + 1;
        $2 = HEAPU8[$2 | 0];
        break label$35;
       }
       $2 = __shgetc($0);
      }
      $5 = $7;
      $4 = $3 + $8 | 0;
      if ($4 >>> 0 < $3 >>> 0) {
       $5 = $5 + 1 | 0;
      }
      $3 = HEAPU8[$2 + 2545 | 0];
      if ($1 >>> 0 <= $3 >>> 0) {
       break label$3;
      }
      __multi3($10, $6, $4, $5);
      if (!(HEAP32[$10 + 8 >> 2] | HEAP32[$10 + 12 >> 2])) {
       continue;
      }
      break;
     }
     break label$3;
    }
    $7 = HEAP8[(Math_imul($1, 23) >>> 5 & 7) + 2801 | 0];
    $3 = HEAPU8[$2 + 2545 | 0];
    if ($1 >>> 0 > $3 >>> 0) {
     while (1) {
      $6 = $6 << $7 | $3;
      $8 = $6 >>> 0 <= 134217727;
      $4 = $1;
      $2 = HEAP32[$0 + 4 >> 2];
      label$39 : {
       if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
        HEAP32[$0 + 4 >> 2] = $2 + 1;
        $2 = HEAPU8[$2 | 0];
        break label$39;
       }
       $2 = __shgetc($0);
      }
      $3 = HEAPU8[$2 + 2545 | 0];
      if ($4 >>> 0 > $3 >>> 0 ? $8 : 0) {
       continue;
      }
      break;
     }
     $4 = $6;
    }
    $6 = $7;
    $8 = $6 & 31;
    if (32 <= ($6 & 63) >>> 0) {
     $7 = 0;
     $8 = -1 >>> $8 | 0;
    } else {
     $7 = -1 >>> $8 | 0;
     $8 = (1 << $8) - 1 << 32 - $8 | -1 >>> $8;
    }
    if (!$7 & $8 >>> 0 < $4 >>> 0 | $7 >>> 0 < 0 | $1 >>> 0 <= $3 >>> 0) {
     break label$3;
    }
    while (1) {
     $12 = $3 & 255;
     $3 = $4;
     $2 = $6;
     $4 = $2 & 31;
     if (32 <= ($2 & 63) >>> 0) {
      $5 = $3 << $4;
      $2 = 0;
     } else {
      $5 = (1 << $4) - 1 & $3 >>> 32 - $4 | $5 << $4;
      $2 = $3 << $4;
     }
     $4 = $12 | $2;
     $2 = HEAP32[$0 + 4 >> 2];
     label$42 : {
      if ($2 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
       HEAP32[$0 + 4 >> 2] = $2 + 1;
       $2 = HEAPU8[$2 | 0];
       break label$42;
      }
      $2 = __shgetc($0);
     }
     if (($5 | 0) == ($7 | 0) & $4 >>> 0 > $8 >>> 0 | $5 >>> 0 > $7 >>> 0) {
      break label$3;
     }
     $3 = HEAPU8[$2 + 2545 | 0];
     if ($1 >>> 0 > $3 >>> 0) {
      continue;
     }
     break;
    }
   }
   if ($1 >>> 0 <= HEAPU8[$2 + 2545 | 0]) {
    break label$2;
   }
   while (1) {
    $2 = $1;
    $5 = HEAP32[$0 + 4 >> 2];
    label$45 : {
     if ($5 >>> 0 < HEAPU32[$0 + 104 >> 2]) {
      HEAP32[$0 + 4 >> 2] = $5 + 1;
      $6 = HEAPU8[$5 | 0];
      break label$45;
     }
     $6 = __shgetc($0);
    }
    if ($2 >>> 0 > HEAPU8[$6 + 2545 | 0]) {
     continue;
    }
    break;
   }
   HEAP32[296784] = 68;
   $4 = -2147483648;
   $5 = 0;
  }
  if (HEAP32[$0 + 104 >> 2]) {
   HEAP32[$0 + 4 >> 2] = HEAP32[$0 + 4 >> 2] + -1;
  }
  label$48 : {
   if (!$5 & $4 >>> 0 < 2147483648 | $5 >>> 0 < 0) {
    break label$48;
   }
   if (!$11) {
    HEAP32[296784] = 68;
    $9 = 2147483647;
    break label$1;
   }
   if (!$5 & $4 >>> 0 <= 2147483648 | $5 >>> 0 < 0) {
    break label$48;
   }
   HEAP32[296784] = 68;
   break label$1;
  }
  $0 = $11;
  $1 = $0 ^ $4;
  $9 = $1 - $0 | 0;
  $2 = $0 >> 31;
  $13 = ($2 ^ $5) - ($2 + ($1 >>> 0 < $0 >>> 0) | 0) | 0;
 }
 global$0 = $10 + 16 | 0;
 i64toi32_i32$HIGH_BITS = $13;
 return $9;
}
function syncIO($0) {
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0;
 $10 = HEAP32[832] + HEAPU16[592791] | 0;
 if (($0 | 0) == 2) {
  HEAP16[264344] = 65535;
 }
 $13 = HEAPU8[$10 | 0];
 if ($13) {
  $16 = ($0 | 0) != 2;
  $17 = ($0 | 0) == 3;
  $7 = 1;
  while (1) {
   $6 = $7 + $10 | 0;
   $4 = HEAPU8[$6 + 2 | 0];
   $11 = HEAPU8[$6 + 4 | 0];
   $5 = 1186504;
   $9 = 256;
   label$4 : {
    label$5 : {
     label$6 : {
      label$7 : {
       label$8 : {
        $2 = HEAPU8[$6 + 3 | 0];
        $8 = $2;
        switch ($2 | 0) {
        case 2:
         break label$4;
        case 3:
         break label$6;
        case 1:
         break label$7;
        case 0:
         break label$8;
        default:
         break label$5;
        }
       }
       label$9 : {
        label$10 : {
         label$11 : {
          label$12 : {
           label$13 : {
            $8 = HEAPU8[$6 + 1 | 0];
            switch ($8 | 0) {
            case 3:
             break label$10;
            case 2:
             break label$11;
            case 1:
             break label$12;
            case 0:
             break label$13;
            default:
             break label$9;
            }
           }
           $3 = Math_imul($4, 2056);
           $5 = $3 + 529664 | 0;
           $1 = HEAPU16[$3 + 531712 >> 1] + 7 >>> 3 | 0;
           break label$9;
          }
          $3 = Math_imul($4, 2056);
          $5 = $3 + 530176 | 0;
          $1 = HEAPU16[$3 + 531714 >> 1] + 7 >>> 3 | 0;
          break label$9;
         }
         $3 = Math_imul($4, 2056);
         $5 = $3 + 530688 | 0;
         $1 = HEAPU16[$3 + 531716 >> 1] + 7 >>> 3 | 0;
         break label$9;
        }
        $3 = Math_imul($4, 2056);
        $5 = $3 + 531200 | 0;
        $1 = HEAPU16[$3 + 531718 >> 1] + 7 >>> 3 | 0;
       }
       $8 = HEAPU8[$8 + 1551 | 0];
       $9 = $1;
       break label$4;
      }
      $8 = HEAPU8[$4 + 1555 | 0];
      $5 = HEAP32[($4 << 2) + 3744 >> 2];
      $9 = 480;
      break label$4;
     }
     $5 = 661248;
     $9 = 4;
     $8 = 0;
     break label$4;
    }
    $9 = 0;
    $8 = $3;
    $5 = 0;
   }
   $7 = $7 + 5 | 0;
   if (!($4 | $16 | ($2 | 0) != 1)) {
    HEAP16[264344] = $11 << 10 | $7;
   }
   label$15 : {
    if (!$11) {
     break label$15;
    }
    $2 = $8 & 255;
    $1 = ($2 | 0) == 2;
    $18 = $1 & $17;
    $19 = $1 & ($0 | 0) == 1;
    $3 = 0;
    $20 = $1 & ($0 | 0) == 2 & ($5 | 0) != 0;
    $14 = $9 & 65535;
    $21 = !($0 | $2);
    if (!(($0 | 0) != 1 | ($2 | 0) != 1)) {
     while (1) {
      $2 = $7 + $10 | 0;
      $1 = HEAPU8[$2 + 1 | 0] << 2;
      $4 = $1 + $5 | 0;
      $6 = (HEAPU8[$2 | 0] << 2) + 4400 | 0;
      $2 = HEAPU8[$2 + 2 | 0];
      $1 = $14 - $1 | 0;
      memcpy($4, $6, ($1 | 0) > ($2 | 0) ? $2 : $1);
      $7 = $7 + 3 | 0;
      $3 = $3 + 1 | 0;
      if (($11 | 0) != ($3 | 0)) {
       continue;
      }
      break;
     }
     break label$15;
    }
    while (1) {
     $1 = $7 + $10 | 0;
     $6 = HEAPU8[$1 | 0];
     $4 = HEAPU8[$1 + 2 | 0];
     $1 = HEAPU8[$1 + 1 | 0];
     label$19 : {
      if ($21) {
       $1 = $1 << 2;
       $2 = $14 - $1 | 0;
       memcpy(($6 << 2) + 4400 | 0, $1 + $5 | 0, ($2 | 0) > ($4 | 0) ? $4 : $2);
       break label$19;
      }
      if ($19) {
       if (!$5) {
        break label$19;
       }
       $12 = $4 >>> 2 | 0;
       if (!$12) {
        break label$19;
       }
       $22 = ($6 << 2) + 4400 | 0;
       $4 = ($1 << 2) + $5 | 0;
       $1 = 0;
       while (1) {
        $2 = $1 << 2;
        $6 = $2 + $4 | 0;
        $2 = $2 + $22 | 0;
        if (HEAP32[$6 >> 2] == HEAP32[$2 >> 2]) {
         $1 = $1 + 1 | 0;
         if (($12 | 0) != ($1 | 0)) {
          continue;
         }
         break label$19;
        }
        break;
       }
       memcpy($6, $2, $12 << 2);
       break label$19;
      }
      if ($18) {
       if (!$5) {
        break label$19;
       }
       memcpy(($1 << 2) + $5 | 0, ($6 << 2) + 4400 | 0, $4);
       break label$19;
      }
      if (!$20) {
       break label$19;
      }
      memcpy(($6 << 2) + 4400 | 0, ($1 << 2) + $5 | 0, $4);
     }
     $7 = $7 + 3 | 0;
     $3 = $3 + 1 | 0;
     if (($11 | 0) != ($3 | 0)) {
      continue;
     }
     break;
    }
   }
   $1 = $9;
   $3 = $8;
   $15 = $15 + 1 | 0;
   if (($13 | 0) != ($15 | 0)) {
    continue;
   }
   break;
  }
 }
}
function nst_array_init($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 $5 = HEAP32[$0 >> 2];
 $4 = $5 >>> 16 | 0;
 label$1 : {
  label$2 : {
   $3 = HEAP32[$2 >> 2];
   $7 = $3 & 65535;
   $6 = $3 >>> 16 | 0;
   $3 = ($7 >>> 0) / ($6 >>> 0) | 0;
   if ($3 + $1 >>> 0 <= (($5 & 65535) >>> 0) / ($4 >>> 0) >>> 0) {
    if ($6 >>> 0 > $7 >>> 0) {
     break label$1;
    }
    $5 = $0 + 4 | 0;
    $7 = $2 + 4 | 0;
    label$4 : {
     switch ($6 + -1 | 0) {
     case 0:
      $6 = $3 >>> 0 > 1 ? $3 : 1;
      $2 = 0;
      $8 = $4 + -1 | 0;
      while (1) {
       $0 = HEAPU8[$2 + $7 | 0];
       label$7 : {
        label$8 : {
         label$9 : {
          switch ($8 | 0) {
          case 3:
           $3 = $5 + ($1 + $2 << 2) | 0;
           HEAP8[$3 + 1 | 0] = 0;
           HEAP8[$3 + 2 | 0] = 0;
           HEAP8[$3 | 0] = $0;
           $0 = 0;
           $3 = $3 + 3 | 0;
           break label$8;
          case 1:
           $3 = $5 + ($1 + $2 << 1) | 0;
           HEAP8[$3 | 0] = $0;
           $0 = 0;
           $3 = $3 + 1 | 0;
           break label$8;
          case 0:
           break label$9;
          default:
           break label$7;
          }
         }
         $3 = $5 + ($1 + $2 | 0) | 0;
        }
        HEAP8[$3 | 0] = $0;
       }
       $2 = $2 + 1 | 0;
       if (($6 | 0) != ($2 | 0)) {
        continue;
       }
       break;
      }
      break label$1;
     case 1:
      break label$4;
     default:
      break label$2;
     }
    }
    $6 = $3 >>> 0 > 1 ? $3 : 1;
    $2 = 0;
    $8 = $4 + -1 | 0;
    while (1) {
     $0 = ($2 << 1) + $7 | 0;
     $3 = HEAPU8[$0 + 1 | 0];
     $0 = HEAPU8[$0 | 0];
     label$13 : {
      label$14 : {
       label$15 : {
        switch ($8 | 0) {
        case 3:
         $4 = $5 + ($1 + $2 << 2) | 0;
         HEAP8[$4 + 2 | 0] = 0;
         HEAP8[$4 + 1 | 0] = $3;
         HEAP8[$4 | 0] = $0;
         $0 = 0;
         $3 = $4 + 3 | 0;
         break label$14;
        case 1:
         $4 = $5 + ($1 + $2 << 1) | 0;
         HEAP8[$4 | 0] = $0;
         $0 = $3;
         $3 = $4 + 1 | 0;
         break label$14;
        case 0:
         break label$15;
        default:
         break label$13;
        }
       }
       $3 = $5 + ($1 + $2 | 0) | 0;
      }
      HEAP8[$3 | 0] = $0;
     }
     $2 = $2 + 1 | 0;
     if (($6 | 0) != ($2 | 0)) {
      continue;
     }
     break;
    }
    break label$1;
   }
   $1 = HEAP32[832];
   $0 = $1 + HEAPU16[592795] | 0;
   HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   $0 = $1 + HEAPU16[592794] | 0;
   HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   HEAP32[296536] = 2;
   HEAP32[296551] = -1;
   return 2;
  }
  $8 = $3 >>> 0 > 1 ? $3 : 1;
  $0 = 0;
  $6 = ($6 | 0) != 4;
  $4 = $4 + -1 | 0;
  while (1) {
   $2 = 0;
   if (!$6) {
    $2 = ($0 << 2) + $7 | 0;
    $2 = HEAPU8[$2 | 0] | HEAPU8[$2 + 1 | 0] << 8 | (HEAPU8[$2 + 2 | 0] << 16 | HEAPU8[$2 + 3 | 0] << 24);
   }
   label$20 : {
    label$21 : {
     label$22 : {
      switch ($4 | 0) {
      case 0:
       $3 = $5 + ($0 + $1 | 0) | 0;
       break label$21;
      case 1:
       $3 = $5 + ($0 + $1 << 1) | 0;
       HEAP8[$3 | 0] = $2;
       $2 = ($2 & 65280) >>> 8 | 0;
       $3 = $3 + 1 | 0;
       break label$21;
      case 3:
       break label$22;
      default:
       break label$20;
      }
     }
     $3 = $5 + ($0 + $1 << 2) | 0;
     HEAP8[$3 + 2 | 0] = $2 >>> 16;
     HEAP8[$3 + 1 | 0] = $2 >>> 8;
     HEAP8[$3 | 0] = $2;
     $2 = $2 >>> 24 | 0;
     $3 = $3 + 3 | 0;
    }
    HEAP8[$3 | 0] = $2;
   }
   $0 = $0 + 1 | 0;
   if (($8 | 0) != ($0 | 0)) {
    continue;
   }
   break;
  }
 }
 return 1;
}
function int_to_str($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 $8 = HEAPU16[$1 >> 1];
 HEAP32[296412] = 0;
 HEAP32[296413] = 0;
 HEAP32[296410] = 0;
 HEAP32[296411] = 0;
 HEAP32[296408] = 0;
 HEAP32[296409] = 0;
 HEAP32[296406] = 0;
 HEAP32[296407] = 0;
 HEAP32[296404] = 0;
 HEAP32[296405] = 0;
 label$1 : {
  if (!(($0 | 0) != -2147483648 | ($2 & 255) != 10)) {
   $0 = HEAPU8[1564] | HEAPU8[1565] << 8 | (HEAPU8[1566] << 16 | HEAPU8[1567] << 24);
   HEAP8[1185623] = $0;
   HEAP8[1185624] = $0 >>> 8;
   HEAP8[1185625] = $0 >>> 16;
   HEAP8[1185626] = $0 >>> 24;
   $0 = HEAPU8[1561] | HEAPU8[1562] << 8 | (HEAPU8[1563] << 16 | HEAPU8[1564] << 24);
   HEAP32[296404] = HEAPU8[1557] | HEAPU8[1558] << 8 | (HEAPU8[1559] << 16 | HEAPU8[1560] << 24);
   HEAP32[296405] = $0;
   break label$1;
  }
  $3 = $2 & 255;
  label$3 : {
   if (($3 | 0) != 10) {
    $2 = 39;
    while (1) {
     $5 = ($0 >>> 0) / ($3 >>> 0) | 0;
     HEAP8[$2 + 1185616 | 0] = HEAPU8[($0 - Math_imul($5, $3) | 0) + 1569 | 0];
     $4 = $4 + 1 | 0;
     if ($0 >>> 0 < $3 >>> 0) {
      break label$3;
     }
     $6 = ($2 | 0) > 0;
     $2 = $2 + -1 | 0;
     $0 = $5;
     if ($6) {
      continue;
     }
     break;
    }
    $4 = 40;
    break label$3;
   }
   $2 = $0 >> 31;
   $2 = $2 + $0 ^ $2;
   $7 = 39;
   $3 = 0;
   label$6 : {
    while (1) {
     $5 = ($2 | 0) / 10 | 0;
     HEAP8[$7 + 1185616 | 0] = HEAPU8[($2 - Math_imul($5, 10) | 0) + 1569 | 0];
     $4 = $3 + 1 | 0;
     if ($2 + 9 >>> 0 < 19) {
      $6 = $7;
      break label$6;
     }
     $6 = -1;
     $9 = ($7 | 0) > 0;
     $7 = $7 + -1 | 0;
     $3 = $4;
     $2 = $5;
     if ($9) {
      continue;
     }
     break;
    }
    $4 = 40;
    $3 = 39;
   }
   if (($0 | 0) >= 0) {
    break label$3;
   }
   HEAP8[(($6 << 24) + -16777216 >> 24) + 1185616 | 0] = 45;
   $4 = ($3 << 24) + 33554432 >> 24;
   if (($4 | 0) < 1) {
    break label$1;
   }
  }
  $3 = $4 & 255;
  $6 = 40 - $3 | 0;
  $0 = 0;
  while (1) {
   $2 = $0 + 1185616 | 0;
   $5 = HEAPU8[$2 | 0];
   $4 = $2;
   $2 = ($0 + $6 | 0) + 1185616 | 0;
   HEAP8[$4 | 0] = HEAPU8[$2 | 0];
   HEAP8[$2 | 0] = $5;
   $0 = $0 + 1 | 0;
   if (($3 | 0) != ($0 | 0)) {
    continue;
   }
   break;
  }
 }
 if (strlen() >>> 0 > $8 >>> 0) {
  $0 = HEAP32[832];
  $1 = $0 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
  $0 = $0 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 __stpcpy(memset($1 + 4 | 0, 0, $8));
 return 0;
}
function createRedirFuncInterf() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 $0 = HEAP32[832] + HEAPU16[592797] | 0;
 HEAP8[$0 + 8 | 0] = -1123138048;
 HEAP8[$0 + 9 | 0] = 12389958;
 HEAP8[$0 + 10 | 0] = 48398;
 HEAP8[$0 + 11 | 0] = 189;
 HEAP8[$0 + 12 | 0] = 1181922574;
 HEAP8[$0 + 13 | 0] = 4616885;
 HEAP8[$0 + 14 | 0] = 18034;
 HEAP8[$0 + 15 | 0] = 70;
 HEAP8[$0 | 0] = 1181922574;
 HEAP8[$0 + 1 | 0] = 4616885;
 HEAP8[$0 + 2 | 0] = 18034;
 HEAP8[$0 + 3 | 0] = 70;
 HEAP8[$0 + 68 | 0] = -1123203583;
 HEAP8[$0 + 69 | 0] = 12389702;
 HEAP8[$0 + 70 | 0] = 48397;
 HEAP8[$0 + 71 | 0] = 189;
 HEAP8[$0 + 56 | 0] = -1123138048;
 HEAP8[$0 + 57 | 0] = 12389958;
 HEAP8[$0 + 58 | 0] = 48398;
 HEAP8[$0 + 59 | 0] = 189;
 HEAP8[$0 + 60 | 0] = 1181922573;
 HEAP8[$0 + 61 | 0] = 4616885;
 HEAP8[$0 + 62 | 0] = 18034;
 HEAP8[$0 + 63 | 0] = 70;
 HEAP8[$0 + 44 | 0] = -1123138048;
 HEAP8[$0 + 45 | 0] = 12389958;
 HEAP8[$0 + 46 | 0] = 48398;
 HEAP8[$0 + 47 | 0] = 189;
 HEAP8[$0 + 48 | 0] = 1181922574;
 HEAP8[$0 + 49 | 0] = 4616885;
 HEAP8[$0 + 50 | 0] = 18034;
 HEAP8[$0 + 51 | 0] = 70;
 HEAP8[$0 + 32 | 0] = -1123072512;
 HEAP8[$0 + 33 | 0] = 12390214;
 HEAP8[$0 + 34 | 0] = 48399;
 HEAP8[$0 + 35 | 0] = 189;
 HEAP8[$0 + 36 | 0] = 1181922574;
 HEAP8[$0 + 37 | 0] = 4616885;
 HEAP8[$0 + 38 | 0] = 18034;
 HEAP8[$0 + 39 | 0] = 70;
 HEAP8[$0 + 20 | 0] = -1123138048;
 HEAP8[$0 + 21 | 0] = 12389958;
 HEAP8[$0 + 22 | 0] = 48398;
 HEAP8[$0 + 23 | 0] = 189;
 HEAP8[$0 + 24 | 0] = 1181922575;
 HEAP8[$0 + 25 | 0] = 4616885;
 HEAP8[$0 + 26 | 0] = 18034;
 HEAP8[$0 + 27 | 0] = 70;
 $1 = $0 - -64 | 0;
 $2 = 4372 - $1 | 0;
 HEAP8[$0 + 66 | 0] = $2 >>> 1;
 HEAP8[$1 | 0] = $2 >>> 12;
 $1 = 4324 - $0 | 0;
 HEAP8[$0 + 54 | 0] = $1 >>> 1;
 HEAP8[$0 + 52 | 0] = $1 >>> 12;
 $3 = 4340 - $0 | 0;
 HEAP8[$0 + 42 | 0] = $3 >>> 1;
 HEAP8[$0 + 40 | 0] = $3 >>> 12;
 $4 = 4356 - $0 | 0;
 HEAP8[$0 + 30 | 0] = $4 >>> 1;
 HEAP8[$0 + 28 | 0] = $4 >>> 12;
 $5 = 4372 - $0 | 0;
 HEAP8[$0 + 18 | 0] = $5 >>> 1;
 HEAP8[$0 + 16 | 0] = $5 >>> 12;
 $6 = 4388 - $0 | 0;
 HEAP8[$0 + 6 | 0] = $6 >>> 1;
 HEAP8[$0 + 4 | 0] = $6 >>> 12;
 HEAP8[$0 + 67 | 0] = $2 >>> 9 | 248;
 HEAP8[$0 + 55 | 0] = $1 >>> 9 | 248;
 HEAP8[$0 + 43 | 0] = $3 >>> 9 | 248;
 HEAP8[$0 + 31 | 0] = $4 >>> 9 | 248;
 HEAP8[$0 + 19 | 0] = $5 >>> 9 | 248;
 HEAP8[$0 + 7 | 0] = $6 >>> 9 | 248;
 HEAP8[$0 + 65 | 0] = $2 >>> 20 & 7 | 240;
 HEAP8[$0 + 53 | 0] = $1 >>> 20 & 7 | 240;
 HEAP8[$0 + 41 | 0] = $3 >>> 20 & 7 | 240;
 HEAP8[$0 + 29 | 0] = $4 >>> 20 & 7 | 240;
 HEAP8[$0 + 17 | 0] = $5 >>> 20 & 7 | 240;
 HEAP8[$0 + 5 | 0] = $6 >>> 20 & 7 | 240;
}
function processProjFile($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 memset(529664, 0, 2048);
 memset(531720, 0, 2048);
 memset(533776, 0, 2048);
 memset(535832, 0, 2048);
 memset(537888, 0, 2048);
 memset(539944, 0, 2048);
 memset(542e3, 0, 2048);
 memset(544056, 0, 2048);
 memset(546112, 0, 2048);
 memset(548168, 0, 2048);
 memset(550224, 0, 2048);
 memset(552280, 0, 2048);
 memset(554336, 0, 2048);
 memset(556392, 0, 2048);
 memset(558448, 0, 2048);
 memset(560504, 0, 2048);
 memset(562560, 0, 2048);
 memset(564616, 0, 2048);
 memset(566672, 0, 2048);
 memset(568728, 0, 2048);
 memset(570784, 0, 2048);
 memset(572840, 0, 2048);
 memset(574896, 0, 2048);
 memset(576952, 0, 2048);
 memset(579008, 0, 2048);
 memset(581064, 0, 2048);
 memset(583120, 0, 2048);
 memset(585176, 0, 2048);
 memset(587232, 0, 2048);
 memset(589288, 0, 2048);
 memset(591344, 0, 2048);
 memset(593400, 0, 2048);
 memset(595456, 0, 2048);
 memset(597512, 0, 2048);
 memset(599568, 0, 2048);
 memset(601624, 0, 2048);
 memset(603680, 0, 2048);
 memset(605736, 0, 2048);
 memset(607792, 0, 2048);
 memset(609848, 0, 2048);
 memset(611904, 0, 2048);
 memset(613960, 0, 2048);
 memset(616016, 0, 2048);
 memset(618072, 0, 2048);
 memset(620128, 0, 2048);
 memset(622184, 0, 2048);
 memset(624240, 0, 2048);
 memset(626296, 0, 2048);
 memset(628352, 0, 2048);
 memset(630408, 0, 2048);
 memset(632464, 0, 2048);
 memset(634520, 0, 2048);
 memset(636576, 0, 2048);
 memset(638632, 0, 2048);
 memset(640688, 0, 2048);
 memset(642744, 0, 2048);
 memset(644800, 0, 2048);
 memset(646856, 0, 2048);
 memset(648912, 0, 2048);
 memset(650968, 0, 2048);
 memset(653024, 0, 2048);
 memset(655080, 0, 2048);
 memset(657136, 0, 2048);
 memset(659192, 0, 2048);
 memset(528704, 0, 480);
 memset(529184, 0, 480);
 HEAP32[165312] = 0;
 $3 = HEAPU8[$0 + 8 | 0] | HEAPU8[$0 + 9 | 0] << 8;
 if ($3) {
  $2 = 12;
  while (1) {
   $1 = $0 + $2 | 0;
   $4 = HEAPU8[$1 + 8 | 0] | HEAPU8[$1 + 9 | 0] << 8 | HEAPU8[$1 + 10 | 0] << 16;
   $2 = $2 + 12 | 0;
   $1 = findObj(HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24));
   label$3 : {
    if (!$1) {
     break label$3;
    }
    $5 = HEAP32[$1 + 8 >> 2];
    if ($5) {
     $1 = $0 + $2 | 0;
     HEAP16[$5 >> 1] = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8;
     break label$3;
    }
    FUNCTION_TABLE[HEAP32[$1 + 12 >> 2]]($0 + $2 | 0, $4);
   }
   $2 = $2 + $4 | 0;
   $6 = $6 + 1 | 0;
   if (($3 | 0) != ($6 | 0)) {
    continue;
   }
   break;
  }
 }
 return HEAPU16[592784];
}
function memcpy($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0;
 if ($2 >>> 0 >= 512) {
  emscripten_memcpy_big($0 | 0, $1 | 0, $2 | 0) | 0;
  return $0;
 }
 $4 = $0 + $2 | 0;
 label$2 : {
  if (!(($0 ^ $1) & 3)) {
   label$4 : {
    if (($2 | 0) < 1) {
     $2 = $0;
     break label$4;
    }
    if (!($0 & 3)) {
     $2 = $0;
     break label$4;
    }
    $2 = $0;
    while (1) {
     HEAP8[$2 | 0] = HEAPU8[$1 | 0];
     $1 = $1 + 1 | 0;
     $2 = $2 + 1 | 0;
     if ($2 >>> 0 >= $4 >>> 0) {
      break label$4;
     }
     if ($2 & 3) {
      continue;
     }
     break;
    }
   }
   $3 = $4 & -4;
   label$8 : {
    if ($3 >>> 0 < 64) {
     break label$8;
    }
    $5 = $3 + -64 | 0;
    if ($2 >>> 0 > $5 >>> 0) {
     break label$8;
    }
    while (1) {
     HEAP32[$2 >> 2] = HEAP32[$1 >> 2];
     HEAP32[$2 + 4 >> 2] = HEAP32[$1 + 4 >> 2];
     HEAP32[$2 + 8 >> 2] = HEAP32[$1 + 8 >> 2];
     HEAP32[$2 + 12 >> 2] = HEAP32[$1 + 12 >> 2];
     HEAP32[$2 + 16 >> 2] = HEAP32[$1 + 16 >> 2];
     HEAP32[$2 + 20 >> 2] = HEAP32[$1 + 20 >> 2];
     HEAP32[$2 + 24 >> 2] = HEAP32[$1 + 24 >> 2];
     HEAP32[$2 + 28 >> 2] = HEAP32[$1 + 28 >> 2];
     HEAP32[$2 + 32 >> 2] = HEAP32[$1 + 32 >> 2];
     HEAP32[$2 + 36 >> 2] = HEAP32[$1 + 36 >> 2];
     HEAP32[$2 + 40 >> 2] = HEAP32[$1 + 40 >> 2];
     HEAP32[$2 + 44 >> 2] = HEAP32[$1 + 44 >> 2];
     HEAP32[$2 + 48 >> 2] = HEAP32[$1 + 48 >> 2];
     HEAP32[$2 + 52 >> 2] = HEAP32[$1 + 52 >> 2];
     HEAP32[$2 + 56 >> 2] = HEAP32[$1 + 56 >> 2];
     HEAP32[$2 + 60 >> 2] = HEAP32[$1 + 60 >> 2];
     $1 = $1 - -64 | 0;
     $2 = $2 - -64 | 0;
     if ($2 >>> 0 <= $5 >>> 0) {
      continue;
     }
     break;
    }
   }
   if ($2 >>> 0 >= $3 >>> 0) {
    break label$2;
   }
   while (1) {
    HEAP32[$2 >> 2] = HEAP32[$1 >> 2];
    $1 = $1 + 4 | 0;
    $2 = $2 + 4 | 0;
    if ($2 >>> 0 < $3 >>> 0) {
     continue;
    }
    break;
   }
   break label$2;
  }
  if ($4 >>> 0 < 4) {
   $2 = $0;
   break label$2;
  }
  $3 = $4 + -4 | 0;
  if ($3 >>> 0 < $0 >>> 0) {
   $2 = $0;
   break label$2;
  }
  $2 = $0;
  while (1) {
   HEAP8[$2 | 0] = HEAPU8[$1 | 0];
   HEAP8[$2 + 1 | 0] = HEAPU8[$1 + 1 | 0];
   HEAP8[$2 + 2 | 0] = HEAPU8[$1 + 2 | 0];
   HEAP8[$2 + 3 | 0] = HEAPU8[$1 + 3 | 0];
   $1 = $1 + 4 | 0;
   $2 = $2 + 4 | 0;
   if ($2 >>> 0 <= $3 >>> 0) {
    continue;
   }
   break;
  }
 }
 if ($2 >>> 0 < $4 >>> 0) {
  while (1) {
   HEAP8[$2 | 0] = HEAPU8[$1 | 0];
   $1 = $1 + 1 | 0;
   $2 = $2 + 1 | 0;
   if (($4 | 0) != ($2 | 0)) {
    continue;
   }
   break;
  }
 }
 return $0;
}
function writeObjWithOffsetsExt($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0;
 $5 = global$0 - 16 | 0;
 global$0 = $5;
 $2 = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $1 = findObj($2);
 label$1 : {
  if (!$1) {
   break label$1;
  }
  $6 = HEAPU8[$0 + 4 | 0] | HEAPU8[$0 + 5 | 0] << 8 | (HEAPU8[$0 + 6 | 0] << 16 | HEAPU8[$0 + 7 | 0] << 24);
  $7 = HEAP32[$1 >> 2];
  $8 = HEAPU8[$0 + 8 | 0] | HEAPU8[$0 + 9 | 0] << 8 | (HEAPU8[$0 + 10 | 0] << 16 | HEAPU8[$0 + 11 | 0] << 24);
  HEAP32[$5 + 8 >> 2] = $8;
  HEAP32[$5 + 4 >> 2] = $7;
  HEAP32[$5 >> 2] = $2;
  iprintf(1517, $5);
  $6 = FUNCTION_TABLE[HEAP32[$1 + 16 >> 2]]($6) | 0;
  if (!$8) {
   break label$1;
  }
  $7 = 12;
  while (1) {
   $4 = $7 + 8 | 0;
   $1 = $0 + $7 | 0;
   $3 = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
   $2 = HEAPU8[$1 + 4 | 0] | HEAPU8[$1 + 5 | 0] << 8;
   $9 = HEAPU8[$1 + 6 | 0];
   label$3 : {
    if ($9 >>> 0 <= 31) {
     $1 = HEAPU8[$1 + 7 | 0];
     memcpy(1185596, $0 + $4 | 0, $2);
     $7 = $2 + $4 | 0;
     $1 = -1 >>> 32 - $1 << $9;
     label$5 : {
      switch ($2 + -1 | 0) {
      case 1:
       $2 = $3 + $6 | 0;
       $4 = HEAPU8[$2 | 0] | HEAPU8[$2 + 1 | 0] << 8;
       $3 = $1 & (HEAPU8[1185596] | HEAPU8[1185597] << 8);
       HEAP32[296400] = $3;
       $1 = $3 | $4 & ($1 ^ 65535);
       HEAP8[$2 | 0] = $1;
       HEAP8[$2 + 1 | 0] = $1 >>> 8;
       break label$3;
      case 3:
       $2 = $3 + $6 | 0;
       $4 = HEAPU8[$2 | 0] | HEAPU8[$2 + 1 | 0] << 8 | (HEAPU8[$2 + 2 | 0] << 16 | HEAPU8[$2 + 3 | 0] << 24);
       $3 = $1 & (HEAPU8[1185596] | HEAPU8[1185597] << 8 | (HEAPU8[1185598] << 16 | HEAPU8[1185599] << 24));
       HEAP32[296400] = $3;
       $1 = $3 | $4 & ($1 ^ -1);
       HEAP8[$2 | 0] = $1;
       HEAP8[$2 + 3 | 0] = $1 >>> 24;
       HEAP8[$2 + 2 | 0] = $1 >>> 16;
       HEAP8[$2 + 1 | 0] = $1 >>> 8;
       break label$3;
      case 0:
       $2 = $3 + $6 | 0;
       $4 = HEAPU8[$2 | 0];
       $3 = $1 & HEAPU8[1185596];
       HEAP32[296400] = $3;
       HEAP8[$2 | 0] = $3 | $4 & ($1 ^ -1);
       break label$3;
      default:
       break label$5;
      }
     }
     HEAP32[296400] = $1 & HEAP32[296400];
     break label$3;
    }
    memcpy($3 + $6 | 0, $0 + $4 | 0, $2);
    $7 = $2 + $4 | 0;
   }
   $10 = $10 + 1 | 0;
   if (($10 | 0) != ($8 | 0)) {
    continue;
   }
   break;
  }
 }
 global$0 = $5 + 16 | 0;
}
function base64encode($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0, $11 = 0;
 $7 = ($1 | 0) % 3 | 0;
 label$1 : {
  label$2 : {
   label$3 : {
    if (HEAPU16[$0 >> 1] > ($1 | 0)) {
     $5 = $2 + 4 | 0;
     $4 = HEAPU16[$2 >> 1];
     if ($1) {
      break label$3;
     }
     $0 = 0;
     break label$2;
    }
    $1 = HEAP32[832];
    $0 = $1 + HEAPU16[592795] | 0;
    HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    $0 = $1 + HEAPU16[592794] | 0;
    HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    HEAP32[296536] = 2;
    HEAP32[296551] = -1;
    return 2;
   }
   $8 = $0 + 4 | 0;
   $0 = 0;
   while (1) {
    $2 = HEAPU8[$6 + $8 | 0] << 16;
    $3 = $6 + 1 | 0;
    $10 = $3 >>> 0 >= $1 >>> 0;
    if (!$10) {
     $2 = HEAPU8[$3 + $8 | 0] << 8 | $2;
    }
    $3 = $6 + 2 | 0;
    $11 = $3 >>> 0 >= $1 >>> 0;
    if (!$11) {
     $2 = HEAPU8[$3 + $8 | 0] + $2 | 0;
    }
    if ($0 >>> 0 >= $4 >>> 0) {
     return 1;
    }
    HEAP8[$0 + $5 | 0] = HEAPU8[($2 >>> 18 & 63) + 2464 | 0];
    $9 = 1;
    $3 = $0 + 1 | 0;
    if ($3 >>> 0 >= $4 >>> 0) {
     break label$1;
    }
    HEAP8[$3 + $5 | 0] = HEAPU8[($2 >>> 12 & 63) + 2464 | 0];
    $3 = $0 + 2 | 0;
    if (!$10) {
     if ($3 >>> 0 >= $4 >>> 0) {
      break label$1;
     }
     HEAP8[$3 + $5 | 0] = HEAPU8[($2 >>> 6 & 63) + 2464 | 0];
     $3 = $0 + 3 | 0;
    }
    if ($11) {
     $0 = $3;
    } else {
     if ($3 >>> 0 >= $4 >>> 0) {
      break label$1;
     }
     HEAP8[$3 + $5 | 0] = HEAPU8[($2 & 63) + 2464 | 0];
     $0 = $3 + 1 | 0;
    }
    $6 = $6 + 3 | 0;
    if ($6 >>> 0 < $1 >>> 0) {
     continue;
    }
    break;
   }
   if (($7 | 0) <= 0) {
    break label$2;
   }
   $1 = $0 >>> 0 > $4 >>> 0 ? $0 : $4;
   while (1) {
    if (($0 | 0) == ($1 | 0)) {
     break label$1;
    }
    HEAP8[$0 + $5 | 0] = 61;
    $0 = $0 + 1 | 0;
    $7 = $7 + 1 | 0;
    if (($7 | 0) != 3) {
     continue;
    }
    break;
   }
  }
  $9 = 1;
  if ($0 >>> 0 >= $4 >>> 0) {
   break label$1;
  }
  $9 = 0;
  HEAP8[$0 + $5 | 0] = 0;
 }
 return $9 | 0;
}
function setIO_PLC_var($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 $4 = $0 & 255;
 $5 = $0 >>> 8 | 0;
 $3 = $5 & 65535;
 label$1 : {
  if ($1) {
   if ((3840 - $3 | 0) < ($4 | 0) | $3 >>> 0 > 3840) {
    break label$1;
   }
   $1 = HEAP32[833];
   $3 = $0 >>> 11 & 8191;
   if (!($0 & 7)) {
    label$4 : {
     switch (__wasm_rotl_i32($4 + -8 | 0, 29) | 0) {
     case 0:
      HEAP8[$1 + $3 | 0] = $2;
      return;
     case 1:
      $0 = $1 + $3 | 0;
      HEAP8[$0 | 0] = $2;
      HEAP8[$0 + 1 | 0] = $2 >>> 8;
      return;
     case 2:
      $0 = $1 + $3 | 0;
      HEAP8[$0 + 2 | 0] = $2 >>> 16;
      HEAP8[$0 + 1 | 0] = $2 >>> 8;
      HEAP8[$0 | 0] = $2;
      return;
     case 3:
      break label$4;
     default:
      break label$1;
     }
    }
    $0 = $1 + $3 | 0;
    HEAP8[$0 | 0] = $2;
    HEAP8[$0 + 1 | 0] = $2 >>> 8;
    HEAP8[$0 + 2 | 0] = $2 >>> 16;
    HEAP8[$0 + 3 | 0] = $2 >>> 24;
    return;
   }
   $0 = $1 + $3 | 0;
   $3 = $0;
   $6 = HEAPU8[$0 | 0];
   $0 = 255 >>> 8 - $4 | 0;
   $1 = $5 & 7;
   HEAP8[$3 | 0] = $6 & ($0 << $1 ^ -1) | ($0 & $2) << $1;
   return;
  }
  $1 = $0 >>> 24 & 63;
  if ($3 + $4 >>> 0 > HEAPU16[Math_imul($1, 2056) + 531714 >> 1]) {
   break label$1;
  }
  $3 = $0 >>> 11 & 8191;
  if (!($0 & 7)) {
   label$9 : {
    switch (__wasm_rotl_i32($4 + -8 | 0, 29) | 0) {
    case 0:
     HEAP8[($3 + Math_imul($1, 2056) | 0) + 530176 | 0] = $2;
     return;
    case 1:
     $0 = ($3 + Math_imul($1, 2056) | 0) + 530176 | 0;
     HEAP8[$0 | 0] = $2;
     HEAP8[$0 + 1 | 0] = $2 >>> 8;
     return;
    case 2:
     $0 = $3 + Math_imul($1, 2056) | 0;
     HEAP8[$0 + 530178 | 0] = $2 >>> 16;
     HEAP8[$0 + 530177 | 0] = $2 >>> 8;
     HEAP8[$0 + 530176 | 0] = $2;
     return;
    case 3:
     break label$9;
    default:
     break label$1;
    }
   }
   $0 = ($3 + Math_imul($1, 2056) | 0) + 530176 | 0;
   HEAP8[$0 | 0] = $2;
   HEAP8[$0 + 1 | 0] = $2 >>> 8;
   HEAP8[$0 + 2 | 0] = $2 >>> 16;
   HEAP8[$0 + 3 | 0] = $2 >>> 24;
   return;
  }
  $0 = ($3 + Math_imul($1, 2056) | 0) + 530176 | 0;
  $3 = $0;
  $6 = HEAPU8[$0 | 0];
  $0 = 255 >>> 8 - $4 | 0;
  $1 = $5 & 7;
  HEAP8[$3 | 0] = $6 & ($0 << $1 ^ -1) | ($0 & $2) << $1;
 }
}
function str_compare($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 $4 = $1 + 4 | 0;
 $5 = HEAPU16[$0 >> 1];
 $6 = $0 + 4 | 0;
 $2 = HEAPU16[$1 >> 1];
 label$2 : {
  if ($2) {
   $1 = 0;
   while (1) {
    $3 = $5;
    if (!HEAPU8[$1 + $4 | 0]) {
     break label$2;
    }
    $1 = $1 + 1 | 0;
    if (($2 | 0) != ($1 | 0)) {
     continue;
    }
    break;
   }
  }
  $2 = HEAP32[832];
  $1 = $2 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
  $1 = $2 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
  HEAP32[296551] = -1;
  $1 = 2;
  HEAP32[296536] = 2;
  $3 = HEAPU16[$0 >> 1];
 }
 $2 = $3;
 label$1 : {
  if ($2) {
   $0 = 0;
   while (1) {
    if (!HEAPU8[$0 + $6 | 0]) {
     break label$1;
    }
    $0 = $0 + 1 | 0;
    if (($2 | 0) != ($0 | 0)) {
     continue;
    }
    break;
   }
  }
  $2 = HEAP32[832];
  $0 = $2 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $2 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = 2;
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
 }
 if (($0 | 0) == ($1 | 0)) {
  if (!$1) {
   return 1;
  }
  $0 = 0;
  label$9 : {
   while (1) {
    if (($0 | 0) == ($5 | 0)) {
     $1 = HEAP32[832];
     $0 = $1 + HEAPU16[592795] | 0;
     HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
     $0 = $1 + HEAPU16[592794] | 0;
     HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
     HEAP32[296536] = 2;
     HEAP32[296551] = -1;
     return 2;
    }
    if (HEAPU8[$0 + $6 | 0] != HEAPU8[$0 + $4 | 0]) {
     break label$9;
    }
    $0 = $0 + 1 | 0;
    if (($1 | 0) != ($0 | 0)) {
     continue;
    }
    break;
   }
   return 1;
  }
 }
 return 0;
}
function base64decode($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 $4 = HEAPU16[$0 >> 1];
 HEAP32[$3 >> 2] = HEAPU16[$2 >> 1];
 if ($4 >>> 0 > $1 >>> 0) {
  $0 = $0 + 4 | 0;
  $7 = $1 + $0 | 0;
  label$2 : {
   label$3 : {
    if ($7 >>> 0 <= $0 >>> 0) {
     break label$3;
    }
    $4 = $2 + 4 | 0;
    $8 = 1;
    $2 = 0;
    while (1) {
     label$5 : {
      label$6 : {
       label$7 : {
        $1 = HEAPU8[HEAP8[$0 | 0] + 1632 | 0];
        switch ($1 + -64 | 0) {
        case 2:
         break label$2;
        case 1:
         break label$5;
        case 0:
         break label$6;
        default:
         break label$7;
        }
       }
       $1 = $1 | $2 << 6;
       $6 = $6 + 1 | 0;
       if (($6 & 255) != 4) {
        $2 = $1;
        break label$6;
       }
       $5 = $5 + 3 | 0;
       if ($5 >>> 0 > HEAPU32[$3 >> 2]) {
        break label$2;
       }
       HEAP8[$4 + 2 | 0] = $1;
       HEAP8[$4 + 1 | 0] = $2 >>> 2;
       HEAP8[$4 | 0] = $2 >>> 10;
       $4 = $4 + 3 | 0;
       $6 = 0;
       $2 = 0;
      }
      $0 = $0 + 1 | 0;
      if ($0 >>> 0 < $7 >>> 0) {
       continue;
      }
     }
     break;
    }
    label$9 : {
     switch (($6 & 255) + -2 | 0) {
     case 1:
      $5 = $5 + 2 | 0;
      if ($5 >>> 0 > HEAPU32[$3 >> 2]) {
       break label$2;
      }
      HEAP8[$4 + 1 | 0] = $2 >>> 2;
      HEAP8[$4 | 0] = $2 >>> 10;
      break label$3;
     case 0:
      break label$9;
     default:
      break label$3;
     }
    }
    $5 = $5 + 1 | 0;
    if ($5 >>> 0 > HEAPU32[$3 >> 2]) {
     break label$2;
    }
    HEAP8[$4 | 0] = $2 >>> 4;
   }
   HEAP32[$3 >> 2] = $5;
   $8 = 0;
  }
  return $8 | 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function nst_OutpIntSet($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0;
 label$1 : {
  if (HEAP32[165313] > ($0 | 0)) {
   if (($1 + $2 | 0) > HEAPU16[Math_imul($0, 2056) + 531714 >> 1]) {
    $1 = HEAP32[832];
    $0 = $1 + HEAPU16[592795] | 0;
    HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    $0 = $1 + HEAPU16[592794] | 0;
    HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    HEAP32[296536] = 2;
    HEAP32[296551] = -1;
    return 2;
   }
   $5 = $2 & 65535;
   $4 = $1 >>> 3 & 8191;
   if (!($2 & 7)) {
    $2 = 0;
    label$5 : {
     switch (__wasm_rotl_i32($5 + -8 | 0, 29) | 0) {
     case 0:
      HEAP8[(Math_imul($0, 2056) + $4 | 0) + 530176 | 0] = $3;
      return 0;
     case 1:
      $0 = (Math_imul($0, 2056) + $4 | 0) + 530176 | 0;
      HEAP8[$0 | 0] = $3;
      HEAP8[$0 + 1 | 0] = $3 >>> 8;
      return 0;
     case 2:
      $0 = Math_imul($0, 2056) + $4 | 0;
      HEAP8[$0 + 530178 | 0] = $3 >>> 16;
      HEAP8[$0 + 530177 | 0] = $3 >>> 8;
      HEAP8[$0 + 530176 | 0] = $3;
      return 0;
     case 3:
      break label$5;
     default:
      break label$1;
     }
    }
    $0 = (Math_imul($0, 2056) + $4 | 0) + 530176 | 0;
    HEAP8[$0 | 0] = $3;
    HEAP8[$0 + 1 | 0] = $3 >>> 8;
    HEAP8[$0 + 2 | 0] = $3 >>> 16;
    HEAP8[$0 + 3 | 0] = $3 >>> 24;
    return 0;
   }
   $0 = (Math_imul($0, 2056) + $4 | 0) + 530176 | 0;
   $2 = $0;
   $4 = HEAPU8[$0 | 0];
   $0 = 255 >>> 8 - $5 | 0;
   $1 = $1 & 7;
   HEAP8[$2 | 0] = $4 & ($0 << $1 ^ -1) | ($0 & $3) << $1;
   return 0;
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $2 = 2;
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
 }
 return $2 | 0;
}
function __stdio_write($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 $5 = global$0 - 32 | 0;
 global$0 = $5;
 $6 = HEAP32[$0 + 28 >> 2];
 HEAP32[$5 + 16 >> 2] = $6;
 $3 = HEAP32[$0 + 20 >> 2];
 HEAP32[$5 + 28 >> 2] = $2;
 HEAP32[$5 + 24 >> 2] = $1;
 $1 = $3 - $6 | 0;
 HEAP32[$5 + 20 >> 2] = $1;
 $6 = $1 + $2 | 0;
 $9 = 2;
 $1 = $5 + 16 | 0;
 label$1 : {
  label$2 : {
   $3 = __wasi_fd_write(HEAP32[$0 + 60 >> 2], $5 + 16 | 0, 2, $5 + 12 | 0) | 0;
   $4 = 0;
   label$4 : {
    if (!$3) {
     break label$4;
    }
    HEAP32[296784] = $3;
    $4 = -1;
   }
   label$3 : {
    if (!$4) {
     while (1) {
      $3 = HEAP32[$5 + 12 >> 2];
      if (($3 | 0) == ($6 | 0)) {
       break label$3;
      }
      if (($3 | 0) <= -1) {
       break label$2;
      }
      $4 = HEAP32[$1 + 4 >> 2];
      $7 = $3 >>> 0 > $4 >>> 0;
      $8 = ($7 << 3) + $1 | 0;
      $4 = $3 - ($7 ? $4 : 0) | 0;
      HEAP32[$8 >> 2] = $4 + HEAP32[$8 >> 2];
      $8 = ($7 ? 12 : 4) + $1 | 0;
      HEAP32[$8 >> 2] = HEAP32[$8 >> 2] - $4;
      $6 = $6 - $3 | 0;
      $1 = $7 ? $1 + 8 | 0 : $1;
      $9 = $9 - $7 | 0;
      $3 = __wasi_fd_write(HEAP32[$0 + 60 >> 2], $1 | 0, $9 | 0, $5 + 12 | 0) | 0;
      $4 = 0;
      label$7 : {
       if (!$3) {
        break label$7;
       }
       HEAP32[296784] = $3;
       $4 = -1;
      }
      if (!$4) {
       continue;
      }
      break;
     }
    }
    HEAP32[$5 + 12 >> 2] = -1;
    if (($6 | 0) != -1) {
     break label$2;
    }
   }
   $1 = HEAP32[$0 + 44 >> 2];
   HEAP32[$0 + 28 >> 2] = $1;
   HEAP32[$0 + 20 >> 2] = $1;
   HEAP32[$0 + 16 >> 2] = $1 + HEAP32[$0 + 48 >> 2];
   $0 = $2;
   break label$1;
  }
  HEAP32[$0 + 28 >> 2] = 0;
  HEAP32[$0 + 16 >> 2] = 0;
  HEAP32[$0 + 20 >> 2] = 0;
  HEAP32[$0 >> 2] = HEAP32[$0 >> 2] | 32;
  $0 = 0;
  if (($9 | 0) == 2) {
   break label$1;
  }
  $0 = $2 - HEAP32[$1 + 4 >> 2] | 0;
 }
 global$0 = $5 + 32 | 0;
 return $0 | 0;
}
function ARGEE_simExec() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0;
 label$1 : {
  if ((disas_thumb_insn() | 0) != -1) {
   break label$1;
  }
  $3 = HEAP32[296543];
  $2 = HEAP32[296536];
  $0 = HEAP32[832] + HEAPU16[592788] | 0;
  $0 = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $1 = HEAP32[296540];
  HEAP8[$0 + 7 | 0] = $1 >>> 24;
  HEAP8[$0 + 6 | 0] = $1 >>> 16;
  HEAP8[$0 + 5 | 0] = $1 >>> 8;
  HEAP8[$0 + 4 | 0] = $1;
  $1 = $3 + -4 | 0;
  $1 = ($2 | 0) == 3 ? $1 : $2 & -3 ? $3 : $1;
  HEAP8[$0 + 3 | 0] = $1 >>> 24;
  HEAP8[$0 + 2 | 0] = $1 >>> 16;
  HEAP8[$0 + 1 | 0] = $1 >>> 8;
  HEAP8[$0 | 0] = $1 | 1;
  $1 = -2;
  label$2 : {
   switch ($2 | 0) {
   case 0:
   case 8:
    $2 = HEAPU16[330628];
    if ($2) {
     $2 = $2 + HEAP32[832] | 0;
     $1 = HEAP32[296534];
     HEAP8[$2 | 0] = $1;
     HEAP8[$2 + 1 | 0] = $1 >>> 8;
     HEAP8[$2 + 2 | 0] = $1 >>> 16;
     HEAP8[$2 + 3 | 0] = $1 >>> 24;
     HEAP16[330628] = 0;
    }
    $1 = HEAPU8[$0 + 8 | 0];
    $3 = HEAPU8[$0 + 9 | 0];
    $4 = HEAPU8[$0 + 10 | 0];
    $2 = HEAP32[832] + HEAPU16[592788] | 0;
    $0 = HEAPU8[$0 + 11 | 0];
    HEAP8[$2 + 3 | 0] = $0;
    HEAP8[$2 + 2 | 0] = $4;
    HEAP8[$2 + 1 | 0] = $3;
    HEAP8[$2 | 0] = $1;
    if (HEAP32[296533] == ($1 | $3 << 8 | $4 << 16 | $0 << 24)) {
     syncIO(1);
    }
    HEAP32[296552] = 0;
    return -1;
   case 1:
    $0 = HEAPU16[330628];
    if ($0) {
     $0 = $0 + HEAP32[832] | 0;
     $2 = HEAP32[296534];
     HEAP8[$0 | 0] = $2;
     HEAP8[$0 + 1 | 0] = $2 >>> 8;
     HEAP8[$0 + 2 | 0] = $2 >>> 16;
     HEAP8[$0 + 3 | 0] = $2 >>> 24;
     HEAP16[330628] = 0;
    }
    $0 = HEAP32[296552];
    if (($0 | 0) >= 20) {
     HEAP32[296552] = 5;
     $0 = 5;
    }
    HEAP32[296552] = $0 + 1;
    return -1;
   case 2:
    break label$1;
   default:
    break label$2;
   }
  }
  $1 = -3;
 }
 return $1 | 0;
}
function nst_OutpIntGet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0;
 label$1 : {
  if (HEAP32[165313] > ($0 | 0)) {
   if (($1 + $2 | 0) > HEAPU16[Math_imul($0, 2056) + 531714 >> 1]) {
    $1 = HEAP32[832];
    $0 = $1 + HEAPU16[592795] | 0;
    HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    $0 = $1 + HEAPU16[592794] | 0;
    HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    HEAP32[296536] = 2;
    HEAP32[296551] = -1;
    return 2;
   }
   $3 = ($1 | 0) / 8 | 0;
   if (!($2 & 7)) {
    $1 = 0;
    label$5 : {
     switch (__wasm_rotl_i32($2 + -8 | 0, 29) | 0) {
     case 0:
      return HEAPU8[(Math_imul($0, 2056) + $3 | 0) + 530176 | 0];
     case 1:
      $0 = (Math_imul($0, 2056) + $3 | 0) + 530176 | 0;
      return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8;
     case 2:
      $0 = Math_imul($0, 2056) + $3 | 0;
      $1 = $0 + 530176 | 0;
      return HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | HEAPU8[$0 + 530178 | 0] << 16;
     case 3:
      break label$5;
     default:
      break label$1;
     }
    }
    $0 = (Math_imul($0, 2056) + $3 | 0) + 530176 | 0;
    return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   }
   return HEAPU8[(Math_imul($0, 2056) + $3 | 0) + 530176 | 0] >>> ($1 & 7) & 255 >>> 8 - $2;
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $1 = 2;
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
 }
 return $1 | 0;
}
function str_right($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $5 = $0 + 4 | 0;
 $6 = HEAPU16[$2 >> 1];
 $4 = HEAPU16[$0 >> 1];
 label$1 : {
  if ($4) {
   $0 = 0;
   while (1) {
    if (!HEAPU8[$0 + $5 | 0]) {
     break label$1;
    }
    $0 = $0 + 1 | 0;
    if (($4 | 0) != ($0 | 0)) {
     continue;
    }
    break;
   }
  }
  $3 = HEAP32[832];
  $0 = $3 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $3 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = 2;
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
 }
 label$4 : {
  if (($1 | 0) <= -1) {
   break label$4;
  }
  $7 = $2 + 4 | 0;
  $2 = 0;
  $3 = $0 - $1 | 0;
  if ($3 >>> 0 < $0 >>> 0) {
   while (1) {
    if (($2 | 0) == ($6 | 0) | $3 >>> 0 >= $4 >>> 0) {
     break label$4;
    }
    $0 = HEAPU8[$3 + $5 | 0];
    if (!$0) {
     break label$4;
    }
    HEAP8[$2 + $7 | 0] = $0;
    $3 = $3 + 1 | 0;
    $2 = $2 + 1 | 0;
    if (($2 | 0) != ($1 | 0)) {
     continue;
    }
    break;
   }
   $2 = $1;
  }
  if ($2 >>> 0 >= $6 >>> 0) {
   break label$4;
  }
  HEAP8[$2 + $7 | 0] = 0;
  return 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function str_concat($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $5 = $1 + 4 | 0;
 $6 = HEAPU16[$0 >> 1];
 $2 = HEAPU16[$1 >> 1];
 label$1 : {
  if ($2) {
   $1 = 0;
   while (1) {
    if (!HEAPU8[$1 + $5 | 0]) {
     break label$1;
    }
    $1 = $1 + 1 | 0;
    if (($2 | 0) != ($1 | 0)) {
     continue;
    }
    break;
   }
  }
  $3 = HEAP32[832];
  $1 = $3 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
  $1 = $3 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
  $1 = 2;
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
 }
 label$4 : {
  label$5 : {
   if (!$6) {
    break label$5;
   }
   $3 = $0 + 4 | 0;
   $0 = 0;
   $4 = $2 - $1 | 0;
   $4 = $4 >>> 0 > $2 >>> 0 ? 0 : $4;
   while (1) {
    if (($0 | 0) == ($4 | 0)) {
     break label$4;
    }
    $7 = HEAPU8[$0 + $3 | 0];
    if (!$7) {
     break label$5;
    }
    HEAP8[$1 + $5 | 0] = $7;
    $1 = $1 + 1 | 0;
    $0 = $0 + 1 | 0;
    if (($6 | 0) != ($0 | 0)) {
     continue;
    }
    break;
   }
  }
  if ($1 >>> 0 >= $2 >>> 0) {
   break label$4;
  }
  HEAP8[$1 + $5 | 0] = 0;
  return 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function memset($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 label$1 : {
  if (!$2) {
   break label$1;
  }
  $3 = $0 + $2 | 0;
  HEAP8[$3 + -1 | 0] = $1;
  HEAP8[$0 | 0] = $1;
  if ($2 >>> 0 < 3) {
   break label$1;
  }
  HEAP8[$3 + -2 | 0] = $1;
  HEAP8[$0 + 1 | 0] = $1;
  HEAP8[$3 + -3 | 0] = $1;
  HEAP8[$0 + 2 | 0] = $1;
  if ($2 >>> 0 < 7) {
   break label$1;
  }
  HEAP8[$3 + -4 | 0] = $1;
  HEAP8[$0 + 3 | 0] = $1;
  if ($2 >>> 0 < 9) {
   break label$1;
  }
  $3 = 0 - $0 & 3;
  $4 = $3 + $0 | 0;
  $1 = Math_imul($1 & 255, 16843009);
  HEAP32[$4 >> 2] = $1;
  $2 = $2 - $3 & -4;
  $3 = $2 + $4 | 0;
  HEAP32[$3 + -4 >> 2] = $1;
  if ($2 >>> 0 < 9) {
   break label$1;
  }
  HEAP32[$4 + 8 >> 2] = $1;
  HEAP32[$4 + 4 >> 2] = $1;
  HEAP32[$3 + -8 >> 2] = $1;
  HEAP32[$3 + -12 >> 2] = $1;
  if ($2 >>> 0 < 25) {
   break label$1;
  }
  HEAP32[$4 + 24 >> 2] = $1;
  HEAP32[$4 + 20 >> 2] = $1;
  HEAP32[$4 + 16 >> 2] = $1;
  HEAP32[$4 + 12 >> 2] = $1;
  HEAP32[$3 + -16 >> 2] = $1;
  HEAP32[$3 + -20 >> 2] = $1;
  HEAP32[$3 + -24 >> 2] = $1;
  HEAP32[$3 + -28 >> 2] = $1;
  $6 = $4 & 4 | 24;
  $2 = $2 - $6 | 0;
  if ($2 >>> 0 < 32) {
   break label$1;
  }
  $3 = $1;
  $5 = $1;
  $1 = $4 + $6 | 0;
  while (1) {
   HEAP32[$1 + 24 >> 2] = $5;
   HEAP32[$1 + 28 >> 2] = $3;
   HEAP32[$1 + 16 >> 2] = $5;
   HEAP32[$1 + 20 >> 2] = $3;
   HEAP32[$1 + 8 >> 2] = $5;
   HEAP32[$1 + 12 >> 2] = $3;
   HEAP32[$1 >> 2] = $5;
   HEAP32[$1 + 4 >> 2] = $3;
   $1 = $1 + 32 | 0;
   $2 = $2 + -32 | 0;
   if ($2 >>> 0 > 31) {
    continue;
   }
   break;
  }
 }
 return $0;
}
function pop_arg($0, $1, $2) {
 label$1 : {
  label$2 : {
   if ($1 >>> 0 > 20) {
    break label$2;
   }
   label$3 : {
    switch ($1 + -9 | 0) {
    case 0:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
     return;
    case 1:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     $1 = HEAP32[$1 >> 2];
     HEAP32[$0 >> 2] = $1;
     HEAP32[$0 + 4 >> 2] = $1 >> 31;
     return;
    case 2:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
     HEAP32[$0 + 4 >> 2] = 0;
     return;
    case 4:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     $1 = HEAP16[$1 >> 1];
     HEAP32[$0 >> 2] = $1;
     HEAP32[$0 + 4 >> 2] = $1 >> 31;
     return;
    case 5:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     HEAP32[$0 >> 2] = HEAPU16[$1 >> 1];
     HEAP32[$0 + 4 >> 2] = 0;
     return;
    case 6:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     $1 = HEAP8[$1 | 0];
     HEAP32[$0 >> 2] = $1;
     HEAP32[$0 + 4 >> 2] = $1 >> 31;
     return;
    case 7:
     $1 = HEAP32[$2 >> 2];
     HEAP32[$2 >> 2] = $1 + 4;
     HEAP32[$0 >> 2] = HEAPU8[$1 | 0];
     HEAP32[$0 + 4 >> 2] = 0;
     return;
    case 3:
    case 8:
     break label$1;
    case 9:
     break label$3;
    default:
     break label$2;
    }
   }
   FUNCTION_TABLE[0]($0, $2);
  }
  return;
 }
 $1 = HEAP32[$2 >> 2] + 7 & -8;
 HEAP32[$2 >> 2] = $1 + 8;
 $2 = HEAP32[$1 + 4 >> 2];
 HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
 HEAP32[$0 + 4 >> 2] = $2;
}
function __shgetc($0) {
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $1 = HEAP32[$0 + 116 >> 2];
 $2 = $1;
 label$1 : {
  $5 = HEAP32[$0 + 112 >> 2];
  label$2 : {
   if ($1 | $5) {
    $1 = HEAP32[$0 + 124 >> 2];
    if (($1 | 0) > ($2 | 0) ? 1 : ($1 | 0) >= ($2 | 0) ? HEAPU32[$0 + 120 >> 2] >= $5 >>> 0 : 0) {
     break label$2;
    }
   }
   $5 = __uflow($0);
   if (($5 | 0) > -1) {
    break label$1;
   }
  }
  HEAP32[$0 + 104 >> 2] = 0;
  return -1;
 }
 $1 = HEAP32[$0 + 8 >> 2];
 $2 = HEAP32[$0 + 116 >> 2];
 $3 = $2;
 label$4 : {
  label$5 : {
   $4 = HEAP32[$0 + 112 >> 2];
   if (!($2 | $4)) {
    break label$5;
   }
   $2 = (HEAP32[$0 + 124 >> 2] ^ -1) + $3 | 0;
   $3 = HEAP32[$0 + 120 >> 2] ^ -1;
   $4 = $3 + $4 | 0;
   if ($4 >>> 0 < $3 >>> 0) {
    $2 = $2 + 1 | 0;
   }
   $3 = $4;
   $4 = HEAP32[$0 + 4 >> 2];
   $6 = $1 - $4 | 0;
   $7 = $3 >>> 0 >= $6 >>> 0;
   $6 = $6 >> 31;
   if (($2 | 0) > ($6 | 0) ? 1 : ($2 | 0) >= ($6 | 0) ? $7 : 0) {
    break label$5;
   }
   HEAP32[$0 + 104 >> 2] = $3 + $4;
   break label$4;
  }
  HEAP32[$0 + 104 >> 2] = $1;
 }
 label$6 : {
  if (!$1) {
   $0 = HEAP32[$0 + 4 >> 2];
   break label$6;
  }
  $4 = HEAP32[$0 + 124 >> 2];
  $2 = $0;
  $3 = HEAP32[$0 + 120 >> 2];
  $0 = HEAP32[$0 + 4 >> 2];
  $1 = ($1 - $0 | 0) + 1 | 0;
  $6 = $1;
  $3 = $3 + $1 | 0;
  $1 = ($1 >> 31) + $4 | 0;
  HEAP32[$2 + 120 >> 2] = $3;
  HEAP32[$2 + 124 >> 2] = $3 >>> 0 < $6 >>> 0 ? $1 + 1 | 0 : $1;
 }
 $0 = $0 + -1 | 0;
 if (HEAPU8[$0 | 0] != ($5 | 0)) {
  HEAP8[$0 | 0] = $5;
 }
 return $5;
}
function nst_ParamIntSet($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0;
 label$1 : {
  label$2 : {
   if (HEAP32[165313] <= ($0 | 0)) {
    break label$2;
   }
   if (($1 + $2 | 0) >= 257) {
    $1 = HEAP32[832];
    $0 = $1 + HEAPU16[592795] | 0;
    HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    $0 = $1 + HEAPU16[592794] | 0;
    HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    HEAP32[296536] = 2;
    HEAP32[296551] = -1;
    return 2;
   }
   $4 = $2 & 65535;
   $0 = $1 >>> 3 & 8191;
   if (!($2 & 7)) {
    label$5 : {
     switch (__wasm_rotl_i32($4 + -8 | 0, 29) | 0) {
     case 1:
      $0 = $0 + 1185616 | 0;
      HEAP8[$0 | 0] = $3;
      HEAP8[$0 + 1 | 0] = $3 >>> 8;
      return 0;
     case 2:
      HEAP8[$0 + 1185618 | 0] = $3 >>> 16;
      HEAP8[$0 + 1185617 | 0] = $3 >>> 8;
      break label$1;
     case 0:
      break label$1;
     case 3:
      break label$5;
     default:
      break label$2;
     }
    }
    $0 = $0 + 1185616 | 0;
    HEAP8[$0 | 0] = $3;
    HEAP8[$0 + 1 | 0] = $3 >>> 8;
    HEAP8[$0 + 2 | 0] = $3 >>> 16;
    HEAP8[$0 + 3 | 0] = $3 >>> 24;
    return 0;
   }
   $0 = $0 + 1185616 | 0;
   $2 = $0;
   $5 = HEAPU8[$0 | 0];
   $0 = 255 >>> 8 - $4 | 0;
   $1 = $1 & 7;
   HEAP8[$2 | 0] = $5 & ($0 << $1 ^ -1) | ($0 & $3) << $1;
  }
  return 0;
 }
 HEAP8[$0 + 1185616 | 0] = $3;
 return 0;
}
function startProg($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0;
 $0 = memcpy(4400, $0, $1);
 HEAP32[$0 + (HEAPU16[592790] & 65532) >> 2] = 63;
 HEAP32[$0 + (HEAPU16[592789] & 65532) >> 2] = 3760;
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592788] | 0;
 $3 = (HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + $1 | 0;
 HEAP32[296533] = $3;
 HEAP8[$0 + 3 | 0] = $3 >>> 24;
 HEAP8[$0 + 2 | 0] = $3 >>> 16;
 HEAP8[$0 + 1 | 0] = $3 >>> 8;
 HEAP8[$0 | 0] = $3;
 $1 = HEAP32[832];
 $0 = $3;
 while (1) {
  $1 = ((HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + $1 | 0) + 1 | 0;
  HEAP8[$0 | 0] = $1;
  HEAP8[$0 + 1 | 0] = $1 >>> 8;
  HEAP8[$0 + 2 | 0] = $1 >>> 16;
  HEAP8[$0 + 3 | 0] = $1 >>> 24;
  $1 = HEAP32[832];
  $2 = $1 + (HEAPU8[$0 + 4 | 0] | HEAPU8[$0 + 5 | 0] << 8 | (HEAPU8[$0 + 6 | 0] << 16 | HEAPU8[$0 + 7 | 0] << 24)) | 0;
  HEAP8[$0 + 4 | 0] = $2;
  HEAP8[$0 + 5 | 0] = $2 >>> 8;
  HEAP8[$0 + 6 | 0] = $2 >>> 16;
  HEAP8[$0 + 7 | 0] = $2 >>> 24;
  $2 = $0;
  $0 = (HEAPU8[$0 + 8 | 0] | HEAPU8[$0 + 9 | 0] << 8 | (HEAPU8[$0 + 10 | 0] << 16 | HEAPU8[$0 + 11 | 0] << 24)) + $1 | 0;
  HEAP8[$2 + 8 | 0] = $0;
  HEAP8[$2 + 9 | 0] = $0 >>> 8;
  HEAP8[$2 + 10 | 0] = $0 >>> 16;
  HEAP8[$2 + 11 | 0] = $0 >>> 24;
  if (($0 | 0) != ($3 | 0)) {
   continue;
  }
  break;
 }
 syncIO(3);
 syncIO(2);
 HEAP32[(HEAPU16[592785] & 65532) + 4400 >> 2] = 0;
 if (HEAP32[165316] == 1) {
  createRedirFuncInterf();
 }
}
function findObj($0) {
 var $1 = 0, $2 = 0;
 label$1 : {
  label$2 : {
   if (HEAP32[837] == ($0 | 0)) {
    break label$2;
   }
   $1 = 1;
   if (HEAP32[842] == ($0 | 0)) {
    break label$2;
   }
   $1 = 2;
   if (HEAP32[847] == ($0 | 0)) {
    break label$2;
   }
   $1 = 3;
   if (HEAP32[852] == ($0 | 0)) {
    break label$2;
   }
   $1 = 4;
   if (HEAP32[857] == ($0 | 0)) {
    break label$2;
   }
   $1 = 5;
   if (HEAP32[862] == ($0 | 0)) {
    break label$2;
   }
   $1 = 6;
   if (HEAP32[867] == ($0 | 0)) {
    break label$2;
   }
   $1 = 7;
   if (HEAP32[872] == ($0 | 0)) {
    break label$2;
   }
   $1 = 8;
   if (HEAP32[877] == ($0 | 0)) {
    break label$2;
   }
   $1 = 9;
   if (HEAP32[882] == ($0 | 0)) {
    break label$2;
   }
   $1 = 10;
   if (HEAP32[887] == ($0 | 0)) {
    break label$2;
   }
   $1 = 11;
   if (HEAP32[892] == ($0 | 0)) {
    break label$2;
   }
   $1 = 12;
   if (HEAP32[897] == ($0 | 0)) {
    break label$2;
   }
   $1 = 13;
   if (HEAP32[902] == ($0 | 0)) {
    break label$2;
   }
   $1 = 14;
   if (HEAP32[907] == ($0 | 0)) {
    break label$2;
   }
   $1 = 15;
   if (HEAP32[912] == ($0 | 0)) {
    break label$2;
   }
   $1 = 16;
   if (HEAP32[917] == ($0 | 0)) {
    break label$2;
   }
   $1 = 17;
   if (HEAP32[922] == ($0 | 0)) {
    break label$2;
   }
   $1 = 18;
   if (HEAP32[927] == ($0 | 0)) {
    break label$2;
   }
   $1 = 19;
   $2 = 0;
   if (HEAP32[932] != ($0 | 0)) {
    break label$1;
   }
  }
  $2 = Math_imul($1, 20) + 3344 | 0;
 }
 return $2;
}
function nst_PLCIntOutpSet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0;
 if (!((3840 - $0 | 0) >= ($1 | 0) ? ($0 | 0) <= 3840 : 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $3 = HEAP32[833];
 $5 = $1 & 65535;
 $4 = $0 >>> 3 & 8191;
 label$2 : {
  if (!($1 & 7)) {
   label$4 : {
    switch (__wasm_rotl_i32($5 + -8 | 0, 29) | 0) {
    case 0:
     HEAP8[$3 + $4 | 0] = $2;
     return 0;
    case 1:
     $0 = $3 + $4 | 0;
     HEAP8[$0 | 0] = $2;
     HEAP8[$0 + 1 | 0] = $2 >>> 8;
     return 0;
    case 2:
     $0 = $3 + $4 | 0;
     HEAP8[$0 + 2 | 0] = $2 >>> 16;
     HEAP8[$0 + 1 | 0] = $2 >>> 8;
     HEAP8[$0 | 0] = $2;
     return 0;
    case 3:
     break label$4;
    default:
     break label$2;
    }
   }
   $0 = $3 + $4 | 0;
   HEAP8[$0 | 0] = $2;
   HEAP8[$0 + 1 | 0] = $2 >>> 8;
   HEAP8[$0 + 2 | 0] = $2 >>> 16;
   HEAP8[$0 + 3 | 0] = $2 >>> 24;
   return 0;
  }
  $1 = $3 + $4 | 0;
  $3 = $1;
  $4 = HEAPU8[$1 | 0];
  $1 = 255 >>> 8 - $5 | 0;
  $0 = $0 & 7;
  HEAP8[$3 | 0] = $4 & ($1 << $0 ^ -1) | ($1 & $2) << $0;
 }
 return 0;
}
function str_left($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 label$1 : {
  if (($1 | 0) >= 0) {
   $3 = $2 + 4 | 0;
   $4 = HEAPU16[$2 >> 1];
   if ($1) {
    $6 = $0 + 4 | 0;
    $0 = HEAPU16[$0 >> 1];
    $2 = 0;
    while (1) {
     if (($0 | 0) == ($2 | 0) | ($2 | 0) == ($4 | 0)) {
      break label$1;
     }
     $5 = HEAPU8[$2 + $6 | 0];
     if (!$5) {
      break label$1;
     }
     HEAP8[$2 + $3 | 0] = $5;
     $2 = $2 + 1 | 0;
     if (($2 | 0) != ($1 | 0)) {
      continue;
     }
     break;
    }
   }
   if ($4 >>> 0 <= $1 >>> 0) {
    break label$1;
   }
   HEAP8[$1 + $3 | 0] = 0;
   return 0;
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function ARGEE_sim_PrepExecNST() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 $0 = HEAP32[296552];
 if (!(($0 | 0) < 6 ? $0 : 0)) {
  $0 = HEAP32[832] + HEAPU16[592792] | 0;
  memset($0 + 4 | 0, 0, HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8);
  HEAP8[$0 + 2 | 0] = 0;
  HEAP8[$0 + 3 | 0] = 0;
 }
 $2 = HEAP32[832];
 $0 = $2 + HEAPU16[592788] | 0;
 $0 = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $3 = HEAPU8[$0 + 3 | 0];
 $4 = HEAPU8[$0 + 2 | 0];
 $5 = HEAPU8[$0 + 1 | 0];
 $6 = HEAPU8[$0 | 0];
 $1 = (HEAPU16[592785] & 65532) + 4400 | 0;
 HEAP32[$1 >> 2] = 0;
 $7 = HEAPU8[$0 + 7 | 0];
 $8 = HEAPU8[$0 + 6 | 0];
 $9 = HEAPU8[$0 + 5 | 0];
 $0 = HEAPU8[$0 + 4 | 0];
 if (HEAPU16[330628]) {
  HEAP32[$1 >> 2] = 1;
 }
 $1 = HEAPU16[592786] + $2 | 0;
 HEAP8[$1 | 0] = -1;
 HEAP8[$1 + 1 | 0] = 16777215;
 HEAP8[$1 + 2 | 0] = 65535;
 HEAP8[$1 + 3 | 0] = 255;
 $1 = HEAP32[832] + HEAPU16[592787] | 0;
 HEAP8[$1 | 0] = -1;
 HEAP8[$1 + 1 | 0] = 16777215;
 HEAP8[$1 + 2 | 0] = 65535;
 HEAP8[$1 + 3 | 0] = 255;
 HEAP32[296540] = $0 | $9 << 8 | $8 << 16 | $7 << 24;
 HEAP32[296551] = $5 << 8 | $6 | $4 << 16 | $3 << 24;
 HEAP32[296550] = -1;
 HEAP32[296549] = 1186476;
 $0 = HEAP32[832];
 HEAP32[296547] = $0;
 HEAP32[296539] = $0;
}
function nst_InpArrGet($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0, $6 = 0;
 $4 = $2 >>> 16 | 0;
 if (!(HEAP32[165313] <= ($0 | 0) | ($4 + $3 | 0) > HEAPU16[$1 >> 1])) {
  $0 = Math_imul($0, 2056);
  $5 = (HEAPU16[$0 + 531712 >> 1] + 7 >>> 3 | 0) - $2 | 0;
  $6 = $5 << 16;
  label$2 : {
   if (($6 | 0) <= -1) {
    $1 = HEAP32[832];
    $0 = $1 + HEAPU16[592795] | 0;
    HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    $0 = $1 + HEAPU16[592794] | 0;
    HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
    HEAP32[296536] = 2;
    HEAP32[296551] = -1;
    break label$2;
   }
   $2 = ($0 + ($2 & 65535) | 0) + 529664 | 0;
   $0 = $6 >> 16;
   memcpy(($1 + 4 | 0) + $4 | 0, $2, ($0 | 0) > ($3 | 0) ? $3 : $0);
  }
  return $5 >>> 14 & 2;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function str_mid($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 label$1 : {
  label$2 : {
   label$3 : {
    if (($1 | $2) >= 0) {
     $5 = $3 + 4 | 0;
     $6 = HEAPU16[$3 >> 1];
     if ($2 >>> 0 > $1 >>> 0) {
      break label$3;
     }
     $0 = 0;
     break label$2;
    }
    break label$1;
   }
   $7 = $0 + 4 | 0;
   $3 = 0;
   $0 = HEAPU16[$0 >> 1];
   $4 = $0 - $1 | 0;
   $4 = $4 >>> 0 > $0 >>> 0 ? 0 : $4;
   $0 = $2 - $1 | 0;
   while (1) {
    if (($3 | 0) == ($4 | 0) | ($3 | 0) == ($6 | 0)) {
     break label$1;
    }
    $2 = HEAPU8[$1 + $7 | 0];
    if (!$2) {
     break label$1;
    }
    HEAP8[$3 + $5 | 0] = $2;
    $1 = $1 + 1 | 0;
    $3 = $3 + 1 | 0;
    if (($3 | 0) != ($0 | 0)) {
     continue;
    }
    break;
   }
  }
  if ($0 >>> 0 >= $6 >>> 0) {
   break label$1;
  }
  HEAP8[$0 + $5 | 0] = 0;
  return 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function nst_ParamIntGet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0;
 label$1 : {
  if (HEAP32[165313] <= ($0 | 0)) {
   break label$1;
  }
  if (($1 + $2 | 0) >= 257) {
   $1 = HEAP32[832];
   $0 = $1 + HEAPU16[592795] | 0;
   HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   $0 = $1 + HEAPU16[592794] | 0;
   HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   HEAP32[296536] = 2;
   HEAP32[296551] = -1;
   return 2;
  }
  $0 = ($1 | 0) / 8 | 0;
  if (!($2 & 7)) {
   label$4 : {
    switch (__wasm_rotl_i32($2 + -8 | 0, 29) | 0) {
    case 0:
     return HEAPU8[$0 + 1185616 | 0];
    case 1:
     $0 = $0 + 1185616 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8;
    case 2:
     $1 = $0 + 1185616 | 0;
     return HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | HEAPU8[$0 + 1185618 | 0] << 16;
    case 3:
     break label$4;
    default:
     break label$1;
    }
   }
   $0 = $0 + 1185616 | 0;
   return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  }
  $3 = HEAPU8[$0 + 1185616 | 0] >>> ($1 & 7) & 255 >>> 8 - $2;
 }
 return $3 | 0;
}
function nst_DiagArrGet($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0, $6 = 0;
 $5 = $2 >>> 16 | 0;
 if (!(HEAP32[165313] <= ($0 | 0) | ($5 + $3 | 0) > HEAPU16[$1 >> 1])) {
  $0 = Math_imul($0, 2056);
  $6 = HEAPU16[$0 + 531716 >> 1] + 7 >>> 3 | 0;
  $4 = $2 & 65535;
  if ($6 >>> 0 < $4 >>> 0) {
   $1 = HEAP32[832];
   $0 = $1 + HEAPU16[592795] | 0;
   HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   $0 = $1 + HEAPU16[592794] | 0;
   HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   HEAP32[296536] = 2;
   HEAP32[296551] = -1;
   return 2;
  }
  $4 = ($0 + $4 | 0) + 530688 | 0;
  $0 = $6 - $2 & 65535;
  memcpy(($1 + 4 | 0) + $5 | 0, $4, ($0 | 0) > ($3 | 0) ? $3 : $0);
  return 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function __vfprintf_internal($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0;
 $3 = global$0 - 208 | 0;
 global$0 = $3;
 HEAP32[$3 + 204 >> 2] = $2;
 $2 = 0;
 memset($3 + 160 | 0, 0, 40);
 HEAP32[$3 + 200 >> 2] = HEAP32[$3 + 204 >> 2];
 label$1 : {
  if ((printf_core(0, $1, $3 + 200 | 0, $3 + 80 | 0, $3 + 160 | 0) | 0) < 0) {
   break label$1;
  }
  $2 = HEAP32[$0 + 76 >> 2] >= 0 ? 1 : $2;
  $4 = HEAP32[$0 >> 2];
  if (HEAP8[$0 + 74 | 0] <= 0) {
   HEAP32[$0 >> 2] = $4 & -33;
  }
  $5 = $4 & 32;
  label$4 : {
   if (HEAP32[$0 + 48 >> 2]) {
    printf_core($0, $1, $3 + 200 | 0, $3 + 80 | 0, $3 + 160 | 0);
    break label$4;
   }
   HEAP32[$0 + 48 >> 2] = 80;
   HEAP32[$0 + 16 >> 2] = $3 + 80;
   HEAP32[$0 + 28 >> 2] = $3;
   HEAP32[$0 + 20 >> 2] = $3;
   $4 = HEAP32[$0 + 44 >> 2];
   HEAP32[$0 + 44 >> 2] = $3;
   printf_core($0, $1, $3 + 200 | 0, $3 + 80 | 0, $3 + 160 | 0);
   if (!$4) {
    break label$4;
   }
   FUNCTION_TABLE[HEAP32[$0 + 36 >> 2]]($0, 0, 0) | 0;
   HEAP32[$0 + 48 >> 2] = 0;
   HEAP32[$0 + 44 >> 2] = $4;
   HEAP32[$0 + 28 >> 2] = 0;
   HEAP32[$0 + 16 >> 2] = 0;
   HEAP32[$0 + 20 >> 2] = 0;
  }
  HEAP32[$0 >> 2] = HEAP32[$0 >> 2] | $5;
  if (!$2) {
   break label$1;
  }
 }
 global$0 = $3 + 208 | 0;
}
function ladder_timer_off($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $4 = HEAP32[$0 + 4 >> 2];
 $5 = $4 & -335544321;
 HEAP32[$0 + 4 >> 2] = $5;
 $2 = HEAP32[832] + HEAPU16[592795] | 0;
 $3 = HEAPU8[$2 | 0];
 $7 = $0;
 label$1 : {
  label$2 : {
   label$3 : {
    $6 = $4 & 16777215;
    if ($6) {
     $3 = ($3 | HEAPU8[$2 + 1 | 0] << 8 | HEAPU8[$2 + 2 | 0] << 16 | HEAPU8[$2 + 3 | 0] << 24) + 12 | 0;
     break label$3;
    }
    $3 = ($3 | HEAPU8[$2 + 1 | 0] << 8 | HEAPU8[$2 + 2 | 0] << 16 | HEAPU8[$2 + 3 | 0] << 24) + 12 | 0;
    if (HEAP8[$3 | 0] & 1) {
     break label$3;
    }
    HEAP32[$0 >> 2] = HEAP32[165315];
    $1 = $4 & -369098752 | ($1 ? $1 & 16777215 : 1);
    break label$2;
   }
   $1 = $4 & -369098752;
   if (HEAP8[$3 | 0] & 1) {
    break label$2;
   }
   if (!$6 | $4 & 16777216 | (HEAP32[$0 >> 2] + ($6 - HEAP32[165315] | 0) | 0) > 0) {
    break label$1;
   }
   $1 = $5 | 16777216;
  }
  $5 = $1;
  HEAP32[$7 + 4 >> 2] = $5;
 }
 $1 = $5 & -33554433;
 HEAP32[$0 + 4 >> 2] = $1;
 HEAP32[$0 + 4 >> 2] = $1 | (HEAP8[(HEAPU8[$2 | 0] | HEAPU8[$2 + 1 | 0] << 8 | (HEAPU8[$2 + 2 | 0] << 16 | HEAPU8[$2 + 3 | 0] << 24)) + 12 | 0] & 1) << 25;
 return 0;
}
function nst_PLCIntOutpGet($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0;
 if (!((3840 - $0 | 0) >= ($1 | 0) ? ($0 | 0) <= 3840 : 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $2 = HEAP32[833];
 $3 = ($0 | 0) / 8 | 0;
 label$2 : {
  if (!($1 & 7)) {
   $0 = 0;
   label$4 : {
    switch (__wasm_rotl_i32($1 + -8 | 0, 29) | 0) {
    case 0:
     return HEAPU8[$2 + $3 | 0];
    case 1:
     $0 = $2 + $3 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8;
    case 2:
     $0 = $2 + $3 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | HEAPU8[$0 + 2 | 0] << 16;
    case 3:
     break label$4;
    default:
     break label$2;
    }
   }
   $0 = $2 + $3 | 0;
   return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  }
  $0 = HEAPU8[$2 + $3 | 0] >>> ($0 & 7) & 255 >>> 8 - $1;
 }
 return $0 | 0;
}
function nst_PLCIntInpGet($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0;
 if (!((3840 - $0 | 0) >= ($1 | 0) ? ($0 | 0) <= 3840 : 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $2 = HEAP32[834];
 $3 = ($0 | 0) / 8 | 0;
 label$2 : {
  if (!($1 & 7)) {
   $0 = 0;
   label$4 : {
    switch (__wasm_rotl_i32($1 + -8 | 0, 29) | 0) {
    case 0:
     return HEAPU8[$2 + $3 | 0];
    case 1:
     $0 = $2 + $3 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8;
    case 2:
     $0 = $2 + $3 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | HEAPU8[$0 + 2 | 0] << 16;
    case 3:
     break label$4;
    default:
     break label$2;
    }
   }
   $0 = $2 + $3 | 0;
   return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  }
  $0 = HEAPU8[$2 + $3 | 0] >>> ($0 & 7) & 255 >>> 8 - $1;
 }
 return $0 | 0;
}
function str_to_int($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0;
 $3 = $0 + 4 | 0;
 label$1 : {
  label$2 : {
   $2 = HEAPU16[$0 >> 1];
   if ($2) {
    $0 = 0;
    while (1) {
     if (!HEAPU8[$0 + $3 | 0]) {
      break label$2;
     }
     $0 = $0 + 1 | 0;
     if (($2 | 0) != ($0 | 0)) {
      continue;
     }
     break;
    }
   }
   $2 = HEAP32[832];
   $0 = $2 + HEAPU16[592795] | 0;
   HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   $0 = $2 + HEAPU16[592794] | 0;
   HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
   HEAP32[296536] = 2;
   HEAP32[296551] = -1;
   break label$1;
  }
  if ($0 >>> 0 < 256) {
   break label$1;
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 return strtox($3, $1) | 0;
}
function nst_OutpArrSet($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0;
 $4 = $2 >>> 16 | 0;
 if (($4 + $3 | 0) > HEAPU16[$1 >> 1]) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 if (HEAP32[165313] > ($0 | 0)) {
  $5 = Math_imul($0, 2056);
  $0 = (HEAPU16[$5 + 531714 >> 1] + 7 >>> 3 | 0) - $2 & 65535;
  memcpy(($5 + ($2 & 65535) | 0) + 530176 | 0, ($1 + 4 | 0) + $4 | 0, ($0 | 0) > ($3 | 0) ? $3 : $0);
  return 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function ladder_timer_on($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $4 = HEAP32[$0 + 4 >> 2];
 $2 = $4 & -335544321;
 HEAP32[$0 + 4 >> 2] = $2;
 $5 = HEAP32[832];
 $6 = HEAPU16[592795];
 $3 = $5 + $6 | 0;
 $3 = HEAP8[(HEAPU8[$3 | 0] | HEAPU8[$3 + 1 | 0] << 8 | (HEAPU8[$3 + 2 | 0] << 16 | HEAPU8[$3 + 3 | 0] << 24)) + 12 | 0] & 1;
 $7 = $0;
 label$1 : {
  label$2 : {
   if (!($4 & 33554432)) {
    if ($3) {
     HEAP32[$0 >> 2] = HEAP32[165315];
     $1 = $4 & -352321536 | ($1 ? $1 & 16777215 : 1);
     break label$2;
    }
    $6 = HEAPU16[592795];
    $5 = HEAP32[832];
    break label$1;
   }
   $1 = $4 & -369098752;
   if (!$3) {
    break label$2;
   }
   if ($4 & 16777216 | (HEAP32[$0 >> 2] + (($4 & 16777215) - HEAP32[165315] | 0) | 0) > 0) {
    break label$1;
   }
   $1 = $2 | 16777216;
  }
  $2 = $1;
  HEAP32[$7 + 4 >> 2] = $2;
 }
 $1 = $2 & -33554433;
 HEAP32[$0 + 4 >> 2] = $1;
 $2 = $0;
 $0 = $5 + $6 | 0;
 HEAP32[$2 + 4 >> 2] = $1 | (HEAP8[(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + 12 | 0] & 1) << 25;
 return 0;
}
function _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E($0, $1) {
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 $2 = $1;
 if (!$2) {
  $0 = ($0 >>> 0) / 10 | 0;
  i64toi32_i32$HIGH_BITS = 0;
  return $0;
 }
 $6 = 61 - Math_clz32($2) | 0;
 $8 = 0 - $6 | 0;
 $5 = $1;
 $3 = $0;
 $2 = $6 & 63;
 $4 = $2 & 31;
 if (32 <= $2 >>> 0) {
  $2 = 0;
  $4 = $5 >>> $4 | 0;
 } else {
  $2 = $5 >>> $4 | 0;
  $4 = ((1 << $4) - 1 & $5) << 32 - $4 | $3 >>> $4;
 }
 $5 = $2;
 $2 = $8 & 63;
 $3 = $2 & 31;
 if (32 <= $2 >>> 0) {
  $2 = $0 << $3;
  $0 = 0;
 } else {
  $2 = (1 << $3) - 1 & $0 >>> 32 - $3 | $1 << $3;
  $0 = $0 << $3;
 }
 $1 = $2;
 if ($6) {
  $2 = 0;
  while (1) {
   $3 = $4 << 1 | $1 >>> 31;
   $8 = $3;
   $5 = $5 << 1 | $4 >>> 31;
   $3 = $2 - ($5 + (9 < $3 >>> 0) | 0) >> 31;
   $7 = $3 & 10;
   $4 = $8 - $7 | 0;
   $5 = $5 - ($8 >>> 0 < $7 >>> 0) | 0;
   $1 = $1 << 1 | $0 >>> 31;
   $0 = $9 | $0 << 1;
   $7 = $3 & 1;
   $9 = $7;
   $6 = $6 + -1 | 0;
   if ($6) {
    continue;
   }
   break;
  }
 }
 i64toi32_i32$HIGH_BITS = $1 << 1 | $0 >>> 31;
 return $7 | $0 << 1;
}
function nst_DiagIntGet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0;
 label$1 : {
  if (HEAP32[165313] <= ($0 | 0) | ($1 + $2 | 0) > HEAPU16[Math_imul($0, 2056) + 531716 >> 1]) {
   break label$1;
  }
  $3 = ($1 | 0) / 8 | 0;
  if (!($2 & 7)) {
   label$3 : {
    switch (__wasm_rotl_i32($2 + -8 | 0, 29) | 0) {
    case 0:
     return HEAPU8[(Math_imul($0, 2056) + $3 | 0) + 530688 | 0];
    case 1:
     $0 = (Math_imul($0, 2056) + $3 | 0) + 530688 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8;
    case 2:
     $0 = Math_imul($0, 2056) + $3 | 0;
     $1 = $0 + 530688 | 0;
     return HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | HEAPU8[$0 + 530690 | 0] << 16;
    case 3:
     break label$3;
    default:
     break label$1;
    }
   }
   $0 = (Math_imul($0, 2056) + $3 | 0) + 530688 | 0;
   return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  }
  $4 = HEAPU8[(Math_imul($0, 2056) + $3 | 0) + 530688 | 0] >>> ($1 & 7) & 255 >>> 8 - $2;
 }
 return $4 | 0;
}
function nst_InpIntGet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0;
 label$1 : {
  if (HEAP32[165313] <= ($0 | 0) | ($1 + $2 | 0) > HEAPU16[Math_imul($0, 2056) + 531712 >> 1]) {
   break label$1;
  }
  $3 = ($1 | 0) / 8 | 0;
  if (!($2 & 7)) {
   label$3 : {
    switch (__wasm_rotl_i32($2 + -8 | 0, 29) | 0) {
    case 0:
     return HEAPU8[(Math_imul($0, 2056) + $3 | 0) + 529664 | 0];
    case 1:
     $0 = (Math_imul($0, 2056) + $3 | 0) + 529664 | 0;
     return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8;
    case 2:
     $0 = Math_imul($0, 2056) + $3 | 0;
     $1 = $0 + 529664 | 0;
     return HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | HEAPU8[$0 + 529666 | 0] << 16;
    case 3:
     break label$3;
    default:
     break label$1;
    }
   }
   $0 = (Math_imul($0, 2056) + $3 | 0) + 529664 | 0;
   return HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  }
  $4 = HEAPU8[(Math_imul($0, 2056) + $3 | 0) + 529664 | 0] >>> ($1 & 7) & 255 >>> 8 - $2;
 }
 return $4 | 0;
}
function str_copy($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0;
 $3 = $1 + 4 | 0;
 $4 = HEAPU16[$1 >> 1];
 $1 = 0;
 label$1 : {
  $2 = HEAPU16[$0 >> 1];
  label$2 : {
   if (!$2) {
    break label$2;
   }
   $0 = $0 + 4 | 0;
   while (1) {
    if (($1 | 0) == ($4 | 0)) {
     break label$1;
    }
    $5 = HEAPU8[$0 + $1 | 0];
    if (!$5) {
     break label$2;
    }
    HEAP8[$1 + $3 | 0] = $5;
    $1 = $1 + 1 | 0;
    if (($2 | 0) != ($1 | 0)) {
     continue;
    }
    break;
   }
   $1 = $2;
  }
  if ($1 >>> 0 >= $4 >>> 0) {
   break label$1;
  }
  HEAP8[$1 + $3 | 0] = 0;
  return 0;
 }
 $1 = HEAP32[832];
 $0 = $1 + HEAPU16[592795] | 0;
 HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 $0 = $1 + HEAPU16[592794] | 0;
 HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
 HEAP32[296536] = 2;
 HEAP32[296551] = -1;
 return 2;
}
function ladder_timer_start($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $4 = HEAP32[$0 + 4 >> 2];
 $5 = $4 & -335544321;
 $2 = $5 | 268435456;
 HEAP32[$0 + 4 >> 2] = $2;
 $7 = $0;
 $6 = HEAP32[832] + HEAPU16[592795] | 0;
 $3 = $6;
 label$1 : {
  label$2 : {
   if (HEAP8[(HEAPU8[$3 | 0] | HEAPU8[$3 + 1 | 0] << 8 | (HEAPU8[$3 + 2 | 0] << 16 | HEAPU8[$3 + 3 | 0] << 24)) + 12 | 0] & 1) {
    HEAP32[$0 >> 2] = HEAP32[165315];
    $2 = $2 & -100663296 | ($1 ? $1 & 16777215 : 1);
    break label$2;
   }
   $1 = $4 & 16777215;
   if (!$1 | $4 & 16777216 | (HEAP32[$0 >> 2] + ($1 - HEAP32[165315] | 0) | 0) > 0) {
    break label$1;
   }
   $2 = $5 | 285212672;
  }
  HEAP32[$7 + 4 >> 2] = $2;
 }
 $1 = $2 & -33554433;
 HEAP32[$0 + 4 >> 2] = $1;
 $2 = $0;
 $0 = $6;
 HEAP32[$2 + 4 >> 2] = $1 | (HEAP8[(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + 12 | 0] & 1) << 25;
 return 0;
}
function ladder_count_up($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 $4 = HEAP32[$0 + 4 >> 2];
 $2 = $4 | 67108864;
 HEAP32[$0 + 4 >> 2] = $2;
 $5 = HEAPU16[592795];
 $6 = HEAP32[832];
 label$1 : {
  if ($4 & 33554432) {
   break label$1;
  }
  $3 = $5 + $6 | 0;
  if (!(HEAP8[(HEAPU8[$3 | 0] | HEAPU8[$3 + 1 | 0] << 8 | (HEAPU8[$3 + 2 | 0] << 16 | HEAPU8[$3 + 3 | 0] << 24)) + 12 | 0] & 1)) {
   break label$1;
  }
  $1 = $1 & 16777215;
  $2 = $1 | $2 & -16777216;
  HEAP32[$0 + 4 >> 2] = $2;
  $3 = HEAP32[$0 >> 2] + 1 | 0;
  HEAP32[$0 >> 2] = $3;
  if ($4 & 16777216 | $3 >>> 0 < $1 >>> 0) {
   break label$1;
  }
  $2 = $2 | 16777216;
  HEAP32[$0 + 4 >> 2] = $2;
 }
 $1 = $2 & -33554433;
 HEAP32[$0 + 4 >> 2] = $1;
 $2 = $0;
 $0 = $5 + $6 | 0;
 HEAP32[$2 + 4 >> 2] = $1 | (HEAP8[(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + 12 | 0] & 1) << 25;
 return 0;
}
function nst_ladder_trace($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 $2 = HEAP32[832] + HEAPU16[592795] | 0;
 if (HEAP8[(HEAPU8[$2 | 0] | HEAPU8[$2 + 1 | 0] << 8 | (HEAPU8[$2 + 2 | 0] << 16 | HEAPU8[$2 + 3 | 0] << 24)) + 12 | 0] & 1) {
  $3 = HEAPU16[592796] & 65532;
  $6 = $3 + 4402 | 0;
  $7 = HEAPU8[$6 | 0];
  $2 = $3 + 4400 | 0;
  $8 = HEAPU16[$2 >> 1];
  $4 = Math_imul($8, 12);
  HEAP32[($4 + 4 & 65532) + $2 >> 2] = HEAP32[165315];
  HEAP8[($4 + 8 & 65532) + $2 | 0] = $7;
  $5 = ($4 + 9 & 65533) + $2 | 0;
  HEAP8[$5 + 2 | 0] = $1 >>> 16;
  HEAP8[$5 + 1 | 0] = $1 >>> 8;
  HEAP8[$5 | 0] = $1;
  $1 = ($4 + 12 & 65532) + $2 | 0;
  HEAP8[$1 + 3 | 0] = $0 >>> 24;
  HEAP8[$1 + 2 | 0] = $0 >>> 16;
  HEAP8[$1 + 1 | 0] = $0 >>> 8;
  HEAP8[$1 | 0] = $0;
  HEAP8[$3 + 4403 | 0] = 0;
  HEAP8[$6 | 0] = $7 + 1;
  HEAP8[$3 + 4401 | 0] = 0;
  HEAP8[$2 | 0] = ($8 + 1 >>> 0) % 50;
 }
 return 0;
}
function memchr($0, $1) {
 var $2 = 0;
 $2 = ($1 | 0) != 0;
 label$1 : {
  label$2 : {
   label$3 : {
    if (!$1 | !($0 & 3)) {
     break label$3;
    }
    while (1) {
     if (!HEAPU8[$0 | 0]) {
      break label$2;
     }
     $0 = $0 + 1 | 0;
     $1 = $1 + -1 | 0;
     $2 = ($1 | 0) != 0;
     if (!$1) {
      break label$3;
     }
     if ($0 & 3) {
      continue;
     }
     break;
    }
   }
   if (!$2) {
    break label$1;
   }
  }
  label$5 : {
   if (!HEAPU8[$0 | 0] | $1 >>> 0 < 4) {
    break label$5;
   }
   while (1) {
    $2 = HEAP32[$0 >> 2];
    if (($2 ^ -1) & $2 + -16843009 & -2139062144) {
     break label$5;
    }
    $0 = $0 + 4 | 0;
    $1 = $1 + -4 | 0;
    if ($1 >>> 0 > 3) {
     continue;
    }
    break;
   }
  }
  if (!$1) {
   break label$1;
  }
  while (1) {
   if (!HEAPU8[$0 | 0]) {
    return $0;
   }
   $0 = $0 + 1 | 0;
   $1 = $1 + -1 | 0;
   if ($1) {
    continue;
   }
   break;
  }
 }
 return 0;
}
function ladder_count_down($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 $4 = HEAP32[$0 + 4 >> 2];
 $2 = $4 | 67108864;
 HEAP32[$0 + 4 >> 2] = $2;
 $5 = HEAPU16[592795];
 $6 = HEAP32[832];
 label$1 : {
  if ($4 & 134217728) {
   break label$1;
  }
  $3 = $5 + $6 | 0;
  if (!(HEAP8[(HEAPU8[$3 | 0] | HEAPU8[$3 + 1 | 0] << 8 | (HEAPU8[$3 + 2 | 0] << 16 | HEAPU8[$3 + 3 | 0] << 24)) + 12 | 0] & 1)) {
   break label$1;
  }
  $2 = $2 & -16777216 | $1 & 16777215;
  HEAP32[$0 + 4 >> 2] = $2;
  $3 = HEAP32[$0 >> 2] + -1 | 0;
  HEAP32[$0 >> 2] = $3;
  if ($4 & 16777216 | ($3 | 0) > ($1 | 0)) {
   break label$1;
  }
  $2 = $2 | 16777216;
  HEAP32[$0 + 4 >> 2] = $2;
 }
 $1 = $2 & -134217729;
 HEAP32[$0 + 4 >> 2] = $1;
 $2 = $0;
 $0 = $5 + $6 | 0;
 HEAP32[$2 + 4 >> 2] = $1 | (HEAP8[(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + 12 | 0] & 1) << 27;
 return 0;
}
function wcrtomb($0, $1) {
 label$1 : {
  if ($0) {
   if ($1 >>> 0 <= 127) {
    break label$1;
   }
   label$3 : {
    if (!HEAP32[HEAP32[1084] >> 2]) {
     if (($1 & -128) == 57216) {
      break label$1;
     }
     break label$3;
    }
    if ($1 >>> 0 <= 2047) {
     HEAP8[$0 + 1 | 0] = $1 & 63 | 128;
     HEAP8[$0 | 0] = $1 >>> 6 | 192;
     return 2;
    }
    if (!(($1 & -8192) != 57344 ? $1 >>> 0 >= 55296 : 0)) {
     HEAP8[$0 + 2 | 0] = $1 & 63 | 128;
     HEAP8[$0 | 0] = $1 >>> 12 | 224;
     HEAP8[$0 + 1 | 0] = $1 >>> 6 & 63 | 128;
     return 3;
    }
    if ($1 + -65536 >>> 0 <= 1048575) {
     HEAP8[$0 + 3 | 0] = $1 & 63 | 128;
     HEAP8[$0 | 0] = $1 >>> 18 | 240;
     HEAP8[$0 + 2 | 0] = $1 >>> 6 & 63 | 128;
     HEAP8[$0 + 1 | 0] = $1 >>> 12 & 63 | 128;
     return 4;
    }
   }
   HEAP32[296784] = 25;
   $0 = -1;
  } else {
   $0 = 1;
  }
  return $0;
 }
 HEAP8[$0 | 0] = $1;
 return 1;
}
function writeObjWithOffsets($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 label$1 : {
  $1 = findObj(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24));
  if (!$1) {
   break label$1;
  }
  $3 = HEAPU8[$0 + 8 | 0] | HEAPU8[$0 + 9 | 0] << 8 | (HEAPU8[$0 + 10 | 0] << 16 | HEAPU8[$0 + 11 | 0] << 24);
  $6 = FUNCTION_TABLE[HEAP32[$1 + 16 >> 2]](HEAPU8[$0 + 4 | 0] | HEAPU8[$0 + 5 | 0] << 8 | (HEAPU8[$0 + 6 | 0] << 16 | HEAPU8[$0 + 7 | 0] << 24)) | 0;
  if (!$3) {
   break label$1;
  }
  $1 = 12;
  while (1) {
   $2 = $0 + $1 | 0;
   $4 = HEAPU8[$2 + 2 | 0] | HEAPU8[$2 + 3 | 0] << 8;
   $1 = $1 + 4 | 0;
   memcpy((HEAPU8[$2 | 0] | HEAPU8[$2 + 1 | 0] << 8) + $6 | 0, $1 + $0 | 0, $4);
   $1 = $1 + $4 | 0;
   $5 = $5 + 1 | 0;
   if (($5 | 0) != ($3 | 0)) {
    continue;
   }
   break;
  }
 }
}
function __fwritex($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0;
 label$1 : {
  $3 = HEAP32[$2 + 16 >> 2];
  if (!$3) {
   if (__towrite($2)) {
    break label$1;
   }
   $3 = HEAP32[$2 + 16 >> 2];
  }
  $5 = HEAP32[$2 + 20 >> 2];
  if ($3 - $5 >>> 0 < $1 >>> 0) {
   FUNCTION_TABLE[HEAP32[$2 + 36 >> 2]]($2, $0, $1) | 0;
   return;
  }
  label$5 : {
   if (HEAP8[$2 + 75 | 0] < 0) {
    break label$5;
   }
   $3 = $1;
   while (1) {
    $4 = $3;
    if (!$4) {
     break label$5;
    }
    $3 = $4 + -1 | 0;
    if (HEAPU8[$3 + $0 | 0] != 10) {
     continue;
    }
    break;
   }
   if (FUNCTION_TABLE[HEAP32[$2 + 36 >> 2]]($2, $0, $4) >>> 0 < $4 >>> 0) {
    break label$1;
   }
   $0 = $0 + $4 | 0;
   $1 = $1 - $4 | 0;
   $5 = HEAP32[$2 + 20 >> 2];
  }
  memcpy($5, $0, $1);
  HEAP32[$2 + 20 >> 2] = HEAP32[$2 + 20 >> 2] + $1;
 }
}
function nst_PLCOutpSet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0;
 label$1 : {
  label$2 : {
   if (($1 | 0) > 480) {
    break label$2;
   }
   $3 = 480 - $1 | 0;
   if (($3 | 0) < ($2 | 0)) {
    break label$2;
   }
   if (HEAPU16[$0 >> 1] >= ($2 | 0)) {
    break label$1;
   }
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $4 = $0 + 4 | 0;
 $0 = $3 & 65535;
 memcpy(HEAP32[833] + $1 | 0, $4, ($0 | 0) > ($2 | 0) ? $2 : $0);
 return 0;
}
function nst_PLCInpGet($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0;
 label$1 : {
  label$2 : {
   if (($1 | 0) > 480) {
    break label$2;
   }
   $3 = 480 - $1 | 0;
   if (($3 | 0) < ($2 | 0)) {
    break label$2;
   }
   if (HEAPU16[$0 >> 1] >= ($2 | 0)) {
    break label$1;
   }
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $4 = $0 + 4 | 0;
 $0 = $3 & 65535;
 memcpy($4, HEAP32[834] + $1 | 0, ($0 | 0) > ($2 | 0) ? $2 : $0);
 return 0;
}
function __multi3($0, $1, $2, $3) {
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 $9 = $0;
 $4 = __wasm_i64_mul($3, 0, 0);
 $5 = $4;
 $8 = i64toi32_i32$HIGH_BITS;
 $4 = $4 >>> 0 < 0 ? $8 + 1 | 0 : $8;
 $8 = __wasm_i64_mul($2, 0, $1);
 $6 = i64toi32_i32$HIGH_BITS;
 $7 = __wasm_i64_mul($2, 0, 0);
 $6 = $6 + $7 | 0;
 $2 = $6;
 $6 = $5;
 $5 = i64toi32_i32$HIGH_BITS;
 $5 = $2 >>> 0 < $7 >>> 0 ? $5 + 1 | 0 : $5;
 $7 = $6 + $5 | 0;
 $6 = $7;
 $4 = $7 >>> 0 < $5 >>> 0 ? $4 + 1 | 0 : $4;
 $1 = __wasm_i64_mul($1, 0, $3);
 $3 = i64toi32_i32$HIGH_BITS;
 $1 = $1 + $2 | 0;
 if ($1 >>> 0 < $2 >>> 0) {
  $3 = $3 + 1 | 0;
 }
 $2 = $3 + $6 | 0;
 HEAP32[$0 + 8 >> 2] = $2;
 HEAP32[$9 + 12 >> 2] = $2 >>> 0 < $3 >>> 0 ? $4 + 1 | 0 : $4;
 HEAP32[$0 >> 2] = $8;
 HEAP32[$0 + 4 >> 2] = $1;
}
function nst_trace($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 $3 = HEAPU16[592796] & 65532;
 $6 = $3 + 4402 | 0;
 $7 = HEAPU8[$6 | 0];
 $2 = $3 + 4400 | 0;
 $8 = HEAPU16[$2 >> 1];
 $4 = Math_imul($8, 12);
 HEAP32[($4 + 4 & 65532) + $2 >> 2] = HEAP32[165315];
 HEAP8[($4 + 8 & 65532) + $2 | 0] = $7;
 $5 = ($4 + 9 & 65533) + $2 | 0;
 HEAP8[$5 + 2 | 0] = $1 >>> 16;
 HEAP8[$5 + 1 | 0] = $1 >>> 8;
 HEAP8[$5 | 0] = $1;
 $1 = ($4 + 12 & 65532) + $2 | 0;
 HEAP8[$1 + 3 | 0] = $0 >>> 24;
 HEAP8[$1 + 2 | 0] = $0 >>> 16;
 HEAP8[$1 + 1 | 0] = $0 >>> 8;
 HEAP8[$1 | 0] = $0;
 HEAP8[$3 + 4403 | 0] = 0;
 HEAP8[$6 | 0] = $7 + 1;
 HEAP8[$3 + 4401 | 0] = 0;
 HEAP8[$2 | 0] = ($8 + 1 >>> 0) % 50;
 return 0;
}
function ladder_assign($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0, $5 = 0;
 $4 = HEAP32[832] + HEAPU16[592795] | 0;
 if (HEAP8[(HEAPU8[$4 | 0] | HEAPU8[$4 + 1 | 0] << 8 | (HEAPU8[$4 + 2 | 0] << 16 | HEAPU8[$4 + 3 | 0] << 24)) + 12 | 0] & 1) {
  $4 = $3 + -35 | 0;
  if ($4 >>> 0 <= 1) {
   setIO_PLC_var($0, $4, $1);
   return 0;
  }
  label$3 : {
   switch ($3 + -32 | 0) {
   case 1:
    HEAP8[$0 | 0] = $1;
    return 0;
   case 2:
    HEAP16[$0 >> 1] = $1;
    return 0;
   default:
    $4 = $0;
    $5 = HEAP32[$0 >> 2];
    $0 = -1 << $3 ^ -1;
    HEAP32[$4 >> 2] = $5 & ($0 << $2 ^ -1) | ($0 & $1) << $2;
    return 0;
   case 0:
    break label$3;
   }
  }
  HEAP32[$0 >> 2] = $1;
 }
 return 0;
}
function nst_BE_UINT32_SET($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 4 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 $1 = $2 << 8 & 16711680 | $2 << 24 | ($2 >>> 8 & 65280 | $2 >>> 24);
 HEAP8[$0 + 4 | 0] = $1;
 HEAP8[$0 + 5 | 0] = $1 >>> 8;
 HEAP8[$0 + 6 | 0] = $1 >>> 16;
 HEAP8[$0 + 7 | 0] = $1 >>> 24;
 return 0;
}
function str_len($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0;
 $1 = HEAPU16[$0 >> 1];
 label$1 : {
  if ($1) {
   $2 = $0 + 4 | 0;
   $0 = 0;
   while (1) {
    if (!HEAPU8[$0 + $2 | 0]) {
     break label$1;
    }
    $0 = $0 + 1 | 0;
    if (($1 | 0) != ($0 | 0)) {
     continue;
    }
    break;
   }
  }
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = 2;
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
 }
 return $0 | 0;
}
function fmt_u($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0;
 label$1 : {
  if (($1 | 0) == 1 & $0 >>> 0 < 0 | $1 >>> 0 < 1) {
   $3 = $0;
   break label$1;
  }
  while (1) {
   $2 = $2 + -1 | 0;
   $3 = _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E($0, $1);
   $4 = i64toi32_i32$HIGH_BITS;
   $5 = $4;
   HEAP8[$2 | 0] = $0 - __wasm_i64_mul($3, $4, 10) | 48;
   $4 = $1 >>> 0 > 9;
   $0 = $3;
   $1 = $5;
   if ($4) {
    continue;
   }
   break;
  }
 }
 if ($3) {
  while (1) {
   $2 = $2 + -1 | 0;
   $0 = ($3 >>> 0) / 10 | 0;
   HEAP8[$2 | 0] = $3 - Math_imul($0, 10) | 48;
   $1 = $3 >>> 0 > 9;
   $3 = $0;
   if ($1) {
    continue;
   }
   break;
  }
 }
 return $2;
}
function nst_BE_UINT32_GET($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 4 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 $0 = HEAPU8[$0 + 4 | 0] | HEAPU8[$0 + 5 | 0] << 8 | (HEAPU8[$0 + 6 | 0] << 16 | HEAPU8[$0 + 7 | 0] << 24);
 return $0 << 24 | $0 << 8 & 16711680 | ($0 >>> 8 & 65280 | $0 >>> 24);
}
function nst_LE_UINT32_SET($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 4 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 HEAP8[$0 + 4 | 0] = $2;
 HEAP8[$0 + 5 | 0] = $2 >>> 8;
 HEAP8[$0 + 6 | 0] = $2 >>> 16;
 HEAP8[$0 + 7 | 0] = $2 >>> 24;
 return 0;
}
function nst_BE_UINT16_SET($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 2 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 $1 = ($2 << 8 & 16711680 | $2 << 24) >>> 16 | 0;
 HEAP8[$0 + 4 | 0] = $1;
 HEAP8[$0 + 5 | 0] = $1 >>> 8;
 return 0;
}
function ladder_coil($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $2 = $2 + -35 | 0;
 if ($2 >>> 0 <= 1) {
  $1 = $0;
  $0 = HEAP32[832] + HEAPU16[592795] | 0;
  setIO_PLC_var($1, $2, HEAP8[(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + 12 | 0] & 1);
  return 0;
 }
 $2 = 1 << $1;
 $1 = HEAP32[832] + HEAPU16[592795] | 0;
 if (HEAP8[(HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24)) + 12 | 0] & 1) {
  HEAP32[$0 >> 2] = $2 | HEAP32[$0 >> 2];
  return 0;
 }
 HEAP32[$0 >> 2] = HEAP32[$0 >> 2] & ($2 ^ -1);
 return 0;
}
function __stpcpy($0) {
 var $1 = 0, $2 = 0;
 $2 = 1185616;
 label$1 : {
  if (($0 ^ 1185616) & 3) {
   break label$1;
  }
  $1 = HEAP32[296404];
  if (($1 ^ -1) & $1 + -16843009 & -2139062144) {
   break label$1;
  }
  while (1) {
   HEAP32[$0 >> 2] = $1;
   $1 = HEAP32[$2 + 4 >> 2];
   $0 = $0 + 4 | 0;
   $2 = $2 + 4 | 0;
   if (!($1 + -16843009 & ($1 ^ -1) & -2139062144)) {
    continue;
   }
   break;
  }
 }
 $1 = HEAPU8[$2 | 0];
 HEAP8[$0 | 0] = $1;
 if ($1) {
  while (1) {
   $1 = HEAPU8[$2 + 1 | 0];
   HEAP8[$0 + 1 | 0] = $1;
   $0 = $0 + 1 | 0;
   $2 = $2 + 1 | 0;
   if ($1) {
    continue;
   }
   break;
  }
 }
}
function nst_LE_UINT32_GET($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 4 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 return HEAPU8[$0 + 4 | 0] | HEAPU8[$0 + 5 | 0] << 8 | (HEAPU8[$0 + 6 | 0] << 16 | HEAPU8[$0 + 7 | 0] << 24);
}
function nst_LE_UINT16_SET($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 2 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 HEAP8[$0 + 4 | 0] = $2;
 HEAP8[$0 + 5 | 0] = $2 >>> 8;
 return 0;
}
function nst_LE_UINT16_GET($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 2 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 return HEAPU8[$0 + 4 | 0] | HEAPU8[$0 + 5 | 0] << 8;
}
function nst_BE_UINT16_GET($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 if (HEAPU16[$0 >> 1] < ($1 + 2 | 0)) {
  $1 = HEAP32[832];
  $0 = $1 + HEAPU16[592795] | 0;
  HEAP32[296540] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  $0 = $1 + HEAPU16[592794] | 0;
  HEAP32[296543] = HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24);
  HEAP32[296536] = 2;
  HEAP32[296551] = -1;
  return 2;
 }
 $0 = $0 + $1 | 0;
 return HEAPU8[$0 + 4 | 0] << 8 | HEAPU8[$0 + 5 | 0];
}
function strtox($0, $1) {
 var $2 = 0, $3 = 0;
 $2 = global$0 - 144 | 0;
 global$0 = $2;
 HEAP32[$2 + 44 >> 2] = $0;
 HEAP32[$2 + 4 >> 2] = $0;
 HEAP32[$2 >> 2] = 0;
 HEAP32[$2 + 76 >> 2] = -1;
 HEAP32[$2 + 8 >> 2] = ($0 | 0) < 0 ? -1 : $0 + 2147483647 | 0;
 HEAP32[$2 + 112 >> 2] = 0;
 HEAP32[$2 + 116 >> 2] = 0;
 $0 = HEAP32[$2 + 8 >> 2];
 $3 = $0 - HEAP32[$2 + 4 >> 2] | 0;
 HEAP32[$2 + 120 >> 2] = $3;
 HEAP32[$2 + 124 >> 2] = $3 >> 31;
 HEAP32[$2 + 104 >> 2] = $0;
 $0 = __intscan($2, $1);
 global$0 = $2 + 144 | 0;
 return $0;
}
function __toread($0) {
 var $1 = 0, $2 = 0;
 $1 = HEAPU8[$0 + 74 | 0];
 HEAP8[$0 + 74 | 0] = $1 + -1 | $1;
 if (HEAPU32[$0 + 20 >> 2] > HEAPU32[$0 + 28 >> 2]) {
  FUNCTION_TABLE[HEAP32[$0 + 36 >> 2]]($0, 0, 0) | 0;
 }
 HEAP32[$0 + 28 >> 2] = 0;
 HEAP32[$0 + 16 >> 2] = 0;
 HEAP32[$0 + 20 >> 2] = 0;
 $1 = HEAP32[$0 >> 2];
 if ($1 & 4) {
  HEAP32[$0 >> 2] = $1 | 32;
  return -1;
 }
 $2 = HEAP32[$0 + 44 >> 2] + HEAP32[$0 + 48 >> 2] | 0;
 HEAP32[$0 + 8 >> 2] = $2;
 HEAP32[$0 + 4 >> 2] = $2;
 return $1 << 27 >> 31;
}
function timerCount($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0;
 $1 = HEAP32[$0 + 4 >> 2];
 label$1 : {
  if (!($1 & 67108864)) {
   $2 = $1 & 16777215;
   if (!$2) {
    return 0;
   }
   $3 = HEAP32[$0 >> 2];
   $4 = HEAP32[165315];
   if (($3 + ($2 - $4 | 0) | 0) <= 0) {
    if (($1 & 285212672) != 268435456) {
     break label$1;
    }
    HEAP32[$0 + 4 >> 2] = $1 | 16777216;
    return $1 & 16777215;
   }
   return $4 - $3 | 0;
  }
  $2 = HEAP32[$0 >> 2];
 }
 return $2 | 0;
}
function nst_extract_bits($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 var $3 = 0, $4 = 0;
 $3 = global$0 - 48 | 0;
 global$0 = $3;
 $4 = 1 << $2;
 HEAP32[$3 + 32 >> 2] = $4;
 iprintf(1586, $3 + 32 | 0);
 $4 = $4 + -1 | 0;
 HEAP32[$3 + 16 >> 2] = $4;
 iprintf(1598, $3 + 16 | 0);
 HEAP32[$3 + 8 >> 2] = $2;
 HEAP32[$3 >> 2] = $0;
 HEAP32[$3 + 4 >> 2] = $1;
 $0 = $4 & $0 >>> $1;
 HEAP32[$3 + 12 >> 2] = $0;
 iprintf(1608, $3);
 global$0 = $3 + 48 | 0;
 return $0 | 0;
}
function setupSectSize($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 HEAP32[165313] = $0 + 1;
 label$1 : {
  switch ($1 | 0) {
  case 0:
   HEAP16[Math_imul($0, 2056) + 531712 >> 1] = $2;
   return;
  case 1:
   HEAP16[Math_imul($0, 2056) + 531714 >> 1] = $2;
   return;
  case 2:
   HEAP16[Math_imul($0, 2056) + 531716 >> 1] = $2;
   return;
  case 3:
   HEAP16[Math_imul($0, 2056) + 531718 >> 1] = $2;
   break;
  default:
   break label$1;
  }
 }
}
function _ZN17compiler_builtins3int3mul3Mul3mul17h070e9a1c69faec5bE($0, $1, $2) {
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 $4 = $2 >>> 16 | 0;
 $3 = $0 >>> 16 | 0;
 $7 = Math_imul($4, $3);
 $5 = $2 & 65535;
 $0 = $0 & 65535;
 $6 = Math_imul($5, $0);
 $3 = ($6 >>> 16 | 0) + Math_imul($3, $5) | 0;
 $0 = ($3 & 65535) + Math_imul($0, $4) | 0;
 i64toi32_i32$HIGH_BITS = $7 + Math_imul($1, $2) + ($3 >>> 16) + ($0 >>> 16) | 0;
 return $6 & 65535 | $0 << 16;
}
function bitmask_insert($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0;
 $2 = HEAP32[296549];
 $1 = HEAP32[$2 + 12 >> 2];
 HEAP32[296538] = $1;
 HEAP32[296537] = $1;
 HEAP32[$2 + 12 >> 2] = $1 + 4;
 $1 = HEAP32[$1 + -1 >> 2];
 $2 = ($1 >>> 16 & 65532) + 4400 | 0;
 $3 = $2;
 $4 = HEAP32[$2 >> 2];
 $2 = -1 << ($1 & 255) ^ -1;
 $1 = $1 >>> 8 & 255;
 HEAP32[$3 >> 2] = $4 & ($2 << $1 ^ -1) | ($0 & $2) << $1;
 return $1 | 0;
}
function pad($0, $1, $2, $3, $4) {
 var $5 = 0;
 $5 = global$0 - 256 | 0;
 global$0 = $5;
 if (!($4 & 73728 | ($2 | 0) <= ($3 | 0))) {
  $2 = $2 - $3 | 0;
  $3 = $2 >>> 0 < 256;
  memset($5, $1 & 255, $3 ? $2 : 256);
  if (!$3) {
   while (1) {
    out($0, $5, 256);
    $2 = $2 + -256 | 0;
    if ($2 >>> 0 > 255) {
     continue;
    }
    break;
   }
  }
  out($0, $5, $2);
 }
 global$0 = $5 + 256 | 0;
}
function strlen() {
 var $0 = 0, $1 = 0, $2 = 0;
 $1 = 1185616;
 while (1) {
  $0 = $1;
  $1 = $0 + 4 | 0;
  $2 = HEAP32[$0 >> 2];
  if (!(($2 ^ -1) & $2 + -16843009 & -2139062144)) {
   continue;
  }
  break;
 }
 if (!($2 & 255)) {
  return $0 - 1185616 | 0;
 }
 while (1) {
  $2 = HEAPU8[$0 + 1 | 0];
  $1 = $0 + 1 | 0;
  $0 = $1;
  if ($2) {
   continue;
  }
  break;
 }
 return $1 - 1185616 | 0;
}
function instr_trace($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0;
 $2 = HEAP32[296549];
 $1 = HEAP32[$2 + 16 >> 2];
 HEAP32[296538] = $1;
 HEAP32[296537] = $1;
 HEAP32[$2 + 16 >> 2] = $1 + 2;
 if ($0 & 1) {
  $1 = HEAPU16[$1 + -1 >> 1];
  $0 = (HEAP32[832] + HEAPU16[592792] | 0) + ($1 >>> 3 & 8188) | 0;
  HEAP32[$0 + 4 >> 2] = HEAP32[$0 + 4 >> 2] | 1 << ($1 & 31);
 }
 return $1 | 0;
}
function __towrite($0) {
 var $1 = 0;
 $1 = HEAPU8[$0 + 74 | 0];
 HEAP8[$0 + 74 | 0] = $1 + -1 | $1;
 $1 = HEAP32[$0 >> 2];
 if ($1 & 8) {
  HEAP32[$0 >> 2] = $1 | 32;
  return -1;
 }
 HEAP32[$0 + 4 >> 2] = 0;
 HEAP32[$0 + 8 >> 2] = 0;
 $1 = HEAP32[$0 + 44 >> 2];
 HEAP32[$0 + 28 >> 2] = $1;
 HEAP32[$0 + 20 >> 2] = $1;
 HEAP32[$0 + 16 >> 2] = $1 + HEAP32[$0 + 48 >> 2];
 return 0;
}
function getIOPtr($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0;
 label$1 : {
  switch ($1 | 0) {
  case 0:
   return Math_imul($0, 2056) + 529664 | 0;
  case 1:
   return Math_imul($0, 2056) + 530176 | 0;
  case 2:
   return Math_imul($0, 2056) + 530688 | 0;
  case 3:
   $2 = Math_imul($0, 2056) + 531200 | 0;
   break;
  default:
   break label$1;
  }
 }
 return $2 | 0;
}
function tm_cnt_expired($0) {
 $0 = $0 | 0;
 var $1 = 0, $2 = 0;
 $1 = HEAP32[$0 + 4 >> 2];
 label$1 : {
  if ($1 & 67108864 | ($1 & 285212672) != 268435456) {
   break label$1;
  }
  $2 = $1 & 16777215;
  if (!$2 | (HEAP32[$0 >> 2] + ($2 - HEAP32[165315] | 0) | 0) > 0) {
   break label$1;
  }
  $1 = $1 | 16777216;
  HEAP32[$0 + 4 >> 2] = $1;
 }
 return $1 >>> 24 & 1;
}
function getint($0) {
 var $1 = 0, $2 = 0, $3 = 0;
 if (HEAP8[HEAP32[$0 >> 2]] + -48 >>> 0 < 10) {
  while (1) {
   $1 = HEAP32[$0 >> 2];
   $3 = HEAP8[$1 | 0];
   HEAP32[$0 >> 2] = $1 + 1;
   $2 = (Math_imul($2, 10) + $3 | 0) + -48 | 0;
   if (HEAP8[$1 + 1 | 0] + -48 >>> 0 < 10) {
    continue;
   }
   break;
  }
 }
 return $2;
}
function bitmask_extract_r0() {
 var $0 = 0, $1 = 0;
 $1 = HEAP32[296549];
 $0 = HEAP32[$1 + 12 >> 2];
 HEAP32[296538] = $0;
 HEAP32[296537] = $0;
 HEAP32[$1 + 12 >> 2] = $0 + 4;
 $0 = HEAP32[$0 + -1 >> 2];
 HEAP32[296536] = HEAP32[($0 >>> 16 & 65532) + 4400 >> 2] >>> ($0 >>> 8 & 255) & (-1 << ($0 & 255) ^ -1);
 return $0 | 0;
}
function ladder_counter_reset($0) {
 $0 = $0 | 0;
 var $1 = 0;
 $1 = HEAP32[832] + HEAPU16[592795] | 0;
 if (HEAP8[(HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24)) + 12 | 0] & 1) {
  HEAP32[$0 >> 2] = 0;
  HEAP32[$0 + 4 >> 2] = HEAP32[$0 + 4 >> 2] & -33554432;
 }
 return 0;
}
function __uflow($0) {
 var $1 = 0, $2 = 0;
 $1 = global$0 - 16 | 0;
 global$0 = $1;
 $2 = -1;
 label$1 : {
  if (__toread($0)) {
   break label$1;
  }
  if ((FUNCTION_TABLE[HEAP32[$0 + 32 >> 2]]($0, $1 + 15 | 0, 1) | 0) != 1) {
   break label$1;
  }
  $2 = HEAPU8[$1 + 15 | 0];
 }
 global$0 = $1 + 16 | 0;
 return $2;
}
function ladder_condition($0) {
 $0 = $0 | 0;
 var $1 = 0;
 $1 = HEAP32[832] + HEAPU16[592795] | 0;
 $1 = HEAPU8[$1 | 0] | HEAPU8[$1 + 1 | 0] << 8 | (HEAPU8[$1 + 2 | 0] << 16 | HEAPU8[$1 + 3 | 0] << 24);
 HEAP8[$1 + 12 | 0] = $0 & 1 | HEAPU8[$1 + 12 | 0] & 254;
 return 0;
}
function fmt_x($0, $1, $2, $3) {
 if ($0 | $1) {
  while (1) {
   $2 = $2 + -1 | 0;
   HEAP8[$2 | 0] = HEAPU8[($0 & 15) + 3312 | 0] | $3;
   $0 = ($1 & 15) << 28 | $0 >>> 4;
   $1 = $1 >>> 4 | 0;
   if ($0 | $1) {
    continue;
   }
   break;
  }
 }
 return $2;
}
function fmt_o($0, $1, $2) {
 if ($0 | $1) {
  while (1) {
   $2 = $2 + -1 | 0;
   HEAP8[$2 | 0] = $0 & 7 | 48;
   $0 = ($1 & 7) << 29 | $0 >>> 3;
   $1 = $1 >>> 3 | 0;
   if ($0 | $1) {
    continue;
   }
   break;
  }
 }
 return $2;
}
function setupBreakpointReplacement($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 HEAP32[296534] = $1;
 HEAP16[330628] = $0;
 if (($2 | 0) == 1) {
  HEAP32[(HEAPU16[592785] & 65532) + 4400 >> 2] = 1;
 }
}
function getRungTrueFunc($0) {
 $0 = $0 | 0;
 $0 = HEAP32[832] + HEAPU16[592795] | 0;
 return HEAP8[(HEAPU8[$0 | 0] | HEAPU8[$0 + 1 | 0] << 8 | (HEAPU8[$0 + 2 | 0] << 16 | HEAPU8[$0 + 3 | 0] << 24)) + 12 | 0] & 1;
}
function getPLCPtr($0) {
 $0 = $0 | 0;
 var $1 = 0;
 label$1 : {
  switch ($0 | 0) {
  case 0:
   return HEAP32[834];
  case 1:
   $1 = HEAP32[833];
   break;
  default:
   break label$1;
  }
 }
 return $1 | 0;
}
function startTimer($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 HEAP32[$0 + 4 >> 2] = HEAP32[$0 + 4 >> 2] & -369098752 | ($1 ? $1 & 16777215 | 268435456 : 268435457);
 HEAP32[$0 >> 2] = HEAP32[165315];
 return 0;
}
function nst_set_bits($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 var $4 = 0;
 $4 = $0;
 $0 = -1 << $2;
 return $4 & __wasm_rotl_i32($0, $1) | (($0 ^ -1) & $3) << $1;
}
function iprintf($0, $1) {
 var $2 = 0;
 $2 = global$0 - 16 | 0;
 global$0 = $2;
 HEAP32[$2 + 12 >> 2] = $1;
 __vfprintf_internal(HEAP32[703], $0, $1);
 global$0 = $2 + 16 | 0;
}
function __wasm_rotl_i32($0, $1) {
 var $2 = 0, $3 = 0;
 $2 = $1 & 31;
 $3 = (-1 >>> $2 & $0) << $2;
 $2 = $0;
 $0 = 0 - $1 & 31;
 return $3 | ($2 & -1 << $0) >>> $0;
}



function nst_R_TRIG($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0;
 $2 = HEAP32[$1 >> 2];
 HEAP32[$1 >> 2] = $0;
 return ($0 | 0) == 1 & ($2 | 0) != 1;
}
function int_mod($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 if (!$1) {
  return 0;
 }
 $0 = ($0 | 0) % ($1 | 0) | 0;
 HEAP32[296536] = $0;
 return $0 | 0;
}
function int_div($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 if (!$1) {
  return 0;
 }
 $0 = ($0 | 0) / ($1 | 0) | 0;
 HEAP32[296536] = $0;
 return $0 | 0;
}
function nst_F_COS($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0;
 $2 = HEAP32[$1 >> 2];
 HEAP32[$1 >> 2] = $0;
 return ($0 | 0) != ($2 | 0) | 0;
}
function __emscripten_stdout_seek($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 i64toi32_i32$HIGH_BITS = 0;
 return 0;
}
function updateStatusRegs($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 HEAP32[165312] = HEAP32[165312] & 1 | ($0 << 1 | $1 << 2) | 83886080;
 syncIO(0);
}
function nst_F_TRIG($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 var $2 = 0;
 $2 = HEAP32[$1 >> 2];
 HEAP32[$1 >> 2] = $0;
 return !$0 & ($2 | 0) != 0;
}
function __wasm_i64_mul($0, $1, $2) {
 return _ZN17compiler_builtins3int3mul3Mul3mul17h070e9a1c69faec5bE($0, $1, $2);
}
function if_then_else($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 return (($0 | 0) == 1 ? $1 : $2) | 0;
}
function PUSH_ELEM($0) {
 $0 = $0 | 0;
 HEAP32[HEAP32[296549] >> 2] = $0;
 HEAP32[296549] = HEAP32[296549] + -4;
}
function ARGEE_COMM_Func($0, $1, $2, $3) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 $3 = $3 | 0;
 return 0;
}
function POP_ELEM() {
 var $0 = 0;
 $0 = HEAP32[296549];
 HEAP32[296549] = $0 + 4;
 return HEAP32[$0 >> 2];
}
function SET_STACK_ELEM($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 HEAP32[HEAP32[296549] + $0 >> 2] = $1;
}
function nst_min($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 return (($0 | 0) < ($1 | 0) ? $0 : $1) | 0;
}
function nst_max($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 return (($0 | 0) > ($1 | 0) ? $0 : $1) | 0;
}
function MOV_VAL($0, $1) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 HEAP32[($0 << 2) + 1186144 >> 2] = $1;
}
function nst_sign_extend16($0) {
 $0 = $0 | 0;
 return $0 << 16 >> 31 & -65536 | $0 & 65535;
}
function ARGEE_WriteDS($0, $1, $2) {
 $0 = $0 | 0;
 $1 = $1 | 0;
 $2 = $2 | 0;
 return 0;
}
function nst_abs($0) {
 $0 = $0 | 0;
 var $1 = 0;
 $1 = $0 >> 31;
 return $1 ^ $0 + $1;
}
function out($0, $1, $2) {
 if (!(HEAPU8[$0 | 0] & 32)) {
  __fwritex($1, $2, $0);
 }
}
function GET_STACK_ELEM($0) {
 $0 = $0 | 0;
 return HEAP32[HEAP32[296549] + $0 >> 2];
}
function getIO_DiagPtr($0) {
 $0 = $0 | 0;
 return Math_imul($0, 2056) + 530688 | 0;
}
function getIO_InpPtr($0) {
 $0 = $0 | 0;
 return Math_imul($0, 2056) + 529664 | 0;
}
function setNST_Preempt() {
 HEAP32[(HEAPU16[592785] & 65532) + 4400 >> 2] = 1;
}
function GET_VAL($0) {
 $0 = $0 | 0;
 return HEAP32[($0 << 2) + 1186144 >> 2];
}
function wctomb($0, $1) {
 if (!$0) {
  return 0;
 }
 return wcrtomb($0, $1);
}
function __growWasmMemory($0) {
 $0 = $0 | 0;
 return abort() | 0;
}
function __emscripten_stdout_close($0) {
 $0 = $0 | 0;
 return 0;
}
function setSystemTime($0) {
 $0 = $0 | 0;
 HEAP32[165315] = $0;
}
function getPLC_InpPtr($0) {
 $0 = $0 | 0;
 return HEAP32[834];
}
function setArm7Mode($0) {
 $0 = $0 | 0;
 HEAP32[165316] = $0;
}
function getCodePtr($0) {
 $0 = $0 | 0;
 return HEAP32[832];
}
function getSpecialReg($0) {
 $0 = $0 | 0;
 return 661248;
}
function OS_getIntTick() {
 return HEAP32[165315];
}
function getProgBuf() {
 return HEAP32[832];
}
function getCPU_Regs() {
 return 1186144;
}
function getTmpBuf() {
 return 661280;
}
function __wasm_call_ctors() {}

// EMSCRIPTEN_END_FUNCS

;
 FUNCTION_TABLE[1] = startProg;
 FUNCTION_TABLE[2] = getCodePtr;
 FUNCTION_TABLE[3] = getIO_InpPtr;
 FUNCTION_TABLE[4] = getIO_DiagPtr;
 FUNCTION_TABLE[5] = getPLC_InpPtr;
 FUNCTION_TABLE[6] = getSpecialReg;
 FUNCTION_TABLE[7] = startTimer;
 FUNCTION_TABLE[8] = timerCount;
 FUNCTION_TABLE[9] = str_len;
 FUNCTION_TABLE[10] = str_left;
 FUNCTION_TABLE[11] = str_right;
 FUNCTION_TABLE[12] = str_mid;
 FUNCTION_TABLE[13] = str_copy;
 FUNCTION_TABLE[14] = str_concat;
 FUNCTION_TABLE[15] = str_to_int;
 FUNCTION_TABLE[16] = int_to_str;
 FUNCTION_TABLE[17] = ladder_condition;
 FUNCTION_TABLE[18] = ladder_coil;
 FUNCTION_TABLE[19] = ladder_assign;
 FUNCTION_TABLE[20] = ladder_timer_on;
 FUNCTION_TABLE[21] = ladder_timer_off;
 FUNCTION_TABLE[22] = ladder_timer_start;
 FUNCTION_TABLE[23] = ladder_counter_reset;
 FUNCTION_TABLE[24] = tm_cnt_expired;
 FUNCTION_TABLE[25] = ladder_count_up;
 FUNCTION_TABLE[26] = ladder_count_down;
 FUNCTION_TABLE[27] = nst_F_COS;
 FUNCTION_TABLE[28] = nst_R_TRIG;
 FUNCTION_TABLE[29] = nst_F_TRIG;
 FUNCTION_TABLE[30] = nst_extract_bits;
 FUNCTION_TABLE[31] = nst_set_bits;
 FUNCTION_TABLE[32] = nst_InpArrGet;
 FUNCTION_TABLE[33] = nst_OutpArrSet;
 FUNCTION_TABLE[34] = nst_DiagArrGet;
 FUNCTION_TABLE[35] = nst_LE_UINT16_GET;
 FUNCTION_TABLE[36] = nst_BE_UINT16_GET;
 FUNCTION_TABLE[37] = nst_LE_UINT32_GET;
 FUNCTION_TABLE[38] = nst_BE_UINT32_GET;
 FUNCTION_TABLE[39] = nst_LE_UINT16_SET;
 FUNCTION_TABLE[40] = nst_BE_UINT16_SET;
 FUNCTION_TABLE[41] = nst_LE_UINT32_SET;
 FUNCTION_TABLE[42] = nst_BE_UINT32_SET;
 FUNCTION_TABLE[43] = nst_PLCInpGet;
 FUNCTION_TABLE[44] = nst_PLCOutpSet;
 FUNCTION_TABLE[45] = nst_min;
 FUNCTION_TABLE[46] = nst_max;
 FUNCTION_TABLE[47] = nst_abs;
 FUNCTION_TABLE[48] = str_compare;
 FUNCTION_TABLE[49] = nst_DiagIntGet;
 FUNCTION_TABLE[50] = nst_InpIntGet;
 FUNCTION_TABLE[51] = nst_OutpIntSet;
 FUNCTION_TABLE[52] = ARGEE_WriteDS;
 FUNCTION_TABLE[53] = ARGEE_WriteDS;
 FUNCTION_TABLE[54] = nst_trace;
 FUNCTION_TABLE[55] = nst_ladder_trace;
 FUNCTION_TABLE[56] = nst_ParamIntSet;
 FUNCTION_TABLE[57] = nst_array_init;
 FUNCTION_TABLE[58] = getRungTrueFunc;
 FUNCTION_TABLE[59] = nst_sign_extend16;
 FUNCTION_TABLE[60] = if_then_else;
 FUNCTION_TABLE[61] = ARGEE_COMM_Func;
 FUNCTION_TABLE[62] = nst_ParamIntGet;
 FUNCTION_TABLE[63] = base64encode;
 FUNCTION_TABLE[64] = base64decode;
 FUNCTION_TABLE[65] = nst_PLCIntInpGet;
 FUNCTION_TABLE[66] = nst_PLCIntOutpSet;
 FUNCTION_TABLE[67] = nst_OutpIntGet;
 FUNCTION_TABLE[68] = nst_PLCIntOutpGet;
 FUNCTION_TABLE[69] = int_div;
 FUNCTION_TABLE[70] = int_mod;
 FUNCTION_TABLE[71] = instr_trace;
 FUNCTION_TABLE[72] = bitmask_insert;
 FUNCTION_TABLE[73] = bitmask_extract_r0;
 FUNCTION_TABLE[74] = __emscripten_stdout_close;
 FUNCTION_TABLE[75] = __stdio_write;
 FUNCTION_TABLE[76] = __emscripten_stdout_seek;
 function __wasm_memory_size() {
  return buffer.byteLength / 65536 | 0;
}
 
 return {
  "c": __wasm_call_ctors, 
  "d": setupSectSize, 
  "e": getIOPtr, 
  "f": getPLCPtr, 
  "g": OS_getIntTick, 
  "h": setArm7Mode, 
  "i": getTmpBuf, 
  "j": getProgBuf, 
  "k": writeObjWithOffsets, 
  "l": writeObjWithOffsetsExt, 
  "m": setNST_Preempt, 
  "n": setSystemTime, 
  "o": processProjFile, 
  "p": updateStatusRegs, 
  "q": GET_VAL, 
  "r": MOV_VAL, 
  "s": setupBreakpointReplacement, 
  "t": GET_STACK_ELEM, 
  "u": SET_STACK_ELEM, 
  "v": getCPU_Regs, 
  "w": POP_ELEM, 
  "x": PUSH_ELEM, 
  "y": ARGEE_sim_PrepExecNST, 
  "z": ARGEE_simExec, 
  "A": disas_thumb_insn, 
  "B": __growWasmMemory
};
}

var bufferView = new Uint8Array(wasmMemory.buffer);
for (var base64ReverseLookup = new Uint8Array(123/*'z'+1*/), i = 25; i >= 0; --i) {
    base64ReverseLookup[48+i] = 52+i; // '0-9'
    base64ReverseLookup[65+i] = i; // 'A-Z'
    base64ReverseLookup[97+i] = 26+i; // 'a-z'
  }
  base64ReverseLookup[43] = 62; // '+'
  base64ReverseLookup[47] = 63; // '/'
  /** @noinline Inlining this function would mean expanding the base64 string 4x times in the source code, which Closure seems to be happy to do. */
  function base64DecodeToExistingUint8Array(uint8Array, offset, b64) {
    var b1, b2, i = 0, j = offset, bLength = b64.length, end = offset + (bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '=');
    for (; i < bLength; i += 4) {
      b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
      b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
      uint8Array[j++] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
      if (j < end) uint8Array[j++] = b1 << 4 | b2 >> 2;
      if (j < end) uint8Array[j++] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
    } 
  }
  base64DecodeToExistingUint8Array(bufferView, 1024, "QVJHRUVfQk9PVF9QUk9KX0VOQUJMRUQAQVJHRUVfQ1RSTF9QUkVFTVBUX1BPSU5UX09GRlNFVABBUkdFRV9DVFJMX1NBVkVfTFJfT0ZGU0VUAEFSR0VFX0NUUkxfU0FWRV9TUF9PRkZTRVQAQVJHRUVfQ1RSTF9DVVJSX1RBU0tfT0ZGU0VUAEFSR0VFX0NUUkxfRlVOQ1RfVEJMX09GRlNFVABBUkdFRV9DVFJMX0ZVTkNUX1RCTF9MRU5fT0ZGU0VUAEFSR0VFX0NUUkxfSU9fTUFQX09GRlNFVABBUkdFRV9DVFJMX0lOU1RSX1RSQUNFX09GRlNFVABBUkdFRV9DVFJMX1ZBUl9TRUdNX1NJWkUAQVJHRUVfQ1RSTF9MUl9DQUxMRVJfT0ZGU0VUAEFSR0VFX0NUUkxfRlBfQ0FMTEVSX09GRlNFVABQUk9HX1RSQUNFX1RCTF9TRUdfT0ZGU0VUX09CSgBBUkdFRV9DVFJMX0RJUkVDVF9BU01fQ0FMTF9TRUdNX09GRlNFVABBUkdFRV9SVU5fQ09ERQBBUkdFRV9HRVRfUFJPR19WQVJTAEFSR0VFX0lPX0lOUABBUkdFRV9JT19ESUFHAEFSR0VFX0dFVF9QTENfSU5QAFNQRUNJQUxfUkVHAFdyaXRlIFdpdGggT2Zmc2V0cyBFeHQ6ICV4ICVzICVkCgAAAQABAQAtMjE0NzQ4MzY0OAAwMTIzNDU2Nzg5YWJjZGVmAG1hc2s9JWQgJWQKAG1hc2sxPSVYCgB2YWxzPSAlZCAlZCAlZCAlZAoAAAAAAABCQkJCQkJCQkJCQEJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCPkJCQj80NTY3ODk6Ozw9QkJCQUJCQgABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZQkJCQkJCGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjNCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCBwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACMAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAAAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABEAAAAAAAAAAIAAAABAAAAAQAAAAMAAAADAAAABAAAAAIAAAACAAAAAgAAAAMAAAABAAAAAwAAAAQAAAACAAAAAgAAAAIAAAABAAAAAQAAAAIAAAACAAAAAgAAAAIAAAACAAAAAwAAAAQAAAAEAAAABAAAAAQAAAACAAAAAgAAAAIAAAACAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAgAAAAIAAAABAAAAAwAAAAIAAAADAAAAAwAAAAQAAAADAAAAAwAAAAIAAAACAAAABAAAAAMAAAABAAAAAQAAAAMAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAAAAABFAAAARgAAAEcAAABIAAAASQAAAEk=");
base64DecodeToExistingUint8Array(bufferView, 2432, "AgAAAAIAAAABAAAAAQ==");
base64DecodeToExistingUint8Array(bufferView, 2464, "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLw==");
base64DecodeToExistingUint8Array(bufferView, 2544, "/////////////////////////////////////////////////////////////////wABAgMEBQYHCAn/////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP///////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAQIEBwMGBQAAALAPAAAtKyAgIDBYMHgAKG51bGwp");
base64DecodeToExistingUint8Array(bufferView, 2848, "EQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAEACQsLAAAJBgsAAAsABhEAAAARERE=");
base64DecodeToExistingUint8Array(bufferView, 2929, "CwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAAL");
base64DecodeToExistingUint8Array(bufferView, 2987, "DA==");
base64DecodeToExistingUint8Array(bufferView, 2999, "DAAAAAAMAAAAAAkMAAAAAAAMAAAM");
base64DecodeToExistingUint8Array(bufferView, 3045, "Dg==");
base64DecodeToExistingUint8Array(bufferView, 3057, "DQAAAAQNAAAAAAkOAAAAAAAOAAAO");
base64DecodeToExistingUint8Array(bufferView, 3103, "EA==");
base64DecodeToExistingUint8Array(bufferView, 3115, "DwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhIS");
base64DecodeToExistingUint8Array(bufferView, 3170, "EgAAABISEgAAAAAAAAk=");
base64DecodeToExistingUint8Array(bufferView, 3219, "Cw==");
base64DecodeToExistingUint8Array(bufferView, 3231, "CgAAAAAKAAAAAAkLAAAAAAALAAAL");
base64DecodeToExistingUint8Array(bufferView, 3277, "DA==");
base64DecodeToExistingUint8Array(bufferView, 3289, "DAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVG");
base64DecodeToExistingUint8Array(bufferView, 3328, "MBEAAEARCAAgEwgAAAAAAAAEAAACAEkAIBcS");
base64DecodeToExistingUint8Array(bufferView, 3364, "GAQAAHkASQAiFxI=");
base64DecodeToExistingUint8Array(bufferView, 3384, "OAQAAHoASQAkFxI=");
base64DecodeToExistingUint8Array(bufferView, 3404, "UgQAAHsASQAmFxI=");
base64DecodeToExistingUint8Array(bufferView, 3424, "bAQAAHwASQAoFxI=");
base64DecodeToExistingUint8Array(bufferView, 3444, "iAQAAH0ASQAqFxI=");
base64DecodeToExistingUint8Array(bufferView, 3464, "pAQAAH4ASQAsFxI=");
base64DecodeToExistingUint8Array(bufferView, 3484, "xAQAAH8ASQAuFxI=");
base64DecodeToExistingUint8Array(bufferView, 3504, "3QQAAIAASQAwFxI=");
base64DecodeToExistingUint8Array(bufferView, 3524, "+wQAAIEASQAyFxI=");
base64DecodeToExistingUint8Array(bufferView, 3544, "FAUAAI8ASQA0FxI=");
base64DecodeToExistingUint8Array(bufferView, 3564, "MAUAAJAASQA2FxI=");
base64DecodeToExistingUint8Array(bufferView, 3584, "TAUAAJoASQA4FxI=");
base64DecodeToExistingUint8Array(bufferView, 3604, "agUAAJQASQA6FxI=");
base64DecodeToExistingUint8Array(bufferView, 3624, "kQUAAIIASQAAAAAAAQAAAAIAAACgBQAAhABJ");
base64DecodeToExistingUint8Array(bufferView, 3660, "AgAAALQFAACFAEk=");
base64DecodeToExistingUint8Array(bufferView, 3680, "AwAAAMEFAACHAEk=");
base64DecodeToExistingUint8Array(bufferView, 3700, "BAAAAM8FAACJAEk=");
base64DecodeToExistingUint8Array(bufferView, 3720, "BQAAAOEFAABwF0k=");
base64DecodeToExistingUint8Array(bufferView, 3740, "BgAAAEARCAAgEwg=");
base64DecodeToExistingUint8Array(bufferView, 3761, "////Af///wL///8D////BP///wX///8G////B////wj///8J////Cv///wv///8M////Df///w7///8P////EP///xH///8S////E////xT///8V////Fv///xf///8Y////Gf///xr///8b////HP///x3///8e////H////yD///8h////Iv///yP///8k////Jf///yb///8n////KP///yn///8q////K////yz///8t////Lv///y////8w////Mf///zL///8z////NP///zX///82////N////zj///85////Ov///zv///88////Pf///z7///8AAAAABQ==");
base64DecodeToExistingUint8Array(bufferView, 4028, "Sg==");
base64DecodeToExistingUint8Array(bufferView, 4052, "SwAAAEwAAABYHRIAAAQ=");
base64DecodeToExistingUint8Array(bufferView, 4076, "AQ==");
base64DecodeToExistingUint8Array(bufferView, 4091, "Cv////8=");
base64DecodeToExistingUint8Array(bufferView, 4336, "gCES");
return asmFunc({
    'Int8Array': Int8Array,
    'Int16Array': Int16Array,
    'Int32Array': Int32Array,
    'Uint8Array': Uint8Array,
    'Uint16Array': Uint16Array,
    'Uint32Array': Uint32Array,
    'Float32Array': Float32Array,
    'Float64Array': Float64Array,
    'NaN': NaN,
    'Infinity': Infinity,
    'Math': Math
  },
  asmLibraryArg,
  wasmMemory.buffer
)

}// EMSCRIPTEN_END_ASM




)(asmLibraryArg, wasmMemory, wasmTable);
 },
 instantiate: function(binary, info) {
  return {
   then: function(ok) {
    var module = new WebAssembly.Module(binary);
    ok({
     "instance": new WebAssembly.Instance(module)
    });
   }
  };
 },
 RuntimeError: Error
};

wasmBinary = [];

if (typeof WebAssembly !== "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var wasmTable = new WebAssembly.Table({
 "initial": 77,
 "maximum": 77 + 0,
 "element": "anyfunc"
});

var ABORT = false;

var EXITSTATUS = 0;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}

var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
  return UTF8Decoder.decode(heap.subarray(idx, endPtr));
 } else {
  var str = "";
  while (idx < endPtr) {
   var u0 = heap[idx++];
   if (!(u0 & 128)) {
    str += String.fromCharCode(u0);
    continue;
   }
   var u1 = heap[idx++] & 63;
   if ((u0 & 224) == 192) {
    str += String.fromCharCode((u0 & 31) << 6 | u1);
    continue;
   }
   var u2 = heap[idx++] & 63;
   if ((u0 & 240) == 224) {
    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
   } else {
    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
   }
   if (u0 < 65536) {
    str += String.fromCharCode(u0);
   } else {
    var ch = u0 - 65536;
    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
   }
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function writeArrayToMemory(array, buffer) {
 HEAP8.set(array, buffer);
}

var WASM_PAGE_SIZE = 65536;

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

var DYNAMIC_BASE = 1208912, DYNAMICTOP_PTR = 1188752;

var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 2097152;

if (Module["wasmMemory"]) {
 wasmMemory = Module["wasmMemory"];
} else {
 wasmMemory = new WebAssembly.Memory({
  "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
  "maximum": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
 });
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_INITIAL_MEMORY = buffer.byteLength;

updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback(Module);
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

Module["preloadedImages"] = {};

Module["preloadedAudios"] = {};

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what += "";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
 var e = new WebAssembly.RuntimeError(what);
 throw e;
}

function hasPrefix(str, prefix) {
 return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return hasPrefix(filename, dataURIPrefix);
}

var fileURIPrefix = "file://";

function isFileURI(filename) {
 return hasPrefix(filename, fileURIPrefix);
}

var wasmBinaryFile = "a.out.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(wasmBinaryFile);
  if (binary) {
   return binary;
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return response["arrayBuffer"]();
  }).catch(function() {
   return getBinary();
  });
 }
 return new Promise(function(resolve, reject) {
  resolve(getBinary());
 });
}

function createWasm() {
 var info = {
  "a": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  removeRunDependency("wasm-instantiate");
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiatedSource(output) {
  receiveInstance(output["instance"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     return instantiateArrayBuffer(receiveInstantiatedSource);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

__ATINIT__.push({
 func: function() {
  ___wasm_call_ctors();
 }
});

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

var PATH = {
 splitPath: function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 extname: function(path) {
  return PATH.splitPath(path)[3];
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 },
 join2: function(l, r) {
  return PATH.normalize(l + "/" + r);
 }
};

var SYSCALLS = {
 mappings: {},
 buffers: [ null, [], [] ],
 printChar: function(stream, curr) {
  var buffer = SYSCALLS.buffers[stream];
  if (curr === 0 || curr === 10) {
   (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
   buffer.length = 0;
  } else {
   buffer.push(curr);
  }
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 get64: function(low, high) {
  return low;
 }
};

function _fd_write(fd, iov, iovcnt, pnum) {
 var num = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAP32[iov + i * 8 >> 2];
  var len = HEAP32[iov + (i * 8 + 4) >> 2];
  for (var j = 0; j < len; j++) {
   SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
  }
  num += len;
 }
 HEAP32[pnum >> 2] = num;
 return 0;
}

var ASSERTIONS = false;

function intArrayToString(array) {
 var ret = [];
 for (var i = 0; i < array.length; i++) {
  var chr = array[i];
  if (chr > 255) {
   if (ASSERTIONS) {
    assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
   }
   chr &= 255;
  }
  ret.push(String.fromCharCode(chr));
 }
 return ret.join("");
}

var decodeBase64 = typeof atob === "function" ? atob : function(input) {
 var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 var output = "";
 var chr1, chr2, chr3;
 var enc1, enc2, enc3, enc4;
 var i = 0;
 input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 do {
  enc1 = keyStr.indexOf(input.charAt(i++));
  enc2 = keyStr.indexOf(input.charAt(i++));
  enc3 = keyStr.indexOf(input.charAt(i++));
  enc4 = keyStr.indexOf(input.charAt(i++));
  chr1 = enc1 << 2 | enc2 >> 4;
  chr2 = (enc2 & 15) << 4 | enc3 >> 2;
  chr3 = (enc3 & 3) << 6 | enc4;
  output = output + String.fromCharCode(chr1);
  if (enc3 !== 64) {
   output = output + String.fromCharCode(chr2);
  }
  if (enc4 !== 64) {
   output = output + String.fromCharCode(chr3);
  }
 } while (i < input.length);
 return output;
};

function intArrayFromBase64(s) {
 if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
  var buf;
  try {
   buf = Buffer.from(s, "base64");
  } catch (_) {
   buf = new Buffer(s, "base64");
  }
  return new Uint8Array(buf["buffer"], buf["byteOffset"], buf["byteLength"]);
 }
 try {
  var decoded = decodeBase64(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; ++i) {
   bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
 } catch (_) {
  throw new Error("Converting base64 string to bytes failed.");
 }
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

var asmLibraryArg = {
 "b": _emscripten_memcpy_big,
 "a": _fd_write,
 "memory": wasmMemory,
 "table": wasmTable
};

var asm = createWasm();

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["c"]).apply(null, arguments);
};

var _setupSectSize = Module["_setupSectSize"] = function() {
 return (_setupSectSize = Module["_setupSectSize"] = Module["asm"]["d"]).apply(null, arguments);
};

var _getIOPtr = Module["_getIOPtr"] = function() {
 return (_getIOPtr = Module["_getIOPtr"] = Module["asm"]["e"]).apply(null, arguments);
};

var _getPLCPtr = Module["_getPLCPtr"] = function() {
 return (_getPLCPtr = Module["_getPLCPtr"] = Module["asm"]["f"]).apply(null, arguments);
};

var _OS_getIntTick = Module["_OS_getIntTick"] = function() {
 return (_OS_getIntTick = Module["_OS_getIntTick"] = Module["asm"]["g"]).apply(null, arguments);
};

var _setArm7Mode = Module["_setArm7Mode"] = function() {
 return (_setArm7Mode = Module["_setArm7Mode"] = Module["asm"]["h"]).apply(null, arguments);
};

var _getTmpBuf = Module["_getTmpBuf"] = function() {
 return (_getTmpBuf = Module["_getTmpBuf"] = Module["asm"]["i"]).apply(null, arguments);
};

var _getProgBuf = Module["_getProgBuf"] = function() {
 return (_getProgBuf = Module["_getProgBuf"] = Module["asm"]["j"]).apply(null, arguments);
};

var _writeObjWithOffsets = Module["_writeObjWithOffsets"] = function() {
 return (_writeObjWithOffsets = Module["_writeObjWithOffsets"] = Module["asm"]["k"]).apply(null, arguments);
};

var _writeObjWithOffsetsExt = Module["_writeObjWithOffsetsExt"] = function() {
 return (_writeObjWithOffsetsExt = Module["_writeObjWithOffsetsExt"] = Module["asm"]["l"]).apply(null, arguments);
};

var _setNST_Preempt = Module["_setNST_Preempt"] = function() {
 return (_setNST_Preempt = Module["_setNST_Preempt"] = Module["asm"]["m"]).apply(null, arguments);
};

var _setSystemTime = Module["_setSystemTime"] = function() {
 return (_setSystemTime = Module["_setSystemTime"] = Module["asm"]["n"]).apply(null, arguments);
};

var _processProjFile = Module["_processProjFile"] = function() {
 return (_processProjFile = Module["_processProjFile"] = Module["asm"]["o"]).apply(null, arguments);
};

var _updateStatusRegs = Module["_updateStatusRegs"] = function() {
 return (_updateStatusRegs = Module["_updateStatusRegs"] = Module["asm"]["p"]).apply(null, arguments);
};

var _GET_VAL = Module["_GET_VAL"] = function() {
 return (_GET_VAL = Module["_GET_VAL"] = Module["asm"]["q"]).apply(null, arguments);
};

var _MOV_VAL = Module["_MOV_VAL"] = function() {
 return (_MOV_VAL = Module["_MOV_VAL"] = Module["asm"]["r"]).apply(null, arguments);
};

var _setupBreakpointReplacement = Module["_setupBreakpointReplacement"] = function() {
 return (_setupBreakpointReplacement = Module["_setupBreakpointReplacement"] = Module["asm"]["s"]).apply(null, arguments);
};

var _GET_STACK_ELEM = Module["_GET_STACK_ELEM"] = function() {
 return (_GET_STACK_ELEM = Module["_GET_STACK_ELEM"] = Module["asm"]["t"]).apply(null, arguments);
};

var _SET_STACK_ELEM = Module["_SET_STACK_ELEM"] = function() {
 return (_SET_STACK_ELEM = Module["_SET_STACK_ELEM"] = Module["asm"]["u"]).apply(null, arguments);
};

var _getCPU_Regs = Module["_getCPU_Regs"] = function() {
 return (_getCPU_Regs = Module["_getCPU_Regs"] = Module["asm"]["v"]).apply(null, arguments);
};

var _POP_ELEM = Module["_POP_ELEM"] = function() {
 return (_POP_ELEM = Module["_POP_ELEM"] = Module["asm"]["w"]).apply(null, arguments);
};

var _PUSH_ELEM = Module["_PUSH_ELEM"] = function() {
 return (_PUSH_ELEM = Module["_PUSH_ELEM"] = Module["asm"]["x"]).apply(null, arguments);
};

var _ARGEE_sim_PrepExecNST = Module["_ARGEE_sim_PrepExecNST"] = function() {
 return (_ARGEE_sim_PrepExecNST = Module["_ARGEE_sim_PrepExecNST"] = Module["asm"]["y"]).apply(null, arguments);
};

var _ARGEE_simExec = Module["_ARGEE_simExec"] = function() {
 return (_ARGEE_simExec = Module["_ARGEE_simExec"] = Module["asm"]["z"]).apply(null, arguments);
};

var _disas_thumb_insn = Module["_disas_thumb_insn"] = function() {
 return (_disas_thumb_insn = Module["_disas_thumb_insn"] = Module["asm"]["A"]).apply(null, arguments);
};

var __growWasmMemory = Module["__growWasmMemory"] = function() {
 return (__growWasmMemory = Module["__growWasmMemory"] = Module["asm"]["B"]).apply(null, arguments);
};

Module["writeArrayToMemory"] = writeArrayToMemory;

var calledRun;

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

Module["run"] = run;

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

noExitRuntime = true;

run();
