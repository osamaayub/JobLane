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
  }, [dispatch, isLogin, navigate]);

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
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {loading ? <Loader /> : (
          <>
            <div className='text-left text-3xl underL absolute pl-4 underline-offset-8 md:pt-6 pt-3'>
              <span className='font-medium'>My Profile</span>
            </div>

            <div className='flex md:flex-row md:gap-12 flex-col md:justify-around justify-center items-top md:pt-12 border-blue-500 min-h-[90vh]'>
              <div className='md:w-1/2 w-full md:pb-0 pt-16 md:pt-10 gap-8 flex flex-col justify-start items-center'>
                <div className='w-72 h-72 flex md:justify-center justify-start items-center'>
                  <img src={avatarUrl} className='rounded-full w-full h-full' alt="User Avatar" />
                </div>
                <div className='flex justify-center items-center'>
                  <Link to="/editProfile" className='blueCol px-10 py-2 font-semibold'>Edit Profile</Link>
                </div>
              </div>

              <div className='md:w-1/2 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8'>
                <div className='flex flex-col md:gap-5 gap-6'>
                  <div>
                    <p className='md:text-2xl text-xl'>Full Name</p>
                    <p className='md:text-xl pt-1 text-lg'>{me.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='md:text-2xl text-xl'>Email</p>
                    <p className='md:text-xl pt-1 text-lg'>{me.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='md:text-2xl text-xl'>Joined On</p>
                    <p className='md:text-xl pt-1 text-lg'>{convertDateFormat(me.createdAt) || ''}</p>
                  </div>
                  <div>
                    <p className='md:text-2xl text-xl'>Skills</p>
                    <div className='md:text-xl text-lg pt-3 flex gap-3'>
                      {me.skills.length > 0 ? (
                        me.skills.map((skill, i) => (
                          <span key={i} className='bg-yellow-500 text-black text-sm px-2 py-1 font-bold'>{skill}</span>
                        ))
                      ) : (
                        <p>No skills listed</p>
                      )}
                    </div>
                  </div>

                  <div className='flex md:flex-row flex-col md:gap-8 pt-4 gap-3'>
                    <ul className='flex flex-col gap-4'>
                      <li>
                        <button onClick={open} className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>My Resume</button>
                      </li>
                      <li>
                        <Link to="/applied"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>My Applications</button></Link>
                      </li>
                      <li>
                        <Link to="/saved"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>Saved Jobs</button></Link>
                      </li>
                    </ul>
                    <ul className='flex flex-col gap-4'>
                      <li>
                        <Link to="/changePassword"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>Change Password</button></Link>
                      </li>
                      <li>
                        <Link to="/deleteAccount"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>Delete Account</button></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Modal opened={opened} onClose={close} title="Resume">
                <div>
                  <img src={resumeUrl} className='w-full h-full' alt="User Resume" />
                </div>
              </Modal>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyProfile;
