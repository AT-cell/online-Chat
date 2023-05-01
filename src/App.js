import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CometChat } from '@cometchat-pro/chat'

import * as CONSTANTS from './constants/constants'
import Spinner from './components/spinner'
import './css/App.css'

const CreateUser = lazy(() => import('./pages/CreateUser'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const LandPage = lazy(() => import('./pages/LandPage'))
const Page404 = lazy(() => import('./pages/404'))

const appSettings = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(CONSTANTS.APP_REGION)
  .build()
CometChat.init(CONSTANTS.APP_ID, appSettings).then(
  () => {
    console.log('Initialization completed successfully')
  },
  (error) => {
    console.log('Initialization failed with error:', error)
  },
)

const App = () => {
  return (
    <Suspense fallback={<Spinner color="#2782ff" loading={true} size={25} />}>
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

export default App
