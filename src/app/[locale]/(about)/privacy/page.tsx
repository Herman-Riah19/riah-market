"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { privacySections } from "@/data/privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
       <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      {privacySections.map((section, idx) => (
        <Card key={idx} className="bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <CardDescription>
              <ul className="list-disc">
                {section.paragraphs.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
