import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useEntityProp } from '@wordpress/core-data';
import {
	BlockControls,
	AlignmentControl,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
import HeadingLevelDropdown from './headingLevelDropdown';

export default function Edit( { attributes, setAttributes, context } ) {
	const { textAlign, level, isLink, linkTarget, rel } = attributes;
	const { postId, postType } = context;

	// console.log(context);

	const title = useEntityProp( 'postType', postType, 'title', postId )[ 0 ];
	const link = useEntityProp( 'postType', postType, 'link', postId )[ 0 ];

	const TagName = 0 === level ? 'p' : `h${ level }`;

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	let titleElement = (
		<TagName { ...blockProps }>{ __( 'Title', 'lsedu-plus' ) }</TagName>
	);

	if ( postType && postId ) {
		titleElement = isLink ? (
			<a
				href={ link }
				target={ linkTarget }
				rel={ rel }
				onClick={ ( event ) => event.preventDefault() }
			>
				<TagName
					{ ...blockProps }
					dangerouslySetInnerHTML={ { __html: title } }
				/>
			</a>
		) : (
			<TagName
				{ ...blockProps }
				dangerouslySetInnerHTML={ { __html: title } }
			/>
		);
	}

	return (
		<>
			<BlockControls group="block">
				<HeadingLevelDropdown
					selectedLevel={ level }
					onChange={ ( newLevel ) =>
						setAttributes( { level: newLevel } )
					}
				/>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Link settings' ) }>
					<ToggleControl
						label={ __( 'Make title a link' ) }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/>
					{ isLink && (
						<>
							<ToggleControl
								label={ __( 'Open in new tab' ) }
								onChange={ ( value ) =>
									setAttributes( {
										linkTarget: value ? '_blank' : '_self',
									} )
								}
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								label={ __( 'Link rel' ) }
								value={ rel }
								onChange={ ( newRel ) =>
									setAttributes( { rel: newRel } )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>
			{ titleElement }
		</>
	);
}
