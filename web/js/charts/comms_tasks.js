     project_id = $('.project_id').attr('data-project-id');
     formURL = apiUrl+"campaigns/"+project_id+"/selectedtasksinformation";


  var selectedCategories = [];
  var selectedCategoryIndicies = [];

  var fontOptions = styleOptions.commsTasks.fontSchema.smaller;
  var colors = styleOptions.colors;

  var highchartsOptions = {
    chart: {
      type: 'column',
      spacingLeft: 0,
      spacingRight: 0,
      spacingTop: 5,
      backgroundColor: 'rgba(255,255,255,0)',
      render: false,
      style: {
        fontFamily: fontOptions.chart.fontFamily
      },
      plotBackgroundColor: fontOptions.chart.plotBackgroundColor,
    },
    exporting: {
        filename: project_id+'_CT',
        sourceWidth: 660,
        sourceHeight: 440,
        scale: 3
    },
    title: {
      text: "Notice & Talk About",
      style: {
        fontFamily: fontOptions.title.fontFamily,
        fontSize: fontOptions.title.fontSize,
        color: fontOptions.title.color
      },
      // margin: fontOptions.title.margin
    },
    xAxis: {
      tickWidth: 0,
      title: {
        text: null
      },
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        style: {
          fontFamily: fontOptions.xAxisLabels.fontFamily,
          fontSize: fontOptions.xAxisLabels.selectedFontSize,
          fontWeight: fontOptions.xAxisLabels.selectedFontWeight,
          color: fontOptions.xAxisLabels.selectedFontColor,
          lineHeight: fontOptions.xAxisLabels.selectedLineHeight
        }
      }
    },
    yAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      min: 0,
      max: 60,
      reversedStacks: false,
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      tickWidth: 0,
      minorTickWidth: 0
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        pointRange: 1,
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0.01,
      },
      series: {
        animation: false,
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      valueDecimals: 4,
      pointFormat: '{series.name}: <b>{point.y}</b><br/>',
      valueSuffix: '%',
    }
  }

  function renderChart(data, appendTarget ){
    // Build x-axis category names and add to highcharts options
    highchartsOptions.xAxis.categories = buildXAxis(data);

    // Build series data and add to highcharts options
    highchartsOptions.series = buildSeriesDataFromJSON(data);

    // Render chart and append to target container element
    $(appendTarget).highcharts( highchartsOptions, function(chart){
      unhighlightXAxisLabels();
    });
  }

  function buildXAxis(data){
    var xAxisCategories = [];
    for (var i = 0; i < data.Objectives.length; i++){
      xAxisCategories.push(data.Objectives[i].Name);
    }
    return xAxisCategories;
  }

  function buildSeriesDataFromJSON(data){
    var selectedData = [];
    var seriesData = [];
    var dummyStyleData = [];
    for (var i = 0; i < data.Objectives.length; i++){
      // Handle 'selected' categories
      if (data.Objectives[i].Selected === true) {
        selectedCategories.push(data.Objectives[i].Name)
        selectedCategoryIndicies.push(i)
        selectedData.push(data.Objectives[i].Score * 100);
        seriesData.push(0);
        dummyStyleData.push({
          y: 60 - (data.Objectives[i].Score * 100),
          dataLabels: {
            style: fontOptions.selectedDataLabels.style,
            y: fontOptions.plainDataLabels.y
          }
        });
      } else {
        selectedData.push(0);
        seriesData.push(data.Objectives[i].Score * 100);
        dummyStyleData.push({
          y: 60 - (data.Objectives[i].Score * 100),
          dataLabels: {
            style: fontOptions.plainDataLabels.style,
            y: fontOptions.plainDataLabels.y
          }
        });
      }

      // Build "fake" columns used to create linear gradient effect
    }

    return [{
      name: 'Selected',
      zIndex: 3,
      data: selectedData,
      groupPadding: 0,
      color: colors.color3,
      shadow: false,
      dataLabels: {
        enabled: true,
        inside: true,
        verticalAlign: 'bottom',
        y: -10,
        style: {
          fontWeight: 'bolder',
          fontSize: '50px',
          color: colors.silver
        },
        formatter: function(){
          if (selectedCategories.indexOf(this.x) < 0 ) {
            return '';
          } else {
            return String.fromCharCode(10003);
          }
        }
      }
    }, {
      name: 'Not-Selected',
      zIndex: 2,
      data: seriesData,
      groupPadding: 0,
      color: colors.silver,
      shadow: false,
      dataLabels: {
        enabled: false
      }
    }, {
      name: 'DummyStyleSeries',
      data: dummyStyleData,
      color: colors.color1,
      shadow: false,
      dataLabels: {
        className: 'dummy',
        enabled: true,
        verticalAlign: 'bottom',
        formatter: function(){
          return Math.round((60 - this.y) * 10) / 10 + "%";
        }
      },
      states: {
        hover: {
          enabled: false
        }
      },
      enableMouseTracking: false      
    }];
  }

  function unhighlightXAxisLabels(){
    var xAxisLabels$ = $('.highcharts-xaxis-labels').find('text');
    xAxisLabels$.each(function(idx, el){
      if (selectedCategories.indexOf(this.textContent) < 0 ) {
        this.style.fontSize = fontOptions.xAxisLabels.unselectedFontSize;
        this.style.fontWeight = fontOptions.xAxisLabels.unselectedFontWeight;
        this.style.color = fontOptions.xAxisLabels.unselectedFontColor;
        this.style.lineHeight = fontOptions.xAxisLabels.unselectedLineHeight;
      }
    });
  }

  function chartResponseOK(data){
    // Check to see if any touchpoints are sent down at all
    if (!data.Objectives || data.Objectives.length === 0) {
      displayChartError('No touchpoint data available. Please add more information');
      return false;
    } else {
    // Make sure at least one touchpoint is 'selected'
      for (var i = 0; i < data.Objectives.length; i++ ) {
        if (data.Objectives[i].Selected) {
          return true;
        }
      }
      displayChartError('No touchpoints selected. Please select at least one');
      return false;
    }
  }

  $(function(){
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
          if (chartResponseOK(data)) {
            $('.chart-success').css({"display": "block"}).animate({"opacity":1}, 1000);
            $('.placeholder').css({"display": "none"});
            renderChart(data, '#chart-container');
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          displayChartError();
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
      }
    });
  });