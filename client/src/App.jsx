import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Land } from "./routes/form/Land";
import { Signup } from "./routes/form/Signup";
import { Login } from "./routes/form/Login";
import { Profile } from "./routes/user/Profile";
import { Account } from "./routes/user/Account";
import { Dashboard } from "./routes/dashboard/Dashboard";
import { AddCourse } from "./routes/dashboard/AddCourse";
import { ShowCourses } from "./routes/courses/showCourses";
import { ChooseCourse } from "./routes/courses/ChooseCourse";
import { CartPage } from "./routes/cart/Cart";
import { Payments } from "./routes/cart/Payments";
import { ShowCoursesToDash } from "./routes/dashboard/addWeek/showCourses";
import { AddWeek } from "./routes/dashboard/addWeek/Addweek";
import { Week } from "./routes/weeks/Week";
import { AddContent } from "./routes/dashboard/addContent/AddContent";
import { QuestionsPage } from "./routes/quizs/QuestionPage";
import { Grades } from "./routes/grades/Grades";
import { QuizResultPage } from "./routes/grades/QuizReveal";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Land />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />

        {/* Courses routes */}
        <Route path="/courses" element={<ChooseCourse />} />
        <Route path="/courses/:sec" element={<ShowCourses />} />
        <Route path="/courses/:sec/:courseid" element={<Week />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/addcourse" element={<AddCourse />} />
        <Route path="/dashboard/addweek/courses" element={<ChooseCourse />} />
        <Route
          path="/dashboard/addcontent/courses"
          element={<ChooseCourse />}
        />
        <Route
          path="/dashboard/addweek/courses/:sec"
          element={<ShowCoursesToDash />}
        />
        <Route
          path="/dashboard/addcontent/courses/:sec"
          element={<ShowCoursesToDash />}
        />
        <Route
          path="/dashboard/addweek/courses/:sec/:courseid"
          element={<AddWeek />}
        />
        <Route
          path="/dashboard/addcontent/courses/:sec/:courseid/"
          element={<Week fromDash={true} />}
        />
        <Route
          path="/dashboard/addcontent/courses/:sec/:courseid/:weekid"
          element={<AddContent />}
        />

        {/* Cart routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/payments" element={<Payments />} />

        <Route
          path="/weeks/:weekid/openquiz/:quizid"
          element={<QuestionsPage />}
        />
        {/*Grades*/}
        <Route path="/grades" element={<Grades />} />
        <Route path="/grades/:gradeid" element={<QuizResultPage />} />
      </Routes>
    </Router>
  );
}
export default App;
