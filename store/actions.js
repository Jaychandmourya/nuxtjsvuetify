const actions = {
  async getCategories({ commit }) {
    const result = await this.$axios.get("http://localhost:3001/categoires");
    console.log("action");
    commit("SET_CATEGORIES", result.data);
  },
  async addcategories({ commit }, catedata) {
    const result = await this.$axios.post(
      "http://localhost:3001/categoires",
      catedata
    );
    commit("ADD_CATEGORIES", result.data);
  },
  async deleteCategories({ commit }, item) {
    await this.$axios.delete(`http://localhost:3001/categoires/${item.id}`);
    commit("DELETE_CATEGORIES", item.id);
  },
  async updatecategories({ commit }, catedata) {
    await this.$axios.put(
      `http://localhost:3001/categoires/${catedata.id}`,
      catedata
    );
    commit("UPDATE_CATEGORIES", catedata);
  },
  async getchangeStatus({ commit }, statuschangedata) {
    commit("UPDATE_STATUS", statuschangedata);
  },
};
export default actions;
