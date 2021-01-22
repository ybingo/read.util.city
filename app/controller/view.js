"use strict";

const Controller = require("egg").Controller;

class ViewController extends Controller {
  async renderHome() {
    const { ctx, app, config } = this;
    const { code } = ctx.request.query;
    if (code !== config.code) {
      ctx.body = "抱歉, 您没有访问权限";
      return;
    }
    const books = await ctx.helper.listBooks(app.baseDir);
    await ctx.render("home.html", {
      title: "小书库",
      books,
      code,
    });
  }
}

module.exports = ViewController;
