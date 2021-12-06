import { ActionContext } from "vuex"
interface StatusInterface {
    current_index: string
}
interface ChangeCurrrentIndexPayloadInterface {
    current_index: string
}
const state: StatusInterface = {
    current_index: "/"
}


// getters
const getters = {
    activeIndex: (state: StatusInterface): string => {
        return state.current_index
    },
}

// actions 定义业务逻辑
const actions = {
    changeCurrrentIndex(context: ActionContext<StatusInterface, any>, payload: ChangeCurrrentIndexPayloadInterface) {
        sessionStorage.setItem("current_index", payload.current_index)
    },
    loadCurrrentIndex(context: ActionContext<StatusInterface, any>) {
        let current_index = sessionStorage.getItem("current_index")
        if (current_index) {
            let payload = { current_index }
            context.commit('changeCurrrentIndex', payload)
        }
    }
}

// mutations 定义数据状态的操作
const mutations = {
    changeCurrrentIndex(state: StatusInterface, payload: ChangeCurrrentIndexPayloadInterface) {
        let current_index = payload.current_index
        state.current_index = current_index
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}