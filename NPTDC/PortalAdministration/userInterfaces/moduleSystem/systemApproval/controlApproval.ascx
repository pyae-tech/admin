<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="controlApproval.ascx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemApproval.controlApproval" %>
<div class="row"  id="approval_box_action"  style="margin-bottom:5px;padding-top:5px;" >
    <div class="col-md-3" style="cursor:pointer;padding-right:0px"   onclick="CheckSeq('Approved');return false;">
         
       
					            <div class="panel panel-success panel-colorful media middle pad-all">
					                <div class="media-left">
					                    <div class="pad-hor">
					                        <i class="ion-checkmark  icon-3x"></i>
					                    </div>
					                </div>
					                <div class="media-body">
					                    <p class="text-2x mar-no text-semibold"></p>
					                    <p class="mar-no">Approve</p>
					                </div>
					            </div> 
    </div> 

      <div class="col-md-3" style="cursor:pointer;padding-left:3px"   onclick="CheckSeq('Rejected');return false;">
         
       
					            <div class="panel panel-danger panel-colorful media middle pad-all" >
					                <div class="media-left">
					                    <div class="pad-hor">
					                        <i class="ion-close  icon-3x"></i>
					                    </div>
					                </div>
					                <div class="media-body">
					                    <p class="text-2x mar-no text-semibold"></p>
					                    <p class="mar-no">Reject</p>
					                </div>
					            </div> 
    </div> 


 
<div class="col-md-6" id="approval_box_header">
       <table style="display: none">
                                        <tbody id="template_approval_row">
                                               
                                            <tr   >
                                                     <td>[RequestToCode]</td>
                                                <td>[RequestOn]</td> 
                                                <td>[ResponseStatus]</td> 
                                                <td>[Remark]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                           
                                            <tbody id="table_approval_list">
                                            </tbody>
                                        </table>
                                    </div>

</div>

    </div>
