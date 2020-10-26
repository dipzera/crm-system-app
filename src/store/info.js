var firebase = require("firebase/app");

export default {
    state: {
        info: {},
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = {};
        },
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                /* TODO: Fix this bug */
                const uid = await dispatch("getUid");
                const info = await firebase
                    .database()
                    .ref(`/users/${uid}/info`)
                    .once("value", (info) => commit("setInfo", info.val()));
            } catch (e) {
                throw e;
            }
        },
    },
    getters: {
        info: (s) => s.info,
    },
};
