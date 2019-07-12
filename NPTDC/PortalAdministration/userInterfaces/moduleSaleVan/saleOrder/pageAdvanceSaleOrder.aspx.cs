using SBSPortal3.Controllers;
using SBSPortal3.LINQs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.saleOrder
{
    public partial class pageAdvanceSaleOrder : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void BtnExportToExcel_Click(object sender, EventArgs e)
        {

            string orderid = hdnfldOrderid.Value;
            string customerid =  hdnfldCustid.Value;
            string requestid = hdnfldRequestid.Value;
            if (orderid != "" && customerid != "" && requestid != "")
            {

                DataTable dt = new DataTable();
                //LINQ_MasterDataContext db = new LINQ_MasterDataContext();
                //List<MST_Customer> customer = (from c in db.MST_Customers where c.Active select c).OrderBy(x => x.CustomerName).ToList<MST_Customer>();
                List<SBSPortal3.Controllers.Controller_Order.AdvancedOrderItemView> orderItems = Controller_Order.GetAllAdvancedOrderItems(orderid, customerid, requestid);
                DataTable table = new DataTable();

                table.Columns.Add("Item No", typeof(string));
                table.Columns.Add("Item Name", typeof(string));
                table.Columns.Add("Item Price", typeof(string));
                table.Columns.Add("Mon ", typeof(string));
                table.Columns.Add("Tue", typeof(string));
                table.Columns.Add("Web", typeof(string));
                table.Columns.Add("Thu", typeof(string));
                table.Columns.Add("Fri", typeof(string));
                table.Columns.Add("Sat", typeof(string));
                table.Columns.Add("Sun", typeof(string));

                foreach (var ord in orderItems)
                {
                    table.Rows.Add(ord.ItemNo, ord.ItemName,  Convert.ToDecimal(ord.ItemPrice).ToString("#,##0.00"), ord.Mon_OrderQty.ToString(),
                        ord.Tue_OrderQty.ToString(), ord.Wed_OrderQty.ToString(), ord.Thu_OrderQty.ToString(),
                         ord.Fri_OrderQty.ToString(), ord.Sat_OrderQty.ToString(), ord.Sun_OrderQty.ToString());
                }
                ExportToExcel(table);
            }

        }

        public void ExportToExcel(DataTable dt)
        {
            string attachment = "attachment; filename=OrderItem List.xls";
            Response.ClearContent();
            Response.AddHeader("content-disposition", attachment);
            Response.ContentType = "application/vnd.ms-excel";
            string tab = "";
            foreach (DataColumn dc in dt.Columns)
            {
                Response.Write(tab + dc.ColumnName);
                tab = "\t";
            }
            Response.Write("\n");
            int i;
            foreach (DataRow dr in dt.Rows)
            {
                tab = "";
                for (i = 0; i < dt.Columns.Count; i++)
                {
                    Response.Write(tab + dr[i].ToString());
                    tab = "\t";
                }
                Response.Write("\n");
            }
            Response.End();
        }
    }
}