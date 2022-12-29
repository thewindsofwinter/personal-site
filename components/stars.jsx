import React, { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import * as random from 'maath/random'
import { colorTemperature2rgb } from 'color-temperature'

// Create 10,000 stars, 
function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  const [colors] = useState(() => {
    let colors = new Float32Array(15000);

    for(let i = 0; i < 15000; i+=3) {
      let temperature = 2500 + Math.pow(Math.random(), 4) * (30000 - 2500); 
      let rgb = colorTemperature2rgb(temperature);

      colors[i] = (rgb.red / 255.0);
      colors[i + 1] = (rgb.green / 255.0);
      colors[i + 2] = (rgb.blue / 255.0);
    }

    return colors;
  })
  
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent vertexColors size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

export default Stars;