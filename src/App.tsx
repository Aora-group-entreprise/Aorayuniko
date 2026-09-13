import {useState} from 'react';
import {Search,UserPlus,Globe,ChevronDown} from 'lucide-react';
import {motion,AnimatePresence} from 'framer-motion';
import StoryAvatar from '@/components/StoryAvatar';
import PostCard from '@/components/PostCard';
import BottomNav from '@/components/BottomNav';

const posts=[
 {id:1,name:'Yuniko Creator',username:'yuniko',image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',caption:'Welcome to the Yuniko World Feed 🌍',likes:1280,comments:84,shares:42,verified:true},
 {id:2,name:'Aora Studio',username:'aorastudio',image:'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=85',caption:'Every post can reach the world.',likes:746,comments:31,shares:18,verified:true},
];
export default function App(){
 const[route,setRoute]=useState('/');const[worldOpen,setWorldOpen]=useState(false);
 if(route!=='/') return <div className="flex h-full items-center justify-center bg-[#0d0b14] text-white"><button onClick={()=>setRoute('/')} className="rounded-full bg-gradient-to-r from-[#FF3D9A] to-[#8B00FF] px-5 py-3 font-bold">Back to Yuniko</button></div>;
 return <div className="yuniko-app-shell">
  <header className="absolute inset-x-0 top-0 z-50 h-14 border-b border-white/5 bg-[rgba(10,8,18,.88)] backdrop-blur-xl"><div className="yuniko-header-inner flex h-full items-center justify-between gap-2 px-2 min-[360px]:px-4">
   <motion.button whileTap={{scale:.85}} className="shrink-0 text-xl font-black tracking-tight min-[360px]:text-2xl" style={{background:'linear-gradient(90deg,#FF3D9A,#C026D3,#8B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Yuniko</motion.button>
   <motion.button whileTap={{scale:.85}} onClick={()=>setWorldOpen(v=>!v)} className="flex min-w-0 items-center gap-1 rounded-full border border-[#ff3d9a]/30 bg-white/[.06] px-2 py-1.5 min-[360px]:px-3"><Globe size={12}/><span className="truncate text-xs font-medium text-white/90 min-[360px]:text-sm">World Feed</span><ChevronDown size={11}/></motion.button>
   <div className="flex shrink-0 items-center gap-3"><motion.button whileTap={{scale:.85}}><Search size={20} className="text-white/75"/></motion.button><motion.button whileTap={{scale:.85}}><UserPlus size={20} className="text-white/75"/></motion.button></div>
  </div></header>
  <AnimatePresence>{worldOpen&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="absolute left-1/2 top-[60px] z-[60] w-44 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#ff3d9a]/25 bg-[#120e1e] shadow-2xl"><button onClick={()=>setWorldOpen(false)} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-white/90"><Globe size={14}/>World Feed</button></motion.div>}</AnimatePresence>
  <div className="absolute inset-x-0 top-14 z-40 h-[78px] border-b border-white/5 bg-[rgba(10,8,18,.82)] backdrop-blur-xl"><div className="yuniko-stories-inner flex h-full items-center gap-3 overflow-x-auto px-2 min-[360px]:px-4 no-scrollbar"><StoryAvatar isOwn/><StoryAvatar name="Aora"/><StoryAvatar name="Mira"/><StoryAvatar name="Leo"/><StoryAvatar name="Sofia"/><StoryAvatar name="Nia"/></div></div>
  <div className="absolute inset-x-0 top-[134px] bottom-16 overflow-y-scroll px-1.5 min-[360px]:px-2.5 no-scrollbar" style={{scrollSnapType:'y mandatory'}}>{posts.map(post=><div key={post.id} className="h-[calc(100dvh-198px)] w-full py-1" style={{scrollSnapAlign:'start'}}><PostCard post={post}/></div>)}</div>
  <BottomNav active="home" onNavigate={setRoute}/>
 </div>
}
