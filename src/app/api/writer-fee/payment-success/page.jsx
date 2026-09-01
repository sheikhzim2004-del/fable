import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Envelope, ArrowRight } from '@gravity-ui/icons'
import {  writerFee } from '@/lib/actions/payment'

export default async function WriterPaymentSuccess({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    const {
        status,
        metadata,
        customer_details
    } = session;

    const customerEmail = customer_details?.email || metadata?.userEmail;

    if (status === 'open') {
        return redirect('/dashboard/writer');
    }

    if (status === 'complete') {

        //  console.log("metadata", metadata)
        // 1. database userke writer hishebe update korar surver action
        await writerFee({
            ...metadata,
            session_id,
            customerEmail,
            type: 'writer_fee_activation'
        });


        return (
            <section
                id="success"
                className="flex min-h-[80vh] items-center justify-center px-4 py-16"
            >
                <div className="w-full max-w-md rounded-3xl border border-border-color bg-bg-secondary p-8 text-center shadow-xl sm:p-10">
                    {/* success icon */}
                    <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent-success/10 text-accent-success">
                        <ShieldCheck className="size-9" />
                    </div>

                    <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
                        Account Activated!
                    </h1>

                    <p className="mb-6 text-sm text-text-secondary sm:text-base">
                        Your payment was successful. You now have full access to publish and manage your ebooks. Confirmation sent to{' '}
                        <span className="font-medium text-text-primary">{customerEmail}</span>.
                    </p>

                    <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-border-color bg-bg-primary px-4 py-3 text-sm text-text-secondary">
                        <Envelope className="size-4 shrink-0" />
                        <span>
                            Questions? Email{' '}
                            <a
                                href="mailto:sheikhzim2004@gmail.com"
                                className="font-medium text-brand-primary hover:underline"
                            >
                                sheikhzim2004@gmail.com
                            </a>
                        </span>
                    </div>

                    {/* dashboard link */}
                    <Link
                        href="/dashboard/writer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 shadow-md"
                    >
                        Go to Writer Dashboard
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        );
    }
}