exports.findAll = function(req, res) {
    res.send( [ {name:'Jonathon'}, {name:'Alyssa'}, {name:'Evan'} ] );
};

exports.findById = function(req, res) {
    res.send( { id: req.params.id, name: "Evan"} );
};