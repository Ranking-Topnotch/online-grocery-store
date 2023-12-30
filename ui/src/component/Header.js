import React, { useState } from 'react'
import logo from '../assest/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserGear } from "react-icons/fa6"
import { FaCartShopping } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import toast from 'react-hot-toast';


const Header = () => {
    const userData = useSelector((state) => state.user)
    const [showMenu, setShowMenu] = useState(false)
    const cartLenght = useSelector((state) => state.product.cartItem)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleChange(){
        setShowMenu(prev => !prev)
    }

    const handleLogout = () =>{
        dispatch(logoutRedux())
        toast('Logout Successful')
        navigate('login')
    }

  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
        {/* desktop */}

        <div className='flex items-center h-full justify-between'>
            <Link to=''>
                <div className='h-10'>
                    <img src={logo} className='h-full' alt='logo_image'/>
                </div>
            </Link>

            <div className='flex items-center gap-4 md:gap-7'>
                <nav className='gap-4 md:gap-6 text-base md:text-1g hidden md:flex'>
                    <Link to={""}>Home</Link>
                    <Link to={"menu/65885f2d12c2274f155a327a"}>Menu</Link>
                    <Link to={"about"}>About</Link>
                    <Link to={"contact"}>Contact</Link>
                </nav>
                <div className='text-2xl text-slate-600 relative'>
                    <Link to={'/cart'}>
                        <FaCartShopping />
                        <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>{cartLenght.length}</div>
                    </Link>
                </div >
                <div className='text-xl text-slate-600 cursor-pointer'>
                    <div onClick={() => handleChange()}  className='text-3xl border-2 border-solid border-slate-600 p-1 rounded-full w-10 h-10 overflow-hidden drop-shadow-md'>
                        { userData.profileImage ? <img src={userData.profileImage} className='h-full w-full' alt={(userData) ? userData.firstName.split('')[0].toUpperCase() + userData.lastName.split('')[0].toUpperCase() : ""}/> : <FaUserGear /> }
                    </div>
                    { showMenu && 
                        <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                            { userData.email === process.env.REACT_APP_ADMIN_EMAIL &&
                                <Link to={'newProduct'}><p className="whitespace-nowrap cursor-pointer px-2">New Product</p></Link>
                            }
                            
                            { userData.firstName ? <p className='cursor-pointer text-white bg-red-500 px-2' onClick={handleLogout}>Logout ({userData.firstName}){" "}</p> : <Link to={'login'}><p className="whitespace-nowrap cursor-pointer px-2">Login</p></Link>}

                            <nav className='gap-4 text-base md:text-1g flex flex-col md:hidden'>
                                <Link to={""} className='px-2 py-1'>Home</Link>
                                <Link to={"menu/65885f2d12c2274f155a327a"} className='px-2 py-1'>Menu</Link>
                                <Link to={"about"} className='px-2 py-1'>About</Link>
                                <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                            </nav>
                        </div>
                    }
                </div>
            </div>    
        </div>

        {/* mobile    */}

    </header>
  )
}

export default Header