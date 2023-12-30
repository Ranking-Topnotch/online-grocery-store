import React from 'react'
import { FiPlus } from "react-icons/fi";
import { HiMinusSm } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/productSlice';


const CartProduct = ({id, name, price, category, qty, total, image, key}) => {
    const dispatch = useDispatch()

    return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
        <div className='bg-white p-3 rounded overflow-hidden'>
            <img src={image} alt='cart' className='h-28 w-40 object-cover' />
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex justify-between'>
            <h3 className='font-semibold text-slate-600 capitalize text-2xl md:text-1xl'>{name}</h3>
            <div className='cursor-pointer text-slate-700 hover:text-red-700'>
                <RiDeleteBin6Fill onClick={() => dispatch(deleteCartItem(id))}/>
            </div>
          </div>
          <p className='text-slate-500 font-medium text-1xl'>{category}</p>
          <p className='font-bold md:text-1xl'><span className='text-red-500 '>$</span> <span>{price}</span></p>
          <div className='flex justify-between bg-red'>

          
            <div className='flex gap-3 items-center'>
                <button className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1' onClick={() => dispatch(increaseQty(id))}> <FiPlus /> </button>
                <p className='font-semibold p-1'>{qty}</p>
                <button className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1' onClick={() => dispatch(decreaseQty(id))}> <HiMinusSm /> </button>
            </div>
            <div className='flex items-center gap-2 font-bold text-slate-700'>
                <p>Total: </p>
                <p>${total}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CartProduct