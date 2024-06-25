import React, { useState } from 'react';

function Test_mj() {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
  
    return (
      <div>
        <h1>Hello, React!</h1>
        <p>This is a simple test component.</p>
      </div>
    );
  }

export default Test_mj
