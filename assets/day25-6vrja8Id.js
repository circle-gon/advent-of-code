function h(c){const f=c.split(`

`),n=[],e=[];for(const l of f){const o=l.split(`
`),s=[];for(let t=0;t<o[0].length;t++){let i=0;for(let r=0;r<o.length;r++)o[r][t]==="#"&&i++;s.push(i)}o[0]==="#####"?e.push(s):n.push(s)}return{keys:n,locks:e}}function u(c){const{keys:f,locks:n}=h(c);let e=0;for(const l of n)for(const o of f){let s=!0;for(let t=0;t<o.length;t++)l[t]+o[t]>7&&(s=!1);s&&e++}return e}const p=[u];export{p as default};
