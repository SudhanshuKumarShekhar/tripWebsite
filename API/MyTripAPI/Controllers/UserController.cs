using MyTripAPI.Data;
using MyTripAPI.Helpers;
using MyTripAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace MyTripAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _aouthContext;

        public UserController(UserDbContext aouthContext)
        {
            _aouthContext = aouthContext;
        }
        // GET: api/UserDetails
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUserDetails()
        {
            return await _aouthContext.Users.ToListAsync();
        }
        
        [HttpGet("{name}")]
        public async Task<ActionResult<User>> GetUserDetails(string name)
        {
            var UserDetails = await _aouthContext.Users
                .FirstOrDefaultAsync(x => x.UserName == name);

            if (UserDetails == null)
            {
                return NotFound();
            }

            return UserDetails;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _aouthContext.Users
                .FirstOrDefaultAsync(x => x.UserName == userObj.UserName);
            if (user == null)
                return NotFound(new { success = 0, Message = "User Not Found!" });
            Boolean verifyPass = PasswordHasher.VerifyPassword(userObj.Password,user.Password);
            if (!verifyPass)
                return NotFound(new { success = 0, Message = "Incorrect Password!" });

            user.Token = CreateJwt(user);

            return Ok(new {success=1,
                Token= user.Token,
                Message = "Login Success!",
                //userDetails=user
                }) ;

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
           
            // Check UserName
            if (await CheckUserNameExistAsync(userObj.UserName))
                return BadRequest(new { Message = "Username Already Exist!" });

            
            //Check Email
            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exist!" });

            //Chech Password Strength
            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass.ToString() });
            }
            
            //incrept password in database 
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            
            userObj.Type = "user";
            userObj.Token = "";
            //add to database
            await _aouthContext.Users.AddAsync(userObj);
            await _aouthContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }


        private async Task<bool> CheckUserNameExistAsync(string username)
        {
            return await _aouthContext.Users.AnyAsync(x => x.UserName == username);
        }
        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _aouthContext.Users.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 6)
                sb.Append("password length should be more then 5!" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("password should be Alphanumeric!" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[@,!,#,$,%,^,&,?,>,<,*,+,-,(,),/,:,',||,~]"))
                sb.Append("password should contains spacial chars !" + Environment.NewLine);

            return sb.ToString();
        }
        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("VaryVarySceret......");
            var identity = new ClaimsIdentity(new Claim[]
            {
               new Claim(ClaimTypes.Name,user.UserName),
               new Claim(ClaimTypes.Role,user.Type),

            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(5),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
