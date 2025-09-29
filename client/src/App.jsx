import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Land } from "./routes/Land";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { Profile } from "./routes/Profile";
import { Account } from "./routes/Account";
import { Dashboard } from "./routes/dashboard/Dashboard";
import { AddCourse } from "./routes/dashboard/AddCourse";
import {ShowCourses} from "./routes/courses/showCourses";
import { ChooseCourse } from "./routes/courses/ChooseCourse";
import { CartPage } from "./routes/cart/Cart";
import { Payments } from "./routes/cart/Payments";
import { ShowCoursesToDash } from "./routes/dashboard/addWeek/showCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/courses" element={<ChooseCourse />} />
        <Route path="/dashboard/addweek/courses" element={<ChooseCourse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/dashboard/addcourse" element={<AddCourse />} />
        <Route path="/courses/:sec" element={<ShowCourses />} />
        <Route path="/dashboard/addweek/courses/:sec" element={<ShowCoursesToDash />} />
      </Routes>
    </Router>
  );
}

export default App;
