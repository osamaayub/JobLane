
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaData } from '../../components/MetaData.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../../actions/JobActions.js';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import { companyData } from "../../constants/index.js";

// Updated array for company logos with URLs


const Home = () => {
  const dispatch = useDispatch();
  const { loading, allJobs } = useSelector(state => state.job);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  useEffect(() => {
    if (allJobs) {
      setJobs(allJobs);
    }
  }, [allJobs]);
  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      return "Invalid date format";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <MetaData title="JobLane" />
      <div className='min-h-screen flex flex-col text-white bg-gray-900 from-gray-900 to-slate-900'>
        <div className='flex-grow pt-28 w-full flex flex-col items-center gap-4 md:px-10 px-3'>
          <div className='flex md:flex-row flex-col items-center justify-center md:gap-8 gap-1'>
            <div className='md:text-8xl text-6xl titleT'>JOBLANE</div>
            <div className='flex justify-center items-center pt-1'>
              <Link to="/jobs" className='font-semibold md:text-2xl text-lg rounded-full blueCol md:py-3 py-2 px-4 md:px-3'>Browse Jobs</Link>
            </div>
          </div>
          <div>
            <p className='md:text-xl text-sm'>Your <span className='text-yellow-500'>gateway</span> to job opportunities.</p>
          </div>

          <div className='pt-32 w-full md:px-6 px-2'>
            <div className='titleT pb-6 text-2xl'>
              <p className='titleT'>Featured Jobs</p>
            </div>
            <div>
              {
                loading ? (
                  <div className='w-full flex justify-center items-center'>
                    <span className="loader1"></span>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                    {jobs.length > 0 ? (
                      jobs.slice(0, 3).map((job) => (
                        <Link
                          key={job._id}
                          to={`/details/${job._id}`}
                          className='flex flex-col gap-2 rounded-2xl shadow-md shadow-gray-800 border border-gray-700 p-4 hover:border-rose-500 transition duration-300 hover:scale-[1.02] hover:bg-slate-950 h-full'
                        >
                          <div className='flex flex-wrap gap-2'>
                            <div className='flex items-center gap-2'>
                              <img src={job.companyLogo.url} alt={job.title}
                                className='w-[3rem] md:w-[4rem] rounded-full object-cover' />
                              <div className='flex flex-col'>
                                <p className='md:text-xl text-base lg:text-lg'>{job.title}</p>
                                <p className='text-sm'>{job.companyName}</p>
                              </div>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-sm'>{job.description.slice(0, 30) + "..."}</p>
                              <button className='blueCol rounded cursor-pointer font-semibold md:text-sm text-xs px-2 py-1'>Apply</button>
                            </div>
                          </div>
                          <div className='flex gap-x-1 justify-between'>
                            <span className='whitespace-nowrap'>{convertDateFormat(job.createdAt)}</span>
                            <span className='whitespace-nowrap'>{job.employmentType}</span>
                            <span className='whitespace-nowrap'>{job.location}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className='text-center'>No jobs available at the moment.</p>
                    )}
                  </div>
                )
              }
            </div>
          </div>

          <div className='pt-20 flex flex-col gap-4 md:px-[1rem] px-[1rem]'>
            <div className='text-2xl titleT'>
              Companies on our site
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {
                companyData.map((company, index) => (
                  <div key={index}>
                    <img src={company.link} className='max-w-14 max-h-12 md:max-w-14 rounded-full object-contain' alt={company.title} />
                  </div>
                ))
              }
            </div>
          </div>

          <Testimonials />

          <div className="pt-32 pb-40 md:px-40 px-4 text-center">
            <p>Discover the Power of Possibility with JobLane: Where Your Professional Journey Takes Flight, Guided by a Network of Diverse Opportunities!</p>
          </div>
        </div>
      </div>
      <div className=''></div>
    </>
  );
};

export default Home;
