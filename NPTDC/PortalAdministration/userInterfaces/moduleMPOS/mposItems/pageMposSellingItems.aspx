<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.master" AutoEventWireup="true" CodeBehind="pageMposSellingItems.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMPOS.mposItems.pageMposSellingItems" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <br />
    <br />
    <br />
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">Selling Items </h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6">
                 <form runat="server">
                       <input type="hidden" id="tb_orgid" value="" runat="server" />
                <ol class="breadcrumb">
                    <li><a href="#"><i class="demo-pli-home"></i></a></li>
                    <li><a href="#"><span data-translate="_materbook">Master Data</span></a></li>
                    <li class="active"><span data-translate="">Selling Items</span></li>
                    <li class="active">
                        <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    </li>
                   <li class="active">
                       <asp:Button ID="BtnExportToExcel" runat="server" Text="Export To Excel" OnClientClick="InsertOrgId();" OnClick="BtnExportToExcel_Click" CssClass="btn btn-mint  btn-rounded  btn-labeled" />
              
                    </li>                          
                                    
                </ol> </form>
            </div>
   
        </div>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">
        <div class="row">

            <h3><i class="ion-briefcase">&nbsp;</i><span data-translate="_items">My Selling Items</span>  (<span class="list_count">0</span> Items )</h3>
            <br />
        </div>

        <div class="row" id="panel_list_background">
            <div class="col-md-8 sortable-list tasklist list-unstyled">
                <img src='<%= ResolveUrl("../../../img/nodata.svg")%>' style="width: 70%;" id="img_no_data" />
                <div id="template_row" style="display: none">
                    <div class=" panel panel-c-warning" onmouseover="this.style.background='#dbdbdb';this.style.color='#000000'" onmouseout="this.style.background='#FFF',this.style.color='#000000'" onclick="GetItem('[ItemID]');return false;" style="margin-top: 5px; border-left: 3px solid #03a9f4; cursor: pointer; background-color: #fff; color: #000000; padding: 10px;">
                        <div class="row">
                            <div class="col-md-2">
                                <img id="item_list_img" src='[ItemImage]' onerror="OnImageError(this);" style="width: 100%; height: 100%;" />
                            </div>

                            <div class="col-md-9" style="margin-left: 40px;">
                                <div class="row" style="margin-bottom: 5px;">
                                    <div class="col-md-9">
                                        <br />
                                        <b><span class="status-style [item-info]" style="font-size: 17px;">[ItemName]</span></b>
                                    </div>
                                    <div class="col-md-2 pull-left">
                                        <br />
                                        <span class="label btn-lg label-success btn-rounded ">[ItemPrice]</span>
                                    </div>
                                    <div class="col-md-1"></div>


                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-md-9">
                                        <span style="font-size: 14px;">[ItemType]</span>  &nbsp&nbsp
                                    &nbsp&nbsp    <span style="font-size: 14px;">[Brand]  &nbsp</span>&nbsp&nbsp
                                    &nbsp &nbsp   <span style="font-size: 14px;">[Supplier]</span>
                                    </div>

                                    <div class="col-md-3 pull-left rating" <%-- id="rate_[ItemID]"--%>>
                                        <span class="favorite-color"><i class="demo-psi-star icon-lg"></i></span>
                                        <span class="favorite-color"><i class="demo-psi-star icon-lg"></i></span>
                                        <span class="favorite-color"><i class="demo-psi-star icon-lg"></i></span>
                                        <span class="favorite-color"><i class="demo-psi-star icon-lg"></i></span>
                                        <span class="unfavorite-color"><i class="demo-psi-star icon-lg"></i></span>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <span class="status-style" style="font-size: 14px;">[Remark]</span>
                                </div>

                                <%--end invoice Region--%>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="table_list">
                </div>


            </div>
            <div class="col-md-4 ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel  ">
                            <div class="panel-heading">
                                <div class="panel-control">
                                </div>
                                <h3 class="panel-title" data-translate="">Searching Setting</h3>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal">


                                    <div class="form-group">

                                        <label for="tb_search_text" class="col-md-2 control-label" data-translate="">Code</label>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control" id="tb_sh_text" style="margin-left: -9px; width: 105%;">
                                        </div>
                                    </div>

                                    <div class="form-group">

                                        <label for="tb_search_text" class="col-md-2 control-label" data-translate="_itemgroup">Item Type</label>
                                        <div class="col-md-8" id="ddl_sh_item_type_id">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="tb_name" class="col-md-2 control-label" data-translate="_Brand">Brand</label>
                                        <div class="col-md-8" id="dd_brand">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="tb_name" class="col-md-2 control-label" data-translate="">Supplier</label>
                                        <div class="col-md-8" id="dd_supplier">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-2"></div>
                                        <div class="col-md-10">


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

                    <div class="col-md-12">
                        <div class="panel  ">
                            <div class="panel-heading">
                                <div class="panel-control">
                                </div>
                                <h3 class="panel-title" data-translate="">Import Items (From Excel)</h3>
                            </div>
                            <div class="panel-body">
                                <div style="padding: 10px;">
                                    <input type="hidden" id="hf_uploadFileName" value="" />
                                    <div id="excel_fileUpload"></div>
                                </div>
                                <div <%--class="dx-field-value"--%>>
                                    <div id="btn_Import"></div>
                                    &nbsp;&nbsp;
                   <div id="btn_Cancel"></div>
                                </div>

                            </div>
                        </div>

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
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">

    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/simple-rater/jquery.rating.js")%>'></script>
    <script src='<%= ResolveUrl("pageMposSellingItems.js")%>'></script>

</asp:Content>
