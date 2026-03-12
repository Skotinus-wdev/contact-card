import { generateGoogleWalletPass } from './wallet';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Generate Google Wallet pass
app.post('/api/wallet/google', async (req, res) => {
  try {
    console.log('Generating Google Wallet pass...');
    
    const result = await generateGoogleWalletPass();
    
    res.json({
      success: true,
      saveUrl: result.saveUrl,
      passId: result.passId,
    });
  } catch (error) {
    console.error('Error generating Google Wallet pass:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
  console.log(`📱 Google Wallet endpoint: http://localhost:${PORT}/api/wallet/google`);
});

export default app;