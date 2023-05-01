import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

import './../css/landPage.css'

const LandPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="org">
      <header>
        <div className="btns">
          <Link to="/login">login</Link>
          <Link to="/create-user">createUser</Link>
        </div>
      </header>
      <div className="main">
        <div className="box-m">
          <h1>24/7 Live Chat Support</h1>
          <span onClick={() => setIsOpen((prevData) => !prevData)}>
            How use this online chat?
          </span>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/land.jpg`}
          alt="land page img"
          title="land page img"
        />
      </div>
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <div className="guide" >
            <MdClose
              className="close"
              onClick={() => setIsOpen(false)}
            />
            <h2>UID</h2>
            <span>
              3 type of this UID exists. you can choose two and login. if you
              whant new user you also can <Link to='/create-user' style={{borderBottom: '1px solid #2988ff', color: '#319fff'}}>create User</Link>.
            </span>
            <img
              src={`${process.env.PUBLIC_URL}/images/uid.png`}
              alt="guide to use app"
              title="guide to use app"
            />
            <h2>Login with the agent and user</h2>
            <span>
              In this example, we log in with the agent and user and start the
              chat.
            </span>
            <img
              src={`${process.env.PUBLIC_URL}/images/login.jpg`}
              alt="guide to use app"
              title="guide to use app"
            />
            <h2>Done!!!</h2>
            <span>Well done! You can now start the chat.</span>
            <img
              src={`${process.env.PUBLIC_URL}/images/answer-and-q.jpg`}
              alt="guide to use app"
              title="guide to use app"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LandPage
