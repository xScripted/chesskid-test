<script setup>
  import { provide, onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore();

  provide('prettyDate', (rawDate) => {
    const date = new Date(parseInt(rawDate));

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  })

  onMounted(() => {
    store.dispatch('getFriendsAPI');
  })

</script>

<template>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

</template>

<style lang="scss">
  body {
    margin: 0;
  }
</style>
