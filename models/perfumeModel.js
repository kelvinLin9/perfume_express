const mongoose = require('mongoose');
const { Schema } = mongoose;

const perfumeSchema = new Schema({
  // 定義商品分類，並確保其為必填項且為字符串類型。
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true // 移除前後空格
  },
  // 商品唯一標識符，使用 MongoDB 的 _id 代替自定義 id
  // MongoDB 自動產生的 _id 已足夠作為唯一識別
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  // 將啟用狀態設計為布爾值，更直觀且易於理解
  isEnabled: {
    type: Boolean,
    required: [true, 'isEnabled flag is required'],
    default: true // 默認為啟用狀態
  },
  // 原價和售價應使用數字類型並確保為必填
  originPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: [0, 'Original price must be non-negative'] // 非負值
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be non-negative'] // 非負值
  },
  // 商品標題也應為必填項
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  // 單位描述，例如 ml (毫升)，為必填
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  }
}, {
  timestamps: true // 自動添加創建和更新時間戳
});

// 為類別和標題建立索引以提高查詢效能
perfumeSchema.index({ category: 1, title: 1 }, { unique: true });

const Perfume = mongoose.model('Perfume', perfumeSchema);

module.exports = Perfume;
