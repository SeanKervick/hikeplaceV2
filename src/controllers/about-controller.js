export const aboutController = {
    index: {
      auth: false,
      handler: function (request, h) {
        const viewData = {
          title: "about hikeplace",
        };
        return h.view("about-view", viewData);
      },
    },
  };