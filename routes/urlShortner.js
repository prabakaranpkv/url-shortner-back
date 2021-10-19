import express from "express";
import shortid from "shortid";
import validUrl from "valid-url";
import { Users } from "../models/urlSchema.js";

const router = express.Router();

const baseUrl = "http://bit.ly/";

// Url Shortener
router.route("/shorten").post(async (request, response) => {
  const { longUrl, email } = request.body;

  if (!validUrl.isUri(baseUrl)) {
    return response.status(401).json("Invalid base URL");
  }

  const urlCode = shortid.generate();

  const shortUrl = `${baseUrl}/${urlCode}`;
  if (validUrl.isUri(longUrl)) {
    try {
      const url = await Users.findOne({
        email,
      });
      console.log("foundURL", url);
      url.urlData.push({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
        counts: 0,
      });
      await url.save();
      console.log("my Url is ", url.urlData);
      response
        .status(200)
        .send({ message: "Short Url Created successfully", url });
    } catch (err) {
      console.log(err);
      response.status(500).json("Server Error");
    }
  } else {
    response.status(401).json("Invalid longUrl");
  }
});
export const shortnerRouter = router;
