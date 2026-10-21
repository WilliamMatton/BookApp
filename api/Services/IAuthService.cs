using Api.Models;

namespace Api.Services;

public interface IAuthService
{
    Task<bool> RegisterAsync(UserDto request);
    Task<TokenResponseDto?> LoginAsync(UserDto request);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
    Task LogoutAsync(Guid userId);
}