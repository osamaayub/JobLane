/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect ,lazy,Suspense} from 'react';
const Navbar=lazy(()=>import('./components/Navbar'));
const Footer=lazy(()=>import('./components/Footer'));
import { ErrorBoundary } from "react-error-boundary";


import ScrollToTopWhenRouteChanges from "./components/ScrollToTopOnRouteChange";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { logOrNot, Me } from './actions/UserActions'

import { getAllJobs } from './actions/JobActions'
import AppRoutes from './routes';





const FallBackComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-20 text-center text-red-500">
      <p>
        {error.message}
      </p>
      <button onClick={resetErrorBoundary} className="p-10 mt-10">
        Reload Page
      </button>
    </div>
  );
};



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
      <ErrorBoundary fallback={<FallBackComponent/>}
      onError={()=>console.log("Unexpected Error Occured")}
      >
      <Suspense fallback={<div>Loading...</div>}>
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
          className="mt-14 font-bold"

        />
        <AppRoutes />

        <Footer />
        </Suspense>
      </ErrorBoundary>




    </>
  )
}
export default App;