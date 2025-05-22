function l(s,r){const[f,c]=s.split(`

`),t=new Map;function i(n,o){t.has(n)||t.set(n,[]),t.get(n).push(o)}for(const n of f.split(`
`)){const[o,e]=n.split(" => ");r?i(e,o):i(o,e)}return{groups:t,trial:c}}function u(s){const{groups:r,trial:f}=l(s),c=new Set;for(const[t,i]of r.entries()){const n=f.split(t),o=[n[0]];for(const e of n.slice(1))o.push(t),o.push(e);for(let e=1;e<o.length;e+=2){for(const p of i)o[e]=p,c.add(o.join(""));o[e]=t}}return c.size}function a(s,r){return s.split(r).length-1}function h(s){const{groups:r,trial:f}=l(s,!0);let c=0,t=f;for(;;){const i=t;for(const[n,[o]]of r){const e=t.replaceAll(n,o);c+=a(t,n),t=e}if(i===t)break}return c}const g=[u,h];export{g as default};
