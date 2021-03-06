angular.module('streamalong')
    .controller('statsCtrl', ($scope, user) => {
        $scope.user = user.data;



        function tooltipHtml(n, d) {
            return "<h4>" + n + "</h4><table>" +
                "<tr><td>Case Workers</td><td>" + (d.caseWorkers) + "</td></tr>" +
                "<tr><td>Youth</td><td>" + (d.youth) + "</td></tr>" +
                "<tr><td>Youth/Case Worker</td><td>" + (d.avg) + "</td></tr>" +
                "</table>" + "<h5>Per 100,000 people</h5>";
        }

        let sampleData = {};
        ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
            "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
            "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
            "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
            "WI", "MO", "AR", "OK", "KS", "LS", "VA"
        ]
        .forEach((d) => {
            var caseWorkers = Math.round(100 * Math.random()),
                youth = Math.round(500 * Math.random());
            sampleData[d] = {
                caseWorkers: d3.min([caseWorkers, youth]),
                youth: d3.max([caseWorkers, youth]),
                avg: Math.round((youth / caseWorkers)),
                color: d3.interpolate("#ffffcc", "#800026")(youth / 500)
            };
        });

        uStates.draw("#statesvg", sampleData, tooltipHtml);

        d3.select(self.frameElement).style("height", "90%")
            .style("width", "90%");

        d3.select("#statesvg")
            .append("div")
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            //responsive SVG needs these 2 attributes and no width and height attr
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 600 400")
            //class to make it responsive
            .classed("svg-content-responsive", true);
    });
