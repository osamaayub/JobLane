/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-no-undef */


import {
  About,
  Home,
  Jobs,
  Contact,
  MyProfile,
  AppliedJobs,
  SavedJobs,
  Login,
  ChangePassword,
  JobDetails,
  Register,
  EditProfile,
  DeleteAccount,
  Dashboard,
  CreateJob,
  ApplicationDetails,
  Application,
  ViewAllAppli,
  ViewAllJobAdmin,
  JobsLayout,
  ViewAllUsersAdmin,
  EditAppAdmin,
  EditUserAdmin,
  EditJobAdmin,
  NotFound,
  UnAuthorized,
  Test
} from "../pages";


import { Routes, Route, Outlet, useNavigate } from "react-router-dom";




const ProtectedRoute = ({ isAllowed, redirectPath = '/unauthorized', children }) => {
  const navigate = useNavigate();
  if (!isAllowed) {
    return <navigate to={redirectPath} path={<Login />} />;
  }

  return children ? children : <Outlet />
}



// Function to return routes
const AppRoutes = () => {
  const userRole = localStorage.getItem('role');

  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/jobs' element={<Jobs />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/details/:id' element={<JobDetails />} />

      <Route element={<ProtectedRoute isAllowed={['applicant', 'admin'].includes(userRole)} />}>
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/applied' element={<AppliedJobs />} />
        <Route path='/saved' element={<SavedJobs />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/editProfile' element={<EditProfile />} />
        <Route path='/deleteAccount' element={<DeleteAccount />} />
        <Route path='/JobsLayout' element={<JobsLayout />} />
        <Route path='/Application/:id' element={<Application />} />
        <Route path='/Application/Details/:id' element={<ApplicationDetails />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={userRole === "admin"} />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/postJob' element={<CreateJob />} />
        <Route path='/admin/allJobs' element={<ViewAllJobAdmin />} />
        <Route path='/admin/allApplications' element={<ViewAllAppli />} />
        <Route path='/admin/allUsers' element={<ViewAllUsersAdmin />} />
        <Route path='/admin/update/application/:id' element={<EditAppAdmin />} />
        <Route path='/admin/user/role/:id' element={<EditUserAdmin />} />
        <Route path='/admin/job/details/:id' element={<EditJobAdmin />} />
      </Route>

      {/* Test Route */}
      <Route path='/test' element={<Test />} />

      {/* Catch-All Routes */}
      <Route path='*' element={<NotFound />} />
      <Route path='/unauthorized' element={<UnAuthorized />} />
    </Routes>
  );
};

export default AppRoutes;
