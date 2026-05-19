import { Playfair_Display, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider }  from '@/context/AuthContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'], weight: ['700','800','900'],
  variable: '--font-playfair', display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'], weight: ['300','400','500','600'],
  variable: '--font-dm-sans', display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gci.edu.pk';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'GCI — Global Computer Institute | Premier Tech Education in Karachi',
    template: '%s | GCI — Global Computer Institute',
  },
  description:
    "Global Computer Institute (GCI) is Karachi's #1 technology training institute. " +
    '3 campuses, 50+ programs including Web Development, AI & ML, Cybersecurity, and Cloud Computing. 15,000+ alumni placed.',
  keywords: [
    'computer institute karachi','IT courses karachi','web development karachi',
    'AI course pakistan','cybersecurity course karachi','GCI institute',
  ],
  authors:   [{ name: 'Global Computer Institute' }],
  creator:   'Global Computer Institute',
  publisher: 'Global Computer Institute',
  openGraph: {
    type: 'website', locale: 'en_PK', url: SITE_URL,
    siteName: 'Global Computer Institute',
    title: 'GCI — Global Computer Institute | Premier Tech Education in Karachi',
    description: "Karachi's #1 computer institute. 50+ programs, 3 campuses.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'GCI Institute' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GCI — Global Computer Institute',
    description: "Karachi's #1 computer institute.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
};

// Blocking script: sets data-theme before React hydrates — zero flash
const THEME_SCRIPT = `(function(){
  try{
    var s=localStorage.getItem('gci-theme'),
        p=window.matchMedia('(prefers-color-scheme:dark)').matches;
    document.documentElement.setAttribute('data-theme',s||(p?'dark':'light'));
  }catch(e){
    document.documentElement.setAttribute('data-theme','dark');
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      document.documentElement.classList.add('theme-ready');
    });
  });
})();`;

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the blocking script modifies data-theme before
    // React hydrates — React must ignore that attribute difference.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      {/* suppressHydrationWarning on body: browser extensions inject attributes */}
      <body className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
