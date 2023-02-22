import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);
// export const strict = false;
export default () =>
  new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    strict: false,
  });
// export const strict = false;
