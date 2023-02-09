import { filter } from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
	const location = document.location;
	let params = new URLSearchParams(location.search);
	const openSelectBtn = document.querySelectorAll('.open-select');
	const resetSlectBtn = document.querySelectorAll('.reset-select');
	const selectEl = document.querySelector(
		'.wp-block-lsedu-plus-filter-select'
	);
	let area = document.querySelector('#area');
	let category = document.querySelector('#category');
	let author = document.querySelector('#author');
	let intensity = document.querySelector('#intensity');
	let level = document.querySelector('#level');
	let duration = document.querySelector('#duration');
	const filterSelect = document.querySelector('#filter-select');
	let filters = {
		area: '0',
		category: '0',
		author: '0',
		intensity: '0',
		level: '0',
		duration: '0',
	};
	const parameters = [
		'post_type',
		'area',
		'category',
		'author',
		'intensity',
		'level',
		'duration',
	];

	const searchInputWrapper = document.querySelector(
		'.wp-block-search__inside-wrapper '
	);

	parameters.forEach((param, index) => {
		let html = document.createElement('input');
		html.type = 'hidden';
		html.name = param;
		html.value = params.has(param) ? params.get(param) : '0';
		html.value =
			!params.has(param) &&
			param === 'area' &&
			filterSelect.dataset.tax !== '0'
				? filterSelect.dataset.tax
				: html.value;
		searchInputWrapper.insertBefore(
			html,
			searchInputWrapper.children[index + 1]
		);
	});

	const filtersReset = () => {
		if (params.get('s') !== '') {
			console.log(params);
			params.set('area', '0');
			params.set('category', '0');
			params.set('author', '0');
			params.set('intensity', '0');
			params.set('level', '0');
			params.set('duration', '0');

			location.search = params.toString();
		} else {
			window.location.replace(location.origin);
		}
	};

	openSelectBtn.forEach((el) => {
		el.addEventListener('click', (event) => {
			event.preventDefault();

			selectEl.classList.toggle('hidden');
		});
	});

	resetSlectBtn.forEach((el) => {
		el.addEventListener('click', (event) => {
			event.preventDefault();

			filtersReset();
		});
	});
	if (area !== null) {
		area.addEventListener('change', (event) => {
			event.preventDefault();
			filters['area'] = area.value;
			filterSelect.submit();
		});
	}
	category.addEventListener('change', (event) => {
		event.preventDefault();
		filters['category'] = category.value;
		filterSelect.submit();
	});
	author.addEventListener('change', (event) => {
		event.preventDefault();
		filters['author'] = author.value;
		filterSelect.submit();
	});
	intensity.addEventListener('change', (event) => {
		event.preventDefault();
		filters['intensity'] = intensity.value;
		filterSelect.submit();
	});
	level.addEventListener('change', (event) => {
		event.preventDefault();
		filters['level'] = level.value;
		filterSelect.submit();
	});
	duration.addEventListener('change', (event) => {
		event.preventDefault();
		filters['duration'] = duration.value;
		filterSelect.submit();
	});
});
