# Contact Card

Digital contact card for Peter Nikolaev with Google Wallet pass support.

## Features

- 📱 Digital contact card with QR code
- 💼 Professional profile with photo
- 🔗 Direct links to WhatsApp, Telegram, and Email
- 🎫 Google Wallet pass generation
- 📲 Save contact directly to phone

## Google Wallet Setup

To enable Google Wallet pass generation, follow these steps:

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "contact-card-wallet")
4. Click "Create"

### 2. Enable Google Wallet API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Wallet API"
3. Click "Enable"

### 3. Create a Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Name: `wallet-issuer`
4. Click "Create and Continue"
5. Grant role: `Wallet Object Issuer`
6. Click "Continue" → "Done"

### 4. Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" → "Create New Key"
4. Select "JSON" format
5. Click "Create" - the key file will download automatically

### 5. Get Your Issuer ID

1. Go to [Google Pay & Wallet Console](https://pay.google.com/business/console)
2. Sign in with your Google account
3. Go to "Settings" → "Business Profile"
4. Your **Issuer ID** will be displayed at the top

### 6. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp api/.env.example api/.env
   ```

2. Edit `api/.env` and add your credentials:
   ```bash
   # Replace with your Issuer ID
   GOOGLE_WALLET_ISSUER_ID=your-issuer-id-here
   
   # Replace with your service account JSON key
   GOOGLE_WALLET_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   ```

   To convert your JSON key to a single line:
   ```bash
   export GOOGLE_WALLET_SERVICE_ACCOUNT_KEY=$(cat your-service-account-key.json | jq -c .)
   ```

### 7. Create the Pass Class

The first time you run the API, it will automatically create the pass class (template). You can also create it manually via the API.

## Development

### Frontend (Next.js)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend API (Express)

```bash
# Navigate to API folder
cd api

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Backend API (Railway)

1. Push your code to GitHub
2. Go to [Railway](https://railway.app/) and create a new project
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in Railway dashboard:
   - `GOOGLE_WALLET_ISSUER_ID`
   - `GOOGLE_WALLET_SERVICE_ACCOUNT_KEY`
6. Deploy!

Your API will be available at: `https://your-app.up.railway.app`

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## API Endpoints

### POST `/api/wallet/google`

Generate a Google Wallet pass.

**Response:**
```json
{
  "success": true,
  "saveUrl": "https://pay.google.com/gp/v/save/...",
  "passId": "ISSUER_ID.contact-card-1234567890"
}
```

## Technologies

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript
- **Wallet:** Google Wallet API
- **Hosting:** Vercel (frontend), Railway (backend)

## Contact

**Peter Nikolaev**
- WhatsApp: +971 54 281 6719
- Telegram: @nikolaevpeter
- Email: pn@getsome.llc