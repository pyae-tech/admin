using iTextSharp.text;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using iTextSharp.text.pdf;
using iTextSharp.text;
using SBSPortal3.LINQs;
using System.Globalization;
using DevExpress.XtraReports.UI;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSale.reportSaleByCustomer
{
    public partial class pageSaleSummaryByCustomer : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                load_report();

        }






        private void load_report()
        {
            dxrpt_sale_by_customer report = new dxrpt_sale_by_customer();
            DateTime from_date = DateTime.Today;
            DateTime to_date = DateTime.Today;

            DateTime.TryParseExact(tb_search_date.Value, "yyyy/MM/d", CultureInfo.InvariantCulture, DateTimeStyles.None, out from_date);
            DateTime.TryParseExact(tb_search_to_date.Value, "yyyy/MM/d", CultureInfo.InvariantCulture, DateTimeStyles.None, out to_date);

            #region filtering text
            string filter_text = "";
            if (from_date == to_date) filter_text = from_date.ToString("dd/MM/yyyy");
            else
                filter_text = from_date.ToString("dd/MM/yyyy") + " <-> " + to_date.ToString("dd/MM/yyyy");

            report.Parameters["parFiltering"].Value = filter_text;
            #endregion

            #region Company Information
            LINQ_SystemDataContext dc_sys = new LINQ_SystemDataContext();
            SYS_Get_Organization_From_UserResult the_org = dc_sys.SYS_Get_Organization_From_User(hf_current_user.Value).FirstOrDefault();
            if (the_org != null)
            {
                report.Parameters["parCompanyName"].Value = the_org.OrgName;
            }
            #endregion


            LINQ_POSDataContext dc_pos = new LINQ_POSDataContext();
            List<POS_REPORT_SUMMARY_BY_CUSTOMERResult> result = dc_pos.POS_REPORT_SUMMARY_BY_CUSTOMER(
                from_date,to_date,tb_search_text.Value,"","","","","",hf_current_user.Value).ToList();
            

            report.DataSource = result;
            report.CreateDocument(false);

            myReportViwer.OpenReport(report);

        }





        protected void btn_refresh_report_Click(object sender, EventArgs e)
        {
            load_report();
        }
        protected void btn_download_Click(object sender, EventArgs e)
        {
        }

        protected void btn_print_Click(object sender, EventArgs e)
        {


        }

    }
}