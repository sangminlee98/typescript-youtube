import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getVideos, VideoDatas } from './api/getVideos';
import './App.css';

function App() {
  const [data, setData] = useState<VideoDatas[]>();
  const fetchData = () => {
    getVideos().then(items => setData(items));
  };
  useEffect(() => {
    fetchData();
  },[]);
  data && console.log(data[0].id);
  return (
    <div>
      
    </div>
  );
}

export default App;
