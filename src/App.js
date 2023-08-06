import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Auth, Register, Reset, ProductDetails } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/:id' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
