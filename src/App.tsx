import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { Suspense } from "react";
import Checklogin from './components/utils/checklogin';
import Home from './page/home';
import Login from './page/login/login';
import Signup from './page/login/signup';
import Room from './page/booking/room';

export default function App() {
  return (
    <Router>
      <main className='bg-gradient-to-r from-gradient to-gd'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* UNLOGIN */}
            <Route path='*' element={<p>Not found</p>} />
            <Route path='/' element={<Home />} />


            {/* LOGIN */}
            <Route path='user' element={<Checklogin elements={<Outlet />} />}>
              <Route path='dashboard' element={<p>Dashboard</p>} />
              <Route path='room' element={<Room />} />
            </Route>

            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />

          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}