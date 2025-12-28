import mongoose , {Schema} from "mongoose"


const articleSchema = new Schema({
    title: { 
        type: String,
        required: true,
        trim:true,
    },
    contentHtml: { 
        type: String,
        required: true,
        trim:true,
    },
    author: { 
        type: String,
        required: true,
        trim:true,
    },
    publishedAt: Date,
    sourceUrl: { 
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);





export const Article = mongoose.model("Article",articleSchema)