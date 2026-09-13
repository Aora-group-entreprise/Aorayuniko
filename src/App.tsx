import { useState } from 'react'
import { Bell, Bookmark, Globe2, Heart, Home, MessageCircle, MoreHorizontal, Plus, Search, Send, UserPlus } from 'lucide-react'

const stories = [
  { name: 'Your story', initials: 'Y', own: true },
  { name: 'Maya', initials: 'M' },
  { name: 'Lina', initials: 'L' },
  { name: 'Noah', initials: 'N' },
  { name: 'Aina', initials: 'A' },
]

function App() {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [following, setFollowing] = useState(false)
  const [active, setActive] = useState('home')

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">Y</span><span>Yuniko</span></div>
        <div className="top-actions">
          <button aria-label="Search"><Search size={20} /></button>
          <button aria-label="Add friends"><UserPlus size={20} /></button>
          <button aria-label="Notifications" className="notification-button"><Bell size={20} /><i>3</i></button>
        </div>
      </header>

      <main className="feed">
        <div className="feed-title-row">
          <button className="world-feed"><Globe2 size={19} /> World Feed <span>⌄</span></button>
          <button className="more"><MoreHorizontal size={21} /></button>
        </div>

        <div className="stories">
          {stories.map((story) => (
            <button className="story" key={story.name}>
              <span className={`story-ring ${story.own ? 'own' : ''}`}><span className="avatar">{story.initials}</span></span>
              <small>{story.name}</small>
            </button>
          ))}
        </div>

        <article className="post-card">
          <div className="post-visual">
            <div className="visual-glow" />
            <div className="visual-copy"><span>WORLD</span><strong>Every voice<br />can travel.</strong></div>
          </div>
          <div className="post-body">
            <div className="creator-row">
              <div className="creator"><span className="avatar creator-avatar">A</span><div><b>Aina Rakoto</b><span>Madagascar · 2h</span></div></div>
              <button className={`follow ${following ? 'following' : ''}`} onClick={() => setFollowing(!following)}>{following ? 'Following' : 'Follow'}</button>
            </div>
            <p>Sharing a moment from home. 🌍✨</p>
            <div className="post-actions">
              <button className={liked ? 'active' : ''} onClick={() => setLiked(!liked)}><Heart size={23} fill={liked ? 'currentColor' : 'none'} /><span>{liked ? '128' : '127'}</span></button>
              <button><MessageCircle size={23} /><span>24</span></button>
              <button><Send size={22} /><span>Share</span></button>
              <button className={saved ? 'active' : ''} onClick={() => setSaved(!saved)}><Bookmark size={22} fill={saved ? 'currentColor' : 'none'} /></button>
            </div>
          </div>
        </article>
      </main>

      <nav className="bottom-nav">
        <button className={active === 'home' ? 'selected' : ''} onClick={() => setActive('home')}><Home size={22} /></button>
        <button className={active === 'notifications' ? 'selected' : ''} onClick={() => setActive('notifications')}><Bell size={22} /></button>
        <button className="create" aria-label="Create"><Plus size={28} /></button>
        <button className={active === 'messages' ? 'selected' : ''} onClick={() => setActive('messages')}><MessageCircle size={22} /></button>
        <button className={active === 'profile' ? 'selected' : ''} onClick={() => setActive('profile')}><span className="mini-profile">Y</span></button>
      </nav>
    </div>
  )
}

export default App
