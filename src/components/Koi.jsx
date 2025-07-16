import { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Koi(props) {
  const { scene, animations } = useGLTF('/Models/koi.glb')

  // Setup animation mixer and actions
  const { actions, mixer } = useAnimations(animations, scene)

  // Animation
  useEffect(() => {
    mixer.timeScale = 1.5
    actions['MorphBake'].play()
  }, [])

  // Rotate the model slightly over time
  useFrame((state) => (scene.rotation.z = Math.sin(state.clock.elapsedTime / 4) / 2))

  // Render the model
  return <primitive object={scene} {...props} />
}
