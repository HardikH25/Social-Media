import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axiosCalls/axios.js';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { username } = useParams(); //get the dynamic routing parameter 
    const { user } = useAuth();

    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const userProfile = await axiosInstance.get(`/users/profile/${username}`)
                const profileData = userProfile.data.userProfileData;
                setCurrentUser(profileData)
                console.log(profileData)
                console.log(user._id)
                setIsFollowing(profileData.followers.some((id) => id.toString() === user._id.toString()));
            }
            catch (error) {
                console.log(error)
                setError(error.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [username])

    if (loading) {
        return (
            <div className="min-h-screen bg-background texture-noise flex items-center justify-center p-6">
                <div className="p-8 border border-border animate-pulse">
                    <p className="font-mono text-xs uppercase tracking-widest text-mutedForeground">Retrieving profile data...</p>
                </div>
            </div>
        );
    }

    if (error || !currentUser) {
        return (
            <div className="min-h-screen bg-background texture-noise flex items-center justify-center p-6">
                <div className="p-8 border border-border bg-card">
                    <h2 className="text-3xl font-playfair text-foreground mb-2">
                        {error ? "Error" : "User Not Found"}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-mutedForeground">
                        {error || "The profile you are looking for does not exist."}
                    </p>
                </div>
            </div>
        );
    }
    const handleFollow = async () => {
        try {
            await axiosInstance.post(`/users/follow/${currentUser._id}`)
            console.log('User Followed')
            setIsFollowing(true)
        } catch (error) {
            console.log(error)
        }
    }
    const handleUnfollow = async () => {
        try {
            await axiosInstance.post(`/users/unfollow/${currentUser._id}`)
            console.log('User Unfollowed')
            setIsFollowing(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-background texture-noise p-6 md:p-12 pb-24">
            <div className="max-w-6xl mx-auto mt-6">
                {/* Profile Header Block */}
                <div className="border border-border p-8 md:p-12 mb-12 bg-card">
                    <div className="flex flex-col md:flex-row gap-12 items-start">

                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 bg-foreground flex items-center justify-center">
                            <span className="text-6xl md:text-8xl font-playfair text-background font-normal">{currentUser.name?.charAt(0).toUpperCase()}</span>
                        </div>

                        {/* User Info & Stats */}
                        <div className="flex-1 w-full space-y-8">
                            <div className="border-b border-borderLight pb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div>
                                    <h1 className="text-5xl md:text-7xl font-playfair tracking-tight text-foreground mb-2">{currentUser.name}</h1>
                                    <p className="text-sm font-mono text-mutedForeground tracking-widest uppercase">
                                        @{currentUser.username}
                                    </p>
                                </div>
                                <div className="shrink-0 mt-2 md:mt-0">
                                    {user?._id?.toString() === currentUser?._id?.toString() ? (
                                        <button className="group relative px-8 py-3 border border-foreground bg-background text-foreground overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 hover:shadow-md">
                                            <div className="absolute inset-0 w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full"></div>
                                            <span className="relative font-mono text-xs uppercase tracking-widest group-hover:text-background transition-colors duration-300">
                                                Edit Profile
                                            </span>
                                        </button>
                                    ) : isFollowing ? (
                                        <button
                                            className="group relative px-8 py-3 border border-foreground bg-foreground text-background overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 hover:shadow-md"
                                            onClick={handleUnfollow}
                                        >
                                            <div className="absolute inset-0 w-full bg-foreground transition-all duration-300 ease-out group-hover:w-0"></div>
                                            <span className="relative font-mono text-xs uppercase tracking-widest group-hover:text-foreground transition-colors duration-300 z-10">
                                                Unfollow
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            className="group relative px-8 py-3 border border-foreground bg-foreground text-background overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 hover:shadow-md"
                                            onClick={handleFollow}
                                        >
                                            <div className="absolute inset-0 w-full bg-foreground transition-all duration-300 ease-out group-hover:w-0"></div>
                                            <span className="relative font-mono text-xs uppercase tracking-widest group-hover:text-foreground transition-colors duration-300 z-10">
                                                Follow
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 border border-border">
                                <div className="p-4 border-r border-border text-center">
                                    <span className="block font-playfair text-3xl text-foreground mb-1">{currentUser.posts?.length || 0}</span>
                                    <span className="block font-mono text-xs uppercase tracking-widest text-mutedForeground">Posts</span>
                                </div>
                                <div className="p-4 border-r border-border text-center">
                                    <span className="block font-playfair text-3xl text-foreground mb-1">{currentUser.followers?.length || 0}</span>
                                    <span className="block font-mono text-xs uppercase tracking-widest text-mutedForeground">Followers</span>
                                </div>
                                <div className="p-4 text-center">
                                    <span className="block font-playfair text-3xl text-foreground mb-1">{currentUser.followings?.length || 0}</span>
                                    <span className="block font-mono text-xs uppercase tracking-widest text-mutedForeground">Following</span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="pt-4">
                                <p className="font-source text-lg text-mutedForeground leading-relaxed max-w-2xl">
                                    {currentUser.bio || "An exploration of form and function in the digital space. Strict adherence to monochromatic principles."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-start gap-8 mb-12 border-b-[4px] border-foreground pb-4">
                    <button className="text-xl font-playfair text-foreground relative focus-visible:outline-none">
                        Posts
                    </button>
                    <button className="text-xl font-playfair text-mutedForeground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-foreground">
                        Saved
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                    {/* Mock Post 1 */}
                    <div className="aspect-square bg-muted border border-border flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-100 hover:bg-foreground hover:text-background">
                        <span className="font-mono text-xs uppercase tracking-widest text-mutedForeground group-hover:text-background">Post 1</span>
                    </div>
                    {/* Mock Post 2 */}
                    <div className="aspect-square bg-muted border border-border flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-100 hover:bg-foreground hover:text-background texture-grid">
                        <span className="font-mono text-xs uppercase tracking-widest text-mutedForeground group-hover:text-background z-10">Post 2</span>
                    </div>
                    {/* Mock Post 3 */}
                    <div className="aspect-square bg-muted border border-border flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-100 hover:bg-foreground hover:text-background">
                        <span className="font-mono text-xs uppercase tracking-widest text-mutedForeground group-hover:text-background">Post 3</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Profile;
