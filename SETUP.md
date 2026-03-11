# 🚀 Quick Setup Instructions

Follow these simple steps to get your romantic surprise website running:

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router
- Framer Motion
- Tailwind CSS
- Vite

## Step 2: Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Step 3: View the Sample Surprise

Open your browser and navigate to:
- `http://localhost:3000/rahul-anjali` (Birthday surprise)
- `http://localhost:3000/sahil-riya` (Anniversary)
- `http://localhost:3000/amit-priya` (Proposal)

## Step 4: Create Your Own Surprise

### Option A: Edit Sample File

1. Open `src/data/rahul-anjali.json`
2. Change the names, message, and timeline
3. Save and refresh the browser

### Option B: Create New File

1. Create `src/data/your-names.json`
2. Copy the structure from any sample file
3. Customize all fields
4. Visit `http://localhost:3000/your-names`

## JSON Structure Explained

```json
{
  "boyName": "Your Name",           // First person's name
  "girlName": "Their Name",         // Second person's name
  "title": "The Main Title",        // Headline on love letter
  "message": "Your message...",     // The love letter text
  "music": "/path/to/music.mp3",    // Optional background music
  "photos": [                        // Array of photo URLs
    "url1.jpg",
    "url2.jpg"
  ],
  "timeline": [                      // Array of timeline events
    {
      "title": "Event Name",
      "date": "2023-01-15",          // Format: YYYY-MM-DD
      "description": "What happened..."
    }
  ]
}
```

## Adding Your Photos

### Method 1: Use External URLs (Easiest)

Use image URLs from Unsplash, Imgur, or your cloud storage:

```json
"photos": [
  "https://images.unsplash.com/photo-xyz?w=800",
  "https://i.imgur.com/yourimage.jpg"
]
```

### Method 2: Upload to Project

1. Create folder: `public/uploads/your-names/`
2. Add photos: `photo1.jpg`, `photo2.jpg`, etc.
3. Reference in JSON:

```json
"photos": [
  "/uploads/your-names/photo1.jpg",
  "/uploads/your-names/photo2.jpg"
]
```

## Adding Background Music

1. Create folder: `public/uploads/your-names/`
2. Add your MP3: `music.mp3`
3. Reference in JSON:

```json
"music": "/uploads/your-names/music.mp3"
```

**Note:** Browsers block auto-play. Users must click play button.

## Common Issues & Solutions

### Issue: Page shows 404
**Solution:** Make sure your JSON filename matches the URL exactly.
- File: `src/data/john-sarah.json`
- URL: `http://localhost:3000/john-sarah`

### Issue: Images not showing
**Solution:** 
- Check file path is correct
- Ensure image is in `public/uploads/` folder
- Or use full external URLs

### Issue: Music not playing
**Solution:** 
- Click the play button (browser security blocks auto-play)
- Ensure MP3 file exists at the specified path
- Check browser console for errors

## Building for Production

```bash
npm run build
```

Output will be in `dist/` folder - ready to deploy!

## Deployment Options

### Netlify (Recommended)
1. Push to GitHub
2. Import to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
```bash
npm i -g vercel
vercel
```

### Traditional Hosting
Upload contents of `dist/` folder to your web host.

## Customization Tips

### Change Colors
Edit `tailwind.config.js` - look for the `colors` section

### Change Fonts
Edit `index.html` - update Google Fonts links
Edit `tailwind.config.js` - update font family

### Modify Animations
Edit individual component files in `src/components/`
All animations use Framer Motion

### Add More Sections
1. Create new component in `src/components/`
2. Import in `src/pages/LovePage.jsx`
3. Add to the page layout

## Need Help?

Check the main README.md for detailed documentation!

## 🎉 You're Ready!

Everything is set up and ready to create your romantic surprise.
Just customize the JSON file and share the link with your loved one!

**Pro Tip:** Test on your phone before sharing - most people will open it on mobile!

---

Made with ❤️ - Enjoy creating something special!
