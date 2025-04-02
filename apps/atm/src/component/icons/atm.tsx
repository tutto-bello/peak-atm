import React from 'react';
import { Svg, Path } from 'react-native-svg';

const AtmIcon = (props: { color: string }) => (
  <Svg width="24" height="24" fill="#e3e3e3" viewBox="0 -960 960 960">
    <Path
      fill={props.color}
      d="M440-280h80v-40h40q17 0 28.5-11.5T600-360v-120q0-17-11.5-28.5T560-520H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-600v120q0 17 11.5 28.5T400-440h120v40H360v80h80zM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm0-80h640v-480H160zm0 0v-480z"
    />
  </Svg>
);

export default AtmIcon;
