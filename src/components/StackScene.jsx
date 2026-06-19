import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'

const techItems = [
  { name: 'Python', color: '#2DE2C5', size: 1.0 },
  { name: 'JavaScript', color: '#F2C744', size: 0.9 },
  { name: 'Bash', color: '#4ADE80', size: 0.8 },
  { name: 'React', color: '#61DAFB', size: 0.9 },
  { name: 'Nmap', color: '#2DE2C5', size: 0.7 },
  { name: 'Burp Suite', color: '#FF6B6B', size: 0.8 },
  { name: 'Metasploit', color: '#FF4444', size: 0.7 },
  { name: 'Wireshark', color: '#1679AB', size: 0.7 },
  { name: 'Linux', color: '#FFD700', size: 0.9 },
  { name: 'Git', color: '#F05032', size: 0.7 },
  { name: 'Tailwind', color: '#06B6D4', size: 0.7 },
  { name: 'Vite', color: '#646CFF', size: 0.6 },
  { name: 'Docker', color: '#2496ED', size: 0.6 },
  { name: 'Three.js', color: '#2DE2C5', size: 0.6 },
]

function TechSphere({ position, color, size, name }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.4}
        />
        <Text
          position={[0, 0, 0]}
          fontSize={size * 0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Q.ttf"
          maxWidth={size * 3}
        >
          {name}
        </Text>
      </mesh>
    </Float>
  )
}

function TechCluster() {
  const positions = useMemo(() => {
    const items = []
    const radius = 3.5
    techItems.forEach((_, i) => {
      const theta = (i / techItems.length) * Math.PI * 2
      const phi = Math.acos(2 * (i / techItems.length) - 1)
      items.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ])
    })
    return items
  }, [])

  return (
    <group>
      {techItems.map((item, i) => (
        <TechSphere
          key={item.name}
          position={positions[i]}
          color={item.color}
          size={item.size}
          name={item.name}
        />
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <TechCluster />
    </>
  )
}

export default function StackScene() {
  return (
    <div className="stack-container rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] overflow-hidden" style={{ height: '500px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}