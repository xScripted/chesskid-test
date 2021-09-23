<script setup lang="ts">
  import Menu from '@/components/Menu.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { computed, reactive, inject, ref, watch } from 'vue'

  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const loading = computed(() => store.getters.loading);
  const friends = computed(() => store.getters.friends);
  const friend = reactive({});
  const prettyDate = inject('prettyDate');
  const id = ref(+route.params.id); // unary operator to convert string to number
  const animation = ref('slide-left'); 

  friend.value = friends.value.find( element => element.id == id.value);

  // Avoid async template errors
  watch(loading, () => {
    friend.value = friends.value.find( element => element.id == id.value);
  })

  function changeFriend(newId: number, newAnimation: string) {
    if(newId > 0 && newId <= friends.value.length) {
      animation.value = newAnimation;
      router.push('/friend/' + newId);
      id.value = newId; 
      friend.value = friends.value.find( element => element.id == id.value);
    }
  }
</script>

<template>
  <div id="friend-details">

    <div class="grid-layout">
      
      <div class="side-menu">
        <Menu></Menu>
        <div class="logo">
          <img src="../assets/logo.png" alt="ChessKid">
        </div>
      </div>

      <div class="content">
        <div class="change-friend">
          <div class="prev-friend" @click="changeFriend(id - 1, 'slide-right')"> 
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          </div>
          <h1>My Friends</h1>
          <div class="next-friend" @click="changeFriend(id + 1, 'slide-left')"> 
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </div>
        </div>

        <transition :name="animation" mode="out-in">
          <div class="friend-details" :key="friend.value" v-show="!loading.value">
            <div class="avatar">
              <img :src="friend.value.avatar" alt="Avatar">
            </div>

            <div class="name"> 
              {{ `${friend.value.firstName} ${friend.value.lastName}` }}

              <div class="admin" v-if="friend.value.isAdmin">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
            </div>

            <div class="email"> {{ friend.value.email }} </div>

            <div class="birthday"> 
              <span> Birthday: </span>
              {{ prettyDate(friend.value.birthday) }} 
            </div>

            <div class="games"> <span> Games: </span> {{ friend.value.gamesCount }} </div>

            <div class="gender"> <span> Gender: </span> {{ friend.value.gender }} </div>

            <div class="bio"> {{ friend.value.bio }} </div>
          </div>
        </transition>
        
        <div class="friend-actions">
          <div class="action chat">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
            CHAT
          </div>
          <div class="action challenge">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
            PLAY
          </div>
          <div class="action explore">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z"></path><path fill-rule="evenodd" d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z" clip-rule="evenodd"></path></svg>
            EXPLORE
          </div>

        </div>
      
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
  #friend-details {

    .change-friend {
      display: flex;
      position: relative;
      justify-content: space-between;
      margin-bottom: 20px;

      h1 {
        position: absolute;
        width: 100%;
        margin: 0;
        text-align: center;
        font-size: 20px;
        margin-top: 10px;
        user-select: none;
        z-index: -1;

        @include desktop {
          font-size: 40px;
          margin-top: 5px;
        }
      }

      .prev-friend, .next-friend {
        cursor: pointer;
        background: $box-bg-color;
        border-radius: $border-radius;
        padding: 15px;
        padding-bottom: 10px;

        &:hover {
          animation: bounce-in 0.5s;
          animation-timing-function: ease;
        }

        svg {
          width: 30px;
        }
      }
    }

    .friend-details {
      background-color: $box-bg-color;
      border-radius: $border-radius;
      padding: 20px;

      .bio, .avatar, .birthday, .gender, .games, .name, .email {
        margin: 10px;
      }

      .birthday, .games, .gender {
        span {
          color: $second-text-color;
          font-weight: bold;
        }
      }

      .avatar {
        
        img {
          width: 100%;
          border-radius: $border-radius;
          box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
        }
      }

      .name {
        display: flex;
        font-family: 'Luckiest Guy';
        font-size: 30px;
        color: $text-color;

        .admin {
          width: 30px;
          margin: 2px 15px;
          color: $link-color;
        }
      }

      .birthday {
        margin-top: 40px;

        svg {
          width: 20px;
        }
      }

      .email {
        color: $second-text-color;
      }

      @include desktop {
        display: grid;
        grid-template-columns: 150px 1fr;

        .avatar {
          grid-row: 1 / 8;
        }

        .email {
          
        }

        .name {
          height: 35px;
          margin-top: 40px;
          letter-spacing: 2px;
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        }

        .admin {
          width: 30px;
          margin: 2px 15px;
          color: $link-color;

          &:hover{
            &:after {
              position: absolute;
              content: 'Admin of ChessKid';
              background-color: $box-bg-color;
              padding: 10px;
              font-size: 14px;
              border-radius: $border-radius;
              margin: 0;
              font-family: "Trebuchet MS";
            }
          }
        }
      }
    }

    .friend-actions {
      display: flex;
      gap: 10px;

      .action {
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        margin: 40px 0px;
        max-width: 130px;
        width: 100%;
        height: 50px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
        background-color: $second-bg-color;
        border-radius: $border-radius;

        font-family: 'Luckiest Guy';
        font-size: 20px;

        transition: .3s ease;

        svg {
          width: 25px;
          margin-right: 3px;
        }

        &:hover {
          transition: .3s ease;
          transform: scaleX(90%) scaleY(110%);
          filter: brightness(105%);
        }
      }

      @include desktop {
        gap: 20px;
      }
    }
  }
</style>

