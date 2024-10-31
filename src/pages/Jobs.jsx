/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { FiSearch } from 'react-icons/fi';
import { Loader } from '../components/Loader';
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, getSingleJob } from '../actions/JobActions';
import { RxCross2 } from 'react-icons/rx';
import useIsMobile from '../hooks/useIsMobile';
import { companyData, data } from "../constants";
import { Slider } from "@mantine/core";


const Jobs = () => {

  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector(state => state.job);

  const [baseJobs, setBaseJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");
  const [salary, setSalary] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  useEffect(() => {
    setJobs(allJobs);
    setBaseJobs(allJobs);
  }, [allJobs]);

  useEffect(() => {
    const searchArr = baseJobs.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase().trim())
    );

    setJobs(search === "" ? baseJobs : searchArr);
  }, [search, baseJobs]);

  const leftFilter = (jobsList) => {
    if (category === "") {
      setJobs(allJobs);
      return;
    }
    const leftFilArr = jobsList.filter((item) =>
      item.category?.toLowerCase() === category.toLowerCase()
    );
    setJobs(leftFilArr);
  };

  const removeLeftFilter = () => {
    setCategory("");
    setJobs(allJobs);
    setCurrentPage(1);
  };

  const searchHandler = () => {
    const searchArr = baseJobs.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );

    setJobs(search !== "" ? searchArr : baseJobs);
  };

  const rightFilter = (jobsList) => {
    if (company === "") {
      setJobs(allJobs);
      return;
    }
    const rightFilArr = jobsList.filter((item) =>
      item.companyName?.toLowerCase() === company.toLowerCase()
    );
    setJobs(rightFilArr);
  };

  const removeRightFilter = () => {
    setCompany("");
    setJobs(allJobs);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 5;
  const totalPageCount = Math.ceil(jobs.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPageCount));
  };
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = jobs.slice(startIndex, endIndex);

  const pageButtons = [];
  const maxButtonsToShow = 3; // Maximum number of page buttons to show
  let startButton = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
  let endButton = Math.min(totalPageCount, startButton + maxButtonsToShow - 1);

  for (let i = startButton; i <= endButton; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`mx-1 px-3 py-1 border border-gray-700 rounded ${currentPage === i ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white'}`}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      <MetaData title="Jobs" />
      <div className='bg-gray-950 min-h-screen pt-14 sm:px-20 px-3 text-white'>
        {loading ? <Loader /> :
          <>
            <div className='flex-col flex justify-center items-center w-full'>
              <div className='text-center pt-8 sm:text-3xl text-2xl font-medium'>
                <p>Find your dream job now</p>
              </div>

              <div className='flex w-full flex-col sm:flex-row gap-4 py-4'>

                {/* Left section for category filter */}
                <div className='flex-1  p-4 rounded-md'>
                  <p className='text-lg flex justify-center  underline underline-offset-4'>Categories</p>
                  <ul className='flex pt-3 items-center mb-3 flex-col gap-3'>
                    {data.map((e, i) => (
                      <li
                        key={i}
                        onClick={() => setCategory(e)}
                        className={`hover:text-yellow-600 cursor-pointer ${category === e ? "text-yellow-600" : ""}`}
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className='flex flex-col justify-center items-center pt-5'>
                    <p className=' underline underline-offset-4 text-lg pb-3'>Salary</p>

                    <Slider
                      color='indigo'
                      className='outline-none w-48'
                      value={salary}
                      onChange={setSalary}
                      min={0}
                      max={200000}
                    />
                  </div>
                  <div className='flex flex-col gap-4  pt-5'>
                    <button onClick={() => leftFilter(jobs)} className='blueCol  px-1 py-1 text-sm'>Apply Filter</button>
                    <button onClick={removeLeftFilter} className='blueCol px-1 py-2 text-xs'>Remove Filter</button>
                  </div>
                </div>

                {/* Center section for job search input and job cards */}
                <div className='flex-1 p-4'>
                  <div className='flex justify-center items-center mb-4'>
                    <div className='bg-white flex w-full rounded-md overflow-hidden'>
                      <div className='flex justify-center items-center pl-2 text-black'> <FiSearch size={19} /> </div>
                      <input
                        value={search}
                        placeholder='Search Jobs '
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className='outline-none bold-placeholder  text-black px-2 pl-3 h-10 w-full'
                      />
                      <div className='text-black items-center flex justify-center px-2'>
                        <RxCross2 onClick={() => setSearch("")} size={19} className={`cursor-pointer ${search.length !== 0 ? "flex" : "hidden"}`} />
                      </div>
                      <button onClick={searchHandler} className='blueCol sm:text-sm text-xs px-4 h-10'>Search</button>
                    </div>
                  </div>

                  <div className='flex flex-col  sm:overflow-y-auto sm:max-h-[30em] gap-4'>
                    {jobs && displayedData
                      .filter(job => job?._id) // Ensure job has a valid _id
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((job, i) => (
                        <JobCard key={job._id} onClick={() => dispatch(getSingleJob(job._id))} job={job} />
                      ))
                    }
                    {jobs.length === 0 && (
                      <div className='flex w-full justify-center items-center text-center pt-16 pb-12 sm:text-xl text-lg'>
                        No Jobs available according to your preferences
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className='flex justify-center mt-4'>
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mr-2">
                      Previous
                    </button>
                    {pageButtons}
                    <button onClick={handleNextPage} disabled={currentPage === totalPageCount} className="bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 ml-2">
                      Next
                    </button>
                  </div>
                </div>

                {/* Right section for company filters */}
                <div className='flex-1  p-4 rounded-md'>
                  <p className='text-lg flex justify-center underline underline-offset-4'>Companies</p>
                  <ul className='flex items-center pt-3 flex-col mb-3 gap-3'>
                    {companyData.map((e, i) => (
                      <li
                        key={i}
                        onClick={() => setCompany(e.name)} // Change here to access 'name' property
                        className={`hover:text-yellow-600 cursor-pointer ${company === e.name ? "text-yellow-600" : ""}`}
                      >
                        {e.name} {/* Render the company name */}
                      </li>
                    ))}
                  </ul>
                  <div className='flex flex-col  gap-4 pt-5'>
                    <button onClick={() => rightFilter(jobs)} className='blueCol px-1 py-1 text-sm'>Apply Filter</button>
                    <button onClick={removeRightFilter} className='blueCol px-1 py-2 text-xs'>Remove Filter</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Jobs;
