# 🔧 Configuration Guide

All customization is done inside **`config.js`**. You do not need to touch HTML or CSS.

## 📌 Config Options Reference

```javascript
const Config = {
    // --- Server & Branding Info ---
    serverName: "D3XL SCRIPTS",
    serverSlogan: "Best Roleplay Experience",
    serverVersion: "v3.4 HardRP",
    welcomeText: "Welcome To Server",
    defaultUsername: "Oyuncu",

    // --- Background Mode ---
    backgroundType: "video", // "video" | "youtube" | "photo"
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-42636-large.mp4",
    youtubeVideoId: "OV88I5g_oJc",
    defaultVolume: 0.4,

    // --- Music Playlist ---
    playlist: [
        { type: "youtube", youtubeId: "OV88I5g_oJc" },
        { type: "mp3", title: "Electronic Trap", artist: "D3XL Beats", src: "https://...mp3" }
    ],

    // --- Staff Team ---
    staff: [
        { name: "d3xl", role: "Kurucu & Developer", color: "#ff0055", avatarLetter: "D" },
        { name: "G-Family", role: "Head Admin", color: "#36FF9F", avatarLetter: "G" }
    ],

    // --- Server Rules ---
    rules: [
        { title: "Metagaming Yasaktır", desc: "...", icon: "fa-triangle-exclamation", color: "text-danger" }
    ],

    // --- Gallery Photos ---
    gallery: [
        { url: "https://...", caption: "Lüks Araç Galerisi" }
    ]
};
```
