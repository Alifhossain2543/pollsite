import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Header = () => {
  const isUser = false;
  const router = useRouter()


  return (
    <div className="sticky  backdrop-blur-[7px] top-0 left-0 h-[50px] flex items-center pl-5 pr-5 justify-between shadow-sm overflow-hidden z-10">
      <div className="flex items-center md:justify-start md:w-[30%] h-full font-extrabold gap-3 w-[60%] text-[15px] justify-start md:pl-[40px] select-none">
        <h1
          className="text-primary-light cursor-pointer hover:text-secondary opacity-[0.7] hover:opacity-[1] text-[18px]"
          onClick={() => router.push(isUser ? "/" : "/login")}
        >
          Pool App
        </h1>
      </div>
      <div className="flex h-full w-[70%] justify-end gap-20">
        {/* Nav Items
        {token && (
          <nav className="flex h-full">
            <ul className="flex pl-[20px] items-center h-full gap-[30px] text-[15px]">
              <li
                className={`navlink ${
                  parthName == "/" && location == "Polls" ? "active" : ""
                }`}
              >
                Polls
              </li>
            </ul>
          </nav>
        )} */}
      </div>
    </div>
  )
}

export default Header
