import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();

    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    // Instead of processing payment, send order details to WhatsApp
    // Replace the placeholder with your actual implementation to send order details to WhatsApp
    const whatsappURL = `https://wa.me/${process.env.SELLER_PHONE_NUMBER}?text=${encodeURIComponent(JSON.stringify({ cartItems, customer }))}`;
    
    return NextResponse.redirect(whatsappURL); // Redirect to WhatsApp URL
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
