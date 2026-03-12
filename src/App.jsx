import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useSpring, useTrail, animated } from '@react-spring/web'

// CSS 过渡动画组件
function CSSTransition() {
  const [active, setActive] = useState(false)
  
  return (
    <div className="demo-section">
      <h3>🎨 CSS Transition - 基础过渡</h3>
      <div className="demo-content">
        <button onClick={() => setActive(!active)} className="demo-button">
          点击切换
        </button>
        <div className={`box css-box ${active ? 'active' : ''}`}>
          {active ? '展开啦！' : '点我'}
        </div>
      </div>
    </div>
  )
}

// CSS Keyframes 动画
function CSSKeyframes() {
  const [playing, setPlaying] = useState(false)
  
  return (
    <div className="demo-section">
      <h3>🎬 CSS Keyframes - 关键帧动画</h3>
      <div className="demo-content">
        <button onClick={() => setPlaying(!playing)} className="demo-button">
          {playing ? '停止' : '播放'}
        </button>
        <div className={`ball ${playing ? 'bounce' : ''}`}></div>
        <div className={`spinner ${playing ? 'spin' : ''}`}></div>
      </div>
    </div>
  )
}

// Framer Motion 基础动画
function FramerBasic() {
  return (
    <div className="demo-section">
      <h3>⚡ Framer Motion - 基础动画</h3>
      <div className="demo-content">
        <motion.button
          className="demo-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          悬停点击
        </motion.button>
        <motion.div
          className="box"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>
    </div>
  )
}

// Framer Motion 动画序列
function FramerSequence() {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1 }
    })
  }
  
  return (
    <div className="demo-section">
      <h3>📝 Framer Motion - 动画序列</h3>
      <div className="demo-content row">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="mini-box"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={variants}
          />
        ))}
      </div>
    </div>
  )
}

// Framer Motion 滚动动画
function FramerScroll() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const color = useTransform(scrollYProgress, [0, 0.5, 1], ['#ff6b6b', '#4ecdc4', '#45b7d1'])
  
  return (
    <div className="demo-section">
      <h3>📜 Framer Motion - 滚动动画</h3>
      <div className="demo-content">
        <p className="hint">向下滚动查看效果 ↓</p>
        <motion.div
          className="scroll-box"
          style={{ scaleX, rotate, backgroundColor: color }}
        />
        <div className="scroll-spacer"></div>
      </div>
    </div>
  )
}

// React Spring 弹簧动画
function ReactSpring() {
  const [toggle, setToggle] = useState(false)
  const props = useSpring({
    to: {
      width: toggle ? 200 : 80,
      height: toggle ? 200 : 80,
      backgroundColor: toggle ? '#4ecdc4' : '#ff6b6b',
      borderRadius: toggle ? '50%' : '10px'
    },
    config: { mass: 1, tension: 170, friction: 26 }
  })
  
  return (
    <div className="demo-section">
      <h3>🌀 React Spring - 弹簧物理</h3>
      <div className="demo-content">
        <button onClick={() => setToggle(!toggle)} className="demo-button">
          切换形态
        </button>
        <animated.div style={props} className="spring-box" />
      </div>
    </div>
  )
}

// React Spring 轨迹动画
function ReactSpringTrail() {
  const [items, setItems] = useState([1, 2, 3, 4])
  
  const trail = useTrail(items.length, {
    from: { opacity: 0, x: 20 },
    to: { opacity: 1, x: 0 }
  })
  
  return (
    <div className="demo-section">
      <h3>〰️ React Spring - Trail 轨迹</h3>
      <div className="demo-content">
        <button onClick={() => setItems(items.length > 6 ? [1,2,3,4] : [...items, items.length + 1])} className="demo-button">
          添加/重置
        </button>
        <div className="trail-container">
          {trail.map((style, index) => (
            <animated.div key={items[index]} style={style} className="trail-box">
              {items[index]}
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 列表进出场动画
function ListAnimation() {
  const [items, setItems] = useState(['苹果', '香蕉', '橙子'])
  
  const addItem = () => {
    const fruits = ['西瓜', '葡萄', '草莓', '菠萝', '芒果']
    setItems([...items, fruits[Math.floor(Math.random() * fruits.length)]])
  }
  
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }
  
  return (
    <div className="demo-section">
      <h3>📋 AnimatePresence - 列表进出场</h3>
      <div className="demo-content">
        <div className="button-group">
          <button onClick={addItem} className="demo-button">添加</button>
          <button onClick={() => setItems([])} className="demo-button danger">清空</button>
        </div>
        <ul className="list-container">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                onClick={() => removeItem(index)}
                className="list-item"
              >
                {item}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}

// 拖拽动画
function DragAnimation() {
  return (
    <div className="demo-section">
      <h3>✋ Framer Motion - 拖拽</h3>
      <div className="demo-content">
        <motion.div
          className="drag-box"
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <p className="hint">可以拖拽我！</p>
      </div>
    </div>
  )
}

// 视差效果
function ParallaxEffect() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const rotate = useTransform(scrollY, [0, 500], [0, 180])
  
  return (
    <div className="demo-section">
      <h3>🎆 视差滚动效果</h3>
      <div className="demo-content parallax-container">
        <motion.div style={{ y: y1, rotate }} className="parallax-box box1">
          🌟
        </motion.div>
        <motion.div style={{ y: y2 }} className="parallax-box box2">
          🌙
        </motion.div>
        <motion.div style={{ y: y1 }} className="parallax-box box3">
          🚀
        </motion.div>
        <div className="scroll-spacer"></div>
      </div>
    </div>
  )
}

// 加载动画集合
function LoadingAnimations() {
  return (
    <div className="demo-section">
      <h3>⏳ Loading 动画集合</h3>
      <div className="demo-content loading-grid">
        <div className="loader1"></div>
        <div className="loader2"></div>
        <div className="loader3"></div>
        <div className="loader4"></div>
        <div className="loader5">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="loader6"></div>
      </div>
    </div>
  )
}

// 3D 翻转卡片
function FlipCard3D() {
  const [flipped, setFlipped] = useState(false)
  
  return (
    <div className="demo-section">
      <h3>🃏 3D 翻转卡片</h3>
      <div className="demo-content">
        <div className="flip-container" onClick={() => setFlipped(!flipped)}>
          <motion.div
            className="flip-card"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flip-front">👋</div>
            <div className="flip-back">❤️</div>
          </motion.div>
        </div>
        <p className="hint">点击卡片翻转</p>
      </div>
    </div>
  )
}

// 打字机效果
function Typewriter() {
  const text = "你好！我是叻猫 🐱"
  const [displayed, setDisplayed] = useState("")
  
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="demo-section">
      <h3>⌨️ 打字机效果</h3>
      <div className="demo-content">
        <p className="typewriter-text">{displayed}<span className="cursor">|</span></p>
      </div>
    </div>
  )
}

// 背景动画
function BackgroundAnimation() {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 10 + 5,
          duration: Math.random() * 3 + 2
        }
      ])
    }, 300)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="demo-section">
      <h3>✨ 粒子背景动画</h3>
      <div className="demo-content bg-anim-container">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="particle"
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: -100, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size
            }}
          />
        ))}
        <p className="hint">✨ 粒子飞舞 ✨</p>
      </div>
    </div>
  )
}

// 主 App
function App() {
  const [activeTab, setActiveTab] = useState('all')
  
  const demos = [
    { id: 'css-transition', component: <CSSTransition /> },
    { id: 'css-keyframes', component: <CSSKeyframes /> },
    { id: 'framer-basic', component: <FramerBasic /> },
    { id: 'framer-sequence', component: <FramerSequence /> },
    { id: 'framer-scroll', component: <FramerScroll /> },
    { id: 'react-spring', component: <ReactSpring /> },
    { id: 'react-spring-trail', component: <ReactSpringTrail /> },
    { id: 'list-animation', component: <ListAnimation /> },
    { id: 'drag-animation', component: <DragAnimation /> },
    { id: 'parallax', component: <ParallaxEffect /> },
    { id: 'loading', component: <LoadingAnimations /> },
    { id: 'flip-3d', component: <FlipCard3D /> },
    { id: 'typewriter', component: <Typewriter /> },
    { id: 'background-anim', component: <BackgroundAnimation /> },
  ]
  
  return (
    <div className="app">
      <header className="header">
        <h1>🎨 动画 Playground</h1>
        <p>叻猫的动画技巧展示 🐱</p>
      </header>
      
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          全部
        </button>
        <button
          className={`tab ${activeTab === 'css' ? 'active' : ''}`}
          onClick={() => setActiveTab('css')}
        >
          CSS
        </button>
        <button
          className={`tab ${activeTab === 'framer' ? 'active' : ''}`}
          onClick={() => setActiveTab('framer')}
        >
          Framer
        </button>
        <button
          className={`tab ${activeTab === 'spring' ? 'active' : ''}`}
          onClick={() => setActiveTab('spring')}
        >
          Spring
        </button>
      </nav>
      
      <main className="main">
        {demos
          .filter(d => {
            if (activeTab === 'all') return true
            if (activeTab === 'css') return d.id.includes('css')
            if (activeTab === 'framer') return d.id.includes('framer') || d.id.includes('list') || d.id.includes('drag') || d.id.includes('parallax') || d.id.includes('flip') || d.id.includes('background')
            if (activeTab === 'spring') return d.id.includes('spring')
            return true
          })
          .map(demo => (
            <div key={demo.id} className="demo-card">
              {demo.component}
            </div>
          ))
        }
      </main>
      
      <footer className="footer">
        <p>Built with React + Framer Motion + React Spring 🐱</p>
      </footer>
    </div>
  )
}

export default App
