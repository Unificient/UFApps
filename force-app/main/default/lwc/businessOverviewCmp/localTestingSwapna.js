import { LightningElement,api,wire } from 'lwc';
import getMetricsJsonFromPlatformCache from'@salesforce/apex/uxMetricsReadFromCache.getMetricsJsonFromPlatformCache';

export default class localTestingSwapna extends LightningElement
{
  @wire(getMetricsJsonFromPlatformCache)
  getMetricsJsonFromPlatformCache({data, error})
{
    console.log(data);
}
 
}
    