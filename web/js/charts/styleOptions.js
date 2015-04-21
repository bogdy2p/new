var masterColors = {
  color1: "#43BBEF", // blue
  color2: "#04DE99", // green
  color3: "#D7DE23", // mustard
  color4: "#FF65C7", // pink
  color5: "#F8b429", // orange
  color6: "#7983F0", // purple
  color7: "#fff200", // cmy yellow
  color8: "#2e3192", // cmy blue
  color9: "#00ffff", // rgb cyan
  color10: "#ff00ff", // rgb magenta
  color11: "#00ff00", // rgb green
  color12: "#ec008c", // cmy magenta
  gray: '#807F7F',
  gray1: "#B3B1B1",
  gray4: '#666565',
  gray5: '#4D4C4C',
  gray6: '#1A1919',
  silver: "#F6F6F6", // silver
  black: '#000000',
  white: '#FFFFFF'
}

// NO!
// color11: "#00aeef", // cmy cyan
// color7: "#ed1c24", // cmy red


// #ed1c24 cmy red
// #00a651 cmy green
// #2e3192 cmy blue
// #00aeef cmy cyan
// #ec008c cmy magenta
// #fff200 cmy yellow

// #ff0000 rgb red
// #00ff00 rgb green
// #0000ff rgb blue
// #00ffff rgb cyan
// #ff00ff rgb magenta
// #ffff00 rgb yellow

var masterFonts = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fonts: {
    font1: 'KGSecondChancesSolid',
    font2: 'KGSecondChancesSketch',
    font3: 'KGFallForYou',
    font4: 'DINRegular',
    font5: 'DINLight',
  }
}

var styleOptions = {
  colors: masterColors,
    touchpoints: {
      fontSchema: {
        plain: {
            chart: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
              letterSpacing: 1,
              reflow: false,
              plotBackgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, masterColors.color1],
                    [0.1, masterColors.color1],
                    [1, masterColors.silver]
                ]                
              },              
            },
            title: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '32px',
              fontWeight: 'bold',
              color: masterColors.gray,
            },
            xAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '14px',
              color: masterColors.gray,
            },
            yAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
            },
            legend: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '14px',
              fontWeight: 'light',
              color: masterColors.gray,
            },
            dataLabels: {
              style: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '24px',
                fontWeight: 'lighter',
                color: masterColors.gray,
              },
              y: -5
            },
            legendSeparatorLine: {
              strokeWidth: 1,
              stroke: masterColors.gray2
            }
        },
        styled: {
            chart: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
              plotBackgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, masterColors.color1],
                    [0.1, masterColors.color1],
                    [1, masterColors.silver]
                ]                
              },              
            },
            title: {
              fontFamily: masterFonts.fonts.font1,
              fontSize: '2.5em',
              color: masterColors.gray,
              fontWeight: 'normal',
              letterSpacing: 1
            },
            xAxisLabels: {
              fontFamily: masterFonts.fonts.font4,
              fontSize: '1.1em',
              color: masterColors.gray
            },
            yAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray
            },
            legend: {
              fontFamily: masterFonts.fonts.font4,
              fontSize: '1.1em',
              fontWeight: 'normal',
              color: masterColors.gray1
            },
            dataLabels: {
              style: {
                fontFamily: masterFonts.fonts.font5,
                fontSize: '2.5em',
                color: masterColors.gray  
              },
              y: -5
            },
            legendSeparatorLine: {
                'stroke-width': '2',
                'stroke': masterColors.gray2
            }
        },
        smaller: {
            chart: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,          
              plotBackgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, masterColors.color1],
                    [0.1, masterColors.color1],
                    [1, masterColors.silver]
                ]                
              },              
            },
            title: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '24px',
              fontWeight: 'normal',
              color: masterColors.gray6,
            },
            xAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              lineHeight: '12px',
              fontWeight: 'normal',
              color: masterColors.gray6,
            },
            yAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
            },
            legend: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              fontWeight: 'light',
              color: masterColors.gray,
            },
            dataLabels: {
              style: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '21px',
                fontWeight: 'lighter',
                color: masterColors.gray6,
                letterSpacing: '0px',
              },
              y: -4
            },
            legendSeparatorLine: {
              strokeWidth: 1,
              stroke: masterColors.gray2
            }
        },
    }
  }, // end of touchpoints
  commsTasks: {
      fontSchema: {
        plain: {
            chart: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
              plotBackgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, masterColors.color1],
                    [0.2, masterColors.color1],
                    [1, masterColors.silver]
                ]                
              },
            },
            title: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '40px',
              color: masterColors.gray6,
              y: 95,
              margin: -10
            },
            xAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              selectedFontSize: '16px',
              unselectedFontSize: '14px',
              selectedFontWeight: 'bold',
              unselectedFontWeight: 'normal',
              selectedFontColor: masterColors.gray6,
              unselectedFontColor: masterColors.gray1
            },
            plainDataLabels: {
              style: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '25px',
                fontWeight: 'lighter',
                color: masterColors.silver  
              },
              y: -10
            }
        },
        styled: {
            chart: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
              plotBackgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, masterColors.color1],
                    [0.2, masterColors.color1],
                    [1, masterColors.silver]
                ]                
              },
            },
            title: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '40px',
              color: masterColors.gray6,
              y: 95,
              margin: -10
            },
            xAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              selectedFontSize: '16px',
              unselectedFontSize: '14px',
              selectedFontWeight: 'bold',
              unselectedFontWeight: 'normal',
              selectedFontColor: masterColors.gray6,
              unselectedFontColor: masterColors.gray1
            },
            plainDataLabels: {
              style: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '25px',
                fontWeight: 'lighter',
                color: masterColors.silver  
              },
              y: -10
            }
        },
        smaller: {
            chart: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '12px',
              color: masterColors.gray,
              plotBackgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, masterColors.color1],
                    [0.1, masterColors.color1],
                    [1, masterColors.silver]
                ]                
              },
            },
            title: {
              fontFamily: masterFonts.fontFamily,
              fontSize: '24px',
              color: masterColors.gray6,
              y: 93,
              margin: -10
            },
            xAxisLabels: {
              fontFamily: masterFonts.fontFamily,
              selectedFontSize: '14px',
              selectedFontWeight: 'bold',
              selectedLineHeight: '14px',
              unselectedFontSize: '12px',
              unselectedFontWeight: 'normal',
              unselectedLineHeight: '12px',
              selectedFontColor: masterColors.gray6,
              unselectedFontColor: masterColors.gray6
            },
            plainDataLabels: {
              style: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '22px',
                fontWeight: 'lighter',
                opacity: 0.85,
                color: masterColors.silver  
              },
              y: -5
            },
            selectedDataLabels: {
              style: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '22px',
                fontWeight: 'lighter',
                color: masterColors.gray6
              }
            }
        },
    } 
  }, // end of commsTasks
    phasing: {
        fontSchema: {
          plain: {
              chart: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray,
              },
              title: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray,
              },
              xAxisLabels: {
                align: 'left',
                fontFamily: masterFonts.fontFamily,
                fontSize: '1.1em',
                color: masterColors.gray1,
                x: -5
              },
              yAxisLabels1: {
                titleText: 'Pressure (Equivalent GRP)',
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray1,
              },
              yAxisLabels2: {
                titleText: 'Reach 1+',
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray1,
              },
              legend: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '1.1em',
                fontWeight: 'normal',
                color: masterColors.gray,
                symbolPixels: 12,
                itemHorizontalDistance: 30,
                itemMarginBottom: 10
              },
              dataLabels: {
                style: {
                  fontFamily: masterFonts.fontFamily,
                  fontSize: '12px',
                  color: masterColors.gray,
                },
                y: -5
              },
              legendSeparatorLine: {
                strokeWidth: 1,
                stroke: masterColors.gray1
              }
          },
          styled: {
              chart: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray,
              },
              title: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray,
              },
              xAxisLabels: {
                align: 'left',
                fontFamily: masterFonts.fontFamily,
                fontSize: '1.1em',
                color: masterColors.gray1,
                x: -5
              },
              yAxisLabels1: {
                titleText: 'Pressure (Equivalent GRP)',
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray1,
              },
              yAxisLabels2: {
                titleText: 'Reach 1+',
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray1,
              },
              legend: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '1.1em',
                fontWeight: 'normal',
                color: masterColors.gray,
                symbolPixels: 12,
                itemHorizontalDistance: 30,
                itemMarginBottom: 10
              },
              dataLabels: {
                style: {
                  fontFamily: masterFonts.fontFamily,
                  fontSize: '12px',
                  color: masterColors.gray,
                },
                y: -5
              },
              legendSeparatorLine: {
                strokeWidth: 1,
                stroke: masterColors.gray1
              }
          },
          smaller: {
              chart: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray,
              },
              title: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray,
              },
              xAxisLabels: {
                align: 'left',
                fontFamily: masterFonts.fontFamily,
                fontSize: '11px',
                color: masterColors.gray1,
                x: -5
              },
              yAxisLabels1: {
                titleText: 'Pressure (Equivalent GRP)',
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray1,
              },
              yAxisLabels2: {
                titleText: 'Reach 1+',
                fontFamily: masterFonts.fontFamily,
                fontSize: '12px',
                color: masterColors.gray1,
              },
              legend: {
                fontFamily: masterFonts.fontFamily,
                fontSize: '11x',
                fontWeight: 'normal',
                color: masterColors.gray,
                symbolPixels: 10,
                itemHorizontalDistance: 26,
                itemMarginBottom: 9
              },
              dataLabels: {
                style: {
                  fontFamily: masterFonts.fontFamily,
                  fontSize: '12px',
                  color: masterColors.gray,
                },
                y: -5
              },
              legendSeparatorLine: {
                strokeWidth: 1,
                stroke: masterColors.gray1
              }
          },          
      }
  }, // end of phasing
  budgetAllocation: {
      fontSchema: {
        plain: {
          chart: {
            fontFamily: masterFonts.fontFamily
          },
          titles: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '30px',
            color: masterColors.black,
            align: 'left'
          },
          rightSubtitle: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '25px',
            color: masterColors.gray5,
            y: 300
          },
          xAxisLabels: {
           fontFamily: masterFonts.fontFamily,
           fontSize: '30px',
           color: masterColors.gray
          },
          yAxisLabels1: {
            id: 'Budget',
            min: 0,
            max: 250,
          },
          yAxisLabels2: {
            id: 'Metric/Reach',
            min: 0,
            max: 50,
            y: -5,
            x: 2,
            color: masterColors.gray5,
            fontSize: '20px',
            tickWidth: 2,
            tickLength: 25,
            offset: 20
          },
          reachLine: {
            color: masterColors.gray5
          },
          dataLabels: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '1.5em',
            color: masterColors.gray1,
            x: 100
          },
          legend: {
            y: 60,
            x: -27,
            itemStyle: {
              width: 120,
              fontSize: '18px',
              lineHeight: '19px'
            },
            itemMarginBottom: 22
          }
        },
        styled: {
          chart: {
            fontFamily: masterFonts.fontFamily
          },
          titles: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '30px',
            color: masterColors.black,
            align: 'left'
          },
          rightSubtitle: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '25px',
            color: masterColors.gray5,
            y: 300
          },
          xAxisLabels: {
           fontFamily: masterFonts.fontFamily,
           fontSize: '30px',
           color: masterColors.gray
          },
          yAxisLabels1: {
            id: 'Budget',
            min: 0,
            max: 250,
          },
          yAxisLabels2: {
            id: 'Metric/Reach',
            min: 0,
            max: 50,
            y: -5,
            x: 2,
            color: masterColors.gray5,
            fontSize: '20px',
            tickWidth: 2,
            tickLength: 25,
            offset: 20
          },
          reachLine: {
            color: masterColors.gray5
          },
          dataLabels: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '1.5em',
            color: masterColors.gray1,
            x: 100
          },
          legend: {
            y: 60,
            x: -27,
            itemStyle: {
              width: 120,
              fontSize: '18px',
              lineHeight: '19px'
            },
            itemMarginBottom: 22
          }
        },
        smaller: {
          masterWidthLeft: '479px',
          masterWidthRight: '177px',
          chart: {
            fontFamily: masterFonts.fontFamily
          },
          titles: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '18px',
            color: masterColors.black,
            align: 'left',
            margin: 55
          },
          rightSubtitle: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '16px',
            color: masterColors.gray5,
            y: 38
          },
          xAxisLabels: {
           fontFamily: masterFonts.fontFamily,
           fontSize: '16px',
           color: masterColors.gray
          },
          yAxisLabels1: {
            id: 'Budget',
            min: 0,
            max: 150,
          },
          yAxisLabels2: {
            id: 'Metric/Reach',
            min: 0,
            max: 100,
            y: -5,
            x: 2,
            color: masterColors.gray5,
            fontSize: '14px',
            tickWidth: 2,
            tickLength: 25,
            offset: 20
          },
          reachLine: {
            color: masterColors.gray5
          },
          dataLabels: {
            fontFamily: masterFonts.fontFamily,
            fontSize: '12px',
            color: masterColors.gray1,
            x: 50
          },
          legend: {
            y: 30,
            x: -27,
            backgroundColor: 'rgba(255,255,255,0)',
            itemStyle: {
              width: 100,
              fontSize: '10px', 
              lineHeight: '10px',
            },
            itemMarginBottom: 8
          }
        }, // end of smaller
      }
    }
}