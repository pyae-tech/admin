<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.Master" AutoEventWireup="true" CodeBehind="pageInvoiceDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthSaleServiceInvoice.pageInvoiceDetail" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemApproval/controlApproval.ascx" TagPrefix="uc1" TagName="controlApproval" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>




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
        <li><a href="#" data-translate="_sale">Sale</a></li>
        <li class="active" data-translate="_invoice">Invoice</li>
        <li class="active">


            <div class="btn-group">
                <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="CheckForSave();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="print_receipt();return false;"><i class="btn-label ion-printer"></i><span class="bold">Print</span></button>

                <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/SMTHServiceInvoiceDetail?id=');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                    <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold">Log</span></button>
                <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/SMTHServiceInvoice');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>

            </div>

        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">
            <div class="col-md-6">
                <form class="form-horizontal">
                    <input type="hidden" id="tb_id" value="" />
                    <div class="panel  ">
                        <div class="panel-heading">
                            <div class="panel-control">
                            </div>
                            <h3 class="panel-title" data-translate="_invoice_information">Invoice Information</h3>
                        </div>
                        <div class="panel-body">

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_invoice_no">Invoice No</label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" id="tb_vouncer_no" placeholder="ေဘာင္ခ်ာ No." readonly="true" tabindex="-1">
                                </div>
                                <div class="col-md-3">
                                    <select id="tb_status" class="form-control">
                                        <option value="New">New</option>
                                        <option value="Order">Order</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="dtp_invoice_date" placeholder="ေန႕စြဲ">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="_customer">Customer</label>
                                <div class="col-md-10">
                                    <input type="hidden" id="hf_customer_id" value="" />
                                    <input type="text" class="form-control" id="tb_customer_name" placeholder="ဝယ္ယူသူ">
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
                <div class="panel ">
                    <div class="panel-heading">
                        <div class="panel-control">
                            <button class="btn btn-primary  btn-rounded btn-sm  btn-labeled" type="button" onclick="add_new_invoice_item(); $('#dialogBox_Detail_Form').modal('show');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New Item</span></button>
                            <i class="fa fa-thumbs-o-up fa-lg fa-fw"></i>

                        </div>
                        <h3 class="panel-title">

                            <span class="label label-primary" data-translate="_invoice_items"><span class="  itemCount">0</span> Invoice Items </span>
                        </h3>
                    </div>
                    <div class="panel-body" style="min-height: 375px">

                        <table style="display: none">
                            <tbody id="template_row">
                                <tr style="cursor: pointer;" onclick="showInvoiceItem('[InvoiceItemID]');return false;">
                                    <td>[Seq]</td>
                                    <td>[ItemName]</td>
                                    <td>[Price]</td>
                                    <td>[Discount]</td>
                                    <td style="text-align: right;">[Cost]</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive" style="min-height: 300px; border: 1px solid silver;" id="panel_item_list_background">
                            <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_no">No</th>
                                        <th data-translate="_item_name">Item Name</th>
                                        <th data-translate="_price">Price</th>
                                        <th data-translate="">Discount</th>
                                        <th ><span data-translate="_cost">Cost</span> [<span id="system_currency"></span>]</th>
                                    </tr>
                                </thead>
                                <tbody id="table_list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <%-- Service - Start--%>


                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                            <button class="btn btn-primary  btn-rounded btn-sm  btn-labeled" type="button" onclick="add_new_service();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New Service</span></button>
                            <i class="fa fa-thumbs-o-up fa-lg fa-fw"></i>

                        </div>
                        <h3 class="panel-title" data-translate="_Services">Services</h3>
                    </div>
                    <div class="panel-body" style="min-height: 230px">

                        <table style="display: none">
                            <tbody id="template_service_row">
                                <tr style="cursor: pointer;">
                                    <td onclick="GetServices('[ServiceID]');return false;">[no]</td>
                                    <td>[ServiceNo]</td>
                                    <td>[CustomerNameEng]</td>
                                    <%--<td style="text-align:right;">[ServiceAmount]</td>--%>
                                    <td style="text-align: right;">[TotalAmount]</td>
                                    <td>
                                        <div class="btn-group pull-left">
                                            <button type="button" class="btn btn-sm btn-default" onclick="rowServiceCancel('[ServiceID]');"><i class='ion-close'></i></button>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive" style="min-height: 245px; border: 1px solid silver;" id="panel_service_list_background">
                            <table class="table table-striped table-hover  table-bordered" id="panel_service_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_no">No</th>
                                        <th data-translate="_ServiceNo">Service No</th>
                                        <%--<th data-translate="">Service Status</th>--%>
                                        <th data-translate="_customer">Customer</th>
                                        <%--<th data-translate="_servicecharges">SC</th>--%>
                                        <%--<th data-translate="">Services User</th>--%>
                                        <th data-translate="_amount">Amount</th>
                                        <th style="width: 10%;"></th>
                                    </tr>
                                </thead>
                                <tbody id="table_list_service">
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <%--  Service - End--%>
                <%--Approve/Reject--%>
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_approve_reject">Approve / Reject</h3>
                    </div>
                    <div class="panel-body" style="min-height: 50px">
                        <form class="form-horizontal">
                            <div class="form-group">

                                <div class="col-md-12">
                                    <uc1:controlApproval runat="server" ID="controlApproval" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div class="col-md-6">

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_costing">Costing</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label" data-translate="_totalItemCost">Total Item Cost</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control invoice_final_calculator" id="tb_total_item_cost" readonly placeholder="0" style="text-align: right">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label" data-translate="_totalServiceCost">Total Service Cost</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control invoice_final_calculator" id="tb_total_Service_cost" readonly placeholder="0" style="text-align: right">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label"><span data-translate="_discount">Discount</span> ( % ) </label>
                                <div class="col-md-3">
                                    <input type="number" onkeypress="return event.charCode >= 48" min="0" class="form-control invoice_final_calculator" id="tb_discount_percentage" placeholder="0" style="text-align: right">
                                </div>
                                <%--<div class="col-md-1">
                                <span>% </span>
                                     </div>--%>
                                <%--<label for="tb_code" class="col-md-1 control-label"> % </label>--%>
                                <div class="col-md-6">
                                    <input type="text" class="form-control invoice_final_calculator" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_discount_amount" placeholder="0" style="text-align: right">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label"><span data-translate="_tax">Tax</span> ( % )</label>
                                <div class="col-md-3">
                                    <input type="number" min="0" class="form-control invoice_final_calculator" onkeypress="return event.charCode >= 48" id="tb_tax_percentage" placeholder="0" style="text-align: right">
                                </div>
                                <%--   <div class="col-md-1">
                                <span>% </span>
                                     </div>--%>
                                <div class="col-md-6">
                                    <input type="text" class="form-control invoice_final_calculator" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_tax_amount" placeholder="0" style="text-align: right">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label"><span data-translate="_servicecharges">Service Charges</span> ( % )</label>
                                <div class="col-md-3">
                                    <input type="number" min="0" class="form-control invoice_final_calculator" onkeypress="return event.charCode >= 48" id="tb_sc_percentage" placeholder="0" style="text-align: right">
                                </div>

                                <div class="col-md-6">
                                    <input type="text" class="form-control invoice_final_calculator" onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_sc_amount" placeholder="0" style="text-align: right">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label" data-translate="_other1">Other 1</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="tb_other1_title" placeholder="ေခါင္းစဥ္" style="text-align: left">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control invoice_final_calculator" onkeypress="return NumberExpressionWithSign(event.key)" id="tb_other1_amount" placeholder="0" style="text-align: right">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label" data-translate="_other2">Other 2</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="tb_other2_title" placeholder="ေခါင္းစဥ္" style="text-align: left">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control invoice_final_calculator" id="tb_other2_amount" onkeypress="return NumberExpressionWithSign(event.key)" placeholder="0" style="text-align: right">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label" data-translate="_finalInvoiceCost">Final Invoice Cost</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control " id="tb_invoice_amount" placeholder="0" style="text-align: right" readonly>
                                </div>
                            </div>



                        </form>

                    </div>
                </div>

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_payment">Payment</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form class="form-horizontal">


                                <div class="col-md-6">

                                    <div class="form-group">

                                        <div class="col-md-12">

                                            <textarea class="form-control" rows="3" id="tb_invoice_remark" placeholder="ေဘာင္ခ်ာမွတ္ခ်က္"></textarea>
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <div class="col-md-12">

                                            <textarea class="form-control" rows="3" id="tb_payment_remark" placeholder="ေငြေခ် မွတ္ခ်က္္"></textarea>
                                        </div>

                                    </div>

                                </div>
                                <div class="col-md-6">

                                    <div class="form-group">
                                        <label for="tb_code" class="col-md-5 control-label" style="text-align: right;" data-translate="_cash">Cash</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control invoice_final_calculator " onkeypress="return NumberExpressionWithoutSign(event.key)" id="tb_direct_cash" placeholder="0" style="text-align: right">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="tb_code" class="col-md-5 control-label" style="text-align: right;" data-translate="_refund_amount">Refund</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="tb_refund_amount" placeholder="0" style="text-align: right" readonly="true">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="tb_code" class="col-md-5 control-label" style="text-align: right;" data-translate="_credit_paid">Credit Collected</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="tb_credit_paid" placeholder="0" style="text-align: right" readonly="true">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="tb_code" class="col-md-5 control-label" style="text-align: right;" data-translate="_credit_remain">Credit Remain</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="tb_credit_remain" placeholder="0" style="text-align: right" readonly="true">
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <%--Approve/Reject--%>
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_signature">Signature</h3>
                    </div>
                    <div class="panel-body" style="min-height: 50px">
                        <form class="form-horizontal">
                            <div class="form-group">

                                <div class="col-md-12">
                                    <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_waysale">Way's Sale</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label" style="text-align: right;" data-translate="_waysale">Way</label>
                                <div class="col-md-9">
                                    <input type="hidden" id="hf_way_id" value="" />
                                    <input type="text" class="form-control" id="tb_way_name" placeholder="အေရာင္းလမ္းေၾကာင္း">
                                </div>
                            </div>



                        </form>

                    </div>
                </div>


                <%-- Comment--%>
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_invoiceComments">Invoice Comments</h3>
                    </div>
                    <div class="panel-body" style="min-height: 50px">
                        <uc1:controlComment runat="server" ID="controlComment" />
                    </div>
                </div>

                <%--Comment End--%>
            </div>

        </div>




    </div>

    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title" data-translate="_invoice_items">Invoice Item</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">

                            <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="_item">Item</span>
                            </label>
                            <div class="col-md-10">
                                <input type="hidden" id="hf_item_id" value="" />
                                <input type="hidden" id="hf_ItemCurrencyID" value="" />
                                <input type="hidden" id="hf_ItemPriceOri" value="" />
                                <input type="hidden" id="hf_CurrencyID" value="" />
                                <input type="hidden" id="hf_CurrencyCode" value="" />
                                 <input type="hidden" id="hf_ExchangeRate" value="" />                                
                                <input type="hidden" id="hf_System_ExchangeRate" value="" />

                                <select id="tb_item" class="form-control demo_select2" onselect="InsertPrice()"></select>
                                <%--<input type="text" class="form-control" id="tb_item" placeholder="ကုန္ပစၥည္း">--%>
                            </div>



                        </div>
                        <div class="form-group">
                            <label for="tb_name" class="col-md-2 control-label" style="text-align: left;" data-translate="">Currency</label>
                            <div class="col-md-4">
                               
                                <select id="ddl_currency" class="form-control demo_select2"></select>

                            </div>
                             <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="">Rate</span>
                            </label>
                            <div class="col-md-4">
                                <input type="number" min="0" onkeypress="return event.charCode >= 48" class="form-control" id="tb_ExchangeRate" placeholder="Exchange Rate" value="0" style="text-align: right;">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="">Price</span>
                            </label>
                            <div class="col-md-4">
                                <input type="number" min="0" onkeypress="return event.charCode >= 48" class="form-control" id="tb_price" placeholder="ေစ်းႏွဳန္း" style="text-align: right;">
                            </div>
                            <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="">Qty</span>
                            </label>
                            <div class="col-md-4">
                                <input type="number" min="0" onkeypress="return event.charCode >= 48" class="form-control" id="tb_qty" placeholder="အေရအတြက္" value="0" style="text-align: right;">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="">Discount</span>
                            </label>
                            <div class="col-md-4">
                                <input type="number" min="0" onkeypress="return event.charCode >= 48" class="form-control" id="tb_item_discount" placeholder="ေလွ်ာ့ေစ်း" style="text-align: right;">
                            </div>
                            <div class="col-md-4">
                                <input type="hidden" id="hf_discount_amount" value="" />
                                <input type="hidden" id="hf_discount_percent" value="" />
                                <input id="rdo_amount" class="magic-radio" type="radio" name="rdo_discount" checked>
                                <label for="rdo_amount">Amount</label>

                                <input id="rdo_percent" class="magic-radio" type="radio" name="rdo_discount">
                                <label for="rdo_percent">%</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="">Cost</span>
                            </label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_item_cost" placeholder="က်ေငြ" readonly="true" tabindex="-1" style="text-align: right;">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_location" class="col-md-2 control-label" style="text-align: left;">
                                <span data-translate="">Remark</span>
                            </label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" id="tb_item_remark" placeholder="မွတ္ခ်က္">
                            </div>

                        </div>
                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="add_invoice_item();  return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="delete_invoice_item(); return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Remove</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="add_new_invoice_item(); return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="dialogBox_Service_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">

        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title" data-translate="_invoice_items">Service</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <div class="pad-all file-manager">
                        <div class="fixed-fluid">
                            <div class="fluid file-panel ">
                                <div class="row">
                                    <div class="col-md-12 panel-bordered-primary  ">
                                        <div class="bord-btm pad-ver">
                                            <input type="hidden" id="tb_routeid" value="" />
                                            <input type="hidden" id="tb_orgid" value="" />

                                        </div>
                                        <div class="file-toolbar bord-btm">
                                            <div class="btn-file-toolbar">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="btn-group btn-file-toolbar">
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                    <i class="btn-label ion-chevron-left"></i>
                                                    <span class="bold" data-translate="_front">ေရွ႕</span></button>
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">
                                                    <span class="bold" data-translate="_back">ေနာက္</span>
                                                    <i class="btn-label ion-chevron-right"></i>
                                                </button>
                                            </div>
                                            <div class="btn-file-toolbar">
                                                <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>
                                            <div class="btn-file-toolbar">
                                                <input value="" type="checkbox" id="btn_search_all_dates" />

                                            </div>



                                            <div class="btn-file-toolbar">
                                                <a class="btn btn-icon add-tooltip" href="#" onclick="CheckAll();return false;" data-original-title="Check All" data-toggle="tooltip"><i class="icon-2x ion-checkmark"></i></a>
                                                <a class="btn btn-icon add-tooltip" href="#" data-original-title="Uncheck All" data-toggle="tooltip" onclick="UnCheckAll();return false;"><i class="icon-2x ion-close"></i></a>
                                                <%--<a class="btn btn-icon add-tooltip" href="#" data-original-title="Remove from way" data-toggle="tooltip" onclick="Remove_Customer_From_Way();return false;"><i class="icon-2x ion-trash-a"></i></a>--%>
                                                <a class="btn btn-icon add-tooltip" href="#" data-original-title="Add Service" data-toggle="tooltip" onclick="add_service_to_invoice();return false;"><i class="icon-2x  ion-arrow-up-a"></i></a>

                                                <%--<a class="btn btn-icon add-tooltip" href="#" data-original-title="Move down" data-toggle="tooltip" onclick="Move_Up_Customer();return false;"><i class="icon-2x ion-arrow-down-a"></i></a>--%>
                                            </div>

                                            <br />
                                            <br />
                                            <%--   <div id="div_customer_route_template" style="display: none;">       --%>
                                            <table style="display: none">
                                                <tbody id="template_new_service_row">
                                                    <tr style="cursor: pointer;">
                                                        <td>
                                                            <div class="file-control">
                                                                <input type="hidden" id="tb_cusseq" value="" />
                                                                <span style="margin-left: -7px;"><small><i>[no]</i></small></span>   &nbsp; &nbsp;
                                                                <input id="[ServiceID]" class="magic-checkbox services_chk" type="checkbox">
                                                                <label for="[ServiceID]"></label>
                                                            </div>
                                                        </td>
                                                        <td>[ServiceDate]</td>
                                                        <td>[ServiceNo]</td>
                                                        <td>[ServiceStatus]</td>
                                                        <td>[CustomerNameEng]</td>
                                                        <td>[UserName]</td>
                                                        <td style="text-align: right;">[TotalAmount]</td>
                                                        <%-- <td>[ServiceDescription]</td>--%>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="table-responsive">
                                                <table class="table table-striped table-hover  table-bordered" id="panel_new_service_list">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th data-translate="">Service Date</th>
                                                            <th data-translate="">Service No</th>
                                                            <th data-translate="">Service Status</th>
                                                            <th data-translate="">Customer</th>
                                                            <th data-translate="">Services User</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="table_list_new_service">
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

                <!--Modal footer-->
                <div class="modal-footer">
                    <%--  <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="add_invoice_item();  return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="delete_invoice_item(); return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Remove</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="add_new_invoice_item(); return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    --%>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("pageInvoiceDetail.js")%>'></script>
</asp:Content>
