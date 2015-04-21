project_id = $('.project_id').attr('data-project-id');
formURL = apiUrl+"campaigns/"+project_id+"/channelranking"




  var fontOptions = styleOptions.touchpoints.fontSchema.smaller;
  var colors = styleOptions.colors;

  var highchartsOptions = {
    chart: {
        type: 'column',
        spacingLeft: 0,
        spacingRight: 0,
        style: fontOptions.chart,
        backgroundColor: 'rgba(255,255,255,0)',
        plotBackgroundColor: fontOptions.chart.plotBackgroundColor,
        reflow: false
    },
    exporting: {
        filename: project_id+'_TS',
        sourceWidth: 660,
        sourceHeight: 440,
        scale: 3
    },
    title: {
        text: 'Fundamental Channel Ranking',
        style: fontOptions.title,
    },
    xAxis: {
        tickWidth: 0,
        labels: {
          style: fontOptions.xAxisLabels
        }
    },
    yAxis: {
      min: 0,
      labels: {
          enabled: false
      },
      title: {
          text: null
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      tickWidth: 0,
      minorTickWidth: 0
    },
    plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
            formatter: function(){
              var roundedPercentage = Math.round(this.y * 1000) / 10;
              var label = roundedPercentage === 0 ? '' : roundedPercentage;
              return label;
            },
            inside: false,
            style: fontOptions.dataLabels.style,
            y: fontOptions.dataLabels.y,
        },
        animation: false
      },
      column: {
          stacking: 'normal',
          pointRange: 1,
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0.015,
          shadow: false
      }
    },
    tooltip: {
      valueDecimals: 4
    },
    legend: {
      x: -215,
      itemStyle: fontOptions.legend,
      symbolWidth: 12,
      symbolHeight: 12
    }
  }

  function renderChart(data, appendTarget, yAxisMax) {
    var xAxisAndSeriesData = buildXAxisAndSeriesData(data);

    highchartsOptions.xAxis.categories = xAxisAndSeriesData.xAxis;
    highchartsOptions.series = xAxisAndSeriesData.series;
    highchartsOptions.yAxis.max = (yAxisMax * 1.5);

    // highchartsOptions.xAxis.plotLines = overlayPlotLines(data);

    $(appendTarget).highcharts( highchartsOptions, function(chart){
      //Legend Line
      chart.renderer.path(['M', 5, 407, 'L', 652, 407])
            .attr({
                'stroke-width': 1,
                stroke: '#B3B1B1'
              })
            .add();
    });
  }

  function buildXAxisAndSeriesData(data){
    var decoder = buildPoeTouchpointDecoder(data);

    var xAxisCategories = [];
    var paid = [];
    var owned = [];
    var earned = [];
    var dummyStyleSeries = [];

    var possibleTouchpoints = data.ChannelRanking.Touchpoints;
    for (var i = 0; i < possibleTouchpoints.length; i++) {
      if (possibleTouchpoints[i].Selected) {
        xAxisCategories.push( possibleTouchpoints[i].Name );
        var score = possibleTouchpoints[i].AggObjectiveScore;
        if (decoder[possibleTouchpoints[i].Name] === 'Paid') {
          paid.push(score);
          owned.push(0);
          earned.push(0);
        } else if (decoder[possibleTouchpoints[i].Name] === 'Owned') {
          paid.push(0);
          owned.push(score);
          earned.push(0);
        } else {
          paid.push(score);
          owned.push(0);
          earned.push(0);
        }
        dummyStyleSeries.push(0.5 - score);
      }
    }
    return {
      xAxis: xAxisCategories,
      series: [{
        name: 'DummyStylingSeries',
        data: dummyStyleSeries,
        color: colors.color1,
        dataLabels: {
          enabled: false
        },
        states: {
          hover: {
            enabled: false
          }
        },
        enableMouseTracking: false,
        showInLegend: false
      }, {
        name: 'Paid',
        data: paid,
        color: colors.color2,
        dataLabels: {
          enabled: true
        }
      }, {
        name: 'Owned',
        data: owned,
        color: colors.color4,
        dataLabels: {
          enabled: true
        }
      }, {
        name: 'Earned',
        data: earned,
        color: colors.color5,
        dataLabels: {
          enabled: true
        }
      }]
    };
  }

  function buildPoeTouchpointDecoder(data){
    var poeObject = data.ChannelRanking.Groupings[findPoeIndex(data)];
    
    var poeDecoder = {};
    for (var i = 0; i < poeObject.Categories.length; i++) {
      poeDecoder[i] = poeObject.Categories[i].Name;
    }

    var touchpointDecoder = {};
    for (var i = 0; i < poeObject.TouchpointCategoryMap.length; i++){
      var name = poeObject.TouchpointCategoryMap[i].split(' : ')[0];
      var category = poeObject.TouchpointCategoryMap[i].split(' : ')[1];
      touchpointDecoder[name] = poeDecoder[category];
    }
    
    return touchpointDecoder;
  }

  function findPoeIndex(data){
    var groupings = data.ChannelRanking.Groupings;
    for (var i = 0; i < groupings.length; i++){
      if (groupings[i].Name === 'POE') {
        return i;
      }
    }
  }


  // Note: overlayPlotLines is not used if using the gradient background effect
  function overlayPlotLines(data){
    var possibleTouchpoints = data.ChannelRanking.Touchpoints;
    var numSelectedTouchpoints = 0;
    for (var i = 0; i < possibleTouchpoints.length; i++) {
      if (possibleTouchpoints[i].Selected) {
        numSelectedTouchpoints += 1;
      }
    }
    var plotLines = [];
    for (var i = 0; i < numSelectedTouchpoints; i++) {
      plotLines.push({
        value: i + 0.5,
        color: 'white',
        width: 2,
        zIndex: 5
      })
    }
    return plotLines
  }

  function calculateYAxisMax(data){
    var maxValue = 0;
    var touchpoints = data.ChannelRanking.Touchpoints;
    for (var i = 0; i < touchpoints.length; i++){
      if (touchpoints[i].Selected && touchpoints[i].AggObjectiveScore > maxValue) {
        maxValue = touchpoints[i].AggObjectiveScore;
        console.log(maxValue);
        console.log(touchpoints[i].Name)
      }
    }
    return maxValue;
  }

  $(function () {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }



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
            var yAxisMax = calculateYAxisMax(data);
            renderChart(data, '#chart-container', yAxisMax);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
});