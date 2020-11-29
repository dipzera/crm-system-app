import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter.js";
import currencyFilter from "@/filters/currency.filter.js";
import messagePlugin from "@/utils/message.plugin.js";
import Loader from "@/components/app/Loader";
import "materialize-css/dist/js/materialize.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.use(messagePlugin);
Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);
Vue.component("Loader", Loader);
firebase.initializeApp({
    apiKey: "AIzaSyBfF1sZ5qrYQhCfkGl2U5Y5cZhnBLfCscg",
    authDomain: "vue-crud-app-13992.firebaseapp.com",
    databaseURL: "https://vue-crud-app-13992.firebaseio.com",
    projectId: "vue-crud-app-13992",
    storageBucket: "vue-crud-app-13992.appspot.com",
    messagingSenderId: "460721513052",
    appId: "1:460721513052:web:4c53e8425f31497ab3bc99",
});
let app;
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");
    }
});
