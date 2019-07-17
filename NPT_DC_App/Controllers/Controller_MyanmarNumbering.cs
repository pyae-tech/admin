using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NPT_DC_App.Controllers
{
    public static class Controller_MyanmarNumbering
    {
        public static string GetMM_Number(int i)
        {
            switch (i)
            {
                case 1:return "၁";
                case 2: return "၂";
            }
            return "";
        }
        public static string GetMM_Word(int i)
        {
            switch (i)
            {
                case 1: return "က";
                case 2: return "ခ";
            }
            return "";
        }
    }
}