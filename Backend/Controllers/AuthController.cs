using System;
using Backend.DTOs.Auth;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;


    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] DTORegisterRequest model)
    {
        var user = new User { UserName = model.Name, Email = model.Email };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { Message = "User registered successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] DTOLoginRequest model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) return Unauthorized(new { Message = "Invalid credentials" });

        
        var signInResult = await _signInManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: false);
        if (!signInResult.Succeeded) return Unauthorized(new { Message = "Invalid credentials" });

        
        return Ok(new { Message = "Login successful", user.Id, user.Email, user.UserName });
    }
    
    



}
