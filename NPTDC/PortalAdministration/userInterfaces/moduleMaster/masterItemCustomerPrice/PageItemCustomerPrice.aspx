<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.master" AutoEventWireup="true" CodeBehind="PageItemCustomerPrice.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterItemCustomerPrice.PageItemCustomerPrice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <div id="page-head">
    </div>


    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">

        <div class="panel">
            <div class="pad-all file-manager">
                <div class="fixed-fluid">
                    <div class="fixed-sm-200 pull-sm-left file-sidebar">


                        <p class="pad-hor mar-top text-main text-bold text-sm text-uppercase">Customer Groups</p>
                        <div class="list-group bg-trans pad-ver bord-btm" id="div_customerGroup_list">
                            <a href="#" class="list-group-item"><i class="demo-pli-folder-with-document icon-lg icon-fw"></i>User Folders</a>
                            <a href="#" class="list-group-item"><i class="demo-pli-camera-2 icon-lg icon-fw"></i>Photos</a>
                            <a href="#" class="list-group-item"><i class="demo-pli-video icon-lg icon-fw"></i>Videos</a>
                        </div>



                    </div>
                    <div class="fluid file-panel ">

                        <div class="row">
                            <div class="col-md-8 panel-bordered-primary  ">
                                <div class="bord-btm pad-ver">
                                    <input type="hidden" id="tb_routeid" value="" />
                                    <ol class="breadcrumb">
                                        <li><a href="#"> <span id="item_Group_name"> </span></a></li>
                                       
                                        <li class="active" id="tb_waycustomers"></li>
                                    </ol>
                                </div>
                                <div class="file-toolbar bord-btm">
                                    <div class="btn-file-toolbar">

                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Refresh" data-toggle="tooltip"><i class="icon-2x demo-pli-reload-3"></i></a>
                                    </div>
                                    <%--<div class="btn-file-toolbar">
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Move up" data-toggle="tooltip"><i class="icon-2x  ion-arrow-up-a"></i></a>
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Move down" data-toggle="tooltip"><i class="icon-2x ion-arrow-down-a"></i></a>
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Remove from way" data-toggle="tooltip" onclick="Remove_Customer_From_Way();return false;"><i class="icon-2x ion-close"></i></a>
                                    </div>--%>
                                    <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_searchItemsList" placeholder="Search here">
                                    </div>
                                </div>

                                <table style="display: none">
                                    <tbody id="div_item_template">
                                        <tr style="cursor: pointer;">
                                            <td>[ItemNo]</td>
                                            <td>[ItemName]</td>
                                            <td style="text-align:right;">[ItemPrice]</td>
                                            <td>
                                                <span id="sp_edit_price_[ItemNo]" style="display:block;text-align:right;">[CustomerGroupPrice] </span>
                                                <input type="hidden" id="tb_id_[ItemNo]" value="[ItemCustomerID]" /> <input type="hidden" id="tb_customerGroupID" value="" />
                                                <input type="number" class="form-control" id="tb_edit_price_[ItemNo]" style="display:none;text-align:right;" value="[CustomerGroupPrice]"></td>
                                            <td>
                                                <div class="btn-group pull-left">
                                                    <button id="bEdit_[ItemNo]" type="button" class="btn btn-sm btn-default" onclick="rowEdit('[ItemNo]');" style="display: block;"><i class='ion-edit'></i></button>
                                                    <button id="bAcep_[ItemNo]" type="button" class="btn btn-sm btn-default" style="display: none;" onclick="rowAcep('[ItemID]','[ItemNo]');"><i class='ion-checkmark'></i></button>
                                                    <button id="bCanc_[ItemNo]" type="button" class="btn btn-sm btn-default" style="display: none;" onclick="rowCancel('[ItemNo]');"><i class='ion-close'></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="table-responsive" style="min-height: 300px; border:1px solid silver;" id="panel_list_background">
                                    <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                        <thead>
                                            <tr>
                                                <th>Item No</th>
                                                <th>Item Name</th>
                                                <th>Item Price</th>
                                                <th style="text-align:left;">Item Customer Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="item_price_list">
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

                               <div class="col-md-4  ">
                                <div class="bord-btm pad-ver">
                                    <ol class="breadcrumb">
                                        <li class="active">Available Item Group</li>
                                    </ol>
                                </div>
                                <div class="file-toolbar bord-btm">
                                    
                                    <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_searchItemGroup" placeholder="Search here">
                                    </div>
                                    <div class="btn-file-toolbar">
                                        <%--<a class="btn btn-icon ion-search" href="#" onclick="Add_ItemType_To_ItemCustomer();return false;" data-original-title="Add to way" data-toggle="tooltip"><i class="icon-2x ion-arrow-left-a"></i></a>--%>
                                        <span><i class="icon-2x ion-search"></i></span>
                                    </div>
                                    <div class="btn-file-toolbar pull-right">
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Refresh" data-toggle="tooltip"><i class="icon-2x demo-pli-reload-3"></i></a>
                                    </div>
                                </div>

                                <div id="div_available_ItemType_template" style="display: none;">

                                    <li>
                                        <div class="file-control">
                                             <input id="[ItemTypeID]" name="rdo_itemgroup" class="magic-radio available_itemtype" type="radio" onclick="Search_Item_By_ItemGroup('[ItemTypeID]')"/>
                                            <label for="[ItemTypeID]"></label>
                                        </div>
                                       
                                        <div class="file-settings"><a href="#"><i class="pci-ver-dots"></i></a></div>
                                        <div class="file-attach-icon"></div>
                                        <a href="#" class="file-details" onclick="Add_To_List('[ItemTypeID]')">
                                            <div class="media-block">
                                                <div class="media-left"><i class="demo-pli-file-jpg"></i></div>
                                                <div class="media-body">
                                                    <p class="file-name">[TypeName]</p>
                                                   
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                </div>

                                <ul class="file-list" id="div_available_customer">
                                </ul>
                             <div class="row">
                                    <div id="div_pagination2" style="padding: 10px;" class="row pull-right">
                                        <input type="hidden" id="hf_current_page2" value="1" />
                                        <ul class="pager pager-rounded">
                                            <li><span id="lbl_record_count2"></span></li>
                                            <li><a href="#" id="btn_pagination_previous2" onclick="pageJump(this,2);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                            </li>
                                            <li>
                                                <input type="number" id="tb_current_page2"  value="1" style="width: 50px; color: black; text-align: right" /></li>
                                            <li><a href="#" id="btn_pagination_next2" onclick="pageJump(this,2);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                            <li><span id="lbl_page_count2"></span></li>
                                            <li><a id="#btn_pagination_jump" href="#" onclick="pageJumpToThis(2);return false;"><i class="ion-refresh"></i></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--===================================================-->
    <!--End page content-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("PageItemCustomerPrice.js")%>'></script>
</asp:Content>
