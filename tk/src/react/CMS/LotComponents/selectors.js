export const getBaseUrlState = (state) => state.globalState.baseUrl;

// === Auctions ===
export const getSelectedAuctionSaleNumber = (state) => state.lotComponents.selectedAuction.saleNumber;

// === Lots ===
export const getSelectedLotObjectNumber = (state) => state.lotComponents.selectedLot.objectNumber;

// === Lot Components ===
export const getLotComponents = (state) => state.lotComponents.lotComponents;
export const getSelectedLotComponent = (state) => state.lotComponents.selectedLotComponent;
export const getSelectedLotComponentId = (state) => state.lotComponents.selectedLotComponent.componentContainerId;
export const getSelectedLotComponentTitle = (state) => state.lotComponents.selectedLotComponent.title;
export const getLotComponentsImageUpload = (state) => state.lotComponents.lotComponentsImageUpload;

export const getSelectedLotComponentIndex = (state) => state.lotComponents.selectedLotComponent.displayOrder - 1;
export const getSelectedLotComponentDataIndex = (state) => state.lotComponents.selectedLotComponentData.index;

export const getPreviouslySelectedComponentId = (state) => state.lotComponents.previouslySelectedComponentId;
