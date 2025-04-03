const fs = require('fs');
const path = require('path');

//Define folders for PNG and SVG logos
const png = path.join(__dirname, '../public/png');
const svg = path.join(__dirname, '../public/svg');
const jsonFilePath = path.join(__dirname, '../src/data/banks.json');

//Function to update JSON file
const updateJson = (folderType, fileName) => {
    let jsonData = [];

    //Read existing Json file
    if (fs.existsSync(jsonFilePath)) {
        try {
            const filContent = fs.readFileSync(jsonFilePath, 'utf8');
            jsonData = JSON.parse(filContent);
        } catch (error) {
            console.error('Error reading JSON file:', error);
        }
    }

    //Determine the correct file path
    const filePath = `./${folderType}/${fileName}`;

    // Update the logo field for the corresponding bank entry
    const bankKey = fileName.split(' ')[0].toLowerCase();
    for (const bank of Object.values(jsonData)) {
        if (bank.name.toLowerCase() === bankKey) {
            if (folderType === 'png') {
                bank.png = filePath;
            } else if (folderType === 'svg') {
                bank.svg = filePath;
            }
            break;
        }
    }

    //Write the updated JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`Udpated JSON file with ${filePath}`);
    console.log(`Updated ${jsonFilePath}`);
}
 
const collection = {};
for (const file of fs.readdirSync(png)) {
    const [filename, ext] = file.replace(/logo/i, "").trim().split('.');
    const normalized_file_name = [filename.trim(), ext].join('.');
    const bank_name = normalized_file_name.split('.')[0];

    const prop = bank_name.split(' ').join('_').toLowerCase();
    // const abbreviation = bank_name.substring(0, Math.min(4, bank_name.length)).toUpperCase().trim();

    collection[prop] = ({
        name: bank_name.toUpperCase().replace(/_/g, " "),
        // abbreviation: abbreviation,
        png: `public/png/${prop}.${ext}`
    })
};

for (const file of fs.readdirSync(svg)) {
    const [filename, ext] = file.replace(/logo/i, "").trim().split('.');
    const normalized_file_name = [filename.trim(), ext].join('.');
    const bank_name = normalized_file_name.split('.')[0];

    const prop = bank_name.split(' ').join('_').toLowerCase();
    if (collection[prop]) {
        collection[prop].svg = `public/svg/${prop}.${ext}`;
    } else
    collection[prop] = ({
        name: bank_name.toUpperCase().replace(/_/g, ' '),
        svg: `public/svg/${prop}.${ext}`
    })
}

fs.writeFileSync(jsonFilePath, JSON.stringify(collection, null, 2));
console.log(`Updated ${jsonFilePath}`);

//Function to watch a folder for changes
const watchFolder = (folderPath, folderType) => {
    fs.watch(folderPath, (eventType, fileName) => {
        if (eventType === 'rename' && fileName) {
            const filePath = path.join(folderPath, fileName);
            if (fs.existsSync(filePath)) {
                updateJson(folderType, fileName);
            }
        }
    });
};

//start watching both folders
watchFolder(png, 'png');
watchFolder(svg, 'svg');

console.log(`Watching for changes in ${png} and ${svg}`);