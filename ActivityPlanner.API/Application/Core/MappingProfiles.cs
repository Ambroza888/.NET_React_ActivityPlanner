using System.Linq;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity,Activity>();

            CreateMap<Activity,ActivityDto>()
                .ForMember(d => d.HostUsername, opt => opt.MapFrom(src =>
                    src.Attendees.FirstOrDefault(x =>x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image,
                    o => o.MapFrom(src => src.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowingCount,
                    o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.FollowersCount,
                    o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));


            // we are using Profiles.Profile full path because automapper is using Profile class too.
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.Username,
                    o => o.MapFrom(src => src.Author.UserName))
                .ForMember(d => d.DisplayName,
                    o => o.MapFrom(src => src.Author.DisplayName))
                .ForMember(d => d.Image,
                    o => o.MapFrom(src => src.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<ActivityAttendee, Profiles.UserActivityDto>()
                .ForMember(d => d.Id, o => o.MapFrom(src => src.Activity.Id))
                .ForMember(d => d.Date, o => o.MapFrom(src => src.Activity.Date))
                .ForMember(d => d.Title, o => o.MapFrom(src => src.Activity.Title))
                .ForMember(d => d.Category, o => o.MapFrom(src => src.Activity.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(src =>
                    src.Activity.Attendees.FirstOrDefault(h => h.IsHost).AppUser.UserName));
        }
    }
}