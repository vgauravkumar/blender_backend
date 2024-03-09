const getModels = async (req, res) => {
    try {
        const arr = [
            {
                file_name: "box.glb"
            },
            {
                file_name: "torus.glb"
            },
            // {
            //     file_name: "monkey.glb"
            // }
        ];
        return res.status(200).json({
            message: "success",
            arr
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating model');
    }
};

module.exports = {
    getModels
}