import '../css/styles.css'

let lenis;

if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    lerp: 0.1,               // 0.1 é o padrão ideal. Menor que isso (ex: 0.05) dá muito delay.
    wheelMultiplier: 1,      // Mantém a força padrão do mouse
    normalizeWheel: true,    // CRÍTICO: Normaliza os picos de rolagem do mouse e elimina o "agarro"
    smoothWheel: true,
    smoothTouch: false,      // Mantém false para não estragar o touch nativo de celulares
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Links de âncora ajustados para usar o lerp configurado
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      lenis.scrollTo(targetId, {
        offset: -80,         // Ajuste barra de navegação fixa (ex: -80)
        immediate: false,
      });
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('header')
  const logo = document.getElementById('header-logo')
  const desktopNavLinks = document.querySelectorAll('#desktop-nav .nav-link')
  const mobileBtn = document.getElementById('mobile-menu-btn')

  if (!header) return

  const onScroll = () => {
    if (window.scrollY > 20) {
      // ===== 1. MODO SCROLL (Fundo Branco Ativado) =====
      header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-md')
      header.classList.remove('bg-transparent')

      // Remove os filtros da logo para ela voltar a ser Dourada e Escura
      if (logo) logo.classList.remove('brightness-0', 'invert')

      // Transforma os links de navegação em cinza escuro
      desktopNavLinks.forEach(link => {
        link.classList.remove('text-white')
        link.classList.add('text-slate-600')
      })

      // Transforma o botão mobile (hamburguer) em cinza escuro
      if (mobileBtn) {
        mobileBtn.classList.remove('text-white', 'border-white/30')
        mobileBtn.classList.add('text-slate-700', 'border-slate-200')
      }

    } else {
      // ===== 2. MODO TOPO (Fundo Transparente) =====
      header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-md')
      header.classList.add('bg-transparent') // Garante o fundo transparente

      // Adiciona os filtros na logo para ela ficar 100% branca
      if (logo) logo.classList.add('brightness-0', 'invert')

      // Retorna os links de navegação para a cor branca
      desktopNavLinks.forEach(link => {
        link.classList.remove('text-slate-600')
        link.classList.add('text-white')
      })

      // Retorna o botão mobile para a cor branca
      if (mobileBtn) {
        mobileBtn.classList.remove('text-slate-700', 'border-slate-200')
        mobileBtn.classList.add('text-white', 'border-white/30')
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  // Executa uma vez logo que a página carrega para garantir as cores iniciais
  onScroll()
}

const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal()
  initSmoothScroll()
  initMobileNav()
  initHeaderScroll()
})

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal')

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  })

  reveals.forEach(el => observer.observe(el))
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href')
      if (!targetId || targetId === '#') return

      const target = document.querySelector(targetId)
      if (!target) return

      e.preventDefault()
      const header = document.querySelector('header')
      const offset = header ? header.offsetHeight + 16 : 0
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}

function initMobileNav() {
  const btn = document.querySelector('[data-nav-toggle]')
  const menu = document.querySelector('[data-nav-menu]')
  if (!btn || !menu) return

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', String(!expanded))
    menu.classList.toggle('hidden')
    menu.classList.toggle('flex')
  })

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false')
      menu.classList.add('hidden')
      menu.classList.remove('flex')
    })
  })
}
