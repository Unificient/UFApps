import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import d3style from "@salesforce/resourceUrl/d3style";
import icons from '@salesforce/resourceUrl/icons';

export default class orgOverviewMap extends LightningElement {
  
    d3Initialized = false;
    @api emplist 
    @track listdata = {}
    @track isData = false
    @api selecteddate
    @api deptname
    @api empname
    dateselected
    mapvisible = false
    @api contactdata
    @api interactdata
    nodeOBJECTect = {}
    textinfo = "xxx"
    selecteddata
    showme = true
    @api orgmap
    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;
        Promise.all([
            loadScript(this, D3 + '/d3.js'),
            loadStyle(this, d3style)
        ])
            .then(() => {
                //this.generateNodes()
                this.initializeD3();
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading D3',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }
    generateNodes() { 
     
      var treenodes = d3.nest().key(function(d) {
        return d.department__c }).key(function(d) {
        return d.employee__r.Name}).entries(this.contactdata)
    this.nodeOBJECTect.name = this.empname
    this.nodeOBJECTect.type = 'Root'
    this.nodeOBJECTect.radius = 30
    var oa = []
    var ob = {}
    for (let m of treenodes) {                     
          var a = {}
          a.name = m.key
          a.type = 'Dept'
          a.radius = 20
          var ia = []
       for (let y of m.values) { 
             var b = {}
             b.name = y.key
             b.type = 'Emp'
             b.radius = 10
             ia.push(b)
        } 
        a.children = ia
        oa.push(a)
      }
      //Generate individual contacts//

     if (this.interactdata != null) {
        for (let int of this.interactdata) {
            var t = {}
            t.name = int.contactto__r.Name
            t.empId = int.contactto__r.employeeId__c
            t.type = "Emp"
            oa.push(t)
        }
      }
      else {
        this.interactdata = []
      }
      this.nodeOBJECTect.children = oa
      }
      testme(event) {
        //event.preventDefault();
        /*var tis = this.showme
        console.log("testme called",tis)
        tis = true
        this.showme = tis*/
        const selectedEvent = new CustomEvent('selected', { detail: event, bubbles: true , composed:true});
        this.dispatchEvent(selectedEvent)
      }
      initializeD3() {
        var intso = icons + '/utility/cart_60.png'
        var db = icons + '/utility/database_60.png'
        var usergroup = icons  + '/action/new_group_60.png'
        var tt = this.textinfo
        var pp2 = this.testme
        var mapdata = this.orgmap
        
            //TDOD - Scale SVG based on ViewPort size - See backup files//
            var margin = {top: 10, right: 10, bottom: 10, left:10},
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom
            var container = this.template.querySelector(".svgcontainer")
            
            var svg = d3.select(container).append("svg")
                .style("padding-bottom","2%")
                .style("padding-left","2%")
                .style("font", "10px sans-serif")
                .style("user-select", "none")
              .attr("preserveAspectRatio", "xMinYMin meet")
              //.attr("viewBox", "0 0 1000 1000")
              .classed("svg-container", true) 
              .attr("viewBox",[-80, 50, 950, 550])
              .attr("transform","translate(" + margin.left + "," + margin.top + ")")
                // Define the div for the tooltip
               var tooltip = d3.select(container).append("div").attr("class", "toolTip");
              
               var i = 0,
               duration = 200,
               root;
           
           // declares a tree layout and assigns the size
           var treemap = d3.tree().size([500, 500]);
           
           // Assigns parent, children, height, depth
           root = d3.hierarchy(mapdata, function(d) { return d.children; });
           root.x0 = height / 2;
           root.y0 = 0;
           
           // Collapse after the second level
           root.children.forEach(collapse);
           
           update(root);
           
           // Collapse the node and all it's children
           function collapse(d) {
             if(d.children) {
               d._children = d.children
               d._children.forEach(collapse)
               d.children = null
             }
           }
           
           function update(source) {
           
             // Assigns the x and y position for the nodes
             var treeData = treemap(root);
           
             // Compute the new tree layout.
             var nodes = treeData.descendants(),
                 links = treeData.descendants().slice(1);
           
             // Normalize for fixed-depth.
             nodes.forEach(function(d){ d.y = d.depth * 100});//Width of the layout so it doesn't spill out, change the number//
           
             // ****************** Nodes section ***************************
           
             // Update the nodes...
             var node = svg.selectAll('g.node')
                 .data(nodes, function(d) {return d.id || (d.id = ++i); });
           
             // Enter any new modes at the parent's previous position.
             var nodeEnter = node.enter().append('g')
                 .attr('class', 'node')
                 .attr("transform", function(d) {
                   return "translate(" + source.y0 + "," + source.x0 + ")";
               })
               .on('click', click);
           
             // Add Circle for the nodes
             nodeEnter.append('circle')
                 .attr('class', 'node')
                 .attr('r', 1e-6)
                 .style("fill", function(d) {
                     return d._children ? "lightsteelblue" : "#fff";
                 });
           
             // Add labels for the nodes
             nodeEnter.append('text')
                 .attr("dy", ".35em")
                 .attr("x", function(d) {
                     return d.children || d._children ? -13 : 13;
                 })
                 .attr("text-anchor", function(d) {
                     return d.children || d._children ? "end" : "start";
                 })
                 .text(function(d) { return d.data.name; });
           
             // UPDATE
             var nodeUpdate = nodeEnter.merge(node);
           
             // Transition to the proper position for the node
             nodeUpdate.transition()
               .duration(duration)
               .attr("transform", function(d) { 
                   return "translate(" + d.y + "," + d.x + ")";
                });
           
             // Update the node attributes and style
             nodeUpdate.select('circle.node')
               .attr('r', 6)
               .style("fill", function(d) {
                   return d._children ? "lightsteelblue" : "#fff";
               })
               .attr('cursor', 'pointer');
           
           
             // Remove any exiting nodes
             var nodeExit = node.exit().transition()
                 .duration(duration)
                 .attr("transform", function(d) {
                     return "translate(" + source.y + "," + source.x + ")";
                 })
                 .remove();
           
             // On exit reduce the node circles size to 0
             nodeExit.select('circle')
               .attr('r', 1e-6);
           
             // On exit reduce the opacity of text labels
             nodeExit.select('text')
               .style('fill-opacity', 1e-6);
           
             // ****************** links section ***************************
           
             // Update the links...
             var link = svg.selectAll('path.link')
                 .data(links, function(d) { return d.id; });
           
             // Enter any new links at the parent's previous position.
             var linkEnter = link.enter().insert('path', "g")
                 .attr("class", "link")
                 .attr('d', function(d){
                   var o = {x: source.x0, y: source.y0}
                   return diagonal(o, o)
                 });
           
             // UPDATE
             var linkUpdate = linkEnter.merge(link);
           
             // Transition back to the parent element position
             linkUpdate.transition()
                 .duration(duration)
                 .attr('d', function(d){ return diagonal(d, d.parent) });
           
             // Remove any exiting links
             var linkExit = link.exit().transition()
                 .duration(duration)
                 .attr('d', function(d) {
                   var o = {x: source.x, y: source.y}
                   return diagonal(o, o)
                 })
                 .remove();
           
             // Store the old positions for transition.
             nodes.forEach(function(d){
               d.x0 = d.x;
               d.y0 = d.y;
             });
           
             // Creates a curved (diagonal) path from parent to the child nodes
             function diagonal(s, d) {
           
              var path = `M ${s.y} ${s.x}
                       C ${(s.y + d.y) / 2} ${s.x},
                         ${(s.y + d.y) / 2} ${d.x},
                         ${d.y} ${d.x}`
           
               return path
             }

             function elbow(s, d) {  //Try later
               
              //var y = o.y(d)
              //var x = o.x(d)
              return "M" + d.source.y + "," + d.source.x
              + "V" + d.target.x + "H" + d.target.y;
              } //Try later

             // Toggle children on click.
             function click(d) {
               if (d.children) {
                   d._children = d.children;
                   d.children = null;
                 } else {
                   d.children = d._children;
                   d._children = null;
                 }
               update(d);
             }
           }
          }
}