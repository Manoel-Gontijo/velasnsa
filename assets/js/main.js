const navbar=document.querySelector('.nsa-navbar');
const backTop=document.querySelector('.back-top');
const navLinks=document.querySelectorAll('.navbar .nav-link:not(.dropdown-toggle), .dropdown-item');
const collapseEl=document.getElementById('mainNav');
const bsCollapse=collapseEl?bootstrap.Collapse.getOrCreateInstance(collapseEl,{toggle:false}):null;
function onScroll(){navbar?.classList.toggle('scrolled',window.scrollY>20);backTop?.classList.toggle('show',window.scrollY>450)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
navLinks.forEach(link=>link.addEventListener('click',()=>{if(window.innerWidth<992&&collapseEl?.classList.contains('show'))bsCollapse.hide()}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
