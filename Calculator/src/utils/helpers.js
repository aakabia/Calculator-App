
export default class Calc {
    constructor(firstValue, secondValue){
        this.firstValue = firstValue
        this.secondValue = secondValue
        this.keys = []
        this.handleKeyClick = this.handleKeyClick.bind(this);
        // Above, we bind handle key click to maintin the context of this. 
    }

    // Above is our constructor for our object so far 



    handleKeyClick(event) {
        this.getFirstValue(event, this.updateFirstNumCallback); 
        // here we use this to pass the function as a argumunt to getFirstValue
    }

    // We use handle click to call getFirstvalue with the event and our callback function as argumnet
    // Handle click passes our event to get first Value to handle  


    getKeysFirst(upDateFunction){
        
        
        this.updateFirstNumCallback = upDateFunction  // store our update function for later use 
        this.keys = document.querySelectorAll(".key");
        this.keys.forEach(key => {
            key.addEventListener('click', this.handleKeyClick);
            // pass the binded handlekey click which will also have access to updateFirstNumCallback
            
     
        });

        
        
    }


    getFirstValue(event, updateFirstNumCallback){
        event.stopPropagation();
        this.firstValue = this.firstValue + event.target.textContent; // Use textContent of the clicked key
        console.log((this.firstValue));
        updateFirstNumCallback() // call our updatedate function here.
        // We dont use this to call this function because it is a param and not a instance variable at this point 
        
        
    }

    // getfirstValue is a event handler that takes in our updateFunction 
    // it sets firstValue to our event.target.text content 
    // last it calls update function in order to update our firstNum in clac.jsx




    cleanup() {
        this.keys.forEach(key => {
            key.removeEventListener('click', this.handleKeyClick);
        });
    }
    // Above is used as our clean up for use effect when our COMPONENT is unmounted.


 



}