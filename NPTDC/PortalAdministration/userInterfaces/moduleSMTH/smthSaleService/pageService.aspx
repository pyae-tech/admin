<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.Master" AutoEventWireup="true" CodeBehind="pageService.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthSaleService.pageService" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemApproval/controlApproval.ascx" TagPrefix="uc1" TagName="controlApproval" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
   
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="_Services">Services</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_sale">Sale</a></li>
        <li class="active" data-translate="_Services">Service</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/SMTHServiceDetail');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
    </ol>

    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="panel">
            <div class="panel-body">
                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span><span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-archive"></i>&nbsp;<span data-translate="_Services">Services</span><span  class="list_total_amount"></span></h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">


                                    <form class="form-horizontal">
                                        <div class="form-group">

                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="col-md-3">
                                                <div class="btn-group">
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                        <i class="btn-label ion-chevron-left"></i>
                                                        <span data-translate="" class="bold">ေရွ႕</span></button>
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">

                                                        <span data-translate="" class="bold">ေနာက္</span>
                                                        <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                </div>

                                            </div>



                                            <div class="col-md-4">
                                            </div>

                                            <div class="col-md-1">

                                                <div class="checkbox pad-btm text-left">
                                                    <input value="" type="checkbox" id="btn_search_all_dates" class="magic-checkbox" />
                                                    <label for="btn_search_all_dates">Range</label>
                                                </div>

                                            </div>

                                            <div class="col-md-2  col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>

                                        </div>





                                    </form>
                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GotoPage('Portal/SMTHServiceDetail?id=[ServiceID]');return false;">
                                                <td>[ServiceDate]&nbsp&nbsp<small><span>([ServiceStartOn] to [ServiceEndOn])</span></small></td>
                                                <td>[ServiceNo]</td>
                                                <td>[ServiceStatus]</td>
                                                <td>[CustomerNameEng]</td>
                                                <td style="text-align:right;">[TotalAmount]</td>
                                                <td>[UserName]</td>
                                                <td>[AppStatus]</td>
                                                <%-- <td>[ServiceDescription]</td>--%>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="_Service_Date">Service Date</th>
                                                    <th data-translate="_ServiceNo">Service No</th>
                                                    <th data-translate="_Service_Status">Service Status</th>
                                                    <th data-translate="Customer">Customer</th>
                                                    <th style="text-align:right;" data-translate="_total">Total</th>
                                                    <th data-translate="_Service_User">Services User</th>
                                                    <th data-translate="_status">Status</th>
                                                    <%-- <th>Description</th>--%>
                                                </tr>
                                            </thead>
                                            <tbody id="table_list">
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="row">
                                        <div id="div_pagination" style="padding: 10px;" class="row pull-right">
                                            <input type="hidden" id="hf_current_page" value="1" />
                                            <ul class="pager pager-rounded">
                                                <li><span id="lbl_record_count" class="lbl_record_count"></span></li>
                                                <li><a href="#" class=" btn_pagination_previous" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                                </li>
                                                <li>
                                                    <input type="number" id="tb_current_page" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                                <li><a href="#" class="btn_pagination_next" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                                <li><span id="lbl_page_count" class="lbl_page_count"></span></li>
                                                <li><a class=" btn_pagination_jump" href="#" onclick="pageJumpToThis();return false;"><i class="ion-refresh"></i></a></li>
                                            </ul>
                                        </div>

                                    </div>

                                </div>



                                <div class="tab-pane fade" id="tab-search">
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">

                                                    <div class="form-group">

                                                        <label for="tb_search_text" class="col-md-2 control-label" data-translate="_name_code">Name / Code</label>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" id="tb_search" placeholder="">
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-md-2"></div>
                                                        <div class="col-md-6">


                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="clearSearch();return false;">
                                                                <i class="btn-label ion-backspace"></i>
                                                                <span class="bold" data-translate="_showall">Show All</span></button>

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span class="bold" data-translate="_search">Search</span></button>


                                                        </div>

                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>




    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title" data-translate="_Service_Detail">Service - Detail Information</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />

                        <div class="form-group">
                            <label for="tb_name" class="col-md-2 control-label" data-translate="_ServiceNo">Service No</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="tb_service_no" placeholder="Enter Service No" readonly="true">
                            </div>
                            <label for="tb_contact_info" class="col-md-3 control-label" data-translate="_Service_Status">Service Status</label>
                            <div class="col-md-2">
                                <select id="tb_ser_status" class="form-control">
                                    <option>New</option>
                                    <option>Pending</option>
                                    <option>Complete</option>
                                    <option>Invoicing</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_contact_info" class="col-md-2 control-label" data-translate="_Service_Date">Service Date</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="dtp_ser_date" placeholder="Enter Name">
                            </div>
                        </div>

                        <div class="form-group">
                           
                                <label for="tb_purchase_buy" class="col-md-2 control-label " data-translate="_Start_On">Start On</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_start_on" placeholder="HH:mm:ss" onchange="CheckStartTime();return false;">
                                </div>
                              
                          

                            <label for="tb_bill_amount" class="col-md-4 control-label" data-translate="_End_On">End On</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" id="tb_ser_end" placeholder="HH:mm:ss" onchange="CheckEndTime();return false;">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_contact_info" class="col-md-2 control-label" data-translate="_customer">Customer</label>
                            <div class="col-md-3">
                                <select id="tb_customer_name" class="form-control demo_select2" required></select>
                            </div>
                            <input type="hidden" id="hf_customer_name" />
                            <div class="col-md-1">
                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('customers');return false;"></i></span>&nbsp;  
                            <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_Customer_List();return false;"></i></span>&nbsp;  
                            </div>
                            <label for="tb_contact_info" class="col-md-2 control-label" data-translate="_Service_Man">Service Man</label>
                            <div class="col-md-3">
                                <select id="tb_service_man" class="form-control demo_select2" required></select>
                            </div>
                            <input type="hidden" id="hf_service_man" />
                            <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('users');return false;"></i></span>&nbsp;  
                            <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_User_List();return false;"></i></span>&nbsp;  
                        </div>




                        <div class="form-group">
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="_Contact_Name">Contact Name</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_cont_name" placeholder="Enter Contact Name">
                            </div>
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="_Contact_Position">Contact Position</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_con_position" placeholder="Enter Contact Position">
                            </div>
                        </div>

                        
                        <div class="form-group">
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Latitude</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_latitude" placeholder="Enter Latitude" onkeypress="return NumberExpressionWithoutSign(event.key)">
                            </div>
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Longitude</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_longitude" placeholder="Enter Longitude" >
                            </div>
                        </div>


                        <hr>

                        <div id="fuel_information" style="display: none;">
                            <input type="hidden" id="hr_ffs_id" value="" />
                            <div class="form-group">
                                <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Fuel(L) Before</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_fAB_L" placeholder="Fuel(L) Before">
                                </div>
                                <label for="tb_bill_amount" class="col-md-4 control-label" data-translate="">Fuel(%) Before</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_bef_percentage" placeholder="Fuel(%) Before">
                                </div>

                            </div>

                            <div class="form-group">
                                <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Filled Fuel(L)</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_fill_amount" placeholder="Filled Fuel(L)">
                                </div>


                            </div>

                            <div class="form-group">
                                <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Fuel(L) After</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_after_amount" placeholder="Fuel(L) After">
                                </div>
                                <label for="tb_bill_amount" class="col-md-4 control-label" data-translate="">Fuel(%) After</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_after_per" placeholder="Fuel(%) After">
                                </div>

                            </div>

                            <div class="form-group">
                                <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Price Per Liter</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_price_L" placeholder="Price Per Liter" >
                                </div>
                                <label for="tb_bill_amount" class="col-md-4 control-label" data-translate="">Charges of Fuel</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_charges_fuel" placeholder="Charges of Fuel" readonly="true">
                                </div>

                            </div>



                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="_Service_charges">Service Charges</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_ser_charges" placeholder="Service Amount">
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="_total">Total</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" style="text-align: right;" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_ser_amount" placeholder="Total" readonly="true">
                            </div>

                        </div>

                     <%--   <div class="form-group">
                            <label for="tb_contact_info" class="col-md-2 control-label" data-translate="">Description</label>
                            <div class="col-md-10">
                                <textarea rows="2" class="form-control" id="tb_description" placeholder="Enter Remark"></textarea>
                            </div>

                        </div>--%>





                        <div class="form-group">
                            <label for="tb_keyaddress" class="col-md-2 control-label" data-translate="_remark">Remark</label>
                            <div class="col-md-10">
                                <textarea rows="2" class="form-control" id="tb_remark" placeholder="Enter Remark"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <uc1:controlApproval runat="server" ID="controlApproval" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <uc1:controlComment runat="server" ID="controlComment" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <small><span id="lbl_created"></span></small>
                                <br />
                                <small><span id="lbl_modified"></span></small>
                                <br />
                            </div>
                        </div>






                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveService();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span data-translate="_log" class="bold">Log</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="CloseDetail();return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>


   
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>

    <script src='<%=ResolveUrl("pageService.js")%>'></script>
</asp:Content>

