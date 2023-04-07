import logo from './logo.svg';
import './App.css';
import { LandingPage } from './Components/Landing/LandingPage';
import { ChatScreen } from './Components/ChatScreen/ChatScreen';
import { Navigate, Route, Routes } from 'react-router-dom';
import authContext from './Context/Auth/authContext';
import { useContext } from 'react';

function App() {
  let { currentUser } = useContext(authContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }

    return children;
  }
  return (
    <div className="App">

      <Routes>
        <Route path="/">
          <Route index  element={
            <ProtectedRoute>
              <ChatScreen />
            </ProtectedRoute>
          }/>
          <Route path="login" element={<LandingPage />}></Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
