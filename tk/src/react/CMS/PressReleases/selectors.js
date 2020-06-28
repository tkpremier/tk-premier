export const getBaseUrlState = (state) => state.globalState.baseUrl

// === Press Releases ===
export const getSelectedPressRelease = (state) => state.pressReleases.selectedPressRelease
export const getSelectedPressReleaseId = (state) => state.pressReleases.selectedPressRelease.pressReleaseId
export const getSelectedPressReleaseTitle = (state) => state.pressReleases.selectedPressRelease.title
export const getPressReleasePDF = (state) => state.pressReleases.pressReleasePDF
