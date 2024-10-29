import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();

  // console.log(cats);
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 mg:gap-9 min-w-max">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 min-w-[250px] sm:min-w-[300px] lg:min-w-[300px] xl:min-w-[300px]"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={item.media?.mainMedia?.image?.url || "/cat.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
