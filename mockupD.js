var d = 

{
    "apex": [
                {   
                "classname":"EzProdList",
                 "methodname":"getProdListPrice",
                 "methodExecutionTime":"10",
                "soql":[
                        {"soqlObjectName":"Products2","soqlExecutionTime":"3"}
                    ],
                "triggers":[
                            {"triggerName":"Customer",
                            "triggerType":"Insert",
                            "eventType":"Befor_Insert",
                            "triggerExecutionTime":"2"
                            },
                            {
                            "triggerName":"Customer",
                            "triggerType":"Insert",
                            "eventType":"After_Insert",
                            "triggerExecutionTime":"2"
                            }
                        ]
                 },
                 {   
                    "classname":"EzProdList2",
                     "methodname":"getProdListPrice2",
                    "soql":[
                            {"soqlObjectName":"Products11111","soqlExecutionTime":"3"},
                            {"soqlObjectName":"Contacts","soqlExecutionTime":"13"}
                            
                        ],
                    "triggers":[
                                {"triggerName":"Customer",
                                "triggerType":"Insert",
                                "eventType":"Befor_Insert",
                                "triggerExecutionTime":"2"
                                },
                                {
                                "triggerName":"Customer",
                                "triggerType":"Insert",
                                "eventType":"After_Insert",
                                "triggerExecutionTime":"2"
                                }
                            ]
                     }
                
                
                ],                                
    "triggers":[{   "triggerName":"Customer",
                    "triggerType":"Insert",
                    "eventType":"Befor_Insert",
                    "triggerExecutionTime":"2"
                    },
                    {
                    "triggerName":"Customer",
                    "triggerType":"Insert",
                    "eventType":"After_Insert",
                    "triggerExecutionTime":"2"
                    }
                ],
    "callouts": [
        {"calloutName":"UXMetrics","calloutExecutionTime":"4"}
    ],
    "automatedProcess":[
                        {
                            "workflowRules":{"name":"","executionTime":"2"},
                            "assignmentRules":{"name":"","executionTime":"1"},
                            "validationRules":{"name":"","executionTime":"4"},
                            "approvalProcess":{"name":"","executionTime":"5"}  
                        }
                    ]
}

;

console.log(d.callouts); 