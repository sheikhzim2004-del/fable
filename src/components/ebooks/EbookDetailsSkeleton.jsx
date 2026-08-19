export default function EbookDetailsSkeleton() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <div className="aspect-[3/4] w-full rounded-2xl bg-bg-secondary/60 border border-border-main" />
                </div>
                <div className="flex flex-col gap-4 lg:col-span-7">
                    <div className="h-6 w-24 rounded-lg bg-bg-secondary/80" />
                    <div className="h-10 w-3/4 rounded-xl bg-bg-secondary" />
                    <div className="h-5 w-1/3 rounded-lg bg-bg-secondary/60" />
                    <div className="my-2 h-px w-full bg-border-main" />
                    <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-bg-secondary/60" />
                        <div className="h-4 w-5/6 rounded bg-bg-secondary/60" />
                        <div className="h-4 w-4/6 rounded bg-bg-secondary/60" />
                    </div>
                    <div className="mt-6 h-14 w-full rounded-xl bg-bg-secondary/80" />
                </div>
            </div>
        </div>
    );
}