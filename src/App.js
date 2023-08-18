import Form from './components/form'
import Login from './components/login'
import Home from './components/home'
import Navbar from './components/navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes, Navigate
} from "react-router-dom";
import Aboutus from './components/aboutus';
import Uprofile from './components/uprofile';
import Cprofile from './components/cprofile';
import Orgprofile from './components/orgprofile';
import Yogaevents from './components/yogaevents';
import Uploadevent from './components/uploadevent';
import Contevent from './components/contevent';
import Firstpage from './components/firstpage'
import Openevent from './components/openevent';
import Toc from './components/toc';
import Registered from './components/registered';
import Feedback from './components/feedback';
import Donationevents from './components/donationevents';

function App() {
  return (
    <div>
      <div className="App">

        <Router>
          <div className="App">
            <Routes>
            <Route path="/contevent" element={<Contevent/>} />
              <Route exact path="/orgprofile" element={<Orgprofile />} />
              <Route exact path="/home" element={<Home/>} />
              <Route exact  path="/uploadevent" element={<Uploadevent />} />
              <Route exact path="/yogaevents" element={<Yogaevents />} />
              <Route exact path="/uprofile" element={<Uprofile />} />
              <Route exact path="/cprofile" element={<Cprofile />} />
              <Route exact path="/" element={<Firstpage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/form" element={<Form />} />
              <Route exact path="/aboutus" element={<Aboutus />} />
              <Route exact path="/openevent" element={<Openevent />} />
              <Route exact path="/toc" element={<Toc />} />
              <Route exact path="/registered" element={<Registered />} />
              <Route exact path="/feedback" element={<Feedback />} />
              <Route exact path="/donationevents" element={<Donationevents />} />
            </Routes>
          </div>
        </Router>

      </div>
    </div>
  );
}

export default App;
