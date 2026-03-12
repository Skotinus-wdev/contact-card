# Contact Card

Digital contact card for Peter Nikolaev with Google Wallet pass support.

**Live Site:** https://contact-card-beige.vercel.app

## Features

- 📱 Digital contact card with QR code
- 💼 Professional profile with photo
- 🔗 Direct links to WhatsApp, Telegram, and Email
- 🎫 Google Wallet pass generation
- 📲 Save contact directly to phone

## Quick Start

### Frontend Only (No Wallet)
The frontend works immediately and can be deployed to Vercel:

```bash
npm install
npm run build
vercel --prod
```

### Full Setup (With Google Wallet)

#### 1. Deploy Backend API (Railway)

**Option A: Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
cd api
railway login
railway init
railway up
```

**Option B: Railway Dashboard (Easiest)**
1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Set the root directory to `api`
6. Add environment variables (see below)
7. Deploy!

#### 2. Set Environment Variables on Railway

```bash
GOOGLE_WALLET_ISSUER_ID=your-issuer-id
GOOGLE_WALLET_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

#### 3. Update Frontend API URL

Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

Then redeploy the frontend.

## Google Wallet Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "contact-card-wallet"
3. Enable the **Google Wallet API** (APIs & Services → Library)

### 2. Create Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Name: `wallet-issuer`
4. Grant role: **Wallet Object Issuer**
5. Go to the service account → "Keys" tab
6. "Add Key" → "Create New Key" → JSON
7. Save the downloaded JSON file securely

### 3. Get Your Issuer ID

1. Go to [Google Pay & Wallet Console](https://pay.google.com/business/console)
2. Sign in with your Google account
3. Go to "Settings"
4. Copy your **Issuer ID**

### 4. Configure Environment Variables

Convert your JSON key to a single line:
```bash
export GOOGLE_WALLET_SERVICE_ACCOUNT_KEY=$(cat service-account-key.json | jq -c .)
```

Add to Railway dashboard:
- `GOOGLE_WALLET_ISSUER_ID`: Your issuer ID
- `GOOGLE_WALLET_SERVICE_ACCOUNT_KEY`: The JSON string

## Project Structure

```
contact-card/
├── app/                    # Next.js frontend
│   ├── page.tsx           # Main contact card page
│   ├── layout.tsx
│   └── globals.css
├── api/                    # Express backend (deploy separately)
│   ├── index.ts           # Server entry
│   ├── wallet.ts          # Google Wallet integration
│   ├── package.json
│   ├── tsconfig.json
│   ├── railway.toml       # Railway config
│   ├── Procfile           # Render/Heroku config
│   └── .env.example       # Environment template
├── components/            # React components
├── public/               # Static assets (avatar.png)
├── .env.local.example    # Frontend env template
└── README.md
```

## API Endpoints

### POST `/api/wallet/google`

Generate a Google Wallet pass.

**Request:**
```bash
curl -X POST https://your-api.com/api/wallet/google
```

**Response:**
```json
{
  "success": true,
  "saveUrl": "https://pay.google.com/gp/v/save/...",
  "passId": "ISSUER_ID.contact-card-1234567890"
}
```

## Development

### Frontend
```bash
npm install
npm run dev          # http://localhost:3000
```

### Backend
```bash
cd api
npm install
npm run dev          # http://localhost:3001
```

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy API to Railway/Render
- [ ] Add environment variables to Railway
- [ ] Copy API URL
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL`
- [ ] Deploy frontend to Vercel
- [ ] Test Google Wallet button

## Technologies

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript
- **Wallet:** Google Wallet API
- **Icons:** Lucide React
- **QR:** qrcode.react

## Contact

**Peter Nikolaev**
- WhatsApp: +971 54 281 6719
- Telegram: @nikolaevpeter
- Email: pn@getsome.llc