const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);
function drop_down_menu(){ 
  d3.json(url).then(function(data) {
    console.log(data);
    let sample_names = data.names;

    let selector = d3.select("#selDataset");
            
    sample_names.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    meta_table(sample_names[0]);
    sample_chart(sample_names[0])
  });
  
}

drop_down_menu()

function optionChanged(x){
  meta_table(x)
  sample_chart(x)

}

function meta_table(x){
  d3.json(url).then(function(data) {
    console.log(data);
    let sample_metadata = data.metadata;
    let newArray = sample_metadata.filter(number => number.id == x)[0];

    let selector = d3.select("#sample-metadata");
    selector.html("");
    Object.entries(newArray).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
      selector
      .append("h6")
      .text(`${key}: ${value}`)
    });
            

  });
}

function sample_chart(x){
  d3.json(url).then(function(data) {
    console.log(data);
    let samples_data = data.samples;
    let newArray = samples_data.filter(number => number.id == x)[0];

    otu_ids = newArray.otu_ids
    sample_values = newArray.sample_values
    otu_labels = newArray.otu_labels
    
    var bubble_data = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }];
    
    
    var bubble_layout = {
      title: {
        text: 'Bubble Chart',
      showlegend: false
      }, xaxis: {
        title: {
          text: 'OTU ID',
          }
      },
    };
    
    Plotly.newPlot('bubble', bubble_data, bubble_layout);
    
    var bar_data = [{
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).reverse().map(otu_x => `otu ${otu_x}`),
      text: otu_labels.slice(0, 10).reverse(),
      orientation: 'h',
      type: 'bar'
    }];
    
    var bar_layout = {
      title: 'Bar Chart',
    };
    
    Plotly.newPlot('bar', bar_data, bar_layout);
    
  });
}