import React from "react";
import "../css/Feeds.css";
import Feed from "./Feed";
import HomeFeedData from '../js/HomeFeedData';

export default function Feeds() {
  return (
    <div className='feeds'>
      {
        HomeFeedData.map(fd=>(
          <Feed fd={fd} key={fd.key} />
        ))
      }
    </div>
  );
}
