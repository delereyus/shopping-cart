import Vue from '../libs/vue.esm.browser.js'
import Vuex from '../libs/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
       shoppingLists: [],
       currentListIndex: ''
    },
    mutations: {
      createShoppingList(state, shoppingList){
        state.shoppingLists.push(shoppingList)
      },
      addItemToList(state, listIndex, item){
        state.shoppingLists[listIndex].push(item)
      },
      setCurrentShoppingList(state, index){
        state.currentListIndex = index
      }
    }
})