<template>
  <div
    class="cardElement"
    :id="id"
    :class="{ dark: useDarkMode, round: $attrs['rounded'] != undefined }"
    :style="additionalCss"
  >
    <div class="header">
      <img
        class="cardImage"
        :class="{
          left: cardData.header.iconPlacement == 0,
          mid: cardData.header.iconPlacement == 1,
          right: cardData.header.iconPlacement == 2,
        }"
        v-if="cardData && cardData.header.iconUrl"
        :src="''"
        alt=""
        @load="adjustImgPlacement"
      />
      <slot name="header">
        <div class="h5 pt-2 ps-2">{{ cardData.header.title }}</div>
      </slot>
    </div>
    <div class="body px-2">
      <slot name="body">
        <div class="">{{ cardData.body.text }}</div>

        <div class="" v-if="cardData.body.additionalData">
          <table class="w-100">
            <tbody>
              <tr
                v-for="dataObject in cardData.body.additionalData"
                :key="dataObject.key"
              >
                <td>{{ dataObject.key }}</td>
                <td>{{ dataObject.value }}</td>
              </tr>
            </tbody>
          </table>
          <div
            class=""
            v-for="displaypair in cardData.body.additionalData"
            :key="displaypair.key"
          ></div>
        </div>
        <div class="" v-if="cardData.body.additionalSections">
          <div
            class=""
            v-for="section in cardData.body.additionalSections"
            :key="section.title"
          >
            <hr />
            <div class="">{{ section.text }}</div>
            <div class="" v-if="section.additionalData">
              <table class="w-100">
                <tbody>
                  <tr
                    v-for="sectionDataObject in sections.additionalDat"
                    :key="sectionDataObject.key"
                  >
                    <td>{{ dataObject.key }}</td>
                    <td>{{ dataObject.value }}</td>
                  </tr>
                </tbody>
              </table>
              <div
                class=""
                v-for="displaypair in cardData.body.sectionDataObject"
                :key="displaypair.key"
              ></div>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div class="footer" v-if="cardData.footer">
      <div class="px-2 d-flex justify-content-between">
        <slot name="footer">
          <div class="">{{ cardData.footer.content }}</div>
          <button
            class="btn btn-secondary"
            v-if="cardData.footer.buttonFunktion"
            tabindex="1"
            @click="cardData.footer.buttonFunktion"
          >
            {{ cardData.footer.buttonTitle }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { CardObject } from "./cards";

@Options({})
export default class Card extends Vue {
  @Prop({ required: false, type: Object as () => CardObject })
  cardData!: CardObject;
  @Prop({ required: false, type: String, default: "" }) additionalCss!: string;

  useDarkMode = false;
  id = this.generateUniqueId();

  async getUrl() {
    if (this.cardData.header.iconUrl)
      return require(this.cardData.header.iconUrl);
    return "";
  }

  /**
   * Genertes a uuidv4
   */
  generateUniqueId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  adjustImgPlacement() {
      console.log("loaded")
    const img = document.getElementById(this.id)?.querySelector("img");
    if (img) {
      const imgheight = parseInt(window.getComputedStyle(img).height);
      img.style.top = -imgheight / 2 + "px";
    }
  }

  mounted() {
    if (this.$attrs["dark"] != undefined) {
      this.useDarkMode = true;
    }

    if (this.cardData && this.cardData.header.iconUrl) {
      const img = document.getElementById(this.id)?.querySelector("img");
      if (img) {
        img.src = this.cardData.header.iconUrl;
      }
    }
  }
}
</script>

<style scoped>
.cardElement {
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  width: 20rem;
  border-radius: 0.25rem;
}

.cardElement .header,
.cardElement .footer {
  background-color: #f0f0f0b4;
}

.cardElement.dark {
  color: #e8e8e8;
}

.cardElement.dark .body {
  background-color: #51535a;
}

.cardImage {
  position: absolute;
  width: 15%;
  height: 15%;
  border-radius: 100%;
}
.cardImage.mid {
  left: 42.5%;
}

.cardImage.right {
  right: 1rem;
}
.cardImage.left {
  right: 1rem;
}

.rounded {
  border-radius: 5px;
}

.cardElement.dark .header,
.cardElement.dark .footer {
  background-color: rgb(63, 66, 75);
}
.round .header {
  border-radius: 0.25rem 0.25rem 0px 0px;
}
.round .footer {
  border-radius: 0px 0px 0.25rem 0.25rem;
}

.pointer {
  cursor: pointer;
}

.footer {
  border-top: 1px solid rgb(219, 219, 219);
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.header {
  border-bottom: 1px solid rgb(219, 219, 219);
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
</style>
