<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/dataZoom');
    export default {
      name: 'barPercent',
      props: {
        className: {
          type: String,
          default: 'chart'
        },
        id: {
          type: String,
          default: 'chart'
        },
        width: {
          type: String,
          default: '100%'
        },
        height: {
          type: String,
          default: '100%'
        }
      },
      data() {
        return {};
      },
      mounted() {
        this.initChart();
      },
      methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById(this.id));
            const data = [{
                value: 3661,
                name: '<10w'
            }, {
                value: 5713,
                name: '10w-50w'
            }, {
                value: 9938,
                name: '50w-100w'
            }, {
                value: 17623,
                name: '100w-500w'
            }, {
                value: 3299,
                name: '>500w'
            }];
            this.chart.setOption({
            backgroundColor: '#fff',
                title: {
                    text: '統計數據',
                    subtext: '2016年',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '0%',
                    data: ['<10w', '10w-50w', '50w-100w', '100w-500w', '>500w']
                },
                series: [{
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['25%', '58%'],
                    color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{d}%',

                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 14
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data
                }, {
                    type: 'pie',
                    radius: ['58%', '83%'],
                    itemStyle: {
                        normal: {
                            color: '#F2F2F2'
                        },
                        emphasis: {
                            color: '#ADADAD'
                        }
                    },
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{c}家',
                            textStyle: {
                                color: '#777777',
                                fontWeight: 'bold',
                                fontSize: 14
                            }
                        }
                    },
                    data: data
                }]
            })
        }
      }
    }
</script>
