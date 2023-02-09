(()=>{"use strict";const e=window.wp.blocks,o=window.wp.i18n,t=JSON.parse('{"u2":"lsedu-plus/lesson-single-video"}'),l=window.wp.element,a=window.wp.data,s=window.wp.coreData,r=window.wp.blockEditor,n=window.wp.components,d=[{name:"Youtube",slug:"youtube",patterns:[/^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,/^https?:\/\/youtu\.be\/.+/i],responsive:!0},{name:"Vimeo",slug:"vimeo",patterns:[/^https?:\/\/((player|www)\.)?vimeo\.com\/.+/i],responsive:!0},{name:"Videa",slug:"videa",patterns:[/\/\/videa\.hu\/.+/i],responsive:!0}],i=(e,o)=>o.some((o=>e.match(o))),c=e=>{let o="wordpress";return d.map((t=>{i(e,t.patterns)&&(o=t.slug)})),o},u=e=>{let o=!1;return d.map((t=>{i(e,t.patterns)&&(o=t.responsive)})),o},p=window.React;var m;function v(){return v=Object.assign?Object.assign.bind():function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l])}return e},v.apply(this,arguments)}(0,e.registerBlockType)(t.u2,{icon:{src:function(e){return p.createElement("svg",v({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",viewBox:"0 0 306 279"},e),m||(m=p.createElement("path",{d:"M219.83 28.356c-.345-6.779 1.301-13.54 9.569-5.483 8.27 8.057 11.449 11.343 14.418 13.251 2.968 1.908 4.24 1.441 8.057.805 3.815-.636 4.452-.805 7.95-.275s2.933.954 5.865-1.908c2.934-2.862 9.188-10.601 15.23-16.326 6.042-5.724 11.031-4.134 11.031 5.937s-4.322 18.986-5.198 27.881c-.53 5.385-2.65 2.237-3.817 9.753-1.03 6.636-5.194 14.417-6.36 22.792s-3.656 17.386-4.912 19.931c-1.257 2.544-.918 2.334-.918 7.634s.115 5.174.424 9.752c.637 9.435.637 14.312-8.374 28.304-9.011 13.994-9.647 10.389-14.735 18.871s-7.421 12.827-9.116 15.16c-1.696 2.332-.742.211-.742 3.074 0 2.862-.426 33.499.423 36.998.849 3.498 1.484 8.162 2.969 8.692s7.844 4.135 11.131 6.785c3.286 2.649 2.598 10.08-6.572 10.706-4.452.305-18.921-.247-22.368-7.525-3.816-8.058-7.584-18.874-8.48-25.761-2.333-17.917-5.726-25.126-5.726-25.126s1.084 8.296-1.166 22.263c-2.545 15.795-12.615 25.124-12.615 25.124s4.45 1.804 4.239 6.044c-.212 4.24-1.273 7.739-22.37 9.33-21.095 1.59-20.4-.53-22.709-.425-2.309.106-6.974.849-13.971 1.696-6.997.849-11.767-.317-13.887 0-2.12.318-14.205 6.996-56.291 4.134-42.085-2.862-52.847-22.499-52.847-40.129 0-28.439 21.756-42.36 33.936-42.828 8.802-.339 19.806 8.633 1.523 8.972-11.509.213-22.006 12.865-22.006 33.01s19.467 25.73 39.611 25.73c18.102 0 25.106 1.263 30.47-1.185 9.649-4.401 11.342-6.433 11.85-12.02.508-5.586 3.555-15.065.508-42.828-3.047-27.762 23.191-67.204 51.292-78.715s22.684-7.787 29.116-9.987c6.433-2.201 16.42-6.94 19.129-10.326 2.708-3.386 10.495-10.157 12.696-12.357 4.249-4.25 3.323-7.116 3.05-17.128-.037-1.364-1.696-2.17-3.05-7.249s-1.632-8.107-3.155-13.693c-1.51-5.551-3-9.567-3.09-11.321z"})))}},edit:function(e){let{isSelected:t,attributes:d,setAttributes:i,context:p}=e;const{controls:m,autoplay:v,loop:w,muted:_,download:g}=d,{postId:y,order:b,orderBy:h}=p,E=(0,a.useSelect)((e=>e("core/editor").getCurrentPostType()),[]),f=(0,r.useBlockProps)(),C=["video"],[T,k]=(0,s.useEntityProp)("postType",E,"meta"),[D]=(0,s.useEntityProp)("postType",E,"featured_media",y),S=T.video_data.video_src,P=T.video_data.provider,B=(T.video_data.responsive,T.video_data.videoDuration,(0,l.useRef)(null)),{media:R}=(0,a.useSelect)((e=>{const{getMedia:o}=e("core");return{media:D&&o(D,{context:"view"})}})),I=(R?.media_details?.sizes?.videoPlaceholderImage?R?.media_details?.sizes?.videoPlaceholderImage?.source_url:R?.media_details?.sizes?.full?.source_url,e=>{const o={...T.video_data};o.video_src=e.url,o.provider=c(e.url),o.responsive=u(e.url),o.videoDuration=0,k({...T,video_data:o})}),V=e=>{const o={...T.video_data};console.log(o),o.video_src=e,o.provider=c(e),o.responsive=u(e),o.videoDuration=0,k({...T,video_data:o})};return console.log(T),(0,l.createElement)(l.Fragment,null,(0,l.createElement)(r.InspectorControls,null,(0,l.createElement)(n.PanelBody,{title:(0,o.__)("Settings","lsedu-plus")},(0,l.createElement)(n.ToggleControl,{label:(0,o.__)("controls","lsedu-plus"),help:v?(0,o.__)("Enable Video autoplay","lsedu-plus"):(0,o.__)("Disable Video autoplay","lsedu-plus"),checked:m,onChange:e=>i({controls:e})}),(0,l.createElement)(n.ToggleControl,{label:(0,o.__)("autoplay","lsedu-plus"),help:v?(0,o.__)("Enable Video autoplay","lsedu-plus"):(0,o.__)("Disable Video autoplay","lsedu-plus"),checked:v,onChange:e=>{i({autoplay:e}),i({muted:e})}}),(0,l.createElement)(n.ToggleControl,{label:(0,o.__)("loop","lsedu-plus"),checked:w,onChange:e=>i({loop:e})}),(0,l.createElement)(n.ToggleControl,{label:(0,o.__)("muted","lsedu-plus"),checked:_,onChange:e=>i({muted:e})}),(0,l.createElement)(n.ToggleControl,{label:(0,o.__)("download","lsedu-plus"),checked:g,onChange:e=>i({download:e})}))),S&&(0,l.createElement)(r.BlockControls,null,(0,l.createElement)(r.MediaReplaceFlow,{mediaURL:S,allowedTypes:C,accept:"video/*",onSelect:I,onSelectURL:V}),(0,l.createElement)(n.ToolbarButton,{onClick:()=>{const e={...T.video_data};console.log(e),e.video_src="",e.provider=c(""),e.responsive=u(""),e.videoDuration=0,k({...T,video_data:e})}},(0,o.__)("Remove","lsedu-plus"))),S&&(0,l.createElement)("figure",f,(0,l.createElement)(n.Disabled,{isDisabled:!t},"wordpress"===P&&(0,l.createElement)("video",{id:"player",controls:m,autoplay:v,src:S,ref:B,onLoadedMetadata:()=>{const e=B.current,o={...T.video_data};console.log(T.video_data),e&&(console.log(`The video is ${parseInt(e.duration)} seconds long.`),o.videoDuration=parseInt(e.duration),k({...T,video_data:o}))}}),"youtube"===P&&(0,l.createElement)("div",{className:"lsedup-youtube-video-player"},(0,l.createElement)("iframe",{id:"player",src:S,frameborder:"0",allow:"fullscreen;"})),"vimeo"===P&&(0,l.createElement)("div",{className:"lsedup-vimeo-video-player"},(0,l.createElement)("iframe",{id:"player",src:S,frameborder:"0",allow:"fullscreen;"})))),!S&&(0,l.createElement)(r.MediaPlaceholder,{icon:"admin-users",accept:"video/*",allowedTypes:C,onSelect:I,onSelectURL:V}))}})})();