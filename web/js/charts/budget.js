
project_id = $('.project_id').attr('data-project-id');
var formURL = apiUrl+"campaigns/"+project_id+"/videoneutral"

    var colors = masterColors;
    var fontOptions;
    var numWhatIfs;
    var masterColumnWidth;

    var touchPointColors = {};
    var highchartsOptionsLeft;
    var highchartsOptionsRight;

    function setHighChartsOptionsRight(){
      var highchartsOptionsRight = {
          chart: {
              type: 'column',
              spacingTop: 15,
              spacingBottom: 30,
              spacingLeft: 15,
              alignTicks: false,
              backgroundColor: 'rgba(255,255,255,0)',
              style: {
                fontFamily: fontOptions.chart.fontFamily
              },
              animation: false
          },
          exporting: {
            filename: project_id+'_BAM_right',
            sourceWidth: 227,
            sourceHeight: 445,
            scale: 3
          },
          colors: [colors.color1, colors.color2, colors.color3, colors.color4, colors.color6],
          title: {
              text: 'Recommended',
              style: {
                fontFamily: fontOptions.titles.fontFamily, 
                fontSize: fontOptions.titles.fontSize,
                color: fontOptions.titles.color
              },
              align: fontOptions.titles.align,
              margin: fontOptions.titles.margin
          },
          subtitle: {
            align: 'left',
            style: {
              fontFamily: fontOptions.rightSubtitle.fontFamily,
              fontSize: fontOptions.rightSubtitle.fontSize,
              color: fontOptions.rightSubtitle.color
            },
            y: fontOptions.rightSubtitle.y
          },
          xAxis: {
              labels: {
                enabled: true,
                style: {
                  fontFamily: fontOptions.xAxisLabels.fontFamily,
                  fontSize: fontOptions.xAxisLabels.fontSize,
                  color: fontOptions.xAxisLabels.color
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
          yAxis: [{ //primary (budget percentage) axis
            id: fontOptions.yAxisLabels1.id,
            labels: {
                enabled: false 
            },
            title: {
                text: null
            },
            lineWidth: 0,
            max: fontOptions.yAxisLabels1.max,
            min: fontOptions.yAxisLabels1.min,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickWidth: 0,
            minorTickWidth: 0
          }, { //secondary axis (metric)
            id: fontOptions.yAxisLabels2.id,
            opposite: true,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            max: fontOptions.yAxisLabels2.max,
            min: fontOptions.yAxisLabels2.min,
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
              pointWidth: 40
            },
            series: {
              borderColor: colors.white,
              borderWidth: 1,
              padding: 1,
              dataLabels: {
                enabled: true,
              }
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            enabled: true,
            pointFormat: '{series.name}: <b>${point.budget}</b><br/>'
          }
      }; // end of highcharts options object for righthand chart
      return highchartsOptionsRight
    }
  
  function setHighChartsOptionsLeft() {

    var highchartsOptionsLeft = {
        chart: {
              type: 'column',
              spacingTop: 15,
              spacingBottom: 30,
              spacingRight: 25,
              spacingLeft: 25,
              alignTicks: false,
              backgroundColor: 'rgba(255,255,255,0)',
              style: {
                fontFamily: fontOptions.chart.fontFamily
              }
          },
          exporting: {
            filename: project_id+'_BAM_left',
            sourceWidth: 427,
            sourceHeight: 445,
            scale: 3
          },
          title: {
              text: 'Video Neutral Scenarios',
              align: fontOptions.titles.align,
              style: {
                fontFamily: fontOptions.titles.fontFamily, 
                fontSize: fontOptions.titles.fontSize,
                color: fontOptions.titles.color
              },
              // margin: 20
              margin: fontOptions.titles.margin
          },
          xAxis: {
              labels: {
                enabled: true,
                style: {
                  fontFamily: fontOptions.xAxisLabels.fontFamily,
                  fontSize: fontOptions.xAxisLabels.fontSize,
                  color: fontOptions.xAxisLabels.color
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
            id: fontOptions.yAxisLabels1.id,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            max: fontOptions.yAxisLabels1.max,
            min: fontOptions.yAxisLabels1.min,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickWidth: 0,
            minorTickWidth: 0
          }, { //secondary axis (metric)
            id: fontOptions.yAxisLabels2.id,
            opposite: true,
            labels: {
                enabled: true,
                y: fontOptions.yAxisLabels2.y,
                x: fontOptions.yAxisLabels2.x,
                style: {
                  color: fontOptions.yAxisLabels2.color,
                  fontSize: fontOptions.yAxisLabels2.fontSize
                }
            },
            title: {
                text: null
            },
            max: fontOptions.yAxisLabels2.max,
            min: fontOptions.yAxisLabels2.min,
            tickWidth: fontOptions.yAxisLabels2.tickWidth,
            tickLength: fontOptions.yAxisLabels2.tickLength,
            offset: fontOptions.yAxisLabels2.offset,
            lineWidth: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
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
            backgroundColor: fontOptions.legend.backgroundColor,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            y: fontOptions.legend.y,
            x: fontOptions.legend.x,
            itemStyle: fontOptions.legend.itemStyle,
            itemMarginBottom: fontOptions.legend.itemMarginBottom,
          },
          tooltip: {
            enabled: true,
            pointFormat: '{series.name}: <b>${point.budget}</b><br/>'
          }
    }; // end of highcharts options object for lefthand chart
    return highchartsOptionsLeft ;
  }



  function renderLeftChart(data, appendTarget, options, callback) {
    //use data to render series, save to options object literal, then pass options to highcharts constructor
    var highchartsOptions = options; 
    var xAxisCategories = buildXAxisLabels(data);
    highchartsOptions.xAxis.categories = xAxisCategories;

    highchartsOptions.series = buildSeriesDataLeft(data);

    $(appendTarget).highcharts( highchartsOptions, function(chart){
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

  function resizeChartContainer(){
    return this;
  }

  function buildXAxisLabels(data){
    var xAxisLabels = [];
    $(data.WhatIfResult.Points.sort(function(a, b){
      return a.StepPosition - b.StepPosition;
    })).each(function(idx, item){
      xAxisLabels.push(item.ActualPercent)
    })
    return xAxisLabels;
  }

  function buildSeriesDataLeft(data){
    var sortedPoints = data.WhatIfResult.Points.sort(function(a, b){
      return a.StepPosition - b.StepPosition;
    });
    
    var seriesData = [];


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
            data: [{y:budgetPercentage, budget: touchpointData.Budget.formatMoney(0)}],
            color: colors['color'+(j+1)],
            type: 'column',
            yAxis: 0,
          })
        } else {
          for (var k = 0; k < seriesData.length; k++){
            if (seriesData[k].name === touchpointData.TouchpointName) {
              seriesData[k].data.push({y:budgetPercentage, budget: touchpointData.Budget.formatMoney(0)});
            }
          }
        }
      }
    }

    seriesData.push(buildTrendlineSeries(sortedPoints));

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

    touchPointColors['Reach'] = fontOptions.reachLine.color;

    return {
      name: 'Reach',
      data: seriesData,
      type: 'line',
      dashStyle: 'ShortDot',
      lineWidth: 1,
      marker: {
        radius: 3,
      },
      yAxis: 1,
      zIndex: 8,
      color: fontOptions.reachLine.color,
      tooltip: {
        enabled: true,
        pointFormat: '{series.name}: <b>{point.y}%</b><br/>'
      }
    };
  }

  function colorLegendItems(chart){
    var translate = $('.highcharts-legend')[0].attributes.transform.value;
    var translateX = parseInt(translate.match(/\((.+)\,/)[1]);
    var translateY = parseInt(translate.match(/\,(.+)\)/)[1]);

    var dimensions = $('.highcharts-legend')[0].getBBox();
    chart.renderer.rect(( (dimensions.x + translateX ) - 0), ( (dimensions.y + translateY) - 0), (dimensions.width + 0), (dimensions.height + 0), 0).attr({
      fill: 'rgba(255,255,255,0)',
      zIndex: 1000
    })
    .add();

    $('.highcharts-legend-item').find('text').each(function(idx, el){
      this.style.fill = touchPointColors[this.textContent.replace(/ /g, '')];
    });
  }

  function getLeftChartColumnWidth(){
    return $('#container .highcharts-series rect')[0].attributes.width.value;
  }

  function renderRightChart(data, appendTarget, options, fullBudget){
    var highchartsOptions = options; 

    var aggregatedTotalBudget = getAggregatedTotalBudget(data);
    var leftColumnWidth = Math.min((parseInt(getLeftChartColumnWidth()) + 7), 66 );
    var highchartSeriesData = buildSeriesDataRight(data, aggregatedTotalBudget, leftColumnWidth);

    highchartsOptions.xAxis.categories = [Math.round((aggregatedTotalBudget/fullBudget) * 100)]

    highchartsOptions.series = highchartSeriesData;

    highchartsOptions.subtitle.text = buildSubtitle(aggregatedTotalBudget);

    highchartsOptions.plotOptions.column.pointWidth = getLeftChartColumnWidth();
    masterColumnWidth = getLeftChartColumnWidth;

    $(appendTarget).highcharts( highchartsOptions, function(chart){

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

  function buildSeriesDataRight(data, aggregatedTotalBudget, columnWidth) {
    var reach = Math.round(data.ChannelAllocation.Total.Allocation.Result.Reach * 1000) / 10;
    var seriesData = [{
      name: 'Reach',
      data: [reach],
      yAxis: 1,
      type: 'line',
      dashStyle: 'ShortDot',
      lineWidth: 1,
      marker: {
        radius: 3,
      },
      index: data.ChannelAllocation.AllocatedTouchpoints.length - 1,
      zIndex: 7,
      color: fontOptions.reachLine.color,
      dataLabels: {
        enabled: true,
        formatter: function(){
            return this.y + "% Reach";
        },
        align: 'left',
        y: -2,
        x: 2
      },
      tooltip: {
        enabled: true,
        pointFormat: '{series.name}: <b>{point.y}%</b><br/>'
      }
    }];

    var touchpoints = data.ChannelAllocation.AllocatedTouchpoints; 
    for (var i = 0; i < touchpoints.length; i++) {
      var budgetPercentage = Math.round((touchpoints[i].Allocation.Budget / aggregatedTotalBudget ) * 1000) / 10;
      seriesData.push({
        name: touchpoints[i].TouchpointName,
        data: [{y: budgetPercentage, budget: touchpoints[i].Allocation.Budget.formatMoney(0)}],
        yAxis: 0,
        type: 'column',
        color: touchPointColors[touchpoints[i].TouchpointName.replace(/ /g, '')],
        index: touchpoints.length - i,
        dataLabels: {
          formatter: function(){
              return this.y + "%";
          },
          inside: true,
          align: 'center',
          style: {
            fontFamily: fontOptions.dataLabels.fontFamily, 
            fontSize: fontOptions.dataLabels.fontSize, 
            color: touchPointColors[touchpoints[i].TouchpointName.replace(/ /g, '')]
          },
          x: i % 2 == 0 ? (columnWidth) : -(columnWidth)
        }
      });
    }
    return seriesData.sort(function(a, b){
      return a.name
    });
  }

  function findFullBudget(data){
    return data.WhatIfResult.Config.SourceBudget;
  }

  function fetchRightChartData(project_id, api, options, fullBudget){
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
            renderRightChart(data, '#container2', options, fullBudget);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
  }

  function resizeChartContainers(fontOptions){
    document.getElementById('container').style.width = fontOptions.masterWidthLeft;
    document.getElementById('container2').style.width = fontOptions.masterWidthRight;
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
              numWhatIfs = data.WhatIfResult.Points.length;
              fontOptions = styleOptions.budgetAllocation.fontSchema.smaller;

              // debugger
              resizeChartContainers(fontOptions);

              renderLeftChart(data, '#container', setHighChartsOptionsLeft(), function(){
                fetchRightChartData( project_id, api, setHighChartsOptionsRight(), fullBudget );
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
          }
      });
  });