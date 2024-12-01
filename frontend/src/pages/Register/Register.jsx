/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { MetaData } from '../../components/MetaData';
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { registerUser } from '../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from "../../validations";

const Register = () => {
  const { loading, isLogin, registrationSucess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eyeTog, setEyeTog] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [resume, setResume] = useState('');
  const [resumeName, setResumeName] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => {
    const skillsArr = data.skills.split(',').map(skill => skill.trim());
    const formData = new FormData();
    formData.append("name", data.name),
      formData.append("email", data.email),
      formData.append("password", data.password),
      formData.append("avatar", avatar);
      formData.append("resume", resume),
      formData.append("skills", JSON.stringify(skillsArr));
    // Dispatch the registerUser action
    dispatch(registerUser(formData));

    // Reset form and file states
    reset();
    setAvatar('');
    setAvatarName('');
    setResume('');
    setResumeName('');
  };

  useEffect(() => {
    if (registrationSucess) {
      navigate('/login');
    }
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, registrationSucess]);

  const avatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file); // Directly set the raw file
      setAvatarName(file.name);
      setValue('avatar', file);
    }
  };

  const resumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file); // Directly set the raw file
      setResumeName(file.name);
      setValue('resume', file);
    }
  };


  return (
    <>
      <MetaData title="Register" />
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex justify-center items-center py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id='form'
          encType='multi-part/form-data'
          className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-8 bg-gray-900 rounded-lg shadow-2xl"
        >
          <div className="text-center pb-6">
            <p className="text-3xl md:text-4xl font-semibold text-white">Register</p>
          </div>

          {/* Name */}
          <div className="flex items-center mb-4 bg-gray-800 rounded-md shadow-sm">
            <MdPermIdentity className="text-gray-400 mx-3" size={20} />
            <input
              {...register('name')}
              placeholder="Full Name"
              id='name'
              type="text"
              className={`outline-none w-full bg-transparent py-2 rounded-md text-white ${errors.name ? 'border border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex items-center mb-4 bg-gray-800 rounded-md shadow-sm">
            <AiOutlineMail className="text-gray-400 mx-3" size={20} />
            <input
              {...register('email')}
              id='email'
              placeholder="Email"
              type="email"
              className={`outline-none w-full bg-transparent py-2 rounded-md text-white ${errors.email ? 'border border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex items-center mb-4 bg-gray-800 rounded-md shadow-sm">
            <AiOutlineUnlock className="text-gray-400 mx-3" size={20} />
            <input
              {...register('password')}
              id='password'
              placeholder="Password"
              type={eyeTog ? 'text' : 'password'}
              className={`outline-none w-full bg-transparent py-2 rounded-md text-white ${errors.password ? 'border border-red-500' : ''}`}
            />
            <div onClick={() => setEyeTog((prev) => !prev)} className="cursor-pointer mx-3">
              {eyeTog ? <AiOutlineEye size={20} className="text-gray-400" /> : <AiOutlineEyeInvisible size={20} className="text-gray-400" />}
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Profile Picture */}
          <div className="flex items-center mb-4 bg-gray-800 rounded-md shadow-sm cursor-pointer">
            <CgProfile className="text-gray-400 mx-3" size={20} />
            <label htmlFor="avatar" className="outline-none w-full py-2 text-gray-400 cursor-pointer">
              {avatarName || 'Select Profile Pic...'}
            </label>
            <input
              id="avatar"
              required
              onChange={avatarChange}
              accept="image/*"
              type="file"
              className="hidden" // Hide the input element
            />
            {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>}
          </div>

          {/* Resume */}
          <div className="flex items-center mb-4 bg-gray-800 rounded-md shadow-sm cursor-pointer">
            <BsFileEarmarkText className="text-gray-400 mx-3" size={20} />
            <label htmlFor="resume" className="outline-none w-full py-2 text-gray-400 cursor-pointer">
              {resumeName || 'Select Resume...'}
            </label>
            <input
              id="resume"
              required
              onChange={resumeChange}
              accept=".pdf"
              type="file"
              className="hidden" // Hide the input element
            />
            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message}</p>}
          </div>

          {/* Skills */}
          <div className="flex items-center mb-6 bg-gray-800 rounded-md shadow-sm">
            <MdOutlineFeaturedPlayList className="text-gray-400 mx-3" size={20} />
            <input
              {...register('skills')}
              placeholder="Enter your skills (comma separated)"
              type="text"
              className={`outline-none w-full bg-transparent py-2 rounded-md text-white ${errors.skills ? 'border border-red-500' : ''}`}
            />
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {loading ? <TbLoader2 className="animate-spin inline-block" size={20} /> : 'Register'}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-400 hover:text-gray-200 transition duration-200 underline">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;