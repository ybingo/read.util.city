"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const config = (exports = {});

  // 静态文件版本
  config.version = "2020-08-27";

  config.keys = appInfo.name + "_read.util.city";

  config.middleware = [];

  // 模板引擎配置
  // https://mozilla.github.io/nunjucks/
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".html": "nunjucks",
    },
  };

  // 安全配置
  config.security = {
    // 关闭 csrf 防范
    csrf: false,
  };

  return config;
};
