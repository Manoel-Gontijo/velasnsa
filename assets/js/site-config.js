(function(){
  const DEFAULTS = window.NSA_CONFIG || {};
  let cfg = DEFAULTS;
  try {
    const saved = localStorage.getItem('NSA_CONFIG_OVERRIDE');
    if (saved) cfg = merge(DEFAULTS, JSON.parse(saved));
  } catch(e) { console.warn('Configuração local inválida.', e); }
  cfg = normalizeOptimizedImages(cfg);
  window.NSA_ACTIVE_CONFIG = cfg;

  function normalizeOptimizedImages(value){
    const map={
      'assets/img/carousel-velas-nsa-home.png':'assets/img/carousel-velas-nsa-home.webp',
      'assets/img/carrossel_velas_KG.png':'assets/img/carrossel_velas_KG.webp',
      'assets/img/corrossel_parafina.png':'assets/img/corrossel_parafina.webp',
      'assets/img/pack_8_todas.png':'assets/img/pack_8_todas.webp',
      'assets/img/pack_8_12.png':'assets/img/pack_8_12.webp',
      'assets/img/pack_8_14.png':'assets/img/pack_8_14.webp',
      'assets/img/pack_8_16.png':'assets/img/pack_8_16.webp',
      'assets/img/pack_8_18.png':'assets/img/pack_8_18.webp',
      'assets/img/pack_6.png':'assets/img/pack_6.webp',
      'assets/img/pack_6_12.png':'assets/img/pack_6_12.webp',
      'assets/img/pack_6_14.png':'assets/img/pack_6_14.webp',
      'assets/img/pack_6_16.png':'assets/img/pack_6_16.webp',
      'assets/img/pack_6_18.png':'assets/img/pack_6_18.webp',
      'assets/img/pack_1kg.png':'assets/img/pack_1kg.webp',
      'assets/img/parafina.png':'assets/img/parafina.webp'
    };
    if(typeof value==='string') return map[value]||value;
    if(Array.isArray(value)) return value.map(normalizeOptimizedImages);
    if(value && typeof value==='object'){
      const out={}; Object.keys(value).forEach(k=>out[k]=normalizeOptimizedImages(value[k])); return out;
    }
    return value;
  }

  function merge(base, extra){
    if(Array.isArray(base) || Array.isArray(extra)) return extra ?? base;
    if(base && typeof base === 'object'){
      const out={...base};
      Object.keys(extra||{}).forEach(k=>out[k]=merge(base[k],extra[k]));
      return out;
    }
    return extra ?? base;
  }
  function setText(selector, value){ if(value==null) return; document.querySelectorAll(selector).forEach(el=>el.textContent=value); }
  function setAttr(selector, attr, value){ if(value==null) return; document.querySelectorAll(selector).forEach(el=>el.setAttribute(attr,value)); }
  function wa(text){ return `https://wa.me/${cfg.empresa.whatsapp}?text=${encodeURIComponent(text)}`; }

  const page=document.body.dataset.page || 'home';
  const company=cfg.empresa || {};

  document.querySelectorAll('[data-config-logo]').forEach(img=>{ img.src=cfg.imagens.logo; img.alt=company.nome; });
  setText('[data-config-company]',company.nome);
  setText('[data-config-phone]',company.whatsappExibicao);
  setText('[data-config-location]',`${company.cidade} - ${company.estado}`);
  setText('[data-config-region]',company.regiao);

  document.querySelectorAll('[data-wa]').forEach(a=>{
    const message=a.dataset.wa || `Olá! Gostaria de um orçamento da ${company.nome}.`;
    a.href=wa(message);
  });

  if(page==='home') applyHome();
  if(page==='velas') applyVelas();
  if(page==='parafina') applyParafina();
  applySeo(page);
  applyNotice();

  function applyHome(){
    const h=cfg.home||{};
    setText('[data-config="hero1Eyebrow"]',h.hero1Eyebrow);
    const heroTitle=document.querySelector('[data-config="hero1Titulo"]');
    if(heroTitle){const t=h.hero1Titulo||'';const prefix='Velas para ';heroTitle.innerHTML=t.startsWith(prefix)?`${prefix}<span>${escapeHtml(t.slice(prefix.length))}</span>`:escapeHtml(t);}
    setText('[data-config="hero1Texto"]',h.hero1Texto);
    setText('[data-config="hero2Eyebrow"]',h.hero2Eyebrow);
    setText('[data-config="hero2Titulo"]',h.hero2Titulo);
    setText('[data-config="hero2Texto"]',h.hero2Texto);
    setText('[data-config="hero3Eyebrow"]',h.hero3Eyebrow);
    setText('[data-config="hero3Titulo"]',h.hero3Titulo);
    setText('[data-config="hero3Texto"]',h.hero3Texto);
    setText('[data-config="sobreTitulo"]',h.sobreTitulo);
    setText('[data-config="sobreTexto1"]',h.sobreTexto1);
    setText('[data-config="sobreTexto2"]',h.sobreTexto2);
    setText('[data-config="contatoTitulo"]',h.contatoTitulo);
    setText('[data-config="contatoTexto"]',h.contatoTexto);
    setAttr('.pack6','src',cfg.imagens.pack6); setAttr('.pack8','src',cfg.imagens.pack8); setAttr('.packkg','src',cfg.imagens.pack1kg);
    setAttr('.hero-paraffin','src',cfg.imagens.parafina); setAttr('.about-photo > img','src',cfg.imagens.sobre);
    applyCarousel();
    renderCatalog();
    renderOffer();
  }


  function applyCarousel(){
    const carousel=document.querySelector('[data-config-carousel]');
    if(!carousel) return;
    const ccfg=cfg.carousel||{};
    if(ccfg.intervaloMs) carousel.setAttribute('data-bs-interval', String(ccfg.intervaloMs));
    const slides=[...carousel.querySelectorAll('.carousel-item[data-slide-key]')];
    let enabledSlides=slides.filter(slide=>(ccfg.slides?.[slide.dataset.slideKey]?.ativo)!==false);
    if(!enabledSlides.length && slides[0]) enabledSlides=[slides[0]];
    slides.forEach(slide=>{slide.classList.remove('active');if(!enabledSlides.includes(slide))slide.remove();});
    const activeSlides=[...carousel.querySelectorAll('.carousel-item[data-slide-key]')];
    activeSlides[0]?.classList.add('active');
    const indicators=document.getElementById('heroIndicators');
    if(indicators){
      const labels={velas:'Linha de velas',atacado:'Atacado e revenda',parafina:'Parafina granulada'};
      indicators.innerHTML=activeSlides.map((slide,i)=>`<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${i}" class="${i===0?'active':''}" ${i===0?'aria-current="true"':''} aria-label="${labels[slide.dataset.slideKey]||'Slide'}"></button>`).join('');
    }
    const btnMap={
      'velas.primary':ccfg.slides?.velas?.botaoPrincipal,
      'velas.secondary':ccfg.slides?.velas?.botaoSecundario,
      'atacado.primary':ccfg.slides?.atacado?.botaoPrincipal,
      'parafina.primary':ccfg.slides?.parafina?.botaoPrincipal
    };
    document.querySelectorAll('[data-carousel-btn]').forEach(b=>{const t=btnMap[b.dataset.carouselBtn];if(t)b.childNodes[b.childNodes.length-1].nodeValue=' '+t;});
    carousel.querySelectorAll('.nsa-carousel-control').forEach(c=>c.classList.toggle('d-none',activeSlides.length<2));
  }

  function renderCatalog(){
    const box=document.getElementById('productGrid'); if(!box) return;
    const items=(cfg.catalogo?.produtos||[]).filter(p=>p.ativo!==false);
    if(!items.length){box.innerHTML='<div class="col-12"><div class="empty-catalog">Nenhum produto ativo no momento.</div></div>';return;}
    box.innerHTML=items.map((p,i)=>{
      const price=p.precoTexto?.trim()?`<span class="price-public"><small>A partir de</small><strong>${escapeHtml(p.precoTexto)}</strong></span>`:`<span class="price-consult"><i class="fa-brands fa-whatsapp"></i> Consulte valores</span>`;
      return `<div class="col-sm-6 col-xl-3 reveal ${i%4===1?'delay-1':i%4===2?'delay-2':i%4===3?'delay-3':''}"><article class="product-card h-100 ${p.destaque?'product-featured':''}">${p.destaque?'<span class="featured-ribbon">Destaque</span>':''}<a class="product-card-link" href="${escapeAttr(p.link||'#')}"><div class="product-image"><img alt="${escapeAttr(p.titulo||'Produto')}" decoding="async" loading="lazy" width="640" height="640" src="${escapeAttr(p.imagem||'')}"></div><div class="p-4"><span class="product-tag">${escapeHtml(p.tag||'')}</span><h3>${escapeHtml(p.titulo||'Produto')}</h3><p>${escapeHtml(p.descricao||'')}</p>${price}<span class="product-link">${escapeHtml(p.cta||'Ver produto')} <i class="fa-solid fa-arrow-right"></i></span></div></a></article></div>`;
    }).join('');
  }

  function renderOffer(){
    const mount=document.getElementById('offerMount'); if(!mount || !cfg.oferta?.ativo) return;
    const o=cfg.oferta;
    const price=(o.precoAnterior||o.precoAtual)?`<div class="offer-price">${o.precoAnterior?`<del>${escapeHtml(o.precoAnterior)}</del>`:''}${o.precoAtual?`<strong>${escapeHtml(o.precoAtual)}</strong>`:''}</div>`:'';
    const href=o.link==='whatsapp'?wa(`Olá! Gostaria de saber mais sobre ${o.titulo}.`):(o.link||'#produtos');
    const target=o.link==='whatsapp'?' target="_blank" rel="noopener"':'';
    mount.innerHTML=`<section class="special-offer py-4"><div class="container"><div class="offer-card"><div><span class="offer-badge">${escapeHtml(o.selo||'Destaque')}</span><h2>${escapeHtml(o.titulo||'')}</h2><p>${escapeHtml(o.texto||'')}</p></div>${price}<a class="btn btn-nsa" href="${escapeAttr(href)}"${target}>${escapeHtml(o.botao||'Saiba mais')} <i class="fa-solid fa-arrow-right ms-2"></i></a></div></div></section>`;
  }

  function escapeAttr(s=''){return escapeHtml(s).replace(/`/g,'&#96;')}

  function applyVelas(){
    const v=cfg.velas||{};
    setText('[data-config="velasTitulo"]',v.titulo);
    setText('[data-config="velasDescricao"]',v.descricao);
    document.querySelectorAll('[data-config-thickness]').forEach(el=>el.textContent=`${v.espessuraMm} mm`);
    const sizeBox=document.getElementById('sizeOptions');
    if(sizeBox && Array.isArray(v.tamanhosCm)) sizeBox.innerHTML=v.tamanhosCm.map((n,i)=>`<button class="option-btn${i===0?' active':''}" data-size="${n} cm"><strong>${n} cm</strong><small>Ø ${v.espessuraMm} mm</small></button>`).join('');
    const packBox=document.getElementById('packageOptions');
    const packs=(v.apresentacoes||[]).filter(p=>p.ativo!==false).map(p=>({...p,imagem:(p.id==='6'?cfg.imagens.pack6:p.id==='8'?cfg.imagens.pack8:p.id==='1kg'?cfg.imagens.pack1kg:p.imagem)||p.imagem}));
    if(packBox) packBox.innerHTML=packs.map((p,i)=>`<button class="option-btn package-btn${i===Math.min(1,packs.length-1)?' active':''}" data-package="${escapeAttr(p.nome)}" data-id="${escapeAttr(p.id)}" data-img="${escapeAttr(p.imagem||'')}"><i class="fa-solid ${p.id==='1kg'?'fa-weight-hanging':'fa-box-open'}"></i><strong>${escapeHtml(p.nome)}</strong><small>${escapeHtml(p.legenda||'')}</small></button>`).join('');
    const colors=(v.cores||[]).filter(c=>c.ativo!==false);
    const colorBox=document.getElementById('colorOptions');
    if(colorBox){
      colorBox.innerHTML=colors.map((c,i)=>`<button class="color-option${i===0?' active':''}" type="button" data-color-id="${escapeAttr(c.id)}" data-color-name="${escapeAttr(c.nome)}" aria-label="Cor ${escapeAttr(c.nome)}"><span class="color-swatch" style="--swatch:${escapeAttr(c.hex||'#f5f2e8')}"></span><strong>${escapeHtml(c.nome)}</strong></button>`).join('');
      colorBox.closest('.buy-panel')?.classList.toggle('single-color',colors.length<=1);
    }
    const initial=packs[Math.min(1,packs.length-1)] || packs[0];
    const initialColor=colors[0];
    if(initial){
      const firstSize=String((v.tamanhosCm||[])[0]||'12');
      const colorImg=initialColor?.imagensPorTamanho?.[initial.id]?.[firstSize] || initial.imagensPorTamanho?.[firstSize] || initialColor?.imagens?.[initial.id];
      setAttr('#productImage','src',colorImg||initial.imagem);
    }
  }

  function applyParafina(){
    const p=cfg.parafina||{};
    setText('[data-config="parafinaTitulo"]',p.titulo);
    setText('[data-config="parafinaDescricao"]',p.descricao);
    const box=document.getElementById('weightOptions');
    if(box && Array.isArray(p.pesos)) box.innerHTML=p.pesos.map((w,i)=>`<button class="option-btn${i===0?' active':''}" data-weight="${w}">${w}</button>`).join('');
    setAttr('.product-gallery img','src',cfg.imagens.parafina);
  }

  function applySeo(page){
    const s=cfg.seo||{};
    let title=s.tituloHome, desc=s.descricaoHome;
    if(page==='velas'){title=s.tituloVelas;desc=s.descricaoVelas}
    if(page==='parafina'){title=s.tituloParafina;desc=s.descricaoParafina}
    if(title) document.title=title;
    document.querySelectorAll('meta[name="description"],meta[property="og:description"]').forEach(m=>{if(desc)m.content=desc});
    document.querySelectorAll('meta[property="og:title"]').forEach(m=>{if(title)m.content=title});
  }

  function applyNotice(){
    if(page!=='home' || !cfg.avisos?.ativo) return;
    const wrap=document.createElement('div');
    wrap.className='site-notice';
    wrap.innerHTML=`<div class="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2"><div><strong>${escapeHtml(cfg.avisos.titulo)}</strong><span>${escapeHtml(cfg.avisos.texto)}</span></div><a target="_blank" rel="noopener" href="${wa(`Olá! Gostaria de saber mais sobre: ${cfg.avisos.titulo}`)}">${escapeHtml(cfg.avisos.botao||'Saiba mais')}</a></div>`;
    const nav=document.querySelector('.nsa-navbar');
    if(nav) nav.insertAdjacentElement('afterend',wrap);
    document.body.classList.add('has-site-notice');
  }
  function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
})();
