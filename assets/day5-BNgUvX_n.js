function c(t){return t.split(`
`).map(e=>Number(e))}function a(t,e){const r=c(t);let n=0,u=0;for(;n>=0&&n<r.length;){const o=r[n];r[n]+=o>=3&&e?-1:1,n+=o,u++}return u}function i(t){return a(t,!1)}function l(t){return a(t,!0)}const s=[i,l];export{s as default};
