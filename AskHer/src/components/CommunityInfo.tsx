import React from "react";
import { Shield, Users, Cake, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CommunityInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-12"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-bold text-base">About AskHer</h2>
          <InfoIcon className="h-4 w-4 text-gray-400" />
        </div>

        <p className="text-sm text-gray-700 mb-4">
          A safe, anonymous space where women can seek support, share wisdom,
          and build a community of mutual respect and understanding.
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Cake className="h-5 w-5 text-gray-500" />
            <div>
              <p>Created Mar 8, 2023</p>
              <p className="text-xs text-gray-500">International Women's Day</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <div>
              <p>12.8k members</p>
              <p className="text-xs text-gray-500">548 online now</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-500" />
            <div>
              <p>Strictly Moderated</p>
              <p className="text-xs text-gray-500">Safe space for all women</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
};
