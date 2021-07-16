<template>
  <div
    class="pt-2 pb-2 d-flex flex-column"
    :class="[displayMode]"
    v-if="ownSelection"
  >
    <div class="selectors d-flex">
      <div
        v-for="tabSelector in tabSelectors"
        :key="tabSelector.displayName"
        tabindex="1"
        class="tablink p-2 pointer"
        :class="{ active: tabSelector.value == ownSelection.value }"
        @click="tabchange(tabSelector)"
        @keydown.enter="tabchange(tabSelector)"
      >
        {{ tabSelector.displayName }}
      </div>
    </div>
    <div class="selection-field p-3">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { TabSelector } from "./tabSwitch";
import { Prop } from "vue-property-decorator";
import dayjs from "dayjs";

@Options({})
export default class TabSwitch extends Vue {
  @Prop({ required: true, type: Array as () => TabSelector[] })
  tabSelectors!: TabSelector[];
  @Prop({ required: true, type: Object as () => TabSelector })
  selectedTabSelector!: TabSelector;

  displayMode = "tab-switch-light";

  tabchange(tab: TabSelector) {
    this.ownSelection = tab;
    this.$emit("update:selectedTabSelector", tab);
  }

  ownSelection: TabSelector | null = null;
  mounted(): void {
    if (this.$attrs["dark"] != undefined) {
      this.displayMode = "tab-switch-dark";
    }

    this.ownSelection = this.selectedTabSelector;
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.tab-switch-light .tablink.active {
  background-color: rgba(194, 194, 194, 0.541);
  border-radius: 0.2rem 0.2rem 0px 0px;
}
.tab-switch-light .tablink:hover {
  background-color: rgba(194, 194, 194, 0.541);
  border-radius: 0.2rem 0.2rem 0px 0px;
}

.tab-switch-dark .tablink.active {
  background-color: rgba(66, 66, 66, 0.705);
  border-radius: 0.2rem 0.2rem 0px 0px;
}
.tab-switch-dark .tablink:hover {
  background-color: rgba(66, 66, 66, 0.705);
  border-radius: 0.2rem 0.2rem 0px 0px;
}

.tab-switch-dark {
  color: white;
}
.tab-switch-light {
  color: black;
}

.tab-switch-dark .selection-field {
  border: 2px solid rgba(66, 66, 66, 0.705);
  border-radius: 0.2rem;
}

.tab-switch-light .selection-field {
  border: 2px solid rgba(194, 194, 194, 0.541);
  border-radius: 0.2rem;
}
</style>
