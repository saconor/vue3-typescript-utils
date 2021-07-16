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
        <li>fields:"fieldsDef"</li>
        <li>tableData:"fieldData"</li>
        <li>pageNumber:"pageNumber"</li>
        <li>pageSize:"pagesize"</li>
        <li>maxEntries:"maxResults"</li>
        />
      </ul>
    </div>
    <div class="">
      Emits:
      <ul>
        <li>@parameterChanged: Fired when pageSize has been changed</li>
        <li>@pageChanged:Fired when pageNumber has been changed</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dayjs, { Dayjs } from "dayjs";
import { TableFields } from "@/components/table/types";
import { generateField } from "@/components/table/tableutils";
import GenericTable from "@/components/table/GenericTable.vue";

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
  components: { GenericTable },
})
export default class TableCheck extends Vue {
  fieldtestData: TestData[] = [];
  displayedData: TestData[] = [];
  pageNumber = 1;
  pagesize = 10;
  maxResults = 1000;
  offset = 0;

  async updateTableAndFetchData(event: any) {
    this.pagesize = parseInt(event.pageSize);
    this.pageNumber = parseInt(event.pageNumber);
  }

  get fieldsDef(): TableFields<TestData>[] {
    const tableFields: TableFields<TestData>[] = [];

    tableFields.push(
      generateField<TestData>("Id", "id", {
        clickable: true,
        clickfkt: (data: TestData) => {
          alert("click at " + data.id);
        },
      })
    );
    tableFields.push(
      generateField<TestData>("Code", "code", {
        formatter: (data: TestData) => {
          return data.code.toLowerCase();
        },
      })
    );
    tableFields.push(generateField<TestData>("Name", "name", {}));
    tableFields.push(generateField<TestData>("Last Name", "last_name", {}));
    tableFields.push(generateField<TestData>("Job", "job", {}));
    tableFields.push(generateField<TestData>("Age", "age", {}));
    tableFields.push(
      generateField<TestData>("Joined", "joined_at", {
        formatter: (data: TestData) => {
          return data.joined_at.format("MM/DD/YYYY, hh:mm:ss");
        },
      })
    );

    return tableFields;
  }

  get fieldData(): TestData[] {
    this.displayedData = this.fieldtestData;
    console.log(this.pagesize, this.pageNumber);
    return this.displayedData.slice(
      this.pagesize * (this.pageNumber - 1),
      this.pagesize * (this.pageNumber - 1) + this.pagesize
    );
  }

  mounted() {
    const names = [
     "Mayson", 	
"Aadil", 	 	
"Aubree", 	
"Siobhan", 	
"Uma", 	 	
"Cleveland", 	
"Finnian", 	
"Bree", 	 	
"Logan", 	 	
"Andy", 	 	
"Eve", 	 	
"Cherry", 	
"Marilyn", 	
"Ifrah", 	 	
"Angelo", 	
"Ruby-Leigh", 
"Kristen", 	
"Ernie", 	 	
"Donald", 	
"Skylar", 	
"Jarod", 	 	
"Sumayya", 	
"Pedro", 	 	
"Darcey", 	
"Buddy", 	 	
"Manuel", 	
"Clare", 	 	
"Kavita", 	
"Dani", 	 	
"Aliya", 	 	
"Maegan", 	
"Kathleen", 	
"Hibba", 	 	
"Patience", 	
"Kyron", 	 	
"Neriah", 	
"Maggie", 	
"Jensen", 	
"Colleen", 	
"Julius", 	
"Bessie", 	
"Ayda", 	 	
"Kelsi", 	 	
"Kenzo", 	 	
"Jaydon", 	
"Adele", 	 	
"Tye", 	 	
"Roxanne", 	
"Fannie", 	
"Iris", 	 	
"Kalum", 	 	
"Precious", 	
"Veronica", 	
"Kaison", 	
"Annalise", 	
"Carl", 	 	
"Yunus", 	 	
"Chantal", 	
"Aimee", 	 	
"Radhika", 	
"Bruce", 	 	
"Priya", 	 	
"Gareth", 	
"Beauden", 	
"Rome", 	 	
"William", 	
"Arian", 	 	
"Christine", 	
"Shelby", 	
"Trent", 	 	
"Reanna", 	
"Glyn", 	 	
"Giacomo", 	
"Waleed", 	
"Stefan", 	
"Ayah", 	 	
"Irene", 	 	
"Rachelle", 	
"Talia", 	 	
"Sabrina", 	
"Dalton", 	
"Izabella", 	
"Sierra", 	
"Kameron", 	
"Chloe", 	 	
"Prisha", 	
"Richie", 	
"Jessica", 	
"Jarrod", 	
"Gracey", 	
"Elsie", 	 	
"Laibah", 	
"Annette", 	
"Riaan", 	 	
"Boris", 	 	
"Jamie-Leigh",
"Huda", 	 	
"Griffin", 	
"Youssef", 	
"Safiya", 	
    ];
    const last_names = [
      "Mora",
"Salazar",
"Roberts",
"Medina",
"Marin",
"Moss",
"Schultz",
"Nixon",
"Blacka",
"Lindsey",
"Velasquez",
"Harvey",
"Pollard",
"Solomon",
"Hines",
"Bender",
"Russell",
"Flores",
"Mcpherson",
"Busby",
"Kaiser",
"Grimes",
"Pritchard",
"Silva",
"Hodson",
"Jordan",
"Pena",
"Bourne",
"Rich",
"Kearney",
"Walls",
"Morrison",
"Everett",
"Sherman",
"Mair",
"Rosario",
"Pugh",
"Mcmahon",
"Leonard",
"Kaye",
"Rhodes",
"Trevino",
"Lovell",
"Beltran",
"Hahn",
"Bellamy",
"Huffman",
"Ramsey",
"Kim",
"Sierra",
"Boyle",
"Liu",
"Webster",
"Cunningham",
"Wardle",
"Soto",
"Lennon",
"Moses",
"Britt",
"Whitehead",
"Johns",
"Rodgers",
"Crawford",
"Chase",
"Dawe",
"Watts",
"Mohammed",
"Forbes",
"Jimenez",
"Hawkins",
"Ramsay",
"Wilkes",
"Poole",
"Fry",
"Dodd",
"Guest",
"Ball",
"Ritter",
"Talley",
"Ray",
"Bonilla",
"Devlin",
"Cannon",
"Ellwood",
"Clements",
"Mcmillan",
"Deleon",
"Yates",
"Richards",
"Findlay",
"Ortega",
"O'Connor",
"Thornton",
"Griffin",
"Bell",
"Kouma",
"Cuevas",
"Cortes",
"Gilmour",
"Briggs"
    ];
    const jobs = [
      "Elementary School Teacher",
      "Psychologist",
      "Dancer",
      "Telemarketer",
      "Fitness Coach",
      "Police Officer",
      "Physicist",
      "Recreational Therapist",
      "Mechanical Engineer",
      "Librarian",
      "Desktop publisher",
      "Radiologic Technologist",
      "Patrol Officer",
      "Mathematician",
      "Musician",
      "Reporter",
      "Epidemiologist",
      "Middle School Teacher",
      "School Counselor",
      "Actor",
      "Civil Engineer",
      "Hairdresser",
      "Art Director",
      "Dental Hygienist",
      "Educator",
      "Security Guard",
      "Automotive mechanic",
      "Landscaper & Groundskeeper",
      "Cost Estimator",
      "Medical Secretary",
      "Computer Hardware Engineer",
      "Paramedic",
      "Auto Mechanic",
      "Photographer",
      "Mason",
      "Computer Support Specialist",
      "Paralegal",
      "Referee",
      "Database administrator",
      "Lawyer",
      "Customer Service Representative",
      "Occupational Therapist",
      "Editor",
      "Market Research Analyst",
      "Clinical Laboratory Technician",
      "Diagnostic Medical Sonographer",
      "Receptionist",
      "Budget analyst",
      "Medical Assistant",
      "Bookkeeping clerk",
      "Public Relations Specialist",
      "Social Work",
      "Architect",
      "Actuary",
      "Software Developer",
      "Urban Planner",
      "Registered Nurse",
      "Housekeeper",
      "Bus Driver",
      "Accountant",
      "Electrical Engineer",
      "Marketing Manager",
      "Speech-Language Pathologist",
      "Sports Coach",
      "Designer",
      "Substance Abuse Counselor",
      "Insurance Agent",
      "Professional athlete",
      "Fitness Trainer",
      "High School Teacher",
      "Judge",
      "Court Reporter",
      "Dentist",
      "Interpreter & Translator",
      "Landscape Architect",
      "Surveyor",
      "Personal Care Aide",
      "Physical Therapist",
      "School Psychologist",
      "Environmental scientist",
      "Truck Driver",
      "Chemist",
      "Massage Therapist",
      "Construction Manager",
      "Maintenance  Work",
      "Secretary",
      "Food Scientist",
      "Firefighter",
      "Compliance Officer",
      "Electrician",
    ];



    let newfieldtestData: TestData[] = [];
    for (let i = 0; i < 1000; i++) {
      let testValue: TestData = {
        id: i,
        code: Math.random().toString(36).substring(7),
        name: names[Math.floor(Math.random() * names.length) - 1],
        last_name:
          last_names[Math.floor(Math.random() * last_names.length) - 1],
        job: jobs[Math.floor(Math.random() * jobs.length) - 1],
        age: 18 + Math.ceil(Math.random() * 60),
        joined_at: dayjs().add(-Math.floor(Math.random() * 9000), "day"),
      };
      newfieldtestData.push(testValue);
    }
    this.fieldtestData = [...newfieldtestData];
  }
}
</script>


<style scoped>
.props {
  padding-bottom: 20px;
}
</style>
