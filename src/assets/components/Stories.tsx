// src/assets/components/Stories.tsx
import React, { useState } from "react";
import "../css/Stories.css";
import MyStory from "./MyStory";
import StoriesData from '../dummyAPIs/StoriesData';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryModal from "./StoryModal";

export default function Stories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const openStoryModal = (index: number) => {
    setActiveStoryIndex(index);
  };

  const closeStoryModal = () => {
    setActiveStoryIndex(null);
  };

  const goToNextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < StoriesData.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    }
  };

  const goToPrevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  return (
    <>
      <div className='stories'>
        <MyStory />
        <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
          {StoriesData.map((story, index) => (
            <SwiperSlide key={story.id} onClick={() => openStoryModal(index)}>
              <div className="story">
                <div className="user">
                  <img src={story.storyProfile} alt="" />
                </div>
                <img src={story.story} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {activeStoryIndex !== null && (
        <StoryModal
          story={StoriesData[activeStoryIndex]}
          onClose={closeStoryModal}
          onPrev={goToPrevStory}
          onNext={goToNextStory}
          hasPrev={activeStoryIndex > 0}
          hasNext={activeStoryIndex < StoriesData.length - 1}
        />
      )}
    </>
  );
}
