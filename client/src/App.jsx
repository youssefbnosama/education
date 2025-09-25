import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Land } from "./routes/Land";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { Profile } from "./routes/Profile";
import { Account } from "./routes/Account";
import { Dashboard } from "./routes/dashboard/Dashboard";
import { AddCourse } from "./routes/dashboard/AddCourse";
import {ShowCourses} from "./routes/courses/showCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/addcourse" element={<AddCourse />} />
        <Route path="/courses/:sec" element={<ShowCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
