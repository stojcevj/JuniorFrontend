import './App.css';
import React from 'react';
import Footer from '../Shared/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import ProductAdd from '../ProductAdd/ProductAdd';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element= { <Main /> } />
                    <Route path='/addProduct' element= { <ProductAdd /> } />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
