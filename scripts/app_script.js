// Supplier's View

// Instatiates a variable for the "Database"
var MyDB = {};

MyDB.arrSuppliers = [   // Declaration of an array of Customers objects (following the ERD fields)
    { "custFName": "Anna",      "custLName": "Fedorova",    "custStreet": "Robson Street",  "custCity": "Welland",      "custProv": "Ontario",  "custPhone": "9055652958",  "custEmail": "afed@outlook.com" },
    { "custFName": "Héloïse",   "custLName": "de Jenlis",   "custStreet": "Sussex Drive",   "custCity": "Calgary",      "custProv": "Alberta",  "custPhone": "6477544337",  "custEmail": "hdejenlis@outlook.com" },
    { "custFName": "Janine",    "custLName": "Jansen",      "custStreet": "Pearl Street",   "custCity": "Thorold",      "custProv": "Ontario",  "custPhone": "3063672890",  "custEmail": "jjansen@outlook.com" },
    { "custFName": "Linus",     "custLName": "Torvalds",    "custStreet": "Wellington Ave", "custCity": "Vancouver",    "custProv": "B.C.",     "custPhone": "2048574851",  "custEmail": "ltorvalds@outlook.com" },
    { "custFName": "George",    "custLName": "McKenna",     "custStreet": "Jasper Avenue",  "custCity": "Guelph",       "custProv": "Ontario",  "custPhone": "7058843519",  "custEmail": "gmckenna@outlook.com" },
    { "custFName": "Joshua",    "custLName": "Mann",        "custStreet": "King Street",    "custCity": "Edmonton",     "custProv": "Alberta",  "custPhone": "6132413530",  "custEmail": "jmann@outlook.com" },
    { "custFName": "Sam",       "custLName": "Banks",       "custStreet": "Isabella Street","custCity": "Reed Deer",    "custProv": "Alberta",  "custPhone": "4183515729",  "custEmail": "sbanks@outlook.com" },
    { "custFName": "Sidney",    "custLName": "Watss",       "custStreet": "Whitmore Road",  "custCity": "Toronto",      "custProv": "Ontario",  "custPhone": "6476953263",  "custEmail": "swatss@outlook.com" },
    { "custFName": "Erin",      "custLName": "Gray",        "custStreet": "Royal Avenue",   "custCity": "Victoria",     "custProv": "B.C.",     "custPhone": "4168400268",  "custEmail": "egray@outlook.com" },
    { "custFName": "Amber",     "custLName": "Pearce",      "custStreet": "Leslie Street",  "custCity": "Arctic Bay",   "custProv": "Nunavut",  "custPhone": "6042093556",  "custEmail": "apearce@outlook.com" },
    { "custFName": "Katie",     "custLName": "Holmes",      "custStreet": "James Street",   "custCity": "Winnipeg",     "custProv": "Manitoba", "custPhone": "4183457823",  "custEmail": "kholmes@outlook.com" },
    { "custFName": "Quinn",     "custLName": "Hunter",      "custStreet": "Stoney Creek",   "custCity": "Kitchener",    "custProv": "Ontario",  "custPhone": "9057374900",  "custEmail": "qhunter@outlook.com" },
    { "custFName": "Jude",      "custLName": "Keller",      "custStreet": "Campbell Road",  "custCity": "Summerside",   "custProv": "P.E.I.",   "custPhone": "4167929236",  "custEmail": "jkeller@outlook.com" }
];

// Gets the HTML elements
let lblcustFName = document.getElementById("custFName");
let lblcustLName = document.getElementById("custLName");

let lblcustStreet = document.getElementById("custStreet");
let lblcustCity = document.getElementById("custCity");
let lblcustProv = document.getElementById("custProv");
let lblcustPhone = document.getElementById("custPhone");

let lblcustEmail = document.getElementById("custEmail");

let tableSmall = document.getElementById("myTable");
let myStatus = document.getElementById("lblStatus");

let arraySearch = [-1];
let selectedRecord;


// Before leaving the current page, saves the "Database" into the 'sessionStorage'
// This is not needed according to the Project's requirements
window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("jsArray", JSON.stringify(MyDB));
});

// Does a Search and creates an array with the Indexes of the matching elements
function doSearch() {

    document.getElementById("collapseDetails").className = "collapse"; // Hides the section
    myStatus.textContent = "";
    arraySearch = [];       // Empties the array
    let lblSearchString = document.getElementById("txtSearch").value;

    if (lblSearchString == "")  // If the Search string is empty
    {
        arraySearch = [-1];     // Reset the Search by applying a -1
    }
    else                        // Otherwise look for matches
    {   // Looks for FistName, LastName, e-mail and phone
        for (var i = 0; i < MyDB.arrSuppliers.length; i++) {
            if (MyDB.arrSuppliers[i].custFName.toLowerCase().includes(lblSearchString.toLowerCase()) ||
                MyDB.arrSuppliers[i].custLName.toLowerCase().includes(lblSearchString.toLowerCase()) ||
                MyDB.arrSuppliers[i].custEmail.toLowerCase().includes(lblSearchString.toLowerCase()) ||
                MyDB.arrSuppliers[i].custPhone.includes(lblSearchString.toLowerCase())
                ) {
                arraySearch.push(i);    // Includes the match in the array
            }
        }
        if (arraySearch.length == 0) {
            myStatus.textContent = `The search for '${lblSearchString}' did not return any results`;
        }
    }
    UpdateData();   // Calls the function that creates the tables
}

// 'Enter' key pressed on the Search Bar, it'll trigger the btnSearch click event
document.getElementById("txtSearch").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
      event.preventDefault();                       // Cancels the default action, if needed
      document.getElementById("btnSearch").click(); // Triggers the button element with a click
    }

  }); 

// 'Search' button that calls the search function
document.getElementById("btnSearch").addEventListener("click", doSearch);

// 'Clear' button that clears the search textbox and calls the search function
document.getElementById("btnClrSrch").addEventListener("click", function () {
    document.getElementById("txtSearch").value = "";
    doSearch();
});

// 'Add Supplier' button that shows the Edit section
document.getElementById("btnNew").addEventListener("click", function () {

    document.getElementById("btnCreate").hidden = false;// Shows the button        
    document.getElementById("btnSave").hidden = true;   // Hides the button
    document.getElementById("btnCancelEdit").innerHTML = "Cancel";  // Updates the caption of the button

    ClearLabels();  // Calls a function to clear the labels

    // Populate the inputs with sample values
    lblcustFName.value = "John";
    lblcustLName.value = "Doe";
    lblcustStreet.value = "James Street";
    lblcustCity.value = "Toronto";
    lblcustProv.value = "Ontario";
    lblcustPhone.value = "";
    lblcustEmail.value = "";

    document.getElementById("collapseDetails").className = "collapse show";

});


// 'Edit' button / Function that shows the Details (collapsible) of the current record
function funcDetails(idx) {
    myStatus.textContent = `Ready . . .`;
    document.getElementById("btnCreate").hidden = true; // Hides the button
    document.getElementById("btnSave").hidden = true;   // Hides the button    
    document.getElementById("btnCancelEdit").innerHTML = "Close";   // Changes the caption of the button from 'Cancel' to 'Close'

    // Loads the details in the TextBoxes    
    loadDetails(idx);
}

// 'Edit' button / Function that shows the Details (collapsible) of the current record
function funcEdit(idx) {
    myStatus.textContent = `Ready . . .`;
    document.getElementById("btnCreate").hidden = true; // Hides the button
    document.getElementById("btnSave").hidden = false;  // Shows the button
    document.getElementById("btnCancelEdit").innerHTML = "Cancel";  // Updates the caption of the button    

    // Loads the details in the TextBoxes    
    loadDetails(idx);
}

// 'Delete' button / Function that deletes the current record
function funcDelete(idx) {
    myStatus.textContent = `Ready . . .`;
    nameToDelete = MyDB.arrSuppliers[idx].custFName + " " + MyDB.arrSuppliers[idx].custLName; // Stores the name to delete

    if (confirm(`Are you sure you want to delete the '${nameToDelete}' customer?`)) {
        MyDB.arrSuppliers.splice(idx, 1);    // Remove the value from the array and shift it

        ClearLabels();      // Calls a function to clear the labels
        doSearch();         // Redoes the Search
        myStatus.innerHTML = `The customer <text class="text-danger">'${nameToDelete}'</text> has been sucessfully deleted`;
        document.getElementById("collapseDetails").className = "collapse";
    }
}

// Function that shows the Details (collapsible) of the current record
function loadDetails(idx) {

    selectedRecord = idx;

    // Loads the details in the TextBoxes
    lblcustFName.value = MyDB.arrSuppliers[idx].custFName;
    lblcustLName.value = MyDB.arrSuppliers[idx].custLName;
    lblcustStreet.value = MyDB.arrSuppliers[idx].custStreet;
    lblcustCity.value = MyDB.arrSuppliers[idx].custCity;
    lblcustProv.value = MyDB.arrSuppliers[idx].custProv;
    lblcustPhone.value = MyDB.arrSuppliers[idx].custPhone;
    lblcustEmail.value = MyDB.arrSuppliers[idx].custEmail;

    // Shows the section of details
    document.getElementById("collapseDetails").className = "collapse show"; // Shows the section
}

// The <form> is used to validate the inputs and after that is completed, it jumps to this function and
//  executes the Create or Save functions
function formSubmit() {
    // Gets the ID of the button clicked in the form
    let btnPressed = document.querySelector('button[type="submit"]:focus').id;

    if (btnPressed == "btnCreate")
        funcCreate();
    else if (btnPressed == "btnSave")
        funcSave();

    // The next code in the HTML <form> prevents that the page reloads after the form is submitted,
    //  and therefore to lose the current values of MyDB
    //      <form id="frmDetails" class="form" onsubmit="formSubmit(); return false">
    //});
}

// 'Create' button. Creates a new record
//document.getElementById("btnCreate").addEventListener("click", function () {
function funcCreate() {
    // Adds a new Supplier object
    MyDB.arrSuppliers[MyDB.arrSuppliers.length] = {
        "custFName":    lblcustFName.value,
        "custStreet":   lblcustStreet.value,
        "custCity":     lblcustCity.value,
        "custProv":     lblcustProv.value,
        "custPhone":    lblcustPhone.value,
        "custLName":    lblcustLName.value,
        "custEmail":    lblcustEmail.value
    }
    nameToAdd = lblcustFName.value + " " + lblcustLName.value;
    UpdateData();   // Calls a function to Update the DDL
    ClearLabels();  // Calls a function to clear the labels
    document.getElementById("collapseDetails").className = "collapse";
    document.getElementById("btnSave").disabled = false;    // Enables the button
    myStatus.innerHTML = `The customer <text class="text-danger">'${nameToAdd}'</text> has been sucessfully created`;

    //});
}

// 'Save' button. "Updates" an existing record
function funcSave() {
    // Gets the Index of the Current Supplier selected
    //let idx = document.getElementById("ddlSupplier").value;
    let idx = selectedRecord;

    // "Updates" a Supplier object by loading again its values
    MyDB.arrSuppliers[idx] = {
        "custFName":    lblcustFName.value,
        "custStreet":   lblcustStreet.value,
        "custCity":     lblcustCity.value,
        "custProv":     lblcustProv.value,
        "custPhone":    lblcustPhone.value,
        "custLName":    lblcustLName.value,
        "custEmail":    lblcustEmail.value
    }
    nameToAdd = lblcustFName.value + " " + lblcustLName.value;
    doSearch();     // Redoes the Search
    ClearLabels();  // Calls a function to clear the labels
    myStatus.innerHTML = `The customer <text class="text-danger">'${nameToAdd}'</text> has been sucessfully edited`;
    document.getElementById("collapseDetails").className = "collapse";
    UpdateData();
    //}, false);
}

// Hides (collapse) the Details section
document.getElementById("btnCancelEdit").addEventListener("click", function () {
    myStatus.textContent = `Ready . . .`;
    document.getElementById("collapseDetails").className = "collapse";
    document.getElementById("btnSave").disabled = false;    // Enables the button
});

// Clears the labels
function ClearLabels() {
    lblcustFName.value = "";
    lblcustStreet.value = "";
    lblcustCity.value = "";
    lblcustProv.value = "";
    lblcustPhone.value = "";
    lblcustLName.value = "";
    lblcustEmail.value = "";
}

/////////////////////////////
// Paging function. It needs:
//   - A body table with ID: <tbody id="myTable">
//   - A ul to contain the page numbers with id: <ul id="myPager" class="pagination">

$.fn.pageMe = function (opts) {
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector != "undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector != "undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.length;
    var numPages = Math.ceil(numItems / perPage);

    pager.data("curr", 0);

    if (settings.showPrevNext) {
        $('<li><a href="#" class="prev_link page-link">Previous</a></li>').appendTo(pager);
    }

    var curr = 0;
    while (numPages > curr && (settings.hidePageNumbers == false)) {
        $('<li><a href="#" class="page_link page-link">' + (curr + 1) + '</a></li>').appendTo(pager);
        curr++;
    }

    if (settings.showPrevNext) {
        $('<li><a href="#" class="next_link page-link">Next</a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages <= 1) {
        pager.find('.next_link').hide();
    }
    pager.children().eq(1).addClass("active");

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function () {
        var clickedPage = $(this).html().valueOf() - 1;
        document.getElementById("collapseDetails").className = "collapse"; // Closes the Section Details
        goTo(clickedPage, perPage);
        return false;
    });
    pager.find('li .prev_link').click(function () {
        previous();
        return false;
    });
    pager.find('li .next_link').click(function () {
        document.getElementById("collapseDetails").className = "collapse";  // Closes the Section Details
        next();
        return false;
    });

    function previous() {
        var goToPage = parseInt(pager.data("curr")) - 1;
        document.getElementById("collapseDetails").className = "collapse";  // Closes the Section Details
        goTo(goToPage);
    }

    function next() {
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page) {
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display', 'none').slice(startAt, endOn).show();

        if (page >= 1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }

        if (page < (numPages - 1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }

        pager.data("curr", page);
        pager.children().removeClass("active");
        pager.children().eq(page + 1).addClass("active");
    }
};

// Creates/Updates the tables and invokes the pagination
function UpdateData() {

    tableSmall.innerHTML = "";  // Clears the small table

    // Sorts the array of object by the 'name' of the supplier to load them in order in the DDL
    MyDB.arrSuppliers.sort((a, b) => a.custFName.localeCompare(b.custFName))


    // This section decides to Hide or Show the table's header
    if (arraySearch.length != 0)    // If the array contains something
        document.getElementById("myTableHead").hidden = false;  // Shows the table's header
    else
        document.getElementById("myTableHead").hidden = true;   // Hides the table's header by default

    // This sections loops through the array of Suppliers
    for (var i = 0; i < MyDB.arrSuppliers.length; i++) {

        // If the array returned by the Search function contains the 'i' record, then is included in the Name's table
        //  that shows the name of Suppliers and generates the Edit & Delete buttons for each row
        if (arraySearch.includes(i) || arraySearch.includes(-1)) {

            // Creates the large table's content
            var trEl = document.createElement("tr");

            // Loads the Data in the row
            trEl.innerHTML = "<td style='width: 12rem; padding-left: 1rem;'>" + [
                `${MyDB.arrSuppliers[i].custFName} ${MyDB.arrSuppliers[i].custLName}`,
                `<a href="tel:+1${MyDB.arrSuppliers[i].custPhone}">${formatPhoneNumber(MyDB.arrSuppliers[i].custPhone)}</a>`,
                `<a href="mailto:${MyDB.arrSuppliers[i].custEmail}">${MyDB.arrSuppliers[i].custEmail}</a>`,
                `<button type="button" name="detailsButton" value="${i}" onclick="funcDetails(${i});" class="btn btn-outline-dark btn-sm">Details</button>
                 <button type="button" name="editButton" value="${i}" onclick="funcEdit(${i});" class="btn btn-outline-primary btn-sm">Edit</button>
                 <button type="button" name="deleteButton" value="${i}" onclick="funcDelete(${i});" class="btn btn-outline-danger btn-sm">Delete</button>`
            ].join("</td><td class='text-center' style='padding-left: 1rem;'>") + "</td>";
            tableSmall.appendChild(trEl);    // Appends the row to the table
        }
    }
    // Empties the pager section before executing the pagination of the newly created Name's table
    document.getElementById("myPager").innerHTML = "";

    // This code paginates the Table and has to be executed after the table body is fully created
    $('#myTable').pageMe({ pagerSelector: '#myPager', showPrevNext: true, hidePageNumbers: false, perPage: 5 });
}

// This function formats the Phone number to be displayed
let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
  };


// Entry point of the Program
UpdateData();   // Updates the Data to display on screen


