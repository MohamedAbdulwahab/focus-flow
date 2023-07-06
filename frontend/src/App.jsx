import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';
import Todos from './pages/TodosPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main>
          <Routes>
            {/* public Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<ErrorPage />} />

            {/* private/protected routes */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='/todos' element={<Todos />} />
            </Route>

            {/* admin routes */}
            {/* <Route path='' element={<AdminRoute />}></Route> */}
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
