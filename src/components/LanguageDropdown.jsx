import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function LanguageDropdown() {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select language");

  const languages = ["Marathi", "Hindi", "English"];

  return (
    <div className="w-64 relative">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
      >
        {selectedLanguage}
        {languageDropdownOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {languageDropdownOpen && (
        <div className="absolute w-full mt-1 rounded-md bg-white shadow-md border z-10">
          {languages.map((lang) => (
            <div
              key={lang}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedLanguage(lang);
                setLanguageDropdownOpen(false);
              }}
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
