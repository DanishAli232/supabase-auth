import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import google from "@/public/auth-images/google.svg";
import apple from "@/public/auth-images/apple.svg";
import facebook from "@/public/auth-images/facebook.svg";
import twitter from "@/public/auth-images/twitter.svg";
import microsoft from "@/public/auth-images/microsoft.svg";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

// New Error component
const ErrorMessage = ({ message }: { message: string }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const Form = ({
  error,
  handleOAuthSignUp,
  handleSignUser,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
}: {
  error: string | null;
  handleOAuthSignUp: (
    provider: "apple" | "facebook" | "google" | "twitter" | "azure"
  ) => void;
  handleSignUser: (e: React.FormEvent) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  return (
    <CardContent className="space-y-4">
      {error && <ErrorMessage message={error} />}
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

      <div className="flex items-center justify-center my-8 !mt-[27px]">
        <Separator className="flex-grow-[-1]  shrink-[-1]" />
        <span className="px-4 text-sm text-gray-500">or</span>
        <Separator className="flex-grow-[-1]  shrink-[-1]" />
      </div>
      <form onSubmit={handleSignUser} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            aria-required="true"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
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
        <Button
          type="submit"
          className="w-full !mt-[24px]"
          disabled={isLoading}
        >
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
  );
};

export default Form;
