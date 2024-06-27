import {BrowserRouter,Route,Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import { Edit } from "./pages/Edit";
import { EditBlog } from "./pages/EditBlog";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/" element={<Blogs/>}/>
      <Route path="/publish" element={<Publish/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/edit-profile" element={<Edit/>}/>
      <Route path="/editBlog/:id" element={<EditBlog/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
