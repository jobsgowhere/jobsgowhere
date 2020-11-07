import * as React from "react";

const PlaceholderAvatar: React.FC = () => (
  <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="32" fill="#fff" />
    <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
      <circle cx="32" cy="32" r="32" fill="#fff" />
    </mask>
    <g mask="url(#a)" fill="#E5E5E5">
      <circle cx="32.5" cy="62.5" r="21.5" />
      <circle cx="33" cy="27" r="10" />
    </g>
  </svg>
);

export default PlaceholderAvatar;
