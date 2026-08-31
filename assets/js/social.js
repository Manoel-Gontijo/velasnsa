(function(){
const cfg=window.NSA_ACTIVE_CONFIG||window.NSA_CONFIG||{};
const r=cfg.redes||{};
const valid=u=>/^https?:\/\//i.test((u||'').trim());
function applyLinks(){document.querySelectorAll('[data-social-link]').forEach(a=>{const n=a.dataset.socialLink;const u=(r[n]||'').trim();if(valid(u)){a.href=u;a.hidden=false}else a.hidden=true})}
async function share(){const title=document.title;const text=document.querySelector('meta[name="description"]')?.content||'Conheça os produtos Velas NSA';const url=location.href;if(navigator.share){try{await navigator.share({title,text,url});window.NSATracking?.track('share_product',{page:location.pathname,method:'native'});return}catch(e){if(e.name==='AbortError')return}}try{await navigator.clipboard.writeText(url);alert('Link copiado!');window.NSATracking?.track('share_product',{page:location.pathname,method:'clipboard'})}catch(e){prompt('Copie o link:',url)}}
document.addEventListener('DOMContentLoaded',()=>{applyLinks();document.querySelectorAll('[data-share-product]').forEach(b=>b.addEventListener('click',share))});
})();
;(() => { const revealSocialHome=()=>{ const box=document.getElementById('socialHome'); if(!box) return; const visible=[...box.querySelectorAll('[data-social-link]')].some(a=>!a.hidden && a.getAttribute('href')); box.hidden=!visible; }; if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(revealSocialHome,0)); else setTimeout(revealSocialHome,0); })();
