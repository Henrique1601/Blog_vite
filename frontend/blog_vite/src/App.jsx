import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';

// Import all of Bootstrap’s JS
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/CreatePost' element={<CreatePost />} />
      </Routes>
    </>
  )
}

export default App
