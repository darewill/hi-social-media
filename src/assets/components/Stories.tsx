import React, { useState } from "react";
import "../css/Stories.css";
import MyStory from "./MyStory";
import StoriesData from '../dummyAPIs/StoriesData';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryModal from "./StoryModal";

export default function Stories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyUrl, setStoryUrl] = useState<string | null>(null); // Manage the URL of the story

  const openStoryModal = (index: number) => {
    setActiveStoryIndex(index);
    setStoryUrl(null); // Reset the story URL if we are switching back to the StoriesData modal
  };

  const closeStoryModal = () => {
    setActiveStoryIndex(null);
    setStoryUrl(null);
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

  // Open the story viewer for MyStory when the user clicks on their uploaded story
  const openStoryViewer = (storyUrl: string) => {
    setStoryUrl(storyUrl);
    setActiveStoryIndex(null); // Ensure that StoriesData stories are not displayed
  };

  return (
    <>
      <div className='stories'>
        <MyStory openStoryViewer={openStoryViewer} />
        <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
          {StoriesData.map((story, index) => (
            <SwiperSlide key={story.id} onClick={() => openStoryModal(index)}>
              <div className="story w-[100%] h-[100%] object-cover">
                <div className="user">
                  <img src={story.storyProfile} alt="" />
                </div>
                <img src={story.story} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal for StoriesData or MyStory */}
      {(activeStoryIndex !== null || storyUrl) && (
        <StoryModal
          story={storyUrl ? { id: 0, story: storyUrl } : StoriesData[activeStoryIndex!]} // Handle MyStory or StoriesData
          onClose={closeStoryModal}
          onPrev={goToPrevStory}
          onNext={goToNextStory}
          hasPrev={activeStoryIndex !== null && activeStoryIndex > 0}
          hasNext={activeStoryIndex !== null && activeStoryIndex < StoriesData.length - 1}
        />
      )}
    </>
  );
}
