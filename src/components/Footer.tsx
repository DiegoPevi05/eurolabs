'use client'
import { FC } from "react";
import {  animateScroll as scroll } from "react-scroll";
import { styles } from "../lib/styles";
import {NavbarData} from "../lib/constants";
import {Facebook, Instagram, Linkedin} from "lucide-react";

const FooterSection: FC = () => {

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 w-full max-w-7xl mx-auto pt-12 sm:py-6 px-4 gap-y-12 sm:gap-y-0">
      <div className="col-span-1 flex flex-col justify-start items-start md:flex-col gap-2">
        <a
          onClick={scrollToTop}
          className="w-full h-auto flex flex-row cursor-pointer gap-2 font-heading"
        >
          <img
            src={"./logos/logo-sm-2.png"}
            alt="logo"
            className="h-auto w-24 block transition-all ease-in-out duration-1000"
          />
        </a>
        <p>{"© " + new Date().getFullYear() + " digitalprocessit"}</p>
      </div>
      <div className="col-span-1 sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
        {NavbarData.map((item,index_item)=>{
          return(
            <div key={"Section"+index_item}>
              <h4 className={`${styles.footerLinkHeader}`}>{item.title}</h4>
              {item.routes.map((route, index_route) => {
                return(
                  <ul key={"link-types-ul"+index_item+"_"+index_route} className="list-none space-y-4 pt-6">
                      <li key={"link-types-"+index_item+"_"+index_route}>
                        <a  className={`${styles.footerLinkBody} hover:underline`}>{route.title}</a>
                      </li>
                  </ul>
                )
              })}
            </div>
        )})}
      </div>
      <div className="col-span-1 sm:col-span-4 row-span-1 flex flex-col sm:flex-row justify-between py-12">
        <span></span>
        <span></span>
        <div className="flex flex-row gap-x-4 ">
          <Instagram className="hover:text-red-500 cursor-pointer"/>
          <Facebook className="hover:text-red-500 cursor-pointer"/>
          <Linkedin className="hover:text-red-500 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
