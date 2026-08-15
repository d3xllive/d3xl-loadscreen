# 🚀 D3XL SCRIPTS • Loading Screen V4

<div align="center">

![FiveM](https://img.shields.io/badge/FiveM-Loading_Screen-36FF9F?style=for-the-badge&logo=fivem&logoColor=black)
![Standalone](https://img.shields.io/badge/Standalone-Zero_Dependencies-ff0055?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-4.0.0-0a0e14?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-36FF9F?style=for-the-badge)

**Ultra modern, standalone FiveM loading screen with YouTube music, dynamic video backgrounds, interactive keyboard bindings, and full config support.**

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎥 **3 Background Modes** | MP4 Video, YouTube Video, or Photo Slideshow — switchable in-game |
| 🎵 **YouTube Music Player** | Add any YouTube link — title & cover auto-fetched automatically |
| ⌨️ **Interactive Keyboard** | Full keyboard layout with clickable keybind descriptions |
| 📰 **Image Update Cards** | Patch notes with images, titles and dates |
| 🖼️ **Gallery Modal** | Server screenshot gallery with slideshow support |
| 👥 **Staff Showcase** | Dynamic staff team cards with avatars and roles |
| 📜 **Server Rules** | Configurable rules list in a clean modal |
| ⚙️ **Live Settings Panel** | Players can adjust volume, background mode, blur — saved to localStorage |
| 🔊 **Click Sound FX** | Web Audio API click sounds (can be toggled off) |
| 💾 **Persistent Settings** | All player preferences saved across server visits |
| 🎮 **FiveM NUI Auto-Start** | Music auto-starts on load, player name auto-detected, real loading progress |
| 📱 **Fully Responsive** | Works at any resolution / FiveM CEF window size |

---

## 🗂️ File Structure

```
fivem-d3xl-loadscreen/
├── fxmanifest.lua   ← FiveM resource manifest
├── index.html       ← Main loading screen layout
├── style.css        ← All styles (tgiann.com inspired palette)
├── config.js        ← 🔧 ALL customization here (music, video, staff, rules...)
└── app.js           ← Logic engine (YouTube API, FiveM NUI, settings)
```

---

## ⚙️ Configuration (`config.js`)

> **You only need to edit `config.js`.** No HTML or CSS knowledge required.

### 🎥 Background

```javascript
backgroundType: "video",    // "video" | "youtube" | "photo"
videoUrl: "videos/bg.mp4", // local file or CDN link
youtubeVideoId: "OV88I5g_oJc", // YouTube link or video ID
```

### 🎵 Music Playlist

```javascript
playlist: [
    // YouTube: title & cover auto-fetched — just add the link!
    { type: "youtube", youtubeId: "OV88I5g_oJc" },
    { type: "youtube", youtubeId: "https://www.youtube.com/watch?v=xxxx" },

    // Or direct MP3
    { type: "mp3", title: "Track Name", artist: "Artist", src: "music/track.mp3" }
]
```

### 🖼️ Gallery & Slideshow

```javascript
gallery: [
    { url: "https://yourserver.com/screenshot1.jpg", caption: "Bank Heist" },
    { url: "https://yourserver.com/screenshot2.jpg", caption: "Car Meet" },
]
```
> Gallery images are used **both** as background slideshow (photo mode) and inside the Gallery modal.

### 📰 Update Cards

```javascript
updates: [
    { title: "New Mission System!", desc: "...", date: "05.18.25", image: "https://..." },
]
```

### 👥 Staff Team

```javascript
staff: [
    { name: "d3xl", role: "Kurucu & Developer", color: "#ff0055", avatarLetter: "D" },
]
```

### 📜 Rules

```javascript
rules: [
    { title: "No Metagaming", desc: "...", icon: "fa-triangle-exclamation", color: "text-danger" },
]
```

---

## 🚀 FiveM Installation

1. Download or clone this repository
2. Place the `fivem-d3xl-loadscreen` folder inside your server's `resources/` directory
3. Add to your `server.cfg`:
   ```
   ensure fivem-d3xl-loadscreen
   ```
4. Edit `config.js` with your server info
5. Restart your server — done! ✅

---

## 🎮 FiveM NUI Events

The loading screen automatically handles these FiveM events:

| Event | Effect |
|---|---|
| `loadProgress` | Updates loading % bar + auto-starts music on first event |
| `playerName` | Displays player's Steam/FiveM account name automatically |
| `startFade` | Sets loading to 100%, hides spinner |
| `shutdown` | Smooth fade-out when loading screen closes |

---

## 🎨 Color Palette

Inspired by [tgiann.com](https://www.tgiann.com/tr):

| Token | Value | Use |
|---|---|---|
| `--accent` | `#36FF9F` | Neon Mint — buttons, highlights, borders |
| `--bg-dark` | `#0a0e14` | Deep Space Black — background |
| `--cyan` | `#00f0ff` | Info accents |
| `--pink` | `#ff0055` | Danger / Founder badges |

---

## 📦 Local Preview (Development)

```bash
# Serve the folder with any static server
npx serve .
# or
python -m http.server 3001
```

Open `http://localhost:3001` in your browser.

---

## 📝 License

MIT © 2026 **d3xl / D3XL SCRIPTS**

---

<div align="center">
  Made with ❤️ by <strong>d3xl</strong> — D3XL SCRIPTS FiveM Community
</div>
