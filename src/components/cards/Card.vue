<template>
  <div class="">
    <div
      class="d-flex flex-column cardElement"
      :class="{'dark':useDarkMode}"
      tabindex="1"
      :style="additionalCss"
    >
      <div class="header">
        <img
          v-if="cardData && cardData.header.iconUrl"
          :src="getUrl()"
          alt=""
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
            <button v-if="cardData.footer.buttonFunktion" @click="cardData.footer.buttonFunktion">{{cardData.footer.buttonTitle}}</button>
          </slot>
        </div>
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

  getUrl() {
    if (this.cardData.header.iconUrl)
      return require(this.cardData.header.iconUrl);
    return "";
  }

  mounted() {
    if (this.$attrs["dark"] != undefined) {
      this.useDarkMode = true;
    }
  }
}
</script>

<style scoped>
.cardElement {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.cardElement .header, .cardElement .footer{
    background-color: rgba(221, 221, 221, 0.705);
}
.pointer {
  cursor: pointer;
}

.footer{
    border-top: 1px solid rgb(219, 219, 219);
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
}

.header{
      border-bottom: 1px solid rgb(219, 219, 219);
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
}
</style>
