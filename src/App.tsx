import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Bookmark, ChevronDown, Globe2, Heart, Home, MessageCircle, Plus, Search, Send, User, UserPlus } from 'lucide-react'

const stories = [
  { name: 'Your Story', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=85', own: true },
  { name: 'Maya', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85', online: true },
  { name: 'Alex', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85' },
  { name: 'Sophie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=85', online: true },
  { name: 'Ken', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85' },
  { name: 'Sara', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=85' },
]

export default function App() {
  const [liked, setLiked] = useState(false), [saved, setSaved] = useState(false), [following, setFollowing] = useState(false)
  const [active, setActive] = useState('home'), [notifications, setNotifications] = useState(3), [heartBurst, setHeartBurst] = useState(false), [worldFeedOpen, setWorldFeedOpen] = useState(false)
  const lastTap = useRef(0)
  const selectTab = (tab: string) => { setActive(tab); if (tab === 'notifications') setNotifications(0) }
  const handlePostTap = () => { const now = Date.now(); if (now - lastTap.current < 320) { setLiked(true); setHeartBurst(false); requestAnimationFrame(() => setHeartBurst(true)); window.setTimeout(() => setHeartBurst(false), 800) } lastTap.current = now }

  return <div className="yuniko-root"><div className="yuniko-app-shell">
    <header className="yuniko-header">
      <motion.button className="yuniko-logo" whileTap={{ scale: 0.85 }} onClick={() => selectTab('home')} aria-label="Yuniko home">Yuniko</motion.button>
      <motion.button className="world-feed" whileTap={{ scale: 0.96 }} onClick={() => setWorldFeedOpen(v => !v)} aria-label="World Feed"><Globe2/><span>World Feed</span><ChevronDown/></motion.button>
      <div className="header-actions"><motion.button whileTap={{ scale: 0.85 }} aria-label="Search"><Search/></motion.button><motion.button whileTap={{ scale: 0.85 }} aria-label="Add friends"><UserPlus/></motion.button></div>
    </header>
    <AnimatePresence>{worldFeedOpen && <><motion.button className="world-feed-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setWorldFeedOpen(false)} aria-label="Close"/><motion.div className="world-feed-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><motion.button whileTap={{ scale: 0.96 }} onClick={() => setWorldFeedOpen(false)}><Globe2/> World Feed</motion.button></motion.div></>}</AnimatePresence>
    <section className="yuniko-stories"><div className="stories-track">{stories.map(story => <motion.button className="story-item" key={story.name} whileTap={{ scale: 0.9 }} aria-label={story.name}><span className={`story-avatar-ring ${story.own ? 'own' : ''}`}><span className="story-avatar-inner"><img src={story.image} alt=""/></span>{story.own && <span className="story-add"><Plus/></span>}</span><span className="story-label">{story.name}</span>{story.online && <span className="story-online"/>}</motion.button>)}</div></section>
    <main className="yuniko-feed"><article className="yuniko-feed-item"><div className="post-card">
      <img className="post-image" onClick={handlePostTap} src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90" alt="Ocean sunset"/><div className="post-gradient"/>
      <AnimatePresence>{heartBurst && <motion.div key="heart-burst" className="heart-burst" initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}><Heart size={100} fill="currentColor"/></motion.div>}</AnimatePresence>
      <div className="post-actions"><ActionButton active={liked} onClick={() => setLiked(v => !v)} icon={<Heart fill={liked ? 'currentColor' : 'none'}/>} count={liked ? '25.7K' : '25.6K'}/><ActionButton icon={<MessageCircle/>} count="1.2K"/><ActionButton icon={<Send/>} count="3.4K"/><ActionButton active={saved} onClick={() => setSaved(v => !v)} icon={<Bookmark fill={saved ? 'currentColor' : 'none'}/>} count="2.1K"/></div>
      <div className="post-author"><div className="author-avatar"><img src={stories[0].image} alt="Aina"/></div><div className="author-text"><strong>Aina <i>✓</i></strong><span>Madagascar 🇲🇬</span></div><motion.button className={`follow-button ${following ? 'following' : ''}`} whileTap={{ scale: 0.93 }} onClick={() => setFollowing(v => !v)}>{following ? 'Following' : 'Follow'}</motion.button></div>
      <div className="post-caption"><strong>Sunset hits different 🌅✨</strong><span>#sunset #goodvibes #life</span></div>
    </div></article></main>
    <nav className="yuniko-bottom-nav"><NavButton active={active === 'home'} onClick={() => selectTab('home')} icon={<Home/>} label="Home"/><NavButton active={active === 'notifications'} onClick={() => selectTab('notifications')} icon={<Bell/>} label="Notifications" badge={notifications}/><motion.button className="create-button" aria-label="Create post" whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.05 }}><Plus/></motion.button><NavButton active={active === 'messages'} onClick={() => selectTab('messages')} icon={<MessageCircle/>} label="Messages"/><NavButton active={active === 'profile'} onClick={() => selectTab('profile')} icon={<User/>} label="Profile"/></nav>
  </div></div>
}
function ActionButton({ active, onClick, icon, count }: { active?: boolean; onClick?: () => void; icon: React.ReactNode; count: string }) { return <motion.button className="action-button" whileTap={{ scale: 0.85 }} onClick={onClick}><motion.div className="action-button-circle" animate={active ? { boxShadow: '0 0 14px rgba(255,61,154,0.4)' } : { boxShadow: 'none' }}>{icon}</motion.div><span>{count}</span></motion.button> }
function NavButton({ active, onClick, icon, label, badge }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: number }) { return <motion.button className={`nav-button ${active ? 'active' : ''}`} whileTap={{ scale: 0.88 }} onClick={onClick}><span className="nav-icon">{icon}{badge ? <i>{badge}</i> : null}</span><span>{label}</span></motion.button> }
