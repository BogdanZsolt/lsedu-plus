import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Rating from '@mui/material/Rating';

export default function Edit({ attributes, setAttributes, context }) {
	const { order, orderBy } = attributes;
	const { postType, postId } = context;

	const ALLOWED_BLOCKS = [
		'core/columns',
		'lsedu-plus/lesson-single-video',
		'core/group',
	];
	const TEMPLATE = [
		[
			'core/columns',
			{},
			[
				[
					'core/column',
					{
						className: 'lsedup-single-lesson-video__wrapper',
					},
					[['lsedu-plus/lesson-single-video', {}]],
				],
				[
					'core/column',
					{
						className: 'lsedup-single-lesson-video__list-container',
					},
					[['lsedu-plus/lesson-single-list', {}]],
				],
			],
		],
	];
	const listContainer = document.querySelector(
		'.lsedup-single-video__list-container'
	);
	// const postType = useSelect((select) => {
	// 	return select('core/editor').getCurrentPostType();
	// }, []);

	const { authorName, rating, parentId, postChildren } = useSelect(
		(select) => {
			const { getEditedEntityRecord, getUser, getEntityRecords } =
				select(coreStore);
			const { getCurrentPostAttribute } = select('core/editor');
			const _authorId = getEditedEntityRecord(
				'postType',
				postType,
				postId
			)?.author;
			const query = {
				per_page: -1,
				_embed: true,
				order,
				orderby: orderBy,
				parent: postId,
				status: 'publish',
			};

			return {
				authorName: _authorId ? getUser(_authorId) : null,
				rating: getCurrentPostAttribute('meta').lesson_rating,
				postChildren: getEntityRecords('postType', postType, query),
				parentId: getCurrentPostAttribute('parent'),
			};
		},
		[postType, postId, order, orderBy]
	);

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				orientation="horizontal"
			/>
		</div>
	);
}

// 'Updating failed. Could not update the meta value of lesson_rating in database'
