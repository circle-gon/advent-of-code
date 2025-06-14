function p(o){return o.split(`

`).map(e=>e.split(`
`).map(n=>new Set(n)))}function u(o){const e=p(o);let n=0;for(const r of e){let t=new Set;for(const s of r)t=t.union(s);n+=t.size}return n}function c(o){const e=p(o);let n=0;for(const r of e){let t=new Set("abcdefghijklmnopqrstuvwxyz");for(const s of r)t=t.intersection(s);n+=t.size}return n}const f=[u,c];export{f as default};
