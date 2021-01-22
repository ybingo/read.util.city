"use strict";

const Controller = require("egg").Controller;

class ApiController extends Controller {
  async fetchBookToc() {
    const { ctx, app, config } = this;
    const { code } = ctx.request.query;
    if (code !== config.code) {
      ctx.body = { success: false, message: "抱歉, 您没有访问权限" };
      return;
    }

    const { bookName } = ctx.request.body;
    const exist = ctx.helper.isBookExist(app.baseDir, bookName);
    if (!exist) {
      ctx.body = { success: false, message: `《${bookName}》不存在` };
      return;
    }
    const bodyHtml = await ctx.helper.readBookToc(app.baseDir, bookName);
    ctx.body = { success: true, data: bodyHtml };
  }

  async fetchChapters() {
    const { ctx, app, config } = this;
    const { code } = ctx.request.query;
    if (code !== config.code) {
      ctx.body = { success: false, message: "抱歉, 您没有访问权限" };
      return;
    }

    const { bookName, chapterId } = ctx.request.body;
    const exist = ctx.helper.isChapterExist(app.baseDir, bookName, chapterId);
    if (!exist) {
      ctx.body = { success: false, message: `《${bookName}》-${chapterId}不存在` };
      return;
    }
    const bodyHtml = await ctx.helper.readChapter(app.baseDir, bookName, chapterId);
    ctx.body = { success: true, data: bodyHtml };
  }
}

module.exports = ApiController;
