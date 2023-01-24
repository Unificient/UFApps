import { LightningElement, track } from 'lwc';

export default class TestLWCLifeCycle extends LightningElement {

@track greeting = "First LWC Compotent" 

greetUser(evt)
{
    let inputTxt = this.template.querySelector('.txtInput');
    this.greeting = inputTxt.Value;
}

}