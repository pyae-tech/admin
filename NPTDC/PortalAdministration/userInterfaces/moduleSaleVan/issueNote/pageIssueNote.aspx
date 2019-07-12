<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.Master" AutoEventWireup="true" CodeBehind="pageIssueNote.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.issueNote.pageIssueNote" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemApproval/controlApproval.ascx" TagPrefix="uc1" TagName="controlApproval" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>



<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
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
        <li class="active" data-translate="_issuenote">Issue Note</li>
        <li class="active">
            <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveRecord();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
            <button class="btn btn-info  btn-rounded  btn-labeled" type="button" onclick="PrintIssueNote();return false;"><i class="btn-label ion-printer"></i><span class="bold">Print</span></button>

            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/issue?id=');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/issues');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>

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
                     <input type="hidden" id="hf_materdataCount" value="" />
                    <input type="hidden" id="tb_id" value="" />
                    <div class="panel  ">
                        <div class="panel-heading">
                            <div class="panel-control">
                                 
                            </div>
                            <h3 class="panel-title" data-translate="_issuenoteInformation">Issue Note's Information</h3>
                        </div>
                        <div class="panel-body" id="demo-panel-collapse-default" style="min-height: 300px;  border: 1px solid silver;" >

                            <div class="form-group">
                                <label for="tb_issue_no" class="col-md-2 control-label" data-translate="_issueno">Issue No</label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" id="tb_issue_no" placeholder="Issue No" readonly="true" tabindex="-1">
                                </div>
                                <div class="col-md-3">
                                    
                                  <select id="tb_status" class="form-control">
                                        <option value="New">New</option>
                                        <option value="Ready">Ready</option>
                                        <option value="Confirm">Confirm</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" id="dtp_invoice_date" placeholder="ေန႕စြဲ">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_location" class="col-md-2 control-label">
                                    <%--   <i class="ion-pound urllink" onclick="OpenNewURLInNewTab('warehouse');return false;"></i>&nbsp;
                                    <i class="ion-refresh urllink" onclick="Load_Location_List();return false;"></i>&nbsp;--%>
                                    <span data-translate="_warehouse">Warehouse</span>
                                </label>
                                <div class="col-md-8">
                                     <select id="tb_location" class="form-control demo_select2<%--demo-chosen-select--%>" required></select>
                                   <input type="hidden" id="hf_location_id" value="" />
                                    <%-- <input type="text" class="form-control" id="tb_location" placeholder="Location">--%>
                                </div>
                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('warehouse');return false;"></i></span>&nbsp;  
                                <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_Location_List();return false;"></i></span>&nbsp;                                 
                                
                            </div>


                            <div class="form-group">
                                <label for="tb_car_name" class="col-md-2 control-label">
                                    <%--  <i class="ion-pound urllink" onclick="OpenNewURLInNewTab('cars');return false;"></i>&nbsp;
                                    <i class="ion-refresh urllink" onclick="Load_Car_List();return false;"></i>&nbsp;--%>
                                    <span data-translate="_car">Car</span>
                                </label>
                                <div class="col-md-8">
                                     <select id="tb_car" class="form-control demo_select2<%--demo-chosen-select--%>" required>
                                     </select>
                                   <input type="hidden" id="hf_car_by" value="" />
                                   <%--  <input type="text" class="form-control" id="tb_car_name" placeholder="Car">--%>
                                </div>
                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('cars');return false;"></i></span>&nbsp;  
                                <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_Car_List();return false;"></i></span>&nbsp;                                 
                                 
                            </div>
                            <div class="form-group">
                                <label for="tb_prepared_by" class="col-md-2 control-label">
                                    <%-- <i class="ion-pound urllink" onclick="OpenNewURLInNewTab('staffs');return false;"></i>&nbsp;
                                    <i class="ion-refresh urllink" onclick="Load_staff_List();return false;"></i>&nbsp;--%>
                                    <span data-translate="_preparedby">Prepared By</span>

                                </label>
                                <div class="col-md-8">
                                      <select id="tb_prepared_by" class="form-control demo_select2" >
                                     </select>
                                    <input type="hidden" id="hf_prepared_by" value="" />
                                   <%-- <input type="text" class="form-control" id="tb_prepared_by" placeholder="Prepared By">--%>
                                </div>
                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('staffs');return false;"></i></span>&nbsp;  
                                <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_staff_List();return false;"></i></span>&nbsp;                                 
                                 
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label">
                                    <%--    <i class="ion-pound urllink" onclick="OpenNewURLInNewTab('expensetitles');return false;"></i>&nbsp;
                                    <i class="ion-refresh urllink" onclick="Load_OutType_List();return false;"></i>&nbsp;--%>
                                    <span data-translate="_way">Way</span>
                                </label>
                                <div class="col-md-8">
                                     <select id="tb_way_name" class="form-control demo_select2" >
                                     </select>
                                    <input type="hidden" id="hf_way_id" value="" />
                                   <%-- <input type="text" class="form-control" id="tb_way_name" placeholder="Ways">--%>
                                </div>
                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('ways');return false;"></i></span>&nbsp;  
                                <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_Way_List();return false;"></i></span>&nbsp;                                 
                                
                            </div>

                            <div class="form-group">
                                <label for="tb_route_name" class="col-md-2 control-label">
                                    <span data-translate="_route">Route</span>
                                </label>
                                <div class="col-md-8">
                                      <select id="tb_route_name" class="form-control demo_select2" ></select>
                                  <input type="hidden" id="hf_route_id" value="" />
                                  <%--    <input type="text" class="form-control" id="tb_route_name" placeholder="Route"> </div>
                                <%--<label for="tb_route_name" class="col-md-2 control-label">--%>
                                    </div>
                                <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('wayplan');return false;"></i></span>&nbsp;  
                                <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="Load_Route_List();return false;"></i></span>&nbsp;                                 
                                   <%--</label>--%>
                            
                                </div>
                            <div class="form-group">
                                <label for="tb_remark" class="col-md-2 control-label" data-translate="_remark"></label>
                                <div class="col-md-8">
                                    <textarea class="form-control" rows="6" id="tb_remark" placeholder="Remark"></textarea>
                                </div>
                            </div>
                             <div class="form-group">
                                        <label for="tb_note" class="col-md-2 control-label"></label>
                                        <div class="col-md-10">
                                            <small><span id="lbl_created"></span></small>   &nbsp;  &nbsp;                                        
                                            <small><span id="lbl_modified"></span></small>
                                            <br />
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
                            <button class="btn btn-primary  btn-rounded btn-sm  btn-labeled" type="button" onclick="add_new_invoice_item();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New Item</span></button>
                            <i class="fa fa-thumbs-o-up fa-lg fa-fw"></i>

                        </div>
                        <h3 class="panel-title">

                            <span class="label label-primary" data-translate="_invoice_items"><span class="  itemCount">0</span> Invoie Items </span>
                        </h3>
                    </div>
                    <div class="panel-body" style="min-height: 335px">

                        <table style="display: none">
                            <tbody id="template_row">
                                <tr style="cursor: pointer;" onclick="showInvoiceItem('[InvoiceItemID]');return false;">
                                    <td>[Seq]</td>
                                    <td>[ItemName]</td>
                                    <td>[Price]</td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive"  style="min-height: 300px;  border: 1px solid silver;" id="panel_item_background" >
                            <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_no">No</th>
                                        <th data-translate="_item_name">Item Name</th>
                                        <th data-translate="_qty">Qty</th>

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

        <div class="row">
            <div class="col-md-6">

                <div class="panel ">
                    <div class="panel-heading">
                        <div class="panel-control"></div>
                          <h3 class="panel-title">Issue Note's Check Reason</h3>                        
                        </div>
                    <div class="panel-body" style="min-height: 335px">

                        <table style="display: none">
                            <tbody id="template_Reason_row">
                                <tr style="cursor: pointer;">
                                    <td>[Seq]</td>
                                    <td>[CreadtedUser]</td>
                                    <td>[CheckReasonStatus]</td>
                                     <td>[CheckReason]</td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive" id="panel_check_reson" style="min-height: 300px;  border: 1px solid silver;">
                            <table class="table table-striped table-hover  table-bordered" id="panel_Reason_list">
                                <thead>
                                    <tr>
                                        <th data-translate="_no" style="width:40px;">No</th>                                        
                                        <th data-translate="_resonCreatedby" style="width:20%;">CreatedBy</th>
                                        <th data-translate="_resonStatus" style="width:85px;">Status</th>
                                        <th data-translate="_issueNoteReason">Reason</th>

                                    </tr>
                                </thead>
                                <tbody id="table_Reason_list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
             
           <div class="col-md-6">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_adminComments">Signature</h3>
                    </div>
                    <div class="panel-body">
                        <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                        
                            </div>
                    </div>
               

               <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="_adminComments">Approve / Reject</h3>
                    </div>
                    <div class="panel-body">
                       
                          <uc1:controlApproval runat="server" ID="controlApproval" />
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
                        <h3 class="panel-title" data-translate="_adminComments">Admin Comments</h3>
                    </div>
                    <div class="panel-body">
                        <uc1:controlComment runat="server" ID="controlComment" />
                          <%--<uc1:controlApproval runat="server" ID="controlApproval" />--%>
                            </div>
                    </div>
                </div>
              </div>
        </div>

  

    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title" data-translate="_Issuenote_items">Issue Note Item</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-md-12">
                                <input type="hidden" id="hf_item_id" value="" />
                                  <select id="tb_item" class="form-control demo_select2" ></select>
                                <%--<input type="text" class="form-control" id="tb_item" placeholder="ကုန္ပစၥည္း">--%>
                            </div>


                        </div>
                        <div class="form-group">
                            <%--<div class="col-md-4">
                                <input type="text" class="form-control" id="tb_price" placeholder="ေစ်းႏွဳန္း" readonly="true">
                            </div>--%>
                            <div class="col-md-4">
                                <input type="number" class="form-control" id="tb_qty" placeholder="အေရအတြက္" value="0">
                            </div>
                            <div class="col-md-8">
                                <%--<input type="text" class="form-control" id="tb_item_cost" placeholder="က်ေငြ" readonly="true" tabindex="-1">--%>
                                <input type="text" class="form-control" id="tb_item_remark" placeholder="မွတ္ခ်က္">
                            </div>
                        </div>
                        <%--   <div class="form-group">
                            <div class="col-md-12">
                              
                            </div>

                        </div>--%>
                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="add_invoice_item();   $('#dialogBox_Detail_Form').modal('hide');return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="delete_invoice_item(); return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Remove</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="add_new_invoice_item(); return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
     <!--Form Component [ SAMPLE ]-->
 <script src='<%= ResolveUrl("../../../js/demo/ui-panels.js")%>'></script>
     <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
     <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("pageIssueNote.js")%>'></script>
</asp:Content>
