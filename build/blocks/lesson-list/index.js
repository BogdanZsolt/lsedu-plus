!function(){var e={4184:function(e,t){var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var s=typeof n;if("string"===s||"number"===s)e.push(n);else if(Array.isArray(n)){if(n.length){var l=r.apply(null,n);l&&e.push(l)}}else if("object"===s){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var c in n)o.call(n,c)&&n[c]&&e.push(c)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.blocks;function t(){return t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},t.apply(this,arguments)}var o=window.wp.element,r=window.wp.blockEditor,s=window.wp.data,l=window.wp.coreData,c=window.wp.components,i=window.wp.i18n,a=window.wp.primitives,p=(0,o.createElement)(a.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,o.createElement)(a.Path,{d:"M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"})),u=(0,o.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(a.Path,{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7.8 16.5H5c-.3 0-.5-.2-.5-.5v-6.2h6.8v6.7zm0-8.3H4.5V5c0-.3.2-.5.5-.5h6.2v6.7zm8.3 7.8c0 .3-.2.5-.5.5h-6.2v-6.8h6.8V19zm0-7.8h-6.8V4.5H19c.3 0 .5.2.5.5v6.2z",fillRule:"evenodd",clipRule:"evenodd"})),d=n(4184),m=n.n(d);const v=[["core/post-featured-image",{sizeSlug:"videoPlaceholderImage"}],["lsedu-plus/lesson-title",{level:4}]];var f,w=JSON.parse('{"u2":"lsedu-plus/lesson-list"}'),g=window.React;function y(){return y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},y.apply(this,arguments)}(0,e.registerBlockType)(w.u2,{icon:{src:function(e){return g.createElement("svg",y({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",viewBox:"0 0 306 279"},e),f||(f=g.createElement("path",{d:"M219.83 28.356c-.345-6.779 1.301-13.54 9.569-5.483 8.27 8.057 11.449 11.343 14.418 13.251 2.968 1.908 4.24 1.441 8.057.805 3.815-.636 4.452-.805 7.95-.275s2.933.954 5.865-1.908c2.934-2.862 9.188-10.601 15.23-16.326 6.042-5.724 11.031-4.134 11.031 5.937s-4.322 18.986-5.198 27.881c-.53 5.385-2.65 2.237-3.817 9.753-1.03 6.636-5.194 14.417-6.36 22.792s-3.656 17.386-4.912 19.931c-1.257 2.544-.918 2.334-.918 7.634s.115 5.174.424 9.752c.637 9.435.637 14.312-8.374 28.304-9.011 13.994-9.647 10.389-14.735 18.871s-7.421 12.827-9.116 15.16c-1.696 2.332-.742.211-.742 3.074 0 2.862-.426 33.499.423 36.998.849 3.498 1.484 8.162 2.969 8.692s7.844 4.135 11.131 6.785c3.286 2.649 2.598 10.08-6.572 10.706-4.452.305-18.921-.247-22.368-7.525-3.816-8.058-7.584-18.874-8.48-25.761-2.333-17.917-5.726-25.126-5.726-25.126s1.084 8.296-1.166 22.263c-2.545 15.795-12.615 25.124-12.615 25.124s4.45 1.804 4.239 6.044c-.212 4.24-1.273 7.739-22.37 9.33-21.095 1.59-20.4-.53-22.709-.425-2.309.106-6.974.849-13.971 1.696-6.997.849-11.767-.317-13.887 0-2.12.318-14.205 6.996-56.291 4.134-42.085-2.862-52.847-22.499-52.847-40.129 0-28.439 21.756-42.36 33.936-42.828 8.802-.339 19.806 8.633 1.523 8.972-11.509.213-22.006 12.865-22.006 33.01s19.467 25.73 39.611 25.73c18.102 0 25.106 1.263 30.47-1.185 9.649-4.401 11.342-6.433 11.85-12.02.508-5.586 3.555-15.065.508-42.828-3.047-27.762 23.191-67.204 51.292-78.715s22.684-7.787 29.116-9.987c6.433-2.201 16.42-6.94 19.129-10.326 2.708-3.386 10.495-10.157 12.696-12.357 4.249-4.25 3.323-7.116 3.05-17.128-.037-1.364-1.696-2.17-3.05-7.249s-1.632-8.107-3.155-13.693c-1.51-5.551-3-9.567-3.09-11.321z"})))}},edit:function(e){const{clientId:n,attributes:a,setAttributes:d,context:f}=e,{isSlider:w,columns:g,displayLayout:y}=a,{postType:h,order:x,orderBy:b,setTaxonomy:E}=f,[k,_]=(0,o.useState)(),{posts:S,blocks:I}=(0,s.useSelect)((e=>{const{getEntityRecords:t}=e(l.store),{getBlocks:o}=e(r.store),s=[];E.taxSelect&&void 0!==E.taxSelect&&(s[0]=Number(E.taxSelect));const c={per_page:-1,_embed:!0,order:x,orderby:b,parent:0};return"category"===E.taxType?c.categories=s:c[E.taxType]=s,{posts:t("postType",h,c),blocks:o(n)}}),[x,b,n,E]),C=()=>{const e=(0,r.useInnerBlocksProps)({className:m()({"wp-block-post":!0})},{template:v},{renderAppender:!1});return(0,o.createElement)("div",e)},B=(0,o.memo)((function(e){let{blocks:n,blockContextId:s,isHidden:l,setActiveBlockContextId:c}=e;const i=(0,r.__experimentalUseBlockPreview)({blocks:n,props:{className:m()({"wp-block-post":!0})}}),a=()=>{c(s)},p={display:l?"none":void 0};return(0,o.createElement)("div",t({},i,{tabIndex:0,role:"button",onClick:a,onKeyPress:a,style:p}))})),O=(0,o.useMemo)((()=>S?.map((e=>({postType:e.type,postId:e.id})))),[S]),P=(0,r.useBlockProps)({className:m()({swiper:w,"lsedup-lesson-list":!0,isSlider:w,"is-flex-container":"flex"===y&&!w,[`has-columns-${g}`]:"flex"===y||w,"is-list-container":"list"===y})});if(!S)return(0,o.createElement)("p",P,(0,o.createElement)(c.Spinner,null));if(!S.length)return(0,o.createElement)("p",P," ",(0,i.__)("No results found.","lsedu-plus"));const j=[{icon:p,title:(0,i.__)("List view","lsedu-plus"),onClick:()=>d({displayLayout:"list"}),isActive:"list"===y},{icon:u,title:(0,i.__)("Grid view","lsedu-plus"),onClick:()=>d({displayLayout:"flex"}),isActive:"flex"===y}];return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(r.InspectorControls,null,(0,o.createElement)(c.PanelBody,{title:(0,i.__)("Settings","lsedu-plus")},(0,o.createElement)(c.ToggleControl,{label:(0,i.__)("Slider","lsedu-plus"),onChange:()=>d({isSlider:!w}),help:w?(0,i.__)("List slider on","lsedu-plus"):(0,i.__)("List slider off","lsedu-plus"),checked:w}),"flex"===y&&!w&&(0,o.createElement)(c.RangeControl,{label:(0,i.__)("Columns","lsedu-plus"),min:2,max:6,onChange:e=>d({columns:e}),value:g}))),!w&&(0,o.createElement)(r.BlockControls,null,(0,o.createElement)(c.ToolbarGroup,{controls:j})),O&&(0,o.createElement)("div",P,w&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)("div",{className:"lsedup-lesson-list__prev"}),(0,o.createElement)("div",{className:"lsedup-lesson-list__next"})),O.map((e=>(0,o.createElement)(r.BlockContextProvider,{key:e.postId,value:e},e.postId===(k||O[0]?.postId)?(0,o.createElement)(C,null):null,(0,o.createElement)(B,{blocks:I,blockContextId:e.postId,setActiveBlockContextId:_,isHidden:e.postId===(k||O[0]?.postId)}))))))},save:function(){return(0,o.createElement)(r.InnerBlocks.Content,null)}})}()}();