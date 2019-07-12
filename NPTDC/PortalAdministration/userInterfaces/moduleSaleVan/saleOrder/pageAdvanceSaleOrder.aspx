<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_CustomerOrder.Master" AutoEventWireup="true" CodeBehind="pageAdvanceSaleOrder.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.saleOrder.pageAdvanceSaleOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
       <%-- <li><a href="#" data-translate="_vansale">Van Sale</a></li>--%>
        <li class="active" data-translate="_ordertitle">Sale Order</li>
        <li class="active">
            <button class="btn btn-purple  btn-rounded  btn-labeled" data-translate="_save" type="button" onclick="SaveRecord();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
            <button class="btn btn-info  btn-rounded  btn-labeled" type="button" onclick="PrintIssueNote();return false;"><i class="btn-label ion-printer"></i><span class="bold">Print</span></button>

            <button class="btn btn-mint  btn-rounded  btn-labeled" data-translate="_new" type="button" onclick="GotoPage('portal/advanceSaleOrder?id=');return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" data-translate="_delete" type="button" onclick="DeleteRecordConfirmation();return false;">
                <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold">Log</span></button>
            <button class="btn btn-dark  btn-rounded  btn-labeled" data-translate="_close" type="button" onclick="GotoPage('portal/advanceSaleOrders');return false;"><i class="btn-label ion-close"></i><span class="bold">Close</span></button>

        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">

        <div class="panel">
            <div class="pad-all file-manager">
                
                <div class="fluid file-panel ">
                    <div class="row">
                        <div class="col-md-12">                     
                            <form class="form-horizontal">
                              
                                <input type="hidden" id="tb_orderid" value="" />
                                <input type="hidden" id="hdnfldOrderid" value=""  runat="server"/>
                                 <input type="hidden" id="hdnfldCustid" value=""  runat="server"/>
                                 <input type="hidden" id="hdnfldRequestid" value=""  runat="server"/>
                                <div class="panel  ">
                                    <div class="panel-heading">
                                        <div class="panel-control">
                                        </div>
                                        <h3 class="panel-title" data-translate="_orderheader">Sale Order's Information</h3>
                        
                                    </div>
                                  <div class="col-md-2" style="float:right;margin-top: -61px;">
                                  <form runat="server">
                                      <asp:HiddenField ID="hdnfldOrderid1" runat="server" />
                                   <input type="hidden" id="checkStatus" value="0"/>
                                     <asp:Button ID="BtnExportToExcel" runat="server"  class="btn btn-mint  btn-rounded  btn-labeled" Text="Export To Excel"  style="float:right;margin-top: 27px;" OnClick="BtnExportToExcel_Click" CausesValidation="False" />
                                 
                                 </form>
                    </div>
                                    <div class="panel-body">

                                        <div class="form-group">
                                            <label for="tb_order_no" class="col-md-1 control-label" data-translate="_orderno">Order No</label>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="tb_order_no" placeholder="Order No" readonly="true" tabindex="-1">
                                            </div>
                                            <label for="dtp_order_date" class="col-md-1 control-label" data-translate="_orderdate">Order Date</label>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="dtp_order_date" placeholder="ေန႕စြဲ">
                                            </div>
                                            <label for="ddl_status" class="col-md-1 control-label" data-translate="_ordstatus">Status</label>
                                            <div class="col-md-2">
                                                <select id="ddl_status" class="form-control">
                                                    <option value="New">New</option>
                                                    <option value="Order">Order</option>
                                                    <option value="Complete">Complete</option>
                                                </select>
                                            </div>
                                             <div class="col-md-2" id="copyLast" style="display:none;">
                                                   <input type="hidden" id="hf_copylast"/>                                                
                                            <button  class="btn btn-mint  btn-rounded  btn-labeled" data-translate="" type="button" onclick="CopyLastOrder();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">Copy From Last Order</span></button>
                                      </div>
                                                 </div>

                                        <div class="form-group">

                                            <br />
                                            <div class="col-md-12 panel-bordered-primary  ">
                                                <%-- <div class="bord-btm pad-ver">

                                <ol class="breadcrumb">
                                    <li><a href="#"><span id="tb_order_no_name"></span></a></li>

                                    <li class="active" id="tb_waycustomers"></li>
                                </ol>
                            </div>--%>
                                                <div class="file-toolbar bord-btm">
                                                    <div class="btn-file-toolbar">
                                                        <input type="text" class="form-control" id="tb_searchItemsList" placeholder="Search here">
                                                     </div>
                                                     <div class="btn-file-toolbar">
                                                      <a class="btn btn-icon add-tooltip" href="#" data-original-title="Search" data-toggle="tooltip" onclick="SearchItem();return false;"><i class="icon-2x ion-search"></i></a>
                                                     </div>
                                                </div>
                                               
                                               
                                                <table style="display: none">
                                                    <tbody id="div_item_template">
                                                        <tr style="cursor: pointer;">
                                                            <td>
                                                                <img id="item_list_img" src='[ItemImage]' onerror="OnImageError(this);" style="width: 100%; height: 12%;" />

                                                            </td>
                                                            <td>[ItemNo]</td>
                                                            <td><b>[ItemName]</b>
                                                                <br /><small>[OrderQtySequence]</small><br /><small>[moq]</small>
                                                            </td>
                                                            <td style="text-align: right;">[ItemPrice]</td>
                                                            <td class="MonHeader" onclick="rowEdit('[ItemNo43]','#sp_monQty_','#tb_edit_monQty_','[ItemID1]');">
                                                                <span id="sp_monQty_[ItemNo1]" class="ShowOrderQty_[ItemNo29]" style="display: none; text-align: right;">[Mon_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo36]" value="[OrderItemID1]" />
                                                                <%-- <input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number" min="0" moq_value="[moq]" sequence_value="[OrderQtySequence]" orginal_value="[Mon_OrderQty],[ItemID2],[ItemNo44]" class="form-control checksequence  editOrderQty_[ItemNo2]" id="tb_edit_monQty_[ItemNo3]" style="display: block; text-align: right;" value="[Mon_OrderQty]"  <%--onchange="rowAcep('[ItemID2]','[ItemNo44]');"--%>>
                                                            </td>

                                                            <td class="TueHeader" onclick="rowEdit('[ItemNo45]','#sp_tueQty_','#tb_edit_tueQty_','[ItemID3]');">
                                                                <span id="sp_tueQty_[ItemNo4]" class="ShowOrderQty_[ItemNo30]" style="display: none; text-align: right;">[Tue_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo37]" value="[OrderItemID2]" />
                                                                <%--<input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number" min="0" moq_value="[moq]" sequence_value="[OrderQtySequence]" orginal_value="[Tue_OrderQty],[ItemID4],[ItemNo46]" class="form-control checksequence editOrderQty_[ItemNo5]" id="tb_edit_tueQty_[ItemNo6]" style="display: block; text-align: right;" value="[Tue_OrderQty]" <%--onchange="rowAcep('[ItemID4]','[ItemNo46]');"--%>>
                                                            </td>

                                                            <td class="WedHeader" onclick="rowEdit('[ItemNo47]','#sp_wedQty_','#tb_edit_wedQty_','[ItemID5]');">
                                                                <span id="sp_wedQty_[ItemNo7]" class="ShowOrderQty_[ItemNo31]" style="display: none; text-align: right;">[Wed_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo38]" value="[OrderItemID3]" />
                                                                <%--<input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number" min="0" moq_value="[moq]" sequence_value="[OrderQtySequence]" orginal_value="[Wed_OrderQty],[ItemID6],[ItemNo48]" class="form-control checksequence editOrderQty_[ItemNo8]" id="tb_edit_wedQty_[ItemNo9]" style="display: block; text-align: right;" value="[Wed_OrderQty]" <%--onchange="rowAcep('[ItemID6]','[ItemNo48]');"--%>>
                                                            </td>

                                                            <td class="ThuHeader" onclick="rowEdit('[ItemNo49]','#sp_thuQty_','#tb_edit_thuQty_','[ItemID7]');">
                                                                <span id="sp_thuQty_[ItemNo10]" class="ShowOrderQty_[ItemNo32]" style="display: none; text-align: right;">[Thu_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo39]" value="[OrderItemID4]" />
                                                                <%--<input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number" min="0"   sequence_value="[OrderQtySequence]" orginal_value="[Thu_OrderQty],[ItemID8],[ItemNo50]" class="form-control checksequence editOrderQty_[ItemNo11]" id="tb_edit_thuQty_[ItemNo12]" style="display: block; text-align: right;" value="[Thu_OrderQty]" <%--onchange="rowAcep('[ItemID8]','[ItemNo50]');"--%>>
                                                            </td>

                                                            <td class="FriHeader" onclick="rowEdit('[ItemNo51]','#sp_friQty_','#tb_edit_friQty_','[ItemID9]');">
                                                                <span id="sp_friQty_[ItemNo14]" class="ShowOrderQty_[ItemNo33]" style="display: none; text-align: right;">[Fri_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo40]" value="[OrderItemID5]" />
                                                                <%--<input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number"  min="0"  moq_value="[moq]" sequence_value="[OrderQtySequence]" orginal_value="[Fri_OrderQty],[ItemID10],[ItemNo52]" class="form-control checksequence editOrderQty_[ItemNo15]" id="tb_edit_friQty_[ItemNo16]" style="display: block; text-align: right;" value="[Fri_OrderQty]" <%--onchange="rowAcep('[ItemID10]','[ItemNo52]');"--%>>
                                                            </td>

                                                            <td class="SatHeader" onclick="rowEdit('[ItemNo53]','#sp_satQty_','#tb_edit_satQty_','[ItemID11]');">
                                                                <span id="sp_satQty_[ItemNo17]" class="ShowOrderQty_[ItemNo34]" style="display: none; text-align: right;">[Sat_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo41]" value="[OrderItemID6]" />
                                                                <%--<input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number" min="0" moq_value="[moq]" sequence_value="[OrderQtySequence]" orginal_value="[Sat_OrderQty],[ItemID12],[ItemNo54]" class="form-control checksequence editOrderQty_[ItemNo18]" id="tb_edit_satQty_[ItemNo19]" style="display: block; text-align: right;" value="[Sat_OrderQty]" <%--onchange="rowAcep('[ItemID12]','[ItemNo54]');"--%>>
                                                            </td>
                                                            <td class="SunHeader" onclick="rowEdit('[ItemNo55]','#sp_sunQty_','#tb_edit_sunQty_','[ItemID13]');">
                                                                <span id="sp_sunQty_[ItemNo20]" class="ShowOrderQty_[ItemNo35]" style="display: none; text-align: right;">[Sun_OrderQty] </span>
                                                                <input type="hidden" id="tb_oritemid_[ItemNo42]" value="[OrderItemID7]" />
                                                                <%--<input type="hidden" id="tb_customerGroupID" value="" />--%>
                                                                <input type="number" min="0" moq_value="[moq]"  sequence_value="[OrderQtySequence]" orginal_value="[Sun_OrderQty],[ItemID14],[ItemNo56]" class="form-control checksequence editOrderQty_[ItemNo21]" id="tb_edit_sunQty_[ItemNo22]" style="display: block; text-align: right;" value="[Sun_OrderQty]" <%--onchange="rowAcep('[ItemID14]','[ItemNo56]');"--%>>
                                                            </td>

                                                            <%--<td>--%>


                                                            <%-- <div class="btn-group pull-left">
                                                <button id="bEdit_[ItemNo23]" type="button" class="btn btn-sm btn-default" onclick="rowEdit('[ItemNo24]');" style="display: block;"><i class='ion-edit'></i></button>
                                                <button id="bAcep_[ItemNo25]" type="button" class="btn btn-sm btn-default" style="display: none;" onclick="rowAcep('[ItemID]','[ItemNo26]');"><i class='ion-checkmark'></i></button>
                                                <button id="bCanc_[ItemNo27]" type="button" class="btn btn-sm btn-default" style="display: none;" onclick="rowCancel('[ItemNo28]');"><i class='ion-close'></i></button>
                                            </div>--%>
                                                            <%--</td>--%>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div class="table-responsive">
                                                    <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 5%"></th>
                                                                <th style="width: 10%">Item No</th>
                                                                <th>Item Name</th>
                                                                <th>Item Price</th>
                                                                <th class="MonHeader" style="text-align: left; width: 7%">Mon
                                                                <input type="hidden" id="hf_mondate" value="" />
                                                                    <br />( <span id="mon_date"></span> )
                                                                </th>
                                                                <th class="TueHeader" style="text-align: left; width: 7%">Tue
                                                                     <input type="hidden" id="hf_tuedate" value="" />
                                                                    <br />( <span id="tue_date"></span> )
                                                                </th>
                                                                <th class="WedHeader" style="text-align: left; width: 7%">Wed
                                                                     <input type="hidden" id="hf_weddate" value="" />
                                                                    <br />( <span id="wed_date"></span> )
                                                                </th>
                                                                <th class="ThuHeader" style="text-align: left; width: 7%">Thu
                                                                     <input type="hidden" id="hf_thudate" value="" />
                                                                    <br />( <span id="thu_date"></span> )
                                                                </th>
                                                                <th class="FriHeader" style="text-align: left; width: 7%">Fri
                                                                     <input type="hidden" id="hf_fridate" value="" />
                                                                    <br />( <span id="fri_date"></span> )
                                                                </th>
                                                                <th class="SatHeader" style="text-align: left; width: 7%">Sat
                                                                     <input type="hidden" id="hf_satdate" value="" />
                                                                    <br />( <span id="sat_date"></span> )
                                                                </th>
                                                                <th class="SunHeader" style="text-align: left; width: 7%">Sun
                                                                     <input type="hidden" id="hf_sundate" value="" />
                                                                    <br />( <span id="sun_date"></span> )
                                                                </th>
                                                                <%-- <th style="width: 2%"></th>--%>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="item_price_list" style="min-height: 300px;  border: 1px solid silver;">
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="row">
                                                    <div id="div_pagination" style="padding: 10px;" class="row pull-right">
                                                        <input type="hidden" id="hf_current_page" value="1" />
                                                        <ul class="pager pager-rounded">
                                                            <li><span id="lbl_record_count" class="lbl_record_count"></span></li>
                                                            <li><a href="#" class=" btn_pagination_previous" onclick="pageJump(this,1);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                                            </li>
                                                            <li>
                                                                <input type="number" id="tb_current_page" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                                            <li><a href="#" class="btn_pagination_next" onclick="pageJump(this,1);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                                            <li><span id="lbl_page_count" class="lbl_page_count"></span></li>
                                                            <li><a class="btn_pagination_jump" href="#" onclick="pageJumpToThis(1);return false;"><i class="ion-refresh"></i></a></li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>

                                            <%--<label for="tb_remark" class="col-md-2 control-label" data-translate="_remark">Remark</label>--%>
                                            <div class="col-md-12">
                                                <br />
                                                <br />
                                                <br />
                                                <textarea class="form-control" rows="2" id="tb_remark" placeholder="Remark"></textarea>
                                            </div>
                                        </div>


                                    </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--===================================================-->
    <!--End page content-->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageAdvanceSaleOrder.js")%>'></script>
</asp:Content>
