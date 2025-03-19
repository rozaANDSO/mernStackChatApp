import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext' // Assuming this is your context
import Home from './page/home/Home'
import Login from './page/login/Login'
import SingUp from './page/singup/SingUp'
const App = () => {
  const { authUser } = useAuthContext() // Use your context to get authUser
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* Home page accessible only if the user is logged in */}
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/signup" />}
        />
        {/* Login page accessible only if the user is not logged in */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        {/* Signup page accessible only if the user is not logged in */}
        <Route
          path="/signup"
          element={!authUser ? <SingUp /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  )
}
export default App
