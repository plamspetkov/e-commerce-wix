"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import React, { useEffect } from "react";
import { media as wixMedia } from "@wix/sdk";

const CartModal = () => {
  // TEMPORARY
  // const cartItems = true;
  const wixClient = useWixClient();

  const { cart, isLoading, removeItem } = useCartStore();

  console.log("cart: ", cart);

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST OF CART ITEMS */}
          <div className="flex flex-col gap-8">
            {/* CART ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            x{item.quantity} x{" "}
                          </div>
                        )}
                        {item.price?.formattedAmount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty {item.quantity}</span>
                    <span
                      onClick={() => removeItem(wixClient, item._id!)}
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      className="text-blue-500"
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">{cart.subtotal.formattedAmount}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              Shipping adn taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
