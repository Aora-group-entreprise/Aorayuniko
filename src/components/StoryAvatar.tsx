import { motion } from 'framer-motion';

type Props={name?:string;image?:string;isOwn?:boolean;onClick?:()=>void};
export default function StoryAvatar({name='Your story',image,isOwn,onClick}:Props){
 const src=image??`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=FF3D9A`;
 return <motion.button whileTap={{scale:.9}} onClick={onClick} className="flex shrink-0 flex-col items-center gap-1" style={{minWidth:64}}>
   <div className="relative h-[54px] w-[54px] rounded-full p-[2px]" style={{background:'linear-gradient(135deg,#FF3D9A,#C026D3,#8B00FF)'}}>
    <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
    {isOwn&&<span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0d0b14] bg-[#ff3d9a] text-xs font-bold">+</span>}
   </div>
   <span className="max-w-[60px] truncate text-[10px] font-medium text-white/70">{name}</span>
 </motion.button>
}
