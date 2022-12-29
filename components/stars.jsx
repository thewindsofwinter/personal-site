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
    let colors = [];

    while(colors.length != 5000) {
      let temperature = 2500 + Math.pow(Math.random(), 4) * (30000 - 2500); 
      let rgb = colorTemperature2rgb(temperature);

      colors.push(<color r={rgb.red / 255.0} g={rgb.green / 255.0} b={rgb.blue / 255.0} />);
    }

    return colors;
  })
  
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
              attach="attributes-position"
              count={sphere.length}
              array={sphere}
              itemSize={1}
              usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute
              attach="attributes-color"
              count={colors.length}
              array={colors}
              itemSize={1}
              usage={THREE.DynamicDrawUsage}
            />
        </bufferGeometry>
        <pointsMaterial attach="material" vertexColors size={10} sizeAttenuation={false} />
      </Points>
    </group>
  )
}

export default Stars;