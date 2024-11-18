import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { Suspense } from "react";
import Checklogin from './components/utils/checklogin';
import Home from './page/home';
import Login from './page/login/login';
import Signup from './page/login/signup';
import Room from './page/user/booking/room';
import Navnologin from './components/navbar/navnologin';
import Navuser from './components/navbar/navuser';
import Notfound from './page/home/notfound';

export default function App() {
  return (
    <Router>
      <main className='bg-gradient-to-r min-h-dvh from-gradient to-gd'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* UNLOGIN */}
            <Route path='*' element={<Notfound />} />

            <Route element={<Checklogin islogin="no" elements={<Navnologin />} />}>
              <Route path='/' element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>


            {/* LOGIN  User*/}
            <Route path='user' element={<Checklogin islogin='yes' elements={<Navuser />} />}>
              <Route path='dashboard' element={<p>Dashboard</p>} />
              <Route path='room' element={<Room />} />
            </Route>

            {/* LOGIN  Staff*/}
            <Route path='staff' element={<Checklogin islogin='yes' elements={<Outlet />} />}>
              <Route path='dashboard' element={<p>Dashboard</p>} />
            </Route>


          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}