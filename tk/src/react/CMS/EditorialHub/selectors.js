export const getBaseUrlState = (state) => state.globalState.baseUrl;

// === Editorials ===
export const getEditorials = (state) => state.editorials.editorials;
export const getSelectedEditorial = (state) => state.editorials.selectedEditorial;
export const getSelectedEditorialId = (state) => state.editorials.selectedEditorial.componentContainerId;
export const getSelectedEditorialTitle = (state) => state.editorials.selectedEditorial.title;
export const getEditorialsImageUpload = (state) => state.editorials.editorialsImageUpload;

export const getSelectedComponent = (state) => state.editorials.selectedComponent;
export const getSelectedComponentId = (state) => state.editorials.selectedComponent.componentId;
