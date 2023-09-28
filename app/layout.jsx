import Nav from "@components/Nav"
import Provider from "@components/Provider"
import "@styles/globals.css"
import ThemeContextProvider from "@context/ThemeContextProvider"

export const metadata = {
    title: "promptopia",
    description: "Discover & Share AI Prompts"
}

function RootLayout({children}) {
  return (
    <html lang="en">
        <head>
            <link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg" />
        </head>
        <body>
            <Provider>
                <ThemeContextProvider>
                    <div className="main">
                        <div className="gradient"/>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </ThemeContextProvider>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout