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
import React, { useState } from "react";

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

  const handlePlatformSelect = (platformId: string) => {
    const platform = socialPlatforms.find((p) => p.id === platformId);
    if (platform) {
      setSelectedPlatformId(platformId);
      setUrl(platform.domain);
    }
  };

  const handleSaveLink = () => {
    if (selectedPlatform && url.trim() !== "") {
      if (!url.startsWith(selectedPlatform.domain)) {
        setUrl(selectedPlatform.domain + url);
      }

      setSavedLinks([...savedLinks, { platform: selectedPlatform, url }]);

      setSelectedPlatformId("");
      setUrl("");
    }
  };
  return (
    <div className="flex">
      <aside>
        <div>
          <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1 mb-3">
            Header
          </h2>
          <p>
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input
              value={name}
              id="name"
              name="name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </p>
          <p className="my-1">
            <Label htmlFor="position" className="mb-1">
              Position
            </Label>
            <Input
              value={position}
              id="position"
              name="position"
              onChange={(e) => setPosition(e.currentTarget.value)}
            />
          </p>
          <div className="w-full max-w-md mx-auto space-y-4 my-1">
            <Label htmlFor="social-link" className="mb-1">
              Social Links
            </Label>
            <div className="flex items-center space-x-2">
              <Select
                value={selectedPlatformId}
                onValueChange={handlePlatformSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"pick"}>
                    {selectedPlatform && (
                      <div className="flex justify-center">
                        {React.createElement(selectedPlatform.icon, {
                          className: "h-4 w-4",
                        })}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-fit">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <SelectItem key={platform.id} value={platform.id}>
                        <div className="flex justify-center">
                          <Icon className="h-4 w-4" />
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
                onChange={(e) => setUrl(e.target.value)}
                disabled={!selectedPlatform}
              />
              <Button
                onClick={handleSaveLink}
                disabled={!selectedPlatform || !url.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
      <div>
        <header className="text-center mx-auto">
          <h1>{name}</h1>
          <h2>{position}</h2>
          <ul>
            {savedLinks.length > 0 && (
              <div className="space-y-2">
                <div className="space-y-2">
                  {savedLinks.map((link, index) => {
                    const Icon = link.platform.icon;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md border",
                          link.platform.color
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm truncate hover:underline"
                        >
                          {link.url}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </ul>
        </header>
      </div>
    </div>
  );
};

export default Resume;
