export default class Calc {
  constructor(firstValue, secondValue) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.keys = [];
    this.operators = [];
    this.deleteOneBtn;
    this.handleKeyClick = this.handleKeyClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteAllClick = this.handleDeleteAllClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);

    // Above, we bind handleKeyClick,handleDeleteClick,handleDeleteAllClick to maintin the context of this.
  }

  // Above is our constructor for our object so far

  // KEYS SECTION BELOW

  handleKeyClick(event) {
    this.getFirstValue(event, this.updateFirstNumCallback);
    // here we use "this" to pass the function as a argumunt to getFirstValue
  }

  // We use handle click to call getFirstvalue with the event and our callback function as argumnet
  // Handle click passes our event to get first Value to handle

  getKeysFirst(upDateFunction) {
    this.updateFirstNumCallback = upDateFunction; // store our update function for later use
    this.keys = document.querySelectorAll(".key");
    this.keys.forEach((key) => {
      key.addEventListener("click", this.handleKeyClick);
      // pass the binded handlekey click which will also have access to updateFirstNumCallback
    });
  }

  getFirstValue(event, updateFirstNumCallback) {
    event.stopPropagation();

    const operatorsToCheck = ["+", "-", "*", "/", "÷"];

    if (event.target.textContent === "0" && this.firstValue === "") {
      return; // check if first number is zero and return early
    } else if (
      operatorsToCheck.includes(event.target.textContent) &&
      this.firstValue === ""
    ) {
      return; // check if first number is a operator and return early.
    } else if (
      event.target.textContent === "." &&
      this.firstValue.includes(".")
    ) {
      return; // Do nothing if there's already a decimal point in the number
    } else {
      this.firstValue = this.firstValue + event.target.textContent; // Use textContent of the clicked key
      //console.log(this.firstValue);
      updateFirstNumCallback(); // call our updatedate function here.
      // We dont use "this" to call this function because it is a param and not a instance variable at this point
    }
  }

  // getfirstValue is a event handler that takes in our updateFunction
  // it sets firstValue to our event.target.text content
  // last it calls update function in order to update our firstNum in clac.jsx

  keysCleanup() {
    this.keys.forEach((key) => {
      key.removeEventListener("click", this.handleKeyClick);
    });
  }
  // Above is used as our clean up for use effect when our COMPONENT is unmounted.

  // OPERATOR SECTION BELOW:

  handleOperatorClick(event) {
    this.getSecondValue(
      event,
      this.updateFirstNumCallback,
      this.updateSecondNumCallBack
    );
  }

  // Above is our handleOperatorClick function that our event passes to and this fucntion passes the event to getSecondValue
  // This function thakes in our two callback functions for updating our react component.
  //Note: this fucntion must be bound to to this object or we may lose the context of "this" in the object.

  getOperatorFirst(updateSecondNumCallBack) {
    this.updateSecondNumCallBack = updateSecondNumCallBack;
    this.operators = document.querySelectorAll(".operator");
    this.operators.forEach((operator) => {
      operator.addEventListener("click", this.handleOperatorClick);
    });
  }

  // Above is our getOperatorFirst that gets the operators and assigns a event listener to each one.
  // This function takes in a callback function that we store as a variable for later use in getSecondValue

  getSecondValue(event, updateFirstNumCallback, updateSecondNumCallBack) {
    event.stopPropagation();

    const operatorsToCheck = ["+", "-", "*", "÷", "/"];
    // Above is our operator array

    const isOperator = operatorsToCheck.includes(event.target.textContent);
    // Above, is our if our event target matches a operator from our operator array
    // This will be a boolean that will be stored in a variable with every click.

    const input = event.target.textContent;
    // Above we assign our event target to a variable

    if (this.firstValue === "" && this.secondValue === "") {
      return;
    }

    // Note: this is what prevents multiple operators before a number is input.
    // If our first value is empty and we click a operator we just want to return
    // we get the operator to check against our array from our event.

    if (
      operatorsToCheck.includes(
        this.secondValue.charAt(this.secondValue.length - 1)
      ) &&
      isOperator &&
      this.firstValue === ""
    ) {
      let newString = this.secondValue.slice(0, -1);
      this.secondValue = newString + input;
      updateSecondNumCallBack();
      //console.log("updated");
      return;
    }

    // Above, checks if our last charcter of second value is a operator and if our event is a operator.
    // If it is we simply update second value and return.
    // This allows us not to have consecutive operators.

    this.firstValue = this.secondValue + this.firstValue + input; // update first value with input and second value
    this.secondValue = this.firstValue; // Update secondValue with first value.
    this.firstValue = ""; // Clear firstValue for the next input

    // Above, updates our second and first value in our class instance once a operator becomes present.

    updateSecondNumCallBack();
    updateFirstNumCallback();
    return;

    // Above we call both our call backs to update our first and second value in our component.
  }
  // Above, we get the second value.

  operatorCleanup() {
    this.operators.forEach((operator) => {
      operator.removeEventListener("click", this.handleOperatorClick);
    });
  }
  // Above is clean up for our operator event listener.

  /// DELETE BUTTONS BELOW!

  handleDeleteClick(event) {
    this.daleteOne(
      event,
      this.updateFirstNumCallback,
      this.updateSecondNumCallBack
    );
  }
  // Above, handleDeleteClick calls delete one and passes our updated callbacks as arguments.

  getDeleteOneOperator() {
    this.deleteOneBtn = document.querySelector(".deleteOne");
    this.deleteOneBtn.addEventListener("click", this.handleDeleteClick);
  }
  // getDeleteOneOperator adds a event listener to our delete btn and calls this.handleDeleteClick as a callback.

  daleteOne(event, updateFirstNumCallback, updateSecondNumCallBack) {
    if (!this.firstValue == "") {
      let newString = this.firstValue.slice(0, -1);
      this.firstValue = newString;
      updateFirstNumCallback();
      //console.log("update first value")
      return;
    }

    // Above checks if this.firstValue is not empty
    // if it is not we update the value by deleting the last character, assigning it back to this.firstValue and then calling our update callback.

    let newString = this.secondValue.slice(0, -1);
    this.secondValue = newString;
    updateSecondNumCallBack();
    return;

    // Above updates this.secondValue only if this.firstValue is empty
  }

  // Above is our function to delete one character

  handleDeleteAllClick(event) {
    this.deleteAll(
      event,
      this.updateFirstNumCallback,
      this.updateSecondNumCallBack
    );
  }
  // Above, handleDeleteAllClick calls delete one and passes our updated callbacks as arguments.

  getDeleteAllOperator() {
    this.deleteAllBtn = document.querySelector(".deleteAll");
    this.deleteAllBtn.addEventListener("click", this.handleDeleteAllClick);
  }

  // getDeleteAllOperator adds a event listener to our delete All btn and calls this.handleDeleteAllClick as a callback.

  deleteAll(event, updateFirstNumCallback, updateSecondNumCallBack) {
    this.firstValue = "";
    this.secondValue = "";
    updateFirstNumCallback();
    updateSecondNumCallBack();
    //console.log("Deleted All");
    return;

    // Above sets both values to empty strings and calls our update callback functions.
  }
  // Above is our function to delete all inputs for first and second value.

  handleDeleteCleanUp() {
    this.deleteOneBtn.removeEventListener("click", this.handleDeleteClick);
    this.deleteAllBtn.addEventListener("click", this.handleDeleteAllClick);
  }
  // handleDeleteCleanUp handles all the clean up for our delete eventlisteners by removing them once unmounted.

  // EQUALS BUTTON SECTION:

  handleEqualClick(event) {
    this.getEqualValue(event, this.equalCallBack);
  }
  // handleEqualClick callsn getEqualValue and passes our equals callaback as a argument.

  getEqualOperator(equalCallBack) {
    this.equalCallBack = equalCallBack;
    this.equalBtn = document.querySelector(".equalBtn");
    this.equalBtn.addEventListener("click", this.handleEqualClick);
  }

  // Above, is our event listener for the equal btn
  // The function assigns our equal callback to a value and passes this.handleEqualClick as a argument to our eventlistener.

  getEqualValue(event, equalCallBack) {
    event.stopPropagation();
    let fixedResult;
    let strResult;

    if (this.firstValue === "" || this.secondValue === "") {
      return;
    }

    // Above checks if first value and second value are present.

    let evalValue = this.secondValue + this.firstValue; // set the value to evalute from second and first value
    let result = equalCallBack(evalValue); // call the evaluate callback with evalvalue as argument.
    strResult = result.toString(); // transform result to string

    if (strResult.includes(".")) {
      fixedResult = result.toFixed(2);
      strResult = fixedResult.toString();
      this.firstValue = strResult;
      this.secondValue = "";
      this.updateFirstNumCallback();
      this.updateSecondNumCallBack();
      return;
    }

    // Above checks if the result includes a "." if it does we limit the decimal place to two.

    //console.log("equlas Btn:", typeof(strResult));
    this.firstValue = strResult; // assign string to firstValue
    this.secondValue = ""; // update second value
    this.updateFirstNumCallback(); // call the firstnum callback to update firstvalue in UI
    this.updateSecondNumCallBack(); // call the secoundNum callback to update secondValue in UI
    return;
  }

  handleEqualsCleanUP() {
    this.equalBtn.removeEventListener("click", this.handleEqualClick);
  }
  // Above, is our cleanup for our equals btn, we simply remove the event listener.
}
