import fs from 'fs';
const sourceFolder = './public/icons/';
const destFolder = './config/';

const icons = [];
fs.readdirSync(sourceFolder).forEach((file) => {
  const icon = {
    name: file.replace('.svg', ''),
  };
  const extension = file.match(/\.[0-9a-z]+$/i)?.[0];
  if (extension === '.svg') {
    const iconSrc = fs.readFileSync(sourceFolder + file, {
      encoding: 'utf8',
    });
    icon.viewbox = iconSrc.match(/viewbox="(.*?)"/i)?.[1];
    icons.push(icon);
  }
});
fs.writeFile(
  destFolder + 'icon-list.json',
  JSON.stringify(icons),
  { encoding: 'utf8', flag: 'w' },
  (err) => {
    if (err) throw err;
    console.warn('icon-list.json file successfully generated');
  }
);
