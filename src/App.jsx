import { useState } from 'react'
import './App.css'
import MUITable from './components/MUITable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MUITable />
    </>
  )
}

export default App
