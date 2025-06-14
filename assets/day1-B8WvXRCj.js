function f(o){return o.split(`
`).map(n=>Number(n))}function s(o){const n=f(o);for(const r of n)for(const t of n)if(r+t===2020)return r*t;return"Is your input malformed?"}function m(o){const n=f(o);for(const r of n)for(const t of n)for(const u of n)if(r+t+u===2020)return r*t*u;return"Is your input malformed?"}const c=[s,m];export{c as default};
