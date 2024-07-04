import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let charList = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let pass = "";
    if(number) charList += "0123456789";
    if(character) charList += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * charList.length +1);
      pass += charList.charAt(char)
    }

    setpassword(pass);  
}, [length,number,character,setpassword]);

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-4xl text-center text-white'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-4'>
          <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-dashed bg-blue-700 text-white px-3 py-1 shrink-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-2'>
            <input  
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
            <div className='flex items-center gap-x-2'>
              <input
              type="checkbox"
              defaultChecked={number}
              onChange={(e) => setNumber(e.target.checked)}
              />
              <label>Numbers</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input
              type="checkbox"
              defaultChecked={character}
              onChange={(e) => setCharacter(e.target.checked)}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
