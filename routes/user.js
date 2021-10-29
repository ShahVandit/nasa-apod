const express = require("express");
const request = require("request");
const downloader = require("image-downloader");
const { API_KEY } = require("../config/key");
const details = require("../models/schema");

const router = express.Router();

router.get("/", (req, res) => {
  const d = new Date();
  const datei = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() - 1}`;
  details.findOne({ date: datei }).then((post) => {
    if (post) {
      // Already stored in the db
      res.render("index", {
        msg: "",
        displayDate: datei,
        title: post.title,
        date: post.date,
        imgloc: post.imgloc,
        explanation: post.explanation,
        media_type: post.media_type,
        url: post.url,
      });
    } else {
      // New entry
      request(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${datei}`,
        { json: true },
        (error, response, body) => {
          // Date not available
          if (body.code == 400) {
            res.render("index", {
              msg: body.msg,
              displayDate: datei,
              date: "",
              imgloc: "",
              explanation: "",
              title: "",
              media_type: "",
              url: "",
            });
            // Date available
          } else {
            downloader
              .image({ url: body.url, dest: `./website/` })
              .then((name) => {
                if (body.media_type == "image") {
                  const imgloc = name.filename;
                  const imgLoc = imgloc.replace(/\\/g, "/");
                  const newDetails = new details({
                    date: body.date,
                    explanation: body.explanation,
                    title: body.title,
                    media_type: body.media_type,
                    url: body.url,
                    imgloc: imgLoc,
                  });
                  newDetails
                    .save()
                    .then((details) => {
                      res.render("index", {
                        msg: "",
                        displayDate: datei,
                        date: details.date,
                        imgloc: imgloc,
                        explanation: details.explanation,
                        title: details.title,
                        media_type: details.media_type,
                        url: details.url,
                      });
                    })
                    .catch((err) => {
                      res.json({ error: err });
                    });
                } else {
                  const newDetails = new details({
                    date: body.date,
                    explanation: body.explanation,
                    title: body.title,
                    media_type: body.media_type,
                    url: body.url,
                  });
                  newDetails
                    .save()
                    .then((details) => {
                      res.render("index", {
                        msg: "",
                        displayDate: datei,
                        date: details.date,
                        explanation: details.explanation,
                        title: details.title,
                        media_type: details.media_type,
                        url: details.url,
                      });
                    })
                    .catch((err) => {
                      res.json({ error: err });
                    });
                }
              })
              .catch((err) => console.log(err));
          }
        }
      );
    }
  });
});

router.post("/", (req, res) => {
  const datei = req.body.date;
  details
    .findOne({ date: datei })
    .then((post) => {
      // Post found
      if (post) {
        //   Image
        if (post.media_type == "image") {
          res.render("index", {
            msg: "",
            displayDate: datei,
            date: post.date,
            imgloc: post.imgloc,
            explanation: post.explanation,
            title: post.title,
            media_type: post.media_type,
            url: post.url,
          });
          // Video
        } else {
          res.render("index", {
            msg: "",
            displayDate: datei,
            date: post.date,
            explanation: post.explanation,
            title: post.title,
            media_type: post.media_type,
            url: post.url,
          });
        }
      }
      // Post Not found
      else {
        request(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${datei}`,
          { json: true },
          (error, response, body) => {
            //   Date unavailable
            if (body.code == 400) {
              res.render("index", {
                msg: body.msg,
                displayDate: datei,
                date: "",
                imgloc: "",
                explanation: "",
                title: "",
                media_type: "",
                url: "",
              });
            }
            // Date available
            // Add to DB and display
            else {
              // Image
              if (body.media_type == "image") {
                downloader
                  .image({ url: body.url, dest: `./website` })
                  .then((fname) => {
                    const imgloc = fname.filename;
                    const imgLoc = imgloc.replace(/\\/g, "/");
                    const newDetails = new details({
                      date: body.date,
                      imgloc: imgloc,
                      explanation: body.explanation,
                      title: body.title,
                      media_type: body.media_type,
                      url: body.url,
                    });
                    newDetails
                      .save()
                      .then((details) => {
                        res.render("index", {
                          msg: "",
                          displayDate: datei,
                          date: details.date,
                          imgloc: details.imgloc,
                          explanation: details.explanation,
                          title: details.title,
                          media_type: details.media_type,
                          url: details.url,
                        });
                      })
                      .catch((err) => {
                        res.json({ error: err });
                      });
                  });
              }
              // Video
              if (body.media_type == "video") {
                const newDetails = new details({
                  date: body.date,
                  explanation: body.explanation,
                  title: body.title,
                  media_type: body.media_type,
                  url: body.url,
                });
                newDetails
                  .save()
                  .then((details) => {
                    res.render("index", {
                      msg: "",
                      displayDate: datei,
                      date: details.date,
                      explanation: details.explanation,
                      title: details.title,
                      media_type: details.media_type,
                      url: details.url,
                    });
                  })
                  .catch((err) => {
                    res.json({ error: err });
                  });
              }
            }
          }
        );
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
