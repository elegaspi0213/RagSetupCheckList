# RAG Workflow Setup - Kanban Board

A beautiful, interactive Kanban board to track your progress setting up the n8n RAG workflow with Google Drive and Supabase.

## Features

- 🎯 Drag & drop cards between columns
- 📦 Compact Trello-style card design
- 🎨 Color-coded categories and priorities
- 📊 Real-time progress tracking
- 💾 Task state persists in browser
- 📱 Responsive design

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site will be live in ~2 minutes

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - What's your project's name? (Press enter for default)
   - In which directory is your code located? ./
   - Deploy? Yes

4. **Done!** Your site is now live

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
rag-setup-kanban/
├── app/
│   ├── page.js          # Main Kanban board component
│   ├── layout.js        # Root layout
│   └── globals.css      # Global styles
├── public/              # Static assets
├── package.json         # Dependencies
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
└── postcss.config.js    # PostCSS config
```

## Technologies Used

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vercel** - Hosting

## Customization

### Add More Tasks

Edit `app/page.js` and add tasks to the `useState` array:

```javascript
{ 
  id: 24, 
  title: 'Your New Task', 
  status: 'todo', 
  category: 'Your Category', 
  details: 'Task instructions', 
  priority: 'high' 
}
```

### Change Colors

Modify the color schemes in `app/page.js`:

```javascript
const categoryColors = {
  'Your Category': 'bg-blue-500',
  // ...
};
```

## Browser Storage

Task progress is automatically saved to `localStorage`, so your progress persists even after closing the browser.

## Support

For issues or questions, create an issue on GitHub.

## License

MIT License - feel free to use this for your own projects!
