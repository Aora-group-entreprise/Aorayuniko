import {useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import {Heart,MessageCircle,Share2,Bookmark,MoreHorizontal,BadgeCheck} from 'lucide-react';

type Post={id:number;name:string;username:string;avatar?:string;image?:string;caption:string;likes:number;comments:number;shares:number;verified?:boolean};
export default function PostCard({post}:{post:Post}){
 const[liked,setLiked]=useState(false),[saved,setSaved]=useState(false),[heart,setHeart]=useState(false),[likes,setLikes]=useState(post.likes);
 const tap=()=>{if(!liked){setLiked(true);setLikes(v=>v+1)}else{setLiked(false);setLikes(v=>Math.max(0,v-1))}};
 const double=()=>{if(!liked){setLiked(true);setLikes(v=>v+1)}setHeart(true);setTimeout(()=>setHeart(false),800)};
 const avatar=post.avatar??`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(post.name)}&backgroundColor=FF3D9A`;
 return <div className="relative h-full w-full overflow-hidden rounded-[16px] min-[360px]:rounded-[20px] bg-[#17121f]">
  {post.image?<img src={post.image} onClick={double} className="absolute inset-0 h-full w-full object-cover"/>:<div onClick={double} className="absolute inset-0 flex items-center justify-center p-8" style={{background:'linear-gradient(145deg,#160b22,#301141 48%,#090710)'}}><p className="text-center text-2xl font-black leading-tight text-white">{post.caption}</p></div>}
  <div className="pointer-events-none absolute inset-0" style={{background:'linear-gradient(to top,rgba(0,0,0,.9),rgba(0,0,0,.2) 48%,transparent 72%)'}}/>
  <motion.button whileTap={{scale:.88}} className="absolute right-3 top-3 z-20 rounded-full bg-black/40 p-2 backdrop-blur-md"><MoreHorizontal size={19} className="text-white"/></motion.button>
  <AnimatePresence>{heart&&<motion.div initial={{scale:.5,opacity:1}} animate={{scale:1.6,opacity:0}} exit={{opacity:0}} transition={{duration:.7,ease:'easeOut'}} className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"><Heart size={100} className="fill-red-500 text-red-500"/></motion.div>}</AnimatePresence>
  <div className="absolute bottom-24 right-3 z-20 flex flex-col items-center gap-3">
   <Action icon={<Heart size={24} className={liked?'fill-red-500 text-red-500':'text-white'}/>} count={likes} active={liked} onClick={tap}/>
   <Action icon={<MessageCircle size={24} className="text-white"/>} count={post.comments}/>
   <Action icon={<Share2 size={24} className="text-white"/>} count={post.shares}/>
   <Action icon={<Bookmark size={24} className={saved?'fill-yellow-400 text-yellow-400':'text-white'}/>} count={0} active={saved} onClick={()=>setSaved(v=>!v)}/>
  </div>
  <div className="absolute bottom-5 left-4 right-16 z-20">
   <div className="mb-3 flex items-center gap-2"><img src={avatar} className="h-10 w-10 rounded-full border-2 border-white/20 object-cover"/><div><div className="flex items-center gap-1 text-sm font-bold text-white">{post.name}{post.verified&&<BadgeCheck size={14} className="text-[#8b5cf6]" fill="currentColor"/>}</div><div className="text-xs text-white/60">@{post.username}</div></div><motion.button whileTap={{scale:.93}} className="ml-2 rounded-full px-4 py-2 text-xs font-bold text-white" style={{background:'linear-gradient(90deg,#FF3D9A,#8B00FF)'}}>Follow</motion.button></div>
   <p className="line-clamp-2 text-sm font-medium text-white/90">{post.caption}</p>
  </div>
 </div>
}
function Action({icon,count,active,onClick}:{icon:React.ReactNode;count:number;active?:boolean;onClick?:()=>void}){return <motion.button whileTap={{scale:.85}} onClick={onClick} className="flex w-[42px] flex-col items-center gap-0.5"><span className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/10 bg-black/35 backdrop-blur-md">{icon}</span>{count>0&&<span className="text-[10px] font-semibold text-white/80">{count>=1000?`${(count/1000).toFixed(1)}K`:count}</span>}</motion.button>}
