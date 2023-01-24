public with sharing class RunPerfTest {
    
    
    public RunPerfTest() {
        //
    }
    //Take test parameters, send it to Queue
    //Parameters are 
    //Num users, rampup: Yes/No, Scheduled Time: Date time, duration of test
    @InvocableMethod
    public static void executeTest(List<String> testId) {
        //Calculate the number of machines needed based on number of users
        //If rampup - How many users added in how many minutes
        //Schedule - optional - now or later. //TBD
        //Number of minutes to run the test
        //Add these params to SQS queue
        //AwsSQS.SendMessage(numusers,testduration);----
        //Start Instances//
        //Needs userdata string//
        //Type of image to start//
        String scriptzipId = null;
        String userData = null;
        Decimal testduration = 0;
        Decimal userload = 0;
        Decimal nummachines = 0;
        scaletest__c st = [ select Id, testduration__c, userload__c, Name,scaleproject__r.Id,scaleproject__r.Name,scaleproject__r.scriptname__c from scaletest__c where Id IN :testId ];
        System.debug('Test params'+st.testduration__c+' '+st.userload__c+' '+st.Name+st.scaleproject__r.Name);
        testduration = st.testduration__c;
        userload = st.userload__c;
        if (st.userload__c <= 150) { //Custom setting
            nummachines = userload / 5; //Enforce even number for userload via UI
        }
        else {
            System.debug('Too much load');//Throw exception//
        }
        //Get Scripts zip file
        if ( st.scaleproject__r.Id != null ) {
            scriptzipId = getScripts(st.scaleproject__r.Id);
        }
        else {
            System.debug('Scale Test does not exist for project: '+st.Name);//Throw exception//
        }
        if (scriptzipId != null) {
            userData = buildUserData(scriptzipId);
            
        }
        //startInstances();//Fruther conditions are checked there.
        if ((userload > 0) && (testduration > 0 ) && (userData != null )) {
            System.debug('Starting instances');
            //String response = AwsEC2Instance.startInstances(userData,'ami-05e00da24aba682c3','t1.micro',1);
            //AwsEC2Instance.startInstances(userData,'ami-05e00da24aba682c3','t1.micro',1);
            //AwsMachineMap.processResponse(response);
            AwsEC2.runInstance('ami-05e00da24aba682c3','t1.micro','1','0691k000001YTi8AAG');
        }  
    }
    public static String getScripts(String projectId) {
        //\'a011k000004WZT0AAO\
        ContentDocumentLink[] cdl = [ SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId=:projectId ];
        List<String> xx = new List<String>();
        for (ContentDocumentLink cd: cdl) {
            xx.add(cd.ContentDocumentId);
        }
        ContentVersion cv =  [SELECT ID, Title FROM ContentVersion WHERE ContentDocumentId IN : xx limit 1];
        System.debug('cv'+cv+' '+cv.Title);
        if (cv.Id!=null) {
            return cv.Id; //Script zip file ID//
        }
        else {
            return null;
        }
    }
    public static String buildUserData(String scriptsfileId) {
        Blob udblob = Blob.valueOf('#!/bin/bash' + 
            '\n' +
            'echo "Hello" > hello.txt'
            + '\n'
        );
        return EncodingUtil.base64Encode(udblob); 
    }
}