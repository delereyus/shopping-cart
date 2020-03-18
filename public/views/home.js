import shoppingLists from '../../public/components/shoppingList.js'
import addItemForm from '../components/addItemForm.js'
import addListForm from '../components/addListForm.js'

export default {
  components: {
    shoppingLists,
    addItemForm,
    addListForm
  },
  template: `
  <div>
    <div id="forms">
      <div id="addItem">
        <addItemForm />
      </div>
      <div id="addList">
        <addListForm />
      </div>
    </div>
    <div id="shopLists">
        <shoppingLists />
    </div>
  </div>
  
  `,
  async beforeCreate(){
    
    // load lists and items from db on (before) startup

      let shoppingLists = await fetch('/allShoppingLists')
      shoppingLists = await shoppingLists.json()
  
      let list;

      for (let i = 0; i < shoppingLists.length; i++){
        list = {
          id: shoppingLists[i].id,
          name: shoppingLists[i].name,
          items: []
        }

        this.$store.commit('addList', list)
      }

      let items = await fetch('/shoppingItems')
      items = await items.json()

      let item;

      for (let i = 0; i < items.length; i++){
        item = {
          id: items[i].id,
          name: items[i].name,
          quantity: items[i].quantity,
          category: items[i].category,
          shopping_list: items[i].shopping_list,
        }
        this.$store.commit('addItem', item)
      }
  }
}