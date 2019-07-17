using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;



namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport
{
    public partial class rpt_request_report : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_request_report()
        {
            InitializeComponent();
        }
        public void do_fill_data(string depID,string reqID)
        {
            par_depID.Value = depID;
            par_REQID.Value = reqID;
            parameter1.Value = reqID;
            sqlDataSource1.Fill();
        }

        private void xrSubreport_item_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
           
        }
        private void CalcHeight(XRSubreport subreport)
        {
            //var pi = subreport.ReportSource.GetType().GetProperty("DisplayableRowCount", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
            //var rows = Convert.ToInt32(pi.GetValue(subreport.ReportSource, null));
            //var rowHeight = subreport.ReportSource.Bands.GetBandByType(typeof(DetailBand)).HeightF;

            //var newHeight = rows * rowHeight;
           // xrTableCell3.HeightF = newHeight;
    
        }

      
    }
}
