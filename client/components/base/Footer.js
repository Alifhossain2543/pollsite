import React from "react"

const Footer = () => {
    const year = new Date().getUTCFullYear()
  return (
    <div className="bg-text-color-dark p-10">
      <h1 className="text-center">©All rights reserved. Pool App {year}.</h1>
    </div>
  )
}

export default Footer;
