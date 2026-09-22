import type { Metadata, Viewport } from 'next';
import '../styles/globals.scss';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080d1a',
};

export const metadata: Metadata = {
  title: 'Syed Masroor Jan | Staff Engineer & System Architect',
  description: 'Staff Engineer & Technical Lead with 9.6+ years architecting enterprise-grade, cloud-native platforms across AWS, Agentic & Generative AI, and distributed systems.',
  keywords: [
    'Syed Masroor Jan',
    'Staff Engineer',
    'Technical Lead',
    'Cloud Architect',
    'AWS Serverless',
    'Agentic AI',
    'Generative AI',
    'System Design',
    'Distributed Systems',
    'NestJS',
    'PostgreSQL RLS',
    'React',
    'Next.js',
  ],
  authors: [{ name: 'Syed Masroor Jan' }],
  openGraph: {
    title: 'Syed Masroor Jan | Staff Engineer & System Architect',
    description: 'Enterprise Cloud-Native Platforms, Agentic AI, and Distributed Systems Architecture.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ambient-background">
          <div className="glow-orb-1" />
          <div className="glow-orb-2" />
          <div className="glow-orb-3" />
          <div className="grid-pattern" />
        </div>
        {children}
      </body>
    </html>
  );
}
