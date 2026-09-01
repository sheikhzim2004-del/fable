"use client";

import { Button } from "@heroui/react";
import { ShoppingBag, ShieldCheck } from "@gravity-ui/icons";

export default function WriterVerifyPage({ currentUser }) {
    console.log("currentUser", currentUser)

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full rounded-3xl border border-border-main bg-bg-secondary p-8 text-center shadow-lg space-y-6">
                <div className="size-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto text-brand-primary">
                    <ShieldCheck className="size-8" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-text-primary">Activate Writer Account</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Pay a one-time publishing fee of <strong className="text-text-primary">$10</strong> to unlock your writer dashboard, publish unlimited ebooks, and start earning.
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-bg-primary border border-border-main flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-text-secondary">One-time Fee</span>
                    <span className="text-2xl font-black text-accent-success">$10.00</span>
                </div>

                <form
                action="/api/writer-fee"
                method="POST"
                className="w-full sm:flex-1"
                >
                    <input defaultValue={currentUser?.email} name="email" type="hidden"></input>
                    <input defaultValue={currentUser?.name} name="name" type="hidden"></input>
                <Button
                    type="submit"
                    className="w-full font-bold rounded-xl text-white shadow-md"
                >
                    <ShoppingBag className="size-5" />
                    Pay $10 & Activate
                </Button>
                </form>
            </div>
        </div>
    );
}