(function(){
const cfg=window.NSA_ACTIVE_CONFIG||window.NSA_CONFIG||{};
const m=cfg.marketing||{};
const CONSENT_KEY='NSA_TRACKING_CONSENT_V1';
const hasIds=Boolean((m.googleAnalyticsId||'').trim()||(m.metaPixelId||'').trim());
function consent(){return localStorage.getItem(CONSENT_KEY)}
function gaEvent(name,params={}){if(typeof window.gtag==='function')window.gtag('event',name,params)}
function fbEvent(name,params={}){if(typeof window.fbq==='function')window.fbq('trackCustom',name,params)}
function track(name,params={}){gaEvent(name,params);fbEvent(name,params)}
function loadGA(id){if(!/^G-[A-Z0-9]+$/i.test(id||''))return;window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',id,{anonymize_ip:true});const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.appendChild(s)}
function loadMeta(id){if(!/^\d{5,}$/.test(id||''))return;!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',id);fbq('track','PageView')}
function start(){if(!m.trackingAtivo||consent()!=='accepted')return;loadGA((m.googleAnalyticsId||'').trim());loadMeta((m.metaPixelId||'').trim())}
function banner(){if(!m.trackingAtivo||!hasIds||consent())return;const el=document.createElement('div');el.className='nsa-consent';el.innerHTML='<div><strong>Privacidade e métricas</strong><span>Usamos métricas opcionais para entender o desempenho do site e melhorar sua experiência.</span></div><div class="nsa-consent-actions"><button class="btn btn-sm btn-soft" data-consent-reject>Somente essenciais</button><button class="btn btn-sm btn-nsa" data-consent-accept>Aceitar métricas</button></div>';document.body.appendChild(el);el.querySelector('[data-consent-reject]').onclick=()=>{localStorage.setItem(CONSENT_KEY,'rejected');el.remove()};el.querySelector('[data-consent-accept]').onclick=()=>{localStorage.setItem(CONSENT_KEY,'accepted');el.remove();start()}}
window.addEventListener('nsa:conversion',e=>{const d=e.detail||{};const name=d.event||'conversion';track(name,d)});
document.addEventListener('click',e=>{const a=e.target.closest('a[data-wa], .floating-whatsapp, .footer-contact-link');if(a)track('whatsapp_click',{page:location.pathname,placement:a.className||'link'});const social=e.target.closest('[data-social-network]');if(social)track('social_click',{network:social.dataset.socialNetwork||''})});
document.addEventListener('DOMContentLoaded',()=>{banner();start()});
window.NSATracking={track};
})();