// File: /app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChargilyClient } from 'chargily-epay-js';
 // Import your custom errors

// Reuse the existing createChargilyCheckoutSession function
async function createChargilyCheckoutSession(
  plan: { name: string; price: number },
  hotelId: string
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
    const amount = Math.round(plan.price); // Chargily might expect integers
    
    const checkoutData = {
      amount,
      currency: "dzd",
      success_url: `${process.env.SERVER_URL}/login`,
      failure_url: `${process.env.SERVER_URL}`,
      metadata: [{
        hotelId,
        planName: plan.name
      }]
    };
    
    const newCheckout = await client.createCheckout(checkoutData);
    if (!newCheckout || !newCheckout.checkout_url) {
      throw new Error("Réponse invalide de Chargily");
    }
    
    return newCheckout.checkout_url;
  } catch (error) {
    if (error instanceof NotFoundError) {
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
    const body = await request.json();
    const { plan, hotelId } = body;
    
    // Validate the required fields
    if (!plan || !hotelId) {
      return NextResponse.json(
        { error: 'Les détails du plan et l\'ID de l\'hôtel sont requis' },
        { status: 400 }
      );
    }
    
    // Create the Chargily checkout session
    const checkoutUrl = await createChargilyCheckoutSession(plan, hotelId);
    
    // Return the checkout URL for redirection
    return NextResponse.json({ checkoutUrl }, { status: 200 });
  } catch (error) {
    console.error('Payment error:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    } 
    
    // Generic error handling
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement du paiement' },
      { status: 500 }
    );
  }
}