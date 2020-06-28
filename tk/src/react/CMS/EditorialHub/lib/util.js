// Utility functions for editorial components
export const onDrop = (props, acceptedFiles, componentContainerId) => {
  const { selectedEditorial } = props.state.editorials;
  acceptedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      props.actions.editorialsSetUploadImage('editorialsImageUpload',
        {
          name: file.name,
          preview: file.preview,
          file: file,
          componentContainerId: componentContainerId
        }
      );
    }
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsBinaryString(file);
  });

  setTimeout(() => {
    props.actions.editorialImageUploadSubmit();
  }, 2000);
};

export const handleEditorialListEdit = (props) => {
  const { selectedEditorial, editorials } = props.state.editorials;
  const newEditorialList = editorials.map(editorial => {
    return (
      editorial.componentContainerId === selectedEditorial.componentContainerId
    ) ? { ...selectedEditorial } : editorial
  });

  props.actions.editEditorialList(newEditorialList);
};

export const handleEditComponent = (props, componentId, field) => (event) => {
  const value = field === 'htmlCaption' ? event : event.target.value;
  const { selectedEditorial } = props.state.editorials;
  const { componentData } = selectedEditorial;
  const newComponentList = componentData.map(component => {
    return (component.componentId === componentId) ? { ...component, [field]: value } : component
  });

  props.actions.editEditorialComponentList(selectedEditorial, newComponentList);
  handleEditorialListEdit(props);
  props.actions.editorialUpdateSubmit();
};

export const handleSelectContent = (props, componentId) => (event) => {
  const { componentData } = props.editorial;
  const selectedComponent = componentData.find(c => c.componentId === componentId);
  props.actions.setSelectedComponent(selectedComponent);
};

export const handleTextChange = (props, field) => (event) => {
  const { selectedComponent, selectedEditorial } = props.state.editorials;
  const { componentData } = selectedEditorial;
  const newComponentList = componentData.map(component => {
    return (component.componentId === selectedComponent.componentId) ? { ...component, [field]: event.target.value } : component
  });

  props.actions.editEditorialComponentList(selectedEditorial, newComponentList);
  setTimeout(() => {
    handleEditorialListEdit(props);
  }, 100);
};

export const handleEditorialTextChange = (props, field) => (event) => {
  const { editorials, selectedEditorial } = props.state.editorials;
  const newEditorialsList = editorials.map(editorial => {
    return (editorial.componentContainerId === selectedEditorial.componentContainerId) ? { ...editorial, [field]: event.target.value } : editorial
  });

  props.actions.editEditorial(selectedEditorial, field, event.target.value);
  props.actions.editEditorialList(newEditorialsList);
};

export const handleSaveTextChange = (props) => (event) => {
  props.actions.editorialUpdateSubmit();
};

export const handleActiveState = (props, editorialIndex) => (event) =>{
  const { editorials, selectedEditorial } = props.state.editorials;
  const newEditorialsList = editorials.map(editorial => {
    return (editorial.componentContainerId === selectedEditorial.componentContainerId) ? {
      ...editorial,
      'active': selectedEditorial.active ? false : true
    } : editorial
  });

  props.actions.editEditorial(selectedEditorial, 'active', (selectedEditorial.active ? false : true));
  props.actions.editorialUpdateSubmit();
};
