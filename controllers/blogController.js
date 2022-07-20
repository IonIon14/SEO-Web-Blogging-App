// import Blog from "../models/Blog.js";
// import Category from "../models/Category.js";
// import Tag from "../models/Tag.js";
// import formidable from "formidable";
// import slugify from "slugify";
// import { stripHtml } from "string-strip-html";
// import _ from "lodash";
// import { errorHandler } from "../helpers/dbErrorHandler.js";
// import fs from "fs";
// import { smartTrim } from "../helpers/blog.js";

// const create = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image could not upload",
//       });
//     }

//     const { title, body, categories, tags } = fields;

//     if (!title || !title.length) {
//       return res.status(400).json({
//         error: "Title is required",
//       });
//     }

//     if (!body || body.length < 200) {
//       return res.status(400).json({
//         error: "Content is too short",
//       });
//     }

//     if (!categories || categories.length === 0) {
//       return res.status(400).json({
//         error: "At least one category is required",
//       });
//     }

//     if (!tags || tags.length === 0) {
//       return res.status(400).json({
//         error: "At least one tag is required",
//       });
//     }

//     let blog = new Blog();
//     blog.title = title;
//     blog.body = body;
//     blog.excerpt = smartTrim(body, 320, " ", " ...");
//     blog.slug = slugify(title).toLowerCase();
//     blog.mTitle = `${title} | ${process.env.APP_NAME}`;
//     blog.mDescription = stripHtml(body.substring(0, 160));
//     blog.postedBy = req.user._id;
//     // categories and tags
//     let arrayOfCategories = categories && categories.split(",");
//     let arrayOfTags = tags && tags.split(",");
//     console.log(files.photo);
//     if (files.photo) {
//       if (files.photo.size > 10000000) {
//         return res.status(400).json({
//           error: "Image should be less then 1mb in size",
//         });
//       }
//       blog.photo.data = fs.readFileSync(files.photo.path);
//       blog.photo.contentType = files.photo.type;
//     }

//     blog.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: errorHandler(err),
//         });
//       }
//       // res.json(result);
//       Blog.findByIdAndUpdate(
//         result._id,
//         { $push: { categories: arrayOfCategories } },
//         { new: true }
//       ).exec((err, result) => {
//         if (err) {
//           return res.status(400).json({
//             error: errorHandler(err),
//           });
//         } else {
//           Blog.findByIdAndUpdate(
//             result._id,
//             { $push: { tags: arrayOfTags } },
//             { new: true }
//           ).exec((err, result) => {
//             if (err) {
//               return res.status(400).json({
//                 error: errorHandler(err),
//               });
//             } else {
//               res.json(result);
//             }
//           });
//         }
//       });
//     });
//   });
// };

// export { create };

import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import Tag from "../models/Tag.js";
import formidable from "formidable";
import slugify from "slugify";
import { stripHtml } from "string-strip-html";
import _ from "lodash";
import { errorHandler } from "../helpers/dbErrorHandler.js";
import fs from "fs";
import { smartTrim } from "../helpers/blog.js";

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: "title is required",
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short",
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "At least one tag is required",
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, " ", " ...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = req.user._id;
    // categories and tags
    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");
    console.log(files);
    if (files["photo\n"]) {
      if (files["photo\n"].size > 10000000) {
        return res.status(400).json({
          error: "Image should be less then 1mb in size",
        });
      }
      blog.photo.data = fs.readFileSync(files["photo\n"].filepath);
      blog.photo.contentType = files["photo\n"].mimetype;
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // res.json(result);
      Blog.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              res.json(result);
            }
          });
        }
      });
    });
  });
};

const getBlogs = (req, res) => {
  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

const getBlogsCategoriesTags = (req, res) => {};

const getBlog = (req, res) => {};

const removeBlog = (req, res) => {};

const updateBlog = (req, res) => {};

export {
  create,
  getBlogs,
  getBlog,
  getBlogsCategoriesTags,
  updateBlog,
  removeBlog,
};
