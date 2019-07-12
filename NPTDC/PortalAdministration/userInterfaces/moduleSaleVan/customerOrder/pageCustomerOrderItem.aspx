<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.master" AutoEventWireup="true" CodeBehind="pageCustomerOrderItem.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.customerOrder.pageCustomerOrderItem" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_vansale">Van Sale</a></li>
        <li class="active" data-translate="_ordertitle">Sale Order</li>
        <li class="active">
            <button class="btn btn-purple  btn-rounded  btn-labeled" data-translate="_save" type="button" onclick="SaveRecord();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
            <button class="btn btn-info  btn-rounded  btn-labeled" type="button" onclick="PrintIssueNote();return false;"><i class="btn-label ion-printer"></i><span class="bold">Print</span></button>

            <button class="btn btn-mint  btn-rounded  btn-labeled" data-translate="_new" type="button" onclick="GotoPage('portal/order?id=');return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" data-translate="_delete" type="button" onclick="DeleteRecordConfirmation();return false;">
                <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold">Log</span></button>
            <button class="btn btn-dark  btn-rounded  btn-labeled" data-translate="_close" type="button" onclick="GotoPage('portal/orders');return false;"><i class="btn-label ion-close"></i><span class="bold">Close</span></button>

        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">
            <div class="col-md-6" >
                <form class="form-horizontal" >
                    <input type="hidden" id="tb_id" value="" />
                    <div class="panel  ">
                        <div class="panel-heading">
                            <div class="panel-control">
                            </div>
                            <h3 class="panel-title" data-translate="_orderheader">Sale Order's Information</h3>
                        </div>
                        <div class="panel-body" style="min-height:336px;">

                            <div class="form-group">
                                <label for="tb_issue_no" class="col-md-3 control-label" data-translate="_orderno">Order No</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="tb_order_no" placeholder="Order No" readonly="true" tabindex="-1">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_location" class="col-md-3 control-label" data-translate="_orderdate">Order Date</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="dtp_order_date" placeholder="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_location" class="col-md-3 control-label" data-translate="_ordstatus">Status</label>
                                <div class="col-md-5">
                                    <select id="ddl_status" class="form-control">
                                        <option value="New">New</option>
                                        <option value="Order">Order</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_location" class="col-md-3 control-label">
                                    <span data-translate="_ordcustomer">Customer</span>
                                </label>
                                <%--<label for="tb_customer" class="col-md-3 control-label" data-translate="_ordcustomer"><i class="ion-pound urllink" onclick="OpenNewURLInNewTab('customers');return false;"></i>&nbsp;<i class="ion-refresh urllink" onclick="Load_Customer_List();return false;"></i>&nbsp;Customer</label>--%>
                                <div class="col-md-8">
                                    <input type="hidden" id="hf_customer_id" value="" />
                                    <input type="text"  id="tb_customer_name" class="form-control " placeholder="" readonly="true" />
                                </div>
                               <%-- <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('customers');return false;"></i></span>&nbsp;  
                                <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_Customer_List();return false;"></i></span>&nbsp;                                 
                                --%>
                            </div>
                            <div class="form-group">
                                <label for="tb_remark" class="col-md-3 control-label" data-translate="_remark">Remark</label>
                                <div class="col-md-8">

                                    <textarea class="form-control" rows="5" id="tb_remark" placeholder="Remark"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            <div class="col-md-6">

                <div class="panel ">
                    <div class="panel-heading">
                        <div class="panel-control">
                            <button class="btn btn-primary  btn-rounded btn-sm  btn-labeled" type="button" onclick="add_order_item();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New Item</span></button>
                            <i class="fa fa-thumbs-o-up fa-lg fa-fw"></i>

                        </div>
                        <h3 class="panel-title">

                            <span class="label label-primary" data-translate="_ordrecord"><span class="  itemCount">0</span> Order Items </span>
                        </h3>
                    </div>
                    <div class="panel-body" style="min-height: 335px">

                        <table style="display: none">
                            <tbody id="template_row">
                                <tr style="cursor: pointer;" onclick="showorderitems('[OrderItemID]');return false;">
                                    <td>[Seq]</td>
                                    <td>[ItemName]</td>
                                    <td style="text-align: right;">[OrderQty]</td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_ordno">No</th>
                                        <th data-translate="_orditemname">Item Name</th>
                                        <th data-translate="_ordqty" style="text-align: right;">Qty</th>

                                    </tr>
                                </thead>
                                <tbody id="table_list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <%--  <div class="row">
            <div class="col-md-12">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_adminComments">Admin Comments</h3>
                    </div>
                    <div class="panel-body">
                        <uc1:controlComment runat="server" ID="controlComment" />
                    </div>
                </div>
            </div>
        </div>--%>
    </div>

    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title" data-translate="_ordrecord">Order Item</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-md-12">
                                <input type="hidden" id="hf_item_id" value="" />

                                <input type="text" class="form-control" data-translate="_orditemname" id="tb_item" placeholder="ကုန္ပစၥည္း">
                            </div>


                        </div>
                        <div class="form-group">
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_qty" data-translate="_ordqty" style="text-align: right;" placeholder="အေရအတြက္">
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="tb_item_remark" data-translate="_ordremark" placeholder="မွတ္ခ်က္">
                            </div>
                        </div>

                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" data-translate="_save" onclick="add_order_item();$('#dialogBox_Detail_Form').modal('hide');return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" data-translate="_delete" onclick="delete_order_item(); return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold">Remove</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" data-translate="_new" onclick="add_new_order_item(); return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" data-translate="_close" type="button"><i class="btn-label ion-close"></i><span class="bold">Close</span></button>


                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("pageCustomerOrderItem.js")%>'></script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
    <style>
        .form-group {
            margin-bottom: 5px;
        }
    </style>
</asp:Content>
