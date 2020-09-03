// ------------------------------------------------ //
//    Variable definitions                          //
// ------------------------------------------------ //
var cart = 0;


// ------------------------------------------------ //
//    Function definitions                          //
// ------------------------------------------------ //

// ------------------------------------------------ //
//  Add a destination read from teh JSON file       //
// ------------------------------------------------ //
function addItem(id, name, description, price, image, moreInfo) {
    
    let html = '';
    
    html += '<div class="item" data-id="' + id + '">';
    html += '   <div class="name">' + name + '</div>';
    html += '   <img src=assets/' + image + '>';
    html += '   <div class="description">' + description + '</div>';
    html += '   <div class="price">' + price + '</div>';
    html += '   <button class="add-to-cart">Add to cart</button>';
    html += '   <button class="item-remove">Remove Destination</button>';
    html += '   <br />';
    html += '   <a class="more-info-link" href="#">More info</a>';
    html += '   <div class="more-info">' + moreInfo + '</div>';
    html += '</div>';

    $('#container').prepend(html);

}

$(document).ready(function() {
    
    // ------------------------------------------------ //
    //    Add a new destination                         //
    // ------------------------------------------------ //
    $('#button-create-item').on('click',function() {
    
        // initialise html variable
        let html = '';
        
        // store destination 
        let destination = $('#input-create-item').val();
        
        // clear the input field
        $('#input-create-item').val('');
            

        html += '<div class="item">';
        html += '   <div class="name">' + destination + '</div>';
        html += '   <img src="assets/beach.jpg">';
        html += '   <div class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>';
        html += '   <div class="price">499</div>';
        html += '   <button class="item-add">Add to cart</button>';
        html += '   <button class="item-remove">Remove Destination</button>';
        html += '   <br />';
        html += '   <a class="more-info-link" href="#">More info</a>';
        html += '   <div class="more-info">Lorem ipsum dolor sit amet</div>';
        html += '</div>';

        // Insert the new item at start
        // $('#container').prepend(html);
        
        // append the new item at end
        $('#container').append(html);

        // update message div
        $('#feedback-message').text('Destination ' + destination + ' added');
        
    });    

    // ------------------------------------------------ //
    // Remove destination                               //
    // Reduce cart price                                //
    // delegate the .item-remove event                  //
    // ------------------------------------------------ //
    $('#container').on('click','.item-remove',function() {

        // find the ID and price from the parent of the button clicked
        let id    = $(this).parent().data('id');
        let price = $(this).parent().find('.price').text();
        
        $.ajax('data/addToCart.json', {
            type: 'post',
            data: { id: id},
            dataType: 'json',
            contentType: 'application/json'
            })
            .done(function(response) {
                if (response.message === 'success') {
                    // let price = response.price;
                    // multiple price by 1 to convert to string
                    cart -= (price * 1);
                    $('#cart-container').text('$' + cart);
                    $('#feedback-message').text("Add to cart : " + response.message);
                }
            });
        
        $(this).parent().remove();
    
    });
    
    // ------------------------------------------------ //
    // Display the more info text                       //
    // delegate the event                               //
    // ------------------------------------------------ //
    $('#container').on('click','.more-info-link',function(){
        
        event.preventDefault();
        
        // go up to parent, find the class and show the div
        $(this).parent().find('.more-info').fadeToggle('slow');

        let linkText = $(this).parent().find('.more-info-link').text();

        if (linkText == 'More info') {
            $(this).parent().find('.more-info-link').text('Less info');            
        } else {
            $(this).parent().find('.more-info-link').text('More info');
        };
        
    });
    
    // ----------------------------------------------------- //
    // AJAX calls to JSON files                              //
    // ----------------------------------------------------- //

    $.ajax('data/destinations.json', {dataType: 'json', contentType: 'application/json', cache: false} )
    
        .done (function(response) {

            // response returns array of locations from the JSON file
            let locations = response.locations;
            console.log(locations);
        
            locations.forEach(function(location){
                addItem(location.id, location.name, location.description, location.price, location.image, location.moreInfo);
            });

        })
        .fail (function(request, errorType, errorMessage) {
            console.log(errorMessage);
        })
        .always (function() {
        });

    // ----------------------------------------------------- //
    // Add to cart button on each location                   //
    // ----------------------------------------------------- //

    $('#container').on('click','.add-to-cart', function() {
        
        // find the ID and price from the parent of the button clicked
        let id    = $(this).parent().data('id');
        let price = $(this).parent().find('.price').text();
        
        $.ajax('data/addToCart.json', {
            type: 'post',
            data: { id: id},
            dataType: 'json',
            contentType: 'application/json'
            })
            .done(function(response) {
                if (response.message === 'success') {
                    // let price = response.price;
                    // multiple price by 1 to convert to string
                    cart += (price * 1);
                    $('#cart-container').text('$' + cart);
                    $('#feedback-message').text("Add to cart : " + response.message);
                }
            });
    });
    
    // ----------------------------------------------------- //
    // Hide/show newsletter dropdown                         //
    // ----------------------------------------------------- //
    $('#newsletter-checkbox').on('change', function(){
        
        console.log("Check box selected")
        
        if ($(this).is(':checked')) {
            $('#newsletter-frequency').show();
        } else {
            $('#newsletter-frequency').hide();
        }
        
    });
    
    // ------------------------------------------------------- //
    // trigger change event to display the newsletter dropdown //
    // ------------------------------------------------------- //
    $('#newsletter-checkbox').trigger('change');
    
    // ----------------------------------------------------- //
    // Sumbit form                                           //
    // ----------------------------------------------------- //
    $('#cart-form').on('submit', function(event) {

        console.log("Form Submit");
        
        event.preventDefault();
        
        let data = { form: $(this).serialize(), price: cart };
        
        $.ajax($(this).attr('action'), { type: 'post', data: data })
        
            .done(function(response){
                $('#feedback-message').text("Post Data : " + data.form + ' -:- ' + response.message);
            });
    });

});     // end of document ready

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Lesson 1
//    console.log('Document is ready!');
//    $('body').text('Hello World!');
//    $('body').html('<strong>Hello World!</strong>');

//Lesson 2
//    Look for an element with the ID of fire. Use .addClass to add the .highlight class.
//     $('#fire').addClass('highlight');
//
//    Lookgreen an element with the CLASS of solid. Use .addClass to add the .highlight class.
//     $('.solid').addClass('highlight');
//
//    Look for // so now button toggles purple and box toggles greenan element with the CLASS of .solid or .non-solid Use .addClass to add the .highlight class.
//     $('.solid, .non-solid').addClass('highlight');
//
//     add multiple greater than symbols to drop the appropriate number of levels within the element
//     $('#container >>> .non-solid').addClass('highlight');

//Lesson 3
//    // find input fields with a required attribute in the container div and add the required-field class
//    // this will set the background color to yellow
//    $('#container input:required').addClass('required-field');
//
//    // find input field with the matching placeholder attribute in the container div and add the .highlight class
//    // this will set the text colour to red
//
//    $('#container input[placeholder="Last Name"]').addClass('highlight');
//
//    // this will set the any field with a placeholder containing "name" text colour to red
//    $('#container input[placeholder*="Name"]').addClass('highlight');

//Lesson 4
//    // Look for an element with the CLASS of .solid or .non-solid Use .addClass to add the .item class.
//    // $('.solid, .non-solid').addClass('item');
//    
//    // find elements with class .hot
//    console.log($('#container').find('.hot'));
//
//    // find the children of the element with class hot
//    console.log($('#container').find('.hot').children());
//    
//    // find only the children of element with class hot that has a class non-solid
//    console.log($('#container').find('.hot').children('.non-solid'));
//    
//    // highlight in blue by adding the class
//    console.log($('#container')
//                    .find('.hot')
//                    .children('.non-solid')
//                    .addClass('highlight-blue')
//               );

//Lesson 5
//    // add highlight-blue class to first child of element with class hot
//    $('#container')
//        .find('.hot')
//        .children()
//        .first()
//        .addClass('highlight');
//    
//    // add highlight-green class to last child of element with class hot
//    $('#container')
//        .find('.hot')
//        .children()
//        .last()
//        .addClass('highlight-green');
//    
//    // add highlight-red class to next child after the first of element with class hot
//    $('#container')
//        .find('.hot')
//        .children()
//        .first()
//        .next()
//        .addClass('highlight-red');
//    
//    // add highlight-purple class to prev child to the last child of element with class hot
//    // note this will overwrite the jquery above as there are only 3 children
//    $('#container')
//        .find('.hot')
//        .children()
//        .first()
//        .next()
//        .addClass('highlight-purple');
//    

//Lesson 6
//    // find id=snow, find the parent node, then find the element with class title and add the class highlight-purple
//    $('#snow')
//        .parent()
//        .find('.title')
//        .addClass('highlight-purple');
//    
//    // select and display all parents in the hierarchy all way up to body and html
//    console.log($('#snow').parents());
//    
//    // select the closest parent with class temperature to node with id = snow
//    console.log($('#snow').closest('.temperature'));
//    
//    // select the closest parent with class temperature to node with id = snow and set color to green
//    $('#snow')
//        .closest('.temperature')
//        .addClass('highlight-green');

// Lesson 7
//    // find the element with class box and add an on-click event to add another class
//    $('.box').on('click', function() {
//        $(this).addClass('background-purple');
//    });
//                 
//    // find the element with class box and add an on-click event to toggle the class - this gives an an on/off effect
//    $('.box').on('click', function() {
//        $(this).toggleClass('background-purple');
//    });
//                 
//Lesson 8
//    // find the element with class box and add an on-click event to the button - this turns the button purple when clicked
//    $('.box').on('click', '.box-button', function() {
//        $(this).toggleClass('background-purple');
//    });
//
//    // In order to fix this, we need to tell our class to toggle on the parent of our event listener.
//    $('.box').on('click', '.box-button', function() {
//        $(this).parent().toggleClass('background-green');
//    });
//
//    // so now button toggles purple and box toggles green
//Lesson 9
//    // listen for a click event that changes the menu option selected
//    $('#select-menu').on('change', function() {
//
//        let name     = $('#select-menu option:selected').text();
//        let distance = $('#select-menu option:selected').val();
//        let price    = $('#select-menu option:selected').data('price');
//        
//        console.log(price);
//        
//        // if no race selected, clear the feedback message
//        if (distance) {
//            $('#feedback-message').text('You are signing up for a ' + name + ' race, which costs $' + price + ', to a distance of ' + distance + 'km');
//        } else {
//            $('#feedback-message').empty();
//        };        
//        
//    });
//    
//    // display the value everytime rather than on a change
//    $('#select-menu').on('click', function() {
//        // console.log('Clicked on: ' + $('#select-menu option:selected').text());
//    });
//
// Lesson 10
//    // Listen for a key release and update the feedback message
//    $('#input-name').on('keyup', function(){
//
//        let name = $(this).val();
//        
//        $('#feedback-message').text('Pleased to meet you, ' + name);
//
//    });
//    
//    // Add click listener to the anchor tag and pass in the event that triggers click
//    $('a').on('click',function(event) {
//        
//        event.preventDefault();
//    
//        $('#feedback-message').text('Ok, you dont have to enter your name');
//
//    });
