import { Canvas } from '@react-three/fiber'
import {
  Float,
  Instances,
  CameraControls,
  Lightformer,
  Environment,
  RandomizedLight,
  AccumulativeShadows,
  OrbitControls
} from '@react-three/drei'

import Aquarium from './components/Aquarium'
import Koi from './components/Koi'
import Sphere from './components/Sphere'
import WaterPlant from './components/WaterPlant'

export default function App({ spheres }) {
  {/* Plant positions */ }
  const plantPositions = [
    [0, -4.5, 0], [2, -4.5, 0], [-2, -4.5, 0], [2, -4.5, 2], [-2, -4.5, -2],
    [2, -4.5, 3], [-2, -4.5, -3], [2, -4.5, 4], [-2, -4.5, -4], [2, -4.5, 5],
    [-2, -4.5, -5], [2, -4.5, 1], [-2, -4.5, -1], [0, -4.5, 1], [0, -4.5, -1],
    [0, -4.5, 2], [0, -4.5, -2], [0, -4.5, 3], [0, -4.5, -3], [1, -4.5, -1],
    [-1, -4.5, 1], [1, -4.5, -2], [-1, -4.5, 2], [1, -4.5, -3], [-1, -4.5, 3],
    [1, -4.5, -4], [-1, -4.5, 4], [1, -4.5, -5], [-1, -4.5, 5], [3, -4.5, -1],
    [-3, -4.5, 1], [3, -4.5, -2], [-3, -4.5, 2], [3, -4.5, -3], [-3, -4.5, 3],
    [3, -4.5, -4], [-3, -4.5, 4], [3, -4.5, -5], [-3, -4.5, 5], [4, -4.5, 0],
    [-4, -4.5, 0], [4, -4.5, 1], [-4, -4.5, -1], [4, -4.5, 2], [-4, -4.5, -2],
    [4, -4.5, 3], [-4, -4.5, -3], [4, -4.5, 4], [-4, -4.5, -4], [4, -4.5, 5],
    [-4, -4.5, -5], [5, -4.5, 0], [-5, -4.5, 0], [5, -4.5, 2], [-5, -4.5, -2],
    [5, -4.5, 4], [-5, -4.5, -4]
  ]

  return (
    <Canvas shadows camera={{ position: [30, 0, -3], fov: 35, near: 1, far: 50 }}>
      <color attach="background" args={['#e5c6e4']} />

      {/* Glass aquarium */}
      <Aquarium position={[0, 0.25, 0]}>
        {plantPositions
          .filter(([x, , z]) => Math.abs(x) <= 3 && Math.abs(z) <= 5)
          .map((pos, i) => (
            <WaterPlant key={i} position={pos} scale={0.02} />
          ))}

        <Float rotationIntensity={2} floatIntensity={10} speed={2}>
          <Koi position={[0, 0, 0]} rotation={[0, Math.PI / -2, 0]} scale={1.4} />
        </Float>

        <Instances renderOrder={-1000}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial depthTest={false} />
          {spheres.map(([scale, color, speed, position], index) => (
            <Sphere key={index} scale={scale} color={color} speed={speed} position={position} />
          ))}
        </Instances>
      </Aquarium>


      {/** Soft shadows */}
      <AccumulativeShadows temporal frames={100} color="#e5c6e4" colorBlend={9} opacity={0.7} scale={90} position={[0, -5, 0]}>
        <RandomizedLight amount={8} radius={15} ambient={0.5} intensity={1} position={[-5, 10, -5]} size={20} />
      </AccumulativeShadows>

      {/** Custom environment map */}
      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
          ))}
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
        </group>
      </Environment>

      <CameraControls truckSpeed={0} dollySpeed={0} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

      {/* <OrbitControls
        autoRotate
        autoRotateSpeed={4}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      /> */}
    </Canvas>
  )
}
