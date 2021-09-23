<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore();

  const pagesNav = computed(() => store.getters.pagesNav);
  const currentPage = computed(() => store.getters.currentPage);
  const totalPages = computed(() => store.getters.totalPages);


  function changePage(newPage: number) {
    store.commit('currentPage', newPage);
    store.dispatch('paginate');
  }

  function moveToPage(page: number) {
    store.commit('currentPage', page);
    store.dispatch('paginate');
  }

</script>

<template>
  <div id="pagination">
    <div 
      class="prev" 
      :class="{ inactive: currentPage < 2 }"
      @click="changePage(currentPage - 1)"
    > 
      &#60; Prev 
    </div>

    <div class="pages">
      <div 
        class="page" 
        :class="{ current: page === currentPage }"
        v-for="page in pagesNav" 
        :key="page"
        @click="moveToPage(page)"  
      >
        {{ page }}
      </div>
    </div>

    <div 
      class="next" 
      :class="{ inactive: currentPage >= totalPages }"
      @click="changePage(currentPage + 1)"
    > 
      Next >
    </div>
  </div>
</template>

<style scoped lang="scss">

  #pagination {
    display: flex;
    justify-content: space-between;
      
    background-color: $box-bg-color;
    border-radius: $border-radius;
    margin: 25px 0px;

    .prev, .next {
      transition: .3s;
      cursor: pointer;
      user-select: none;
      padding: 15px;

      &.inactive {
        transition: .3s;
        color: $second-text-color;
      }
    }

    .pages {
      display: none;
      padding: 15px 0px;
    }
    
    @include desktop {
      .pages {
        display: flex;
        user-select: none;

        .page { 
          transition: .3s;
          cursor: pointer;
          padding: 0px 6px;
          font-weight: bold;
          color: $second-text-color;

          &.current {
            transition: .3s;
            color: $text-color;
          }
        }
      }
    }

  }
    
</style>