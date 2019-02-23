/* Presupuesto Controller */
var presupuestoController = (function(){

	var Gastos = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value;
	};

	var Ingresos = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value;
	};

	var data = {
		allItems: { gasto: [], ingreso: [] },
		totals:  {  gasto: 0,  ingreso: 0 }
	};

	return {
		addItem: function(type, desc, val){
			var newItem, ID;

// Create new  ID y condition for value not add
if(data.allItems[type].length > 0){
ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
}else{
	ID = 0;
}
			// Create new item based on 'Gasto' or 'Ingresos' type
			if(type === 'gasto' ){
				newItem = new Gastos(ID, desc, val);
			}else if(type === 'ingreso' ){
				newItem = new Ingresos(ID, desc, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		}
	};

})();





/* ui controller */
var UIController = (function(){

	var DOMstrings = {
			inputType : '.option_type',
			inputDescription: '.option_description',
			inputValue: '.option_value',
			inputBTN: '.btn_add',
			gastoContainer: '.gastos_list',
			ingresoContainer: '.ingresos_list'
	};

	/* get input data */
	return {
			getInput: function(){
				return{
					type: document.querySelector(DOMstrings.inputType).value,
					description: document.querySelector(DOMstrings.inputDescription).value,
					value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
				};
			},
			addListItem: function( obj, type ){
				// Create HTML string with placeholder text
				var html, newHtml, element;

				if(type === 'ingreso'){
					element = DOMstrings.ingresoContainer;
					html = `<tr id="ingreso-%id%">
                              <td>${ obj.id+1 }</td>
                              <td class="item_description">%description% </td>
                              <td> ... </td>
                              <td class="item_value"> %value% </td>
                              <td class="item_delete">
                                <a class="item_delete-btn">
                                        X
                                </a>
                              </td>
                            </tr>`;
				}else if( type === 'gasto' ){
					element = DOMstrings.gastoContainer;
					html = `<tr id="gasto-%id%">
                              <td>${ obj.id+1 }</td>
                              <td class="item_description">%description%</td>
                              <td class="item_percentage"> ... </td>
                              <td class="item_value">%value%</td>
                              <td class="item_delete">
                                <a class="item_delete-btn">
                                    X
                                </a>
                              </td>
                            </tr>`;
				}

				// replace the placeholder text with some
				newHtml = html.replace('%id%', obj.id);
				newHtml = newHtml.replace('%description%', obj.description);
				newHtml = newHtml.replace('%value%', obj.value);

				// Insert the HTML into the DOM
				document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
			},

			getDOMstrings: function(){ return DOMstrings; }
		};
})();

// GLOBAL APP CONTROLLER
var controller = (function(presupuestoCtrl, UICtrl){

	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBTN).addEventListener('click', ctrlAdd_item);
		document.addEventListener('keypress', function(event){
						if(event.keyCode === 13 || event.which === 13){
							ctrlAdd_item();
						}
		});
	};

	var ctrlAdd_item = function(){
		var input, newItem;
		// get the field input data
		input = UICtrl.getInput();
		// add the item to the presupuestoController
		newItem = presupuestoCtrl.addItem( input.type, input.description, input.value);
		// add the item to the UI
		UICtrl.addListItem(newItem, input.type);
		console.log("dasd");
	};

	return {
		init: function(){
			console.log("APP has started!");
			setupEventListeners();
		}
	};
	// document.querySelector('.btn_add').addActionEvent(){};
})(presupuestoController, UIController);

controller.init();
