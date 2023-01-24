import { LightningElement,api } from 'lwc';
const classcolumns = [
    { label: "ClassName", fieldName: "Name", type: "text" },
    { label: "Execution Time(ms)", fieldName: "executiontime", type: "number" },
    { label: "Execution Count", fieldName: "executioncount", type: "number" },
    { label: "Score", fieldName: "score", type: "number" },
    { label: "Percent", fieldName: "perc", type: "percent",cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }}, 
  ];
  const columns = [
    { label: "ClassName", fieldName: "Name", type: "text" },
    { label: "Execution Count", fieldName: "executioncount", type: "number" },
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
export default class CustomAppsCmp extends LightningElement {
    dqdata;
    classdata;
    classcolumns = classcolumns
    pagefields = pagefields
    perftrend
    pageperf
    orgmapdata
    perfrange
    selectedrowdata 
    showdebug=false
   @api summary
    objects
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
    handleBarClick(event){
      console.log('called',event.target.metric)
      var charttype = event.target.metric
      console.log('d',event)
     }
    getSelectedName(event) {
      const selectedRows = event.detail.selectedRows;
      this.showdebug=true
      console.log(selectedRows)
      // Display that fieldName of the selected rows
      for (let i = 0; i < selectedRows.length; i++) {
           this.selectedrowdata = selectedRows[i].Name;
      }
      if (selectedRows=="") {
          this.showdebug=false
      }
    }
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
    this.classdata = [{Name:'CustomAccountUpdate',executiontime:2000,executioncount:170,score:8,trendIcon: 'utility:down'},
                {Name:'OrderCallOut',executiontime:2000,executioncount:30,score:8,trendIcon: 'utility:down'},
                {Name:'ProcessOrder',executiontime:2000,executioncount:40,score:8,trendIcon: 'utility:up'},
                {Name:'ContactRetrive',executiontime:2000,executioncount:650,score:4,trendIcon: 'utility:up'},
                {Name:'UpdateOppty',executiontime:2000,executioncount:300,score:5,trendIcon: 'utility:up'},

              ]
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
    this.summary = 
        [{name: "Lightning", count: 21100},
        {name: "Triggers", count: 20099},  
        {name: "WebServices", count: 19099},  
        ]
    this.perfrange = { "< 2 S": 100,"< 5 S": 200, "> 5 S":50}
    this.objects = [
      {name: "LeadClass", count: 14000},
      {name: "OpportunityClass", count: 12345},
      {name: "CaseClass", count: 11230},  
      {name: "AccountClass", count: 10000},
      {name: "ContactClass", count: 9000},
    ]
    
    this.orgmapdata =  {
              "name": "Sales Org",
              "type":'ORG',
                          "children":[
                                {"name":"Lightning","type":"UI","requests": 4339,"perf":4300,
                                    "children":[
                                      { "name":"page1","requests": 4339,"perf":4300,
                                                  "children":[{"name":"ApexClass1",
                                                              "children":[{"name":"CallOut1","children":[{"name":"callouttime","perf":500}]},
                                                                          {"name":"SOQL", "children":[{"name":"dbtime","perf":500},
                                                                          {"name":"NumOfSOQL","count":500},
                                                                         {"name":"Buffers","count":53300}]
                                                                          }]},
                                                
                                                  ]},
                                                  { "name":"page2","requests": 4339,"perf":4300,
                                                  "children":[{"name":"ApexClass4",
                                                              "children":[{"name":"CallOut1","children":[{"name":"callouttime","perf":500}]},
                                                                          {"name":"SOQL", "children":[{"name":"dbtime","perf":500},
                                                                          {"name":"NumOfSOQL","count":500},
                                                                         {"name":"Buffers","count":53300}]
                                                                          }]
                                                                        }],
                                                                      }
                                                                    ]
                                                         
                                   },
                                   {"name":"Triggers","type":"UI","requests": 4339,"perf":4300,
                                    "children":[
                                      { "name":"Trigger1","requests": 4339,"perf":4300,
                                                  
                                                              "children":[{"name":"CallOut1","children":[{"name":"callouttime","perf":500}]},
                                                                          {"name":"SOQL", "children":[{"name":"dbtime","perf":500},
                                                                          {"name":"NumOfSOQL","count":500},
                                                                         {"name":"Buffers","count":53300}]
                                                                          }]},
                                                
                                                  ]
                                                }
                                  
                                  
                                  
                                  ]
      
                }
      }
}