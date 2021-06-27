const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}`;

app.listen(port, () => console.log(`live at ${url}`));
app.use(express.static("public"));
app.use(express.json({ limit: "100mb" }));

const pulseurl = "https://pulsenitk.in";

const ieeeUrl = "https://ieee.nitk.ac.in/blog/";

const irisUrl = "https://blog.iris.nitk.ac.in";

let pulse = async (siteUrl) => {
  const response = await axios.get(siteUrl);
  const html = response.data;

  const $ = cheerio.load(html);
  let blogLinks = [];
  let blognames = [];

  $(".post-title").each((i, element) => {
    let element1 = $(element).attr("href");
    if (element1 != undefined) {
      let element2 = $(element).find("h2").text();
      element2 = element2.replace(/\t+/g, "");
      blogLinks.push(element1);
      blognames.push(element2);
    }
  });
  console.log(blogLinks, blognames);
  return { blogLinks: blogLinks, blognames: blognames };
};

let iris = async (siteUrl) => {
    const response = await axios.get(siteUrl);
    const html = response.data;
    // console.log(html);
  
    const $ = cheerio.load(html);
    let blogLinks = [];
    let blognames = [];
  
    $(".entry-title").each((i, element) => {
      let element1 = $(element).find("a").attr("href");
      let element2 = $(element).find("a").text();
    
        element2 = element2.replace(/\t+/g, "");
        blogLinks.push(element1);
        blognames.push(element2);
      
    });
    console.log(blogLinks, blognames);
    return { blogLinks: blogLinks, blognames: blognames };
  };

  let ieee = async (siteUrl) => {
    const response = await axios.get(siteUrl);
    const html = response.data;
    // console.log(html);
  
    const $ = cheerio.load(html);
    let blogLinks = [];
    let blognames = [];
  
    $(".post-title").each((i, element) => {
      let element1 = $(element).attr("href");
      if (element1 != undefined) {
        let element2 = $(element).find("h2").text();
        element2 = element2.replace(/\t+/g, "");
        blogLinks.push(element1);
        blognames.push(element2);
      }
    });
    console.log(blogLinks, blognames);
    return { blogLinks: blogLinks, blognames: blognames };
  };


app.get("/pulse", async (req, res) => {
  const response = await pulse(pulseurl);
  res.send(response);
});

app.get("/iris", async (req, res) => {
  const response = await iris(irisUrl);
  res.send(response);
});

app.get("/ieee", async (req, res) => {
  const response = await pulse(pulseurl);
  res.send(response);
});
