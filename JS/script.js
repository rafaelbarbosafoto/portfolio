// Procuramos os elementos do menu no HTML
const menuButton = document.querySelector("#menuButton");
const menuClose = document.querySelector("#menuClose");
const mainMenu = document.querySelector("#mainMenu");
const menuLinks = document.querySelectorAll("#mainMenu a");

/**
 * Abre o menu lateral.
 */
function openMenu() {
    mainMenu.classList.add("is-open");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
}

/**
 * Fecha o menu lateral.
 */
function closeMenu() {
    mainMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
}


// Abre ao clicar em MENU
menuButton.addEventListener("click", openMenu);


// Fecha ao clicar no X
menuClose.addEventListener("click", closeMenu);


// Fecha depois que a pessoa seleciona um link
menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// Permite fechar usando a tecla Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

/* ========================================
   HERO DESAPARECENDO NA ROLAGEM
======================================== */

const heroContent = document.querySelector(".hero-content");
const scrollIndicator = document.querySelector(".scroll-indicator");

/*
  Só executa este código se existir Hero na página.
*/

if (heroContent && scrollIndicator) {

    let scrollAnimationFrame;

    function updateHeroOnScroll() {

        const scrollPosition = window.scrollY;

        const fadeDistance = window.innerHeight * 0.45;

        const progress = Math.min(scrollPosition / fadeDistance, 1);

        const opacity = 1 - progress;
        const verticalMovement = progress * -40;

        heroContent.style.opacity = opacity;
        heroContent.style.transform =
            `translateY(${verticalMovement}px)`;

        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.transform =
            `translateY(${verticalMovement}px)`;

        if (scrollPosition > 20) {

            scrollIndicator.style.animation = "none";

        } else {

            scrollIndicator.style.animation =
                "breatheArrow 2.8s ease-in-out infinite";

        }

        const isVisible = opacity > 0.05;

        heroContent.style.pointerEvents =
            isVisible ? "auto" : "none";

        scrollIndicator.style.pointerEvents =
            isVisible ? "auto" : "none";

        scrollAnimationFrame = null;

    }

    

    window.addEventListener("scroll", () => {

        if (!scrollAnimationFrame) {

            scrollAnimationFrame =
                requestAnimationFrame(updateHeroOnScroll);

        }

    });

    window.addEventListener("resize", updateHeroOnScroll);

    updateHeroOnScroll();

}

/* ========================================
   VISUALIZAÇÃO DA FOTO EM TELA CHEIA
======================================== */

const photoZoom = document.querySelector("#photoZoom");

if (photoZoom) {
    const originalImage = photoZoom.querySelector("img");

    let lightbox = null;
    let isAnimating = false;

    function openPhotoView() {
        if (isAnimating || lightbox) return;

        isAnimating = true;

        lightbox = document.createElement("div");
        lightbox.className = "photo-lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute(
            "aria-label",
            "Fotografia em tela cheia"
        );

        const enlargedImage = originalImage.cloneNode(true);

        lightbox.appendChild(enlargedImage);
        document.body.appendChild(lightbox);
        document.body.classList.add("photo-view-open");

        photoZoom.setAttribute("aria-pressed", "true");

        requestAnimationFrame(() => {
            lightbox.classList.add("is-visible");
        });

        window.setTimeout(() => {
            isAnimating = false;
        }, 800);

        lightbox.addEventListener("click", closePhotoView);
    }

    function closePhotoView() {
        if (isAnimating || !lightbox) return;

        isAnimating = true;

        lightbox.classList.remove("is-visible");
        lightbox.classList.add("is-closing");

        photoZoom.setAttribute("aria-pressed", "false");

        window.setTimeout(() => {
            lightbox.remove();
            lightbox = null;

            document.body.classList.remove("photo-view-open");

            isAnimating = false;
        }, 600);
    }

    photoZoom.addEventListener("click", openPhotoView);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox) {
            closePhotoView();
        }
    });
}


