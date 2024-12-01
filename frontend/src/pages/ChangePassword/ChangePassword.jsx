import { useState } from 'react'
import { MetaData } from '../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineUnlock, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdOutlineVpnKey } from 'react-icons/md'
import { TbLoader2 } from 'react-icons/tb'
import { changePass } from '../../actions/UserActions'


const ChangePassword = () => {

    const { loading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [eyeTog1, setEyeTog1] = useState(false)
    const [eyeTog2, setEyeTog2] = useState(false)
    const [eyeTog3, setEyeTog3] = useState(false)


    const changeHandler = (e) => {
        e.preventDefault()

        const data = { oldPassword, newPassword, confirmPassword }

        dispatch(changePass(data))

        if (loading === false) {
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }



    return (
        <>
            <MetaData title="Change Password" />
            <div className='bg-gray-900 min-h-screen flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    <div>
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>Change Password</h2>
                    </div>
                    <form onSubmit={changeHandler} className='mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md'>
                        <div className='space-y-6'>
                            <div className='relative'>
                                <label htmlFor='old-password' className='sr-only'>Old Password</label>
                                <input id='old-password' name='oldPassword' type={eyeTog1 ? "text" : "password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Old Password' />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                                    {eyeTog1 ? <AiOutlineEye className='cursor-pointer' onClick={() => setEyeTog1(!eyeTog1)} /> : <AiOutlineEyeInvisible className='cursor-pointer' onClick={() => setEyeTog1(!eyeTog1)} />}
                                </div>
                            </div>
                            <div className='relative'>
                                <label htmlFor='new-password' className='sr-only'>New Password</label>
                                <input id='new-password' name='newPassword' type={eyeTog2 ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='New Password' />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                                    {eyeTog2 ? <AiOutlineEye className='cursor-pointer' onClick={() => setEyeTog2(!eyeTog2)} /> : <AiOutlineEyeInvisible className='cursor-pointer' onClick={() => setEyeTog2(!eyeTog2)} />}
                                </div>
                            </div>
                            <div className='relative'>
                                <label htmlFor='confirm-password' className='sr-only'>Confirm Password</label>
                                <input id='confirm-password' name='confirmPassword' type={eyeTog3 ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Confirm Password' />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                                    {eyeTog3 ? <AiOutlineEye className='cursor-pointer' onClick={() => setEyeTog3(!eyeTog3)} /> : <AiOutlineEyeInvisible className='cursor-pointer' onClick={() => setEyeTog3(!eyeTog3)} />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type='submit' disabled={loading} className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Change Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ChangePassword;
