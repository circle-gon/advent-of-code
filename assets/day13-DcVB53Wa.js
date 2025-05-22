function m(n){const e=[];for(let o=0;o<n[0].length;o++){const r=[];for(let t=0;t<n.length;t++)r.push(n[t][o]);e.push(r)}return e}function g(n,e){let o=0;for(let t=1;t<n.length;t++){const c=Math.min(t,n.length-t);let u=!0;const f=n.slice(t-c,t),l=n.slice(t,c+t);for(let i=0;i<c;i++){const p=f[i],h=l[l.length-1-i];if(p.some((a,d)=>a!==h[d])){u=!1;break}}const s=100*t;u&&e!==s&&(o=s)}const r=n[0].length;for(let t=1;t<r;t++){const c=Math.min(t,r-t);let u=!0;const f=m(n).slice(t-c,t),l=m(n).slice(t,c+t);for(let s=0;s<c;s++){const i=f[s],p=l[l.length-1-s];if(i.some((h,a)=>h!==p[a])){u=!1;break}}u&&e!==t&&(o=t)}return o}function k(n){const e=[];for(const o of n)e.push([...o]);return e}function w(n){const e=[];for(const o of n.split(`
`)){const r=[];for(const t of o)r.push(t);e.push(r)}return e}function j(n){return n.split(`

`).map(e=>g(w(e),-1)).reduce((e,o)=>e+o)}function z(n){const e=n.split(`

`);let o=0;for(const r of e){const t=w(r);let c=!1;const u=g(t,-1);for(let f=0;f<t.length;f++){for(let l=0;l<t[f].length;l++){const s=k(t);s[f][l]=s[f][l]==="#"?".":"#";const i=g(s,u);if(i>0){o+=i,c=!0;break}}if(c)break}}return o}const C=[j,z];export{C as default};
