import React, { useState } from "react";

const Bell = ({ color }) => {
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
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <g clipPath="url(#clip0_1313_2623)">
        <path
          d="M15 7.38672C15 6.06064 14.4732 4.78887 13.5355 3.85118C12.5979 2.9135 11.3261 2.38672 10 2.38672C8.67392 2.38672 7.40215 2.9135 6.46447 3.85118C5.52678 4.78887 5 6.06064 5 7.38672C5 13.2201 2.5 14.8867 2.5 14.8867H17.5C17.5 14.8867 15 13.2201 15 7.38672Z"
          stroke={strokeColor}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.4417 18.2197C11.2952 18.4723 11.0849 18.6819 10.8319 18.8277C10.5789 18.9734 10.292 19.0501 10 19.0501C9.70803 19.0501 9.42117 18.9734 9.16816 18.8277C8.91515 18.6819 8.70486 18.4723 8.55835 18.2197"
          stroke={strokeColor}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1313_2623">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.719727)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Bell;
