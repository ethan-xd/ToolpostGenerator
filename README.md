# ToolpostGenerator
## An open source recreation of the software that powered ToolpostBot.

This is a rewrite of the software that powered ToolpostBot since February 2018 up until some time in early 2019. It used to run off a Batch script. I won't put anyone through that, so here's a Node.js rewrite based off the ToolpostBot Discord bot source.

**Designed for Windows.**

### Dependencies
- Knowledge on how to setup Node.js and all the other shit needed to make this work.
- ffmpeg and ffprobe in your %PATH% or in the directory of `toolpostgenerator.js`. You can get these executables from https://ffmpeg.org/download.html.

### How to Use
- You need Node.js from https://nodejs.org.
- In the same directory as `toolpostgenerator.js`, you need a source MP4 as the video for your generation. Call this `source.mp4`. For best results, don't make it too long.
- Then again in the same directory as `toolpostgenerator.js`, you need a `sourcemp3` directory, with ideally as many MP3 files as possible, for maximum randomness. The script will ignore MP3s shorter than the video source.
- Run the batch file `toolpostgenerator.bat` (or run command `node toolpostgenerator.js`) to see it work.

### Contributions
Please feel free to make contributions! Refactors, bug fixes, grammar correcting, anything! Please do not judge my code too much!

### MIT License
**Copyright © 2019 ToolpostBot**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.