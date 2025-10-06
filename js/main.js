// Stars background
const stars = document.getElementById('stars');
const ctx = stars.getContext('2d');
const DPR = Math.min(window.devicePixelRatio || 1, 2);
let W, H, starField = [];

function resize(){
  W = stars.width = innerWidth * DPR;
  H = stars.height = innerHeight * DPR;
  stars.style.width = innerWidth + 'px';
  stars.style.height = innerHeight + 'px';
  starField = Array.from({length: 160}, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random()*1.8 + .2,
    a: Math.random()*0.5 + 0.2
  }));
}
resize(); addEventListener('resize', resize);

function drawStars(){
  ctx.clearRect(0,0,W,H);
  for(const s of starField){
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
    s.y += 0.02 * DPR; if(s.y > H) s.y = -5;
  }
  requestAnimationFrame(drawStars);
}
drawStars();

// Parallax (scroll)
const layers = [...document.querySelectorAll('.parallax.layer')];
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  layers.forEach((el, i) => {
    const depth = (i+1) * 0.15;
    el.style.transform = `translateY(${y * depth}px)`;
  });
});

// Mouse parallax on hero
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const dx = (e.clientX - rect.width/2) / rect.width;
  const dy = (e.clientY - rect.height/2) / rect.height;
  layers.forEach((el, i) => {
    el.style.transform += ` translate(${dx * (i+1)*10}px, ${dy * (i+1)*8}px)`;
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
},{ threshold: .15 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Small convenience: smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});
