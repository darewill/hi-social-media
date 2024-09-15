import React, { useState } from "react";
import "../css/Feeds.css";
import Feed from "./Feed";
import HomeFeedData from '../dummyAPIs/HomeFeedData';
import { useSwipeable } from "react-swipeable";

export default function Feeds() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleNextPost(),
    onSwipedDown: () => handlePreviousPost(),
    preventScrollOnSwipe: true,
    trackMouse: true, // For desktop usage as well
  });

  const handleScroll = (event: React.WheelEvent) => {
    if(event.deltaY > 0){
      handleNextPost();
    } else {
      handlePreviousPost();
    }
  };

  const handleNextPost = () => {
    if (currentIndex < HomeFeedData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to move to the previous post
  const handlePreviousPost = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='feeds' {...swipeHandlers} onWheel={handleScroll}>
      {/* {
        HomeFeedData.map(fd=>(
          <Feed fd={fd} key={fd.key} />
        ))
      } */}
      <Feed fd={HomeFeedData[currentIndex]} key={HomeFeedData[currentIndex].id} />
    </div>
  );
}
