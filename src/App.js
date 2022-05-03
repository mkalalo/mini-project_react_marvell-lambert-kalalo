import './App.css';
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

import DetailBali from './pages/detail-trip/Detail-Bali';
import DetailManado from './pages/detail-trip/Detail-Manado';
import DetailBandung from './pages/detail-trip/Detail-Bandung';
import DetailJakarta from './pages/detail-trip/Detail-Jakarta';

function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/trip' element={<Trip />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/contact' element={<Contact />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <>
                <Route exact path='/trip/bali' element={<DetailBali />} />
                <Route exact path='/trip/manado' element={<DetailManado />} />
                <Route exact path='/trip/bandung' element={<DetailBandung />} />
                <Route exact path='/trip/jakarta' element={<DetailJakarta />} />
              </>
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
