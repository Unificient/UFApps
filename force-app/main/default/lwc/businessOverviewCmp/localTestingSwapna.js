var jsonObject = {"summary": 
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
           "TotalNoofPages" : 10,
           "PagesOptimized" : 5,
           "PagesNotOptimized" : 5
        },  
        {  
          "Name" : "Adoption",
          "TotalNoofPages" : 10,
          "PagesOptimized" : 7,
          "PagesNotOptimized" : 5
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
      
        "DataGoverness" :
        [{
     
        }],
        "AutomatedProcess":
        [{
     
        }]
     
       },
     "SummaryNumber": 1
     };

     
function parseArrayOfObjectsForDisplay(eptProcessedPagesObjectArray){

        var rows = [];
        //Way1 
        // for(var eptProcObj of eptProcessedPagesObjectArray){
        //     console.log('\n WAY 1 - Name:'+eptProcObj.Name + ',TotalNoofPages:' + eptProcObj.TotalNoofPages + ',PagesOptimized:'+eptProcObj.PagesOptimized);
        //     console.log(` \n WAY1 LOG - Name: ${eptProcObj.Name} , TotalNoofPages:${eptProcObj.TotalNoofPages }, PagesOptimized:${eptProcObj.PagesOptimized } `)

        //   }
        
       

        //   //Way2 Processing all elements one by one without knowing name
        //   eptProcessedPagesObjectArray.forEach(eptProcObj => {
        //     for (let key in eptProcObj) {
        //       console.log(`  \n WAY2 - ${key}: ${eptProcObj[key]}`)
        //     }
        //   })

         //Way3 - Proceess 
         eptProcessedPagesObjectArray.forEach((eptProcObj,i) => { 

            console.log(`\n Row${i}  - Name: ${eptProcObj.Name} , TotalNoofPages:${eptProcObj.TotalNoofPages }, PagesOptimized:${eptProcObj.PagesOptimized } ,PagesNotOptimized:${eptProcObj.PagesNotOptimized}`)
            rows.push(`Name: ${eptProcObj.Name} , TotalNoofPages:${eptProcObj.TotalNoofPages }, PagesOptimized:${eptProcObj.PagesOptimized } ,PagesNotOptimized:${eptProcObj.PagesNotOptimized}`)
            //rows.push(eptProcObj.Name,eptProcObj.TotalNoofPages,eptProcObj.PagesOptimized,eptProcObj.PagesNotOptimized);
            console.log(rows);
          });
     }


     parseArrayOfObjectsForDisplay(jsonObject.summary.UserExperience);
     //parseArrayOfObjectsForDisplay(jsonObject.summary.BusinessLogic);
    // parseArrayOfObjectsForDisplay(jsonObject.summary.DataGoverness);



    