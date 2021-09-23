<script setup>
  const items = [
    {
        icon: 'home-tint.svg',
        title: 'Home',
        url: '/'
    },
    {
        icon: 'play-chess-tint.svg',
        title: 'Play',
        url: '/play'
    },
    {
        icon: 'puzzles-tint.svg',
        title: 'Puzzles',
        url: '/puzzles'
    },
    {
        icon: 'learn-tint.svg',
        title: 'Learn',
        url: '/learn'
    },
    {
        icon: 'friends-tint.svg',
        title: 'Connect',
        url: '/connect'
    },
  ];
</script>

<template>
  <div id="menu">
    <ul>
      <li v-for="item in items" :key="item.title">
        <router-link :to="item.url">
          <div class="item">
            <div class="icon">
                <img :src="require('../assets/icons/' + item.icon).default">
            </div>
            <div class="title"> {{ item.title }} </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

  #menu {
    position: fixed;
    width: 100%;
    height: 55px;
    bottom: 0;
    left: 0;
    background-color: $box-bg-color;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-around;

      .router-link-active {
        .item {
          background-color: rgba(0, 0, 0, 0.2);
          height: 100%;
        }
      }

      .item {
        padding: 10px;

        .title {
          display: none;
        }
      }
    }

    @include desktop { 
      position: sticky;
      border-radius: $border-radius;
      height: fit-content;
      top: 50px; // 30px .grid-layout + 20px .grid-layout > div

      ul {
        display: block;
        padding: 10px;

        .router-link-active {
          .item {
            border-radius: 20px;
            background-color: rgba(101, 162, 68, 0.7);
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
          }
        }

        .item {
          display: flex;
          padding: 10px;
          margin: 5px;

          &:hover {
            border-radius: 20px;
            background-color: $bg-color;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
          }

          .title {
            display: block;
            color: $text-color;
            font-size: 18px;
            padding: 7px 20px;
          }
        }
      }
    }
  }

</style>