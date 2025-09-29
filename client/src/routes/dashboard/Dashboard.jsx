import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export  function Dashboard() {
    const navigate = useNavigate()
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-6">
      {/* Teacher Name */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-indigo-700 text-center mb-10"
      >
        Welcome, Mr. Ahmed
      </motion.h1>

      {/* Dashboard Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        {[
          { label: "Add a course" , navigation:"addcourse"},
          { label: "Delete a course" , navigation:"deletecourse"},
          { label: "Add  a week" , navigation:"addweek/courses"},
          { label: "modify a week" , navigation:"modifyweek"},
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button onClick={()=>{navigate(item.navigation)}} className="w-full py-6 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg">
              {item.label}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Floating animated balls */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
}
