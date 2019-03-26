function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata

  // var MetaData = `/metadata/${sample}`;
  //  d3.json(MetaData).then((sample){
  //  var sampleData = d3.select("#sample-metadata");
  //  sampleData.html("");

   // Use `Object.entries` to add each key and value pair to the panel
   // Hint: Inside the loop, you will need to use d3 to append new
   // tags for each key-value in the metadata.
  //  Object.entries(sample).forEach(function([key, value]) => {
  //  sampleData.append("h3").text(`${key}:${value}`);
  //  });

  //  })

    
    var MetaData = `/metadata/${sample}`;
    d3.json(MetaData).then((data)=>{
    var sampleData = d3.select("#sample-metadata");
    sampleData.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata. 
    Object.entries(data).forEach(([key, value])=>{
    sampleData.append("h3").text(`${key}:${value}`);
    });

    });
  
  }


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
var fetchData = `/samples/ ${sample}`;
d3.json(fetchData).then(function(sample){
// @TODO: Build a Bubble Chart using the sample data
var xvalues = sample.otu_ids;
var yvalues = sample.otu_labels;
var gvalues = sample.sample_values;


var bublechart = {
  x: xvalues,
  y: yvalues,
  mode: 'markers',
  marker: {
    size: gvalues,
    color: 'blue'
  }
}
});
}


var data = [bublechart];

var layout = {
  title: 'Marker Size',
  showlegend: false,
  height: 600,
  width: 1200
};

Plotly.newPlot('bubble', data, layout);


  // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
d3.json(fetchData).then(function(sample){

var hover_mouse_piechart = data.otu_labels.slice(0,10);
var label_piechart = data.otu_ids.slice(0,10);
var values_piechart = data.sample_values.slice(0,10);

  
var piechart = [{
  values: values_piechart,
  labels: label_piechart,
  type: 'pie'}];
var data = [piechart]
var layout = {
  height: 400,
  width: 500

};

});
Plotly.newPlot('pie', data, layout);

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
