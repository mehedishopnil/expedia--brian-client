import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../share/Header/Header';
import Footer from '../../share/Footer/Footer';

const Main = () => {
     return (
          <div>
               <Header/>
               <Outlet></Outlet>
               <Footer/>
          </div>
     );
};

export default Main;