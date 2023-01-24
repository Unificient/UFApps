public class  PFtriggerHandler {
    
   public void beforeInsertValidation(String scriptName)
    {
           system.debug('Trigger Created');
    }

    public   String afterInsertgetScriptName(String scaleTestName)
    {     
            scaletest__c sname = [SELECT scaleproject__r.scriptname__c,Id,Name FROM scaletest__c where name =:scaleTestName];
            String scaleTName = sname.scaleproject__r.scriptname__c;
            system.debug('Title:'+scaleTName);
            return scaleTName;
            
    }
    Public  String afterInsertgetScriptId(String scaleTestName)
    {   
        String scaleTName = scaleTestName;
        ContentVersion scaletestID = [SELECT Title, Id FROM ContentVersion where title = :scaleTName];
        system.debug('TestID'+scaletestID.Id);
        String testScriptID = scaletestID.Id;
        return testScriptID;
        
    }
    public void runAWS(String machineName, String machineSize, String noofInstances, String scriptID)
        
    {    
        
        AwsEC2.runInstance(machineName,machineSize,noofInstances,scriptID);
        
    }    
    

}