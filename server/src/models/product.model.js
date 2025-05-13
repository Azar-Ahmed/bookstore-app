import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Fiction", "Non-Fiction", "Others"],
      required: true,
    },
    price: { type: Number, min: 0, required: true },
    salePrice: { type: Number, min: 0, required: true },
    totalStock: { type: Number },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
