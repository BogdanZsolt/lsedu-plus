import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	AlignmentControl,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
import HeadingLevelDropdown from '../tools/headingLevelDropdown';
import classnames from 'classnames';
import './main.scss';
import block from './block.json';

// Import the logo
import { ReactComponent as Logo } from '../../logo-01.svg';

registerBlockType( block.name, {
	icon: { src: Logo },
	edit( { attributes, setAttributes, context } ) {
		const {
			titleInactive,
			isTitleSettingActive,
			isLink,
			rel,
			level,
			textAlign,
			linkTarget,
		} = attributes;
		const { taxonomyList } = context;
		const blockProps = useBlockProps( {
			className: classnames( {
				'lsedup-lesson-list__header-title': true,
				[ `has-text-align-${ textAlign }` ]: textAlign,
			} ),
		} );
		const TagName = 0 === level ? 'p' : `h${ level }`;
		let title = '';
		let link = '';

		console.log( taxonomyList );
		// console.log(
		// 	'level: ',
		// 	level,
		// 	' TagName: ',
		// 	TagName,
		// 	' titleInactive: ',
		// 	titleInactive,
		// 	' titleSettingActve: ',
		// 	isTitleSettingActive
		// );

		// console.warn( 'edit', title );

		const { list, isLoading } = useSelect( ( select ) => {
			const { getEntityRecords, isResolving } = select( coreStore );
			const catId = [];
			const taxId =
				taxonomyList.taxType !== undefined &&
				taxonomyList[ taxonomyList.taxType ] !== undefined
					? taxonomyList[ taxonomyList.taxType ]
					: '';
			catId[ 0 ] = Number( taxId );
			const taxonomyArgs = [
				'taxonomy',
				taxonomyList.taxType,
				{
					include: catId,
				},
			];

			return {
				list: getEntityRecords( ...taxonomyArgs ),
				isLoading: isResolving( 'getEntityRecords', 'taxonomyArgs' ),
			};
		} );

		if ( ! isLoading ) {
			if ( isTitleSettingActive ) {
				title = list && list.length > 0 ? list[ 0 ].name : '';
			} else {
				title =
					titleInactive && titleInactive.length > 0
						? titleInactive
						: '';
				setAttributes( { titleInactive: title } );
			}
			link = list && list.length > 0 ? list[ 0 ].link : '#';
		}

		const TitleElement = () => {
			if ( isLink ) {
				return (
					<TagName { ...blockProps }>
						{ isTitleSettingActive && (
							<a
								href={ link }
								target={ linkTarget }
								onClick={ ( event ) => event.preventDefault() }
							>
								{ title }
							</a>
						) }
						{ ! isTitleSettingActive && (
							<RichText
								tagName="a"
								href={ link }
								target={ linkTarget }
								value={ title }
								withoutInteractiveFormatting
								onChange={ ( title ) =>
									setAttributes( { title } )
								}
								placeholder={
									title && title === ''
										? __( 'Title', 'lsedu-plus' )
										: title
								}
							/>
						) }
					</TagName>
				);
			} else {
				if ( isTitleSettingActive ) {
					return (
						<TagName
							{ ...blockProps }
							dangerouslySetInnerHTML={ { __html: title } }
						/>
					);
				} else {
					return (
						<RichText
							{ ...blockProps }
							tagName={ TagName }
							value={ title }
							withoutInteractiveFormatting
							onChange={ ( title ) => setAttributes( { title } ) }
							placeholder={
								title && title === ''
									? __( 'Title', 'lsedu-plus' )
									: title
							}
						/>
					);
				}
			}
		};

		// console.log( title );

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
						onChange={ ( textAlign ) => {
							setAttributes( { textAlign } );
						} }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'title Setting', 'lsedu-plus' ) }>
						<ToggleControl
							label={ __(
								'Activate title setting',
								'lsedu-plus'
							) }
							onChange={ () =>
								setAttributes( {
									isTitleSettingActive:
										! isTitleSettingActive,
								} )
							}
							checked={ isTitleSettingActive }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Link settings', 'lsedu-plus' ) }>
						<ToggleControl
							label={ __( 'Make title a link', 'lsedu-plus' ) }
							onChange={ () =>
								setAttributes( { isLink: ! isLink } )
							}
							checked={ isLink }
						/>
						{ isLink && (
							<>
								<ToggleControl
									label={ __(
										'Open in new tab',
										'lsedu-plus'
									) }
									onChange={ ( value ) =>
										setAttributes( {
											linkTarget: value
												? '_blank'
												: '_self',
										} )
									}
									checked={ linkTarget === '_blank' }
								/>
								<TextControl
									label={ __( 'Link rel' ) }
									value={ rel }
									onChange={ ( rel ) =>
										setAttributes( { rel } )
									}
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
				<TitleElement />
			</>
		);
	},

	save() {
		return null;
	},
} );
