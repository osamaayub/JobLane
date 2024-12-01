/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { MetaData } from '../../components/MetaData'
import Sidebar from '../../components/Sidebar'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai';
import { getAllUsersAdmin, deleteUser } from '../../actions/AdminActions'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/Loader'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'


const ViewAllUsersAdmin = () => {

  const dispatch = useDispatch()
  const { loading, allUsers } = useSelector(state => state.admin)
  const [sideTog, setSideTog] = useState(false)

  useEffect(() => {
    dispatch(getAllUsersAdmin())
  }, [])

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    if (isNaN(date)) {
      return "Invalid date format";
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <MetaData title="All Users" />
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {loading ? (
          <Loader />
        ) : (
          <div className="relative">
            <div className="pt-1 fixed left-0 z-20 pl-0">
              <div onClick={() => setSideTog(!sideTog)} className='cursor-pointer blueCol px-3 py-2' size={44} >
                {!sideTog ? "Menu" : <RxCross1 />}
              </div>
            </div>

            <Sidebar sideTog={sideTog} />
            <div className="text-center pt-3 pb-4">
              <p className='text-3xl font-medium'>All Users</p>
            </div>

            <div className="relative pb-10 overflow-x-auto shadow-md rounded-lg bg-gray-800">
              <table className="w-full text-sm text-left text-white">
                  <thead className="text-xs text-gray-200 uppercase bg-blue-600">
                  <tr>
                    <th scope="col" className="px-6 py-3">User Id</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                    <th scope="col" className="px-6 py-3">Created On</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers && allUsers
                    .filter(user => user._id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((user, i) => (
                      <tr key={i} className="border-b hover:bg-gray-700 bg-gray-800 border-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                          {user._id}
                        </th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                          {convertDateFormat(user.createdAt)}
                        </td>
                        <td className="px-6 flex gap-4 py-4">
                          <Link to={`/admin/user/role/${user._id}`} className='text-blue-500 hover:text-blue-400 cursor-pointer flex justify-center items-center'>
                            <MdOutlineModeEditOutline size={20} />
                          </Link>
                          <span onClick={() => deleteUserHandler(user._id)} className='text-red-500 hover:text-red-400 cursor-pointer flex justify-center items-center'>
                            <AiOutlineDelete size={20} />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ViewAllUsersAdmin;
