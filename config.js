/* ==========================================================================
   D3XL FiveM Loading Screen V4 - Configuration File
   
   🎵 Müzik: YouTube linki veya direkt MP3 linki ekleyebilirsiniz
   🎥 Arka Plan: YouTube linki, direkt MP4 linki veya lokal dosya yolu
   ========================================================================== */

const Config = {
    // --- Server & Branding Info ---
    serverName: "D3XL SCRIPTS",
    serverSlogan: "Best Roleplay Experience",
    serverVersion: "v3.4 HardRP",
    welcomeText: "Welcome To Server",
    defaultUsername: "Oyuncu",

    // --- Background Media Configuration ---
    // "video"   → Lokal/CDN MP4 dosyası (EN STABIL - Önerilen)
    // "youtube" → YouTube videosu (Ayarlardan da değiştirilebilir)
    // "photo"   → Galeri fotoğrafları slayt olarak döner
    backgroundType: "video",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-42636-large.mp4",
    youtubeVideoId: "OV88I5g_oJc",  // Ayarlardan YouTube modu seçilince bu video arka planda oynar
    posterImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920",
    defaultVolume: 0.4,

    // --- Social Media Links ---
    socials: {
        discord: "https://discord.gg/d3xl",
        twitter: "https://twitter.com/d3xl",
        linkedin: "https://linkedin.com/in/d3xl",
        twitch: "https://twitch.tv/d3xl",
        tiktok: "https://tiktok.com/@d3xl",
        youtube: "https://youtube.com/@d3xl"
    },

    // --- Staff & Administration Team ---
    staff: [
        { name: "d3xl", role: "Kurucu & Developer", tag: "KURUCU", color: "#ff0055", avatarLetter: "D" },
        { name: "G-Family", role: "Head Admin", tag: "ADMIN", color: "#36FF9F", avatarLetter: "G" },
        { name: "Cyber", role: "Topluluk Lideri", tag: "MOD", color: "#ffaa00", avatarLetter: "C" }
    ],

    // --- Server Rules List ---
    rules: [
        { title: "Metagaming & Powergaming Yasaktır", desc: "Rol dışı bilgileri rolde kullanamaz ve imkansız hareketler yapamazsınız.", icon: "fa-triangle-exclamation", color: "text-danger" },
        { title: "Yüksek Rol Kalitesi", desc: "Karakterinizin hikayesine ve rol kalitesine her zaman sadık kalın.", icon: "fa-masks-theater", color: "text-accent" },
        { title: "Discord & Mumble-Voip Zorunlu", desc: "Sesli iletişim ve destek için Discord sunucumuza katışın.", icon: "fa-discord", color: "text-primary" }
    ],

    // --- Music Playlist Configuration ---
    // YouTube linki veya ID vermeniz yeterlidir! İsim ve Sanatçı YouTube'dan OTOMATİK çekilir.
    playlist: [
        { type: "youtube", youtubeId: "OV88I5g_oJc" }, // Heijan & Muti - BABA (Otomatik isim çekilir)
        { type: "youtube", youtubeId: "https://www.youtube.com/watch?v=5Eqb_-j3FDA" }, // Otomatik isim çekilir
        { type: "mp3", title: "Electronic Trap", artist: "D3XL Future Beats", src: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_884be5f80b.mp3?filename=electronic-future-beats-117997.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100" }
    ],

    // --- Patch Notes & Updates (Image Card Style) ---
    updates: [
        { title: "New Mission System Released!", desc: "You can now take on NPC missions, earn rewards, and progress through mission chains in the city!", date: "05.18.25", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400" },
        { title: "Vehicle Customization Expanded", desc: "Customize your vehicles with new rims, engine upgrades, and fresh paint jobs!", date: "05.17.25", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=400" },
        { title: "Police and EMS Systems Reworked", desc: "Enhanced emergency response, reporting tools, and vehicle tracking now provide a more immersive experience.", date: "05.16.25", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400" }
    ],

    // --- Sunucu Galeri Fotoğrafları (Slayt Arka Plan + Galeri Modali) ---
    gallery: [
        { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920", caption: "Lüks Araç Galerisi" },
        { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920", caption: "LSPD Polis Takibi" },
        { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920", caption: "Pacific Bank Soygunu" },
        { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920", caption: "Gece Kulübü & Etkinlikler" }
    ]
};
