const pngStreamer = require('png-streamer')
const exec = require('child_process').exec

const videoPath = "";

module.exports = (cb) => {

    const ffmpeg = exec(`
    < /dev/null ffmpeg  -threads 0 -hide_banner -loglevel 0 -i "${videoPath}" -r 1/1 -vf scale=320:-1 -vcodec png -f image2pipe - | cat`, {
            cwd: __dirname,
            encoding: 'buffer',
            maxBuffer: 1024 ** 3
        })


    ffmpeg.stderr.pipe(process.stderr)
    ffmpeg.on('close', () => alert('close'))
    new pngStreamer(ffmpeg, (err, data) => {
        cb(data)
    });

}