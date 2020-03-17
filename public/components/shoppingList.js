export default {
  template: `
  <div class="shoppingList">
    {{ list }}
    <button type="button" @click="getItems">click</button>
  </div>
  `,
  data(){
    return {
      
    }
  },
  computed:{
    list(){
      return this.$store.state.shoppingLists
    }
  },
  methods: {
    async getItems(){
      let items = await fetch('/itemsInList') 
      items = await items.json()

      for (let i = 0; i < items.length; i++){
        this.$store.commit('addItem', items[i])
      }
    }
  }
}