import React, { useState } from 'react';
import styles from './Header.module.css';
import { FiMenu } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import youtub_logo from '../../data/youtube_logo.png';
import { useDispatch } from 'react-redux';
import { getSearchVideosThunk } from '../../module/videos';

const Header = () => {
  const [input,setInput] = useState('');
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const onSubmit = () => {
    dispatch(getSearchVideosThunk(input));
    setInput('');
  }
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.nativeEvent.isComposing) return;
    if(e.key === 'Enter') {
      onSubmit();
    }
  }
  return (
    <div className={styles.header}>
      <div className={styles.tab}>
        <FiMenu className={styles.icon}/>
        <img src={youtub_logo} alt="logo" className={styles.logo}/>
      </div>
      <div className={styles['center-tab']}>
        <input className={styles.input} value={input} onChange={onChange} onKeyDown={onKeydown}/>
        <IoSearchOutline type='submit' className={styles['search-icon']} onClick={onSubmit}/>
      </div>
      <div className={styles.tab}>
        <BsGrid3X3Gap className={styles.icon}/>
        <HiOutlineDotsVertical className={styles.icon}/>
      </div>
    </div>
  );
};

export default Header;