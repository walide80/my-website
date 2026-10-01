# LQGN Personal Profile

A lightweight responsive personal profile website with:
- Profile image
- Custom audio player
- Seekable timeline
- Expandable cover art
- Instagram and TikTok links
- Disabled YouTube state
- Playlist-ready JavaScript structure

## Add another song

Open `script.js` and add another object to the `playlist` array:

```js
{
  title: "SONG NAME",
  audio: "assets/song.mp3",
  cover: "assets/cover.jpg"
}
```

Then upload the matching files into `assets/`.

## GitHub Pages

After uploading the files, enable GitHub Pages from:
Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
