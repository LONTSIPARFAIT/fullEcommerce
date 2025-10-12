import { Head } from "@inertiajs/react";

interface EcommerceLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function ({ children, title = "R-Mart" }: EcommerceLayoutProps) {
  return (
    <>
      <Head >
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="R-Mark - Your one-stop online shopping destination" />
      </Head>
      <main className="ecom-content">
        {children}
      </main>
      <footer className="ecom-footer">
        <p>&copy; 2025 </p>
      </footer>

    </>
  );
}