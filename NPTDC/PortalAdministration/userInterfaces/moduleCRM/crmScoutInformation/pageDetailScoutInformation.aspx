<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.Master" AutoEventWireup="true" CodeBehind="pageDetailScoutInformation.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmScoutInformation.pageDetailScoutInformation" %>

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
        <li><a href="#" data-translate="">Marketing Scout</a></li>
        <li class="active" data-translate="">Scout Information</li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">
            <div class="col-md-5">
                <form class="form-horizontal">
                    <input type="hidden" id="tb_ScoutID" value="" />
                    <div class="panel  ">
                        <div class="panel-heading">
                            <div class="panel-control">
                            </div>
                            <h3 class="panel-title" data-translate="">Scout Information</h3>
                        </div>
                        <div class="panel-body">

                            <div class="form-group">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="tb_ScoutNo" placeholder="Scout No" readonly="true" />
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="dtp_ScoutOn_date" placeholder="ေန႕စြဲ">
                                </div>
                            </div>

                            <div class="form-group">

                                <div class="col-md-6">
                                    <select id="tb_ScoutType" class="form-control"></select>
                                    <input type="hidden" id="hf_scouttypeid" value="" />
                                </div>
                                <div class="col-md-6">
                                      <div id="tb_TownshipName"></div>
                                    <%--<select id="tb_TownshipName" class="form-control"></select>
                                    <input type="hidden" id="hf_TownshipID" value="" />--%>
                                </div>
                            </div>



                            <div class="form-group">
                                <div class="col-md-6">
                                    <select id="tb_uploadby" class="form-control"></select>
                                    <input type="hidden" id="hf_uploadid" value="" />
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="tb_UploadedOn" placeholder="Uploaded On" />
                                </div>

                            </div>
                        </div>
                    </div>
                </form>

                <form class="form-horizontal">

                    <div class="panel  ">
                        <div class="panel-heading">
                            <div class="panel-control">
                            </div>
                            <h3 class="panel-title" data-translate="">Contact Information</h3>
                        </div>
                        <div class="panel-body">

                            <div class="form-group">
                                <label for="tb_ContactPerson" class="col-md-2 control-label">Name</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="tb_ContactPerson" placeholder="Contact Person" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_ContactPerson" class="col-md-2 control-label">Company</label>
                                <div class="col-md-10">
                                    <%--<input type="text" class="form-control" id="tb_CompanyName" placeholder="Company" />--%>
                                    <textarea rows="1" cols="5" class="form-control" id="tb_CompanyName" placeholder="Company"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_ContactInformation" class="col-md-2 control-label">Contact Info</label>
                                <div class="col-md-10">
                                    <textarea rows="5" cols="10" class="form-control" id="tb_ContactInformation" placeholder="Contact Info"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_ContactAddress" class="col-md-2 control-label">Address</label>
                                <div class="col-md-10">
                                    <textarea rows="5" cols="10" class="form-control" id="tb_ContactAddress" placeholder="Address"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12" style="text-align: right; color: grey;">
                                    <small><span id="lbl_GPS" style="text-align: right"></span></small>
                                    <small><span id="lbl_Cell" style="text-align: right"></span></small>
                                    <small><span id="lbl_User" style="text-align: right"></span></small>
                                </div>

                            </div>
                              <div class="panel panel-filled" style="display: none">
                                                        <div class="panel-heading">Location</div>
                                                        <div class="panel-body panel-body-layer">

                                                            <div class="form-group form-horizontal">
                                                                <label for="tb_Gps_Lat" class="col-md-2 control-label">GPS Lattitude</label>
                                                                <div class="col-md-4">
                                                                    <input type="text" class="form-control" id="tb_Gps_Lat" placeholder="GPS Lattitude" />
                                                                </div>
                                                                <label for="tb_GPS_Lon" class="col-md-2 control-label">GPS Longitude</label>
                                                                <div class="col-md-4">
                                                                    <input type="text" class="form-control" id="tb_GPS_Lon" placeholder="GPS Longitude" />
                                                                </div>
                                                                <%--  <div class="col-md-2" >
                                                                  <button class="btn btn-default   btn-info" onclick="LoadMap('GPS');return false;">&nbsp;View </button><br /><br />
                                                                 </div>--%>
                                                            </div>


                                                            <div class="form-group form-horizontal">

                                                                <label for="tb_Cell_Lat" class="col-md-2 control-label">Cell Lat</label>
                                                                <div class="col-md-4">
                                                                    <input type="text" class="form-control" id="tb_Cell_Lat" placeholder="Cell Lattitude" />
                                                                </div>
                                                                <label for="tb_Cell_Lon" class="col-md-2 control-label">Cell Longitude</label>
                                                                <div class="col-md-4">
                                                                    <input type="text" class="form-control" id="tb_Cell_Lon" placeholder="Cell Longitude" />
                                                                </div>

                                                            </div>

                                                            <div class="form-group form-horizontal">
                                                                <label for="tb_User_Lat" class="col-md-2 control-label">User Lattitude</label>
                                                                <div class="col-md-4">
                                                                    <input type="text" class="form-control" id="tb_User_Lat" placeholder="User Lattitude" />
                                                                </div>
                                                                <label for="tb_User_Lon" class="col-md-2 control-label">User Longitude</label>
                                                                <div class="col-md-4">
                                                                    <input type="text" class="form-control" id="tb_User_Lon" placeholder="User Longitude" />
                                                                </div>
                                                                <%--  <div class="col-md-2" >
                                                                  <button class="btn btn-default   btn-info" onclick="LoadMap('Default');return false;">&nbsp;View </button> 
                                                                 </div>--%>
                                                            </div>

                                                        </div>
                                                    </div>
                        </div>
                    </div>
                </form>

            </div>



            <div class="col-md-7" style="height: 600px;">
                <div class="panel ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title">Location Map</h3>
                    </div>

                    <div class="panel-body">
                        <div class="form-group">
                            <div class="row">
                                <div id="div_pagination" class="pull-right">
                                    <button class="btn btn-default btn-info" onclick="ShowLocation('cell');return false;">Show Cell Location</button>
                                    <button class="btn btn-default btn-info" onclick="ShowLocation('gps');return false;">Show GPS Location</button>
                                    <%--  <button class="btn btn-default btn-info" onclick="ShowLocation('user');return false;"><i class="fa fa-refresh" aria-hidden="true"></i></button>--%>
                                </div>
                            </div>
                        </div>

                        <!-- Map box -->
                        <div class="form-group">
                            <div class="row" style="background: whitesmoke; border: 1px solid #d1c4b9; min-height: 470px;">

                                <div class="map" style="width: 100%; height: 470px; border: dashed;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Scout Image</h3>
                </div>
                <div class="panel-body panel-body-layer form-horizontal" style="height: 110px; overflow: auto;">
                    <div id="showImage" class="row"></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="pull-right">
                <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="AddScoutInfo();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
                <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                    <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
                <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
                <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();"><i class="btn-label ion-close"></i><span class="bold">Close</span></button>


            </div>
        </div>

    </div>









</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script type="text/javascript" src='<%= ResolveUrl("https://maps.google.com/maps/api/js?key=AIzaSyBRph29gJJ_G4zVm-qtjLLpYt2GXv2ePLY&callback=initMap")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/map/gmap3.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("pageDetailScoutInformation.js")%>'></script>
</asp:Content>
