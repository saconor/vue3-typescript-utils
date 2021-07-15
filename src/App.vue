<template>
 <div id="contentDividerHorizontal">
    <div id="menuSidebarHorizontal">
      <MenuHorizontal />
    </div>
    <div id="contendBar">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
//Farben:  color: #42b983;
//Farben:   color: #2c3e50;
// color: rgb(7, 187, 88);

import { Options, Vue } from 'vue-class-component';
import MenuVertical from '@/components/menu/MenuVertical.vue';
import MenuHorizontal from '@/components/menu/MenuHorizontal.vue';

@Options({
  components: { MenuHorizontal,MenuVertical },
})
export default class App extends Vue {}
</script>

<style>

@import url('~bootstrap/dist/css/bootstrap.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v92/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

#contentDividerVertical {
  width: 100%;
  height: 100%;
  flex: 1;
  flex-basis: 1;
  flex-direction: row;
  display: flex;
  position: fixed;
  overflow: hidden;
}
#contentDividerHorizontal {
  width: 100%;
  height: 100%;
  flex: 1;
  flex-basis: 1;
  flex-direction: column;
  display: flex;
  position: fixed;
  overflow: hidden;
}
#contendBar {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 1rem;
  text-align: initial;
  overflow: auto;
}
#menuSidebarHorizontal {
  display: flex;
}
#menuSidebarVertical {
  height: 100%;
  display: flex;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
