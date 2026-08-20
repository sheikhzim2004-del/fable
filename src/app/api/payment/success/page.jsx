import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CircleCheckFill, Envelope, ArrowRight } from '@gravity-ui/icons'
import { payment } from '@/lib/actions/payment';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        console.log("metadata", metadata)

        const pay_data = await payment({...metadata, session_id})

        console.log("pay data",pay_data)
        // TODO: send `metadata` to backend here (e.g. await saveOrder(metadata))

        return (
            <section
                id="success"
                className="flex min-h-[80vh] items-center justify-center px-4 py-16"
            >
                <div className="w-full max-w-md rounded-3xl border border-border-color bg-bg-secondary p-8 text-center shadow-xl sm:p-10">
                    <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent-success/10">
                        <CircleCheckFill className="size-9 text-accent-success" />
                    </div>

                    <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
                        Payment Successful!
                    </h1>

                    <p className="mb-6 text-sm text-text-secondary sm:text-base">
                        We appreciate your business! A confirmation email will be sent to{' '}
                        <span className="font-medium text-text-primary">{customerEmail}</span>.
                    </p>

                    <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-border-color bg-bg-primary px-4 py-3 text-sm text-text-secondary">
                        <Envelope className="size-4 shrink-0" />
                        <span>
                            Questions? Email{' '}
                            <a
                                href="mailto:orders@example.com"
                                className="font-medium text-brand-primary hover:underline"
                            >
                                orders@example.com
                            </a>
                        </span>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        Back to Home
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        )
    }
}
