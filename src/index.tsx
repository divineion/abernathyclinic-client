import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App'
import store from './app/store'
import {Provider} from "react-redux";

const root = createRoot(document.getElementById('root')!)

// j'initalise react
// je fournis le store redux à tous les components via le provider
//je monte App dans le DOM
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)