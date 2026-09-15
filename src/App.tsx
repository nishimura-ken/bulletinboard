import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateThread from "./pages/CreateThread";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threads/new" element={<CreateThread />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
