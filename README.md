# Fitness2023-Api

## 说明
本项目是基于Huawei Watch 3开发的运动健康APP后端部分。实际开发时，本项目仅作为参考。

## 环境
开发工具：vscode、nodemon、nodejs <br>
开发语言：JavaScript

## 结构
```
└─Fitness2023-Api
    ├─apis                 // 一些功能封装
    ├─controllers          // 开放的接口
    ├─node_modules         // node依赖包，不需要动
    ├─routes               // 路由配置，将controller中的接口配置到路由中
    ├─schema               // 数据表的设计
    ├─index.js             // 主源文件，用于启动nodejs服务
    ├─db.js                // 数据库操作，包括连接、增删改查，以及一些临时的数据操作
    ├─config.js            // 配置文件，本项目主要存放服务器上MongoDB的地址
    ├─package.json         // 下载node依赖时，会在package.json中添加依赖项，这样移动代码时，不需要拷贝node_modules，直接终端npm -i即可
    ├─package-lock.json    // 不需要动
    ├─.gitignore
```

## 启动
### 在本地启动
为了灵活调试，本项目有时需要在开发者本地启动。本地项目根目录下，因为这里index.js的版本时放在服务器上的常规版本，只会执行设定周期内的既定功能，而注释中的很多函数是用来临时操作数据库的。使用nodemon工具来启动：
```
  nodemon index.js
```
注意，nodemon是热启动，每次修改代码都会自动重新执行，因此对数据库的操作要尤为谨慎。

### 在服务器上启动
将项目配置在服务器上（参考 https://www.bilibili.com/video/BV1my4y1a7xN?p=1&vd_source=5e2172352eac9cefe238dc, https://www.yuque.com/uyyv8m/linux/im67s65a49k3yk1m） <br>
一般使用pm2命令来启动nodejs服务，在项目根目录下启动：
```
  pm2 start index.js
```

## 配套前端项目
https://github.com/AlanFranklin258/Fitness2023
