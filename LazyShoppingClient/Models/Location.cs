using System;

namespace LazyShoppingClient.Models
{
    public class Location
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string CountryCode { get; set; }
        public string ProvinceCode { get; set; }
        public string DistrictCode { get; set; }
        public string DisplayName { get; set; }
        public int LocationType { get; set; }
       
    }
}

