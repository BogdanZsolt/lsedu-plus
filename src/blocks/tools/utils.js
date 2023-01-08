import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

const embedProviders = [
	{
		name: 'Youtube',
		slug: 'youtube',
		patterns: [
			/^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,
			/^https?:\/\/youtu\.be\/.+/i,
		],
		responsive: true,
	},
	{
		name: 'Vimeo',
		slug: 'vimeo',
		patterns: [/^https?:\/\/((player|www)\.)?vimeo\.com\/.+/i],
		responsive: true,
	},
	{
		name: 'Videa',
		slug: 'videa',
		patterns: [/\/\/videa\.hu\/.+/i],
		responsive: true,
	},
];

export const usePostTypes = () => {
	const postTypes = useSelect((select) => {
		const { getPostTypes } = select(coreStore);
		const excludedPostTypes = ['attachment'];
		const filteredPostTypes = getPostTypes({ per_page: -1 })?.filter(
			({ viewable, slug }) =>
				viewable && !excludedPostTypes.includes(slug)
		);
		return filteredPostTypes;
	}, []);
	const postTypesTaxonomiesMap = useMemo(() => {
		if (!postTypes?.length) return;
		return postTypes.reduce((accumulator, type) => {
			accumulator[type.slug] = type.taxonomies;
			return accumulator;
		}, {});
	}, [postTypes]);
	const postTypesSelectOptions = useMemo(
		() =>
			(postTypes || []).map(({ labels, slug }) => ({
				label: labels.singular_name,
				value: slug,
			})),
		[postTypes]
	);
	return { postTypesTaxonomiesMap, postTypesSelectOptions };
};

const matchProvider = (url, patterns) => {
	return patterns.some((pattern) => url.match(pattern));
};

export const witchProvider = (url) => {
	let response = 'wordpress';
	embedProviders.map((prov) => {
		const result = matchProvider(url, prov.patterns);
		if (result) {
			response = prov.slug;
		}
	});
	return response;
};

export const isResponsive = (url) => {
	let response = false;
	embedProviders.map((prov) => {
		const result = matchProvider(url, prov.patterns);
		if (result) {
			response = prov.responsive;
		}
	});
	return response;
};
