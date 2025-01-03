'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Image,
  Plus,
  Text,
  Video,
  Film,
  Hash,
  Mail,
  Phone,
  Calendar,
  Star,
  Square,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/services/axiosInstance'
import { useFormContext } from '@/providers/FormContextPRovider'

interface Node {
  id: number
  x: number
  y: number
  text: string
  type:
    | 'text'
    | 'image'
    | 'video'
    | 'gif'
    | 'number'
    | 'email'
    | 'phone'
    | 'date'
    | 'rating'
    | 'button'
  category: 'bubbles' | 'inputs'
  content?: string
}

// Zoom Controls Component
function ZoomControls({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  scale: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        backgroundColor: 'var(--secondary)',
        padding: '8px',
        borderRadius: '8px',
      }}
    >
      <Button
        onClick={onZoomIn}
        style={{ padding: '8px 12px' }}
      >
        +
      </Button>
      <Button
        onClick={onReset}
        style={{ padding: '8px 12px' }}
      >
        {Math.round(scale * 100)}%
      </Button>
      <Button
        onClick={onZoomOut}
        style={{ padding: '8px 12px' }}
      >
        -
      </Button>
    </div>
  )
}

// Modified Add Node Button Component
function AddNodeButton({
  onAdd,
  mediaTypes,
}: {
  onAdd: (type: Node['type']) => void
  mediaTypes: {
    category: string
    items: { name: string; icon: React.ReactNode; type: Node['type'] }[]
  }[]
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        backgroundColor: 'var(--secondary)',
        borderRadius: '14px',
        zIndex: 1000,
        padding: '8px',
        minWidth: '200px',
      }}
    >
      {mediaTypes.map((category) => (
        <div key={category.category}>
          <h3
            style={{
              padding: '8px 16px',
              fontWeight: 500,
              color: 'var(--primary)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {category.category}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              padding: '8px',
            }}
          >
            {category.items.map((item) => (
              <Button
                key={item.name}
                onClick={() => onAdd(item.type)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: '8px',
                  color: 'var(--primary)',
                  backgroundColor: 'var(--secondary2)',
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Simplified NodeElement Component
function NodeElement({
  node,
  onMouseDown,
  onChange,
  deleteNode,
  isSelected,
  onClick,
}: {
  node: Node
  onMouseDown: (e: React.MouseEvent, node: Node) => void
  onChange: (value: string, node: Node) => void
  isSelected: boolean
  onClick: (e: React.MouseEvent, node: Node) => void
  deleteNode: (nodeId: number) => void
}) {
  const renderContent = () => {
    switch (node.type) {
      case 'image':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Image
            </h1>
            <Input
              type="text"
              placeholder="Enter image URL"
              value={node.content || ''}
              style={{
                width: '100%',
              }}
              onChange={(e) => onChange(e.target.value, node)}
            />
            {node.content && (
              <img
                src={node.content}
                alt="Preview"
                style={{
                  maxWidth: '200px',
                  marginTop: '8px',
                  borderRadius: '8px',
                }}
              />
            )}
          </div>
        )
      case 'video':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Video
            </h1>
            <Input
              type="text"
              placeholder="Enter video URL"
              value={node.content || ''}
              style={{
                width: '100%',
              }}
              onChange={(e) => onChange(e.target.value, node)}
            />
            {node.content && (
              <video
                src={node.content}
                controls
                style={{ maxWidth: '200px', marginTop: '8px' }}
              />
            )}
          </div>
        )
      case 'gif':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              GIF
            </h1>
            <Input
              type="text"
              placeholder="Enter GIF URL"
              value={node.content || ''}
              style={{
                width: '100%',
              }}
              onChange={(e) => onChange(e.target.value, node)}
            />
            {node.content && (
              <img
                src={node.content}
                alt="GIF"
                style={{ maxWidth: '200px', marginTop: '8px' }}
              />
            )}
          </div>
        )
      case 'number':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Number
            </h1>
            <Input
              type="number"
              value={node.content || ''}
              placeholder="Enter number"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        )
      case 'email':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Email
            </h1>
            <Input
              type="email"
              value={node.content || ''}
              placeholder="Enter email"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        )
      case 'phone':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Phone
            </h1>
            <Input
              type="tel"
              value={node.content || ''}
              placeholder="Enter phone number"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        )
      case 'date':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Date
            </h1>
            <Input
              type="date"
              value={node.content || ''}
              placeholder="Enter date"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        )
      case 'rating':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Rating
            </h1>
            <Input
              type="number"
              value={node.content || ''}
              placeholder="Enter rating"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        )
      case 'button':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Button
            </h1>
            <Input
              type="text"
              value={node.content || ''}
              placeholder="Enter button text"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
            <Button
              style={{
                marginTop: '8px',
                backgroundColor: 'var(--primary)',
                color: 'var(--background)',
              }}
            >
              {node.content || 'Button'}
            </Button>
          </div>
        )
      default:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: '8px',
            }}
          >
            <X
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                cursor: 'pointer',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--secondary2)',
                borderRadius: '50%',
                padding: '4px',
              }}
              color="var(--danger)"
              onClick={() => deleteNode(node.id)}
            />
            <h1
              style={{
                fontWeight: 'bold',
              }}
            >
              Text
            </h1>
            <Input
              type="text"
              value={node.text}
              placeholder="Enter text"
              onChange={(e) => onChange(e.target.value, node)}
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        )
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: node.y,
        left: node.x,
        padding: '16px',
        backgroundColor: 'var(--secondary)',
        border: `2px solid ${
          isSelected ? 'var(--primary)' : 'var(--secondary2)'
        }`,
        borderRadius: '14px',
        cursor: 'move',
        minWidth: '200px', // Add minimum width for consistent connection points
        boxShadow: isSelected ? '0 0 0 2px var(--primary-light)' : 'none',
      }}
      onMouseDown={(e) => {
        onMouseDown(e, node)
        onClick(e, node)
      }}
      onClick={(e) => onClick(e, node)}
    >
      {renderContent()}
    </div>
  )
}

export default function FlowSpace() {
  const { nodes, setNodes } = useFormContext();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null)
  const [mediaTypes] = useState([
    {
      category: 'Bubbles',
      items: [
        {
          name: 'Text',
          icon: (
            <Text
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'text' as const,
        },
        {
          name: 'Image',
          icon: (
            <Image
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'image' as const,
        },
        {
          name: 'Video',
          icon: (
            <Video
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'video' as const,
        },
        {
          name: 'GIF',
          icon: (
            <Film
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'gif' as const,
        },
      ],
    },
    {
      category: 'Inputs',
      items: [
        {
          name: 'Text',
          icon: (
            <Text
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'text' as const,
        },
        {
          name: 'Number',
          icon: (
            <Hash
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'number' as const,
        },
        {
          name: 'Email',
          icon: (
            <Mail
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'email' as const,
        },
        {
          name: 'Phone',
          icon: (
            <Phone
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'phone' as const,
        },
        {
          name: 'Date',
          icon: (
            <Calendar
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'date' as const,
        },
        {
          name: 'Rating',
          icon: (
            <Star
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'rating' as const,
        },
        {
          name: 'Button',
          icon: (
            <Square
              style={{ width: '24px', height: '24px' }}
              color="var(--link)"
            />
          ),
          type: 'button' as const,
        },
      ],
    },
  ])

  // const addNode = (type: Node['type']) => {
   
  //   setNodes([...nodes, newNode])
  // }

  const addNode = (type: Node['type']) => {
    // Calculate the position for the new node
    const lastNode = nodes[nodes.length - 1];
    const gap = 120; // Gap between nodes
    const newNode = {
      id: nodes.length + 1,
      x: lastNode ? lastNode.x : 300, // Keep it aligned horizontally
      y: lastNode ? lastNode.y + gap : 100 + gap, // Place below the last node
      text: '',
      type,
      category: 'inputs',
      content: '',
    } as Node;

    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: number) => {
    setNodes(nodes.filter((n) => n.id !== nodeId))
  }



  
  const handleMouseDown = (e: React.MouseEvent, node: Node) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    setDragOffset({ x: offsetX, y: offsetY })
    setSelectedNode(node)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && selectedNode) {
      const rect = containerRef.current.getBoundingClientRect()
      const updatedNodes = nodes.map((n) =>
        n.id === selectedNode.id
          ? {
              ...n,
              x: (e.clientX - rect.left - dragOffset.x) / scale,
              y: (e.clientY - rect.top - dragOffset.y) / scale,
            }
          : n
      )
      setNodes(updatedNodes)
    }
  }

  const handleMouseUp = () => {
    setSelectedNode(null)
  }

  // Initialize with the start bubble
  useEffect(() => {
    if (nodes.length === 0) {
      setNodes([
        {
          id: 1,
          x: 300, // Center horizontally
          y: 100, // Start near the top
          text: 'Start',
          type: 'text',
          category: 'bubbles',
        },
      ]);
    }
  }, [nodes, setNodes]);

  const handleContentChange = (value: string, node: Node) => {
    const updatedNodes = nodes.map((n) =>
      n.id === node.id
        ? node.type === 'text'
          ? { ...n, text: value }
          : { ...n, content: value }
        : n
    )
    setNodes(updatedNodes)
  }

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const zoomSensitivity = 0.0002 // Smaller value for finer control
      setScale((prevScale) =>
        Math.min(Math.max(prevScale - e.deltaY * zoomSensitivity, 0.1), 4)
      )
    }
  }

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 4))
  }

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1))
  }

  const handleZoomReset = () => {
    setScale(1)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  //   useEffect(() => {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       if ((e.key === 'Backspace' || e.key === 'Delete') && selectedNodeId) {
  //         setNodes(nodes.filter((n) => n.id !== selectedNodeId))
  //         setSelectedNodeId(null)
  //       }
  //     }

  //     window.addEventListener('keydown', handleKeyDown)
  //     return () => window.removeEventListener('keydown', handleKeyDown)
  //   }, [selectedNodeId, nodes])

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setSelectedNodeId(null)
    }
  }

  const handleNodeClick = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation()
    setSelectedNodeId(node.id)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleBackgroundClick}
      style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        height: '100%',
        backgroundColor: 'var(--background)',
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: `${20 * scale}px ${20 * scale}px`,
        overflow: 'hidden',
      }}
    >
      <AddNodeButton
        mediaTypes={mediaTypes}
        onAdd={addNode}
      />
      <ZoomControls
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleZoomReset}
      />
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
        }}
      >
        {nodes.map((node) => (
          <NodeElement
            key={node.id}
            node={node}
            deleteNode={deleteNode}
            onMouseDown={handleMouseDown}
            onChange={handleContentChange}
            isSelected={node.id === selectedNodeId}
            onClick={handleNodeClick}
          />
        ))}
      </div>
    </div>
  )
}
