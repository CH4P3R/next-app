import Link from "next/link"
import Image from "next/image"
export default function SideBar() {
  return (
    <div className="fixed w-screen h-screen bg-black/15 backdrop-blur-sm">
        <div className="relative flex flex-col h-screen w-2xs left-0 p-5 bg-cyan-400 gap-3">
            <Link className="flex items-center w-full text-slate-600 bg-white font-bold text-end p-5 rounded-xl transition-all active:translate-y-1 active:shadow-inner" href=''>
            <Image src="/rol.png"  alt="rol image" width={20} height={20} />
            Roles
            </Link>
            <button className="absolute shadow bg-white p-2 w-15 h-15 rounded-full right-0 translate-x-1/2 bottom-1/2 hover:cursor-pointer"></button>
        </div>
    </div>
  )
}
