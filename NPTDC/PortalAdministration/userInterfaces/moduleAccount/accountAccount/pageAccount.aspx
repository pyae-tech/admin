<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Account.master" AutoEventWireup="true" CodeBehind="pageAccount.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleAccount.accountAccount.pageAccount" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">Accounts</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#"><span data-translate="">Account Data</span></a></li>
        <li class="active"><span data-translate="">Accounts</span></li>
        <li>
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
        </li>

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
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab"><span data-translate="_search">Search</span></a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-link">&nbsp;</i><span data-translate="">Accounts</span> </h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">



                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GetAccount('[AccountID]');return false;">
                                                <td>[Title]</td>
                                                <td>[AccountName]</td>
                                                <td>[AccountCode]</td>
                                                <td>[ColumnType]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive" style="min-height: 300px; border:1px solid silver;" id="panel_list_background" >
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="" class="col-md-4">Account Type</th>
                                                    <th data-translate="" class="col-md-4">Account Name</th>
                                                    <th  data-translate="" class="col-md-2">Code</th>
                                                    <th data-translate="" class="col-md-2">Type</th>
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
                                                            <input type="text" class="form-control" id="tb_search_account" placeholder="">
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
                    <h4 class="modal-title"><span data-translate=""></span>Account - Detail Information</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />

                        <div class="form-group">
                            <label for="tb_name" class="col-md-2 control-label" data-translate="">Account Name</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_account_name" placeholder="Account Name">
                            </div>
                           
                            <label for="ddl_status" class="col-md-2 control-label" data-translate="">Status</label>
                           <div class="col-md-4">
                         
                                <select id="ddl_status" class="form-control">
                                    <option value="New">New</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            
                            </div>
                        </div>

                        <div class="form-group">
                         
                            <input type="hidden" id="hf_accounttype_id" value="" />
                           <label for="ddl_accounttype" class="col-md-2 control-label" data-translate="">Account Type</label>
                           <div class="col-md-4">
                           <select id="ddl_accounttype" class="form-control demo_select2"></select>
                            </div>
                               <div class="col-md-1">
                              <span ><i class="ion-ios-plus urllink" style="font-size:21px;" onclick="OpenNewURLInNewTab('accounttypes');return false;"></i></span>     &nbsp;  
                            <span ><i class="ion-ios-refresh urllink" style="font-size:21px;" onclick="Load_AccountType_List();return false;"></i></span>     &nbsp;  
                               </div>
                             <label for="ddl_accounttype" class="col-md-1 control-label" data-translate="">Code</label>
                                <div class="col-md-2">
                                <input type="text" class="form-control" id="tb_account_code" placeholder="Account Code">
                            </div>
                        </div>

                          <div class="form-group">
                         
                              <label for="ddl_status" class="col-md-2 control-label" data-translate="">Type</label>
                           <div class="col-md-4">
                         
                                <select id="ddl_columntype" class="form-control">
                                    <option value="Debit">Debit</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Both">Both</option>
                                </select>
                            
                            </div>
                        </div>
 
                        <div class="form-group">
                            <label for="tb_remark" class="col-md-2 control-label" data-translate="">Remark</label>
                            <div class="col-md-10">
                                <textarea class="form-control" rows="3" placeholder="Remark" id="tb_remark"></textarea>
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
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveAccount();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageAccount.js")%>'></script>
</asp:Content>
