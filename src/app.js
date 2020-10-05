App = {
    loading:false,

    contracts:{},

    load: async () =>{
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
        
    },

    //client side connect to blockchain
    //use Metamask to connect to blockchain, use web3 to talk to ethereum
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
            } catch (error) {
            // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async ()=>{
        App.account = web3.eth.accounts[0] //web3 object from loadWeb3, use first account of Ganache
        console.log(App.account);
    },

    loadContract: async ()=>{
        const jobPost = await $.getJSON('JobPost.json');
        App.contracts.jobPost = TruffleContract(jobPost); //create a handle of the contract in javascript
        App.contracts.jobPost.setProvider(App.web3Provider); //set the provider

        // get the deployed contract and store in App.jobPost
        App.jobPost = await App.contracts.jobPost.deployed(); 
    },

    //render the page
    render : async ()=>{
        if(App.loading){
            return;
        }
        
        App.setLoading(true);

        //render jobs
        await App.renderTask();

        //render account 
        $('#account').html(App.account);
        
        App.setLoading(false);
    },

    renderTask: async ()=>{
        const jobCount = await App.jobPost.jobCount();
        const $jobTemplate = $('.jobTemplate');

        for(var i=1; i<=jobCount; i++){
            const job = await App.jobPost.jobs(i);
            const jobId = job[0].toNumber();
            const jobDescription = job[1];
            const jobRemove = job[2];

        const $newJobTemplate = $jobTemplate.clone();
        $newJobTemplate.find('.content').html(jobDescription);
        $newJobTemplate.find('input')
                       .prop('name', jobId)
                       .prop('checked', jobRemove)
                       //.on('click', App.toogleRemove);

            if(jobRemove){
                $('#completedTaskList').append($newJobTemplate);

            }else{
                $('#taskList').append($newJobTemplate);
            }

            $newJobTemplate.show();
        }
    },

    // display and hide "loading"
    setLoading: (boolean) =>{
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        if(boolean){
            loader.show();
            content.hide();
        }else{
            loader.hide();
            content.show();
        }
    }
}

// Load function in browser
$(() => {
  $(window).load(() => {
    console.log('i  love car');
    App.load();
  })
})