import DetailCard from "./components/DetailCard/DetailCard"
import HomePage from "./components/HomePage/Home"
import LandingPage from "./components/LandingPage/LandingPage"
import { Routes, Route, useLocation } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import FormPage from "./components/FormDriver/FormDriver"

function App() {

  const location = useLocation()

  return (
    <>
      {location.pathname !== '/' && <NavBar/> }
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/home/detailpage/:id" element={<DetailCard/>}/>
      <Route path="/createdriver" element={<FormPage/>}/>
    </Routes>
    </>
  )
}

export default App
