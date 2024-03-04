const fs = require('fs');

function parseJSON(jsonString) {
    jsonString = jsonString.trim();

    if (jsonString === '{}') return {};
    const keyValueRegex = /"([^"]+)":\s*"([^"]*)"/g;


    const innerJson = jsonString.slice(1, -1).trim();
    const result = {};

    let match;
    while ((match = keyValueRegex.exec(innerJson)) !== null) {
        result[match[1]] = match[2];
    }

    if (Object.keys(result).length === 0) {
        throw new Error('Invalid JSON');
    }

    return result;
}

function main(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            process.exit(1);
        }

        try {
            const parsed = parseJSON(data);
            console.log('Parsed JSON:', parsed);
            process.exit(0); 
        } catch (error) {
            console.error('Invalid JSON:', error.message);
            process.exit(1);
        }
    });
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
}

main(filePath);
