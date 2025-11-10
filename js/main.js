document.getElementById('year').textContent = new Date().getFullYear();

    // Toggle tema claro/oscuro
    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if(saved === 'light'){ root.classList.add('light'); btn.textContent = '☀️'; btn.setAttribute('aria-pressed','true'); }
    else { btn.setAttribute('aria-pressed','false'); }
    btn.addEventListener('click', () => {
      root.classList.toggle('light');
      const isLight = root.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    });

    document.querySelectorAll('#proyectos .project a').forEach(a=>{
      if(a.getAttribute('href')?.includes('tu-usuario')){
        a.addEventListener('click', (e)=>{
          e.preventDefault();
          alert('Pronto actualizaré este enlace con mi información real. ¡Gracias por tu interés!');
        })
      }
    });

    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll',()=>{
      if(window.scrollY>400){scrollBtn.classList.add('show')}else{scrollBtn.classList.remove('show')}
    });
    scrollBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length > 1){
          e.preventDefault();
          document.querySelector(id).scrollIntoView({behavior:'smooth'});
        }
      });
    });