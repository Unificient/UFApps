import { LightningElement, api} from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BarChartCmp extends LightningElement {
    @api chartheight
    @api chartwidth
    @api eptdata
    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;
        Promise.all([
            loadScript(this, D3 + '/d3.min.js'), 
        ])
            .then(() => {
                this.createBulletRect();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading D3',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }
    createBulletRect() {
        
        var width = this.chartwidth
        var height = this.chartheight
        const margin = { top: 5, right: 5, bottom: 5, left: 40 }
        const plotHeight = height - margin.top - margin.bottom
        const plotWidth = width - margin.left - margin.right
        var svg = d3.select(this.template.querySelector('svg.d3'))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
//.domain(d3.extent(this.eptdata,function(d){return d['ept']}))
var data = d3.range(9)
var colors = d3.scaleQuantile()
    .domain(d3.ticks(0,3,9))
    .range(["#5E4FA2", "#3288BD"])
/*var rects = svg.selectAll('rect')
    .data(data)
    .enter()
	.append("rect")
	.attr("y", 20)
	.attr("height", 10)
	.attr("x", margin.left)
	.attr("width",plotWidth)
	.attr("fill", d=>colors(d))*/
//Main bar chart
    const plotOutline = svg
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("height", plotHeight)
        .attr("width", plotWidth)
        .style("fill", "#00AFDB")
    const scaleX = d3
        .scaleLinear()
        .domain([0, 7])
        .range([0, plotWidth])
    /*const axisX = svg // Xaxis
        .append("g")
        //.attr("transform", `translate(${plotHeight},0)`)
        .call(d3.axisTop(scaleX))*/
    //axisX.attr("transform", `translate(${margin.left}, 50)`)//Move the axis
    /*svg //Text at the top
        .append("text")
        .attr("x", width / 2)
        .attr("y", (margin.top/6 ))
        .attr("text-anchor", "middle")
        .text("User Experience")
        .style("font-size", "18px")
        .style("font-weight", "bold")*/
    const scaleY = d3 // Y Axis
        .scaleBand()
        .range([0, plotHeight])
        .domain(this.eptdata.map(x => x.name))
        .padding(0.1)
    const axisY = svg
        .append("g")
        .call(d3.axisLeft(scaleY).tickSize(0))
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("font-size", "12px")
        .style("font-weight", "light")
        .style("fill", "#000")
        .style("stroke", "none")
    axisY.call(g => g.select(".domain").remove()) // Remove the Y line
    //documentOutline.remove()
    plotOutline.remove()
    const bars = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(this.eptdata)
        .join("rect")
        .on("click", this.clickaction)
        .transition()
        .duration(2000)
        .attr("width", data => scaleX(data.rt))
        .attr("height", scaleY.bandwidth())
        .attr("y", data => scaleY(data.name))
        .attr("x", 0.5)
        .attr("fill", function(d){
            if (d.rt > 3.0){
                return "#F3B2A5"
            }
            else {
                return "#D4F3A5"
            }
        })
    //bars.on("click", clickaction)
        //.style("stroke", "#000")
      
}
clickaction(d) {
    
    this.dispatchEvent(new CustomEvent('handleclick', { detail: d, bubbles: true }))
}
handleclick(event) {

    const eptobj = event.detail;
    console.log("in handleClick",eptobj)
    // do dome stuff with this detail
    this.clicked = true
    this.netrtt = eptobj.network.rtt
    this.netdownlink = eptobj.network.downlink
    this.prevpage = eptobj.previousPage.location
    this.dispatchEvent(new CustomEvent('productclicked', { detail: eptobj, bubbles: true }))
    }
}