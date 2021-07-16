<template>
  <div id="menuBar" class="w-100">
    <div class="menu">
      <div
        class="logo pe-3 ps-3 pt-1 pb-1"
        v-if="shown"
        @click="$router.push('/')"
      >
        Logo
      </div>

      <li
        :class="[
          'routerlink',
          'px-2',
          'pb-1',
          currentRouteName == route.name ||
          (route.name != 'Utils' && $route.path.includes(route.path))
            ? 'activeRoute'
            : '',
        ]"
        v-for="route in $router.options.routes"
        :key="route.path"
        :to="route.path"
      >
        <router-link class="d-flex px-2" :to="route.path">
          <div class="" v-if="shown">{{ route.name }}</div>
        </router-link>
      </li>
      <hr />
      <li
        class="routerlink px-2 pb-1"
        title="For links which do not trigger the vue router to change => redirect to other website"
      >
        other links
      </li>
    </div>

    <div
      class="pointer position-absolute w-100 p-2"
      style="bottom: 0px"
      @click="shown = !shown"
    >
      <img
        src="../../assets/icons/double_right.svg"
        class="pb-2"
        width="15"
        alt=""
        v-if="shown == false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class MenuHorizontal extends Vue {
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
  background-color: #3a9d6d;
  height: max-content;
}
.logo {
  font-size: 1.5rem;
}

.h-100 {
  height: 100%;
}

.menu {
  width: 100%;
  border-radius: 5px;
  box-shadow: rgb(143, 76, 76);
  display: flex;
  flex-direction: row;
}

.activeRoute {
  background-color: #999999c5;
}

.routerlink {
  list-style: none;
  font-size: 1.2rem;
  align-self: flex-end !important;
}

.routerlink:hover {
  background-color: #999999c5;
}
.routerlink a {
  text-decoration: none;
  color: inherit;
}
</style>
