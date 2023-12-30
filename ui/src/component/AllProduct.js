import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CardFeatures from './CardFeatures'
import { useSelector } from 'react-redux'

const AllProduct = ({heading}) => {
    const productData =useSelector((state)=>state.product.productList)
    const categoryList = [...new Set(productData.map(el=>el.category))]


    //filter product
    const [filterby, setFilterby] = useState("")
    const [productFilter, setProductFilter] = useState([])
  //the useEffect is use because the productData will change base on the category to filter it
    useEffect(()=>{
      setProductFilter(productData)
    }, [productData])
    const handleFilterProduct = (category)=>{
      setFilterby(category)
      const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
      setProductFilter(()=>{
        return[
          ...filter
        ]
      })
    }
  return (
    <div className='my-5'>
            <h2 className='font-bold text-2xl text-slate-800 mb-4'>
              {heading}
            </h2>

            <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
              {
                categoryList[0] ?
                 categoryList.map(el=>{
                  return(
                    <FilterProduct 
                      category={el} 
                      key={el}
                      isActive={el === filterby}
                      onClick={()=>handleFilterProduct(el)} />
                  )
                })
                :
                <div className='min-h-[150px] flex justify-center items-center' >
                    <p>{'loading...'}</p>
                </div>
              }
            </div>

            <div className='flex flex-wrap justify-center gap-4 my-4'>
                {
                  productFilter.map(el => {
                    return(
                      <CardFeatures
                        key={el._id}
                        id={el._id}
                        image={el.image}
                        name={el.name}
                        category={el.category}
                        price={el.price}
                      />
                    )
                  })
                }
            </div>
        </div>
  )
}

export default AllProduct