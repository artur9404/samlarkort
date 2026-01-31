# Samlarkort – MVP (Next.js + Tailwind + Supabase)

## Snabbstart
1) Installera
```bash
npm install
```

2) Skapa `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=DIN_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=DIN_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=DIN_SERVICE_ROLE_KEY
```

3) Starta
```bash
npm run dev
```

## Supabase
- Kör SQL (tabeller + RLS) som du redan fått
- Skapa Storage bucket: `listing-images` (Public OFF)

## Admin
- Logga in först (skapar profile via trigger)
- Sätt din profil `role = admin` i tabellen `profiles`
- Besök: `/admin/moderation`
