function select_region(code){
	if (code <= 34) {
		$(".province-dropdown").select2('val', code);
	} else if (code > 34 && code < 1000) {
		$(".dist-dropdown").select2('val', code);
		prov_code = code.substring(0,1);
		$(".province-dropdown").select2('val', prov_code);
	}else{
		$(".dist-dropdown").select2('val', code);
		prov_code = code.substring(0,2);
		$(".province-dropdown").select2('val', prov_code);
	}
}

function init_select2_region(){
	$('.province-dropdown').select2({
		placeholder: "Select Province"
	});
	$('.dist-dropdown').select2({
		placeholder: "Select District"
	});

	$('.province-dropdown').on('change', function (e) {
		jump_url(e.val);
	});

	$('.dist-dropdown').on('change', function (e) {
		jump_url(e.val);
	});

	var code_region = getParameterByName("code");
	if (code_region == null) {
		$(".dist-dropdown").hide();
	}else {
		select_region(code_region);
	}
}

// Humanizer
function humanizeFormatter(value){
	// console.log(value)
	var v= value;
	if(v>=1000 && v<1000000){
		return (parseFloat((v/1000).toPrecision(3)))+' K'
		// return (parseFloat((v/1000).toFixed(1)))+' K'
	}
	else if (v>=1000000 && v<1000000000) {
		return (parseFloat((v/1000000).toPrecision(3)))+' M'
		// return (parseFloat((v/1000000).toFixed(1)))+' M'
	}else{
		if (v==null || isNaN(parseFloat(v))) {
			v=0;
		}
		// console.log(parseFloat((v).toPrecision(3)));
		return (parseFloat((v*1).toPrecision(3)))
		// return (parseFloat((v).toFixed(1)))
	}
}

// Datatables
function init_datatable(){
	$.fn.dataTable.moment( 'MMM D, YYYY' );

	$('.print').DataTable({
		"ordering": false, //do this when print
		"paging": false, //do this when print
		"info": false, //do this when print
		"searching": false, //do this when print
		dom: 't', //do this when print

		"columnDefs": [{
			"render": function (data, type, row){
				if (type == 'display') {return humanizeFormatter(data);}
				return data;
			},
			"targets": 'hum'
		}]
	});

	$('.online').DataTable({
		dom: 'Bfrtip',
		// pagingType: "full_numbers",
		buttons: [
			{
				extend: "copy",
				className: "btn-flat waves-effect waves-light"
			},
			{
				extend: "csv",
				filename: 'ASDC Data',
				className: "btn-flat waves-effect waves-light"
			},
			{
				extend: "excel",
				filename: 'ASDC Data',
				className: "btn-flat waves-effect waves-light"
			},
			{
				extend: "print",
				filename: 'ASDC Data',
				// customize: 
				// 	function ( win ) {
	      //               $(win.document.body)
	      //                   .css( 'font-size', '10pt' )
	      //                   .prepend(
	      //                   	'<img src="static/v2/images/usaid-logo.png" style="position:absolute; top:0; left:0;" />')
	      //                   .prepend(
	      //                       '<img src="static/v2/images/iMMAP.png" style="position:absolute; top:0; left:220px;" />'
	      //                   );
	 
	      //               $(win.document.body).find( 'table' )
	      //                   .addClass( 'compact' )
	      //                   .css( 'font-size', 'inherit' );
	      //           },
				className: "btn-flat waves-effect waves-light"
			}
			// {
			//   extend: "colvis"
			//   className: "btn-sm"
			// }
		],

		"columnDefs": [{
			"render": function (data, type, row){
				if (type == 'display') {return humanizeFormatter(data);}
				return data;
			},
			"targets": 'hum'
		}]
	});

	$('.online_security').DataTable({
		"ordering": false,
		// "pageLength": 30,
		dom: 'Bfrtip',
		buttons: [
			{
				extend: "copy",
				className: "btn-sm"
			},
			{
				extend: "csv",
				className: "btn-sm"
			},
			{
				extend: "excel",
				className: "btn-sm"
			},
			{
				extend: "print",
				className: "btn-sm"
			},
			// {
			//   extend: "colvis"
			//   className: "btn-sm"
			// }
		],

		"columnDefs": [{
			"render": function (data, type, row){
				if (type == 'display') {return humanizeFormatter(data);}
				return data;
			},
			"targets": 'hum'
		}]
	});

	$("button").removeClass("dt-button");
}

// Chart
function init_chart() {
	colorBarDefault= ["#CF000F"];
	colorDonutDefault = ['#b92527', '#ccc'];
	colorFloodRisk = ['#ffaaab', '#ff6264', '#d13c3e', '#ddd'];

	var chart_theme = {
		chart: {
			style: {
				fontFamily: '"Arial", Verdana, sans-serif'
			}
		},
		title: {
			text: null,
			style: {
				color: '#424242',
				font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
			}
		},
		subtitle: {
			style: {
				color: '#424242'
			}
		},
		xAxis: {
			
		},
		yAxis: {
			labels: {
				overflow: 'justify'
			},
			title: {
				align: 'high',
				style: {
					// color: '#A0A0A3'
				}
			}
		},
		tooltip: {
			
		},
		plotOptions: {
			series: {
				// color: '#c62828',
			},
			bar: {
				// color: '#c62828',
				dataLabels: {
					enabled: true,
					formatter: function() {
						return humanizeFormatter(this.y);
					}
				}
			},
			pie: {
				dataLabels: {
					enabled: true,
					softConnector: false,
					// formatter: function() {
					// 	if (this.y > 0){
					// 		return humanizeFormatter(this.y) + '<br/>' + Highcharts.numberFormat(this.percentage, 2) + '%';
					// 	}
					// }
					formatter: pie_label
				}
			}
		},
		legend: {
			enabled: true
		},
		credits: {
			enabled: false
		},
		labels: {
		},

		drilldown: {
		},

		navigation: {
		},

		// scroll charts
		rangeSelector: {
			
		},

		navigator: {
			
		},

		scrollbar: {
			
		}

		// special colors for some of the
		// legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		// background2: '#505053',
		// dataLabelsColor: '#B0B0B3',
		// textColor: '#C0C0C0',
		// contrastTextColor: '#F0F0F3',
		// maskColor: 'rgba(255,255,255,0.3)'
	};

	function pie_label() {
		if (this.y > 0){
			return humanizeFormatter(this.y) + '<br/>(' + Highcharts.numberFormat(this.percentage, 2) + '%)';
		}
	}

	// Fixing SoftConnector
	var H = Highcharts,
		pick = H.pick;
	H.seriesTypes.pie.prototype.connectorPath = function (labelPos) {
		var x = labelPos.x,
			y = labelPos.y,
			M = 'M',
			L = 'L';
		console.log(labelPos);
		return pick(this.options.dataLabels.softConnector, true) ? [
			M,
			x + (labelPos[6] === 'left' ? 5 : -5), y, // end of the string at the label
			'C',
			x, y, // first break, next to the label
			2 * labelPos[2] - labelPos[4], 2 * labelPos[3] - labelPos[5],
			labelPos[2], labelPos[3], // second break
			L,
			labelPos[4], labelPos[5] // base
		] : [
			M,
			x + (labelPos[6] === 'left' ? 5 : -5), y, // end of the string at the label
			L,
			labelPos[4], y, // second break
			L,
			labelPos[4], labelPos[5] // base
		];
	};

	if (getParameterByName('page') == 'baseline'){
		var chart_pop_opt = {
			chart: {
				type: 'bar'
			},
			xAxis: {
				categories: panels.pop_lc.title
			},
			yAxis: {
				title: {
					text: 'Population'
				},
				type: 'logarithmic'
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y) + ' Population';
				}
			},
			legend:{
				enabled: false
			},
			colors: colorBarDefault,
			series: [{
				name: 'Population',
				data: panels.pop_lc.value
			}]
		};
	
		var chart_build_opt = {
			chart: {
				type: 'bar'
			},
			xAxis: {
				categories: panels.building_lc.title
			},
			yAxis: {
				title: {
					text: 'Building'
				},
				type: 'logarithmic'
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y) + ' Building';
				}
			},
			colors: colorBarDefault,
			series: [{
				name: 'Building',
				data: panels.building_lc.value
			}]
		};
	
		var chart_area_opt = {
			chart: {
				type: 'bar'
			},
			xAxis: {
				categories: panels.area_lc.title
			},
			yAxis: {
				title: {
					text: 'Area'
				},
				type: 'logarithmic'
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y) + ' Area';
				}
			},
			colors: colorBarDefault,
			series: [{
				name: 'Area',
				data: panels.area_lc.value
			}]
		};

		$('#chart_bar_horizontal_pop').highcharts(Highcharts.merge(chart_pop_opt, chart_theme));
		$('#chart_bar_horizontal_build').highcharts(Highcharts.merge(chart_build_opt, chart_theme));
		$('#chart_bar_horizontal_area').highcharts(Highcharts.merge(chart_area_opt, chart_theme));
	}else if (getParameterByName('page') == 'floodrisk') {
		var chart_pie_frisk_pop_opt = {
			chart: {
				type: 'pie'
			},
			tooltip: {
				formatter: pie_label
			},
			legend:{
				// align: 'left',
				// verticalAlign: 'top',
				// layout: 'vertical'
			},
			colors: colorFloodRisk,
			series: [{
				name: 'Flood Risk Population',
				data: panels.pop_depth.child,
				size: '90%',
				innerSize: '65%',
				showInLegend:true
			}]
		};

		var chart_pie_frisk_build_opt = {
			chart: {
				type: 'pie'
			},
			tooltip: {
				formatter: pie_label
			},
			colors: colorFloodRisk,
			series: [{
				name: 'Flood Risk Buildings',
				data: panels.building_depth.child,
				size: '90%',
				innerSize: '65%',
				showInLegend:true
			}]
		};

		var chart_pie_frisk_area_opt = {
			chart: {
				type: 'pie'
			},
			tooltip: {
				formatter: pie_label
			},
			colors: colorFloodRisk,
			series: [{
				name: 'Flood Risk Areas',
				data: panels.area_depth.child,
				size: '90%',
				innerSize: '65%',
				showInLegend:true
			}]
		};

		$('#chart_pie_frisk_pop').highcharts(Highcharts.merge(chart_pie_frisk_pop_opt, chart_theme));
		$('#chart_pie_frisk_build').highcharts(Highcharts.merge(chart_pie_frisk_build_opt, chart_theme));
		$('#chart_pie_frisk_area').highcharts(Highcharts.merge(chart_pie_frisk_area_opt, chart_theme));
	}


}

// Leaflet
function init_leaflet(){
	legend_num_arr = [];
	val_collection = [];

	function getMax(geojson, prop){
	    var max = 0;
	    for (var i = 0; i < geojson.length; i++) {
	        max = Math.max(parseInt(geojson[i]["properties"][prop]), max);
	    }
	    // console.log(max);
	    return max;
	}

	// Getting Date Information for Flood Forecast Map
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	}

	if(mm<10) {
	    mm = '0'+mm
	}

	today = 'year:'+ yyyy +';month:'+ mm +';day:'+ dd +';';

	// Get map ID
	if ($('.map-size').length) {
		var id_map = document.querySelector('.map-size').id;
	}

	function isZero(currentValue) {
	  return currentValue == 0;
	}

	function unique(list) {
	    var result = [];
	    $.each(list, function(i, e) {
	        if ($.inArray(e, result) == -1) result.push(e);
	    });
	    return result;
	}

	function changeValueProp(selected){
		// console.log(val_collection);
		// val_collection is an array that has all value of each prov/dist
		val_collection.splice(0, val_collection.length);
		for (var i = 0; i < boundary.features.length; i++) {
			if (boundary['features'][i]['properties'][selected]==null) {
				console.log("null");
				boundary['features'][i]['properties']['value']=0;
				val_collection.push(0);
			}else{
				boundary['features'][i]['properties']['value']=boundary['features'][i]['properties'][selected];
				val_collection.push(boundary['features'][i]['properties']['value']);
			}
		}

		// console.log(val_collection);
		
		// Check if all val_collection value is 0, if not, delete 0
		if (val_collection.every(isZero)==false) {
			val_collection = val_collection.filter(Number);
		}

		// Set jenk number
		set_jenk_divider = setJenkNumb(val_collection.length);

		// console.log(val_collection);
		// console.log(set_jenk_divider);

	}

	function sumValueProp(selected){
    	// var max_val = 0;
    	var checked = selected;
    	if ((checked.length==0)) {
    		for (var i = 0; i < boundary.features.length; i++) {
    			boundary['features'][i]['properties']['value']=0;
    		}
    		val_collection.splice(0, val_collection.length);
    		val_collection.push(0);
    	}else{
    		val_collection.splice(0, val_collection.length);
		    for (var i = 0; i < boundary.features.length; i++) {
		    	//declare a variable to keep the sum of the values
		    	var sum = 0;
	    	    //using an iterator find and sum the properties values of checked checkboxes
	    	    checked.each(function() {
	    			sum += boundary['features'][i]['properties'][$(this).val()];
	    	    });
	    	    boundary['features'][i]['properties']['value']=sum;

	    	    val_collection.push(sum);

	    	    // if (max_val < sum) {
	    	    //   max_val = sum;
	    	    // }
		    }

		    // Check if all val_collection value is 0, if not, delete 0
		    if (val_collection.every(isZero)==false) {
		    	val_collection = val_collection.filter(Number);
		    }
    	}

    	// Set jenk number
    	set_jenk_divider = setJenkNumb(val_collection.length);

    	// console.log(val_collection);
    	// console.log(set_jenk_divider);
	}

	function setJenkNumb(numb){
		if (numb < 8) {
			divider = numb-1;
		}else{
			divider = 7;
		}

		// console.log(divider);
		return divider;
	}

	function setLegendSeries(series_numb){
		var data_series = new geostats(series_numb);
		var series_jenks = data_series.getJenks(set_jenk_divider);

		// console.log(series_jenks);
		series_jenks = unique(series_jenks);

		return series_jenks;
	}

	// Function initialize map
	function initMap(){
		var map = L.map((id_map), {
			zoomSnap: 0
		}).setView([centroid[1],centroid[0]], 8);
        var geojsonLayer = L.geoJson(boundary);
        map.fitBounds(geojsonLayer.getBounds());
		
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
		    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
		    maxZoom: 19
		}).addTo(map);

		// Add Zoom Back Home Button
		L.easyButton( 'fa-arrows-alt', function(){
			map.fitBounds(geojsonLayer.getBounds());
		}).addTo(map);

		// console.log(map);

		return map;
	}

	// Function to Create Legend
	function createLegend(){
		// Add legend to the map
		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

		    var div = L.DomUtil.create('div', 'info legend'),
		    	// grades = [0, legend_num_arr[0], legend_num_arr[1], legend_num_arr[2], legend_num_arr[3]],
		        labels = [];

		    // Add transparent color to legend
		    // div.innerHTML += '<span style="background:' + clamped_scale(0) + '"></span> ';

		    // loop through our density intervals and generate a label with a colored square for each interval
		    for (var i = 0; i < legend_num_arr.length-1; i++) {
		        // div.innerHTML +=
		        	//legend in horizontal view
		        	// '<span style="background:' + clamped_scale(legend_num_arr[i]) + '"></span> ';
		            // legend in vertical view
		            // console.log(clamped_scale(legend_num_arr[i]));
		            if (clamped_scale(legend_num_arr[i])=='transparent') {
		            	div.innerHTML;
		            }else{
		            	div.innerHTML +=
		            	'<i style="background:' + clamped_scale(legend_num_arr[i]) + '"></i> ' +
		            	humanizeFormatter(legend_num_arr[i]) + (legend_num_arr[i + 1] ? '<br>' : '+');
		            }
		    }

		    // legend in horizontal view
		    // a line break
		    // div.innerHTML += '<br>';
		    // div.innerHTML += '<label>' + humanizeFormatter(0) + '&ndash;' + humanizeFormatter(legend_num_arr[0]) + '</label>';

		    // // second loop for text
	     //    for (var i = 0; i < legend_num_arr.length-1; i++) {
	     //        div.innerHTML +=
	     //            '<label>' + humanizeFormatter(legend_num_arr[i]) + (legend_num_arr[i + 1] ? '&ndash;' + humanizeFormatter(legend_num_arr[i + 1]) : '+') + '</label>';
	     //    }

		    return div;
		};

		return legend;
	}

	// Function to Add Color to the Boundary (static)
	function getColor(d) {
	    return d > legend_num_arr[7] ? '#800026' :
	           d > legend_num_arr[6]  ? '#BD0026' :
	           d > legend_num_arr[5]  ? '#E31A1C' :
	           d > legend_num_arr[4]  ? '#FC4E2A' :
	           d > legend_num_arr[3]   ? '#FD8D3C' :
	           d > legend_num_arr[2]   ? '#FEB24C' :
	           d > legend_num_arr[1]   ? '#FED976' :
	           d > 0   ? '#FFEDA0' :
	                      'transparent';
	}
	
	//calculate radius so that resulting circles will be proportional by area
	function getRadius(y) {
	    r = Math.sqrt(y / Math.PI)
	    return r;
	}

	// Function add color to boundary dynamically
	function clamped_scale(v) { 
		return v < 1 ? 'transparent' : getChroma(v); 
	}

	// Function to Style the Interactive Map
	function style(feature) {
		// console.log(feature.properties.na_en);
		// console.log(clamped_scale(feature.properties.value));

	    return {
	        // fillColor: getColor(feature.properties.Population), //Add color based on population data
	        // fillColor: getColor(feature.properties[layer_selected]), //Add color based on selected layer data
	        // fillColor: getColor(feature.properties.value), //Add color based on accrued selected layer data
	        fillColor: clamped_scale(feature.properties.value),
	        // weight: 2,
	        weight: 1,
	        opacity: 1,
	        color: '#ddd',
	        // dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// Function to Bubble Style the Interactive Map
	function styleBubble(feature) {
	    return {
	    	radius: getRadius(feature.properties.value), // Calculated radius based on value
	        fillColor: getColor(feature.properties.value), //Add color based on accrued selected layer data
	        weight: 1,
	        opacity: 0,
	        color: 'white',
	        fillOpacity: 0.8
	    };
	}

	// Function to Add Info
	function addInfo(){
		// Add info of Population
		var info = L.control();

		info.onAdd = function (map) {
			// this.infok = L.DomUtil.get("mapInfo"); // get that DIV
			// this.infok = L.DomUtil.getClass('mapInfo');	// get that class
		    this._div = L.DomUtil.create('div', 'infoOutside'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		return info;
	}

	// Function to Add Chart
	function addChart(){
		var chart = L.control();

		chart.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'ChartOutside'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		return chart;
	}

	function highlightFeature(layer) {
	    // var layer = e.target;
	    // console.log(layer);

	    layer.setStyle({
	        // weight: 5,
	        // color: '#666',
	        weight: 1,
	        color: '#000',
	        dashArray: '',
	        fillOpacity: 0.7
	    });

	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	        layer.bringToFront();
	    }

	    // info.update(layer.feature.properties);
	}

	//create highlight style, with darker color and larger radius
	function styleHighlightBubble(feature) {
	    return {
	    	radius: getRadius(feature.properties.value)+1.5,
	        weight: 1,
	        opacity: 0,
	        color: 'white',
	        fillOpacity: 0.8
	    };
	}

	//attach styles and popups to the marker layer
	function highlightBubbleFeature(layer) {
		bubbleStyleHighlight = styleHighlightBubble(layer.feature);
	    layer.setStyle(bubbleStyleHighlight);

	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	        layer.bringToFront();
	    }
	}

	function resetHighlight(layer) {
		// console.log(selected);
		// console.log(layer);
		if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
			geojson.resetStyle(layer);
		}
	    // info.update();
	}

	function resetHighlight2(e){
		geojson.resetStyle(e.target);
	}

	function selectHighlight(layer){
		if (selected !== null) {
			var previous = selected;
		}
		selected = layer;
		if (previous) {
			resetHighlight(previous)
		}
		info.update(layer.feature.properties);

		if (chart !== null) {
			chart.update(layer.feature.properties);
		}
	}

	function zoomToFeature(e) {
	    map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
	    layer.on({
	    	'mouseover': function (e) {
	    	  		      highlightFeature(e.target);
	    	  		    },
  		    'mouseout': function (e) {
  		      resetHighlight(e.target);
  		    },
				'click': function (e) {
				  selectHighlight(e.target);
				}
	        // click : selectHighlight,
	        // mouseout : resetHighlight,
	        // mouseover : highlightFeature
	        // click: zoomToFeature
	    });

	    // layer.on('click', function(layer){
	    // 	if (selected) {
	    // 		resetHighlight(layer.target);
	    // 	}
	    // 	var selected = true;
	    // 	highlightFeature(layer.target);
	    // });
	}

	function onEachBubbleFeature(feature, layer) {
	    layer.on({
	    	'mouseover': function (e) {
	    	  		      highlightBubbleFeature(e.target);
	    	  		    },
  		    'mouseout': function (e) {
  		      resetHighlight(e.target);
  		    },
				'click': function (e) {
				  selectHighlight(e.target);
				}
	    });
	}

	function onEachFeature2(feature, layer) {
	    layer.on({
	    	'mouseover': function (e) {
	    	  		      highlightFeature(e.target);
	    	  		    },
  		    'mouseout': function (e) {
  		      resetHighlight2(e.target);
  		    },
				'click': function (e) {
				  selectHighlight(e.target);
				}
	    });
	}

	function setSliderHandle(i, value) {
		var r = [null,null];
		r[i] = value;
		sliderRangeValue.noUiSlider.set(r);
	}

	function updateSliderRange ( min, max ) {
		if (min == max) {
			sliderRangeValue.setAttribute('disabled', true);
			$('#input-with-keypress-0').prop('disabled', true);
			$('#input-with-keypress-1').prop('disabled', true);
		}else{
			sliderRangeValue.removeAttribute('disabled');
			$('#input-with-keypress-0').prop('disabled', false);
			$('#input-with-keypress-1').prop('disabled', false);
			sliderRangeValue.noUiSlider.updateOptions({
				start: [min, max],
				range: {
					'min': min,
					'max': max
				}
			});
		}
	}

	function addSlider(){
		var keypressSlider = document.getElementById('keypress');
		var input0 = document.getElementById('input-with-keypress-0');
		var input1 = document.getElementById('input-with-keypress-1');
		var inputs = [input0, input1];

		if (set_jenk_divider<7) {
			range_slider_divider = 
			{
				'min': [0],
				'max': legend_num_arr[(legend_num_arr.length)-1]
			}
		}else{
			range_slider_divider = 
			{
				'min': legend_num_arr[0],
				'25%': legend_num_arr[1],
				'50%': legend_num_arr[3],
				'75%': legend_num_arr[5],
				'max': legend_num_arr[(legend_num_arr.length)-1]
			}
		}

		noUiSlider.create(keypressSlider, {
			start: [0, legend_num_arr[(legend_num_arr.length)-1]],
			connect: true,
			// direction: 'rtl',
			// tooltips: [true, wNumb({ decimals: 0 })],
			// snap: true,
			range: range_slider_divider,
			format: wNumb({
				decimals: 1
			})
			// format: {
			// 	to: function ( value ) {
			// 		return humanizeFormatter(value);
			// 	},
			// 	from: function ( value ) {
			// 		if(value>=1000 && value<1000000){
			// 			return value.replace(' K', '')*1000;
			// 		}
			// 		else if (value>=1000000 && value<1000000000) {
			// 			return value.replace(' M', '')*1000000;
			// 		}else{
			// 			return value;
			// 		}
			// 	}
			// }
		});

		if (range_slider_divider.min == range_slider_divider.max) {
			keypressSlider.setAttribute('disabled', true);
			$('#input-with-keypress-0').prop('disabled', true);
			$('#input-with-keypress-1').prop('disabled', true);

		}else{
			keypressSlider.removeAttribute('disabled');
			$('#input-with-keypress-0').prop('disabled', false);
			$('#input-with-keypress-1').prop('disabled', false);
		}

		keypressSlider.noUiSlider.on('update', function( values, handle ) {
			group.clearLayers();
			inputs[handle].value = values[handle];

			range = keypressSlider.noUiSlider.get();
			rangeMin = range.slice(0, 1);
			rangeMax = range.slice(1);

			// console.log(range);
			// console.log(rangeMin);
			// console.log(rangeMax);

			getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

			// geojson.clearLayers();
			digital_zips = L.geoJson(boundary, {
			    onEachFeature: onEachFeature,
			    style: style,
			    filter: function (feature, layer) {
			        return (feature.properties.value <= rangeMax) & (feature.properties.value >= rangeMin);
			    }
			});
			group = L.featureGroup().addLayer(digital_zips);
			group.addTo(this_map);

			// geojson = L.featureGroup().addLayer(digital_zips);
			// geojson.addTo(baselineMap);
		});

		// Listen to keydown events on the input field.
		inputs.forEach(function(input, handle) {

			input.addEventListener('change', function(){
				setSliderHandle(handle, this.value);
			});

			input.addEventListener('keydown', function( e ) {

				var values = keypressSlider.noUiSlider.get();
				var value = Number(values[handle]);

				// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
				var steps = keypressSlider.noUiSlider.steps();

				// [down, up]
				var step = steps[handle];

				var position;

				// 13 is enter,
				// 38 is key up,
				// 40 is key down.
				switch ( e.which ) {

					case 13:
						setSliderHandle(handle, this.value);
						break;

					case 38:

						// Get step to go increase slider value (up)
						position = step[1];

						// false = no step is set
						if ( position === false ) {
							position = 1;
						}

						// null = edge of slider
						if ( position !== null ) {
							setSliderHandle(handle, value + position);
						}

						break;

					case 40:

						position = step[0];

						if ( position === false ) {
							position = 1;
						}

						if ( position !== null ) {
							setSliderHandle(handle, value - position);
						}

						break;
				}
			});
		});

		return keypressSlider;
	}

	// Leaflet JS
	if ($('#leaflet_baseline_map').length ){
		var baselineMap = initMap();

		var layer_selected = "Population";

		changeValueProp(layer_selected);
		// console.log(val_collection);
		legend_num_arr = setLegendSeries(val_collection);
		// console.log(legend_num_arr);

		val_theme = 'YlOrRd';
		var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

		legend = createLegend();
		legend.addTo(baselineMap);

		var selected = null;

		var info = addInfo();
		// method that we will use to update the control based on feature properties passed
		info.update = function (props) {
			// console.log(props);
		    this._div.innerHTML = 
		    	(props ?
		        	'<span class="chosen_area card-title">' + props.na_en + '<a class="btn red darken-3 linkPopup right">Go To ' + (props.na_en) +'</a>' + '</span>'
		        	// + '<span>' + chosen_label + '</span>'
		        	+ '<div class="row"><div class="col s12 m4 l3 xl12">'
		        	+ '<div class="circle_container"><i class="icon-people_affected_population fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.Population) + '</span><span class="circle_title">' + overview_legend[0] + '</span></div>'
		        	+ '<div class="circle_container"><i class="icon-infrastructure_building fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.Buildings) + '</span><span class="circle_title">' + overview_legend[2] + '</span></div>'
		        	+ '<div class="circle_container"><i class="fa fa-tree fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.Area) + '</span><span class="circle_title">' + overview_legend[1] + '</span></div>'
		        	+ '<div class="circle_container"><i class="fa fa-hospital-o fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.hlt_total) + '</span><span class="circle_title">' + total_category[0] + '</span></div>'
		        	+ '<div class="circle_container"><i class="fa fa-road fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.road_total) + '</span><span class="circle_title">' + total_category[1] + '</span></div>'
		        	+ '</div>'

		        	+ '<div style="display:none;" class="col s12 m8 l5 xl7 Population"><div id="chart_map_pop" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col s12 m8 l5 xl7 Buildings"><div id="chart_map_build" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col s12 m8 l5 xl7 Area"><div id="chart_map_area" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col s12 m8 l5 xl7 hlt_total"><div id="chart_map_hlt_fac" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col s12 m8 l5 xl7 road_total"><div id="chart_map_road_network" class="ch-map-size" style="height:280px;"></div></div>'

		        	// + '<table class="table table-bordered table-condensed"><thead><tr><th rowspan="2"></th><th colspan="3">Tier 1</th><th>Tier 2</th><th colspan="2">Tier 3</th><th rowspan="2">Others</th><th rowspan="2">Total</th></tr><tr><th>H1</th><th>H2</th><th>H3</th><th>CHC</th><th>BHC</th><th>SHC</th></tr></thead><tbody><tr><td>Health Facilities</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_h1) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_h2) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_h3) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_chc) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_bhc) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_shc) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_others) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.hlt_total) + '</td>'
		        	// + '</tr></tbody></table>'
		        	// + '<table class="table table-bordered table-condensed"><thead><tr><th></th><th>Highway</th><th>Primary</th><th>Secondary</th><th>Tertiary</th><th>Residential</th><th>Track</th><th>Path</th><th>Total</th></tr></thead><tbody><tr><td>Road Network (km)</td>'
		        	// + '<td>' + humanizeFormatter(props.road_highway) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_primary) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_secondary) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_tertiary) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_residential) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_track) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_path) + '</td>'
		        	// + '<td>' + humanizeFormatter(props.road_total) + '</td>'
		        	// + '</tr></tbody></table>'

		        	+ '<div style="display:none;" class="col s12 l4 xl5 hlt_total"><table class="table table-bordered table-condensed"><tr><th colspan="3">Health Facilities</th></tr><tr><th rowspan="3" class="rotate">Tier 1</th><th>H1</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_h1) + '</td></tr><tr><th>H2</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_h2) + '</td></tr><tr><th>H3</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_h3) + '</td></tr><tr><th class="rotate">Tier 2</th><th>CHC</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_chc) + '</td></tr><tr><th rowspan="2" class="rotate">Tier 3</th><th>BHC</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_bhc) + '</td></tr><tr><th>SHC</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_shc) + '</td></tr><tr><th colspan="2">Others</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_others) + '</td></tr><tr><th colspan="2" style="text-align: right;">Total</th>'
		        	+ '<td>' + humanizeFormatter(props.hlt_total) + '</td></tr></table></div>'

		        	+ '<div style="display:none;" class="col s12 l4 xl5 road_total"><table class="table table-bordered table-condensed"><tr><th colspan="2">Road Network</th></tr><tr><th>Highway</th>'
		        	+ '<td>' + humanizeFormatter(props.road_highway) + '</td></tr><tr><th>Primary</th>'
		        	+ '<td>' + humanizeFormatter(props.road_primary) + '</td></tr><tr><th>Secondary</th>'
		        	+ '<td>' + humanizeFormatter(props.road_secondary) + '</td></tr><tr><th>Tertiary</th>'
		        	+ '<td>' + humanizeFormatter(props.road_tertiary) + '</td></tr><tr><th>Residential</th>'
		        	+ '<td>' + humanizeFormatter(props.road_residential) + '</td></tr><tr><th>Track</th>'
		        	+ '<td>' + humanizeFormatter(props.road_track) + '</td></tr><tr><th>Path</th>'
		        	+ '<td>' + humanizeFormatter(props.road_path) + '</td></tr><tr><th style="text-align: right;">Total</th>'
		        	+ '<td>' + humanizeFormatter(props.road_total) + '</td></tr></table></div>'

		        	+ '</div>'
		        : '<span class="card-title">' + chosen_label + '</span>' + 'Click on an area to show information');
			$('a.linkPopup').on('click', function() {
			    window.document.location="?page=baseline&code=" + (props.code) ;
			});
			$('.' + $('select#baselineOpt').val()).show();
		};

		var chart = addChart();
		chart.update = function (props) { 
			chart_map_pop = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_pop',
	                type: 'pie',
	                // margin: [],
	                style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
	            },
	            title: {
	                text: 'Population',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            yAxis: {
	                title: {
	                    text: 'Total percent market share'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false,
	                    // point: {
                        //     events: {
                        //         mouseOver: function(){
                        //             this.series.chart.innerText.attr({text: Math.round(this.percentage*100)/100 + '%'});
                        //         }//, 
                        //         // mouseOut: function(){
                        //         //     this.series.chart.innerText.attr({text: 112});
                        //         // }
                        //     }
                        // }
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y) + ' (' + Math.round(this.percentage*100)/100 + ' %)';
	                }
	            },
	            legend: {
	            	enabled: false,
	                align: 'center',
	                // layout: 'vertical',
	                verticalAlign: 'bottom'
	                // floating: true,
	                // margin: 20
	                // x: 40,
	                // y: -20
	            },
	            colors: colorDonutDefault,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Population',
	                data: [[props.na_en,props.Population],[chosen_label,props.all_population-props.Population]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        }/*,
	            function(chart) { // on complete
	                
	                var xpos = '50%';
	                var ypos = '53%';
	                var circleradius = 102;
	            
	            // Render the text 
	            chart.innerText = chart.renderer.text('112', 112, 125).css({
	                    width: circleradius*2,
	                    color: '#a72b1f',
	                    fontSize: '20px',
	                    textAlign: 'center'
	                }).attr({
	                    // why doesn't zIndex get the text in front of the chart?
	                    zIndex: 999
	                }).add();
	        	}*/
	        );

	        chart_map_build = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_build',
	                type: 'pie',
	                style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
	            },
	            title: {
	                text: 'Buildings',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            yAxis: {
	                title: {
	                    text: ''
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y) + ' (' + Math.round(this.percentage*100)/100 + ' %)';
	                }
	            },
	            legend: {
	            	enabled: false,
	                align: 'center',
	                verticalAlign: 'bottom'
	            },
	            colors: colorDonutDefault,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Buildings',
	                data: [[props.na_en,props.Buildings],[chosen_label,props.all_buildings-props.Buildings]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });	

	        chart_map_area = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_area',
	                type: 'pie',
	                style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
	            },
	            title: {
	                text: 'Area',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            yAxis: {
	                title: {
	                    text: ''
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y) + ' (' + Math.round(this.percentage*100)/100 + ' %)';
	                }
	            },
	            legend: {
	            	enabled: false,
	                align: 'center',
	                verticalAlign: 'bottom'
	            },
	            colors: colorDonutDefault,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Area',
	                data: [[props.na_en,props.Area],[chosen_label,props.all_area-props.Area]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });			

			chart_map_hlt_fac = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_hlt_fac',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Health Facilities',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                	return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            // colors: ['#ffdead','#fbccb4','#efb5ab','#df9996','#ce7977','#bd5451','#ae2029'],
	            // colors: ['#fae5c2','#f9d1ac','#f4aa92','#e76b74','#cd6768','#ba5045','#a81c07'],
	            // colors: ['#5d1e26', '#b48484', '#ecc4c2', '#806700', '#fbcc82', '#fae5c2', '#E76B74'],
	            colors: ['#ffffe0','#ffd59b','#ffa474','#f47461','#db4551','#b81b34','#8b0000'],
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Health Facilities',
	                // data: [
	                // 	{
	                // 		"name": "Tier 1",
	                // 		"y": props.hlt_h1 + props.hlt_h2 + props.hlt_h3,
	                // 		"drilldown": "Tier 1"
	                // 	},
	                // 	{
	                // 		"name": "Tier 2",
	                // 		"y": props.hlt_chc,
	                // 		"drilldown": null
	                // 	},
	                // 	{
	                // 		"name": "Tier 3",
	                // 		"y": props.hlt_bhc + props.hlt_shc,
	                // 		"drilldown": "Tier 3"
	                // 	},
	                // 	{
	                // 		"name": "Others",
	                // 		"y": props.hlt_others,
	                // 		"drilldown": null
	                // 	}
	                // ],
	                data: [[hlt_category[0],props.hlt_h1],[hlt_category[1],props.hlt_h2],[hlt_category[2],props.hlt_h3],[hlt_category[3],props.hlt_chc],[hlt_category[4],props.hlt_bhc],[hlt_category[5],props.hlt_shc],[hlt_category[6],props.hlt_others]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]/*,
	            drilldown: {
	            	series: [
	            		{
		            		"name": "Tier 1",
		            		"id": "Tier 1",
		            		"data": [[hlt_category[0],props.hlt_h1],[hlt_category[1],props.hlt_h2],[hlt_category[2],props.hlt_h3]]
	            		},
	            		{
		            		"name": "Tier 3",
		            		"id": "Tier 3",
		            		"data": [[hlt_category[4],props.hlt_bhc],[hlt_category[5],props.hlt_shc]]
	            		}
	            	]
	            }*/
	        });

	        chart_map_road = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_road_network',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Road Network',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: panels.road.title,
        	        title: {
        	            text: null
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Length of Road (km)',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	    	formatter: function() {
        	    	    return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y) + ' km';
        	    	}
        	    },
        	    plotOptions: {
        	        bar: {
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	    	enabled: false
        	    },
        	    colors: ['#CF000F'],
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Road Network',
        	        data: [props.road_highway, props.road_primary, props.road_secondary, props.road_tertiary, props.road_residential, props.road_track, props.road_path]
        	    }]
	        });
		}

		geojson = L.geoJson(boundary, {
		    style: style,
		    onEachFeature: onEachFeature
		});
		// geojson.addTo(baselineMap);

		group = L.featureGroup([geojson]).addLayer(geojson)/*.addTo(baselineMap)*/;
		this_map = baselineMap;

		document.getElementById("mapInfo").appendChild(info.onAdd(baselineMap));

		sliderRangeValue = addSlider();

		$('select#baselineOpt').change(function(){
			group.clearLayers();
			info.update();
			layer_selected = (this.value);

		    // geojson.remove();
		    legend.remove();
		    changeValueProp(layer_selected);
		    legend_num_arr = setLegendSeries(val_collection);
		    // console.log(legend_num_arr);
		    getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
		    legend.addTo(baselineMap);

		    if (legend_num_arr.length==1) {
		    	updateSliderRange(0,legend_num_arr[legend_num_arr.length-1]);
		    }else{
		    	updateSliderRange(legend_num_arr[0],legend_num_arr[legend_num_arr.length-1]);
		    }

		    group.setStyle(style);
		    group.addTo(baselineMap);

		});

		$('#themes').on('click','button', function (evt) {
			// add active class on selected button
			$(this).siblings().removeClass('active')
			$(this).addClass('active');

		   	val_theme = $(this).data('btn');
		   	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
		   	group.setStyle(style);
		   	legend.addTo(baselineMap);
		});
	}

	if ($('#leaflet_access_map').length ){
		// Disabling checkbox if no data available
		var accessCheckbox=document.getElementsByName("access_checkbox");
		for (var i = 0; i < accessCheckbox.length; i++) {
			var r = accessCheckbox[i];
			var terpilih = r.value;
			// console.log(getMax(boundary.features, [terpilih]));
			if (getMax(boundary.features, [terpilih])==0) {
				// console.log(terpilih);
				accessCheckbox[i].disabled=true;
				$(r).closest("div").addClass("disabled");
			}
		}

		var accessMap = initMap();

	    //Set zoom control with your options
	    // accessMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 

	    {
	        "nAirprt" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_airdrm',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nHlt1" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_hltfac_tier1',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nHlt2" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_hltfac_tier2',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nHlt3" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_hltfac_tier3',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nHltAll" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_hltfac_tierall',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nItProvCap" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_adm1_its_provc',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nProvCap" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_adm1_nearest_provc',
	                    format: 'image/png',
	                    transparent: true
	        }),
	        "nDistCntr" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_capa_adm2_nearest_districtc',
	                    format: 'image/png',
	                    transparent: true
	        }),

	        "Provincial Boundary" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_admbnda_adm1',
	                    format: 'image/png',
	                    transparent: true
	        })


	    };

	    // wmsLayer.nAirprt.addTo(accessMap);

	    // L.control.layers(wmsLayer).addTo(accessMap);
	    // var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(accessMap);

	    $('.lvl_choice .access_checkbox_nAirprt :checkbox:enabled').prop('checked', true);
	    sumValueProp($('.lvl_choice .access_checkbox_nAirprt :checkbox:enabled'));

		legend_num_arr = setLegendSeries(val_collection);
		// console.log(legend_num_arr);

		val_theme = 'YlOrRd';
		var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

	    legend = createLegend();
	    legend.addTo(accessMap);

	    var selected = null;

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(accessMap);

	    var info = addInfo();
	    info.update = function (props) {
	    	// console.log(props);
	        this._div.innerHTML = 
	        	(props ?
	            	'<span class="chosen_area">' + props.na_en + '</span>'
	            	+ '<div class="row">'

	            	+ '<div style="display:none;" class="col-md-1 col-sm-12 col-xs-12 access_radio_gsm">'
	            	// + '<div class="circle_container"><i class="icon-people_affected_population fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.Population) + '</span><span class="circle_title">' + 'Population' + '</span></div>'
	            	// + '<div class="circle_container"><i class="icon-infrastructure_building fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.Buildings) + '</span><span class="circle_title">' + 'Buildings' + '</span></div>'
	            	// + '<div class="circle_container"><i class="fa fa-tree fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.Area) + '</span><span class="circle_title">' + 'Area' + '</span></div>'

	            	+ '<div style="display:none;" class="circle_container pop_on_gsm_coverage"><i class="icon-people_affected_population fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.pop_on_gsm_coverage) + '</span><span class="circle_title">' + 'Pop on GSM Cov' + '</span></div>'
	            	+ '<div style="display:none;" class="circle_container buildings_on_gsm_coverage"><i class="icon-infrastructure_building fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.buildings_on_gsm_coverage) + '</span><span class="circle_title">' + 'Build on GSM Cov' + '</span></div>'
	            	+ '<div style="display:none;" class="circle_container area_on_gsm_coverage"><i class="fa fa-tree fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.area_on_gsm_coverage) + '</span><span class="circle_title">' + 'Area on GSM Cov' + '</span></div>'
	            	+ '</div>'

	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nAirprt"><div id="chart_map_nAirport" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nHlt1"><div id="chart_map_nHlt1" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nHlt2"><div id="chart_map_nHlt2" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nHlt3"><div id="chart_map_nHlt3" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nHltAll"><div id="chart_map_nHltAll" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nItProvCap"><div id="chart_map_nItProvCap" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nProvCap"><div id="chart_map_nProvCap" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 access_checkbox_nDistCntr"><div id="chart_map_nDistCntr" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 pop_on_gsm_coverage"><div id="chart_map_gsmPop" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12"><div id="chart_map_gsmBuilding" class="ch-map-size" style="height:280px;"></div></div>'
	            	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 area_on_gsm_coverage"><div id="chart_map_gsmArea" class="ch-map-size" style="height:280px;"></div></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nAirprt"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest Airport</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_airp)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_airp)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_airp)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_airp)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_airp)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_airp)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_airp)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_airp)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_airp)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nHlt1"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest Hospital Tier 1</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_hlt1)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_hlt1)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_hlt1)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nHlt2"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest Hospital Tier 2</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_hlt2)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_hlt2)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_hlt2)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nHlt3"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest Hospital Tier 3</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_hlt3)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_hlt3)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_hlt3)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nHltAll"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest Hospital Tier All</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_hltall)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_hltall)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_hltall)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_hltall)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_hltall)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_hltall)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_hltall)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_hltall)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_hltall)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nItProvCap"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Its Provincial Capital</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__itsx_prov)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__itsx_prov)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__itsx_prov)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nProvCap"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest Provincial Capital</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_prov)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_prov)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_prov)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_prov)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_prov)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_prov)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_prov)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_prov)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_prov)
	            	+ '</td></tr></table></div>'

	            	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 access_checkbox_nDistCntr"><table class="table table-bordered table-condensed"><tr><th>Travel Time</th><th>Nearest District Center</th></tr><tr>'
	            	+ '<th class="l1h">' + time_legend[0]
	            	+ '</th><td class="l1h">' + humanizeFormatter(props.l1_h__near_dist)
	            	+ '</td></tr><tr><th class="l2h">' + time_legend[1]
	            	+ '</th><td class="l2h">' + humanizeFormatter(props.l2_h__near_dist)
	            	+ '</td></tr><tr><th class="l3h">' + time_legend[2]
	            	+ '</th><td class="l3h">' + humanizeFormatter(props.l3_h__near_dist)
	            	+ '</td></tr><tr><th class="l4h">' + time_legend[3]
	            	+ '</th><td class="l4h">' + humanizeFormatter(props.l4_h__near_dist)
	            	+ '</td></tr><tr><th class="l5h">' + time_legend[4]
	            	+ '</th><td class="l5h">' + humanizeFormatter(props.l5_h__near_dist)
	            	+ '</td></tr><tr><th class="l6h">' + time_legend[5]
	            	+ '</th><td class="l6h">' + humanizeFormatter(props.l6_h__near_dist)
	            	+ '</td></tr><tr><th class="l7h">' + time_legend[6]
	            	+ '</th><td class="l7h">' + humanizeFormatter(props.l7_h__near_dist)
	            	+ '</td></tr><tr><th class="l8h">' + time_legend[7]
	            	+ '</th><td class="l8h">' + humanizeFormatter(props.l8_h__near_dist)
	            	+ '</td></tr><tr><th class="m8h">' + time_legend[8]
	            	+ '</th><td class="m8h">' + humanizeFormatter(props.g8_h__near_dist)
	            	+ '</td></tr></table></div>'

	            	+ '</div>'

	            	// +'<div class="col-md-12 col-sm-12 col-xs-12"><table class="table table-bordered table-condensed"><thead><tr><th></th><th class="l1h">&lt; 1 h</th><th class="l2h">&lt; 2 h</th><th class="l3h">&lt; 3 h</th><th class="l4h">&lt; 4 h</th><th class="l5h">&lt; 5 h</th><th class="l6h">&lt; 6 h</th><th class="l7h">&lt; 7 h</th><th class="l8h">&lt; 8 h</th><th class="m8h">&gt; 8 h</th></tr></thead><tbody><tr><td>Nearest Airport'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_airp)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_airp)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_airp)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_airp)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_airp)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_airp)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_airp)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_airp)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_airp)
	            	// +'</td></tr><tr><td>Nearest Hospital Tier 1'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_hlt1)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_hlt1)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_hlt1)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_hlt1)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_hlt1)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_hlt1)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_hlt1)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_hlt1)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_hlt1)
	            	// +'</td></tr><tr><td>Nearest Hospital Tier 2'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_hlt2)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_hlt2)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_hlt2)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_hlt2)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_hlt2)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_hlt2)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_hlt2)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_hlt2)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_hlt2)
	            	// +'</td></tr><tr><td>Nearest Hospital Tier 3'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_hlt3)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_hlt3)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_hlt3)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_hlt3)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_hlt3)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_hlt3)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_hlt3)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_hlt3)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_hlt3)
	            	// +'</td></tr><tr><td>Nearest Hospital Tier All'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_hltall)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_hltall)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_hltall)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_hltall)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_hltall)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_hltall)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_hltall)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_hltall)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_hltall)
	            	// +'</td></tr><tr><td>Its Provincial Capital'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__itsx_prov)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__itsx_prov)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__itsx_prov)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__itsx_prov)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__itsx_prov)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__itsx_prov)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__itsx_prov)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__itsx_prov)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__itsx_prov)
	            	// +'</td></tr><tr><td>Nearest Provincial Capital'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_prov)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_prov)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_prov)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_prov)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_prov)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_prov)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_prov)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_prov)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_prov)
	            	// +'</td></tr><tr><td>Nearest District Center'
	            	// +'</td><td class="l1h">' + humanizeFormatter(props.l1_h__near_dist)
	            	// +'</td><td class="l2h">' + humanizeFormatter(props.l2_h__near_dist)
	            	// +'</td><td class="l3h">' + humanizeFormatter(props.l3_h__near_dist)
	            	// +'</td><td class="l4h">' + humanizeFormatter(props.l4_h__near_dist)
	            	// +'</td><td class="l5h">' + humanizeFormatter(props.l5_h__near_dist)
	            	// +'</td><td class="l6h">' + humanizeFormatter(props.l6_h__near_dist)
	            	// +'</td><td class="l7h">' + humanizeFormatter(props.l7_h__near_dist)
	            	// +'</td><td class="l8h">' + humanizeFormatter(props.l8_h__near_dist)
	            	// +'</td><td class="m8h">' + humanizeFormatter(props.g8_h__near_dist)
	            	// +'</td></tr></tbody></table></div>'
	            	+ '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
	            : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
			$('a.linkPopup').on('click', function() {
			    window.document.location="?page=accessibility&code=" + (props.code) ;
			});
			$('.' + $('#accessOpt').val()).show();
			$('.' + $('input[name=access_radio]:checked').val()).show();
	    };

		var chart = addChart();
		chart.update = function (props) { 
	        chart_map_nAirport = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nAirport',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest Airport',
        	        // verticalAlign: 'bottom',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near Airport',
        	        data: [props.l1_h__near_airp, props.l2_h__near_airp, props.l3_h__near_airp, props.l4_h__near_airp, props.l5_h__near_airp, props.l6_h__near_airp, props.l7_h__near_airp, props.l8_h__near_airp, props.g8_h__near_airp]
        	    }]
	        });
	        chart_map_nHlt1 = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nHlt1',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest Health Facilities Tier 1',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near Health Facilities Tier 1',
        	        data: [props.l1_h__near_hlt1, props.l2_h__near_hlt1, props.l3_h__near_hlt1, props.l4_h__near_hlt1, props.l5_h__near_hlt1, props.l6_h__near_hlt1, props.l7_h__near_hlt1, props.l8_h__near_hlt1, props.g8_h__near_hlt1]
        	    }]
	        });
	        chart_map_nHlt2 = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nHlt2',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest Health Facilities Tier 2',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near Health Facilities Tier 2',
        	        data: [props.l1_h__near_hlt2, props.l2_h__near_hlt2, props.l3_h__near_hlt2, props.l4_h__near_hlt2, props.l5_h__near_hlt2, props.l6_h__near_hlt2, props.l7_h__near_hlt2, props.l8_h__near_hlt2, props.g8_h__near_hlt2]
        	    }]
	        });
	        chart_map_nHlt3 = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nHlt3',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest Health Facilities Tier 3',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near Health Facilities Tier 3',
        	        data: [props.l1_h__near_hlt3, props.l2_h__near_hlt3, props.l3_h__near_hlt3, props.l4_h__near_hlt3, props.l5_h__near_hlt3, props.l6_h__near_hlt3, props.l7_h__near_hlt3, props.l8_h__near_hlt3, props.g8_h__near_hlt3]
        	    }]
	        });
	        chart_map_nHltAll = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nHltAll',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest Health Facilities All Tier',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near Health Facilities All Tier',
        	        data: [props.l1_h__near_hltall, props.l2_h__near_hltall, props.l3_h__near_hltall, props.l4_h__near_hltall, props.l5_h__near_hltall, props.l6_h__near_hltall, props.l7_h__near_hltall, props.l8_h__near_hltall, props.g8_h__near_hltall]
        	    }]
	        });
	        chart_map_nItProvCap = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nItProvCap',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Its Provincial Capital',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Its Provincial Capital',
        	        data: [props.l1_h__itsx_prov, props.l2_h__itsx_prov, props.l3_h__itsx_prov, props.l4_h__itsx_prov, props.l5_h__itsx_prov, props.l6_h__itsx_prov, props.l7_h__itsx_prov, props.l8_h__itsx_prov, props.g8_h__itsx_prov]
        	    }]
	        });
	        chart_map_nProvCap = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nProvCap',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest Provincial Capital',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near Provincial Capital',
        	        data: [props.l1_h__near_prov, props.l2_h__near_prov, props.l3_h__near_prov, props.l4_h__near_prov, props.l5_h__near_prov, props.l6_h__near_prov, props.l7_h__near_prov, props.l8_h__near_prov, props.g8_h__near_prov]
        	    }]
	        });
	        chart_map_nDistCntr = new Highcharts.Chart({
	        	chart: {
	        		renderTo: 'chart_map_nDistCntr',
        	        type: 'bar',
        	        style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
        	    },
        	    title: {
        	        text: 'Travel Time to Nearest District Center',
        	        style: {
        	            font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
        	        }
        	    },
        	    xAxis: {
        	        categories: time_legend,
        	        title: {
        	            text: 'Travel Time'
        	        }
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Population',
        	            align: 'high'
        	        },
        	        labels: {
        	            overflow: 'justify'
        	        }
        	    },
        	    tooltip: {
        	        formatter: function() {
        	            return '<b>'+ this.x +'</b>: '+ humanizeFormatter(this.y);
        	        }
        	    },
        	    plotOptions: {
        	        bar: {
        	        	colorByPoint: true,
        	            dataLabels: {
        	                enabled: true,
        	                formatter: function() {
        	                    return humanizeFormatter(this.y);
        	                }
        	            }
        	        }
        	    },
        	    legend: {
        	        enabled: false
        	    },
        	    colors: colorList,
        	    credits: {
        	        enabled: false
        	    },
        	    series: [{
        	        name: 'Travel Time Near District Center',
        	        data: [props.l1_h__near_dist, props.l2_h__near_dist, props.l3_h__near_dist, props.l4_h__near_dist, props.l5_h__near_dist, props.l6_h__near_dist, props.l7_h__near_dist, props.l8_h__near_dist, props.g8_h__near_dist]
        	    }]
	        });
	        chart_map_gsmPop = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_gsmPop',
	                type: 'pie',
	                // margin: [],
	                style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
	            },
	            title: {
	                text: 'GSM Coverage Population',
	                verticalAlign: 'bottom',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            yAxis: {
	                title: {
	                    text: 'Total percent market share'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'left',
	                // layout: 'vertical',
	                verticalAlign: 'top'
	                // floating: true,
	                // margin: 20
	                // x: 40,
	                // y: -20
	            },
	            colors: colorDonutDefault,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'GSM Coverage Population',
	                data: [[gsm_legend[0],props.pop_on_gsm_coverage],[gsm_legend[1],props.Population-props.pop_on_gsm_coverage]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_gsmArea = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_gsmArea',
	                type: 'pie',
	                style: {
        	            fontFamily: '"Arial", Verdana, sans-serif'
        	        }
	            },
	            title: {
	                text: 'GSM Coverage Area',
	                verticalAlign: 'bottom',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'left',
	                verticalAlign: 'top'
	            },
	            colors: colorDonutDefault,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'GSM Coverage Area',
	                data: [[gsm_legend[0],props.area_on_gsm_coverage],[gsm_legend[1],props.Area-props.area_on_gsm_coverage]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });

	        // chart_map_nAirport.setOptions(Highcharts.theme);
		}

	    document.getElementById("mapInfo").appendChild(info.onAdd(accessMap));

	    $('#accessOpt').on('change', function() {
	    	info.update();
	    	var selected_opt = $(this).val();
	    	$("input[name='access_checkbox']").each(function () {
                $(this).prop('checked', false);
            });
            $('input[name=access_radio]:checked').prop('checked', false);
	    	$('.access_opt').hide();
	    	$('.' + selected_opt).show();

	    	if (selected_opt == 'access_radio_gsm') {
	    		$('.lvl_choice .' + selected_opt + ' :radio:first').prop('checked', true);
	    		changeValueProp($('.lvl_choice .' + selected_opt + ' :radio:first').val());
	    	}else{
	    		// Checked every checkbox which not disabled and change the value
	    		$('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
	    		sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));
	    	}

	    	// console.log(legend_num_arr);
    	    
    	    legend.remove();
    		legend_num_arr = setLegendSeries(val_collection);
    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
    		legend.addTo(accessMap);
    		geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	// console.log(val_theme);
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	geojson.setStyle(style);
	       	// group.setStyle(style);
	       	legend.addTo(accessMap);
	    });

	    $('#layercontrol input[type=radio]').change(function(){
	    	info.update();

	    	layer_selected = (this.value);
	        // console.log(layer_selected);

	        legend.remove();
	        changeValueProp(layer_selected);
	        legend_num_arr = setLegendSeries(val_collection);
	        getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	        legend.addTo(accessMap);
	        geojson.setStyle(style);

	    });

	    $("input[name='access_checkbox']:checkbox").on("change", function() {
	    	var choosen_cat = $("input[name='access_checkbox']:checkbox:checked");
	    	if (choosen_cat.length > 0) {
	    		sumValueProp(choosen_cat);
	    		legend.remove();
	    		legend_num_arr = setLegendSeries(val_collection);
	    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	    		legend.addTo(accessMap);
	    		geojson.setStyle(style);
	    	}else{
	    		legend.remove();
	    		sumValueProp(choosen_cat);
	    		geojson.setStyle(style);
	    	}
	    	
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            accessMap.addLayer(selected_layer);
	            
	        } else {
	            accessMap.removeLayer(selected_layer);
	            // layer.remove();
	        }
	    })
	}

	if ($('#leaflet_fforecast_map').length ){
		// Disabling checkbox if no data available
		var fforecastCheckbox=document.getElementsByName("fforecast_checkbox");
		for (var i = 0; i < fforecastCheckbox.length; i++) {
			var r = fforecastCheckbox[i];
			var terpilih = r.value;
			if (getMax(boundary.features, [terpilih])==0) {
				fforecastCheckbox[i].disabled=true;
				$(r).prop('checked', false);
				$(r).closest("div").addClass("disabled");
			}
		}

		var fforecastMap = initMap();

	    //Set zoom control with your options
	    // fforecastMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 

	    {

	        "fforecast" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:glofas_gfms_merge',
	                    viewparams: today,
	                    format: 'image/png',
	                    transparent: true
	        })

	    };

	    wmsLayer.fforecast.addTo(fforecastMap);

        $('.lvl_choice .fforecast_checkbox_flash_pop :checkbox:enabled').prop('checked', true);
        sumValueProp($('.lvl_choice .fforecast_checkbox_flash_pop :checkbox:enabled'));
    	legend_num_arr = setLegendSeries(val_collection);

    	val_theme = 'YlOrRd';
    	var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

        legend = createLegend();
        legend.addTo(fforecastMap);

        var info = addInfo();
        info.update = function (props) {
            this._div.innerHTML = 
            	(props ?
                	'<span class="chosen_area">' + props.na_en + '</span>'
                	+ '<div class="row">'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_flash_pop"><div id="chart_map_fforecast" class="ch-map-size" style="height:280px;"></div></div>'
                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_river_gg_pop"><div id="chart_map_ggfforecast" class="ch-map-size" style="height:280px;"></div></div>'
                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_river_gl_pop"><div id="chart_map_glfforecast" class="ch-map-size" style="height:280px;"></div></div>'
                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_river_gf_pop"><div id="chart_map_gffforecast" class="ch-map-size" style="height:280px;"></div></div>'

                	+ '<div style="display: none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_flash_pop"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Affected Population</th></tr><tr>'
                	+ '<th class="low">' + fforecast_cat[0]
                	+ '</th><td class="low">' + humanizeFormatter(props.flashflood_forecast_low_pop)
                	+ '</td></tr><tr><th class="mod">' + fforecast_cat[1]
                	+ '</th><td class="mod">' + humanizeFormatter(props.flashflood_forecast_med_pop)
                	+ '</td></tr><tr><th class="high">' + fforecast_cat[2]
                	+ '</th><td class="high">' + humanizeFormatter(props.flashflood_forecast_high_pop)
                	+ '</td></tr><tr><th class="vhigh">' + fforecast_cat[3]
                	+ '</th><td class="vhigh">' + humanizeFormatter(props.flashflood_forecast_veryhigh_pop)
                	+ '</td></tr><tr><th class="ext">' + fforecast_cat[4]
                	+ '</th><td class="ext">' + humanizeFormatter(props.flashflood_forecast_extreme_pop)
                	+ '</td></tr></table></div>'

                	+ '<div style="display: none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_river_gg_pop"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Affected Population</th></tr><tr>'
                	+ '<th class="low">' + fforecast_cat[0]
                	+ '</th><td class="low">' + humanizeFormatter(props.gfms_glofas_riverflood_forecast_low_pop)
                	+ '</td></tr><tr><th class="mod">' + fforecast_cat[1]
                	+ '</th><td class="mod">' + humanizeFormatter(props.gfms_glofas_riverflood_forecast_med_pop)
                	+ '</td></tr><tr><th class="high">' + fforecast_cat[2]
                	+ '</th><td class="high">' + humanizeFormatter(props.gfms_glofas_riverflood_forecast_high_pop)
                	+ '</td></tr><tr><th class="vhigh">' + fforecast_cat[3]
                	+ '</th><td class="vhigh">' + humanizeFormatter(props.gfms_glofas_riverflood_forecast_veryhigh_pop)
                	+ '</td></tr><tr><th class="ext">' + fforecast_cat[4]
                	+ '</th><td class="ext">' + humanizeFormatter(props.gfms_glofas_riverflood_forecast_extreme_pop)
                	+ '</td></tr></table></div>'

                	+ '<div style="display: none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_river_gl_pop"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Affected Population</th></tr><tr>'
                	+ '<th class="low">' + fforecast_cat[0]
                	+ '</th><td class="low">' + humanizeFormatter(props.glofas_riverflood_forecast_low_pop)
                	+ '</td></tr><tr><th class="mod">' + fforecast_cat[1]
                	+ '</th><td class="mod">' + humanizeFormatter(props.glofas_riverflood_forecast_med_pop)
                	+ '</td></tr><tr><th class="high">' + fforecast_cat[2]
                	+ '</th><td class="high">' + humanizeFormatter(props.glofas_riverflood_forecast_high_pop)
                	+ '</td></tr><tr><th class="vhigh">' + fforecast_cat[3]
                	+ '</th><td class="vhigh">' + humanizeFormatter(props.glofas_riverflood_forecast_veryhigh_pop)
                	+ '</td></tr><tr><th class="ext">' + fforecast_cat[4]
                	+ '</th><td class="ext">' + humanizeFormatter(props.glofas_riverflood_forecast_extreme_pop)
                	+ '</td></tr></table></div>'

                	+ '<div style="display: none;" class="col-md-4 col-sm-12 col-xs-12 fforecast_checkbox_river_gf_pop"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Affected Population</th></tr><tr>'
                	+ '<th class="low">' + fforecast_cat[0]
                	+ '</th><td class="low">' + humanizeFormatter(props.riverflood_forecast_low_pop)
                	+ '</td></tr><tr><th class="mod">' + fforecast_cat[1]
                	+ '</th><td class="mod">' + humanizeFormatter(props.riverflood_forecast_med_pop)
                	+ '</td></tr><tr><th class="high">' + fforecast_cat[2]
                	+ '</th><td class="high">' + humanizeFormatter(props.riverflood_forecast_high_pop)
                	+ '</td></tr><tr><th class="vhigh">' + fforecast_cat[3]
                	+ '</th><td class="vhigh">' + humanizeFormatter(props.riverflood_forecast_veryhigh_pop)
                	+ '</td></tr><tr><th class="ext">' + fforecast_cat[4]
                	+ '</th><td class="ext">' + humanizeFormatter(props.riverflood_forecast_extreme_pop)
                	+ '</td></tr></table></div>'

                	+ '</div>'

                	+ '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
                : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
    		$('a.linkPopup').on('click', function() {
    		    window.document.location="?page=floodforecast&code=" + (props.code) ;
    		});
    		$('.' + $('select#fforecastOpt').val()).show();
        };

		var chart = addChart();
		chart.update = function (props) { 
			chart_map_fforecast = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_fforecast',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Flash Flood',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ this.y;
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	            },
	            colors: colorFloodLikelihood,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Health Facilities',
	                data: [[fforecast_cat[0],props.flashflood_forecast_low_pop],[fforecast_cat[1],props.flashflood_forecast_med_pop],[fforecast_cat[2],props.flashflood_forecast_high_pop],[fforecast_cat[3],props.flashflood_forecast_veryhigh_pop],[fforecast_cat[4],props.flashflood_forecast_extreme_pop]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
    		chart_map_ggfforecast = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_ggfforecast',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'River Flood GLOFAS GFMS',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.y;
                    }
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    verticalAlign: 'bottom'
                },
                colors: colorFloodLikelihood,
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Health Facilities',
                    data: [[fforecast_cat[0],props.gfms_glofas_riverflood_forecast_low_pop],[fforecast_cat[1],props.gfms_glofas_riverflood_forecast_med_pop],[fforecast_cat[2],props.gfms_glofas_riverflood_forecast_high_pop],[fforecast_cat[3],props.gfms_glofas_riverflood_forecast_veryhigh_pop],[fforecast_cat[4],props.gfms_glofas_riverflood_forecast_extreme_pop]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
    		chart_map_glfforecast = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_glfforecast',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'River Flood GLOFAS',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.y;
                    }
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    verticalAlign: 'bottom'
                },
                colors: colorFloodLikelihood,
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'GLOFAS',
                    data: [[fforecast_cat[0],props.glofas_riverflood_forecast_low_pop],[fforecast_cat[1],props.glofas_riverflood_forecast_med_pop],[fforecast_cat[2],props.glofas_riverflood_forecast_high_pop],[fforecast_cat[3],props.glofas_riverflood_forecast_veryhigh_pop],[fforecast_cat[4],props.glofas_riverflood_forecast_extreme_pop]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
            chart_map_gffforecast = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_gffforecast',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'River Flood GFMS',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.y;
                    }
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    verticalAlign: 'bottom'
                },
                colors: colorFloodLikelihood,
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'GFMS',
                    data: [[fforecast_cat[0],props.riverflood_forecast_low_pop],[fforecast_cat[1],props.riverflood_forecast_med_pop],[fforecast_cat[2],props.riverflood_forecast_high_pop],[fforecast_cat[3],props.riverflood_forecast_veryhigh_pop],[fforecast_cat[4],props.riverflood_forecast_extreme_pop]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
		}

        var selected = null;

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(fforecastMap);

	    document.getElementById("mapInfo").appendChild(info.onAdd(fforecastMap));

	    // Show Related checkbox and checked all the option if dropdown changes
	    $('#fforecastOpt').on('change', function() {
	    	info.update();
	    	var selected_opt = $(this).val();
	    	$("input[name='fforecast_checkbox']").each(function () {
                $(this).prop('checked', false);
            });
	    	$('.fforecast_opt').hide();

    	    $('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
    	    sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));
    	    $('.' + selected_opt).show();

    	    legend.remove();
    		legend_num_arr = setLegendSeries(val_collection);
    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
    		legend.addTo(fforecastMap);
    		geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	// console.log(val_theme);
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	geojson.setStyle(style);
	       	// group.setStyle(style);
	       	legend.addTo(fforecastMap);
	    });

	    $("input[name='fforecast_checkbox']:checkbox").on("change", function() {
	    	var choosen_cat = $("input[name='fforecast_checkbox']:checkbox:checked");
	    	if (choosen_cat.length > 0) {
	    		sumValueProp(choosen_cat);
	    		legend.remove();
	    		legend_num_arr = setLegendSeries(val_collection);
	    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	    		legend.addTo(fforecastMap);
	    		geojson.setStyle(style);
	    	}else{
	    		legend.remove();
	    		sumValueProp(choosen_cat);
	    		geojson.setStyle(style);
	    	}
	    	
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            fforecastMap.addLayer(selected_layer);
	            
	        } else {
	        	// console.log(lyr);
	            fforecastMap.removeLayer(selected_layer);
	        }
	    })
	}

	if ($('#leaflet_floodrisk_map').length ){
		var floodRiskMap = initMap();

		//Set zoom control with your options
		// fforecastMap.zoomControl.setPosition('bottomright');

		var wmsLayer = 

		{
		    "frisk" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
		    		    layers: 'geonode:afg_fldzonea_100k_risk_landcover_pop',
		    		    format: 'image/png',
		    		    transparent: true
		    })
		};

		wmsLayer.frisk.addTo(floodRiskMap);

		// L.control.layers(wmsLayer).addTo(floodRiskMap);
		// var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(floodRiskMap);

		// Data for legend based on selected layer
		var layer_selected = "total_risk_population";
		changeValueProp(layer_selected);
		legend_num_arr = setLegendSeries(val_collection);

		val_theme = 'YlOrRd';
		var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

		legend = createLegend();
		legend.addTo(floodRiskMap);

		var selected = null;

		var info = addInfo();
        info.update = function (props) {
            this._div.innerHTML = 
            	(props ?
		        	'<span class="chosen_area card-title">' + props.na_en + '<a class="btn red darken-3 linkPopup right">Go To ' + (props.na_en) +'</a>' + '</span>'

                	+ '<div class="row"><div class="col s12 l3"><div class="circle_container"><i class="icon-people_affected_population fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_risk_population) + '</span><span class="circle_title">' + map_category[0] + '</span></div>'
                	+ '<div class="circle_container"><i class="icon-infrastructure_building fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.settlements_at_risk) + '</span><span class="circle_title">' + map_category[2] + '</span></div>'
                	+ '<div class="circle_container"><i class="icon-socioeconomic_urban fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_risk_buildings) + '</span><span class="circle_title">' + map_category[1] + '</span></div>'
                	+ '<div class="circle_container"><i class="fa fa-tree fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_risk_area) + '</span><span class="circle_title">' + map_category[3] + '</span></div></div>'

                	+ '<div style="display:none;" class="col s12 l4 xl9 total_risk_population"><div id="chart_map_frisk_pop" class="ch-map-size" style="height:280px;"></div></div>'
                	+ '<div style="display:none;" class="col s12 l4 xl9 total_risk_area"><div id="chart_map_frisk_area" class="ch-map-size" style="height:280px;"></div></div>'

                	+ '<div style="display: none;" class="col s12 l3 xl9 total_risk_population"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Population</th></tr><tr>'
                	+ '<th>' + frisk_cat[0]
                	+ '</th><td>' + humanizeFormatter(props.low_risk_population)
                	+ '</td></tr><tr><th>' + frisk_cat[1]
                	+ '</th><td>' + humanizeFormatter(props.med_risk_population)
                	+ '</td></tr><tr><th>' + frisk_cat[2]
                	+ '</th><td>' + humanizeFormatter(props.high_risk_population)
                	+ '</td></tr></table></div>'

                	+ '<div style="display: none;" class="col s12 l3 xl9 total_risk_area"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Area</th></tr><tr>'
                	+ '<th>' + frisk_cat[0]
                	+ '</th><td>' + humanizeFormatter(props.low_risk_area)
                	+ '</td></tr><tr><th>' + frisk_cat[1]
                	+ '</th><td>' + humanizeFormatter(props.med_risk_area)
                	+ '</td></tr><tr><th>' + frisk_cat[2]
                	+ '</th><td>' + humanizeFormatter(props.high_risk_area)
                	+ '</td></tr></table></div>'

                	+ '</div>'

                	// + '<table><tr><td>Flood Risk Population : </td><td>' + humanizeFormatter(props.total_risk_population)
                	// + '</td></tr><tr><td>Flood Risk Building</td><td>' + humanizeFormatter(props.total_risk_buildings)
                	// + '</td></tr><tr><td>Flood Risk Settlement</td><td>' + humanizeFormatter(props.settlements_at_risk)
                	// + '</td></tr><tr><td>Flood Risk Area : </td><td>' + humanizeFormatter(props.total_risk_area)
                	// + '</td></tr></table>'
                : '<span class="card-title">' + chosen_label + '</span>' + 'Click on an area to show information');
    		$('a.linkPopup').on('click', function() {
    		    window.document.location="?page=floodrisk&code=" + (props.code) ;
    		});
    		$('.' + $('select#friskOpt').val()).show();
        };

        var chart = addChart();
		chart.update = function (props) { 
			chart_map_frisk_pop = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_frisk_pop',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Flood Risk Population',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
						shadow: false,
						dataLabels: {
							enabled: true
						}
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'center',
					verticalAlign: 'bottom'
	            },
	            colors: colorFloodRisk,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: '...',
	                data: [[frisk_cat[0],props.low_risk_population],[frisk_cat[1],props.med_risk_population],[frisk_cat[2],props.high_risk_population]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
			});

			console.log(chart_map_frisk_pop);

	        chart_map_frisk_area = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_frisk_area',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Flood Risk Area',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'center',
					verticalAlign: 'bottom'
	            },
	            colors: colorFloodRisk,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: '...',
	                data: [[frisk_cat[0],props.low_risk_area],[frisk_cat[1],props.med_risk_area],[frisk_cat[2],props.high_risk_area]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
		}

		geojson = L.geoJson(boundary, {
		    style: style,
		    onEachFeature: onEachFeature
		});

		group = L.featureGroup([geojson]).addLayer(geojson);
		this_map = floodRiskMap;

		document.getElementById("mapInfo").appendChild(info.onAdd(floodRiskMap));

		sliderRangeValue = addSlider();

		$('select#friskOpt').change(function(){
			group.clearLayers();
			info.update();
			layer_selected = (this.value);

		    legend.remove();
		    changeValueProp(layer_selected);
		    legend_num_arr = setLegendSeries(val_collection);
		    getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
		    legend.addTo(floodRiskMap);
		    geojson.setStyle(style);

		    if (legend_num_arr.length<2 || (legend_num_arr.length<8 && legend_num_arr[0]!=0)) {
		    	updateSliderRange(0,legend_num_arr[legend_num_arr.length-1]);
		    }else{
		    	updateSliderRange(legend_num_arr[0],legend_num_arr[legend_num_arr.length-1]);
		    }

		    group.setStyle(style);
		    group.addTo(floodRiskMap);

		});

		$('#themes').on('click','button', function (evt) {
			// add active class on selected button
			$(this).siblings().removeClass('active')
			$(this).addClass('active');

		   	val_theme = $(this).data('btn');
		   	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
		   	group.setStyle(style);
		   	legend.addTo(floodRiskMap);
		});

		// use jQuery to listen for checkbox change event
		$('div#layercontrol .switch input[type="checkbox"]').on('change', function() {    
		    var checkbox = $(this);
		    // lyr = checkbox.data().layer;
		    var lyr = checkbox.attr('data-layer');
		    var selected_layer = wmsLayer[lyr];

		    // toggle the layer
		    if ((checkbox).is(':checked')) {
		        floodRiskMap.addLayer(selected_layer);
		        
		    } else {
		        floodRiskMap.removeLayer(selected_layer);
		        // layer.remove();
		    }
		})
	}

	if ($('#leaflet_aforecast_map').length ){
		// Disabling checkbox if no data available
	    var aforecastCheckbox=document.getElementsByName("aforecast_checkbox");
	    for (var i = 0; i < aforecastCheckbox.length; i++) {
	    	var r = aforecastCheckbox[i];
	    	var terpilih = r.value;
	    	if (getMax(boundary.features, [terpilih])==0) {
	    		aforecastCheckbox[i].disabled=true;
	    		$(r).closest("div").addClass("disabled");
	    	}
	    }

	    var aforecastMap = initMap();

	    //Set zoom control with your options
	    // aforecastMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 

	    {
	        "aforecast" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	        		    layers: 'geonode:avalanche_risk_villages',
	        		    format: 'image/png',
	        		    transparent: true
	        })
	    };

	    wmsLayer.aforecast.addTo(aforecastMap);

	    // L.control.layers(wmsLayer).addTo(aforecastMap);
	    // var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(aforecastMap);

        $('.lvl_choice .aforecast_checkbox_pop :checkbox:enabled').prop('checked', true);
        sumValueProp($('.lvl_choice .aforecast_checkbox_pop :checkbox:enabled'));
    	legend_num_arr = setLegendSeries(val_collection);

    	val_theme = 'YlOrRd';
    	var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

		legend = createLegend();
		legend.addTo(aforecastMap);

		var selected = null;

		var info = addInfo();
        info.update = function (props) {
            this._div.innerHTML =
            	(props ?
		        	'<span class="chosen_area">' + props.na_en + '</span>'
                	+ '<div class="row">'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 aforecast_checkbox_pop"><div id="chart_map_aforecast" class="ch-map-size" style="height:280px;"></div></div>'

                	+ '<div style="display: none;" class="col-md-3 col-sm-12 col-xs-12 aforecast_checkbox_pop"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Affected Population</th></tr><tr>'
                	+ '<th>' + aforecast_cat[0]
                	+ '</th><td>' + humanizeFormatter(props.ava_forecast_low_pop)
                	+ '</td></tr><tr><th>' + aforecast_cat[1]
                	+ '</th><td>' + humanizeFormatter(props.ava_forecast_med_pop)
                	+ '</td></tr><tr><th>' + aforecast_cat[2]
                	+ '</th><td>' + humanizeFormatter(props.ava_forecast_high_pop)
                	+ '</td></tr></table></div>'

                	+ '</div>'

                	// + '<table><tr><td>Lvl</td><td>Pop'
                	// + '</td></tr><tr><td>Low</td><td>' + humanizeFormatter(props.ava_forecast_low_pop)
                	// + '</td></tr><tr><td>Moderate</td><td>' + humanizeFormatter(props.ava_forecast_med_pop)
                	// + '</td></tr><tr><td>High</td><td>' + humanizeFormatter(props.ava_forecast_high_pop)
                	// + '</td></tr></table>'
                	+ '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
                : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
    		$('a.linkPopup').on('click', function() {
    		    window.document.location="?page=avalcheforecast&code=" + (props.code) ;
    		});
    		$('.' + $('select#aforecastOpt').val()).show();
        };

		var chart = addChart();
		chart.update = function (props) { 
			chart_map_aforecast = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_aforecast',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Avalanche Forecast',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'center',
					verticalAlign: 'bottom'
	            },
	            colors: colorFloodRisk,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: '...',
	                data: [[aforecast_cat[0],props.ava_forecast_low_pop],[aforecast_cat[1],props.ava_forecast_med_pop],[aforecast_cat[2],props.ava_forecast_high_pop]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
		}

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(aforecastMap);

	    document.getElementById("mapInfo").appendChild(info.onAdd(aforecastMap));

	    $('#aforecastOpt').on('change', function() {
	    	info.update();
	    	var selected_opt = $(this).val();
	    	$("input[name='aforecast_checkbox']").each(function () {
                $(this).prop('checked', false);
            });
	    	$('.aforecast_opt').hide();

    	    $('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
    	    sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));
    	    $('.' + selected_opt).show();

    	    legend.remove();
    		legend_num_arr = setLegendSeries(val_collection);
    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
    		legend.addTo(aforecastMap);
    		geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	geojson.setStyle(style);
	       	legend.addTo(aforecastMap);
	    });

	    $("input[name='aforecast_checkbox']:checkbox").on("change", function() {
	    	var choosen_cat = $("input[name='aforecast_checkbox']:checkbox:checked");
	    	if (choosen_cat.length > 0) {
	    		sumValueProp(choosen_cat);
	    		legend.remove();
	    		legend_num_arr = setLegendSeries(val_collection);
	    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	    		legend.addTo(aforecastMap);
	    		geojson.setStyle(style);
	    	}else{
	    		legend.remove();
	    		sumValueProp(choosen_cat);
	    		geojson.setStyle(style);
	    	}
	    	
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            aforecastMap.addLayer(selected_layer);
	            
	        } else {
	            aforecastMap.removeLayer(selected_layer);
	            // layer.remove();
	        }
	    })
	}

	if ($('#leaflet_avarisk_map').length ){
		// Disabling checkbox if no data available
		var ariskCheckbox=document.getElementsByName("arisk_checkbox");
		for (var i = 0; i < ariskCheckbox.length; i++) {
			var r = ariskCheckbox[i];
			var terpilih = r.value;
			if (getMax(boundary.features, [terpilih])==0) {
				ariskCheckbox[i].disabled=true;
				$(r).closest("div").addClass("disabled");
			}
		}

	    var avaRiskMap = initMap();

	    //Set zoom control with your options
	    // aforecastMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 

	    {
	        "arisk" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	        						    layers: 'geonode:afg_avsa',
	        						    format: 'image/png',
	        						    transparent: true
	        				})
	    };

	    wmsLayer.arisk.addTo(avaRiskMap);

	    // L.control.layers(wmsLayer).addTo(aforecastMap);
	    // var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(aforecastMap);

		$('.lvl_choice .arisk_checkbox_pop :checkbox:enabled').prop('checked', true);
		sumValueProp($('.lvl_choice .arisk_checkbox_pop :checkbox:enabled'));
		legend_num_arr = setLegendSeries(val_collection);

		val_theme = 'YlOrRd';
		var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

		legend = createLegend();
		legend.addTo(avaRiskMap);

		var selected = null;

		var info = addInfo();
        info.update = function (props) {
            this._div.innerHTML = 
            	(props ?
		        	'<span class="chosen_area">' + props.na_en + '</span>'
                	+ '<div class="row">'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 arisk_checkbox_pop"><div id="chart_map_ava_risk_pop" class="ch-map-size" style="height:280px;"></div></div>'
                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 arisk_checkbox_build"><div id="chart_map_ava_risk_build" class="ch-map-size" style="height:280px;"></div></div>'
                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 arisk_checkbox_area"><div id="chart_map_ava_risk_area" class="ch-map-size" style="height:280px;"></div></div>'

                	+ '<div style="display: none;" class="col-md-3 col-sm-12 col-xs-12 arisk_checkbox_pop"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Population</th></tr><tr>'
                	+ '<td>Moderate</td><td>' + humanizeFormatter(props.med_ava_population) + '</td></tr><tr>'
                	+ '<td>High</td><td>' + humanizeFormatter(props.high_ava_population) + '</td></tr></table></div>'

					+ '<div style="display: none;" class="col-md-3 col-sm-12 col-xs-12 arisk_checkbox_build"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Buildings</th></tr><tr>'
					+ '<td>Moderate</td><td>' + humanizeFormatter(props.med_ava_buildings)  + '</td></tr><tr>'
					+ '<td>High</td><td>' + humanizeFormatter(props.high_ava_buildings) + '</td></tr></table></div>'

					+ '<div style="display: none;" class="col-md-3 col-sm-12 col-xs-12 arisk_checkbox_area"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Area (km<sup>2</sup>)</th></tr><tr>'
					+ '<td>Moderate</td><td>' + humanizeFormatter(props.med_ava_area) + '</td></tr><tr>'
					+ '<td>High</td><td>' + humanizeFormatter(props.high_ava_area) + '</td></tr></table></div>'

                	+ '</div>'

                	+ '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
                : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
    		$('a.linkPopup').on('click', function() {
    		    window.document.location="?page=avalancherisk&code=" + (props.code) ;
    		});
    		$('.' + $('select#ariskOpt').val()).show();
        };

    	var chart = addChart();
    	chart.update = function (props) { 
    		chart_map_ava_risk_pop = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_ava_risk_pop',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'Avalanche Risk Population',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
                    }
                },
                legend: {
                    align: 'center',
					verticalAlign: 'bottom'
                },
                colors: colorFloodRisk,
                credits: {
                    enabled: false
                },
                series: [{
                    name: '...',
                    data: [[arisk_cat[0],props.med_ava_population],[arisk_cat[1],props.high_ava_population]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });

            chart_map_ava_risk_build = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_ava_risk_build',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'Avalanche Risk Buildings',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
                    }
                },
                legend: {
                    align: 'center',
					verticalAlign: 'bottom'
                },
                colors: colorFloodRisk,
                credits: {
                    enabled: false
                },
                series: [{
                    name: '...',
                    data: [[arisk_cat[0],props.med_ava_buildings],[arisk_cat[1],props.high_ava_buildings]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });

            chart_map_ava_risk_area = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_ava_risk_area',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'Avalanche Risk Area',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
                    }
                },
                legend: {
                    align: 'center',
					verticalAlign: 'bottom'
                },
                colors: colorFloodRisk,
                credits: {
                    enabled: false
                },
                series: [{
                    name: '...',
                    data: [[arisk_cat[0],props.med_ava_area],[arisk_cat[1],props.high_ava_area]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
    	}

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(avaRiskMap);

	    document.getElementById("mapInfo").appendChild(info.onAdd(avaRiskMap));

	    $('#ariskOpt').on('change', function() {
	    	info.update();
	    	var selected_opt = $(this).val();
	    	$("input[name='arisk_checkbox']").each(function () {
                $(this).prop('checked', false);
            });
	    	$('.arisk_opt').hide();

    	    $('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
    	    sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));
    	    $('.' + selected_opt).show();

    	    legend.remove();
    		legend_num_arr = setLegendSeries(val_collection);
    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
    		legend.addTo(avaRiskMap);
    		geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	geojson.setStyle(style);
	       	// group.setStyle(style);
	       	legend.addTo(avaRiskMap);
	    });

	    $("input[name='arisk_checkbox']:checkbox").on("change", function() {
	    	var choosen_cat = $("input[name='arisk_checkbox']:checkbox:checked");
	    	if (choosen_cat.length > 0) {
	    		sumValueProp(choosen_cat);
	    		legend.remove();
	    		legend_num_arr = setLegendSeries(val_collection);
	    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	    		legend.addTo(avaRiskMap);
	    		geojson.setStyle(style);
	    	}else{
	    		legend.remove();
	    		sumValueProp(choosen_cat);
	    		geojson.setStyle(style);
	    	}
	    	
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            avaRiskMap.addLayer(selected_layer);
	            
	        } else {
	            avaRiskMap.removeLayer(selected_layer);
	            // layer.remove();
	        }
	    })
	}

	if ($('#leaflet_lndslide_map').length ){
		// Disabling checkbox if no data available
	    var landslideCheckbox=document.getElementsByName("landslide_checkbox");
	    for (var i = 0; i < landslideCheckbox.length; i++) {
	    	var r = landslideCheckbox[i];
	    	var terpilih = r.value;
	    	if (getMax(boundary.features, [terpilih])==0) {
	    		landslideCheckbox[i].disabled=true;
	    		$(r).closest("div").addClass("disabled");
	    	}
	    }

	    var lndslideMap = initMap();
	    //Set zoom control with your options
	    // lndslideMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 

	    {
	    	"ku" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	    			    layers: 'geonode:afg_ls_500m_ku_lsi',
	    			    format: 'image/png',
	    			    transparent: true
	    	}),
	    	"s1" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	    			    layers: 'geonode:afg_ls_30m_wb_s1',
	    			    format: 'image/png',
	    			    transparent: true
	    	}),
	    	"s2" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	    			    layers: 'geonode:afg_ls_30m_wb_s2',
	    			    format: 'image/png',
	    			    transparent: true
	    	}),
	    	"s3" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	    			    layers: 'geonode:afg_ls_30m_wb_s3',
	    			    format: 'image/png',
	    			    transparent: true
	    	})
	    	// ,
	     //    "provincial_boundary" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	     //                layers: 'geonode:afg_admbnda_adm1',
	     //                format: 'image/png',
	     //                transparent: true
	     //    })


	    };

	    //Add Layer Control to the map
	    // L.control.layers(wmsLayer).addTo(lndslideMap);
	    // var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(lndslideMap);

		$('.lvl_choice .landslide_checkbox_ku :checkbox:enabled').prop('checked', true);
		sumValueProp($('.lvl_choice .landslide_checkbox_ku :checkbox:enabled'));

    	legend_num_arr = setLegendSeries(val_collection);

    	val_theme = 'YlOrRd';
    	var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

		legend = createLegend();
		legend.addTo(lndslideMap);

		var info = addInfo();
        info.update = function (props) {
            this._div.innerHTML = 
            	(props ?
		        	'<span class="chosen_area">' + props.na_en + '</span>'
		        	+ '<div class="row">'

		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_immap"><div id="chart_map_donut_lsi" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_ku"><div id="chart_map_donut_ku" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_s1"><div id="chart_map_donut_s1" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_s2"><div id="chart_map_donut_s2" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_s3"><div id="chart_map_donut_s3" class="ch-map-size" style="height:280px;"></div></div>'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_immap"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Landslide Indexes (iMMAP 2017)</th></tr><tr>'
                	+ '<th class="landslide_vhigh">' + level_risk[3]
                	+ '</th><td class="landslide_vhigh">' + humanizeFormatter(props.lsi_immap_very_high)
                	+ '</td></tr><tr><th class="landslide_high">' + level_risk[2]
                	+ '</th><td class="landslide_high">' + humanizeFormatter(props.lsi_immap_high)
                	+ '</td></tr><tr><th class="landslide_mod">' + level_risk[1]
                	+ '</th><td class="landslide_mod">' + humanizeFormatter(props.lsi_immap_moderate)
                	+ '</td></tr><tr><th class="landslide_low">' + level_risk[0]
                	+ '</th><td class="landslide_low">' + humanizeFormatter(props.lsi_immap_low)
                	+ '</td></tr></table></div>'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_ku"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Multi-criteria Susceptibility Index</th></tr><tr>'
                	+ '<th class="landslide_vhigh">' + level_risk[3]
                	+ '</th><td class="landslide_vhigh">' + humanizeFormatter(props.lsi_ku_very_high)
                	+ '</td></tr><tr><th class="landslide_high">' + level_risk[2]
                	+ '</th><td class="landslide_high">' + humanizeFormatter(props.lsi_ku_high)
                	+ '</td></tr><tr><th class="landslide_mod">' + level_risk[1]
                	+ '</th><td class="landslide_mod">' + humanizeFormatter(props.lsi_ku_moderate)
                	+ '</td></tr><tr><th class="landslide_low">' + level_risk[0]
                	+ '</th><td class="landslide_low">' + humanizeFormatter(props.lsi_ku_low)
                	+ '</td></tr></table></div>'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_s1"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Landslide Susceptibility (S1)</th></tr><tr>'
                	+ '<th class="landslide_vhigh">' + level_risk[3]
                	+ '</th><td class="landslide_vhigh">' + humanizeFormatter(props.ls_s1_wb_very_high)
                	+ '</td></tr><tr><th class="landslide_high">' + level_risk[2]
                	+ '</th><td class="landslide_high">' + humanizeFormatter(props.ls_s1_wb_high)
                	+ '</td></tr><tr><th class="landslide_mod">' + level_risk[1]
                	+ '</th><td class="landslide_mod">' + humanizeFormatter(props.ls_s1_wb_moderate)
                	+ '</td></tr><tr><th class="landslide_low">' + level_risk[0]
                	+ '</th><td class="landslide_low">' + humanizeFormatter(props.ls_s1_wb_low)
                	+ '</td></tr></table></div>'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_s2"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Landslide Susceptibility (S2)</th></tr><tr>'
                	+ '<th class="landslide_vhigh">' + level_risk[3]
                	+ '</th><td class="landslide_vhigh">' + humanizeFormatter(props.ls_s2_wb_very_high)
                	+ '</td></tr><tr><th class="landslide_high">' + level_risk[2]
                	+ '</th><td class="landslide_high">' + humanizeFormatter(props.ls_s2_wb_high)
                	+ '</td></tr><tr><th class="landslide_mod">' + level_risk[1]
                	+ '</th><td class="landslide_mod">' + humanizeFormatter(props.ls_s2_wb_moderate)
                	+ '</td></tr><tr><th class="landslide_low">' + level_risk[0]
                	+ '</th><td class="landslide_low">' + humanizeFormatter(props.ls_s2_wb_low)
                	+ '</td></tr></table></div>'

                	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 landslide_checkbox_s3"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th><th>Landslide Susceptibility (S3)</th></tr><tr>'
                	+ '<th class="landslide_vhigh">' + level_risk[3]
                	+ '</th><td class="landslide_vhigh">' + humanizeFormatter(props.ls_s3_wb_very_high)
                	+ '</td></tr><tr><th class="landslide_high">' + level_risk[2]
                	+ '</th><td class="landslide_high">' + humanizeFormatter(props.ls_s3_wb_high)
                	+ '</td></tr><tr><th class="landslide_mod">' + level_risk[1]
                	+ '</th><td class="landslide_mod">' + humanizeFormatter(props.ls_s3_wb_moderate)
                	+ '</td></tr><tr><th class="landslide_low">' + level_risk[0]
                	+ '</th><td class="landslide_low">' + humanizeFormatter(props.ls_s3_wb_low)
                	+ '</td></tr></table></div>'

                	+ '<div>'

                	// + '<table class="table table-bordered table-condensed"><thead><tr><th></th><th class="landslide_vhigh">Very High</th><th class="landslide_high">High</th><th class="landslide_mod">Moderate</th><th class="landslide_low">Low</th></tr></thead><tbody>'
                	// + '<tr><td>Landslide Indexes (iMMAP 2017)</td>'
                	// + '<td class="landslide_vhigh">' + humanizeFormatter(props.lsi_immap_very_high) + '</td>'
                	// + '<td class="landslide_high">' + humanizeFormatter(props.lsi_immap_high) + '</td>'
                	// + '<td class="landslide_mod">' + humanizeFormatter(props.lsi_immap_moderate) + '</td>'
                	// + '<td class="landslide_low">' + humanizeFormatter(props.lsi_immap_low) + '</td>'
                	// + '</tr><tr><td>Multi-criteria Susceptibility Index</td>'
                	// + '<td class="landslide_vhigh">' + humanizeFormatter(props.lsi_ku_very_high) + '</td>'
                	// + '<td class="landslide_high">' + humanizeFormatter(props.lsi_ku_high) + '</td>'
                	// + '<td class="landslide_mod">' + humanizeFormatter(props.lsi_ku_moderate) + '</td>'
                	// + '<td class="landslide_low">' + humanizeFormatter(props.lsi_ku_low) + '</td>'
                	// + '</tr><tr><td>Landslide Susceptibility (S1)</td>'
                	// + '<td class="landslide_vhigh">' + humanizeFormatter(props.ls_s1_wb_very_high) + '</td>'
                	// + '<td class="landslide_high">' + humanizeFormatter(props.ls_s1_wb_high) + '</td>'
                	// + '<td class="landslide_mod">' + humanizeFormatter(props.ls_s1_wb_moderate) + '</td>'
                	// + '<td class="landslide_low">' + humanizeFormatter(props.ls_s1_wb_low) + '</td>'
                	// + '</tr><tr><td>Landslide Susceptibility (S2)</td>'
                	// + '<td class="landslide_vhigh">' + humanizeFormatter(props.ls_s2_wb_very_high) + '</td>'
                	// + '<td class="landslide_high">' + humanizeFormatter(props.ls_s2_wb_high) + '</td>'
                	// + '<td class="landslide_mod">' + humanizeFormatter(props.ls_s2_wb_moderate) + '</td>'
                	// + '<td class="landslide_low">' + humanizeFormatter(props.ls_s2_wb_low) + '</td>'
                	// + '</tr><tr><td>Landslide Susceptibility (S3)</td>'
                	// + '<td class="landslide_vhigh">' + humanizeFormatter(props.ls_s3_wb_very_high) + '</td>'
                	// + '<td class="landslide_high">' + humanizeFormatter(props.ls_s3_wb_high) + '</td>'
                	// + '<td class="landslide_mod">' + humanizeFormatter(props.ls_s3_wb_moderate) + '</td>'
                	// + '<td class="landslide_low">' + humanizeFormatter(props.ls_s3_wb_low) + '</td>'
                	// + '</tr></tbody></table>'
                	+ '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
                : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
    		$('a.linkPopup').on('click', function() {
    		    window.document.location="?page=landslide&code=" + (props.code) ;
    		});
    		$('.' + $('select#landslideOpt').val()).show();
        };

		var chart = addChart();
		chart.update = function (props) { 
			chart_map_donut_lsi = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_lsi',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Landslide Indexes (iMMAP 2017)',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorLandslide,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Landslide',
	                data: [[level_risk_pie[0],props.lsi_immap_low],[level_risk_pie[1],props.lsi_immap_moderate],[level_risk_pie[2],props.lsi_immap_high],[level_risk_pie[3],props.lsi_immap_very_high]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_donut_ku = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_ku',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Multi-criteria Susceptibility Index',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            yAxis: {
	                title: {
	                    text: 'Total percent market share'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorLandslide,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Landslide',
	                data: [[level_risk_pie[0],props.lsi_ku_low],[level_risk_pie[1],props.lsi_ku_moderate],[level_risk_pie[2],props.lsi_ku_high],[level_risk_pie[3],props.lsi_ku_very_high]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_donut_s1 = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_s1',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Landslide Susceptibility (S1)',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorLandslide,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Landslide',
	                data: [[level_risk_pie[0],props.ls_s1_wb_low],[level_risk_pie[1],props.ls_s1_wb_moderate],[level_risk_pie[2],props.ls_s1_wb_high],[level_risk_pie[3],props.ls_s1_wb_very_high]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_donut_s2 = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_s2',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Landslide Susceptibility (S2)',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorLandslide,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Landslide',
	                data: [[level_risk_pie[0],props.ls_s2_wb_low],[level_risk_pie[1],props.ls_s2_wb_moderate],[level_risk_pie[2],props.ls_s2_wb_high],[level_risk_pie[3],props.ls_s2_wb_very_high]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_donut_s3 = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_s3',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Landslide Susceptibility (S3)',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorLandslide,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Landslide',
	                data: [[level_risk_pie[0],props.ls_s3_wb_low],[level_risk_pie[1],props.ls_s3_wb_moderate],[level_risk_pie[2],props.ls_s3_wb_high],[level_risk_pie[3],props.ls_s3_wb_very_high]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
		}

        var selected = null;

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(lndslideMap);

	    document.getElementById("mapInfo").appendChild(info.onAdd(lndslideMap));

	    $('#landslideOpt').on('change', function() {
	    	info.update();
	    	var selected_opt = $(this).val();
	    	$("input[name='landslide_checkbox']").each(function () {
                $(this).prop('checked', false);
            });
	    	$('.landslide_opt').hide();

	    	// Checked every checkbox which not disabled and change the value
   			$('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
   			sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));

    	    $('.' + selected_opt).show();

    	    legend.remove();
    		legend_num_arr = setLegendSeries(val_collection);
    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
    		legend.addTo(lndslideMap);
    		geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	geojson.setStyle(style);
	       	// group.setStyle(style);
	       	legend.addTo(lndslideMap);
	    });

	    $("input[name='landslide_checkbox']:checkbox").on("change", function() {
	    	var choosen_cat = $("input[name='landslide_checkbox']:checkbox:checked");
	    	if (choosen_cat.length > 0) {
	    		sumValueProp(choosen_cat);
	    		legend.remove();
	    		legend_num_arr = setLegendSeries(val_collection);
	    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	    		legend.addTo(lndslideMap);
	    		geojson.setStyle(style);
	    	}else{
	    		legend.remove();
	    		sumValueProp(choosen_cat);
	    		geojson.setStyle(style);
	    	}
	    	
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            lndslideMap.addLayer(selected_layer);
	            
	        } else {
	            lndslideMap.removeLayer(selected_layer);
	            // layer.remove();
	        }
	    })
	}

	if ($('#leaflet_drought_map').length ){
	    // Disabling checkbox if no data available
	    var droughtCheckbox=document.getElementsByName("drought_checkbox");
	    for (var i = 0; i < droughtCheckbox.length; i++) {
	        var r = droughtCheckbox[i];
	        var terpilih = r.value;
	        if (getMax(boundary.features, [terpilih])==0) {
	            droughtCheckbox[i].disabled=true;
	            $(r).closest("div").addClass("disabled");
	        }
	    }

	    var droughtMap = initMap();
	    //Set zoom control with your options
	    // droughtMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 

	    {
	        "landcover" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:afg_lndcrva',
	                    format: 'image/png',
	                    styles: 'afg_lndcrva_main',
	                    transparent: true
	        }),
	        "drought" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:current_drought',
	                    format: 'image/png',
	                    viewparams: 'woy:' + woy,
	                    transparent: true
	        })
	    };

	    //Add Layer Control to the map
	    // L.control.layers(wmsLayer).addTo(droughtMap);
	    // var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(droughtMap);

	    $('.lvl_choice .drought_checkbox_pop :checkbox:enabled').prop('checked', true);
	    sumValueProp($('.lvl_choice .drought_checkbox_pop :checkbox:enabled'));

	    legend_num_arr = setLegendSeries(val_collection);

	    val_theme = 'YlOrRd';
	    var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

	    legend = createLegend();
	    legend.addTo(droughtMap);

	    var info = addInfo();
	    info.update = function (props) {
	        this._div.innerHTML = 
	            (props ?
	                '<span class="chosen_area">' + props.na_en + '</span>'
	                + '<div class="row">'

	                + '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 drought_checkbox_pop"><div id="chart_map_donut_drought_pop" class="ch-map-size" style="height:280px;"></div></div>'
	                + '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 drought_checkbox_build"><div id="chart_map_donut_drought_build" class="ch-map-size" style="height:280px;"></div></div>'
	                + '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 drought_checkbox_area"><div id="chart_map_donut_drought_area" class="ch-map-size" style="height:280px;"></div></div>'

	                + '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 drought_checkbox_pop">'
	                + '<table class="table table-bordered table-condensed"><tr><th>Risk Level</th>'
	                // + '<th>' + landcover_cat[0] + '</th><th>' 
	                // + landcover_cat[1] + '</th><th>' 
	                // + landcover_cat[2] + '</th><th>' 
	                // + landcover_cat[3] + '</th><th>' 
	                // + landcover_cat[4] + '</th><th>' 
	                // + landcover_cat[5] + '</th><th>' 
	                // + landcover_cat[6] + '</th></tr><tr>'
	                // + '<td class="drought_ab_dry">' + level_risk_pie[0] 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.drought_pop_ab_dry) 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_ab_dry">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td></tr><tr><td class="drought_mod">' + level_risk_pie[1] 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.drought_pop_moderate) 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_mod">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td></tr><tr><td class="drought_svre">' + level_risk_pie[2] 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.drought_pop_severe) 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_svre">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td></tr><tr><td class="drought_extrme">' + level_risk_pie[3] 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.drought_pop_extreme) 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_extrme">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td></tr><tr><td class="drought_excptnal">' + level_risk_pie[4] 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.drought_pop_exceptional) 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td><td class="drought_excptnal">' + humanizeFormatter(props.lsi_immap_high) 
	                // + '</td></tr></table></div>'
	                
	                + '<th>Population at Risk</th></tr><tr>'
	                + '<th class="drought_ab_dry">' + level_risk_pie[0]
	                + '</th><td class="drought_ab_dry">' + humanizeFormatter(props.drought_pop_ab_dry)
	                + '</td></tr><tr><th class="drought_mod">' + level_risk_pie[1]
	                + '</th><td class="drought_mod">' + humanizeFormatter(props.drought_pop_moderate)
	                + '</td></tr><tr><th class="drought_svre">' + level_risk_pie[2]
	                + '</th><td class="drought_svre">' + humanizeFormatter(props.drought_pop_severe)
	                + '</td></tr><tr><th class="drought_extrme">' + level_risk_pie[3]
	                + '</th><td class="drought_extrme">' + humanizeFormatter(props.drought_pop_extreme)
	                + '</td></tr><tr><th class="drought_excptnal">' + level_risk_pie[4]
	                + '</th><td class="drought_excptnal">' + humanizeFormatter(props.drought_pop_exceptional)
	                + '</td></tr></table></div>'

	                + '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 drought_checkbox_build"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th>'
	                + '<th>Building at Risk</th></tr><tr>'
	                + '<th class="drought_ab_dry">' + level_risk_pie[0]
	                + '</th><td class="drought_ab_dry">' + humanizeFormatter(props.drought_build_ab_dry)
	                + '</td></tr><tr><th class="drought_mod">' + level_risk_pie[1]
	                + '</th><td class="drought_mod">' + humanizeFormatter(props.drought_build_moderate)
	                + '</td></tr><tr><th class="drought_svre">' + level_risk_pie[2]
	                + '</th><td class="drought_svre">' + humanizeFormatter(props.drought_build_severe)
	                + '</td></tr><tr><th class="drought_extrme">' + level_risk_pie[3]
	                + '</th><td class="drought_extrme">' + humanizeFormatter(props.drought_build_extreme)
	                + '</td></tr><tr><th class="drought_excptnal">' + level_risk_pie[4]
	                + '</th><td class="drought_excptnal">' + humanizeFormatter(props.drought_build_exceptional)
	                + '</td></tr></table></div>'

	                + '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 drought_checkbox_area"><table class="table table-bordered table-condensed"><tr><th>Risk Level</th>'
	                + '<th>Area at Risk</th></tr><tr>'
	                + '<th class="drought_ab_dry">' + level_risk_pie[0]
	                + '</th><td class="drought_ab_dry">' + humanizeFormatter(props.drought_area_ab_dry)
	                + '</td></tr><tr><th class="drought_mod">' + level_risk_pie[1]
	                + '</th><td class="drought_mod">' + humanizeFormatter(props.drought_area_moderate)
	                + '</td></tr><tr><th class="drought_svre">' + level_risk_pie[2]
	                + '</th><td class="drought_svre">' + humanizeFormatter(props.drought_area_severe)
	                + '</td></tr><tr><th class="drought_extrme">' + level_risk_pie[3]
	                + '</th><td class="drought_extrme">' + humanizeFormatter(props.drought_area_extreme)
	                + '</td></tr><tr><th class="drought_excptnal">' + level_risk_pie[4]
	                + '</th><td class="drought_excptnal">' + humanizeFormatter(props.drought_area_exceptional)
	                + '</td></tr></table></div>'

	                + '<div>'

	                + '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
	            : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
	        $('a.linkPopup').on('click', function() {
	            jump_url(props.code);
	        });
	        $('.' + $('select#droughtOpt').val()).show();
	    };

	    var chart = addChart();
	    chart.update = function (props) { 
	        chart_map_donut_drought_pop = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_drought_pop',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Population at Drought',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorDrought,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'drought',
	                data: [[level_risk_pie[0],props.drought_pop_ab_dry],[level_risk_pie[1],props.drought_pop_moderate],[level_risk_pie[2],props.drought_pop_severe],[level_risk_pie[3],props.drought_pop_extreme],[level_risk_pie[4],props.drought_pop_exceptional]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_donut_drought_build = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_drought_build',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Building at Drought',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            yAxis: {
	                title: {
	                    text: 'Total percent market share'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorDrought,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'drought',
	                data: [[level_risk_pie[0],props.drought_build_ab_dry],[level_risk_pie[1],props.drought_build_moderate],[level_risk_pie[2],props.drought_build_severe],[level_risk_pie[3],props.drought_build_extreme],[level_risk_pie[4],props.drought_build_exceptional]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	        chart_map_donut_drought_area = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_donut_drought_area',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Area at Drought',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorDrought,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'drought',
	                data: [[level_risk_pie[0],props.drought_area_ab_dry],[level_risk_pie[1],props.drought_area_moderate],[level_risk_pie[2],props.drought_area_severe],[level_risk_pie[3],props.drought_area_extreme],[level_risk_pie[4],props.drought_area_exceptional]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
	    }

	    var selected = null;

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(droughtMap);

	    document.getElementById("mapInfo").appendChild(info.onAdd(droughtMap));

	    $('#droughtOpt').on('change', function() {
	        info.update();
	        var selected_opt = $(this).val();
	        $("input[name='drought_checkbox']").each(function () {
	            $(this).prop('checked', false);
	        });
	        $('.drought_opt').hide();

	        // Checked every checkbox which not disabled and change the value
	        $('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
	        sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));

	        $('.' + selected_opt).show();

	        legend.remove();
	        legend_num_arr = setLegendSeries(val_collection);
	        getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	        legend.addTo(droughtMap);
	        geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	        // add active class on selected button
	        $(this).siblings().removeClass('active')
	        $(this).addClass('active');

	        val_theme = $(this).data('btn');
	        getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	        geojson.setStyle(style);
	        // group.setStyle(style);
	        legend.addTo(droughtMap);
	    });

	    $("input[name='drought_checkbox']:checkbox").on("change", function() {
	        var choosen_cat = $("input[name='drought_checkbox']:checkbox:checked");
	        if (choosen_cat.length > 0) {
	            sumValueProp(choosen_cat);
	            legend.remove();
	            legend_num_arr = setLegendSeries(val_collection);
	            getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	            legend.addTo(droughtMap);
	            geojson.setStyle(style);
	        }else{
	            legend.remove();
	            sumValueProp(choosen_cat);
	            geojson.setStyle(style);
	        }
	        
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            droughtMap.addLayer(selected_layer);
	            
	        } else {
	            droughtMap.removeLayer(selected_layer);
	            // layer.remove();
	        }
	    })
	}

	if ($('#leaflet_erthqk_map').length ){
		// Disabling checkbox if no data available
		var erthqkCheckbox=document.getElementsByName("erthqk_checkbox");
		for (var i = 0; i < erthqkCheckbox.length; i++) {
			var r = erthqkCheckbox[i];
			var terpilih = r.value;
			if (getMax(boundary.features, [terpilih])==0) {
				erthqkCheckbox[i].disabled=true;
				$(r).closest("div").addClass("disabled");
			}
		}

		// Setting additional data for earthquake map
		var erthqk_event = "event_code='" + erthqk_code +"'";
		// console.log(erthqk_event);

		var erthqkMap = initMap();

	    //Set zoom control with your choosen position
	    // erthqkMap.zoomControl.setPosition('bottomright');

	    var wmsLayer = 
	    {
	        
	        "erthqk" : L.tileLayer.wms('http://asdc.immap.org/geoserver/wms?', {
	                    layers: 'geonode:earthquake_shakemap',
	                    cql_filter: erthqk_event,
	                    format: 'image/png',
	                    transparent: true
	        })


	    };

	    wmsLayer.erthqk.addTo(erthqkMap);

	    // L.control.layers(wmsLayer).addTo(erthqkMap);
	    // var controlLayer = L.control.layers({}, wmsLayer, {position: 'topleft', collapsed: false}).addTo(erthqkMap);

	    $('.lvl_choice .erthqk_checkbox_pop :checkbox:enabled').prop('checked', true);
	    sumValueProp($('.lvl_choice .erthqk_checkbox_pop :checkbox:enabled'));

		legend_num_arr = setLegendSeries(val_collection);

		val_theme = 'YlOrRd';
		var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

	    legend = createLegend();
	    legend.addTo(erthqkMap);

	    var info = addInfo();
        info.update = function (props) {
            this._div.innerHTML =  
            	(props ?
		        	'<span class="chosen_area">' + props.na_en + '</span>'
		        	+ '<div class="row">'

		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 erthqk_checkbox_pop"><div id="chart_map_mercall_pop" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 erthqk_checkbox_settl"><div id="chart_map_mercall_settl" class="ch-map-size" style="height:280px;"></div></div>'
		        	+ '<div style="display:none;" class="col-md-4 col-sm-12 col-xs-12 erthqk_checkbox_build"><div id="chart_map_mercall_build" class="ch-map-size" style="height:280px;"></div></div>'

                	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 erthqk_checkbox_pop"><table class="table table-bordered table-condensed"><thead><tr><th>Risk Level</th><th title="Population"><i class="icon-people_affected_population fa-3x"></i></th></tr></thead><tbody>'
                	+ '<tr><td class="weak">Weak</td><td class="weak">' + humanizeFormatter(props.pop_shake_weak)
                	+ '</td></tr><tr><td class="light">Light</td><td class="light">' + humanizeFormatter(props.pop_shake_light)
                	+ '</td></tr><tr><td class="modrt">Moderate</td><td class="modrt">' + humanizeFormatter(props.pop_shake_moderate)
                	+ '</td></tr><tr><td class="strong">Strong</td><td class="strong">' + humanizeFormatter(props.pop_shake_strong)
                	+ '</td></tr><tr><td class="vstrong">Very Strong</td><td class="vstrong">' + humanizeFormatter(props.pop_shake_verystrong)
                	+ '</td></tr><tr><td class="severe">Severe</td><td class="severe">' + humanizeFormatter(props.pop_shake_severe)
                	+ '</td></tr><tr><td class="violent">Violent</td><td class="violent">' + humanizeFormatter(props.pop_shake_violent)
                	+ '</td></tr><tr><td class="extrme">Extreme</td><td class="extrme">' + humanizeFormatter(props.pop_shake_extreme)
                	+ '</td></tr></tbody></table></div>'

                	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 erthqk_checkbox_settl"><table class="table table-bordered table-condensed"><thead><tr><th>Risk Level</th><th title="Settlements"><i class="icon-socioeconomic_urban"></i></th></tr></thead><tbody>'
                	+ '<tr><td class="weak">Weak</td><td class="weak">' + humanizeFormatter(props.settlement_shake_weak)
                	+ '</td></tr><tr><td class="light">Light</td><td class="light">' + humanizeFormatter(props.settlement_shake_light)
                	+ '</td></tr><tr><td class="modrt">Moderate</td><td class="modrt">' + humanizeFormatter(props.settlement_shake_moderate)
                	+ '</td></tr><tr><td class="strong">Strong</td><td class="strong">' + humanizeFormatter(props.settlement_shake_strong)
                	+ '</td></tr><tr><td class="vstrong">Very Strong</td><td class="vstrong">' + humanizeFormatter(props.settlement_shake_verystrong)
                	+ '</td></tr><tr><td class="severe">Severe</td><td class="severe">' + humanizeFormatter(props.settlement_shake_severe)
                	+ '</td></tr><tr><td class="violent">Violent</td><td class="violent">' + humanizeFormatter(props.settlement_shake_violent)
                	+ '</td></tr><tr><td class="extrme">Extreme</td><td class="extrme">' + humanizeFormatter(props.settlement_shake_extreme)
                	+ '</td></tr></tbody></table></div>'

                	+ '<div style="display:none;" class="col-md-3 col-sm-12 col-xs-12 erthqk_checkbox_build"><table class="table table-bordered table-condensed"><thead><tr><th>Risk Level</th><th title="Buildings"><i class="icon-infrastructure_building fa-3x"></i></th></tr></thead><tbody>'
                	+ '<tr><td class="weak">Weak</td><td class="weak">' + humanizeFormatter(props.buildings_shake_weak)
                	+ '</td></tr><tr><td class="light">Light</td><td class="light">' + humanizeFormatter(props.buildings_shake_light)
                	+ '</td></tr><tr><td class="modrt">Moderate</td><td class="modrt">' + humanizeFormatter(props.buildings_shake_moderate)
                	+ '</td></tr><tr><td class="strong">Strong</td><td class="strong">' + humanizeFormatter(props.buildings_shake_strong)
                	+ '</td></tr><tr><td class="vstrong">Very Strong</td><td class="vstrong">' + humanizeFormatter(props.buildings_shake_verystrong)
                	+ '</td></tr><tr><td class="severe">Severe</td><td class="severe">' + humanizeFormatter(props.buildings_shake_severe)
                	+ '</td></tr><tr><td class="violent">Violent</td><td class="violent">' + humanizeFormatter(props.buildings_shake_violent)
                	+ '</td></tr><tr><td class="extrme">Extreme</td><td class="extrme">' + humanizeFormatter(props.buildings_shake_extreme)
                	+ '</td></tr></tbody></table></div>'

                	+ '</div>'

                	+ '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
                : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
    		$('a.linkPopup').on('click', function() {
    		    window.document.location="?page=earthquake&code=" + (props.code) + erthqk_link ;
    		});
    		$('.' + $('select#erthqkOpt').val()).show();
        };

        var chart = addChart();
		chart.update = function (props) { 
			chart_map_mercall_pop = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_mercall_pop',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Mercalli Population',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorMercalli,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Mercalli',
	                data: [[mercalli_cat[0],props.pop_shake_weak],[mercalli_cat[1],props.pop_shake_light],[mercalli_cat[2],props.pop_shake_moderate],[mercalli_cat[3],props.pop_shake_strong],[mercalli_cat[4],props.pop_shake_verystrong],[mercalli_cat[5],props.pop_shake_severe],[mercalli_cat[6],props.pop_shake_violent],[mercalli_cat[7],props.pop_shake_extreme]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });

    		chart_map_mercall_settl = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart_map_mercall_settl',
                    type: 'pie',
                    style: {
                        fontFamily: '"Arial", Verdana, sans-serif'
                    }
                },
                title: {
                    text: 'Mercalli Settlements',
                    verticalAlign: 'top',
                    style: {
                        font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
                    }
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    verticalAlign: 'bottom'
                    // x: 40,
                    // y: 0
                },
                colors: colorMercalli,
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Mercalli',
                    data: [[mercalli_cat[0],props.settlement_shake_weak],[mercalli_cat[1],props.settlement_shake_light],[mercalli_cat[2],props.settlement_shake_moderate],[mercalli_cat[3],props.settlement_shake_strong],[mercalli_cat[4],props.settlement_shake_verystrong],[mercalli_cat[5],props.settlement_shake_severe],[mercalli_cat[6],props.settlement_shake_violent],[mercalli_cat[7],props.settlement_shake_extreme]],
                    size: '90%',
                    innerSize: '65%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });

            chart_map_mercall_build = new Highcharts.Chart({
	            chart: {
	                renderTo: 'chart_map_mercall_build',
	                type: 'pie',
	                style: {
	                    fontFamily: '"Arial", Verdana, sans-serif'
	                }
	            },
	            title: {
	                text: 'Mercalli Buildings',
	                verticalAlign: 'top',
	                style: {
	                    font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
	                }
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ humanizeFormatter(this.y);
	                }
	            },
	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                verticalAlign: 'bottom'
	                // x: 40,
	                // y: 0
	            },
	            colors: colorMercalli,
	            credits: {
	                enabled: false
	            },
	            series: [{
	                name: 'Mercalli',
	                data: [[mercalli_cat[0],props.buildings_shake_weak],[mercalli_cat[1],props.buildings_shake_light],[mercalli_cat[2],props.buildings_shake_moderate],[mercalli_cat[3],props.buildings_shake_strong],[mercalli_cat[4],props.buildings_shake_verystrong],[mercalli_cat[5],props.buildings_shake_severe],[mercalli_cat[6],props.buildings_shake_violent],[mercalli_cat[7],props.buildings_shake_extreme]],
	                size: '90%',
	                innerSize: '65%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]
	        });
		}

        var selected = null;

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    }).addTo(erthqkMap);

	    document.getElementById("mapInfo").appendChild(info.onAdd(erthqkMap));

	    // Disabling radio button if no data
	    var erthqkRadio=document.getElementsByName("erthqk_radio");
	    for (var i = 0; i < erthqkRadio.length; i++) {
	    	var r = erthqkRadio[i];
	    	var terpilih = r.value;
	    	if (getMax(boundary.features, [terpilih])==0) {
	    		erthqkRadio[i].disabled=true;
	    		$(r).closest("div").addClass("disabled");
	    	}
	    }

	    $('#erthqkOpt').on('change', function() {
	    	info.update();
	    	var selected_opt = $(this).val();
	    	$("input[name='erthqk_checkbox']").each(function () {
                $(this).prop('checked', false);
            });
	    	$('.erthqk_opt').hide();

    	    // Checked every checkbox which not disabled and sum the value
    	    $('.lvl_choice .' + selected_opt + ' :checkbox:enabled').prop('checked', true);
    	    sumValueProp($('.lvl_choice .' + selected_opt + ' :checkbox:enabled'));
    	    $('.' + selected_opt).show();

    	    legend.remove();
    		legend_num_arr = setLegendSeries(val_collection);
    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
    		legend.addTo(erthqkMap);
    		geojson.setStyle(style);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	geojson.setStyle(style);
	       	legend.addTo(erthqkMap);
	    });

	    $('#layercontrol input[type=radio]').change(function(){
	    	layer_selected = (this.value);
	        legend.remove();
	        dataLegend(max_collection[layer_selected]);
	        legend.addTo(erthqkMap);
	        geojson.setStyle(style);

	    });

	    $("input[name='erthqk_checkbox']:checkbox").on("change", function() {
	    	var choosen_cat = $("input[name='erthqk_checkbox']:checkbox:checked");
	    	if (choosen_cat.length > 0) {
	    		sumValueProp(choosen_cat);
	    		legend.remove();
	    		legend_num_arr = setLegendSeries(val_collection);
	    		getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	    		legend.addTo(erthqkMap);
	    		geojson.setStyle(style);
	    	}else{
	    		legend.remove();
	    		sumValueProp(choosen_cat);
	    		geojson.setStyle(style);
	    	}
	    	
	    });

	    // use jQuery to listen for checkbox change event
	    $('div#layercontrol .wms_check input[type="checkbox"]').on('change', function() {    
	        var checkbox = $(this);
	        // lyr = checkbox.data().layer;
	        var lyr = checkbox.attr('data-layer');
	        var selected_layer = wmsLayer[lyr];

	        // toggle the layer
	        if ((checkbox).is(':checked')) {
	            erthqkMap.addLayer(selected_layer);
	            
	        } else {
	            erthqkMap.removeLayer(selected_layer);
	            // layer.remove();
	        }
	    })
	}

	if ($('#leaflet_haccess_map').length ){
	    var haccessMap = initMap();

	    // Data for legend based on selected layer
		var layer_selected = "total_incident";

		changeValueProp(layer_selected);
		legend_num_arr = setLegendSeries(val_collection);

		val_theme = 'YlOrRd';
		var getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");

		legend = createLegend();
		legend.addTo(haccessMap);

	    var info = addInfo();

	    // method that we will use to update the control based on feature properties passed
	    info.update = function (props) {
	        this._div.innerHTML = 
	            (props ?
		        	'<span class="chosen_area">' + props.na_en + '</span>'
		        	+ '<div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="circle_container"><i class="icon-security_attack fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_incident) + '</span><span class="circle_title">' + map_category[0] + '</span></div>'
		        	+ '<div class="circle_container"><i class="icon-security_murder fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_violent) + '</span><span class="circle_title">' + map_category[1] + '</span></div>'
		        	+ '<div class="circle_container"><i class="icon-people_injured fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_injured) + '</span><span class="circle_title">' + map_category[2] + '</span></div>'
		        	+ '<div class="circle_container"><i class="icon-people_dead fa-3x circle_info"></i><span class="circle_data">' + humanizeFormatter(props.total_dead) + '</span><span class="circle_title">' + map_category[3] + '</span></div></div>'

		        	+ '</div>'

	                + '<a class="btn btn-primary linkPopup">Go To ' + (props.na_en) +'</a>'
	            : '<h4>' + chosen_label + '</h4>' + 'Click on an area to show information');
	            $('a.linkPopup').on('click', function() {
	            	jump_url(props.code);
	            });
	    };

	    var chart = null;

	    var selected = null;

	    geojson = L.geoJson(boundary, {
	        style: style,
	        onEachFeature: onEachFeature
	    });

	    group = L.featureGroup([geojson]).addLayer(geojson);
	    this_map = haccessMap;

	    document.getElementById("mapInfo").appendChild(info.onAdd(haccessMap));

	    sliderRangeValue = addSlider();

	    $('select#haccessOpt').change(function(){
	    	group.clearLayers();
	    	info.update();
	    	layer_selected = (this.value);
	        legend.remove();
	        changeValueProp(layer_selected);
	        legend_num_arr = setLegendSeries(val_collection);
	        getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	        legend.addTo(haccessMap);

	        if (legend_num_arr.length<2 || (legend_num_arr.length<8 && legend_num_arr[0]!=0)) {
	        	updateSliderRange(0,legend_num_arr[legend_num_arr.length-1]);
	        }else{
	        	updateSliderRange(legend_num_arr[0],legend_num_arr[legend_num_arr.length-1]);
	        }

	        geojson.setStyle(style);
	        group.setStyle(style);
	        group.addTo(haccessMap);
	    });

	    $('#themes').on('click','button', function (evt) {
	    	// add active class on selected button
	    	$(this).siblings().removeClass('active')
	    	$(this).addClass('active');

	       	val_theme = $(this).data('btn');
	       	getChroma = chroma.scale(val_theme).classes(legend_num_arr).out("hex");
	       	group.setStyle(style);
	       	legend.addTo(haccessMap);
	    });
	}
}

$(document).ready(function(){
	init_select2_region();
	init_datatable();
	init_chart();
	init_leaflet();
});