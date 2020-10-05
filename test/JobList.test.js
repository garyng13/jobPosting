const JobList = artifacts.require('./JobPost.sol')

contract('JobPost', (accounts) => {
  before(async () => {
    this.jobList = await JobList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.jobList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists jobs', async () => {
    const jobCount = await this.jobList.jobCount()
    const job = await this.jobList.jobs(jobCount)
    assert.equal(job.id.toNumber(), jobCount.toNumber())
    assert.equal(job.jobDescription, 'Java developer in Auckland')
    assert.equal(job.jobRemove, false)
    assert.equal(jobCount.toNumber(), 1)
  })

  it('creates jobs', async () => {
    const result = await this.jobList.createJob('Java developer in Auckland')
    const jobCount = await this.jobList.jobCount()
    assert.equal(jobCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.jobDescription, 'Java developer in Auckland')
    assert.equal(event.jobRemove, false)
  })

  /*
  it('toggles task completion', async () => {
    const result = await this.todoList.toggleCompleted(1)
    const task = await this.todoList.tasks(1)
    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })*/

})