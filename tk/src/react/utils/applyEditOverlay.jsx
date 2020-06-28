import React from 'react';
import EditOverlay from '../CMS/EditOverlay';

const applyEditOverlay = (editable, Component, elementType, hideDelete) => props => (
  editable ? (
    <EditOverlay
      className="edit-container"
      key={props.key}
      elementProps={props}
      elementType={elementType}
      hideDelete={hideDelete}
    >

      <Component {...props} editable={editable}/>
    </EditOverlay>
  )
  : (
    <Component {...props} />
  )
);

export default applyEditOverlay;
