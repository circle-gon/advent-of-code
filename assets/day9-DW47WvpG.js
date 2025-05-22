function i(f){let s=0;for(const l of f.split(`
`)){let t=l.split(" ").map(e=>Number(e));const r=[t.at(-1)];for(;!t.every(e=>e===0);){const e=[];for(let n=1;n<t.length;n++)e.push(t[n]-t[n-1]);r.push(e.at(-1)),t=e}s+=r.reduce((e,n)=>e+n)}return s}function o(f){let s=0;for(const l of f.split(`
`)){let t=l.split(" ").map(e=>Number(e));const r=[t[0]];for(;!t.every(e=>e===0);){const e=[];for(let n=1;n<t.length;n++)e.push(t[n]-t[n-1]);r.push(e[0]),t=e}s+=r.reduce((e,n,u)=>e+n*(-1)**u,0)}return s}const p=[i,o];export{p as default};
