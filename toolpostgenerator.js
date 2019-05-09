/* 
    View LICENSE for license information (MIT License)
    Copyright (c) 2019 ToolpostBot

    Please don't judge my coding habits too much :(
*/

const { exec } = require('child_process');
const fs = require('fs');

async function main() {
    // Do basic checks and get file information
    try {
        await ffmpeg();
    } catch (err) {
        console.error('Please install FFMPEG and FFPROBE into the working directory or into your %PATH%.\nFFMPEG can be downloaded at: https://ffmpeg.org/download.html');
        return false;
    }

    if (!fs.existsSync('source.mp4')) {
        console.error('Please place a source video named "source.mp4" into this directory to be used as the video in your generation.');
        return false;
    }

    let videoLength;
    try {
        videoLength = await getVideoLength();
    } catch(err) {
        console.error(`There was a problem with your video source:\n\n${err.message}`);
        return false;
    }

    if (!fs.existsSync('sourcemp3/')) fs.mkdirSync('sourcemp3');

    let sources = fs.readdirSync('sourcemp3/');
    if (sources.length == 0) {
        console.error('Please add at least one MP3 into "sourcemp3".');
        return false;
    }

    if (!fs.existsSync('temp\\')) fs.mkdirSync('temp');

    // Find suitable source
    let sourceLength = 0, source;
    while (!sourceLength) {
        let sourceIndex = Math.floor(Math.random() * sources.length);
        source = sources[sourceIndex];
        let currentSourceLength;

        try {
            currentSourceLength = await getSourceLength(source); 
        } catch(err) {
            console.error(`There was a problem with the source "sourcemp3\\${source}":\n\n${err.message}`);
            return false;
        }

        // Remove too short sources from consideration
        if (currentSourceLength > videoLength) sourceLength = await getSourceLength(source);
        else sources.splice(0, 1);

        // If out of sources, throw error
        if (sources.length == 0) {
            console.error(`Please add at least one MP3 that is longer than the length of source.mp4 (${videoLength}) into "sourcemp3\\".`);
            return false;
        }
    }

    let sourceStartSecond = Math.floor(Math.random() * (sourceLength - videoLength));

    // Generate I guess
    let filename;
    try {
        filename = await generateVideo(source, sourceStartSecond, videoLength);
    } catch(err) {
        console.error(`Something went wrong during generation:\n\n${err.message}`);
        return false;
    }

    console.log(`Source MP3: ${source}`);
    console.log(`Starting point: ${sourceStartSecond} seconds`);
    console.log(`Filename: ${filename}`);

    fs.renameSync(`temp\\${filename}`, filename);

    return true;
}

function getSourceLength(file) {
    return new Promise((resolve, reject) => {
        exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "sourcemp3\\${file}"`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(Math.floor(stdout));
            }
        });
    });
}

function getVideoLength() {
    return new Promise((resolve, reject) => {
        exec('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 source.mp4', (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(Math.floor(stdout));
            }
        });
    });
}

function generateVideo(file, time, videoLength) {
    return new Promise((resolve, reject) => {
        let d = new Date();
        let filename = `gen_${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}_${d.toTimeString().substr(0,8).replace(/:/g,'')}.mp4`;
        exec(`ffmpeg -i source.mp4 -ss ${time} -i "sourcemp3\\${file}" -map 0:v -map 1:a -c:v h264 -c:a copy -t ${videoLength} temp\\${filename} -v error -y`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(filename);
            }
        });
    });
}

// This seems a little hacky
function ffmpeg() {
    return new Promise((resolve, reject) => {
        exec(`ffmpeg -version`, (err, stdout, stderr) => {
            if (err) reject(false);
            else {
                exec(`ffprobe -version`, (err, stdout, stderr) => {
                    if (err) reject(false);
                    else resolve(true);
                });
            }
        });
    });
}

main();