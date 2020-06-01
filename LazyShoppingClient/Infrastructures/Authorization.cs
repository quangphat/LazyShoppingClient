using AutoMapper;
using LazyShoppingClient.Models;
using my8ShareObject;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LazyShoppingClient.Infrastructures
{
    public class CurrentProcess
    {
        //public AccountModel CurrentAccount { get; set; }
        public Account Account { get; set; }
        public string AccountJson
        {
            get
            {
                return PrepareAccountJson(Account);
            }
        }
        private string PrepareAccountJson(Account account)
        {
            if (account == null) return null;
            return JsonConvert.SerializeObject(account, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
    public class AppConfig
    {
        public string ClientId { get; set; }
        public string Authority { get; set; }
    }
}
