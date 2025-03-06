const fs = require('fs');
const path = require('path');

//Define folders for PNG and SVG logos
const pngLogos = path.join(__dirname, '../public/pngLogos');
const svgLogos = path.join(__dirname, '../public/svgLogos');
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

    //Ensure seperate arrays for PNG and SVG Logos
    // if (!jsonData.pngLogos) jsonData.pngLogos = [];
    // if (!jsonData.svgLogos) jsonData.svgLogos = [];

    //Determine the correct file path
        const filePath = `./${folderType}/${fileName}`;
    
    //update respective arrays 
    // if (folderType === "png" && !jsonData.pngLogos.includes(filePath)) {
    //     jsonData.pngLogos.push(filePath);
    // } else if (folderType === "svg" && !jsonData.svgLogos.includes(filePath)) {
    //     jsonData.svgLogos.push(filePath);
    // } else {
    //     return; //If the file path already exists, do nothing
    // }

        // Update the logo field for the corresponding bank entry
        const bankKey = fileName.split(' ')[0].toLowerCase();
        for (const bank of jsonData) {
            if (bank[bankKey]) {
               if (folderType === 'png') {
                   bank[bankKey].png = filePath;
               } else if (folderType === 'svg') {
                   bank[bankKey].svg = filePath;
               }
               break;
            }
        }

    //Write the updated JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
        console.log(`Udpated JSON file with ${filePath}`);
        console.log(`Updated ${jsonFilePath}`);
    }

    //Function to watch a folder for changes
    const watchFolder = (folderPath, folderType) => {
        fs.watch (folderPath, (eventType, fileName) => {
           if (eventType === 'rename' && fileName) {
               const filePath = path.join(folderPath, fileName);
               if (fs.existsSync(filePath)) {
                   updateJson(folderType, fileName);
               }
           }
        });
};

//start watching both folders
watchFolder(pngLogos, 'png');
watchFolder(svgLogos, 'svg'); 

console.log(`Watching for changes in ${pngLogos} and ${svgLogos}`);