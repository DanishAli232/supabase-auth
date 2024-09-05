"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import google from "@/public/auth-images/google.svg";
import apple from "@/public/auth-images/apple.svg";
import facebook from "@/public/auth-images/facebook.svg";
import twitter from "@/public/auth-images/twitter.svg";
import microsoft from "@/public/auth-images/microsoft.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(`Error signing up: ${error.message}`);
    else {
      alert("Account created successfully!");
      window.location.href = "/signin";
    }
    setIsLoading(false);
  };

  const handleOAuthSignUp = async (
    provider: "apple" | "facebook" | "google" | "twitter" | "azure"
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error)
      console.error(`Error signing up with ${provider}:`, error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-custom">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            {[
              { provider: "google", icon: google },
              { provider: "apple", icon: apple },
              { provider: "facebook", icon: facebook },
              { provider: "twitter", icon: twitter },
              { provider: "azure", icon: microsoft },
            ].map(({ provider, icon }) => (
              <Button
                key={provider}
                variant="outline"
                onClick={() =>
                  handleOAuthSignUp(
                    provider as
                      | "google"
                      | "apple"
                      | "facebook"
                      | "twitter"
                      | "azure"
                  )
                }
              >
                <Image src={icon} width={16} height={16} alt={provider} />
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-center my-4">
            <Separator className="flex-grow-[-1]  shrink-[-1]" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <Separator className="flex-grow-[-1]  shrink-[-1]" />
          </div>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
