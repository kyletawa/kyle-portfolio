import { useEffect, useRef, useState } from 'react'

const repos = [
  { id: 'pentest-toolkit', group: 'security', label: 'pentest-toolkit', url: 'https://github.com/kyletawa/pentest-toolkit', color: '#2DE2C5' },
  { id: 'selene-os', group: 'automation', label: 'Selene OS', url: 'https://github.com/kyletawa', color: '#F2C744' },
  { id: 'kyle-portfolio', group: 'web', label: 'kyle-portfolio', url: 'https://github.com/kyletawa/kyle-portfolio', color: '#7C3AED' },
  { id: 'kyletawa', group: 'profile', label: 'kyletawa', url: 'https://github.com/kyletawa/kyletawa', color: '#06B6D4' },
  { id: 'social-eng', group: 'security', label: 'social-eng-toolkit', url: 'https://github.com/kyletawa/kyletawa', color: '#2DE2C5' },
  { id: 'ctf-writeups', group: 'documentation', label: 'ctf-writeups', url: 'https://github.com/kyletawa/kyletawa/tree/main/ctf-writeups', color: '#A78BFA' },
  { id: 'connected', group: 'security', label: 'HTB Connected', url: 'https://github.com/kyletawa/kyletawa/tree/main/ctf-writeups/htb-connected.md', color: '#2DE2C5' },
  { id: 'bugcrowd', group: 'security', label: 'Bugcrowd', url: 'https://bugcrowd.com/', color: '#2DE2C5' },
  { id: 'gorden-sweets', group: 'web', label: "Gordon's Sweets", url: '#', color: '#7C3AED' },
  { id: 'hermes', group: 'automation', label: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', color: '#F2C744' },
]

const links = [
  { source: 'pentest-toolkit', target: 'ctf-writeups' },
  { source: 'pentest-toolkit', target: 'connected' },
  { source: 'pentest-toolkit', target: 'selene-os' },
  { source: 'selene-os', target: 'hermes' },
  { source: 'selene-os', target: 'connected' },
  { source: 'selene-os', target: 'bugcrowd' },
  { source: 'kyle-portfolio', target: 'kyletawa' },
  { source: 'kyle-portfolio', target: 'selene-os' },
  { source: 'kyletawa', target: 'ctf-writeups' },
  { source: 'kyletawa', target: 'social-eng' },
  { source: 'ctf-writeups', target: 'connected' },
  { source: 'ctf-writeups', target: 'gorden-sweets' },
  { source: 'social-eng', target: 'kyletawa' },
  { source: 'connected', target: 'bugcrowd' },
  { source: 'gorden-sweets', target: 'kyle-portfolio' },
]

const groupColors = {
  security: '#2DE2C5',
  automation: '#F2C744',
  web: '#7C3AED',
  profile: '#06B6D4',
  documentation: '#A78BFA',
}

export default function GraphView() {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [activeNode, setActiveNode] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })
  const simRef = useRef(null)
  const nodeRefs = useRef({})

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(400, Math.min(600, containerRef.current.clientWidth * 0.6)),
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !svgRef.current) return

    const d3 = {}
    const importD3 = async () => {
      try {
        const d3Force = await import('d3-force')
        d3.forceSimulation = d3Force.forceSimulation
        d3.forceLink = d3Force.forceLink
        d3.forceManyBody = d3Force.forceManyBody
        d3.forceCenter = d3Force.forceCenter
        d3.forceCollide = d3Force.forceCollide

        const width = dimensions.width
        const height = dimensions.height

        const nodes = repos.map((r) => ({ ...r, x: width / 2 + (Math.random() - 0.5) * 200, y: height / 2 + (Math.random() - 0.5) * 200 }))
        const edges = links.map((l) => ({
          source: nodes.findIndex((n) => n.id === l.source),
          target: nodes.findIndex((n) => n.id === l.target),
        })).filter((e) => e.source !== -1 && e.target !== -1)

        const svg = svgRef.current
        const svgEl = svg

        svgEl.innerHTML = ''

        const simulation = d3.forceSimulation(nodes)
          .force('link', d3.forceLink(edges).distance(120).strength(0.3))
          .force('charge', d3.forceManyBody().strength(-200))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('collide', d3.forceCollide(40))

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        edges.forEach((_, i) => {
          const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
          marker.setAttribute('id', `arrow-${i}`)
          marker.setAttribute('viewBox', '0 0 10 10')
          marker.setAttribute('refX', '20')
          marker.setAttribute('refY', '5')
          marker.setAttribute('markerWidth', '6')
          marker.setAttribute('markerHeight', '6')
          marker.setAttribute('orient', 'auto-start-reverse')
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z')
          path.setAttribute('fill', 'rgba(45,226,197,0.15)')
          marker.appendChild(path)
          defs.appendChild(marker)
        })
        svgEl.appendChild(defs)

        const linkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        linkGroup.setAttribute('class', 'links')
        const linkElements = edges.map((edge) => {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('stroke', 'rgba(45,226,197,0.12)')
          line.setAttribute('stroke-width', '1.5')
          line.setAttribute('stroke-dasharray', '4,4')
          return line
        })
        linkElements.forEach((el) => linkGroup.appendChild(el))
        svgEl.appendChild(linkGroup)

        const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        nodeGroup.setAttribute('class', 'nodes')

        const nodeElements = nodes.map((node, i) => {
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
          g.setAttribute('class', 'graph-node')
          g.style.cursor = 'pointer'

          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          const r = node.group === 'automation' || node.group === 'security' ? 10 : 8
          circle.setAttribute('r', r)
          circle.setAttribute('fill', node.color)
          circle.setAttribute('opacity', '0.85')
          circle.setAttribute('stroke', node.color)
          circle.setAttribute('stroke-width', '2')
          circle.setAttribute('stroke-opacity', '0.3')

          const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          glow.setAttribute('r', r + 6)
          glow.setAttribute('fill', node.color)
          glow.setAttribute('opacity', '0.08')

          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
          text.setAttribute('class', 'graph-label')
          text.setAttribute('dy', r + 16)
          text.setAttribute('text-anchor', 'middle')
          text.textContent = node.label

          g.appendChild(glow)
          g.appendChild(circle)
          g.appendChild(text)

          g.addEventListener('mouseenter', () => {
            setActiveNode(node)
            circle.setAttribute('opacity', '1')
            circle.setAttribute('r', r + 3)
          })
          g.addEventListener('mouseleave', () => {
            setActiveNode(null)
            circle.setAttribute('opacity', '0.85')
            circle.setAttribute('r', r)
          })
          g.addEventListener('click', () => {
            if (node.url && node.url !== '#') window.open(node.url, '_blank')
          })

          nodeRefs.current[node.id] = { g, circle, text }
          nodeGroup.appendChild(g)
          return g
        })
        svgEl.appendChild(nodeGroup)

        // Legend
        const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        legend.setAttribute('transform', 'translate(20, 20)')
        const legendItems = Object.entries(groupColors)
        legendItems.forEach(([group, color], i) => {
          const y = i * 22
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          dot.setAttribute('cx', '0')
          dot.setAttribute('cy', y)
          dot.setAttribute('r', '4')
          dot.setAttribute('fill', color)
          const label = document.createElementNS('http://www.w3.org/2000/svg', 'text')
          label.setAttribute('x', '12')
          label.setAttribute('y', y + 4)
          label.setAttribute('fill', 'rgba(201,214,223,0.6)')
          label.setAttribute('font-size', '11')
          label.setAttribute('font-family', 'JetBrains Mono, monospace')
          label.textContent = group.charAt(0).toUpperCase() + group.slice(1)
          legend.appendChild(dot)
          legend.appendChild(label)
        })
        svgEl.appendChild(legend)

        simulation.on('tick', () => {
          linkElements.forEach((line, i) => {
            const edge = edges[i]
            const s = edge.source
            const t = edge.target
            if (typeof s === 'object' && typeof t === 'object') {
              line.setAttribute('x1', s.x)
              line.setAttribute('y1', s.y)
              line.setAttribute('x2', t.x)
              line.setAttribute('y2', t.y)
            }
          })

          nodeElements.forEach((g, i) => {
            const node = nodes[i]
            g.setAttribute('transform', `translate(${node.x},${node.y})`)
          })
        })

        simRef.current = simulation

        const dragHandler = (() => {
          let isDragging = false
          let dragTarget = null
          let dragX = 0, dragY = 0

          const onMouseDown = (e) => {
            const target = e.target.closest('.graph-node')
            if (!target) return
            const idx = nodeElements.indexOf(target)
            if (idx === -1) return
            isDragging = true
            dragTarget = nodes[idx]
            dragX = e.clientX
            dragY = e.clientY
            if (simulation) simulation.alphaTarget(0.3).restart()
          }

          const onMouseMove = (e) => {
            if (!isDragging || !dragTarget) return
            const rect = svgEl.getBoundingClientRect()
            dragTarget.fx = e.clientX - rect.left
            dragTarget.fy = e.clientY - rect.top
          }

          const onMouseUp = () => {
            if (dragTarget) {
              dragTarget.fx = null
              dragTarget.fy = null
            }
            isDragging = false
            dragTarget = null
            if (simulation) simulation.alphaTarget(0)
          }

          svgEl.addEventListener('mousedown', onMouseDown)
          window.addEventListener('mousemove', onMouseMove)
          window.addEventListener('mouseup', onMouseUp)

          return () => {
            svgEl.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
          }
        })()

        return () => {
          if (simulation) simulation.stop()
          dragHandler()
        }
      } catch (e) {
        console.error('D3 failed to load:', e)
      }
    }

    importD3()
  }, [dimensions])

  return (
    <div ref={containerRef} className="graph-container rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] overflow-hidden">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />

      {/* Tooltip */}
      {activeNode && (
        <div className="absolute bottom-4 left-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm animate-in">
          <span className="text-[var(--cyan)] font-mono font-semibold">{activeNode.label}</span>
          <span className="text-[var(--text-muted)] ml-2 text-xs font-mono">
            {activeNode.group}
          </span>
        </div>
      )}
    </div>
  )
}