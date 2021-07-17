<template>
  <div class="home w-100">
    <div class="">
      <h3>Switch Element</h3>
      <Switch
        v-model:checked="checked"
        :labelFalse="labelFalse"
        :labelTrue="labelTrue"
        :checkedColor="checkedColor"
        :unCheckedColor="uncheckedColor"
        :checkedTextColor="checkedTextColor"
        :unCheckedTextColor="uncheckedTextColor"
      />
      <div class="props">
        <ul>
          <li>checked:boolean({{ checked }})</li>
          <li>labelTrue: string ({{ labelTrue }})</li>
          <li>labelFalse: string ({{ labelFalse }})</li>
          <li>checkedColor!: string ({{ checkedColor }});</li>
          <li>checkedTextColor!: string ({{ checkedTextColor }});</li>
          <li>unCheckedColor!: string ({{ uncheckedColor }})</li>
          <li>uncheckedTextColor!: string ({{ uncheckedTextColor }})</li>
        </ul>
      </div>

      <h3>Tab Element</h3>
      <TabSwitch
        :tabSelectors="tabselectors"
        v-model:selectedTabSelector="selectedTabSelector"
      >
        <div class="" v-if="selectedTabSelector.value == 'tab1'">test1</div>
        <div class="" v-if="selectedTabSelector.value == 'tab2'">test2</div>
      </TabSwitch>
      <div class="props">
        <ul>
          <li>enable dark mode with attribute dark</li>
          <li>tabSelectors:Tabselector[]</li>
          <li>selectedTabSelector:Tabselector ({{ selectedTabSelector }})</li>
          <li>uses <b>v-slot</b> to render inside the box</li>
        </ul>
      </div>
      <h3>DateTimePicker</h3>

      <DateTimePicker />

      <div class="props">
        can be disabled with attribute disabled
        <ul>
          <li>id</li>
          <li>enable dark mode with attribute dark</li>
          <li>minDate: Dayjs (the minimal date to select)</li>
          <li>maxDate: Dayjs (the maximal date to select)</li>
          <li>
            disableFuture:boolean (disables the selection of future dates)
          </li>
        </ul>
        <div class="">
          Wenn als <b>"DateRange Picker"</b> (2 Picker in einer Instance)
        </div>
        <ul>
          <li>id</li>
          <li>
            minDate:Dayjs used for the first selector, first selector is also
            the minimalDate for the end selector
          </li>
          <li>
            maxDate:Dayjs used for the last selector, last selector is also the
            maximalDate for the first selector
          </li>
          <li>
            disableFuture:boolean (disables the selection of future dates), only
            for the end selector
          </li>
          <li>
            instance: number sets the incance for the daterangepicker, only two
            pickers can share an instance
          </li>
          <li>
            isStart:boolean defines the start picker for an dateRangePicker
          </li>
          <li>isEnd:boolean defines the end picker for an dateRangePicker</li>
        </ul>
      </div>
    
   <h3>Cards</h3>
    <Card :cardData="cardData" :additionalCss="'width:20rem' " rounded/>
    <div class="props">
        <ul>
          <li>enable dark mode with attribute dark</li>
          <li>tabSelectors:Tabselector[]</li>
          <li>selectedTabSelector:Tabselector ({{ selectedTabSelector }})</li>
          <li>uses <b>v-slot</b> to render inside the box</li>
        </ul>
      </div>
    </div>

   
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Switch from "../components/switch/Switch.vue";
import TabSwitch from "../components/tab-switcher/TabSwitch.vue";
import { TabSelector } from "../components/tab-switcher/tabSwitch";
import DateTimePicker from "../components/dateTimePicker/DateTimePicker.vue";
import Card from "../components/cards/Card.vue";
import {CardObject, IconPlacement} from "@/components/cards/cards"

import dayjs, { Dayjs } from "dayjs";

@Options({
  components: {
    Switch,
    TabSwitch,
    DateTimePicker,
    Card,
  },
})
export default class Home extends Vue {
  //switch
  checked = false;
  labelFalse = "off";
  labelTrue = "on";
  checkedColor = "#3a9d6daa";
  uncheckedColor = "#fff";
  checkedTextColor = "#fff";
  uncheckedTextColor = "#000";

  get cardData():CardObject{
    return {
      header:{
        title:"Test Header",
        iconUrl:"https://static.thenounproject.com/png/256152-200.png",
        iconPlacement:2      },
      body:{
        text:"This is a sample text",
        additionalData:[ {key:"test",value:"test"},{key:"test2",value:"test2"},{key:"test3",value:"test3"}],
        additionalSections:[{text:"test4"},{text:"test5"}]
      },
      footer:{
        content:"footer",
        buttonTitle:"click Me",
        buttonFunktion:(value:CardObject)=>{alert("test")}
      }
    }
  }

  //tab-switch
  tabselectors: TabSelector[] = [
    { displayName: "tab1", value: "tab1" },
    { displayName: "tab2", value: "tab2" },
  ];
  selectedTabSelector = { displayName: "tab1", value: "tab1" };

  //) }) day: Dayjs = dayjs();
  minDate: Dayjs = dayjs();
  maxDate: Dayjs = dayjs();
  instance = 0;
  id = "";
  isStart = false;
  isEnd = false;
  disableFuture = false;
}
</script>

<style scoped>
.props {
  padding-bottom: 20px;
}
</style>
