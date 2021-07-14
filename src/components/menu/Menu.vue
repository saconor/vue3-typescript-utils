<template>
  <div id="menuBar" class="h-100">
    <div class="menu d-flex flex-column">
      <div class="">

        <div class="" v-if="shown">Logo Big</div>
        <div class="" v-else>Logo Small</div>

        
        <!-- <img src="../../assets/icons/syneon_logo_small.svg" alt="" /> -->

        <hr style="width: 90%" />
      </div>

      <div class="position-relative h-100 d-flex flex-column">
        <div class="">
          <li
            :class="[
              'routerlink',
              'p-3',
              currentRouteName == route.name || (route.name != 'Home' && $route.path.includes(route.path))
                ? 'activeRoute'
                : '',
            ]"
            v-for="route in $router.options.routes"
            :key="route.path"
            :to="route.path"
          >
            <router-link class="d-flex ps-1" :to="route.path">
              <div :title="route.name">
                <span style="font-size: 2rem" class="material-icons"> {{ route.meta.icon }} </span>
              </div>
              <div class="ms-2 align-self-center" v-if="shown">{{ route.name }}</div>
            </router-link>
          </li>
          <hr />
         <li>other links</li>
        </div>

        <div class="pointer position-absolute w-100 p-2" style="bottom: 0px" @click="shown = !shown">
          <img
            src="../../assets/icons/double_right.svg"
            class="pb-2"
            width="15"
            alt=""
            v-if="shown == false"
          />
          <div class="d-flex justify-content-center" v-else>
            <img
              src="../../assets/icons/double_left.svg"
              class="pb-2"
              width="15"
              alt=""
            />
            collapse
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({})
export default class Menu extends Vue {
  shown = true;
  //Hack exisitiert im router immer, aber typescript weis das nicht
  get currentRouteName(): any {
    return this.$route.name;
  }

  openSite(link: string): void {
    window.open(link);
  }
}
</script>
<style scoped>
#menuBar {
  display: flex;
  width: max-content;
  background-color: #3a9d6d;
}

.menu {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  box-shadow: rgb(143, 76, 76);
}

.activeRoute {
  background-color: #999999c5;
}

.routerlink {
  list-style: none;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.routerlink:hover {
  background-color: #999999c5;
}
.routerlink a {
  text-decoration: none;
  color: inherit;
}
</style>
