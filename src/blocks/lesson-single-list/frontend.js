document.addEventListener('DOMContentLoaded', () => {
	if (
		document.querySelector(
			'.lsedup-single-lesson-video__list-container',
			'.lsedup-single-lesson-video__list-container ul'
		)
	) {
		const container = document.querySelector(
			'.lsedup-single-lesson-video__list-container'
		);
		const childList = document.querySelector(
			'.lsedup-single-lesson-video__list-container ul'
		);
		const videoWrapper = document.querySelector(
			'.wp-block-lsedu-plus-lesson-single-video'
		);
		if (childList.dataset.haveChild === '1') {
			container.classList.remove('hide');
			const lessonList = document.querySelectorAll(
				'.lsedup-single-lesson-video__list-container ul li'
			);
			let active = document.querySelector(
				'.lsedup-single-lesson-video__list-container ul li.active'
			);
			lessonList.forEach((item) => {
				item.addEventListener('click', () => {
					lessonList.forEach((i) => {
						i.classList.remove('active');
					});
					item.classList.add('active');
					active = document.querySelector(
						'.lsedup-single-lesson-video__list-container ul li.active'
					);
				});
			});
		} else {
			container.classList.add('hide');
		}
	}
});
