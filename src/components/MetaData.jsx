/* eslint-disable react/prop-types */
import Helmet from 'react-helmet'

export const MetaData = ({ title }) => {
  return (

    <Helmet>
      <title>{title}</title>
    </Helmet>

  )
}
