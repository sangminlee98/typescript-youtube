import React from 'react';
import styles from './Header.module.css';
import {FiMenu} from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import youtube_logo from '../data/youtube_logo.png';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.tab}>
        <FiMenu className={styles.icon}/>
        <img src={youtube_logo} alt="logo" className={styles.logo} />
      </div>
      <div className={styles['center-tab']}>
        <input className={styles.input}/>
        <IoSearchOutline className={styles['search-icon']} style={{width:'50px'}}/>
      </div>
      <div className={styles.tab}>
        <BsGrid3X3Gap className={styles.icon}/>
        <HiOutlineDotsVertical className={styles.icon}/>
      </div>
    </div>
  );
};

export default Header;