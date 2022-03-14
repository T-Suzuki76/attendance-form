import { BrowserRouter, Route, Routes } from "react-router-dom"
import Attend from "./Attend"
import List from "./List"
import Login from "./Login"
import Pre from "./Pre"
import Success from "./Success"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="pre" element={<Pre/>}/>
        <Route path="attend" element={<Attend/>}/>
        <Route path="success" element={<Success/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="list" element={<List/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
