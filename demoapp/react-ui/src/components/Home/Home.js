import React from 'react';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar';
import requireAuth from './../requireAuth';
const Home = () => (
  <div className={styles.Home}>

    <div><NavBar /></div>
    <div>&nbsp;</div>
    <div><Footer /></div>

  </div>
);

export default Home;
