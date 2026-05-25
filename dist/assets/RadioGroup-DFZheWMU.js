import{j as r}from"./index-DImI-qjc.js";function d({label:t,options:a,value:o,onChange:s}){return r.jsxs("div",{className:"flex flex-col gap-1.5",children:[t&&r.jsx("span",{className:"text-sm font-medium text-on-surface-muted",children:t}),r.jsx("div",{className:"inline-flex rounded-xl border border-border overflow-hidden bg-elevated",children:a.map((e,l)=>r.jsx("button",{type:"button",onClick:()=>s(e.value),className:`flex-1 px-4 py-2.5 text-sm font-medium transition-all duration-200
              ${o===e.value?"bg-primary text-white":"text-on-surface-muted hover:text-on-surface hover:bg-surface"}
              ${l>0?"border-l border-border":""}
            `,children:e.label},e.value))})]})}export{d as R};
