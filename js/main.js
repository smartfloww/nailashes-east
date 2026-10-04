(function(){
var d=document,root=d.documentElement;root.classList.add('js');
var b=d.querySelector('.menu-btn'),n=d.getElementById('nav');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);});
n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded','false');}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus();}});}
var rv=d.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});rv.forEach(function(el){io.observe(el);});}
else{rv.forEach(function(el){el.classList.add('in');});}
/* lightbox */
var items=[].slice.call(d.querySelectorAll('[data-full]'));if(!items.length)return;
var lb=d.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous photo">&#8249;</button><img alt=""><button class="n" aria-label="Next photo">&#8250;</button><div class="c" aria-live="polite"></div>';
d.body.appendChild(lb);
var img=lb.querySelector('img'),c=lb.querySelector('.c'),i=0,opener=null;
function show(k){i=(k+items.length)%items.length;img.src=items[i].dataset.full;img.alt=items[i].dataset.alt||'';c.textContent=(i+1)+' / '+items.length;}
function open(k,el){opener=el;show(k);lb.classList.add('open');requestAnimationFrame(function(){lb.classList.add('show');});d.body.style.overflow='hidden';lb.querySelector('.x').focus();}
function close(){lb.classList.remove('show');setTimeout(function(){lb.classList.remove('open');img.removeAttribute('src');},300);d.body.style.overflow='';if(opener)opener.focus();}
items.forEach(function(el,k){el.addEventListener('click',function(){open(k,el);});});
lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(){show(i-1);};lb.querySelector('.n').onclick=function(){show(i+1);};
lb.addEventListener('click',function(e){if(e.target===lb)close();});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1);});
var sx=null;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});
lb.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(i+(dx<0?1:-1));sx=null;});
})();
