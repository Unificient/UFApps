import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class perfTestFormCmp extends LightningElement {
    @api objectdata
    @api bardata 
    clicked = true
    netrtt
    netdownlink
    prevpage
    chartheight=500
    chartwidth=800
    @api eptdata 

    connectedCallback() {
        this.createData()
       }

    createData()
       
       {

           //this.eptdata = [{'name':'HomePage','ept':2.4,'rtt': 250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6,'location': 'NA' }]
    // objectApiName is "Account" when this component is placed on an account record page
            this.eptdata = [{'name':'HomePage','rt':2.4,'network':{ 'rtt': 250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'NA' }},
            {'name':'Account Home','rt':0.4,'network':{ 'rtt': 4501, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'Homepage' }},
            {'name':'Account Detail','rt':3.4,'network':{ 'rtt': 1250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'AccountDetail' }},
            {'name':'Contact Home','rt':0.7,'network':{ 'rtt': 5250, 'downlink': 2.45, 'maxAllowedParallelXHRs': 6},'previousPage': { 'location': 'OpptyDetail' }},
            {'name':'Contact Detail','rt':1.2},
            {'name':'Oppty Home','rt':0.9},
            {'name':'Oppty Detail','rt':4.8}] 
       }
    
    
    handleProductClicked(event) {
        
        const eptobj = event.detail;
        console.log('handleProductClicked ::::::::::::::: got clicked',eptobj)
        // do dome stuff with this detail
        this.clicked = true
        this.netrtt = eptobj.network.rtt
        this.netdownlink = eptobj.network.downlink
        this.prevpage = eptobj.previousPage.location
    
    }
}