using System;

namespace Backend.DTOs.Auth;
/// DTO för att logga in som användare.
public class DTOLoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
