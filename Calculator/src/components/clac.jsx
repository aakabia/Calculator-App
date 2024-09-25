function Calculator() {
  return (
    <section className="container-fluid padN ">
      <div className="row ">
        <section className="calcGrid  ">
          <div className="output">
            <div className="firstNum">418+</div>
            <div className="secondNum">516</div>
          </div>

          <button className="spanTwo">AC</button>
          <button>DEL</button>
          <button>÷</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
          <button>.</button>
          <button>0</button>
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
