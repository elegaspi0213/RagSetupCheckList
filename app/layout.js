import './globals.css'

export const metadata = {
  title: 'RAG Workflow Setup - Task Board',
  description: 'Track your progress setting up the n8n RAG workflow with Google Drive and Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
