import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import SignUp  from "./pages/AuthPage/SignUp"
import PageLayout from "./layout/PageLayout"
import Login from "./pages/AuthPage/Login"
import Reset from "./pages/AuthPage/Reset"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import Explore from "./pages/Explore/Explore"
import EditProfile from "./components/Profile/EditProfile"
import UserProfilePage from "./pages/ProfilePage/UserProfilePage"
import Messages from "./pages/Messages/Messages"
import PublicRoute from "./components/Routes/PublicRoute"
import PrivateRoute from "./components/Routes/PrivateRoute"

// import Search from "./components/Sidebar/Search"
function App() {
 

  return (
    <>
    <PageLayout>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}  />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/reset" element={<PublicRoute><Reset /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/explore" element={<PrivateRoute> <Explore /> </PrivateRoute>} />
        <Route path="/profile/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/user/:userId" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
        <Route path='/messages' element={<PrivateRoute><Messages /></PrivateRoute>} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </PageLayout>
    </>
  )
}

export default App
