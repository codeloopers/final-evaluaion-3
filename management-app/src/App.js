import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import ProtectedRoute from './Component/ProtectedRoute';

function App() {
  return (
   
  <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />

        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        

  
      </Routes>
      </Router>

   
   
  );
}

export default App;
