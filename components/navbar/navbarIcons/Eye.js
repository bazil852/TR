import React, { useState } from "react";

const Eye = ({ color }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const strokeColor = isHovered ? "rgb(144, 121, 246)" : color;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <g clipPath="url(#clip0_1313_2619)">
        <path
          d="M0.833252 9.99967C0.833252 9.99967 4.16658 3.33301 9.99992 3.33301C15.8333 3.33301 19.1666 9.99967 19.1666 9.99967C19.1666 9.99967 15.8333 16.6663 9.99992 16.6663C4.16658 16.6663 0.833252 9.99967 0.833252 9.99967Z"
          stroke={strokeColor}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
          stroke={strokeColor}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1313_2619">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Eye;
