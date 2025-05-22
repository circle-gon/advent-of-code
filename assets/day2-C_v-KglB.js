function i(n){return n.split(`
`).map(o=>o.split(/ |\t/).map(t=>Number(t)))}function f(n){const o=i(n);let t=0;for(const r of o)t+=Math.max(...r)-Math.min(...r);return t}function u(n){const o=i(n);let t=0;for(const r of o)for(const s of r)for(const a of r){const e=Math.max(s,a)/Math.min(s,a);e!==1&&Number.isInteger(e)&&(t+=e)}return t/2}const m=[f,u];export{m as default};
