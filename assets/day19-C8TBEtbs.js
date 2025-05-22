function o(n,t){return t**Math.floor(Math.log(n)/Math.log(t))}function r(n){const t=Number(n);return 2*(t-o(t,2))+1}function u(n){const t=Number(n);return t-o(t,3)}const a=[r,u];export{a as default};
