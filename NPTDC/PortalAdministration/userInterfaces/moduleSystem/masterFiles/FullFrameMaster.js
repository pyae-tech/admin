// for loading
$.cookie('lan', 'mm', { expires: 1, path: '/' });
$(document).ajaxStart(function () { Pace.restart(); });
$(document).ready(function () {
    //alert
    toastr.options = {
        "debug": false,
        "newestOnTop": true,
        "timeOut": 30,
        "positionClass": "toast-bottom-right",
        "closeButton": true,
        "progressBar": true
    };
    $('#div_confirmation').modal({ show: false })
    $('#div_error_message').modal({ show: false })
    $('#div_message').modal({ show: false })
    $('#lang').val('english');
});


function ShowConfirmation(Message, ContinueFunction) {
    ShowConfirmation(Message, ContinueFunction, null);
}
function ShowConfirmation(Message, ContinueFunction, Paramenter1) {
    $('#confirmation_message').html(Message);
    $('#div_confirmation').modal('show');
    $('#btn_confirmation_yes').on("click", function () {
        if (Paramenter1 == null || Paramenter1 == undefined)
            window[ContinueFunction]();
        else if (Paramenter1 != null || Paramenter1 != undefined)
            window[ContinueFunction](Paramenter1);
        $('#div_confirmation').modal('hide');
    });
}

function ShowQuestionBox(Message, YesFunction, Paramenter1, NoFunction, NoParamenter1) {
    $('#confirmation_message').html(Message);
    $('#div_confirmation').modal('show');
    //$('#btn_confirmation_yes').bind("click", function () {
    //    if (Paramenter1 == null || Paramenter1 == "")
    //        window[YesFunction]();
    //    else
    //        window[YesFunction](Paramenter1);
    //    $('#div_confirmation').modal('hide');
    //});
    //$('#btn_confirmation_no').bind("click", function () {
    //    if (NoParamenter1 == null || NoParamenter1 == "")
    //        window[NoFunction]();
    //    //if (NoParamenter1 != null || NoParamenter1 != "")
    //    else
    //        window[NoFunction](NoParamenter1);
    //    $('#div_confirmation').modal('hide');
    //});
    $(document).off('click', '#btn_confirmation_yes').on('click', '#btn_confirmation_yes', function (e) {
        if (Paramenter1 == null || Paramenter1 == "")
            window[YesFunction]();
        else
            window[YesFunction](Paramenter1);
        $('#div_confirmation').modal('hide');
    });
    $(document).off('click', '#btn_confirmation_no').on('click', '#btn_confirmation_no', function (e) {
        if (NoParamenter1 == null || NoParamenter1 == "")
            window[NoFunction]();
        else
            window[NoFunction](NoParamenter1);
        $('#div_confirmation').modal('hide');
    });

}


function ShowBoxMessage(Message) {
    $('#message_box_message').html(Message);
    $('#div_message').modal('show');
}

function ShowErrorBoxMessage(Message) {
    $('#error_box_message').val(Message);
    $('#dialogBox_Error').modal('show');
}


if ($.cookie('userid') == null ||
    $.cookie('userid') == "" ||
    $.cookie('orgName') == "") {
    
  GotoPage("portal/login");
}
else {
    $('.lbl_shopname').html($.cookie('StoreName'));
    $('.username').html($.cookie('username'));
    $('.useremail').html($.cookie('orgName'));
    $('.usertype').html($.cookie('reftype'));
    $('.orgname').html($.cookie('orgName'));
    $('.user').html($.cookie('username'));
    BuiltModuleMenu();

}

function BuiltModuleMenu() {
    var menu_arr = [];   
    menu_arr=JSON.parse(localStorage.getItem('module_menu'));
    $.each(menu_arr, function (key, val) {
        switch (menu_arr[key]['Node']) {
            case "Cash Flow":
                $('#cash_flow').replaceWith(menu_arr[key]['childs']);
                break;
            case "Van Sale":
                $('#van_sale').replaceWith(menu_arr[key]['childs']);
                break;
            case "Sale Book":
                $('#sale_book').replaceWith(menu_arr[key]['childs']);
                break;
            case "Marketing Scout":
                $('#marketing_scout').replaceWith(menu_arr[key]['childs']);
                break;
            case "Account Book":
                $('#accout_book').replaceWith(menu_arr[key]['childs']);
                break;
            case "Report Book":
                $('#reporting_flow').replaceWith(menu_arr[key]['childs']);
                break;
            case "Master Book":
                $('#master_book').replaceWith(menu_arr[key]['childs']);
                break;
            default:
                break;
        }
        
        
    });
}
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

BuiltMainMenu();
function BuiltMainMenu() {


    if ($.cookie('roleCode') == "SBS-SA") {
        $('#menu_setting').css("display", "block");
        $('#aside-container').css("display", "block"); 
    }
    else {
        $('#menu_setting').css("display", "none");
        $('#aside-container').css("display", "none");
    }


    var menu_arr = []; var mybr = document.createElement('br');
    var remove_menu_arr = ["#ffm_Cash_Flow", "#ffm_VanSale", "#ffm_Sale_Book", "#ffm_marketing",
        "#ffm_account", "#ffm_master", "#ffm_reporting"];
    menu_arr = JSON.parse(localStorage.getItem('main_menu'));
    $.each(menu_arr, function (key, val) {
        switch (menu_arr[key]['Node']) {
            case "Cash Flow":
                $('#ffm_Cash_Flow').html(menu_arr[key]['childs']);
                $('#ffm_Cash_Flow').css("display", "block");              
                remove_menu_arr.remove("#ffm_Cash_Flow");  
                break;
            case "Van Sale":
                $('#ffm_VanSale').html(menu_arr[key]['childs']); 
                $('#ffm_VanSale').css("display", "block");
                remove_menu_arr.remove("#ffm_VanSale"); 
                break;
            case "Sale Book":
                $('#ffm_Sale_Book').html(menu_arr[key]['childs']); 
                $('#ffm_Sale_Book').css("display", "block");
                $('#ffm_Sale_Book').append("<br>");
                remove_menu_arr.remove("#ffm_Sale_Book"); 
                break;
            case "Marketing Scout":
                $('#ffm_marketing').html(menu_arr[key]['childs']); 
                $('#ffm_marketing').css("display", "block");
                $('#ffm_marketing').append("<br>");
                remove_menu_arr.remove("#ffm_marketing");  
                break;
            case "Account Book":
                $('#ffm_account').html(menu_arr[key]['childs']); 
                $('#ffm_account').css("display", "block");
                remove_menu_arr.remove("#ffm_account"); 
                break;
            case "Master Book":
                $('#ffm_master').html(menu_arr[key]['childs']); 
                $('#ffm_master').css("display", "block");
                remove_menu_arr.remove("#ffm_master");  
                break;            
            case "Report Book":
                $('#ffm_reporting').html(menu_arr[key]['childs']);
                $('#ffm_reporting').css("display", "block");
                remove_menu_arr.remove("#ffm_reporting");  
                break;
            default:
                break;        
        }

    });
    for (var i = 0; i < remove_menu_arr.length; i++) {
        $(remove_menu_arr[i]).remove();
    }
}

function get_current_user_id() {
    return $.cookie('userid');
}

function get_current_Customer_id() {
    return $.cookie('CustomerID');
}

function get_current_Customer_Name() {
    return $.cookie('CustomerNameEng');
}

function get_current_store_id() {
    return $.cookie('refid');
}
function get_current_user_org_id() {
    return $.cookie('orgID');
}

function get_current_user_org_Type() {
    return $.cookie('orgType');
}

function get_current_organization_title() {
    return $.cookie('orgCode') + " | ";
}

function get_current_organization_InvoiceType() {
    return $.cookie('InvoiceType');
}

populate_user_menu();
function populate_user_menu() {

    access_menus = $.cookie('rolemenu');

    if ($.cookie('reftype') == 'Admin') {
        $('#menu-admin').show();
    } else if ($.cookie('reftype') == 'Agent') {
        $('#menu-agent').show();
    }
    if (access_menus != "") {
        access_menus = access_menus.split('\n');
        $('.menu-access').hide();
        for (i = 0; i < access_menus.length; i++) {
            $("." + access_menus[i]).show();
        }
    }
}

//count down
var login_expired_min = 15;
//var x = setInterval(function () { 
//    login_expired_min = login_expired_min - 1;   
//    if (login_expired_min ==0) {    
//        clearInterval(x);
//        logout('dologout');
//    }     

//}, 60000);// 1 min interval


function logout(value) {
    isclicklogout = false;
    if (value == 'dologout')
        isclicklogout = true;

    $.ajax({
        url: baseUrl() + "WebServices/WebService_System.asmx/do_logout",
        data: "{ " +
        "'isclicklogout':'" + isclicklogout + "' " +
        ",'userid':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $.cookie('userid', "", { expires: 1, path: '/' });
                $.cookie('usercode', "", { expires: 1, path: '/' });
                $.cookie('username', "", { expires: 1, path: '/' });
                $.cookie('refid', "", { expires: 1, path: '/' });
                $.cookie('reftype', "", { expires: 1, path: '/' });
                $.cookie('roleid', "", { expires: 1, path: '/' });
                $.cookie('rolename', "", { expires: 1, path: '/' });
                $.cookie('rolemenu', "", { expires: 1, path: '/' });
                $.cookie('StoreName', "", { expires: 1, path: '/' });
                $.cookie('orgName', "", { expires: 1, path: '/' });
                $.cookie('orgID', "", { expires: 1, path: '/' });
                localStorage.clear();
                sessionStorage.clear();
                if (value == 'dologout') {

                    ShowInfoLoginMessage("Session is expired. Please login.");
                }
                else {
                    GotoPage('portal/login');
                }

            }
            else if (data.d.toString().split('~')[0] != "Error") {
                ShowErrorMessage(data.d.toString().split('~')[1]);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}

function ShowInfoLoginMessage(message) {
    bootbox.alert({
        title: "INFORMATION",
        message: message,
        closeButton: false,
        callback: function () {
            GotoPage('portal/login');
        }
    });
}



var orgid = $.cookie('orgID');
localStorage.setItem("OrgId", orgid);//to user orgid in pageModules.js 

$(document).ready(function () {
    Check_OrgViewPermission(orgid);
});

function Check_OrgViewPermission(orgid) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/Check_OrgViewPermission",
        data: "{ " +
            "'org_id':'" + orgid + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.length > 0) {

                    ShowAndHideMenuGroup_list(data.d);
                }
                else {
                    HideAllMenuGroup_list(data.d);
                }

            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function ShowAndHideMenuGroup_list(records) {

    var menugplist = ["CashFlow", "Distribution", "SaleBook", "Marketing", "Inventory", "General"];//Currently, menugplist are hardcoded.

    $.each(records, function (key, val) {

        var moduleid = '';
        moduleid = records[key]['MenuGroupCode'];

        if (records[key]['AllowView']) {
            menugplist.splice($.inArray(moduleid, menugplist), 1);
            moduleid = moduleid.trim() + "Module";
            $('#' + moduleid).show();
        }
    });

    //to hide menu groups that organization don't have permission
    if (menugplist.length > 0) {
        for (var i = 0; i < menugplist.length; i++) {
            var menugp = menugplist[i];
            $('#' + menugp + "Module").hide();
        }
    }
}

//Hide Menu Group Links if ther is no setup in Organization
function HideAllMenuGroup_list(records) {

    $('#CashFlowModule').hide();
    $('#SaleBookModule').hide();
    $('#DistributionModule').hide();
    $('#InventoryModule').hide();
    $('#MarketingModule').hide();
    $('#GeneralModule').hide();

}

function bodyUnload() {
    // logout('closebrowser');
}

//if (document.hasFocus())
//    alert('active');
//else
//    logout('');

var wrapper = function () { //ignore this

    var closing_window = false;
    $(window).on('focus', function () {
        closing_window = false;
        //if the user interacts with the window, then the window is not being 
        //closed
    });

    $(window).on('blur', function () {

        closing_window = true;
        if (!document.hidden) { //when the window is being minimized
            closing_window = false;
        }
        $(window).on('resize', function (e) { //when the window is being maximized
            closing_window = false;
        });
        $(window).off('resize'); //avoid multiple listening
    });

    $('html').on('mouseleave', function () {
        closing_window = true;
        //if the user is leaving html, we have more reasons to believe that he's 
        //leaving or thinking about closing the window
    });

    $('html').on('mouseenter', function () {
        closing_window = false;
        //if the user's mouse its on the page, it means you don't need to logout 
        //them, didn't it?
    });

    $(document).on('keydown', function (e) {

        if (e.keyCode == 91 || e.keyCode == 18) {
            closing_window = false; //shortcuts for ALT+TAB and Window key
        }

        if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
            closing_window = false; //shortcuts for F5 and CTRL+F5 and CTRL+R
        }
    });

    // Prevent logout when clicking in a hiperlink
    $(document).on("click", "a", function () {
        closing_window = false;
    });

    // Prevent logout when clicking in a button (if these buttons rediret to some page)
    $(document).on("click", "button", function () {
        closing_window = false;

    });
    // Prevent logout when submiting
    $(document).on("submit", "form", function () {
        closing_window = false;
    });
    // Prevent logout when submiting
    $(document).on("click", "input[type=submit]", function () {
        closing_window = false;
    });

    var toDoWhenClosing = function () {
        //  alert('when closing');
        logout('dologout');

        //write a code here likes a user logout, example: 
        //$.ajax({
        //    url: '/MyController/MyLogOutAction',
        //    async: false,
        //    data: {

        //    },
        //    error: function () {
        //    },
        //    success: function (data) {
        //    },
        //});
    };


    window.onbeforeunload = function () {
        if (closing_window) {
            toDoWhenClosing();
        }
    };


}

$('#dialogBox_Detail_Form1').modal({
    backdrop: false
})
$('#dialogBox_Detail_Form2').modal({
    backdrop: false
})

$('#dialogBox_Detail_Form1').modal('hide')


function profile() {
   
    $('#dialogBox_Detail_Form1').modal('show');

    $('#dialogBox_Detail_Form1').modal({
        backdrop: false
    });
    GetUserProfile();
}
function GetUserProfile() {

    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_User.asmx/GetProfile",
        data: "{ " +
            "'userID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["UserID"]);
                $("#tb_name").text(data.d["UserName"]);
                $("#tb_code").text(data.d["UserCode"]);
                $("#tb_user_role").text(data.d["RoleName"]);
                $("#tb_user_email").text(data.d["Email"]);
                $("#tb_user_type").text(data.d["Ref_Type"]);
                $("#tb_org_name").text(data.d["OrgName"]);
                $("#tb_contact_info").text(data.d["ContactInfo"]);
                $("#tb_note").text(data.d["Note"]);
                ShowSuccessMessage("Loaded.");
            }
            else {
                ShowBoxMessage("Oops, we can't find the record. ");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}




