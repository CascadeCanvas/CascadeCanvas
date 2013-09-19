/***** ELEMENTLIST *****/

//depends on element, objectTools
//is not a internal dependency

/**
* a collection of elements
*/
var ElementList = function(elements, selection){

    this.selection = selection;
    this.length = elements.length;
    var this_ = this;

    var init = function(){
    	implementGlobalMethods();
    };

    var implementGlobalMethods = function(){

        for (var i in CC.fn) {
            
            if (CC.isFunction(CC.fn[i])) {
                this_[i] = CC.fn[i];
            }

        }

    };

    /**
    * invoke an action for all elements selected
    */
    this.each = function(action){

        for (var i in elements) {

            action.call(elements[i]);

        }

        return this;

    };

    /**
    * get an element by the index
    */
    this.eg = function(index){
        return elements[index];
    };

    /**
    * returns a copy of the elements as array
    */
    this.asArray = function(){
        return elements.slice(0);
    };

    /**
    * invoke the constructors for this element
    * @param classesStr a string with the name of the classes to this element inherit, example:
    * 'Class1 Class2' - this element will inherit both
    */
    this.inherit = function(classesStr, opts){

        this.each(function(){
            this.inherit(classesStr, opts);
        });

        return this;

    };

    /**
    * autosort the collection by the attribute
    */
    this.sort = function(prop, invert){

        elements = CC.sort(elements, prop, invert);

        return this;

    };

    /**
    * search for an element on the collection with the attributes specified in the parameter
    */
    this.search = function(atrs){
        
        var result = [];

        this.each(function(){
            var thisSearch = this.matches(atrs);

            if (thisSearch) {

                result.push(this);

            }
        });

        return new ElementList(result, selection + "\n" + JSON.parse(atrs) + "\n\n");

    };

    this.merge = function(obj){

        this.each(function(){
            this.merge(obj);
        });

        return this;

    };

    this.remove = function(){

        this.each(function(){
            this.remove();
        });

    };

    this.removeClass = function(classe){

        this.each(function(){
            this.removeClass(classe);
        });

    };

    this.bind = function(eventsStr, action){

        var listOfEvents = [];

        this.each(function(){
            listOfEvents.push(
                this.bind(eventsStr, action)
            );
        });

        return {
            unbind: function() {
                for (var i in listOfEvents) {
                    listOfEvents[i].unbind();
                }
            }
        };

    };

    this.unbind = function(eventsStr, action){

        this.each(function(){
            this.unbind(eventsStr, action);
        });

        return this;

    };

    this.trigger = function(){

        this.each(function(){
            this.trigger.apply(this, arguments);
        });

        return this;

    };

    this.became = function(){

        var listOfEvents = [];

        this.each(function(){
            listOfEvents.push(
                this.became.apply(this, arguments)
            );
        });

        return {
            unbind: function() {
                for (var i in listOfEvents) {
                    listOfEvents[i].unbind();
                }
            }
        };

    };

    this.while = function(){

        var listOfEvents = [];

        this.each(function(){
            listOfEvents.push(
                this.while.apply(this, arguments)
            );
        });

        return {
            unbind: function() {
                for (var i in listOfEvents) {
                    listOfEvents[i].unbind();
                }
            }
        };

    };

    this.onClick = function(){

        var listOfEvents = [];

        this.each(function(){
            listOfEvents.push(
                this.onClick.apply(this, arguments)
            );
        });

        return {
            unbind: function() {
                for (var i in listOfEvents) {
                    listOfEvents[i].unbind();
                }
            }
        };

    };


    this.hideAllLayers = function(){

        this.each(function(){
            this.hideAllLayers();
        });

    };


    this.toggleLayers = function(toHide, toShow){

        this.each(function(){
            this.toggleLayers(toHide, toShow);
        });

    };

    init();

};