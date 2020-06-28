/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Showdown from 'showdown';
import isUndefined from 'lodash/fp/isUndefined';

class ReactCkeditor extends Component {
  constructor(props) {
    super(props);
    const { data, useImageUploader, imageUploadType } = props;
    const editorId = isUndefined(data.editorId)
      ? props.editorId
      : data.editorId;
    this.state = {
      editorId,
      useImageUploader,
      imageUploadType
    };
    this.getValue = this.getValue.bind(this);
  }

  componentDidMount() {
    CKEDITOR.disableAutoInline = true;
    const customConfigs = {
      ...(this.state.useImageUploader && {
        extraPlugins: 'uploadimage,texttransform, sourcedialog',
        uploadUrl: `/api/content/uploadckeditorImage?imageType=${this.state.imageUploadType}`,
        embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
        filebrowserUploadUrl: `/api/content/uploadckeditorImage?imageType=${this.state.imageUploadType}`,
        pasteUploadFileApi: `/api/content/uploadckeditorImage?imageType=${this.state.imageUploadType}`
      })
    };
    CKEDITOR.inline(
      this.state.editorId,
      {
        ...customConfigs
      }
    );
    if (this.props.onBlur) {
      CKEDITOR.instances[this.state.editorId].on('blur', () => {
        const data = CKEDITOR.instances[this.state.editorId].getData();
        this.props.onBlur(data);
      });
    }
    console.log('configs: ', CKEDITOR.instances[this.state.editorId].config);
  }

  componentWillUnmount() {
    const ckEditor = this.getEditorInstance(this.state.editorId);
    ckEditor.destroy();
  }

  getEditorInstance(id) { return CKEDITOR.instances[id]; }

  getValue() {
    const ckEditor = this.getEditorInstance(this.state.editorId);
    return ckEditor.getData();
  }

  render() {
    const cssClasses = classNames('ckeditor homepage', {
      [this.props.className]: !isUndefined(this.props.className)
    })
    const converter = new Showdown.Converter();
    let rawMarkup = converter.makeHtml('<div></div>');

    if (this.props.data.type === 'markup' && this.props.data.propValue) {
      rawMarkup = converter.makeHtml(this.props.data.propValue.toString());
    }

    return (
      <div
        id={this.state.editorId}
        className={cssClasses}
        dangerouslySetInnerHTML={{ __html: rawMarkup }}
        contentEditable="true"
        placeholder="Enter text here..."
      />
    );
  }
}

ReactCkeditor.defaultProps = {
  className: '',
  editorId: `editor-default-${Math.floor(Math.random() * 1000)}`,
  onBlur: null,
  useCustomStyles: false,
  useImageUploader: false
};

ReactCkeditor.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    editorId: PropTypes.string,
    propValue: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  editorId: PropTypes.string,
  onBlur: PropTypes.func,
  useCustomStyles: PropTypes.bool,
  useImageUploader: PropTypes.bool
};

export default ReactCkeditor;
