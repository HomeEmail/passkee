# puppeteer-domkit-recorder 自动化测试用例管理工具

## 支持添加文件夹

## 支持通过 json 定义用例结构

## 根据 json 生成用例文件及具备易识别的用例基础代码

## 支持 隐藏、半屏、全屏设置

## 无限极目录管理

```json
// the case id generated automaticlly would be append to the case
{
    "name": "msg-center",
    "folders":[{
        "name": "sub-folder",
        "files": ["ad.js"]
    }],
}

[
    "广告"/*CASE:0*/, 
    "有数据"/*CASE:1*/, 
    "就是觉得",
]

```

```javascript
export default () => {
    /*BEFORE*/
    before()
    /*AFTER*/
    after()
    /*CASE*/
    it('广告位 有数据', async () => {})
    /*CASE*/
    it('广告位 没数据', async () => {})
    /*/*/
}
```
