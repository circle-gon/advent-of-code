function o(t){return t.split(`
`).map(s=>s.split(" "))}function i(t){const s=o(t);let n=0;for(const e of s)e.length===new Set(e).size&&n++;return n}function p(t){const s=o(t);let n=0;for(const e of s){const a=e.map(r=>r.split("").sort().join(""));a.length===new Set(a).size&&n++}return n}const l=[i,p];export{l as default};
