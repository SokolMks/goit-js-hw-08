import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector('.gallery'),
  closeModalBtn: document.querySelector('[data-action = "close-lightbox"]'),
  modalWindow: document.querySelector('.lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),

};

//CREATING IMAGES
function createImageItem(galleryItem, index) {
  const item = document.createElement('li');
  item.classList.add('gallery__item');
  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = galleryItem.original;
  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = galleryItem.preview; 
  image.dataset.source = galleryItem.original;
  image.dataset.index = index;
  image.alt = galleryItem.description; 
  link.appendChild(image);
  item.appendChild(link);
  return item;
  
}

function createGallery(items){
  const galleryList = items.map((item, index) => {
    return createImageItem(item, index);
  })
  refs.gallery.append(...galleryList);
}

window.onload = createGallery(galleryItems);

//EVENT LISTENERS
refs.gallery.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.modalOverlay.addEventListener('click', closeModal);
window.addEventListener('keydown', pressOnKey);


//MODAL FUNCTIONS
function openModal(event) {
  event.preventDefault();
  refs.modalWindow.classList.add('is-open');
  const target = event.target;
//if (target.nodeName !== 'img') return;
setActiveImage(target);

}

function setActiveImage(nextActiveImage) {
  refs.modalImage.src = nextActiveImage.dataset.source;
  refs.modalImage.alt = nextActiveImage.alt;
  refs.modalImage.dataset.index = nextActiveImage.dataset.index;
}

function pressOnKey(event) {
  const pressedKey = event.keyCode;
  //37 left
  //39 right
  const modalIsOpen = refs.modalWindow.classList.contains('is-open');
  if(pressedKey === 27 && modalIsOpen) {
    closeModal();
  } 
  if(pressedKey === 37 && modalIsOpen || pressedKey === 39 && modalIsOpen) {
    scrollImage(event);
  }

}

function scrollImage(event) {
  //console.log(event.code);
  let currentIndex = Number(refs.modalImage.dataset.index);
  //console.log(currentIndex);
  //console.log(galleryItems.length);

  if(event.code === 'ArrowLeft') {
    if (currentIndex > 0) {
      currentIndex -=1;
      refs.modalImage.src = galleryItems[currentIndex].original;
      refs.modalImage.alt = galleryItems[currentIndex].description;
      refs.modalImage.dataset.index = currentIndex;
    } 
  }
  if(event.code === 'ArrowRight' && currentIndex < galleryItems.length - 1){
    currentIndex += 1;
    refs.modalImage.src = galleryItems[currentIndex].original;
    refs.modalImage.alt = galleryItems[currentIndex].description;
    refs.modalImage.dataset.index = currentIndex;
  }

}

function closeModal() {
  refs.modalWindow.classList.remove('is-open');
  refs.modalImage.alt = '';
  refs.modalImage.src = '';
}
