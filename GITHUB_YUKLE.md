# 📤 GitHub'a Yükleme Rehberi

## Yöntem 1: GitHub Desktop (En Kolay) ⭐

1. **GitHub Desktop indir**: https://desktop.github.com/
2. **GitHub Desktop'ı aç** → `File → Add Local Repository`
3. Şu klasörü seç:
   ```
   C:\Users\Serdar\.gemini\antigravity-ide\scratch\fivem-d3xl-loadscreen
   ```
4. **"Initialize this repository"** butonuna tıkla
5. **Summary** kısmına yaz: `D3XL Loading Screen V4`
6. **Commit to main** butonuna tıkla
7. **Publish repository** → Repository adı: `fivem-d3xl-loadscreen`
8. ✅ GitHub'da yayında!

---

## Yöntem 2: GitHub Web Upload

1. https://github.com/new adresine git
2. Repository adı: `fivem-d3xl-loadscreen`
3. **Public** seç
4. **Create repository**
5. **"uploading an existing file"** linkine tıkla
6. Şu 6 dosyayı sürükle bırak:
   - `index.html`
   - `style.css`
   - `app.js`
   - `config.js`
   - `fxmanifest.lua`
   - `README.md`
7. **Commit changes** → ✅ Bitti!

---

## Yöntem 3: Git Komut Satırı

Önce Git kur: https://git-scm.com/download/win

Sonra PowerShell'de:
```powershell
cd "C:\Users\Serdar\.gemini\antigravity-ide\scratch\fivem-d3xl-loadscreen"
git init
git add .
git commit -m "feat: D3XL Loading Screen V4"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/fivem-d3xl-loadscreen.git
git push -u origin main
```

---

## 📚 Gitbook için

1. https://app.gitbook.com → New Space
2. Space adı: **D3XL SCRIPTS Docs**
3. **Import from GitHub** seçeneğiyle az önce oluşturduğun repo'yu bağla
4. `README.md` otomatik ana sayfa olacak

> Gitbook'ta her bölümü (`config.js`, kurulum, FiveM entegrasyon) ayrı sayfa olarak ekleyebilirsin.

---

Proje klasörü: `C:\Users\Serdar\.gemini\antigravity-ide\scratch\fivem-d3xl-loadscreen`
