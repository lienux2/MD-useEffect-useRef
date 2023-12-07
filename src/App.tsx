import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);
  const [writeSomething, setWriteSomething] = useState([]);
  const [writeSomethingInputValue, setWriteSomethingInputValue] = useState('');
  const [color, setColor] = useState('');
  const [coloredDiv, setColoredDiv] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  let [font, setFont] = useState(16);
  const inputRef = useRef(null);
  const goldDiv = useRef('white')

  const handleAddColoredDiv = () => {
    if (color) {
      const newColorDivs = [...coloredDiv, {color: color}];
      setColoredDiv(newColorDivs);
      setColor('');
    }
  }

  useEffect(() => {
    setCount3(100);
    const timeoutId = setTimeout(() => {
      setDisabledButton(false);
      setCount3(0);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleCountAndFont = (e) => {
    setCount3((count3) => count3 + 1)
    setFont((font) => font + 1)
  }

  return (
    <>
      <div className='forms'>
        <input type="text" placeholder='Write something...' autoFocus/>
      </div>

      <div className='forms'>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newArray = [...writeSomething, writeSomethingInputValue]
          setWriteSomething(newArray)
          localStorage.setItem('something', JSON.stringify(newArray))
          setWriteSomethingInputValue('')
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}>
        <input ref={inputRef} type="text" placeholder='Write something...' value={writeSomethingInputValue} onChange={(e) => {
          setWriteSomethingInputValue(e.target.value)
        }}/>
        <button className='large-button'>Submit</button>
        </form>
      </div>

      <div className='forms'>
      <ul>
          {writeSomething.map((something: string) => {
            return (<li key={something}>{something}</li>)
          })}
        </ul>
      </div>

      <div className='forms'>
        <button className='large-button' disabled={disabledButton}>Poga</button>
      </div>

      <div className='forms'>
        <button className='large-button' onClick={() => setCount((count) => count + 1)}>Count: {count}</button>
      </div>

      <div className='forms'>
        <div className='square'>
          <p>{count * 2}</p>
        </div>
      </div>

      <div className='forms'>
        <button className='small-button' onClick={handleAddColoredDiv}>+</button>
        <select name="" id="" value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="" disabled>Color dropdown</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>

      <div className='forms'>
        {coloredDiv.map((item, index) => (
          <div key={index} className={`color-box ${item.color}`}></div>
        ))}
      </div>

<hr />

<div className='forms-image2'>
  <button className='small-button' onClick={() => setCount2((count2) => count2 + 1)}>+</button>
    <p>COUNT: {count2}</p>
    <input type="text" value={inputValue} onChange={handleInputChange} />
    <p>{inputValue}</p>
</div>

<div className='forms-image2'>
  <button className='small-button' onClick={handleCountAndFont}>+</button>
  <p style={{fontSize: `${font}px`}}>COUNT: {count3}</p>
  <input type="text" value={inputValue2} onChange={handleInputChange2} />
  <p>{inputValue2}</p>
</div>

<hr />

<div className='forms-image3'>
  <button className='large-button' onClick={() => goldDiv}>Change color</button>
  <div style={{backgroundColor: `${goldDiv}`}} className='empty'></div>
</div>

<div className='forms-image3'>
  <button>Clone div</button>
  <div className='empty'></div>
</div>

<div className='forms-image3'>
  <button>Send div to corner</button>
  <div className='empty'></div>
</div>
    </>
  )
}

export default App
