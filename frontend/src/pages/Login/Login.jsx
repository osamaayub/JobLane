/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { MetaData } from '../../components/MetaData'
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'
import { loginUser } from '../../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validations";
import { useForm } from "react-hook-form";

const Login = () => {

  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [eyeTog, setEyeTog] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });
  const onSubmit = (data) => {
    const formData = {
      email: data.email,
      password: data.password
    }
    dispatch(loginUser(formData));
  }


  useEffect(() => {
    if (isLogin) {
      navigate("/")
    }
  }, [isLogin])

  return (
    <>
      <MetaData title="Login" />
      <div className='bg-gray-950 min-h-screen flex items-center justify-center py-10 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32'>
        <div className='w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <h2 className='text-center text-3xl md:text-4xl font-semibold text-white'>Login</h2>

            <div className='flex items-center bg-white rounded-md overflow-hidden'>
              <div className='text-gray-600 px-3'>
                <AiOutlineMail size={20} />
              </div>
              <input
                {...register('email')}
                type="email"
                id='email'
                name='email'
                placeholder='Email'
                required
                className='flex-1 py-2 px-3 text-black outline-none'
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>

            <div className='flex items-center bg-white rounded-md overflow-hidden'>
              <div className='text-gray-600 px-3'>
                <AiOutlineUnlock size={20} />
              </div>
              <input
                {...register('password')}
                type={eyeTog ? "text" : "password"}
                placeholder='Password'
                id='password'
                name='password'
                required
                className='flex-1 py-2 px-3 text-black outline-none'
              />
              {errors.password && <p>{errors.password.message}</p>}
              <div
                className='text-gray-600 px-3 cursor-pointer'
                onClick={() => setEyeTog(!eyeTog)}
              >
                {eyeTog ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </div>
            </div>

            <button
              disabled={loading}
              className='w-full py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-red-500 disabled:opacity-50 flex justify-center items-center'
            >
              {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Login"}
            </button>

            <p className='text-center text-sm text-gray-400'>
              Don't have an account?{" "}
              <Link to="/register" className='text-yellow-400 underline hover:text-yellow-500'>
                Register here
              </Link>.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
