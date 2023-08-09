const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
let badge = '';
let licenseSection = '';

const init = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmation',
            message: 'Do you want to create a README?'
        }
    ])
    .then((confirmation) => {
        if(confirmation.confirmation === true) {
            askQuestions();
        }
        else {
            console.log('Okay see ya later!')
        }
    });
};

const askQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',  
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provided a short description of your project.',
        },
        {
            type: 'input',
            name: 'install',
            message: 'How do we install this project?',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'How do we use this project?',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'How can others contribute to this project?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'confirm',
            name: 'licenseconfirm',
            message: 'Would you like to add a license to your project?',
        },
        
    ])    
    .then((answers) => {
        if(answers.licenseconfirm === true) {
            askLicenseQuestion(answers);
        } else {
            licenseSection = generateMarkdown.renderLicenseSection(answers.license).replace('${license}', '');
            badge = generateMarkdown.renderLicenseBadge(answers.license).replace('${badge}', '');
            generateReadme(answers);
        }
    });
};

const askLicenseQuestion = (previousAnswers) => {
    inquirer.prompt([
        {
        type: 'list',
        name: 'license',
        message: 'Which license would you like?',
        choices: ['MIT', 'IBM', 'ISC', 'Mozilla', 'Apache'],
        },
    ])
    .then((licenseAnswers) => {
        const allAnswers = {...previousAnswers, ...licenseAnswers};
        generateReadme(allAnswers);
    })
};

const generateReadme = ({badge, title, description, install, usage, licenseSection, contribution, github, email}) => {

    const readMeContent = 
    
`${badge}

# ${title} 

 ## Description

    ${description}

 ## Table Of Contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributing](#contribution)
 - [Questions](#questions)

 ## Installation

    ${install}

 ## Usage

    ${usage}

${licenseSection}

 ## How To Contribute

    ${contribution}

 ## Questions

    My GitHub: [GitHub](https://github.com/${github})
 
    My Email: ${email}`

    fs.writeFile('GENERATED_README.md', readMeContent, (err) =>
            err ? console.log(err) : console.log('Successfully created README')
    );
};

init();
