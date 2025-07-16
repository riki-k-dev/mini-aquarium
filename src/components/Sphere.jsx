import { Float, Instance } from '@react-three/drei'

export default function Sphere({ position, scale = 1, speed = 0.1, color = 'white' }) {
  return (
    <Float rotationIntensity={40} floatIntensity={10} speed={speed / 2}>
      <Instance position={position} scale={scale} color={color} />
    </Float>
  )
}
