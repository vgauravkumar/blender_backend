const { spawn } = require('child_process');

const generateModel = async (req, res) => async (req, res) => {
    try {
        // Call your Python script with Blender using child_process
        const blenderProcess = spawn('python', ['generate_model.py']);
    
        // Receive Blender's output (optional)
        blenderProcess.stdout.on('data', (data) => {
            console.log(`Blender output: ${data.toString()}`);
        });
    
        // Wait for Blender to finish
        await new Promise((resolve) => blenderProcess.on('close', resolve));
    
        // Once Blender is done, fetch the generated model and send response
        const modelUrl = '/models/generated_model.fbx'; // Adjust the path
        res.json({ modelUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating model');
    }
};

module.exports = {
    generateModel
}