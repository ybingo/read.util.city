"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  router.get("/", controller.view.renderHome);

  router.post("/v1/toc", controller.api.fetchBookToc);
  router.post("/v1/chapters", controller.api.fetchChapters);
};
