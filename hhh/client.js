var Bridge = require('bridge');

var auth,
    apiKey;

var chatObject = {
    message: function(sender, message) {
        console.log(sender, ':', message);
    }
}

var bridge = new Bridge({apiKey:'5bffd2de'});

bridge.getService('auth', function(service){
    
    auth = service;
    
    auth.register('su', 'pass', function(key) {
        if (key) {
            apiKey = key;
            console.log("registration successful", apiKey);
        } else {
            console.log("reg failed");
        }
    });
});

bridge.connect();
