import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { email });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F5DCF7] flex items-center justify-center">
      <div className="w-full max-w-5xl flex items-center justify-between px-16 gap-12">
        {/* Login Form */}
        <div className="w-[460px] bg-[#E5D0E6] p-12 rounded-3xl shadow-lg">
          <h1 className="text-4xl font-['DM_Sans'] text-[#856787] mb-8">
            Login to AskHer
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xl text-[#856787] font-['DM_Sans']">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-lg bg-white border-none text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xl text-[#856787] font-['DM_Sans']">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-lg bg-white border-none text-lg"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-8 bg-[#856787] hover:bg-[#6d566e] text-white text-xl rounded-lg font-['DM_Sans']"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Illustration */}
        <div className="flex-shrink-0">
          <img
            src="/image.png"
            alt="Cute otters illustration"
            className="w-[500px] h-[500px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login; 