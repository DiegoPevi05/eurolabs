'use client'

import { ArrowRightIcon, ArrowDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import BrainComponent from "./three/BrainComponent"; 
import {  Link as Linkscroll } from 'react-scroll';



const Hero = () => {

	return(
		<div className="relative top-0 h-screen w-full bg-slate-700 flex flex-col justify-center items-end">
			<div className="absolute right-12 bottom-48 flex flex-col justify-center items-center gap-y-4 px-16 z-20">
				<motion.h3 
					initial={{ translateY:20, opacity:0 }}
					animate={{ translateY:0, opacity:1  }}
        	transition={{ delay: 1, duration: 0.3, ease: "easeIn" }}
					className="text-white">20 años de innovacion</motion.h3>
				<motion.h1 
					initial={{ translateY:20, opacity:0 }}
					animate={{ translateY:0, opacity:1  }}
        	transition={{ delay: 1.6, duration: 0.3, ease: "easeIn" }}
					className="font-bold text-2xl text-white">Comprometidos con innovacion medica</motion.h1>
				<motion.h3 
					initial={{ translateY:20, opacity:0 }}
					animate={{ translateY:0, opacity:1  }}
        	transition={{ delay: 2.6, duration: 0.3, ease: "easeIn" }}
					className="flex flex-row gap-x-3 hover:gap-x-4 text-red-300 hover:text-red-500 transition-all duration-300 cursor-pointer ">Grupo Eurolabs <ArrowRightIcon/></motion.h3>
			</div>
			<Linkscroll to="Business" smooth={true} duration={500}>
				<motion.span
					initial={{ translateY: 0, opacity:0 }}
					animate={{ translateY: [0, 10, 0], opacity:[1,1,1] }} // Change translateY to y and reverse animation values
					transition={{ delay: 1, duration: 1, ease: "linear", repeat: Infinity }}
					className="z-20 absolute inset-x-1/2 bottom-12 bg-white h-12 w-12 flex flex-col justify-center items-center rounded-full bg-opacity-60 hover:bg-opacity-100 hover:text-red-500 hover:cursor-pointer"
				>
					<ArrowDownIcon/>
				</motion.span>
			</Linkscroll>
			<div className="absolute h-full w-full top-0 left-0 z-10">
				<BrainComponent/>
			</div>
		</div>
	)
}

export default Hero;
