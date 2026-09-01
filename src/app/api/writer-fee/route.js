import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"; // stripe instance
import { headers } from "next/headers";
import { getUserSession } from "@/lib/session";

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const formData = await req.formData()

        const user = await getUserSession();

        const userId = user?.id;
        const userEmail = formData.get("email") || user?.email;
        const userName = formData.get("name") || user?.name;

        if (!userId || !userEmail) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Writer Account Activation Fee",
                            description: "One-time registration fee for publishing ebooks",
                        },
                        unit_amount: 1000, // $10.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: userEmail,
            metadata: {
                userId,
                userEmail,
                userName: userName || "Writer",
                type: "writer_fee_activation",
            },
            success_url: `${origin}/api/writer-fee/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard/writer/verify`,
        });

        return NextResponse.redirect(session.url, 303)
    } catch (error) {
        console.error("Stripe Writer Checkout Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}