import Vue from "vue";
import Vuex from "vuex";

import * as auth from "../store/modules/Auth";
import * as user from "../store/modules/User";
import * as localization from "../store/modules/Localization";
import * as util from "../store/modules/Util";
import * as template from "../store/modules/Template";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,

    modules: {
        auth,
        user,
        localization,
        util,
        template,
    },
    methods: {
        info() {
        }
    }
});
