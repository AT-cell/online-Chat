import { Form, Formik } from 'formik'
import React, { Fragment, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi2'
import { GrUserAdmin } from 'react-icons/gr'
import { CometChat } from '@cometchat-pro/chat'
import { Link, useNavigate } from 'react-router-dom'

import Input from '../components/input'
import { Validation } from '../Yup/CreateUserInput'
import { AUTH_KEY } from '../constants/constants'
import Spinner from './../components/spinner/index'
import './../css/form.css'

const Infos = {
  userId: '',
  name: '',
}

const err = {
  error: false,
  message: '',
}
const suc = {
  success: false,
  message: '',
}
const CreateUser = () => {
  const [success, setSuccess] = useState(suc)
  const [error, setError] = useState(err)
  const [data, setData] = useState(Infos)
  const [spinner, setSpinner] = useState(false)
  const { userId, name } = data
  const authKey = AUTH_KEY
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const Submithandle = (e) => {
    // e.preventDefault()
    setSpinner(true)
    setError({ error: false, message: '' })
    setSuccess({ success: false, message: '' })
    const user = new CometChat.User(userId)
    user.setName(name)
    CometChat.createUser(user, authKey)
      .then((user) => {
        setSuccess({ success: true, message: 'User created successfully.' })
        setError({ error: false, message: '' })
        setSpinner(false)
        setTimeout(() => {
          return navigate('/login')
        }, 900)
      })
      .catch((err) => {
        console.log(err)
        setSpinner(false)
        setSuccess({ success: false, message: '' })
        if (err.code === 'ERR_UID_ALREADY_EXISTS') {
          return setError({
            error: true,
            message: 'The uid user already exists. Please use another uid.',
          })
        }
        if (err.code === 'FAILED_TO_FETCH') {
          return setError({
            error: true,
            message: 'Please check your internet connection.',
          })
        }
      })
  }

  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={{
          userId,
          name,
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
                <Input
                  icon={<HiOutlineUser />}
                  onChange={handleChange}
                  type="text"
                  name="name"
                />
                  <Link className='link' to='/login'>
                  Already have an account? Log in.
                  </Link>
                <button type="submit" className="form_btn">
                  Create User
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

export default CreateUser
