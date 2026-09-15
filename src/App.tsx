import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateThread from "./pages/CreateThread"
import Thread from "./pages/Thread"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threads/new" element={<CreateThread />} />
        <Route path="/threads/:thread_id" element={<Thread />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
