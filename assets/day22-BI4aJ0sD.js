function i(e){const n=[];for(const s of e.split(`

`)){const o=s.split(`
`).slice(1).map(t=>Number(t)).reverse();n.push(o)}return n}function l(e){const[n,s]=i(e);for(;n.length!==0&&s.length!==0;){const o=n.pop(),t=s.pop();o>t?n.unshift(t,o):s.unshift(o,t)}return(n.length===0?s:n).reduce((o,t,r)=>o+t*(r+1))}function p(e,n){const s=new Set;for(;e.length!==0&&n.length!==0;){const o=`${e.join(",")} ${n.join(", ")}`;if(s.has(o))return!0;s.add(o);const t=e.pop(),r=n.pop();(e.length>=t&&n.length>=r?p(e.slice(-t),n.slice(-r)):t>r)?e.unshift(r,t):n.unshift(t,r)}return n.length===0}function u(e){const[n,s]=i(e),o=p(n,s);return[n,s][1-o].reduce((t,r,c)=>t+r*(c+1))}const h=[l,u];export{h as default};
