
project_id = $('.project_id').attr('data-project-id');
var formURL = apiUrl+"campaigns/"+project_id+"/videoneutral"


 var colors = masterColors;

    var touchPointColors = {};

    var highchartsOptionsRight = {
        chart: {
            type: 'column',
            spacingTop: 15,
            spacingBottom: 30,
            spacingLeft: 20,
            alignTicks: false,
            backgroundColor: 'rgba(255,255,255,0)',
            style: {
              fontFamily: 'Helvetica, Arial, sans-serif'
            }
        },
        exporting: {
            filename: project_id+'_BAM'
        },
        colors: ['#43BBEF', '#04DE99', '#D7DE23', '#FF65C7', '#7983F0'],
        title: {
            text: 'Recommended',
            style: {'fontFamily': 'Helvetica, Arial, sans-serif', 'fontSize': '20px'},
            align: 'left'
        },
        subtitle: {
          style: {
            fontSize: '25px',
            color: colors.gray5
          },
          y: 100
        },
        xAxis: {
            labels: {
              enabled: true,
              style: {
                fontSize: '20px'
              },
              formatter: function(){
                return this.value + '%';
              }
            },
            title: {
              text: null
            },
            lineWidth: 1,
            lineColor: colors.gray,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickWidth: 0,
            minorTickWidth: 0
        },
        yAxis: [{ //primary (percentage) axis
          id: 'Budget',
          labels: {
              enabled: false 
          },
          title: {
              text: null
          },
          lineWidth: 0,
          max: 250,
          min: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          tickWidth: 0,
          minorTickWidth: 0
        }, { //secondary axis (metric)
          id: 'Metric',
          opposite: true,
          labels: {
              enabled: false
          },
          title: {
              text: null
          },
          max: 50,
          min: 0,
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          tickWidth: 0,
          minorTickWidth: 0,
          showEmpty: false
        }],
        plotOptions: {
          column: {
            stacking: 'percentage',
            pointWidth: 82
          },
          series: {
            borderColor: '#FFFFFF',
            borderWidth: 1,
            padding: 1,
            dataLabels: {
              enabled: true,
              formatter: function(){
                return this.y + "%";
              },
              inside: true,
              align: 'left',
              style: {'fontFamily': 'Helvetica, Arial, sans-serif', 'fontSize': '1.5em', 'color': '#B3B1B1'},
              x: 100
            }
          }
        },
        legend: {
          enabled: false,
          floating: true,
          align: 'right',
          verticalAlign: 'bottom',
          layout: 'vertical',
          y: -100
        }
    }; // end of highcharts options object for righthand chart
  

  var highchartsOptionsLeft = {
      chart: {
            type: 'column',
            spacingTop: 15,
            spacingBottom: 30,
            spacingRight: 0,
            alignTicks: false,
            backgroundColor: 'rgba(255,255,255,0)',
            style: {
              fontFamily: 'Helvetica, Arial, sans-serif'
            }
        },
        colors: ['#43BBEF', '#04DE99', '#D7DE23', '#FF65C7', '#7983F0'],
        title: {
            text: 'Budget Allocation',
            align: 'left',
            x: 28,
            style: {'fontFamily': 'Helvetica, Arial, sans-serif', 'fontSize': '20px'}
        },
        xAxis: {
            labels: {
              enabled: true,
              style: {
                fontSize: '20px'
              },
              formatter: function(){
                return this.value + '%';
              }
            },
            title: {
              text: null
            },
            lineWidth: 1,
            lineColor: colors.gray,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickWidth: 0,
            minorTickWidth: 0
        },
        yAxis: [{ //primary (percentage) axis
          id: 'Budget',
          labels: {
              enabled: false
          },
          title: {
              text: null
          },
          max: 250,
          min: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          tickWidth: 0,
          minorTickWidth: 0
        }, { //secondary axis (metric)
          id: 'Metric',
          opposite: true,
          labels: {
              enabled: true,
              y: 20,
              x: 2,
              style: {
                color: colors.gray5,
                fontSize: '20px'

              }
          },
          title: {
              text: null
          },
          max: 50,
          min: 0,
          offset: 20,
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          tickWidth: 2,
          tickLength: 22,
          minorTickWidth: 0,
          showEmpty: false
        }],
        plotOptions: {
          column: {
            stacking: 'percentage'
          },
          series: {
            borderColor: '#FFFFFF',
            borderWidth: 1,
            padding: 1,
            dataLabels: {
              enabled: false,
            }
          }
        },
        legend: {
          enabled: true,
          floating: true,
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          y: 60,
          itemStyle: {
            width: 120,
            fontSize: '12px',
            lineHeight: '12px'
          },
          itemMarginBottom: 10,
        }
    }; // end of highcharts options object for lefthand chart



  function renderLeftChart(data, appendTarget, callback) {
    //use data to render series, save to options object literal, then pass options to highcharts constructor
    var xAxisCategories = buildXAxisLabels(data);
    highchartsOptionsLeft.xAxis.categories = xAxisCategories;

    highchartsOptionsLeft.series = buildSeriesDataLeft(data);

    $(appendTarget).highcharts( highchartsOptionsLeft, function(chart){
      var series = chart.series;
      $(series).each(function(i, serie){
          if (serie.legendSymbol)
              serie.legendSymbol.hide();
          if (serie.legendLine)
              serie.legendLine.hide();       
      });
      colorLegendItems(chart);
    });

    callback();
  }

  function buildXAxisLabels(data){
    var whatIfPoints = data.WhatIfResult.Points;
    var xAxisLabels = [];
    for (var i = 0; i < whatIfPoints.length; i++){
      xAxisLabels.push('');
    }
    for (var i = 0; i < whatIfPoints.length; i++){
      var stepPosition = whatIfPoints[i].StepPosition;
      xAxisLabels[stepPosition] = whatIfPoints[i].ActualPercent;
    }
    return xAxisLabels;
  }

  function buildSeriesDataLeft(data){
    var sortedPoints = data.WhatIfResult.Points.sort(function(a, b){
      return a.StepPosition;
    });
    
    var seriesData = buildTrendlineSeries(sortedPoints);


    var fullBudget = data.WhatIfResult.Config.SourceBudget;
    for (var i = 0; i < sortedPoints.length; i++){
      var totalPointBudget = sortedPoints[i].OptimizedMix.Total.Budget
      var pointOptimizedMix = sortedPoints[i].OptimizedMix.Details;
      for (var j = 0; j < pointOptimizedMix.length; j++){
        var touchpointData = pointOptimizedMix[j];
        var budgetPercentage = Math.round((touchpointData.Budget / fullBudget) * 1000 ) / 10;
        if (i === 0) {
          touchPointColors[touchpointData.TouchpointName.replace(/ /g, '')] = colors['color'+(j+1)];

          seriesData.push({
            name: touchpointData.TouchpointName,
            data: [budgetPercentage],
            type: 'column',
            yAxis: 0
          })
        } else {
          for (var k = 0; k < seriesData.length; k++){
            if (seriesData[k].name === touchpointData.TouchpointName) {
              seriesData[k].data.push(budgetPercentage);
            }
          }
        }
      }
    }

    return seriesData.sort(function(a, b){
      return a.name;
    });
  }

  function buildTrendlineSeries(sortedPoints){
    var seriesData = []
    for (var i = 0; i < sortedPoints.length; i++){
      var percentage = Math.round(sortedPoints[i].OptimizedMix.Total.FunctionValue * 1000) / 10;
      seriesData.push(percentage);
    }

    touchPointColors['Reach'] = colors.gray5;

    return [{
      name: 'Reach',
      data: seriesData,
      type: 'line',
      yAxis: 1,
      zIndex: 7,
      color: colors.gray5
    }];
  }

  function colorLegendItems(chart){
    var dimensions = $('.highcharts-legend')[0].getBoundingClientRect();
    chart.renderer.rect((dimensions.left - 20), (dimensions.right - 20), (dimensions.width + 40), (dimensions.height + 40), 0).attr({
      fill: 'rgba(255,255,255,0)',
      zIndex: 1000
    })
    .add();

    $('.highcharts-legend-item').find('text').each(function(idx, el){
      this.style.fill = touchPointColors[this.textContent.replace(/ /g, '')];
    });
  }

  function renderRightChart(data, appendTarget, fullBudget){
    var aggregatedTotalBudget = getAggregatedTotalBudget(data);
    var highchartSeriesData = buildSeriesDataRight(data, aggregatedTotalBudget);

    highchartsOptionsRight.xAxis.categories = [Math.round((aggregatedTotalBudget/fullBudget) * 100)]

    highchartsOptionsRight.series = highchartSeriesData;

    highchartsOptionsRight.subtitle.text = buildSubtitle(aggregatedTotalBudget);

    $(appendTarget).highcharts( highchartsOptionsRight, function(chart){
      var dataLabels = $('#container2').find('.highcharts-data-labels').find('text');

      for (var i = dataLabels.length - 2; i > -1; i-- ){
        var thisLabel = dataLabels[i];
        var lowerLabel = dataLabels[i+1];
        var thisLabelY = getLabelY(thisLabel);
        var thisLabelHeight = thisLabel.offsetHeight;
        var lowerLabelY = getLabelY(lowerLabel);
        
        if (thisLabelY + thisLabelHeight > lowerLabelY) {
          var yOffset = -(thisLabelHeight - (lowerLabelY - thisLabelY));
          var translate = 'translate(' + 0 + ',' + yOffset + ')';
          thisLabel.setAttribute('transform', translate);
        }   
      }
      for (var i = 0; i < dataLabels.length; i++){
        dataLabels[i].style.fill = colors['color'+ (i+1)];
      }

    });
  }

  function getLabelY(label){
    var translate = label.parentElement.attributes.transform.value;
    var regex = /,(\d+)/;
    return parseInt(translate.match(regex)[1]);
  }

  Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
      c = isNaN(c = Math.abs(c)) ? 2 : c, 
      d = d == undefined ? "." : d, 
      t = t == undefined ? "," : t, 
      s = n < 0 ? "-" : "", 
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
      j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };  

  function buildSubtitle(aggregatedTotalBudget){
    return 'Total Budget<br>$' + aggregatedTotalBudget.formatMoney(0);
  }

  function getAggregatedTotalBudget(data){
    var aggregatedTotalBudget = 0;
    var touchpoints = data.ChannelAllocation.AllocatedTouchpoints;
    for (var i = 0; i < touchpoints.length; i++) {
      aggregatedTotalBudget += touchpoints[i].Allocation.Budget;
    }
    return aggregatedTotalBudget;
  }

  function buildSeriesDataRight(data, aggregatedTotalBudget) {
    var reach = Math.round(data.ChannelAllocation.Total.Allocation.Result.Reach * 1000) / 10;
    var seriesData = [{
      name: 'Reach',
      data: [reach],
      yAxis: 1,
      type: 'line',
      index: data.ChannelAllocation.AllocatedTouchpoints.length - 1,
      zIndex: 7,
      color: colors.gray5,
      dataLabels: {
        enabled: false
      }
    }];

    var touchpoints = data.ChannelAllocation.AllocatedTouchpoints; 
    for (var i = 0; i < touchpoints.length; i++) {
      var budgetPercentage = Math.round((touchpoints[i].Allocation.Budget / aggregatedTotalBudget ) * 1000) / 10;
      seriesData.push({
        name: touchpoints[i].TouchpointName,
        data: [budgetPercentage],
        yAxis: 0,
        type: 'column',
        color: touchPointColors[touchpoints[i].TouchpointName.replace(/ /g, '')],
        index: touchpoints.length - i
      });
    }
    return seriesData.sort(function(a, b){
      return a.name
    });
  }

  function fetchRightChartData(project_id, api, fullBudget){
    var formURL = apiUrl+"campaigns/"+project_id+"/channelallocation"
    $.ajax({
        dataType: "json",
        url : formURL,
        type: "GET",
        headers: { 
            'x-wsse': 'ApiKey="'+api+'"'
        },
        success:function(data, textStatus, jqXHR) {
            console.dir(data);
            renderRightChart(data, '#container2', fullBudget);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
  }

  function findFullBudget(data){
    return data.WhatIfResult.Config.SourceBudget;
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

      var api = getCookie("api");
      //var api = "c9ec5028-59c3-4fc9-8ebc-dfae7ef02892";
      $.ajax({
          dataType: "json",
          url : formURL,
          type: "GET",
          headers: { 
              'x-wsse': 'ApiKey="'+api+'"'
          },
          success:function(data, textStatus, jqXHR) {
              console.dir(data);
              var fullBudget = findFullBudget(data);
              renderLeftChart(data, '#container', function(){
                fetchRightChartData( project_id, api, fullBudget );
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
          }
      });
  });