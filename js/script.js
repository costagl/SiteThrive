function openWindow(index) {
    if (isDragging) return;

    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');
    const popupTexto = document.getElementById('popup-texto');

    const titulo = [
        "Gestão de Redes Sociais",
        "Gestão de Tráfego",
        "Produção Audiovisual",
        "Criação de Site",
        "Gestão de Marketing",
        "Fotografia",
        "Design",
        "Edição de Vídeo",
        "Landing Page",
        "YouTube & Outras Redes",
        "Podcast",
        "E-books"
    ];
    const descricao = [
        "Planejamos, criamos e gerenciamos conteúdos estratégicos que conectam sua marca ao público-alvo, aumentando engajamento e resultados da sua rede e aumentando o alcance organicamente (também).",
        "Otimização de campanhas digitais para atrair clientes certos, maximizando resultados com investimentos eficientes, os criativos são realizados através de testes de criativos ao longo da análise de Social Media.",
        "Criamos vídeos e fotografias de alta qualidade para destacar sua marca e transmitir o verdadeiro propósito da sua empresa com uma identidade impactante e criatividade.",
        "Desenvolvemos sites modernos, responsivos e otimizados para proporcionar a melhor experiência ao usuário e uma estrutura online mais completa e profissional.",
        "Estratégias completas e personalizadas para posicionar sua marca, gerar valor e alcançar objetivos de negócios, tocamos internamente na sua empresa e definimos um setor de Marketing, vendas online e CRM que complementa todo nosso serviço.",
        "Imagens profissionais que capturam a essência da sua marca e destacam seus produtos ou serviços de forma única e com a identidade que você deseja obter.",
        "Artes criativas e personalizadas que comunicam visualmente a identidade da sua marca de forma clara e atrativa e com o objetivo de serem informativas para complementar todo nosso trabalho de audiovisual.",
        "Transformamos gravações em produções dinâmicas e envolventes, perfeitas para redes sociais, sites e campanhas, que tem como objetivo seduzir e reter a atenção do seu expectador.",
        "Páginas focadas em conversão, projetadas para captar leads e impulsionar resultados de campanhas, com Copys seduzentes que expressam a verdadeira qualidade do seu produto.",
        "Planejamento e produção de conteúdos que destacam sua marca e engajam sua audiência no maior canal de vídeos do mundo e em todas as redes.",
        "Produção e gestão de podcasts profissionais, criando conteúdos que informam, engajam e fidelizam sua audiência.",
        "Criação de conteúdos ricos e visuais atraentes para gerar valor e capturar leads qualificados para sua marca."
    ];

    const imagem = [
        "social-network.webp",
        "trafego-pago.jpg",
        "audiovisual.webp",
        "criacao-de-site.jpg",
        "gestao-marketing.jpg",
        "fotografia.jpeg",
        "design.jpg",
        "editor-video.jpg",
        "landing-page.webp",
        "youtube.jpg",
        "podcast.webp",
        "ebook.jpg"
    ];

    const link = [
        "https://wa.link/wq10i7",
        "https://wa.link/kybdty",
        "https://wa.link/qqh3m2",
        "https://wa.link/01qjtg",
        "https://wa.link/6dq8aa",
        "https://wa.link/6dq8aa",
        "https://wa.link/g0rna2",
        "https://wa.link/6dq8aa",
        "https://wa.link/6dq8aa",
        "https://wa.link/6dq8aa",
        "https://wa.link/6dq8aa",
        "https://wa.link/6dq8aa"
    ];

    popupImage.style.backgroundImage = `url('../src/img/square/${imagem[index - 1]}')`;
    popupTexto.innerHTML = `<div class="titulo-divisor"><p class="titulo">${titulo[index - 1]}</p><div class="divisor"></div></div><p class="descricao">${descricao[index - 1]}</p><div class="botoes"><a href="${link[index - 1]}" target="_blank"><i class="fa-brands fa-whatsapp"></i>Whatsapp</a><a href="https://www.instagram.com/thrivemarketingc/" target="_blank"><i class="fa-brands fa-instagram"></i>Instagram</a></div>`;
    popup.style.display = 'flex';
}

function closeWindow() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

document.getElementById('popup').addEventListener('click', (event) => {
    const popupContent = document.querySelector('.popup-content');
    if (!popupContent.contains(event.target)) {
        closeWindow();
    }
});

// Carousel

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".square").offsetWidth;
const moveAmount = firstCardWidth * 1.198

let isDragging = false, isBetweenDragAndClick = false, startX, startScrollLeft, velocity;
let prevX = 0, prevTime = 0, isInertiaActive = false;

const dragStart = (e) => {
    isDragging = true;
    isBetweenDragAndClick = false;
    isInertiaActive = false; // Reset inertia flag
    carousel.classList.add("dragging");

    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
    prevX = startX;
    prevTime = Date.now();
    velocity = 0; // Reset velocity
};

const dragging = (e) => {
    if (!isDragging) return;

    const currentX = e.pageX || e.touches[0].pageX;
    const currentTime = Date.now();

    // Calculate velocity
    const deltaX = currentX - prevX;
    const deltaTime = currentTime - prevTime;
    velocity = deltaX / deltaTime;

    prevX = currentX;
    prevTime = currentTime;

    carousel.scrollLeft = startScrollLeft - (currentX - startX);
    isBetweenDragAndClick = true;
};

const dragStop = () => {
    if (!isDragging) return;

    isDragging = false;
    carousel.classList.remove("dragging");

    // Apply inertia
    applyInertia();
};

const applyInertia = () => {
    isInertiaActive = true; // Mark inertia as active
    const friction = 0.95; // Friction to slow down the movement
    const minVelocity = 0.1; // Threshold to stop the movement

    const animate = () => {
        if (Math.abs(velocity) > minVelocity) {
            carousel.scrollLeft -= velocity * 20; // Scale velocity for smoother movement
            velocity *= friction; // Apply friction
            requestAnimationFrame(animate);
        } else {
            isInertiaActive = false; // Inertia complete
        }
    };

    animate();
};

// Mouse Events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);

// Touch Events
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);

// Arrow Buttons
const scrollCarousel = (direction) => {
    if (isInertiaActive) return; // Prevent button click during inertia

    const distance = direction === "left" ? -moveAmount : moveAmount;
    const duration = 350;
    const startTime = performance.now();
    const startScroll = carousel.scrollLeft;

    const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        carousel.scrollLeft = startScroll + distance * easeInOutCubic(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        scrollCarousel(btn.id);
    });
});

// Squares Click
const squares = document.querySelectorAll(".carousel .square");
squares.forEach((square, index) => {
    square.addEventListener("click", (e) => {
        if (isBetweenDragAndClick) {
            isBetweenDragAndClick = false;
            return;
        }
        openWindow(index + 1);
    });
});


