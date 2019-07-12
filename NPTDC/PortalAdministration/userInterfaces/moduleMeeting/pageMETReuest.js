$('title').html(get_current_organization_title() + "Request");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Customer').addClass('active-link');
$("#tab-main").tabs();


//$("#ddl_meetingtype").dxSelectBox({
//    items: ["EC", "Mangement","Other Type"],
//    value: "EC",
//    onValueChanged: function (e) {
//        searchBox.option("searchMode", e.value);
//    }
//});