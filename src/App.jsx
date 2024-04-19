import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyBlogs } from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditBlogForm from "./pages/EditBlogForm";

function App () {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/create-blog" element={ <CreateBlog /> }></Route>
        <Route path="/my-blogs" element={ <MyBlogs /> }></Route>
        <Route path="/edit-blog/:id" element={ <EditBlogForm /> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
