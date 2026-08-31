(function(){
const cfg=window.NSA_ACTIVE_CONFIG||window.NSA_CONFIG;
const sizeButtons=[...document.querySelectorAll('#sizeOptions .option-btn')];
const packageButtons=[...document.querySelectorAll('#packageOptions .option-btn')];
const colorButtons=[...document.querySelectorAll('#colorOptions .color-option')];
const qty=document.getElementById('qty'), summary=document.getElementById('summary'), image=document.getElementById('productImage');
const priceEl=document.getElementById('selectedPrice'), priceHelp=document.getElementById('priceHelp');
const packages=cfg.velas?.apresentacoes||[], colors=cfg.velas?.cores||[];
let selectedSize=sizeButtons.find(b=>b.classList.contains('active'))?.dataset.size || sizeButtons[0]?.dataset.size || '12 cm';
let selectedPackageBtn=packageButtons.find(b=>b.classList.contains('active'))||packageButtons[0];
let selectedPackage=selectedPackageBtn?.dataset.package||'8 unidades';
let selectedPackageId=selectedPackageBtn?.dataset.id||'8';
let selectedColorBtn=colorButtons.find(b=>b.classList.contains('active'))||colorButtons[0];
let selectedColorId=selectedColorBtn?.dataset.colorId||colors.find(c=>c.ativo!==false)?.id||'branca';
let selectedColor=selectedColorBtn?.dataset.colorName||colors.find(c=>c.id===selectedColorId)?.nome||'Branca';
function select(group,button){group.forEach(b=>b.classList.remove('active'));button.classList.add('active')}
function cleanQty(){let v=parseInt(qty.value,10);if(!Number.isFinite(v)||v<1)v=1;qty.value=v;return v}
function sizeKey(){return String(parseInt(selectedSize,10))}
function packConfig(){return packages.find(p=>String(p.id)===String(selectedPackageId))||{}}
function colorConfig(){return colors.find(c=>String(c.id)===String(selectedColorId))||{}}
function currentPrice(){const p=packConfig();return p.precos?.[sizeKey()]||p.preco||''}
function formatPrice(v){if(v==null||v==='')return '';if(typeof v==='number')return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});const str=String(v).trim();if(!str)return '';if(/^R\$/i.test(str))return str;const num=Number(str.replace(/\./g,'').replace(',','.').replace(/[^0-9.-]/g,''));return Number.isFinite(num)?num.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):str}
function numericPrice(v){if(v==null||v==='')return null;if(typeof v==='number')return v;const str=String(v).replace(/R\$/gi,'').trim();const normalized=str.includes(',')?str.replace(/\./g,'').replace(',','.'):str;const num=Number(normalized.replace(/[^0-9.-]/g,''));return Number.isFinite(num)?num:null}
function updateImage(){const c=colorConfig(),p=packConfig(),sk=sizeKey();const src=c.imagensPorTamanho?.[selectedPackageId]?.[sk]||p.imagensPorTamanho?.[sk]||c.imagens?.[selectedPackageId]||p.imagem||selectedPackageBtn?.dataset.img;if(src)image.src=src;image.alt=`${selectedPackage} - ${selectedSize} - cor ${selectedColor}`}
function update(){const q=cleanQty();summary.textContent=`${selectedSize} • ${selectedPackage} • ${selectedColor} • ${q} ${q===1?'pacote':'pacotes'}`;const raw=currentPrice();const shown=formatPrice(raw);if(priceEl)priceEl.textContent=shown||'Consulte o valor';if(priceHelp){const n=numericPrice(raw);priceHelp.textContent=n!=null&&q>1?`Total para ${q}: ${(n*q).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`:'Preço da apresentação escolhida';}updateImage()}
sizeButtons.forEach(b=>b.addEventListener('click',()=>{select(sizeButtons,b);selectedSize=b.dataset.size;update()}));
packageButtons.forEach(b=>b.addEventListener('click',()=>{select(packageButtons,b);selectedPackageBtn=b;selectedPackage=b.dataset.package;selectedPackageId=b.dataset.id||'';update()}));
colorButtons.forEach(b=>b.addEventListener('click',()=>{select(colorButtons,b);selectedColorBtn=b;selectedColorId=b.dataset.colorId;selectedColor=b.dataset.colorName;update()}));
document.getElementById('minus')?.addEventListener('click',()=>{qty.value=Math.max(1,cleanQty()-1);update()});document.getElementById('plus')?.addEventListener('click',()=>{qty.value=cleanQty()+1;update()});qty?.addEventListener('input',update);document.querySelectorAll('[data-qty-preset]').forEach(b=>b.addEventListener('click',()=>{qty.value=b.dataset.qtyPreset||1;update()}));
const params=new URLSearchParams(location.search), p=params.get('pacote');if(p){const target=packageButtons.find(b=>b.dataset.id===p);if(target)target.click()}
function addCart(){const q=cleanQty();window.dispatchEvent(new CustomEvent('nsa:conversion',{detail:{event:'add_to_cart',product:'velas',size:selectedSize,presentation:selectedPackage,qty:q}}));const raw=currentPrice();const price=numericPrice(raw);window.NSACart?.add({type:'velas',title:'Velas palito',size:selectedSize,presentation:selectedPackage,color:selectedColor,qty:q,price:price||0,image:image?.getAttribute('src')||image?.src||'',detail:`${selectedSize} • ${selectedPackage} • ${selectedColor} • Ø ${cfg.velas.espessuraMm} mm`});}
function sendOrder(){const q=cleanQty();window.dispatchEvent(new CustomEvent('nsa:conversion',{detail:{event:'whatsapp_buy_now',product:'velas',size:selectedSize,presentation:selectedPackage,qty:q}}));const mm=cfg.velas.espessuraMm;const raw=currentPrice();const shown=formatPrice(raw);const n=numericPrice(raw);let priceLine=shown?`\nValor exibido: ${shown}`:'';if(n!=null&&q>1)priceLine+=`\nTotal estimado: ${(n*q).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`;const msg=`Olá! Gostaria de fazer um pedido na ${cfg.empresa.nome}.\n\nProduto: Velas palito\nTamanho: ${selectedSize}\nEspessura: ${mm} mm\nApresentação: ${selectedPackage}\nCor: ${selectedColor}\nQuantidade: ${q} ${q===1?'pacote':'pacotes'}${priceLine}\n\nPoderia confirmar disponibilidade e condições?`;window.open(`https://wa.me/${cfg.empresa.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank')}
document.getElementById('addToCart')?.addEventListener('click',addCart);document.getElementById('addToCartMobile')?.addEventListener('click',addCart);document.getElementById('whatsappOrder')?.addEventListener('click',sendOrder);
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}));document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();update();
})();
