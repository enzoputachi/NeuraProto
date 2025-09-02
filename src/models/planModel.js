import mongoose from "mongoose";
const { Schema } = mongoose;

const planSchema = new Schema({
    name: { type: String, required: true, },
    description: String,
    priceRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    duration: Number,
    expectedReturn: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }
},
{
    timestamps: true
}
)

const Plan = mongoose.model("Plan", planSchema);
export default Plan;