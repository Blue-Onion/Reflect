Reflect

Reflect is a journaling and mood-tracking web application designed to help users document their thoughts, track their emotions, and organize their journal entries effortlessly.

Features

📓 Journaling: Create, edit, and organize journal entries.

🎭 Mood Analysis: Get insights into your emotional patterns.

📂 Collections: Categorize journal entries for better organization.

🔒 Secure Authentication: Uses Clerk for user authentication.

☁️ Cloud Storage: Save and access your journals anywhere.

Tech Stack

Frontend: Next.js, React, Tailwind CSS

Backend: Prisma, PostgreSQL

Authentication: Clerk

Deployment: Vercel

Setup

Prerequisites

Node.js (>= 16.x)

npm or yarn

PostgreSQL database

Installation

# Clone the repository
git clone https://github.com/yourusername/reflect.git
cd reflect

# Install dependencies
npm install

Environment Variables

Create a .env file in the root directory and add the following:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_signin_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_signup_url
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=your_after_signin_url
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=your_after_signup_url
PIXABY_API_KEY=your_pixaby_api_key
ARCJET_KEY=your_arcjet_key

Run the App

npm run dev

Your app should now be running at http://localhost:3000

Deployment

Deploy the app using Vercel:

vercel

Make sure to add your environment variables in Vercel's dashboard.

Troubleshooting

Prisma errors? Run npx prisma generate and npx prisma migrate dev.

Next.js build issues? Use export const dynamic = "force-dynamic" for dynamic routes.

Authentication errors? Ensure Clerk environment variables are set correctly.

License

MIT License

Developed with ❤️ by Blue Onion.