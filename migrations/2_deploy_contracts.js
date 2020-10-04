const JobPosting = artifacts.require("JobPost");

module.exports = function (deployer) {
  deployer.deploy(JobPosting);
};
