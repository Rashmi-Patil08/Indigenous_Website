<template>
  <div>
    <h2>Persistent Item List (Local Storage)</h2>
    
    <form @submit.prevent="addItem">
      <input v-model="newItem" placeholder="Enter new item" />
      <button>Add Item</button>
    </form>
    
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>
    
    <p>Total Items: {{ totalItems }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      items: [] // Items will be loaded from localStorage on component mount
    };
  },
  computed: {
    // Count the total number of items dynamically
    totalItems() {
      return this.items.length;
    }
  },
  mounted() {
    // Load items from localStorage when the component is mounted
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  },
  methods: {
    // Add new item and save to localStorage
    addItem() {
      if (this.newItem.trim() !== '') {
        this.items.push(this.newItem);
        this.newItem = '';
        localStorage.setItem('items', JSON.stringify(this.items)); // Save to localStorage
      }
    },
    // Remove item and update localStorage
    removeItem(index) {
      this.items.splice(index, 1); // Remove item from array
      localStorage.setItem('items', JSON.stringify(this.items)); // Update localStorage
    }
  }
};
</script>

<style scoped>
/* Basic styling to make the form look neat */
form {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}
</style>
