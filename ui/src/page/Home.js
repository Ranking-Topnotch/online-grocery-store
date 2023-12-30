import React, { useRef } from 'react'
import HomeCart from '../component/HomeCart'
import { useSelector } from 'react-redux'
import CardFeatures from '../component/CardFeatures'
import { FcPrevious, FcNext } from "react-icons/fc";
import AllProduct from '../component/AllProduct';


const Home = () => {
  const productData =useSelector((state)=>state.product.productList)
  const homeProductCartList = productData.slice(0, 4)
  const homeListVegetable = productData.filter(vegetable => vegetable.category === 'vegetables')
  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const useRefSlide = useRef() // use for pagination using the click of a button
  const nextScroll = ()=>{
    useRefSlide.current.scrollLeft += 200
  }
  const prevScroll = ()=>{
    useRefSlide.current.scrollLeft -= 200
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2 '>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/632/632443.png' alt='bike' className='h-7' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fasted Delivery in <span className='text-blue-900 text-x'>Your Home</span></h2>
          <p className='py-3 text-base '>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
          </p>
          <button className='font-bold text-slate-200 bg-red-500 rounded-full px-4 py-2'>Order now</button>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          { homeProductCartList[0] ?
              homeProductCartList.map(homeList => {
                return (
                  <HomeCart 
                    key={homeList._id}
                    id={homeList._id}
                    image={homeList.image}
                    name={homeList.name}
                    price={homeList.price}
                    category={homeList.category}
                  />
                )
              }) :
              loadingArray.map((loading, index) => {
                return(
                  <HomeCart 
                    key={index +"loading"}
                    loading={'Loading...'}
                  />
                )
              })
          }
        </div>
      </div>

      <div className=''>
          <div className='flex w-full items-center'>
            <h2 className='font-bold text-2xl text-slate-800 mb-4'>
              Fresh Vegetables
            </h2>
            <div className='ml-auto flex gap-4'>
              <button onClick={prevScroll} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'>
                <FcPrevious />
              </button>
              <button onClick={nextScroll} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'>
                <FcNext />
              </button>
            </div>

          </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={useRefSlide}>
            {
              homeListVegetable[0] ? homeListVegetable.map(veges =>{
                return(
                  <CardFeatures 
                    key={veges._id}
                    id={veges._id}
                    name={veges.name}
                    category={veges.category}
                    price={veges.price}
                    image={veges.image}
                  />
                )
              })
              :
              loadingArrayFeature.map((el, index) => {
                return (
                  <CardFeatures key={index} loading="loading"/>
                )
              })
            }
              
          </div>
        </div>

        <AllProduct heading={'Your Product'}/>
        
    </div>
  )
}

export default Home