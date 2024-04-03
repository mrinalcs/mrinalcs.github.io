!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).SwupPreloadPlugin=t()}(this,function(){function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},e.apply(this,arguments)}const t=e=>String(e).split(".").map(e=>String(parseInt(e||"0",10))).concat(["0","0"]).slice(0,3).join(".");class r{constructor(){this.isSwupPlugin=!0,this.swup=void 0,this.version=void 0,this.requires={},this.handlersToUnregister=[]}mount(){}unmount(){this.handlersToUnregister.forEach(e=>e()),this.handlersToUnregister=[]}_beforeMount(){if(!this.name)throw new Error("You must define a name of plugin when creating a class.")}_afterUnmount(){}_checkRequirements(){return"object"!=typeof this.requires||Object.entries(this.requires).forEach(([e,r])=>{if(!function(e,r,o){const s=function(e,t){var r;if("swup"===e)return null!=(r=t.version)?r:"";{var o;const r=t.findPlugin(e);return null!=(o=null==r?void 0:r.version)?o:""}}(e,o);return!!s&&((e,r)=>r.every(r=>{const[,o,s]=r.match(/^([\D]+)?(.*)$/)||[];var i,n;return((e,t)=>{const r={"":e=>0===e,">":e=>e>0,">=":e=>e>=0,"<":e=>e<0,"<=":e=>e<=0};return(r[t]||r[""])(e)})((n=s,i=t(i=e),n=t(n),i.localeCompare(n,void 0,{numeric:!0})),o||">=")}))(s,r)}(e,r=Array.isArray(r)?r:[r],this.swup)){const t=`${e} ${r.join(", ")}`;throw new Error(`Plugin version mismatch: ${this.name} requires ${t}`)}}),!0}on(e,t,r={}){var o;t=!(o=t).name.startsWith("bound ")||o.hasOwnProperty("prototype")?t.bind(this):t;const s=this.swup.hooks.on(e,t,r);return this.handlersToUnregister.push(s),s}once(t,r,o={}){return this.on(t,r,e({},o,{once:!0}))}before(t,r,o={}){return this.on(t,r,e({},o,{before:!0}))}replace(t,r,o={}){return this.on(t,r,e({},o,{replace:!0}))}off(e,t){return this.swup.hooks.off(e,t)}}const o=({hash:e}={})=>window.location.pathname+window.location.search+(e?window.location.hash:"");class s extends URL{constructor(e,t=document.baseURI){super(e.toString(),t),Object.setPrototypeOf(this,s.prototype)}get url(){return this.pathname+this.search}static fromElement(e){const t=e.getAttribute("href")||e.getAttribute("xlink:href")||"";return new s(t)}static fromUrl(e){return new s(e)}}function i(){return window.matchMedia("(hover: hover)").matches}function n(e){return!!e&&(e instanceof HTMLAnchorElement||e instanceof SVGAElement)}const a=window.requestIdleCallback||(e=>setTimeout(e,1));return class extends r{constructor(e){void 0===e&&(e={}),super();const t=this;this.name="SwupPreloadPlugin",this.requires={swup:">=4.5"},this.defaults={throttle:5,preloadInitialPage:!0,preloadHoveredLinks:!0,preloadVisibleLinks:{enabled:!1,threshold:.2,delay:500,containers:["body"],ignore:()=>!1}},this.options=void 0,this.queue=void 0,this.preloadObserver=void 0,this.preloadPromises=new Map,this.mouseEnterDelegate=void 0,this.touchStartDelegate=void 0,this.focusDelegate=void 0,this.onPageLoad=(e,t,r)=>{const{url:o}=e.to;return o&&this.preloadPromises.has(o)?this.preloadPromises.get(o):r(e,t)},this.onMouseEnter=function(e){try{if(e.target!==e.delegateTarget)return Promise.resolve();if(!i())return Promise.resolve();const r=e.delegateTarget;if(!n(r))return Promise.resolve();const{url:o,hash:a}=s.fromElement(r),l=t.swup.createVisit({to:o,hash:a,el:r,event:e});return t.swup.hooks.callSync("link:hover",l,{el:r,event:e}),t.preload(r,{priority:!0}),Promise.resolve()}catch(e){return Promise.reject(e)}},this.onTouchStart=e=>{if(i())return;const t=e.delegateTarget;n(t)&&this.preload(t,{priority:!0})},this.onFocus=e=>{const t=e.delegateTarget;n(t)&&this.preload(t,{priority:!0})};const{preloadVisibleLinks:r,...o}=e;this.options={...this.defaults,...o},"object"==typeof r?this.options.preloadVisibleLinks={...this.options.preloadVisibleLinks,enabled:!0,...r}:this.options.preloadVisibleLinks.enabled=Boolean(r),this.preload=this.preload.bind(this),this.queue=function(e){void 0===e&&(e=1);const t=[],r=[];let o=0,s=0;function i(){s<e&&o>0&&((r.shift()||t.shift()||(()=>{}))(),o--,s++)}return{add:function(e,s){if(void 0===s&&(s=!1),e.__queued){if(!s)return;{const r=t.indexOf(e);if(r>=0){const e=t.splice(r,1);o-=e.length}}}e.__queued=!0,(s?r:t).push(e),o++,o<=1&&i()},next:function(){s--,i()}}}(this.options.throttle)}mount(){const e=this.swup;e.options.cache?(e.hooks.create("page:preload"),e.hooks.create("link:hover"),e.preload=this.preload,e.preloadLinks=this.preloadLinks,this.replace("page:load",this.onPageLoad),this.preloadLinks(),this.on("page:view",()=>this.preloadLinks()),this.options.preloadVisibleLinks.enabled&&(this.preloadVisibleLinks(),this.on("page:view",()=>this.preloadVisibleLinks())),this.options.preloadHoveredLinks&&this.preloadLinksOnAttention(),this.options.preloadInitialPage&&this.preload(o())):console.warn("SwupPreloadPlugin: swup cache needs to be enabled for preloading")}unmount(){this.swup.preload=void 0,this.swup.preloadLinks=void 0,this.preloadPromises.clear(),this.mouseEnterDelegate?.destroy(),this.touchStartDelegate?.destroy(),this.focusDelegate?.destroy(),this.stopPreloadingVisibleLinks()}preload(e,t){void 0===t&&(t={});try{const r=this;let o,i;const a=t.priority??!1;if(Array.isArray(e))return Promise.all(e.map(e=>r.preload(e)));if(n(e))i=e,({href:o}=s.fromElement(e));else{if("string"!=typeof e)return Promise.resolve();o=e}if(!o)return Promise.resolve();if(r.preloadPromises.has(o))return Promise.resolve(r.preloadPromises.get(o));if(!r.shouldPreload(o,{el:i}))return Promise.resolve();const l=new Promise(e=>{r.queue.add(()=>{r.performPreload(o).catch(()=>{}).then(t=>e(t)).finally(()=>{r.queue.next(),r.preloadPromises.delete(o)})},a)});return r.preloadPromises.set(o,l),Promise.resolve(l)}catch(e){return Promise.reject(e)}}preloadLinks(){a(()=>{Array.from(document.querySelectorAll("a[data-swup-preload], [data-swup-preload-all] a")).forEach(e=>this.preload(e))})}preloadLinksOnAttention(){const{swup:e}=this,{linkSelector:t}=e.options,r={passive:!0,capture:!0};this.mouseEnterDelegate=e.delegateEvent(t,"mouseenter",this.onMouseEnter,r),this.touchStartDelegate=e.delegateEvent(t,"touchstart",this.onTouchStart,r),this.focusDelegate=e.delegateEvent(t,"focus",this.onFocus,r)}preloadVisibleLinks(){if(this.preloadObserver)return void this.preloadObserver.update();const{threshold:e,delay:t,containers:r}=this.options.preloadVisibleLinks;this.preloadObserver=function(e){let{threshold:t,delay:r,containers:o,callback:i,filter:n}=e;const l=new Map,h=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?u(e.target):c(e.target)})},{threshold:t}),u=e=>{const{href:t}=s.fromElement(e),o=l.get(t)??new Set;l.set(t,o),o.add(e),setTimeout(()=>{const r=l.get(t);r?.size&&(i(e),h.unobserve(e),r.delete(e))},r)},c=e=>{const{href:t}=s.fromElement(e);l.get(t)?.delete(e)},d=()=>{a(()=>{const e=o.map(e=>`${e} a[*|href]`).join(", ");Array.from(document.querySelectorAll(e)).filter(e=>n(e)).forEach(e=>h.observe(e))})};return{start:()=>d(),stop:()=>h.disconnect(),update:()=>(l.clear(),d())}}({threshold:e,delay:t,containers:r,callback:e=>this.preload(e),filter:e=>{if(this.options.preloadVisibleLinks.ignore(e))return!1;if(!e.matches(this.swup.options.linkSelector))return!1;const{href:t}=s.fromElement(e);return this.shouldPreload(t,{el:e})}}),this.preloadObserver.start()}stopPreloadingVisibleLinks(){this.preloadObserver&&this.preloadObserver.stop()}shouldPreload(e,t){let{el:r}=void 0===t?{}:t;const{url:i,href:n}=s.fromUrl(e);return!(!function(){if(navigator.connection){if(navigator.connection.saveData)return!1;if(navigator.connection.effectiveType?.endsWith("2g"))return!1}return!0}()||this.swup.cache.has(i)||this.preloadPromises.has(i)||this.swup.shouldIgnoreVisit(n,{el:r})||r&&this.swup.resolveUrl(i)===this.swup.resolveUrl(o()))}performPreload(e){try{const t=this,{url:r}=s.fromUrl(e),o=t.swup.createVisit({to:r});return Promise.resolve(t.swup.hooks.call("page:preload",o,{url:r},function(r,o){try{return Promise.resolve(t.swup.fetchPage(e,{visit:r})).then(function(e){return o.page=e,o.page})}catch(e){return Promise.reject(e)}}))}catch(e){return Promise.reject(e)}}}});
//# sourceMappingURL=index.umd.js.map