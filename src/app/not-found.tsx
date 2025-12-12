import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center text-center gap-6 px-4">
            <h1 className="text-9xl font-extrabold text-primary/20">404</h1>
            <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
            <Button asChild size="lg">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}
