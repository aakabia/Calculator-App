import Calc from "../utils/helpers";
import React, { useState, useEffect } from "react";

// Above we import our calc object, useState and useEffect;

function Calculator() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");

  // Above is refernce to our first, second and many other numbers to be selected.

  const calcInstance = new Calc(firstNum, secondNum);

  // Above, is a instance to our calc object.

  const updateFirstNum = () => {
    setFirstNum(calcInstance.firstValue); // Update React state with current firstValue
  };

  // Above is a function that updates our firstNum state with the result from firstValue.

  useEffect(() => {
    calcInstance.getKeysFirst(updateFirstNum);
    // Above we call getKeysFirst and pass our updateFirstNum function to dynamically update firstnum.

    return () => {
      calcInstance.cleanup();
    };
    // Above is our cleanup for when our component unmounts
  }, []);

  // Above use effect is how we handle Side effect.
  // This can include data fetching, subscriptions, manually changing the DOM, logging, and more.

  /* I am using state and useEffect to 
    manage the state of your calculator's first value
    and update it based on user interactions with the UI
  */

  return (
    <section className="container-fluid ">
      <div className="row ">
        <section className="calcGrid">
          <div className="output">
            <div className="secondNum">{secondNum}</div>
            <div className="firstNum">{firstNum}</div>
          </div>

          <button className="spanTwo">AC</button>
          <button>DEL</button>
          <button>÷</button>
          <button className="key">1</button>
          <button className="key">2</button>
          <button className="key">3</button>
          <button>*</button>
          <button className="key">4</button>
          <button className="key">5</button>
          <button className="key">6</button>
          <button>+</button>
          <button className="key">7</button>
          <button className="key">8</button>
          <button className="key">9</button>
          <button>-</button>
          <button>.</button>
          <button className="key">0</button>
          <button className="spanTwo">=</button>
        </section>
      </div>
    </section>
  );
}
// Above we have a container that holds our calulator.
// Inside this container will be a output div that captures our inputs to calculate
// Also, we add all our buttons as well to make the calculator.
// Above, we create our buttons and add our Navbar to it as well.

export default Calculator;
