import React from 'react';
import serialize from 'form-serialize';
import PhillipsTypeahead from '../../PhillipsTypeahead/PhillipsTypeahead.container';

const EditTab = props => (
  <div className="edit-tab">
    <button onClick={props.handleEdit}>Edit</button>
    <button onClick={props.openDelete}>Delete</button>
  </div>
);

const displayOption = ({ makerName }) => makerName;

const ItemEditorForm = (props) => {
  let children;
  const customClasses = {
    'results': 'cms'
  };
  const saveMaker = (e) => {
    e.preventDefault();
    const saveOnServer = (
      props.id !== 0
      || (props.id === 0 && props.makerCarouselId !== 0)
    );
    const formData = serialize(e.target, { hash: true });
    const args = [
      props.id,
      props.keyId,
      props.isNew,
      props.makerCarouselId,
      saveOnServer,
      { ...props, ...formData }
    ];
    props.saveMaker(...args);
  };
  const deleteMaker = (e) => {
    e.preventDefault();
    props.deleteMaker(props.id, props.makerCarouselId);
  };
  if (props.editor.status === 'edit') {
    children = (
      <form onSubmit={saveMaker}>
        <PhillipsTypeahead
          displayOption={displayOption}
          filterOption="makerName"
          maxVisible={10}
          name="makerId"
          hiddenValue={props.makerId}
          hiddenName="makerId"
          value={props.makerName}
          onOptionSelected="setMaker"
          customClasses={customClasses}
        />
        <input
          type="hidden"
          name="active"
          value="true"
        />
        <input
          defaultValue={props.saleNumber}
          name="saleNumber"
          type="text"
          placeholder="Sale Number"
        />
        <input
          defaultValue={props.lotNumber}
          name="lotNumber"
          type="text"
          placeholder="Lot Number"
        />
        <input type="submit" value="Done" />
      </form>
    );
  } else if (props.editor.status === 'delete') {
    children = (
      <p>Are you sure you want to delete {props.name} from this list? <button onClick={deleteMaker}>Yes</button></p>
    );
  }
  return (
    <div className="maker-editor">
      {children}
    </div>
  );
};


const MakerEditor = (props) => {
  const handleClick = () => {
    props.manageMaker(props.keyId, props.makerCarouselId);
  };
  const openDelete = () => {
    props.openDelete(props.keyId, props.makerCarouselId);
  };
  return (
    <div className="maker-editor-wrapper col-xs-12">
      {props.env === 'cms'
        ? <EditTab handleEdit={handleClick} openDelete={openDelete} />
        : null
      }
      {(props.editor.status !== 'closed'
        && props.editor.keyId === props.keyId
        && props.editor.carouselId === props.makerCarouselId)
        ? <ItemEditorForm {...props} />
        : null
      }
    </div>
  );
};

export default MakerEditor;
