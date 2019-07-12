<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" CodeBehind="pageSystemMenu.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemMenu.pageSystemMenu" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/jstree/themes/default/style.css")%>' rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <div id="page-title">
        <h1 class="page-header text-overflow">SysMenu</h1>
    </div>
    <!--End page title-->


    <!--Breadcrumb-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">System</a></li>
        <li class="active">Menus</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
    </ol>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-share"></i>&nbsp;Menus</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">
                                    <div class="row">
                                        <div class="col-md-4">



                                            <!-- Custom Icon - Premium Solid Icons -->
                                            <!---------------------------------->
                                            <div class="panel">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title">Menu Tree View</h3>
                                                </div>
                                                <div class="panel-body" style="height: 800px; overflow-y: scroll;" id="treeview_room">
                                                    <%--<div id="treeView_menu">--%>
                                                   <%--     <ul>
                                                            <li class='jstree-open'>
                                                            Advanced Payment<ul><li data-jstree='{"type":"html"}'>Wallets </li>
                                                            <li data-jstree='{"type":"html"}'>Wallet Transfer </li>
                                                            <li data-jstree='{"type":"html"}'>Wallet Transaction </li>
                                                            <li data-jstree='{"type":"html"}'>Monthly Cash Flow </li>
                                                            <li data-jstree='{"type":"html"}'>Daily Income </li>
                                                            <li data-jstree='{"type":"html"}'>Daily Expense </li>
                                                            <li data-jstree='{"type":"html"}'>Beak Line </li>
                                                            <li data-jstree='{"type":"html"}'>Beak Line </li>
                                                            <li data-jstree='{"type":"html"}'>Beak Line </li>
                                                            <li data-jstree='{"type":"html"}'>Advanced Payment </li>
                                                            </ul></li>
                                                        </ul>--%>


                                                    <%--</div>--%>

 
                                                </div>
                                            </div>
                                            <!---------------------------------->


                                            <!---------------------------------->

                                        </div>


                                        <div class="col-md-8">
                                            <div class="panel">


                                                <!--Modal header-->
                                                <div class="panel-header">
                                                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                                                    <h4 class="modal-title">Menu - Detail Information</h4>
                                                </div>

                                                <!--Modal body-->
                                                <div class="panel-body">
                                                    <form class="form-horizontal">
                                                        <input type="hidden" id="tb_id" value="" />

                                                        <div class="form-group">

                                                            <label for="tb_name" class="col-md-2 control-label">Menu Name</label>
                                                            <div class=" col-md-4">
                                                                <input type="text" class="form-control" id="tb_menuname" placeholder="Enter Menu">
                                                            </div>
                                                            <label for="tb_code" class="col-md-2 control-label" style="text-align: right;">Menu Label</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control" id="tb_menulabel" placeholder="Enter Menu Label">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">

                                                            <label for="tb_name" class="col-md-2 control-label">Link Page</label>
                                                            <div class=" col-md-4">
                                                                <input type="text" class="form-control" id="tb_menulinkpage" placeholder="Enter Menu Link Page">
                                                            </div>
                                                            <label for="tb_code" class="col-md-2 control-label" style="text-align: right;">Menu Seq</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control" id="tb_menuseq" placeholder="Enter Menu Seq">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_code" class="col-md-2 control-label" style="text-align: right;">OnClick</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control" id="tb_menuclick" placeholder="Enter Menu Onclick">
                                                            </div>
                                                            <label for="tb_code" class="col-md-2 control-label" style="text-align: right;">Menu Icon</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control" id="tb_menuicon" placeholder="Enter Menu Icon">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <div class="col-md-2">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label class=" control-label" style="text-align: left">
                                                                    <input type="checkbox" id="cb_isnode" style="width: 20px; height: 20px;" onchange="ShowNodeMenu();" />&nbsp;Is Node</label>
                                                            </div>
                                                             <div class="col-md-4" style="margin-left: -181px;margin-top: 10px;" id="isNodeMenu">
                                                                <select id="ddl_notemenu" class="form-control demo_select2" required></select>
                                                                <input type="hidden" id="hf_notemenu" value="" /> 
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
                                                <div class="panel-footer">
                                                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveSysMenu();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
                                                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                                                        <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
                                                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
                                                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold">Close</span></button>

                                                </div>

                                            </div>


                                        </div>
                                    </div>

                                </div>

                                <div class="tab-pane fade" id="tab-search"  >
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">

                                                    <div class="form-group">

                                                        <label for="tb_search_text" class="col-md-2 control-label">Name / Label</label>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" id="tb_search_text1" placeholder="">
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

    <div class="row" style="display:none">
        <table style="display: none">
            <tbody id="template_row">
                <tr style="cursor: pointer;" onclick="GetSysMenu('[MenuID]');return false;">
                    <td>[MenuName]</td>
                    <td>[MenuLabel]</td>
                    <td>[MenuLinkPage]</td>
                </tr>
            </tbody>
        </table>

        <div class="table-responsive">
            <table class="table table-striped table-hover  table-bordered" id="panel_list">
                <thead>
                    <tr>
                        <th>Menu Name</th>
                        <th>Menu Label</th>
                        <th>Menu Link Page</th>
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
    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/jstree/jstree.js")%>'></script>
    <script src='<%= ResolveUrl("pageSystemMenu.js")%>'></script>
</asp:Content>
