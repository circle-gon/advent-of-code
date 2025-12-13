function g(t){const[e,r]=t.split(`

`),n=new Map;for(const s of e.split(`
`)){const[o,i]=s.split(": ");if(i.startsWith('"'))n.set(Number(o),i[1]);else{const c=i.split(" | ").map(a=>a.split(" ").map(l=>Number(l)));n.set(Number(o),c)}}return{rules:n,tests:r.split(`
`)}}function u(t,e){const r=[],n=t.get(e);if(typeof n=="string")return n;for(const s of n)r.push(s.map(o=>u(t,o)).join(""));return`(?:${r.join("|")})`}function p(t,e){if(e===8)return`${p(t,42)}+`;if(e===11){const s=p(t,42),o=p(t,31),i=[];for(let c=1;c<=10;c++)i.push(s.repeat(c)+o.repeat(c));return`(?:${i.join("|")})`}const r=[],n=t.get(e);if(typeof n=="string")return n;for(const s of n)r.push(s.map(o=>p(t,o)).join(""));return`(?:${r.join("|")})`}function f(t,e){const{rules:r,tests:n}=g(t);console.log(e(r,0));const s=new RegExp("^"+e(r,0)+"$");let o=0;for(const i of n)s.exec(i)&&o++;return o}function m(t){return f(t,u)}function j(t){return f(t,p)}const $=[m,j];export{$ as default};
