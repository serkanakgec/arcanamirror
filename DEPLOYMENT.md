# 🚀 Deployment Guide for Arcana Mirror

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Required

Make sure these are set in your deployment platform:

```bash
VITE_GEMINI_API_KEY=AIzaSyClGx_XuExu6tINDJ77VUkQS6aQYpu7phg
VITE_SUPABASE_URL=https://gvytaocvehfkhtxtjswz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eXRhb2N2ZWhma2h0eHRqc3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDA0MTAsImV4cCI6MjA3NjAxNjQxMH0.t70bj-SYzVKj0-NF3Pfie6cVPvpM0-SNeZIjxSZEyLQ
```

### 2. Build Command
```bash
npm run build
```

### 3. Output Directory
```bash
dist
```

---

## 🌐 Platform-Specific Instructions

### Vercel Deployment

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Deploy Arcana Mirror"
git remote add origin https://github.com/YOUR_USERNAME/arcana-mirror.git
git push -u origin main
```

2. **Import to Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables in Settings → Environment Variables
   - Deploy!

### Netlify Deployment

1. **Push to GitHub** (same as above)

2. **Import to Netlify:**
   - Go to https://netlify.com
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables in Site settings → Environment variables
   - Deploy!

### Bolt.new Deployment

If you're using Bolt.new and it's not deploying:

1. **Make sure .env file exists:**
```bash
# Check if .env exists
cat .env
```

2. **Rebuild the project:**
```bash
npm run build
```

3. **If still having issues:**
   - The build is successful (check dist/ folder)
   - The issue is likely with Bolt.new's sync
   - Try refreshing the Bolt.new interface
   - Check if environment variables are visible in Bolt.new's settings

---

## 🔧 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:** Add environment variables to your deployment platform

### Issue: Build succeeds but deploy fails
**Solution:** Check that `dist` folder is being uploaded (not blocked by .gitignore on platform)

### Issue: App loads but Supabase doesn't work
**Solution:** Verify environment variables are set correctly on the platform

### Issue: Bolt.new won't update
**Solution:**
1. Check that build completed successfully
2. Verify .env file exists and has correct values
3. Try clearing browser cache
4. Check Bolt.new deployment logs

---

## 📊 Verify Deployment

After deployment, test these features:

✅ Language selector works
✅ Reference code validation works
✅ Card selection works
✅ Reading generation works (Gemini API)
✅ Reading download works
✅ All 14 languages display correctly

---

## 🎯 Admin Panel Setup

After deployment, upload `admin.html` to manage reference codes:

1. Open admin.html in browser
2. Enter your Supabase URL and Anon Key
3. Select reading type
4. Generate reference codes
5. Share codes with users

---

## 📝 Quick Deploy Checklist

- [ ] .env file has all 3 variables
- [ ] npm run build succeeds
- [ ] dist folder is created
- [ ] Environment variables added to platform
- [ ] Build command set to: npm run build
- [ ] Output directory set to: dist
- [ ] Deployment successful
- [ ] Test all features work

---

## 🆘 Need Help?

If deployment still fails:
1. Check build logs for errors
2. Verify all environment variables are set
3. Make sure Supabase credentials are correct
4. Test locally with `npm run dev` first
