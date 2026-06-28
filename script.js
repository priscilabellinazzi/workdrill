history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. PRELOADER & LOADING BAR
       ========================================== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.loader-progress');
    
    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.style.overflowY = 'auto';
            }, 500);
        } else {
            width += Math.random() * 15;
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';
        }
    }, 100);

    /* ==========================================
       2. HEADER SCROLL EFFECT
       ========================================== */
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       3. MOBILE MENU TOGGLE
       ========================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active class on menu
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ==========================================
       4. HERO BACKGROUND SLIDER
       ========================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextHeroSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }
    
    // Rotate every 6 seconds
    setInterval(nextHeroSlide, 6000);

    /* ==========================================
       5. COUNTER / STATISTICS ANIMATION
       ========================================== */
    const statsSection = document.querySelector('.hero-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60; // 60fps * 1s animation
            
            function updateCounter() {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCounters();
                animated = true;
            }
        });
    }, { threshold: 0.1 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================
       6. SCROLL REVEAL ANIMATION
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-fade-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       7. SERVICES MODAL DATA & LOGIC
       ========================================== */
    const serviceData = {
        mnd: {
            title: "Perfuração Horizontal Dirigida (MND)",
            tag: "Método Não Destrutivo",
            img: "13.jpeg",
            desc: "A Workdrill executa a Perfuração Horizontal Dirigida (MND), permitindo a instalação de tubulações subterrâneas sem a necessidade de aberturas de valas na superfície.<br><br>Ideal para travessias sob rodovias, ferrovias, rios e grandes avenidas metropolitanas. Evita impactos socioambientais no tráfego urbano, preserva pavimentos e calçadas, além de garantir máxima agilidade e economia na recomposição."
        },
        dutos: {
            title: "Instalação de Dutos",
            tag: "Infraestrutura Subterrânea",
            img: "2.jpeg",
            desc: "Instalação de dutos plásticos e metálicos utilizando métodos destrutivos (MD) e não destrutivos (MND).<br><br>Atendemos integralmente concessionárias dos setores de telecomunicações, saneamento básico, gás canalizado e distribuição elétrica. Nossos serviços englobam a preparação da vala, o assentamento seguro e a execução de soldagem PEAD (Polietileno de Alta Densidade) por termofusão e eletrofusão por profissionais altamente qualificados."
        },
        redes: {
            title: "Redes Subterrâneas",
            tag: "Engenharia Pesada",
            img: "10.jpeg",
            desc: "Construção completa de redes subterrâneas de ponta a ponta, desde a topografia até o acabamento.<br><br>Nossa equipe realiza levantamentos topográficos minuciosos, escavações controladas com escoramento de valas de segurança, assentamento das caixas de passagem e instalação física de subductos e tubulações, recompondo o pavimento com alto padrão de qualidade e respeito às normas regulamentares."
        },
        cabos: {
            title: "Lançamento de Cabos Ópticos",
            tag: "Telecomunicações",
            img: "8.jpeg",
            desc: "Instalação e lançamento de cabos ópticos em rotas subterrâneas e aéreas.<br><br>Nas rotas aéreas, realizamos o correto tensionamento mecânico e espinamento com proteção das fibras. Já nas rotas subterrâneas, executamos o puxamento mecânico ou manual de cabos com monitoramento constante de tração para evitar estresse físico no núcleo óptico."
        },
        "infra-optica": {
            title: "Infraestrutura Óptica",
            tag: "Telecomunicações",
            img: "9.jpeg",
            desc: "Projetos de implantação de redes backbone metropolitanas e de última milha - FTTH/FTTB (Fiber to the Home / Fiber to the Building).<br><br>Planejamos e executamos rotas de alta capacidade, canalizações protegidas, preparação de galerias subterrâneas e anéis ópticos robustos para operadoras de telecomunicações e grandes provedores de internet (ISPs)."
        },
        fusao: {
            title: "Fusão de Fibra Óptica",
            tag: "Tecnologia e Precisão",
            img: "15.jpeg",
            desc: "Emendas de fibra óptica por arco voltaico com alinhamento preciso pelo núcleo da fibra.<br><br>Nossos técnicos de fusão realizam o preparo completo do cabo (decapagem, limpeza química e clivagem milimétrica) e efetuam a fusão garantindo taxas mínimas de atenuação. Realizamos testes com certificação por OTDR (Optical Time-Domain Reflectometer) e Power Meter, gerando relatórios de qualidade."
        },
        mapeamento: {
            title: "Mapeamento Subterrâneo",
            tag: "Prevenção e Engenharia",
            img: "12.jpeg",
            desc: "Localização precisa de interferências no subsolo antes da execução de perfurações.<br><br>Realizamos a detecção de dutos de gás, cabos elétricos energizados, redes de esgoto e galerias de água pluvial. Fornecemos plantas técnicas detalhadas e marcações na superfície para orientar com total segurança as equipes de perfuração."
        },
        georadar: {
            title: "Georadar - GPR (Ground Penetrating Radar)",
            tag: "Tecnologia Avançada",
            img: "1.jpeg",
            desc: "Varredura do solo com GPR (Ground Penetrating Radar) utilizando antenas eletromagnéticas de alta frequência (1 a 1000 MHz).<br><br>O sistema de georadar escaneia o subsolo em profundidades variadas, detectando anomalias geológicas, tubulações plásticas, metálicas e outras interferências ocultas de forma não destrutiva, garantindo precisão milimétrica para o planejamento do furo."
        },
        caixas: {
            title: "Instalação de Caixas Subterrâneas",
            tag: "Estrutura",
            img: "11.jpeg",
            desc: "Instalação e construção de caixas subterrâneas de passagem e emenda em calçadas ou vias públicas.<br><br>A Workdrill efetua a escavação, assentamento de caixa pré-moldada ou moldada in loco de alta resistência mecânica, tampas de ferro fundido padronizadas de acordo com as especificações de cada concessionária, e impermeabilização."
        },
        conectorizacao: {
            title: "Conectorização de Cabos",
            tag: "Redes e TI",
            img: "3.jpeg",
            desc: "Terminação e conexão de cabos ópticos em distribuidores internos ópticos - DIO e caixas de emenda ópticas - CEO.<br><br>Montagem e crimpagem de conectores rápidos e pig-tails. Nossos serviços garantem conexões estáveis para redes de voz, dados de alta velocidade e transmissão de sinal audiovisual corporativo."
        },
        "projetos-tecnicos": {
            title: "Projetos Técnicos",
            tag: "Engenharia de Projetos",
            img: "4.jpeg",
            desc: "Modelagem e documentação de engenharia subterrânea.<br><br>Desenvolvemos projetos executivos completos de MND (perfil de furo direcional, cálculo de torque e resistência à tração), aprovações de rotas junto a prefeituras, órgãos estaduais e concessionárias de serviços públicos."
        },
        manutencao: {
            title: "Manutenção de Redes",
            tag: "Suporte Técnico",
            img: "16.jpeg",
            desc: "Serviços de manutenção corretiva emergencial (24/7) e preventiva em redes de telecomunicações e infraestrutura subterrânea.<br><br>Dispomos de laboratórios móveis (vans de fusão) equipados para atendimento ágil em caso de rompimentos de cabos ópticos, realocações por interferências em obras públicas e substituição de caixas de passagem danificadas."
        }
    };

    const serviceModal = document.getElementById('serviceModal');
    const modalClose = serviceModal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalTag = document.getElementById('modalTag');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            const data = serviceData[key];
            if (data) {
                modalTitle.textContent = data.title;
                modalTag.textContent = data.tag;
                modalImage.style.backgroundImage = `url('${data.img}')`;
                modalDescription.innerHTML = data.desc;
                
                serviceModal.classList.add('active');
                document.body.style.overflowY = 'hidden';
            }
        });
    });

    function closeServiceModal() {
        serviceModal.classList.remove('active');
        document.body.style.overflowY = 'auto';
    }

    modalClose.addEventListener('click', closeServiceModal);
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) closeServiceModal();
    });

    /* ==========================================
       8. STRUCTURE & FLEET FILTERABLE GALLERY
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // match transition time
                }
            });
        });
    });

    /* ==========================================
       9. LIGHTBOX MODAL FOR GALLERY
       ========================================== */
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let activeGallerySet = [];
    let currentLightboxIdx = 0;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Find active filter
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            
            // Build set of currently visible gallery items
            activeGallerySet = Array.from(galleryItems).filter(el => {
                return activeFilter === 'all' || el.classList.contains(activeFilter);
            });
            
            currentLightboxIdx = activeGallerySet.indexOf(item);
            openLightbox(item);
        });
    });

    function openLightbox(item) {
        const imgSrc = item.getAttribute('data-src');
        const captionText = item.querySelector('h4').textContent;
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText;
        lightbox.classList.add('active');
        document.body.style.overflowY = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflowY = 'auto';
    }

    function nextLightboxImage() {
        if (activeGallerySet.length <= 1) return;
        currentLightboxIdx = (currentLightboxIdx + 1) % activeGallerySet.length;
        const nextItem = activeGallerySet[currentLightboxIdx];
        lightboxImg.src = nextItem.getAttribute('data-src');
        lightboxCaption.textContent = nextItem.querySelector('h4').textContent;
    }

    function prevLightboxImage() {
        if (activeGallerySet.length <= 1) return;
        currentLightboxIdx = (currentLightboxIdx - 1 + activeGallerySet.length) % activeGallerySet.length;
        const prevItem = activeGallerySet[currentLightboxIdx];
        lightboxImg.src = prevItem.getAttribute('data-src');
        lightboxCaption.textContent = prevItem.querySelector('h4').textContent;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextLightboxImage);
    lightboxPrev.addEventListener('click', prevLightboxImage);
    
    // Close lightbox on click outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
    });

    /* ==========================================
       10. OPERATIONS SLIDER
       ========================================== */
    const opSlides = document.querySelectorAll('.op-slide');
    const opPrev = document.getElementById('opPrev');
    const opNext = document.getElementById('opNext');
    const opCaption = document.querySelector('.op-slider-caption');
    let activeOpIdx = 0;

    function updateOpSlider(newIdx) {
        opSlides[activeOpIdx].classList.remove('active');
        activeOpIdx = (newIdx + opSlides.length) % opSlides.length;
        opSlides[activeOpIdx].classList.add('active');
        
        // Update caption text
        const newCaption = opSlides[activeOpIdx].getAttribute('data-caption');
        opCaption.textContent = newCaption;
    }

    if (opPrev && opNext) {
        opPrev.addEventListener('click', () => updateOpSlider(activeOpIdx - 1));
        opNext.addEventListener('click', () => updateOpSlider(activeOpIdx + 1));
    }

    /* ==========================================
       11. LEAFLET MAP DYNAMIC INITIALIZATION (DARK MAP)
       ========================================== */
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Central São Paulo coordinates
        const map = L.map('map', {
            center: [-14.235, -51.9253], // Brazil center
            zoom: 4,
            scrollWheelZoom: false
        });

        // Add CartoDB Dark Matter map tile provider
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CartoDB &copy; OpenStreetMap contributors',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Custom pulsing dot icon using Leaflet DivIcon
        const customPulsingIcon = L.divIcon({
            className: 'custom-pulsing-marker',
            html: '<div class="pulsing-core"></div><div class="pulsing-ring"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Key Workdrill operational spots (from PDF & photos coordinates)
        const spots = [
            { name: "São Paulo, SP", coords: [-23.5505, -46.6333], desc: "Operação real MND (Método Não Destrutivo) em grande centro urbano." },
            { name: "Rio de Janeiro, RJ", coords: [-22.9068, -43.1729], desc: "Obras de Redes Subterrâneas e expansão de infraestrutura." },
            { name: "Belo Horizonte, MG", coords: [-19.9167, -43.9345], desc: "Lançamento de dutos PEAD (Polietileno de Alta Densidade) e travessia subterrânea." },
            { name: "Curitiba, PR", coords: [-25.4284, -49.2733], desc: "Perfuração direcional e implantação de redes de fibra." },
            { name: "Brasília, DF", coords: [-15.7942, -47.8822], desc: "Projetos técnicos e mapeamento de redes críticas." }
        ];

        spots.forEach(spot => {
            const marker = L.marker(spot.coords, { icon: customPulsingIcon }).addTo(map);
            marker.bindPopup(`
                <div style="padding: 0.5rem;">
                    <h5 style="color: var(--color-primary); font-family: var(--font-headers); font-weight: 600; margin-bottom: 0.25rem;">${spot.name}</h5>
                    <p style="font-size: 0.85rem; color: #ccc; margin: 0; line-height: 1.4;">${spot.desc}</p>
                </div>
            `);
        });

        // CSS styles for custom pulsing marker
        const style = document.createElement('style');
        style.innerHTML = `
            .custom-pulsing-marker {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .pulsing-core {
                width: 10px;
                height: 10px;
                background-color: var(--color-primary);
                border-radius: 50%;
                z-index: 2;
                box-shadow: 0 0 10px var(--color-primary);
            }
            .pulsing-ring {
                position: absolute;
                width: 24px;
                height: 24px;
                border: 2px solid var(--color-primary);
                border-radius: 50%;
                z-index: 1;
                opacity: 0;
                animation: markerPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
            }
            @keyframes markerPulse {
                0% {
                    transform: scale(0.4);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /* ==========================================
       12. CONTACT FORM VALIDATION & HANDLING
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = contactForm.querySelector('.btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = 'Processando Solicitação <i class="fa-solid fa-spinner fa-spin"></i>';
            formFeedback.classList.remove('success', 'error');
            formFeedback.textContent = '';
            
            // Send real AJAX request to FormSubmit
            fetch('https://formsubmit.co/ajax/joelsonvieira@workdrill.com.br', {
                method: 'POST',
                body: new FormData(contactForm)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === 'true' || data.success === true) {
                    // Reset form inputs
                    contactForm.reset();
                    
                    // Show feedback success
                    formFeedback.classList.add('success');
                    formFeedback.textContent = 'Orçamento solicitado com sucesso! Nossa equipe entrará em contato em breve.';
                } else {
                    throw new Error('Erro no envio.');
                }
            })
            .catch(error => {
                formFeedback.classList.add('error');
                formFeedback.textContent = 'Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato direto por e-mail.';
            })
            .finally(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = 'Enviar Mensagem <i class="fa-solid fa-paper-plane"></i>';
                
                // Clear success/error message after 5 seconds
                setTimeout(() => {
                    formFeedback.style.opacity = '0';
                    setTimeout(() => {
                        formFeedback.textContent = '';
                        formFeedback.classList.remove('success', 'error');
                        formFeedback.style.opacity = '1';
                    }, 300);
                }, 5000);
            });
        });
    }
});
