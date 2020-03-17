import shoppingForm from '../../public/components/shoppingForm.js'
import shoppingList from '../../public/components/shoppingList.js'

export default {
  components: {
    shoppingForm,
    shoppingList
  },
  template: `
  <div>
    <shoppingForm />
    <shoppingList />
  </div>
  `,
  async created(){
    let shoppingLists = await fetch('/allShoppingLists')
    shoppingLists = await shoppingLists.json()

    for (let i = 0; i < shoppingLists.length; i++){
      this.$store.commit('createShoppingList', shoppingLists[i])
    }
  }
}