import { LightningElement ,track ,wire} from 'lwc';
//import LightningAlert from 'lightning/alert';
import getFromWebsiteDemoPlatformCache from '@salesforce/apex/putDataInUFWebsiteCache.getFromWebsiteDemoPlatformCache'
import getCotactAndOpptyCount from '@salesforce/apex/putDataInUFWebsiteCache.getCotactAndOpptyCount'
import getContactName from '@salesforce/apex/putDataInUFWebsiteCache.getContactName'
import getOpportunityName from '@salesforce/apex/putDataInUFWebsiteCache.getOpportunityName'
//import putAccountsInWebsiteDemoPlatformCache from '@salesforce/apex/putDataInUFWebsiteCache.putAccountsInWebsiteDemoPlatformCache'
const accountsTable = 
 
    [

        {label: 'AccountName',fieldName: 'Name', type: 'text'}, 
        {label: 'Phone', fieldName: 'Phone', type: 'Phone'},
        {label: 'Type', fieldName: 'Type', type: 'text'},
        {label: 'Employees', fieldName: 'NumberOfEmployees', type: 'text'},
        {label: 'Industry', fieldName: 'Industry', type: 'text'},
        {label: 'AccountNumber', fieldName: 'Id', type: 'text'},
      
     
    ];
const selectedAccountTable = 
[

    {label: 'AccountName',fieldName: 'Name', type: 'text'}, 
    {label: 'Phone', fieldName: 'Phone', type: 'Phone'},
    {label: 'Type', fieldName: 'Type', type: 'text'},
    {label: 'Employees', fieldName: 'NumberOfEmployees', type: 'text'},
    {label: 'Industry', fieldName: 'Industry', type: 'text'},
   
];
const contactNameTable = 
[ 
    {label: 'Name',fieldName: 'Name', type: 'text'}, 
    {label: 'Phone', fieldName: 'Phone', type: 'text'},
    {label: 'Email', fieldName: 'Email', type: 'email'},
     
];

const OpptyNameTable = 
[ 
    {label: 'Name',fieldName: 'Name', type: 'text'}, 
    {label: 'Amount', fieldName: 'Amount', type: 'text'},
    {label: 'CloseDate', fieldName: 'CloseDate', type: 'Date'},
    {label: 'StageName', fieldName: 'StageName', type: 'text'},
    {label: 'Type', fieldName: 'Type', type: 'text'},
];


export default class AccountsInsightLWC extends LightningElement {
    @track accountsList ;
    @track accountsTable = accountsTable ;
    @track selectedAccountTable = selectedAccountTable;
    @track accountId ;
    @track mapData ;
    @track contactNameTable = contactNameTable;
    @track OpptyNameTable = OpptyNameTable;
    @track contactNameData ;
    @track OpportunityNameData;
    @track OpptyNameData;

   
    selectedAccountRow = new Array();
    showAccountTable = true;
    showselectedAccountTable = false;
    showGrid = false;
    showContactOpptyName = false;
    showOpptyName = false;
    contactCount =0;
    OpptCount = 0;
    totalOpptyAmount = 0;
    accountIdInput = this.accountId;
  
    
   
    @wire(getFromWebsiteDemoPlatformCache)
    getFromWebsiteDemoPlatformCache({data,error})
    {
        if(data)
        {
          
           console.log("This is the data",data); 
           this.accountsList = data;
           this.accountsList = this.accountsList.slice(0,50); // Limiting the account to 50 
           let hideAccId  = accountsTable.filter(col => col.label !== 'AccountNumber'); // hide the account number from the datatable being shown 
           this.accountsTable  = hideAccId;
           
        }
        else if(error)
        {
           
            console.error();
            
        }

       
    }
    
      
    selectedRows(event)
    {
        this.showAccountTable = false;
        this.showGrid = true;
        this.showselectedAccountTable = true;
      
        
        this.rowSelected = event.detail.selectedRows;
        console.log("Selected Row Data:", +this.rowSelected.length);
        for (let i = 0; i < this.rowSelected.length; i++) {
            
            this.accountId = this.rowSelected[i].Id;
            this.selectedAccountRow = this.rowSelected;
            console.log("Selected AccountID:", this.rowSelected[i].Id);
            
        }
       
    }

    

    @wire(getCotactAndOpptyCount,{accountId:'$accountId'})
       getCotactAndOpptyCount({data, error})
      {
        if(data)
       {
            console.log("Data from map:", data)
            
            let mapData = data;
           
            console.log("mD;", mapData);
            this.contactCount = mapData.contact[0].ContactCount;
            this.OpptCount = mapData.Oppty[0].Opportunity;
            this.totalOpptyAmount = mapData.Oppty[0].TotalAmount;
                    // console.log('OpportunityCount:', mapData.Oppty[0].Opportunity);
                    // console.log('OpportunityAmount:',mapData.Oppty[0].TotalAmount);
                    // console.log('ContactCount:',mapData.contact[0].ContactCount);
                    
       }
       if(error)
       {
            console.log("Error", error) 
            console.log("AccountID from Error", this.accountId);       
       }
       return this.mapData;
    }
            // @wire(getContactOpportunityName,{accountId:'$accountId'})
            // getContactName({data,error})
            // {
            //     if(data)
            //     {
            //         console.log('Data from contactName:', data);
            //         this.contactNameData = data;
            //     }
            // }
    handleContactClick()
    {
        this.showContactOpptyName = true
        this.showOpptyName = false
        //let acctId = event.target.dataset.id;
        //console.log('Account ID from handleContactClick:', acctId);
        console.log('Printing account id From selected row', this.accountId);
       
        getContactName({accountId: this.accountId})
        .then((result)=> {
            
            console.log('Result from imperative call from Contact:', result);
            this.contactNameData = result;
            this.error = undefined;

        })
        .catch((error)=>{

            this.error = error;
            this.contact = undefined;
        });
                   
    }
    handleOpptyClick()
    {
        this.showOpptyName = true
        this.showContactOpptyName = false
        console.log('Printing account id From selected row', this.accountId);
        //this.showContactOpptyName = true
        getOpportunityName({accountId: this.accountId})
        .then((result)=> {
            
            console.log('Result from imperative call from oopty:', result);
            this.OpptyNameData = result;
            this.error = undefined;

        })
        .catch((error)=>{

            this.error = error;
           // this.contact = undefined;
        });
                   
    }
    close()
    {
       this.showAccountTable = true;
       this.showGrid = false;
       this.showselectedAccountTable= false;
       this.template.querySelector('lightning-datatable').rowSelected = [];
       this.selectedAccountRow = [];
       this.showContactOpptyName = false;
       this.showOpptyName = false;
       this.contactAndOpptyNameData = [];
     
    }

    connectedCallback()
    {
        getCotactAndOpptyCount();
        getContactName();
        getOpportunityName();
    }
}