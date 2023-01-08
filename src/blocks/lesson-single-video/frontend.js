import vimeoPlayer from '@vimeo/player';

document.addEventListener('DOMContentLoaded', () => {
	let videoWrapper = document.querySelector(
		'.lsedup-single-lesson-video__wrapper'
	);
	let video = document.querySelector(
		'.wp-block-lsedu-plus-lesson-single-video'
	);
	const list = document.querySelectorAll(
		'.lsedup-single-lesson-video__list-container ul li'
	);
	let active = document.querySelector(
		'.lsedup-single-lesson-video__list-container ul li.active'
	);
	let activeId = active.dataset.id;

	list.forEach((item, index) => {
		let html = '';
		if (item.dataset.provider === '') {
			html = document.createElement('img');
			html.classList.add('img-player');
			html.src = item.dataset.thumb;
			html.dataset.dataId = item.dataset.id;
		} else if (item.dataset.provider === 'wordpress') {
			html = document.createElement('video');
			html.classList.add('w-player');
			html.controls = video.dataset.controls === '1' ? true : false;
			html.autoplay = video.dataset.autoplay === '1' ? true : false;
			(html.loop === video.dataset.loop) === '1' ? true : false;
			(html.muted === video.dataset.muted) === '1' ? true : false;
			html.disablePictureInPicture = true;
			html.controlsList = 'nodownload';
			html.src = item.dataset.video_src;
			html.dataset.dataId = item.dataset.id;
		} else if (item.dataset.provider === 'youtube') {
			html = document.createElement('iframe');
			html.classList.add('yt-player');
			html.src =
				item.dataset.video_src +
				`?enablejsapi=1&controls=${video.dataset.controls}&loop=${video.dataset.loop}&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`;
			html.frameborder = '0';
			html.allow = 'autoplay; fullscreen';
			html.dataset.id = item.dataset.id;
		} else if (item.dataset.provider === 'vimeo') {
			html = document.createElement('iframe');
			html.classList.add('vimeo-player');
			html.src = item.dataset.video_src;
			html.dataset.id = item.dataset.id;
			html.frameborder = '0';
		}
		if (index > 0) {
			const figure = document.createElement('figure');
			figure.classList.add('wp-block-lsedu-plus-lesson-single-video');
			figure.dataset.controls = video.dataset.controls;
			figure.dataset.autoplay = video.dataset.autoplay;
			figure.dataset.loop = video.dataset.loop;
			figure.dataset.muted = video.dataset.muted;
			figure.dataset.id = item.dataset.id;
			if (figure.dataset.id === activeId) {
				html.classList.add('active');
			} else {
				html.classList.remove('active');
			}
			if (item.dataset.responsive) {
				if (!figure.classList.contains('responsive')) {
					figure.classList.add('responsive');
				}
			} else if (figure.classList.contains('responsive')) {
				figure.classList.remove('responsive');
			}
			figure.appendChild(html);
			videoWrapper.appendChild(figure);
		} else {
			const figure = video;
			figure.dataset.id = item.dataset.id;
			if (figure.dataset.id === activeId) {
				figure.classList.add('active');
			}
			if (item.dataset.responsive) {
				if (!figure.classList.contains('responsive')) {
					figure.classList.add('responsive');
				}
			} else if (figure.classList.contains('responsive')) {
				figure.classList.remove('responsive');
			}
			figure.appendChild(html);
		}
	});
	const figures = videoWrapper.querySelectorAll(
		'.wp-block-lsedu-plus-lesson-single-video'
	);
	if (window.hideYTActivated) return;
	if (typeof YT === 'undefined') {
		let tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	let onYouTubeIframeAPIReadyCallbacks = [];
	let ytPlayers = document.querySelectorAll('.yt-player');
	console.log(ytPlayers);

	ytPlayers.forEach((ytPlayer) => {
		let onPlayerStateChange = function (event) {
			if (event.data == YT.PlayerState.ENDED) {
				ytPlayer.parentNode.classList.add('ended');
				// figures.classList.add('ended');
			} else if (event.data == YT.PlayerState.PAUSED) {
				ytPlayer.parentNode.classList.add('paused');
				// figures.classList.add('paused');
			} else if (event.data == YT.PlayerState.PLAYING) {
				ytPlayer.parentNode.classList.remove('ended');
				ytPlayer.parentNode.classList.remove('paused');
				// figures.classList.remove('ended');
				// figures.classList.remove('paused');
			}
		};

		let player;
		onYouTubeIframeAPIReadyCallbacks.push(function () {
			player = new YT.Player(ytPlayer, {
				events: {
					onStateChange: onPlayerStateChange,
				},
			});
		});

		ytPlayer.parentNode.addEventListener('click', function () {
			let playerState = player.getPlayerState();
			if (playerState == YT.PlayerState.ENDED) {
				player.seekTo(0);
			} else if (playerState == YT.PlayerState.PAUSED) {
				player.playVideo();
			}
		});
	});

	window.onYouTubeIframeAPIReady = function () {
		for (let callback of onYouTubeIframeAPIReadyCallbacks) {
			callback();
		}
	};

	window.hideYTActivated = true;

	list.forEach((item) => {
		item.addEventListener('click', (event) => {
			event.preventDefault();
			setTimeout(() => {
				active = document.querySelector(
					'.lsedup-single-lesson-video__list-container ul li.active'
				);
				activeId = active.dataset.id;
				figures.forEach((figure) => {
					figure.classList.remove('active');
					if (figure.dataset.id === activeId) {
						figure.classList.add('active');
					}
				});
			}, 5);
		});
	});
});
