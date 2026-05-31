import React from 'react';
import Svg, { Path, Circle, Line, Text as SvgText, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { C } from '../constants';

// Approximate Boyacá Andean outline — viewBox 0 0 200 200
const BOYACA_PATH =
  'M 102,8 L 140,10 L 168,25 L 188,52 L 194,85 ' +
  'L 190,115 L 178,144 L 155,168 L 124,185 L 95,190 ' +
  'L 68,183 L 44,166 L 25,142 L 14,112 L 16,80 ' +
  'L 30,52 L 55,28 L 80,14 Z';

// Geographic bounds used to convert lat/lng → SVG coords
// Covers western Andean Boyacá: lat 4.7–6.4, lng -74.5 – -72.8
const LAT_MAX = 6.4;
const LAT_RANGE = 1.7;  // 6.4 - 4.7
const LNG_MIN = -74.5;
const LNG_RANGE = 1.7;  // -72.8 - (-74.5)
const SVG_SIZE = 200;

function latLngToSvg(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / LNG_RANGE) * SVG_SIZE;
  const y = ((LAT_MAX - lat) / LAT_RANGE) * SVG_SIZE;
  return { x, y };
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  label: string;
  sublabel?: string;
  side?: 'left' | 'right';
}

interface Props {
  width?: number;
  height?: number;
  fillColor?: string;
  bgColor?: string;
  strokeColor?: string;
  showPins?: boolean;
  pins?: MapPin[];
  showLocationIcon?: boolean;
}

export default function BoyacaMapSVG({
  width = 200,
  height = 200,
  fillColor = C.pink,
  bgColor = 'transparent',
  strokeColor = 'transparent',
  showPins = false,
  pins = [],
  showLocationIcon = false,
}: Props) {
  const scale = width / SVG_SIZE;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
      {/* Background */}
      {bgColor !== 'transparent' && (
        <Rect x={0} y={0} width={SVG_SIZE} height={SVG_SIZE} fill={bgColor} />
      )}

      {/* Boyacá silhouette */}
      <Path
        d={BOYACA_PATH}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeColor !== 'transparent' ? 1.5 : 0}
      />

      {/* Location pin icon (for LocationScreen) */}
      {showLocationIcon && (
        <G>
          {/* Pin body */}
          <Path
            d="M 101,55 C 90,55 81,64 81,75 C 81,90 101,110 101,110 C 101,110 121,90 121,75 C 121,64 112,55 101,55 Z"
            fill={C.purple}
          />
          {/* Pin inner circle */}
          <Circle cx={101} cy={74} r={7} fill="white" />
        </G>
      )}

      {/* Event pins */}
      {showPins && pins.map(pin => {
        const { x, y } = latLngToSvg(pin.lat, pin.lng);
        const isLeft = pin.side === 'left';
        const lineEndX = isLeft ? x - 28 : x + 28;
        const lineEndY = y - 12;
        const textAnchor = isLeft ? 'end' : 'start';
        const textX = isLeft ? lineEndX - 2 : lineEndX + 2;

        return (
          <G key={pin.id}>
            {/* Connecting line */}
            <Line
              x1={x} y1={y - 4}
              x2={lineEndX} y2={lineEndY}
              stroke={C.pink}
              strokeWidth={1}
            />
            {/* Pin dot */}
            <Circle
              cx={x} cy={y}
              r={5}
              fill={C.pink}
              stroke="white"
              strokeWidth={1.5}
            />
            {/* Label background */}
            <Rect
              x={isLeft ? textX - 52 : textX}
              y={lineEndY - 16}
              width={54}
              height={22}
              rx={4}
              fill="white"
              opacity={0.9}
            />
            {/* Location name */}
            <SvgText
              x={isLeft ? textX - 25 : textX + 27}
              y={lineEndY - 5}
              fontSize={8}
              fontWeight="bold"
              fill={C.purple}
              textAnchor="middle"
            >
              {pin.label}
            </SvgText>
            {/* Sub-label */}
            {pin.sublabel && (
              <SvgText
                x={isLeft ? textX - 25 : textX + 27}
                y={lineEndY + 4}
                fontSize={7}
                fill={C.gray}
                textAnchor="middle"
              >
                {pin.sublabel}
              </SvgText>
            )}
          </G>
        );
      })}
    </Svg>
  );
}
