# 💖 Romantic Surprise Website Template

A beautiful, modern, and fully customizable romantic surprise website built with React, Vite, and Framer Motion. Perfect for birthdays, anniversaries, proposals, or any special romantic occasion!

![Made with Love](https://img.shields.io/badge/Made%20with-Love-ff69b4)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-ff0055)

## ✨ Features

- 🎨 **Beautiful Modern Design** - Romantic gradients, elegant typography, and smooth animations
- 📱 **Fully Responsive** - Mobile-first design that looks gorgeous on all devices
- 🎬 **Stunning Animations** - Powered by Framer Motion for smooth, professional effects
- 🎵 **Background Music** - Auto-playing romantic music with controls
- 🖼️ **Photo Gallery** - Beautiful grid layout with modal view
- 📖 **Memory Timeline** - Vertical timeline to showcase your journey together
- 💌 **Love Letter Section** - Animated text for your heartfelt message
- 🎉 **Final Surprise** - Confetti and heart explosion effects
- 🔗 **Dynamic Routing** - URL-based couple identification (e.g., `/rahul-anjali`)
- 📝 **Easy Customization** - Simple JSON configuration for each couple

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download this project**

```bash
cd romantic-surprise-website
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:3000`

The default route will redirect to the sample surprise: `/rahul-anjali`

## 🎯 How to Create a New Surprise

### Step 1: Create a JSON File

Create a new JSON file in `src/data/` with the couple's names (e.g., `john-sarah.json`)

```json
{
  "boyName": "John",
  "girlName": "Sarah",
  "title": "Happy Birthday My Love ❤️",
  "message": "Your personalized romantic message here...",
  "music": "/uploads/john-sarah/music.mp3",
  "photos": [
    "/uploads/john-sarah/photo1.jpg",
    "/uploads/john-sarah/photo2.jpg",
    "/uploads/john-sarah/photo3.jpg"
  ],
  "timeline": [
    {
      "title": "First Meeting",
      "date": "2022-01-15",
      "description": "The day our story began..."
    }
  ]
}
```

### Step 2: Add Photos (Optional)

1. Create a folder in `public/uploads/` named after the couple (e.g., `john-sarah`)
2. Add your photos to this folder
3. Update the `photos` array in the JSON to reference these images

**Note:** You can also use external URLs (like Unsplash) for photos, as shown in the sample files.

### Step 3: Add Music (Optional)

1. Add an MP3 file to `public/uploads/[couple-name]/music.mp3`
2. Reference it in the JSON file

**Note:** Music auto-play may be blocked by browsers. Users will need to click the play button.

### Step 4: Access the Surprise

Visit: `http://localhost:3000/john-sarah`

The URL parameter should match your JSON filename (without `.json`)

## 📁 Project Structure

```
romantic-surprise-website/
├── public/
│   └── uploads/              # User-uploaded photos and music
├── src/
│   ├── components/
│   │   ├── Hero.jsx         # Landing section with names
│   │   ├── LoveLetter.jsx   # Animated love message
│   │   ├── Gallery.jsx      # Photo gallery with modal
│   │   ├── Timeline.jsx     # Memory timeline
│   │   ├── MusicPlayer.jsx  # Background music controls
│   │   ├── Surprise.jsx     # Final surprise with effects
│   │   └── Loading.jsx      # Loading screen
│   ├── pages/
│   │   └── LovePage.jsx     # Main page component
│   ├── data/
│   │   ├── rahul-anjali.json    # Sample 1
│   │   ├── sahil-riya.json      # Sample 2
│   │   └── amit-priya.json      # Sample 3
│   ├── App.jsx
│   ├── main.jsx
│   ├── router.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customization Guide

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'rose': {
    // Your custom color palette
  }
}
```

### Fonts

The project uses Google Fonts:
- **Display**: Playfair Display (headings)
- **Script**: Dancing Script (romantic text)
- **Body**: Poppins (body text)

Change these in `index.html` and `tailwind.config.js`

### Animations

All animations are built with Framer Motion. Customize in individual component files.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

## 📋 Sample URLs

The project includes three sample surprises:

- `/rahul-anjali` - Birthday surprise
- `/sahil-riya` - Anniversary celebration
- `/amit-priya` - Marriage proposal

## 🎭 Features Breakdown

### 1. Hero Section
- Full-screen landing
- Animated floating hearts
- Gradient orbs
- Smooth scroll indicator

### 2. Love Letter
- Word-by-word text animation
- Glass morphism card
- Decorative borders

### 3. Photo Gallery
- Responsive grid layout
- Hover effects
- Full-screen modal view
- Smooth transitions

### 4. Memory Timeline
- Vertical timeline design
- Alternating left/right layout
- Animated entrance
- Date formatting

### 5. Music Player
- Fixed position controls
- Play/pause functionality
- Mute/unmute option
- Animated music notes

### 6. Final Surprise
- Confetti explosion
- Heart burst animation
- Reveal message
- Interactive trigger

## 🔧 Troubleshooting

### Music not playing automatically
- Browsers block auto-play. Users need to click the play button.
- This is a browser security feature and cannot be bypassed.

### Images not loading
- Check file paths in JSON
- Ensure images exist in `public/uploads/`
- Verify image URLs are correct

### 404 on refresh
- Configure your hosting for SPA routing
- For Netlify: Add `_redirects` file with `/* /index.html 200`
- For Vercel: This is handled automatically

## 📱 Mobile Optimization

The entire website is built mobile-first:
- Touch-friendly buttons
- Optimized image sizes
- Responsive typography
- Smooth scrolling on mobile

## 🎯 Pro Tips

1. **Optimize Images**: Compress photos before uploading for faster load times
2. **Test on Mobile**: Always test on actual mobile devices
3. **Personalize**: Add more timeline events for a richer story
4. **Music Selection**: Choose a song that's meaningful to the couple
5. **Message Length**: Keep the love letter concise but heartfelt

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal use.

## 💝 Credits

- Built with [React](https://react.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 🎉 Special Thanks

Thank you for using this template to create something special for someone you love!

---

**Made with ❤️ for spreading love and happiness**

Remember: The best surprises come from the heart. Customize this template to make it uniquely yours!
