(()=>{var e={184:(e,t)=>{var n;!function(){"use strict";var l={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var a=r.apply(null,n);a&&e.push(a)}}else if("object"===o){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var i in n)l.call(n,i)&&n[i]&&e.push(i)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()}},t={};function n(l){var r=t[l];if(void 0!==r)return r.exports;var o=t[l]={exports:{}};return e[l](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},e.apply(this,arguments)}const t=window.wp.element,l=window.wp.blocks,r=window.wp.data,o=window.wp.coreData,a=window.wp.i18n,i=window.wp.blockEditor,s=window.wp.components;function c(e){let{level:n,isPressed:l=!1}=e;const r={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return r.hasOwnProperty(n)?(0,t.createElement)(s.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:l},(0,t.createElement)(s.Path,{d:r[n]})):null}const v=[1,2,3,4,5,6],h={className:"block-library-heading-level-dropdown"};function u(e){let{selectedLevel:n,onChange:l}=e;return(0,t.createElement)(s.ToolbarDropdownMenu,{popoverProps:h,icon:(0,t.createElement)(c,{level:n}),label:(0,a.__)("Change heading level"),controls:v.map((e=>{{const r=e===n;return{icon:(0,t.createElement)(c,{level:e,isPressed:r}),label:(0,a.sprintf)((0,a.__)("Heading %d"),e),isActive:r,onClick(){l(e)},role:"menuitemradio"}}}))})}var p=n(184),g=n.n(p);const d=JSON.parse('{"u2":"lsedu-plus/lesson-list-header-title"}'),m=window.React;var w;function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},f.apply(this,arguments)}(0,l.registerBlockType)(d.u2,{icon:{src:function(e){return m.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",viewBox:"0 0 306 279"},e),w||(w=m.createElement("path",{d:"M219.83 28.356c-.345-6.779 1.301-13.54 9.569-5.483 8.27 8.057 11.449 11.343 14.418 13.251 2.968 1.908 4.24 1.441 8.057.805 3.815-.636 4.452-.805 7.95-.275s2.933.954 5.865-1.908c2.934-2.862 9.188-10.601 15.23-16.326 6.042-5.724 11.031-4.134 11.031 5.937s-4.322 18.986-5.198 27.881c-.53 5.385-2.65 2.237-3.817 9.753-1.03 6.636-5.194 14.417-6.36 22.792s-3.656 17.386-4.912 19.931c-1.257 2.544-.918 2.334-.918 7.634s.115 5.174.424 9.752c.637 9.435.637 14.312-8.374 28.304-9.011 13.994-9.647 10.389-14.735 18.871s-7.421 12.827-9.116 15.16c-1.696 2.332-.742.211-.742 3.074 0 2.862-.426 33.499.423 36.998.849 3.498 1.484 8.162 2.969 8.692s7.844 4.135 11.131 6.785c3.286 2.649 2.598 10.08-6.572 10.706-4.452.305-18.921-.247-22.368-7.525-3.816-8.058-7.584-18.874-8.48-25.761-2.333-17.917-5.726-25.126-5.726-25.126s1.084 8.296-1.166 22.263c-2.545 15.795-12.615 25.124-12.615 25.124s4.45 1.804 4.239 6.044c-.212 4.24-1.273 7.739-22.37 9.33-21.095 1.59-20.4-.53-22.709-.425-2.309.106-6.974.849-13.971 1.696-6.997.849-11.767-.317-13.887 0-2.12.318-14.205 6.996-56.291 4.134-42.085-2.862-52.847-22.499-52.847-40.129 0-28.439 21.756-42.36 33.936-42.828 8.802-.339 19.806 8.633 1.523 8.972-11.509.213-22.006 12.865-22.006 33.01s19.467 25.73 39.611 25.73c18.102 0 25.106 1.263 30.47-1.185 9.649-4.401 11.342-6.433 11.85-12.02.508-5.586 3.555-15.065.508-42.828-3.047-27.762 23.191-67.204 51.292-78.715s22.684-7.787 29.116-9.987c6.433-2.201 16.42-6.94 19.129-10.326 2.708-3.386 10.495-10.157 12.696-12.357 4.249-4.25 3.323-7.116 3.05-17.128-.037-1.364-1.696-2.17-3.05-7.249s-1.632-8.107-3.155-13.693c-1.51-5.551-3-9.567-3.09-11.321z"})))}},edit(n){let{attributes:l,setAttributes:c,context:v}=n;const{titleInactive:h,isTitleSettingActive:p,isLink:d,rel:m,level:w,textAlign:f,linkTarget:b}=l,{setTaxonomy:_}=v,y=(0,i.useBlockProps)({className:g()({"lsedup-lesson-list__header-title":!0,[`has-text-align-${f}`]:f})}),E=0===w?"p":`h${w}`;let x="",k="";const{list:H,isLoading:C}=(0,r.useSelect)((e=>{const{getEntityRecords:t,isResolving:n}=e(o.store),l=[],r=_[0]&&_[0].taxSelect?_[0].taxSelect:"";return l[0]=Number(r),{list:t("taxonomy",_[0].taxType,{include:l}),isLoading:n("getEntityRecords","taxonomyArgs")}}),[_]);return C||(p?x=H&&H.length>0?H[0].name:"":(x=h&&h.length>0?h:"",c({titleInactive:x})),k=H&&H.length>0?H[0].link:"#"),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(i.BlockControls,{group:"block"},(0,t.createElement)(u,{selectedLevel:w,onChange:e=>c({level:e})}),(0,t.createElement)(i.AlignmentControl,{value:f,onChange:e=>{c({textAlign:e})}})),(0,t.createElement)(i.InspectorControls,null,(0,t.createElement)(s.PanelBody,{title:(0,a.__)("title Setting","lsedu-plus")},(0,t.createElement)(s.ToggleControl,{label:(0,a.__)("Activate title setting","lsedu-plus"),onChange:()=>c({isTitleSettingActive:!p}),checked:p})),(0,t.createElement)(s.PanelBody,{title:(0,a.__)("Link settings","lsedu-plus")},(0,t.createElement)(s.ToggleControl,{label:(0,a.__)("Make title a link","lsedu-plus"),onChange:()=>c({isLink:!d}),checked:d}),d&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)(s.ToggleControl,{label:(0,a.__)("Open in new tab","lsedu-plus"),onChange:e=>c({linkTarget:e?"_blank":"_self"}),checked:"_blank"===b}),(0,t.createElement)(s.TextControl,{label:(0,a.__)("Link rel"),value:m,onChange:e=>c({rel:e})})))),(0,t.createElement)((()=>d?(0,t.createElement)(E,y,p&&(0,t.createElement)("a",{href:k,target:b,onClick:e=>e.preventDefault()},x),!p&&(0,t.createElement)(i.RichText,{tagName:"a",href:k,target:b,value:x,withoutInteractiveFormatting:!0,onChange:e=>c({title:e}),placeholder:x&&""===x?(0,a.__)("Title","lsedu-plus"):x})):p?(0,t.createElement)(E,e({},y,{dangerouslySetInnerHTML:{__html:x}})):(0,t.createElement)(i.RichText,e({},y,{tagName:E,value:x,withoutInteractiveFormatting:!0,onChange:e=>c({title:e}),placeholder:x&&""===x?(0,a.__)("Title","lsedu-plus"):x}))),null))},save:()=>null})})()})();