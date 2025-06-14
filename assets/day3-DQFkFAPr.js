function u(t){return t.split(`
`).map(n=>n.split(""))}function c(t,n,e){let r=0;for(let o=0;o<t.length/e;o++)t[o*e][o*n%t[0].length]==="#"&&r++;return r}function f(t){const n=u(t);return c(n,3,1)}function s(t){const n=u(t);let e=1;for(const r of[[1,1],[3,1],[5,1],[7,1],[1,2]])e*=c(n,...r);return e}const i=[f,s];export{i as default};
