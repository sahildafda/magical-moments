# Uploads Folder

This folder is for storing user-uploaded photos and music files.

## Structure

```
uploads/
├── couple-name-1/
│   ├── music.mp3
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── couple-name-2/
│   ├── music.mp3
│   └── photos...
└── README.md (this file)
```

## Usage

### Adding Photos

1. Create a folder with the couple's names (same as JSON filename)
   Example: `rahul-anjali`

2. Add photos to this folder:
   - `photo1.jpg`, `photo2.jpg`, etc.
   - Or use descriptive names: `first-date.jpg`, `vacation.jpg`

3. Reference in JSON:
   ```json
   "photos": [
     "/uploads/rahul-anjali/photo1.jpg",
     "/uploads/rahul-anjali/photo2.jpg"
   ]
   ```

### Adding Music

1. Add MP3 file to couple's folder
2. Name it `music.mp3` or custom name
3. Reference in JSON:
   ```json
   "music": "/uploads/rahul-anjali/music.mp3"
   ```

## File Size Recommendations

### Photos
- **Max size**: 2MB per photo
- **Recommended**: 500KB - 1MB
- **Dimensions**: 1200x800 pixels (landscape) or 800x1200 (portrait)
- **Format**: JPG (best compression) or PNG (if transparency needed)

### Music
- **Max size**: 10MB
- **Recommended**: 3-5MB
- **Format**: MP3
- **Bitrate**: 128kbps - 192kbps (good balance of quality and size)

## Image Optimization Tools

Before uploading, compress images using:
- [TinyPNG](https://tinypng.com/) - Online compression
- [Squoosh](https://squoosh.app/) - Advanced options
- [ImageOptim](https://imageoptim.com/) - Mac app
- [Photopea](https://www.photopea.com/) - Free Photoshop alternative

## Alternative: Use External URLs

Instead of uploading files, you can use external image URLs:

```json
"photos": [
  "https://images.unsplash.com/photo-xyz",
  "https://i.imgur.com/yourimage.jpg",
  "https://yourdomain.com/photos/image.jpg"
]
```

### Recommended Image Hosting Services

1. **Unsplash** - Free high-quality stock photos
2. **Imgur** - Free image hosting
3. **Cloudinary** - Free tier with CDN
4. **Google Photos** - Share links (make sure they're public)
5. **Dropbox** - Public links

## Music Sources

### Free Royalty-Free Music
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/)
- [Bensound](https://www.bensound.com/)

### Note on Copyright
Make sure you have rights to use any music or photos you upload!

## Privacy & Security

- This folder is publicly accessible via the website
- Don't upload sensitive or private content
- Anyone with the URL can access these files
- Consider using password protection for very private sites

## Deployment

When deploying:
1. Upload this entire `uploads` folder to your hosting
2. Maintain the same folder structure
3. Verify all paths match in your JSON files

## .gitignore

The uploads folder is in `.gitignore` by default to prevent:
- Large files in Git repository
- Privacy issues with personal photos
- Repository size bloat

If you want to commit uploads, remove from `.gitignore`:
```
# /public/uploads  <- Comment out this line
```

## Troubleshooting

### Photos not showing
- Check file path matches exactly (case-sensitive)
- Verify file exists in the folder
- Check file extension (.jpg, .png, not .JPG, .PNG)
- View browser console for 404 errors

### Music not playing
- Verify MP3 format (not M4A, WAV, etc.)
- Check file path is correct
- Ensure file size is reasonable (<10MB)
- Remember: Browsers block auto-play

## Quick Example

To add photos for "john-sarah":

1. Create: `public/uploads/john-sarah/`
2. Add photos: `1.jpg`, `2.jpg`, `3.jpg`
3. Create: `src/data/john-sarah.json`
4. Add to JSON:
   ```json
   "photos": [
     "/uploads/john-sarah/1.jpg",
     "/uploads/john-sarah/2.jpg",
     "/uploads/john-sarah/3.jpg"
   ]
   ```
5. Visit: `http://localhost:3000/john-sarah`

That's it!

---

**Tip**: Start with external URLs (Unsplash, Imgur) for testing, then add your own photos later.
