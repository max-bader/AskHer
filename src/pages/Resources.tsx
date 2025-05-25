import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Therapy for Black Girls",
    description:
      "An online space dedicated to encouraging the mental wellness of Black women and girls.",
    url: "https://therapyforblackgirls.com/",
    category: "mental-health",
    tags: ["therapy", "poc", "women"],
  },
  {
    id: "2",
    title: "National Women's Health Network",
    description:
      "Improving the health of all women by developing and promoting a critical analysis of health issues.",
    url: "https://nwhn.org/",
    category: "physical-health",
    tags: ["women", "health", "advocacy"],
  },
  {
    id: "3",
    title: "Lean In",
    description:
      "Offering women the ongoing inspiration and support to help them achieve their goals.",
    url: "https://leanin.org/",
    category: "career",
    tags: ["professional", "leadership", "mentorship"],
  },
  {
    id: "4",
    title: "Women Who Code",
    description: "Empowering women to excel in technology careers.",
    url: "https://www.womenwhocode.com/",
    category: "career",
    tags: ["tech", "coding", "networking"],
  },
  {
    id: "5",
    title: "The Loveland Foundation",
    description:
      "Bringing opportunity and healing to communities of color, especially to Black women and girls.",
    url: "https://thelovelandfoundation.org/",
    category: "mental-health",
    tags: ["therapy", "poc", "healing"],
  },
  {
    id: "6",
    title: "RAINN",
    description: "Nation's largest anti-sexual violence organization.",
    url: "https://www.rainn.org/",
    category: "safety",
    tags: ["trauma", "support", "crisis"],
  },
  {
    id: "7",
    title: "Women's Health",
    description:
      "Comprehensive information on women's wellness, fitness, and nutrition.",
    url: "https://www.womenshealthmag.com/",
    category: "physical-health",
    tags: ["wellness", "fitness", "nutrition"],
  },
  {
    id: "8",
    title: "Power to Decide",
    description:
      "Ensuring all young people have the power to decide if, when, and under what circumstances to get pregnant and have a child.",
    url: "https://powertodecide.org/",
    category: "reproductive-health",
    tags: ["education", "contraception", "planning"],
  },
];

const faqs = [
  {
    question: "Is my information on AskHer truly anonymous?",
    answer:
      "Yes, AskHer is designed with privacy as a core principle. We don't collect personal identifiers like names, emails, or IP addresses. Each user is assigned a random ID that can't be traced back to you. Your questions and responses cannot be linked to your real identity.",
  },
  {
    question: "How does the question routing work?",
    answer:
      "When you submit a question, our system randomly routes it to 3-5 other active users. This ensures diversity of perspective and maintains anonymity. If no one responds within an hour, our AI provides a supportive message so you're never left without acknowledgment.",
  },
  {
    question: "Can I delete a question I've asked?",
    answer:
      "Yes, you can delete any question you've asked at any time. Simply go to your activity history and select the delete option. Once deleted, the question and all its responses will be removed from our system.",
  },
  {
    question: "What happens if someone posts inappropriate content?",
    answer:
      "AskHer has both automated and community-based moderation. You can flag any content that violates our community guidelines. Our team reviews flagged content promptly and takes appropriate action, which may include content removal and account restrictions.",
  },
  {
    question: "How do I earn community points?",
    answer:
      "You earn points through positive participation: 2 points for asking a question, 5 points for responding to others, 3 points for sharing to the Wisdom Wall, and bonus points when others mark your responses as helpful. These points contribute to your support title and community standing.",
  },
  {
    question: "Is the AI chatbot feature also anonymous?",
    answer:
      "Absolutely. Your conversations with the AI companion are completely private and anonymous. We don't store the content of these conversations long-term, and they're not shared with other users or third parties.",
  },
  {
    question: "How can I suggest a new feature or resource?",
    answer:
      "We welcome your input! Use the feedback form in the settings section to suggest new features, resources, or improvements. Our team regularly reviews these suggestions to make AskHer better for everyone.",
  },
  {
    question: "What should I do in a crisis situation?",
    answer:
      "AskHer is not designed for crisis intervention. If you or someone you know is in immediate danger, please call your local emergency number (like 911) or use the hotlines listed in our 'Hotlines' section for immediate support from trained professionals.",
  },
];

const ResourceList: React.FC<{ resources: Resource[] }> = ({ resources }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {resources.map((resource) => (
      <Card key={resource.id} className="border-[#e3d7f4]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-[#856787] flex items-center justify-between font-['DM_Sans']">
            {resource.title}
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#856787] hover:text-[#6c5a7c]"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3 font-['DM_Sans']">
            {resource.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-[#e3d7f4] text-[#856787] font-['DM_Sans']"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Resources = () => {
  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-8 mb-8">
            <img
              src="/image4.png"
              alt="Decorative illustration"
              className="w-32 h-32 object-contain"
            />
            <h1 className="text-[72px] font-['DM_Sans'] font-bold text-[#856787] leading-none">
              Resources
            </h1>
          </div>
          <p className="text-xl font-['DM_Sans'] text-gray-600 max-w-3xl mx-auto mb-12">
            Curated resources and tools to support your journey
          </p>
        </div>

        <Tabs defaultValue="resources" className="space-y-4">
          <TabsList className="bg-[#f3d4f7] font-['DM_Sans']">
            <TabsTrigger value="resources" className="text-[#856787] data-[state=active]:bg-white">Resources</TabsTrigger>
            <TabsTrigger value="faq" className="text-[#856787] data-[state=active]:bg-white">FAQ</TabsTrigger>
            <TabsTrigger value="about" className="text-[#856787] data-[state=active]:bg-white">About AskHer</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="mt-6">
            <Card className="border-[#e3d7f4]">
              <CardHeader className="bg-gradient-to-r from-[#f3d4f7] to-[#e3d7f4] rounded-t-lg">
                <CardTitle className="text-xl text-[#856787] font-['DM_Sans']">
                  Helpful Resources
                </CardTitle>
                <CardDescription className="font-['DM_Sans']">
                  A curated collection of resources for women's wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4 bg-[#f3d4f7] font-['DM_Sans']">
                    <TabsTrigger value="all" className="text-[#856787] data-[state=active]:bg-white">All</TabsTrigger>
                    <TabsTrigger value="mental-health" className="text-[#856787] data-[state=active]:bg-white">Mental Health</TabsTrigger>
                    <TabsTrigger value="physical-health" className="text-[#856787] data-[state=active]:bg-white">Physical Health</TabsTrigger>
                    <TabsTrigger value="career" className="text-[#856787] data-[state=active]:bg-white">Career</TabsTrigger>
                    <TabsTrigger value="safety" className="text-[#856787] data-[state=active]:bg-white">Safety</TabsTrigger>
                    <TabsTrigger value="reproductive-health" className="text-[#856787] data-[state=active]:bg-white">Reproductive Health</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <ResourceList resources={resources} />
                  </TabsContent>

                  <TabsContent value="mental-health">
                    <ResourceList
                      resources={resources.filter(
                        (r) => r.category === "mental-health",
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="physical-health">
                    <ResourceList
                      resources={resources.filter(
                        (r) => r.category === "physical-health",
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="career">
                    <ResourceList
                      resources={resources.filter((r) => r.category === "career")}
                    />
                  </TabsContent>

                  <TabsContent value="safety">
                    <ResourceList
                      resources={resources.filter((r) => r.category === "safety")}
                    />
                  </TabsContent>

                  <TabsContent value="reproductive-health">
                    <ResourceList
                      resources={resources.filter(
                        (r) => r.category === "reproductive-health",
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card className="border-[#e3d7f4]">
              <CardHeader className="bg-gradient-to-r from-[#f3d4f7] to-[#e3d7f4] rounded-t-lg">
                <CardTitle className="text-xl text-[#856787] font-['DM_Sans']">
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription className="font-['DM_Sans']">
                  Common questions about using AskHer
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-[#856787] hover:text-[#6c5a7c] font-['DM_Sans']">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 font-['DM_Sans']">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card className="border-[#e3d7f4]">
              <CardHeader className="bg-gradient-to-r from-[#f3d4f7] to-[#e3d7f4] rounded-t-lg">
                <CardTitle className="text-xl text-[#856787] font-['DM_Sans']">
                  About AskHer
                </CardTitle>
                <CardDescription className="font-['DM_Sans']">Our mission and values</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-[#856787] mb-2 font-['DM_Sans']">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 font-['DM_Sans']">
                    AskHer was created to provide a safe, anonymous space where
                    women can seek support, share wisdom, and build a community of
                    mutual respect and understanding. We believe in the power of
                    collective knowledge and the healing that comes from knowing
                    you're not alone.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#856787] mb-2 font-['DM_Sans']">
                    Core Values
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 font-['DM_Sans']">
                    <li>
                      <span className="font-medium text-[#856787]">
                        Safety First:
                      </span>{" "}
                      We prioritize creating a secure environment where women can
                      express themselves without fear.
                    </li>
                    <li>
                      <span className="font-medium text-[#856787]">
                        True Anonymity:
                      </span>{" "}
                      Your identity remains completely private, allowing for
                      honest expression.
                    </li>
                    <li>
                      <span className="font-medium text-[#856787]">
                        Supportive Community:
                      </span>{" "}
                      We foster a culture of empathy, respect, and constructive
                      support.
                    </li>
                    <li>
                      <span className="font-medium text-[#856787]">
                        Inclusive Space:
                      </span>{" "}
                      We welcome women from all backgrounds, cultures, and walks
                      of life.
                    </li>
                    <li>
                      <span className="font-medium text-[#856787]">
                        Growth Mindset:
                      </span>{" "}
                      We believe in the power of shared experiences to help us
                      learn and grow together.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#856787] mb-2 font-['DM_Sans']">
                    How We're Different
                  </h3>
                  <p className="text-gray-600 font-['DM_Sans']">
                    Unlike public forums or social media, AskHer is designed
                    specifically for women's support needs. We combine true
                    anonymity with community accountability, ensuring a balance
                    between free expression and maintaining a respectful
                    environment. Our rotating support system means you receive
                    diverse perspectives, and our AI backup ensures no one's
                    question goes unacknowledged.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
