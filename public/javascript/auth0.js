/* Auth0 SDK - v0.0.1 - 2013-8-23
 * http://auth0.com/
 * Copyright (c) 2013 */
(function(){var e="auth0-sdk";if(document.getElementById(e))return;window.Auth0=function(){var e=[];return{ready:function(t){if(!t)return e;e.push(t)}}}();var t=function(e){return decodeURIComponent(e.replace(/\+/g," "))},n=document.getElementsByTagName("script"),r=/(?:https?:)?(?:\/\/)?[^\/]*\.auth0\.com(?:\:\d+)?\/[^#\/]+#(.*)$/,i=/([^&=]+)=?([^&]*)/g,s,o,u={},a,f,l=document.getElementById("auth0");if(l)f=/#(.*)$/.exec(l.src)[1];else{for(a in n)if(s=r.exec(n[a].src)){f=s[1];break}if(!f)throw new Error("Can't find auth0 script.")}while(o=i.exec(f))u[t(o[1])]=t(o[2]);var c=[];for(a in u)c.push(encodeURIComponent(a)+"="+encodeURIComponent(u[a]));var h=u.mode==="headless"?"sdk-headless.js":"sdk.js",p=u.mode==="headless"?"&target=headless":"",d=document.createElement("script");d.id=e,d.src=(u.cdn||"https://d19p4zemcycm7a.cloudfront.net")+"/"+h+"#"+c.join("&")+p,n[0].parentNode.insertBefore(d,n[0])})();