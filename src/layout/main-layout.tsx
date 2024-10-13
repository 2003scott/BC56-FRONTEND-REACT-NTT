import { Footer } from "@/components/core/footer"
import { Navbar } from "@/components/core/navbar"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            <main className="container">
                {children}
            </main>
            <Footer />
        </>
    )
}
