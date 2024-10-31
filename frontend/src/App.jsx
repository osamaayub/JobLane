/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import {
  Navbar,
  Footer,
} from "./components";


import ScrollToTopWhenRouteChanges from "./components/ScrollToTopOnRouteChange";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { logOrNot, Me } from './actions/UserActions'

import { getAllJobs } from './actions/JobActions'
import AppRoutes from './routes';




const App = () => {

  const dispatch = useDispatch()


  const { isLogin } = useSelector(state => state.user)


  useEffect(() => {

    dispatch(Me());

  }, [dispatch, isLogin]);


  useEffect(() => {
    const LogOrNot = () => {
      dispatch(logOrNot());
      dispatch(getAllJobs())
    }
    LogOrNot()

  }, []);




  return (
    <>
      <ScrollToTopWhenRouteChanges />
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="mt-14 font-bold  "

      />
      <AppRoutes />

      <Footer />




    </>
  )
}
export default App;