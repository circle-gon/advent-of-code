function f(t){s.clear();const[e,n]=t.split(`

`);return{patterns:e.split(", "),need:n.split(`
`)}}const s=new Map;function a(t,e){if(t==="")return 1;if(s.has(t))return s.get(t);let n=0;for(const c of e)t.startsWith(c)&&(n+=a(t.slice(c.length),e));return s.set(t,n),n}function o(t){const{patterns:e,need:n}=f(t);let c=0;for(const r of n)a(r,e)>0&&c++;return c}function i(t){const{patterns:e,need:n}=f(t);let c=0;for(const r of n)c+=a(r,e);return c}const p=[o,i];export{p as default};
