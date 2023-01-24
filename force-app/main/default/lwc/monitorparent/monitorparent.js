import { LightningElement, api } from 'lwc';

export default class Monitorparent extends LightningElement {
    alltabs = true
    overview=true
    numorgs = 2
    @api showoverview() {
        
            this.overview = false
            this.alltabs = true
        }
        

    }