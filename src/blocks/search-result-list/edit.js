import { memo, useMemo, useState } from '@wordpress/element';
import {
	BlockControls,
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	Spinner,
	PanelBody,
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
	const { isSlider, columns, displayLayout } = attributes;

	const { postType, order, orderBy } = context;

	const [activeBlockContextId, setActiveBlockContextId] = useState();

	const { posts, blocks } = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			const { getBlocks } = select(blockEditorStore);
			const query = {
				per_page: -1,
				_embed: true,
				order,
				orderby: orderBy,
				parent: 0,
			};
			return {
				posts: getEntityRecords('postType', postType, query),
				blocks: getBlocks(clientId),
			};
		},
		[order, orderBy, clientId]
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
			'lsedup-search-result-list': true,
			'is-flex-container': displayLayout === 'flex',
			[`has-columns-${columns}`]: displayLayout === 'flex',
			'is-list-container': displayLayout === 'list',
		}),
	});

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
					{displayLayout === 'flex' && (
						<RangeControl
							label={__('Columns', 'lsedu-plus')}
							min={2}
							max={6}
							onChange={(columns) => setAttributes({ columns })}
							value={columns}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup controls={layoutControls} />
			</BlockControls>
			{blockContexts && (
				<div {...blockProps}>
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
