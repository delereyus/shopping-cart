export default {
  template: `
  <div id="formContainer">
    <form class="addItemForm" @submit.prevent="submitItem">
      <label for="itemName">Item name</label>
      <input type="text" v-model="itemName" placeholder="Item name" name="itemName" required>
      <label for="quantity">Quantity</label>
      <input type="number" v-model="quantity" placeholder="Quantity" name="quantity" min="1" required>
      <label for="categorySelect">Category</label>
      <select class="categorySelect" v-model="category" name="categorySelect" required>
        <option value="food">Food</option>
        <option value="snack">Snack</option>
        <option value="other">Other</option>
      </select>
      <label for="listSelect">Shopping List</label>
      <select class="listSelect" v-model="list" name="listSelect" required>
        <option v-for="list in lists">
          {{ list.name }}
        </option>
      </select>
      <button class="submitButton">Add item</button>
    </form>
  </div>
  `,
  data(){
    return {
      itemName: '',
      quantity: '',
      category: '',
      list: ''
    }
  },
  computed:{
    lists(){
      return this.$store.state.shoppingLists
    }
  },
  methods: {
    async submitItem(){

      let listId;

      for (let i = 0; i < this.$store.state.shoppingLists.length; i++){
        if (this.$store.state.shoppingLists[i].name === this.list){
          listId = this.$store.state.shoppingLists[i].id
          break;
        }
      }

      // toString to prevent SQL injection
      let item = {
        name: this.itemName.toString(),
        quantity: this.quantity,
        category: this.category,
        shopping_list: listId
      }

      let result;
      try{
        result = await fetch('/shoppingItem', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })

      result = await result.json()
      } catch(e){
        console.log(e)
      }

      //fetch item from db using received id then add to store
      let createdItem = await fetch('/shoppingItemById/' + result.id)
      createdItem = await createdItem.json()

      this.$store.commit('addItem', createdItem)

      this.itemName = ''
      this.quantity = ''
      this.category = ''
      this.list = ''
    }
  }
}
