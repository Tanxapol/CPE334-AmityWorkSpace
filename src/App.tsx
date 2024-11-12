import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Suspense } from "react";
import Checklogin from './components/utils/checklogin';
import Home from './page/home';

export default function App() {
  return (
    <Router>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='*' element={<p>Not found</p>} />
            <Route path='/' element={<Home />} />

            <Route element={<Checklogin elements={<p>Dashboard</p>} />}>
            <Route path='dashboard' element={<p>Dashboard</p>} />
            </Route>

            <Route path='login' element={<p>Login page</p>} />
            
          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}