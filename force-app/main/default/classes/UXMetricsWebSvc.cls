@RestResource(urlMapping = '/UXMetrics/*')

global class UXMetricsWebSvc {

/*public Cache.OrgPartition ufPart;
     
//Public  UXMetricsWebSvc()
//{-
     //ufPart = Cache.Org.getPartition('local.UXMetrics');
}*/
@HttpPost     
global static void  postMetricsJson()
{  
	system.debug('Start : postMetricsJson');

    String httpPostRequestBodyStr = RestContext.request.requestBody.toString();
    system.debug('Http Post Body Data '+httpPostRequestBodyStr);
    
	// Read Json Body
    //https://salesforce.stackexchange.com/questions/241401/how-to-read-request-body
    
    Map<String, Object> jsonObject = (Map<String, Object>)JSON.deserializeUntyped(httpPostRequestBodyStr);
   	//system.debug('PageName: '+(String) jsonObject.get('PageName') +',EPT' + (String) jsonObject.get('EPT'));
	
   //Writing to Cache
    Cache.OrgPartition ufPart = Cache.Org.getPartition('local.UXMetrics'); 
    //TODO: Uniques generation --- error handling also to be done 
    ufPart.put('eptMetrics',jsonObject);

	system.debug('End : postMetricsJson');

}  
@HttpGet
global static String getMetricsJson()
{   
    Cache.OrgPartition ufPartget = Cache.Org.getPartition('local.UXMetrics');
    Object jsonObject = (Object)ufPartget.get('eptMetrics');
    system.debug('jsonObject from Cache :' +jsonObject.toString());
    
    return jsonObject.toString() ;
}
}