const express = require('express');
const router = express.Router()

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
} = require("../controllers/jobsApi");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJobById).patch(updateJobById).delete(deleteJobById);


module.exports = router;
