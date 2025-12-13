function d(i){const[o,l,c]=i.split(`

`),n=new Map;for(const t of o.split(`
`)){const[e,f]=t.split(": "),a=f.split(" or ").map(p=>p.split("-").map(k=>Number(k))).flat();n.set(e,a)}const s=l.split(`
`)[1].split(",").map(t=>Number(t)),r=c.split(`
`).slice(1).map(t=>t.split(",").map(e=>Number(e)));return{info:n,myticket:s,yourtickets:r}}function m(i){const{info:o,yourtickets:l}=d(i);let c=0;for(const n of l)for(const s of n){let r=!1;for(const t of o.values())(s>=t[0]&&s<=t[1]||s>=t[2]&&s<=t[3])&&(r=!0);r||(c+=s)}return c}function u(i,o){return i>=o[0]&&i<=o[1]||i>=o[2]&&i<=o[3]}function y(i){const{info:o,myticket:l,yourtickets:c}=d(i),n=[l];for(const t of c){let e=!0;for(const f of t){let a=!1;for(const p of o.values())u(f,p)&&(a=!0);a||(e=!1)}e&&n.push(t)}const s=new Map;for(;s.size<o.size;)for(let t=0;t<o.size;t++){let e=[...o.keys()].filter(f=>!s.has(f));for(const f of n)e=e.filter(a=>u(f[t],o.get(a)));e.length===1&&s.set(e[0],t)}let r=1;for(const[t,e]of s)t.startsWith("departure")&&(r*=l[e]);return r}const h=[m,y];export{h as default};
