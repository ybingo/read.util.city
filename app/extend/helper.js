"use strict";

const path = require("path");
const fs = require("fs-extra");
const cheerio = require("cheerio");

module.exports = {
  isBookExist(baseDir, bookName) {
    const indexPath = path.join(baseDir, `ebook/${bookName}/index.html`);
    return fs.pathExistsSync(indexPath);
  },

  isChapterExist(baseDir, bookName, chapterId) {
    const chapterPath = path.join(baseDir, `ebook/${bookName}/chapters/${chapterId}.html`);
    return fs.pathExistsSync(chapterPath);
  },

  getBodyInHtml(htmlText) {
    const $ = cheerio.load(htmlText);
    return $("body").html();
  },

  async listBooks(baseDir) {
    const dirPath = path.join(baseDir, "ebook");
    const dirNames = (await fs.readdir(dirPath)) || [];
    return dirNames
      .filter((dirName) => {
        const indexPath = path.join(baseDir, `ebook/${dirName}/index.html`);
        return fs.pathExistsSync(indexPath);
      })
      .map((dirName) => ({
        bookName: dirName,
        bookPath: `${baseDir}/${dirName}`,
      }));
  },

  async readHtmlFile(filePath) {
    let file = "";
    try {
      file = await fs.readFile(filePath, "UTF-8");
    } catch (e) {
      // pass
    }
    return file;
  },

  async readBookToc(baseDir, bookName) {
    const tocPath = path.join(baseDir, `ebook/${bookName}/index.html`);
    const html = await this.readHtmlFile(tocPath);
    const bodyHtml = this.getBodyInHtml(html);
    return bodyHtml;
  },

  async readChapter(baseDir, bookName, chapterId) {
    const chapterPath = path.join(baseDir, `ebook/${bookName}/chapters/${chapterId}.html`);
    const html = await this.readHtmlFile(chapterPath);
    const bodyHtml = this.getBodyInHtml(html);
    return bodyHtml;
  },
};
