// CRUD APIs

const createJob = async (req,res) => {
    res.send('job created!!!');
}

const getAllJobs = async (req,res) => {
    res.send('Get all jobs');
}

const getJobById = async (req,res) => {
    res.send('Get job by Id');
}

const updateJobById = async (req,res) => {
    res.send('job updated!!');
}

const deleteJobById = async (req,res) => {
    res.send('delete job by Id');
}

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};


