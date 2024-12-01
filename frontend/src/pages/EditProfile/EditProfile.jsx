import { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { MetaData } from '../../components/MetaData';
import { AiOutlineMail } from 'react-icons/ai';
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';
import { updateProfile, Me as ME } from '../../actions/UserActions';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { loading, me } = useSelector(state => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [avatar, setAvatar] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const [resume, setResume] = useState("");
  const [resumeName, setResumeName] = useState("");

  const avatarChange = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {

      setAvatar(file);
      setAvatarName(file.name);
    }
  };

  const resumeChange = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setResume(file);
      setResumeName(file.name);
    }
  };

  const editHandler = (e) => {
    e.preventDefault();
    const skillArr = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());

    const formData = new FormData();
    formData.append("newName", name);
    formData.append("newEmail", email);
    formData.append("newSkills", (skillArr));
    formData.append("newAvatar", avatar);
    formData.append("newResume", resume);
    dispatch(updateProfile(formData));
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    if (!me) {
      dispatch(ME()); // Dispatch the action to fetch the user data
    }
  }, []);

  // Update local state when `me` is available
  useEffect(() => {
    if (me) {
      setName(me.name || '');  // Ensure name is defined
      setEmail(me.email || ''); // Ensure email is defined
      setSkills(me.skills || ''); // Ensure skills are defined
      setAvatar(me.avatar || '')//Ensure avatar is defined
      setResume(me.resume || '')//Ensure resume is defined
    }
  }, [me]);

  return (
    <>
      <MetaData title="Edit Profile" />
      <div className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {loading ? (
            <Loader />
          ) : (
            <form
              onSubmit={editHandler}
              encType="multipart/form-data"
              className="mt-8 space-y-6 bg-gray-800 p-10 rounded-lg shadow-lg"
              aria-labelledby="edit-profile-form"
            >
              <div className="text-center">
                <h2 id="edit-profile-form" className="text-3xl font-extrabold text-white">Edit Profile</h2>
              </div>

              {/* Name */}
              <div className="mb-4 relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full name</label>
                <div className="flex items-center">
                  <MdPermIdentity className="absolute left-3 text-gray-400" size={20} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none rounded relative block w-full px-10 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                    placeholder="Full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4 relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <div className="flex items-center">
                  <AiOutlineMail className="absolute left-3 text-gray-400" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-10 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Profile */}
              <div className="mb-4 relative">
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-300">Profile Picture</label>
                <div className="flex items-center">
                  <CgProfile className="absolute left-3 text-gray-400" size={20} />
                  <label
                    htmlFor="avatar"
                    className="appearance-none rounded-none relative block w-full px-10 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700 cursor-pointer"
                  >
                    {avatarName.length === 0 ? (
                      <span className="text-gray-500 font-medium">
                        Select New Profile Pic...
                      </span>
                    ) : (
                      avatarName
                    )}
                  </label>
                  <input
                    id="avatar"
                    name="avatar"
                    onChange={avatarChange}
                    accept="image/*"
                    type="file"
                    className="hidden"
                  />
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Please select an image file
                </p>
              </div>

              {/* Resume */}
              <div className="mb-4 relative">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-300">Resume</label>
                <div className="flex items-center">
                  <BsFileEarmarkText className="absolute left-3 text-gray-400" size={20} />
                  <label
                    htmlFor="resume"
                    className="appearance-none rounded-none relative block w-full px-10 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700 cursor-pointer"
                  >
                    {resumeName.length === 0 ? (
                      <span className="text-gray-500 font-medium">
                        Select New Resume...
                      </span>
                    ) : (
                      resumeName
                    )}
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    onChange={resumeChange}
                    accept=".pdf,.doc,.docx"
                    type="file"
                    className="hidden"
                  />
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Please select a PDF or Word document
                </p>
              </div>

              {/* Skills */}
              <div className="mb-4 relative">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-300">Skills</label>
                <div className="flex items-center">
                  <MdOutlineFeaturedPlayList className="absolute left-3 text-gray-400" size={20} />
                  <textarea
                    id="skills"
                    name="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter Your Skills"
                    className="appearance-none rounded-none relative block w-full px-10 py-2 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
