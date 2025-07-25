import type { Metadata } from 'next';
import './globals.css';
import Header from 'src/components/section/header';

export const metadata: Metadata = {
    title: 'Sugimoto Challenge',
    description: 'Generated by mhmk',
};

function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}

export default RootLayout;
