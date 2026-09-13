import { useState } from 'react'
import {
  Bell,
  Bookmark,
  ChevronDown,
  Globe2,
  Heart,
  Home,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  User,
  UserPlus,
} from 'lucide-react'

const stories = [
  { name: 'Your Story', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80', own: true },
  { name: 'Maya', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80', online: true },
  { name: 'Alex', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
  { name: 'Sophie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80', online: true },
  { name: 'Ken', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80' },
  { name: 'Sara', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80' },
  { name: 'Liam', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80' },
]

function App() {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [following, setFollowing] = useState(false)
  const [active, setActive] = useState('home')
  const [notifications, setNotifications] = useState(3)

  const selectTab = (tab: string) => {
    setActive(tab)
    if (tab === 'notifications') setNotifications(0)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" aria-label="Yuniko home" onClick={() => selectTab('home')}>
          <span>Yuniko</span>
        </button>

        <button className="world-feed" aria-label="Change feed">
          <Globe2 size={18} />
          <span>World Feed</span>
          <ChevronDown size={15} />
        </button>

        <div className="top-actions">
          <button aria-label="Search"><Search size={23} /></button>
          <button aria-label="Profile" onClick={() => selectTab('profile')}><User size={23} /></button>
        </div>
      </header>

      <main className="feed">
        <section className="stories-section" aria-label="Stories">
          <div className="stories">
            {stories.map((story) => (
              <button className="story" key={story.name} aria-label={story.name}>
                <span className={`story-ring ${story.own ? 'own' : ''}`}>
                  <span className="story-image-wrap">
                    <img src={story.image} alt="" className="story-image" />
                    {story.own && <span className="story-plus"><Plus size={14} /></span>}
                  </span>
                </span>
                <span className="story-name">{story.name}</span>
                {story.online && <span className="online-dot" />}
              </button>
            ))}
          </div>
        </section>

        <article className="post-card">
          <div className="post-media">
            <img
              src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=85"
              alt="Sunset by the ocean"
            />
            <div className="media-overlay" />

            <div className="side-actions">
              <button className={liked ? 'active' : ''} onClick={() => setLiked(!liked)} aria-label="Like">
                <Heart size={28} fill={liked ? 'currentColor' : 'none'} />
                <span>{liked ? '25.7K' : '25.6K'}</span>
              </button>
              <button aria-label="Comments">
                <MessageCircle size={27} />
                <span>1.2K</span>
              </button>
              <button aria-label="Share">
                <Send size={27} />
                <span>3.4K</span>
              </button>
              <button className={saved ? 'active' : ''} onClick={() => setSaved(!saved)} aria-label="Save">
                <Bookmark size={27} fill={saved ? 'currentColor' : 'none'} />
                <span>2.1K</span>
              </button>
            </div>

            <div className="creator-overlay">
              <div className="creator-avatar-wrap">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" alt="Aina" />
              </div>
              <div className="creator-info">
                <div className="creator-name"><strong>Aina</strong><span className="verified">✓</span></div>
                <span>Madagascar 🇲🇬</span>
              </div>
              <button className={`follow ${following ? 'following' : ''}`} onClick={() => setFollowing(!following)}>
                {following ? 'Following' : 'Follow'}
              </button>
            </div>

            <div className="caption-overlay">
              <p>Sunset hits different 🌅✨</p>
              <span>#sunset #goodvibes #life</span>
            </div>
          </div>
        </article>

        <button className="feed-more" aria-label="More options"><MoreHorizontal size={22} /></button>
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button className={active === 'home' ? 'selected' : ''} onClick={() => selectTab('home')}>
          <Home size={23} />
          <span>Home</span>
        </button>
        <button className={active === 'notifications' ? 'selected' : ''} onClick={() => selectTab('notifications')}>
          <span className="nav-icon-wrap"><Bell size={23} />{notifications > 0 && <i>{notifications}</i>}</span>
          <span>Notifications</span>
        </button>
        <button className="create" aria-label="Create post">
          <Plus size={34} />
        </button>
        <button className={active === 'messages' ? 'selected' : ''} onClick={() => selectTab('messages')}>
          <MessageCircle size={23} />
          <span>Messages</span>
        </button>
        <button className={active === 'profile' ? 'selected' : ''} onClick={() => selectTab('profile')}>
          <UserPlus size={23} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  )
}

export default App
