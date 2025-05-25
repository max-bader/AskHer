import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, Clock, Globe } from "lucide-react";

interface Hotline {
  id: string;
  name: string;
  phone: string;
  description: string;
  hours: string;
  website: string;
  categories: string[];
}

const hotlines: Hotline[] = [
  {
    id: "1",
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description:
      "Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    hours: "24/7",
    website: "https://988lifeline.org/",
    categories: ["mental-health", "crisis"],
  },
  {
    id: "2",
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description:
      "Free, 24/7 support for those in crisis. Text with a trained Crisis Counselor for support with anxiety, depression, suicide, and more.",
    hours: "24/7",
    website: "https://www.crisistextline.org/",
    categories: ["mental-health", "crisis", "text-based"],
  },
  {
    id: "3",
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    description:
      "Advocates are available 24/7 to talk confidentially with anyone experiencing domestic violence, seeking resources or information, or questioning unhealthy aspects of their relationship.",
    hours: "24/7",
    website: "https://www.thehotline.org/",
    categories: ["domestic-violence", "crisis"],
  },
  {
    id: "4",
    name: "RAINN (Sexual Assault Hotline)",
    phone: "1-800-656-HOPE (4673)",
    description:
      "Connect with a trained staff member from a sexual assault service provider in your area. Confidential support and resources.",
    hours: "24/7",
    website: "https://www.rainn.org/",
    categories: ["sexual-assault", "crisis"],
  },
  {
    id: "5",
    name: "National Eating Disorders Association Helpline",
    phone: "1-800-931-2237",
    description:
      "Provides support, resources, and treatment options for yourself or a loved one experiencing eating disorder issues.",
    hours: "Monday-Thursday 11am-9pm ET, Friday 11am-5pm ET",
    website: "https://www.nationaleatingdisorders.org/",
    categories: ["eating-disorders", "mental-health"],
  },
  {
    id: "6",
    name: "Postpartum Support International",
    phone: "1-800-944-4773",
    description:
      "Provides support, resources, and information for women and families experiencing postpartum mental health issues.",
    hours: "Available in English & Spanish",
    website: "https://www.postpartum.net/",
    categories: ["postpartum", "parenting", "mental-health"],
  },
  {
    id: "7",
    name: "National Alliance on Mental Illness (NAMI) HelpLine",
    phone: "1-800-950-NAMI (6264)",
    description:
      "Provides information, resource referrals and support to people living with a mental health condition, family members and caregivers, mental health providers and the public.",
    hours: "Monday-Friday 10am-10pm ET",
    website: "https://www.nami.org/",
    categories: ["mental-health", "resources"],
  },
  {
    id: "8",
    name: "Trevor Project (LGBTQ+ Youth)",
    phone: "1-866-488-7386",
    description:
      "Crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning young people under 25.",
    hours: "24/7",
    website: "https://www.thetrevorproject.org/",
    categories: ["lgbtq", "youth", "crisis"],
  },
];

const Hotlines = () => {
  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-pink-900">
            Crisis Hotlines
          </h1>
          <p className="text-muted-foreground">
            Immediate support resources for various crisis situations
          </p>
        </div>

        <Card className="border-pink-100 bg-gradient-to-r from-red-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3 text-red-600 mb-4">
              <PhoneCall className="h-6 w-6" />
              <h2 className="text-xl font-semibold">
                If you're in immediate danger, call 911
              </h2>
            </div>
            <p className="text-center text-muted-foreground">
              These hotlines provide support for various situations, but if you're
              facing an immediate threat to your safety, please contact emergency
              services right away.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotlines.map((hotline) => (
            <Card key={hotline.id} className="border-pink-100">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <CardTitle className="text-lg text-pink-900">
                    {hotline.name}
                  </CardTitle>
                  <div className="px-3 py-1 bg-pink-100 rounded-full text-pink-800 font-semibold text-base flex items-center justify-center">
                    {hotline.phone}
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {hotline.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{hotline.hours}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={hotline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 hover:underline"
                    >
                      {new URL(hotline.website).hostname.replace("www.", "")}
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {hotline.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="text-xs border-pink-200 text-pink-700"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-pink-100 mt-4">
          <CardHeader>
            <CardTitle className="text-pink-900">Important Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AskHer is not a crisis intervention service. While our community can
              provide support and encouragement, please reach out to the
              appropriate hotlines above for immediate assistance in crisis
              situations. These services are staffed by trained professionals who
              specialize in crisis intervention and support.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hotlines;
