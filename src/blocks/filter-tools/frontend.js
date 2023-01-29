document.addEventListener('DOMContentLoaded', () => {
	let params = new URLSearchParams(document.location.search);
	const filterButton = document.querySelector('.filter-button');
	if (params.has('s')) {
		if (
			params.get('area') !== '0' ||
			params.get('category') !== '0' ||
			params.get('author') !== '0' ||
			params.get('intensity') !== '0' ||
			params.get('level') !== '0' ||
			params.get('duration') !== '0'
		) {
			filterButton.innerHTML = ' Clear Filters ';
			filterButton.classList.remove('open-select');
			filterButton.classList.add('reset-select');
		} else {
			filterButton.innerHTML = ' Filters ';
			filterButton.classList.remove('reset-select');
			filterButton.classList.add('open-select');
		}
	}
});
