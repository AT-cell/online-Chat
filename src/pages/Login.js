import { Fragment, useState } from 'react'
import { Formik, Form } from 'formik'
import { GrUserAdmin } from 'react-icons/gr'
import { CometChat } from '@cometchat-pro/chat'
import { Link, useNavigate } from 'react-router-dom'

import './../css/form.css'
import Input from './../components/input'
import Spinner from '../components/spinner/index'
import { Validation } from '../Yup/LoginInput'
import { AUTH_KEY } from '../constants/constants'

// initial state //
const Infos = {
  userId: '',
}
const err = {
  error: false,
  message: '',
}
const suc = {
  success: false,
  message: '',
}

const Login = () => {
  // state
  const [success, setSuccess] = useState(suc)
  const [error, setError] = useState(err)
  const [spinner, setSpinner] = useState(false)
  const [data, setData] = useState(Infos)
  const { userId } = data
  const authKey = AUTH_KEY
  const navigate = useNavigate()

  // callback handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ [name]: value })
  }

  const Submithandle = (e) => {
    setSpinner(true)
    setError({ error: false, message: '' })
    setSuccess({ success: false, message: '' })

    CometChat.login(data.userId, authKey)
      .then((user) => {
        setSpinner(false)
        setSuccess({ success: true, message: 'User logged in successfully.' })
        setError({ error: false, message: '' })
        setTimeout(() => {
          return navigate('/chat')
        }, 900)
      })
      .catch((err) => {
        setSuccess({ success: false, message: '' })
        setSpinner(false)
        if (err.code === 'ERR_UID_NOT_FOUND') {
          setError({
            error: true,
            message:
              'The UID agentt does not exist, please make sure you have created a user with UID agentt.',
          })
        }
        if (err.code === 'FAILED_TO_FETCH') {
          setError({
            error: true,
            message: 'Please check your internet connection.',
          })
        }
      })
  }
  // jsx
  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={{
          userId,
        }}
        validationSchema={Validation}
        onSubmit={(e) => {
          Submithandle(e)
        }}
      >
        {(formik) => (
          <Form className="input_box">
            <div className="container">
              <div className="box">
                <Input
                  icon={<GrUserAdmin />}
                  onChange={handleChange}
                  type="text"
                  name="userId"
                />
                  <Link className='link' to='/create-user'>
                    Don’t have an uID? Create uID.
                  </Link>
                <button type="submit" className="form_btn">
                  Login
                </button>
                {spinner && (
                  <div className="center">
                    <Spinner
                      color="#2782ff"
                      loading={spinner}
                      size={15}
                      overlay={false}
                      className="spinner"
                    />
                  </div>
                )}
                {error.error && (
                  <span className="err-msg">{error.message}</span>
                )}
                {success.success && (
                  <span className="suc-msg">{success.message}</span>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default Login
