import Vue from 'vue'
import Vuex from 'vuex'
import useUserStore from './user'

Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        userInfo:useUserStore,
    }
})