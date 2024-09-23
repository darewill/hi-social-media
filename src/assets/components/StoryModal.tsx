// src/assets/components/StoryModal.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../css/StoryModal.css";

interface StoryModalProps {
  story: { id: number; story: string };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function StoryModal({ story, onClose, onPrev, onNext, hasPrev, hasNext }: StoryModalProps) {
  const handleClose = (e: React.MouseEvent) => {
    if ((e.target as HTMLDivElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content">
        {hasPrev && (
          <button className="arrow-left" onClick={onPrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}

        <img src={story.story} alt="Story" className="modal-image" />

        {hasNext && (
          <button className="arrow-right" onClick={onNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </div>
  );
}
