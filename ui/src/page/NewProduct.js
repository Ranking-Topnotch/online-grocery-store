import React, { useState } from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImageUtility } from '../utility/ImageUtility';
import toast from 'react-hot-toast';

const NewProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
    description: ''

  })
  const handleChange = (e) => {
    const {name, value} = e.target

    setProductData((prev)=>{
      return{
        ...prev,
        [name]: value
      }
    })
  }

  const uploadImage = async(e)=>{
      const data = await ImageUtility(e.target.files[0])

      setProductData((prev) => {
        return{
          ...prev,
          image: data
        }
      })
  }

  const onSubmitUpload = async(e)=>{
    e.preventDefault()
    console.log(productData)

    const {name, image, category, price, description} = productData

    if(name && image && category && price && description){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/newProduct`, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(productData)
      })
      const fetchRes = await fetchData.json() // fetching the data in the res.send in the server 
      toast(fetchRes.message)
      console.log(fetchRes)

      setProductData((prev)=>{
        return{
          name: '',
          category: '',
          image: '',
          price: '',
          description: ''
        }
      })

    }else{
      toast('All field are mandatory')
    }
  }

  return (
    <div className='p-4'>
      <form onSubmit={onSubmitUpload} className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white'>
        <label htmlFor='name'>Name</label>
        <input type={'text'} name='name'
          id='name'
          className='bg-slate-200 p-1 my-1' 
          value={productData.name}
          onChange={handleChange}/>

        <label htmlFor='category'>Category</label>
        <select 
          className='bg-slate-200 p-1 my-1' 
          id='category'
          name='category'
          value={productData.category}
          onChange={handleChange}>

          <option value={'other'}>Select Category</option>
          <option value={'fruits'}>Fruits</option>
          <option value={'vegetables'}>Vegetables</option>
          <option value={'ice-icream'}>Ice-cream</option>
          <option value={'Rice'}>Rice</option>
          <option value={'pizza'}>Pizza</option>
          <option value={'Cake'}>Cake</option>
          <option value={'Burger'}>Burger</option>
          <option value={'doza'}>Doza</option>

          
        </select>

        <label htmlFor='image'>Image
          <div className='cursor-pointer h-40 w-full bg-slate-200 rounded flex items-center justify-center'>
            { productData.image ? <img src={productData.image} alt='productImage' className='w-full h-full' /> :
                <span className='text-5xl'><AiOutlineCloudUpload  /></span>
            }
            <input type={'file'} name='image' accept='image/*' id='image' onChange={uploadImage} className='hidden'/>
          </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={'text'} name='price' 
          className='bg-slate-200 p-1 my-1'
          id='price' 
          value={productData.price}
          onChange={handleChange}
        />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} name='description' 
          className='bg-slate-200 p-1 my-1 resize-none'
          value={productData.description}
          onChange={handleChange}
        ></textarea>

        <button type='submit' className='bg-red-500 hover:bg-red-600 text-white text-1g font-medium drop-shadow my-2'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct