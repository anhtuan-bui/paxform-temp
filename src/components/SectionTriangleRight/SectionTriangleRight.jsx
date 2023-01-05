import React from "react";
import "./SectionTriangleRight.scss";

export default function TriangleRight(props) {
  let className = '';

  switch (props.variant){
    case "white":
        className = 'section_triangle_right--white';
        break;
    case "green":
        className = 'section_triangle_right--green';
        break;
    case "dark-blue":
        className = 'section_triangle_right--dark-blue';
        break;
    case "light-blue":
        className = 'section_triangle_right--light-blue';
        break;
    case "blue":
        className = 'section_triangle_right--blue';
        break;
    case "footer":
        className = 'section_triangle_right--footer';
        break;
    case "light-green":
        className = 'section_triangle_right--light-green';
        break;
    default:
        className = '';
  }
  
  return (
    <svg
      className="section_triangle_right"
      viewBox="0 0 1440 135"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon className={className} points="0 0, 0 135, 1440 135" />
    </svg>
  );
}
