import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Dashboard from './pages/Dashboard'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CapDashboard from './pages/CapDashboard'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import Help from './pages/Help'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/dashboard' element={
          <UserProtectWrapper>
            <Dashboard/>
          </UserProtectWrapper>
        }/>
        <Route path='/captain-dashboard' element={
          <CaptainProtectWrapper>
            <CapDashboard/>
          </CaptainProtectWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App
