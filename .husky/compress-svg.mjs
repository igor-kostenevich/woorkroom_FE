import fs from 'fs';
import { optimize } from 'svgo';

const compressSvg = async (filename) => {
    try {
        const sourceData = fs.readFileSync(filename, 'utf8');
        const name = filename.match(/[\w\s_-]+\.svg$/);

        if (sourceData.match(/;base64,/)) {
            throw new Error(
               `"${name}" contains a Base64-encoded Data URI! You should convert the icon to "png" or "jpg" format`
            );
        }

        const result = optimize(sourceData, {
            path: filename,

            floatPrecision: 2,
            transformPrecision: 4,
            plugins: [
                {
                    name: 'preset-default',
                    params: {
                        overrides: {
                            removeViewBox: false,
                        },
                    },
                },
                'removeDimensions',
                {
                    name: 'removeAttrs',
                    params: {
                        attrs: '(fill-opacity)',
                    },
                },
            ],
        });

        fs.writeFileSync(filename, result.data);
    } catch (error) {
        throw error;
    }
};

Promise.resolve(process.argv)
    .then((x) => x.slice(2))
    .then((x) => x.map(compressSvg))
    .then((x) => Promise.all(x))
    .catch((error) => {
        console.error('CompressSvg error:' + error);

        process.exit(1);
    });