import { useRef, useLayoutEffect } from 'react'
import { useGLTF, useMask, MeshTransmissionMaterial } from '@react-three/drei'

export default function Aquarium({ children, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/Models/shapes-transformed.glb')

  // Setup stencil mask
  const stencil = useMask(1, false)

  // Apply stencil mask to all child materials
  useLayoutEffect(() => {
    ref.current.traverse((child) => child.material && Object.assign(child.material, { ...stencil }))
  }, [])

  return (
    <group {...props} dispose={null}>
      {/* Glass aquarium mesh */}
      <mesh castShadow scale={[0.61 * 6, 0.8 * 6, 1 * 6]} geometry={nodes.Cube.geometry}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>

      {/* Children inside aquarium with mask applied */}
      <group ref={ref}>{children}</group>
    </group>
  )
}
