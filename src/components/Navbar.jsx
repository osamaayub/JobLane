/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu } from '@mantine/core';
import { FaBars } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { MdOutlineBusinessCenter, MdOutlineDashboard } from 'react-icons/md';
import { FaUserCircle, FaSave } from 'react-icons/fa';
import { MdDoneAll } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logOrNot } from '../actions/UserActions';
import { useNavigate } from 'react-router-dom';
import { logoutClearState } from '../slices/UserSlice';
import useIsMobile from '../hooks/useIsMobile';

const Navbar = () => {
    const { isLogin, me } = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const LogOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        dispatch(logOrNot());
        navigate('/');
        toast.success("Logout Successful !");
        dispatch(logoutClearState());
    };

    return (
        <div className='text-white min-w-full overflow-x-hidden z-20 bg-gray-950 border-b border-gray-700'>
            {/* Desktop Navbar */}
            <ul className='hidden lg:flex   justify-between items-center py-3 font-semibold text-xl px-10'>
                <div className='flex items-center gap-24'>
                    <Link to="/" className='flex justify-center items-center titleT'>
                        <MdOutlineBusinessCenter size={19} /> JOBLANE
                    </Link>
                    <Link to="/" className='cool-link'>Home</Link>
                    <Link to="/jobs" className='cool-link'>Jobs</Link>
                    <Link to='/contact' className='cool-link'>Contact</Link>
                    <Link to='/about' className='cool-link mr-16'>About</Link>
                </div>
                {isLogin ? (
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Avatar className='cursor-pointer' radius="xl" src={me.avatar.url} alt="User Avatar" />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Link to="/profile">
                                <Menu.Item icon={<FaUserCircle size={14} />}>My Profile</Menu.Item>
                            </Link>
                            {me.role === "admin" && (
                                <Link to="/admin/dashboard">
                                    <Menu.Item icon={<MdOutlineDashboard size={14} />}>Dashboard</Menu.Item>
                                </Link>
                            )}
                            <Link to="/applied">
                                <Menu.Item icon={<MdDoneAll size={14} />}>Applied Jobs</Menu.Item>
                            </Link>
                            <Link to="/saved">
                                <Menu.Item icon={<FaSave size={14} />}>Saved Jobs</Menu.Item>
                            </Link>
                            <Menu.Divider />
                            <Menu.Item onClick={LogOut} color="red" icon={<RiLogoutBoxFill size={14} />}>
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <div className='flex gap-4'>
                        <Link className='cursor-pointer text-sm px-4 py-2 rounded-xl blueCol' to="/login">Login</Link>
                        <Link className='cursor-pointer text-sm px-4 py-2 rounded-xl blueCol' to="/register">Register</Link>
                    </div>
                )}
            </ul>

            {/* Mobile and Tablet Navbar */}
            <div className='py-3 px-3 flex justify-between items-center lg:hidden'>
                <Link to="/" className='text-lg titleT flex items-center gap-1'>
                    <MdOutlineBusinessCenter size={19} /> JOBLANE
                </Link>
                <div className='flex items-center gap-4'>
                    {isLogin && (
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Avatar size={28} className='cursor-pointer' radius="xl" src={me.avatar.url} alt="User Avatar" />
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Link to="/profile">
                                    <Menu.Item icon={<FaUserCircle size={14} />}>My Profile</Menu.Item>
                                </Link>
                                {me.role === "admin" && (
                                    <Link to="/admin/dashboard">
                                        <Menu.Item icon={<MdOutlineDashboard size={14} />}>Dashboard</Menu.Item>
                                    </Link>
                                )}
                                <Link to="/applied">
                                    <Menu.Item icon={<MdDoneAll size={14} />}>Applied Jobs</Menu.Item>
                                </Link>
                                <Link to="/saved">
                                    <Menu.Item icon={<FaSave size={14} />}>Saved Jobs</Menu.Item>
                                </Link>
                                <Menu.Divider />
                                <Menu.Item onClick={LogOut} color="red" icon={<RiLogoutBoxFill size={14} />}>
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                    <div>
                        {toggle ? (
                            <RxCross1 size={24} className='cursor-pointer' onClick={() => setToggle(!toggle)} />
                        ) : (
                            <FaBars size={24} className='cursor-pointer' onClick={() => setToggle(!toggle)} />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Links */}
            {toggle && (
                <div className={`absolute w-screen h-screen z-20 bg-gray-950 bg-opacity-95 flex flex-col gap-10 text-2xl justify-start items-center pt-20`}>
                    <Link onClick={() => setToggle(false)} to="/" className='cool-link'>Home</Link>
                    <Link onClick={() => setToggle(false)} to="/jobs" className='cool-link'>Jobs</Link>
                    <Link onClick={() => setToggle(false)} to='/contact' className='cool-link'>Contact</Link>
                    <Link onClick={() => setToggle(false)} to='/about' className='cool-link'>About</Link>
                    {!isLogin && (
                        <div className='flex flex-col gap-4'>
                            <Link className=' text-white cursor-pointer text-sm px-4 py-2 rounded blueCol' to="/login" onClick={() => setToggle(false)}>Login</Link>
                            <Link className='text-white cursor-pointer text-sm px-4 py-2 rounded blueCol' to="/register" onClick={() => setToggle(false)}>Register</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
