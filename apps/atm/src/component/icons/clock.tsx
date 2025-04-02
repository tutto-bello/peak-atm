import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

const ClockIcon = (props: { color: string }) => (
  <Svg width="24" height="24" fill="#e3e3e3" viewBox="0 -960 960 960">
    <Path
      fill={props.color}
      d="m612-292 56-56-148-148v-184h-80v216zM480-80q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q133 0 226.5-93.5T800-480t-93.5-226.5T480-800t-226.5 93.5T160-480t93.5 226.5T480-160"
    />
  </Svg>
);

export default ClockIcon;
