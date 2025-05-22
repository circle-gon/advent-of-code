function o(n){const t=[];for(const s of n.split(`
`)){const r=s.split(" ");t.push([Number(r[3]),Number(r[11].slice(0,-1))])}return t}function e(n){for(let t=0;t<5e6;t++){let s=!0;for(const[r,[u,c]]of n.entries())(t+r+1+c)%u!==0&&(s=!1);if(s)return t}return"What"}function f(n){return e(o(n))}function i(n){const t=o(n);return t.push([11,0]),e(t)}const l=[f,i];export{l as default};
