

export const fileUpload = (req, res) =>  {
    try {
        const fileInfo = req.file;

        if(!fileInfo) {
            return res.status(400).json({
                message: "File is required"
            })
        }


        console.log(req.body);
        console.log(req.file);


        return res.status(201).json({
            message: "uploaded successfully",
            fileInfo: fileInfo
        })

    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}