import { memo, useMemo, useState } from '@wordpress/element';
import {
	BlockControls,
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	Spinner,
	PanelBody,
	ToggleControl,
	RangeControl,
	ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { list, grid } from '@wordpress/icons';
import classnames from 'classnames';

const TEMPLATE = [
	['core/post-featured-image', { sizeSlug: 'videoPlaceholderImage' }],
	['lsedu-plus/lesson-title', { level: 4 }],
];

// Edit

export default function Edit(props) {
	const { clientId, attributes, setAttributes, context } = props;
	const { isSlider, columns, displayLayout, sliderScrollerColor } =
		attributes;

	const { postType, order, orderBy, setTaxonomy, activePostId } = context;

	const [activeBlockContextId, setActiveBlockContextId] = useState();

	const { posts, blocks } = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			const { getBlocks } = select(blockEditorStore);
			const taxId = [];
			if (setTaxonomy.taxSelect && setTaxonomy.taxSelect !== undefined) {
				taxId[0] = Number(setTaxonomy.taxSelect);
			}
			const query = {
				per_page: -1,
				_embed: true,
				order,
				orderby: orderBy,
				parent: 0,
			};
			if (setTaxonomy.taxType === 'category') {
				query['categories'] = taxId;
			} else {
				query[setTaxonomy.taxType] = taxId;
			}
			return {
				posts: getEntityRecords('postType', postType, query),
				blocks: getBlocks(clientId),
			};
		},
		[order, orderBy, clientId, setTaxonomy]
	);

	function PostTemplateBlockPreview({
		blocks,
		blockContextId,
		isHidden,
		setActiveBlockContextId,
	}) {
		const blockPreviewProps = useBlockPreview({
			blocks,
			props: {
				className: classnames({
					'wp-block-post': true,
				}),
			},
		});

		const handleOnClick = () => {
			setActiveBlockContextId(blockContextId);
		};

		const style = {
			display: isHidden ? 'none' : undefined,
		};

		return (
			<div
				{...blockPreviewProps}
				tabIndex={0}
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
				role="button"
				onClick={handleOnClick}
				onKeyPress={handleOnClick}
				style={style}
			/>
		);
	}

	const PostTemplateInnerBlocks = () => {
		const innerBlocksProps = useInnerBlocksProps(
			{
				className: classnames({
					'wp-block-post': true,
				}),
			},
			{ template: TEMPLATE },
			{ renderAppender: false }
		);
		return <div {...innerBlocksProps} />;
	};

	const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

	const blockContexts = useMemo(
		() =>
			posts?.map((post) => ({
				postType: post.type,
				postId: post.id,
			})),
		[posts]
	);

	const blockProps = useBlockProps({
		className: classnames({
			swiper: isSlider,
			'lsedup-lesson-list': true,
			isSlider: isSlider,
			'is-flex-container': displayLayout === 'flex' && !isSlider,
			[`has-columns-${columns}`]: displayLayout === 'flex' || isSlider,
			'is-list-container': displayLayout === 'list',
		}),
	});

	const onIconColor = (value) => {
		const tempObj = { ...sliderScrollerColor };
		tempObj.textColor = value;
		setAttributes({ sliderScrollerColor: tempObj });
	};

	const onBackgroundColor = (value) => {
		const tempObj = { ...sliderScrollerColor };
		tempObj.background = value;
		setAttributes({ sliderScrollerColor: tempObj });
	};

	if (!posts) {
		return (
			<p {...blockProps}>
				<Spinner />
			</p>
		);
	}

	if (!posts.length) {
		return <p {...blockProps}> {__('No results found.', 'lsedu-plus')}</p>;
	}

	const layoutControls = [
		{
			icon: list,
			title: __('List view', 'lsedu-plus'),
			onClick: () => setAttributes({ displayLayout: 'list' }),
			isActive: displayLayout === 'list',
		},
		{
			icon: grid,
			title: __('Grid view', 'lsedu-plus'),
			onClick: () => setAttributes({ displayLayout: 'flex' }),
			isActive: displayLayout === 'flex',
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'lsedu-plus')}>
					<ToggleControl
						label={__('Slider', 'lsedu-plus')}
						onChange={() => setAttributes({ isSlider: !isSlider })}
						help={
							isSlider
								? __('List slider on', 'lsedu-plus')
								: __('List slider off', 'lsedu-plus')
						}
						checked={isSlider}
					/>
					{displayLayout === 'flex' && !isSlider && (
						<RangeControl
							label={__('Columns', 'lsedu-plus')}
							min={2}
							max={6}
							onChange={(columns) => setAttributes({ columns })}
							value={columns}
						/>
					)}
				</PanelBody>
				{isSlider && (
					<PanelColorSettings
						title={__(
							'Slider Scroller Color Settings',
							'lsedu-plus'
						)}
						enableAlpha
						colorSettings={[
							{
								value: sliderScrollerColor.textColor,
								onChange: onIconColor,
								label: __('Icon Color', 'lsedu-plus'),
							},
							{
								value: sliderScrollerColor.background,
								onChange: onBackgroundColor,
								label: __('Background Color', 'lsedu-plus'),
							},
						]}
					/>
				)}
			</InspectorControls>
			{!isSlider && (
				<BlockControls>
					<ToolbarGroup controls={layoutControls} />
				</BlockControls>
			)}
			{blockContexts && (
				<div {...blockProps}>
					{isSlider && (
						<>
							<div
								className="lsedup-lesson-list__prev"
								style={{
									color: sliderScrollerColor.textColor,
									background: sliderScrollerColor.background,
								}}
							></div>
							<div
								className="lsedup-lesson-list__next"
								style={{
									color: sliderScrollerColor.textColor,
									background: sliderScrollerColor.background,
								}}
							></div>
						</>
					)}
					{blockContexts.map((blockContext) => (
						<BlockContextProvider
							key={blockContext.postId}
							value={blockContext}
						>
							{blockContext.postId ===
							(activeBlockContextId ||
								blockContexts[0]?.postId) ? (
								<PostTemplateInnerBlocks />
							) : null}
							<MemoizedPostTemplateBlockPreview
								blocks={blocks}
								blockContextId={blockContext.postId}
								setActiveBlockContextId={
									setActiveBlockContextId
								}
								isHidden={
									blockContext.postId ===
									(activeBlockContextId ||
										blockContexts[0]?.postId)
								}
							/>
						</BlockContextProvider>
					))}
				</div>
			)}
		</>
	);
}
