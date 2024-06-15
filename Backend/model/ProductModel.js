// const mongoose=require('mongoose')

// const ProductoModel=new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,"Please Enter The Name ...DB"],
//         trim:true,
//         maxLength:[100,"product name connot exceed 100 characters"]
//     },
//     price:{
//         type:Number,
//         required:true,
        
//     },
//     description:{
//         type:String,
//         required:[true,"Please Enter The product description ...DB"],
//     },
//     ratings:{
//         // type:String,default:0
//     },
//     images:[{
//         image:{
//             type:String,
//             required:true
//         }
//     }],
//     category:{
//        type:String,
//        required:[true,'please ENter Product Category'],
//        enum:{
//         values:[

//        ],
//     message:"Please select Correct CateGory"}

//     },
//     seller:{
//         type:String,
//         required:[true,"Please Enter Seller Name"],
//     },
//     stock:{
//         type:Number,
//         required:[true,"Please Enter Product Stock"],
//         maxLength:[20,"Product Stock Cannot exceed 20"]
//     },numOfReviews:{
//         type:Number,
//         default:0
//     }
//     ,reviews:[
//         {
//             name:{
//                 type:String,
//                 required:true
//             },
//             comment:{
//                 type:String,
//                 required:true
//             },
//             rating:{
//                 type:String,
//                 required:true
//             }
//         }
//     ],
//     createdAt:{
//         type:Date,
//         default:Date.now()
//     }

// })


// const schema=mongoose.model('product',ProductoModel)

// module.exports=schema

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true,
                
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message : "Please select correct category"
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, 'Product stock cannot exceed 20']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            ratings: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Product', productSchema)

module.exports = schema