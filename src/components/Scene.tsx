import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingObjectProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const FloatingObject = ({ position, rotation, scale }: FloatingObjectProps) => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.1 + rotation[0]
    mesh.current.rotation.y = Math.sin(t * 0.1) * 0.1 + rotation[1]
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#2D3436" />
      </mesh>
    </Float>
  )
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <FloatingObject 
        position={[-2, 1, 0]} 
        rotation={[0.5, 0.5, 0]} 
        scale={0.3} 
      />
      <FloatingObject 
        position={[2, -1, -2]} 
        rotation={[-0.5, 0.5, 0]} 
        scale={0.2} 
      />
      <FloatingObject 
        position={[1, 2, -1]} 
        rotation={[0.2, -0.5, 0]} 
        scale={0.25} 
      />
    </>
  )
} 