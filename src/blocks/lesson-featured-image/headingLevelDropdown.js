import { ToolbarDropdownMenu } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import HeadingLevelIcon from './headingLevelIcon';

const HEADING_LEVELS = [ 1, 2, 3, 4, 5, 6 ];

const POPOVER_PROPS = {
	className: 'block-library-heading-level-dropdown',
};

export default function HeadingLevelDropdown( { selectedLevel, onChange } ) {
	return (
		<ToolbarDropdownMenu
			popoverProps={ POPOVER_PROPS }
			icon={ <HeadingLevelIcon level={ selectedLevel } /> }
			label={ __( 'Change heading level' ) }
			controls={ HEADING_LEVELS.map( ( targetLevel ) => {
				{
					const isActive = targetLevel === selectedLevel;

					return {
						icon: (
							<HeadingLevelIcon
								level={ targetLevel }
								isPressed={ isActive }
							/>
						),
						label: sprintf( __( 'Heading %d' ), targetLevel ),
						isActive,
						onClick() {
							onChange( targetLevel );
						},
						role: 'menuitemradio',
					};
				}
			} ) }
		/>
	);
}
