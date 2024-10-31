/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { MetaData } from '../components/MetaData';
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram, AiOutlineTwitter, AiTwotoneMail } from 'react-icons/ai';

const Contact = () => {
  const [que1, setQue1] = useState(false);
  const [que2, setQue2] = useState(false);
  const [que3, setQue3] = useState(false);

  return (
    <>
      <MetaData title="Contact" />
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        <div className='flex flex-col gap-8 md:px-0 px-2 md:pt-8 pt-4 pb-20'>

          <div>
            <h1 className='text-4xl pb-3 font-bold underline underline-offset-8 text-yellow-500'>Contact Us</h1>
            <p className='text-lg'>
              We're excited to hear from you! If you have any questions, inquiries, or feedback, feel free to reach out to us using the contact information provided below. Your satisfaction and engagement with our platform are our top priorities, and we're here to assist you in any way we can.
            </p>
          </div>

          <div>
            <h2 className='text-2xl text-yellow-500'>Contact Information</h2>
            <div className='mt-4'>
              <p className='text-xl pb-1'>Address:</p>
              <p className='text-lg'>JobLane, Wall Street, New York, 123, United States</p>
            </div>
            <div className='mt-4'>
              <p className='text-xl pb-1'>Email:</p>
              <ul className='list-disc pl-4 text-lg'>
                <li>General Inquiries: <span className='text-blue-400'>info@joblane.com</span></li>
                <li>Support: <span className='text-blue-400'>support@joblane.com</span></li>
                <li>Job Applications: <span className='text-blue-400'>jobs@joblane.com</span></li>
              </ul>
            </div>
            <div className='mt-4'>
              <p className='text-xl pb-1'>Phone:</p>
              <ul className='list-disc pl-4 text-lg'>
                <li>Customer Support: <span className='text-blue-400'>+123-456-7890</span></li>
                <li>HR & Job Inquiries: <span className='text-blue-400'>+123-456-7891</span></li>
              </ul>
            </div>

            <div className='mt-6'>
              <p className='text-xl pb-1'>Social Media:</p>
              <div className='flex gap-5 pt-1 items-center'>
                <BsFacebook className='text-blue-600 hover:text-blue-500 transition' size={26} />
                <AiFillInstagram className='text-pink-600 hover:text-pink-500 transition' size={30} />
                <AiOutlineTwitter className='text-blue-400 hover:text-blue-300 transition' size={30} />
                <AiTwotoneMail className='text-red-600 hover:text-red-500 transition' size={28} />
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-2xl pb-4 text-yellow-500'>Frequently Asked Questions (FAQs):</h2>
            <div id="accordion-collapse">
              <h3 id="accordion-collapse-heading-1">
                <button onClick={() => setQue1(!que1)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-300 border-b border-gray-700 hover:bg-gray-800 transition">
                  <span>How do I create an account on your job application platform?</span>
                  <svg className={`w-3 h-3 transform transition ${que1 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h3>
              <div className={`${que1 ? "flex" : "hidden"}`}>
                <div className="p-5 border border-b-0 border-gray-700 bg-gray-800">
                  <p className="text-gray-400">Ans: To create an account, click on the "Register" button located at the top right corner of the homepage. Fill in your personal information, including your name, email address, and a secure password. Once your account is created, you can start exploring jobs.</p>
                </div>
              </div>

              <h3 id="accordion-collapse-heading-2">
                <button onClick={() => setQue2(!que2)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-300 border-b border-gray-700 hover:bg-gray-800 transition">
                  <span>What should I include in my job application?</span>
                  <svg className={`w-3 h-3 transform transition ${que2 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h3>
              <div className={`${que2 ? "flex" : "hidden"}`}>
                <div className="p-5 border border-b-0 border-gray-700 bg-gray-800">
                  <p className="text-gray-400">Ans: Crafting an effective job application is crucial to stand out to potential employers. Make sure to include a tailored resume that highlights your relevant experience and skills. Additionally, write a cover letter that showcases how your qualifications align with the job requirements.</p>
                </div>
              </div>

              <h3 id="accordion-collapse-heading-3">
                <button onClick={() => setQue3(!que3)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-300 border-b border-gray-700 hover:bg-gray-800 transition">
                  <span>How can I check the status of my job application?</span>
                  <svg className={`w-3 h-3 transform transition ${que3 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h3>
              <div className={`${que3 ? "flex" : "hidden"}`}>
                <div className="p-5 border border-b-0 border-gray-700 bg-gray-800">
                  <p className="text-gray-400">Ans: After submitting your applications, you can log in to your account dashboard. Here, you'll find a section that lists your submitted applications along with their current statuses. The statuses may include accepted, rejected, or pending.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
