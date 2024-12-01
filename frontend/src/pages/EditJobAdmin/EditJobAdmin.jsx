
import { useEffect, useState } from 'react'
import { MetaData } from '../../components/MetaData'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/Loader'
import { getJobData, updateJobData } from '../../actions/AdminActions'
import Sidebar from '../../components/Sidebar'
import { RxCross1 } from 'react-icons/rx'
import { MdOutlineLocationOn, MdWork, MdOutlineFeaturedPlayList, MdOutlineWorkOutline, MdWorkspacesOutline, MdAttachMoney, MdOutlineReceiptLong, MdCategory } from 'react-icons/md'
import { BiImageAlt } from 'react-icons/bi'
import { TbLoader2 } from 'react-icons/tb'
import { BiBuilding } from 'react-icons/bi'
import { toast } from 'react-toastify'




const EditJobAdmin = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, jobData } = useSelector(state => state.admin)

  const [sideTog, setSideTog] = useState(false)


  const [title, setTitle] = useState(jobData.title);
  const [description, setDescription] = useState(jobData.description);
  const [companyName, setCompanyName] = useState(jobData.companyName);
  const [location, setLocation] = useState(jobData.location);
  const [skillsRequired, setSkillsRequired] = useState(jobData.skillsRequired);
  const [experience, setExperience] = useState(jobData.experience);
  const [salary, setSalary] = useState(jobData.salary);
  const [category, setCategory] = useState(jobData.category);
  const [employmentType, setEmploymentType] = useState(jobData.employmentType);

  const [logo, setLogo] = useState(jobData.companyLogo.url);
  const [logoName, setLogoName] = useState("Select New Logo");






  const logoChange = (e) => {
    if (e.target.name === "logo") {
      const file = e.target.files[0];
      setLogo(URL.createObjectURL(file));
      setLogoName(file.name);
    }
  }


  const postEditHandler = (e) => {
    e.preventDefault();
  }


  useEffect(() => {
    dispatch(getJobData(id))
  }, [id])



  useEffect(() => {
    setTitle(jobData.title)
    setDescription(jobData.description)
    setCompanyName(jobData.companyName)
    setLocation(jobData.location)
    setSkillsRequired(jobData.skillsRequired)
    setExperience(jobData.experience)
    setSalary(jobData.salary)
    setCategory(jobData.category)
    setEmploymentType(jobData.employmentType)
    setLogo(jobData.companyLogo.url)

  }, [jobData])

  const updateJobHandler = () => {
    let skillsArr = skillsRequired;
    if (typeof (skillsRequired) === "string") {
      skillsArr = skillsRequired.split(",");
    }

    if (logo.includes("cloudinary")) {
      toast.info("Please select new logo !")
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("companyName", companyName);
      formData.append("location", location);
      formData.append("skillsRequired", JSON.stringify(skillsArr));
      formData.append("experience", experience);
      formData.append("salary", salary);
      formData.append("category", category);
      formData.append("employmentType", employmentType);
      formData.append("companyLogo", logo);
      formData.append("description", description);

      dispatch(updateJobData(id, formData));
    }
  }

  return (
    <>
      <MetaData title="Edit Job Details" />
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
      {
      loading ? <Loader /> :
      <div>
      <div className="pt-1 fixed left-0 z-20 pl-0">
      <div onClick={(() => setSideTog(!sideTog))} className='cursor-pointer blueCol px-3 py-2' size={44} >
      {!sideTog ? "Menu" : <RxCross1 />}
      </div>
      </div>
      <Sidebar sideTog={sideTog} />
      <div className='flex justify-center w-full items-start pt-6'>
      <form onSubmit={postEditHandler} encType='multipart/form-data' className='w-full md:max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg'>
      <div className='flex flex-col space-y-6'>
      <div className='text-4xl font-semibold text-white'>
        Edit Job Details
      </div>
      {/* Job Title and Company Name */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdOutlineWorkOutline size={20} className='text-gray-500 mr-3' />
        <input
        value={title} onChange={(e) => setTitle(e.target.value)}
        required placeholder='Job Title' type="text"
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <BiBuilding size={20} className='text-gray-500 mr-3' />
        <input
        value={companyName} onChange={(e) => setCompanyName(e.target.value)}
        required placeholder='Company Name' type="text"
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
      </div>
      {/* Logo Upload */}
      <div className='bg-gray-800 rounded-lg p-4'>
        <div className='flex items-center justify-between'>
        <div className='flex items-center text-gray-400'>
        {logo?.length !== 0 ?
        <img src={logo} className='w-[3em] mr-3' alt="Company Logo" /> :
        <BiImageAlt size={20} />
        }
        <label htmlFor='logo' className='cursor-pointer'>
        {logoName.length === 0 ? <span className='text-gray-500'>Select Logo...</span> : logoName}
        </label>
        </div>
        <input id='logo' name='logo' required onChange={logoChange}
        accept="image/*" type="file" className='outline-none hidden' />
        </div>
      </div>
      {/* Experience, Location, and Salary */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdOutlineReceiptLong size={20} className='text-gray-500 mr-3' />
        <input
        value={experience} onChange={(e) => setExperience(e.target.value)}
        required placeholder='Experience' type="text"
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdOutlineLocationOn size={20} className='text-gray-500 mr-3' />
        <input
        value={location} onChange={(e) => setLocation(e.target.value)}
        required placeholder='Location' type="text"
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdAttachMoney size={20} className='text-gray-500 mr-3' />
        <input
        value={salary} onChange={(e) => setSalary(e.target.value)}
        required placeholder='Salary' type="text"
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
      </div>
      {/* Job Description & Skills */}
      <div className='grid grid-cols-1 gap-6'>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdOutlineFeaturedPlayList size={20} className='text-gray-500 mr-3' />
        <textarea
        value={description} onChange={(e) => setDescription(e.target.value)}
        required placeholder='Job Description'
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6'>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdWorkspacesOutline size={20} className='text-gray-500 mr-3' />
        <textarea
        value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)}
        required placeholder='Required Skills'
        className='w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
      </div>
      {/* Category & Employment Type */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdCategory size={20} className='text-gray-500 mr-3' />
        <select
        required onChange={(e) => setCategory(e.target.value)} value={category}
        className="w-full bg-gray-800 placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="category">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
        <option value="Legal">Legal</option>
        </select>
        </div>
        <div className='bg-gray-800 rounded-lg p-4 relative flex items-center'>
        <MdWork size={20} className='text-gray-500 mr-3' />
        <select
        required onChange={(e) => setEmploymentType(e.target.value)} value={employmentType}
        className="w-full bg-gray-800 text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select Employment Type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
        </select>
        </div>
      </div>
      {/* Submit Button */}
      <div className='flex justify-center'>
        <button
        type="submit"
        onClick={updateJobHandler}
        className='bg-blue-600 text-white w-full md:w-[20rem] py-3 rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-blue-700'>
        {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Edit Job"}
        </button>
      </div>
      </div>
      </form>
      </div>
      </div>
      }
      </div>
    </>
    )
}
export default EditJobAdmin;
