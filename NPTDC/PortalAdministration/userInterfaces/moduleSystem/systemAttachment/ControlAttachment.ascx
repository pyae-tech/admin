<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ControlAttachment.ascx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemAttachment.ControlAttachment" %>
<div class="row" style="margin-bottom: 5px;" id="attachment_box_action">

    <div class="col-md-4  " onclick="UploadAttachment();return false;" style="cursor: pointer" id="#attachment_box_action">


        <div class="panel panel-primary panel-colorful media middle pad-all">
            <div class="media-left">
                <div class="pad-hor">
                    <i class="demo-pli-file-word icon-3x"></i>
                </div>
            </div>
            <div class="media-body">
                <p class="text-2x mar-no text-semibold">Upload</p>
                <p class="mar-no">Documents</p>
            </div>
        </div>

        <%-- <i class="demo-psi-folder-zip text-success" style="font-size:30px;"></i>--%>
    </div>
    <div class="row col-md-4">
        <div class="row col-md-12">
            <button class="btn btn-primary  btn-labeled" type="button" onclick="AttachmentRefresh();return false;"><i class="btn-label ion-refresh"></i><span class="bold">Refresh</span></button>
        </div><br /><br />
        <div class="row col-md-12">
            <button class="btn btn-primary btn-labeled" style="width:60%;"  type="button" onclick="AttachmentPrint();return false;"><i class="btn-label ion-printer"></i><span class="bold">View & Print</span></button>
        </div>
    </div>
    <br />
    <br />

    <div class="col-md-12" style="padding-right: 20px;">


        <div class="row" id="attachment_box_header">
            <%--<div class="panel" id="attach_pdf" style="display:none;">--%>
            <table style="display: none">
                <tbody id="template_Attachment_row">

                    <tr>
                        <td onclick="OpenAttachment('[Path]')" style="cursor: pointer;">[File]</td>
                        <td>[Size]</td>
                        <td onclick="DeleteAttachment('[ID]')" onmouseover="this.style.color='red'" onmouseout="this.style.color=''" style="cursor: pointer; width: 10px;"><span class="bold"><i class="btn-label ion-trash-a icon-2x"></i></span></td>
                    </tr>
                </tbody>
            </table>

               <div class="table-responsive" >
                <table class="table table-striped table-hover  table-bordered" id="panel_list">

                    <tbody id="table_attachment_list">
                    </tbody>
                </table>
                   
            </div>
                  <%--</div>--%>
          <%--     <style>
                .nopad {
	                padding-left: 0 !important;
	                padding-right: 0 !important;
                    text-align:center;
                }
                /*image gallery*/
                .image-checkbox {
	                cursor: pointer;
	                box-sizing: border-box;
	                -moz-box-sizing: border-box;
	                -webkit-box-sizing: border-box;
	                border: 4px solid transparent;
	                margin-bottom: 0;
	                outline: 0;
                }
                .image-checkbox input[type="checkbox"] {
	                display: none;
                }

                .image-checkbox-checked {
	                border-color: #4783B0;
                }
                .image-checkbox .ti-check {
                  position: absolute;
                  color: #4A79A3;
                  background-color: #fff;
                  padding: 10px;
                  top: 0;
                  right: 0px;
                  font-weight: 600;
                }
                .image-checkbox-checked .ti-check {
                  display: block !important;
                }
                label.image-checkbox{position:relative;display:inline-block;}
                   div#attachment_box_header {
                       background-color:#eee;padding: 30px 0;
                   }
            </style>--%>
            <%--<div class="panel" id="attach_images" style="display:block;">--%>
           
               <%--  <div id="template_Attachment_row" style="display:none;">    
                    <div class="col-md-3 nopad">
                            <label class="image-checkbox" id="[ID]" data-img-src="[Path]">
                              <img  src='[Path]' style="width:220px;height:256px;" class="img-responsive"/>
                              <input type="checkbox" name="[File]" value="" />
                              <i class="ti-check hidden"></i>
                            </label>
                        </div>                
                </div>--%>
               <%-- <div id="attach_images">
                      <span>&nbsp;&nbsp;&nbsp;<i>Select to print!</i></span>
                <div class="picker" id="table_attachment_list" style="min-height:auto;">    
                    --%>
                  
               
                   <%-- <div class="col-md-3 nopad">
                            <label class="image-checkbox">
                              <img src='<%=ResolveUrl("../../../img/shared-img.jpg")%>' style='width:220px;' class="img-responsive"/>
                              <input type="checkbox" name="image[]" value="" />
                              <i class="ti-check hidden"></i>
                            </label>
                        </div>
                       <div class="col-md-3 nopad">
                            <label class="image-checkbox">
                              <img src='<%=ResolveUrl("../../../img/shared-img.jpg")%>' style='width:220px;' class="img-responsive"/>
                              <input type="checkbox" name="image[]" value="" />
                              <i class="ti-check hidden"></i>
                            </label>
                        </div>
                        <div class="col-md-3 nopad">
                            <label class="image-checkbox">
                              <img src='<%=ResolveUrl("../../../img/shared-img-2.jpg")%>'style='width:220px;'  class="img-responsive"/>
                              <input type="checkbox" name="image[]" value="" />
                              <i class="ti-check hidden"></i>
                            </label>
                        </div>
                        <div class="col-md-3 nopad">
                            <label class="image-checkbox">
                              <img src='<%=ResolveUrl("../../../img/shared-img-3.jpg")%>' style='width:220px;'  class="img-responsive"/>
                              <input type="checkbox" name="image[]" value="" />
                              <i class="ti-check hidden"></i>
                            </label>
                        </div>
                        <div class="col-md-3 nopad">
                            <label class="image-checkbox">
                              <img src='<%=ResolveUrl("../../../img/shared-img-4.jpg")%>' width="220px;"  class="img-responsive"/>
                              <input type="checkbox" name="image[]" value="" />
                              <i class="ti-check hidden"></i>
                            </label>
                        </div>--%>
                 <%--   <select id="img_plugin" multiple="multiple" class="image-picker">
                        <%-- <option data-img-src='http://placekitten.com/180/200' value='2'>Cute Kitten 2</option>
                            <option data-img-src='http://placekitten.com/130/200' value='3'>Cute Kitten 3</option>
                   --%>
                    <%--</select>--%>
                </div>
            </div>
        </div>

    <%--</div>--%>

<!--Unite Gallery [ OPTIONAL ]-->
<link href='<%=ResolveUrl("../../../plugins/image-picker/image-picker.css")%>' rel="stylesheet">
<script src='<%=ResolveUrl("../../../plugins/image-picker/image-picker.js")%>'></script>
<%--<script src='<%=ResolveUrl("../../../plugins/image-picker/image-picker.min.js")%>'></script>--%>
<link href='<%=ResolveUrl("../../../plugins/unitegallery/css/unitegallery.min.css")%>' rel="stylesheet">
<script src='<%=ResolveUrl("../../../plugins/unitegallery/js/unitegallery.min.js")%>'></script>
<script src='<%=ResolveUrl("../../../plugins/unitegallery/themes/tilesgrid/ug-theme-tilesgrid.js")%>'></script>

