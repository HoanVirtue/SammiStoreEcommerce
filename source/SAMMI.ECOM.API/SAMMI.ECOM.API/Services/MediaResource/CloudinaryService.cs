
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using SAMMI.ECOM.Domain.Enums;

namespace SAMMI.ECOM.API.Services.MediaResource
{
    public interface ICloudinaryService
    {
        Task<string> UploadBase64Image(string base64Image, string fileName, string type);
        Task<bool> DeleteImage(string publicId);
    }
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _configuration;
        public CloudinaryService(IConfiguration config)
        {
            _configuration = config;
            var account = new Account(
                config["CloundSettings:CloudName"],
                config["CloundSettings:CloudKey"],
                config["CloundSettings:CloudSecret"]);
            _cloudinary = new Cloudinary(account);
        }
        public async Task<bool> DeleteImage(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok";
        }

        public async Task<string> UploadBase64Image(string base64Image, string fileName, string type)
        {
            byte[] imageBytes = Convert.FromBase64String(base64Image);
            using (var stream = new MemoryStream(imageBytes))
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(fileName, stream),
                    PublicId = fileName,
                    Folder = type == ImageEnum.Product.ToString() ? _configuration["CloundSettings:ImageProductFolder"] :
                             type == ImageEnum.Brand.ToString() ? _configuration["CloundSettings:ImageBrandFolder"] :
                             _configuration["CloundSettings:ImageUserFolder"]
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                return uploadResult != null ? uploadResult.SecureUri.ToString() : null;
            }
        }
    }
}
