export const getBaseUrlState = (state) => state.globalState.baseUrl;

// === Press Releases ===
export const getSelectedTeamMember = (state) => state.teamPage.selectedTeamMember;
export const getSelectedTeamMemberId = (state) => state.teamPage.selectedTeamMember.makerId;

export const getTeamMemberEmail = (state) => state.teamPage.selectedTeamMember.email;
export const getTeamMemberCurrentEmail = (state) => state.teamPage.selectedTeamMember.currentEmail;
export const getTeamMembersImageUpload = (state) => state.teamPage.teamMemberImageUpload;
