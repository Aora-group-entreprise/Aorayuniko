import { motion } from 'framer-motion';
import { Home, Bell, Plus, MessageCircle, User } from 'lucide-react';

type Props={active?:string;onNavigate?:(path:string)=>void;notifications?:number;messages?:number};
export default function BottomNav({active='home',onNavigate,notifications=0,messages=0}:Props){
 const item=(id:string,path:string,Icon:any,badge=0)=><motion.button whileTap={{scale:.88}} onClick={()=>onNavigate?.(path)} className="relative flex h-14 w-[52px] items-center justify-center text-white/55">
   <Icon size={22} strokeWidth={1.8} className={active===id?'text-white':'text-white/55'}/>{badge>0&&<span className="absolute right-1 top-1 flex min-w-4 h-4 items-center justify-center rounded-full bg-[#ff3d6e] px-1 text-[9px] font-bold text-white">{badge>99?'99+':badge}</span>}
 </motion.button>;
 return <nav className="absolute inset-x-0 bottom-0 z-50 border-t border-white/5 bg-[rgba(10,8,18,.9)] backdrop-blur-xl" style={{paddingBottom:'env(safe-area-inset-bottom)'}}><div className="mx-auto flex h-16 max-w-[1120px] items-center justify-around px-2">
   {item('home','/',Home)}{item('notifications','/notifications',Bell,notifications)}
   <motion.button whileTap={{scale:.88}} whileHover={{scale:1.05}} onClick={()=>onNavigate?.('/create')} className="-mt-5 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_0_28px_rgba(192,38,211,.45)]" style={{background:'linear-gradient(135deg,#FF3D9A,#C026D3,#8B00FF)'}}><Plus size={28} strokeWidth={2.3}/></motion.button>
   {item('messages','/messages',MessageCircle,messages)}{item('profile','/profile',User)}
 </div></nav>
}
