import Footer from "@/components/ecommerces/Footer";
import Header from "@/components/ecommerces/Header";
import { Head } from "@inertiajs/react";

interface EcommerceLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function EcomLayout({ children, title = "R-Mart" }: EcommerceLayoutProps) {
  return (
    <>
      <Head >
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="R-Mark - Your one-stop online shopping destination" />
        <meta name="keywords" content="ecommerce - online shopping, electronics, fashion, groceries" />
        <meta name="author" content="R-Mark Team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* <main className="container mx-auto px-4 py-8"> */}
        <main>
            {children}
        </main>
        <Footer />
      </div>
      <footer className="ecom-footer">
        <p>&copy; 2025 </p>
      </footer>

    </>
  );
}
