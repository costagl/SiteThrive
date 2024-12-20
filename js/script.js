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

    popupImage.style.backgroundImage = `url('../thrive imgs/${imagem[index - 1]}')`;
    popupTexto.innerHTML = `<div class="titulo-divisor"><p class="titulo">${titulo[index - 1]}</p><div class="divisor"></div></div><p class="descricao">${descricao[index - 1]}</p><div class="botoes"><a href="${link[index - 1]}" target="_blank"><i class="fa-brands fa-whatsapp"></i>Whatsapp</a><a href="https://www.instagram.com/thrivemarketingc/" target="_blank"><i class="fa-brands fa-instagram"></i>Instagram</a></div>`;
    popup.style.display = 'flex'; // Exibe o popup
}

function closeWindow() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Oculta o popup
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

let isDragging = false, isBetweenDragAndClick = false, startX, startScrollLeft;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    isBetweenDragAndClick = false;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    isBetweenDragAndClick = true;
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);

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