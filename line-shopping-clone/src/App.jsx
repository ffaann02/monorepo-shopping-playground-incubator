import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import NavbarWithBack from './components/layout/NavbarWithBack';
import Shop from './pages/Shop';
import My from './pages/My';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Home from './pages/Home';
import BuyProduct from './pages/BuyProduct';
import "./App.css"
import MenuBar from './components/layout/MenuBar';
import Game from './pages/Game';
import { useLineIntegration } from './hooks/useLine';
import Live from './components/LIVE/Live';

function App() {

  const { logout } = useLineIntegration();

  return (
    <div className=''>
      <Router>
        <Navbar />
        <NavbarWithBack />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/My" element={<My/>} />
          <Route path="/Search" element={<Search/>} />
          <Route path="/Explore" element={<Explore/>} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Product" element={<BuyProduct />} />
          <Route path="/game/:gameId/:orderNumber?/:conditionMatch?" element={<Game/>} />
          <Route path="/live" element={<Live/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <MenuBar />
      </Router>
    </div>
  )
}
export default App
