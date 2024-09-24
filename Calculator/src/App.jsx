import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="blue">hello</div>
      <div className="text-danger">friend</div>
    </div>
  );
}

export default App;
