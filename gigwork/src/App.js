import './css/App.css';
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Main from './pages/Main'


function App() {
  return (
    <div>
      <Header/>

      <Routes>
        <Route path='/' element={<Main/>}></Route>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
