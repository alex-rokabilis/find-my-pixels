import React, { Component } from "react";
const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch');
const path = require('path');
const Queue = require('js-queue');

const TARGET_IMAGE = ''

const parseImg = (path) => new Promise((resolve) => {
    const img = fs.createReadStream(path)
        .pipe(new PNG()).on('parsed', () => resolve(img));
})

const findDiff = (img1, img2) => {

    const diff = new PNG({ width: img1.width, height: img1.height });

    pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1, });

    let diffPercent = 0;

    for (var i = 0; i < img1.data.length / 4; i++) {
        diffPercent += Math.abs(img1.data[4 * i + 0] - img2.data[4 * i + 0]) / 255;
        diffPercent += Math.abs(img1.data[4 * i + 1] - img2.data[4 * i + 1]) / 255;
        diffPercent += Math.abs(img1.data[4 * i + 2] - img2.data[4 * i + 2]) / 255;
    }

    diffPercent = (100 * diffPercent / (img1.width * img1.height * 3));

    return {
        diffImage: diff.pack(),
        diffPercent
    }

}


export default class App extends Component {
    state = { results: [], similarity: undefined }
    constructor() {
        super();
        this.candidateCanvas = React.createRef();
        this.targetCanvas = React.createRef();
        this.diffCanvas = React.createRef();
        this.bestMatchCanvas = React.createRef();
    }

    renderImg = (img, canvas) => {

        var ctx = canvas.current.getContext('2d');

        canvas.current.style.width = '70%';
        canvas.current.style.height = '100%';
        canvas.current.width = img.width;
        canvas.current.height = img.height;
        const imgData = new ImageData(new Uint8ClampedArray(img.data), img.width, img.height);
        ctx.putImageData(imgData, 0, 0);

        if (canvas === this.bestMatchCanvas) {
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Best match", canvas.current.width / 2, 10);
        }

    }

    start = async () => {

        const queue = new Queue;
        let count = 0
        const target = await parseImg(TARGET_IMAGE);
        this.renderImg(target, this.targetCanvas)


        require('./captureScreenshots')(data => {
            new PNG().parse(data, (err, candidate) => {
                queue.add(async () => {

                    const diff = findDiff(candidate, target);
                    this.renderImg(candidate, this.candidateCanvas)
                    this.renderImg(diff.diffImage, this.diffCanvas)
                    const similarity = Math.ceil(100 - diff.diffPercent)

                    this.setState({ similarity })

                    const sortedResults = [
                        ...this.state.results,
                        {
                            candidate: ++count,
                            target: path.basename(TARGET_IMAGE),
                            similarity: similarity
                        }
                    ].sort((a, b) => b.similarity - a.similarity);

                    this.setState({
                        results: sortedResults
                    })

                    if (sortedResults[0].candidate === count) {
                        this.renderImg(candidate, this.bestMatchCanvas, true)
                    }
                    queue.next()
                });
            })
        })
    }

    componentDidMount() {
        setTimeout(()=>{
            this.start()
        },4000)
    }

    render() {

        return <div>
            <div id='canvas-area' style={{ display: 'flex', justifyContent: 'center' }}>
                <canvas ref={this.candidateCanvas}></canvas>
                <canvas ref={this.targetCanvas}></canvas>
                <canvas ref={this.diffCanvas}></canvas>
            </div>

            {this.state.similarity && <h3 style={{ textAlign: 'center' }}>{`Images ${this.state.similarity}% similar`}</h3>}
            <div style={{ display: 'flex', }}>
                <table style={{ textAlign: 'center', width: '30%' }}>
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Target</th>
                            <th>Similarity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results
                            .map(result => <tr key={result.candidate}>
                                <td>{result.candidate}</td>
                                <td>{result.target}</td>
                                <td>{result.similarity}</td>
                            </tr>)}
                    </tbody>
                </table>
                <canvas ref={this.bestMatchCanvas}></canvas>
            </div>
        </div>
    }
}
