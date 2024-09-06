"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Form from "@/components/ui/auth/form";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.session) {
      // Session is created immediately after signup
      window.location.href = "/";
    } else {
      // This case should not occur if email verification is not used
      setError("An unexpected error occurred. Please try signing in.");
    }
    setIsLoading(false);
  };

  const handleOAuthSignUp = async (
    provider: "apple" | "facebook" | "google" | "twitter" | "azure"
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(error.message);
    }
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
        <Form
          error={error}
          handleOAuthSignUp={handleOAuthSignUp}
          handleSignUser={handleSignUp}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isLoading={isLoading}
        />
        <CardFooter className="justify-center pt-4 pb-6 bg-gray-50 border-t  rounded-bl-[14px] rounded-br-[14px] ">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className=" font-semibold hover:underline ">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
