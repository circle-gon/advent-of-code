self.addEventListener("message",e=>{const s=e.data[0],t=Function("echo",e.data[1])(s);self.postMessage({type:"done",data:[s,t]})});
