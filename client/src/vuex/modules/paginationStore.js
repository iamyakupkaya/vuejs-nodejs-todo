export default {
  namespaced: true,
  state: {
    activeCurrentPage: 1,
    doneCurrentPage: 1,
    //----------
    activePresentPage: 1,
    donePresentPage: 1,
    //----------
    activePaginationCount: 0,
    donePaginationCount: 0,
  },
  mutations: {
    changeActivePage(state, currentPage) {
      state.activeCurrentPage += currentPage;
    },
    changeDonePage(state, currentPage) {
      state.doneCurrentPage += currentPage;
    },
    changeActivePresentPage(state, activePresentPage) {
      console.log("ACTİVE PAGE", activePresentPage);
      state.activeCurrentPage = activePresentPage;
    },
    changeDonePresentPage(state, donePresentPage) {
      state.doneCurrentPage = donePresentPage;
    },
    changeActivePaginationCount(state, activePaginationCount) {
      console.log("TODOLIST ŞİMDİLİK", activePaginationCount);
      state.activePaginationCount = activePaginationCount;
    },
    changeDonePaginationCount(state, donePaginationCount) {
      state.donePaginationCount = donePaginationCount;
    },
  },
  getters: {
    activeCurrentPage: (state) => state.activeCurrentPage,
    doneCurrentPage: (state) => state.doneCurrentPage,
    activePresentPage: (state) => state.activePresentPage,
    donePresentPage: (state) => state.donePresentPage,
    activePaginationCount: (state) => state.activePaginationCount,
    donePaginationCount: (state) => state.donePaginationCount,
  },
};
