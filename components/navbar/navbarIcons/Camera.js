import React, { useState } from "react";

const Camera = ({ color }) => {
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
      <g clipPath="url(#clip0_1313_2629)">
        <path
          d="M19.1667 15.8333C19.1667 16.2754 18.9911 16.6993 18.6785 17.0118C18.366 17.3244 17.9421 17.5 17.5 17.5H2.50004C2.05801 17.5 1.63409 17.3244 1.32153 17.0118C1.00897 16.6993 0.833374 16.2754 0.833374 15.8333V6.66667C0.833374 6.22464 1.00897 5.80072 1.32153 5.48816C1.63409 5.17559 2.05801 5 2.50004 5H5.83337L7.50004 2.5H12.5L14.1667 5H17.5C17.9421 5 18.366 5.17559 18.6785 5.48816C18.9911 5.80072 19.1667 6.22464 19.1667 6.66667V15.8333Z"
          stroke={strokeColor}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99996 14.1667C11.8409 14.1667 13.3333 12.6743 13.3333 10.8333C13.3333 8.99238 11.8409 7.5 9.99996 7.5C8.15901 7.5 6.66663 8.99238 6.66663 10.8333C6.66663 12.6743 8.15901 14.1667 9.99996 14.1667Z"
          stroke={strokeColor}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1313_2629">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Camera;
