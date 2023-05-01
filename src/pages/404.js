import { Link } from 'react-router-dom'

import './../css/404.css'

const Page404 = () => {
  return (
    <div>
      <div className="box404">
        <img
          src={`${process.env.PUBLIC_URL}/images/404.png`}
          alt="Page 404"
          title="Page 404"
        />
        <h1>This page could not be found.</h1>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default Page404
