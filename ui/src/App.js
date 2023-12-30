import React, { useEffect } from 'react'
import Header from './component/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'; // use for notifying the user about an event
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch()
  const productDataGoods = useSelector(state => state.product)
  // fetching the product from the mongoose db api we created using the product
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  }, [])

  return (
    <>
      <Toaster />  
      <div>
          <Header /> 
          <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
              <Outlet />
          </main>
      </div>
    </>
  )
}

export default App