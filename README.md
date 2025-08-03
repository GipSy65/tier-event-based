# tier-event-based



# Tier-Based Event Showcase

Web application displaying events based on user tier levels using Next.js 14, Clerk.dev, and Supabase.

## Live Demo

🔗 **Application:** https://your-app.vercel.app1`

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Clerk.dev (Authentication)
- Supabase (Database)
- Tailwind CSS
- Vercel (Deployment)

## Features

- User authentication with Clerk.dev
- Tier-based event filtering (Free → Silver → Gold → Platinum)
- Responsive design
- Event management system
- User tier metadata storage

## Setup Instructions

### 1. Clone Repository
 git clone "https://github.com/GipSy65/tier-event-based.git"
 cd tier-event-based


### 2. Install Dependencies
npm install


### 3. Environment Variables

Create `.env.local`:


NEXT_PUBLIC_CLERK_FRONTEND_API= "yout clerk fronted key"
NEXT_PUBLIC_SUPABASE_URL= "your supabase url"
NEXT_PUBLIC_SUPABASE_ANON_KEY= "your public key"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= "your publishable clerk key"


### 4. Database Setup

Run in Supabase SQL Editor:

-- Events table
CREATE TABLE events (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
title TEXT NOT NULL,
description TEXT,
event_date TIMESTAMP WITH TIME ZONE NOT NULL,
image_url TEXT,
tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profiles table
CREATE TABLE profiles (
id TEXT PRIMARY KEY,
email TEXT,
tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow all operations on events" ON events FOR ALL USING (true);
CREATE POLICY "Allow all operations on profiles" ON profiles FOR ALL USING (true);

-- Sample data (2 events per tier)
INSERT INTO events (title, description, event_date, tier) VALUES
('Welcome Webinar', 'Free introductory webinar', '2025-08-15 18:00:00+00', 'free'),
('Community Meetup', 'Monthly community gathering', '2025-08-22 19:00:00+00', 'free'),
('Silver Workshop', 'Workshop for Silver+ members', '2025-08-20 19:00:00+00', 'silver'),
('Networking Session', 'Silver tier networking', '2025-08-28 18:30:00+00', 'silver'),
('Gold Masterclass', 'Advanced Gold+ masterclass', '2025-08-25 20:00:00+00', 'gold'),
('VIP Workshop', 'Premium Gold workshop', '2025-09-05 17:00:00+00', 'gold'),
('Platinum Summit', 'Exclusive Platinum summit', '2025-09-01 16:00:00+00', 'platinum'),
('Executive Retreat', 'Platinum tier retreat', '2025-09-10 14:00:00+00', 'platinum');

### 5. Clerk.dev Setup

1. Create application at clerk.dev
2. Add publishable key to `.env.local`
3. Configure redirect URLs

### 6. Run Application

npm run dev

Visit: http://localhost:3000

## Tier Filtering Logic

| User Tier | Events Visible | Count |
|-----------|----------------|-------|
| Free      | Free only      | 2     |
| Silver    | Free + Silver  | 4     |
| Gold      | Free + Silver + Gold | 6 |
| Platinum  | All tiers      | 8     |

## Demo Credentials

Use tier management buttons on dashboard to test different access levels:

- Sign up with any email
- Use tier buttons to switch between: free, silver, gold, platinum
- Visit events page to see filtered results


