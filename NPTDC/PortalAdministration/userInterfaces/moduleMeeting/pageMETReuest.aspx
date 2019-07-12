<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageMETReuest.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMeeting.pageMETReuest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
     <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="Customer">Customer</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook"><span data-translate="_materbook">Master Data</span></a></li>
        <li class="active" ><span data-translate="Customer">Customers</span></li>
        <li class="active">
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
            <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveCustomer();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
            <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
            <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/customers');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button></li>
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
                            <div class="panel-control" style="display: none;">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>

                            <div class="form-group">
                                <label class="col-md-6 control-label">
                                    <h3 class="modal-title"><span data-translate="CustomerDetail">Customer - Detail Infromation</span></h3>
                                </label>

                            </div>
                        </div>

                        <!--Panel body-->
                        <div class="page-content">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">
                                    <div class="modal-body">

                                        <div class="row">
                                            <div class="col-md-12">
                                                <form class="form-horizontal">
                                                    <input type="hidden" id="tb_id" value="" />
                                                    <fieldset>
                                                        <legend data-translate="Info">Info:</legend>
                                                        <div class="form-group">
                                                            <label for="tb_customerno" class="col-md-2 control-label" data-translate="CustomerNo">Customer No</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_customerno" placeholder="Customer No" readonly>
                                                            </div>
                                                            <input type="hidden" id="hf_customergroup" value="" />
                                                            <label for="ddl_customergroup" class="col-md-2 control-label" data-translate="CustomerGroup">Customer Group</label>
                                                            <div class="col-md-3">
                                                                <select id="ddl_customergroup" class="form-control demo_select2"></select>

                                                            </div>
                                                            &nbsp; <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('customergroups');return false;"></i></span>&nbsp;  
                                                          <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_CustomerGroup();return false;"></i></span>&nbsp; 
                                                         
                                                        </div>

                                                            <div class="form-group">
                                                            <label for="tb_shortcode1" class="col-md-2 control-label" data-translate="">Customer Code</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_cc_code" placeholder="Enter Customer Code">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_name" class="col-md-2 control-label" data-transalte="Name(Eng)">Name (Eng)</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_name" placeholder="Enter Customer Name" required="required" />
                                                            </div>
                                                            <label for="tb_name" class="col-md-2 control-label" data-translate="Name(Myanmar)">Name (Myanmar)</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_CustomerNameZawgyi" placeholder="Enter Customer Name" required="required" />
                                                            </div>
                                                         
                                                        </div>

                                                     

                                                        <div class="form-group">
                                                            <label for="tb_shortcode1" class="col-md-2 control-label" data-translate="Code1">Code 1</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_shortcode1" placeholder="Enter Code 1">
                                                            </div>
                                                            <label for="tb_shortcode2" class="col-md-2 control-label" data-translate="Code2">Code 2</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_shortcode2" placeholder="Enter Code 2">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <input type="hidden" id="hf_saleperson_id" value="" />
                                                            <label for="tb_saleperson" class="col-md-2 control-label" data-translate="Sale Person">Sale Person</label>
                                                            <div class="col-md-2" style="">
                                                                <select id="ddl_saleperson" class="form-control demo_select2"></select>

                                                            </div>
                                                            <div class="col-md-1">
                                                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('staffs');return false;"></i></span>&nbsp;  
                                                          <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_CustomerGroup();return false;"></i></span>&nbsp;                                 
                                                            </div>

                                                            <label for="tb_code" class="col-md-2 control-label" style="" data-translate="ContactDate">Contact Date</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="dtp_contact_date" placeholder="Enter Contact Date">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_orderloginid" class="col-md-2 control-label">Order LoginID</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_orderloginid" placeholder="Order LoginID">
                                                            </div>
                                                            <label for="tb_orderlogin_psw" class="col-md-2 control-label">Login Password</label>
                                                            <div class="col-md-3">
                                                                <input type="password" class="form-control" id="tb_orderlogin_psw" placeholder="Order Login Password">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_orderlastlogin" class="col-md-2 control-label">Order LastLogin</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_orderlastlogin" placeholder="Order Last Login" readonly>
                                                            </div>
                                                            <label for="tb_description" class="col-md-2 control-label"></label>
                                                            <div class="col-md-1" style="width: 5%;">
                                                                <input type="checkbox" class="form-control" id="chk_IsBilling" />
                                                            </div>
                                                            <label class="col-md-3 control-label" style="text-align: left;">Billing Customer ရွိပါသည္။</label>
                                                        </div>

                                                        <div class="form-group" id="Is_BillingCustomer" style="display: none;">
                                                            <input type="hidden" id="hf_billCustomer_id" value="" />
                                                            <label for="tb_code" class="col-md-2 control-label">
                                                                <span data-translate="">Billing Customer</span></label>
                                                            <div class="col-md-8">
                                                                <select id="ddl_billCustomer" class="form-control demo_select2"></select>
                                                            </div>
                                                            <div class="col-md-1">
                                                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('customers');return false;"></i></span>&nbsp;  
                                                          <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_BillingCustomer_List();return false;"></i></span>&nbsp; 
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_Remark" class="col-md-2 control-label" data-translate="Remark">Remark</label>
                                                            <div class="col-md-8">
                                                                <textarea rows="2" cols="50" class="form-control" id="tb_Remark" placeholder="Enter Remark"></textarea>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div class="form-group" id="order_date_customer" style="display: block;">
                                                            <div class="col-md-2"></div>
                                                            <div class="col-md-10">
                                                                <input id="cb_ismonday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_ismonday">Monday</label>&nbsp
                                                              <input id="cb_istueday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_istueday">Tueday</label>&nbsp
                                                              <input id="cb_wednesday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_wednesday">Wednesday</label>&nbsp
                                                             <input id="cb_thursday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_thursday">Thursday</label>&nbsp
                                                             <input id="cb_friday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_friday">Friday</label>&nbsp
                                                            <input id="cb_satday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_satday">Saturday</label>&nbsp
                                                             <input id="cb_sunday" class="magic-checkbox" type="checkbox">
                                                                <label for="cb_sunday">Sunday</label>
                                                            </div>

                                                        </div>

                                                      
                                                        <br />

                                                    </fieldset>
                                                    <fieldset>
                                                        <legend data-translate="AddressDetail">Address:</legend>

                                                        <div class="form-group">
                                                            <label for="tb_address" class="col-md-2 control-label" data-translate="CustomerPhoneNo">Phone No</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_contact_info" placeholder="Enter Phone No">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_address" class="col-md-2 control-label" data-translate="FaxNo">Fax No</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_fax" placeholder="Enter Fax No">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_address" class="col-md-2 control-label" data-translate="Address">Address</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_address" placeholder="Enter Address">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="hidden" id="hf_region_id" value="" />
                                                            <label for="tb_code" class="col-md-2 control-label"><span data-translate="_region">Region </span></label>
                                                            <div class="col-md-8">
                                                                <select id="tb_region" class="form-control demo_select2"></select>
                                                                <%--<input type="text" class="form-control" id="tb_item" placeholder="ကုန္ပစၥည္း">--%>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="hidden" id="hf_township_id" value="" />
                                                            <label for="tb_address" class="col-md-2 control-label" data-translate="Township">Township</label>
                                                            <div class="col-md-8">
                                                                <select id="tb_TownshipID" class="form-control demo_select2"></select>

                                                            </div>
                                                        </div>
                                                        <div class="form-group">

                                                            <label for="tb_keyname1" class="col-md-2 control-label">Cell Lat</label>
                                                            <div class="col-md-3">
                                                                <input type="number" class="form-control" id="tb_Cell_Lat" placeholder="Enter Cell Lat">
                                                            </div>
                                                            <label for="tb_keyname2" class="col-md-2 control-label" style="text-align: right;">Cell Lon</label>
                                                            <div class="col-md-3">
                                                                <input type="number" class="form-control" id="tb_Cell_Lon" placeholder="Enter Cell Lon">
                                                            </div>
                                                        </div>


                                                        <div class="form-group">

                                                            <label for="tb_keyname1" class="col-md-2 control-label">User Lat</label>
                                                            <div class="col-md-3">
                                                                <input type="number" class="form-control" id="tb_User_Lat" placeholder="Enter User Lat">
                                                            </div>
                                                            <label for="tb_keyname2" class="col-md-2 control-label" style="text-align: right;">User Lon</label>
                                                            <div class="col-md-3">
                                                                <input type="number" class="form-control" id="tb_User_Lon" placeholder="Enter User Lon">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">

                                                            <label for="tb_keyname1" class="col-md-2 control-label">GPS Lat</label>
                                                            <div class="col-md-3">
                                                                <input type="number" class="form-control" id="tb_GPS_Lat" placeholder="Enter GPS Lat">
                                                            </div>
                                                            <label for="tb_keyname2" class="col-md-2 control-label" style="text-align: right;">GPS Lon</label>
                                                            <div class="col-md-3">
                                                                <input type="number" class="form-control" id="tb_GPS_Lon" placeholder="Enter GPS Lon">
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <div id="ffs_customer" style="display: none;">
                                                        <fieldset>
                                                            <legend>Fuel Fill Service</legend>
                                                            <div class="form-group">
                                                                <input type="hidden" id="hf_FFS_CustomerID" value="" />
                                                                <label for="tb_Dg_Capacity" class="col-md-2 control-label">DG Capacity</label>
                                                                <div class="col-md-3">
                                                                    <input type="text" class="form-control" id="tb_Dg_Capacity" placeholder="Enter DG Number">
                                                                </div>
                                                                <label for="tb_Tank_Capacity" class="col-md-2 control-label">Tank Capacity</label>
                                                                <div class="col-md-3">
                                                                    <input type="text" class="form-control" id="tb_Tank_Capacity" placeholder="Enter Tank Capacity">
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>


                                                    <fieldset>
                                                        <legend>Key 1:</legend>
                                                        <div class="form-group">

                                                            <label for="tb_keyname1" class="col-md-2 control-label" data-translate="Name1">Name</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_keyname1" placeholder="Enter Key Name1">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">

                                                            <label for="tb_keyPosition1" class="col-md-2 control-label" data-translate="Position1">Position</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_keyPosition1" placeholder="Enter Key1 Position">
                                                            </div>
                                                        </div>



                                                        <div class="form-group">

                                                            <label for="tb_key1mobile" class="col-md-2 control-label" data-translate="MobileNo1">MobileNo</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_key1mobile" placeholder="Enter Key1 MobileNo">
                                                            </div>
                                                        </div>


                                                        <div class="form-group">

                                                            <label for="tb_keymobile1" class="col-md-2 control-label" data-translate="Office Phone1">Office Phone</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_key1officemobile1" placeholder="Enter Key1 Office Phone">
                                                            </div>
                                                        </div>


                                                        <div class="form-group">
                                                            <label for="tb_keyaddress" class="col-md-2 control-label" data-translate="Address1">Address</label>
                                                            <div class="col-md-8">
                                                                <textarea rows="2" cols="50" class="form-control" id="tb_key1address" placeholder="Enter Key1 Address"></textarea>
                                                            </div>
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <legend>Key 2: </legend>
                                                        <div class="form-group">
                                                            <label for="tb_keyname2" class="col-md-2 control-label" style="text-align: right;" data-translate="Name2">Name</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_keyname2" placeholder="Enter Key Name2">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_keyPosition2" class="col-md-2 control-label" style="text-align: right;" data-translate="Position2">Position</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_keyPosition2" placeholder="Enter Key2 Position">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_key1mobile2" class="col-md-2 control-label" style="text-align: right;" data-translate="MobileNo2">MobileNo</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_key1mobile2" placeholder="Enter Key2 MobileNo">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_key2mobile" class="col-md-2 control-label" style="text-align: right;" data-translate="Officehone2">Office Phone</label>
                                                            <div class="col-md-8">
                                                                <input type="text" class="form-control" id="tb_key2officemobile" placeholder="Enter Key2 Office Phone">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_keyaddress" class="col-md-2 control-label" data-translate="Address2">Address</label>
                                                            <div class="col-md-8">
                                                                <textarea rows="2" cols="50" class="form-control" id="tb_key2address" placeholder="Enter Key2 Address"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_description" class="col-md-2 control-label"></label>
                                                            <div class="col-md-1" style="width: 5%;">
                                                                <input type="checkbox" class="form-control" id="cb_partner" />
                                                            </div>
                                                            <label class="col-md-3 control-label" style="text-align: left;">Partner အဆင္႔ျဖစ္ပါသည္။</label>

                                                        </div>
                                                    </fieldset>


                                                    <div class="form-group">
                                                        <label for="tb_note" class="col-md-2 control-label"></label>
                                                        <div class="col-md-8">
                                                            <small><span id="lbl_created"></span></small>
                                                            <br />
                                                            <small><span id="lbl_modified"></span></small>
                                                            <br />
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-md-2"></div>
                                                        <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveCustomer();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                                                        <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                                                            <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                                                        <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                                                        <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
                                                        <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/customers');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>

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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageMETReuest.js")%>'></script>
</asp:Content>
