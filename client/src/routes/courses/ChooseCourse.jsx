import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ChooseCourse() {
  let src =
    "https://www.bostonind.com/image/cache/catalog/1%20-%20Blog/Atoms%20and%20Elements%20The%20Building%20Blocks%20of%20Matter-1600x1200w.png.webp";
  let arr = ["sec-1", "sec-2", "sec-3"];
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      {/* Animated background circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10"
      />
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-accent/15"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-secondary/20"
      />
      {/* Page content */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {arr.map((e, index) => (
          <Card
            key={index}
            className="p-6 flex flex-col items-center justify-center text-center shadow-lg rounded-2xl hover:shadow-xl transition"
            onClick={() => navigate(e)}
          >
            <CardContent className="flex flex-col items-center">
              {/* صورة خاصة بالكارد */}
              <img
                src={src}
                alt={`${e} Banner`}
                className="rounded-xl shadow-md mb-4 w-full object-cover"
              />

              <p className="mb-4 text-lg font-medium">
                From here to see {e} courses
              </p>
              <Button className="w-full">Go to {e}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
