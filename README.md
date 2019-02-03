# find my pixels

A program that given a video will find the most similar frame to a target image.

## How it works
It spawns an ffmpeg instance that creates one screenshot per second of the video. These screenshots are piped to the program and then rendered into an HTML canvas. Then an image similarity library outputs an image containing the diff between each screenshot and the target image. On top of that an algorithm calculates the difference between the pixels of the two images. A sorted table based on similarity is also presented along with the best match image.

## Example scenario
You want to find the position (timestamp) of the intro scene of a tv show for each episode.

![Demo of the program](https://github.com/alex-rokabilis/find-my-pixels/blob/master/demo.gif)

