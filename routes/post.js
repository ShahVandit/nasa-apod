const router = require("./user");
const downloader = require("image-downloader");

router.post("/", (req, res) => {
  //   const date = req.body.date;
  //   details
  //     .findOne({ date: date })
  //     .then((post) => {
  //       // Post found
  //       if (post) {
  //         //   Image
  //         if (post.media_type == "image") {
  //           res.render("index", {
  //             date: post.date,
  //             imgloc: post.imgloc,
  //             explanation: post.explanation,
  //             title: post.title,
  //             media_type: post.media_type,
  //             url: post.url,
  //           });
  //           // Video
  //         } else {
  //           res.render("index", {
  //             date: post.date,
  //             explanation: post.explanation,
  //             title: post.title,
  //             media_type: post.media_type,
  //             url: post.url,
  //           });
  //         }
  //       }
  //       // Post Not found
  //       else {
  //         request(
  //           `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`,
  //           { json: true },
  //           (error, response, body) => {
  //             //   Date unavailable
  //             if (body.code == 400) {
  //               res.json({ msg: body.msg });
  //             }
  //             // Date available
  //             // Add to DB and display
  //             else {
  //               if (body.media_type == "image") {
  //                 downloader
  //                   .image({ url: body.url, dest: `./website` })
  //                   .then((fname) => {
  //                     const imgloc = fname.filename;
  //                     const imgLoc = imgloc.replace(/\\/g, "/");
  //                     const newDetails = new details({
  //                       date: body.date,
  //                       imgloc: imgloc,
  //                       explanation: body.explanation,
  //                       title: body.title,
  //                       media_type: body.media_type,
  //                       url: body.url,
  //                     });
  //                     newDetails
  //                       .save()
  //                       .then((details) => {
  //                         res.render("index", {
  //                           date: details.date,
  //                           imgloc: details.imgloc,
  //                           explanation: details.explanation,
  //                           title: details.title,
  //                           media_type: details.media_type,
  //                           url: details.url,
  //                         });
  //                       })
  //                       .catch((err) => {
  //                         res.json({ error: err });
  //                       });
  //                   });
  //               }
  //               if (body.media_type == "video") {
  //                 const newDetails = new details({
  //                   date: body.date,
  //                   explanation: body.explanation,
  //                   title: body.title,
  //                   media_type: body.media_type,
  //                   url: body.url,
  //                 });
  //                 newDetails
  //                   .save()
  //                   .then((details) => {
  //                     res.render("index", {
  //                       date: details.date,
  //                       explanation: details.explanation,
  //                       title: details.title,
  //                       media_type: details.media_type,
  //                       url: details.url,
  //                     });
  //                   })
  //                   .catch((err) => {
  //                     res.json({ error: err });
  //                   });
  //               }
  //             }
  //           }
  //         );
  //       }
  //     })
  //     .catch((err) => console.log(err));
});
