public with sharing class putDataInUFWebsiteCache {
@AuraEnabled(cacheable=true)    
public static String putAccountsInWebsiteDemoPlatformCache(){
    String cacheKey = 'testKey';
    try{
        List<Account> listOfAccounts = [SELECT Name, AccountNumber FROM Account LIMIT 5];
        system.debug('Account List:'+listOfAccounts);
        Cache.OrgPartition partitionName = Cache.Org.getPartition('local.WebsiteDemoPlatformCache'); 
        partitionName.put(cacheKey,listOfAccounts);// Need to generate a key right now it is hard coded.
    }
    catch(DMLException e)
    {
        system.debug('DML Error Returned:'+e.getMessage());
    }
     return cacheKey;
}   
//This method will be called from lWC
public static List<Account> getFromWebsiteDemoPlatformCache() {
    List<Account> cachedAccounts;
    try{ 	    
        String cacheKey = 'testKey';
        Cache.OrgPartition partitionName = Cache.Org.getPartition('local.WebsiteDemoPlatformCache'); 
        cachedAccounts = (List<Account>)partitionName.get(cacheKey);
        system.debug('Account List From Cache:'+cachedAccounts);
        for(Account accId : cachedAccounts)
        {
            system.debug('Pinting the Account Id:'+accId.Id);
        }
    
      }
    catch(System.NullPointerException error)
    {
        System.debug('Error Returned:'+error.getMessage());
        throw error;
        
    }
    return cachedAccounts;    
}
    
public static void getCotactAndOpptyCount(String accountId)
{
  
  Map<String, object> m = new Map<String, object>();
  //Contacts count for a given account id = 0010H00002vGMTRQA4   
  AggregateResult[] contactCount =[SELECT AccountId, COUNT(Id) ContactCount FROM Contact WHERE AccountId= :accountId GROUP BY AccountId];
  system.debug('Contact Count for the AccountId:'+contactCount[0].get('ContactCount'));
  m.put('contact',contactCount);
  //opportunity count for given account id 
  AggregateResult[] opptyCount = [Select Count(Name) Opportunity From Opportunity Where AccountId= :accountId];
  system.debug('Opportunuty Count for the AccountId:'+opptyCount[0].get('Opportunity'));
  m.put('Oppty',opptyCount);
  system.debug('From Map:'+m.get('contact'));   
    
    
}
}