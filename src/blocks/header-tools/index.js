import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ReactComponent as Logo } from "../../logo-01.svg";
import block from './block.json';
import "./main.css";

registerBlockType(block.name, {
  icon: {src: Logo},
  edit({ attributes, setAttributes }) {
    const { showAuth } = attributes
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "lsedu-plus")}>
            <SelectControl
              label={__("Show Login/Register Link", "lsedu-plus")}
              value={showAuth}
              options={[
                { label: __("No", "lsedu-plus"), value: false },
                { label: __("Yes", "lsedu-plus"), value: true },
              ]}
              onChange={(newVal) =>
                setAttributes({ showAuth: newVal === "true" })
              }
            />
            <CheckboxControl
              label={__("Show Login/Register Link", "lsedu-plus")}
              help={
                showAuth ?
                __('Showing Link', 'lsedu-plus') :
                __('Hiding Link', 'lsedu-plus')
              }
              checked={showAuth}
              onChange={showAuth => setAttributes({ showAuth })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {
            showAuth &&
            <a className="signin-link open-modal" href="#">
              <div className="signin-icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="signin-text">
                <small>Hello, Sign in</small>
                My Account
              </div>
            </a>
          }
        </div>
      </>
    );
  },
});
