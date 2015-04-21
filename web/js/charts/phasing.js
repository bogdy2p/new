
project_id = $('.project_id').attr('data-project-id');
formURL = apiUrl+"campaigns/"+project_id+"/weeklyphasing"

  var colors = masterColors;
  var fontOptions = styleOptions.phasing.fontSchema.smaller;

  var chartWidth = 660;
  var chartHeight = 440;
  var spacingRight = 44;

  var legendLineSpacing = 7;

  var highchartsOptions = {
    chart: {
      alignTicks: false,
      spacingRight: spacingRight,
      backgroundColor: 'rgba(255,255,255,0)'
    },
    title: {
      text: null
    },
    colors: [colors.color2, colors.color4, colors.color6, colors.color1, colors.color3, colors.color5, colors.color7, colors.color8, colors.color9, colors.color10, colors.color11, colors.color12],
    xAxis: {
      lineWidth: 0,
      gridLineWidth: 1,
      tickWidth: 1,
      startOnTick: true,
      tickInterval: 5,
      labels: {
        align: fontOptions.xAxisLabels.align,
        style: {
          fontFamily: fontOptions.xAxisLabels.fontFamily,
          fontSize: fontOptions.xAxisLabels.fontSize,
          color: fontOptions.xAxisLabels.color
        },
        x: fontOptions.xAxisLabels.x
      },
      showLastLabel: true
    },
    yAxis: [
      { // Pressure (Equivalent GRP); axis[0]
        title: {
          text: fontOptions.yAxisLabels1.titleText
        },
        gridLineWidth: 0,
        reversedStacks: false,
        labels: {
          style: {
            fontFamily: fontOptions.yAxisLabels1.fontFamily,
            fontSize: fontOptions.yAxisLabels1.fontSize,
            color: fontOptions.yAxisLabels1.color
          }
        },
      }, 
      { // Reach 1+; axis[1]
        title: {
          text: fontOptions.yAxisLabels2.titleText
        },
        min: 0,
        maxTickInterval: 5,
        opposite: true,
        gridLineWidth: 0,
        labels: {
          style: {
            fontFamily: fontOptions.yAxisLabels2.fontFamily,
            fontSize: fontOptions.yAxisLabels2.fontSize,
            color: fontOptions.yAxisLabels2.color            
          }
        },
    }],
    plotOptions: {
      column: {
        stacking: 'normal'
      },
      line: {
        marker: {
          enabled: false
        },
        dashStyle: 'ShortDot'
      },
      series: {
        borderWidth: 1
      }
    },
    legend: {
      reversed: false,
      itemDistance: fontOptions.legend.itemHorizontalDistance,
      itemMarginBottom: fontOptions.legend.itemMarginBottom,
      symbolWidth: fontOptions.legend.symbolPixels,
      symbolHeight: fontOptions.legend.symbolPixels,
      itemStyle: {
        color: fontOptions.legend.color, 
        fontFamily: fontOptions.legend.fontFamily, 
        fontSize: fontOptions.legend.fontSize, 
        fontWeight: fontOptions.legend.fontWeight
      },
    },
    // tooltip: 'shared'
  };


  function renderChart(data, appendTarget ){
    // FAKING THE START DATE
    data.startDate = new Date(2015, 0, 5).getTime();
    //

    var parsedSeriesData = buildSeriesDataFromJSON(data);
    highchartsOptions.series = parsedSeriesData;
    highchartsOptions.xAxis.categories = buildXAxisDates(data.startDate, data.WeeklyPhasing.Total.AllocationByPeriod.length);
    $(appendTarget).highcharts( highchartsOptions, function(chart){
      addLegendSeparatorLine(chart);
    });
  }

  function buildXAxisDates(startDateTimestamp, numCategories) {
    var xAxisSeries = [];
    var oneWeek = 1000 * 60 * 60 * 24 * 7;
    for (var i = 0; i < numCategories; i++) {
      var timestamp = startDateTimestamp + (oneWeek * i);
      var calculatedDate = new Date(timestamp);
      var formattedDateStrings = calculatedDate.toLocaleString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'}).split('/');
      xAxisSeries.push( [ formattedDateStrings[1], formattedDateStrings[0], formattedDateStrings[2] ].join('/') );
    }
    return xAxisSeries
    // return addDummyColumns(xAxisSeries, 'padding');
  }

  function addDummyColumns(array, dummyDataValue) {
    var arrayCopy = array;
    var totalLength = array.length;
    var columnsToAdd = Math.floor(array.length / 4);
    for (var i = columnsToAdd; i > 0; i--){
      var targetIndex = (i * 4);
      arrayCopy.splice(targetIndex, 0, dummyDataValue);
    }
    return arrayCopy;
  }

  function addDummyReachColumns(array) {
    var arrayCopy = addDummyColumns(array, 'dummy');
    for (var i = 0; i < arrayCopy.length; i++) {
      var currentValue = arrayCopy[i];
      if (currentValue === 'dummy') {
        arrayCopy[i] = ( (arrayCopy[i - 1] + arrayCopy[i + 1]) / 2 );
      }
    }
    return arrayCopy;
  }

  function buildSeriesDataFromJSON(data) {
    var returnData = [];

    // Handle 'Pressure (Equivalent GRP)' column data
    var allocatedTouchpoints = data.WeeklyPhasing.AllocatedTouchpoints;
    for (var i = 0; i < allocatedTouchpoints.length; i++) {
      var dataArray = parseAllocationPeriods(allocatedTouchpoints[i].AllocationByPeriod);
      returnData.push({
        name: allocatedTouchpoints[i].TouchpointName,
        // data: addDummyColumns(dataArray, 0),
        data: dataArray,
        type: 'column'
      });
    }

    // Handle "Reach 1+" line data
    var totalAllocationByPeriodArray = data.WeeklyPhasing.Total.AllocationByPeriod;
    var reachDataPoints = [];
    for (var i = 0; i < totalAllocationByPeriodArray.length; i++) {
      reachDataPoints.push( totalAllocationByPeriodArray[i].Result.Reach * 100 );
    }
      // data: addDummyReachColumns(reachDataPoints),
    returnData.push({
      name: 'Reach 1+',
      data: reachDataPoints,
      type: 'line',
      color: colors.gray1,
      yAxis: 1
    })

    return returnData;
  }

  function parseAllocationPeriods(allocationByPeriodArray) {
    var returnArray = [];
    for (var i = 0; i < allocationByPeriodArray.length; i++) {
      returnArray.push(allocationByPeriodArray[i].GRP)
    }
    return returnArray;
  }

  function addLegendSeparatorLine(chart){
    var series = $('.highcharts-series')[0];
    var seriesX = getElementCoordinates(series)[0];
    var legend = $('.highcharts-legend')[0];
    var legendY = getElementCoordinates(legend)[1];

    var pathData = ['M', seriesX, (legendY - legendLineSpacing), 'L', (chartWidth - spacingRight), (legendY - legendLineSpacing)]
    chart.renderer.path( pathData )
      .attr({
          strokeWidth: fontOptions.legendSeparatorLine.strokeWidth,
          stroke: fontOptions.legendSeparatorLine.stroke
      }).add();
  }

  function getElementCoordinates(element){
    var transformText = element.attributes.transform.value;
    var regex = /translate(\(.+\))/;
    var matchData = transformText.match(regex)[1].replace('(', '').replace(')', '').split(',');
    var xCoordinates = parseInt(matchData[0]);
    var yCoordinates = parseInt(matchData[1]);
    return [xCoordinates, yCoordinates];
  }

  $(function(){
  
     api = getCookie("api");

    $.ajax({
        dataType: "json",
        url : formURL,
        type: "GET",
        headers: { 
            'x-wsse': 'ApiKey="'+api+'"'
        },
        success:function(data, textStatus, jqXHR) {
            console.dir(data);
            renderChart(data, '#chart-container');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

  });