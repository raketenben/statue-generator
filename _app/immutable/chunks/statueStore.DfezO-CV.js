import{a as K,t as W}from"./index.9hdxOo08.js";import{y as Y,O as U,P as j,Q as x}from"./scheduler.D_J4CSU2.js";import{w as M,r as G}from"./index.8Tty9Z-d.js";function me(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Z(e,n){W(e,1,1,()=>{n.delete(e.key)})}function he(e,n){e.f(),Z(e,n)}function we(e,n,o,t,s,r,a,c,i,m,w,y){let u=e.length,b=r.length,p=u;const I={};for(;p--;)I[e[p].key]=p;const _=[],P=new Map,T=new Map,v=[];for(p=b;p--;){const l=y(s,r,p),f=o(l);let g=a.get(f);g?v.push(()=>g.p(l,n)):(g=m(f,l),g.c()),P.set(f,_[p]=g),f in I&&T.set(f,Math.abs(p-I[f]))}const R=new Set,B=new Set;function d(l){K(l,1),l.m(c,w),a.set(l.key,l),w=l.first,b--}for(;u&&b;){const l=_[b-1],f=e[u-1],g=l.key,h=f.key;l===f?(w=l.first,u--,b--):P.has(h)?!a.has(g)||R.has(g)?d(l):B.has(h)?u--:T.get(g)>T.get(h)?(B.add(g),d(l)):(R.add(h),u--):(i(f,a),u--)}for(;u--;){const l=e[u];P.has(l.key)||i(l,a)}for(;b;)d(_[b-1]);return Y(v),_}function pe(e,n){const o={},t={},s={$$scope:1};let r=e.length;for(;r--;){const a=e[r],c=n[r];if(c){for(const i in a)i in c||(t[i]=1);for(const i in c)s[i]||(o[i]=c[i],s[i]=1);e[r]=c}else for(const i in a)s[i]=1}for(const a in t)a in o||(o[a]=void 0);return o}function be(e){return typeof e=="object"&&e!==null?e:{}}var ye=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}const ve=M(void 0),D="modalStore";function Se(){const e=j(D);if(!e)throw new Error("modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return e}function Ie(){const e=X();return U(D,e)}function X(){const{subscribe:e,set:n,update:o}=M([]);return{subscribe:e,set:n,update:o,trigger:t=>o(s=>(s.push(t),s)),close:()=>o(t=>(t.length>0&&t.shift(),t)),clear:()=>n([])}}const ee={message:"Missing Toast Message",autohide:!0,timeout:5e3},F="toastStore";function Te(){const e=j(F);if(!e)throw new Error("toastStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return e}function Le(){const e=ne();return U(F,e)}function te(){const e=Math.random();return Number(e).toString(32)}function ne(){const{subscribe:e,set:n,update:o}=M([]),t=r=>o(a=>{if(a.length>0){const c=a.findIndex(m=>m.id===r),i=a[c];i&&(i.callback&&i.callback({id:r,status:"closed"}),i.timeoutId&&clearTimeout(i.timeoutId),a.splice(c,1))}return a});function s(r){if(r.autohide===!0)return setTimeout(()=>{t(r.id)},r.timeout)}return{subscribe:e,close:t,trigger:r=>{const a=te();return o(c=>{r&&r.callback&&r.callback({id:a,status:"queued"}),r.hideDismiss&&(r.autohide=!0);const i={...ee,...r,id:a};return i.timeoutId=s(i),c.push(i),c}),a},freeze:r=>o(a=>(a.length>0&&clearTimeout(a[r].timeoutId),a)),unfreeze:r=>o(a=>(a.length>0&&(a[r].timeoutId=s(a[r])),a)),clear:()=>n([])}}const E={};function A(e){return e==="local"?localStorage:sessionStorage}function z(e,n,o){const t=JSON,s="local";function r(a,c){A(s).setItem(a,t.stringify(c))}if(!E[e]){const a=M(n,m=>{const w=A(s).getItem(e);w&&m(t.parse(w));{const y=u=>{u.key===e&&m(u.newValue?t.parse(u.newValue):null)};return window.addEventListener("storage",y),()=>window.removeEventListener("storage",y)}}),{subscribe:c,set:i}=a;E[e]={set(m){r(e,m),i(m)},update(m){const w=m(x(a));r(e,w),i(w)},subscribe:c}}return E[e]}z("modeOsPrefers",!1);z("modeUserPrefers",void 0);z("modeCurrent",!1);const V="(prefers-reduced-motion: reduce)";function oe(){return window.matchMedia(V).matches}const Pe=G(oe(),e=>{{const n=t=>{e(t.matches)},o=window.matchMedia(V);return o.addEventListener("change",n),()=>{o.removeEventListener("change",n)}}});var k={local:{},session:{}};function se(e){return e==="local"?localStorage:sessionStorage}function ae(e,n,o){var t,s,r,a,c,i,m,w;const y=(t=void 0)!=null?t:JSON,u=(s=void 0)!=null?s:"local",b=(r=void 0)!=null?r:!0,p=(c=(a=void 0)!=null?a:void 0)!=null?c:d=>console.error(`Error when writing value from persisted store "${e}" to ${u}`,d),I=(i=void 0)!=null?i:(d,l)=>console.error(`Error when parsing ${d?'"'+d+'"':"value"} from persisted store "${e}"`,l),_=(m=void 0)!=null?m:d=>d,P=(w=void 0)!=null?w:d=>d,T=typeof window<"u"&&typeof document<"u",v=T?se(u):null;function R(d,l){const f=P(l);try{v==null||v.setItem(d,y.stringify(f))}catch(g){p(g)}}function B(){function d(h){try{return y.parse(h)}catch(L){I(h,L)}}const l=v==null?void 0:v.getItem(e);if(l==null)return n;const f=d(l);return f==null?n:_(f)}if(!k[u][e]){const d=B(),l=M(d,h=>{if(T&&u=="local"&&b){const L=S=>{if(S.key===e&&S.newValue){let $;try{$=y.parse(S.newValue)}catch(H){I(S.newValue,H);return}const q=_($);h(q)}};return window.addEventListener("storage",L),()=>window.removeEventListener("storage",L)}}),{subscribe:f,set:g}=l;k[u][e]={set(h){g(h),R(e,h)},update(h){return l.update(L=>{const S=h(L);return R(e,S),S})},reset(){this.set(n)},subscribe:f}}return k[u][e]}function Re(e){return`[I;${e[0]},${e[1]},${e[2]},${e[3]}]`}function Me(e){e=e.replaceAll("-","");var n=new Array;for(let o=0;o<4;o++){const t=e.substr(o*8,8),s=re(t);n.push(s)}return n}function re(e){e.length%2!=0&&(e="0"+e);var n=parseInt(e,16),o=Math.pow(2,e.length/2*8);return n>o/2-1&&(n=n-o),n}function C(e){return new Promise((n,o)=>{let t=document.createElement("canvas");t.width=64,t.height=64;let s=t.getContext("2d");if(!s)return o();s.imageSmoothingEnabled=!1;let r=new Image;r.src=URL.createObjectURL(e),r.onload=async()=>{s.clearRect(0,0,64,64),s.drawImage(r,0,0),s.getImageData(54,20,1,1).data[3]<1&&(s.drawImage(t,44,16,20,32,45,16,20,32),s.drawImage(t,48,16,20,32,49,16,20,32),s.drawImage(t,36,48,28,16,37,48,28,16),s.drawImage(t,40,48,28,16,41,48,28,16),s.drawImage(t,52,48,28,16,53,48,28,16),s.drawImage(t,56,48,28,16,57,48,28,16));let c=await ie(t);n(c)}})}function N(e){return new Promise((n,o)=>{fetch(`https://minotar.net/skin/${e}`).then(t=>t.blob()).then(C).then(t=>{n(t)}).catch(()=>{o()})})}function Be(e){return new Promise((n,o)=>{var t=new FormData;t.append("file",e),fetch("https://api.mineskin.org/generate/upload",{method:"POST",body:t}).then(s=>s.json()).then(s=>{let r=s.delayInfo.millis<50?3e3:s.delayInfo.millis;return n({data:s.data,waittime:r})},o).catch(()=>{o()})})}function ie(e){return new Promise((n,o)=>{e.toBlob(t=>{t&&n(t)})})}function J(e){return new Promise((n,o)=>{const t=new FileReader;t.onloadend=()=>{n(t.result)},t.readAsDataURL(e)})}function Ee(e){return new Promise((n,o)=>{const t=new Image;t.src=e,t.onload=()=>{n(t)}})}const le=/^[A-Za-z0-9/._-]{1,32}$/;function ke(e){return le.test(e)}function ze(e){return e.toLowerCase().replace(/[^a-z0-9/._-]/g,"")}function Oe(e,n){var o=document.createElement("a");o.classList.add("download"),o.href=URL.createObjectURL(e),o.download=n,document.body.appendChild(o),o.click()}function $e(e){let n=Object.entries(e.parts),o=n.length;return n.filter(s=>s[1]!==null).length<o}function Ae(e){let n=Object.entries(e.parts),o=n.length,t=n.filter(s=>s[1]!==null);return Math.round(t.length/o*100)}const ce=[],O=ae("statues",ce),Q=(e,n)=>({username:e,skin:n,parts:{headTopLeftBack:null,headBottomLeftBack:null,headTopRightBack:null,headBottomRightBack:null,headTopLeftFront:null,headBottomLeftFront:null,headTopRightFront:null,headBottomRightFront:null,armRightTop:null,armRightMiddle:null,armRightBottom:null,armLeftTop:null,armLeftMiddle:null,armLeftBottom:null,legRightTop:null,legRightMiddle:null,legRightBottom:null,legLeftTop:null,legLeftMiddle:null,legLeftBottom:null,chestTopRight:null,chestMiddleRight:null,chestBottomRight:null,chestTopLeft:null,chestMiddleLeft:null,chestBottomLeft:null}}),Ue=async e=>{await N(e);let n=Q(e,null);O.update(o=>[...o,n])},je=async(e,n)=>{let o=await C(n),t=Q(e,await J(o));O.update(s=>[...s,t])},ue=async e=>new Promise(async(n,o)=>{let t=await N(e.username);return e.skin=await J(t),n()}),xe=async()=>new Promise(async(e,n)=>{let o=x(O),t=o.filter(s=>s.skin==null);for(let s of t)await ue(s);for(let s of o){let r=0,a=Object.entries(s.parts);for(let[c,i]of a)if(!i)return e({statue:s,part:c,index:r})}return e(null)});export{Ue as A,Le as a,Se as b,pe as c,be as d,Te as e,me as f,_e as g,he as h,Ie as i,ie as j,xe as k,Ee as l,Be as m,ve as n,Ae as o,Pe as p,$e as q,ye as r,O as s,ze as t,we as u,ke as v,Re as w,Me as x,Oe as y,je as z};