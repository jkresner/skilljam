exports.findAll = function(req, res) {
  items = [
    { _id: 1, name : 'JavaScript' },
    { _id: 2, name : 'Community Management' },
    { _id: 3, name : 'User Experience (UX)' },
    { _id: 4, name : 'Baking Muffins' },
    { _id: 5, name : 'Drinking' },
  ]

  res.send(items);
};

