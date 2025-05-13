import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from "../utils/fileUpload.utils.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "All products fetched successfully", products });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Add a new product
export const addProducts = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const file = req.files?.image;

    // Validate required fields
    if (!title || !author || !description || !category || !price || !salePrice || !totalStock) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!file) {
      return res.status(400).json({ message: "Book image is required!" });
    }

    // Check for duplicate product
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(409).json({ message: "Book with this title already exists!" });
    }

    // Upload image
    const { public_id, secure_url } = await uploadImage(file);
    const image = { public_id, secure_url };

    // Create product
    const newProduct = await Product.create({
      title,
      author,
      description,
      category,
      price,
      salePrice,
      totalStock,
      image,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error("Add Product Error:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};


// Update a product
export const updateProducts = async (req, res) => {
  try {
    const { id: productId} = req.params;

    const {
      title,
      author,
      description,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const file = req.files?.image;

    // Validate required fields
    if (!title || !author || !description || !category || !price || !salePrice || !totalStock) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // If image file is provided, upload new image
    let image = existingProduct.image;
    if (file) {
      const { public_id, secure_url } = await uploadImage(file);
      image = { public_id, url: secure_url };
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        author,
        description,
        category,
        price,
        salePrice,
        totalStock,
        image,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};



// Delete a product
export const deleteProducts = async (req, res) => {
  try {
    const { id: productId } = req.params;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Delete image from Cloudinary if it exists
    if (product.image?.public_id) {
      await deleteImage(product.image.public_id);
    }

    // Delete product from DB
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: `Product with id ${productId} deleted successfully`,
    });

  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};



// Get details of a single product
export const getProductDetails = async (req, res) => {
  try {
    const { id: productId } = req.params;
    
    // Fetch product from DB
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({
      message: "Product details fetched successfully",
      product,
    });

  } catch (error) {
    console.error("Get Product Error:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};


// Get products based on filters

export const getFilterProducts = async (req, res) => {
  try {
    const {
      keyword = "",
      category,
      sort = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    if (category) {
      query.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortOption = { price: sort === "desc" ? -1 : 1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      message: "Filtered products fetched successfully",
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });

  } catch (error) {
    console.error("Filter Products Error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
