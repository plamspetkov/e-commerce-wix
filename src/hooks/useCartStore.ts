import { currentCart } from "@wix/ecom";
import { WixClient } from "@wix/sdk";
import { create } from "zustand";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  // STATE
  cart: [],
  isLoading: true,
  counter: 0,
  // ACTIONS
  getCart: async (wixClient: WixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      set({ isLoading: false });
    }
  },
  addItem: async (wixClient: WixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));

    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });
    set({
      cart: response.cart,
      isLoading: false,
      counter: response.cart.lineItems.length,
    });
  },
  removeItem: async (wixClient: WixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));

    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );
    set({
      cart: response.cart,
      isLoading: false,
      counter: response.cart.lineItems.length,
    });
  },
}));
