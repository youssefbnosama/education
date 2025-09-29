import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function CartPage() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let fn = async () => {
      let res = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      let result = await res.json();
      if (!res.ok) {
        setError(result.message);
        return;
      }
      setCart(result.courses);
    };
    fn();
  }, []);

  let payFunction = async (course) => {
    let res = await fetch("http://localhost:5000/api/payorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(course),
    });
    let result = await res.json();
    if (!res.ok) {
      console.log(result);
      return;
    }
    window.location.reload();
  };

  let declineFunction = async (course) => {
    let res = await fetch("http://localhost:5000/api/declineorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(course),
    });
    let result = await res.json();
    if (!res.ok) {
      console.log(result);
      return;
    }
    window.location.reload();
  };
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
      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

        {cart.length > 0 ? (
          <Card className="p-6 rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((course, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted transition"
                  >
                    <td className="py-3 px-4 font-medium">{course.title}</td>
                    <td className="py-3 px-4">{course.price}</td>
                    <td className="py-3 px-4 flex gap-2 justify-center">
                      <Button
                        onClick={() => payFunction(course)}
                        variant="default"
                        size="sm"
                      >
                        Pay
                      </Button>
                      <Button
                        onClick={() => declineFunction(course)}
                        variant="destructive"
                        size="sm"
                      >
                        Decline
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pay all button */}
            <div className="mt-6 flex justify-end">
              <Button size="lg" className="px-6">
                Pay All: {cart.reduce((a, b) => a + +b.price, 0)}
              </Button>
            </div>
          </Card>
        ) : (
          <div className="text-center text-lg text-muted-foreground mt-10">
            No courses you've bought yet. Start exploring and add some to your
            cart!
          </div>
        )}
      </div>
    </div>
  );
}
