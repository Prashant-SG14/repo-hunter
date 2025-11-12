import express from "express";
import { domainTopicsMap } from "../config/topicMap.js";
const router = express.Router();
const domains = Object.keys(domainTopicsMap);
router.get("/", (req, res) => {
  return res.json(domains);
});

router.get("/:domain", (req, res) => {
  console.log(req.params);
  const specificDomain = req.params.domain;
  if (!domains.find((domain) => domain === specificDomain)) {
    return res.status(404).json({ message: "Domain not found" });
  }
  console.log(domainTopicsMap[specificDomain].topics);
  return res.json(domainTopicsMap[specificDomain].topics);
});
export default router;
