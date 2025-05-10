// File: /app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChargilyClient } from '@chargily/chargily-pay';
 // Import your custom errors

// Reuse the existing createChargilyCheckoutSession function
async function createChargilyCheckoutSession(
 
): Promise<string> {
  try {
    const apiSecretKey = process.env.CHARGILY_SECRET_KEY;
    if (!apiSecretKey) {
      throw new Error("La clé secrète Chargily n'est pas définie");
    }
    const client = new ChargilyClient({
      api_key: apiSecretKey,
      mode: 'test'
    });
    
    // Ensure price is a valid number and convert to DZD if needed
     // Chargily might expect integers
    
    const checkoutData = {
      amount:5000,
      currency: "dzd",
      success_url: `${process.env.SERVER_URL}/login`,
      failure_url: `${process.env.SERVER_URL}`,
      
    };
    
    const newCheckout = await client.createCheckout(checkoutData);
    if (!newCheckout || !newCheckout.checkout_url) {
      throw new Error("Réponse invalide de Chargily");
    }
    
    return newCheckout.checkout_url;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    // Include error details in the thrown error
    const errorMessage = (error instanceof Error) ? error.message : 'Erreur inconnue';
    throw new Error(
      `Échec de création de la session de paiement Chargily: ${errorMessage}`
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    
    // Parse the request body
    
    
    // Create the Chargily checkout session
    const checkoutUrl = await createChargilyCheckoutSession();
     console.log(checkoutUrl)
    
    // Return the checkout URL for redirection
    return NextResponse.json({ 
        success: true,
        checkoutUrl: checkoutUrl 
      }, { status: 200 });

    } catch (error) {
      console.error('Payment error:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        return NextResponse.json({ 
          success: false, 
          error: error.message 
        }, { status: 404 });
      } else if (error instanceof Error) {
        return NextResponse.json({ 
          success: false, 
          error: error.message 
        }, { status: 400 });
      }
      
      // Generic error handling
      return NextResponse.json({
        success: false,
        error: 'Une erreur est survenue lors du traitement du paiement'
      }, { status: 500 });
    }
  }