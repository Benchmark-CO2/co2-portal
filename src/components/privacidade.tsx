import type { PrivacyFile } from '@/types/privacy';
import PrivacyPolicy from './privacy/privacy-policies';
import { Card, CardContent } from './ui/card';

export default function PrivacyPageContent({privacy}: {privacy: PrivacyFile}) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          {privacy.title}
        </h1>
        <p className="text-muted-foreground">
          {privacy['sub-title']}
        </p>
      </div>
      <Card>
        <CardContent className="space-y-6">
          <PrivacyPolicy privacy={privacy} />
        </CardContent>
      </Card>
    </div>
  );
}
