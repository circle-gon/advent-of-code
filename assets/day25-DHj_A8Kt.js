function h(u){const o=u.split(`

`),i=o[0].split(`
`).map(t=>t.split(" ")),a=i[0][3].slice(0,-1),r=Number(i[1][5]),s=new Map,l=[a,r,s];for(let t=1;t<o.length;t++){const n=[],c=o[t].split(`
`).map(e=>e.trim().split(" ")),p=c[0][2].slice(0,-1);for(let e=0;e<8;e+=4){const m=Number(c[2+e][4]),f=c[3+e][6]==="right."?1:-1,g=c[4+e][4].slice(0,-1);n.push([m,f,g])}s.set(p,n)}return l}function b(u){const[o,i,a]=h(u),r=new Map;let s=0,l=o;for(let t=0;t<i;t++){const[n,c,p]=a.get(l)[r.get(s)??0];r.set(s,n),s+=c,l=p}return[...r.values()].reduce((t,n)=>t+n,0)}const w=[b];export{w as default};
