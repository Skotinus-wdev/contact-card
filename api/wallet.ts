/**
 * Google Wallet Pass Generation
 * 
 * This module generates Google Wallet passes using the Google Wallet API.
 * For production use, you'll need to set up a Google Cloud service account.
 * 
 * Setup Instructions:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing
 * 3. Enable the Google Wallet API
 * 4. Create a service account and download the JSON key
 * 5. Set the GOOGLE_WALLET_SERVICE_ACCOUNT_KEY environment variable
 */

import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

// Configuration
const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID || 'YOUR_ISSUER_ID';
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_KEY;

// Pass details
const PASS_CONFIG = {
  issuerName: 'Peter Nikolaev',
  header: 'Digital Contact Card',
  contact: {
    name: 'Peter Nikolaev',
    title: 'AI Consultant / Developer',
    whatsapp: '+971 54 281 6719',
    telegram: '@nikolaevpeter',
    email: 'pn@getsome.llc',
    photo: 'https://contact-card-beige.vercel.app/avatar.png',
    website: 'https://contact-card-beige.vercel.app',
  },
};

/**
 * Get authenticated Google Wallet API client
 */
async function getWalletClient() {
  // For development/demo: return a mock client
  if (!SERVICE_ACCOUNT_KEY) {
    console.log('⚠️  No service account key found. Using mock mode.');
    return null;
  }

  try {
    const credentials = JSON.parse(SERVICE_ACCOUNT_KEY);
    
    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
    });

    const client = await auth.getClient();
    return client;
  } catch (error) {
    console.error('Error creating Google Wallet client:', error);
    return null;
  }
}

/**
 * Generate a unique pass class ID
 */
function generatePassClassId(): string {
  return `${ISSUER_ID}.contact-card-class`;
}

/**
 * Generate a unique pass object ID
 */
function generatePassObjectId(): string {
  return `${ISSUER_ID}.contact-card-${Date.now()}`;
}

/**
 * Create or update the pass class (template)
 */
async function createPassClass(client: any): Promise<void> {
  if (!client) return;

  const classId = generatePassClassId();
  
  const passClass = {
    id: classId,
    issuerName: PASS_CONFIG.issuerName,
    reviewStatus: 'UNDER_REVIEW',
    homePageUri: {
      uri: PASS_CONFIG.contact.website,
      description: 'Visit Contact Card',
    },
    textModulesData: [
      {
        id: 'title',
        header: 'Title',
        body: PASS_CONFIG.contact.title,
      },
    ],
  };

  try {
    const response = await axios.patch(
      `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${classId}`,
      passClass,
      {
        auth: client,
      }
    );
    console.log('Pass class created/updated:', response.data.id);
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Class doesn't exist, create it
      try {
        const response = await axios.post(
          'https://walletobjects.googleapis.com/walletobjects/v1/genericClass',
          passClass,
          { auth: client }
        );
        console.log('Pass class created:', response.data.id);
      } catch (createError) {
        console.error('Error creating pass class:', createError);
      }
    } else {
      console.error('Error updating pass class:', error.message);
    }
  }
}

/**
 * Create a new pass object (individual pass)
 */
async function createPassObject(client: any): Promise<string> {
  const classId = generatePassClassId();
  const objectId = generatePassObjectId();

  const passObject = {
    id: objectId,
    classId: classId,
    state: 'ACTIVE',
    heroImage: {
      sourceUri: {
        uri: 'https://contact-card-beige.vercel.app/card-header.png',
      },
      contentDescription: {
        defaultValue: {
          language: 'en',
          value: 'Digital Contact Card',
        },
      },
    },
    textModulesData: [
      {
        id: 'name',
        header: 'Name',
        body: PASS_CONFIG.contact.name,
      },
      {
        id: 'title',
        header: 'Title',
        body: PASS_CONFIG.contact.title,
      },
      {
        id: 'whatsapp',
        header: 'WhatsApp',
        body: PASS_CONFIG.contact.whatsapp,
      },
      {
        id: 'telegram',
        header: 'Telegram',
        body: PASS_CONFIG.contact.telegram,
      },
      {
        id: 'email',
        header: 'Email',
        body: PASS_CONFIG.contact.email,
      },
    ],
    barcode: {
      type: 'QR_CODE',
      value: PASS_CONFIG.contact.website,
      alternateText: 'Scan to visit',
    },
    cardTitle: {
      defaultValue: {
        language: 'en',
        value: PASS_CONFIG.header,
      },
    },
    header: {
      defaultValue: {
        language: 'en',
        value: PASS_CONFIG.contact.name,
      },
    },
    linksModuleData: {
      uris: [
        {
          id: 'website',
          uri: PASS_CONFIG.contact.website,
          description: 'Visit Contact Card',
        },
        {
          id: 'whatsapp',
          uri: `https://wa.me/${PASS_CONFIG.contact.whatsapp.replace(/\D/g, '')}`,
          description: 'Message on WhatsApp',
        },
        {
          id: 'telegram',
          uri: `https://t.me/${PASS_CONFIG.contact.telegram.replace('@', '')}`,
          description: 'Message on Telegram',
        },
        {
          id: 'email',
          uri: `mailto:${PASS_CONFIG.contact.email}`,
          description: 'Send Email',
        },
      ],
    },
    imageModulesData: [
      {
        id: 'photo',
        mainImage: {
          sourceUri: {
            uri: PASS_CONFIG.contact.photo,
          },
          contentDescription: {
            defaultValue: {
              language: 'en',
              value: PASS_CONFIG.contact.name,
            },
          },
        },
      },
    ],
  };

  if (!client) {
    // Mock mode - return a simulated pass ID
    console.log('Mock mode: Simulating pass object creation');
    return objectId;
  }

  try {
    const response = await axios.post(
      'https://walletobjects.googleapis.com/walletobjects/v1/genericObject',
      passObject,
      { auth: client }
    );
    console.log('Pass object created:', response.data.id);
    return response.data.id;
  } catch (error: any) {
    console.error('Error creating pass object:', error.response?.data || error.message);
    throw new Error(`Failed to create pass object: ${error.message}`);
  }
}

/**
 * Generate a JWT token for the save link
 */
async function generateJwt(client: any, objectId: string): Promise<string> {
  if (!client) {
    // Mock mode - return a mock JWT
    return 'mock_jwt_token_' + Date.now();
  }

  const claims = {
    iss: (await client.getCredentials()).client_email,
    aud: 'google',
    origins: [],
    typ: 'savetowallet',
    payload: {
      genericObjects: [
        {
          id: objectId,
          classId: generatePassClassId(),
        },
      ],
    },
  };

  // Sign the JWT
  const { JWT } = await import('google-auth-library');
  const token = await new JWT(
    (await client.getCredentials()).client_email,
    undefined,
    (await client.getCredentials()).private_key,
    ['https://www.googleapis.com/auth/wallet_object.issuer']
  ).sign(claims);

  return token;
}

/**
 * Generate a Google Wallet pass and return the save URL
 */
export async function generateGoogleWalletPass(): Promise<{ saveUrl: string; passId: string }> {
  const client = await getWalletClient();

  // Create/update the pass class (template)
  await createPassClass(client);

  // Create the pass object
  const passId = await createPassObject(client);

  // Generate JWT for the save link
  const jwt = await generateJwt(client, passId);

  // Build the save URL
  const saveUrl = client
    ? `https://pay.google.com/gp/v/save/${jwt}`
    : `https://pay.google.com/gp/v/save/demo?passId=${passId}`;

  return {
    saveUrl,
    passId,
  };
}

export { PASS_CONFIG };