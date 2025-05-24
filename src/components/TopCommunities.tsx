import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const topicsList = [
  { id: "mental-health", name: "Mental Health", members: 8752 },
  { id: "career", name: "Career Support", members: 7243 },
  { id: "relationships", name: "Relationships", members: 6891 },
  { id: "self-care", name: "Self Care", members: 5467 },
  { id: "anxiety", name: "Anxiety & Stress", members: 4831 },
];

export const TopCommunities: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-orange-500" />
        <h2 className="font-bold text-base">Top Communities</h2>
      </div>

      <ul className="space-y-2">
        {topicsList.map((topic, index) => (
          <li key={topic.id}>
            <Link
              to={`/topics?tag=${topic.id}`}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <span className="text-gray-500 font-medium">{index + 1}</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 opacity-80 flex items-center justify-center text-white font-bold text-xs">
                {topic.name.substring(0, 1)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">r/{topic.id}</p>
                <p className="text-xs text-gray-500">
                  {topic.members.toLocaleString()} members
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <Link
          to="/topics"
          className="text-sm text-orange-500 font-medium hover:text-orange-600"
        >
          View All Communities
        </Link>
      </div>
    </div>
  );
};
