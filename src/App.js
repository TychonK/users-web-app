import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Loader from 'react-loader-spinner'

import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store'

import { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from './redux/authActions'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppBar = lazy(() => import('./components/Navigation/AppBar'))
const NotFound = lazy(() => import('./components/Not_Found/NotFound'))
const HomePage = lazy(() => import('./components/Home/HomePage'))
const Users = lazy(() => import('./components/Users'))
const Register = lazy(() => import('./components/Register/Register'))
const Login = lazy(() => import('./components/LogIn/Login'))

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(state => state.userReducer.isFetchingCurrentUser)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    !isFetchingCurrentUser && (
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loader className="fallback-loader" />}>
        <BrowserRouter>
          <AppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/register" element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            } />
              
            <Route path="/login" element={
              <PublicRoute restricted>
                <Login />
              </PublicRoute>
            } />

            <Route path="/users" element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </PersistGate> )
    )
}

export default App