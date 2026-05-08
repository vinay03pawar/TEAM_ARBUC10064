# Installation Guide

Complete step-by-step instructions to get MindCare running on your laptop.

## Prerequisites

Before you begin, make sure you have:

### Required Software
- **Node.js** (version 16 or higher)
  - Download from: https://nodejs.org/
  - Choose the LTS (Long Term Support) version
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
  - Should be version 8 or higher

### Optional but Recommended
- **VS Code** - Code editor
  - Download from: https://code.visualstudio.com/
- **Git** - Version control
  - Download from: https://git-scm.com/

## Step-by-Step Installation

### Step 1: Extract the Files

1. Locate the downloaded ZIP file (e.g., `mindcare-app.zip`)
2. Right-click the file
3. Select "Extract All" or "Extract Here"
4. Choose a destination folder (e.g., `C:\Projects\` or `~/Projects/`)
5. You should now have a folder named `mindcare-app` (or similar)

### Step 2: Open Terminal/Command Prompt

**On Windows:**
- Press `Win + R`
- Type `cmd` and press Enter
- Or search for "Command Prompt" in Start Menu

**On Mac:**
- Press `Cmd + Space`
- Type "Terminal" and press Enter
- Or find Terminal in Applications > Utilities

**On Linux:**
- Press `Ctrl + Alt + T`
- Or search for "Terminal" in your applications

### Step 3: Navigate to Project Folder

In the terminal, use the `cd` (change directory) command:

**Windows Example:**
```bash
cd C:\Projects\mindcare-app
```

**Mac/Linux Example:**
```bash
cd ~/Projects/mindcare-app
```

**Verify you're in the right place:**
```bash
dir          # Windows
ls           # Mac/Linux
```

You should see files like `package.json`, `README.md`, etc.

### Step 4: Install Dependencies

This downloads all required packages:

```bash
npm install
```

**What this does:**
- Reads `package.json`
- Downloads React, TypeScript, Vite, Tailwind, etc.
- Creates `node_modules` folder
- Creates `package-lock.json` file

**Expected output:**
```
added 93 packages, and audited 137 packages in 15s
18 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
```

**Time taken:** 30 seconds to 2 minutes (depending on internet speed)

### Step 5: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
VITE v7.3.2  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**What this means:**
- ✅ Server is running
- ✅ App is ready
- ✅ Visit http://localhost:5173 in your browser

### Step 6: Open in Browser

1. Open your favorite browser (Chrome, Firefox, Edge, Safari)
2. Go to: `http://localhost:5173`
3. You should see the MindCare app!

**First time you'll see:**
- Beautiful gradient background
- Header with "MindCare" logo
- "Track Mood" tab (default view)
- Mood selection interface

## Troubleshooting Installation

### Problem: "node is not recognized"

**Solution:**
- Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation
- Try again: `node --version`

### Problem: "npm is not recognized"

**Solution:**
- npm should come with Node.js
- Reinstall Node.js
- Make sure to check "Add to PATH" during installation
- Restart terminal

### Problem: Permission errors on Mac/Linux

**Solution:**
```bash
sudo npm install
# Or
sudo npm run dev
```

**Better solution (avoid sudo):**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Problem: Port 5173 is already in use

**Solution:**
```bash
# Kill the process using that port
# Or Vite will automatically use a different port
# Check terminal output for the actual port
```

### Problem: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
# OR
rmdir /s node_modules                  # Windows
del package-lock.json                  # Windows

# Reinstall
npm install
```

### Problem: Build errors after installation

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete everything and start fresh
rm -rf node_modules package-lock.json
npm install
```

## Getting Your Groq API Key

### Step 1: Create Groq Account

1. Visit: https://console.groq.com
2. Click "Sign Up" (top right)
3. Options:
   - Sign up with Google
   - Sign up with GitHub
   - Sign up with email
4. Choose your preferred method
5. Complete registration

### Step 2: Access API Keys

1. After logging in, you'll see the Groq Console
2. Look for "API Keys" in the left sidebar
3. Click on "API Keys"

### Step 3: Create API Key

1. Click "Create API Key" button
2. Give it a name (e.g., "MindCare")
3. Click "Create"
4. **IMPORTANT:** Copy the key immediately!
5. You won't be able to see it again

**API Key format:**
```
gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 4: Add to MindCare

1. Open MindCare in your browser
2. Click "Settings" tab (⚙️ icon)
3. Paste your API key in the input field
4. Click "Save"
5. You should see "✓ Saved"

### Step 5: Test AI Features

1. Go to "AI Support" tab
2. Click "Get Insights" button
3. AI should respond (may take 5-10 seconds first time)
4. Try typing a message and pressing Enter
5. AI should chat with you

## Verifying Installation

### ✅ Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] npm installed (`npm --version` works)
- [ ] Files extracted
- [ ] Navigated to project folder
- [ ] `npm install` completed successfully
- [ ] `npm run dev` started server
- [ ] Browser shows app at localhost:5173
- [ ] Can select mood and save entry
- [ ] Entry appears in mood history
- [ ] Can switch between tabs
- [ ] Groq API key added (for AI features)
- [ ] AI responds to messages

### Test Each Feature

1. **Mood Tracking:**
   - Select a mood (e.g., "Good")
   - Move intensity slider
   - Click some activities
   - Add a note
   - Click "Save Mood Entry"
   - Entry should appear below

2. **Analytics:**
   - Click "Analytics" tab
   - Should see stats cards
   - Charts will show after multiple entries
   - Add 3-4 entries to see trends

3. **AI Support:**
   - Click "AI Support" tab
   - Add API key if not done
   - Click "Get Insights"
   - Wait for AI response
   - Try chatting

4. **Settings:**
   - Click "Settings" tab
   - See API key field
   - Read instructions
   - Test show/hide toggle

## Running the App Later

### To Run Again:

1. **Open terminal**
2. **Navigate to project:**
   ```bash
   cd path/to/mindcare-app
   ```
3. **Start server:**
   ```bash
   npm run dev
   ```
4. **Open browser:**
   - Go to http://localhost:5173

### To Stop the Server:

- Press `Ctrl + C` in the terminal
- Confirm with `Y` if asked

### Your Data:

- Data is saved in browser localStorage
- Survives server restarts
- Available next time you run the app
- Tied to specific browser/device

## Building for Production

### Create Deployable Build:

```bash
npm run build
```

**Output:**
- Creates `dist` folder
- Contains optimized `index.html`
- Ready to deploy to web server
- See DEPLOYMENT.md for hosting options

## What's Using Resources?

### Disk Space:
- **node_modules**: ~100-150 MB (dependencies)
- **Source code**: ~1-2 MB
- **Build output**: ~650 KB (optimized)

### Memory:
- **Development server**: ~100-200 MB RAM
- **Browser tab**: ~50-100 MB RAM

### Network:
- **First install**: ~50-100 MB download
- **AI requests**: ~1-5 KB per message

## Updating the App

If you make changes to the code:

### Option 1: Auto-Reload (Dev Mode)
- Changes auto-refresh
- Just save your file
- Browser updates automatically

### Option 2: Restart Server
```bash
# Stop server (Ctrl + C)
# Start again
npm run dev
```

### Option 3: Clear Everything
```bash
# Delete builds
rm -rf dist

# Rebuild
npm run build
```

## Uninstalling

### To Remove MindCare:

1. **Stop the server** (Ctrl + C)
2. **Close terminal**
3. **Delete the project folder**
   - The entire `mindcare-app` directory
4. **That's it!**

### To Keep Your Data:

Data is in browser, not project files:
- Deleting project folder won't delete your mood entries
- To clear data: Browser settings > Clear browsing data > localStorage

## Additional Resources

### Learn More:
- **Node.js**: https://nodejs.org/en/docs/
- **npm**: https://docs.npmjs.com/
- **Vite**: https://vite.dev/guide/
- **React**: https://react.dev/learn

### Get Help:
- Check QUICK_START.md for common issues
- Read README.md for project overview
- Review FEATURES.md for feature guide
- See DEPLOYMENT.md for hosting

## Support

### Common Questions:

**Q: Do I need to install every time?**
A: No! Only first time. After that, just `npm run dev`

**Q: Can I close the terminal?**
A: Closing terminal stops the server. Keep it open while using the app.

**Q: Is this safe?**
A: Yes! All code is local. Check the source code anytime.

**Q: Does it need internet?**
A: Only for AI features. Mood tracking works offline.

**Q: How do I share with friends?**
A: Deploy it (see DEPLOYMENT.md) or have them install it too.

---

**You're all set!** Enjoy using MindCare! 💙

For quick reference, always remember:
```bash
cd mindcare-app
npm run dev
```

Then visit: http://localhost:5173
