import express from "express";
import { ensureAuth } from "../middlewares/auth";
import Story from "../models/Story";

const router = express.Router();

// Read add page
router.get("/add", ensureAuth, (req, res) => res.render("stories/add"));

// Create a new story page
router.post("/", ensureAuth, async (req: any, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Read all stories page
router.get("/", ensureAuth, async (req: any, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Read single story page
router.get("/:id", ensureAuth, async (req: any, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean();
    if (!story) return res.render("error/404");

    if (story.user?._id != req.user.id && story.status == "private") {
      res.render("error/404");
    } else {
      res.render("stories/show", { story });
    }
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

// Read edit page
router.get("/edit/:id", ensureAuth, async (req: any, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();
    if (!story) return res.render("error/404");

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", { story });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// Update story
router.put("/:id", ensureAuth, async (req: any, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) return res.render("error/404");
    console.log("update story", { story });

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// Delete story
router.delete("/:id", ensureAuth, async (req: any, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) return res.render("error/404");

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      await Story.deleteOne({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    User stories
// @route   GET /stories/user/:userId
router.get("/user/:userId", ensureAuth, async (req: any, res) => {
  try {
    const stories = await Story.find({ user: req.params.userId, status: "public" })
      .populate("user")
      .lean();

    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Search stories by title
//@route GET /stories/search/:query
router.get("/search/:query", ensureAuth, async (req: any, res) => {
  try {
    const stories = await Story.find({ title: new RegExp(req.query.query, "i"), status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.log(err);
    res.render("error/404");
  }
});

export default router;
