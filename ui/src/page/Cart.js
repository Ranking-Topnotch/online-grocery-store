import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/CartProduct'
import Cartimage  from '../assest/emptyCart.gif'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
//4NKYCKGGVKUNXD4LY83CDNUT

//AC5d7bba2f55ca7e7bdd1e9fae4177464f //account sid
//f648b054a4032c77ee10dcff26cab401  //auth token

const Cart = () => {
    const productCartItem = useSelector(state => state.product.cartItem)
    const totalPrice = productCartItem.reduce((acc, curr)=>acc + parseInt(curr.total),0)
    const totalQty = productCartItem.reduce((acc, curr)=>acc + parseInt(curr.qty),0)

    const handleSubmit = async() => {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/purchase`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body : JSON.stringify(productCartItem)
      })

    const dataRes = await fetchData.json()
    toast(dataRes.message)

  } 
  return (
    <div className='p-2 md:p-4'>
        <h2 className='text-lg md:tsxt-2xl font-bold text-slate-600'>Your cart items</h2>
        
        <div className='my-4 sm:flex sm:flex-row md:flex-col gap-3'>

            { productCartItem.length > 0 ?
              <div className='w-full max-w-3xl'>
              { 
                productCartItem.map(el =>{
                  return(
                    <CartProduct 
                      key={el._id}
                      id={el._id} 
                      name={el.name}
                      image={el.image}
                      category={el.category}
                      price={el.price}
                      qty={el.qty}
                      total={el.total}
                    />
                  )
                })
              }
            </div>
            :
             <div className='flex w-full justify-center items-center flex-col'>
                <img src={Cartimage} alt='cart'  className='max-w-sm'/>
                <p className='text-slate-700 text-3xl font-bold'>Nothing to see here <Link to={'/'} className='text-blue-700 text-sm underline'>Add to cart</Link></p>
             </div>
            }

           {
            productCartItem.length > 0 &&
            <div className='w-full max-w-md ml-auto'>
              <h2 className='bg-blue-500 text-white p-2 text-lg border-b'>Summary</h2>
              <div className='flex w-full py-2 text-lg'>  
                <p>Total Qty:</p>
                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
              </div>
              <div className='flex w-full py-2 text-lg'>
                <p>Total Price:</p>
                <p className='ml-auto w-32 font-bold'>${totalPrice}</p>
              </div>
              <button className='bg-red-500 w-full text-lg font-bold py-2 text-white' onClick={handleSubmit}>Order</button>
            </div>
           }
        </div>
    </div>
  )
}

export default Cart