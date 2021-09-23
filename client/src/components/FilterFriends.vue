<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const inputData = ref('');

function filterFriends() {
  store.commit('inputData', inputData);
  store.dispatch('filterFriends');

  // Reset pagination when there is a new filter data
  store.commit('currentPage', 1);
  store.dispatch('paginate');
}

</script>

<template>
  <div id="filterFriends">
    <div class="filter-icon">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
    </div>
    <div class="filter-input">
      <input 
        type="text" 
        placeholder="Filter friends..." 
        @input="filterFriends"
        v-model="inputData"
      >
    </div>
  </div>  
</template>

<style scoped lang="scss">

  #filterFriends {
    position: relative;
    display: flex;
    padding: 12px;
    padding-bottom: 7px;
    background-color: $box-bg-color;
    border-radius: $border-radius;

    .filter-icon {
      transition: .3s ease-in-out;

      svg {
        width: 25px;
        height: 25px;
      }

    }

    &:hover {
      .filter-icon {
        transition: .3s ease-in-out;
        transform: rotateZ(90deg) translateX(-2px) translateY(-5px);
      }
    }

    .filter-input {
      position: relative;
      width: 100%;
      margin-left: 15px;
      margin-top: 3px;

      input {
        border: 0;
        outline: none;
        background-color: transparent;
        color: $text-color;
        font-size: 18px;

        &::placeholder {
          color: $second-text-color;
        }
      }
    }
    
  }

</style>