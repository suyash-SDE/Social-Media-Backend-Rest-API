import Blog from "../model/Blog.js";

export const getAllBlogs = async(req,res,next)=>{
    try {
        const blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({message:"No Blogs are found"});
        }
        return res.status(200).json({blogs});
    } catch (error) {
        console.error("Error fetching Blogs:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const addBlog = async(req,res,next)=>{
    try {
        const {title, description,image,user} = req.body;
        const blog = new Blog({
            title,
            description,
            image,
            user,
        });
        await blog.save();
        return res.status(201).json({message : "blog created successfully", blog});
        
    } catch (error) {
        console.error("Error in blogcreated:", err);
        return res.status(500).json({ message: "Server error" });
    }
    
}

export const updateBlog = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const blogId = req.params.id;

        // Find the blog and update it
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, description },
            { new: true } // Ensures we get the updated document
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found or unable to update" });
        }

        return res.status(200).json({ message: "Blog updated successfully", blog });
        
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
