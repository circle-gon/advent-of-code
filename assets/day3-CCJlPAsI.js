function c(e){return e.split(`
`).map(o=>o.trim().split(/ +/).map(r=>Number(r)))}function l(e){const o=c(e);let r=0;for(const[t,n,s]of o)t+n>s&&t+s>n&&n+s>t&&r++;return r}function f(e){const o=c(e);let r=0;for(let t=0;t<3;t++)for(let n=2;n<o.length;n+=3){const s=o[n][t],i=o[n-1][t],a=o[n-2][t];s+i>a&&s+a>i&&i+a>s&&r++}return r}const p=[l,f];export{p as default};
