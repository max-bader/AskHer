import React from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-10">
          <h1 className="text-8xl font-['DM_Sans'] font-bold text-[#6c5a7c] mb-4">Wisdom</h1>
          <h1 className="text-8xl font-['DM_Sans'] font-bold text-[#6c5a7c] mb-8">Wall</h1>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto space-y-2">
            <p>A growing garden of anonymous support and reflection.</p>
            <p>
              Explore advice, comfort, and <span className="text-pink-500">real</span> stories left by others
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search the wall" 
              className="pl-10 py-6 bg-white rounded-lg border-gray-200"
            />
          </div>
          <Button 
            variant="outline" 
            className="py-6 px-8 bg-white rounded-lg border-gray-200 text-gray-600 flex items-center gap-2"
          >
            Tags | Filters <ChevronDown className="h-4 w-4" />
          </Button>
          <Link 
            to="/comfort" 
            className="py-6 px-8 rounded-lg bg-[#6c5a7c] text-white hover:bg-[#5d4c6d] flex items-center gap-2"
          >
            ComfortHer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Someone wrote:</p>
              <p className="text-lg">"I'm the only woman on my team and I'm scared to speak up in meetings."</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button className="text-sm text-gray-500 hover:text-[#6c5a7c]">[ Send a heart ]</button>
                <button className="text-sm text-gray-500 hover:text-[#6c5a7c]">[ Comment ]</button>
              </div>
              <div className="text-sm text-gray-500">
                Sent 3 days ago | ❤️ 38
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Someone said:</p>
              <p className="text-lg">"I feel like I'm not smart enough to be in this program. Everyone else seems to get it but me."</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button className="text-sm text-gray-500 hover:text-[#6c5a7c]">[ Send a heart ]</button>
                <button className="text-sm text-gray-500 hover:text-[#6c5a7c]">[ Comment ]</button>
              </div>
              <div className="text-sm text-gray-500">
                <span className="mr-2">#impostersyndrome</span>
                Sent 1 day ago | ❤️ 72
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Someone said:</p>
              <p className="text-lg">"My partner makes subtle comments about my appearance that hurt. Am I being too sensitive?"</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button className="text-sm text-gray-500 hover:text-[#6c5a7c]">[ Send a heart ]</button>
                <button className="text-sm text-gray-500 hover:text-[#6c5a7c]">[ Comment ]</button>
              </div>
              <div className="text-sm text-gray-500">
                <span className="mr-2">#relationships</span>
                Sent 2 days ago | ❤️ 64
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
