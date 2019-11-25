queue()
    .defer(d3.csv, "data/Hendrix.csv")
    .await(createCharts);
    

    
function createCharts(error, hendrixData) {
   var ndx = crossfilter(hendrixData);

  show_sfps_per_person(ndx);
  
    dc.renderAll();
}


function show_sfps_per_person(ndx){
    var dim = ndx.dimension(dc.pluck('Created By'));
    var group = dim.group().reduceSum(dc.pluck('SFP No.'));
    
    dc.barChart("#sfps_per_person_chart")
    .width(800)
    .height(800)
    .dimension(dim)
    .group(group)
    .margins({top:10, right:50, bottom:30, left:50})
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal())
    .elasticY(true)
    .xAxisLabel("People")
    .yAxis().ticks(6);
    
}
