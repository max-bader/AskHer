import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookText, Save, Calendar, Search } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: Date;
  tags: string[];
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem("journal-entries");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: "",
    title: "",
    content: "",
    mood: "neutral",
    date: new Date(),
    tags: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) return;

    if (isEditing) {
      setEntries(
        entries.map((entry) =>
          entry.id === currentEntry.id ? currentEntry : entry,
        ),
      );
    } else {
      const newEntry = {
        ...currentEntry,
        id: Date.now().toString(),
        date: new Date(),
      };
      setEntries([newEntry, ...entries]);
    }

    setCurrentEntry({
      id: "",
      title: "",
      content: "",
      mood: "neutral",
      date: new Date(),
      tags: [],
    });
    setIsEditing(false);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
  };

  const handleAddTag = (tag: string) => {
    if (tag && !currentEntry.tags.includes(tag)) {
      setCurrentEntry({
        ...currentEntry,
        tags: [...currentEntry.tags, tag],
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCurrentEntry({
      ...currentEntry,
      tags: currentEntry.tags.filter((t) => t !== tag),
    });
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-8 mb-8">
            <img
              src="/image3.png"
              alt="Decorative illustration"
              className="w-32 h-32 object-contain"
            />
            <h1 className="text-[72px] font-['DM_Sans'] font-bold text-[#856787] leading-none">
              Personal Journal
            </h1>
          </div>
          <p className="text-xl font-['DM_Sans'] text-gray-600 max-w-3xl mx-auto mb-2">
            A private space to reflect on your thoughts and feelings.
          </p>
          <p className="text-xl font-['DM_Sans'] text-gray-600 max-w-3xl mx-auto mb-12">
            Write freely, express openly, and track your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-white shadow-md border-[#e3d7f4]">
              <CardHeader className="bg-gradient-to-r from-[#f3d4f7] to-[#e3d7f4] rounded-t-lg">
                <CardTitle className="text-lg text-[#856787] flex items-center gap-2 font-['DM_Sans']">
                  <BookText className="h-5 w-5" />
                  {isEditing ? "Edit Journal Entry" : "New Journal Entry"}
                </CardTitle>
                <CardDescription className="font-['DM_Sans']">
                  Express your thoughts freely in this private space
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium font-['DM_Sans']">Title</label>
                  <Input
                    placeholder="Give your entry a title..."
                    value={currentEntry.title}
                    onChange={(e) =>
                      setCurrentEntry({ ...currentEntry, title: e.target.value })
                    }
                    className="font-['DM_Sans'] border-[#e3d7f4]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium font-['DM_Sans']">
                    How are you feeling?
                  </label>
                  <Select
                    value={currentEntry.mood}
                    onValueChange={(value) =>
                      setCurrentEntry({ ...currentEntry, mood: value })
                    }
                  >
                    <SelectTrigger className="font-['DM_Sans'] border-[#e3d7f4]">
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="great">Great 😊</SelectItem>
                      <SelectItem value="good">Good 🙂</SelectItem>
                      <SelectItem value="neutral">Neutral 😐</SelectItem>
                      <SelectItem value="down">A bit down 😔</SelectItem>
                      <SelectItem value="struggling">Struggling 😢</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium font-['DM_Sans']">Journal Entry</label>
                  <Textarea
                    placeholder="What's on your mind today?"
                    className="min-h-[200px] resize-none font-['DM_Sans'] border-[#e3d7f4]"
                    value={currentEntry.content}
                    onChange={(e) =>
                      setCurrentEntry({
                        ...currentEntry,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium font-['DM_Sans']">Tags</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {currentEntry.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#f3d4f7] hover:bg-[#e3d7f4] text-[#856787] font-['DM_Sans']"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-[#856787]"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag (e.g., reflection, growth)"
                      id="tag-input"
                      className="font-['DM_Sans'] border-[#e3d7f4]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById(
                          "tag-input",
                        ) as HTMLInputElement;
                        handleAddTag(input.value);
                        input.value = "";
                      }}
                      className="border-[#e3d7f4] hover:bg-[#f3d4f7] text-[#856787] font-['DM_Sans']"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-[#e3d7f4] pt-4">
                <Button
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.title || !currentEntry.content}
                  className="bg-[#856787] hover:bg-[#6c5a7c] text-white flex gap-2 font-['DM_Sans']"
                >
                  <Save className="h-4 w-4" />
                  {isEditing ? "Update Entry" : "Save Entry"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-white shadow-md border-[#e3d7f4]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#856787] font-['DM_Sans']">
                  Past Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#856787]" />
                  <Input
                    placeholder="Search entries..."
                    className="pl-9 font-['DM_Sans'] border-[#e3d7f4]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {filteredEntries.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {filteredEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3 rounded-lg border border-[#e3d7f4] hover:border-[#856787] cursor-pointer font-['DM_Sans']"
                        onClick={() => handleEditEntry(entry)}
                      >
                        <h3 className="font-medium text-[#856787]">
                          {entry.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <Badge variant="outline" className="text-[10px] h-4 border-[#e3d7f4] text-[#856787]">
                            {entry.mood}
                          </Badge>
                        </div>
                        <p className="text-xs line-clamp-2 mt-2 text-gray-600">
                          {entry.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 font-['DM_Sans']">
                      {searchQuery
                        ? "No entries match your search"
                        : "No journal entries yet"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
