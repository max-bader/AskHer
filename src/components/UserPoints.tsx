import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, Award } from "lucide-react";
import { useApp, User } from "@/contexts/AppContext";

interface UserPointsProps {
  user: User;
}

export const UserPoints: React.FC<UserPointsProps> = ({ user }) => {
  const { getSupportTitle } = useApp();

  return (
    <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100 shadow-sm">
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Community Points
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm font-semibold text-pink-600">
                    {user.points}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Earn points by asking questions, providing support, and
                    sharing wisdom
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-pink-500" />
              <span className="text-xs text-muted-foreground">
                Hearts Received
              </span>
            </div>
            <span className="text-xs font-medium">{user.heartsReceived}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-purple-500" />
              <span className="text-xs text-muted-foreground">
                Support Title
              </span>
            </div>
            <span className="text-xs font-medium">
              {getSupportTitle(user.points)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
