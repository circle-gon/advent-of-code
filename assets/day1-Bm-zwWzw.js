function a(e){return e.split(`
`).map(t=>Number(t))}function s(e){return a(e).reduce((t,n)=>t+n,0)}function c(e){const t=new Set([0]),n=a(e);let r=0,u=0;for(;;){if(r+=n[u%n.length],t.has(r))return r;t.add(r),u++}}const d=[s,c];export{d as default};
