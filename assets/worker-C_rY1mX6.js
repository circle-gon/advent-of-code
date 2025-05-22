(function(){"use strict";self.addEventListener("message",e=>{const t=e.data[0],s=Function("echo",e.data[1])(t);self.postMessage({type:"done",data:[t,s]})})})();
