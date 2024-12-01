/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { MetaData } from '../../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Me } from "../../actions/UserActions";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { loading, me, isLogin } = useSelector(state => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  // Fetch user profile when component mounts
  useEffect(() => {
    if (isLogin) {
      dispatch(Me()); // Assuming you have a fetchUserProfile action
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [isLogin]);

  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      return "Invalid date format";
    }
    return date.toLocaleDateString('en-GB'); // Format to 'DD-MM-YYYY'
  };


  // Fallback values if me is not defined
  const avatarUrl = me.avatar.url || '/tmp/to/default-avatar.png';
  const resumeUrl = me.resume.url || '/tmp/to/default-resume.png';

  return (
    <>
      <MetaData title="My Profile" />
      <div className='bg-gray-900 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {loading ? <Loader /> : (
          <>
            <div className='text-left text-4xl font-bold pl-4 underline-offset-8 md:pt-6 pt-3'>
              <span className='font-medium'>My Profile</span>
            </div>

            <div className='flex md:flex-row flex-col md:gap-12 gap-8 justify-between items-start md:pt-12 border-blue-500 min-h-[90vh]'>
              <div className='md:w-1/3 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8'>
                <img src={avatarUrl} alt="User Avatar" className='w-3/4 h-auto rounded-full mx-auto' />
                <div className='flex justify-center pt-4'>
                  <Link to="/editProfile">
                    <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300'>Edit Profile</button>
                  </Link>
                </div>
              </div>
              <div className='md:w-2/3 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8'>
                <div className='flex flex-col gap-6'>
                  <div>
                    <p className='md:text-2xl text-xl font-semibold'>Full Name</p>
                    <p className='md:text-xl pt-1 text-lg text-gray-300'>{me.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='md:text-2xl text-xl font-semibold'>Email</p>
                    <p className='md:text-xl pt-1 text-lg text-gray-300'>{me.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='md:text-2xl text-xl font-semibold'>Joined On</p>
                    <p className='md:text-xl pt-1 text-lg text-gray-300'>{convertDateFormat(me.createdAt) || ''}</p>
                  </div>
                  <div>
                    <p className='md:text-2xl text-xl font-semibold'>Skills</p>
                    <div className='md:text-xl text-lg pt-3 flex flex-wrap gap-3'>
                      {me.skills.length > 0 ? (
                        me.skills.map((skill, i) => (
                          <span key={i} className='bg-yellow-500 text-black text-sm px-3 py-1 rounded-full font-bold'>{skill}</span>
                        ))
                      ) : (
                        <p className='text-gray-300'>No skills listed</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap gap-4 pt-4'>
                  <button onClick={open} className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300'>My Resume</button>
                  <Link to="/applied"><button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300'>My Applications</button></Link>
                  <Link to="/saved"><button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300'>Saved Jobs</button></Link>
                  <Link to="/changePassword"><button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300'>Change Password</button></Link>
                  <Link to="/deleteAccount"><button className='bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300'>Delete Account</button></Link>
                </div>
              </div>
            </div>

            <Modal opened={opened} onClose={close} title="Resume">
              <div>
                <img src={resumeUrl} className='w-full h-full object-contain' alt="User Resume" />
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default MyProfile;
