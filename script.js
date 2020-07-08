data = {
	datasets: [{
		data: [],
		backgroundColor: [

		]
	}],

	// These labels appear in the legend and in the tooltips when hovering different arcs
	labels: [
	],

}

pre_config = [
]


function process_json(j){
	Object.keys(j['Conf']['watchedThreads']['4chan.org']['boards']).forEach(function(key) {
		pre_config.push(
		[
		key,
		Object.keys(j['Conf']['watchedThreads']['4chan.org']['boards'][key]).length,
		'#'+Math.floor(Math.random()*16777215).toString(16)])
	});
	pre_config.sort(function(a, b){return b[1]-a[1]});
	pre_config.forEach(function(entry) {
		data['datasets'][0]['data'].push(entry[1]);
		data['labels'].push(entry[0]);
		data['datasets'][0]['backgroundColor'].push(entry[2]);
	})
	
	load_chart()
	return 'loaded'
}


function gayFunc() {
	var file = document.getElementById("fileForUpload").files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			var obj = JSON.parse(evt.target.result); 
			var results = process_json(obj)
			//document.getElementById("fileContents").innerHTML = results;
		}
		reader.onerror = function (evt) {
			document.getElementById("fileContents").innerHTML = "error reading file";
		}
	}
	return
}


function load_chart(){
	var canvas = document.createElement('canvas');
	canvas.id = 'myChart'
	document.getElementById("Graph").innerHTML='';
	document.getElementById("Graph").append(canvas);
	var ctx = document.getElementById('myChart').getContext('2d');
	var myPieChart = new Chart(ctx, {
		type: 'pie',
		data: data,
	});
}
