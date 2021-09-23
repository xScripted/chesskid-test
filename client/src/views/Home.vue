<script setup>
  import Menu from '@/components/Menu.vue'
  import FriendList from '@/components/FriendList.vue'
  import FilterFriends from '@/components/FilterFriends.vue'
  import PaginationNav from '@/components/PaginationNav.vue'
  import { onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore();

  onMounted(() => {
    //Reset filter
    store.commit('inputData', '');
  })

</script>

<template>
  <div id="home">

    <div class="grid-layout">

      <div>
        <Menu></Menu>
        <div class="logo">
          <img src="../assets/logo.png" alt="ChessKid">
        </div>
      </div>

      <div>
        <FilterFriends></FilterFriends>
        <FriendList></FriendList>
        <PaginationNav></PaginationNav>
      </div>

    </div>

  </div>
</template>

<style lang="scss">

  body {
    background-image: url('../assets/background.png');
    background-attachment: fixed;
    background-size: cover;
  }

  #home {
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100vh;
  }

  .logo {
    &:hover {    
      animation: shake 0.1s ease-in-out 0.1s infinite alternate;
      -webkit-animation: shake 0.1s ease-in-out 0.1s infinite alternate;
    }
  }
</style>
