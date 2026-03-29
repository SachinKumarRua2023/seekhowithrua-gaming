# Sounds Folder

Place your audio files here to enable sound effects in the memory training game.

## Required Files

| Filename | Event Trigger | Description |
|----------|----------------|-------------|
| `correct.wav` | Correct answer during recall | Positive feedback sound |
| `incorrect.wav` | Wrong answer or low score | Negative feedback sound |
| `tick.wav` | Timer countdown (last 10 seconds) | Time running out warning |
| `success.wav` | Level complete / Game start | Success/achievement sound |

## Supported Formats

- **.wav** (recommended for best compatibility)
- **.mp3** (will work but update the paths in `js/memory-game.js`)
- **.ogg** (will work but update the paths in `js/memory-game.js`)

## How to Add Sounds

1. Find or create short audio clips (1-2 seconds each)
2. Name them exactly as listed above
3. Place them in this `sounds/` folder
4. Refresh the game page - sounds will play automatically

## Free Sound Resources

- [freesound.org](https://freesound.org) - Free sound effects
- [mixkit.co](https://mixkit.co/free-sound-effects/) - Free sound effects
- [zapsplat.com](https://www.zapsplat.com) - Free sound library

## Sound Not Working?

- Check browser console for errors
- Ensure files are named exactly as listed
- Verify audio files are not corrupted
- Some browsers block autoplay - user interaction may be needed first

---

**Note**: The game works without sounds. These are optional enhancements for better user experience.
