import Image from "next/image";
import { Inter } from 'next/font/google'
import Head from "next/head";
import {sanityClient , urlFor} from '../../sanity'
import { Post } from '../../type'

import Banner from "./components/Banner";
import BannerBottom from "./components/BannerButtom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
interface Props{
  posts  :  [Post]
}
export default async function Home ( ) {
  const {posts} = await getServerSideProps()
  console.log("data " , posts)
   
  return (
    <div>
    <Head>
      <title>My Blog | Explore the new horizon</title>
      <link rel="icon" href="/smallLogo.ico" />
    </Head>

    <main className="font-bodyFont">
      {/* ============ Header Start here ============ */}
      {/* <Header /> */}
      {/* ============ Header End here ============== */}
      {/* ============ Banner Start here ============ */}
      <Banner />
      {/* ============ Banner End here ============== */}
      <div className="max-w-7xl mx-auto h-60 relative">
        <BannerBottom />
      </div>
      {/* ============ Banner-Bottom End here ======= */}
      {/* ============ Post Part Start here ========= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-3 md:gap-6  md:grid-cols-2 lg:grid-cols-3 py-20 px-4">
         {posts.map((data ) =>(
          <Link key={data.id} href={`/post/${data.slug.current}`}> 
<div className="border-[1px] border-[#9b59b6] border-opacity-40">
  <div className="h-3/5 w-full overflow-hidden">


        <Image alt="img" width={300} height={350} src={urlFor(data.mainImage).url()!} 
        className="w-full h-full object-cover brightness-75
        group-hover:brightness-100 duration-300 group-hover:scale-110" />
         </div>
 <div className="h-2/5 w-full flex flex-col justify-center">
  <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
    <p>{data.title}</p>
    <img alt="authorimage" src={urlFor(data.author.image).url()!} 
    className="w-12 h-12 rounded-full object-cover"/>
  </div>
<div className="">
<p className="py-2 px-4 text-base"> {data.description.substring(0, 60)}... by - {" "}
  <span className="font-semibold">{data.author.name}</span> 
  </p> </div>
 </div> </div>
         </Link>
   ))}
      </div>
      {/* ============ Post Part End here =========== */}
      {/* ============ Footer Start here============= */}
      {/* <Footer /> */}
      {/* ============ Footer End here ============== */}
    </main>
  </div>
  )
}

export const  getServerSideProps = async() =>{
  const query = `*[_type == "post"]{
    _id,
      title,
      author-> {
        name,
        image
       },
         description,
           mainImage,
            slug
  }
  `
  const posts = await sanityClient.fetch(query);
  return{
    posts
  }
}