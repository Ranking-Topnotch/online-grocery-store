import React, { useState } from 'react'
import Loginn from '../assest/login-animation.gif'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
    const navigate = useNavigate()
    const userData = useSelector(state => state) // use to extract data from th redux store
    const dispatch = useDispatch() // use to to dispatch the data from the useSelector
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
      email: '',
      password: '', 
    })

    function handlePassword(){
        setShowPassword(prev => !prev)
    }

    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const submitted = async (e) => {
        e.preventDefault()
        const {email, password} = data

        if( email && password){

            //fetching data from the login in the server
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataRes = await fetchData.json()

          if(dataRes.message === 'Succefully login'){
            dispatch(loginRedux(dataRes))
            toast(dataRes.message)
            setTimeout(()=>{
                navigate('/')
            }, 1000)
          }else if(dataRes.message === 'User not register. Proceed to signup'){
            toast(dataRes.message)
          }
        }else{
            alert('All field are Mandatory')
        }
    } 
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex flex-col p-2'>
            <h1 className='text-center text-2xl font-bold'>Login</h1>
            <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto flex items-center'>
                <img src={Loginn} className='w-full' alt='SignIn'/>
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={submitted}>

                <label htmlFor='email'>E-mail</label>
                <input type={'email'} name='email' 
                    id='email' 
                    className='w-full mb-2 bg-slate-200 px-2 py-1 rounded mt-1 focus-within:outline-blue-300'
                    value={data.email}
                    onChange={handleOnChange}
                />

                <label htmlFor='password'>Password</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300'>
                    <input type={showPassword ? 'text' :'password'} name='password' 
                        id='password' 
                        className='w-full bg-slate-200 border-none outline-none'
                        value={data.password}
                        onChange={handleOnChange}
                    />
                    <span className='flex text-xl' onClick={() => handlePassword()}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }</span>
                </div>

                <button type='submit' className='max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>

            </form>
            <p className='text-left text-sm mt-2'> Don't have an account ? <Link to={'/signUp'} className='text-red'>SignUp</Link></p>
        </div>
    </div>
  )
}

export default Login