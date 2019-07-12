<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.Master" AutoEventWireup="true" CodeBehind="pageItemGroup.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterItemGroup.pageItemGroup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <style>
        .ImageContainer {
            min-height: 150px;
            border: 2px solid rgba(0,0,0,0.3);
            background: white;
            padding: 20px 20px;
            background: rgba(0,0,0,0.025);
            border-style: dashed;
            border-width: 1px;
            border-radius: 3px;
            text-align: center;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="Item Groups">Item Group</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#"><span data-translate="_materbook">Master Data</span></a></li>
        <li class="active"><span data-translate="Item Groups">Item Group</span></li>
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
                            <h3><i class="ion-link">&nbsp;</i><span data-translate="Item Groups">Item Group</span> </h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">

    <div id="template_row" style="display: none">
                                        <div class=" panel panel-c-warning" onmouseover="this.style.background='#dbdbdb';this.style.color='#000000'" onmouseout="this.style.background='#FFF',this.style.color='#000000'" onclick="GetItemType('[ItemTypeID]');return false;" style="margin-top: 5px; border-left: 3px solid #03a9f4; cursor: pointer; background-color: #fff; color: #000000; padding: 10px;">
                                            <div class="row">
                                                <div class="col-md-1">
                                                    <img id="item_list_img" src='[ItemImage]' onerror="OnImageError(this);" style="width: 50%; height: 60%;" />
                                                </div>

                                                <div class="col-md-8">
                                                    <div class="row" style="margin-bottom: 5px;"><span class="status-style [item-info]" style="font-size: 14px;"><b>[Title]</b></span></div>
                                                    <div class="row">
                                                        <i class="ion-flag" style="font-size: 15px;"></i>&nbsp  Seq <span style="font-size: 14px;">[Seq]</span>  &nbsp&nbsp
                                                        <i class="ion-information-circled" style="font-size: 15px;"></i>&nbsp   <span style="font-size: 14px;">[Remark]  &nbsp</span>&nbsp&nbsp
                                                        <%--<i class="ion-pricetags" style="font-size: 15px;"></i>&nbsp   <span style="font-size: 14px;">Price (Basic) - [ItemPrice]</span>--%>

                                                    </div>
                                                </div>


                                                <%--end invoice Region--%>
                                            </div>
                                        </div>
                                    </div>
                                     <div id="table_list">
                                    </div>
                                    <%--<table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GetItemType('[ItemTypeID]');return false;">
                                                <td>[Title]</td>
                                                <td>[Seq]</td>
                                                <td>[Remark]</td>
                                            </tr>
                                        </tbody>
                                    </table>--%>

                                <%--    <div class="table-responsive" style="min-height: 300px; border: 1px solid silver;" id="panel_list_background">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="Item Group Name">Title</th>
                                                    <th data-translate="ItemGroupSequence">Sequence</th>
                                                    <th data-translate="GroupRemark">Remark</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table_list">
                                            </tbody>
                                        </table>
                                    </div>--%>

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
                                                            <input type="text" class="form-control" id="tb_search_itemgroup" placeholder="">
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
                    <h4 class="modal-title"><span data-translate="ItemGroupDetail"></span><span>ItemGroup - Detail Information</span></h4>
                </div>

                <!--Modal body-->
                <div class="modal-body row">
                    <div class="col-md-9">
                        <form class="form-horizontal">
                            <input type="hidden" id="tb_id" value="" />

                              <div class="form-group">
                                <label for="tb_name" class="col-md-3 control-label" data-translate="">Category Name</label>
                                <div class="col-md-5">
                                    <input type="hidden" id="hf_CategoryID" value="" />
                                    <select id="tb_categoryID" class="form-control demo_select2"></select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_name" class="col-md-3 control-label" data-translate="Item Group Name">Item Name</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="tb_name" placeholder="Item Name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cb_isparent" class="col-md-3 control-label" data-translate="Is Parent">Is Parent?</label>
                                <%--<input  class="magic-checkbox" id="cb_isparent" type="checkbox">--%>
                                <div class="col-md-1" style="width: 30px;">
                                    <div style="width: 20px;">
                                        <input type="checkbox" class="form-control" id="cb_isparent" checked="checked">
                                    </div>
                                </div>

                                <div class="col-md-5" id="choose_parent">
                                    <input type="hidden" id="hf_ParentID" value="" />
                                    <select id="tb_ParentID" class="form-control demo_select2"></select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_seq" class="col-md-3 control-label" data-translate="ItemGroupSequence">Sequence</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_seq" placeholder="Sequence">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_remark" class="col-md-3 control-label" data-translate="GroupRemark">Remark</label>
                                <div class="col-md-8">
                                    <textarea class="form-control" rows="3" placeholder="Remark" id="tb_remark"></textarea>
                                </div>
                            </div>


                            <div class="form-group">
                                <label for="tb_note" class="col-md-3 control-label"></label>
                                <div class="col-md-9">
                                    <small><span id="lbl_created"></span></small>
                                    <br />
                                    <small><span id="lbl_modified"></span></small>
                                    <br />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="col-md-3">

                        <div class="col-md-12 ImageContainer" id="item_image_zone" style="display: none;">
                            <label class="col-md-12 control-label">Upload ItemType's Image</label>
                              <input type="hidden" id="tb_imagetypeid" value="" />
                            <div id="image_item" style="display: block;">

                                <img id="bind_item_image_src" src='' style="width: 60%; height: 66%;" /><br />
                                <br>
                                <button id="btn_changeImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="changeItemImage();"><i class="demo-psi-pen-5 icon-lg"></i>&nbsp; <span class="bold" data-translate="_edit">Edit</span></button>
                                &nbsp &nbsp
                                                    <button id="btn_deleteImage" class="btn btn-dark btn-icon btn-sm btn-rounded " onclick="deleteImage();"><i class="ion-close-circled icon-lg"></i>&nbsp;<span class="bold" data-translate="_delete">Delete</span></button>
                            </div>
                            <div id="Image_drop_zone" style="display: block;">
                                <button id="btn_uploadImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="UploadItemImage1();" style="padding-left: 3px;"><i class="ion-upload icon-lg"></i>&nbsp;<span class="bold" data-translate="_upload">Upload</span></button>
                            </div>
                        </div>
                        <br />


                    </div>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveItemType();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>
                     <button class="btn btn-success btn-rounded  btn-labeled" type="button" onclick="RefreshItem();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">Reflesh</span></button>


                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("pageItemGroup.js")%>'></script>
</asp:Content>
