<template>
  <div class="switch pointer" tabindex="1" :style="switchColor" @click="toggleChecked" @keydown.enter="toggleChecked">
    <div :id="switchId" class="d-flex position-relative">
      <div class="d-flex">
        <div :id="switchId + '_true_label'" class="labelTrue" v-if="labelTrue != ''">
          {{ labelTrue }}
        </div>

        <div :id="switchId + '_false_label'" class="labelFalse" v-if="labelFalse != ''">
          {{ labelFalse }}
        </div>
      </div>

      <div :id="switchId + '_check_box'" class="switch-box position-absolute" :class="{ checked: ownChecked }">
        <span style="visibility: hidden">T</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class Switch extends Vue {
  @Prop({ required: false, type: Boolean, default: false }) checked!: boolean;
  @Prop({ required: false, type: String, default: '' }) labelTrue!: string;
  @Prop({ required: false, type: String, default: '' }) labelFalse!: string;
  @Prop({ required: false, type: String, default: '#3a9d6daa' }) checkedColor!: string;
  @Prop({ required: false, type: String, default: '#ffffffaa' }) unCheckedColor!: string;
  @Prop({ required: false, type: String, default: '#ffffff' }) checkedTextColor!: string;
  @Prop({ required: false, type: String, default: '#000000' }) unCheckedTextColor!: string;

  ownChecked = true;
  switchId = this.generateUniqueId();
  switchWidth = 0;

  @Watch('checked')
  updateChecked(to: boolean, from: boolean) {
    this.ownChecked = to;
  }
  generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  get switchColor() {
    if (this.ownChecked) {
      return 'background-color:' + this.checkedColor;
    } else {
      return 'background-color:' + this.unCheckedColor;
    }
  }

  initSwitch() {
    const labelTrueElement = document.getElementById(this.switchId + '_true_label');
    const labelTrueWidth = parseFloat(labelTrueElement ? window.getComputedStyle(labelTrueElement).width : '0');

    const labelFalseElement = document.getElementById(this.switchId + '_false_label');
    const labelFalseWidth = parseFloat(labelFalseElement ? window.getComputedStyle(labelFalseElement).width : '0');

    this.switchWidth = Math.max(labelTrueWidth, labelFalseWidth) + 10;

    if (labelTrueElement) {
      labelTrueElement.style.width = this.switchWidth + 'px';
      labelTrueElement.style.color = this.checkedTextColor;
    }
    if (labelFalseElement) {
      labelFalseElement.style.width = this.switchWidth + 'px';
      labelFalseElement.style.color = this.unCheckedTextColor;
    }

    if (this.switchWidth < 30) this.switchWidth = 30;

    const switchElement = document.getElementById(this.switchId);

    if (switchElement) {
      switchElement.style.width = this.switchWidth + 'px';
      const slider = document.getElementById(this.switchId + '_check_box');
      if (slider) {
        if (this.ownChecked) {
          slider.style.left = this.switchWidth - 10 + 'px';
        } else {
          slider.style.left = 0 + 'px';
        }
        slider.style.background = '#333333';
        slider.style.transitionProperty = 'left';
        slider.style.transitionDuration = '0.2s';
      }
    }

    //initialize which label is shown or not depending on the checked property
    if (this.ownChecked) {
      labelTrueElement?.classList.remove('d-none');
      labelFalseElement?.classList.add('d-none');
    } else {
      labelFalseElement?.classList.remove('d-none');
      labelTrueElement?.classList.add('d-none');
    }
  }

  toggleChecked() {
    const labelTrueElement = document.getElementById(this.switchId + '_true_label');
    const labelFalseElement = document.getElementById(this.switchId + '_false_label');
    this.ownChecked = !this.ownChecked;
    const slider = document.getElementById(this.switchId + '_check_box');
    if (slider) {
      if (this.ownChecked) {
        slider.style.left = this.switchWidth - 9 + 'px';
        slider.style.background = '#333333';
        slider.style.minWidth = '10px';
        slider.style.transitionProperty = 'left';
        slider.style.transitionDuration = '0.2s';
      } else {
        slider.style.left = 0 + 'px';
      }
    }
    if (this.ownChecked) {
      labelTrueElement?.classList.remove('d-none');
      labelFalseElement?.classList.add('d-none');
    } else {
      labelFalseElement?.classList.remove('d-none');
      labelTrueElement?.classList.add('d-none');
    }
    this.$emit('update:checked', this.ownChecked);
  }

  mounted(): void {
    this.ownChecked = this.checked;
    this.initSwitch();
  }
}
</script>

<style scoped>
.switch {
  width: max-content;
  min-width: 3rem;
  color: black;
  border: 1px solid grey;
  border: 1px solid grey;
}
.switch-box.checked {
  left: 0px;
  transition-property: left;
  transition-duration: 0.2s;
}

.labelTrue {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}
.labelFalse {
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-align: end;
}

.pointer {
  cursor: pointer;
}
</style>
