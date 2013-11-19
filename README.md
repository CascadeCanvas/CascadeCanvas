[![Stories in Ready](https://badge.waffle.io/CascadeCanvas/CascadeCanvas.png?label=ready)](https://waffle.io/CascadeCanvas/CascadeCanvas)  
# CascadeCanvas 1.0.7 Beta [![Build Status](https://travis-ci.org/CascadeCanvas/CascadeCanvas.png)](https://travis-ci.org/CascadeCanvas/CascadeCanvas)

CascadeCanvas (CC) is an API to work with canvas rich applications (or games), drawing and organizing classes that works with mult-inheritance and will help to encapsulate behaviours to be reused to a lot of subclasses and instances. You should create classes, inherit this classes by other classes or "elements" and manipulate this classes or elements in the easiest way. It was made with the inspiration of jQuery and Crafty.

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=H84XN5VYTBVYQ&lc=US&item_name=Cascade%20Canvas&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted)

- [Start Using](#start-using)
- [Some features](#some-features)
- [Methods of the Elements](#methods-of-the-elements)
- [Building Classes](#building-classes)
- [Drawing the element](#drawing-the-element)
- [Mouse and Keyboard](#mouse-and-keyboard)
- [Element default Attributes](#element-default-attributes)
- [CC Attributes](cc-attributes)
- [Other features to help](#other-features-to-help)
- [CC Plugins](cc-plugins)
- [Upcoming Features](upcoming-features)

##Start Using

to start, you should put the canvas element in your Html with the "CascadeCanvas" id

```html
	<canvas id="CascadeCanvas" width="800" height="600"></canvas>
```

[Download](https://raw.github.com/melanke/Watch.JS/master/cc.js) and use CascadeCanvas adding the script tag in your html

```html
	<script src="cc.js" type="text/javascript"></script>
```

CascadeCanvas can also be used with Require.js

```javascript
require(["cc.js"], function(CC){
	
});

```

You can install CascadeCanvas via Bower

```
bower install CascadeCanvas
```



##Some features

```javascript

/**
* defines a class to be inherited
* @param classesStr a string with the name of the classes that will have tis behaviour, 
* example:
* 'Class1 Class2' - those 2 classes will have this behaviour
* @param constructor a function that will be used as constructor
*/
CC.def("Class1 Class2", function(opts){
	//class implementation
});



/**
* creates an element and put it in the canvas
* @param specs a string where you can specify the id and the classes it inherit, example:
* '#elementId Class1 Class2' - it will have id: elementId and will inherit Class1 and Class2
* @opts an object with params that can be used in the class constructor, will affect all 
* inherited classes
*/
CC.new("#elementId Class1 Class2", {
	//opts to constructors of Class1 and Class2
});



/**
* returns a collection of elements that match the string passed as argument
* @param selector '*' to select all, '#elementId' to select the element by id 'elementId', 
* 'Class1 Class2' to select elements that contain both classes 'Class1' and 'Class2'
*/
var all = CC("*");
var allClass1AndOtherClass = CC("Class1 OtherClass");
var marioB = CC("#mario").eg(0); //get the first element of the selection



/**
* register an action to a global event
* @param eventsStr a string with the event name and optinally a namespace
* the namespace is used to trigger, bind or unbind a section of the event
* use this capability to narrow the scope of our unbinding actions,
* example: 'eventName.namespace1'
* @param action a function to be invoked when the event is triggered
*/
CC.bind("eventName", function(param1, param2){
	//do something
});

/**
* invoke all actions of a global event
* @param eventsStr a string with the event name and optinally a namespace
* the namespace is used to trigger, bind or unbind a section of the event
* use this capability to narrow the scope of our unbinding actions,
* example: 'eventName.namespace1'
*/
CC.trigger("eventName", param1, param2);



/**
* merge all attributes of the arguments recursively into the first argument and returns it
*/
var a = CC.merge(b, c, d); 
//so, a will be equal to b and will have all attributes of c and d




/**
* pre-load the image resources used in game
* @param srcs an array of strings with the path of file
* @param callback function called when all resources are loaded
*/
CC.loadResources(["res/player.png", "res/background.png"], function(){
	//callback when all resources have been loaded
});




/**
* start the routine of the gameloop, 
* for each loop it triggers 'enterframe' event and render the elements
*/
CC.startLoop(); //starts the fun!
```

##Methods of the Elements

Below a few methods of elements
and collection of elements
those can be used inside or outside a class

```javascript

/**
* invoke the constructors for this element
* @param classesStr a string with the name of the classes to this element inherit, example:
* 'Class1 Class2' - this element will inherit both
*/
CC("#ElementX").inherit("OutherClasse Classe1"); 
//#ElementX will inherit OutherClass and Class1



/**
* it gets an element by the index
*/
var pokemonA = CC("Pokemon").eg(0);



/**
* invoke an action for all elements selected
*/
CC("Pokemon").each(function(){
	//do something to each pokemon using 'this'
});



/**
* returns a copy of the elements as array
*/
var pkms = CC("Pokemon").asArray();
var first = pkms[0]; //but adding or removing from this array will cause nothing



/**
* returns true if this element matches the specification
* the spec could be the value you want or an expression
* eg.: "<= 3" to check if the attribute is <= 3, the operator should be at the start
* available operators: <, >, <=, >=, !=
*/
var isBulbasaur = pokemonA.matches({
	pokemonId: 1,
	level: "< 16"
});



/**
* search for an element on the collection with the attributes specified in the parameter
*/
var bulba = CC("Pokemon").search({
	pokemonId: 1
});



/**
* merge attributes to this element
*/
CC("#ElementX").merge({
	//attributes to be incorpored
});



/**
* remove the element
*/
CC("#Trash").remove();



/**
* register an action to an attached event to this element
* @param eventsStr a string with the event name and optinally a namespace
* the namespace is used to trigger, bind or unbind a section of the event
* use this capability to narrow the scope of our unbinding actions,
* example: 'eventName.namespace1'
* @param action a function to be invoked when the event is triggered
*/
CC("#ElementX").bind("eventName", function(){ });



/**
* invoke all actions of the event attached to this element
* @param eventsStr a string with the event name and optinally a namespace
* the namespace is used to trigger, bind or unbind a section of the event
* use this capability to narrow the scope of our unbinding actions,
* example: 'eventName.namespace1'
*/
CC("#ElementX").trigger("eventName");



/**
* trigger the action when the elements match the specs
* the protocol of match is the same fo method "matches"
*/
CC("Pokemon").became({
	level: 16
}, function(){
	this.evolutionSequence = 2;
});



/**
* trigger the action while the element match the specs
*/
CC("Megaman").became({
	charging: true
}, function(){
	this.chargeLevel++;
});





/**
* trigger the action when the element is clicked
*/
CC("Button").onClick(function(event){
	
});

/*
* create a function that all selections will implement
*/
CC.fn.alertClasses = function(){
	
	this.each(function(){
		alert(JSON.stringify(this.classes));
	});	
};

CC("Class1 Class2").alertClasses();

```

##Building Classes

```javascript

//classes need to be defined before instantiate or inherit them
CC.def("Class1", function(opts){
	
	//declaring a public attribute
	this.attr1 = 3;

	//declaring a private attribute
	var attr2 = 6;

	//declaring a public method
	this.method1 = function(){
		this.attr1 = 4; //modifing a property
	};

	var el = this; //to use in private methods...

	//declaring a private method
	var method2 = function(){
		//warning: 'this' will not work here inside, you will need to do closure: 
		//access a variable of the context of the class like below

		el.attr1 = 5; //modifing a property
	};

	//here you can use the methods described before
	var attr1became4 = this.became({
		attr1: 4	
	}, function(){
		this.attr1 = 5	
	});

	//using the params passed in constructor
	if (opts.attr2 > attr2) {
		attr2 = opts.attr2;
	}

	//a good class implementation is removable 
	//and implement a way of undoing what you have done
	this.bind("removeClass.Class1", function(){

		delete this.attr1;
		delete this.method1;
		attr1became4.unbind();

	});

	this.bind("eventName.Class1", function(){
		//this event will be unbinded automatically when the class is removed 
		//because the namespace is equal to classname
	});

});

//instantiating our class
var el1 = CC.new("#Element Class1", {
	attr2: 9
});

//using methods
el1.method1();

```

##Drawing the element

```javascript

//to draw an element you need to declare the "layers" in the class or in the element like this
CC("#selectedEl").eg(0).layers = {
	//declaring the layer of the element, 
	//but in this way you will override the layers made before in classes
};

//you should always use 'merge'
CC("#selectedEl").eg(0).merge({
	layers: {

	}
});

//but would be better if you do it in the class to be reutilizated
CC.def("Class1", function(opts){

	CC.merge(this.layers, {
		
	});

});

//BUT WHAT OPTIONS TO LAYERS I HAVE?
//give a name and the options of that layer

CC.merge(this.layers, {

	theNameOfMyLayer: {
		 hidden: true, //make the layer invisible
		zIndex: -3, //the less zIndex is the most visible it is (in the front of other layers)
		offsetX: 10, //X of the layer will be at element.x + 10
		offsetY: 10, //Y of the layer will be at element.y + 10
		w: 10, //Width of the layer this will override the element Width and will be centered at elements boundary
		h: 10, //Height of the layer this will override the element Height and will be centered at elements boundary
		shape: "rect", //could be 'circle' or an array of points to form a polygon [ [0,0], [50, 50], [0, 50] ]
        flip: "xy", //flip layer horizontally and vertically
        scale: {
            x: 2, //will strech horizontaly
            y: 0.5 //will squeeze vertically
        },
		angle: 30, //rotated 30 degrees
		anchor: { //point where the rotation will anchor
			x: 10, //x and y from element x and y
			y: 10
		},
		stroke: {
			color: "#330099", //you may choose by "color" or "linearGradient"
			thickness: 5,
			cap: "butt", //style of the ends of the line
			join: "bevel" //style of the curves of the line
		},
		fill: {
			linearGradient: { //you may choose by "color" or "linearGradient"
				start: [0, 0], //percentage of start point
				end: [100, 100], //percentage of the end point
				"0": "rgba(200, 100, 100, 0.8)", //color stops (beginning)
				"0.5": "#f00", //(middle)
				"1": "#0000dd" //(end)
			}
            radialGradient: {
                innerCircle: {
                    centerX: 25, //percentage of the position of the inner circle
                    centerY: 25, //percentage of the position of the inner circle
                    radius: 20 //percentage of the radius of the inner circle
                },
                outerCircle: {
                    centerX: 75, //percentage of the position of the inner circle
                    centerY: 75, //percentage of the position of the inner circle
                    radius: 50 //percentage of the radius of the inner circle
                },
                "0": "rgba(200, 100, 100, 0.8)", //color stops (beginning)
                "0.5": "#f00", //(middle)
                "1": "#0000dd" //(end)
            }
		},
        sprite: {
           url: "res/player.png", //image url
            x: 160, //x position of the sprite in the image
            y: 48, //y position of the sprite in the image
            w: 16, //width of consideration
            h: 24, //height of consideration
            repeat: "xy", //if the string contain x - repeat horizontaly; if the string contain y - repeat verticaly
            frames: 5, //how many frames of the animation,
            delay: 10 //how many loops until the next frame
        }
	},

	theNameOfMyOtherLayer: function(){
		//create a custom function to draw

		CC.context.fillRect(this.x, this.y, this.x + this.w, this.y + this.h);
		//it is a simple square, a stupid example, you should use the other way to do that
	}

});



/**
* hide the layer with the name of the first param 
* and show the layer with the name of the second param
*/
CC("Player").toggleLayers("stand", "walking");



/**
* hide all layers of this element
*/
CC("Player").hideAllLayers();

```

##Mouse and Keyboard

```javascript

/**
* return true if no key is pressed
*/
CC.isNoKeyPressed();



/**
* detect if all keys in param are pressed
* @param keys which keys you want to check if are pressed as string separeted by '+'
*/

var hardCombo = CC.isKeysPressed("Ctrl + Alt + Up + A"); 
//return true if all this keys are pressed



/*

This are the keys supported:

ENTER, SHIFT, CTRL, ALT, 
BACKSPACE, CAPSLOCK, ESC, PGUP, PGDOWN, END, HOME, PRINTSCREEN, INSERT, DEL, 
LEFT, UP, RIGHT, DOWN,  
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, 
WIN, 
F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12

*/


/**
* detect if all and only keys in param are pressed
* @param keys which keys you want to check if are pressed as string separeted by '+'
*/
var upRight = CC.isKeysPressedOnly("W + D"); 
//if I press W, D and A it will return false, but if i press only W and D it will return true



/**
* if all keys are down, trigger the action
* @param keys which keys you want to check if are pressed as string separeted by '+'
* @param action a function to be invoked when the event is triggered
*/

CC.onKeysDown("Win + Up", function(event){

	//when Windows key and Up are pressed this will be executed
	
});



/**
* if all and only keys are down, trigger the action
* @param keys which keys you want to check if are pressed as string separeted by '+'
* @param action a function to be invoked when the event is triggered
*/
CC.onKeysDownOnly("ESC + p", function(event){

	//when the only keys pressed is Esc and P this will be executed

});



/**
* if all keys was down, no more keys was down and now one of them is released, trigger the action
* @param keys which keys you want to check if are pressed as string separeted by '+'
* @param action a function to be invoked when the event is triggered
*/
CC.onKeysComboEnd("ESC + p", function(event){

	//when the only keys that was pressed is Esc and P 
	//and one of them are released this will be executed

});



//---------MOUSE

/**
* simple events for mouse
*/

CC.bind("click", function(event){
	//when click on canvas
});

CC.bind("rightclick", function(event){
	//when click with right button on canvas
});

CC("#elementId").onClick(function(event){
	//when click on element (inside the rectangle of X, Y, W and H)
});



```

##Element default Attributes

- x - element X position
- y - element Y position
- w - element width
- h - element height
- angle - element rotation degrees
- anchor - point where the rotation is fixed (object with attrs x and y)
- zIndex - element order to be draw (the less zIndex is the more visible the element will be - in front of others)
- hidden - if you dont want to show the element
- flip - if you wnat to flip the entire element ("x", "y", "xy")
- layers - an map of layers
- classes - the classes it inherits

##CC Attributes

```javascript

CC.classes; //defined classes

CC.context; //2d context of the 'CascadeCanvas' html element

CC.screen; //the area of the screen

```

##Other features to help

```javascript

/**
* erase all information in CascadeCanvas, good to jump to the next level
*/
CC.clear();



/**
* check if param is an object
*/
CC.isObject(param);



/**
* check if param is a function
*/
CC.isFunction(param);



/**
* check if param is a string
*/
CC.isString(param);



/**
* check if param is an array
*/
CC.isArray(param);



/**
* rotate a point
* @param p the point to be rotated
* @param anchor the anchor point
* @param angle the angle of the rotation
*/
CC.rotatePoint(p, anchor, angle);



/**
* sort the items of an array by property
* @param elements array to be sorted
* @param prop the property to compare
* @param invert if you want the reverse order
*/
CC.sort(elements, prop, invert);



/**
* set the center position to focus the drawing
*/
CC.setScreenCenter(230, 548); //the screen will focus on point x: 230, y: 548



/**
* make the triggers and the gameloop to be ignored
*/
CC.pause();



/**
* make the triggers and the gameloop to be considered again
*/
CC.play();



/**
* remove an action to a global event
* @param eventsStr a string with the event name and optinally a namespace
* the namespace is used to trigger, bind or unbind a section of the event
* use this capability to narrow the scope of our unbinding actions,
* example: 'eventName.namespace1'
* @param action (optional) if you dont specify the domain you can specify
* the action you want to remove
*/
CC.unbind(eventsStr, action);

```

##CC Plugins

The Idea of CascadeCanvas is to re-use code, I would like to see the javascript open-source community using plugins of each others to build games. If you want to publish your plugin in this list please send a issue at this repository

- [CC.Box2d](http://github.com/melanke/CC.Box2D) - An adaptor of Box2dWeb to CascadeCanvas, do things with physics or a simple collision detection