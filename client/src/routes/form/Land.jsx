"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function Land() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    let fun = async () => {
      try {
        let res = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        })
          let result = await res.json()
        if (result.username) {
          console.log("hello");
          navigate("/profile");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-accent/15 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 rounded-full bg-secondary/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-primary/5 animate-bounce"></div>

        {/* Physics formulas as decorative elements */}
        <div className="absolute top-32 right-1/4 text-muted-foreground/20 text-2xl font-mono rotate-12">
          E = mc²
        </div>
        <div className="absolute bottom-40 left-1/4 text-muted-foreground/20 text-xl font-mono -rotate-12">
          F = ma
        </div>
        <div className="absolute top-1/2 left-10 text-muted-foreground/20 text-lg font-mono rotate-45">
          v = λf
        </div>
        <div className="absolute top-1/3 right-10 text-muted-foreground/20 text-lg font-mono -rotate-30">
          P = IV
        </div>
        <div className="absolute bottom-1/3 right-1/3 text-muted-foreground/20 text-sm font-mono rotate-15">
          ΔE = hf
        </div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-spin"></div>
              <div
                className="absolute inset-2 rounded-full border-2 border-accent animate-spin"
                style={{ animationDirection: "reverse" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Physics Lectures
            </h1>
          </div>
          <p className="text-muted-foreground text-lg mb-2">
            Unlock the mysteries of the universe through interactive learning
          </p>
          <p className="text-primary font-semibold text-xl">
            with Dr. Einstein
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 shadow-2xl border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary mb-2">
              Welcome to Physics Lectures
            </CardTitle>
            <CardDescription className="text-lg">
              Explore the fundamental laws that govern our universe. From
              quantum mechanics to relativity, embark on a journey through the
              most fascinating concepts in physics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Physics topics showcase */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-2xl mb-2">⚛️</div>
                <div className="text-sm font-medium text-primary">
                  Quantum Physics
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-2xl mb-2">🌌</div>
                <div className="text-sm font-medium text-accent">
                  Relativity
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium text-secondary">
                  Electromagnetism
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-2xl mb-2">🔬</div>
                <div className="text-sm font-medium text-primary">
                  Mechanics
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSignup}
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              >
                🚀 Sign Up & Start Learning
              </Button>
              <Button
                onClick={handleLogin}
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-105 bg-transparent"
              >
                🔬 Login to Continue
              </Button>
            </div>

            {/* Features list */}
            <div className="mt-8 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Interactive Simulations
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Video Lectures
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Problem Solving
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">
            Discover the beauty of physics • From quantum mechanics to
            relativity
          </p>
        </div>
      </div>
    </div>
  );
}
