import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import SignUp  from "./pages/AuthPage/SignUp"
import PageLayout from "./layout/PageLayout"
import Login from "./pages/AuthPage/Login"
import Reset from "./pages/AuthPage/Reset"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import Explore from "./pages/Explore/Explore"
import EditProfile from "./components/Profile/EditProfile"

// import Search from "./components/Sidebar/Search"
function App() {
 

  return (
    <>
    <PageLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/explore" element={ <Explore />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </PageLayout>
    </>
  )
}

export default App
