<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.Master" AutoEventWireup="true" CodeBehind="pageWayPlanDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.wayPlan.pageWayPlanDetail" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
    <style>
        .form-group {
            margin-bottom: 5px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_vansale">Van Sale</a></li>
        <li class="active" data-translate="_waysaledetail">Way Sale Detail</li>
        <li class="active">
            <div class="btn-group">
                <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveRecord();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/way?id=');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                    <i class="btn-label ion-trash-b"></i><span class="bold" onclick="GotoPage('portal/ways');return false;">Delete</span></button>
                <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/ways');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>
            </div>
        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">
            <div class="col-md-12">

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_waysale">Way Sale</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <input type="hidden" id="tb_id" value="" />
                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_waydate">Way Date</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_date">
                                </div>
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_wayno">Way No</label>
                                <div class="col-md-2" style="margin-right: -63px;">
                                    <input type="text" class="form-control" id="tb_way_no" readonly="true">
                                </div>
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_status">Status</label>
                                <div class="col-md-2">
                                    <select id="ddl_status" class="form-control">
                                        <option value="New">New</option>
                                        <option value="Start">Start</option>
                                        <option value="Cancel">Cancel</option>
                                        <option value="Complete">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_carno">Car No</label>
                                <div class="col-md-2">
                                    <input  type="hidden" id="hf_car_id" value=""/>
                                    <select id="ddl_car" class="form-control demo_select2"></select>
                                </div>
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_routename">Route Name</label>
                                <div class="col-md-2" style="margin-right: -63px;">
                                    <input type="hidden" id="hf_route_id" value=""/>
                                    <select id="ddl_route" class="form-control demo_select2"></select>
                                </div>
                                <label for="tb_keyaddress" class="col-md-2 control-label" data-translate="_remark">Remark</label>
                                <div class="col-md-2">
                                    <textarea rows="2" class="form-control" id="tb_remark" placeholder="Enter Remark"></textarea>
                                </div>

                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_cashsale">Cash Sale</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_cash" style="text-align: right;" placeholder="Enter Cash Sale">
                                </div>
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_creditsale">Credit Sale</label>
                                <div class="col-md-2" style="margin-right: -63px;">
                                    <input type="text" class="form-control" id="tb_credit" style="text-align: right;" placeholder="Enter Credit Sale">
                                </div>
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_balnace">Balnace</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_balance" style="text-align: right;" placeholder="Enter Balance">
                                </div>
                            </div>
                                  <div class="form-group row pull-right" style="margin-bottom: -17px;" >
                                        <%--<label for="tb_note" class="col-md-2 control-label"></label>--%>
                                      <%-- <div class="col-md-12">--%>
                                            <small><span id="lbl_created"></span></small>   <br />                                       
                                            <small><span id="lbl_modified"></span></small>
                                           
                                        <%--</div>--%>
                                      
                                    </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <div class="row">
                            <h3 class="panel-title"><span data-translate="_issuenote">Issue Notes </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <a href="#" class="btn btn-mint  btn-rounded  btn-labeled" style="color: white;" onclick="NewIssueByWay();return false;"><i class="btn-label ion-plus"></i><span class="bold" data-translate="_newissue">New Issue</span></a>
                            </h3>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table style="display: none">
                            <tbody id="template_issue_row">
                                <tr style="cursor: pointer;" onclick="GoToIssueNote('[IssueNoteID]');return false;">
                                    <td>[IssueNoteNo]</td>
                                    <td>[IssueDate]</td>
                                    <td>[CarNo]</td>
                                    <td>[RouteName]</td>
                                    <td>
                                        <div class="label label-table [statusColor]" style="font-weight: normal;">[Status]</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover  table-bordered" id="panel_issue_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_issueno">Issue No.</th>
                                        <th data-translate="_issuedate">Issue Date</th>
                                        <th data-translate="_carno">Car No</th>
                                        <th data-translate="_route">Route</th>
                                        <th data-translate="_status">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="table_issue_list">
                                </tbody>
                            </table>
                        </div>

                        <div class="row" id="page_issue">
                            <div id="div_issue_pagination" style="padding: 10px;" class="row pull-right">
                                <input type="hidden" id="hf_issue_current_page" value="1" />
                                <ul class="pager pager-rounded">
                                    <li><span id="lbl_issue_record_count" class="lbl_issue_record_count"></span></li>
                                    <li><a href="#" class=" btn_issue_pagination_previous" onclick="pageJump_issue(this);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                    </li>
                                    <li>
                                        <input type="number" id="tb_issue_current_page" class="tb_issue_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                    <li><a href="#" class="btn_issue_pagination_next" onclick="pageJump_issue(this);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                    <li><span id="lbl_issue_page_count" class="lbl_issue_page_count"></span></li>
                                    <li><a class=" btn_issue_pagination_jump" href="#" onclick="pageJumpToThis_issue();return false;"><i class="ion-refresh"></i></a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_stockbalance">Stock Balance</h3>
                    </div>
                    <div class="panel-body">
                        <table style="display: none">
                            <tbody id="template_stockbalance_row">
                                <tr style="cursor: auto;">
                                    <td>[Seq]</td>
                                    <td>[ItemName]</td>
                                    <td style="text-align: left;">[IssuedQty]</td>
                                    <td style="text-align: left;">[SoldQty]</td>
                                    <td style="text-align: left;">[RemainingQty]</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover  table-bordered" id="panel_stockbalance_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_ordno">No</th>
                                        <th data-translate="_ItemName">Item Name</th>
                                        <th data-translate="_IssuedQty">Issued Qty</th>
                                        <th data-translate="_SoldQty">Sold Qty</th>
                                        <th data-translate="_RemainingQty">Remaining Qty</th>

                                    </tr>
                                </thead>
                                <tbody id="table_stockbalance_list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <div class="row">

                            <h3 class="panel-title"><span data-translate="_invoice">Invoices </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <a href="#" class="btn btn-mint  btn-rounded  btn-labeled" style="color: white;" onclick="NewInvoiceByWay();return false;"><i class="btn-label ion-plus"></i><span class="bold" data-translate="_newinvoice">New Invoice</span></a>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <span class="btn btn-mint  btn-rounded  btn-labeled"><span data-translate="_totalCashamount">Total Cash Amount</span><span id="total_cash_amount"></span></span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <span class="btn btn-danger  btn-rounded  btn-labeled"><span data-translate="_totalCreditamount">Total Credit Amount</span><span id="total_credit_amount"></span></span>


                            </h3>
                        </div>

                    </div>
                    <div class="panel-body">
                        <table style="display: none">
                            <tbody id="template_row">
                                <tr style="cursor: pointer;" onclick="GoToInvoice('[SellVouncherID]');return false;">
                                    <td>[Seq]</td>
                                    <td>[VouncherNo]</td>
                                    <td>[CustomerName]</td>
                                    <td>
                                        <div class="label label-table [statusColor]" style="font-weight: normal;">[InvoiceStatus]</div>
                                    </td>
                                    <td style="text-align: right;">[VouncherPayAmount]</td>
                                </tr>
                            </tbody>
                        </table>
                         <table style="display: none">
                            <tbody id="template_shopskip_row">
                                <tr style="cursor: auto;">
                                    <td>[Seq]</td>
                                    <td>[CustomerNameEng]</td>
                                    <td>[RouteName]</td>
                                    <td>[RouteCustomerSkipReason]</td>
                                </tr>
                            </tbody>
                        </table>

                        <!--Bordered Accordion-->
                        <!--===================================================-->
                        <div class="panel-group accordion" id="demo-acc-info-outline">
                            <div id="template_invoice_customer" style="display: none">
                                <div class="panel panel-bordered panel-default">

                                    <!--Accordion title-->
                                    <div class="panel-heading" style="background-color: #dbe4e4;">
                                        <h4 class="panel-title">
                                            <input type="hidden" id="hf_total_cash_amount_[count]" />
                                            <input type="hidden" id="hf_total_credit_amount_[count]" />
                                            <a data-parent="#demo-acc-info-outline" data-toggle="collapse" aria-expanded="false" href="#demo-acd-info-outline-[count]">
                                          <%--<div class="col-md-1" style="width:3px;margin-top:-14px;margin-left:-25px;"><span style="font-size:small; font-style:italic;">#[seq]</span></div>--%>
                                                <div class="col-md-3"><span style="font-weight: bolder;">[seq].&nbsp; [CustomerName]</span></div>
                                          <div id="flag_Invoice_[count]" style="display:none">    
                                              <div class="col-md-3"><span style="color: darkblue;"><span data-translate="_totalCashamount">Total Cash Amount</span><span style="font-weight: bolder;" id="total_cash_amount_[count]"></span></span></div>
                                                <div class="col-md-3"><span style="color: darkblue;"><span data-translate="_totalCreditamount">Total Credit Amount</span><span style="font-weight: bolder;" id="total_credit_amount_[count]"></span></span></div>

</div>   
                                                 <div id="flag_Skip_[count]" style="display:none">
                                                      <div class="col-md-3"><span style="color: red;"><span>Skiped Shop</span></span></div>
                                                    
                                                     </div>
                                            </a>
                                        </h4>
                                    </div>

                                    <!--Accordion content-->
                                    <div class="panel-collapse collapse in" id="demo-acd-info-outline-[count]">
                                        <div class="panel-body">
                                            <div class="table-responsive">
                                                <table class="table table-striped table-hover  table-bordered" id="panel_list_[count]">
                                                    <thead>
                                                        <tr>
                                                            <th data-translate="_no">No</th>
                                                            <th style="width: 130px;" data-translate="_invoice_no">Invoice No</th>
                                                            <th style="width: 360px;" data-translate="_customer">Customer</th>
                                                            <th style="width: 120px;" data-translate="_invoicestatus">Status</th>
                                                            <th style="text-align: right;" data-translate="_amount">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="table_list_[count]">
                                                    </tbody>
                                                </table>
                                                <table class="table table-striped table-hover  table-bordered" id="panel_shopskip_list_[count]">
                                                    <thead>
                                                        <tr>
                                                            <th data-translate="_ordno">No</th>
                                                            <th data-translate="">Customer</th>
                                                            <th data-translate="_route">Route</th>
                                                            <th data-translate="_skipreason">Skip Reason</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="table_shopskip_list_[count]">
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab_Cus_list">
                            </div>
                        </div>
                        <!--===================================================-->
                        <!--End Bordered Accordion-->

                        <%--  <div class="row" id="cus_list_pagination_row" style="display:none">
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

                        </div>--%>
                    </div>
                </div>
            </div>
        </div>



        <%-- <div class="row">
            <div class="col-md-12">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_shopskipreason">Shop Skip Reason</h3>
                    </div>
                    <div class="panel-body">
                        <table style="display: none">
                            <tbody id="template_shopskip_row">
                                <tr style="cursor: auto;">
                                    <td>[Seq]</td>
                                    <td>[CustomerNameEng]</td>
                                    <td>[RouteName]</td>
                                    <td>[RouteCustomerSkipReason]</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover  table-bordered" id="panel_shopskip_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_ordno">No</th>
                                        <th data-translate="">Customer</th>
                                        <th data-translate="_route">Route</th>
                                        <th data-translate="_skipreason">Skip Reason</th>

                                    </tr>
                                </thead>
                                <tbody id="table_shopskip_list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>


        <div class="row">
            <div class="col-md-12">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_waysalecomments">Way Sales Comments</h3>
                    </div>
                    <div class="panel-body">
                        <uc1:controlComment runat="server" ID="controlComment" />
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("pageWayPlanDetail.js")%>'></script>
</asp:Content>
