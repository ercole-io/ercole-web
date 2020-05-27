<template>
  <div :id="chartId" class="bubble-chart has-text-centered"></div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    dataset: {
      type: Object,
      required: true
    },
    chartId: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.mountChart()
  },
  methods: {
    mountChart() {
      const diameter = 350
      const color = d3.scaleOrdinal().range(d3.schemeCategory10)

      const bubble = d3
        .pack(this.dataset)
        .size([diameter, diameter])
        .padding(2)

      const svg = d3
        .select(`div#${this.chartId}`)
        .append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('class', 'bubble')

      const nodes = d3.hierarchy(this.dataset).sum(d => {
        return d.Count
      })

      const node = svg
        .selectAll('.node')
        .data(bubble(nodes).descendants())
        .enter()
        .filter(d => {
          return !d.children
        })
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => {
          return 'translate(' + d.x + ',' + d.y + ')'
        })

      node.append('title').text(d => {
        return d.data.Name + ': ' + d.data.Count
      })

      node
        .append('circle')
        .attr('r', d => {
          return d.r
        })
        .style('fill', (d, i) => {
          return color(i)
        })

      node
        .append('text')
        .attr('dy', '.2em')
        .style('text-anchor', 'middle')
        .text(d => {
          return d.data.Name.substring(0, d.r / 3)
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', d => {
          return d.r / 4
        })
        .attr('fill', 'white')

      node
        .append('text')
        .attr('dy', '1.3em')
        .style('text-anchor', 'middle')
        .text(d => {
          return d.data.Count
        })
        .attr('font-family', 'Gill Sans', 'Gill Sans MT')
        .attr('font-size', d => {
          return d.r / 4
        })
        .attr('fill', 'white')

      d3.select(self.frameElement).style('height', diameter + 'px')
    }
  }
}
</script>

<style lang="scss" scoped>
.bubble-chart {
  display: flex;
  justify-content: center;
}
</style>
