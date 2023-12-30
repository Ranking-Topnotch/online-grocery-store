import React, { useState } from 'react'
import Login from '../assest/login-animation.gif'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { ImageUtility } from '../utility/ImageUtility'
import toast from 'react-hot-toast';

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileImage: '' 
    })
    function handlePassword(){
        setShowPassword(prev => !prev)
    }

    function handleConfirmPassword(){
        setShowConfirmPassword(prev => !prev)
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

    const handleUploadProfile = async(e) => {
       const data = await ImageUtility(e.target.files[0])

       setData((prev) => {
            return{
                ...prev,
                profileImage: data
            }
       })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {firstName, email, password, confirmPassword} = data

        if(firstName && email && password && confirmPassword){
            if(password === confirmPassword){
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body : JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                toast(dataRes.message)
                if(dataRes.message === 'Email already exists. Proceed to Login' || dataRes.message === 'Succefully signup. Proceed to Login'){
                    navigate('/login')
                }  
            }
            else{
                alert('Password did not match')
            }
        }
        else{
            alert('All field are Mandatory')
        }
        console.log(data)
    } 
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex flex-col p-2'>
            <h1 className='text-center text-2xl font-bold'>Sign up</h1>
            <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative cursor-pointer'>
                <img src={data.profileImage ? data.profileImage : Login} className='w-full h-full' alt='SignIn'/>

                <label htmlFor='profileImage'>
                    <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
                        <p className='text-sm p-1 text-white'>Upload</p>
                    </div> 
                    <input type={'file'} accept='image/' id='profileImage' className='hidden' onChange={handleUploadProfile} />
                </label>
                
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input type={'text'} name='firstName' 
                    id='firstName' 
                    className='w-full mb-2 bg-slate-200 px-2 py-1 rounded mt-1 focus-within:outline-blue-300'
                    value={data.firstName}
                    onChange={handleOnChange}    
                />

                <label htmlFor='lastName'>Last Name</label>
                <input type={'text'} name='lastName' 
                    id='lastName' 
                    className='w-full mb-2 bg-slate-200 px-2 py-1 rounded mt-1 focus-within:outline-blue-300'
                    value={data.lastName}
                    onChange={handleOnChange}
                />

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

                <label htmlFor='confirmPassword'>Confirm Password</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300'>
                    <input type={showConfirmPassword ? 'text' :'password'} name='confirmPassword' 
                        id='confirmPassword' 
                        className='w-full bg-slate-200 border-none outline-none '
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                    />
                    <span className='flex text-xl' onClick={() => handleConfirmPassword()}>{showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash /> }</span>
                </div>

                <button type='submit' className='max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>

            </form>
            <p className='text-left text-sm mt-2'> Already have account ? <Link to={'/login'} className='text-red'>Login</Link></p>
        </div>
    </div>
  )
}

export default SignUp