import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	useBlockProps,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import HeadingLevelDropdown from '../tools/headingLevelDropdown';
import classnames from 'classnames';
import './main.scss';
import block from './block.json';

// Import the logo
import { ReactComponent as Logo } from '../../logo-01.svg';

registerBlockType( block.name, {
	icon: { src: Logo },
	edit( { attributes, setAttributes, context } ) {
		const { title, link, level, textAlign, linkTarget } = attributes;
		const { postId, postType, taxonomyList } = context;
		const blockProps = useBlockProps( {
			className: classnames( 'lsedup-lesson-list__header-title' ),
		} );
		// console.log( 'title: ', title, ', link: ', link );
		const TagName = 0 === level ? 'p' : `h${ level }`;

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
			const tempTitle = list && list.length > 0 ? list[ 0 ].name : '';
			const tempLink = list && list.length > 0 ? list[ 0 ].link : '#';
			setAttributes( { title: tempTitle } );
			setAttributes( { link: tempLink } );
		}

		let titleElement = (
			<a
				href={ link }
				target={ linkTarget }
				onClick={ ( event ) => event.preventDefault() }
			>
				<TagName
					{ ...blockProps }
					dangerouslySetInnerHTML={ { __html: title } }
				/>
			</a>
		);

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
				{ titleElement }
			</>
		);
	},
} );
