import React from "react";
import "./stroke.css";

const Brushstroke = () => {
  return (
    <div className=" -mt-4 z-0 h-24">
      <div className="yellow-stroke">
        <svg xmlns="http://www.w3.org/2000/svg" id="yellow-stroke">
          <path
            fill="none"
            stroke="#ffcf48"
            strokeMiterlimit="10"
            strokeWidth="24"
            d="M468 96H2l609-84 31 55-279 9L84 86"
          />
        </svg>

        <svg>
          <defs>
            <clipPath id="YellowSvgPath" transform="rotate(-2 471 26)">
              <path d="M378 2H198L52 1H10L2 2c-3 0 0 1 0 1s6 13 1 16c-3 2 0 8 5 10 3 2 289 2 308 2l12-1c4 0 3-4 5-5h24l74-1 38 1h56c5 0 12-22 0-22l-65-1h-82" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Brushstroke;
