document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // 1. Monitora a rolagem para mudar a classe 'active' do menu automaticamente
    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // O cálculo '- 150' serve para ativar a aba um pouco antes de chegar no topo físico
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // 2. Ajuste manual de clique para garantir foco visual imediato
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // ... seu código anterior do menu (scroll e click) ...

    // =========================================
    // ANIMAÇÃO DE REVELAÇÃO (INTERSECTION OBSERVER)
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento entrou na tela
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Para a animação não repetir quando subir a tela de novo:
                observer.unobserve(entry.target); 
            }
        });
    }, {
        // Opções: dispara a animação quando 15% do elemento estiver visível
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });

    // Observar cada elemento que tem a classe .reveal
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});