var map;
var markers = [];
var restaurants = [];
var places = [];
var mark_hide = [];
var branch_ctr = 0;

function initialize() {
	var cebucenter = new google.maps.LatLng(10.306341, 123.8886897);
	var marker;
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: cebucenter,
		zoom: 12
	});

	var request = {
		location: cebucenter,
		radius: 20000,
		types: ['restaurant']
	};
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status) {
	var i;

	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (i = 0; i < results.length; i++) {
			classifyMarkers(results[i]);
			createMarker(results[i]);
		}
	}
	
/*******************************************************
	
	Restaurant Collapse/Uncollapse list
	
*******************************************************/
	/** Append restaurant name to your unordered list **/
	for(var i = 0; i < places.length; i++) {
		var select_id = '#'+places[i].classification;
		$(select_id).append(
			$('<li>').attr('class', 'rest_name').append(
				$('<h5>').attr('class', 'rest_name_header').append(places[i].branch)
		));
	}
	
	$('.listview').hide();
	
	/** Collapse/uncollapse the restaurant list **/
	$('.restaurant').click(function() {
		if($(this).next().is(":hidden")) {
			$(this).next().slideDown();
		}
		else {
			$(this).next().slideUp();
		}
	});
	
	$('.rest_name_header').click(function() {
		var rest_name = $(this).text();
		
		var idx = jQuery.inArray( rest_name, restaurants );
		var mark_hide_idx = jQuery.inArray( rest_name, mark_hide);
//		console.log(mark_hide);
		if( mark_hide_idx != -1 ) {
//			console.log("Show Marker!");
			showMarker(markers[idx]);
			mark_hide.splice(mark_hide_idx, 1);
//			console.log(mark_hide);
		}
		else {
			hideMarker(markers[idx]);
			mark_hide.push(rest_name);
//			console.log(mark_hide);
		}
	});
}

function createMarker(place) {
	var i;
	var contentString;
	
	contentString = '<div id="content">' +
	'<h3 id="name">' +
	'<b>'+place.name+'</b>' +
	'</h3>' +
	'<p><b>Branch:</b> ' +
	place.branch + 
	'</p>'+
	'<p><b>Type:</b> ' +
	place.classification + 
	'</p>'+
	'<p><b>Specialty:</b> ' +
	place.specialty + 
	'</p>'+
	'<p><b>Visited Customers:</b> ' +
	place.customers + 
	'</p>'+
	'</div>';
	
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		infowin: infowindow,
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
	info = infowindow;
	hideMarker(marker);
	mark_hide.push(place.branch);
	markers.push(marker);
	restaurants.push(place.branch);
}

function hideMarker(marker) {
	marker.setVisible(false);
	marker.infowin.close();
}

function showMarker(marker) {
	marker.setVisible(true);
}


function branchTracker(place) {
	var counter = 0;
	for(var i = 0; i < places.length; i++) {
		if(place.name == places[i].name) {
			counter++;
		}
	}
	branch_ctr = counter;
}

function classifyMarkers(place) {
	var counter;
	branchTracker(place);
	counter = branch_ctr + 1;
	
	if(place.name == 'Casa Verde') {
		place.customers = 12543;
		place.specialty = "Brian's Ribs";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.branch = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Alberto\'s Pizza') {
		place.customers = 2654;
		place.specialty = "Fullhouse Pizza";
		place.classification = "Italian";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'STK ta Bay!') { 
		place.customers = 12097;
		place.specialty = "Tuna Jaws";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Mooon Cafe') {
		place.customers = 1541;
		place.specialty = "Beef Taco";
		place.classification = "Mexican";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Laguna Garden Cafe') {
		place.customers = 1456;
		place.specialty = "Bulalo";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);

	}
	else if(place.name ==  'Port Restaurant') {
		place.customers = 11912;
		place.specialty = "Curry Filet Mignon Pasta";
		place.classification = "Italian";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Golden Cowrie Native Restaurant') {
		place.customers = 12356;
		place.specialty = "Baked Tahong";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Crowne Garden Hotel') {
		place.customers = 1568;
		place.specialty = "Succulent Meat Encased in Crisp Skin";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Metro Park Hotel Cebu') {
		place.customers = 1398;
		place.specialty = "Beef Stew Special";
		place.classification = "American";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Maya Mexican Restaurant') { 
		place.customers = 1459;
		place.specialty = "Carnitas";
		place.classification = "Mexican";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'ilaputi') {
		place.customers = 1789;
		place.specialty = "Sakana Tempura";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Café Georg') {
		place.customers = 1643;
		place.specialty = "U.S. Beef Tinderloin Tips";
		place.classification = "American";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Gustavian') {
		place.customers = 1356;
		place.specialty = "Steak Waleska";
		place.classification = "Scandinavian";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Tavolata') {
		place.customers = 1589;
		place.specialty = "Antipasto Platter";
		place.classification = "Italian";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Chateau de Busay Inn & Restaurant') { 
		place.customers = 1543;
		place.specialty = "Smoked Norwegian Salmon";
		place.classification = "Scandinavian";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Abaca Boutique Resort & Restaurant') {
		place.customers = 1765;
		place.specialty = "Carnitas";
		place.classification = "Mexican";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Hilton Cebu Resort & Spa') {
		place.customers = 1656;
		place.specialty = "Beef Tartar and Salad";
		place.classification = "American";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else if(place.name ==  'Plantation Bay Resort and Spa') {
		place.customers = 1897;
		place.specialty = "Palermo";
		place.classification = "Scandinavian";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
	else {
		place.customers = 12362;
		place.specialty = "Lobster and Steak";
		place.classification = "Filipino";
		place.branch = place.name;
		place.branchNo = counter;
		if(place.branchNo > 1) {
			place.name = place.name + " Branch " + place.branchNo;
		}
		places.push(place);
	}
}	

google.maps.event.addDomListener(window, 'load', initialize);
