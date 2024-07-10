import{X,Y as G,a as d,Z as D,$ as M,a0 as q,L as K,a1 as W,r as k,a2 as H,_ as S,j as w,q as T,a3 as Y,d as $,m as _,a4 as U,l as N,u as Z,c as J,n as L,k as R,x as z,w as Q,y as I}from"./index-CeqGM_HI.js";import{r as ee,m as te,a as oe}from"./Grow-C-R1r_yn.js";const re=["component","direction","spacing","divider","children","className","useFlexGap"],se=X(),ae=G("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function ne(e){return Y({props:e,name:"MuiStack",defaultTheme:se})}function ie(e,t){const o=k.Children.toArray(e).filter(Boolean);return o.reduce((r,a,s)=>(r.push(a),s<o.length-1&&r.push(k.cloneElement(t,{key:`separator-${s}`})),r),[])}const le=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],ce=({ownerState:e,theme:t})=>{let o=d({display:"flex",flexDirection:"column"},D({theme:t},M({values:e.direction,breakpoints:t.breakpoints.values}),r=>({flexDirection:r})));if(e.spacing){const r=q(t),a=Object.keys(t.breakpoints.values).reduce((n,c)=>((typeof e.spacing=="object"&&e.spacing[c]!=null||typeof e.direction=="object"&&e.direction[c]!=null)&&(n[c]=!0),n),{}),s=M({values:e.direction,base:a}),l=M({values:e.spacing,base:a});typeof s=="object"&&Object.keys(s).forEach((n,c,p)=>{if(!s[n]){const u=c>0?s[p[c-1]]:"column";s[n]=u}}),o=K(o,D({theme:t},l,(n,c)=>e.useFlexGap?{gap:U(r,n)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${le(c?s[c]:e.direction)}`]:U(r,n)}}))}return o=W(t.breakpoints,o),o};function de(e={}){const{createStyledComponent:t=ae,useThemeProps:o=ne,componentName:r="MuiStack"}=e,a=()=>$({root:["root"]},n=>_(r,n),{}),s=t(ce);return k.forwardRef(function(n,c){const p=o(n),f=H(p),{component:u="div",direction:m="column",spacing:b=0,divider:x,children:h,className:C,useFlexGap:P=!1}=f,y=S(f,re),g={direction:m,spacing:b,useFlexGap:P},v=a();return w.jsx(s,d({as:u,ownerState:g,ref:c,className:T(v.root,C)},y,{children:x?ie(h,x):h}))})}function ue(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function pe(e){return parseFloat(e)}function me(e){return N}const fe=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],he=["component","slots","slotProps"],ge=["component"];function ve(e,t){const{className:o,elementType:r,ownerState:a,externalForwardedProps:s,getSlotOwnerState:l,internalForwardedProps:i}=t,n=S(t,fe),{component:c,slots:p={[e]:void 0},slotProps:f={[e]:void 0}}=s;S(s,he);const u=p[e]||r,m=ee(f[e],a),b=te(d({className:o},n,{externalForwardedProps:void 0,externalSlotProps:m})),{props:{component:x},internalRef:h}=b,C=S(b.props,ge),P=Z(h,m==null?void 0:m.ref,t.ref),y=l?l(C):{},g=d({},a,y),v=x,A=oe(u,d({},e==="root",!p[e]&&i,C,v&&{as:v},{ref:P}),g);return Object.keys(y).forEach(j=>{delete A[j]}),[u,A]}const ye=J(w.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function ke(e){return _("MuiAvatar",e)}L("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const be=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],xe=me(),Ce=e=>{const{classes:t,variant:o,colorDefault:r}=e;return $({root:["root",o,r&&"colorDefault"],img:["img"],fallback:["fallback"]},ke,t)},Pe=R("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],o.colorDefault&&t.colorDefault]}})(({theme:e})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:d({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:d({backgroundColor:e.palette.grey[400]},e.applyStyles("dark",{backgroundColor:e.palette.grey[600]})))}]})),Se=R("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),we=R(ye,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});function Re({crossOrigin:e,referrerPolicy:t,src:o,srcSet:r}){const[a,s]=k.useState(!1);return k.useEffect(()=>{if(!o&&!r)return;s(!1);let l=!0;const i=new Image;return i.onload=()=>{l&&s("loaded")},i.onerror=()=>{l&&s("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=o,r&&(i.srcset=r),()=>{l=!1}},[e,t,o,r]),a}const De=k.forwardRef(function(t,o){const r=xe({props:t,name:"MuiAvatar"}),{alt:a,children:s,className:l,component:i="div",slots:n={},slotProps:c={},imgProps:p,sizes:f,src:u,srcSet:m,variant:b="circular"}=r,x=S(r,be);let h=null;const C=Re(d({},p,{src:u,srcSet:m})),P=u||m,y=P&&C!=="error",g=d({},r,{colorDefault:!y,component:i,variant:b}),v=Ce(g),[A,j]=ve("img",{className:v.img,elementType:Se,externalForwardedProps:{slots:n,slotProps:{img:d({},p,c.img)}},additionalProps:{alt:a,src:u,srcSet:m,sizes:f},ownerState:g});return y?h=w.jsx(A,d({},j)):s||s===0?h=s:P&&a?h=a[0]:h=w.jsx(we,{ownerState:g,className:v.fallback}),w.jsx(Pe,d({as:i,ownerState:g,className:T(v.root,l),ref:o},x,{children:h}))}),Ue=de({createStyledComponent:R("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>N({props:e,name:"MuiStack"})});function Ae(e){return _("MuiSkeleton",e)}L("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Fe=["animation","className","component","height","style","variant","width"];let F=e=>e,O,V,B,E;const je=e=>{const{classes:t,variant:o,animation:r,hasChildren:a,width:s,height:l}=e;return $({root:["root",o,r,a&&"withChildren",a&&!s&&"fitContent",a&&!l&&"heightAuto"]},Ae,t)},Me=z(O||(O=F`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Te=z(V||(V=F`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),$e=R("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],o.animation!==!1&&t[o.animation],o.hasChildren&&t.withChildren,o.hasChildren&&!o.width&&t.fitContent,o.hasChildren&&!o.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const o=ue(e.shape.borderRadius)||"px",r=pe(e.shape.borderRadius);return d({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:Q(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${o}/${Math.round(r/.6*10)/10}${o}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&I(B||(B=F`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),Me),({ownerState:e,theme:t})=>e.animation==="wave"&&I(E||(E=F`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Te,(t.vars||t).palette.action.hover)),Ie=k.forwardRef(function(t,o){const r=N({props:t,name:"MuiSkeleton"}),{animation:a="pulse",className:s,component:l="span",height:i,style:n,variant:c="text",width:p}=r,f=S(r,Fe),u=d({},r,{animation:a,component:l,variant:c,hasChildren:!!f.children}),m=je(u);return w.jsx($e,d({as:l,ref:o,className:T(m.root,s),ownerState:u},f,{style:d({width:p,height:i},n)}))});export{De as A,Ie as S,Ue as a,me as c};
