import React from "react";
import { WisdomWall } from "@/components/WisdomWall";

const TopicExplorer = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-pink-900">Explore Topics</h1>
        <p className="text-muted-foreground">
          Browse the collective wisdom of our community by topic
        </p>
      </div>

      <WisdomWall />
    </div>
  );
};

export default TopicExplorer;
