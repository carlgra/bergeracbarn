/**
 * Lists the entries from the specified JSON feed
 * by creating a new 'dl' element in the DOM.
 * Each 'dt' is the title of the row, and each 'dd' 
 * is the content of the row. 
 */
function listEntries(json) {

  removeOldResults();
  
  var dl = document.createElement('dl');
  dl.setAttribute('id', 'output');

  for (var i = 0; i < json.feed.entry.length; i++) {
    
    var entry = json.feed.entry[i];
    
    var dt = document.createElement('dt');
    var title = document.createTextNode(entry.title.$t);
    dt.appendChild(title);
    
    var dd = document.createElement('dd');
    var content = document.createTextNode(entry.content.$t);
    dd.appendChild(content);
  
    dl.appendChild(dt);
    dl.appendChild(dd);
  }

  document.getElementById('data').appendChild(dl);

  // Re-enable the ok button.
  var ok_button = document.getElementById('ok_button');
  ok_button.removeAttribute('disabled');
}

/**
 * Lists the entries from the specified JSON feed
 * by inserting the cells into a new 'table' 
 * element in the DOM.  Each 'tr' represents a 
 * row in the spreadsheet, and each 'td' is a cell
 * within that row.
 */
function cellEntries(json) {
	
  removeOldResults();

  var table = document.createElement('table');
  table.setAttribute('id', 'output');
  var tbody = document.createElement('tbody');
  
  var tr ;
  var row = 0;
  for (var i=0; i < json.feed.entry.length; i++) {

    var entry = json.feed.entry[i];
    if (entry.gs$cell.col == '1') {
      if (tr != null) {
        table.appendChild(tr);
      }

      tr = document.createElement('tr');
      row ++ ;
    }
    var td ;
    if ( row == 1 ){
	    td = document.createElement('th');

    }else{
	     
    	td = document.createElement('td');
	}
    td.appendChild(document.createTextNode(entry.content.$t));
    
    tr.appendChild(td);
  } 
 
  tbody.appendChild(tr);
  table.appendChild(tbody);

  document.getElementById('data').appendChild(table);
 }

/**
 * Called when the user clicks the 'OK' button to
 * retrieve a spreadsheet's JSON feed.  Creates a new 
 * script element in the DOM whose source is the JSON feed, 
 * and specifies that the callback function is 
 * 'listEntries' for a list feed and 'cellEntries' for a
 * cells feed (above).
 */
function displayResults(query, spreadsheet, worksheet) {
  removeOldJSONScriptNodes();
  removeOldResults();

  // Retrieve the JSON feed.
  var script = document.createElement('script');

  script.setAttribute('src', 'http://spreadsheets.google.com/feeds/'
                         + 'cells'
                         + '/' + spreadsheet
                           + '/' + worksheet + '/public/values' +
                        '?alt=json-in-script&callback=cellEntries');
//                       
  
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);;
}

/**
 * Removes the script element from the previous result.
 */
function removeOldJSONScriptNodes() {
  var jsonScript = document.getElementById('jsonScript');
  if (jsonScript) {
    jsonScript.parentNode.removeChild(jsonScript);
  }
}

/**
 * Removes the output generated from the previous result.
 */
function removeOldResults() {
  var div = document.getElementById('data');
  if (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
