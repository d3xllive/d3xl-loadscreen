# 🎮 FiveM NUI Integration

The loading screen communicates seamlessly with FiveM CEF and client events.

## 📡 List of NUI Messages Handled

### 1. `loadProgress`
- **Trigger**: Fired continuously while FiveM client downloads server resources.
- **Effect**: Updates loading percentage text and animated spinner, auto-starts music.

### 2. `playerName`
- **Trigger**: Fired when FiveM client initializes player handshake.
- **Effect**: Displays the player's Steam / FiveM account name and initials avatar.

### 3. `startFade` / `startSession`
- **Trigger**: Fired when server load is 100% complete.
- **Effect**: Progress bar completes to 100% and spinner finishes.

### 4. `shutdown`
- **Trigger**: Fired when FiveM closes loading screen to spawn player.
- **Effect**: Smooth 0.5s fade-out animation.
