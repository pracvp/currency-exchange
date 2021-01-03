
/*
const curr=['EUR','INR','USD'];
var i=0,j=0;
var l=curr.length;
const rates = new Array(l).fill(1).map(() => new Array(l).fill(1));

for(i=0;i<l;i++)
{
	for(j=0;j<l;j++)
	{
const from=curr[i];
const to=curr[j];

const settings = {
	"async": true,
	"crossDomain": true,
    "url": "https://currency-exchange.p.rapidapi.com/exchange?from="+from+"&to="+to+"&q=1.0",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dadf192566msh75f471517bff13bp1ec328jsnbefea920a77f",
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com"
	}
};

const t=i;
const s=j;
$.ajax(settings).done(function (response) {
	const x=response;
rates[t][s]=x;

});


}
}

console.log(rates);
 */
$(document).ready(function() {
	// add an event listener (performSearch) to the form
	$("#query-form").submit(function(event) { performSearch(event); });
});

function performSearch(event) {

	// Variable to hold request
	var request;

	// Prevent default posting of form - put here to work in case of errors
	event.preventDefault();

	// Abort any pending request
	if (request) {
		request.abort();
	}
	// setup some local variables
	var $form = $(this);

	// disable the inputs and buttons for the duration of the request.
	//setFormDisabledProps(true);

	$("#search-results-heading").text("Searching ...");
	$("#results").text("");

	// Send the request
const r= $("#source").val();
const p= $("#curr").val()
console.log(r);
console.log(p);


var curr = new Array();
// This will return an array with strings "1", "2", etc.
curr = p.split(",");

curr.push(r);


var i=0,j=0;
var l=curr.length;
const rates = new Array(l).fill(1).map(() => new Array(l).fill(1));
var edges=[];
for(i=0;i<l;i++)
{
	for(j=0;j<l;j++)
	{
const from=curr[i];
const to=curr[j];

const settings = {
	"async": true,
	"crossDomain": true,
    "url": "https://currency-exchange.p.rapidapi.com/exchange?from="+from+"&to="+to+"&q=1.0",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dadf192566msh75f471517bff13bp1ec328jsnbefea920a77f",
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com"
	}
};

const t=i;
const s=j;
$.ajax(settings).done(function (response) {
	const x=response;
var d=[];
d.push(t);
d.push(s);
d.push(-Math.log(x));
if(t!=s)
edges.push(d);
rates[t][s]=(x);

});
}
}
i=0;
j=0;
var dist=new Array(l);
var prev=new Array(l);
for ( i = 0; i < l; i++)
        dist[i] = Number.MAX_SAFE_INTEGER;
	dist[r] = 0;
	i=1;
	j=0;
for ( i = 1; i <= l - 1; i++) {
    for ( j = 0; j < edges.length; j++) {
        var u = edges[j][0];
        var v = edges[j][1];
        var weight = edges[j][2];
        if (dist[u] != Number.MAX_SAFE_INTEGER && dist[u] + weight < dist[v]) 
		   { dist[v] = dist[u] + weight;
			prev[v]=u;}
    }
}
var C = -1;
for ( j = 0; j < edges.length; j++) {
	var u = edges[j][0];
	var v = edges[j][1];
	var weight = edges[j][2];
	if (dist[u] != Number.MAX_SAFE_INTEGER && dist[u] + weight < dist[v]) 
	   { c=v;
		break;}
}

if (C != -1) {
	for (var i = 0; i < l; i++)
		C = prev[C];

	// To store the cycle vertex
	var cycle=[];
	for (var v = C;; v = prev[v]) {

		cycle.push(v);
		if (v == C
			&& cycle.length() > 1)
			break;
	}

for(var num=cycle.length()-1;num>=0;num--)
{
	console.log(cycle[num]);
}
$("#search-results-heading").text("Arbitrage found ...");
}
$("#search-results-heading").text("Arbitrage not found ...");

console.log(edges);
console.log(rates);
}






