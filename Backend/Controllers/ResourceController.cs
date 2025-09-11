using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class ResourceController : ControllerBase
    {
        public readonly AppDbContext _dbContext;
        public ResourceController(AppDbContext appDbContext) {
            _dbContext = appDbContext;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllResources()
        {
            var resources = await _dbContext.Resources.ToListAsync();

            return Ok(resources);

        }


    }
}
