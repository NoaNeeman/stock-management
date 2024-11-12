import React from 'react';
import { Line } from './styles';

export interface SeparationLineProps {
  color?: string;
  thickness?: string;
  margin?: string;
  width?: string;
}

const SeparationLine: React.FC<SeparationLineProps> = ({
  color,
  thickness,
  margin,
  width,
}) => {
  return (
    <Line color={color} thickness={thickness} margin={margin} width={width} />
  );
};

export default SeparationLine;
