import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar'

import Trip from './pages/Trip';
import About from './pages/About';
import Contact from './pages/Contact'
import Login from './pages/Login';
import Signup from './pages/Signup'
import Footer from './component/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import DetailTrip from './pages/detail-trip/DetailTrip';
import Keranjang from './pages/Keranjang';
import PrivateRoute from './PrivateRoute';
import PrivateRouteDashboard from './PrivateRouteDashboard';

import Order from './pages/Order';
import InVoice from './pages/inVoice';
import Transaksi from './pages/Transaksi';

function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <div className='pages'>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/trip' element={<Trip />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/keranjang' element={<Keranjang />} />
                <Route exact path='/trip/order' element={<Order />} />
                <Route exact path='/transaksi' element={<Transaksi /> } />
                <Route exact path='/transaksi/invoice' element={<InVoice />} />
                <>
                  <Route exact path='/trip/:judul' element={<DetailTrip />} />
                </>
              </Route>
              <Route element={<PrivateRouteDashboard />}>
                <Route exact path='/dashboard' element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
