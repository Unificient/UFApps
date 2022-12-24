import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Statusbar extends LightningElement {
    @api currentstate 
    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;
        Promise.all([
            loadScript(this, D3 + '/d3.js'), 
        ])
            .then(() => {
                this.statusbar();
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
    statusbar() {
    
    var width = 250;
    var height =20;   
    var svg = d3.select(this.template.querySelector('svg.d3'))
                .attr("width", width )
                .attr("height", height )
                .attr("transform", "translate(" + 1 + "," + 20 + ")");
    var states = ['Bad', 'Ok', 'Good'],
	    segmentWidth = 70,
		currentState = this.currentstate

	var colorScale = d3.scaleOrdinal()
		.domain(states)
		.range(['#E74C3C', '#F7DC6F', '#7DCEA0']);

	svg.append('rect')
		.attr('class', 'bg-rect')
		.attr('rx', 10)
		.attr('ry', 10)
		.attr('fill', '#ECF0F1')
		.attr('height', 15)
		.attr('width', function(){
			return segmentWidth * states.length;
		})
		.attr('x', 0);

	var progress = svg.append('rect')
					.attr('class', 'progress-rect')
					.attr('fill', function(){
						return colorScale(currentState);
					})
					.attr('height', 15)
					.attr('width', 0)
					.attr('rx', 10)
					.attr('ry', 10)
					.attr('x', 0);

	progress.transition()
		.duration(1000)
		.attr('width', function(){
			var index = states.indexOf(currentState);
			return (index + 1) * segmentWidth;
		});

	function moveProgressBar(state){
		progress.transition()
			.duration(1000)
			.attr('fill', function(){
				return colorScale(state);
			})
			.attr('width', function(){
				var index = states.indexOf(state);
				return (index + 1) * segmentWidth;
			});
	}
    }
}