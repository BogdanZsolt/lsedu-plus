import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	store as blockEditorStore,
	InspectorControls,
	__experimentalUseBorderProps as useBorderProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { Placeholder, PanelBody, ToggleControl } from '@wordpress/components';
import classnames from 'classnames';
import DimensionControls from './dimension-controls';

export default function Edit( {
	clientId,
	attributes,
	setAttributes,
	context: { postId, postType: postTypeSlug, queryId },
} ) {
	const { isLink, scale, sizeSlug, width, height, linkTarget } = attributes;
	const [ featuredImage ] = useEntityProp(
		'postType',
		postTypeSlug,
		'featured_media',
		postId
	);
	const borderProps = useBorderProps( attributes );

	function getMediaSourceUrlBySizeSlug( media, slug ) {
		return (
			media?.media_details?.sizes?.[ slug ]?.source_url ||
			media?.source_url
		);
	}

	const { media, postType, imageSizes } = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		const { getMedia, getPostType } = select( coreStore );
		const settings = getSettings();
		return {
			media:
				featuredImage && getMedia( featuredImage, { context: 'view' } ),
			postType: postTypeSlug && getPostType( postTypeSlug ),
			imageSizes: settings.imageSizes,
		};
	}, [] );

	const mediaUrl = getMediaSourceUrlBySizeSlug( media, sizeSlug );

	const imageSizeOptions = imageSizes
		.filter( ( { slug } ) => {
			return media?.media_details?.sizes?.[ slug ]?.source_url;
		} )
		.map( ( { name, slug } ) => ( {
			value: slug,
			label: name,
		} ) );

	const placeholder = ( content ) => {
		return (
			<Placeholder
				className={ classnames( 'block-editor-media-placeholder' ) }
				withIllustration={ true }
			>
				{ content }
			</Placeholder>
		);
	};

	const blockProps = useBlockProps( {
		style: { width, height },
	} );

	const controls = (
		<>
			<DimensionControls
				clientId={ clientId }
				attributes={ attributes }
				setAttributes={ setAttributes }
				imageSizeOptions={ imageSizeOptions }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Link settings' ) }>
					<ToggleControl
						label={
							postType?.labels.singular_name
								? sprintf(
										// translators: %s: Name of the post type e.g: "post".
										__( 'Link to %s' ),
										postType.labels.singular_name.toLowerCase()
								  )
								: __( 'Link to post' )
						}
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/>
					{ isLink && (
						<ToggleControl
							label={ __( 'Open in new tab' ) }
							onChange={ ( value ) =>
								setAttributes( {
									linkTarget: value ? '_blank' : '_self',
								} )
							}
							checked={ linkTarget === '_blank' }
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);

	return (
		<figure { ...blockProps }>
			{ controls }
			<img
				className={ borderProps.className }
				src={ mediaUrl }
				style={ { height, objectFit: height && scale } }
			/>
		</figure>
	);
}
