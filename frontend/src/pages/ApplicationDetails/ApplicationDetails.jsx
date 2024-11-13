import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { MetaData } from '../../components/MetaData';
import { getSingleApplication, deleteApplication } from '../../actions/ApplicationActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const ApplicationDetails = () => {
    const { applicationDetails, loading, error } = useSelector((state) => state.application);
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
    }, [dispatch, id]);

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
            <div className="bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white">
                {loading ? <Loader /> :(
                <div>
                    <div className="py-3 text-2xl md:text-4xl">Application #{id}</div>

                    <div className="pt-4 pb-3">
                        <p className="text-2xl pb-2">Job Details:</p>
                        <div>
                            <ul>
                                <li className="flex gap-4 items-center">Role: <div>{applicationDetails.job?.title || "N/A"}</div></li>
                                <li className="flex gap-4 items-center">Company: <div>{applicationDetails.job?.companyName || "N/A"}</div></li>
                                <li className="flex gap-4 items-center">Location: <div>{applicationDetails.job?.location || "N/A"}</div></li>
                                <li className="flex gap-4 items-center">Experience: <div>{applicationDetails.job?.experience || "N/A"}</div></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-4 pb-6">
                        <p className="text-2xl pb-2">Applicant Details:</p>
                        <div>
                            <ul>
                                <li className="flex gap-4 items-center">Name: <div>{applicationDetails.applicant?.name}</div></li>
                                <li className="flex gap-4 items-center">Email: <div>{applicationDetails.applicant?.email}</div></li>
                                <li className="flex gap-4 items-center">Resume: <Link to={applicationDetails.applicantResume?.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-blue-500 underline cursor-pointer">
                                    {applicationDetails.applicant?.name}
                                </Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-2 pb-2">
                        <div className="flex gap-3 items-center text-xl">
                            Status: <span className={`${applicationDetails.status === "pending" ? "text-blue-600" : applicationDetails.status === "rejected" ? "text-red-600" : "text-green-600"} font-medium`}>
                                {toUpperFirst(applicationDetails.status)}
                            </span>
                        </div>
                    </div>

                    <div className="pt-2 pb-2">
                        <div className="flex gap-3 items-center text-xl">
                            Application Created At: {applicationDetails.createdAt ? `${convertDateFormat(applicationDetails.createdAt.substr(0, 10))} on ${extractTime(applicationDetails.createdAt)}` : "N/A"}
                        </div>
                    </div>

                    <div className="py-4 pb-40">
                        <button onClick={deleteApplicationHandler} className="bg-red-600 hover:bg-red-800 py-2.5 text-sm px-8 font-medium">
                            Delete Application
                        </button>
                    </div>
                </div>
                )};
            </div>
        </>
    );
};

export default ApplicationDetails;
