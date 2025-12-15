function i(a){const[n,o]=a.split(`
`).map(e=>Number(e));let t=1,r=0;for(;t!==n;)t=t*7%20201227,r++;let l=1;for(let e=0;e<r;e++)l=l*o%20201227;return l}const s=[i];export{s as default};
