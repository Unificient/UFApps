import { LightningElement, api,wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getMetricsJsonFromPlatformCache from'@salesforce/apex/uxMetricsReadFromCache.getMetricsJsonFromPlatformCache';

export default class perfTestFormCmp extends LightningElement {
    @track wiredMetricsDataMethod;
    @track eptdata ;

    @wire(getMetricsJsonFromPlatformCache)
    getMetricsJsonFromPlatformCache({data, error})
    {
      console.log('%c JSON.parse(data)', 'color:red; font-size: x-large; ') ;
      console.log(data);

      if(data){
        this.wiredMetricsDataMethod = JSON.parse(data);
       // this.eptdata = data
      }

    }
    
    @api objectdata
    @api bardata 
    clicked = true
    netrtt
    netdownlink
    prevpage
    chartheight=500
    chartwidth=800

    connectedCallback() {
        this.createData()
       }

    createData()
       
       {     

            this.eptdata = this.wiredMetricsDataMethod.eptmetrics;
            
            //this.eptdata= [{'name':'Home Page','rt':3052,'network':{'rtt':250,'downlink':10,'maxAllowedParallelXHRs':6},'prevoiusPage':{'location':'undefined'},"DefaultComponent":["one:utilityBarItem","one:utilityBarItem","one:utilityBarItem","c:ezwrapper","c:perfTestFormCmp","c:uxtree","c:testLWCLifeCycle"]},{"name":"Accounts","rt":1112,"network":{"rtt":50,"downlink":10,"maxAllowedParallelXHRs":6},"prevoiusPage":{"url":"/lightning/page/home","location":"home:landing","timestamp":null,"app":{"appNamespace":"standard","appName":"LightningSales","appType":"Standard"}},"DefaultComponent":[]},{"name":"AccountsDetail","rt":4734,"network":{"rtt":50,"downlink":10,"maxAllowedParallelXHRs":6},"prevoiusPage":{"location":"undefined"},"DefaultComponent":["one:utilityBarItem","one:utilityBarItem","one:utilityBarItem","force:highlightsPanel","flexipage:tabset","flexipage:tabset","runtime_sales_merge:mergeCandidatesPreviewCard","force:relatedListQuickLinksContainer","force:relatedListContainer","runtime_sales_activities:activityPanel"]},{"name":"AccountsDetail","rt":3579,"network":{"rtt":50,"downlink":10,"maxAllowedParallelXHRs":6},"prevoiusPage":{"location":"undefined"},"DefaultComponent":["one:utilityBarItem","one:utilityBarItem","one:utilityBarItem","force:highlightsPanel","flexipage:tabset","flexipage:tabset","runtime_sales_merge:mergeCandidatesPreviewCard","force:relatedListQuickLinksContainer","force:relatedListContainer","runtime_sales_activities:activityPanel"]},{"name":"Contacts","rt":927,"network":{"rtt":50,"downlink":10,"maxAllowedParallelXHRs":6},"prevoiusPage":{"url":"/lightning/r/Account/0011k00000eZ2uYAAS/view","location":"one:recordHomeFlexipage2Wrapper","timestamp":null,"recordId":"0011k00000eZ2uYAAS","app":{"appNamespace":"standard","appName":"LightningSales","appType":"Standard"}},"DefaultComponent":[]},{"name":"ContactsDetail","prevoiusPage":{"location":"undefined"}},{"name":"ContactsDetail","rt":4354,"network":{"rtt":50,"downlink":10,"maxAllowedParallelXHRs":6},"prevoiusPage":{"location":"undefined"},"DefaultComponent":["one:utilityBarItem","one:utilityBarItem","one:utilityBarItem","force:highlightsPanel","flexipage:tabset","flexipage:tabset","runtime_sales_merge:mergeCandidatesPreviewCard","force:relatedListQuickLinksContainer","force:relatedListContainer","runtime_sales_activities:activityPanel"]}] 

    //this.eptdata = [{'name':'HomePage','ept':2.4,'rtt': 250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6,'location': 'NA' }]
    // objectApiName is "Account" when this component is placed on an account record page
            // this.eptdata = [{'name':'HomePage','rt':2.4,'network':{ 'rtt': 250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'NA' }},
            // {'name':'Account Home','rt':0.4,'network':{ 'rtt': 4501, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'Homepage' }},
            // {'name':'Account Detail','rt':3.4,'network':{ 'rtt': 1250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'AccountDetail' }},
            // {'name':'Contact Home','rt':0.7,'network':{ 'rtt': 5250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'OpptyDetail' }},
            // {'name':'Contact Detail','rt':1.2},
            // {'name':'Oppty Home','rt':0.9},
            // {'name':'Oppty Detail','rt':4.8}] 
       }
    
    
       handleBarChartClicked(event) {
        
        const eptobj = event.detail;
        console.log(' Function handleBarChartClicked ::::::::::::::: got clicked',eptobj)
        // do dome stuff with this detail
        this.clicked = true
        this.netrtt = eptobj.network.rtt
        
        this.netdownlink = eptobj.network.downlink
        if( eptobj.previousPage &&  eptobj.previousPage.location){
          this.prevpage = eptobj.previousPage.location;
        }
    
    }
}