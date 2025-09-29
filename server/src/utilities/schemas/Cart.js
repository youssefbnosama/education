import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;