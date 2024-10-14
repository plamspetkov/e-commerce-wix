import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 20;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  // Check if categoryId is valid
  if (!categoryId) {
    console.error("Invalid categoryId: categoryId is missing or undefined");
    return <p>No category selected.</p>;
  }

  try {
    const res = await wixClient.products
      .queryProducts()
      .eq("collectionIds", categoryId)
      .limit(limit || PRODUCT_PER_PAGE)
      .find();

    // console.log("res", res.items[0].priceData?.formatted?.price);

    if (!res.items || res.items.length === 0) {
      console.log("No products found for this category.");
      return <p>No products found.</p>;
    }

    return (
      <div
        // key={categoryId}
        className="mt-12 flex gap-8 gap-y-16 justify-between flex-wrap"
      >
        {res.items.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-all easy duration-500"
              />
              {product.media?.items && product.media.items[1]?.image?.url && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">
                {product.priceData?.formatted?.price}
              </span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections?.find(
                      (section) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <button className="rounded-2xl ring-1 ring-cartNumber text-cartNumber w-max py-2 px-4 text-xs hover:bg-cartNumber hover:text-white">
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <p>There was an error loading products. Please try again later.</p>;
  }
};

export default ProductList;
