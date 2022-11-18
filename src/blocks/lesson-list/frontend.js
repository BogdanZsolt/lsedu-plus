import Swiper, { Navigation } from 'swiper';

document.addEventListener( 'DOMContentLoaded', () => {
	const swiper = new Swiper( '.swiper', {
		loop: false,
		grabCursor: true,
		modules: [ Navigation ],
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
		autoheight: true,
		breakpoints: {
			600: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			935: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1240: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			1536: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
		},
	} );
} );
