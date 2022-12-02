!function(){var e={4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var s=typeof n;if("string"===s||"number"===s)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===s){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var l in n)r.call(n,l)&&n[l]&&e.push(l)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.blocks,t=window.wp.element,r=window.wp.i18n,o=window.wp.data,s=window.wp.blockEditor,a=window.wp.components,l=window.wp.coreData,i=n(4184),c=n.n(i);function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}var p=window.lodash;function d(e){let{label:n,noOptionLabel:r,categoriesList:o,selectedCategoryId:s,onChange:l,...i}=e;const c=(0,t.useMemo)((()=>function(e){const t=e.map((e=>({children:[],parent:null,...e}))),n=(0,p.groupBy)(t,"parent");if(n.null&&n.null.length)return t;const r=e=>e.map((e=>{const t=n[e.id];return{...e,children:t&&t.length?r(t):[]}}));return r(n[0]||[])}(o)),[o]);return(0,t.createElement)(a.TreeSelect,u({label:n,noOptionLabel:r,onChange:l,tree:c,selectedId:s},i))}function g(e){let{label:n,pluralLabel:o,categoriesList:s,selectedCategoryId:l,categorySuggestions:i,selectedCategories:c,onCategoryChange:u}=e;return[s&&u&&(0,t.createElement)(d,{key:"filter-controls-category-select",categoriesList:s,label:n,noOptionLabel:(0,r.__)("All"),selectedCategoryId:l,onChange:u}),i&&u&&(0,t.createElement)(a.FormTokenField,{key:"filter-controls-categories-select",label:o,value:c&&c.map((e=>({id:e.id,value:e.name||e.value}))),suggestions:Object.keys(i),onChange:u,maxSuggestions:20})]}const y=[["lsedu-plus/lesson-list-header",{}],["lsedu-plus/lesson-list",{}]];var h,f=JSON.parse('{"u2":"lsedu-plus/lesson-query"}'),v=window.React;function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m.apply(this,arguments)}(0,e.registerBlockType)(f.u2,{icon:{src:function(e){return v.createElement("svg",m({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",viewBox:"0 0 306 279"},e),h||(h=v.createElement("path",{d:"M219.83 28.356c-.345-6.779 1.301-13.54 9.569-5.483 8.27 8.057 11.449 11.343 14.418 13.251 2.968 1.908 4.24 1.441 8.057.805 3.815-.636 4.452-.805 7.95-.275s2.933.954 5.865-1.908c2.934-2.862 9.188-10.601 15.23-16.326 6.042-5.724 11.031-4.134 11.031 5.937s-4.322 18.986-5.198 27.881c-.53 5.385-2.65 2.237-3.817 9.753-1.03 6.636-5.194 14.417-6.36 22.792s-3.656 17.386-4.912 19.931c-1.257 2.544-.918 2.334-.918 7.634s.115 5.174.424 9.752c.637 9.435.637 14.312-8.374 28.304-9.011 13.994-9.647 10.389-14.735 18.871s-7.421 12.827-9.116 15.16c-1.696 2.332-.742.211-.742 3.074 0 2.862-.426 33.499.423 36.998.849 3.498 1.484 8.162 2.969 8.692s7.844 4.135 11.131 6.785c3.286 2.649 2.598 10.08-6.572 10.706-4.452.305-18.921-.247-22.368-7.525-3.816-8.058-7.584-18.874-8.48-25.761-2.333-17.917-5.726-25.126-5.726-25.126s1.084 8.296-1.166 22.263c-2.545 15.795-12.615 25.124-12.615 25.124s4.45 1.804 4.239 6.044c-.212 4.24-1.273 7.739-22.37 9.33-21.095 1.59-20.4-.53-22.709-.425-2.309.106-6.974.849-13.971 1.696-6.997.849-11.767-.317-13.887 0-2.12.318-14.205 6.996-56.291 4.134-42.085-2.862-52.847-22.499-52.847-40.129 0-28.439 21.756-42.36 33.936-42.828 8.802-.339 19.806 8.633 1.523 8.972-11.509.213-22.006 12.865-22.006 33.01s19.467 25.73 39.611 25.73c18.102 0 25.106 1.263 30.47-1.185 9.649-4.401 11.342-6.433 11.85-12.02.508-5.586 3.555-15.065.508-42.828-3.047-27.762 23.191-67.204 51.292-78.715s22.684-7.787 29.116-9.987c6.433-2.201 16.42-6.94 19.129-10.326 2.708-3.386 10.495-10.157 12.696-12.357 4.249-4.25 3.323-7.116 3.05-17.128-.037-1.364-1.696-2.17-3.05-7.249s-1.632-8.107-3.155-13.693c-1.51-5.551-3-9.567-3.09-11.321z"})))}},edit:function(e){const{attributes:n,setAttributes:i,context:u}=e,{orderBy:p,order:d,taxonomyList:h,inherit:f}=n,{postId:v}=u,{categoriesList:m,areasList:w,intensitiesList:b,levelsList:x,durationsList:_}=(0,o.useSelect)((e=>{const{getEntityRecords:t}=e(l.store);return{categoriesList:t("taxonomy","category",{per_page:-1,context:"view"}),areasList:t("taxonomy","area",{per_page:-1,context:"view"}),intensitiesList:t("taxonomy","intensity",{per_page:-1,context:"view"}),levelsList:t("taxonomy","level",{per_page:-1,context:"view"}),durationsList:t("taxonomy","duration",{per_page:-1,context:"view"})}}),[]),C=(0,s.useBlockProps)({className:c()("lsedup-lesson-list__container")});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(s.InspectorControls,null,(0,t.createElement)(a.PanelBody,{title:(0,r.__)("Settings","lsedu-plus")},(0,t.createElement)(a.QueryControls,{orderBy:p,onOrderByChange:e=>{i({orderBy:e})},order:d,onOrderChange:e=>{i({order:e})}})),(0,t.createElement)(a.PanelBody,{title:(0,r.__)("Filters","ls-studio-blocks")},(0,t.createElement)(a.ToggleControl,{label:(0,r.__)("Inherit query from template","lsedu-plus"),help:(0,r.__)("Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently."),checked:f,onChange:e=>i({inherit:!!e})}),(0,t.createElement)(g,{label:(0,r.__)("Area","lsedu-plus"),categoriesList:w,selectedCategoryId:h.area,onCategoryChange:e=>{const t={...h};t.area=e,i({taxonomyList:t})}}))),(0,t.createElement)("div",C,(0,t.createElement)(s.InnerBlocks,{template:y,orientation:"horizontal"})))},save:function(){const e=s.useBlockProps.save();return(0,t.createElement)("div",e,(0,t.createElement)(s.InnerBlocks.Content,null))}})}()}();