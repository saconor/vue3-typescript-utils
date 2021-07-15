<template>
  <div class="home">
    <div class="">
      Generic Table
      <GenericTable
        :paginated="true"
        :fields="fieldsDef"
        :tableData="fieldData"
        :pageNumber="pageNumber"
        :pageSize="pagesize"
        :maxEntries="maxResults"
        @parameterChanged="updateTableAndFetchData"
        @pageChanged="updateTableAndFetchData"
      />
    </div>
    <div class="props">
        Properties
        <ul>
            <li>enable dark mode with attribute dark</li>
            <li>paginated:"true"</li>
           <li>fields:"fieldsDef" </li>
           <li>tableData:"fieldData"</li>
           <li>pageNumber:"pageNumber"</li>
           <li>pageSize:"pagesize"</li>
           <li>maxEntries:"maxResults"</li>
      />
        </ul>
    </div>
    <div class="">
        Emits:
        <ul><li>@parameterChanged: Fired when pageSize has been changed </li>
           <li>@pageChanged:Fired when pageNumber has been changed </li></ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dayjs, { Dayjs } from "dayjs";
import { TableFields } from "@/components/table/types";
import { generateField } from "@/components/table/tableutils";
import GenericTable from "@/components/table/GenericTable.vue"

interface TestData {
  id: number;
  code: string;
  name: string;
  last_name: string;
  job: string;
  age: number;
  joined_at: Dayjs;
}

@Options({
  components: {GenericTable},
})
export default class TableCheck extends Vue {
  fieldtestData: TestData[] = [];
  displayedData:TestData[] = []
  pageNumber = 1
  pagesize = 10
  maxResults = 1000
  offset = 0

   async updateTableAndFetchData(event: any) {
    this.pagesize = parseInt(event.pageSize);
    this.pageNumber = parseInt(event.pageNumber);
  }

  get fieldsDef(): TableFields<TestData>[] {
    const tableFields: TableFields<TestData>[] = [];

    tableFields.push(
      generateField<TestData>("Id", "id", {
        clickable: true,
        clickfkt: (data: TestData) => { alert("click at "+data)},
      })
    );
    tableFields.push(
      generateField<TestData>("Code", "code", {
        formatter: (data:TestData) => {return data.code.toLowerCase()}
      })
    );
    tableFields.push(
      generateField<TestData>("Name", "name",{})
    );
    tableFields.push(
      generateField<TestData>("Last Name", "last_name",{})
    );
    tableFields.push(
      generateField<TestData>("Job", "job",{})
    );
    tableFields.push(
      generateField<TestData>("Age", "age",{})
    );
    tableFields.push(
      generateField<TestData>("Joined", "joined_at", {
        formatter: (data:TestData) => {return data.joined_at.format("MM/DD/YYYY, hh:mm:ss")}
      })
    );

    return tableFields;
  }

  get fieldData(): TestData[] {
      this.displayedData = this.fieldtestData
      console.log(this.pagesize,this.pageNumber)
    return this.displayedData.slice(this.pagesize*(this.pageNumber-1),this.pagesize*(this.pageNumber-1)+this.pagesize);
  }

  mounted() {
    const names = [
      "Marc",
      "John",
      "Mario",
      "David",
      "Joe",
      "Lisa",
      "Marie",
      "Ann",
      "Joshua",
      "Ben",
      "Emma",
      "Thomas",
      "Patrick",
      "Tim",
      "Toby",
      "Tom",
    ];
    const last_names = ["Miller","Miranda","Carrey","Jones","Cruise","Beck","Celso","Espinosa","Turk","Dorian","Canne","Curie","Hanks","Holland","Mahomes","Smith","Doe"];
    const jobs = [
      "IT",
      "Marketing",
      "Desk Job",
      "Janitor",
      "Pilot",
      "Call Center",
      "Smith",
      "Butcher",
      "Cashier",
      "Farmer",
      "Teacher",
      "Professor",
      "Firefighter",
      "Police",
      "Judge",
      "Actor",
      "Singer",
      "Producer",
      "Painter",
    ];
     let newfieldtestData: TestData[] = [];
    for (let i = 0; i < 1000; i++) {
      let testValue: TestData = {
        id: i,
        code: Math.random().toString(36).substring(7),
        name: names[Math.floor(Math.random()*names.length)-1],
        last_name : last_names[Math.floor(Math.random()*last_names.length)-1],
        job:jobs[Math.floor(Math.random()*jobs.length)-1],
        age: 18 +Math.ceil(Math.random()*60),
        joined_at: dayjs().add(-Math.floor(Math.random()*9000),"day")
      };
      newfieldtestData.push(testValue)
    }
    this.fieldtestData = [...newfieldtestData]
  }
}
</script>


<style scoped>
.props {
  padding-bottom: 20px;
}
</style>
