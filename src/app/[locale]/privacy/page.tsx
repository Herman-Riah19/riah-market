import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p>We respect your privacy and are committed to protecting your personal data.</p>
          <p>All user information is handled with care and stored securely.</p>
          <p>We do not share your information with third parties without consent.</p>
          <p>If you have any concerns, please contact our support team.</p>
        </CardContent>
      </Card>
    </div>
  );
}
