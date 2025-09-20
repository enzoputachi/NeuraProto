import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema(
    {
        name : { type: String, required: true, trim: true },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            lowercase: true,
            trim: true
        },
        password: { type: String, required: true },
        role: [{
            type: String,
            enum: ['investor', 'expert', 'admin']
        }],
        investmentPlan: [{
            type: Schema.Types.ObjectId,
            ref: "Plan",
            enum: ["growth", "partner"],
        }],
        subscribedExpert: [{ type: Schema.Types.ObjectId, ref: "User" }],
        subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        bio: {
            type: String,
            required: function() { return this.role.includes('expert'); }
        },
        expertise: {
            type: String,
            required: function () {
                return this.role.includes("expert")
            }
        },
        isVerified: { type: Boolean, default: false },
        phoneNumber: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
export default User;