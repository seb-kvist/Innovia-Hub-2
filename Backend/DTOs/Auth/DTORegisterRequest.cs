using System;

namespace Backend.DTOs.Auth;

/// DTO för att registrera en ny användare. Identity kommer att hasha lösenordet så det aldrig sparas i text
public class DTORegisterRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
}
