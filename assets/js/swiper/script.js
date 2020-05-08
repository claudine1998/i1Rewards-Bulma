const $gallery = $('.js-gallery');
const $thumbs = $('.js-thumbs');
const slideNumber = $gallery.find('.swiper-slide').length / 3;
const slidesPerView = 3;
let targetIndex;

const activeSlideClass = 'active';
let $thumbsActiveSlide;
let $galleryActiveSlide;


let swiperGallery = new Swiper($gallery, {
  direction: 'vertical',
  loop: true,
  loopAdditionalSlides: 0,
  initialSlide: slideNumber,
  speed: 700,
  simulateTouch: false,
  spaceBetween: 20 });


let swiperThumbs = new Swiper($thumbs, {
  direction: 'vertical',
  loop: true,
  loopAdditionalSlides: 0,
  slidesPerView: slidesPerView,
  initialSlide: slideNumber,
  centeredSlides: true,
  slideToClickedSlide: true,
  speed: 500,
  spaceBetween: 20 });


//add custom active class for smooth animation
$thumbsActiveSlide = $(swiperThumbs.slides).filter('.swiper-slide-active');
$galleryActiveSlide = $(swiperGallery.slides).filter('.swiper-slide-active');
$thumbsActiveSlide.addClass(activeSlideClass);
$galleryActiveSlide.addClass(activeSlideClass);
//---------------------------------------------


swiperThumbs.on("slideChangeTransitionStart", function () {
  //add custom active class for smooth animation
  $thumbsActiveSlide = $(swiperThumbs.slides).filter('.swiper-slide-active');
  $thumbsActiveSlide.siblings().removeClass(activeSlideClass);
  //---------------------------------------------

  targetIndex = Number(swiperThumbs.realIndex);
  swiperThumbs.detachEvents();
  swiperGallery.slideTo(targetIndex + 1, 700, true);
});

// swiperThumbs.on("slideChangeTransitionEnd", function () {
//   swiperThumbs.attachEvents();
// });

swiperGallery.on("slideChangeTransitionStart", function () {
  //add custom active class for smooth animation
  $galleryActiveSlide = $(swiperGallery.slides).filter('.swiper-slide-active');
  $galleryActiveSlide.siblings().removeClass(activeSlideClass);
  //---------------------------------------------
});

swiperGallery.on("slideChangeTransitionEnd", function () {
  if (targetIndex < slideNumber) {
    targetIndex += slideNumber;
    teleportTo(targetIndex);
  } else if (targetIndex >= slideNumber * 2) {
    targetIndex -= slideNumber;
    teleportTo(targetIndex);
  } else {
    //add custom active class for smooth animation
    $thumbsActiveSlide.addClass(activeSlideClass);
    $galleryActiveSlide.addClass(activeSlideClass);
    //---------------------------------------------
  }
  swiperThumbs.attachEvents();
});

function teleportTo(slideIndex) {
  swiperThumbs.slideTo(slideIndex + slidesPerView, 0, false);
  swiperGallery.slideTo(slideIndex + 1, 0, false);

  //add custom active class for smooth animation
  $thumbsActiveSlide = $(swiperThumbs.slides).filter('.swiper-slide-active');
  $galleryActiveSlide = $(swiperGallery.slides).filter('.swiper-slide-active');
  $thumbsActiveSlide.addClass(activeSlideClass);
  $galleryActiveSlide.addClass(activeSlideClass);
  //---------------------------------------------
}

//If u have images with lazy add this after swipers init
function fixLazy() {
  let gallerylastIndex = slideNumber * 2;
  let thumbslastIndex = slideNumber * 2 + slidesPerView - 1;
  let $lastGallerySlide = $(swiperGallery.slides[gallerylastIndex]).find('.swiper-lazy');
  let $lastThumbsSlide = $(swiperThumbs.slides[thumbslastIndex]).find('.swiper-lazy');

  removeLazySlide($lastGallerySlide);
  removeLazySlide($lastThumbsSlide);

  let counter;

  if ((slidesPerView - 1) % 2 !== 0) {
    counter = Math.floor((slidesPerView - 1) / 2) + 1;
  } else {
    counter = (slidesPerView - 1) / 2;
  }

  for (let i = 0; i < counter; i++) {

    let $prevSlide = $(swiperThumbs.slides[thumbslastIndex - (i + 1)]).find('.swiper-lazy');
    let $nextSlide = $(swiperThumbs.slides[thumbslastIndex + (i + 1)]).find('.swiper-lazy');

    removeLazySlide($prevSlide);
    removeLazySlide($nextSlide);
  }
}

function removeLazySlide($slide) {
  let data = $slide.data('background');
  $slide.attr('style', `background-image: url('${data}')`);
  $slide.removeAttr('data-background');
  $slide.addClass('swiper-lazy-loaded');
  $slide.empty();
}