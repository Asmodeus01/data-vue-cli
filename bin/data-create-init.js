#!/usr/bin/env node
// 交互式命令行
const inquirer = require('inquirer')
const downloadTemplate = require('../utils/downloadTemplate')
const Template = require('../utils/Template')

// 模板列表
const template = new Template()
const tplList = template.getNameList()

const question = [{
  name: "appName",
  type: 'input',
  message: "请输入项目名称",
  validate (val) {
    if (val === '') {
      return 'Name is required!'
    } else {
      return true
    }
  }
},

  {
    type: 'list',
    name: 'type',
    message: '请选择模板类型',
    choices: Object.keys(tplList)
  }
]

for (let i = 0; i < Object.keys(tplList).length; i++) {
  let key= Object.keys(tplList)[i]
  question.push({
    type: 'list',
    message: `请选择模板`,
    name: 'tplName',
    choices: Object.keys(tplList[key]),
    when:answers=>answers.type== key
  })
}


inquirer
  .prompt(question)
  .then(answers => {
    // 回调函数，answers 就是用户输入的内容，是个对象
    downloadTemplate({
      appName: answers.appName,
      url: template.getTempUrl(answers.tplName),
    })
  })
  .catch((error) => {
    console.log('err', error);
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error(error);
    } else {
      // Something else went wrong
    }
  });
