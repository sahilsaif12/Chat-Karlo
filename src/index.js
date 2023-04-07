import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AuthState from './Context/Auth/AuthState';
import { BrowserRouter } from 'react-router-dom';
import ChatState from './Context/Chat/ChatState';

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthState>
    <ChatState>
      <App />
    </ChatState>
    </AuthState>
    </BrowserRouter>
  </React.StrictMode>
);


