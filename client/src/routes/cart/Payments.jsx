import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export function Payments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let fn = async () => {
      let res = await fetch("http://localhost:5000/api/payments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      let result = await res.json();
      if (!res.ok) {
        setError(result.message);
        return;
      }
      setPayments(result);
    };
    fn();
  }, []);

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
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

        {payments.length > 0 ? (
          <Card className="p-6 rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold text-center">
                    Status
                  </th>
                  <th className="py-3 px-4 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted/20 transition"
                  >
                    <td className="py-3 px-4 font-medium">{payment.title}</td>
                    <td className="py-3 px-4">{payment.price} EGP</td>
                    <td className="py-3 px-4 text-center">
                      {payment.status === "Completed" && (
                        <Badge className="bg-green-500/80 text-white">
                          Completed
                        </Badge>
                      )}
                      {payment.status === "Pending" && (
                        <Badge className="bg-yellow-500/80 text-black">
                          Pending
                        </Badge>
                      )}
                      {payment.status === "Cancelled" && (
                        <Badge className="bg-red-500/80 text-white">
                          Cancelled
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(payment.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      {new Date(payment.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
