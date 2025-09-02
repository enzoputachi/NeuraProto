import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    planId: {
        type: Schema.Types.ObjectId,
        ref: "Plan"
    },
    amountInKobo: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending"},
    paystackRef: String,
},
{
    timestamps: true
}
)

// Pre-save hook to validate and normalize amountInKobo
paymentSchema.pre("save", function(next) {
    if (this.amountInKobo <= 0) {
        return next(new Error("amountInkobo must be greater than 0"));
    }

    this.amountInKobo = Math.round(this.amountInKobo);
    next();
});

const Payment = mongoose.model("Payment", paymentSchema)
export default Payment;