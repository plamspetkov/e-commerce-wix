"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        width={28}
        height={28}
        alt="Menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {isOpen && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-8 text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/logout">Logout</Link>
          <Link href="/cart">Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
