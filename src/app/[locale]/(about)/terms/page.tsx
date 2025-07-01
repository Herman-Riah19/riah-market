"use client"
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { termsSections } from "@/data/terms-of-service";

const TermsPage: React.FC = () => (
    <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        <div className="space-y-8">
            {termsSections.map((section, id) => (
                <Card key={id} className="p-6 bg-background border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-2">
                            <ul className="list-disc pl-5">
                                {section.paragraphs.map((para, pIdx) => (
                                    <li key={pIdx}>{para}</li>
                                ))}
                            </ul>
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default TermsPage;