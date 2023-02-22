const mutations = {
  SET_CATEGORIES(state, value) {
    state.categoriesalldata = value;
  },
  ADD_CATEGORIES(state, value) {
    state.categoriesalldata.push(value);
  },
  DELETE_CATEGORIES(state, cateId) {
    let index = state.categoriesalldata.filter((c) => c.id != cateId);
    // console.log(index);
    state.categoriesalldata = index;
  },
  UPDATE_CATEGORIES(state, catedata) {
    const eventIndex = state.categoriesalldata.findIndex(
      (e) => e.id == catedata.id
    );
    Object.assign(state.categoriesalldata[eventIndex], catedata);
  },
  UPDATE_STATUS(state, value) {
    console.log(state);
    // state.categoriesalldata = value;
    const eventIndex = state.categoriesalldata.findIndex(
      (e) => e.id == value.id
    );
    console.log("mutation");
    state.categoriesalldata[eventIndex] = value;
    // Object.assign(state.categoriesalldata[eventIndex], value);
    // const eventIndex = state.categoriesalldata.findIndex(
    //   (e) => e.id == value.id
    // );
    // // Object.assign(state.categoriesalldata[eventIndex], value);
    // console.log(state.categoriesalldata[eventIndex], value);
  },
  // changestatus(state, catedata) {
  //   const eventIndex = state.categoriesalldata.findIndex(
  //     (e) => e.id == catedata.id
  //   );
  //   Object.assign(state.categoriesalldata[eventIndex], catedata);
  // },
};
export default mutations;
