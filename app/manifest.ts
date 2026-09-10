import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abdullah Sajid | Full-Stack Web Developer & Software Engineer',
    short_name: 'Abdullah Sajid',
    description:
      'Official portfolio of Muhammad Abdullah (Abdullah Sajid) - Full-Stack Developer, Next.js Specialist, React Engineer, and UI/UX Designer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#030712',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
