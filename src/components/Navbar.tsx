'use client'
import { NavbarData } from "@/lib/constants"
import {useEffect, useState} from "react"
import {motion , AnimatePresence} from "framer-motion"
import {  animateScroll as scroll } from 'react-scroll';
import { AlignJustify, X } from "lucide-react";


const Navbar = () => {
	const [openOption ,setOpenOption] = useState<number|null>(null);
	const [openSideBar, setOpenSideBar] = useState<boolean>(false);
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

	const toggleSideBar = () => {
		setOpenSideBar((prevOpenSidebar) => { return !prevOpenSidebar })
	}


	return(
		<>
			<div className={`hidden lg:flex fixed top-0 w-screen h-auto flex-col items-center justify-center py-6 ${ openOption != null || scrollNav ? "bg-white":"bg-transparent"} z-30`}>
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
			<div className={`flex lg:hidden fixed top-0 w-screen h-auto flex-row items-center justify-between p-6 sm:pt-8 z-30`}>
				<span onClick={()=>scrollToTop()} className="cursor-pointer">
					<img  className="h-6 sm:h-10 w-auto" src="./logos/logo-sm-2.png"/>
				</span>
				<span onClick={()=>toggleSideBar()}>
					<AlignJustify className="h-8 sm:h-12 w-8 sm:w-12 text-red-500 hover:text-white cursor-pointer"/>
				</span>
				<AnimatePresence>
					{openSideBar && (
						<motion.div 
							initial={{ opacity:0, translateX:"100vw" }} 
							animate={{ opacity:100, translateX:0 }} 
							exit={{ opacity:0, translateX:"100vw" }}
							transition={{ duration: 0.5, delay: 0.5, ease:"easeInOut" }} 
							className="min-h-screen w-full fixed top-0 left-0 bg-white flex flex-col">
							<div className="flex flex-row justify-between p-6">
								<span className="cursor-pointer">
									<img  className="h-6 w-auto" src="./logos/logo-3.svg"/>
								</span>
								<span onClick={()=>toggleSideBar()}>
									<X className="h-8 w-8 text-red-500 hover:text-slate-700 cursor-pointer"/>
								</span>
							</div>
							<ul className="text-slate-700 relative w-full h-auto flex flex-col justify-start items-start p-6 gap-y-4">
								{NavbarData.map((item,index)=>{
									return(
										<div key={"container_navbar_section"+index} className="h-full w-full flex flex-col justify-start items-start">
											<li  onClick={()=>triggerOption(index)} className="text-slate-700 font-bold cursor-pointer" key={"NavItemr"+index}>{item.title}</li>
											<ul className="h-auto w-full flex flex-col mt-2 gap-y-2">
												{item.routes.map((route,index)=>{
													return(
														<li key={"section_item_route"+index} className="hover:text-red-500 hover:underline">{route.title}</li>
													)
												})}
											</ul>
										</div>
									)
								})}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}

export default Navbar;
