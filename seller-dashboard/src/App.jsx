import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import GettingStart from './pages/overview/GettingStart';
import Topbar from './layout/Topbar';
import GameEditor from './pages/activities/GameEditor';
import SelectGame from './pages/activities/SelectGame';

import WheelSpinner from './components/gameEditorPage/gameList/WheelSpinner';
import Analysis from './pages/analysis/Analysis';
import { UserContext } from './contexts/UserContext';
import { useLineIntegration } from './hooks/useLine';
import Setting from './pages/Setting';
import { WheelProvider } from './contexts/WheelContext';
import GiftList from './pages/gift/GiftList';
import GameLive from './pages/activities/GameLive';
import CouponList from './pages/gift/CouponList';
import AddCoupon from './pages/gift/AddCoupon';
import AddGift from './pages/gift/AddGift';
import RewardHistory from './pages/RewardHistory';

function App() {
  const { logout } = useLineIntegration();

  return (
    <>
      <Router>
        <Topbar />
        <div className="grid grid-cols-12 relative font-IBMth">
          <Sidebar />
          <div className='absolute p-4 -z-10 w-full h-full flex' id="loading_popup">
            <span className="loading loading-dots w-24 bg-purple-600 mx-auto -mt-[8%]"></span>
          </div>
          <div id="container" className="col-span-10 bg-gray-100 min-h-[120vh] pt-24 pb-20">
            <Routes>
              <Route path="/" element={<GettingStart />} />
              <Route path="/overview/getting-started" element={<GettingStart />} />
              <Route path="/products/list" element={<GiftList/>} />
              <Route path="/activities/select-game" element={<SelectGame />} />
              <Route path="/activities/select-game/game-editor/:gameId" element={<GameEditor />} />
              <Route path="/activities/game-editor/wheel-spinner" element={
                <WheelProvider>
                  <WheelSpinner />
                </WheelProvider>
              } />
              <Route path="/activities/game-live/:gameId" element={<GameLive />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/reward/gift" element={<GiftList/>} />
              <Route path="/reward/gift/add" element={<AddGift/>} />
              <Route path='/reward/coupon' element={<CouponList/>}/>
              <Route path='/reward/coupon/add' element={<AddCoupon/>}/>
              <Route path='/reward/history' element={<RewardHistory/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
