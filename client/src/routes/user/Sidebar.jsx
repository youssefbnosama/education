import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Sidebar() {
  const navigate = useNavigate();
  const navigations = ["profile","account", "courses", "grades","cart","cart/payments"];

  return (
    <motion.aside
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-64 p-4 relative z-10"
    >
      <Card className="h-full shadow-xl bg-gradient-to-b from-indigo-600 to-purple-600 text-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-lg">
            {["Profile","Your Account", "Courses", "Grades","Cart","Payments"].map(
              (item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 6 }}
                  className="cursor-pointer hover:text-primary transition"
                  onClick={() => {
                    navigate(`/${navigations[idx]}`);
                  }}
                >
                  {item}
                </motion.li>
              )
            )}
          </ul>
        </CardContent>
      </Card>
    </motion.aside>
  );
}
