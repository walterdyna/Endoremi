document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach((videoItem) => {
        videoItem.addEventListener('click', () => {
            videoItem.classList.toggle('fullscreen');
            const iframe = videoItem.querySelector('iframe');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('webkitallowfullscreen', 'true');
            iframe.setAttribute('mozallowfullscreen', 'true');
        });
    });
});

document.querySelector('.topo-fixo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



const carousel = document.querySelector('.carousel');
const carouselInner = document.querySelector('.carousel-inner');
const carouselImages = document.querySelector('.carousel-images');
const carouselNav = document.querySelector('.carousel-nav');
const images = [];

// Busca as imagens sequenciais de 6 a 740
for (let i = 6; i <= 740; i++) {
  images.push({ src: `/img/Emdoremi/(${i}).jpg`, alt: `Foto ${i}` });
}

let currentIndex = 0;
let imagesPerSlide = 1;
let startX = 0;
let startTime = 0;

function updateImage() {
  carouselImages.innerHTML = '';
  for (let i = 0; i < imagesPerSlide; i++) {
    const img = document.createElement('img');
    const currentIndexImage = currentIndex + i;
    if (currentIndexImage >= images.length) {
      currentIndexImage = currentIndexImage - images.length; // Volta para a primeira imagem
    }
    img.src = images[currentIndexImage].src;
    img.alt = images[currentIndexImage].alt;
    carouselImages.appendChild(img);
  }
}

function updateImagesPerSlide() {
  if (window.innerWidth > 1000) {
    imagesPerSlide = 3;
  } else {
    imagesPerSlide = 1;
  }
}

updateImagesPerSlide();
window.addEventListener('resize', updateImagesPerSlide);

updateImage();

carouselInner.addEventListener('scroll', () => {
  const scrollLeft = carouselInner.scrollLeft;
  const imageWidth = carouselImages.offsetWidth / imagesPerSlide;
  const newIndex = Math.floor(scrollLeft / imageWidth);
  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    updateImage();
  }
});

carouselNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('carousel-next')) {
    currentIndex += imagesPerSlide;
    if (currentIndex >= images.length) {
      currentIndex = currentIndex - images.length; // Volta para a primeira imagem
    }
  } else if (e.target.classList.contains('carousel-prev')) {
    currentIndex -= imagesPerSlide;
    if (currentIndex < 0) {
      currentIndex = images.length + currentIndex; // Volta para a última imagem
    }
  }
  updateImage();
});

carouselImages.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startTime = Date.now();
});

carouselImages.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const deltaX = touch.clientX - startX;
  const deltaTime = Date.now() - startTime;
  const velocity = Math.abs(deltaX / deltaTime);
  if (deltaX > 0) {
    // Arrastamento da direita para a esquerda
    currentIndex -= Math.round(velocity * 10);
  } else if (deltaX < 0) {
    // Arrastamento da esquerda para a direita
    currentIndex += Math.round(velocity * 10);
  }
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  } else if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  updateImage();
});