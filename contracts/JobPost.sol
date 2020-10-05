pragma solidity ^0.5.0;

// create a contract
contract JobPost {
	//create a state variable to keep track of number of jobs
	uint public jobCount = 0; //public allows us to read the variable

	//data structure of Job
	struct Job{
		uint id;
		string jobDescription;
		bool jobRemove;
	}

	// an array like variable to store jobs
	mapping(uint => Job) public jobs;

	event JobCreated(
		uint id,
		string jobDescripton,
		bool jobRemove
	);

	event jobToggleRemove(
		uint id,
		bool jobRemove
	);
	// constructor
	constructor() public{
		createJob("Java developer in Auckland");
	}

	//function to create job
	function createJob(string memory _jobDescription) public{
		jobCount++;
		jobs[jobCount] = Job(jobCount, _jobDescription, false);
		emit JobCreated(jobCount, _jobDescription, false);
	}

	//toggle jobToggle
	function jobToggle(uint _id)public{
		Job memory _job = jobs[_id];
		_job.jobRemove = !_job.jobRemove;
		jobs[_id] = _job;
		emit jobToggleRemove(_id, _job.jobRemove);
	}
}