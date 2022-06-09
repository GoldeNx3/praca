import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from '../plugins/vuetify'
import VueToastr from "vue-toastr";
import VueMeta from 'vue-meta'
import '../../../node_modules/nprogress/nprogress.css'
import wysiwyg from "vue-wysiwyg";
import "../../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
import plLocale from "moment/locale/pl";
import * as VeeValidate from 'vee-validate';

Vue.use(VeeValidate, { inject: false });
Vue.config.productionTip = false;
Vue.use(VueToastr);
Vue.use(VueMeta);

const moment = require('moment')
require('moment/locale/pl')

Vue.use(require("moment"));
Vue.use(wysiwyg, {
    forcePlainTextOnPaste: true,
    innerHeight: "1000px",
    image: {
        uploadURL: "/api/admin/wysiwyg/uploadImage"
    }
});

Vue.component('VCheckBox', require('./components/inputs/VCheckBox').default);
Vue.component('VSelectWithValidation', require('./components/inputs/VSelectWithValidation').default);
Vue.component('VSelectUserWithValidation', require('./components/inputs/VSelectUserWithValidation').default);
Vue.component('VSelectModeratorWithValidation', require('./components/inputs/VSelectModeratorWithValidation').default);
Vue.component('VSelectLocalizationWithValidation', require('./components/inputs/VSelectLocalizationWithValidation').default);
Vue.component('VSelectParticipantWithValidation', require('./components/inputs/VSelectParticipantWithValidation').default);
Vue.component('VSelectWeekDayWithValidation', require('./components/inputs/VSelectWeekDayWithValidation').default);
Vue.component('VSelectLevelWithValidation', require('./components/inputs/VSelectLevelWithValidation').default);
Vue.component('VInputWithValidation', require('./components/inputs/VInputWithValidation').default);
Vue.component('VTextareaWithValidation', require('./components/inputs/VTextareaWithValidation').default);
Vue.component('VSelectObjectWithValidation', require('./components/inputs/VSelectObjectWithValidation').default);
Vue.component('VSelectCategory', require('./components/SelectCategory.vue').default);
Vue.component('Table', require('./components/Table/Table').default);
Vue.component('SimpleTable', require('./components/SimpleTable/SimpleTable').default);

Vue.filter('capitalize', function (value) {
    if (!value)
        return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
