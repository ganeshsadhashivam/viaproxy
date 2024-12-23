"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
}

export function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div>
      {/* Card Component */}
      <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-square relative mb-3">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h3 className="text-sm font-medium text-center">{title}</h3>
      </Card>
    </div>
  );
}
