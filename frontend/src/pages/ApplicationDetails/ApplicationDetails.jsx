import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { MetaData } from '../../components/MetaData';
import { getSingleApplication, deleteApplication } from '../../actions/ApplicationActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const ApplicationDetails = () => {
    const { applicationDetails, loading } = useSelector((state) => state.application);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const deleteApplicationHandler = () => {
        dispatch(deleteApplication(id));
        navigate("/applied");
    };

    useEffect(() => {
        if (id) {
            dispatch(getSingleApplication(id));
        }
    },[id]);

    const toUpperFirst = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);

    const convertDateFormat = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length !== 3) return "Invalid date format";

        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
    };

    function extractTime(inputString) {
        const dateTimeObj = new Date(inputString);
        const hours = dateTimeObj.getHours();
        const minutes = dateTimeObj.getMinutes();
        const seconds = dateTimeObj.getSeconds();
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;

        return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    }

    
    return (
        <>
            <MetaData title="Application Details" />
            <div className="bg-gray-900 min-h-screen pt-14 md:px-20 px-3 text-white">
                {loading ? <Loader /> : (
                    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="py-3 text-3xl md:text-4xl font-semibold border-b border-gray-700 mb-6">Application #{id}</div>

                        <div className="pb-6">
                            <p className="text-2xl pb-2 font-medium">Job Details:</p>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <ul className="space-y-2">
                                    <li className="flex gap-4 items-center">Role: <div className="font-light">{applicationDetails.job?.title}</div></li>
                                    <li className="flex gap-4 items-center">Company: <div className="font-light">{applicationDetails.job?.companyName}</div></li>
                                    <li className="flex gap-4 items-center">Location: <div className="font-light">{applicationDetails.job?.location}</div></li>
                                    <li className="flex gap-4 items-center">Experience: <div className="font-light">{applicationDetails.job?.experience}</div></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pb-6">
                            <p className="text-2xl pb-2 font-medium">Applicant Details:</p>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <ul className="space-y-2">
                                    <li className="flex gap-4 items-center">Name: <div className="font-light">{applicationDetails.applicant?.name}</div></li>
                                    <li className="flex gap-4 items-center">Email: <div className="font-light">{applicationDetails.applicant?.email}</div></li>
                                    <li className="flex gap-4 items-center">Resume: <Link to={applicationDetails.applicantResume?.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-blue-400 underline">
                                        {applicationDetails.applicant?.name}
                                    </Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pb-6">
                            <div className="flex gap-3 items-center text-xl">
                                Status: <span className={`${applicationDetails.status === "pending" ? "text-blue-500" : applicationDetails.status === "rejected" ? "text-red-500" : "text-green-500"} font-medium`}>
                                    {toUpperFirst(applicationDetails.status)}
                                </span>
                            </div>
                        </div>

                        <div className="pb-6">
                            <div className="flex gap-3 items-center text-xl">
                                Application Created At: {applicationDetails.createdAt ? `${convertDateFormat(applicationDetails.createdAt.substr(0, 10))} on ${extractTime(applicationDetails.createdAt)}` : "N/A"}
                            </div>
                        </div>

                        <div className="py-4">
                            <button onClick={deleteApplicationHandler} className="bg-red-600 hover:bg-red-700 py-2.5 text-sm px-8 font-medium rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                Delete Application
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ApplicationDetails;
