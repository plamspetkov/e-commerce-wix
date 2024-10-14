"use client";
import React, { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState(1);

  //   TEMPORATY
  const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h4>Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 rounded-3xl py-4 px-4 flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          <div className="text-sm">
            Only <span className="text-orange-500">4 items</span> left!
            <br /> {"Don't"} miss it.
          </div>
        </div>
        <button className="w-36 text-sm rounded-3xl ring-1 ring-cartNumber text-cartNumber py-2 px-4 hover:bg-cartNumber hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Add;
