const fs = require('fs');

const args = process.argv.slice(2);
const option = args[0];
const filePath = args[1] || args[0];

const handleDefaultCase = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').length;
    const words = fileContent.split(/\s+/).filter(Boolean).length;
    const characters = fileContent.length;
    console.log(`${lines} ${words} ${characters} ${filePath}`);
};

if (option === '-c' && filePath) {
    const stats = fs.statSync(filePath);
    console.log(`${stats.size} ${filePath}`);
} else if (option === '-l' && filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let lines = fileContent.split('\n'); 
    if (lines[lines.length - 1] === '') {
        lines.pop();
    }
    console.log(`${lines} ${filePath}`);
} else if (option === '-w' && filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const words = fileContent.split(/\s+/).filter(Boolean).length;
    console.log(`${words} ${filePath}`);
} else if (option === '-m' && filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const characters = fileContent.length;
    console.log(`${characters} ${filePath}`);
} else if (args.length === 1 && !option.startsWith('-')) { 
    handleDefaultCase(filePath);
} else if (option === '-l' && args.length === 1) { 
    let lines = 0;
    process.stdin.on('data', (data) => {
        lines += data.toString().split('\n').length - 1;
    });
    process.stdin.on('end', () => {
        console.log(lines);
    });
} else if (args.length === 0) { 
    process.stdin.on('data', (data) => {
        handleDefaultCase(data.toString());
    });
} else {
    console.error('Invalid arguments');
}
