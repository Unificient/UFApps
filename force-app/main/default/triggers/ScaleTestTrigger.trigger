trigger ScaleTestTrigger on scaletest__c (after insert, before insert) 

{
  PFtriggerHandler pfHandler = new   PFtriggerHandler();
  
   if(Trigger.isInsert)
   { 
     scaletest__c newTest =  Trigger.new[0]; 
     String newScaleTestName = newTest.name;
     
    if(Trigger.isBefore)
      {
        pfHandler.beforeInsertValidation(newScaleTestName); //calling the methods here
       
      }
      else
      {
        String scriptName = pfHandler.afterInsertgetScriptName(newScaleTestName); // get the script id 
        String scriptID =  pfHandler.afterInsertgetScriptId(scriptName); 
        //pfHandler.runAWS();  
      }
   }

    
}