(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[860],{3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},9100:function(e,t,r){var n=r(9489),o=r(7067);function l(t,r,a){return o()?(e.exports=l=Reflect.construct.bind(),e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=l=function(e,t,r){var o=[null];o.push.apply(o,t);var l=new(Function.bind.apply(e,o));return r&&n(l,r.prototype),l},e.exports.__esModule=!0,e.exports.default=e.exports),l.apply(null,arguments)}e.exports=l,e.exports.__esModule=!0,e.exports.default=e.exports},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},319:function(e,t,r){var n=r(3646),o=r(6860),l=r(379),a=r(8206);e.exports=function(e){return n(e)||o(e)||l(e)||a()},e.exports.__esModule=!0,e.exports.default=e.exports},2102:function(e,t,r){var n=r(2632);e.exports={MDXRenderer:n}},2632:function(e,t,r){var n=r(9100),o=r(319),l=r(9713),a=r(7316),i=["scope","children"];function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=r(7294),p=r(4983).mdx,f=r(6948).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,l=a(e,i),u=f(t),d=s.useMemo((function(){if(!r)return null;var e=c({React:s,mdx:p},u),t=Object.keys(e),l=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(l)))}),[r,t]);return s.createElement(d,c({},l))}},7233:function(e,t,r){"use strict";r.r(t);var n=r(7294),o=r(7514),l=r(2102),a=r(7059);t.default=function(e){var t,r,i,u,c,s,p,f,d,m,v,x,y,b=e.data.mdx;null!==b&&(t=void 0!==(s=null===(p=b.frontmatter)||void 0===p||null===(f=p.hero_image)||void 0===f||null===(d=f.childImageSharp)||void 0===d?void 0:d.gatsbyImageData)?(0,a.c)(s):void 0,r=null===(m=b.frontmatter)||void 0===m?void 0:m.hero_image_alt,u=null===(v=b.frontmatter)||void 0===v?void 0:v.title,i=null===(x=b.frontmatter)||void 0===x?void 0:x.description,c=null===(y=b.frontmatter)||void 0===y?void 0:y.source);return n.createElement(n.Fragment,null,n.createElement(o.Z,{title:"string"==typeof u?u:"Blogpost",headline:u,description:"string"==typeof i?i:"A blogpost by Martin Berg Alstad",current:o.y.projects},n.createElement("article",{className:"pb-28"},t&&"string"==typeof r?n.createElement(a.G,{alt:r,image:t}):null,n.createElement("p",null,i),n.createElement("p",null,"Kildekoden på"," ",n.createElement("a",{className:"text-primaryPurple dark:text-primaryPink hover:underline",href:"string"==typeof c||void 0===c?c:void 0,target:"_blank",rel:"noreferrer"},"GitHub")),n.createElement("div",{className:"mt-2"},n.createElement(l.MDXRenderer,null,null!==b?b.body:"Something went wrong! mdx="+b)))))}}}]);
//# sourceMappingURL=component---src-pages-projects-mdx-slug-tsx-0b9188b6ebedad6a7b9f.js.map