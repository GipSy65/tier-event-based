import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
    title: 'Tier-Based Event Showcase',
    description: 'View events based on your user tier',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClerkProvider
                    appearance={{
                        elements: {
                            developerConsole: "hidden",
                            impersonationFab: "hidden",
                        },
                        layout: {
                            showOptionalFields: false,
                        }
                    }}
                    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
                >
                    <Navbar />
                    <main className="mt-20">{children}</main>
                </ClerkProvider>
            </body>
        </html>
    )
}
