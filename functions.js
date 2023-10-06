let rowConditionNum = 1; // Initialize row number
let rowActionNum = 1;


export function setupPage() {
  // Add code here to setup conditions when body is fully loaded
}

export function toggleVisibility(elementId) {
  var el = document.getElementById(elementId);
  el.classList.toggle('hidden');
}

export function addConditionWholeCart() {
  var row = document.createElement('div');
  row.id = 'row' + rowConditionNum;
  row.classList.add('rule-editor-box-options');

  var selectAmtOrQty = creatCartAmtOrQtySelector();
  var listOfNumbericalComparisons = createNumericalComparisonSelector();
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();
  var inputAmtOrQty = createInputAmtOrQty('$50');
  var p = document.createElement('p');

  //row.appendChild(p);
  //var lbCartTotal = createLabel('Cart Total ');
  //row.appendChild(lbCartTotal);
  row.appendChild(selectAmtOrQty);
  row.appendChild(listOfNumbericalComparisons);
  row.appendChild(inputAmtOrQty);
  var p2 = document.createElement('p');
  row.appendChild(p2);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);

  rowConditionNum++;
  document.getElementById('conditionsList').appendChild(row);
  toggleVisibility('addCondition');
}

export function addConditionCartItem() {
  var row = document.createElement('div');
  row.id = 'row' + rowConditionNum;
  row.classList.add('rule-editor-box-options');

  var listOfCartItems = createCartItemsSelector('conditions');
  //listOfCartItems.onchange = selectItemsPopUp();
  var selectAmtOrQty = creatAmtOrQtySelector();
  var listOfNumbericalComparisons = createNumericalComparisonSelector();
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();
  var inputAmtOrQty = createInputAmtOrQty('$50');
  var p = document.createElement('p');


  var label = createLabel("List of items ");
  row.appendChild(label);
  row.appendChild(createIsorIsNotSelector());
  row.appendChild(listOfCartItems);
  row.appendChild(p);
  row.appendChild(selectAmtOrQty);
  row.appendChild(listOfNumbericalComparisons);
  row.appendChild(inputAmtOrQty);
  var p2 = document.createElement('p');
  row.appendChild(p2);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);
  rowConditionNum++;

  document.getElementById('conditionsList').appendChild(row);
  toggleVisibility('addCondition')
}

export function createLabel(text) {
  var label = document.createElement('label');
  label.innerText = text;
  return label;
}

export function createCartItemsSelector(type) {
  var listOfCartItems = document.createElement('select');
  if (type == 'conditions') {
    listOfCartItems.id = 'listOfCartItems' + rowConditionNum;
  } else {
    listOfCartItems.id = 'listOfCartItems' + rowActionNum;
  }
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');
  var option4 = document.createElement('option');
  var option5 = document.createElement('option');
  option1.text = 'All items in the cart';
  option1.value = 'all';
  option2.text = 'Select PXM Category';
  option2.value = 'category';
  option3.text = 'Select PXM Product';
  option3.value = 'product';
  option4.text = 'Select PXM Template';
  option4.value = 'template';
  option5.text = 'Select PXM Attribute';
  option5.value = 'attribute';
  listOfCartItems.add(option1);
  listOfCartItems.add(option2);
  listOfCartItems.add(option3);
  listOfCartItems.add(option4);
  listOfCartItems.add(option5);
  listOfCartItems.onchange = function() { selectItemsPopUp(type, this) };
  return listOfCartItems;
}

export function selectItemsPopUp(type, element) {
  var val = element.value;
  //get the parent div of the select box: rowN
  var popUp = document.createElement('div');
  // we need to choose here if to attach to conditionsList or actionsList
  var currentRow;
  if (type == 'actions') {
    currentRow = document.getElementById('actionsList');
  } else {
    currentRow = document.getElementById('conditionsList');
  }
  popUp.id = element.parentNode.id + 'PopUp';
  popUp.classList.add('rule-editor-box-options');

  //For Category show the PopUP
  if (val == 'category') {
    var sourceDiv = document.getElementById('popUp');
    popUp.innerHTML = sourceDiv.innerHTML;
    popUp.querySelector('#closeConditionsItemsPopup').addEventListener('click', function() {
      closePopUp(this);
    });

  }
  //For Product show the SKU selector
  if (val == 'product') {
    var skulbl = createLabel('SKU');
    var sku = createInputAmtOrQty('SKU123');
    popUp.appendChild(skulbl);
    popUp.appendChild(sku);
    var p = document.createElement('p');
    popUp.appendChild(p);
    popUp.appendChild(createOkBtn(this));

  }

  currentRow.appendChild(popUp);
  // hide rowN
  toggleVisibility(element.parentNode.id);
  //toggleVisibility('conditionsList');

}

export function closePopUp(element) {
  // used by the PXM Category form to select the first checkbox 
  // and replace the value of the dropdown menu with the checked checkbox

  //alert(element.parentNode.parentNode.id);
  // this is row1PopUp
  var rowidPopUp = element.parentNode.parentNode.id;
  var rowid = rowidPopUp.substring(0, rowidPopUp.length - 5);
  var id = rowid.slice(-1);
  console.log(rowid);
  var divPopUp = document.getElementById(rowidPopUp);
  var divN = document.getElementById(rowid);
  var checkboxes = divPopUp.querySelectorAll('input[type=checkbox]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      var input = createInputAmtOrQty(checkboxes[i].name);
      break;
    }
  }
  //remove select
  // TODO: I need to know if it's conditions or actions
  var select;
  if (rowid.includes('Action')) {
    var div = document.getElementById('actionsList');
    select = div.querySelector('#listOfCartItems' + id);
  } else {
    select = document.getElementById('listOfCartItems' + id);
  }
  //var select = document.getElementById('listOfCartItems' + id);
  select.parentNode.insertBefore(input, select.nextSibling);
  //divN.removeChild(document.getElementById('listOfCartItems' + id));
  divN.removeChild(select);
  element.parentElement.parentElement.remove();
  toggleVisibility(rowid);

}

export function createIsorIsNotSelector() {
  var isOrIsNot = document.createElement('select');
  isOrIsNot.id = 'isOrIsNot' + rowConditionNum;
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  option1.text = 'is';
  option1.value = 'is';
  option2.text = 'is not';
  option2.value = 'is not';
  isOrIsNot.add(option1);
  isOrIsNot.add(option2);
  isOrIsNot.onchange = function() { selectIsOrIsNot(this) };
  return isOrIsNot;
}

export function selectIsOrIsNot(element) {
  var val = element.value;
  var rowid = element.parentNode.id;
  console.log('rowid: ' + rowid);
  var id = rowid.slice(-1);
  var divN = document.getElementById(rowid);
  // remove the selector for amtOrQty, stringcomparison, inputAmtOrQty
  divN.removeChild(document.getElementById('amtOrQty' + id));
  divN.removeChild(document.getElementById('listOfNumbericalComparison' + id));
  console.log('inputAmtOrQty' + id);
  // this may already exist so it throws an error. 
  // we need to search for inputAmtOrQtyN inside the divN first
  var inputAmtOrQtyN = divN.querySelector('input[id=inputAmtOrQty' + id + ']');
  divN.removeChild(inputAmtOrQtyN);


}

export function creatCartAmtOrQtySelector() {
  var amtOrQty = document.createElement('select');
  amtOrQty.id = 'cartAmtOrQty' + rowConditionNum;
  var optionAmt = document.createElement('option');
  var optionQty = document.createElement('option');
  optionAmt.text = 'Cart Items Amount ($)';
  optionAmt.value = 'amount';
  optionQty.text = 'Cart Items Quantity';
  optionQty.value = 'quantity';
  amtOrQty.add(optionAmt);
  amtOrQty.add(optionQty);
  return amtOrQty;
}

export function creatAmtOrQtySelector() {
  var amtOrQty = document.createElement('select');
  amtOrQty.id = 'amtOrQty' + rowConditionNum;
  var optionAmt = document.createElement('option');
  var optionQty = document.createElement('option');
  optionAmt.text = 'Amount ($)';
  optionAmt.value = 'amount';
  optionQty.text = 'Quantity';
  optionQty.value = 'quantity';
  amtOrQty.add(optionAmt);
  amtOrQty.add(optionQty);
  return amtOrQty;
}

export function createNumericalComparisonSelector() {
  var listOfNumbericalComparison = document.createElement('select');
  listOfNumbericalComparison.id = 'listOfNumbericalComparison' + rowConditionNum;
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');
  option1.text = 'is equal to';
  option1.value = 'eq';
  option2.text = 'is equal to or greater than';
  option2.value = 'gte';
  option2.selected = true;
  option3.text = 'is greater than';
  option3.value = 'gt';


  listOfNumbericalComparison.add(option1);
  listOfNumbericalComparison.add(option2);
  listOfNumbericalComparison.add(option3);

  return listOfNumbericalComparison;
}

export function createInputAmtOrQty(text) {
  var input = document.createElement('input');
  input.id = 'inputAmtOrQty' + rowConditionNum;
  input.type = 'text';
  input.value = text;
  return input;
}

export function createInputText() {
  var input = document.createElement('input');
  input.id = 'inputText' + rowConditionNum;
  input.type = 'text';
  //input.placeholder = 'Enter Amount or Quantity';
  return input;
}

export function createSaveBtn() {
  var button = document.createElement('button');
  button.id = 'saveButton';
  button.innerHTML = 'Save';
  button.classList.add('ant-btn');
  //button.onclick = saveButtonClicked;
  return button;
}

export function createRemoveBtn() {
  var button = document.createElement('button');
  button.id = 'removeButton';
  button.innerHTML = 'Delete';
  button.classList.add('ant-btn-link');
  button.onclick = function() {
    this.parentElement.remove();
  };
  return button;
}

export function createOkBtn(element) {
  var button = document.createElement('button');
  button.id = 'okButton';
  button.innerHTML = 'OK';
  button.classList.add('ant-btn');
  button.onclick = function() {
    closeModal(this);
    //    this.parentElement.remove();
  };
  return button;
}

export function closeModal(element) {
  var rowidPopUp = element.parentNode.id;
  console.log('rowidPopUp: ' + rowidPopUp);
  var rowid = rowidPopUp.substring(0, rowidPopUp.length - 5);
  var id = rowid.slice(-1);
  console.log('id: ' + id);
  var divPopUp = document.getElementById(rowidPopUp);
  var divN = document.getElementById(rowid);
  var inputVal = divPopUp.querySelectorAll('input[type=text]')[0];
  console.log(inputVal);
  var input = createInputAmtOrQty(inputVal.value);
  //remove select
  var select = document.getElementById('listOfCartItems' + id);
  select.parentNode.insertBefore(input, select.nextSibling);
  divN.removeChild(document.getElementById('listOfCartItems' + id));

  element.parentElement.remove();
  toggleVisibility(rowid);

}

export function addConditionCustomers() {
  var row = document.createElement('div');
  row.id = 'row' + rowConditionNum;
  row.classList.add('rule-editor-box-options');

  var listOfCustomerAttributes = createCustomerAttributesSelector();
  var listOfStringComparisons = createStringSelector();
  var inputAmtOrQty = createInputText();
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();

  row.appendChild(listOfCustomerAttributes);
  row.appendChild(listOfStringComparisons);
  row.appendChild(inputAmtOrQty);
  var p = document.createElement('p');
  row.appendChild(p);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);

  rowConditionNum++;
  document.getElementById('conditionsList').appendChild(row);
  toggleVisibility('addCondition');
}

export function addConditionCustomAttributes() {
  var row = document.createElement('div');
  row.id = 'row' + rowConditionNum;
  row.classList.add('rule-editor-box-options');
  var listOfCustomAttributes = createCustomAttributesSelector();
  var listOfStringComparisons = createStringSelector();
  var inputAmtOrQty = createInputText();
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();

  row.appendChild(listOfCustomAttributes);
  row.appendChild(listOfStringComparisons);
  row.appendChild(inputAmtOrQty);
  var p = document.createElement('p');
  row.appendChild(p);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);

  rowConditionNum++;
  document.getElementById('conditionsList').appendChild(row);
  toggleVisibility('addCondition');
}

function createCustomAttributesSelector() {
  var select = document.createElement('select');
  select.id = 'listOfCustomAttributes' + rowConditionNum;
  select.classList.add('ant-select');
  select.classList.add('ant-select-lg');
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');

  option1.text = 'ERP Source ID';
  option1.value = 'ERP Source ID';
  option2.text = 'Is From Facebook';
  option2.value = 'Is From Facebook';
  option3.text = '<add yours ...>';
  option3.value = '<add yours ...>';

  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  return select;
}

export function createCustomerAttributesSelector() {
  var listOfCustomerAttributes = document.createElement('select');
  listOfCustomerAttributes.id = 'listOfCustomerAttributes' + rowConditionNum;
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');

  option1.text = 'Customer Segment';
  option1.value = 'segment';
  option2.text = 'Customer Email';
  option2.value = 'customerEmail';
  option3.text = 'Customer State';
  option3.value = 'state';
  listOfCustomerAttributes.add(option1);
  listOfCustomerAttributes.add(option2);
  listOfCustomerAttributes.add(option3);
  return listOfCustomerAttributes;
}

export function createStringSelector() {
  var listOfStringComparison = document.createElement('select');
  listOfStringComparison.id = 'listOfStringComparison' + rowConditionNum;
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');
  option1.text = 'contains';
  option1.value = 'like';
  option1.selected = true;
  option2.text = 'starts with';
  option2.value = 'startswith';
  option3.text = 'ends with';
  option3.value = 'endswith';

  listOfStringComparison.add(option1);
  listOfStringComparison.add(option2);
  listOfStringComparison.add(option3);

  return listOfStringComparison;
}

export function addActionWholeCart() {

  var row = document.createElement('div');
  row.id = 'rowAction' + rowActionNum;
  row.classList.add('rule-editor-box-options');
  var inputAmtOrQty = createInputAmtOrQty('20%');
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();
  var label = createLabel('Discount Cart:')

  row.appendChild(label);
  row.appendChild(inputAmtOrQty);
  var p = document.createElement('p');
  row.appendChild(p);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);
  document.getElementById('actionsList').appendChild(row);
  toggleVisibility('addAction');
  rowActionNum++;

  toggleVisibility('addAction');

}

export function addActionSelectedCart() {

  var row = document.createElement('div');
  row.id = 'rowAction' + rowActionNum;
  row.classList.add('rule-editor-box-options');
  var inputAmtOrQty = createInputAmtOrQty('20%');
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();
  var label = createLabel('Discount ')
  var cheapestSelector = createCheapestSelector();

  row.appendChild(label);
  row.appendChild(cheapestSelector);
  var lbl2 = createLabel('selected items ');
  row.appendChild(lbl2);
  row.appendChild(inputAmtOrQty);
  var p = document.createElement('p');
  row.appendChild(p);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);
  document.getElementById('actionsList').appendChild(row);
  toggleVisibility('addAction');
  rowActionNum++;

  toggleVisibility('addAction');

}

export function createCheapestSelector() {
  var cheapestSelector = document.createElement('select');
  cheapestSelector.id = 'cheapestSelector' + rowActionNum;
  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');
  var option4 = document.createElement('option');

  option1.text = 'All';
  option1.value = 'all';
  option1.selected = true;
  option2.text = 'Any';
  option2.value = 'any';
  option3.text = 'Cheapest';
  option3.value = 'cheapest';
  option4.text = 'Most Expensive';
  option4.value = 'mostexpensive';
  cheapestSelector.add(option1);
  cheapestSelector.add(option2);
  cheapestSelector.add(option3);
  cheapestSelector.add(option4);
  return cheapestSelector;
}

export function addActionOtherItemsCart() {

  var row = document.createElement('div');
  row.id = 'rowAction' + rowActionNum;
  row.classList.add('rule-editor-box-options');
  var inputAmtOrQty = createInputAmtOrQty('20%');
  var saveBtn = createSaveBtn();
  var removeBtn = createRemoveBtn();
  var label = createLabel('Discount ')
  var cheapestSelector = createCheapestSelector();
  var itemsSelector = createCartItemsSelector('actions');
  row.appendChild(label);
  row.appendChild(cheapestSelector);
  //  var lbl2 = createLabel('selected items ');
  //  row.appendChild(lbl2);
  row.appendChild(itemsSelector);
  row.appendChild(inputAmtOrQty);
  var p = document.createElement('p');
  row.appendChild(p);
  row.appendChild(saveBtn);
  row.appendChild(removeBtn);
  document.getElementById('actionsList').appendChild(row);
  toggleVisibility('addAction');
  rowActionNum++;


}

export function createJSONString() {
  // create conditions
  /** 
  jsonRule = {
     "name": "Discount Cart",
     "conditions": {
                     "and": [
                       ["gte", "cart.total", 1000],
                       ["lte", "cart.total", 5000],
                       ["is", "customer.segment", "VIP"]
                     ]
                   },
     "actions": { 
        "discount": [
          ["cart.total", "10%"],
          ["freeShipping", true]"
        ] 
      } 
  }
  */
  /**  
"name": "Discount Cart",
"conditions": {
  "AND": [
    {
      "gte": [
        "amount",
        "$50"
      ],
      "filter": {
        "Item.Category": "Shoes",
        "Item.NodeId": 100012
      }
    },
    {
      "like": [
        "segment",
        ""
      ],
      "filter": {
        "Item.Category": "Shoes",
        "Item.NodeId": 100012
      }
    }
  ]
},
"actions": {},
}
  */
  var ruleName = document.getElementById('ruleName').value;
  var jsonString = {
    "name": ruleName,
    "conditions": {},
    "actions": {}
  };;

  var { selOperatorValue, jsonConditionArray } = createJSONConditions(jsonString);
  var jsonActionArray  = createJSONActions(jsonString);
  jsonString.conditions[selOperatorValue] = jsonConditionArray;
  jsonString.actions = jsonActionArray;
  console.log(JSON.stringify(jsonString));

  return jsonString;
}

function createJSONConditions(jsonString) {
  var selOperatorElem = document.getElementById('LogicSelector');
  var selOperatorValue = selOperatorElem.options[selOperatorElem.selectedIndex].value;
  //jsonString.conditions = {
  //  [selOperatorValue]: []
  //};
  //console.log(jsonString);
  // loop through all the children from conditionsList
  var conditionsList = document.getElementById('conditionsList');
  var jsonConditionArray = [];
  var filter;
  for (var i = 0; i < conditionsList.children.length; i++) {
    //console.log(conditionsList.children[i]);
    // row1 is the first child
    var rowN = conditionsList.children[i];
    console.log(rowN.children);
    // if the first child is the "label" then it has a cart item filter
    if (rowN.children[0].nodeName === 'LABEL') {
      // the first child is the attribute
      var attribute = rowN.children[4].options[rowN.children[4].selectedIndex].value;
      //the second child is the operation and comes from a select
      var operation = rowN.children[5].options[rowN.children[5].selectedIndex].value;
      //the third child is the value
      var value = rowN.children[6].value;
      filter = {
        "item.category": rowN.children[2].value,
        "item.nodeid": Math.floor(Math.random() * 10000000000)
      };

    } else {
      // the first child is the attribute
      var attribute = rowN.children[0].options[rowN.children[0].selectedIndex].value;
      //the second child is the operation and comes from a select
      var operation = rowN.children[1].options[rowN.children[1].selectedIndex].value;
      //the third child is the value
      var value = rowN.children[2].value;
      if (!filter) {
        filter = {
          "items": "*"
        };
      }
    }

    var jsonCondition = {
      [operation]: [attribute, value],
      "filter": filter
    };

    jsonConditionArray.push(jsonCondition);
    console.log(JSON.stringify(jsonConditionArray));

  }
  return { selOperatorValue, jsonConditionArray };
}

function createJSONActions(jsonString) {
  var actionsList = document.getElementById('actionsList');
  var jsonActionArray = [];
  for (var i = 0; i < actionsList.children.length; i++) {
    var rowN = actionsList.children[i];
    //var action = rowN.children[0].options[rowN.children[0].selectedIndex].value;
    var value = rowN.children[1].value;
    var jsonAction = {
      "discount": value,
      "filter" : {
        "items": "*"
      }
    };
    jsonActionArray.push(jsonAction);
  }
  return jsonActionArray;
}