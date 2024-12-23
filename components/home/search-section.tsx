"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select } from "@/components/ui/select";

export function SearchSection() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Perimeter</label>
          <Input placeholder="Around me" className="w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Search type</label>
          <Input placeholder="What are you looking for?" className="w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            What are you looking for?
          </label>
          <Input placeholder="Category" className="w-full" />
        </div>
        <div className="form-group none">
          <a
            href="#"
            className="btn search-btn bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-lg"
          >
            {/* Updated to use react-icons */}
            <Search className="text-white text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
