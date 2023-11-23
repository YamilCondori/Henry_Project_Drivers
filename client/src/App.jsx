import HomePage from "./components/HomePage/Home"
import LandingPage from "./components/LandingPage/LandingPage"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<HomePage/>} />
    </Routes>
    </>
  )
}

export default App
