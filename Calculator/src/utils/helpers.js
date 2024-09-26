export default class Calc {
  constructor(firstValue, secondValue) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.keys = [];
    this.operators = [];
    this.handleKeyClick = this.handleKeyClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    // Above, we bind handle key click to maintin the context of this.
    // Also we bind handle operator click to maintain the context of this
  }

  // Above is our constructor for our object so far

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

    const operatorsToCheck = ["+", "-", "*", "/"];

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

    const operatorsToCheck = ["+", "-", "*", "÷"];
    // Above is our operator array

    const isOperator = operatorsToCheck.includes(event.target.textContent);
    // Above, is our if our event target matches a operator from our operator array
    // This will be a boolean that will be stored in a variable with every click.

    const input = event.target.textContent;
    // Above we assign our event target to a variable

    if (this.firstValue === "" && isOperator) {
      return;
    }

    // Note: this is what prevents multiple operators before a number is input.
    // If our first value is empty and we click a operator we just want to return
    // we get the operator to check against our array from our event.

    this.firstValue = this.secondValue + this.firstValue + input; // update first value with input and second value
    this.secondValue = this.firstValue; // Update secondValue with first value.
    this.firstValue = ""; // Clear firstValue for the next input

    // Above, updates our second and first value in our class instance once a operator becomes present.

    updateSecondNumCallBack();
    updateFirstNumCallback();

    // Above we call both our call backs to update our first and second value in our component.
  }

  operatorCleanup() {
    this.operators.forEach((operator) => {
      operator.removeEventListener("click", this.handleOperatorClick);
    });
  }
  // Above is clean up for our operator event listener.
}
