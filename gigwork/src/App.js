import './css/App.css';
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <div>
      <Header/>

      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
