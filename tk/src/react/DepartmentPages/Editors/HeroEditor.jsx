import React, { PureComponent } from 'react';
import classNames from 'classnames';
import DeptHero from '../DeptHero';
import ReactCkeditor from '../../components/reactckeditor';

class Editor extends PureComponent {
  setSubmitLabel() {
    return this.props.pending ? 'Saving' : 'Save';
  }

  render() {
    const formClassNames = classNames(
      `${this.props.className}-form`,
      { 'show': this.props.editing }
    );
    const editorClassNames = classNames(
      this.props.className,
      { 'show': this.props.editing }
    );
    const submitClass = classNames({
      'pending' : this.props.pending
    });
    return (
      <div className={editorClassNames}>
        {this.props.children}
        <section
          id="banner-form"
        >
          <form
            className={formClassNames}
            ref='form'
            onSubmit={(e) => this.props.handleSubmit(e, this.refs.htmlEditor, this.refs.imageInput, this.props.imagePath, this.props.departmentId)}
          >
            <div className="image-picker">
              <p>Upload Image</p>
              <label htmlFor="bannerImg">
                <input
                  type="file"
                  accept="image/*"
                  name="bannerImg"
                  onChange={this.props.handleEdit}
                  ref="imageInput"
                  id="bannerImg"
                />
              </label>
            </div>
            <div className="content-body container">
              <section className="dept-cta row">
                <div className="col-xs-12 col-sm-8 caption">
                  <ReactCkeditor
                    data={{
                      editorId: "editor-description",
                      type: 'markup',
                      propValue: this.props.description
                    }}
                    editorId="editor-description"
                    ref='htmlEditor'
                  />
                </div>
                <div className="col-xs-12 col-sm-4 cta">
                  <label htmlFor="link">CTA Link</label>
                  <input
                    type="text"
                    name="link"
                    defaultValue={this.props.link}
                    placeholder="Enter CTA Link"
                  />
                  <label htmlFor="buttonText">CTA Label</label>
                  <input
                    type="text"
                    name="buttonText"
                    defaultValue={this.props.buttonText}
                    placeholder="Enter CTA Label"
                  />
                </div>
              </section>
            </div>
            {/* show Edit or Save & Cancel Btn */}
            {this.props.editing ?
              (<div>
                <input type="submit" className={submitClass} value={this.setSubmitLabel()} />
                <button
                  onClick={(e) => { this.props.handleEdit(e, this.props.departmentId); }}
                  value="cancel"
                >Cancel</button>
              </div>) :
              <button
                onClick={(e) => { this.props.handleEdit(e, this.props.departmentId); }}
                value="edit"
              >Edit</button>
            }
          </form>
        </section>
      </div>
    );
  }
};

const attachEditor = WrappedComponent => props => (
  <Editor className="edit-banner" { ...props } >
    <WrappedComponent {...props} />
  </Editor>
);

export default attachEditor(DeptHero);
