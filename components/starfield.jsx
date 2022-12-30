import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Stars from './stars'

function StarField(props) {
    let starRate = props.rate;

    return (
      <div className="absolute left-0 top-0 w-screen h-screen z-0">
            <Canvas
            shadows={false}
            camera={{
                position: [0, 0, 1],
            }}
            >

            <Stars size={0.003} multiplier={2.5 * starRate} number={4000} />
            <Stars size={0.005} multiplier={2.5 * starRate} number={2500} />
            <Stars size={0.008} multiplier={2.5 * starRate} number={1000} />
            <Stars size={0.012} multiplier={1 * starRate} number={400} />
            <Stars size={0.03} multiplier={1 * starRate} number={100} />
            </Canvas>
      </div>
    );
}

export default StarField;