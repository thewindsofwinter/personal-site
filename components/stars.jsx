import React, { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import * as random from 'maath/random'
import { colorTemperature2rgb } from 'color-temperature'

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

// Create 10,000 stars
function Stars(props) {
  const numStars = props.number;
  const multiplier = props.multiplier;
  const size = props.size;
  const ref = useRef();

  const starTexture = useTexture('https://i.imgur.com/h1kVn4F.png');
  const [sphere] = useState(() => random.inSphere(new Float32Array(numStars), { radius: 1.5 }))
  const [colors] = useState(() => {
    let colors = new Float32Array(numStars * 3);

    for(let i = 0; i < numStars * 3; i += 3) {
      // Star temperature distribution
      let temperature = 2500 + Math.pow(Math.random(), 4) * (30000 - 2500); 
      let tempRGB = colorTemperature2rgb(temperature);
      let tempHSV = rgbToHsv(tempRGB.red, tempRGB.green, tempRGB.blue);
      let rgb = hsvToRgb(tempHSV[0], tempHSV[1], 1);

      if(tempHSV[1] > 0.1) {
        rgb = hsvToRgb(tempHSV[0], Math.min(tempHSV[1] * 1.5, 1), 1);
      }
      
      let defaultColor = new THREE.Color(rgb[0] / 255.0, rgb[1] / 255.0, rgb[2] / 255.0);
      let sRGB = defaultColor.convertSRGBToLinear();

      colors[i] = sRGB.r;
      colors[i + 1] = sRGB.g;
      colors[i + 2] = sRGB.b;
    }

    console.log(colors);

    return colors;
  })
  
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta * multiplier / 100
    ref.current.rotation.y -= delta * multiplier / 150
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial map={starTexture} transparent vertexColors size={size} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

export default Stars;