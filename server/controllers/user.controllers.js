// register controller
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import genToken from "../utils/generateToken.js"

const cookiesOption = {
    httpOnly: true
}
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, username } = req.body
        if (!username || !name || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 7 character long" })
        }
        const userNameExists = await User.findOne({ username })

        if (userNameExists) {
            return res.status(409).json({ message: "The username already exists, try using another" })
        }
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(409).json({ message: "The email already exists, try using another" })
        }
        //password security- bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // console.log(salt)
        // console.log(hashedPassword);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })

        //generate a token for user - access token
        const token = genToken(newUser._id)

        res.cookie('token', token, cookiesOption);
        res.status(201).json({ message: "Account Created", user: newUser });

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err })
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "Address Field is Necessary" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User Not Found, Please Register" })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        console.log(passwordCheck)

        if (!passwordCheck) {
            return res.status(400).json({ message: "Wrong Password" })
        }
        const token = genToken(user._id)
        res.cookie('token', token, cookiesOption)

        return res.status(200).json({ message: "Logged in successfully", userData: user })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err })
    }
}

export const getUser = async (req, res) => {
    res.status(200).json({ message: "User Authenticated", userData: req.user })
}

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const userData = await User.findOne({ username }).select('-password') // or ('name username email')
        res.status(200).json({ message: 'Profile Found', userProfileData: userData })

        if (!userData) {
            return res.status(404).json({ message: "User Not Found" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}

export const followUser = async (req, res) => {
    try {
        //check is the id is same as logged in user -> user can't follow themselves you dipshit
        //check if you are already following the user -> unfollow , if not -> follow
        //from taken fetch the current user id 
        const currentUserId = req.user._id
        const targetUserId = req.params.id
        if (currentUserId.toString() === targetUserId.toString()) { //mongoose treats the id as objectId and cannot be comparable unless you do string matching
            return res.status(409).json({ message: 'You cannot follow yourself dipshit' })
        }
        const targetUser = await User.findById(targetUserId) //or findOne({_id: targetuserid})
        if (!targetUser) {
            return res.status(404).json({ message: "No User Found" })
        }
        const alreadyFollowing = targetUser.followers.some((id) => //return boolean 
            id.toString() === currentUserId.toString()
        )
        if (alreadyFollowing) {
            return res.status(409).json({ message: 'You are already following' })
        }
        //if not - update (you can do push) - but mongodb has operator which we can use heavily.
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { followings: targetUserId }
        })
        await User.findByIdAndUpdate(targetUserId, {
            $addToSet: { followers : currentUserId }
        })

        res.send(200).json({message: 'User Followed'})

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error})
    }
}
export const unFollowUser = async (req, res) => {
    try {
        const currentUserId = req.user._id
        const targetUserId = req.params.id
        if (currentUserId.toString() === targetUserId.toString()) { //mongoose treats the id as objectId and cannot be comparable unless you do string matching
            return res.status(409).json({ message: 'You cannot unfollow yourself dipshit' })
        }
        const targetUser = await User.findById(targetUserId) //or findOne({_id: targetuserid})
        if (!targetUser) {
            return res.status(404).json({ message: "No User Found" })
        }
        const amIFollowing = targetUser.followers.some((id) => //return boolean 
            id.toString() === currentUserId.toString()
        )
        if (!amIFollowing) {
            return res.status(409).json({ message: 'You are not following' })
        }
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { followings: targetUserId }
        })
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers : currentUserId }
        })

        res.send(200).json({message: 'User Unfollowed'})

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error})
    }
}