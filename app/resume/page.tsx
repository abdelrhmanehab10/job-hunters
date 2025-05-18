"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Plus,
} from "lucide-react";
import React, { useState, useCallback } from "react";

type SocialPlatform = {
  id: string;
  name: string;
  icon: React.ElementType;
  domain: string;
  color: string;
};

const socialPlatforms: SocialPlatform[] = [
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    domain: "https://twitter.com/",
    color: "bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    domain: "https://facebook.com/",
    color: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    domain: "https://instagram.com/",
    color: "bg-[#E4405F]/10 text-[#E4405F] border-[#E4405F]/20",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    domain: "https://linkedin.com/in/",
    color: "bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20",
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    domain: "https://github.com/",
    color:
      "bg-gray-800/10 text-gray-800 dark:text-gray-200 border-gray-800/20 dark:border-gray-200/20",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    domain: "https://youtube.com/",
    color: "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20",
  },
];

type Props = {};

const Resume = (props: Props) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [isSocialLinkInput, setIsSocialLinkInput] = useState<boolean>(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>("");
  const [url, setUrl] = useState("");
  const [savedLinks, setSavedLinks] = useState<
    Array<{ platform: SocialPlatform; url: string }>
  >([]);
  const selectedPlatform =
    socialPlatforms.find((p) => p.id === selectedPlatformId) || null;

  // Memoized handler for text inputs
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    
    switch (name) {
      case "name":
        setName(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "url":
        setUrl(value);
        break;
      default:
        break;
    }
  }, []);

  const handlePlatformSelect = useCallback((platformId: string) => {
    const platform = socialPlatforms.find((p) => p.id === platformId);
    if (platform) {
      setSelectedPlatformId(platformId);
      setUrl(platform.domain);
    }
  }, []);

  const handleSaveLink = useCallback(() => {
    if (selectedPlatform && url.trim() !== "") {
      if (!url.startsWith(selectedPlatform.domain)) {
        setUrl(selectedPlatform.domain + url);
      }

      setSavedLinks((prevLinks) => [...prevLinks, { platform: selectedPlatform, url }]);

      setSelectedPlatformId("");
      setUrl("");
    }
  }, [selectedPlatform, url]);
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 border-r shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1 mb-4">
              Header
            </h2>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </Label>
                <Input
                  value={name}
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label
                  htmlFor="position"
                  className="block text-sm font-medium mb-1"
                >
                  Position
                </Label>
                <Input
                  value={position}
                  id="position"
                  name="position"
                  placeholder="e.g. Frontend Developer"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1 mb-4">
              Social Links
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedPlatformId}
                  onValueChange={handlePlatformSelect}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Platform">
                      {selectedPlatform && (
                        <div className="flex items-center gap-2">
                          {React.createElement(selectedPlatform.icon, {
                            className: "h-4 w-4",
                          })}
                          <span className="text-xs">
                            {selectedPlatform.name}
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {socialPlatforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <SelectItem key={platform.id} value={platform.id}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{platform.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Input
                  className="flex-1"
                  placeholder="Enter your profile URL"
                  value={url}
                  name="url"
                  onChange={handleInputChange}
                  disabled={!selectedPlatform}
                />
                <Button
                  onClick={handleSaveLink}
                  disabled={!selectedPlatform || !url.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
  
              {savedLinks.length > 0 && (
                <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {savedLinks.map((link, index) => {
                    const Icon = link.platform.icon;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md border text-sm",
                          link.platform.color
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate hover:underline flex-1"
                        >
                          {link.url}
                        </a>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => {
                            setSavedLinks(
                              savedLinks.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M18 6L6 18"></path>
                            <path d="M6 6l12 12"></path>
                          </svg>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
  
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">{name || "Your Name"}</h1>
            <h2 className="text-xl text-gray-600 mb-4">
              {position || "Your Position"}
            </h2>
  
            {savedLinks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {savedLinks.map((link, index) => {
                  const Icon = link.platform.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
                        link.platform.color
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.platform.name}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </header>
        </div>
      </div>
    </div>
  );
};

export default Resume;
