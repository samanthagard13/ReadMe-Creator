const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

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
            type: 'confirmation',
            name: 'licenseconfirm',
            message: 'Would you like to add a license to your project?',
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
        
    ])    
    .then((answers) => {
        const licenseBadge = generateMarkdown.renderLicenseBadge(answers.licenseconfirm);
        const licenseHtml = generateMarkdown.renderLicenseSection(license);

        const readMeContent = generateReadme(answers, licenseBadge, licenseHtml);

        fs.writeFile('README.md', readMeContent, (err) =>
            err ? console.log(err) : console.log('Successfully created README')
        );
    });
};

const generateReadme = ({ title, description, install, usage, licenseconfirm, licenseHtml, licenseBadge, contribution, github, email}) => {
return `${licenseBadge}

# ${title} 

 ## Description

    ${description}

 ## Table Of Contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributing](#contibution)
 - [Questions](#questions)

 ## Installation

    ${install}

 ## Usage

    ${usage}

${licensesection}

 ## How To Contribute

    ${contribution}

 ## Questions

    My GitHub: [GitHub](https://github.com/${github})
 
    My Email: ${email}`};

init();
