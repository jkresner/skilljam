exports.findAll = function(req, res) {
  items = [
    { _id: 1, name : 'rails', className: '' },
    { _id: 2, name : 'fundraising', className: 'label-success' },
    { _id: 3, name : 'javascript', className: 'label-warning' },
    { _id: 4, name : 'growth hacking', className: 'label-important' },
    { _id: 5, name : 'ux design', className: 'label-info' },
    { _id: 5, name : 'objective-c', className: 'label-inverse' }
  ]

  res.send(items);
};

