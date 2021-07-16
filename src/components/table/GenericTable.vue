<template>
  <div
    class="generic-table"
    :class="[useDarkMode ? 'genericTableDark' : 'genericTableLight']"
  >
    <div class="paginationHeader" v-if="paginated">
      <div class="d-flex">
        <button
          class="btn-light"
          :disabled="pageNumber == 1"
          @click="pageChange('pageChanged', 'prev')"
        >
          prev
        </button>
        <input
          type="number"
          style="width: 5rem"
          min="1"
          :max="Math.ceil(maxEntries / pageSize)"
          v-model="ownPageNumber"
          @blur="pageChange('pageChanged', 'custom')"
          @keydown.enter="pageChange('pageChanged', 'custom')"
        />
        <button
          class="btn-light"
          :disabled="Math.ceil(maxEntries / pageSize) == pageNumber"
          @click="pageChange('pageChanged', 'next')"
        >
          next
        </button>
        <div class="ms-5 align-self-center">
          von {{ Math.ceil(maxEntries / pageSize) }}
        </div>
      </div>
    </div>
    <table
      class="table table-hover mb-0"
      :class="[useDarkMode ? 'table-dark' : 'table-light']"
    >
      <thead>
        <tr v-if="fields.length > 0">
          <th class="" v-for="tableField in fields" :key="tableField">
            {{ tableField.title }}
          </th>
        </tr>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="dataEntry in tableData" :key="dataEntry.id">
          <td
            v-for="tableField in fields"
            :key="tableField.title"
            @click="clickTableEntry(tableField, dataEntry)"
            :class="{ pointer: tableField.clickable }"
            class="align-middle"
          >
            <div class="" v-if="!tableField.htmlFormatter">
              {{
                tableField.formatter
                  ? tableField.formatter(dataEntry)
                  : dataEntry[tableField.id]
              }}
            </div>
            <div
              class=""
              v-else
              v-html="tableField.htmlFormatter(dataEntry)"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex pt-2 pb-2 paginationFooter" v-if="paginated">
      <input
        type="number"
        name=""
        min="1"
        max="maxEntries"
        v-model="ownPageSize"
        style="width: 5rem"
        id=""
      />
      <button class="btn-light ms-2" @click="emitEvent('parameterChanged', {})">
        fetch
      </button>
      <div class="ms-5 align-self-center">von {{ maxEntries }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { TableFields } from "./types";

@Options({})
export default class GenericTable<T = any> extends Vue {
  //Simple Generic Table
  @Prop({ required: true, type: Object as () => T }) fields!: TableFields<T>;
  @Prop({ required: true, type: Object as () => T }) tableData!: T[];

  //Pagination
  @Prop({ required: false, type: Boolean, default: false }) paginated!: boolean;
  @Prop({ required: false, type: Number }) pageSize!: number;
  @Prop({ required: false, type: Number }) pageNumber!: number;
  @Prop({ required: false, type: Number }) maxEntries!: number;

  ownPageSize = 0;
  ownPageNumber = 0;
  ownMaxEntries = 0;
  useDarkMode = false;

  /**
   * Since i keep copies the values pageSize and pageNumber in ownPageNumber and ownPageSize,
   * i need to keep them in sync with their original values -> Watchers
   */
  @Watch("pageSize")
  updatePageSize(to: number, from: number) {
    this.ownPageSize = to;
  }

  @Watch("pageNumber")
  updatePageNumber(to: number, from: number) {
    this.ownPageNumber = to;
  }

  get tableStatus() {
    return { pageSize: this.ownPageSize, pageNumber: this.ownPageNumber };
  }

  pageChange(eventName: string, changeType: string) {
    if (changeType == "next") {
      console.log("next");
      this.ownPageNumber += 1;
    } else if (changeType == "prev") {
      console.log("prev");

      this.ownPageNumber -= 1;
    }
    if (this.ownPageNumber > Math.ceil(this.maxEntries / this.pageSize)) {
      this.ownPageNumber = Math.ceil(this.maxEntries / this.pageSize);
    }
    if (this.ownPageNumber <= 0) {
      this.ownPageNumber = 1;
    }
    this.emitEvent(eventName, { changeType });
  }

  emitEvent(eventName: string, additionalInfo: any) {
    if (this.ownPageSize > this.maxEntries) this.ownPageSize = this.maxEntries;
    if (this.ownPageSize <= 0) this.ownPageSize = 1;
    this.$emit(eventName, { ...this.tableStatus, ...additionalInfo });
  }

  clickTableEntry(tableField: TableFields<T>, tableData: T) {
    if (tableField.clickable && tableField.clickfkt) {
      tableField.clickfkt(tableData);
    }
  }

  mounted(): void {
    if (this.$attrs["dark"] != undefined) {
      this.useDarkMode = true;
    }

    this.ownPageSize = this.pageSize;
    this.ownPageNumber = this.pageNumber;
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.generic-table {
  position: relative;
}

.generic-table .paginationFooter {
  padding-bottom: 5px;
}
.generic-table.genericTableLight .paginationFooter {
  color: black;
}

.generic-table.genericTableDark .paginationFooter {
  color: white;
}

.generic-table .paginationHeader {
  padding-bottom: 5px;
}
.generic-table.genericTableLight .paginationHeader {
  color: black;
}

.generic-table.genericTableDark .paginationHeader {
  color: white;
}
</style>
