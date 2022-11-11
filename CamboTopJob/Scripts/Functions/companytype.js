//action
$(document).ready(function () {
    //start and stop gif loading
    $(document).ajaxStart(function () {
        $('#loading-gif').addClass('show');
    }).ajaxStop(function () {
        $('#loading-gif').removeClass('show');
    });

    //show modal
    $('#companyTypeModal').on('show.bs.modal', function () {
        //call method GetCompanyType
        GetCompanyType();

        //disable input box
        document.getElementById('companyTypeName').disabled = true;
        $('#companyTypeName').val('');
        document.getElementById('btnCompanyType').innerText = "Add New";
    });
});

//===========================================================================
//Declare Variable
var tableCompanyTpe = [];

//GET:All Company Type
function GetCompanyType() {
    tableCompanyTpe = $('#companyTypeTable').DataTable({

        //get data from database by url's api all data
        ajax: {
            url: "/api/companyTypes",
            dataSrc: ""
        },

        //all column and action
        columns: [
            {
                data: "id"
            },
            {
                data: "name"
            },
            {
                data: "id",
                render: function (data) {
                    return "<button onclick= 'CompanyTypeEdit(" + data + ")' class= 'btn btn-warning btn-xs' >Edit</button> " + " <button onclick= 'CompanyTypeRemove(" + data + ")' class= 'btn btn-danger btn-xs' >Remove</button>";
                }
            }

        ],
        //allow delete
        destroy: true,

        //sort big to small
        order: [[0, "desc"]],

        //disable info 
        info: false

    });
}

//============================================================================
//Action Company Type
function CompanyTypeAction() {
    let actoin = "";
    //change value to text in buttun
    actoin = document.getElementById('btnCompanyType').innerText;
    
    //=============================================================
    if (actoin === "Add New") {
        //if click button Add New change text to Save Now
        document.getElementById('btnCompanyType').innerText = "Save Now";
        //enable input box
        document.getElementById('companyTypeName').disabled = false;
        //set focus in textbox
        $('#companyTypeName').focus();
    }


  //=============================================================
  //POST: Company Type
    else if (actoin === "Save Now") {

        if ($('#companyTypeName').val().trim() === "") {
            //set color to border textbox
            $('#companyTypeName').css('border-color', 'red');
            $('#companyTypeName').focus();
            //display message
            toastr.info("Please Enter Company Type's Name.", "Sever Response!");
        }

        else {
            $('#companyTypeName').css('border-color', '#cccccc');
            //get data from textbox
            let data = { Name: $('#companyTypeName').val() };

            $.ajax({
                //post data into database follow url's api
                url: "/api/companyTypes",
                //input data into object
                data: JSON.stringify(data),
                type: "POST",
                contentType: "application/json; charset = utf-8",
                dataType: "json",
                //function success ===============================================
                success: function (result) {
                    toastr.success("Company Type has been Crated Succefully!", "Server Resonse");
                    //reload data in table
                    tableCompanyTpe.ajax.reload();
                    //set Add New into button
                    document.getElementById('btnCompanyType').innerText = "Add New";
                    $('#companyTypeName').val('');
                },
                //function error ===============================================
                error: function (errormessage) {
                   toastr.error("This Company Type is Already Exists in Database!", "Server Resonse");
                }
            });
        }
       
    }


   //=================================================
  //PUT: Company Type
    else if (actoin === "Update Now") {

        if ($('#companyTypeName').val().trim() === "") {
            //set color to border textbox
            $('#companyTypeName').css('border-color', 'red');
            $('#companyTypeName').focus();
            //display message
            toastr.info("Please Enter Company Type's Name.", "Sever Response!");
        }

        else {
            $('#companyTypeName').css('border-color', '#cccccc');
            //get data from textbox
            let data = {
                Id: $('#companyTypeId').val(),
                Name: $('#companyTypeName').val()
            };

            $.ajax({
                //post data into database follow url's api
                url: "/api/companyTypes/"+ data.Id,
                //input data into object
                data: JSON.stringify(data),
                type: "PUT",
                contentType: "application/json; charset = utf-8",
                dataType: "json",

                //function success ===============================================
                success: function (result) {
                    toastr.success("Company Type has been Updated Succefully!", "Server Resonse");
                    //reload data in table
                    tableCompanyTpe.ajax.reload();
                    //set Add New into button
                    document.getElementById('btnCompanyType').innerText = "Add New";
                    $('#companyTypeName').val('');
                    document.getElementById('companyTypeName').disabled = true;
                },
                //function error ===============================================
                error: function (errormessage) {
                    toastr.error("This Company Type is Already Exists in Database!", "Server Resonse");
                }
            });
        }

    }
   
}



//============================================================================
//GET: Company Type by Id
function CompanyTypeEdit(id) {
    $.ajax({
        //get data from database follow url's api by id
        url: "/api/companyTypes/"+ id,
        //input data into object
        type: "GET",
        contentType: "application/json; charset = utf-8",
        dataType: "json",
        //function success ===============================================
        success: function (result) {
            $('#companyTypeId').val(result.id);
            $('#companyTypeName').val(result.name);

            //set Add New into button
            document.getElementById('btnCompanyType').innerText = "Update Now";
            document.getElementById('companyTypeName').disabled = false;
            $('#companyTypeName').focus();

        },
        //function error ===============================================
        error: function (errormessage) {
            toastr.error("Unexpected happened", "Server Resonse");
        }
    });
}

//======================================================================
//DELETE: Company Type by Id
function CompanyTypeRemove(id) {
    bootbox.confirm({
        title: "Comfirmation!",
        message: "Are You Sure Want to DELETE this Data?",
        button: {
            cancel: {
                label:"Cancel",
                className: "btn-default"
            },
            comfirm: {
                label: "Delete",
                className: "btn-danger"
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    //get data from database follow url's api by id
                    url: "/api/companyTypes/" + id,
                    //input data into object
                    type: "DELETE",
                    contentType: "application/json; charset = utf-8",
                    dataType: "json",
                    //function success ===============================================
                    success: function (result) {
                        tableCompanyTpe.ajax.reload();
                        toastr.success("Company Type has been Deleted Succefully!", "Server Resonse");

                    },
                    //function error ===============================================
                    error: function (errormessage) {
                        toastr.error("Unexpected happened", "Server Resonse");
                    }
                });
            }

            //==================================================================
            else {
                toastr.warning("The Data is Safety!", "Server Resonse");
            }
        }
    });
}