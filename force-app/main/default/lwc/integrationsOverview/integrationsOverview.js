import { LightningElement,api } from 'lwc';
const columns = [
    { label: "ClassName", fieldName: "Name", type: "text" },
    { label: "Execution Time", fieldName: "executiontime", type: "number" },
    { label: "Database CPU Time", fieldName: "dbtime", type: "number" },
    { label: "Number Of SOQL", fieldName: "numsoql", type: "number"},
    { label: "Buffers", fieldName:"buffers", type: "number"},
    { label: "Callout Time", fieldName:"callout", type: "number"},
    { label: "Percent", fieldName: "perc", type: "percent",cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }}, 
  ];
  const pagefields = [
    { label: "PageName", fieldName: "Name", type: "text" },
    { label: "Execution Time", fieldName: "executiontime", type: "number" },
    { label: "Database CPU Time", fieldName: "dbtime", type: "number" },
    { label: "Number Of SOQL", fieldName: "numsoql", type: "number"},
    { label: "Buffers", fieldName:"buffers", type: "number"},
    { label: "Callout Time", fieldName:"callout", type: "number"},
    { label: "Percent", fieldName: "perc", type: "percent",cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }}, 

  ];
export default class integrationsOverview extends LightningElement {
    dqdata;
    pagedata;
    columns = columns
    pagefields = pagefields
    perftrend
    pageperf
    orgmapdata
    summary
    connectedCallback() {
      this.createData()
     }
     /*wiredListView({error,data}) {
       if (data) {
           this.contactdata = data
           for (var rec in this.contactdata) {
             //console.log('contact',this.contactdata[rec])
             this.empset.add(this.contactdata[rec].employee__r.Name);
             this.deptset.add(this.contactdata[rec].department__c);
          }            
       }
     }*/
     createData() {
       
      this.perftrend = [
           
                   {date: "5/25/2021", count: "1000"},
                   {date: "6/25/2021", count: "1100"},
                   {date: "7/25/2021", count: "1450"},
                   {date: "8/25/2021", count: "1511"},
                   {date: "9/25/2021", count: "1619"},
                   {date: "10/25/2021", count: "1904"},
                   {date: "11/25/2021", count: "2106"},
                   {date: "12/25/2021", count: "2356"},
                   {date: "01/25/2022", count: "1500"},
                   {date: "02/25/2022", count: "1400"}
               ],
   this.pageperf = [
           
                  {date: "5/25/2021", count: "1200"},
                  {date: "6/25/2021", count: "1600"},
                  {date: "7/25/2021", count: "1450"},
                  {date: "8/25/2021", count: "1511"},
                  {date: "9/25/2021", count: "1619"},
                  {date: "10/25/2021", count: "1904"},
                  {date: "11/25/2021", count: "2106"},
                  {date: "12/25/2021", count: "2556"},
                  {date: "01/25/2022", count: "2500"},
                  {date: "02/25/2022", count: "2500"}
              ],
    this.dataready=true
    this.dqdata = [{"Name":'CustomAccountUpdate',"executiontime":170,"dbtime":20,"numsoql":10,'buffers':10000,"callout":10},
                {"Name":'OrderCallOut',"executiontime":30,"dbtime":20,"numsoql":20,'buffers':1000,"callout":300},
                {"Name":'ProcessOrder',"executiontime":40,"dbtime":70,"numsoql":50,'buffers':100000,"callout":0},
                {"Name":'ContactRetrive',"executiontime":650,"dbtime":300,"numsoql":100,'buffers':50000,"callout":0},
                {"Name":'UpdateOppty',"executiontime":300,"dbtime":150,"numsoql":70,'buffers':80000,"callout":100},

              ]
    this.pagedata = [{"Name":'AccountPage',"executiontime":170,"dbtime":20,"numsoql":10,'buffers':10000,"callout":10},
                {"Name":'OrderpAGE',"executiontime":30,"dbtime":20,"numsoql":20,'buffers':1000,"callout":300},
                {"Name":'Case Detail',"executiontime":40,"dbtime":70,"numsoql":50,'buffers':100000,"callout":0},
                {"Name":'ContactRetrive',"executiontime":650,"dbtime":300,"numsoql":100,'buffers':50000,"callout":0},
                {"Name":'UpdateOppty',"executiontime":300,"dbtime":150,"numsoql":70,'buffers':80000,"callout":100},
            ]
    this.summary = { "Apex": 1000,"triggers": 400, "Pages":1050}
    
    this.orgmapdata =  {
                "name": "Org",
                "type":'ORG',
                "children":[{"name": "Integrations","type":"node","perf":3200,
                      "children":[
                        {"name":"BULK","type":"node","operation":"PUT",
                            "description":"High volume Update, Insert or extracting records.",
                            "children":[{"name":"Account","type":"leaf","perf":1222400,"volume":100000,"operation":"INSERT","timetaken":"4"}]
                          },
                        {"name":"SYNC","type":"node","operation":"PUT",
                          "description":"High volume Update, Insert or extracting records.",
                          "children":[
                              {"name":"REST","type":"node","operation":"PUT","description":"Uodate or Insert records in the Org",
                              "children":[
                                {"name":"Query","type":"node","operation":"PUT","description":"Uodate or Insert records in the Org",
                                "children":[
                                  {"name":"Account","type":"leaf","perf":2400,"volume":10000,"numrequests":100},
                                  {"name":"Lead","type":"leaf","perf":2400,"volume":10000,"numrequests":100},
                                  {"name":"Oppty","type":"leaf","perf":2400,"volume":10000,"numrequests":100}
                                  ]   
                              }]},
                              
                                {"name":"Upsert","type":"node","operation":"PUT","description":"Uodate or Insert records in the Org",
                                "children":[
                                  {"name":"Account","type":"leaf","perf":2400,"volume":10000,"numrequests":100},
                                  {"name":"Lead","type":"leaf","perf":2400,"volume":10000,"numrequests":100},
                                  {"name":"Oppty","type":"leaf","perf":2400,"volume":10000,"numrequests":100}
                                  ]   
                              },
                              {"name":"Insert","type":"node","operation":"PUT","description":"Uodate or Insert records in the Org",
                                "children":[
                                  {"name":"Oppty","type":"leaf","perf":2400,"volume":10000,"numrequests":100}
                                  ]   
                              }
                            
                        ]},
                        {"name":"ASYNC","type":"node","operation":"PUT",
                          "description":"High volume Update, Insert or extracting records.",
                          "children":[
                            {"name":"Send","type":"node","operation":"PUT","description":"Uodate or Insert records in the Org",
                              "children":[{"name":"Account","type":"leaf","perf":2400,"volume":10000,"numrequests":100},
                                          {"name":"Lead","type":"leaf","perf":2400,"volume":10000,"numrequests":100},
                                        ]               
                            }
                          ]}
                      ]//Int Children start
                  }]//Integrations//
                }///JSON END//
                  
          }///code end 
}