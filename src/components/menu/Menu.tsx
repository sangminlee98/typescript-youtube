import React from 'react';
import styles from './Menu.module.css';
import { TiHome } from 'react-icons/ti';
import { FaRegCompass } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import { ActiveMenu } from '../../App';
import { Link } from 'react-router-dom';

type Props = {
  activeMenu: ActiveMenu
}
const Menu = ({activeMenu}: Props) => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <Link to='/' className={activeMenu==='home' ? styles.focusedMenuItem : styles.menuItem}>
          <TiHome className={styles.menuIcon}/>
          <p className={styles.menuTitle}>홈</p>
        </Link>
        <Link to='/explore' className={activeMenu==='explore' ? styles.focusedMenuItem : styles.menuItem}>
          <FaRegCompass className={styles.menuIcon}/>
          <p className={styles.menuTitle}>탐색</p>
        </Link>
        <Link to='/subscribe' className={activeMenu==='subscribe' ? styles.focusedMenuItem : styles.menuItem}>
          <MdSubscriptions className={styles.menuIcon}/>
          <p className={styles.menuTitle}>구독</p>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;