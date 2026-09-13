import { useRef, useState } from 'react'
import { Bell, Bookmark, ChevronDown, Globe2, Heart, Home, MessageCircle, Plus, Search, Send, UserPlus } from 'lucide-react'

const stories = [
  { name: 'Your Story', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=85', own: true },
  { name: 'Maya', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85', online: true },
  { name: 'Alex', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85' },
  { name: 'Sophie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=85', online: true },
  { name: 'Ken', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85' },
  { name: 'Sara', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=85' },
  { name: 'Liam', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85' },
]

function App() {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [following, setFollowing] = useState(false)
  const [active, setActive] = useState('home')
  const [notifications, setNotifications] = useState(3)
  const [heartBurst, setHeartBurst] = useState(false)
  const lastTap = useRef(0)

  const selectTab = (tab: string) => {
    setActive(tab)
    if (tab === 'notifications') setNotifications(0)
  }

  const handlePostTap = () => {
    const now = Date.now()
    if (now - lastTap.current < 320) {
      setLiked(true)
      setHeartBurst(false)
      requestAnimationFrame(() => setHeartBurst(true))
      window.setTimeout(() => setHeartBurst(false), 720)
    }
    lastTap.current = now
  }

  return (
    <div className="yuniko-root">
      <div className="yuniko-app-shell">
        <header className="yuniko-header">
          <button className="yuniko-logo tap-scale" onClick={() => selectTab('home')} aria-label="Yuniko home">Yuniko</button>
          <button className="world-feed tap-scale" aria-label="World Feed">
            <Globe2 /> <span>World Feed</span> <ChevronDown />
          </button>
          <div className="header-actions">
            <button className="tap-scale" aria-label="Search"><Search /></button>
            <button className="tap-scale" aria-label="Add friends"><UserPlus /></button>
          </div>
        </header>

        <section className="yuniko-stories" aria-label="Stories">
          <div className="stories-track">
            {stories.map((story) => (
              <button className="story-item tap-scale-story" key={story.name} aria-label={story.name}>
                <span className={`story-avatar-ring ${story.own ? 'own' : ''}`}>
                  <span className="story-avatar-inner"><img src={story.image} alt="" /></span>
                  {story.own && <span className="story-add"><Plus /></span>}
                </span>
                <span className="story-label">{story.name}</span>
                {story.online && <span className="story-online" />}
              </button>
            ))}
          </div>
        </section>

        <main className="yuniko-feed">
          <article className="yuniko-feed-item">
            <div className="post-card">
              <img className="post-image" onClick={handlePostTap} src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90" alt="Ocean sunset" />
              <div className="post-gradient" />
              {heartBurst && <div className="heart-burst" aria-hidden="true"><Heart fill="currentColor" /></div>}
              <div className="post-actions">
                <button className={`action-tap ${liked ? 'active' : ''}`} onClick={() => setLiked(v => !v)} aria-label="Like"><Heart fill={liked ? 'currentColor' : 'none'} /><span>{liked ? '25.7K' : '25.6K'}</span></button>
                <button className="action-tap" aria-label="Comments"><MessageCircle /><span>1.2K</span></button>
                <button className="action-tap" aria-label="Share"><Send /><span>3.4K</span></button>
                <button className={`action-tap ${saved ? 'active' : ''}`} onClick={() => setSaved(v => !v)} aria-label="Save"><Bookmark fill={saved ? 'currentColor' : 'none'} /><span>2.1K</span></button>
              </div>
              <div className="post-author">
                <div className="author-avatar"><img src={stories[0].image} alt="Aina" /></div>
                <div className="author-text"><strong>Aina <i>✓</i></strong><span>Madagascar 🇲🇬</span></div>
                <button className={`follow-button ${following ? 'following' : ''}`} onClick={() => setFollowing(v => !v)}>{following ? 'Following' : 'Follow'}</button>
              </div>
              <div className="post-caption"><strong>Sunset hits different 🌅✨</strong><span>#sunset #goodvibes #life</span></div>
            </div>
          </article>
        </main>

        <nav className="yuniko-bottom-nav" aria-label="Main navigation">
          <button className={`nav-tap ${active === 'home' ? 'active' : ''}`} onClick={() => selectTab('home')}><Home /><span>Home</span></button>
          <button className={`nav-tap ${active === 'notifications' ? 'active' : ''}`} onClick={() => selectTab('notifications')}><span className="nav-icon"><Bell />{notifications > 0 && <i>{notifications}</i>}</span><span>Notifications</span></button>
          <button className="create-button" aria-label="Create post"><Plus /></button>
          <button className={`nav-tap ${active === 'messages' ? 'active' : ''}`} onClick={() => selectTab('messages')}><MessageCircle /><span>Messages</span></button>
          <button className={`nav-tap ${active === 'profile' ? 'active' : ''}`} onClick={() => selectTab('profile')}><UserPlus /><span>Profile</span></button>
        </nav>
      </div>
    </div>
  )
}

export default App
