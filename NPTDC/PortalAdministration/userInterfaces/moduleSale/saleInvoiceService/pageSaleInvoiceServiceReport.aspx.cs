using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleInvoiceService
{
    public partial class pageSaleInvoiceServiceReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            do_load_report();
        }
        void do_load_report()
        {
            rpt_SaleInvoice_Service_Report the_report = new rpt_SaleInvoice_Service_Report();
            rpt_sale_invoice_total the_report1 = new rpt_sale_invoice_total();
            string search_parameters =Request.QueryString["id"];
            if (search_parameters!="")
            {
                the_report1.do_fill_data1(search_parameters);
                the_report1.CreateDocument();
                docViwer.OpenReport(the_report1);
                the_report.do_fill_data(search_parameters);
                the_report.CreateDocument();
                docViwer.OpenReport(the_report);
            }

        }

    }
}