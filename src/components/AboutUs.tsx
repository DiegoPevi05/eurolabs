'use client'

import { ArrowRight } from "lucide-react";

const AboutUs = () => {

	return(
		<div id="AboutUs" className="w-full h-auto sm:h-[800px] py-14 sm:py-16 px-10 sm:px-48 flex flex-col sm:flex-row">
			<div className="w-full sm:w-1/2 h-1/2 sm:h-full flex flex-col py-16 justify-center items-start gap-y-6 sm:gap-y-16">
				<span className="text-red-500">Sobre Nosotros</span>
				<h1 className="text-slate-700 text-md sm:text-4xl leading-[30px] sm:leading-[60px] text-left sm:pr-12">Nuestros colaboradores en Eurolabs trabajan todos los dias para responder con exitos las necesidades de nuestros clientes compremeitdos con altos estandares de calidad</h1>
				<div className="w-full h-auto flex flex-row justify-between items-end">
					<span className="text-red-500 flex flex-row gap-x-6 hover:gap-x-8 w-2/3 sm:w-1/3 hover:underline cursor-pointer">Saber mas <ArrowRight/> </span>
					<span className="bg-red-500 h-[0.5px] w-1/3 sm:w-2/3"></span>
				</div>
			</div>
			<div className="w-full sm:w-1/2 h-1/2 sm:h-full flex flex-col sm:p-6 ">
				<img src="./images/carousel_1.jpg" className="w-full h-full object-cover object-top brightness-80 "/>
			</div>
		</div>
	)
}

export default AboutUs;
