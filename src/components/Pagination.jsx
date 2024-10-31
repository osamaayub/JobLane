/* eslint-disable react/prop-types */
/* eslint-disable no-undef */


// eslint-disable-next-line no-unused-vars
const Pagination = ({ totalPosts, postsPerPage }) => {

  const [page, nbPages] = useGloba

  return (
    <>
      <div className='text-white'>
        <button onClick={() => getPrevPage()} >PREV</button>
        <p>
          {page} of {nbPages}
        </p>
        <button onClick={() => getNextPage()} ></button>
      </div>

    </>
  )
}
export default Pagination;
