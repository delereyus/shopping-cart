export default {
  template: `
  <form id="createList" @submit.prevent="addList">
    <input v-model="listName" type="text" placeholder="List name" required>
    <button>Add shopping list</button>
  </form>
  `,
  data() {
    return {
      listName: ''
    }
  },
  methods:{
    async addList(){
      let list = {
        name: this.listName.toString()
      }

      let result;
      try{
        result = await fetch('/shoppingLists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(list)
        })
        
        result = await result.json()
      } catch(e) {
        console.log(e)
      }

      //add received id to item and add it to store
      let newList = {
        id: result,
        name: list.name
      }

      this.$store.commit('addList', newList)
    }
  }
}