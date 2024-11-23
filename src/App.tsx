import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { Suspense } from "react";
import Checklogin from './components/utils/checklogin';
import Home from './page/home';
import Login from './page/login/login';
import Signup from './page/login/signup';
import Room from './page/booking/room';
import Navnologin from './components/navbar/navnologin';
import Navuser from './components/navbar/navuser';
import Notfound from './page/home/notfound';
import Navstaff from './components/navbar/navstaff';
import Navadmin from './components/navbar/navadmin';
import UserProfile from './page/user/userprofile';
import Booking from './page/booking/booking';
import Testslide from './page/testslide';

export default function App() {
  return (
    <Router>
      <main className="bg-gradient-to-r min-h-dvh from-gradient to-gd">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* UNLOGIN */}
            <Route path="*" element={<Notfound />} />

            <Route
              element={<Checklogin islogin="no" elements={<Navnologin />} />}
            >
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              {/* <Route path='room' element={<Room />} /> */}
            </Route>

            {/* LOGIN  User*/}
            <Route
              path="user"
              element={<Checklogin islogin="user" elements={<Navuser />} />}
            >
              <Route index element={<p>user index</p>} />
              <Route path="dashboard" element={<p>Dashboard</p>} />
              <Route path="room" element={<Room />} />
              <Route path="booking/:room_id" element={<Booking />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="testslide" element={<Testslide />} />
            </Route>

            {/* LOGIN  Staff*/}
            <Route
              path="staff"
              element={<Checklogin islogin="staff" elements={<Navstaff />} />}
            >
              <Route index element={<p>staff index</p>} />
              <Route path="dashboard" element={<p>Dashboard</p>} />
              <Route path="room" element={<Room />} />
            </Route>

            {/* LOGIN  Admin*/}
            <Route
              path="admin"
              element={<Checklogin islogin="admin" elements={<Navadmin />} />}
            >
              <Route index element={<p>admin index</p>} />
              <Route path="dashboard" element={<p>Dashboard</p>} />
              <Route path="room" element={<Room />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}