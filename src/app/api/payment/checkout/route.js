import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/session';


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const formData = await request.formData();

        const user = await getUserSession();

        const price = formData.get('price');
        const title = formData.get('title');
        const bookId = formData.get('bookId');
        const writer = formData.get('writer');
        const coverImage = formData.get('coverImage');
        const genre = formData.get('genre');
        const userId = user.id;



        console.log("payment init")
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title
                        },
                        unit_amount: Number(price) * 100
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
                bookId,
                title,
                price,
                writer,
                coverImage, 
                genre
                // price: 200
            },
            mode: 'payment',
            success_url: `${origin}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        console.log("Success Metadata:", session.metadata)
        // console.log("session", session)
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}




// demo card number = 4242 4242 4242 4242