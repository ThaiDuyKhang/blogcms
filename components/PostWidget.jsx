import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { getRecentPosts, getSimilarPosts } from "../services";

export default function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([
    {
      createdAt: "2021-11-22T10:00:05.110346+00:00",
      featuredImage: { url: "https://media.graphcms.com/Emq7Hx20RR69CKXpijmB" },
      slug: "nextjs-training",
      title: "Next.js Traning ",
    },
  ]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  //   console.log({ relatedPosts });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post, index) => {
        return (
          <div key={index} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
                unoptimized
                alt={post.title}
                height="60px"
                width="60px"
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </div>
            <div className="flex-grow ml-4">
              <Link href={`/post/${post.slug}`} key={index} className="hover:text-pink-600 text-lg font-semibold">
                {post.title}
              </Link>
              <p className="text-gray-500 text-xs font-xs">
                {moment(post.createdAt).format("DD - MMM, YYYY")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
