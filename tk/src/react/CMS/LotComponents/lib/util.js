
// Utility functions for lotComponent components
export const onDrop = (props, acceptedFiles, componentContainerId) => {
  const { selectedLotComponent } = props.state.lotComponents;
  acceptedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      props.actions.lotComponentSetUploadImage('lotComponentsImageUpload',
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
    props.actions.lotComponentImageUploadSubmit();
  }, 2000);
};

export const handleLotComponentListEdit = (props) => (event)=> {
  const { selectedLotComponent, lotComponents } = props.state.lotComponents;
  const newLotComponentList = lotComponents.map(lotComponent => {
    return (
      lotComponent.componentContainerId === selectedLotComponent.componentContainerId
    ) ? { ...selectedLotComponent } : lotComponent
  });

  props.actions.editLotComponentList(newLotComponentList);
};

export const handleEditComponent = (props, componentId, field) => (event) => {
  const { selectedLotComponent } = props.state.lotComponents;
  const { componentData } = selectedLotComponent;
  const newComponentList = componentData.map(component => {
    return (component.componentId === componentId) ? { ...component, [field]: event } : component
  });

  props.actions.editLotComponentComponentList(selectedLotComponent, newComponentList);
  handleLotComponentListEdit(props);
  props.actions.lotComponentUpdateSubmit();
};

export const handleSelectContent = (props, componentId) => (event) => {
  const { componentData } = props.lotComponent;
  const index = componentData.findIndex(c => c.componentId === componentId);
  const selectedLotComponentData = componentData.find(c => c.componentId === componentId);
  console.log('handleSelectContent', props, componentId, index);
  // props.actions.setSelectedLotComponent(props.lotComponent);
  props.actions.setSelectedLotComponentData({ ...selectedLotComponentData, index });
};

export const handleTextChange = (props, field) => (event) => {
  const { selectedComponent, selectedLotComponent } = props.state.lotComponents;
  const { componentData } = selectedLotComponent;
  const newComponentList = componentData.map(component => {
    return (component.componentId === selectedComponent.componentId) ? { ...component, [field]: event.target.value } : component
  });

  props.actions.editLotComponentComponentList(selectedLotComponent, newComponentList);
  setTimeout(() => {
    handleLotComponentListEdit();
  }, 100);
};

export const handleLotComponentTextChange = (props, field) => (event) => {
  const { lotComponents, selectedLotComponent } = props.state.lotComponents;
  const newLotComponentsList = lotComponents.map(lotComponent => {
    return (lotComponent.componentContainerId === selectedLotComponent.componentContainerId) ? { ...lotComponent, [field]: event.target.value } : lotComponent
  });

  props.actions.editLotComponent(selectedLotComponent, field, event.target.value);
  props.actions.editLotComponentList(newLotComponentsList);
};

export const handleSaveTextChange = (props) => (event) => {
  props.actions.lotComponentUpdateSubmit();
};

export const handleActiveState = (props, componentIndex) => (event) =>{
  const { lotComponents, selectedLotComponent } = props.state.lotComponents;
  const newLotComponentsList = lotComponents.map(lotComponent => {
    return (lotComponent.componentContainerId === selectedLotComponent.componentContainerId) ? {
      ...lotComponent,
      'active': selectedLotComponent.active ? false : true
    } : lotComponent
  });

  props.actions.editLotComponent(selectedLotComponent, componentIndex, 'active', (selectedLotComponent.active ? false : true));
  props.actions.lotComponentUpdateSubmit();
};
