<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.Master" AutoEventWireup="true" CodeBehind="pageInvoice.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthSaleServiceInvoice.pageInvoice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="_invoice">Invoices</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_sale">Sale</a></li>
        <li class="active" data-translate="_invoice">Invoice</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/SMTHServiceInvoiceDetail');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span> <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_advancedsearch">Advanced search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-printer"></i>&nbsp;<span data-translate="_invoice">Invoices</span> <span class="list_total_amount"></span></h3>
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


                                            <div class="col-md-4 col-sm-4">
                                                <div class="btn-group">
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                        <i class="btn-label ion-chevron-left"></i>
                                                        <span class="bold" data-translate="_front">ေရွ႕</span></button>
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">
                                                        <span class="bold" data-translate="_back">ေနာက္</span>    <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-3">                                               
                                               <%--  <select id="tb_customer_name" class="form-control" onchange="SelectChange();"></select>--%>
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
                                            <tr style="cursor: pointer;" onclick="GotoPage('Portal/SMTHServiceInvoiceDetail?id=[SellVouncherID]');return false;">
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
                                    <div class="table-responsive" style="min-height: 300px; border:1px solid silver;"  id="panel_list_background">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="_no">No</th>
                                                    <th data-translate="_invoice_no">Invoice No</th>
                                                    <th data-translate="_customer">Customer</th>
                                                    <th data-translate="_invoicestatus">Status</th>
                                                    <th style="text-align: right;" data-translate="_amount">Amount</th>
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
                                                        <label for="tb_search_text" class="col-md-2 control-label">Customer</label>
                                                        <div class="col-md-6">
                                                             <select id="tb_customer_name" class="form-control" onchange="SelectChange();"></select>
                                                        </div>

                                                    </div>
                                                    <div class="form-group">
                                                        <label for="tb_search_text" class="col-md-2 control-label">Search Text</label>
                                                        <div class="col-md-6">
                                                            <input type="text"  id ="tb_search_invoice_text" class="form-control"/>
                                                        </div>

                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-md-2"></div>
                                                        <div class="col-md-6">


                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="clearSearch();return false;">
                                                                <i class="btn-label ion-backspace"></i>
                                                                <span class="bold">Show All</span></button>

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span class="bold">Search</span></button>


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







</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageInvoice.js")%>'></script>
</asp:Content>
