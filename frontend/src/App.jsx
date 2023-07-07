import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Todos from './components/Todos';
import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* public Routes */}
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />

          {/* private/protected routes */}
          <Route path='' element={<PrivateRoute />}>
            <Route path='/todos' element={<Todos />} />
          </Route>

          {/* admin routes */}
          {/* <Route path='' element={<AdminRoute />}></Route> */}
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
