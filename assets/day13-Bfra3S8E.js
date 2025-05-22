function N(t){const r=[];for(const n of t.split(`

`)){const s=[...n.matchAll(/X\+(\d+)/g)],e=[...n.matchAll(/Y\+(\d+)/g)],c=n.match(/X=(\d+)/),o=n.match(/Y=(\d+)/);r.push([Number(s[0][1]),Number(e[0][1]),Number(s[1][1]),Number(e[1][1]),Number(c[1]),Number(o[1])])}return r}function b(t,r){const n=N(t);let s=0;for(const[e,c,o,u,g,p]of n){const f=g+r,i=p+r,m=(i*o-f*u)/(o*c-e*u),a=(i*e-f*c)/(e*u-o*c);Number.isInteger(m)&&Number.isInteger(a)&&m>=0&&a>=0&&(s+=m*3+a)}return s}function d(t){return b(t,0)}function l(t){return b(t,1e13)}const x=[d,l];export{x as default};
