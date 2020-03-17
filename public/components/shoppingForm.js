export default {
  template: `
  <div class="shoppingList">
    <form class="addItemForm" @submit.prevent="submitItem">
      <input type="text" v-model="itemName" required>
      <input type="number" v-model="quantity" required>
      <select id="categorySelect" v-model="category" required>
        <option value="food">Food</option>
        <option value="snack">Snack</option>
        <option value="other">Other</option>
      </select>
      <button id="submitButton">Add item</button>
    </form>
  </div>
  `,
  data(){
    return {
      itemName: '',
      quantity: '',
      category: ''
    }
  },
  methods: {
    submitItem(){
      let item = {
        name: this.itemName,
        quantity: this.quantity,
        category: this.category
      }
      this.$store.commit('addItem', item)
    },
    async getItems(){
      let items = await fetch('/itemsInList')
      items = await items.json()

      
    }
  }
}