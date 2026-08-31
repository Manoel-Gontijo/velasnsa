(function(){
const cfg=window.NSA_ACTIVE_CONFIG||window.NSA_CONFIG;
const buttons=[...document.querySelectorAll('#weightOptions .option-btn')],qty=document.getElementById('qty'),summary=document.getElementById('summary');
const priceEl=document.getElementById('selectedPrice'),priceHelp=document.getElementById('priceHelp');
let weight=buttons.find(b=>b.classList.contains('active'))?.dataset.weight||buttons[0]?.dataset.weight||'500 g';
function q(){let n=parseInt(qty.value,10);if(!n||n<1)n=1;qty.value=n;return n}
function numericPrice(v){if(v==null||v==='')return null;if(typeof v==='number')return v;const str=String(v).replace(/R\$/gi,'').trim();const normalized=str.includes(',')?str.replace(/\./g,'').replace(',','.'):str;const num=Number(normalized.replace(/[^0-9.-]/g,''));return Number.isFinite(num)?num:null}
function money(v){return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function currentPrice(){return cfg.parafina?.precos?.[weight]||''}
function update(){const n=q();summary.textContent=`${weight} • ${n} ${n===1?'unidade':'unidades'}`;const price=numericPrice(currentPrice());if(priceEl)priceEl.textContent=price!=null?money(price):'Consulte o valor';if(priceHelp)priceHelp.textContent=price!=null&&n>1?`Total para ${n}: ${money(price*n)}`:'Preço da embalagem escolhida'}
buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');weight=b.dataset.weight;update()}));
document.getElementById('minus').onclick=()=>{qty.value=Math.max(1,q()-1);update()};document.getElementById('plus').onclick=()=>{qty.value=q()+1;update()};qty.oninput=update;
document.querySelectorAll('[data-qty-preset]').forEach(b=>b.addEventListener('click',()=>{qty.value=b.dataset.qtyPreset||1;update()}));
function add(){const price=numericPrice(currentPrice())||0;window.dispatchEvent(new CustomEvent('nsa:conversion',{detail:{event:'add_to_cart',product:'parafina',weight,qty:q()}}));window.NSACart?.add({type:'parafina',title:'Parafina granulada',weight,qty:q(),price,image:'assets/img/parafina.webp',detail:`Embalagem ${weight}`})}
document.getElementById('addToCart').onclick=add;document.getElementById('addToCartMobile')?.addEventListener('click',add);
document.getElementById('whatsappOrder').onclick=()=>{window.dispatchEvent(new CustomEvent('nsa:conversion',{detail:{event:'whatsapp_buy_now',product:'parafina',weight,qty:q()}}));const price=numericPrice(currentPrice());const pl=price!=null?`\nValor exibido: ${money(price)}${q()>1?`\nTotal estimado: ${money(price*q())}`:''}`:'';const msg=`Olá! Gostaria de solicitar parafina granulada da ${cfg.empresa.nome}.\n\nEmbalagem: ${weight}\nQuantidade: ${q()}${pl}\n\nPode confirmar disponibilidade e condições?`;window.open(`https://wa.me/${cfg.empresa.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank')};
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}));document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();update();
})();
