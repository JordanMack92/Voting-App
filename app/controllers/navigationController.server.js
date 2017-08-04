var methods = {};

methods.navbar = function(req, res){
    if(req.isAuthenticated()){
        var nav = '<nav class="navbar navbar-inverse">\
            <div class="container-fluid">\
                <div class="navbar-header">\
                    <a class="navbar-brand" href="/">Voting App</a>\
                </div>\
                <ul class="nav navbar-nav">\
                    <li class="active"><a href="/home">Home</a></li>\
                    <li><a href="/profile">Profile</a></li>\
                    <li><a href="/create">Create Poll</a></li>\
                    <li><a href="/polls">Polls</a></li>\
                </ul>\
                <ul class="nav navbar-nav navbar-right">\
                    <li><a>Hello '+  req.user.local.name +' </a></li>\
                    <li><a href="/logout"><span class="glyphicon glyphicon-log-in"></span>Logout</a></li>\
                </ul>\
    </div>\
    </nav>';
    res.send(nav);
    }
    else {
        var nav = '<nav class="navbar navbar-inverse">\
            <div class="container-fluid">\
                <div class="navbar-header">\
                    <a class="navbar-brand" href="/">Voting App</a>\
                </div>\
                <ul class="nav navbar-nav">\
                    <li><a href="/polls">Polls</a></li>\
                </ul>\
                <ul class="nav navbar-nav navbar-right">\
                    <li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>\
                    <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>\
                </ul>\
     </div>\
    </nav>';
    res.send(nav);
    }
    
    
};

module.exports = methods;