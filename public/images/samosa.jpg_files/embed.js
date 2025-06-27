"use strict";(()=>{var l={NODE_ENV:"production",APP_ENV:"production",APP_VERSION:"776f12a067edd9ceb01fbfd253b034700cf67128",DATADOG_APP_ID:"b8017d73-eb5a-4400-8821-e44e4305fa09",DATADOG_CLIENT_TOKEN:"pubd0143500b48f50d7cf80235067f1817b"};var D="converse:init",P=e=>{let t=new CustomEvent(D,{detail:{initConverse:e}});window?.dispatchEvent(t)};var E={},h={on:(e,t)=>(E[e]=[...E[e]??[],t],()=>{E[e]=E[e]?.filter(o=>t!==o)||[]}),emit:(e,t)=>{let o=E[e]||[];for(let r of o)r(t)}};var i="converse-root",A="converse-widget-iframe",p="converse-widget",f="converse-portal-iframe",m="converse-portal",T="modal-root",b="converse-chat-bubble-iframe",u="converse-chat-bubble",$="chat-bubble-root";var C=e=>{let t=l[e];if(!t)throw new Error(`Missing environment variable: ${e}`);return t},v={get nodeEnv(){return C("NODE_ENV")},get env(){return C("APP_ENV")},get version(){return C("APP_VERSION")},get datadogAppId(){try{return C("DATADOG_APP_ID")}catch{return null}},get datadogClientToken(){try{return C("DATADOG_CLIENT_TOKEN")}catch{return null}}};var w=e=>{let t=document.createElement("iframe");return t.src=e,t},B=e=>{let t=document.createElement("script");return t.type="text/javascript",t.src=e,t},x=e=>{let t=document.createElement("link");return t.rel="stylesheet",t.href=e,t},M=e=>{let t=new Blob([e],{type:"text/html"});return URL.createObjectURL(t)},a=(e,t)=>`${e/(t||16)}rem`,I=e=>{if(v.nodeEnv!=="production")return`http://localhost:6010/${e}`;switch(v.env){case"production":return`https://converse-web-static.wolt.com/widget/${v.version}/${e}`;case"development":default:return`https://converse-web-static.development.dev.woltapi.com/widget/${v.version}/${e}`}},k=()=>{switch(v.env){case"production":return"https://webfonts.wolt.com/index.css";case"development":default:return"https://webfonts.development.dev.woltapi.com/index.css"}},N=e=>{Object.assign(window,{ConverseHost:{...e}})},R=()=>"ConverseHost"in window;var ne={extraLarge:1600,large:1280,medium:1023,mediumSmall:830,small:639,extraSmall:479},_=(e,t=["screen"])=>`@media ${(Array.isArray(t)?t:[t]).join(", ")} and (max-width: ${ne[e]}px)`;var O=`
  #${i} .${u} {
    width: ${a(64)};
    height: ${a(64)};
    position: fixed;
    bottom: ${a(20)};
    right: ${a(20)};
    z-index: 2147482999;
    color-scheme: normal;

    display: none;
  }

  #${i} .${u}.${u}--visible {
    display: block;
  }

  #${i} .${u} > #${b} {
    border: none;
    width: 100%;
    height: 100%;
  }
`,W=()=>document.querySelector(`#${i} .${u}`),oe=()=>{W()?.classList.remove(`${u}--visible`)},re=()=>{W()?.classList.add(`${u}--visible`)},se=async e=>{let t=await new Promise(r=>{e.addEventListener("load",()=>{let s=e.contentDocument?.getElementById($);if(!s)throw new Error("Converse: Chat bubble portal not found");r(s)})});new MutationObserver(()=>{t.children.length===0||Array.from(t.children).filter(s=>!(s instanceof HTMLStyleElement)).every(s=>s.children.length===0)?oe():re()}).observe(t,{subtree:!0,childList:!0})},ie=()=>{let e=document.createElement("div");return e.classList.add(u),e},H=()=>{let e=`
    <html lang="en">
      <head>
        <title>Converse</title>
        <base target="_parent">
      </head>
      <body>
        <div id="${$}"></div>
      </body>
    </html>
  `,t=w(M(e));t.id=b,se(t),t.addEventListener("load",()=>{t.contentDocument&&t.contentDocument.head.appendChild(x(I("widget.css")))});let o=ie();return o.appendChild(t),o},U=()=>{let e=document.getElementById(b);if(!e)return null;if(e instanceof HTMLIFrameElement)return e.contentDocument?.getElementById($)||null;throw new Error("Converse: Portal is not an iframe element")},z=e=>{let t=document.getElementById(b);t&&t instanceof HTMLIFrameElement&&t.contentDocument?.querySelector("html")?.setAttribute("data-cb-theme",e)};var F=async()=>new Promise(e=>{window.addEventListener("message",t=>{t.data==="hello"&&(!t.ports||t.ports.length!==1||e(t.ports[0]))})});var j=()=>Math.random().toString(36).slice(2),K=(...e)=>{v.env!=="production"&&console.debug("[MessageChannelClient]",...e)},S=e=>{let t=j(),o={},r=(n,c)=>{let d=j();return K(t,"postMessage()",n,d,c),e.postMessage({...n,ref:d,instanceId:t,backRef:c}),d},s=(n,c)=>(o[n]=[...o[n]??[],c],()=>{o[n]=o[n]?.filter(d=>d!==c)}),g=async(n,c,d)=>{let{timeout:y=6e4}=d||{};return new Promise((Q,X)=>{let Z=r(n),ee=setTimeout(()=>{X(new Error("No response received within set timeout"))},y),te=s(c,L=>{L.backRef!==Z||L.type!==c||(clearTimeout(ee),te(),Q(L))})})};return e.addEventListener("message",n=>{K(t,"onMessage()",n.data);let c=o[n.data.type];if(!c?.length)return;let d=y=>r(y,n.data.ref);c.forEach(y=>y(n.data,d))}),e.start(),{subscribe:s,postMessage:r,postMessageAsync:g}};var V=[k(),I("widget.css")],ae=[I("widget.js")],ce=()=>{let e=document.createElement("style");return e.textContent=`
    #${i} .${p} {
      z-index: 2147483000;
      position: fixed;
      bottom: ${a(20)};
      right: ${a(20)};
      transform-origin: right bottom;
      height: min(${a(704)}, 100% - ${a(40)});
      min-height: ${a(80)};
      width: ${a(400)};
      max-height: ${a(704)};
      border-radius: ${a(16)};
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.16) ${a(0)} ${a(5)} ${a(40)};

      transform: scale(0);
      opacity: 0;
      pointer-events: none;
    }

    /* mobile layout */
    ${_("small")} {
      html.with-converse {
        overflow: hidden !important;
      }

      #${i} .${p} {
        width: 100%;
        height: 100%;
        max-height: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0;
        box-shadow: none;
      }
    }

    #${i}:not(.no-animation) .${p} {
      transition: width 200ms, height 200ms, max-height 200ms, transform 300ms cubic-bezier(0, 1.2, 1, 1), opacity 83ms ease-out;
    }

    #${i} .${p}.${p}--open {
      transform: scale(1);
      opacity: 1;
      pointer-events: all;
    }

    #${i} .${p} > #${A} {
      position: absolute;
      width: 100%;
      height: 100%;
      border: none;
    }

    #${i} .${m} {
      z-index: 2147483000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color-scheme: normal;

      display: none;
    }

    #${i} .${m}.${m}--open {
      display: block;
    }

    #${i} .${m} > #${f} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    ${O}
  `,e},G=()=>document.querySelector(`#${i} .${p}`),q=e=>{let t=document.querySelector(`#${i}`)?.classList.contains("no-animation");document.querySelector("html")?.classList.remove("with-converse"),G()?.classList.remove(`${p}--open`),e&&setTimeout(e,t?0:300)},le=()=>{document.querySelector("html")?.classList.add("with-converse"),G()?.classList.add(`${p}--open`)},J=()=>document.querySelector(`#${i} .${m}`),de=()=>{J()?.classList.remove(`${m}--open`)},pe=()=>{J()?.classList.add(`${m}--open`)},me=()=>{let e=document.getElementById(f);if(!e)return null;if(e instanceof HTMLIFrameElement)return e.contentDocument?.getElementById(T)||null;throw new Error("Converse: Portal is not an iframe element")},ue=(e={})=>{let{noAnimation:t=!1}=e,o=document.createElement("div");return o.id=i,o.className=t?"no-animation":"",o.appendChild(ce()),o},ge=()=>{let e=document.createElement("div");return e.classList.add(p),e},ve=e=>{let t=`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Converse</title>
        <base target="_parent">
        <script type="application/json" id="converse-bootstrap">${JSON.stringify(e)}<\/script>
      </head>
      <body class="cb-elevated"></body>
    </html>
  `,o=w(M(t));o.id=A,o.addEventListener("load",()=>{if(q(),!o.contentDocument)return;let s=o.contentDocument.head;for(let g of ae)s.appendChild(B(g));for(let g of V)s.appendChild(x(g))});let r=ge();return r.appendChild(o),r},he=async e=>{let t=await new Promise(r=>{e.addEventListener("load",()=>{let s=e.contentDocument?.getElementById(T);if(!s)throw new Error("Converse: Modal portal not found");r(s)})});new MutationObserver(()=>{t.children.length===0||Array.from(t.children).filter(s=>!(s instanceof HTMLStyleElement)).every(s=>s.children.length===0)?de():pe()}).observe(t,{subtree:!0,childList:!0})},ye=()=>{let e=document.createElement("div");return e.classList.add(m),e},Ee=()=>{let e=`
    <html lang="en">
      <head>
        <title>Converse</title>
        <base target="_parent">
      </head>
      <body>
        <div id="${T}"></div>
      </body>
    </html>
  `,t=w(M(e));t.id=f,he(t),t.addEventListener("load",()=>{if(t.contentDocument)for(let r of V)t.contentDocument.head.appendChild(x(r))});let o=ye();return o.appendChild(t),o},fe=e=>{let t=document.getElementById(f);t&&t instanceof HTMLIFrameElement&&t.contentDocument?.querySelector("html")?.setAttribute("data-cb-theme",e)},be=e=>{let t=ue({noAnimation:e.noAnimation});document.body.appendChild(t);let o=[ve(e.configuration),Ee(),H()];t.append(...o)},Y=async({configuration:e,reduceMotion:t=!1,createToken:o})=>{if(typeof window>"u")throw new Error("Converse: Widget App can only be initialized in a browser environment");if(R())throw new Error("Converse: Widget App can only be initialized once");N({getPortalElement:n=>{switch(n){case"modal":return me();case"chat-bubble":return U();default:return null}}}),be({noAnimation:t,configuration:e});let{postMessage:r,subscribe:s}=S(await F());s("error",n=>{console.error("widget app error",n.payload.error)});let g=()=>{q(()=>{r({type:"close"}),h.emit("close",{})})};return s("request-open",()=>{le(),h.emit("open",{})}),s("request-close",g),s("location-change",n=>{h.emit("location-change",n.payload)}),s("create-token",async(n,c)=>{try{let d=await o();c({type:"set-token",payload:{token:d}})}catch(d){c({type:"set-token",payload:{error:d instanceof Error?d.message:"Couldn't create token"}})}}),{openConversation:n=>r({type:"open-conversation",payload:{conversationId:n}}),openConversationList:()=>r({type:"open-conversation-list"}),openDraft:(n,c)=>r({type:"open-draft",payload:{message:n,metadata:c}}),close:g,subscribe:h.on,setAnalyticsConsent:n=>r({type:"set-analytics-consent",payload:{consent:n}}),setThemeMode:n=>{fe(n),z(n),r({type:"set-theme-mode",payload:{themeMode:n}})},setLocale:n=>r({type:"set-locale",payload:{locale:n}}),setFeatures:n=>r({type:"set-features",payload:{features:n}}),tmpOverrideBackButtonVisibility:n=>r({type:"tmp-override-back-button-visibility",payload:{visibility:n}})}};P(Y);})();
//# sourceMappingURL=embed.js.map
