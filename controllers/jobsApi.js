const Job = require('../models/jobModels');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

// CRUD REST APIs for Job

// Create job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Get all jobs for a logged in user
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// get single job by id
const getJobById = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.find({
    _id: jobId,
    createdBy: userId,
  });
  // if job doesn't exist then throw error
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// update job by id
const updateJobById = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty!!");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  // if job not found then throw error
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// delete job by id
const deleteJobById = async (req,res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const delJob = await Job.findByIdAndDelete({
        _id:jobId,
        createdBy:userId
    })
    // if job not found then throw error
    if (!delJob) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json('job details has been removed successfully!!');
}

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};


