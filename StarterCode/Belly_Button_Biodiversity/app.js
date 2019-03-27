function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
   // Use `.html("") to clear any existing metadata
  var MetaData = "/metadata/" + sample;
  var sampleData = d3.select("#sample-metadata")
  sampleData.html("");
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  d3.json(MetaData).then(function (data) {
    Object.entries(data).forEach(([key, value]) => {
      sampleData.append("h6").text(`${key}: ${value}`
      );
    })

 
  })
}
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var fetchData= "/samples/" + sample;
  d3.json(fetchData).then(function (data) {

// @TODO: Build a Bubble Chart using the sample data
 var bubble = {
  x_values: data.otu_ids,
  y_values: data.sample_values,
  mode: 'markers',
  text: data.otu_labels,
  marker: {
    color: data.otu_ids,
    size: data.sample_values,

    colorscale: "Rainbow"
  }
};
var bubble = [bubble];
var layout = {
  showlegend: false,
  height: 600,
  width: 1600
};

Plotly.newPlot('bubble', bubble, layout);
//  @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var data = [{
      values_pie: data.sample_values.slice(0, 10),
      labels_pie: data.otu_ids.slice(0, 10),
      hover_pie_text: data.otu_labels.slice(0, 10),
      type: 'pie',
    }];
    var layout = {
      showlegend: true,
    };
    Plotly.newPlot('pie', data, layout);

  }
)}





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
