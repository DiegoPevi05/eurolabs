'use client'
import { NavbarData } from "@/lib/constants"
import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {  animateScroll as scroll } from 'react-scroll';


const Navbar = () => {
	const [openOption ,setOpenOption] = useState<number|null>(null);
	const [scrollNav, setScrollNav] = useState<boolean>(false)

	const triggerOption = (index:number) => {
		if(index == openOption){
			setOpenOption(null);
		}else{
			setOpenOption(index);
		}
	}

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, [])

  const changeNav = () => {
		if (window.scrollY > 0) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

	const scrollToTop = () => {
    scroll.scrollToTop();
  };


	return(
		<div className={`fixed top-0 w-screen h-auto flex flex-col items-center justify-center py-6 ${ openOption != null || scrollNav ? "bg-white":"bg-transparent"} z-30`}>
			<span onClick={()=>scrollToTop()} className="cursor-pointer">
				<img  className="h-10 w-auto" src="./logos/logo-sm-2.png"/>
			</span>
			<ul className={`${ openOption != null || scrollNav ? "bg-white text-slate-700":"bg-transparent text-white"} relative w-full h-[100px] flex flex-row justify-center gap-x-12 `}>
				{NavbarData.map((item,index)=>{
					return(
						<div key={"container_navbar_option"+index} className="relative h-full w-auto flex justify-center items-center">
							<li  onClick={()=>triggerOption(index)} className="hover:text-red-300 cursor-pointer" key={"NavItem_"+index}>{item.title}</li>
							{openOption == index &&
								<motion.span 
									key={"NavItemSpan"+index}
									initial={{ opacity:0, translateY: -10  }}
									animate={{ opacity:100, translateY: -0 }}
    							transition={{ duration: 0.3, ease: "easeInOut" }}
									className={`absolute bottom-0 w-24 h-1 bg-red-500`}></motion.span>
							}
						</div>
					)
				})}
				<motion.ul 
					className= {`${openOption !== null  ? "opacity-100": "opacity-0 cursor-pointer-none"} absolute top-[100px] w-full h-auto flex flex-row justify-center gap-x-12 py-12 transition-all duration-300 ease-in-out bg-white`}>
					{openOption !== null &&  NavbarData[openOption].routes.map((item, index)=>{
						return (
							<motion.li 
									initial={{ opacity:0 }} 
									animate={{ opacity:100 }} 
									transition={{ duration: 0.5, delay: (0.5*index), ease:"easeInOut" }} 
									key={"NavItemOptiona_"+item.title} 
									className="hover:text-red-300 cursor-pointer" onClick={()=>setOpenOption(null)}>{item.title}</motion.li>
						)
					})
					}
				</motion.ul>
			</ul>
		</div>
	)
}

export default Navbar;
