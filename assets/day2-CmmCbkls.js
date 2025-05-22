function f(r){const o=[];for(const n of r.split(`
`))o.push(n.split("x").map(t=>Number(t)));return o}function p(r){const o=f(r);let n=0;for(const[t,s,e]of o){const c=[t*s,t*e,s*e],a=Math.min(...c),u=2*c.reduce((i,l)=>i+l);n+=u+a}return n}function b(r){const o=f(r);let n=0;for(const[t,s,e]of o){const c=2*Math.min(t+s,t+e,s+e),a=t*s*e;n+=c+a}return n}const h=[p,b];export{h as default};
