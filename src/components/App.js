import Signup from './Signup';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import {AuthProvider} from '../contexts/AuthContext';
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';
import ForgotPassword from './ForgotPassword';
import Header from './Header';
import Cards from './Cards';
import CardsDetails from './CardsDetails';
// import Category from './Category';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className='w-100'>
      <Header/> 
      {/* <Router> */}
         <AuthProvider> 
        <Routes>
           {/* <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>   */}
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/" element={<Cards/>}/>
          <Route path="/cart/:id" element={<CardsDetails/>}/>
          <Route path="/home" element={<Cards/>}/>

          
          
        </Routes>
         </AuthProvider>
      {/* </Router>  */}
      </div>

      </Container>
  );
}

export default App;
