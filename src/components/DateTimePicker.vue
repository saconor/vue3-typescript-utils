<template>
  <div class="datepicker position-relative" :id="id">
    <div class="input_field position-relative">
      <div class="mx-2" :id="id">{{ selectedDate.format('DD.MM.YYYY HH:mm') }}</div>

      <div class="position-absolute" style="right: 0px; top: 0px">
        <img
          tabindex="1"
          style="height: 1.4rem"
          class="d-inline pointer"
          @click="toggleShowDateSelector()"
          @keydown.enter="toggleShowDateSelector()"
          src="../assets/icons/calendarclock2.svg"
        />
      </div>
    </div>
    <div class="dateSelector position-absolute p-2 ml-n2" :class="{ 'd-none': !showDateSelector }">
      <!-- :max is calculated as the last day of the current month. 0 takes the last day of the chosen month while
      monthSelect already is the next month because JS counts months 0-based. Also works in Dec. -->
      <div class="d-flex">
        <input
          type="number"
          min="1"
          tabindex="1"
          :max="new Date(yearSelect, monthSelect, 0).getDate()"
          style="width: 3rem"
          v-model="daySelect"
          @change="valueChange"
        />
        <select
          tabindex="1"
          name=""
          id=""
          v-model="monthSelect"
          @change="
            valueChange();
            checkAndRepairDate();
          "
        >
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mär</option>
          <option value="4">Apr</option>
          <option value="5">Mai</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sept</option>
          <option value="10">Okt</option>
          <option value="11">Nov</option>
          <option value="12">Dez</option>
        </select>
        <select v-model="yearSelect" tabindex="1  " @change="valueChange">
          <option>2020</option>
          <option>2021</option>
        </select>
        <input
          tabindex="1"
          type="number"
          style="width: 3rem"
          min="0"
          max="23"
          class="ms-3"
          v-model="hourSelect"
          @change="valueChange"
        />
        <input
          type="number"
          tabindex="1"
          style="width: 3rem"
          min="0"
          max="59"
          v-model="minuteSelect"
          @change="valueChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// declare nameSpace datepickers
declare global {
  interface Window {
    datepickers: any;
  }
}
window.datepickers = window.datepickers || {};

@Options({})
export default class DatePicker extends Vue {
  @Prop({ required: false, type: Dayjs, default: dayjs() }) day: Dayjs = dayjs();
  @Prop({ required: false, type: Dayjs, default: dayjs() }) minDate: Dayjs = dayjs();
  @Prop({ required: false, type: Dayjs, default: dayjs() }) maxDate: Dayjs = dayjs();
  @Prop({ required: false, default: 0, type: Number }) instance = 0;
  @Prop({ required: false, default: '', type: String }) id = '';
  @Prop({ required: false, default: false, type: Boolean }) isStart = false;
  @Prop({ required: false, default: false, type: Boolean }) isEnd = false;
  @Prop({ required: false, default: false, type: Boolean }) disableFuture = false;

  showDateSelector = false;
  showTimeSelector = false;

  selectedDate: Dayjs = this.day;
  daySelect = 0;
  monthSelect = 0;
  yearSelect = 0;
  hourSelect = 0;
  minuteSelect = 0;

  readonly uniqueIdentifier: string = this.generateUniqueId();

  /**
   * Toggles the visibility of this instance and hide all other instances od Datepicker
   */
  toggleShowDateSelector(): void {
    const showDateSelectorBefore = this.showDateSelector;
    let allDatePickers: any[] = [];
    Object.keys(window.datepickers).forEach(datePickerKey => {
      allDatePickers = [...allDatePickers, ...window.datepickers[datePickerKey]];
    });
    allDatePickers.forEach(datepicker => datepicker.hide());
    this.showDateSelector = !showDateSelectorBefore;
  }

  /**
   * Formats a given number into a two digit string, i.e. 7 => 07
   * @param num : the number to format
   */
  formatIntegerTwoDigits(num: number): string {
    return parseInt(num + '').toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  /**
   * Genertes a uuidv4
   */
  generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Repair Date when if the selected date is greater than the #days in the month
   */
  checkAndRepairDate(): void {
    const maxDate = new Date(this.yearSelect, this.monthSelect, 0).getDate();
    if (this.daySelect > maxDate) {
      this.daySelect = maxDate;
    }
  }

  /**
   * Assembles the new Date and performs checks on it:
   *  @property isStart : when instance is set (daterangepicker) then check if first date is smaller than the date from the second Datepicker
   *  @property isEnd : when instance is set (daterangepicker) then check if first selected date is not greater then the one from the second instance
   *  @property disableFuture : if set, disable the selection of future Dates
   *  @emits changedate with property { date: this.selectedDate.toDate(), isoDate: this.selectedDate.toISOString() }
   *
   */
  valueChange(): void {
    let buildDate =
      `${this.formatIntegerTwoDigits(this.daySelect)}.${this.formatIntegerTwoDigits(this.monthSelect)}.${
        this.yearSelect
      }` + ` ${this.formatIntegerTwoDigits(this.hourSelect)}:${this.formatIntegerTwoDigits(this.minuteSelect)}`;

    let newDate = dayjs(buildDate, 'DD.MM.YYYY hh:mm');

    const otherInstancePickerDate = window.datepickers[this.instance]
      .filter((datepicker: any) => datepicker.id != this.uniqueIdentifier)[0]
      .getValue();
    if (this.instance > 0) {
      const currentStartDateGreaterThanEndDate = this.isStart && otherInstancePickerDate.diff(newDate, 'minute') < 0;
      const currentEndDateLowerThanStartDate = this.isEnd && newDate.diff(otherInstancePickerDate, 'minute') <= 0;

      if (currentStartDateGreaterThanEndDate || currentEndDateLowerThanStartDate) {
        newDate = otherInstancePickerDate;
      }
    }

    if (this.disableFuture && newDate.diff(dayjs(Date.now())) >= 0) {
      newDate = dayjs(Date.now());
    }

    this.selectedDate = newDate;
    this.setupSelection(newDate);

    this.$emit('changedate', { date: this.selectedDate.toDate(), isoDate: this.selectedDate.toISOString() });
  }

  /**
   * Sets up the Selection for the datepicker
   * @param date the date to setup
   */
  setupSelection(date: Dayjs): void {
    this.daySelect = date.get('date');
    this.monthSelect = date.get('month') + 1;
    this.yearSelect = date.get('year');
    this.hourSelect = date.get('hour');
    this.minuteSelect = date.get('minute');
  }

  mounted(): void {
    this.selectedDate = this.day;
    this.setupSelection(this.day);

    //registering to window
    if (this.instance > 0 && window.datepickers[this.instance] && window.datepickers[this.instance].length == 2) {
      throw new Error('Maximal two DatePickers can share same PickerId');
    }

    window.datepickers[this.instance] = window.datepickers[this.instance] ? window.datepickers[this.instance] : [];
    window.datepickers[this.instance].push({
      hide: () => {
        this.showDateSelector = false;
      },
      getValue: () => {
        return this.selectedDate;
      },
      id: this.uniqueIdentifier,
    });
  }

  beforeUnmount() {
    if (this.instance > 0) {
      window.datepickers[this.instance] = [];
    }
  }
}
</script>

<style scoped>
.input_field {
  border: 1px solid grey;
  height: 1.8rem;
  min-width: 13rem;
  max-width: 13rem;
}
.dateSelector {
  background-color: rgb(60, 62, 65);
  border: 1px solid grey;
  left: 0px;
  top: 1.8rem;
  z-index: 30;
  margin-left: -0.5rem;
  border-radius: 5px;
}
</style>
