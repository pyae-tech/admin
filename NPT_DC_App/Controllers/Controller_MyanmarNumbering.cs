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
                case 3: return "၃";
                case 4: return "၄";
                case 5: return "၅";
                case 6: return "၆";
                case 7: return "၇";
                case 8: return "၈";
                case 9: return "၉";
                case 10: return "၁၀";
                case 11: return "၁၁";
                case 12: return "၁၂";
                case 13: return "၁၃";
                case 14: return "၁၄";
                case 15: return "၁၅";
                case 16: return "၁၆";
                case 17: return "၁၇";
                case 18: return "၁၈";
                case 19: return "၁၉";
                case 20: return "၂၀";
                case 21: return "၂၁";
                case 22: return "၂၂";
                case 23: return "၂၃";
                case 24: return "၂၄";
                case 25: return "၂၅";
                case 26: return "၂၆";
                case 27: return "၂၇";
                case 28: return "၂၈";
                case 29: return "၂၉";
                case 30: return "၃၀";
                case 31: return "၃၁";
                case 32: return "၃၂";
                case 33: return "၃၃";
                case 34: return "၃၄";
                case 35: return "၃၅";
                case 36: return "၃၆";
                case 37: return "၃၇";
                case 38: return "၃၈";
                case 39: return "၃၉";
                case 40: return "၄၀";
                case 41: return "၄၁";
                case 42: return "၄၂";
                case 43: return "၄၃";
                case 44: return "၄၄";
                case 45: return "၄၅";
                case 46: return "၄၆";
                case 47: return "၄၇";
                case 48: return "၄၈";
                case 49: return "၄၉";
                case 50: return "၅၀";

            }
            return "";
        }
        public static string GetMM_Word(int i)
        {
            switch (i)
            {
                case 1: return "က";
                case 2: return "ခ";
                case 3: return "ဂ";
                case 4: return "ဃ";
                case 5: return "င";
                case 6: return "စ";
                case 7: return "ဆ";
                case 8: return "ဇ";
                case 9: return "ဈ";
                case 10: return "ည";
                case 11: return "ဋ";
                case 12: return "ဌ";
                case 13: return "ဍ";
                case 14: return "ဎ";
                case 15: return "ဏ";
                case 16: return "တ";
                case 17: return "ထ";
                case 18: return "ဒ";
                case 19: return "ဓ";
                case 20: return "န";
                case 21: return "ပ";
                case 22: return "ဖ ";
                case 23: return "ဗ";
                case 24: return "ဘ";
                case 25: return "မ";
                case 26: return "ယ";
                case 27: return "လ";
                case 28: return "ဝ";
                case 29: return "သ";
                case 30: return "ဟ";
                case 31: return "ဠ";
                case 32: return "အ";
            }
            return "";
        }
    }
}