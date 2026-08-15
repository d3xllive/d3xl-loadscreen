/* ==========================================================================
   D3XL SCRIPTS - Loading Screen V4 Engine
   Supports: YouTube Music, YouTube Background, MP3, MP4, Photo Slideshow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===================== INDESTRUCTIBLE YOUTUBE LINK PARSER =====================
    function extractYouTubeId(input) {
        if (!input) return null;
        input = String(input).trim();
        if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
        
        try {
            // Handle full URLs with URL API
            const u = new URL(input.startsWith('http') ? input : 'https://' + input);
            if (u.hostname.includes('youtube.com')) {
                if (u.searchParams.get('v')) return u.searchParams.get('v');
                const parts = u.pathname.split('/').filter(Boolean);
                if (parts.length) return parts[parts.length - 1];
            } else if (u.hostname.includes('youtu.be')) {
                const parts = u.pathname.split('/').filter(Boolean);
                if (parts.length) return parts[0];
            }
        } catch(e) {}

        const match = input.match(/(?:v=|\/embed\/|\/v\/|\/shorts\/|youtu\.be\/|^)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    }

    // ===================== LOCALSTORAGE PERSISTENCE =====================
    const KEYS = { SOUND:'d3xl_sound', BG_MODE:'d3xl_bg_mode', VOLUME:'d3xl_volume', BLUR:'d3xl_blur' };
    let soundEnabled = localStorage.getItem(KEYS.SOUND) !== 'false';
    // Respect config's backgroundType UNLESS player previously changed it manually
    const savedBg = localStorage.getItem(KEYS.BG_MODE);
    let bgMode = savedBg || (typeof Config !== 'undefined' ? Config.backgroundType : 'video') || 'video';
    let volume = localStorage.getItem(KEYS.VOLUME) !== null ? parseInt(localStorage.getItem(KEYS.VOLUME)) : Math.round((Config.defaultVolume || 0.4) * 100);
    let blur = localStorage.getItem(KEYS.BLUR) !== null ? parseInt(localStorage.getItem(KEYS.BLUR)) : 0;

    // ===================== DOM ELEMENTS =====================
    const bgVideo = document.querySelector('.bg-video');
    const cinematicBg = document.querySelector('.cinematic-bg');
    const ytBgIframe = document.getElementById('ytBgPlayer');
    const sVolSlider = document.getElementById('settingsVolSlider');
    const sSoundToggle = document.getElementById('settingsSoundToggle');
    const sBlurSlider = document.getElementById('settingsBlurSlider');
    const sBgSelect = document.getElementById('settingsBgModeSelect');

    // Apply saved settings to UI
    if (sSoundToggle) sSoundToggle.checked = soundEnabled;
    if (sVolSlider) sVolSlider.value = volume;
    if (sBlurSlider) sBlurSlider.value = blur;
    if (sBgSelect) sBgSelect.value = bgMode;

    function setBlur(val) {
        const f = `brightness(0.65) contrast(1.1) blur(${val}px)`;
        if (bgVideo) bgVideo.style.filter = f;
        if (cinematicBg) cinematicBg.style.filter = f;
        if (ytBgIframe) ytBgIframe.style.filter = f;
    }
    setBlur(blur);

    // ===================== BACKGROUND MODE ENGINE =====================
    const galleryData = (typeof Config !== 'undefined' && Config.gallery) ? Config.gallery : [];
    const photoSlides = galleryData.map(g => g.url);

    // Render Gallery Modal
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid && galleryData.length) {
        galleryGrid.innerHTML = galleryData.map(g => `
            <div class="gallery-item">
                <img src="${g.url}" onerror="this.style.display='none'" alt="${g.caption}">
                <span>${g.caption}</span>
            </div>`).join('');
    }

    let photoIdx = 0, slideTimer = null;

    // YouTube Background Setup
    let ytBgPlayerObj = null;
    function setupYouTubeBg() {
        if (typeof Config === 'undefined') return;
        const rawUrl = Config.youtubeVideoId || 'OV88I5g_oJc';
        const ytId = extractYouTubeId(rawUrl) || 'OV88I5g_oJc';

        if (!ytBgIframe) return;

        // Make iframe always visible — we use a dark overlay mask to hide initial YT thumbnail
        ytBgIframe.style.opacity = '1';
        ytBgIframe.style.transition = '';

        // Create temp dark mask over iframe while it loads
        const mask = document.getElementById('ytStartMask') || (() => {
            const d = document.createElement('div');
            d.id = 'ytStartMask';
            d.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#0a0e14;z-index:5;pointer-events:none;transition:opacity 2s ease;';
            document.body.appendChild(d);
            return d;
        })();
        mask.style.opacity = '1';

        const ytSrc = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`;
        ytBgIframe.src = ytSrc;

        // Fade mask out after video has had time to start (3s)
        setTimeout(() => { mask.style.opacity = '0'; setTimeout(() => { mask.remove(); }, 2000); }, 3000);
    }

    function setBgMode(mode) {
        bgMode = mode;
        localStorage.setItem(KEYS.BG_MODE, mode);

        const ytBlocker = document.getElementById('ytBgBlocker');

        // Hide everything first
        if (bgVideo) { bgVideo.pause(); bgVideo.style.display = 'none'; }
        if (cinematicBg) cinematicBg.style.display = 'none';
        if (ytBgIframe) ytBgIframe.style.display = 'none';
        if (ytBlocker) ytBlocker.style.display = 'none';
        if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }

        if (mode === 'photo' && photoSlides.length > 0) {
            cinematicBg.style.display = 'block';
            cinematicBg.style.backgroundImage = `url('${photoSlides[photoIdx]}')`;
            slideTimer = setInterval(() => {
                photoIdx = (photoIdx + 1) % photoSlides.length;
                cinematicBg.style.backgroundImage = `url('${photoSlides[photoIdx]}')`;
            }, 6000);
        } else if (mode === 'youtube') {
            if (ytBgIframe) {
                ytBgIframe.style.display = 'block';
                if (ytBlocker) ytBlocker.style.display = 'block';
                setupYouTubeBg();
            }
        } else {
            // Default: normal MP4 video
            if (bgVideo) {
                bgVideo.style.display = 'block';
                bgVideo.play().catch(() => {});
            }
        }
    }

    setBgMode(bgMode);

    if (sBgSelect) sBgSelect.addEventListener('change', (e) => setBgMode(e.target.value));

    // ===================== CLICK SOUND =====================
    function playClick() {
        if (!soundEnabled) return;
        try {
            const c = new (window.AudioContext || window.webkitAudioContext)();
            const o = c.createOscillator(), g = c.createGain();
            o.type = 'sine';
            o.frequency.setValueAtTime(900, c.currentTime);
            o.frequency.exponentialRampToValueAtTime(300, c.currentTime + 0.04);
            g.gain.setValueAtTime(0.1, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
            o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.04);
        } catch (e) {}
    }

    // ===================== SETTINGS =====================
    if (sVolSlider) sVolSlider.addEventListener('input', (e) => {
        volume = parseInt(e.target.value);
        localStorage.setItem(KEYS.VOLUME, volume);
        if (audio) audio.volume = volume / 100;
        if (ytMusicPlayer && ytMusicPlayer.setVolume) ytMusicPlayer.setVolume(volume);
    });
    if (sSoundToggle) sSoundToggle.addEventListener('change', (e) => {
        soundEnabled = e.target.checked;
        localStorage.setItem(KEYS.SOUND, soundEnabled ? 'true' : 'false');
    });
    if (sBlurSlider) sBlurSlider.addEventListener('input', (e) => {
        blur = parseInt(e.target.value);
        localStorage.setItem(KEYS.BLUR, blur);
        setBlur(blur);
    });

    // ===================== CONFIG INTEGRATION =====================
    if (typeof Config !== 'undefined') {
        const el = (id) => document.getElementById(id);
        const qs = (s) => document.querySelector(s);

        const uname = el('usernameDisplay');
        if (uname) uname.textContent = Config.defaultUsername || 'Oyuncu';
        const brand = qs('.brand-sub-text strong');
        if (brand) brand.textContent = Config.serverName || 'D3XL SCRIPTS';
        const slogan = qs('.brand-sub-text span');
        if (slogan) slogan.textContent = Config.serverSlogan || 'Best Roleplay Experience';

        if (Config.socials) {
            const links = document.querySelectorAll('.social-icons a');
            ['discord','twitter','linkedin','twitch','tiktok','youtube'].forEach((k,i) => {
                if (links[i] && Config.socials[k]) links[i].href = Config.socials[k];
            });
        }
        if (Config.staff) {
            const sc = qs('.staff-mini-list');
            if (sc) sc.innerHTML = Config.staff.map(s => `
                <div class="staff-row">
                    <div class="mini-avatar" style="background:${s.color||'#36FF9F'};color:#000">${s.avatarLetter||s.name[0]}</div>
                    <div><strong>${s.name}</strong><span>${s.role}</span></div>
                </div>`).join('');
        }
        if (Config.rules) {
            const rc = qs('.rules-mini-list');
            if (rc) rc.innerHTML = Config.rules.map(r => `
                <li><i class="fa-solid ${r.icon||'fa-info-circle'} ${r.color||'text-accent'}"></i>
                <div><strong>${r.title}</strong><p style="font-size:11px;color:#8899aa;margin-top:2px">${r.desc}</p></div></li>`).join('');
        }
        if (Config.updates) {
            const uc = el('updateCards');
            if (uc) uc.innerHTML = Config.updates.map(u => `
                <div class="update-card">
                    <img class="update-card-img" src="${u.image||''}" onerror="this.style.display='none'" alt="">
                    <div class="update-card-body">
                        <h4>${u.title}</h4><p>${u.desc}</p>
                        <span class="update-card-date">${u.date||''}</span>
                    </div>
                </div>`).join('');
        }
    }

    // ===================== MODALS =====================
    const navBtns = document.querySelectorAll('.icon-nav-btn');
    const modals = document.querySelectorAll('.modal-card');
    const closeX = document.querySelectorAll('.modal-close-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            const target = document.getElementById(btn.dataset.modal);
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                if (target) target.classList.remove('active');
            } else {
                navBtns.forEach(b => b.classList.remove('active'));
                modals.forEach(m => m.classList.remove('active'));
                btn.classList.add('active');
                if (target) target.classList.add('active');
            }
        });
    });
    closeX.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            navBtns.forEach(b => b.classList.remove('active'));
            modals.forEach(m => m.classList.remove('active'));
        });
    });

    // ===================== KEYBINDS =====================
    document.querySelectorAll('.key-cap').forEach(key => {
        key.addEventListener('click', () => {
            playClick();
            const name = key.dataset.key || key.textContent;
            const desc = key.dataset.desc || 'Varsayılan tuş ataması';
            const panel = document.getElementById('keyDescText');
            if (panel) panel.innerHTML = `
                <div class="key-desc-badge">${name}</div>
                <div class="key-desc-info"><strong class="text-accent">${name}</strong><span>${desc}</span></div>`;
        });
    });

    // ===================== MUSIC ENGINE (MP3 + YOUTUBE) =====================
    const playlist = (typeof Config !== 'undefined' && Config.playlist) ? Config.playlist : [];
    const audio = new Audio();
    let ytMusicPlayer = null;
    let trackIdx = 0;
    let isPlaying = false;
    let currentTrackType = 'mp3';
    audio.volume = volume / 100;

    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const songTitle = document.getElementById('songTitle');
    const artistTitle = document.getElementById('artistTitle');
    const coverImg = document.querySelector('.track-cover img');
    const timeCur = document.getElementById('timeCurrent');
    const timeEnd = document.getElementById('timeTotal');
    const tBar = document.getElementById('timelineBar');
    const tFill = document.getElementById('timelineFill');

    function fmt(s) {
        if (isNaN(s) || s <= 0) return '00:00';
        const m = Math.floor(s / 60), sec = Math.floor(s % 60);
        return `${m<10?'0'+m:m}:${sec<10?'0'+sec:sec}`;
    }

    // YouTube Music Player Container (completely hidden offscreen)
    let ytMusicContainer = document.getElementById('ytMusicContainer');
    if (!ytMusicContainer) {
        ytMusicContainer = document.createElement('div');
        ytMusicContainer.id = 'ytMusicContainer';
        ytMusicContainer.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;visibility:hidden;pointer-events:none;z-index:-999;';
        document.body.appendChild(ytMusicContainer);
    }

    // Load YouTube IFrame API
    let ytApiReady = false;
    const ytScript = document.createElement('script');
    ytScript.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(ytScript);

    window.onYouTubeIframeAPIReady = function() {
        ytApiReady = true;
        if (bgMode === 'youtube') {
            setupYouTubeBg();
        }
        if (playlist.length > 0 && playlist[0].type === 'youtube') {
            loadTrack(0);
        }
    };

    function destroyYtPlayer() {
        if (ytMusicPlayer) {
            try { ytMusicPlayer.destroy(); } catch(e) {}
            ytMusicPlayer = null;
        }
    }

    // Helper to fetch YouTube Metadata (Title & Author) automatically
    async function fetchYtMeta(ytId) {
        try {
            const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.title) {
                    let title = data.title;
                    let artist = data.author_name || 'YouTube Music';
                    
                    // If video title is formatted as "Artist - Title", split it nicely
                    if (title.includes('-')) {
                        const parts = title.split('-');
                        artist = parts[0].trim();
                        title = parts.slice(1).join('-').trim();
                    }
                    return { title, artist, cover: data.thumbnail_url || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` };
                }
            }
        } catch (e) {}
        return null;
    }

    function createYtPlayer(videoId, autoplay) {
        destroyYtPlayer();
        ytMusicContainer.innerHTML = '<div id="ytMusicPlayerDiv"></div>';
        ytMusicPlayer = new YT.Player('ytMusicPlayerDiv', {
            width: '1', height: '1',
            videoId: videoId,
            playerVars: { autoplay: autoplay ? 1 : 0, controls: 0, modestbranding: 1, rel: 0, showinfo: 0 },
            events: {
                onReady: function(evt) {
                    evt.target.setVolume(volume);
                    // Try getting video data directly from YouTube Player API
                    try {
                        const vData = evt.target.getVideoData();
                        if (vData && vData.title) {
                            let title = vData.title;
                            let artist = vData.author || 'YouTube';
                            if (title.includes('-')) {
                                const parts = title.split('-');
                                artist = parts[0].trim();
                                title = parts.slice(1).join('-').trim();
                            }
                            if (songTitle) songTitle.textContent = title;
                            if (artistTitle) artistTitle.textContent = artist;
                        }
                    } catch(e) {}
                    if (autoplay) { evt.target.playVideo(); isPlaying = true; playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; }
                },
                onStateChange: function(evt) {
                    if (evt.data === YT.PlayerState.ENDED) {
                        trackIdx = (trackIdx + 1) % playlist.length;
                        loadTrack(trackIdx);
                        if (isPlaying) playCurrentTrack();
                    }
                }
            }
        });
    }

    async function loadTrack(i) {
        trackIdx = i;
        const t = playlist[trackIdx];
        if (!t) return;

        // Stop previous
        audio.pause(); audio.src = '';
        destroyYtPlayer();

        // Default placeholders while loading YouTube title
        songTitle.textContent = t.title || 'Yükleniyor...';
        artistTitle.textContent = t.artist || 'YouTube';
        if (coverImg && t.cover) coverImg.src = t.cover;
        if (timeCur) timeCur.textContent = '00:00';
        if (timeEnd) timeEnd.textContent = '00:00';
        if (tFill) tFill.style.width = '0%';

        if (t.type === 'youtube' || t.youtubeId) {
            currentTrackType = 'youtube';
            const ytId = extractYouTubeId(t.youtubeId || t.src || t.url);
            if (ytId) {
                if (coverImg) coverImg.src = t.cover || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                
                // Auto fetch metadata from YouTube
                fetchYtMeta(ytId).then(meta => {
                    if (meta) {
                        if (!t.title && songTitle) songTitle.textContent = meta.title;
                        else if (songTitle) songTitle.textContent = t.title || meta.title;
                        
                        if (!t.artist && artistTitle) artistTitle.textContent = meta.artist;
                        else if (artistTitle) artistTitle.textContent = t.artist || meta.artist;
                    }
                });

                if (ytApiReady) {
                    createYtPlayer(ytId, isPlaying);
                }
            }
        } else {
            currentTrackType = 'mp3';
            songTitle.textContent = t.title || 'Bilinmeyen Parça';
            artistTitle.textContent = t.artist || 'D3XL Music';
            audio.src = t.src || '';
            audio.volume = volume / 100;
        }
    }

    if (playlist.length > 0 && playlist[0].type !== 'youtube') {
        loadTrack(0);
    }

    // MP3 Timeline Updates
    audio.addEventListener('loadedmetadata', () => { if (timeEnd) timeEnd.textContent = fmt(audio.duration); });
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        if (timeCur) timeCur.textContent = fmt(audio.currentTime);
        if (timeEnd) timeEnd.textContent = fmt(audio.duration);
        if (tFill) tFill.style.width = `${(audio.currentTime/audio.duration)*100}%`;
    });

    // YouTube Timeline Updates (polling)
    setInterval(() => {
        if (currentTrackType === 'youtube' && ytMusicPlayer && ytMusicPlayer.getCurrentTime && ytMusicPlayer.getDuration) {
            try {
                const cur = ytMusicPlayer.getCurrentTime();
                const dur = ytMusicPlayer.getDuration();
                if (dur > 0) {
                    if (timeCur) timeCur.textContent = fmt(cur);
                    if (timeEnd) timeEnd.textContent = fmt(dur);
                    if (tFill) tFill.style.width = `${(cur/dur)*100}%`;
                }
            } catch(e) {}
        }
    }, 500);

    // Seek
    if (tBar) tBar.addEventListener('click', (e) => {
        const r = tBar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        if (currentTrackType === 'youtube' && ytMusicPlayer && ytMusicPlayer.seekTo) {
            ytMusicPlayer.seekTo(pct * ytMusicPlayer.getDuration(), true);
        } else if (audio.duration) {
            audio.currentTime = pct * audio.duration;
        }
    });

    function playCurrentTrack() {
        if (currentTrackType === 'youtube' && ytMusicPlayer && ytMusicPlayer.playVideo) {
            ytMusicPlayer.playVideo();
        } else {
            audio.play().catch(() => {});
        }
        isPlaying = true;
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }

    function pauseCurrentTrack() {
        if (currentTrackType === 'youtube' && ytMusicPlayer && ytMusicPlayer.pauseVideo) {
            ytMusicPlayer.pauseVideo();
        } else {
            audio.pause();
        }
        isPlaying = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    playBtn.addEventListener('click', () => { playClick(); isPlaying ? pauseCurrentTrack() : playCurrentTrack(); });
    prevBtn.addEventListener('click', () => { playClick(); trackIdx = (trackIdx - 1 + playlist.length) % playlist.length; loadTrack(trackIdx); if (isPlaying) setTimeout(() => playCurrentTrack(), 500); });
    nextBtn.addEventListener('click', () => { playClick(); trackIdx = (trackIdx + 1) % playlist.length; loadTrack(trackIdx); if (isPlaying) setTimeout(() => playCurrentTrack(), 500); });

    // ===================== FIVEM NUI AUTO-START =====================
    const loadText = document.getElementById('loadingPercentText');
    const spinner = document.querySelector('.spinner-ring');
    let fivemStarted = false;
    let simTimer = null;

    // Simulated progress for browser preview (won't run inside FiveM)
    function startSimProgress() {
        if (simTimer) return;
        let pct = 0;
        simTimer = setInterval(() => {
            pct += Math.floor(Math.random() * 3) + 1;
            if (pct >= 99) { pct = 99; clearInterval(simTimer); }
            if (loadText) loadText.textContent = `Loading game (${pct}%)`;
        }, 250);
    }
    startSimProgress();

    // FiveM sends messages via window.postMessage
    window.addEventListener('message', (e) => {
        const data = e.data || {};

        // === Player Name: FiveM sends playerName on loadstart ===
        const name = data.name || data.playerName || data.playername
            || (data.data && (data.data.name || data.data.playerName));
        if (name) {
            const u = document.getElementById('usernameDisplay');
            const av = document.querySelector('.user-avatar-badge');
            if (u) u.textContent = name;
            if (av) av.textContent = name.substring(0, 2).toUpperCase();
        }

        // === Loading Progress: FiveM fires loadProgress events ===
        if (data.eventName === 'loadProgress' || data.type === 'loadProgress') {
            const frac = data.loadFraction ?? data.progress ?? 0;
            const pct = Math.floor(frac * 100);
            if (loadText) loadText.textContent = `Loading game (${pct}%)`;
            if (simTimer) { clearInterval(simTimer); simTimer = null; }

            // Auto-start music on first load event (user gesture happened in FiveM)
            if (!fivemStarted) {
                fivemStarted = true;
                if (playlist.length > 0) {
                    loadTrack(0);
                    setTimeout(() => playCurrentTrack(), 800);
                }
            }
        }

        // === StartSession: server has finished loading ===
        if (data.eventName === 'startFade' || data.type === 'startFade' || data.eventName === 'startSession') {
            if (loadText) loadText.textContent = 'Loading game (100%)';
            if (spinner) spinner.style.display = 'none';
            if (simTimer) { clearInterval(simTimer); simTimer = null; }
        }

        // === Shutdown: FiveM hides loading screen ===
        if (data.type === 'shutdown' || data.eventName === 'shutdown') {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '0';
        }
    });
});
