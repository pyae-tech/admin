<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Account.master" AutoEventWireup="true" CodeBehind="pageAccountTransaction.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleAccount.accountTransaction.pageAccountTransaction" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">Account Transaction</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#"><span data-translate="">Account Data</span></a></li>
        <li class="active"><span data-translate="">Account Transaction</span></li>
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
                                     <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab" ><span data-translate="_Listing"> စာရင္း </span><span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                            <h3>
                                <i class="ion-social-usd" ></i>
                                <span data-translate="">Account Transaction</span>
                            </h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">


                                    <form class="form-horizontal">
                                        <div class="form-group">

                                            <div class="col-md-2 col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="col-md-4 col-sm-4">
                                                 <div class="btn-group">
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                    <i class="btn-label ion-chevron-left"></i>
                                                    <span data-translate="_front" class="bold">ေရွ႕</span></button>
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">
                                                  
                                                    <span data-translate="_back" class="bold">ေနာက္</span>
                                                      <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                     </div>

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

                                            
                                             


                                        
                                            <div class="col-md-3">
                                                 <div class="input-group mar-btm">
					                        <span class="input-group-btn">
					                            <button class="btn btn-primary" type="button"><i class="ion-connection-bars"></i></button>
					                        </span>
                                                 <input type="hidden" id="hf_accountnameid" value="" />
					                             <select id="ddl_accountname" class="form-control demo_select2">
					                             </select>                                                    					                     
					                    </div>
                                            </div>
                                            
                                          

                                           
                                           
                                        </div>





                                    </form>


                                    <div id="panel_summary">
                                        <div class="row">
                                            <div class="col-md-6">
                                                 <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GetAccountTransaction('[AccountTransactionID]');return false;">
                                                <td>[AccountDate]</td>
                                                <td>[AccountName]</td>
                                                <td>[RefTitle]</td>
                                                <td style="text-align: right;">[DebitAmount]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive" style="min-height: 300px; border:1px solid silver;" id="panel_list_background">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="" class="col-md-2">Date</th>
                                                    <th data-translate="" class="col-md-3">Account</th>
                                                    <th data-translate="" class="col-md-4">Title</th>
                                                    <th class="col-md-1" style="text-align: right;" data-translate="">Debit</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table_list">
                                            </tbody>
                                        </table>
                                    </div>
                                            </div>

                                            <div class="col-md-6">
                                                 <table style="display: none">
                                        <tbody id="template_row_credit">
                                            <tr style="cursor: pointer;" onclick="GetAccountTransaction('[AccountTransactionID]');return false;">
                                                <td>[AccountDate]</td>
                                                <td>[AccountName]</td>
                                                <td>[RefTitle]</td>
                                                <td style="text-align: right;">[CreditAmount]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive" style="min-height: 300px; border:1px solid silver;" id="panel_list_credit">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list1">
                                            <thead>
                                                <tr>
                                                    <th data-translate="" class="col-md-2">Date</th>
                                                    <th data-translate="" class="col-md-3">Account</th>
                                                    <th data-translate="" class="col-md-4">Title</th>
                                                    <th class="col-md-1" style="text-align: right;" data-translate="">Credit</th>
                                                  
                                                </tr>
                                            </thead>
                                            <tbody id="table_list_credit">
                                            </tbody>
                                        </table>
                                    </div>
                                            </div>
                                        </div>
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

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span data-translate="_search" class="bold">Search</span></button>


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
                    <h4 class="modal-title" data-translate="">Account Transaction - Detail Information</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />

                        <div class="form-group">
                            <label for="tb_name" class="col-md-2 control-label" data-translate="">Account Date</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="tb_account_date" placeholder="Enter Account Date">
                            </div>
                        </div>
                          <div class="form-group">
                           <input type="hidden" id="hf_account_id" value="" />
                           <label for="tb_account_name" class="col-md-2 control-label" data-translate="">Account Name</label>
                           <div class="col-md-4">
                           <select id="tb_account_name" class="form-control demo_select2"></select>
                            </div>
                                <span ><i class="ion-ios-plus urllink" style="font-size:21px;" onclick="OpenNewURLInNewTab('accounts');return false;"></i></span>     &nbsp;  
                            <span ><i class="ion-ios-refresh urllink" style="font-size:21px;" onclick="Load_AccountType_List();return false;"></i></span>     &nbsp;  

                        </div>

                        <div class="form-group">
                            <label for="tb_contact_info" class="col-md-2 control-label" data-translate="Title">Title</label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" id="tb_title" placeholder="Enter Title">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_bill_amount" class="col-md-2 control-label" data-translate="">Debit Amount</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" style="text-align: right;" id="tb_debit_amount" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Enter Debit Amount">
                            </div>
                            <label for="tb_currency" class="col-md-2 control-label" data-translate="">Credit Amount</label>
                            <div class="col-md-4">
                              <input type="text" class="form-control" style="text-align: right;" id="tb_credit_amount" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Enter Credit Amount">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label"></label>
                            <div class="col-md-8">
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
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveAccountTransaction();return false;"><i class="btn-label ion-checkmark"></i><span data-translate="_save" class="bold">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                    <i class="btn-label ion-trash-b"></i><span data-translate="_delete" class="bold">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span data-translate="_new" class="bold">New</span></button>
                    <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span data-translate="_log" class="bold">Log</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageAccountTransaction.js")%>'></script>
</asp:Content>
