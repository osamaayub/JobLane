/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import {
  Navbar,
  Footer,
} from "./components";
import { ErrorBoundary } from "react-error-boundary";


import ScrollToTopWhenRouteChanges from "./components/ScrollToTopOnRouteChange";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { logOrNot, Me } from './actions/UserActions'

import { getAllJobs } from './actions/JobActions'
import AppRoutes from './routes';





const FallBackComponent = ({ error, resetErrorBoundary }) => {
  <div className='p-20 text-center text-red-500'>
    <pre>
      {error.message}
      <button onClick={resetErrorBoundary}
      className="p-10 mt-10">Try Again</button>
    </pre>
  </div>

}


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
      <ErrorBoundary fallback={<FallBackComponent/>}>
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
      </ErrorBoundary>




    </>
  )
}
export default App;