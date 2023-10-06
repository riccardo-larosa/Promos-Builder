import * as myFunc from './functions.js';

document.getElementById("iconAddCondition").addEventListener('click', function() {
  myFunc.toggleVisibility('addCondition');
});

document.getElementById('shoppingCart').addEventListener('click', function() {
  myFunc.addConditionWholeCart();
});

document.getElementById('cartItemsQuantity').addEventListener('click', function() {
  myFunc.addConditionCartItem();
});

document.getElementById('customers').addEventListener('click', function() {
  myFunc.addConditionCustomers();
});

document.getElementById('customAttributes').addEventListener('click', function() {
  myFunc.addConditionCustomAttributes();
});

document.getElementById('iconAddAction').addEventListener('click', function() {
  myFunc.toggleVisibility('addAction');
});

document.getElementById('cartDiscount').addEventListener('click', function() {
  myFunc.addActionWholeCart();
});

document.getElementById('cartItemsDiscount').addEventListener('click', function() {
  myFunc.addActionSelectedCart();
});

document.getElementById('cartItemsSelectedDiscount').addEventListener('click', function() {
  myFunc.addActionOtherItemsCart();
});

document.getElementById('createJSON').addEventListener('click', function() {
  document.getElementById('JSONpopup').style.display = 'block';
  var jsonPopupCode = document.getElementById('jsonPopupCode');
  jsonPopupCode.innerText = JSON.stringify(myFunc.createJSONString(), null, 2);
  //myFunc.createJSONString();
});


document.getElementById('closeJSONBtn').addEventListener('click', function() {
  document.getElementById('JSONpopup').style.display = 'none';
});