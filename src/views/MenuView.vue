<template>
  <div class="d-flex flex-column w-100">
    <h3>Styles</h3>
    <div class="">To change the Menue Style, adapt the <b>App.vue</b> as follows</div>
    <div class="pb-3"> <b @click="$router.push('/router')" style="cursor:pointer"> Routercheck</b> to add Menu Entries</div>
    <h4>Horizontal</h4>
    <pre>
     &lt;div id="<b>contentDividerHorizontal</b>"&gt;
        &lt;div id="<b>menuSidebarHorizontal</b>"&gt;
          &lt;<b>MenuHorizontal</b> /&gt;
        &lt;/div>
        &lt;div id="contendBar"&gt;
          &lt;router-view /&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    </pre>
    <h4>Vertical</h4>
    <pre>
       &lt;div id="<b>contentDividerVertical</b>"&gt;
        &lt;div id="<b>menuSidebarVertical</b>"&gt;
          &lt;<b>MenuVertical</b> /&gt;
        &lt;/div>
        &lt;div id="contendBar"&gt;
          &lt;router-view /&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    </pre>
  </div>
</template>