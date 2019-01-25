import { Commit } from 'vuex'
import user from '../../api/user'
import * as types from '../mutation-types'
import { ActionContextBasic } from '../index'
import UserType from '../../type/user'


export interface State {
    all: any[]
}

// initial state
const initState = {
    all: [],
}

//获取到state新值，重新渲染vue component
const getters = {
    allUsers: (state: State) => state.all,
}

//dispatch触发相关action的操作
const actions = {
    getUsersAction(context: ActionContextBasic) {
        user.getUsers((users: any[]) => {
            context.commit(types.RECEIVE_USERS, users)
        });
    },
    deleteUserAction(context: ActionContextBasic, user: any) {
        context.commit(types.DELETE_USER, user)
    },
    addUserAction(context: ActionContextBasic, user: any) {
        if (user.id) {
            context.commit(types.UPDATE_USER, user)
        } else {
            context.commit(types.ADD_USER, user)
        }
    }
}

//通过commit方法调用mutation修改state
const mutations = {
    [types.RECEIVE_USERS](state: State, users: any) {
        state.all = users
    },
    [types.ADD_USER](state: State, user: any) {
        if (!user.id) {
            let length = state.all.length
            user.id = state.all[length - 1].id + 1
        }
        state.all.push(user)
    },
    [types.UPDATE_USER](state: State, user: any) {
        state.all.forEach(element => {
            console.log(element.id);
            if (element.id === user.id) {
                element.name = user.name
                element.tel = user.tel
                element.email = user.email
                element.desc = user.desc
                element.status = user.status
            }
        });

    },
    [types.DELETE_USER](state: State, user: any) {
        // state.all = user
        console.log("deleteUser:" + user.id);
        let index = state.all.findIndex(ele => ele.id === user.id)
        state.all.splice(index, 1);
        console.log(state.all);
    }
}

export default {
    state: initState,
    getters,
    actions,
    mutations,
}