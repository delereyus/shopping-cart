import Vue from '../libs/vue.esm.browser.js'
import Vuex from '../libs/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
       shoppingLists: [],
       items: []
    },
    mutations: {
      addList(state, shoppingList){
        state.shoppingLists.push(shoppingList)
      },
      addItem(state, item){
        state.items.push(item)
      },
      removeItem(state, index){
        state.items.splice(index, 1)
      },
      editItem(state, itemWithIndex){
        state.items.splice(itemWithIndex.index, 1, itemWithIndex.item)
      }
    }
})