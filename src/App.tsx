import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
import StaffProfile from './page/staff/staffprofile';
import AdminProfile from './page/admin/adminprofile';
import Createroom from './page/createroom/createroom';
import Reportbooking from './page/admin/reportbooking';
import Review from './page/booking/review';

export default function App() {
  return (
    <Router>
      <main className="bg-gradient-to-r min-h-dvh from-gradient to-gd">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>\
            {/* NOT PAGE */}
            <Route path="*" element={<Notfound />} />

            {/* UNLOGIN */}
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
              <Route index element={<Home />} />
              <Route path="room" element={<Room />} />
              <Route path="booking/:room_id" element={<Booking />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path='review/:room_id' element={<Review />} />
            </Route>

            {/* LOGIN  Staff*/}
            <Route
              path="staff"
              element={<Checklogin islogin="staff" elements={<Navstaff />} />}
            >
              <Route index element={<Home />} />
              <Route path="room" element={<Room />} />
              <Route path='profile' element={<StaffProfile />} />
              <Route path='createroom' element={<Createroom />} />
            </Route>

            {/* LOGIN  Admin*/}
            <Route
              path="admin"
              element={<Checklogin islogin="admin" elements={<Navadmin />} />}
            >
              <Route index element={<Home />} />
              <Route path="room" element={<Room />} />
              <Route path='profile' element={<AdminProfile />} />
              <Route path='room/reprot/:room_id' element={<Reportbooking />} />
              <Route path='room/report/booking/:room_id' element={<Reportbooking />} />
              <Route path='booking/:room_id' element={<Review />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}