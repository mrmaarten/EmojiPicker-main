if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),c={module:{uri:o},exports:t,require:l};s[o]=Promise.all(r.map((e=>c[e]||l(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-c2f0e8ce.js",revision:null},{url:"assets/style-9c6dfd16.css",revision:null},{url:"assets/workbox-window.prod.es5-1e1a3f8e.js",revision:null},{url:"index.html",revision:"331a55a2ed5cf40d7dbbc60b734a3b61"},{url:"service-worker.js",revision:"f26684e734cd2aac41fe107f42d36a8b"},{url:"manifest.webmanifest",revision:"498c6877a378a283ff68c8646e0e1ee1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
