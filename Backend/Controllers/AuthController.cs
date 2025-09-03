using System;
using Backend.DTOs.Auth;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs.Auth;
using API;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly JwtToken _jwtToken;

    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, JwtToken jwtToken)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtToken = jwtToken;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] DTORegisterRequest model)
    {
        if (model == null)
        {
            return BadRequest(new { message = "Invalid request" });
        }
        var existingUser = await _userManager.FindByEmailAsync(model.Email);
        if (existingUser != null)
        {
            return Conflict(new { message = "Username is already taken" });
        }

        var user = new User { UserName = model.Name, Email = model.Email };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { Message = "User registered successfully" });
    }
    
}
