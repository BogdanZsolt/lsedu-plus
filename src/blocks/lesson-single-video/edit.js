import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import {
	useBlockProps,
	BlockControls,
	MediaReplaceFlow,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	PanelBody,
	ToggleControl,
	Disabled,
} from '@wordpress/components';
import { useRef, useMemo, useEffect } from '@wordpress/element';
import { witchProvider, isResponsive } from '../tools/utils';

export default function Edit({
	isSelected,
	attributes,
	setAttributes,
	context,
}) {
	const { controls, autoplay, loop, muted, download } = attributes;
	const { postId, order, orderBy } = context;
	const postType = useSelect((select) => {
		return select('core/editor').getCurrentPostType();
	}, []);
	const blockProps = useBlockProps();
	const ALLOWED_MEDIA_TYPES = ['video'];
	const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
	const [featuredImage] = useEntityProp(
		'postType',
		postType,
		'featured_media',
		postId
	);
	const videoSrc = meta.video_data.video_src;
	const videoProvider = meta.video_data.provider;
	const videoResponsive = meta.video_data.responsive;
	const videoDuration = meta.video_data.videoDuration | 0;

	const videoEl = useRef(null);

	// const url = 'https://youtube.com/embed/rok6sp12EeY';
	// const url = '//videa.hu/player?v=YRpGOgMFnQ2wl4vh';
	// const url =
	// 	'https://player.vimeo.com/video/717781102?h=c9e7627272&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479';

	const { media } = useSelect((select) => {
		const { getMedia } = select('core');
		return {
			media:
				featuredImage && getMedia(featuredImage, { context: 'view' }),
		};
	});
	const poster = media?.media_details?.sizes?.['videoPlaceholderImage']
		? media?.media_details?.sizes?.['videoPlaceholderImage']?.source_url
		: media?.media_details?.sizes?.['full']?.source_url;

	// useEffect(() => {
	// 	// Placeholder may be rendered.
	// 	if (videoPlayer.current) {
	// 		videoPlayer.current.load();
	// 	}
	// }, [poster]);

	const onAutoplayChange = (value) => {
		setAttributes({ autoplay: value });
		setAttributes({ muted: value });
	};

	const onSelectVideo = (value) => {
		const tempObj = { ...meta.video_data };
		tempObj.video_src = value.url;
		tempObj.provider = witchProvider(value.url);
		tempObj.responsive = isResponsive(value.url);
		tempObj.videoDuration = 0;
		setMeta({ ...meta, video_data: tempObj });
	};

	const onSelectURL = (value) => {
		const tempObj = { ...meta.video_data };
		console.log(tempObj);
		tempObj.video_src = value;
		tempObj.provider = witchProvider(value);
		tempObj.responsive = isResponsive(value);
		tempObj.videoDuration = 0;
		setMeta({ ...meta, video_data: tempObj });
	};

	const onRemoveVideo = () => {
		const tempObj = { ...meta.video_data };
		console.log(tempObj);
		tempObj.video_src = '';
		tempObj.provider = witchProvider('');
		tempObj.responsive = isResponsive('');
		tempObj.videoDuration = 0;
		setMeta({ ...meta, video_data: tempObj });
	};

	const getVideoDuration = () => {
		const video = videoEl.current;
		const tempObj = { ...meta.video_data };
		console.log(meta.video_data);
		if (!video) return;

		console.log(`The video is ${parseInt(video.duration)} seconds long.`);
		tempObj.videoDuration = parseInt(video.duration);
		setMeta({ ...meta, video_data: tempObj });
	};

	console.log(meta);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'lsedu-plus')}>
					<ToggleControl
						label={__('controls', 'lsedu-plus')}
						help={
							autoplay
								? __('Enable Video autoplay', 'lsedu-plus')
								: __('Disable Video autoplay', 'lsedu-plus')
						}
						checked={controls}
						onChange={(controls) => setAttributes({ controls })}
					/>
					<ToggleControl
						label={__('autoplay', 'lsedu-plus')}
						help={
							autoplay
								? __('Enable Video autoplay', 'lsedu-plus')
								: __('Disable Video autoplay', 'lsedu-plus')
						}
						checked={autoplay}
						onChange={onAutoplayChange}
					/>
					<ToggleControl
						label={__('loop', 'lsedu-plus')}
						checked={loop}
						onChange={(loop) => setAttributes({ loop })}
					/>
					<ToggleControl
						label={__('muted', 'lsedu-plus')}
						checked={muted}
						onChange={(muted) => setAttributes({ muted })}
					/>
					<ToggleControl
						label={__('download', 'lsedu-plus')}
						checked={download}
						onChange={(download) => setAttributes({ download })}
					/>
				</PanelBody>
			</InspectorControls>
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
			{videoSrc && (
				<figure {...blockProps}>
					<Disabled isDisabled={!isSelected}>
						{videoProvider === 'wordpress' && (
							<video
								id="player"
								controls={controls}
								autoplay={autoplay}
								src={videoSrc}
								ref={videoEl}
								onLoadedMetadata={getVideoDuration}
							></video>
						)}
						{videoProvider === 'youtube' && (
							<div className="lsedup-youtube-video-player">
								<iframe
									id="player"
									src={videoSrc}
									frameborder="0"
									allow="fullscreen;"
								></iframe>
							</div>
						)}
						{videoProvider === 'vimeo' && (
							<div className="lsedup-vimeo-video-player">
								<iframe
									id="player"
									src={videoSrc}
									frameborder="0"
									allow="fullscreen;"
								></iframe>
							</div>
						)}
					</Disabled>
				</figure>
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
		</>
	);
}

// https://www.youtube.com/embed/_zmilpFsaJ0
