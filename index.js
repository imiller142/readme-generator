const fs = require('fs');
const inquirer = require('inquirer');
const generateReadme = require('./src/generateReadme');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([
        {
            type: 'Input',
            name: 'projectTitle',
            message: 'What is the project title?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Write a brief description of the project.',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What is the installation process for this project',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is this project used for.',
        },
        {
            type: 'list',
            name: "license",
            message: 'Choose your license option for this project.',
            choices: [
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open",
            ]
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Who has contributed to the project?',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Is there a test included',
        },
        {
            type: 'input',
            name: 'questions',
            message:'Where can I find help if I have an issue?',
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your gitHub username',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?',
        }

    ]);
}

async function init() {
    try {
        const answers = await promptUser();
        const generateContent = generateReadme(answers);
        await writeFileAsync('./dist/README.md', generateContent);
    } catch(err) {
        console.log(err);
    }
}

init();