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
        async updateInfo({ dispatch, commit, getters }, toUpdate) {
            try {
                const uid = await dispatch("getUid");
                const updateData = { ...getters.info, ...toUpdate };
                await firebase
                    .database()
                    .ref(`/users/${uid}/info`)
                    .update(updateData);
                commit("setInfo", updateData);
            } catch (e) {
                commit("setError", e);
                throw e;
            }
        },
        async fetchInfo({ dispatch, commit }) {
            try {
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
