import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/configStore';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { config } from './config';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <App />   
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);