import addItemForm from './addItemForm.js'

export default {
  components: {
    addItemForm
  },
  template: `
  <div>
    <div class="shoppingListContainer">
      <div class="shoppingList" v-for="list in lists" :key="list.name + list.id">
        <h3 class="listHeader">{{ list.name }}</h3>
        <div class="itemCard" v-for="(item, itemIndex) in items" :key="item.name + item.id">
          <!-- loop over and render items if they belong to the list -->
          <div class="itemAndButton" v-if="list.id === item.shopping_list">
            <p class="itemName">{{ item.name }}</p>
            <p class="itemQuantity">x{{ item.quantity }}</p>
            <p class="itemRemove" @click="removeItem(item.id, itemIndex)">🗑️</p>
            <p class="editItem" @click="edit(item.id)">🔧</p>

            <!-- Needed to duplicate this form because submit method could not be overriden (to my knowledge)-->
            <form class="addItemForm" v-if="editing === item.id" @submit.prevent="editItem(item.id, itemIndex)">
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
              <select class="listSelect" v-model="shopList" name="listSelect" required>
                <option v-for="list in lists">
                  {{ list.name }}
                </option>
              </select>
              <button class="submitButton">Edit item</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data(){
    return {
      editing: '',
      itemName: '',
      quantity: '',
      category: '',
      shopList: ''
    }
  },
  computed:{
    lists(){
      return this.$store.state.shoppingLists
    },
    items(){
      return this.$store.state.items
    }
  },
  methods:{
    removeItem(itemId, itemIndex){
      fetch('/shoppingItem/' + itemId,{
        method: 'DELETE',
      })

      this.$store.commit('removeItem', itemIndex)
    },

    edit(itemId){
      //set "editing = true" to the specific item
      if (this.editing === '') {
        this.editing = itemId
      } else this.editing = ''
    },

    async editItem(itemId, itemIndex){
      let listId;

      for (let i = 0; i < this.$store.state.shoppingLists.length; i++){
        if (this.$store.state.shoppingLists[i].name === this.shopList){
          listId = this.$store.state.shoppingLists[i].id
          break;
        }
      }

      // toString to prevent SQL injection
      let item = {
        id: itemId,
        name: this.itemName.toString(),
        quantity: this.quantity,
        category: this.category,
        shopping_list: listId
      }

      try {
        await fetch('/shoppingItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })

        let itemWithIndex = {
          item: item,
          index: itemIndex
        }

        this.$store.commit('editItem', itemWithIndex)
      } catch(e){
        console.log(e)
      }

      this.itemName = ''
      this.quantity = ''
      this.category = ''
      this.shopList = ''
      this.editing = ''
    }
  }
}