import { useState } from 'react';
import { MetaData } from '../../components/MetaData';
import Sidebar from '../../components/Sidebar';
import {
  MdOutlineLocationOn,
  MdOutlineFeaturedPlayList,
  MdOutlineWorkOutline,
  MdWorkspacesOutline,
  MdAttachMoney,
  MdOutlineReceiptLong
} from 'react-icons/md';
import { BiImageAlt, BiBuilding } from 'react-icons/bi';
import { TbLoader2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { createJobPost } from '../../actions/JobActions';
import { RxCross1 } from 'react-icons/rx';

const CreateJob = () => {
  const { loading } = useSelector(state => state.job);
  const [sideTog, setSideTog] = useState(false);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('');
  const [employmentType, setEmploymentType] = useState('');

  const [logo, setLogo] = useState('');
  const [logoName, setLogoName] = useState('');

  const logoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoName(file.name);
    }
  };

  const postHandler = (e) => {
    e.preventDefault();
    const skillsArr = skillsRequired.split(',');
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('companyName', companyName);
    formData.append('location', location);
    formData.append('experience', experience);
    formData.append('salary', salary);
    formData.append('category', category);
    formData.append('companyLogo', logo);
    formData.append('employmentType', employmentType);
    formData.append('skillsRequired', JSON.stringify(skillsArr));

    dispatch(createJobPost(formData));

    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setCompanyName('');
    setLocation('');
    setSalary('');
    setExperience('');
    setSkillsRequired('');
    setCategory('');
    setEmploymentType('');
    setLogo('');
    setLogoName('');
  };

  return (
    <>
      <MetaData title="Post Job" />
      <div className="min-h-screen bg-gradient-to-tr from-blue-900 via-gray-900 to-black text-white">
        <div className="pt-4 fixed left-0 z-20 pl-0">
          <div
            onClick={() => setSideTog(!sideTog)}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all px-3 py-2 text-sm rounded-md"
          >
            {!sideTog ? 'Menu' : <RxCross1 />}
          </div>
        </div>
        <Sidebar sideTog={sideTog} />

        <div className="flex justify-center w-full items-center pt-12 px-4">
          <form
            onSubmit={postHandler}
            encType="multipart/form-data"
            className="flex flex-col gap-6 w-full max-w-4xl p-8 bg-gray-800 shadow-xl rounded-lg"
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-400 border-b border-gray-600 pb-2">
              Post Job
            </h2>

            {/* Job Title & Company Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <MdOutlineWorkOutline size={24} className="text-blue-400 mr-2" />
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Job Title"
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>

              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <BiBuilding size={24} className="text-blue-400 mr-2" />
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  placeholder="Company Name"
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Logo upload */}
            <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
              <BiImageAlt size={24} className="text-blue-400 mr-2" />
              <label
                htmlFor="logo"
                className="cursor-pointer w-full text-white placeholder-gray-400"
              >
                {logoName.length === 0 ? (
                  <span className="text-gray-400">Select Company Logo...</span>
                ) : (
                  logoName
                )}
              </label>
              <input
                id="logo"
                type="file"
                accept="image/*"
                hidden
                onChange={logoChange}
                className="outline-none"
              />
            </div>

            {/* Job Description & Skills Required */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full md:w-1/2 focus-within:ring-2 ring-blue-600">
                <MdOutlineFeaturedPlayList size={24} className="text-blue-400 mr-2" />
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='description'
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full md:w-1/2 focus-within:ring-2 ring-blue-600">
                <MdWorkspacesOutline size={24} className="text-blue-400 mr-2" />
                <input
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  placeholder="Skills Required"
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <MdOutlineReceiptLong size={24} className="text-blue-400 mr-2" />
                <input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  placeholder="Experience"
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <MdOutlineLocationOn size={24} className="text-blue-400 mr-2" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="Location"
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <MdAttachMoney size={24} className="text-blue-400 mr-2" />
                <input
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                  placeholder="Salary"
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-900 outline-none text-white"
                >
                  <option value="" className="text-gray-400">
                    Choose Job Category
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="flex items-center bg-gray-900 p-3 rounded-md w-full focus-within:ring-2 ring-blue-600">
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full bg-gray-900 outline-none text-white"
                >
                  <option value="" className="text-gray-400">
                    Employment Type
                  </option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 transition-all py-2 px-4 rounded-md flex justify-center items-center text-white font-semibold"
            >
              {loading ? (
                <TbLoader2 size={20} className="animate-spin" />
              ) : (
                'Post Job'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
