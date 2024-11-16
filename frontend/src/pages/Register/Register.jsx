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
    if (!registrationSucess) {
      navigate('/login');
    }
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, registrationSucess]);

  const avatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarName(file.name);
          setValue('avatar', file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setResume(reader.result);
          setResumeName(file.name);
          setValue('resume', file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <MetaData title="Register" />
      <div className="bg-gray-950 min-h-screen pt-14 px-4 sm:px-10 md:px-16 lg:px-20 text-white flex justify-center items-center pb-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id='form'
          className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="text-center pb-6">
            <p className="text-3xl md:text-4xl font-semibold">Register</p>
          </div>

          {/* Name */}
          <div className="flex items-center mb-4 bg-gray-700 rounded-md">
            <MdPermIdentity className="text-gray-500 mx-3" size={20} />
            <input
              {...register('name')}
              placeholder="Full Name"
              id='name'
              type="text"
              className={`outline-none w-full bg-transparent py-2 rounded-md ${errors.name ? 'border border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex items-center mb-4 bg-gray-700 rounded-md">
            <AiOutlineMail className="text-gray-500 mx-3" size={20} />
            <input
              {...register('email')}
              id='email'
              placeholder="Email"
              type="email"
              className={`outline-none w-full bg-transparent py-2 rounded-md ${errors.email ? 'border border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex items-center mb-4 bg-gray-700 rounded-md">
            <AiOutlineUnlock className="text-gray-500 mx-3" size={20} />
            <input
              {...register('password')}
              id='password'
              placeholder="Password"
              type={eyeTog ? 'text' : 'password'}
              className={`outline-none w-full bg-transparent py-2 rounded-md ${errors.password ? 'border border-red-500' : ''}`}
            />
            <div onClick={() => setEyeTog((prev) => !prev)}>
              {eyeTog ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Profile Picture */}
          <div className="flex items-center mb-4 bg-gray-700 rounded-md cursor-pointer">
            <CgProfile className="text-gray-500 mx-3" size={20} />
            <label htmlFor="avatar" className="outline-none w-full py-2 text-gray-300 cursor-pointer">
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
          <div className="flex items-center mb-4 bg-gray-700 rounded-md cursor-pointer">
            <BsFileEarmarkText className="text-gray-500 mx-3" size={20} />
            <label htmlFor="resume" className="outline-none w-full py-2 text-gray-300 cursor-pointer">
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
          <div className="flex items-center mb-6 bg-gray-700 rounded-md">
            <MdOutlineFeaturedPlayList className="text-gray-500 mx-3" size={20} />
            <input
              {...register('skills')}
              placeholder="Enter your skills (comma separated)"
              type="text"
              className={`outline-none w-full bg-transparent py-2 rounded-md ${errors.skills ? 'border border-red-500' : ''}`}
            />
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {loading ? <TbLoader2 className="animate-spin inline-block" size={20} /> : 'Register'}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-300 hover:text-white transition duration-200 underline">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;