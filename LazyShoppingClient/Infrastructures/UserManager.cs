using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using LazyShoppingClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace LazyShoppingClient.Infrastructures
{
    public class UserManager
    {
        private readonly HttpClient _httpClient;
        private readonly ClientConfig _clientConfig;
        public UserManager(HttpClient httpClient, IOptions<ClientConfig> clientConfig)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
        }
    }
}
