import { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function WaterPlant(props) {
    const groupRef = useRef()

    // Load model and animations
    const { scene, animations } = useGLTF('/Models/water_plant.glb')

    // Clone and retarget skeleton
    const cloned = useMemo(() => {
        const clone = scene.clone(true)

        const skinnedMeshes = {}
        scene.traverse((c) => c.isSkinnedMesh && (skinnedMeshes[c.name] = c))

        const cloneBones = {}
        const cloneSkinned = {}
        clone.traverse((c) => {
            if (c.isBone) cloneBones[c.name] = c
            if (c.isSkinnedMesh) cloneSkinned[c.name] = c
        })

        for (let name in skinnedMeshes) {
            const original = skinnedMeshes[name]
            const target = cloneSkinned[name]
            if (!target) continue
            const bones = original.skeleton.bones.map((b) => cloneBones[b.name])
            target.bind(new THREE.Skeleton(bones, original.skeleton.boneInverses), target.matrixWorld)
        }

        return clone
    }, [scene])

    // Setup animation mixer
    const { actions, mixer } = useAnimations(animations, cloned)

    // Animation
    useEffect(() => {
        const first = actions[Object.keys(actions)[0]]
        first?.reset().play()
    }, [actions])

    // Animate each frame
    useFrame((_, delta) => mixer?.update(delta))

    // Render model
    return <primitive ref={groupRef} object={cloned} {...props} />
}

useGLTF.preload('/Models/water_plant.glb')
