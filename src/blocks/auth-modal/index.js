import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ReactComponent as Logo } from "../../logo-01.svg";
import block from './block.json';
import "./main.css";

registerBlockType( block.name, {
  icon: { src: Logo },
  edit({ attributes, setAttributes }) {
    const { showRegister } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "lsedu-plus")}>
            <ToggleControl
              label={__('Show Register', 'lsedu-plus')}
              help={
                showRegister ?
                __('Showing registration form', 'lsedu-plus') :
                __('Hiding registration form', 'lsedu-plus')
              }
              checked={showRegister}
              onChange={ showRegister => setAttributes({ showRegister })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {__(
            "This block is not previewable from the editor. View your site for a live demo.",
            "lsedu-plus"
          )}
        </div>
      </>
    );
  },
});
