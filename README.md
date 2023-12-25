# 医疗预约系统

## 安装及创建

### PostgreSQL

1. 到官方下载网站[下载](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)最新版本的 `PostgreSQL 16`
2. 根据步骤注册数据库账号 ( 账号：`postgres` ，密码：`123456` )
3. 安装后打开 `pgAdmin 4` (如果英文不好就先设置中文，在左上角依次点击 `File -> Preferences -> Miscellaneous -> User Language` ，然后右下角点击保存，按照提示重启应用)
4. 接着在 `pgAdmin 4` 左边的菜单中根据以下路径依次点击左边箭头( `>` )以新建数据库： `Servers -> PostgreSQL 16 -> Databases (右键) -> Create -> Database`
5. 在新建数据库页面填写数据库名称( `reservation_system` )，即可创建项目的数据库

## 运行

0. 进入项目目录
1. 因为项目用的是 `pnpm` 做的依赖管理，所以先全局安装 `pnpm` ( `npm i -g pnpm` ) ，安装不了就设置 `npm` 包源，网上有很多教程
2. 运行 `pnpm i` 安装依赖
3. 运行 `pnpm run dev` 运行项目
