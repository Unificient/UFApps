import { LightningElement, api } from 'lwc';

const eptcols = [
  { label: "PageName", fieldName: "name", type: "text" },
  { label: "Time To Load", fieldName: "rt", type: "number" },
  { label: "User Experience", fieldName: "ux", type: "number",cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }}, 
];
const apexcols = [
  { label: "PageName", fieldName: "name", type: "text" ,fixedWidth:200},
  { label: "User Experience", fieldName: "rt", type: "number",fixedWidth:200,cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }}, 
];
export default class businessOverviewCmp extends LightningElement {
  apexcols = apexcols
  eptdata
  apexdata
  createeptdata
  xd1
  showdetails = false
  noshowdetails = false
  toptext
  summary
  row00
  row01
  row10
  row11
  summaryUserExperience
  @api color2 = "#D6EAF8"
  chartheight=300
  chartwidth=350
  connectedCallback() {
      this.createData()
     }
     
     

    createData() {
    
      //UX Data
      
      this.summaryUserExperience = {"summary": 
      {
        "UserExperience": 
        [
          { "Name" : "PageNavigation",
            "TotalNoofPages" : 10,
            "PagesOptimized" : 4,
            "PagesNotOptimized" : 6
         },
         {
            "Name" : "RecordCreation",
            "TotalNoofRecords" : 10,
            "PagesOptimized" : 5,
            "PagesNotOptimized" : 5
         },  
         {  
           "Name" : "Adoption",
           "TotalNoofPages" : 10,
           "PagesOptimized" : 7,
           "PagesNotOptimized" : 5,
           "TotalPercent" : 70
         }
        ]
      ,
      
       "BusinessLogic" :
       [ { 
            "Name" : "ApexClasses",
            "TotalNoofPages"    : 8,
            "PagesOptimized" : 4,
            "PagesNotOptimized" : 4
          },
          { 
            "Name" :  "Triggers",
            "TotalNoofPages"    : 18,
            "PagesOptimized" : 14,
            "PagesNotOptimized" : 4
          }
       ],
        "AutomatedProcess":
         [{

            "Name" :"AutomatedProcess",
            "TotalNoofPages"    : 2,
            "PagesOptimized" : 1,
            "PagesNotOptimized" : 1
      
         }]
      
        },
      "SummaryNumber": 1
      }
 


      this.row00 = this.summaryUserExperience.summary.UserExperience[0];
      this.row01 =this.summaryUserExperience.summary.UserExperience[1];
      this.row02 =this.summaryUserExperience.summary.UserExperience[2];
      this.row10 =this.summaryUserExperience.summary.BusinessLogic[0];
      this.row11 = this.summaryUserExperience.summary.BusinessLogic[1];
      this.row12 = this.summaryUserExperience.summary.AutomatedProcess[0]
    
      
      // this.eptdata = [{'name':'HomePage','rt':2.4,'ux':5},
      // {'name':'Account Detail','rt':3.4,'ux':8},
      // {'name':'Contact Detail','rt':1.2,'ux':6},
      // {'name':'Oppty Detail','rt':4.8,'ux':9}]

      this.eptdata = [{'name':'HomePage','rt':2.4,'network':{ 'rtt': 250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'NA' }},
      {'name':'Account Home','rt':0.4,'network':{ 'rtt': 4501, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'Homepage' }},
      {'name':'Account Detail','rt':3.4,'network':{ 'rtt': 1250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'AccountDetail' }},
      {'name':'Contact Home','rt':0.7,'network':{ 'rtt': 5250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'OpptyDetail' }},
      {'name':'Contact Detail','rt':1.2},
      {'name':'Oppty Home','rt':0.9},
      {'name':'Oppty Detail','rt':4.8}]
    
      this.apexdata = [{'name':'ApexClass1','rt':2.4},
      {'name':'AccountClass','rt':1.4},
      {'name':'SalesClass','rt':3.4,},
      {'name':'MyClass','rt':2.7}]

      this.createeptdata = [{'name':'HomePage','rt':2.4,'ux':5},
      {'name':'Account Create','rt':3.4,'ux':8},
      {'name':'Contact Create','rt':1.2,'ux':6},
      {'name':'Oppty Create','rt':4.8,'ux':7},
      {'name':'Lead Create','rt':4.8,'ux':9}]

      this.xd1 = [
        {"date": '5/25/2021', "count": 100},
        {"date": '6/25/2021', "count": 110},
        {"date": '7/25/2021', "count": 145},
        {"date": '8/25/2021', "count": 151},
        {"date": '9/25/2021', "count": 161},
        {"date": '10/25/2021', "count": 190},
        {"date": '11/25/2021', "count": 210},
        {"date": '12/25/2021', "count": 235},
        {"date": '1/25/2022', "count": 251},
        {"date": '2/25/2022', "count": 281}
      ]
    }
    
  
    showUx(evt) 
    {
      this.showdetails=true
      this.toptext = "Employee Experience"
    }
}