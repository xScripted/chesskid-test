<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore();

  const paginationFriends = computed(() => store.getters.paginationFriends);
  const inputData = computed(() => store.getters.inputData);

  const prettyDate = inject('prettyDate');

  function highlight(name: string) {
    if(inputData.value.length > 0) {
      const regex = new RegExp(inputData.value,'i');
      const match = name.match(regex);

      return name.replace(regex, `<div class="highlight"> ${ match } </div>`);
    }
    return name;
  }

</script>

<template>
  <div id="friend-list">
    <h1>FRIENDS</h1>

    <transition name="fade" mode="out-in">
      <div id="friend-list-group" :key="paginationFriends">
        <div class="friend" :class="{ 'open-accordion': friend.accordion }" v-for="friend in paginationFriends" :key="friend.id">

          <div class="accordion" @click="friend.accordion = !friend.accordion">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>

          <router-link :to="'/friend/' + friend.id">
            <div class="personal-data" :key="friend.id">
              <img class="avatar" :src="friend.avatar" alt="Avatar">
              <div class="name" v-html="highlight(friend.firstName + '&nbsp;' + friend.lastName)"></div>
              <div class="stats"> <b> Birthday: </b> {{ prettyDate(friend.birthday) }}, <b> Games: </b> {{ friend.gamesCount }} </div>
            </div>
          </router-link>

          <div class="description" :class="{ show: friend.accordion }">
            {{ friend.bio }}
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<style lang="scss">

  h1 {
    font-family: 'Luckiest Guy';
    letter-spacing: 3px;
  }

  .friend {
    transition: .5s ease-in;
    position: relative;
    margin: 20px 0px;
    padding: 25px 10px;
    padding-bottom: 20px;
    height: 100%;
    max-height: 60px;
    overflow: hidden;

    background-color: $box-bg-color;
    border-radius: $border-radius;

    &.open-accordion {
      transition: .5s ease-out;
      max-height: 300px;
    }

    .accordion {
      display: none;
    }

    .personal-data {
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 1fr 1fr;

      .avatar {
        grid-row: 1 / 3;
        width: calc(100% - 10px);
        padding: 5px;
      }

      .name {
        display: flex;
        color: $link-color;
        font-size: 16px;
        margin-top: 5px;
        margin-left: 10px;

        .highlight {
          display: flex;
          background-color: orange;
        }
      }

      .stats {
        color: $second-text-color;
        margin-top: 8px;
        margin-left: 10px;
        font-size: 12px;
      }

    }

    .description {
      transition: .3s ease-in;
      margin: 10px 70px;
      opacity: 0;

      &.show {
        transition: .3s ease-out;
        opacity: 1;
      }

      font-size: 17px;
      color: $second-text-color;
    }

    @include desktop {
      padding-bottom: 25px;
      
      .personal-data {
        grid-template-columns: 60px 1fr;

        .name {
          font-size: 20px;
        }

        .stats {
          font-size: 16px;
        }
      }

      .accordion {
        display: block;
        position: absolute;
        cursor: pointer;
        width: 30px;
        height: 30px;
        top: 30px;
        right: 20px;
      }
    }
  }
    
</style>