function r(e){const[o,p]=e.split(`



`),u=[];for(const c of o.split(`

`)){const[a,l,n]=c.split(`
`),t=a.slice(9,-1).split(", ").map(i=>Number(i)),f=l.split(" ").map(i=>Number(i)),s=n.slice(9,-1).split(", ").map(i=>Number(i));u.push({before:t,instr:f,after:s})}return{data:u,program:p.split(`
`).map(c=>c.split(" ").map(a=>Number(a)))}}const d={addr:(e,o)=>e[o[3]]=e[o[1]]+e[o[2]],addi:(e,o)=>e[o[3]]=e[o[1]]+o[2],mulr:(e,o)=>e[o[3]]=e[o[1]]*e[o[2]],muli:(e,o)=>e[o[3]]=e[o[1]]*o[2],banr:(e,o)=>e[o[3]]=e[o[1]]&e[o[2]],bani:(e,o)=>e[o[3]]=e[o[1]]&o[2],borr:(e,o)=>e[o[3]]=e[o[1]]|e[o[2]],bori:(e,o)=>e[o[3]]=e[o[1]]|o[2],setr:(e,o)=>e[o[3]]=e[o[1]],seti:(e,o)=>e[o[3]]=o[1],gtir:(e,o)=>e[o[3]]=o[1]>e[o[2]]?1:0,gtri:(e,o)=>e[o[3]]=e[o[1]]>o[2]?1:0,gtrr:(e,o)=>e[o[3]]=e[o[1]]>e[o[2]]?1:0,eqir:(e,o)=>e[o[3]]=o[1]===e[o[2]]?1:0,eqri:(e,o)=>e[o[3]]=e[o[1]]===o[2]?1:0,eqrr:(e,o)=>e[o[3]]=e[o[1]]===e[o[2]]?1:0};function w(e){const{data:o}=r(e);let p=0;for(const{before:u,instr:c,after:a}of o){let l=0;for(const n of Object.values(d)){const t=[...u];n(t,c),t.every((f,s)=>f===a[s])&&l++}l>=3&&p++}return p}function N(e){const{data:o,program:p}=r(e),u=Object.keys(d),c=Array(16).fill().map(()=>new Set(u)),a=Array(16).fill();for(const{before:n,instr:t,after:f}of o){const s=new Set;for(const[i,b]of Object.entries(d)){const m=[...n];b(m,t),m.every((y,v)=>y===f[v])&&s.add(i)}c[t[0]]=c[t[0]].intersection(s)}for(;a.some(n=>n===void 0);){const n=new Set;for(const[t,f]of c.entries())if(f.size===1){const s=[...f][0];a[t]=s,n.add(s)}for(const[t,f]of c.entries())c[t]=f.difference(n)}const l=[0,0,0,0];for(const n of p){const t=a[n[0]];d[t](l,n)}return l[0]}const j=[w,N];export{j as default};
