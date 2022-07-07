"use strict";(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[845],{5704:function(e,r,t){var n=t(7294);function a(){return a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a.apply(this,arguments)}function o(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=(0,n.forwardRef)((function(e,r){var t=e.color,l=void 0===t?"currentColor":t,i=e.size,u=void 0===i?24:i,s=o(e,["color","size"]);return n.createElement("svg",a({ref:r,xmlns:"http://www.w3.org/2000/svg",width:u,height:u,viewBox:"0 0 24 24",fill:"none",stroke:l,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),n.createElement("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}))}));l.displayName="GitHub",r.Z=l},6930:function(e,r,t){var n=t(7294);r.Z=function(e){var r=e.name,t=e.value,a=e.hoverTitle,o=e.className,l=e.onClick;return n.createElement("button",{title:a,className:(void 0!==l?"cursor-pointer":"cursor-auto")+" "+o+" border rounded-xl\n             border-gray-500",onClick:l},n.createElement("span",{className:"mx-2 w-max"},r+(void 0!==t?"("+t+")":"")))}},2960:function(e,r,t){t.r(r),t.d(r,{splitCSV:function(){return d}});var n=t(7294),a=t(7514),o=t(1597),l=t(5704),i=t(7059),u=t(7782),s=t(6930);function c(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(t)return(t=t.call(e)).next.bind(t);if(Array.isArray(e)||(t=function(e,r){if(!e)return;if("string"==typeof e)return m(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return m(e,r)}(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var d=function(e){return e.split(";")};r.default=function(e){for(var r,t,m=e.data.allMdx,v=(0,u.useTranslation)().t,f=m.nodes.map((function(e){var r;return null===(r=e.frontmatter)||void 0===r?void 0:r.tags})),p=n.useState(f),y=p[0],b=p[1],g=[],h=0,w=c(y);!(t=w()).done;){var E=t.value,k=d(null!=E?E:"");if(void 0!==k)for(var x,j=c(k);!(x=j()).done;){for(var N,S=x.value,C=!1,O=c(g);!(N=O()).done;){var P=N.value;S.toLowerCase()===P.key.toLowerCase()&&(P.value+=1,C=!0)}C||(g[h]={key:S,value:1},h++)}}g.sort((function(e,r){return r.value-e.value}));var A=n.useState(""),L=A[0],T=A[1],I=n.useState(!0),M=I[0],Z=I[1],_=n.useState(v("showMore")),R=_[0],G=_[1];function z(e,r){var t;return d(null!==(t=null==e?void 0:e.toLowerCase())&&void 0!==t?t:"").some((function(e){return e===r.toLowerCase()}))}return n.createElement(a.Z,{title:v("projects"),headline:v("myProjects"),description:v("projectsByMe"),current:a.y.projects},n.createElement("div",null,n.createElement("div",{className:"flex "+(M?"overflow-scroll pb-3 mr-[6.65rem]":"flex-wrap mb-2")+" gap-1"},g.map((function(e){return n.createElement("div",{key:e.key},n.createElement(s.Z,{name:e.key,value:e.value,onClick:function(){return function(e){if(L===e)T(""),b(f);else{T(e);var r=m.nodes.map((function(r){var t,n;return z(null===(t=r.frontmatter)||void 0===t?void 0:t.tags,e)?null===(n=r.frontmatter)||void 0===n?void 0:n.tags:null}));r=r.filter((function(e){return null!==e})),b(r)}}(e.key)},className:"hover:border-primaryPurple w-max\n                                     "+(L===e.key?"!border-primaryPurple":"")}))})),n.createElement(s.Z,{name:R.toString(),onClick:function(){Z(!M),G(v(M?"showLess":"showMore"))},hoverTitle:v(M?"showMoreTags":"showLessTags"),className:"hover:border-primaryPurple min-w-max \n                         "+(M?"absolute bg-white dark:bg-gray-900 right-0":"")+" shadow-sm shadow-primaryPurple"})),m.nodes.map((function(e){var t,a,u,c,m,f,p;return n.createElement("div",{key:e.id},""===L||z(null===(t=e.frontmatter)||void 0===t?void 0:t.tags,L)?n.createElement("article",{className:"border-2 border-gray-500 rounded-xl mb-10 shadow"},n.createElement("div",{className:"mx-2 mb-2"},n.createElement("div",{className:"flex items-center my-3"},n.createElement(o.Link,{className:"text-primaryPurple dark:text-primaryPink hover:underline mr-2",to:e.slug},n.createElement("h2",{className:"text-xl"},null===(a=e.frontmatter)||void 0===a?void 0:a.title)),n.createElement("a",{title:v("openInGitHub"),href:null===(u=e.frontmatter)||void 0===u?void 0:u.source,target:"_blank",rel:"noreferrer"},n.createElement(l.Z,null))),n.createElement("div",{className:"grid grid-flow-col justify-between mb-2"},n.createElement("p",null,v("timeToRead")," ",e.timeToRead," ",1===e.timeToRead?v("minute"):v("minutes"))),n.createElement("div",{className:"flex flex-row flex-wrap gap-1"},d(null===(c=e.frontmatter)||void 0===c?void 0:c.tags).map((function(e){return n.createElement("div",{key:e},n.createElement(s.Z,{name:e}))})))),(r=(0,i.c)(null===(p=e.frontmatter)||void 0===p?void 0:p.hero_image.childImageSharp.gatsbyImageData),!0),r?n.createElement(i.G,{alt:null===(m=e.frontmatter)||void 0===m?void 0:m.hero_image_alt,image:r}):null,n.createElement("div",{className:"mx-2 my-4"},n.createElement("p",null,null===(f=e.frontmatter)||void 0===f?void 0:f.description))):null)}))))}}}]);
//# sourceMappingURL=component---src-pages-projects-index-tsx-e35187298767cabcb27c.js.map