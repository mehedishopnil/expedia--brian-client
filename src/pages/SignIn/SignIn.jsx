import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800 mb-2">
        Sign in or create an account
      </h1>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">
        Unlock a world of rewards with one account across Expedia, Hotels.com, and Vrbo.
      </p>

      {/* Google Sign-In Button */}
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 mb-4 hover:bg-gray-50 transition-colors">
        <FcGoogle className="text-xl" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>

      {/* Divider with "or" */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Email Input Field */}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Continue Button */}
      <button className="w-full bg-blue-600 text-white font-semibold rounded-lg p-3 hover:bg-blue-700 transition-colors">
        Continue
      </button>

      {/* Other Ways to Sign In */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-4">Other ways to sign in</p>
        <div className="flex justify-center gap-4">
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <FaApple className="text-xl text-gray-700" />
          </button>
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <FaFacebook className="text-xl text-blue-600" />
          </button>
        </div>
      </div>

      {/* Terms and Conditions Paragraph */}
      <p className="mt-6 text-center text-xs text-gray-500">
        By continuing, you have read and agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms and Conditions
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Statement
        </a>
        , and{" "}
        <a href="#" className="text-blue-600 hover:underline">
          One Key Rewards Terms & Conditions
        </a>
        .
      </p>
    </div>
  );
};

export default SignIn;