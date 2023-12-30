import React from 'react';
import ReactDOM from 'react-dom'

import App from './App'
import './Index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/Login';
import NewProduct from './page/NewProduct';
import SignUp from './page/SignUp';
import { store } from './redux/index';
import {Provider}  from 'react-redux';
import Cart from './page/Cart';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='menu' element={<Menu />} /> 
            <Route path='menu/:filterby' element={<Menu />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<Login />} />
            <Route path='newProduct' element={<NewProduct />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='cart' element={<Cart />} />
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    
);



