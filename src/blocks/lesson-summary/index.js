import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { Spinner, ToolbarButton } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import Rating from '@mui/material/Rating';
import block from './block.json';
import { ReactComponent as Logo } from '../../logo-01.svg';
import './main.scss';

registerBlockType(block.name, {
	icon: { src: Logo },
	edit({ attributes, setAttributes, context }) {
		const postType = useSelect((select) => {
			return select('core/editor').getCurrentPostType();
		}, []);
		const termCategoryIDs = useSelect((select) => {
			return select('core/editor').getCurrentPostAttribute('categories');
		});
		const { durationTime, course } = attributes;
		const blockProps = useBlockProps();
		const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
		const videoSrc = meta.video_src;
		const { postId, order, orderBy } = context;
		const ALLOWED_MEDIA_TYPES = ['video'];
		const [termAreaIDs] = useEntityProp(
			'postType',
			postType,
			'area',
			postId
		);
		const [termIntensityIDs] = useEntityProp(
			'postType',
			postType,
			'intensity',
			postId
		);
		const [termLevelIDs] = useEntityProp(
			'postType',
			postType,
			'level',
			postId
		);
		const [termDurationIDs] = useEntityProp(
			'postType',
			postType,
			'duration',
			postId
		);

		const {
			authorName,
			rating,
			parentId,
			postChildren,
			areas,
			categories,
			intensities,
			levels,
			durations,
			isLoading,
		} = useSelect(
			(select) => {
				const {
					getEditedEntityRecord,
					getUser,
					getEntityRecords,
					isResolving,
				} = select(coreStore);
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
				const taxonomyAreaArgs = [
					'taxonomy',
					'area',
					{
						include: termAreaIDs,
					},
				];
				const taxonomyCategoryArgs = [
					'taxonomy',
					'category',
					{
						include: termCategoryIDs,
					},
				];
				const taxonomyIntensityArgs = [
					'taxonomy',
					'intensity',
					{
						include: termIntensityIDs,
					},
				];
				const taxonomyLevelArgs = [
					'taxonomy',
					'level',
					{
						include: termLevelIDs,
					},
				];
				const taxonomyDurationArgs = [
					'taxonomy',
					'duration',
					{
						include: termDurationIDs,
					},
				];

				return {
					authorName: _authorId ? getUser(_authorId) : null,
					rating: getCurrentPostAttribute('meta').lesson_rating,
					parentId: getCurrentPostAttribute('parent'),
					postChildren: getEntityRecords('postType', postType, query),
					areas: getEntityRecords(...taxonomyAreaArgs),
					intensities: getEntityRecords(...taxonomyIntensityArgs),
					levels: getEntityRecords(...taxonomyLevelArgs),
					durations: getEntityRecords(...taxonomyDurationArgs),
					categories: getEntityRecords(...taxonomyCategoryArgs),
					isLoading: isResolving(
						'getEntityRecords',
						'taxonomyAreaArgs'
					),
				};
			},
			[
				postType,
				postId,
				order,
				orderBy,
				termAreaIDs,
				termCategoryIDs,
				termIntensityIDs,
				termLevelIDs,
				termDurationIDs,
			]
		);

		const onSelectVideo = (value) => {
			setMeta({ ...meta, video_src: value.url });
		};

		const onSelectURL = (value) => {
			setMeta({ ...meta, video_src: value });
		};

		const onRemoveVideo = () => {
			setMeta({ ...meta, video_src: '' });
		};

		const myVideo = document.getElementById('myVideo');

		return (
			<>
				{videoSrc && (
					<BlockControls>
						<MediaReplaceFlow
							mediaURL={videoSrc}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							accept="video/*"
							onSelect={onSelectVideo}
							onSelectURL={onSelectURL}
						/>
						<ToolbarButton onClick={onRemoveVideo}>
							{__('Remove', 'lsedu-plus')}
						</ToolbarButton>
					</BlockControls>
				)}
				<div {...blockProps}>
					<div className="row separator">
						<i className="bi bi-play-btn"></i>
						<div className="lesson-column-8">
							<div className="lesson-title">
								{__('video url', 'lsedu-plus')}
							</div>
							<div className="lesson-data">
								{videoSrc && (
									<div className="lesson-video-url">
										<iframe
											src={videoSrc}
											className="lesson-video-player"
											id="myVideo"
											frameborder="0"
											allow="fullscreen; autoplay; clipboard-write;"
										/>
									</div>
								)}
								{!videoSrc && (
									<MediaPlaceholder
										icon="admin-users"
										accept="video/*"
										allowedTypes={ALLOWED_MEDIA_TYPES}
										onSelect={onSelectVideo}
										onSelectURL={onSelectURL}
									/>
								)}
							</div>
						</div>

						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Duration Time', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-duration-time">
								<RichText
									tagName="span"
									value={durationTime}
									onChange={(durationTime) =>
										setAttributes({
											durationTime,
										})
									}
									placeholder={__(
										'Duration time',
										'lsedu-plus'
									)}
								/>
							</div>
						</div>
					</div>

					<div className="row separator">
						<i className="bi bi-info-square"></i>
						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Area', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-area">
								{isLoading && <Spinner />}
								{!isLoading &&
									areas &&
									areas.map((item, index) => {
										const comma = areas[index + 1]
											? ', '
											: '';
										return (
											<>
												<a
													href={
														item.meta.more_info_url
													}
												>
													{item.name}
												</a>
												{comma}
											</>
										);
									})}
							</div>
						</div>
						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Category', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-category">
								{categories &&
									categories.map((item, index) => {
										const comma = categories[index + 1]
											? ', '
											: '';
										return item.name + comma;
									})}
							</div>
						</div>
						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Author', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-author">
								{authorName?.name}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Intensity', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-intensity">
								{intensities &&
									intensities.map((item, index) => {
										const comma = intensities[index + 1]
											? ', '
											: '';
										return item.name + comma;
									})}
							</div>
						</div>
						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Level', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-level">
								{levels &&
									levels.map((item, index) => {
										const comma = levels[index + 1]
											? ', '
											: '';
										return item.name + comma;
									})}
							</div>
						</div>
						<div className="lesson-column-4">
							<div className="lesson-title">
								{__('Duration', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-duration">
								{durations &&
									durations.map((item, index) => {
										const comma = durations[index + 1]
											? ', '
											: '';
										return item.name + comma;
									})}
							</div>
						</div>
					</div>

					<div className="row separator">
						<i className="bi bi-hand-thumbs-up"></i>
						<div className="lesson-column-6">
							<div className="lesson-title">
								{__('Rating', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-rating">
								<Rating value={rating} readOnly />
							</div>
						</div>
						<div className="lesson-column-6">
							<div className="lesson-title">
								{__('Info', 'lsedu-plus')}
							</div>
							<div className="lesson-data lesson-info">
								<ul>
									{postChildren &&
										postChildren.map((child) => {
											return (
												<li>{child.title.rendered}</li>
											);
										})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	},
});
