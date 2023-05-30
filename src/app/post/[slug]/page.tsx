'use client'
import React from "react";
// import { Post } from "..type/../../type";
import Image from "next/image";
// import { sanityClient, urlFor } from "../../../sanity";

// import { useRouter } from "next/router";
import { sanityClient  ,urlFor } from "../../../../sanity";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";

const Post = async ({params }) => {
  console.log(params)
  // const router = useRouter();
  const  post  = await getData( params)
  console.log(post);
  return (
    <div>
      <img

        className="w-full h-96 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="cover-image"
      />
      <article className="w-full mx-auto p-5 bg-sc/10">
        <h2 className="font-titlefont font-medim text-[32px ] test-primary">
          {post.description}
        </h2>
        <div  className="flex items-center gap-2">
          <img src={urlFor(post.author.image).url()} alt="author-image" 
          className="rounded-full w-12 h-12 object-ceover bg-red-400" />
          <p className=" font-bold text-se"> Blog post by <span>{post.author.name}</span>, Published at {" "}
          {new Date(post.publisheAt).toLocaleDateString()} </p>
        </div>
        <div className="mt-10">
          <PortableText dataset={process.env.NEXT_PUBLICK_SANITY_DATASET || "production"}
          projectId={process.env.NEXT_PUBLICK_SANITY_PROJECT_ID || "V8u4i8c"} 
          content={post.body}
serializers={{
h1: (props : any ) =>(
  <h1 className="text-2xl font-bold my-5 font-titleFont " {...props} />
 ) ,

 h2: (props : any ) =>(
  <h2  className="text-2xl font-bold my-5 font-titleFont " {...props} />
 )  , 
 h3: (props : any ) =>(
  <h3  className="text-2xl font-bold my-5 font-titleFont " {...props} />
 ) ,
 li: ({children} : any) =>(
  <li className="ml-4 list-disc" {children}/>
 )
}}
/>
        </div>
      </article>
    </div>
  );
};
export default Post
// export async function getStaticPaths() {
//   const paths = await sanityClient.fetch(
//     `*[_type == "post" && defined(slug.current)][].slug.current
//       *[_type == "post"]{
//             _id,
//             slug{
//               current
//             }
//           }
//         `
//   )

//   return {
//     paths: paths.map((paths) => ({params: {slug : paths.current.slug}})),
    
//     fallback: true,
//   }
// }
// *[_type == "post" && defined(slug.current)][].slug.current

export const generateStaticParams = async () => {
  const query =  `*[_type == "post"]{
        _id,
        slug{
          current
        }
      }
    `;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post : Post)=>({
    slug : {
      slug: post.slug.current,
    },

  }))

  return{
    paths ,
    fallback : true

  }}
  
type prop = {
  params:{
    slug : string
  }
}


export const getData =  async(params) =>{
  // const { slug = "" } = context.params;
  const query = `*[_type == "post" && slug.current  == $slug][0]{
    _id,
      publisheAt,
      title,
      author-> {
          name,
          image
         },
    description ,
      mainImage,
      slug,
      body
  }
`;
  const post = await sanityClient.fetch(query  ,{
    slug : params?.slug
  });
  // if (!post) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return post
};
