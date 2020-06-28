export const getBaseUrlState = (state) => state.globalState.baseUrl

// === CATALOGUE SUBSCRIPTIONS ===
export const getReorderedDepartments = (state) => state.catalogueSubscriptions.catalogueSubscriptions.map(dept => ({ 'order': dept.order, 'departmentID': dept.departmentID }))
export const getSelectedDepartment = (state) => state.catalogueSubscriptions.selectedDepartment
