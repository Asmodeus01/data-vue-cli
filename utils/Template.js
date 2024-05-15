/*
 * @Description:
 * @Author: yanxiao
 * @Github: https://github.com/yanxiaos
 * @Date: 2021-12-04 11:10:09
 * @LastEditors: yanxiao
 */
const fs = require('fs')
module.exports = class Template {

  static filePath = '../template.json'

  // 获取模板文件，json数据
  getTemplate () {
    const tplObj = require(`${__dirname}/${Template.filePath}`)
    return tplObj
  }

  // 返回模板名列表
  getNameList () {
    let tplObj = this.getTemplate()
    return tplObj
  }

  // 根据模板名称返回模板url
  getTempUrl ({type, tplName}) {
    const template = this.getTemplate()
    return template[type][tplName]
  }

  // 新增模板，插入键值对，key存在则覆盖
  add (type,key, val, callback) {
    let tplObj = this.getTemplate()
    if(!tplObj[type]) tplObj[type]={}
    tplObj[type][key] = val

    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', callback)
  }

  // 删除模板，删除键值对，key不存在则返回错误
  delete (type, key, callback) {
    let tplObj = this.getTemplate()
    if(!tplObj[type]){
      callback('模板类型不存在！')
      return
    }
    if (!tplObj[type][key]) {
      callback('模板不存在！')
      return
    }
    delete tplObj[type][key]
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', callback)
  }
}
